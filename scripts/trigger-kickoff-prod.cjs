#!/usr/bin/env node
/**
 * Manually trigger morningKickoff for one user (prod).
 * Creates a fresh session and sends Q1 via Telnyx.
 *
 * Required env: TELNYX_API_KEY, TELNYX_PHONE_NUMBER
 * Usage: node scripts/trigger-kickoff-prod.cjs <uid>
 */

const admin = require('firebase-admin');
const https = require('https');
const fs = require('fs');
const path = require('path');

if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.cert(require('../serviceAccountKey.prod.json')) });
}
const db = admin.firestore();

const TELNYX_API_KEY = process.env.TELNYX_API_KEY;
const TELNYX_PHONE_NUMBER = process.env.TELNYX_PHONE_NUMBER;
if (!TELNYX_API_KEY || !TELNYX_PHONE_NUMBER) {
  console.error('Missing TELNYX_API_KEY or TELNYX_PHONE_NUMBER');
  process.exit(1);
}

function sendTelnyx(to, text) {
  const body = JSON.stringify({
    from: TELNYX_PHONE_NUMBER,
    to,
    text,
    type: text.length > 320 ? 'MMS' : 'SMS',
  });
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.telnyx.com',
      path: '/v2/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TELNYX_API_KEY}`,
        'Content-Length': Buffer.byteLength(body),
      },
    }, (res) => {
      let chunks = '';
      res.on('data', d => chunks += d);
      res.on('end', () => {
        try {
          const j = JSON.parse(chunks);
          if (res.statusCode >= 300) reject(new Error(`Telnyx ${res.statusCode}: ${chunks}`));
          else resolve(j.data);
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function loadQuestions(section) {
  const sectionLower = section.toLowerCase();
  const filePath = path.join(__dirname, '..', 'content', 'cpa', sectionLower, 'questions.json');
  const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return (raw.questions || []).filter(q => q.status !== 'retired');
}

function formatQuestionSMS(q, num, cap, section) {
  const opts = q.options.map((o, i) => `${String.fromCharCode(65 + i)}) ${o}`).join('\n');
  return `Q${num}/${cap} (${section})\n\n${q.question}\n\n${opts}\n\nReply A, B, C, or D`;
}

(async () => {
  const uid = process.argv[2];
  if (!uid) { console.error('uid required'); process.exit(1); }

  const userRef = db.collection('daily_users').doc(uid);
  const userDoc = await userRef.get();
  if (!userDoc.exists) { console.error('user not found'); process.exit(1); }
  const user = userDoc.data();

  const tz = user.timezone || 'America/New_York';
  const today = new Date().toLocaleDateString('en-CA', { timeZone: tz });
  const sessionId = `${uid}_${today}`;
  const sessionRef = db.collection('daily_sessions').doc(sessionId);

  const TIER_CAPS = { trial: 5, starter: 5, plus: 10, premium: 20 };
  const dailyCap = user.status === 'trialing' ? 5 : (TIER_CAPS[user.tier] || 5);

  const allQs = loadQuestions(user.section);
  const seenSnap = await db.collection('daily_attempts')
    .where('uid', '==', uid)
    .get();
  const fourteenDaysAgo = Date.now() - 14*24*60*60*1000;
  const seen = new Set();
  seenSnap.forEach(d => {
    const a = d.data();
    const ts = a.attemptedAt?.toDate?.()?.getTime?.() || 0;
    if (ts >= fourteenDaysAgo) seen.add(a.questionId);
  });
  const candidates = allQs.filter(q => !seen.has(q.id));
  if (candidates.length === 0) { console.error('No fresh questions available'); process.exit(1); }

  const pool = candidates
    .map(q => ({ q, r: Math.random() }))
    .sort((a, b) => a.r - b.r)
    .slice(0, Math.ceil(dailyCap * 1.5))
    .map(x => x.q.id);

  const q1Id = pool[0];
  const q1 = allQs.find(q => q.id === q1Id);

  await sessionRef.set({
    uid,
    date: today,
    section: user.section,
    state: 'waiting_answer',
    dailyCap,
    questionsAnswered: 0,
    questionsCorrect: 0,
    currentQuestionId: q1Id,
    currentQuestionNum: 1,
    currentQuestionSentAt: admin.firestore.FieldValue.serverTimestamp(),
    questionPool: pool,
    answeredQuestions: [],
    startedAt: admin.firestore.FieldValue.serverTimestamp(),
    completedAt: null,
    pausedAt: null,
    resumedAt: null,
    nudgeSent: false,
  });

  const text = formatQuestionSMS(q1, 1, dailyCap, user.section);
  const resp = await sendTelnyx(user.phone, text);
  console.log('Sent Q1 to', user.phone);
  console.log('  Telnyx id:', resp.id);
  console.log('  Question:', q1Id, '(' + (q1.topic || '') + ')');
  console.log('  Pool size:', pool.length, 'cap:', dailyCap);

  await db.collection('daily_sms_log').add({
    uid,
    direction: 'outbound',
    to: user.phone,
    body: text,
    telnyxMessageId: resp.id,
    note: 'manual-kickoff',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });

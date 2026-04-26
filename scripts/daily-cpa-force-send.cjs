/**
 * One-off: force-trigger the first Daily CPA SMS for a registered user.
 *
 * This bypasses the morning-kickoff scheduler so we can validate the SMS
 * pipeline (Telnyx auth, content loading, formatting) end-to-end without
 * waiting for 7 AM ET.
 *
 * Usage:
 *   node scripts/daily-cpa-force-send.cjs <uid>
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const admin = require('firebase-admin');

const uid = process.argv[2];
if (!uid) {
  console.error('Usage: node scripts/daily-cpa-force-send.cjs <uid>');
  process.exit(1);
}

// Pull secrets from Secret Manager via Firebase CLI
function getSecret(name) {
  return execSync(`firebase functions:secrets:access ${name} -P development`, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  }).trim();
}

console.log('Pulling Telnyx secrets...');
process.env.TELNYX_API_KEY = getSecret('TELNYX_API_KEY');
process.env.TELNYX_PHONE_NUMBER = getSecret('TELNYX_PHONE_NUMBER');
console.log('  ✓ TELNYX_API_KEY loaded');
console.log(`  ✓ TELNYX_PHONE_NUMBER = ${process.env.TELNYX_PHONE_NUMBER}`);

// Init admin with dev credentials
const serviceAccount = require(path.join(__dirname, '..', 'serviceAccountKey.json'));
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

// Telnyx SDK
const telnyx = require(path.join(__dirname, '..', 'functions', 'node_modules', 'telnyx'))(process.env.TELNYX_API_KEY);

// ---- Replicate the question loader from daily-cpa.js ----
function loadQuestions(section) {
  const filePath = path.join(__dirname, '..', 'content', 'cpa', section.toLowerCase(), 'questions.json');
  const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return (raw.questions || []).map(q => ({
    id: q.id,
    blueprintArea: q.blueprintArea || '',
    topic: q.topic || '',
    difficulty: q.difficulty || 'medium',
    question: q.question,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation || '',
    examTip: q.examTip || '',
  }));
}

// ---- Replicate the SMS formatter (simplified) ----
function formatQuestionSMS(q, num, cap, section, streak, isTrial, trialDay) {
  const header = isTrial
    ? `📚 Day ${trialDay}/3 Trial · ${section} · Q${num}/${cap}`
    : `🔥 ${streak}-day streak · ${section} · Q${num}/${cap}`;
  const opts = q.options.map((opt, i) =>
    `${String.fromCharCode(65 + i)}) ${opt}`
  ).join('\n');
  return `${header}\n\n${q.question}\n\n${opts}\n\nReply A, B, C, or D`;
}

async function main() {
  const userDoc = await db.collection('daily_users').doc(uid).get();
  if (!userDoc.exists) throw new Error(`User ${uid} not found`);
  const user = userDoc.data();
  console.log(`\nUser: ${user.phone} · ${user.section} · ${user.status}`);

  // Build today's session
  const today = new Date().toLocaleDateString('en-CA', { timeZone: user.timezone });
  const sessionId = `${uid}_${today}`;
  const sessionRef = db.collection('daily_sessions').doc(sessionId);

  const questions = loadQuestions(user.section);
  console.log(`Loaded ${questions.length} ${user.section} questions`);

  // Pick first 5 easy questions for the trial
  const pool = questions
    .filter(q => q.difficulty === 'easy')
    .slice(0, user.dailyCap)
    .map(q => q.id);

  console.log(`Question pool: ${pool.length} questions`);

  await sessionRef.set({
    uid,
    sessionId,
    date: today,
    section: user.section,
    state: 'active',
    dailyCap: user.dailyCap,
    questionsAnswered: 0,
    questionsCorrect: 0,
    answeredQuestions: [],
    questionPool: pool,
    currentQuestionId: null,
    currentQuestionNum: 0,
    currentQuestionSentAt: null,
    nudgeSent: false,
    startedAt: admin.firestore.FieldValue.serverTimestamp(),
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  console.log(`✓ Session created: ${sessionId}`);

  // Send Q1
  const q1 = questions.find(q => q.id === pool[0]);
  const body = formatQuestionSMS(q1, 1, user.dailyCap, user.section, 0, true, 1);

  console.log('\n--- SMS body ---');
  console.log(body);
  console.log('--- end body ---\n');

  console.log('Sending via Telnyx...');
  const response = await telnyx.messages.send({
    from: process.env.TELNYX_PHONE_NUMBER,
    to: user.phone,
    text: body,
  });
  const msgData = response.data;
  console.log(`✓ Sent. Telnyx message id: ${msgData.id}`);
  console.log(`  Status: ${msgData.to?.[0]?.status || 'queued'}`);

  // Log to Firestore
  await db.collection('daily_sms_log').add({
    uid,
    direction: 'outbound',
    to: user.phone,
    telnyxMessageId: msgData.id,
    body: body.substring(0, 500),
    status: msgData.to?.[0]?.status || 'queued',
    sentAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // Update session state
  await sessionRef.update({
    state: 'waiting_answer',
    currentQuestionId: q1.id,
    currentQuestionNum: 1,
    currentQuestionSentAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  console.log('✓ Session in waiting_answer state');
  console.log('\nReply A/B/C/D from your phone — the inbound webhook will route the answer.');
  process.exit(0);
}

main().catch((err) => {
  console.error('Failed:', err);
  process.exit(1);
});

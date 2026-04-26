/**
 * Re-send the Day 3 trial-end CTA to the test user. Uses the new
 * formatTrialEndCTA(uid, ...) signature with the embedded ?uid= link.
 */
const admin = require('firebase-admin');
const path = require('path');
const sa = require(path.join(__dirname, '..', 'serviceAccountKey.prod.json'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const phone = process.argv[2] || '+17036238835';

(async () => {
  const userSnap = await db.collection('daily_users').where('phone', '==', phone).limit(1).get();
  if (userSnap.empty) { console.error('user not found'); process.exit(1); }
  const userDoc = userSnap.docs[0];
  const uid = userDoc.id;
  const user = userDoc.data();

  // Best-effort streak read
  const streakDoc = await db.collection('daily_streaks').doc(uid).get();
  const streak = streakDoc.exists ? (streakDoc.data().currentStreak || 0) : 0;

  // Get today's session for stats
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: user.timezone || 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  const sid = `${uid}_${today}`;
  const sessionDoc = await db.collection('daily_sessions').doc(sid).get();
  const session = sessionDoc.exists ? sessionDoc.data() : { questionsAnswered: 1, questionsCorrect: 1, section: user.section };

  const totalAnswered = session.questionsAnswered || 1;
  const totalCorrect = session.questionsCorrect || 1;
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  const lines = [];
  lines.push(`📊 Trial Complete — ${session.section || user.section}`);
  lines.push('');
  lines.push(`3-day results: ${totalCorrect}/${totalAnswered} correct (${accuracy}%)`);
  lines.push(`Streak: 🔥 ${streak} day${streak !== 1 ? 's' : ''}`);
  lines.push('');
  lines.push('Your trial ends today. Keep your streak and progress:');
  lines.push('');
  lines.push('Starter (10/day): $4.99/mo');
  lines.push('Core (25/day): $9.99/mo');
  lines.push('Pro (50/day): $14.99/mo');
  lines.push('');
  lines.push(`Upgrade: https://voraprep.com/daily-cpa/upgrade?uid=${uid}&utm_source=daily_cpa_sms`);
  lines.push('');
  lines.push('Reply STOP to unsubscribe.');
  const body = lines.join('\n');

  // Send via Telnyx directly (we can't easily call the deployed function from here)
  const TELNYX_KEY = process.env.TELNYX_API_KEY;
  const FROM = process.env.TELNYX_PHONE_NUMBER;
  if (!TELNYX_KEY || !FROM) { console.error('missing TELNYX_API_KEY / TELNYX_PHONE_NUMBER env'); process.exit(1); }

  const payload = { from: FROM, to: phone, text: body };
  if (body.length > 320) { payload.type = 'MMS'; payload.subject = 'VoraPrep'; }

  const resp = await fetch('https://api.telnyx.com/v2/messages', {
    method: 'POST',
    headers: { Authorization: `Bearer ${TELNYX_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const json = await resp.json();
  console.log('Telnyx response:', JSON.stringify(json.data?.id || json, null, 2));
  console.log(`\nLink in message: https://voraprep.com/daily-cpa/upgrade?uid=${uid}&utm_source=daily_cpa_sms`);

  // Log it
  await db.collection('daily_sms_log').add({
    uid,
    direction: 'outbound',
    to: phone,
    telnyxMessageId: json.data?.id || '',
    body: body.substring(0, 500),
    status: json.data?.to?.[0]?.status || 'queued',
    sentAt: admin.firestore.FieldValue.serverTimestamp(),
    note: 'manual-resend-trial-end-cta',
  });

  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });

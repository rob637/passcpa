/**
 * Reset Rob's session to waiting_answer state so we can re-test the answer flow
 * after the messages.create -> messages.send fix.
 */
const admin = require('firebase-admin');
const path = require('path');
admin.initializeApp({ credential: admin.credential.cert(require(path.join(__dirname, '..', 'serviceAccountKey.json'))) });
const db = admin.firestore();

(async () => {
  const uid = '5UhnyVmINFCBSfqBjxw0';
  const today = '2026-04-25';
  const sessionId = `${uid}_${today}`;
  const ref = db.collection('daily_sessions').doc(sessionId);
  const snap = await ref.get();
  if (!snap.exists) { console.error('Session not found'); process.exit(1); }
  const s = snap.data();
  console.log('Current:', { state: s.state, answered: s.questionsAnswered, currentQ: s.currentQuestionId });

  // Roll back the previous answer attempt and re-queue Q1
  const firstQid = s.questionPool[0];
  await ref.update({
    state: 'waiting_answer',
    currentQuestionId: firstQid,
    currentQuestionNum: 1,
    currentQuestionSentAt: admin.firestore.FieldValue.serverTimestamp(),
    questionsAnswered: 0,
    questionsCorrect: 0,
    answeredQuestions: [],
    nudgeSent: false,
  });

  // Also wipe the spurious attempt we recorded
  const prior = await db.collection('daily_attempts').where('uid','==',uid).where('sessionDate','==',today).get();
  for (const d of prior.docs) await d.ref.delete();
  console.log(`✓ Reset. Cleared ${prior.size} prior attempt(s). Reply A/B/C/D from your phone now.`);
  console.log('  Correct answer is A.');
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });

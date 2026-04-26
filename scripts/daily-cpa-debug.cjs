const admin = require('firebase-admin');
const path = require('path');
admin.initializeApp({ credential: admin.credential.cert(require(path.join(__dirname, '..', 'serviceAccountKey.json'))) });
const db = admin.firestore();

(async () => {
  console.log('=== Last 10 SMS log entries ===');
  const snap = await db.collection('daily_sms_log')
    .orderBy('sentAt', 'desc')
    .limit(10)
    .get();
  if (snap.empty) {
    console.log('(no entries)');
  } else {
    snap.docs.forEach(d => {
      const data = d.data();
      console.log(`[${data.direction}] ${data.from || data.to} | status=${data.status}`);
      console.log(`  body: ${(data.body || '').substring(0, 100)}`);
      console.log(`  ts: ${data.sentAt?.toDate?.().toISOString() || 'n/a'}`);
      console.log('');
    });
  }

  console.log('=== Active sessions ===');
  const sessions = await db.collection('daily_sessions').limit(5).get();
  sessions.docs.forEach(d => {
    const s = d.data();
    console.log(`${d.id}: state=${s.state} | answered=${s.questionsAnswered}/${s.dailyCap} | currentQ=${s.currentQuestionId}`);
  });

  process.exit(0);
})();

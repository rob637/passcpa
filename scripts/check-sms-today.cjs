const admin = require('firebase-admin');
admin.initializeApp({ credential: admin.credential.cert(require('../serviceAccountKey.prod.json')) });
const db = admin.firestore();
(async () => {
  const phone = '+17036238835';
  const start = new Date('2026-04-28T00:00:00Z');
  // Inbound today by phone (filter client-side to avoid composite index)
  const snap = await db.collection('daily_sms_log')
    .where('from', '==', phone)
    .get();
  const startSec = start.getTime() / 1000;
  const todayIn = snap.docs.filter(d => (d.data().sentAt?._seconds || d.data().sentAt?.seconds || 0) >= startSec);
  console.log(`Inbound from ${phone} today: ${todayIn.length}`);
  todayIn.forEach(d => {
    const r = d.data();
    const ts = r.sentAt?._seconds || r.sentAt?.seconds;
    console.log(' ', new Date(ts*1000).toISOString(), '|', JSON.stringify(r.body));
  });
  // Outbound today
  const out = await db.collection('daily_sms_log')
    .where('to', '==', phone)
    .get();
  const todayOut = out.docs.filter(d => (d.data().sentAt?._seconds || d.data().sentAt?.seconds || 0) >= startSec);
  console.log(`\nOutbound to ${phone} today: ${todayOut.length}`);
  todayOut.forEach(d => {
    const r = d.data();
    const ts = r.sentAt?._seconds || r.sentAt?.seconds;
    console.log(' ', new Date(ts*1000).toISOString(), '|', r.type || '?', '|', JSON.stringify((r.body||'').slice(0,80)));
  });
})().catch(e => { console.error(e); process.exit(1); });

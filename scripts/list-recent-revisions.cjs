const admin = require('firebase-admin');
admin.initializeApp({ credential: admin.credential.cert(require('../serviceAccountKey.prod.json')) });
const db = admin.firestore();
(async () => {
  // What time was today's most recent inbound DOC created (to detect any inbound hitting Firestore)?
  const phone = '+17036238835';
  const all = await db.collection('daily_sms_log').where('from','==',phone).get();
  let latest = null;
  for (const d of all.docs) {
    const s = d.data().sentAt?._seconds || d.data().sentAt?.seconds || 0;
    if (!latest || s > latest.s) latest = { s, body: d.data().body };
  }
  console.log('Latest inbound from rob ever:', new Date(latest.s*1000).toISOString(), '|', JSON.stringify(latest.body));
  // Outbound today details
  const todayStart = Date.parse('2026-04-28T00:00:00Z')/1000;
  const out = await db.collection('daily_sms_log').where('to','==',phone).get();
  const outToday = out.docs.map(d=>d.data()).filter(r => (r.sentAt?._seconds||0) >= todayStart);
  console.log('Today outbound to rob:', outToday.length);
  outToday.forEach(r => console.log(' ', new Date(r.sentAt._seconds*1000).toISOString(), '|', r.status||'?', '|', r.type||'?'));
})().catch(e=>{console.error(e); process.exit(1)});

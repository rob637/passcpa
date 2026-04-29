const admin = require('firebase-admin');
admin.initializeApp({ credential: admin.credential.cert(require('../serviceAccountKey.prod.json')) });
const db = admin.firestore();
(async () => {
  const phone = process.argv[2] || '+17036238835';
  const snap = await db.collection('daily_sms_log')
    .where('from', '==', phone)
    .limit(50)
    .get();
  const rows = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  // sort by sentAt or timestamp
  rows.sort((a,b) => {
    const ta = a.sentAt?._seconds || a.timestamp?._seconds || 0;
    const tb = b.sentAt?._seconds || b.timestamp?._seconds || 0;
    return tb - ta;
  });
  console.log(`Inbound from ${phone}: ${rows.length} entries\n`);
  for (const r of rows.slice(0, 20)) {
    const ts = r.sentAt?._seconds || r.timestamp?._seconds;
    const tstr = ts ? new Date(ts*1000).toISOString() : '?';
    console.log(tstr, '|', r.direction || '?', '|', JSON.stringify(r.body || '').slice(0, 80));
  }
  // Also outbound TO this phone
  const out = await db.collection('daily_sms_log')
    .where('to', '==', phone)
    .limit(20)
    .get();
  const outRows = out.docs.map(d=>({id:d.id, ...d.data()}));
  outRows.sort((a,b)=>{
    const ta = a.sentAt?._seconds || a.timestamp?._seconds || 0;
    const tb = b.sentAt?._seconds || b.timestamp?._seconds || 0;
    return tb - ta;
  });
  console.log(`\nOutbound TO ${phone}: ${outRows.length} entries\n`);
  for (const r of outRows.slice(0, 15)) {
    const ts = r.sentAt?._seconds || r.timestamp?._seconds;
    const tstr = ts ? new Date(ts*1000).toISOString() : '?';
    console.log(tstr, '|', r.type || '?', '|', JSON.stringify(r.body||'').slice(0, 80));
  }
})().catch(e => { console.error(e); process.exit(1); });

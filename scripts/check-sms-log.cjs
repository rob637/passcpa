const admin = require('firebase-admin');
admin.initializeApp({ credential: admin.credential.cert(require('../serviceAccountKey.prod.json')) });
const db = admin.firestore();
(async () => {
  const snap = await db.collection('daily_sms_log')
    .where('uid', '==', 'v3dnBDW5GjfxVGF3xzLi')
    .limit(50)
    .get();
  const rows = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  rows.sort((a,b) => (b.timestamp?._seconds||0) - (a.timestamp?._seconds||0));
  for (const r of rows.slice(0, 20)) {
    const ts = r.timestamp?._seconds ? new Date(r.timestamp._seconds*1000).toISOString() : '?';
    console.log(ts, r.direction || '?', r.type || '', JSON.stringify(r.body || r.message || '').slice(0, 120));
  }
})();

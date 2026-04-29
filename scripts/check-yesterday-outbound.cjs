const admin = require('firebase-admin');
admin.initializeApp({ credential: admin.credential.cert(require('../serviceAccountKey.prod.json')) });
const db = admin.firestore();
(async () => {
  const phone = '+17036238835';
  const out = await db.collection('daily_sms_log').where('to','==',phone).get();
  const rows = out.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>(a.sentAt?._seconds||0)-(b.sentAt?._seconds||0));
  console.log('Last 8 outbound to rob:');
  rows.slice(-8).forEach(r=>console.log(' ',new Date((r.sentAt?._seconds||0)*1000).toISOString(),'|status=',r.status,'|type=',r.type,'|telnyxId=',r.telnyxMessageId||r.messageId||'-'));
})().catch(e=>{console.error(e);process.exit(1)});

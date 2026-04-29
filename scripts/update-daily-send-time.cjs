#!/usr/bin/env node
// Update sendTime for a Daily CPA user.
// Usage: node scripts/update-daily-send-time.cjs <email> <HH:MM>
const admin = require('firebase-admin');
const path = require('path');
const serviceAccount = require(path.join(__dirname, '..', 'serviceAccountKey.prod.json'));
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

const email = process.argv[2];
const sendTime = process.argv[3];
if (!email || !/^\d{2}:\d{2}$/.test(sendTime || '')) {
  console.error('Usage: node scripts/update-daily-send-time.cjs <email> <HH:MM>');
  process.exit(1);
}

(async () => {
  const snap = await db.collection('daily_users').where('email', '==', email).get();
  if (snap.empty) { console.error('No user found for', email); process.exit(1); }
  for (const doc of snap.docs) {
    await doc.ref.update({ sendTime });
    console.log(`✅ ${doc.id}: sendTime → ${sendTime}`);
  }
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });

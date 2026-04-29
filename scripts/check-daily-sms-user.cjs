#!/usr/bin/env node
// Diagnose why a daily SMS user didn't get today's questions.
const admin = require('firebase-admin');
const path = require('path');

const keyPath = process.argv.includes('--prod')
  ? path.join(__dirname, '..', 'serviceAccountKey.prod.json')
  : path.join(__dirname, '..', 'serviceAccountKey.prod.json'); // default to prod

const serviceAccount = require(keyPath);
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

const EMAIL = process.argv[2] || 'rob@sagecg.com';
const PHONE = process.argv[3] || '+17036238835';

function getTodayString(tz) {
  const d = new Date();
  const fmt = new Intl.DateTimeFormat('en-CA', { timeZone: tz || 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' });
  return fmt.format(d); // YYYY-MM-DD
}
function currentHourMin(tz) {
  return new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date());
}

(async () => {
  console.log(`Looking up user by email=${EMAIL} or phone=${PHONE}\n`);

  // Search by email
  let snap = await db.collection('daily_users').where('email', '==', EMAIL).get();
  if (snap.empty) {
    // Try phone variations
    for (const p of [PHONE, PHONE.replace('+1',''), '7036238835', '+17036238835']) {
      snap = await db.collection('daily_users').where('phone', '==', p).get();
      if (!snap.empty) { console.log(`Found by phone=${p}`); break; }
    }
  }

  if (snap.empty) {
    console.log('❌ No daily_users record found for this email or phone.');
    process.exit(0);
  }

  for (const doc of snap.docs) {
    const u = doc.data();
    const uid = doc.id;
    console.log(`=== daily_users/${uid} ===`);
    console.log(JSON.stringify(u, null, 2));

    const tz = u.timezone || 'America/New_York';
    const today = getTodayString(tz);
    console.log(`\nUser local now: ${currentHourMin(tz)} (${tz}); today=${today}; sendTime=${u.sendTime}`);
    console.log(`smsOptIn=${u.smsOptIn}, status=${u.status}, tier=${u.tier}`);
    if (u.trialEnd) console.log(`trialEnd=${u.trialEnd.toDate().toISOString()} (now=${new Date().toISOString()})`);

    // Today's session
    const sid = `${uid}_${today}`;
    const sess = await db.collection('daily_sessions').doc(sid).get();
    console.log(`\n=== daily_sessions/${sid} ===`);
    console.log(sess.exists ? JSON.stringify(sess.data(), null, 2) : '(no session created today)');

    // Recent sms logs for this uid
    const logs = await db.collection('daily_sms_log')
      .where('uid', '==', uid)
      .orderBy('timestamp', 'desc')
      .limit(10).get().catch(e => { console.log('log query err:', e.message); return { docs: [] }; });
    console.log(`\n=== last ${logs.docs?.length || 0} daily_sms_log entries ===`);
    for (const l of (logs.docs || [])) {
      const d = l.data();
      console.log(`${d.timestamp?.toDate?.().toISOString() || '?'} dir=${d.direction || '?'} status=${d.status || '?'} to=${d.to || ''} body="${(d.body || '').slice(0,80)}"`);
    }
  }
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });

/**
 * One-off: register Rob for Daily CPA testing on dev and send the first question.
 *
 * Usage:
 *   node scripts/daily-cpa-test-signup.cjs
 *
 * Reads dev service account from serviceAccountKey.json.
 * Telnyx secrets must already be configured on the deployed functions.
 */

const admin = require('firebase-admin');
const path = require('path');

const serviceAccount = require(path.join(__dirname, '..', 'serviceAccountKey.json'));
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const db = admin.firestore();

const PHONE = '+17036238835';
const EMAIL = 'rob@sagecg.com';
const SECTION = 'FAR';
const TIMEZONE = 'America/New_York';
const SEND_TIME = '07:00';
const TIER = 'starter';
const DAILY_CAP = 5; // trial

async function main() {
  // 1. Check if already registered
  const existing = await db.collection('daily_users')
    .where('phone', '==', PHONE)
    .limit(1)
    .get();

  let uid;
  if (!existing.empty) {
    uid = existing.docs[0].id;
    console.log(`✓ Already registered. uid=${uid}`);
  } else {
    uid = db.collection('daily_users').doc().id;
    const trialEnd = new Date();
    trialEnd.setDate(trialEnd.getDate() + 3);
    trialEnd.setHours(23, 59, 59, 999);

    await db.collection('daily_users').doc(uid).set({
      uid,
      phone: PHONE,
      email: EMAIL,
      timezone: TIMEZONE,
      sendTime: SEND_TIME,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      smsOptIn: true,
      smsOptInAt: admin.firestore.FieldValue.serverTimestamp(),
      section: SECTION,
      status: 'trialing',
      tier: TIER,
      dailyCap: DAILY_CAP,
      trialStart: admin.firestore.FieldValue.serverTimestamp(),
      trialEnd: admin.firestore.Timestamp.fromDate(trialEnd),
      stripeCustomerId: null,
      stripeSubscriptionId: null,
    });

    await db.collection('daily_streaks').doc(uid).set({
      uid,
      currentStreak: 0,
      longestStreak: 0,
      lastAnsweredDate: null,
      totalQuestionsAnswered: 0,
      totalCorrect: 0,
    });

    console.log(`✓ Registered new user. uid=${uid}, phone=${PHONE}, section=${SECTION}`);
  }

  // 2. Clear any stale session for today so we get a fresh kickoff
  const today = new Date().toLocaleDateString('en-CA', { timeZone: TIMEZONE }); // YYYY-MM-DD
  const sessionId = `${uid}_${today}`;
  const sessionRef = db.collection('daily_sessions').doc(sessionId);
  const sessionDoc = await sessionRef.get();
  if (sessionDoc.exists) {
    console.log(`✓ Wiping today's existing session (${sessionId}) for clean test`);
    await sessionRef.delete();
  }

  console.log('');
  console.log('User ready. Phone:', PHONE);
  console.log('uid:', uid);
  console.log('');
  console.log('Next: trigger the morning kickoff function to send the first SMS.');
  console.log('');
  process.exit(0);
}

main().catch((err) => {
  console.error('Failed:', err);
  process.exit(1);
});

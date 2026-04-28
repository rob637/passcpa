/**
 * Fix script for Daily CPA account
 * - Enables SMS opt-in
 * - Extends subscription to be active
 * - Clears any trial date so account is treated as paid subscriber
 */
const admin = require('firebase-admin');
const path = require('path');
const sa = require(path.join(__dirname, '..', 'serviceAccountKey.prod.json'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const phone = process.argv[2];

if (!phone) {
  console.error('Usage: node fix-daily-subscription.cjs <phone>');
  console.error('Example: node fix-daily-subscription.cjs +17036238835');
  process.exit(1);
}

(async () => {
  console.log(`\n========================================`);
  console.log(`FIXING SUBSCRIPTION FOR: ${phone}`);
  console.log(`========================================\n`);

  // Find user by phone
  const userSnap = await db.collection('daily_users').where('phone', '==', phone).limit(1).get();
  if (userSnap.empty) {
    console.error('❌ USER NOT FOUND');
    process.exit(1);
  }

  const userDoc = userSnap.docs[0];
  const uid = userDoc.id;
  const user = userDoc.data();

  console.log(`📋 Current Account State:`);
  console.log(`   UID: ${uid}`);
  console.log(`   Email: ${user.email}`);
  console.log(`   SMS Opt-In: ${user.smsOptIn}`);
  console.log(`   Status: ${user.status}`);
  console.log(`   Tier: ${user.tier}`);
  console.log(`   Trial End: ${user.trialEnd?.toDate?.().toISOString() || 'N/A'}`);

  // Fix 1: Enable SMS opt-in
  console.log(`\n✏️  Fix 1: Enabling SMS Opt-In...`);
  await db.collection('daily_users').doc(uid).update({
    smsOptIn: true,
    smsOptInDate: admin.firestore.FieldValue.serverTimestamp(),
  });
  console.log(`   ✓ SMS opt-in enabled`);

  // Fix 2: Set status to active and extend subscription
  console.log(`\n✏️  Fix 2: Activating Subscription...`);
  const now = new Date();
  const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  
  await db.collection('daily_users').doc(uid).update({
    status: 'active',
    subscriptionStart: now,
    subscriptionEnd: thirtyDaysFromNow,
    // Clear trial dates so it's treated as a regular paid subscriber
    trialStart: admin.firestore.FieldValue.delete(),
    trialEnd: admin.firestore.FieldValue.delete(),
    activatedDate: admin.firestore.FieldValue.serverTimestamp(),
  });
  console.log(`   ✓ Status set to 'active'`);
  console.log(`   ✓ Subscription extended 30 days`);
  console.log(`   ✓ Trial dates cleared`);

  // Verify changes
  console.log(`\n📋 Updated Account State:`);
  const updatedDoc = await db.collection('daily_users').doc(uid).get();
  const updated = updatedDoc.data();
  console.log(`   SMS Opt-In: ${updated.smsOptIn}`);
  console.log(`   Status: ${updated.status}`);
  console.log(`   Subscription End: ${updated.subscriptionEnd?.toDate?.().toISOString() || 'N/A'}`);

  console.log(`\n✅ ACCOUNT ACTIVATED - Messages will send at ${user.sendTime} ${user.timezone}`);
  console.log(`\n========================================\n`);
  process.exit(0);
})().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});

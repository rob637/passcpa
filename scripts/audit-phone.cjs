/**
 * Audit script for phone number: 703-623-8835
 * Investigates user account, SMS logs, sessions, and delivery status
 */
const admin = require('firebase-admin');
const path = require('path');
const sa = require(path.join(__dirname, '..', 'serviceAccountKey.prod.json'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const phone = process.argv[2];

if (!phone) {
  console.error('Usage: node audit-phone.cjs <phone>');
  console.error('Example: node audit-phone.cjs +17036238835');
  process.exit(1);
}

const phoneNormalized = phone.startsWith('+') ? phone : `+1${phone.replace(/\D/g, '')}`;

(async () => {
  console.log(`\n========================================`);
  console.log(`PHONE AUDIT: ${phoneNormalized}`);
  console.log(`========================================\n`);

  // ========== STEP 1: Look up user ==========
  console.log('📋 STEP 1: User Lookup');
  console.log('─'.repeat(40));
  const userSnap = await db.collection('daily_users').where('phone', '==', phoneNormalized).limit(1).get();
  
  if (userSnap.empty) {
    console.log('❌ USER NOT FOUND in daily_users collection');
    console.log(`No account registered for ${phoneNormalized}`);
    process.exit(1);
  }

  const userDoc = userSnap.docs[0];
  const uid = userDoc.id;
  const user = userDoc.data();

  console.log(`✓ User found: ${uid}`);
  console.log(`  • Email: ${user.email || 'N/A'}`);
  console.log(`  • Display name: ${user.displayName || 'N/A'}`);
  console.log(`  • Phone: ${user.phone}`);
  console.log(`  • Status: ${user.status}`);
  console.log(`  • Tier: ${user.tier || 'N/A'}`);
  console.log(`  • SMS Opt-In: ${user.smsOptIn}`);
  console.log(`  • Timezone: ${user.timezone}`);
  console.log(`  • Send Time: ${user.sendTime}`);
  console.log(`  • Section: ${user.section}`);
  console.log(`  • Created: ${user.createdAt?.toDate?.().toISOString() || 'N/A'}`);
  console.log(`  • Trial Expires: ${user.trialEnd?.toDate?.().toISOString() || 'N/A'}`);
  console.log(`  • Billing ID: ${user.stripeCustomerId || 'N/A'}`);

  // ========== STEP 2: Check today's session ==========
  console.log('\n📅 STEP 2: Today\'s Session Status');
  console.log('─'.repeat(40));
  const nowInTz = new Intl.DateTimeFormat('en-CA', {
    timeZone: user.timezone || 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());

  const sessionId = `${uid}_${nowInTz}`;
  const sessionDoc = await db.collection('daily_sessions').doc(sessionId).get();
  
  if (!sessionDoc.exists) {
    console.log(`❌ No session for today (${nowInTz})`);
  } else {
    const session = sessionDoc.data();
    console.log(`✓ Session: ${sessionId}`);
    console.log(`  • State: ${session.state}`);
    console.log(`  • Questions answered: ${session.questionsAnswered}/${session.dailyCap}`);
    console.log(`  • Correct: ${session.questionsCorrect}`);
    console.log(`  • Current Q ID: ${session.currentQuestionId || 'N/A'}`);
    console.log(`  • Started: ${session.createdAt?.toDate?.().toISOString() || 'N/A'}`);
    console.log(`  • Last activity: ${session.lastActivityAt?.toDate?.().toISOString() || 'N/A'}`);
  }

  // ========== STEP 3: SMS Logs (last 20) ==========
  console.log('\n📨 STEP 3: SMS Delivery Log (Last 20)');
  console.log('─'.repeat(40));
  const smsLogs = await db.collection('daily_sms_log')
    .where('uid', '==', uid)
    .orderBy('sentAt', 'desc')
    .limit(20)
    .get();

  if (smsLogs.empty) {
    console.log('❌ No SMS logs found for this user');
  } else {
    console.log(`✓ Found ${smsLogs.size} SMS records:\n`);
    smsLogs.docs.forEach((doc, i) => {
      const log = doc.data();
      const time = log.sentAt?.toDate?.().toISOString() || 'unknown';
      console.log(`${i + 1}. [${log.direction || 'N/A'}] ${time}`);
      console.log(`   To: ${log.to} | Status: ${log.status}`);
      console.log(`   Telnyx ID: ${log.telnyxMessageId || 'pending'}`);
      console.log(`   Body preview: ${(log.body || '').substring(0, 80)}...`);
      if (log.error) console.log(`   ERROR: ${log.error}`);
      console.log('');
    });
  }

  // ========== STEP 4: Streak & Stats ==========
  console.log('📊 STEP 4: Streak & Performance');
  console.log('─'.repeat(40));
  const streakDoc = await db.collection('daily_streaks').doc(uid).get();
  if (streakDoc.exists) {
    const streak = streakDoc.data();
    console.log(`✓ Current streak: 🔥 ${streak.currentStreak || 0} days`);
    console.log(`  • Last updated: ${streak.lastActivityAt?.toDate?.().toISOString() || 'N/A'}`);
  } else {
    console.log('❌ No streak record yet');
  }

  // ========== STEP 5: Payment Status ==========
  console.log('\n💳 STEP 5: Payment & Subscription');
  console.log('─'.repeat(40));
  console.log(`  • Stripe Customer ID: ${user.stripeCustomerId || 'NOT SET'}`);
  console.log(`  • Last payment: ${user.lastPaymentAt?.toDate?.().toISOString() || 'N/A'}`);
  console.log(`  • Subscription trial: ${user.trialStart?.toDate?.().toISOString() || 'N/A'} → ${user.trialEnd?.toDate?.().toISOString() || 'N/A'}`);

  // ========== STEP 6: Check send time window ==========
  console.log('\n⏰ STEP 6: Send Time Analysis');
  console.log('─'.repeat(40));
  const sendTime = user.sendTime || '07:00';
  const timezone = user.timezone || 'America/New_York';
  const [sendH, sendM] = sendTime.split(':').map(Number);
  
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  const currentTimeInTz = formatter.format(now);

  console.log(`  • User timezone: ${timezone}`);
  console.log(`  • Current time: ${currentTimeInTz}`);
  console.log(`  • Send time configured: ${sendTime}`);
  console.log(`  • Send window: ${sendTime} to ${String(sendH).padStart(2, '0')}:${String(sendM + 15).padStart(2, '0')} (15m window)`);

  // Check quiet hours
  const [currentH, currentM] = currentTimeInTz.split(/[: ]/g).slice(0, 2).map(Number);
  const isPM = currentTimeInTz.includes('PM');
  const adjustedCurrentH = isPM && currentH !== 12 ? currentH + 12 : (currentH === 12 && !isPM ? 0 : currentH);
  const isInQuietHours = adjustedCurrentH >= 21 || adjustedCurrentH < 7;
  console.log(`  • In quiet hours (9PM-7AM)? ${isInQuietHours ? '🔴 YES (no sends)' : '🟢 NO'}`);

  // ========== STEP 7: Account flags ==========
  console.log('\n🚩 STEP 7: Account Checks');
  console.log('─'.repeat(40));
  const checks = [
    { name: 'SMS Opt-In Enabled', ok: user.smsOptIn === true },
    { name: 'Status is active or trialing', ok: user.status === 'active' || user.status === 'trialing' },
    { name: 'Phone number set', ok: !!user.phone },
    { name: 'Timezone set', ok: !!user.timezone },
    { name: 'Send time set', ok: !!user.sendTime },
    { name: 'Trial not expired', ok: !user.trialEnd || new Date() < user.trialEnd.toDate() },
  ];

  checks.forEach(check => {
    console.log(`  ${check.ok ? '✓' : '❌'} ${check.name}`);
  });

  const allChecksPassed = checks.every(c => c.ok);
  if (!allChecksPassed) {
    console.log('\n⚠️  ISSUES FOUND - see failed checks above');
  } else {
    console.log('\n✅ ALL CHECKS PASSED');
  }

  console.log('\n========================================\n');
  process.exit(0);
})().catch(e => {
  console.error('❌ Error:', e.message);
  console.error(e);
  process.exit(1);
});

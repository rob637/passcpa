/**
 * Query signup metrics for both main app and Daily CPA
 */
const admin = require('firebase-admin');
const path = require('path');
const sa = require(path.join(__dirname, '..', 'serviceAccountKey.prod.json'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

(async () => {
  console.log(`\n========================================`);
  console.log(`SIGNUP METRICS REPORT`);
  console.log(`========================================\n`);

  // Main app users
  console.log(`📊 MAIN APP USERS`);
  console.log('─'.repeat(40));
  const usersSnap = await db.collection('users').get();
  console.log(`Total users: ${usersSnap.size}`);
  
  // Count by creation date
  const usersByDay = {};
  usersSnap.docs.forEach(doc => {
    const createdAt = doc.data().createdAt?.toDate?.();
    if (createdAt) {
      const dateStr = createdAt.toISOString().split('T')[0];
      usersByDay[dateStr] = (usersByDay[dateStr] || 0) + 1;
    }
  });
  
  const sortedDates = Object.keys(usersByDay).sort().slice(-7);
  console.log(`\nLast 7 days:`);
  sortedDates.forEach(date => {
    console.log(`  ${date}: ${usersByDay[date]} signups`);
  });

  // Daily CPA users
  console.log(`\n📱 DAILY CPA SIGNUPS`);
  console.log('─'.repeat(40));
  const dailyUsersSnap = await db.collection('daily_users').get();
  console.log(`Total signed up: ${dailyUsersSnap.size}`);

  // Count by status
  const statuses = {};
  const tiers = {};
  const createdByDay = {};
  
  dailyUsersSnap.docs.forEach(doc => {
    const data = doc.data();
    statuses[data.status] = (statuses[data.status] || 0) + 1;
    tiers[data.tier] = (tiers[data.tier] || 0) + 1;
    
    const createdAt = data.createdAt?.toDate?.();
    if (createdAt) {
      const dateStr = createdAt.toISOString().split('T')[0];
      createdByDay[dateStr] = (createdByDay[dateStr] || 0) + 1;
    }
  });

  console.log(`\nBy Status:`);
  Object.entries(statuses).forEach(([status, count]) => {
    console.log(`  ${status}: ${count}`);
  });

  console.log(`\nBy Tier:`);
  Object.entries(tiers).forEach(([tier, count]) => {
    console.log(`  ${tier}: ${count}`);
  });

  const sortedDailyDates = Object.keys(createdByDay).sort().slice(-7);
  console.log(`\nSignups by day (last 7):`);
  sortedDailyDates.forEach(date => {
    console.log(`  ${date}: ${createdByDay[date]} signups`);
  });

  // Funnel events
  console.log(`\n🔀 FUNNEL EVENTS`);
  console.log('─'.repeat(40));
  const funnelSnap = await db.collection('daily_funnel_events').get();
  const events = {};
  funnelSnap.docs.forEach(doc => {
    const event = doc.data().event;
    events[event] = (events[event] || 0) + 1;
  });

  Object.entries(events).forEach(([event, count]) => {
    console.log(`  ${event}: ${count}`);
  });

  // SMS Log summary
  console.log(`\n📨 SMS DELIVERY SUMMARY`);
  console.log('─'.repeat(40));
  const smsSnap = await db.collection('daily_sms_log').get();
  console.log(`Total SMS logged: ${smsSnap.size}`);

  const statuses24h = {};
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  
  smsSnap.docs.forEach(doc => {
    const data = doc.data();
    const sentAt = data.sentAt?.toDate?.();
    if (sentAt && sentAt > yesterday) {
      statuses24h[data.status] = (statuses24h[data.status] || 0) + 1;
    }
  });

  console.log(`\nLast 24 hours:`);
  Object.entries(statuses24h).forEach(([status, count]) => {
    console.log(`  ${status}: ${count} SMS`);
  });

  console.log(`\n========================================\n`);
  process.exit(0);
})().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});

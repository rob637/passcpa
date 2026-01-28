/**
 * VoraPrep Cloud Functions (Gen 2)
 * - Daily study reminder push notifications (FCM)
 * - Weekly progress report emails (Nodemailer/Gmail)
 */

const { onSchedule } = require('firebase-functions/v2/scheduler');
const { onDocumentUpdated, onDocumentCreated } = require('firebase-functions/v2/firestore');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

// Initialize Firebase Admin
admin.initializeApp();
const db = admin.firestore();
const messaging = admin.messaging();

// Email configuration using Gmail SMTP (free, 500/day limit)
// Set via: firebase functions:secrets:set GMAIL_USER GMAIL_APP_PASSWORD
// Get app password: Google Account → Security → 2FA → App Passwords
const GMAIL_USER = process.env.GMAIL_USER; // e.g., noreply@voraprep.com or your Gmail
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD; // 16-char app password

let emailTransporter = null;
if (GMAIL_USER && GMAIL_APP_PASSWORD) {
  emailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });
}

// ============================================================================
// DAILY STUDY REMINDERS (FCM Push Notifications)
// Runs every hour to check which users need reminders
// ============================================================================

exports.sendDailyReminders = onSchedule({
  schedule: 'every 60 minutes',
  timeZone: 'America/New_York',
  memory: '256MiB',
  timeoutSeconds: 60,
}, async (event) => {
  const now = new Date();
  const currentHour = now.getHours().toString().padStart(2, '0');
  
  console.log(`Checking for daily reminders at hour ${currentHour}`);
  
  try {
    // Find users with reminder enabled
    const usersSnapshot = await db.collection('users')
      .where('dailyReminderEnabled', '==', true)
      .get();
    
    const notifications = [];
    
    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();
      const reminderTime = userData.dailyReminderTime || '09:00';
      const reminderHour = reminderTime.split(':')[0];
      
      // Check if this is the right hour for this user
      if (reminderHour !== currentHour) continue;
      
      // Check if user has FCM tokens
      const fcmTokens = userData.fcmTokens || [];
      if (fcmTokens.length === 0) continue;
      
      // Check if user already studied today
      const today = now.toISOString().split('T')[0];
      const todayLogRef = db.collection('users').doc(userDoc.id).collection('daily_log').doc(today);
      const todayLog = await todayLogRef.get();
      
      let message = getContextualReminder(now);
      
      if (todayLog.exists) {
        const logData = todayLog.data();
        if ((logData.earnedPoints || 0) > 0) {
          // User already studied, send encouragement
          message = {
            title: '🔥 Keep it going!',
            body: `You've earned ${logData.earnedPoints} points today. Ready for more?`
          };
        }
      }
      
      // Send to all user's devices
      for (const token of fcmTokens) {
        notifications.push({
          token,
          notification: {
            title: message.title,
            body: message.body,
          },
          data: {
            type: 'daily_reminder',
            userId: userDoc.id,
          },
          webpush: {
            fcmOptions: {
              link: 'https://voraprep.com/study'
            }
          }
        });
      }
    }
    
    if (notifications.length > 0) {
      // Send in batches of 500 (FCM limit)
      const batchSize = 500;
      for (let i = 0; i < notifications.length; i += batchSize) {
        const batch = notifications.slice(i, i + batchSize);
        const response = await messaging.sendEach(batch);
        console.log(`Sent ${response.successCount} notifications, ${response.failureCount} failed`);
        
        // Clean up invalid tokens
        response.responses.forEach((resp, idx) => {
          if (!resp.success && resp.error?.code === 'messaging/registration-token-not-registered') {
            console.log('Invalid token detected, should be removed');
          }
        });
      }
    }
    
    console.log(`Processed ${notifications.length} reminder notifications`);
  } catch (error) {
    console.error('Error sending daily reminders:', error);
    throw error;
  }
});

// ============================================================================
// WEEKLY PROGRESS REPORT EMAILS
// Runs every Sunday at 9am
// ============================================================================

exports.sendWeeklyReports = onSchedule({
  schedule: 'every sunday 09:00',
  timeZone: 'America/New_York',
  memory: '512MiB',
  timeoutSeconds: 120,
}, async (event) => {
  if (!emailTransporter) {
    console.error('Email not configured (set GMAIL_USER and GMAIL_APP_PASSWORD)');
    return;
  }
  
  console.log('Generating weekly progress reports...');
  
  try {
    // Find users with weekly report enabled
    const usersSnapshot = await db.collection('users')
      .where('weeklyReportEnabled', '==', true)
      .get();
    
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    let sentCount = 0;
    let errorCount = 0;
    
    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();
      const userEmail = userData.email;
      
      if (!userEmail) continue;
      
      // Aggregate last 7 days of activity
      const weeklyStats = await getWeeklyStats(userDoc.id, weekAgo);
      
      // Generate email content
      const emailContent = generateWeeklyReportEmail(userData, weeklyStats);
      
      try {
        await emailTransporter.sendMail({
          from: `"VoraPrep" <${GMAIL_USER}>`,
          to: userEmail,
          subject: `📊 Your Weekly CPA Study Report - ${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
          html: emailContent,
        });
        sentCount++;
      } catch (emailError) {
        console.error(`Failed to send email to ${userEmail}:`, emailError.message);
        errorCount++;
      }
    }
    
    console.log(`Sent ${sentCount} weekly reports, ${errorCount} failed`);
  } catch (error) {
    console.error('Error sending weekly reports:', error);
    throw error;
  }
});

// ============================================================================
// FCM TOKEN MANAGEMENT
// Log/track FCM token changes
// ============================================================================

exports.onFcmTokenUpdate = onDocumentUpdated({
  document: 'users/{userId}',
  memory: '128MiB',
}, async (event) => {
  const before = event.data.before.data();
  const after = event.data.after.data();
  
  // Check if fcmTokens changed
  const beforeTokens = before.fcmTokens || [];
  const afterTokens = after.fcmTokens || [];
  
  if (JSON.stringify(beforeTokens) !== JSON.stringify(afterTokens)) {
    console.log(`FCM tokens updated for user ${event.params.userId}: ${afterTokens.length} tokens`);
  }
});

// ============================================================================
// WELCOME EMAIL
// Triggered when a new user document is created
// ============================================================================

exports.sendWelcomeEmail = onDocumentCreated({
  document: 'users/{userId}',
  memory: '256MiB',
}, async (event) => {
  if (!emailTransporter) {
    console.log('Email not configured, skipping welcome email');
    return;
  }
  
  const userData = event.data.data();
  const userEmail = userData.email;
  const displayName = userData.displayName || 'CPA Candidate';
  
  if (!userEmail) {
    console.log('No email found for new user');
    return;
  }
  
  try {
    await emailTransporter.sendMail({
      from: `"VoraPrep" <${GMAIL_USER}>`,
      to: userEmail,
      subject: `Welcome to VoraPrep, ${displayName}! 🎉`,
      html: generateWelcomeEmail(displayName),
    });
    console.log(`Welcome email sent to ${userEmail}`);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
});

// ============================================================================
// WAITLIST CONFIRMATION EMAIL
// Triggered when someone signs up for the waitlist
// ============================================================================

exports.sendWaitlistConfirmation = onDocumentCreated({
  document: 'waitlist/{entryId}',
  memory: '256MiB',
}, async (event) => {
  if (!emailTransporter) {
    console.log('Email not configured, skipping waitlist email');
    return;
  }
  
  const data = event.data.data();
  const email = data.email;
  
  if (!email) {
    console.log('No email found in waitlist entry');
    return;
  }
  
  try {
    await emailTransporter.sendMail({
      from: `"VoraPrep" <${GMAIL_USER}>`,
      to: email,
      subject: "You're on the VoraPrep Beta List! 🚀",
      html: generateWaitlistEmail(email),
    });
    console.log(`Waitlist confirmation sent to ${email}`);
  } catch (error) {
    console.error('Error sending waitlist email:', error);
  }
});

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getContextualReminder(now) {
  const hour = now.getHours();
  const day = now.getDay();
  
  const messages = {
    morning: [
      { title: '🌅 Good morning!', body: 'Start your day with 10 questions to build momentum.' },
      { title: '☀️ Rise and shine!', body: 'Your CPA journey continues. Ready for a quick study session?' },
      { title: '🎯 Morning motivation', body: "Consistent daily practice beats cramming. Let's go!" },
    ],
    afternoon: [
      { title: '💪 Afternoon check-in', body: 'Take a break from work with some CPA practice.' },
      { title: '📝 Quick quiz?', body: '5 minutes now saves 50 minutes later.' },
      { title: '⚡ Power through', body: 'Energy dip? Wake up your brain with a quick simulation.' },
    ],
    evening: [
      { title: '🌙 Evening review', body: 'Wrap up your day with a rapid review session.' },
      { title: '🦉 Night owl?', body: 'Perfect time to study while the world is quiet.' },
      { title: '💤 Sleep learning', body: 'Review your weak spots before bed for better retention.' },
    ],
    weekend: [
      { title: '📅 Weekend warrior', body: 'This is where the real progress happens. Keep going!' },
      { title: '🚀 Big gains', body: 'Weekends are for deep work. Tackle a full practice exam?' },
    ],
  };
  
  let category = 'morning';
  if (day === 0 || day === 6) {
    category = 'weekend';
  } else if (hour >= 12 && hour < 17) {
    category = 'afternoon';
  } else if (hour >= 17) {
    category = 'evening';
  }
  
  const categoryMessages = messages[category];
  return categoryMessages[Math.floor(Math.random() * categoryMessages.length)];
}

async function getWeeklyStats(userId, startDate) {
  const logsRef = db.collection('users').doc(userId).collection('daily_log');
  const startDateStr = startDate.toISOString().split('T')[0];
  
  const snapshot = await logsRef
    .where('__name__', '>=', startDateStr)
    .get();
  
  let totalQuestions = 0;
  let correctQuestions = 0;
  let totalMinutes = 0;
  let totalPoints = 0;
  let daysStudied = 0;
  const topicBreakdown = {};
  
  snapshot.forEach(doc => {
    const data = doc.data();
    totalQuestions += data.questionsAttempted || 0;
    correctQuestions += data.questionsCorrect || 0;
    totalMinutes += data.studyTimeMinutes || 0;
    totalPoints += data.earnedPoints || 0;
    if ((data.earnedPoints || 0) > 0) daysStudied++;
    
    // Topic breakdown from activities
    (data.activities || []).forEach(activity => {
      if (activity.type === 'mcq' && activity.topic) {
        if (!topicBreakdown[activity.topic]) {
          topicBreakdown[activity.topic] = { attempted: 0, correct: 0 };
        }
        topicBreakdown[activity.topic].attempted++;
        if (activity.isCorrect) topicBreakdown[activity.topic].correct++;
      }
    });
  });
  
  return {
    totalQuestions,
    correctQuestions,
    accuracy: totalQuestions > 0 ? Math.round((correctQuestions / totalQuestions) * 100) : 0,
    totalMinutes: Math.round(totalMinutes),
    totalPoints,
    daysStudied,
    topicBreakdown
  };
}

function generateWeeklyReportEmail(userData, stats) {
  const displayName = userData.displayName || 'CPA Candidate';
  const section = userData.examSection || 'CPA';
  
  // Find weakest and strongest topics
  const topics = Object.entries(stats.topicBreakdown)
    .map(([topic, data]) => ({
      topic,
      accuracy: data.attempted > 0 ? Math.round((data.correct / data.attempted) * 100) : 0,
      attempted: data.attempted
    }))
    .filter(t => t.attempted >= 3)
    .sort((a, b) => a.accuracy - b.accuracy);
  
  const weakestTopic = topics[0];
  const strongestTopic = topics[topics.length - 1];
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Weekly Progress Report</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #334155; max-width: 600px; margin: 0 auto; padding: 20px;">
  
  <div style="text-align: center; margin-bottom: 30px;">
    <div style="display: inline-block; background: #3b82f6; color: white; padding: 10px 20px; border-radius: 12px; font-weight: bold; font-size: 20px;">
      📊 VoraPrep
    </div>
  </div>
  
  <h1 style="color: #1e293b; font-size: 24px; margin-bottom: 10px;">
    Hi ${displayName}! 👋
  </h1>
  
  <p style="color: #64748b; font-size: 16px;">
    Here's your ${section} study progress for the past week:
  </p>
  
  <!-- Stats Grid -->
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 25px 0;">
    <div style="background: #f1f5f9; padding: 20px; border-radius: 12px; text-align: center;">
      <div style="font-size: 32px; font-weight: bold; color: #3b82f6;">${stats.totalQuestions}</div>
      <div style="color: #64748b; font-size: 14px;">Questions Answered</div>
    </div>
    <div style="background: #f1f5f9; padding: 20px; border-radius: 12px; text-align: center;">
      <div style="font-size: 32px; font-weight: bold; color: ${stats.accuracy >= 70 ? '#10b981' : stats.accuracy >= 50 ? '#f59e0b' : '#ef4444'};">${stats.accuracy}%</div>
      <div style="color: #64748b; font-size: 14px;">Accuracy</div>
    </div>
    <div style="background: #f1f5f9; padding: 20px; border-radius: 12px; text-align: center;">
      <div style="font-size: 32px; font-weight: bold; color: #8b5cf6;">${stats.totalMinutes}</div>
      <div style="color: #64748b; font-size: 14px;">Minutes Studied</div>
    </div>
    <div style="background: #f1f5f9; padding: 20px; border-radius: 12px; text-align: center;">
      <div style="font-size: 32px; font-weight: bold; color: #f97316;">${stats.daysStudied}/7</div>
      <div style="color: #64748b; font-size: 14px;">Days Active</div>
    </div>
  </div>
  
  ${weakestTopic ? `
  <!-- Focus Area -->
  <div style="background: #fef3c7; border: 1px solid #fcd34d; padding: 20px; border-radius: 12px; margin: 20px 0;">
    <div style="font-weight: bold; color: #92400e; margin-bottom: 5px;">🎯 Focus Area This Week</div>
    <div style="color: #78350f;">
      <strong>${weakestTopic.topic}</strong> (${weakestTopic.accuracy}% accuracy) needs more practice.
    </div>
  </div>
  ` : ''}
  
  ${strongestTopic ? `
  <!-- Strength -->
  <div style="background: #d1fae5; border: 1px solid #6ee7b7; padding: 20px; border-radius: 12px; margin: 20px 0;">
    <div style="font-weight: bold; color: #065f46; margin-bottom: 5px;">💪 Your Strength</div>
    <div style="color: #047857;">
      Great work on <strong>${strongestTopic.topic}</strong> (${strongestTopic.accuracy}% accuracy)!
    </div>
  </div>
  ` : ''}
  
  <!-- CTA Button -->
  <div style="text-align: center; margin: 30px 0;">
    <a href="https://voraprep.com/practice" style="display: inline-block; background: #3b82f6; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
      Continue Studying →
    </a>
  </div>
  
  <!-- Footer -->
  <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px; text-align: center; color: #94a3b8; font-size: 12px;">
    <p>VoraPrep - Your AI-Powered CPA Exam Prep Partner</p>
    <p>
      <a href="https://voraprep.com/settings" style="color: #64748b;">Manage email preferences</a>
    </p>
    <p style="margin-top: 15px; font-size: 11px;">
      VoraPrep is not affiliated with AICPA, NASBA, or any state board of accountancy.
    </p>
  </div>
  
</body>
</html>
  `;
}

// ============================================================================
// WELCOME EMAIL TEMPLATE
// ============================================================================

function generateWelcomeEmail(displayName) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to VoraPrep</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #334155; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
  
  <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
    
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; border-radius: 12px; font-weight: bold; font-size: 24px;">
        📚 VoraPrep
      </div>
    </div>
    
    <h1 style="color: #1e293b; font-size: 28px; margin-bottom: 10px; text-align: center;">
      Welcome, ${displayName}! 🎉
    </h1>
    
    <p style="color: #64748b; font-size: 18px; text-align: center; margin-bottom: 30px;">
      You're one step closer to passing your CPA exam.
    </p>
    
    <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 25px; border-radius: 12px; margin: 25px 0;">
      <div style="font-size: 20px; font-weight: bold; margin-bottom: 10px;">🎁 Beta Bonus</div>
      <div style="font-size: 16px; opacity: 0.95;">
        As a beta user, you have <strong>100% FREE access</strong> to all features:
      </div>
      <ul style="margin: 15px 0 0 0; padding-left: 20px;">
        <li>2,500+ practice questions</li>
        <li>300+ lessons</li>
        <li>AI Tutor assistance</li>
        <li>Exam simulator</li>
        <li>Progress analytics</li>
      </ul>
    </div>
    
    <h2 style="color: #1e293b; font-size: 20px; margin: 30px 0 15px;">Here's how to get started:</h2>
    
    <div style="margin: 20px 0;">
      <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
        <div style="background: #dbeafe; color: #1d4ed8; width: 32px; height: 32px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">1</div>
        <div>
          <div style="font-weight: 600; color: #1e293b;">Complete your profile</div>
          <div style="color: #64748b; font-size: 14px;">Select your exam section and target date</div>
        </div>
      </div>
      
      <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
        <div style="background: #dbeafe; color: #1d4ed8; width: 32px; height: 32px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">2</div>
        <div>
          <div style="font-weight: 600; color: #1e293b;">Start with a diagnostic quiz</div>
          <div style="color: #64748b; font-size: 14px;">We'll identify your strengths and weaknesses</div>
        </div>
      </div>
      
      <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
        <div style="background: #dbeafe; color: #1d4ed8; width: 32px; height: 32px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">3</div>
        <div>
          <div style="font-weight: 600; color: #1e293b;">Practice daily</div>
          <div style="color: #64748b; font-size: 14px;">Consistency beats cramming every time</div>
        </div>
      </div>
    </div>
    
    <div style="text-align: center; margin: 35px 0;">
      <a href="https://voraprep.com/dashboard" style="display: inline-block; background: #3b82f6; color: white; padding: 16px 40px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 18px;">
        Start Studying Now →
      </a>
    </div>
    
    <div style="background: #f1f5f9; padding: 20px; border-radius: 12px; margin-top: 30px;">
      <div style="font-weight: 600; color: #1e293b; margin-bottom: 10px;">💡 Pro Tip</div>
      <div style="color: #64748b; font-size: 14px;">
        Enable daily study reminders in Settings to build a consistent habit. Studies show that 30 minutes daily is more effective than 4-hour weekend sessions!
      </div>
    </div>
    
  </div>
  
  <!-- Footer -->
  <div style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 30px; padding: 20px;">
    <p>Questions? Reply to this email or visit our <a href="https://voraprep.com/pricing" style="color: #64748b;">FAQ</a></p>
    <p style="margin-top: 15px;">
      VoraPrep - Your AI-Powered CPA Exam Prep Partner
    </p>
    <p style="font-size: 11px; margin-top: 10px;">
      VoraPrep is not affiliated with AICPA, NASBA, or any state board of accountancy.
    </p>
  </div>
  
</body>
</html>
  `;
}

// ============================================================================
// WAITLIST CONFIRMATION EMAIL TEMPLATE
// ============================================================================

function generateWaitlistEmail(email) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're on the VoraPrep Beta List!</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #334155; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
  
  <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
    
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; border-radius: 12px; font-weight: bold; font-size: 24px;">
        📚 VoraPrep
      </div>
    </div>
    
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="font-size: 60px; margin-bottom: 10px;">🎉</div>
      <h1 style="color: #1e293b; font-size: 28px; margin-bottom: 10px;">
        You're on the list!
      </h1>
      <p style="color: #64748b; font-size: 16px;">
        Thanks for joining the VoraPrep beta. We're excited to help you pass your CPA exam!
      </p>
    </div>
    
    <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 25px; border-radius: 12px; margin: 25px 0; text-align: center;">
      <div style="font-size: 20px; font-weight: bold; margin-bottom: 10px;">🚀 Why Wait?</div>
      <div style="font-size: 16px; opacity: 0.95; margin-bottom: 15px;">
        Our beta is <strong>100% FREE</strong> with all features unlocked!
      </div>
      <a href="https://voraprep.com/register" style="display: inline-block; background: white; color: #059669; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
        Create Your Free Account →
      </a>
    </div>
    
    <h2 style="color: #1e293b; font-size: 18px; margin: 30px 0 15px;">What you'll get:</h2>
    
    <div style="margin: 20px 0;">
      <div style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
        <span style="color: #10b981; margin-right: 10px;">✓</span>
        <span style="color: #334155;">2,500+ practice questions across all CPA sections</span>
      </div>
      <div style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
        <span style="color: #10b981; margin-right: 10px;">✓</span>
        <span style="color: #334155;">AI-powered tutor for instant explanations</span>
      </div>
      <div style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
        <span style="color: #10b981; margin-right: 10px;">✓</span>
        <span style="color: #334155;">300+ lessons covering FAR, AUD, REG, BAR, ISC, TCP</span>
      </div>
      <div style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
        <span style="color: #10b981; margin-right: 10px;">✓</span>
        <span style="color: #334155;">Realistic exam simulator with TBS practice</span>
      </div>
      <div style="padding: 12px 0;">
        <span style="color: #10b981; margin-right: 10px;">✓</span>
        <span style="color: #334155;">Progress tracking and adaptive learning</span>
      </div>
    </div>
    
    <div style="background: #fef3c7; border: 1px solid #fcd34d; padding: 20px; border-radius: 12px; margin: 25px 0;">
      <div style="font-weight: 600; color: #92400e; margin-bottom: 5px;">⚡ Limited Time</div>
      <div style="color: #78350f; font-size: 14px;">
        Beta users who sign up now will receive <strong>Founding Member</strong> pricing ($199 lifetime access) when we launch paid plans in Q3 2026.
      </div>
    </div>
    
  </div>
  
  <!-- Footer -->
  <div style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 30px; padding: 20px;">
    <p>
      You received this email because ${email} was signed up at voraprep.com
    </p>
    <p style="margin-top: 15px;">
      VoraPrep - Your AI-Powered CPA Exam Prep Partner
    </p>
    <p style="font-size: 11px; margin-top: 10px;">
      VoraPrep is not affiliated with AICPA, NASBA, or any state board of accountancy.
    </p>
  </div>
  
</body>
</html>
  `;
}


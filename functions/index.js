/**
 * VoraPrep Cloud Functions (Gen 2)
 * - Daily study reminder push notifications (FCM)
 * - Weekly progress report emails (Resend)
 * - Custom branded password reset emails
 * - Stripe subscription management
 */

const { onSchedule } = require('firebase-functions/v2/scheduler');
const { onDocumentUpdated, onDocumentCreated } = require('firebase-functions/v2/firestore');
const { onCall, onRequest, HttpsError } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');
const { Resend } = require('resend');

// Shared content stats (questions, lessons, flashcards per course)
// Source of truth: shared/content-stats.json — copy to functions/ for deploy
const CONTENT_STATS = require('./content-stats.json');

// Initialize Firebase Admin
admin.initializeApp();
const db = admin.firestore();
const messaging = admin.messaging();

// ============================================================================
// STRIPE CONFIGURATION
// ============================================================================
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY?.trim();
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET?.trim();
// Publishable key is not secret but varies per environment (test vs live)
const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_51SzK1cQ9jgQM2iI4Iy1B5iRE5mi17YHRIS1R24vJRX9Cyrvc8W1Q0fjpJMFAfI1DSO3OziMXWFjQ8umbQZhxvFK300AKFvcEJb';

// Base URL for redirects — auto-detects from Firebase project ID, override via env
function detectAppBaseUrl() {
  if (process.env.APP_BASE_URL) return process.env.APP_BASE_URL;
  // Auto-detect environment from Firebase project ID
  const projectId = process.env.GCLOUD_PROJECT || process.env.GCP_PROJECT ||
    (process.env.FIREBASE_CONFIG ? JSON.parse(process.env.FIREBASE_CONFIG).projectId : null);
  if (projectId === 'passcpa-dev') return 'https://passcpa-dev.web.app';
  if (projectId === 'voraprep-staging') return 'https://voraprep-staging.web.app';
  return 'https://voraprep.com'; // production default
}
const APP_BASE_URL = detectAppBaseUrl();

// Allowed origins for Stripe redirect URLs (prevents open redirect)
const ALLOWED_ORIGINS = [
  'https://voraprep.com',
  'https://www.voraprep.com',
  'https://passcpa-dev.web.app',
  'https://passcpa-dev.firebaseapp.com',
  'https://voraprep-staging.web.app',
  'https://voraprep-staging.firebaseapp.com',
  'http://localhost:5173',
  'http://localhost:3000',
];

function getBaseUrl(clientOrigin) {
  if (clientOrigin && ALLOWED_ORIGINS.includes(clientOrigin)) {
    return clientOrigin;
  }
  return APP_BASE_URL;
}

let stripe = null;
if (STRIPE_SECRET_KEY) {
  const Stripe = require('stripe');
  stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2024-12-18.acacia',
  });
}

// Founder pricing window - users who subscribe before this date get founder rates (~40-44% off, locked 2 years)
const FOUNDER_DEADLINE = new Date('2026-04-30T23:59:59Z');

// Price lookup keys - maps our internal keys to what we'll use in checkout
// The lookup keys should match what you set in Stripe dashboard
const PRICE_LOOKUP_KEYS = {
  cpa: {
    annual: 'cpa_annual',
    monthly: 'cpa_monthly',
    founder_annual: 'cpa_founder_annual',
    founder_monthly: 'cpa_founder_monthly',
  },
  ea: {
    annual: 'ea_annual',
    monthly: 'ea_monthly',
    founder_annual: 'ea_founder_annual',
    founder_monthly: 'ea_founder_monthly',
  },
  cma: {
    annual: 'cma_annual',
    monthly: 'cma_monthly',
    founder_annual: 'cma_founder_annual',
    founder_monthly: 'cma_founder_monthly',
  },
  cia: {
    annual: 'cia_annual',
    monthly: 'cia_monthly',
    founder_annual: 'cia_founder_annual',
    founder_monthly: 'cia_founder_monthly',
  },
  cfp: {
    annual: 'cfp_annual',
    monthly: 'cfp_monthly',
    founder_annual: 'cfp_founder_annual',
    founder_monthly: 'cfp_founder_monthly',
  },
  cisa: {
    annual: 'cisa_annual',
    monthly: 'cisa_monthly',
    founder_annual: 'cisa_founder_annual',
    founder_monthly: 'cisa_founder_monthly',
  },
};

// ============================================================================
// COURSE-SPECIFIC CONFIGURATION
// Used to customize email content based on user's exam type
// Content stats (questions, lessons) pulled from shared/content-stats.json
// ============================================================================

/**
 * Format a number as "X,XXX+" (round down to nearest 100)
 */
function formatDisplayCount(n) {
  const rounded = Math.floor(n / 100) * 100;
  return rounded.toLocaleString('en-US') + '+';
}

const COURSE_CONFIG = {
  cpa: {
    name: 'CPA Exam',
    slug: 'cpa',
    tagline: 'Your AI-Powered CPA Exam Prep Partner',
    disclaimer: 'VoraPrep is not affiliated with AICPA, NASBA, or any state board of accountancy.',
  },
  ea: {
    name: 'EA Exam',
    slug: 'ea',
    tagline: 'Your AI-Powered EA Exam Prep Partner',
    disclaimer: 'VoraPrep is not affiliated with the IRS or Treasury Department.',
  },
  cma: {
    name: 'CMA Exam',
    slug: 'cma',
    tagline: 'Your AI-Powered CMA Exam Prep Partner',
    disclaimer: 'VoraPrep is not affiliated with the Institute of Management Accountants (IMA).',
  },
  cia: {
    name: 'CIA Exam',
    slug: 'cia',
    tagline: 'Your AI-Powered CIA Exam Prep Partner',
    disclaimer: 'VoraPrep is not affiliated with The Institute of Internal Auditors (IIA).',
  },
  cisa: {
    name: 'CISA Exam',
    slug: 'cisa',
    tagline: 'Your AI-Powered CISA Exam Prep Partner',
    disclaimer: 'VoraPrep is not affiliated with ISACA.',
  },
  cfp: {
    name: 'CFP Exam',
    slug: 'cfp',
    tagline: 'Your AI-Powered CFP Exam Prep Partner',
    disclaimer: 'VoraPrep is not affiliated with the CFP Board.',
  },
};

/**
 * Get course configuration for email content
 * @param {string} courseId - Course ID (cpa, ea, cma, etc.)
 * @returns {Object} Course-specific configuration for emails
 */
function getCourseConfig(courseId) {
  const config = COURSE_CONFIG[courseId] || COURSE_CONFIG.cpa;
  const stats = CONTENT_STATS[courseId] || CONTENT_STATS.cpa;
  return {
    ...config,
    questions: formatDisplayCount(stats.questions),
    lessons: formatDisplayCount(stats.lessons),
    flashcards: formatDisplayCount(stats.flashcards),
  };
}

// Email configuration using Resend (3,000 free emails/month)
// Set via: firebase functions:secrets:set RESEND_API_KEY
// Get API key from: https://resend.com/api-keys
const RESEND_API_KEY = process.env.RESEND_API_KEY?.trim();
const FROM_EMAIL = 'VoraPrep <noreply@voraprep.com>';
// Email to receive admin notifications (e.g. new signups)
const ADMIN_EMAIL = 'support@voraprep.com';

let resend = null;
if (RESEND_API_KEY) {
  resend = new Resend(RESEND_API_KEY);
}

// ============================================================================
// CUSTOM BRANDED PASSWORD RESET EMAIL
// Sends a friendly, VoraPrep-branded password reset email
// ============================================================================

exports.sendCustomPasswordReset = onCall({
  cors: true,
  invoker: 'public',
  enforceAppCheck: false,
  secrets: ['RESEND_API_KEY'],
}, async (request) => {
  const { email } = request.data;
  
  if (!email) {
    throw new HttpsError('invalid-argument', 'Email is required');
  }

  // Lazy-initialize Resend client (secrets only available at runtime in Gen 2)
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new HttpsError('failed-precondition', 'Email service not configured. Set RESEND_API_KEY.');
  }
  const resendClient = new Resend(apiKey);

  try {
    // Generate Firebase password reset link
    const resetLink = await admin.auth().generatePasswordResetLink(email, {
      url: `${APP_BASE_URL}/login`,
    });

    // Send branded email via Resend
    const { error } = await resendClient.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: '🔐 Reset Your VoraPrep Password',
      html: getPasswordResetEmailHTML(email, resetLink),
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error(error.message);
    }

    console.log(`Password reset email sent to ${email}`);
    return { success: true };
  } catch (error) {
    console.error('Password reset error:', error);
    
    // Handle user not found gracefully (don't reveal if email exists)
    if (error.code === 'auth/user-not-found') {
      return { success: true }; // Silent success for security
    }
    
    throw new HttpsError('internal', 'Failed to send password reset email');
  }
});

// Password Reset Email Template
function getPasswordResetEmailHTML(email, resetLink) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your VoraPrep Password</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f1f5f9;">
  
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 30px;">
      <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto;">
        <tr>
          <td style="width: 40px; height: 40px; background-color: #1a73e8; border-radius: 10px; text-align: center; vertical-align: middle; font-size: 20px; color: white; font-weight: bold; line-height: 40px;">V</td>
          <td style="padding-left: 10px; font-size: 24px; font-weight: 700; color: #0f172a; vertical-align: middle;">VoraPrep</td>
        </tr>
      </table>
    </div>
    
    <!-- Main Content -->
    <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
      
      <h1 style="color: #0f172a; font-size: 24px; margin: 0 0 15px 0; text-align: center;">
        Reset Your Password
      </h1>
      
      <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0; text-align: center;">
        Hi there! 👋 We received a request to reset the password for your VoraPrep account.
      </p>
      
      <!-- CTA Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetLink}" style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 16px 40px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 16px;">
          Reset My Password
        </a>
      </div>
      
      <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 25px 0 0 0; text-align: center;">
        This link will expire in 1 hour for security reasons.
      </p>
      
      <div style="border-top: 1px solid #e2e8f0; margin: 30px 0; padding-top: 20px;">
        <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 0;">
          <strong>Didn't request this?</strong> No worries! You can safely ignore this email and your password will remain unchanged.
        </p>
      </div>
      
      <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0;">
        If the button doesn't work, copy and paste this link into your browser:
      </p>
      <p style="color: #3b82f6; font-size: 12px; word-break: break-all; margin: 10px 0 0 0;">
        ${resetLink}
      </p>
      
    </div>
    
    <!-- Footer -->
    <div style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 30px; padding: 20px;">
      <p style="margin: 0;">
        This email was sent to ${email}
      </p>
      <p style="margin: 15px 0 0 0;">
        <strong>VoraPrep</strong> - Your AI-Powered Exam Prep Partner
      </p>
      <p style="margin: 15px 0 0 0;">
        <a href="${APP_BASE_URL}" style="color: #3b82f6; text-decoration: none;">voraprep.com</a>
      </p>
    </div>
    
  </div>
  
</body>
</html>
  `;
}

// ============================================================================
// CUSTOM BRANDED EMAIL VERIFICATION
// Sends a friendly, VoraPrep-branded verification email via Resend
// Bypasses Firebase's unreliable built-in email verification
// ============================================================================

exports.sendCustomEmailVerification = onCall({
  cors: true,
  invoker: 'public',
  enforceAppCheck: false,
  secrets: ['RESEND_API_KEY'],
}, async (request) => {
  const { email } = request.data;

  if (!email) {
    throw new HttpsError('invalid-argument', 'Email is required');
  }

  if (!resend) {
    throw new HttpsError('failed-precondition', 'Email service not configured. Set RESEND_API_KEY.');
  }

  try {
    // Generate Firebase email verification link
    const verificationLink = await admin.auth().generateEmailVerificationLink(email, {
      url: `${APP_BASE_URL}/login`,
    });

    // Initialize Resend lazily to ensure secret is available
    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) {
      throw new HttpsError('failed-precondition', 'RESEND_API_KEY not available');
    }
    const resendClient = new Resend(apiKey);
    console.log(`Resend initialized, sending verification to ${email}, API key starts: ${apiKey.substring(0, 8)}...`);

    // Send branded email via Resend
    const { data, error } = await resendClient.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: '✉️ Verify Your VoraPrep Email',
      html: getEmailVerificationHTML(email, verificationLink),
    });

    if (error) {
      console.error('Resend verification email error:', JSON.stringify(error));
      throw new Error(error.message);
    }

    console.log(`Verification email sent to ${email} via Resend, id: ${data?.id}`);
    return { success: true, emailId: data?.id };
  } catch (error) {
    console.error('Email verification error:', error);

    if (error.code === 'auth/user-not-found') {
      throw new HttpsError('not-found', 'No account found with this email');
    }

    throw new HttpsError('internal', 'Failed to send verification email');
  }
});

// Email Verification HTML Template
function getEmailVerificationHTML(email, verificationLink) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your VoraPrep Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f1f5f9;">
  
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 30px;">
      <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto;">
        <tr>
          <td style="width: 40px; height: 40px; background-color: #1a73e8; border-radius: 10px; text-align: center; vertical-align: middle; font-size: 20px; color: white; font-weight: bold; line-height: 40px;">V</td>
          <td style="padding-left: 10px; font-size: 24px; font-weight: 700; color: #0f172a; vertical-align: middle;">VoraPrep</td>
        </tr>
      </table>
    </div>
    
    <!-- Main Content -->
    <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
      
      <h1 style="color: #0f172a; font-size: 24px; margin: 0 0 15px 0; text-align: center;">
        Verify Your Email Address
      </h1>
      
      <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 10px 0; text-align: center;">
        Welcome to VoraPrep! 🎉
      </p>
      
      <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0; text-align: center;">
        Please verify your email address to get started with your exam prep journey.
      </p>
      
      <!-- CTA Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationLink}" style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 16px 40px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 16px;">
          Verify My Email
        </a>
      </div>
      
      <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 25px 0 0 0; text-align: center;">
        This link will expire in 24 hours.
      </p>
      
      <div style="border-top: 1px solid #e2e8f0; margin: 30px 0; padding-top: 20px;">
        <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 0;">
          <strong>Didn't create an account?</strong> You can safely ignore this email.
        </p>
      </div>
      
      <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0;">
        If the button doesn't work, copy and paste this link into your browser:
      </p>
      <p style="color: #3b82f6; font-size: 12px; word-break: break-all; margin: 10px 0 0 0;">
        ${verificationLink}
      </p>
      
    </div>
    
    <!-- Footer -->
    <div style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 30px; padding: 20px;">
      <p style="margin: 0;">
        This email was sent to ${email}
      </p>
      <p style="margin: 15px 0 0 0;">
        <strong>VoraPrep</strong> - Your AI-Powered Exam Prep Partner
      </p>
      <p style="margin: 15px 0 0 0;">
        <a href="${APP_BASE_URL}" style="color: #3b82f6; text-decoration: none;">voraprep.com</a>
      </p>
    </div>
    
  </div>
  
</body>
</html>
  `;
}

// ============================================================================
// DAILY STUDY REMINDERS (FCM Push Notifications)
// Runs every hour to check which users need reminders
// ============================================================================

exports.sendDailyReminders = onSchedule({
  schedule: 'every 60 minutes',
  timeZone: 'UTC', // Run in UTC, check each user's timezone individually
  memory: '256MiB',
  timeoutSeconds: 60,
}, async (event) => {
  const now = new Date();
  
  console.log(`Checking for daily reminders at ${now.toISOString()}`);
  
  try {
    // Find users with reminder enabled
    const usersSnapshot = await db.collection('users')
      .where('dailyReminderEnabled', '==', true)
      .get();
    
    console.log(`Found ${usersSnapshot.size} users with reminders enabled`);
    
    const notifications = [];
    
    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();
      const reminderTime = userData.dailyReminderTime || '09:00';
      // Parse hour as integer to ensure consistent comparison (handles "9" vs "09")
      const reminderHour = parseInt(reminderTime.split(':')[0], 10);
      
      // Get user's timezone (default to America/New_York for legacy users)
      const userTimezone = userData.timezone || 'America/New_York';
      
      // Get current hour in user's timezone as number
      const currentHourInUserTz = parseInt(new Intl.DateTimeFormat('en-US', { 
        timeZone: userTimezone, 
        hour: '2-digit', 
        hourCycle: 'h23' 
      }).format(now), 10);
      
      console.log(`User ${userDoc.id}: reminder at ${reminderHour}:00, current hour in ${userTimezone}: ${currentHourInUserTz}, tokens: ${(userData.fcmTokens || []).length}`);
      
      // Check if this is the right hour for this user in THEIR timezone
      if (reminderHour !== currentHourInUserTz) continue;
      
      // Check if user has FCM tokens
      const fcmTokens = userData.fcmTokens || [];
      if (fcmTokens.length === 0) continue;
      
      // Get today's date in user's timezone
      const todayInUserTz = new Intl.DateTimeFormat('en-CA', {
        timeZone: userTimezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).format(now); // Returns YYYY-MM-DD format
      
      const todayLogRef = db.collection('users').doc(userDoc.id).collection('daily_log').doc(todayInUserTz);
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
              link: `${APP_BASE_URL}/study`
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
  secrets: ['RESEND_API_KEY'],
}, async (event) => {
  if (!resend) {
    console.error('Email not configured (set RESEND_API_KEY)');
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
      
      // Get course-specific content
      const courseConfig = getCourseConfig(userData.activeCourse);
      
      // Generate email content
      const emailContent = generateWeeklyReportEmail(userData, weeklyStats);
      
      try {
        const { error } = await resend.emails.send({
          from: FROM_EMAIL,
          to: userEmail,
          subject: `📊 Your Weekly ${courseConfig.name} Study Report - ${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
          html: emailContent,
        });
        
        if (error) throw new Error(error.message);
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
// ONBOARDING REMINDER EMAIL
// Runs daily at 10am - sends reminder to verified users who haven't finished onboarding
// ============================================================================

exports.sendOnboardingReminders = onSchedule({
  schedule: 'every day 10:00',
  timeZone: 'America/New_York',
  memory: '256MiB',
  timeoutSeconds: 120,
  secrets: ['RESEND_API_KEY'],
}, async (event) => {
  if (!resend) {
    console.error('Email not configured (set RESEND_API_KEY)');
    return;
  }
  
  console.log('Checking for incomplete onboarding users...');
  
  try {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);
    
    // Find users with onboardingComplete: false created 24-48 hours ago
    const usersSnapshot = await db.collection('users')
      .where('onboardingComplete', '==', false)
      .where('createdAt', '<=', twentyFourHoursAgo)
      .where('createdAt', '>=', fortyEightHoursAgo)
      .get();
    
    console.log(`Found ${usersSnapshot.size} users with incomplete onboarding in 24-48h window`);
    
    let sentCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    
    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();
      
      try {
        // Check Firebase Auth for email verification status
        const authUser = await admin.auth().getUser(userDoc.id);
        
        // Skip if email not verified (includes email signup users who never verified)
        if (!authUser.emailVerified) {
          console.log(`Skipping ${authUser.email}: email not verified`);
          skippedCount++;
          continue;
        }
        
        const userEmail = authUser.email;
        const displayName = userData.displayName || authUser.displayName || 'there';
        
        if (!userEmail) {
          skippedCount++;
          continue;
        }
        
        // Get course-specific content
        const courseConfig = getCourseConfig(userData.activeCourse);
        
        // Send reminder email
        const { error } = await resend.emails.send({
          from: FROM_EMAIL,
          to: userEmail,
          subject: `⏰ Finish setting up your ${courseConfig.name.replace(' Exam', '')} study plan, ${displayName}!`,
          html: generateOnboardingReminderEmail(displayName, courseConfig),
        });
        
        if (error) throw new Error(error.message);
        
        console.log(`Sent onboarding reminder to ${userEmail}`);
        sentCount++;
        
      } catch (authError) {
        // User might have been deleted from Auth but not Firestore
        console.error(`Error processing user ${userDoc.id}:`, authError.message);
        errorCount++;
      }
    }
    
    console.log(`Onboarding reminders: ${sentCount} sent, ${skippedCount} skipped, ${errorCount} errors`);
    
    // Also notify admin of incomplete signups
    if (usersSnapshot.size > 0) {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `📊 VoraPrep: ${usersSnapshot.size} incomplete onboardings`,
        html: `
          <p>Daily onboarding reminder report:</p>
          <ul>
            <li><strong>${sentCount}</strong> reminder emails sent</li>
            <li><strong>${skippedCount}</strong> skipped (unverified email)</li>
            <li><strong>${errorCount}</strong> errors</li>
          </ul>
          <p><a href="${APP_BASE_URL}/admin/cms">View Admin CMS</a></p>
        `,
      });
    }
    
  } catch (error) {
    console.error('Error sending onboarding reminders:', error);
    throw error;
  }
});

// Onboarding Reminder Email Template
function generateOnboardingReminderEmail(displayName, courseConfig = getCourseConfig('cpa')) {
  const examName = courseConfig.name.replace(' Exam', '');
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Finish Your VoraPrep Setup</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f1f5f9;">
  
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 30px;">
      <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto;">
        <tr>
          <td style="width: 40px; height: 40px; background-color: #1a73e8; border-radius: 10px; text-align: center; vertical-align: middle; font-size: 20px; color: white; font-weight: bold; line-height: 40px;">V</td>
          <td style="padding-left: 10px; font-size: 24px; font-weight: 700; color: #0f172a; vertical-align: middle;">VoraPrep</td>
        </tr>
      </table>
    </div>
    
    <!-- Main Content -->
    <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
      
      <h1 style="color: #0f172a; font-size: 24px; margin: 0 0 15px 0;">
        Hey ${displayName}! 👋
      </h1>
      
      <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
        You created your VoraPrep account but haven't finished setting up your personalized study plan yet!
      </p>
      
      <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
        It only takes <strong>30 seconds</strong> to complete setup, and then you'll have access to:
      </p>
      
      <ul style="color: #475569; font-size: 16px; line-height: 1.8; margin: 0 0 25px 0; padding-left: 20px;">
        <li>🎯 A personalized daily study plan based on your exam date</li>
        <li>📚 Thousands of practice questions for your ${examName} exam</li>
        <li>🤖 AI tutor for instant explanations</li>
        <li>📊 Progress tracking to keep you on pace</li>
      </ul>
      
      <!-- CTA Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="${APP_BASE_URL}/onboarding" style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 16px 40px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 16px;">
          Complete My Setup →
        </a>
      </div>
      
      <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 25px 0 0 0; text-align: center;">
        Your ${examName} journey is waiting for you! 🚀
      </p>
      
    </div>
    
    <!-- Footer -->
    <div style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 30px; padding: 20px;">
      <p style="margin: 0;">
        VoraPrep - ${courseConfig.tagline}
      </p>
      <p style="font-size: 11px; margin-top: 10px;">
        <a href="${APP_BASE_URL}/unsubscribe" style="color: #94a3b8;">Unsubscribe</a>
      </p>
    </div>
    
  </div>
  
</body>
</html>
  `;
}

// ============================================================================
// TRIAL EXPIRATION CHECK
// Runs daily at 3am - updates subscription status for expired trials
// ============================================================================

exports.checkTrialExpirations = onSchedule({
  schedule: 'every day 03:00',
  timeZone: 'America/New_York',
  memory: '256MiB',
  timeoutSeconds: 120,
  secrets: ['RESEND_API_KEY'],
}, async (event) => {
  console.log('Checking for expired trials...');
  
  try {
    const now = admin.firestore.Timestamp.now();
    
    // Find subscriptions where trial has ended and status is still 'trialing'
    const expiredTrialsSnapshot = await db.collection('subscriptions')
      .where('status', '==', 'trialing')
      .where('trialEnd', '<=', now)
      .get();
    
    console.log(`Found ${expiredTrialsSnapshot.size} expired trials`);
    
    let updatedCount = 0;
    let emailsSent = 0;
    
    for (const subDoc of expiredTrialsSnapshot.docs) {
      const userId = subDoc.id;
      const subData = subDoc.data();
      
      try {
        // Update subscription status to 'past_due' (trial expired, needs payment)
        await db.collection('subscriptions').doc(userId).update({
          status: 'past_due',
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        
        updatedCount++;
        console.log(`Updated subscription status for user ${userId}`);
        
        // Send trial expired email if resend is configured
        if (resend) {
          // Get user info
          const userDoc = await db.collection('users').doc(userId).get();
          const userData = userDoc.exists ? userDoc.data() : {};
          
          try {
            const authUser = await admin.auth().getUser(userId);
            const userEmail = authUser.email;
            const displayName = userData?.displayName || authUser.displayName || 'there';
            const courseConfig = getCourseConfig(userData?.activeCourse);
            
            if (userEmail) {
              const { error } = await resend.emails.send({
                from: FROM_EMAIL,
                to: userEmail,
                subject: `Your VoraPrep trial has ended - upgrade to continue studying`,
                html: generateTrialExpiredEmail(displayName, courseConfig),
              });
              
              if (error) {
                console.error(`Error sending trial expired email to ${userEmail}:`, error);
              } else {
                console.log(`Sent trial expired email to ${userEmail}`);
                emailsSent++;
              }
            }
          } catch (authError) {
            console.error(`Could not get auth user ${userId}:`, authError.message);
          }
        }
        
      } catch (updateError) {
        console.error(`Error updating trial for user ${userId}:`, updateError);
      }
    }
    
    console.log(`Trial expiration check complete: ${updatedCount} updated, ${emailsSent} emails sent`);
    
  } catch (error) {
    console.error('Error checking trial expirations:', error);
    throw error;
  }
});

// Trial Expired Email Template
function generateTrialExpiredEmail(displayName, courseConfig = getCourseConfig('cpa')) {
  const examName = courseConfig.name.replace(' Exam', '');
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your VoraPrep Trial Has Ended</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f1f5f9;">
  
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 30px;">
      <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto;">
        <tr>
          <td style="width: 40px; height: 40px; background-color: #1a73e8; border-radius: 10px; text-align: center; vertical-align: middle; font-size: 20px; color: white; font-weight: bold; line-height: 40px;">V</td>
          <td style="padding-left: 10px; font-size: 24px; font-weight: 700; color: #0f172a; vertical-align: middle;">VoraPrep</td>
        </tr>
      </table>
    </div>
    
    <!-- Main Content -->
    <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
      
      <h1 style="color: #0f172a; font-size: 24px; margin: 0 0 15px 0;">
        Your free trial has ended, ${displayName}
      </h1>
      
      <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
        We hope you enjoyed exploring VoraPrep! Your 14-day trial has expired, but don't worry - you can pick up right where you left off.
      </p>
      
      <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
        Upgrade now to continue your ${examName} exam prep with:
      </p>
      
      <ul style="color: #475569; font-size: 16px; line-height: 1.8; margin: 0 0 25px 0; padding-left: 20px;">
        <li>✅ Unlimited practice questions</li>
        <li>✅ AI tutor for instant explanations</li>
        <li>✅ Personalized study analytics</li>
        <li>✅ Full access to all content</li>
      </ul>
      
      <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 20px; margin-bottom: 25px;">
        <p style="color: #92400e; font-size: 14px; margin: 0; font-weight: 600;">
          🎉 Founder Pricing Available!
        </p>
        <p style="color: #92400e; font-size: 14px; margin: 8px 0 0 0;">
          Lock in your founder rate (save over 40%) by subscribing before August 31, 2026.
        </p>
      </div>
      
      <!-- CTA Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="${APP_BASE_URL}/${courseConfig.slug || 'cpa'}" style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 16px 40px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 16px;">
          Upgrade Now →
        </a>
      </div>
      
      <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 25px 0 0 0; text-align: center;">
        Questions? Just reply to this email!
      </p>
      
    </div>
    
    <!-- Footer -->
    <div style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 30px; padding: 20px;">
      <p style="margin: 0;">
        VoraPrep - ${courseConfig.tagline}
      </p>
      <p style="font-size: 11px; margin-top: 10px;">
        <a href="${APP_BASE_URL}/unsubscribe" style="color: #94a3b8;">Unsubscribe</a>
      </p>
    </div>
    
  </div>
  
</body>
</html>
  `;
}

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
  secrets: ['RESEND_API_KEY'],
}, async (event) => {
  if (!resend) {
    console.log('Email not configured, skipping welcome email');
    return;
  }
  
  const userData = event.data.data();
  const userEmail = userData.email;
  const activeCourse = userData.activeCourse;
  if (!activeCourse) {
    console.warn('Welcome email: No activeCourse set for user, defaulting to CPA. User email:', userEmail);
  }
  const courseConfig = getCourseConfig(activeCourse);
  const displayName = userData.displayName || 'Exam Candidate';
  
  if (!userEmail) {
    console.log('No email found for new user');
    return;
  }
  
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: `Welcome to VoraPrep, ${displayName}! 🎉`,
      html: generateWelcomeEmail(displayName, courseConfig),
    });
    
    if (error) throw new Error(error.message);
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
  secrets: ['RESEND_API_KEY'],
}, async (event) => {
  if (!resend) {
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
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "You're on the VoraPrep Beta List! 🚀",
      html: generateWaitlistEmail(email),
    });
    
    if (error) throw new Error(error.message);
    console.log(`Waitlist confirmation sent to ${email}`);

    // Notify Admin
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `🚀 New Beta Signup: ${email}`,
      html: `<p><strong>${email}</strong> just signed up for the VoraPrep Beta waitlist.</p>`,
    });

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
      { title: '☀️ Rise and shine!', body: 'Your exam journey continues. Ready for a quick study session?' },
      { title: '🎯 Morning motivation', body: "Consistent daily practice beats cramming. Let's go!" },
    ],
    afternoon: [
      { title: '💪 Afternoon check-in', body: 'Take a break with some exam practice.' },
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
  const courseConfig = getCourseConfig(userData.activeCourse);
  const displayName = userData.displayName || 'Exam Candidate';
  const section = userData.examSection || courseConfig.name.replace(' Exam', '');
  
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
    <div style="display: inline-block; background: #2563eb; color: white; padding: 10px 20px; border-radius: 12px; font-weight: bold; font-size: 20px;">
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
      <div style="font-size: 32px; font-weight: bold; color: #2563eb;">${stats.totalQuestions}</div>
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
    <a href="${APP_BASE_URL}/practice" style="display: inline-block; background: #2563eb; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
      Continue Studying →
    </a>
  </div>
  
  <!-- Footer -->
  <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px; text-align: center; color: #94a3b8; font-size: 12px;">
    <p>VoraPrep - ${courseConfig.tagline}</p>
    <p>
      <a href="${APP_BASE_URL}/settings" style="color: #64748b;">Manage email preferences</a>
    </p>
    <p style="margin-top: 15px; font-size: 11px;">
      ${courseConfig.disclaimer}
    </p>
  </div>
  
</body>
</html>
  `;
}

// ============================================================================
// WELCOME EMAIL TEMPLATE
// ============================================================================

function generateWelcomeEmail(displayName, courseConfig = getCourseConfig('cpa')) {
  const examName = courseConfig.name.replace(' Exam', '');
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
      <div style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 12px; font-weight: bold; font-size: 24px;">
        📚 VoraPrep
      </div>
    </div>
    
    <h1 style="color: #1e293b; font-size: 28px; margin-bottom: 10px; text-align: center;">
      Welcome, ${displayName}! 🎉
    </h1>
    
    <p style="color: #64748b; font-size: 18px; text-align: center; margin-bottom: 30px;">
      You're one step closer to passing the ${examName} exam.
    </p>
    
    <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 25px; border-radius: 12px; margin: 25px 0;">
      <div style="font-size: 20px; font-weight: bold; margin-bottom: 10px;">💎 Welcome Aboard</div>
      <div style="font-size: 16px; opacity: 0.95;">
        You now have access to <strong>all ${examName} premium features</strong>:
      </div>
      <ul style="margin: 15px 0 0 0; padding-left: 20px;">
        <li>${courseConfig.questions} practice questions</li>
        <li>${courseConfig.lessons} lessons</li>
        <li>AI Tutor assistance</li>
        <li>Exam simulator</li>
        <li>Progress analytics</li>
      </ul>
    </div>
    
    <h2 style="color: #1e293b; font-size: 20px; margin: 30px 0 15px;">Here's how to get started:</h2>
    
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 20px 0;">
      <tr>
        <td style="padding-bottom: 15px;" valign="top">
          <table cellpadding="0" cellspacing="0" border="0"><tr>
            <td style="width: 32px; height: 32px; background-color: #dbeafe; color: #1d4ed8; border-radius: 50%; text-align: center; vertical-align: middle; font-weight: bold; line-height: 32px; font-size: 14px;" width="32">1</td>
            <td style="padding-left: 15px; vertical-align: middle;">
              <div style="font-weight: 600; color: #1e293b;">Complete your profile</div>
              <div style="color: #64748b; font-size: 14px;">Select your exam section and target date</div>
            </td>
          </tr></table>
        </td>
      </tr>
      <tr>
        <td style="padding-bottom: 15px;" valign="top">
          <table cellpadding="0" cellspacing="0" border="0"><tr>
            <td style="width: 32px; height: 32px; background-color: #dbeafe; color: #1d4ed8; border-radius: 50%; text-align: center; vertical-align: middle; font-weight: bold; line-height: 32px; font-size: 14px;" width="32">2</td>
            <td style="padding-left: 15px; vertical-align: middle;">
              <div style="font-weight: 600; color: #1e293b;">Start with a diagnostic quiz</div>
              <div style="color: #64748b; font-size: 14px;">We'll identify your strengths and weaknesses</div>
            </td>
          </tr></table>
        </td>
      </tr>
      <tr>
        <td style="padding-bottom: 15px;" valign="top">
          <table cellpadding="0" cellspacing="0" border="0"><tr>
            <td style="width: 32px; height: 32px; background-color: #dbeafe; color: #1d4ed8; border-radius: 50%; text-align: center; vertical-align: middle; font-weight: bold; line-height: 32px; font-size: 14px;" width="32">3</td>
            <td style="padding-left: 15px; vertical-align: middle;">
              <div style="font-weight: 600; color: #1e293b;">Practice daily</div>
              <div style="color: #64748b; font-size: 14px;">Consistency beats cramming every time</div>
            </td>
          </tr></table>
        </td>
      </tr>
    </table>
    
    <div style="text-align: center; margin: 35px 0;">
      <a href="${APP_BASE_URL}/${courseConfig.slug || 'cpa'}" style="display: inline-block; background: #2563eb; color: white; padding: 16px 40px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 18px;">
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
    <p>Questions? Reply to this email or visit our <a href="${APP_BASE_URL}" style="color: #64748b;">website</a></p>
    <p style="margin-top: 15px;">
      VoraPrep - ${courseConfig.tagline}
    </p>
    <p style="font-size: 11px; margin-top: 10px;">
      ${courseConfig.disclaimer}
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
      <div style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 12px; font-weight: bold; font-size: 24px;">
        📚 VoraPrep
      </div>
    </div>
    
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="font-size: 60px; margin-bottom: 10px;">🎉</div>
      <h1 style="color: #1e293b; font-size: 28px; margin-bottom: 10px;">
        You're on the list!
      </h1>
      <p style="color: #64748b; font-size: 16px;">
        Thanks for joining VoraPrep. We're excited to help you pass your exam!
      </p>
    </div>
    
    <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 25px; border-radius: 12px; margin: 25px 0; text-align: center;">
      <div style="font-size: 20px; font-weight: bold; margin-bottom: 10px;">🚀 Start Your Free Trial</div>
      <div style="font-size: 16px; opacity: 0.95; margin-bottom: 15px;">
        Get <strong>14 days free</strong> with full access to all features!
      </div>
      <a href="${APP_BASE_URL}/register" style="display: inline-block; background: white; color: #059669; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
        Create Your Free Account →
      </a>
    </div>
    
    <h2 style="color: #1e293b; font-size: 18px; margin: 30px 0 15px;">What you'll get:</h2>
    
    <div style="margin: 20px 0;">
      <div style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
        <span style="color: #10b981; margin-right: 10px;">✓</span>
        <span style="color: #334155;">Thousands of practice questions for CPA, EA, CMA, and more</span>
      </div>
      <div style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
        <span style="color: #10b981; margin-right: 10px;">✓</span>
        <span style="color: #334155;">AI-powered tutor for instant explanations</span>
      </div>
      <div style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
        <span style="color: #10b981; margin-right: 10px;">✓</span>
        <span style="color: #334155;">Comprehensive lessons covering all exam sections</span>
      </div>
      <div style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
        <span style="color: #10b981; margin-right: 10px;">✓</span>
        <span style="color: #334155;">Realistic exam simulator with simulation practice</span>
      </div>
      <div style="padding: 12px 0;">
        <span style="color: #10b981; margin-right: 10px;">✓</span>
        <span style="color: #334155;">Progress tracking and adaptive learning</span>
      </div>
    </div>
    
    <div style="background: #fef3c7; border: 1px solid #fcd34d; padding: 20px; border-radius: 12px; margin: 25px 0;">
      <div style="font-weight: 600; color: #92400e; margin-bottom: 5px;">⚡ Limited Time</div>
      <div style="color: #78350f; font-size: 14px;">
        Beta users will receive special <strong>Founding Member</strong> benefits (and lowest potential pricing) for life when we launch paid plans.
      </div>
    </div>
    
  </div>
  
  <!-- Footer -->
  <div style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 30px; padding: 20px;">
    <p>
      You received this email because ${email} was signed up at voraprep.com
    </p>
    <p style="margin-top: 15px;">
      VoraPrep - Your AI-Powered Exam Prep Partner
    </p>
    <p style="font-size: 11px; margin-top: 10px;">
      VoraPrep is an independent educational platform. All trademarks belong to their respective owners.
    </p>
  </div>
  
</body>
</html>
  `;
}

// ============================================================================
// STRIPE: CREATE CHECKOUT SESSION
// Called from frontend to start subscription checkout
// ============================================================================

exports.createCheckoutSession = onCall({
  cors: true,
  invoker: 'public',
  enforceAppCheck: false,
  secrets: ['STRIPE_SECRET_KEY'],
}, async (request) => {
  // Validate user is authenticated
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'You must be logged in to subscribe.');
  }

  const { courseId, interval, origin } = request.data; // courseId: 'cpa', interval: 'annual' or 'monthly'
  const baseUrl = getBaseUrl(origin);
  const userId = request.auth.uid;
  const userEmail = request.auth.token.email;

  if (!courseId || !interval) {
    throw new HttpsError('invalid-argument', 'Missing courseId or interval');
  }

  if (!stripe) {
    throw new HttpsError('failed-precondition', 'Stripe not configured');
  }

  const validCourses = ['cpa', 'ea', 'cma', 'cia', 'cfp', 'cisa'];
  const validIntervals = ['annual', 'monthly'];

  if (!validCourses.includes(courseId)) {
    throw new HttpsError('invalid-argument', 'Invalid course');
  }
  if (!validIntervals.includes(interval)) {
    throw new HttpsError('invalid-argument', 'Invalid interval');
  }

  try {
    // Determine if user qualifies for founder pricing
    const isFounderWindow = new Date() < FOUNDER_DEADLINE;
    const priceType = isFounderWindow ? `founder_${interval}` : interval;
    const lookupKey = PRICE_LOOKUP_KEYS[courseId][priceType];

    // Look up the price by lookup_key
    const prices = await stripe.prices.list({
      lookup_keys: [lookupKey],
      active: true,
      limit: 1,
    });

    if (prices.data.length === 0) {
      console.error(`Price not found for lookup_key: ${lookupKey}`);
      throw new HttpsError('not-found', 'Price not found. Please contact support.');
    }

    const priceId = prices.data[0].id;

    // Check if user already has a Stripe customer ID
    const userDoc = await db.collection('users').doc(userId).get();
    let stripeCustomerId = userDoc.data()?.stripeCustomerId;

    // Create customer if needed
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: userEmail,
        metadata: {
          firebaseUserId: userId,
        },
      });
      stripeCustomerId = customer.id;
      
      // Save customer ID to user profile
      await db.collection('users').doc(userId).update({
        stripeCustomerId: stripeCustomerId,
      });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/pricing`,
      subscription_data: {
        metadata: {
          firebaseUserId: userId,
          courseId: courseId,
          isFounder: isFounderWindow.toString(),
        },
      },
      metadata: {
        firebaseUserId: userId,
        courseId: courseId,
      },
    });

    console.log(`Checkout session created for user ${userId}, course ${courseId}, price ${lookupKey}`);
    
    return { 
      sessionId: session.id,
      url: session.url,
    };
  } catch (error) {
    console.error('Checkout session error:', error);
    throw new HttpsError('internal', 'Failed to create checkout session');
  }
});

// ============================================================================
// STRIPE: WEBHOOK HANDLER
// Receives events from Stripe (payment success, subscription changes, etc.)
// ============================================================================

exports.stripeWebhook = onRequest({
  cors: false, // Stripe sends POST directly, no CORS needed
  invoker: 'public', // Allow Stripe to call without authentication
  secrets: [
    'STRIPE_SECRET_KEY',
    { name: 'STRIPE_WEBHOOK_SECRET', version: 'latest' },
  ],
}, async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method not allowed');
    return;
  }

  if (!stripe) {
    res.status(500).send('Stripe not configured');
    return;
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Verify webhook signature
    // Use rawBody (Buffer) which is the original request body before JSON parsing
    const bodyToVerify = req.rawBody || req.body;
    event = stripe.webhooks.constructEvent(
      bodyToVerify,
      sig,
      STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    console.error('Debug info: rawBody available:', !!req.rawBody, '| body type:', typeof req.body, '| sig present:', !!sig, '| secret length:', STRIPE_WEBHOOK_SECRET?.length);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  console.log(`Stripe webhook received: ${event.type}`);

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        await handleCheckoutComplete(session);
        break;
      }
      
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        await handleSubscriptionUpdate(subscription);
        break;
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        await handleSubscriptionCanceled(subscription);
        break;
      }
      
      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        await handlePaymentFailed(invoice);
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object;
        await handleInvoicePaid(invoice);
        break;
      }
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    res.status(500).send('Webhook handler failed');
  }
});

// Handle successful checkout
async function handleCheckoutComplete(session) {
  const userId = session.metadata?.firebaseUserId;
  const courseId = session.metadata?.courseId;
  
  if (!userId) {
    console.error('No firebaseUserId in checkout session metadata');
    return;
  }

  console.log(`Checkout complete for user ${userId}, course ${courseId}`);

  // Also write subscription data directly from the checkout session.
  // This acts as a fallback in case customer.subscription.created/updated
  // events are delayed, missed, or fail signature verification.
  if (session.subscription && stripe) {
    try {
      const subscription = await stripe.subscriptions.retrieve(session.subscription);
      await updateUserSubscription(userId, subscription, courseId);
      console.log(`Subscription data written from checkout.session.completed for user ${userId}`);
    } catch (subError) {
      console.error('Error syncing subscription from checkout session:', subError);
    }
  }

  // Send welcome email
  if (resend) {
    const userDoc = await db.collection('users').doc(userId).get();
    const userEmail = userDoc.data()?.email;
    const userName = userDoc.data()?.displayName || 'there';
    const isFounder = session.subscription_data?.metadata?.isFounder === 'true';

    if (userEmail) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: userEmail,
          subject: isFounder 
            ? '🎉 Welcome, Founding Member!' 
            : '🎉 Welcome to VoraPrep!',
          html: getWelcomeSubscriberEmailHTML(userName, courseId, isFounder),
        });
      } catch (emailError) {
        console.error('Error sending welcome email:', emailError);
      }
    }
  }
}

// Handle subscription updates (new, renewed, plan changed)
async function handleSubscriptionUpdate(subscription) {
  const userId = subscription.metadata?.firebaseUserId;
  const courseId = subscription.metadata?.courseId;
  
  if (!userId) {
    // Try to find user by customer ID
    const customerId = subscription.customer;
    const usersSnapshot = await db.collection('users')
      .where('stripeCustomerId', '==', customerId)
      .limit(1)
      .get();
    
    if (usersSnapshot.empty) {
      console.error('No user found for subscription:', subscription.id);
      return;
    }
    
    const userDoc = usersSnapshot.docs[0];
    await updateUserSubscription(userDoc.id, subscription, courseId);
  } else {
    await updateUserSubscription(userId, subscription, courseId);
  }
}

// Update user's subscription in Firestore
// Supports multi-exam: writes to paidExams map AND legacy flat fields
async function updateUserSubscription(userId, subscription, courseId) {
  const status = subscription.status; // 'active', 'past_due', 'canceled', 'trialing'
  const isFounder = subscription.metadata?.isFounder === 'true';
  const examId = courseId || subscription.metadata?.courseId || 'cpa';
  const firstItem = subscription.items?.data?.[0];
  const interval = firstItem?.price?.recurring?.interval;
  const tier = interval === 'year' ? 'annual' : 'monthly';
  
  // Stripe API v2026-01-28 moved current_period_start/end to the subscription item
  const periodStart = subscription.current_period_start || firstItem?.current_period_start;
  const periodEnd = subscription.current_period_end || firstItem?.current_period_end;
  
  const subscriptionData = {
    stripeSubscriptionId: subscription.id,
    stripeCustomerId: subscription.customer,
    status: status,
    courseId: examId,
    isFounder: isFounder,
    currentPeriodStart: periodStart ? new Date(periodStart * 1000) : null,
    currentPeriodEnd: periodEnd ? new Date(periodEnd * 1000) : null,
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
    priceId: firstItem?.price?.id,
    interval: interval,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  // Write to paidExams map (supports multiple exams per user)
  const paidExamData = {
    stripeSubscriptionId: subscription.id,
    status: status,
    tier: tier,
    currentPeriodStart: periodStart ? new Date(periodStart * 1000) : null,
    currentPeriodEnd: periodEnd ? new Date(periodEnd * 1000) : null,
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
    isFounder: isFounder,
  };

  // Merge: preserves other exam subscriptions and trials
  // Use set+merge for top-level fields, then update() for nested paidExams path
  // (update() correctly interprets dot-notation as nested field paths)
  await db.collection('subscriptions').doc(userId).set({
    ...subscriptionData,
  }, { merge: true });

  // Write to paidExams map using update() which handles dot-notation as nested paths
  await db.collection('subscriptions').doc(userId).update({
    [`paidExams.${examId}`]: paidExamData,
  });

  // Update tier on root level for legacy compat
  if (status === 'active' || status === 'trialing') {
    await db.collection('subscriptions').doc(userId).update({
      tier: tier,
    });
  }

  console.log(`Updated subscription for user ${userId}, exam ${examId}: ${status}`);
}

// Handle subscription canceled
async function handleSubscriptionCanceled(subscription) {
  const customerId = subscription.customer;
  
  // Find user by customer ID
  const usersSnapshot = await db.collection('users')
    .where('stripeCustomerId', '==', customerId)
    .limit(1)
    .get();
  
  if (usersSnapshot.empty) {
    console.error('No user found for canceled subscription:', subscription.id);
    return;
  }
  
  const userId = usersSnapshot.docs[0].id;
  const courseId = subscription.metadata?.courseId;
  
  // Update legacy fields
  await db.collection('subscriptions').doc(userId).update({
    status: 'canceled',
    tier: 'free',
    canceledAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // Also update paidExams map if we know which exam
  if (courseId) {
    await db.collection('subscriptions').doc(userId).update({
      [`paidExams.${courseId}.status`]: 'canceled',
    });
  }

  console.log(`Subscription canceled for user ${userId}, exam ${courseId || 'unknown'}`);
}

// Handle payment failure
async function handlePaymentFailed(invoice) {
  const customerId = invoice.customer;
  
  // Find user by customer ID
  const usersSnapshot = await db.collection('users')
    .where('stripeCustomerId', '==', customerId)
    .limit(1)
    .get();
  
  if (usersSnapshot.empty) {
    console.error('No user found for failed payment:', invoice.id);
    return;
  }
  
  const userDoc = usersSnapshot.docs[0];
  const userId = userDoc.id;
  const userEmail = userDoc.data()?.email;

  // Update subscription status
  await db.collection('subscriptions').doc(userId).update({
    status: 'past_due',
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // Send payment failed email
  if (resend && userEmail) {
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: userEmail,
        subject: '⚠️ Payment Failed - Action Required',
        html: getPaymentFailedEmailHTML(userDoc.data()?.displayName || 'there'),
      });
    } catch (emailError) {
      console.error('Error sending payment failed email:', emailError);
    }
  }

  console.log(`Payment failed for user ${userId}`);
}

// Handle successful invoice payment (renewals, initial payments)
async function handleInvoicePaid(invoice) {
  const customerId = invoice.customer;
  const subscriptionId = invoice.subscription;

  // Skip if not a subscription invoice
  if (!subscriptionId) {
    console.log('Invoice paid but no subscription attached, skipping');
    return;
  }

  // Find user by customer ID
  const usersSnapshot = await db.collection('users')
    .where('stripeCustomerId', '==', customerId)
    .limit(1)
    .get();

  if (usersSnapshot.empty) {
    console.log('No user found for paid invoice, subscription.updated will handle it');
    return;
  }

  const userId = usersSnapshot.docs[0].id;

  // Ensure status is active and clear any past_due state
  // (customer.subscription.updated also does this, but invoice.paid
  //  is the canonical payment confirmation)
  await db.collection('subscriptions').doc(userId).update({
    status: 'active',
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  console.log(`Invoice paid for user ${userId}, subscription ${subscriptionId}, amount: ${invoice.amount_paid / 100}`);
}

// ============================================================================
// STRIPE: CUSTOMER PORTAL SESSION
// Allows users to manage their subscription (cancel, update payment, etc.)
// ============================================================================

exports.createCustomerPortalSession = onCall({
  cors: true,
  invoker: 'public',
  enforceAppCheck: false,
  secrets: ['STRIPE_SECRET_KEY'],
}, async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'You must be logged in.');
  }

  if (!stripe) {
    throw new HttpsError('failed-precondition', 'Stripe not configured');
  }

  const userId = request.auth.uid;
  const { returnUrl } = request.data || {};

  try {
    const userDoc = await db.collection('users').doc(userId).get();
    const stripeCustomerId = userDoc.data()?.stripeCustomerId;

    if (!stripeCustomerId) {
      throw new HttpsError('not-found', 'No subscription found');
    }

    // Use client-provided returnUrl origin if allowed, otherwise default
    let portalReturnUrl = `${APP_BASE_URL}/settings`;
    if (returnUrl) {
      try {
        const parsedOrigin = new URL(returnUrl).origin;
        if (ALLOWED_ORIGINS.includes(parsedOrigin)) {
          portalReturnUrl = returnUrl;
        }
      } catch (_) { /* invalid URL, use default */ }
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: portalReturnUrl,
    });

    return { url: session.url };
  } catch (error) {
    console.error('Customer portal error:', error);
    throw new HttpsError('internal', 'Failed to create portal session');
  }
});

// ============================================================================
// STRIPE: SYNC SUBSCRIPTION FROM STRIPE
// Fallback for webhook failures — client can call this to force-sync
// subscription status directly from the Stripe API to Firestore.
// ============================================================================

exports.syncSubscriptionFromStripe = onCall({
  cors: true,
  invoker: 'public',
  enforceAppCheck: false,
  secrets: ['STRIPE_SECRET_KEY'],
}, async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'You must be logged in.');
  }

  if (!stripe) {
    throw new HttpsError('failed-precondition', 'Stripe not configured');
  }

  const userId = request.auth.uid;

  try {
    const userDoc = await db.collection('users').doc(userId).get();
    const stripeCustomerId = userDoc.data()?.stripeCustomerId;

    if (!stripeCustomerId) {
      console.log(`syncSubscriptionFromStripe: no Stripe customer for user ${userId}`);
      return { synced: false, reason: 'no_customer' };
    }

    // List active subscriptions for this customer from Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: stripeCustomerId,
      status: 'active',
      limit: 10,
    });

    if (subscriptions.data.length === 0) {
      // Also check for trialing subscriptions
      const trialingSubs = await stripe.subscriptions.list({
        customer: stripeCustomerId,
        status: 'trialing',
        limit: 10,
      });
      subscriptions.data.push(...trialingSubs.data);
    }

    if (subscriptions.data.length === 0) {
      console.log(`syncSubscriptionFromStripe: no active subscriptions for user ${userId}`);
      return { synced: false, reason: 'no_subscriptions' };
    }

    // Process each active subscription
    let syncCount = 0;
    for (const subscription of subscriptions.data) {
      const courseId = subscription.metadata?.courseId;
      await updateUserSubscription(userId, subscription, courseId);
      syncCount++;
      console.log(`syncSubscriptionFromStripe: synced ${courseId || 'unknown'} for user ${userId}, status=${subscription.status}`);
    }

    return { synced: true, count: syncCount };
  } catch (error) {
    console.error('syncSubscriptionFromStripe error:', error);
    throw new HttpsError('internal', 'Failed to sync subscription');
  }
});

// ============================================================================
// EMAIL TEMPLATES FOR SUBSCRIPTION
// ============================================================================

function getWelcomeSubscriberEmailHTML(name, courseId, isFounder) {
  const courseConfig = getCourseConfig(courseId);
  const founderBadge = isFounder 
    ? '<div style="display: inline-block; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #78350f; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-bottom: 15px;">🏆 FOUNDING MEMBER</div>'
    : '';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f1f5f9;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
      <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto;">
        <tr>
          <td style="width: 40px; height: 40px; background-color: #1a73e8; border-radius: 10px; text-align: center; vertical-align: middle; font-size: 20px; color: white; font-weight: bold; line-height: 40px;">V</td>
          <td style="padding-left: 10px; font-size: 24px; font-weight: 700; color: #0f172a; vertical-align: middle;">VoraPrep</td>
        </tr>
      </table>
    </div>
    
    <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
      ${founderBadge}
      <h1 style="color: #0f172a; font-size: 24px; margin: 0 0 15px 0;">
        Welcome to VoraPrep${isFounder ? ', Founding Member!' : '!'}
      </h1>
      
      <p style="color: #475569; font-size: 16px; line-height: 1.6;">
        Hi ${name}! 🎉
      </p>
      
      <p style="color: #475569; font-size: 16px; line-height: 1.6;">
        Your ${courseConfig.name} subscription is now active. You have full access to everything:
      </p>
      
      <ul style="color: #475569; font-size: 16px; line-height: 2;">
        <li>All practice questions</li>
        <li>Vory AI tutor - unlimited</li>
        <li>Task-based simulations</li>
        <li>Full exam simulator</li>
        <li>Spaced repetition learning</li>
      </ul>

      ${isFounder ? `
      <div style="background: #fef3c7; border: 1px solid #fcd34d; padding: 15px; border-radius: 10px; margin: 20px 0;">
        <strong style="color: #92400e;">🔒 Founder Pricing Locked</strong>
        <p style="color: #78350f; margin: 5px 0 0 0; font-size: 14px;">
          You'll keep your 50% discount forever, as long as your subscription stays active.
        </p>
      </div>
      ` : ''}
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${APP_BASE_URL}/${courseConfig.slug || 'cpa'}" style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 16px 40px; border-radius: 10px; text-decoration: none; font-weight: 600;">
          Start Studying
        </a>
      </div>
      
      <p style="color: #64748b; font-size: 14px; text-align: center;">
        Let's get you to 75+! 🎯
      </p>
    </div>
    
    <div style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 30px;">
      <p>VoraPrep - ${courseConfig.tagline}</p>
    </div>
  </div>
</body>
</html>
  `;
}

function getPaymentFailedEmailHTML(name) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f1f5f9;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
      <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto;">
        <tr>
          <td style="width: 40px; height: 40px; background-color: #1a73e8; border-radius: 10px; text-align: center; vertical-align: middle; font-size: 20px; color: white; font-weight: bold; line-height: 40px;">V</td>
          <td style="padding-left: 10px; font-size: 24px; font-weight: 700; color: #0f172a; vertical-align: middle;">VoraPrep</td>
        </tr>
      </table>
    </div>
    
    <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
      <h1 style="color: #dc2626; font-size: 24px; margin: 0 0 15px 0;">
        ⚠️ Payment Failed
      </h1>
      
      <p style="color: #475569; font-size: 16px; line-height: 1.6;">
        Hi ${name},
      </p>
      
      <p style="color: #475569; font-size: 16px; line-height: 1.6;">
        We weren't able to process your latest payment. Your access may be limited until this is resolved.
      </p>
      
      <p style="color: #475569; font-size: 16px; line-height: 1.6;">
        Please update your payment method to continue studying without interruption.
      </p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${APP_BASE_URL}/settings" style="display: inline-block; background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 16px 40px; border-radius: 10px; text-decoration: none; font-weight: 600;">
          Update Payment Method
        </a>
      </div>
      
      <p style="color: #64748b; font-size: 14px;">
        If you have any questions, reply to this email and we'll help you out.
      </p>
    </div>
    
    <div style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 30px;">
      <p>VoraPrep - Your AI-Powered Exam Prep Partner</p>
    </div>
  </div>
</body>
</html>
  `;
}


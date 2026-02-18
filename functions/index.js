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
// RATE LIMITING UTILITY
// Uses Firestore counters to enforce per-user, per-function call limits
// ============================================================================

/**
 * Check and enforce rate limits for a user+function combination.
 * @param {string} uid - Firebase user ID (or email for unauthenticated flows)
 * @param {string} functionName - Name of the function being rate-limited
 * @param {number} maxPerHour - Maximum calls allowed per hour
 * @throws {HttpsError} if rate limit is exceeded
 */
async function enforceRateLimit(uid, functionName, maxPerHour) {
  const now = Date.now();
  const hourAgo = now - 60 * 60 * 1000;
  const docRef = db.collection('rate_limits').doc(`${uid}_${functionName}`);

  try {
    const result = await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(docRef);
      const data = doc.exists ? doc.data() : { timestamps: [] };
      
      // Filter to only timestamps within the last hour
      const recentTimestamps = (data.timestamps || []).filter(ts => ts > hourAgo);
      
      if (recentTimestamps.length >= maxPerHour) {
        return { limited: true, count: recentTimestamps.length };
      }

      // Add current timestamp and write back
      recentTimestamps.push(now);
      transaction.set(docRef, { 
        timestamps: recentTimestamps,
        uid,
        functionName,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      return { limited: false, count: recentTimestamps.length };
    });

    if (result.limited) {
      console.warn(`Rate limit exceeded: ${uid} called ${functionName} ${result.count} times in last hour (limit: ${maxPerHour})`);
      throw new HttpsError('resource-exhausted', 'Too many requests. Please try again later.');
    }
  } catch (error) {
    if (error instanceof HttpsError) throw error;
    // If rate limiting itself fails, log but don't block the request
    console.error(`Rate limit check failed for ${functionName}:`, error);
  }
}

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

// Lazy-initialize Stripe client (secrets only available at function runtime in Gen 2)
let _stripeClient = null;
function getStripeClient() {
  if (_stripeClient) return _stripeClient;
  
  const secretKey = process.env.STRIPE_SECRET_KEY?.trim();
  if (!secretKey) {
    console.error('STRIPE_SECRET_KEY not found in environment');
    return null;
  }
  
  const Stripe = require('stripe');
  _stripeClient = new Stripe(secretKey, {
    apiVersion: '2024-12-18.acacia',
  });
  return _stripeClient;
}

// Legacy stripe variable for backward compatibility (webhook uses this)
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

  // Rate limit: 5 password reset emails per hour per email address
  await enforceRateLimit(email.toLowerCase(), 'passwordReset', 5);

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

  // Rate limit: 5 verification emails per hour per email address
  await enforceRateLimit(email.toLowerCase(), 'emailVerification', 5);

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
        // Update subscription status to 'expired' (trial expired, needs payment)
        await db.collection('subscriptions').doc(userId).update({
          status: 'expired',
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
// TRIAL REMINDER EMAILS
// Sends reminder emails at Day 7, Day 10, and Day 13 of trial
// Helps convert trial users before they expire (14-day trial)
// ============================================================================

exports.sendTrialReminderEmails = onSchedule({
  schedule: 'every day 11:00',
  timeZone: 'America/New_York',
  memory: '256MiB',
  timeoutSeconds: 180,
  secrets: ['RESEND_API_KEY'],
}, async (event) => {
  if (!resend) {
    console.error('Email not configured (set RESEND_API_KEY)');
    return;
  }
  
  console.log('Checking for trial reminder emails...');
  
  try {
    const now = new Date();
    
    // Calculate date ranges for Day 7, 10, and 13
    // Day X means: trial started X days ago
    const reminderDays = [
      { day: 7, subject: "How's your {examName} prep going?", template: 'mid_trial' },
      { day: 10, subject: "Don't lose your {examName} study progress!", template: 'almost_expired' },
      { day: 13, subject: "⏰ Last day of your free trial - lock in founder pricing!", template: 'last_day' },
    ];
    
    let totalSent = 0;
    
    for (const reminder of reminderDays) {
      // Calculate the date range for this reminder day
      // Users who started their trial exactly X days ago (within 24h window)
      const targetDate = new Date(now);
      targetDate.setDate(targetDate.getDate() - reminder.day);
      const startOfDay = new Date(targetDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(targetDate);
      endOfDay.setHours(23, 59, 59, 999);
      
      console.log(`Checking Day ${reminder.day} reminders (trial started between ${startOfDay.toISOString()} and ${endOfDay.toISOString()})`);
      
      // Find trialing subscriptions that started X days ago
      const trialsSnapshot = await db.collection('subscriptions')
        .where('status', '==', 'trialing')
        .where('currentPeriodStart', '>=', admin.firestore.Timestamp.fromDate(startOfDay))
        .where('currentPeriodStart', '<=', admin.firestore.Timestamp.fromDate(endOfDay))
        .get();
      
      console.log(`Found ${trialsSnapshot.size} users on trial day ${reminder.day}`);
      
      for (const subDoc of trialsSnapshot.docs) {
        const userId = subDoc.id;
        const subData = subDoc.data();
        
        // Check if we've already sent this reminder
        const reminderKey = `trialReminder_day${reminder.day}`;
        if (subData[reminderKey]) {
          console.log(`Skipping ${userId}: Day ${reminder.day} reminder already sent`);
          continue;
        }
        
        try {
          // Get user info
          const userDoc = await db.collection('users').doc(userId).get();
          const userData = userDoc.exists ? userDoc.data() : {};
          
          const authUser = await admin.auth().getUser(userId);
          const userEmail = authUser.email;
          const displayName = userData?.displayName || authUser.displayName || 'there';
          const courseConfig = getCourseConfig(userData?.activeCourse);
          const examName = courseConfig.name.replace(' Exam', '');
          
          if (!userEmail) continue;
          
          // Generate subject with exam name
          const subject = reminder.subject.replace('{examName}', examName);
          
          // Send the email
          const { error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: userEmail,
            subject: subject,
            html: generateTrialReminderEmail(displayName, courseConfig, reminder.template, reminder.day),
          });
          
          if (error) {
            console.error(`Error sending Day ${reminder.day} reminder to ${userEmail}:`, error);
          } else {
            console.log(`Sent Day ${reminder.day} trial reminder to ${userEmail}`);
            totalSent++;
            
            // Mark this reminder as sent
            await db.collection('subscriptions').doc(userId).update({
              [reminderKey]: admin.firestore.FieldValue.serverTimestamp(),
            });
          }
          
        } catch (userError) {
          console.error(`Error processing Day ${reminder.day} reminder for ${userId}:`, userError.message);
        }
      }
    }
    
    console.log(`Trial reminder emails complete: ${totalSent} total sent`);
    
  } catch (error) {
    console.error('Error sending trial reminder emails:', error);
    throw error;
  }
});

// Trial Reminder Email Templates
function generateTrialReminderEmail(displayName, courseConfig, template, dayNum) {
  const examName = courseConfig.name.replace(' Exam', '');
  const courseSlug = courseConfig.slug || 'cpa';
  const daysRemaining = 14 - dayNum;
  
  // Different messaging based on trial stage
  let headline, message, urgencyBox;
  
  if (template === 'mid_trial') {
    // Day 7 - Friendly check-in
    headline = `How's your ${examName} prep going?`;
    message = `
      <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
        You're halfway through your free trial! We wanted to check in and make sure you're getting the most out of VoraPrep.
      </p>
      <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
        Have you tried these features yet?
      </p>
      <ul style="color: #475569; font-size: 16px; line-height: 1.8; margin: 0 0 25px 0; padding-left: 20px;">
        <li>🤖 <strong>AI Tutor:</strong> Get instant explanations for any question</li>
        <li>📊 <strong>Score Predictor:</strong> See your estimated ${examName} score</li>
        <li>🎯 <strong>Adaptive Practice:</strong> Questions that match your level</li>
        <li>📱 <strong>Study Plan:</strong> Stay on track with daily goals</li>
      </ul>
    `;
    urgencyBox = `
      <div style="background: #f0f9ff; border-radius: 12px; padding: 20px; margin-bottom: 25px; border-left: 4px solid #3b82f6;">
        <p style="color: #1e40af; font-size: 14px; margin: 0;">
          💡 <strong>Pro tip:</strong> Students who use the AI Tutor are 2x more likely to pass.
        </p>
      </div>
    `;
  } else if (template === 'almost_expired') {
    // Day 10 - Progress reminder
    headline = `Don't lose your ${examName} study progress!`;
    message = `
      <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
        Your free trial ends in <strong>${daysRemaining} days</strong>. All that hard work you've put in? Keep it going by upgrading today.
      </p>
      <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
        When you upgrade, you'll keep:
      </p>
      <ul style="color: #475569; font-size: 16px; line-height: 1.8; margin: 0 0 25px 0; padding-left: 20px;">
        <li>✅ All your practice history and analytics</li>
        <li>✅ Your personalized study plan</li>
        <li>✅ Your spaced repetition flashcard decks</li>
        <li>✅ Your score prediction progress</li>
      </ul>
    `;
    urgencyBox = `
      <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 20px; margin-bottom: 25px;">
        <p style="color: #92400e; font-size: 14px; margin: 0; font-weight: 600;">
          🎉 Founder Pricing — Save Over 40%!
        </p>
        <p style="color: #92400e; font-size: 14px; margin: 8px 0 0 0;">
          Lock in founder pricing before it's gone. Only available to early adopters.
        </p>
      </div>
    `;
  } else {
    // Day 13 - Last day urgency
    headline = `⏰ Last day of your free trial, ${displayName}!`;
    message = `
      <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
        This is it — your trial ends <strong>tomorrow</strong>. After that, you'll lose access to:
      </p>
      <ul style="color: #ef4444; font-size: 16px; line-height: 1.8; margin: 0 0 25px 0; padding-left: 20px;">
        <li>❌ Unlimited practice questions</li>
        <li>❌ AI Tutor assistance</li>
        <li>❌ Exam simulator</li>
        <li>❌ Your study analytics</li>
      </ul>
      <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
        Don't let your progress go to waste. Upgrade now and keep preparing for the ${examName} exam!
      </p>
    `;
    urgencyBox = `
      <div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 12px; padding: 20px; margin-bottom: 25px; border: 2px solid #ef4444;">
        <p style="color: #b91c1c; font-size: 16px; margin: 0; font-weight: 700;">
          ⏰ Your trial expires in less than 24 hours!
        </p>
        <p style="color: #b91c1c; font-size: 14px; margin: 8px 0 0 0;">
          Upgrade now to keep your access and lock in founder pricing.
        </p>
      </div>
    `;
  }
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VoraPrep Trial Reminder</title>
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
      
      <h1 style="color: #0f172a; font-size: 24px; margin: 0 0 20px 0;">
        ${headline}
      </h1>
      
      ${message}
      
      ${urgencyBox}
      
      <!-- CTA Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="${APP_BASE_URL}/${courseSlug}" style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 16px 40px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 16px;">
          Continue Studying →
        </a>
      </div>
      
      <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 25px 0 0 0; text-align: center;">
        Questions? Reply to this email — we're here to help!
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

  // Get Stripe client (lazy-initialized with runtime secret)
  const stripeClient = getStripeClient();
  if (!stripeClient) {
    console.error('Stripe client not available - STRIPE_SECRET_KEY may not be configured');
    throw new HttpsError('failed-precondition', 'Stripe not configured. Please contact support.');
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

    console.log(`Looking up price: ${lookupKey} for user ${userId}, course ${courseId}`);

    // Look up the price by lookup_key
    const prices = await stripeClient.prices.list({
      lookup_keys: [lookupKey],
      active: true,
      limit: 1,
    });

    if (prices.data.length === 0) {
      console.error(`Price not found for lookup_key: ${lookupKey}. Make sure this price exists in Stripe with this lookup_key.`);
      throw new HttpsError('not-found', `Price "${lookupKey}" not found. Please ensure pricing is configured in Stripe.`);
    }

    const priceId = prices.data[0].id;
    console.log(`Found price ID: ${priceId}`);

    // Check if user already has a Stripe customer ID
    const userDoc = await db.collection('users').doc(userId).get();
    let stripeCustomerId = userDoc.data()?.stripeCustomerId;

    // Create customer if needed
    if (!stripeCustomerId) {
      console.log(`Creating Stripe customer for user ${userId}`);
      const customer = await stripeClient.customers.create({
        email: userEmail,
        metadata: {
          firebaseUserId: userId,
        },
      });
      stripeCustomerId = customer.id;
      
      // Save customer ID to user profile (use set with merge in case doc doesn't exist)
      await db.collection('users').doc(userId).set({
        stripeCustomerId: stripeCustomerId,
      }, { merge: true });
    }

    // Create checkout session
    const session = await stripeClient.checkout.sessions.create({
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
    // Pass through HttpsErrors we already threw
    if (error instanceof HttpsError) {
      throw error;
    }
    // Include more details for debugging
    const stripeError = error.raw?.message || error.message || 'Unknown error';
    throw new HttpsError('internal', `Failed to create checkout session: ${stripeError}`);
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

  const stripeClient = getStripeClient();
  if (!stripeClient) {
    console.error('Stripe client not available - STRIPE_SECRET_KEY may not be configured');
    res.status(500).send('Stripe not configured');
    return;
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Verify webhook signature
    // Use rawBody (Buffer) which is the original request body before JSON parsing
    // Read webhook secret at runtime (Gen 2 injects secrets as env vars at invocation, not cold start)
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
    if (!webhookSecret) {
      console.error('STRIPE_WEBHOOK_SECRET not available at runtime');
      res.status(500).send('Webhook secret not configured');
      return;
    }

    const bodyToVerify = req.rawBody || req.body;
    event = stripeClient.webhooks.constructEvent(
      bodyToVerify,
      sig,
      webhookSecret
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    console.error('Debug info: rawBody available:', !!req.rawBody, '| body type:', typeof req.body, '| sig present:', !!sig, '| secret length:', process.env.STRIPE_WEBHOOK_SECRET?.trim()?.length);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  console.log(`Stripe webhook received: ${event.type}`);

  try {
    // Idempotency check: skip if we've already processed this event
    const eventRef = db.collection('processed_stripe_events').doc(event.id);
    const existing = await eventRef.get();
    if (existing.exists) {
      console.log(`Skipping already-processed Stripe event: ${event.id} (${event.type})`);
      res.status(200).json({ received: true, duplicate: true });
      return;
    }

    // Mark event as processing before handling (prevents concurrent duplicates)
    await eventRef.set({
      eventType: event.type,
      processedAt: admin.firestore.FieldValue.serverTimestamp(),
      livemode: event.livemode,
    });

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
  if (session.subscription) {
    const stripeClient = getStripeClient();
    if (stripeClient) {
      try {
        const subscription = await stripeClient.subscriptions.retrieve(session.subscription);
        await updateUserSubscription(userId, subscription, courseId);
        console.log(`Subscription data written from checkout.session.completed for user ${userId}`);
      } catch (subError) {
        console.error('Error syncing subscription from checkout session:', subError);
      }
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

  const stripeClient = getStripeClient();
  if (!stripeClient) {
    console.error('Stripe client not available - STRIPE_SECRET_KEY may not be configured');
    throw new HttpsError('failed-precondition', 'Stripe not configured. Please contact support.');
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

    const session = await stripeClient.billingPortal.sessions.create({
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

  const stripeClient = getStripeClient();
  if (!stripeClient) {
    console.error('Stripe client not available - STRIPE_SECRET_KEY may not be configured');
    throw new HttpsError('failed-precondition', 'Stripe not configured. Please contact support.');
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
    const subscriptions = await stripeClient.subscriptions.list({
      customer: stripeCustomerId,
      status: 'active',
      limit: 10,
    });

    if (subscriptions.data.length === 0) {
      // Also check for trialing subscriptions
      const trialingSubs = await stripeClient.subscriptions.list({
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

// ============================================================================
// GEMINI AI PROXY
// Proxies Gemini API calls through Cloud Functions so the API key stays secret
// ============================================================================

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

exports.geminiProxy = onCall({
  cors: true,
  enforceAppCheck: false,
  secrets: ['GEMINI_API_KEY'],
}, async (request) => {
  // Must be authenticated
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'You must be logged in to use the AI tutor.');
  }

  // Rate limit: 30 AI tutor calls per hour per user
  await enforceRateLimit(request.auth.uid, 'geminiProxy', 30);

  const { messages, systemPrompt, generationConfig } = request.data;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    throw new HttpsError('invalid-argument', 'Messages array is required.');
  }

  if (!systemPrompt || typeof systemPrompt !== 'string') {
    throw new HttpsError('invalid-argument', 'System prompt is required.');
  }

  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    console.error('GEMINI_API_KEY not configured');
    throw new HttpsError('failed-precondition', 'AI service not configured.');
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: messages,
        systemInstruction: {
          parts: [{ text: systemPrompt }],
        },
        generationConfig: generationConfig || {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData?.error?.message || `HTTP ${response.status}`;
      console.error(`Gemini API error: ${errorMessage}`);

      if (response.status === 401 || response.status === 403) {
        console.error('[ADMIN ALERT] Gemini API key is invalid or expired!');
        throw new HttpsError('internal', 'AI service configuration error.');
      }

      throw new HttpsError('internal', 'AI service temporarily unavailable.');
    }

    const data = await response.json();

    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      return { text: data.candidates[0].content.parts[0].text };
    }

    throw new HttpsError('internal', 'No response from AI service.');
  } catch (error) {
    if (error instanceof HttpsError) throw error;
    console.error('Gemini proxy error:', error);
    throw new HttpsError('internal', 'AI service error.');
  }
});

// ============================================================================
// GROWTH ENGINE — SEO/SEM AUTOMATION
// Automated content generation, Google Ads sync, rank tracking, and more
// ============================================================================

/**
 * Helper: Load growth engine config from Firestore.
 * Returns config with guard rail settings.
 */
async function getGrowthConfig() {
  const configDoc = await db.collection('growth_config').doc('settings').get();
  const defaults = {
    semEnabled: false,
    totalDailyBudget: 100,
    emergencyPauseAll: false,
    maxCpaMultiplier: 2.0,
    pauseOnZeroConversions: true,
    pauseAfterDays: 7,
    alertOnBudgetOverage: true,
    alertOnRankDrop: true,
    autoContentGeneration: true,
    contentReviewRequired: true,
    maxArticlesPerWeek: 10,
  };
  return configDoc.exists ? { ...defaults, ...configDoc.data() } : defaults;
}

/**
 * Growth Engine: Test API connections.
 * Verifies that configured API credentials actually work.
 * Admin-only, callable.
 */
exports.growthTestConnections = onCall({
  cors: true,
  invoker: 'public',
  enforceAppCheck: false,
  secrets: [
    'GOOGLE_ADS_DEVELOPER_TOKEN',
    'GOOGLE_ADS_CLIENT_ID',
    'GOOGLE_ADS_CLIENT_SECRET',
    'GOOGLE_ADS_REFRESH_TOKEN',
    'GOOGLE_ADS_CUSTOMER_ID',
    'GOOGLE_ADS_MCC_ID',
    'GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL',
    'GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY',
    'DATAFORSEO_LOGIN',
    'DATAFORSEO_PASSWORD',
  ],
}, async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Authentication required.');
  }
  const userDoc = await db.collection('users').doc(request.auth.uid).get();
  if (!userDoc.exists || !userDoc.data()?.isAdmin) {
    throw new HttpsError('permission-denied', 'Admin access required.');
  }

  const results = {};

  // Test Google Ads API
  try {
    const accessToken = await getGoogleAdsAccessToken();
    const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN?.trim();
    const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID?.trim()?.replace(/-/g, '');
    const mccId = process.env.GOOGLE_ADS_MCC_ID?.trim()?.replace(/-/g, '') || '';

    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'developer-token': developerToken,
      'Content-Type': 'application/json',
    };
    if (mccId) headers['login-customer-id'] = mccId;

    // Use searchStream POST (the REST API doesn't support bare GET on /customers/{id})
    const response = await fetch(
      `https://googleads.googleapis.com/v20/customers/${customerId}/googleAds:searchStream`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: 'SELECT customer.id, customer.descriptive_name FROM customer LIMIT 1',
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      const customerName = data?.[0]?.results?.[0]?.customer?.descriptiveName || customerId;
      results.googleAds = { connected: true, accountName: customerName };
    } else {
      const errorText = await response.text();
      results.googleAds = { connected: false, error: `HTTP ${response.status}: ${errorText.substring(0, 200)}` };
    }
  } catch (err) {
    results.googleAds = { connected: false, error: err.message };
  }

  // Test Google Search Console API
  try {
    const scEmail = process.env.GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL?.trim();
    const scKey = process.env.GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY?.trim();
    if (!scEmail || !scKey) {
      results.searchConsole = { connected: false, error: 'Credentials not configured. Set GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL and GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY.' };
    } else {
      const accessToken = await getSearchConsoleAccessToken();
      const siteUrl = 'https://voraprep.com';
      const response = await fetch(
        `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}`,
        { method: 'GET', headers: { 'Authorization': `Bearer ${accessToken}` } }
      );
      if (response.ok) {
        const data = await response.json();
        results.searchConsole = { connected: true, siteUrl: data.siteUrl || siteUrl };
      } else {
        const errorText = await response.text();
        results.searchConsole = { connected: false, error: `HTTP ${response.status}: ${errorText.substring(0, 200)}` };
      }
    }
  } catch (err) {
    results.searchConsole = { connected: false, error: err.message };
  }

  // Test DataForSEO API
  try {
    const login = process.env.DATAFORSEO_LOGIN?.trim();
    const password = process.env.DATAFORSEO_PASSWORD?.trim();
    if (!login || !password) {
      results.dataForSEO = { connected: false, error: 'Credentials not configured. Set DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD.' };
    } else {
      const authHeader = Buffer.from(`${login}:${password}`).toString('base64');
      const response = await fetch('https://api.dataforseo.com/v3/appendix/user_data', {
        method: 'GET',
        headers: { 'Authorization': `Basic ${authHeader}` },
      });
      if (response.ok) {
        const data = await response.json();
        const balance = data?.tasks?.[0]?.result?.[0]?.money?.balance;
        results.dataForSEO = {
          connected: true,
          balance: balance !== undefined ? `$${balance.toFixed(2)}` : 'OK',
        };
      } else {
        const errorText = await response.text();
        results.dataForSEO = { connected: false, error: `HTTP ${response.status}: ${errorText.substring(0, 200)}` };
      }
    }
  } catch (err) {
    results.dataForSEO = { connected: false, error: err.message };
  }

  // Update Firestore config with real connection status
  await db.collection('growth_config').doc('settings').set({
    googleAdsConfigured: results.googleAds?.connected || false,
    searchConsoleConfigured: results.searchConsole?.connected || false,
    dataForSEOConfigured: results.dataForSEO?.connected || false,
  }, { merge: true });

  return results;
});

/**
 * Growth Engine: Sync campaigns to Google Ads.
 * Reads campaign structures from Firestore, pushes to Google Ads.
 * Admin-only, callable.
 */
exports.growthSyncCampaigns = onCall({
  cors: true,
  enforceAppCheck: false,
  secrets: [
    'GOOGLE_ADS_DEVELOPER_TOKEN',
    'GOOGLE_ADS_CLIENT_ID',
    'GOOGLE_ADS_CLIENT_SECRET',
    'GOOGLE_ADS_REFRESH_TOKEN',
    'GOOGLE_ADS_CUSTOMER_ID',
    'GOOGLE_ADS_MCC_ID',
  ],
}, async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Authentication required.');
  }

  // Admin check
  const userDoc = await db.collection('users').doc(request.auth.uid).get();
  if (!userDoc.exists || !userDoc.data()?.isAdmin) {
    throw new HttpsError('permission-denied', 'Admin access required.');
  }

  // Check guard rails
  const config = await getGrowthConfig();
  if (config.emergencyPauseAll) {
    throw new HttpsError('failed-precondition', 'Emergency pause is active. All campaigns are paused.');
  }
  if (!config.semEnabled) {
    throw new HttpsError('failed-precondition', 'SEM is disabled in Growth Engine settings.');
  }

  // Get campaigns from request payload (sent by the dashboard)
  const clientCampaigns = request.data?.campaigns;
  if (!clientCampaigns || !Array.isArray(clientCampaigns) || clientCampaigns.length === 0) {
    throw new HttpsError('invalid-argument', 'No campaigns provided. Generate campaigns first.');
  }

  console.log(`[GrowthSync] Syncing ${clientCampaigns.length} campaigns to Google Ads...`);

  // First, save campaigns to Firestore for tracking
  for (const campaign of clientCampaigns) {
    await db.collection('growth_campaigns').doc(campaign.id).set({
      ...campaign,
      savedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
  }

  let synced = 0;
  const errors = [];
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID?.replace(/-/g, '');

  for (const campaign of clientCampaigns) {
    try {
      // Check if campaign already exists in Google Ads (from a prior sync)
      const firestoreDoc = await db.collection('growth_campaigns').doc(campaign.id).get();
      const existing = firestoreDoc.data();

      if (existing?.googleAdsCampaignId) {
        // Verify the campaign still exists and is not REMOVED in Google Ads
        let campaignStillActive = false;
        try {
          const checkResp = await googleAdsRequest('googleAds:searchStream', {
            query: `SELECT campaign.status FROM campaign WHERE campaign.resource_name = '${existing.googleAdsCampaignId}' AND campaign.status != 'REMOVED' LIMIT 1`
          });
          campaignStillActive = checkResp?.[0]?.results?.length > 0;
        } catch (checkErr) {
          console.warn(`[GrowthSync] Could not verify campaign status, treating as removed:`, checkErr.message);
        }

        if (campaignStillActive) {
          // Update existing campaign budget
          console.log(`[GrowthSync] Updating existing campaign: ${campaign.name}`);
          await googleAdsRequest('campaignBudgets:mutate', {
            operations: [{
              update: {
                resource_name: existing.googleAdsBudgetResource,
                amount_micros: (campaign.dailyBudget * 1_000_000).toString(),
              },
              update_mask: 'amount_micros',
            }],
          });
        } else {
          // Campaign was removed — clear stale IDs and recreate
          console.log(`[GrowthSync] Campaign "${campaign.name}" was removed from Google Ads. Recreating...`);
          await db.collection('growth_campaigns').doc(campaign.id).update({
            googleAdsCampaignId: admin.firestore.FieldValue.delete(),
            googleAdsBudgetResource: admin.firestore.FieldValue.delete(),
          });
          existing.googleAdsCampaignId = null;
          existing.googleAdsBudgetResource = null;
        }
      }
      
      if (!existing?.googleAdsCampaignId) {
        // Create new campaign budget with unique name (timestamp avoids DUPLICATE_NAME)
        const budgetName = `VoraPrep-${campaign.courseId.toUpperCase()}-${Date.now()}`;
        console.log(`[GrowthSync] Creating new campaign: ${campaign.name} (budget: ${budgetName})`);
        
        let budgetResource;
        try {
          const budgetResponse = await googleAdsRequest('campaignBudgets:mutate', {
            operations: [{
              create: {
                name: budgetName,
                amount_micros: (campaign.dailyBudget * 1_000_000).toString(),
                delivery_method: 'STANDARD',
              },
            }],
          });
          budgetResource = budgetResponse?.results?.[0]?.resourceName;
        } catch (budgetErr) {
          // If DUPLICATE_NAME, try to find existing budget via search
          if (budgetErr.message?.includes('DUPLICATE_NAME')) {
            console.log(`[GrowthSync] Budget name collision, searching for existing budget...`);
            const searchResp = await googleAdsRequest('googleAds:searchStream', {
              query: `SELECT campaign_budget.resource_name, campaign_budget.name, campaign_budget.amount_micros FROM campaign_budget WHERE campaign_budget.name LIKE 'VoraPrep-${campaign.courseId.toUpperCase()}%' LIMIT 1`
            });
            budgetResource = searchResp?.[0]?.results?.[0]?.campaignBudget?.resourceName;
            if (!budgetResource) throw budgetErr; // Re-throw if we can't find it
            console.log(`[GrowthSync] Found existing budget: ${budgetResource}`);
          } else {
            throw budgetErr;
          }
        }

        if (!budgetResource) {
          throw new Error('Failed to create or find campaign budget');
        }

        // Create the campaign
        // Start with MAXIMIZE_CLICKS — no conversion tracking needed.
        // Switch to MAXIMIZE_CONVERSIONS once conversion actions are set up in Google Ads.
        const campaignResponse = await googleAdsRequest('campaigns:mutate', {
          operations: [{
            create: {
              name: campaign.name,
              campaign_budget: budgetResource,
              advertising_channel_type: 'SEARCH',
              status: 'PAUSED',
              // target_spend = MAXIMIZE_CLICKS in Google Ads API
              target_spend: {
                cpc_bid_ceiling_micros: ((campaign.targetCPA || 2) * 1_000_000).toString(),
              },
              network_settings: {
                target_google_search: true,
                target_search_network: false,
                target_content_network: false,
              },
              contains_eu_political_advertising: 2,
            },
          }],
        });

        const googleAdsCampaignId = campaignResponse?.results?.[0]?.resourceName;

        // Store the Google Ads IDs back to Firestore
        await db.collection('growth_campaigns').doc(campaign.id).update({
          googleAdsCampaignId,
          googleAdsBudgetResource: budgetResource,
          syncedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        console.log(`[GrowthSync] Created campaign ${campaign.name} -> ${googleAdsCampaignId}`);
      }

      // ================================================================
      // Create Ad Groups, Keywords, and Responsive Search Ads
      // ================================================================
      const campaignResourceName = existing?.googleAdsCampaignId ||
        (await db.collection('growth_campaigns').doc(campaign.id).get()).data()?.googleAdsCampaignId;

      if (campaignResourceName && campaign.adGroups?.length) {
        for (const adGroup of campaign.adGroups) {
          try {
            // --- 1) Create or find existing Ad Group ---
            let adGroupResource;

            try {
              const adGroupResponse = await googleAdsRequest('adGroups:mutate', {
                operations: [{
                  create: {
                    name: adGroup.name,
                    campaign: campaignResourceName,
                    status: 'ENABLED',
                    type: 'SEARCH_STANDARD',
                    cpc_bid_micros: ((adGroup.maxCpc || 1.5) * 1_000_000).toString(),
                  },
                }],
              });
              adGroupResource = adGroupResponse?.results?.[0]?.resourceName;
            } catch (agCreateErr) {
              if (agCreateErr.message?.includes('DUPLICATE_ADGROUP_NAME')) {
                // Find the existing ad group by name
                console.log(`[GrowthSync]   Ad group "${adGroup.name}" exists, finding it...`);
                const searchResp = await googleAdsRequest('googleAds:searchStream', {
                  query: `SELECT ad_group.resource_name FROM ad_group WHERE ad_group.name = '${adGroup.name.replace(/'/g, "\\'")}' AND campaign.resource_name = '${campaignResourceName}' AND ad_group.status != 'REMOVED' LIMIT 1`
                });
                adGroupResource = searchResp?.[0]?.results?.[0]?.adGroup?.resourceName;
                if (!adGroupResource) throw agCreateErr;
              } else {
                throw agCreateErr;
              }
            }

            if (!adGroupResource) {
              console.warn(`[GrowthSync] No resource returned for ad group ${adGroup.name}`);
              continue;
            }
            console.log(`[GrowthSync]   Ad group: ${adGroup.name} -> ${adGroupResource}`);

            // --- 2) Create Keywords (batch up to 50 at a time) ---
            if (adGroup.keywords?.length) {
              const kwOps = adGroup.keywords
                .filter(k => k.keyword && k.status !== 'removed')
                .map(k => {
                  // Strip all chars Google Ads doesn't allow in keyword text.
                  // Only allow: letters, numbers, spaces, hyphens, apostrophes, periods.
                  const kwText = k.keyword
                    .replace(/["\[\]]/g, '')
                    .replace(/[^a-zA-Z0-9\s\-'.]/g, '')
                    .replace(/\s+/g, ' ')
                    .trim();
                  const matchType = (k.matchType || 'broad').toUpperCase();

                  if (!kwText) return null; // Skip empty after sanitization

                  return {
                    create: {
                      ad_group: adGroupResource,
                      keyword: {
                        text: kwText,
                        match_type: matchType,
                      },
                      status: 'ENABLED',
                      cpc_bid_micros: ((k.maxCpc || adGroup.maxCpc || 1.5) * 1_000_000).toString(),
                    },
                  };
                }).filter(Boolean);

              // Batch in groups of 50 (API limit)
              for (let i = 0; i < kwOps.length; i += 50) {
                const batch = kwOps.slice(i, i + 50);
                await googleAdsRequest('adGroupCriteria:mutate', {
                  operations: batch,
                });
              }
              console.log(`[GrowthSync]   Keywords: ${kwOps.length} created`);
            }

            // --- 3) Create Negative Keywords at ad group level ---
            if (adGroup.negativeKeywords?.length) {
              const negOps = adGroup.negativeKeywords.map(nk => ({
                create: {
                  ad_group: adGroupResource,
                  keyword: {
                    text: nk,
                    match_type: 'BROAD',
                  },
                  negative: true,
                  status: 'ENABLED',
                },
              }));

              for (let i = 0; i < negOps.length; i += 50) {
                const batch = negOps.slice(i, i + 50);
                await googleAdsRequest('adGroupCriteria:mutate', {
                  operations: batch,
                });
              }
              console.log(`[GrowthSync]   Negative keywords: ${negOps.length} created`);
            }

            // --- 4) Create Responsive Search Ads ---
            if (adGroup.ads?.length) {
              for (const ad of adGroup.ads) {
                // RSA requires at least 3 headlines and 2 descriptions
                const validHeadlines = (ad.headlines || []).filter(h => h && h.length > 0 && h.length <= 30).slice(0, 15);
                const validDescriptions = (ad.descriptions || []).filter(d => d && d.length > 0 && d.length <= 90).slice(0, 4);

                if (validHeadlines.length < 3 || validDescriptions.length < 2) {
                  console.warn(`[GrowthSync]   Skipping RSA ${ad.id}: only ${validHeadlines.length} headlines, ${validDescriptions.length} descriptions (need 3/2)`);
                  continue;
                }

                await googleAdsRequest('adGroupAds:mutate', {
                  operations: [{
                    create: {
                      ad_group: adGroupResource,
                      status: 'ENABLED',
                      ad: {
                        responsive_search_ad: {
                          headlines: validHeadlines.map(h => ({
                            text: h.substring(0, 30),
                          })),
                          descriptions: validDescriptions.map(d => ({
                            text: d.substring(0, 90),
                          })),
                          path1: ad.displayPath?.[0]?.substring(0, 15) || '',
                          path2: ad.displayPath?.[1]?.substring(0, 15) || '',
                        },
                        final_urls: [ad.finalUrl || `https://voraprep.com/${campaign.courseId}`],
                      },
                    },
                  }],
                });
                console.log(`[GrowthSync]   RSA created: ${ad.id}`);
              }
            }

          } catch (agErr) {
            const agErrMsg = agErr.message || String(agErr);
            // Don't fail the whole campaign, just log and continue
            console.error(`[GrowthSync]   Failed ad group ${adGroup.name}:`, agErrMsg);
            errors.push({ campaign: campaign.name, adGroup: adGroup.name, error: agErrMsg });
          }
        }
      }

      synced++;
    } catch (err) {
      const errMsg = err.message || String(err);
      errors.push({ campaign: campaign.name, error: errMsg });
      console.error(`[GrowthSync] Failed to sync campaign ${campaign.name}:`, errMsg);
    }
  }

  // Log sync event
  await db.collection('growth_metrics').add({
    type: 'campaign_sync',
    synced,
    errors: errors.length,
    errorDetails: errors,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  });

  const success = errors.length === 0;
  return {
    success,
    synced,
    errors,
    message: success
      ? `Successfully synced ${synced} campaigns to Google Ads (PAUSED). Go to Google Ads to review and enable.`
      : `Synced ${synced}/${clientCampaigns.length} campaigns. ${errors.length} error(s): ${errors.map(e => e.error).join('; ')}`,
  };
});

/**
 * Growth Engine: Daily performance pull from Google Ads.
 * Runs daily at 6 AM UTC, pulls spend/conversions/CPA and applies guard rails.
 */
exports.growthDailyPull = onSchedule({
  schedule: 'every day 06:00',
  timeZone: 'UTC',
  secrets: [
    'GOOGLE_ADS_DEVELOPER_TOKEN',
    'GOOGLE_ADS_CLIENT_ID',
    'GOOGLE_ADS_CLIENT_SECRET',
    'GOOGLE_ADS_REFRESH_TOKEN',
    'GOOGLE_ADS_CUSTOMER_ID',
    'GOOGLE_ADS_MCC_ID',
    'RESEND_API_KEY',
  ],
}, async () => {
  const config = await getGrowthConfig();

  // If emergency pause or SEM disabled, skip
  if (config.emergencyPauseAll || !config.semEnabled) {
    console.log('[GrowthEngine] SEM disabled or emergency pause active, skipping daily pull.');
    return;
  }

  try {
    // Pull yesterday's performance data via Google Ads reporting
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateStr = yesterday.toISOString().split('T')[0].replace(/-/g, '');

    const reportResponse = await googleAdsRequest('googleAds:searchStream', {
      query: `
        SELECT
          campaign.id,
          campaign.name,
          campaign.status,
          metrics.cost_micros,
          metrics.conversions,
          metrics.clicks,
          metrics.impressions,
          metrics.ctr,
          metrics.average_cpc,
          metrics.cost_per_conversion
        FROM campaign
        WHERE segments.date = '${dateStr}'
      `,
    });

    const results = reportResponse?.[0]?.results || [];
    let totalSpend = 0;
    const campaignMetrics = [];

    for (const row of results) {
      const costDollars = (parseInt(row.metrics?.costMicros || '0', 10) / 1_000_000);
      totalSpend += costDollars;

      const campaignData = {
        googleCampaignId: row.campaign?.id,
        name: row.campaign?.name,
        status: row.campaign?.status,
        spend: costDollars,
        conversions: parseFloat(row.metrics?.conversions || '0'),
        clicks: parseInt(row.metrics?.clicks || '0', 10),
        impressions: parseInt(row.metrics?.impressions || '0', 10),
        ctr: parseFloat(row.metrics?.ctr || '0'),
        avgCpc: (parseInt(row.metrics?.averageCpc || '0', 10) / 1_000_000),
        cpa: (parseInt(row.metrics?.costPerConversion || '0', 10) / 1_000_000),
        date: dateStr,
      };

      campaignMetrics.push(campaignData);

      // === GUARD RAIL: Auto-pause on high CPA ===
      if (campaignData.conversions > 0 && campaignData.cpa > 0) {
        // Find this campaign's target CPA from Firestore
        const campaignDocs = await db.collection('growth_campaigns')
          .where('googleAdsCampaignId', '==', `customers/${process.env.GOOGLE_ADS_CUSTOMER_ID?.trim()?.replace(/-/g, '')}/campaigns/${row.campaign?.id}`)
          .limit(1).get();

        if (!campaignDocs.empty) {
          const targetCPA = campaignDocs.docs[0].data()?.targetCPA || 25;
          if (campaignData.cpa > targetCPA * config.maxCpaMultiplier) {
            console.warn(`[GrowthEngine] GUARD RAIL: Pausing campaign ${campaignData.name} — CPA $${campaignData.cpa.toFixed(2)} exceeds ${config.maxCpaMultiplier}x target $${targetCPA}`);

            try {
              await googleAdsRequest('campaigns:mutate', {
                operations: [{
                  update: {
                    resourceName: `customers/${process.env.GOOGLE_ADS_CUSTOMER_ID?.trim()?.replace(/-/g, '')}/campaigns/${row.campaign?.id}`,
                    status: 'PAUSED',
                  },
                  updateMask: 'status',
                }],
              });

              // Log the pause action
              await db.collection('growth_actions').add({
                type: 'auto_pause_high_cpa',
                campaign: campaignData.name,
                reason: `CPA $${campaignData.cpa.toFixed(2)} exceeded ${config.maxCpaMultiplier}x target $${targetCPA}`,
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
              });
            } catch (pauseErr) {
              console.error(`Failed to auto-pause campaign: ${pauseErr.message}`);
            }
          }
        }
      }
    }

    // Save daily metrics
    await db.collection('growth_metrics').doc(dateStr).set({
      date: dateStr,
      totalSpend,
      campaigns: campaignMetrics,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    // === GUARD RAIL: Budget overage alert ===
    if (config.alertOnBudgetOverage && totalSpend > config.totalDailyBudget * 1.2) {
      const apiKey = process.env.RESEND_API_KEY?.trim();
      if (apiKey) {
        const emailResend = new Resend(apiKey);
        await emailResend.emails.send({
          from: 'VoraPrep Growth Engine <alerts@voraprep.com>',
          to: 'admin@voraprep.com',
          subject: `⚠️ Budget Overage Alert — $${totalSpend.toFixed(2)} spent (limit: $${config.totalDailyBudget})`,
          html: `
            <h2>Daily Spend Exceeded Budget</h2>
            <p><strong>Date:</strong> ${yesterday.toISOString().split('T')[0]}</p>
            <p><strong>Spent:</strong> $${totalSpend.toFixed(2)}</p>
            <p><strong>Budget:</strong> $${config.totalDailyBudget}</p>
            <p><strong>Overage:</strong> ${((totalSpend / config.totalDailyBudget - 1) * 100).toFixed(0)}%</p>
            <p>Review campaigns at <a href="https://voraprep.com/admin/growth">Growth Dashboard</a></p>
          `,
        });
      }
    }

    console.log(`[GrowthEngine] Daily pull complete. Total spend: $${totalSpend.toFixed(2)}, ${results.length} campaigns.`);
  } catch (error) {
    console.error('[GrowthEngine] Daily pull failed:', error);
  }
});


// ============================================================================
// GROWTH ENGINE — Google Search Console Rank Tracking
// ============================================================================
// Secrets required:
//   firebase functions:secrets:set GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL
//   firebase functions:secrets:set GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY
// ============================================================================

/**
 * Helper: Get Search Console access token via service account.
 */
async function getSearchConsoleAccessToken() {
  const clientEmail = process.env.GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL?.trim();
  let privateKey = process.env.GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY?.trim();

  if (!clientEmail || !privateKey) {
    throw new HttpsError('failed-precondition', 'Search Console credentials not configured.');
  }

  // Normalize PEM private key — Firebase secrets can mangle newlines in several ways:
  //  1. Literal backslash-n sequences: \\n or \n stored as text
  //  2. Escaped JSON: \\\\n
  //  3. All on one line with no breaks at all
  // Fix all of them so crypto.createSign can parse the PEM.
  privateKey = privateKey.replace(/\\n/g, '\n');           // literal \n → actual newline
  privateKey = privateKey.replace(/\\\\n/g, '\n');         // \\n → actual newline
  
  // If the key has no real newlines between BEGIN/END markers, re-chunk it
  if (privateKey.includes('-----BEGIN') && !privateKey.match(/-----BEGIN[^\n]*\n/)) {
    // Key is all on one line — insert newlines around headers and every 64 chars
    privateKey = privateKey
      .replace(/-----BEGIN (.*?)-----/, '-----BEGIN $1-----\n')
      .replace(/-----END (.*?)-----/, '\n-----END $1-----');
    const headerMatch = privateKey.match(/-----BEGIN .*?-----\n/);
    const footerMatch = privateKey.match(/\n-----END .*?-----/);
    if (headerMatch && footerMatch) {
      const header = headerMatch[0];
      const footer = footerMatch[0];
      const body = privateKey.slice(header.length, privateKey.length - footer.length + 1).replace(/\s/g, '');
      const chunked = body.match(/.{1,64}/g)?.join('\n') || body;
      privateKey = header + chunked + footer;
    }
  }

  // Build JWT for service account auth
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  })).toString('base64url');

  const crypto = require('crypto');
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(`${header}.${payload}`);
  const signature = signer.sign(privateKey, 'base64url');

  const jwt = `${header}.${payload}.${signature}`;

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!response.ok) {
    console.error('Failed to get Search Console token:', await response.text());
    throw new HttpsError('internal', 'Search Console authentication failed.');
  }

  const data = await response.json();
  return data.access_token;
}

/**
 * Growth Engine: Daily rank tracking via Google Search Console.
 * Pulls search analytics for tracked keywords, updates positions in Firestore.
 */
exports.growthRankTracking = onSchedule({
  schedule: 'every day 07:00',
  timeZone: 'UTC',
  secrets: [
    'GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL',
    'GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY',
    'RESEND_API_KEY',
  ],
}, async () => {
  const config = await getGrowthConfig();

  if (!config.rankTrackingEnabled) {
    console.log('[GrowthEngine] Rank tracking disabled, skipping.');
    return;
  }

  try {
    const accessToken = await getSearchConsoleAccessToken();
    const siteUrl = 'https://voraprep.com';

    // Query last 3 days of search analytics (Search Console has a 2-3 day lag)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 2);
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 1);

    const response = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
          dimensions: ['query', 'page'],
          rowLimit: 5000,
        }),
      },
    );

    if (!response.ok) {
      console.error('Search Console API error:', await response.text());
      return;
    }

    const data = await response.json();
    const rows = data.rows || [];

    console.log(`[GrowthEngine] Received ${rows.length} search analytics rows.`);

    // Load tracked keywords from Firestore
    const keywordsSnapshot = await db.collection('growth_keywords').get();
    const trackedKeywords = new Map();
    keywordsSnapshot.forEach(doc => {
      trackedKeywords.set(doc.data().keyword?.toLowerCase(), doc.id);
    });

    let updated = 0;
    let rankDrops = [];

    // Batch update keyword positions
    const batch = db.batch();
    const batchSize = 500;
    let batchCount = 0;

    for (const row of rows) {
      const keyword = row.keys?.[0]?.toLowerCase();
      const docId = trackedKeywords.get(keyword);

      if (docId) {
        const ref = db.collection('growth_keywords').doc(docId);
        const oldDoc = await ref.get();
        const oldPosition = oldDoc.data()?.currentPosition || 0;
        const newPosition = Math.round(row.position);

        batch.update(ref, {
          currentPosition: newPosition,
          previousPosition: oldPosition,
          lastChecked: admin.firestore.FieldValue.serverTimestamp(),
          impressions: row.impressions || 0,
          clicks: row.clicks || 0,
          ctr: row.ctr || 0,
          rankingUrl: row.keys?.[1] || '',
        });

        updated++;
        batchCount++;

        // Detect rank drops of 5+ positions
        if (oldPosition > 0 && newPosition > oldPosition + 5) {
          rankDrops.push({
            keyword,
            oldPosition,
            newPosition,
            drop: newPosition - oldPosition,
          });
        }

        // Commit batch every 500 operations
        if (batchCount >= batchSize) {
          await batch.commit();
          batchCount = 0;
        }
      }
    }

    if (batchCount > 0) {
      await batch.commit();
    }

    // === GUARD RAIL: Rank drop alerts ===
    if (config.alertOnRankDrop && rankDrops.length > 0) {
      const apiKey = process.env.RESEND_API_KEY?.trim();
      if (apiKey) {
        const emailResend = new Resend(apiKey);
        const dropRows = rankDrops
          .sort((a, b) => b.drop - a.drop)
          .slice(0, 20)
          .map(d => `<tr><td>${d.keyword}</td><td>${d.oldPosition}</td><td>${d.newPosition}</td><td style="color:red">-${d.drop}</td></tr>`)
          .join('');

        await emailResend.emails.send({
          from: 'VoraPrep Growth Engine <alerts@voraprep.com>',
          to: 'admin@voraprep.com',
          subject: `📉 Rank Drop Alert — ${rankDrops.length} keywords dropped 5+ positions`,
          html: `
            <h2>Keyword Rank Drops Detected</h2>
            <p>${rankDrops.length} tracked keywords dropped 5+ positions.</p>
            <table border="1" cellpadding="6" style="border-collapse:collapse">
              <tr><th>Keyword</th><th>Old</th><th>New</th><th>Change</th></tr>
              ${dropRows}
            </table>
            <p>Review at <a href="https://voraprep.com/admin/growth">Growth Dashboard</a></p>
          `,
        });
      }
    }

    console.log(`[GrowthEngine] Rank tracking complete. Updated ${updated} keywords. ${rankDrops.length} drops detected.`);

    // Log tracking run
    await db.collection('growth_metrics').add({
      type: 'rank_tracking',
      keywordsUpdated: updated,
      rankDrops: rankDrops.length,
      totalRows: rows.length,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.error('[GrowthEngine] Rank tracking failed:', error);
  }
});


// ============================================================================
// GROWTH ENGINE — Content Pipeline (Gemini-powered article generation)
// ============================================================================

/**
 * Growth Engine: Generate an article draft from a content brief.
 * Admin-only, callable. Generates via Gemini, saves as draft (requires review).
 */
exports.growthGenerateArticle = onCall({
  cors: true,
  enforceAppCheck: false,
  secrets: ['GEMINI_API_KEY'],
  timeoutSeconds: 120,
}, async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Authentication required.');
  }

  // Admin check
  const userDoc = await db.collection('users').doc(request.auth.uid).get();
  if (!userDoc.exists || !userDoc.data()?.isAdmin) {
    throw new HttpsError('permission-denied', 'Admin access required.');
  }

  const { briefId } = request.data;
  if (!briefId) {
    throw new HttpsError('invalid-argument', 'briefId is required.');
  }

  // Load brief
  const briefDoc = await db.collection('growth_content').doc(briefId).get();
  if (!briefDoc.exists) {
    throw new HttpsError('not-found', 'Content brief not found.');
  }
  const brief = briefDoc.data();

  // Load config for guard rails
  const config = await getGrowthConfig();

  // Check weekly article limit
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const recentArticles = await db.collection('growth_content')
    .where('status', 'in', ['draft', 'review', 'published'])
    .where('generatedAt', '>=', admin.firestore.Timestamp.fromDate(weekAgo))
    .get();

  if (recentArticles.size >= config.maxArticlesPerWeek) {
    throw new HttpsError(
      'resource-exhausted',
      `Weekly article limit reached (${config.maxArticlesPerWeek}/week). Increase in Settings.`
    );
  }

  // Build the prompt
  const examNames = {
    cpa: 'CPA (Certified Public Accountant)',
    ea: 'EA (Enrolled Agent)',
    cma: 'CMA (Certified Management Accountant)',
    cia: 'CIA (Certified Internal Auditor)',
    cisa: 'CISA (Certified Information Systems Auditor)',
    cfp: 'CFP (Certified Financial Planner)',
  };

  const systemPrompt = `You are an expert SEO content writer specializing in professional certification exam preparation. 
You write for VoraPrep (voraprep.com), an AI-powered exam prep platform.

CRITICAL RULES:
- Write genuinely helpful, comprehensive content — not thin SEO filler
- Include specific, accurate facts (pass rates, exam structure, pricing)
- Use natural language — DO NOT keyword-stuff
- Include actionable advice from real exam prep experience
- Cite official sources (AICPA, IRS, IMA, IIA, ISACA, CFP Board) where appropriate
- Use H2/H3 headings for structure
- Include a compelling meta description (155 chars max)
- Target word count: ${brief.wordCountTarget || 2000} words
- Write in Markdown format`;

  const userPrompt = `Write a comprehensive article for the following content brief:

TITLE: ${brief.title}
EXAM: ${examNames[brief.courseId] || brief.courseId.toUpperCase()}
${brief.section ? `SECTION: ${brief.section}` : ''}
CONTENT TYPE: ${brief.contentType}
TARGET KEYWORDS: ${(brief.targetKeywords || []).join(', ')}
TARGET WORD COUNT: ${brief.wordCountTarget || 2000}

OUTLINE:
${(brief.outline || []).map((s, i) => `${i + 1}. ${s.heading}\n   ${s.keyPoints?.join('\n   ') || ''}`).join('\n')}

INTERNAL LINKS TO INCLUDE:
${(brief.internalLinks || []).map(l => `- ${l}`).join('\n')}

Please write the complete article in Markdown. Start with a meta description line, then the full article.`;

  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new HttpsError('failed-precondition', 'Gemini API key not configured.');
  }

  const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  try {
    const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 8192,
        },
      }),
    });

    if (!response.ok) {
      console.error('Gemini content generation failed:', await response.text());
      throw new HttpsError('internal', 'AI content generation failed.');
    }

    const data = await response.json();
    const generatedContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedContent) {
      throw new HttpsError('internal', 'No content generated.');
    }

    // Save the generated draft
    const newStatus = config.contentReviewRequired ? 'review' : 'published';

    await db.collection('growth_content').doc(briefId).update({
      status: newStatus,
      generatedContent,
      generatedAt: admin.firestore.FieldValue.serverTimestamp(),
      wordCount: generatedContent.split(/\s+/).length,
      generatedBy: 'gemini-2.0-flash',
    });

    return {
      status: newStatus,
      wordCount: generatedContent.split(/\s+/).length,
      preview: generatedContent.substring(0, 500) + '...',
      message: config.contentReviewRequired
        ? 'Article generated and moved to review queue. Approve before publishing.'
        : 'Article generated and published.',
    };
  } catch (error) {
    if (error instanceof HttpsError) throw error;
    console.error('Content generation error:', error);
    throw new HttpsError('internal', 'Failed to generate article.');
  }
});


// ============================================================================
// GROWTH ENGINE — DataForSEO Keyword Research
// ============================================================================
// Secrets required:
//   firebase functions:secrets:set DATAFORSEO_LOGIN
//   firebase functions:secrets:set DATAFORSEO_PASSWORD
// ============================================================================

/**
 * Growth Engine: Enrich keywords with volume, difficulty, CPC data.
 * Pulls from DataForSEO API and updates keyword records in Firestore.
 * Admin-only, callable.
 */
exports.growthEnrichKeywords = onCall({
  cors: true,
  enforceAppCheck: false,
  secrets: ['DATAFORSEO_LOGIN', 'DATAFORSEO_PASSWORD'],
  timeoutSeconds: 120,
}, async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Authentication required.');
  }

  // Admin check
  const userDoc = await db.collection('users').doc(request.auth.uid).get();
  if (!userDoc.exists || !userDoc.data()?.isAdmin) {
    throw new HttpsError('permission-denied', 'Admin access required.');
  }

  const login = process.env.DATAFORSEO_LOGIN?.trim();
  const password = process.env.DATAFORSEO_PASSWORD?.trim();
  if (!login || !password) {
    throw new HttpsError('failed-precondition', 'DataForSEO credentials not configured.');
  }

  const authHeader = Buffer.from(`${login}:${password}`).toString('base64');

  // Load un-enriched keywords (no volume data yet)
  const keywordsSnapshot = await db.collection('growth_keywords')
    .where('enriched', '==', false)
    .limit(100)  // DataForSEO rate limits — process in batches
    .get();

  if (keywordsSnapshot.empty) {
    return { enriched: 0, message: 'No keywords to enrich.' };
  }

  const keywords = keywordsSnapshot.docs.map(doc => ({
    id: doc.id,
    keyword: doc.data().keyword,
  }));

  // DataForSEO bulk keyword data endpoint
  const response = await fetch('https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${authHeader}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([{
      keywords: keywords.map(k => k.keyword),
      location_code: 2840,  // United States
      language_code: 'en',
    }]),
  });

  if (!response.ok) {
    console.error('DataForSEO API error:', await response.text());
    throw new HttpsError('internal', 'DataForSEO API error.');
  }

  const data = await response.json();
  const results = data?.tasks?.[0]?.result || [];

  // Update keywords in Firestore
  let enriched = 0;
  const batch = db.batch();

  for (const result of results) {
    const matchingKeyword = keywords.find(k =>
      k.keyword.toLowerCase() === result.keyword?.toLowerCase()
    );

    if (matchingKeyword) {
      batch.update(db.collection('growth_keywords').doc(matchingKeyword.id), {
        searchVolume: result.search_volume || 0,
        cpc: result.cpc || 0,
        competition: result.competition || 0,
        competitionLevel: result.competition_level || 'unknown',
        enriched: true,
        enrichedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      enriched++;
    }
  }

  await batch.commit();

  return {
    enriched,
    total: keywords.length,
    message: `Enriched ${enriched}/${keywords.length} keywords with volume/CPC data.`,
  };
});


// ============================================================================
// GROWTH ENGINE — Automated Blog Content Publisher
// ============================================================================
// Runs on a schedule (every 2-3 days via randomized skip).
// Picks a random unpublished brief, generates via Gemini, publishes directly.
// This is the "set it and go" automation for SEO content growth.
// ============================================================================

/**
 * Growth Engine: Automated content generation and publishing.
 * 
 * Schedule: Runs daily at 10 AM UTC, but randomly skips ~50% of runs
 * to create a natural, unpredictable posting cadence (avg 3-4 posts/week).
 * 
 * Pipeline:
 *   1. Check if auto-content is enabled in growth_config
 *   2. Check weekly article limit (safety rail)
 *   3. Roll dice — skip ~40% of runs for natural cadence
 *   4. Pick a random brief with status='brief' (unpublished)
 *   5. Generate full article via Gemini 2.0 Flash
 *   6. Save as 'published' directly (no review gate)
 *   7. Log the action for audit trail
 */
exports.growthAutoPublish = onSchedule({
  schedule: 'every day 10:00',
  timeZone: 'America/New_York',
  secrets: ['GEMINI_API_KEY', 'RESEND_API_KEY'],
  timeoutSeconds: 120,
  memory: '512MiB',
}, async () => {
  console.log('[AutoPublish] Starting automated content pipeline...');

  // 1. Load config
  const config = await getGrowthConfig();
  
  if (!config.autoContentGeneration) {
    console.log('[AutoPublish] Auto content generation is disabled. Skipping.');
    return;
  }

  // 2. Check weekly limit
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const recentArticles = await db.collection('growth_content')
    .where('status', '==', 'published')
    .where('generatedAt', '>=', admin.firestore.Timestamp.fromDate(weekAgo))
    .get();

  const maxPerWeek = config.maxArticlesPerWeek || 5;
  if (recentArticles.size >= maxPerWeek) {
    console.log(`[AutoPublish] Weekly limit reached (${recentArticles.size}/${maxPerWeek}). Skipping.`);
    return;
  }

  // 3. Random skip for natural cadence (~40% chance to skip)
  //    This makes posting unpredictable: some days 0, some 1
  //    Avg ~4 articles/week (7 days × 60% = 4.2)
  const skipRoll = Math.random();
  if (skipRoll < 0.40) {
    console.log(`[AutoPublish] Random skip (roll=${skipRoll.toFixed(2)}). Will try again tomorrow.`);
    return;
  }

  // 4. Pick a random unpublished brief
  const briefsSnapshot = await db.collection('growth_content')
    .where('status', '==', 'brief')
    .limit(50)
    .get();

  if (briefsSnapshot.empty) {
    console.log('[AutoPublish] No unpublished briefs available. Content pool exhausted.');
    return;
  }

  // Pick a random brief from the pool
  const briefs = briefsSnapshot.docs;
  const randomIndex = Math.floor(Math.random() * briefs.length);
  const briefDoc = briefs[randomIndex];
  const brief = briefDoc.data();

  console.log(`[AutoPublish] Selected brief: "${brief.title}" (${briefDoc.id})`);

  // 5. Generate article via Gemini
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    console.error('[AutoPublish] GEMINI_API_KEY not configured.');
    return;
  }

  const examNames = {
    cpa: 'CPA (Certified Public Accountant)',
    ea: 'EA (Enrolled Agent)',
    cma: 'CMA (Certified Management Accountant)',
    cia: 'CIA (Certified Internal Auditor)',
    cisa: 'CISA (Certified Information Systems Auditor)',
    cfp: 'CFP (Certified Financial Planner)',
  };

  const systemPrompt = `You are an expert SEO content writer specializing in professional certification exam preparation. 
You write for VoraPrep (voraprep.com), an AI-powered exam prep platform.

CRITICAL RULES:
- Write genuinely helpful, comprehensive content — not thin SEO filler
- Include specific, accurate facts (pass rates, exam structure, pricing)
- Use natural language — DO NOT keyword-stuff
- Include actionable advice from real exam prep experience
- Cite official sources (AICPA, IRS, IMA, IIA, ISACA, CFP Board) where appropriate
- Use H2/H3 headings for structure
- Write a compelling meta description on the FIRST LINE in format: "Meta Description: ..."
- Target word count: ${brief.wordCountTarget || 2000} words
- Write in Markdown format
- Do NOT include the article title as an H1 (it's rendered separately)
- Include a brief, engaging intro paragraph before the first H2
- End with a concise summary or key takeaways`;

  const userPrompt = `Write a comprehensive article for the following content brief:

TITLE: ${brief.title}
EXAM: ${examNames[brief.courseId] || brief.courseId?.toUpperCase() || 'Professional Certification'}
${brief.section ? `SECTION: ${brief.section}` : ''}
CONTENT TYPE: ${brief.contentType}
TARGET KEYWORDS: ${(brief.targetKeywords || []).join(', ')}
TARGET WORD COUNT: ${brief.wordCountTarget || 2000}

OUTLINE:
${(brief.outline || []).map((s, i) => `${i + 1}. ${s.heading}\n   ${(s.keyPoints || []).join('\n   ')}`).join('\n')}

INTERNAL LINKS TO INCLUDE (use markdown links to voraprep.com):
${(brief.internalLinks || []).map(l => `- https://voraprep.com${l}`).join('\n')}

Please write the complete article in Markdown. Start with "Meta Description: ..." on the first line, then the full article.`;

  const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  try {
    const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 8192,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[AutoPublish] Gemini API error:', errText);
      return;
    }

    const data = await response.json();
    const generatedContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedContent) {
      console.error('[AutoPublish] Gemini returned empty content.');
      return;
    }

    // 6. Extract meta description from the first line
    let metaDescription = '';
    const metaMatch = generatedContent.match(/^Meta\s*Description:\s*(.+)/im);
    if (metaMatch) {
      metaDescription = metaMatch[1].trim().substring(0, 160);
    }

    const wordCount = generatedContent.split(/\s+/).length;

    // Save as published
    await db.collection('growth_content').doc(briefDoc.id).update({
      status: 'published',
      generatedContent,
      metaDescription,
      metaTitle: brief.title,
      generatedAt: admin.firestore.FieldValue.serverTimestamp(),
      publishedAt: admin.firestore.FieldValue.serverTimestamp(),
      wordCount,
      generatedBy: 'gemini-2.0-flash',
      autoPublished: true,
    });

    console.log(`[AutoPublish] ✅ Published: "${brief.title}" (${wordCount} words, slug: ${brief.slug})`);

    // 7. Log the action
    await db.collection('growth_actions').add({
      type: 'auto-publish',
      briefId: briefDoc.id,
      title: brief.title,
      slug: brief.slug,
      courseId: brief.courseId,
      wordCount,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    // 8. Send notification email
    const resendKey = process.env.RESEND_API_KEY?.trim();
    if (resendKey) {
      try {
        const notifyResend = new Resend(resendKey);
        const articleUrl = `https://voraprep.com/blog/${brief.slug}`;
        await notifyResend.emails.send({
          from: 'VoraPrep Content Engine <alerts@voraprep.com>',
          to: 'rob@sagecg.com',
          subject: `📝 New article published: ${brief.title}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1e40af;">New Blog Article Published</h2>
              <p style="font-size: 16px; color: #334155;"><strong>${brief.title}</strong></p>
              <table style="margin: 16px 0; font-size: 14px; color: #64748b;">
                <tr><td style="padding: 4px 12px 4px 0;">Exam:</td><td><strong>${(brief.courseId || '').toUpperCase()}</strong></td></tr>
                <tr><td style="padding: 4px 12px 4px 0;">Type:</td><td>${brief.contentType || 'article'}</td></tr>
                <tr><td style="padding: 4px 12px 4px 0;">Words:</td><td>${wordCount.toLocaleString()}</td></tr>
                <tr><td style="padding: 4px 12px 4px 0;">Slug:</td><td>${brief.slug}</td></tr>
              </table>
              <a href="${articleUrl}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 8px 0;">Read Article →</a>
              <p style="font-size: 13px; color: #94a3b8; margin-top: 24px;">Auto-published by VoraPrep Content Engine</p>
            </div>
          `,
        });
        console.log('[AutoPublish] Notification email sent to rob@sagecg.com');
      } catch (emailErr) {
        console.warn('[AutoPublish] Failed to send notification email:', emailErr.message);
      }
    }

  } catch (error) {
    console.error('[AutoPublish] Generation failed:', error);
  }
});

/**
 * Growth Engine: Seed content briefs from the content matrix.
 * Admin-only, callable. Generates all possible briefs and saves to Firestore.
 * Run once to populate the content pipeline, then growthAutoPublish handles the rest.
 */
exports.growthSeedBriefs = onCall({
  cors: true,
  enforceAppCheck: false,
  timeoutSeconds: 60,
}, async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Authentication required.');
  }

  // Admin check
  const userDoc = await db.collection('users').doc(request.auth.uid).get();
  if (!userDoc.exists || !userDoc.data()?.isAdmin) {
    throw new HttpsError('permission-denied', 'Admin access required.');
  }

  // Check how many briefs already exist
  const existingSnapshot = await db.collection('growth_content').get();
  const existingSlugs = new Set(existingSnapshot.docs.map(d => d.data().slug).filter(Boolean));

  // Content templates — same approach as contentEngine.ts but server-side
  const CURRENT_YEAR = '2026';
  const exams = [
    {
      courseId: 'cpa', exam: 'CPA', examFull: 'Certified Public Accountant',
      sections: [
        { id: 'FAR', name: 'Financial Accounting and Reporting' },
        { id: 'AUD', name: 'Auditing and Attestation' },
        { id: 'REG', name: 'Taxation and Regulation' },
        { id: 'BAR', name: 'Business Analysis and Reporting' },
        { id: 'ISC', name: 'Information Systems and Controls' },
        { id: 'TCP', name: 'Tax Compliance and Planning' },
      ],
    },
    {
      courseId: 'ea', exam: 'EA', examFull: 'Enrolled Agent',
      sections: [
        { id: 'SEE1', name: 'Individual Taxation' },
        { id: 'SEE2', name: 'Business Taxation' },
        { id: 'SEE3', name: 'Representation and Ethics' },
      ],
    },
    {
      courseId: 'cma', exam: 'CMA', examFull: 'Certified Management Accountant',
      sections: [
        { id: 'CMA1', name: 'Financial Planning, Performance, and Analytics' },
        { id: 'CMA2', name: 'Strategic Financial Management' },
      ],
    },
    {
      courseId: 'cia', exam: 'CIA', examFull: 'Certified Internal Auditor',
      sections: [
        { id: 'CIA1', name: 'Essentials of Internal Auditing' },
        { id: 'CIA2', name: 'Practice of Internal Auditing' },
        { id: 'CIA3', name: 'Business Knowledge for Internal Auditing' },
      ],
    },
    {
      courseId: 'cisa', exam: 'CISA', examFull: 'Certified Information Systems Auditor',
      sections: [
        { id: 'CISA1', name: 'Information Systems Auditing Process' },
        { id: 'CISA2', name: 'Governance and Management of IT' },
        { id: 'CISA3', name: 'Information Systems Acquisition and Development' },
        { id: 'CISA4', name: 'Information Systems Operations and Business Resilience' },
        { id: 'CISA5', name: 'Protection of Information Assets' },
      ],
    },
    {
      courseId: 'cfp', exam: 'CFP', examFull: 'Certified Financial Planner',
      sections: [
        { id: 'CFP1', name: 'General Principles of Financial Planning' },
        { id: 'CFP2', name: 'Risk Management and Insurance Planning' },
        { id: 'CFP3', name: 'Investment Planning' },
        { id: 'CFP4', name: 'Tax Planning' },
        { id: 'CFP5', name: 'Retirement Savings and Income Planning' },
        { id: 'CFP6', name: 'Estate Planning' },
        { id: 'CFP7', name: 'Financial Plan Development' },
        { id: 'CFP8', name: 'Psychology of Financial Planning' },
      ],
    },
  ];

  // Template types to generate
  const templates = [
    { id: 'study-guide', title: 'Complete {exam} {section} Study Guide {year}', slug: '{course}-{sectionLower}-study-guide-{year}', perSection: true, wordCount: 2500, priority: 1 },
    { id: 'pass-rates', title: '{exam} Pass Rates {year}: What to Expect', slug: '{course}-pass-rates-{year}', perSection: false, wordCount: 2000, priority: 2 },
    { id: 'study-schedule', title: '{exam} Study Schedule {year}: Week-by-Week Plan', slug: '{course}-study-schedule-{year}', perSection: false, wordCount: 2200, priority: 2 },
    { id: 'salary-guide', title: '{exam} Salary Guide {year}: How Much Do {exam}s Earn?', slug: '{course}-salary-guide-{year}', perSection: false, wordCount: 2000, priority: 3 },
    { id: 'review-comparison', title: 'Best {exam} Review Courses {year}: Honest Comparison', slug: 'best-{course}-review-courses-{year}', perSection: false, wordCount: 2800, priority: 1 },
    { id: 'exam-tips', title: '{count} Tips to Pass the {exam} Exam in {year}', slug: '{course}-exam-tips-{year}', perSection: false, wordCount: 2000, priority: 2 },
    { id: 'requirements', title: '{exam} Requirements {year}: Education, Experience & Fees', slug: '{course}-requirements-{year}', perSection: false, wordCount: 2000, priority: 3 },
    { id: 'free-practice', title: 'Free {exam} {section} Practice Questions ({year})', slug: 'free-{course}-{sectionLower}-practice-questions-{year}', perSection: true, wordCount: 3000, priority: 1 },
    { id: 'topic-explainer', title: 'Understanding {sectionName}: {exam} {section} Breakdown', slug: '{course}-{sectionLower}-breakdown-{year}', perSection: true, wordCount: 1800, priority: 3 },
  ];

  // Comparison briefs for exam pairs
  const comparisonPairs = [
    ['cpa', 'ea', 'CPA vs EA'], ['cpa', 'cma', 'CPA vs CMA'],
    ['cpa', 'cia', 'CPA vs CIA'], ['cma', 'cia', 'CMA vs CIA'],
    ['cma', 'cfp', 'CMA vs CFP'], ['cisa', 'cia', 'CISA vs CIA'],
  ];

  let seeded = 0;
  let skipped = 0;
  const batch = db.batch();
  let batchCount = 0;

  for (const exam of exams) {
    for (const template of templates) {
      if (template.perSection) {
        for (const section of exam.sections) {
          const slug = template.slug
            .replace('{course}', exam.courseId)
            .replace('{sectionLower}', section.id.toLowerCase())
            .replace('{year}', CURRENT_YEAR);

          if (existingSlugs.has(slug)) { skipped++; continue; }

          const title = template.title
            .replace('{exam}', exam.exam)
            .replace('{section}', section.id)
            .replace('{sectionName}', section.name)
            .replace('{year}', CURRENT_YEAR)
            .replace('{count}', '15');

          const briefId = `${exam.courseId}-${template.id}-${section.id.toLowerCase()}-${CURRENT_YEAR}`;
          const ref = db.collection('growth_content').doc(briefId);
          batch.set(ref, {
            title, slug,
            courseId: exam.courseId,
            section: section.id,
            contentType: template.id,
            targetKeywords: [`${exam.exam.toLowerCase()} ${section.id.toLowerCase()}`, `${exam.exam.toLowerCase()} ${section.name.toLowerCase()}`],
            primaryKeyword: `${exam.exam.toLowerCase()} ${section.id.toLowerCase()} study guide`,
            wordCountTarget: template.wordCount,
            internalLinks: [`/${exam.courseId}`],
            ctaType: 'register',
            ctaUrl: `/${exam.courseId}`,
            status: 'brief',
            priority: template.priority,
            outline: [],
            searchIntent: 'informational',
            estimatedVolume: 0,
            competitorUrls: [],
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          }, { merge: true });
          seeded++;
          batchCount++;

          if (batchCount >= 450) {
            await batch.commit();
            batchCount = 0;
          }
        }
      } else {
        const slug = template.slug
          .replace('{course}', exam.courseId)
          .replace('{year}', CURRENT_YEAR);

        if (existingSlugs.has(slug)) { skipped++; continue; }

        const title = template.title
          .replace('{exam}', exam.exam)
          .replace('{year}', CURRENT_YEAR)
          .replace('{count}', '15');

        const briefId = `${exam.courseId}-${template.id}-${CURRENT_YEAR}`;
        const ref = db.collection('growth_content').doc(briefId);
        batch.set(ref, {
          title, slug,
          courseId: exam.courseId,
          contentType: template.id,
          targetKeywords: [`${exam.exam.toLowerCase()} prep`, `${exam.exam.toLowerCase()} exam`],
          primaryKeyword: `${exam.exam.toLowerCase()} ${template.id.replace(/-/g, ' ')}`,
          wordCountTarget: template.wordCount,
          internalLinks: [`/${exam.courseId}`],
          ctaType: 'register',
          ctaUrl: `/${exam.courseId}`,
          status: 'brief',
          priority: template.priority,
          outline: [],
          searchIntent: 'informational',
          estimatedVolume: 0,
          competitorUrls: [],
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        }, { merge: true });
        seeded++;
        batchCount++;

        if (batchCount >= 450) {
          await batch.commit();
          batchCount = 0;
        }
      }
    }
  }

  // Add comparison briefs
  for (const [course1, course2, label] of comparisonPairs) {
    const slug = `${course1}-vs-${course2}-comparison-${CURRENT_YEAR}`;
    if (existingSlugs.has(slug)) { skipped++; continue; }

    const briefId = `comparison-${course1}-${course2}-${CURRENT_YEAR}`;
    const ref = db.collection('growth_content').doc(briefId);
    batch.set(ref, {
      title: `${label}: Which Certification Is Right for You in ${CURRENT_YEAR}?`,
      slug,
      courseId: course1,
      contentType: 'comparison',
      targetKeywords: [`${course1} vs ${course2}`, label.toLowerCase()],
      primaryKeyword: `${course1} vs ${course2}`,
      wordCountTarget: 2500,
      internalLinks: [`/${course1}`, `/${course2}`],
      ctaType: 'register',
      ctaUrl: '/',
      status: 'brief',
      priority: 1,
      outline: [],
      searchIntent: 'informational',
      estimatedVolume: 0,
      competitorUrls: [],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
    seeded++;
    batchCount++;
  }

  if (batchCount > 0) {
    await batch.commit();
  }

  console.log(`[SeedBriefs] Seeded ${seeded} briefs (${skipped} already existed).`);

  return {
    seeded,
    skipped,
    total: seeded + skipped,
    message: `Seeded ${seeded} new content briefs. ${skipped} already existed. growthAutoPublish will start generating articles automatically.`,
  };
});


// ============================================================================
// DYNAMIC SITEMAP — serves sitemap.xml with published blog articles
// ============================================================================

/**
 * Serves a dynamic sitemap.xml that includes all published blog articles.
 * Firebase Hosting rewrite: /sitemap.xml → this function.
 * Cached for 1 hour to avoid hitting Firestore on every crawl.
 */
exports.dynamicSitemap = onRequest({
  cors: false,
  timeoutSeconds: 15,
}, async (req, res) => {
  const DOMAIN = 'https://voraprep.com';
  const TODAY = new Date().toISOString().split('T')[0];

  // Static routes (same as generate-sitemap.cjs)
  const staticRoutes = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/cpa', priority: '0.9', changefreq: 'weekly' },
    { loc: '/ea-prep', priority: '0.9', changefreq: 'weekly' },
    { loc: '/cma', priority: '0.9', changefreq: 'weekly' },
    { loc: '/cia', priority: '0.9', changefreq: 'weekly' },
    { loc: '/cfp', priority: '0.9', changefreq: 'weekly' },
    { loc: '/cisa', priority: '0.9', changefreq: 'weekly' },
    { loc: '/cpa/info', priority: '0.8', changefreq: 'monthly' },
    { loc: '/ea/info', priority: '0.8', changefreq: 'monthly' },
    { loc: '/cma/info', priority: '0.8', changefreq: 'monthly' },
    { loc: '/cia/info', priority: '0.8', changefreq: 'monthly' },
    { loc: '/cfp/info', priority: '0.8', changefreq: 'monthly' },
    { loc: '/cisa/info', priority: '0.8', changefreq: 'monthly' },
    { loc: '/about', priority: '0.7', changefreq: 'monthly' },
    { loc: '/faq', priority: '0.7', changefreq: 'monthly' },
    { loc: '/compare', priority: '0.8', changefreq: 'monthly' },
    { loc: '/pricing', priority: '0.8', changefreq: 'monthly' },
    { loc: '/pass-guarantee', priority: '0.6', changefreq: 'monthly' },
    { loc: '/blog', priority: '0.8', changefreq: 'weekly' },
    // Static blog articles
    { loc: '/blog/cpa-exam-study-schedule-2026', priority: '0.7', changefreq: 'monthly' },
    { loc: '/blog/ea-vs-cpa-which-certification', priority: '0.7', changefreq: 'monthly' },
    { loc: '/blog/how-to-pass-far-first-try', priority: '0.7', changefreq: 'monthly' },
    { loc: '/terms', priority: '0.3', changefreq: 'yearly' },
    { loc: '/privacy', priority: '0.3', changefreq: 'yearly' },
    { loc: '/help', priority: '0.4', changefreq: 'monthly' },
    { loc: '/login', priority: '0.5', changefreq: 'monthly' },
    { loc: '/signup', priority: '0.6', changefreq: 'monthly' },
  ];

  // Fetch published blog articles from Firestore
  try {
    const publishedSnapshot = await db.collection('growth_content')
      .where('status', '==', 'published')
      .get();

    const existingSlugs = new Set(staticRoutes.map(r => r.loc));

    for (const doc of publishedSnapshot.docs) {
      const data = doc.data();
      if (!data.slug) continue;
      const loc = `/blog/${data.slug}`;
      if (existingSlugs.has(loc)) continue;

      const pubDate = data.publishedAt?.toDate?.()
        ? data.publishedAt.toDate().toISOString().split('T')[0]
        : TODAY;

      staticRoutes.push({
        loc,
        priority: '0.7',
        changefreq: 'monthly',
        lastmod: pubDate,
      });
    }
  } catch (err) {
    console.error('[Sitemap] Error fetching published articles:', err);
  }

  // Generate XML
  const urls = staticRoutes.map(r => `  <url>
    <loc>${DOMAIN}${r.loc}</loc>
    <lastmod>${r.lastmod || TODAY}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  // Cache for 1 hour
  res.set('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  res.set('Content-Type', 'application/xml');
  res.status(200).send(xml);
});

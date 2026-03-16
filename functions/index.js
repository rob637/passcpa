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
// FUNCTION STATUS TRACKING
// Logs last run time and status to Firestore for admin dashboard visibility
// ============================================================================

/**
 * Update the status of a scheduled function in Firestore.
 * Called at the end of each function run to record success/failure.
 * @param {string} functionName - Name of the function
 * @param {string} status - 'success' | 'error' | 'skipped'
 * @param {object} details - Additional details (optional)
 */
async function updateFunctionStatus(functionName, status, details = {}) {
  try {
    await db.collection('system_status').doc(functionName).set({
      functionName,
      status,
      lastRun: admin.firestore.FieldValue.serverTimestamp(),
      details,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
  } catch (err) {
    // Non-critical - don't fail the function if status update fails
    console.warn(`[StatusTracker] Failed to update status for ${functionName}:`, err.message);
  }
}

// ============================================================================
// COMMUNICATION TEMPLATE SYSTEM
// Centralized email/notification templates stored in Firestore
// ============================================================================

/**
 * Get a communication template from Firestore.
 * Falls back to default template if not found.
 * @param {string} templateId - Template ID (e.g., 'welcome', 'trial-expired')
 * @returns {Promise<{subject: string, body: string, enabled: boolean}>}
 */
async function getTemplate(templateId) {
  try {
    const templateDoc = await db.collection('communication_templates').doc(templateId).get();
    if (templateDoc.exists) {
      const data = templateDoc.data();
      return {
        id: templateId,
        subject: data.subject || '',
        body: data.body || '',
        enabled: data.enabled !== false, // Default to enabled
      };
    }
  } catch (err) {
    console.warn(`[Templates] Failed to fetch template ${templateId}:`, err.message);
  }
  // Return null to signal caller should use hardcoded fallback
  return null;
}

/**
 * Replace template variables with actual values.
 * Variables use {{variableName}} syntax.
 * @param {string} template - Template string with {{variables}}
 * @param {object} variables - Key-value pairs for substitution
 * @returns {string} - Processed template
 */
function processTemplate(template, variables) {
  if (!template) return '';
  let result = template;
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
    result = result.replace(regex, value || '');
  }
  return result;
}

// Default templates - used when Firestore templates don't exist
const DEFAULT_TEMPLATES = {
  'welcome': {
    name: 'Welcome Email',
    type: 'email',
    category: 'user-facing',
    subject: 'Welcome to VoraPrep, {{displayName}}! 🎉',
    description: 'Sent immediately after user signup',
    variables: ['displayName', 'examName', 'courseSlug', 'appBaseUrl'],
    functionName: 'sendWelcomeEmail',
    enabled: true,
  },
  'waitlist': {
    name: 'Mailing List Confirmation',
    type: 'email',
    category: 'user-facing',
    subject: "You're on the VoraPrep mailing list! 🎯",
    description: 'Sent when joining mailing list',
    variables: ['email', 'appBaseUrl'],
    functionName: 'sendWaitlistConfirmation',
    enabled: true,
  },
  'weekly-report': {
    name: 'Weekly Progress Report',
    type: 'email',
    category: 'user-facing',
    subject: '📊 Your Weekly {{examName}} Study Report - {{reportDate}}',
    description: 'Sent every Sunday 9am ET',
    variables: ['displayName', 'examName', 'reportDate', 'weeklyStats', 'appBaseUrl'],
    functionName: 'sendWeeklyReports',
    enabled: true,
  },
  'trial-expired': {
    name: 'Trial Expired',
    type: 'email',
    category: 'user-facing',
    subject: 'Your VoraPrep trial has ended - upgrade to continue studying',
    description: 'Sent when 14-day trial ends',
    variables: ['displayName', 'examName', 'courseSlug', 'appBaseUrl'],
    functionName: 'checkTrialExpirations',
    enabled: true,
  },
  'trial-day-7': {
    name: 'Trial Day 7',
    type: 'email',
    category: 'user-facing',
    subject: "How's your {{examName}} prep going?",
    description: 'Mid-trial check-in',
    variables: ['displayName', 'examName', 'daysRemaining', 'totalQuestions', 'accuracy', 'appBaseUrl'],
    functionName: 'sendTrialReminderEmails',
    enabled: true,
  },
  'trial-day-10': {
    name: 'Trial Day 10',
    type: 'email',
    category: 'user-facing',
    subject: "Don't lose your {{examName}} study progress!",
    description: 'Urgency reminder',
    variables: ['displayName', 'examName', 'daysRemaining', 'totalQuestions', 'accuracy', 'appBaseUrl'],
    functionName: 'sendTrialReminderEmails',
    enabled: true,
  },
  'trial-day-13': {
    name: 'Trial Day 13',
    type: 'email',
    category: 'user-facing',
    subject: '⏰ Last day of your free trial - lock in founder pricing!',
    description: 'Final day before expiration',
    variables: ['displayName', 'examName', 'daysRemaining', 'totalQuestions', 'accuracy', 'appBaseUrl'],
    functionName: 'sendTrialReminderEmails',
    enabled: true,
  },
  'payment-failed': {
    name: 'Payment Failed',
    type: 'email',
    category: 'user-facing',
    subject: '⚠️ Payment Failed - Action Required',
    description: 'Sent when Stripe payment fails',
    variables: ['displayName', 'appBaseUrl'],
    functionName: 'stripeWebhook',
    enabled: true,
  },
  'daily-reminder': {
    name: 'Daily Study Reminder',
    type: 'push',
    category: 'user-facing',
    subject: '🎯 Time to study!',
    body: "Don't break your streak! A quick study session awaits.",
    description: 'Push notification at user-selected time',
    variables: ['displayName', 'earnedPoints'],
    functionName: 'sendDailyReminders',
    enabled: true,
  },
};

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

// Allowed origins for CORS and Stripe redirect URLs (prevents open redirect)
const ALLOWED_ORIGINS = [
  'https://voraprep.com',
  'https://www.voraprep.com',
  'https://voraprep-prod.web.app',
  'https://voraprep-prod.firebaseapp.com',
  'https://voraprep-staging.web.app',
  'https://voraprep-staging.firebaseapp.com',
  'https://passcpa-dev.web.app',
  'https://passcpa-dev.firebaseapp.com',
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
const FOUNDER_DEADLINE = new Date('2026-08-31T23:59:59Z');

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

// Generate RFC 8058 compliant List-Unsubscribe headers for marketing emails
// Required by Gmail/Yahoo for bulk senders (>5000 emails/day) since Feb 2024
function getMarketingEmailHeaders(userEmail) {
  const encodedEmail = encodeURIComponent(userEmail);
  return {
    'List-Unsubscribe': `<https://voraprep.com/unsubscribe?email=${encodedEmail}>, <mailto:unsubscribe@voraprep.com?subject=Unsubscribe%20${encodedEmail}>`,
    'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
  };
}

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
    await updateFunctionStatus('sendDailyReminders', 'success', { notificationsSent: notifications.length });
  } catch (error) {
    console.error('Error sending daily reminders:', error);
    await updateFunctionStatus('sendDailyReminders', 'error', { error: error.message });
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
      
      // Skip users who have unsubscribed from marketing emails
      if (userData.emailUnsubscribed) continue;
      
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
          headers: getMarketingEmailHeaders(userEmail),
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
      
      // Skip users who have unsubscribed from marketing emails
      if (userData.emailUnsubscribed) {
        skippedCount++;
        continue;
      }
      
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
          headers: getMarketingEmailHeaders(userEmail),
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

// ============================================================================
// DIAGNOSTIC QUIZ REMINDER EMAIL
// Runs daily at 11am - sends reminder to users who completed onboarding but skipped diagnostic
// ============================================================================

exports.sendDiagnosticReminders = onSchedule({
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
  
  console.log('Checking for users who skipped diagnostic quiz...');
  
  try {
    const now = new Date();
    const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // Find users who completed onboarding 2-7 days ago
    const usersSnapshot = await db.collection('users')
      .where('onboardingComplete', '==', true)
      .where('onboardingCompletedAt', '<=', fortyEightHoursAgo)
      .where('onboardingCompletedAt', '>=', sevenDaysAgo)
      .get();
    
    console.log(`Found ${usersSnapshot.size} users who completed onboarding 2-7 days ago`);
    
    let sentCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    
    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();
      
      // Skip users who have unsubscribed
      if (userData.emailUnsubscribed) {
        skippedCount++;
        continue;
      }
      
      // Skip if already sent this reminder (track with flag)
      if (userData.diagnosticReminderSent) {
        skippedCount++;
        continue;
      }
      
      try {
        // Check if user has any diagnostic results
        const diagnosticSnap = await db.collection('users')
          .doc(userDoc.id)
          .collection('diagnosticResults')
          .limit(1)
          .get();
        
        if (!diagnosticSnap.empty) {
          // User already took diagnostic - skip
          skippedCount++;
          continue;
        }
        
        // Check if user has any question history (they're actively studying)
        const questionHistorySnap = await db.collection('users')
          .doc(userDoc.id)
          .collection('questionHistory')
          .limit(1)
          .get();
        
        if (!questionHistorySnap.empty) {
          // User is actively practicing - skip (they don't need diagnostic)
          skippedCount++;
          continue;
        }
        
        // Check Firebase Auth for email verification
        const authUser = await admin.auth().getUser(userDoc.id);
        
        if (!authUser.emailVerified) {
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
        
        // Send diagnostic reminder email
        const { error } = await resend.emails.send({
          from: FROM_EMAIL,
          to: userEmail,
          subject: `📊 ${displayName}, take 5 minutes to discover your weak spots`,
          html: generateDiagnosticReminderEmail(displayName, courseConfig),
          headers: getMarketingEmailHeaders(userEmail),
        });
        
        if (error) throw new Error(error.message);
        
        // Mark that we sent this reminder
        await db.collection('users').doc(userDoc.id).update({
          diagnosticReminderSent: true,
          diagnosticReminderSentAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        
        console.log(`Sent diagnostic reminder to ${userEmail}`);
        sentCount++;
        
      } catch (authError) {
        console.error(`Error processing user ${userDoc.id}:`, authError.message);
        errorCount++;
      }
    }
    
    console.log(`Diagnostic reminders: ${sentCount} sent, ${skippedCount} skipped, ${errorCount} errors`);
    
  } catch (error) {
    console.error('Error sending diagnostic reminders:', error);
    throw error;
  }
});

// Diagnostic Reminder Email Template
function generateDiagnosticReminderEmail(displayName, courseConfig = getCourseConfig('cpa')) {
  const examName = courseConfig.name.replace(' Exam', '');
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Find Your Weak Spots</title>
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
        Hey ${displayName}! 🎯
      </h1>
      
      <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
        You haven't taken the <strong>diagnostic quiz</strong> yet — and that's the key to efficient studying!
      </p>
      
      <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 12px; padding: 20px; margin: 0 0 25px 0;">
        <h3 style="color: #0369a1; font-size: 18px; margin: 0 0 10px 0;">
          Why take the diagnostic?
        </h3>
        <ul style="color: #475569; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 18px;">
          <li><strong>5 minutes</strong> — just 15 questions</li>
          <li><strong>Discover weak areas</strong> you didn't know you had</li>
          <li><strong>Personalized plan</strong> based on your results</li>
          <li><strong>No guessing</strong> — study what matters</li>
        </ul>
      </div>
      
      <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
        Students who take the diagnostic pass at <strong>2× the rate</strong> of those who skip it. Don't study blind!
      </p>
      
      <!-- CTA Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="${APP_BASE_URL}/diagnostic" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 16px 40px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 16px;">
          Take 5-Minute Diagnostic →
        </a>
      </div>
      
      <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 25px 0 0 0; text-align: center;">
        Find your weak spots. Study smarter. Pass the ${examName}. 💪
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
// FIRST PRACTICE REMINDER EMAIL
// Runs daily at 2pm - sends reminder to users who took diagnostic but never practiced
// ============================================================================

exports.sendFirstPracticeReminders = onSchedule({
  schedule: 'every day 14:00',
  timeZone: 'America/New_York',
  memory: '256MiB',
  timeoutSeconds: 180,
  secrets: ['RESEND_API_KEY'],
}, async (event) => {
  if (!resend) {
    console.error('Email not configured (set RESEND_API_KEY)');
    return;
  }
  
  console.log('Checking for users who need first practice reminder...');
  
  try {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // Find users who completed onboarding 1-7 days ago
    const usersSnapshot = await db.collection('users')
      .where('onboardingComplete', '==', true)
      .where('onboardingCompletedAt', '<=', twentyFourHoursAgo)
      .where('onboardingCompletedAt', '>=', sevenDaysAgo)
      .get();
    
    console.log(`Found ${usersSnapshot.size} users completed onboarding 1-7 days ago`);
    
    let sentCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    
    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();
      
      // Skip users who have unsubscribed
      if (userData.emailUnsubscribed) {
        skippedCount++;
        continue;
      }
      
      // Skip if already sent this reminder
      if (userData.firstPracticeReminderSent) {
        skippedCount++;
        continue;
      }
      
      try {
        // Check if user has any question history
        const questionHistorySnap = await db.collection('users')
          .doc(userDoc.id)
          .collection('questionHistory')
          .limit(1)
          .get();
        
        if (!questionHistorySnap.empty) {
          // User already started practicing - skip
          skippedCount++;
          continue;
        }
        
        // Check Firebase Auth for email verification
        const authUser = await admin.auth().getUser(userDoc.id);
        
        if (!authUser.emailVerified) {
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
        
        // Send first practice reminder email
        const { error } = await resend.emails.send({
          from: FROM_EMAIL,
          to: userEmail,
          subject: `⚡ ${displayName}, your first 10 questions are waiting`,
          html: generateFirstPracticeReminderEmail(displayName, courseConfig),
          headers: getMarketingEmailHeaders(userEmail),
        });
        
        if (error) throw new Error(error.message);
        
        // Mark that we sent this reminder
        await db.collection('users').doc(userDoc.id).update({
          firstPracticeReminderSent: true,
          firstPracticeReminderSentAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        
        console.log(`Sent first practice reminder to ${userEmail}`);
        sentCount++;
        
      } catch (authError) {
        console.error(`Error processing user ${userDoc.id}:`, authError.message);
        errorCount++;
      }
    }
    
    console.log(`First practice reminders: ${sentCount} sent, ${skippedCount} skipped, ${errorCount} errors`);
    
  } catch (error) {
    console.error('Error sending first practice reminders:', error);
    throw error;
  }
});

// First Practice Reminder Email Template
function generateFirstPracticeReminderEmail(displayName, courseConfig = getCourseConfig('cpa')) {
  const examName = courseConfig.name.replace(' Exam', '');
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Start Practicing Today</title>
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
        Hey ${displayName}! ⚡
      </h1>
      
      <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
        You set up your study plan, but you haven't answered any practice questions yet!
      </p>
      
      <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 20px; margin: 0 0 25px 0; text-align: center;">
        <p style="color: #92400e; font-size: 28px; font-weight: 700; margin: 0;">
          10 questions = 5 minutes
        </p>
        <p style="color: #b45309; font-size: 14px; margin: 10px 0 0 0;">
          That's all it takes to build momentum
        </p>
      </div>
      
      <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
        The <strong>${examName}</strong> has thousands of concepts to master. The key to passing? <strong>Daily practice</strong> — even just 10 questions a day compounds over time.
      </p>
      
      <ul style="color: #475569; font-size: 15px; line-height: 1.8; margin: 0 0 25px 0; padding-left: 20px;">
        <li>✅ Each session adapts to your weak areas</li>
        <li>✅ Instant AI explanations when you're stuck</li>
        <li>✅ Build a study streak for motivation</li>
      </ul>
      
      <!-- CTA Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="${APP_BASE_URL}/practice" style="display: inline-block; background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 16px 40px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 16px;">
          Start My First 10 Questions →
        </a>
      </div>
      
      <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 25px 0 0 0; text-align: center;">
        Your future self will thank you! 🙌
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
                headers: getMarketingEmailHeaders(userEmail),
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
        Questions? Email us at <a href="mailto:support@voraprep.com" style="color: #3b82f6;">support@voraprep.com</a>
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
          
          // Skip users who have unsubscribed from marketing emails
          if (userData?.emailUnsubscribed) {
            console.log(`Skipping ${userId}: User has unsubscribed from emails`);
            continue;
          }
          
          const authUser = await admin.auth().getUser(userId);
          const userEmail = authUser.email;
          const displayName = userData?.displayName || authUser.displayName || 'there';
          const courseConfig = getCourseConfig(userData?.activeCourse);
          const examName = courseConfig.name.replace(' Exam', '');
          
          if (!userEmail) continue;
          
          // Fetch user's actual progress stats for personalized emails
          const userStats = await getTrialUserStats(userId);
          
          // Generate subject with exam name
          const subject = reminder.subject.replace('{examName}', examName);
          
          // Send the email with stats
          const { error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: userEmail,
            subject: subject,
            html: generateTrialReminderEmail(displayName, courseConfig, reminder.template, reminder.day, userStats),
            headers: getMarketingEmailHeaders(userEmail),
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

// Get user's trial progress stats for personalized emails
async function getTrialUserStats(userId) {
  try {
    const logsRef = db.collection('users').doc(userId).collection('daily_log');
    const logsSnapshot = await logsRef.orderBy('__name__', 'desc').limit(14).get();
    
    let totalQuestions = 0;
    let correctQuestions = 0;
    let daysActive = 0;
    let totalMinutes = 0;
    
    logsSnapshot.forEach(doc => {
      const data = doc.data();
      totalQuestions += data.questionsAttempted || 0;
      correctQuestions += data.questionsCorrect || 0;
      totalMinutes += data.studyTimeMinutes || 0;
      if ((data.questionsAttempted || 0) > 0) daysActive++;
    });
    
    // Also try to get predicted score if available
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data() || {};
    const predictedScore = userData.predictedScore || null;
    
    return {
      totalQuestions,
      accuracy: totalQuestions > 0 ? Math.round((correctQuestions / totalQuestions) * 100) : 0,
      daysActive,
      totalMinutes,
      predictedScore,
    };
  } catch (error) {
    console.error('Error getting trial user stats:', error);
    return { totalQuestions: 0, accuracy: 0, daysActive: 0, totalMinutes: 0, predictedScore: null };
  }
}

// Trial Reminder Email Templates
function generateTrialReminderEmail(displayName, courseConfig, template, dayNum, userStats = null) {
  const examName = courseConfig.name.replace(' Exam', '');
  const courseSlug = courseConfig.slug || 'cpa';
  const daysRemaining = 14 - dayNum;
  const stats = userStats || { totalQuestions: 0, accuracy: 0, daysActive: 0, totalMinutes: 0, predictedScore: null };
  
  // Build stats box HTML if user has activity
  let statsBox = '';
  if (stats.totalQuestions > 0) {
    statsBox = `
      <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0;">
        <p style="color: #334155; font-size: 14px; font-weight: 600; margin: 0 0 15px 0;">📊 Your progress so far:</p>
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="text-align: center;">
          <tr>
            <td style="padding: 10px;">
              <div style="font-size: 24px; font-weight: bold; color: #3b82f6;">${stats.totalQuestions}</div>
              <div style="color: #64748b; font-size: 12px;">Questions</div>
            </td>
            <td style="padding: 10px;">
              <div style="font-size: 24px; font-weight: bold; color: #10b981;">${stats.accuracy}%</div>
              <div style="color: #64748b; font-size: 12px;">Accuracy</div>
            </td>
            <td style="padding: 10px;">
              <div style="font-size: 24px; font-weight: bold; color: #8b5cf6;">${stats.daysActive}</div>
              <div style="color: #64748b; font-size: 12px;">Days Active</div>
            </td>
            ${stats.predictedScore ? `
            <td style="padding: 10px;">
              <div style="font-size: 24px; font-weight: bold; color: #f59e0b;">${stats.predictedScore}</div>
              <div style="color: #64748b; font-size: 12px;">Est. Score</div>
            </td>
            ` : ''}
          </tr>
        </table>
        <p style="color: #64748b; font-size: 12px; margin: 15px 0 0 0; text-align: center;">
          ${stats.totalQuestions >= 100 ? "🔥 You're on fire! Keep this momentum going." : 
            stats.totalQuestions >= 50 ? "👏 Solid progress! A little more daily practice and you'll be exam-ready." : 
            "💪 Good start! Increase to 20+ questions/day for best results."}
        </p>
      </div>
    `;
  }
  
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
      
      ${statsBox}
      
      ${message}
      
      ${urgencyBox}
      
      <!-- CTA Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="${APP_BASE_URL}/${courseSlug}" style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 16px 40px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 16px;">
          Continue Studying →
        </a>
      </div>
      
      <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 25px 0 0 0; text-align: center;">
        Questions? Email us at <a href="mailto:support@voraprep.com" style="color: #3b82f6;">support@voraprep.com</a> — we're here to help!
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
// WELCOME DRIP EMAIL SEQUENCE
// Scheduled function that sends follow-up emails to new users
// Day 1: First practice tip | Day 3: Study plan intro | Day 5: AI Tutor | Day 7: Progress check
// ============================================================================

exports.sendWelcomeDripEmails = onSchedule({
  schedule: 'every day 10:00',
  timeZone: 'America/New_York',
  memory: '256MiB',
  timeoutSeconds: 300,
  secrets: ['RESEND_API_KEY'],
}, async (event) => {
  if (!resend) {
    console.error('Email not configured (set RESEND_API_KEY)');
    return;
  }
  
  console.log('Sending welcome drip emails...');
  
  try {
    const now = new Date();
    
    // Drip schedule: Day 1, 3, 5, 7 (Day 0 is the instant welcome email)
    const dripDays = [
      { day: 1, template: 'first_practice', subject: '🎯 5-minute study hack for {examName} success' },
      // { day: 3, template: 'study_plan', subject: '📅 Your personalized {examName} study plan is ready' }, // DISABLED - content needs improvement
      { day: 5, template: 'ai_tutor', subject: '🤖 Meet your AI tutor — instant help for tough questions' },
      { day: 7, template: 'progress_check', subject: "📊 Here's how your first week went" },
    ];
    
    let totalSent = 0;
    
    for (const drip of dripDays) {
      // Find users who signed up exactly X days ago
      const targetDate = new Date(now);
      targetDate.setDate(targetDate.getDate() - drip.day);
      const startOfDay = new Date(targetDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(targetDate);
      endOfDay.setHours(23, 59, 59, 999);
      
      console.log(`Checking Day ${drip.day} drip (users created between ${startOfDay.toISOString()} and ${endOfDay.toISOString()})`);
      
      // Query users created on target date who haven't received this drip
      const usersSnapshot = await db.collection('users')
        .where('createdAt', '>=', admin.firestore.Timestamp.fromDate(startOfDay))
        .where('createdAt', '<=', admin.firestore.Timestamp.fromDate(endOfDay))
        .get();
      
      console.log(`Found ${usersSnapshot.size} users from Day ${drip.day}`);
      
      for (const userDoc of usersSnapshot.docs) {
        const userId = userDoc.id;
        const userData = userDoc.data();
        
        // Skip users who have unsubscribed from marketing emails
        if (userData.emailUnsubscribed) {
          continue;
        }
        
        // Check if this drip was already sent
        const dripKey = `welcomeDrip_day${drip.day}`;
        if (userData[dripKey]) {
          continue; // Already sent
        }
        
        const userEmail = userData.email;
        if (!userEmail) continue;
        
        const displayName = userData.displayName || 'there';
        const courseConfig = getCourseConfig(userData.activeCourse);
        const examName = courseConfig.name.replace(' Exam', '');
        
        try {
          // Get basic stats for progress check email
          let userStats = null;
          if (drip.template === 'progress_check') {
            userStats = await getWelcomeDripStats(userId);
          }
          
          const subject = drip.subject.replace('{examName}', examName);
          
          const { error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: userEmail,
            subject: subject,
            html: generateWelcomeDripEmail(displayName, courseConfig, drip.template, userStats),
            headers: getMarketingEmailHeaders(userEmail),
          });
          
          if (error) {
            console.error(`Error sending Day ${drip.day} drip to ${userEmail}:`, error);
          } else {
            console.log(`Sent Day ${drip.day} drip to ${userEmail}`);
            totalSent++;
            
            // Mark this drip as sent
            await db.collection('users').doc(userId).update({
              [dripKey]: admin.firestore.FieldValue.serverTimestamp(),
            });
          }
        } catch (userError) {
          console.error(`Error processing Day ${drip.day} drip for ${userId}:`, userError.message);
        }
      }
    }
    
    console.log(`Welcome drip emails complete: ${totalSent} total sent`);
    
  } catch (error) {
    console.error('Error sending welcome drip emails:', error);
    throw error;
  }
});

// Get basic stats for welcome drip Day 7 progress email
async function getWelcomeDripStats(userId) {
  try {
    const logsRef = db.collection('users').doc(userId).collection('daily_log');
    const logsSnapshot = await logsRef.orderBy('__name__', 'desc').limit(7).get();
    
    let totalQuestions = 0;
    let correctQuestions = 0;
    let daysActive = 0;
    
    logsSnapshot.forEach(doc => {
      const data = doc.data();
      totalQuestions += data.questionsAttempted || 0;
      correctQuestions += data.questionsCorrect || 0;
      if ((data.questionsAttempted || 0) > 0) daysActive++;
    });
    
    return {
      totalQuestions,
      accuracy: totalQuestions > 0 ? Math.round((correctQuestions / totalQuestions) * 100) : 0,
      daysActive,
    };
  } catch (error) {
    console.error('Error getting welcome drip stats:', error);
    return { totalQuestions: 0, accuracy: 0, daysActive: 0 };
  }
}

// Generate welcome drip email HTML
function generateWelcomeDripEmail(displayName, courseConfig, template, userStats = null) {
  const examName = courseConfig.name.replace(' Exam', '');
  const courseSlug = courseConfig.slug || 'cpa';
  
  let headline, content, ctaText, ctaUrl;
  
  if (template === 'first_practice') {
    // Day 1: First practice tip
    headline = `Ready for your first ${examName} question?`;
    ctaText = 'Start a Quick Quiz →';
    ctaUrl = `${APP_BASE_URL}/${courseSlug}/practice`;
    content = `
      <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
        Here's a study hack that top scorers use:
      </p>
      
      <div style="background: #f0f9ff; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #3b82f6;">
        <p style="color: #1e40af; font-size: 18px; margin: 0; font-weight: 600;">
          🎯 The "5-5-5" Method
        </p>
        <p style="color: #334155; font-size: 15px; margin: 12px 0 0 0; line-height: 1.6;">
          Answer <strong>5 questions</strong> every day for just <strong>5 minutes</strong>. 
          This builds momentum and keeps concepts fresh. Research shows spaced practice 
          beats marathon sessions every time.
        </p>
      </div>
      
      <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 20px 0;">
        Start small. Build the habit. Watch your score climb.
      </p>
    `;
  } else if (template === 'study_plan') {
    // Day 3: Study plan intro
    headline = `Your ${examName} study plan is ready`;
    ctaText = 'View My Study Plan →';
    ctaUrl = `${APP_BASE_URL}/${courseSlug}/study-plan`;
    content = `
      <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
        Most ${examName} candidates fail because they study without a plan. Don't be one of them.
      </p>
      
      <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
        Your personalized study plan includes:
      </p>
      
      <ul style="color: #475569; font-size: 16px; line-height: 1.8; margin: 0 0 25px 0; padding-left: 20px;">
        <li>📅 <strong>Daily targets</strong> tailored to your exam date</li>
        <li>📊 <strong>Topic priorities</strong> based on blueprint weights</li>
        <li>🎯 <strong>Weak area focus</strong> from your practice results</li>
        <li>⏰ <strong>Catch-up mode</strong> if you fall behind</li>
      </ul>
      
      <div style="background: #ecfdf5; border-radius: 12px; padding: 20px; margin: 20px 0;">
        <p style="color: #065f46; font-size: 14px; margin: 0;">
          💡 <strong>Pro tip:</strong> Set your exam date in settings to get a countdown and pacing recommendations.
        </p>
      </div>
    `;
  } else if (template === 'ai_tutor') {
    // Day 5: AI Tutor feature highlight
    headline = `Stuck on a question? Ask the AI Tutor`;
    ctaText = 'Try AI Tutor Now →';
    ctaUrl = `${APP_BASE_URL}/${courseSlug}/ai-tutor`;
    content = `
      <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
        Meet your study partner: an AI tutor that explains ${examName} concepts in plain English.
      </p>
      
      <div style="background: linear-gradient(135deg, #f3e8ff 0%, #ede9fe 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">
        <p style="color: #5b21b6; font-size: 16px; margin: 0; font-weight: 600;">
          🤖 What the AI Tutor can do:
        </p>
        <ul style="color: #6b21a8; font-size: 15px; line-height: 1.8; margin: 12px 0 0 0; padding-left: 20px;">
          <li>Explain why an answer is correct (or wrong)</li>
          <li>Break down complex topics step-by-step</li>
          <li>Create memory tricks and mnemonics</li>
          <li>Quiz you on specific concepts</li>
        </ul>
      </div>
      
      <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 20px 0;">
        It's like having a private tutor available 24/7 — no appointment needed.
      </p>
    `;
  } else {
    // Day 7: Progress check with stats
    const stats = userStats || { totalQuestions: 0, accuracy: 0, daysActive: 0 };
    headline = `Your first week: ${stats.totalQuestions} questions down! 🎉`;
    ctaText = 'Keep Practicing →';
    ctaUrl = `${APP_BASE_URL}/${courseSlug}/practice`;
    
    // Different messaging based on activity level
    let activityMsg;
    if (stats.totalQuestions >= 50) {
      activityMsg = `Amazing work! You're in the top tier of new users. Keep this momentum going!`;
    } else if (stats.totalQuestions >= 20) {
      activityMsg = `Great start! You're building solid study habits. Time to kick it up a notch?`;
    } else if (stats.totalQuestions > 0) {
      activityMsg = `You've taken the first steps. Even a few questions a day adds up over time.`;
    } else {
      activityMsg = `Let's get started! Your first practice session is just a click away.`;
    }
    
    content = `
      <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
        Here's your first week at a glance:
      </p>
      
      <div style="display: flex; justify-content: space-around; margin: 25px 0; text-align: center;">
        <div style="flex: 1; padding: 15px;">
          <div style="font-size: 36px; font-weight: bold; color: #3b82f6;">${stats.totalQuestions}</div>
          <div style="color: #64748b; font-size: 14px;">Questions</div>
        </div>
        <div style="flex: 1; padding: 15px; border-left: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0;">
          <div style="font-size: 36px; font-weight: bold; color: #10b981;">${stats.accuracy}%</div>
          <div style="color: #64748b; font-size: 14px;">Accuracy</div>
        </div>
        <div style="flex: 1; padding: 15px;">
          <div style="font-size: 36px; font-weight: bold; color: #8b5cf6;">${stats.daysActive}</div>
          <div style="color: #64748b; font-size: 14px;">Days Active</div>
        </div>
      </div>
      
      <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0;">
        <p style="color: #334155; font-size: 16px; margin: 0;">
          ${activityMsg}
        </p>
      </div>
      
      <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 20px 0;">
        Remember: The ${examName} passing rate is only ~45%. Consistent daily practice is your edge.
      </p>
    `;
  }
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
      
      ${content}
      
      <!-- CTA Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="${ctaUrl}" style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 16px 40px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 16px;">
          ${ctaText}
        </a>
      </div>
      
    </div>
    
    <!-- Footer -->
    <div style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 30px; padding: 20px;">
      <p style="margin: 0;">
        VoraPrep - ${courseConfig.tagline}
      </p>
      <p style="font-size: 11px; margin-top: 10px;">
        <a href="${APP_BASE_URL}/settings" style="color: #94a3b8;">Manage email preferences</a>
      </p>
    </div>
    
  </div>
  
</body>
</html>
  `;
}

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
      subject: "You're on the VoraPrep mailing list! 🎯",
      html: generateWaitlistEmail(email),
    });
    
    if (error) throw new Error(error.message);
    console.log(`Mailing list confirmation sent to ${email}`);

    // Notify Admin
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `📧 New Mailing List Signup: ${email}`,
      html: `<p><strong>${email}</strong> just signed up for the VoraPrep mailing list.</p>`,
    });

  } catch (error) {
    console.error('Error sending waitlist email:', error);
  }
});

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Retry an async operation with exponential backoff
 * @param {Function} operation - Async function to retry
 * @param {number} maxAttempts - Maximum number of attempts (default: 3)
 * @param {number} baseDelay - Base delay in ms (default: 1000)
 * @returns {Promise} - Result of the operation
 */
async function withRetry(operation, maxAttempts = 3, baseDelay = 1000) {
  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      // Don't retry on non-transient errors (validation, auth, etc.)
      const isTransient = error.code === 'UNAVAILABLE' || error.code === 'DEADLINE_EXCEEDED' || 
                          error.code === 'RESOURCE_EXHAUSTED' || error.code === 'ECONNRESET' ||
                          error.message?.includes('ETIMEDOUT');
      if (!isTransient || attempt === maxAttempts) {
        throw error;
      }
      const delay = baseDelay * Math.pow(2, attempt - 1); // Exponential backoff
      console.log(`Retry attempt ${attempt}/${maxAttempts} after ${delay}ms: ${error.message}`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw lastError;
}

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
    <p>Questions? Email us at <a href="mailto:support@voraprep.com" style="color: #64748b;">support@voraprep.com</a> or visit our <a href="${APP_BASE_URL}" style="color: #64748b;">website</a></p>
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
  <title>You're on the VoraPrep mailing list!</title>
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
        Thanks for joining VoraPrep. We'll keep you updated on exam tips, new features, and special offers!
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
    
    <h2 style="color: #1e293b; font-size: 18px; margin: 30px 0 15px;">What you'll get with VoraPrep:</h2>
    
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
    
    <div style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 20px; border-radius: 12px; margin: 25px 0;">
      <div style="font-weight: 600; color: #1d4ed8; margin-bottom: 5px;">🎯 Ready to start?</div>
      <div style="color: #1e40af; font-size: 14px;">
        Create your free account today and get full access for 14 days. No credit card required.
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

    // Idempotency: Check for recent pending checkout to prevent double-submissions
    // Generate a unique key based on user+course+interval (valid for ~5 minutes)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const pendingCheckouts = await stripeClient.checkout.sessions.list({
      customer: stripeCustomerId,
      status: 'open',
      limit: 5,
      created: { gte: Math.floor(fiveMinutesAgo.getTime() / 1000) },
    });
    
    // Check if there's already an open checkout for the same course
    const existingSession = pendingCheckouts.data.find(s => 
      s.metadata?.courseId === courseId && s.status === 'open'
    );
    
    if (existingSession) {
      console.log(`Returning existing checkout session ${existingSession.id} for user ${userId}`);
      return {
        sessionId: existingSession.id,
        url: existingSession.url,
        reused: true,
      };
    }

    // Create checkout session with idempotency key
    const idempotencyKey = `checkout_${userId}_${courseId}_${interval}_${Math.floor(Date.now() / 60000)}`; // Changes every minute
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
      cancel_url: `${baseUrl}/${courseId}#pricing`,
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
    }, {
      idempotencyKey: idempotencyKey,
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
    // Idempotency check: skip if we've already COMPLETED this event
    const eventRef = db.collection('processed_stripe_events').doc(event.id);
    const existing = await eventRef.get();
    
    if (existing.exists) {
      const data = existing.data();
      // Only skip if fully completed (not just in-progress)
      if (data.status === 'completed') {
        console.log(`Skipping already-completed Stripe event: ${event.id} (${event.type})`);
        res.status(200).json({ received: true, duplicate: true });
        return;
      }
      // If stuck in 'processing' for >5 minutes, allow retry (handler probably crashed)
      const processingAt = data.processingAt?.toDate?.() || new Date(0);
      const minutesAgo = (Date.now() - processingAt.getTime()) / 60000;
      if (data.status === 'processing' && minutesAgo < 5) {
        console.log(`Skipping in-progress Stripe event: ${event.id} (started ${minutesAgo.toFixed(1)} min ago)`);
        res.status(200).json({ received: true, inProgress: true });
        return;
      }
    }

    // Mark event as processing (before handling)
    await eventRef.set({
      eventType: event.type,
      status: 'processing',
      processingAt: admin.firestore.FieldValue.serverTimestamp(),
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

    // Mark as completed AFTER successful handling
    await eventRef.update({
      status: 'completed',
      completedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    console.error('Event details:', JSON.stringify({ eventId: event.id, eventType: event.type, livemode: event.livemode }));
    
    // Mark as failed so retry is allowed
    try {
      const eventRef = db.collection('processed_stripe_events').doc(event.id);
      await eventRef.update({
        status: 'failed',
        failedAt: admin.firestore.FieldValue.serverTimestamp(),
        errorMessage: error.message,
      });
    } catch (updateErr) {
      console.error('Failed to update event status:', updateErr);
    }
    
    // Log failure for monitoring and potential manual retry
    try {
      await db.collection('stripe_webhook_failures').add({
        eventId: event.id,
        eventType: event.type,
        errorMessage: error.message,
        errorStack: error.stack,
        livemode: event.livemode,
        failedAt: admin.firestore.FieldValue.serverTimestamp(),
        rawEvent: JSON.stringify(event).substring(0, 5000), // Truncate large events
      });
      
      // Alert admin via email for critical events (payment failures, subscription issues)
      const criticalEvents = ['checkout.session.completed', 'customer.subscription.created', 'customer.subscription.updated', 'invoice.payment_failed'];
      if (criticalEvents.includes(event.type) && resend) {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: 'rob@voraprep.com',
          subject: `⚠️ Stripe Webhook Failure: ${event.type}`,
          html: `<h2>Stripe Webhook Processing Failed</h2>
<p><strong>Event ID:</strong> ${event.id}</p>
<p><strong>Event Type:</strong> ${event.type}</p>
<p><strong>Error:</strong> ${error.message}</p>
<p><strong>Livemode:</strong> ${event.livemode ? 'PRODUCTION' : 'Test'}</p>
<p><strong>Time:</strong> ${new Date().toISOString()}</p>
<p>Check Firebase Functions logs and the <code>stripe_webhook_failures</code> collection for details.</p>`,
        });
      }
    } catch (logError) {
      console.error('Failed to log webhook failure:', logError);
    }
    
    // Return 500 so Stripe retries the webhook (up to ~3 days with exponential backoff)
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

  // Use withRetry for Firestore operations to handle transient failures
  // Merge: preserves other exam subscriptions and trials
  await withRetry(async () => {
    await db.collection('subscriptions').doc(userId).set({
      ...subscriptionData,
    }, { merge: true });
  });

  // Write to paidExams map using update() which handles dot-notation as nested paths
  await withRetry(async () => {
    await db.collection('subscriptions').doc(userId).update({
      [`paidExams.${examId}`]: paidExamData,
    });
  });

  // Update tier on root level for legacy compat
  if (status === 'active' || status === 'trialing') {
    await withRetry(async () => {
      await db.collection('subscriptions').doc(userId).update({
        tier: tier,
      });
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
        If you have any questions, email us at <a href="mailto:support@voraprep.com" style="color: #3b82f6;">support@voraprep.com</a> and we'll help you out.
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
  cors: true,  // Allow all origins - function is protected by auth check
  enforceAppCheck: false,
  secrets: ['GEMINI_API_KEY'],
  invoker: 'public',  // Allow unauthenticated Cloud Run access (Firebase auth checked in function)
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
 * Helper: Get Google Ads OAuth access token.
 */
async function getGoogleAdsAccessToken() {
  const clientId = process.env.GOOGLE_ADS_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET?.trim();
  const refreshToken = process.env.GOOGLE_ADS_REFRESH_TOKEN?.trim();

  if (!clientId || !clientSecret || !refreshToken) {
    throw new HttpsError('failed-precondition', 'Google Ads OAuth credentials not configured.');
  }

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });

  if (!response.ok) {
    console.error('Failed to refresh Google Ads access token:', await response.text());
    throw new HttpsError('internal', 'Failed to authenticate with Google Ads.');
  }

  const data = await response.json();
  return data.access_token;
}

/**
 * Helper: Make a Google Ads API request.
 */
async function googleAdsRequest(endpoint, body) {
  const accessToken = await getGoogleAdsAccessToken();
  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN?.trim();
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID?.trim()?.replace(/-/g, '');

  if (!developerToken || !customerId) {
    throw new HttpsError('failed-precondition', 'Google Ads developer token or customer ID not configured.');
  }

  const mccId = process.env.GOOGLE_ADS_MCC_ID?.trim()?.replace(/-/g, '') || '';
  const url = `https://googleads.googleapis.com/v20/customers/${customerId}/${endpoint}`;

  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'developer-token': developerToken,
    'Content-Type': 'application/json',
  };

  // If using an MCC, add the login-customer-id header
  if (mccId) {
    headers['login-customer-id'] = mccId;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorDetails = errorData?.error?.details?.[0]?.errors?.[0];
    const errorMsg = errorDetails?.message || errorData?.error?.message || `HTTP ${response.status}`;
    const errorCode = errorDetails?.errorCode ? JSON.stringify(errorDetails.errorCode) : '';
    console.error('Google Ads API error:', JSON.stringify(errorData));
    throw new HttpsError('internal', `Google Ads API error: ${errorMsg} ${errorCode}`.trim());
  }

  return response.json();
}

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
      // OPTIMIZED: Batch operations to reduce API calls by ~90%
      // ================================================================
      const campaignResourceName = existing?.googleAdsCampaignId ||
        (await db.collection('growth_campaigns').doc(campaign.id).get()).data()?.googleAdsCampaignId;

      if (campaignResourceName && campaign.adGroups?.length) {
        // Map to track ad group name -> resource name
        const adGroupResourceMap = {};

        // --- PHASE 1: Batch create ALL ad groups at once ---
        const adGroupOps = campaign.adGroups.map(ag => ({
          create: {
            name: ag.name,
            campaign: campaignResourceName,
            status: 'ENABLED',
            type: 'SEARCH_STANDARD',
            cpc_bid_micros: ((ag.maxCpc || 1.5) * 1_000_000).toString(),
          },
        }));

        try {
          const adGroupResponse = await googleAdsRequest('adGroups:mutate', {
            operations: adGroupOps,
            partialFailure: true, // Allow some to fail (e.g., duplicates)
          });

          // Map results back to ad group names
          if (adGroupResponse?.results) {
            adGroupResponse.results.forEach((result, idx) => {
              if (result?.resourceName) {
                adGroupResourceMap[campaign.adGroups[idx].name] = result.resourceName;
              }
            });
          }
          console.log(`[GrowthSync]   Created ${Object.keys(adGroupResourceMap).length}/${adGroupOps.length} ad groups in batch`);
        } catch (batchErr) {
          // If batch fails, try to find existing ad groups
          console.log(`[GrowthSync]   Batch ad group create failed, finding existing...`);
          try {
            const searchResp = await googleAdsRequest('googleAds:searchStream', {
              query: `SELECT ad_group.name, ad_group.resource_name FROM ad_group WHERE campaign.resource_name = '${campaignResourceName}' AND ad_group.status != 'REMOVED'`
            });
            if (searchResp?.[0]?.results) {
              searchResp[0].results.forEach(r => {
                if (r.adGroup?.name && r.adGroup?.resourceName) {
                  adGroupResourceMap[r.adGroup.name] = r.adGroup.resourceName;
                }
              });
            }
            console.log(`[GrowthSync]   Found ${Object.keys(adGroupResourceMap).length} existing ad groups`);
          } catch (searchErr) {
            errors.push({ campaign: campaign.name, error: `Ad group batch failed: ${batchErr.message}` });
          }
        }

        // --- PHASE 2: Batch create ALL keywords across all ad groups ---
        const allKeywordOps = [];
        for (const adGroup of campaign.adGroups) {
          const adGroupResource = adGroupResourceMap[adGroup.name];
          if (!adGroupResource || !adGroup.keywords?.length) continue;

          for (const k of adGroup.keywords) {
            if (!k.keyword || k.status === 'removed') continue;

            // Sanitize keyword text
            const kwText = k.keyword
              .replace(/["\[\]]/g, '')
              .replace(/[^a-zA-Z0-9\s\-'.]/g, '')
              .replace(/\s+/g, ' ')
              .trim();
            if (!kwText) continue;

            allKeywordOps.push({
              create: {
                ad_group: adGroupResource,
                keyword: {
                  text: kwText,
                  match_type: (k.matchType || 'broad').toUpperCase(),
                },
                status: 'ENABLED',
                cpc_bid_micros: ((k.maxCpc || adGroup.maxCpc || 1.5) * 1_000_000).toString(),
              },
            });
          }
        }

        // Batch keywords in groups of 1000 (safe limit)
        if (allKeywordOps.length > 0) {
          for (let i = 0; i < allKeywordOps.length; i += 1000) {
            const batch = allKeywordOps.slice(i, i + 1000);
            try {
              await googleAdsRequest('adGroupCriteria:mutate', {
                operations: batch,
                partialFailure: true,
              });
            } catch (kwErr) {
              console.error(`[GrowthSync]   Keyword batch ${i}-${i + batch.length} failed:`, kwErr.message);
              errors.push({ campaign: campaign.name, error: `Keywords batch failed: ${kwErr.message}` });
            }
          }
          console.log(`[GrowthSync]   Created ${allKeywordOps.length} keywords in ${Math.ceil(allKeywordOps.length / 1000)} batch(es)`);
        }

        // --- PHASE 3: Batch create ALL negative keywords ---
        const allNegativeOps = [];
        for (const adGroup of campaign.adGroups) {
          const adGroupResource = adGroupResourceMap[adGroup.name];
          if (!adGroupResource || !adGroup.negativeKeywords?.length) continue;

          for (const nk of adGroup.negativeKeywords) {
            allNegativeOps.push({
              create: {
                ad_group: adGroupResource,
                keyword: { text: nk, match_type: 'BROAD' },
                negative: true,
                status: 'ENABLED',
              },
            });
          }
        }

        if (allNegativeOps.length > 0) {
          for (let i = 0; i < allNegativeOps.length; i += 1000) {
            const batch = allNegativeOps.slice(i, i + 1000);
            try {
              await googleAdsRequest('adGroupCriteria:mutate', {
                operations: batch,
                partialFailure: true,
              });
            } catch (negErr) {
              console.error(`[GrowthSync]   Negative keyword batch failed:`, negErr.message);
            }
          }
          console.log(`[GrowthSync]   Created ${allNegativeOps.length} negative keywords`);
        }

        // --- PHASE 4: Batch create ALL RSA ads ---
        const allAdOps = [];
        for (const adGroup of campaign.adGroups) {
          const adGroupResource = adGroupResourceMap[adGroup.name];
          if (!adGroupResource || !adGroup.ads?.length) continue;

          for (const ad of adGroup.ads) {
            const validHeadlines = (ad.headlines || []).filter(h => h && h.length > 0 && h.length <= 30).slice(0, 15);
            const validDescriptions = (ad.descriptions || []).filter(d => d && d.length > 0 && d.length <= 90).slice(0, 4);

            if (validHeadlines.length < 3 || validDescriptions.length < 2) {
              const msg = `Skipping RSA ${ad.id}: ${validHeadlines.length} valid headlines (need 3), ${validDescriptions.length} valid descriptions (need 2)`;
              console.warn(`[GrowthSync]   ${msg}`);
              errors.push({ campaign: campaign.name, error: msg });
              continue;
            }

            allAdOps.push({
              create: {
                ad_group: adGroupResource,
                status: 'ENABLED',
                ad: {
                  responsive_search_ad: {
                    headlines: validHeadlines.map(h => ({ text: h.substring(0, 30) })),
                    descriptions: validDescriptions.map(d => ({ text: d.substring(0, 90) })),
                    path1: ad.displayPath?.[0]?.substring(0, 15) || '',
                    path2: ad.displayPath?.[1]?.substring(0, 15) || '',
                  },
                  final_urls: [ad.finalUrl || `https://voraprep.com/${campaign.courseId}`],
                },
              },
            });
          }
        }

        if (allAdOps.length > 0) {
          // Batch ads in groups of 100 (RSAs are more complex)
          for (let i = 0; i < allAdOps.length; i += 100) {
            const batch = allAdOps.slice(i, i + 100);
            try {
              await googleAdsRequest('adGroupAds:mutate', {
                operations: batch,
                partialFailure: true,
              });
            } catch (adErr) {
              console.error(`[GrowthSync]   RSA batch failed:`, adErr.message);
              errors.push({ campaign: campaign.name, error: `RSA batch failed: ${adErr.message}` });
            }
          }
          console.log(`[GrowthSync]   Created ${allAdOps.length} RSA ads in ${Math.ceil(allAdOps.length / 100)} batch(es)`);
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

  // Load brief - try direct ID first, then fallback to slug search
  let briefDoc = await db.collection('growth_content').doc(briefId).get();
  let actualBriefId = briefId;
  
  if (!briefDoc.exists) {
    // Fallback: try to find by slug pattern derived from briefId
    // briefId format: courseId-templateId-section-year -> slug might be different
    console.log(`Brief ${briefId} not found by ID, searching in collection...`);
    
    // Try to match by title pattern or partial ID
    const allBriefs = await db.collection('growth_content')
      .where('status', '==', 'brief')
      .limit(500)
      .get();
    
    // Find a brief where the ID contains the key parts (courseId, section, year)
    const parts = briefId.split('-');
    const courseId = parts[0]; // e.g., 'cpa'
    const year = parts[parts.length - 1]; // e.g., '2026'
    
    const matchingDoc = allBriefs.docs.find(d => {
      const docId = d.id;
      const data = d.data();
      // Match if same course, year, and similar content
      return docId.startsWith(courseId) && 
             docId.endsWith(year) && 
             data.status === 'brief';
    });
    
    if (matchingDoc) {
      briefDoc = matchingDoc;
      actualBriefId = matchingDoc.id;
      console.log(`Found matching brief: ${actualBriefId}`);
    }
  }
  
  if (!briefDoc.exists) {
    throw new HttpsError('not-found', `Content brief not found: ${briefId}. Please run "Seed Briefs" first and then "Refresh" to load briefs from Firestore.`);
  }
  const brief = briefDoc.data();

  // Load config for guard rails
  const config = await getGrowthConfig();

  // NOTE: Weekly limit only applies to PUBLISHING, not generation
  // Generation and approval are unlimited - limit is enforced in growthAutoPublish

  // Build the prompt with rich exam data
  const examData = {
    cpa: {
      name: 'CPA (Certified Public Accountant)',
      fullName: 'Certified Public Accountant',
      sections: 'FAR, AUD, REG, and one discipline (BAR, ISC, or TCP)',
      passRate: '49-55%',
      studyHours: '300-400 hours total',
      avgSalary: '$75,000-$150,000',
      questionCount: '5,000+',
      officialBody: 'AICPA',
    },
    ea: {
      name: 'EA (Enrolled Agent)',
      fullName: 'Enrolled Agent',
      sections: 'SEE Part 1, 2, and 3',
      passRate: '60-70%',
      studyHours: '100-150 hours total',
      avgSalary: '$55,000-$100,000',
      questionCount: '3,000+',
      officialBody: 'IRS',
    },
    cma: {
      name: 'CMA (Certified Management Accountant)',
      fullName: 'Certified Management Accountant',
      sections: 'Part 1 and Part 2',
      passRate: '40-45%',
      studyHours: '150-170 hours per part',
      avgSalary: '$85,000-$140,000',
      questionCount: '2,500+',
      officialBody: 'IMA',
    },
    cia: {
      name: 'CIA (Certified Internal Auditor)',
      fullName: 'Certified Internal Auditor',
      sections: 'Part 1, 2, and 3',
      passRate: '40-45%',
      studyHours: '300-500 hours total',
      avgSalary: '$80,000-$130,000',
      questionCount: '2,000+',
      officialBody: 'IIA',
    },
    cisa: {
      name: 'CISA (Certified Information Systems Auditor)',
      fullName: 'Certified Information Systems Auditor',
      sections: '5 domains',
      passRate: '50-55%',
      studyHours: '150-200 hours',
      avgSalary: '$100,000-$160,000',
      questionCount: '2,500+',
      officialBody: 'ISACA',
    },
    cfp: {
      name: 'CFP (Certified Financial Planner)',
      fullName: 'Certified Financial Planner',
      sections: '8 principal knowledge areas',
      passRate: '60-65%',
      studyHours: '250-300 hours',
      avgSalary: '$90,000-$150,000',
      questionCount: '3,000+',
      officialBody: 'CFP Board',
    },
  };

  const exam = examData[brief.courseId] || examData.cpa;

  const systemPrompt = `You are an expert SEO content writer with deep expertise in ${exam.fullName} exam preparation.
You write for VoraPrep (voraprep.com), an AI-powered exam prep platform.

VORAPREP FACTS:
- ${exam.questionCount} practice questions with AI explanations
- Adaptive learning engine
- AI tutor (Vory) available 24/7
- $19/month or $149/year (7-day free trial)

${exam.name.split(' ')[0]} EXAM FACTS:
- Official body: ${exam.officialBody}
- Sections: ${exam.sections}
- Pass rate: ${exam.passRate}
- Study hours: ${exam.studyHours}
- Salary: ${exam.avgSalary}

CRITICAL RULES:
- Write genuinely helpful, comprehensive content
- Include specific facts from the data above
- Natural language — no keyword stuffing
- Start with "Meta Description: ..." (155 chars max), then a blank line
- DO NOT include a title or H1 heading — the title is stored separately and will be rendered by the app
- Start the body content directly with an introductory paragraph, then use H2/H3 headings for sections
- Target word count: ${brief.wordCountTarget || 2000} words
- Write in Markdown format

CTA PLACEMENT (CRITICAL - ALL CTAs MUST BE CLICKABLE LINKS):
- Every CTA MUST use markdown link format: [text](https://voraprep.com/path)
- NEVER write a CTA as plain text - it MUST be a clickable link
- Include a brief CTA within the first 250 words, e.g.: [Try VoraPrep's free ${exam.name.split(' ')[0]} practice questions](https://voraprep.com/${brief.courseId})
- Add 1-2 natural mid-article CTAs as links
- End with a STRONG closing CTA section:
  - Horizontal rule (---)
  - Bold header: **Ready to Pass Your ${exam.name.split(' ')[0]} Exam?**
  - 2-3 sentences about VoraPrep (free trial, AI tutor, adaptive learning)
  - Show the URL visibly: "Visit **voraprep.com** to get started"
  - MANDATORY clickable button-style link on its own line: [Start Your Free 7-Day Trial at voraprep.com →](https://voraprep.com/register)
- CTAs should feel helpful, not salesy
- Link targets: /register, /cpa, /ea, /cma, /cia, /cisa, /cfp`;

  const userPrompt = `Write a comprehensive article for:

TITLE: ${brief.title}
EXAM: ${exam.name}
${brief.section ? `SECTION: ${brief.section}` : ''}
CONTENT TYPE: ${brief.contentType}
TARGET KEYWORDS: ${(brief.targetKeywords || []).join(', ')}
TARGET WORD COUNT: ${brief.wordCountTarget || 2000}

OUTLINE:
${(brief.outline || []).map((s, i) => `## ${s.heading}\n~${s.wordCount} words\n${(s.keyPoints || []).map(kp => `• ${kp}`).join('\n')}`).join('\n\n')}

INTERNAL LINKS:
${(brief.internalLinks || []).map(l => `- https://voraprep.com${l}`).join('\n')}

Write the complete article. Start with "Meta Description: ..." then full Markdown.`;

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
    let generatedContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedContent) {
      throw new HttpsError('internal', 'No content generated.');
    }

    // Trim whitespace only - keep the H1 title in the content so it can be edited
    generatedContent = generatedContent.trim();

    // Save the generated draft
    const newStatus = config.contentReviewRequired ? 'review' : 'published';

    await db.collection('growth_content').doc(actualBriefId).update({
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

  // 4. Try to publish from approved queue first (pre-reviewed articles)
  const approvedSnapshot = await db.collection('growth_content')
    .where('status', '==', 'approved')
    .limit(50)
    .get();

  if (!approvedSnapshot.empty) {
    // Pick a random approved article to publish
    const approvedDocs = approvedSnapshot.docs;
    const randomIndex = Math.floor(Math.random() * approvedDocs.length);
    const docToPublish = approvedDocs[randomIndex];
    const articleData = docToPublish.data();

    // Publish it with distribution tracking
    const publishedAt = new Date();
    const articleUrl = `https://voraprep.com/blog/${articleData.slug}`;
    
    // Initialize distribution tracking
    const distribution = {
      blog: {
        status: 'published',
        publishedAt: publishedAt,
        url: articleUrl,
      },
      rss: {
        status: 'included',
        addedAt: publishedAt,
        feedUrl: 'https://voraprep.com/feed.xml',
      },
      linkedin: {
        status: 'pending',
      },
    };
    
    await db.collection('growth_content').doc(docToPublish.id).update({
      status: 'published',
      publishedAt: admin.firestore.FieldValue.serverTimestamp(),
      autoPublished: true,
      distribution: distribution,
    });

    console.log(`[AutoPublish] ✅ Published from queue: "${articleData.title}" (${docToPublish.id})`);

    // DISABLED: LinkedIn auto-share from blog posts
    // We've shifted to standalone story posts via postScheduledLinkedIn (Mon/Wed/Fri 9 AM)
    // Blog promotional posts felt spammy — story posts drive better engagement
    // See: linkedin_story_posts collection + LinkedInPosts admin UI
    await db.collection('growth_content').doc(docToPublish.id).update({
      'distribution.linkedin': {
        status: 'disabled',
        reason: 'Shifted to standalone story posts for better engagement',
      },
    });
    console.log('[AutoPublish] LinkedIn auto-share disabled — using story posts instead');

    // Share to Discord (if configured)
    const discordResult = await shareToDiscord(articleData);
    if (discordResult) {
      await db.collection('growth_content').doc(docToPublish.id).update({
        'distribution.discord': {
          status: 'posted',
          postedAt: discordResult.postedAt,
        },
      });
    } else {
      await db.collection('growth_content').doc(docToPublish.id).update({
        'distribution.discord': {
          status: 'skipped',
          reason: 'No webhook configured or posting failed',
        },
      });
    }

    // Send notification email with distribution summary
    const resendKey = process.env.RESEND_API_KEY?.trim();
    if (resendKey) {
      try {
        const linkedInUrl = linkedInResult?.url;
        const discordStatus = discordResult ? '✅ Posted' : '⏭️ Skipped';
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: 'VoraPrep <notifications@voraprep.com>',
            to: 'rob@voraprep.com',
            subject: `[Growth Engine] Published: ${articleData.title}`,
            html: `
              <p>Auto-published from approved queue:</p>
              <p><strong>${articleData.title}</strong></p>
              <h4>Distribution:</h4>
              <ul>
                <li>📰 Blog: <a href="${articleUrl}">${articleUrl}</a></li>
                <li>📡 RSS: Included in feed</li>
                <li>💼 LinkedIn: ${linkedInUrl ? `<a href="${linkedInUrl}">Posted</a>` : 'Skipped (no token)'}</li>
                <li>💬 Discord: ${discordStatus}</li>
              </ul>
            `,
          }),
        });
        console.log('[AutoPublish] Notification email sent');
      } catch (emailErr) {
        console.warn('[AutoPublish] Email failed:', emailErr.message);
      }
    }

    await updateFunctionStatus('growthAutoPublish', 'success', { 
      published: articleData.title,
      linkedIn: linkedInResult ? 'posted' : 'skipped',
      discord: discordResult ? 'posted' : 'skipped',
    });
    return;
  }

  // No approved articles — notify admin so they can queue more
  console.log('[AutoPublish] No approved articles in queue. Notifying admin...');
  await updateFunctionStatus('growthAutoPublish', 'skipped', { reason: 'No approved articles in queue' });
  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (resendKey) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'VoraPrep <notifications@voraprep.com>',
          to: 'rob@voraprep.com',
          subject: '[Growth Engine] Queue empty — no articles to publish',
          html: `<p>The auto-publish job ran but found no approved articles in the queue.</p><p>Generate and approve some articles to keep the content pipeline flowing:</p><p><a href="https://voraprep.com/admin/growth">Go to Growth Engine</a></p>`,
        }),
      });
      console.log('[AutoPublish] Empty queue notification sent');
    } catch (emailErr) {
      console.warn('[AutoPublish] Email failed:', emailErr.message);
    }
  }
});

// ============================================================================
// LINKEDIN SYNDICATION — Auto-share published articles to LinkedIn
// ============================================================================

/**
 * Share an article to LinkedIn Company Page as a teaser post with link.
 * Called after an article is published (from growthAutoPublish or manual publish).
 * 
 * Setup:
 * 1. Create LinkedIn Developer App: https://www.linkedin.com/developers/apps
 * 2. Add "Share on LinkedIn" and "Marketing Developer Platform" products
 * 3. Get Company Page ID (from LinkedIn page URL or admin center)
 * 4. Complete OAuth flow to get access token (valid 60 days, needs refresh)
 * 5. firebase functions:secrets:set LINKEDIN_ACCESS_TOKEN -P production
 * 6. firebase functions:secrets:set LINKEDIN_ORG_ID -P production
 * 
 * Note: LinkedIn access tokens expire every 60 days. Consider implementing
 * refresh token flow for long-term automation.
 */
async function shareToLinkedIn(article) {
  let linkedInToken = process.env.LINKEDIN_ACCESS_TOKEN?.trim();
  let linkedInPersonId = null;
  
  // Get config from Firestore (includes personId and token)
  try {
    const configDoc = await db.collection('system_config').doc('linkedin').get();
    if (configDoc.exists) {
      const config = configDoc.data();
      linkedInToken = linkedInToken || config.accessToken;
      linkedInPersonId = config.personId;
      
      // Check if token has expired
      if (config.expiresAt && config.expiresAt.toDate() < new Date()) {
        console.log('[LinkedIn] Token has expired. Re-authorize at https://us-central1-voraprep-prod.cloudfunctions.net/linkedinOAuthCallback');
        return null;
      }
    }
  } catch (err) {
    console.log('[LinkedIn] Could not read config from Firestore:', err.message);
  }
  
  if (!linkedInToken || !linkedInPersonId) {
    console.log('[LinkedIn] Skipping — No token or personId. Visit https://us-central1-voraprep-prod.cloudfunctions.net/linkedinOAuthCallback to authorize.');
    return null;
  }

  const articleUrl = `https://voraprep.com/blog/${article.slug}`;
  
  // Generate a short engaging teaser for LinkedIn
  const examName = article.courseId?.toUpperCase() || 'Exam';
  const contentType = article.contentType || 'article';
  
  const teaserText = generateLinkedInTeaser(article.title, examName, contentType, articleUrl);
  
  try {
    // LinkedIn UGC Posts API
    const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${linkedInToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
      },
      body: JSON.stringify({
        author: `urn:li:person:${linkedInPersonId}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: teaserText,
            },
            shareMediaCategory: 'ARTICLE',
            media: [{
              status: 'READY',
              originalUrl: articleUrl,
            }],
          },
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[LinkedIn] Post failed:', response.status, errorText);
      return null;
    }

    const result = await response.json();
    const postId = result.id;
    const linkedInUrl = postId ? `https://www.linkedin.com/feed/update/${postId}` : null;
    console.log('[LinkedIn] Successfully shared to LinkedIn:', linkedInUrl || postId);
    return { postId, url: linkedInUrl };
  } catch (err) {
    console.error('[LinkedIn] Error posting:', err.message);
    return null;
  }
}

/**
 * Generate an engaging LinkedIn teaser post for an article.
 */
function generateLinkedInTeaser(title, examName, contentType, url) {
  const emoji = {
    'practice-questions': '📝',
    'study-guide': '📚',
    'requirements': '📋',
    'exam-tips': '💡',
    'mnemonics': '🧠',
  }[contentType] || '📖';
  
  const ctaCopy = {
    'practice-questions': 'Test yourself with detailed explanations for each answer.',
    'study-guide': 'Get the complete breakdown of what you need to know.',
    'requirements': 'Everything you need to know before applying.',
    'exam-tips': 'Strategies from candidates who passed on their first try.',
    'mnemonics': 'Memory tricks to help you retain key concepts.',
  }[contentType] || 'Learn more about passing your exam.';

  return `${emoji} ${title}

${ctaCopy}

👉 Read the full guide: ${url}

#${examName}Exam #${examName} #ExamPrep #CareerDevelopment #Accounting #Finance`;
}

/**
 * Share article to Discord via webhook.
 * Much simpler than LinkedIn - just needs a webhook URL stored in Firestore.
 * 
 * Setup:
 * 1. In your Discord server, go to Server Settings → Integrations → Webhooks
 * 2. Create a new webhook, copy the URL
 * 3. Store in Firestore: system_config/discord { webhookUrl: "...", enabled: true }
 */
async function shareToDiscord(article) {
  try {
    const configDoc = await db.collection('system_config').doc('discord').get();
    if (!configDoc.exists) {
      console.log('[Discord] Skipping — No config in system_config/discord');
      return null;
    }
    
    const config = configDoc.data();
    if (!config.enabled || !config.webhookUrl) {
      console.log('[Discord] Skipping — Disabled or no webhookUrl configured');
      return null;
    }
    
    const articleUrl = `https://voraprep.com/blog/${article.slug}`;
    const examName = article.courseId?.toUpperCase() || 'Exam';
    
    const contentTypeEmoji = {
      'practice-questions': '📝',
      'study-guide': '📚',
      'requirements': '📋',
      'exam-tips': '💡',
      'mnemonics': '🧠',
    }[article.contentType] || '📖';
    
    // Discord embed for rich preview
    const embed = {
      title: article.title,
      url: articleUrl,
      description: article.metaDescription || `New ${examName} study resource available on VoraPrep.`,
      color: 0x2563EB, // VoraPrep blue
      footer: {
        text: `VoraPrep ${examName} • ${article.contentType || 'Article'}`,
      },
      timestamp: new Date().toISOString(),
    };
    
    const response = await fetch(config.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `${contentTypeEmoji} **New ${examName} Resource Published!**`,
        embeds: [embed],
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Discord] Post failed:', response.status, errorText);
      return null;
    }
    
    console.log('[Discord] Successfully posted to Discord webhook');
    return { success: true, postedAt: new Date() };
  } catch (err) {
    console.error('[Discord] Error posting:', err.message);
    return null;
  }
}

// ============================================================================
// LINKEDIN STORY POSTS — Scheduled posting of story-style content
// Posts 3x/week (Mon, Wed, Fri) from linkedin_story_posts collection
// ============================================================================

/**
 * Scheduled function to post story-style content to LinkedIn.
 * Runs Monday, Wednesday, Friday at 9 AM EST (14:00 UTC).
 * 
 * Story posts are fundamentally different from blog teasers:
 * - They don't promote a link
 * - They tell a story or share an insight
 * - They build brand affinity over direct conversion
 * 
 * Firestore collection: linkedin_story_posts
 * Document structure:
 * {
 *   content: string;           // The full post text (max 3000 chars)
 *   type: 'founder-story' | 'dear-candidate' | 'data-insight' | 'user-win' | 'industry';
 *   status: 'draft' | 'scheduled' | 'posted' | 'failed';
 *   scheduledFor?: Date;       // Optional: specific date to post
 *   postedAt?: Date;
 *   postId?: string;           // LinkedIn post ID after posting
 *   postUrl?: string;
 *   createdAt: Date;
 *   author: string;
 * }
 */
exports.postScheduledLinkedIn = onSchedule({
  schedule: 'every monday,wednesday,friday 09:00',  // 9 AM ET
  timeZone: 'America/New_York',
  timeoutSeconds: 60,
  memory: '256MiB',
  secrets: ['RESEND_API_KEY'],
}, async (context) => {
  console.log('[LinkedInStory] Starting scheduled story post check...');
  
  try {
    // Get LinkedIn credentials from Firestore
    const configDoc = await db.collection('system_config').doc('linkedin').get();
    if (!configDoc.exists) {
      console.log('[LinkedInStory] No LinkedIn config found. Skipping.');
      return;
    }
    
    const config = configDoc.data();
    const accessToken = config.accessToken;
    const personId = config.personId;
    
    if (!accessToken || !personId) {
      console.log('[LinkedInStory] No LinkedIn credentials configured. Skipping.');
      return;
    }
    
    // Check if token has expired
    if (config.expiresAt && config.expiresAt.toDate() < new Date()) {
      console.log('[LinkedInStory] LinkedIn token expired. Re-authorize needed.');
      return;
    }
    
    // Find the next APPROVED post to publish
    // Posts must be explicitly approved before they can be auto-posted
    const now = new Date();
    
    // First, check for approved posts scheduled for today or earlier
    // Requires index: status ASC, scheduledFor ASC
    let postQuery = db.collection('linkedin_story_posts')
      .where('status', '==', 'approved')
      .where('scheduledFor', '<=', now)
      .orderBy('scheduledFor', 'asc')
      .limit(1);
    
    let snapshot = await postQuery.get();
    
    // If no specifically scheduled posts, pick from the general approved queue
    if (snapshot.empty) {
      // Logic change: Don't filter by scheduledFor == null, as it excludes undefined/missing fields
      // Just pick the oldest approved post that DOESN'T have a future scheduledFor date
      // But simplest is: Status=approved, OrderBy=createdAt ASC
      // This might pick up a future-scheduled post if we aren't careful, but typically scheduled posts are future
      // The previous fallback was: status=approved, scheduledFor=null
      
      // Better fallback: status=approved, orderBy=createdAt ASC (FIFO)
      // This covers both "unscheduled" and "scheduled in past but missed"
      const allApproved = await db.collection('linkedin_story_posts')
        .where('status', '==', 'approved')
        .orderBy('createdAt', 'asc') // Requires index: status ASC, createdAt ASC
        .limit(1)
        .get();
      
      if (allApproved.empty) {
        console.log('[LinkedInStory] No approved posts available. Approve posts in Admin > LinkedIn Posts.');
        return;
      }
      
      // Check if the picked post is scheduled for FUTURE (shouldn't be picked if we want strict scheduling)
      // But for now, let's assumes if it's approved and in the queue, it's ready to go unless scheduled for later
      const candidate = allApproved.docs[0];
      const candidateData = candidate.data();
      
      if (candidateData.scheduledFor && candidateData.scheduledFor.toDate() > now) {
        console.log('[LinkedInStory] Next post is scheduled for future. Waiting.');
        return;
      }
      
      snapshot = allApproved; // Use this snapshot
    }
    
    const postDoc = snapshot.docs[0];
    const postData = postDoc.data();
    const postId = postDoc.id;
    
    console.log(`[LinkedInStory] Found post to publish: ${postId} (type: ${postData.type})`);
    
    // Post to LinkedIn
    const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
      },
      body: JSON.stringify({
        author: `urn:li:person:${personId}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: postData.content,
            },
            shareMediaCategory: 'NONE',  // Story posts = no link preview
          },
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
        },
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('[LinkedInStory] Post failed:', response.status, errorText);
      
      // Mark as failed
      await db.collection('linkedin_story_posts').doc(postId).update({
        status: 'failed',
        error: `${response.status}: ${errorText}`,
        failedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      return;
    }
    
    const result = await response.json();
    const linkedInPostId = result.id;
    const linkedInUrl = linkedInPostId ? `https://www.linkedin.com/feed/update/${linkedInPostId}` : null;
    
    // Mark as posted
    await db.collection('linkedin_story_posts').doc(postId).update({
      status: 'posted',
      postedAt: admin.firestore.FieldValue.serverTimestamp(),
      linkedInPostId: linkedInPostId,
      postUrl: linkedInUrl,
    });
    
    console.log(`[LinkedInStory] Successfully posted: ${linkedInUrl || linkedInPostId}`);

    // Send notification email to Rob
    try {
      const resendApiKey = process.env.RESEND_API_KEY?.trim();
      if (resendApiKey) {
        const resendClient = new Resend(resendApiKey);
        await resendClient.emails.send({
          from: 'VoraPrep <hello@voraprep.com>',
          to: 'rob@sagecg.com',
          subject: 'LinkedIn Post Published: ' + (postData.type || 'General'),
          html: `
            <h2>Your LinkedIn post is live!</h2>
            <p><strong>Post Type:</strong> ${postData.type}</p>
            <p><strong>View Post:</strong> <a href="${linkedInUrl}">${linkedInUrl}</a></p>
            <hr />
            <h3>Content:</h3>
            <pre style="white-space: pre-wrap;">${postData.content}</pre>
            <hr />
            <p>Use <a href="https://voraprep.com/admin/linkedin">Admin Dashboard</a> to manage future posts.</p>
          `,
        });
        console.log('[LinkedInStory] Notification email sent to rob@sagecg.com');
      } else {
        console.warn('[LinkedInStory] Skipping email notification: RESEND_API_KEY missing');
      }
    } catch (emailErr) {
      console.error('[LinkedInStory] Failed to send notification email:', emailErr);
      // Don't fail the function if email fails
    }
  } catch (err) {
    console.error('[LinkedInStory] Error in scheduled function:', err);
    throw err; // Re-throw to show in logs
  }
});

/**
 * HTTP callable to manually trigger a LinkedIn story post (for testing).
 * Only admins can call this.
 */
exports.postLinkedInStoryNow = onCall({
  timeoutSeconds: 30,
  memory: '256MiB',
}, async (request) => {
  // Check admin
  const uid = request.auth?.uid;
  if (!uid) {
    throw new HttpsError('unauthenticated', 'Must be logged in');
  }
  
  const userDoc = await db.collection('users').doc(uid).get();
  if (!userDoc.exists || !userDoc.data()?.isAdmin) {
    throw new HttpsError('permission-denied', 'Admin only');
  }
  
  const { postId } = request.data;
  if (!postId) {
    throw new HttpsError('invalid-argument', 'postId required');
  }
  
  // Get the post
  const postDoc = await db.collection('linkedin_story_posts').doc(postId).get();
  if (!postDoc.exists) {
    throw new HttpsError('not-found', 'Post not found');
  }
  
  const postData = postDoc.data();
  
  // Get LinkedIn credentials
  const configDoc = await db.collection('system_config').doc('linkedin').get();
  if (!configDoc.exists) {
    throw new HttpsError('failed-precondition', 'LinkedIn not configured');
  }
  
  const config = configDoc.data();
  if (!config.accessToken || !config.personId) {
    throw new HttpsError('failed-precondition', 'LinkedIn credentials missing');
  }
  
  // Post it
  const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.accessToken}`,
      'Content-Type': 'application/json',
      'X-Restli-Protocol-Version': '2.0.0',
    },
    body: JSON.stringify({
      author: `urn:li:person:${config.personId}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: postData.content,
          },
          shareMediaCategory: 'NONE',
        },
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
      },
    }),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new HttpsError('internal', `LinkedIn error: ${response.status} - ${errorText}`);
  }
  
  const result = await response.json();
  const linkedInPostId = result.id;
  const linkedInUrl = linkedInPostId ? `https://www.linkedin.com/feed/update/${linkedInPostId}` : null;
  
  // Update post status
  await db.collection('linkedin_story_posts').doc(postId).update({
    status: 'posted',
    postedAt: admin.firestore.FieldValue.serverTimestamp(),
    linkedInPostId: linkedInPostId,
    postUrl: linkedInUrl,
  });
  
  return { success: true, postUrl: linkedInUrl };
});

// ============================================================================
// LINKEDIN OAUTH CALLBACK — Exchange code for access token
// ============================================================================

/**
 * LinkedIn OAuth callback handler.
 * After user authorizes the app, LinkedIn redirects here with a code.
 * We exchange the code for an access token and display it for manual secret setup.
 * 
 * Flow:
 * 1. User visits the authorization URL (generated below)
 * 2. User authorizes the app on LinkedIn
 * 3. LinkedIn redirects to this endpoint with ?code=xxx
 * 4. We exchange the code for an access token
 * 5. Display the token for the admin to copy and store as Firebase secret
 */
exports.linkedinOAuthCallback = onRequest({
  cors: false,
  timeoutSeconds: 30,
}, async (req, res) => {
  const LINKEDIN_CLIENT_ID = '786537sg12kcn4';
  const LINKEDIN_CLIENT_SECRET = 'WPL_AP1.IyXkIzztNJ9OMA2j.hnioXw==';
  const LINKEDIN_ORG_ID = '111658460';
  const REDIRECT_URI = 'https://us-central1-voraprep-prod.cloudfunctions.net/linkedinOAuthCallback';
  
  const { code, error, error_description } = req.query;
  
  // Handle errors from LinkedIn
  if (error) {
    console.error('[LinkedIn OAuth] Error:', error, error_description);
    res.status(400).send(`
      <html>
        <head><title>LinkedIn OAuth Error</title></head>
        <body style="font-family: system-ui; max-width: 600px; margin: 50px auto; padding: 20px;">
          <h1>❌ Authorization Failed</h1>
          <p><strong>Error:</strong> ${error}</p>
          <p><strong>Details:</strong> ${error_description || 'No details provided'}</p>
          <p><a href="https://voraprep.com/admin">Return to Admin</a></p>
        </body>
      </html>
    `);
    return;
  }
  
  // If no code, show authorization link
  if (!code) {
    // openid + profile = get person ID via userinfo endpoint
    // w_member_social = post to personal profile
    const scopes = 'openid profile w_member_social';
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(scopes)}`;
    
    res.status(200).send(`
      <html>
        <head><title>LinkedIn Authorization</title></head>
        <body style="font-family: system-ui; max-width: 600px; margin: 50px auto; padding: 20px;">
          <h1>🔗 Authorize LinkedIn Posting</h1>
          <p>Click the button below to authorize VoraPrep to post to your personal LinkedIn profile.</p>
          <p style="margin: 30px 0;">
            <a href="${authUrl}" style="background: #0077b5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
              Authorize with LinkedIn
            </a>
          </p>
          <p style="color: #666; font-size: 14px;">
            This will grant permission to post updates to your LinkedIn profile.<br>
            The access token is valid for 60 days.
          </p>
        </body>
      </html>
    `);
    return;
  }
  
  // Exchange code for access token
  try {
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: LINKEDIN_CLIENT_ID,
        client_secret: LINKEDIN_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
      }),
    });
    
    const tokenData = await tokenResponse.json();
    
    if (!tokenResponse.ok || !tokenData.access_token) {
      throw new Error(tokenData.error_description || tokenData.error || 'Failed to get access token');
    }
    
    const accessToken = tokenData.access_token;
    const expiresIn = tokenData.expires_in; // seconds
    const expiresDate = new Date(Date.now() + expiresIn * 1000).toLocaleDateString();
    
    console.log('[LinkedIn OAuth] Successfully obtained access token, expires:', expiresDate);
    
    // Fetch user's LinkedIn profile to get their person ID
    let personId = null;
    try {
      const profileResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      if (profileResponse.ok) {
        const profile = await profileResponse.json();
        personId = profile.sub; // LinkedIn person ID from OpenID Connect
        console.log('[LinkedIn OAuth] Got person ID:', personId);
      } else {
        console.warn('[LinkedIn OAuth] /v2/userinfo failed:', await profileResponse.text());
      }
    } catch (profileErr) {
      console.error('[LinkedIn OAuth] Could not fetch profile:', profileErr.message);
    }
    
    // Store in Firestore for automatic use
    await db.collection('system_config').doc('linkedin').set({
      accessToken,
      expiresIn,
      expiresAt: new Date(Date.now() + expiresIn * 1000),
      personId, // For posting as personal profile
      orgId: LINKEDIN_ORG_ID, // For future org posting if approved
      updatedAt: new Date(),
    }, { merge: true });
    
    res.status(200).send(`
      <html>
        <head><title>LinkedIn Authorization Success</title></head>
        <body style="font-family: system-ui; max-width: 700px; margin: 50px auto; padding: 20px;">
          <h1>✅ Authorization Successful!</h1>
          <p>LinkedIn access token obtained. It will expire on <strong>${expiresDate}</strong>.</p>
          ${personId ? `<p>Posting as: <strong>Person ID ${personId}</strong></p>` : ''}
          
          <h3>✅ All Done!</h3>
          <p>The token has been stored automatically. LinkedIn auto-posting is now active.</p>
          <p>When new articles are published, they will be shared to your LinkedIn profile.</p>
          
          <p style="margin-top: 30px;">
            <a href="https://voraprep.com/admin" style="background: #1a73e8; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px;">
              Return to Admin Dashboard
            </a>
          </p>
          
          <details style="margin-top: 30px;">
            <summary style="cursor: pointer; color: #666;">Manual setup (optional)</summary>
            <pre style="background: #f4f4f4; padding: 15px; border-radius: 8px; overflow-x: auto; font-size: 12px; margin-top: 10px;">
# Set the access token as Firebase secret
echo "${accessToken}" | firebase functions:secrets:set LINKEDIN_ACCESS_TOKEN -P production
            </pre>
          </details>
        </body>
      </html>
    `);
  } catch (err) {
    console.error('[LinkedIn OAuth] Token exchange failed:', err);
    res.status(500).send(`
      <html>
        <head><title>LinkedIn OAuth Error</title></head>
        <body style="font-family: system-ui; max-width: 600px; margin: 50px auto; padding: 20px;">
          <h1>❌ Token Exchange Failed</h1>
          <p><strong>Error:</strong> ${err.message}</p>
          <p>Please try again or check the LinkedIn Developer Console.</p>
          <p><a href="https://voraprep.com/admin">Return to Admin</a></p>
        </body>
      </html>
    `);
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

  // Template types to generate with FULL OUTLINES for quality content
  const templates = [
    { 
      id: 'study-guide-section', 
      title: 'Complete {exam} {sectionName} Study Guide {year}', 
      slug: '{course}-{sectionLower}-study-guide-{year}', 
      perSection: true, 
      wordCount: 2500, 
      priority: 1,
      outline: [
        { heading: 'What Is {exam} {sectionName}?', level: 2, keyPoints: ['Overview of the section', 'What it tests', 'Weight on the exam', 'Who should take this section first'], wordCount: 300 },
        { heading: '{sectionName} Exam Format and Structure', level: 2, keyPoints: ['Number of questions (MCQ and TBS)', 'Time allowed', 'Passing score requirements', 'Question types breakdown'], wordCount: 250 },
        { heading: 'Key Topics You Must Master', level: 2, keyPoints: ['Blueprint areas with percentages', 'High-weight topics to prioritize', 'Common tested concepts with examples', 'Topics that appear repeatedly'], wordCount: 400 },
        { heading: 'How to Study for {sectionName} Effectively', level: 2, keyPoints: ['Recommended study timeline', 'Daily study routine', 'Spaced repetition strategy', 'Practice question targets (aim for 2,000+)'], wordCount: 400 },
        { heading: 'Common Mistakes to Avoid', level: 2, keyPoints: ['Time management errors', 'Skipping difficult topics', 'Not doing enough MCQs', 'Ignoring TBS practice', 'Studying passively'], wordCount: 300 },
        { heading: '{sectionName} Pass Rates and Difficulty', level: 2, keyPoints: ['Current pass rates with data', 'Historical trends', 'Why this section is considered easy/hard', 'What a 75 really means'], wordCount: 250 },
        { heading: 'Best Study Resources for {sectionName}', level: 2, keyPoints: ['VoraPrep adaptive learning', 'Official resources', 'Free vs paid options', 'What to look for in a review course'], wordCount: 300 },
        { heading: 'FAQs About {exam} {sectionName}', level: 2, keyPoints: ['How long to study?', 'Best order to take sections?', 'Can I retake if I fail?', 'What score do I need?', 'How is it graded?'], wordCount: 300 },
      ],
    },
    { 
      id: 'pass-rates', 
      title: '{exam} Pass Rates {year}: What to Expect', 
      slug: '{course}-pass-rates-{year}', 
      perSection: false, 
      wordCount: 2000, 
      priority: 2,
      outline: [
        { heading: '{exam} Pass Rate Overview', level: 2, keyPoints: ['Current overall pass rate', 'Year-over-year trends', 'Comparison to previous years', 'What the numbers really mean'], wordCount: 300 },
        { heading: 'Pass Rates by Section', level: 2, keyPoints: ['Each section pass rate', 'Hardest vs easiest sections', 'Historical context', 'Why some sections are harder'], wordCount: 400 },
        { heading: 'Why the {exam} Pass Rate Is Low', level: 2, keyPoints: ['Insufficient study time', 'Poor study materials', 'Not enough practice questions', 'Test anxiety', 'Underestimating difficulty'], wordCount: 300 },
        { heading: 'How to Beat the Odds', level: 2, keyPoints: ['Study more than the average candidate', 'Use adaptive learning', 'Do 3,000+ practice questions', 'Simulate exam conditions'], wordCount: 400 },
        { heading: 'VoraPrep Student Success Data', level: 2, keyPoints: ['Our students pass rate', 'Average score improvement', 'Questions completed by passers', 'Study time correlation'], wordCount: 300 },
        { heading: '{exam} Pass Rate FAQs', level: 2, keyPoints: ['Is it getting harder?', 'First-time vs retaker rates', 'What if I fail?', 'How many attempts on average?'], wordCount: 300 },
      ],
    },
    { 
      id: 'study-schedule', 
      title: '{exam} Study Schedule {year}: Week-by-Week Plan', 
      slug: '{course}-study-schedule-{year}', 
      perSection: false, 
      wordCount: 2200, 
      priority: 2,
      outline: [
        { heading: 'How Long Does It Take to Pass the {exam}?', level: 2, keyPoints: ['Total hours needed (300-400 typical)', 'Per section breakdown', 'Full-time vs part-time timeline', 'Working professional schedule'], wordCount: 300 },
        { heading: 'Choosing Your Section Order', level: 2, keyPoints: ['Most common order strategy', 'Start with hardest vs easiest', 'Content overlap considerations', 'Momentum building'], wordCount: 300 },
        { heading: '3-Month Intensive Schedule', level: 2, keyPoints: ['Week-by-week breakdown', 'Daily hour commitment', 'Best for full-time students', 'One section at a time'], wordCount: 350 },
        { heading: '6-Month Balanced Schedule', level: 2, keyPoints: ['Recommended for working professionals', 'Two sections at once strategy', 'Weekend warrior approach', 'Buffer time for retakes'], wordCount: 350 },
        { heading: '12-Month Extended Schedule', level: 2, keyPoints: ['Best for busy professionals', 'Steady sustainable pace', 'Risk of forgetting earlier sections', 'Review strategy'], wordCount: 350 },
        { heading: 'Weekly Study Routine Template', level: 2, keyPoints: ['Monday-Friday evening plan', 'Weekend intensive sessions', 'When to do MCQs vs lessons', 'Rest and recovery'], wordCount: 300 },
        { heading: 'Study Tips for Working Professionals', level: 2, keyPoints: ['Morning vs evening study', 'Using commute time', 'PTO strategy for exam week', 'Family communication'], wordCount: 250 },
      ],
    },
    { 
      id: 'salary-guide', 
      title: '{exam} Salary Guide {year}: How Much Do {exam}s Earn?', 
      slug: '{course}-salary-guide-{year}', 
      perSection: false, 
      wordCount: 2000, 
      priority: 3,
      outline: [
        { heading: 'Average {exam} Salary in {year}', level: 2, keyPoints: ['National average', 'Entry level vs experienced', 'Salary range (10th to 90th percentile)', 'Total compensation'], wordCount: 300 },
        { heading: 'Salary by Years of Experience', level: 2, keyPoints: ['0-2 years', '3-5 years', '6-10 years', '10+ years', 'Partner/Director level'], wordCount: 350 },
        { heading: 'Salary by Industry', level: 2, keyPoints: ['Public accounting', 'Corporate finance', 'Government', 'Consulting', 'Tech companies'], wordCount: 300 },
        { heading: 'Salary by Location', level: 2, keyPoints: ['Highest paying cities', 'Cost of living adjustment', 'Remote work impact', 'State-by-state data'], wordCount: 300 },
        { heading: '{exam} vs Non-{exam} Salary Gap', level: 2, keyPoints: ['Percentage premium', 'Career advancement difference', 'Lifetime earnings impact', 'ROI of certification'], wordCount: 300 },
        { heading: 'How to Maximize Your {exam} Salary', level: 2, keyPoints: ['Negotiate with credential', 'Target high-paying industries', 'Specialize in hot areas', 'Build complementary skills'], wordCount: 250 },
        { heading: 'Is the {exam} Worth It Financially?', level: 2, keyPoints: ['Cost of exam and prep', 'Time investment', 'Payback period', 'Long-term value', 'Opportunity cost'], wordCount: 200 },
      ],
    },
    { 
      id: 'review-comparison', 
      title: 'Best {exam} Review Courses {year}: Honest Comparison', 
      slug: 'best-{course}-review-courses-{year}', 
      perSection: false, 
      wordCount: 2800, 
      priority: 1,
      outline: [
        { heading: 'Best {exam} Review Courses at a Glance', level: 2, keyPoints: ['Quick comparison table', 'Price range', 'Key features', 'Our top pick'], wordCount: 300 },
        { heading: 'How We Evaluated Each Course', level: 2, keyPoints: ['Content quality', 'Technology/UX', 'Price value', 'Pass guarantee', 'Student reviews'], wordCount: 200 },
        { heading: 'Becker {exam} Review', level: 2, keyPoints: ['The industry standard', 'Premium pricing ($2,500+)', 'Pros and cons', 'Best for: big firm sponsorship'], wordCount: 350 },
        { heading: 'Roger {exam} Review', level: 2, keyPoints: ['Engaging lectures', 'Mid-range pricing', 'Pros and cons', 'Best for: visual learners'], wordCount: 300 },
        { heading: 'Surgent {exam} Review', level: 2, keyPoints: ['Adaptive technology pioneer', 'Competitive pricing', 'Pros and cons', 'Best for: efficient studiers'], wordCount: 300 },
        { heading: 'VoraPrep: AI-Powered {exam} Prep', level: 2, keyPoints: ['Newest technology (AI tutor, adaptive)', 'Affordable ($19/mo)', 'Unlimited practice questions', 'Best for: budget-conscious, tech-savvy'], wordCount: 400 },
        { heading: 'Price Comparison Table', level: 2, keyPoints: ['Side-by-side pricing', 'What is included at each tier', 'Hidden costs', 'Pass guarantee details'], wordCount: 300 },
        { heading: 'Which Course Is Right for You?', level: 2, keyPoints: ['Budget decision tree', 'Learning style match', 'Time availability', 'Final recommendation'], wordCount: 350 },
      ],
    },
    { 
      id: 'exam-tips', 
      title: '15 Tips to Pass the {exam} Exam in {year}', 
      slug: '{course}-exam-tips-{year}', 
      perSection: false, 
      wordCount: 2000, 
      priority: 2,
      outline: [
        { heading: 'Study Strategy Tips (1-5)', level: 2, keyPoints: ['Tip 1: Create a realistic study schedule', 'Tip 2: Use spaced repetition', 'Tip 3: Focus on weak areas first', 'Tip 4: Do 3,000+ practice questions', 'Tip 5: Simulate real exam conditions'], wordCount: 400 },
        { heading: 'Exam Day Tips (6-10)', level: 2, keyPoints: ['Tip 6: Get there early', 'Tip 7: Manage your time per testlet', 'Tip 8: Don\'t second-guess yourself', 'Tip 9: Take short mental breaks', 'Tip 10: Flag and move on'], wordCount: 400 },
        { heading: 'Mindset Tips (11-15)', level: 2, keyPoints: ['Tip 11: Don\'t compare yourself to others', 'Tip 12: Embrace the struggle', 'Tip 13: Celebrate small wins', 'Tip 14: Remember why you started', 'Tip 15: Trust your preparation'], wordCount: 400 },
        { heading: 'Bonus: What to Do If You Fail', level: 2, keyPoints: ['Analyze your score report', 'Adjust study strategy', 'Don\'t wait too long to retake', 'You\'re not alone'], wordCount: 200 },
        { heading: 'Success Stories', level: 2, keyPoints: ['Real examples of people who passed', 'Common traits of successful candidates', 'How VoraPrep helped them'], wordCount: 200 },
      ],
    },
    { 
      id: 'requirements-state', 
      title: '{exam} Requirements {year}: Education, Experience & Fees', 
      slug: '{course}-requirements-{year}', 
      perSection: false, 
      wordCount: 2000, 
      priority: 3,
      outline: [
        { heading: '{exam} Requirements Overview', level: 2, keyPoints: ['Three pillars: education, exam, experience', 'Timeline to complete', 'Costs breakdown'], wordCount: 250 },
        { heading: 'Education Requirements', level: 2, keyPoints: ['Degree requirements', 'Credit hour requirements', 'Approved majors', 'International education'], wordCount: 350 },
        { heading: 'Exam Requirements', level: 2, keyPoints: ['All sections required', 'Time limits to complete', 'Passing score', 'Retake policies'], wordCount: 300 },
        { heading: 'Experience Requirements', level: 2, keyPoints: ['Type of experience needed', 'Hours required', 'Supervisor requirements', 'Timeline flexibility'], wordCount: 300 },
        { heading: '{exam} Exam Fees and Costs', level: 2, keyPoints: ['Application fees', 'Exam fees per section', 'Review course costs', 'Total investment'], wordCount: 300 },
        { heading: 'State-by-State Differences', level: 2, keyPoints: ['Why requirements vary', 'Most lenient states', 'Most strict states', 'Reciprocity'], wordCount: 250 },
        { heading: 'How to Get Started', level: 2, keyPoints: ['Step 1: Verify eligibility', 'Step 2: Apply to state board', 'Step 3: Get NTS', 'Step 4: Schedule exams', 'Step 5: Start studying'], wordCount: 250 },
      ],
    },
    { 
      id: 'free-practice', 
      title: 'Free {exam} {sectionName} Practice Questions ({year})', 
      slug: 'free-{course}-{sectionLower}-practice-questions-{year}', 
      perSection: true, 
      wordCount: 3000, 
      priority: 1,
      outline: [
        { heading: 'Why Practice Questions Matter', level: 2, keyPoints: ['Correlation with pass rates', 'Active vs passive learning', 'Identifying weak areas', 'Building exam stamina'], wordCount: 300 },
        { heading: '10 Free {sectionName} Practice Questions', level: 2, keyPoints: ['Question 1 with answer', 'Question 2 with answer', '...through Question 10', 'Detailed explanations for each'], wordCount: 1200 },
        { heading: 'How These Questions Were Chosen', level: 2, keyPoints: ['Mirrors actual exam difficulty', 'Covers key blueprint areas', 'Common mistake triggers', 'High-value concepts'], wordCount: 250 },
        { heading: 'How to Use Practice Questions Effectively', level: 2, keyPoints: ['Timed vs untimed practice', 'Review every wrong answer', 'Track patterns in mistakes', 'Spaced repetition'], wordCount: 300 },
        { heading: 'Get 5,000+ More {sectionName} Questions', level: 2, keyPoints: ['VoraPrep question bank', 'Adaptive learning technology', 'AI explanations', 'Free trial available'], wordCount: 300 },
        { heading: 'Additional Free Resources', level: 2, keyPoints: ['Official AICPA resources', 'Free flashcards', 'Study guides', 'Community forums'], wordCount: 200 },
      ],
    },
    { 
      id: 'topic-explainer', 
      title: 'Understanding {sectionName}: {exam} Breakdown', 
      slug: '{course}-{sectionLower}-breakdown-{year}', 
      perSection: true, 
      wordCount: 1800, 
      priority: 3,
      outline: [
        { heading: 'What Is {sectionName}?', level: 2, keyPoints: ['Definition and scope', 'Why it matters for the exam', 'Real-world application'], wordCount: 250 },
        { heading: '{sectionName} Blueprint Breakdown', level: 2, keyPoints: ['Content areas with weights', 'Which areas to prioritize', 'Time allocation strategy'], wordCount: 300 },
        { heading: 'Key Concepts You Must Know', level: 2, keyPoints: ['Concept 1 explained', 'Concept 2 explained', 'Concept 3 explained', 'How they connect'], wordCount: 400 },
        { heading: 'Common Question Types', level: 2, keyPoints: ['MCQ format examples', 'TBS format examples', 'Calculation questions', 'Conceptual questions'], wordCount: 300 },
        { heading: 'Study Tips for {sectionName}', level: 2, keyPoints: ['Best resources', 'Effective techniques', 'Time investment needed', 'Practice question strategy'], wordCount: 300 },
        { heading: 'Top {sectionName} Mistakes to Avoid', level: 2, keyPoints: ['Common misconceptions', 'Calculation errors', 'Time management issues', 'How to fix them'], wordCount: 250 },
      ],
    },
  ];

  // Comparison briefs for exam pairs (match client-side: 9 pairs)
  const comparisonPairs = [
    ['cpa', 'cma', 'CPA vs CMA'], ['cpa', 'ea', 'CPA vs EA'],
    ['cpa', 'cia', 'CPA vs CIA'], ['ea', 'cpa', 'EA vs CPA'],
    ['cma', 'cia', 'CMA vs CIA'], ['cma', 'cfp', 'CMA vs CFP'],
    ['cia', 'cisa', 'CIA vs CISA'], ['cfp', 'cpa', 'CFP vs CPA'],
    ['cisa', 'cia', 'CISA vs CIA'],
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

          // Build outline with placeholders replaced
          const outline = (template.outline || []).map(o => ({
            heading: o.heading
              .replace('{exam}', exam.exam)
              .replace('{section}', section.id)
              .replace('{sectionName}', section.name)
              .replace('{year}', CURRENT_YEAR),
            level: o.level,
            keyPoints: o.keyPoints.map(kp => kp
              .replace('{exam}', exam.exam)
              .replace('{section}', section.id)
              .replace('{sectionName}', section.name)
              .replace('{year}', CURRENT_YEAR)),
            wordCount: o.wordCount,
          }));

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
            internalLinks: [`/${exam.courseId}`, `/${exam.courseId}/practice`, `/${exam.courseId}/study`],
            ctaType: 'register',
            ctaUrl: `/${exam.courseId}`,
            status: 'brief',
            priority: template.priority,
            outline,
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

        // Build outline with placeholders replaced
        const outline = (template.outline || []).map(o => ({
          heading: o.heading
            .replace('{exam}', exam.exam)
            .replace('{year}', CURRENT_YEAR),
          level: o.level,
          keyPoints: o.keyPoints.map(kp => kp
            .replace('{exam}', exam.exam)
            .replace('{year}', CURRENT_YEAR)),
          wordCount: o.wordCount,
        }));

        const briefId = `${exam.courseId}-${template.id}-${CURRENT_YEAR}`;
        const ref = db.collection('growth_content').doc(briefId);
        batch.set(ref, {
          title, slug,
          courseId: exam.courseId,
          contentType: template.id,
          targetKeywords: [`${exam.exam.toLowerCase()} prep`, `${exam.exam.toLowerCase()} exam`, `${exam.exam.toLowerCase()} ${template.id.replace(/-/g, ' ')}`],
          primaryKeyword: `${exam.exam.toLowerCase()} ${template.id.replace(/-/g, ' ')}`,
          wordCountTarget: template.wordCount,
          internalLinks: [`/${exam.courseId}`, `/${exam.courseId}/practice`, '/pricing'],
          ctaType: 'register',
          ctaUrl: `/${exam.courseId}`,
          status: 'brief',
          priority: template.priority,
          outline,
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

  // Add comparison briefs with full outlines
  for (const [course1, course2, label] of comparisonPairs) {
    const slug = `${course1}-vs-${course2}-comparison-${CURRENT_YEAR}`;
    if (existingSlugs.has(slug)) { skipped++; continue; }

    const exam1 = course1.toUpperCase();
    const exam2 = course2.toUpperCase();

    const comparisonOutline = [
      { heading: `${exam1} vs ${exam2} at a Glance`, level: 2, keyPoints: ['Side-by-side comparison table', 'Key differences summary', 'Which is harder?', 'Which pays more?'], wordCount: 300 },
      { heading: `What Is the ${exam1}?`, level: 2, keyPoints: ['Definition and scope', 'Who gets this certification', 'Career paths', 'Requirements overview'], wordCount: 350 },
      { heading: `What Is the ${exam2}?`, level: 2, keyPoints: ['Definition and scope', 'Who gets this certification', 'Career paths', 'Requirements overview'], wordCount: 350 },
      { heading: 'Exam Difficulty Comparison', level: 2, keyPoints: ['Pass rates for each', 'Study hours required', 'Content difficulty', 'Retake policies'], wordCount: 300 },
      { heading: 'Salary and Career Outcomes', level: 2, keyPoints: ['Average salary comparison', 'Job market demand', 'Career advancement potential', '5-year earnings projection'], wordCount: 350 },
      { heading: 'Cost and Time Investment', level: 2, keyPoints: ['Exam fees', 'Review course costs', 'Total time to complete', 'ROI analysis'], wordCount: 300 },
      { heading: 'Which Should You Choose?', level: 2, keyPoints: ['Decision framework', 'If you want public accounting', 'If you want corporate finance', 'If you want flexibility'], wordCount: 300 },
      { heading: 'Can You Get Both?', level: 2, keyPoints: ['Dual certification benefits', 'Content overlap', 'Timeline for both', 'Is it worth it?'], wordCount: 250 },
    ];

    const briefId = `comparison-${course1}-${course2}-${CURRENT_YEAR}`;
    const ref = db.collection('growth_content').doc(briefId);
    batch.set(ref, {
      title: `${label}: Which Certification Is Right for You in ${CURRENT_YEAR}?`,
      slug,
      courseId: course1,
      contentType: 'comparison',
      targetKeywords: [`${course1} vs ${course2}`, label.toLowerCase(), `${exam1} or ${exam2}`],
      primaryKeyword: `${course1} vs ${course2}`,
      wordCountTarget: 2500,
      internalLinks: [`/${course1}`, `/${course2}`, '/pricing'],
      ctaType: 'register',
      ctaUrl: '/',
      status: 'brief',
      priority: 1,
      outline: comparisonOutline,
      searchIntent: 'informational',
      estimatedVolume: 0,
      competitorUrls: [],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
    seeded++;
    batchCount++;
  }

  // ============================================================================
  // State CPA Requirement Briefs (54 total: 50 states + DC + territories)
  // ============================================================================
  const US_STATES = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming', 'District of Columbia', 'Puerto Rico', 'Guam', 'Virgin Islands',
  ];

  const slugifyState = (s) => s.toLowerCase().replace(/\s+/g, '-');

  for (const state of US_STATES) {
    const stateSlug = slugifyState(state);
    const slug = `cpa-requirements-${stateSlug}-${CURRENT_YEAR}`;
    
    if (existingSlugs.has(slug)) { skipped++; continue; }

    const stateOutline = [
      { heading: `CPA Requirements in ${state}`, level: 2, keyPoints: ['Overview of ${state} requirements', 'State board contact', 'Key differences from other states'], wordCount: 300 },
      { heading: `${state} Education Requirements`, level: 2, keyPoints: ['Degree requirements', 'Credit hours needed', 'Accounting hours', 'Business hours'], wordCount: 350 },
      { heading: `${state} Experience Requirements`, level: 2, keyPoints: ['Years of experience', 'Type of work required', 'Supervisor requirements', 'Part-time vs full-time'], wordCount: 300 },
      { heading: `${state} CPA Exam Application`, level: 2, keyPoints: ['How to apply', 'Application deadlines', 'Required documents', 'Background check'], wordCount: 300 },
      { heading: `${state} CPA License Fees`, level: 2, keyPoints: ['Application fee', 'Exam fees', 'License fee', 'Renewal costs'], wordCount: 250 },
      { heading: `CPA Reciprocity in ${state}`, level: 2, keyPoints: ['Transferring from other states', 'International requirements', 'Mobility agreements'], wordCount: 250 },
      { heading: 'How to Get Started', level: 2, keyPoints: ['Step-by-step guide', 'Timeline', 'Common mistakes to avoid'], wordCount: 250 },
    ];

    const briefId = `cpa-requirements-${stateSlug}-${CURRENT_YEAR}`;
    const ref = db.collection('growth_content').doc(briefId);
    batch.set(ref, {
      title: `CPA Requirements in ${state} ${CURRENT_YEAR}: Complete Guide`,
      slug,
      courseId: 'cpa',
      contentType: 'requirements',
      targetKeywords: [`cpa requirements ${state.toLowerCase()}`, `how to become a cpa in ${state.toLowerCase()}`, `cpa license ${state.toLowerCase()}`, `${state.toLowerCase()} cpa exam`],
      primaryKeyword: `cpa requirements ${state.toLowerCase()}`,
      wordCountTarget: 2000,
      internalLinks: ['/cpa', '/cpa/info', '/pricing'],
      ctaType: 'register',
      ctaUrl: '/cpa',
      status: 'brief',
      priority: ['California', 'Texas', 'New York', 'Florida'].includes(state) ? 2 : 3,
      outline: stateOutline,
      searchIntent: 'informational',
      estimatedVolume: ['California', 'Texas', 'New York', 'Florida'].includes(state) ? 2000 : 500,
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
    { loc: '/register', priority: '0.6', changefreq: 'monthly' },
    { loc: '/demo-practice', priority: '0.7', changefreq: 'monthly' },
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

// ============================================================================
// DYNAMIC RSS FEED — RSS 2.0 feed for blog articles
// ============================================================================

/**
 * Serves a dynamic RSS feed with the latest published blog articles.
 * Firebase Hosting rewrite: /feed.xml → this function.
 * Also available at /rss.xml and /rss
 * 
 * Use cases:
 * - IFTTT automation to post to Medium, Twitter, LinkedIn
 * - Podcast apps, RSS readers
 * - SEO (some crawlers follow RSS)
 */
exports.dynamicRssFeed = onRequest({
  cors: false,
  timeoutSeconds: 15,
}, async (req, res) => {
  const DOMAIN = 'https://voraprep.com';
  const FEED_TITLE = 'VoraPrep Blog — CPA, EA, CMA, CIA, CFP & CISA Exam Prep';
  const FEED_DESCRIPTION = 'Free study guides, practice questions, and exam tips for professional certification exams including CPA, Enrolled Agent (EA), CMA, CIA, CFP, and CISA.';
  const FEED_URL = `${DOMAIN}/feed.xml`;

  // Fetch latest 50 published articles
  const articles = [];
  try {
    const publishedSnapshot = await db.collection('growth_content')
      .where('status', '==', 'published')
      .orderBy('publishedAt', 'desc')
      .limit(50)
      .get();

    for (const doc of publishedSnapshot.docs) {
      const data = doc.data();
      if (!data.slug || !data.title) continue;

      const pubDate = data.publishedAt?.toDate?.()
        ? data.publishedAt.toDate().toUTCString()
        : new Date().toUTCString();
      
      // Get first 300 characters of content as description
      const rawContent = data.generatedContent || '';
      const description = rawContent
        .replace(/^(?:\*\*)?Meta\s*Description:?\*?\*?\s*.+\n+/im, '')
        .replace(/^---\n+/, '')
        .replace(/^#\s+.+\n+/, '')
        .replace(/[#*_\[\]()]/g, '')
        .substring(0, 300)
        .trim() + '...';

      articles.push({
        title: escapeXml(data.title),
        link: `${DOMAIN}/blog/${data.slug}`,
        guid: `${DOMAIN}/blog/${data.slug}`,
        pubDate,
        description: escapeXml(description),
        category: data.courseId?.toUpperCase() || 'Exam Prep',
      });
    }
  } catch (err) {
    console.error('[RSS] Error fetching published articles:', err);
  }

  // Generate RSS items
  const items = articles.map(a => `    <item>
      <title>${a.title}</title>
      <link>${a.link}</link>
      <guid isPermaLink="true">${a.guid}</guid>
      <pubDate>${a.pubDate}</pubDate>
      <description><![CDATA[${a.description}]]></description>
      <category>${a.category}</category>
    </item>`).join('\n');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${DOMAIN}/blog</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml"/>
    <image>
      <url>${DOMAIN}/logo.svg</url>
      <title>${escapeXml(FEED_TITLE)}</title>
      <link>${DOMAIN}</link>
    </image>
${items}
  </channel>
</rss>`;

  // Cache for 1 hour
  res.set('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  res.set('Content-Type', 'application/rss+xml; charset=utf-8');
  res.status(200).send(rssXml);
});

/**
 * Escape special characters for XML
 */
function escapeXml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// ============================================================================
// ADMIN SEND BULK EMAIL
// Send emails to selected users from Admin CMS
// Only admins can call this function
// ============================================================================

const ADMIN_WHITELIST = ['admin@voraprep.com', 'rob@sagecg.com', 'rob@voraprep.com'];

exports.adminSendBulkEmail = onCall({
  cors: true,
  invoker: 'public',
  enforceAppCheck: false,
  secrets: ['RESEND_API_KEY'],
}, async (request) => {
  // Validate user is authenticated
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'You must be logged in.');
  }
  
  // Verify admin status
  const callerEmail = request.auth.token.email;
  if (!callerEmail || !ADMIN_WHITELIST.includes(callerEmail)) {
    console.warn(`Non-admin attempted to send bulk email: ${callerEmail}`);
    throw new HttpsError('permission-denied', 'Only admins can send bulk emails.');
  }
  
  const { subject, body, recipients } = request.data;
  
  if (!subject || !body || !recipients || !Array.isArray(recipients)) {
    throw new HttpsError('invalid-argument', 'Missing subject, body, or recipients');
  }
  
  if (recipients.length === 0) {
    throw new HttpsError('invalid-argument', 'No recipients provided');
  }
  
  if (recipients.length > 100) {
    throw new HttpsError('invalid-argument', 'Cannot send to more than 100 recipients at once');
  }
  
  if (!resend) {
    throw new HttpsError('failed-precondition', 'Email service not configured');
  }
  
  console.log(`Admin ${callerEmail} sending bulk email to ${recipients.length} users. Subject: ${subject}`);
  
  const results = { sent: 0, failed: 0, errors: [] };
  
  for (const recipient of recipients) {
    if (!recipient.email) {
      results.failed++;
      continue;
    }
    
    // Template substitution
    const personalizedBody = body
      .replace(/\{\{name\}\}/g, recipient.name || 'User')
      .replace(/\{\{email\}\}/g, recipient.email);
    
    try {
      await resend.emails.send({
        from: 'Rob from VoraPrep <rob@voraprep.com>',
        replyTo: 'rob@voraprep.com',
        to: recipient.email,
        subject: subject,
        html: generateAdminBulkEmailHtml(personalizedBody, recipient.name || 'User'),
      });
      results.sent++;
    } catch (err) {
      console.error(`Failed to send to ${recipient.email}:`, err);
      results.failed++;
      results.errors.push({ email: recipient.email, error: err.message });
    }
  }
  
  console.log(`Bulk email complete: ${results.sent} sent, ${results.failed} failed`);
  
  // Log email to history collection
  try {
    const emailHistoryRef = db.collection('emailHistory').doc();
    await emailHistoryRef.set({
      id: emailHistoryRef.id,
      subject: subject,
      body: body, // Original template (before substitution)
      recipientCount: recipients.length,
      sentCount: results.sent,
      failedCount: results.failed,
      recipients: recipients.map(r => ({
        email: r.email,
        name: r.name || 'User',
        uid: r.uid || null,
      })),
      sentBy: callerEmail,
      sentAt: admin.firestore.FieldValue.serverTimestamp(),
      errors: results.errors.slice(0, 10), // Store first 10 errors
    });
    console.log(`Email history logged: ${emailHistoryRef.id}`);
  } catch (logErr) {
    console.error('Failed to log email history:', logErr);
    // Don't fail the request if logging fails
  }
  
  return { 
    success: true, 
    sent: results.sent, 
    failed: results.failed,
    errors: results.errors.slice(0, 5) // Only return first 5 errors
  };
});

// Generate HTML email template for admin bulk emails
function generateAdminBulkEmailHtml(body, recipientName) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VoraPrep</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 24px; text-align: center; border-radius: 12px 12px 0 0;">
      <img src="https://voraprep.com/voraprep-logo-white.png" alt="VoraPrep" style="height: 40px; width: auto;" />
    </div>
    <div style="background: white; padding: 32px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
      <p style="margin: 0 0 16px 0; color: #374151; font-size: 16px; line-height: 1.6;">
        Hi ${recipientName},
      </p>
      <div style="color: #374151; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">
${body}
      </div>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
      <p style="margin: 0; color: #6b7280; font-size: 14px;">
        Best,<br/>
        The VoraPrep Team
      </p>
    </div>
    <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
      <p style="margin: 0;">VoraPrep - AI-Powered Exam Prep</p>
      <p style="margin: 8px 0 0 0;">
        <a href="https://voraprep.com" style="color: #3b82f6; text-decoration: none;">voraprep.com</a>
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

// ============================================================================
// ADMIN: SYNC USER EMAILS FROM FIREBASE AUTH TO FIRESTORE
// Fixes users who signed up (especially via Google) but email wasn't saved to Firestore
// ============================================================================

exports.adminSyncUserEmails = onCall({
  cors: true,
  invoker: 'public',
  enforceAppCheck: false,
}, async (request) => {
  // Validate user is authenticated
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'You must be logged in.');
  }
  
  // Verify admin status
  const callerEmail = request.auth.token.email;
  if (!callerEmail || !ADMIN_WHITELIST.includes(callerEmail)) {
    console.warn(`Non-admin attempted to sync emails: ${callerEmail}`);
    throw new HttpsError('permission-denied', 'Only admins can sync user emails.');
  }
  
  console.log(`Admin ${callerEmail} initiated user email sync`);
  
  const results = { 
    total: 0,
    updated: 0, 
    alreadyHasEmail: 0,
    noAuthEmail: 0,
    errors: [] 
  };
  
  try {
    // Get all users from Firestore
    const usersSnapshot = await db.collection('users').get();
    results.total = usersSnapshot.size;
    
    console.log(`Processing ${results.total} users...`);
    
    // Process in batches of 10 to avoid overwhelming Auth API
    const batch = db.batch();
    let batchCount = 0;
    
    for (const userDoc of usersSnapshot.docs) {
      const firestoreData = userDoc.data();
      const firestoreEmail = firestoreData.email;
      
      // Skip if Firestore already has a valid email
      if (firestoreEmail && firestoreEmail.trim() !== '' && firestoreEmail.includes('@')) {
        results.alreadyHasEmail++;
        continue;
      }
      
      // Try to get email from Firebase Auth
      try {
        const authUser = await admin.auth().getUser(userDoc.id);
        
        if (authUser.email) {
          // Update Firestore with the email from Auth
          const updates = { 
            email: authUser.email,
            emailSyncedAt: admin.firestore.FieldValue.serverTimestamp()
          };
          
          // Also sync displayName and photoURL if missing
          if (!firestoreData.displayName && authUser.displayName) {
            updates.displayName = authUser.displayName;
          }
          if (!firestoreData.photoURL && authUser.photoURL) {
            updates.photoURL = authUser.photoURL;
          }
          
          batch.update(db.collection('users').doc(userDoc.id), updates);
          batchCount++;
          results.updated++;
          
          console.log(`Will update user ${userDoc.id}: ${authUser.email}`);
          
          // Commit batch every 500 writes
          if (batchCount >= 500) {
            await batch.commit();
            batchCount = 0;
          }
        } else {
          results.noAuthEmail++;
          console.log(`User ${userDoc.id} has no email in Auth either (anonymous?)`);
        }
      } catch (authError) {
        // User might not exist in Auth (deleted?) or other error
        console.warn(`Could not get Auth user ${userDoc.id}:`, authError.message);
        results.errors.push({ uid: userDoc.id, error: authError.message });
      }
    }
    
    // Commit any remaining updates
    if (batchCount > 0) {
      await batch.commit();
    }
    
    console.log(`Email sync complete:`, results);
    
    return { 
      success: true,
      ...results
    };
    
  } catch (error) {
    console.error('Email sync failed:', error);
    throw new HttpsError('internal', `Email sync failed: ${error.message}`);
  }
});

// ============================================================================
// ADMIN: SEND EMAIL TO USER
// Allows admins to send custom emails (e.g., responding to question reports)
// ============================================================================

const ADMIN_FROM_EMAIL = 'Rob from VoraPrep <rob@voraprep.com>';

exports.sendAdminEmail = onCall({
  cors: true,
  invoker: 'public',
  enforceAppCheck: false,
  secrets: ['RESEND_API_KEY'],
}, async (request) => {
  // Require authentication
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'You must be logged in.');
  }

  const userId = request.auth.uid;
  
  // Check if user is admin
  const userDoc = await db.collection('users').doc(userId).get();
  if (!userDoc.exists || !userDoc.data()?.isAdmin) {
    throw new HttpsError('permission-denied', 'Admin access required.');
  }

  const { to, subject, body, reportId } = request.data;

  if (!to || !subject || !body) {
    throw new HttpsError('invalid-argument', 'Missing required fields: to, subject, body');
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(to)) {
    throw new HttpsError('invalid-argument', 'Invalid email address');
  }

  // Rate limit: 20 admin emails per hour per admin
  await enforceRateLimit(userId, 'adminEmail', 20);

  // Lazy-initialize Resend client
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new HttpsError('failed-precondition', 'Email service not configured.');
  }
  const resendClient = new Resend(apiKey);

  try {
    // Send email
    const { data, error } = await resendClient.emails.send({
      from: ADMIN_FROM_EMAIL,
      to: to,
      subject: subject,
      html: generateAdminEmailHTML(body),
      replyTo: 'rob@voraprep.com',
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error(error.message);
    }

    console.log(`Admin email sent to ${to} by ${userId}, email ID: ${data?.id}`);

    // If this is a response to a question report, mark it as resolved
    if (reportId) {
      try {
        await db.collection('questionReports').doc(reportId).update({
          status: 'resolved',
          resolvedAt: admin.firestore.FieldValue.serverTimestamp(),
          resolvedBy: userId,
          responseEmailId: data?.id,
        });
        console.log(`Question report ${reportId} marked as resolved`);
      } catch (reportError) {
        console.error(`Failed to update report ${reportId}:`, reportError);
        // Don't fail the function if report update fails
      }
    }

    return { success: true, emailId: data?.id };
  } catch (error) {
    console.error('Admin email error:', error);
    throw new HttpsError('internal', `Failed to send email: ${error.message}`);
  }
});

// Admin Email HTML Template - Simple professional format
function generateAdminEmailHTML(body) {
  // Convert newlines to <br> and wrap in paragraph
  const formattedBody = body.replace(/\n/g, '<br>');
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Message from VoraPrep</title>
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
      <div style="color: #1f2937; font-size: 16px; line-height: 1.7;">
        ${formattedBody}
      </div>
    </div>
    
    <!-- Footer -->
    <div style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 30px; padding: 20px;">
      <p style="margin: 0;">
        <strong>VoraPrep</strong> - Your AI-Powered Exam Prep Partner
      </p>
      <p style="margin: 15px 0 0 0;">
        <a href="https://voraprep.com" style="color: #3b82f6; text-decoration: none;">voraprep.com</a>
      </p>
    </div>
    
  </div>
  
</body>
</html>
  `;
}

// ============================================================================
// EXPORT ARTICLES — Returns published articles as JSON for Astro blog build
// ============================================================================

/**
 * Export published articles as JSON.
 * Called by GitHub Actions during blog build to get fresh article data.
 * 
 * Returns: Array of published articles with all needed fields for static rendering.
 */
exports.exportArticles = onRequest({
  cors: true,
  timeoutSeconds: 30,
}, async (req, res) => {
  try {
    const snapshot = await db.collection('growth_content')
      .where('status', '==', 'published')
      .orderBy('publishedAt', 'desc')
      .limit(200)
      .get();

    const articles = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        slug: data.slug,
        title: data.title,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        courseId: data.courseId,
        section: data.section,
        contentType: data.contentType,
        primaryKeyword: data.primaryKeyword,
        generatedContent: data.generatedContent,
        publishedAt: data.publishedAt?.toDate?.().toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.().toISOString(),
        ogImage: data.ogImage,
        author: data.author || 'VoraPrep Team',
      };
    });

    // Cache for 5 minutes
    res.set('Cache-Control', 'public, max-age=300, s-maxage=300');
    res.json({ articles, count: articles.length });
  } catch (err) {
    console.error('[ExportArticles] Error:', err);
    res.status(500).json({ error: 'Failed to export articles', message: err.message });
  }
});

// ============================================================================
// COMMUNICATION TEMPLATE MANAGEMENT
// Admin functions for managing email/notification templates
// ============================================================================

/**
 * Seed default templates to Firestore.
 * Only creates templates that don't already exist.
 * Admin-only callable function.
 */
exports.seedCommunicationTemplates = onCall({
  cors: true,
  enforceAppCheck: false,
}, async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Authentication required.');
  }

  // Admin check
  const userDoc = await db.collection('users').doc(request.auth.uid).get();
  if (!userDoc.exists || !userDoc.data()?.isAdmin) {
    throw new HttpsError('permission-denied', 'Admin access required.');
  }

  console.log('[Templates] Seeding default templates...');

  let created = 0;
  let skipped = 0;

  for (const [templateId, template] of Object.entries(DEFAULT_TEMPLATES)) {
    const docRef = db.collection('communication_templates').doc(templateId);
    const existing = await docRef.get();

    if (existing.exists) {
      skipped++;
      console.log(`[Templates] Skipping ${templateId} - already exists`);
      continue;
    }

    await docRef.set({
      ...template,
      id: templateId,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    created++;
    console.log(`[Templates] Created ${templateId}`);
  }

  console.log(`[Templates] Seeding complete: ${created} created, ${skipped} skipped`);
  return { success: true, created, skipped, total: Object.keys(DEFAULT_TEMPLATES).length };
});

/**
 * Update a communication template.
 * Admin-only callable function.
 */
exports.updateCommunicationTemplate = onCall({
  cors: true,
  enforceAppCheck: false,
}, async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Authentication required.');
  }

  // Admin check
  const userDoc = await db.collection('users').doc(request.auth.uid).get();
  if (!userDoc.exists || !userDoc.data()?.isAdmin) {
    throw new HttpsError('permission-denied', 'Admin access required.');
  }

  const { templateId, updates } = request.data;
  if (!templateId) {
    throw new HttpsError('invalid-argument', 'templateId is required');
  }

  // Validate allowed update fields
  const allowedFields = ['subject', 'body', 'enabled', 'name', 'description'];
  const sanitizedUpdates = {};
  for (const [key, value] of Object.entries(updates || {})) {
    if (allowedFields.includes(key)) {
      sanitizedUpdates[key] = value;
    }
  }

  if (Object.keys(sanitizedUpdates).length === 0) {
    throw new HttpsError('invalid-argument', 'No valid update fields provided');
  }

  const docRef = db.collection('communication_templates').doc(templateId);
  const existing = await docRef.get();

  if (!existing.exists) {
    // Create from default if it exists
    const defaultTemplate = DEFAULT_TEMPLATES[templateId];
    if (defaultTemplate) {
      await docRef.set({
        ...defaultTemplate,
        ...sanitizedUpdates,
        id: templateId,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      console.log(`[Templates] Created ${templateId} from default with updates`);
    } else {
      throw new HttpsError('not-found', `Template ${templateId} not found`);
    }
  } else {
    await docRef.update({
      ...sanitizedUpdates,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log(`[Templates] Updated ${templateId}`);
  }

  return { success: true, templateId };
});

/**
 * Get all communication templates.
 * Returns templates from Firestore merged with defaults.
 * Admin-only callable function.
 */
exports.getCommunicationTemplates = onCall({
  cors: true,
  enforceAppCheck: false,
}, async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Authentication required.');
  }

  // Admin check
  const userDoc = await db.collection('users').doc(request.auth.uid).get();
  if (!userDoc.exists || !userDoc.data()?.isAdmin) {
    throw new HttpsError('permission-denied', 'Admin access required.');
  }

  // Get templates from Firestore
  const snapshot = await db.collection('communication_templates').get();
  const firestoreTemplates = {};
  snapshot.forEach(doc => {
    firestoreTemplates[doc.id] = { id: doc.id, ...doc.data() };
  });

  // Merge with defaults (Firestore takes precedence)
  const templates = [];
  for (const [templateId, defaultTemplate] of Object.entries(DEFAULT_TEMPLATES)) {
    if (firestoreTemplates[templateId]) {
      templates.push({
        ...defaultTemplate,
        ...firestoreTemplates[templateId],
        isCustomized: true,
      });
    } else {
      templates.push({
        ...defaultTemplate,
        id: templateId,
        isCustomized: false,
      });
    }
  }

  // Add any Firestore templates not in defaults (custom templates)
  for (const [templateId, template] of Object.entries(firestoreTemplates)) {
    if (!DEFAULT_TEMPLATES[templateId]) {
      templates.push({
        ...template,
        isCustomized: true,
        isCustom: true,
      });
    }
  }

  return { templates };
});

// ============================================================================
// ARTICLE PUBLICATION NOTIFICATION
// Sends email to admin when an article is published via SEO Engine
// ============================================================================

const BLOG_ADMIN_EMAIL = 'rob@sagecg.com';
const BLOG_BASE_URL = 'https://voraprep.com/blog';

/**
 * Firestore trigger: sends email notification when an article is published.
 * Watches for status changing to 'published' in growth_content collection.
 */
exports.onArticlePublished = onDocumentUpdated({
  document: 'growth_content/{articleId}',
  secrets: ['RESEND_API_KEY'],
}, async (event) => {
  const beforeData = event.data.before.data();
  const afterData = event.data.after.data();
  const articleId = event.params.articleId;

  // Only trigger when status changes TO 'published'
  if (beforeData.status === afterData.status || afterData.status !== 'published') {
    return null;
  }

  console.log(`[ArticlePublished] Article published: ${articleId}`);

  // Get Resend API key
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.warn('[ArticlePublished] RESEND_API_KEY not set, skipping email notification');
    return null;
  }

  const resendClient = new Resend(apiKey);
  
  // Build article info
  const title = afterData.title || articleId;
  const slug = afterData.slug || articleId;
  const courseId = afterData.courseId || 'unknown';
  const section = afterData.section || '';
  const contentType = afterData.contentType || 'article';
  const primaryKeyword = afterData.primaryKeyword || '';
  const publishedAt = afterData.publishedAt?.toDate?.() || new Date();

  // Generate URLs for different channels
  const blogUrl = `${BLOG_BASE_URL}/${slug}/`;
  const sitemapUrl = 'https://voraprep.com/sitemap.xml';
  const rssUrl = 'https://voraprep.com/rss.xml';

  // Build email HTML
  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f1f5f9;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 30px;">
      <table cellpadding="0" cellspacing="0" border="0" align="center">
        <tr>
          <td style="width: 40px; height: 40px; background-color: #1a73e8; border-radius: 10px; text-align: center; vertical-align: middle; font-size: 20px; color: white; font-weight: bold; line-height: 40px;">V</td>
          <td style="padding-left: 10px; font-size: 24px; font-weight: 700; color: #0f172a; vertical-align: middle;">VoraPrep</td>
        </tr>
      </table>
    </div>

    <!-- Main Content -->
    <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
      
      <h1 style="color: #0f172a; font-size: 24px; margin: 0 0 20px 0; text-align: center;">
        📝 New Article Published
      </h1>

      <!-- Article Details -->
      <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0;">
        <h2 style="color: #0f172a; font-size: 18px; margin: 0 0 15px 0;">${title}</h2>
        <table style="width: 100%; font-size: 14px; color: #475569;">
          <tr>
            <td style="padding: 8px 0; font-weight: 600;">Course:</td>
            <td style="padding: 8px 0;">${courseId.toUpperCase()}</td>
          </tr>
          ${section ? `<tr>
            <td style="padding: 8px 0; font-weight: 600;">Section:</td>
            <td style="padding: 8px 0;">${section}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 8px 0; font-weight: 600;">Type:</td>
            <td style="padding: 8px 0;">${contentType}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600;">Keyword:</td>
            <td style="padding: 8px 0;">${primaryKeyword || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600;">Published:</td>
            <td style="padding: 8px 0;">${publishedAt.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</td>
          </tr>
        </table>
      </div>

      <!-- Channel Status -->
      <h3 style="color: #0f172a; font-size: 16px; margin: 25px 0 15px 0;">📍 Where It's Published</h3>
      
      <div style="font-size: 14px; line-height: 1.8; color: #475569;">
        <p style="margin: 0 0 10px 0;">
          <strong>✅ Firestore:</strong> Live in <code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">growth_content</code>
        </p>
        <p style="margin: 0 0 10px 0;">
          <strong>✅ Blog:</strong> <a href="${blogUrl}" style="color: #3b82f6;">${blogUrl}</a>
        </p>
        <p style="margin: 0 0 10px 0;">
          <strong>✅ Sitemap:</strong> <a href="${sitemapUrl}" style="color: #3b82f6;">sitemap.xml</a> (auto-updated)
        </p>
        <p style="margin: 0 0 10px 0;">
          <strong>✅ RSS:</strong> <a href="${rssUrl}" style="color: #3b82f6;">rss.xml</a> (auto-updated)
        </p>
      </div>

      <!-- Next Steps -->
      <h3 style="color: #0f172a; font-size: 16px; margin: 25px 0 15px 0;">🚀 Next Steps</h3>
      
      <div style="font-size: 14px; line-height: 1.8; color: #475569;">
        <p style="margin: 0 0 8px 0;">1. <strong>Verify the article:</strong></p>
        <code style="display: block; background: #1e293b; color: #e2e8f0; padding: 12px; border-radius: 8px; margin: 0 0 15px 0; font-size: 13px; overflow-x: auto;">npm run verify:article ${slug}</code>
        
        <p style="margin: 0 0 8px 0;">2. <strong>Share on LinkedIn:</strong> Copy this URL once verified</p>
        <code style="display: block; background: #f1f5f9; color: #1e293b; padding: 12px; border-radius: 8px; margin: 0 0 15px 0; font-size: 13px; word-break: break-all;">${blogUrl}</code>
        
        <p style="margin: 0;">3. <strong>Static blog deploy</strong> will run automatically at 6 AM UTC (or trigger manually in GitHub Actions)</p>
      </div>

      <!-- CTA Button -->
      <div style="text-align: center; margin: 30px 0 10px 0;">
        <a href="${blogUrl}" style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 14px 35px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px;">
          View Article →
        </a>
      </div>
      
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 30px; color: #64748b; font-size: 13px;">
      <p style="margin: 0;">This is an automated notification from VoraPrep SEO Engine.</p>
      <p style="margin: 5px 0 0 0;">You're receiving this because you're an admin at VoraPrep.</p>
    </div>

  </div>
</body>
</html>
  `;

  try {
    const { error } = await resendClient.emails.send({
      from: FROM_EMAIL,
      to: BLOG_ADMIN_EMAIL,
      subject: `📝 Article Published: ${title}`,
      html: emailHtml,
    });

    if (error) {
      console.error('[ArticlePublished] Email send error:', error);
      return null;
    }

    console.log(`[ArticlePublished] Notification sent to ${BLOG_ADMIN_EMAIL}`);
    return { success: true };
  } catch (err) {
    console.error('[ArticlePublished] Failed to send notification:', err);
    return null;
  }
});

// ============================================================================
// ORPHANED USER DETECTION AND REPAIR
// Find users in Firebase Auth who don't have Firestore documents
// ============================================================================

/**
 * Find orphaned users: Auth users without proper Firestore documents.
 * Admin-only callable function.
 * 
 * @param {Object} data.fix - If true, create missing Firestore documents
 * @returns {Object} { total, orphaned, fixed, users[] }
 */
exports.findOrphanedUsers = onCall({
  cors: true,
  enforceAppCheck: false,
  timeoutSeconds: 300,
  memory: '512MiB',
}, async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Authentication required.');
  }

  // Admin check
  const userDoc = await db.collection('users').doc(request.auth.uid).get();
  if (!userDoc.exists || !userDoc.data()?.isAdmin) {
    throw new HttpsError('permission-denied', 'Admin access required.');
  }

  const shouldFix = request.data?.fix === true;
  console.log(`[OrphanedUsers] Starting scan. Fix mode: ${shouldFix}`);

  // Get all Firebase Auth users
  let authUsers = [];
  let nextPageToken;
  
  do {
    const listResult = await admin.auth().listUsers(1000, nextPageToken);
    authUsers = authUsers.concat(listResult.users);
    nextPageToken = listResult.pageToken;
  } while (nextPageToken);

  console.log(`[OrphanedUsers] Found ${authUsers.length} auth users`);

  // Check each for Firestore document
  const orphaned = [];
  
  for (const user of authUsers) {
    const docSnap = await db.collection('users').doc(user.uid).get();
    const data = docSnap.data() || {};
    
    // Check if document has actual user fields (not just subcollections)
    const hasActualFields = data.email || data.displayName || data.createdAt;
    
    if (!docSnap.exists || !hasActualFields) {
      orphaned.push({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified,
        createdAt: user.metadata?.creationTime,
        hasGhostDoc: docSnap.exists && !hasActualFields,
      });
    }
  }

  console.log(`[OrphanedUsers] Found ${orphaned.length} orphaned users`);

  // Fix if requested
  let fixed = 0;
  if (shouldFix && orphaned.length > 0) {
    for (const user of orphaned) {
      const profile = {
        email: user.email || '',
        displayName: user.displayName || user.email?.split('@')[0] || 'User',
        createdAt: user.createdAt 
          ? admin.firestore.Timestamp.fromDate(new Date(user.createdAt))
          : admin.firestore.FieldValue.serverTimestamp(),
        activeCourse: 'cpa', // Default
        onboardingComplete: false,
        dailyGoal: 50,
        settings: {
          notifications: true,
          darkMode: false,
          soundEffects: true,
        },
        _repairedAt: admin.firestore.FieldValue.serverTimestamp(),
        _repairReason: 'orphaned_auth_user_admin_fix',
      };

      try {
        await db.collection('users').doc(user.uid).set(profile, { merge: true });
        fixed++;
        console.log(`[OrphanedUsers] Fixed: ${user.email || user.uid}`);
      } catch (err) {
        console.error(`[OrphanedUsers] Failed to fix ${user.uid}:`, err.message);
      }
    }
  }

  console.log(`[OrphanedUsers] Complete. Orphaned: ${orphaned.length}, Fixed: ${fixed}`);

  // Also count soft-deleted and total Firestore users for debugging
  let softDeleted = 0;
  let firestoreTotal = 0;
  const allUsersSnap = await db.collection('users').get();
  firestoreTotal = allUsersSnap.size;
  allUsersSnap.forEach(doc => {
    if (doc.data().deletedAt) softDeleted++;
  });

  console.log(`[OrphanedUsers] Firestore docs: ${firestoreTotal}, Soft-deleted: ${softDeleted}`);

  return {
    total: authUsers.length,
    orphaned: orphaned.length,
    fixed,
    firestoreTotal,
    softDeleted,
    activeUsers: firestoreTotal - softDeleted,
    users: orphaned.map(u => ({
      uid: u.uid,
      email: u.email,
      displayName: u.displayName,
      hasGhostDoc: u.hasGhostDoc,
    })),
  };
});

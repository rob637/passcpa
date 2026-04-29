#!/usr/bin/env node

/**
 * send-winback-emails.cjs
 *
 * Win-back / re-engagement campaign for past users.
 * Leads with two real changes since they last looked at us:
 *   1. Founder pricing on the full prep (CPA $249/yr, etc.), plus 20% off with WELCOMEBACK
 *   2. Daily CPA SMS — 5 free questions/day during a 3-day trial, then 10/25/50 by tier
 *   2. Daily CPA SMS — one MCQ a day by text, no app required
 *
 * Strategy:
 *   - Cohort segmentation (we tailor opener + subject per cohort):
 *       A. churned_paid       — had an active sub that lapsed/cancelled
 *       B. trial_no_convert   — signed up, never paid (founder-recovery audience)
 *       C. dormant_signup     — created account, never finished onboarding
 *   - One primary CTA (zero-friction): start the SMS engine free
 *   - One secondary CTA: annual founder pricing with WELCOMEBACK 20% coupon pre-applied
 *   - Founder reply-prompt — one sentence: "what would have made it work?"
 *   - List-Unsubscribe one-click + plain-text alt for inbox placement
 *   - Per-recipient UTM and Firestore write-back to prevent re-sends
 *
 * Usage:
 *   # Preview (default — sends nothing)
 *   node scripts/send-winback-emails.cjs --dry-run
 *
 *   # Test address (one email, you preview the rendered HTML in your inbox)
 *   RESEND_API_KEY=re_xxx node scripts/send-winback-emails.cjs --test you@example.com --cohort churned_paid
 *
 *   # Send a SAMPLE of every cohort + variant (6 emails) to one address — for QA
 *   RESEND_API_KEY=re_xxx node scripts/send-winback-emails.cjs --samples-to you@example.com
 *
 *   # Small live batch
 *   RESEND_API_KEY=re_xxx node scripts/send-winback-emails.cjs --send --limit 10
 *
 *   # Full send for one cohort
 *   RESEND_API_KEY=re_xxx node scripts/send-winback-emails.cjs --send --cohort trial_no_convert
 *
 *   # Full send everyone eligible
 *   RESEND_API_KEY=re_xxx node scripts/send-winback-emails.cjs --send
 *
 * Required env:
 *   RESEND_API_KEY                — Resend API key (live send only)
 *   GOOGLE_APPLICATION_CREDENTIALS or serviceAccountKey.json
 *
 * Optional flags:
 *   --since-days N                — only users created in last N days (default 365)
 *   --course CPA|EA|CMA|CIA|CISA|CFP   — restrict to one course
 *   --cohort churned_paid|trial_no_convert|dormant_signup
 *   --limit N                     — cap recipients
 *   --bcc rob@voraprep.com        — bcc yourself for spot-check
 *   --no-track                    — don't write Firestore send record (for testing)
 *   --variant a|b                 — force subject variant (default: 50/50 hash split)
 */

const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

let admin;
try {
  admin = require('firebase-admin');
} catch {
  admin = require('../functions/node_modules/firebase-admin');
}

let Resend;
try {
  ({ Resend } = require('../functions/node_modules/resend'));
} catch {
  console.error('Error: resend package not found. Run: cd functions && npm install');
  process.exit(1);
}

// ============================================================================
// CONFIG
// ============================================================================

const CAMPAIGN_ID = 'winback-2026-04';
// SAVE20 supersedes WELCOMEBACK as of 2026-04-29: 20% off works on BOTH monthly (repeating 3 mo)
// AND annual (20% off year 1). Same expiry. See scripts/create-save20-coupon.cjs.
// Drip dedup key (CAMPAIGN_ID) is unchanged so already-sent recipients are NOT re-emailed.
const COUPON_CODE = 'SAVE20';
const COUPON_PERCENT_OFF = 20;
const MONTHLY_PROMO_CODE = 'START9';                  // $20 off first month → $9 first month, then $29/mo — see scripts/create-start9-coupon.cjs
const MONTHLY_PROMO_FIRST_MONTH = 9;                  // dollars
// Pulled live from Stripe (promo_1TQUpBPqkAyq1xlwSABx8Bcd, expires_at = 1779032545).
// If we extend the coupon, update this value AND re-run --samples-to to QA the new copy.
const COUPON_EXPIRES_ISO = '2026-05-26';
function formatExpiry(iso = COUPON_EXPIRES_ISO) {
  // "May 26" — short, scannable, no year (urgency).
  const d = new Date(iso + 'T00:00:00Z');
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' });
}
function daysUntilExpiry(iso = COUPON_EXPIRES_ISO) {
  const ms = new Date(iso + 'T23:59:59Z').getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

// Per-course founder pricing — MUST match src/services/subscription.ts EXAM_PRICING.
// This is the live Stripe price. Update both files together if pricing changes.
const FOUNDER_ANNUAL = {
  cpa:  249, ea: 149, cma: 199, cia: 149, cfp: 199, cisa: 199,
};
const FOUNDER_MONTHLY = {
  cpa:   29, ea:  19, cma:  25, cia:  19, cfp:  25, cisa:  25,
};
const founderAnnual    = (id) => FOUNDER_ANNUAL[id]  || FOUNDER_ANNUAL.cpa;
const founderMonthly   = (id) => FOUNDER_MONTHLY[id] || FOUNDER_MONTHLY.cpa;
const discountedAnnual = (id) => Math.round(founderAnnual(id) * (1 - COUPON_PERCENT_OFF / 100));
// Effective monthly cost when paying annual (rounded to whole dollar) — used for "just $X/mo" framing
const annualAsMonthly  = (id) => Math.round(discountedAnnual(id) / 12);
const FROM_EMAIL  = 'Rob from VoraPrep <rob@voraprep.com>';
const REPLY_TO    = 'rob@voraprep.com';
const BASE_URL    = process.env.WINBACK_BASE_URL || 'https://voraprep.com';

// Throttle (Resend free = 2 req/s). We're well below that on purpose — fresh sending
// domains get burned by bursts. 1.2s between sends + a longer mini-batch pause every
// BATCH_SIZE emails (see CLI section).
const THROTTLE_MS = 1200;

// ============================================================================
// CLI
// ============================================================================

const args = process.argv.slice(2);
const dryRun       = !args.includes('--send');
const skipTracking = args.includes('--no-track');
const flag = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : null; };
const testEmail    = flag('--test');
const samplesTo    = flag('--samples-to');           // send all 6 cohort×variant combos to one address
const limit        = flag('--limit') ? parseInt(flag('--limit'), 10) : null;
const sinceDays    = flag('--since-days') ? parseInt(flag('--since-days'), 10) : 365;
const courseFilter = flag('--course') ? flag('--course').toLowerCase() : null;
const cohortFilter = flag('--cohort');                // optional: restrict to one cohort
// Founder oversight: by default every live send is BCC'd to the founder so they
// can see exactly what each cohort received. Override with --bcc <email> or disable
// with --no-bcc.
const DEFAULT_BCC = 'rob@sagecg.com';
const bccAddress = args.includes('--no-bcc')
  ? null
  : (flag('--bcc') || DEFAULT_BCC);
const forcedVariant = flag('--variant');              // 'a' or 'b'
// Drip step: 1 = launch (changes), 2 = pass-guarantee, 3 = deadline,
//            4 = SMS pitch (CPA only), 5 = free sample MCQ, 6 = founder ask.
// Each step writes its own Firestore sentAt key so dedup is per-step.
const stepArg = flag('--step');
const STEP = stepArg ? parseInt(stepArg, 10) : 1;
if (![1, 2, 3, 4, 5, 6].includes(STEP)) {
  console.error(`Error: --step must be 1–6 (got "${stepArg}")`);
  process.exit(1);
}
// CPA-only steps (SMS engine doesn't exist for other exams yet)
const CPA_ONLY_STEPS = new Set([4]);
// Send-all-steps is a samples-only convenience: render all 3 steps × 2 variants × 3 cohorts = 18 emails to one address.
const allSteps = args.includes('--all-steps');
// Drip-step gap enforcement: step 2 only fires after N days since step 1; step 3 after M days.
// Defaults are conservative for inbox-reputation reasons; can override per-run if needed.
const DEFAULT_GAP_DAYS = { 2: 4, 3: 7, 4: 10, 5: 14, 6: 18 };
const minGapDays = flag('--min-gap-days')
  ? parseInt(flag('--min-gap-days'), 10)
  : (DEFAULT_GAP_DAYS[STEP] || 0);
// Warmup pacing: keep daily volume low and pause between mini-batches so we look like
// a human inbox, not a blast. Resend free tier is 2 req/s; we go slower than that on purpose
// during the first week of sends to a fresh sending domain.
const BATCH_SIZE         = parseInt(flag('--batch-size') || '20', 10);  // emails per mini-batch
const BATCH_PAUSE_MS     = parseInt(flag('--batch-pause') || '90000', 10); // 90s between mini-batches

// ============================================================================
// COURSES
// ============================================================================

const COURSE_INFO = {
  cpa:  { name: 'CPA',  full: 'CPA Exam',           dailyPath: '/daily-cpa' },
  ea:   { name: 'EA',   full: 'Enrolled Agent Exam', dailyPath: '/daily-cpa' }, // SMS engine is CPA-only today; CTA still helps engagement
  cma:  { name: 'CMA',  full: 'CMA Exam',           dailyPath: '/daily-cpa' },
  cia:  { name: 'CIA',  full: 'CIA Exam',           dailyPath: '/daily-cpa' },
  cisa: { name: 'CISA', full: 'CISA Exam',          dailyPath: '/daily-cpa' },
  cfp:  { name: 'CFP',  full: 'CFP Exam',           dailyPath: '/daily-cpa' },
};
const getCourseInfo = (id) => COURSE_INFO[id] || COURSE_INFO.cpa;

// ============================================================================
// COHORT — drives opener and subject line
// ============================================================================

/**
 * Returns cohort + a one-sentence opener tailored to that cohort.
 * Cohort priority: churned_paid > trial_no_convert > dormant_signup.
 */
function classifyCohort({ profile, subStatus, hasOnboarded }) {
  if (subStatus && ['canceled', 'cancelled', 'unpaid', 'incomplete_expired'].includes(subStatus)) {
    return 'churned_paid';
  }
  if (profile && (profile.trialStartedAt || profile.lastActiveAt) && !hasOnboarded) {
    return 'trial_no_convert';
  }
  return 'dormant_signup';
}

const COHORT_OPENERS = {
  churned_paid:     (c) => `You were studying for the ${c.name} with us a while back, and then we lost you. I want to know why — and I want to make it worth coming back.`,
  trial_no_convert: (c) => `You signed up to try ${c.name} prep with us, didn't continue, and I've been wondering what would have made it actually work for you.`,
  dormant_signup:   (c) => `You created a VoraPrep account for the ${c.name} but we never really got going. Here's what's changed since then.`,
};

// ============================================================================
// SUBJECT VARIANTS — A/B at the inbox level
// ============================================================================

const SUBJECT_VARIANTS = {
  // Lowest-friction framing: monthly price, cancel-anytime implied.
  // Drives clicks from people who couldn't commit to a year before.
  a: (c, courseId) => `${c.name} prep is $${founderMonthly(courseId)}/mo — pick up where you left off`,
  // Curiosity + founder voice.
  b: (c) => `Two things changed since you last tried VoraPrep`,
};

function pickVariant(uidOrEmail) {
  if (forcedVariant === 'a' || forcedVariant === 'b') return forcedVariant;
  // Stable 50/50 split per recipient — same person always sees same variant.
  const h = crypto.createHash('sha1').update(String(uidOrEmail)).digest('hex');
  return parseInt(h.slice(0, 2), 16) % 2 === 0 ? 'a' : 'b';
}

// ============================================================================
// LINKS
// ============================================================================

function utm(target, { uid, cohort, variant, course }) {
  const u = new URL(target.startsWith('http') ? target : BASE_URL + target);
  u.searchParams.set('utm_source', 'email');
  u.searchParams.set('utm_medium', 'winback');
  u.searchParams.set('utm_campaign', CAMPAIGN_ID);
  u.searchParams.set('utm_content', `${cohort}_${variant}`);
  if (course) u.searchParams.set('utm_term', course);
  if (uid)    u.searchParams.set('rid', uid.slice(0, 8));   // short recipient id (for click attribution)
  return u.toString();
}

function buildSmsUrl(ctx) {
  // The SMS engine signup is the #signup section on /daily-cpa. Free, no card.
  return utm(`${ctx.courseInfo.dailyPath}#signup`, ctx);
}

function buildCheckoutUrl(ctx) {
  // Annual checkout with coupon pre-applied. Annual is the conversion lever.
  const courseId = ctx.course || 'cpa';
  return utm(
    `/start-checkout?course=${courseId}&interval=annual&coupon=${COUPON_CODE}`,
    ctx
  );
}

function buildMonthlyCheckoutUrl(ctx) {
  // Monthly checkout WITH the START9 monthly promo code pre-applied. Gives
  // first month for $9 instead of $29 — a real, visible discount that converts.
  // (We used to pre-apply WELCOMEBACK here for ~$6 off month 1, but $9 first
  // month is a much stronger headline and matches the email's promise.)
  const courseId = ctx.course || 'cpa';
  return utm(
    `/start-checkout?course=${courseId}&interval=monthly&coupon=${MONTHLY_PROMO_CODE}`,
    { ...ctx, variant: `${ctx.variant}_m` }   // tag clicks differently for attribution
  );
}

function buildUnsubUrl(email, { campaign = CAMPAIGN_ID } = {}) {
  // Points at the /api/unsubscribe Cloud Function (rewrite in firebase.json).
  // The function handles both GET (browser click) and POST (RFC 8058 one-click).
  return `${BASE_URL}/api/unsubscribe?email=${encodeURIComponent(email)}&campaign=${encodeURIComponent(campaign)}`;
}

// ============================================================================
// EMAIL TEMPLATE — short, founder-voice, scannable, dark-mode safe
// ============================================================================

function buildHtml(ctx) {
  const { firstName, courseId, courseInfo, cohort, smsUrl, checkoutUrl, monthlyUrl, unsubUrl, preheader, opener } = ctx;
  const greeting = firstName && firstName !== 'there' ? firstName : 'there';
  const fullPrice = founderAnnual(courseId);
  const dealPrice = discountedAnnual(courseId);
  const monthlyPrice = founderMonthly(courseId);
  const annualPerMo  = annualAsMonthly(courseId);
  const expiry = formatExpiry();
  // The Daily CPA SMS engine is currently CPA-only — only show that block for CPA cohorts.
  const showSms = courseId === 'cpa';

  const smsBlockHtml = showSms ? `
<tr><td style="height:8px;line-height:8px;font-size:0;">&nbsp;</td></tr>
<tr><td style="padding:12px 14px;background:#f4f7fb;border-left:4px solid #16a34a;border-radius:4px;font-size:15px;">
<strong>3. Daily CPA by text.</strong> 5 free practice questions a day during a 3-day trial. Reply A/B/C/D, get the explanation back. Continue at 10/day ($4.99/mo), 25/day ($9.99/mo), or 50/day ($14.99/mo). No app, no login.
</td></tr>` : '';

  const smsCtaHtml = showSms ? `
<!-- Primary CTA: zero-friction SMS trial -->
<p style="margin:18px 0 8px;text-align:center;">
<a href="${smsUrl}" style="display:inline-block;background:#2563eb;color:#ffffff;padding:13px 22px;border-radius:8px;text-decoration:none;font-weight:600;font-size:16px;">Start the 3-day SMS trial free →</a>
</p>
<p style="margin:0 0 18px;text-align:center;font-size:13px;color:#666;">No credit card. Reply STOP any time.</p>
` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>${courseInfo.name} prep update</title>
</head>
<body style="margin:0;padding:0;background:#f6f8fb;">
<!-- Preheader (hidden in body, shown in inbox preview) -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
${preheader}
</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f8fb;">
<tr><td align="center" style="padding:24px 12px;">

<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1a1a1a;line-height:1.55;">
<tr><td style="padding:28px 28px 8px;">

<p style="margin:0 0 16px;font-size:16px;">Hey ${greeting},</p>

<p style="margin:0 0 16px;font-size:16px;">${opener}</p>

<p style="margin:0 0 8px;font-size:16px;font-weight:600;">${showSms ? 'Three real changes since you were last here:' : "What's changed since you were last here:"}</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 18px;">
<tr><td style="padding:12px 14px;background:#f4f7fb;border-left:4px solid #2563eb;border-radius:4px;font-size:15px;">
<strong>1. Founder pricing is still locked in.</strong> ${courseInfo.name} prep is <strong>$${monthlyPrice}/mo</strong> (cancel anytime) or <strong>$${fullPrice}/yr</strong> at the founder rate. With code <code style="background:#eef2f7;padding:2px 5px;border-radius:3px;font-weight:600;">${COUPON_CODE}</code> the annual plan is <strong>$${dealPrice} for the year</strong> — about <strong>$${annualPerMo}/mo</strong>. Or use code <code style="background:#eef2f7;padding:2px 5px;border-radius:3px;font-weight:600;">${MONTHLY_PROMO_CODE}</code> for <strong>$${MONTHLY_PROMO_FIRST_MONTH} your first month</strong>, then $${monthlyPrice}/mo. <span style="color:#b91c1c;font-weight:600;">Codes expire ${expiry}.</span>
</td></tr>
<tr><td style="height:8px;line-height:8px;font-size:0;">&nbsp;</td></tr>
<tr><td style="padding:12px 14px;background:#f4f7fb;border-left:4px solid #7c3aed;border-radius:4px;font-size:15px;">
<strong>2. Pass guarantee.</strong> Study with us through your exam window and if you don't pass, we keep working with you free until you do. We're putting our work where our mouth is.
</td></tr>${smsBlockHtml}
</table>

<!-- Social proof strip — concrete product facts, no fake quotes -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 18px;border:1px solid #e5e7eb;border-radius:8px;">
<tr>
<td align="center" style="padding:12px 8px;width:33%;border-right:1px solid #e5e7eb;">
<div style="font-size:18px;font-weight:700;color:#111;">9,000+</div>
<div style="font-size:12px;color:#666;line-height:1.3;">practice<br>questions</div>
</td>
<td align="center" style="padding:12px 8px;width:34%;border-right:1px solid #e5e7eb;">
<div style="font-size:18px;font-weight:700;color:#111;">AI tutor</div>
<div style="font-size:12px;color:#666;line-height:1.3;">explains every<br>wrong answer</div>
</td>
<td align="center" style="padding:12px 8px;width:33%;">
<div style="font-size:18px;font-weight:700;color:#111;">Adaptive</div>
<div style="font-size:12px;color:#666;line-height:1.3;">drills your<br>weak areas</div>
</td>
</tr>
</table>
${smsCtaHtml}
<!-- Two-path CTA: low-commitment monthly vs. best-value annual -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 8px;">
<tr>
<td align="center" style="padding:6px;width:50%;">
<a href="${monthlyUrl}" style="display:inline-block;background:#ffffff;color:#2563eb;border:2px solid #2563eb;padding:11px 18px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">Start at $${monthlyPrice}/mo →</a>
<br><span style="font-size:12px;color:#666;">Cancel anytime</span>
</td>
<td align="center" style="padding:6px;width:50%;">
<a href="${checkoutUrl}" style="display:inline-block;background:#2563eb;color:#ffffff;padding:13px 18px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">Save 20% — $${dealPrice}/yr →</a>
<br><span style="font-size:12px;color:#666;">${COUPON_CODE} auto-applied</span>
</td>
</tr>
</table>
<p style="margin:0 0 18px;text-align:center;font-size:12px;color:#b91c1c;font-weight:600;">${COUPON_CODE} expires ${expiry} — first year only.</p>

<p style="margin:18px 0 16px;font-size:15px;">
And — <strong>can I ask you one question?</strong> What would have made VoraPrep actually work for you the first time? One sentence is enough. I read every reply.
</p>

<p style="margin:18px 0 4px;font-size:15px;">— Rob</p>
<p style="margin:0;font-size:13px;color:#666;">Founder, VoraPrep</p>

</td></tr>
<tr><td style="padding:24px 28px 24px;border-top:1px solid #eef0f4;">
<p style="margin:0;font-size:12px;color:#888;line-height:1.5;">
You're getting this because you signed up at voraprep.com. <a href="${unsubUrl}" style="color:#888;">Unsubscribe</a> — one click, no questions.<br>
VoraPrep is independent and not affiliated with AICPA, NASBA, the IRS, IIA, IMA, ISACA, or the CFP Board.
</p>
</td></tr>
</table>

</td></tr>
</table>
<!-- cohort:${cohort} step:1 -->
</body></html>`;
}

function buildText(ctx) {
  const { firstName, courseId, courseInfo, smsUrl, checkoutUrl, monthlyUrl, unsubUrl, opener } = ctx;
  const greeting = firstName && firstName !== 'there' ? firstName : 'there';
  const fullPrice = founderAnnual(courseId);
  const dealPrice = discountedAnnual(courseId);
  const monthlyPrice = founderMonthly(courseId);
  const annualPerMo  = annualAsMonthly(courseId);
  const expiry = formatExpiry();
  const showSms = courseId === 'cpa';

  const smsBlock = showSms ? `

  3. Daily CPA by text.
     5 free practice questions a day during a 3-day trial.
     Reply A/B/C/D, get the explanation back.
     Continue at 10/day ($4.99/mo), 25/day ($9.99/mo),
     or 50/day ($14.99/mo). No app, no login.

Start the 3-day SMS trial free (no credit card):
  ${smsUrl}` : '';

  return `Hey ${greeting},

${opener}

${showSms ? 'Three real changes since you were last here:' : "What's changed since you were last here:"}

  1. Founder pricing is still locked in.
     ${courseInfo.name} prep is $${monthlyPrice}/mo (cancel anytime)
     or $${fullPrice}/yr at the founder rate.
     With code ${COUPON_CODE} the annual plan is
     $${dealPrice} for the year — about $${annualPerMo}/mo.
     Code expires ${expiry}.

  2. Pass guarantee.
     Study with us through your exam window and if you don't
     pass, we keep working with you free until you do.${smsBlock}

What you get:
  • 9,000+ practice questions across all sections
  • AI tutor that explains every wrong answer
  • Adaptive engine that drills your weak areas

Two ways back in:

  • Low-commitment: $${monthlyPrice}/mo, cancel anytime
    ${monthlyUrl}

  • Best value: $${dealPrice}/yr with ${COUPON_CODE} (saves $${fullPrice - dealPrice})
    ${checkoutUrl}

${COUPON_CODE} expires ${expiry} — first year only.

And — can I ask you one question? What would have made VoraPrep actually
work for you the first time? One sentence is enough. I read every reply.

— Rob
Founder, VoraPrep

---
Unsubscribe (one click): ${unsubUrl}
VoraPrep is independent and not affiliated with AICPA, NASBA, the IRS,
IIA, IMA, ISACA, or the CFP Board.
`;
}

function buildPreheader(courseInfo, courseId) {
  const monthlyPrice = founderMonthly(courseId);
  const dealPrice = discountedAnnual(courseId);
  const expiry = formatExpiry();
  return courseId === 'cpa'
    ? `${courseInfo.name} prep from $${monthlyPrice}/mo, plus pass guarantee. ${COUPON_CODE} (20% off annual) expires ${expiry}.`
    : `${courseInfo.name} prep from $${monthlyPrice}/mo, plus pass guarantee. ${COUPON_CODE} (20% off annual) expires ${expiry}.`;
}

// ============================================================================
// EMAIL 2 — Day +4 — Pass guarantee / outcome focus
// ============================================================================

const SUBJECT_VARIANTS_STEP2 = {
  a: (c) => `About that pass guarantee`,
  b: (c) => `If you don't pass, we don't stop`,
};

function buildPreheader2(courseInfo, courseId) {
  const expiry = formatExpiry();
  return `Pass the ${courseInfo.name} or we keep working with you free. ${COUPON_CODE} expires ${expiry}.`;
}

function buildHtml2(ctx) {
  const { firstName, courseId, courseInfo, cohort, checkoutUrl, monthlyUrl, unsubUrl, preheader } = ctx;
  const greeting = firstName && firstName !== 'there' ? firstName : 'there';
  const fullPrice = founderAnnual(courseId);
  const dealPrice = discountedAnnual(courseId);
  const monthlyPrice = founderMonthly(courseId);
  const expiry = formatExpiry();
  const daysLeft = daysUntilExpiry();

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>VoraPrep pass guarantee</title>
</head>
<body style="margin:0;padding:0;background:#f6f8fb;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${preheader}</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f8fb;">
<tr><td align="center" style="padding:24px 12px;">

<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1a1a1a;line-height:1.55;">
<tr><td style="padding:28px 28px 8px;">

<p style="margin:0 0 16px;font-size:16px;">Hey ${greeting},</p>

<p style="margin:0 0 16px;font-size:16px;">A few days back I sent you our founder-rate offer for ${courseInfo.name} prep. I want to be specific about one thing in it, because it's the part that I think actually matters.</p>

<p style="margin:0 0 8px;font-size:18px;font-weight:700;color:#111;">The pass guarantee.</p>

<p style="margin:0 0 16px;font-size:16px;">If you study with us through your exam window and you don't pass, <strong>we keep working with you free until you do.</strong> No "submit your study log within 14 days," no asterisks. We extend your access and we keep going.</p>

<p style="margin:0 0 16px;font-size:16px;">That's the whole bet. We think the way we built this — adaptive drilling, an AI tutor on every wrong answer, blueprint-aligned content — is good enough that we can put our work on the line. If we're wrong, we eat it.</p>

<p style="margin:18px 0 8px;font-size:16px;font-weight:600;">What you actually get:</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 18px;">
<tr><td style="padding:10px 14px;background:#f4f7fb;border-left:4px solid #2563eb;border-radius:4px;font-size:15px;">
<strong>9,000+ practice questions</strong> across every section, with explanations written to teach — not just to be technically correct.
</td></tr>
<tr><td style="height:6px;line-height:6px;font-size:0;">&nbsp;</td></tr>
<tr><td style="padding:10px 14px;background:#f4f7fb;border-left:4px solid #16a34a;border-radius:4px;font-size:15px;">
<strong>AI tutor on every wrong answer.</strong> You missed it — here's why, in plain English, with the underlying concept worked out.
</td></tr>
<tr><td style="height:6px;line-height:6px;font-size:0;">&nbsp;</td></tr>
<tr><td style="padding:10px 14px;background:#f4f7fb;border-left:4px solid #7c3aed;border-radius:4px;font-size:15px;">
<strong>Adaptive engine.</strong> The system tracks what you keep missing and surfaces it again — spaced repetition the way it's supposed to work.
</td></tr>
<tr><td style="height:6px;line-height:6px;font-size:0;">&nbsp;</td></tr>
<tr><td style="padding:10px 14px;background:#f4f7fb;border-left:4px solid #d97706;border-radius:4px;font-size:15px;">
<strong>Blueprint-aligned</strong> to the current exam (and we've already mapped 2026 changes for the sections that need it).
</td></tr>
</table>

<p style="margin:0 0 6px;font-size:15px;">${COUPON_CODE} is still live for ${daysLeft} more day${daysLeft === 1 ? '' : 's'}. After ${expiry} it's gone.</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 4px;">
<tr>
<td align="center" style="padding:6px;width:50%;">
<a href="${monthlyUrl}" style="display:inline-block;background:#ffffff;color:#2563eb;border:2px solid #2563eb;padding:11px 18px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">Start at $${monthlyPrice}/mo →</a>
<br><span style="font-size:12px;color:#666;">Cancel anytime</span>
</td>
<td align="center" style="padding:6px;width:50%;">
<a href="${checkoutUrl}" style="display:inline-block;background:#2563eb;color:#ffffff;padding:13px 18px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">Save 20% — $${dealPrice}/yr →</a>
<br><span style="font-size:12px;color:#666;">${COUPON_CODE} auto-applied</span>
</td>
</tr>
</table>
<p style="margin:0 0 18px;text-align:center;font-size:12px;color:#b91c1c;font-weight:600;">${COUPON_CODE} expires ${expiry}.</p>

<p style="margin:18px 0 4px;font-size:15px;">— Rob</p>
<p style="margin:0;font-size:13px;color:#666;">Founder, VoraPrep</p>

</td></tr>
<tr><td style="padding:24px 28px 24px;border-top:1px solid #eef0f4;">
<p style="margin:0;font-size:12px;color:#888;line-height:1.5;">
You're getting this because you signed up at voraprep.com. <a href="${unsubUrl}" style="color:#888;">Unsubscribe</a> — one click, no questions.<br>
VoraPrep is independent and not affiliated with AICPA, NASBA, the IRS, IIA, IMA, ISACA, or the CFP Board.
</p>
</td></tr>
</table>

</td></tr>
</table>
<!-- cohort:${cohort} step:2 -->
</body></html>`;
}

function buildText2(ctx) {
  const { firstName, courseId, courseInfo, checkoutUrl, monthlyUrl, unsubUrl } = ctx;
  const greeting = firstName && firstName !== 'there' ? firstName : 'there';
  const fullPrice = founderAnnual(courseId);
  const dealPrice = discountedAnnual(courseId);
  const monthlyPrice = founderMonthly(courseId);
  const expiry = formatExpiry();
  const daysLeft = daysUntilExpiry();

  return `Hey ${greeting},

A few days back I sent you our founder-rate offer for ${courseInfo.name}
prep. I want to be specific about one thing in it.

THE PASS GUARANTEE.

If you study with us through your exam window and you don't pass,
we keep working with you free until you do. No "submit your study log
within 14 days," no asterisks. We extend your access and we keep going.

That's the whole bet. We think the way we built this — adaptive
drilling, an AI tutor on every wrong answer, blueprint-aligned content
— is good enough that we can put our work on the line.

What you actually get:

  • 9,000+ practice questions across every section, with explanations
    written to teach — not just to be technically correct.

  • AI tutor on every wrong answer. You missed it — here's why, in
    plain English, with the underlying concept worked out.

  • Adaptive engine. The system tracks what you keep missing and
    surfaces it again — spaced repetition the way it's supposed to work.

  • Blueprint-aligned to the current exam.

${COUPON_CODE} is still live for ${daysLeft} more day${daysLeft === 1 ? '' : 's'}. After ${expiry} it's gone.

  • Low-commitment: $${monthlyPrice}/mo, cancel anytime
    ${monthlyUrl}

  • Best value: $${dealPrice}/yr with ${COUPON_CODE} (saves $${fullPrice - dealPrice})
    ${checkoutUrl}

— Rob
Founder, VoraPrep

---
Unsubscribe (one click): ${unsubUrl}
`;
}

// ============================================================================
// EMAIL 3 — Day +7 — Deadline / last call
// ============================================================================

const SUBJECT_VARIANTS_STEP3 = {
  a: () => {
    const d = daysUntilExpiry();
    if (d <= 0) return `${COUPON_CODE} expires today`;
    if (d === 1) return `${COUPON_CODE} expires tomorrow`;
    return `${COUPON_CODE} expires in ${d} days`;
  },
  b: () => `Last call — ${COUPON_CODE} closes ${formatExpiry()}`,
};

function buildPreheader3(courseInfo, courseId) {
  const monthlyPrice = founderMonthly(courseId);
  const dealPrice = discountedAnnual(courseId);
  return `${courseInfo.name} at $${monthlyPrice}/mo or $${dealPrice}/yr (20% off) — code disappears at month-end.`;
}

function buildHtml3(ctx) {
  const { firstName, courseId, courseInfo, cohort, checkoutUrl, monthlyUrl, unsubUrl, preheader } = ctx;
  const greeting = firstName && firstName !== 'there' ? firstName : 'there';
  const fullPrice = founderAnnual(courseId);
  const dealPrice = discountedAnnual(courseId);
  const monthlyPrice = founderMonthly(courseId);
  const expiry = formatExpiry();
  const daysLeft = daysUntilExpiry();
  const headlineDays = daysLeft <= 0
    ? 'Today is the last day'
    : daysLeft === 1
      ? 'Tomorrow is the last day'
      : `${daysLeft} days left`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>${COUPON_CODE} expires ${expiry}</title>
</head>
<body style="margin:0;padding:0;background:#f6f8fb;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${preheader}</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f8fb;">
<tr><td align="center" style="padding:24px 12px;">

<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1a1a1a;line-height:1.55;">
<tr><td style="padding:28px 28px 8px;">

<p style="margin:0 0 16px;font-size:16px;">Hey ${greeting},</p>

<p style="margin:0 0 16px;font-size:18px;font-weight:700;color:#b91c1c;">${headlineDays} on ${COUPON_CODE}.</p>

<p style="margin:0 0 16px;font-size:16px;">After ${expiry} the 20% founder-rate code goes away. I'm sending this once, then I'll leave you alone.</p>

<p style="margin:0 0 16px;font-size:16px;">${courseInfo.name} prep with the pass guarantee — $${monthlyPrice}/mo (cancel anytime) or $${dealPrice}/yr with <code style="background:#eef2f7;padding:2px 5px;border-radius:3px;font-weight:600;">${COUPON_CODE}</code> (save $${fullPrice - dealPrice}).</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 4px;">
<tr>
<td align="center" style="padding:6px;width:50%;">
<a href="${monthlyUrl}" style="display:inline-block;background:#ffffff;color:#2563eb;border:2px solid #2563eb;padding:11px 18px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">Start at $${monthlyPrice}/mo →</a>
<br><span style="font-size:12px;color:#666;">Cancel anytime</span>
</td>
<td align="center" style="padding:6px;width:50%;">
<a href="${checkoutUrl}" style="display:inline-block;background:#dc2626;color:#ffffff;padding:13px 18px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">Lock in $${dealPrice}/yr →</a>
<br><span style="font-size:12px;color:#666;">${COUPON_CODE} auto-applied</span>
</td>
</tr>
</table>
<p style="margin:0 0 18px;text-align:center;font-size:12px;color:#b91c1c;font-weight:600;">Code disappears ${expiry}.</p>

<p style="margin:18px 0 4px;font-size:15px;">— Rob</p>
<p style="margin:0;font-size:13px;color:#666;">Founder, VoraPrep</p>

</td></tr>
<tr><td style="padding:24px 28px 24px;border-top:1px solid #eef0f4;">
<p style="margin:0;font-size:12px;color:#888;line-height:1.5;">
You're getting this because you signed up at voraprep.com. <a href="${unsubUrl}" style="color:#888;">Unsubscribe</a> — one click, no questions.<br>
VoraPrep is independent and not affiliated with AICPA, NASBA, the IRS, IIA, IMA, ISACA, or the CFP Board.
</p>
</td></tr>
</table>

</td></tr>
</table>
<!-- cohort:${cohort} step:3 -->
</body></html>`;
}

function buildText3(ctx) {
  const { firstName, courseId, courseInfo, checkoutUrl, monthlyUrl, unsubUrl } = ctx;
  const greeting = firstName && firstName !== 'there' ? firstName : 'there';
  const fullPrice = founderAnnual(courseId);
  const dealPrice = discountedAnnual(courseId);
  const monthlyPrice = founderMonthly(courseId);
  const expiry = formatExpiry();
  const daysLeft = daysUntilExpiry();
  const headlineDays = daysLeft <= 0
    ? 'Today is the last day'
    : daysLeft === 1
      ? 'Tomorrow is the last day'
      : `${daysLeft} days left`;

  return `Hey ${greeting},

${headlineDays.toUpperCase()} ON ${COUPON_CODE}.

After ${expiry} the 20% founder-rate code goes away. I'm sending this
once, then I'll leave you alone.

${courseInfo.name} prep with the pass guarantee — $${monthlyPrice}/mo (cancel
anytime) or $${dealPrice}/yr with ${COUPON_CODE} (save $${fullPrice - dealPrice}).

  • Low-commitment: $${monthlyPrice}/mo, cancel anytime
    ${monthlyUrl}

  • Best value: $${dealPrice}/yr with ${COUPON_CODE}
    ${checkoutUrl}

Code disappears ${expiry}.

— Rob
Founder, VoraPrep

---
Unsubscribe (one click): ${unsubUrl}
`;
}

// ============================================================================
// EMAIL 4 — Day +10 — Daily CPA by text (zero-friction SMS pitch)
// CPA-only — the SMS engine doesn't exist for other exams yet.
// ============================================================================

const SUBJECT_VARIANTS_STEP4 = {
  a: () => `One CPA question a day. By text. Free for 3 days.`,
  b: () => `5 minutes a day to keep your CPA momentum`,
};

function buildPreheader4(courseInfo) {
  return `${courseInfo.name} questions to your phone. Reply A/B/C/D. No app, no card.`;
}

function buildHtml4(ctx) {
  const { firstName, courseInfo, cohort, smsUrl, unsubUrl, preheader } = ctx;
  const greeting = firstName && firstName !== 'there' ? firstName : 'there';
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><title>Daily CPA by text</title></head>
<body style="margin:0;padding:0;background:#f6f8fb;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f8fb;">
<tr><td align="center" style="padding:24px 12px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1a1a1a;line-height:1.55;">
    <tr><td style="padding:28px 28px 8px;">
      <p style="margin:0 0 16px;font-size:16px;">Hey ${greeting},</p>
      <p style="margin:0 0 16px;font-size:16px;">Honest read on why most ${courseInfo.name} candidates stall: it's not motivation, it's friction. Logging into a course at 9pm after work feels like another job.</p>
      <p style="margin:0 0 16px;font-size:16px;">So we built the lowest-friction version of CPA practice we could think of: <strong>one real question, by text, every morning.</strong></p>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 18px 0;border:1px solid #e5e7eb;border-radius:10px;background:#f9fafb;">
        <tr><td style="padding:18px 20px;">
          <div style="font-size:15px;color:#444;line-height:1.65;">
            <strong>You:</strong> get a real CPA MCQ at the time you pick.<br>
            <strong>Reply:</strong> A, B, C, or D.<br>
            <strong>Get back:</strong> the answer, and exactly why each wrong choice is wrong.<br>
            <strong>Done.</strong> 3–5 minutes. No app to install. No password to remember.
          </div>
        </td></tr>
      </table>

      <p style="margin:0 0 8px;font-size:16px;font-weight:600;">Try it free for 3 days:</p>
      <ul style="margin:0 0 18px;padding-left:22px;font-size:15px;color:#444;line-height:1.7;">
        <li>5 questions/day during the trial</li>
        <li>No credit card</li>
        <li>Reply STOP any time and you're done</li>
      </ul>

      <p style="margin:18px 0 8px;text-align:center;">
        <a href="${smsUrl}" style="display:inline-block;background:#16a34a;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;font-size:16px;">Start the free SMS trial →</a>
      </p>
      <p style="margin:0 0 18px;text-align:center;font-size:13px;color:#666;">Continue from $4.99/mo after the trial. Cancel by text.</p>

      <p style="margin:18px 0 4px;font-size:15px;color:#444;">If you're already deep in study mode and the full prep is what you need, the SAVE20 code from last week still works for a few more days too.</p>

      <p style="margin:18px 0 4px;font-size:15px;">— Rob</p>
      <p style="margin:0;font-size:13px;color:#666;">Founder, VoraPrep</p>
    </td></tr>
    <tr><td style="padding:24px 28px;border-top:1px solid #eef0f4;">
      <p style="margin:0;font-size:12px;color:#888;line-height:1.5;">You're getting this because you signed up at voraprep.com. <a href="${unsubUrl}" style="color:#888;">Unsubscribe</a> — one click.</p>
    </td></tr>
  </table>
</td></tr></table>
<!-- cohort:${cohort} step:4 -->
</body></html>`;
}

function buildText4(ctx) {
  const { firstName, courseInfo, smsUrl, unsubUrl } = ctx;
  const greeting = firstName && firstName !== 'there' ? firstName : 'there';
  return `Hey ${greeting},

Honest read on why most ${courseInfo.name} candidates stall: it's not
motivation, it's friction. Logging into a course at 9pm after work
feels like another job.

So we built the lowest-friction version of CPA practice we could think
of: ONE REAL QUESTION, BY TEXT, EVERY MORNING.

  You:        get a real CPA MCQ at the time you pick.
  Reply:      A, B, C, or D.
  Get back:   the answer, and exactly why each wrong choice is wrong.
  Done:       3–5 minutes. No app. No password.

Try it free for 3 days:
  • 5 questions/day during the trial
  • No credit card
  • Reply STOP any time

Start: ${smsUrl}

Continue from $4.99/mo after the trial. Cancel by text.

If you're already deep in study mode and the full prep is what you need,
the SAVE20 code from last week still works for a few more days.

— Rob
Founder, VoraPrep

---
Unsubscribe: ${unsubUrl}
`;
}

// ============================================================================
// EMAIL 5 — Day +14 — Try a real CPA question right now (zero-signup)
// ============================================================================

const SUBJECT_VARIANTS_STEP5 = {
  a: (c) => `Try one real ${c.name} question right now`,
  b: () => `Want to see what a 75-pass FAR question looks like?`,
};

function buildPreheader5(courseInfo) {
  return `One ${courseInfo.name} MCQ, full explanation, no signup. 60 seconds.`;
}

function buildHtml5(ctx) {
  const { firstName, courseInfo, cohort, smsUrl, unsubUrl, preheader, courseId } = ctx;
  const greeting = firstName && firstName !== 'there' ? firstName : 'there';
  // Sample question landing — anchors to the live "Sample Question" widget on /cpa
  const sampleUrl = `${BASE_URL}/${courseId}#sample?utm_source=email&utm_medium=winback&utm_campaign=${campaignIdForStep(5)}&utm_content=sample-mcq`;
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><title>Try a real ${courseInfo.name} question</title></head>
<body style="margin:0;padding:0;background:#f6f8fb;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f8fb;">
<tr><td align="center" style="padding:24px 12px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1a1a1a;line-height:1.55;">
    <tr><td style="padding:28px 28px 8px;">
      <p style="margin:0 0 16px;font-size:16px;">Hey ${greeting},</p>
      <p style="margin:0 0 16px;font-size:16px;">Easier than reading another marketing email about how good our questions are: just try one.</p>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 18px 0;border:1px solid #2563eb;border-radius:10px;background:#eff6ff;">
        <tr><td style="padding:18px 20px;">
          <div style="font-size:14px;font-weight:700;color:#1e40af;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Live sample</div>
          <div style="font-size:16px;font-weight:600;color:#111;margin-bottom:8px;">One real ${courseInfo.name} MCQ. Full explanation. No signup. No card.</div>
          <div style="font-size:14px;color:#444;margin-bottom:14px;">If our explanation makes the concept click in 60 seconds, you'll get the same treatment on 9,000+ more.</div>
          <a href="${sampleUrl}" style="display:inline-block;background:#2563eb;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;">Try a sample question →</a>
        </td></tr>
      </table>

      <p style="margin:14px 0 14px;font-size:15px;color:#444;">If 60 seconds is still more time than you want to spend at a desk, here's the same thing by text: <a href="${smsUrl}" style="color:#16a34a;font-weight:600;">3-day SMS trial, free</a>.</p>

      <p style="margin:18px 0 4px;font-size:15px;">— Rob</p>
      <p style="margin:0;font-size:13px;color:#666;">Founder, VoraPrep</p>
    </td></tr>
    <tr><td style="padding:24px 28px;border-top:1px solid #eef0f4;">
      <p style="margin:0;font-size:12px;color:#888;line-height:1.5;">You're getting this because you signed up at voraprep.com. <a href="${unsubUrl}" style="color:#888;">Unsubscribe</a> — one click.</p>
    </td></tr>
  </table>
</td></tr></table>
<!-- cohort:${cohort} step:5 -->
</body></html>`;
}

function buildText5(ctx) {
  const { firstName, courseInfo, smsUrl, unsubUrl, courseId } = ctx;
  const greeting = firstName && firstName !== 'there' ? firstName : 'there';
  const sampleUrl = `${BASE_URL}/${courseId}#sample?utm_source=email&utm_medium=winback&utm_campaign=${campaignIdForStep(5)}&utm_content=sample-mcq`;
  return `Hey ${greeting},

Easier than reading another marketing email about how good our questions
are: just try one.

  One real ${courseInfo.name} MCQ.
  Full explanation.
  No signup. No card.

  ${sampleUrl}

If our explanation makes the concept click in 60 seconds, you'll get
the same treatment on 9,000+ more.

If 60 seconds is still more time than you want to spend at a desk,
here's the same thing by text — 3-day SMS trial, free:
  ${smsUrl}

— Rob
Founder, VoraPrep

---
Unsubscribe: ${unsubUrl}
`;
}

// ============================================================================
// EMAIL 6 — Day +18 — Founder ask (no offer, just a question)
// ============================================================================

const SUBJECT_VARIANTS_STEP6 = {
  a: () => `One last question from me`,
  b: () => `What would have made VoraPrep work for you?`,
};

function buildPreheader6(courseInfo) {
  return `One sentence, no offer. I read every reply. — Rob, founder of VoraPrep`;
}

function buildHtml6(ctx) {
  const { firstName, courseInfo, cohort, unsubUrl, preheader } = ctx;
  const greeting = firstName && firstName !== 'there' ? firstName : 'there';
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><title>One question from me</title></head>
<body style="margin:0;padding:0;background:#fff;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fff;">
<tr><td align="center" style="padding:32px 16px;">
  <table role="presentation" width="540" cellpadding="0" cellspacing="0" style="max-width:540px;width:100%;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1a1a1a;line-height:1.65;">
    <tr><td style="padding:0 8px;">
      <p style="margin:0 0 18px;font-size:16px;">Hey ${greeting},</p>
      <p style="margin:0 0 18px;font-size:16px;">I've sent you a few emails over the last couple of weeks. Pricing, the pass guarantee, the SMS thing, a free question. None of them seem to have been the right thing for you, and that's fine.</p>
      <p style="margin:0 0 18px;font-size:16px;">Before I stop emailing you, can I ask one thing?</p>
      <p style="margin:0 0 18px;font-size:18px;font-weight:700;color:#111;">What would have made ${courseInfo.name} prep with VoraPrep actually work for you?</p>
      <p style="margin:0 0 18px;font-size:16px;">One sentence is enough. There's no offer attached and no follow-up. I just want to know what we missed — wrong price, wrong format, wrong timing, wrong content, something else I haven't thought of.</p>
      <p style="margin:0 0 18px;font-size:16px;">Hit reply. I read every single one.</p>
      <p style="margin:0 0 4px;font-size:16px;">— Rob</p>
      <p style="margin:0;font-size:14px;color:#666;">Founder, VoraPrep</p>
      <p style="margin:24px 0 0;font-size:12px;color:#aaa;line-height:1.5;">This is the last email in this sequence. <a href="${unsubUrl}" style="color:#aaa;">Unsubscribe</a> any time.</p>
    </td></tr>
  </table>
</td></tr></table>
<!-- cohort:${cohort} step:6 -->
</body></html>`;
}

function buildText6(ctx) {
  const { firstName, courseInfo, unsubUrl } = ctx;
  const greeting = firstName && firstName !== 'there' ? firstName : 'there';
  return `Hey ${greeting},

I've sent you a few emails over the last couple of weeks. Pricing, the
pass guarantee, the SMS thing, a free question. None of them seem to
have been the right thing for you, and that's fine.

Before I stop emailing you, can I ask one thing?

  WHAT WOULD HAVE MADE ${courseInfo.name.toUpperCase()} PREP WITH VORAPREP ACTUALLY
  WORK FOR YOU?

One sentence is enough. There's no offer attached and no follow-up. I
just want to know what we missed — wrong price, wrong format, wrong
timing, wrong content, something else I haven't thought of.

Hit reply. I read every single one.

— Rob
Founder, VoraPrep

---
This is the last email in this sequence.
Unsubscribe: ${unsubUrl}
`;
}

// ============================================================================
// STEP ROUTER — picks the right subject/preheader/HTML/text for the active step
// ============================================================================

const STEPS = {
  1: {
    subjects: SUBJECT_VARIANTS,
    preheader: buildPreheader,
    html: buildHtml,
    text: buildText,
    type: 'winback',
  },
  2: {
    subjects: SUBJECT_VARIANTS_STEP2,
    preheader: buildPreheader2,
    html: buildHtml2,
    text: buildText2,
    type: 'winback-followup-proof',
  },
  3: {
    subjects: SUBJECT_VARIANTS_STEP3,
    preheader: buildPreheader3,
    html: buildHtml3,
    text: buildText3,
    type: 'winback-final-deadline',
  },
  4: {
    subjects: SUBJECT_VARIANTS_STEP4,
    preheader: buildPreheader4,
    html: buildHtml4,
    text: buildText4,
    type: 'winback-sms-pitch',
  },
  5: {
    subjects: SUBJECT_VARIANTS_STEP5,
    preheader: buildPreheader5,
    html: buildHtml5,
    text: buildText5,
    type: 'winback-sample-mcq',
  },
  6: {
    subjects: SUBJECT_VARIANTS_STEP6,
    preheader: buildPreheader6,
    html: buildHtml6,
    text: buildText6,
    type: 'winback-founder-ask',
  },
};

function renderForStep(step, ctx, variant) {
  const s = STEPS[step];
  return {
    subject: s.subjects[variant](ctx.courseInfo, ctx.courseId),
    html: s.html(ctx),
    text: s.text(ctx),
    type: s.type,
  };
}

function preheaderForStep(step, courseInfo, courseId) {
  return STEPS[step].preheader(courseInfo, courseId);
}

function campaignIdForStep(step) {
  return step === 1 ? CAMPAIGN_ID : `${CAMPAIGN_ID}-s${step}`;
}

// ============================================================================
// JUNK / TEST ADDRESS FILTER
// ============================================================================

const JUNK_PATTERNS = [
  /@example\.(com|net|org)$/i,
  /@test\./i,
  /@(jddj|jdj|asdf|qwerty|test)\.(com|net|org)$/i,
  /^rob\+.*@sagecg\.com$/i,
  /^testuser/i,
  /@gmaio\.com$/i,
  /@(yopmail|mailinator|guerrillamail|10minutemail|tempmail|temp-mail)\./i,
];
const isJunk = (email) => JUNK_PATTERNS.some((p) => p.test(email));

// ============================================================================
// FIREBASE
// ============================================================================

function initFirebase() {
  const envPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  const serviceAccountPath = envPath && fs.existsSync(envPath)
    ? envPath
    : path.join(__dirname, '../serviceAccountKey.json');

  if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = require(serviceAccountPath);
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    console.log(`Firebase project: ${serviceAccount.project_id}  (${path.basename(serviceAccountPath)})`);
  } else {
    admin.initializeApp();
    console.log('Firebase: using application default credentials');
  }
}

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log('');
  console.log('===================================================');
  console.log('  Win-back Campaign');
  console.log(`  Mode: ${dryRun ? 'DRY RUN (no emails sent)' : 'LIVE SEND'}`);
  console.log(`  Campaign ID: ${campaignIdForStep(STEP)}  (step ${STEP})`);
  console.log(`  Coupon: ${COUPON_CODE}  expires ${formatExpiry()} (${daysUntilExpiry()}d left)`);
  console.log(`  Window: last ${sinceDays} days`);
  if (STEP > 1) console.log(`  Step gap: requires step 1 sent ≥ ${minGapDays} days ago`);
  if (!dryRun)  console.log(`  Pacing: ${THROTTLE_MS}ms/send, ${Math.round(BATCH_PAUSE_MS/1000)}s pause every ${BATCH_SIZE} sends`);
  if (courseFilter) console.log(`  Course filter: ${courseFilter}`);
  if (cohortFilter) console.log(`  Cohort filter: ${cohortFilter}`);
  if (limit)        console.log(`  Limit: ${limit}`);
  if (testEmail)    console.log(`  Test mode → ${testEmail}`);
  if (bccAddress)   console.log(`  BCC every send → ${bccAddress}`);
  console.log('===================================================');
  console.log('');

  let resend = null;
  if (!dryRun) {
    if (!process.env.RESEND_API_KEY) {
      console.error('Error: RESEND_API_KEY required for --send.');
      process.exit(1);
    }
    resend = new Resend(process.env.RESEND_API_KEY.trim());
  }

  initFirebase();
  const db = admin.firestore();

  // Helper: suppression-list check (checks /emailSuppressions/{normalizedEmail})
  const suppressionId = (email) =>
    email.trim().toLowerCase().replace(/[^a-z0-9@._+-]/gi, '_');
  const isSuppressed = async (email) => {
    try {
      const doc = await db.collection('emailSuppressions').doc(suppressionId(email)).get();
      return doc.exists && doc.data()?.unsubscribed !== false;
    } catch {
      return false;
    }
  };

  // ---- SAMPLES MODE: send all 6 cohort×variant combos to one address ----
  // With --all-steps, sends 18 emails (3 steps × 3 cohorts × 2 variants) for full QA.
  if (samplesTo) {
    if (dryRun) {
      console.log('--samples-to requires --send (it is meant for live QA preview).');
      console.log('Re-run with: --send --samples-to ' + samplesTo);
      return;
    }
    const cohorts = ['churned_paid', 'trial_no_convert', 'dormant_signup'];
    const variants = ['a', 'b'];
    const steps = allSteps ? [1, 2, 3] : [STEP];
    const courseInfo = getCourseInfo(courseFilter || 'cpa');

    let sentCount = 0;
    let totalCount = cohorts.length * variants.length * steps.length;
    const sampleCourseId = courseFilter || 'cpa';
    for (const step of steps) {
      for (const cohort of cohorts) {
        for (const variant of variants) {
          const linkCtx = { uid: `SAMPLE_${cohort}_${variant}_s${step}`, cohort, variant, course: sampleCourseId, courseInfo };
          const ctx = {
            firstName: 'there',
            courseId: sampleCourseId,
            courseInfo,
            cohort,
            opener: COHORT_OPENERS[cohort](courseInfo),
            preheader: preheaderForStep(step, courseInfo, sampleCourseId),
            smsUrl: buildSmsUrl(linkCtx),
            checkoutUrl: buildCheckoutUrl(linkCtx),
            monthlyUrl: buildMonthlyCheckoutUrl(linkCtx),
            unsubUrl: buildUnsubUrl(samplesTo),
          };
          const rendered = renderForStep(step, ctx, variant);
          const subject = `[SAMPLE s${step}/${cohort}/v${variant}] ${rendered.subject}`;

          const { error } = await resend.emails.send({
            from: FROM_EMAIL,
            reply_to: REPLY_TO,
            to: samplesTo,
            subject,
            html: rendered.html,
            text: rendered.text,
            headers: {
              'List-Unsubscribe': `<${ctx.unsubUrl}>, <mailto:unsubscribe@voraprep.com?subject=Unsubscribe%20${encodeURIComponent(samplesTo)}>`,
              'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
            },
            tags: [
              { name: 'campaign', value: campaignIdForStep(step) },
              { name: 'type',     value: `${rendered.type}-sample` },
              { name: 'cohort',   value: cohort },
              { name: 'variant',  value: variant },
              { name: 'step',     value: String(step) },
            ],
          });
          if (error) {
            console.error(`  FAIL [s${step}/${cohort}/v${variant}]: ${error.message || JSON.stringify(error)}`);
          } else {
            sentCount++;
            console.log(`  OK   s${step} [${cohort.padEnd(18)}] [v${variant}] sent to ${samplesTo}`);
          }
          await sleep(THROTTLE_MS);
        }
      }
    }
    console.log('');
    console.log(`Done. Sent ${sentCount}/${totalCount} sample emails to ${samplesTo}.`);
    return;
  }

  // ---- TEST MODE ----
  if (testEmail) {
    const testCourseId = courseFilter || 'cpa';
    const courseInfo = getCourseInfo(testCourseId);
    const cohort = cohortFilter || 'trial_no_convert';
    const variant = pickVariant(testEmail);
    const linkCtx = { uid: 'TESTUSER', cohort, variant, course: testCourseId, courseInfo };
    const ctx = {
      firstName: 'there',
      courseId: testCourseId,
      courseInfo,
      cohort,
      opener: COHORT_OPENERS[cohort](courseInfo),
      preheader: preheaderForStep(STEP, courseInfo, testCourseId),
      smsUrl: buildSmsUrl(linkCtx),
      checkoutUrl: buildCheckoutUrl(linkCtx),
      monthlyUrl: buildMonthlyCheckoutUrl(linkCtx),
      unsubUrl: buildUnsubUrl(testEmail),
    };
    const rendered = renderForStep(STEP, ctx, variant);
    const subject = rendered.subject;

    if (dryRun) {
      console.log('--- TEST EMAIL PREVIEW ---');
      console.log(`To: ${testEmail}`);
      console.log(`Step: ${STEP}`);
      console.log(`Subject (variant ${variant}): ${subject}`);
      console.log(`Cohort: ${cohort}`);
      console.log(`SMS CTA:    ${ctx.smsUrl}`);
      console.log(`Plan CTA:   ${ctx.checkoutUrl}`);
      console.log('---');
      console.log(rendered.text);
      console.log('--- (HTML omitted; remove --dry-run to send) ---');
      return;
    }

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      reply_to: REPLY_TO,
      to: testEmail,
      ...(bccAddress && bccAddress.toLowerCase() !== testEmail.toLowerCase() ? { bcc: bccAddress } : {}),
      subject,
      html: rendered.html,
      text: rendered.text,
      headers: {
        'List-Unsubscribe': `<${ctx.unsubUrl}>, <mailto:unsubscribe@voraprep.com?subject=Unsubscribe%20${encodeURIComponent(testEmail)}>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
      tags: [
        { name: 'campaign', value: campaignIdForStep(STEP) },
        { name: 'type',     value: rendered.type },
        { name: 'cohort',   value: cohort },
        { name: 'variant',  value: variant },
        { name: 'course',   value: courseFilter || 'cpa' },
        { name: 'step',     value: String(STEP) },
      ],
    });
    if (error) { console.error('Send failed:', error); process.exit(1); }
    console.log(`Test email sent to ${testEmail} (step ${STEP}, variant ${variant}, cohort ${cohort})`);
    return;
  }

  // ---- BULK MODE ----
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - sinceDays);

  console.log('Listing Firebase Auth users...');
  const authUsers = [];
  let pageToken;
  do {
    const page = await admin.auth().listUsers(1000, pageToken);
    authUsers.push(...page.users);
    pageToken = page.pageToken;
  } while (pageToken);

  const recent = authUsers.filter((u) => {
    const ts = u.metadata?.creationTime ? new Date(u.metadata.creationTime) : null;
    return ts && ts >= cutoff;
  });

  console.log(`Total Auth users: ${authUsers.length} | Created in last ${sinceDays} days: ${recent.length}`);
  console.log('Filtering eligible recipients...');

  const eligible = [];
  const skipped = {
    unsubscribed: 0, alreadySent: 0, activeSub: 0, courseFilter: 0,
    cohortFilter: 0, noEmail: 0, junkAddress: 0, recentlyEmailed: 0,
    suppressionList: 0,
  };

  // Don't re-bother people we already emailed in last 14 days from any campaign
  const RECENT_EMAIL_WINDOW_MS = 14 * 24 * 60 * 60 * 1000;

  for (const authUser of recent) {
    if (!authUser.email)            { skipped.noEmail++;     continue; }
    if (isJunk(authUser.email))     { skipped.junkAddress++; continue; }

    // Top-level suppression list (written by /api/unsubscribe + SPA Unsubscribe page)
    if (await isSuppressed(authUser.email)) { skipped.suppressionList++; continue; }

    const profileSnap = await db.collection('users').doc(authUser.uid).get();
    const profile = profileSnap.exists ? profileSnap.data() : {};

    if (profile.emailUnsubscribed)                                  { skipped.unsubscribed++; continue; }
    // Step-specific dedup: don't re-send the SAME step. Steps 2/3 still send even if step 1 went out.
    const stepKey = campaignIdForStep(STEP);
    if (profile.winbackEmail?.[stepKey]?.sentAt)                    { skipped.alreadySent++;  continue; }
    // For steps 2/3, require step 1 to have already been sent (so the drip is sequential)
    // AND require minGapDays to have elapsed since step 1.
    if (STEP > 1) {
      const step1SentAt = profile.winbackEmail?.[CAMPAIGN_ID]?.sentAt?.toMillis?.();
      if (!step1SentAt) { skipped.alreadySent++; continue; }
      const ageDays = (Date.now() - step1SentAt) / (24 * 60 * 60 * 1000);
      if (ageDays < minGapDays) { skipped.gapNotMet = (skipped.gapNotMet || 0) + 1; continue; }
    }

    // Conservative: don't send if any other transactional/recovery email went out very recently.
    // For step 1 we use 14 days. For follow-up steps we drop to 3 days — the drip is the campaign.
    const recentWindowMs = STEP === 1 ? RECENT_EMAIL_WINDOW_MS : 3 * 24 * 60 * 60 * 1000;
    const lastEmailedAt = profile.lastTransactionalEmailAt?.toMillis?.() || 0;
    if (lastEmailedAt && Date.now() - lastEmailedAt < recentWindowMs) {
      skipped.recentlyEmailed++; continue;
    }

    const activeCourse = (profile.activeCourse || 'cpa').toLowerCase();
    if (courseFilter && activeCourse !== courseFilter) { skipped.courseFilter++; continue; }
    // CPA-only steps (SMS) — silently skip non-CPA users
    if (CPA_ONLY_STEPS.has(STEP) && activeCourse !== 'cpa') { skipped.courseFilter++; continue; }

    // Subscription state
    const subDoc = await db.collection('subscriptions').doc(authUser.uid).get();
    const subStatus = subDoc.exists ? subDoc.data()?.status : null;
    if (subStatus && ['active', 'trialing', 'past_due'].includes(subStatus)) {
      skipped.activeSub++; continue;
    }

    const hasOnboarded = !!(
      profile.onboardingCompleted &&
      Object.values(profile.onboardingCompleted).some(Boolean)
    );

    const cohort = classifyCohort({ profile, subStatus, hasOnboarded });
    if (cohortFilter && cohort !== cohortFilter) { skipped.cohortFilter++; continue; }

    eligible.push({
      uid: authUser.uid,
      email: authUser.email,
      firstName: profile.firstName
        || (profile.displayName ? profile.displayName.split(' ')[0] : null)
        || (authUser.displayName ? authUser.displayName.split(' ')[0] : null),
      activeCourse,
      cohort,
    });

    if (limit && eligible.length >= limit) break;
  }

  // Cohort breakdown
  const cohortCounts = eligible.reduce((acc, u) => { acc[u.cohort] = (acc[u.cohort] || 0) + 1; return acc; }, {});
  console.log(`Eligible: ${eligible.length}`);
  console.log(`  By cohort: ${JSON.stringify(cohortCounts)}`);
  console.log(`Skipped:    ${JSON.stringify(skipped)}`);
  console.log('');

  if (eligible.length === 0) {
    console.log('No eligible recipients. Exiting.');
    return;
  }

  if (dryRun) {
    console.log('--- DRY RUN: would send to (first 25) ---');
    eligible.slice(0, 25).forEach((u) => {
      const v = pickVariant(u.uid || u.email);
      console.log(`  [${u.cohort.padEnd(18)}] [v${v}] ${u.email}  (${u.activeCourse})  firstName=${u.firstName || '-'}`);
    });
    if (eligible.length > 25) console.log(`  ... and ${eligible.length - 25} more`);
    console.log('');
    console.log('To actually send, re-run with --send');
    return;
  }

  // ---- LIVE SEND ----
  let sent = 0;
  let failed = 0;
  let inBatch = 0;

  for (const user of eligible) {
    const userCourseId = user.activeCourse || 'cpa';
    const courseInfo = getCourseInfo(userCourseId);
    const variant = pickVariant(user.uid || user.email);
    const linkCtx = { uid: user.uid, cohort: user.cohort, variant, course: userCourseId, courseInfo };

    const ctx = {
      firstName: user.firstName,
      courseId: userCourseId,
      courseInfo,
      cohort: user.cohort,
      opener: COHORT_OPENERS[user.cohort](courseInfo),
      preheader: preheaderForStep(STEP, courseInfo, userCourseId),
      smsUrl: buildSmsUrl(linkCtx),
      checkoutUrl: buildCheckoutUrl(linkCtx),
      monthlyUrl: buildMonthlyCheckoutUrl(linkCtx),
      unsubUrl: buildUnsubUrl(user.email),
    };
    const rendered = renderForStep(STEP, ctx, variant);
    const subject = rendered.subject;

    try {
      const { error } = await resend.emails.send({
        from: FROM_EMAIL,
        reply_to: REPLY_TO,
        to: user.email,
        ...(bccAddress && bccAddress.toLowerCase() !== user.email.toLowerCase() ? { bcc: bccAddress } : {}),
        subject,
        html: rendered.html,
        text: rendered.text,
        headers: {
          'List-Unsubscribe': `<${ctx.unsubUrl}>, <mailto:unsubscribe@voraprep.com?subject=Unsubscribe%20${encodeURIComponent(user.email)}>`,
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
        },
        tags: [
          { name: 'campaign', value: campaignIdForStep(STEP) },
          { name: 'type',     value: rendered.type },
          { name: 'cohort',   value: user.cohort },
          { name: 'variant',  value: variant },
          { name: 'course',   value: user.activeCourse },
          { name: 'step',     value: String(STEP) },
        ],
      });

      if (error) {
        console.error(`  FAIL ${user.email}: ${error.message || JSON.stringify(error)}`);
        failed++;
      } else {
        sent++;
        console.log(`  OK   s${STEP} [${user.cohort}] [v${variant}] ${user.email}  (${user.activeCourse})`);
        if (!skipTracking) {
          const stepKey = campaignIdForStep(STEP);
          await db.collection('users').doc(user.uid).set({
            winbackEmail: {
              [stepKey]: {
                sentAt: admin.firestore.FieldValue.serverTimestamp(),
                cohort: user.cohort,
                variant,
                coupon: COUPON_CODE,
                course: user.activeCourse,
                step: STEP,
              },
            },
            lastTransactionalEmailAt: admin.firestore.FieldValue.serverTimestamp(),
          }, { merge: true });
        }
      }
    } catch (err) {
      console.error(`  ERR  ${user.email}: ${err.message}`);
      failed++;
    }

    await sleep(THROTTLE_MS);
    inBatch++;
    if (inBatch >= BATCH_SIZE && sent + failed < eligible.length) {
      console.log(`  --- mini-batch of ${BATCH_SIZE} done, pausing ${Math.round(BATCH_PAUSE_MS / 1000)}s for inbox reputation ---`);
      await sleep(BATCH_PAUSE_MS);
      inBatch = 0;
    }
  }

  console.log('');
  console.log('===================================================');
  console.log(`  Done. Sent: ${sent}  Failed: ${failed}`);
  console.log('===================================================');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

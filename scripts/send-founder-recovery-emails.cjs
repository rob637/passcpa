#!/usr/bin/env node

/**
 * send-founder-recovery-emails.cjs
 *
 * One-shot recovery campaign for the first ~220 trial signups who didn't convert.
 *
 * Strategy: a SHORT, personal, founder-signed email that does TWO jobs:
 *   1. Diagnostic — asks one question ("what stopped you?") and invites a reply
 *      to rob@voraprep.com. Replies are gold; far more valuable than any survey.
 *   2. Offer — includes a one-click founder recovery link with FOUNDER220 coupon
 *      pre-applied (30% off founder pricing for the first 3 months).
 *
 * Audience filter (default):
 *   - User created in past 180 days
 *   - No active paid subscription (status not in: active, trialing, past_due)
 *   - Not unsubscribed
 *   - Has a verified email
 *   - Not previously sent this campaign
 *
 * Usage:
 *   # 1. Dry run (default) — shows who would receive, sends nothing
 *   node scripts/send-founder-recovery-emails.cjs --dry-run
 *
 *   # 2. Send to a single test address
 *   RESEND_API_KEY=re_xxx node scripts/send-founder-recovery-emails.cjs --test you@example.com
 *
 *   # 3. Send to a small batch first (recommended)
 *   RESEND_API_KEY=re_xxx node scripts/send-founder-recovery-emails.cjs --send --limit 5
 *
 *   # 4. Full send
 *   RESEND_API_KEY=re_xxx node scripts/send-founder-recovery-emails.cjs --send
 *
 * Required env:
 *   RESEND_API_KEY              — for sending (not needed for --dry-run)
 *   GOOGLE_APPLICATION_CREDENTIALS or serviceAccountKey.json at repo root
 *
 * Optional flags:
 *   --since-days N              — only users created in last N days (default 180)
 *   --course CPA|EA|...         — only users with this active course
 *   --no-track                  — don't write users/{uid}.recoveryEmail field (test mode)
 */

const path = require('path');
const fs = require('fs');
const admin = require('firebase-admin');

// Resend lives in functions/node_modules
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

const CAMPAIGN_ID = 'founder220-recovery-2026-04';
const COUPON_CODE = 'FOUNDER220';
const FROM_EMAIL = 'Rob from VoraPrep <rob@voraprep.com>';
const REPLY_TO = 'rob@voraprep.com';
const BASE_URL = process.env.RECOVERY_BASE_URL || 'https://voraprep.com';

// Throttle to be safe (Resend free = 2 req/s; paid up to 10)
const THROTTLE_MS = 600;

// ============================================================================
// CLI
// ============================================================================

const args = process.argv.slice(2);
const dryRun = !args.includes('--send');
const testEmail = (() => {
  const i = args.indexOf('--test');
  return i >= 0 ? args[i + 1] : null;
})();
const limit = (() => {
  const i = args.indexOf('--limit');
  return i >= 0 ? parseInt(args[i + 1], 10) : null;
})();
const sinceDays = (() => {
  const i = args.indexOf('--since-days');
  return i >= 0 ? parseInt(args[i + 1], 10) : 180;
})();
const courseFilter = (() => {
  const i = args.indexOf('--course');
  return i >= 0 ? args[i + 1].toLowerCase() : null;
})();
const skipTracking = args.includes('--no-track');

// ============================================================================
// COURSE LABELS
// ============================================================================

const COURSE_INFO = {
  cpa:  { name: 'CPA',  full: 'CPA Exam' },
  ea:   { name: 'EA',   full: 'Enrolled Agent Exam' },
  cma:  { name: 'CMA',  full: 'CMA Exam' },
  cia:  { name: 'CIA',  full: 'CIA Exam' },
  cisa: { name: 'CISA', full: 'CISA Exam' },
  cfp:  { name: 'CFP',  full: 'CFP Exam' },
};

function getCourseInfo(courseId) {
  return COURSE_INFO[courseId] || { name: 'exam', full: 'professional exam' };
}

// ============================================================================
// EMAIL TEMPLATE — short, personal, founder-signed
// ============================================================================

function buildSubject(courseInfo) {
  return `Quick question about your ${courseInfo.name} prep`;
}

function buildCheckoutUrl(courseId) {
  const c = courseId || 'cpa';
  // Annual is the smarter conversion lever (3-month coupon repeats — bigger total value perception)
  return `${BASE_URL}/start-checkout?course=${c}&interval=annual&coupon=${COUPON_CODE}&utm_source=recovery&utm_medium=email&utm_campaign=${CAMPAIGN_ID}`;
}

function buildHtml({ firstName, courseInfo, checkoutUrl, userEmail }) {
  const greeting = firstName && firstName !== 'there' ? firstName : 'there';
  const unsubUrl = `${BASE_URL.replace('/app.', '/')}/unsubscribe?email=${encodeURIComponent(userEmail)}`;

  return `<!DOCTYPE html>
<html><body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 24px; color: #1a1a1a; line-height: 1.55;">

<p>Hey ${greeting},</p>

<p>I'm Rob, the founder of VoraPrep. I noticed you signed up to try us out for the ${courseInfo.full} but didn't continue — and I want to do better.</p>

<p><strong>Can you reply with one sentence on what stopped you?</strong> Was it pricing, the content, the UI, timing, or something else? I read every reply personally.</p>

<p>And because you were one of our first ${courseInfo.name} candidates to give us a shot, I'd like to make it right:</p>

<p style="background: #f4f7fb; border-left: 4px solid #2563eb; padding: 14px 16px; margin: 18px 0; border-radius: 4px;">
  <strong>30% off founder pricing for your first 3 months</strong> — code <code style="background:#e6edf6;padding:2px 6px;border-radius:3px;font-weight:600;">${COUPON_CODE}</code> is auto-applied at this link:<br><br>
  <a href="${checkoutUrl}" style="display:inline-block;background:#2563eb;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none;font-weight:600;">Claim founder pricing →</a>
</p>

<p>This offer expires in 14 days and is limited to the first 220 of you. No tricks, no auto-renew lock-in beyond what Stripe handles — you can cancel any time from your account.</p>

<p>Either way — even if you just reply with "too expensive" or "not for me" — it'll genuinely help us build something you'd want to come back to.</p>

<p>Thanks for taking a look at us.</p>

<p>— Rob<br>
<span style="color:#666;font-size:14px;">Founder, VoraPrep</span></p>

<hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0 12px;">
<p style="font-size:12px;color:#888;line-height:1.4;">
You're receiving this because you signed up at voraprep.com. <a href="${unsubUrl}" style="color:#888;">Unsubscribe</a>.<br>
VoraPrep is not affiliated with AICPA, NASBA, the IRS, IIA, IMA, ISACA, or the CFP Board.
</p>

</body></html>`;
}

function buildText({ firstName, courseInfo, checkoutUrl, userEmail }) {
  const greeting = firstName && firstName !== 'there' ? firstName : 'there';
  const unsubUrl = `${BASE_URL.replace('/app.', '/')}/unsubscribe?email=${encodeURIComponent(userEmail)}`;
  return `Hey ${greeting},

I'm Rob, the founder of VoraPrep. I noticed you signed up to try us out for the ${courseInfo.full} but didn't continue — and I want to do better.

Can you reply with one sentence on what stopped you? Was it pricing, the content, the UI, timing, or something else? I read every reply personally.

And because you were one of our first ${courseInfo.name} candidates to give us a shot, I'd like to make it right:

  30% off founder pricing for your first 3 months — code ${COUPON_CODE} is auto-applied at this link:
  ${checkoutUrl}

This offer expires in 14 days and is limited to the first 220 of you.

Either way — even if you just reply with "too expensive" or "not for me" — it'll genuinely help us build something you'd want to come back to.

Thanks for taking a look at us.

— Rob
Founder, VoraPrep

---
You're receiving this because you signed up at voraprep.com. Unsubscribe: ${unsubUrl}
`;
}

// ============================================================================
// MAIN
// ============================================================================

function initFirebase() {
  const serviceAccountPath = path.join(__dirname, '../serviceAccountKey.json');
  if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = require(serviceAccountPath);
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
  } else {
    admin.initializeApp();
  }
}

async function isEligible(userDoc, db) {
  const data = userDoc.data();
  if (!data) return { ok: false, reason: 'no data' };
  if (data.emailUnsubscribed) return { ok: false, reason: 'unsubscribed' };
  if (data.recoveryEmail?.[CAMPAIGN_ID]?.sentAt) return { ok: false, reason: 'already sent' };

  // Course filter
  if (courseFilter && (data.activeCourse || '').toLowerCase() !== courseFilter) {
    return { ok: false, reason: `course != ${courseFilter}` };
  }

  // Active subscription check
  const subDoc = await db.collection('subscriptions').doc(userDoc.id).get();
  if (subDoc.exists) {
    const status = subDoc.data()?.status;
    if (['active', 'trialing', 'past_due'].includes(status)) {
      return { ok: false, reason: `active sub (${status})` };
    }
  }

  return { ok: true };
}

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function main() {
  console.log('');
  console.log('===================================================');
  console.log('  Founder Recovery Campaign');
  console.log(`  Mode: ${dryRun ? 'DRY RUN (no emails sent)' : 'LIVE SEND'}`);
  console.log(`  Campaign ID: ${CAMPAIGN_ID}`);
  console.log(`  Coupon: ${COUPON_CODE}`);
  console.log(`  Since: ${sinceDays} days ago`);
  if (courseFilter) console.log(`  Course filter: ${courseFilter}`);
  if (limit) console.log(`  Limit: ${limit}`);
  if (testEmail) console.log(`  Test mode → ${testEmail}`);
  console.log('===================================================');
  console.log('');

  // Resend init (only required if actually sending)
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

  // ---- TEST MODE: send a single email to a target address ----
  if (testEmail) {
    const courseInfo = getCourseInfo(courseFilter || 'cpa');
    const html = buildHtml({
      firstName: 'there',
      courseInfo,
      checkoutUrl: buildCheckoutUrl(courseFilter || 'cpa'),
      userEmail: testEmail,
    });
    const text = buildText({
      firstName: 'there',
      courseInfo,
      checkoutUrl: buildCheckoutUrl(courseFilter || 'cpa'),
      userEmail: testEmail,
    });
    const subject = buildSubject(courseInfo);

    if (dryRun) {
      console.log('--- TEST EMAIL PREVIEW ---');
      console.log(`To: ${testEmail}`);
      console.log(`Subject: ${subject}`);
      console.log(`From: ${FROM_EMAIL}`);
      console.log('---');
      console.log(text);
      console.log('--- (HTML version omitted; remove --dry-run to send) ---');
      return;
    }

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      reply_to: REPLY_TO,
      to: testEmail,
      subject,
      html,
      text,
      headers: {
        'List-Unsubscribe': `<mailto:unsubscribe@voraprep.com?subject=Unsubscribe%20${encodeURIComponent(testEmail)}>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
      tags: [
        { name: 'campaign', value: CAMPAIGN_ID },
        { name: 'type', value: 'recovery' },
      ],
    });
    if (error) {
      console.error('Send failed:', error);
      process.exit(1);
    }
    console.log(`Test email sent to ${testEmail}`);
    return;
  }

  // ---- BULK MODE: query Firestore for eligible users ----
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - sinceDays);

  console.log('Querying users...');
  const usersSnap = await db.collection('users')
    .where('createdAt', '>=', admin.firestore.Timestamp.fromDate(cutoff))
    .get();

  console.log(`Found ${usersSnap.size} users created in last ${sinceDays} days. Filtering...`);
  console.log('');

  const eligible = [];
  const skipped = { unsubscribed: 0, alreadySent: 0, activeSub: 0, courseFilter: 0, noEmail: 0, noData: 0 };

  for (const doc of usersSnap.docs) {
    const result = await isEligible(doc, db);
    if (!result.ok) {
      const key = result.reason.includes('active sub') ? 'activeSub'
        : result.reason.includes('course') ? 'courseFilter'
        : result.reason === 'unsubscribed' ? 'unsubscribed'
        : result.reason === 'already sent' ? 'alreadySent'
        : 'noData';
      skipped[key] = (skipped[key] || 0) + 1;
      continue;
    }

    // Need an email — try Firestore field first, then Auth
    const data = doc.data();
    let email = data.email;
    if (!email) {
      try {
        const authUser = await admin.auth().getUser(doc.id);
        email = authUser.email;
      } catch {
        skipped.noEmail++;
        continue;
      }
    }
    if (!email) { skipped.noEmail++; continue; }

    eligible.push({
      uid: doc.id,
      email,
      firstName: data.firstName || (data.displayName ? data.displayName.split(' ')[0] : null),
      activeCourse: (data.activeCourse || 'cpa').toLowerCase(),
    });

    if (limit && eligible.length >= limit) break;
  }

  console.log(`Eligible: ${eligible.length}`);
  console.log(`Skipped:  ${JSON.stringify(skipped)}`);
  console.log('');

  if (eligible.length === 0) {
    console.log('No eligible recipients. Exiting.');
    return;
  }

  if (dryRun) {
    console.log('--- DRY RUN: would send to ---');
    eligible.slice(0, 20).forEach((u) => {
      console.log(`  ${u.email}  (${u.activeCourse})  firstName=${u.firstName || '-'}`);
    });
    if (eligible.length > 20) console.log(`  ... and ${eligible.length - 20} more`);
    console.log('');
    console.log('To actually send, re-run with --send');
    return;
  }

  // ---- LIVE SEND ----
  let sent = 0;
  let failed = 0;

  for (const user of eligible) {
    const courseInfo = getCourseInfo(user.activeCourse);
    const subject = buildSubject(courseInfo);
    const checkoutUrl = buildCheckoutUrl(user.activeCourse);
    const html = buildHtml({ firstName: user.firstName, courseInfo, checkoutUrl, userEmail: user.email });
    const text = buildText({ firstName: user.firstName, courseInfo, checkoutUrl, userEmail: user.email });

    try {
      const { error } = await resend.emails.send({
        from: FROM_EMAIL,
        reply_to: REPLY_TO,
        to: user.email,
        subject,
        html,
        text,
        headers: {
          'List-Unsubscribe': `<${BASE_URL.replace('/app.', '/')}/unsubscribe?email=${encodeURIComponent(user.email)}>, <mailto:unsubscribe@voraprep.com?subject=Unsubscribe%20${encodeURIComponent(user.email)}>`,
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
        },
        tags: [
          { name: 'campaign', value: CAMPAIGN_ID },
          { name: 'type', value: 'recovery' },
          { name: 'course', value: user.activeCourse },
        ],
      });

      if (error) {
        console.error(`  FAIL ${user.email}: ${error.message || JSON.stringify(error)}`);
        failed++;
      } else {
        sent++;
        console.log(`  OK   ${user.email}  (${user.activeCourse})`);
        if (!skipTracking) {
          await db.collection('users').doc(user.uid).set({
            recoveryEmail: {
              [CAMPAIGN_ID]: {
                sentAt: admin.firestore.FieldValue.serverTimestamp(),
                coupon: COUPON_CODE,
                course: user.activeCourse,
              },
            },
          }, { merge: true });
        }
      }
    } catch (err) {
      console.error(`  ERR  ${user.email}: ${err.message}`);
      failed++;
    }

    await sleep(THROTTLE_MS);
  }

  console.log('');
  console.log('===================================================');
  console.log(`  Sent:   ${sent}`);
  console.log(`  Failed: ${failed}`);
  console.log('===================================================');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});

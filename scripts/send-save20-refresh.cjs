#!/usr/bin/env node

/**
 * send-save20-refresh.cjs
 *
 * One-shot "we simplified the offer" email for users who ALREADY received
 * the original winback step-1 email (with WELCOMEBACK / START9). It informs
 * them that we replaced WELCOMEBACK with a single universal code: SAVE20.
 *
 * It is deliberately NOT a re-blast of the same offer — it's a short,
 * honest "the code changed, here's the new one" note.
 *
 *   - Audience: users with profile.winbackEmail['winback-2026-04'].sentAt set
 *   - Dedup:    profile.winbackEmail['save20-refresh-2026-04'].sentAt
 *   - Honors:   /emailSuppressions/{normalizedEmail} unsubscribes
 *   - Skips:    junk patterns (same regex as send-winback-emails.cjs)
 *
 * Users who NEVER got the winback drip will get SAVE20 naturally through
 * the existing winback-drip workflow (now updated to use SAVE20 instead of
 * WELCOMEBACK). DO NOT include them here — that would duplicate.
 *
 * Usage:
 *   # Preview audience
 *   node scripts/send-save20-refresh.cjs --dry-run
 *
 *   # Test send to your inbox
 *   RESEND_API_KEY=re_xxx node scripts/send-save20-refresh.cjs --test you@example.com
 *
 *   # Live small batch
 *   RESEND_API_KEY=re_xxx node scripts/send-save20-refresh.cjs --send --limit 25
 *
 *   # Live full send (all eligible)
 *   RESEND_API_KEY=re_xxx node scripts/send-save20-refresh.cjs --send
 */

const path = require('path');
const fs   = require('fs');

let admin;
try { admin = require('firebase-admin'); }
catch { admin = require('../functions/node_modules/firebase-admin'); }

let Resend;
try { ({ Resend } = require('../functions/node_modules/resend')); }
catch { console.error('resend missing. Run: cd functions && npm install'); process.exit(1); }

// ============================================================================
// CONFIG
// ============================================================================
const PRIOR_CAMPAIGN_ID  = 'winback-2026-04';            // who we target
const CAMPAIGN_ID        = 'save20-refresh-2026-04';     // dedup key for THIS send
const COUPON_CODE        = 'SAVE20';
const OLD_COUPON_CODE    = 'WELCOMEBACK';
const COUPON_EXPIRES_ISO = '2026-05-26';
const FROM_EMAIL = 'Rob from VoraPrep <rob@voraprep.com>';
const REPLY_TO   = 'rob@voraprep.com';
const BASE_URL   = 'https://voraprep.com';
const DEFAULT_BCC = 'rob@sagecg.com';
const THROTTLE_MS = 1200;
const BATCH_SIZE      = 20;
const BATCH_PAUSE_MS  = 90_000;

const COURSE_INFO = {
  cpa:  { name: 'CPA',  path: '/cpa',     monthly: 29, annual: 249 },
  ea:   { name: 'EA',   path: '/ea-prep', monthly: 19, annual: 149 },
  cma:  { name: 'CMA',  path: '/cma',     monthly: 25, annual: 199 },
  cia:  { name: 'CIA',  path: '/cia',     monthly: 19, annual: 149 },
  cisa: { name: 'CISA', path: '/cisa',    monthly: 25, annual: 199 },
  cfp:  { name: 'CFP',  path: '/cfp',     monthly: 25, annual: 199 },
};
const courseInfo = (id) => COURSE_INFO[(id || 'cpa').toLowerCase()] || COURSE_INFO.cpa;

const JUNK_PATTERNS = [
  /@example\.(com|net|org)$/i,
  /@test\./i,
  /@(jddj|jdj|asdf|qwerty|test)\.(com|net|org)$/i,
  /^rob\+.*@sagecg\.com$/i,
  /^testuser/i,
  /@gmaio\.com$/i,
  /@(yopmail|mailinator|guerrillamail|10minutemail|tempmail|temp-mail)\./i,
];
const isJunk = (e) => !e || !e.includes('@') || JUNK_PATTERNS.some((r) => r.test(e));

function formatExpiry(iso = COUPON_EXPIRES_ISO) {
  const d = new Date(iso + 'T00:00:00Z');
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' });
}
function daysUntilExpiry(iso = COUPON_EXPIRES_ISO) {
  return Math.max(0, Math.ceil((new Date(iso + 'T23:59:59Z').getTime() - Date.now()) / 86_400_000));
}

// ============================================================================
// CLI
// ============================================================================
const argv = process.argv.slice(2);
const flag = (n) => argv.includes(n);
const arg  = (n, d = null) => { const i = argv.indexOf(n); return i >= 0 && i + 1 < argv.length ? argv[i + 1] : d; };
const dryRun     = flag('--dry-run') || !flag('--send');
const testEmail  = arg('--test');
const limit      = arg('--limit') ? parseInt(arg('--limit'), 10) : null;
const noTrack    = flag('--no-track');
const bccAddress = flag('--no-bcc') ? null : (arg('--bcc') || DEFAULT_BCC);

// ============================================================================
// FIREBASE
// ============================================================================
function initFirebase() {
  if (admin.apps.length) return;
  const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
    || path.join(__dirname, '..', 'serviceAccountKey.prod.json');
  if (!fs.existsSync(credPath)) { console.error(`SA key not found at ${credPath}`); process.exit(1); }
  admin.initializeApp({ credential: admin.credential.cert(require(credPath)) });
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const suppressionId = (email) => email.trim().toLowerCase().replace(/[^a-z0-9@._+-]/gi, '_');

// ============================================================================
// LINKS
// ============================================================================
function buildCheckoutUrl({ uid, courseId, interval = 'annual' }) {
  const u = new URL(`${BASE_URL}/start-checkout`);
  u.searchParams.set('course', courseId);
  u.searchParams.set('interval', interval);
  u.searchParams.set('coupon', COUPON_CODE);
  u.searchParams.set('utm_source', 'email');
  u.searchParams.set('utm_medium', 'winback');
  u.searchParams.set('utm_campaign', CAMPAIGN_ID);
  u.searchParams.set('utm_content', interval);
  u.searchParams.set('utm_term', courseId);
  if (uid) u.searchParams.set('rid', uid.slice(0, 8));
  return u.toString();
}
function unsubUrl(email) {
  const u = new URL(`${BASE_URL}/api/unsubscribe`);
  u.searchParams.set('email', email);
  u.searchParams.set('campaign', CAMPAIGN_ID);
  return u.toString();
}

// ============================================================================
// EMAIL — short, honest, "the code changed"
// ============================================================================
function renderEmail({ uid, firstName, courseId, email }) {
  const info = courseInfo(courseId);
  const greeting = firstName && firstName !== 'there' ? firstName : 'there';
  const annualUrl  = buildCheckoutUrl({ uid, courseId, interval: 'annual' });
  const monthlyUrl = buildCheckoutUrl({ uid, courseId, interval: 'monthly' });
  const unsub = unsubUrl(email);
  const expiry = formatExpiry();
  const days = daysUntilExpiry();
  const monthlyAfter = (info.monthly * 0.8).toFixed(2);
  const annualAfter  = Math.round(info.annual * 0.8);
  const annualSaving = info.annual - annualAfter;

  const subject = `Quick update — ${OLD_COUPON_CODE} is now ${COUPON_CODE} (works on monthly too)`;
  const preheader = `Same 20%, simpler code. Works on monthly OR annual. Expires ${expiry}.`;

  const text = `Hey ${greeting},

Quick update on the ${info.name} prep offer I sent you a few days back.

We simplified things. ${OLD_COUPON_CODE} only worked on the annual plan,
so I retired it and replaced it with a single code that works on both:

  ${COUPON_CODE} = 20% off, monthly OR annual

Your ${info.name} prep with ${COUPON_CODE}:
  • Annual:   $${info.annual}/yr  →  $${annualAfter} first year (save $${annualSaving})
  • Monthly:  $${info.monthly}/mo →  $${monthlyAfter}/mo for the first 3 months

If you were on the fence because monthly didn't have a discount — it does now.

Apply at checkout, or just open one of these (code is pre-filled):
  Annual:   ${annualUrl}
  Monthly:  ${monthlyUrl}

${COUPON_CODE} expires ${expiry} (${days} day${days === 1 ? '' : 's'} left).
Same pass guarantee — study free until you pass.

— Rob
   Founder, VoraPrep

---
Unsubscribe (one click): ${unsub}
`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark"><title>${subject}</title></head>
<body style="margin:0;padding:0;background:#f6f8fb;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f8fb;">
<tr><td align="center" style="padding:24px 12px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1a1a1a;line-height:1.55;">
    <tr><td style="padding:28px 28px 8px;">
      <p style="margin:0 0 16px;font-size:16px;">Hey ${greeting},</p>
      <p style="margin:0 0 16px;font-size:16px;">Quick update on the ${info.name} prep offer I sent you a few days back.</p>
      <p style="margin:0 0 16px;font-size:16px;">We simplified things. <code style="background:#eef2f7;padding:2px 5px;border-radius:3px;font-weight:600;">${OLD_COUPON_CODE}</code> only worked on the annual plan, so I retired it and replaced it with a single code that works on both:</p>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#f59e0b,#f43f5e);border-radius:10px;margin:0 0 22px 0;">
        <tr><td style="padding:22px;text-align:center;">
          <div style="font-size:13px;font-weight:600;color:#fff7ed;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:6px;">New code</div>
          <div style="font-size:38px;font-weight:800;color:#fff;letter-spacing:4px;font-family:'SF Mono',Menlo,monospace;">${COUPON_CODE}</div>
          <div style="font-size:14px;color:#fff7ed;margin-top:6px;">20% off — monthly or annual</div>
        </td></tr>
      </table>

      <p style="margin:0 0 8px;font-size:16px;font-weight:600;">Your ${info.name} prep with ${COUPON_CODE}:</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;margin:0 0 18px 0;">
        <tr><td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;">
          <div style="font-size:13px;color:#666;">Annual</div>
          <div style="font-size:18px;font-weight:700;color:#111;">$${info.annual}/yr → <span style="color:#16a34a;">$${annualAfter} first year</span></div>
          <div style="font-size:12px;color:#666;">save $${annualSaving}</div>
        </td></tr>
        <tr><td style="padding:12px 16px;">
          <div style="font-size:13px;color:#666;">Monthly</div>
          <div style="font-size:18px;font-weight:700;color:#111;">$${info.monthly}/mo → <span style="color:#16a34a;">$${monthlyAfter}/mo for 3 months</span></div>
          <div style="font-size:12px;color:#666;">new — wasn't available with ${OLD_COUPON_CODE}</div>
        </td></tr>
      </table>

      <p style="margin:0 0 8px;font-size:15px;color:#444;">If you were on the fence because monthly didn't have a discount — it does now.</p>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:14px 0 6px;">
        <tr>
          <td align="center" style="padding:6px;width:50%;">
            <a href="${monthlyUrl}" style="display:inline-block;background:#fff;color:#2563eb;border:2px solid #2563eb;padding:11px 18px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">Start at $${monthlyAfter}/mo →</a>
            <br><span style="font-size:12px;color:#666;">${COUPON_CODE} pre-applied</span>
          </td>
          <td align="center" style="padding:6px;width:50%;">
            <a href="${annualUrl}" style="display:inline-block;background:#2563eb;color:#fff;padding:13px 18px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">Save $${annualSaving} — $${annualAfter}/yr →</a>
            <br><span style="font-size:12px;color:#666;">${COUPON_CODE} pre-applied</span>
          </td>
        </tr>
      </table>
      <p style="margin:0 0 18px;text-align:center;font-size:12px;color:#b91c1c;font-weight:600;">${COUPON_CODE} expires ${expiry} — ${days} day${days === 1 ? '' : 's'} left.</p>

      <p style="margin:18px 0 4px;font-size:15px;">— Rob</p>
      <p style="margin:0;font-size:13px;color:#666;">Founder, VoraPrep</p>
    </td></tr>
    <tr><td style="padding:24px 28px;border-top:1px solid #eef0f4;">
      <p style="margin:0;font-size:12px;color:#888;line-height:1.5;">
        You're getting this because you signed up at voraprep.com. <a href="${unsub}" style="color:#888;">Unsubscribe</a> — one click, no questions.
      </p>
    </td></tr>
  </table>
</td></tr>
</table>
</body></html>`;

  return { subject, preheader, html, text };
}

// ============================================================================
// MAIN
// ============================================================================
async function main() {
  console.log('===================================================');
  console.log(`  SAVE20 Refresh — ${dryRun ? 'DRY RUN' : 'LIVE'}`);
  console.log(`  Targeting users who got: ${PRIOR_CAMPAIGN_ID}`);
  console.log(`  Dedup key:               ${CAMPAIGN_ID}`);
  console.log(`  Code:                    ${COUPON_CODE} (expires ${formatExpiry()})`);
  if (limit)      console.log(`  Limit:                   ${limit}`);
  if (testEmail)  console.log(`  Test mode →              ${testEmail}`);
  if (bccAddress) console.log(`  BCC every send →         ${bccAddress}`);
  console.log('===================================================\n');

  let resend = null;
  if (!dryRun) {
    if (!process.env.RESEND_API_KEY) { console.error('RESEND_API_KEY required for --send'); process.exit(1); }
    resend = new Resend(process.env.RESEND_API_KEY.trim());
  }

  initFirebase();
  const db = admin.firestore();

  const isSuppressed = async (email) => {
    try {
      const doc = await db.collection('emailSuppressions').doc(suppressionId(email)).get();
      return doc.exists && doc.data()?.unsubscribed !== false;
    } catch { return false; }
  };

  // ---- TEST MODE ----
  if (testEmail) {
    const rendered = renderEmail({
      uid: 'TESTUSER', firstName: 'there', courseId: 'cpa', email: testEmail,
    });
    if (dryRun) {
      console.log('--- TEST EMAIL PREVIEW ---');
      console.log(`To:      ${testEmail}`);
      console.log(`Subject: ${rendered.subject}`);
      console.log('---'); console.log(rendered.text);
      console.log('--- (HTML omitted; remove --dry-run to send) ---');
      return;
    }
    const { error } = await resend.emails.send({
      from: FROM_EMAIL, reply_to: REPLY_TO, to: testEmail,
      ...(bccAddress && bccAddress.toLowerCase() !== testEmail.toLowerCase() ? { bcc: bccAddress } : {}),
      subject: rendered.subject, html: rendered.html, text: rendered.text,
      headers: {
        'List-Unsubscribe': `<${unsubUrl(testEmail)}>, <mailto:unsubscribe@voraprep.com?subject=Unsubscribe%20${encodeURIComponent(testEmail)}>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
      tags: [{ name: 'campaign', value: CAMPAIGN_ID }, { name: 'type', value: 'test' }],
    });
    if (error) { console.error('FAIL:', error.message || JSON.stringify(error)); process.exit(1); }
    console.log(`OK — sent test to ${testEmail}`);
    return;
  }

  // ---- BLAST MODE ----
  console.log('Loading users...');
  const usersSnap = await db.collection('users').get();
  console.log(`  ${usersSnap.size} total user docs.`);

  const skipped = { noPrior: 0, alreadySent: 0, junk: 0, noEmail: 0, suppressed: 0 };
  const candidates = [];
  for (const doc of usersSnap.docs) {
    const u = doc.data();
    const email = (u.email || '').trim().toLowerCase();
    if (!email) { skipped.noEmail++; continue; }
    if (isJunk(email)) { skipped.junk++; continue; }
    const prior = u.winbackEmail?.[PRIOR_CAMPAIGN_ID]?.sentAt;
    if (!prior) { skipped.noPrior++; continue; }
    const alreadySent = u.winbackEmail?.[CAMPAIGN_ID]?.sentAt;
    if (alreadySent) { skipped.alreadySent++; continue; }
    candidates.push({
      uid: doc.id,
      email,
      firstName: (u.displayName || '').split(' ')[0] || 'there',
      courseId: (u.activeCourse || 'cpa').toLowerCase(),
    });
  }

  // Filter suppressions in parallel.
  const suppressedFlags = await Promise.all(candidates.map((c) => isSuppressed(c.email)));
  const eligible = candidates.filter((_, i) => {
    if (suppressedFlags[i]) { skipped.suppressed++; return false; }
    return true;
  });

  console.log(`  ${eligible.length} eligible after filters.`);
  console.log(`  Skipped — no prior winback: ${skipped.noPrior}, already got refresh: ${skipped.alreadySent}, junk: ${skipped.junk}, no email: ${skipped.noEmail}, suppressed: ${skipped.suppressed}\n`);

  let sent = 0, failed = 0;
  for (let i = 0; i < eligible.length; i++) {
    if (limit && sent >= limit) break;
    const c = eligible[i];
    const rendered = renderEmail(c);

    if (dryRun) {
      console.log(`  [dry] ${c.email.padEnd(40)} ${c.courseId.padEnd(5)} ${rendered.subject}`);
      sent++;
      continue;
    }

    const { error } = await resend.emails.send({
      from: FROM_EMAIL, reply_to: REPLY_TO, to: c.email,
      ...(bccAddress ? { bcc: bccAddress } : {}),
      subject: rendered.subject, html: rendered.html, text: rendered.text,
      headers: {
        'List-Unsubscribe': `<${unsubUrl(c.email)}>, <mailto:unsubscribe@voraprep.com?subject=Unsubscribe%20${encodeURIComponent(c.email)}>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
      tags: [
        { name: 'campaign', value: CAMPAIGN_ID },
        { name: 'course',   value: c.courseId },
      ],
    });
    if (error) {
      failed++;
      console.error(`  FAIL ${c.email}: ${error.message || JSON.stringify(error)}`);
    } else {
      sent++;
      if (!noTrack) {
        await db.collection('users').doc(c.uid).set({
          winbackEmail: { [CAMPAIGN_ID]: { sentAt: admin.firestore.FieldValue.serverTimestamp() } },
        }, { merge: true });
      }
      if (sent % 10 === 0) console.log(`  sent ${sent}/${eligible.length}...`);
    }
    await sleep(THROTTLE_MS);
    if (sent > 0 && sent % BATCH_SIZE === 0 && sent < eligible.length) {
      console.log(`  ...mini-batch pause (${BATCH_PAUSE_MS / 1000}s)...`);
      await sleep(BATCH_PAUSE_MS);
    }
  }

  console.log('\n===================================================');
  console.log(`  Sent:               ${sent}`);
  console.log(`  Failed:             ${failed}`);
  console.log('===================================================');
}

main().catch((err) => { console.error('Fatal:', err); process.exit(1); });

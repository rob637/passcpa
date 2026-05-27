#!/usr/bin/env node
/**
 * dispatch-breach-resets.cjs
 *
 * Breach-response script for the users.json + orphaned-users.json incident.
 * For every affected user, this script:
 *   1. Generates a Firebase Auth password reset link (Admin SDK).
 *   2. Sends a branded breach-disclosure email via Resend with the reset link
 *      and an explanation of what was leaked + what we did.
 *   3. Records the result (sent / skipped / failed) to a JSON report.
 *
 * Safe by default:
 *   - --dry-run is on unless --live is passed.
 *   - --send-to overrides the recipient for end-to-end testing.
 *   - --limit caps the number of users processed in one run.
 *   - --resume picks up where the last run left off (idempotent via report file).
 *
 * Required environment / files:
 *   - GOOGLE_APPLICATION_CREDENTIALS  (path to serviceAccountKey.json) OR
 *     ./serviceAccountKey.json at repo root.
 *   - RESEND_API_KEY                  (real Resend API key)
 *   - FIREBASE_PROJECT_ID             (e.g. voraprep-prod) — used for the
 *                                      action-code URL continueUrl.
 *
 * Usage:
 *   # Dry-run (default), reads /tmp/users.json.backup
 *   node scripts/dispatch-breach-resets.cjs
 *
 *   # Dry-run, only first 3 users, send all emails to me for review
 *   node scripts/dispatch-breach-resets.cjs --limit 3 --send-to me@example.com
 *
 *   # LIVE — actually send to real users (idempotent, safe to resume)
 *   node scripts/dispatch-breach-resets.cjs --live --resume
 *
 * The script writes to ./scripts/.breach-reset-report.json. Re-running with
 * --resume skips users already marked "sent".
 */

const fs = require('fs');
const path = require('path');

// ─────────────────────────────────────────────────────────────────────────────
// CLI args
// ─────────────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const optVal = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};

const LIVE = flag('--live');
const DRY_RUN = !LIVE;
const RESUME = flag('--resume');
const LIMIT = parseInt(optVal('--limit') || '0', 10);
const SEND_TO_OVERRIDE = optVal('--send-to');
const INPUT_FILE = optVal('--input') || '/tmp/users.json.backup';
const ORPHANED_FILE = optVal('--orphaned') || '/tmp/orphaned-users.json.backup';
const REPORT_FILE = path.join(__dirname, '.breach-reset-report.json');
const HELP = flag('--help') || flag('-h');

if (HELP) {
  console.log(fs.readFileSync(__filename, 'utf8').split('*/')[0]);
  process.exit(0);
}

// ─────────────────────────────────────────────────────────────────────────────
// Pre-flight checks
// ─────────────────────────────────────────────────────────────────────────────
const RESEND_API_KEY = process.env.RESEND_API_KEY?.trim();
const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID?.trim() || 'voraprep-prod';

if (!RESEND_API_KEY) {
  console.error('ERROR: RESEND_API_KEY env var is required.');
  console.error('Set with:  export RESEND_API_KEY=re_xxxxxxxxxxxx');
  process.exit(1);
}

const candidateKeyPaths = [
  process.env.GOOGLE_APPLICATION_CREDENTIALS,
  path.join(process.cwd(), 'serviceAccountKey.json'),
  path.join(__dirname, '..', 'serviceAccountKey.json'),
].filter(Boolean);

let serviceAccountPath;
for (const p of candidateKeyPaths) {
  if (p && fs.existsSync(p)) {
    serviceAccountPath = p;
    break;
  }
}
if (!serviceAccountPath) {
  console.error('ERROR: Could not find serviceAccountKey.json.');
  console.error('Set GOOGLE_APPLICATION_CREDENTIALS or place serviceAccountKey.json at repo root.');
  process.exit(1);
}

if (!fs.existsSync(INPUT_FILE)) {
  console.error(`ERROR: input file not found: ${INPUT_FILE}`);
  console.error('Use --input <path> to override.');
  process.exit(1);
}

// ─────────────────────────────────────────────────────────────────────────────
// Lazy-require heavy deps after preflight (so --help works without install)
// ─────────────────────────────────────────────────────────────────────────────
let admin, Resend;
try {
  admin = require('firebase-admin');
  ({ Resend } = require('resend'));
} catch (err) {
  console.error('ERROR: missing deps. Install with:');
  console.error('  npm install --no-save firebase-admin resend');
  console.error(err.message);
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: FIREBASE_PROJECT_ID,
});
const auth = admin.auth();
const resend = new Resend(RESEND_API_KEY);

// ─────────────────────────────────────────────────────────────────────────────
// Load affected users
// ─────────────────────────────────────────────────────────────────────────────
function loadAffected() {
  const main = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf8'));
  const users = Array.isArray(main) ? main : main.users || [];
  const byEmail = new Map();
  for (const u of users) {
    const email = (u.email || '').toLowerCase().trim();
    if (!email) continue;
    byEmail.set(email, {
      email,
      displayName: u.displayName || u.providerUserInfo?.[0]?.displayName || '',
      uid: u.localId || u.uid,
      hadPasswordHash: Boolean(u.passwordHash),
    });
  }
  // Merge orphaned-users.json if present
  if (fs.existsSync(ORPHANED_FILE)) {
    try {
      const orphans = JSON.parse(fs.readFileSync(ORPHANED_FILE, 'utf8'));
      for (const u of orphans) {
        const email = (u.email || '').toLowerCase().trim();
        if (!email) continue;
        if (!byEmail.has(email)) {
          byEmail.set(email, {
            email,
            displayName: u.displayName || '',
            uid: u.uid,
            hadPasswordHash: false,
          });
        }
      }
    } catch (e) {
      console.warn(`WARN: could not parse ${ORPHANED_FILE}: ${e.message}`);
    }
  }
  return [...byEmail.values()];
}

// ─────────────────────────────────────────────────────────────────────────────
// Report (idempotent resume)
// ─────────────────────────────────────────────────────────────────────────────
function loadReport() {
  if (!RESUME || !fs.existsSync(REPORT_FILE)) {
    return { startedAt: new Date().toISOString(), runs: [], results: {} };
  }
  return JSON.parse(fs.readFileSync(REPORT_FILE, 'utf8'));
}
function saveReport(report) {
  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));
}

// ─────────────────────────────────────────────────────────────────────────────
// Email template
// ─────────────────────────────────────────────────────────────────────────────
function renderEmail({ displayName, resetLink, hadPasswordHash }) {
  const name = displayName?.split(' ')[0] || 'there';
  const credLine = hadPasswordHash
    ? 'your scrambled password hash (not your actual password, but still sensitive)'
    : 'your account identifier (your password was never affected because you sign in with Google)';

  const subject = 'Important security notice about your VoraPrep account';

  const html = `<!doctype html>
<html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1f2937;line-height:1.55">
  <h2 style="color:#111827;margin-top:0">Hi ${escapeHtml(name)},</h2>
  <p>We're writing to let you know about a security issue we discovered and fixed
  on our end, and to ask you to take one quick action.</p>

  <h3 style="color:#b91c1c">What happened</h3>
  <p>A file containing the email addresses, display names, and ${credLine}
  for a group of VoraPrep accounts &mdash; including yours &mdash;
  was accidentally included in our public source code repository on GitHub.
  We discovered this on May 27, 2026 and removed it the same day.</p>

  <p><strong>Your actual password was not exposed.</strong> Even the password hash
  uses Firebase's scrypt algorithm, which is extremely slow to crack, but we are
  treating this as if it were exposed out of an abundance of caution.</p>

  <h3 style="color:#111827">What we did</h3>
  <ul>
    <li>Removed the file from the repository and added safeguards so it can't happen again.</li>
    <li>Rotated all of our server-side API keys (Stripe, Resend, Gemini, Firebase).</li>
    <li>Invalidated the password-hashing key, which is why we need you to reset your password.</li>
    <li>Audited sign-in logs for unusual activity on your account.</li>
    <li>Added automated secret-scanning to our build pipeline.</li>
  </ul>

  <h3 style="color:#111827">What you should do</h3>
  <p>Please <strong>reset your VoraPrep password</strong> using the link below.
  If you reuse this password anywhere else (other websites, email, banking),
  change it there too &mdash; reusing passwords is the main risk from any leak like this.</p>

  <p style="text-align:center;margin:32px 0">
    <a href="${resetLink}" style="background:#2563eb;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block">Reset my password</a>
  </p>

  <p style="font-size:13px;color:#6b7280">Link not working? Copy and paste this URL into your browser:<br>
  <span style="word-break:break-all">${resetLink}</span></p>

  <h3 style="color:#111827">We're sorry</h3>
  <p>This shouldn't have happened. We've put guardrails in place so a file like this
  can never be committed again, and we're reviewing every other operational
  data export to make sure nothing similar is sitting around.</p>

  <p>If you have any questions, reply to this email and a real human will get back to you.</p>

  <p style="margin-top:32px">&mdash; The VoraPrep team<br>
  <a href="mailto:support@voraprep.com" style="color:#2563eb">support@voraprep.com</a></p>
</body></html>`;

  const text = `Hi ${name},

We're writing to let you know about a security issue we discovered and fixed.

WHAT HAPPENED
A file containing the email addresses, display names, and ${credLine} for a
group of VoraPrep accounts — including yours — was accidentally included in
our public GitHub repository. We discovered this on May 27, 2026 and removed
it the same day. Your actual password was NOT exposed.

WHAT WE DID
- Removed the file and added safeguards so it can't happen again
- Rotated all server-side API keys (Stripe, Resend, Gemini, Firebase)
- Invalidated the password-hashing key (so any leaked hashes are now useless)
- Audited sign-in logs for unusual activity on your account
- Added automated secret-scanning to our build pipeline

WHAT YOU SHOULD DO
Please reset your VoraPrep password using this link:

${resetLink}

If you reuse this password anywhere else, change it there too — reusing
passwords is the main risk from any leak like this.

We're sorry this happened. If you have questions, reply to this email.

— The VoraPrep team
support@voraprep.com
`;

  return { subject, html, text };
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  const affected = loadAffected();
  const report = loadReport();

  const mode = LIVE ? 'LIVE' : 'DRY-RUN';
  console.log(`──────────────────────────────────────────────────────────────`);
  console.log(`Breach reset dispatch — ${mode}`);
  console.log(`Affected users: ${affected.length}`);
  console.log(`Input file:     ${INPUT_FILE}`);
  console.log(`Project:        ${FIREBASE_PROJECT_ID}`);
  if (SEND_TO_OVERRIDE) console.log(`Send-to override: ${SEND_TO_OVERRIDE}`);
  if (LIMIT) console.log(`Limit:          ${LIMIT}`);
  if (RESUME) console.log(`Resuming from:  ${REPORT_FILE}`);
  console.log(`──────────────────────────────────────────────────────────────\n`);

  if (LIVE) {
    console.log('!!! LIVE MODE — emails will be sent to real users !!!');
    console.log('You have 5 seconds to abort with Ctrl-C.\n');
    await new Promise((r) => setTimeout(r, 5000));
  }

  let processed = 0;
  let sent = 0;
  let skipped = 0;
  let failed = 0;

  for (const user of affected) {
    if (LIMIT && processed >= LIMIT) break;
    processed++;

    const key = user.email;
    const existing = report.results[key];
    if (RESUME && existing && existing.status === 'sent') {
      skipped++;
      continue;
    }

    process.stdout.write(`[${processed}/${affected.length}] ${user.email} … `);

    try {
      // Generate password reset link via Admin SDK
      const resetLink = await auth.generatePasswordResetLink(user.email, {
        url: 'https://voraprep.com/login',
        handleCodeInApp: false,
      });

      const { subject, html, text } = renderEmail({
        displayName: user.displayName,
        resetLink,
        hadPasswordHash: user.hadPasswordHash,
      });

      const recipient = SEND_TO_OVERRIDE || user.email;

      if (DRY_RUN) {
        console.log(`DRY-RUN  (would send to ${recipient}; reset link generated)`);
        report.results[key] = {
          status: 'dry-run',
          recipient,
          generatedAt: new Date().toISOString(),
        };
      } else {
        const resp = await resend.emails.send({
          from: 'VoraPrep Security <security@voraprep.com>',
          to: recipient,
          subject,
          html,
          text,
          headers: {
            'X-Entity-Ref-ID': `breach-2026-05-27-${user.uid || 'noid'}`,
          },
        });
        if (resp.error) throw new Error(resp.error.message || JSON.stringify(resp.error));
        sent++;
        console.log(`sent  (resend id: ${resp.data?.id || 'n/a'})`);
        report.results[key] = {
          status: 'sent',
          recipient,
          resendId: resp.data?.id || null,
          sentAt: new Date().toISOString(),
        };
      }
    } catch (err) {
      failed++;
      const msg = err?.errorInfo?.code || err.message || String(err);
      console.log(`FAILED  (${msg})`);
      report.results[key] = {
        status: 'failed',
        error: msg,
        attemptedAt: new Date().toISOString(),
      };
    }

    // Save report frequently so a crash doesn't lose progress
    if (processed % 5 === 0) saveReport(report);
    // Light throttle to stay under Resend rate limits (10 req/s default)
    await new Promise((r) => setTimeout(r, 150));
  }

  report.runs.push({
    finishedAt: new Date().toISOString(),
    mode,
    processed,
    sent,
    skipped,
    failed,
  });
  saveReport(report);

  console.log(`\n──────────────────────────────────────────────────────────────`);
  console.log(`Done. processed=${processed}  sent=${sent}  skipped=${skipped}  failed=${failed}`);
  console.log(`Report: ${REPORT_FILE}`);
  console.log(`──────────────────────────────────────────────────────────────`);
}

main().catch((err) => {
  console.error('FATAL:', err);
  process.exit(1);
});

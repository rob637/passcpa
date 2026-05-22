#!/usr/bin/env node
/**
 * VoraPrep Beta Invite mailer.
 *
 * Audience: prod users with REAL practice activity in last 60 days
 *   (question_history.lastAnswered in window, OR practice_sessions in window,
 *    OR daily_log entry in window). Internal + competitor + explicit
 *    exclusions removed.
 *
 * Modes:
 *   --list           (default) Build audience and print it. No emails sent.
 *   --test           Send ONE email to TEST_RECIPIENT only (real Resend call).
 *   --send           Send to entire audience, BCC rob@voraprep.com.
 *
 * Required env:
 *   GOOGLE_APPLICATION_CREDENTIALS=/path/to/voraprep-prod-...json
 *   RESEND_API_KEY=re_...
 *
 * Example:
 *   firebase functions:secrets:access RESEND_API_KEY --project voraprep-prod \
 *     | xargs -I{} env RESEND_API_KEY={} \
 *       GOOGLE_APPLICATION_CREDENTIALS=.firebase/voraprep-prod-...json \
 *       node scripts/send-beta-invite.cjs --list
 */
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const MODE = process.argv.includes('--send')
  ? 'send'
  : process.argv.includes('--test')
    ? 'test'
    : 'list';

const FROM = 'Rob @ VoraPrep <rob@voraprep.com>';
const REPLY_TO = 'rob@voraprep.com';
const BCC = 'rob@voraprep.com';
const TEST_RECIPIENT = 'rob@voraprep.com';
const SUBJECT = 'Become a VoraPrep beta tester (free access for feedback)';

const EXCLUDE_EMAILS = new Set([
  'bakesler84@gmail.com',          // Kesler — competitor
  'alexandranoelkirk@gmail.com',   // Alexandra — user-requested skip
  'ryan@leaderreps.com',           // Ryan Yeoman — user-requested skip
  'toytoytoy09090909@gmail.com',   // junk signup
  'jsdjj@jddj.com',                // junk signup ("H K")
  'tiftftiftf@gmail.com',          // junk signup ("dfsdf gefef")
  'tifjftifjf@gmail.com',          // junk signup ("sdfd sdfsdf")
]);
const EXCLUDE_NAMES = [/karen\s+watts/i]; // Karen Watts — user-requested skip
const EXCLUDE_DOMAINS = ['@sagecg.com', '@voraprep.com'];

function looksLikeJunk(email = '', displayName = '') {
  const e = email.toLowerCase();
  const n = displayName.toLowerCase().trim();
  // Heavily repeated chars in local-part (e.g., tiftftiftf, toytoytoy)
  const local = e.split('@')[0];
  if (local.length >= 6 && /^(.{2,4})\1{2,}$/.test(local)) return true;
  // Random keyboard mash names
  if (/^[a-z]{3,8}\s[a-z]{3,8}$/.test(n) && /^[bcdfghjklmnpqrstvwxz]{3,}/.test(n.replace(/\s/g, ''))) return true;
  return false;
}

const NOW = Date.now();
const WINDOW_MS = 60 * 24 * 60 * 60 * 1000;
const CUTOFF_MS = NOW - WINDOW_MS;
const CUTOFF_ISO = new Date(CUTOFF_MS).toISOString().slice(0, 10);
const AUDIENCE_FILE = path.join(__dirname, '.beta-invite-audience.json');

admin.initializeApp();
const db = admin.firestore();

function toMs(v) {
  if (!v) return 0;
  if (typeof v === 'number') return v;
  if (v.toMillis) return v.toMillis();
  if (v._seconds) return v._seconds * 1000;
  if (typeof v === 'string') { const t = Date.parse(v); return isNaN(t) ? 0 : t; }
  return 0;
}
function isExcluded(email = '', isAdmin, displayName = '') {
  if (isAdmin) return true;
  const e = (email || '').toLowerCase();
  if (!e) return true;
  if (EXCLUDE_EMAILS.has(e)) return true;
  if (EXCLUDE_DOMAINS.some(d => e.endsWith(d))) return true;
  if (EXCLUDE_NAMES.some(rx => rx.test(displayName || ''))) return true;
  return false;
}
function titleCase(s) {
  return s.toLowerCase().replace(/\b([a-z])/g, m => m.toUpperCase());
}
function firstName(displayName, email) {
  const n = (displayName || '').trim();
  if (n) {
    const first = n.split(/\s+/)[0];
    // Need at least 2 chars and pure letters to use display name
    if (first && first.length >= 2 && /^[A-Za-z]+$/.test(first)) {
      return titleCase(first);
    }
  }
  // Fallback: strip digits/special chars from email local-part
  const local = (email || '').split('@')[0].split(/[._-]/)[0].replace(/[0-9]+/g, '');
  if (local && local.length >= 2 && /^[A-Za-z]+$/.test(local)) return titleCase(local);
  return 'there';
}

async function hasRecentActivity(uid) {
  const userRef = db.collection('users').doc(uid);

  // 1. question_history with lastAnswered in window (cheapest count)
  try {
    const qh = await userRef
      .collection('question_history')
      .where('lastAnswered', '>=', new Date(CUTOFF_MS))
      .limit(1)
      .get();
    if (!qh.empty) return { signal: 'question_history', recent: 1 };
  } catch {}

  // 2. practice_sessions in window
  try {
    const ps = await userRef.collection('practice_sessions').limit(50).get();
    for (const d of ps.docs) {
      const data = d.data();
      const t = toMs(data.completedAt || data.startedAt || data.createdAt);
      if (t >= CUTOFF_MS) return { signal: 'practice_sessions', recent: 1 };
    }
  } catch {}

  // 3. daily_log with date >= cutoff (doc IDs include YYYY-MM-DD)
  try {
    const logs = await userRef.collection('daily_log').get();
    for (const d of logs.docs) {
      const m = d.id.match(/(\d{4}-\d{2}-\d{2})/);
      if (m && m[1] >= CUTOFF_ISO) return { signal: 'daily_log', recent: 1 };
    }
  } catch {}

  return null;
}

function buildEmail(firstNameStr) {
  const text = `Hi ${firstNameStr},

I'm Rob, the founder of VoraPrep. I'm putting together a small group of beta testers and I'd like to invite you.

Here's what it involves:

- Free access to both products through your exam: voraprep.com/cpa (full adaptive course) and voraprep.com/daily-cpa (25 questions a day).
- ~15 minutes each week for a quick written check-in on what's working, what's broken, and what's missing.

- A direct line to me for anything you hit, good or bad.

No long-term commitment. If life gets busy you can step out anytime.

If you're in, just reply "I'm in" and I'll set up your account today.

Thanks for being part of this,
Rob
Founder, VoraPrep`;

  // Plain-text-styled HTML (preserves the "personal email" feel)
  const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.55;color:#1a1a1a;max-width:560px;">
<p>Hi ${firstNameStr},</p>
<p>I'm Rob, the founder of VoraPrep. I'm putting together a small group of beta testers and I'd like to invite you.</p>
<p>Here's what it involves:</p>
<ul>
  <li>Free access to both products <strong>through your exam</strong>: <a href="https://voraprep.com/cpa">voraprep.com/cpa</a> (full adaptive course) and <a href="https://voraprep.com/daily-cpa">voraprep.com/daily-cpa</a> (25 questions a day).</li>
  <li>~15 minutes each week for a quick written check-in on what's working, what's broken, and what's missing.</li>

  <li>A direct line to me for anything you hit, good or bad.</li>
</ul>
<p>No long-term commitment. If life gets busy you can step out anytime.</p>
<p>If you're in, just reply <strong>&ldquo;I'm in&rdquo;</strong> and I'll set up your account today.</p>
<p>Thanks for being part of this,<br>
Rob<br>
Founder, VoraPrep</p>
</div>`;
  return { text, html };
}

async function buildAudience() {
  console.log(`Cutoff: ${CUTOFF_ISO} (last 60 days)`);
  const snap = await db.collection('users').get();
  console.log(`Loaded ${snap.size} user docs.`);

  // First pass: filter by static signals
  const prelim = [];
  let junkSkipped = 0;
  for (const doc of snap.docs) {
    const u = doc.data();
    if (isExcluded(u.email, u.isAdmin, u.displayName)) continue;
    if (looksLikeJunk(u.email, u.displayName)) { junkSkipped++; continue; }
    const lastLogin = toMs(u.lastLogin || u.lastLoginAt);
    const created = toMs(u.createdAt);
    // Require at least *some* recency to bother checking subcollections
    if (lastLogin < CUTOFF_MS && created < CUTOFF_MS) continue;
    prelim.push({
      uid: doc.id,
      email: u.email,
      displayName: u.displayName || '',
      activeCourse: u.activeCourse || 'cpa',
      lastLogin,
      createdAt: created,
    });
  }
  console.log(`Prelim (recency-filtered): ${prelim.length} · junk pattern skipped: ${junkSkipped}`);

  // Second pass: check for real practice activity (concurrency-limited)
  let audience = [];
  const CONC = 8;
  for (let i = 0; i < prelim.length; i += CONC) {
    const batch = prelim.slice(i, i + CONC);
    const results = await Promise.all(
      batch.map(async c => {
        const sig = await hasRecentActivity(c.uid);
        return sig ? { ...c, signal: sig.signal } : null;
      })
    );
    results.forEach(r => { if (r) audience.push(r); });
    process.stdout.write(`  ${Math.min(i + CONC, prelim.length)}/${prelim.length}\r`);
  }
  console.log('');

  audience.sort((a, b) => b.lastLogin - a.lastLogin);
  // CPA-only filter (user request)
  const before = audience.length;
  audience = audience.filter(u => (u.activeCourse || '').toLowerCase() === 'cpa');
  console.log(`\nCPA-only filter: ${before} \u2192 ${audience.length}`);
  console.log(`\nAudience (real practice activity in window): ${audience.length}`);
  return audience;
}

async function sendOne(resend, to, name) {
  const { text, html } = buildEmail(firstName(name, to));
  const payload = {
    from: FROM,
    to: [to],
    subject: SUBJECT,
    text,
    html,
    reply_to: REPLY_TO,
    headers: {
      'List-Unsubscribe': '<mailto:rob@voraprep.com?subject=unsubscribe>',
    },
  };
  if (MODE === 'send' && to.toLowerCase() !== BCC.toLowerCase()) {
    payload.bcc = [BCC];
  }
  const result = await resend.emails.send(payload);
  return result;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

(async () => {
  // Build / load audience
  let audience;
  if (fs.existsSync(AUDIENCE_FILE) && !process.argv.includes('--rebuild')) {
    audience = JSON.parse(fs.readFileSync(AUDIENCE_FILE, 'utf8'));
    console.log(`Loaded cached audience: ${audience.length} (use --rebuild to refresh)`);
  } else {
    audience = await buildAudience();
    fs.writeFileSync(AUDIENCE_FILE, JSON.stringify(audience, null, 2));
    console.log(`Saved audience to ${AUDIENCE_FILE}`);
  }

  if (MODE === 'list') {
    console.log('\n=== AUDIENCE PREVIEW (would send to) ===');
    console.table(audience.map(a => ({
      name: a.displayName || '(no name)',
      firstName: firstName(a.displayName, a.email),
      email: a.email,
      course: a.activeCourse,
      lastLogin: a.lastLogin ? new Date(a.lastLogin).toISOString().slice(0, 10) : '-',
      signal: a.signal,
    })));
    console.log(`\nTotal: ${audience.length} recipients`);
    console.log('\n--- SAMPLE EMAIL (first recipient) ---');
    const sample = audience[0];
    const { text } = buildEmail(firstName(sample.displayName, sample.email));
    console.log(`Subject: ${SUBJECT}`);
    console.log(`From:    ${FROM}`);
    console.log(`To:      ${sample.email}`);
    console.log(`BCC:     ${BCC} (in --send mode)`);
    console.log(`---\n${text}\n---`);
    console.log('\nNext steps:');
    console.log('  Test send to rob:  node scripts/send-beta-invite.cjs --test');
    console.log('  Send to all:       node scripts/send-beta-invite.cjs --send');
    process.exit(0);
  }

  // Sending
  const apiKey = (process.env.RESEND_API_KEY || '').trim();
  if (!apiKey) {
    console.error('ERROR: RESEND_API_KEY env var not set.');
    process.exit(1);
  }
  const { Resend } = require('resend');
  const resend = new Resend(apiKey);

  if (MODE === 'test') {
    console.log(`Sending TEST email to ${TEST_RECIPIENT}...`);
    const r = await sendOne(resend, TEST_RECIPIENT, 'Rob');
    console.log('Result:', JSON.stringify(r, null, 2));
    process.exit(0);
  }

  // --send: fire to all with throttling and per-send logging
  console.log(`\nABOUT TO SEND ${audience.length} EMAILS from ${FROM} (BCC ${BCC})`);
  console.log('Subject:', SUBJECT);
  console.log('Sleeping 5s \u2014 ctrl-C now to abort...');
  await sleep(5000);

  const sent = [];
  const failed = [];
  for (let i = 0; i < audience.length; i++) {
    const a = audience[i];
    try {
      const r = await sendOne(resend, a.email, a.displayName);
      const id = r?.data?.id || r?.id || '';
      sent.push({ email: a.email, id });
      console.log(`[${i + 1}/${audience.length}] OK   ${a.email}  ${id}`);
    } catch (e) {
      failed.push({ email: a.email, error: e.message });
      console.log(`[${i + 1}/${audience.length}] FAIL ${a.email}  ${e.message}`);
    }
    await sleep(250); // ~4/sec, well under Resend rate limits
  }

  const logPath = path.join(__dirname, `.beta-invite-log-${Date.now()}.json`);
  fs.writeFileSync(logPath, JSON.stringify({ sent, failed, when: new Date().toISOString() }, null, 2));
  console.log(`\nDone. Sent ${sent.length}, failed ${failed.length}. Log: ${logPath}`);
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });

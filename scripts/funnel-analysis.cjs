#!/usr/bin/env node
/**
 * Funnel analysis for CPA signups in the last N days.
 *
 * READ-ONLY against voraprep-prod. Outputs per-stage counts + conversion %.
 *
 * Usage:
 *   GOOGLE_APPLICATION_CREDENTIALS=.firebase/voraprep-prod-...json \
 *     node scripts/funnel-analysis.cjs [days]
 *
 * Default lookback: 60 days.
 *
 * Stages:
 *   signup        users doc created in window
 *   onboarded     onboardingCompleted.cpa === true
 *   first_session at least one practice_sessions doc
 *   day2          activity (practice or daily_log) within 48h of signup
 *   week1_active  >=3 distinct active days in first 7 days
 *   week2_back    any activity in days 8-14
 *   day30_active  any activity in days 21-30
 *   paid          subscription.status === 'active' or 'trialing'
 */
const admin = require('firebase-admin');

const DAYS = parseInt(process.argv[2], 10) || 60;
const NOW = Date.now();
const CUTOFF = NOW - DAYS * 24 * 60 * 60 * 1000;

const INTERNAL_DOMAINS = ['@sagecg.com', '@voraprep.com'];
const SKIP_EMAILS = new Set([
  'toytoytoy09090909@gmail.com',
  'jsdjj@jddj.com',
  'tiftftiftf@gmail.com',
  'tifjftifjf@gmail.com',
]);

function toMs(v) {
  if (!v) return 0;
  if (typeof v === 'number') return v;
  if (typeof v.toMillis === 'function') return v.toMillis();
  if (v._seconds) return v._seconds * 1000;
  const t = Date.parse(v);
  return Number.isNaN(t) ? 0 : t;
}

function isInternal(email = '', isAdmin) {
  if (isAdmin) return true;
  const e = (email || '').toLowerCase();
  if (!e) return true;
  if (SKIP_EMAILS.has(e)) return true;
  return INTERNAL_DOMAINS.some(d => e.endsWith(d));
}

function looksJunk(email = '', name = '') {
  const local = (email || '').toLowerCase().split('@')[0];
  if (local.length >= 6 && /^(.{2,4})\1{2,}$/.test(local)) return true;
  const n = (name || '').toLowerCase().trim();
  if (/^[a-z]{3,8}\s[a-z]{3,8}$/.test(n) && /^[bcdfghjklmnpqrstvwxz]{3,}/.test(n.replace(/\s/g, ''))) return true;
  return false;
}

function pct(n, d) {
  if (!d) return '0.0%';
  return ((n / d) * 100).toFixed(1) + '%';
}

async function main() {
  admin.initializeApp({ credential: admin.credential.applicationDefault() });
  const db = admin.firestore();

  console.log(`\nCPA funnel analysis · last ${DAYS} days · cutoff = ${new Date(CUTOFF).toISOString().slice(0, 10)}\n`);

  // 1. Load all users (small collection, <500)
  const usersSnap = await db.collection('users').get();
  console.log(`Loaded ${usersSnap.size} total user docs.`);

  // 2. Filter to CPA signups in window, non-internal, non-junk
  const cohort = [];
  for (const doc of usersSnap.docs) {
    const u = doc.data();
    if (isInternal(u.email, u.isAdmin)) continue;
    if (looksJunk(u.email, u.displayName)) continue;
    if ((u.activeCourse || '').toLowerCase() !== 'cpa') continue;
    const created = toMs(u.createdAt);
    if (!created || created < CUTOFF) continue;
    cohort.push({
      uid: doc.id,
      email: u.email,
      createdAt: created,
      onboarded: !!(u.onboardingCompleted && u.onboardingCompleted.cpa),
      subStatus: u.subscription && u.subscription.status,
    });
  }

  console.log(`CPA signups in window: ${cohort.length}\n`);
  if (!cohort.length) { process.exit(0); }

  // 3. For each user, pull activity timestamps (practice_sessions + daily_log)
  const CONC = 8;
  for (let i = 0; i < cohort.length; i += CONC) {
    const batch = cohort.slice(i, i + CONC);
    await Promise.all(batch.map(async u => {
      const userRef = db.collection('users').doc(u.uid);
      const [psSnap, dlSnap] = await Promise.all([
        userRef.collection('practice_sessions').get(),
        userRef.collection('daily_log').get(),
      ]);
      const activityMs = [];
      psSnap.docs.forEach(d => {
        const data = d.data();
        const t = toMs(data.completedAt) || toMs(data.startedAt) || toMs(data.createdAt);
        if (t) activityMs.push(t);
      });
      // daily_log doc IDs are like `cpa_YYYY-MM-DD`
      dlSnap.docs.forEach(d => {
        const m = d.id.match(/(\d{4}-\d{2}-\d{2})/);
        if (m) {
          const t = Date.parse(m[1]);
          if (!Number.isNaN(t)) activityMs.push(t);
        }
      });
      u.activityMs = activityMs.sort((a, b) => a - b);
      u.sessionCount = psSnap.size;
    }));
    process.stdout.write(`  activity ${Math.min(i + CONC, cohort.length)}/${cohort.length}\r`);
  }
  console.log('');

  // 4. Compute stage flags
  let s_signup = cohort.length;
  let s_onboarded = 0, s_first = 0, s_day2 = 0, s_week1 = 0, s_week2 = 0, s_day30 = 0, s_paid = 0;
  // Only count later-window stages for users who had time to reach them
  let elig_day2 = 0, elig_week1 = 0, elig_week2 = 0, elig_day30 = 0;

  const DAY = 24 * 60 * 60 * 1000;
  const dropoffs = { onboarding: [], firstSession: [], day2: [], week1: [], week2: [], day30: [] };

  cohort.forEach(u => {
    if (u.onboarded) s_onboarded++;
    else dropoffs.onboarding.push(u);

    if (u.sessionCount > 0) s_first++;
    else dropoffs.firstSession.push(u);

    const age = NOW - u.createdAt;
    const acts = u.activityMs;

    if (age >= 2 * DAY) {
      elig_day2++;
      if (acts.some(t => t > u.createdAt && t < u.createdAt + 2 * DAY)) s_day2++;
      else dropoffs.day2.push(u);
    }
    if (age >= 7 * DAY) {
      elig_week1++;
      const days = new Set();
      acts.forEach(t => {
        if (t >= u.createdAt && t < u.createdAt + 7 * DAY) {
          days.add(Math.floor((t - u.createdAt) / DAY));
        }
      });
      if (days.size >= 3) s_week1++;
      else dropoffs.week1.push(u);
    }
    if (age >= 14 * DAY) {
      elig_week2++;
      if (acts.some(t => t >= u.createdAt + 7 * DAY && t < u.createdAt + 14 * DAY)) s_week2++;
      else dropoffs.week2.push(u);
    }
    if (age >= 30 * DAY) {
      elig_day30++;
      if (acts.some(t => t >= u.createdAt + 21 * DAY && t < u.createdAt + 30 * DAY)) s_day30++;
      else dropoffs.day30.push(u);
    }
    if (u.subStatus === 'active' || u.subStatus === 'trialing') s_paid++;
  });

  // 5. Print funnel
  console.log('\n=== FUNNEL (CPA signups, last ' + DAYS + ' days) ===');
  console.log(`Signup                                        : ${s_signup}`);
  console.log(`Onboarded  (onboardingCompleted.cpa = true)   : ${s_onboarded.toString().padStart(3)} (${pct(s_onboarded, s_signup)} of signups)`);
  console.log(`First session  (>=1 practice_sessions doc)    : ${s_first.toString().padStart(3)} (${pct(s_first, s_signup)} of signups · ${pct(s_first, s_onboarded)} of onboarded)`);
  console.log('');
  console.log(`-- retention (only users old enough to qualify) --`);
  console.log(`Day 2 return    (any activity in first 48h)   : ${s_day2.toString().padStart(3)} / ${elig_day2.toString().padStart(3)} eligible (${pct(s_day2, elig_day2)})`);
  console.log(`Week 1 active   (>=3 active days in first 7)  : ${s_week1.toString().padStart(3)} / ${elig_week1.toString().padStart(3)} eligible (${pct(s_week1, elig_week1)})`);
  console.log(`Week 2 back     (activity in days 8-14)       : ${s_week2.toString().padStart(3)} / ${elig_week2.toString().padStart(3)} eligible (${pct(s_week2, elig_week2)})`);
  console.log(`Day 30 active   (activity in days 21-30)      : ${s_day30.toString().padStart(3)} / ${elig_day30.toString().padStart(3)} eligible (${pct(s_day30, elig_day30)})`);
  console.log('');
  console.log(`Paid           (subscription active/trialing) : ${s_paid.toString().padStart(3)} (${pct(s_paid, s_signup)} of signups)`);

  // 6. Print biggest cliff
  console.log('\n=== STEP-BY-STEP DROP-OFFS ===');
  const steps = [
    ['signup        -> onboarded   ', s_signup, s_onboarded],
    ['onboarded     -> first_session', s_onboarded, s_first],
    ['first_session -> day2_return ', s_first, s_day2],
    ['day2          -> week1_active', s_day2, s_week1],
    ['week1         -> week2_back  ', s_week1, s_week2],
    ['week2         -> day30_active', s_week2, s_day30],
    ['signup        -> paid        ', s_signup, s_paid],
  ];
  steps.forEach(([label, from, to]) => {
    const drop = from - to;
    console.log(`  ${label} : ${from} -> ${to}  (lost ${drop}, kept ${pct(to, from)})`);
  });

  // 7. Sample dropoff names per stage (helpful for outreach)
  console.log('\n=== SAMPLE DROP-OFFS (first 5 per stage, for spot-checking / re-engagement) ===');
  Object.entries(dropoffs).forEach(([stage, users]) => {
    if (!users.length) return;
    console.log(`\n  ${stage} (${users.length} total):`);
    users.slice(0, 5).forEach(u => {
      const ageDays = Math.floor((NOW - u.createdAt) / DAY);
      console.log(`    - ${u.email}  (signed up ${ageDays}d ago, ${u.sessionCount} sessions)`);
    });
  });

  console.log('');
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });

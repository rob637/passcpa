#!/usr/bin/env node
/**
 * Rank top "showing interest" users in voraprep-prod over the last 60 days.
 *
 * Activity signals:
 *  - users/{uid}/question_history/{qid}    (lastAnswered timestamp)
 *  - users/{uid}/daily_log/{course}_YYYY-MM-DD
 *  - users/{uid}/practice_sessions/{id}    (questionCount, accuracy, timeSpentSeconds, completedAt|startedAt)
 *  - users/{uid}/sessions/{id}             (page-view sessions, startedAt)
 *
 * Excludes @sagecg.com, @voraprep.com, isAdmin.
 * Run: GOOGLE_APPLICATION_CREDENTIALS=... node scripts/find-top-users.cjs
 */
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

const NOW = Date.now();
const WINDOW_DAYS = 60;
const CUTOFF_MS = NOW - WINDOW_DAYS * 24 * 60 * 60 * 1000;
const CUTOFF_ISO = new Date(CUTOFF_MS).toISOString().slice(0, 10);
const INTERNAL_DOMAINS = ['@sagecg.com', '@voraprep.com'];

function toMs(v) {
  if (!v) return 0;
  if (typeof v === 'number') return v;
  if (v.toMillis) return v.toMillis();
  if (v._seconds) return v._seconds * 1000;
  if (typeof v === 'string') {
    const t = Date.parse(v);
    return isNaN(t) ? 0 : t;
  }
  return 0;
}
const fmtDate = ms => (ms ? new Date(ms).toISOString().slice(0, 10) : '-');
function isInternal(email = '', isAdmin) {
  if (isAdmin) return true;
  const e = (email || '').toLowerCase();
  return INTERNAL_DOMAINS.some(d => e.endsWith(d));
}

async function gatherActivity(uid) {
  const userRef = db.collection('users').doc(uid);
  const out = { qhTotal: 0, qhRecent: 0, practiceCount: 0, practiceQs: 0, practiceMin: 0, pageSessions: 0, activeDays: 0 };

  // question_history
  try {
    const allQh = await userRef.collection('question_history').count().get();
    out.qhTotal = allQh.data().count;
    const recentQh = await userRef
      .collection('question_history')
      .where('lastAnswered', '>=', new Date(CUTOFF_MS))
      .count()
      .get();
    out.qhRecent = recentQh.data().count;
  } catch {}

  // practice_sessions (read all per user \u2014 small)
  try {
    const ps = await userRef.collection('practice_sessions').get();
    ps.forEach(d => {
      const data = d.data();
      const t = toMs(data.completedAt || data.startedAt || data.createdAt);
      if (t >= CUTOFF_MS) {
        out.practiceCount += 1;
        out.practiceQs += data.questionCount || 0;
        out.practiceMin += Math.round((data.timeSpentSeconds || 0) / 60);
      }
    });
  } catch {}

  // page-view sessions
  try {
    const ss = await userRef
      .collection('sessions')
      .where('startedAt', '>=', new Date(CUTOFF_MS))
      .count()
      .get();
    out.pageSessions = ss.data().count;
  } catch {}

  // daily_log
  try {
    const logs = await userRef.collection('daily_log').get();
    const set = new Set();
    logs.forEach(d => {
      const m = d.id.match(/(\d{4}-\d{2}-\d{2})/);
      if (m && m[1] >= CUTOFF_ISO) set.add(m[1]);
    });
    out.activeDays = set.size;
  } catch {}

  return out;
}

(async () => {
  console.log(`Cutoff: ${CUTOFF_ISO} (last ${WINDOW_DAYS} days)\n`);
  const snap = await db.collection('users').get();
  console.log(`Loaded ${snap.size} user docs.\n`);

  const candidates = [];
  for (const doc of snap.docs) {
    const u = doc.data();
    if (isInternal(u.email, u.isAdmin)) continue;
    if (!u.email) continue;

    const created = toMs(u.createdAt);
    const lastLogin = toMs(u.lastLogin || u.lastLoginAt);
    const recentLogin = lastLogin >= CUTOFF_MS;
    const recentSignup = created >= CUTOFF_MS;

    let baseScore = 0;
    if (recentLogin) baseScore += 5;
    if (recentSignup) baseScore += 3;
    if (u.onboardingComplete) baseScore += 2;
    if (u.studyPlanId) baseScore += 2;
    if (u.examDate || (u.examDates && Object.keys(u.examDates).length)) baseScore += 2;
    if (u.subscription && (u.subscription.status === 'active' || u.subscription.status === 'trialing')) baseScore += 8;
    if (u.dailyReminderEnabled) baseScore += 1;

    if (baseScore === 0 && !recentLogin && !recentSignup) continue;

    candidates.push({
      uid: doc.id,
      email: u.email,
      displayName: u.displayName || '',
      activeCourse: u.activeCourse || u.examSection || 'cpa',
      createdAt: created,
      lastLogin,
      onboardingComplete: !!u.onboardingComplete,
      hasPlan: !!u.studyPlanId,
      examDate: u.examDate || null,
      subscription: u.subscription?.status || null,
      baseScore,
    });
  }
  console.log(`Filtered candidates: ${candidates.length}\n`);

  candidates.sort((a, b) => b.baseScore - a.baseScore);
  const shortlist = candidates.slice(0, 60);
  console.log(`Gathering activity for top ${shortlist.length}...`);

  const CONC = 8;
  for (let i = 0; i < shortlist.length; i += CONC) {
    const batch = shortlist.slice(i, i + CONC);
    await Promise.all(
      batch.map(async c => {
        const act = await gatherActivity(c.uid);
        Object.assign(c, act);
        c.finalScore =
          c.baseScore +
          Math.min(c.qhRecent, 200) / 5 +
          Math.min(c.practiceCount, 30) * 2 +
          Math.min(c.practiceQs, 500) / 25 +
          Math.min(c.practiceMin, 600) / 30 +
          Math.min(c.activeDays, 30) * 1.5;
      })
    );
    process.stdout.write(`  ${Math.min(i + CONC, shortlist.length)}/${shortlist.length}\r`);
  }
  console.log('\n');

  shortlist.sort((a, b) => b.finalScore - a.finalScore);
  const top10 = shortlist.slice(0, 10);

  console.log('=== TOP 10 ENGAGED USERS (last 60 days) ===\n');
  console.table(
    top10.map((u, i) => ({
      rank: i + 1,
      name: u.displayName || '(no name)',
      email: u.email,
      course: u.activeCourse,
      signup: fmtDate(u.createdAt),
      lastLogin: fmtDate(u.lastLogin),
      sub: u.subscription || '-',
      qhRecent: u.qhRecent,
      sessions: u.practiceCount,
      questions: u.practiceQs,
      mins: u.practiceMin,
      days: u.activeDays,
      score: Math.round(u.finalScore * 10) / 10,
    }))
  );

  console.log('\n=== EMAIL LIST ===');
  top10.forEach((u, i) => console.log(`${i + 1}. ${u.displayName || '(no name)'} <${u.email}>`));

  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });

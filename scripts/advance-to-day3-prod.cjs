/**
 * One-off: advance a Daily CPA user to Day 3 of their trial in PROD,
 * clear today's session/attempts so they get a fresh Day 3 experience,
 * and trigger Q1 immediately.
 *
 * Usage: node scripts/advance-to-day3-prod.cjs +17036238835
 */
const admin = require('firebase-admin');
const path = require('path');

const phone = process.argv[2];
if (!phone) {
  console.error('Usage: node scripts/advance-to-day3-prod.cjs +1XXXXXXXXXX');
  process.exit(1);
}

const sa = require(path.join(__dirname, '..', 'serviceAccountKey.prod.json'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

(async () => {
  const usersSnap = await db.collection('daily_users').where('phone', '==', phone).limit(1).get();
  if (usersSnap.empty) {
    console.error(`No user found in PROD with phone ${phone}`);
    process.exit(1);
  }
  const userDoc = usersSnap.docs[0];
  const uid = userDoc.id;
  const user = userDoc.data();
  console.log(`Found uid=${uid}  status=${user.status}  section=${user.section}  tz=${user.timezone}`);

  // Shift trialStart back 2 calendar days (so today = Day 3).
  // Use a noon-UTC anchor 2 days ago — getTrialDay normalizes to user's local date.
  const now = new Date();
  const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
  const trialEnd = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000); // 1 day from now

  await userDoc.ref.update({
    trialStart: admin.firestore.Timestamp.fromDate(twoDaysAgo),
    trialEnd: admin.firestore.Timestamp.fromDate(trialEnd),
    status: 'trialing',
  });
  console.log(`✓ trialStart -> ${twoDaysAgo.toISOString()}`);
  console.log(`✓ trialEnd   -> ${trialEnd.toISOString()}`);

  // Clear today's session so a fresh Day 3 session can be created.
  function getTodayString(tz) {
    return new Intl.DateTimeFormat('en-CA', { timeZone: tz || 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  }
  const today = getTodayString(user.timezone);
  const sessionId = `${uid}_${today}`;
  const sessionRef = db.collection('daily_sessions').doc(sessionId);
  const sessionSnap = await sessionRef.get();
  if (sessionSnap.exists) {
    await sessionRef.delete();
    console.log(`✓ deleted today's session ${sessionId}`);
  } else {
    console.log(`(no session for ${sessionId})`);
  }

  // Clear today's attempts so the question pool is fresh.
  // Avoid a composite index requirement by filtering in memory.
  const todayStart = new Date();
  todayStart.setUTCHours(0, 0, 0, 0);
  const attemptsSnap = await db.collection('daily_attempts')
    .where('uid', '==', uid)
    .get();
  let cleared = 0;
  for (const doc of attemptsSnap.docs) {
    const d = doc.data();
    const at = d.attemptedAt?.toDate?.();
    if (at && at >= todayStart) {
      await doc.ref.delete();
      cleared++;
    }
  }
  console.log(`✓ cleared ${cleared} attempts from today`);

  // Pre-create an idle Day 3 session so the user can simply text NEXT to start.
  // (Replicates getOrCreateSession's shape — keeps the script self-contained.)
  const TIER_TRIAL_CAP = 5;
  const newSession = {
    uid,
    date: today,
    section: user.section,
    state: 'idle',
    dailyCap: TIER_TRIAL_CAP,
    questionsAnswered: 0,
    questionsCorrect: 0,
    currentQuestionId: null,
    currentQuestionNum: 0,
    currentQuestionSentAt: null,
    questionPool: [],          // morningKickoff/sendNextQuestion path will repopulate;
                               // but since we want NEXT to work, leave empty triggers
                               // sendNextQuestion's "complete" path. Better: skip pre-create.
    answeredQuestions: [],
    startedAt: null,
    completedAt: null,
    pausedAt: null,
    resumedAt: null,
    nudgeSent: false,
  };
  // NOTE: not creating session — let the morningKickoff scheduler create one with a
  // proper questionPool. To start NOW, simplest path is for the user to text NEXT —
  // but that requires an existing session. So instead, instruct: wait for the
  // 15-min scheduler tick at user's sendTime, OR run the kickoff manually below.
  void newSession;

  // Print sendTime so user knows when to expect kickoff.
  console.log(`\nUser sendTime: ${user.sendTime || '(not set)'}  TZ: ${user.timezone || 'America/New_York'}`);
  console.log('Day 3 Q1 will arrive at the next morningKickoff scheduler tick that matches');
  console.log('the user\'s sendTime in their timezone (scheduler runs every 15 min).');
  console.log('\nTo trigger immediately, set sendTime to the current local hour:');

  // Convenience: optionally bump sendTime to "now" so the next 15-min scheduler tick fires.
  if (process.argv.includes('--now')) {
    // Set sendTime to current local HH:MM so next scheduler tick (≤15 min away)
    // hits the kickoff window: currentMin >= sendMin AND currentMin < sendMin + 15.
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: user.timezone || 'America/New_York',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const sendTime = fmt.format(new Date());
    await userDoc.ref.update({ sendTime });
    console.log(`✓ sendTime -> ${sendTime} (next 15-min scheduler tick will fire Q1)`);
  } else {
    console.log('  (re-run with --now to set sendTime to current minute)');
  }

  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });

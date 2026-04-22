/**
 * VoraPrep Daily CPA — SMS-based daily MCQ practice
 * 
 * Cloud Functions for the Daily CPA add-on product.
 * Handles: question delivery, answer processing, streaks, billing, trial management.
 * 
 * All Firestore collections prefixed with `daily_` to avoid collision with main app.
 * All exported functions prefixed with `dailyCpa_`.
 */

const { onSchedule } = require('firebase-functions/v2/scheduler');
const { onRequest, onCall, HttpsError } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');

// Lazy-init: Firebase Admin is already initialized in index.js
const db = admin.firestore();

// ============================================================================
// CONSTANTS
// ============================================================================

const SECTIONS = ['AUD', 'FAR', 'REG', 'BAR', 'ISC', 'TCP'];

const TIER_CONFIG = {
  trial:   { dailyCap: 5,  name: 'Trial' },
  starter: { dailyCap: 10, name: 'Starter' },
  core:    { dailyCap: 25, name: 'Core' },
  pro:     { dailyCap: 50, name: 'Pro' },
};

const TRIAL_DAYS = 3;

// Quiet hours: no sends between these hours in user local time
const QUIET_HOUR_START = 21; // 9 PM
const QUIET_HOUR_END = 7;   // 7 AM

// Nudge timing
const NUDGE_AFTER_MINUTES = 90;
const PAUSE_AFTER_MINUTES = 120;

// Spaced repetition intervals (days)
const SPACED_REP_INTERVALS = [1, 3, 7];

// Price lookup keys for Stripe
const DAILY_CPA_PRICE_KEYS = {
  starter: 'daily_cpa_starter_monthly',
  core:    'daily_cpa_core_monthly',
  pro:     'daily_cpa_pro_monthly',
};

// ============================================================================
// TELNYX UTILITY
// ============================================================================

let _telnyxClient = null;

function getTelnyxClient() {
  if (_telnyxClient) return _telnyxClient;
  const apiKey = process.env.TELNYX_API_KEY?.trim();
  if (!apiKey) {
    console.error('Telnyx credentials not configured');
    return null;
  }
  const telnyx = require('telnyx')(apiKey);
  _telnyxClient = telnyx;
  return _telnyxClient;
}

/**
 * Send an SMS message via Telnyx.
 * @param {string} to - E.164 phone number
 * @param {string} body - Message body
 * @returns {Promise<object>} Telnyx message data
 */
async function sendSMS(to, body) {
  const client = getTelnyxClient();
  if (!client) {
    throw new Error('Telnyx client not available');
  }

  const from = process.env.TELNYX_PHONE_NUMBER?.trim();
  if (!from) {
    throw new Error('TELNYX_PHONE_NUMBER not configured');
  }

  const response = await client.messages.create({
    from,
    to,
    text: body,
  });

  const messageData = response.data;

  // Log outbound message
  await db.collection('daily_sms_log').add({
    uid: null, // Will be set by caller if known
    direction: 'outbound',
    to,
    telnyxMessageId: messageData?.id || '',
    body: body.substring(0, 500), // Truncate for storage
    status: messageData?.to?.[0]?.status || 'queued',
    sentAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return messageData;
}

/**
 * Send SMS and associate with a user.
 */
async function sendUserSMS(uid, phone, body) {
  const message = await sendSMS(phone, body);

  // Update the log entry with uid
  const logQuery = await db.collection('daily_sms_log')
    .where('telnyxMessageId', '==', message.id)
    .limit(1)
    .get();

  if (!logQuery.empty) {
    await logQuery.docs[0].ref.update({ uid });
  }

  return message;
}

// ============================================================================
// QUESTION LOADING
// ============================================================================

// In-memory cache for questions (per function instance)
const _questionCache = {};

/**
 * Load questions for a CPA section from Firestore or JSON file.
 * Questions are cached in memory for the lifetime of the function instance.
 * @param {string} section - CPA section: 'FAR', 'AUD', etc.
 * @returns {Promise<Array>} Array of question objects
 */
async function loadQuestions(section) {
  const sectionUpper = section.toUpperCase();
  if (_questionCache[sectionUpper]) {
    return _questionCache[sectionUpper];
  }

  // Try Firestore cache first
  const cacheDoc = await db.collection('daily_questions').doc(sectionUpper).get();
  if (cacheDoc.exists) {
    const data = cacheDoc.data();
    _questionCache[sectionUpper] = data.questions;
    return data.questions;
  }

  // Fallback: load from JSON file (content/cpa/{section}/questions.json)
  const fs = require('fs');
  const path = require('path');
  const filePath = path.join(__dirname, '..', 'content', 'cpa', sectionUpper.toLowerCase(), 'questions.json');

  if (!fs.existsSync(filePath)) {
    throw new Error(`Question file not found: ${filePath}`);
  }

  const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const questions = (raw.questions || []).map(q => ({
    id: q.id,
    blueprintArea: q.blueprintArea || '',
    topic: q.topic || '',
    subtopic: q.subtopic || '',
    difficulty: q.difficulty || 'medium',
    question: q.question,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation || '',
    examTip: q.examTip || '',
    memoryAid: q.memoryAid || '',
    whyWrong: q.whyWrong || {},
    bottomLine: q.bottomLine || '',
  }));

  _questionCache[sectionUpper] = questions;

  // Cache to Firestore for faster subsequent loads
  await db.collection('daily_questions').doc(sectionUpper).set({
    section: sectionUpper,
    questions,
    loadedAt: admin.firestore.FieldValue.serverTimestamp(),
    questionCount: questions.length,
  });

  return questions;
}

// ============================================================================
// QUESTION SELECTION ENGINE
// ============================================================================

/**
 * Select questions for a user's daily session.
 * Uses spaced repetition, weak-area targeting, and difficulty adjustment.
 * @param {string} uid - User ID
 * @param {string} section - CPA section
 * @param {number} count - Number of questions to select (cap * 1.5)
 * @returns {Promise<string[]>} Array of question IDs
 */
async function selectDailyQuestions(uid, section, count) {
  const allQuestions = await loadQuestions(section);
  const poolSize = Math.min(Math.ceil(count * 1.5), allQuestions.length);

  // Get user's attempt history (last 14 days)
  const fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

  const attemptsSnap = await db.collection('daily_attempts')
    .where('uid', '==', uid)
    .where('section', '==', section)
    .where('attemptedAt', '>=', fourteenDaysAgo)
    .orderBy('attemptedAt', 'desc')
    .limit(500)
    .get();

  // Build history maps
  const recentCorrect = new Set();     // Correct in last 14 days
  const recentIncorrect = new Map();   // questionId → days since miss
  const seenLast7Days = new Set();     // All seen in last 7 days
  const blueprintAccuracy = {};        // blueprintArea → { correct, total }

  const now = new Date();
  attemptsSnap.forEach(doc => {
    const a = doc.data();
    const daysAgo = Math.floor((now - a.attemptedAt.toDate()) / (1000 * 60 * 60 * 24));

    if (daysAgo < 7) {
      seenLast7Days.add(a.questionId);
    }

    if (a.isCorrect) {
      recentCorrect.add(a.questionId);
    } else {
      const existing = recentIncorrect.get(a.questionId);
      if (!existing || daysAgo < existing) {
        recentIncorrect.set(a.questionId, daysAgo);
      }
    }

    // Blueprint accuracy
    const bp = a.blueprintArea || 'unknown';
    if (!blueprintAccuracy[bp]) {
      blueprintAccuracy[bp] = { correct: 0, total: 0 };
    }
    blueprintAccuracy[bp].total++;
    if (a.isCorrect) blueprintAccuracy[bp].correct++;
  });

  // Calculate trailing 7-day accuracy for difficulty mix
  let recentTotal = 0;
  let recentCorrectCount = 0;
  attemptsSnap.forEach(doc => {
    const a = doc.data();
    const daysAgo = Math.floor((now - a.attemptedAt.toDate()) / (1000 * 60 * 60 * 24));
    if (daysAgo < 7) {
      recentTotal++;
      if (a.isCorrect) recentCorrectCount++;
    }
  });
  const trailingAccuracy = recentTotal > 0 ? recentCorrectCount / recentTotal : 0.5;

  // Determine difficulty mix
  let diffMix;
  if (trailingAccuracy < 0.5) {
    diffMix = { easy: 0.40, medium: 0.40, hard: 0.20 };
  } else if (trailingAccuracy <= 0.75) {
    diffMix = { easy: 0.25, medium: 0.50, hard: 0.25 };
  } else {
    diffMix = { easy: 0.15, medium: 0.40, hard: 0.45 };
  }

  // Find weak blueprint areas (accuracy < 60%)
  const weakAreas = new Set();
  for (const [bp, stats] of Object.entries(blueprintAccuracy)) {
    if (stats.total >= 3 && (stats.correct / stats.total) < 0.6) {
      weakAreas.add(bp);
    }
  }

  // Score each question
  const scored = allQuestions.map(q => {
    let priority = 0;

    // Skip if answered correctly in last 14 days
    if (recentCorrect.has(q.id)) {
      priority = -10; // Very low, only use if nothing else
    }

    // Skip if seen in last 7 days (already answered, correct or not)
    if (seenLast7Days.has(q.id)) {
      priority = -20; // Never repeat within 7 days
    }

    // Highest priority: spaced repetition (missed questions due for review)
    if (recentIncorrect.has(q.id)) {
      const daysSinceMiss = recentIncorrect.get(q.id);
      if (SPACED_REP_INTERVALS.includes(daysSinceMiss)) {
        priority = 100; // Top priority
      }
    }

    // High priority: weak blueprint areas
    if (weakAreas.has(q.blueprintArea) && priority >= 0) {
      priority = Math.max(priority, 80);
    }

    // Medium priority: unseen questions
    if (!recentCorrect.has(q.id) && !recentIncorrect.has(q.id) && !seenLast7Days.has(q.id)) {
      priority = Math.max(priority, 50);
    }

    // Low priority: stale correct (correct > 14 days ago, already filtered above)
    // These questions have priority 0 by default

    // Small random factor to prevent identical daily sets
    priority += Math.random() * 5;

    return { id: q.id, difficulty: q.difficulty, priority };
  });

  // Sort by priority descending
  scored.sort((a, b) => b.priority - a.priority);

  // Filter out truly excluded questions (seen in last 7 days)
  const eligible = scored.filter(q => q.priority > -20);

  // Apply difficulty mix as soft constraint
  const targetCounts = {
    easy: Math.round(poolSize * diffMix.easy),
    medium: Math.round(poolSize * diffMix.medium),
    hard: Math.round(poolSize * diffMix.hard),
  };

  const selected = [];
  const diffCounts = { easy: 0, medium: 0, hard: 0 };

  for (const q of eligible) {
    if (selected.length >= poolSize) break;

    const diff = q.difficulty || 'medium';
    const target = targetCounts[diff] || 0;
    const current = diffCounts[diff] || 0;

    // Accept if under target or if we need to fill
    if (current < target || selected.length < poolSize * 0.7) {
      selected.push(q.id);
      diffCounts[diff] = (diffCounts[diff] || 0) + 1;
    }
  }

  // Fill remaining slots if needed
  if (selected.length < poolSize) {
    for (const q of eligible) {
      if (selected.length >= poolSize) break;
      if (!selected.includes(q.id)) {
        selected.push(q.id);
      }
    }
  }

  return selected;
}

// ============================================================================
// SMS MESSAGE FORMATTERS
// ============================================================================

/**
 * Format a question for SMS delivery.
 */
function formatQuestionSMS(question, questionNum, dailyCap, section, streakDays, isTrial, trialDay) {
  const lines = [];

  // Header
  if (isTrial) {
    lines.push(`VoraPrep Daily CPA — ${section}`);
    lines.push(`Day ${trialDay} of ${TRIAL_DAYS} free trial`);
    lines.push('');
  } else {
    const streakEmoji = streakDays >= 3 ? ` 🔥 ${streakDays}-day streak` : '';
    lines.push(`VoraPrep Daily CPA — ${section}`);
    lines.push(`Q${questionNum}/${dailyCap}${streakEmoji}`);
    lines.push('');
  }

  // Topic
  lines.push(`Topic: ${question.topic}`);
  lines.push('');

  // Question text (truncate if needed for SMS)
  const qText = question.question.length > 400
    ? question.question.substring(0, 397) + '...'
    : question.question;
  lines.push(qText);
  lines.push('');

  // Options
  const optionLabels = ['A', 'B', 'C', 'D'];
  question.options.forEach((opt, i) => {
    const optText = opt.length > 100 ? opt.substring(0, 97) + '...' : opt;
    lines.push(`${optionLabels[i]}) ${optText}`);
  });
  lines.push('');
  lines.push('Reply A, B, C, or D');

  return lines.join('\n');
}

/**
 * Format a correct answer response.
 */
function formatCorrectSMS(question, questionNum, dailyCap, isLastQuestion) {
  const optionLabels = ['A', 'B', 'C', 'D'];
  const correctLetter = optionLabels[question.correctAnswer];
  const lines = [];

  lines.push(`✅ Correct! Answer: ${correctLetter}`);
  lines.push('');

  // Explanation (truncate for SMS)
  const explanation = question.explanation.length > 250
    ? question.explanation.substring(0, 247) + '...'
    : question.explanation;
  lines.push(explanation);

  // Exam tip if available
  if (question.examTip) {
    const tip = question.examTip.length > 120
      ? question.examTip.substring(0, 117) + '...'
      : question.examTip;
    lines.push('');
    lines.push(`💡 ${tip}`);
  }

  if (!isLastQuestion) {
    lines.push('');
    lines.push(`Q${questionNum + 1}/${dailyCap} incoming...`);
  }

  return lines.join('\n');
}

/**
 * Format an incorrect answer response.
 */
function formatIncorrectSMS(question, userAnswer, questionNum, dailyCap, isLastQuestion) {
  const optionLabels = ['A', 'B', 'C', 'D'];
  const correctLetter = optionLabels[question.correctAnswer];
  const userLetter = optionLabels[userAnswer];
  const lines = [];

  lines.push(`❌ Not quite. Correct: ${correctLetter}`);
  lines.push('');
  lines.push(`You picked: ${userLetter}`);

  // Why wrong for the user's specific answer
  const whyWrongKey = String(userAnswer);
  if (question.whyWrong && question.whyWrong[whyWrongKey]) {
    let whyWrong = question.whyWrong[whyWrongKey];
    // Strip "Why option X is WRONG - " prefix if present
    whyWrong = whyWrong.replace(/^Why option [A-D] is (?:WRONG|CORRECT) [-–] /i, '');
    if (whyWrong.length > 200) {
      whyWrong = whyWrong.substring(0, 197) + '...';
    }
    lines.push(whyWrong);
  }

  lines.push('');

  // Short explanation
  const explanation = question.explanation.length > 200
    ? question.explanation.substring(0, 197) + '...'
    : question.explanation;
  lines.push(explanation);

  // Bottom line or memory aid
  if (question.bottomLine) {
    const bl = question.bottomLine.length > 120
      ? question.bottomLine.substring(0, 117) + '...'
      : question.bottomLine;
    lines.push('');
    lines.push(`⚠️ ${bl}`);
  }

  if (!isLastQuestion) {
    lines.push('');
    lines.push(`Q${questionNum + 1}/${dailyCap} incoming...`);
  }

  return lines.join('\n');
}

/**
 * Format daily summary.
 */
function formatDailySummary(section, answered, correct, streak, weakTopics, strongTopics) {
  const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;
  const lines = [];

  lines.push(`📊 Daily CPA — ${section} Summary`);
  lines.push('');
  lines.push(`Today: ${correct}/${answered} correct (${accuracy}%)`);
  lines.push(`Streak: 🔥 ${streak} day${streak !== 1 ? 's' : ''}`);

  if (strongTopics.length > 0) {
    lines.push(`Strong: ${strongTopics.slice(0, 3).join(', ')}`);
  }
  if (weakTopics.length > 0) {
    lines.push(`Review: ${weakTopics.slice(0, 3).join(', ')}`);
  }

  lines.push('');
  lines.push('See you tomorrow!');

  return lines.join('\n');
}

/**
 * Format trial completion / conversion CTA.
 */
function formatTrialEndCTA(section, totalAnswered, totalCorrect, streak) {
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const lines = [];

  lines.push(`📊 Trial Complete — ${section}`);
  lines.push('');
  lines.push(`3-day results: ${totalCorrect}/${totalAnswered} correct (${accuracy}%)`);
  lines.push(`Streak: 🔥 ${streak} day${streak !== 1 ? 's' : ''}`);
  lines.push('');
  lines.push('Your trial ends today. Keep your streak and progress:');
  lines.push('');
  lines.push('Starter (10/day): $4.99/mo');
  lines.push('Core (25/day): $9.99/mo');
  lines.push('Pro (50/day): $14.99/mo');
  lines.push('');
  lines.push('Upgrade: https://voraprep.com/daily-cpa/upgrade');
  lines.push('');
  lines.push('Reply STOP to unsubscribe.');

  return lines.join('\n');
}

/**
 * Format nudge message (no response for 90 min).
 */
function formatNudgeSMS() {
  return 'Still there? Your CPA question is waiting 📱\n\nReply A, B, C, or D\nOr text DONE to wrap up for today.';
}

/**
 * Format pause message.
 */
function formatPauseSMS(answered, dailyCap) {
  return `No worries! Your session is paused.\n\nToday's progress: ${answered}/${dailyCap} questions answered\n\nText RESUME anytime today to continue, or we'll pick up fresh tomorrow.`;
}

/**
 * Format resume confirmation.
 */
function formatResumeSMS(section, answered, correct, dailyCap) {
  return `Welcome back! Let's continue your ${section} practice.\n\nToday so far: ${answered}/${dailyCap} · ${correct}/${answered} correct\n\nNext question coming now...`;
}

// ============================================================================
// SESSION MANAGEMENT
// ============================================================================

/**
 * Get or create today's session for a user.
 */
async function getOrCreateSession(uid, date, section, dailyCap) {
  const sessionId = `${uid}_${date}`;
  const sessionRef = db.collection('daily_sessions').doc(sessionId);
  const sessionDoc = await sessionRef.get();

  if (sessionDoc.exists) {
    return { ref: sessionRef, data: sessionDoc.data() };
  }

  // Create new session with pre-selected question pool
  const poolSize = Math.min(Math.ceil(dailyCap * 1.5), 75);
  const questionPool = await selectDailyQuestions(uid, section, poolSize);

  const newSession = {
    uid,
    date,
    section,
    state: 'idle',
    dailyCap,
    questionsAnswered: 0,
    questionsCorrect: 0,
    currentQuestionId: null,
    currentQuestionNum: 0,
    currentQuestionSentAt: null,
    questionPool,
    answeredQuestions: [],
    startedAt: null,
    completedAt: null,
    pausedAt: null,
    resumedAt: null,
    nudgeSent: false,
  };

  await sessionRef.set(newSession);
  return { ref: sessionRef, data: newSession };
}

/**
 * Send the next question in a session.
 */
async function sendNextQuestion(uid, session, sessionRef) {
  const user = (await db.collection('daily_users').doc(uid).get()).data();
  if (!user) {
    console.error(`User not found: ${uid}`);
    return;
  }

  // Check if we've hit the daily cap
  if (session.questionsAnswered >= session.dailyCap) {
    await completeSession(uid, session, sessionRef);
    return;
  }

  // Pick next question from pool
  const nextIndex = session.questionsAnswered;
  if (nextIndex >= session.questionPool.length) {
    await completeSession(uid, session, sessionRef);
    return;
  }

  const questionId = session.questionPool[nextIndex];
  const questions = await loadQuestions(session.section);
  const question = questions.find(q => q.id === questionId);

  if (!question) {
    console.error(`Question not found: ${questionId}`);
    // Skip to next
    await sessionRef.update({
      questionPool: admin.firestore.FieldValue.arrayRemove(questionId),
    });
    return;
  }

  // Determine trial info
  const isTrial = user.status === 'trialing';
  let trialDay = 0;
  if (isTrial && user.trialStart) {
    trialDay = getTrialDay(user.trialStart.toDate(), user.timezone);
  }

  // Get streak
  const streakDoc = await db.collection('daily_streaks').doc(uid).get();
  const streakDays = streakDoc.exists ? streakDoc.data().currentStreak : 0;

  const questionNum = session.questionsAnswered + 1;
  const body = formatQuestionSMS(
    question,
    questionNum,
    session.dailyCap,
    session.section,
    streakDays,
    isTrial,
    trialDay
  );

  await sendUserSMS(uid, user.phone, body);

  await sessionRef.update({
    state: 'waiting_answer',
    currentQuestionId: questionId,
    currentQuestionNum: questionNum,
    currentQuestionSentAt: admin.firestore.FieldValue.serverTimestamp(),
    nudgeSent: false,
    startedAt: session.startedAt || admin.firestore.FieldValue.serverTimestamp(),
  });
}

/**
 * Process a user's answer to the current question.
 */
async function processAnswer(uid, answerIndex) {
  const user = (await db.collection('daily_users').doc(uid).get()).data();
  if (!user) {
    throw new Error(`User not found: ${uid}`);
  }

  const today = getTodayString(user.timezone);
  const sessionId = `${uid}_${today}`;
  const sessionRef = db.collection('daily_sessions').doc(sessionId);
  const sessionDoc = await sessionRef.get();

  if (!sessionDoc.exists) {
    await sendUserSMS(uid, user.phone, 'No active session. Your next session starts tomorrow morning!');
    return;
  }

  const session = sessionDoc.data();

  if (session.state !== 'waiting_answer') {
    // User might be answering after a pause
    if (session.state === 'paused') {
      // Resume the session
      await sessionRef.update({
        state: 'waiting_answer',
        pausedAt: null,
        resumedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      // Process the answer normally (fall through)
    } else if (session.state === 'completed') {
      await sendUserSMS(uid, user.phone, `You've completed today's session! See you tomorrow.`);
      return;
    } else {
      return; // Ignore unexpected answers
    }
  }

  // Load the current question
  const questions = await loadQuestions(session.section);
  const question = questions.find(q => q.id === session.currentQuestionId);

  if (!question) {
    console.error(`Question not found for answer: ${session.currentQuestionId}`);
    return;
  }

  const isCorrect = answerIndex === question.correctAnswer;
  const questionNum = session.currentQuestionNum;
  const isLastQuestion = questionNum >= session.dailyCap;

  // Record attempt
  await db.collection('daily_attempts').add({
    uid,
    questionId: question.id,
    section: session.section,
    blueprintArea: question.blueprintArea,
    topic: question.topic,
    difficulty: question.difficulty,
    userAnswer: answerIndex,
    correctAnswer: question.correctAnswer,
    isCorrect,
    responseTimeSec: session.currentQuestionSentAt
      ? Math.floor((Date.now() - session.currentQuestionSentAt.toDate().getTime()) / 1000)
      : null,
    attemptedAt: admin.firestore.FieldValue.serverTimestamp(),
    sessionDate: today,
  });

  // Update session
  await sessionRef.update({
    questionsAnswered: admin.firestore.FieldValue.increment(1),
    questionsCorrect: isCorrect
      ? admin.firestore.FieldValue.increment(1)
      : admin.firestore.FieldValue.increment(0),
    answeredQuestions: admin.firestore.FieldValue.arrayUnion(question.id),
    currentQuestionId: null,
    currentQuestionSentAt: null,
    state: 'active',
  });

  // Send feedback
  let feedbackBody;
  if (isCorrect) {
    feedbackBody = formatCorrectSMS(question, questionNum, session.dailyCap, isLastQuestion);
  } else {
    feedbackBody = formatIncorrectSMS(question, answerIndex, questionNum, session.dailyCap, isLastQuestion);
  }

  await sendUserSMS(uid, user.phone, feedbackBody);

  // Update streak
  await updateStreak(uid, today, isCorrect);

  // If last question, complete the session
  if (isLastQuestion) {
    // Re-read session to get updated counts
    const updatedSession = (await sessionRef.get()).data();
    await completeSession(uid, updatedSession, sessionRef);
  } else {
    // Short delay, then send next question (10 seconds handled by caller)
    // In practice, the next question is sent immediately since SMS is async
    const updatedSession = (await sessionRef.get()).data();
    await sendNextQuestion(uid, updatedSession, sessionRef);
  }
}

/**
 * Complete a daily session and send summary.
 */
async function completeSession(uid, session, sessionRef) {
  const user = (await db.collection('daily_users').doc(uid).get()).data();
  if (!user) return;

  // Calculate topic performance
  const todayAttempts = await db.collection('daily_attempts')
    .where('uid', '==', uid)
    .where('sessionDate', '==', session.date)
    .get();

  const topicStats = {};
  todayAttempts.forEach(doc => {
    const a = doc.data();
    if (!topicStats[a.topic]) {
      topicStats[a.topic] = { correct: 0, total: 0 };
    }
    topicStats[a.topic].total++;
    if (a.isCorrect) topicStats[a.topic].correct++;
  });

  const strongTopics = [];
  const weakTopics = [];
  for (const [topic, stats] of Object.entries(topicStats)) {
    const accuracy = stats.correct / stats.total;
    if (accuracy >= 0.75) strongTopics.push(topic);
    else if (accuracy < 0.5) weakTopics.push(topic);
  }

  const streakDoc = await db.collection('daily_streaks').doc(uid).get();
  const streak = streakDoc.exists ? streakDoc.data().currentStreak : 1;

  // Check if this is the end of trial
  const isTrial = user.status === 'trialing';
  let trialDay = 0;
  if (isTrial && user.trialStart) {
    trialDay = getTrialDay(user.trialStart.toDate(), user.timezone);
  }

  if (isTrial && trialDay >= TRIAL_DAYS) {
    // Send trial conversion CTA
    const totalAttempts = await db.collection('daily_attempts')
      .where('uid', '==', uid)
      .get();
    let totalAnswered = 0;
    let totalCorrect = 0;
    totalAttempts.forEach(doc => {
      totalAnswered++;
      if (doc.data().isCorrect) totalCorrect++;
    });

    const ctaBody = formatTrialEndCTA(session.section, totalAnswered, totalCorrect, streak);
    await sendUserSMS(uid, user.phone, ctaBody);
  } else {
    // Send daily summary
    const summaryBody = formatDailySummary(
      session.section,
      session.questionsAnswered,
      session.questionsCorrect,
      streak,
      weakTopics,
      strongTopics
    );
    await sendUserSMS(uid, user.phone, summaryBody);
  }

  await sessionRef.update({
    state: 'completed',
    completedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
}

// ============================================================================
// STREAK MANAGEMENT
// ============================================================================

/**
 * Update user's streak after answering a question.
 */
async function updateStreak(uid, todayStr, isCorrect) {
  const streakRef = db.collection('daily_streaks').doc(uid);
  const streakDoc = await streakRef.get();

  if (!streakDoc.exists) {
    await streakRef.set({
      uid,
      currentStreak: 1,
      longestStreak: 1,
      lastAnsweredDate: todayStr,
      totalQuestionsAnswered: 1,
      totalCorrect: isCorrect ? 1 : 0,
    });
    return;
  }

  const streak = streakDoc.data();
  const lastDate = streak.lastAnsweredDate;

  // Already answered today — just update counts
  if (lastDate === todayStr) {
    await streakRef.update({
      totalQuestionsAnswered: admin.firestore.FieldValue.increment(1),
      totalCorrect: isCorrect
        ? admin.firestore.FieldValue.increment(1)
        : admin.firestore.FieldValue.increment(0),
    });
    return;
  }

  // Check if this is a consecutive day
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  let newStreak;
  if (lastDate === yesterdayStr) {
    newStreak = streak.currentStreak + 1;
  } else {
    newStreak = 1; // Reset streak
  }

  await streakRef.update({
    currentStreak: newStreak,
    longestStreak: Math.max(newStreak, streak.longestStreak || 0),
    lastAnsweredDate: todayStr,
    totalQuestionsAnswered: admin.firestore.FieldValue.increment(1),
    totalCorrect: isCorrect
      ? admin.firestore.FieldValue.increment(1)
      : admin.firestore.FieldValue.increment(0),
  });
}

// ============================================================================
// TIMEZONE UTILITIES
// ============================================================================

/**
 * Get today's date string in user's timezone.
 */
function getTodayString(timezone) {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: timezone || 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return formatter.format(now); // Returns YYYY-MM-DD
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

/**
 * Calculate the trial day number using calendar days in user's timezone.
 * Day 1 = signup day, Day 2 = next calendar day, etc.
 */
function getTrialDay(trialStartDate, timezone) {
  const tz = timezone || 'America/New_York';
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: tz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const startStr = formatter.format(trialStartDate);
  const nowStr = formatter.format(new Date());
  const startDate = new Date(startStr + 'T00:00:00');
  const nowDate = new Date(nowStr + 'T00:00:00');
  return Math.floor((nowDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
}

/**
 * Get current hour in user's timezone.
 */
function getCurrentHour(timezone) {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone || 'America/New_York',
      hour: 'numeric',
      hour12: false,
    });
    return parseInt(formatter.format(now), 10);
  } catch {
    return new Date().getHours();
  }
}

/**
 * Check if current time is within quiet hours for user.
 */
function isQuietHours(timezone) {
  const hour = getCurrentHour(timezone);
  return hour >= QUIET_HOUR_START || hour < QUIET_HOUR_END;
}

/**
 * Check if it's time to send the morning kickoff for a user.
 * Returns true if the user's selected send time falls within the current 15-minute window.
 */
function isKickoffTime(sendTime, timezone) {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone || 'America/New_York',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const currentTime = formatter.format(now); // 'HH:MM'
    const [currentH, currentM] = currentTime.split(':').map(Number);
    const [sendH, sendM] = (sendTime || '07:00').split(':').map(Number);

    const currentMinutes = currentH * 60 + currentM;
    const sendMinutes = sendH * 60 + sendM;

    // Within 15-minute window
    return currentMinutes >= sendMinutes && currentMinutes < sendMinutes + 15;
  } catch {
    return false;
  }
}

// ============================================================================
// EXPORTED CLOUD FUNCTIONS
// ============================================================================

/**
 * Morning Kickoff — Runs every 15 minutes.
 * Checks all active users and sends Q1 if it's their send time.
 */
exports.dailyCpa_morningKickoff = onSchedule({
  schedule: 'every 15 minutes',
  timeZone: 'UTC',
  secrets: ['TELNYX_API_KEY', 'TELNYX_PHONE_NUMBER'],
  memory: '512MiB',
  timeoutSeconds: 300,
}, async () => {
  console.log('[DailyCPA] Morning kickoff check starting...');

  try {
    // Get all active/trialing users with SMS opt-in
    const usersSnap = await db.collection('daily_users')
      .where('smsOptIn', '==', true)
      .where('status', 'in', ['active', 'trialing'])
      .get();

    console.log(`[DailyCPA] Found ${usersSnap.size} opted-in users`);

    let sentCount = 0;
    let skippedCount = 0;

    for (const userDoc of usersSnap.docs) {
      const user = userDoc.data();
      const uid = userDoc.id;

      // Check if it's kickoff time for this user
      if (!isKickoffTime(user.sendTime, user.timezone)) {
        continue;
      }

      // Check quiet hours
      if (isQuietHours(user.timezone)) {
        continue;
      }

      // Check if trial expired
      if (user.status === 'trialing' && user.trialEnd) {
        const trialEnd = user.trialEnd.toDate();
        if (new Date() > trialEnd) {
          skippedCount++;
          continue; // Trial expired, skip until billing converts
        }
      }

      // Proactive CTA: "trial ends tomorrow" on penultimate day
      if (user.status === 'trialing' && user.trialStart) {
        const trialDay = getTrialDay(user.trialStart.toDate(), user.timezone);
        if (trialDay === TRIAL_DAYS) {
          // Last day of trial — prepend a heads-up to today's session
          try {
            await sendUserSMS(uid, user.phone,
              `⏰ Heads up! Your VoraPrep Daily CPA trial ends today.\n\nKeep your streak going — upgrade anytime:\nhttps://voraprep.com/daily-cpa/upgrade\n\nStarter: $4.99/mo · Core: $9.99/mo · Pro: $14.99/mo`
            );
          } catch (e) {
            console.error(`[DailyCPA] Trial-ending CTA failed for ${uid}:`, e.message);
          }
        }
      }

      const today = getTodayString(user.timezone);
      const sessionId = `${uid}_${today}`;

      // Check if session already exists and is not idle
      const existingSession = await db.collection('daily_sessions').doc(sessionId).get();
      if (existingSession.exists && existingSession.data().state !== 'idle') {
        continue; // Already started today
      }

      // Determine daily cap
      const dailyCap = user.status === 'trialing'
        ? TIER_CONFIG.trial.dailyCap
        : (TIER_CONFIG[user.tier] || TIER_CONFIG.starter).dailyCap;

      // Create session and send first question
      const { ref, data } = await getOrCreateSession(uid, today, user.section, dailyCap);
      await sendNextQuestion(uid, data, ref);

      sentCount++;
    }

    console.log(`[DailyCPA] Kickoff complete: ${sentCount} sent, ${skippedCount} skipped`);
  } catch (error) {
    console.error('[DailyCPA] Morning kickoff error:', error);
  }
});

/**
 * Nudge Check — Runs every 30 minutes.
 * Nudges users who haven't responded in 90 minutes. Auto-pauses at 120 minutes.
 */
exports.dailyCpa_nudgeCheck = onSchedule({
  schedule: 'every 30 minutes',
  timeZone: 'UTC',
  secrets: ['TELNYX_API_KEY', 'TELNYX_PHONE_NUMBER'],
  memory: '256MiB',
  timeoutSeconds: 120,
}, async () => {
  console.log('[DailyCPA] Nudge check starting...');

  try {
    // Find sessions in waiting_answer state
    const waitingSessions = await db.collection('daily_sessions')
      .where('state', '==', 'waiting_answer')
      .get();

    const now = new Date();
    let nudgeCount = 0;
    let pauseCount = 0;

    for (const sessionDoc of waitingSessions.docs) {
      const session = sessionDoc.data();
      if (!session.currentQuestionSentAt) continue;

      const sentAt = session.currentQuestionSentAt.toDate();
      const minutesWaiting = (now - sentAt) / (1000 * 60);

      const user = (await db.collection('daily_users').doc(session.uid).get()).data();
      if (!user) continue;

      // Check quiet hours — pause if we've entered quiet hours
      if (isQuietHours(user.timezone)) {
        await sendUserSMS(session.uid, user.phone, formatPauseSMS(session.questionsAnswered, session.dailyCap));
        await sessionDoc.ref.update({
          state: 'paused',
          pausedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        pauseCount++;
        continue;
      }

      if (minutesWaiting >= PAUSE_AFTER_MINUTES) {
        // Auto-pause
        await sendUserSMS(session.uid, user.phone, formatPauseSMS(session.questionsAnswered, session.dailyCap));
        await sessionDoc.ref.update({
          state: 'paused',
          pausedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        pauseCount++;
      } else if (minutesWaiting >= NUDGE_AFTER_MINUTES && !session.nudgeSent) {
        // Send nudge
        await sendUserSMS(session.uid, user.phone, formatNudgeSMS());
        await sessionDoc.ref.update({ nudgeSent: true });
        nudgeCount++;
      }
    }

    console.log(`[DailyCPA] Nudge check: ${nudgeCount} nudged, ${pauseCount} paused`);
  } catch (error) {
    console.error('[DailyCPA] Nudge check error:', error);
  }
});

/**
 * Trial Expiration — Runs daily at 3 AM ET.
 * Converts expired trials to paid or pauses them.
 */
exports.dailyCpa_trialExpiration = onSchedule({
  schedule: 'every day 03:00',
  timeZone: 'America/New_York',
  secrets: ['TELNYX_API_KEY', 'TELNYX_PHONE_NUMBER'],
  memory: '256MiB',
  timeoutSeconds: 120,
}, async () => {
  console.log('[DailyCPA] Trial expiration check starting...');

  try {
    const now = new Date();
    const trialingUsers = await db.collection('daily_users')
      .where('status', '==', 'trialing')
      .get();

    let convertedCount = 0;
    let pausedCount = 0;

    for (const userDoc of trialingUsers.docs) {
      const user = userDoc.data();
      const uid = userDoc.id;

      if (!user.trialEnd) continue;
      const trialEnd = user.trialEnd.toDate();
      if (now < trialEnd) continue; // Trial still active

      // Trial expired
      if (user.stripeSubscriptionId) {
        // Has payment method — Stripe will auto-convert
        await userDoc.ref.update({
          status: 'active',
          dailyCap: (TIER_CONFIG[user.tier] || TIER_CONFIG.starter).dailyCap,
        });
        convertedCount++;
        console.log(`[DailyCPA] Trial converted to paid: ${uid}`);
      } else {
        // No payment — pause
        await userDoc.ref.update({ status: 'paused' });
        await sendUserSMS(uid, user.phone,
          `Your VoraPrep Daily CPA trial has ended.\n\nUpgrade to continue your ${user.section} practice:\nhttps://voraprep.com/daily-cpa/upgrade\n\nYour progress is saved.`
        );
        pausedCount++;
        console.log(`[DailyCPA] Trial expired, no payment: ${uid}`);
      }
    }

    console.log(`[DailyCPA] Trial expiration: ${convertedCount} converted, ${pausedCount} paused`);
  } catch (error) {
    console.error('[DailyCPA] Trial expiration error:', error);
  }
});

/**
 * Weekly Recap — Runs every Sunday at 9 AM ET.
 * Sends weekly performance summary to paid users.
 */
exports.dailyCpa_weeklyRecap = onSchedule({
  schedule: 'every sunday 09:00',
  timeZone: 'America/New_York',
  secrets: ['TELNYX_API_KEY', 'TELNYX_PHONE_NUMBER'],
  memory: '256MiB',
  timeoutSeconds: 300,
}, async () => {
  console.log('[DailyCPA] Weekly recap starting...');

  try {
    const activeUsers = await db.collection('daily_users')
      .where('status', '==', 'active')
      .where('smsOptIn', '==', true)
      .get();

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    let sentCount = 0;

    for (const userDoc of activeUsers.docs) {
      const user = userDoc.data();
      const uid = userDoc.id;

      // Get weekly attempts
      const weekAttempts = await db.collection('daily_attempts')
        .where('uid', '==', uid)
        .where('attemptedAt', '>=', sevenDaysAgo)
        .get();

      if (weekAttempts.empty) continue;

      let total = 0;
      let correct = 0;
      const topicStats = {};

      weekAttempts.forEach(doc => {
        const a = doc.data();
        total++;
        if (a.isCorrect) correct++;
        if (!topicStats[a.topic]) topicStats[a.topic] = { correct: 0, total: 0 };
        topicStats[a.topic].total++;
        if (a.isCorrect) topicStats[a.topic].correct++;
      });

      const accuracy = Math.round((correct / total) * 100);
      const streakDoc = await db.collection('daily_streaks').doc(uid).get();
      const streak = streakDoc.exists ? streakDoc.data().currentStreak : 0;

      // Find strong and weak topics
      const strong = [];
      const weak = [];
      for (const [topic, stats] of Object.entries(topicStats)) {
        const topicAcc = stats.correct / stats.total;
        if (topicAcc >= 0.8 && stats.total >= 2) strong.push(topic);
        else if (topicAcc < 0.5 && stats.total >= 2) weak.push(topic);
      }

      const lines = [
        `📊 Weekly CPA — ${user.section} Report`,
        '',
        `Questions: ${total}`,
        `Accuracy: ${accuracy}%`,
        `Streak: 🔥 ${streak} days`,
        '',
      ];

      if (strong.length > 0) lines.push(`💪 Strong: ${strong.slice(0, 3).join(', ')}`);
      if (weak.length > 0) lines.push(`📖 Focus on: ${weak.slice(0, 3).join(', ')}`);

      lines.push('');
      lines.push('Keep it up this week!');

      await sendUserSMS(uid, user.phone, lines.join('\n'));
      sentCount++;
    }

    console.log(`[DailyCPA] Weekly recap sent to ${sentCount} users`);
  } catch (error) {
    console.error('[DailyCPA] Weekly recap error:', error);
  }
});

/**
 * Inbound SMS Webhook — Telnyx posts here when a user sends a text.
 */
exports.dailyCpa_smsInbound = onRequest({
  cors: false,
  invoker: 'public',
  secrets: ['TELNYX_API_KEY', 'TELNYX_PHONE_NUMBER'],
  memory: '512MiB',
  timeoutSeconds: 60,
}, async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method not allowed');
    return;
  }

  try {
    // Telnyx posts JSON — parse the event envelope
    const event = req.body;

    // Only handle inbound message events
    if (event?.data?.event_type !== 'message.received') {
      res.status(200).json({});
      return;
    }

    const payload = event.data.payload;
    const From = payload?.from?.phone_number;
    const Body = payload?.text;
    const MessageId = payload?.id;

    if (!From || !Body) {
      res.status(400).send('Missing From or Body');
      return;
    }

    // Log inbound message
    await db.collection('daily_sms_log').add({
      direction: 'inbound',
      from: From,
      telnyxMessageId: MessageId || '',
      body: Body.substring(0, 500),
      status: 'received',
      sentAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Look up user by phone number
    const usersSnap = await db.collection('daily_users')
      .where('phone', '==', From)
      .limit(1)
      .get();

    if (usersSnap.empty) {
      console.log(`[DailyCPA] Inbound from unknown number: ${From}`);
      res.status(200).json({});
      return;
    }

    const userDoc = usersSnap.docs[0];
    const uid = userDoc.id;
    const user = userDoc.data();
    const reply = Body.trim().toUpperCase();

    // Route the reply
    switch (reply) {
      case 'A':
      case 'B':
      case 'C':
      case 'D': {
        const answerIndex = reply.charCodeAt(0) - 65; // A=0, B=1, C=2, D=3
        await processAnswer(uid, answerIndex);
        break;
      }
      case 'STOP': {
        await userDoc.ref.update({ smsOptIn: false });
        await sendUserSMS(uid, user.phone,
          "You've been unsubscribed from VoraPrep Daily CPA texts. You won't receive any more messages.\n\nTo resubscribe, visit https://voraprep.com/daily-cpa\n\nYour account and progress are saved."
        );
        break;
      }
      case 'HELP': {
        await sendUserSMS(uid, user.phone,
          'VoraPrep Daily CPA\n- Reply A/B/C/D to answer\n- RESUME to continue a paused session\n- DONE to end today\'s session\n- STOP to unsubscribe\n\nQuestions? support@voraprep.com'
        );
        break;
      }
      case 'RESUME': {
        const today = getTodayString(user.timezone);
        const sessionId = `${uid}_${today}`;
        const sessionRef = db.collection('daily_sessions').doc(sessionId);
        const sessionDoc = await sessionRef.get();

        if (sessionDoc.exists && sessionDoc.data().state === 'paused') {
          const session = sessionDoc.data();
          await sessionRef.update({
            state: 'active',
            pausedAt: null,
            resumedAt: admin.firestore.FieldValue.serverTimestamp(),
          });
          await sendUserSMS(uid, user.phone,
            formatResumeSMS(user.section, session.questionsAnswered, session.questionsCorrect, session.dailyCap)
          );
          // Send next question
          const updatedSession = (await sessionRef.get()).data();
          await sendNextQuestion(uid, updatedSession, sessionRef);
        } else {
          await sendUserSMS(uid, user.phone,
            'No paused session found. Your next session starts tomorrow morning!'
          );
        }
        break;
      }
      case 'DONE': {
        const today = getTodayString(user.timezone);
        const sessionId = `${uid}_${today}`;
        const sessionRef = db.collection('daily_sessions').doc(sessionId);
        const sessionDoc = await sessionRef.get();

        if (sessionDoc.exists && ['active', 'waiting_answer', 'paused'].includes(sessionDoc.data().state)) {
          const session = sessionDoc.data();
          await completeSession(uid, session, sessionRef);
        } else {
          await sendUserSMS(uid, user.phone, 'No active session. See you tomorrow!');
        }
        break;
      }
      default: {
        await sendUserSMS(uid, user.phone,
          'Reply with A, B, C, or D to answer.\n\nOr text DONE to wrap up, RESUME to continue, HELP for options.'
        );
        break;
      }
    }

    // Acknowledge webhook — all replies are sent via outbound API calls
    res.status(200).json({});
  } catch (error) {
    console.error('[DailyCPA] Inbound SMS error:', error);
    res.status(500).send('Internal error');
  }
});

/**
 * Signup — Callable function to register a new Daily CPA user.
 */
exports.dailyCpa_signup = onCall({
  cors: true,
  invoker: 'public',
  enforceAppCheck: false,
  secrets: ['TELNYX_API_KEY', 'TELNYX_PHONE_NUMBER'],
  memory: '256MiB',
}, async (request) => {
  const { phone, section, timezone, sendTime, tier } = request.data;

  // Validate required fields
  if (!phone || !section) {
    throw new HttpsError('invalid-argument', 'Phone number and section are required.');
  }

  // Validate phone format (E.164)
  const phoneRegex = /^\+1\d{10}$/;
  if (!phoneRegex.test(phone)) {
    throw new HttpsError('invalid-argument', 'Phone must be US E.164 format: +1XXXXXXXXXX');
  }

  // Validate section
  const sectionUpper = section.toUpperCase();
  if (!SECTIONS.includes(sectionUpper)) {
    throw new HttpsError('invalid-argument', `Invalid section. Must be one of: ${SECTIONS.join(', ')}`);
  }

  // Validate tier
  const validTier = tier && ['starter', 'core', 'pro'].includes(tier) ? tier : 'starter';

  // Check if phone already registered
  const existingSnap = await db.collection('daily_users')
    .where('phone', '==', phone)
    .limit(1)
    .get();

  if (!existingSnap.empty) {
    throw new HttpsError('already-exists', 'This phone number is already registered.');
  }

  // Create user
  const uid = db.collection('daily_users').doc().id; // Auto-generate ID
  const userTz = timezone || 'America/New_York';

  // Trial end = midnight on day TRIAL_DAYS+1 in user's timezone (full calendar days)
  const nowInTz = new Date(new Date().toLocaleString('en-US', { timeZone: userTz }));
  const trialEnd = new Date(nowInTz);
  trialEnd.setDate(trialEnd.getDate() + TRIAL_DAYS);
  trialEnd.setHours(23, 59, 59, 999); // End of the last trial day

  const userData = {
    uid,
    phone,
    email: request.data.email || null,
    timezone: userTz,
    sendTime: sendTime || '07:00',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    smsOptIn: true,
    smsOptInAt: admin.firestore.FieldValue.serverTimestamp(),
    section: sectionUpper,
    status: 'trialing',
    tier: validTier,
    dailyCap: TIER_CONFIG.trial.dailyCap,
    trialStart: admin.firestore.FieldValue.serverTimestamp(),
    trialEnd: admin.firestore.Timestamp.fromDate(trialEnd),
    stripeCustomerId: null,
    stripeSubscriptionId: null,
    upgradeSource: request.data.utm_source || null,
  };

  await db.collection('daily_users').doc(uid).set(userData);

  // Initialize streak
  await db.collection('daily_streaks').doc(uid).set({
    uid,
    currentStreak: 0,
    longestStreak: 0,
    lastAnsweredDate: null,
    totalQuestionsAnswered: 0,
    totalCorrect: 0,
  });

  // Send welcome SMS (non-blocking — user is created even if SMS fails)
  try {
    await sendUserSMS(uid, phone,
      `Welcome to VoraPrep Daily CPA — ${sectionUpper}! 🎯\n\nYou have a ${TRIAL_DAYS}-day free trial with ${TIER_CONFIG.trial.dailyCap} questions/day.\n\nYour first questions arrive tomorrow at ${sendTime || '7:00 AM'}.\n\nReply HELP anytime for options.\nReply STOP to unsubscribe.`
    );
  } catch (smsErr) {
    console.error(`[DailyCPA] Welcome SMS failed for ${uid}:`, smsErr.message);
    // Don't throw — user is created, they'll get questions tomorrow via morningKickoff
  }

  console.log(`[DailyCPA] New signup: ${uid}, section: ${sectionUpper}, phone: ${phone.substring(0, 6)}****`);

  return {
    uid,
    section: sectionUpper,
    tier: validTier,
    trialEnd: trialEnd.toISOString(),
    message: 'Welcome! Your trial has started.',
  };
});

/**
 * Create Checkout Session — For Daily CPA subscription.
 */
exports.dailyCpa_createCheckout = onCall({
  cors: true,
  invoker: 'public',
  enforceAppCheck: false,
  secrets: ['STRIPE_SECRET_KEY'],
  memory: '256MiB',
}, async (request) => {
  const { uid, tier, origin } = request.data;

  if (!uid || !tier) {
    throw new HttpsError('invalid-argument', 'Missing uid or tier');
  }

  if (!['starter', 'core', 'pro'].includes(tier)) {
    throw new HttpsError('invalid-argument', 'Invalid tier');
  }

  // Get user
  const userDoc = await db.collection('daily_users').doc(uid).get();
  if (!userDoc.exists) {
    throw new HttpsError('not-found', 'User not found');
  }
  const user = userDoc.data();

  // Get Stripe client
  const stripeKey = process.env.STRIPE_SECRET_KEY?.trim();
  if (!stripeKey) {
    throw new HttpsError('failed-precondition', 'Stripe not configured');
  }
  const stripe = require('stripe')(stripeKey);

  // Look up price
  const lookupKey = DAILY_CPA_PRICE_KEYS[tier];
  const prices = await stripe.prices.list({
    lookup_keys: [lookupKey],
    active: true,
    limit: 1,
  });

  if (prices.data.length === 0) {
    throw new HttpsError('not-found', `Price not found for: ${lookupKey}`);
  }

  const priceId = prices.data[0].id;

  // Create or reuse Stripe customer
  let customerId = user.stripeCustomerId;
  if (!customerId) {
    const customer = await stripe.customers.create({
      phone: user.phone,
      email: user.email || undefined,
      metadata: {
        dailyCpaUserId: uid,
        product: 'daily_cpa',
        section: user.section,
      },
    });
    customerId = customer.id;
    await userDoc.ref.update({ stripeCustomerId: customerId });
  }

  const baseUrl = origin || 'https://voraprep.com/daily-cpa';

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/upgrade`,
    subscription_data: {
      trial_period_days: user.status === 'trialing' ? undefined : 0,
      metadata: {
        dailyCpaUserId: uid,
        product: 'daily_cpa',
        section: user.section,
        tier,
      },
    },
    metadata: {
      dailyCpaUserId: uid,
      product: 'daily_cpa',
    },
  });

  return {
    sessionId: session.id,
    url: session.url,
  };
});

/**
 * Stripe Webhook — Handles Daily CPA subscription events.
 */
exports.dailyCpa_stripeWebhook = onRequest({
  cors: false,
  invoker: 'public',
  secrets: ['STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET'],
  memory: '256MiB',
}, async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method not allowed');
    return;
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY?.trim();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  if (!stripeKey || !webhookSecret) {
    res.status(500).send('Stripe not configured');
    return;
  }

  const stripe = require('stripe')(stripeKey);
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Firebase Gen 2 provides req.rawBody as a Buffer for signature verification
    const payload = req.rawBody;
    if (!payload) {
      console.error('[DailyCPA] No rawBody available for webhook signature verification');
      res.status(400).send('Missing raw body');
      return;
    }
    event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
  } catch (err) {
    console.error('[DailyCPA] Webhook signature verification failed:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  console.log(`[DailyCPA] Stripe webhook: ${event.type}`);

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const metadata = subscription.metadata || {};
        if (metadata.product !== 'daily_cpa') break; // Not our product

        const uid = metadata.dailyCpaUserId;
        if (!uid) break;

        const firstItem = subscription.items?.data?.[0];
        const status = subscription.status;

        await db.collection('daily_users').doc(uid).update({
          status: status === 'active' ? 'active' : status,
          stripeSubscriptionId: subscription.id,
          dailyCap: (TIER_CONFIG[metadata.tier] || TIER_CONFIG.starter).dailyCap,
          tier: metadata.tier || 'starter',
        });

        console.log(`[DailyCPA] Subscription ${status} for user ${uid}`);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const metadata = subscription.metadata || {};
        if (metadata.product !== 'daily_cpa') break;

        const uid = metadata.dailyCpaUserId;
        if (!uid) break;

        await db.collection('daily_users').doc(uid).update({
          status: 'canceled',
        });

        const user = (await db.collection('daily_users').doc(uid).get()).data();
        if (user && user.phone) {
          await sendUserSMS(uid, user.phone,
            `Your VoraPrep Daily CPA subscription has been canceled.\n\nYour progress is saved. Resubscribe anytime at https://voraprep.com/daily-cpa/upgrade`
          );
        }

        console.log(`[DailyCPA] Subscription canceled for user ${uid}`);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const subscription = invoice.subscription
          ? await stripe.subscriptions.retrieve(invoice.subscription)
          : null;
        const metadata = subscription?.metadata || {};
        if (metadata.product !== 'daily_cpa') break;

        const uid = metadata.dailyCpaUserId;
        if (!uid) break;

        const user = (await db.collection('daily_users').doc(uid).get()).data();
        if (user && user.phone) {
          await sendUserSMS(uid, user.phone,
            `⚠️ Your VoraPrep Daily CPA payment failed.\n\nUpdate your payment method to continue receiving daily questions:\nhttps://voraprep.com/daily-cpa/upgrade`
          );
        }
        break;
      }
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('[DailyCPA] Webhook handler error:', error);
    res.status(500).send('Webhook handler failed');
  }
});

/**
 * Daily Reset — Runs every hour.
 * Resets sessions for users past midnight in their timezone.
 */
exports.dailyCpa_dailyReset = onSchedule({
  schedule: 'every 60 minutes',
  timeZone: 'UTC',
  memory: '256MiB',
  timeoutSeconds: 120,
}, async () => {
  // This function resets stale sessions.
  // The morning kickoff creates new sessions, so this just cleans up.
  console.log('[DailyCPA] Daily reset check...');

  // No action needed — sessions are keyed by date (uid_YYYY-MM-DD)
  // and the morning kickoff creates fresh sessions.
  // Old sessions naturally become inactive.

  // Optional: clean up sessions older than 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split('T')[0];

  const oldSessions = await db.collection('daily_sessions')
    .where('date', '<', thirtyDaysAgoStr)
    .limit(100) // Batch delete
    .get();

  if (!oldSessions.empty) {
    const batch = db.batch();
    oldSessions.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
    console.log(`[DailyCPA] Cleaned up ${oldSessions.size} old sessions`);
  }
});

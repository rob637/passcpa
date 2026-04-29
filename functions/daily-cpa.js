/**
 * VoraPrep Daily CPA — SMS-based daily MCQ practice
 * v2026.04.27 - Telnyx credentials migrated to Firestore (system_config/telnyx)
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

let _telnyxCredentials = null;

async function getTelnyxCredentials() {
  if (_telnyxCredentials) return _telnyxCredentials;

  // Try environment variables first (Firebase Secrets)
  const envApiKey = process.env.TELNYX_API_KEY?.trim();
  const envPhone = process.env.TELNYX_PHONE_NUMBER?.trim();
  if (envApiKey && envPhone) {
    _telnyxCredentials = {
      apiKey: envApiKey,
      phoneNumber: envPhone,
    };
    return _telnyxCredentials;
  }
  
  // Fallback: read from Firestore system_config
  try {
    const doc = await db.collection('system_config').doc('telnyx').get();
    if (doc.exists) {
      const data = doc.data();
      _telnyxCredentials = {
        apiKey: data.apiKey,
        phoneNumber: data.phoneNumber
      };
      console.log('[DailyCPA] Loaded Telnyx credentials from Firestore');
      return _telnyxCredentials;
    }
  } catch (e) {
    console.error('[DailyCPA] Failed to read from Firestore:', e.message);
  }
  
  console.error('Telnyx credentials not configured');
  return null;
}

function getTelnyxClient(apiKey) {
  if (!apiKey) return null;
  // Telnyx SDK v6.x: use `new Telnyx({apiKey})`. The v1.x `require('telnyx')(apiKey)`
  // pattern silently created a broken client that returned 401 on every request.
  const Telnyx = require('telnyx').default;
  return new Telnyx({ apiKey });
}

/**
 * Send an SMS message via Telnyx.
 * @param {string} to - E.164 phone number
 * @param {string} body - Message body
 * @param {object} [options] - Optional MMS settings
 * @param {string[]} [options.mediaUrls] - URLs of media to attach (turns SMS into MMS)
 * @returns {Promise<object>} Telnyx message data
 */
async function sendSMS(to, body, options = {}) {
  const creds = await getTelnyxCredentials();
  if (!creds || !creds.apiKey) {
    throw new Error('Telnyx credentials not available');
  }

  const client = getTelnyxClient(creds.apiKey);
  if (!client) {
    throw new Error('Telnyx client initialization failed');
  }

  const from = creds.phoneNumber;
  if (!from) {
    throw new Error('Telnyx phoneNumber not configured');
  }

  const payload = { from, to, text: body };
  if (options.mediaUrls && options.mediaUrls.length > 0) {
    payload.media_urls = options.mediaUrls;
    payload.type = 'MMS';
  } else {
    // Force plain SMS — let Telnyx auto-segment long messages.
    // MMS without media is filtered/blocked by major US carriers (AT&T verified
    // 4/27/26 — MMS messages show 'delivered' at Telnyx but never arrive on
    // device). Multi-segment SMS arrives reliably.
    payload.type = 'SMS';
  }

  const response = await client.messages.send(payload);

  const messageData = response.data;

  // Log outbound message — fire-and-forget. Logging is observability, not on the
  // critical path. Awaiting it added ~150ms to every NEXT round-trip.
  db.collection('daily_sms_log').add({
    uid: options.uid || null,
    direction: 'outbound',
    to,
    telnyxMessageId: messageData?.id || '',
    body: body.substring(0, 500), // Truncate for storage
    status: messageData?.to?.[0]?.status || 'queued',
    sentAt: admin.firestore.FieldValue.serverTimestamp(),
  }).catch(err => console.warn('[DailyCPA] sms_log write failed:', err.message));

  return messageData;
}

/**
 * Send SMS and associate with a user. Pre-tags the log with uid so we don't
 * need a follow-up query+update (was 2 extra round-trips per send).
 */
async function sendUserSMS(uid, phone, body, options = {}) {
  return sendSMS(phone, body, { ...options, uid });
}

// ============================================================================
// FUNNEL ANALYTICS
// ============================================================================

/**
 * Log a funnel/lifecycle event for conversion analysis.
 * Sparse by design — only call at transitions, not per-answer.
 * @param {string} uid - User id
 * @param {string} event - Event name (e.g. 'signup', 'first_answer', 'day_completed')
 * @param {object} [metadata] - Optional event metadata
 */
async function logFunnelEvent(uid, event, metadata = {}) {
  try {
    await db.collection('daily_funnel_events').add({
      uid,
      event,
      metadata,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
  } catch (err) {
    // Funnel logging is best-effort — never fail the user flow on it.
    console.error(`[DailyCPA] Funnel log failed (${event}):`, err.message);
  }
}

// ============================================================================
// TELNYX WEBHOOK SIGNATURE VERIFICATION
// ============================================================================

/**
 * Verify a Telnyx webhook signature using Ed25519.
 * Returns true if valid OR if no public key is configured (graceful dev mode).
 * Returns false only when a key IS configured and the signature is invalid.
 */
function verifyTelnyxSignature(req) {
  const publicKeyB64 = process.env.TELNYX_PUBLIC_KEY?.trim();
  const sigB64 = req.get('Telnyx-Signature-Ed25519');
  const timestamp = req.get('Telnyx-Timestamp');
  const rawBody = req.rawBody ? req.rawBody.toString('utf8') : JSON.stringify(req.body);

  // Always log a one-line diagnostic so we can debug rejections from Cloud Run logs.
  const diag = {
    hasKey: !!publicKeyB64,
    keyLen: publicKeyB64 ? publicKeyB64.length : 0,
    hasSig: !!sigB64,
    hasTs: !!timestamp,
    bodyLen: rawBody.length,
  };

  if (!publicKeyB64) {
    console.warn('[DailyCPA][sig] no key configured — accepting', diag);
    return true;
  }

  let rawKey;
  try { rawKey = Buffer.from(publicKeyB64, 'base64'); } catch { rawKey = Buffer.alloc(0); }
  if (rawKey.length !== 32) {
    console.warn(`[DailyCPA][sig] key not 32 bytes (got ${rawKey.length}) — accepting`, diag);
    return true;
  }

  if (!sigB64 || !timestamp) {
    console.warn('[DailyCPA][sig] missing headers', diag);
    return false;
  }

  const ageSec = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(ageSec) || ageSec > 300) {
    console.warn(`[DailyCPA][sig] timestamp out of range: ${ageSec}s`, diag);
    return false;
  }

  const message = Buffer.from(`${timestamp}|${rawBody}`, 'utf8');
  const signature = Buffer.from(sigB64, 'base64');

  const crypto = require('crypto');
  try {
    const spkiPrefix = Buffer.from('302a300506032b6570032100', 'hex');
    const pubKey = crypto.createPublicKey({
      key: Buffer.concat([spkiPrefix, rawKey]),
      format: 'der',
      type: 'spki',
    });
    const ok = crypto.verify(null, message, pubKey, signature);
    if (!ok) console.warn('[DailyCPA][sig] verify=false', { ...diag, sigLen: signature.length, ageSec: Math.round(ageSec) });
    return ok;
  } catch (e) {
    console.error('[DailyCPA][sig] verification threw:', e.message, diag);
    return false;
  }
}

// ============================================================================
// QUESTION LOADING
// ============================================================================

// In-memory cache for questions (per function instance)
const _questionCache = {};

/**
 * Load questions for a CPA section from disk.
 *
 * Question files are bundled into the Cloud Functions deploy via the
 * `scripts/sync-daily-cpa-content.cjs` predeploy hook, which copies
 * `content/cpa/{section}/questions.json` -> `functions/content-cpa/{section}/questions.json`.
 *
 * Sections (e.g. FAR ~3MB) exceed Firestore's 1MB doc limit, so we do not
 * cache the full payload in Firestore. In-memory cache survives for the
 * lifetime of the function instance, which is plenty for hot paths.
 *
 * @param {string} section - CPA section: 'FAR', 'AUD', etc.
 * @returns {Promise<Array>} Array of question objects
 */
async function loadQuestions(section) {
  const sectionUpper = section.toUpperCase();
  if (_questionCache[sectionUpper]) {
    return _questionCache[sectionUpper];
  }

  const fs = require('fs');
  const path = require('path');
  const sectionLower = sectionUpper.toLowerCase();

  // Search candidates in priority order:
  //   1. Bundled with the function (production deploy via predeploy hook)
  //   2. Repo `content/cpa/...` (emulator / local dev)
  const candidates = [
    path.join(__dirname, 'content-cpa', sectionLower, 'questions.json'),
    path.join(__dirname, '..', 'content', 'cpa', sectionLower, 'questions.json'),
  ];

  const filePath = candidates.find(p => fs.existsSync(p));
  if (!filePath) {
    throw new Error(`Question file not found for section ${sectionUpper}. Looked in: ${candidates.join(', ')}`);
  }

  const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const questions = (raw.questions || [])
    // Skip retired/broken questions so they never reach learners.
    .filter(q => q.status !== 'retired')
    .map(q => ({
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

  // Record a lightweight metadata doc (no question payload) for ops visibility.
  // Best-effort: don't fail loadQuestions if this write fails.
  try {
    await db.collection('daily_questions').doc(sectionUpper).set({
      section: sectionUpper,
      questionCount: questions.length,
      source: filePath.includes('content-cpa') ? 'bundled' : 'repo',
      loadedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  } catch (err) {
    console.warn(`[DailyCPA] Could not write daily_questions/${sectionUpper} metadata:`, err.message);
  }

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
    lines.push(`VoraPrep Daily CPA - ${section}`);
    lines.push(`Day ${trialDay} of ${TRIAL_DAYS} free trial`);
    lines.push('');
  } else {
    const streakEmoji = streakDays >= 3 ? ` (${streakDays}-day streak)` : '';
    lines.push(`VoraPrep Daily CPA - ${section}`);
    lines.push(`Q${questionNum}/${dailyCap}${streakEmoji}`);
    lines.push('');
  }

  // Topic
  lines.push(`Topic: ${question.topic}`);
  lines.push('');

  // Question text — full text. sendSMS auto-promotes to MMS for long messages
  // so carriers don't truncate. Only fall back to truncation as a hard safety net.
  const qText = question.question.length > 1200
    ? question.question.substring(0, 1197) + '...'
    : question.question;
  lines.push(qText);
  lines.push('');

  // Options
  const optionLabels = ['A', 'B', 'C', 'D'];
  question.options.forEach((opt, i) => {
    const optText = opt.length > 250 ? opt.substring(0, 247) + '...' : opt;
    lines.push(`${optionLabels[i]}) ${optText}`);
  });
  lines.push('');
  lines.push('Reply A, B, C, or D');

  return lines.join('\n');
}

/**
 * Format a correct answer response. Tight: answer letter + concise explanation + NEXT cue.
 */
function formatCorrectSMS(question, questionNum, dailyCap, isLastQuestion) {
  const optionLabels = ['A', 'B', 'C', 'D'];
  const correctLetter = optionLabels[question.correctAnswer];
  const lines = [];

  lines.push(`✅ Correct! Answer: ${correctLetter}`);
  lines.push('');

  // Allow longer explanations — sendSMS auto-promotes to MMS past 320 chars,
  // so multi-step REG/FAR math can land intact. 600 is a hard safety net only.
  const explanation = question.explanation.length > 600
    ? question.explanation.substring(0, 597) + '...'
    : question.explanation;
  lines.push(explanation);

  if (!isLastQuestion) {
    lines.push('');
    lines.push(`Reply NEXT for Q${questionNum + 1}/${dailyCap}`);
  }

  return lines.join('\n');
}

/**
 * Truncate long feedback at a sentence/word boundary so SMS copy does not end mid-thought.
 */
function truncateInsight(text, maxLen) {
  const normalized = String(text || '').replace(/\s+/g, ' ').trim();
  if (!normalized) return '';
  if (normalized.length <= maxLen) return normalized;

  const clipped = normalized.substring(0, maxLen - 3);
  const sentenceBreak = Math.max(
    clipped.lastIndexOf('. '),
    clipped.lastIndexOf('! '),
    clipped.lastIndexOf('? ')
  );
  if (sentenceBreak >= 80) {
    return clipped.substring(0, sentenceBreak + 1).trim();
  }

  const wordBreak = clipped.lastIndexOf(' ');
  if (wordBreak >= 80) {
    return clipped.substring(0, wordBreak).trim() + '...';
  }

  return clipped.trim() + '...';
}

/**
 * Basic quality check for targeted whyWrong snippets. If a snippet appears
 * internally contradictory (or mapped to the wrong option letter), fall back
 * to the general explanation instead of sending confusing feedback.
 */
function isReliableWhyWrong(text, optionIndex, correctAnswer) {
  if (!text || typeof text !== 'string') return false;

  const labels = ['A', 'B', 'C', 'D'];
  const expectedLetter = labels[optionIndex];
  const normalized = text.toLowerCase();

  // If the snippet starts with an option prefix, it must match the current key.
  const prefixed = text.match(/^\s*([A-D])\)/);
  if (prefixed && prefixed[1] !== expectedLetter) {
    return false;
  }

  const hasIncorrect = /\bincorrect\b|\bis wrong\b|\bwrong\b/.test(normalized);
  const hasCorrect = /\bcorrect\b|\bis correct\b/.test(normalized);
  const hasCorrectAnswerPhrase = /correct answer is/.test(normalized);

  // If user picked the correct answer, this path should not be used.
  if (optionIndex === correctAnswer) {
    return false;
  }

  // For wrong picks, avoid snippets that declare the chosen option correct.
  if (hasCorrect && !hasIncorrect) {
    return false;
  }

  // Strong contradiction pattern observed in live content.
  if (hasIncorrect && hasCorrectAnswerPhrase) {
    return false;
  }

  return true;
}

/**
 * Format an incorrect answer response. Tight: one targeted insight (whyWrong if available,
 * else the explanation) + NEXT cue. Avoids piling on.
 */
function formatIncorrectSMS(question, userAnswer, questionNum, dailyCap, isLastQuestion) {
  const optionLabels = ['A', 'B', 'C', 'D'];
  const correctLetter = optionLabels[question.correctAnswer];
  const userLetter = optionLabels[userAnswer];
  const lines = [];

  lines.push(`❌ Not quite. Correct: ${correctLetter} (you picked ${userLetter})`);
  lines.push('');

  // Prefer the targeted whyWrong for the user's specific answer; otherwise fall back
  // to the general explanation. Show ONE thing well rather than three things partially.
  const whyWrongKey = String(userAnswer);
  let insight = null;
  if (question.whyWrong && question.whyWrong[whyWrongKey]) {
    const rawWhyWrong = question.whyWrong[whyWrongKey];
    if (isReliableWhyWrong(rawWhyWrong, userAnswer, question.correctAnswer)) {
      insight = rawWhyWrong.replace(/^Why option [A-D] is (?:WRONG|CORRECT) [-–] /i, '');
    }
  }
  if (!insight) {
    insight = question.explanation;
  }
  insight = truncateInsight(insight, 420);
  lines.push(insight);

  if (!isLastQuestion) {
    lines.push('');
    lines.push(`Reply NEXT for Q${questionNum + 1}/${dailyCap}`);
  }

  return lines.join('\n');
}

/**
 * Format daily summary.
 */
function formatDailySummary(section, answered, correct, streak, weakTopics, strongTopics, resultPattern) {
  const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;
  const lines = [];

  lines.push(`📊 Daily CPA — ${section} Summary`);
  lines.push('');
  lines.push(`Today: ${correct}/${answered} correct (${accuracy}%)`);
  lines.push(`Streak: 🔥 ${streak} day${streak !== 1 ? 's' : ''}`);

  // Wordle-style grid — a copyable signal of "I did it today."
  if (resultPattern && resultPattern.length > 0) {
    lines.push('');
    lines.push(resultPattern);
  }

  if (strongTopics.length > 0) {
    lines.push(`Strong: ${strongTopics.slice(0, 3).join(', ')}`);
  }
  if (weakTopics.length > 0) {
    lines.push(`Review: ${weakTopics.slice(0, 3).join(', ')}`);
  }

  lines.push('');
  lines.push('See you tomorrow!');
  if (streak >= 2) {
    lines.push(`Share your streak: 🔥 ${streak}-day VoraPrep ${section} streak — voraprep.com/daily-cpa`);
  }

  return lines.join('\n');
}

/**
 * Format trial completion / conversion CTA.
 */
function formatTrialEndCTA(uid, section, totalAnswered, totalCorrect, streak, resultPattern) {
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const lines = [];

  lines.push(`📊 Trial Complete — ${section}`);
  lines.push('');
  lines.push(`3-day results: ${totalCorrect}/${totalAnswered} correct (${accuracy}%)`);
  lines.push(`Streak: 🔥 ${streak} day${streak !== 1 ? 's' : ''}`);
  if (resultPattern && resultPattern.length > 0) {
    lines.push('');
    lines.push(resultPattern);
  }
  lines.push('');
  lines.push('Your trial ends today. Keep your streak and progress:');
  lines.push('');
  lines.push('Starter (10/day): $4.99/mo');
  lines.push('Core (25/day): $9.99/mo');
  lines.push('Pro (50/day): $14.99/mo');
  lines.push('');
  // Embed uid so the upgrade page can skip the phone-lookup step entirely.
  lines.push(`Upgrade: https://voraprep.com/daily-cpa/upgrade?uid=${uid}&utm_source=daily_cpa_sms`);
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
 * @param {object} [preloadedUser] - Pass the user doc data if you already have it
 *   (the inbound handler does) to avoid a redundant Firestore read.
 */
async function sendNextQuestion(uid, session, sessionRef, preloadedUser = null) {
  const user = preloadedUser
    || (await db.collection('daily_users').doc(uid).get()).data();
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

  // Funnel: first answer ever — the activation event.
  if (!user.firstAnswerAt) {
    await db.collection('daily_users').doc(uid).update({
      firstAnswerAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    await logFunnelEvent(uid, 'first_answer', { section: user.section });
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
  }
  // Otherwise the user must reply NEXT to advance — gives them time to absorb
  // the explanation and turns each question into a deliberate engagement.
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
  // Sort attempts by time so the emoji grid reflects answer order, not Firestore order.
  const orderedAttempts = todayAttempts.docs
    .map(d => d.data())
    .sort((a, b) => {
      const ta = a.attemptedAt?.toMillis?.() || 0;
      const tb = b.attemptedAt?.toMillis?.() || 0;
      return ta - tb;
    });

  orderedAttempts.forEach(a => {
    if (!topicStats[a.topic]) {
      topicStats[a.topic] = { correct: 0, total: 0 };
    }
    topicStats[a.topic].total++;
    if (a.isCorrect) topicStats[a.topic].correct++;
  });

  // Build a Wordle-style result grid: 🟩 correct, ⬜ incorrect.
  // Cap at 50 to keep SMS under length limits even on the Pro tier.
  const resultPattern = orderedAttempts
    .slice(0, 50)
    .map(a => (a.isCorrect ? '🟩' : '⬜'))
    .join('');

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

    const ctaBody = formatTrialEndCTA(uid, session.section, totalAnswered, totalCorrect, streak, resultPattern);
    await sendUserSMS(uid, user.phone, ctaBody);
  } else {
    // Send daily summary
    const summaryBody = formatDailySummary(
      session.section,
      session.questionsAnswered,
      session.questionsCorrect,
      streak,
      weakTopics,
      strongTopics,
      resultPattern
    );
    await sendUserSMS(uid, user.phone, summaryBody);
  }

  await sessionRef.update({
    state: 'completed',
    completedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // After Day 1 only: send the contact card so tomorrow's text shows up as "VoraPrep"
  // instead of an unrecognized number. Day 1 = first completed session for this user.
  // We send after the summary (not at signup) to keep the welcome flow lightweight.
  if (isTrial && trialDay === 1) {
    try {
      const vcardUrl = process.env.DAILY_CPA_VCARD_URL?.trim()
        || 'https://us-central1-passcpa-dev.cloudfunctions.net/dailyCpa_vcard';
      await sendUserSMS(uid, user.phone,
        'Nice work today! Save this contact so tomorrow\'s question shows up as VoraPrep 👇',
        { mediaUrls: [vcardUrl] }
      );
    } catch (vcardErr) {
      console.error(`[DailyCPA] Day-1 vCard send failed for ${uid}:`, vcardErr.message);
    }
  }

  // Funnel: day completed (one of the most predictive engagement signals).
  await logFunnelEvent(uid, 'day_completed', {
    section: session.section,
    answered: session.questionsAnswered,
    correct: session.questionsCorrect,
    isTrial,
    trialDay: isTrial ? trialDay : null,
    streak,
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
 * Parse a user-supplied time string into 24h "HH:MM".
 * Accepts "9", "9am", "9:30 AM", "14:30", "2:15 pm", etc.
 * Returns null if invalid.
 */
function parseSendTime(input) {
  if (!input) return null;
  const s = String(input).trim().toLowerCase().replace(/\./g, '');
  // Match: optional hour, optional :MM, optional am/pm
  const m = s.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/);
  if (!m) return null;
  let h = parseInt(m[1], 10);
  const min = m[2] ? parseInt(m[2], 10) : 0;
  const mer = m[3];
  if (Number.isNaN(h) || min < 0 || min > 59) return null;
  if (mer === 'am') {
    if (h < 1 || h > 12) return null;
    if (h === 12) h = 0;
  } else if (mer === 'pm') {
    if (h < 1 || h > 12) return null;
    if (h !== 12) h += 12;
  } else {
    // 24h
    if (h < 0 || h > 23) return null;
  }
  return `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
}

/**
 * Format "HH:MM" 24h time as user-friendly "h:MM AM/PM".
 */
function formatTimeForDisplay(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const mer = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${mer}`;
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

      // NOTE: penultimate-day CTA intentionally NOT sent here — it's delivered
      // post-session via formatTrialEndCTA in completeSession() when trialDay >= TRIAL_DAYS.
      // Catching the user at peak engagement (right after they finish) converts better
      // than nagging them before they've even started today's questions.

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
        await logFunnelEvent(uid, 'trial_ended_converted', { section: user.section, tier: user.tier });
        console.log(`[DailyCPA] Trial converted to paid: ${uid}`);
      } else {
        // No payment — pause
        await userDoc.ref.update({ status: 'paused' });
        await sendUserSMS(uid, user.phone,
          `Your VoraPrep Daily CPA trial has ended.\n\nUpgrade to continue your ${user.section} practice:\nhttps://voraprep.com/daily-cpa/upgrade\n\nYour progress is saved.`
        );
        pausedCount++;
        await logFunnelEvent(uid, 'trial_ended_paused', { section: user.section });
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
  secrets: ['TELNYX_API_KEY', 'TELNYX_PHONE_NUMBER', 'TELNYX_PUBLIC_KEY'],
  memory: '512MiB',
  timeoutSeconds: 60,
  // Keep one warm instance so NEXT/answer round-trips don't pay cold-start cost
  // (~2-5s on Node 22). Costs ~$5/mo at idle but is the single biggest perceived
  // latency win for SMS users.
  minInstances: 1,
}, async (req, res) => {
  console.log('[DailyCPA][inbound] hit', {
    method: req.method,
    ua: req.get('user-agent'),
    contentType: req.get('content-type'),
    bodyLen: req.rawBody ? req.rawBody.length : 0,
  });
  if (req.method !== 'POST') {
    res.status(405).send('Method not allowed');
    return;
  }

  // Verify the request came from Telnyx (Ed25519). On verification failure we
  // LOG and CONTINUE rather than 401 — the action surface is tiny (single-letter
  // replies from a registered phone number) so the spoofing risk is minimal,
  // while a silent 401 leaves real users stuck mid-session with no Firestore
  // breadcrumb. We must NEVER block a real user's reply because of an infra hiccup.
  const sigOk = verifyTelnyxSignature(req);
  if (!sigOk) {
    console.warn('[DailyCPA] Inbound: bad/missing Telnyx signature — processing anyway (degraded mode)');
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

    // Log inbound message — fire-and-forget. Pure observability; blocking the
    // user's NEXT on this added ~150ms with no functional benefit.
    db.collection('daily_sms_log').add({
      direction: 'inbound',
      from: From,
      telnyxMessageId: MessageId || '',
      body: Body.substring(0, 500),
      status: 'received',
      sentAt: admin.firestore.FieldValue.serverTimestamp(),
    }).catch(err => console.warn('[DailyCPA] inbound log write failed:', err.message));

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

    // Multi-word commands (e.g. "TIME 9:00 AM"). Handle before the single-token switch.
    if (reply.startsWith('TIME')) {
      const arg = Body.trim().slice(4).trim(); // preserve original case for am/pm
      const parsed = parseSendTime(arg);
      if (!parsed) {
        await sendUserSMS(uid, user.phone,
          'To change your daily question time, reply: TIME 9:00 AM (or TIME 14:30 for 24h). Examples: TIME 7am, TIME 9:30 AM, TIME 18:00.'
        );
        res.status(200).json({});
        return;
      }
      await userDoc.ref.update({ sendTime: parsed });
      const display = formatTimeForDisplay(parsed);
      await sendUserSMS(uid, user.phone,
        `✅ Daily question time updated to ${display} (${user.timezone}). Takes effect tomorrow.`
      );
      res.status(200).json({});
      return;
    }

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
      case 'NEXT':
      case 'N': {
        const today = getTodayString(user.timezone);
        const sessionId = `${uid}_${today}`;
        const sessionRef = db.collection('daily_sessions').doc(sessionId);
        const sessionDoc = await sessionRef.get();

        if (!sessionDoc.exists) {
          await sendUserSMS(uid, user.phone,
            'No active session. Your next questions arrive at your scheduled time.'
          );
          break;
        }
        const session = sessionDoc.data();
        if (session.state === 'waiting_answer') {
          await sendUserSMS(uid, user.phone,
            'Answer the current question first — reply A, B, C, or D.'
          );
          break;
        }
        if (session.state === 'completed') {
          await sendUserSMS(uid, user.phone,
            "You're done for today! Great work — see you tomorrow. 🎯"
          );
          break;
        }
        if (session.state === 'paused') {
          await sendUserSMS(uid, user.phone,
            'Session is paused. Reply RESUME to continue.'
          );
          break;
        }
        if (session.questionsAnswered >= session.dailyCap) {
          await completeSession(uid, session, sessionRef);
          break;
        }
        await sendNextQuestion(uid, session, sessionRef, user);
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
          'VoraPrep Daily CPA\n- Reply A/B/C/D to answer\n- NEXT for the next question\n- RESUME to continue a paused session\n- DONE to end today\'s session\n- TIME 9:00 AM to change daily start time\n- STOP to unsubscribe\n\nQuestions? support@voraprep.com'
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
          'Reply A, B, C, or D to answer — or NEXT for the next question.\n\nOther: DONE to wrap up, RESUME to continue, HELP for options.'
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

  // Funnel: signup is the top of the funnel.
  await logFunnelEvent(uid, 'signup', {
    section: sectionUpper,
    tier: validTier,
    timezone: userTz,
    utm_source: request.data.utm_source || null,
  });

  // Decide whether to send Q1 immediately or defer to morningKickoff.
  // Skip immediate send during quiet hours — let the user wake up to it.
  const sendImmediately = !isQuietHours(userTz);

  // Send welcome SMS (non-blocking — user is created even if SMS fails)
  try {
    const welcomeBody = sendImmediately
      ? `Welcome to VoraPrep Daily CPA - ${sectionUpper}!\n\n${TRIAL_DAYS}-day free trial, ${TIER_CONFIG.trial.dailyCap} questions/day.\n\nYour first question is on its way. Reply A/B/C/D to answer, NEXT to advance, HELP for options, STOP to unsubscribe.`
      : `Welcome to VoraPrep Daily CPA - ${sectionUpper}!\n\nYou have a ${TRIAL_DAYS}-day free trial with ${TIER_CONFIG.trial.dailyCap} questions/day.\n\nYour first questions arrive at ${sendTime || '7:00 AM'} (${userTz}).\n\nReply HELP anytime for options.\nReply STOP to unsubscribe.`;
    await sendUserSMS(uid, phone, welcomeBody);
  } catch (smsErr) {
    console.error(`[DailyCPA] Welcome SMS failed for ${uid}:`, smsErr.message);
    // Don't throw — user is created, they'll get questions tomorrow via morningKickoff
  }

  // NOTE: vCard contact card is sent after Day 1 completion (see completeSession),
  // not at signup — keeps the welcome flow to two messages (welcome + Q1) instead of four.

  // Kick off the first session immediately if outside quiet hours.
  if (sendImmediately) {
    try {
      const today = getTodayString(userTz);
      const { ref, data } = await getOrCreateSession(
        uid,
        today,
        sectionUpper,
        TIER_CONFIG.trial.dailyCap
      );
      await sendNextQuestion(uid, data, ref);
    } catch (kickErr) {
      console.error(`[DailyCPA] Immediate Q1 failed for ${uid}:`, kickErr.message, kickErr.stack);
      // Non-fatal — morningKickoff will catch them tomorrow.
      // Surface to funnel so we can detect repeated failures.
      logFunnelEvent(uid, 'immediate_q1_failed', { error: kickErr.message }).catch(() => {});
    }
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
 * Look up a Daily CPA user's uid by phone number.
 *
 * Used by the upgrade page when the SMS link arrives without `?uid=...`
 * (e.g. user typed the URL manually). Returns 404 for unknown numbers
 * \u2014 we deliberately do NOT differentiate "not signed up" from any other
 * miss to avoid leaking which numbers are subscribers.
 *
 * Privacy note: returning a uid for a known phone is acceptable here because
 * the uid alone unlocks no PII \u2014 createCheckout still validates the user
 * and Stripe Checkout handles payment auth.
 */
exports.dailyCpa_lookupUid = onCall({
  cors: true,
  invoker: 'public',
  enforceAppCheck: false,
  memory: '256MiB',
}, async (request) => {
  const raw = String(request.data?.phone || '').trim();
  if (!raw) {
    throw new HttpsError('invalid-argument', 'Missing phone');
  }

  // Normalize to E.164 (US default)
  const digits = raw.replace(/\D/g, '');
  let e164;
  if (raw.startsWith('+')) {
    e164 = '+' + digits;
  } else if (digits.length === 10) {
    e164 = '+1' + digits;
  } else if (digits.length === 11 && digits.startsWith('1')) {
    e164 = '+' + digits;
  } else {
    throw new HttpsError('invalid-argument', 'Invalid phone format');
  }

  const snap = await db.collection('daily_users')
    .where('phone', '==', e164)
    .limit(1)
    .get();

  if (snap.empty) {
    throw new HttpsError('not-found', 'No account found for that number.');
  }

  const userDoc = snap.docs[0];
  const user = userDoc.data();
  return {
    uid: userDoc.id,
    section: user.section,
    status: user.status,
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

  const baseUrl = origin || 'https://voraprep.com';

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${baseUrl}/daily-cpa/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/daily-cpa/upgrade`,
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
  secrets: ['STRIPE_SECRET_KEY', 'DAILY_CPA_STRIPE_WEBHOOK_SECRET', 'STRIPE_WEBHOOK_SECRET'],
  memory: '256MiB',
}, async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method not allowed');
    return;
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY?.trim();
  // Prefer Daily-CPA-specific webhook secret; fall back to shared STRIPE_WEBHOOK_SECRET for backward compat
  const webhookSecret = process.env.DAILY_CPA_STRIPE_WEBHOOK_SECRET?.trim() || process.env.STRIPE_WEBHOOK_SECRET?.trim();
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
      case 'checkout.session.completed': {
        const session = event.data.object;
        const metadata = session.metadata || {};
        if (metadata.product !== 'daily_cpa') break;

        const uid = metadata.dailyCpaUserId;
        if (!uid) break;

        // Retrieve the subscription to get tier from its metadata
        let tier = 'starter';
        let subscriptionId = session.subscription;
        let subStatus = 'active';
        if (subscriptionId) {
          try {
            const sub = await stripe.subscriptions.retrieve(subscriptionId);
            tier = sub.metadata?.tier || 'starter';
            subStatus = sub.status === 'active' ? 'active' : sub.status;
          } catch (e) {
            console.error('[DailyCPA] Failed to retrieve subscription:', e.message);
          }
        }

        await db.collection('daily_users').doc(uid).update({
          status: subStatus,
          stripeSubscriptionId: subscriptionId,
          stripeCustomerId: session.customer,
          dailyCap: (TIER_CONFIG[tier] || TIER_CONFIG.starter).dailyCap,
          tier,
        });

        console.log(`[DailyCPA] Checkout completed for user ${uid}, tier=${tier}`);
        break;
      }

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

/**
 * vCard endpoint — Serves a contact card so users can save "VoraPrep" with the
 * sending phone number on their device. Used as the media attachment in the
 * post-signup MMS. Public by design.
 */
exports.dailyCpa_vcard = onRequest({
  cors: false,
  invoker: 'public',
  secrets: ['TELNYX_PHONE_NUMBER'],
  memory: '128MiB',
  timeoutSeconds: 10,
}, async (req, res) => {
  const phone = process.env.TELNYX_PHONE_NUMBER?.trim() || '+14348370040';
  // CRLF line endings are required by RFC 2426 for maximum carrier compatibility.
  const vcf = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'FN:VoraPrep',
    'N:VoraPrep;;;;',
    'ORG:VoraPrep',
    'TITLE:Daily CPA Coach',
    `TEL;TYPE=CELL,VOICE:${phone}`,
    'EMAIL;TYPE=INTERNET:support@voraprep.com',
    'URL:https://voraprep.com',
    'NOTE:Reply A/B/C/D to answer · NEXT to advance · HELP for options',
    'END:VCARD',
    '',
  ].join('\r\n');

  res.set('Content-Type', 'text/vcard; charset=utf-8');
  res.set('Content-Disposition', 'attachment; filename="voraprep.vcf"');
  res.set('Cache-Control', 'public, max-age=3600');
  res.status(200).send(vcf);
});

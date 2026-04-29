#!/usr/bin/env node
/**
 * One-shot recovery: record Rob's "D" answer to reg-wc-035 (which is wrong;
 * correct=C), advance his Daily CPA session to 'active', send the explanation
 * SMS via Telnyx so he can reply NEXT for Q2.
 *
 * Why: Q1 went out at 09:46 ET 2026-04-28 but his "D" reply never reached
 * dailyCpa_smsInbound (zero inbound logs today). Webhook is alive + signature-
 * gating returns 401 for bad signatures, so likely the legit Telnyx delivery
 * is being rejected. Investigate separately; this script unblocks the user.
 *
 * Usage: node scripts/manual-answer-rob.cjs [--dry]
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

admin.initializeApp({
  credential: admin.credential.cert(require('../serviceAccountKey.prod.json')),
});
const db = admin.firestore();

const UID = 'v3dnBDW5GjfxVGF3xzLi';
const PHONE = '+17036238835';
const QUESTION_ID = 'reg-wc-035';
const USER_ANSWER = 3; // D
const SESSION_DATE = '2026-04-28';
const DRY = process.argv.includes('--dry');

function formatIncorrectSMS(question, userAnswer, questionNum, dailyCap, isLastQuestion) {
  const labels = ['A', 'B', 'C', 'D'];
  const correctLetter = labels[question.correctAnswer];
  const userLetter = labels[userAnswer];
  const lines = [];
  lines.push(`❌ Not quite. Correct: ${correctLetter} (you picked ${userLetter})`);
  lines.push('');
  let insight = null;
  if (question.whyWrong && question.whyWrong[String(userAnswer)]) {
    insight = question.whyWrong[String(userAnswer)].replace(/^Why option [A-D] is (?:WRONG|CORRECT) [-–] /i, '');
  }
  if (!insight) insight = question.explanation;
  if (insight && insight.length > 240) insight = insight.substring(0, 237) + '...';
  lines.push(insight);
  if (!isLastQuestion) {
    lines.push('');
    lines.push(`Reply NEXT for Q${questionNum + 1}/${dailyCap}`);
  }
  return lines.join('\n');
}

async function loadQuestion() {
  const file = path.join(__dirname, '..', 'content', 'cpa', 'reg', 'questions.json');
  const all = JSON.parse(fs.readFileSync(file, 'utf8'));
  const list = Array.isArray(all) ? all : all.questions;
  const q = list.find(x => x.id === QUESTION_ID);
  if (!q) throw new Error(`Question not found: ${QUESTION_ID}`);
  return q;
}

async function getTelnyxCreds() {
  const doc = await db.collection('system_config').doc('telnyx').get();
  if (!doc.exists) throw new Error('system_config/telnyx not found');
  return doc.data();
}

async function sendSMS(to, body) {
  const creds = await getTelnyxCreds();
  const res = await fetch('https://api.telnyx.com/v2/messages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${creds.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: creds.phoneNumber, to, text: body, type: 'SMS' }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Telnyx ${res.status}: ${txt}`);
  }
  return res.json();
}

(async () => {
  const sessionRef = db.collection('daily_sessions').doc(`${UID}_${SESSION_DATE}`);
  const sessionDoc = await sessionRef.get();
  if (!sessionDoc.exists) throw new Error('Session not found');
  const session = sessionDoc.data();
  console.log('Session before:', {
    state: session.state,
    answered: session.questionsAnswered,
    currentQuestionId: session.currentQuestionId,
  });

  if (session.currentQuestionId !== QUESTION_ID) {
    console.warn(`WARN: currentQuestionId is ${session.currentQuestionId}, not ${QUESTION_ID}. Aborting.`);
    process.exit(1);
  }

  const question = await loadQuestion();
  const isCorrect = USER_ANSWER === question.correctAnswer;
  console.log(`Answer: ${['A','B','C','D'][USER_ANSWER]}, correct: ${['A','B','C','D'][question.correctAnswer]}, isCorrect=${isCorrect}`);

  const questionNum = session.currentQuestionNum || 1;
  const isLastQuestion = questionNum >= session.dailyCap;
  const body = isCorrect
    ? `✅ Correct! ${question.explanation}`
    : formatIncorrectSMS(question, USER_ANSWER, questionNum, session.dailyCap, isLastQuestion);

  console.log('\n--- SMS to send ---');
  console.log(body);
  console.log('--- end ---\n');

  if (DRY) {
    console.log('DRY RUN — no writes, no SMS.');
    return;
  }

  // Record attempt
  await db.collection('daily_attempts').add({
    uid: UID,
    questionId: question.id,
    section: session.section,
    blueprintArea: question.blueprintArea || null,
    topic: question.topic || null,
    difficulty: question.difficulty || null,
    userAnswer: USER_ANSWER,
    correctAnswer: question.correctAnswer,
    isCorrect,
    responseTimeSec: null,
    attemptedAt: admin.firestore.FieldValue.serverTimestamp(),
    sessionDate: SESSION_DATE,
    manualRecovery: true,
  });

  // Advance session
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

  // Send SMS
  const result = await sendSMS(PHONE, body);
  console.log('Telnyx send OK, message id:', result?.data?.id);

  // Log outbound
  await db.collection('daily_sms_log').add({
    uid: UID,
    direction: 'outbound',
    to: PHONE,
    telnyxMessageId: result?.data?.id || '',
    body: body.substring(0, 500),
    status: result?.data?.to?.[0]?.status || 'queued',
    sentAt: admin.firestore.FieldValue.serverTimestamp(),
    manualRecovery: true,
  });

  const after = (await sessionRef.get()).data();
  console.log('Session after:', {
    state: after.state,
    answered: after.questionsAnswered,
    correct: after.questionsCorrect,
  });
})().catch(e => { console.error('ERROR:', e); process.exit(1); });

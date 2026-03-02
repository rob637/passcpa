#!/usr/bin/env node
/**
 * CPA FAR Question Review Script
 * Uses Gemini AI to review every FAR question for correctness.
 * 
 * Usage:
 *   node scripts/review-far-questions.cjs
 *   node scripts/review-far-questions.cjs --resume    # Resume from last checkpoint
 */
const fs = require('fs');
const path = require('path');

const API_KEY = 'AIzaSyBAbCsONlqp9EhfJ3rFiOJxQ0thNHuajbE';
const MODEL = 'gemini-2.0-flash';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

const BATCH_SIZE = 10;  // Questions per API call
const CHECKPOINT_FILE = 'scripts/far-review-checkpoint.json';
const RESULTS_FILE = 'scripts/far-review-results.json';
const RESUME = process.argv.includes('--resume');

// Rate limiting
const DELAY_MS = 1500; // Between batches

async function main() {
  const data = JSON.parse(fs.readFileSync('content/cpa/far/questions.json', 'utf8'));
  const allQuestions = data.questions;
  console.log(`Total FAR questions: ${allQuestions.length}`);

  // Load checkpoint if resuming
  let results = [];
  let startIdx = 0;
  if (RESUME && fs.existsSync(CHECKPOINT_FILE)) {
    const checkpoint = JSON.parse(fs.readFileSync(CHECKPOINT_FILE, 'utf8'));
    results = checkpoint.results || [];
    startIdx = checkpoint.nextIndex || 0;
    console.log(`Resuming from question ${startIdx} (${results.length} already reviewed)`);
  }

  const totalBatches = Math.ceil((allQuestions.length - startIdx) / BATCH_SIZE);
  let batchNum = 0;

  for (let i = startIdx; i < allQuestions.length; i += BATCH_SIZE) {
    batchNum++;
    const batch = allQuestions.slice(i, i + BATCH_SIZE);
    const pct = ((i + batch.length) / allQuestions.length * 100).toFixed(1);
    process.stdout.write(`\rBatch ${batchNum}/${totalBatches} (${i + batch.length}/${allQuestions.length} = ${pct}%)  `);

    try {
      const batchResults = await reviewBatch(batch);
      results.push(...batchResults);

      // Save checkpoint every batch
      fs.writeFileSync(CHECKPOINT_FILE, JSON.stringify({
        nextIndex: i + BATCH_SIZE,
        results,
        timestamp: new Date().toISOString(),
      }, null, 2));
    } catch (err) {
      console.error(`\nError at batch starting at index ${i}: ${err.message}`);
      // Save checkpoint and continue
      fs.writeFileSync(CHECKPOINT_FILE, JSON.stringify({
        nextIndex: i,
        results,
        timestamp: new Date().toISOString(),
        lastError: err.message,
      }, null, 2));
      
      // Wait longer and retry once
      console.log('  Waiting 10s and retrying...');
      await sleep(10000);
      try {
        const batchResults = await reviewBatch(batch);
        results.push(...batchResults);
        fs.writeFileSync(CHECKPOINT_FILE, JSON.stringify({
          nextIndex: i + BATCH_SIZE,
          results,
          timestamp: new Date().toISOString(),
        }, null, 2));
      } catch (err2) {
        console.error(`  Retry failed: ${err2.message}. Skipping batch.`);
        for (const q of batch) {
          results.push({ id: q.id, verdict: 'ERROR', reason: err2.message });
        }
        fs.writeFileSync(CHECKPOINT_FILE, JSON.stringify({
          nextIndex: i + BATCH_SIZE,
          results,
          timestamp: new Date().toISOString(),
        }, null, 2));
      }
    }

    await sleep(DELAY_MS);
  }

  // Save final results
  fs.writeFileSync(RESULTS_FILE, JSON.stringify(results, null, 2));
  console.log(`\n\nResults saved to ${RESULTS_FILE}`);

  // Generate summary
  generateReport(results, allQuestions);
}

async function reviewBatch(questions) {
  const questionsText = questions.map((q, idx) => {
    const options = q.options.map((opt, oi) => `  ${String.fromCharCode(65 + oi)}) ${opt}`).join('\n');
    const marked = String.fromCharCode(65 + q.correctAnswer);
    return `QUESTION [ID=${q.id}]:
Topic: ${q.topic || 'N/A'} | Blueprint: ${q.blueprintArea || 'N/A'} | Difficulty: ${q.difficulty || 'N/A'}
${q.question}

${options}

Marked correct: ${marked}
Explanation: ${q.explanation || 'None provided'}`;
  }).join('\n\n---\n\n');

  // Build example line using first question's actual ID
  const exampleId = questions[0].id;

  const prompt = `You are an expert CPA exam reviewer specializing in Financial Accounting and Reporting (FAR). Review each question below and determine if the marked correct answer is actually correct based on current US GAAP, GASB, or IFRS standards.

IMPORTANT: Respond with EXACTLY one line per question. Use the ACTUAL question ID from [ID=...] in each line. Format:

${exampleId} | CORRECT | optional note
${exampleId} | WRONG | The correct answer should be X because reason
${exampleId} | QUESTIONABLE | reason

Rules:
- Use the exact ID shown after ID= for each question (e.g., ${exampleId})
- Only mark WRONG if you are confident the marked answer is definitively incorrect
- Mark QUESTIONABLE if ambiguous, multiple defensible answers, or explanation contradicts the answer
- One line per question, no extra text

${questionsText}`;

  const response = await callGemini(prompt);
  return parseResponse(response, questions);
}

async function callGemini(prompt) {
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.1,
      maxOutputTokens: 4096,
    },
  };

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${errText.substring(0, 200)}`);
  }

  const json = await res.json();
  if (!json.candidates || !json.candidates[0]) {
    throw new Error('No candidates in Gemini response');
  }
  return json.candidates[0].content.parts[0].text;
}

function parseResponse(text, questions) {
  const results = [];
  const lines = text.split('\n').filter(l => l.trim() && l.includes('|'));

  // Try ID-based matching first
  const idMatched = new Set();
  for (const q of questions) {
    const line = lines.find(l => l.includes(q.id));
    if (line) {
      idMatched.add(q.id);
    }
  }

  // If less than half matched by ID, use positional matching
  const usePositional = idMatched.size < questions.length / 2;

  for (let qi = 0; qi < questions.length; qi++) {
    const q = questions[qi];
    let line;
    if (usePositional) {
      line = lines[qi]; // Match by position
    } else {
      line = lines.find(l => l.includes(q.id));
    }

    if (!line) {
      results.push({ id: q.id, verdict: 'UNPARSED', reason: 'No matching line in AI response' });
      continue;
    }

    const parts = line.split('|').map(p => p.trim());
    if (parts.length >= 2) {
      const verdict = parts[1].toUpperCase().trim();
      const reason = parts.slice(2).join('|').trim() || '';
      
      if (verdict.includes('CORRECT') && !verdict.includes('WRONG')) {
        results.push({ id: q.id, verdict: 'CORRECT', reason });
      } else if (verdict.includes('WRONG')) {
        results.push({ id: q.id, verdict: 'WRONG', reason, question: q.question.substring(0, 100), markedAnswer: q.correctAnswer, options: q.options });
      } else if (verdict.includes('QUESTIONABLE')) {
        results.push({ id: q.id, verdict: 'QUESTIONABLE', reason, question: q.question.substring(0, 100), markedAnswer: q.correctAnswer, options: q.options });
      } else {
        results.push({ id: q.id, verdict: verdict, reason });
      }
    } else {
      results.push({ id: q.id, verdict: 'UNPARSED', reason: line.substring(0, 200) });
    }
  }

  return results;
}

function generateReport(results, allQuestions) {
  const correct = results.filter(r => r.verdict === 'CORRECT');
  const wrong = results.filter(r => r.verdict === 'WRONG');
  const questionable = results.filter(r => r.verdict === 'QUESTIONABLE');
  const errors = results.filter(r => r.verdict === 'ERROR' || r.verdict === 'UNPARSED');

  console.log('\n' + '='.repeat(60));
  console.log('CPA FAR QUESTION REVIEW REPORT');
  console.log('='.repeat(60));
  console.log(`Date: ${new Date().toISOString().split('T')[0]}`);
  console.log(`Total questions reviewed: ${results.length} / ${allQuestions.length}`);
  console.log('');
  console.log(`  ✅ CORRECT:       ${correct.length} (${(correct.length/results.length*100).toFixed(1)}%)`);
  console.log(`  ❌ WRONG:         ${wrong.length} (${(wrong.length/results.length*100).toFixed(1)}%)`);
  console.log(`  ⚠️  QUESTIONABLE:  ${questionable.length} (${(questionable.length/results.length*100).toFixed(1)}%)`);
  console.log(`  🔧 ERRORS:        ${errors.length}`);

  if (wrong.length > 0) {
    console.log('\n' + '-'.repeat(60));
    console.log('WRONG ANSWERS:');
    console.log('-'.repeat(60));
    for (const r of wrong) {
      const q = allQuestions.find(x => x.id === r.id);
      const markedLetter = String.fromCharCode(65 + (q ? q.correctAnswer : r.markedAnswer));
      console.log(`\n  ${r.id} [Marked: ${markedLetter}]`);
      console.log(`  Q: ${r.question || ''}...`);
      if (r.options) {
        r.options.forEach((opt, i) => {
          const letter = String.fromCharCode(65 + i);
          const marker = i === (q ? q.correctAnswer : r.markedAnswer) ? ' ← marked' : '';
          console.log(`    ${letter}) ${opt.substring(0, 80)}${marker}`);
        });
      }
      console.log(`  Issue: ${r.reason}`);
    }
  }

  if (questionable.length > 0) {
    console.log('\n' + '-'.repeat(60));
    console.log('QUESTIONABLE:');
    console.log('-'.repeat(60));
    for (const r of questionable) {
      const q = allQuestions.find(x => x.id === r.id);
      const markedLetter = String.fromCharCode(65 + (q ? q.correctAnswer : r.markedAnswer));
      console.log(`\n  ${r.id} [Marked: ${markedLetter}]`);
      console.log(`  Q: ${(r.question || '').substring(0, 120)}...`);
      console.log(`  Issue: ${r.reason}`);
    }
  }

  // By blueprint area
  console.log('\n' + '-'.repeat(60));
  console.log('BY BLUEPRINT AREA:');
  console.log('-'.repeat(60));
  const byArea = {};
  for (const r of results) {
    const q = allQuestions.find(x => x.id === r.id);
    const area = q ? (q.blueprintArea || 'Unknown') : 'Unknown';
    if (!byArea[area]) byArea[area] = { total: 0, correct: 0, wrong: 0, questionable: 0 };
    byArea[area].total++;
    if (r.verdict === 'CORRECT') byArea[area].correct++;
    if (r.verdict === 'WRONG') byArea[area].wrong++;
    if (r.verdict === 'QUESTIONABLE') byArea[area].questionable++;
  }
  for (const [area, stats] of Object.entries(byArea).sort()) {
    const accuracy = (stats.correct / stats.total * 100).toFixed(1);
    console.log(`  ${area.padEnd(10)} ${String(stats.total).padStart(4)} questions | ${accuracy}% correct | ${stats.wrong} wrong | ${stats.questionable} questionable`);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

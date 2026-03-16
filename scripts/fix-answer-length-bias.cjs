#!/usr/bin/env node
/**
 * Fix Answer Length Bias
 * 
 * Problem: AI-generated questions have a strong bias where correct answers
 * are longer/more detailed than wrong answers (68.6% vs expected 25%).
 * 
 * Solution: Use Gemini to expand wrong answer options to match the length
 * and detail level of correct answers, while preserving their incorrectness.
 * Also update whyWrong explanations to match expanded options.
 * 
 * Usage:
 *   node scripts/fix-answer-length-bias.cjs [--course=cisa] [--limit=100] [--dry-run]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const RATE_LIMIT_MS = 200; // 5 requests per second max
const BATCH_SIZE = 5;

// Parse arguments
const args = process.argv.slice(2);
const courseFilter = args.find(a => a.startsWith('--course='))?.split('=')[1];
const limitArg = args.find(a => a.startsWith('--limit='))?.split('=')[1];
const LIMIT = limitArg ? parseInt(limitArg) : Infinity;
const DRY_RUN = args.includes('--dry-run');
const RESUME = args.includes('--resume');

// Progress tracking
const PROGRESS_FILE = '/tmp/length-bias-progress.json';
let progress = { processed: 0, fixed: 0, errors: 0, skipped: 0, byFile: {} };

if (RESUME && fs.existsSync(PROGRESS_FILE)) {
  progress = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
  console.log(`Resuming from checkpoint: ${progress.processed} processed, ${progress.fixed} fixed`);
}

function saveProgress() {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

// Sleep helper
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// Call Gemini API
async function callGemini(prompt, retries = 3) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          }
        })
      });

      if (response.status === 429) {
        console.log('  Rate limited, waiting 30s...');
        await sleep(30000);
        continue;
      }

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
    } catch (error) {
      if (attempt < retries - 1) {
        await sleep(2000 * (attempt + 1));
      } else {
        throw error;
      }
    }
  }
  return null;
}

// Check if question has length bias (correct answer is longest)
function hasLengthBias(question) {
  if (!question.options || question.options.length !== 4) return false;
  if (typeof question.correctAnswer !== 'number') return false;
  
  const lengths = question.options.map((o, i) => ({ 
    len: String(o || '').length, 
    idx: i 
  }));
  
  const longest = lengths.reduce((a, b) => a.len > b.len ? a : b);
  const correctLen = lengths[question.correctAnswer].len;
  
  // Bias exists if correct answer is the longest and significantly longer than average of wrong answers
  if (longest.idx !== question.correctAnswer) return false;
  
  const wrongLengths = lengths.filter((_, i) => i !== question.correctAnswer).map(l => l.len);
  const avgWrongLen = wrongLengths.reduce((a, b) => a + b, 0) / wrongLengths.length;
  
  // Only fix if correct answer is >30% longer than average wrong answer
  return correctLen > avgWrongLen * 1.3;
}

// Build prompt for expanding wrong answers
function buildPrompt(question) {
  const correctIdx = question.correctAnswer;
  const correctAnswer = question.options[correctIdx];
  const correctLen = correctAnswer.length;
  
  const wrongOptions = question.options
    .map((opt, i) => ({ opt, i, isWrong: i !== correctIdx }))
    .filter(o => o.isWrong);
  
  return `You are improving MCQ answer options for a professional certification exam (${question.courseId?.toUpperCase() || 'CPA'}).

PROBLEM: The correct answer is noticeably longer than the wrong answers, creating a test-taking bias.

QUESTION: ${question.question}

CORRECT ANSWER (Option ${String.fromCharCode(65 + correctIdx)}): ${correctAnswer}
(Length: ${correctLen} chars)

WRONG ANSWERS TO EXPAND:
${wrongOptions.map(w => `Option ${String.fromCharCode(65 + w.i)}: "${w.opt}" (${w.opt.length} chars)`).join('\n')}

TASK: Expand each wrong answer to be approximately ${Math.round(correctLen * 0.85)}-${Math.round(correctLen * 1.15)} characters.
- Add plausible-sounding detail that makes the answer look complete
- Keep the answer WRONG - don't make it correct or ambiguous
- Match the style and format of the correct answer
- Use domain-appropriate terminology
- Don't start with "This answer..." or meta-commentary

Also provide updated "why wrong" explanations for each expanded answer.

Return JSON only:
{
  "expandedOptions": {
    "${wrongOptions[0]?.i}": "expanded text for option ${String.fromCharCode(65 + (wrongOptions[0]?.i || 0))}",
    "${wrongOptions[1]?.i}": "expanded text for option ${String.fromCharCode(65 + (wrongOptions[1]?.i || 1))}",
    "${wrongOptions[2]?.i}": "expanded text for option ${String.fromCharCode(65 + (wrongOptions[2]?.i || 2))}"
  },
  "whyWrong": {
    "${wrongOptions[0]?.i}": "Why this expanded answer is wrong...",
    "${wrongOptions[1]?.i}": "Why this expanded answer is wrong...",
    "${wrongOptions[2]?.i}": "Why this expanded answer is wrong..."
  }
}`;
}

// Parse Gemini response
function parseResponse(text) {
  if (!text) return null;
  
  // Extract JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) return null;
  
  try {
    return JSON.parse(jsonMatch[0]);
  } catch (e) {
    // Try to fix common JSON issues
    let cleaned = jsonMatch[0]
      .replace(/,\s*}/g, '}')
      .replace(/,\s*]/g, ']')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '');
    
    try {
      return JSON.parse(cleaned);
    } catch (e2) {
      return null;
    }
  }
}

// Process a single question
async function processQuestion(question) {
  const prompt = buildPrompt(question);
  const response = await callGemini(prompt);
  const parsed = parseResponse(response);
  
  if (!parsed || !parsed.expandedOptions) {
    return null;
  }
  
  // Apply expansions
  const newOptions = [...question.options];
  const newWhyWrong = { ...(question.whyWrong || {}) };
  
  for (const [idx, expandedText] of Object.entries(parsed.expandedOptions)) {
    const i = parseInt(idx);
    if (i !== question.correctAnswer && expandedText && expandedText.length > 10) {
      newOptions[i] = expandedText;
    }
  }
  
  // Update whyWrong
  if (parsed.whyWrong) {
    for (const [idx, explanation] of Object.entries(parsed.whyWrong)) {
      const i = parseInt(idx);
      if (i !== question.correctAnswer && explanation) {
        newWhyWrong[String(i)] = explanation;
      }
    }
  }
  
  return { options: newOptions, whyWrong: newWhyWrong };
}

// Main processing function
async function main() {
  console.log('\n=== FIX ANSWER LENGTH BIAS ===\n');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);
  console.log(`Course filter: ${courseFilter || 'all'}`);
  console.log(`Limit: ${LIMIT === Infinity ? 'none' : LIMIT}`);
  console.log('');

  if (!GEMINI_API_KEY) {
    console.error('ERROR: VITE_GEMINI_API_KEY not set');
    process.exit(1);
  }

  // Find all question files
  const files = execSync('find content -name "questions.json"')
    .toString().trim().split('\n')
    .filter(f => !courseFilter || f.includes(`/${courseFilter}/`));

  console.log(`Found ${files.length} question files\n`);

  let totalProcessed = 0;
  let totalFixed = 0;
  let totalErrors = 0;

  for (const file of files) {
    const course = file.split('/')[1];
    const section = file.split('/')[2];
    const fileKey = `${course}/${section}`;
    
    // Skip if already processed in resume mode
    if (RESUME && progress.byFile[fileKey]?.completed) {
      console.log(`Skipping ${fileKey} (already completed)`);
      continue;
    }

    console.log(`\nProcessing ${fileKey}...`);
    
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    const questions = data.questions || [];
    
    // Find questions with length bias
    const biasedQuestions = questions
      .map((q, idx) => ({ q, idx }))
      .filter(({ q }) => hasLengthBias(q));
    
    console.log(`  Found ${biasedQuestions.length}/${questions.length} questions with length bias`);
    
    if (biasedQuestions.length === 0) {
      progress.byFile[fileKey] = { completed: true, fixed: 0 };
      saveProgress();
      continue;
    }

    let fileFixed = 0;
    let modified = false;

    for (const { q, idx } of biasedQuestions) {
      if (totalProcessed >= LIMIT) {
        console.log(`\nReached limit of ${LIMIT} questions`);
        break;
      }

      // Skip already processed questions in resume mode
      const qKey = `${fileKey}:${q.id}`;
      if (RESUME && progress.byFile[fileKey]?.questions?.[q.id]) {
        continue;
      }

      try {
        process.stdout.write(`  Processing ${q.id}...`);
        
        if (DRY_RUN) {
          console.log(' [dry run]');
          totalProcessed++;
          continue;
        }

        const result = await processQuestion(q);
        
        if (result) {
          // Apply changes
          questions[idx].options = result.options;
          questions[idx].whyWrong = result.whyWrong;
          questions[idx].version = (questions[idx].version || 1) + 1;
          
          fileFixed++;
          totalFixed++;
          modified = true;
          console.log(' ✓');
        } else {
          console.log(' [no changes]');
        }

        totalProcessed++;
        progress.processed = totalProcessed;
        progress.fixed = totalFixed;
        
        // Track per-question progress
        if (!progress.byFile[fileKey]) {
          progress.byFile[fileKey] = { completed: false, fixed: 0, questions: {} };
        }
        progress.byFile[fileKey].questions[q.id] = true;
        
        // Rate limiting
        await sleep(RATE_LIMIT_MS);
        
        // Save progress every 10 questions
        if (totalProcessed % 10 === 0) {
          saveProgress();
        }

      } catch (error) {
        console.log(` ERROR: ${error.message}`);
        totalErrors++;
        progress.errors = totalErrors;
      }

      if (totalProcessed >= LIMIT) break;
    }

    // Save file if modified
    if (modified && !DRY_RUN) {
      data.questions = questions;
      fs.writeFileSync(file, JSON.stringify(data, null, 2));
      console.log(`  Saved ${fileFixed} fixes to ${file}`);
    }

    progress.byFile[fileKey] = { 
      completed: totalProcessed < LIMIT, 
      fixed: fileFixed,
      questions: progress.byFile[fileKey]?.questions || {}
    };
    saveProgress();

    if (totalProcessed >= LIMIT) break;
  }

  // Final summary
  console.log('\n=== SUMMARY ===');
  console.log(`Processed: ${totalProcessed}`);
  console.log(`Fixed: ${totalFixed}`);
  console.log(`Errors: ${totalErrors}`);
  console.log(`Progress saved to: ${PROGRESS_FILE}`);
  
  // Run bias check again
  if (!DRY_RUN && totalFixed > 0) {
    console.log('\n=== POST-FIX BIAS CHECK ===\n');
    try {
      execSync('node /tmp/bias-check.js', { stdio: 'inherit' });
    } catch (e) {
      console.log('(bias check script not found)');
    }
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  saveProgress();
  process.exit(1);
});

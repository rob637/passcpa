#!/usr/bin/env node
/**
 * Fix Answer Length Bias
 * 
 * Problem: ~65% of correct answers are the longest option (should be ~25%)
 * Solution: Use Gemini to expand wrong answer options to match correct answer length
 * Also updates whyWrong explanations for consistency
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Load environment from .env file manually
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      process.env[match[1].trim()] = match[2].trim();
    }
  });
}

const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error('ERROR: VITE_GEMINI_API_KEY not set in .env');
  process.exit(1);
}

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const LOG_FILE = '/tmp/fix-bias.log';
const PROGRESS_FILE = '/tmp/fix-bias-progress.json';

// Rate limiting
const REQUESTS_PER_MINUTE = 14;
const DELAY_MS = Math.ceil(60000 / REQUESTS_PER_MINUTE);

let totalFixed = 0;
let totalSkipped = 0;
let totalErrors = 0;

function log(msg) {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ${msg}`;
  console.log(line);
  fs.appendFileSync(LOG_FILE, line + '\n');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function callGemini(prompt, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 2048,
          }
        })
      });

      if (response.status === 429) {
        log(`Rate limited, waiting 30s (attempt ${attempt}/${retries})`);
        await sleep(30000);
        continue;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
    } catch (error) {
      log(`Gemini error (attempt ${attempt}): ${error.message}`);
      if (attempt < retries) await sleep(5000);
    }
  }
  return null;
}

function needsFix(question) {
  if (!question.options || question.options.length !== 4) return false;
  if (typeof question.correctAnswer !== 'number') return false;
  
  const lengths = question.options.map((o, i) => ({ len: String(o || '').length, idx: i }));
  const longest = lengths.reduce((a, b) => a.len > b.len ? a : b);
  
  // Fix if correct answer is the longest by more than 20%
  const correctLen = lengths[question.correctAnswer].len;
  const avgWrongLen = lengths
    .filter(l => l.idx !== question.correctAnswer)
    .reduce((sum, l) => sum + l.len, 0) / 3;
  
  return longest.idx === question.correctAnswer && correctLen > avgWrongLen * 1.2;
}

async function fixQuestion(question, course) {
  const correctIdx = question.correctAnswer;
  const correctOption = question.options[correctIdx];
  const correctLen = correctOption.length;
  
  // Target length for wrong options (90-110% of correct answer length)
  const targetMin = Math.floor(correctLen * 0.9);
  const targetMax = Math.ceil(correctLen * 1.1);
  
  const wrongIndices = [0, 1, 2, 3].filter(i => i !== correctIdx);
  const optionsToExpand = wrongIndices.filter(i => 
    question.options[i].length < targetMin
  );
  
  if (optionsToExpand.length === 0) return null;
  
  const prompt = `You are a ${course.toUpperCase()} exam question editor. Your task is to expand WRONG answer options to be similar in length to the correct answer, making them plausible-sounding but still clearly wrong to someone who knows the material.

QUESTION: ${question.question}

CORRECT ANSWER (Option ${String.fromCharCode(65 + correctIdx)}): ${correctOption}
(Length: ${correctLen} characters)

WRONG OPTIONS TO EXPAND (target length: ${targetMin}-${targetMax} chars each):
${optionsToExpand.map(i => `Option ${String.fromCharCode(65 + i)}: "${question.options[i]}" (current: ${question.options[i].length} chars)`).join('\n')}

For each wrong option, provide:
1. An expanded version that sounds professional and plausible but is still factually incorrect
2. A brief "why wrong" explanation (1-2 sentences)

IMPORTANT:
- Keep the core incorrect concept - just add realistic-sounding detail
- Match the style and tone of the correct answer
- Don't make it obviously wrong by adding absurd details
- The expansion should test knowledge, not pattern recognition

Respond in this exact JSON format:
{
  "expandedOptions": {
    "${optionsToExpand[0]}": "expanded text here"${optionsToExpand.length > 1 ? `,
    "${optionsToExpand[1]}": "expanded text here"` : ''}${optionsToExpand.length > 2 ? `,
    "${optionsToExpand[2]}": "expanded text here"` : ''}
  },
  "whyWrong": {
    "${optionsToExpand[0]}": "Why this option is wrong..."${optionsToExpand.length > 1 ? `,
    "${optionsToExpand[1]}": "Why this option is wrong..."` : ''}${optionsToExpand.length > 2 ? `,
    "${optionsToExpand[2]}": "Why this option is wrong..."` : ''}
  }
}`;

  const response = await callGemini(prompt);
  if (!response) return null;
  
  try {
    // Extract JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;
    
    const result = JSON.parse(jsonMatch[0]);
    
    // Apply expanded options
    const newOptions = [...question.options];
    for (const [idx, expanded] of Object.entries(result.expandedOptions || {})) {
      const i = parseInt(idx);
      if (i >= 0 && i < 4 && i !== correctIdx && expanded) {
        newOptions[i] = expanded;
      }
    }
    
    // Update whyWrong
    const newWhyWrong = { ...question.whyWrong };
    for (const [idx, reason] of Object.entries(result.whyWrong || {})) {
      const i = parseInt(idx);
      if (i >= 0 && i < 4 && reason) {
        newWhyWrong[String(i)] = `Why option ${String.fromCharCode(65 + i)} is WRONG - ${reason}`;
      }
    }
    
    return { options: newOptions, whyWrong: newWhyWrong };
  } catch (e) {
    log(`JSON parse error: ${e.message}`);
    return null;
  }
}

function loadProgress() {
  try {
    if (fs.existsSync(PROGRESS_FILE)) {
      return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
    }
  } catch (e) {}
  return { completedFiles: [], lastQuestionIdx: {} };
}

function saveProgress(progress) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

async function processFile(file, progress) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!data.questions || !Array.isArray(data.questions)) return;
  
  const course = file.split('/')[1];
  const startIdx = progress.lastQuestionIdx[file] || 0;
  let modified = false;
  let fileFixed = 0;
  
  log(`Processing ${file} (${data.questions.length} questions, starting at ${startIdx})`);
  
  for (let i = startIdx; i < data.questions.length; i++) {
    const q = data.questions[i];
    
    if (!needsFix(q)) {
      totalSkipped++;
      continue;
    }
    
    const fix = await fixQuestion(q, course);
    
    if (fix) {
      data.questions[i].options = fix.options;
      data.questions[i].whyWrong = fix.whyWrong;
      modified = true;
      fileFixed++;
      totalFixed++;
      
      if (fileFixed % 10 === 0) {
        log(`${file}: Fixed ${fileFixed} questions so far (at index ${i})`);
      }
    } else {
      totalErrors++;
    }
    
    // Save progress periodically
    if (i % 20 === 0) {
      progress.lastQuestionIdx[file] = i;
      saveProgress(progress);
      if (modified) {
        fs.writeFileSync(file, JSON.stringify(data, null, 2));
      }
    }
    
    await sleep(DELAY_MS);
  }
  
  // Save final state
  if (modified) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  }
  
  progress.completedFiles.push(file);
  delete progress.lastQuestionIdx[file];
  saveProgress(progress);
  
  log(`Completed ${file}: Fixed ${fileFixed} questions`);
}

async function main() {
  log('=== Starting Answer Bias Fix ===');
  
  const files = execSync('find content -name "questions.json"')
    .toString().trim().split('\n')
    .filter(f => f.length > 0);
  
  log(`Found ${files.length} question files`);
  
  const progress = loadProgress();
  
  // Sort by bias severity (process worst first)
  const fileStats = files.map(file => {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    let biased = 0, total = 0;
    (data.questions || []).forEach(q => {
      if (needsFix(q)) biased++;
      total++;
    });
    return { file, biased, total, ratio: biased / (total || 1) };
  }).sort((a, b) => b.ratio - a.ratio);
  
  log('Files by bias severity:');
  fileStats.forEach(s => log(`  ${s.file}: ${s.biased}/${s.total} (${(s.ratio * 100).toFixed(1)}%)`));
  
  for (const { file } of fileStats) {
    if (progress.completedFiles.includes(file)) {
      log(`Skipping ${file} (already completed)`);
      continue;
    }
    
    await processFile(file, progress);
  }
  
  log('=== Answer Bias Fix Complete ===');
  log(`Total fixed: ${totalFixed}`);
  log(`Total skipped (no fix needed): ${totalSkipped}`);
  log(`Total errors: ${totalErrors}`);
  
  // Clean up progress file
  fs.unlinkSync(PROGRESS_FILE);
}

main().catch(err => {
  log(`Fatal error: ${err.message}`);
  process.exit(1);
});

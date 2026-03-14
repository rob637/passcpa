#!/usr/bin/env node
/**
 * Fix CPA Questions - AI-Powered
 * Uses Gemini to suggest fixes for wrong/questionable questions.
 * 
 * Usage:
 *   node scripts/fix-cpa-section.cjs AUD
 *   node scripts/fix-cpa-section.cjs REG --resume
 *   node scripts/fix-cpa-section.cjs ALL
 */
const fs = require('fs');

const SECTION_ARG = process.argv[2]?.toUpperCase();
const SECTIONS = SECTION_ARG === 'ALL' 
  ? ['AUD', 'REG', 'BAR', 'ISC', 'TCP']
  : [SECTION_ARG];

if (!SECTION_ARG || (!['AUD', 'REG', 'BAR', 'ISC', 'TCP', 'ALL'].includes(SECTION_ARG))) {
  console.error('Usage: node scripts/fix-cpa-section.cjs <AUD|REG|BAR|ISC|TCP|ALL> [--resume]');
  process.exit(1);
}

const API_KEY = 'AIzaSyBAbCsONlqp9EhfJ3rFiOJxQ0thNHuajbE';
const MODEL = 'gemini-2.0-flash';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
const RESUME = process.argv.includes('--resume');

const BATCH_SIZE = 5;
const DELAY_MS = 1500;

const SECTION_CONTEXT = {
  AUD: 'Auditing standards (PCAOB, AICPA, ISAs), audit procedures, internal control, professional ethics',
  REG: 'Federal taxation (IRC), business law, professional responsibility (Circular 230)',
  BAR: 'Financial statement analysis, data analytics, business combinations, cost accounting',
  ISC: 'IT governance, cybersecurity, data management, system development, SOC reports',
  TCP: 'Tax compliance, tax planning, S-corps, partnerships, estate/gift tax'
};

async function main() {
  for (const section of SECTIONS) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Processing ${section}...`);
    console.log('='.repeat(60));
    await processSection(section);
  }
}

async function processSection(section) {
  const resultsFile = `scripts/${section.toLowerCase()}-review-results.json`;
  const questionsFile = `content/cpa/${section.toLowerCase()}/questions.json`;
  const fixesFile = `scripts/${section.toLowerCase()}-fixes.json`;
  
  if (!fs.existsSync(resultsFile)) {
    console.log(`  No results file found: ${resultsFile}`);
    return;
  }
  
  const results = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
  const data = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));
  const questions = data.questions;
  
  // Get problem questions
  const problems = results.filter(r => r.verdict === 'WRONG' || r.verdict === 'QUESTIONABLE');
  console.log(`  Found ${problems.length} problems (${results.filter(r=>r.verdict==='WRONG').length} wrong, ${results.filter(r=>r.verdict==='QUESTIONABLE').length} questionable)`);
  
  if (problems.length === 0) {
    console.log('  No problems to fix.');
    return;
  }
  
  // Load existing fixes if resuming
  let fixes = {};
  let startIdx = 0;
  if (RESUME && fs.existsSync(fixesFile)) {
    fixes = JSON.parse(fs.readFileSync(fixesFile, 'utf8'));
    const fixedIds = new Set(Object.keys(fixes));
    startIdx = problems.findIndex(p => !fixedIds.has(p.id));
    if (startIdx === -1) startIdx = problems.length;
    console.log(`  Resuming from index ${startIdx} (${Object.keys(fixes).length} already fixed)`);
  }
  
  // Check for questions that should be removed (e.g., hypothetical H.R. 1)
  const toRemove = [];
  for (const p of problems) {
    if (p.reason && p.reason.includes('H.R. 1 is a hypothetical')) {
      toRemove.push(p.id);
    }
  }
  if (toRemove.length > 0) {
    console.log(`  Flagged ${toRemove.length} questions for removal (hypothetical H.R. 1)`);
    for (const id of toRemove) {
      fixes[id] = { action: 'REMOVE', reason: 'Hypothetical legislation' };
    }
  }
  
  // Generate fixes for remaining problems
  const toFix = problems.slice(startIdx).filter(p => !toRemove.includes(p.id));
  const totalBatches = Math.ceil(toFix.length / BATCH_SIZE);
  
  for (let i = 0; i < toFix.length; i += BATCH_SIZE) {
    const batch = toFix.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    process.stdout.write(`\r  Batch ${batchNum}/${totalBatches} (${Math.min(i + BATCH_SIZE, toFix.length)}/${toFix.length})  `);
    
    try {
      const batchFixes = await generateFixes(batch, questions, section);
      Object.assign(fixes, batchFixes);
      fs.writeFileSync(fixesFile, JSON.stringify(fixes, null, 2));
    } catch (err) {
      console.error(`\n  Error: ${err.message}`);
      console.log('  Waiting 10s and retrying...');
      await sleep(10000);
      try {
        const batchFixes = await generateFixes(batch, questions, section);
        Object.assign(fixes, batchFixes);
        fs.writeFileSync(fixesFile, JSON.stringify(fixes, null, 2));
      } catch (err2) {
        console.error(`  Retry failed: ${err2.message}`);
        for (const p of batch) {
          fixes[p.id] = { action: 'SKIP', reason: err2.message };
        }
        fs.writeFileSync(fixesFile, JSON.stringify(fixes, null, 2));
      }
    }
    
    await sleep(DELAY_MS);
  }
  
  console.log(`\n  Generated ${Object.keys(fixes).length} fixes`);
  
  // Apply fixes
  console.log('  Applying fixes...');
  let applied = 0, removed = 0, skipped = 0;
  
  for (const [id, fix] of Object.entries(fixes)) {
    if (fix.action === 'REMOVE') {
      const idx = questions.findIndex(q => q.id === id);
      if (idx !== -1) {
        questions.splice(idx, 1);
        removed++;
      }
    } else if (fix.action === 'SKIP') {
      skipped++;
    } else if (fix.correctAnswer !== undefined || fix.explanation) {
      const q = questions.find(q => q.id === id);
      if (q) {
        if (fix.correctAnswer !== undefined) q.correctAnswer = fix.correctAnswer;
        if (fix.explanation) q.explanation = fix.explanation;
        applied++;
      }
    }
  }
  
  // Write back
  data.questions = questions;
  fs.writeFileSync(questionsFile, JSON.stringify(data, null, 2));
  console.log(`  Applied: ${applied}, Removed: ${removed}, Skipped: ${skipped}`);
  console.log(`  Updated: ${questionsFile} (${questions.length} questions remaining)`);
}

async function generateFixes(problemBatch, allQuestions, section) {
  const fixes = {};
  
  const questionsText = problemBatch.map(p => {
    const q = allQuestions.find(x => x.id === p.id);
    if (!q) return null;
    const options = q.options.map((opt, i) => `  ${String.fromCharCode(65 + i)}) ${opt}`).join('\n');
    const marked = String.fromCharCode(65 + q.correctAnswer);
    return `QUESTION [ID=${q.id}]:
Issue: ${p.reason}
Topic: ${q.topic || 'N/A'} | Blueprint: ${q.blueprintArea || 'N/A'}
${q.question}

${options}

Marked correct: ${marked}
Current explanation: ${q.explanation || 'None'}`;
  }).filter(Boolean).join('\n\n---\n\n');
  
  if (!questionsText.trim()) return fixes;
  
  const prompt = `You are an expert CPA exam content editor for ${section} (${SECTION_CONTEXT[section]}).

For each question below, determine the correct fix. The "Issue" field explains what's wrong.

Respond with EXACTLY one block per question in this format:
[ID]
CORRECT_ANSWER: <letter A-D or KEEP if current is correct>
EXPLANATION: <improved explanation, must be accurate and clear, or KEEP if current is acceptable>
---

Rules:
- Use the exact ID from the question
- If the marked answer is actually correct despite the issue, use CORRECT_ANSWER: KEEP
- Provide a clear, accurate explanation that matches the correct answer
- Reference authoritative standards (IRC, PCAOB, AICPA, etc.) when appropriate
- Keep explanations concise but complete

${questionsText}`;

  const response = await callGemini(prompt);
  return parseFixResponse(response, problemBatch);
}

async function callGemini(prompt) {
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.1,
      maxOutputTokens: 8192,
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

function parseFixResponse(text, problems) {
  const fixes = {};
  const blocks = text.split('---').map(b => b.trim()).filter(Boolean);
  
  for (const problem of problems) {
    // Find block containing this ID
    const block = blocks.find(b => b.includes(problem.id));
    if (!block) {
      fixes[problem.id] = { action: 'SKIP', reason: 'No fix found in response' };
      continue;
    }
    
    const fix = {};
    
    // Parse CORRECT_ANSWER
    const answerMatch = block.match(/CORRECT_ANSWER:\s*([A-D]|KEEP)/i);
    if (answerMatch && answerMatch[1].toUpperCase() !== 'KEEP') {
      fix.correctAnswer = answerMatch[1].toUpperCase().charCodeAt(0) - 65;
    }
    
    // Parse EXPLANATION
    const explanationMatch = block.match(/EXPLANATION:\s*([\s\S]*?)(?=\n[A-Z_]+:|$)/i);
    if (explanationMatch) {
      const explanation = explanationMatch[1].trim();
      if (explanation.toUpperCase() !== 'KEEP' && explanation.length > 20) {
        fix.explanation = explanation;
      }
    }
    
    if (Object.keys(fix).length > 0) {
      fixes[problem.id] = fix;
    } else {
      fixes[problem.id] = { action: 'SKIP', reason: 'No changes needed' };
    }
  }
  
  return fixes;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

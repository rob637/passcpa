#!/usr/bin/env node
/**
 * fix-embedded-answers: Remove answer options embedded in question text
 * 
 * Issue: Some questions have the format:
 *   "What is X? A) Option1 | B) Option2 | C) Option3 | D) Option4"
 * 
 * The answers appear both in the question AND in the options array.
 * This script strips the embedded answers from the question text.
 * 
 * Run: node scripts/fix-embedded-answers.cjs [--dry-run] [--verbose]
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const verbose = args.includes('--verbose');

const EXAMS = {
  cpa: ['far', 'aud', 'reg', 'tcp', 'isc', 'bar'],
  ea: ['see1', 'see2', 'see3'],
  cma: ['cma1', 'cma2'],
  cia: ['cia1', 'cia2', 'cia3'],
  cisa: ['cisa1', 'cisa2', 'cisa3', 'cisa4', 'cisa5'],
  cfp: ['CFP-EST', 'CFP-GEN', 'CFP-INV', 'CFP-PCR', 'CFP-PSY', 'CFP-RET', 'CFP-RISK', 'CFP-TAX'],
};

// Pattern to match embedded answers after the question
// Covers formats like:
//   "? A) ... | B) ... | C) ... | D) ..."
//   "? A) ... B) ... C) ... D) ..."
//   ": A) ... B) ... C) ... D) ..." (questions ending with colon)
const EMBEDDED_ANSWER_PATTERN = /[?:]\s*A\)\s*.+$/;

function hasEmbeddedAnswers(questionText) {
  return EMBEDDED_ANSWER_PATTERN.test(questionText);
}

function stripEmbeddedAnswers(questionText) {
  // Find where "? A)" or ": A)" starts and keep only up to the punctuation
  const match = questionText.match(/^(.+[?:])\s*A\)/);
  if (match) {
    return match[1].trim();
  }
  // Fallback: try to strip from first " A)" after content
  const idx = questionText.search(/\s+A\)\s+/);
  if (idx > 20) { // Only if there's substantial content before
    return questionText.slice(0, idx).trim();
  }
  return questionText;
}

function processFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return { found: 0, fixed: 0 };
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  let fileData;
  try {
    fileData = JSON.parse(content);
  } catch (e) {
    console.error(`  JSON parse error: ${filePath}`);
    return { found: 0, fixed: 0 };
  }
  
  // Handle both { questions: [...] } and direct [...] formats
  let data;
  let isWrapped = false;
  if (Array.isArray(fileData)) {
    data = fileData;
  } else if (fileData && Array.isArray(fileData.questions)) {
    data = fileData.questions;
    isWrapped = true;
  } else {
    return { found: 0, fixed: 0 };
  }
  
  let found = 0;
  let fixed = 0;
  
  data.forEach((q, idx) => {
    if (!q.question) return;
    
    if (hasEmbeddedAnswers(q.question)) {
      found++;
      const original = q.question;
      const cleaned = stripEmbeddedAnswers(q.question);
      
      if (verbose) {
        console.log(`  [${q.id || idx}] BEFORE: ${original.slice(0, 100)}...`);
        console.log(`  [${q.id || idx}] AFTER:  ${cleaned.slice(0, 100)}...`);
        console.log('');
      }
      
      if (cleaned !== original && (cleaned.endsWith('?') || cleaned.endsWith(':'))) {
        q.question = cleaned;
        fixed++;
      }
    }
  });
  
  if (fixed > 0 && !dryRun) {
    const output = isWrapped ? fileData : data;
    fs.writeFileSync(filePath, JSON.stringify(output, null, 2));
  }
  
  return { found, fixed };
}

function main() {
  console.log('='.repeat(60));
  console.log('Fix Embedded Answers in Questions');
  console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE'}`);
  console.log('='.repeat(60));
  console.log('');
  
  let totalFound = 0;
  let totalFixed = 0;
  
  for (const [exam, sections] of Object.entries(EXAMS)) {
    for (const section of sections) {
      const filePath = path.join('content', exam, section, 'questions.json');
      const { found, fixed } = processFile(filePath);
      
      if (found > 0) {
        console.log(`${exam}/${section}: Found ${found}, Fixed ${fixed}`);
      }
      
      totalFound += found;
      totalFixed += fixed;
    }
  }
  
  console.log('');
  console.log('='.repeat(60));
  console.log(`TOTAL: Found ${totalFound} questions with embedded answers`);
  console.log(`TOTAL: Fixed ${totalFixed} questions`);
  if (dryRun) {
    console.log('(DRY RUN - no files were modified)');
    console.log('Run without --dry-run to apply fixes');
  }
  console.log('='.repeat(60));
}

main();

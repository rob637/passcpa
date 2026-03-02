#!/usr/bin/env node
/**
 * Fix script: Strip embedded answer options (A/B/C/D) from question text.
 * 
 * Many questions have the answer options duplicated inside the question text,
 * e.g., "What is X?\n\nA) Option 1\nB) Option 2\nC) Option 3\nD) Option 4"
 * when the options are already in the separate `options` array.
 *
 * This script strips the embedded options from the question text while
 * preserving everything before them. It handles two patterns:
 *   - A) ... B) ... C) ... D) ...
 *   - (A) ... (B) ... (C) ... (D) ...
 *
 * Usage:
 *   node scripts/fix-embedded-options.cjs --dry-run    # Preview changes
 *   node scripts/fix-embedded-options.cjs              # Apply changes
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DRY_RUN = process.argv.includes('--dry-run');
const VERBOSE = process.argv.includes('--verbose');

const files = execSync('find content -name questions.json', { encoding: 'utf8' }).trim().split('\n');

let totalQuestions = 0;
let totalFixed = 0;
let totalFiles = 0;
let filesModified = 0;

/**
 * Strip embedded answer options from question text.
 * Returns the cleaned question text, or null if no change needed.
 */
function stripEmbeddedOptions(text) {
  if (!text) return null;
  
  // Match the start of embedded options — multiple format variants
  const patterns = [
    // Standard: \n\nA) or \nA) — letter-paren style
    /\n\s*\n?\s*A\)\s/,
    // Standard: \n\n(A) or \n(A) — paren-letter-paren style  
    /\n\s*\n?\s*\(A\)\s/,
    // Inline after question mark: ...? A) or ?" A)
    /[?."\u201D]\s+A\)\s/,
    // "Options:" prefix pattern: \n\nOptions: A)
    /\n\s*Options:\s*A\)\s/,
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const idx = match.index;
      const before = text.substring(0, idx);
      const after = text.substring(idx);
      
      // Verify the remainder actually contains B), C), D) (or (B), (C), (D))
      const isLetterParen = /\bA\)/.test(after) && /\bB\)/.test(after) && /\bC\)/.test(after) && /\bD\)/.test(after);
      const isParenLetter = /\(A\)/.test(after) && /\(B\)/.test(after) && /\(C\)/.test(after) && /\(D\)/.test(after);
      
      if (isLetterParen || isParenLetter) {
        // Keep the punctuation (? . ") but strip the options
        let cleaned = before.trimEnd();
        // If we cut right after punctuation, restore it
        const matchStr = match[0];
        const punctMatch = matchStr.match(/^([?."\u201D])/);
        if (punctMatch && !cleaned.endsWith(punctMatch[1])) {
          cleaned += punctMatch[1];
        }
        return cleaned;
      }
    }
  }
  
  // Special case: "Options: A) ... | B) ... | C) ... | D) ..." with pipe separators
  const optionsMatch = text.match(/\n\s*\n?\s*Options:\s*/);
  if (optionsMatch) {
    const after = text.substring(optionsMatch.index);
    if (/A\)/.test(after) && /B\)/.test(after) && /C\)/.test(after) && /D\)/.test(after)) {
      return text.substring(0, optionsMatch.index).trimEnd();
    }
  }
  
  // Special case: trailing "Correct: X" pattern (leftover from bad generation)
  const correctMatch = text.match(/\nCorrect:\s*[A-D]\s*$/);
  if (correctMatch) {
    // Already handled above, but as fallback
    return text.substring(0, correctMatch.index).trimEnd();
  }
  
  return null;
}

console.log(DRY_RUN ? '\n=== DRY RUN (no files will be modified) ===' : '\n=== APPLYING FIXES ===');
console.log('');

for (const file of files) {
  try {
    const raw = fs.readFileSync(file, 'utf8');
    const data = JSON.parse(raw);
    const questions = data.questions || (Array.isArray(data) ? data : []);
    
    totalFiles++;
    let fileFixed = 0;
    
    for (const q of questions) {
      totalQuestions++;
      const text = q.question || '';
      const cleaned = stripEmbeddedOptions(text);
      
      if (cleaned !== null) {
        if (VERBOSE) {
          console.log(`  FIX ${q.id}:`);
          console.log(`    BEFORE: "${text.substring(Math.max(0, text.length - 120))}"`);
          console.log(`    AFTER:  "${cleaned.substring(Math.max(0, cleaned.length - 120))}"`);
          console.log('');
        }
        
        if (!DRY_RUN) {
          q.question = cleaned;
        }
        fileFixed++;
        totalFixed++;
      }
    }
    
    if (fileFixed > 0) {
      filesModified++;
      console.log(`${fileFixed.toString().padStart(4)} fixed in ${file}`);
      
      if (!DRY_RUN) {
        // Write back with same formatting (2-space indent)
        fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
      }
    }
  } catch (e) {
    console.error('ERROR:', file, e.message);
  }
}

console.log('');
console.log('========================================');
console.log('SUMMARY');
console.log('========================================');
console.log(`Total questions scanned: ${totalQuestions.toLocaleString()}`);
console.log(`Total fixed:            ${totalFixed.toLocaleString()}`);
console.log(`Files modified:         ${filesModified} / ${totalFiles}`);
console.log('');
if (DRY_RUN) {
  console.log('This was a DRY RUN. Run without --dry-run to apply changes.');
}

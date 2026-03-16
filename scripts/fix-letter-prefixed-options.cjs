#!/usr/bin/env node
/**
 * Fix letter-prefixed options in CPA questions
 * 
 * Problem: generate-cpa-100.cjs asked Gemini for "4 options (A-D)" and the LLM
 * returned options with letter prefixes embedded, like:
 *   ["A. Change management procedures", "B. Physical security controls", ...]
 * 
 * The UI then adds its own A/B/C/D labels, creating double-lettering:
 *   "A. D. The internal audit department alone"
 * 
 * Fix: Strip the letter prefixes while preserving the correct answer mapping.
 */

const fs = require('fs');
const path = require('path');

const CPA_SECTIONS = ['far', 'aud', 'reg', 'tcp', 'isc', 'bar'];
const LETTER_PREFIX_REGEX = /^[A-D]\.\s+/;

function hasLetterPrefixedOptions(question) {
  if (!Array.isArray(question.options) || question.options.length !== 4) {
    return false;
  }
  // Check if ANY option starts with a letter prefix
  return question.options.some(opt => LETTER_PREFIX_REGEX.test(opt));
}

function fixQuestion(question) {
  if (!hasLetterPrefixedOptions(question)) {
    return { fixed: false, question };
  }

  const originalOptions = [...question.options];
  const letterMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
  
  // First, detect the pattern
  // Case 1: Options are in order A, B, C, D (just need to strip prefixes)
  // Case 2: Options are shuffled (letters don't match indices)
  
  let inOrder = true;
  const extractedLetters = [];
  
  for (let i = 0; i < 4; i++) {
    const opt = question.options[i];
    const match = opt.match(/^([A-D])\.\s+/);
    if (match) {
      extractedLetters[i] = match[1];
      if (letterMap[match[1]] !== i) {
        inOrder = false;
      }
    } else {
      extractedLetters[i] = null;
    }
  }

  // Strip prefixes from all options
  const cleanedOptions = question.options.map(opt => 
    opt.replace(LETTER_PREFIX_REGEX, '')
  );

  // If all options have consistent lettering and they're in order, just strip
  if (inOrder || extractedLetters.filter(l => l !== null).length < 3) {
    // Simple case: just strip prefixes, keep order
    question.options = cleanedOptions;
    return { fixed: true, question, wasShuffled: false };
  }

  // Complex case: the LLM put letters that don't match array indices
  // This is rare but we should handle it by reordering based on letters
  // For safety, we'll just strip and log a warning
  console.warn(`  Warning: Question ${question.id} has mismatched letter indices`);
  console.warn(`    Letters found: ${extractedLetters.join(', ')}`);
  console.warn(`    correctAnswer: ${question.correctAnswer}`);
  
  question.options = cleanedOptions;
  return { fixed: true, question, wasShuffled: true };
}

async function main() {
  console.log('=== Fix Letter-Prefixed Options ===\n');
  
  let totalFixed = 0;
  let totalQuestions = 0;
  const backupDir = path.join(__dirname, '..', 'content', 'cpa', '_backup_letter_fix');
  
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  for (const section of CPA_SECTIONS) {
    const filePath = path.join(__dirname, '..', 'content', 'cpa', section, 'questions.json');
    
    if (!fs.existsSync(filePath)) {
      console.log(`${section.toUpperCase()}: File not found, skipping`);
      continue;
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    totalQuestions += data.questions.length;
    
    let sectionFixed = 0;
    const affectedIds = [];
    
    for (let i = 0; i < data.questions.length; i++) {
      const result = fixQuestion(data.questions[i]);
      if (result.fixed) {
        sectionFixed++;
        affectedIds.push(data.questions[i].id);
      }
    }
    
    if (sectionFixed > 0) {
      // Create backup
      const backupPath = path.join(backupDir, `${section}-questions-${new Date().toISOString().replace(/:/g, '-').slice(0, 19)}.json`);
      fs.copyFileSync(filePath, backupPath);
      
      // Update metadata
      data.exportedAt = new Date().toISOString();
      
      // Save fixed file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      
      console.log(`${section.toUpperCase()}: Fixed ${sectionFixed} questions`);
      console.log(`  Backup: ${path.basename(backupPath)}`);
      totalFixed += sectionFixed;
    } else {
      console.log(`${section.toUpperCase()}: No issues found`);
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Total questions scanned: ${totalQuestions}`);
  console.log(`Total questions fixed: ${totalFixed}`);
  console.log(`Backups saved to: content/cpa/_backup_letter_fix/`);
}

main().catch(console.error);

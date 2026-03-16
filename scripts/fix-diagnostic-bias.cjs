#!/usr/bin/env node
/**
 * fix-diagnostic-bias: Balance answer distribution in diagnostic quizzes
 * 
 * The diagnostic quizzes have severe answer bias (most answers are B).
 * This script shuffles options to achieve ~25% distribution for each answer.
 * 
 * Run: node scripts/fix-diagnostic-bias.cjs [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');

const DIAGNOSTIC_FILES = [
  'src/data/cpa/diagnostic-quizzes.ts',
  'src/data/ea/reference/diagnostic-quizzes.ts',
  'src/data/cma/diagnostic-quizzes.ts',
  'src/data/cia/diagnostic-quizzes.ts',
  'src/data/cisa/diagnostic-quizzes.ts',
  'src/data/cfp/diagnostic-quizzes.ts',
];

function shuffleOptionsForBalance(content, targetFile) {
  // Find all questions and track correctAnswer distribution
  const questionPattern = /\{\s*id:\s*['"]([^'"]+)['"],\s*question:\s*['"]([^'"]+)['"],\s*options:\s*\[([^\]]+)\],\s*correctAnswer:\s*(\d)/g;
  
  let questions = [];
  let match;
  
  // Extract all questions
  const tempContent = content;
  const allMatches = [...tempContent.matchAll(questionPattern)];
  
  console.log(`  Found ${allMatches.length} questions`);
  
  // Count current distribution
  const currentDist = [0, 0, 0, 0];
  allMatches.forEach(m => {
    currentDist[parseInt(m[4])]++;
  });
  console.log(`  Current distribution: A=${currentDist[0]}, B=${currentDist[1]}, C=${currentDist[2]}, D=${currentDist[3]}`);
  
  // Calculate target distribution
  const total = allMatches.length;
  const targetPerAnswer = Math.floor(total / 4);
  const remainder = total % 4;
  const targets = [targetPerAnswer, targetPerAnswer, targetPerAnswer, targetPerAnswer];
  // Distribute remainder
  for (let i = 0; i < remainder; i++) {
    targets[i]++;
  }
  console.log(`  Target distribution: A=${targets[0]}, B=${targets[1]}, C=${targets[2]}, D=${targets[3]}`);
  
  // Track assignments
  const assigned = [0, 0, 0, 0];
  let modifiedContent = content;
  let shuffleCount = 0;
  
  // Process each question
  for (const match of allMatches) {
    const [fullMatch, id, question, optionsStr, correctAnswer] = match;
    const currentCorrect = parseInt(correctAnswer);
    
    // Find which answer position needs more questions
    let newCorrect = currentCorrect;
    
    // If current position is at or over target and another needs more, shuffle
    if (assigned[currentCorrect] >= targets[currentCorrect]) {
      for (let i = 0; i < 4; i++) {
        if (assigned[i] < targets[i]) {
          newCorrect = i;
          break;
        }
      }
    }
    
    assigned[newCorrect]++;
    
    if (newCorrect !== currentCorrect) {
      // Parse options
      const optionMatches = optionsStr.match(/'([^']+)'/g) || optionsStr.match(/"([^"]+)"/g);
      if (!optionMatches || optionMatches.length !== 4) continue;
      
      const options = optionMatches.map(o => o.slice(1, -1));
      const correctOption = options[currentCorrect];
      
      // Create new options array with correct answer in newCorrect position
      const newOptions = [...options];
      // Swap
      const temp = newOptions[newCorrect];
      newOptions[newCorrect] = correctOption;
      newOptions[currentCorrect] = temp;
      
      // Build new options string - preserve original quote style
      const useDoubleQuotes = optionMatches[0].startsWith('"');
      const quote = useDoubleQuotes ? '"' : "'";
      const escapeQuote = useDoubleQuotes ? '\\"' : "\\'";
      const newOptionsStr = newOptions.map(o => {
        // Escape quotes that match our quote style
        const escaped = o.replace(new RegExp(quote, 'g'), escapeQuote);
        return `${quote}${escaped}${quote}`;
      }).join(', ');
      
      // Replace in content - need to be careful with the replacement
      const oldPattern = `correctAnswer: ${currentCorrect}`;
      const newPattern = `correctAnswer: ${newCorrect}`;
      
      // Find and replace this specific question's options and correctAnswer
      const questionStart = modifiedContent.indexOf(`id: '${id}'`);
      if (questionStart === -1) continue;
      
      // Find the end of this question block
      const questionEnd = modifiedContent.indexOf('},', questionStart) + 2;
      const questionBlock = modifiedContent.slice(questionStart, questionEnd);
      
      // Replace options
      const oldOptionsPattern = /options:\s*\[[^\]]+\]/;
      const newOptionsBlock = `options: [${newOptionsStr}]`;
      let newQuestionBlock = questionBlock.replace(oldOptionsPattern, newOptionsBlock);
      
      // Replace correctAnswer
      newQuestionBlock = newQuestionBlock.replace(
        /correctAnswer:\s*\d/,
        `correctAnswer: ${newCorrect}`
      );
      
      modifiedContent = modifiedContent.slice(0, questionStart) + newQuestionBlock + modifiedContent.slice(questionEnd);
      shuffleCount++;
    }
  }
  
  // Verify new distribution
  const newMatches = [...modifiedContent.matchAll(/correctAnswer:\s*(\d)/g)];
  const newDist = [0, 0, 0, 0];
  newMatches.forEach(m => {
    newDist[parseInt(m[1])]++;
  });
  console.log(`  New distribution: A=${newDist[0]}, B=${newDist[1]}, C=${newDist[2]}, D=${newDist[3]}`);
  console.log(`  Shuffled ${shuffleCount} questions`);
  
  return { content: modifiedContent, shuffled: shuffleCount };
}

function processFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`  File not found: ${filePath}`);
    return 0;
  }
  
  console.log(`\nProcessing: ${filePath}`);
  const content = fs.readFileSync(filePath, 'utf8');
  
  const { content: newContent, shuffled } = shuffleOptionsForBalance(content, filePath);
  
  if (shuffled > 0 && !dryRun) {
    fs.writeFileSync(filePath, newContent);
    console.log(`  ✓ Saved changes`);
  } else if (shuffled > 0) {
    console.log(`  (dry run - no changes saved)`);
  }
  
  return shuffled;
}

function main() {
  console.log('='.repeat(60));
  console.log('Fix Diagnostic Quiz Answer Bias');
  console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE'}`);
  console.log('='.repeat(60));
  
  let totalShuffled = 0;
  
  for (const file of DIAGNOSTIC_FILES) {
    totalShuffled += processFile(file);
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`Total questions shuffled: ${totalShuffled}`);
  if (dryRun) {
    console.log('(DRY RUN - no files were modified)');
    console.log('Run without --dry-run to apply fixes');
  }
  console.log('='.repeat(60));
}

main();

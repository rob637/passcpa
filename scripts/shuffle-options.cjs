#!/usr/bin/env node
/**
 * Question Option Shuffler
 * 
 * Fixes answer bias by shuffling MCQ options with a deterministic seed.
 * Uses question ID as seed for reproducible results.
 * 
 * Handles both multi-line and single-line option formats.
 * Updates correctAnswer to track the correct option's new position.
 * 
 * Run: node scripts/shuffle-options.cjs [--dry-run] [--course cpa] [--verbose]
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const verbose = args.includes('--verbose');
const filterCourse = args.includes('--course') ? args[args.indexOf('--course') + 1] : null;
const COURSES = filterCourse ? [filterCourse] : ['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp'];

// Deterministic hash from string → number (for seeded shuffle)
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

// Seeded pseudo-random number generator (Lehmer/Park-Miller)
function seededRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function() {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Fisher-Yates shuffle with seeded RNG
function shuffleWithSeed(arr, seed) {
  const rng = seededRandom(seed);
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const stats = {
  filesProcessed: 0,
  filesModified: 0,
  questionsProcessed: 0,
  questionsShuffled: 0,
  answersRemapped: 0,
  errors: 0,
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Check if this is a question file (has options: and correctAnswer:)
  if (!content.includes('correctAnswer:') || !content.includes('options:')) {
    return;
  }
  
  // Skip TBS, CBQ, case study files
  if ((content.includes(': TBS') || content.includes('TBS[]')) && content.includes('scenario:')) return;
  if (content.includes('CBQScenario') && content.includes('scenario:')) return;
  if (content.includes('CaseStudy') || content.includes('WCTask')) return;
  
  stats.filesProcessed++;
  
  // Strategy: find each question block by matching id → options → correctAnswer patterns
  // We look for: options: [...] and correctAnswer: N within each question object
  
  // Find all question blocks with options + correctAnswer
  // Pattern: find options array, then find its corresponding correctAnswer
  
  // We need to process from bottom to top so that index offsets don't shift
  const questionBlocks = [];
  
  // Find each options: [ ... ] block
  const optionsStartRegex = /^(\s*)options:\s*\[/gm;
  let match;
  
  while ((match = optionsStartRegex.exec(content)) !== null) {
    const optStart = match.index;
    const indent = match[1];
    
    // Find the closing ] for this options array
    let bracketDepth = 0;
    let inString = false;
    let stringChar = '';
    let escaped = false;
    let optEnd = -1;
    
    const searchStart = content.indexOf('[', optStart);
    for (let i = searchStart; i < content.length; i++) {
      const char = content[i];
      
      if (escaped) {
        escaped = false;
        continue;
      }
      
      if (char === '\\') {
        escaped = true;
        continue;
      }
      
      if (inString) {
        if (char === stringChar) {
          inString = false;
        }
        continue;
      }
      
      if (char === "'" || char === '"' || char === '`') {
        inString = true;
        stringChar = char;
        continue;
      }
      
      if (char === '[') bracketDepth++;
      if (char === ']') {
        bracketDepth--;
        if (bracketDepth === 0) {
          optEnd = i + 1; // Include the ]
          break;
        }
      }
    }
    
    if (optEnd === -1) continue;
    
    // Extract the full options block text (including options: [...],)
    // Find the trailing comma and possible whitespace
    let fullOptEnd = optEnd;
    while (fullOptEnd < content.length && (content[fullOptEnd] === ',' || content[fullOptEnd] === ' ')) {
      fullOptEnd++;
      if (content[fullOptEnd - 1] === ',') break;
    }
    
    const optionsFullText = content.substring(optStart, fullOptEnd);
    
    // Extract individual option strings from the array content
    const arrayContent = content.substring(searchStart + 1, optEnd - 1);
    const options = [];
    const optionTokens = []; // Full original tokens with quotes, for safe rewriting
    
    // Parse option strings carefully (handle escaped quotes, template literals)
    // Capture both the content AND the full matched token
    const optRegex = /('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/g;
    let optMatch;
    while ((optMatch = optRegex.exec(arrayContent)) !== null) {
      const fullToken = optMatch[1]; // includes quotes
      optionTokens.push(fullToken);
      // Extract content (remove outer quotes and unescape)
      const inner = fullToken.slice(1, -1);
      options.push(inner);
    }
    
    if (options.length < 4) continue; // Skip non-standard questions
    
    // Find the question ID (look backward from options)
    const blockBefore = content.substring(Math.max(0, optStart - 800), optStart);
    const idMatch = blockBefore.match(/id:\s*['"]([^'"]+)['"]/g);
    const questionId = idMatch ? idMatch[idMatch.length - 1].match(/['"]([^'"]+)['"]/)[1] : null;
    
    if (!questionId) continue;
    
    // Find correctAnswer (look forward from options end)
    const blockAfter = content.substring(optEnd, Math.min(content.length, optEnd + 200));
    const correctMatch = blockAfter.match(/correctAnswer:\s*(\d+)/);
    
    if (!correctMatch) continue;
    
    const correctAnswer = parseInt(correctMatch[1]);
    const correctAnswerStart = optEnd + correctMatch.index;
    const correctAnswerEnd = correctAnswerStart + correctMatch[0].length;
    
    if (correctAnswer < 0 || correctAnswer >= options.length) continue;
    
    questionBlocks.push({
      questionId,
      options,
      optionTokens,
      correctAnswer,
      optionsTextStart: optStart,
      optionsTextEnd: fullOptEnd,
      optionsFullText,
      correctAnswerStart,
      correctAnswerEnd,
      correctAnswerFullMatch: correctMatch[0],
      indent,
    });
  }
  
  // Process from bottom to top so index offsets don't shift
  questionBlocks.reverse();
  
  for (const block of questionBlocks) {
    stats.questionsProcessed++;
    
    const { questionId, options, optionTokens, correctAnswer, indent } = block;
    
    // Create index array and shuffle it
    const indices = options.map((_, i) => i);
    const seed = hashCode(questionId);
    const shuffledIndices = shuffleWithSeed(indices, seed);
    
    // Check if shuffle actually changed anything
    const isChanged = shuffledIndices.some((val, idx) => val !== idx);
    if (!isChanged) continue;
    
    stats.questionsShuffled++;
    
    // Find new position of correct answer
    const newCorrectAnswer = shuffledIndices.indexOf(correctAnswer);
    if (newCorrectAnswer !== correctAnswer) stats.answersRemapped++;
    
    // Create shuffled option tokens (preserving original quoting)
    const shuffledTokens = shuffledIndices.map(i => optionTokens[i]);
    
    // Determine if the original was single-line or multi-line
    const isSingleLine = !block.optionsFullText.includes('\n') || 
      (block.optionsFullText.split('\n').length <= 2);
    
    // Reconstruct options text using original tokens (no re-quoting!)
    let newOptionsText;
    if (isSingleLine) {
      newOptionsText = `${indent}options: [${shuffledTokens.join(', ')}],`;
    } else {
      const optIndent = indent + '  ';
      newOptionsText = `${indent}options: [\n${shuffledTokens.map(t => `${optIndent}${t},`).join('\n')}\n${indent}],`;
    }
    
    // Replace correctAnswer
    content = content.substring(0, block.correctAnswerStart) + 
      `correctAnswer: ${newCorrectAnswer}` + 
      content.substring(block.correctAnswerEnd);
    
    // Replace options
    content = content.substring(0, block.optionsTextStart) + 
      newOptionsText + 
      content.substring(block.optionsTextEnd);
    
    modified = true;
    
    if (verbose) {
      console.log(`  ${questionId}: ${correctAnswer} → ${newCorrectAnswer} [${shuffledIndices.join(',')}]`);
    }
  }
  
  if (modified && !dryRun) {
    fs.writeFileSync(filePath, content);
    stats.filesModified++;
  } else if (modified) {
    stats.filesModified++;
  }
}

console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║           QUESTION OPTION SHUFFLER                        ║');
console.log('╚══════════════════════════════════════════════════════════════╝');
if (dryRun) console.log('  ⚡ DRY RUN — no files will be modified\n');

for (const courseId of COURSES) {
  const baseDir = path.join('src/data', courseId);
  if (!fs.existsSync(baseDir)) continue;
  
  console.log(`\n📋 ${courseId.toUpperCase()}:`);
  
  function findTsFiles(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) findTsFiles(full);
      else if (entry.name.endsWith('.ts') && !entry.name.endsWith('index.ts')) {
        processFile(full);
      }
    }
  }
  findTsFiles(baseDir);
}

console.log('\n' + '═'.repeat(64));
console.log('  SHUFFLE RESULTS');
console.log('═'.repeat(64));
console.log(`  Files processed:     ${stats.filesProcessed}`);
console.log(`  Files modified:      ${stats.filesModified}`);
console.log(`  Questions processed: ${stats.questionsProcessed}`);
console.log(`  Questions shuffled:  ${stats.questionsShuffled}`);
console.log(`  Answers remapped:    ${stats.answersRemapped}`);
console.log(`  Errors:              ${stats.errors}`);
if (dryRun) console.log('\n  ⚡ DRY RUN — re-run without --dry-run to apply changes');
console.log('═'.repeat(64));

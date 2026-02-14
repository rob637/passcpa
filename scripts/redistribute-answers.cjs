#!/usr/bin/env node
/**
 * Redistribute Answer Positions
 * 
 * Shuffles MCQ options to achieve ~25% distribution across A/B/C/D
 * while preserving the correct answer.
 * 
 * Uses deterministic shuffle based on question ID for reproducibility.
 * 
 * Usage: node scripts/redistribute-answers.cjs [--dry-run] [--course <course>]
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const courseArg = args.indexOf('--course');
const targetCourse = courseArg !== -1 ? args[courseArg + 1] : null;

const COURSES = targetCourse ? [targetCourse] : ['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp'];

// Seeded random number generator (mulberry32)
function seededRandom(seed) {
  let t = seed + 0x6D2B79F5;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

// Convert string to seed number
function stringToSeed(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

// Get shuffled indices for a question ID
function getShuffledIndices(questionId) {
  const seed = stringToSeed(questionId);
  const indices = [0, 1, 2, 3];
  
  // Fisher-Yates shuffle with seeded random
  for (let i = indices.length - 1; i > 0; i--) {
    const seedVal = seededRandom(seed * 1000 + i);
    const j = Math.floor(seedVal * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  
  return indices;
}

// Process a single question file using line-by-line parsing
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const newLines = [];
  let questionsModified = 0;
  
  let inQuestion = false;
  let inOptions = false;
  let currentQuestionId = null;
  let currentOptions = [];
  let currentCorrectAnswer = null;
  let optionsStartLine = -1;
  let correctAnswerLine = -1;
  let questionLines = [];
  let optionIndent = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect question ID
    const idMatch = line.match(/^\s+id:\s*['"]([^'"]+)['"]/);
    if (idMatch) {
      currentQuestionId = idMatch[1];
      inQuestion = true;
    }
    
    // Detect options array start
    if (inQuestion && line.match(/^\s+options:\s*\[/)) {
      inOptions = true;
      optionsStartLine = i;
      currentOptions = [];
      // Check if options are on the same line
      if (line.includes('],')) {
        // Single-line options array - skip this question (complex format)
        inOptions = false;
      }
      newLines.push(line);
      continue;
    }
    
    // Collect options
    if (inOptions) {
      // Match options with either single or double quotes, preserving the quote style
      const optionMatch = line.match(/^(\s+)(['"])(.*)(\2),?\s*$/);
      if (optionMatch) {
        optionIndent = optionMatch[1];
        const quoteChar = optionMatch[2];
        const optionText = optionMatch[3];
        currentOptions.push({ text: optionText, quote: quoteChar });
        continue; // Don't add yet
      }
      
      // End of options array
      if (line.match(/^\s+\],?\s*$/)) {
        inOptions = false;
        
        // Only shuffle if we have exactly 4 options
        if (currentOptions.length === 4 && currentQuestionId) {
          const shuffledIndices = getShuffledIndices(currentQuestionId);
          const shuffledOptions = shuffledIndices.map(idx => currentOptions[idx]);
          
          // Add shuffled options - preserve original quote style
          for (let j = 0; j < shuffledOptions.length; j++) {
            const comma = j < shuffledOptions.length - 1 ? ',' : '';
            const opt = shuffledOptions[j];
            // Don't re-escape - the content is already properly escaped from source
            newLines.push(`${optionIndent}${opt.quote}${opt.text}${opt.quote}${comma}`);
          }
          
          // Store the mapping: original correct -> new position
          // We'll need this for the correctAnswer line
          questionLines.push({
            questionId: currentQuestionId,
            shuffledIndices: shuffledIndices,
          });
        } else {
          // Put back original options - preserve original quote style
          for (let j = 0; j < currentOptions.length; j++) {
            const comma = j < currentOptions.length - 1 ? ',' : '';
            const opt = currentOptions[j];
            newLines.push(`${optionIndent}${opt.quote}${opt.text}${opt.quote}${comma}`);
          }
        }
        
        newLines.push(line); // The closing ]
        continue;
      }
    }
    
    // Detect and update correctAnswer
    const correctMatch = line.match(/^(\s+correctAnswer:\s*)(\d+)(,?\s*)$/);
    if (correctMatch && questionLines.length > 0) {
      const lastQ = questionLines[questionLines.length - 1];
      if (lastQ.questionId === currentQuestionId) {
        const oldAnswer = parseInt(correctMatch[2], 10);
        // Find where the old correct answer ended up
        const newAnswer = lastQ.shuffledIndices.indexOf(oldAnswer);
        
        if (newAnswer !== oldAnswer) {
          questionsModified++;
        }
        
        newLines.push(`${correctMatch[1]}${newAnswer}${correctMatch[3]}`);
        continue;
      }
    }
    
    // End of question object
    if (inQuestion && line.match(/^\s+\},?\s*$/)) {
      inQuestion = false;
      currentQuestionId = null;
    }
    
    newLines.push(line);
  }
  
  const newContent = newLines.join('\n');
  
  if (newContent !== content && !dryRun) {
    fs.writeFileSync(filePath, newContent);
  }
  
  return questionsModified;
}

// Main
console.log(`Answer Redistribution Script`);
console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE'}`);
console.log(`Courses: ${COURSES.join(', ')}`);
console.log('');

let totalModified = 0;

for (const course of COURSES) {
  const questionsDir = path.join('src/data', course, 'questions');
  
  if (!fs.existsSync(questionsDir)) {
    console.log(`  ${course}: No questions directory`);
    continue;
  }
  
  const files = fs.readdirSync(questionsDir)
    .filter(f => f.endsWith('.ts') && !f.includes('index'));
  
  let courseModified = 0;
  
  for (const file of files) {
    const filePath = path.join(questionsDir, file);
    const modified = processFile(filePath);
    courseModified += modified;
  }
  
  console.log(`  ${course}: ${courseModified} questions shuffled`);
  totalModified += courseModified;
}

console.log('');
console.log(`Total: ${totalModified} questions modified`);

if (dryRun) {
  console.log('\nThis was a dry run. Run without --dry-run to apply changes.');
}

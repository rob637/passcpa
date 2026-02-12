#!/usr/bin/env node
/**
 * Redistribute Answer Positions v2
 * 
 * Shuffles MCQ options to achieve ~25% distribution across A/B/C/D
 * while preserving the correct answer.
 * 
 * Uses deterministic shuffle based on question ID for reproducibility.
 * Handles multi-line options arrays properly.
 * 
 * Usage: node scripts/redistribute-answers-v2.cjs [--dry-run] [--course <course>]
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

// Process file using regex on the whole content
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  let questionsModified = 0;
  
  // Match entire question objects
  // Pattern: { ... id: 'xxx' ... options: [...] ... correctAnswer: N ... }
  const questionBlockRegex = /(\{\s*\n\s+id:\s*['"])([^'"]+)(['"],[\s\S]*?options:\s*\[)([\s\S]*?)(\],[\s\S]*?correctAnswer:\s*)(\d+)(,[\s\S]*?\})/g;
  
  content = content.replace(questionBlockRegex, (match, prefix1, questionId, prefix2, optionsContent, middle, correctAnswerStr, suffix) => {
    // Extract options from the options content
    // Match strings in single or double quotes
    const optionRegex = /(['"])((?:[^'"\\]|\\.)*)(\1)/g;
    const options = [];
    let optMatch;
    
    while ((optMatch = optionRegex.exec(optionsContent)) !== null) {
      options.push({
        quote: optMatch[1],
        text: optMatch[2],
        full: optMatch[0]
      });
    }
    
    // Only shuffle if exactly 4 options
    if (options.length !== 4) {
      return match; // Return unchanged
    }
    
    const correctAnswer = parseInt(correctAnswerStr, 10);
    if (correctAnswer < 0 || correctAnswer > 3) {
      return match; // Invalid correct answer
    }
    
    // Get shuffle order
    const shuffledIndices = getShuffledIndices(questionId);
    
    // Check if shuffle is identity
    if (shuffledIndices.every((idx, i) => idx === i)) {
      return match; // No change needed
    }
    
    // Find new position of correct answer
    const newCorrectAnswer = shuffledIndices.indexOf(correctAnswer);
    
    // Reorder options
    const shuffledOptions = shuffledIndices.map(idx => options[idx]);
    
    // Determine indent from original options content
    const indentMatch = optionsContent.match(/\n(\s+)['"]/);
    const indent = indentMatch ? indentMatch[1] : '      ';
    
    // Build new options content
    const newOptionsContent = '\n' + shuffledOptions.map((opt, i) => {
      const comma = i < 3 ? ',' : '';
      return `${indent}${opt.quote}${opt.text}${opt.quote}${comma}`;
    }).join('\n') + '\n    ';
    
    questionsModified++;
    
    return `${prefix1}${questionId}${prefix2}${newOptionsContent}${middle}${newCorrectAnswer}${suffix}`;
  });
  
  if (content !== originalContent && !dryRun) {
    fs.writeFileSync(filePath, content);
  }
  
  return questionsModified;
}

// Main
console.log(`Answer Redistribution Script v2`);
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

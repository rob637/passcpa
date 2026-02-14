#!/usr/bin/env node
/**
 * COMPREHENSIVE QUESTION ANSWER AUDIT
 * 
 * This script validates all question answers across the entire question bank:
 * 1. Checks correctAnswer is within valid bounds (0-3 for 4 options)
 * 2. Analyzes answer distribution per file and overall
 * 3. Flags files with suspicious distributions (>40% same answer)
 * 4. Identifies questions with potential issues
 * 5. Samples questions for manual verification
 */

const fs = require('fs');
const path = require('path');

// Find all question files
function findQuestionFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      findQuestionFiles(fullPath, files);
    } else if (item.endsWith('.ts') && (item.includes('question') || item.includes('Question'))) {
      files.push(fullPath);
    }
  }
  return files;
}

// Extract questions from a file using regex (handles both array and object exports)
function extractQuestions(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const questions = [];
  
  // Match question objects with correctAnswer field
  // Pattern: looks for objects with id, correctAnswer, options
  const questionPattern = /\{\s*(?:[^{}]*?\bid\s*:\s*['"`]([^'"`]+)['"`][^{}]*?)?correctAnswer\s*:\s*(\d+)[^{}]*?options\s*:\s*\[([\s\S]*?)\][^{}]*?\}/g;
  
  // Simpler approach: find each correctAnswer and count options in the same object context
  const lines = content.split('\n');
  let currentQuestion = null;
  let braceDepth = 0;
  let optionsCount = 0;
  let questionId = null;
  let correctAnswer = null;
  let inOptions = false;
  let optionBraceDepth = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Track question ID
    const idMatch = line.match(/\bid\s*:\s*['"`]([^'"`]+)['"`]/);
    if (idMatch) {
      questionId = idMatch[1];
    }
    
    // Track correctAnswer
    const correctMatch = line.match(/correctAnswer\s*:\s*(\d+)/);
    if (correctMatch) {
      correctAnswer = parseInt(correctMatch[1], 10);
    }
    
    // Track options array
    if (line.includes('options:') && line.includes('[')) {
      inOptions = true;
      optionsCount = 0;
      optionBraceDepth = 0;
    }
    
    if (inOptions) {
      // Count option items - they start with quotes or objects
      const optionMatches = line.match(/['"`][A-D][\).\s]/g) || 
                           line.match(/^\s*['"`][^'"`]{1,200}['"`]\s*,?\s*$/g) ||
                           line.match(/\{\s*id\s*:/g);
      if (optionMatches) {
        optionsCount += optionMatches.length;
      }
      
      // Simple count: look for string options
      const simpleOptions = line.match(/^\s*['"`][^'"`]+['"`]\s*,?\s*$/);
      if (simpleOptions) {
        optionsCount++;
      }
      
      if (line.includes('],')) {
        inOptions = false;
        
        // If we have a complete question, save it
        if (questionId && correctAnswer !== null) {
          questions.push({
            id: questionId,
            correctAnswer: correctAnswer,
            optionsCount: Math.max(optionsCount, 4), // Assume at least 4 options
            line: i + 1
          });
          questionId = null;
          correctAnswer = null;
        }
      }
    }
    
    // Reset on new object (closing brace followed by opening)
    if (line.trim() === '},') {
      if (questionId && correctAnswer !== null) {
        questions.push({
          id: questionId,
          correctAnswer: correctAnswer,
          optionsCount: 4,
          line: i + 1
        });
      }
      questionId = null;
      correctAnswer = null;
      optionsCount = 0;
    }
  }
  
  return questions;
}

// Better extraction using a more robust parser
function extractQuestionsRobust(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const questions = [];
  
  // Find all correctAnswer occurrences with their line numbers
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const correctMatch = line.match(/correctAnswer\s*:\s*(\d+)/);
    
    if (correctMatch) {
      const correctAnswer = parseInt(correctMatch[1], 10);
      
      // Look backwards for the question ID (within last 30 lines)
      let questionId = 'unknown';
      for (let j = i; j >= Math.max(0, i - 30); j--) {
        const idMatch = lines[j].match(/\bid\s*:\s*['"`]([^'"`]+)['"`]/);
        if (idMatch) {
          questionId = idMatch[1];
          break;
        }
      }
      
      // Look for options array (within 20 lines before or after)
      let optionsCount = 4; // default
      for (let j = Math.max(0, i - 20); j < Math.min(lines.length, i + 20); j++) {
        if (lines[j].includes('options:')) {
          // Count until we find the closing bracket
          let count = 0;
          for (let k = j; k < Math.min(lines.length, j + 15); k++) {
            // Count string options
            const stringOpts = (lines[k].match(/^\s*['"`][^'"`]+['"`]\s*,?\s*$/g) || []).length;
            // Count object options
            const objOpts = (lines[k].match(/\{\s*(?:id|text)\s*:/g) || []).length;
            count += stringOpts + objOpts;
            
            if (lines[k].includes('],') || (lines[k].trim() === ']' || lines[k].includes('],'))) {
              break;
            }
          }
          if (count > 0) optionsCount = count;
          break;
        }
      }
      
      questions.push({
        id: questionId,
        correctAnswer,
        optionsCount,
        line: i + 1
      });
    }
  }
  
  return questions;
}

// Main audit
console.log('=' .repeat(80));
console.log('QUESTION ANSWER INTEGRITY AUDIT');
console.log('=' .repeat(80));
console.log('');

const dataDir = path.join(process.cwd(), 'src/data');
const questionFiles = findQuestionFiles(dataDir);

console.log(`Found ${questionFiles.length} question files\n`);

let totalQuestions = 0;
let totalIssues = 0;
const overallDistribution = { 0: 0, 1: 0, 2: 0, 3: 0 };
const fileResults = [];
const allIssues = [];

for (const filePath of questionFiles) {
  const relativePath = path.relative(process.cwd(), filePath);
  const questions = extractQuestionsRobust(filePath);
  
  if (questions.length === 0) continue;
  
  const distribution = { 0: 0, 1: 0, 2: 0, 3: 0 };
  const issues = [];
  
  for (const q of questions) {
    // Check bounds
    if (q.correctAnswer < 0 || q.correctAnswer > 3) {
      issues.push({
        id: q.id,
        line: q.line,
        issue: `correctAnswer ${q.correctAnswer} out of bounds (expected 0-3)`,
        severity: 'ERROR'
      });
    } else {
      distribution[q.correctAnswer]++;
      overallDistribution[q.correctAnswer]++;
    }
    
    // Check if correctAnswer exceeds options count
    if (q.correctAnswer >= q.optionsCount) {
      issues.push({
        id: q.id,
        line: q.line,
        issue: `correctAnswer ${q.correctAnswer} exceeds options count ${q.optionsCount}`,
        severity: 'ERROR'
      });
    }
  }
  
  totalQuestions += questions.length;
  
  // Calculate percentages
  const total = questions.length;
  const percentages = {};
  for (const key of [0, 1, 2, 3]) {
    percentages[key] = ((distribution[key] / total) * 100).toFixed(1);
  }
  
  // Flag suspicious distributions
  let suspicious = false;
  let suspiciousReason = '';
  for (const key of [0, 1, 2, 3]) {
    if (parseFloat(percentages[key]) > 40) {
      suspicious = true;
      suspiciousReason = `Answer ${['A', 'B', 'C', 'D'][key]} is ${percentages[key]}%`;
    }
  }
  
  fileResults.push({
    file: relativePath,
    count: questions.length,
    distribution,
    percentages,
    suspicious,
    suspiciousReason,
    issues
  });
  
  if (issues.length > 0) {
    totalIssues += issues.length;
    allIssues.push(...issues.map(i => ({ ...i, file: relativePath })));
  }
}

// Print Summary
console.log('-'.repeat(80));
console.log('OVERALL DISTRIBUTION');
console.log('-'.repeat(80));
const overallTotal = Object.values(overallDistribution).reduce((a, b) => a + b, 0);
console.log(`Total Questions Analyzed: ${overallTotal}`);
console.log('');
console.log('Answer | Count  | Percentage');
console.log('-------|--------|------------');
for (const [key, count] of Object.entries(overallDistribution)) {
  const pct = ((count / overallTotal) * 100).toFixed(1);
  const letter = ['A', 'B', 'C', 'D'][key];
  const bar = '█'.repeat(Math.round(pct / 2));
  console.log(`   ${letter}   | ${String(count).padStart(6)} | ${pct.padStart(5)}% ${bar}`);
}

// Expected: ~25% each for random distribution
const expectedPct = 25;
const tolerance = 10; // Allow 15-35%
console.log('');
console.log(`Expected: ~25% each (tolerance: ${expectedPct - tolerance}% - ${expectedPct + tolerance}%)`);

let overallHealthy = true;
for (const [key, count] of Object.entries(overallDistribution)) {
  const pct = (count / overallTotal) * 100;
  if (pct < expectedPct - tolerance || pct > expectedPct + tolerance) {
    overallHealthy = false;
    console.log(`⚠️  Answer ${['A', 'B', 'C', 'D'][key]} is outside expected range: ${pct.toFixed(1)}%`);
  }
}

if (overallHealthy) {
  console.log('✅ Overall distribution looks healthy!');
}

// Print files with suspicious distributions
console.log('');
console.log('-'.repeat(80));
console.log('FILES WITH SUSPICIOUS DISTRIBUTIONS (>40% same answer)');
console.log('-'.repeat(80));

const suspiciousFiles = fileResults.filter(f => f.suspicious);
if (suspiciousFiles.length === 0) {
  console.log('✅ No files with suspicious distributions found!');
} else {
  for (const f of suspiciousFiles) {
    console.log(`\n⚠️  ${f.file}`);
    console.log(`   Questions: ${f.count}`);
    console.log(`   Issue: ${f.suspiciousReason}`);
    console.log(`   Distribution: A=${f.percentages[0]}% B=${f.percentages[1]}% C=${f.percentages[2]}% D=${f.percentages[3]}%`);
  }
}

// Print critical errors
console.log('');
console.log('-'.repeat(80));
console.log('CRITICAL ERRORS (correctAnswer out of bounds)');
console.log('-'.repeat(80));

const criticalErrors = allIssues.filter(i => i.severity === 'ERROR');
if (criticalErrors.length === 0) {
  console.log('✅ No critical errors found!');
} else {
  console.log(`❌ Found ${criticalErrors.length} critical errors:\n`);
  for (const err of criticalErrors.slice(0, 20)) {
    console.log(`  ${err.file}:${err.line}`);
    console.log(`    ID: ${err.id}`);
    console.log(`    Issue: ${err.issue}`);
  }
  if (criticalErrors.length > 20) {
    console.log(`  ... and ${criticalErrors.length - 20} more`);
  }
}

// Per-file breakdown
console.log('');
console.log('-'.repeat(80));
console.log('PER-FILE DISTRIBUTION');
console.log('-'.repeat(80));
console.log('');
console.log('File'.padEnd(60) + ' | Count |  A%  |  B%  |  C%  |  D%  | Status');
console.log('-'.repeat(60) + '-|-------|------|------|------|------|-------');

for (const f of fileResults.sort((a, b) => b.count - a.count)) {
  const name = f.file.length > 58 ? '...' + f.file.slice(-55) : f.file;
  const status = f.suspicious ? '⚠️' : '✅';
  console.log(
    `${name.padEnd(60)} | ${String(f.count).padStart(5)} | ${f.percentages[0].padStart(4)} | ${f.percentages[1].padStart(4)} | ${f.percentages[2].padStart(4)} | ${f.percentages[3].padStart(4)} | ${status}`
  );
}

// Final Summary
console.log('');
console.log('='.repeat(80));
console.log('AUDIT SUMMARY');
console.log('='.repeat(80));
console.log(`Total Questions: ${totalQuestions}`);
console.log(`Total Files: ${fileResults.length}`);
console.log(`Critical Errors: ${criticalErrors.length}`);
console.log(`Suspicious Files: ${suspiciousFiles.length}`);
console.log('');

if (criticalErrors.length === 0 && suspiciousFiles.length === 0 && overallHealthy) {
  console.log('🎉 AUDIT PASSED - Question answers appear to be intact!');
} else {
  console.log('⚠️  AUDIT FOUND ISSUES - Review the details above.');
}

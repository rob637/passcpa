#!/usr/bin/env node
/**
 * Detailed whyWrong accuracy check for all exams (EA, CMA, CIA, CISA, CFP)
 * Same exact logic as cpa-accuracy-issues-detailed.cjs
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'content');
const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

// Look for all questions.json files in a directory recursively
function findQuestionFiles(baseDir) {
  const files = [];
  
  function recurse(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const fullPath = path.join(dir, e.name);
      if (e.isDirectory()) {
        recurse(fullPath);
      } else if (e.name === 'questions.json') {
        files.push(fullPath);
      }
    }
  }
  
  recurse(baseDir);
  return files;
}

function checkQuestion(q) {
  if (!q.whyWrong) return null;
  
  const correctAnswer = q.correctAnswer;
  const problems = [];
  
  for (const [key, text] of Object.entries(q.whyWrong)) {
    if (typeof text !== 'string') continue;
    const idx = parseInt(key, 10);
    if (isNaN(idx) || idx < 0 || idx > 5) continue;
    
    const expectedLetter = optionLetters[idx];
    const isCorrectOption = idx === correctAnswer;
    
    // Check: does this option's explanation say THIS option is correct/wrong?
    // Pattern: "Option A is correct" or "A is the correct answer"
    const correctPattern = new RegExp(`(?:option\\s+${expectedLetter}|^${expectedLetter})\\s+is\\s+(?:the\\s+)?correct`, 'i');
    const wrongPattern = new RegExp(`(?:option\\s+${expectedLetter}|^${expectedLetter})\\s+is\\s+(?:the\\s+)?(?:in)?correct|wrong`, 'i');
    
    // If this is a WRONG option, it should not say it's correct
    if (!isCorrectOption && correctPattern.test(text)) {
      problems.push({ option: expectedLetter, issue: 'MARKED_CORRECT_BUT_WRONG' });
    }
    
    // If this is the CORRECT option, it should not say it's wrong
    if (isCorrectOption && /\bis\s+(?:incorrect|wrong)\b/i.test(text) && !correctPattern.test(text)) {
      problems.push({ option: expectedLetter, issue: 'MARKED_WRONG_BUT_CORRECT' });
    }
  }
  
  return problems.length > 0 ? { id: q.id, problems } : null;
}

// Exams to check (excluding CPA which was already done)
const EXAMS = ['ea', 'cma', 'cia', 'cisa', 'cfp'];

console.log('=== Detailed WhyWrong Accuracy Audit ===\n');

let grandTotal = 0;
let grandIssues = 0;

for (const exam of EXAMS) {
  const examDir = path.join(CONTENT_DIR, exam);
  
  if (!fs.existsSync(examDir)) {
    console.log(`${exam.toUpperCase()}: Directory not found at ${examDir}`);
    continue;
  }
  
  const files = findQuestionFiles(examDir);
  
  let examTotal = 0;
  let examIssues = 0;
  const issueDetails = [];
  
  for (const file of files) {
    try {
      const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
      const questions = data.questions || [];
      examTotal += questions.length;
      
      for (const q of questions) {
        const result = checkQuestion(q);
        if (result) {
          examIssues++;
          issueDetails.push({
            id: result.id,
            problems: result.problems,
            file: path.relative(CONTENT_DIR, file)
          });
        }
      }
    } catch (err) {
      // Skip unparseable files
    }
  }
  
  grandTotal += examTotal;
  grandIssues += examIssues;
  
  const pct = examTotal > 0 ? ((examIssues / examTotal) * 100).toFixed(2) : '0.00';
  console.log(`${exam.toUpperCase()}: ${examTotal.toLocaleString()} questions, ${examIssues} issues (${pct}%)`);
  
  if (issueDetails.length > 0) {
    issueDetails.forEach(item => {
      console.log(`  - ${item.id} [${item.problems.map(p => p.issue).join(', ')}]`);
    });
  }
  
  console.log('');
}

console.log('---');
console.log(`TOTAL: ${grandTotal.toLocaleString()} questions across ${EXAMS.length} exams`);
console.log(`ISSUES: ${grandIssues} (${grandTotal > 0 ? ((grandIssues / grandTotal) * 100).toFixed(2) : 0}%)`);

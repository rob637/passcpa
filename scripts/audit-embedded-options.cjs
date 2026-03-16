#!/usr/bin/env node
/**
 * Audit script: Find questions where answer options (A/B/C/D) are embedded in the question text.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const files = execSync('find content -name questions.json', { encoding: 'utf8' }).trim().split('\n');

let total = 0;
let affected = 0;
const byCourse = {};
const byFile = {};

for (const file of files) {
  try {
    const raw = fs.readFileSync(file, 'utf8');
    const data = JSON.parse(raw);
    
    // Handle different structures
    let questions;
    if (data.questions && Array.isArray(data.questions)) {
      questions = data.questions;
    } else if (Array.isArray(data)) {
      questions = data;
    } else {
      console.log('Unknown structure in', file, '- top keys:', Object.keys(data).join(', '));
      continue;
    }
    
    const course = file.split('/')[1];
    if (!byCourse[course]) byCourse[course] = { total: 0, affected: 0 };
    
    let fileAffected = 0;
    for (const q of questions) {
      total++;
      byCourse[course].total++;
      const text = q.question || q.text || q.stem || '';
      
      // Pattern 1: A) B) C) D)
      const hasLetterParen = (/\bA\)/.test(text) && /\bB\)/.test(text) && /\bC\)/.test(text) && /\bD\)/.test(text));
      // Pattern 2: (A) (B) (C) (D)
      const hasParenLetter = (/\(A\)/.test(text) && /\(B\)/.test(text) && /\(C\)/.test(text) && /\(D\)/.test(text));
      
      if (hasLetterParen || hasParenLetter) {
        affected++;
        byCourse[course].affected++;
        fileAffected++;
      }
    }
    
    if (fileAffected > 0) {
      byFile[file] = { total: questions.length, affected: fileAffected };
    }
  } catch (e) {
    console.error('Error parsing', file + ':', e.message);
  }
}

console.log('');
console.log('========================================');
console.log('QUESTIONS WITH EMBEDDED ANSWER OPTIONS');
console.log('========================================');
console.log('');
console.log(`Total questions scanned: ${total.toLocaleString()}`);
console.log(`Total affected:          ${affected.toLocaleString()} (${(affected/total*100).toFixed(1)}%)`);
console.log('');
console.log('BY COURSE:');
console.log('-'.repeat(50));
for (const [course, info] of Object.entries(byCourse).sort((a, b) => b[1].affected - a[1].affected)) {
  const pct = (info.affected / info.total * 100).toFixed(1);
  console.log(`${course.toUpperCase().padEnd(8)} ${String(info.affected).padStart(5)} / ${String(info.total).padStart(6)}  (${pct.padStart(5)}%)`);
}
console.log('');
console.log('BY FILE (sorted by # affected):');
console.log('-'.repeat(70));
for (const [file, info] of Object.entries(byFile).sort((a, b) => b[1].affected - a[1].affected)) {
  const pct = (info.affected / info.total * 100).toFixed(1);
  console.log(`${String(info.affected).padStart(4)} / ${String(info.total).padStart(5)}  (${pct.padStart(5)}%)  ${file}`);
}

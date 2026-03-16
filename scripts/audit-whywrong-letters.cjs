#!/usr/bin/env node
/**
 * Audit whyWrong explanations for mismatched option letter references
 * e.g., whyWrong["2"] says "option A is WRONG" when it should say "option D is WRONG"
 */

const fs = require('fs');
const path = require('path');

let mismatchedCount = 0;
let totalWithWhyWrong = 0;
let totalExplanations = 0;

const exams = ['cpa', 'ea', 'cma', 'cia', 'cfp', 'cisa'];
const examMismatches = {};
const examples = [];

for (const exam of exams) {
  const examDir = path.join('content', exam);
  examMismatches[exam] = 0;
  
  if (!fs.existsSync(examDir)) continue;
  
  const sections = fs.readdirSync(examDir).filter(d => {
    const stat = fs.statSync(path.join(examDir, d));
    return stat.isDirectory();
  });
  
  for (const section of sections) {
    const qFile = path.join(examDir, section, 'questions.json');
    if (!fs.existsSync(qFile)) continue;
    
    const data = JSON.parse(fs.readFileSync(qFile, 'utf8'));
    const questions = data.questions || [];
    
    for (const q of questions) {
      if (!q.whyWrong || typeof q.whyWrong !== 'object') continue;
      totalWithWhyWrong++;
      
      const correctIdx = q.correctAnswer;
      const wrongIndices = [0, 1, 2, 3].filter(i => i !== correctIdx);
      
      for (const [key, explanation] of Object.entries(q.whyWrong)) {
        if (explanation === null || explanation === undefined) continue;
        if (typeof explanation !== 'string') continue;
        
        totalExplanations++;
        const keyNum = parseInt(key, 10);
        if (isNaN(keyNum) || keyNum >= wrongIndices.length) continue;
        
        const actualWrongIdx = wrongIndices[keyNum];
        const actualLetter = String.fromCharCode(65 + actualWrongIdx);
        
        // Check for "option X is WRONG" pattern
        const letterMatch = explanation.match(/option ([A-D]) is WRONG/i);
        if (letterMatch) {
          const mentionedLetter = letterMatch[1].toUpperCase();
          if (mentionedLetter !== actualLetter) {
            mismatchedCount++;
            examMismatches[exam]++;
            
            if (examples.length < 5) {
              examples.push({
                id: q.id,
                section: q.section,
                key,
                expected: actualLetter,
                found: mentionedLetter,
                text: explanation.substring(0, 100)
              });
            }
          }
        }
      }
    }
  }
}

console.log('=== Mismatched "option X is WRONG" explanations ===\n');
for (const [exam, count] of Object.entries(examMismatches)) {
  console.log(`${exam.toUpperCase()}: ${count}`);
}
console.log('---');
console.log(`TOTAL mismatches: ${mismatchedCount}`);
console.log(`Total questions with whyWrong: ${totalWithWhyWrong}`);
console.log(`Total explanations checked: ${totalExplanations}`);

if (examples.length > 0) {
  console.log('\n=== Examples ===');
  for (const ex of examples) {
    console.log(`\n${ex.id} (${ex.section})`);
    console.log(`  Key: ${ex.key}, Expected: ${ex.expected}, Found: ${ex.found}`);
    console.log(`  Text: ${ex.text}...`);
  }
}

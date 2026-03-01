#!/usr/bin/env node
/**
 * Fix mismatched option letter references in whyWrong explanations
 * 
 * The whyWrong object uses numeric keys (0, 1, 2) representing wrong option ORDER.
 * But the text often says "option A is WRONG" when it should say the actual letter.
 * 
 * This script fixes the letter references to match the actual option index.
 */

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const VERBOSE = process.argv.includes('--verbose');

let fixedCount = 0;
let totalFixed = 0;
const exams = ['cpa', 'ea', 'cma', 'cia', 'cfp', 'cisa'];

console.log(DRY_RUN ? '=== DRY RUN MODE ===' : '=== FIXING MISMATCHED OPTION LETTERS ===\n');

for (const exam of exams) {
  const examDir = path.join('content', exam);
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
    let sectionFixed = 0;
    
    for (const q of questions) {
      if (!q.whyWrong || typeof q.whyWrong !== 'object') continue;
      
      const correctIdx = q.correctAnswer;
      const wrongIndices = [0, 1, 2, 3].filter(i => i !== correctIdx);
      
      for (const [key, explanation] of Object.entries(q.whyWrong)) {
        if (explanation === null || explanation === undefined) continue;
        if (typeof explanation !== 'string') continue;
        
        const keyNum = parseInt(key, 10);
        if (isNaN(keyNum) || keyNum >= wrongIndices.length) continue;
        
        const actualWrongIdx = wrongIndices[keyNum];
        const actualLetter = String.fromCharCode(65 + actualWrongIdx);
        
        // Pattern: "option X is WRONG" or "Why option X is WRONG"
        const letterMatch = explanation.match(/((?:Why )?option )([A-D])( is WRONG)/i);
        if (letterMatch) {
          const mentionedLetter = letterMatch[2].toUpperCase();
          if (mentionedLetter !== actualLetter) {
            // Fix it
            const fixedExplanation = explanation.replace(
              /((?:Why )?option )([A-D])( is WRONG)/i,
              `$1${actualLetter}$3`
            );
            q.whyWrong[key] = fixedExplanation;
            sectionFixed++;
            fixedCount++;
            
            if (VERBOSE) {
              console.log(`  Fixed ${q.id}: key ${key}, ${mentionedLetter} → ${actualLetter}`);
            }
          }
        }
      }
    }
    
    if (sectionFixed > 0) {
      totalFixed += sectionFixed;
      console.log(`${exam.toUpperCase()}/${section}: Fixed ${sectionFixed} explanations`);
      
      if (!DRY_RUN) {
        fs.writeFileSync(qFile, JSON.stringify(data, null, 2) + '\n');
      }
    }
  }
}

console.log('\n---');
console.log(`Total explanations fixed: ${totalFixed}`);
if (DRY_RUN) {
  console.log('\nRun without --dry-run to apply changes.');
}

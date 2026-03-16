/**
 * Fix whyWrong contradictions identified in audit
 * 
 * 5 questions have mismatches between correctAnswer and whyWrong:
 * 1. far-d14-005: correctAnswer should be 0 (A), not 1 (B)
 * 2. far-d16-010: correctAnswer should be 2 (C), not 0 (A) 
 * 3. far-d5-016: correctAnswer should be 1 (B), not 0 (A)
 * 4. far-ext-liab-002: correctAnswer should be 0 (A), not 3 (D)
 * 5. bar-ta-003: correctAnswer=3 is correct, but whyWrong text needs fixing
 */

const fs = require('fs');
const path = require('path');

const fixes = [
  {
    file: 'content/cpa/far/questions.json',
    id: 'far-d14-005',
    fix: { correctAnswer: 0 },
    reason: 'Explanation says $3.20 (option A) is correct for diluted EPS'
  },
  {
    file: 'content/cpa/far/questions.json',
    id: 'far-d16-010',
    fix: { correctAnswer: 2 },
    reason: 'Explanation says $15K loss + $25K receivable (option C)'
  },
  {
    file: 'content/cpa/far/questions.json',
    id: 'far-d5-016',
    fix: { correctAnswer: 1 },
    reason: 'Net effect = $120K (option B per explanation)'
  },
  {
    file: 'content/cpa/far/questions.json',
    id: 'far-ext-liab-002',
    fix: { correctAnswer: 0 },
    reason: 'Ending liability = $30K - $15K = $15K (option A)'
  },
  {
    file: 'content/cpa/bar/questions.json',
    id: 'bar-ta-003',
    fix: {
      whyWrong: {
        "0": "Why option A is CORRECT in isolation - The present value of lease payments being at least 90% of the asset's fair value IS a valid finance lease criterion under ASC 842-10-25-2(d). However, this question asks which options list valid criteria.",
        "1": "Why option B is CORRECT in isolation - Ownership transfer and a purchase option reasonably certain to be exercised are both valid finance lease criteria under ASC 842-10-25-2(a) and (b).",
        "2": "Why option C is CORRECT in isolation - A lease term for the major part (≥75%) of the asset's remaining economic life IS a valid finance lease criterion under ASC 842-10-25-2(c).",
        "3": "Why option D is CORRECT - Since options A, B, and C ALL describe valid finance lease criteria under ASC 842, 'All of the above' is the most complete and correct answer."
      }
    },
    reason: 'All whyWrong entries were garbled; D is correct because A, B, C all describe valid criteria'
  }
];

function loadJson(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(content);
}

function saveJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function main() {
  console.log('Fixing whyWrong contradictions...\n');
  
  // Group fixes by file
  const fileGroups = {};
  for (const fix of fixes) {
    if (!fileGroups[fix.file]) {
      fileGroups[fix.file] = [];
    }
    fileGroups[fix.file].push(fix);
  }
  
  let totalFixed = 0;
  
  for (const [file, fileFixes] of Object.entries(fileGroups)) {
    const fullPath = path.join(process.cwd(), file);
    console.log(`Processing ${file}...`);
    
    const data = loadJson(fullPath);
    
    for (const fix of fileFixes) {
      const question = data.questions.find(q => q.id === fix.id);
      if (!question) {
        console.log(`  ❌ Question ${fix.id} not found!`);
        continue;
      }
      
      const oldCorrect = question.correctAnswer;
      
      // Apply fix
      if (fix.fix.correctAnswer !== undefined) {
        question.correctAnswer = fix.fix.correctAnswer;
        console.log(`  ✅ ${fix.id}: correctAnswer ${oldCorrect} → ${fix.fix.correctAnswer}`);
        console.log(`     Reason: ${fix.reason}`);
      }
      
      if (fix.fix.whyWrong) {
        question.whyWrong = fix.fix.whyWrong;
        console.log(`  ✅ ${fix.id}: whyWrong entries rewritten`);
        console.log(`     Reason: ${fix.reason}`);
      }
      
      totalFixed++;
    }
    
    saveJson(fullPath, data);
    console.log(`  Saved ${file}\n`);
  }
  
  console.log(`\n✅ Fixed ${totalFixed} contradictions`);
}

main();

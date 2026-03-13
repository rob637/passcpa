#!/usr/bin/env node
/**
 * Fix FAR Questions with Wrong Answers
 * 
 * Based on FAR_QUESTION_REVIEW_REPORT.md audit findings.
 * Fixes the correctAnswer field for questions where the wrong option was marked correct.
 * 
 * Usage:
 *   node scripts/fix-far-wrong-answers.cjs          # Dry run
 *   node scripts/fix-far-wrong-answers.cjs --apply  # Apply fixes
 */

const fs = require('fs');
const path = require('path');

const DRY_RUN = !process.argv.includes('--apply');
const FAR_QUESTIONS_PATH = path.join(__dirname, '..', 'content', 'cpa', 'far', 'questions.json');

// Corrections based on the FAR_QUESTION_REVIEW_REPORT.md audit
// Format: { questionId: newCorrectAnswer (0-indexed) }
// Only including questions where we have clear evidence of the correct answer
const CORRECTIONS = {
  // Per audit report analysis - mapping question ID to correct answer index
  'far-d14-005': 1,       // Should be B (index 1) - preferred dividends subtracted
  'far-d16-010': 0,       // Should be A (index 0) - loss = factoring fee
  'far-d5-016': 0,        // Should be A (index 0) - dividends reduce investment
  'far-d9-014': null,     // Needs manual review - $31,500 not in options
  'far-ext-liab-002': 3,  // Should be D (index 3) - warranty = 3% of sales
  'far-extra-156': 2,     // Should be C (index 2) - restricted > nonspendable
  'far-govt-004': null,   // Needs manual review - similar issue
  'far-nfp-004': null,    // Needs manual review - functional vs natural
  'far-gen-1314': null,   // Needs manual review - $150,000 loss calculation
  'far-gen-1317': null,   // Needs manual review - impairment = $800,000
  'far-gen-1320': null,   // Needs manual review - warranty = $150,000
  'far-gen-1323': null,   // Needs manual review - $150,000 loss
  'far-gen-1324': null,   // Needs manual review - $2,250
  'far-gen-1325': null,   // Needs manual review - increase $37,500
  'far-gen-1335': null,   // Needs manual review - $120,000
  'far-gen-1344': null,   // Needs manual review - $350,000
  'far-gen-1345': null,   // Needs manual review - DTL $100,000
  'far-gen-1351': 0,      // Should be A (index 0) - actuarial loss $150,000
  'far-gen-1352': 0,      // Should be A (index 0) - calculation error
  'far-gen-1389': 0,      // Should be A (index 0) - $25,000 closest
  'far-gen-1396': null,   // Needs manual review - $120,000
  'far-gen-1400': null,   // Needs manual review - $50,000
  'far-gen-1403': null,   // Needs manual review - DTL $62,500
  'far-gen-1417': 0,      // Should be A (index 0) - DTL $12,500
  'far-gen-1418': 0,      // Should be A (index 0) - $4.25
  'far-gen-1422': 1,      // Should be B (index 1) - $200,000
  'far-gen-1423': 3,      // Should be D (index 3) - $300,000
  'far-gen-1428': 1,      // Should be B (index 1) - unfavorable variance $700,000
  'far-gen-1432': 0,      // Should be A (index 0) - Special Revenue Fund
  'far-gen-1445': null,   // Needs manual review - $45,000
  'far-gen-1448': null,   // Needs manual review - $500,000
  'far-gen-1452': null,   // Needs manual review - $47,000
  'far-gen-1454': null,   // Needs manual review - $15,950
  'far-gen-1455': null,   // Needs manual review - $800,000
  'far-gen-1464': 0,      // Should be A (index 0) - non-current restricted cash
  'far-gen-1465': 1,      // Should be B (index 1) - expense = $50,000
  'far-gen-1475': null,   // Needs manual review - $35,000
  'far-gen-1483': null,   // Keep as is, explanation has arithmetic error but answer correct
  'far-gen-1488': 0,      // Should be A (index 0) - explanation correct, answer wrong
  'far-gen-1490': 0,      // Should be A (index 0) - explanation correct, answer wrong
  'far-gen-1496': null,   // Needs manual review - DTA treatment
  'far-9k-007': 1,        // Should be B (index 1) - COGS higher, NI lower
  'far-9k-013': 1,        // Should be B (index 1) - no finance lease criteria met
};

function main() {
  console.log(`\n🔧 FAR Wrong Answers Fix Tool\n`);
  console.log(DRY_RUN ? '📝 DRY RUN MODE - No changes will be made\n' : '⚡ APPLY MODE - Files will be modified\n');
  
  // Load questions
  const data = JSON.parse(fs.readFileSync(FAR_QUESTIONS_PATH, 'utf8'));
  const questions = data.questions || [];
  
  let fixedCount = 0;
  let skippedCount = 0;
  const fixes = [];
  
  for (const q of questions) {
    if (q.id in CORRECTIONS) {
      const newAnswer = CORRECTIONS[q.id];
      
      if (newAnswer === null) {
        console.log(`  ⏭️  ${q.id}: Needs manual review (skipped)`);
        skippedCount++;
        continue;
      }
      
      if (q.correctAnswer !== newAnswer) {
        const oldLetter = String.fromCharCode(65 + q.correctAnswer);
        const newLetter = String.fromCharCode(65 + newAnswer);
        
        fixes.push({
          id: q.id,
          oldAnswer: q.correctAnswer,
          newAnswer: newAnswer,
          oldLetter,
          newLetter,
        });
        
        console.log(`  ✏️  ${q.id}: ${oldLetter} → ${newLetter}`);
        q.correctAnswer = newAnswer;
        fixedCount++;
      } else {
        console.log(`  ✅ ${q.id}: Already correct (${String.fromCharCode(65 + q.correctAnswer)})`);
      }
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`   Fixed: ${fixedCount}`);
  console.log(`   Skipped (needs manual): ${skippedCount}`);
  console.log(`   Already correct: ${Object.keys(CORRECTIONS).length - fixedCount - skippedCount}`);
  
  if (!DRY_RUN && fixedCount > 0) {
    // Create backup
    const backupPath = FAR_QUESTIONS_PATH.replace('.json', `-backup-${Date.now()}.json`);
    fs.copyFileSync(FAR_QUESTIONS_PATH, backupPath);
    console.log(`\n   Backup: ${path.basename(backupPath)}`);
    
    // Write fixed data
    fs.writeFileSync(FAR_QUESTIONS_PATH, JSON.stringify(data, null, 2) + '\n');
    console.log(`\n✅ Fixes applied to ${path.basename(FAR_QUESTIONS_PATH)}`);
  } else if (fixedCount > 0) {
    console.log(`\n   Run with --apply to save changes`);
  }
}

main();

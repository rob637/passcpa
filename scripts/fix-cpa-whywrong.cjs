#!/usr/bin/env node
/**
 * Fix CPA Question whyWrong Labeling Issues
 * 
 * Problem: whyWrong text has systematic off-by-one letter references
 * - Key 0 has "option B" instead of "option A"
 * - Key 1 has "option C" instead of "option B"  
 * - etc.
 * 
 * Solution:
 * 1. Parse each whyWrong entry to find the claimed letter
 * 2. Replace with the correct letter for that key index
 * 3. Fix CORRECT/WRONG labels based on correctAnswer
 * 
 * Safety:
 * - Creates backup of all files before modification
 * - Dry-run mode by default (use --apply to actually fix)
 * - Generates detailed log of all changes
 * 
 * Usage:
 *   node scripts/fix-cpa-whywrong.cjs          # Dry run - shows what would change
 *   node scripts/fix-cpa-whywrong.cjs --apply  # Actually apply fixes
 */

const fs = require('fs');
const path = require('path');

const DRY_RUN = !process.argv.includes('--apply');
const SECTIONS = ['far', 'aud', 'reg', 'bar', 'isc', 'tcp'];
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'cpa');
const BACKUP_DIR = path.join(__dirname, '..', 'content', 'cpa', '_backup_whywrong_fix');
const LOG_FILE = path.join(__dirname, '..', 'docs', 'CPA_WHYWRONG_FIX_LOG.md');

const INDEX_TO_LETTER = ['A', 'B', 'C', 'D', 'E', 'F'];

const stats = {
  questionsProcessed: 0,
  questionsFixed: 0,
  entriesFixed: 0,
  letterFixes: 0,
  correctWrongFixes: 0,
  bySection: {},
};

const changeLog = [];

/**
 * Create backup of all question files
 */
function createBackups() {
  if (DRY_RUN) return;
  
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  
  for (const section of SECTIONS) {
    const srcPath = path.join(CONTENT_DIR, section, 'questions.json');
    const backupPath = path.join(BACKUP_DIR, `${section}-questions-${timestamp}.json`);
    
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, backupPath);
      console.log(`  Backed up: ${section}/questions.json`);
    }
  }
}

/**
 * Fix a single whyWrong entry
 * Returns { fixed: boolean, newText: string, changes: string[] }
 */
function fixWhyWrongEntry(keyIndex, text, correctAnswer) {
  const changes = [];
  let newText = text;
  const expectedLetter = INDEX_TO_LETTER[keyIndex];
  const isCorrectOption = keyIndex === correctAnswer;
  
  // Pattern to match "option X" or "Option X" 
  const letterPattern = /\b(option\s+)([A-F])(\b)/gi;
  
  // Find all letter references in the text
  const matches = [...text.matchAll(letterPattern)];
  
  if (matches.length > 0) {
    // Check if the first letter reference matches the expected letter
    const firstMatch = matches[0];
    const claimedLetter = firstMatch[2].toUpperCase();
    
    if (claimedLetter !== expectedLetter) {
      // Replace all instances of the wrong letter with the correct one
      newText = newText.replace(letterPattern, (match, prefix, letter, suffix) => {
        // Only replace if it matches the systematic pattern
        const letterUpper = letter.toUpperCase();
        // Map the claimed letter to what it should be
        const claimedIdx = INDEX_TO_LETTER.indexOf(letterUpper);
        if (claimedIdx >= 0 && claimedIdx === keyIndex + 1) {
          // This is the off-by-one pattern - fix it
          changes.push(`Letter: "${prefix}${letter}" → "${prefix}${expectedLetter}"`);
          stats.letterFixes++;
          return `${prefix}${expectedLetter}${suffix}`;
        }
        return match;
      });
    }
  }
  
  // Fix CORRECT/WRONG labeling
  const correctWrongPattern = /\b(is\s+)(CORRECT|WRONG|correct|wrong)(\b)/i;
  const cwMatch = newText.match(correctWrongPattern);
  
  if (cwMatch) {
    const currentLabel = cwMatch[2].toUpperCase();
    const expectedLabel = isCorrectOption ? 'CORRECT' : 'WRONG';
    
    if (currentLabel !== expectedLabel) {
      newText = newText.replace(correctWrongPattern, (match, prefix, label, suffix) => {
        changes.push(`Label: "is ${label}" → "is ${expectedLabel}"`);
        stats.correctWrongFixes++;
        return `${prefix}${expectedLabel}${suffix}`;
      });
    }
  }
  
  return {
    fixed: changes.length > 0,
    newText,
    changes,
  };
}

/**
 * Process a single section
 */
function processSection(section) {
  const filePath = path.join(CONTENT_DIR, section, 'questions.json');
  
  if (!fs.existsSync(filePath)) {
    console.log(`  Skipping ${section}: file not found`);
    return;
  }
  
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const questions = data.questions || [];
  
  let sectionFixes = 0;
  
  for (const question of questions) {
    stats.questionsProcessed++;
    
    if (!question.whyWrong) continue;
    
    let questionFixed = false;
    const questionChanges = [];
    
    for (const [key, text] of Object.entries(question.whyWrong)) {
      const keyIndex = parseInt(key, 10);
      
      const { fixed, newText, changes } = fixWhyWrongEntry(
        keyIndex, 
        text, 
        question.correctAnswer
      );
      
      if (fixed) {
        question.whyWrong[key] = newText;
        questionFixed = true;
        stats.entriesFixed++;
        questionChanges.push({
          option: INDEX_TO_LETTER[keyIndex],
          changes,
          before: text.substring(0, 100),
          after: newText.substring(0, 100),
        });
      }
    }
    
    if (questionFixed) {
      stats.questionsFixed++;
      sectionFixes++;
      
      changeLog.push({
        id: question.id,
        section: section.toUpperCase(),
        correctAnswer: question.correctAnswer,
        correctLetter: INDEX_TO_LETTER[question.correctAnswer],
        changes: questionChanges,
      });
    }
  }
  
  stats.bySection[section.toUpperCase()] = sectionFixes;
  
  // Save the fixed data
  if (!DRY_RUN && sectionFixes > 0) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
    console.log(`  Fixed ${sectionFixes} questions in ${section.toUpperCase()}`);
  } else {
    console.log(`  Would fix ${sectionFixes} questions in ${section.toUpperCase()}`);
  }
}

/**
 * Generate change log markdown
 */
function generateLog() {
  const timestamp = new Date().toISOString();
  
  let log = `# CPA whyWrong Fix Log

**Generated:** ${timestamp}
**Mode:** ${DRY_RUN ? 'DRY RUN (no changes made)' : 'APPLIED'}

## Summary

| Metric | Count |
|--------|-------|
| Questions Processed | ${stats.questionsProcessed.toLocaleString()} |
| Questions Fixed | ${stats.questionsFixed} |
| whyWrong Entries Fixed | ${stats.entriesFixed} |
| Letter References Fixed | ${stats.letterFixes} |
| CORRECT/WRONG Labels Fixed | ${stats.correctWrongFixes} |

### By Section

| Section | Questions Fixed |
|---------|-----------------|
${Object.entries(stats.bySection).map(([s, c]) => `| ${s} | ${c} |`).join('\n')}

---

## Change Details

`;

  // Group by section
  const bySection = {};
  for (const change of changeLog.slice(0, 100)) { // Limit to first 100 for readability
    if (!bySection[change.section]) {
      bySection[change.section] = [];
    }
    bySection[change.section].push(change);
  }
  
  for (const [section, changes] of Object.entries(bySection)) {
    log += `### ${section}\n\n`;
    
    for (const change of changes.slice(0, 20)) { // Limit per section
      log += `#### \`${change.id}\` (correct: ${change.correctLetter})\n\n`;
      
      for (const c of change.changes) {
        log += `- **Option ${c.option}:** ${c.changes.join(', ')}\n`;
      }
      log += '\n';
    }
    
    if (changes.length > 20) {
      log += `*...and ${changes.length - 20} more in ${section}*\n\n`;
    }
  }
  
  if (changeLog.length > 100) {
    log += `\n*Log truncated. Total changes: ${changeLog.length}*\n`;
  }
  
  // Write log
  fs.writeFileSync(LOG_FILE, log);
  console.log(`\nLog written to: ${LOG_FILE}`);
}

/**
 * Main
 */
function main() {
  console.log('🔧 CPA whyWrong Fix Tool\n');
  
  if (DRY_RUN) {
    console.log('⚠️  DRY RUN MODE - No changes will be made');
    console.log('   Use --apply to actually fix the files\n');
  } else {
    console.log('📝 APPLY MODE - Files will be modified\n');
    console.log('Creating backups...');
    createBackups();
    console.log('');
  }
  
  console.log('Processing sections...');
  
  for (const section of SECTIONS) {
    processSection(section);
  }
  
  console.log('\n📊 Summary:');
  console.log(`   Questions processed: ${stats.questionsProcessed.toLocaleString()}`);
  console.log(`   Questions ${DRY_RUN ? 'to fix' : 'fixed'}: ${stats.questionsFixed}`);
  console.log(`   whyWrong entries ${DRY_RUN ? 'to fix' : 'fixed'}: ${stats.entriesFixed}`);
  console.log(`   Letter references: ${stats.letterFixes}`);
  console.log(`   CORRECT/WRONG labels: ${stats.correctWrongFixes}`);
  
  generateLog();
  
  if (DRY_RUN) {
    console.log('\n✅ Dry run complete. Run with --apply to make changes.');
  } else {
    console.log('\n✅ Fixes applied successfully!');
    console.log(`   Backups saved in: ${BACKUP_DIR}`);
  }
}

main();

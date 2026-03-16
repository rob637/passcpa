#!/usr/bin/env node
/**
 * Flashcard Consolidation Script
 * 
 * Consolidates multiple batch files into single per-section files.
 * For example: cisa1-flashcards.ts + cisa1-flashcards-batch2.ts + cisa1-flashcards-batch3.ts
 *              → cisa1-flashcards.ts (combined)
 * 
 * Usage:
 *   node scripts/consolidate-flashcards.cjs --dry-run     # Preview
 *   node scripts/consolidate-flashcards.cjs               # Apply changes
 *   node scripts/consolidate-flashcards.cjs --course=cisa # Single course
 */

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const SINGLE_COURSE = process.argv.find(a => a.startsWith('--course='))?.split('=')[1];

// Courses to consolidate (these have batch files)
const COURSES_TO_CONSOLIDATE = ['cisa', 'cia'];
const DATA_DIR = path.join(__dirname, '..', 'src', 'data');

// Stats
const stats = {
  coursesProcessed: 0,
  sectionsConsolidated: 0,
  filesRemoved: 0,
  cardsConsolidated: 0,
};

/**
 * Extract flashcard array from TypeScript file content
 */
function extractFlashcards(content, filePath) {
  // Find the array content between [ and ]
  // This is a simplified parser - handles most cases
  const arrayStartMatch = content.match(/:\s*\w+\[\]\s*=\s*\[/);
  if (!arrayStartMatch) {
    console.log(`    ⚠ Could not find array start in ${path.basename(filePath)}`);
    return [];
  }
  
  const startIdx = content.indexOf('[', arrayStartMatch.index);
  let depth = 1;
  let endIdx = startIdx + 1;
  
  while (depth > 0 && endIdx < content.length) {
    if (content[endIdx] === '[') depth++;
    else if (content[endIdx] === ']') depth--;
    endIdx++;
  }
  
  const arrayContent = content.substring(startIdx + 1, endIdx - 1);
  
  // Parse individual objects (simplified)
  const objects = [];
  let objDepth = 0;
  let objStart = -1;
  
  for (let i = 0; i < arrayContent.length; i++) {
    if (arrayContent[i] === '{') {
      if (objDepth === 0) objStart = i;
      objDepth++;
    } else if (arrayContent[i] === '}') {
      objDepth--;
      if (objDepth === 0 && objStart >= 0) {
        objects.push(arrayContent.substring(objStart, i + 1));
        objStart = -1;
      }
    }
  }
  
  return objects;
}

/**
 * Get file groupings for a course
 */
function getFileGroups(courseId) {
  const flashcardsDir = path.join(DATA_DIR, courseId, 'flashcards');
  const files = fs.readdirSync(flashcardsDir)
    .filter(f => f.endsWith('.ts') && f !== 'index.ts' && f !== 'types.ts' && f !== 'mnemonics.ts');
  
  const groups = {};
  
  for (const file of files) {
    let section;
    let isPrimary = false;
    
    if (courseId === 'cisa') {
      const match = file.match(/^(cisa\d)-flashcards(-batch\d+)?\.ts$/);
      if (match) {
        section = match[1];
        isPrimary = !match[2]; // No batch suffix = primary file
      }
    } else if (courseId === 'cia') {
      const match = file.match(/^(cia\d)[-_](?:flashcards|gias[-_]2024[-_]flashcards)?(-batch\d+)?\.ts$/);
      if (match) {
        section = match[1];
        isPrimary = !match[2] && !file.includes('gias');
      }
    }
    
    if (section) {
      if (!groups[section]) {
        groups[section] = { primary: null, batches: [] };
      }
      
      if (isPrimary) {
        groups[section].primary = file;
      } else {
        groups[section].batches.push(file);
      }
    }
  }
  
  return groups;
}

/**
 * Consolidate a section's files
 */
function consolidateSection(courseId, section, files) {
  const flashcardsDir = path.join(DATA_DIR, courseId, 'flashcards');
  const { primary, batches } = files;
  
  if (batches.length === 0) {
    return; // Nothing to consolidate
  }
  
  console.log(`\n  [${section.toUpperCase()}] Consolidating ${batches.length + 1} files...`);
  
  // Read primary file
  const primaryPath = path.join(flashcardsDir, primary);
  const primaryContent = fs.readFileSync(primaryPath, 'utf8');
  const primaryCards = extractFlashcards(primaryContent, primaryPath);
  
  console.log(`    Primary (${primary}): ${primaryCards.length} cards`);
  
  // Read batch files
  const allBatchCards = [];
  for (const batch of batches.sort()) {
    const batchPath = path.join(flashcardsDir, batch);
    const batchContent = fs.readFileSync(batchPath, 'utf8');
    const batchCards = extractFlashcards(batchContent, batchPath);
    allBatchCards.push(...batchCards);
    console.log(`    Batch (${batch}): ${batchCards.length} cards`);
  }
  
  const totalCards = primaryCards.length + allBatchCards.length;
  console.log(`    → Combined: ${totalCards} cards`);
  
  stats.cardsConsolidated += totalCards;
  stats.sectionsConsolidated++;
  stats.filesRemoved += batches.length;
  
  if (!DRY_RUN) {
    // Find the closing bracket of the array in primary file
    const arrayStartMatch = primaryContent.match(/:\s*\w+\[\]\s*=\s*\[/);
    const startIdx = primaryContent.indexOf('[', arrayStartMatch.index);
    let depth = 1;
    let endIdx = startIdx + 1;
    
    while (depth > 0 && endIdx < primaryContent.length) {
      if (primaryContent[endIdx] === '[') depth++;
      else if (primaryContent[endIdx] === ']') depth--;
      endIdx++;
    }
    
    // Insert batch cards before the closing bracket
    const beforeArray = primaryContent.substring(0, endIdx - 1);
    const afterArray = primaryContent.substring(endIdx - 1);
    
    // Add comment and batch cards
    const batchComment = `\n  // ============================================\n  // CONSOLIDATED FROM BATCH FILES\n  // ============================================\n`;
    const newContent = beforeArray + batchComment + '  ' + allBatchCards.join(',\n  ') + ',\n' + afterArray;
    
    // Write updated primary file
    fs.writeFileSync(primaryPath, newContent);
    
    // Remove batch files
    for (const batch of batches) {
      fs.unlinkSync(path.join(flashcardsDir, batch));
      console.log(`    ✗ Removed ${batch}`);
    }
    
    console.log(`    ✓ Updated ${primary}`);
  }
}

/**
 * Update index file after consolidation
 */
function updateIndexFile(courseId) {
  const flashcardsDir = path.join(DATA_DIR, courseId, 'flashcards');
  const indexPath = path.join(flashcardsDir, 'index.ts');
  
  if (!fs.existsSync(indexPath)) return;
  
  let indexContent = fs.readFileSync(indexPath, 'utf8');
  
  // Pattern to find batch imports
  const batchImportPattern = new RegExp(`import\\s*\\{[^}]+\\}\\s*from\\s*['\"]\\.\\/[^'"]*-batch\\d+['\"]\\s*;?`, 'g');
  const batchExportPattern = new RegExp(`export\\s*\\{[^}]+\\}\\s*from\\s*['\"]\\.\\/[^'"]*-batch\\d+['\"]\\s*;?`, 'g');
  const batchSpreadPattern = new RegExp(`\\.\\.\\.[a-zA-Z0-9_]+Batch\\d+,?\\s*`, 'g');
  
  // Remove batch-related lines
  let newContent = indexContent
    .replace(batchImportPattern, '// [Consolidated - import removed]')
    .replace(batchExportPattern, '// [Consolidated - export removed]')
    .replace(batchSpreadPattern, '');
  
  // Clean up empty lines created by removals
  newContent = newContent.replace(/(\n\s*){3,}/g, '\n\n');
  newContent = newContent.replace(/\/\/ \[Consolidated[^\n]*\n/g, '');
  
  if (newContent !== indexContent) {
    console.log(`\n  Updating index.ts...`);
    if (!DRY_RUN) {
      fs.writeFileSync(indexPath, newContent);
      console.log(`    ✓ Updated index.ts`);
    } else {
      console.log(`    Would update index.ts`);
    }
  }
}

/**
 * Process a course
 */
function processCourse(courseId) {
  console.log(`\n============================================`);
  console.log(`  ${courseId.toUpperCase()} Consolidation`);
  console.log(`============================================`);
  
  const groups = getFileGroups(courseId);
  
  for (const [section, files] of Object.entries(groups)) {
    if (files.batches.length > 0 && files.primary) {
      consolidateSection(courseId, section, files);
    }
  }
  
  updateIndexFile(courseId);
  stats.coursesProcessed++;
}

/**
 * Main
 */
function main() {
  console.log('============================================');
  console.log('  Flashcard Consolidation Script');
  console.log('============================================');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (preview only)' : 'APPLY CHANGES'}`);
  
  const courses = SINGLE_COURSE ? [SINGLE_COURSE] : COURSES_TO_CONSOLIDATE;
  
  for (const courseId of courses) {
    if (COURSES_TO_CONSOLIDATE.includes(courseId)) {
      processCourse(courseId);
    }
  }
  
  console.log('\n============================================');
  console.log('  Summary');
  console.log('============================================');
  console.log(`Courses processed: ${stats.coursesProcessed}`);
  console.log(`Sections consolidated: ${stats.sectionsConsolidated}`);
  console.log(`Files merged/removed: ${stats.filesRemoved}`);
  console.log(`Total cards consolidated: ${stats.cardsConsolidated}`);
  
  if (DRY_RUN) {
    console.log('\n⚠ DRY RUN - No files were modified');
    console.log('Run without --dry-run to apply changes');
  }
}

main();

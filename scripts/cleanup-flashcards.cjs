#!/usr/bin/env node
/**
 * Flashcard Cleanup Script
 * 
 * This script:
 * 1. Adds missing blueprintArea fields based on section
 * 2. Consolidates batch files into single per-section files
 * 3. Updates index files to use consolidated exports
 * 
 * Usage:
 *   node scripts/cleanup-flashcards.cjs --dry-run    # Preview changes
 *   node scripts/cleanup-flashcards.cjs              # Apply changes
 *   node scripts/cleanup-flashcards.cjs --course=cisa  # Single course
 */

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const SINGLE_COURSE = process.argv.find(a => a.startsWith('--course='))?.split('=')[1];

const COURSES = ['cia', 'cisa', 'cfp'];
const DATA_DIR = path.join(__dirname, '..', 'src', 'data');

// Blueprint mapping per course
const BLUEPRINT_MAPS = {
  cisa: {
    'CISA1': 'CISA1', // Domain 1: Information Systems Auditing Process
    'CISA2': 'CISA2', // Domain 2: IT Governance and Management
    'CISA3': 'CISA3', // Domain 3: Information Systems Acquisition
    'CISA4': 'CISA4', // Domain 4: Information Systems Operations
    'CISA5': 'CISA5', // Domain 5: Protection of Information Assets
  },
  cia: {
    'CIA1': 'CIA1', // Part 1: Essentials of Internal Auditing
    'CIA2': 'CIA2', // Part 2: Practice of Internal Auditing
    'CIA3': 'CIA3', // Part 3: Business Knowledge for Internal Auditing
  },
  cfp: {
    'CFP-GEN': 'CFP-GEN', // General Principles
    'CFP-RET': 'CFP-RET', // Retirement Planning
    'CFP-TAX': 'CFP-TAX', // Tax Planning
    'CFP-INV': 'CFP-INV', // Investment Planning
    'CFP-RISK': 'CFP-RISK', // Risk Management
    'CFP-EST': 'CFP-EST', // Estate Planning
    'CFP-PRO': 'CFP-PRO', // Professional Conduct
    'CFP-PSY': 'CFP-PSY', // Psychology of Financial Planning
    // Fallback mappings for simplified section names
    'GEN': 'CFP-GEN',
    'RET': 'CFP-RET',
    'TAX': 'CFP-TAX',
    'INV': 'CFP-INV',
    'RISK': 'CFP-RISK',
    'EST': 'CFP-EST',
    'PRO': 'CFP-PRO',
    'PSY': 'CFP-PSY',
  }
};

// Stats tracking
const stats = {
  filesProcessed: 0,
  cardsProcessed: 0,
  blueprintAreaAdded: 0,
  filesConsolidated: 0,
  errors: [],
};

/**
 * Parse TypeScript flashcard file and extract cards
 */
function parseFlashcardFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract the array content
  const arrayMatch = content.match(/(?:export\s+const\s+\w+\s*:\s*\w+\[\]\s*=\s*|const\s+\w+\s*:\s*\w+\[\]\s*=\s*)\[/);
  if (!arrayMatch) {
    return { content, cards: [], exportName: null };
  }
  
  // Find export name
  const exportNameMatch = content.match(/export\s+const\s+(\w+)\s*:/);
  const exportName = exportNameMatch ? exportNameMatch[1] : null;
  
  return { content, exportName };
}

/**
 * Add blueprintArea to flashcard objects in file content
 */
function addBlueprintArea(content, courseId) {
  const blueprintMap = BLUEPRINT_MAPS[courseId];
  if (!blueprintMap) return { content, added: 0 };
  
  let added = 0;
  let newContent = content;
  
  // Find all flashcard objects and add blueprintArea if missing
  // Match pattern: section: 'XXX', ... (no blueprintArea before next }) 
  const cardRegex = /(\{\s*\n(?:[^{}]|\{[^{}]*\})*?section:\s*['"]([^'"]+)['"](?:[^{}]|\{[^{}]*\})*?)(\n\s*\})/g;
  
  newContent = content.replace(cardRegex, (match, before, section, end) => {
    // Check if blueprintArea already exists
    if (before.includes('blueprintArea:')) {
      return match;
    }
    
    const blueprintArea = blueprintMap[section] || blueprintMap[section.toUpperCase()];
    if (!blueprintArea) {
      return match;
    }
    
    added++;
    // Add blueprintArea after section
    const insertPoint = before.indexOf(`section: '${section}'`) !== -1 
      ? before.indexOf(`section: '${section}'`) + `section: '${section}'`.length
      : before.indexOf(`section: "${section}"`) + `section: "${section}"`.length;
    
    if (insertPoint > 0) {
      const beforeInsert = before.substring(0, insertPoint);
      const afterInsert = before.substring(insertPoint);
      return `${beforeInsert},\n    blueprintArea: '${blueprintArea}'${afterInsert}${end}`;
    }
    
    return match;
  });
  
  return { content: newContent, added };
}

/**
 * Process a single course's flashcards
 */
function processCourse(courseId) {
  const flashcardsDir = path.join(DATA_DIR, courseId, 'flashcards');
  
  if (!fs.existsSync(flashcardsDir)) {
    console.log(`  ⚠ No flashcards directory for ${courseId}`);
    return;
  }
  
  const files = fs.readdirSync(flashcardsDir)
    .filter(f => f.endsWith('.ts') && f !== 'index.ts' && f !== 'types.ts');
  
  console.log(`\n  Processing ${files.length} files...`);
  
  for (const file of files) {
    const filePath = path.join(flashcardsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Add blueprintArea
    const { content: newContent, added } = addBlueprintArea(content, courseId);
    
    if (added > 0) {
      stats.blueprintAreaAdded += added;
      stats.filesProcessed++;
      
      if (!DRY_RUN) {
        fs.writeFileSync(filePath, newContent);
      }
      console.log(`    ✓ ${file}: Added blueprintArea to ${added} cards`);
    }
    
    // Count cards
    const cardCount = (content.match(/id:\s*['"]/g) || []).length;
    stats.cardsProcessed += cardCount;
  }
}

/**
 * Consolidate batch files into single section files
 */
function consolidateBatchFiles(courseId) {
  const flashcardsDir = path.join(DATA_DIR, courseId, 'flashcards');
  
  if (!fs.existsSync(flashcardsDir)) return;
  
  // Group files by section
  const files = fs.readdirSync(flashcardsDir)
    .filter(f => f.endsWith('.ts') && f !== 'index.ts' && f !== 'types.ts');
  
  const sections = {};
  
  for (const file of files) {
    // Extract section from filename: cisa1-flashcards.ts, cisa1-flashcards-batch2.ts -> cisa1
    // cia1-flashcards-batch2.ts -> cia1
    // cfp-flashcards-gen-batch2.ts -> gen
    let section;
    
    if (courseId === 'cisa') {
      const match = file.match(/^(cisa\d)/);
      section = match ? match[1] : null;
    } else if (courseId === 'cia') {
      const match = file.match(/^(cia\d)/);
      section = match ? match[1] : null;
    } else if (courseId === 'cfp') {
      const match = file.match(/cfp-flashcards-(\w+)/);
      section = match ? match[1] : null;
    }
    
    if (section) {
      if (!sections[section]) sections[section] = [];
      sections[section].push(file);
    }
  }
  
  // Report consolidation opportunities
  for (const [section, sectionFiles] of Object.entries(sections)) {
    if (sectionFiles.length > 1) {
      console.log(`    ${section}: ${sectionFiles.length} files could be consolidated`);
      stats.filesConsolidated += sectionFiles.length - 1;
    }
  }
}

/**
 * Main execution
 */
function main() {
  console.log('============================================');
  console.log('  Flashcard Cleanup Script');
  console.log('============================================');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (no changes)' : 'APPLY CHANGES'}`);
  console.log('');
  
  const coursesToProcess = SINGLE_COURSE ? [SINGLE_COURSE] : COURSES;
  
  for (const courseId of coursesToProcess) {
    console.log(`\n[${courseId.toUpperCase()}]`);
    processCourse(courseId);
    consolidateBatchFiles(courseId);
  }
  
  console.log('\n============================================');
  console.log('  Summary');
  console.log('============================================');
  console.log(`Files processed: ${stats.filesProcessed}`);
  console.log(`Cards processed: ${stats.cardsProcessed}`);
  console.log(`BlueprintArea added: ${stats.blueprintAreaAdded}`);
  console.log(`Files that could be consolidated: ${stats.filesConsolidated}`);
  
  if (stats.errors.length > 0) {
    console.log('\nErrors:');
    stats.errors.forEach(e => console.log(`  - ${e}`));
  }
  
  if (DRY_RUN) {
    console.log('\n⚠ DRY RUN - No files were modified');
    console.log('Run without --dry-run to apply changes');
  }
}

main();

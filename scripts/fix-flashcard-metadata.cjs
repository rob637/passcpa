/**
 * Comprehensive flashcard metadata fixer
 * Adds missing section, type, difficulty, and topic fields
 * 
 * Run with: node scripts/fix-flashcard-metadata.cjs
 */

const fs = require('fs');
const path = require('path');

let totalChanges = 0;
let filesFixed = 0;

// Section mapping based on filename patterns
function inferSection(filePath, content) {
  const fileName = path.basename(filePath).toLowerCase();
  
  // CPA
  if (fileName.includes('far')) return 'FAR';
  if (fileName.includes('aud')) return 'AUD';
  if (fileName.includes('reg')) return 'REG';
  if (fileName.includes('bar')) return 'BAR';
  if (fileName.includes('isc')) return 'ISC';
  if (fileName.includes('tcp')) return 'TCP';
  
  // EA
  if (fileName.includes('see1')) return 'SEE1';
  if (fileName.includes('see2')) return 'SEE2';
  if (fileName.includes('see3')) return 'SEE3';
  
  // CMA
  if (fileName.includes('cma1')) return 'CMA1';
  if (fileName.includes('cma2')) return 'CMA2';
  
  // CIA
  if (fileName.includes('cia1')) return 'CIA1';
  if (fileName.includes('cia2')) return 'CIA2';
  if (fileName.includes('cia3')) return 'CIA3';
  
  // CISA
  if (fileName.includes('cisa1')) return 'CISA1';
  if (fileName.includes('cisa2')) return 'CISA2';
  if (fileName.includes('cisa3')) return 'CISA3';
  if (fileName.includes('cisa4')) return 'CISA4';
  if (fileName.includes('cisa5')) return 'CISA5';
  
  // CFP - check for domain code in content
  if (filePath.includes('/cfp/')) {
    if (fileName.includes('gen')) return 'CFP-GEN';
    if (fileName.includes('inv')) return 'CFP-INV';
    if (fileName.includes('ret')) return 'CFP-RET';
    if (fileName.includes('tax')) return 'CFP-TAX';
    if (fileName.includes('est')) return 'CFP-EST';
    if (fileName.includes('risk') || fileName.includes('ris')) return 'CFP-RIS';
    if (fileName.includes('pro')) return 'CFP-PRO';
    if (fileName.includes('psy')) return 'CFP-PSY';
  }
  
  // For mnemonics files, check the parent folder
  if (fileName === 'mnemonics.ts') {
    if (filePath.includes('/cisa/')) return 'CISA1';
    if (filePath.includes('/cfp/')) return 'CFP-GEN';
    if (filePath.includes('/cpa/')) return 'FAR';
    if (filePath.includes('/ea/')) return 'SEE1';
    if (filePath.includes('/cma/')) return 'CMA1';
    if (filePath.includes('/cia/')) return 'CIA1';
  }
  
  return null;
}

function processFile(filePath) {
  // Skip index.ts and types.ts files
  const fileName = path.basename(filePath);
  if (fileName === 'index.ts' || fileName === 'types.ts') {
    return false;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  const section = inferSection(filePath, content);
  
  // Check if file contains flashcard array structure
  if (!content.includes('front:') || !content.includes('back:')) {
    return false;
  }
  
  // Add section field if missing
  if (!content.includes('section:') && section) {
    // Add section after id field
    content = content.replace(
      /^(    id:\s*'[^']+',)\n(    front:)/gm,
      `$1\n    section: '${section}',\n$2`
    );
    modified = true;
    totalChanges++;
  }
  
  // Add type field if missing (after section or after id)
  if (!content.includes("type:") && content.includes('front:')) {
    // Try to add after section first
    if (content.includes('section:')) {
      content = content.replace(
        /^(    section:\s*'[^']+',)\n(    front:)/gm,
        `$1\n    type: 'concept',\n$2`
      );
    } else {
      // Add after id
      content = content.replace(
        /^(    id:\s*'[^']+',)\n(    front:)/gm,
        `$1\n    type: 'concept',\n$2`
      );
    }
    modified = true;
    totalChanges++;
  }
  
  // Add difficulty field if missing (before tags or at end of object)
  if (!content.includes('difficulty:') && content.includes('front:')) {
    if (content.includes('tags:')) {
      content = content.replace(
        /^(    (?:back|category|topic):\s*(?:'[^']*'|`[^`]*`),)\n(    tags:)/gm,
        `$1\n    difficulty: 'medium',\n$2`
      );
    }
    modified = true;
    totalChanges++;
  }
  
  // Rename category to topic if needed
  if (content.includes('category:') && !content.includes('topic:')) {
    content = content.replace(/^(    )category:/gm, '$1topic:');
    modified = true;
    totalChanges++;
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    filesFixed++;
    return true;
  }
  return false;
}

console.log('Fixing flashcard metadata across all exams...\n');

const COURSES = ['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp'];

for (const course of COURSES) {
  const flashcardsDir = path.join('src/data', course, 'flashcards');
  if (!fs.existsSync(flashcardsDir)) continue;
  
  const files = fs.readdirSync(flashcardsDir).filter(f => f.endsWith('.ts'));
  
  for (const file of files) {
    const filePath = path.join(flashcardsDir, file);
    if (processFile(filePath)) {
      console.log(`✓ ${filePath}`);
    }
  }
}

console.log(`\n✅ Made ${totalChanges} changes across ${filesFixed} files`);

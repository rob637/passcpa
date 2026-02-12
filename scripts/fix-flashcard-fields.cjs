/**
 * Fix flashcard structure to match standard schema
 * - CFP: domain -> section, category -> topic, add type: 'concept'
 * - CISA mnemonics: add section, type, difficulty
 * 
 * Run with: node scripts/fix-flashcard-fields.cjs
 */

const fs = require('fs');
const path = require('path');

let changesMade = 0;
let filesFixed = 0;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  let modified = false;
  
  // CFP domain -> section mapping
  const domainToSection = {
    'GEN': 'CFP-GEN',
    'INV': 'CFP-INV',
    'RET': 'CFP-RET',
    'TAX': 'CFP-TAX',
    'EST': 'CFP-EST',
    'RIS': 'CFP-RIS',
    'PRO': 'CFP-PRO',
    'PSY': 'CFP-PSY',
  };
  
  // Rename domain to section and update value
  for (const [domain, section] of Object.entries(domainToSection)) {
    const pattern = new RegExp(`domain: '${domain}'`, 'g');
    if (content.match(pattern)) {
      content = content.replace(pattern, `section: '${section}'`);
      modified = true;
    }
  }
  
  // Rename category to topic
  if (content.includes("category:") && !content.includes("topic:")) {
    content = content.replace(/^(    )category:/gm, '$1topic:');
    modified = true;
  }
  
  // Add type: 'concept' after section if type is missing
  if (!content.includes("type:") && content.includes("section:")) {
    content = content.replace(
      /^(    section:\s*'[^']+',)\n(    (?:topic|category|front):)/gm,
      `$1\n    type: 'concept',\n$2`
    );
    modified = true;
  }
  
  // Add difficulty: 'medium' if missing (for files that have front/back but no difficulty)
  if (!content.includes("difficulty:") && content.includes("front:")) {
    content = content.replace(
      /^(    back:\s*(?:'[^']*'|`[^`]*`),)\n(    tags:)/gm,
      `$1\n    difficulty: 'medium',\n$2`
    );
    modified = true;
  }
  
  // Handle CISA mnemonics - add section based on filename
  if (fileName === 'mnemonics.ts' && filePath.includes('cisa')) {
    if (!content.includes("section:")) {
      content = content.replace(
        /^(    id:\s*'[^']+',)\n(    front:)/gm,
        `$1\n    section: 'CISA1',\n    type: 'mnemonic',\n$2`
      );
      modified = true;
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    changesMade++;
    filesFixed++;
    return true;
  }
  return false;
}

console.log('Fixing flashcard structure across all exams...\n');

// Process CFP flashcards
const cfpDir = 'src/data/cfp/flashcards';
const cfpFiles = fs.readdirSync(cfpDir).filter(f => f.endsWith('.ts') && f.includes('flashcard'));
for (const file of cfpFiles) {
  if (processFile(path.join(cfpDir, file))) {
    console.log(`✓ CFP: ${file}`);
  }
}

// Process CISA mnemonics
const cisaMnemonics = 'src/data/cisa/flashcards/mnemonics.ts';
if (fs.existsSync(cisaMnemonics) && processFile(cisaMnemonics)) {
  console.log(`✓ CISA: mnemonics.ts`);
}

console.log(`\n✅ Fixed ${filesFixed} files`);

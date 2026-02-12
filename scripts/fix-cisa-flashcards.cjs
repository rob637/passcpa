/**
 * Fix CISA flashcard structure to match standard schema
 * Adds: section, type, difficulty based on existing data
 * Run with: node scripts/fix-cisa-flashcards.cjs
 */

const fs = require('fs');
const path = require('path');

const flashcardsDir = 'src/data/cisa/flashcards';
let totalFixed = 0;
let filesFixed = 0;

// Domain mapping
const domainSections = {
  'cisa1': 'CISA1',
  'cisa2': 'CISA2',
  'cisa3': 'CISA3',
  'cisa4': 'CISA4',
  'cisa5': 'CISA5',
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  let changesMade = 0;
  
  // Determine section from filename
  let section = 'CISA1';
  for (const [key, value] of Object.entries(domainSections)) {
    if (fileName.includes(key)) {
      section = value;
      break;
    }
  }
  
  // Add section after id if missing
  if (!content.includes("section:")) {
    content = content.replace(
      /^(    id:\s*'[^']+',)\n/gm,
      `$1\n    section: '${section}',\n`
    );
    changesMade++;
  }
  
  // Add type: 'concept' after section or id if missing
  if (!content.includes("type:")) {
    content = content.replace(
      /^(    (id|section):\s*'[^']+',)\n(    front:)/gm,
      `$1\n    type: 'concept',\n$3`
    );
    changesMade++;
  }
  
  // Add difficulty: 'medium' after back if missing
  if (!content.includes("difficulty:")) {
    content = content.replace(
      /^(    back:\s*'[^']*'(?:,)?\n)(    category)/gm,
      `$1    difficulty: 'medium',\n$2`
    );
    // Also handle case where back is multiline
    content = content.replace(
      /^(    back:\s*`[^`]*`,?\n)(    category)/gm,
      `$1    difficulty: 'medium',\n$2`
    );
    changesMade++;
  }
  
  // Rename category to topic
  if (content.includes("category:")) {
    content = content.replace(/category:/g, 'topic:');
    changesMade++;
  }
  
  if (changesMade > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalFixed += changesMade;
    return true;
  }
  return false;
}

console.log('Fixing CISA flashcard structure...\n');

const files = fs.readdirSync(flashcardsDir)
  .filter(f => f.endsWith('.ts') && f.includes('flashcard') && f !== 'types.ts' && f !== 'index.ts');

for (const file of files) {
  const filePath = path.join(flashcardsDir, file);
  if (processFile(filePath)) {
    filesFixed++;
    console.log(`✓ ${file}`);
  }
}

console.log(`\n✅ Applied ${totalFixed} fixes across ${filesFixed} files`);

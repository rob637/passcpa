/**
 * Fix uppercase flashcard IDs - convert to lowercase
 * Run with: node scripts/fix-flashcard-ids.cjs
 */

const fs = require('fs');
const path = require('path');

const COURSES = ['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp'];
let totalFixed = 0;
let filesFixed = 0;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changeMade = false;
  
  // Convert uppercase flashcard IDs to lowercase
  // Pattern: id: 'SEE1-EXP-001' -> id: 'see1-exp-001'
  content = content.replace(
    /^(    id:\s*['"])([A-Z][A-Z0-9-]+)(['"],?)/gm,
    (match, prefix, id, suffix) => {
      changeMade = true;
      totalFixed++;
      return `${prefix}${id.toLowerCase()}${suffix}`;
    }
  );
  
  if (changeMade) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

console.log('Converting uppercase flashcard IDs to lowercase...\n');

for (const course of COURSES) {
  const flashcardsDir = path.join('src/data', course, 'flashcards');
  if (!fs.existsSync(flashcardsDir)) continue;
  
  const files = fs.readdirSync(flashcardsDir)
    .filter(f => f.endsWith('.ts') && !f.endsWith('index.ts') && f !== 'types.ts');
  
  for (const file of files) {
    const filePath = path.join(flashcardsDir, file);
    if (processFile(filePath)) {
      filesFixed++;
      console.log(`✓ ${path.relative(process.cwd(), filePath)}`);
    }
  }
}

console.log(`\n✅ Fixed ${totalFixed} uppercase IDs across ${filesFixed} files`);

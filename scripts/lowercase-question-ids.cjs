/**
 * Script to convert question IDs to lowercase
 * Run with: node scripts/lowercase-question-ids.cjs
 * 
 * AFFECTS: CIA, CISA, CFP questions (currently have uppercase IDs)
 * NOTE: May require Firestore migration if users have question history with old IDs
 */

const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changeMade = false;
  
  // Convert uppercase question IDs to lowercase
  // Pattern: id: 'CIA1-001' -> id: 'cia1-001'
  //          id: 'CISA1-001' -> id: 'cisa1-001'
  //          id: 'CFP-GEN-001' -> id: 'cfp-gen-001'
  content = content.replace(
    /id:\s*['"]([A-Z][A-Z0-9-]+)['"]/g,
    (match, id) => {
      changeMade = true;
      return `id: '${id.toLowerCase()}'`;
    }
  );
  
  if (changeMade) {
    fs.writeFileSync(filePath, content, 'utf8');
    return { status: 'updated' };
  }
  
  return { status: 'no-change' };
}

function processDirectory(dirPath, results) {
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath, results);
    } else if (item.endsWith('.ts') && item !== 'index.ts') {
      const result = processFile(fullPath);
      if (result.status === 'updated') {
        results.updated++;
        console.log(`✓ ${path.relative(process.cwd(), fullPath)}`);
      } else {
        results.noChange++;
      }
    }
  }
}

const results = { updated: 0, noChange: 0 };

// Process CIA, CISA, CFP question directories
console.log('Converting uppercase IDs to lowercase...\n');
processDirectory('src/data/cia/questions', results);
processDirectory('src/data/cisa/questions', results);
processDirectory('src/data/cfp/questions', results);

console.log(`\nSummary: ${results.updated} files updated, ${results.noChange} unchanged`);
console.log('\n⚠️  NOTE: If users have question history, you may need to migrate Firestore data.');

/**
 * Fix duplicate question IDs by appending unique suffix
 * Run with: node scripts/fix-duplicate-ids.cjs 
 */

const fs = require('fs');
const path = require('path');

const COURSES = ['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp'];
const seenIds = new Map(); // id -> first file
const duplicates = []; // { file, id, lineNum }

function extractIdsWithLines(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const ids = [];
  
  lines.forEach((line, idx) => {
    const match = line.match(/^    id:\s*['"]([^'"]+)['"]/);
    if (match) {
      ids.push({ id: match[1], lineNum: idx + 1 });
    }
  });
  
  return ids;
}

function fixDuplicatesInFile(filePath, dupsInFile) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  for (const { id, suffix } of dupsInFile) {
    const oldPattern = `id: '${id}'`;
    const newId = `${id}-${suffix}`;
    const newPattern = `id: '${newId}'`;
    
    // Only replace first occurrence
    content = content.replace(oldPattern, newPattern);
    console.log(`  ${id} -> ${newId}`);
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
}

// Scan all files to find duplicates
console.log('Scanning for duplicate IDs...\n');

for (const course of COURSES) {
  const questionsDir = path.join('src/data', course, 'questions');
  if (!fs.existsSync(questionsDir)) continue;
  
  const files = fs.readdirSync(questionsDir, { recursive: true })
    .filter(f => f.endsWith('.ts') && !f.endsWith('index.ts'));
  
  for (const file of files) {
    const filePath = path.join(questionsDir, file);
    if (!fs.statSync(filePath).isFile()) continue;
    
    const ids = extractIdsWithLines(filePath);
    
    for (const { id, lineNum } of ids) {
      if (seenIds.has(id)) {
        duplicates.push({ 
          file: filePath, 
          id, 
          lineNum,
          firstFile: seenIds.get(id)
        });
      } else {
        seenIds.set(id, filePath);
      }
    }
  }
}

console.log(`Found ${duplicates.length} duplicate IDs\n`);

if (duplicates.length === 0) {
  console.log('No duplicates to fix!');
  process.exit(0);
}

// Group by file for efficient fixing
const byFile = {};
for (const dup of duplicates) {
  if (!byFile[dup.file]) {
    byFile[dup.file] = [];
  }
  // Create unique suffix based on occurrence count
  const existingCount = byFile[dup.file].filter(d => d.id === dup.id).length;
  byFile[dup.file].push({
    ...dup,
    suffix: `v${existingCount + 2}` // v2, v3, etc.
  });
}

// Fix each file
console.log('Fixing duplicates...\n');
let filesFixed = 0;
let idsFixed = 0;

for (const [filePath, dupsInFile] of Object.entries(byFile)) {
  console.log(`${path.relative(process.cwd(), filePath)}:`);
  fixDuplicatesInFile(filePath, dupsInFile);
  filesFixed++;
  idsFixed += dupsInFile.length;
}

console.log(`\n✅ Fixed ${idsFixed} duplicate IDs across ${filesFixed} files`);

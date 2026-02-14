/**
 * Script to add courseId: 'cpa' to all CPA questions
 * Run with: node scripts/add-courseid-cpa.cjs
 */

const fs = require('fs');
const path = require('path');

const CPA_QUESTIONS_DIR = path.join(__dirname, '../src/data/cpa/questions');

function addCourseIdToFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Skip if already has courseId
  if (content.includes("courseId: 'cpa'") || content.includes('courseId: "cpa"')) {
    return { file: filePath, status: 'skipped', reason: 'already has courseId' };
  }
  
  // Pattern: after "id: 'xxx'," add "courseId: 'cpa',"
  // Match: id: 'something', followed by newline and section:
  const pattern = /(id:\s*['"][^'"]+['"],\s*\n)(\s*)(section:)/g;
  
  let modified = false;
  const newContent = content.replace(pattern, (match, idLine, indent, sectionLine) => {
    modified = true;
    return `${idLine}${indent}courseId: 'cpa',\n${indent}${sectionLine}`;
  });
  
  if (modified) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    return { file: filePath, status: 'updated' };
  }
  
  return { file: filePath, status: 'no-match', reason: 'pattern not found' };
}

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  const results = { updated: 0, skipped: 0, noMatch: 0 };
  
  for (const file of files) {
    if (!file.endsWith('.ts') || file === 'index.ts') continue;
    
    const filePath = path.join(dirPath, file);
    const result = addCourseIdToFile(filePath);
    
    if (result.status === 'updated') {
      results.updated++;
      console.log(`✓ Updated: ${file}`);
    } else if (result.status === 'skipped') {
      results.skipped++;
    } else {
      results.noMatch++;
      console.log(`⚠ No match: ${file}`);
    }
  }
  
  console.log(`\nSummary: ${results.updated} updated, ${results.skipped} skipped, ${results.noMatch} no-match`);
}

processDirectory(CPA_QUESTIONS_DIR);

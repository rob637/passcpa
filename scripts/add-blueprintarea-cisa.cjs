/**
 * Script to add blueprintArea to CISA questions based on filename and section
 * Run with: node scripts/add-blueprintarea-cisa.cjs
 */

const fs = require('fs');
const path = require('path');

const CISA_QUESTIONS_DIR = path.join(__dirname, '../src/data/cisa/questions');

function addBlueprintAreaToFile(filePath) {
  const filename = path.basename(filePath);
  let content = fs.readFileSync(filePath, 'utf8');
  
  let changeMade = false;
  
  // Pattern: Find questions with section: 'CISAx' followed by difficulty (no blueprintArea)
  // and add blueprintArea based on the section value
  content = content.replace(
    /(section:\s*['"])(CISA\d)(['"]\s*,\s*\n)(\s*)(difficulty:)/g, 
    (match, prefix, section, suffix, indent, difficultyLine) => {
      changeMade = true;
      return `${prefix}${section}${suffix}${indent}blueprintArea: '${section}',\n${indent}${difficultyLine}`;
    }
  );
  
  if (changeMade) {
    fs.writeFileSync(filePath, content, 'utf8');
    return { file: filePath, status: 'updated' };
  }
  
  return { file: filePath, status: 'no-change' };
}

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  const results = { updated: 0, noChange: 0 };
  
  for (const file of files) {
    if (!file.endsWith('.ts') || file === 'index.ts') continue;
    
    const filePath = path.join(dirPath, file);
    const result = addBlueprintAreaToFile(filePath);
    
    if (result.status === 'updated') {
      results.updated++;
      console.log(`✓ Updated: ${file}`);
    } else {
      results.noChange++;
    }
  }
  
  console.log(`\nSummary: ${results.updated} updated, ${results.noChange} no changes needed`);
}

processDirectory(CISA_QUESTIONS_DIR);

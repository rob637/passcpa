/**
 * Fix CISA questions:
 * 1. Convert IDs to lowercase
 * 2. Add blueprintArea based on section (CISA1 -> CISA1-1, etc.)
 * 3. Add skillLevel based on difficulty
 */
const fs = require('fs');
const path = require('path');

const questionsDir = '/workspaces/passcpa/src/data/cisa/questions';

// Difficulty to skill level mapping
const difficultyToSkillLevel = {
  'easy': 'Remembering and Understanding',
  'medium': 'Application',
  'hard': 'Analysis'
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 1. Convert uppercase IDs to lowercase (CISA1-001 -> cisa1-001)
  const idPattern = /id: '(CISA[^']+)'/g;
  const newContent1 = content.replace(idPattern, (match, id) => {
    modified = true;
    return `id: '${id.toLowerCase()}'`;
  });
  content = newContent1;

  // 2. Add blueprintArea after section if missing
  // Match section: 'CISA1', followed by difficulty (without blueprintArea)
  const sectionPattern = /(section: '(CISA\d)',\n)(\s*)(difficulty:)/g;
  const newContent2 = content.replace(sectionPattern, (match, sectionPart, section, ws, diffPart) => {
    // Map section to blueprint area (CISA1 -> CISA1-1)
    const blueprintArea = `${section}-1`;
    modified = true;
    return `${sectionPart}${ws}blueprintArea: '${blueprintArea}',\n${ws}${diffPart}`;
  });
  content = newContent2;

  // 3. Add skillLevel after difficulty if missing
  // Match difficulty: 'xxx', followed by question (without skillLevel)
  const diffPattern = /(difficulty: '(easy|medium|hard)',\n)(\s*)(question:)/g;
  const newContent3 = content.replace(diffPattern, (match, diffPart, diff, ws, questionPart) => {
    const skillLevel = difficultyToSkillLevel[diff] || 'Application';
    modified = true;
    return `${diffPart}${ws}skillLevel: '${skillLevel}',\n${ws}${questionPart}`;
  });
  content = newContent3;

  if (modified && content !== fs.readFileSync(filePath, 'utf8')) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

const files = fs.readdirSync(questionsDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');
let modifiedCount = 0;

console.log('Processing CISA question files...');
files.forEach(file => {
  const filePath = path.join(questionsDir, file);
  if (processFile(filePath)) {
    modifiedCount++;
    console.log(`  Modified: ${file}`);
  }
});

console.log(`\nTotal files modified: ${modifiedCount}`);

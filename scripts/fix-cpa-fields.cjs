/**
 * Fix CPA questions:
 * 1. Add any missing courseId
 * 2. Add skillLevel based on difficulty for questions missing it
 */
const fs = require('fs');
const path = require('path');

const questionsDir = '/workspaces/passcpa/src/data/cpa/questions';

// Difficulty to skill level mapping
const difficultyToSkillLevel = {
  'easy': 'Remembering and Understanding',
  'medium': 'Application',
  'hard': 'Analysis'
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  // 1. Add courseId after section if missing
  // Pattern: section: 'XXX',\n    blueprintArea (without courseId between)
  const sectionPattern = /(section: '(?:FAR|AUD|REG|BAR|ISC|TCP)',\n)(\s*)(blueprintArea:)/g;
  content = content.replace(sectionPattern, (match, sectionLine, ws, nextField) => {
    // Check if courseId already exists nearby
    if (match.includes('courseId:')) return match;
    return `${sectionLine}${ws}courseId: 'cpa',\n${ws}${nextField}`;
  });

  // 2. Add skillLevel after difficulty if missing
  // Pattern: difficulty: 'xxx',\n    question: (without skillLevel between)
  const diffPattern = /(difficulty: '(easy|medium|hard)',\n)(\s*)(question:)/g;
  content = content.replace(diffPattern, (match, diffLine, diff, ws, questionLine) => {
    // Check if skillLevel already exists nearby
    if (match.includes('skillLevel:')) return match;
    const skillLevel = difficultyToSkillLevel[diff] || 'Application';
    return `${diffLine}${ws}skillLevel: '${skillLevel}',\n${ws}${questionLine}`;
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

const files = fs.readdirSync(questionsDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');
let modifiedCount = 0;

console.log('Processing CPA question files...');
files.forEach(file => {
  const filePath = path.join(questionsDir, file);
  if (processFile(filePath)) {
    modifiedCount++;
    console.log(`  Modified: ${file}`);
  }
});

console.log(`\nTotal files modified: ${modifiedCount}`);

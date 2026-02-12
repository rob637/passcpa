/**
 * Fix CFP questions:
 * 1. Remove duplicate courseId lines
 * 2. Add skillLevel if missing (based on difficulty)
 */
const fs = require('fs');
const path = require('path');

const questionsDir = '/workspaces/passcpa/src/data/cfp/questions';

// Difficulty to skill level mapping
const difficultyToSkillLevel = {
  'easy': 'Remembering and Understanding',
  'medium': 'Application',
  'hard': 'Analysis'
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  // 1. Remove duplicate courseId lines (courseId: 'cfp',\n    courseId: 'cfp',)
  const duplicateCourseIdPattern = /(courseId: 'cfp',\n\s*)(courseId: 'cfp',\n)/g;
  content = content.replace(duplicateCourseIdPattern, '$1');

  // 2. Add skillLevel after difficulty: 'xxx' if followed by question/explanation/topic (not skillLevel)
  // Check for questions that have difficulty but no skillLevel before explanation
  const lines = content.split('\n');
  const newLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    newLines.push(lines[i]);
    
    // Check if this line is a difficulty line and next line doesn't have skillLevel
    const diffMatch = lines[i].match(/^(\s*)difficulty:\s*["'](\w+)["'],?\s*$/);
    if (diffMatch && i + 1 < lines.length) {
      const nextLine = lines[i + 1];
      // If next line is NOT skillLevel, add it
      if (!nextLine.includes('skillLevel:')) {
        const ws = diffMatch[1];
        const difficulty = diffMatch[2];
        const skillLevel = difficultyToSkillLevel[difficulty] || 'Application';
        newLines.push(`${ws}skillLevel: '${skillLevel}',`);
      }
    }
  }
  content = newLines.join('\n');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

const files = fs.readdirSync(questionsDir).filter(f => f.endsWith('.ts') && f !== 'index.ts' && f !== 'types.ts');
let modifiedCount = 0;

console.log('Processing CFP question files...');
files.forEach(file => {
  const filePath = path.join(questionsDir, file);
  try {
    if (processFile(filePath)) {
      modifiedCount++;
      console.log(`  Modified: ${file}`);
    }
  } catch (e) {
    console.error(`  Error processing ${file}: ${e.message}`);
  }
});

console.log(`\nTotal files modified: ${modifiedCount}`);

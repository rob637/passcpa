/**
 * Fix CFP questions:
 * 1. Add courseId: 'cfp' if missing
 * 2. Add blueprintArea based on section if missing
 * 3. Add skillLevel based on difficulty if missing
 */
const fs = require('fs');
const path = require('path');

const questionsDir = '/workspaces/passcpa/src/data/cfp/questions';

// Section to blueprint area mapping
const sectionToBlueprintArea = {
  'CFP-GEN': 'GEN-1',
  'CFP-INV': 'INV-1',
  'CFP-TAX': 'TAX-1',
  'CFP-RET': 'RET-1',
  'CFP-EST': 'EST-1',
  'CFP-RISK': 'RISK-1',
  'CFP-PSY': 'PSY-1',
  'CFP-PCR': 'PCR-1'
};

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
  // Pattern: section: 'CFP-XXX',\n    (topic|question|difficulty) - without courseId
  const sectionNoCoursePattern = /(section: '(CFP-[A-Z]+)',\n)(\s*)(topic:|question:|difficulty:)/g;
  content = content.replace(sectionNoCoursePattern, (match, sectionLine, section, ws, nextField) => {
    return `${sectionLine}${ws}courseId: 'cfp',\n${ws}${nextField}`;
  });

  // 2. Add blueprintArea after courseId if missing
  // Pattern: courseId: 'cfp',\n    (topic|question|difficulty) - without blueprintArea
  const courseIdNoBlueprint = /(courseId: 'cfp',\n)(\s*)(topic:|question:|difficulty:)/g;
  content = content.replace(courseIdNoBlueprint, (match, courseIdLine, ws, nextField) => {
    // Try to find section to determine blueprintArea
    const sectionMatch = content.match(/section: '(CFP-[A-Z]+)'/);
    const section = sectionMatch ? sectionMatch[1] : 'CFP-GEN';
    const blueprintArea = sectionToBlueprintArea[section] || 'GEN-1';
    return `${courseIdLine}${ws}blueprintArea: '${blueprintArea}',\n${ws}${nextField}`;
  });

  // 3. Add skillLevel after difficulty if missing
  // Pattern: difficulty: 'xxx',\n    question: - without skillLevel
  const diffPattern = /(difficulty: '(easy|medium|hard)',\n)(\s*)(question:)/g;
  content = content.replace(diffPattern, (match, diffLine, diff, ws, questionLine) => {
    const skillLevel = difficultyToSkillLevel[diff] || 'Application';
    return `${diffLine}${ws}skillLevel: '${skillLevel}',\n${ws}${questionLine}`;
  });

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

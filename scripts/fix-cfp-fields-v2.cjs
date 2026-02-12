/**
 * Fix CFP questions:
 * 1. Add courseId: 'cfp' after id if missing (before section)
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

  // 1. Add courseId after id if missing (pattern: id: 'xxx',\n    section: without courseId)
  // Look for: id: 'CFP-...',\n    section: 'CFP-...', (without courseId between)
  const idSectionPattern = /(id: 'CFP-[^']+',\n)(\s*)(section: 'CFP-[A-Z]+',)/g;
  content = content.replace(idSectionPattern, (match, idLine, ws, sectionLine) => {
    // Check if courseId already exists between id and section
    if (match.includes('courseId:')) return match;
    return `${idLine}${ws}courseId: 'cfp',\n${ws}${sectionLine}`;
  });

  // 2. Add blueprintArea after section if missing
  // Pattern: section: 'CFP-XXX',\n    (question:|difficulty:|topic:) - without blueprintArea
  const sectionNoBlueprintPattern = /(section: '(CFP-[A-Z]+)',\n)(\s*)(question:|difficulty:|topic:)/g;
  content = content.replace(sectionNoBlueprintPattern, (match, sectionLine, section, ws, nextField) => {
    // Skip if blueprintArea already follows
    if (match.includes('blueprintArea:')) return match;
    const blueprintArea = sectionToBlueprintArea[section] || 'GEN-1';
    return `${sectionLine}${ws}blueprintArea: '${blueprintArea}',\n${ws}${nextField}`;
  });

  // 3. Add skillLevel after difficulty if missing
  // Pattern: difficulty: 'xxx',\n    question: - without skillLevel
  const diffPattern = /(difficulty: '(easy|medium|hard)',\n)(\s*)(question:)/g;
  content = content.replace(diffPattern, (match, diffLine, diff, ws, questionLine) => {
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

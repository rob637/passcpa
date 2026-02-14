/**
 * Add skillLevel to questions that don't have it
 * Maps difficulty to skillLevel as a heuristic:
 * - easy → 'Remembering'
 * - medium → 'Application'
 * - hard → 'Analysis'
 * 
 * Run with: node scripts/add-skilllevel.cjs
 */

const fs = require('fs');
const path = require('path');

const difficultyToSkillLevel = {
  'easy': 'Remembering',
  'medium': 'Application',
  'hard': 'Analysis'
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changeCount = 0;
  
  // Find questions that have difficulty but no skillLevel
  // Pattern: look for difficulty: 'xxx', and add skillLevel after it if not present
  
  // Check if file already has skillLevel
  const hasSkillLevel = content.includes('skillLevel:');
  
  // For each difficulty value, add skillLevel after it if not already present
  for (const [difficulty, skillLevel] of Object.entries(difficultyToSkillLevel)) {
    // Match difficulty line that's NOT followed by skillLevel
    const regex = new RegExp(
      `(difficulty:\\s*['"]${difficulty}['"],?)(?!\\s*\\n\\s*skillLevel:)`,
      'g'
    );
    
    content = content.replace(regex, (match) => {
      changeCount++;
      // Add skillLevel after difficulty
      return `${match}\n    skillLevel: '${skillLevel}',`;
    });
  }
  
  if (changeCount > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
  
  return changeCount;
}

function processDirectory(dirPath, results) {
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath, results);
    } else if (item.endsWith('.ts') && item !== 'index.ts') {
      const changes = processFile(fullPath);
      if (changes > 0) {
        results.files++;
        results.questions += changes;
        console.log(`✓ ${path.relative(process.cwd(), fullPath)}: ${changes} questions`);
      }
    }
  }
}

const results = { files: 0, questions: 0 };

console.log('Adding skillLevel to questions...\n');

// Process CPA, CIA, CISA question directories
processDirectory('src/data/cpa/questions', results);
processDirectory('src/data/cia/questions', results);
processDirectory('src/data/cisa/questions', results);

console.log(`\nSummary: ${results.questions} skillLevel entries added across ${results.files} files`);

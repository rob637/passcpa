/**
 * Add courseId: 'cpa' to all CPA questions that are missing it
 */
const fs = require('fs');
const path = require('path');

const questionsDir = '/workspaces/passcpa/src/data/cpa/questions';

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Pattern: Find question objects that have id: but no courseId
  // Match: section: 'XXX', followed by optional fields but no courseId before the next major field
  
  // Add courseId after section field if missing
  const sectionPattern = /(section:\s*'(?:FAR|AUD|REG|BAR|ISC|TCP)',)\n(\s*)(blueprintArea:|difficulty:|topic:|topicId:)/g;
  
  if (!content.includes("courseId: 'cpa'") || content.match(sectionPattern)) {
    const newContent = content.replace(sectionPattern, (match, section, ws, nextField) => {
      modified = true;
      return `${section}\n${ws}courseId: 'cpa',\n${ws}${nextField}`;
    });
    
    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      return true;
    }
  }
  return false;
}

const files = fs.readdirSync(questionsDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');
let modifiedCount = 0;

files.forEach(file => {
  const filePath = path.join(questionsDir, file);
  if (processFile(filePath)) {
    modifiedCount++;
    console.log(`Modified: ${file}`);
  }
});

console.log(`\nTotal files modified: ${modifiedCount}`);

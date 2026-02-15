/**
 * Find flashcard files with missing metadata
 */

const fs = require('fs');
const path = require('path');

const COURSES = ['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp'];

for (const course of COURSES) {
  const flashcardsDir = path.join('src/data', course, 'flashcards');
  if (!fs.existsSync(flashcardsDir)) continue;
  
  const files = fs.readdirSync(flashcardsDir).filter(f => f.endsWith('.ts'));
  
  for (const file of files) {
    const filePath = path.join(flashcardsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    const hasSection = content.includes('section:');
    const hasType = content.includes('type:');
    const hasDifficulty = content.includes('difficulty:');
    
    if (!hasSection || !hasType || !hasDifficulty) {
      const missing = [];
      if (!hasSection) missing.push('section');
      if (!hasType) missing.push('type');
      if (!hasDifficulty) missing.push('difficulty');
      console.log(filePath + ': Missing ' + missing.join(', '));
    }
  }
}

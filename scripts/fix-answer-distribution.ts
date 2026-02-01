import * as fs from 'fs';
import * as path from 'path';

const questionsDir = path.join(__dirname, '../src/data/questions');

// Get all .ts files except index.ts
const files = fs.readdirSync(questionsDir)
  .filter(f => f.endsWith('.ts') && f !== 'index.ts');

let totalFixed = 0;

files.forEach(file => {
  const filePath = path.join(questionsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find all questions and randomize their correct answers
  // We need to swap the correct option with a random position
  
  // Pattern to match a question block with options array
  const questionPattern = /(\{[^{}]*?question:[^{}]*?options:\s*\[)([^\]]+)(\][^{}]*?correctAnswer:\s*)(\d)([^{}]*?\})/gs;
  
  let questionIndex = 0;
  content = content.replace(questionPattern, (match, prefix, optionsStr, middle, correctIdx, suffix) => {
    const currentCorrect = parseInt(correctIdx);
    
    // Generate a random new position (0-3)
    const newCorrect = Math.floor(Math.random() * 4);
    
    if (newCorrect === currentCorrect) {
      return match; // No change needed
    }
    
    // Parse options - they're formatted as strings with commas
    const optionMatches = optionsStr.match(/'[^']*'|"[^"]*"/g);
    if (!optionMatches || optionMatches.length !== 4) {
      return match; // Can't parse, skip
    }
    
    // Swap the options
    const options = [...optionMatches];
    const temp = options[currentCorrect];
    options[currentCorrect] = options[newCorrect];
    options[newCorrect] = temp;
    
    totalFixed++;
    questionIndex++;
    
    // Rebuild the options string maintaining formatting
    const newOptionsStr = optionsStr.replace(/'[^']*'|"[^"]*"/g, () => options.shift()!);
    
    return prefix + newOptionsStr + middle + newCorrect + suffix;
  });
  
  fs.writeFileSync(filePath, content);
  console.log(`Processed ${file}`);
});

console.log(`\nTotal questions modified: ${totalFixed}`);

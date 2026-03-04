const fs = require('fs');
const path = require('path');

const EXAMS = {
  cpa: ['far', 'aud', 'reg', 'tcp', 'isc', 'bar'],
};

const errors = [];

function checkQuestion(q, section) {
  const issues = [];
  
  if (q.whyWrong) {
    for (const [key, text] of Object.entries(q.whyWrong)) {
      if (typeof text !== 'string') continue;
      
      const numKey = parseInt(key);
      if (isNaN(numKey)) continue; // We only check numeric keys
      
      const optLetter = String.fromCharCode(65 + numKey); // 0 -> A, 1 -> B, etc.
      
      // Match "Why option X is WRONG/CORRECT" or "Choice X"
      const match = text.match(/(?:option|choice)\s+([A-D])/i);
      if (match && match[1]) {
        const foundLetter = match[1].toUpperCase();
        if (foundLetter !== optLetter) {
          issues.push(`whyWrong[${key}] text mentions Option ${foundLetter} but it is mapped to index ${numKey} (Option ${optLetter}).`);
        }
      }
      
      // Check if whyWrong indicates CORRECT but the key != correctAnswer
      const isCorrectMatch = text.match(/is\s+CORRECT/i) || text.match(/is\s+the\s+CORRECT/i);
      if (isCorrectMatch && q.correctAnswer !== numKey) {
          issues.push(`whyWrong[${key}] says CORRECT but correctAnswer is ${q.correctAnswer}`);
      }
      // Check if whyWrong indicates WRONG but the key == correctAnswer
      const isWrongMatch = text.match(/is\s+(WRONG|INCORRECT)/i);
      if (isWrongMatch && q.correctAnswer === numKey) {
          issues.push(`whyWrong[${key}] says WRONG but correctAnswer is ${q.correctAnswer}`);
      }
    }
  }

  if (issues.length > 0) {
    errors.push({
      id: q.id,
      section,
      issues
    });
  }
}

for (const [exam, sections] of Object.entries(EXAMS)) {
  for (const section of sections) {
    const jsonPath = path.join(__dirname, '..', 'content', exam, section, 'questions.json');
    if (fs.existsSync(jsonPath)) {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      (data.questions || []).forEach(q => checkQuestion(q, section));
    }
  }
}

fs.writeFileSync('CPA_WhyWrong_Mismatches.json', JSON.stringify(errors, null, 2));
console.log(`Found ${errors.length} questions with whyWrong mismatches. Logged to CPA_WhyWrong_Mismatches.json`);

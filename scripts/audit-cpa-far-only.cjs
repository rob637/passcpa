const fs = require('fs');
const path = require('path');

const EXAMS = {
  cpa: ['far'],
};

const mismatchedAnswers = [];
const whyWrongIssues = [];

function getOptionLetter(idx) {
  return String.fromCharCode(65 + idx);
}

function checkQuestion(q, section) {
  if (q.whyWrong) {
    const localIssues = [];
    for (const [key, text] of Object.entries(q.whyWrong)) {
      if (typeof text !== 'string') continue;
      const numKey = parseInt(key);
      if (isNaN(numKey)) continue;
      
      const optLetter = getOptionLetter(numKey);
      
      const match = text.match(/(?:option|choice)\s+([A-D])/i);
      if (match && match[1]) {
        const foundLetter = match[1].toUpperCase();
        if (foundLetter !== optLetter) {
          localIssues.push(`Index ${numKey} (${optLetter}) text mentions **${foundLetter}**`);
        }
      }
    }
    if (localIssues.length > 0) {
        whyWrongIssues.push({
            id: q.id,
            section,
            issues: localIssues
        });
    }
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

console.log(`Found ${whyWrongIssues.length} issues in FAR.`);
if (whyWrongIssues.length > 0) {
    console.log('First issue:', JSON.stringify(whyWrongIssues[0], null, 2));
}

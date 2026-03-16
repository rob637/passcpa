const fs = require('fs');
const path = require('path');

const EXAMS = {
  cpa: ['far', 'aud', 'reg', 'tcp', 'isc', 'bar'],
};

const errors = [];

function checkQuestion(q, section) {
  const issues = [];
  
  // 1. Correct Answer out of bounds
  if (typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || !q.options || q.correctAnswer >= q.options.length) {
    issues.push(`Invalid correctAnswer index: ${q.correctAnswer}`);
  }
  
  // 2. Options issue
  if (!q.options || q.options.length < 2) {
    issues.push(`Too few options: ${q.options ? q.options.length : 0}`);
  }
  
  // 3. Explanation mismatch
  // Try to find "correct answer is X" or similar in explanation
  if (q.explanation && typeof q.explanation === 'string') {
    const match = q.explanation.match(/(?:correct answer is|choice)\s+([A-D])/i);
    if (match && match[1]) {
      const letter = match[1].toUpperCase();
      const expectedIndex = letter.charCodeAt(0) - 65;
      if (typeof q.correctAnswer === 'number' && q.correctAnswer >= 0 && q.correctAnswer <= 3) {
        if (expectedIndex !== q.correctAnswer) {
          issues.push(`Explanation says ${letter} but correctAnswer is ${String.fromCharCode(65 + q.correctAnswer)} (${q.correctAnswer})`);
        }
      }
    }
  }

  // 4. "All of the above" not at the end
  if (q.options) {
    q.options.forEach((opt, idx) => {
      if (typeof opt === 'string' && opt.toLowerCase().includes('all of the above')) {
        if (idx !== q.options.length - 1) {
          issues.push(`'All of the above' is at index ${idx} instead of the end.`);
        }
      }
      if (typeof opt === 'string' && opt.toLowerCase().includes('both a and b')) {
        if (idx < 2) {
            issues.push(`'Both A and B' is at index ${idx} which is impossibly early.`);
        }
      }
    });
  }

  if (issues.length > 0) {
    errors.push({
      id: q.id,
      section,
      question: q.question ? q.question.substring(0, 50) + '...' : 'N/A',
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

fs.writeFileSync('CPA_Mismatched_Answers_Log.json', JSON.stringify(errors, null, 2));
console.log(`Found ${errors.length} questions with issues. Logged to CPA_Mismatched_Answers_Log.json`);

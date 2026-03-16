const fs = require('fs');
const path = require('path');

const EXAMS = {
  cpa: ['far', 'aud', 'reg', 'tcp', 'isc', 'bar'],
};

const mismatchedAnswers = [];
const whyWrongIssues = [];

function getOptionLetter(idx) {
  return String.fromCharCode(65 + idx);
}

function checkQuestion(q, section) {
  // Check 1: Mismatched Answers (Explanation vs CorrectAnswer)
  if (q.explanation && typeof q.explanation === 'string') {
    const match = q.explanation.match(/(?:correct answer is|choice)\s+([A-D])/i);
    if (match && match[1]) {
      const letter = match[1].toUpperCase();
      const expectedIndex = letter.charCodeAt(0) - 65;
      if (typeof q.correctAnswer === 'number' && q.correctAnswer >= 0 && q.correctAnswer <= 3) {
        if (expectedIndex !== q.correctAnswer) {
          mismatchedAnswers.push({
            id: q.id,
            section,
            issue: `Explanation says **${letter}** but database has **${getOptionLetter(q.correctAnswer)}**`,
            question: q.question.substring(0, 100) + '...'
          });
        }
      }
    }
  }

  // Check 2: whyWrong inconsistencies
  if (q.whyWrong) {
    const localIssues = [];
    for (const [key, text] of Object.entries(q.whyWrong)) {
      if (typeof text !== 'string') continue;
      const numKey = parseInt(key);
      if (isNaN(numKey)) continue;
      
      const optLetter = getOptionLetter(numKey);
      
      // Check for mismatched Option Reference
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

// Generate Markdown Report
let report = '# CPA Question Bank Audit Report\n\n';
report += `**Date:** ${new Date().toISOString().split('T')[0]}\n`;
report += `\n## 🚨 Critical: Mismatched Correct Answers (${mismatchedAnswers.length})\n`;
report += `These questions have a contradiction between the prose explanation and the programmed correct answer. **Action required:** Verify and fix correct answer index.\n\n`;
report += `| ID | Section | Issue | Question Snippet |\n`;
report += `|---|---|---|---|\n`;
mismatchedAnswers.forEach(item => {
  report += `| \`${item.id}\` | ${item.section.toUpperCase()} | ${item.issue} | ${item.question.replace(/\|/g, '')} |\n`;
});

report += `\n## ⚠️ Warning: Metadata Mismatches in \`whyWrong\` (${whyWrongIssues.length})\n`;
report += `These questions have \`whyWrong\` explanations that reference the wrong option letter (e.g. index 0 text says "Option B"). This usually indicates an off-by-one error or shuffling issue.\n\n`;
report += `<details><summary>Click to view first 100 discrepancies</summary>\n\n`;
report += `| ID | Section | Issues |\n`;
report += `|---|---|---|\n`;
whyWrongIssues.slice(0, 100).forEach(item => {
  report += `| \`${item.id}\` | ${item.section.toUpperCase()} | ${item.issues.join('<br>')} |\n`;
});
report += `\n</details>\n`;

fs.writeFileSync('CPA_AUDIT_REPORT.md', report);
console.log('Report generated: CPA_AUDIT_REPORT.md');

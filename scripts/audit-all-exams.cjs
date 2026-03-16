const fs = require('fs');
const path = require('path');

const EXAMS = {
  // cpa: ['far', 'aud', 'reg', 'tcp', 'isc', 'bar'], // Already done
  ea: ['see1', 'see2', 'see3'],
  cma: ['cma1', 'cma2'],
  cia: ['cia1', 'cia2', 'cia3'],
  cisa: ['cisa1', 'cisa2', 'cisa3', 'cisa4', 'cisa5'],
  cfp: ['cfp-est', 'cfp-gen', 'cfp-inv', 'cfp-pcr', 'cfp-psy', 'cfp-ret', 'cfp-risk', 'cfp-tax'] // Check directory names for case sensitivity
};

// Check CFP directory names actually on disk
// The user context usually shows lowercase or mixed. I'll rely on fs to find them or try common variations.

const mismatchedAnswers = [];
const whyWrongIssues = [];

function getOptionLetter(idx) {
  return String.fromCharCode(65 + idx);
}

function checkQuestion(q, section, exam) {
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
            exam,
            section,
            issue: `Explanation says **${letter}** but database has **${getOptionLetter(q.correctAnswer)}**`,
            question: q.question ? q.question.substring(0, 80) + '...' : 'N/A'
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
            exam,
            section,
            issues: localIssues
        });
    }
  }
}

let totalQuestions = 0;

for (const [exam, sections] of Object.entries(EXAMS)) {
  for (const section of sections) {
    // Try lower first, but some folders might be different (CFP?)
    let jsonPath = path.join(__dirname, '..', 'content', exam, section, 'questions.json');
    if (!fs.existsSync(jsonPath)) {
        // Try upper case section for folders?
        jsonPath = path.join(__dirname, '..', 'content', exam, section.toUpperCase(), 'questions.json');
    }
    
    if (fs.existsSync(jsonPath)) {
      try {
          const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
          const qs = data.questions || [];
          totalQuestions += qs.length;
          qs.forEach(q => checkQuestion(q, section, exam));
      } catch (e) {
          console.error(`Failed to parse ${jsonPath}: ${e.message}`);
      }
    } else {
        console.warn(`Warning: Could not find questions file for ${exam}/${section}`);
    }
  }
}

// Generate Markdown Report
let report = '# Multi-Exam Audit Report\n\n';
report += `**Date:** ${new Date().toISOString().split('T')[0]}\n`;
report += `**Total Questions Scanned:** ${totalQuestions}\n\n`;

report += `## 🚨 Critical: Mismatched Correct Answers (${mismatchedAnswers.length})\n`;
if (mismatchedAnswers.length > 0) {
    report += `| Exam | Section | ID | Issue | Question Snippet |\n`;
    report += `|---|---|---|---|---|\n`;
    mismatchedAnswers.forEach(item => {
      report += `| ${item.exam.toUpperCase()} | ${item.section.toUpperCase()} | \`${item.id}\` | ${item.issue} | ${item.question.replace(/\|/g, '')} |\n`;
    });
} else {
    report += "✅ No critical mismatches found.\n";
}

report += `\n## ⚠️ Warning: Metadata Mismatches in \`whyWrong\` (${whyWrongIssues.length})\n`;
if (whyWrongIssues.length > 0) {
    report += `<details><summary>Click to view discrepancies</summary>\n\n`;
    report += `| Exam | Section | ID | Issues |\n`;
    report += `|---|---|---|---|\n`;
    whyWrongIssues.forEach(item => {
      report += `| ${item.exam.toUpperCase()} | ${item.section.toUpperCase()} | \`${item.id}\` | ${item.issues.join('<br>')} |\n`;
    });
    report += `\n</details>\n`;
} else {
     report += "✅ No metadata mismatches found.\n";
}

// Also generate a JSON fix list for the critical errors to suggest to the user
const fixList = mismatchedAnswers.map(m => {
    // Extract intended answer from issue string "Explanation says **A**..."
    // My issue string formatting is consistent: "Explanation says **X**"
    const match = m.issue.match(/says \*\*([A-D])\*\*/);
    let newIndex = -1;
    if (match && match[1]) {
        newIndex = match[1].charCodeAt(0) - 65;
    }
    return {
        id: m.id,
        exam: m.exam,
        section: m.section,
        currentAnswer: m.issue.match(/database has \*\*([A-D])\*\*/)[1],
        proposedAnswer: match[1],
        proposedIndex: newIndex
    };
});

fs.writeFileSync('ALL_EXAMS_AUDIT_REPORT.md', report);
fs.writeFileSync('ALL_EXAMS_CRITICAL_FIXES.json', JSON.stringify(fixList, null, 2));

console.log('Report generated: ALL_EXAMS_AUDIT_REPORT.md');
console.log(`Found ${mismatchedAnswers.length} critical errors and ${whyWrongIssues.length} metadata inconsistencies.`);

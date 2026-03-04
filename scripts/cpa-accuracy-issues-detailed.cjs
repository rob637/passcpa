#!/usr/bin/env node
/**
 * CPA Question Accuracy Issues - Detailed Log
 * 
 * Extracts questions where the whyWrong field contradicts the correctAnswer,
 * showing the full question context for manual review and correction.
 * 
 * Run: node scripts/cpa-accuracy-issues-detailed.cjs
 */

const fs = require('fs');
const path = require('path');

const SECTIONS = ['far', 'aud', 'reg', 'bar', 'isc', 'tcp'];
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'cpa');
const OUTPUT_FILE = path.join(__dirname, '..', 'docs', 'CPA_ACCURACY_ISSUES_LOG.md');

function loadQuestions(section) {
  const filePath = path.join(CONTENT_DIR, section, 'questions.json');
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return data.questions || [];
  } catch (err) {
    console.error(`Error loading ${section}: ${err.message}`);
    return [];
  }
}

function checkWhyWrongMismatch(question) {
  const { whyWrong, correctAnswer, options, id, section, explanation } = question;
  
  if (!whyWrong) return null;
  
  const problems = [];
  const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
  
  for (const [key, text] of Object.entries(whyWrong)) {
    const idx = parseInt(key, 10);
    const isCorrectOption = idx === correctAnswer;
    const textLower = text.toLowerCase();
    const expectedLetter = optionLetters[idx];
    
    // Check for "is correct" in wrong option's explanation
    // Only flag when explicitly saying THIS OPTION is correct
    if (!isCorrectOption) {
      // Pattern: "option X is correct" or "Why option X is CORRECT" at the start
      // Must explicitly reference the option letter as correct
      const correctPatterns = [
        // "Why option A is CORRECT" - explicit option reference at start
        new RegExp(`^\\s*(why\\s+)?option\\s+${expectedLetter}\\s+is\\s+correct`, 'i'),
        // "Option A is correct" anywhere
        new RegExp(`\\boption\\s+${expectedLetter}\\s+is\\s+correct\\b`, 'i'),
      ];
      
      let mentions_correct = false;
      for (const pattern of correctPatterns) {
        if (pattern.test(text)) {
          mentions_correct = true;
          break;
        }
      }
      
      if (mentions_correct) {
        problems.push({
          optionIndex: idx,
          optionLetter: optionLetters[idx],
          issue: 'MARKED_CORRECT_BUT_WRONG',
          whyWrongText: text,
        });
      }
    }
    
    // Check for "is wrong" in correct option's explanation
    // Only flag when explicitly saying THIS OPTION is wrong
    if (isCorrectOption) {
      const wrongPatterns = [
        // "Why option A is WRONG" - explicit option reference at start
        new RegExp(`^\\s*(why\\s+)?option\\s+${expectedLetter}\\s+is\\s+wrong`, 'i'),
        // "Option A is wrong" anywhere
        new RegExp(`\\boption\\s+${expectedLetter}\\s+is\\s+wrong\\b`, 'i'),
      ];
      
      for (const pattern of wrongPatterns) {
        if (pattern.test(text)) {
          problems.push({
            optionIndex: idx,
            optionLetter: optionLetters[idx],
            issue: 'MARKED_WRONG_BUT_CORRECT',
            whyWrongText: text,
          });
          break;
        }
      }
    }
  }
  
  if (problems.length > 0) {
    return {
      id,
      section,
      question: question.question,
      options,
      correctAnswer,
      correctLetter: optionLetters[correctAnswer],
      explanation,
      whyWrong,
      problems,
      topic: question.topic,
      subtopic: question.subtopic,
      blueprintArea: question.blueprintArea,
    };
  }
  
  return null;
}

function generateReport(issues) {
  const timestamp = new Date().toISOString().split('T')[0];
  
  // Group by section
  const bySection = {};
  for (const issue of issues) {
    if (!bySection[issue.section]) {
      bySection[issue.section] = [];
    }
    bySection[issue.section].push(issue);
  }
  
  let report = `# CPA Question Accuracy Issues Log

**Generated:** ${timestamp}

**Total Questions with Accuracy Issues:** ${issues.length}

## Summary by Section

| Section | Questions with Issues |
|---------|----------------------|
${Object.entries(bySection).sort().map(([s, arr]) => `| ${s} | ${arr.length} |`).join('\n')}

---

## Issue Types

1. **MARKED_CORRECT_BUT_WRONG**: The \`whyWrong\` field says an option "is correct" but it's NOT the \`correctAnswer\`
2. **MARKED_WRONG_BUT_CORRECT**: The \`whyWrong\` field says the \`correctAnswer\` option "is wrong"

These issues will confuse students because the explanations contradict the marked correct answer.

---

## Detailed Issue Log

`;

  for (const [section, sectionIssues] of Object.entries(bySection).sort()) {
    report += `\n## ${section} (${sectionIssues.length} issues)\n\n`;
    
    for (const issue of sectionIssues) {
      report += `### \`${issue.id}\`\n\n`;
      report += `**Topic:** ${issue.topic}${issue.subtopic ? ` / ${issue.subtopic}` : ''}\n`;
      report += `**Blueprint Area:** ${issue.blueprintArea || 'N/A'}\n\n`;
      
      report += `**Question:**\n> ${issue.question}\n\n`;
      
      report += `**Options:**\n`;
      const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
      for (let i = 0; i < issue.options.length; i++) {
        const marker = i === issue.correctAnswer ? '✓' : ' ';
        report += `- ${marker} **${optionLetters[i]}:** ${issue.options[i]}\n`;
      }
      report += `\n`;
      
      report += `**Marked Correct Answer:** ${issue.correctLetter} (index ${issue.correctAnswer})\n\n`;
      
      report += `**Explanation:**\n> ${issue.explanation}\n\n`;
      
      report += `**Problems Found:**\n\n`;
      for (const problem of issue.problems) {
        if (problem.issue === 'MARKED_CORRECT_BUT_WRONG') {
          report += `⚠️ **whyWrong[${problem.optionIndex}] (Option ${problem.optionLetter})** says this is CORRECT, but the correctAnswer is ${issue.correctLetter}:\n`;
        } else {
          report += `⚠️ **whyWrong[${problem.optionIndex}] (Option ${problem.optionLetter})** says this is WRONG, but it IS the correct answer:\n`;
        }
        report += `> ${problem.whyWrongText}\n\n`;
      }
      
      report += `**whyWrong (Full):**\n\`\`\`json\n${JSON.stringify(issue.whyWrong, null, 2)}\n\`\`\`\n\n`;
      
      report += `---\n\n`;
    }
  }
  
  // Add a JSON summary for programmatic use
  report += `\n## Machine-Readable Issue List\n\n`;
  report += `\`\`\`json\n`;
  report += JSON.stringify(issues.map(i => ({
    id: i.id,
    section: i.section,
    correctAnswer: i.correctAnswer,
    problems: i.problems.map(p => ({ option: p.optionIndex, issue: p.issue })),
  })), null, 2);
  report += `\n\`\`\`\n`;
  
  return report;
}

function main() {
  console.log('🔍 CPA Question Accuracy Issue Extraction\n');
  
  const allIssues = [];
  
  for (const section of SECTIONS) {
    const questions = loadQuestions(section);
    console.log(`${section.toUpperCase()}: ${questions.length} questions`);
    
    for (const question of questions) {
      const issue = checkWhyWrongMismatch(question);
      if (issue) {
        allIssues.push(issue);
      }
    }
  }
  
  console.log(`\nFound ${allIssues.length} questions with accuracy issues\n`);
  
  const report = generateReport(allIssues);
  fs.writeFileSync(OUTPUT_FILE, report);
  
  console.log(`Report written to: ${OUTPUT_FILE}`);
  
  // Summary by section
  const bySection = {};
  for (const issue of allIssues) {
    bySection[issue.section] = (bySection[issue.section] || 0) + 1;
  }
  
  console.log('\nIssues by section:');
  for (const [section, count] of Object.entries(bySection).sort()) {
    console.log(`  ${section}: ${count}`);
  }
}

main();

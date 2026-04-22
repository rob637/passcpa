#!/usr/bin/env node
/**
 * Quizlet Export Script for VoraPrep CPA Questions
 * 
 * Exports a strategic subset of questions (100 per section) to Quizlet's CSV format.
 * Focuses on easy/medium questions to give a taste of quality while keeping advanced content exclusive.
 * 
 * Quizlet import format: term,definition (CSV with optional image columns)
 * 
 * Usage:
 *   node scripts/export-quizlet.js
 * 
 * Output:
 *   scripts/quizlet-exports/CPA-FAR-VoraPrep.csv
 *   scripts/quizlet-exports/CPA-AUD-VoraPrep.csv
 *   etc.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const QUESTIONS_PER_SECTION = 100;  // ~6.5% of total inventory
const SECTIONS = ['far', 'aud', 'reg', 'bar', 'isc', 'tcp'];
const INPUT_DIR = path.join(__dirname, '../content/cpa/_backup_whywrong_fix');
const OUTPUT_DIR = path.join(__dirname, 'quizlet-exports');

// Section display names for Quizlet titles
const SECTION_NAMES = {
  far: 'FAR (Financial Accounting & Reporting)',
  aud: 'AUD (Auditing & Attestation)',
  reg: 'REG (Taxation & Regulation)',
  bar: 'BAR (Business Analysis & Reporting)',
  isc: 'ISC (Information Systems & Controls)',
  tcp: 'TCP (Tax Compliance & Planning)'
};

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Escape field for tab-separated format (handle tabs, newlines)
 */
function escapeField(str) {
  if (!str) return '';
  // Convert to string and clean up
  const cleaned = String(str)
    .replace(/\r\n/g, ' ')  // Remove Windows newlines
    .replace(/\n/g, ' ')    // Remove Unix newlines
    .replace(/\r/g, ' ')    // Remove old Mac newlines
    .replace(/\t/g, '    ') // Replace tabs with spaces
    .replace(/\s+/g, ' ')   // Collapse multiple spaces
    .trim();
  
  return cleaned;
}

/**
 * Format a question for Quizlet
 * Term = Question + Answer options (labeled A-D)
 * Definition = Correct answer letter + brief explanation
 */
function formatForQuizlet(q) {
  const letters = ['A', 'B', 'C', 'D'];
  
  // Build the term (question with options on same line)
  let term = q.question + ' ';
  q.options.forEach((opt, i) => {
    term += `${letters[i]}. ${opt} `;
  });
  
  // Build the definition (correct answer + explanation)
  const correctLetter = letters[q.correctAnswer];
  const correctText = q.options[q.correctAnswer];
  
  // Use the short explanation, not the detailed whyWrong (keep that exclusive)
  let definition = `ANSWER: ${correctLetter}. ${correctText}`;
  
  // Add a brief explanation if available (but NOT the detailed whyWrong)
  if (q.explanation) {
    // Truncate explanation to first 200 chars for Quizlet
    const shortExplanation = q.explanation.length > 200 
      ? q.explanation.substring(0, 200) + '...'
      : q.explanation;
    definition += ` — ${shortExplanation}`;
  }
  
  // Add VoraPrep branding
  definition += ' [VoraPrep.com]';
  
  return {
    term: escapeField(term),
    definition: escapeField(definition)
  };
}

/**
 * Select strategic questions (easy + medium, diverse topics)
 */
function selectQuestions(questions, limit) {
  // Prioritize easy and medium difficulty
  const easy = questions.filter(q => q.difficulty === 'easy');
  const medium = questions.filter(q => q.difficulty === 'medium');
  
  // Take 40% easy, 60% medium (if available)
  const easyCount = Math.min(Math.floor(limit * 0.4), easy.length);
  const mediumCount = Math.min(limit - easyCount, medium.length);
  
  // Shuffle to get variety
  const shuffle = arr => arr.sort(() => Math.random() - 0.5);
  
  const selected = [
    ...shuffle(easy).slice(0, easyCount),
    ...shuffle(medium).slice(0, mediumCount)
  ];
  
  // If we still need more, add from any difficulty
  if (selected.length < limit) {
    const remaining = questions.filter(q => !selected.includes(q));
    selected.push(...shuffle(remaining).slice(0, limit - selected.length));
  }
  
  return shuffle(selected).slice(0, limit);
}

/**
 * Process a single section
 */
function processSection(section) {
  const inputFile = path.join(INPUT_DIR, `${section}-questions-2026-03-12T23-59-02.json`);
  
  if (!fs.existsSync(inputFile)) {
    console.log(`⚠️  Skipping ${section.toUpperCase()}: file not found`);
    return null;
  }
  
  // Read questions
  const data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
  const questions = data.questions || [];
  
  console.log(`📚 ${section.toUpperCase()}: ${questions.length} questions available`);
  
  // Select strategic subset
  const selected = selectQuestions(questions, QUESTIONS_PER_SECTION);
  console.log(`   → Selected ${selected.length} for Quizlet export`);
  
  // Format for Quizlet (tab-separated)
  const tsvRows = selected.map(q => {
    const formatted = formatForQuizlet(q);
    return `${formatted.term}\t${formatted.definition}`;
  });
  
  // Write TSV file (tab-separated)
  const outputFile = path.join(OUTPUT_DIR, `CPA-${section.toUpperCase()}-VoraPrep.txt`);
  fs.writeFileSync(outputFile, tsvRows.join('\n'), 'utf8');
  console.log(`   ✅ Exported to ${path.basename(outputFile)}`);
  
  return {
    section: section.toUpperCase(),
    total: questions.length,
    exported: selected.length,
    file: outputFile
  };
}

/**
 * Generate README for the exports
 */
function generateReadme(results) {
  const readme = `# VoraPrep CPA Quizlet Exports

These CSV files can be imported directly into Quizlet to create study sets.

## How to Import

1. Go to [quizlet.com](https://quizlet.com) and sign in
2. Click "Create" → "Study set"
3. Click the "+" button → "Import from Word, Excel, Google Docs, etc."
4. Select the CSV file for your section
5. Set delimiter to "Comma"
6. Set "Between term and definition" to "Comma"
7. Click "Import"
8. Add a title like "CPA ${results[0]?.section || 'FAR'} Practice - VoraPrep Official"
9. Add description: "Official practice questions from VoraPrep.com. Get 9,000+ questions at voraprep.com"

## Files Included

| File | Section | Questions |
|------|---------|-----------|
${results.map(r => `| ${path.basename(r.file)} | ${SECTION_NAMES[r.section.toLowerCase()]} | ${r.exported} |`).join('\n')}

## Suggested Quizlet Titles

${results.map(r => `- **CPA ${r.section} Practice Questions - VoraPrep Official**`).join('\n')}

## Description Template

\`\`\`
Official CPA exam practice questions from VoraPrep.

✓ ${results.reduce((sum, r) => sum + r.exported, 0)} free practice questions
✓ Clear explanations for every answer
✓ Aligned to 2025-2026 CPA Blueprint

Want more? Get 9,000+ questions with detailed explanations, adaptive learning, and study plans at VoraPrep.com

#CPA #CPAExam #Accounting #FAR #AUD #REG
\`\`\`

## Notes

- These are introductory questions (easy/medium difficulty)
- Advanced questions and detailed "why wrong" explanations are exclusive to VoraPrep.com
- Questions are randomly selected for variety

Generated: ${new Date().toISOString()}
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'README.md'), readme, 'utf8');
  console.log('\n📄 Generated README.md with import instructions');
}

// Main execution
console.log('🎯 VoraPrep → Quizlet Export\n');
console.log(`Exporting ${QUESTIONS_PER_SECTION} questions per section...\n`);

const results = SECTIONS.map(processSection).filter(Boolean);

if (results.length > 0) {
  generateReadme(results);
  
  const totalExported = results.reduce((sum, r) => sum + r.exported, 0);
  const totalAvailable = results.reduce((sum, r) => sum + r.total, 0);
  
  console.log('\n' + '='.repeat(50));
  console.log(`✅ Done! Exported ${totalExported}/${totalAvailable} questions (${(totalExported/totalAvailable*100).toFixed(1)}%)`);
  console.log(`📁 Files saved to: ${OUTPUT_DIR}`);
  console.log('\nNext steps:');
  console.log('1. Go to quizlet.com');
  console.log('2. Create → Study set → Import');
  console.log('3. Import each CSV file as a separate study set');
}

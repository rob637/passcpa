#!/usr/bin/env node
/**
 * Extract accuracy issues from the audit report
 */
const path = require('path');
const data = require(path.join(__dirname, '..', 'docs', 'QUESTION_AUDIT_REPORT.json'));

const critical = data.issues.filter(i => i.type.includes('contradiction'));

const seen = new Set();
const unique = [];
for (const i of critical) {
  if (!seen.has(i.qId)) {
    seen.add(i.qId);
    unique.push(i);
  }
}

console.log('======================================================================');
console.log('QUESTION ACCURACY ISSUES - SUMMARY');
console.log('======================================================================');
console.log('');
console.log(`Total questions audited: ${data.stats.totalQuestions}`);
console.log(`Total unique questions with accuracy errors: ${unique.length}`);
console.log('');

const byExam = {};
unique.forEach(i => {
  if (!byExam[i.exam]) byExam[i.exam] = [];
  byExam[i.exam].push({ section: i.section, id: i.qId, detail: i.detail, type: i.type });
});

console.log('By Exam:');
for (const [exam, issues] of Object.entries(byExam).sort()) {
  console.log(`  ${exam.toUpperCase()}: ${issues.length} issues`);
}
console.log('');

console.log('======================================================================');
console.log('DETAILED LIST');
console.log('======================================================================');

for (const [exam, issues] of Object.entries(byExam).sort()) {
  console.log('');
  console.log(`--- ${exam.toUpperCase()} (${issues.length} issues) ---`);
  issues.sort((a, b) => a.id.localeCompare(b.id));
  issues.forEach(i => {
    console.log(`${i.section}/${i.id}`);
    console.log(`    [${i.type}] ${i.detail}`);
  });
}

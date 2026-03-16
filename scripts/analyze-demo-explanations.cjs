const fs = require('fs');
const content = fs.readFileSync('src/data/demoQuestions.ts', 'utf8');
const lines = content.split('\n');

const questions = [];
let currentId = null;
let currentSection = null;
let inExplanation = false;
let explanationText = '';
let explanationStartLine = 0;
let currentCourse = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (line.includes('CPA_DEMO_QUESTIONS')) currentCourse = 'CPA';
  if (line.includes('EA_DEMO_QUESTIONS')) currentCourse = 'EA';
  if (line.includes('CMA_DEMO_QUESTIONS')) currentCourse = 'CMA';
  if (line.includes('CIA_DEMO_QUESTIONS')) currentCourse = 'CIA';
  if (line.includes('CFP_DEMO_QUESTIONS')) currentCourse = 'CFP';
  if (line.includes('CISA_DEMO_QUESTIONS')) currentCourse = 'CISA';

  const idMatch = line.match(/id:\s*'([^']+)'/);
  if (idMatch) currentId = idMatch[1];

  const secMatch = line.match(/section:\s*'([^']+)'/);
  if (secMatch) currentSection = secMatch[1];

  if (!inExplanation && line.indexOf('explanation:') !== -1 && line.indexOf('`') !== -1) {
    inExplanation = true;
    explanationStartLine = i + 1; // 1-indexed
    const idx = line.indexOf('`');
    explanationText = line.substring(idx + 1);
    continue;
  }

  if (inExplanation) {
    if (line.indexOf('`') !== -1) {
      const idx = line.indexOf('`');
      explanationText += line.substring(0, idx);
      inExplanation = false;
      questions.push({
        id: currentId,
        course: currentCourse,
        section: currentSection,
        charCount: explanationText.length,
        startLine: explanationStartLine,
        text: explanationText
      });
      explanationText = '';
    } else {
      explanationText += line + '\n';
    }
  }
}

// Group by course
const courses = {};
for (const q of questions) {
  if (!courses[q.course]) courses[q.course] = [];
  courses[q.course].push(q);
}

console.log('=== SUMMARY TABLE ===');
console.log('Course | Count | Min  | Max  | Avg');
console.log('-------|-------|------|------|-----');
for (const c of ['CPA', 'EA', 'CMA', 'CIA', 'CFP', 'CISA']) {
  const qs = courses[c] || [];
  if (qs.length === 0) { console.log(c + ' | 0'); continue; }
  const lengths = qs.map(q => q.charCount);
  const min = Math.min(...lengths);
  const max = Math.max(...lengths);
  const avg = Math.round(lengths.reduce((a, b) => a + b, 0) / lengths.length);
  console.log(c.padEnd(6) + ' | ' + String(qs.length).padEnd(5) + ' | ' + String(min).padEnd(4) + ' | ' + String(max).padEnd(4) + ' | ' + avg);
}

console.log('\nTotal questions: ' + questions.length);

const sorted = [...questions].sort((a, b) => b.charCount - a.charCount);
console.log('\n=== TOP 5 LONGEST EXPLANATIONS ===');
for (let i = 0; i < Math.min(5, sorted.length); i++) {
  const q = sorted[i];
  console.log((i + 1) + '. ' + q.id + ' (' + q.course + '/' + q.section + ') - ' + q.charCount + ' chars - line ' + q.startLine);
}

console.log('\n=== ALL QUESTIONS BY COURSE ===');
for (const c of ['CPA', 'EA', 'CMA', 'CIA', 'CFP', 'CISA']) {
  const qs = courses[c] || [];
  console.log('\n' + c + ' (' + qs.length + ' questions):');
  for (const q of qs) {
    console.log('  ' + (q.id||'?').padEnd(22) + ' [' + (q.section||'?').padEnd(5) + '] ' + String(q.charCount).padStart(5) + ' chars  (line ' + q.startLine + ')');
  }
}

// Pattern analysis
console.log('\n=== PATTERN ANALYSIS ===');
let hasCorrectHeader = 0, hasWhyWrong = 0, hasExamTip = 0, hasCommonMistake = 0;
let hasTable = 0, hasBulletBreakdown = 0;
for (const q of questions) {
  const t = q.text;
  if (t.includes('Correct Answer:')) hasCorrectHeader++;
  if (t.includes('Why the other answers are wrong')) hasWhyWrong++;
  if (t.includes('Exam Tip:')) hasExamTip++;
  if (t.includes('Common Mistake:')) hasCommonMistake++;
  if (t.includes('|') && t.includes('---')) hasTable++;
  if (t.includes('\u2022') || t.includes('• **')) hasBulletBreakdown++;
}
console.log('Has **Correct Answer** header:  ' + hasCorrectHeader + '/' + questions.length);
console.log('Has **Why Wrong** section:      ' + hasWhyWrong + '/' + questions.length);
console.log('Has **Exam Tip** section:       ' + hasExamTip + '/' + questions.length);
console.log('Has **Common Mistake** callout: ' + hasCommonMistake + '/' + questions.length);
console.log('Has markdown table:             ' + hasTable + '/' + questions.length);
console.log('Has bullet breakdown per option:' + hasBulletBreakdown + '/' + questions.length);

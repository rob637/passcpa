#!/usr/bin/env node
/**
 * Comprehensive Question Accuracy Audit
 * 
 * Checks all 6 exam question banks for:
 * - Structural issues (missing fields, invalid correctAnswer, etc.)
 * - whyWrong contradictions (says correct is wrong or wrong is correct)
 * - Explanation inconsistencies
 * - Duplicate options
 * - Content quality flags
 * 
 * Run: node scripts/audit-all-questions.cjs
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'content');

const EXAMS = {
  cpa: ['far', 'aud', 'reg', 'tcp', 'isc', 'bar'],
  ea: ['see1', 'see2', 'see3'],
  cma: ['cma1', 'cma2'],
  cia: ['cia1', 'cia2', 'cia3'],
  cisa: ['cisa1', 'cisa2', 'cisa3', 'cisa4', 'cisa5'],
  cfp: ['CFP-EST', 'CFP-GEN', 'CFP-INV', 'CFP-PCR', 'CFP-PSY', 'CFP-RET', 'CFP-RISK', 'CFP-TAX'],
};

const issues = [];
const stats = {
  totalQuestions: 0,
  byExam: {},
  issueTypes: {}
};

function addIssue(type, exam, section, qId, detail) {
  issues.push({ type, exam, section, qId, detail });
  stats.issueTypes[type] = (stats.issueTypes[type] || 0) + 1;
}

function normalizeText(text) {
  return (text || '').toLowerCase().trim();
}

// Check if whyWrong indicates an answer is correct/wrong
function checkWhyWrongContradictions(q) {
  if (!q.whyWrong) return;
  
  const labels = ['A', 'B', 'C', 'D'];
  const correctIdx = q.correctAnswer;
  
  Object.entries(q.whyWrong).forEach(([key, value]) => {
    const text = normalizeText(value);
    let optionIdx;
    
    // Handle both letter (A,B,C,D) and numeric (0,1,2,3) keys
    if (['A', 'B', 'C', 'D'].includes(key.toUpperCase())) {
      optionIdx = labels.indexOf(key.toUpperCase());
    } else if (['0', '1', '2', '3'].includes(key)) {
      optionIdx = parseInt(key);
    } else {
      return; // Skip unknown key format
    }
    
    const isCorrectOption = optionIdx === correctIdx;
    
    // Check for contradictions
    if (isCorrectOption) {
      // The correct answer's whyWrong should say it's CORRECT, not WRONG
      if (text.includes('is wrong') && !text.includes('is correct')) {
        addIssue('whyWrong-contradiction', q.courseId, q.section, q.id,
          `Option ${labels[optionIdx]} (correctAnswer=${correctIdx}) whyWrong says "is wrong" but this is the CORRECT answer`);
      }
      if (text.startsWith('why option') && text.includes('is wrong')) {
        addIssue('whyWrong-contradiction', q.courseId, q.section, q.id,
          `Option ${labels[optionIdx]} (correctAnswer=${correctIdx}) whyWrong header says "is wrong" but this should be CORRECT`);
      }
    } else {
      // Wrong answer's whyWrong should say it's WRONG, not CORRECT  
      if (text.includes('is correct') && !text.includes('is wrong') && !text.includes('why option')) {
        // Be more careful - some explanations explain what would make it correct
        if (text.match(/\boption [a-d] is correct\b/i) && !text.includes('would be')) {
          addIssue('whyWrong-contradiction', q.courseId, q.section, q.id,
            `Option ${labels[optionIdx]} whyWrong says "is correct" but correctAnswer=${correctIdx} (${labels[correctIdx]})`);
        }
      }
    }
  });
}

function checkExplanationConsistency(q) {
  const explanation = normalizeText(q.explanation);
  const labels = ['A', 'B', 'C', 'D'];
  const correctIdx = q.correctAnswer;
  
  // Check if explanation mentions wrong answer as correct
  for (let i = 0; i < 4; i++) {
    if (i === correctIdx) continue;
    
    const optionText = normalizeText(q.options[i]);
    // Look for the wrong option being stated as correct in explanation
    const patterns = [
      `the correct answer is ${labels[i].toLowerCase()}`,
      `${labels[i].toLowerCase()} is correct`,
      `answer is option ${labels[i].toLowerCase()}`,
    ];
    
    for (const pattern of patterns) {
      if (explanation.includes(pattern)) {
        addIssue('explanation-contradiction', q.courseId, q.section, q.id,
          `Explanation mentions "${pattern}" but correctAnswer=${correctIdx} (${labels[correctIdx]})`);
        break;
      }
    }
  }
}

function checkDuplicateOptions(q) {
  const seen = new Map();
  const labels = ['A', 'B', 'C', 'D'];
  
  q.options.forEach((opt, idx) => {
    const normalized = normalizeText(opt);
    if (seen.has(normalized)) {
      addIssue('duplicate-options', q.courseId, q.section, q.id,
        `Option ${labels[idx]} is identical to Option ${labels[seen.get(normalized)]}: "${opt.substring(0, 50)}..."`);
    }
    seen.set(normalized, idx);
  });
}

function checkStructuralIssues(q) {
  // Missing or invalid correctAnswer
  if (q.correctAnswer === undefined || q.correctAnswer === null) {
    addIssue('missing-correctAnswer', q.courseId, q.section, q.id, 'correctAnswer is missing');
    return;
  }
  
  if (typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer > 3) {
    addIssue('invalid-correctAnswer', q.courseId, q.section, q.id, 
      `correctAnswer=${q.correctAnswer} (must be 0-3)`);
  }
  
  // Missing or wrong number of options
  if (!q.options || !Array.isArray(q.options)) {
    addIssue('missing-options', q.courseId, q.section, q.id, 'options array is missing');
  } else if (q.options.length !== 4) {
    addIssue('wrong-option-count', q.courseId, q.section, q.id, 
      `Has ${q.options.length} options instead of 4`);
  }
  
  // Missing question text
  if (!q.question || q.question.trim().length < 10) {
    addIssue('missing-question', q.courseId, q.section, q.id, 'Question text is missing or too short');
  }
  
  // Missing explanation
  if (!q.explanation || q.explanation.trim().length < 10) {
    addIssue('missing-explanation', q.courseId, q.section, q.id, 'Explanation is missing or too short');
  }
  
  // Empty options
  if (q.options) {
    q.options.forEach((opt, idx) => {
      if (!opt || opt.trim().length === 0) {
        addIssue('empty-option', q.courseId, q.section, q.id, 
          `Option ${['A', 'B', 'C', 'D'][idx]} is empty`);
      }
    });
  }
}

function checkContentQuality(q) {
  const questionText = normalizeText(q.question);
  const labels = ['A', 'B', 'C', 'D'];
  
  // Check for "all of the above" / "none of the above" patterns that might be problematic
  if (q.options) {
    const lastOpt = normalizeText(q.options[3]);
    if (lastOpt.includes('all of the above') || lastOpt.includes('all the above')) {
      // If "All of the above" is NOT the correct answer, the other options should have issues explained
      if (q.correctAnswer !== 3 && !q.whyWrong) {
        addIssue('quality-warning', q.courseId, q.section, q.id,
          '"All of the above" is option D but correctAnswer is not D - may need verification');
      }
    }
    
    if (lastOpt.includes('none of the above') || lastOpt.includes('none above')) {
      if (q.correctAnswer !== 3 && !q.whyWrong) {
        addIssue('quality-warning', q.courseId, q.section, q.id,
          '"None of the above" is option D but correctAnswer is not D - may need verification');
      }
    }
  }
  
  // Check for question/answer text that's too similar (might be copy-paste error)
  if (q.options) {
    const qWords = new Set(questionText.split(/\s+/).filter(w => w.length > 4));
    q.options.forEach((opt, idx) => {
      if (normalizeText(opt) === questionText.substring(0, 100)) {
        addIssue('quality-warning', q.courseId, q.section, q.id,
          `Option ${labels[idx]} appears to be identical to question text`);
      }
    });
  }
  
  // Check for obvious placeholder text
  const placeholders = ['xxx', 'todo', 'fixme', 'placeholder', 'insert answer'];
  const allText = [q.question, q.explanation, ...(q.options || [])].join(' ').toLowerCase();
  
  for (const ph of placeholders) {
    if (allText.includes(ph)) {
      addIssue('placeholder-text', q.courseId, q.section, q.id,
        `Contains placeholder text: "${ph}"`);
      break;
    }
  }
}

function checkWhyWrongCompleteness(q) {
  if (!q.whyWrong) return;
  
  const keys = Object.keys(q.whyWrong);
  const hasNumericKeys = keys.some(k => ['0', '1', '2', '3'].includes(k));
  const hasLetterKeys = keys.some(k => ['A', 'B', 'C', 'D'].includes(k.toUpperCase()));
  
  // Check if all 4 options have whyWrong explanations
  if (hasNumericKeys) {
    for (let i = 0; i < 4; i++) {
      if (!q.whyWrong[String(i)]) {
        addIssue('incomplete-whyWrong', q.courseId, q.section, q.id,
          `whyWrong missing for option ${i} (${['A', 'B', 'C', 'D'][i]})`);
      }
    }
  } else if (hasLetterKeys) {
    for (const letter of ['A', 'B', 'C', 'D']) {
      if (!q.whyWrong[letter]) {
        addIssue('incomplete-whyWrong', q.courseId, q.section, q.id,
          `whyWrong missing for option ${letter}`);
      }
    }
  }
}

function auditQuestion(q, exam, section) {
  stats.totalQuestions++;
  stats.byExam[exam] = (stats.byExam[exam] || 0) + 1;
  
  checkStructuralIssues(q);
  checkWhyWrongContradictions(q);
  checkExplanationConsistency(q);
  checkDuplicateOptions(q);
  checkContentQuality(q);
  checkWhyWrongCompleteness(q);
}

function loadQuestionsFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(content);
    return data.questions || [];
  } catch (err) {
    console.error(`Error loading ${filePath}: ${err.message}`);
    return [];
  }
}

function main() {
  console.log('='.repeat(70));
  console.log('COMPREHENSIVE QUESTION ACCURACY AUDIT');
  console.log('Auditing all 6 exams (CPA, EA, CMA, CIA, CISA, CFP)');
  console.log('='.repeat(70));
  console.log('');
  
  const allIds = new Set();
  const duplicateIds = [];
  
  for (const [exam, sections] of Object.entries(EXAMS)) {
    for (const section of sections) {
      const filePath = path.join(CONTENT_DIR, exam, section, 'questions.json');
      
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Missing: ${filePath}`);
        continue;
      }
      
      const questions = loadQuestionsFile(filePath);
      console.log(`📄 ${exam.toUpperCase()}/${section}: ${questions.length} questions`);
      
      questions.forEach(q => {
        // Check for duplicate IDs
        if (allIds.has(q.id)) {
          duplicateIds.push({ id: q.id, exam, section });
        } else {
          allIds.add(q.id);
        }
        
        auditQuestion(q, exam, section);
      });
    }
  }
  
  // Add duplicate ID issues
  duplicateIds.forEach(dup => {
    addIssue('duplicate-id', dup.exam, dup.section, dup.id, 'Duplicate question ID found');
  });
  
  console.log('');
  console.log('='.repeat(70));
  console.log('AUDIT RESULTS');
  console.log('='.repeat(70));
  console.log('');
  console.log(`Total questions audited: ${stats.totalQuestions}`);
  console.log(`Total issues found: ${issues.length}`);
  console.log('');
  
  // Group by exam
  const byExam = {};
  issues.forEach(issue => {
    if (!byExam[issue.exam]) byExam[issue.exam] = [];
    byExam[issue.exam].push(issue);
  });
  
  console.log('Issues by exam:');
  for (const [exam, examIssues] of Object.entries(byExam)) {
    console.log(`  ${exam.toUpperCase()}: ${examIssues.length} issues`);
  }
  console.log('');
  
  console.log('Issues by type:');
  for (const [type, count] of Object.entries(stats.issueTypes)) {
    console.log(`  ${type}: ${count}`);
  }
  console.log('');
  
  // Print detailed issues
  console.log('='.repeat(70));
  console.log('DETAILED ISSUE LOG');
  console.log('='.repeat(70));
  
  // Sort by severity - structural issues first, then contradictions, then quality
  const severityOrder = {
    'missing-correctAnswer': 1,
    'invalid-correctAnswer': 1,
    'missing-options': 1,
    'wrong-option-count': 1,
    'missing-question': 1,
    'empty-option': 2,
    'duplicate-id': 2,
    'whyWrong-contradiction': 3,
    'explanation-contradiction': 3,
    'duplicate-options': 4,
    'missing-explanation': 5,
    'incomplete-whyWrong': 6,
    'placeholder-text': 7,
    'quality-warning': 8,
  };
  
  issues.sort((a, b) => {
    const sevA = severityOrder[a.type] || 99;
    const sevB = severityOrder[b.type] || 99;
    if (sevA !== sevB) return sevA - sevB;
    if (a.exam !== b.exam) return a.exam.localeCompare(b.exam);
    return a.qId.localeCompare(b.qId);
  });
  
  let currentExam = '';
  for (const issue of issues) {
    if (issue.exam !== currentExam) {
      currentExam = issue.exam;
      console.log('');
      console.log(`--- ${currentExam.toUpperCase()} ---`);
    }
    
    console.log(`[${issue.type}] ${issue.section}/${issue.qId}`);
    console.log(`    ${issue.detail}`);
  }
  
  // Write JSON report
  const reportPath = path.join(__dirname, '..', 'docs', 'QUESTION_AUDIT_REPORT.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    stats: {
      ...stats,
      totalIssues: issues.length,
    },
    issues: issues,
  }, null, 2));
  console.log('');
  console.log(`📋 Full report saved to: docs/QUESTION_AUDIT_REPORT.json`);
  
  // Write markdown summary
  const mdPath = path.join(__dirname, '..', 'docs', 'QUESTION_AUDIT_REPORT.md');
  let md = `# Question Bank Audit Report\n\n`;
  md += `Generated: ${new Date().toISOString()}\n\n`;
  md += `## Summary\n\n`;
  md += `- **Total Questions Audited:** ${stats.totalQuestions}\n`;
  md += `- **Total Issues Found:** ${issues.length}\n\n`;
  
  md += `## Issues by Exam\n\n`;
  md += `| Exam | Questions | Issues |\n`;
  md += `|------|-----------|--------|\n`;
  for (const exam of Object.keys(EXAMS)) {
    const qCount = stats.byExam[exam] || 0;
    const iCount = byExam[exam]?.length || 0;
    md += `| ${exam.toUpperCase()} | ${qCount} | ${iCount} |\n`;
  }
  md += '\n';
  
  md += `## Issues by Type\n\n`;
  md += `| Type | Count | Severity |\n`;
  md += `|------|-------|----------|\n`;
  for (const [type, count] of Object.entries(stats.issueTypes).sort((a, b) => 
    (severityOrder[a[0]] || 99) - (severityOrder[b[0]] || 99))) {
    const sev = severityOrder[type] <= 2 ? '🔴 Critical' : 
                severityOrder[type] <= 4 ? '🟡 High' :
                severityOrder[type] <= 6 ? '🟠 Medium' : '🔵 Low';
    md += `| ${type} | ${count} | ${sev} |\n`;
  }
  md += '\n';
  
  md += `## Detailed Issues\n\n`;
  
  for (const exam of Object.keys(EXAMS)) {
    const examIssues = byExam[exam] || [];
    if (examIssues.length === 0) continue;
    
    md += `### ${exam.toUpperCase()} (${examIssues.length} issues)\n\n`;
    
    for (const issue of examIssues.sort((a, b) => 
      (severityOrder[a.type] || 99) - (severityOrder[b.type] || 99))) {
      md += `- **[${issue.type}]** \`${issue.section}/${issue.qId}\`\n`;
      md += `  - ${issue.detail}\n`;
    }
    md += '\n';
  }
  
  fs.writeFileSync(mdPath, md);
  console.log(`📋 Markdown report saved to: docs/QUESTION_AUDIT_REPORT.md`);
}

main();

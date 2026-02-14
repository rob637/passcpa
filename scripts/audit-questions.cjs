#!/usr/bin/env node
/**
 * Comprehensive Question Quality Audit
 * 
 * Checks ~14,800 questions across all 6 exams for quality issues that
 * would hurt user experience.
 * 
 * Run: node scripts/audit-questions.cjs [--fix] [--course cpa] [--severity critical]
 * 
 * Issue Categories:
 *   CRITICAL  — Would confuse or mislead a student
 *   HIGH      — Noticeably poor quality
 *   MEDIUM    — Sub-optimal but tolerable
 *   LOW       — Cosmetic / style
 */

const fs = require('fs');
const path = require('path');

// ──────────────────────────────────────────────
// Config
// ──────────────────────────────────────────────

const COURSES = ['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp'];

const VALID_DIFFICULTIES = ['easy', 'medium', 'hard', 'beginner', 'moderate', 'tough'];
const VALID_SKILL_LEVELS = [
  'Remembering', 'Understanding', 'Application', 'Analysis', 'Evaluation', 'Synthesis',
  'remembering', 'understanding', 'application', 'analysis', 'evaluation', 'synthesis',
  'Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create',
  'Knowledge', 'Comprehension',
];

const SEVERITY_WEIGHTS = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };

// ──────────────────────────────────────────────
// Parse arguments
// ──────────────────────────────────────────────

const args = process.argv.slice(2);
const flagCourse = args.includes('--course') ? args[args.indexOf('--course') + 1] : null;
const flagSeverity = args.includes('--severity') ? args[args.indexOf('--severity') + 1]?.toUpperCase() : null;
const flagVerbose = args.includes('--verbose') || args.includes('-v');
const flagJson = args.includes('--json');
const flagSummary = args.includes('--summary');
const flagLimit = args.includes('--limit') ? parseInt(args[args.indexOf('--limit') + 1]) : null;
const coursesToAudit = flagCourse ? [flagCourse] : COURSES;

// ──────────────────────────────────────────────
// Issue collector
// ──────────────────────────────────────────────

const issues = [];
const stats = {
  totalFiles: 0,
  totalQuestions: 0,
  byCourse: {},
  bySeverity: { CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0 },
  byCategory: {},
};

function addIssue(severity, category, questionId, file, message, details = {}) {
  if (flagSeverity && SEVERITY_WEIGHTS[severity] < SEVERITY_WEIGHTS[flagSeverity]) return;
  issues.push({ severity, category, questionId, file, message, ...details });
  stats.bySeverity[severity] = (stats.bySeverity[severity] || 0) + 1;
  stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;
}

// ──────────────────────────────────────────────
// Question Extraction (regex-based, no TS compile)
// ──────────────────────────────────────────────

/**
 * Parse question objects from a TypeScript file using regex.
 * This is a robust "good enough" parser that handles 99%+ of cases.
 */
function extractQuestions(content, filePath) {
  const questions = [];
  
  // Match object blocks in the array: { id: '...', ... }
  // Strategy: find each `id:` at question level (4-space or 2-space indent),
  // then extract all fields until the next question or end of array.
  
  // Split into question blocks by finding `id:` followed by question-level properties
  const idPattern = /^\s{2,6}id:\s*['"`]([^'"`]+)['"`]/gm;
  const idMatches = [];
  let match;
  while ((match = idPattern.exec(content)) !== null) {
    idMatches.push({ id: match[1], index: match.index });
  }
  
  for (let i = 0; i < idMatches.length; i++) {
    const start = idMatches[i].index;
    const end = i + 1 < idMatches.length ? idMatches[i + 1].index : content.length;
    const block = content.substring(start, end);
    
    const q = { id: idMatches[i].id, _raw: block, _file: filePath };
    
    // Extract simple string fields
    for (const field of ['courseId', 'section', 'blueprintArea', 'topic', 'subtopic', 'difficulty', 'skillLevel', 'question', 'explanation', 'reference', 'blueprintRef']) {
      const fm = block.match(new RegExp(`${field}:\\s*['"\`]([^'"\`]*?)['"\`]`, 's'));
      if (fm) q[field] = fm[1];
      // Also try template literals and multi-line
      if (!fm) {
        const fm2 = block.match(new RegExp(`${field}:\\s*['"\`]([\\s\\S]*?)['"\`]\\s*,`, 's'));
        if (fm2) q[field] = fm2[1];
      }
    }
    
    // Extract correctAnswer (number)
    const caMatch = block.match(/correctAnswer:\s*(\d+)/);
    if (caMatch) q.correctAnswer = parseInt(caMatch[1]);
    
    // Extract options array
    const optMatch = block.match(/options:\s*\[([\s\S]*?)\]\s*,/);
    if (optMatch) {
      const optContent = optMatch[1];
      // Extract individual option strings
      const opts = [];
      const optRegex = /['"`]([\s\S]*?)['"`]/g;
      let om;
      while ((om = optRegex.exec(optContent)) !== null) {
        opts.push(om[1]);
      }
      q.options = opts;
    }
    
    questions.push(q);
  }
  
  return questions;
}

// ──────────────────────────────────────────────
// Quality Checks
// ──────────────────────────────────────────────

function auditQuestion(q, allIds, courseId) {
  const file = q._file;
  const id = q.id;
  
  // ── CRITICAL: Would confuse/mislead students ──
  
  // 1. Duplicate options (exact match)
  if (q.options && q.options.length > 0) {
    const normalized = q.options.map(o => o.trim().toLowerCase());
    const seen = new Set();
    for (let i = 0; i < normalized.length; i++) {
      if (seen.has(normalized[i])) {
        addIssue('CRITICAL', 'duplicate-options', id, file,
          `Duplicate option: "${q.options[i]}"`,
          { optionIndex: i, options: q.options });
      }
      seen.add(normalized[i]);
    }
  }
  
  // 2. correctAnswer out of bounds
  if (q.correctAnswer !== undefined && q.options) {
    if (q.correctAnswer < 0 || q.correctAnswer >= q.options.length) {
      addIssue('CRITICAL', 'answer-out-of-bounds', id, file,
        `correctAnswer ${q.correctAnswer} out of bounds (${q.options.length} options)`,
        { correctAnswer: q.correctAnswer, optionCount: q.options.length });
    }
  }
  
  // 3. Missing correctAnswer
  if (q.correctAnswer === undefined) {
    addIssue('CRITICAL', 'missing-correct-answer', id, file,
      'No correctAnswer field found');
  }
  
  // 4. No options or wrong count
  if (!q.options || q.options.length === 0) {
    addIssue('CRITICAL', 'missing-options', id, file,
      'No options found');
  } else if (q.options.length < 4) {
    addIssue('CRITICAL', 'too-few-options', id, file,
      `Only ${q.options.length} options (need 4)`,
      { optionCount: q.options.length });
  } else if (q.options.length > 6) {
    addIssue('HIGH', 'too-many-options', id, file,
      `${q.options.length} options (expected 4-5)`,
      { optionCount: q.options.length });
  }
  
  // 5. Question text too short (fragments, not real questions)
  if (q.question) {
    const qLen = q.question.trim().length;
    if (qLen < 15) {
      addIssue('CRITICAL', 'question-too-short', id, file,
        `Question only ${qLen} chars: "${q.question.trim()}"`,
        { length: qLen });
    } else if (qLen < 30) {
      addIssue('HIGH', 'question-short', id, file,
        `Question only ${qLen} chars: "${q.question.substring(0, 60)}"`,
        { length: qLen });
    }
  } else {
    addIssue('CRITICAL', 'missing-question-text', id, file,
      'No question text found');
  }
  
  // 6. Missing explanation
  if (!q.explanation) {
    addIssue('HIGH', 'missing-explanation', id, file,
      'No explanation provided');
  } else if (q.explanation.trim().length < 20) {
    addIssue('HIGH', 'explanation-too-short', id, file,
      `Explanation only ${q.explanation.trim().length} chars`,
      { length: q.explanation.trim().length });
  }
  
  // 7. Options that are too short (single char, empty, too vague)
  if (q.options) {
    for (let i = 0; i < q.options.length; i++) {
      const opt = q.options[i].trim();
      if (opt.length === 0) {
        addIssue('CRITICAL', 'empty-option', id, file,
          `Option ${i} is empty`,
          { optionIndex: i });
      } else if (opt.length === 1 && !opt.match(/^\d$/)) {
        addIssue('HIGH', 'single-char-option', id, file,
          `Option ${i} is single character: "${opt}"`,
          { optionIndex: i });
      }
    }
  }
  
  // 8. "All of the above" / "None of the above" as correct when not last
  if (q.options && q.correctAnswer !== undefined) {
    for (let i = 0; i < q.options.length; i++) {
      const optLower = q.options[i].toLowerCase().trim();
      if ((optLower.includes('all of the above') || optLower.includes('none of the above')) && i !== q.options.length - 1) {
        addIssue('MEDIUM', 'aota-nota-not-last', id, file,
          `"${q.options[i].substring(0, 40)}" should be last option (currently option ${i})`,
          { optionIndex: i });
      }
    }
  }
  
  // ── HIGH: Noticeably poor quality ──
  
  // 9. Correct answer gives itself away (option significantly longer than others)
  if (q.options && q.options.length >= 4 && q.correctAnswer !== undefined && q.correctAnswer < q.options.length) {
    const lengths = q.options.map(o => o.trim().length);
    const correctLen = lengths[q.correctAnswer];
    const avgOtherLen = lengths.filter((_, i) => i !== q.correctAnswer).reduce((a, b) => a + b, 0) / (lengths.length - 1);
    if (correctLen > 0 && avgOtherLen > 0 && correctLen > avgOtherLen * 3 && correctLen > 50) {
      addIssue('MEDIUM', 'correct-answer-standout-length', id, file,
        `Correct option (${correctLen} chars) is ${(correctLen / avgOtherLen).toFixed(1)}x longer than average distractor (${Math.round(avgOtherLen)} chars)`,
        { correctLen, avgOtherLen: Math.round(avgOtherLen) });
    }
  }
  
  // 10. Duplicate question text (will be checked globally)
  
  // 11. "Which of the following is NOT" with positive correct answer phrasing
  // (This is a structural check — just flag for review)
  
  // 12. Missing required fields
  if (!q.section) {
    addIssue('HIGH', 'missing-section', id, file, 'Missing section field');
  }
  if (!q.topic) {
    addIssue('MEDIUM', 'missing-topic', id, file, 'Missing topic field');
  }
  if (!q.difficulty) {
    addIssue('HIGH', 'missing-difficulty', id, file, 'Missing difficulty field');
  } else if (!VALID_DIFFICULTIES.includes(q.difficulty)) {
    addIssue('HIGH', 'invalid-difficulty', id, file,
      `Invalid difficulty: "${q.difficulty}"`,
      { value: q.difficulty });
  }
  
  // 13. CourseId mismatch
  if (q.courseId && q.courseId !== courseId) {
    addIssue('HIGH', 'courseid-mismatch', id, file,
      `courseId "${q.courseId}" doesn't match expected "${courseId}"`,
      { expected: courseId, actual: q.courseId });
  }
  
  // ── MEDIUM: Sub-optimal ──
  
  // 14. Missing courseId
  if (!q.courseId) {
    addIssue('MEDIUM', 'missing-courseid', id, file, 'Missing courseId field');
  }
  
  // 15. Missing blueprintArea
  if (!q.blueprintArea) {
    addIssue('MEDIUM', 'missing-blueprint', id, file, 'Missing blueprintArea field');
  }
  
  // 16. Missing skillLevel
  if (!q.skillLevel) {
    addIssue('MEDIUM', 'missing-skilllevel', id, file, 'Missing skillLevel field');
  }
  
  // 17. Options with inconsistent punctuation (some end with period, some don't)
  if (q.options && q.options.length >= 4) {
    const endsWithPeriod = q.options.map(o => /\.\s*$/.test(o.trim()));
    const periodCount = endsWithPeriod.filter(Boolean).length;
    // Only flag if it's a mix (not all or none)
    if (periodCount > 0 && periodCount < q.options.length && q.options.every(o => o.length > 10)) {
      addIssue('LOW', 'inconsistent-option-punctuation', id, file,
        `${periodCount}/${q.options.length} options end with period`,
        { periodCount });
    }
  }
  
  // 18. Question doesn't end with ? (for non-fill-in-blank, non-stem questions)
  if (q.question) {
    const qTrimmed = q.question.trim();
    const lastChar = qTrimmed[qTrimmed.length - 1];
    if (lastChar !== '?' && lastChar !== ':' && lastChar !== '.' && !qTrimmed.endsWith('___') && qTrimmed.length > 30) {
      // Only flag if it looks like it should be a question
      if (!qTrimmed.match(/select the|choose the|identify/i)) {
        addIssue('LOW', 'question-no-punctuation', id, file,
          `Question doesn't end with ? or : — ends with "${lastChar}"`,
          { lastChar });
      }
    }
  }
  
  // ── LOW: Cosmetic/style ──
  
  // 19. ID format (non-lowercase)
  if (id !== id.toLowerCase()) {
    addIssue('MEDIUM', 'uppercase-id', id, file,
      `ID "${id}" should be lowercase`);
  }
  
  // 20. Very long question (>800 chars — may indicate formatting issues)
  if (q.question && q.question.length > 800) {
    addIssue('LOW', 'question-very-long', id, file,
      `Question is ${q.question.length} chars`,
      { length: q.question.length });
  }
  
  // 21. Very long explanation (>1500 chars)
  if (q.explanation && q.explanation.length > 1500) {
    addIssue('LOW', 'explanation-very-long', id, file,
      `Explanation is ${q.explanation.length} chars`,
      { length: q.explanation.length });
  }
  
  // 22. Obvious placeholder text
  if (q.question) {
    const lower = q.question.toLowerCase();
    if (lower.includes('todo') || lower.includes('placeholder') || lower.includes('lorem ipsum') || lower.includes('fix me') || lower.includes('xxx')) {
      addIssue('CRITICAL', 'placeholder-text', id, file,
        `Question appears to contain placeholder text`);
    }
  }
  if (q.explanation) {
    const lower = q.explanation.toLowerCase();
    if (lower.includes('todo') || lower.includes('placeholder') || lower.includes('lorem ipsum') || lower.includes('fix me')) {
      addIssue('CRITICAL', 'placeholder-explanation', id, file,
        `Explanation appears to contain placeholder text`);
    }
  }
  
  // 23. Correct answer is always A (option 0) — checked at file level
  
  // 24. Options that just say "True" / "False" (should use T/F format, not MCQ)
  if (q.options && q.options.length === 4) {
    const tfOptions = q.options.filter(o => /^(true|false)$/i.test(o.trim()));
    if (tfOptions.length >= 2 && tfOptions.length < 4) {
      addIssue('MEDIUM', 'mixed-tf-mcq', id, file,
        `Options mix True/False with other choices`,
        { options: q.options.map(o => o.substring(0, 30)) });
    }
  }
  
  // 25. Near-duplicate options (after normalization)
  if (q.options && q.options.length >= 4) {
    const normalizedOpts = q.options.map(o => 
      o.trim().toLowerCase()
        .replace(/[.,;:!?]/g, '')
        .replace(/\s+/g, ' ')
    );
    for (let i = 0; i < normalizedOpts.length; i++) {
      for (let j = i + 1; j < normalizedOpts.length; j++) {
        if (normalizedOpts[i] === normalizedOpts[j] && normalizedOpts[i].length > 2) {
          addIssue('CRITICAL', 'near-duplicate-options', id, file,
            `Options ${i} and ${j} are near-duplicates after normalization: "${q.options[i].substring(0, 50)}"`,
            { optionI: i, optionJ: j });
        }
        // Check if one is substring of another (> 80% overlap) for options > 20 chars
        if (normalizedOpts[i].length > 20 && normalizedOpts[j].length > 20) {
          const shorter = normalizedOpts[i].length <= normalizedOpts[j].length ? normalizedOpts[i] : normalizedOpts[j];
          const longer = normalizedOpts[i].length > normalizedOpts[j].length ? normalizedOpts[i] : normalizedOpts[j];
          if (longer.includes(shorter) && shorter.length / longer.length > 0.9) {
            addIssue('HIGH', 'very-similar-options', id, file,
              `Options ${i} and ${j} are very similar (>90% overlap)`,
              { opt1: q.options[i].substring(0, 50), opt2: q.options[j].substring(0, 50) });
          }
        }
      }
    }
  }
}

// ──────────────────────────────────────────────
// File-level checks
// ──────────────────────────────────────────────

function auditFileLevel(questions, filePath) {
  if (questions.length === 0) return;
  
  // Check if all correct answers are the same (answer pattern bias)
  if (questions.length >= 5) {
    const answerCounts = {};
    for (const q of questions) {
      if (q.correctAnswer !== undefined) {
        answerCounts[q.correctAnswer] = (answerCounts[q.correctAnswer] || 0) + 1;
      }
    }
    for (const [ans, count] of Object.entries(answerCounts)) {
      const pct = count / questions.length;
      if (pct > 0.6 && questions.length >= 10) {
        addIssue('HIGH', 'answer-pattern-bias', `file:${path.basename(filePath)}`, filePath,
          `${Math.round(pct * 100)}% of correct answers are option ${ans} (${count}/${questions.length})`,
          { answer: parseInt(ans), count, total: questions.length, percentage: Math.round(pct * 100) });
      } else if (pct > 0.5 && questions.length >= 20) {
        addIssue('MEDIUM', 'answer-pattern-bias', `file:${path.basename(filePath)}`, filePath,
          `${Math.round(pct * 100)}% of correct answers are option ${ans} (${count}/${questions.length})`,
          { answer: parseInt(ans), count, total: questions.length, percentage: Math.round(pct * 100) });
      }
    }
  }
}

// ──────────────────────────────────────────────
// Global checks (cross-file)
// ──────────────────────────────────────────────

function auditGlobal(allQuestions) {
  // Duplicate IDs
  const idCounts = {};
  for (const q of allQuestions) {
    idCounts[q.id] = (idCounts[q.id] || []);
    idCounts[q.id].push(q._file);
  }
  for (const [id, files] of Object.entries(idCounts)) {
    if (files.length > 1) {
      const uniqueFiles = [...new Set(files)];
      addIssue('CRITICAL', 'duplicate-id', id, uniqueFiles[0],
        `ID "${id}" appears ${files.length} times in ${uniqueFiles.length} file(s)`,
        { count: files.length, files: uniqueFiles.map(f => path.relative(process.cwd(), f)) });
    }
  }
  
  // Duplicate question text (exact)
  const questionTexts = {};
  for (const q of allQuestions) {
    if (!q.question) continue;
    const normalized = q.question.trim().toLowerCase().replace(/\s+/g, ' ');
    if (normalized.length < 20) continue; // Skip very short
    if (!questionTexts[normalized]) questionTexts[normalized] = [];
    questionTexts[normalized].push({ id: q.id, file: q._file });
  }
  for (const [text, occurrences] of Object.entries(questionTexts)) {
    if (occurrences.length > 1) {
      addIssue('CRITICAL', 'duplicate-question-text', occurrences[0].id, occurrences[0].file,
        `Identical question text found in ${occurrences.length} questions: "${text.substring(0, 80)}..."`,
        { duplicateIds: occurrences.map(o => o.id), count: occurrences.length });
    }
  }
  
  // Near-duplicate question text (first 60 chars match, different IDs)
  const questionPrefixes = {};
  for (const q of allQuestions) {
    if (!q.question || q.question.length < 60) continue;
    const prefix = q.question.trim().toLowerCase().replace(/\s+/g, ' ').substring(0, 60);
    if (!questionPrefixes[prefix]) questionPrefixes[prefix] = [];
    questionPrefixes[prefix].push({ id: q.id, file: q._file, section: q.section });
  }
  for (const [prefix, occurrences] of Object.entries(questionPrefixes)) {
    if (occurrences.length > 2) {
      // Only flag if in same section (cross-section duplicates are less likely actual dupes)
      const bySec = {};
      for (const o of occurrences) {
        const sec = o.section || 'unknown';
        if (!bySec[sec]) bySec[sec] = [];
        bySec[sec].push(o);
      }
      for (const [sec, secOccs] of Object.entries(bySec)) {
        if (secOccs.length > 2) {
          addIssue('HIGH', 'near-duplicate-question-text', secOccs[0].id, secOccs[0].file,
            `${secOccs.length} questions in section ${sec} start with: "${prefix}..."`,
            { count: secOccs.length, ids: secOccs.slice(0, 5).map(o => o.id) });
        }
      }
    }
  }
}

// ──────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────

const log = flagJson ? (...args) => process.stderr.write(args.join(' ') + '\n') : console.log;

log('╔══════════════════════════════════════════════════════════════╗');
log('║         COMPREHENSIVE QUESTION QUALITY AUDIT               ║');
log('╚══════════════════════════════════════════════════════════════╝\n');

const allQuestions = [];

for (const courseId of coursesToAudit) {
  const questionsDir = path.join('src/data', courseId, 'questions');
  if (!fs.existsSync(questionsDir)) {
    // Also check for questions directly in course dir
    const altDir = path.join('src/data', courseId);
    if (!fs.existsSync(altDir)) continue;
  }
  
  // Find all TS files that might contain questions
  const baseDir = path.join('src/data', courseId);
  const files = [];
  
  function findTsFiles(dir) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        findTsFiles(full);
      } else if (entry.name.endsWith('.ts') && !entry.name.endsWith('index.ts') && !entry.name.endsWith('.d.ts')) {
        // Only include files that contain actual MCQ questions (must have correctAnswer)
        // Exclude TBS, case studies, and other non-MCQ formats
        const content = fs.readFileSync(full, 'utf8');
        const isTBS = content.includes('TBS') && (content.includes('scenario:') || content.includes('requirements:'));
        const isCaseStudy = content.includes('CaseStudy') || content.includes('case_study');
        const isWCTask = content.includes('WCTask') || content.includes('writtenCommunication');
        const isCBQ = (content.includes('CBQ') || content.includes('CBQScenario')) && content.includes('scenario:');
        if (content.includes('correctAnswer') && !isTBS && !isCaseStudy && !isWCTask && !isCBQ) {
          files.push(full);
        }
      }
    }
  }
  findTsFiles(baseDir);
  
  log(`📋 ${courseId.toUpperCase()}: Scanning ${files.length} files...`);
  stats.byCourse[courseId] = { files: files.length, questions: 0, issues: 0 };
  
  for (const filePath of files) {
    const content = fs.readFileSync(filePath, 'utf8');
    const questions = extractQuestions(content, filePath);
    
    stats.totalFiles++;
    stats.totalQuestions += questions.length;
    stats.byCourse[courseId].questions += questions.length;
    
    const issuesBefore = issues.length;
    
    // Audit each question
    for (const q of questions) {
      auditQuestion(q, null, courseId);
    }
    
    // File-level checks
    auditFileLevel(questions, filePath);
    
    stats.byCourse[courseId].issues += issues.length - issuesBefore;
    
    allQuestions.push(...questions);
  }
}

// Global cross-file checks
log(`\n🔍 Running cross-file checks on ${allQuestions.length} questions...`);
auditGlobal(allQuestions);

// ──────────────────────────────────────────────
// Output
// ──────────────────────────────────────────────

if (flagJson) {
  const output = {
    stats: { ...stats, totalIssues: issues.length },
    issues: flagLimit ? issues.slice(0, flagLimit) : issues,
  };
  process.stdout.write(JSON.stringify(output, null, 2));
  process.exit(issues.filter(i => i.severity === 'CRITICAL').length > 0 ? 1 : 0);
}

log('\n' + '═'.repeat(64));
log('  AUDIT RESULTS');
log('═'.repeat(64));
log(`  Total files:     ${stats.totalFiles}`);
log(`  Total questions: ${stats.totalQuestions}`);
log(`  Total issues:    ${issues.length}`);
log('');

// Summary by course
log('  📊 By Course:');
for (const [courseId, data] of Object.entries(stats.byCourse)) {
  log(`     ${courseId.toUpperCase().padEnd(6)} ${String(data.questions).padStart(5)} questions  ${String(data.issues).padStart(4)} issues  (${data.files} files)`);
}

log('');
log('  🔴 By Severity:');
for (const [sev, count] of Object.entries(stats.bySeverity)) {
  if (count > 0) {
    const icon = sev === 'CRITICAL' ? '🔴' : sev === 'HIGH' ? '🟠' : sev === 'MEDIUM' ? '🟡' : '⚪';
    log(`     ${icon} ${sev.padEnd(10)} ${count}`);
  }
}

log('');
log('  📂 By Category:');
const sortedCategories = Object.entries(stats.byCategory).sort((a, b) => b[1] - a[1]);
for (const [cat, count] of sortedCategories) {
  log(`     ${cat.padEnd(35)} ${count}`);
}

// Show issues grouped by severity
if (!flagSummary) {
  for (const severity of ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']) {
    const sevIssues = issues.filter(i => i.severity === severity);
    if (sevIssues.length === 0) continue;
    
    const icon = severity === 'CRITICAL' ? '🔴' : severity === 'HIGH' ? '🟠' : severity === 'MEDIUM' ? '🟡' : '⚪';
    log(`\n${icon} ═══ ${severity} ISSUES (${sevIssues.length}) ═══`);
    
    const toShow = flagLimit ? sevIssues.slice(0, flagLimit) : (flagVerbose ? sevIssues : sevIssues.slice(0, 50));
    
    for (const issue of toShow) {
      const relFile = path.relative(process.cwd(), issue.file);
      log(`  [${issue.category}] ${issue.questionId}`);
      log(`    ${issue.message}`);
      if (flagVerbose) log(`    File: ${relFile}`);
    }
    
    if (!flagVerbose && sevIssues.length > 50) {
      log(`  ... and ${sevIssues.length - 50} more. Use --verbose to see all.`);
    }
  }
}

log('\n' + '═'.repeat(64));
const critCount = stats.bySeverity.CRITICAL || 0;
const highCount = stats.bySeverity.HIGH || 0;
if (critCount > 0) {
  log(`  ❌ ${critCount} CRITICAL issues need fixing`);
}
if (highCount > 0) {
  log(`  ⚠️  ${highCount} HIGH issues should be reviewed`);
}
if (critCount === 0 && highCount === 0) {
  log('  ✅ No critical or high-severity issues found!');
}
log('═'.repeat(64));

process.exit(critCount > 0 ? 1 : 0);

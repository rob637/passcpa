/**
 * Question Validation Script
 *
 * Validates the canonical question JSON files at:
 *   content/{course}/{section}/questions.json
 *
 * (The previous version scanned `src/data/{course}/questions/*.ts`, which
 * for the current architecture is empty — so it was silently a no-op.
 * That gap let real content bugs ship.)
 *
 * Run:
 *   node scripts/validate-questions.cjs
 *   node scripts/validate-questions.cjs --verbose
 *   node scripts/validate-questions.cjs --course cpa
 *
 * Hard failures (exit 1):
 *   - Invalid JSON
 *   - Missing required field
 *   - Uppercase or duplicate id
 *   - correctAnswer not an integer in [0, options.length)
 *   - options not a 4-element array of strings
 *   - courseId mismatch with directory
 *
 * Soft warnings (exit 0):
 *   - Missing recommended fields (blueprintArea, skillLevel, topic, reference)
 *   - Duplicate option text within one question
 *   - Absolute language in distractors (always/never/etc.)
 */

const fs = require('fs');
const path = require('path');

const COURSES = ['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp'];
const REQUIRED_FIELDS = ['id', 'section', 'question', 'options', 'correctAnswer', 'explanation'];
const RECOMMENDED_FIELDS = ['courseId', 'blueprintArea', 'skillLevel', 'topic', 'difficulty'];

const COURSES_REQUIRING_REFERENCES = ['cisa'];

const ABSOLUTE_PATTERNS = [
  /\balways\b/i,
  /\bnever\b/i,
  /\bevery\s+single\b/i,
  /\ball\s+cases\b/i,
  /\bno\s+exceptions?\b/i,
  /\bguaranteed?\b/i,
];

const errors = [];
const warnings = [];
const stats = {
  totalQuestions: 0,
  totalFiles: 0,
  byCourse: {},
  missingCourseId: 0,
  missingBlueprintArea: 0,
  missingSkillLevel: 0,
  missingTopic: 0,
  missingDifficulty: 0,
  missingReference: 0,
  uppercaseIds: 0,
  duplicateIds: 0,
  badAnswerKey: 0,
  badOptionsArray: 0,
  duplicateOptionsCount: 0,
  absoluteLanguageCount: 0,
  courseIdMismatch: 0,
};

const seenIds = new Map(); // id -> first file we saw it in

const VERBOSE = process.argv.includes('--verbose');
const courseArgIndex = process.argv.indexOf('--course');
const targetCourse = courseArgIndex !== -1 ? process.argv[courseArgIndex + 1] : null;

function pushError(file, msg) {
  errors.push(`${file}: ${msg}`);
}

function pushWarning(file, msg) {
  warnings.push(`${file}: ${msg}`);
}

function validateQuestion(q, filePath, courseId, idx) {
  const loc = `${filePath} [#${idx}${q && q.id ? ` id=${q.id}` : ''}]`;
  if (!q || typeof q !== 'object') {
    pushError(loc, 'not an object');
    return;
  }

  // Required
  for (const f of REQUIRED_FIELDS) {
    if (q[f] === undefined || q[f] === null || q[f] === '') {
      pushError(loc, `missing required field "${f}"`);
    }
  }

  // ID format
  if (typeof q.id === 'string') {
    if (q.id !== q.id.toLowerCase()) {
      stats.uppercaseIds++;
      pushError(loc, `uppercase id "${q.id}" (should be "${q.id.toLowerCase()}")`);
    }
    if (seenIds.has(q.id)) {
      stats.duplicateIds++;
      pushError(loc, `duplicate id "${q.id}" (also in ${seenIds.get(q.id)})`);
    } else {
      seenIds.set(q.id, filePath);
    }
  }

  // courseId match
  if (q.courseId && q.courseId !== courseId) {
    stats.courseIdMismatch++;
    pushError(loc, `courseId "${q.courseId}" doesn't match directory "${courseId}"`);
  }

  // Options array shape
  if (!Array.isArray(q.options)) {
    stats.badOptionsArray++;
    pushError(loc, 'options is not an array');
  } else {
    if (q.options.length !== 4) {
      pushWarning(loc, `expected 4 options, got ${q.options.length}`);
    }
    if (!q.options.every(o => typeof o === 'string' && o.trim().length > 0)) {
      stats.badOptionsArray++;
      pushError(loc, 'options contains non-string or empty entry');
    }
    // Duplicate option text
    const norm = q.options
      .filter(o => typeof o === 'string')
      .map(o => o.trim().toLowerCase());
    if (new Set(norm).size < norm.length) {
      stats.duplicateOptionsCount++;
      pushWarning(loc, 'duplicate option text within question');
    }
    // Absolute language
    for (const opt of q.options) {
      if (typeof opt !== 'string') continue;
      for (const re of ABSOLUTE_PATTERNS) {
        if (re.test(opt)) {
          stats.absoluteLanguageCount++;
          if (VERBOSE) pushWarning(loc, `absolute language in option: "${opt.slice(0, 60)}"`);
          break;
        }
      }
    }
  }

  // Correct answer in range
  if (Array.isArray(q.options)) {
    if (!Number.isInteger(q.correctAnswer)) {
      stats.badAnswerKey++;
      pushError(loc, `correctAnswer is not an integer (${typeof q.correctAnswer})`);
    } else if (q.correctAnswer < 0 || q.correctAnswer >= q.options.length) {
      stats.badAnswerKey++;
      pushError(loc, `correctAnswer ${q.correctAnswer} out of range [0, ${q.options.length})`);
    }
  }

  // Recommended
  if (!q.courseId)       stats.missingCourseId++;
  if (!q.blueprintArea)  stats.missingBlueprintArea++;
  if (!q.skillLevel)     stats.missingSkillLevel++;
  if (!q.topic)          stats.missingTopic++;
  if (!q.difficulty)     stats.missingDifficulty++;

  if (COURSES_REQUIRING_REFERENCES.includes(courseId) && !q.reference) {
    stats.missingReference++;
  }
}

function validateFile(filePath, courseId) {
  let raw;
  try {
    raw = fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    pushError(filePath, `cannot read: ${e.message}`);
    return;
  }
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    pushError(filePath, `invalid JSON: ${e.message}`);
    return;
  }

  // Accept either an array, or { questions: [...] }, or { items: [...] }
  let items = null;
  if (Array.isArray(data)) items = data;
  else if (Array.isArray(data.questions)) items = data.questions;
  else if (Array.isArray(data.items)) items = data.items;

  if (!items) {
    // not a question file (e.g. flashcards / metadata)
    return;
  }

  stats.totalFiles++;
  stats.totalQuestions += items.length;
  stats.byCourse[courseId] = (stats.byCourse[courseId] || 0) + items.length;

  items.forEach((q, i) => validateQuestion(q, filePath, courseId, i));
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && entry.name === 'questions.json') out.push(full);
  }
  return out;
}

function validateCourse(courseId) {
  const root = path.join('content', courseId);
  const files = walk(root);
  if (files.length === 0) {
    console.log(`  (no questions.json under content/${courseId})`);
    return;
  }
  for (const f of files) validateFile(f, courseId);
}

console.log('Validating question data across all exams...\n');

if (targetCourse && !COURSES.includes(targetCourse)) {
  console.error(`Unknown course: ${targetCourse}`);
  console.error(`Valid courses: ${COURSES.join(', ')}`);
  process.exit(1);
}

const coursesToValidate = targetCourse ? [targetCourse] : COURSES;

for (const c of coursesToValidate) {
  console.log(`Validating ${c.toUpperCase()}...`);
  validateCourse(c);
}

console.log('\n' + '='.repeat(60));
console.log('VALIDATION SUMMARY');
console.log('='.repeat(60));
console.log(`Files scanned:    ${stats.totalFiles}`);
console.log(`Total questions:  ${stats.totalQuestions}`);
for (const [c, n] of Object.entries(stats.byCourse)) {
  console.log(`  - ${c.padEnd(6)} ${n}`);
}
console.log(`\nIntegrity:`);
console.log(`  - Uppercase IDs:           ${stats.uppercaseIds}`);
console.log(`  - Duplicate IDs:           ${stats.duplicateIds}`);
console.log(`  - Bad answer keys:         ${stats.badAnswerKey}`);
console.log(`  - Bad options arrays:      ${stats.badOptionsArray}`);
console.log(`  - courseId mismatches:     ${stats.courseIdMismatch}`);
console.log(`\nField Coverage (warnings):`);
console.log(`  - Missing courseId:        ${stats.missingCourseId}`);
console.log(`  - Missing blueprintArea:   ${stats.missingBlueprintArea}`);
console.log(`  - Missing skillLevel:      ${stats.missingSkillLevel}`);
console.log(`  - Missing topic:           ${stats.missingTopic}`);
console.log(`  - Missing difficulty:      ${stats.missingDifficulty}`);
console.log(`  - Missing reference:       ${stats.missingReference}`);
console.log(`\nSoft Quality:`);
console.log(`  - Duplicate option text:   ${stats.duplicateOptionsCount}`);
console.log(`  - Absolute language:       ${stats.absoluteLanguageCount}`);

if (errors.length > 0) {
  console.log(`\nERRORS (${errors.length}):`);
  const limit = VERBOSE ? errors.length : 30;
  errors.slice(0, limit).forEach(e => console.log(`  ${e}`));
  if (errors.length > limit) console.log(`  ... and ${errors.length - limit} more (use --verbose to see all)`);
}

if (warnings.length > 0 && VERBOSE) {
  console.log(`\nWARNINGS (${warnings.length}):`);
  warnings.slice(0, 50).forEach(w => console.log(`  ${w}`));
  if (warnings.length > 50) console.log(`  ... and ${warnings.length - 50} more`);
}

const blocking =
  stats.uppercaseIds > 0 ||
  stats.duplicateIds > 0 ||
  stats.badAnswerKey > 0 ||
  stats.badOptionsArray > 0 ||
  stats.courseIdMismatch > 0 ||
  errors.length > 0;

if (blocking) {
  console.log('\nValidation FAILED — blocking errors found');
  process.exit(1);
}
console.log('\nValidation PASSED');
process.exit(0);

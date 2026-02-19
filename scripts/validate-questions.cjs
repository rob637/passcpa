/**
 * Question Validation Script
 * Validates question data consistency across all exams
 * 
 * Run with: node scripts/validate-questions.cjs
 * Run verbose: node scripts/validate-questions.cjs --verbose
 * Check specific course: node scripts/validate-questions.cjs --course cisa
 * 
 * Checks:
 * - Required fields present (id, courseId, section, blueprintArea, difficulty, skillLevel)
 * - ID format (lowercase)
 * - courseId matches file path
 * - Duplicate IDs
 * - Reference presence (CISA requires references)
 * - Distractor quality (absolute language detection)
 * - Duplicate options (same text in multiple choices)
 */

const fs = require('fs');
const path = require('path');

const COURSES = ['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp'];
const REQUIRED_FIELDS = ['id', 'section', 'difficulty', 'question', 'options', 'correctAnswer', 'explanation'];
const RECOMMENDED_FIELDS = ['courseId', 'blueprintArea', 'skillLevel', 'topic'];

// Courses that should have references
const COURSES_REQUIRING_REFERENCES = ['cisa'];

// Absolute language patterns that make poor distractors
const ABSOLUTE_PATTERNS = [
  /\balways\b/i,
  /\bnever\b/i,
  /\bevery\s+single\b/i,
  /\ball\s+cases\b/i,
  /\bno\s+exceptions?\b/i,
  /\bguaranteed?\b/i,
  /\bimpossible\b/i,
  /\bcannot\s+ever\b/i,
];

const errors = [];
const warnings = [];
const stats = {
  totalQuestions: 0,
  totalFiles: 0,
  missingCourseId: 0,
  missingBlueprintArea: 0,
  missingSkillLevel: 0,
  missingReference: 0,
  uppercaseIds: 0,
  duplicateIds: [],
  absoluteLanguageCount: 0,
  duplicateOptionsCount: 0,
};

const seenIds = new Set();

function extractFieldValues(content, field) {
  // Match question-level fields at 4-space indent (inside array of objects)
  // Pattern: '    id:' for question IDs vs '      { id:' for option IDs
  const regex = new RegExp(`^    ${field}:\\s*['"]([^'"]+)['"]`, 'gm');
  const values = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    values.push(match[1]);
  }
  return values;
}

function countOccurrences(content, field) {
  // Count at 4-space indent level (question object properties)
  const regex = new RegExp(`^    ${field}:`, 'gm');
  return (content.match(regex) || []).length;
}

function validateFile(filePath, courseId) {
  const content = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(process.cwd(), filePath);
  
  // Count questions (approximate by counting 'id:' occurrences at question level)
  const questionCount = countOccurrences(content, 'id');
  if (questionCount === 0) return;
  
  stats.totalFiles++;
  stats.totalQuestions += questionCount;
  
  // Check for required fields
  for (const field of REQUIRED_FIELDS) {
    const count = countOccurrences(content, field);
    if (count < questionCount) {
      errors.push(`${relativePath}: Missing '${field}' in ${questionCount - count} questions`);
    }
  }
  
  // Check for recommended fields
  const courseIdCount = countOccurrences(content, 'courseId');
  if (courseIdCount < questionCount) {
    stats.missingCourseId += questionCount - courseIdCount;
    warnings.push(`${relativePath}: Missing 'courseId' in ${questionCount - courseIdCount} questions`);
  }
  
  const blueprintAreaCount = countOccurrences(content, 'blueprintArea');
  if (blueprintAreaCount < questionCount) {
    stats.missingBlueprintArea += questionCount - blueprintAreaCount;
    warnings.push(`${relativePath}: Missing 'blueprintArea' in ${questionCount - blueprintAreaCount} questions`);
  }
  
  const skillLevelCount = countOccurrences(content, 'skillLevel');
  if (skillLevelCount < questionCount) {
    stats.missingSkillLevel += questionCount - skillLevelCount;
    warnings.push(`${relativePath}: Missing 'skillLevel' in ${questionCount - skillLevelCount} questions`);
  }
  
  // Check ID format (should be lowercase)
  const ids = extractFieldValues(content, 'id');
  for (const id of ids) {
    if (id !== id.toLowerCase()) {
      stats.uppercaseIds++;
      errors.push(`${relativePath}: Uppercase ID found: '${id}' (should be '${id.toLowerCase()}')`);
    }
    
    // Check for duplicates
    if (seenIds.has(id)) {
      stats.duplicateIds.push(id);
      errors.push(`${relativePath}: Duplicate ID: '${id}'`);
    }
    seenIds.add(id);
  }
  
  // Check courseId values match expected
  const courseIds = extractFieldValues(content, 'courseId');
  for (const cid of courseIds) {
    if (cid !== courseId) {
      errors.push(`${relativePath}: courseId '${cid}' doesn't match expected '${courseId}'`);
    }
  }

  // Check reference field presence (required for some courses)
  if (COURSES_REQUIRING_REFERENCES.includes(courseId)) {
    const referenceCount = countOccurrences(content, 'reference');
    if (referenceCount < questionCount) {
      stats.missingReference += questionCount - referenceCount;
      warnings.push(`${relativePath}: Missing 'reference' in ${questionCount - referenceCount} questions`);
    }
  }

  // Check for absolute language in options (poor distractor quality)
  for (const pattern of ABSOLUTE_PATTERNS) {
    const matches = content.match(pattern);
    if (matches) {
      stats.absoluteLanguageCount += matches.length;
      // Only warn once per file, not per occurrence
      if (matches.length > 0 && process.argv.includes('--verbose')) {
        warnings.push(`${relativePath}: Found ${matches.length} instances of absolute language (${pattern.source})`);
      }
    }
  }

  // Check for duplicate options (exact same text in multiple choices)
  // Extract options arrays - looking for patterns like options: ['A', 'B', 'C', 'D']
  const optionsMatches = content.match(/options:\s*\[[^\]]+\]/g) || [];
  for (const optionsBlock of optionsMatches) {
    // Extract individual option strings
    const optionStrings = optionsBlock.match(/'([^']+)'|"([^"]+)"/g) || [];
    const normalizedOptions = optionStrings.map(s => s.replace(/['"]/g, '').toLowerCase().trim());
    const uniqueOptions = new Set(normalizedOptions);
    if (uniqueOptions.size < normalizedOptions.length) {
      stats.duplicateOptionsCount++;
      warnings.push(`${relativePath}: Duplicate options detected in a question`);
    }
  }
}

function validateCourse(courseId) {
  const questionsDir = path.join('src/data', courseId, 'questions');
  
  if (!fs.existsSync(questionsDir)) {
    console.log(`  No questions directory for ${courseId}`);
    return;
  }
  
  const files = fs.readdirSync(questionsDir, { recursive: true })
    .filter(f => f.endsWith('.ts') && !f.endsWith('index.ts'));
  
  for (const file of files) {
    const filePath = path.join(questionsDir, file);
    if (fs.statSync(filePath).isFile()) {
      validateFile(filePath, courseId);
    }
  }
}

console.log('Validating question data across all exams...\n');

// Support --course flag to validate specific course
const courseArgIndex = process.argv.indexOf('--course');
const targetCourse = courseArgIndex !== -1 ? process.argv[courseArgIndex + 1] : null;
const coursesToValidate = targetCourse ? [targetCourse] : COURSES;

if (targetCourse && !COURSES.includes(targetCourse)) {
  console.error(`❌ Unknown course: ${targetCourse}`);
  console.error(`   Valid courses: ${COURSES.join(', ')}`);
  process.exit(1);
}

for (const course of coursesToValidate) {
  console.log(`Validating ${course.toUpperCase()}...`);
  validateCourse(course);
}

console.log('\n' + '='.repeat(60));
console.log('VALIDATION SUMMARY');
console.log('='.repeat(60));
console.log(`Total files scanned: ${stats.totalFiles}`);
console.log(`Total questions: ${stats.totalQuestions}`);
console.log(`\nField Coverage Issues:`);
console.log(`  - Missing courseId: ${stats.missingCourseId}`);
console.log(`  - Missing blueprintArea: ${stats.missingBlueprintArea}`);
console.log(`  - Missing skillLevel: ${stats.missingSkillLevel}`);
console.log(`  - Missing reference: ${stats.missingReference}`);
console.log(`\nQuality Issues:`);
console.log(`  - Uppercase IDs: ${stats.uppercaseIds}`);
console.log(`  - Duplicate IDs: ${stats.duplicateIds.length}`);
console.log(`  - Absolute language (always/never): ${stats.absoluteLanguageCount}`);
console.log(`  - Duplicate options: ${stats.duplicateOptionsCount}`);

if (errors.length > 0) {
  console.log(`\n❌ ERRORS (${errors.length}):`);
  errors.slice(0, 20).forEach(e => console.log(`  ${e}`));
  if (errors.length > 20) {
    console.log(`  ... and ${errors.length - 20} more errors`);
  }
}

if (warnings.length > 0 && process.argv.includes('--verbose')) {
  console.log(`\n⚠️  WARNINGS (${warnings.length}):`);
  warnings.slice(0, 20).forEach(w => console.log(`  ${w}`));
  if (warnings.length > 20) {
    console.log(`  ... and ${warnings.length - 20} more warnings`);
  }
}

const hasBlockingErrors = stats.uppercaseIds > 0 || stats.duplicateIds.length > 0;

if (hasBlockingErrors) {
  console.log('\n❌ Validation FAILED - blocking errors found');
  process.exit(1);
} else if (errors.length > 0) {
  console.log('\n⚠️  Validation passed with warnings');
  process.exit(0);
} else {
  console.log('\n✅ Validation PASSED');
  process.exit(0);
}

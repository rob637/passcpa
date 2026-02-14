/**
 * Question Validation Script
 * Validates question data consistency across all exams
 * 
 * Run with: node scripts/validate-questions.cjs
 * 
 * Checks:
 * - Required fields present (id, courseId, section, blueprintArea, difficulty, skillLevel)
 * - ID format (lowercase)
 * - courseId matches file path
 * - Duplicate IDs
 */

const fs = require('fs');
const path = require('path');

const COURSES = ['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp'];
const REQUIRED_FIELDS = ['id', 'section', 'difficulty', 'question', 'options', 'correctAnswer', 'explanation'];
const RECOMMENDED_FIELDS = ['courseId', 'blueprintArea', 'skillLevel', 'topic'];

const errors = [];
const warnings = [];
const stats = {
  totalQuestions: 0,
  totalFiles: 0,
  missingCourseId: 0,
  missingBlueprintArea: 0,
  missingSkillLevel: 0,
  uppercaseIds: 0,
  duplicateIds: [],
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

for (const course of COURSES) {
  console.log(`Validating ${course.toUpperCase()}...`);
  validateCourse(course);
}

console.log('\n' + '='.repeat(60));
console.log('VALIDATION SUMMARY');
console.log('='.repeat(60));
console.log(`Total files scanned: ${stats.totalFiles}`);
console.log(`Total questions: ${stats.totalQuestions}`);
console.log(`\nIssues found:`);
console.log(`  - Missing courseId: ${stats.missingCourseId}`);
console.log(`  - Missing blueprintArea: ${stats.missingBlueprintArea}`);
console.log(`  - Missing skillLevel: ${stats.missingSkillLevel}`);
console.log(`  - Uppercase IDs: ${stats.uppercaseIds}`);
console.log(`  - Duplicate IDs: ${stats.duplicateIds.length}`);

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

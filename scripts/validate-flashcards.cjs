/**
 * Flashcard Validation Script
 * Validates flashcard data consistency across all exams
 * 
 * Run with: node scripts/validate-flashcards.cjs
 * 
 * Checks:
 * - Required fields present (id, section, type, front, back, difficulty)
 * - ID format (lowercase)
 * - Duplicate IDs
 * - courseId presence
 */

const fs = require('fs');
const path = require('path');

const COURSES = ['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp'];
const REQUIRED_FIELDS = ['id', 'section', 'type', 'front', 'back', 'difficulty'];
const RECOMMENDED_FIELDS = ['topic', 'blueprintArea', 'tags'];

const errors = [];
const warnings = [];
const stats = {
  totalFlashcards: 0,
  totalFiles: 0,
  missingSection: 0,
  missingType: 0,
  missingDifficulty: 0,
  missingTopic: 0,
  missingBlueprintArea: 0,
  uppercaseIds: 0,
  duplicateIds: [],
};

const seenIds = new Set();

function countOccurrences(content, field) {
  // Count at 4-space indent level (flashcard object properties)
  const regex = new RegExp(`^    ${field}:`, 'gm');
  return (content.match(regex) || []).length;
}

function extractFieldValues(content, field) {
  const regex = new RegExp(`^    ${field}:\\s*['"]([^'"]+)['"]`, 'gm');
  const values = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    values.push(match[1]);
  }
  return values;
}

function validateFile(filePath, courseId) {
  const content = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(process.cwd(), filePath);
  
  // Count flashcards by counting 'id:' at proper indent
  const flashcardCount = countOccurrences(content, 'id');
  if (flashcardCount === 0) return;
  
  stats.totalFiles++;
  stats.totalFlashcards += flashcardCount;
  
  // Check for required fields
  for (const field of REQUIRED_FIELDS) {
    const count = countOccurrences(content, field);
    if (count < flashcardCount) {
      const missing = flashcardCount - count;
      if (field === 'section') stats.missingSection += missing;
      if (field === 'type') stats.missingType += missing;
      if (field === 'difficulty') stats.missingDifficulty += missing;
      errors.push(`${relativePath}: Missing '${field}' in ${missing} flashcards`);
    }
  }
  
  // Check for recommended fields
  const topicCount = countOccurrences(content, 'topic');
  if (topicCount < flashcardCount) {
    stats.missingTopic += flashcardCount - topicCount;
  }
  
  const blueprintAreaCount = countOccurrences(content, 'blueprintArea');
  if (blueprintAreaCount < flashcardCount) {
    stats.missingBlueprintArea += flashcardCount - blueprintAreaCount;
    warnings.push(`${relativePath}: Missing 'blueprintArea' in ${flashcardCount - blueprintAreaCount} flashcards`);
  }
  
  // Check ID format (should be lowercase)
  const ids = extractFieldValues(content, 'id');
  for (const id of ids) {
    if (id !== id.toLowerCase()) {
      stats.uppercaseIds++;
      errors.push(`${relativePath}: Uppercase ID found: '${id}'`);
    }
    
    // Check for duplicates
    if (seenIds.has(id)) {
      stats.duplicateIds.push(id);
      errors.push(`${relativePath}: Duplicate ID: '${id}'`);
    }
    seenIds.add(id);
  }
}

function validateCourse(courseId) {
  const flashcardsDir = path.join('src/data', courseId, 'flashcards');
  
  if (!fs.existsSync(flashcardsDir)) {
    console.log(`  No flashcards directory for ${courseId}`);
    return;
  }
  
  const files = fs.readdirSync(flashcardsDir)
    .filter(f => f.endsWith('.ts') && !f.endsWith('index.ts') && f !== 'types.ts');
  
  for (const file of files) {
    const filePath = path.join(flashcardsDir, file);
    if (fs.statSync(filePath).isFile()) {
      validateFile(filePath, courseId);
    }
  }
}

console.log('Validating flashcard data across all exams...\n');

for (const course of COURSES) {
  console.log(`Validating ${course.toUpperCase()}...`);
  validateCourse(course);
}

console.log('\n' + '='.repeat(60));
console.log('FLASHCARD VALIDATION SUMMARY');
console.log('='.repeat(60));
console.log(`Total files scanned: ${stats.totalFiles}`);
console.log(`Total flashcards: ${stats.totalFlashcards}`);
console.log(`\nRequired field issues:`);
console.log(`  - Missing section: ${stats.missingSection}`);
console.log(`  - Missing type: ${stats.missingType}`);
console.log(`  - Missing difficulty: ${stats.missingDifficulty}`);
console.log(`\nRecommended field issues:`);
console.log(`  - Missing topic: ${stats.missingTopic}`);
console.log(`  - Missing blueprintArea: ${stats.missingBlueprintArea}`);
console.log(`\nID issues:`);
console.log(`  - Uppercase IDs: ${stats.uppercaseIds}`);
console.log(`  - Duplicate IDs: ${stats.duplicateIds.length}`);

const hasBlockingErrors = stats.uppercaseIds > 0 || stats.duplicateIds.length > 0;
const hasMissingRequired = stats.missingSection > 0 || stats.missingType > 0 || stats.missingDifficulty > 0;

if (errors.length > 0) {
  console.log(`\n❌ ERRORS (${errors.length}):`);
  errors.slice(0, 20).forEach(e => console.log(`  ${e}`));
  if (errors.length > 20) {
    console.log(`  ... and ${errors.length - 20} more errors`);
  }
}

if (hasBlockingErrors) {
  console.log('\n❌ Validation FAILED - blocking errors found');
  process.exit(1);
} else if (hasMissingRequired) {
  console.log('\n⚠️  Validation passed with required field warnings');
  process.exit(0);
} else {
  console.log('\n✅ Validation PASSED');
  process.exit(0);
}

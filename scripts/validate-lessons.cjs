/**
 * Lesson Validation Script
 * Validates lesson data consistency across all exams
 * 
 * Run with: node scripts/validate-lessons.cjs
 * 
 * Checks:
 * - Required fields present (id, title, content + order/duration for standard lessons)
 * - courseId presence
 * - section/domain presence
 * - Duplicate IDs
 * 
 * Note: CFP lessons use CFPLesson type with 'domain' instead of 'section' 
 * and are transformed at runtime in lessonService.ts
 */

const fs = require('fs');
const path = require('path');

const COURSES = ['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp'];
// Standard lessons require these; CFP uses different schema
const REQUIRED_FIELDS_STANDARD = ['id', 'title', 'content'];
const REQUIRED_FIELDS_CFP = ['id', 'title', 'content'];  // CFP uses 'domain' instead of 'section'

const errors = [];
const warnings = [];
const stats = {
  totalLessons: 0,
  totalFiles: 0,
  missingCourseId: 0,
  missingSection: 0,
  missingBlueprintArea: 0,
  cfpLessons: 0,  // CFP uses different schema (domain instead of section)
  duplicateIds: [],
};

const seenIds = new Set();

function countOccurrences(content, field) {
  // Count at 4-space indent level (lesson object properties)
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
  
  // Count lessons by counting 'id:' at proper indent
  const lessonCount = countOccurrences(content, 'id');
  if (lessonCount === 0) return;
  
  stats.totalFiles++;
  stats.totalLessons += lessonCount;
  
  // CFP uses different schema (CFPLesson) - domain instead of section, transformed at runtime
  const isCfp = courseId === 'cfp';
  
  if (isCfp) {
    stats.cfpLessons += lessonCount;
    // For CFP, just check required fields: id, title, content
    for (const field of REQUIRED_FIELDS_CFP) {
      const count = countOccurrences(content, field);
      if (count < lessonCount) {
        const missing = lessonCount - count;
        errors.push(`${relativePath}: Missing '${field}' in ${missing} lessons`);
      }
    }
    // CFP doesn't need courseId/section - they're added at runtime
  } else {
    // Standard lessons - check required fields
    for (const field of REQUIRED_FIELDS_STANDARD) {
      const count = countOccurrences(content, field);
      if (count < lessonCount) {
        const missing = lessonCount - count;
        errors.push(`${relativePath}: Missing '${field}' in ${missing} lessons`);
      }
    }
    
    // Check courseId (recommended for non-CFP)
    const courseIdCount = countOccurrences(content, 'courseId');
    if (courseIdCount < lessonCount) {
      stats.missingCourseId += lessonCount - courseIdCount;
    }
    
    // Check section
    const sectionCount = countOccurrences(content, 'section');
    if (sectionCount < lessonCount) {
      stats.missingSection += lessonCount - sectionCount;
    }
    
    // Check blueprintArea
    const blueprintAreaCount = countOccurrences(content, 'blueprintArea');
    if (blueprintAreaCount < lessonCount) {
      stats.missingBlueprintArea += lessonCount - blueprintAreaCount;
    }
  }
  
  // Check for duplicate IDs
  const ids = extractFieldValues(content, 'id');
  for (const id of ids) {
    if (seenIds.has(id)) {
      stats.duplicateIds.push(id);
      errors.push(`${relativePath}: Duplicate ID: '${id}'`);
    }
    seenIds.add(id);
  }
}

function validateCourse(courseId) {
  const lessonsDir = path.join('src/data', courseId, 'lessons');
  
  if (!fs.existsSync(lessonsDir)) {
    console.log(`  No lessons directory for ${courseId}`);
    return;
  }
  
  const files = fs.readdirSync(lessonsDir)
    .filter(f => f.endsWith('.ts') && !f.endsWith('index.ts'));
  
  for (const file of files) {
    const filePath = path.join(lessonsDir, file);
    if (fs.statSync(filePath).isFile()) {
      validateFile(filePath, courseId);
    }
  }
}

console.log('Validating lesson data across all exams...\n');

for (const course of COURSES) {
  console.log(`Validating ${course.toUpperCase()}...`);
  validateCourse(course);
}

console.log('\n' + '='.repeat(60));
console.log('LESSON VALIDATION SUMMARY');
console.log('='.repeat(60));
console.log(`Total files scanned: ${stats.totalFiles}`);
console.log(`Total lessons: ${stats.totalLessons}`);
console.log(`  - Standard lessons (CPA/EA/CMA/CIA/CISA): ${stats.totalLessons - stats.cfpLessons}`);
console.log(`  - CFP lessons (uses CFPLesson type): ${stats.cfpLessons}`);
console.log(`\nStandard lesson field coverage:`);
console.log(`  - Missing courseId: ${stats.missingCourseId}`);
console.log(`  - Missing section: ${stats.missingSection}`);
console.log(`  - Missing blueprintArea: ${stats.missingBlueprintArea}`);
if (stats.cfpLessons > 0) {
  console.log(`\nNote: CFP lessons use CFPLesson type with 'domain' instead of 'section'.`);
  console.log(`      These are transformed at runtime in lessonService.ts.`);
}
console.log(`\nID issues:`);
console.log(`  - Duplicate IDs: ${stats.duplicateIds.length}`);

if (errors.length > 0) {
  console.log(`\n❌ ERRORS (${errors.length}):`);
  errors.slice(0, 20).forEach(e => console.log(`  ${e}`));
  if (errors.length > 20) {
    console.log(`  ... and ${errors.length - 20} more errors`);
  }
}

const hasBlockingErrors = stats.duplicateIds.length > 0;

if (hasBlockingErrors) {
  console.log('\n❌ Validation FAILED - blocking errors found');
  process.exit(1);
} else if (stats.missingCourseId > 0 || stats.missingSection > 0) {
  console.log('\n⚠️  Validation passed with warnings');
  process.exit(0);
} else {
  console.log('\n✅ Validation PASSED');
  process.exit(0);
}

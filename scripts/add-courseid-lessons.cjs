#!/usr/bin/env node
/**
 * Adds courseId to lesson files that are missing it
 * Usage: node scripts/add-courseid-lessons.cjs <course> <path-to-lessons-dir>
 * Example: node scripts/add-courseid-lessons.cjs cpa src/data/cpa/lessons
 */

const fs = require('fs');
const path = require('path');

const courseId = process.argv[2];
const lessonsDir = process.argv[3];

if (!courseId || !lessonsDir) {
  console.log('Usage: node scripts/add-courseid-lessons.cjs <courseId> <lessons-dir>');
  console.log('Example: node scripts/add-courseid-lessons.cjs cpa src/data/cpa/lessons');
  process.exit(1);
}

const files = fs.readdirSync(lessonsDir)
  .filter(f => f.endsWith('.ts') && f !== 'index.ts');

let totalFixed = 0;

files.forEach(file => {
  const filePath = path.join(lessonsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Count lessons before fix
  const lessonCount = (content.match(/^    id: '/gm) || []).length;
  const hasIdCount = (content.match(/courseId: /g) || []).length;
  
  if (hasIdCount >= lessonCount) {
    console.log(`  ✓ ${file}: already has courseId (${hasIdCount}/${lessonCount})`);
    return;
  }
  
  // Add courseId after each lesson's id line (4-space indent means top-level lesson property)
  // Pattern: id: 'xxx',\n (followed by anything that's not already courseId)
  const fixed = content.replace(
    /^(    id: '[^']+',)\n(?!    courseId:)/gm,
    `$1\n    courseId: '${courseId}',\n`
  );
  
  if (fixed !== content) {
    fs.writeFileSync(filePath, fixed);
    const newCount = (fixed.match(/courseId: /g) || []).length;
    console.log(`  ✔ ${file}: added courseId (${newCount}/${lessonCount} lessons)`);
    totalFixed += (newCount - hasIdCount);
  } else {
    console.log(`  - ${file}: no changes needed`);
  }
});

console.log(`\nTotal courseId added: ${totalFixed}`);

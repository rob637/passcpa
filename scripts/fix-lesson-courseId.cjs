/**
 * Fix missing courseId in lesson files
 * Adds courseId field based on folder structure
 * 
 * Run with: node scripts/fix-lesson-courseId.cjs
 */

const fs = require('fs');
const path = require('path');

const COURSES = ['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp'];
let totalChanges = 0;
let filesFixed = 0;

function processFile(filePath, courseId) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Skip if courseId already exists at lesson level
  if (content.includes("    courseId:")) {
    return false;
  }
  
  // Skip if file doesn't contain lesson objects (e.g., index.ts)
  if (!content.includes('section:') || !content.includes('title:')) {
    return false;
  }
  
  let modified = false;
  
  // Add courseId after section field in each lesson object
  // Pattern: after section line, add courseId if not present
  const sectionPattern = /^(    section:\s*'[^']+',\n)(    (?:title|courseId):)/gm;
  
  if (content.match(/^    section:\s*'[^']+',\n    title:/gm)) {
    content = content.replace(
      /^(    section:\s*'[^']+',\n)(    title:)/gm,
      `$1    courseId: '${courseId}',\n$2`
    );
    modified = true;
  }
  
  // Also handle CFP lessons that use 'domain' instead of 'section'
  if (courseId === 'cfp' && content.match(/^    domain:\s*'[^']+',\n    title:/gm)) {
    content = content.replace(
      /^(    domain:\s*'[^']+',\n)(    title:)/gm,
      `$1    courseId: '${courseId}',\n$2`
    );
    modified = true;
  }
  
  if (modified) {
    // Count how many courseId fields were added
    const courseIdCount = (content.match(/courseId: 'cpa'|courseId: 'ea'|courseId: 'cma'|courseId: 'cia'|courseId: 'cisa'|courseId: 'cfp'/g) || []).length;
    totalChanges += courseIdCount;
    
    fs.writeFileSync(filePath, content, 'utf8');
    filesFixed++;
    return true;
  }
  
  return false;
}

console.log('Adding courseId to lesson files...\n');

for (const course of COURSES) {
  const lessonsDir = path.join('src/data', course, 'lessons');
  if (!fs.existsSync(lessonsDir)) continue;
  
  const files = fs.readdirSync(lessonsDir).filter(f => f.endsWith('.ts') && f !== 'index.ts' && f !== 'types.ts');
  
  for (const file of files) {
    const filePath = path.join(lessonsDir, file);
    if (processFile(filePath, course)) {
      console.log(`✓ ${filePath}`);
    }
  }
}

console.log(`\n✅ Added ${totalChanges} courseId fields across ${filesFixed} files`);

/**
 * Content Counter — counts all content items by type per course.
 * 
 * Uses directory structure as the source of truth:
 *   questions/  → MCQ questions
 *   tbs/        → Task-Based Simulations (CPA only)
 *   flashcards/ → Flashcards
 *   lessons/    → Lessons
 *   essays/     → Essays (CMA)
 *   cbq/        → Case-Based Questions (CMA)
 *   caseStudies/ or case-studies/ → Case Studies (CFP)
 *   itemSets/ or item-sets/      → Item Sets (CFP)
 *   mock-exams/ or mockExams/    → Mock Exams
 *   practice-simulations/        → Practice Simulations (CMA)
 * 
 * Counts top-level `id:` fields (indented with leading whitespace at start of line)
 * to avoid double-counting nested id references.
 * 
 * Usage: node scripts/count-content.cjs
 */

const fs = require('fs');
const path = require('path');

const courses = ['cpa', 'ea', 'cma', 'cia', 'cfp', 'cisa'];

// Content type → directory names that map to it
const CONTENT_TYPES = {
  questions:    ['questions'],
  tbs:          ['tbs'],
  flashcards:   ['flashcards'],
  lessons:      ['lessons'],
  essays:       ['essays'],
  cbq:          ['cbq'],
  caseStudies:  ['caseStudies', 'case-studies'],
  itemSets:     ['itemSets', 'item-sets'],
  mockExams:    ['mockExams', 'mock-exams'],
  simulations:  ['practice-simulations'],
};

function findTsFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findTsFiles(fullPath));
    } else if (entry.name.endsWith('.ts') && entry.name !== 'index.ts' && entry.name !== 'types.ts') {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Count top-level id: fields in a file.
 * Matches lines like:  `    id: 'something'` or `    id: "something"`
 * This avoids counting nested references like `blueprintId:` or inline `id:` in content.
 */
function countIds(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const matches = content.match(/^\s+id:\s*['"]/gm);
  return matches ? matches.length : 0;
}

function countDir(courseDir, dirNames) {
  let total = 0;
  for (const dirName of dirNames) {
    const dir = path.join(courseDir, dirName);
    const files = findTsFiles(dir);
    for (const file of files) {
      total += countIds(file);
    }
  }
  return total;
}

// ============================================================================
// Main
// ============================================================================

const allStats = {};
let grandTotal = { questions: 0, tbs: 0, flashcards: 0, lessons: 0 };

for (const course of courses) {
  const courseDir = path.join('src/data', course);
  const stats = {};
  
  for (const [type, dirNames] of Object.entries(CONTENT_TYPES)) {
    const count = countDir(courseDir, dirNames);
    if (count > 0) {
      stats[type] = count;
    }
  }
  
  allStats[course] = stats;
  
  // Accumulate grand totals for main types
  grandTotal.questions += stats.questions || 0;
  grandTotal.tbs += stats.tbs || 0;
  grandTotal.flashcards += stats.flashcards || 0;
  grandTotal.lessons += stats.lessons || 0;
}

// ============================================================================
// Output
// ============================================================================

console.log('\n╔══════════════════════════════════════════════════════════════╗');
console.log('║           VORAPREP CONTENT INVENTORY                       ║');
console.log('╠══════════════════════════════════════════════════════════════╣');

for (const course of courses) {
  const s = allStats[course];
  const parts = [];
  if (s.questions)   parts.push(`Questions: ${s.questions.toLocaleString()}`);
  if (s.tbs)         parts.push(`TBS: ${s.tbs.toLocaleString()}`);
  if (s.flashcards)  parts.push(`Flashcards: ${s.flashcards.toLocaleString()}`);
  if (s.lessons)     parts.push(`Lessons: ${s.lessons.toLocaleString()}`);
  if (s.essays)      parts.push(`Essays: ${s.essays.toLocaleString()}`);
  if (s.cbq)         parts.push(`CBQ: ${s.cbq.toLocaleString()}`);
  if (s.caseStudies) parts.push(`Case Studies: ${s.caseStudies.toLocaleString()}`);
  if (s.itemSets)    parts.push(`Item Sets: ${s.itemSets.toLocaleString()}`);
  if (s.mockExams)   parts.push(`Mock Exams: ${s.mockExams.toLocaleString()}`);
  if (s.simulations) parts.push(`Simulations: ${s.simulations.toLocaleString()}`);
  
  console.log(`║  ${course.toUpperCase().padEnd(6)} ${parts.join(' | ')}`);
}

console.log('╠══════════════════════════════════════════════════════════════╣');
console.log(`║  TOTAL  Questions: ${grandTotal.questions.toLocaleString()} | TBS: ${grandTotal.tbs.toLocaleString()} | Flashcards: ${grandTotal.flashcards.toLocaleString()} | Lessons: ${grandTotal.lessons.toLocaleString()}`);
console.log('╚══════════════════════════════════════════════════════════════╝');

// Output as JSON for programmatic use
console.log('\n--- JSON (for contentStats.ts) ---');
console.log(JSON.stringify(allStats, null, 2));

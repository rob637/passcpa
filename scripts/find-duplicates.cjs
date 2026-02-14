#!/usr/bin/env node
/**
 * Find duplicate questions (same question text within a course).
 * Outputs JSON with duplicate groups and their file locations.
 */

const fs = require('fs');
const path = require('path');

function findFiles(dir, pattern) {
  let results = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) results.push(...findFiles(full, pattern));
      else if (pattern.test(e.name)) results.push(full);
    }
  } catch {}
  return results;
}

// Course directories
const courses = ['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp'];
const allDuplicates = [];

for (const course of courses) {
  const questionsDir = path.join('src/data', course, 'questions');
  if (!fs.existsSync(questionsDir)) continue;
  
  const files = findFiles(questionsDir, /\.ts$/);
  
  // Skip index, types, non-question files
  const questionFiles = files.filter(f => {
    const base = path.basename(f);
    return !['index.ts', 'types.ts'].includes(base) && 
           !base.includes('lesson') && 
           !base.includes('tbs') && !base.includes('cbq') &&
           !base.includes('case-stud') && !base.includes('wc-task') &&
           !base.includes('essay');
  });

  // Extract all questions from all files for this course
  const questionsByText = new Map(); // normalized text → [{id, file, lineNum, questionText}]
  
  for (const file of questionFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    const relPath = path.relative(process.cwd(), file);
    
    // Find question objects by looking for id: and question: fields
    let currentId = null;
    let currentIdLine = 0;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Match id field
      const idMatch = line.match(/^\s+id:\s*['"]([^'"]+)['"]/);
      if (idMatch) {
        currentId = idMatch[1];
        currentIdLine = i + 1;
      }
      
      // Match question field (single-line)
      const qMatch = line.match(/^\s+question:\s*['"](.+?)['"]\s*,?\s*$/);
      if (qMatch && currentId) {
        const questionText = qMatch[1];
        const normalized = questionText.toLowerCase().trim()
          .replace(/\s+/g, ' ')
          .replace(/['"]/g, '')
          .replace(/\\'/g, "'");
        
        if (!questionsByText.has(normalized)) {
          questionsByText.set(normalized, []);
        }
        questionsByText.get(normalized).push({
          id: currentId,
          file: relPath,
          lineNum: currentIdLine,
          questionText: questionText.substring(0, 120)
        });
        currentId = null;
      }
      
      // Match text field (CFP format)
      const tMatch = line.match(/^\s+text:\s*['"](.+?)['"]\s*,?\s*$/);
      if (tMatch && currentId) {
        const questionText = tMatch[1];
        const normalized = questionText.toLowerCase().trim()
          .replace(/\s+/g, ' ')
          .replace(/['"]/g, '')
          .replace(/\\'/g, "'");
        
        if (!questionsByText.has(normalized)) {
          questionsByText.set(normalized, []);
        }
        questionsByText.get(normalized).push({
          id: currentId,
          file: relPath,
          lineNum: currentIdLine,
          questionText: questionText.substring(0, 120)
        });
        currentId = null;
      }
    }
  }
  
  // Find groups with >1 entry (duplicates)
  for (const [normalized, entries] of questionsByText) {
    if (entries.length > 1) {
      allDuplicates.push({
        course,
        count: entries.length,
        questionText: entries[0].questionText,
        entries
      });
    }
  }
}

// Sort by course then by count descending
allDuplicates.sort((a, b) => {
  if (a.course !== b.course) return a.course.localeCompare(b.course);
  return b.count - a.count;
});

// Summary
const summary = {};
for (const d of allDuplicates) {
  if (!summary[d.course]) summary[d.course] = { groups: 0, totalDuplicates: 0 };
  summary[d.course].groups++;
  summary[d.course].totalDuplicates += d.count - 1; // extras beyond first
}

console.error('\n=== Duplicate Question Summary ===');
let totalGroups = 0;
let totalDupes = 0;
for (const [course, stats] of Object.entries(summary)) {
  console.error(`  ${course.toUpperCase()}: ${stats.groups} groups, ${stats.totalDuplicates} duplicate questions to replace`);
  totalGroups += stats.groups;
  totalDupes += stats.totalDuplicates;
}
console.error(`  TOTAL: ${totalGroups} groups, ${totalDupes} duplicate questions\n`);

// Output JSON
const output = {
  summary,
  totalGroups,
  totalDuplicatesToReplace: totalDupes,
  duplicateGroups: allDuplicates
};

fs.writeFileSync('/tmp/duplicate-questions.json', JSON.stringify(output, null, 2));
console.error('Full results written to /tmp/duplicate-questions.json');

// Also output a compact list of just the duplicates to replace (keep first, replace rest)
const toReplace = [];
for (const group of allDuplicates) {
  // Keep the first entry, mark the rest for replacement
  for (let i = 1; i < group.entries.length; i++) {
    toReplace.push({
      course: group.course,
      id: group.entries[i].id,
      file: group.entries[i].file,
      lineNum: group.entries[i].lineNum,
      originalQuestion: group.entries[0].questionText,
      duplicateOf: group.entries[0].id
    });
  }
}

fs.writeFileSync('/tmp/duplicates-to-replace.json', JSON.stringify(toReplace, null, 2));
console.error(`Replacement list (${toReplace.length} items) written to /tmp/duplicates-to-replace.json`);

#!/usr/bin/env node
/**
 * Extract duplicate questions that need replacement.
 * For each duplicate group, keeps the first occurrence and outputs the rest
 * with their full context for replacement generation.
 * 
 * Output: /tmp/dupes-to-replace-full.json
 */

const fs = require('fs');
const path = require('path');

// Read audit results
const auditData = JSON.parse(fs.readFileSync('/tmp/question-audit-results.json', 'utf8'));
const dupeIssues = auditData.issues.filter(i => i.category === 'duplicate-question-text');

// Parse duplicate IDs from messages: "Identical to N other question(s) [id1, id2]: ..."
const toReplace = [];
for (const issue of dupeIssues) {
  const match = issue.message.match(/\[([^\]]+)\]/);
  if (!match) continue;
  const dupeIds = match[1].split(',').map(s => s.trim());
  for (const dupeId of dupeIds) {
    toReplace.push({
      id: dupeId,
      courseId: issue.courseId,
      duplicateOf: issue.questionId,
      originalText: issue.message.split('"').slice(-2, -1)[0] || ''
    });
  }
}

// Deduplicate (a question might be listed as duplicate of multiple others)
const seen = new Set();
const uniqueToReplace = [];
for (const item of toReplace) {
  if (!seen.has(item.id)) {
    seen.add(item.id);
    uniqueToReplace.push(item);
  }
}

console.log(`Total unique questions to replace: ${uniqueToReplace.length}`);

// Now find each question in source files and extract full context
function findQuestionInFile(dir, questionId) {
  const files = getAllTsFiles(dir);
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    // Check if this ID exists in the file
    if (content.indexOf("'" + questionId + "'") === -1 && 
        content.indexOf('"' + questionId + '"') === -1) continue;
    
    const lines = content.split('\n');
    const relPath = path.relative(process.cwd(), file);
    
    // Find the line with the ID
    let idLineIdx = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes("'" + questionId + "'") || lines[i].includes('"' + questionId + '"')) {
        if (lines[i].match(/^\s+id:/)) {
          idLineIdx = i;
          break;
        }
      }
    }
    if (idLineIdx === -1) continue;
    
    // Find the question object boundaries (look for opening { before and closing } or }, after)
    let startLine = idLineIdx;
    for (let i = idLineIdx - 1; i >= 0; i--) {
      if (lines[i].match(/^\s+\{/)) {
        startLine = i;
        break;
      }
    }
    
    // Find end: look for line with just `},` or `}` at same indent level
    const startIndent = lines[startLine].search(/\S/);
    let endLine = idLineIdx;
    let braceDepth = 0;
    for (let i = startLine; i < lines.length; i++) {
      for (const ch of lines[i]) {
        if (ch === '{') braceDepth++;
        if (ch === '}') braceDepth--;
      }
      if (braceDepth === 0) {
        endLine = i;
        break;
      }
    }
    
    // Extract key fields using regex on the object text
    const objText = lines.slice(startLine, endLine + 1).join('\n');
    
    const getField = (name) => {
      const m = objText.match(new RegExp(name + ":\\s*['\"]([^'\"]*)['\"]"));
      return m ? m[1] : null;
    };
    
    return {
      file: relPath,
      startLine: startLine + 1,
      endLine: endLine + 1,
      section: getField('section'),
      topic: getField('topic'),
      subtopic: getField('subtopic'),
      difficulty: getField('difficulty'),
      skillLevel: getField('skillLevel'),
      blueprintArea: getField('blueprintArea'),
      question: getField('question'),
      objectText: objText
    };
  }
  return null;
}

function getAllTsFiles(dir) {
  let results = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) results.push(...getAllTsFiles(full));
      else if (e.name.endsWith('.ts') && !e.name.startsWith('index') && !e.name.startsWith('types')) {
        results.push(full);
      }
    }
  } catch {}
  return results;
}

// Process each duplicate
const fullData = [];
let found = 0;
let notFound = 0;

for (const item of uniqueToReplace) {
  const questionsDir = path.join('src/data', item.courseId, 'questions');
  const info = findQuestionInFile(questionsDir, item.id);
  
  if (info) {
    fullData.push({
      ...item,
      ...info
    });
    found++;
  } else {
    console.error(`Not found: ${item.id} in ${item.courseId}`);
    notFound++;
  }
}

console.log(`Found: ${found}, Not found: ${notFound}`);

// Group by course for reporting
const byCourse = {};
fullData.forEach(d => {
  if (!byCourse[d.courseId]) byCourse[d.courseId] = [];
  byCourse[d.courseId].push(d);
});

console.log('\nPer course:');
Object.keys(byCourse).sort().forEach(c => {
  const items = byCourse[c];
  const sections = {};
  items.forEach(i => {
    const s = i.section || 'unknown';
    sections[s] = (sections[s] || 0) + 1;
  });
  console.log(`  ${c.toUpperCase()}: ${items.length} duplicates`);
  Object.entries(sections).sort((a,b) => b[1]-a[1]).forEach(([s, n]) => {
    console.log(`    ${s}: ${n}`);
  });
});

// Write full data
fs.writeFileSync('/tmp/dupes-to-replace-full.json', JSON.stringify(fullData, null, 2));
console.log(`\nFull data written to /tmp/dupes-to-replace-full.json`);

// Write summary per course for batch processing
Object.keys(byCourse).sort().forEach(c => {
  const items = byCourse[c];
  fs.writeFileSync(`/tmp/dupes-${c}.json`, JSON.stringify(items, null, 2));
  console.log(`  /tmp/dupes-${c}.json (${items.length} items)`);
});

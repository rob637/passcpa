#!/usr/bin/env node
/**
 * replace-duplicates.cjs
 * 
 * Takes a batch JSON file with replacement questions and applies them to source files.
 * 
 * Usage:
 *   node scripts/replace-duplicates.cjs <batch-file.json>
 * 
 * Batch file format:
 * [
 *   {
 *     "id": "cma2-b11-030",
 *     "question": "New question text here?",
 *     "options": ["Option A", "Option B", "Option C", "Option D"],
 *     "correctAnswer": 2,
 *     "explanation": "Explanation of correct answer."
 *   },
 *   ...
 * ]
 * 
 * The script looks up each ID in the duplicates JSON (/tmp/dupes-to-replace-full.json)
 * to find the file + line range, then replaces the question/options/correctAnswer/explanation
 * while keeping all other fields (id, courseId, section, topic, etc.) intact.
 */

const fs = require('fs');
const path = require('path');

const batchFile = process.argv[2];
if (!batchFile) {
  console.error('Usage: node scripts/replace-duplicates.cjs <batch-file.json>');
  process.exit(1);
}

// Load the full duplicates index
const allDupes = JSON.parse(fs.readFileSync('/tmp/dupes-to-replace-full.json', 'utf8'));
const dupeIndex = {};
allDupes.forEach(d => { dupeIndex[d.id] = d; });

// Load the batch replacements
const replacements = JSON.parse(fs.readFileSync(batchFile, 'utf8'));

console.log(`Processing ${replacements.length} replacements from ${batchFile}`);

let successCount = 0;
let failCount = 0;

// Group replacements by file to minimize file reads/writes
const byFile = {};
replacements.forEach(r => {
  const dupe = dupeIndex[r.id];
  if (!dupe) {
    console.error(`  ERROR: ID "${r.id}" not found in duplicates index`);
    failCount++;
    return;
  }
  if (!byFile[dupe.file]) byFile[dupe.file] = [];
  byFile[dupe.file].push({ replacement: r, dupe });
});

// Process each file
for (const [filePath, items] of Object.entries(byFile)) {
  const fullPath = path.resolve(filePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`  ERROR: File not found: ${fullPath}`);
    failCount += items.length;
    continue;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Sort items by startLine DESCENDING so we replace from bottom to top
  // (this preserves line numbers for earlier replacements)
  items.sort((a, b) => b.dupe.startLine - a.dupe.startLine);
  
  for (const { replacement, dupe } of items) {
    const lines = content.split('\n');
    const startIdx = dupe.startLine - 1; // Convert to 0-indexed
    const endIdx = dupe.endLine - 1;
    
    // Extract the original object text from current file content
    const originalLines = lines.slice(startIdx, endIdx + 1);
    const originalText = originalLines.join('\n');
    
    // Verify we have the right object by checking the ID
    if (!originalText.includes(`'${dupe.id}'`) && !originalText.includes(`"${dupe.id}"`)) {
      console.error(`  ERROR: ID "${dupe.id}" not found at lines ${dupe.startLine}-${dupe.endLine} in ${filePath}`);
      console.error(`         Content starts with: ${originalText.substring(0, 80)}`);
      failCount++;
      continue;
    }
    
    // Determine indentation from original
    const indentMatch = originalLines[0].match(/^(\s*)/);
    const baseIndent = indentMatch ? indentMatch[1] : '  ';
    const fieldIndent = baseIndent + '  ';
    
    // Escape single quotes in strings for JS source
    const esc = (s) => (s || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    
    // Detect format: Format 2 (isCorrect), Format 3 (correctOptionId), Format 1 (standard)
    const isFormat2 = originalText.includes('isCorrect');
    const isFormat3 = originalText.includes('correctOptionId');
    
    // Build the replacement object, preserving original metadata fields
    const newLines = [];
    newLines.push(`${baseIndent}{`);
    newLines.push(`${fieldIndent}id: '${dupe.id}',`);
    
    if (isFormat2) {
      // Format 2: domain, questionType, options as {id, text, isCorrect}
      const domainMatch = originalText.match(/domain:\s*'([^']*)'/);
      const qtMatch = originalText.match(/questionType:\s*'([^']*)'/);
      const cfpTopicMatch = originalText.match(/cfpTopicArea:\s*'([^']*)'/);
      const bloomMatch = originalText.match(/bloomLevel:\s*'([^']*)'/);
      const caseMatch = originalText.match(/caseStudyBased:\s*(true|false)/);
      const eduMatch = originalText.match(/educationalObjective:\s*'([^']*)'/);
      
      if (domainMatch) newLines.push(`${fieldIndent}domain: '${domainMatch[1]}',`);
      newLines.push(`${fieldIndent}topic: '${esc(dupe.topic || '')}',`);
      if (dupe.subtopic) newLines.push(`${fieldIndent}subtopic: '${esc(replacement.subtopic || dupe.subtopic)}',`);
      newLines.push(`${fieldIndent}question: '${esc(replacement.question)}',`);
      if (qtMatch) newLines.push(`${fieldIndent}questionType: '${qtMatch[1]}',`);
      newLines.push(`${fieldIndent}options: [`);
      const labels = ['a', 'b', 'c', 'd'];
      replacement.options.forEach((opt, idx) => {
        const isCorrect = idx === replacement.correctAnswer;
        newLines.push(`${fieldIndent}  { id: '${labels[idx]}', text: '${esc(opt)}', isCorrect: ${isCorrect} },`);
      });
      newLines.push(`${fieldIndent}],`);
      newLines.push(`${fieldIndent}explanation: '${esc(replacement.explanation)}',`);
      newLines.push(`${fieldIndent}difficulty: '${dupe.difficulty}',`);
      if (dupe.skillLevel) newLines.push(`${fieldIndent}skillLevel: '${esc(dupe.skillLevel)}',`);
      if (eduMatch) newLines.push(`${fieldIndent}educationalObjective: '${esc(replacement.educationalObjective || eduMatch[1])}',`);
      if (cfpTopicMatch) newLines.push(`${fieldIndent}cfpTopicArea: '${cfpTopicMatch[1]}',`);
      if (bloomMatch) newLines.push(`${fieldIndent}bloomLevel: '${bloomMatch[1]}',`);
      if (caseMatch) newLines.push(`${fieldIndent}caseStudyBased: ${caseMatch[1]},`);
    } else {
      // Format 1 (standard) or Format 3
      newLines.push(`${fieldIndent}courseId: '${dupe.courseId}',`);
      newLines.push(`${fieldIndent}section: '${dupe.section}',`);
      if (dupe.blueprintArea) newLines.push(`${fieldIndent}blueprintArea: '${dupe.blueprintArea}',`);
      newLines.push(`${fieldIndent}topic: '${esc(dupe.topic || '')}',`);
      if (dupe.subtopic) newLines.push(`${fieldIndent}subtopic: '${esc(dupe.subtopic)}',`);
      newLines.push(`${fieldIndent}difficulty: '${dupe.difficulty}',`);
      if (dupe.skillLevel) newLines.push(`${fieldIndent}skillLevel: '${esc(dupe.skillLevel)}',`);
      newLines.push(`${fieldIndent}question: '${esc(replacement.question)}',`);
      newLines.push(`${fieldIndent}options: [`);
      replacement.options.forEach(opt => {
        newLines.push(`${fieldIndent}  '${esc(opt)}',`);
      });
      newLines.push(`${fieldIndent}],`);
      newLines.push(`${fieldIndent}correctAnswer: ${replacement.correctAnswer},`);
      newLines.push(`${fieldIndent}explanation: '${esc(replacement.explanation)}',`);
    }
    
    // Check if original had a reference field and preserve it
    const refMatch = originalText.match(/reference:\s*'([^']*)'/);
    if (refMatch) {
      newLines.push(`${fieldIndent}reference: '${refMatch[1]}',`);
    }
    
    newLines.push(`${baseIndent}},`);
    
    // Replace the lines in the file
    const newText = newLines.join('\n');
    lines.splice(startIdx, endIdx - startIdx + 1, ...newText.split('\n'));
    content = lines.join('\n');
    
    successCount++;
    console.log(`  ✓ ${dupe.id} (${filePath}:${dupe.startLine})`);
  }
  
  // Write the modified file
  fs.writeFileSync(fullPath, content, 'utf8');
}

console.log(`\nDone: ${successCount} replaced, ${failCount} failed`);
if (failCount > 0) process.exit(1);

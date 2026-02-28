#!/usr/bin/env node
/**
 * Remove duplicate questions from CPA question files
 */

const fs = require('fs');
const path = require('path');

// Read duplicates list
const duplicates = JSON.parse(fs.readFileSync('/tmp/cpa-duplicates.json'));

// Group by section for efficient removal
const toRemove = {};
for (const d of duplicates) {
  const section = d.duplicate.section;
  if (!toRemove[section]) {
    toRemove[section] = [];
  }
  toRemove[section].push(d.duplicate.id);
}

console.log('IDs to remove:');
for (const section of Object.keys(toRemove)) {
  console.log(section + ':', toRemove[section].length, 'IDs');
}

console.log('\nRemoving duplicates from each section...');

let totalRemoved = 0;
for (const section of Object.keys(toRemove)) {
  const ids = toRemove[section];
  const jsonPath = path.join(__dirname, '..', 'content', 'cpa', section, 'questions.json');
  const data = JSON.parse(fs.readFileSync(jsonPath));
  
  const before = data.questions.length;
  data.questions = data.questions.filter(q => !ids.includes(q.id));
  const after = data.questions.length;
  const removed = before - after;
  totalRemoved += removed;
  
  // Write back
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
  console.log(section.toUpperCase() + ': ' + removed + ' removed (' + before + ' -> ' + after + ')');
}

console.log('\nTotal removed: ' + totalRemoved);

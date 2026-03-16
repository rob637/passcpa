#!/usr/bin/env node
/**
 * Merge enhanced fields from backup files into newly migrated JSON
 * 
 * Takes the expanded question set from migration and preserves
 * enhancement fields (whyWrong, educational, examTip, memoryAid) from backups.
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'content', 'cpa');
const SECTIONS = ['far', 'aud', 'reg', 'bar', 'isc', 'tcp'];

function findLatestBackup(sectionDir) {
  const files = fs.readdirSync(sectionDir)
    .filter(f => f.startsWith('questions.backup-') && f.endsWith('.json'))
    .sort()
    .reverse();
  return files[0] || null;
}

function mergeSection(section) {
  const sectionDir = path.join(CONTENT_DIR, section);
  const questionsPath = path.join(sectionDir, 'questions.json');
  const backupFile = findLatestBackup(sectionDir);
  
  if (!backupFile) {
    console.log(`  ${section.toUpperCase()}: No backup found, skipping`);
    return { merged: 0, total: 0 };
  }
  
  const backupPath = path.join(sectionDir, backupFile);
  console.log(`  ${section.toUpperCase()}: Using backup ${backupFile}`);
  
  // Load both files
  const currentData = JSON.parse(fs.readFileSync(questionsPath, 'utf-8'));
  const backupData = JSON.parse(fs.readFileSync(backupPath, 'utf-8'));
  
  // Create lookup from backup by question ID
  const backupLookup = {};
  for (const q of backupData.questions) {
    if (q.whyWrong || q.educational || q.examTip || q.memoryAid) {
      backupLookup[q.id] = q;
    }
  }
  
  console.log(`    Backup has ${Object.keys(backupLookup).length} enhanced questions`);
  console.log(`    Current has ${currentData.questions.length} total questions`);
  
  // Merge enhancement fields into current questions
  let mergedCount = 0;
  for (const q of currentData.questions) {
    const enhanced = backupLookup[q.id];
    if (enhanced) {
      if (enhanced.whyWrong) q.whyWrong = enhanced.whyWrong;
      if (enhanced.educational) q.educational = enhanced.educational;
      if (enhanced.examTip) q.examTip = enhanced.examTip;
      if (enhanced.memoryAid) q.memoryAid = enhanced.memoryAid;
      mergedCount++;
    }
  }
  
  // Save merged data
  fs.writeFileSync(questionsPath, JSON.stringify(currentData, null, 2));
  console.log(`    ✅ Merged ${mergedCount} enhanced questions`);
  
  return { merged: mergedCount, total: currentData.questions.length };
}

console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║          Merging Enhanced Backups with New Migration          ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

let totalMerged = 0;
let totalQuestions = 0;

for (const section of SECTIONS) {
  const result = mergeSection(section);
  totalMerged += result.merged;
  totalQuestions += result.total;
}

console.log(`\n════════════════════════════════════════════════════════════════`);
console.log(`  Total: ${totalMerged} enhanced questions preserved across ${totalQuestions} questions`);
console.log(`════════════════════════════════════════════════════════════════`);

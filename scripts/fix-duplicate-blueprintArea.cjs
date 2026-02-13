#!/usr/bin/env node
/**
 * Fix duplicate property keys in question files
 * Patterns to fix:
 * 1. blueprintArea appearing twice (remove second occurrence)
 * 2. skillLevel appearing twice (remove second occurrence)
 */

const fs = require('fs');
const path = require('path');

const filesToFix = [
  // CIA files
  'src/data/cia/questions/cia1-proficiency-questions.ts',
  'src/data/cia/questions/cia1-questions-batch5.ts',
  'src/data/cia/questions/cia2-questions-batch5.ts',
  'src/data/cia/questions/cia3-questions-batch5.ts',
  // CPA files
  'src/data/cpa/questions/aud-questions-extended.ts',
  'src/data/cpa/questions/aud-questions-reporting.ts',
  'src/data/cpa/questions/bar-questions-planning.ts',
  'src/data/cpa/questions/bar-questions.ts',
  'src/data/cpa/questions/blueprint-gap-fill.ts',
  'src/data/cpa/questions/easy-questions-expanded-2.ts',
  'src/data/cpa/questions/easy-questions-expanded.ts',
  'src/data/cpa/questions/easy-questions.ts',
  'src/data/cpa/questions/far-questions-extra.ts',
  'src/data/cpa/questions/far-questions-govt.ts',
  'src/data/cpa/questions/isc-questions.ts',
  'src/data/cpa/questions/reg-questions-extended.ts',
  'src/data/cpa/questions/tcp-questions.ts',
  // CFP files with duplicate keys
  'src/data/cfp/questions/investments.ts',
];

let totalFixed = 0;

// Properties that might be duplicated
const duplicateProps = ['blueprintArea', 'skillLevel', 'difficulty'];

filesToFix.forEach(filePath => {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`Skipping (not found): ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  const lines = content.split('\n');
  const newLines = [];
  let fixedCount = 0;
  
  // Track properties within each object (reset at { and })
  let propsInCurrentObject = new Set();
  let braceDepth = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Track brace depth to know when we're in/out of objects
    const openBraces = (line.match(/\{/g) || []).length;
    const closeBraces = (line.match(/\}/g) || []).length;
    
    // Check if entering a new object
    if (openBraces > 0) {
      braceDepth += openBraces;
      if (openBraces > closeBraces) {
        // New object, reset tracking
        propsInCurrentObject = new Set();
      }
    }
    
    // Check for duplicate property
    let isDuplicate = false;
    for (const prop of duplicateProps) {
      if (trimmed.startsWith(prop + ':') || trimmed.startsWith(`'${prop}':`)) {
        if (propsInCurrentObject.has(prop)) {
          // Duplicate found!
          isDuplicate = true;
          fixedCount++;
          break;
        } else {
          propsInCurrentObject.add(prop);
        }
      }
    }
    
    if (!isDuplicate) {
      newLines.push(line);
    }
    
    // Track closing braces
    if (closeBraces > 0) {
      braceDepth -= closeBraces;
      if (braceDepth <= 1) {
        // Exiting object context
        propsInCurrentObject = new Set();
      }
    }
  }
  
  if (fixedCount > 0) {
    fs.writeFileSync(fullPath, newLines.join('\n'));
    console.log(`Fixed ${fixedCount} duplicates in ${filePath}`);
    totalFixed += fixedCount;
  }
});

console.log(`\nTotal duplicates fixed: ${totalFixed}`);

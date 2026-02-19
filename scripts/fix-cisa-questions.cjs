/**
 * Fix CISA Questions Script
 * 
 * 1. Adds reference field to all CISA questions based on domain
 * 2. Fixes absolute language in distractors (always/never → typically/rarely)
 * 
 * Usage: node scripts/fix-cisa-questions.cjs [--dry-run]
 */
const fs = require('fs');
const path = require('path');

const questionsDir = '/workspaces/passcpa/src/data/cisa/questions';
const DRY_RUN = process.argv.includes('--dry-run');

// CISA Review Manual 27th Edition Chapter Mapping
const REFERENCE_MAP = {
  'CISA1': 'CISA Review Manual, 27th Ed., Ch. 1',
  'CISA2': 'CISA Review Manual, 27th Ed., Ch. 2',
  'CISA3': 'CISA Review Manual, 27th Ed., Ch. 3',
  'CISA4': 'CISA Review Manual, 27th Ed., Ch. 4',
  'CISA5': 'CISA Review Manual, 27th Ed., Ch. 5',
};

// Absolute language replacements (in distractors, absolute language is often wrong)
const ABSOLUTE_FIXES = [
  { from: /\balways requires\b/gi, to: 'typically requires' },
  { from: /\balways involves\b/gi, to: 'typically involves' },
  { from: /\balways ensures\b/gi, to: 'generally ensures' },
  { from: /\balways results\b/gi, to: 'often results' },
  { from: /\bnever requires\b/gi, to: 'rarely requires' },
  { from: /\bnever involves\b/gi, to: 'rarely involves' },
  { from: /\bnever ensures\b/gi, to: 'does not ensure' },
  { from: /\bis always\b/gi, to: 'is typically' },
  { from: /\bis never\b/gi, to: 'is rarely' },
  { from: /\bcan never\b/gi, to: 'cannot typically' },
  { from: /\bwill always\b/gi, to: 'will typically' },
  { from: /\bwill never\b/gi, to: 'will rarely' },
  { from: /\bmust always\b/gi, to: 'should typically' },
  { from: /\bshould always\b/gi, to: 'should generally' },
  { from: /\bshould never\b/gi, to: 'should rarely' },
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  let refsAdded = 0;
  let absoluteFixed = 0;

  // 1. Add reference field to questions that don't have one
  // Pattern: find explanation line followed by topic (no reference in between)
  const addRefPattern = /(explanation:\s*['`][^'`]*['`],?\s*\n)(\s*)(topic:)/g;
  
  content = content.replace(addRefPattern, (match, explanationPart, whitespace, topicPart) => {
    // Extract section from nearby context by looking backwards
    // For simplicity, use a generic reference - we'll enhance with section detection
    refsAdded++;
    return `${explanationPart}${whitespace}reference: 'CISA Review Manual, 27th Ed.',\n${whitespace}${topicPart}`;
  });

  // 2. More precise: add section-specific references
  // Find questions with section but no reference
  const sectionRegex = /section:\s*['"]([^'"]+)['"]/g;
  let sectionMatch;
  const sections = [];
  while ((sectionMatch = sectionRegex.exec(content)) !== null) {
    sections.push(sectionMatch[1]);
  }
  
  // Determine dominant section for file-level reference
  const dominantSection = sections.length > 0 ? sections[0].replace(/-.*/, '') : 'CISA1';
  const fileRef = REFERENCE_MAP[dominantSection] || REFERENCE_MAP['CISA1'];

  // Update generic references with section-specific ones
  content = content.replace(
    /reference: 'CISA Review Manual, 27th Ed\.',/g,
    `reference: '${fileRef}',`
  );

  // 3. Fix absolute language in options
  const optionsRegex = /(options:\s*\[)([\s\S]*?)(\],)/g;
  content = content.replace(optionsRegex, (match, start, optionsContent, end) => {
    let fixed = optionsContent;
    let changed = false;
    
    for (const { from, to } of ABSOLUTE_FIXES) {
      const before = fixed;
      fixed = fixed.replace(from, to);
      if (before !== fixed) changed = true;
    }
    
    if (changed) absoluteFixed++;
    return `${start}${fixed}${end}`;
  });

  const modified = content !== original;
  
  return { content, modified, refsAdded, absoluteFixed };
}

// Main execution
console.log('CISA Question Fixer');
console.log('=' .repeat(50));
console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}\n`);

const files = fs.readdirSync(questionsDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');
let totalRefsAdded = 0;
let totalAbsoluteFixed = 0;
let filesModified = 0;

console.log(`Processing ${files.length} CISA question files...\n`);

files.forEach(file => {
  const filePath = path.join(questionsDir, file);
  const result = processFile(filePath);
  
  if (result.modified) {
    filesModified++;
    totalRefsAdded += result.refsAdded;
    totalAbsoluteFixed += result.absoluteFixed;
    
    console.log(`✓ ${file}: +${result.refsAdded} refs, ${result.absoluteFixed} absolute fixes`);
    
    if (!DRY_RUN) {
      fs.writeFileSync(filePath, result.content, 'utf8');
    }
  } else {
    console.log(`- ${file}: no changes`);
  }
});

console.log('\n' + '='.repeat(50));
console.log('Summary:');
console.log(`  Files modified: ${filesModified}/${files.length}`);
console.log(`  References added: ${totalRefsAdded}`);
console.log(`  Absolute language fixed: ${totalAbsoluteFixed}`);

if (DRY_RUN) {
  console.log('\nRun without --dry-run to apply changes.');
} else {
  console.log('\nChanges applied!');
}

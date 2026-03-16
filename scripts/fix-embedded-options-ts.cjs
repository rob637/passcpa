#!/usr/bin/env node
/**
 * Fix embedded answer options in TypeScript data files.
 * In TS files, \n in string literals appears as literal backslash+n in the raw source.
 *
 * Usage:
 *   node scripts/fix-embedded-options-ts.cjs --dry-run
 *   node scripts/fix-embedded-options-ts.cjs
 */
const fs = require('fs');
const { execSync } = require('child_process');

const DRY_RUN = process.argv.includes('--dry-run');
const VERBOSE = process.argv.includes('--verbose');

const files = execSync(
  'grep -rl "correctAnswer" src/data/ --include="*.ts" | grep -v index.ts | sort',
  { encoding: 'utf8' }
).trim().split('\n').filter(Boolean);

let totalQuestions = 0;
let totalFixed = 0;
let filesModified = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  let newContent = content;
  let fileFixed = 0;

  // Match question: 'text' (single-quoted, handles escaped single quotes)
  // The 4 backslashes in the regex character class match a literal backslash in the source
  const questionRegex = /question:\s*'((?:[^'\\]|\\.)*)'/g;
  let match;
  const replacements = [];

  while ((match = questionRegex.exec(content)) !== null) {
    totalQuestions++;
    const fullMatch = match[0];
    const qText = match[1]; // raw captured text — \n in source appears as \n (2 chars)

    const cleaned = stripEmbeddedOptions(qText);
    if (cleaned !== null) {
      replacements.push({ original: fullMatch, cleaned });
      fileFixed++;
      if (VERBOSE) {
        const id = extractNearbyId(content, match.index);
        console.log('    ' + id + ': stripped A)-D) from question text');
      }
    }
  }

  // Apply replacements
  if (fileFixed > 0) {
    filesModified++;
    console.log(String(fileFixed).padStart(4) + ' fixed in ' + file);

    if (!DRY_RUN) {
      for (const r of replacements) {
        const replacement = "question: '" + r.cleaned + "'";
        newContent = newContent.replace(r.original, replacement);
      }
      fs.writeFileSync(file, newContent, 'utf8');
    }
    totalFixed += fileFixed;
  }
}

console.log('');
console.log('========================================');
console.log('SUMMARY');
console.log('========================================');
console.log('Total questions scanned: ' + totalQuestions);
console.log('Total fixed:            ' + totalFixed);
console.log('Files modified:         ' + filesModified + ' / ' + files.length);
if (DRY_RUN) {
  console.log('');
  console.log('This was a DRY RUN. Run without --dry-run to apply changes.');
}

/**
 * Strip embedded answer options from captured question text.
 * In the captured text, the source \n appears as literal backslash + n (2 chars).
 */
function stripEmbeddedOptions(text) {
  if (!text) return null;

  // Patterns to find where embedded options start.
  // In captured text from the raw file, a source \n is the 2-char sequence: \ n
  // In a JS regex literal, to match a literal backslash we write \\
  // So \\n in regex matches the 2-char sequence backslash+n
  const bsn = '\\n'; // literal string: backslash + n (2 chars)

  // Check if text contains A) B) C) D) pattern at all
  const hasABCD = text.indexOf('A)') !== -1 && text.indexOf('B)') !== -1 &&
                  text.indexOf('C)') !== -1 && text.indexOf('D)') !== -1;
  if (!hasABCD) return null;

  // Find where the options block starts
  // Pattern 1: \n\nA) or \nA) (literal backslash-n sequences)
  let cutIdx = -1;

  // Try \n\nA) first (two escaped newlines before A)
  let searchIdx = text.indexOf(bsn + bsn + 'A) ');
  if (searchIdx === -1) searchIdx = text.indexOf(bsn + bsn + 'A)');
  if (searchIdx !== -1) cutIdx = searchIdx;

  // Try \nA) (single escaped newline before A)
  if (cutIdx === -1) {
    searchIdx = text.indexOf(bsn + 'A) ');
    if (searchIdx === -1) searchIdx = text.indexOf(bsn + 'A)');
    if (searchIdx !== -1) cutIdx = searchIdx;
  }

  // Try inline patterns: ": A)" or "? A)" or ". A)"
  if (cutIdx === -1) {
    const inlinePatterns = [': A) ', '? A) ', '. A) ', '" A) '];
    for (const p of inlinePatterns) {
      searchIdx = text.indexOf(p);
      if (searchIdx !== -1) {
        // Keep the punctuation char, cut after it
        cutIdx = searchIdx + 1; // keep the : or ? or . or "
        break;
      }
    }
  }

  if (cutIdx === -1) return null;

  // Verify the part after cutIdx actually has A) B) C) D)
  const afterPart = text.substring(cutIdx);
  const hasAllOptions = afterPart.indexOf('A)') !== -1 && afterPart.indexOf('B)') !== -1 &&
                        afterPart.indexOf('C)') !== -1 && afterPart.indexOf('D)') !== -1;
  if (!hasAllOptions) return null;

  // Cut and clean
  let cleaned = text.substring(0, cutIdx);
  // Remove trailing \n sequences
  while (cleaned.endsWith(bsn)) {
    cleaned = cleaned.substring(0, cleaned.length - 2);
  }
  cleaned = cleaned.trimEnd();

  // Don't return if nothing was actually removed
  if (cleaned === text) return null;

  return cleaned;
}

function extractNearbyId(content, index) {
  const before = content.substring(Math.max(0, index - 500), index);
  const idMatches = before.match(/id:\s*['"`]([^'"`]+)['"`]/g);
  if (idMatches) {
    const last = idMatches[idMatches.length - 1];
    const val = last.match(/['"`]([^'"`]+)['"`]/);
    return val ? val[1] : '?';
  }
  return '?';
}

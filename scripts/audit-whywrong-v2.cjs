#!/usr/bin/env node
/**
 * audit-whywrong-v2.cjs
 *
 * Correct audit of whyWrong explanations.
 *
 * Schema (verified from real data):
 *   - whyWrong is an object keyed by ABSOLUTE option index "0"|"1"|"2"|"3"
 *   - For the correct option index, text typically says "option X is CORRECT"
 *   - For each wrong option index, text typically says "option X is WRONG"
 *     (where X is the letter A..D corresponding to the index)
 *
 * Mismatch types reported:
 *   1. WRONG_LETTER       — explanation references a different letter than its key implies
 *   2. CORRECT_FLAG_MISSING — correct option's text doesn't say CORRECT (or says WRONG)
 *   3. WRONG_FLAG_ON_CORRECT — text on correct slot says WRONG
 *   4. KEY_OUT_OF_RANGE   — whyWrong key is not 0..3 or beyond options.length
 *   5. MISSING_KEY        — option index has no whyWrong entry
 *
 * Usage:
 *   node scripts/audit-whywrong-v2.cjs                      # all exams, summary
 *   node scripts/audit-whywrong-v2.cjs --exam cpa           # single exam
 *   node scripts/audit-whywrong-v2.cjs --exam cpa --json    # JSON detail output
 *   node scripts/audit-whywrong-v2.cjs --examples 20        # show N example mismatches
 */

const fs = require('fs');
const path = require('path');

// ---------- CLI ----------
const args = process.argv.slice(2);
const examFilter = (() => { const i = args.indexOf('--exam'); return i >= 0 ? args[i + 1] : null; })();
const exampleLimit = (() => { const i = args.indexOf('--examples'); return i >= 0 ? parseInt(args[i + 1], 10) : 10; })();
const jsonOut = args.includes('--json');

const EXAMS = examFilter ? [examFilter] : ['cpa', 'ea', 'cma', 'cia', 'cfp', 'cisa'];
const LETTERS = ['A', 'B', 'C', 'D', 'E'];

// ---------- Helpers ----------
function letterFromIndex(i) { return LETTERS[i] || String.fromCharCode(65 + i); }

/**
 * Inspect a single question's whyWrong block.
 * Returns array of issue objects (empty if all good).
 */
function auditQuestion(q) {
  const issues = [];
  if (!q.whyWrong || typeof q.whyWrong !== 'object') return issues;

  const correctIdx = q.correctAnswer;
  const numOptions = Array.isArray(q.options) ? q.options.length : 4;

  for (const [keyStr, explanationRaw] of Object.entries(q.whyWrong)) {
    const explanation = (explanationRaw == null) ? '' : String(explanationRaw);
    const keyNum = parseInt(keyStr, 10);

    // Key out of range
    if (isNaN(keyNum) || keyNum < 0 || keyNum >= numOptions) {
      issues.push({ id: q.id, section: q.section, type: 'KEY_OUT_OF_RANGE', key: keyStr, expected: null, found: null, text: explanation.slice(0, 120) });
      continue;
    }

    const expectedLetter = letterFromIndex(keyNum);
    const isCorrectSlot = (keyNum === correctIdx);

    // Look for "option X is WRONG" or "option X is CORRECT"
    const wrongMatch = explanation.match(/option\s+([A-Da-d])\s+is\s+WRONG/i);
    const correctMatch = explanation.match(/option\s+([A-Da-d])\s+is\s+CORRECT/i);

    if (isCorrectSlot) {
      // Correct slot: should NOT say WRONG; ideally says CORRECT
      if (wrongMatch) {
        issues.push({ id: q.id, section: q.section, type: 'WRONG_FLAG_ON_CORRECT', key: keyStr, expected: `${expectedLetter} CORRECT`, found: `${wrongMatch[1].toUpperCase()} WRONG`, text: explanation.slice(0, 120) });
      } else if (correctMatch && correctMatch[1].toUpperCase() !== expectedLetter) {
        issues.push({ id: q.id, section: q.section, type: 'WRONG_LETTER', key: keyStr, expected: expectedLetter, found: correctMatch[1].toUpperCase(), text: explanation.slice(0, 120) });
      }
      // No CORRECT phrase at all is OK (some authors only annotate wrong answers)
    } else {
      // Wrong slot: should reference its own letter as WRONG
      if (wrongMatch) {
        if (wrongMatch[1].toUpperCase() !== expectedLetter) {
          issues.push({ id: q.id, section: q.section, type: 'WRONG_LETTER', key: keyStr, expected: expectedLetter, found: wrongMatch[1].toUpperCase(), text: explanation.slice(0, 120) });
        }
      } else if (correctMatch) {
        issues.push({ id: q.id, section: q.section, type: 'CORRECT_FLAG_ON_WRONG', key: keyStr, expected: `${expectedLetter} WRONG`, found: `${correctMatch[1].toUpperCase()} CORRECT`, text: explanation.slice(0, 120) });
      }
      // Plain prose with no letter phrasing is OK
    }
  }

  // Missing keys for any WRONG-option index (renderer skips the correct slot, so missing-correct is OK by design)
  if (Object.keys(q.whyWrong).length > 0) {
    for (let i = 0; i < numOptions; i++) {
      if (i === correctIdx) continue; // correct slot is intentionally skipped by Practice.tsx
      if (!Object.prototype.hasOwnProperty.call(q.whyWrong, String(i))) {
        issues.push({ id: q.id, section: q.section, type: 'MISSING_KEY_WRONG', key: String(i), expected: letterFromIndex(i), found: null, text: '' });
      }
    }
  }

  return issues;
}

// ---------- Main ----------
const summary = {};
const allIssues = [];
let totalQ = 0;
let totalWithWhyWrong = 0;

for (const exam of EXAMS) {
  const examDir = path.join('content', exam);
  if (!fs.existsSync(examDir)) continue;

  const sections = fs.readdirSync(examDir).filter((d) => {
    if (d.startsWith('_')) return false; // skip backups
    return fs.statSync(path.join(examDir, d)).isDirectory();
  });

  for (const section of sections) {
    const qFile = path.join(examDir, section, 'questions.json');
    if (!fs.existsSync(qFile)) continue;

    const data = JSON.parse(fs.readFileSync(qFile, 'utf8'));
    const questions = data.questions || (Array.isArray(data) ? data : []);

    for (const q of questions) {
      totalQ++;
      if (q.whyWrong && typeof q.whyWrong === 'object') totalWithWhyWrong++;
      const issues = auditQuestion(q);
      if (issues.length === 0) continue;

      const examKey = exam.toUpperCase();
      summary[examKey] = summary[examKey] || { totalQ: 0, withIssues: 0, byType: {} };
      summary[examKey].withIssues++;
      for (const iss of issues) {
        summary[examKey].byType[iss.type] = (summary[examKey].byType[iss.type] || 0) + 1;
        allIssues.push({ exam: examKey, ...iss });
      }
    }
  }
}

if (jsonOut) {
  console.log(JSON.stringify({ summary, totalQ, totalWithWhyWrong, issues: allIssues }, null, 2));
  process.exit(0);
}

// Pretty summary
console.log('');
console.log('===================================================');
console.log('  whyWrong Audit v2 (absolute-index schema)');
console.log('===================================================');
console.log(`  Total questions scanned:        ${totalQ}`);
console.log(`  Questions with whyWrong block:  ${totalWithWhyWrong}`);
console.log(`  Total issues found:             ${allIssues.length}`);
console.log('');
console.log('Per-exam summary:');
for (const [exam, s] of Object.entries(summary)) {
  console.log(`  ${exam}: ${s.withIssues} questions affected`);
  for (const [type, count] of Object.entries(s.byType)) {
    console.log(`     - ${type}: ${count}`);
  }
}
if (Object.keys(summary).length === 0) {
  console.log('  (no issues found — content is clean)');
}

console.log('');
console.log(`First ${Math.min(exampleLimit, allIssues.length)} examples:`);
for (const ex of allIssues.slice(0, exampleLimit)) {
  console.log('');
  console.log(`  ${ex.exam} ${ex.id} key=${ex.key} type=${ex.type}`);
  console.log(`     expected: ${ex.expected}   found: ${ex.found}`);
  if (ex.text) console.log(`     text: ${ex.text}...`);
}
console.log('');

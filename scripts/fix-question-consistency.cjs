#!/usr/bin/env node
/**
 * Apply auto-fixes from validate-question-consistency.cjs findings.
 *
 * - Scaffolding (```` ``` and [ID=...] artifacts in explanation): strip in place.
 * - Dollar-mismatch + whyWrong-mislabel: set status='retired' with reason.
 *
 * Idempotent — safe to re-run. Writes back to content/cpa/{section}/questions.json.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SECTIONS = ['far', 'aud', 'reg', 'bar', 'isc', 'tcp'];

// Re-run validator to get fresh issues
const issuesRaw = execSync('node ' + path.join(__dirname, 'validate-question-consistency.cjs') + ' --json', { encoding: 'utf8' });
const issues = JSON.parse(issuesRaw);

const byId = {};
issues.forEach(i => { byId[i.id] = i; });

let scaffoldingCleaned = 0;
let retired = 0;

function cleanScaffolding(text) {
  if (!text) return text;
  return text
    .replace(/\n```\s*\n```\s*\n?\[ID=[^\]]+\]\s*$/g, '')
    .replace(/\n?```\s*\n```\s*$/g, '')
    .replace(/\n?\[ID=[a-z0-9-]+\]\s*$/gi, '')
    .trimEnd();
}

for (const section of SECTIONS) {
  const file = path.join(__dirname, '..', 'content', 'cpa', section, 'questions.json');
  if (!fs.existsSync(file)) continue;
  const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  let dirty = false;

  for (const q of raw.questions || []) {
    const issue = byId[q.id];
    if (!issue) continue;
    if (q.status === 'retired') continue;

    const probs = issue.problems;
    const hasScaffolding = probs.some(p => p.includes('scaffolding'));
    const hasMismatch = probs.some(p => p.includes("explanation's final"));
    const hasMislabel = probs.some(p => p.includes('whyWrong'));

    if (hasScaffolding) {
      const cleaned = cleanScaffolding(q.explanation);
      if (cleaned !== q.explanation) {
        q.explanation = cleaned;
        scaffoldingCleaned++;
        dirty = true;
      }
    }

    if (hasMismatch || hasMislabel) {
      q.status = 'retired';
      q.retiredReason = probs.join(' | ');
      q.retiredAt = new Date().toISOString().slice(0, 10);
      retired++;
      dirty = true;
    }
  }

  if (dirty) {
    fs.writeFileSync(file, JSON.stringify(raw, null, 2) + '\n');
    console.log(`  Updated ${section.toUpperCase()}`);
  }
}

console.log(`\n✅ Scaffolding cleaned: ${scaffoldingCleaned}`);
console.log(`✅ Questions retired:    ${retired}`);
console.log('\nRe-run validator to confirm:');
console.log('  node scripts/validate-question-consistency.cjs');

#!/usr/bin/env node
/**
 * Validate Daily CPA question files for internal consistency.
 *
 * Detects the class of bug where a question's metadata fields disagree about
 * which option is correct (e.g. correctAnswer=3 but explanation says $30K
 * which matches option 0; or whyWrong[correctAnswer] starts with "is WRONG").
 *
 * Run: node scripts/validate-question-consistency.cjs
 *      node scripts/validate-question-consistency.cjs --section reg
 *      node scripts/validate-question-consistency.cjs --json > issues.json
 */

const fs = require('fs');
const path = require('path');

const SECTIONS = ['far', 'aud', 'reg', 'bar', 'isc', 'tcp'];
const args = process.argv.slice(2);
const onlySection = args.includes('--section') ? args[args.indexOf('--section') + 1] : null;
const asJson = args.includes('--json');

const issues = [];

function check(section, q) {
  const probs = [];
  const opts = q.options || [];
  const ca = q.correctAnswer;

  // Skip retired
  if (q.status === 'retired') return;

  // Basic shape
  if (typeof ca !== 'number' || ca < 0 || ca >= opts.length) {
    probs.push(`correctAnswer (${ca}) out of range for ${opts.length} options`);
  }

  // whyWrong[correctAnswer] should describe why it's CORRECT, not WRONG
  if (q.whyWrong && q.whyWrong[String(ca)]) {
    const txt = q.whyWrong[String(ca)];
    if (/is WRONG/i.test(txt) && !/is CORRECT/i.test(txt)) {
      probs.push(`whyWrong[${ca}] (the correct answer) is labeled "is WRONG"`);
    }
  }

  // whyWrong for other options should NOT say "is CORRECT"
  Object.keys(q.whyWrong || {}).forEach(k => {
    if (Number(k) === ca) return;
    if (/is CORRECT/i.test(q.whyWrong[k]) && !/is WRONG/i.test(q.whyWrong[k])) {
      probs.push(`whyWrong[${k}] (a wrong answer) is labeled "is CORRECT"`);
    }
  });

  // explanation/whyWrong leakage of generation scaffolding
  const txt = (q.explanation || '') + ' ' + Object.values(q.whyWrong || {}).join(' ');
  if (/\[ID=[a-z0-9-]+\]/i.test(txt) || /```\s*```/.test(q.explanation || '')) {
    probs.push('explanation contains AI-generation scaffolding (```` or [ID=…])');
  }

  // Dollar-amount cross-check: if explanation cites a final $ amount that matches
  // an option other than correctAnswer, flag it.
  const optDollars = opts.map(o => {
    const m = (o.match(/\$[\d,]+/g) || []).map(s => Number(s.replace(/[^\d]/g, '')));
    return new Set(m);
  });
  // Find the LAST distinct dollar amount in the explanation (best heuristic for "the answer")
  const expDollars = ((q.explanation || '').match(/\$[\d,]+/g) || [])
    .map(s => Number(s.replace(/[^\d]/g, '')));
  if (expDollars.length && optDollars[ca] && optDollars[ca].size) {
    const last = expDollars[expDollars.length - 1];
    const matchingOption = optDollars.findIndex(set => set.has(last));
    if (matchingOption !== -1 && matchingOption !== ca) {
      const correctMentioned = [...optDollars[ca]].some(d => expDollars.includes(d));
      if (!correctMentioned) {
        probs.push(
          `explanation's final $${last.toLocaleString()} matches option ${matchingOption} ` +
          `but correctAnswer=${ca} (option ${ca} amounts: ${[...optDollars[ca]].map(d => '$'+d.toLocaleString()).join(', ') || 'none'})`
        );
      }
    }
  }

  if (probs.length) {
    issues.push({ section, id: q.id, topic: q.topic, problems: probs });
  }
}

for (const section of SECTIONS) {
  if (onlySection && section !== onlySection) continue;
  const file = path.join(__dirname, '..', 'content', 'cpa', section, 'questions.json');
  if (!fs.existsSync(file)) continue;
  const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  const qs = raw.questions || [];
  if (!asJson) console.log(`Scanning ${section.toUpperCase()}: ${qs.length} questions...`);
  qs.forEach(q => check(section, q));
}

if (asJson) {
  process.stdout.write(JSON.stringify(issues, null, 2));
  process.exit(0);
}

if (!issues.length) {
  console.log('\n✅ No consistency issues found.');
  process.exit(0);
}

console.log(`\n⚠️  Found ${issues.length} question(s) with consistency issues:\n`);
const bySection = {};
issues.forEach(i => { (bySection[i.section] = bySection[i.section] || []).push(i); });
Object.keys(bySection).forEach(sec => {
  console.log(`\n━━━ ${sec.toUpperCase()} (${bySection[sec].length}) ━━━`);
  bySection[sec].slice(0, 50).forEach(i => {
    console.log(`\n  ${i.id}  [${i.topic}]`);
    i.problems.forEach(p => console.log(`    - ${p}`));
  });
  if (bySection[sec].length > 50) console.log(`  ... and ${bySection[sec].length - 50} more`);
});
console.log(`\nTotal: ${issues.length} questions need review.`);
process.exit(1);

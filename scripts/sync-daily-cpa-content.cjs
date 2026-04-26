#!/usr/bin/env node
/**
 * sync-daily-cpa-content.cjs
 *
 * Copies CPA question JSON files from `content/cpa/{section}/questions.json`
 * into `functions/content-cpa/{section}/questions.json` so they are bundled
 * with the Cloud Functions deploy.
 *
 * Why: Firebase Functions only deploys files within the `functions/` source
 * directory. The Daily CPA SMS engine (`functions/daily-cpa.js`) loads
 * questions from disk at runtime and needs the JSON files co-located.
 *
 * Run automatically via the `firebase.json` `functions.predeploy` hook.
 * Run manually with: `node scripts/sync-daily-cpa-content.cjs`
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(REPO_ROOT, 'content', 'cpa');
const DEST_DIR = path.join(REPO_ROOT, 'functions', 'content-cpa');

const SECTIONS = ['aud', 'far', 'reg', 'bar', 'isc', 'tcp'];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyQuestionFile(section) {
  const srcPath = path.join(SRC_DIR, section, 'questions.json');
  const destPath = path.join(DEST_DIR, section, 'questions.json');

  if (!fs.existsSync(srcPath)) {
    console.warn(`[sync-daily-cpa-content] SKIP ${section}: not found at ${srcPath}`);
    return { section, status: 'skipped', count: 0 };
  }

  const raw = fs.readFileSync(srcPath, 'utf8');
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    console.error(`[sync-daily-cpa-content] FAIL ${section}: invalid JSON (${err.message})`);
    process.exit(1);
  }

  const questions = Array.isArray(parsed) ? parsed : (parsed.questions || []);
  if (!questions.length) {
    console.warn(`[sync-daily-cpa-content] SKIP ${section}: no questions in file`);
    return { section, status: 'empty', count: 0 };
  }

  ensureDir(path.dirname(destPath));
  fs.writeFileSync(destPath, raw);
  return { section, status: 'copied', count: questions.length, bytes: raw.length };
}

function main() {
  console.log('[sync-daily-cpa-content] Bundling CPA question files for Cloud Functions...');
  ensureDir(DEST_DIR);

  const results = SECTIONS.map(copyQuestionFile);
  const totalQuestions = results.reduce((sum, r) => sum + r.count, 0);
  const totalBytes = results.reduce((sum, r) => sum + (r.bytes || 0), 0);

  for (const r of results) {
    if (r.status === 'copied') {
      const mb = (r.bytes / (1024 * 1024)).toFixed(2);
      console.log(`  ✓ ${r.section.toUpperCase().padEnd(4)} ${String(r.count).padStart(5)} questions  (${mb} MB)`);
    } else {
      console.log(`  - ${r.section.toUpperCase().padEnd(4)} ${r.status}`);
    }
  }

  console.log(`[sync-daily-cpa-content] Done. ${totalQuestions} questions, ${(totalBytes / (1024 * 1024)).toFixed(2)} MB total.`);
}

if (require.main === module) {
  main();
}

module.exports = { main };

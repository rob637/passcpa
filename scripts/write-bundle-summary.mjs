#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const outArg = args.find((arg) => arg.startsWith('--out='));
const outputPath = outArg ? outArg.split('=')[1] : process.env.GITHUB_STEP_SUMMARY || null;

const distAssetsPath = path.resolve(process.cwd(), 'dist/assets');
const budgetReportPath = path.resolve(process.cwd(), 'dist/bundle-budget-report.json');
const baselinePath = path.resolve(process.cwd(), 'scripts/bundle-budget-baseline.json');

const formatKB = (bytes) => `${(bytes / 1024).toFixed(2)} KB`;
const formatSignedKB = (bytes) => {
  if (bytes == null) return '-';
  const prefix = bytes >= 0 ? '+' : '';
  return `${prefix}${(bytes / 1024).toFixed(2)} KB`;
};

let files = [];
let totalBytes = 0;
if (fs.existsSync(distAssetsPath)) {
  files = fs
    .readdirSync(distAssetsPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.js'))
    .map((entry) => {
      const size = fs.statSync(path.join(distAssetsPath, entry.name)).size;
      totalBytes += size;
      return { name: entry.name, size };
    })
    .sort((a, b) => b.size - a.size);
}

let budgetSummary = 'No budget report generated.';
let budgetTable = '| Chunk Key | File | Size | Budget | Delta | Status |\n|---|---|---:|---:|---:|---|\n';
let baselineTable = '| Chunk Key | Current | Baseline | Delta vs Baseline |\n|---|---:|---:|---:|\n';

if (fs.existsSync(budgetReportPath)) {
  const report = JSON.parse(fs.readFileSync(budgetReportPath, 'utf8'));
  const baseline = fs.existsSync(baselinePath)
    ? JSON.parse(fs.readFileSync(baselinePath, 'utf8'))
    : { chunks: {} };

  const summary = { pass: 0, fail: 0, skip: 0 };
  for (const row of report.results || []) {
    const sizeKB = row.sizeBytes == null ? '-' : formatKB(row.sizeBytes);
    const budgetKB = formatKB(row.budgetBytes);
    const deltaKB = row.deltaBytes == null ? '-' : formatSignedKB(row.deltaBytes);
    const status = row.status === 'PASS' ? 'PASS' : row.status === 'FAIL' ? 'FAIL' : 'SKIP';
    if (status === 'PASS') summary.pass += 1;
    else if (status === 'FAIL') summary.fail += 1;
    else summary.skip += 1;

    budgetTable += `| ${row.key} | ${row.file || '-'} | ${sizeKB} | ${budgetKB} | ${deltaKB} | ${status} |\n`;

    const baselineBytes = baseline.chunks?.[row.key] ?? null;
    const baselineSize = baselineBytes == null ? '-' : formatKB(baselineBytes);
    const baselineDelta = row.sizeBytes == null || baselineBytes == null ? null : row.sizeBytes - baselineBytes;
    baselineTable += `| ${row.key} | ${sizeKB} | ${baselineSize} | ${formatSignedKB(baselineDelta)} |\n`;
  }

  budgetSummary = `PASS: ${summary.pass} | FAIL: ${summary.fail} | SKIP: ${summary.skip}`;
}

const topChunks = files
  .slice(0, 15)
  .map((row) => `| ${row.name.substring(0, 56)} | ${formatKB(row.size)} |`)
  .join('\n');

const markdown = [
  '## Bundle Size Report',
  '',
  `Total JS Size: ${formatKB(totalBytes)} (${(totalBytes / (1024 * 1024)).toFixed(2)} MB)`,
  '',
  '<details>',
  '<summary>Top JS chunks</summary>',
  '',
  '| File | Size |',
  '|---|---:|',
  topChunks || '| - | - |',
  '',
  '</details>',
  '',
  '### Budget Guard (Standard Profile)',
  '',
  budgetSummary,
  '',
  budgetTable,
  '',
  '### Delta Vs Baseline',
  '',
  baselineTable,
  '',
].join('\n');

if (!outputPath) {
  process.stdout.write(markdown);
  process.exit(0);
}

fs.appendFileSync(outputPath, `${markdown}\n`);

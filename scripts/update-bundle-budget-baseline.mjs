#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const resolveArg = (name) => process.argv.find((arg) => arg.startsWith(`${name}=`))?.split('=')[1] || null;

const sourcePath = path.resolve(
  process.cwd(),
  resolveArg('--source') || process.env.PERF_BUDGET_SOURCE || 'dist/bundle-budget-report.json'
);
const outputPath = path.resolve(
  process.cwd(),
  resolveArg('--output') || process.env.PERF_BUDGET_BASELINE_OUT || 'scripts/bundle-budget-baseline.json'
);

if (!fs.existsSync(sourcePath)) {
  console.error(`Baseline update failed: source report not found at ${sourcePath}`);
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
if (!Array.isArray(report.results)) {
  console.error('Baseline update failed: source report is missing a results array.');
  process.exit(1);
}

const chunks = {};
for (const row of report.results) {
  chunks[row.key] = row.sizeBytes ?? null;
}

const baseline = {
  profile: report.profile || 'standard',
  generatedAt: report.generatedAt || new Date().toISOString(),
  source: path.relative(process.cwd(), sourcePath),
  chunks,
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(baseline, null, 2) + '\n');

console.log(`Updated baseline: ${path.relative(process.cwd(), outputPath)}`);
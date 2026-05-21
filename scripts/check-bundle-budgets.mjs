#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const KB = 1024;
const DIST_ASSETS_DIR = path.resolve(process.cwd(), 'dist/assets');

const budgetProfiles = {
  standard: [
    { key: 'Home-', maxBytes: 34 * KB, required: true, note: 'Home route chunk should stay lean.' },
    { key: 'DailyPlanCard-', maxBytes: 24 * KB, required: false, note: 'Lazy dashboard card chunk.' },
    { key: 'StudyPlanCTA-', maxBytes: 6 * KB, required: true, note: 'Lazy CTA chunk.' },
    { key: 'ShareNudge-', maxBytes: 8 * KB, required: true, note: 'Lazy nudge chunk.' },
    { key: 'WelcomeVideoCard-', maxBytes: 5 * KB, required: true, note: 'Lazy welcome card chunk.' },
    { key: 'vendor-react-', maxBytes: 190 * KB, required: true, note: 'Core React/runtime vendor chunk.' },
    { key: 'vendor-firebase-', maxBytes: 820 * KB, required: true, note: 'Firebase vendor chunk.' },
    { key: 'vendor-ui-', maxBytes: 95 * KB, required: false, note: 'UI utility vendor chunk.' },
  ],
  strict: [
    { key: 'Home-', maxBytes: 36 * KB, required: true, note: 'Stricter Home route guard for main/prod.' },
    { key: 'DailyPlanCard-', maxBytes: 22 * KB, required: false, note: 'Stricter lazy dashboard card guard (includes What\'s Next intelligence).' },
    { key: 'StudyPlanCTA-', maxBytes: 5 * KB, required: true, note: 'Stricter lazy CTA guard.' },
    { key: 'ShareNudge-', maxBytes: 7 * KB, required: true, note: 'Stricter lazy nudge guard.' },
    { key: 'WelcomeVideoCard-', maxBytes: 4.5 * KB, required: true, note: 'Stricter welcome card guard.' },
    { key: 'vendor-react-', maxBytes: 175 * KB, required: true, note: 'Stricter React/runtime vendor guard.' },
    { key: 'vendor-firebase-', maxBytes: 780 * KB, required: true, note: 'Stricter Firebase vendor guard.' },
    { key: 'vendor-ui-', maxBytes: 85 * KB, required: false, note: 'Stricter UI vendor guard.' },
  ],
};

const resolveProfile = () => {
  const profileFromArg = process.argv.find((arg) => arg.startsWith('--profile='))?.split('=')[1];
  const rawProfile = (profileFromArg || process.env.PERF_BUDGET_PROFILE || 'standard').toLowerCase();

  if (!(rawProfile in budgetProfiles)) {
    fail(
      `Unknown PERF_BUDGET_PROFILE "${rawProfile}". Supported values: ${Object.keys(budgetProfiles).join(', ')}`
    );
  }

  return rawProfile;
};

const resolveJsonOutPath = () => {
  const fromArg = process.argv.find((arg) => arg.startsWith('--json-out='))?.split('=')[1];
  return fromArg || process.env.PERF_BUDGET_JSON_OUT || null;
};

const selectedProfile = resolveProfile();
const budgets = budgetProfiles[selectedProfile];
const jsonOutPath = resolveJsonOutPath();

const formatKB = (bytes) => `${(bytes / KB).toFixed(2)} kB`;

const fail = (message) => {
  console.error(message);
  process.exit(1);
};

if (!fs.existsSync(DIST_ASSETS_DIR)) {
  fail('Bundle budget check failed: dist/assets was not found. Run a production build first.');
}

const files = fs
  .readdirSync(DIST_ASSETS_DIR, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith('.js'))
  .map((entry) => {
    const absolutePath = path.join(DIST_ASSETS_DIR, entry.name);
    const stat = fs.statSync(absolutePath);
    return { name: entry.name, bytes: stat.size };
  });

let hasFailure = false;
const results = [];

console.log('Bundle Budget Report');
console.log('====================');
console.log(`Profile: ${selectedProfile}`);
console.log('');

for (const budget of budgets) {
  const matched = files.find((file) => file.name.startsWith(budget.key));
  if (!matched) {
    if (budget.required) {
      hasFailure = true;
      console.log(`[FAIL] Missing required chunk prefix ${budget.key}`);
      results.push({
        key: budget.key,
        required: budget.required,
        note: budget.note,
        status: 'FAIL',
        file: null,
        sizeBytes: null,
        budgetBytes: budget.maxBytes,
        deltaBytes: null,
      });
    } else {
      console.log(`[SKIP] Optional chunk not found for prefix ${budget.key}`);
      results.push({
        key: budget.key,
        required: budget.required,
        note: budget.note,
        status: 'SKIP',
        file: null,
        sizeBytes: null,
        budgetBytes: budget.maxBytes,
        deltaBytes: null,
      });
    }
    continue;
  }

  const status = matched.bytes > budget.maxBytes ? 'FAIL' : 'PASS';
  if (status === 'FAIL') hasFailure = true;
  results.push({
    key: budget.key,
    required: budget.required,
    note: budget.note,
    status,
    file: matched.name,
    sizeBytes: matched.bytes,
    budgetBytes: budget.maxBytes,
    deltaBytes: matched.bytes - budget.maxBytes,
  });

  console.log(
    `[${status}] ${matched.name} | size=${formatKB(matched.bytes)} | budget=${formatKB(budget.maxBytes)} | ${budget.note}`
  );
}

if (jsonOutPath) {
  const output = {
    profile: selectedProfile,
    hasFailure,
    generatedAt: new Date().toISOString(),
    results,
  };
  fs.writeFileSync(path.resolve(process.cwd(), jsonOutPath), JSON.stringify(output, null, 2));
}

if (hasFailure) {
  fail('\nBundle budget check failed. Reduce bundle size or update budgets intentionally.');
}

console.log('\nAll configured bundle budgets passed.');
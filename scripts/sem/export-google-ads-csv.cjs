#!/usr/bin/env node
/**
 * Export Google Ads Editor CSV from the verified flagship campaign blueprints.
 *
 * Usage:
 *   node scripts/sem/export-google-ads-csv.cjs
 *   node scripts/sem/export-google-ads-csv.cjs --cpa-budget 50 --daily-budget 30
 *
 * Output:
 *   scripts/sem/output/voraprep-flagship-<YYYY-MM-DD>.csv
 *
 * What this CSV does:
 *   - Creates 2 Search campaigns: "CPA Exam Prep — Quality MCQ Bank (2026)"
 *     and "CPA Daily Questions — SMS Drills (2026)" in DRAFT state (status=Paused).
 *   - Adds 8 ad groups, ~67 keywords, 8 RSAs with sitelinks.
 *
 * Import in Google Ads Editor:
 *   Account → Import → From file → pick this CSV → review → POST.
 *
 * SAFETY: Everything uploads as Paused. Nothing spends until you flip the
 * Daily CPA Standalone ad group to Enabled (recommended first ad group to launch).
 *
 * NOTE: Uses dynamic ESM import to load the TypeScript blueprint via tsx.
 */

const path = require('path');
const fs = require('fs');
const { spawnSync } = require('child_process');

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------
function parseArgs() {
  const args = process.argv.slice(2);
  const get = (flag, dflt) => {
    const i = args.indexOf(flag);
    return i >= 0 && args[i + 1] ? Number(args[i + 1]) : dflt;
  };
  return {
    cpaBudget: get('--cpa-budget', 30),
    dailyBudget: get('--daily-budget', 20),
    cpaCpa: get('--cpa-cpa', 12),
    dailyCpa: get('--daily-cpa', 6),
  };
}

// ---------------------------------------------------------------------------
// Use tsx to evaluate the TS blueprint and write JSON to a temp file
// ---------------------------------------------------------------------------
function loadCampaigns(opts) {
  const tmp = path.join(__dirname, '.tmp-campaigns.json');
  const evalScript = `
    import { generateFlagshipCampaigns } from '${path.resolve(__dirname, '../../src/services/growth/campaignBlueprints.ts').replace(/\\\\/g, '/')}';
    import fs from 'fs';
    const campaigns = generateFlagshipCampaigns({
      cpaPrepBudget: ${opts.cpaBudget},
      cpaDailyBudget: ${opts.dailyBudget},
      cpaPrepTargetCPA: ${opts.cpaCpa},
      cpaDailyTargetCPA: ${opts.dailyCpa},
    });
    fs.writeFileSync('${tmp.replace(/\\\\/g, '/')}', JSON.stringify(campaigns));
  `;
  const evalFile = path.join(__dirname, '.tmp-load.mjs');
  fs.writeFileSync(evalFile, evalScript);
  const r = spawnSync('npx', ['tsx', evalFile], { stdio: 'inherit', cwd: path.resolve(__dirname, '../..') });
  fs.unlinkSync(evalFile);
  if (r.status !== 0) {
    console.error('Failed to evaluate campaign blueprints with tsx.');
    process.exit(1);
  }
  const data = JSON.parse(fs.readFileSync(tmp, 'utf8'));
  fs.unlinkSync(tmp);
  return data;
}

// ---------------------------------------------------------------------------
// CSV helpers (Google Ads Editor schema)
// ---------------------------------------------------------------------------
function csvEscape(v) {
  if (v == null) return '';
  const s = String(v);
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function row(cols) {
  return cols.map(csvEscape).join(',');
}

const HEADERS = [
  'Campaign', 'Campaign Type', 'Networks', 'Budget', 'Bid Strategy Type',
  'Status', 'Ad Group', 'Max CPC', 'Keyword', 'Match Type',
  'Final URL', 'Headline 1', 'Headline 2', 'Headline 3', 'Headline 4',
  'Headline 5', 'Headline 6', 'Headline 7', 'Headline 8', 'Headline 9',
  'Headline 10', 'Headline 11', 'Headline 12', 'Headline 13', 'Headline 14',
  'Headline 15', 'Description 1', 'Description 2', 'Description 3', 'Description 4',
  'Path 1', 'Path 2', 'Sitelink Text', 'Sitelink Final URL',
  'Sitelink Description 1', 'Sitelink Description 2',
];

function blankRow() {
  return Object.fromEntries(HEADERS.map(h => [h, '']));
}

// ---------------------------------------------------------------------------
// Validation (Google Ads limits)
// ---------------------------------------------------------------------------
function validateCampaigns(campaigns) {
  const issues = [];
  for (const c of campaigns) {
    for (const ag of c.adGroups) {
      for (const ad of ag.ads) {
        ad.headlines.forEach((h, i) => { if (h.length > 30) issues.push(`${ag.name} headline #${i + 1} > 30 chars: "${h}" (${h.length})`); });
        ad.descriptions.forEach((d, i) => { if (d.length > 90) issues.push(`${ag.name} description #${i + 1} > 90 chars: "${d}" (${d.length})`); });
        if (ad.headlines.length < 3) issues.push(`${ag.name} has only ${ad.headlines.length} headlines (need 3+)`);
        if (ad.descriptions.length < 2) issues.push(`${ag.name} has only ${ad.descriptions.length} descriptions (need 2+)`);
        (ad.sitelinkExtensions || []).forEach((sl, i) => {
          if (sl.text.length > 25) issues.push(`${ag.name} sitelink #${i + 1} text > 25 chars: "${sl.text}"`);
          if (sl.description1.length > 35) issues.push(`${ag.name} sitelink #${i + 1} desc1 > 35 chars`);
          if (sl.description2.length > 35) issues.push(`${ag.name} sitelink #${i + 1} desc2 > 35 chars`);
        });
      }
    }
  }
  return issues;
}

// ---------------------------------------------------------------------------
// Build the CSV rows
// ---------------------------------------------------------------------------
function buildCsv(campaigns) {
  const rows = [HEADERS.join(',')];

  for (const c of campaigns) {
    // Campaign-level row
    const cRow = blankRow();
    cRow['Campaign'] = c.name;
    cRow['Campaign Type'] = 'Search';
    cRow['Networks'] = 'Google search;Search partners';
    cRow['Budget'] = c.dailyBudget.toFixed(2);
    cRow['Bid Strategy Type'] = 'Manual CPC';
    cRow['Status'] = 'Paused';
    rows.push(row(HEADERS.map(h => cRow[h])));

    for (const ag of c.adGroups) {
      // Ad group row
      const agRow = blankRow();
      agRow['Campaign'] = c.name;
      agRow['Ad Group'] = ag.name;
      agRow['Max CPC'] = ag.maxCpc.toFixed(2);
      agRow['Status'] = 'Paused';
      rows.push(row(HEADERS.map(h => agRow[h])));

      // Keywords
      for (const kw of ag.keywords) {
        const kwRow = blankRow();
        kwRow['Campaign'] = c.name;
        kwRow['Ad Group'] = ag.name;
        kwRow['Keyword'] = kw.keyword;
        kwRow['Match Type'] = kw.matchType.charAt(0).toUpperCase() + kw.matchType.slice(1);
        kwRow['Max CPC'] = kw.maxCpc.toFixed(2);
        kwRow['Status'] = 'Paused';
        rows.push(row(HEADERS.map(h => kwRow[h])));
      }

      // Negative keywords (campaign-level not supported here; do ad-group-level)
      for (const neg of ag.negativeKeywords) {
        const nRow = blankRow();
        nRow['Campaign'] = c.name;
        nRow['Ad Group'] = ag.name;
        nRow['Keyword'] = neg;
        nRow['Match Type'] = 'Negative Phrase';
        nRow['Status'] = 'Paused';
        rows.push(row(HEADERS.map(h => nRow[h])));
      }

      // Ads (RSA)
      for (const ad of ag.ads) {
        const adRow = blankRow();
        adRow['Campaign'] = c.name;
        adRow['Ad Group'] = ag.name;
        adRow['Final URL'] = ad.finalUrl;
        adRow['Path 1'] = ad.displayPath?.[0] || '';
        adRow['Path 2'] = ad.displayPath?.[1] || '';
        ad.headlines.slice(0, 15).forEach((h, i) => { adRow[`Headline ${i + 1}`] = h; });
        ad.descriptions.slice(0, 4).forEach((d, i) => { adRow[`Description ${i + 1}`] = d; });
        adRow['Status'] = 'Paused';
        rows.push(row(HEADERS.map(h => adRow[h])));
      }

      // Sitelinks (one row per sitelink, attached to the ad group)
      const seen = new Set();
      for (const ad of ag.ads) {
        for (const sl of (ad.sitelinkExtensions || [])) {
          const key = `${ag.name}::${sl.text}`;
          if (seen.has(key)) continue;
          seen.add(key);
          const slRow = blankRow();
          slRow['Campaign'] = c.name;
          slRow['Ad Group'] = ag.name;
          slRow['Sitelink Text'] = sl.text;
          slRow['Sitelink Final URL'] = sl.finalUrl;
          slRow['Sitelink Description 1'] = sl.description1;
          slRow['Sitelink Description 2'] = sl.description2;
          slRow['Status'] = 'Paused';
          rows.push(row(HEADERS.map(h => slRow[h])));
        }
      }
    }
  }
  return rows.join('\n') + '\n';
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  const opts = parseArgs();
  console.log('Loading campaign blueprints...');
  const campaigns = loadCampaigns(opts);

  console.log('Validating against Google Ads limits...');
  const issues = validateCampaigns(campaigns);
  if (issues.length) {
    console.error('\nValidation issues:');
    issues.forEach(i => console.error('  - ' + i));
    process.exit(2);
  }
  console.log('Validation issues: 0');

  const totalKw = campaigns.reduce((s, c) => s + c.adGroups.reduce((a, ag) => a + ag.keywords.length, 0), 0);
  const totalAds = campaigns.reduce((s, c) => s + c.adGroups.reduce((a, ag) => a + ag.ads.length, 0), 0);
  const totalAg = campaigns.reduce((s, c) => s + c.adGroups.length, 0);

  const csv = buildCsv(campaigns);
  const date = new Date().toISOString().slice(0, 10);
  const outDir = path.join(__dirname, 'output');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `voraprep-flagship-${date}.csv`);
  fs.writeFileSync(outPath, csv);

  console.log('\nSummary:');
  console.log(`  Campaigns:   ${campaigns.length}`);
  console.log(`  Ad groups:   ${totalAg}`);
  console.log(`  Keywords:    ${totalKw}`);
  console.log(`  Ads:         ${totalAds}`);
  console.log(`  Daily spend: $${campaigns.reduce((s, c) => s + c.dailyBudget, 0)}`);
  console.log(`\nWrote: ${outPath}`);
  console.log('\nNext: open Google Ads Editor -> Account -> Import -> From file -> select the CSV above.');
}

main();

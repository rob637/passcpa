#!/usr/bin/env node

/**
 * update-stripe-product-descriptions.cjs
 *
 * Updates the description on existing VoraPrep Stripe products to reflect
 * current question counts from shared/content-stats.json.
 *
 * Usage:
 *   STRIPE_SECRET_KEY=sk_test_xxx node scripts/update-stripe-product-descriptions.cjs
 *   STRIPE_SECRET_KEY=sk_live_xxx node scripts/update-stripe-product-descriptions.cjs --live
 *   add --dry-run to preview without writing
 */

const Stripe = require('../functions/node_modules/stripe');
const CONTENT_STATS = require('../shared/content-stats.json');

function formatDisplayCount(n) {
  const rounded = Math.floor(n / 100) * 100;
  return rounded.toLocaleString('en-US') + '+';
}

const PRODUCT_DESCRIPTIONS = {
  cpa: `AI-powered CPA exam preparation — ${formatDisplayCount(CONTENT_STATS.cpa.questions)} practice questions, adaptive engine, Vory AI tutor, TBS simulations. Covers FAR, AUD, REG and one discipline (BAR, ISC, or TCP).`,
  ea:  `AI-powered Enrolled Agent exam preparation — ${formatDisplayCount(CONTENT_STATS.ea.questions)} practice questions, all 3 SEE parts, Vory AI tutor.`,
  cma: `AI-powered CMA exam preparation — ${formatDisplayCount(CONTENT_STATS.cma.questions)} practice questions, both parts, Vory AI tutor.`,
  cia: `AI-powered CIA exam preparation — ${formatDisplayCount(CONTENT_STATS.cia.questions)} practice questions, all 3 parts, Vory AI tutor.`,
  cfp: `AI-powered CFP exam preparation — ${formatDisplayCount(CONTENT_STATS.cfp.questions)} practice questions, 8 domains, Vory AI tutor, case studies.`,
  cisa:`AI-powered CISA exam preparation — ${formatDisplayCount(CONTENT_STATS.cisa.questions)} practice questions, all 5 domains, Vory AI tutor.`,
};

async function main() {
  const args = process.argv.slice(2);
  const isLive = args.includes('--live');
  const isDryRun = args.includes('--dry-run');

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    console.error('Error: STRIPE_SECRET_KEY env var required.');
    process.exit(1);
  }
  if (isLive && !key.startsWith('sk_live_')) {
    console.error('Error: --live flag set but key is not sk_live_.');
    process.exit(1);
  }
  if (!isLive && key.startsWith('sk_live_')) {
    console.error('Error: live key detected but --live not passed. Refusing.');
    process.exit(1);
  }

  const stripe = new Stripe(key, { apiVersion: '2024-12-18.acacia' });
  const mode = isDryRun ? 'DRY RUN' : (isLive ? '🔴 LIVE' : '🧪 TEST');
  console.log(`\nVoraPrep Stripe product description update — ${mode}\n`);

  // Pull all products (active + archived) to be safe
  const all = [];
  for await (const p of stripe.products.list({ limit: 100 })) {
    all.push(p);
  }
  const examPrep = all.filter(p => p.name && /exam prep/i.test(p.name));
  console.log(`Found ${examPrep.length} exam prep products.\n`);

  for (const product of examPrep) {
    const lower = product.name.toLowerCase();
    const examId = (product.metadata && product.metadata.examId) ||
      Object.keys(PRODUCT_DESCRIPTIONS).find(id => lower.startsWith(`${id} `) || lower.startsWith(`voraprep ${id} `));

    if (!examId || !PRODUCT_DESCRIPTIONS[examId]) {
      console.log(`  ⚠️  Skipping ${product.name} (${product.id}) — could not map to exam`);
      continue;
    }

    const newDesc = PRODUCT_DESCRIPTIONS[examId];
    if (product.description === newDesc) {
      console.log(`  ✓ ${product.name} already up to date`);
      continue;
    }

    console.log(`  ── ${product.name} (${product.id})`);
    console.log(`     OLD: ${product.description || '(empty)'}`);
    console.log(`     NEW: ${newDesc}`);

    if (!isDryRun) {
      await stripe.products.update(product.id, { description: newDesc });
      console.log(`     ✅ Updated`);
    }
    console.log('');
  }

  console.log('Done.\n');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

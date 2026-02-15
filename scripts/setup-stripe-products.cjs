#!/usr/bin/env node

/**
 * setup-stripe-products.js
 * 
 * Creates all VoraPrep products and prices in Stripe with correct lookup keys.
 * Run this once per Stripe environment (test + live).
 * 
 * Usage:
 *   # Test mode (default) — uses STRIPE_SECRET_KEY from env
 *   node scripts/setup-stripe-products.js
 * 
 *   # Live mode — pass --live flag (prompts for confirmation)
 *   node scripts/setup-stripe-products.js --live
 * 
 *   # Dry run — show what would be created without creating anything
 *   node scripts/setup-stripe-products.js --dry-run
 * 
 *   # Use a specific key
 *   STRIPE_SECRET_KEY=sk_test_xxx node scripts/setup-stripe-products.js
 * 
 * Prerequisites:
 *   npm install stripe (already in functions/package.json)
 *   Set STRIPE_SECRET_KEY env var or pass via command line
 *
 * What it creates:
 *   - 6 products (one per exam: CPA, EA, CMA, CIA, CFP, CISA)
 *   - 24 prices (4 per exam: annual, monthly, founder_annual, founder_monthly)
 *   - Each price gets a lookup_key matching PRICE_LOOKUP_KEYS in functions/index.js
 */

let Stripe;
try {
  Stripe = require('stripe');
} catch {
  // Stripe not installed at root — try from functions/
  try {
    Stripe = require('../functions/node_modules/stripe');
  } catch {
    // Will be caught in main() if not dry-run
    Stripe = null;
  }
}

// ============================================================================
// PRICING CONFIGURATION — must match src/services/subscription.ts
// ============================================================================

// Content stats from shared JSON file (single source of truth)
const CONTENT_STATS = require('../shared/content-stats.json');

/**
 * Format a number as "X,XXX+" (round down to nearest 100)
 */
function formatDisplayCount(n) {
  const rounded = Math.floor(n / 100) * 100;
  return rounded.toLocaleString('en-US') + '+';
}

const EXAM_PRICING = {
  cpa: { annual: 449, monthly: 49, founderAnnual: 249, founderMonthly: 21 },
  ea:  { annual: 249, monthly: 29, founderAnnual: 149, founderMonthly: 13 },
  cma: { annual: 349, monthly: 39, founderAnnual: 199, founderMonthly: 17 },
  cia: { annual: 249, monthly: 29, founderAnnual: 149, founderMonthly: 13 },
  cfp: { annual: 349, monthly: 39, founderAnnual: 199, founderMonthly: 17 },
  cisa:{ annual: 349, monthly: 39, founderAnnual: 199, founderMonthly: 17 },
};

// Generate product descriptions dynamically from shared content stats
const PRODUCT_INFO = {
  cpa: {
    name: 'VoraPrep CPA Exam Prep',
    description: `AI-powered CPA exam preparation — ${formatDisplayCount(CONTENT_STATS.cpa.questions)} questions, adaptive engine, Vory AI tutor, TBS simulations.`,
  },
  ea: {
    name: 'VoraPrep EA Exam Prep',
    description: `AI-powered Enrolled Agent exam preparation — ${formatDisplayCount(CONTENT_STATS.ea.questions)} questions, all 3 SEE parts, Vory AI tutor.`,
  },
  cma: {
    name: 'VoraPrep CMA Exam Prep',
    description: `AI-powered CMA exam preparation — ${formatDisplayCount(CONTENT_STATS.cma.questions)} questions, both parts, Vory AI tutor.`,
  },
  cia: {
    name: 'VoraPrep CIA Exam Prep',
    description: `AI-powered CIA exam preparation — ${formatDisplayCount(CONTENT_STATS.cia.questions)} questions, all 3 parts, Vory AI tutor.`,
  },
  cfp: {
    name: 'VoraPrep CFP Exam Prep',
    description: `AI-powered CFP exam preparation — ${formatDisplayCount(CONTENT_STATS.cfp.questions)} questions, 8 domains, Vory AI tutor, case studies.`,
  },
  cisa: {
    name: 'VoraPrep CISA Exam Prep',
    description: `AI-powered CISA exam preparation — ${formatDisplayCount(CONTENT_STATS.cisa.questions)} questions, 5 domains, Vory AI tutor.`,
  },
};

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  const args = process.argv.slice(2);
  const isLive = args.includes('--live');
  const isDryRun = args.includes('--dry-run');
  
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key && !isDryRun) {
    console.error('Error: STRIPE_SECRET_KEY environment variable is required.');
    console.error('');
    console.error('  export STRIPE_SECRET_KEY=sk_test_xxx');
    console.error('  node scripts/setup-stripe-products.cjs');
    process.exit(1);
  }

  if (!Stripe && !isDryRun) {
    console.error('Error: stripe package not found. Run: cd functions && npm install');
    process.exit(1);
  }

  if (isLive && key && !key.startsWith('sk_live_')) {
    console.error('Error: --live flag used but key is not a live key.');
    process.exit(1);
  }

  if (!isLive && key && key.startsWith('sk_live_')) {
    console.error('Error: Live key detected but --live flag not set. Use --live to confirm.');
    process.exit(1);
  }

  const mode = isDryRun ? 'DRY RUN' : (isLive ? '🔴 LIVE' : '🧪 TEST');
  
  console.log('');
  console.log('═══════════════════════════════════════════════════');
  console.log(`  VoraPrep Stripe Product Setup — ${mode}`);
  console.log('═══════════════════════════════════════════════════');
  console.log('');

  if (isLive && !isDryRun) {
    console.log('⚠️  WARNING: This will create products in your LIVE Stripe account.');
    console.log('   Press Ctrl+C within 5 seconds to abort...');
    await sleep(5000);
    console.log('   Proceeding...');
    console.log('');
  }

  const stripe = isDryRun ? null : new Stripe(key, { apiVersion: '2024-12-18.acacia' });

  // Check for existing products to avoid duplicates
  if (!isDryRun) {
    console.log('Checking for existing VoraPrep products...');
    const existing = await stripe.products.list({ active: true, limit: 100 });
    const voraprepProducts = existing.data.filter(p => p.name.startsWith('VoraPrep'));
    if (voraprepProducts.length > 0) {
      console.log('');
      console.log('⚠️  Found existing VoraPrep products:');
      voraprepProducts.forEach(p => console.log(`   - ${p.name} (${p.id})`));
      console.log('');
      console.log('   To avoid duplicates, archive or delete these in the Stripe dashboard first.');
      console.log('   Or re-run with --dry-run to see what would be created.');
      console.log('');
      
      const readline = require('readline');
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      const answer = await new Promise(resolve => {
        rl.question('   Continue anyway? (yes/no): ', resolve);
      });
      rl.close();
      
      if (answer.toLowerCase() !== 'yes') {
        console.log('   Aborted.');
        process.exit(0);
      }
    }
  }

  const results = { products: 0, prices: 0, errors: [] };

  for (const [examId, pricing] of Object.entries(EXAM_PRICING)) {
    const info = PRODUCT_INFO[examId];
    const examUpper = examId.toUpperCase();
    
    console.log(`\n── ${examUpper} ──────────────────────────────────────`);
    
    // Create product
    let productId;
    if (isDryRun) {
      console.log(`  📦 Would create product: ${info.name}`);
      productId = `prod_dry_run_${examId}`;
    } else {
      try {
        const product = await stripe.products.create({
          name: info.name,
          description: info.description,
          metadata: {
            examId: examId,
            app: 'voraprep',
          },
        });
        productId = product.id;
        results.products++;
        console.log(`  ✅ Product created: ${info.name} (${productId})`);
      } catch (err) {
        console.log(`  ❌ Product creation failed: ${err.message}`);
        results.errors.push(`${examId} product: ${err.message}`);
        continue; // Skip prices if product failed
      }
    }

    // Create 4 prices per product
    const priceConfigs = [
      {
        lookupKey: `${examId}_annual`,
        amount: pricing.annual * 100, // Stripe uses cents
        interval: 'year',
        label: `Annual — $${pricing.annual}/yr`,
      },
      {
        lookupKey: `${examId}_monthly`,
        amount: pricing.monthly * 100,
        interval: 'month',
        label: `Monthly — $${pricing.monthly}/mo`,
      },
      {
        lookupKey: `${examId}_founder_annual`,
        amount: pricing.founderAnnual * 100,
        interval: 'year',
        label: `Founder Annual — $${pricing.founderAnnual}/yr`,
      },
      {
        lookupKey: `${examId}_founder_monthly`,
        amount: pricing.founderMonthly * 100,
        interval: 'month',
        label: `Founder Monthly — $${pricing.founderMonthly}/mo`,
      },
    ];

    for (const config of priceConfigs) {
      if (isDryRun) {
        console.log(`  💲 Would create price: ${config.label} (lookup_key: ${config.lookupKey})`);
      } else {
        try {
          const price = await stripe.prices.create({
            product: productId,
            unit_amount: config.amount,
            currency: 'usd',
            recurring: {
              interval: config.interval,
            },
            lookup_key: config.lookupKey,
            transfer_lookup_key: true, // Transfer key if it already exists on another price
            metadata: {
              examId: examId,
              priceType: config.lookupKey.includes('founder') ? 'founder' : 'regular',
              app: 'voraprep',
            },
          });
          results.prices++;
          console.log(`  ✅ Price: ${config.label} → ${price.id} (key: ${config.lookupKey})`);
        } catch (err) {
          console.log(`  ❌ Price failed (${config.lookupKey}): ${err.message}`);
          results.errors.push(`${config.lookupKey}: ${err.message}`);
        }
      }
    }
  }

  // Summary
  console.log('');
  console.log('═══════════════════════════════════════════════════');
  console.log(`  Summary ${isDryRun ? '(DRY RUN)' : ''}`);
  console.log('═══════════════════════════════════════════════════');
  
  if (isDryRun) {
    console.log(`  Would create: 6 products, 24 prices`);
  } else {
    console.log(`  Products created: ${results.products}/6`);
    console.log(`  Prices created:   ${results.prices}/24`);
  }
  
  if (results.errors.length > 0) {
    console.log(`  Errors: ${results.errors.length}`);
    results.errors.forEach(e => console.log(`    - ${e}`));
  }

  console.log('');
  
  if (!isDryRun && results.errors.length === 0) {
    console.log('  ✅ All products and prices created successfully!');
    console.log('');
    console.log('  Next steps:');
    console.log('  1. Verify in Stripe Dashboard → Products');
    console.log('  2. Set up webhook endpoint: https://your-project.cloudfunctions.net/stripeWebhook');
    console.log('  3. Add webhook events: checkout.session.completed, customer.subscription.*, invoice.payment_failed');
    console.log('  4. Save webhook signing secret: firebase functions:secrets:set STRIPE_WEBHOOK_SECRET');
    console.log('  5. Test with card: 4242 4242 4242 4242');
  }

  console.log('');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

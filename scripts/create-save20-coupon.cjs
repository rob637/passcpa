#!/usr/bin/env node

/**
 * create-save20-coupon.cjs
 *
 * Creates the SAVE20 promotion code in Stripe — a UNIVERSAL 20% off code
 * that works on BOTH monthly AND annual subscriptions.
 *
 * Why this is better than START9 + WELCOMEBACK:
 *   - One code, one promise, one CTA. Customers don't have to pick.
 *   - Repeating 3 months means:
 *       * Monthly: 3 months at 20% off ($29 → $23.20 × 3 = $17.40 total savings)
 *       * Annual:  20% off year 1 ($249 → $199.20) — only one invoice in the window
 *
 * What it creates:
 *   - 1 Coupon:        "save20" — 20% off, repeating for 3 months
 *   - 1 Promotion code: "SAVE20"
 *     - Max redemptions: 10000 (volume play — meant to scale)
 *     - Expires: 2026-05-26 (matches founder pricing window)
 *
 * Usage:
 *   STRIPE_SECRET_KEY=sk_test_xxx node scripts/create-save20-coupon.cjs --dry-run
 *   STRIPE_SECRET_KEY=sk_test_xxx node scripts/create-save20-coupon.cjs
 *   STRIPE_SECRET_KEY=sk_live_xxx node scripts/create-save20-coupon.cjs --live
 *
 * Idempotent: safe to re-run.
 */

let Stripe;
try { Stripe = require('stripe'); }
catch {
  try { Stripe = require('../functions/node_modules/stripe'); }
  catch { Stripe = null; }
}

const COUPON_ID = 'save20';
const PROMO_CODE = 'SAVE20';
const PERCENT_OFF = 20;
const DURATION = 'repeating';
const DURATION_IN_MONTHS = 3;
const MAX_REDEMPTIONS = 10000;
const EXPIRES_AT_ISO = '2026-05-26T23:59:59Z';

async function main() {
  const args = process.argv.slice(2);
  const isLive = args.includes('--live');
  const isDryRun = args.includes('--dry-run');

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key && !isDryRun) {
    console.error('Error: STRIPE_SECRET_KEY environment variable is required.');
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
    console.error('Error: Live key detected but --live flag not set.');
    process.exit(1);
  }

  const mode = isDryRun ? 'DRY RUN' : (isLive ? 'LIVE' : 'TEST');

  console.log('');
  console.log('===================================================');
  console.log(`  SAVE20 Coupon Setup — ${mode}`);
  console.log('===================================================');
  console.log(`  Coupon ID:     ${COUPON_ID}`);
  console.log(`  Promo code:    ${PROMO_CODE}`);
  console.log(`  Discount:      ${PERCENT_OFF}% off`);
  console.log(`  Duration:      ${DURATION} (${DURATION_IN_MONTHS} months)`);
  console.log(`  Effect:        Monthly $29 → $23.20 × 3 mo`);
  console.log(`                 Annual  $249 → $199.20 first year`);
  console.log(`  Max redeems:   ${MAX_REDEMPTIONS}`);
  console.log(`  Expires:       ${EXPIRES_AT_ISO}`);
  console.log('');

  if (isDryRun) {
    console.log('Dry run complete. No changes made.');
    return;
  }

  const stripe = new Stripe(key, { apiVersion: '2024-12-18.acacia' });
  const expiresAt = Math.floor(new Date(EXPIRES_AT_ISO).getTime() / 1000);

  // 1. Coupon
  let coupon;
  try {
    coupon = await stripe.coupons.retrieve(COUPON_ID);
    console.log(`Coupon already exists: ${coupon.id}`);
  } catch (err) {
    if (err.code !== 'resource_missing') throw err;
    coupon = await stripe.coupons.create({
      id: COUPON_ID,
      percent_off: PERCENT_OFF,
      duration: DURATION,
      duration_in_months: DURATION_IN_MONTHS,
      name: '20% Off — Monthly or Annual',
      metadata: {
        campaign: 'launch-2026-04',
        target: 'universal-acquisition',
        created_by: 'create-save20-coupon.cjs',
      },
    });
    console.log(`Created coupon: ${coupon.id}`);
  }

  // 2. Promotion code
  const existing = await stripe.promotionCodes.list({ code: PROMO_CODE, limit: 1 });
  let promoCode;
  if (existing.data.length > 0) {
    promoCode = existing.data[0];
    console.log(`Promotion code already exists: ${promoCode.code} (${promoCode.id})`);
  } else {
    promoCode = await stripe.promotionCodes.create({
      coupon: COUPON_ID,
      code: PROMO_CODE,
      max_redemptions: MAX_REDEMPTIONS,
      expires_at: expiresAt,
      active: true,
      metadata: { campaign: 'launch-2026-04', target: 'universal-acquisition' },
    });
    console.log(`Created promotion code: ${promoCode.code} (${promoCode.id})`);
  }

  console.log('');
  console.log('Done. SAVE20 is live — 20% off monthly or annual, for everyone.');
  console.log('');
  console.log('Next steps:');
  console.log('  - Test at https://voraprep.com/cpa#pricing → Choose plan → Enter SAVE20');
  console.log('  - Verify monthly checkout shows $23.20 first 3 months');
  console.log('  - Verify annual checkout shows $199.20 first year');
  console.log('');
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});

#!/usr/bin/env node

/**
 * create-start9-coupon.cjs
 *
 * Creates the START9 promotion code in Stripe — first month $9 (vs. $29) for
 * new monthly subscribers. Headline-grade discount for paid acquisition; pairs
 * with WELCOMEBACK (20% off annual) so we have a code for each plan.
 *
 * What it creates:
 *   - 1 Coupon:        "start9" — $20 off, applied to the first invoice
 *                      (monthly plan: $29 → $9 first month, then $29/mo)
 *   - 1 Promotion code: "START9"
 *     - Max redemptions: 10000 (volume play)
 *     - Expires: 2026-05-26 (matches founder window)
 *
 * Usage:
 *   STRIPE_SECRET_KEY=sk_test_xxx node scripts/create-start9-coupon.cjs --dry-run
 *   STRIPE_SECRET_KEY=sk_test_xxx node scripts/create-start9-coupon.cjs
 *   STRIPE_SECRET_KEY=sk_live_xxx node scripts/create-start9-coupon.cjs --live
 *
 * Idempotent: safe to re-run.
 */

let Stripe;
try { Stripe = require('stripe'); }
catch {
  try { Stripe = require('../functions/node_modules/stripe'); }
  catch { Stripe = null; }
}

const COUPON_ID = 'start9';
const PROMO_CODE = 'START9';
const AMOUNT_OFF = 2000;            // $20.00 in cents
const CURRENCY = 'usd';
const DURATION = 'once';            // first invoice only
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
  console.log(`  START9 Coupon Setup — ${mode}`);
  console.log('===================================================');
  console.log(`  Coupon ID:     ${COUPON_ID}`);
  console.log(`  Promo code:    ${PROMO_CODE}`);
  console.log(`  Discount:      $${(AMOUNT_OFF / 100).toFixed(2)} off (first invoice)`);
  console.log(`  Effect:        Monthly $29 → $9 first month, then $29/mo`);
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
      amount_off: AMOUNT_OFF,
      currency: CURRENCY,
      duration: DURATION,
      name: 'First Month $9',
      metadata: {
        campaign: 'launch-2026-04',
        target: 'monthly-acquisition',
        created_by: 'create-start9-coupon.cjs',
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
      metadata: { campaign: 'launch-2026-04', target: 'monthly-acquisition' },
    });
    console.log(`Created promotion code: ${promoCode.code} (${promoCode.id})`);
  }

  console.log('');
  console.log('Done. START9 is live — $9 first month for monthly subscribers.');
  console.log('');
  console.log('Next steps:');
  console.log('  - Test at https://voraprep.com/cpa#pricing → Choose monthly → Enter START9');
  console.log('  - Verify checkout shows $9.00 first invoice, then $29.00/mo');
  console.log('');
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});

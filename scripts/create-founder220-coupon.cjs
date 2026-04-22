#!/usr/bin/env node

/**
 * create-founder220-coupon.cjs
 *
 * Creates the FOUNDER220 promotion code in Stripe — a one-time, time-limited
 * recovery offer for the first 220 trial signups who didn't convert.
 *
 * What it creates:
 *   - 1 Coupon:        "founder220" — 30% off, repeats for 3 months
 *   - 1 Promotion code: "FOUNDER220" (the code customers will see / enter)
 *     - Max redemptions: 250 (small buffer over the 220 list)
 *     - Expires: 14 days from creation
 *     - First-time customers only: false (some recovered users may have lapsed subs)
 *
 * Usage:
 *   STRIPE_SECRET_KEY=sk_test_xxx node scripts/create-founder220-coupon.cjs
 *   STRIPE_SECRET_KEY=sk_test_xxx node scripts/create-founder220-coupon.cjs --dry-run
 *   STRIPE_SECRET_KEY=sk_live_xxx node scripts/create-founder220-coupon.cjs --live
 *
 * Idempotent: safe to re-run. Will detect existing coupon/promo code and exit.
 */

let Stripe;
try {
  Stripe = require('stripe');
} catch {
  try {
    Stripe = require('../functions/node_modules/stripe');
  } catch {
    Stripe = null;
  }
}

const COUPON_ID = 'founder220';
const PROMO_CODE = 'FOUNDER220';
const PERCENT_OFF = 30;
const DURATION = 'repeating';
const DURATION_IN_MONTHS = 3;
const MAX_REDEMPTIONS = 250;
const EXPIRY_DAYS = 14;

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
  console.log(`  FOUNDER220 Recovery Coupon Setup — ${mode}`);
  console.log('===================================================');
  console.log('');
  console.log(`  Coupon ID:     ${COUPON_ID}`);
  console.log(`  Promo code:    ${PROMO_CODE}`);
  console.log(`  Discount:      ${PERCENT_OFF}% off`);
  console.log(`  Duration:      ${DURATION} (${DURATION_IN_MONTHS} months)`);
  console.log(`  Max redeems:   ${MAX_REDEMPTIONS}`);
  console.log(`  Expires:       ${EXPIRY_DAYS} days from now`);
  console.log('');

  if (isDryRun) {
    console.log('Dry run complete. No changes made.');
    return;
  }

  const stripe = new Stripe(key, { apiVersion: '2024-12-18.acacia' });
  const expiresAt = Math.floor(Date.now() / 1000) + EXPIRY_DAYS * 24 * 60 * 60;

  // 1. Create or fetch coupon
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
      name: 'Founder Recovery — 30% off for 3 months',
      metadata: {
        campaign: 'founder220-recovery',
        created_by: 'create-founder220-coupon.cjs',
      },
    });
    console.log(`Created coupon: ${coupon.id}`);
  }

  // 2. Create or fetch promotion code
  const existingPromos = await stripe.promotionCodes.list({
    code: PROMO_CODE,
    limit: 1,
  });

  let promoCode;
  if (existingPromos.data.length > 0) {
    promoCode = existingPromos.data[0];
    console.log(`Promotion code already exists: ${promoCode.code} (${promoCode.id})`);
  } else {
    promoCode = await stripe.promotionCodes.create({
      coupon: COUPON_ID,
      code: PROMO_CODE,
      max_redemptions: MAX_REDEMPTIONS,
      expires_at: expiresAt,
      active: true,
      metadata: {
        campaign: 'founder220-recovery',
      },
    });
    console.log(`Created promotion code: ${promoCode.code} (${promoCode.id})`);
  }

  console.log('');
  console.log('Done. Use the code "FOUNDER220" at checkout to apply 30% off for 3 months.');
  console.log('');
  console.log('Next step: send the recovery emails.');
  console.log('  node scripts/send-founder-recovery-emails.cjs --dry-run');
  console.log('');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});

#!/usr/bin/env node

/**
 * create-welcomeback-coupon.cjs
 *
 * Creates the WELCOMEBACK promotion code in Stripe — used by the win-back
 * email campaign to past users (see scripts/send-winback-emails.cjs).
 *
 * What it creates:
 *   - 1 Coupon:        "welcomeback" — 20% off, applied to the first invoice
 *                      (annual plan = 20% off year 1 = $99 -> $79.20)
 *   - 1 Promotion code: "WELCOMEBACK"
 *     - Max redemptions: 500
 *     - Expires: 30 days from creation
 *     - First-time customers only: false (this is a win-back — they're returning)
 *
 * Usage:
 *   STRIPE_SECRET_KEY=sk_test_xxx node scripts/create-welcomeback-coupon.cjs --dry-run
 *   STRIPE_SECRET_KEY=sk_test_xxx node scripts/create-welcomeback-coupon.cjs
 *   STRIPE_SECRET_KEY=sk_live_xxx node scripts/create-welcomeback-coupon.cjs --live
 *
 * Idempotent: safe to re-run.
 */

let Stripe;
try { Stripe = require('stripe'); }
catch {
  try { Stripe = require('../functions/node_modules/stripe'); }
  catch { Stripe = null; }
}

const COUPON_ID = 'welcomeback';
const PROMO_CODE = 'WELCOMEBACK';
const PERCENT_OFF = 20;
const DURATION = 'once';            // applies to first invoice — annual gets full 20% off year 1
const MAX_REDEMPTIONS = 500;
const EXPIRY_DAYS = 30;

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
  console.log(`  WELCOMEBACK Coupon Setup — ${mode}`);
  console.log('===================================================');
  console.log(`  Coupon ID:     ${COUPON_ID}`);
  console.log(`  Promo code:    ${PROMO_CODE}`);
  console.log(`  Discount:      ${PERCENT_OFF}% off`);
  console.log(`  Duration:      ${DURATION} (first invoice)`);
  console.log(`  Max redeems:   ${MAX_REDEMPTIONS}`);
  console.log(`  Expires:       ${EXPIRY_DAYS} days from now`);
  console.log('');

  if (isDryRun) {
    console.log('Dry run complete. No changes made.');
    return;
  }

  const stripe = new Stripe(key, { apiVersion: '2024-12-18.acacia' });
  const expiresAt = Math.floor(Date.now() / 1000) + EXPIRY_DAYS * 24 * 60 * 60;

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
      name: 'Welcome Back — 20% off',
      metadata: {
        campaign: 'winback-2026-04',
        created_by: 'create-welcomeback-coupon.cjs',
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
      metadata: { campaign: 'winback-2026-04' },
    });
    console.log(`Created promotion code: ${promoCode.code} (${promoCode.id})`);
  }

  console.log('');
  console.log('Done. WELCOMEBACK is live — 20% off the first invoice.');
  console.log('');
  console.log('Next steps:');
  console.log('  1. node scripts/send-winback-emails.cjs --test you@example.com');
  console.log('  2. node scripts/send-winback-emails.cjs --dry-run');
  console.log('  3. node scripts/send-winback-emails.cjs --send --limit 10');
  console.log('');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});

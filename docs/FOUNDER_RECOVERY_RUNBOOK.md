# Founder Recovery Campaign — Operator Runbook

**Goal:** Re-engage the first ~220 trial signups who didn't convert by combining
a one-question diagnostic ("what stopped you?") with a real recovery offer
(30% off founder pricing for 3 months via the `FOUNDER220` coupon).

This is a **one-shot** campaign. The replies you get are more valuable than
the conversions. Read every reply and use them to fix the funnel.

---

## What got built

| File | Purpose |
|---|---|
| `scripts/create-founder220-coupon.cjs` | One-time Stripe setup: coupon + promotion code |
| `scripts/send-founder-recovery-emails.cjs` | Sends the recovery emails (dry-run by default) |
| `functions/index.js` (`createCheckoutSession`) | Now accepts optional `couponCode` and applies it to Stripe Checkout |
| `src/components/pages/StartCheckout.tsx` | Reads `?coupon=` from URL, passes to checkout |
| `src/components/pages/auth/Register.tsx` | Persists `coupon` in `pendingCheckout` if user must register first |
| `src/components/pages/Onboarding.tsx` | Forwards `coupon` to `/start-checkout` post-onboarding |

The email link points to:
`https://app.voraprep.com/start-checkout?course={cpa|ea|...}&interval=annual&coupon=FOUNDER220&utm_source=recovery&utm_medium=email&utm_campaign=founder220-recovery-2026-04`

If the user is already logged in, they go straight to a Stripe Checkout page
with the discount auto-applied. If not, they register → onboard → checkout
with the coupon preserved end-to-end.

---

## Step-by-step send procedure

### 0. Prereqs

```bash
# You need:
#   - serviceAccountKey.json at repo root (already present)
#   - STRIPE_SECRET_KEY (test key for dev, live key for prod)
#   - RESEND_API_KEY
```

### 1. Deploy the Cloud Function update FIRST

The new `couponCode` parameter on `createCheckoutSession` must be deployed
before the emails go out — otherwise users who click will get a non-discounted
checkout page.

```bash
firebase use voraprep-dev   # or your dev project alias
firebase deploy --only functions:createCheckoutSession
```

Verify it deployed cleanly in the Firebase Console.

### 2. Deploy the frontend changes

```bash
npm run build
npm run deploy:dev
```

### 3. Create the Stripe coupon (TEST mode first)

```bash
# DRY RUN — see what will be created
node scripts/create-founder220-coupon.cjs --dry-run

# Real create (test mode)
STRIPE_SECRET_KEY=sk_test_xxx node scripts/create-founder220-coupon.cjs
```

This creates:
- Coupon `founder220` — 30% off, repeats for 3 months
- Promotion code `FOUNDER220` — max 250 redemptions, expires in 14 days

Idempotent: re-running just reports "already exists."

### 4. End-to-end smoke test (TEST mode)

1. Send yourself a test email:
   ```bash
   RESEND_API_KEY=re_xxx node scripts/send-founder-recovery-emails.cjs --send --test you@yourpersonal.com
   ```
2. Open the email. Click "Claim founder pricing →".
3. Confirm the Stripe Checkout page shows the 30% discount applied.
4. (Optional) Use Stripe test card `4242 4242 4242 4242` to complete checkout
   and verify the subscription is created with the coupon attached.

### 5. Soft launch — small batch (5 users)

```bash
RESEND_API_KEY=re_xxx node scripts/send-founder-recovery-emails.cjs --send --limit 5
```

Watch for:
- Resend dashboard: bounces, spam complaints
- Your inbox at `rob@voraprep.com`: replies start coming in
- Stripe dashboard: any redemptions of `FOUNDER220`

Wait 2–3 hours before scaling.

### 6. Full send (production)

When you're ready to point at the real ~220 users:

```bash
firebase use voraprep-prod
# (Re-run coupon creation against LIVE Stripe)
STRIPE_SECRET_KEY=sk_live_xxx node scripts/create-founder220-coupon.cjs --live
# (Then send)
RESEND_API_KEY=re_xxx node scripts/send-founder-recovery-emails.cjs --send
```

The script writes `users/{uid}.recoveryEmail.founder220-recovery-2026-04.sentAt`
so re-running won't double-send anyone.

---

## Filtering options

```bash
# Only CPA users
node scripts/send-founder-recovery-emails.cjs --send --course cpa

# Only users from last 90 days
node scripts/send-founder-recovery-emails.cjs --send --since-days 90

# Combine
node scripts/send-founder-recovery-emails.cjs --send --course ea --limit 50
```

---

## Measuring success

After 7 days, check:

1. **Reply rate** — count of inbound emails to `rob@voraprep.com` referencing
   the campaign. Target: **5–15%** (much higher than typical).
2. **Click-through rate** — Resend dashboard, filter by tag `campaign:founder220-recovery-2026-04`.
3. **Conversion rate** — Stripe dashboard → Coupons → `founder220` → Times redeemed.
4. **Conversion $** — Total MRR added (visible in Stripe).

Honest expectation:
- Replies: 10–30 (priceless)
- Clicks: 30–60
- Paid conversions: 3–10

If conversions are < 2%, the problem is upstream of pricing — read the replies
to find out what.

---

## Common questions to expect from replies

| Reply theme | What to do next |
|---|---|
| "Too expensive" | Surface SMS Daily CPA tier ($4.99) as the entry point |
| "Didn't have time" | Offer extended trial; surface short-format study |
| "Content felt thin" | Specific feedback → improve content for that section |
| "Not ready / not studying yet" | Add to nurture list with exam-date reminder |
| "Switched to Becker / Roger" | Ask what made the difference; consider competitive landing page |
| No reply at all | The diagnostic worked — they self-segmented as not interested |

---

## Rollback

If something goes wrong mid-send:
1. Hit Ctrl+C on the script. The `recoveryEmail.{campaign}.sentAt` field marks
   each user as already sent, so re-running picks up where you left off.
2. To deactivate the coupon immediately:
   ```bash
   STRIPE_SECRET_KEY=sk_xxx node -e "const Stripe = require('./functions/node_modules/stripe'); const s = new Stripe(process.env.STRIPE_SECRET_KEY); s.promotionCodes.list({code:'FOUNDER220'}).then(p=>s.promotionCodes.update(p.data[0].id,{active:false})).then(console.log)"
   ```

---

## What this campaign does NOT solve

- **Top-of-funnel acquisition.** This re-engages people you already had.
- **Underlying conversion leak.** If trial→paid stays low after the recovery,
  the next priority is the `/try` public sample experience and trial-day
  conversion triggers (Phase 1B + Phase 3 of the revenue plan).
- **SMS launch.** Independent track once Telnyx number approves.

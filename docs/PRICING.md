# VoraPrep Pricing Strategy

**Date:** Updated June 2025  
**Status:** DECIDED  
**Launch Date:** February 19, 2026  
**Purpose:** Per-exam subscription pricing with founder program

---

## Executive Summary

| Decision | Choice |
|----------|--------|
| **Launch Date** | February 19, 2026 |
| **Founder Window** | February 19 – August 31, 2026 |
| **Founder Lock** | 2 years (rate guaranteed through August 2028) |
| **Founder Seats** | 300 per exam |
| **Primary Plan** | Annual subscription |
| **Trial** | 14 days full access, no credit card |
| **Pass Guarantee** | Free extension until you pass |
| **Monthly Option** | Available |
| **All-Access Bundle** | NOT offered — per-exam pricing only |
| **Lifetime Option** | NOT offered |
| **Feature Gates** | NONE — every paying user gets everything |

---

## Pricing Matrix

### 3 Price Bands

| Band | Exams | Monthly | Annual | Founder Annual | Founder Monthly* |
|------|-------|---------|--------|----------------|------------------|
| **Band 1** | CPA | $49/mo | $449/yr | $249/yr | ~$21/mo |
| **Band 2** | CMA, CFP, CISA | $39/mo | $349/yr | $199/yr | ~$17/mo |
| **Band 3** | EA, CIA | $29/mo | $249/yr | $149/yr | ~$13/mo |

*Founder monthly must be > founder annual / 12 to incentivize annual.

### Founder Savings

| Exam | Regular Annual | Founder Annual | Savings |
|------|----------------|----------------|---------|
| CPA | $449 | $249 | 44% off |
| CMA | $349 | $199 | 43% off |
| CFP | $349 | $199 | 43% off |
| CISA | $349 | $199 | 43% off |
| CIA | $249 | $149 | 40% off |
| EA | $249 | $149 | 40% off |

### Why This Pricing?

- **CPA at $449:** Flagship product, 7 sections, 3,200+ questions, most content
- **Band 2 at $349:** Mid-tier exams — CMA (2 parts), CFP (8 domains), CISA (5 domains)
- **Band 3 at $249:** EA (3 parts, tax-focused) and CIA (3 parts, audit-focused) — aggressive pricing to drive volume

### Why No All-Access Bundle?

- Each exam is a separate study journey — users don't cross-shop
- Per-exam pricing is simpler and more honest
- Avoids the "gym membership" problem of paying for unused content
- Easier to market each exam to its target audience

---

## Founder Program

### Terms

| Parameter | Value |
|-----------|-------|
| **Window** | Feb 19 – August 31, 2026 |
| **Seats** | 300 per exam (1,800 total across 6 exams) |
| **Rate Lock** | 2 years from subscription start |
| **Discount** | 40–44% off regular price |
| **Features** | Same as regular — no feature gates |

### Rationale

- **300 seats per exam:** Creates real scarcity (not fake urgency)
- **2-year lock (not forever):** Sustainable for the business, still compelling for users
- **August 31 deadline:** Gives 6+ months from launch to fill seats
- **No feature gates:** Simplifies codebase and avoids frustrating paying users

### After Founder Window

- Founder rate holders keep their rate for 2 years from their subscription start date
- After 2 years, they auto-convert to regular pricing
- New subscribers pay regular rates
- No new founder seats available after August 31, 2026 (or when 300 seats per exam are filled)

---

## Subscription Details

### What Every Subscriber Gets (No Tiers)

- Unlimited practice questions
- Unlimited Vory AI tutor access
- Unlimited TBS / simulation practice
- Full exam simulations (Prometric-style)
- SM-2 spaced repetition
- Real-time adaptive engine
- Progress analytics
- Offline mode (PWA)
- Study plans
- Flashcards
- Pass Guarantee (after 3 months)

### 14-Day Free Trial

- Full access to everything (no feature restrictions)
- No credit card required to start
- Email reminders at days 3, 7, and 12
- Converts to paid or expires after 14 days

### Pass Guarantee

- Available to subscribers who have been active for 3+ months
- If you don't pass after meeting study requirements, subscription extended free
- See terms at /pass-guarantee

---

## Implementation

### Canonical Pricing Source

All pricing is defined in `src/services/subscription.ts` → `EXAM_PRICING`:

```typescript
export const EXAM_PRICING = {
  cpa: { annual: 449, monthly: 49, founderAnnual: 249, founderMonthly: 21 },
  ea:  { annual: 249, monthly: 29, founderAnnual: 149, founderMonthly: 13 },
  cma: { annual: 349, monthly: 39, founderAnnual: 199, founderMonthly: 17 },
  cia: { annual: 249, monthly: 29, founderAnnual: 149, founderMonthly: 13 },
  cfp: { annual: 349, monthly: 39, founderAnnual: 199, founderMonthly: 17 },
  cisa:{ annual: 349, monthly: 39, founderAnnual: 199, founderMonthly: 17 },
};
```

### Stripe Integration

- Per-exam lookup keys: `{exam}_{interval}` and `{exam}_founder_{interval}`
- Example: `cpa_annual`, `cpa_founder_annual`, `ea_monthly`, `ea_founder_monthly`
- Stripe prices must match the amounts in `EXAM_PRICING`
- Cloud Function `createCheckoutSession` selects lookup key based on courseId + interval + founder status

### Key Files

| File | What It Contains |
|------|-----------------|
| `src/services/subscription.ts` | `EXAM_PRICING`, `SUBSCRIPTION_PLANS`, `isFounderPricingActive()` |
| `src/components/pages/landing/ExamLandingData.ts` | Per-exam pricing blocks for landing pages |
| `src/components/pages/landing/ExamLandingTemplate.tsx` | Pricing section UI (annual/monthly toggle) |
| `src/hooks/useCheckout.ts` | Checkout flow, `isFounderPricingActive()` |
| `src/components/common/SubscriptionGate.tsx` | Paywall/upgrade prompts |
| `functions/index.js` | `FOUNDER_DEADLINE`, `PRICE_LOOKUP_KEYS`, Stripe checkout |

### FOUNDER_DEADLINE Locations

The deadline `2026-04-30T23:59:59Z` appears in 4 files:
1. `src/services/subscription.ts`
2. `src/hooks/useCheckout.ts` (2 instances)
3. `src/components/pages/landing/ExamLandingTemplate.tsx`
4. `functions/index.js`

All must stay in sync.

---

## Competitor Pricing (For Context)

| Exam | Competitors | Their Prices |
|------|-------------|-------------|
| CPA | Becker, Roger, Surgent | $1,799 – $3,499 |
| EA | Gleim, Passkey, Surgent | $447 – $629 |
| CMA | Gleim, Hock, Wiley | $1,199 – $1,599 |
| CIA | Gleim, IIA Learning, Surgent | $999 – $1,400 |
| CFP | Kaplan, Dalton, Zahn | $1,299 – $1,895 |
| CISA | ISACA, Hemang Doshi | $299 – $795 |

VoraPrep is 70–95% cheaper than traditional review courses, even at regular prices.

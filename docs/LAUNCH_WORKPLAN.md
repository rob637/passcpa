# VoraPrep Launch Workplan

**Target Launch:** February 19, 2026 (Wednesday)  
**Testing Period:** February 17-18, 2026 (Monday-Tuesday)  
**Development Sprint:** February 10-16, 2026 (7 days)

---

## Executive Summary

| Milestone | Date | Status |
|-----------|------|--------|
| Development Complete | February 16, 2026 (Sunday) | ⬜ |
| Testing Period | February 17-18, 2026 | ⬜ |
| **LAUNCH** | February 19, 2026 | ⬜ |
| First Trial Expirations | ~March 5, 2026 | ⬜ |
| Founder Window Closes | August 31, 2026 | ⬜ |

---

## Phase 1: Development Sprint (Feb 10-16)

### Day 1-2: Stripe Integration (Feb 10-11)

| Task | Priority | Est. Hours | Owner |
|------|----------|------------|-------|
| Create Stripe account (if not done) | P0 | 0.5 | |
| Create products in Stripe Dashboard | P0 | 1 | |
| - CPA: $449/yr, $249/yr (founder), $49/mo | | | |
| - EA: $249/yr, $149/yr (founder), $29/mo | | | |
| - CMA: $349/yr, $199/yr (founder), $39/mo | | | |
| - CIA: $249/yr, $149/yr (founder), $29/mo | | | |
| - CFP: $349/yr, $199/yr (founder), $39/mo | | | |
| - CISA: $349/yr, $199/yr (founder), $39/mo | | | |
| Set up Stripe test mode | P0 | 0.5 | |
| Install Stripe SDK (npm install stripe @stripe/stripe-js) | P0 | 0.5 | |
| Create Stripe checkout endpoint (Cloud Function) | P0 | 3 | |
| Create Stripe webhook handler (Cloud Function) | P0 | 4 | |
| - Handle checkout.session.completed | | | |
| - Handle customer.subscription.updated | | | |
| - Handle customer.subscription.deleted | | | |
| - Handle invoice.payment_failed | | | |
| Set webhook secret in Firebase secrets | P0 | 0.5 | |
| **Subtotal** | | **10 hrs** | |

### Day 2-3: Subscription Service Update (Feb 11-12)

| Task | Priority | Est. Hours | Owner |
|------|----------|------------|-------|
| Update subscription.ts with new per-exam pricing | P0 | 2 | |
| Add `courseId` to subscription schema (which exam) | P0 | 1 | |
| Add `isFounder` flag to user profile | P0 | 0.5 | |
| Add `trialStartDate` and `trialEndDate` fields | P0 | 0.5 | |
| Update `IS_BETA` flag to `false` | P0 | 0.5 | |
| Create `checkTrialStatus()` function | P0 | 1 | |
| Create `getSubscriptionForCourse(userId, courseId)` | P0 | 1 | |
| Add Stripe price IDs to plan config | P0 | 1 | |
| Test subscription flows locally | P0 | 2 | |
| **Subtotal** | | **9.5 hrs** | |

### Day 3-4: Content Gating (Feb 12-13)

| Task | Priority | Est. Hours | Owner |
|------|----------|------------|-------|
| Create `SubscriptionGate` component | P0 | 2 | |
| - Shows upgrade prompt when user lacks access | | | |
| - Different messaging for trial vs expired vs never subscribed | | | |
| Update Practice page to check subscription | P0 | 1 | |
| Update Lessons page to limit access (20% after trial) | P0 | 2 | |
| Update AI Tutor to check subscription | P0 | 1 | |
| Update Exam Simulator to check subscription | P0 | 1 | |
| Update TBS pages to check subscription | P0 | 1 | |
| Add "Days remaining in trial" banner | P1 | 1 | |
| Test gating works correctly | P0 | 2 | |
| **Subtotal** | | **11 hrs** | |

### Day 4-5: Pricing Page Redesign (Feb 13-14)

| Task | Priority | Est. Hours | Owner |
|------|----------|------------|-------|
| Redesign Pricing.tsx with new prices | P0 | 3 | |
| - Per-exam pricing display | | | |
| - Founder pricing (show discount) | | | |
| - Monthly vs Annual toggle | | | |
| - Pass Guarantee messaging | | | |
| Add "Select Exam" step before checkout | P0 | 2 | |
| Connect "Subscribe" buttons to Stripe checkout | P0 | 2 | |
| Add success/cancel URL handlers | P0 | 1 | |
| Create /checkout-success page | P0 | 1 | |
| Create /checkout-cancel page | P0 | 0.5 | |
| Test end-to-end purchase flow | P0 | 2 | |
| **Subtotal** | | **11.5 hrs** | |

### Day 5-6: Trial & Transition Logic (Feb 14-15)

| Task | Priority | Est. Hours | Owner |
|------|----------|------------|-------|
| Implement 14-day trial auto-start on signup | P0 | 1 | |
| Create trial expiration Cloud Function (scheduled) | P0 | 2 | |
| - Runs daily, checks trial expirations | | | |
| - Updates status to 'expired' | | | |
| - Sends "trial ending soon" email (day 12) | | | |
| - Sends "trial expired" email | | | |
| Handle existing beta users (see Transition Plan below) | P0 | 2 | |
| Add founder badge to user profile | P1 | 1 | |
| Display "Founding Member" in app UI | P1 | 1 | |
| Test trial expiration flow | P0 | 2 | |
| **Subtotal** | | **9 hrs** | |

### Day 6-7: Polish & Edge Cases (Feb 15-16)

| Task | Priority | Est. Hours | Owner |
|------|----------|------------|-------|
| Subscription management page (view/cancel) | P1 | 3 | |
| - Link to Stripe Customer Portal | | | |
| Pass Guarantee terms page | P1 | 1 | |
| Update Settings page with subscription status | P1 | 1 | |
| Email: "Welcome to your trial" | P1 | 1 | |
| Email: "Your trial is ending in 2 days" | P1 | 1 | |
| Email: "Welcome, Founding Member!" (after purchase) | P1 | 1 | |
| Error handling for payment failures | P0 | 1 | |
| Mobile responsive testing | P0 | 1 | |
| **Subtotal** | | **10 hrs** | |

### Development Sprint Total: ~61 hours (7 days)

---

## Phase 2: Testing Period (Feb 17-18)

### Testing Checklist

| Test Case | Status |
|-----------|--------|
| **Signup Flow** | |
| New user signs up → Trial starts (14 days) | ⬜ |
| Trial countdown shows correctly | ⬜ |
| **Stripe Checkout** | |
| Annual subscription purchase works | ⬜ |
| Monthly subscription purchase works | ⬜ |
| Founder pricing shows for eligible users | ⬜ |
| Checkout success redirects correctly | ⬜ |
| Checkout cancel redirects correctly | ⬜ |
| **Content Gating** | |
| Trial user: Full access | ⬜ |
| Expired trial: Limited access (20% content) | ⬜ |
| Subscribed user: Full access | ⬜ |
| AI Tutor blocked for non-subscribers | ⬜ |
| TBS blocked for non-subscribers | ⬜ |
| Exam simulator blocked for non-subscribers | ⬜ |
| **Webhooks** | |
| Subscription created → User upgraded | ⬜ |
| Subscription canceled → User downgraded | ⬜ |
| Payment failed → User notified | ⬜ |
| **Emails** | |
| Trial started email sends | ⬜ |
| Trial ending email sends | ⬜ |
| Purchase confirmation email sends | ⬜ |
| **Edge Cases** | |
| Existing beta user: 14-day trial started | ⬜ |
| User tries to access wrong exam | ⬜ |
| User switches between exams | ⬜ |

### Stripe Test Cards

| Card Number | Result |
|-------------|--------|
| 4242 4242 4242 4242 | Success |
| 4000 0000 0000 0002 | Decline |
| 4000 0000 0000 3220 | 3D Secure required |

---

## Phase 3: Launch Day (Feb 19)

### Launch Checklist

| Time | Task | Status |
|------|------|--------|
| **Morning (9 AM)** | | |
| Switch Stripe from test → live mode | ⬜ |
| Update webhook endpoints to live | ⬜ |
| Deploy final production build | ⬜ |
| Verify Stripe live keys in Firebase | ⬜ |
| Do one live test purchase (yourself) | ⬜ |
| Refund test purchase in Stripe dashboard | ⬜ |
| **Late Morning (10 AM)** | | |
| Update IS_BETA flag → false (if not already) | ⬜ |
| Run transition script for existing users | ⬜ |
| Verify existing users have trial status | ⬜ |
| **Announcement (11 AM)** | | |
| Send email blast to existing users | ⬜ |
| Post on social media | ⬜ |
| Update landing page messaging | ⬜ |
| **Monitor** | | |
| Watch for payment failures | ⬜ |
| Watch for error logs | ⬜ |
| Be ready to hotfix | ⬜ |

---

## Transition Plan: Existing Beta Users

### Who are they?

Users who signed up before February 19, 2026 (launch date).

### How to identify them?

```javascript
// Users with createdAt < launch date
const LAUNCH_DATE = new Date('2026-02-19T00:00:00Z');
const isBetaUser = user.createdAt < LAUNCH_DATE;
```

### What do they get?

| Benefit | Value |
|---------|-------|
| **14-day trial starting Feb 19** | Full access to see paid features |
| **Founder pricing eligibility** | ~40-44% off if they subscribe by August 31 |
| **Appreciation email** | "Thank you for being a beta user" |
| **No interruption** | Trial starts, they keep studying |

### Transition Script

```javascript
// Run on launch day (Feb 19) as one-time script
async function transitionBetaUsers() {
  const users = await db.collection('users')
    .where('createdAt', '<', new Date('2026-02-19'))
    .get();
  
  const batch = db.batch();
  const now = new Date();
  const trialEnd = new Date(now);
  trialEnd.setDate(trialEnd.getDate() + 14);
  
  users.docs.forEach(userDoc => {
    const subRef = db.collection('subscriptions').doc(userDoc.id);
    batch.set(subRef, {
      tier: 'free',
      status: 'trialing',
      isFounder: true, // Eligible for founder pricing
      isBetaUser: true,
      trialStartDate: now,
      trialEndDate: trialEnd,
      createdAt: now,
      updatedAt: now,
    }, { merge: true });
  });
  
  await batch.commit();
  console.log(`Transitioned ${users.size} beta users`);
}
```

### Email to Existing Users (Feb 19)

**Subject:** VoraPrep is launching — your Founding Member invite 🎉

```
Hi [Name],

Thank you for being part of the VoraPrep beta! Your feedback has been invaluable.

Today we're officially launching paid plans. Here's what this means for you:

✅ **You have 14 more days of full access** — no interruption
✅ **You're eligible for Founding Member pricing** — save over 40% for 2 years
✅ **Lock in $249/year** (instead of $449) for CPA — rate guaranteed through August 2028

Your trial ends: [DATE]

[Subscribe Now — Lock in Founder Rate]

After your trial, you'll still have access to:
- 20% of practice questions
- 30% of lessons
- Progress tracking

To unlock everything (AI tutor, all questions, TBS, exam simulator):
→ Subscribe before August 31 at founding member rates

Thank you for believing in us early. Let's get you to 75+.

— The VoraPrep Team
```

---

## Founding Members Program

### Who qualifies?

- Anyone who subscribes between Feb 19 and August 31, 2026
- Beta users who convert during this window

### What do they get?

| Benefit | Details |
|---------|---------|
| **~40-44% off pricing** | Locked for 2 years from subscription start |
| **"Founding Member" badge** | Displayed in profile and app header |
| **Priority support** | Faster response times |
| **Roadmap input** | Access to founder feedback channel |

### How is it enforced?

```javascript
// When creating subscription
const isFounderWindow = new Date() < new Date('2026-08-31');
const subscription = {
  tier: 'annual',
  isFounder: isFounderWindow,
  priceId: isFounderWindow ? 'price_founder_cpa_annual' : 'price_cpa_annual',
  // ...
};
```

### Founder Pricing (Stripe Products)

| Exam | Regular Price ID | Founder Price ID |
|------|------------------|------------------|
| CPA Annual | price_cpa_annual | price_founder_cpa_annual |
| CPA Monthly | price_cpa_monthly | price_founder_cpa_monthly |
| EA Annual | price_ea_annual | price_founder_ea_annual |
| EA Monthly | price_ea_monthly | price_founder_ea_monthly |
| CMA Annual | price_cma_annual | price_founder_cma_annual |
| CMA Monthly | price_cma_monthly | price_founder_cma_monthly |
| *etc.* | | |

---

## Post-Launch Monitoring (Week 1)

### Metrics to Track

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Signups per day | 20+ | Firebase Auth count |
| Trial → Paid conversion | 5-10% | Stripe dashboard |
| Checkout abandonment | <50% | Stripe/Analytics |
| Support tickets | <5/day | Email/Discord |
| Error rate | <1% | Firebase Crashlytics |

### Daily Standup Questions

1. How many signups yesterday?
2. How many conversions?
3. Any payment failures?
4. Any support issues?
5. Any bugs reported?

---

## Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Stripe webhook fails | Medium | High | Test thoroughly, monitor logs |
| iOS App Store rejects | Low | Medium | No IAP in v1, just web checkout |
| User confusion about trial | Medium | Medium | Clear messaging, email reminders |
| Founder pricing abuse | Low | Low | Tied to subscription, not transferable |
| Payment fraud | Low | Medium | Stripe Radar enabled |

---

## File Changes Summary

### New Files to Create

| File | Purpose |
|------|---------|
| `functions/stripe.js` | Stripe webhook handler |
| `src/pages/CheckoutSuccess.tsx` | Post-purchase confirmation |
| `src/pages/CheckoutCancel.tsx` | Checkout abandoned page |
| `src/components/SubscriptionGate.tsx` | Content access control |
| `src/pages/ManageSubscription.tsx` | View/cancel subscription |
| `src/pages/PassGuarantee.tsx` | Pass Guarantee terms |
| `scripts/transition-beta-users.js` | One-time migration script |

### Files to Modify

| File | Changes |
|------|---------|
| `src/services/subscription.ts` | Add per-exam logic, founder flag, trial dates |
| `src/components/pages/Pricing.tsx` | Complete redesign with real prices |
| `src/providers/AuthProvider.tsx` | Add subscription to context |
| `functions/index.js` | Add Stripe webhooks, trial expiration job |
| `src/components/pages/Practice.tsx` | Add subscription gate |
| `src/components/pages/Lessons.tsx` | Add subscription gate |
| `src/components/AITutor/*.tsx` | Add subscription gate |
| `src/components/pages/Settings.tsx` | Show subscription status |

---

## Timeline Summary

| Date | Milestone |
|------|-----------|
| **Feb 10** | Start development |
| **Feb 11** | Stripe integration |
| **Feb 12** | Subscription service updates |
| **Feb 13** | Content gating |
| **Feb 14** | Pricing page |
| **Feb 15** | Trial logic, emails |
| **Feb 16** | Polish, edge cases |
| **Feb 17** | Testing day 1 |
| **Feb 18** | Testing day 2 |
| **Feb 19** | 🚀 **LAUNCH** |
| **March 5** | First trial expirations |
| **May 31** | Founder window closes |

---

## Questions to Resolve Before Starting

1. **Stripe account:** Do you have one? Test mode ready?
2. **Email domain:** Is noreply@voraprep.com verified in Resend?
3. **Existing users count:** How many beta users to transition?
4. **Support channel:** Discord? Email only?
5. **Refund policy:** 7-day no questions? Or rely on pass guarantee?

---

*Last updated: February 10, 2026*

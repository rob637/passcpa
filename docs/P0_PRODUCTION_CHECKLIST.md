# P0 Production Checklist — Pre-Phase 2

**Date:** February 19, 2026  
**Status:** In Progress  
**Goal:** Complete all critical items before Phase 2 production deployment

---

## Summary

| Category | Items | Est. Hours | Priority |
|----------|-------|------------|----------|
| Email Infrastructure | 2 | 8h | 🔴 P0 |
| Content Quality (CISA) | 1 | 6h | 🔴 P0 |
| Community Deployment | 2 | 2h | 🔴 P0 |
| Growth Infrastructure | 2 | 1h | 🔴 P0 |
| Production Verification | 1 | 0.5h | 🔴 P0 |
| **Total** | **8 items** | **~17.5h** | |

---

## 1. Welcome Email Drip Sequence (5 Emails)

**Why:** This is the #1 conversion lever. Users who engage Day 1-7 are 3x more likely to convert.

**Current State:** Only a single welcome email exists (`sendWelcomeEmail` in functions/index.js)

**Target Sequence:**

| Email | Day | Subject | Content Focus |
|-------|-----|---------|---------------|
| 1. Welcome | 0 | Welcome to VoraPrep! 🎉 | ✅ EXISTS - Welcome, quick start guide |
| 2. First Practice | 1 | Ready for your first practice session? | CTA to practice, show question count, adaptive learning explanation |
| 3. Study Plan | 3 | Let's build your {exam} study plan 📅 | Study plan setup CTA, daily goal reminder, calendar sync hint |
| 4. AI Tutor | 5 | Meet Vory, your AI study companion 🤖 | AI Tutor feature spotlight, example interaction, usage tips |
| 5. Progress Check | 7 | Your first week with VoraPrep 📊 | Pull actual progress stats (questions answered, accuracy, predicted score) |

**Implementation:**

```javascript
// New Cloud Function: sendWelcomeDripEmails
// Schedule: every 4 hours (more responsive than daily)
// Logic:
//   - Day 1: Users created 24-28h ago → First Practice email
//   - Day 3: Users created 72-76h ago → Study Plan email
//   - Day 5: Users created 120-124h ago → AI Tutor email
//   - Day 7: Users created 168-172h ago → Progress Check email
```

**Files to Create/Modify:**
- [ ] `functions/index.js` - Add `sendWelcomeDripEmails` Cloud Function
- [ ] Add email templates for each drip stage
- [ ] Add tracking fields to `users` collection: `welcomeDrip_day1`, `welcomeDrip_day3`, etc.

**Est. Hours:** 4h

---

## 2. Trial Conversion Email Improvements

**Why:** Current Day 7/10/13 emails are basic. Adding progress stats and feature spotlights increases urgency and conversion.

**Current State:** Trial emails exist in `sendTrialReminderEmails` but lack:
- ❌ User's actual progress stats (questions answered, accuracy, predicted score)
- ❌ Feature usage stats (AI Tutor queries, flashcards reviewed)
- ❌ Social proof (how many users have converted)
- ❌ Specific A/B testable elements

**Improvements:**

| Email | Current | Enhanced |
|-------|---------|----------|
| Day 7 | Generic feature list | "You've answered 87 questions with 72% accuracy. Your predicted score is 71." |
| Day 10 | Generic urgency | "You're just 4 points away from passing! Keep going." + feature they haven't used |
| Day 13 | Strong urgency | Progress stats + countdown + founder pricing + what they'll lose |

**Implementation:**

```javascript
// In generateTrialReminderEmail():
// 1. Fetch user's questionHistory count
// 2. Calculate accuracy from questionHistory
// 3. Get predicted score from progress document
// 4. Check feature usage (AI Tutor, flashcards, TBS)
// 5. Inject stats into email template
```

**Files to Modify:**
- [ ] `functions/index.js` - Enhance `sendTrialReminderEmails` to fetch user stats
- [ ] Update `generateTrialReminderEmail()` to accept and display stats
- [ ] Add stat-pulling helper function

**Est. Hours:** 4h

---

## 3. CISA Question Quality Fix

**Why:** CISA is your weakest course (★★★☆☆). Missing references and absolute-language distractors hurt credibility.

**Current State:**
- **0 of 51** question files have `reference:` field
- **83** instances of "always/never" absolute language
- **1,501** total questions needing updates

**Fixes Required:**

### 3a. Add ISACA References

Every CISA question needs a reference to the ISACA Review Manual:

```typescript
// Before:
{
  id: 'cisa1-093',
  question: 'Audit evidence obtained directly...',
  explanation: 'Evidence obtained directly...',
  // No reference
}

// After:
{
  id: 'cisa1-093',
  question: 'Audit evidence obtained directly...',
  explanation: 'Evidence obtained directly...',
  reference: 'CISA Review Manual, 27th Ed., Chapter 1.4.2'  // ADD THIS
}
```

**Reference Format:** `CISA Review Manual, 27th Ed., Chapter X.X.X` or `ISACA IS Audit Standards, Standard 1XXX`

### 3b. Fix Absolute-Language Distractors

Find and replace patterns:

| Bad Distractor | Better Alternative |
|----------------|-------------------|
| "always required" | "typically required" |
| "never acceptable" | "generally not recommended" |
| "must always" | "should typically" |
| "should never" | "should generally avoid" |

**Implementation Approach:**

1. Create script `scripts/fix-cisa-references.ts`:
   - Map each question topic to ISACA Review Manual chapters
   - Add reference field programmatically
   
2. Create script `scripts/fix-cisa-distractors.ts`:
   - Find absolute language patterns
   - Replace with nuanced alternatives
   - Human review of edge cases

**Files to Create/Modify:**
- [ ] `scripts/fix-cisa-references.ts` - Auto-add references
- [ ] `scripts/fix-cisa-distractors.ts` - Fix absolute language
- [ ] All 51 files in `src/data/cisa/questions/`

**Est. Hours:** 6h (can be partially automated)

---

## 4. Deploy Discord Bot to Railway

**Why:** Bot is running in codespace — will die when codespace sleeps. Community growth stops.

**Current State:** 
- `railway.json` exists with Dockerfile config
- Bot code is in `scripts/discord_bots/`
- Bot token is in `.env`

**Steps:**
1. [ ] Create Railway project (or use existing)
2. [ ] Set environment variables (DISCORD_TOKEN, etc.)
3. [ ] `railway up` to deploy
4. [ ] Verify bot is online in Discord server
5. [ ] Test slash commands work

**Commands:**
```bash
cd /workspaces/passcpa
railway login
railway link
railway up
railway logs  # Verify running
```

**Est. Hours:** 1h

---

## 5. Deploy Reddit/HN/SE Monitor to Railway

**Why:** Same issue — monitor needs 24/7 uptime to catch opportunities.

**Current State:**
- Monitor code in `scripts/reddit_monitor/`
- Runs hourly via cron/loop
- Sends email alerts via Resend

**Steps:**
1. [ ] Package monitor for Railway (may need separate service)
2. [ ] Set environment variables (RESEND_API_KEY, GEMINI_API_KEY)
3. [ ] Deploy
4. [ ] Verify hourly scans are running
5. [ ] Test email alerts arrive

**Est. Hours:** 1h

---

## 6. Link GA4 ↔ Google Ads

**Why:** Required for Google Ads bid optimization. Without this, Smart Bidding can't optimize for conversions.

**Current State:** 
- GA4 has conversion events (signup, trial_start, purchase)
- Google Ads campaigns are running
- **Not linked** — Google Ads can't see conversions

**Steps:**
1. [ ] Go to Google Ads → Tools & Settings → Linked Accounts
2. [ ] Find Google Analytics (GA4) → Click "Link"
3. [ ] Select VoraPrep GA4 property
4. [ ] Enable "Import site metrics"
5. [ ] Go to Conversions → Import from GA4
6. [ ] Import: `trial_start`, `purchase` as primary conversions

**Est. Hours:** 0.5h

---

## 7. Verify Stripe Live Mode

**Why:** Can't accept real payments with test keys.

**Verification Checklist:**
- [ ] `.env.production` has `VITE_STRIPE_PUBLISHABLE_KEY` starting with `pk_live_`
- [ ] Firebase Functions secret `STRIPE_SECRET_KEY` is live key (`sk_live_`)
- [ ] Firebase Functions secret `STRIPE_WEBHOOK_SECRET` is production webhook
- [ ] Test payment flow end-to-end with real card (use $1 if possible)

**Commands:**
```bash
# Check production env
grep "STRIPE" .env.production

# Check Firebase secrets (requires firebase login)
firebase functions:secrets:access STRIPE_SECRET_KEY --project voraprep-production
```

**Est. Hours:** 0.5h

---

## 8. IAM Re-Apply After Deploy (Document/Automate)

**Why:** Cloud Run functions lose public access after deploy. Users get 403 errors.

**Current State:** Manual process every deploy

**Options:**

### Option A: Add to deploy script
```bash
# In deploy:prod script:
gcloud run services add-iam-policy-binding createcheckoutsession \
  --region=us-central1 \
  --member="allUsers" \
  --role="roles/run.invoker" \
  --project=voraprep-production

# Repeat for all public functions
```

### Option B: Set in firebase.json
```json
{
  "functions": {
    "createCheckoutSession": {
      "invoker": "public"
    }
  }
}
```

**Steps:**
- [ ] Document all functions needing public access
- [ ] Add to `npm run deploy:prod` script
- [ ] Or add to `firebase.json` if supported

**Est. Hours:** 1h (one-time setup)

---

## Execution Order

Recommended sequence for least risk:

| Order | Task | Blocking? | Notes |
|-------|------|-----------|-------|
| 1 | Verify Stripe live mode | Yes | Can't launch without this |
| 2 | Link GA4 ↔ Google Ads | No | But needed ASAP for optimization |
| 3 | Deploy Discord bot | No | Community growth at risk |
| 4 | Deploy Reddit monitor | No | Opportunity detection at risk |
| 5 | Welcome email drip | No | #1 conversion lever — high impact |
| 6 | Trial email improvements | No | Builds on #5 |
| 7 | CISA quality fix | No | Content quality — can do in parallel |
| 8 | IAM automation | No | Prevents future deploy issues |

---

## Testing Plan

Before pushing to production:

1. **Email Tests:**
   - [ ] Send test welcome drip emails to yourself
   - [ ] Verify links work, formatting correct
   - [ ] Check mobile rendering

2. **CISA Tests:**
   - [ ] Run `npx tsc --noEmit` — no compile errors
   - [ ] Run `npm run lint` — no lint errors
   - [ ] Spot-check 10 random questions for reference accuracy

3. **Bot Tests:**
   - [ ] Verify bot responds to `/quiz` command
   - [ ] Verify daily auto-quiz posts
   - [ ] Check all 6 exam channels work

4. **Payment Tests:**
   - [ ] Complete checkout flow with real card
   - [ ] Verify subscription appears in Firestore
   - [ ] Verify webhook fires correctly

---

## Definition of Done

All items marked complete when:

- [ ] All 8 tasks completed
- [ ] All tests pass
- [ ] Changes pushed to `develop` branch
- [ ] CI pipeline green
- [ ] Changes deployed to staging
- [ ] Staging verified working
- [ ] Changes deployed to production
- [ ] Production verified working

---

*Created: February 19, 2026*
*Target Completion: Before Phase 2 launch*

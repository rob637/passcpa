# VoraPrep Daily CPA — Full Product & Technical Specification

> Daily MCQ practice via SMS for one CPA section. Low-cost add-on to drive full VoraPrep upgrades.

---

## 1. Product Summary

| Field | Value |
|-------|-------|
| **Product** | VoraPrep Daily CPA |
| **Format** | Daily MCQs via SMS |
| **Scope** | One CPA section per subscription |
| **Sections** | AUD, FAR, REG, BAR, ISC, TCP |
| **Trial** | 3 days, up to 5 questions/day |
| **Starter** | $4.99/month, up to 10 questions/day |
| **Core** | $9.99/month, up to 25 questions/day |
| **Pro** | $14.99/month, up to 50 questions/day |
| **Content source** | ~8,990 CPA MCQs (1,400–1,600 per section) |
| **Delivery** | Sequential: answer one → feedback → next |

---

## 2. Sections Available

| Section | Questions Available | Blueprint Areas |
|---------|-------------------|-----------------|
| FAR | ~1,497 | FAR-I through FAR-V |
| AUD | ~1,461 | AUD-I through AUD-IV |
| REG | ~1,460 | REG-I through REG-IV |
| BAR | ~1,610 | BAR-I through BAR-IV |
| ISC | ~1,482 | ISC-I through ISC-IV |
| TCP | ~1,480 | TCP-I through TCP-IV |

---

## 3. Daily Session State Machine

### States

```
IDLE → ACTIVE → WAITING_ANSWER → FEEDBACK_SENT → [ACTIVE or COMPLETED or PAUSED]
```

| State | Description |
|-------|-------------|
| `IDLE` | No session today. Waiting for scheduled send time. |
| `ACTIVE` | Session started. Ready to send next question. |
| `WAITING_ANSWER` | Question sent. Awaiting user reply (A/B/C/D). |
| `FEEDBACK_SENT` | Explanation sent. Short pause before next question. |
| `COMPLETED` | Daily cap reached or user sent DONE. |
| `PAUSED` | User stopped mid-session. Can resume same day. |

### Transitions

1. **IDLE → ACTIVE**: Scheduler fires at user's chosen morning time.
2. **ACTIVE → WAITING_ANSWER**: Q1 (or next Q) sent to user.
3. **WAITING_ANSWER → FEEDBACK_SENT**: User replies A/B/C/D. System sends result + explanation.
4. **FEEDBACK_SENT → ACTIVE**: 10-second delay, then system is ready for next Q.
5. **ACTIVE → WAITING_ANSWER**: Next question sent automatically.
6. **ACTIVE → COMPLETED**: Daily cap reached. Send daily summary.
7. **WAITING_ANSWER → PAUSED**: No response for 2 hours. Send pause message.
8. **PAUSED → ACTIVE**: User texts RESUME or any A/B/C/D answer.
9. **Any → IDLE**: Midnight rollover (user's timezone). Reset daily count.

### Key Rules

- Only ONE question outstanding at a time.
- System waits for answer before sending next question.
- User can text DONE at any time to end the day's session early.
- User can text RESUME to continue a paused session.
- Daily cap is hard: no questions after cap is reached, even if resumed.
- Quiet hours: no sends between 9 PM and 7 AM user local time.
- If session reaches quiet hours mid-flow, pause automatically and resume next morning.

---

## 4. Timing & Nudge Logic

| Event | Timing | Action |
|-------|--------|--------|
| **Morning kickoff** | User-selected time (default 7:00 AM local) | Send Q1 |
| **Inter-question gap** | 10 seconds after feedback | Send next Q |
| **No-response nudge** | 90 minutes after question sent | "Still there? Reply A/B/C/D or DONE to wrap up." |
| **Auto-pause** | 2 hours after question sent, no response | "No worries — text RESUME anytime today to continue." |
| **Quiet hours start** | 9:00 PM local | Pause session, resume next morning |
| **Quiet hours end** | 7:00 AM local | Resume if paused, or start new day |
| **Daily reset** | Midnight local | Reset question count, clear session state |

---

## 5. SMS Message Templates

### 5.1 Morning Kickoff (Q1)

**Trial user:**
```
VoraPrep Daily CPA — FAR
Day 1 of 3 free trial

Q1/5
Topic: Revenue Recognition

XYZ Corp delivers goods on Dec 28 but the customer doesn't pay until Jan 15. Under accrual accounting, when should XYZ recognize revenue?

A) January 15
B) December 28
C) December 31
D) January 1

Reply A, B, C, or D
```

**Paid user:**
```
VoraPrep Daily CPA — AUD ☀️
Q1/25 · Day 14 · 🔥 8-day streak

Topic: Audit Evidence

Which of the following provides the MOST reliable audit evidence?

A) Oral representation from management
B) Internally generated sales report
C) Bank confirmation received directly by the auditor
D) Vendor invoice provided by the client

Reply A, B, C, or D
```

### 5.2 Correct Answer

```
✅ Correct! Answer: C

Bank confirmations sent directly to the auditor are the most reliable because they come from an independent external source with no client involvement.

💡 Exam tip: External + direct to auditor = highest reliability. Internal documents are least reliable.

Q2/25 incoming...
```

### 5.3 Incorrect Answer

```
❌ Not quite. Correct: C

You picked: A
Oral representations are the LEAST reliable form of evidence.

Bank confirmations sent directly to the auditor are most reliable — external source, no client handling.

⚠️ Watch for: Questions testing the evidence reliability hierarchy. Remember: External > Internal, Direct > Indirect.

Q2/25 incoming...
```

### 5.4 Daily Summary (End of Session)

```
📊 Daily CPA — FAR Summary

Today: 8/10 correct (80%)
Streak: 🔥 9 days
Strong: Leases, Revenue Recognition
Review: Bonds, Consolidations

See you tomorrow at 7:00 AM!
```

### 5.5 Trial Day 3 — Conversion CTA

```
📊 Trial Complete — FAR

3-day results: 11/15 correct (73%)
Streak: 🔥 3 days
Strong: Revenue Recognition, Leases
Review: Consolidations

Your trial ends today. Keep your streak and progress:

Starter (10/day): $4.99/mo
Core (25/day): $9.99/mo
Pro (50/day): $14.99/mo

Upgrade: https://daily.voraprep.com/upgrade

Reply STOP to unsubscribe.
```

### 5.6 Nudge (No Response)

```
Still there? Your CPA question is waiting 📱

Reply A, B, C, or D
Or text DONE to wrap up for today.
```

### 5.7 Pause Message

```
No worries! Your session is paused.

Today's progress: 4/10 questions answered

Text RESUME anytime today to continue, or we'll pick up fresh tomorrow at 7:00 AM.
```

### 5.8 Resume Confirmation

```
Welcome back! Let's continue your FAR practice.

Today's progress so far: 4/10 · 3/4 correct

Q5/10 coming now...
```

### 5.9 System Messages

**STOP received:**
```
You've been unsubscribed from VoraPrep Daily CPA texts. You won't receive any more messages.

To resubscribe, visit https://daily.voraprep.com

Your account and progress are saved.
```

**HELP received:**
```
VoraPrep Daily CPA
- Reply A/B/C/D to answer
- RESUME to continue a paused session
- DONE to end today's session
- STOP to unsubscribe

Questions? support@voraprep.com
```

**Invalid reply:**
```
Reply with A, B, C, or D to answer.

Or text DONE to wrap up, RESUME to continue, HELP for options.
```

---

## 6. Question Selection Engine

### Algorithm

1. **Filter** to enrolled section only (e.g., FAR questions only).
2. **Exclude** questions answered correctly in the last 14 days.
3. **Prioritize** by:
   - a) Spaced repetition: questions missed 1, 3, or 7 days ago (highest priority).
   - b) Weak blueprint areas: areas where accuracy < 60%.
   - c) Unseen questions: never attempted.
   - d) Stale correct: answered correctly > 14 days ago.
4. **Difficulty mix** (adjusts based on trailing 7-day accuracy):
   - Accuracy < 50%: 40% easy, 40% medium, 20% hard.
   - Accuracy 50–75%: 25% easy, 50% medium, 25% hard.
   - Accuracy > 75%: 15% easy, 40% medium, 45% hard.
5. **Never repeat** the same question within a 7-day window.
6. **Blueprint coverage**: rotate through all blueprint areas over a 7-day cycle.

### Daily Selection Process

Each morning before the session starts:
1. Pre-select the day's question pool (cap × 1.5 candidates).
2. Order by priority score (spaced rep > weak area > unseen > stale).
3. Apply difficulty mix as a soft constraint.
4. Store selected pool in Firestore for the day.
5. Serve sequentially from the pool as user answers.

---

## 7. Trial-to-Paid Conversion Flow

### Timeline

| Time | Event |
|------|-------|
| T+0 | User signs up. Selects section, tier preference, enters phone + payment method. |
| T+0 | Payment method stored via Stripe Setup Intent (no charge yet). |
| T+0 | Trial begins. First question sent immediately (or at next eligible morning). |
| T+24h | Day 2 of trial. |
| T+48h | Day 3 of trial. End-of-day: send conversion CTA. |
| T+72h | Trial ends. Stripe charges payment method. Subscription begins. |
| T+72h | If no payment method: send "Add payment to continue" message. |
| T+72h + 24h | If still no payment: send final reminder. |
| T+72h + 48h | If still no payment: account paused. No more questions sent. |

### Key Rules

1. **Collect payment method at signup** (Stripe Setup Intent, no charge during trial).
2. Trial starts immediately after phone verification.
3. Trial = 3 calendar days, not 72 rolling hours.
4. During trial: daily cap is 5, regardless of selected tier.
5. At trial end: auto-convert to paid at selected tier if payment method exists.
6. If payment fails: 48-hour grace period with reminders, then pause.
7. User can upgrade/downgrade tier at any time after trial.

---

## 8. Stripe Products & Prices

### Products to Create

| Product | Stripe Product Name |
|---------|-------------------|
| Daily CPA — Starter | `daily_cpa_starter` |
| Daily CPA — Core | `daily_cpa_core` |
| Daily CPA — Pro | `daily_cpa_pro` |

### Prices to Create

| Plan | Lookup Key | Amount | Interval |
|------|-----------|--------|----------|
| Starter Monthly | `daily_cpa_starter_monthly` | $4.99 | month |
| Core Monthly | `daily_cpa_core_monthly` | $9.99 | month |
| Pro Monthly | `daily_cpa_pro_monthly` | $14.99 | month |

### Subscription Metadata

```json
{
  "product": "daily_cpa",
  "section": "FAR",
  "tier": "core",
  "dailyCap": 25,
  "firebaseUserId": "abc123"
}
```

---

## 9. Firestore Schema (Standalone Project)

### Collection: `daily_users/{uid}`

```typescript
{
  // Identity
  uid: string;                    // Firebase Auth UID
  phone: string;                  // E.164 format: +15551234567
  email?: string;                 // Optional, for account recovery
  timezone: string;               // IANA: 'America/New_York'
  sendTime: string;               // HH:MM in local time: '07:00'
  createdAt: Timestamp;

  // Consent
  smsOptIn: boolean;
  smsOptInAt: Timestamp;
  smsOptInIp?: string;

  // Enrollment
  section: string;                // 'FAR' | 'AUD' | 'REG' | 'BAR' | 'ISC' | 'TCP'

  // Subscription
  status: string;                 // 'trialing' | 'active' | 'paused' | 'canceled'
  tier: string;                   // 'starter' | 'core' | 'pro'
  dailyCap: number;               // 5 (trial), 10, 25, or 50
  trialStart: Timestamp;
  trialEnd: Timestamp;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;

  // Preferences
  upgradeSource?: string;         // UTM source for full VoraPrep upgrade tracking
}
```

### Collection: `daily_sessions/{uid}_{YYYY-MM-DD}`

```typescript
{
  uid: string;
  date: string;                   // '2026-04-07'
  section: string;
  state: string;                  // 'idle' | 'active' | 'waiting_answer' | 'paused' | 'completed'
  dailyCap: number;
  questionsAnswered: number;
  questionsCorrect: number;
  currentQuestionId?: string;     // Active question waiting for answer
  currentQuestionNum: number;     // 1-indexed position in daily sequence
  currentQuestionSentAt?: Timestamp;
  questionPool: string[];         // Pre-selected question IDs for the day
  answeredQuestions: string[];    // Question IDs already answered today
  startedAt?: Timestamp;
  completedAt?: Timestamp;
  pausedAt?: Timestamp;
  resumedAt?: Timestamp;
}
```

### Collection: `daily_attempts/{attemptId}`

```typescript
{
  uid: string;
  questionId: string;
  section: string;
  blueprintArea: string;
  topic: string;
  difficulty: string;
  userAnswer: number;             // 0-indexed
  correctAnswer: number;          // 0-indexed
  isCorrect: boolean;
  responseTimeSec?: number;       // Seconds between send and reply
  attemptedAt: Timestamp;
  sessionDate: string;            // '2026-04-07'
}
```

### Collection: `daily_streaks/{uid}`

```typescript
{
  uid: string;
  currentStreak: number;
  longestStreak: number;
  lastAnsweredDate: string;       // 'YYYY-MM-DD'
  totalQuestionsAnswered: number;
  totalCorrect: number;
  weeklyAccuracy: number;         // Rolling 7-day accuracy %
  sectionAccuracy: Record<string, number>; // Per-blueprint-area accuracy
}
```

### Collection: `daily_sms_log/{messageId}`

```typescript
{
  uid: string;
  direction: string;              // 'outbound' | 'inbound'
  twilioMessageSid: string;
  body: string;                   // Message content (truncated for storage)
  status: string;                 // 'sent' | 'delivered' | 'failed' | 'received'
  sentAt: Timestamp;
  deliveredAt?: Timestamp;
  errorCode?: string;
  errorMessage?: string;
}
```

### Collection: `daily_questions/{section}`

```typescript
{
  // Pre-loaded from content/cpa/{section}/questions.json
  // One document per section, containing array of SMS-formatted questions
  section: string;
  questions: Array<{
    id: string;
    blueprintArea: string;
    topic: string;
    difficulty: string;
    question: string;              // Truncated for SMS (max 300 chars)
    options: string[];             // 4 options
    correctAnswer: number;
    explanation: string;           // Short explanation (max 200 chars)
    examTip?: string;              // Optional exam tip (max 100 chars)
    whyWrong?: Record<string, string>; // Per-option wrong explanations
  }>;
  loadedAt: Timestamp;
  questionCount: number;
}
```

---

## 10. Cloud Functions

### Scheduled Functions

| Function | Schedule | Purpose |
|----------|----------|---------|
| `dailyCpa_morningKickoff` | Every 15 min | Send Q1 to users whose send time falls in this window |
| `dailyCpa_nudgeCheck` | Every 30 min | Send nudge to users waiting > 90 min for answer |
| `dailyCpa_pauseCheck` | Every 30 min | Auto-pause users waiting > 2 hours |
| `dailyCpa_trialExpiration` | Daily 3 AM ET | Check and convert/pause expired trials |
| `dailyCpa_weeklyRecap` | Sunday 9 AM ET | Send weekly summary to paid users |
| `dailyCpa_dailyReset` | Hourly | Reset sessions for users past midnight in their timezone |

### Webhook Handlers

| Function | Type | Purpose |
|----------|------|---------|
| `dailyCpa_smsInbound` | onRequest (POST) | Twilio webhook for incoming SMS |
| `dailyCpa_stripeWebhook` | onRequest (POST) | Stripe events for Daily CPA subscriptions |
| `dailyCpa_smsStatus` | onRequest (POST) | Twilio delivery status callbacks |

### Callable Functions

| Function | Purpose |
|----------|---------|
| `dailyCpa_signup` | Register new user, create trial, validate phone |
| `dailyCpa_selectTier` | Choose/change subscription tier |
| `dailyCpa_createCheckout` | Create Stripe Checkout session |

---

## 11. Twilio Integration

### Outbound SMS

```javascript
const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

async function sendSMS(to, body) {
  return twilio.messages.create({
    to: to,           // E.164: +15551234567
    from: TWILIO_PHONE_NUMBER,
    body: body,
    statusCallback: TWILIO_STATUS_CALLBACK_URL,
  });
}
```

### Inbound SMS Webhook (POST /dailyCpa_smsInbound)

```
Parse Twilio POST body:
- From: user phone number
- Body: user's reply text
- MessageSid: Twilio message ID

Lookup user by phone number.
Normalize reply: trim, uppercase.
Route:
  'A' | 'B' | 'C' | 'D' → processAnswer()
  'STOP'                 → handleStop()
  'HELP'                 → handleHelp()
  'RESUME'               → handleResume()
  'DONE'                 → handleDone()
  else                   → sendInvalidReply()

Return TwiML <Response/> (empty, responses sent via API not TwiML).
```

### Secrets Required

```bash
firebase functions:secrets:set TWILIO_ACCOUNT_SID
firebase functions:secrets:set TWILIO_AUTH_TOKEN
firebase functions:secrets:set TWILIO_PHONE_NUMBER
```

---

## 12. Upgrade Funnel to Full VoraPrep

### Trigger Conditions

| Trigger | When | CTA Message |
|---------|------|-------------|
| 7-day streak | After day 7 summary | "You're building real momentum. Unlock full practice sets + study plans in VoraPrep." |
| Consistent accuracy > 70% | After weekly recap | "Your accuracy is strong. Add mock exams and analytics to sharpen further." |
| Daily cap reached regularly | 3+ days hitting cap | "You're maxing out daily questions. The full VoraPrep question bank has 1,400+ for FAR alone." |
| Specific request | User texts MORE or UPGRADE | Direct link to VoraPrep with section pre-selected. |

### Upgrade Link

```
https://voraprep.com/cpa?section=FAR&utm_source=daily_cpa&utm_medium=sms&utm_campaign=upgrade&uid={uid}
```

---

## 13. Compliance Checklist

- [ ] TCPA compliance: explicit opt-in with clear frequency and content disclosure
- [ ] Opt-in language: "By signing up, you agree to receive up to 50 SMS messages per day from VoraPrep. Msg & data rates may apply. Reply STOP to cancel, HELP for help."
- [ ] STOP keyword: immediately stops all messages, confirms unsubscribe
- [ ] HELP keyword: returns support info
- [ ] Quiet hours: no sends 9 PM – 7 AM user local time
- [ ] Message logging: all sent/received messages logged with timestamps
- [ ] Consent records: opt-in timestamp, IP, and method stored
- [ ] Privacy policy: updated to cover SMS data handling
- [ ] Terms of service: updated to cover SMS subscription
- [ ] 10DLC registration: register with carriers for A2P messaging (required for US SMS)

---

## 14. Infrastructure (DEV Environment)

| Component | Configuration |
|-----------|--------------|
| **Firebase Project** | `passcpa-dev` (reuse existing dev project) |
| **Firestore** | New collections prefixed `daily_` in same database |
| **Cloud Functions** | New functions prefixed `dailyCpa_` in same deployment |
| **Twilio** | Test credentials + test phone number |
| **Stripe** | Test mode, new products with `daily_cpa_` prefix |
| **Landing Page** | Route in existing app: `/daily-cpa` |

### Decision: Same Firebase Project for DEV

For DEV, we deploy into the existing `passcpa-dev` project to move fast.
All collections and functions are prefixed to avoid collision.
For production, evaluate whether to use a separate project.

---

## 15. Build Order (4 Weeks)

### Week 1: Foundation
1. Set up Twilio account + dev phone number
2. Create Stripe products/prices (test mode)
3. Build `dailyCpa_signup` callable function
4. Build `dailyCpa_smsInbound` webhook
5. Build `sendSMS()` utility
6. Build basic question loading from `content/cpa/`
7. Firestore security rules for `daily_*` collections

### Week 2: Core Loop
1. Build question selection engine
2. Build `dailyCpa_morningKickoff` scheduler
3. Build answer processing + feedback generation
4. Build session state machine (ACTIVE → WAITING → FEEDBACK → next)
5. Build `dailyCpa_nudgeCheck` and `dailyCpa_pauseCheck`
6. Build streak tracking
7. SMS templates for all message types

### Week 3: Billing + Polish
1. Build `dailyCpa_createCheckout` with Setup Intent for trial
2. Build `dailyCpa_stripeWebhook` handler
3. Build `dailyCpa_trialExpiration` scheduler
4. Build tier enforcement (cap by plan)
5. Build `dailyCpa_weeklyRecap` scheduler
6. Build `dailyCpa_dailyReset` scheduler
7. Landing page + signup flow

### Week 4: Launch Prep
1. Upgrade funnel CTA messages
2. Admin tooling (pause user, replay failed sends, usage dashboard)
3. Monitoring + alerting (send failure rate, webhook errors)
4. Internal testing with team phone numbers
5. Soft launch to 20 users
6. A/B test: send time, explanation length, CTA style

---

## 16. Success Metrics (First 60 Days)

| Metric | Target |
|--------|--------|
| Trial activation (signup → first answer) | ≥ 35% |
| Day-7 responder retention | ≥ 40% |
| Trial-to-paid conversion | ≥ 10% |
| Monthly churn | ≤ 12% |
| Average daily questions (paid users) | 6–15 |
| Full VoraPrep upgrade rate | ≥ 8% |
| SMS delivery success rate | ≥ 98% |
| Gross margin per user | Positive |

---

## 17. Non-Goals (MVP)

- Multi-exam support (EA, CMA, etc.) — CPA only.
- TBS or simulation questions — MCQ only.
- AI tutor in SMS — too expensive, too complex for SMS.
- Full app feature parity.
- Deep integration with existing VoraPrep UI (loose coupling only).
- Annual pricing for Daily CPA (only monthly for now).
- Multi-section bundles.

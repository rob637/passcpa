# VoraPrep — Six-Month Strategic Roadmap

**Period:** February 19 – August 31, 2026
**Last Updated:** February 20, 2026
**Author:** Engineering & Strategy

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Current State Assessment](#2-current-state-assessment)
3. [Revenue & Growth Targets](#3-revenue--growth-targets)
4. [Launch Week: Feb 19–28](#4-launch-week-feb-19-28)
5. [Month 1: March 2026 — Foundation & Fix](#5-month-1-march-2026--foundation--fix)
6. [Month 2: April 2026 — Content & Conversion](#6-month-2-april-2026--content--conversion)
7. [Month 3: May 2026 — Scale & Optimize](#7-month-3-may-2026--scale--optimize)
8. [Month 4: June 2026 — Mobile & Expansion](#8-month-4-june-2026--mobile--expansion)
9. [Month 5: July 2026 — Differentiation & Retention](#9-month-5-july-2026--differentiation--retention)
10. [Month 6: August 2026 — Growth Engine & Maturity](#10-month-6-august-2026--growth-engine--maturity)
11. [Cross-Cutting Tracks](#11-cross-cutting-tracks)
12. [Exam-by-Exam Action Plans](#12-exam-by-exam-action-plans)
13. [Technical Debt & Infrastructure](#13-technical-debt--infrastructure)
14. [Risk Register](#14-risk-register)
15. [Success Metrics Dashboard](#15-success-metrics-dashboard)
16. [Appendix: Content Inventory](#16-appendix-content-inventory)

---

## 1. Executive Summary

VoraPrep launches on **February 19, 2026** as an AI-powered exam prep platform covering 6 professional certifications: CPA, EA, CMA, CIA, CISA, and CFP. The platform has **21,509 content items** (16,366 questions, 3,066 flashcards, 1,121 lessons, 956 TBS), a fully deployed SEM engine with live Google Ads campaigns, and an automated SEO blog that publishes 3–4 articles/week via Gemini 2.0 Flash.

**This roadmap covers the first 6 months post-launch** — from validating product-market fit to scaling paid acquisition and building a defensible moat through AI-powered features no competitor offers.

### Key Strategic Priorities

| Priority | Why It Matters | Timeline |
|----------|---------------|----------|
| **Fix CPA feature parity** | Flagship product missing study plan + cram mode | Week 1–2 |
| **Optimize SEM spend** | $20 CPA budget, $10 EA — need ROI validation | Weeks 2–6 |
| **Convert founder seats** | 300 seats/exam at 40%+ discount, deadline Apr 30 | Feb–Apr |
| **Scale content quality** | CISA questions rated ★★★☆☆, need references | Mar–Apr |
| **Mobile app store launch** | PWA + Capacitor ready, need store submissions | Apr–May |
| **Build community moat** | Current community = leaderboard only | Jun–Aug |

### 6-Month Financial Targets

| Metric | Month 1 | Month 3 | Month 6 |
|--------|---------|---------|---------|
| Registered users | 200 | 1,000 | 3,000 |
| Paid subscribers | 25 | 150 | 500 |
| Monthly recurring revenue | $750 | $5,000 | $17,500 |
| Trial → paid conversion | 8% | 15% | 20% |
| Monthly churn | — | <8% | <5% |

---

## 2. Current State Assessment

### 2.1 Platform Capabilities

| Feature | Status | Notes |
|---------|--------|-------|
| **Authentication** | ✅ Live | Firebase Auth (email, Google, Apple) |
| **6 Exam Courses** | ✅ Live | CPA, EA, CMA, CIA, CISA, CFP all configured |
| **Adaptive Practice** | ✅ Live | Per-exam adaptive engines (6 engines) |
| **Score Prediction** | ✅ Live | All 6 exams have blueprint-weighted score predictors |
| **Exam Simulator** | ✅ Live | Per-exam simulators with timer + review |
| **Flashcards + SR** | ✅ Live | SM-2 spaced repetition, 3,066 cards |
| **AI Tutor** | ✅ Live | Gemini 2.0 Flash, multi-course context |
| **Gamification** | ✅ Live | 14 achievements, XP/levels, streaks |
| **Analytics** | ✅ Live | GA4 with 20+ custom events |
| **Stripe Payments** | ✅ Live | Per-exam pricing, founder tiers, trial |
| **PWA** | ✅ Live | Offline caching, prompt updates, install |
| **Push Notifications** | ⚠️ Partial | FCM configured, VAPID key set, `sendDailyReminders` function deployed. Requires user opt-in via Settings. |
| **Study Plan Setup** | ✅ Live | All 6 exams have study plan setup |
| **Cram Mode** | ✅ Live | All 6 exams have cram mode |
| **Community** | ✅ Live | Discord server (VoraPrep Study Group) with quiz bot serving all 6 exams, invite link in-app |
| **Video Content** | ⚠️ In Progress | 84 CISA scripts, EA batch 1 started |
| **Mobile App Store** | ❌ Not submitted | Capacitor scaffolded, needs store listing |
| **Referral Program** | ❌ UI only | Achievement badges exist, no actual referral flow |

### 2.2 Content Inventory

| Course | Questions | Flashcards | Lessons | TBS | Total | Quality |
|--------|-----------|------------|---------|-----|-------|---------|
| **CPA** | 4,789 | 1,110 | 375 | 467 | 6,741 | ★★★★☆ |
| **EA** | 4,210 | 665 | 90 | 254 | 5,219 | ★★★★★ |
| **CMA** | 2,834 | 505 | 89 | 130 | 3,558 | ★★★★☆ |
| **CIA** | 2,196 | 361 | 88 | 75 | 2,720 | ★★★★☆ |
| **CISA** | 1,501 | 335 | 91 | 30 | 1,957 | ★★★☆☆ |
| **CFP** | 850 | 255 | 393 | 0 | 1,498 | ★★★☆☆ |
| **Total** | **16,366** | **3,066** | **1,121** | **956** | **21,509** | |

### 2.3 Growth Infrastructure

| Channel | Status | Details |
|---------|--------|---------|
| **Google Ads (SEM)** | ⚠️ Partial | 2 campaigns (CPA + EA), 23 ad groups, ~120 keywords — **missing conversion tracking** |
| **Google Ads Conversions** | ❌ Not configured | No `AW-` conversion ID in analytics.ts — required for bid optimization |
| **SEO — Technical** | ✅ Live | 27-URL sitemap, structured data, canonical URLs, Search Console connected |
| **SEO — Blog Engine** | ✅ Live | 123 briefs seeded, auto-publishes 3–4/week via Gemini, email alerts |
| **SEO — Pre-rendering** | ✅ Ready | Puppeteer script created, not yet in CI/CD pipeline |
| **YouTube Channel** | ❌ Not created | Branded channel needed for CISA/EA videos + SEO (2nd largest search engine) |
| **Email Marketing** | ⚠️ Partial | Transactional emails (Resend), no drip campaigns |
| **Reddit/HN/SE Monitoring** | ✅ Live | Automated opportunity finder: RSS feeds (10 subreddits, Stack Exchange), HN Algolia API. Hourly scans, Gemini-generated responses, email alerts via Resend |
| **Discord Quiz Bot** | ✅ Live | Multi-exam bot in VoraPrep Study Group server. Slash commands (/quiz, /daily, /leaderboard, /stats). Auto-posts daily questions at 2 PM UTC. Invite link: https://discord.gg/XBjzDrws |
| **Discord In-App Integration** | ✅ Live | Invite link in Settings, landing page footer, desktop sidebar |
| **Social Media** | ❌ None | No LinkedIn, Twitter/X accounts or content strategy |
| **Backlink Building** | ❌ None | No outreach or partnerships |
| **Content Marketing** | ⚠️ Auto only | AI blog posts, no manual long-form content |

### 2.4 Admin Capabilities

| Feature | Status | Location |
|---------|--------|----------|
| **Content CMS** | ✅ Full | AdminCMS.tsx (4,897 lines) — question stats, per-course data |
| **Question Editor** | ✅ Full | QuestionEditor.tsx — CRUD with validation |
| **Lesson Editor** | ✅ Full | LessonEditor.tsx |
| **TBS Editor** | ✅ Full | TBSEditor.tsx |
| **WC Editor** | ✅ Full | WCEditor.tsx |
| **Growth Dashboard** | ✅ Full | GrowthDashboard.tsx — SEO/SEM command center |
| **User Management** | ⚠️ Partial | AdminCMS Users tab — view users, subscriptions, daily activity, diagnostics |
| **Revenue Dashboard** | ✅ Full | AdminCMS Analytics tab — MRR, ARR, ARPU, churn risk, per-course breakdown |
| **Content Analytics** | ❌ None | No question difficulty/discrimination analysis |
| **Support Tickets** | ❌ None | No in-app support system |

### 2.5 Testing

| Type | Count | Coverage |
|------|-------|----------|
| Unit Tests (Vitest) | 145 | Lines: 14%, Functions: 9%, Branches: 7%, Statements: 12% |
| E2E Tests (Playwright) | 17 | Critical flows, auth, practice, accessibility |
| **Target Thresholds** | — | Lines: 40%, Functions: 35%, Branches: 30%, Statements: 40% |
| **Gap** | — | Need ~3× more unit tests, 2× more e2e tests |

---

## 3. Revenue & Growth Targets

### 3.1 Pricing Structure

| Exam | Monthly (Founder) | Monthly (Regular) | Annual (Founder) | Annual (Regular) |
|------|-------------------|-------------------|-------------------|-------------------|
| CPA | $29/mo | $59/mo | $229/yr | $449/yr |
| EA | $19/mo | $35/mo | $149/yr | $249/yr |
| CMA | $25/mo | $49/mo | $199/yr | $379/yr |
| CIA | $19/mo | $35/mo | $149/yr | $249/yr |
| CISA | $25/mo | $49/mo | $199/yr | $379/yr |
| CFP | $25/mo | $49/mo | $199/yr | $379/yr |

- **Free trial:** 14 days, full access (unlimited questions, AI tutor, TBS, analytics)
- **Founder pricing:** 300 seats/exam, locked for 2 years, deadline **April 30, 2026**
- **Post-trial limits:** 20% content, AI Tutor blocked, TBS/Exam Sim blocked

### 3.2 Unit Economics Target

| Metric | Target | Calculation |
|--------|--------|-------------|
| Blended ARPU | $35/mo | Weighted across exams |
| CAC (SEM) | $40–60 | Google Ads CPA after optimization |
| CAC (SEO) | $5–10 | Organic traffic, long-term |
| LTV | $210 | 6-month avg retention × $35 ARPU |
| LTV:CAC (blended) | 5:1+ | After SEO traffic ramps |
| Trial → Paid | 15–20% | Industry benchmark: 10–15% |
| Monthly Churn | <5% | Exam-prep natural endpoint considered |

### 3.3 Revenue Milestones

| Milestone | Target Date | Revenue | Subscribers |
|-----------|------------|---------|-------------|
| First paying customer | Feb 2026 | $29 | 1 |
| $1K MRR | Mar 2026 | $1,000 | ~30 |
| $5K MRR | May 2026 | $5,000 | ~140 |
| $10K MRR | Jul 2026 | $10,000 | ~285 |
| $20K MRR | Aug 2026 | $20,000 | ~570 |
| Founder seats sold out (any exam) | Apr 2026 | — | 300+ |

---

## 4. Launch Week: Feb 19–28

### 4.1 Launch Day Checklist (Feb 19)

- [x] Switch Stripe to **live mode** (replace test keys in production) — ✅ Verified `sk_live_` key configured
- [ ] Deploy production build with final content
- [ ] Run user transition script for existing beta testers
- [ ] Verify payment flow end-to-end with real card
- [ ] Send launch email blast to waitlist
- [ ] Post launch announcement (LinkedIn, Twitter/X, Reddit r/CPA)
- [ ] Monitor error logs and Sentry/console for first 24 hours
- [ ] Verify Google Ads campaigns are active and approved
- [ ] Check dynamic sitemap is serving correctly
- [ ] IAM re-apply for all Cloud Run functions after final deploy
- [x] Deploy Discord quiz bot (multi-exam, 6 channels, 1,200 questions) — ✅ Railway `voraprep-bots`
- [x] Start Reddit/HN/SE opportunity monitor (hourly daemon) — ✅ Railway `voraprep-bots`
- [x] Add Discord invite link to app (Settings, footer, sidebar)
- [x] Deploy dev build with Discord community links
- [x] Link GA4 ↔ Google Ads — ✅ VoraPrepMCC linked Feb 17, Personalized Advertising enabled
- [x] Welcome drip email sequence — ✅ `sendWelcomeDripEmails` Day 1/3/5/7 with smart personalization
- [x] Trial reminder email improvements — ✅ Enhanced with user stats (questions, accuracy, predicted score)

### 4.1b Community & Growth Automation (Live as of Feb 19)

The following systems were built and deployed on launch day:

| System | Status | Location | Details |
|--------|--------|----------|--------|
| **Reddit/HN/SE Opportunity Monitor** | ✅ Running | `scripts/reddit_monitor/` | Scans 10 subreddits (RSS), Stack Exchange, Hacker News every 60 min. AI-generates suggested responses with Discord invite link. Emails alerts to founder. |
| **Discord Quiz Bot** | ✅ Running | `scripts/discord_bots/` | Single bot serving all 6 exams via channel auto-detection. 1,200 questions (200/exam). Slash commands, emoji voting, 30s answer reveal with VoraPrep CTA. |
| **Discord Server** | ✅ Live | https://discord.gg/XBjzDrws | "VoraPrep Study Group" — 7 channels: #general, #cpa-quiz, #ea-quiz, #cma-quiz, #cia-quiz, #cisa-quiz, #cfp-quiz |
| **In-App Discord Links** | ✅ Deployed | Settings, Footer, Sidebar | Three touchpoints driving users to Discord community |

**Architecture:**
- `quiz_engine.py` — Platform-agnostic core (works with Discord, Telegram, Slack)
- `multi_exam_bot.py` — Discord adapter serving all 6 exams from one bot
- `telegram_adapter.py` — Built, not yet deployed (needs @BotFather token)
- `reddit_opportunity_finder.py` — Multi-platform monitor with Gemini AI responses

### 4.2 Launch Week Monitoring (Feb 19–28)

| Metric | Tool | Check Frequency |
|--------|------|-----------------|
| Signups | Firebase Auth console | Every 2 hours day 1, daily after |
| Trial starts | Firestore `users` collection | Daily |
| Stripe events | Stripe Dashboard | Daily |
| Error rate | Firebase Functions logs | Every 4 hours day 1, daily after |
| Google Ads spend | Google Ads console | Daily |
| Auto-published articles | Email notifications | Every morning |
| Site speed | Lighthouse CI | Day 1, day 7 |
| **Reddit/HN/SE opportunities** | Email alerts (Resend) | As they arrive — respond within 2-4 hours for best visibility |
| **Discord bot activity** | Discord server | Daily — check for user engagement, questions asked |
| **Discord member count** | Discord server settings | Weekly |

### 4.3 Critical Launch Week Fixes

| Fix | Priority | Est. Hours | Status | Why |
|-----|----------|-----------|--------|-----|
| **CPA Study Plan Setup** | 🔴 P0 | 6h | ✅ DONE | `CPAStudyPlanSetup.tsx` implemented |
| **CPA Cram Mode** | 🔴 P0 | 4h | ✅ DONE | `cpaCramMode.ts` implemented |
| Trial expiration drip | 🔴 P0 | 4h | ✅ DONE | `sendTrialReminderEmails` Cloud Function (Day 7, 10, 13) |
| **Google Ads conversion tracking** | 🔴 P0 | 2h | ✅ DONE | `analytics.ts` tracks signup/trial/purchase conversions with gtag |
| Link GA4 ↔ Google Ads | 🔴 P0 | 0.5h | ✅ DONE | VoraPrepMCC linked Feb 17, Personalized Advertising enabled |
| Landing page CTA flow | 🟡 P1 | 2h | ✅ DONE | DemoPractice page (try 5 Qs free, no auth), fast-track onboarding, improved skip UX |
| Error boundary coverage | 🟡 P1 | 3h | ✅ DONE | Route-level error boundaries in RouteErrorBoundary.tsx + ErrorBoundary HOC |

---

## 5. Month 1: March 2026 — Foundation & Fix

**Theme:** Validate PMF, fix critical gaps, establish baseline metrics.

### 5.1 Product — Critical Fixes (~40 hours → ~26 hours remaining)

| Task | Priority | Est. Hours | Status | Description |
|------|----------|-----------|--------|-------------|
| CPA Study Plan Setup | P0 | 6h | ✅ DONE | `CPAStudyPlanSetup.tsx` implemented |
| CPA Cram Mode | P0 | 4h | ✅ DONE | `cpaCramMode.ts` implemented |
| Trial expiration drip | P0 | 4h | ✅ DONE | `sendTrialReminderEmails` Day 7/10/13 sequence |
| Welcome drip sequence | P0 | 4h | ✅ DONE | `sendWelcomeDripEmails` Day 1/3/5/7 personalized emails (study tips, first Q kudos, AI tutor intro, blueprint mastery) |
| Trial emails with stats | P0 | 2h | ✅ DONE | Enhanced trial reminders show user stats (questions, accuracy, days active, predicted score) |
| Stripe webhook hardening | P1 | 3h | ✅ DONE | Added retry logic, failure logging to Firestore, email alerts for critical events |
| Onboarding funnel analytics | P1 | 2h | ✅ DONE | 9 tracking events added: `onboarding_started`, `onboarding_abandoned`, per-step tracking in GA4 |
| Fix Pricing page redirect | P1 | 2h | ✅ DONE | Stripe `cancel_url` now returns to `/{courseId}#pricing` for course-specific context |
| Error tracking setup | P1 | 4h | ✅ DONE | Built-in error tracking in `errorTracking.ts` + enhanced Logs tab with stats dashboard (DIY Sentry) |
| Session recording (optional) | P2 | 2h | | Hotjar or FullStory for UX insights on first 100 users |

### 5.2 Content Quality — CISA & CPA Improvements (~30 hours)

| Task | Priority | Est. Hours | Description |
|------|----------|-----------|-------------|
| CISA question references | P0 | 8h | ✅ DONE | 1,411 references added citing CISA Review Manual chapters |
| CISA distractor improvement | P1 | 6h | ✅ DONE | 26 absolute-language fixes (always→typically, never→rarely) |
| CPA FAR distractor upgrade | P1 | 6h | ⚠️ Started | 12 absolute language fixes committed. 338 remaining issues (run `node scripts/validate-questions.cjs --course cpa`) |
| CFP question expansion | P1 | 8h | Generate 500+ additional CFP questions (currently only 850 vs 4000+ for CPA/EA) |
| Question validation script | P2 | 2h | ✅ DONE | Enhanced `validate-questions.cjs`: reference checks, absolute language detection, duplicate options |

### 5.3 SEM Optimization (~20 hours)

| Task | Timeline | Description |
|------|----------|-------------|
| **Google Ads conversion tracking** | Day 1 | ✅ DONE | Added `trackSignupConversion`, `trackTrialStartConversion`, `trackPurchaseConversion` to analytics.ts |
| **Link GA4 ↔ Google Ads** | Day 1 | ✅ DONE | VoraPrepMCC linked Feb 17, GA4 audiences shared, Personalized Advertising enabled |
| Exit learning phase | Week 1–2 | Let campaigns run without changes for 14 days |
| First performance review | Day 14 | Analyze CTR, CPC, conversion rate, quality scores |
| Pause low-performers | Day 14 | Pause keywords with CPC > $8 and CTR < 2% |
| Ad copy A/B tests | Week 3 | Test 2 new RSA variations per campaign (price anchor, social proof) |
| Negative keywords | Week 3 | Add negatives: "free", "reddit", "crack", "torrent", competitor names |
| Landing page alignment | Week 4 | Match ad copy to landing page headlines (quality score boost) |
| Expand EA campaign | Week 4 | Add 5–10 new ad groups for EA long-tail keywords |
| Build remarketing audiences | Week 4 | Site visitors who didn't convert, cart abandoners, trial non-converters |

**SEM Budget Recommendation:**
- March: Maintain $30/day ($900/mo total)
- If CPA > $60: pause underperformers, shift budget to best converters
- If CPA < $40: increase budget to $50/day

### 5.4 SEO Monitoring (~8 hours)

| Task | Timeline | Description |
|------|----------|-------------|
| **Brand keyword variations** | Day 1 | ✅ DONE | Added "Vora Prep" to meta, title, Organization JSON-LD schema with alternateName |
| Add brand keywords to Google Ads | Day 1 | | Bid on "vora prep", "voraprep", "vora prep cpa" as exact match keywords |
| Monitor auto-published articles | Ongoing | Check daily email notifications, verify quality |
| Submit to Google News | Week 1 | Apply for Google News inclusion if eligible |
| Track indexed pages | Weekly | Google Search Console → Index Coverage |
| First ranking check | Week 4 | Check positions for top 20 target keywords |
| Fix any crawl errors | Ongoing | Monitor GSC for 404s, redirect chains |

### 5.5 YouTube Channel Setup (~8 hours)

| Task | Timeline | Description |
|------|----------|-------------|
| Create branded YouTube channel | Week 1 | VoraPrep channel with logo, banner, description, links |
| Upload CISA video batch 1 | Week 2–3 | First 10–20 CISA domain videos with SEO-optimized titles/descriptions |
| YouTube SEO setup | Week 2 | Keywords in titles, descriptions, tags, playlists by exam/domain |
| Channel trailer | Week 3 | 60-second "What is VoraPrep?" intro video |
| End screens + cards | Week 3 | CTA to voraprep.com on all videos |
| YouTube → website funnel | Week 4 | Track YouTube referrals in GA4, dedicated landing page for YouTube traffic |

### 5.6 Community & Organic Growth (~20 hours)

| Task | Timeline | Priority | Description |
|------|----------|----------|-------------|
| **Respond to Reddit monitor alerts** | Ongoing (daily) | P0 | Check email alerts, post organic replies to relevant threads with Discord invite link. Target: 3-5 replies/week |
| **Post Discord bot on listing sites** | Week 1 | P1 | Submit bot to top.gg, discordbotlist.com, discord.bots.gg for discovery |
| **LinkedIn launch post** | Week 1 | P1 | Announce VoraPrep + free Discord study community on LinkedIn. Target accounting professionals |
| **Deploy bot to persistent server** | Week 2 | P0 | ✅ DONE | Railway `voraprep-bots` project — Discord bot running 24/7 |
| **Deploy Reddit monitor to server** | Week 2 | P0 | ✅ DONE | Railway `voraprep-bots` project — Monitor running with hourly scans |
| **Discord bot: auto-quiz scheduling** | Week 3 | P1 | Configure auto-quiz to post 3x/day (morning, lunch, evening) not just 2 PM |
| **Telegram bot launch** | Week 3 | P2 | Create Telegram bot via @BotFather, deploy telegram_adapter.py |
| **Discord server promotion** | Week 4 | P1 | Cross-post in r/CPA, r/Accounting study-group threads (organic, not self-promo) |
| **Track Discord → signup conversion** | Week 4 | P1 | Add UTM params to bot CTA links, track in GA4 |

### 5.7 Admin Improvements (~12 hours)

| Task | Priority | Est. Hours | Description |
|------|----------|-----------|-------------|
| User management panel | P1 | 6h | ⚠️ Partial | Added diagnostic exam results to user activity modal, subscription viewing works |
| Revenue dashboard | P1 | 4h | ✅ DONE | MRR, ARR, ARPU, subscribers, churn risk, per-course revenue in AdminCMS Analytics tab |
| Content quality metrics | P2 | 2h | ✅ DONE | Question answer rate, avg time tracked in AdminCMS Stats tab per-course |

---

## 6. Month 2: April 2026 — Content & Conversion

**Theme:** Scale content, optimize conversion, prepare founder deadline.

### 6.1 Founder Pricing Push (Deadline: April 30)

| Task | Timeline | Description |
|------|----------|-------------|
| Founder countdown on landing pages | Apr 1 | Show "X of 300 seats remaining" + countdown timer |
| Founder email campaign | Apr 1, 15, 25 | 3-email series to trial users: scarcity + savings messaging |
| Founder social proof | Apr 1 | Display "127 founders have joined" on pricing sections |
| Founder testimonial collection | Apr 7 | Email existing subscribers for quotes/reviews |
| Founder deadline enforcement | Apr 30 | Transition to regular pricing, update all pricing displays |
| Post-founder pricing strategy | Apr 28 | Decision: introduce quarterly tier? Bundle pricing? |

### 6.2 Content Expansion (~60 hours)

| Task | Priority | Est. Hours | Target |
|------|----------|-----------|--------|
| CFP questions: Generate 1,000 more | P0 | 16h | 850 → 1,850 questions |
| CFP lessons: Expand all 8 sections | P0 | 12h | 393 lesson files exist but many are thin — deepen |
| CISA questions: Add 500 more | P1 | 8h | 1,501 → 2,000 questions |
| CIA questions: Add 500 more | P1 | 8h | 2,196 → 2,700 questions |
| CMA essay/CBQ simulator | P1 | 12h | CMA transitioning to CBQ format Sept 2026 — build now |
| CPA TBS expansion | P2 | 4h | 467 TBS exist — add 50 more for weaker areas |

### 6.3 Email Marketing Automation (~20 hours)

| Sequence | Emails | Trigger | Description |
|----------|--------|---------|-------------|
| Welcome drip | 5 | Signup | Day 0: Welcome → Day 1: First practice → Day 3: Study plan → Day 5: AI Tutor → Day 7: Progress check |
| Trial conversion | 3 | Trial day 7, 10, 13 | Progress reminder → Feature spotlight → Urgency + discount |
| Win-back | 3 | Churn + 7 days | "We miss you" → Content update → Special offer |
| Weekly study digest | 1 | Every Monday | Personal stats, streak status, weak areas to practice |
| Exam milestone | Event | Score prediction > 70 | Congratulatory email, encourage scheduling exam |

**Implementation:** Extend `growthAutoPublish` Cloud Function pattern — scheduled Firestore queries + Resend emails.

### 6.4 Pre-rendering Pipeline (~8 hours)

| Task | Est. Hours | Description |
|------|-----------|-------------|
| Integrate prerender into CI/CD | 3h | Run `npm run build:prerender` in deploy pipeline |
| Add OG meta tags per page | 2h | Dynamic title, description, image for social sharing |
| FAQ schema markup | 2h | Add FAQ JSON-LD to exam landing pages (rich snippet potential) |
| Test Core Web Vitals | 1h | Lighthouse CI, target all greens (LCP < 2.5s, CLS < 0.1) |

### 6.5 Conversion Rate Optimization (~15 hours)

| Experiment | Type | Hypothesis |
|------------|------|-----------|
| Pricing page redesign | A/B | Comparison table with feature matrix will convert 20% better than current |
| Trial length (14 vs 7 days) | A/B | 7-day trial may create more urgency with similar conversion |
| Onboarding diagnostic quiz | Analysis | Users who complete diagnostic have 2× higher Day 7 retention |
| In-app upgrade prompts | Feature | Show upgrade modal when hitting free-tier limits |
| Exit intent modal | Feature | Capture email on bounce from pricing page |

---

## 7. Month 3: May 2026 — Scale & Optimize

**Theme:** Scale what's working, cut what isn't, prepare for mobile.

### 7.1 SEM Scaling (~20 hours)

| Task | Description |
|------|-------------|
| **ROI analysis** | Calculate true CAC per exam: ad spend ÷ paid conversions |
| **Scale winners** | Increase budget on campaigns with CAC < $50 |
| **Kill losers** | Pause campaigns with CAC > $100 after 30 days |
| **New campaigns** | Launch CMA and CISA campaigns if content is strong enough |
| **Remarketing** | Set up Google Ads remarketing for site visitors who didn't convert |
| **Display ads** | Test GDN campaigns targeting accounting/finance sites |
| **Budget target** | Scale to $50–100/day if ROI positive ($1,500–3,000/mo) |

### 7.2 SEO Phase 4 — Authority Building (~30 hours)

| Task | Est. Hours | Description |
|------|-----------|-------------|
| Backlink outreach v1 | 8h | Contact 50 accounting blogs, offer guest posts or resource links |
| HARO/Connectively | 4h | Sign up, respond to journalist queries about CPA/accounting topics |
| Resource page creation | 6h | Build comprehensive "CPA Exam Guide 2026" long-form page (3,000+ words) |
| Internal linking audit | 4h | Ensure blog posts link to landing pages and each other |
| Blog content quality review | 4h | Review first 30 auto-published articles, edit top 10 for quality |
| Scholarship/student discount page | 2h | Create .edu-targeted page (backlink magnet) |
| FAQ expansion | 2h | Add 20+ FAQ items to each exam page (schema markup for rich snippets) |

### 7.3 Mobile App Store Preparation (~25 hours)

| Task | Est. Hours | Platform | Description |
|------|-----------|----------|-------------|
| Android app polish | 6h | Android | Test all flows in Android Studio emulator, fix Capacitor quirks |
| iOS app polish | 6h | iOS | Test in Xcode simulator, fix iOS-specific issues |
| App store assets | 4h | Both | Screenshots (6+ per platform), feature graphic, app icon |
| App store listing copy | 3h | Both | Title, description, keywords, category selection |
| Privacy policy + ToS | 2h | Both | Required for app store submission |
| Google Play submission | 2h | Android | Build signed APK, submit to review |
| Apple App Store submission | 2h | iOS | Build IPA, submit to App Store Connect |

### 7.4 Feature Development (~20 hours)

| Feature | Priority | Est. Hours | Description |
|---------|----------|-----------|-------------|
| **Blueprint heatmap** | P1 | 8h | Visual heatmap showing performance by blueprint area (WORLD_CLASS_ROADMAP item) |
| **Smart Review** | P1 | 6h | Inject weak questions from last week into today's study plan |
| **Study streak improvements** | P2 | 3h | Custom streak goals, streak shields (miss 1 day/week), weekly recap |
| **Dark mode polish** | P2 | 3h | Audit all components for dark mode consistency |

---

## 8. Month 4: June 2026 — Mobile & Expansion

**Theme:** Mobile launch, expand to all 6 exams in SEM, community foundations.

### 8.1 Mobile App Launch

| Task | Timeline | Description |
|------|----------|-------------|
| Address app review feedback | Week 1 | Fix any issues from Google Play / App Store review |
| Soft launch on Google Play | Week 1–2 | Release as "Early Access" to gather initial reviews |
| Full launch on both stores | Week 3 | Remove early access flag, promote |
| Mobile-specific analytics | Week 1 | Add platform detection to GA4 events |
| Push notification optimization | Week 2 | Test notification timing for mobile engagement |
| Deep linking | Week 3 | Support universal links / app links for shared content |
| In-app review prompt | Week 4 | Trigger review prompt after 5 study sessions |

### 8.2 SEM Expansion to All 6 Exams

| Exam | Budget/Day | Ad Groups | Priority |
|------|-----------|-----------|----------|
| CPA | $15–25 | 12+ | Already live |
| EA | $8–12 | 11+ | Already live |
| CMA | $8–12 | 6–8 | New — launch |
| CISA | $5–8 | 5–6 | New — launch if content improved |
| CIA | $5–8 | 5–6 | New — launch |
| CFP | $5–8 | 5–6 | New — launch if content improved |

**Total budget target:** $50–75/day ($1,500–2,250/mo)

### 8.3 Community Features v1 (~30 hours)

**Note:** Discord community is already live (launched Feb 19). These features extend the in-app experience.

| Feature | Est. Hours | Description |
|---------|-----------|-------------|
| **Discussion forums** | 12h | Per-exam discussion boards, Firestore-backed, moderated |
| **Study groups** | 8h | Create/join study groups, shared progress tracking |
| **Q&A on questions** | 6h | Allow users to ask/answer questions about specific practice problems |
| **Weekly challenges** | 4h | Timed competitive quizzes with leaderboard prizes |
| **Discord ↔ App sync** | 6h | Show Discord leaderboard in-app, earn XP from bot participation |
| **Slack bot deployment** | 4h | Deploy quiz bot to Slack workspaces (accounting firm channels) |

### 8.4 Content: Video Integration (~20 hours)

| Task | Est. Hours | Description |
|------|-----------|-------------|
| Video player component | 6h | Build `VideoLesson.tsx` with HeyGen/YouTube embed, progress tracking |
| Add `videoUrl` to Lesson type | 2h | Extend lesson schema, update lesson loader |
| Upload CISA videos | 4h | 84 scripts → finalize production, upload to Firebase Storage or YouTube |
| EA video production | 4h | Complete EA batch 1 (SEE2 videos) |
| Lesson page redesign | 4h | Tabs: Text | Video | Flashcards — per lesson |

---

## 9. Month 5: July 2026 — Differentiation & Retention

**Theme:** Build features no competitor has, reduce churn.

### 9.1 AI-Powered Differentiators (~40 hours)

| Feature | Est. Hours | Description |
|---------|-----------|-------------|
| **AI Exam Coach** | 12h | Personalized daily study plan generated by Gemini based on score prediction, weak areas, days until exam. "Today, focus on FAR-II — you're at 62% in governmental accounting" |
| **AI Question Generator** | 10h | Users can request custom practice on any topic, Gemini generates questions in real-time |
| **AI Explanation Enhancer** | 6h | For any question, "Explain like I'm 5" / "Give me a real-world example" / "How would this appear on the exam?" |
| **AI Weak Area Diagnosis** | 6h | After each practice session, AI summarizes weak points and recommends specific lessons/flashcards |
| **AI Essay Grader (CMA)** | 6h | CMA essay/CBQ responses graded by Gemini with rubric-based scoring (addresses WORLD_CLASS_ROADMAP gap) |

### 9.2 Retention & Engagement (~20 hours)

| Feature | Est. Hours | Description |
|---------|-----------|-------------|
| **Streak shields** | 3h | Allow 1 missed day per week without losing streak (purchasable with XP) |
| **Achievement notifications** | 3h | In-app + push notification when approaching an achievement milestone |
| **Weekly email digest** | 4h | Personalized: "You answered 142 questions this week, 78% accuracy. Focus on REG-III" |
| **Exam countdown widget** | 2h | Dashboard widget showing days until exam with motivational messaging |
| **Social sharing** | 4h | Share achievements, mock exam scores to LinkedIn/Twitter |
| **Referral program v1** | 4h | Share link → referee gets extra 7 trial days, referrer gets 1 month free |

### 9.3 CMA Exam Format Transition Prep

The CMA exam transitions from essay to **Constructed-Based Questions (CBQ)** in **September 2026**. VoraPrep should support both formats during the transition.

| Task | Est. Hours | Description |
|------|-----------|-------------|
| CBQ question format | 6h | New question type: multi-part calculations, scenario-based |
| CBQ simulator | 8h | Timed CBQ sections with partial credit scoring |
| Blueprint update | 3h | Update CMA blueprint weights for 2026-2027 |
| Migration notice | 1h | In-app banner for CMA students about format change |

### 9.4 EA IRS Form Explorer (WORLD_CLASS_ROADMAP)

| Task | Est. Hours | Description |
|------|-----------|-------------|
| Form viewer component | 6h | Render IRS form PDFs/SVGs within lessons |
| Form line-item mapping | 4h | Link question explanations to specific form lines |
| Interactive form practice | 6h | Given a scenario, fill in form fields (auto-graded) |

---

## 10. Month 6: August 2026 — Growth Engine & Maturity

**Theme:** Automate growth, reduce manual intervention, prepare for scale.

### 10.1 Growth Automation (~30 hours)

| Feature | Est. Hours | Description |
|---------|-----------|-------------|
| **Auto SEM bid adjustments** | 8h | Cloud Function that adjusts bids based on conversion data |
| **Content performance tracking** | 6h | Track which blog posts drive signups, auto-promote top performers |
| **SEO auto-interlinking** | 4h | AI-generated internal links in new blog posts to existing content |
| **Lead scoring** | 6h | Score trial users by engagement (questions answered, sessions, features used) |
| **Conversion-optimized email triggers** | 6h | Trigger personalized emails based on user behavior patterns |

### 10.2 Platform Maturity (~25 hours)

| Feature | Est. Hours | Description |
|---------|-----------|-------------|
| **Admin: Question item analysis** | 8h | Per-question stats: % correct, avg time, discrimination index, flag outliers |
| **Admin: Cohort analysis** | 6h | Retention curves, feature adoption, conversion by source |
| **Content versioning** | 4h | Track question edits, maintain audit trail |
| **Rate limiting** | 3h | Prevent AI tutor abuse, rate-limit API calls per user tier |
| **Accessibility audit** | 4h | WCAG 2.1 AA compliance, screen reader testing, keyboard navigation |

### 10.3 Partnership & Business Development

| Opportunity | Timeline | Action |
|-------------|----------|--------|
| Accounting firm partnerships | Aug | Reach out to Top 100 firms for bulk licensing |
| University partnerships | Aug | Contact 20 accounting programs for student discounts |
| CPE/CE credit partnerships | Aug | Explore NASBA CPE credit for VoraPrep content |
| Affiliate program | Aug | Launch affiliate program for accounting bloggers/influencers |
| Corporate training | Aug | Create enterprise pricing for companies sponsoring employee exams |

### 10.4 Testing & Quality

| Task | Est. Hours | Target |
|------|-----------|--------|
| Unit test expansion | 20h | 14% → 30% line coverage (145 → ~350 tests) |
| E2E critical path tests | 10h | 17 → 35 tests (add payment, study plan, cram mode flows) |
| Load testing | 4h | Verify performance under 500 concurrent users |
| Security audit | 8h | Firestore rules review, input sanitization, API key rotation |

---

## 11. Cross-Cutting Tracks

### 11.1 Testing Improvement Roadmap

| Month | Focus | Coverage Target |
|-------|-------|-----------------|
| Mar | Payment flows, auth, onboarding | Lines: 18% |
| Apr | Adaptive engine, score predictor, cram mode | Lines: 22% |
| May | Content loading, flashcard SR, study plan | Lines: 26% |
| Jun | Exam simulator, AI tutor, community | Lines: 30% |
| Jul | Admin CMS, growth dashboard, mobile | Lines: 34% |
| Aug | Integration tests, load tests, security | Lines: 38% |

### 11.2 SEO Content Calendar

The auto-publish engine handles most content, but manual high-quality content should supplement it.

| Month | Auto-Published (AI) | Manual Long-Form | Total |
|-------|---------------------|------------------|-------|
| Mar | 12–16 | 1 | 13–17 |
| Apr | 12–16 | 2 | 14–18 |
| May | 12–16 | 2 | 14–18 |
| Jun | 12–16 | 3 | 15–19 |
| Jul | 12–16 | 3 | 15–19 |
| Aug | 12–16 | 4 | 16–20 |

**Manual content ideas:**
- "Ultimate CPA Exam Study Guide 2026" (3,000+ words)
- "CPA vs EA: Which Credential Is Right for You?" (comparison piece)
- "How to Pass FAR on Your First Try" (section-specific)
- "CISA Exam: Complete Domain-by-Domain Breakdown"
- "CMA Exam 2026: New CBQ Format Explained"
- "Study Schedule Templates" (downloadable PDFs — lead magnets)
- Exam score calculator tools (interactive, shareable)

### 11.3 Email Infrastructure Evolution

| Phase | Month | Capability |
|-------|-------|-----------|
| 1 — Transactional | Feb (done) | Welcome, password reset, auto-publish alerts |
| 2 — Trial nurture | Mar | 3-email trial drip sequence |
| 3 — Lifecycle | Apr | Welcome drip (5 emails), win-back (3 emails) |
| 4 — Engagement | May | Weekly study digest, exam milestone emails |
| 5 — Marketing | Jun | Product updates, feature announcements |
| 6 — Segmented | Jul–Aug | Per-exam content, behavior-triggered sequences |

### 11.4 Analytics & Data

| Month | New Capability |
|-------|---------------|
| Mar | Onboarding funnel analytics, trial → paid tracking |
| Apr | Feature adoption tracking (which features correlate with conversion?) |
| May | Cohort retention curves (Day 1, 7, 14, 30) |
| Jun | Revenue attribution by channel (SEM vs SEO vs direct vs referral) |
| Jul | Question item analysis (difficulty, discrimination, time) |
| Aug | Predictive churn model (identify at-risk subscribers) |

---

## 12. Exam-by-Exam Action Plans

### 12.1 CPA (Flagship — Highest Priority)

**Current:** 4,789 questions, 1,110 flashcards, 375 lessons, 467 TBS. Quality: ★★★★☆
**Status:** All core features complete (Study Plan, Cram Mode, Score Predictor)
**Revenue potential:** Highest (largest market, highest price point)

| Task | Month | Priority | Status | Description |
|------|-------|----------|--------|-------------|
| Study Plan Setup | Feb | P0 | ✅ DONE | `CPAStudyPlanSetup.tsx` implemented |
| Cram Mode | Feb | P0 | ✅ DONE | `cpaCramMode.ts` implemented |
| FAR distractor improvement | Mar | P1 | | Rewrite 200+ weak distractors to be more exam-realistic |
| Score predictor tuning | Apr | P1 | | Validate CPA score predictor against real exam scores from users |
| 2025→2026 blueprint transition | Apr | P1 | | Ensure questions map to current AICPA blueprint |
| ISC/BAR/TCP content parity | May | P1 | | Ensure discipline sections have equal content depth |
| Written Communication re-enable | Jun | P2 | | WC format exists but feature flag is off — validate and enable |
| Video lessons (5 pilot) | Jul | P2 | | Produce 5 high-impact FAR video lessons |
| Mock exam generator v2 | Aug | P2 | | Full 4-testlet simulation with realistic timing |

### 12.2 EA (Second Priority — Strong Content)

**Current:** 4,210 questions, 665 flashcards, 90 lessons, 254 TBS. Quality: ★★★★★
**Strength:** Professional-grade questions with IRC citations

| Task | Month | Priority | Description |
|------|-------|----------|-------------|
| Lesson expansion | Mar–Apr | P1 | 90 → 200 lessons (SEE1 and SEE3 underrepresented) |
| IRS Form Explorer | Jul | P2 | Interactive form viewer linked to questions (WORLD_CLASS_ROADMAP) |
| Video lessons (batch 1) | May–Jun | P2 | Complete EA batch 1 from content_factory |
| SEM campaign optimization | Mar | P1 | EA campaign is live — optimize keywords and ad copy |
| Tax law update pipeline | Ongoing | P1 | Process for annual tax code changes affecting SEE content |

### 12.3 CMA (Growth Opportunity — Format Transition)

**Current:** 2,834 questions, 505 flashcards, 89 lessons, 130 TBS. Quality: ★★★★☆
**Opportunity:** CBQ format transition in Sept 2026 — be first to market

| Task | Month | Priority | Description |
|------|-------|----------|-------------|
| Question expansion (+500) | Apr | P1 | 2,834 → 3,334 questions |
| CBQ format support | Jul | P0 | New question type for constructed-based questions |
| CBQ simulator | Jul–Aug | P0 | Timed CBQ practice with partial credit scoring |
| AI Essay Grader | Jul | P1 | Gemini-powered essay grading with rubric feedback |
| SEM campaign launch | Jun | P1 | New Google Ads campaign for CMA keywords |
| Blueprint update (2026) | Aug | P1 | Update weights for Fall 2026 CMA blueprint |

### 12.4 CIA (Steady Growth)

**Current:** 2,196 questions, 361 flashcards, 88 lessons, 75 TBS. Quality: ★★★★☆
**Need:** More TBS, lesson depth

| Task | Month | Priority | Description |
|------|-------|----------|-------------|
| Question expansion (+500) | Apr–May | P1 | 2,196 → 2,700 questions |
| TBS expansion (+50) | May | P1 | 75 → 125 TBS (currently lowest ratio) |
| Lesson deepening | Jun | P2 | Ensure all 3 CIA parts have 40+ lessons each |
| Score predictor tuning | Jun | P2 | Validate CIA score predictor |
| SEM campaign launch | Jun | P1 | Google Ads for CIA keywords |

### 12.5 CISA (Quality Improvement Needed)

**Current:** 1,501 questions, 335 flashcards, 91 lessons, 30 TBS. Quality: ★★★☆☆
**Issues:** Missing references, absolute-language distractors, low TBS count

| Task | Month | Priority | Description |
|------|-------|----------|-------------|
| Add references to all questions | Mar | P0 | ISACA Review Manual citations for all 1,501 questions |
| Distractor rewrite | Mar–Apr | P0 | Remove "always/never" traps, write realistic alternatives |
| Question expansion (+500) | Apr–May | P1 | 1,501 → 2,000 questions |
| TBS expansion (+50) | May | P1 | 30 → 80 TBS (currently very low) |
| Video integration | Jun–Jul | P2 | 84 CISA video scripts already written — finalize production |
| Domain weight verification | Apr | P1 | Ensure question distribution matches: D1=21%, D2=16%, D3=18%, D4=20%, D5=25% |
| SEM campaign launch | Jun | P1 | Google Ads for CISA keywords (if quality meets standards) |

### 12.6 CFP (Needs Most Work)

**Current:** 850 questions, 255 flashcards, 393 lessons, 0 TBS. Quality: ★★★☆☆
**Issues:** Fewest questions, no TBS, lessons exist but many are thin

| Task | Month | Priority | Description |
|------|-------|----------|-------------|
| Question generation (+1,000) | Mar–Apr | P0 | 850 → 1,850 questions across all 8 CFP sections |
| Lesson deepening | Apr–May | P1 | 393 lesson files exist — deepen content in all 8 sections |
| TBS creation (50+) | May | P1 | Create first 50 CFP task-based simulations (case studies) |
| Score predictor | Jun | P2 | Build `cfpScorePredictor.ts` (currently doesn't exist) |
| Question generation (+1,000) | Jun–Jul | P1 | 1,850 → 2,850 questions |
| SEM campaign launch | Jul | P2 | Google Ads for CFP keywords (after content is sufficient) |

---

## 13. Technical Debt & Infrastructure

### 13.1 Known Technical Debt

| Issue | Severity | Est. Hours | Description |
|-------|----------|-----------|-------------|
| `IS_BETA = false` but ROADMAP.md says "Beta" | Low | 0.5h | Update outdated docs |
| Pricing page is a redirect stub | Medium | 2h | Build real comparison page |
| Cloud Run IAM resets on deploy | High | 4h | Automate IAM re-application in deploy script |
| Pre-render not in CI/CD | Medium | 3h | Integrate `npm run build:prerender` into deploy pipeline |
| Test coverage 14% vs 40% target | High | 40h+ | Systematic test expansion (see §11.1) |
| CommonJS Cloud Functions | Low | 8h | Consider ESM migration for consistency (non-urgent) |
| `console.log` in some files | Low | 2h | Replace with `logger` utility |
| Legacy `.js`/`.jsx` files | Low | 4h | Gradual migration to `.tsx`/`.ts` as files are touched |
| ROADMAP.md shows CISA for 2027 | Low | 0.5h | CISA already exists — update timeline docs |
| ~~No CFP score predictor~~ | ~~Medium~~ | ~~6h~~ | ✅ DONE — `cfpScorePredictor.ts` exists |
| ~~No EA score predictor~~ | ~~Medium~~ | ~~6h~~ | ✅ DONE — `eaScorePredictor.ts` exists |
| ~~No CMA score predictor~~ | ~~Medium~~ | ~~6h~~ | ✅ DONE — `cmaScorePredictor.ts` exists |

### 13.2 Infrastructure Improvements

| Task | Month | Est. Hours | Description |
|------|-------|-----------|-------------|
| CI/CD pipeline | Mar | 8h | GitHub Actions: lint → test → build → prerender → deploy |
| Staging environment | Mar | 4h | Separate Firebase project for staging deployments |
| Error monitoring (Sentry) | Mar | 4h | Production error tracking with alerting |
| Database backups | Apr | 2h | Automated Firestore export to Cloud Storage (daily) |
| CDN optimization | May | 4h | Analyze and optimize asset caching headers |
| Rate limiting | Jul | 3h | Prevent AI tutor and API abuse |
| Security audit | Aug | 8h | Firestore rules, API keys, input sanitization review |
| Performance monitoring | Jun | 4h | Real User Monitoring (RUM) for Core Web Vitals tracking |

### 13.3 Deploy Automation

Current deploy is manual (`npm run deploy:prod`). Target: fully automated.

```
Phase 1 (Mar): GitHub Actions on merge to develop
  → ESLint + TypeScript check
  → Vitest (fail on <14% coverage)
  → Build
  → Deploy to staging

Phase 2 (Apr): Add pre-rendering + quality gates
  → Puppeteer pre-render
  → Lighthouse CI (fail on <90 performance)
  → Deploy to staging

Phase 3 (May): Production pipeline
  → Manual approval gate
  → Deploy to production
  → IAM re-application (automated)
  → Smoke tests
  → Slack/email notification
```

---

## 14. Risk Register

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|-----------|
| **SEM burns budget without conversions** | Medium | High | Implement conversion tracking Day 1, set daily budget caps, pause after 14 days if CPA > $100 |
| **Low trial-to-paid conversion (<5%)** | Medium | High | A/B test trial length, add onboarding optimization, trial drip emails |
| **Question quality complaints** | Medium | Medium | Prioritize CISA/CFP quality fixes in Month 1, add user feedback mechanism |
| **Competitor price war** | Low | Medium | Differentiate on AI features (tutor, coach), not price |
| **App store rejection** | Medium | Low | Follow platform guidelines strictly, prepare for 1-2 revision cycles |
| **Content staleness (tax law changes)** | High | Medium | Build annual update process for EA (tax code), CPA (AICPA standards) |
| **Single-developer bottleneck** | High | High | Document all systems, automate deploys, consider contract help for content |
| **Firebase cost overruns** | Low | Medium | Monitor Firestore reads/writes, set billing alerts at $100, $500, $1,000 |
| **AI content quality drift** | Medium | Medium | Monthly manual review of 10 auto-published articles, quality scoring |
| **Exam blueprint changes** | Medium | Medium | Monitor AICPA, IMA, IIA, ISACA for blueprint updates quarterly |
| **Google Ads account suspension** | Low | High | Follow all policies, avoid trademark issues, maintain ad quality |
| **CPA exam window seasonality** | Certain | Medium | Align SEM spend with testing windows (higher budget Jan-Mar, Jul-Sep) |

---

## 15. Success Metrics Dashboard

### 15.1 North Star Metrics

| Metric | Definition | Month 1 | Month 3 | Month 6 |
|--------|-----------|---------|---------|---------|
| **MRR** | Monthly recurring revenue | $750 | $5,000 | $17,500 |
| **Active learners** | Users with 3+ study sessions/week | 50 | 300 | 1,000 |
| **Pass rate** | % of users who report passing their exam | — | Track | > industry avg |

### 15.2 Acquisition Metrics

| Metric | Target Month 1 | Target Month 3 | Target Month 6 |
|--------|---------------|----------------|----------------|
| New signups/week | 15–25 | 50–100 | 150–250 |
| Organic traffic/month | 500 | 3,000 | 10,000 |
| SEM traffic/month | 200 | 800 | 2,000 |
| Blog articles published (cumulative) | 15 | 60 | 120 |
| Google indexed pages | 40 | 100 | 200 |
| Domain authority (Moz/Ahrefs) | 5 | 10 | 20 |
| **Discord members** | **50** | **200** | **500** |
| **Reddit/HN organic replies** | **12** | **40** | **100** |
| **Discord → signup conversions** | **5** | **25** | **75** |

### 15.3 Engagement Metrics

| Metric | Target |
|--------|--------|
| Day 1 retention | >60% |
| Day 7 retention | >40% |
| Day 30 retention | >25% |
| Avg questions/session | 15+ |
| Avg sessions/week (active users) | 4+ |
| AI Tutor usage rate | >30% of active users |
| Flashcard review rate | >20% of active users |

### 15.4 Conversion Metrics

| Metric | Target |
|--------|--------|
| Signup → Trial start | >80% |
| Trial → Day 7 active | >50% |
| Trial → Paid conversion | 15–20% |
| Paid → Month 2 retention | >85% |
| Monthly churn | <5% |
| Annual plan adoption | >30% of paid |

### 15.5 Content Quality Metrics (New — Build in Month 3)

| Metric | Target |
|--------|--------|
| Question answer rate (% attempted) | >90% per question |
| Question avg accuracy | 55–70% (too easy if >80%, too hard if <40%) |
| Question avg time | 60–120 seconds |
| Discrimination index (top 27% vs bottom 27%) | >0.3 |
| User-reported question errors | <0.5% |

---

## 16. Appendix: Content Inventory

### 16.1 Content Per Exam Section

#### CPA
| Section | Questions | Flashcards | Lessons | TBS |
|---------|-----------|------------|---------|-----|
| FAR | ~1,600 | ~370 | ~125 | ~155 |
| AUD | ~1,200 | ~280 | ~95 | ~120 |
| REG | ~1,100 | ~260 | ~85 | ~110 |
| BAR | ~300 | ~70 | ~25 | ~30 |
| ISC | ~300 | ~70 | ~25 | ~30 |
| TCP | ~289 | ~60 | ~20 | ~22 |

#### EA
| Section | Questions | Flashcards | Lessons | TBS |
|---------|-----------|------------|---------|-----|
| SEE1 | ~1,400 | ~220 | ~30 | ~85 |
| SEE2 | ~1,400 | ~220 | ~30 | ~85 |
| SEE3 | ~1,410 | ~225 | ~30 | ~84 |

#### CMA
| Section | Questions | Flashcards | Lessons | TBS |
|---------|-----------|------------|---------|-----|
| CMA1 | ~1,417 | ~250 | ~45 | ~65 |
| CMA2 | ~1,417 | ~255 | ~44 | ~65 |

#### CIA
| Section | Questions | Flashcards | Lessons | TBS |
|---------|-----------|------------|---------|-----|
| CIA1 | ~730 | ~120 | ~30 | ~25 |
| CIA2 | ~730 | ~120 | ~30 | ~25 |
| CIA3 | ~736 | ~121 | ~28 | ~25 |

#### CISA
| Section | Questions | Flashcards | Lessons | TBS | Weight |
|---------|-----------|------------|---------|-----|--------|
| CISA1 | ~315 | ~70 | ~18 | ~6 | 21% |
| CISA2 | ~240 | ~55 | ~18 | ~6 | 16% |
| CISA3 | ~270 | ~60 | ~18 | ~6 | 18% |
| CISA4 | ~300 | ~65 | ~18 | ~6 | 20% |
| CISA5 | ~376 | ~85 | ~19 | ~6 | 25% |

#### CFP
| Section | Questions | Flashcards | Lessons | TBS |
|---------|-----------|------------|---------|-----|
| 8 sections | ~106 each | ~32 each | ~49 each | 0 |

### 16.2 Content Targets by Month 6

| Exam | Questions Now | Target | Gap | Flashcards Now | Target | Lessons Now | Target |
|------|-------------|--------|-----|---------------|--------|-------------|--------|
| CPA | 4,789 | 5,000 | +211 | 1,110 | 1,200 | 375 | 400 |
| EA | 4,210 | 4,500 | +290 | 665 | 750 | 90 | 200 |
| CMA | 2,834 | 3,500 | +666 | 505 | 600 | 89 | 150 |
| CIA | 2,196 | 2,700 | +504 | 361 | 450 | 88 | 130 |
| CISA | 1,501 | 2,000 | +499 | 335 | 400 | 91 | 130 |
| CFP | 850 | 2,850 | +2,000 | 255 | 500 | 393 | 500 |
| **Total** | **16,366** | **20,550** | **+4,170** | **3,066** | **3,900** | **1,121** | **1,510** |

### 16.3 Competitor Comparison

| Feature | VoraPrep | Becker | Gleim | Surgent | Roger |
|---------|----------|--------|-------|---------|-------|
| AI Tutor | ✅ Gemini | ❌ | ❌ | ❌ | ❌ |
| AI Content Generation | ✅ Auto-blog | ❌ | ❌ | ❌ | ❌ |
| Adaptive Learning | ✅ Per-exam | ✅ Adapt2U | ✅ | ✅ A.S.A.P. | ✅ |
| Score Prediction | ✅ Blueprint-weighted | ❌ | ❌ | ✅ ReadySCORE | ❌ |
| Spaced Repetition | ✅ SM-2 | ❌ | ❌ | ❌ | ❌ |
| Multi-Exam (6) | ✅ | CPA only | CPA/CMA/EA/CIA | CPA/CMA/EA/CIA | CPA only |
| Video Lessons | ⚠️ In progress | ✅ 100+ hrs | ✅ | ✅ | ✅ |
| Mobile App | ⚠️ PWA | ✅ Native | ✅ Native | ⚠️ Web | ✅ Native |
| Price (CPA/mo) | $29-59 | $159/mo | $64/mo | $79/mo | $55/mo |
| AI-Powered SEO | ✅ | ❌ | ❌ | ❌ | ❌ |

**VoraPrep's Moat:** AI features (tutor, auto-content, score prediction) + aggressive pricing + 6-exam breadth. Competitors invest in video production and brand trust. VoraPrep's path: match content quality, beat on technology and price.

---

## Month-by-Month Summary

### February 2026 (Launch)
> Launch day. Monitor everything. Fix CPA study plan + cram mode. **Discord quiz bot + Reddit/HN/SE monitor live.** Respond to opportunity alerts daily.

### March 2026 (Foundation)
> Google Ads conversion tracking, YouTube channel launch, SEM optimization, CISA quality fixes, user management admin, error monitoring. **Deploy Discord bot + monitor to persistent server. Post on bot listing sites. Launch LinkedIn presence. Target 50 Discord members.**

### April 2026 (Conversion)
> Founder deadline push, CFP/CIA/CISA content expansion, email automation, pricing page, CRO experiments. **Launch Telegram bot. Track Discord → signup conversions. Target 150 Discord members.**

### May 2026 (Scale)
> SEM scaling + new campaigns, SEO authority building, mobile app store prep, blueprint heatmap, smart review. **Expand quiz bot questions to 500/exam. Target 300 Discord members.**

### June 2026 (Mobile & Community)
> Mobile app store launch, SEM expansion to all 6 exams, community v1 (forums + study groups), video integration. **Deploy Slack bot to accounting firm workspaces. Discord ↔ App XP sync. Target 500 Discord members.**

### July 2026 (Differentiation)
> AI exam coach, AI question generator, CMA CBQ support, EA form explorer, retention features (referral, sharing).

### August 2026 (Maturity)
> Growth automation, admin analytics (item analysis, cohorts), partnerships, security audit, test coverage push.

---

## Decision Log

Decisions to make at key milestones:

| Decision | Deadline | Options | Criteria |
|----------|----------|---------|----------|
| SEM budget increase | Day 14 | Maintain $30/day vs increase to $50/day | CPA < $60 and positive ROI |
| Trial length | Week 4 | 14 days vs 7 days | Conversion rate comparison |
| Post-founder pricing | Apr 28 | Keep current vs introduce quarterly vs bundles | Revenue per user analysis |
| New SEM campaigns | May 1 | CMA + CISA vs all 4 remaining | Content quality readiness |
| Mobile vs web priority | May 15 | Mobile first vs web first | Traffic source analysis |
| Hire content writer | Jun 1 | In-house vs freelance vs AI-only | Content quality metrics + cost |
| Video investment | Jun 15 | HeyGen production vs YouTube partnerships | Engagement data on CISA pilot |
| Community platform | Jun 1 | ~~Build in-app vs use Discord/Slack vs hybrid~~ **DECIDED: Hybrid** — Discord live since Feb 19, in-app features in Jun | Discord growth data + user feedback |

---

*This document should be reviewed and updated monthly. Track progress against milestones in the project management system. Each section owner should report weekly on their track.*

*Next review: March 1, 2026*

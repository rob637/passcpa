# CPA Exam Review UX Audit - Consolidated Issues

**Audit Date:** February 12, 2026  
**Methodology:** AI-powered autonomous browser testing using browser-use + Claude Opus 4  
**Audited Tasks:** 13 (login, signup, landing, dashboard, navigation, practice, exam-simulator, flashcards, lessons, settings, dark-mode, responsive, accessibility)

---

## Summary

The full CPA exam review underwent a comprehensive UX audit covering all major user flows. While the platform demonstrates strong visual design and modern architecture, several critical issues were identified that impact user onboarding and conversion.

### Overall Results
- **13/13 audit tasks completed**
- **Critical Issues:** 3
- **High Priority Issues:** 4
- **Medium Priority Issues:** 3
- **Low Priority Issues:** 4

### Fixes Applied (Feb 12, 2026)
- ✅ Exam section cards now clickable (link to registration with section)
- ✅ Empty progress messages now encouraging ("Start practicing to build readiness")
- ✅ Demo question added to CPA landing page (interactive preview)
- ✅ "FREE" badge added to Flashcards quick action
- ✅ Dashboard stats show helpful messages for new users

---

## Critical Issues

### 1. ❌ Test Credentials Non-Functional
**Status:** NEEDS FIX  
**Location:** Login page  
**Description:** The test account (test@voraprep.com / testpassword123) does not work, preventing reviewers and evaluators from accessing the authenticated experience.

**Recommendation:** Create and maintain a valid test account, or implement a demo mode toggle.

---

### 2. ⚠️ Misleading "14-Day Free Trial" Messaging  
**Status:** NEEDS CLARIFICATION  
**Location:** Homepage, pricing page, subscription modal  
**Description:** "14-day free trial" is prominently advertised, but:
- Core features (Lessons, Questions, TBS, Mock Exam) require immediate payment
- No clear indication this is a "money-back guarantee" vs actual free access
- Contradicts user expectations set by "No credit card required" messaging

**Impact:** High friction for conversion; users feel deceived when hitting paywall.

**Recommendation:** 
- Option A: Implement true freemium tier (10-20 free questions per section)
- Option B: Change messaging to "14-day money-back guarantee"
- Option C: Provide free trial with credit card that auto-charges after trial

---

### 3. ⚠️ All Core Features Behind Immediate Paywall
**Status:** BY DESIGN (but problematic)  
**Location:** Dashboard → Lessons, Questions, TBS, Mock Exam  
**Description:** New users cannot evaluate any core learning content without subscribing:
- Cannot preview lesson structure or topics
- Cannot try a single practice question
- Cannot access exam simulator demo

**Impact:** Users cannot validate product quality before committing to $249/year.

**Recommendation:** Implement demo mode or limited free tier for evaluation.

---

## High Priority Issues

### 4. Dashboard Loading State Hangs  
**Status:** NEEDS INVESTIGATION  
**Location:** Dashboard after account creation  
**Description:** "Creating your personalized plan..." loading animation runs indefinitely for new accounts without completed onboarding.

**Recommendation:** Add timeout handling; show onboarding prompt if plan creation fails.

---

### 5. Exam Section Cards Not Interactive  
**Status:** NEEDS FIX  
**Location:** CPA landing page exam sections  
**Description:** The 6 exam section cards (FAR, AUD, REG, BAR, ISC, TCP) appear clickable but have no click action.

**Recommendation:** Make cards link to section-specific content or info pages.

---

### 6. No Clear Onboarding for New Users  
**Status:** NEEDS VERIFICATION  
**Location:** Post-registration flow  
**Description:** Some audit runs encountered mandatory 5-step onboarding, others saw no onboarding at all. Flow appears inconsistent.

**Recommendation:** Ensure consistent onboarding experience; allow skip option.

---

### 7. Email Verification State Confusing  
**Status:** NEEDS FIX  
**Location:** /verify-email page  
**Description:** Users can bypass email verification via "Already verified? Sign in" but it's unclear what features require verification.

**Recommendation:** Either make verification mandatory or clearly mark features that require it.

---

## Medium Priority Issues

### 8. No Active Navigation State  
**Status:** COSMETIC FIX  
**Location:** Top navigation bar  
**Description:** No visual indication of current page/section in navigation.

**Recommendation:** Add active state styling to current nav item.

---

### 9. Unclear Free vs Paid Content  
**Status:** UX IMPROVEMENT  
**Location:** Dashboard study options  
**Description:** No visual indication (lock icons, labels) distinguishing free vs paid content.

**Recommendation:** Add "FREE" badges or lock icons to clarify access levels.

---

### 10. Login Button Not Always Visible  
**Status:** UX IMPROVEMENT  
**Location:** Main homepage  
**Description:** Login/Sign In not visible on homepage until navigating to course pages.

**Recommendation:** Add login to main site navigation.

---

## Low Priority Issues

### 11. Empty Progress Indicators Demotivating  
**Status:** COSMETIC  
**Location:** Dashboard daily goal and streak widgets  
**Description:** Shows "0 day streak" and "0%" for new users with no encouragement.

**Recommendation:** Show motivational message like "Start your first lesson to begin your streak!"

---

### 12. Hash Navigation Limits Deep Linking  
**Status:** BY DESIGN  
**Location:** Landing page sections  
**Description:** Navigation uses hash anchors (#exam, #features) limiting bookmarkability.

**Impact:** Minor - most users won't notice.

---

### 13. Mobile Menu Discovery  
**Status:** NEEDS VERIFICATION  
**Location:** Mobile viewport  
**Description:** Hamburger menu may not be immediately visible on some mobile sizes.

**Recommendation:** Ensure menu icon is prominent across all mobile breakpoints.

---

### 14. No Preview/Demo Questions  
**Status:** ENHANCEMENT  
**Location:** Landing page  
**Description:** No sample questions on landing page to demonstrate platform quality.

**Recommendation:** Add 1-2 interactive demo questions to landing page.

---

## False Positives (No Action Needed)

### ~~Login Form Security (GET vs POST)~~  
**Status:** FALSE POSITIVE  
The login form uses JavaScript `onSubmit` handler with Firebase Auth API calls. This is secure and standard for SPAs. No credentials are exposed in URLs.

---

## Positive Observations

The audit also identified many strengths:

1. **Excellent Visual Design** - Clean, modern, professional appearance
2. **Strong Registration UX** - Real-time password validation with checkmarks
3. **Comprehensive Content** - 3,200+ questions, 460+ lessons, 600+ flashcards
4. **Gamification** - Daily goals, streaks, and points system
5. **Blueprint Awareness** - 2025 vs 2026 CPA Blueprint transition messaging
6. **Google OAuth** - Easy sign-in option
7. **Accessibility Features** - Skip to content links, ARIA labels
8. **Responsive Design** - Adapts well to different screen sizes
9. **Dark Mode** - Full dark mode support
10. **Free Resources Section** - Valuable free content (tips, exam overview)

---

## Next Steps

### Immediate Actions
1. [ ] Create working test account for reviewers
2. [ ] Fix dashboard loading state timeout
3. [ ] Clarify or update "free trial" messaging

### Short-term Improvements
4. [ ] Implement demo mode with 5-10 free questions per section
5. [ ] Make exam section cards interactive
6. [ ] Add active state to navigation

### Future Enhancements
7. [ ] Add sample questions to landing page
8. [ ] Improve onboarding consistency
9. [ ] Add "FREE" badges to clearly mark accessible content

---

## How This Audit Was Conducted

This audit used **browser-use**, an open-source Python library that gives an LLM (Claude) control of a real Playwright browser. The process:

1. Agent opens real browser at `http://localhost:5174`
2. Navigates the app like a real user (clicking, typing, scrolling)
3. Takes screenshots at each significant state
4. Evaluates against UX best practices
5. Produces structured Markdown reports

### Running the Audit

```bash
cd scripts/ux-audit

# Start dev server first (in another terminal)
npm run dev

# Run full CPA audit
python audit.py --course cpa --suite full

# Or use the web dashboard
python server.py
# Open http://localhost:8642
```

See [README.md](README.md) for full documentation.

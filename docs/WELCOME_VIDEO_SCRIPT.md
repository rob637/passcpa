# VoraPrep Video Strategy & Scripts

Two distinct videos for two different user states. Complete voiceover scripts included.

---

# VIDEO 1: Landing Page Demo

**File:** `/demo-showcase`  
**Target:** Prospects who haven't signed up yet  
**Purpose:** "Wow" factor — showcase the full product breadth  
**URL:** https://passcpa-dev.web.app/demo-showcase  
**Use on:** CPA landing page, marketing pages, social media  
**Duration:** ~31 seconds (7 scenes)  
**Ends with:** "Start Free Trial" CTA  

---

## Voiceover Script — Landing Page

### Scene 1: Intro (3s)
*[Logo animates in, tagline fades]*

> **"VoraPrep. AI-powered CPA prep that gets you to 75."**

---

### Scene 2: Dashboard (5s)
*[Animated counters tick up: 9,432 MCQs, 847 lessons, 47-day streak]*

> **"Track your progress at a glance. See everything you've accomplished—and exactly what's next."**

---

### Scene 3: Practice (6s)
*[User clicks answer, confetti bursts on correct response]*

> **"Practice over nine thousand exam-style questions. Get instant feedback with detailed explanations—so you actually learn, not just memorize."**

---

### Scene 4: Results (4s)
*[Score circle animates to 85%, trophy pulses]*

> **"Watch your score climb. Our adaptive engine focuses on your weak spots to maximize every study minute."**

---

### Scene 5: Study Plan (5s)
*[Timeline appears, progress bars fill]*

> **"Get a personalized study plan based on your exam date. We'll tell you exactly what to study, every single day."**

---

### Scene 6: Achievement (4s)
*[Badge unlocks, stars float, confetti]*

> **"Celebrate every win. Badges, streaks, and milestones keep you motivated when the material gets tough."**

---

### Scene 7: Outro (4s)
*["Start Your Free Trial" CTA pulses]*

> **"Ready to pass the CPA exam? Start your free trial today."**

---

## Full Narration (Landing Page)

> VoraPrep. AI-powered CPA prep that gets you to 75.
>
> Track your progress at a glance. See everything you've accomplished—and exactly what's next.
>
> Practice over nine thousand exam-style questions. Get instant feedback with detailed explanations—so you actually learn, not just memorize.
>
> Watch your score climb. Our adaptive engine focuses on your weak spots to maximize every study minute.
>
> Get a personalized study plan based on your exam date. We'll tell you exactly what to study, every single day.
>
> Celebrate every win. Badges, streaks, and milestones keep you motivated when the material gets tough.
>
> Ready to pass the CPA exam? Start your free trial today.

**Word count:** ~120 words  
**Pace:** Moderate (approx. 130 WPM)  
**Tone:** Confident, energetic, aspirational

---

---

# VIDEO 2: Dashboard Onboarding

**File:** `/demo-onboarding`  
**Target:** New users who just signed up and landed on the dashboard  
**Purpose:** "Here's what to do next" — reduce overwhelm, guide first steps  
**URL:** https://passcpa-dev.web.app/demo-onboarding  
**Use in:** WelcomeVideoCard on Dashboard for first-time users  
**Duration:** ~29 seconds (5 scenes)  
**Ends with:** 3 actionable buttons that navigate to those sections  

---

## Voiceover Script — Dashboard Onboarding

### Scene 1: Welcome (4s)
*["Let's Get You to 75+" headline, 3 paths appear]*

> **"Welcome to VoraPrep! Let me show you three ways to start studying right now."**

---

### Scene 2: Lessons (7s)
*[Lesson content appears: ASC 606 Five-Step Model with steps, mnemonic, quiz]*

> **"First, Lessons. Our lessons break down complex topics into clear, digestible steps—with memory tricks and quick quizzes built right in. Learn the material before you practice."**

---

### Scene 3: Practice (6s)
*[MCQ appears, answer selected, explanation shows]*

> **"Second, Practice. Thousands of CPA-style questions with instant feedback. Every explanation shows you exactly why the answer is correct."**

---

### Scene 4: Study Plan (6s)
*[4-step wizard: exam date, sections, hours, plan generated]*

> **"Third, your Study Plan. Tell us your exam date and available hours—we'll build a day-by-day roadmap to get you exam-ready on time."**

---

### Scene 5: Choose (6s)
*[3 buttons appear: Start a Lesson, Practice Questions, Create Study Plan]*

> **"So—what would you like to do first? Pick a path and let's get started."**

---

## Full Narration (Dashboard Onboarding)

> Welcome to VoraPrep! Let me show you three ways to start studying right now.
>
> First, Lessons. Our lessons break down complex topics into clear, digestible steps—with memory tricks and quick quizzes built right in. Learn the material before you practice.
>
> Second, Practice. Thousands of CPA-style questions with instant feedback. Every explanation shows you exactly why the answer is correct.
>
> Third, your Study Plan. Tell us your exam date and available hours—we'll build a day-by-day roadmap to get you exam-ready on time.
>
> So—what would you like to do first? Pick a path and let's get started.

**Word count:** ~105 words  
**Pace:** Moderate (approx. 130 WPM)  
**Tone:** Warm, friendly, encouraging—like a helpful guide

---

## Recording Instructions

### Setup
1. **Browser:** Chrome, 1920x1080 resolution
2. **Screen recorder:** OBS, Loom, or built-in (macOS/Windows)
3. **Clear browser cache** to ensure fresh animations

### For Landing Page Video (`/demo-showcase`)
1. Navigate to https://passcpa-dev.web.app/demo-showcase
2. Start recording
3. Let it auto-play through all 7 scenes (~31 seconds)
4. Stop recording after "Start Free Trial" appears
5. Trim any dead time at start/end

### For Dashboard Onboarding Video (`/demo-onboarding`)
1. Navigate to https://passcpa-dev.web.app/demo-onboarding
2. Start recording
3. Let it auto-play through all 5 scenes (~27 seconds)
4. Stop recording after the 3 action buttons appear
5. Trim any dead time

### Controls (Both Videos)
- **Pause/Play:** Spacebar or click the ⏸️ button
- **Skip to scene:** Click the scene tabs at bottom
- **Restart:** Click "Restart" button
- **Manual advance:** Click ⏭️ button

---

## Integration

### WelcomeVideoCard
The `WelcomeVideoCard` component on the dashboard can embed either:
1. **External video** (YouTube/Loom) — Set `WELCOME_VIDEO_URL` in the component
2. **Link to demo-onboarding** — Button that opens `/demo-onboarding`

### Landing Page
Embed the recorded `/demo-showcase` video on:
- `/cpa` landing page
- Marketing materials
- Social media (trim to key highlights)

---

## Legacy: Demo Walkthrough Page

**URL:** https://passcpa-dev.web.app/demo-walkthrough

The simpler tab-based demo page is still available for manual screen recording if needed.

---

## Tools

- **Screen recording:** Loom, Screen Studio, or QuickTime
- **Editing:** Descript (for captions + voiceover), iMovie, or Premiere
- **Hosting:** YouTube (unlisted) or Loom for easy embedding

---

## After Recording

1. Upload to YouTube (unlisted) or get Loom embed URL
2. Update `WELCOME_VIDEO_URL` in `/src/components/WelcomeVideoCard.tsx`:
   ```typescript
   const WELCOME_VIDEO_URL: string = 'https://www.youtube.com/embed/YOUR_VIDEO_ID';
   ```
3. Test on Desktop and Mobile
4. Ship it! 🚀

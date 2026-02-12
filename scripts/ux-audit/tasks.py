"""
Task prompt definitions for VoraPrep UX audits.

Each task is a structured prompt that tells the browser-use agent
what to do. The agent will autonomously navigate, interact, take
screenshots, and report findings.
"""

from typing import TypedDict


class AuditTask(TypedDict):
    id: str
    name: str
    description: str
    prompt: str
    requires_auth: bool
    estimated_steps: int


# ============================================================================
# Shared prompt fragments
# ============================================================================

REPORT_FORMAT = """

## Report Format

Structure your findings as follows:

### Summary
One paragraph overall assessment.

### Issues Found
For each issue:
- **Severity**: Critical / High / Medium / Low / Cosmetic
- **Location**: Page or component where the issue occurs
- **Description**: What's wrong
- **Steps to Reproduce**: How to trigger it
- **Expected Behavior**: What should happen
- **Screenshot**: Reference the screenshot filename

### Positive Observations
Things that work well or are particularly well-designed.

### Recommendations
Prioritized list of improvements.
"""

ACCESSIBILITY_CHECKS = """
- Check that all interactive elements are keyboard-accessible
- Verify color contrast is sufficient (text should be readable)
- Confirm images/icons have alt text or aria-labels
- Check that focus indicators are visible
- Verify screen reader landmarks (header, nav, main, footer)
"""

# ============================================================================
# Auth Tasks
# ============================================================================

LOGIN_FLOW = AuditTask(
    id="login",
    name="Login Flow Audit",
    description="Test the complete authentication flow including login, validation, and error states.",
    requires_auth=False,
    estimated_steps=20,
    prompt="""
You are a UX auditor testing the login flow of VoraPrep, a professional exam prep application.

## Instructions

1. Navigate to the app's login page
2. Try submitting with empty fields — note the validation messages
3. Try an invalid email format — note the error handling
4. Try a valid email with wrong password — note the error message (should NOT reveal whether the email exists)
5. Log in with the provided credentials
6. After successful login, note:
   - Where you land (dashboard? onboarding?)
   - How long the transition takes
   - Whether there's a loading indicator during auth
7. Log out and verify you're redirected appropriately
8. Check if there's a "Forgot Password" flow and test it

## What to Look For
- Error messages should be helpful but security-conscious
- Loading states during auth operations
- Smooth transitions between auth states
- Password field should have show/hide toggle
- Social login options (Google) should work if present
- Mobile-friendly form layout
"""
    + REPORT_FORMAT,
)

SIGNUP_FLOW = AuditTask(
    id="signup",
    name="Signup Flow Audit",
    description="Test the user registration and onboarding experience.",
    requires_auth=False,
    estimated_steps=25,
    prompt="""
You are a UX auditor testing the signup flow of VoraPrep.

## Instructions

1. Navigate to the signup page
2. Check what information is required (email, password, name?)
3. Test field validation:
   - Too-short password
   - Invalid email
   - Missing required fields
4. Check if there's Google OAuth signup
5. After account creation, observe the onboarding flow:
   - Course selection
   - Exam date picker
   - Study plan setup
   - Any welcome tour
6. Note how intuitive the flow is for a first-time user

## What to Look For
- Is the value proposition clear before signup?
- How many steps to get started?
- Can you skip the onboarding and come back later?
- Password strength indicator?
- Terms of service / privacy policy links?
"""
    + REPORT_FORMAT,
)

# ============================================================================
# Dashboard & Navigation Tasks
# ============================================================================

DASHBOARD_AUDIT = AuditTask(
    id="dashboard",
    name="Dashboard Audit",
    description="Audit the main study dashboard for usability, information architecture, and visual design.",
    requires_auth=True,
    estimated_steps=30,
    prompt="""
You are a UX auditor examining the main study dashboard of VoraPrep for the {course_name} course.

## Instructions

1. After logging in, navigate to the main dashboard for {course_name}
2. Take screenshots of the full dashboard
3. Evaluate the information hierarchy:
   - What's the most prominent element? Is it the right thing?
   - Can users quickly see their progress?
   - Is the next action clear (what should I study next)?
4. Check all dashboard widgets/cards:
   - Study streak / daily progress
   - Score prediction
   - Section breakdown
   - Recent activity
5. Test responsive behavior — resize the browser to tablet and mobile widths
6. Check dark mode toggle and verify all elements are visible
7. Navigate through all sidebar/menu items

## What to Look For
- Information overload vs. useful density
- Clear call-to-action for study sessions
- Motivational elements (streaks, progress bars)
- Loading skeleton states
- Empty states (what does a new user see?)
- Consistent spacing, alignment, typography
"""
    + REPORT_FORMAT,
)

NAVIGATION_AUDIT = AuditTask(
    id="navigation",
    name="Navigation & Layout Audit",
    description="Test all navigation paths, breadcrumbs, back buttons, and page transitions.",
    requires_auth=True,
    estimated_steps=35,
    prompt="""
You are a UX auditor testing navigation and layout across VoraPrep for the {course_name} course.

## Instructions

1. Map out all navigation paths from the dashboard
2. Test the sidebar/top navigation:
   - Are all links working?
   - Is the current page highlighted?
   - Do nested items expand/collapse properly?
3. Test breadcrumbs on inner pages
4. Test the browser back button — does it work correctly on all pages?
5. Test deep linking — can you bookmark and return to specific pages?
6. Check page transitions and loading states
7. Look for dead ends (pages with no way to navigate away)
8. Test the course switcher — can you switch between courses smoothly?

## What to Look For
- Consistent nav structure across all pages
- Clear indication of current location
- No broken links or 404 pages
- Smooth transitions (not jarring full-page reloads)
- Back button behavior matches user expectations
- Mobile hamburger menu works correctly
"""
    + REPORT_FORMAT,
)

# ============================================================================
# Core Study Feature Tasks
# ============================================================================

PRACTICE_MODE_AUDIT = AuditTask(
    id="practice",
    name="Practice Mode Audit",
    description="Test the MCQ practice session experience end-to-end.",
    requires_auth=True,
    estimated_steps=40,
    prompt="""
You are a UX auditor testing the practice mode (MCQ questions) in VoraPrep for the {course_name} course.

## Instructions

1. Navigate to the practice area for {course_name}
2. Start a practice session. Note:
   - Can you configure the session? (section, # questions, difficulty)
   - How quickly does it start?
3. Answer 5-8 questions, mixing correct and incorrect answers:
   - Answer one correctly — check the feedback
   - Answer one incorrectly — check the explanation
   - Skip one if possible
   - Flag/bookmark one for review
4. Evaluate the question display:
   - Is the question text readable?
   - Are options clearly distinguished?
   - Is there a question counter (3 of 25)?
   - Can you navigate between questions?
5. Complete the session and review the results screen:
   - Score summary
   - Time taken
   - Per-question review
   - Performance by topic/section
6. Check if there's a "review missed questions" feature

## What to Look For
- Question text rendering (markdown, formulas, tables)
- Clear correct/incorrect visual feedback
- Explanation quality and readability
- Progress indicators
- Keyboard shortcuts (1-4 for options, Enter to submit)
- No answer bias (are options in consistent format?)
- Timer visibility without being anxiety-inducing
"""
    + REPORT_FORMAT,
)

EXAM_SIMULATOR_AUDIT = AuditTask(
    id="exam-simulator",
    name="Exam Simulator Audit",
    description="Test the full exam simulation experience.",
    requires_auth=True,
    estimated_steps=35,
    prompt="""
You are a UX auditor testing the exam simulator in VoraPrep for the {course_name} course.

## Instructions

1. Navigate to the exam simulator for {course_name}
2. Check the exam setup screen:
   - Section selection
   - Exam format explanation
   - Time limit display
3. Start an exam simulation
4. Check the exam interface:
   - Timer countdown
   - Question navigation panel
   - Flag/review markers
   - Section breaks (if multi-section)
5. Answer a few questions, flag some for review
6. Navigate between questions using the panel
7. Check the review screen before submission
8. Submit and evaluate the results page:
   - Score display (compared to passing score)
   - Detailed breakdown
   - Blueprint area performance

## What to Look For
- Does it feel like a real exam? (Prometric-style UI)
- Timer pressure without excessive anxiety
- Clear section boundaries
- Review functionality before final submission
- Results compared to passing threshold (75 for CPA)
- Can users retake specific sections?
"""
    + REPORT_FORMAT,
)

FLASHCARDS_AUDIT = AuditTask(
    id="flashcards",
    name="Flashcards Audit",
    description="Test the flashcard study experience.",
    requires_auth=True,
    estimated_steps=25,
    prompt="""
You are a UX auditor testing the flashcard feature in VoraPrep for the {course_name} course.

## Instructions

1. Navigate to the flashcards area for {course_name}
2. Check available decks — organized by section/topic?
3. Start a flashcard session
4. Evaluate the card interaction:
   - Flip animation (tap/click to reveal)
   - Swipe gestures (know it / don't know it)
   - Card content readability
5. Test 8-10 cards. Note:
   - Front/back content quality
   - Spaced repetition indicators
   - Progress through the deck
6. Check deck completion screen
7. Look for custom deck creation

## What to Look For
- Intuitive flip interaction
- Clear "I know this" vs "Still learning" sorting
- Spaced repetition scheduling (SRS)
- Progress indicators per deck
- Content formatting (bold, formulas, lists)
- Touch-friendly on mobile viewports
"""
    + REPORT_FORMAT,
)

LESSONS_AUDIT = AuditTask(
    id="lessons",
    name="Lessons Audit",
    description="Test the lesson/study material reading experience.",
    requires_auth=True,
    estimated_steps=30,
    prompt="""
You are a UX auditor testing the lessons/study material in VoraPrep for the {course_name} course.

## Instructions

1. Navigate to the lessons area for {course_name}
2. Browse the lesson catalog:
   - How are lessons organized? (by section, topic)
   - Is there a clear progression path?
   - Can you filter/search lessons?
3. Open a lesson and evaluate:
   - Content layout and readability
   - Typography (headings, body text, code)
   - Images, diagrams, tables
   - Estimated reading time
   - Completion tracking
4. Navigate between lessons (next/previous)
5. Check for interactive elements:
   - In-lesson quizzes
   - Key term highlights
   - Example problems
6. Mark a lesson complete and verify progress updates

## What to Look For
- Reading experience (font size, line height, content width)
- Content density — not overwhelming but substantive
- Visual hierarchy (headings, subheadings, callouts)
- Progress persistence (can you resume where you left off?)
- Related content suggestions
- Print-friendly layouts
"""
    + REPORT_FORMAT,
)

# ============================================================================
# Settings & Profile Tasks
# ============================================================================

SETTINGS_AUDIT = AuditTask(
    id="settings",
    name="Settings & Profile Audit",
    description="Test user settings, profile management, and preferences.",
    requires_auth=True,
    estimated_steps=20,
    prompt="""
You are a UX auditor testing the settings and profile area of VoraPrep.

## Instructions

1. Navigate to settings/profile page
2. Check available settings:
   - Profile info (name, email, avatar)
   - Course/exam selection
   - Exam date setting
   - Study plan preferences
   - Notification preferences
   - Theme (dark/light mode)
   - Account management (password change, delete account)
3. Try editing profile information
4. Check subscription/billing management
5. Test the course switcher
6. Verify exam date picker works correctly

## What to Look For
- All settings save and persist correctly
- Clear save/cancel affordances
- Confirmation for destructive actions (delete account)
- Subscription status clearly displayed
- Easy course switching without data loss
"""
    + REPORT_FORMAT,
)

# ============================================================================
# Visual & Accessibility Tasks
# ============================================================================

DARK_MODE_AUDIT = AuditTask(
    id="dark-mode",
    name="Dark Mode Audit",
    description="Test dark mode across all pages for visual consistency.",
    requires_auth=True,
    estimated_steps=30,
    prompt="""
You are a UX auditor testing dark mode across VoraPrep for the {course_name} course.

## Instructions

1. Enable dark mode via the theme toggle
2. Visit EVERY major page and take a screenshot:
   - Dashboard
   - Practice mode (question screen)
   - Exam simulator
   - Flashcards
   - Lessons (reading view)
   - Settings
   - Analytics/progress pages
3. For each page, check:
   - Text readability (sufficient contrast)
   - No pure white text on dark backgrounds (#fff → use softer white)
   - Borders and dividers visible but subtle
   - Charts/graphs adapt to dark mode
   - Images don't look jarring
   - No "flash of light mode" when navigating
4. Toggle back to light mode and verify it switches cleanly

## What to Look For
- Consistent dark palette (not just inverted colors)
- All components properly themed (modals, dropdowns, tooltips)
- No white "flash" during page transitions
- Proper WCAG contrast ratios (4.5:1 for body text)
- Charts and data visualizations readable
- Toggle preference persists across sessions
"""
    + REPORT_FORMAT,
)

RESPONSIVE_AUDIT = AuditTask(
    id="responsive",
    name="Responsive Design Audit",
    description="Test the app at various viewport sizes.",
    requires_auth=True,
    estimated_steps=35,
    prompt="""
You are a UX auditor testing responsive design across VoraPrep for the {course_name} course.

## Instructions

Test at these viewport widths (resize the browser):
- 1440px (desktop)
- 1024px (tablet landscape)
- 768px (tablet portrait)
- 375px (mobile)

For each viewport, check these pages:
1. Dashboard — do widgets stack properly?
2. Practice mode — is the question readable?
3. Flashcards — does the flip animation work?
4. Lessons — is content width appropriate?
5. Navigation — does it collapse to hamburger menu?

## What to Look For
- No horizontal scrolling at any viewport
- Touch targets are at least 44x44px on mobile
- Text doesn't overflow containers
- Images scale appropriately
- Modal dialogs fit the viewport
- Tables become scrollable on mobile (not broken)
- Hamburger menu is accessible and functional
"""
    + REPORT_FORMAT,
)

ACCESSIBILITY_AUDIT = AuditTask(
    id="accessibility",
    name="Accessibility (a11y) Audit",
    description="Test keyboard navigation, screen reader support, and WCAG compliance.",
    requires_auth=True,
    estimated_steps=30,
    prompt="""
You are a UX auditor testing accessibility across VoraPrep for the {course_name} course.

## Instructions

1. Test keyboard navigation:
   - Can you tab through all interactive elements?
   - Is focus order logical (left-to-right, top-to-bottom)?
   - Are focus indicators visible?
   - Can you activate buttons with Enter/Space?
   - Can you close modals with Escape?
   - Are there skip-to-content links?

2. Check ARIA and semantic HTML:
   - Page has proper heading hierarchy (h1 → h2 → h3)
   - Interactive elements have aria-labels where needed
   - Form inputs have associated labels
   - Error messages are linked to form fields
   - Live regions announce dynamic content changes

3. Check color and contrast:
   - Body text has 4.5:1 contrast ratio
   - Large text has 3:1 contrast ratio
   - Don't rely on color alone to convey information
   - Links are distinguishable from body text without color

4. Test specific components:
   - Question options (radio buttons) — keyboard selectable?
   - Timer — announced to screen readers?
   - Progress bars — have aria-valuenow?
   - Toast notifications — use role="alert"?
   - Modal dialogs — trap focus correctly?

""" + ACCESSIBILITY_CHECKS + REPORT_FORMAT,
)

# ============================================================================
# Landing & Marketing Tasks
# ============================================================================

LANDING_PAGE_AUDIT = AuditTask(
    id="landing",
    name="Landing Page Audit",
    description="Audit the public-facing landing page for conversion and UX.",
    requires_auth=False,
    estimated_steps=20,
    prompt="""
You are a UX auditor reviewing the VoraPrep landing page for the {course_name} course.

## Instructions

1. Navigate to the course landing page
2. Evaluate the hero section:
   - Is the value proposition clear within 3 seconds?
   - Call-to-action (CTA) visibility and clarity
   - Trust signals (testimonials, credentials, pass rates)
3. Scroll through the full page:
   - Feature highlights
   - Pricing section
   - FAQ section
   - Social proof
4. Test all CTAs — do they work? Where do they lead?
5. Check footer links
6. Test responsive layout (mobile view)

## What to Look For
- Clear USP: "AI-powered exam prep that gets you to 75+"
- Pricing transparency
- Mobile-first design
- Page load speed (perceived performance)
- No broken images or placeholder content
- SEO elements (proper headings, meta tags)
"""
    + REPORT_FORMAT,
)


# ============================================================================
# Task Registry
# ============================================================================

ALL_TASKS: dict[str, AuditTask] = {
    "login": LOGIN_FLOW,
    "signup": SIGNUP_FLOW,
    "dashboard": DASHBOARD_AUDIT,
    "navigation": NAVIGATION_AUDIT,
    "practice": PRACTICE_MODE_AUDIT,
    "exam-simulator": EXAM_SIMULATOR_AUDIT,
    "flashcards": FLASHCARDS_AUDIT,
    "lessons": LESSONS_AUDIT,
    "settings": SETTINGS_AUDIT,
    "dark-mode": DARK_MODE_AUDIT,
    "responsive": RESPONSIVE_AUDIT,
    "accessibility": ACCESSIBILITY_AUDIT,
    "landing": LANDING_PAGE_AUDIT,
}

# Tasks that can run without authentication
PUBLIC_TASKS = {"login", "signup", "landing"}

# Tasks that need a specific course context
COURSE_TASKS = {
    "dashboard",
    "navigation",
    "practice",
    "exam-simulator",
    "flashcards",
    "lessons",
    "dark-mode",
    "responsive",
    "accessibility",
    "landing",
}

# Minimal audit: fast smoke test across critical paths
SMOKE_TEST_TASKS = ["login", "dashboard", "practice", "navigation"]

# Full audit: comprehensive UX review
FULL_AUDIT_TASKS = list(ALL_TASKS.keys())

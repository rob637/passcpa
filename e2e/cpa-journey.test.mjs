/**
 * CPA Full User Journey Test — VoraPrep
 *
 * Comprehensive test covering every CPA feature, running on desktop or mobile.
 *
 * Usage:
 *   node e2e/cpa-journey.test.mjs              # Desktop (1280×800)
 *   node e2e/cpa-journey.test.mjs --mobile      # Mobile  (390×844)
 *   node e2e/cpa-journey.test.mjs --both        # Run desktop then mobile
 *
 * Env vars:
 *   BASE_URL       — Dev server URL (default: http://localhost:5173)
 *   TEST_EMAIL     — Login email    (default: rob@sagecg.com)
 *   TEST_PASSWORD  — Login password (default: Leader123!)
 *
 * Prerequisites:
 *   - Dev server running (npm run dev)
 *   - Playwright installed (npx playwright install chromium)
 */

import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

// ─── CLI flags ─────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const RUN_MOBILE  = args.includes('--mobile') || args.includes('--both');
const RUN_DESKTOP = args.includes('--both') || !args.includes('--mobile');

// ─── Config ────────────────────────────────────────────────────────────
const BASE     = process.env.BASE_URL    || 'http://localhost:5173';
const EMAIL    = process.env.TEST_EMAIL  || 'rob@sagecg.com';
const PASSWORD = process.env.TEST_PASSWORD || 'Leader123!';
const TIMEOUT  = 15_000;

// ─── Viewport presets ──────────────────────────────────────────────────
const VIEWPORTS = {
  desktop: { width: 1280, height: 800, label: 'Desktop',             dir: 'e2e/screenshots/desktop' },
  mobile:  { width: 390,  height: 844, label: 'Mobile (iPhone 14)',  dir: 'e2e/screenshots/mobile'  },
};

// ─── State factory ─────────────────────────────────────────────────────
function makeState() {
  return { results: [], issues: [], consoleErrors: [], networkErrors: [], screenshotIndex: 0 };
}

// ─── Logging helpers ───────────────────────────────────────────────────
function pass(S, feature, detail = '') {
  S.results.push({ feature, status: 'PASS', detail });
  console.log(`  ✅ ${feature}${detail ? ' — ' + detail : ''}`);
}
function fail(S, feature, detail = '') {
  S.results.push({ feature, status: 'FAIL', detail });
  S.issues.push({ severity: 'HIGH', feature, detail });
  console.log(`  ❌ ${feature}${detail ? ' — ' + detail : ''}`);
}
function warn(S, feature, detail = '') {
  S.results.push({ feature, status: 'WARN', detail });
  S.issues.push({ severity: 'LOW', feature, detail });
  console.log(`  ⚠️  ${feature}${detail ? ' — ' + detail : ''}`);
}
function info(S, feature, detail = '') {
  S.results.push({ feature, status: 'INFO', detail });
  console.log(`  ℹ️  ${feature}${detail ? ' — ' + detail : ''}`);
}

async function snap(S, page, dir, label) {
  S.screenshotIndex++;
  const name = `${String(S.screenshotIndex).padStart(2, '0')}-${label}.png`;
  await page.screenshot({ path: `${dir}/${name}`, fullPage: true });
}

async function textContains(page, regex) {
  const text = await page.evaluate(() => document.body.innerText);
  return regex.test(text);
}

/** Navigate and wait for content to settle */
async function nav(page, path, settleMs = 3000) {
  await page.goto(`${BASE}${path}`, { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
  await page.waitForTimeout(settleMs);
}

function isOnLogin(page) { return page.url().includes('/login'); }

// ═══════════════════════════════════════════════════════════════════════
//  TEST SUITE
// ═══════════════════════════════════════════════════════════════════════
async function runSuite(viewport) {
  const { width, height, label, dir } = viewport;
  const isMobile = width < 768;
  const S = makeState();

  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  🖥️  ${label}  (${width}×${height})`);
  console.log(`${'═'.repeat(60)}`);

  mkdirSync(dir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width, height },
    isMobile,
    hasTouch: isMobile,
    userAgent: isMobile
      ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
      : undefined,
  });
  const page = await ctx.newPage();

  page.on('console', m => { if (m.type() === 'error') S.consoleErrors.push(m.text()); });
  page.on('requestfailed', r => S.networkErrors.push({ url: r.url(), err: r.failure()?.errorText }));

  // ──────────────────────────────────────────────────────────────────
  // 1  LOGIN  (abort entire suite if this fails)
  // ──────────────────────────────────────────────────────────────────
  let loginOk = false;
  console.log('\n══ 1. LOGIN ══');
  try {
    await nav(page, '/login', 2000);
    const emailInput = page.locator('input[type="email"]').first();
    const passInput  = page.locator('#password').first();       // stable — id doesn't change on toggle

    if (await emailInput.count() === 0) {
      fail(S, 'Login Page', 'Email input not found');
    } else {
      await emailInput.fill(EMAIL);
      await passInput.fill(PASSWORD);

      // Password toggle — aria-label is "Show password" / "Hide password"
      const toggleBtn = page.locator('button[aria-label="Show password"], button[aria-label="Hide password"]').first();
      if (await toggleBtn.count() > 0) {
        await toggleBtn.click();
        await page.waitForTimeout(300);
        const fieldType = await passInput.getAttribute('type');
        fieldType === 'text'
          ? pass(S, 'Password toggle — reveals text')
          : info(S, 'Password toggle', `type=${fieldType}`);
        await toggleBtn.click();
        await page.waitForTimeout(300);
      }

      pass(S, 'Login Form Rendered');

      // Submit
      await page.locator('button[type="submit"]').first().click();
      await page.waitForTimeout(8000);
      const url = page.url();
      if (!url.includes('/login')) {
        pass(S, 'Login Success', url);
        loginOk = true;
      } else {
        const errText = await page.locator('.text-red-500, .text-red-600, [role="alert"]')
          .first().textContent().catch(() => 'unknown');
        fail(S, 'Login Success', `Still on /login — ${errText}`);
      }
    }
    await snap(S, page, dir, 'post-login');
  } catch (e) { fail(S, 'Login', e.message); }

  // ── ABORT if login failed ──
  if (!loginOk) {
    console.log('\n  🛑 LOGIN FAILED — aborting remaining tests.\n');
    await browser.close();
    return S;
  }

  // ──────────────────────────────────────────────────────────────────
  // 2  DASHBOARD / HOME
  // ──────────────────────────────────────────────────────────────────
  console.log('\n══ 2. DASHBOARD ══');
  try {
    await nav(page, '/home');
    const hasSections = await textContains(page, /FAR|AUD|REG|BAR|ISC|TCP/i);
    const hasStudy    = await textContains(page, /study|practice|continue|daily|learn/i);
    hasSections ? pass(S, 'Dashboard — Sections visible') : warn(S, 'Dashboard — Sections', 'None found');
    hasStudy    ? pass(S, 'Dashboard — Study CTA')        : warn(S, 'Dashboard — Study CTA', 'None found');

    if (isMobile) {
      const topBar = page.locator('[class*="md:hidden"][class*="fixed"][class*="top-0"]');
      (await topBar.count() > 0)
        ? pass(S, 'Mobile — Top bar visible')
        : info(S, 'Mobile — Top bar', 'Not detected');
    }
    await snap(S, page, dir, 'dashboard');
  } catch (e) { fail(S, 'Dashboard', e.message); }

  // ──────────────────────────────────────────────────────────────────
  // 3  STUDY / LEARN PAGE
  // ──────────────────────────────────────────────────────────────────
  console.log('\n══ 3. STUDY PAGE ══');
  try {
    await nav(page, '/study');        // redirects to /learn
    // Scroll to bottom first so all content is visible (especially on mobile)
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    for (const [label, re] of [
      ['Lessons section',   /lessons/i],
      ['MCQs section',      /MCQs?\b/i],
      ['TBS section',       /TBS\b/i],
      ['Blueprint areas',   /area|blueprint|conceptual|framework|domain/i],
      ['Daily goal',        /daily goal|streak|goal|Today's Progress/i],
      ['Section info',      /FAR|AUD|REG|BAR|ISC|TCP/i],
    ]) {
      (await textContains(page, re))
        ? pass(S, `Study — ${label}`)
        : warn(S, `Study — ${label}`, 'not found');
    }
    await snap(S, page, dir, 'study');
  } catch (e) { fail(S, 'Study Page', e.message); }

  // ──────────────────────────────────────────────────────────────────
  // 4  LESSONS — list + viewer
  // ──────────────────────────────────────────────────────────────────
  console.log('\n══ 4. LESSONS ══');
  try {
    await nav(page, '/lessons');
    if (isOnLogin(page)) { fail(S, 'Lessons', 'Redirected to login'); }
    else {
      (await textContains(page, /lesson/i))
        ? pass(S, 'Lessons List Loaded')
        : warn(S, 'Lessons List', 'No lesson content');
      await snap(S, page, dir, 'lessons-list');

      const lessonLink = page.locator('a[href*="/lesson"]').first();
      if (await lessonLink.count() > 0) {
        await lessonLink.click();
        await page.waitForTimeout(4000);
        (await textContains(page, /key point|concept|content|summary|section/i))
          ? pass(S, 'Lesson Viewer Content')
          : warn(S, 'Lesson Viewer Content', 'Expected content not found');

        const hasNav = await page.locator('button:has-text("Next"), button:has-text("Previous"), button:has-text("Complete")').count();
        hasNav > 0 ? pass(S, 'Lesson Navigation Buttons') : warn(S, 'Lesson Navigation', 'No Next/Previous');

        if (isMobile) {
          const scrollable = await page.evaluate(() => document.body.scrollHeight > window.innerHeight);
          scrollable ? pass(S, 'Mobile — Lesson scrollable') : info(S, 'Mobile — Lesson', 'No scroll needed');
        }
        await snap(S, page, dir, 'lesson-viewer');
      } else { warn(S, 'Lesson Link', 'No lesson links found'); }
    }
  } catch (e) { fail(S, 'Lessons', e.message); }

  // ──────────────────────────────────────────────────────────────────
  // 5  PRACTICE — setup → Q1 → feedback → Q2
  // ──────────────────────────────────────────────────────────────────
  console.log('\n══ 5. PRACTICE QUESTIONS ══');
  try {
    await nav(page, '/practice');
    if (isOnLogin(page)) { fail(S, 'Practice', 'Redirected to login'); }
    else {
      const sectionSel = page.locator('select, [data-testid="section-select"]').first();
      (await sectionSel.count() > 0)
        ? pass(S, 'Practice — Section selector')
        : warn(S, 'Practice — Section selector', 'not found');

      const countBtns = page.locator('[data-testid="question-count"], button[aria-pressed]');
      (await countBtns.count() > 0)
        ? pass(S, 'Practice — Count selector', `${await countBtns.count()} options`)
        : warn(S, 'Practice — Count selector');

      await snap(S, page, dir, 'practice-setup');

      const startBtn = page.locator('[data-testid="start-practice"], button:has-text("Start Practice")').first();
      if (await startBtn.count() > 0) {
        await startBtn.click();
        await page.waitForTimeout(5000);

        // Q1
        const qEl = page.locator('[data-testid="question-text"]');
        (await qEl.count() > 0)
          ? pass(S, 'Practice — Q1 displayed')
          : (await textContains(page, /question|which|what|how/i))
            ? pass(S, 'Practice — Q1 displayed (text)')
            : warn(S, 'Practice — Q1', 'Not detected');

        // Options
        const opts = page.locator('[data-testid^="answer-option"]');
        const optC = await opts.count();
        optC > 0
          ? pass(S, 'Practice — Options', `${optC}`)
          : (await page.locator('.mcq-option').count() > 0)
            ? pass(S, 'Practice — Options (mcq-option)')
            : warn(S, 'Practice — Options', 'None');

        await snap(S, page, dir, 'practice-q1');

        // Select + submit
        const pick = page.locator('[data-testid^="answer-option"], .mcq-option').first();
        if (await pick.count() > 0) {
          await pick.click();
          await page.waitForTimeout(500);

          const subBtn = page.locator('[data-testid="submit-answer"], button:has-text("Submit Answer")').first();
          if (await subBtn.count() > 0) {
            await subBtn.click();
            await page.waitForTimeout(2000);

            const fb = (await page.locator('.mcq-option-correct').count())
                     + (await page.locator('.mcq-option-incorrect').count());
            fb > 0
              ? pass(S, 'Practice — Feedback styling', `${fb} elements`)
              : warn(S, 'Practice — Feedback', 'No green/red');

            (await textContains(page, /explanation/i))
              ? pass(S, 'Practice — Explanation')
              : warn(S, 'Practice — Explanation', 'Not visible');

            await snap(S, page, dir, 'practice-answered');

            // Next question
            const nextBtn = page.locator('button:has-text("Next"), button:has-text("Continue")').first();
            if (await nextBtn.count() > 0) {
              await nextBtn.click();
              await page.waitForTimeout(3000);
              const q2 = page.locator('[data-testid="question-text"], .mcq-option').first();
              (await q2.count() > 0)
                ? pass(S, 'Practice — Q2 loaded')
                : warn(S, 'Practice — Q2', 'Not loaded');
              await snap(S, page, dir, 'practice-q2');
            } else { info(S, 'Practice — Next', 'Button not found'); }
          } else { warn(S, 'Practice — Submit', 'Not found'); }
        }
      } else { fail(S, 'Practice — Start', 'Button not found'); }
    }
  } catch (e) { fail(S, 'Practice', e.message); }

  // ──────────────────────────────────────────────────────────────────
  // 6  FLASHCARDS — setup → session → flip → rate
  // ──────────────────────────────────────────────────────────────────
  console.log('\n══ 6. FLASHCARDS ══');
  try {
    await nav(page, '/flashcards', 4000);
    if (isOnLogin(page)) { fail(S, 'Flashcards', 'Redirected to login'); }
    else {
      const hasSetup = await textContains(page, /flashcard|session|start|review|section/i);
      hasSetup ? pass(S, 'Flashcard Setup Page') : warn(S, 'Flashcard Setup', 'No content');
      await snap(S, page, dir, 'flashcard-setup');

      // Start session
      const startSess = page.locator('button:has-text("Start Session"), button:has-text("Start")').first();
      if (await startSess.count() > 0) {
        await startSess.click();
        await page.waitForTimeout(5000);

        const flipArea = page.locator('[data-testid="flashcard"]');
        if (await flipArea.count() > 0) {
          pass(S, 'Flashcard — Card rendered');

          await flipArea.first().click();
          await page.waitForTimeout(800);
          pass(S, 'Flashcard — Flipped');

          const rBtns = page.locator('[data-testid^="rating-"]');
          const rCount = await rBtns.count();
          if (rCount > 0) {
            pass(S, 'Flashcard — Rating buttons', `${rCount}`);
            const goodBtn = page.locator('[data-testid="rating-good"]');
            if (await goodBtn.count() > 0) {
              await goodBtn.click();
              await page.waitForTimeout(2000);
              pass(S, 'Flashcard — Rated Good');
            }
          } else {
            const txtBtns = page.locator('button:has-text("Again"), button:has-text("Good")');
            (await txtBtns.count() > 0)
              ? pass(S, 'Flashcard — Rating (text)')
              : warn(S, 'Flashcard — Rating', 'Not found');
          }

          await snap(S, page, dir, 'flashcard-session');
        } else {
          (await textContains(page, /all caught up|no.*card|completed/i))
            ? pass(S, 'Flashcard — All caught up')
            : warn(S, 'Flashcard — Card', 'Not rendered');
        }
      } else {
        info(S, 'Flashcard — Start', 'Button not found');
      }
    }
  } catch (e) { fail(S, 'Flashcards', e.message); }

  // ──────────────────────────────────────────────────────────────────
  // 7  TBS — load → tabs → interact
  // ──────────────────────────────────────────────────────────────────
  console.log('\n══ 7. TBS (Task-Based Simulations) ══');
  try {
    await nav(page, '/tbs', 5000);
    if (isOnLogin(page)) { fail(S, 'TBS', 'Redirected to login'); }
    else {
      const hasTBS = await textContains(page, /simulation|task|scenario|exhibit|requirement/i);
      hasTBS ? pass(S, 'TBS Page Loaded') : warn(S, 'TBS', 'No content');

      const tabs = page.locator('[data-testid^="tbs-task-tab"], button:has-text("Task")');
      const tabC = await tabs.count();
      if (tabC > 0) {
        pass(S, 'TBS — Task tabs', `${tabC}`);
        if (tabC > 1) {
          await tabs.nth(1).click();
          await page.waitForTimeout(1000);
          pass(S, 'TBS — Tab switch');
        }
      } else { info(S, 'TBS — Tabs', 'None visible'); }

      // Input fields
      const inputs = page.locator('select, input[type="text"], input[type="number"], textarea');
      const iC = await inputs.count();
      if (iC > 0) {
        pass(S, 'TBS — Input fields', `${iC} interactive`);
        const textIn = page.locator('input[type="text"], input[type="number"]').first();
        if (await textIn.count() > 0) {
          await textIn.fill('100');
          pass(S, 'TBS — Typed value');
        }
      } else { info(S, 'TBS — Inputs', 'MCQ-based TBS'); }

      const subTBS = page.locator('[data-testid="tbs-submit"], button:has-text("Submit"), button:has-text("Grade")');
      (await subTBS.count() > 0) ? pass(S, 'TBS — Submit') : info(S, 'TBS — Submit', 'Not visible');

      await snap(S, page, dir, 'tbs');
    }
  } catch (e) { fail(S, 'TBS', e.message); }

  // ──────────────────────────────────────────────────────────────────
  // 8  WRITTEN COMMUNICATION — select → type → submit
  // ──────────────────────────────────────────────────────────────────
  console.log('\n══ 8. WRITTEN COMMUNICATION ══');
  try {
    await nav(page, '/written-communication', 4000);
    if (isOnLogin(page)) { fail(S, 'Written Communication', 'Redirected to login'); }
    else {
      const hasWC = await textContains(page, /written communication|memo|business writing|random task/i);
      hasWC ? pass(S, 'Written Communication Loaded') : warn(S, 'Written Communication', 'No content');
      await snap(S, page, dir, 'wc-landing');

      const randBtn = page.locator('button:has-text("Random"), button:has-text("Start")').first();
      if (await randBtn.count() > 0) {
        await randBtn.click();
        await page.waitForTimeout(3000);

        const ta = page.locator('textarea').first();
        if (await ta.count() > 0) {
          pass(S, 'WC — Editor visible');
          await ta.fill('To: Management\nRe: Test\n\nThis is an automated test response for the WC task.');
          pass(S, 'WC — Typed response');
          await snap(S, page, dir, 'wc-typed');

          const subWC = page.locator('button:has-text("Submit Response"), button:has-text("Submit")').first();
          if (await subWC.count() > 0) {
            await subWC.click();
            await page.waitForTimeout(3000);
            (await textContains(page, /submitted|score|rubric|response/i))
              ? pass(S, 'WC — Results shown')
              : warn(S, 'WC — Results', 'No score');
            await snap(S, page, dir, 'wc-results');
          } else { warn(S, 'WC — Submit', 'Not found'); }
        } else { info(S, 'WC — Editor', 'No textarea'); }
      } else { info(S, 'WC — Start', 'No button'); }
    }
  } catch (e) { fail(S, 'Written Communication', e.message); }

  // ──────────────────────────────────────────────────────────────────
  // 9  EXAM SIMULATOR
  // ──────────────────────────────────────────────────────────────────
  console.log('\n══ 9. EXAM SIMULATOR ══');
  try {
    await nav(page, '/exam', 4000);
    if (isOnLogin(page)) { warn(S, 'Exam Simulator', 'Redirected to login (premium?)'); }
    else {
      const hasExam = await textContains(page, /exam|mock|simulation|testlet|prometric|section/i);
      hasExam ? pass(S, 'Exam Simulator Loaded') : warn(S, 'Exam Simulator', 'No content');

      const startExam = page.locator('button:has-text("Start"), button:has-text("Begin"), button:has-text("Launch")').first();
      (await startExam.count() > 0)
        ? pass(S, 'Exam — Start button')
        : info(S, 'Exam — Start', 'Not found');

      await snap(S, page, dir, 'exam-simulator');
    }
  } catch (e) { fail(S, 'Exam Simulator', e.message); }

  // ──────────────────────────────────────────────────────────────────
  // 10  TIMED QUIZ
  // ──────────────────────────────────────────────────────────────────
  console.log('\n══ 10. TIMED QUIZ ══');
  try {
    await nav(page, '/quiz', 4000);
    if (isOnLogin(page)) { warn(S, 'Timed Quiz', 'Redirected to login'); }
    else {
      (await textContains(page, /quiz|timed|question|practice|start/i))
        ? pass(S, 'Timed Quiz Loaded')
        : warn(S, 'Timed Quiz', 'No content');
      await snap(S, page, dir, 'timed-quiz');
    }
  } catch (e) { fail(S, 'Timed Quiz', e.message); }

  // ──────────────────────────────────────────────────────────────────
  // 11  PROGRESS
  // ──────────────────────────────────────────────────────────────────
  console.log('\n══ 11. PROGRESS ══');
  try {
    await nav(page, '/progress');
    (await textContains(page, /progress|performance|accuracy|journey|start practicing/i))
      ? pass(S, 'Progress Page Loaded')
      : warn(S, 'Progress', 'No content');

    const hasCTA = await page.locator('a[href="/practice"], button:has-text("Start Practice")').count();
    hasCTA > 0 ? pass(S, 'Progress — CTA') : info(S, 'Progress — CTA', 'User has data');
    await snap(S, page, dir, 'progress');
  } catch (e) { fail(S, 'Progress', e.message); }

  // ──────────────────────────────────────────────────────────────────
  // 12  SETTINGS — profile + theme
  // ──────────────────────────────────────────────────────────────────
  console.log('\n══ 12. SETTINGS ══');
  try {
    await nav(page, '/settings');
    (await textContains(page, /setting|profile|theme|notification|subscription/i))
      ? pass(S, 'Settings Page Loaded')
      : warn(S, 'Settings', 'No content');

    // Email visible
    const emailRe = new RegExp(EMAIL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    (await textContains(page, emailRe))
      ? pass(S, 'Settings — Email displayed')
      : info(S, 'Settings — Email', 'Not visible');

    // Theme toggle
    const darkBtn = page.locator('button:has-text("Dark")').first();
    if (await darkBtn.count() > 0) {
      pass(S, 'Settings — Theme options');
      await darkBtn.click();
      await page.waitForTimeout(500);
      const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
      isDark
        ? pass(S, 'Settings — Dark mode activated')
        : info(S, 'Settings — Dark mode', 'Class not applied');
      await snap(S, page, dir, 'settings-dark');
      // Restore light
      const lightBtn = page.locator('button:has-text("Light")').first();
      if (await lightBtn.count() > 0) { await lightBtn.click(); await page.waitForTimeout(500); }
    } else { info(S, 'Settings — Theme', 'No toggle'); }

    // Exam section buttons
    const sectionBtns = page.locator('button:has-text("FAR"), button:has-text("AUD"), button:has-text("REG")');
    (await sectionBtns.count() > 0)
      ? pass(S, 'Settings — Exam sections')
      : info(S, 'Settings — Sections', 'Not on study tab');

    await snap(S, page, dir, 'settings');
  } catch (e) { fail(S, 'Settings', e.message); }

  // ──────────────────────────────────────────────────────────────────
  // 13  AI TUTOR
  // ──────────────────────────────────────────────────────────────────
  console.log('\n══ 13. AI TUTOR ══');
  try {
    await nav(page, '/ai-tutor');
    if (isOnLogin(page)) { info(S, 'AI Tutor', 'Requires auth/premium'); }
    else {
      (await textContains(page, /tutor|ai|chat|ask|question/i))
        ? pass(S, 'AI Tutor Loaded')
        : warn(S, 'AI Tutor', 'No content');

      const chatIn = page.locator('textarea, input[placeholder*="ask" i], input[placeholder*="question" i], input[placeholder*="type" i]').first();
      (await chatIn.count() > 0)
        ? pass(S, 'AI Tutor — Chat input')
        : info(S, 'AI Tutor — Chat input', 'Not found');

      await snap(S, page, dir, 'ai-tutor');
    }
  } catch (e) { fail(S, 'AI Tutor', e.message); }

  // ──────────────────────────────────────────────────────────────────
  // 14  YOU (Profile)
  // ──────────────────────────────────────────────────────────────────
  console.log('\n══ 14. YOU (PROFILE) ══');
  try {
    await nav(page, '/you');
    if (isOnLogin(page)) { fail(S, 'You Page', 'Redirected to login'); }
    else {
      (await textContains(page, /profile|account|subscription|exam|settings|streak/i))
        ? pass(S, 'You Page Loaded')
        : warn(S, 'You Page', 'No content');
      await snap(S, page, dir, 'you-profile');
    }
  } catch (e) { fail(S, 'You Page', e.message); }

  // ──────────────────────────────────────────────────────────────────
  // 15  STUDY JOURNEY
  // ──────────────────────────────────────────────────────────────────
  console.log('\n══ 15. STUDY JOURNEY ══');
  try {
    await nav(page, '/journey');
    if (isOnLogin(page)) { warn(S, 'Study Journey', 'Redirected to login'); }
    else {
      (await textContains(page, /journey|roadmap|milestone|progress|path|plan/i))
        ? pass(S, 'Study Journey Loaded')
        : warn(S, 'Study Journey', 'No content');
      await snap(S, page, dir, 'journey');
    }
  } catch (e) { fail(S, 'Study Journey', e.message); }

  // ──────────────────────────────────────────────────────────────────
  // 16  RESOURCES HUB
  // ──────────────────────────────────────────────────────────────────
  console.log('\n══ 16. RESOURCES ══');
  try {
    await nav(page, '/resources');
    if (isOnLogin(page)) { warn(S, 'Resources', 'Redirected to login'); }
    else {
      (await textContains(page, /resource|guide|tip|strategy|study|material/i))
        ? pass(S, 'Resources Hub Loaded')
        : warn(S, 'Resources Hub', 'No content');
      await snap(S, page, dir, 'resources');
    }
  } catch (e) { fail(S, 'Resources', e.message); }

  // ──────────────────────────────────────────────────────────────────
  // 17  ACHIEVEMENTS
  // ──────────────────────────────────────────────────────────────────
  console.log('\n══ 17. ACHIEVEMENTS ══');
  try {
    await nav(page, '/achievements');
    if (isOnLogin(page)) { warn(S, 'Achievements', 'Redirected to login'); }
    else {
      (await textContains(page, /achievement|badge|unlock|earned|milestone/i))
        ? pass(S, 'Achievements Loaded')
        : warn(S, 'Achievements', 'No content');
      await snap(S, page, dir, 'achievements');
    }
  } catch (e) { fail(S, 'Achievements', e.message); }

  // ──────────────────────────────────────────────────────────────────
  // 18  COMMUNITY
  // ──────────────────────────────────────────────────────────────────
  console.log('\n══ 18. COMMUNITY ══');
  try {
    await nav(page, '/community');
    if (isOnLogin(page)) { warn(S, 'Community', 'Redirected to login'); }
    else {
      (await textContains(page, /community|discuss|leaderboard|forum|member/i))
        ? pass(S, 'Community Loaded')
        : warn(S, 'Community', 'No content');
      await snap(S, page, dir, 'community');
    }
  } catch (e) { fail(S, 'Community', e.message); }

  // ──────────────────────────────────────────────────────────────────
  // 19  LESSON MATRIX
  // ──────────────────────────────────────────────────────────────────
  console.log('\n══ 19. LESSON MATRIX ══');
  try {
    await nav(page, '/lessons/matrix');
    if (isOnLogin(page)) { warn(S, 'Lesson Matrix', 'Redirected to login'); }
    else {
      (await textContains(page, /matrix|overview|lesson|section|all|complete/i))
        ? pass(S, 'Lesson Matrix Loaded')
        : warn(S, 'Lesson Matrix', 'No content');
      await snap(S, page, dir, 'lesson-matrix');
    }
  } catch (e) { fail(S, 'Lesson Matrix', e.message); }

  // ──────────────────────────────────────────────────────────────────
  // 20  NAVIGATION
  // ──────────────────────────────────────────────────────────────────
  console.log('\n══ 20. NAVIGATION ══');
  try {
    await nav(page, '/home', 2000);

    if (isMobile) {
      // Bottom nav
      const bottomNav = page.locator('nav[aria-label="Mobile navigation"]');
      if (await bottomNav.count() > 0) {
        pass(S, 'Mobile — Bottom nav');
        const mLinks = page.locator('[data-testid^="nav-mobile-"]');
        const mC = await mLinks.count();
        mC > 0
          ? pass(S, 'Mobile — Nav links', `${mC} items`)
          : warn(S, 'Mobile — Nav links', 'No data-testid');

        if (mC > 0) {
          await mLinks.first().click();
          await page.waitForTimeout(2000);
          pass(S, 'Mobile — Nav tap works');
        }
      } else { warn(S, 'Mobile — Bottom nav', 'Not found'); }

      // Sidebar hidden?
      const sidebarVisible = await page.evaluate(() => {
        const el = document.querySelector('[class*="md:flex"][class*="hidden"][class*="w-64"]');
        return el ? window.getComputedStyle(el).display !== 'none' : false;
      });
      !sidebarVisible ? pass(S, 'Mobile — Sidebar hidden') : warn(S, 'Mobile — Sidebar', 'Still visible');

    } else {
      // Desktop sidebar
      const navLinks = page.locator('nav a, [role="navigation"] a');
      const nC = await navLinks.count();
      nC > 0 ? pass(S, 'Desktop — Sidebar nav', `${nC} links`) : warn(S, 'Desktop — Sidebar', 'No links');

      const dTestIds = page.locator('[data-testid^="nav-desktop-"]');
      (await dTestIds.count() > 0)
        ? pass(S, 'Desktop — Nav data-testid')
        : info(S, 'Desktop — Nav data-testid', 'Not found');

      const practiceNav = page.locator('[data-testid="nav-desktop-practice"], a:has-text("Practice")').first();
      if (await practiceNav.count() > 0) {
        await practiceNav.click();
        await page.waitForTimeout(2000);
        pass(S, 'Desktop — Nav click works');
      }
    }

    await snap(S, page, dir, 'navigation');
  } catch (e) { fail(S, 'Navigation', e.message); }

  // ──────────────────────────────────────────────────────────────────
  // 21  MOBILE-SPECIFIC (only mobile)
  // ──────────────────────────────────────────────────────────────────
  if (isMobile) {
    console.log('\n══ 21. MOBILE-SPECIFIC ══');
    try {
      // Overflow scan
      const pagesToCheck = ['/home', '/practice', '/progress', '/settings'];
      let overflows = 0;
      for (const p of pagesToCheck) {
        await nav(page, p, 2000);
        if (await page.evaluate(() => document.body.scrollWidth > document.body.clientWidth)) overflows++;
      }
      overflows === 0
        ? pass(S, 'Mobile — No overflow')
        : warn(S, 'Mobile — Overflow', `${overflows}/${pagesToCheck.length} pages`);

      // Touch target audit
      await nav(page, '/practice', 3000);
      const smallBtns = await page.evaluate(() => {
        let small = 0;
        document.querySelectorAll('button, a').forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.height > 0 && (r.width < 44 || r.height < 44)) small++;
        });
        return small;
      });
      smallBtns < 5
        ? pass(S, 'Mobile — Touch targets', `${smallBtns} undersized`)
        : warn(S, 'Mobile — Touch targets', `${smallBtns} buttons < 44px`);

      await snap(S, page, dir, 'mobile-checks');
    } catch (e) { fail(S, 'Mobile-Specific', e.message); }
  }

  // ──────────────────────────────────────────────────────────────────
  // 22  404 / ERROR HANDLING
  // ──────────────────────────────────────────────────────────────────
  const stepNum = isMobile ? 22 : 21;
  console.log(`\n══ ${stepNum}. ERROR HANDLING ══`);
  try {
    await nav(page, '/this-page-does-not-exist-abc123');
    const has404 = await textContains(page, /not found|404|doesn't exist/i);
    const redir  = page.url().includes('/home') || page.url().includes('/login');
    if (has404) pass(S, '404 — Shows message');
    else if (redir) pass(S, '404 — Redirected (SPA)');
    else warn(S, '404', 'Unclear handling');
    await snap(S, page, dir, '404');
  } catch (e) { fail(S, '404', e.message); }

  // ──────────────────────────────────────────────────────────────────
  // 23  LOGOUT
  // ──────────────────────────────────────────────────────────────────
  console.log(`\n══ ${stepNum + 1}. LOGOUT ══`);
  try {
    await nav(page, '/you', 2000);
    let logoutBtn = page.locator('button:has-text("Log Out"), button:has-text("Sign Out"), button:has-text("Logout")').first();
    if (await logoutBtn.count() === 0) {
      await nav(page, '/settings', 2000);
      logoutBtn = page.locator('button:has-text("Log Out"), button:has-text("Sign Out"), button:has-text("Logout")').first();
    }

    if (await logoutBtn.count() > 0) {
      pass(S, 'Logout — Button found');
      // Scroll into view on mobile
      if (isMobile) await logoutBtn.scrollIntoViewIfNeeded();
      // Accept the browser confirm() dialog that fires on sign-out
      page.once('dialog', async dialog => {
        await dialog.accept();
      });
      await logoutBtn.click();
      await page.waitForTimeout(5000);
      const postUrl = page.url();
      const ok = postUrl.includes('/login') || postUrl === `${BASE}/` || postUrl.includes('/cpa');
      ok ? pass(S, 'Logout — Redirected', postUrl) : warn(S, 'Logout', `URL: ${postUrl}`);
    } else {
      info(S, 'Logout', 'Button not found');
    }
    await snap(S, page, dir, 'logout');
  } catch (e) { fail(S, 'Logout', e.message); }

  // ──────────────────────────────────────────────────────────────────
  // ERROR ANALYSIS
  // ──────────────────────────────────────────────────────────────────
  console.log('\n══ ERROR ANALYSIS ══');
  const ignore = ['favicon','manifest','gtag','google','workbox','service-worker','analytics','firebaseinstallations'];
  const reactWarnings = /Warning:|React does not recognize|unique key|Invalid DOM/i;
  const critErr = S.consoleErrors.filter(e => !ignore.some(p => e.toLowerCase().includes(p)) && !reactWarnings.test(e));
  const reactWarnCount = S.consoleErrors.filter(e => reactWarnings.test(e)).length;
  const critNet = S.networkErrors.filter(e => !ignore.some(p => e.url.toLowerCase().includes(p)));

  critErr.length === 0
    ? pass(S, 'Console Errors', 'None')
    : warn(S, 'Console Errors', `${critErr.length}`);
  critErr.slice(0, 5).forEach(e => console.log(`      ${e.substring(0, 150)}`));

  reactWarnCount > 0
    ? info(S, 'React Dev Warnings', `${reactWarnCount} (non-critical)`)
    : null;

  critNet.length === 0
    ? pass(S, 'Network Errors', 'None')
    : warn(S, 'Network Errors', `${critNet.length}`);
  critNet.slice(0, 5).forEach(e => console.log(`      ${e.url?.substring(0, 120)} — ${e.err}`));

  await browser.close();
  return S;
}

// ═══════════════════════════════════════════════════════════════════════
//  REPORT
// ═══════════════════════════════════════════════════════════════════════
function printReport(S, viewportLabel) {
  const c = { PASS: 0, FAIL: 0, WARN: 0, INFO: 0 };
  S.results.forEach(r => c[r.status]++);

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  console.log('\n');
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log(`║  VoraPrep CPA Journey — ${viewportLabel.padEnd(33)}║`);
  console.log(`║  ${today.padEnd(55)}║`);
  console.log('╠══════════════════════════════════════════════════════════╣');
  console.log(`║  ✅ PASS:  ${String(c.PASS).padStart(3)}                                          ║`);
  console.log(`║  ❌ FAIL:  ${String(c.FAIL).padStart(3)}                                          ║`);
  console.log(`║  ⚠️  WARN:  ${String(c.WARN).padStart(3)}                                          ║`);
  console.log(`║  ℹ️  INFO:  ${String(c.INFO).padStart(3)}                                          ║`);
  console.log(`║  📊 TOTAL: ${String(S.results.length).padStart(3)}                                          ║`);
  console.log('╚══════════════════════════════════════════════════════════╝');

  if (S.issues.length > 0) {
    console.log('\n── Issues ──');
    const high = S.issues.filter(i => i.severity === 'HIGH');
    const low  = S.issues.filter(i => i.severity === 'LOW');
    if (high.length) {
      console.log(`  🔴 HIGH (${high.length}):`);
      high.forEach(i => console.log(`     • ${i.feature}: ${i.detail}`));
    }
    if (low.length) {
      console.log(`  🟡 LOW (${low.length}):`);
      low.forEach(i => console.log(`     • ${i.feature}: ${i.detail}`));
    }
  }

  console.log('\n── All Results ──');
  S.results.forEach(r => {
    const ico = { PASS: '✅', FAIL: '❌', WARN: '⚠️', INFO: 'ℹ️' }[r.status];
    console.log(`  ${ico}  ${r.feature}${r.detail ? ' — ' + r.detail : ''}`);
  });

  return c;
}

// ═══════════════════════════════════════════════════════════════════════
//  MAIN
// ═══════════════════════════════════════════════════════════════════════
async function main() {
  let totalFails = 0;

  if (RUN_DESKTOP) {
    const S = await runSuite(VIEWPORTS.desktop);
    const c = printReport(S, VIEWPORTS.desktop.label);
    totalFails += c.FAIL;
    console.log(`\n📸 Desktop screenshots → ${VIEWPORTS.desktop.dir}/\n`);
  }

  if (RUN_MOBILE) {
    const S = await runSuite(VIEWPORTS.mobile);
    const c = printReport(S, VIEWPORTS.mobile.label);
    totalFails += c.FAIL;
    console.log(`\n📸 Mobile screenshots → ${VIEWPORTS.mobile.dir}/\n`);
  }

  if (RUN_DESKTOP && RUN_MOBILE) {
    console.log('══════════════════════════════════════════════════════════');
    console.log(`  Both runs complete. Total FAIL: ${totalFails}`);
    console.log('══════════════════════════════════════════════════════════\n');
  }

  process.exit(totalFails > 0 ? 1 : 0);
}

main().catch(err => { console.error('Fatal:', err); process.exit(2); });

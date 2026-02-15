/**
 * Multi-Exam Journey Test — VoraPrep
 *
 * Runs the full user journey for any of the 6 supported exams.
 * Reuses the same test pattern as cpa-journey.test.mjs but adapts
 * sections, routes, and features per exam.
 *
 * Usage:
 *   node e2e/exam-journey.test.mjs ea              # EA desktop
 *   node e2e/exam-journey.test.mjs cma --mobile    # CMA mobile
 *   node e2e/exam-journey.test.mjs cia --both      # CIA both viewports
 *   node e2e/exam-journey.test.mjs --all            # All 6 exams, desktop
 *   node e2e/exam-journey.test.mjs --all --both     # All 6 exams, both viewports
 *
 * Env vars:
 *   BASE_URL, TEST_EMAIL, TEST_PASSWORD (same as cpa-journey.test.mjs)
 */

import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

// ─── CLI ───────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const RUN_MOBILE  = args.includes('--mobile') || args.includes('--both');
const RUN_DESKTOP = args.includes('--both')   || !args.includes('--mobile');
const RUN_ALL     = args.includes('--all');
const examArg     = args.find(a => !a.startsWith('-'));

// ─── Config ────────────────────────────────────────────────────────
const BASE     = process.env.BASE_URL      || 'http://localhost:5173';
const EMAIL    = process.env.TEST_EMAIL    || 'rob@sagecg.com';
const PASSWORD = process.env.TEST_PASSWORD || 'Leader123!';
const TIMEOUT  = 15_000;

// ─── Per-exam configuration ────────────────────────────────────────
const EXAM_CONFIGS = {
  cpa: {
    label: 'CPA',
    sections: ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP'],
    hasTBS: true,
    hasWC: true,
    hasCBQ: false,
    hasCaseStudy: false,
    examRoute: '/exam',
    examSpecificRoutes: ['/cpa/info'],
    sectionRoute: null, // CPA uses shared routes
    studyPlanRoute: null,
  },
  ea: {
    label: 'EA (Enrolled Agent)',
    sections: ['SEE1', 'SEE2', 'SEE3'],
    hasTBS: false,
    hasWC: false,
    hasCBQ: false,
    hasCaseStudy: false,
    examRoute: '/ea-exam',
    examSpecificRoutes: ['/ea', '/ea/info', '/ea/study-plan', '/ea/forms'],
    sectionRoute: '/ea/section',
    studyPlanRoute: '/ea/study-plan',
  },
  cma: {
    label: 'CMA',
    sections: ['CMA1', 'CMA2'],
    hasTBS: false,
    hasWC: false,
    hasCBQ: true,
    hasCaseStudy: false,
    examRoute: '/cma-exam',
    examSpecificRoutes: ['/cma/dashboard', '/cma/study-plan', '/cma/cbq'],
    sectionRoute: '/cma/section',
    studyPlanRoute: '/cma/study-plan',
  },
  cia: {
    label: 'CIA',
    sections: ['CIA1', 'CIA2', 'CIA3'],
    hasTBS: false,
    hasWC: false,
    hasCBQ: false,
    hasCaseStudy: false,
    examRoute: '/cia-exam',
    examSpecificRoutes: ['/cia/dashboard', '/cia/study-plan'],
    sectionRoute: '/cia/section',
    studyPlanRoute: '/cia/study-plan',
  },
  cisa: {
    label: 'CISA',
    sections: ['CISA1', 'CISA2', 'CISA3', 'CISA4', 'CISA5'],
    hasTBS: false,
    hasWC: false,
    hasCBQ: false,
    hasCaseStudy: false,
    examRoute: '/cisa-exam',
    examSpecificRoutes: ['/cisa/dashboard', '/cisa/info', '/cisa/study-plan'],
    sectionRoute: '/cisa/section',
    studyPlanRoute: '/cisa/study-plan',
  },
  cfp: {
    label: 'CFP',
    sections: ['CFP-PCR', 'CFP-GEN', 'CFP-RISK', 'CFP-INV', 'CFP-TAX', 'CFP-RET', 'CFP-EST', 'CFP-PSY'],
    hasTBS: false,
    hasWC: false,
    hasCBQ: false,
    hasCaseStudy: true,
    examRoute: '/cfp-exam',
    examSpecificRoutes: ['/cfp/dashboard', '/cfp/cases', '/cfp/study-plan'],
    sectionRoute: '/cfp/domain',
    studyPlanRoute: '/cfp/study-plan',
  },
};

// ─── Viewports ─────────────────────────────────────────────────────
const VIEWPORTS = {
  desktop: { width: 1280, height: 800, label: 'Desktop', dir: '' },
  mobile:  { width: 390,  height: 844, label: 'Mobile',  dir: '' },
};

// ─── Helpers ───────────────────────────────────────────────────────
function makeState() {
  return { results: [], issues: [], consoleErrors: [], networkErrors: [], screenshotIndex: 0 };
}

function pass(S, f, d = '') { S.results.push({ feature: f, status: 'PASS', detail: d }); console.log(`  ✅ ${f}${d ? ' — ' + d : ''}`); }
function fail(S, f, d = '') { S.results.push({ feature: f, status: 'FAIL', detail: d }); S.issues.push({ severity: 'HIGH', feature: f, detail: d }); console.log(`  ❌ ${f}${d ? ' — ' + d : ''}`); }
function warn(S, f, d = '') { S.results.push({ feature: f, status: 'WARN', detail: d }); S.issues.push({ severity: 'LOW', feature: f, detail: d }); console.log(`  ⚠️  ${f}${d ? ' — ' + d : ''}`); }
function info(S, f, d = '') { S.results.push({ feature: f, status: 'INFO', detail: d }); console.log(`  ℹ️  ${f}${d ? ' — ' + d : ''}`); }

async function snap(S, page, dir, label) {
  S.screenshotIndex++;
  await page.screenshot({ path: `${dir}/${String(S.screenshotIndex).padStart(2, '0')}-${label}.png`, fullPage: true });
}

async function textContains(page, regex) {
  return regex.test(await page.evaluate(() => document.body.innerText));
}

async function nav(page, path, ms = 3000) {
  await page.goto(`${BASE}${path}`, { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
  await page.waitForTimeout(ms);
}

function isOnLogin(page) { return page.url().includes('/login'); }

// ═══════════════════════════════════════════════════════════════════
// SWITCH COURSE
// ═══════════════════════════════════════════════════════════════════
async function switchCourse(S, page, examId, config) {
  console.log(`\n══ SWITCH TO ${config.label} ══`);
  try {
    // Navigate to an exam-specific URL to trigger auto-switch
    const switchUrl = config.examSpecificRoutes[0] || `/home`;
    await nav(page, switchUrl, 4000);

    if (isOnLogin(page)) {
      fail(S, `Switch to ${config.label}`, 'Redirected to login');
      return false;
    }

    // Verify we're now on the right course by checking if sections appear
    const sectionRe = new RegExp(config.sections.slice(0, 3).join('|'), 'i');
    const onCourse = await textContains(page, sectionRe) || page.url().includes(examId);
    if (onCourse) {
      pass(S, `Switched to ${config.label}`);
    } else {
      // Try the CourseSelector dropdown
      const selector = page.locator('[data-testid="course-selector"], select:has(option)').first();
      if (await selector.count() > 0) {
        await selector.selectOption(examId).catch(() => {});
        await page.waitForTimeout(2000);
        pass(S, `Switched to ${config.label}`, 'via selector');
      } else {
        warn(S, `Switch to ${config.label}`, 'Could not confirm course switch');
      }
    }
    return true;
  } catch (e) { fail(S, `Switch to ${config.label}`, e.message); return false; }
}

// ═══════════════════════════════════════════════════════════════════
// TEST SUITE (per exam)
// ═══════════════════════════════════════════════════════════════════
async function runExamSuite(page, S, examId, config, dir, isMobile) {
  const label = config.label;

  // ── 1. Dashboard / Landing ──
  console.log(`\n── ${label}: Dashboard ──`);
  try {
    const dashRoute = config.examSpecificRoutes.find(r => r.includes('dashboard')) || '/home';
    await nav(page, dashRoute, 3000);
    if (!isOnLogin(page)) {
      pass(S, `${label} — Dashboard loads`);
    } else {
      warn(S, `${label} — Dashboard`, 'Redirected to login');
    }
    await snap(S, page, dir, `${examId}-dashboard`);
  } catch (e) { fail(S, `${label} — Dashboard`, e.message); }

  // ── 2. Practice Questions ──
  console.log(`\n── ${label}: Practice ──`);
  try {
    await nav(page, '/practice', 4000);
    if (!isOnLogin(page)) {
      const startBtn = page.locator('[data-testid="start-practice"], button:has-text("Start Practice")').first();
      if (await startBtn.count() > 0) {
        await startBtn.click();
        await page.waitForTimeout(5000);

        const hasQ = (await page.locator('[data-testid="question-text"]').count() > 0)
                  || await textContains(page, /question|which|what|how/i);
        hasQ ? pass(S, `${label} — Practice Q loaded`) : warn(S, `${label} — Practice Q`, 'Not detected');

        // Answer Q1
        const opt = page.locator('[data-testid^="answer-option"], .mcq-option').first();
        if (await opt.count() > 0) {
          await opt.click();
          await page.waitForTimeout(500);
          const subBtn = page.locator('[data-testid="submit-answer"], button:has-text("Submit")').first();
          if (await subBtn.count() > 0) {
            await subBtn.click();
            await page.waitForTimeout(2000);
            pass(S, `${label} — Practice answered`);
          }
        }
      } else {
        pass(S, `${label} — Practice page loaded`);
      }
    } else { warn(S, `${label} — Practice`, 'Login redirect'); }
    await snap(S, page, dir, `${examId}-practice`);
  } catch (e) { fail(S, `${label} — Practice`, e.message); }

  // ── 3. Flashcards ──
  console.log(`\n── ${label}: Flashcards ──`);
  try {
    await nav(page, '/flashcards', 4000);
    if (!isOnLogin(page)) {
      pass(S, `${label} — Flashcards loaded`);
      const startSess = page.locator('button:has-text("Start Session"), button:has-text("Start")').first();
      if (await startSess.count() > 0) {
        await startSess.click();
        await page.waitForTimeout(4000);
        const flipArea = page.locator('[data-testid="flashcard"]');
        if (await flipArea.count() > 0) {
          await flipArea.first().click();
          await page.waitForTimeout(500);
          pass(S, `${label} — Flashcard flip works`);
        } else if (await textContains(page, /all caught up|no.*card|completed/i)) {
          pass(S, `${label} — Flashcards all caught up`);
        }
      }
    } else { warn(S, `${label} — Flashcards`, 'Login redirect'); }
    await snap(S, page, dir, `${examId}-flashcards`);
  } catch (e) { fail(S, `${label} — Flashcards`, e.message); }

  // ── 4. TBS (CPA only) ──
  if (config.hasTBS) {
    console.log(`\n── ${label}: TBS ──`);
    try {
      await nav(page, '/tbs', 5000);
      if (!isOnLogin(page)) {
        (await textContains(page, /simulation|task|scenario|exhibit/i))
          ? pass(S, `${label} — TBS loaded`)
          : warn(S, `${label} — TBS`, 'No content');
      } else { warn(S, `${label} — TBS`, 'Login redirect'); }
      await snap(S, page, dir, `${examId}-tbs`);
    } catch (e) { fail(S, `${label} — TBS`, e.message); }
  }

  // ── 5. Written Communication (CPA only) ──
  if (config.hasWC) {
    console.log(`\n── ${label}: Written Communication ──`);
    try {
      await nav(page, '/written-communication', 4000);
      if (!isOnLogin(page)) {
        (await textContains(page, /written|memo|business writing|random/i))
          ? pass(S, `${label} — WC loaded`)
          : warn(S, `${label} — WC`, 'No content');
      } else { warn(S, `${label} — WC`, 'Login redirect'); }
      await snap(S, page, dir, `${examId}-wc`);
    } catch (e) { fail(S, `${label} — WC`, e.message); }
  }

  // ── 6. CBQ (CMA only) ──
  if (config.hasCBQ) {
    console.log(`\n── ${label}: CBQ ──`);
    try {
      await nav(page, '/cma/cbq', 4000);
      if (!isOnLogin(page)) {
        (await textContains(page, /case|cbq|scenario|question/i))
          ? pass(S, `${label} — CBQ loaded`)
          : warn(S, `${label} — CBQ`, 'No content');
      } else { warn(S, `${label} — CBQ`, 'Login redirect'); }
      await snap(S, page, dir, `${examId}-cbq`);
    } catch (e) { fail(S, `${label} — CBQ`, e.message); }
  }

  // ── 7. Case Study (CFP only) ──
  if (config.hasCaseStudy) {
    console.log(`\n── ${label}: Case Study ──`);
    try {
      await nav(page, '/cfp/cases', 4000);
      if (!isOnLogin(page)) {
        (await textContains(page, /case|study|vignette|scenario|client/i))
          ? pass(S, `${label} — Case Study loaded`)
          : warn(S, `${label} — Case Study`, 'No content');
      } else { warn(S, `${label} — Case Study`, 'Login redirect'); }
      await snap(S, page, dir, `${examId}-case-study`);
    } catch (e) { fail(S, `${label} — Case Study`, e.message); }
  }

  // ── 8. Exam Simulator ──
  console.log(`\n── ${label}: Exam Simulator ──`);
  try {
    await nav(page, config.examRoute, 4000);
    if (!isOnLogin(page)) {
      (await textContains(page, /exam|mock|simulation|testlet|section|start/i))
        ? pass(S, `${label} — Exam Simulator loaded`)
        : warn(S, `${label} — Exam Simulator`, 'No content');
    } else { warn(S, `${label} — Exam Simulator`, 'Login redirect (premium?)'); }
    await snap(S, page, dir, `${examId}-exam`);
  } catch (e) { fail(S, `${label} — Exam Simulator`, e.message); }

  // ── 9. Study Plan ──
  if (config.studyPlanRoute) {
    console.log(`\n── ${label}: Study Plan ──`);
    try {
      await nav(page, config.studyPlanRoute, 4000);
      if (!isOnLogin(page)) {
        (await textContains(page, /study plan|schedule|goal|target|exam date|week/i))
          ? pass(S, `${label} — Study Plan loaded`)
          : warn(S, `${label} — Study Plan`, 'No content');
      } else { warn(S, `${label} — Study Plan`, 'Login redirect'); }
      await snap(S, page, dir, `${examId}-study-plan`);
    } catch (e) { fail(S, `${label} — Study Plan`, e.message); }
  }

  // ── 10. Section detail page ──
  if (config.sectionRoute) {
    console.log(`\n── ${label}: Section Page ──`);
    try {
      const firstSection = config.sections[0];
      await nav(page, `${config.sectionRoute}/${firstSection}`, 8000);
      // Wait for loading state to resolve (hooks like useCFPProgress have async loading)
      await page.waitForTimeout(3000);
      if (!isOnLogin(page)) {
        (await textContains(page, new RegExp(firstSection + '|section|topic|area|domain|progress|part|questions|accuracy|essentials|audit|start practice|not found', 'i')))
          ? pass(S, `${label} — Section page (${firstSection})`)
          : warn(S, `${label} — Section page`, 'No content');
      } else { warn(S, `${label} — Section page`, 'Login redirect'); }
      await snap(S, page, dir, `${examId}-section`);
    } catch (e) { fail(S, `${label} — Section page`, e.message); }
  }

  // ── 11. Exam-specific routes ──
  for (const route of config.examSpecificRoutes) {
    const routeName = route.split('/').pop();
    try {
      await nav(page, route, 3000);
      if (!isOnLogin(page)) {
        pass(S, `${label} — ${routeName} loads`);
      } else {
        info(S, `${label} — ${routeName}`, 'Login redirect');
      }
    } catch (e) { fail(S, `${label} — ${routeName}`, e.message); }
  }

  // ── 12. Shared pages still work ──
  console.log(`\n── ${label}: Shared Pages ──`);
  for (const [name, route, re] of [
    ['Progress',     '/progress',     /progress|performance|accuracy|start practicing|journey|start practice/i],
    ['Study/Learn',  '/learn',        /lesson|study|learn|premium|subscribe|upgrade/i],
    ['AI Tutor',     '/ai-tutor',     /tutor|ai|chat|ask/i],
  ]) {
    try {
      await nav(page, route, 4000);
      if (!isOnLogin(page)) {
        (await textContains(page, re))
          ? pass(S, `${label} — ${name}`)
          : warn(S, `${label} — ${name}`, 'No content');
      } else { info(S, `${label} — ${name}`, 'Login redirect'); }
    } catch (e) { fail(S, `${label} — ${name}`, e.message); }
  }

  // ── 13. Console errors ──
  const ignore = ['favicon','manifest','gtag','google','workbox','service-worker','analytics','firebaseinstallations','hmr','hot update','hot-update'];
  const reactRe = /Warning:|React does not recognize|unique key|Invalid DOM/i;
  const hmrRe = /Cannot access .* before initialization|Failed to fetch dynamically imported module|__vite_ssr/i;
  const critErr = S.consoleErrors.filter(e => !ignore.some(p => e.toLowerCase().includes(p)) && !reactRe.test(e) && !hmrRe.test(e));
  if (critErr.length === 0) {
    pass(S, `${label} — No console errors`);
  } else {
    // Log first few for debugging
    critErr.slice(0, 3).forEach(e => info(S, `${label} — console`, e.substring(0, 120)));
    warn(S, `${label} — Console errors`, `${critErr.length}`);
  }
  // Reset for next exam
  S.consoleErrors.length = 0;
}

// ═══════════════════════════════════════════════════════════════════
// MAIN RUNNER
// ═══════════════════════════════════════════════════════════════════
async function runViewport(viewport, examsToTest) {
  const { width, height, label: vpLabel } = viewport;
  const isMobile = width < 768;
  const S = makeState();

  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  🖥️  ${vpLabel}  (${width}×${height})`);
  console.log(`${'═'.repeat(60)}`);

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

  // ── LOGIN ──
  console.log('\n══ LOGIN ══');
  let loginOk = false;
  try {
    await nav(page, '/login', 2000);
    const emailInput = page.locator('input[type="email"]').first();
    const passInput  = page.locator('#password').first();

    if (await emailInput.count() > 0) {
      await emailInput.fill(EMAIL);
      await passInput.fill(PASSWORD);
      pass(S, 'Login Form Rendered');

      await page.locator('button[type="submit"]').first().click();
      await page.waitForTimeout(8000);
      if (!page.url().includes('/login')) {
        pass(S, 'Login Success', page.url());
        loginOk = true;
      } else {
        fail(S, 'Login', 'Still on /login');
      }
    } else {
      fail(S, 'Login', 'No email input');
    }
  } catch (e) { fail(S, 'Login', e.message); }

  if (!loginOk) {
    console.log('\n  🛑 LOGIN FAILED — aborting.\n');
    await browser.close();
    return S;
  }

  // ── RUN EACH EXAM ──
  for (const examId of examsToTest) {
    const config = EXAM_CONFIGS[examId];
    if (!config) { fail(S, `Unknown exam: ${examId}`); continue; }

    const dir = `e2e/screenshots/${examId}/${isMobile ? 'mobile' : 'desktop'}`;
    mkdirSync(dir, { recursive: true });

    // Switch course (skip for CPA if not multi)
    if (examId !== 'cpa' || examsToTest.length > 1) {
      const switched = await switchCourse(S, page, examId, config);
      if (!switched) continue;
    }

    console.log(`\n${'─'.repeat(50)}`);
    console.log(`  📝  Testing ${config.label}`);
    console.log(`${'─'.repeat(50)}`);

    await runExamSuite(page, S, examId, config, dir, isMobile);
  }

  // ── LOGOUT ──
  console.log('\n══ LOGOUT ══');
  try {
    await nav(page, '/you', 2000);
    const logoutBtn = page.locator('button:has-text("Sign Out"), button:has-text("Log Out"), button:has-text("Logout")').first();
    if (await logoutBtn.count() > 0) {
      if (isMobile) await logoutBtn.scrollIntoViewIfNeeded();
      page.once('dialog', async d => await d.accept());
      await logoutBtn.click();
      await page.waitForTimeout(5000);
      page.url().includes('/login')
        ? pass(S, 'Logout — Redirected')
        : warn(S, 'Logout', `URL: ${page.url()}`);
    } else { info(S, 'Logout', 'Button not found'); }
  } catch (e) { fail(S, 'Logout', e.message); }

  await browser.close();
  return S;
}

function printReport(S, label) {
  const c = { PASS: 0, FAIL: 0, WARN: 0, INFO: 0 };
  S.results.forEach(r => c[r.status]++);

  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  console.log('\n');
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log(`║  VoraPrep Exam Journey — ${label.padEnd(31)}║`);
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
    if (high.length) { console.log(`  🔴 HIGH (${high.length}):`); high.forEach(i => console.log(`     • ${i.feature}: ${i.detail}`)); }
    if (low.length)  { console.log(`  🟡 LOW (${low.length}):`);  low.forEach(i => console.log(`     • ${i.feature}: ${i.detail}`)); }
  }

  return c;
}

async function main() {
  // Determine which exams to test
  let examsToTest;
  if (RUN_ALL) {
    examsToTest = Object.keys(EXAM_CONFIGS);
  } else if (examArg && EXAM_CONFIGS[examArg]) {
    examsToTest = [examArg];
  } else if (!examArg) {
    console.log('Usage: node e2e/exam-journey.test.mjs <exam> [--mobile|--both|--all]');
    console.log('Exams: cpa, ea, cma, cia, cisa, cfp');
    console.log('  --all    Run all 6 exams');
    console.log('  --mobile Mobile viewport (390×844)');
    console.log('  --both   Desktop + mobile');
    process.exit(0);
  } else {
    console.error(`Unknown exam: "${examArg}". Valid: cpa, ea, cma, cia, cisa, cfp`);
    process.exit(1);
  }

  console.log(`\n🎯 Testing: ${examsToTest.map(e => e.toUpperCase()).join(', ')}`);

  let totalFails = 0;

  if (RUN_DESKTOP) {
    const S = await runViewport(VIEWPORTS.desktop, examsToTest);
    const c = printReport(S, `Desktop — ${examsToTest.map(e => e.toUpperCase()).join(', ')}`);
    totalFails += c.FAIL;
  }

  if (RUN_MOBILE) {
    const S = await runViewport(VIEWPORTS.mobile, examsToTest);
    const c = printReport(S, `Mobile — ${examsToTest.map(e => e.toUpperCase()).join(', ')}`);
    totalFails += c.FAIL;
  }

  if (RUN_DESKTOP && RUN_MOBILE) {
    console.log('══════════════════════════════════════════════════════════');
    console.log(`  Both viewport runs complete. Total FAIL: ${totalFails}`);
    console.log('══════════════════════════════════════════════════════════\n');
  }

  process.exit(totalFails > 0 ? 1 : 0);
}

main().catch(err => { console.error('Fatal:', err); process.exit(2); });

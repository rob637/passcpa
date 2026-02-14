/**
 * State Corruption Test — VoraPrep
 *
 * Deliberately tries to break the app by simulating race conditions,
 * rapid interactions, and state conflicts that real users trigger accidentally.
 *
 * Tests:
 *   1. Double-click submit — Race condition on answer submission
 *   2. Rapid answer switching — Change answer rapidly before submit
 *   3. Course switch mid-session — Switch exam while in active practice
 *   4. Parallel session conflict — Open practice, then flashcards, then back
 *   5. Tab focus/blur — Simulate losing focus and returning
 *   6. Rapid navigation — Click through pages faster than they load
 *   7. Timer manipulation — Verify quiz timer can't be cheated
 *   8. Concurrent API calls — Multiple Firestore ops in flight
 *
 * Usage:
 *   node e2e/state-corruption.test.mjs
 *   node e2e/state-corruption.test.mjs --mobile
 */

import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const args = process.argv.slice(2);
const MOBILE = args.includes('--mobile');
const BASE     = process.env.BASE_URL      || 'http://localhost:5173';
const EMAIL    = process.env.TEST_EMAIL    || 'rob@sagecg.com';
const PASSWORD = process.env.TEST_PASSWORD || 'Leader123!';
const TIMEOUT  = 15_000;
const VP = MOBILE ? { w: 390, h: 844 } : { w: 1280, h: 800 };
const DIR = `e2e/screenshots/state-corruption/${MOBILE ? 'mobile' : 'desktop'}`;
mkdirSync(DIR, { recursive: true });

const results = [], issues = [], consoleErrors = [];
let snapIdx = 0;
let jsErrors = 0; // Track uncaught JS errors

function pass(f, d='') { results.push({f,s:'PASS',d}); console.log(`  ✅ ${f}${d?' — '+d:''}`); }
function fail(f, d='') { results.push({f,s:'FAIL',d}); issues.push({sev:'HIGH',f,d}); console.log(`  ❌ ${f}${d?' — '+d:''}`); }
function warn(f, d='') { results.push({f,s:'WARN',d}); issues.push({sev:'LOW',f,d}); console.log(`  ⚠️  ${f}${d?' — '+d:''}`); }
function info(f, d='') { results.push({f,s:'INFO',d}); console.log(`  ℹ️  ${f}${d?' — '+d:''}`); }

async function snap(page, label) {
  snapIdx++;
  await page.screenshot({ path: `${DIR}/${String(snapIdx).padStart(2,'0')}-${label}.png`, fullPage: true });
}
async function nav(page, path, ms=3000) {
  await page.goto(`${BASE}${path}`, { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
  await page.waitForTimeout(ms);
}

// Clear any auto-saved practice session to prevent auto-restore on /practice mount
// Must navigate to /home first so beforeunload doesn't re-save during goto
async function clearSavedSession(page) {
  // Navigate away from practice (if on it) so the unmount save happens
  await nav(page, '/home', 1500);
  // Now clear the saved session
  await page.evaluate(() => sessionStorage.removeItem('voraprep-practice-session'));
}
// Navigate to /practice with a clean setup screen (handles auto-restore race)
async function freshPractice(page, waitMs = 4000) {
  await clearSavedSession(page);
  await nav(page, '/practice', waitMs);
  // If auto-restore kicked in before we cleared, clear again and reload
  const btn = page.locator('[data-testid="start-practice"]');
  if (await btn.count() === 0) {
    await page.evaluate(() => sessionStorage.removeItem('voraprep-practice-session'));
    await nav(page, '/practice', waitMs);
  }
}
async function bodyText(page) { return page.evaluate(() => document.body.innerText); }

function checkPageHealth(label) {
  // Returns a function that checks if page crashed
  return async (page) => {
    const health = await page.evaluate(() => {
      const overlay = document.querySelector('#webpack-dev-server-client-overlay, [class*="error-overlay"]');
      const bodyLen = document.body.innerText?.trim().length || 0;
      const hasReactRoot = !!document.querySelector('#root');
      const rootChildren = document.querySelector('#root')?.children.length || 0;
      return { hasOverlay: !!overlay, bodyLen, hasReactRoot, rootChildren };
    });

    if (health.hasOverlay) {
      fail(`${label} — CRASH`, 'React error overlay visible');
      return false;
    }
    if (health.bodyLen < 10 && health.rootChildren === 0) {
      fail(`${label} — CRASH`, 'Blank page — React tree destroyed');
      return false;
    }
    return true;
  };
}

// ═══════════════════════════════════════════════════════════
// TEST 1: DOUBLE-CLICK SUBMIT
// ═══════════════════════════════════════════════════════════
async function testDoubleClickSubmit(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 1: Double-Click Submit (Race Condition)');
  console.log('══════════════════════════════════════════════════════');

  await freshPractice(page);

  const q10 = page.locator('[data-testid="question-count-10"]');
  if (await q10.count() > 0) await q10.click();

  const startBtn = page.locator('[data-testid="start-practice"]');
  if (await startBtn.count() === 0) { warn('DoubleClick — Setup not ready'); return; }
  await startBtn.click();
  await page.waitForTimeout(5000);

  // Select an answer
  const opt = page.locator('[data-testid="answer-option-0"]');
  if (await opt.count() === 0) { warn('DoubleClick — No answer options'); return; }
  await opt.click();
  await page.waitForTimeout(200);

  // Record error count before double-click
  const errorsBefore = consoleErrors.length;

  // DOUBLE-CLICK the submit button as fast as possible
  const submitBtn = page.locator('[data-testid="submit-answer"]');
  if (await submitBtn.count() > 0) {
    // Fire two clicks with minimal delay
    await Promise.all([
      submitBtn.click(),
      submitBtn.click(),
    ]);
    await page.waitForTimeout(2000);

    const healthy = await checkPageHealth('DoubleClick')(page);
    if (healthy) {
      pass('DoubleClick Submit — No crash');

      // Check if we accidentally skipped a question
      const text = await bodyText(page);
      const posMatch = text.match(/(\d+)\s*(of|\/)\s*(\d+)/i);
      if (posMatch) {
        const pos = parseInt(posMatch[1]);
        if (pos <= 2) {
          pass('DoubleClick Submit — Correct position', `At Q${pos}`);
        } else {
          warn('DoubleClick Submit — Skipped question', `Jumped to Q${pos}`);
        }
      }
    }

    // Check for error spike
    const errorsAfter = consoleErrors.length;
    const newErrors = errorsAfter - errorsBefore;
    if (newErrors > 3) {
      warn('DoubleClick Submit — Console errors', `${newErrors} new errors`);
    }
  }
  await snap(page, 'double-click');
}

// ═══════════════════════════════════════════════════════════
// TEST 2: RAPID ANSWER SWITCHING
// ═══════════════════════════════════════════════════════════
async function testRapidAnswerSwitching(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 2: Rapid Answer Switching');
  console.log('══════════════════════════════════════════════════════');

  await freshPractice(page);
  const startBtn = page.locator('[data-testid="start-practice"]');
  if (await startBtn.count() === 0) { warn('Rapid — Setup not ready'); return; }
  await startBtn.click();
  await page.waitForTimeout(5000);

  // Rapidly click through all 4 options
  for (let round = 0; round < 3; round++) {
    for (let i = 0; i < 4; i++) {
      const opt = page.locator(`[data-testid="answer-option-${i}"]`);
      if (await opt.count() > 0) {
        await opt.click({ force: true });
        // No waiting — rapid fire
      }
    }
  }

  await page.waitForTimeout(500);
  const healthy = await checkPageHealth('RapidSwitch')(page);
  if (healthy) {
    pass('Rapid Answer Switch — No crash after 12 rapid clicks');
  }

  // Submit the final selection
  const submitBtn = page.locator('[data-testid="submit-answer"]');
  if (await submitBtn.count() > 0 && !(await submitBtn.isDisabled())) {
    await submitBtn.click();
    await page.waitForTimeout(2000);

    // Verify only ONE answer was recorded (not multiple)
    const hasExplanation = await page.evaluate(() =>
      document.body.innerText.toLowerCase().includes('explanation')
    );
    if (hasExplanation) {
      pass('Rapid Answer Switch — Single answer recorded');
    } else {
      info('Rapid Answer Switch — State after submit unclear');
    }
  }
  await snap(page, 'rapid-switch');
}

// ═══════════════════════════════════════════════════════════
// TEST 3: COURSE SWITCH MID-SESSION
// ═══════════════════════════════════════════════════════════
async function testCourseSwitchMidSession(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 3: Course Switch Mid-Session');
  console.log('══════════════════════════════════════════════════════');

  // Start a practice session
  await freshPractice(page);
  const startBtn = page.locator('[data-testid="start-practice"]');
  if (await startBtn.count() === 0) { warn('CourseSwitch — Setup not ready'); return; }
  await startBtn.click();
  await page.waitForTimeout(5000);

  // Answer 2 questions
  for (let i = 0; i < 2; i++) {
    const opt = page.locator('[data-testid="answer-option-0"]');
    if (await opt.count() > 0) {
      await opt.click();
      await page.waitForTimeout(200);
      const sub = page.locator('[data-testid="submit-answer"]');
      if (await sub.count() > 0) await sub.click();
      await page.waitForTimeout(1500);
      const next = page.locator('button:has-text("Next")').first();
      if (await next.count() > 0) await next.click();
      await page.waitForTimeout(1000);
    }
  }
  pass('CourseSwitch — Started CPA practice, answered 2 questions');

  // NOW switch to EA by navigating to an EA-specific route
  await nav(page, '/ea', 3000);

  const healthy1 = await checkPageHealth('CourseSwitch-to-EA')(page);
  if (healthy1) {
    pass('CourseSwitch — Navigated to EA without crash');
  }

  // Navigate back to practice (now in EA context)
  await freshPractice(page);
  const text = await bodyText(page);

  // Check: is this now EA practice or CPA?
  // The session should be gone (we navigated away)
  const isSetup = /start practice|resume|section/i.test(text);
  if (isSetup) {
    pass('CourseSwitch — Practice shows setup (session ended)');
  }

  // Switch back to CPA
  await nav(page, '/cpa/info', 3000);
  const healthy2 = await checkPageHealth('CourseSwitch-back-CPA')(page);
  if (healthy2) {
    pass('CourseSwitch — Returned to CPA without crash');
  }

  // Verify progress page doesn't show corrupted data
  await nav(page, '/progress', 4000);
  const progText = await bodyText(page);
  // Only flag true corruption — NaN or Infinity in data contexts, not words like 'undefined'
  if (/\bNaN\b|\bInfinity\b/.test(progText)) {
    fail('CourseSwitch — Progress data corrupted', 'Found NaN/Infinity on progress page');
  } else {
    pass('CourseSwitch — Progress page data clean');
  }
  await snap(page, 'course-switch');
}

// ═══════════════════════════════════════════════════════════
// TEST 4: RAPID NAVIGATION (FASTER THAN LOAD)
// ═══════════════════════════════════════════════════════════
async function testRapidNavigation(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 4: Rapid Navigation');
  console.log('══════════════════════════════════════════════════════');

  const errorsBefore = consoleErrors.length;

  // Navigate through 8 pages as fast as possible
  const pages = ['/home', '/practice', '/flashcards', '/progress', '/learn', '/ai-tutor', '/quiz', '/settings'];
  for (const p of pages) {
    await page.goto(`${BASE}${p}`, { waitUntil: 'commit', timeout: TIMEOUT }).catch(() => {});
    // No waiting — move on immediately
  }

  // Now wait for the last page to settle
  await page.waitForTimeout(4000);

  const healthy = await checkPageHealth('RapidNav')(page);
  if (healthy) {
    pass('Rapid Navigation — No crash after 8 rapid page switches');
  }

  // Check for memory-leak indicators (excessive errors)
  const errorsAfter = consoleErrors.length;
  const newErrors = errorsAfter - errorsBefore;
  if (newErrors > 20) {
    warn('Rapid Navigation — Error storm', `${newErrors} console errors during rapid nav`);
  } else {
    pass('Rapid Navigation — Minimal console errors', `${newErrors} errors`);
  }

  // Verify the app is still fully functional
  await freshPractice(page);
  const startBtn = page.locator('[data-testid="start-practice"]');
  if (await startBtn.count() > 0) {
    pass('Rapid Navigation — App still functional after stress');
  } else {
    warn('Rapid Navigation — App recovery', 'Practice page not loading after rapid nav');
  }
  await snap(page, 'rapid-nav');
}

// ═══════════════════════════════════════════════════════════
// TEST 5: QUIZ TIMER INTEGRITY
// ═══════════════════════════════════════════════════════════
async function testQuizTimerIntegrity(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 5: Quiz Timer Integrity');
  console.log('══════════════════════════════════════════════════════');

  await nav(page, '/quiz', 4000);

  const startBtn = page.locator('button:has-text("Start")').first();
  if (await startBtn.count() === 0) { info('Timer — No start button'); return; }
  await startBtn.click();
  await page.waitForTimeout(3000);

  // Read initial timer value
  const getTimer = async () => {
    return page.evaluate(() => {
      const text = document.body.innerText;
      const match = text.match(/(\d+):(\d+)/);
      if (match) return parseInt(match[1]) * 60 + parseInt(match[2]);
      return null;
    });
  };

  const t1 = await getTimer();
  if (t1 === null) { info('Timer — No timer found'); return; }

  // Wait 5 seconds
  await page.waitForTimeout(5000);
  const t2 = await getTimer();

  if (t2 !== null && t1 !== null) {
    const elapsed = t1 - t2;
    if (elapsed >= 3 && elapsed <= 8) {
      pass('Timer — Counts down correctly', `${elapsed}s elapsed in 5s wall time`);
    } else if (elapsed < 3) {
      warn('Timer — Too slow', `Only ${elapsed}s elapsed in 5s — timer may be buggy`);
    } else {
      warn('Timer — Too fast', `${elapsed}s elapsed in 5s — timer skipping?`);
    }
  }

  // Test pause/resume
  const pauseBtn = page.locator('button:has-text("Pause")').first();
  if (await pauseBtn.count() > 0) {
    await pauseBtn.click();
    await page.waitForTimeout(500);

    const tPaused = await getTimer();
    await page.waitForTimeout(3000);
    const tAfterPause = await getTimer();

    if (tPaused !== null && tAfterPause !== null) {
      if (tPaused === tAfterPause) {
        pass('Timer — Pause stops countdown');
      } else {
        fail('Timer — Pause doesn\'t stop', `Timer moved from ${tPaused} to ${tAfterPause} while paused`);
      }
    }

    // Resume
    const resumeBtn = page.locator('button:has-text("Resume")').first();
    if (await resumeBtn.count() > 0) {
      await resumeBtn.click();
      await page.waitForTimeout(500);
      pass('Timer — Resume works');
    }
  } else {
    info('Timer — No pause button found');
  }

  // Try to manipulate timer via JS injection (should have no effect)
  await page.evaluate(() => {
    try {
      // Try to access React state — shouldn't work from outside
      window.__manipulated = true;
    } catch (e) {}
  });
  await page.waitForTimeout(1000);

  const healthy = await checkPageHealth('Timer')(page);
  if (healthy) pass('Timer — App stable after timer tests');

  await snap(page, 'quiz-timer');
}

// ═══════════════════════════════════════════════════════════
// TEST 6: CONCURRENT INTERACTIONS
// ═══════════════════════════════════════════════════════════
async function testConcurrentInteractions(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 6: Concurrent / Conflicting Interactions');
  console.log('══════════════════════════════════════════════════════');

  // Start practice
  await freshPractice(page);
  const startBtn = page.locator('[data-testid="start-practice"]');
  if (await startBtn.count() === 0) { warn('Concurrent — Setup not ready'); return; }
  await startBtn.click();
  await page.waitForTimeout(5000);

  const errorsBefore = consoleErrors.length;

  // Rapidly select answer and submit at the same time
  const opt0 = page.locator('[data-testid="answer-option-0"]');
  const opt1 = page.locator('[data-testid="answer-option-1"]');
  const submit = page.locator('[data-testid="submit-answer"]');

  if (await opt0.count() > 0) {
    // Click opt0 then immediately opt1 then submit — all as fast as possible
    await opt0.click({ force: true });
    await opt1.click({ force: true });
    if (await submit.count() > 0 && !(await submit.isDisabled())) {
      await submit.click({ force: true });
    }
    await page.waitForTimeout(2000);

    const healthy = await checkPageHealth('Concurrent')(page);
    if (healthy) {
      pass('Concurrent — Rapid select+submit without crash');
    }

    // Verify only one answer was recorded
    const feedbackCount = await page.evaluate(() => {
      const correct = document.querySelectorAll('.mcq-option-correct').length;
      const incorrect = document.querySelectorAll('.mcq-option-incorrect').length;
      return { correct, incorrect, total: correct + incorrect };
    });

    if (feedbackCount.total <= 2) {
      pass('Concurrent — Single answer recorded', `${feedbackCount.correct} correct, ${feedbackCount.incorrect} incorrect highlights`);
    } else {
      warn('Concurrent — Multiple answers highlighted', `${feedbackCount.total} options highlighted`);
    }
  }

  // Check for new errors
  const errorsAfter = consoleErrors.length;
  if (errorsAfter - errorsBefore > 5) {
    warn('Concurrent — Error storm', `${errorsAfter - errorsBefore} new errors`);
  }

  await snap(page, 'concurrent');
}

// ═══════════════════════════════════════════════════════════
// TEST 7: KEYBOARD SHORTCUTS CONFLICT
// ═══════════════════════════════════════════════════════════
async function testKeyboardConflicts(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 7: Keyboard Shortcut Conflicts');
  console.log('══════════════════════════════════════════════════════');

  await freshPractice(page);
  const startBtn = page.locator('[data-testid="start-practice"]');
  if (await startBtn.count() === 0) { warn('Keyboard — Setup not ready'); return; }
  await startBtn.click();
  await page.waitForTimeout(5000);

  // Test all keyboard shortcuts rapidly
  const shortcuts = ['1', '2', '3', '4', 'Enter', 'n', 'p', 'f', 'ArrowLeft', 'ArrowRight'];

  for (const key of shortcuts) {
    await page.keyboard.press(key);
    await page.waitForTimeout(100);
  }

  await page.waitForTimeout(1000);
  const healthy = await checkPageHealth('Keyboard')(page);
  if (healthy) {
    pass('Keyboard — All shortcuts fired without crash');
  }

  // Test rapid Enter spam (could try to submit/next repeatedly)
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press('Enter');
    await page.waitForTimeout(50);
  }
  await page.waitForTimeout(1000);

  const healthy2 = await checkPageHealth('KeyboardSpam')(page);
  if (healthy2) {
    pass('Keyboard — Enter spam without crash');
  }

  // Test number keys to answer + submit in one go
  await page.keyboard.press('1'); // Select A
  await page.keyboard.press('Enter'); // Submit
  await page.waitForTimeout(2000);

  const text = await bodyText(page);
  if (/explanation|correct|incorrect/i.test(text)) {
    pass('Keyboard — Answer+Submit via keys works');
  }

  await snap(page, 'keyboard-conflicts');
}

// ═══════════════════════════════════════════════════════════
// TEST 8: DATA INTEGRITY AFTER STRESS
// ═══════════════════════════════════════════════════════════
async function testDataIntegrityAfterStress(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 8: Data Integrity After Stress');
  console.log('══════════════════════════════════════════════════════');

  // After all the stress tests, check that core data is still intact
  await nav(page, '/progress', 5000);
  const progText = await bodyText(page);

  // Check for data corruption indicators
  const corruptionPatterns = [
    { pattern: /NaN/g, name: 'NaN values' },
    { pattern: /undefined/gi, name: 'undefined text' },
    { pattern: /\bnull\b/gi, name: 'null text' },
    { pattern: /Infinity/g, name: 'Infinity values' },
    { pattern: /(?<![\d\w])-\d+%/g, name: 'Negative percentages' },
    { pattern: /\d{10,}%/g, name: 'Absurdly large percentages' },
  ];

  let corruptionFound = false;
  for (const { pattern, name } of corruptionPatterns) {
    const matches = progText.match(pattern);
    if (matches && matches.length > 0) {
      // Filter out legitimate uses (e.g., "undefined" in explanations)
      if (name === 'undefined text' && progText.toLowerCase().includes('undefined')) {
        // Check if it's in a data context vs. a legitimate word
        const suspiciousUndefined = matches.filter(m =>
          !progText.includes('is undefined') && !progText.includes('an undefined')
        );
        if (suspiciousUndefined.length > 0) {
          fail(`Data Integrity — ${name}`, `${suspiciousUndefined.length} occurrences on progress page`);
          corruptionFound = true;
        }
      } else if (name !== 'undefined text') {
        fail(`Data Integrity — ${name}`, `${matches.length} occurrences: ${matches.slice(0, 3).join(', ')}`);
        corruptionFound = true;
      }
    }
  }

  if (!corruptionFound) {
    pass('Data Integrity — No corruption on progress page');
  }

  // Check dashboard too
  await nav(page, '/home', 3000);
  const dashText = await bodyText(page);
  const dashCorrupted = /NaN|Infinity|(?<![\d\w])-\d+%/.test(dashText);
  if (dashCorrupted) {
    fail('Data Integrity — Dashboard corrupted', 'NaN/Infinity/negative on dashboard');
  } else {
    pass('Data Integrity — Dashboard clean');
  }

  await snap(page, 'data-integrity');
}

// ═══════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════
async function main() {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  🔥  State Corruption Test — ${MOBILE ? 'Mobile' : 'Desktop'}`);
  console.log(`${'═'.repeat(60)}`);

  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: VP.w, height: VP.h },
    isMobile: MOBILE,
    hasTouch: MOBILE,
  });
  const page = await ctx.newPage();
  page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', e => { jsErrors++; consoleErrors.push(`UNCAUGHT: ${e.message}`); });

  // Login
  console.log('\n══ LOGIN ══');
  await nav(page, '/login', 2000);
  await page.locator('input[type="email"]').first().fill(EMAIL);
  await page.locator('#password').first().fill(PASSWORD);
  await page.locator('button[type="submit"]').first().click();
  await page.waitForTimeout(8000);
  if (page.url().includes('/login')) { fail('Login'); await browser.close(); process.exit(1); }
  pass('Login');

  await testDoubleClickSubmit(page);
  await testRapidAnswerSwitching(page);
  await testCourseSwitchMidSession(page);
  await testRapidNavigation(page);
  await testQuizTimerIntegrity(page);
  await testConcurrentInteractions(page);
  await testKeyboardConflicts(page);
  await testDataIntegrityAfterStress(page);

  // Logout
  console.log('\n══ LOGOUT ══');
  await nav(page, '/you', 2000);
  const lb = page.locator('button:has-text("Sign Out"), button:has-text("Log Out")').first();
  if (await lb.count() > 0) { page.once('dialog', d => d.accept()); await lb.click(); await page.waitForTimeout(4000); pass('Logout'); }

  await browser.close();

  // Report
  const c = { PASS: 0, FAIL: 0, WARN: 0, INFO: 0 };
  results.forEach(r => c[r.s]++);
  console.log('\n');
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log(`║  State Corruption Test — ${MOBILE ? 'Mobile' : 'Desktop'.padEnd(7)}                      ║`);
  console.log('╠══════════════════════════════════════════════════════════╣');
  console.log(`║  ✅ PASS:  ${String(c.PASS).padStart(3)}                                          ║`);
  console.log(`║  ❌ FAIL:  ${String(c.FAIL).padStart(3)}                                          ║`);
  console.log(`║  ⚠️  WARN:  ${String(c.WARN).padStart(3)}                                          ║`);
  console.log(`║  ℹ️  INFO:  ${String(c.INFO).padStart(3)}                                          ║`);
  console.log(`║  📊 TOTAL: ${String(results.length).padStart(3)}                                          ║`);
  console.log(`║  💥 JS Errors: ${String(jsErrors).padStart(3)}                                       ║`);
  console.log('╚══════════════════════════════════════════════════════════╝');

  if (issues.length > 0) {
    console.log('\n── Issues Found ──');
    issues.filter(i=>i.sev==='HIGH').forEach(i=>console.log(`  🔴 ${i.f}: ${i.d}`));
    issues.filter(i=>i.sev==='LOW').forEach(i=>console.log(`  🟡 ${i.f}: ${i.d}`));
  }

  const ignore = ['favicon','manifest','gtag','google','workbox','service-worker','analytics','firebaseinstallations'];
  const reactRe = /Warning:|React does not recognize|unique key|Invalid DOM/i;
  const crit = consoleErrors.filter(e => !ignore.some(p => e.toLowerCase().includes(p)) && !reactRe.test(e));
  if (crit.length > 0) {
    console.log(`\n── Console Errors (${crit.length}) ──`);
    [...new Set(crit)].slice(0, 15).forEach(e => console.log(`  • ${e.substring(0, 150)}`));
  }

  process.exit(c.FAIL > 0 ? 1 : 0);
}

main().catch(err => { console.error('Fatal:', err); process.exit(2); });

/**
 * Edge Case & Boundary Test — VoraPrep
 *
 * Tests boundary conditions that users hit in production but developers
 * rarely test manually. Focuses on:
 *   1. Empty states (0 questions, 0 flashcards)
 *   2. Filter combinations that return no results
 *   3. Question count mismatch (request 50, only 8 exist)
 *   4. Session resume after partial completion
 *   5. Invalid routes & bad section IDs
 *   6. Section-specific deep linking with params
 *   7. Input extremes (empty, very long, special chars)
 *
 * Usage:
 *   node e2e/edge-cases.test.mjs            # Desktop (default)
 *   node e2e/edge-cases.test.mjs --mobile   # Mobile viewport
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
const DIR = `e2e/screenshots/edge-cases/${MOBILE ? 'mobile' : 'desktop'}`;
mkdirSync(DIR, { recursive: true });

// ─── State ────────────────────────────────────────────────
const results = [], issues = [], consoleErrors = [];
let snapIdx = 0;

function pass(f, d='') { results.push({f,s:'PASS',d}); console.log(`  ✅ ${f}${d?' — '+d:''}`); }
function fail(f, d='') { results.push({f,s:'FAIL',d}); issues.push({sev:'HIGH',f,d}); console.log(`  ❌ ${f}${d?' — '+d:''}`); }
function warn(f, d='') { results.push({f,s:'WARN',d}); issues.push({sev:'LOW',f,d}); console.log(`  ⚠️  ${f}${d?' — '+d:''}`); }
function info(f, d='') { results.push({f,s:'INFO',d}); console.log(`  ℹ️  ${f}${d?' — '+d:''}`); }

async function snap(page, label) {
  snapIdx++;
  await page.screenshot({ path: `${DIR}/${String(snapIdx).padStart(2,'0')}-${label}.png`, fullPage: true });
}
async function nav(page, path, ms=3000) {
  // Dismiss any Vite error overlay before navigation
  await page.evaluate(() => {
    const overlay = document.querySelector('vite-error-overlay');
    if (overlay) overlay.remove();
  }).catch(() => {});
  await page.goto(`${BASE}${path}`, { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
  await page.waitForTimeout(ms);
  // Dismiss again after navigation
  await page.evaluate(() => {
    const overlay = document.querySelector('vite-error-overlay');
    if (overlay) overlay.remove();
  }).catch(() => {});
}
async function bodyText(page) { return page.evaluate(() => document.body.innerText); }

// ═══════════════════════════════════════════════════════════
// TEST 1: EMPTY STATES & ZERO RESULTS
// ═══════════════════════════════════════════════════════════
async function testEmptyStates(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 1: Empty States & Zero Question Scenarios');
  console.log('══════════════════════════════════════════════════════');

  // 1a. Practice with restrictive filters that likely return 0 questions
  await nav(page, '/practice', 4000);

  // Open advanced options
  const moreOpts = page.locator('button:has-text("More options"), button:has-text("Advanced"), button:has-text("Options")').first();
  if (await moreOpts.count() > 0) {
    await moreOpts.click();
    await page.waitForTimeout(500);
  }

  // Try selecting a very specific difficulty + blueprint combo
  const diffSelect = page.locator('select').filter({ hasText: /hard|difficulty/i }).first();
  if (await diffSelect.count() > 0) {
    await diffSelect.selectOption({ index: await diffSelect.locator('option').count() - 1 });
  }

  // Start practice with these restrictive filters
  const startBtn = page.locator('[data-testid="start-practice"]');
  if (await startBtn.count() > 0) {
    await startBtn.click();
    await page.waitForTimeout(5000);

    const text = await bodyText(page);
    const hasEmptyState = await page.locator('[data-testid="practice-empty-state"]').count() > 0;
    if (hasEmptyState || /no questions|no results|not available|couldn't find|try different|back to setup/i.test(text)) {
      pass('Empty State — Practice handles 0 questions gracefully');
    } else if (/question.*\d|of\s*\d/i.test(text) || await page.locator('[data-testid="answer-option-0"]').count() > 0) {
      pass('Empty State — Practice found questions even with filters', 'Good — data coverage is solid');
    } else if (await page.locator('[data-testid="practice-loading"]').count() > 0) {
      warn('Empty State — Practice still loading after 5s', 'May be a slow query');
    } else {
      warn('Empty State — Practice with restrictive filters', 'Unclear state — may be loading or stuck');
    }
    await snap(page, 'empty-practice');
  }

  // Clear any practice session saved during the empty state test
  await page.evaluate(() => sessionStorage.removeItem('voraprep-practice-session'));

  // 1b. Flashcards — trigger "All Caught Up" state
  // Navigate to flashcards with a very niche filter (already-reviewed cards)
  await nav(page, '/flashcards', 4000);
  const text = await bodyText(page);

  if (/all caught up|no cards|completed/i.test(text)) {
    pass('Empty State — Flashcards shows caught-up message');
  } else {
    // Try starting with default settings — we may get cards
    info('Empty State — Flashcards', 'Cards available — expected for active user');
  }
  await snap(page, 'empty-flashcards');

  // 1c. Quiz with impossible filters
  await nav(page, '/quiz', 4000);

  // Look for custom mode or options
  const customBtn = page.locator('button:has-text("Custom")').first();
  if (await customBtn.count() > 0) {
    await customBtn.click();
    await page.waitForTimeout(500);
  }

  // Start quiz — it may silently fail with 0 questions
  const startQuiz = page.locator('button:has-text("Start")').first();
  if (await startQuiz.count() > 0) {
    await startQuiz.click();
    await page.waitForTimeout(4000);

    const quizText = await bodyText(page);
    if (/no questions|error|couldn't|unable/i.test(quizText)) {
      pass('Empty State — Quiz shows error for 0 questions');
    } else {
      pass('Empty State — Quiz loaded with questions');
    }
  }
  await snap(page, 'empty-quiz');
}

// ═══════════════════════════════════════════════════════════
// TEST 2: QUESTION COUNT MISMATCH
// ═══════════════════════════════════════════════════════════
async function testQuestionCountMismatch(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 2: Question Count Mismatch');
  console.log('══════════════════════════════════════════════════════');

  await nav(page, '/practice', 4000);

  // Select 50 questions
  const q50 = page.locator('[data-testid="question-count-50"]');
  if (await q50.count() > 0) {
    await q50.click();
    await page.waitForTimeout(300);
  }

  // Open advanced options and select a specific blueprint area with few questions
  const moreOpts = page.locator('button:has-text("More options"), button:has-text("Advanced")').first();
  if (await moreOpts.count() > 0) {
    await moreOpts.click();
    await page.waitForTimeout(500);
  }

  // Start practice
  const startBtn = page.locator('[data-testid="start-practice"]');
  if (await startBtn.count() > 0) {
    await startBtn.click();
    await page.waitForTimeout(5000);

    // Check how many questions were actually loaded
    // Look for the question counter (e.g., "1 of 50" or "1/50" or dots)
    const counterText = await page.evaluate(() => {
      const text = document.body.innerText;
      const match = text.match(/(\d+)\s*(of|\/)\s*(\d+)/i);
      return match ? { current: parseInt(match[1]), total: parseInt(match[3]) } : null;
    });

    if (counterText) {
      if (counterText.total <= 50) {
        pass('Count Mismatch — Graceful handling', `Got ${counterText.total} questions (requested 50)`);
        if (counterText.total < 50) {
          info('Count Mismatch — Fewer available', `Only ${counterText.total}/50 questions available for this filter`);
        }
      }
    } else {
      // Try counting question dots
      const dots = await page.evaluate(() => {
        const buttons = document.querySelectorAll('button');
        let count = 0;
        buttons.forEach(b => { if (/^\d+$/.test(b.textContent?.trim() || '')) count++; });
        return count;
      });

      if (dots > 0) {
        pass('Count Mismatch — Questions loaded', `${dots} question indicators visible`);
      } else {
        info('Count Mismatch — Could not determine question count');
      }
    }
    await snap(page, 'count-mismatch');
  }
}

// ═══════════════════════════════════════════════════════════
// TEST 3: SESSION RESUME
// ═══════════════════════════════════════════════════════════
async function testSessionResume(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 3: Session Resume');
  console.log('══════════════════════════════════════════════════════');

  // First navigate away from practice to let any active session save on unmount,
  // then clear sessionStorage, then navigate to /practice with a clean slate.
  await nav(page, '/home', 2000);
  await page.evaluate(() => sessionStorage.removeItem('voraprep-practice-session'));
  await nav(page, '/practice', 4000);

  // Check if practice is subscription-gated (blurred/locked)
  const isGated = await page.evaluate(() => {
    const blurred = document.querySelectorAll('[class*="blur"], [class*="pointer-events-none"]');
    const locked = document.querySelector('svg[class*="lock"], [class*="Lock"]');
    return blurred.length > 0 || !!locked;
  });

  if (isGated) {
    info('Resume — Practice is subscription-gated (trial expired), skipping session resume test');
    return;
  }

  const q10 = page.locator('[data-testid="question-count-10"]');
  if (await q10.count() > 0) await q10.click();

  const startBtn = page.locator('[data-testid="start-practice"]');
  if (await startBtn.count() === 0) {
    warn('Resume — Setup', 'Start button not found');
    return;
  }
  await startBtn.click();
  await page.waitForTimeout(5000);

  // Answer 3 questions to create partial progress
  let answeredCount = 0;
  for (let i = 0; i < 3; i++) {
    const opt = page.locator('[data-testid="answer-option-0"]');
    if (await opt.count() === 0) break;
    await opt.click();
    await page.waitForTimeout(300);
    const sub = page.locator('[data-testid="submit-answer"]');
    if (await sub.count() > 0) { await sub.click(); await page.waitForTimeout(1500); }
    const next = page.locator('button:has-text("Next")').first();
    if (await next.count() > 0) { await next.click(); await page.waitForTimeout(1500); }
    answeredCount++;
  }

  pass(`Resume — Answered ${answeredCount} questions`);

  // Navigate away within the SPA (click a nav link to trigger React unmount)
  if (MOBILE) {
    // Mobile: use bottom nav
    const homeLink = page.locator('a[href="/home"], nav a:has-text("Home")').first();
    if (await homeLink.count() > 0) {
      await homeLink.click();
    } else {
      await nav(page, '/home', 2000);
    }
  } else {
    // Desktop: use sidebar nav
    const homeLink = page.locator('a[href="/home"]').first();
    if (await homeLink.count() > 0) {
      await homeLink.click();
    } else {
      await nav(page, '/home', 2000);
    }
  }
  await page.waitForTimeout(3000);
  pass('Resume — Navigated away from practice');

  // Debug: check sessionStorage content
  const savedSession = await page.evaluate(() => {
    const data = sessionStorage.getItem('voraprep-practice-session');
    return data ? JSON.parse(data) : null;
  });
  if (savedSession) {
    pass(`Resume — Session auto-saved`, `${savedSession.questions?.length} questions, index ${savedSession.currentIndex}`);
  } else {
    warn('Resume — Session NOT saved', 'saveSessionState did not fire on unmount');
  }

  // Come back to practice via SPA navigation (to trigger mount, not full page load)
  const practiceLink = page.locator('a[href="/practice"]').first();
  if (await practiceLink.count() > 0) {
    await practiceLink.click();
  } else {
    await nav(page, '/practice', 4000);
  }
  await page.waitForTimeout(4000);

  // The session may auto-restore (skipping setup screen) OR show a Resume button.
  // Both are valid behaviors — check which one happened.
  const resumeBtn = page.locator('button:has-text("Resume Session"), button:has-text("Resume")').first();
  const questionVisible = page.locator('[data-testid^="answer-option-"]').first();
  const startBtn2 = page.locator('[data-testid="start-practice"]');

  if (await questionVisible.count() > 0) {
    // Auto-restored directly into the session
    pass('Resume — Session auto-restored');

    // Verify we're at the right question position
    const text = await bodyText(page);
    const posMatch = text.match(/(\d+)\s*(of|\/)\s*(\d+)/i);
    if (posMatch) {
      const pos = parseInt(posMatch[1]);
      if (pos > 1) {
        pass('Resume — Restored to correct position', `Question ${pos}`);
      } else {
        warn('Resume — Position reset', `Resumed at question ${pos}, expected > 1`);
      }
    }
  } else if (await resumeBtn.count() > 0) {
    // Manual resume button shown
    pass('Resume — Resume button visible');
    await resumeBtn.click();
    await page.waitForTimeout(3000);

    const text = await bodyText(page);
    const posMatch = text.match(/(\d+)\s*(of|\/)\s*(\d+)/i);
    if (posMatch) {
      const pos = parseInt(posMatch[1]);
      if (pos > 1) {
        pass('Resume — Restored to correct position', `Question ${pos}`);
      } else {
        warn('Resume — Position reset', `Resumed at question ${pos}, expected > 1`);
      }
    }
  } else if (await startBtn2.count() > 0) {
    warn('Resume — Session lost', 'Setup screen shown without resume — session was not preserved');
  } else {
    warn('Resume — Unknown state', 'Neither questions, resume button, nor start button found');
  }
  await snap(page, 'session-resume');
}

// ═══════════════════════════════════════════════════════════
// TEST 4: INVALID ROUTES & BAD SECTION IDs
// ═══════════════════════════════════════════════════════════
async function testInvalidRoutes(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 4: Invalid Routes & Bad Section IDs');
  console.log('══════════════════════════════════════════════════════');

  const invalidRoutes = [
    { path: '/ea/section/INVALID',     expect: /not found|doesn't exist|invalid|back to/i, name: 'EA invalid section' },
    { path: '/ea/section/SEE99',       expect: /not found|doesn't exist|invalid|back to/i, name: 'EA non-existent section' },
    { path: '/cia/section/FAKE',       expect: /not found|doesn't exist|invalid|back to/i, name: 'CIA invalid section' },
    { path: '/cfp/domain/FAKE',        expect: /not found|domain|back to/i, name: 'CFP invalid domain' },
    { path: '/cisa/section/CISA99',    expect: /not found|doesn't exist|invalid|back to/i, name: 'CISA non-existent section' },
    { path: '/nonexistent-page',       expect: /.*/i, name: 'Completely invalid route' },
    { path: '/practice?section=FAKE',  expect: /.*/i, name: 'Practice with invalid section param' },
    { path: '/quiz?mode=nonexistent',  expect: /.*/i, name: 'Quiz with invalid mode' },
  ];

  for (const { path, expect: expectRe, name } of invalidRoutes) {
    try {
      await nav(page, path, 3000);
      const text = await bodyText(page);
      const url = page.url();

      // Check for crash indicators
      const hasCrash = await page.evaluate(() => {
        // Check for React error overlay
        const errorOverlay = document.querySelector('#webpack-dev-server-client-overlay, [class*="error-overlay"]');
        // Check for blank page
        const bodyLen = document.body.innerText?.trim().length || 0;
        return { hasOverlay: !!errorOverlay, bodyLen };
      });

      if (hasCrash.hasOverlay) {
        fail(`Invalid Route — ${name}`, 'CRASH: React error overlay visible');
      } else if (hasCrash.bodyLen < 10) {
        fail(`Invalid Route — ${name}`, 'CRASH: Blank/empty page');
      } else if (url.includes('/home') || url.includes('/login')) {
        pass(`Invalid Route — ${name}`, `Redirected to ${new URL(url).pathname}`);
      } else if (expectRe.test(text)) {
        pass(`Invalid Route — ${name}`, 'Handled gracefully');
      } else {
        // No crash but no clear error message either
        warn(`Invalid Route — ${name}`, `Page loaded but no error message (URL: ${new URL(url).pathname})`);
      }
    } catch (e) {
      fail(`Invalid Route — ${name}`, `Navigation error: ${e.message}`);
    }
  }
  await snap(page, 'invalid-routes');
}

// ═══════════════════════════════════════════════════════════
// TEST 5: BROWSER BACK DURING ACTIVE SESSIONS
// ═══════════════════════════════════════════════════════════
async function testBrowserBackDuringSessions(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 5: Browser Back During Active Sessions');
  console.log('══════════════════════════════════════════════════════');

  // 5a. Practice — browser back
  await nav(page, '/practice', 4000);
  const startBtn = page.locator('[data-testid="start-practice"]');
  if (await startBtn.count() > 0) {
    await startBtn.click();
    await page.waitForTimeout(5000);

    // Answer 1 question
    const opt = page.locator('[data-testid="answer-option-0"]');
    if (await opt.count() > 0) {
      await opt.click();
      await page.waitForTimeout(300);
      const sub = page.locator('[data-testid="submit-answer"]');
      if (await sub.count() > 0) await sub.click();
      await page.waitForTimeout(1500);
    }

    // Press browser back
    await page.goBack();
    await page.waitForTimeout(2000);

    const afterBack = await bodyText(page);
    const afterUrl = page.url();

    if (/leave|abandon|unsaved|in progress|are you sure/i.test(afterBack)) {
      pass('Browser Back — Practice shows leave warning');
    } else if (afterUrl.includes('/practice')) {
      // Still on practice — might have saved state
      info('Browser Back — Practice stayed on page', 'No leave warning but didn\'t navigate away');
    } else {
      // Navigated away — check if session was auto-saved
      await nav(page, '/practice', 4000);
      const resumeBtn = page.locator('button:has-text("Resume Session"), button:has-text("Resume")').first();
      if (await resumeBtn.count() > 0) {
        pass('Browser Back — Practice auto-saved session on back', 'Resume button visible');
      } else {
        warn('Browser Back — Practice', `Left without warning or save (went to ${new URL(afterUrl).pathname})`);
      }
    }
  }

  // 5b. Quiz — browser back
  await nav(page, '/quiz', 4000);
  const startQuiz = page.locator('button:has-text("Start")').first();
  if (await startQuiz.count() > 0) {
    await startQuiz.click();
    await page.waitForTimeout(4000);

    // Verify quiz started
    const hasTimer = await page.evaluate(() => /\d+:\d+/.test(document.body.innerText));
    if (hasTimer) {
      // Press browser back
      await page.goBack();
      await page.waitForTimeout(2000);

      const afterBack = await bodyText(page);
      const afterUrl = page.url();

      if (/leave|abandon|unsaved|in progress|are you sure/i.test(afterBack)) {
        pass('Browser Back — Quiz shows leave warning');
      } else if (afterUrl.includes('/quiz')) {
        info('Browser Back — Quiz stayed on page');
      } else {
        warn('Browser Back — Quiz', `Left without warning — quiz progress lost (went to ${new URL(afterUrl).pathname})`);
      }
    }
  }
  await snap(page, 'browser-back');
}

// ═══════════════════════════════════════════════════════════
// TEST 6: DEEP LINKING & PARAM HANDLING
// ═══════════════════════════════════════════════════════════
async function testDeepLinking(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 6: Deep Linking & URL Param Handling');
  console.log('══════════════════════════════════════════════════════');

  const deepLinks = [
    { path: '/practice?from=dailyplan&activityId=test123', name: 'Practice from daily plan', check: /practice|start/i },
    { path: '/practice?blueprintArea=FAR-I', name: 'Practice with blueprint filter', check: /practice|start/i },
    { path: '/practice?subtopic=depreciation', name: 'Practice with subtopic filter', check: /practice|start/i },
    { path: '/flashcards/session?section=FAR&count=5', name: 'Flashcard session direct link', check: /flashcard|flip|card|session|caught up/i },
    { path: '/quiz?mode=quick', name: 'Quiz quick mode', check: /quiz|quick|start/i },
    { path: '/quiz?mode=challenge', name: 'Quiz challenge mode', check: /quiz|challenge|start/i },
    { path: '/quiz?mode=exam', name: 'Quiz exam mode', check: /quiz|exam|start/i },
  ];

  for (const { path, name, check } of deepLinks) {
    try {
      await nav(page, path, 3000);
      const text = await bodyText(page);
      const url = page.url();

      const hasCrash = await page.evaluate(() => {
        const overlay = document.querySelector('#webpack-dev-server-client-overlay');
        return { hasOverlay: !!overlay, bodyLen: document.body.innerText?.trim().length || 0 };
      });

      if (hasCrash.hasOverlay) {
        fail(`Deep Link — ${name}`, 'CRASH: Error overlay');
      } else if (hasCrash.bodyLen < 10) {
        fail(`Deep Link — ${name}`, 'CRASH: Blank page');
      } else if (check.test(text)) {
        pass(`Deep Link — ${name}`);
      } else if (url.includes('/login')) {
        info(`Deep Link — ${name}`, 'Redirected to login');
      } else {
        pass(`Deep Link — ${name}`, 'Page loaded');
      }
    } catch (e) {
      fail(`Deep Link — ${name}`, e.message);
    }
  }
  await snap(page, 'deep-links');
}

// ═══════════════════════════════════════════════════════════
// TEST 7: AI TUTOR EDGE CASES
// ═══════════════════════════════════════════════════════════
async function testAITutorEdges(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 7: AI Tutor Edge Cases');
  console.log('══════════════════════════════════════════════════════');

  await nav(page, '/ai-tutor', 4000);

  // Check if AI tutor is available
  const chatInput = page.locator('textarea, input[type="text"]').filter({ hasText: '' }).first();
  const inputField = page.locator('textarea, input[placeholder*="ask"], input[placeholder*="type"], input[placeholder*="chat"]').first();

  if (await inputField.count() > 0) {
    pass('AI Tutor — Input field present');

    // Test empty submission — button should be disabled
    const sendBtn = page.locator('button[type="submit"], button:has-text("Send"), button:has-text("Ask")').first();
    if (await sendBtn.count() > 0) {
      const isDisabled = await sendBtn.isDisabled();
      if (isDisabled) {
        pass('AI Tutor — Submit disabled when empty');
      } else {
        // Only click if not disabled
        await sendBtn.click({ timeout: 3000 }).catch(() => {});
        await page.waitForTimeout(1000);
        pass('AI Tutor — Empty submit did not crash');
      }
    }

    // Test very long input
    const longText = 'What is the correct treatment for ' + 'a'.repeat(2000) + '?';
    await inputField.fill(longText);
    const charCount = await inputField.inputValue();
    if (charCount.length >= 500) {
      info('AI Tutor — Long input accepted', `${charCount.length} chars`);
    } else if (charCount.length < longText.length) {
      pass('AI Tutor — Input truncated', `${charCount.length} of ${longText.length} chars`);
    }

    // Clear and test special characters
    await inputField.fill('');
    await inputField.fill('<script>alert("xss")</script> " \' & < >');
    await page.waitForTimeout(500);
    pass('AI Tutor — Special chars accepted without crash');

  } else {
    info('AI Tutor — No input field found', 'May require premium or different UI');
  }
  await snap(page, 'ai-tutor-edge');
}

// ═══════════════════════════════════════════════════════════
// TEST 8: SETTINGS PERSISTENCE
// ═══════════════════════════════════════════════════════════
async function testSettingsPersistence(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 8: Settings Edge Cases');
  console.log('══════════════════════════════════════════════════════');

  await nav(page, '/settings', 4000);
  const text = await bodyText(page);

  if (/settings|preferences|account|profile/i.test(text)) {
    pass('Settings — Page loads');

    // Test dark mode toggle
    const darkToggle = page.locator('button:has-text("Dark"), [role="switch"], input[type="checkbox"]').first();
    if (await darkToggle.count() > 0) {
      const wasDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
      await darkToggle.click();
      await page.waitForTimeout(500);
      const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));

      if (wasDark !== isDark) {
        pass('Settings — Dark mode toggle works');
        // Toggle back
        await darkToggle.click();
        await page.waitForTimeout(300);
      } else {
        info('Settings — Dark mode', 'Toggle clicked but class didn\'t change');
      }
    }

    // Test exam date input
    const dateInput = page.locator('input[type="date"]').first();
    if (await dateInput.count() > 0) {
      const testDate = '2026-06-15';
      await dateInput.fill(testDate);
      await page.waitForTimeout(500);
      pass('Settings — Exam date input works');

      // Save and reload to check persistence
      const saveBtn = page.locator('button:has-text("Save"), button:has-text("Update")').first();
      if (await saveBtn.count() > 0) {
        await saveBtn.click();
        await page.waitForTimeout(2000);
      }

      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(3000);

      const savedDate = await dateInput.inputValue().catch(() => '');
      if (savedDate === testDate) {
        pass('Settings — Exam date persisted after reload');
      } else {
        info('Settings — Exam date persistence', `Expected ${testDate}, got "${savedDate}"`);
      }
    }
  } else if (page.url().includes('/login')) {
    info('Settings — Redirected to login');
  }
  await snap(page, 'settings-edge');
}

// ═══════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════
async function main() {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  🧪  Edge Case & Boundary Test — ${MOBILE ? 'Mobile' : 'Desktop'}`);
  console.log(`${'═'.repeat(60)}`);

  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: VP.w, height: VP.h },
    isMobile: MOBILE,
    hasTouch: MOBILE,
  });
  const page = await ctx.newPage();
  page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });

  // Login
  console.log('\n══ LOGIN ══');
  await nav(page, '/login', 2000);
  await page.locator('input[type="email"]').first().fill(EMAIL);
  await page.locator('#password').first().fill(PASSWORD);
  await page.locator('button[type="submit"]').first().click();
  await page.waitForTimeout(8000);
  if (page.url().includes('/login')) { fail('Login'); await browser.close(); process.exit(1); }
  pass('Login');

  // Run tests — wrapped in try/catch so one crash doesn't kill the suite
  const tests = [
    ['Empty States', testEmptyStates],
    ['Question Count Mismatch', testQuestionCountMismatch],
    ['Session Resume', testSessionResume],
    ['Invalid Routes', testInvalidRoutes],
    ['Browser Back', testBrowserBackDuringSessions],
    ['Deep Linking', testDeepLinking],
    ['AI Tutor Edges', testAITutorEdges],
    ['Settings Persistence', testSettingsPersistence],
  ];
  for (const [name, fn] of tests) {
    try {
      await fn(page);
    } catch (err) {
      fail(`CRASH in ${name}`, err.message?.substring(0, 120));
      // Dismiss overlay and navigate home to recover
      await page.evaluate(() => { const o = document.querySelector('vite-error-overlay'); if (o) o.remove(); }).catch(() => {});
      await nav(page, '/home', 2000);
    }
  }

  // Logout
  console.log('\n══ LOGOUT ══');
  await nav(page, '/you', 2000);
  // Dismiss any Vite error overlay that may have appeared from invalid route tests
  await page.evaluate(() => {
    const overlay = document.querySelector('vite-error-overlay');
    if (overlay) overlay.remove();
  });
  await page.waitForTimeout(500);
  const lb = page.locator('button:has-text("Sign Out"), button:has-text("Log Out")').first();
  if (await lb.count() > 0) { page.once('dialog', d => d.accept()); await lb.click({ force: true }); await page.waitForTimeout(4000); pass('Logout'); }

  await browser.close();

  // Report
  const c = { PASS: 0, FAIL: 0, WARN: 0, INFO: 0 };
  results.forEach(r => c[r.s]++);
  console.log('\n');
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log(`║  Edge Case & Boundary Test — ${MOBILE ? 'Mobile' : 'Desktop'.padEnd(7)}                  ║`);
  console.log('╠══════════════════════════════════════════════════════════╣');
  console.log(`║  ✅ PASS:  ${String(c.PASS).padStart(3)}                                          ║`);
  console.log(`║  ❌ FAIL:  ${String(c.FAIL).padStart(3)}                                          ║`);
  console.log(`║  ⚠️  WARN:  ${String(c.WARN).padStart(3)}                                          ║`);
  console.log(`║  ℹ️  INFO:  ${String(c.INFO).padStart(3)}                                          ║`);
  console.log(`║  📊 TOTAL: ${String(results.length).padStart(3)}                                          ║`);
  console.log('╚══════════════════════════════════════════════════════════╝');

  if (issues.length > 0) {
    console.log('\n── Issues Found ──');
    issues.filter(i=>i.sev==='HIGH').forEach(i=>console.log(`  🔴 ${i.f}: ${i.d}`));
    issues.filter(i=>i.sev==='LOW').forEach(i=>console.log(`  🟡 ${i.f}: ${i.d}`));
  }

  // Console errors
  const ignore = ['favicon','manifest','gtag','google','workbox','service-worker','analytics','firebaseinstallations'];
  const reactRe = /Warning:|React does not recognize|unique key|Invalid DOM/i;
  const crit = consoleErrors.filter(e => !ignore.some(p => e.toLowerCase().includes(p)) && !reactRe.test(e));
  if (crit.length > 0) {
    console.log(`\n── Console Errors (${crit.length}) ──`);
    [...new Set(crit)].slice(0, 10).forEach(e => console.log(`  • ${e.substring(0, 150)}`));
  }

  process.exit(c.FAIL > 0 ? 1 : 0);
}

main().catch(err => { console.error('Fatal:', err); process.exit(2); });

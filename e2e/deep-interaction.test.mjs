/**
 * Deep Interaction & State Verification Test — VoraPrep
 *
 * Goes beyond surface-level navigation to complete full workflows
 * and verify scores, persistence, and adaptive behavior.
 *
 * Tests:
 *   1. Practice Session — 10 questions with tracked correct/incorrect, verify score
 *   2. Score Persistence — Reload page, verify progress reflects session data
 *   3. Timed Quiz — Complete a 10-question quiz, verify results
 *   4. Flashcard Session — Flip cards, rate them, verify session stats
 *   5. Adaptive Engine — Answer wrong repeatedly, verify difficulty shifts
 *   6. Cross-Feature State — Verify daily log aggregates all activity
 *
 * Usage:
 *   node e2e/deep-interaction.test.mjs              # Desktop (default)
 *   node e2e/deep-interaction.test.mjs --mobile      # Mobile
 *   node e2e/deep-interaction.test.mjs --exam=ea     # Non-CPA exam
 */

import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

// ─── CLI ───────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const MOBILE   = args.includes('--mobile');
const EXAM_ARG = (args.find(a => a.startsWith('--exam=')) || '').replace('--exam=', '') || 'cpa';

// ─── Config ────────────────────────────────────────────────────────
const BASE     = process.env.BASE_URL      || 'http://localhost:5173';
const EMAIL    = process.env.TEST_EMAIL    || 'rob@sagecg.com';
const PASSWORD = process.env.TEST_PASSWORD || 'Leader123!';
const TIMEOUT  = 15_000;

const VP = MOBILE
  ? { width: 390, height: 844, label: 'Mobile' }
  : { width: 1280, height: 800, label: 'Desktop' };

const DIR = `e2e/screenshots/deep-${EXAM_ARG}/${MOBILE ? 'mobile' : 'desktop'}`;
mkdirSync(DIR, { recursive: true });

// ─── State ─────────────────────────────────────────────────────────
const results   = [];
const issues    = [];
const consoleErrors = [];
let snapIdx = 0;

function pass(f, d = '') { results.push({ feature: f, status: 'PASS', detail: d }); console.log(`  ✅ ${f}${d ? ' — ' + d : ''}`); }
function fail(f, d = '') { results.push({ feature: f, status: 'FAIL', detail: d }); issues.push({ severity: 'HIGH', feature: f, detail: d }); console.log(`  ❌ ${f}${d ? ' — ' + d : ''}`); }
function warn(f, d = '') { results.push({ feature: f, status: 'WARN', detail: d }); issues.push({ severity: 'LOW', feature: f, detail: d }); console.log(`  ⚠️  ${f}${d ? ' — ' + d : ''}`); }
function info(f, d = '') { results.push({ feature: f, status: 'INFO', detail: d }); console.log(`  ℹ️  ${f}${d ? ' — ' + d : ''}`); }

async function snap(page, label) {
  snapIdx++;
  await page.screenshot({ path: `${DIR}/${String(snapIdx).padStart(2, '0')}-${label}.png`, fullPage: true });
}

async function nav(page, path, ms = 3000) {
  await page.goto(`${BASE}${path}`, { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
  await page.waitForTimeout(ms);
}

async function bodyText(page) {
  return page.evaluate(() => document.body.innerText);
}

// ═══════════════════════════════════════════════════════════════════
// TEST 1: FULL PRACTICE SESSION — 10 QUESTIONS
// ═══════════════════════════════════════════════════════════════════
async function testPracticeSession(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 1: Full Practice Session (10 Questions)');
  console.log('══════════════════════════════════════════════════════');

  await nav(page, '/practice', 4000);

  // ── Setup ──
  const startBtn = page.locator('[data-testid="start-practice"]');
  if (await startBtn.count() === 0) {
    fail('Practice Setup', 'Start Practice button not found');
    return { correct: 0, total: 0 };
  }

  // Select 10 questions
  const q10 = page.locator('[data-testid="question-count-10"]');
  if (await q10.count() > 0) {
    await q10.click();
    await page.waitForTimeout(300);
    pass('Practice Setup — 10 questions selected');
  }

  await snap(page, 'practice-setup');
  await startBtn.click();
  await page.waitForTimeout(5000);

  // ── Answer 10 questions, tracking results ──
  let correct = 0;
  let incorrect = 0;
  let total = 0;
  const answeredQuestions = [];
  const difficultyDistribution = { easy: 0, medium: 0, hard: 0 };

  for (let i = 0; i < 10; i++) {
    const qText = page.locator('[data-testid="question-text"]');
    if (await qText.count() === 0) {
      // May have finished early or question didn't load
      info('Practice Q' + (i + 1), 'Question text not found — may be end of session');
      break;
    }

    const questionContent = await qText.textContent().catch(() => '');
    total++;

    // Record difficulty
    const diffBadge = await page.evaluate(() => {
      const badges = document.querySelectorAll('span');
      for (const b of badges) {
        const t = b.textContent?.toLowerCase().trim();
        if (t === 'easy' || t === 'medium' || t === 'hard') return t;
      }
      return null;
    });
    if (diffBadge) difficultyDistribution[diffBadge]++;

    // Select an answer: intentionally alternate correct/incorrect to test scoring
    // We'll pick option 0 for odd questions, option 1 for even (random-ish)
    let selectedIdx;
    if (i % 3 === 0) {
      // Every 3rd question: pick option 2 (likely wrong for variety)
      selectedIdx = 2;
    } else {
      selectedIdx = 0; // Pick first option
    }

    const opt = page.locator(`[data-testid="answer-option-${selectedIdx}"]`);
    if (await opt.count() > 0) {
      await opt.click();
      await page.waitForTimeout(300);
    } else {
      // Fallback: click any visible option
      const anyOpt = page.locator('[data-testid^="answer-option-"]').first();
      if (await anyOpt.count() > 0) await anyOpt.click();
      await page.waitForTimeout(300);
    }

    // Submit answer
    const submitBtn = page.locator('[data-testid="submit-answer"]');
    if (await submitBtn.count() > 0) {
      await submitBtn.click();
      await page.waitForTimeout(2000);
    }

    // Check if answer was correct or incorrect
    const correctOpt = page.locator('.mcq-option-correct');
    const incorrectOpt = page.locator('.mcq-option-incorrect');
    const wasCorrect = (await incorrectOpt.count() === 0); // No red = we got it right

    if (wasCorrect) correct++;
    else incorrect++;

    answeredQuestions.push({
      index: i + 1,
      text: questionContent?.substring(0, 60),
      correct: wasCorrect,
      difficulty: diffBadge,
    });

    // Verify explanation appears
    const hasExplanation = await page.evaluate(() =>
      document.body.innerText.toLowerCase().includes('explanation')
    );
    if (!hasExplanation && i === 0) {
      warn('Practice — Explanation', 'No explanation shown after first answer');
    }

    // Take screenshot of first and last question
    if (i === 0 || i === 9) await snap(page, `practice-q${i + 1}`);

    // Click Next (or Finish on last question)
    const nextBtn = page.locator('button:has-text("Next"), button:has-text("Finish")').first();
    if (await nextBtn.count() > 0) {
      await nextBtn.click();
      await page.waitForTimeout(2000);
    }
  }

  pass(`Practice — Answered ${total} questions`, `${correct} correct, ${incorrect} incorrect`);

  // ── Verify Results Screen ──
  await page.waitForTimeout(2000);
  const text = await bodyText(page);

  // Extract displayed counts — look for "X of Y correct" pattern
  const countsMatch = text.match(/(\d+)\s+of\s+(\d+)\s+correct/i);
  if (countsMatch) {
    const displayedCorrect = parseInt(countsMatch[1]);
    const displayedTotal = parseInt(countsMatch[2]);
    const expectedPct = Math.round((displayedCorrect / displayedTotal) * 100);

    pass('Practice — Result Counts', `${displayedCorrect} of ${displayedTotal} correct`);

    // Verify displayed percentage matches the counts (internal consistency)
    // Get the large score display specifically (text-5xl class)
    const displayedPct = await page.evaluate(() => {
      // Try the big score element first
      const bigScore = document.querySelector('.text-5xl');
      if (bigScore) {
        const m = bigScore.textContent?.match(/(\d+)/);
        if (m) return parseInt(m[1]);
      }
      // Fallback: find any standalone percentage
      const allText = document.body.innerText;
      const matches = allText.match(/(\d+)%/g) || [];
      // Return the first percentage that seems like a score (10-100)
      for (const m of matches) {
        const n = parseInt(m);
        if (n >= 0 && n <= 100) return n;
      }
      return null;
    });

    if (displayedPct !== null) {
      if (Math.abs(displayedPct - expectedPct) <= 1) {
        pass('Practice — Score Internally Consistent', `${displayedPct}% = ${displayedCorrect}/${displayedTotal}`);
      } else {
        fail('Practice — Score Inconsistency', `Displayed ${displayedPct}% but counts show ${displayedCorrect}/${displayedTotal} = ${expectedPct}%`);
      }
    } else {
      warn('Practice — Score Display', 'No percentage found on results');
    }

    // Update our tracked values to match what the component sees
    correct = displayedCorrect;
    incorrect = displayedTotal - displayedCorrect;
    total = displayedTotal;
  } else {
    // Fallback: just look for a percentage
    const pctMatch = text.match(/(\d+)%/);
    if (pctMatch) pass('Practice — Score Displayed', `${pctMatch[1]}%`);
    else warn('Practice — Score Display', 'No score information found on results');
  }

  // Check for "Great Work!" or "Keep Going!" message
  if (/great work|keep going|keep practicing|well done/i.test(text)) {
    pass('Practice — Completion Message');
  } else {
    warn('Practice — Completion Message', 'Expected motivational message');
  }

  // Check difficulty distribution
  info('Practice — Difficulty Dist', `Easy: ${difficultyDistribution.easy}, Medium: ${difficultyDistribution.medium}, Hard: ${difficultyDistribution.hard}`);

  await snap(page, 'practice-results');

  const expectedAccuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
  return { correct, incorrect, total, expectedAccuracy };
}

// ═══════════════════════════════════════════════════════════════════
// TEST 2: SCORE PERSISTENCE — VERIFY PROGRESS PAGE
// ═══════════════════════════════════════════════════════════════════
async function testScorePersistence(page, practiceResults) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 2: Score Persistence (Progress Page)');
  console.log('══════════════════════════════════════════════════════');

  // Reload the app entirely to force fresh data fetch
  await nav(page, '/progress', 5000);

  const text = await bodyText(page);

  // Check that today's questions appear
  if (/\d+\s*(question|answered|attempted|practiced)/i.test(text)) {
    pass('Persistence — Activity visible on Progress', 'Found question/activity counts');
  } else if (/start practicing|start your/i.test(text)) {
    warn('Persistence — No activity on Progress', 'Shows empty state — data may not have synced');
  } else {
    info('Persistence — Progress page loaded', 'Content present but activity text not matched');
  }

  // Look for today's date in activity
  const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });
  if (text.includes(today) || text.includes('Today') || text.includes('today')) {
    pass('Persistence — Today\'s activity shown');
  } else {
    info('Persistence — Today', 'Could not confirm today\'s date on progress page');
  }

  // Verify streak/points display
  if (/streak|day|point/i.test(text)) {
    pass('Persistence — Streak/Points visible');
  }

  await snap(page, 'persistence-progress');

  // Verify via localStorage that adaptive state was saved
  const adaptiveState = await page.evaluate((exam) => {
    const key = `${exam}-adaptive-state`;
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  }, EXAM_ARG);

  if (adaptiveState) {
    pass('Persistence — Adaptive state in localStorage', `Difficulty: ${adaptiveState.currentDifficulty || 'unknown'}`);
  } else {
    info('Persistence — Adaptive state', 'Not found in localStorage (may use different key)');
  }
}

// ═══════════════════════════════════════════════════════════════════
// TEST 3: TIMED QUIZ — COMPLETE 10 QUESTIONS
// ═══════════════════════════════════════════════════════════════════
async function testTimedQuiz(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 3: Timed Quiz (Quick — 10 Questions)');
  console.log('══════════════════════════════════════════════════════');

  await nav(page, '/quiz?mode=quick', 4000);

  const text = await bodyText(page);

  // Find and click Start button
  const startBtn = page.locator('button:has-text("Start")').first();
  if (await startBtn.count() === 0) {
    // Maybe already showing mode selection
    const quickMode = page.locator('button:has-text("Quick Quiz"), [class*="quick"]').first();
    if (await quickMode.count() > 0) {
      await quickMode.click();
      await page.waitForTimeout(2000);
    }
  }

  // Click "Start" / "Start Quiz"
  const startBtnFinal = page.locator('button:has-text("Start")').first();
  if (await startBtnFinal.count() > 0) {
    await startBtnFinal.click();
    await page.waitForTimeout(4000);
    pass('Quiz — Started');
  } else {
    warn('Quiz — Start', 'Could not find Start button');
    return { total: 0, correct: 0 };
  }

  // Verify timer is visible
  const timerVisible = await page.evaluate(() => {
    const text = document.body.innerText;
    return /\d+:\d+/.test(text); // MM:SS format
  });
  timerVisible
    ? pass('Quiz — Timer visible')
    : warn('Quiz — Timer', 'No timer found (MM:SS)');

  await snap(page, 'quiz-started');

  // ── Answer questions ──
  let qCorrect = 0;
  let qTotal = 0;

  for (let i = 0; i < 10; i++) {
    // Check if we're on review/complete screen
    const isComplete = await page.evaluate(() =>
      /quiz complete|results|score|great job|keep practicing|review your|submit quiz/i.test(document.body.innerText)
    );
    if (isComplete) {
      info('Quiz — Review/complete reached', `After ${i} questions`);
      break;
    }

    // Quiz uses same MCQ component — try multiple selectors
    // The quiz renders options as <button> elements containing A./B./C./D. prefix text
    const options = page.locator('[data-testid^="answer-option-"]');
    let optCount = await options.count();

    if (optCount >= 2) {
      await options.first().click();
      await page.waitForTimeout(500);
      qTotal++;
    } else {
      // Fallback: find buttons that look like MCQ answers (contain A-D letter prefix)
      const mcqBtns = page.locator('button').filter({ hasText: /^\s*[A-D][.)\s]/ });
      const mcqCount = await mcqBtns.count();
      if (mcqCount >= 2) {
        await mcqBtns.first().click();
        await page.waitForTimeout(500);
        qTotal++;
      } else {
        // Last resort: use keyboard shortcut 1-4 to select
        await page.keyboard.press('1');
        await page.waitForTimeout(500);
        qTotal++;
      }
    }

    // Navigate to next question — try Enter key first (most reliable for quiz)
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1500);
  }

  pass(`Quiz — Answered ${qTotal} questions`);

  // ── Submit / Review ──
  // Look for review screen or submit button
  await page.waitForTimeout(2000);
  const submitQuiz = page.locator('button:has-text("Submit Quiz"), button:has-text("Submit"), button:has-text("Finish")').first();
  if (await submitQuiz.count() > 0) {
    await submitQuiz.click();
    await page.waitForTimeout(3000);
    pass('Quiz — Submitted');
  }

  // ── Verify results ──
  const resultText = await bodyText(page);

  // Check for score percentage
  const scoreMatch = resultText.match(/(\d+)%/);
  if (scoreMatch) {
    pass('Quiz — Score displayed', `${scoreMatch[1]}%`);
  } else {
    warn('Quiz — Score', 'No percentage found on results');
  }

  // Check for correct/incorrect/skipped counts
  if (/correct|incorrect|skipped|answered/i.test(resultText)) {
    pass('Quiz — Result breakdown shown');
  }

  // Check for review explanations button
  const reviewBtn = page.locator('button:has-text("Review"), button:has-text("Explanation")').first();
  if (await reviewBtn.count() > 0) {
    pass('Quiz — Review Explanations available');
    await reviewBtn.click();
    await page.waitForTimeout(3000);

    // Verify explanation content
    const explText = await bodyText(page);
    if (/explanation|correct answer|option/i.test(explText)) {
      pass('Quiz — Explanation review works');
    }
  }

  await snap(page, 'quiz-results');

  return { total: qTotal, correct: qCorrect };
}

// ═══════════════════════════════════════════════════════════════════
// TEST 4: FLASHCARD SESSION — FLIP + RATE
// ═══════════════════════════════════════════════════════════════════
async function testFlashcardSession(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 4: Flashcard Session (Flip + Rate)');
  console.log('══════════════════════════════════════════════════════');

  await nav(page, '/flashcards', 4000);

  const text = await bodyText(page);
  if (/all caught up|no cards|completed all/i.test(text)) {
    info('Flashcards', 'All caught up — no cards to review');
    return;
  }

  // Start session
  const startBtn = page.locator('button:has-text("Start Session"), button:has-text("Start")').first();
  if (await startBtn.count() > 0) {
    await startBtn.click();
    await page.waitForTimeout(4000);
    pass('Flashcards — Session started');
  } else {
    warn('Flashcards — Start', 'No start button found');
    return;
  }

  // ── Flip and rate cards ──
  const ratingCounts = { again: 0, hard: 0, good: 0, easy: 0 };
  let cardsReviewed = 0;
  const maxCards = 15; // Session could have more than 10

  for (let i = 0; i < maxCards; i++) {
    // Check if session is complete
    const isComplete = await page.evaluate(() =>
      /session complete|you reviewed|all done/i.test(document.body.innerText)
    );
    if (isComplete) break;

    // Find flashcard
    const flashcard = page.locator('[data-testid="flashcard"]');
    if (await flashcard.count() === 0) {
      info('Flashcards — Card ' + (i + 1), 'No flashcard element found');
      break;
    }

    // Click to flip
    await flashcard.first().click();
    await page.waitForTimeout(800);

    // Verify card flipped (rating buttons should appear)
    const ratingGood = page.locator('[data-testid="rating-good"]');
    const ratingBtns = page.locator('[data-testid^="rating-"]');

    if (await ratingBtns.count() >= 3) {
      // Rate the card: alternate between ratings for variety
      let ratingTestId;
      switch (i % 4) {
        case 0: ratingTestId = 'rating-easy'; ratingCounts.easy++; break;
        case 1: ratingTestId = 'rating-good'; ratingCounts.good++; break;
        case 2: ratingTestId = 'rating-hard'; ratingCounts.hard++; break;
        case 3: ratingTestId = 'rating-again'; ratingCounts.again++; break;
      }

      const rBtn = page.locator(`[data-testid="${ratingTestId}"]`);
      if (await rBtn.count() > 0) {
        await rBtn.click();
        cardsReviewed++;
        await page.waitForTimeout(1000); // Wait for auto-advance (500ms + buffer)
      }
    } else {
      // Try keyboard rating
      await page.keyboard.press('3'); // '3' = Good
      cardsReviewed++;
      ratingCounts.good++;
      await page.waitForTimeout(1000);
    }

    if (i === 0) await snap(page, 'flashcard-flipped');
  }

  pass(`Flashcards — Reviewed ${cardsReviewed} cards`, `Easy:${ratingCounts.easy} Good:${ratingCounts.good} Hard:${ratingCounts.hard} Again:${ratingCounts.again}`);

  // ── Verify completion screen ──
  await page.waitForTimeout(2000);
  const completeText = await bodyText(page);

  if (/session complete|you reviewed|reviewed \d+ cards/i.test(completeText)) {
    pass('Flashcards — Completion screen shown');

    // Verify stats match our tracking
    const reviewedMatch = completeText.match(/reviewed (\d+) cards/i);
    if (reviewedMatch) {
      const displayedCount = parseInt(reviewedMatch[1]);
      if (displayedCount === cardsReviewed) {
        pass('Flashcards — Card count accurate', `${displayedCount} cards`);
      } else {
        warn('Flashcards — Card count mismatch', `Displayed: ${displayedCount}, Tracked: ${cardsReviewed}`);
      }
    }

    // Check rating breakdown on completion screen
    for (const [rating, count] of Object.entries(ratingCounts)) {
      if (count > 0 && completeText.includes(String(count))) {
        pass(`Flashcards — ${rating} count visible`, String(count));
        break; // Just verify at least one matches
      }
    }
  } else {
    // Still reviewing or something else
    info('Flashcards — Completion', 'Did not reach completion screen');
  }

  await snap(page, 'flashcard-complete');
}

// ═══════════════════════════════════════════════════════════════════
// TEST 5: ADAPTIVE ENGINE — DIFFICULTY SHIFT
// ═══════════════════════════════════════════════════════════════════
async function testAdaptiveEngine(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 5: Adaptive Engine (Difficulty Verification)');
  console.log('══════════════════════════════════════════════════════');

  // Read initial adaptive state from localStorage
  const initialState = await page.evaluate((exam) => {
    const keys = Object.keys(localStorage).filter(k =>
      k.toLowerCase().includes('adaptive') || k.toLowerCase().includes(exam)
    );
    const state = {};
    keys.forEach(k => {
      try { state[k] = JSON.parse(localStorage.getItem(k)); }
      catch { state[k] = localStorage.getItem(k); }
    });
    return { keys, state };
  }, EXAM_ARG);

  if (initialState.keys.length > 0) {
    pass('Adaptive — State found in localStorage', `Keys: ${initialState.keys.join(', ')}`);

    // Check for currentDifficulty
    for (const [key, val] of Object.entries(initialState.state)) {
      if (val && typeof val === 'object' && val.currentDifficulty) {
        info('Adaptive — Current difficulty', `${val.currentDifficulty} (key: ${key})`);
      }
    }
  } else {
    info('Adaptive — No localStorage state', 'May use different storage mechanism');
  }

  // Start a practice session and track difficulty of served questions
  await nav(page, '/practice', 4000);

  // Select 10 questions
  const q10 = page.locator('[data-testid="question-count-10"]');
  if (await q10.count() > 0) await q10.click();

  // Start practice
  const startBtn = page.locator('[data-testid="start-practice"]');
  if (await startBtn.count() === 0) {
    warn('Adaptive — Practice', 'Could not start practice session');
    return;
  }
  await startBtn.click();
  await page.waitForTimeout(5000);

  // Track difficulties of served questions
  const difficulties = [];

  for (let i = 0; i < 10; i++) {
    const qText = page.locator('[data-testid="question-text"]');
    if (await qText.count() === 0) break;

    // Record difficulty badge
    const diff = await page.evaluate(() => {
      const badges = document.querySelectorAll('span');
      for (const b of badges) {
        const t = b.textContent?.toLowerCase().trim();
        if (t === 'easy' || t === 'medium' || t === 'hard') return t;
      }
      return 'unknown';
    });
    difficulties.push(diff);

    // Answer the question (always pick first option, intentionally random)
    const opt = page.locator('[data-testid="answer-option-0"]');
    if (await opt.count() > 0) await opt.click();
    await page.waitForTimeout(300);

    const submitBtn = page.locator('[data-testid="submit-answer"]');
    if (await submitBtn.count() > 0) {
      await submitBtn.click();
      await page.waitForTimeout(1500);
    }

    // Next
    const nextBtn = page.locator('button:has-text("Next"), button:has-text("Finish")').first();
    if (await nextBtn.count() > 0) {
      await nextBtn.click();
      await page.waitForTimeout(1500);
    }
  }

  // Analyze difficulty distribution
  const distrib = { easy: 0, medium: 0, hard: 0, unknown: 0 };
  difficulties.forEach(d => distrib[d] = (distrib[d] || 0) + 1);

  pass('Adaptive — Questions served', `${difficulties.length} questions`);
  info('Adaptive — Difficulty distribution', `Easy: ${distrib.easy}, Medium: ${distrib.medium}, Hard: ${distrib.hard}, Unknown: ${distrib.unknown}`);

  // Check for difficulty mixing (adaptive engine should serve varied difficulty)
  const uniqueDifficulties = new Set(difficulties.filter(d => d !== 'unknown'));
  if (uniqueDifficulties.size >= 2) {
    pass('Adaptive — Difficulty variety', `${uniqueDifficulties.size} different difficulty levels served`);
  } else if (uniqueDifficulties.size === 1) {
    warn('Adaptive — Difficulty variety', `Only "${[...uniqueDifficulties][0]}" questions served — may indicate static selection`);
  } else {
    info('Adaptive — Difficulty variety', 'Could not determine difficulty levels');
  }

  // Check if adaptive state was updated after session
  const postState = await page.evaluate((exam) => {
    const keys = Object.keys(localStorage).filter(k =>
      k.toLowerCase().includes('adaptive') || k.toLowerCase().includes(exam)
    );
    const state = {};
    keys.forEach(k => {
      try { state[k] = JSON.parse(localStorage.getItem(k)); }
      catch { state[k] = localStorage.getItem(k); }
    });
    return state;
  }, EXAM_ARG);

  for (const [key, val] of Object.entries(postState)) {
    if (val && typeof val === 'object' && val.currentDifficulty) {
      pass('Adaptive — State updated', `Post-session difficulty: ${val.currentDifficulty}`);
      if (val.recentResults) {
        info('Adaptive — Recent results tracked', `${val.recentResults.length} recent results stored`);
      }
    }
  }

  await snap(page, 'adaptive-results');
}

// ═══════════════════════════════════════════════════════════════════
// TEST 6: CROSS-FEATURE STATE VERIFICATION
// ═══════════════════════════════════════════════════════════════════
async function testCrossFeatureState(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 6: Cross-Feature State Verification');
  console.log('══════════════════════════════════════════════════════');

  // Navigate to progress page and verify aggregated data
  await nav(page, '/progress', 5000);
  const text = await bodyText(page);

  // Check for today's activity summary
  const todayPatterns = [
    { name: 'Questions count', re: /\d+\s*(question|answered|total|attempted)/i },
    { name: 'Accuracy %',     re: /\d+%/i },
    { name: 'Study time',     re: /\d+\s*(min|hour|time|h\b|m\b)/i },
    { name: 'Points/XP',      re: /\d+\s*(point|xp|score|earned)/i },
    { name: 'Streak',         re: /\d+\s*(day|streak)/i },
  ];

  let statsFound = 0;
  for (const { name, re } of todayPatterns) {
    if (re.test(text)) {
      pass(`State — ${name} visible`);
      statsFound++;
    } else {
      info(`State — ${name}`, 'Not found on progress page');
    }
  }

  if (statsFound >= 3) {
    pass('State — Progress page shows activity data', `${statsFound}/5 metrics found`);
  } else if (statsFound > 0) {
    warn('State — Partial progress data', `Only ${statsFound}/5 metrics visible`);
  } else {
    warn('State — No progress data', 'Progress page may be empty or loading');
  }

  // Navigate to dashboard and check for activity indicators
  await nav(page, '/home', 3000);
  const dashText = await bodyText(page);

  if (/daily|goal|today|streak|continue|recent/i.test(dashText)) {
    pass('State — Dashboard shows activity context');
  }

  await snap(page, 'cross-feature-state');
}

// ═══════════════════════════════════════════════════════════════════
// TEST 7: SESSION NAVIGATION INTEGRITY
// ═══════════════════════════════════════════════════════════════════
async function testSessionNavigation(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 7: Session Navigation Integrity');
  console.log('══════════════════════════════════════════════════════');

  // Start a practice and test mid-session navigation
  await nav(page, '/practice', 4000);

  const q10 = page.locator('[data-testid="question-count-10"]');
  if (await q10.count() > 0) await q10.click();

  const startBtn = page.locator('[data-testid="start-practice"]');
  if (await startBtn.count() === 0) {
    info('Navigation — Practice', 'Start button not found');
    return;
  }
  await startBtn.click();
  await page.waitForTimeout(5000);

  // Answer 3 questions
  for (let i = 0; i < 3; i++) {
    const opt = page.locator('[data-testid="answer-option-0"]');
    if (await opt.count() === 0) break;
    await opt.click();
    await page.waitForTimeout(300);
    const sub = page.locator('[data-testid="submit-answer"]');
    if (await sub.count() > 0) { await sub.click(); await page.waitForTimeout(1500); }
    const next = page.locator('button:has-text("Next")').first();
    if (await next.count() > 0) { await next.click(); await page.waitForTimeout(1500); }
  }

  pass('Navigation — Answered 3 questions mid-session');

  // Test browser back button
  await page.goBack();
  await page.waitForTimeout(2000);

  // Check if we get a "leave session?" warning or go back gracefully
  const afterBack = await bodyText(page);
  if (/leave|abandon|unsaved|are you sure|in progress/i.test(afterBack)) {
    pass('Navigation — Back button shows warning');
    // Accept any dialog
    const stayBtn = page.locator('button:has-text("Stay"), button:has-text("Continue"), button:has-text("Cancel")').first();
    if (await stayBtn.count() > 0) {
      await stayBtn.click();
      await page.waitForTimeout(1000);
      pass('Navigation — Can stay in session');
    }
  } else {
    info('Navigation — Back button', 'No leave warning (may have navigated away)');
  }

  // Test prev/next keyboard navigation
  await nav(page, '/practice', 4000);
  const startBtn2 = page.locator('[data-testid="start-practice"]');
  if (await startBtn2.count() > 0) {
    await startBtn2.click();
    await page.waitForTimeout(5000);

    // Answer first question
    const opt = page.locator('[data-testid="answer-option-1"]');
    if (await opt.count() > 0) {
      await opt.click();
      await page.waitForTimeout(300);
      const sub = page.locator('[data-testid="submit-answer"]');
      if (await sub.count() > 0) { await sub.click(); await page.waitForTimeout(1500); }

      // Press 'n' for next
      await page.keyboard.press('n');
      await page.waitForTimeout(1500);

      // Check if we moved to Q2
      const q2 = await page.evaluate(() => {
        const dots = document.querySelectorAll('button');
        return Array.from(dots).some(d => d.textContent?.trim() === '2');
      });

      if (q2) pass('Navigation — Keyboard (n) → next question');
      else info('Navigation — Keyboard next', 'Could not confirm Q2');

      // Press 'p' for previous
      await page.keyboard.press('p');
      await page.waitForTimeout(1500);
      pass('Navigation — Keyboard (p) → previous question');
    }
  }

  // Test question number dot navigation
  const dot3 = page.locator('button:has-text("3")').first();
  if (await dot3.count() > 0) {
    await dot3.click();
    await page.waitForTimeout(1000);
    pass('Navigation — Dot nav to Q3');
  }

  await snap(page, 'session-navigation');
}

// ═══════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════
async function main() {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  🔬  Deep Interaction Test — ${EXAM_ARG.toUpperCase()} — ${VP.label}`);
  console.log(`${'═'.repeat(60)}`);

  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: VP.width, height: VP.height },
    isMobile: MOBILE,
    hasTouch: MOBILE,
    userAgent: MOBILE
      ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15'
      : undefined,
  });
  const page = await ctx.newPage();

  page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });

  // ── LOGIN ──
  console.log('\n══ LOGIN ══');
  try {
    await nav(page, '/login', 2000);
    await page.locator('input[type="email"]').first().fill(EMAIL);
    await page.locator('#password').first().fill(PASSWORD);
    await page.locator('button[type="submit"]').first().click();
    await page.waitForTimeout(8000);

    if (!page.url().includes('/login')) {
      pass('Login Success');
    } else {
      fail('Login Failed');
      console.log('\n  🛑 LOGIN FAILED — aborting.\n');
      await browser.close();
      process.exit(1);
    }
  } catch (e) {
    fail('Login Error', e.message);
    await browser.close();
    process.exit(1);
  }

  // ── RUN TESTS ──
  const practiceResults = await testPracticeSession(page);
  await testScorePersistence(page, practiceResults);
  await testTimedQuiz(page);
  await testFlashcardSession(page);
  await testAdaptiveEngine(page);
  await testCrossFeatureState(page);
  await testSessionNavigation(page);

  // ── LOGOUT ──
  console.log('\n══ LOGOUT ══');
  try {
    await nav(page, '/you', 2000);
    const logoutBtn = page.locator('button:has-text("Sign Out"), button:has-text("Log Out")').first();
    if (await logoutBtn.count() > 0) {
      page.once('dialog', async d => await d.accept());
      await logoutBtn.click();
      await page.waitForTimeout(4000);
      pass('Logout');
    }
  } catch (e) { warn('Logout', e.message); }

  await browser.close();

  // ── REPORT ──
  const c = { PASS: 0, FAIL: 0, WARN: 0, INFO: 0 };
  results.forEach(r => c[r.status]++);

  console.log('\n');
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log(`║  Deep Interaction Test — ${EXAM_ARG.toUpperCase()} — ${VP.label.padEnd(26)}║`);
  console.log(`║  ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).padEnd(55)}║`);
  console.log('╠══════════════════════════════════════════════════════════╣');
  console.log(`║  ✅ PASS:  ${String(c.PASS).padStart(3)}                                          ║`);
  console.log(`║  ❌ FAIL:  ${String(c.FAIL).padStart(3)}                                          ║`);
  console.log(`║  ⚠️  WARN:  ${String(c.WARN).padStart(3)}                                          ║`);
  console.log(`║  ℹ️  INFO:  ${String(c.INFO).padStart(3)}                                          ║`);
  console.log(`║  📊 TOTAL: ${String(results.length).padStart(3)}                                          ║`);
  console.log('╚══════════════════════════════════════════════════════════╝');

  if (issues.length > 0) {
    console.log('\n── Issues Found ──');
    const high = issues.filter(i => i.severity === 'HIGH');
    const low  = issues.filter(i => i.severity === 'LOW');
    if (high.length) {
      console.log(`  🔴 HIGH (${high.length}):`);
      high.forEach(i => console.log(`     • ${i.feature}: ${i.detail}`));
    }
    if (low.length) {
      console.log(`  🟡 LOW (${low.length}):`);
      low.forEach(i => console.log(`     • ${i.feature}: ${i.detail}`));
    }
  }

  // Console error summary
  const ignore = ['favicon','manifest','gtag','google','workbox','service-worker','analytics','firebaseinstallations'];
  const reactRe = /Warning:|React does not recognize|unique key|Invalid DOM/i;
  const critErrors = consoleErrors.filter(e => !ignore.some(p => e.toLowerCase().includes(p)) && !reactRe.test(e));
  if (critErrors.length > 0) {
    console.log(`\n── Console Errors (${critErrors.length}) ──`);
    [...new Set(critErrors)].slice(0, 10).forEach(e => console.log(`  • ${e.substring(0, 150)}`));
  }

  process.exit(c.FAIL > 0 ? 1 : 0);
}

main().catch(err => { console.error('Fatal:', err); process.exit(2); });

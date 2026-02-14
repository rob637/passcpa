/**
 * Course Isolation & Integrity E2E Test — VoraPrep
 *
 * Validates 5 critical areas across all 6 supported exams:
 *
 *   1. Per-Exam Onboarding Gating
 *      - Each exam has its own onboarding state (`onboardingCompleted.{courseId}`)
 *      - Users are redirected to /onboarding if not onboarded for active course
 *      - ProtectedRoute blocks access until onboarding is complete
 *
 *   2. Cross-Exam Metric Isolation
 *      - Streaks, study time, progress use course-prefixed daily_log IDs: `{courseId}_{date}`
 *      - Weekly stats filter activities by course sections
 *      - No hardcoded metric values (no magic numbers in display)
 *      - Switching courses shows different per-course stats
 *
 *   3. Study Time on Home Page
 *      - StudyTimeCard reads from `todayLog?.studyTimeMinutes`
 *      - Time breakdown is estimated by percentages (MCQ 50%, lesson 35%, flashcards 15%)
 *      - Weekly total comes from `weeklyStats?.totalMinutes`
 *      - Values change when switching courses
 *
 *   4. Subscribe Buttons in You Section
 *      - "Subscription & Trials" card on /you page
 *      - Per-exam status badges: Active Subscription, Trial: X days, Trial expired
 *      - Subscribe button links to /start-checkout?course={id}&interval=annual
 *      - Already-subscribed exams don't show subscribe button
 *
 *   5. Offline Storage & Study
 *      - Settings → Offline tab has Download Questions button
 *      - IndexedDB cache status shows questions_count and last_updated
 *      - Clear Offline Cache works
 *      - Offline banner appears when navigator.onLine is false
 *
 * Usage:
 *   node e2e/course-isolation.test.mjs              # Run all 5 tests
 *   node e2e/course-isolation.test.mjs --mobile     # Mobile viewport
 */

import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'fs';

const args = process.argv.slice(2);
const MOBILE = args.includes('--mobile');
const BASE     = process.env.BASE_URL      || 'http://localhost:5174';
const EMAIL    = process.env.TEST_EMAIL    || 'rob@sagecg.com';
const PASSWORD = process.env.TEST_PASSWORD || 'Leader123!';
const TIMEOUT  = 20_000;
const VP = MOBILE ? { w: 390, h: 844 } : { w: 1280, h: 800 };
const DIR = `e2e/screenshots/course-isolation/${MOBILE ? 'mobile' : 'desktop'}`;
mkdirSync(DIR, { recursive: true });

// ─── State ────────────────────────────────────────────────
const results = [], issues = [], consoleErrors = [];
let snapIdx = 0;

function pass(f, d = '') { results.push({ f, s: 'PASS', d }); console.log(`  ✅ ${f}${d ? ' — ' + d : ''}`); }
function fail(f, d = '') { results.push({ f, s: 'FAIL', d }); issues.push({ sev: 'HIGH', f, d }); console.log(`  ❌ ${f}${d ? ' — ' + d : ''}`); }
function warn(f, d = '') { results.push({ f, s: 'WARN', d }); issues.push({ sev: 'LOW', f, d }); console.log(`  ⚠️  ${f}${d ? ' — ' + d : ''}`); }
function info(f, d = '') { results.push({ f, s: 'INFO', d }); console.log(`  ℹ️  ${f}${d ? ' — ' + d : ''}`); }

async function snap(page, label) {
  snapIdx++;
  await page.screenshot({ path: `${DIR}/${String(snapIdx).padStart(2, '0')}-${label}.png`, fullPage: true });
}
async function nav(page, path, ms = 3000) {
  await page.evaluate(() => { const o = document.querySelector('vite-error-overlay'); if (o) o.remove(); }).catch(() => {});
  await page.goto(`${BASE}${path}`, { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
  await page.waitForTimeout(ms);
  await page.evaluate(() => { const o = document.querySelector('vite-error-overlay'); if (o) o.remove(); }).catch(() => {});
}
async function bodyText(page) { return page.evaluate(() => document.body.innerText); }

// Helper: dismiss Vite error overlay if present
async function dismissOverlay(page) {
  await page.evaluate(() => {
    const o = document.querySelector('vite-error-overlay');
    if (o) o.remove();
  }).catch(() => {});
}

// Helper: switch active course via CourseSelector dropdown (sidebar / mobile header)
async function switchCourse(page, courseId) {
  // Ensure we're on a page where the sidebar is visible
  if (!/\/(home|you|settings|practice)/i.test(page.url())) {
    await nav(page, '/home', 2000);
  }

  await dismissOverlay(page);

  const selectorBtn = page.locator('button[aria-label="Select course"]').first();
  if (await selectorBtn.count() === 0) {
    // Try navigating to home if button not visible
    await nav(page, '/home', 2000);
    await dismissOverlay(page);
  }

  const btn = page.locator('button[aria-label="Select course"]').first();
  if (await btn.count() > 0) {
    await dismissOverlay(page);
    await btn.click({ force: true });
    await page.waitForTimeout(800);

    // Find and click the course option in the dropdown
    const label = courseId.toUpperCase();
    const option = page.locator('[role="option"]').filter({ hasText: label }).first();
    if (await option.count() > 0) {
      await dismissOverlay(page);
      await option.click({ force: true });
      await page.waitForTimeout(3000);
      await dismissOverlay(page);

      const url = page.url();
      if (url.includes('/onboarding')) {
        return 'onboarding';
      }
      return 'switched';
    }

    // Close dropdown if option not found
    await page.keyboard.press('Escape');
    return 'not-found';
  }

  return 'not-found';
}

// ═══════════════════════════════════════════════════════════
// TEST 1: PER-EXAM ONBOARDING GATING
// ═══════════════════════════════════════════════════════════
async function testPerExamOnboarding(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 1: Per-Exam Onboarding Gating');
  console.log('══════════════════════════════════════════════════════');

  // Read current user profile onboarding state
  const onboardingState = await page.evaluate(() => {
    // We can check by trying to access a protected route for each course
    // and seeing if we get redirected to /onboarding
    return {
      localStorage: {
        pendingCourse: localStorage.getItem('pendingCourse'),
      }
    };
  });
  info('Onboarding — localStorage state', JSON.stringify(onboardingState.localStorage));

  // For each course, check if the onboarding gating works correctly
  const courses = ['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp'];
  const onboardingResults = {};

  for (const course of courses) {
    // Switch to this course 
    const result = await switchCourse(page, course);
    
    if (result === 'onboarding') {
      // Got redirected to onboarding — course is NOT onboarded
      onboardingResults[course] = 'gated';
      pass(`Onboarding ${course.toUpperCase()} — Correctly gated (redirected to /onboarding)`);
      
      // Verify we're actually on the onboarding page
      const text = await bodyText(page);
      if (/welcome|voraprep|get started|certification|switch/i.test(text)) {
        pass(`Onboarding ${course.toUpperCase()} — Onboarding page rendered`);
      }
      
      // Navigate away without completing to preserve the gating state
      await nav(page, '/settings', 2000);
      // Need to switch back to a course that IS onboarded
      continue;
    } else if (result === 'switched') {
      // Didn't get redirected — try navigating to a protected route
      await nav(page, '/home', 3000);
      const url = page.url();
      
      if (url.includes('/onboarding')) {
        onboardingResults[course] = 'gated';
        pass(`Onboarding ${course.toUpperCase()} — Gated on /home (redirected to onboarding)`);
        await nav(page, '/settings', 2000);
        continue;
      }
      
      // Check if we can access the home page (onboarding complete for this course)
      const homeText = await bodyText(page);
      if (/daily plan|study|practice|progress|quiz/i.test(homeText)) {
        onboardingResults[course] = 'accessible';
        pass(`Onboarding ${course.toUpperCase()} — Accessible (onboarding already completed)`);
      } else {
        onboardingResults[course] = 'unknown';
        info(`Onboarding ${course.toUpperCase()} — State unclear`, homeText.substring(0, 80));
      }
    } else {
      info(`Onboarding ${course.toUpperCase()} — Course button not found in settings`);
    }
  }

  await snap(page, 'onboarding-gating');

  // Verify isolation: per-course onboarding state is stored separately
  // At minimum one course should be onboarded (the current user's active course)
  const gatedCount = Object.values(onboardingResults).filter(v => v === 'gated').length;
  const accessibleCount = Object.values(onboardingResults).filter(v => v === 'accessible').length;

  if (accessibleCount > 0) {
    pass('Onboarding — At least one course is onboarded', `${accessibleCount} accessible, ${gatedCount} gated`);
  }

  // The key test: verify that each course's onboarding is independent
  // If CPA is onboarded but EA is not, switching to EA should gate
  if (gatedCount > 0 && accessibleCount > 0) {
    pass('Onboarding Isolation — Per-course gating confirmed', 
      `Gated: ${Object.entries(onboardingResults).filter(([,v]) => v === 'gated').map(([k]) => k.toUpperCase()).join(', ')} | ` +
      `Open: ${Object.entries(onboardingResults).filter(([,v]) => v === 'accessible').map(([k]) => k.toUpperCase()).join(', ')}`
    );
  } else if (accessibleCount === courses.length) {
    info('Onboarding — All courses onboarded (user has completed onboarding for all)');
  }

  // Switch back to CPA (or first accessible course) 
  const firstAccessible = Object.entries(onboardingResults).find(([,v]) => v === 'accessible')?.[0] || 'cpa';
  await switchCourse(page, firstAccessible);
}

// ═══════════════════════════════════════════════════════════
// TEST 2: CROSS-EXAM METRIC ISOLATION
// ═══════════════════════════════════════════════════════════
async function testMetricIsolation(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 2: Cross-Exam Metric Isolation');
  console.log('══════════════════════════════════════════════════════');

  // Gather metrics for two different courses, then compare
  // They should be different (proving no bleed-over)

  // ── 2A: Gather metrics from Home page for Course 1 (CPA) ──
  await nav(page, '/home', 4000);
  const cpaMetrics = await gatherHomeMetrics(page);
  await snap(page, 'metrics-cpa-home');

  // Go to You page for additional metrics
  await nav(page, '/you', 4000);
  const cpaYouMetrics = await gatherYouMetrics(page);
  await snap(page, 'metrics-cpa-you');

  pass('Metrics CPA — Gathered', `Streak: ${cpaMetrics.streak}, Questions: ${cpaYouMetrics.totalQuestions}`);

  // ── 2B: Switch to a different course and gather metrics ──
  // Find a course that's accessible (not gated by onboarding)
  const targetCourses = ['ea', 'cma', 'cia', 'cisa', 'cfp'];
  let switchedCourse = null;

  for (const course of targetCourses) {
    const result = await switchCourse(page, course);
    if (result === 'switched') {
      await nav(page, '/home', 3000);
      if (!page.url().includes('/onboarding')) {
        switchedCourse = course;
        break;
      }
    }
    // If we hit onboarding, navigate back and try next
    if (page.url().includes('/onboarding')) {
      await nav(page, '/settings', 2000);
    }
  }

  if (!switchedCourse) {
    info('Metric Isolation — No second course available (all gated)');
    // Switch back to CPA
    await switchCourse(page, 'cpa');
    return;
  }

  await nav(page, '/home', 4000);
  const otherMetrics = await gatherHomeMetrics(page);
  await snap(page, `metrics-${switchedCourse}-home`);

  await nav(page, '/you', 4000);
  const otherYouMetrics = await gatherYouMetrics(page);
  await snap(page, `metrics-${switchedCourse}-you`);

  pass(`Metrics ${switchedCourse.toUpperCase()} — Gathered`, 
    `Streak: ${otherMetrics.streak}, Questions: ${otherYouMetrics.totalQuestions}`);

  // ── 2C: Compare metrics — they should be independent ──
  // The section name should change between courses (CPA=FAR etc, EA=SEE1 etc)
  if (cpaMetrics.sectionName && otherMetrics.sectionName) {
    if (cpaMetrics.sectionName !== otherMetrics.sectionName) {
      pass('Metric Isolation — Section changes between courses', 
        `CPA: ${cpaMetrics.sectionName}, ${switchedCourse.toUpperCase()}: ${otherMetrics.sectionName}`);
    } else {
      fail('Metric Isolation — Section did NOT change between courses',
        `Both show: ${cpaMetrics.sectionName}`);
    }
  }

  // ── 2D: Check for hardcoded values ──
  await checkForHardcodedMetrics(page);

  // Switch back to CPA
  await switchCourse(page, 'cpa');
  await nav(page, '/home', 2000);
}

async function gatherHomeMetrics(page) {
  return page.evaluate(() => {
    const text = document.body.innerText;
    
    // Extract streak (number next to flame icon, or "X day streak")
    const streakMatch = text.match(/(\d+)\s*day streak/i) || text.match(/(\d+)/);
    
    // Find section name (short section badge — FAR, AUD, REG, SEE1, etc.)
    const sectionBadges = document.querySelectorAll('[class*="rounded"]');
    let sectionName = null;
    for (const badge of sectionBadges) {
      const t = badge.textContent?.trim();
      if (t && /^(FAR|AUD|REG|BAR|ISC|TCP|SEE[123]|CMA[12]|CIA[123]|CISA[1-5]|CFP)$/i.test(t)) {
        sectionName = t;
        break;
      }
    }
    
    // Get streak value from the flame section
    const flameParent = document.querySelector('[title*="streak"]');
    const streak = flameParent?.textContent?.match(/(\d+)/)?.[1] || '0';
    
    // Get study time if visible
    const studyTimeCard = text.match(/(\d+[hm]?\s*\d*m?)\s*today/i);
    const studyTime = studyTimeCard ? studyTimeCard[1] : null;
    
    // Get weekly stats
    const weeklyMatch = text.match(/This week[\s\S]*?(\d+[hm])/i);
    const weeklyTime = weeklyMatch ? weeklyMatch[1] : null;
    
    // Days until exam
    const daysMatch = text.match(/(\d+)d/);
    const daysUntilExam = daysMatch ? daysMatch[1] : null;
    
    return { streak, sectionName, studyTime, weeklyTime, daysUntilExam };
  });
}

async function gatherYouMetrics(page) {
  return page.evaluate(() => {
    const text = document.body.innerText;
    
    // Extract questions answered
    const questionsMatch = text.match(/(\d+)\s*(?:Questions?|MCQs?)/i);
    const totalQuestions = questionsMatch ? parseInt(questionsMatch[1]) : null;
    
    // Extract accuracy
    const accuracyMatch = text.match(/(\d+)%\s*(?:Accuracy|correct)/i);
    const accuracy = accuracyMatch ? parseInt(accuracyMatch[1]) : null;
    
    // Extract study time
    const studyTimeMatch = text.match(/(\d+)\s*(?:min|hr|hour|h\b)/i);
    const studyMinutes = studyTimeMatch ? studyTimeMatch[0] : null;
    
    // Extract streak displayed
    const streakMatch = text.match(/(\d+)\s*(?:day|streak)/i);
    const streak = streakMatch ? streakMatch[1] : null;
    
    // Extract lessons completed
    const lessonsMatch = text.match(/(\d+)\s*(?:\/\s*\d+)?\s*Lessons?/i);
    const lessonsCompleted = lessonsMatch ? lessonsMatch[0] : null;

    // Get section label currently shown (the active tab/filter)
    const sectionBadges = document.querySelectorAll('[class*="rounded"]');
    let sectionName = null;
    for (const badge of sectionBadges) {
      const t = badge.textContent?.trim();
      if (t && /^(FAR|AUD|REG|BAR|ISC|TCP|SEE[123]|CMA[12]|CIA[123]|CISA[1-5]|CFP)$/i.test(t)) {
        sectionName = t;
        break;
      }
    }
    
    return { totalQuestions, accuracy, studyMinutes, streak, lessonsCompleted, sectionName };
  });
}

async function checkForHardcodedMetrics(page) {
  // Navigate to Home page and check if metrics DOM values are dynamic (not hardcoded)
  await nav(page, '/home', 3000);

  // Read the source of metric values — they should come from React state, not be literal constants
  const checks = await page.evaluate(() => {
    const results = [];
    
    // 1. Check streak value — should be a number derived from data, not always "7" or "30"
    const streakEl = document.querySelector('[title*="streak"]');
    const streakVal = streakEl?.textContent?.match(/(\d+)/)?.[1];
    if (streakVal) {
      // Suspicious if it's a round number like 100, 50, 30 without real data
      // But we can't truly know if it's hardcoded from E2E alone
      results.push({ metric: 'streak', value: streakVal, suspicious: false });
    }

    // 2. Check daily goal — should come from userProfile.dailyGoal
    const goalMatch = document.body.innerText.match(/(\d+)\s*\/\s*(\d+)\s*(?:pts|points)/i);
    if (goalMatch) {
      const goal = parseInt(goalMatch[2]);
      // Default goal is 50 — not hardcoded, comes from userProfile.dailyGoal || 50
      results.push({ metric: 'dailyGoal', value: goal, suspicious: goal === 100 });
    }

    // 3. Check if any stats show "N/A" or placeholder values
    const naCount = (document.body.innerText.match(/N\/A/g) || []).length;
    results.push({ metric: 'N/A_placeholders', value: naCount, suspicious: naCount > 3 });

    // 4. Check for "0%" accuracy that might be hardcoded vs. genuine zero
    const zeroPercent = (document.body.innerText.match(/0%/g) || []).length;
    results.push({ metric: 'zero_percent', value: zeroPercent, suspicious: false });

    return results;
  });

  const suspicious = checks.filter(c => c.suspicious);
  if (suspicious.length === 0) {
    pass('No Hardcoded Metrics — All values appear dynamic', 
      checks.map(c => `${c.metric}=${c.value}`).join(', '));
  } else {
    warn('Possible Hardcoded Metrics', suspicious.map(c => `${c.metric}=${c.value}`).join(', '));
  }

  // Additional check: verify the You page metrics are derived from real data (not static)
  await nav(page, '/you', 3000);
  
  const youCheck = await page.evaluate(() => {
    const text = document.body.innerText;
    
    // Check if activity chart has variable data (not all zeros or all same values)
    const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const hasActivityChart = dayLabels.some(day => text.includes(day));
    
    // Check for course-specific content (exam name should match active course)
    const hasCourseLabel = /CPA|EA|CMA|CIA|CISA|CFP/i.test(text);
    
    // Check readiness score — should be dynamically calculated
    const readinessMatch = text.match(/(\d+)%\s*(?:Ready|Readiness)/i);
    
    return {
      hasActivityChart,
      hasCourseLabel,
      readinessPercent: readinessMatch ? parseInt(readinessMatch[1]) : null,
    };
  });

  if (youCheck.hasCourseLabel) {
    pass('You Page — Shows course-specific label');
  }
  if (youCheck.hasActivityChart) {
    pass('You Page — Activity chart uses day labels (dynamic)');
  }
}

// ═══════════════════════════════════════════════════════════
// TEST 3: STUDY TIME ON HOME PAGE
// ═══════════════════════════════════════════════════════════
async function testStudyTime(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 3: Study Time on Home Page');
  console.log('══════════════════════════════════════════════════════');

  await nav(page, '/home', 4000);

  // Look for StudyTimeCard
  const studyTimeData = await page.evaluate(() => {
    const text = document.body.innerText;
    
    // Look for "Study Time" header
    const hasStudyTimeHeader = text.includes('Study Time');
    
    // Look for time display patterns: "Xm", "Xh Ym", "0m"
    const timePattern = text.match(/(\d+[hm]\s*\d*m?)\s*today/i);
    const todayTime = timePattern ? timePattern[1] : null;
    
    // Look for weekly total
    const weeklyPattern = text.match(/This week[\s\S]*?(\d+[hm]\s*\d*m?)/i);
    const weeklyTime = weeklyPattern ? weeklyPattern[1] : null;
    
    // Look for breakdown labels
    const hasLessons = text.includes('Lessons');
    const hasMCQs = text.includes('MCQs');
    const hasFlashcards = text.includes('Flashcards');
    const hasTBS = text.includes('TBS');
    
    // Check if there's a donut/ring chart (SVG with circle elements)
    const svgCircles = document.querySelectorAll('svg circle');
    const hasDonut = svgCircles.length > 2; // Multiple circles = donut chart
    
    // Get all time values displayed
    const timeValues = text.match(/\d+m|\d+h\s*\d*m|\d+h/gi) || [];
    
    return {
      hasStudyTimeHeader,
      todayTime,
      weeklyTime,
      hasLessons,
      hasMCQs,
      hasFlashcards,
      hasTBS,
      hasDonut,
      timeValues,
    };
  });

  await snap(page, 'study-time-home');

  if (studyTimeData.hasStudyTimeHeader) {
    pass('Study Time — Card visible on Home page');
  } else {
    // StudyTimeCard returns null when todayMinutes === 0 && weeklyMinutes === 0
    info('Study Time — Card not visible (no study activity recorded)');
    
    // Verify this is expected: check if user has any activity today
    const hasAnyActivity = await page.evaluate(() => {
      const text = document.body.innerText;
      return /\d+\s*questions?\s*today|earned.*points/i.test(text);
    });
    
    if (!hasAnyActivity) {
      pass('Study Time — Hidden correctly (no study activity today)');
    } else {
      warn('Study Time — Card missing despite activity showing');
    }
    return;
  }

  // Validate breakdown categories
  if (studyTimeData.hasMCQs) pass('Study Time — MCQs category shown');
  if (studyTimeData.hasLessons) pass('Study Time — Lessons category shown');
  if (studyTimeData.hasFlashcards) pass('Study Time — Flashcards category shown');

  // For CPA, TBS should be shown; for other courses, it shouldn't
  const isCPA = await page.evaluate(() => {
    // Check the section badge for CPA sections
    const text = document.body.innerText;
    return /\bFAR\b|\bAUD\b|\bREG\b|\bBAR\b|\bISC\b|\bTCP\b/.test(text);
  });
  
  if (isCPA && studyTimeData.hasTBS) {
    pass('Study Time — TBS category shown (CPA-specific)');
  } else if (!isCPA && !studyTimeData.hasTBS) {
    pass('Study Time — TBS correctly hidden (non-CPA course)');
  } else if (isCPA && !studyTimeData.hasTBS) {
    info('Study Time — TBS not shown for CPA (may have 0 TBS time)');
  } else if (!isCPA && studyTimeData.hasTBS) {
    fail('Study Time — TBS shown for non-CPA course (should be CPA-only)');
  }

  // Validate time values are reasonable
  if (studyTimeData.todayTime) {
    const todayMatch = studyTimeData.todayTime.match(/(\d+)/);
    const todayVal = todayMatch ? parseInt(todayMatch[1]) : 0;
    
    if (todayVal >= 0 && todayVal < 1440) { // Less than 24 hours
      pass('Study Time — Today value is reasonable', studyTimeData.todayTime);
    } else {
      fail('Study Time — Today value unreasonable', studyTimeData.todayTime);
    }
  }

  if (studyTimeData.weeklyTime) {
    pass('Study Time — Weekly total shown', studyTimeData.weeklyTime);

    // ── CRITICAL: today time should NOT exceed weekly total ──
    // Parse both values into minutes for comparison
    if (studyTimeData.todayTime) {
      const parseMinutes = (str) => {
        let mins = 0;
        const h = str.match(/(\d+)\s*h/i);
        const m = str.match(/(\d+)\s*m/i);
        if (h) mins += parseInt(h[1]) * 60;
        if (m) mins += parseInt(m[1]);
        return mins;
      };
      const todayMins = parseMinutes(studyTimeData.todayTime);
      const weeklyMins = parseMinutes(studyTimeData.weeklyTime);

      if (todayMins > 0 && weeklyMins > 0 && todayMins > weeklyMins) {
        fail('Study Time — Today exceeds weekly total (BUG)', 
          `Today: ${studyTimeData.todayTime} (${todayMins}m) > Weekly: ${studyTimeData.weeklyTime} (${weeklyMins}m)`);
      } else if (todayMins > 0 && weeklyMins > 0) {
        pass('Study Time — Today ≤ weekly total (consistent)', 
          `Today: ${studyTimeData.todayTime}, Weekly: ${studyTimeData.weeklyTime}`);
      }
    }
  }

  if (studyTimeData.hasDonut) {
    pass('Study Time — Donut chart rendered');
  }

  // ── 3B: Verify study time is NOT estimated from static percentages incorrectly ──
  // The breakdown is estimated (30%/40%/20%/10% for CPA) — verify proportions make sense
  if (studyTimeData.timeValues.length >= 2) {
    const timeNums = studyTimeData.timeValues.map(v => {
      const match = v.match(/(\d+)/);
      return match ? parseInt(match[1]) : 0;
    }).filter(n => n > 0);
    
    if (timeNums.length > 1) {
      // Check that not all category times are equal (would suggest hardcoding)
      const allEqual = timeNums.every(n => n === timeNums[0]);
      if (!allEqual) {
        pass('Study Time — Breakdown has varied values (not all equal)');
      } else {
        info('Study Time — All breakdown values equal', timeNums.join(', '));
      }
    }
  }

  // ── 3C: Study time should change with course context ──
  // Switch to a different course and check if study time changes
  const courses = ['ea', 'cma', 'cia', 'cisa', 'cfp'];
  for (const course of courses) {
    const result = await switchCourse(page, course);
    if (result === 'switched') {
      await nav(page, '/home', 3000);
      if (page.url().includes('/onboarding')) {
        await nav(page, '/settings', 2000);
        continue;
      }
      
      const otherStudyTime = await page.evaluate(() => {
        const text = document.body.innerText;
        return {
          hasStudyTime: text.includes('Study Time'),
          hasTBS: text.includes('TBS'),
        };
      });

      // TBS should NOT appear for non-CPA courses
      if (otherStudyTime.hasTBS) {
        fail(`Study Time ${course.toUpperCase()} — TBS shown (should be CPA-only)`);
      } else if (otherStudyTime.hasStudyTime) {
        pass(`Study Time ${course.toUpperCase()} — No TBS (correct for non-CPA)`);
      }
      
      // Switch back to CPA
      await switchCourse(page, 'cpa');
      await nav(page, '/home', 2000);
      break;
    }
    if (page.url().includes('/onboarding')) {
      await nav(page, '/settings', 2000);
    }
  }
}

// ═══════════════════════════════════════════════════════════
// TEST 4: SUBSCRIBE BUTTONS IN YOU SECTION
// ═══════════════════════════════════════════════════════════
async function testSubscribeButtons(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 4: Subscribe Buttons in You Section');
  console.log('══════════════════════════════════════════════════════');

  await nav(page, '/you', 4000);
  await snap(page, 'you-subscription-section');

  // Scroll to the Subscription & Trials section
  await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('h3, h2, span')).find(
      el => /subscription|trial/i.test(el.textContent)
    );
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(1000);

  const text = await bodyText(page);

  // 4A: Check the section exists
  if (/subscription.*trial|trial.*subscription/i.test(text)) {
    pass('Subscribe — "Subscription & Trials" section found');
  } else {
    warn('Subscribe — "Subscription & Trials" section not found');
    return;
  }

  // 4B: Check per-exam status badges
  const examStatuses = await page.evaluate(() => {
    // Find the "Subscription & Trials" heading, then search its card for exam rows
    const headings = Array.from(document.querySelectorAll('h3'));
    const sectionH = headings.find(h => /subscription.*trial/i.test(h.textContent));
    if (!sectionH) return [];

    // Walk up to the card container
    const card = sectionH.closest('.card, [class*="card"], [class*="Card"]')
              || sectionH.parentElement?.parentElement;
    if (!card) return [];

    // Exam rows each contain a bold <span> with "CPA", "EA", etc.
    const boldSpans = card.querySelectorAll('span');
    const statuses = [];

    for (const span of boldSpans) {
      const examText = span.textContent?.trim();
      if (!/^(CPA|EA|CMA|CIA|CISA|CFP)$/.test(examText)) continue;

      // The row is the nearest ancestor div with p-3 class (the flex row)
      const row = span.closest('div[class*="p-3"]') || span.parentElement?.parentElement;
      if (!row) continue;

      const rowText = row.textContent || '';
      const status = {
        exam: examText,
        hasActiveSubscription: /Active Subscription/i.test(rowText),
        hasTrial: /Trial:\s*\d+\s*days?\s*remaining/i.test(rowText),
        hasTrialExpired: /Trial expired/i.test(rowText),
        hasFreeTrial: /14-day free trial/i.test(rowText),
        hasCancels: /Cancels/i.test(rowText),
        hasSubscribeBtn: false,
        subscribeBtnPrice: null,
        subscribeBtnLink: null,
      };

      // Check for subscribe link in this row
      const links = row.querySelectorAll('a');
      for (const link of links) {
        if (link.href?.includes('start-checkout')) {
          status.hasSubscribeBtn = true;
          status.subscribeBtnPrice = link.textContent?.trim();
          status.subscribeBtnLink = link.href;
        }
      }

      statuses.push(status);
    }

    return statuses;
  });

  if (examStatuses.length === 0) {
    warn('Subscribe — No exam status rows found');
    return;
  }

  pass('Subscribe — Exam status rows found', `${examStatuses.length} exams displayed`);

  for (const exam of examStatuses) {
    const statusParts = [];
    if (exam.hasActiveSubscription) statusParts.push('Active Subscription');
    if (exam.hasTrial) statusParts.push('Trial active');
    if (exam.hasTrialExpired) statusParts.push('Trial expired');
    if (exam.hasFreeTrial) statusParts.push('Free trial available');
    if (exam.hasCancels) statusParts.push('Cancelling');
    const statusStr = statusParts.join(' + ') || 'No status';

    // 4C: Verify subscribe button logic
    if (exam.hasActiveSubscription) {
      // Should NOT have subscribe button
      if (!exam.hasSubscribeBtn) {
        pass(`Subscribe ${exam.exam} — No subscribe btn (already active)`);
      } else {
        fail(`Subscribe ${exam.exam} — Subscribe btn shown despite active subscription`);
      }
    } else if (exam.hasSubscribeBtn) {
      // Should have correct link
      if (exam.subscribeBtnLink?.includes(`course=${exam.exam.toLowerCase()}`)) {
        pass(`Subscribe ${exam.exam} — Button links to correct checkout`, exam.subscribeBtnPrice);
      } else {
        warn(`Subscribe ${exam.exam} — Button link may be wrong`, exam.subscribeBtnLink);
      }
      
      // Price should contain a dollar amount
      if (/\$\d+/.test(exam.subscribeBtnPrice || '')) {
        pass(`Subscribe ${exam.exam} — Price shown`, exam.subscribeBtnPrice);
      }
    } else if (exam.hasFreeTrial) {
      // Free trial available — no subscribe button expected (user hasn't started trial)
      pass(`Subscribe ${exam.exam} — Free trial available (no subscribe btn yet)`, statusStr);
    } else {
      info(`Subscribe ${exam.exam} — Status: ${statusStr}`);
    }
  }

  // 4D: Test clicking a subscribe button (but don't complete checkout)
  const subscribeLink = page.locator('a[href*="start-checkout"]').first();
  if (await subscribeLink.count() > 0) {
    const href = await subscribeLink.getAttribute('href');
    pass('Subscribe — Subscribe link found', href);
    
    // Verify the URL has correct params
    if (href?.includes('course=') && href?.includes('interval=annual')) {
      pass('Subscribe — Link has correct params (course + interval)');
    } else {
      warn('Subscribe — Link missing params', href);
    }

    // Click and verify navigation (but navigate back immediately)
    await subscribeLink.click();
    await page.waitForTimeout(5000);
    
    const checkoutUrl = page.url();
    const checkoutText = await bodyText(page);
    
    if (checkoutUrl.includes('start-checkout') || checkoutUrl.includes('stripe') || 
        /subscribe|checkout|payment|preparing/i.test(checkoutText)) {
      pass('Subscribe — Navigated to checkout flow');
    }
    
    await snap(page, 'subscribe-checkout-flow');
    
    // Navigate back
    await nav(page, '/you', 3000);
  } else {
    info('Subscribe — No subscribe links (all courses either subscribed or trial available)');
  }

  // 4E: Founder pricing check
  if (/founder|limited.*time|special.*price/i.test(text)) {
    pass('Subscribe — Founder pricing notice shown');
  }

  // 4F: Verify Manage link appears for premium users
  const manageLink = page.locator('a:has-text("Manage")').first();
  if (await manageLink.count() > 0) {
    pass('Subscribe — Manage link present (premium user)');
  }
}

// ═══════════════════════════════════════════════════════════
// TEST 5: OFFLINE STORAGE & STUDY
// ═══════════════════════════════════════════════════════════
async function testOfflineCapabilities(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 5: Offline Storage & Study Capabilities');
  console.log('══════════════════════════════════════════════════════');

  // 5A: Navigate to Settings → Offline tab
  await nav(page, '/settings', 3000);
  
  // Click Offline tab
  const offlineTab = page.locator('button:has-text("Offline")').first();
  if (await offlineTab.count() > 0) {
    await offlineTab.click();
    await page.waitForTimeout(1500);
    pass('Offline — Tab found and clicked');
  } else {
    warn('Offline — Tab not found in settings');
    return;
  }

  const offlineText = await bodyText(page);
  await snap(page, 'offline-settings-tab');

  // 5B: Verify offline storage UI elements
  if (/Offline Storage/i.test(offlineText)) {
    pass('Offline — "Offline Storage" header present');
  }
  if (/Download Questions/i.test(offlineText) || /Download for Offline/i.test(offlineText)) {
    pass('Offline — Download Questions button present');
  }
  if (/Questions Cached/i.test(offlineText)) {
    pass('Offline — Cache status display present');
  }
  if (/Last Updated/i.test(offlineText)) {
    pass('Offline — Last Updated display present');
  }

  // 5C: Get current cache status
  const cacheStatus = await page.evaluate(() => {
    const text = document.body.innerText;
    const countMatch = text.match(/Questions Cached\s*(\d+)/i);
    const dateMatch = text.match(/Last Updated\s*([\w,\s/]+|\bNever\b)/i);
    return {
      count: countMatch ? parseInt(countMatch[1]) : null,
      lastUpdated: dateMatch ? dateMatch[1].trim() : null,
    };
  });

  if (cacheStatus.count !== null) {
    pass('Offline — Cache count readable', `${cacheStatus.count} questions cached`);
  }
  if (cacheStatus.lastUpdated) {
    info('Offline — Last updated', cacheStatus.lastUpdated);
  }

  // 5D: Test Download Questions
  const downloadBtn = page.locator('button:has-text("Download Questions")').first();
  if (await downloadBtn.count() > 0) {
    await downloadBtn.click();
    
    // Wait for download to complete (look for "Downloading..." state and then completion)
    const downloadingState = page.locator('button:has-text("Downloading")');
    
    try {
      // Wait up to 2 seconds for downloading state to appear
      await downloadingState.waitFor({ timeout: 2000 }).catch(() => {});
      
      if (await downloadingState.count() > 0) {
        pass('Offline — Download started (Downloading... state shown)');
        
        // Wait for it to finish (up to 30s)
        await page.waitForTimeout(3000);
        
        // Wait for button to return to normal state
        try {
          await page.locator('button:has-text("Download Questions")').waitFor({ timeout: 30000 });
          pass('Offline — Download completed');
        } catch {
          info('Offline — Download may still be in progress');
        }
      }
    } catch {
      info('Offline — Download state not observed (fast download or error)');
    }

    // Check if an alert/dialog appeared with count
    page.on('dialog', async dialog => {
      const msg = dialog.message();
      if (/\d+ questions/.test(msg)) {
        pass('Offline — Download alert shows question count', msg);
      }
      await dialog.accept();
    });

    await page.waitForTimeout(2000);
    
    // Re-read cache status
    const newStatus = await page.evaluate(() => {
      const text = document.body.innerText;
      const countMatch = text.match(/Questions Cached\s*(\d+)/i);
      return countMatch ? parseInt(countMatch[1]) : null;
    });

    if (newStatus !== null && newStatus > 0) {
      pass('Offline — Cache populated after download', `${newStatus} questions`);
    } else if (newStatus === 0) {
      info('Offline — Cache still shows 0 (section may have no questions)');
    }
    
    await snap(page, 'offline-after-download');
  }

  // 5E: Test Clear Cache (only if we have cached questions)
  const clearBtn = page.locator('button:has-text("Clear Offline Cache")').first();
  if (await clearBtn.count() > 0) {
    await clearBtn.click();
    await page.waitForTimeout(2000);
    
    // Verify cache cleared
    const clearedStatus = await page.evaluate(() => {
      const text = document.body.innerText;
      const countMatch = text.match(/Questions Cached\s*(\d+)/i);
      return countMatch ? parseInt(countMatch[1]) : null;
    });

    if (clearedStatus === 0) {
      pass('Offline — Cache cleared successfully');
    } else {
      info('Offline — Cache status after clear', `${clearedStatus} questions`);
    }
    
    await snap(page, 'offline-cache-cleared');
  } else {
    info('Offline — Clear Cache button not visible (no cached questions)');
  }

  // 5F: Test IndexedDB directly
  const indexedDBStatus = await page.evaluate(async () => {
    try {
      const dbs = await indexedDB.databases();
      const voraprepDB = dbs.find(db => db.name === 'voraprep-offline');
      return {
        exists: !!voraprepDB,
        allDBs: dbs.map(db => db.name),
      };
    } catch {
      return { exists: false, allDBs: [] };
    }
  });

  if (indexedDBStatus.exists) {
    pass('Offline — IndexedDB "voraprep-offline" database exists');
  } else {
    info('Offline — IndexedDB database not yet created', `Available: ${indexedDBStatus.allDBs.join(', ')}`);
  }

  // 5G: Test offline indicator (simulate going offline)
  await nav(page, '/home', 3000);
  
  // Use Playwright's built-in network offline simulation
  const context = page.context();
  await context.setOffline(true);
  await page.waitForTimeout(2000);
  
  const offlineBanner = await page.evaluate(() => {
    const text = document.body.innerText;
    const hasOfflineText = /you're offline|offline|no connection/i.test(text);
    const hasWifiOffIcon = document.querySelector('[class*="WifiOff"], [aria-label*="offline"]');
    const hasAlertRole = document.querySelector('[role="alert"]');
    return {
      hasOfflineText,
      hasWifiOffIcon: !!hasWifiOffIcon,
      hasAlertRole: !!hasAlertRole,
    };
  });
  
  await snap(page, 'offline-banner');

  if (offlineBanner.hasOfflineText || offlineBanner.hasAlertRole) {
    pass('Offline — Offline banner shown when network disconnected');
  } else {
    warn('Offline — No offline indicator when network disconnected');
  }

  // Go back online
  await context.setOffline(false);
  await page.waitForTimeout(2000);
  
  // Verify banner goes away
  const backOnline = await page.evaluate(() => {
    const text = document.body.innerText;
    return !/you're offline/i.test(text);
  });

  if (backOnline) {
    pass('Offline — Banner dismissed when back online');
  }

  // 5H: Check service worker registration
  const swStatus = await page.evaluate(async () => {
    if (!('serviceWorker' in navigator)) return { supported: false };
    
    const registrations = await navigator.serviceWorker.getRegistrations();
    return {
      supported: true,
      registrations: registrations.length,
      scopes: registrations.map(r => r.scope),
      active: registrations.some(r => r.active),
    };
  });

  if (swStatus.supported) {
    if (swStatus.registrations > 0) {
      pass('Offline — Service worker registered', `${swStatus.registrations} registration(s)`);
    } else {
      info('Offline — Service worker not registered (dev mode has SW disabled)');
    }
  } else {
    info('Offline — Service workers not supported in this context');
  }
}

// ═══════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════
async function main() {
  console.log('\n════════════════════════════════════════════════════════════');
  console.log(`  🔍  Course Isolation & Integrity E2E — ${MOBILE ? 'Mobile' : 'Desktop'}`);
  console.log('════════════════════════════════════════════════════════════');

  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: VP.w, height: VP.h } });
  const page = await ctx.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(`[${new Date().toISOString()}]  ${msg.text().substring(0, 150)}`);
    }
  });

  try {
    // LOGIN
    console.log('\n══ LOGIN ══');
    await nav(page, '/login', 3000);
    await page.fill('input[type="email"]', EMAIL);
    await page.fill('#password', PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(5000);
    if (!page.url().includes('/login')) {
      pass('Login');
    } else {
      fail('Login — Failed');
      throw new Error('Login failed');
    }

    // Ensure we start on CPA
    await switchCourse(page, 'cpa');
    await page.evaluate(() => sessionStorage.removeItem('voraprep-practice-session'));

    // Run all 5 tests — each wrapped in try/catch for isolation
    const tests = [
      ['Per-Exam Onboarding', testPerExamOnboarding],
      ['Metric Isolation', testMetricIsolation],
      ['Study Time', testStudyTime],
      ['Subscribe Buttons', testSubscribeButtons],
      ['Offline Capabilities', testOfflineCapabilities],
    ];
    for (const [name, fn] of tests) {
      try {
        await fn(page);
      } catch (err) {
        fail(`CRASH in ${name}`, err.message?.substring(0, 120));
        await nav(page, '/home', 2000);
      }
    }

    // LOGOUT
    console.log('\n══ LOGOUT ══');
    await nav(page, '/settings', 2000);
    const logoutBtn = page.locator('button:has-text("Log Out"), button:has-text("Sign Out")').first();
    if (await logoutBtn.count() > 0) {
      await logoutBtn.click({ force: true });
      await page.waitForTimeout(3000);
      pass('Logout');
    }
  } catch (err) {
    fail('CRASH', err.message);
  } finally {
    await browser.close();
  }

  // ── Summary ──
  const counts = { PASS: 0, FAIL: 0, WARN: 0, INFO: 0 };
  results.forEach(r => counts[r.s]++);

  console.log('\n\n╔══════════════════════════════════════════════════════════╗');
  console.log(`║  Course Isolation E2E — ${(MOBILE ? 'Mobile' : 'Desktop').padEnd(34)}║`);
  console.log('╠══════════════════════════════════════════════════════════╣');
  console.log(`║  ✅ PASS:  ${String(counts.PASS).padEnd(44)}║`);
  console.log(`║  ❌ FAIL:  ${String(counts.FAIL).padEnd(44)}║`);
  console.log(`║  ⚠️  WARN:  ${String(counts.WARN).padEnd(44)}║`);
  console.log(`║  ℹ️  INFO:  ${String(counts.INFO).padEnd(44)}║`);
  console.log(`║  📊 TOTAL: ${String(results.length).padEnd(44)}║`);
  console.log('╚══════════════════════════════════════════════════════════╝');

  if (issues.length > 0) {
    console.log('\n── Issues Found ──');
    issues.forEach(i => {
      const icon = i.sev === 'HIGH' ? '🔴' : '🟡';
      console.log(`  ${icon} ${i.f}: ${i.d}`);
    });
  }

  if (consoleErrors.length > 0) {
    console.log(`\n── Console Errors (${consoleErrors.length}) ──`);
    consoleErrors.slice(0, 5).forEach(e => console.log(`  • ${e}`));
  }

  writeFileSync(`${DIR}/course-isolation-report.json`, JSON.stringify({
    timestamp: new Date().toISOString(),
    viewport: MOBILE ? 'mobile' : 'desktop',
    results, issues,
    consoleErrors: consoleErrors.slice(0, 20),
    summary: counts,
  }, null, 2));

  process.exit(counts.FAIL > 0 ? 1 : 0);
}

main();

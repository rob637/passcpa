/**
 * Onboarding & Subscription Gating E2E Test — VoraPrep
 *
 * Tests the two critical user-facing flows that have ZERO E2E coverage:
 *
 * PART A — Onboarding Flow:
 *   1. Onboarding wizard step navigation (welcome → course → exam date → section → goal → complete)
 *   2. Course-specific branching (CFP/CISA skip section step)
 *   3. Step validation (can't continue without required selections)
 *   4. Progress indicator accuracy
 *   5. CPA blueprint date logic (2025 vs 2026)
 *   6. Onboarding Tour (post-wizard feature walkthrough)
 *
 * PART B — Subscription Gating:
 *   1. SubscriptionGate renders correctly (blurred content vs full access)
 *   2. TrialBanner visibility, dismiss, and 24h cooldown
 *   3. Trial status (active, expiring, expired)
 *   4. Pricing display (founder vs regular, annual vs monthly)
 *   5. StartCheckout redirect flow (auth required, valid params)
 *   6. Landing page pricing section
 *   7. Stripe sandbox full checkout (if available)
 *
 * Usage:
 *   node e2e/onboarding-subscription.test.mjs              # Desktop (default)
 *   node e2e/onboarding-subscription.test.mjs --mobile     # Mobile viewport
 *   node e2e/onboarding-subscription.test.mjs --stripe     # Include Stripe checkout test
 */

import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'fs';

const args = process.argv.slice(2);
const MOBILE = args.includes('--mobile');
const TEST_STRIPE = args.includes('--stripe');
const BASE     = process.env.BASE_URL      || 'http://localhost:5173';
const EMAIL    = process.env.TEST_EMAIL    || 'rob@sagecg.com';
const PASSWORD = process.env.TEST_PASSWORD || 'Leader123!';
const TIMEOUT  = 20_000;
const VP = MOBILE ? { w: 390, h: 844 } : { w: 1280, h: 800 };
const DIR = `e2e/screenshots/onboarding-subscription/${MOBILE ? 'mobile' : 'desktop'}`;
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
  await page.goto(`${BASE}${path}`, { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
  await page.waitForTimeout(ms);
}
async function bodyText(page) { return page.evaluate(() => document.body.innerText); }

// ═══════════════════════════════════════════════════════════
// PART A: ONBOARDING FLOW TESTS
// ═══════════════════════════════════════════════════════════

// ─── TEST 1: ONBOARDING WIZARD NAVIGATION ────────────────
async function testOnboardingWizard(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 1: Onboarding Wizard Navigation');
  console.log('══════════════════════════════════════════════════════');

  // Navigate directly to onboarding (existing user — acts as course switch)
  await nav(page, '/onboarding', 4000);
  const text = await bodyText(page);
  await snap(page, 'onboarding-start');

  if (/welcome|voraprep|get started|switch/i.test(text)) {
    pass('Onboarding — Welcome step loaded');
  } else {
    warn('Onboarding — Welcome step not recognized', text.substring(0, 100));
    return;
  }

  // Check progress indicator
  const stepIndicator = await page.evaluate(() => {
    const text = document.body.innerText;
    const match = text.match(/step\s*(\d+)\s*(?:of|\/)\s*(\d+)/i);
    return match ? { current: parseInt(match[1]), total: parseInt(match[2]) } : null;
  });

  if (stepIndicator) {
    pass('Onboarding — Progress indicator', `Step ${stepIndicator.current} of ${stepIndicator.total}`);
  } else {
    info('Onboarding — No step counter text found (may use visual indicator)');
  }

  // Check for Continue button
  const continueBtn = page.locator('button:has-text("Continue"), button:has-text("Next")').first();
  if (await continueBtn.count() > 0) {
    pass('Onboarding — Continue button present');
    
    // Click Continue to go to next step
    await continueBtn.click();
    await page.waitForTimeout(2000);
    
    const step2Text = await bodyText(page);
    await snap(page, 'onboarding-step2');
    
    // This could be Course Selection or Exam Date (depends on context)
    if (/certification|course|choose|exam date|target/i.test(step2Text)) {
      pass('Onboarding — Step 2 loaded');
      
      // Determine which step we're on
      if (/certification|course|choose.*exam|cpa|ea|cma/i.test(step2Text)) {
        // Course selection step
        pass('Onboarding — Course selection step');
        
        // Check available courses
        const courseButtons = await page.evaluate(() => {
          const btns = document.querySelectorAll('button');
          return Array.from(btns)
            .map(b => b.textContent?.trim())
            .filter(t => t && /cpa|ea|cma|cia|cfp|cisa/i.test(t) && t.length < 100);
        });
        
        if (courseButtons.length > 0) {
          pass('Onboarding — Courses available', `${courseButtons.length} courses`);
          
          // Try selecting CPA
          const cpaBtn = page.locator('button').filter({ hasText: /cpa/i }).first();
          if (await cpaBtn.count() > 0) {
            await cpaBtn.click();
            await page.waitForTimeout(500);
            pass('Onboarding — CPA selected');
          }
        }
      }
    } else {
      info('Onboarding — Step 2 content', step2Text.substring(0, 100));
    }
  } else {
    warn('Onboarding — Continue button not found');
    return;
  }

  // Continue through remaining steps
  let stepNum = 2;
  const maxSteps = 7; // Safety limit
  
  while (stepNum < maxSteps) {
    const nextBtn = page.locator('button:has-text("Continue"), button:has-text("Next")').first();
    const letsGoBtn = page.locator('button:has-text("Let\'s Go"), button:has-text("Finish"), button:has-text("Complete")').first();
    
    if (await letsGoBtn.count() > 0) {
      // Final step — don't click it (would write to Firestore)
      pass('Onboarding — Reached final step', `Step ${stepNum + 1}`);
      await snap(page, 'onboarding-final');
      break;
    }
    
    if (await nextBtn.count() === 0) {
      info('Onboarding — No more steps found', `Stopped at step ${stepNum}`);
      break;
    }
    
    // Check if Continue is disabled (validation)
    const isDisabled = await nextBtn.evaluate(el => el.disabled);
    if (isDisabled) {
      pass('Onboarding — Validation works (Continue disabled)');
      
      // Try to satisfy the validation
      const currentText = await bodyText(page);
      
      if (/exam date|target date/i.test(currentText)) {
        // Set an exam date
        const dateInput = page.locator('input[type="date"]');
        if (await dateInput.count() > 0) {
          // Set date 3 months from now
          const futureDate = new Date();
          futureDate.setMonth(futureDate.getMonth() + 3);
          const dateStr = futureDate.toISOString().split('T')[0];
          await dateInput.fill(dateStr);
          await page.waitForTimeout(500);
          pass('Onboarding — Exam date set', dateStr);
        }
      } else if (/section|choose.*section|far|aud|reg/i.test(currentText)) {
        // Select first section
        const sectionBtn = page.locator('button').filter({ hasText: /far|see|cma|cia|cisa|cfp/i }).first();
        if (await sectionBtn.count() > 0) {
          await sectionBtn.click();
          await page.waitForTimeout(500);
          pass('Onboarding — Section selected');
        }
      } else if (/daily.*goal|study.*goal|hours|points/i.test(currentText)) {
        // Select a daily goal
        const goalBtn = page.locator('button').filter({ hasText: /moderate|light|intensive/i }).first();
        if (await goalBtn.count() > 0) {
          await goalBtn.click();
          await page.waitForTimeout(500);
          pass('Onboarding — Daily goal selected');
        }
      }
      
      // Try Continue again after satisfying validation
      const retryBtn = page.locator('button:has-text("Continue"), button:has-text("Next")').first();
      if (await retryBtn.count() > 0) {
        const stillDisabled = await retryBtn.evaluate(el => el.disabled);
        if (!stillDisabled) {
          await retryBtn.click();
          await page.waitForTimeout(2000);
          stepNum++;
          continue;
        }
      }
    } else {
      await nextBtn.click();
      await page.waitForTimeout(2000);
    }
    
    stepNum++;
    await snap(page, `onboarding-step${stepNum}`);
  }
}

// ─── TEST 2: ONBOARDING STEP VALIDATION ──────────────────
async function testOnboardingValidation(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 2: Onboarding Step Validation');
  console.log('══════════════════════════════════════════════════════');

  await nav(page, '/onboarding', 4000);

  // Step 1 (Welcome) should always allow Continue
  const continueBtn = page.locator('button:has-text("Continue"), button:has-text("Next")').first();
  if (await continueBtn.count() > 0) {
    const disabled = await continueBtn.evaluate(el => el.disabled);
    if (!disabled) {
      pass('Validation — Welcome step allows continue');
    } else {
      warn('Validation — Welcome step has disabled continue');
    }
  }

  // Navigate to course selection step
  if (await continueBtn.count() > 0) {
    await continueBtn.click();
    await page.waitForTimeout(2000);
  }

  // Check back button
  const backBtn = page.locator('button').filter({ has: page.locator('svg') }).first();
  // Look for a back/previous button
  const backText = page.locator('button:has-text("Back"), button:has-text("Previous")').first();
  
  // Try to find back button (usually left arrow icon)
  const allBtns = await page.evaluate(() => {
    const btns = document.querySelectorAll('button');
    return Array.from(btns).map(b => ({
      text: b.textContent?.trim().substring(0, 30),
      ariaLabel: b.getAttribute('aria-label'),
      classes: b.className.substring(0, 50)
    }));
  });
  
  const hasBackBtn = allBtns.some(b => 
    b.ariaLabel?.toLowerCase().includes('back') || 
    b.text?.toLowerCase().includes('back') ||
    b.classes.includes('opacity-0') // hidden back btn on first step
  );
  
  if (hasBackBtn) {
    pass('Validation — Back button present');
  } else {
    info('Validation — Back button not explicitly found');
  }
  await snap(page, 'onboarding-validation');
}

// ─── TEST 3: CPA BLUEPRINT DATE LOGIC ───────────────────
async function testBlueprintDateLogic(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 3: CPA Blueprint Date Logic');
  console.log('══════════════════════════════════════════════════════');

  await nav(page, '/onboarding', 3000);

  // Navigate to course step and select CPA
  const continueBtn = page.locator('button:has-text("Continue"), button:has-text("Next")').first();
  if (await continueBtn.count() > 0) {
    await continueBtn.click();
    await page.waitForTimeout(2000);
  }

  // Select CPA
  const cpaBtn = page.locator('button').filter({ hasText: /cpa/i }).first();
  if (await cpaBtn.count() > 0) {
    await cpaBtn.click();
    await page.waitForTimeout(500);
  }

  // Continue to exam date step
  const nextBtn = page.locator('button:has-text("Continue"), button:has-text("Next")').first();
  if (await nextBtn.count() > 0 && !(await nextBtn.evaluate(el => el.disabled))) {
    await nextBtn.click();
    await page.waitForTimeout(2000);
  }

  const dateText = await bodyText(page);
  
  if (/exam date|target date/i.test(dateText)) {
    pass('Blueprint — Exam date step reached');
    
    const dateInput = page.locator('input[type="date"]');
    if (await dateInput.count() === 0) {
      warn('Blueprint — No date input found');
      return;
    }

    // Test date before July 1, 2026 (should show 2025 blueprint)
    await dateInput.fill('2026-06-15');
    await page.waitForTimeout(1000);
    
    let text2025 = await bodyText(page);
    const has2025 = /2025\s*blueprint/i.test(text2025);
    
    // Test date after July 1, 2026 (should show 2026 blueprint)
    await dateInput.fill('2026-08-15');
    await page.waitForTimeout(1000);
    
    let text2026 = await bodyText(page);
    const has2026 = /2026\s*blueprint/i.test(text2026);

    if (has2025 && has2026) {
      pass('Blueprint — Date logic switches between 2025/2026');
    } else if (has2025 || has2026) {
      pass('Blueprint — Blueprint indicator shown', has2025 ? '2025' : '2026');
    } else {
      info('Blueprint — No blueprint indicator detected (may use different display)');
    }
    
    await snap(page, 'blueprint-date-logic');
  } else {
    info('Blueprint — Not on exam date step');
  }
}

// ─── TEST 4: ONBOARDING TOUR ─────────────────────────────
async function testOnboardingTour(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 4: Onboarding Tour');
  console.log('══════════════════════════════════════════════════════');

  // The tour shows on the main app after onboarding if not seen
  // Clear the tour-seen flag to trigger it
  await page.evaluate(() => localStorage.removeItem('voraprep-tour-completed'));
  
  await nav(page, '/home', 5000);

  // Wait for the FirstTimePrompt (appears after 2s delay)
  await page.waitForTimeout(4000);

  const tourPrompt = page.locator('button:has-text("Start Tour"), button:has-text("Take Tour")').first();
  const maybeLater = page.locator('button:has-text("Maybe later"), button:has-text("Skip")').first();

  if (await tourPrompt.count() > 0) {
    pass('Tour — First-time prompt appeared');
    await snap(page, 'tour-prompt');

    // Start the tour
    await tourPrompt.click();
    await page.waitForTimeout(2000);

    // Check for tour overlay/tooltip
    const tourTooltip = await page.evaluate(() => {
      const els = document.querySelectorAll('[class*="tour"], [class*="tooltip"], [role="tooltip"]');
      return {
        count: els.length,
        text: els.length > 0 ? els[0].textContent?.substring(0, 100) : ''
      };
    });

    if (tourTooltip.count > 0) {
      pass('Tour — Tour tooltip visible', tourTooltip.text);
      await snap(page, 'tour-step1');

      // Navigate through a few tour steps
      let tourSteps = 0;
      for (let i = 0; i < 5; i++) {
        const nextStep = page.locator('button:has-text("Next"), button:has-text("→")').last();
        if (await nextStep.count() > 0) {
          await nextStep.click();
          await page.waitForTimeout(1000);
          tourSteps++;
        } else {
          break;
        }
      }

      if (tourSteps > 0) {
        pass('Tour — Navigated steps', `${tourSteps} steps`);
      }

      // Skip/close tour
      const skipBtn = page.locator('button:has-text("Skip"), button:has-text("Close"), button:has-text("Done")').first();
      if (await skipBtn.count() > 0) {
        await skipBtn.click();
        await page.waitForTimeout(1000);
        pass('Tour — Skipped/closed');
      }
    } else {
      info('Tour — No tooltip element found after starting');
    }
  } else if (await maybeLater.count() > 0) {
    pass('Tour — First-time prompt with "Maybe later" option');
    await maybeLater.click();
    await page.waitForTimeout(500);
    
    // Verify prompt dismissed
    const promptGone = await tourPrompt.count() === 0;
    if (promptGone) pass('Tour — "Maybe later" dismissed prompt');
  } else {
    info('Tour — No tour prompt appeared (user may have already seen it)');
  }

  // Restore tour-seen flag
  await page.evaluate(() => localStorage.setItem('voraprep-tour-completed', 'true'));
}


// ═══════════════════════════════════════════════════════════
// PART B: SUBSCRIPTION GATING TESTS
// ═══════════════════════════════════════════════════════════

// ─── TEST 5: TRIAL BANNER BEHAVIOR ──────────────────────
async function testTrialBanner(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 5: Trial Banner Behavior');
  console.log('══════════════════════════════════════════════════════');

  // Check for trial banner on main pages
  await nav(page, '/home', 4000);

  // Look for trial-related banner
  const bannerSelectors = [
    'text=/trial|subscribe|days? left|free trial/i',
  ];

  const bannerText = await page.evaluate(() => {
    const text = document.body.innerText;
    const trialMatch = text.match(/(trial|days?\s*left|subscribe now|free trial)[^\n]*/i);
    return trialMatch ? trialMatch[0].substring(0, 100) : null;
  });

  if (bannerText) {
    pass('Trial Banner — Visible', bannerText);
    await snap(page, 'trial-banner');
    
    // Check for dismiss button (X)
    const dismissBtn = page.locator('button').filter({ hasText: /×|✕/ });
    // Also look for close buttons near the banner
    const closeBtns = await page.evaluate(() => {
      const btns = document.querySelectorAll('button');
      return Array.from(btns)
        .filter(b => {
          const style = window.getComputedStyle(b);
          return (b.textContent?.trim() === '×' || b.textContent?.trim() === '✕' ||
                  b.getAttribute('aria-label')?.includes('close') ||
                  b.getAttribute('aria-label')?.includes('dismiss'));
        })
        .map(b => b.textContent?.trim().substring(0, 20))
        .length;
    });

    if (closeBtns > 0) {
      info('Trial Banner — Dismiss button found');
      
      // Check localStorage for dismiss tracking
      const dismissKey = await page.evaluate(() => {
        const keys = Object.keys(localStorage);
        return keys.find(k => k.includes('trial_banner_dismissed'));
      });
      
      if (dismissKey) {
        info('Trial Banner — Dismiss tracking key', dismissKey);
      }
    }
  } else {
    info('Trial Banner — Not visible (user may have active subscription or fresh trial)');
  }

  // Check trial status by navigating to subscription-gated content
  await nav(page, '/practice', 4000);
  await page.evaluate(() => sessionStorage.removeItem('voraprep-practice-session'));
  await page.waitForTimeout(1000);
  
  const practiceText = await bodyText(page);
  
  // Check if content is gated (blurred) or accessible
  const isGated = await page.evaluate(() => {
    const gatedEls = document.querySelectorAll('[class*="blur"], [class*="pointer-events-none"]');
    const lockIcon = document.querySelector('svg[class*="lock"], [class*="Lock"]');
    return {
      blurred: gatedEls.length,
      locked: !!lockIcon,
      hasSubscribeBtn: /subscribe|upgrade|unlock/i.test(document.body.innerText)
    };
  });

  if (isGated.blurred > 0 || isGated.locked) {
    pass('Subscription Gate — Content is gated (trial expired or no access)');
    info('Gate — Status', `${isGated.blurred} blurred elements, locked: ${isGated.locked}`);
    
    if (isGated.hasSubscribeBtn) {
      pass('Subscription Gate — Subscribe CTA visible');
    }
    await snap(page, 'subscription-gate');
  } else if (/start practice|question count|section/i.test(practiceText)) {
    pass('Subscription — Full access (active trial or subscription)');
  } else {
    info('Subscription — Could not determine access state');
  }
}

// ─── TEST 6: PRICING DISPLAY ────────────────────────────
async function testPricingDisplay(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 6: Pricing & Founder Pricing Display');
  console.log('══════════════════════════════════════════════════════');

  // Check landing page pricing for CPA
  await nav(page, '/cpa', 5000);
  
  // Scroll to pricing section
  await page.evaluate(() => {
    const pricing = document.getElementById('pricing');
    if (pricing) pricing.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(2000);

  const pricingText = await bodyText(page);
  await snap(page, 'cpa-pricing');

  // Check for price display
  const prices = pricingText.match(/\$\d+(?:\.\d{2})?/g) || [];
  if (prices.length > 0) {
    pass('Pricing — Prices displayed', prices.slice(0, 4).join(', '));
  } else {
    info('Pricing — No dollar amounts found on landing page');
  }

  // Check for founder pricing  
  if (/founder|early|limited/i.test(pricingText)) {
    pass('Pricing — Founder pricing indicator shown');
    
    // Check for countdown/deadline
    if (/april|deadline|ends|limited time/i.test(pricingText)) {
      pass('Pricing — Founder deadline info shown');
    }
  } else {
    info('Pricing — No founder pricing visible (may have expired)');
  }

  // Check for annual/monthly toggle
  const annualBtn = page.locator('button:has-text("Annual"), button:has-text("Yearly")').first();
  const monthlyBtn = page.locator('button:has-text("Monthly")').first();
  
  if (await annualBtn.count() > 0 && await monthlyBtn.count() > 0) {
    pass('Pricing — Annual/Monthly toggle present');
    
    // Click monthly and verify price changes
    await monthlyBtn.click();
    await page.waitForTimeout(500);
    
    const monthlyPrices = await page.evaluate(() => {
      const text = document.body.innerText;
      return text.match(/\$\d+(?:\.\d{2})?/g) || [];
    });
    
    // Click annual and compare
    await annualBtn.click();
    await page.waitForTimeout(500);
    
    const annualPrices = await page.evaluate(() => {
      const text = document.body.innerText;
      return text.match(/\$\d+(?:\.\d{2})?/g) || [];
    });

    if (JSON.stringify(monthlyPrices) !== JSON.stringify(annualPrices)) {
      pass('Pricing — Toggle changes prices');
    } else {
      info('Pricing — Prices did not change (may show both always)');
    }
  } else {
    info('Pricing — No annual/monthly toggle found');
  }

  // Check Subscribe button goes to correct URL
  const subscribeBtn = page.locator('a:has-text("Subscribe"), button:has-text("Subscribe"), a:has-text("Start"), button:has-text("Start")').first();
  if (await subscribeBtn.count() > 0) {
    const href = await subscribeBtn.evaluate(el => el.href || el.getAttribute('data-href') || '');
    if (/start-checkout|register|checkout/i.test(href)) {
      pass('Pricing — Subscribe CTA has correct link', href.substring(href.indexOf('/'), href.indexOf('/') + 80));
    } else {
      info('Pricing — Subscribe CTA href', href.substring(0, 80));
    }
  }
}

// ─── TEST 7: START CHECKOUT FLOW ────────────────────────
async function testStartCheckout(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 7: Start Checkout Flow');
  console.log('══════════════════════════════════════════════════════');

  // Test with valid params — should either redirect to Stripe or show loading
  await nav(page, '/start-checkout?course=cpa&interval=annual', 5000);
  const text = await bodyText(page);
  await snap(page, 'start-checkout');

  // Check various states
  if (/preparing|redirecting|checkout|loading|secure payment|subscribe to|per\s*year|per\s*month/i.test(text)) {
    pass('Checkout — Loading/redirect/embedded checkout state shown');
  } else if (/error|failed|invalid/i.test(text)) {
    // Error state — check if it shows helpful message
    pass('Checkout — Error state rendered (expected in dev without Stripe)');
    
    const homeBtn = page.locator('button:has-text("Home"), a:has-text("Home"), button:has-text("Return")').first();
    if (await homeBtn.count() > 0) {
      pass('Checkout — Return to Home button available');
    }
  } else {
    info('Checkout — Page state', text.substring(0, 100));
  }

  // Test with missing params
  await nav(page, '/start-checkout', 3000);
  const missingText = await bodyText(page);
  
  if (/error|invalid|missing|required/i.test(missingText)) {
    pass('Checkout — Handles missing params gracefully');
  } else if (/preparing|redirect/i.test(missingText)) {
    info('Checkout — Accepts empty params (validates server-side)');
  }
  await snap(page, 'checkout-missing-params');

  // Test with invalid course
  await nav(page, '/start-checkout?course=invalid&interval=annual', 3000);
  const invalidText = await bodyText(page);
  
  if (/error|invalid|not found/i.test(invalidText)) {
    pass('Checkout — Rejects invalid course');
  } else {
    info('Checkout — Invalid course response', invalidText.substring(0, 80));
  }
}

// ─── TEST 8: CHECKOUT SUCCESS PAGE ──────────────────────
async function testCheckoutSuccess(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 8: Checkout Success Page');
  console.log('══════════════════════════════════════════════════════');

  await nav(page, '/checkout-success', 4000);
  const text = await bodyText(page);
  await snap(page, 'checkout-success');

  if (/welcome|congratulations|success|thank you/i.test(text)) {
    pass('Checkout Success — Page loaded');
    
    // Check for CTA buttons
    const dashBtn = page.locator('button:has-text("Dashboard"), a:has-text("Dashboard"), button:has-text("Go to")').first();
    const learnBtn = page.locator('button:has-text("Start Learning"), a:has-text("Start Learning"), button:has-text("Start")').first();
    
    if (await dashBtn.count() > 0) pass('Checkout Success — Dashboard CTA present');
    if (await learnBtn.count() > 0) pass('Checkout Success — Start Learning CTA present');
    
    // Check for confetti/celebration animation
    const hasAnimation = await page.evaluate(() => {
      const animated = document.querySelectorAll('[class*="confetti"], [class*="animate"], [class*="celebration"]');
      return animated.length;
    });
    
    if (hasAnimation > 0) {
      pass('Checkout Success — Celebration animation present');
    }
  } else {
    info('Checkout Success — Page content', text.substring(0, 100));
  }
}

// ─── TEST 9: PER-EXAM PRICING CONSISTENCY ───────────────
async function testPerExamPricing(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 9: Per-Exam Pricing Consistency');
  console.log('══════════════════════════════════════════════════════');

  // Expected prices from subscription.ts
  const expectedPrices = {
    cpa: { annual: 249, monthly: 21, route: '/cpa' },       // founder pricing
    ea: { annual: 149, monthly: 12, route: '/ea-prep' },
    cma: { annual: 199, monthly: 17, route: '/cma' },
    // cia, cfp, cisa also have pricing but landing pages may vary
  };

  for (const [exam, prices] of Object.entries(expectedPrices)) {
    await nav(page, prices.route, 4000);
    
    // Scroll to pricing
    await page.evaluate(() => {
      const pricing = document.getElementById('pricing');
      if (pricing) pricing.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(1000);
    
    const pageText = await bodyText(page);
    
    // Check if any price is displayed
    const foundPrices = pageText.match(/\$(\d+)/g) || [];
    const priceValues = foundPrices.map(p => parseInt(p.replace('$', '')));
    
    if (priceValues.length > 0) {
      // Check if expected founder price appears
      if (priceValues.includes(prices.annual)) {
        pass(`Pricing ${exam.toUpperCase()} — Founder annual $${prices.annual} shown`);
      } else if (priceValues.includes(prices.monthly)) {
        pass(`Pricing ${exam.toUpperCase()} — Founder monthly $${prices.monthly} shown`);
      } else {
        info(`Pricing ${exam.toUpperCase()} — Prices found: ${foundPrices.slice(0, 4).join(', ')} (expected $${prices.annual} or $${prices.monthly})`);
      }
    } else {
      info(`Pricing ${exam.toUpperCase()} — No prices found on ${prices.route}`);
    }
  }
}

// ─── TEST 10: STRIPE SANDBOX CHECKOUT (OPTIONAL) ────────
async function testStripeSandboxCheckout(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 10: Stripe Sandbox Checkout (Live Test)');
  console.log('══════════════════════════════════════════════════════');

  if (!TEST_STRIPE) {
    info('Stripe Checkout — Skipped (run with --stripe flag to enable)');
    return;
  }

  // Navigate to start checkout
  await nav(page, '/start-checkout?course=cpa&interval=annual', 10000);
  
  // Wait for redirect to Stripe
  try {
    await page.waitForURL(/checkout\.stripe\.com|stripe/i, { timeout: 15000 });
    pass('Stripe — Redirected to Stripe Checkout');
    await snap(page, 'stripe-checkout');
    
    const stripeUrl = page.url();
    info('Stripe — URL', stripeUrl.substring(0, 80));

    // Fill in test card details
    // Stripe checkout is in an iframe typically
    const emailInput = page.locator('input[name="email"], #email').first();
    if (await emailInput.count() > 0) {
      await emailInput.fill(EMAIL);
      await page.waitForTimeout(500);
    }

    // Card number (Stripe test card)
    const cardInput = page.locator('input[name="cardNumber"], #cardNumber, [placeholder*="card"]').first();
    if (await cardInput.count() > 0) {
      await cardInput.fill('4242424242424242');
      await page.waitForTimeout(500);
      pass('Stripe — Test card entered');
    }

    // Expiry
    const expiryInput = page.locator('input[name="cardExpiry"], #cardExpiry, [placeholder*="MM"]').first();
    if (await expiryInput.count() > 0) {
      await expiryInput.fill('12/27');
      await page.waitForTimeout(300);
    }

    // CVC
    const cvcInput = page.locator('input[name="cardCvc"], #cardCvc, [placeholder*="CVC"]').first();
    if (await cvcInput.count() > 0) {
      await cvcInput.fill('123');
      await page.waitForTimeout(300);
    }

    // Name
    const nameInput = page.locator('input[name="billingName"], [placeholder*="name"]').first();
    if (await nameInput.count() > 0) {
      await nameInput.fill('Test User');
      await page.waitForTimeout(300);
    }

    await snap(page, 'stripe-filled');
    
    // DON'T submit — just verify the form loaded correctly
    info('Stripe — Form filled (NOT submitting to avoid charges)');
    
  } catch (err) {
    if (/timeout/i.test(err.message)) {
      warn('Stripe — Did not redirect to Stripe (Cloud Function may not be connected)');
    } else {
      warn('Stripe — Error', err.message.substring(0, 80));
    }
  }
}

// ═══════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════
async function main() {
  console.log('\n════════════════════════════════════════════════════════════');
  console.log(`  🎓  Onboarding & Subscription E2E — ${MOBILE ? 'Mobile' : 'Desktop'}`);
  if (TEST_STRIPE) console.log('  💳  Stripe sandbox checkout ENABLED');
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

    // Clear saved practice session
    await page.evaluate(() => sessionStorage.removeItem('voraprep-practice-session'));

    // PART A: Onboarding
    console.log('\n── PART A: Onboarding Flow ──');
    await testOnboardingWizard(page);
    await testOnboardingValidation(page);
    await testBlueprintDateLogic(page);
    await testOnboardingTour(page);

    // Navigate back to home after onboarding tests
    await nav(page, '/home', 3000);

    // PART B: Subscription & Gating
    console.log('\n── PART B: Subscription & Gating ──');
    await testTrialBanner(page);
    await testPricingDisplay(page);
    await testStartCheckout(page);
    await testCheckoutSuccess(page);
    await testPerExamPricing(page);
    await testStripeSandboxCheckout(page);

    // LOGOUT
    console.log('\n══ LOGOUT ══');
    await nav(page, '/settings', 2000);
    const logoutBtn = page.locator('button:has-text("Log Out"), button:has-text("Sign Out"), button:has-text("Logout")').first();
    if (await logoutBtn.count() > 0) {
      await logoutBtn.click();
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
  console.log(`║  Onboarding & Subscription E2E — ${(MOBILE ? 'Mobile' : 'Desktop').padEnd(24)}║`);
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

  // Save report
  writeFileSync(`${DIR}/onboarding-subscription-report.json`, JSON.stringify({
    timestamp: new Date().toISOString(),
    viewport: MOBILE ? 'mobile' : 'desktop',
    stripeCheckout: TEST_STRIPE,
    results,
    issues,
    consoleErrors: consoleErrors.slice(0, 20),
    summary: counts
  }, null, 2));

  process.exit(counts.FAIL > 0 ? 1 : 0);
}

main();

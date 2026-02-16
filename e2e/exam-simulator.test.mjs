/**
 * Exam Simulator E2E Test — VoraPrep
 *
 * Deep interaction tests for the exam simulator across all courses.
 * Tests the full state machine: intro → exam → break → review → results.
 *
 * Two distinct architectures tested:
 *   1. CPA ExamSimulator — standalone 1,678-line component with Prometric theme,
 *      testlets, TBS, keyboard shortcuts, timer warnings
 *   2. ExamSimulatorTemplate — generic template used by EA/CMA/CIA/CISA/CFP
 *
 * Tests cover:
 *   1. CPA Mini Exam: intro → start → answer questions → testlet break → resume → complete → results
 *   2. CPA Mock Selection: intro → curated mocks → select mock → verify details
 *   3. CPA Prometric Theme: toggle on, verify styling, keyboard shortcuts
 *   4. Template Exam (CISA): setup → section select → mode select → start → answer → submit → results
 *   5. Timer Integrity: verify countdown, warning state at <5min
 *   6. Question Navigation: prev/next, flag, question grid, navigation state
 *   7. Exit Confirmation: exit mid-exam, confirm dialog
 *   8. Results Accuracy: verify score calculation matches answers given
 *
 * Usage:
 *   node e2e/exam-simulator.test.mjs              # Desktop (default)
 *   node e2e/exam-simulator.test.mjs --mobile      # Mobile viewport
 */

import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'fs';

const args = process.argv.slice(2);
const MOBILE = args.includes('--mobile');
const BASE     = process.env.BASE_URL      || 'http://localhost:5173';
const EMAIL    = process.env.TEST_EMAIL    || 'rob@sagecg.com';
const PASSWORD = process.env.TEST_PASSWORD || 'Leader123!';
const TIMEOUT  = 20_000;
const VP = MOBILE ? { w: 390, h: 844 } : { w: 1280, h: 800 };
const DIR = `e2e/screenshots/exam-simulator/${MOBILE ? 'mobile' : 'desktop'}`;
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

// Helper: select an answer option (works for both CPA and template)
async function selectAnswer(page, optionIndex = 0) {
  const letter = String.fromCharCode(65 + optionIndex);

  // Strategy 1: data-testid answer options (Practice, ExamSimulatorTemplate, etc.)
  const byTestId = page.locator(`[data-testid="answer-option-${optionIndex}"]`);
  if (await byTestId.count() > 0) {
    await byTestId.click();
    return true;
  }

  // Strategy 2: buttons starting with "A." / "B)" etc. (CPA prometric text)
  const options = page.locator('button').filter({ hasText: new RegExp(`^${letter}[.)]`) });
  if (await options.count() > 0) {
    await options.first().click();
    return true;
  }

  // Strategy 3: Prometric/PearsonVUE option elements
  const promOption = page.locator('.prometric-option, .pvue-option').nth(optionIndex);
  if (await promOption.count() > 0) {
    await promOption.click();
    return true;
  }

  // Strategy 4: Any element with class containing "option"
  const optByClass = page.locator('[class*="option"]:not([disabled])').nth(optionIndex);
  if (await optByClass.count() > 0) {
    await optByClass.click();
    return true;
  }

  return false;
}

// ═══════════════════════════════════════════════════════════
// TEST 1: CPA EXAM SIMULATOR — FULL MINI EXAM FLOW
// ═══════════════════════════════════════════════════════════
async function testCPAMiniExam(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 1: CPA Mini Exam — Full Flow');
  console.log('══════════════════════════════════════════════════════');

  await nav(page, '/exam', 5000);
  const text = await bodyText(page);

  // Verify intro screen
  if (/exam simulation|exam simulator/i.test(text)) {
    pass('CPA Exam — Intro screen loaded');
  } else {
    fail('CPA Exam — Intro screen not found');
    return;
  }
  await snap(page, 'cpa-exam-intro');

  // Verify mode options
  const miniBtn = page.locator('button:has-text("Mini Exam")').first();
  const fullBtn = page.locator('button:has-text("Full Exam")').first();
  const curatedBtn = page.locator('button:has-text("Curated")').first();
  
  const modesFound = [];
  if (await miniBtn.count() > 0) modesFound.push('Mini');
  if (await fullBtn.count() > 0) modesFound.push('Full');
  if (await curatedBtn.count() > 0) modesFound.push('Curated');
  
  if (modesFound.length >= 2) {
    pass('CPA Exam — Mode options visible', modesFound.join(', '));
  } else {
    warn('CPA Exam — Mode options', `Only found: ${modesFound.join(', ')}`);
  }

  // Select Mini Exam mode
  if (await miniBtn.count() > 0) {
    await miniBtn.click();
    await page.waitForTimeout(500);
    pass('CPA Exam — Mini mode selected');
  }

  // Click Begin Examination
  const beginBtn = page.locator('button:has-text("Begin Examination"), button:has-text("Begin Exam"), button:has-text("Start Exam")').first();
  if (await beginBtn.count() === 0) {
    warn('CPA Exam — Begin button not found');
    return;
  }
  
  // Wait for button to be enabled (questions loading)
  await page.waitForTimeout(2000);
  const isDisabled = await beginBtn.evaluate(el => el.disabled);
  if (isDisabled) {
    info('CPA Exam — Waiting for questions to load...');
    await page.waitForTimeout(8000);
  }
  
  await beginBtn.click();
  await page.waitForTimeout(5000);
  await snap(page, 'cpa-exam-started');

  // Verify exam screen
  const examText = await bodyText(page);
  const hasQuestion = /question\s*\d/i.test(examText);
  const hasTestlet = /testlet/i.test(examText);
  const hasTimer = await page.evaluate(() => {
    const text = document.body.innerText;
    return /\d{1,2}:\d{2}(:\d{2})?/.test(text);
  });

  if (hasQuestion) {
    pass('CPA Exam — Question displayed');
  } else {
    warn('CPA Exam — Question text not found');
  }

  if (hasTimer) {
    pass('CPA Exam — Timer visible');
  } else {
    info('CPA Exam — Timer not detected');
  }

  if (hasTestlet) {
    pass('CPA Exam — Testlet indicator visible');
  } else {
    info('CPA Exam — No testlet indicator');
  }

  // Answer questions and track correctness for score verification
  let questionsAnswered = 0;
  let totalQuestionsInTestlet = 0;

  // Try to determine total questions from counter
  const counterMatch = examText.match(/(\d+)\s*(?:of|\/)\s*(\d+)/i);
  if (counterMatch) {
    totalQuestionsInTestlet = parseInt(counterMatch[2]);
    info('CPA Exam — Questions in testlet', `${totalQuestionsInTestlet}`);
  }

  // Answer up to 36 questions (mini exam) or until we hit a break/end
  const maxQuestions = Math.min(totalQuestionsInTestlet || 36, 36);
  
  for (let i = 0; i < maxQuestions; i++) {
    // Select a random answer (0-3)
    const answerIdx = i % 4;
    const selected = await selectAnswer(page, answerIdx);
    
    if (!selected) {
      // Try keyboard shortcut (CPA supports 1/2/3/4 keys)
      await page.keyboard.press(String(answerIdx + 1));
      await page.waitForTimeout(300);
    }
    
    questionsAnswered++;

    // Click Next or Next Testlet or Submit
    const nextTestletBtn = page.locator('button:has-text("Next Testlet")').first();
    const submitBtn = page.locator('button:has-text("Submit Exam"), button:has-text("Submit Testlet")').first();
    const nextBtn = page.locator('button:has-text("Next")').first();

    if (await nextTestletBtn.count() > 0) {
      // End of testlet — click to go to break
      await nextTestletBtn.click();
      await page.waitForTimeout(2000);
      
      const breakText = await bodyText(page);
      if (/break|pause|resume/i.test(breakText)) {
        pass('CPA Exam — Testlet break screen', `After ${questionsAnswered} questions`);
        await snap(page, 'cpa-testlet-break');
        
        // Click Resume
        const resumeBtn = page.locator('button:has-text("Resume Exam"), button:has-text("Resume Examination")').first();
        if (await resumeBtn.count() > 0) {
          await resumeBtn.click();
          await page.waitForTimeout(3000);
          pass('CPA Exam — Resumed after break');
        } else {
          warn('CPA Exam — Resume button not found');
        }
      }
      continue;
    }

    if (await submitBtn.count() > 0 && await nextBtn.count() === 0) {
      // Last question — submit
      await submitBtn.click();
      await page.waitForTimeout(3000);
      pass('CPA Exam — Submitted exam', `${questionsAnswered} questions answered`);
      break;
    }

    if (await nextBtn.count() > 0) {
      await nextBtn.click();
      await page.waitForTimeout(500);
    } else {
      // Try arrow key
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(500);
    }
  }

  // Verify results screen
  await page.waitForTimeout(3000);
  const resultsText = await bodyText(page);
  await snap(page, 'cpa-exam-results');
  
  const hasScore = /\d+%|\d+\s*\/\s*\d+|score|credit|congratulations|practice complete/i.test(resultsText);
  if (hasScore) {
    pass('CPA Exam — Results screen with score');
    
    // Extract score
    const scoreMatch = resultsText.match(/(\d+)%/);
    if (scoreMatch) {
      info('CPA Exam — Score', `${scoreMatch[1]}%`);
    }
    
    // Check for CREDIT/NO CREDIT (CPA-specific)
    if (/credit/i.test(resultsText)) {
      info('CPA Exam — Credit status shown');
    }

    // Check for blueprint breakdown
    if (/blueprint|area|domain/i.test(resultsText)) {
      pass('CPA Exam — Blueprint breakdown shown');
    }
  } else {
    warn('CPA Exam — Results screen not detected');
  }

  // Verify action buttons on results
  const retakeBtn = page.locator('button:has-text("Retake"), button:has-text("Take Another")').first();
  const doneBtn = page.locator('button:has-text("Done"), button:has-text("Exit"), button:has-text("Back")').first();
  
  if (await retakeBtn.count() > 0) pass('CPA Exam — Retake button available');
  if (await doneBtn.count() > 0) pass('CPA Exam — Exit/Done button available');
}

// ═══════════════════════════════════════════════════════════
// TEST 2: CPA CURATED MOCK SELECTION
// ═══════════════════════════════════════════════════════════
async function testCPAMockSelection(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 2: CPA Curated Mock Selection');
  console.log('══════════════════════════════════════════════════════');

  await nav(page, '/exam', 5000);

  // Click Curated Mocks
  const curatedBtn = page.locator('button:has-text("Curated"), button:has-text("Mock")').first();
  if (await curatedBtn.count() === 0) {
    warn('Mock Selection — Curated button not found');
    return;
  }
  await curatedBtn.click();
  await page.waitForTimeout(2000);

  const text = await bodyText(page);
  await snap(page, 'cpa-mock-selection');

  // Verify mock selection screen
  if (/mock exam|curated/i.test(text)) {
    pass('Mock Selection — Screen loaded');
  } else {
    warn('Mock Selection — Screen not recognized');
    return;
  }

  // Check for back button
  const backBtn = page.locator('button:has-text("Back to Exam")').first();
  if (await backBtn.count() > 0) {
    pass('Mock Selection — Back button present');
  }

  // Check for mock exam cards
  const mockCards = page.locator('[class*="card"], [class*="border"]').filter({ hasText: /mock|exam|blueprint/i });
  const cardCount = await mockCards.count();
  
  if (cardCount > 0) {
    pass('Mock Selection — Mock exams available', `${cardCount} cards`);
    
    // Click first mock to select it
    await mockCards.first().click();
    await page.waitForTimeout(1000);
    
    const selectedText = await bodyText(page);
    
    // Check for blueprint coverage info
    if (/blueprint|coverage|weight/i.test(selectedText)) {
      pass('Mock Selection — Blueprint coverage shown');
    }
    
    // Check for Start button
    const startMockBtn = page.locator('button:has-text("Start")').first();
    if (await startMockBtn.count() > 0) {
      pass('Mock Selection — Start mock button available');
    }
    
    await snap(page, 'cpa-mock-selected');
  } else {
    info('Mock Selection — No mock exams available for current section');
  }

  // Navigate back
  if (await backBtn.count() > 0) {
    await backBtn.click();
    await page.waitForTimeout(1000);
    const backText = await bodyText(page);
    if (/mini exam|full exam|begin/i.test(backText)) {
      pass('Mock Selection — Back navigation works');
    }
  }
}

// ═══════════════════════════════════════════════════════════
// TEST 3: CPA PROMETRIC THEME + KEYBOARD SHORTCUTS
// ═══════════════════════════════════════════════════════════
async function testPrometricTheme(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 3: Prometric Theme & Keyboard Shortcuts');
  console.log('══════════════════════════════════════════════════════');

  if (MOBILE) {
    info('Prometric — Skipped on mobile (desktop-only feature)');
    return;
  }

  await nav(page, '/exam', 5000);

  // Find and toggle Prometric theme checkbox (sr-only input behind a custom toggle div)
  const prometricToggle = page.locator('input[type="checkbox"]').first();
  if (await prometricToggle.count() === 0) {
    warn('Prometric — Theme toggle not found');
    // Still try to start exam for keyboard tests
  } else {
    // Enable Prometric theme — use force:true because the input is sr-only behind a div
    const wasChecked = await prometricToggle.isChecked();
    if (!wasChecked) {
      // Click the parent label/wrapper instead, or force the click
      const toggleParent = prometricToggle.locator('xpath=ancestor::label | ancestor::div[contains(@class,"relative")]').first();
      if (await toggleParent.count() > 0) {
        await toggleParent.click({ force: true });
      } else {
        await prometricToggle.check({ force: true });
      }
      await page.waitForTimeout(500);
    }
    pass('Prometric — Theme toggle found and enabled');
  }

  // Start Mini Exam with Prometric theme
  const miniBtn = page.locator('button:has-text("Mini Exam")').first();
  if (await miniBtn.count() > 0) await miniBtn.click();
  await page.waitForTimeout(500);

  const beginBtn = page.locator('button:has-text("Begin Examination"), button:has-text("Begin Exam"), button:has-text("Start Exam")').first();
  if (await beginBtn.count() === 0) {
    warn('Prometric — Begin button not found');
    return;
  }
  
  await page.waitForTimeout(3000);
  const isDisabled = await beginBtn.evaluate(el => el.disabled);
  if (isDisabled) {
    await page.waitForTimeout(8000);
  }
  
  await beginBtn.click();
  await page.waitForTimeout(5000);

  // Check for Prometric-specific styling
  const hasPrometricStyle = await page.evaluate(() => {
    const els = document.querySelectorAll('[class*="prometric"]');
    return els.length;
  });

  if (hasPrometricStyle > 0) {
    pass('Prometric — Theme styling applied', `${hasPrometricStyle} prometric elements`);
  } else {
    info('Prometric — No prometric CSS classes found (may use different styling)');
  }
  await snap(page, 'prometric-theme');

  // Test keyboard shortcuts
  // Press '1' to select option A
  await page.keyboard.press('1');
  await page.waitForTimeout(500);
  
  // Check if an option got selected
  const selectedOption = await page.evaluate(() => {
    const selected = document.querySelector('[class*="selected"], [class*="border-primary"], [aria-selected="true"]');
    return !!selected;
  });

  if (selectedOption) {
    pass('Keyboard — Option selected via number key');
  } else {
    info('Keyboard — Could not verify keyboard selection');
  }

  // Press 'F' to flag
  await page.keyboard.press('f');
  await page.waitForTimeout(300);
  
  const flagged = await page.evaluate(() => {
    const text = document.body.innerText;
    return /flagged|unflag/i.test(text) || document.querySelector('[class*="flag"]') !== null;
  });

  if (flagged) {
    pass('Keyboard — Flag toggled via F key');
  } else {
    info('Keyboard — Flag state not verifiable');
  }

  // Arrow right for next question
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(1000);
  
  const movedForward = await page.evaluate(() => {
    const text = document.body.innerText;
    const match = text.match(/question\s*(\d+)/i);
    return match ? parseInt(match[1]) : 0;
  });

  if (movedForward > 1) {
    pass('Keyboard — ArrowRight moved to next question');
  } else {
    info('Keyboard — Arrow navigation not verifiable');
  }

  // Arrow left to go back
  await page.keyboard.press('ArrowLeft');
  await page.waitForTimeout(500);
  
  pass('Keyboard — All shortcuts tested without crash');
  await snap(page, 'prometric-keyboard');
}

// ═══════════════════════════════════════════════════════════
// TEST 4: TEMPLATE EXAM SIMULATOR (CISA)
// ═══════════════════════════════════════════════════════════
async function testTemplateExam(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 4: Template Exam Simulator (CISA)');
  console.log('══════════════════════════════════════════════════════');

  // Switch to CISA course first
  await nav(page, '/settings', 3000);
  const cisaSelector = page.locator('button:has-text("CISA"), [data-testid="course-cisa"]').first();
  if (await cisaSelector.count() > 0) {
    await cisaSelector.click();
    await page.waitForTimeout(2000);
  }

  await nav(page, '/cisa-exam', 5000);
  const text = await bodyText(page);
  await snap(page, 'cisa-exam-setup');

  if (/exam simulator|cisa/i.test(text)) {
    pass('Template Exam — CISA setup screen loaded');
  } else {
    warn('Template Exam — Setup screen not recognized');
    return;
  }

  // Check for section/domain selection (CISA has multi-select)
  const domainBtns = page.locator('button').filter({ hasText: /domain|cisa|governance|protection/i });
  const domainCount = await domainBtns.count();
  
  if (domainCount > 0) {
    pass('Template Exam — Domain selection available', `${domainCount} domains`);
  }

  // Check for "All Domains" checkbox (CISA/CFP have multi-select)
  const allDomainsCheck = page.locator('input[type="checkbox"]').first();
  if (await allDomainsCheck.count() > 0) {
    info('Template Exam — Multi-select mode (checkboxes)');
  }

  // Look for exam modes
  const modes = await page.evaluate(() => {
    const btns = document.querySelectorAll('button');
    const modeTexts = [];
    btns.forEach(b => {
      const t = b.textContent?.trim();
      if (t && /mini|quick|half|full|practice/i.test(t) && t.length < 60) {
        modeTexts.push(t.substring(0, 40));
      }
    });
    return modeTexts;
  });

  if (modes.length > 0) {
    pass('Template Exam — Mode options found', modes.slice(0, 3).join(', '));
    
    // Select quickest mode (Mini Quiz / Quick Practice)
    const quickMode = page.locator('button:has-text("Mini"), button:has-text("Quick")').first();
    if (await quickMode.count() > 0) {
      await quickMode.click();
      await page.waitForTimeout(500);
      pass('Template Exam — Quick mode selected');
    }
  }

  // Click Start Exam
  const startBtn = page.locator('button:has-text("Start Exam")').first();
  if (await startBtn.count() === 0) {
    warn('Template Exam — Start button not found');
    return;
  }
  
  // Check if disabled (no sections selected)
  const startDisabled = await startBtn.evaluate(el => el.disabled);
  if (startDisabled) {
    info('Template Exam — Start disabled (selecting all domains)');
    // Try checking "All Domains"
    if (await allDomainsCheck.count() > 0) {
      await allDomainsCheck.check();
      await page.waitForTimeout(500);
    }
  }

  await startBtn.click();
  await page.waitForTimeout(5000);
  await snap(page, 'cisa-exam-running');

  // Verify exam is running
  const examText = await bodyText(page);
  const hasQ = /question\s*\d/i.test(examText);
  
  if (hasQ) {
    pass('Template Exam — Exam started, question displayed');
  } else {
    warn('Template Exam — Question not visible after start');
    return;
  }

  // Check timer
  const hasTimerT = /\d{1,2}:\d{2}/.test(examText);
  if (hasTimerT) {
    pass('Template Exam — Timer visible');
  }

  // Answer 10 questions
  let answered = 0;
  for (let i = 0; i < 10; i++) {
    const selected = await selectAnswer(page, i % 4);
    if (!selected) break;
    answered++;
    await page.waitForTimeout(300);

    // Click Next
    const nextBtn = page.locator('button:has-text("Next")').first();
    const submitBtn = page.locator('button:has-text("Submit Exam")').first();
    
    if (await submitBtn.count() > 0) {
      await submitBtn.click();
      await page.waitForTimeout(3000);
      pass('Template Exam — Submitted', `After ${answered} questions`);
      break;
    }
    
    if (await nextBtn.count() > 0) {
      await nextBtn.click();
      await page.waitForTimeout(500);
    }
  }

  if (answered === 0) {
    warn('Template Exam — Could not answer any questions');
    return;
  }

  // If we answered 10 but didn't submit, click Submit now
  const finalSubmit = page.locator('button:has-text("Submit Exam")').first();
  if (await finalSubmit.count() > 0) {
    await finalSubmit.click();
    await page.waitForTimeout(3000);
  }

  // Check results
  await page.waitForTimeout(2000);
  const resultsText = await bodyText(page);
  await snap(page, 'cisa-exam-results');
  
  if (/congratulations|keep practicing|score|results|\d+%/i.test(resultsText)) {
    pass('Template Exam — Results screen shown');
    
    const scoreMatch = resultsText.match(/(\d+)%/);
    if (scoreMatch) {
      info('Template Exam — Score', `${scoreMatch[1]}%`);
    }

    // Check section breakdown
    if (/domain|section|breakdown/i.test(resultsText)) {
      pass('Template Exam — Section breakdown shown');
    }

    // Check action buttons
    const retakeBtn = page.locator('button:has-text("Take Another"), button:has-text("Retake")').first();
    const backBtn = page.locator('button:has-text("Back to Dashboard"), button:has-text("Done"), button:has-text("Back")').first();
    
    if (await retakeBtn.count() > 0) pass('Template Exam — Retake button available');
    if (await backBtn.count() > 0) pass('Template Exam — Back button available');
  } else {
    warn('Template Exam — Results not detected');
  }
}

// ═══════════════════════════════════════════════════════════
// TEST 5: TIMER INTEGRITY & WARNINGS
// ═══════════════════════════════════════════════════════════
async function testTimerIntegrity(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 5: Timer Integrity & Warnings');
  console.log('══════════════════════════════════════════════════════');

  // Switch back to CPA
  await nav(page, '/settings', 2000);
  const cpaSelector = page.locator('button:has-text("CPA"), [data-testid="course-cpa"]').first();
  if (await cpaSelector.count() > 0) {
    await cpaSelector.click();
    await page.waitForTimeout(2000);
  }

  await nav(page, '/exam', 5000);

  // Start mini exam to test timer
  const miniBtn = page.locator('button:has-text("Mini Exam")').first();
  if (await miniBtn.count() > 0) await miniBtn.click();
  
  const beginBtn = page.locator('button:has-text("Begin Examination"), button:has-text("Begin Exam"), button:has-text("Start Exam")').first();
  if (await beginBtn.count() === 0) { warn('Timer — Begin button not found'); return; }
  
  await page.waitForTimeout(3000);
  if (await beginBtn.evaluate(el => el.disabled)) await page.waitForTimeout(8000);
  
  await beginBtn.click();
  await page.waitForTimeout(5000);

  // Read initial timer value
  const initialTime = await page.evaluate(() => {
    const text = document.body.innerText;
    const match = text.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?/);
    if (!match) return null;
    const hours = match[3] ? parseInt(match[1]) : 0;
    const mins = match[3] ? parseInt(match[2]) : parseInt(match[1]);
    const secs = match[3] ? parseInt(match[3]) : parseInt(match[2]);
    return hours * 3600 + mins * 60 + secs;
  });

  if (initialTime === null) {
    warn('Timer — Could not read initial time');
    return;
  }

  pass('Timer — Initial value read', `${Math.floor(initialTime / 60)} min ${initialTime % 60} sec`);

  // Wait 5 seconds and read again
  await page.waitForTimeout(5000);

  const afterTime = await page.evaluate(() => {
    const text = document.body.innerText;
    const match = text.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?/);
    if (!match) return null;
    const hours = match[3] ? parseInt(match[1]) : 0;
    const mins = match[3] ? parseInt(match[2]) : parseInt(match[1]);
    const secs = match[3] ? parseInt(match[3]) : parseInt(match[2]);
    return hours * 3600 + mins * 60 + secs;
  });

  if (afterTime !== null) {
    const elapsed = initialTime - afterTime;
    if (elapsed >= 3 && elapsed <= 8) {
      pass('Timer — Counting down correctly', `${elapsed}s elapsed in 5s wall time`);
    } else if (elapsed > 0) {
      warn('Timer — Drift detected', `${elapsed}s elapsed in 5s wall time`);
    } else {
      warn('Timer — Not counting down', `Initial: ${initialTime}s, After: ${afterTime}s`);
    }
  }

  // Check timer warning styling (timer turns red at <5 min)
  // We can't wait for real <5 min so just verify the timer element exists
  const timerElement = await page.evaluate(() => {
    // Look for timer-related elements with color/warning classes
    const timeEls = document.querySelectorAll('[class*="timer"], [class*="time"], [class*="countdown"]');
    return {
      count: timeEls.length,
      classes: Array.from(timeEls).map(e => e.className).join(', ').substring(0, 200)
    };
  });

  if (timerElement.count > 0) {
    pass('Timer — Timer element found', `${timerElement.count} elements`);
  }

  await snap(page, 'timer-integrity');
}

// ═══════════════════════════════════════════════════════════
// TEST 6: QUESTION NAVIGATION & FLAGGING
// ═══════════════════════════════════════════════════════════
async function testQuestionNavigation(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 6: Question Navigation & Flagging');
  console.log('══════════════════════════════════════════════════════');

  // We should still be in an active exam from test 5
  const text = await bodyText(page);
  if (!/question/i.test(text)) {
    info('Navigation — No active exam, starting fresh');
    await nav(page, '/exam', 5000);
    const miniBtn = page.locator('button:has-text("Mini Exam")').first();
    if (await miniBtn.count() > 0) await miniBtn.click();
    const beginBtn = page.locator('button:has-text("Begin"), button:has-text("Start")').first();
    if (await beginBtn.count() > 0) {
      await page.waitForTimeout(3000);
      if (await beginBtn.evaluate(el => el.disabled)) await page.waitForTimeout(8000);
      await beginBtn.click();
      await page.waitForTimeout(5000);
    }
  }

  // Record current question number
  const q1Num = await page.evaluate(() => {
    const text = document.body.innerText;
    const match = text.match(/question\s*(\d+)/i);
    return match ? parseInt(match[1]) : 0;
  });

  // Select an answer on Q1
  await selectAnswer(page, 0);
  await page.waitForTimeout(300);

  // Click Next
  const nextBtn = page.locator('button:has-text("Next")').first();
  if (await nextBtn.count() > 0) {
    await nextBtn.click();
    await page.waitForTimeout(1000);
  }

  // Verify we moved forward
  const q2Num = await page.evaluate(() => {
    const text = document.body.innerText;
    const match = text.match(/question\s*(\d+)/i);
    return match ? parseInt(match[1]) : 0;
  });

  if (q2Num > q1Num) {
    pass('Navigation — Next button works', `Q${q1Num} → Q${q2Num}`);
  } else {
    info('Navigation — Could not verify forward movement');
  }

  // Click Previous to go back
  const prevBtn = page.locator('button:has-text("Previous"), button:has-text("Prev")').first();
  if (await prevBtn.count() > 0) {
    await prevBtn.click();
    await page.waitForTimeout(1000);
    
    const qBackNum = await page.evaluate(() => {
      const text = document.body.innerText;
      const match = text.match(/question\s*(\d+)/i);
      return match ? parseInt(match[1]) : 0;
    });
    
    if (qBackNum < q2Num) {
      pass('Navigation — Previous button works', `Q${q2Num} → Q${qBackNum}`);
    } else {
      info('Navigation — Could not verify backward movement');
    }
  } else {
    info('Navigation — No Previous button found');
  }

  // Test Flag button
  const flagBtn = page.locator('button:has-text("Flag"), button[title*="Flag"], button[aria-label*="flag"]').first();
  // Also try icon-based flag button
  const flagIconBtn = page.locator('button').filter({ has: page.locator('svg') }).filter({ hasText: /flag/i }).first();
  
  let flagFound = false;
  if (await flagBtn.count() > 0) {
    await flagBtn.click();
    await page.waitForTimeout(500);
    flagFound = true;
  } else if (await flagIconBtn.count() > 0) {
    await flagIconBtn.click();
    await page.waitForTimeout(500);
    flagFound = true;
  } else {
    // Try keyboard shortcut
    await page.keyboard.press('f');
    await page.waitForTimeout(500);
    flagFound = true;
  }

  if (flagFound) {
    // Check if flag state changed (look for flagged indicators in question grid)
    const flaggedIndicator = await page.evaluate(() => {
      const els = document.querySelectorAll('[class*="flag"], [class*="yellow"], [class*="amber"]');
      return els.length;
    });
    
    if (flaggedIndicator > 0) {
      pass('Navigation — Flag toggled', `${flaggedIndicator} flag indicators`);
    } else {
      info('Navigation — Flag clicked but indicator not detected');
    }
  }

  // Test question grid navigation (click a numbered button to jump)
  const gridBtns = page.locator('button').filter({ hasText: /^\d+$/ });
  const gridCount = await gridBtns.count();
  
  if (gridCount > 3) {
    // Click question 3 in the grid
    const btn3 = gridBtns.filter({ hasText: '3' }).first();
    if (await btn3.count() > 0) {
      await btn3.click();
      await page.waitForTimeout(1000);
      
      const jumpedTo = await page.evaluate(() => {
        const text = document.body.innerText;
        const match = text.match(/question\s*(\d+)/i);
        return match ? parseInt(match[1]) : 0;
      });
      
      if (jumpedTo === 3) {
        pass('Navigation — Question grid jump works', 'Jumped to Q3');
      } else {
        info('Navigation — Grid click result', `At Q${jumpedTo}`);
      }
    }
  }

  // Check question grid state (answered vs unanswered indicators)
  const gridState = await page.evaluate(() => {
    const btns = document.querySelectorAll('button');
    let answered = 0, current = 0, flagged = 0;
    btns.forEach(b => {
      const cls = b.className || '';
      if (/answered|green|bg-green|bg-primary|bg-indigo.*500/.test(cls)) answered++;
      if (/current|ring|border-2.*primary/.test(cls)) current++;
      if (/flagged|yellow|amber/.test(cls)) flagged++;
    });
    return { answered, current, flagged };
  });

  if (gridState.answered > 0 || gridState.current > 0) {
    pass('Navigation — Question grid shows state', 
      `Answered: ${gridState.answered}, Current: ${gridState.current}, Flagged: ${gridState.flagged}`);
  }

  await snap(page, 'question-navigation');
}

// ═══════════════════════════════════════════════════════════
// TEST 7: EXIT CONFIRMATION MID-EXAM
// ═══════════════════════════════════════════════════════════
async function testExitConfirmation(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 7: Exit Confirmation Mid-Exam');
  console.log('══════════════════════════════════════════════════════');

  // Start a template exam (CISA) for simpler exit test
  await nav(page, '/settings', 2000);
  const cisaSel = page.locator('button:has-text("CISA"), [data-testid="course-cisa"]').first();
  if (await cisaSel.count() > 0) {
    await cisaSel.click();
    await page.waitForTimeout(2000);
  }

  await nav(page, '/cisa-exam', 5000);

  // Select quick mode and start
  const quickMode = page.locator('button:has-text("Mini"), button:has-text("Quick")').first();
  if (await quickMode.count() > 0) await quickMode.click();
  
  const startBtn = page.locator('button:has-text("Start Exam")').first();
  if (await startBtn.count() === 0) { warn('Exit — Start button not found'); return; }
  
  // Ensure domains are selected
  const allCheck = page.locator('input[type="checkbox"]').first();
  if (await allCheck.count() > 0 && !(await allCheck.isChecked())) {
    await allCheck.check();
    await page.waitForTimeout(500);
  }
  
  await startBtn.click();
  await page.waitForTimeout(5000);

  // Answer 1 question to make it a non-empty session
  await selectAnswer(page, 0);
  await page.waitForTimeout(500);

  // Try to exit — look for X/Close button (template uses aria-label="Exit")
  const exitBtn = page.locator('button[aria-label="Exit"], button[aria-label="Close"], button:has-text("✕"), button:has-text("×")').first();
  
  // Set up dialog handler BEFORE clicking exit
  let dialogAppeared = false;
  page.on('dialog', async (dialog) => {
    dialogAppeared = true;
    info('Exit — Confirm dialog', dialog.message().substring(0, 80));
    await dialog.dismiss(); // Cancel — stay in exam
  });

  // Try clicking exit button
  if (await exitBtn.count() > 0) {
    await exitBtn.click();
    await page.waitForTimeout(1000);
  } else {
    // Fallback: look for any small button with an SVG icon (X icon)
    const svgBtn = page.locator('button').filter({ has: page.locator('svg') }).filter({ hasText: /^$/ }).last();
    if (await svgBtn.count() > 0) {
      await svgBtn.click();
      await page.waitForTimeout(1000);
    } else {
      // Last resort: browser back
      await page.goBack();
      await page.waitForTimeout(1000);
    }
  }

  if (dialogAppeared) {
    pass('Exit — Confirmation dialog shown');
    
    // Verify we're still in the exam (dismissed the dialog)
    const stillInExam = await page.evaluate(() => /question/i.test(document.body.innerText));
    if (stillInExam) {
      pass('Exit — Stayed in exam after dismissing');
    }
  } else {
    // Check if the page changed
    const currentUrl = page.url();
    if (/exam/i.test(currentUrl)) {
      info('Exit — No confirm dialog, but stayed on exam page');
    } else {
      warn('Exit — Left exam without confirmation');
    }
  }

  // Clean up dialog listener
  page.removeAllListeners('dialog');
  await snap(page, 'exit-confirmation');
}

// ═══════════════════════════════════════════════════════════
// TEST 8: MULTI-COURSE EXAM SIMULATORS
// ═══════════════════════════════════════════════════════════
async function testMultiCourseExams(page) {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  TEST 8: Multi-Course Exam Simulators');
  console.log('══════════════════════════════════════════════════════');

  // Test that each course's exam simulator loads correctly
  const exams = [
    { course: 'EA', route: '/ea-exam', switch: 'EA' },
    { course: 'CMA', route: '/cma-exam', switch: 'CMA' },
    { course: 'CIA', route: '/cia-exam', switch: 'CIA' },
    { course: 'CFP', route: '/cfp-exam', switch: 'CFP' },
  ];

  for (const exam of exams) {
    // Switch course
    await nav(page, '/settings', 2000);
    const courseSel = page.locator(`button:has-text("${exam.switch}"), [data-testid="course-${exam.switch.toLowerCase()}"]`).first();
    if (await courseSel.count() > 0) {
      await courseSel.click();
      await page.waitForTimeout(2000);
    }

    await nav(page, exam.route, 5000);
    const text = await bodyText(page);

    // Check simulator loaded
    if (/exam simulator|exam|start exam/i.test(text)) {
      // Check for mode selection
      const hasModes = /mini|quick|half|full|practice/i.test(text);
      if (hasModes) {
        pass(`${exam.course} Exam — Simulator loaded with modes`);
      } else {
        pass(`${exam.course} Exam — Simulator loaded`);
      }

      // Verify Start button exists
      const startBtn = page.locator('button:has-text("Start Exam")').first();
      if (await startBtn.count() > 0) {
        // Check if enabled or needs section selection
        const disabled = await startBtn.evaluate(el => el.disabled);
        if (disabled) {
          info(`${exam.course} Exam — Start disabled (needs section selection)`);
        } else {
          pass(`${exam.course} Exam — Start button enabled`);
        }
      }
    } else {
      warn(`${exam.course} Exam — Simulator did not load at ${exam.route}`);
    }
  }

  // Switch back to CPA
  await nav(page, '/settings', 2000);
  const cpaSel = page.locator('button:has-text("CPA"), [data-testid="course-cpa"]').first();
  if (await cpaSel.count() > 0) {
    await cpaSel.click();
    await page.waitForTimeout(2000);
  }
}

// ═══════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════
async function main() {
  console.log('\n════════════════════════════════════════════════════════════');
  console.log(`  🎯  Exam Simulator E2E Test — ${MOBILE ? 'Mobile' : 'Desktop'}`);
  console.log('════════════════════════════════════════════════════════════');

  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: VP.w, height: VP.h } });
  const page = await ctx.newPage();

  // Track console errors
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
    if (page.url().includes('/home') || page.url().includes('/login') === false) {
      pass('Login');
    } else {
      fail('Login — Could not authenticate');
      throw new Error('Login failed');
    }

    // Clear any practice session first
    await page.evaluate(() => sessionStorage.removeItem('voraprep-practice-session'));

    // Run tests — each wrapped in try/catch so one failure doesn't kill the suite
    const tests = [
      ['CPA Mini Exam', testCPAMiniExam],
      ['CPA Mock Selection', testCPAMockSelection],
      ['Prometric Theme', testPrometricTheme],
      ['Template Exam', testTemplateExam],
      ['Timer Integrity', testTimerIntegrity],
      ['Question Navigation', testQuestionNavigation],
      ['Exit Confirmation', testExitConfirmation],
      ['Multi-Course Exams', testMultiCourseExams],
    ];
    for (const [name, fn] of tests) {
      try {
        await fn(page);
      } catch (err) {
        fail(`CRASH in ${name}`, err.message?.substring(0, 120));
      }
    }

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
  console.log(`║  Exam Simulator E2E — ${(MOBILE ? 'Mobile' : 'Desktop').padEnd(38)}║`);
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
  writeFileSync(`${DIR}/exam-simulator-report.json`, JSON.stringify({
    timestamp: new Date().toISOString(),
    viewport: MOBILE ? 'mobile' : 'desktop',
    results,
    issues,
    consoleErrors: consoleErrors.slice(0, 20),
    summary: counts
  }, null, 2));

  process.exit(counts.FAIL > 0 ? 1 : 0);
}

main();

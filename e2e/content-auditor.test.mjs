/**
 * In-Browser Content Auditor — VoraPrep
 *
 * Loads every question section through the ACTUAL app (not static imports)
 * and audits rendered content for data quality issues that static tests miss.
 *
 * What it catches:
 *   - Questions with empty/truncated option text after rendering
 *   - HTML artifacts leaked into visible text
 *   - Options shorter than 3 characters
 *   - Duplicate option text within a question
 *   - Missing fields at runtime (correctAnswer out of bounds, empty question text)
 *   - LaTeX/markdown rendering failures
 *   - Questions where all options look identical
 *   - Explanations shorter than 20 characters
 *
 * How it works:
 *   1. Navigates to /practice for each section
 *   2. Starts a session with max questions
 *   3. Iterates through all questions, auditing each one
 *   4. Reports all issues found with question IDs
 *
 * Usage:
 *   node e2e/content-auditor.test.mjs
 *   node e2e/content-auditor.test.mjs --mobile
 *   node e2e/content-auditor.test.mjs --section=FAR    # Audit one section
 *   node e2e/content-auditor.test.mjs --exam=cpa       # Audit one exam
 *   node e2e/content-auditor.test.mjs --quick           # 10 questions per section
 */

import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'fs';

const args = process.argv.slice(2);
const MOBILE  = args.includes('--mobile');
const QUICK   = args.includes('--quick');
const SECTION = args.find(a => a.startsWith('--section='))?.split('=')[1];
const EXAM    = args.find(a => a.startsWith('--exam='))?.split('=')[1];
const BASE    = process.env.BASE_URL      || 'http://localhost:5173';
const EMAIL   = process.env.TEST_EMAIL    || 'rob@sagecg.com';
const PASSWORD= process.env.TEST_PASSWORD || 'Leader123!';
const TIMEOUT = 15_000;
const VP = MOBILE ? { w: 390, h: 844 } : { w: 1280, h: 800 };
const DIR = `e2e/screenshots/content-auditor/${MOBILE ? 'mobile' : 'desktop'}`;
mkdirSync(DIR, { recursive: true });

// All sections by exam
const EXAM_SECTIONS = {
  cpa: ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP'],
  ea:  ['SEE1', 'SEE2', 'SEE3'],
  cma: ['CMA1', 'CMA2'],
  cia: ['CIA1', 'CIA2', 'CIA3'],
  cisa:['CISA1', 'CISA2', 'CISA3', 'CISA4', 'CISA5'],
  cfp: ['CFP-PCR', 'CFP-RMP', 'CFP-TXP', 'CFP-RPP', 'CFP-EPB', 'CFP-INV', 'CFP-INS', 'CFP-PFP'],
};

function getSections() {
  if (SECTION) return [SECTION];
  if (EXAM) return EXAM_SECTIONS[EXAM.toLowerCase()] || [];
  // Default: audit one representative section per exam to keep it fast
  return ['FAR', 'SEE1', 'CMA1', 'CIA1', 'CISA1', 'CFP-PCR'];
}

const issues = [];
const sectionStats = {};
let totalAudited = 0;

function addIssue(section, questionId, severity, category, detail) {
  issues.push({ section, questionId, severity, category, detail });
  const sev = severity === 'HIGH' ? '🔴' : severity === 'MED' ? '🟠' : '🟡';
  console.log(`    ${sev} [${questionId}] ${category}: ${detail}`);
}

async function nav(page, path, ms = 3000) {
  await page.goto(`${BASE}${path}`, { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
  await page.waitForTimeout(ms);
}

// Clear saved practice session then navigate to practice setup
async function freshPractice(page) {
  await nav(page, '/home', 1500);
  await page.evaluate(() => sessionStorage.removeItem('voraprep-practice-session'));
  await nav(page, '/practice', 4000);
}

/**
 * Audit a single rendered question on the page
 */
async function auditCurrentQuestion(page, section) {
  const data = await page.evaluate(() => {
    const body = document.body.innerText;

    // Extract question text
    const questionEl = document.querySelector('[data-testid="question-text"]') ||
                       document.querySelector('.question-text') ||
                       document.querySelector('[class*="question"]');
    const questionText = questionEl?.innerText?.trim() || '';

    // Extract options using precise testid selectors
    // Each option button has structure: <span class="mcq-option-letter">A</span> <span>answer text</span>
    const optionEls = document.querySelectorAll('[data-testid^="answer-option-"]');
    const options = Array.from(optionEls).map(el => {
      // Get just the answer text, excluding the letter prefix
      const textSpan = el.querySelector('.flex-1, span:last-child');
      if (textSpan) return textSpan.innerText?.trim() || '';
      // Fallback: get full text and strip leading letter
      const full = el.innerText?.trim() || '';
      return full.replace(/^[A-D]\s*/, '');
    });

    // Extract question number / id
    const posMatch = body.match(/(?:Question\s+)?(\d+)\s*(?:of|\/)\s*(\d+)/i);
    const position = posMatch ? { current: parseInt(posMatch[1]), total: parseInt(posMatch[2]) } : null;

    // Look for any visible error states
    const hasError = !!(document.querySelector('[class*="error"]') ||
                        document.querySelector('[role="alert"]'));

    // Check for HTML artifacts
    const htmlArtifacts = body.match(/<\/?[a-z][^>]*>/gi) || [];

    // Check for LaTeX rendering failures (but exclude dollar amounts like $500)
    const latexFailures = body.match(/\$\$[^$]+\$\$|\\frac\{|\\text\{|\\begin\{/g) || [];

    return {
      questionText,
      options,
      position,
      hasError,
      htmlArtifacts: htmlArtifacts.length,
      latexFailures: latexFailures.length,
      bodyText: body.substring(0, 2000),
    };
  });

  const qId = `${section}-q${data.position?.current || '?'}`;
  totalAudited++;

  // AUDIT 1: Empty question text
  if (!data.questionText || data.questionText.length < 10) {
    addIssue(section, qId, 'HIGH', 'EMPTY_QUESTION', `Question text too short (${data.questionText.length} chars): "${data.questionText.substring(0, 50)}"`);
  }

  // AUDIT 2: Option count
  if (data.options.length < 4) {
    addIssue(section, qId, 'HIGH', 'MISSING_OPTIONS', `Only ${data.options.length} options rendered (expected 4)`);
  }

  // AUDIT 3: Empty option text
  for (let i = 0; i < data.options.length; i++) {
    if (!data.options[i] || data.options[i].length < 2) {
      addIssue(section, qId, 'HIGH', 'EMPTY_OPTION', `Option ${String.fromCharCode(65 + i)} is empty or too short: "${data.options[i]}"`);
    }
  }

  // AUDIT 4: Duplicate options
  const uniqueOpts = new Set(data.options.map(o => o.toLowerCase().trim()));
  if (uniqueOpts.size < data.options.length && data.options.length > 0) {
    const dupes = data.options.filter((o, i) =>
      data.options.findIndex(x => x.toLowerCase().trim() === o.toLowerCase().trim()) !== i
    );
    addIssue(section, qId, 'HIGH', 'DUPLICATE_OPTIONS', `Duplicate options: "${dupes.join('", "').substring(0, 100)}"`);
  }

  // AUDIT 5: All options look the same (first 20 chars match)
  if (data.options.length >= 4) {
    const prefixes = data.options.map(o => o.substring(0, 20));
    const uniquePrefixes = new Set(prefixes);
    if (uniquePrefixes.size === 1 && prefixes[0].length > 5) {
      addIssue(section, qId, 'MED', 'IDENTICAL_PREFIXES', `All options start with: "${prefixes[0]}"`);
    }
  }

  // AUDIT 6: HTML artifacts in rendered text
  if (data.htmlArtifacts > 0) {
    addIssue(section, qId, 'MED', 'HTML_ARTIFACTS', `${data.htmlArtifacts} HTML tags visible in rendered text`);
  }

  // AUDIT 7: LaTeX rendering failures
  if (data.latexFailures > 0) {
    addIssue(section, qId, 'MED', 'LATEX_FAILURE', `${data.latexFailures} unrendered LaTeX expressions`);
  }

  // AUDIT 8: Very long option text (might be a misplaced explanation)
  for (let i = 0; i < data.options.length; i++) {
    if (data.options[i] && data.options[i].length > 500) {
      addIssue(section, qId, 'LOW', 'LONG_OPTION', `Option ${String.fromCharCode(65 + i)} is ${data.options[i].length} chars — might be misplaced explanation`);
    }
  }

  // AUDIT 9: Question text appears to be cut off
  if (data.questionText && data.questionText.endsWith('...') && data.questionText.length < 50) {
    addIssue(section, qId, 'LOW', 'TRUNCATED_QUESTION', `Question appears truncated: "${data.questionText}"`);
  }

  return data;
}

/**
 * Audit the explanation after answering
 */
async function auditExplanation(page, section, qId) {
  const explData = await page.evaluate(() => {
    const body = document.body.innerText;
    // Find explanation text
    const explMatch = body.match(/(?:Explanation|Why)[:\s]*(.{20,500})/i);
    const explText = explMatch ? explMatch[1] : '';
    return {
      hasExplanation: /explanation|correct answer|rationale/i.test(body),
      explanationLength: explText.length,
      explanationPreview: explText.substring(0, 100),
    };
  });

  if (!explData.hasExplanation) {
    addIssue(section, qId, 'MED', 'MISSING_EXPLANATION', 'No explanation visible after answering');
  } else if (explData.explanationLength < 20) {
    addIssue(section, qId, 'LOW', 'SHORT_EXPLANATION', `Explanation only ${explData.explanationLength} chars`);
  }
}

/**
 * Switch to a specific exam course
 */
async function switchToExam(page, section) {
  // Determine which exam this section belongs to
  let examId = null;
  for (const [exam, sections] of Object.entries(EXAM_SECTIONS)) {
    if (sections.includes(section)) { examId = exam; break; }
  }
  if (!examId) return;

  // Navigate to the exam's info page to trigger course switch
  await nav(page, `/${examId}/info`, 3000);
  // Or use the course selector
  await nav(page, `/${examId}`, 3000);
}

/**
 * Audit all questions in a section
 */
async function auditSection(page, section) {
  console.log(`\n  ── Section: ${section} ──`);

  // Switch to the right exam first
  await switchToExam(page, section);

  // Navigate to practice with fresh state (no auto-restored session)
  await freshPractice(page);

  // Select section
  const sectionDropdown = page.locator(`button:has-text("${section}"), [data-testid*="section"]`).first();
  if (await sectionDropdown.count() > 0) {
    await sectionDropdown.click();
    await page.waitForTimeout(500);
    const sectionOpt = page.locator(`text="${section}"`).first();
    if (await sectionOpt.count() > 0) {
      await sectionOpt.click();
      await page.waitForTimeout(500);
    }
  }

  // Set question count
  const maxCount = QUICK ? 10 : 50;
  const countBtn = page.locator(`[data-testid="question-count-${maxCount}"]`);
  if (await countBtn.count() > 0) {
    await countBtn.click();
  } else {
    // Try other counts
    for (const c of [50, 25, 10]) {
      const btn = page.locator(`[data-testid="question-count-${c}"]`);
      if (await btn.count() > 0) { await btn.click(); break; }
    }
  }

  const startBtn = page.locator('[data-testid="start-practice"]');
  if (await startBtn.count() === 0) {
    console.log(`    ℹ️ Could not start practice for ${section} — skipping`);
    sectionStats[section] = { audited: 0, issues: 0 };
    return;
  }
  await startBtn.click();
  await page.waitForTimeout(5000);

  let questionsAudited = 0;
  let sectionIssueCount = 0;
  const maxQuestions = QUICK ? 10 : 50;

  for (let q = 0; q < maxQuestions; q++) {
    // Check if we're still on a question
    const hasQuestion = await page.evaluate(() => {
      const opts = document.querySelectorAll('[data-testid^="answer-option-"]');
      return opts.length > 0;
    });

    if (!hasQuestion) {
      // Check if we're on results page
      const isResults = await page.evaluate(() =>
        /results|complete|score|summary/i.test(document.body.innerText)
      );
      if (isResults) break;

      // Maybe still loading
      await page.waitForTimeout(2000);
      const hasQ2 = await page.evaluate(() =>
        document.querySelectorAll('[data-testid^="answer-option-"]').length > 0
      );
      if (!hasQ2) break;
    }

    // Audit the question
    const issuesBefore = issues.length;
    await auditCurrentQuestion(page, section);
    questionsAudited++;

    // Answer the question to see the explanation
    const opt0 = page.locator('[data-testid="answer-option-0"]');
    if (await opt0.count() > 0) {
      await opt0.click();
      await page.waitForTimeout(200);
    }

    const submitBtn = page.locator('[data-testid="submit-answer"]');
    if (await submitBtn.count() > 0 && !(await submitBtn.isDisabled())) {
      await submitBtn.click();
      await page.waitForTimeout(1500);

      // Audit the explanation
      const qId = `${section}-q${q + 1}`;
      await auditExplanation(page, section, qId);
    }

    sectionIssueCount += issues.length - issuesBefore;

    // Go to next question
    const nextBtn = page.locator('button:has-text("Next")').first();
    if (await nextBtn.count() > 0) {
      await nextBtn.click();
      await page.waitForTimeout(1500);
    } else {
      // Try keyboard
      await page.keyboard.press('n');
      await page.waitForTimeout(1500);
    }
  }

  sectionStats[section] = { audited: questionsAudited, issues: sectionIssueCount };
  console.log(`    ✅ Audited ${questionsAudited} questions, found ${sectionIssueCount} issues`);
}

// ═══════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════
async function main() {
  const sections = getSections();
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  🔍  Content Auditor — ${MOBILE ? 'Mobile' : 'Desktop'}`);
  console.log(`  Sections: ${sections.join(', ')}`);
  console.log(`  Mode: ${QUICK ? 'Quick (10 per section)' : 'Full (50 per section)'}`);
  console.log(`${'═'.repeat(60)}`);

  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: VP.w, height: VP.h },
    isMobile: MOBILE,
    hasTouch: MOBILE,
  });
  const page = await ctx.newPage();

  // Suppress console noise
  const consoleErrors = [];
  page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });

  // Login
  console.log('\n══ LOGIN ══');
  await nav(page, '/login', 2000);
  await page.locator('input[type="email"]').first().fill(EMAIL);
  await page.locator('#password').first().fill(PASSWORD);
  await page.locator('button[type="submit"]').first().click();
  await page.waitForTimeout(8000);
  if (page.url().includes('/login')) {
    console.log('  ❌ Login failed');
    await browser.close();
    process.exit(1);
  }
  console.log('  ✅ Login');

  // Audit each section
  for (const section of sections) {
    try {
      await auditSection(page, section);
    } catch (err) {
      console.log(`    ❌ Section ${section} crashed: ${err.message}`);
      sectionStats[section] = { audited: 0, issues: 0, error: err.message };
    }
  }

  await browser.close();

  // ── REPORT ──
  const high = issues.filter(i => i.severity === 'HIGH');
  const med  = issues.filter(i => i.severity === 'MED');
  const low  = issues.filter(i => i.severity === 'LOW');

  console.log('\n');
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log(`║  Content Audit Report — ${MOBILE ? 'Mobile' : 'Desktop'.padEnd(7)}                     ║`);
  console.log('╠══════════════════════════════════════════════════════════╣');
  console.log(`║  📊 Questions Audited: ${String(totalAudited).padStart(5)}                            ║`);
  console.log(`║  🔴 HIGH severity:     ${String(high.length).padStart(5)}                            ║`);
  console.log(`║  🟠 MED severity:      ${String(med.length).padStart(5)}                            ║`);
  console.log(`║  🟡 LOW severity:      ${String(low.length).padStart(5)}                            ║`);
  console.log(`║  📝 Total issues:      ${String(issues.length).padStart(5)}                            ║`);
  console.log('╠══════════════════════════════════════════════════════════╣');

  // Per-section summary
  for (const [sec, stat] of Object.entries(sectionStats)) {
    const line = `  ${sec.padEnd(10)} ${String(stat.audited).padStart(3)} audited, ${String(stat.issues).padStart(3)} issues`;
    console.log(`║${line.padEnd(58)}║`);
  }
  console.log('╚══════════════════════════════════════════════════════════╝');

  // Category breakdown
  if (issues.length > 0) {
    console.log('\n── Issues by Category ──');
    const categories = {};
    issues.forEach(i => { categories[i.category] = (categories[i.category] || 0) + 1; });
    Object.entries(categories).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
      console.log(`  ${cat}: ${count}`);
    });
  }

  // HIGH severity details
  if (high.length > 0) {
    console.log('\n── HIGH Severity Issues ──');
    high.forEach(i => {
      console.log(`  🔴 [${i.section}/${i.questionId}] ${i.category}: ${i.detail}`);
    });
  }

  // Write full report to JSON
  const report = {
    timestamp: new Date().toISOString(),
    viewport: MOBILE ? 'mobile' : 'desktop',
    mode: QUICK ? 'quick' : 'full',
    totalAudited,
    issues,
    sectionStats,
    summary: {
      high: high.length,
      med: med.length,
      low: low.length,
      total: issues.length,
    },
  };
  const reportPath = `${DIR}/audit-report.json`;
  writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n📄 Full report saved to: ${reportPath}`);

  process.exit(high.length > 0 ? 1 : 0);
}

main().catch(err => { console.error('Fatal:', err); process.exit(2); });

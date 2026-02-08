/**
 * CFP Retirement Questions - Batch 10
 * Domain 6: Retirement Savings and Income Planning (19% of exam)
 * 25 additional questions covering retirement planning topics
 */

import { Question } from '../../../types';

export const CFP_RETIREMENT_BATCH10_QUESTIONS: Question[] = [
  // RET-1: Retirement Needs Analysis
  {
    id: 'CFP-RET-B10-001',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-1',
    topic: 'Needs Analysis',
    subtopic: 'Replacement Ratio',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The replacement ratio approach to retirement planning assumes:',
    options: [
      'A) Keeping income exactly the same',
      'B) A target percentage of pre-retirement income will maintain lifestyle, typically 70-80% due to reduced expenses',
      'C) Doubling retirement income',
      'D) No inflation adjustment'
    ],
    correctAnswer: 1,
    explanation: 'Replacement ratio: target percentage of pre-retirement income (commonly 70-80%). Lower needed because: no longer saving for retirement, reduced taxes, no work expenses, potentially no mortgage. May underestimate: healthcare costs, travel in early retirement. Best as starting point—detailed expense analysis is more accurate for individual planning.'
  },
  {
    id: 'CFP-RET-B10-002',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-1',
    topic: 'Needs Analysis',
    subtopic: 'Capital Preservation',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A capital preservation approach to retirement income:',
    options: [
      'A) Spends down all assets during retirement',
      'B) Maintains the principal value of assets while spending only investment returns',
      'C) Requires annuitization',
      'D) Ignores inflation'
    ],
    correctAnswer: 1,
    explanation: 'Capital preservation: live on investment earnings, preserve principal. Benefits: assets to leave heirs, cushion for longevity, psychological security. Drawbacks: requires larger portfolio, may underspend in retirement. Alternative: capital utilization (planned spending of principal). Choice depends on goals—legacy vs. maximizing retirement lifestyle.'
  },
  {
    id: 'CFP-RET-B10-003',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-1',
    topic: 'Needs Analysis',
    subtopic: 'Monte Carlo Simulation',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Monte Carlo simulation in retirement planning:',
    options: [
      'A) Uses single fixed return assumptions',
      'B) Runs thousands of random scenarios to estimate probability of success under varying market conditions',
      'C) Guarantees outcomes',
      'D) Only considers average returns'
    ],
    correctAnswer: 1,
    explanation: 'Monte Carlo: runs thousands of simulations with randomized returns based on historical distributions. Shows probability of success (e.g., 85% chance of not running out of money). Better than straight-line projections—incorporates sequence of returns risk and variability. 90%+ often targeted, but 100% is unrealistic and leads to excessive conservatism.'
  },
  // RET-2: Qualified Plans
  {
    id: 'CFP-RET-B10-004',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Qualified Plans',
    subtopic: 'Safe Harbor 401(k)',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A Safe Harbor 401(k) plan allows employers to:',
    options: [
      'A) Avoid all contributions',
      'B) Bypass ADP/ACP nondiscrimination testing by making specified contribution formulas immediately vested',
      'C) Reduce employee benefits',
      'D) Exclude certain employees'
    ],
    correctAnswer: 1,
    explanation: 'Safe Harbor 401(k): avoid nondiscrimination testing (ADP/ACP) by providing: 3% nonelective contribution to all eligible OR 4% matching (100% first 3% + 50% next 2%). Must be immediately 100% vested. Provides certainty for HCEs about contribution limits. Trade-off: guaranteed cost vs. testing risk.'
  },
  {
    id: 'CFP-RET-B10-005',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Qualified Plans',
    subtopic: 'Profit Sharing Allocation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Profit sharing contributions can use age-weighted allocation which:',
    options: [
      'A) Favors younger employees',
      'B) Allows larger allocations to older employees because they have less time for compound growth',
      'C) Requires equal dollar contributions',
      'D) Is always prohibited'
    ],
    correctAnswer: 1,
    explanation: 'Age-weighted profit sharing: allocates considering age/time to retirement. Older employees receive larger current contributions because less time for compound growth. Must still pass nondiscrimination testing (cross-testing). Useful when owners/key employees are older than staff. New comparability/cross-tested plans are related approach for flexibility.'
  },
  {
    id: 'CFP-RET-B10-006',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Qualified Plans',
    subtopic: 'Hardship Withdrawal',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Hardship withdrawals from 401(k) plans:',
    options: [
      'A) Are always penalty-free',
      'B) Must be for immediate and heavy financial need, are subject to income tax, and may have 10% penalty',
      'C) Can include employer contributions',
      'D) Have no restrictions'
    ],
    correctAnswer: 1,
    explanation: 'Hardship withdrawals: limited to employee elective deferrals, must be for immediate/heavy need (medical, eviction, funeral, certain education), taxable as ordinary income, 10% penalty applies unless exception, cannot exceed need. Not loans—cannot be repaid. Last resort after other resources exhausted. Plan must allow.'
  },
  // RET-3: Distribution Rules
  {
    id: 'CFP-RET-B10-007',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'Distribution Rules',
    subtopic: 'Net Unrealized Appreciation',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Net Unrealized Appreciation (NUA) strategy involves:',
    options: [
      'A) Rolling all assets to an IRA',
      'B) Taking employer stock in-kind from a qualified plan, paying ordinary income tax on cost basis only, with appreciation taxed as long-term capital gains when sold',
      'C) Avoiding all taxes',
      'D) Selling stock before distribution'
    ],
    correctAnswer: 1,
    explanation: 'NUA: distribute employer stock in-kind rather than rolling to IRA. Pay ordinary income on cost basis at distribution. NUA (growth in plan) taxed as LTCG when stock sold. Benefits: LTCG rates vs. ordinary rates, no 10-year rule for heirs. Requirements: lump-sum distribution, must be employer securities. Analyze: enough NUA to make worthwhile?'
  },
  {
    id: 'CFP-RET-B10-008',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'Distribution Rules',
    subtopic: 'Inherited IRA 10-Year Rule',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Under SECURE Act rules, most non-spouse designated beneficiaries must:',
    options: [
      'A) Take distributions over their lifetime',
      'B) Fully distribute inherited IRA within 10 years of the owner\'s death, with no annual RMD requirements for most',
      'C) Take a lump sum immediately',
      'D) Rollover to their own IRA'
    ],
    correctAnswer: 1,
    explanation: 'SECURE Act changed inherited IRA rules: most non-spouse beneficiaries subject to 10-year rule (account emptied by 12/31 of year containing 10th anniversary). No annual RMDs for most. Exceptions (EDBs): surviving spouse, minor children (until majority), disabled/chronically ill, those not more than 10 years younger. Tax planning around withdrawal timing important.'
  },
  {
    id: 'CFP-RET-B10-009',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'Distribution Rules',
    subtopic: 'Qualified Longevity Annuity Contract',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A Qualified Longevity Annuity Contract (QLAC) allows:',
    options: [
      'A) Unlimited premium payments',
      'B) Deferring RMDs on the amount used to purchase the annuity until age 85, protecting against longevity risk',
      'C) Avoiding all RMDs permanently',
      'D) Immediate income'
    ],
    correctAnswer: 1,
    explanation: 'QLAC: deferred income annuity purchased in qualified account. Premiums (up to $200,000) excluded from RMD calculation. Payments must begin by age 85. Purpose: longevity insurance—guaranteed income for advanced age. Trade-offs: illiquidity, death before payments means lost value (unless death benefit rider). Part of comprehensive retirement income strategy.'
  },
  // RET-4: Social Security
  {
    id: 'CFP-RET-B10-010',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Social Security',
    subtopic: 'Primary Insurance Amount',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The Primary Insurance Amount (PIA) is:',
    options: [
      'A) The maximum benefit available',
      'B) The benefit payable at full retirement age, calculated from the Average Indexed Monthly Earnings',
      'C) The amount after early claiming reduction',
      'D) Annual earnings'
    ],
    correctAnswer: 1,
    explanation: 'PIA: monthly benefit at Full Retirement Age (FRA). Calculated from AIME using bend points formula (progressive—replaces higher percentage of lower earnings). Early claiming reduces PIA; delayed claiming increases it. Knowing PIA helps calculate benefits at different ages. Based on highest 35 years of indexed earnings.'
  },
  {
    id: 'CFP-RET-B10-011',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Social Security',
    subtopic: 'Spousal Coordination',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Optimal Social Security claiming for couples often involves:',
    options: [
      'A) Both claiming at 62',
      'B) Considering which spouse has higher earnings, survivor benefits, age difference, and life expectancy',
      'C) Always delaying both to 70',
      'D) Ignoring the other spouse\'s benefits'
    ],
    correctAnswer: 1,
    explanation: 'Couple claiming strategy: higher earner delay (maximizes survivor benefit for longer-living spouse), lower earner may claim earlier (provides income while waiting), age difference matters (survivor benefits), relative health/life expectancy, break-even analysis. Survivor benefit = higher of own or deceased spouse\'s. Maximize lifetime household benefit, not individual.'
  },
  {
    id: 'CFP-RET-B10-012',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Social Security',
    subtopic: 'File and Suspend',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Under current rules, the file and suspend strategy:',
    options: [
      'A) Still allows full strategic use',
      'B) Is largely eliminated—suspending benefits now also suspends auxiliary benefits for spouse',
      'C) Increases total benefits',
      'D) Works exactly as before 2015'
    ],
    correctAnswer: 1,
    explanation: 'Bipartisan Budget Act of 2015 eliminated most file-and-suspend strategies. Now if worker suspends, spouse also has benefits suspended. Can still suspend for delayed retirement credits, but doesn\'t enable spousal benefits while worker delays. Existing strategies grandfathered if filed before April 29, 2016. Know current rules vs. historical.'
  },
  // RET-5: Investment Considerations
  {
    id: 'CFP-RET-B10-013',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Retirement Investments',
    subtopic: 'Liability Matching',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Liability-driven investing for retirement income:',
    options: [
      'A) Focuses only on equity returns',
      'B) Matches assets to specific future liabilities/spending needs, often using bonds to fund near-term expenses',
      'C) Ignores spending patterns',
      'D) Recommends 100% stocks'
    ],
    correctAnswer: 1,
    explanation: 'Liability-driven investing (LDI): structure assets to meet specific future liabilities. Time-segment (bucket) approach: near-term (0-5 years) in conservative assets, mid-term in balanced, long-term in growth. Essential expenses may be covered by guaranteed income (annuities, pensions, SS). Match durations. Reduces sequence-of-returns risk for near-term needs.'
  },
  {
    id: 'CFP-RET-B10-014',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Retirement Investments',
    subtopic: 'Glide Path in Retirement',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A rising equity glide path in retirement:',
    options: [
      'A) Decreases stock allocation over time',
      'B) Starts with lower equity exposure and increases it later if early sequence risk doesn\'t materialize',
      'C) Maintains fixed allocation',
      'D) Ignores market conditions'
    ],
    correctAnswer: 1,
    explanation: 'Rising equity glide path: counter-intuitive but research-supported. Lower equity at retirement (vulnerable to sequence risk), increase over time. If early poor returns occur, portfolio is protected. If good early returns, later can take more risk with cushion. Historical analysis suggests may reduce failure rates. Contrasts with traditional declining glide path.'
  },
  {
    id: 'CFP-RET-B10-015',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Retirement Investments',
    subtopic: 'Withdrawal Rate Adjustments',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Dynamic withdrawal strategies adjust spending based on:',
    options: [
      'A) Nothing—fixed amounts always',
      'B) Portfolio performance, establishing guardrails that increase or decrease spending based on market conditions',
      'C) Only age',
      'D) Only inflation'
    ],
    correctAnswer: 1,
    explanation: 'Dynamic/guardrail strategies: adjust withdrawal rate based on portfolio performance. Example: if portfolio grows significantly, can increase spending; if declines significantly, reduce spending. Ceiling and floor guardrails prevent extremes. Better success rates than fixed withdrawal, but requires spending flexibility. Common: Guyton-Klinger, Kitces, and others.'
  },
  // Additional Topics
  {
    id: 'CFP-RET-B10-016',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-1',
    topic: 'Needs Analysis',
    subtopic: 'Healthcare Costs',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Retirement healthcare cost planning should consider:',
    options: [
      'A) Only Medicare premiums',
      'B) Medicare premiums, supplemental insurance, out-of-pocket costs, long-term care, and costs before Medicare eligibility',
      'C) Zero healthcare costs after 65',
      'D) Only prescription drugs'
    ],
    correctAnswer: 1,
    explanation: 'Healthcare in retirement: Medicare premiums (A, B, D—means-tested), Medigap or Advantage costs, dental/vision/hearing (not covered), prescription copays, long-term care (major gap), pre-65 coverage if retiring early. Estimates: couples may need $300K+ just for healthcare. Often underestimated—plan specifically for this major expense.'
  },
  {
    id: 'CFP-RET-B10-017',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Qualified Plans',
    subtopic: 'Defined Benefit Plan',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A traditional defined benefit pension plan:',
    options: [
      'A) Only uses employee contributions',
      'B) Promises a specific benefit at retirement based on formula, with employer bearing investment risk',
      'C) Allows employee investment direction',
      'D) Has no guarantee'
    ],
    correctAnswer: 1,
    explanation: 'Defined benefit: promises specific retirement benefit (formula based on years of service x salary factor). Employer funds and invests, bears investment risk. PBGC insures private plans. Becoming rare—cost and risk shifted employers to DC plans. If offered, understand: vesting, formula, COLA, survivor options, lump sum vs. annuity choice.'
  },
  {
    id: 'CFP-RET-B10-018',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'Distribution Rules',
    subtopic: 'Pro-Rata Rule',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The pro-rata rule for IRA distributions means:',
    options: [
      'A) Only after-tax dollars come out first',
      'B) Each distribution is part taxable and part tax-free based on the ratio of after-tax contributions to total IRA balance',
      'C) Roth comes out first',
      'D) You can choose which dollars to distribute'
    ],
    correctAnswer: 1,
    explanation: 'Pro-rata rule: can\'t cherry-pick which dollars come out. If traditional IRAs have after-tax contributions (basis), each withdrawal is proportionally taxable and non-taxable based on total balance across all traditional IRAs. Form 8606 tracks. Affects: conversions, distributions. All traditional IRAs aggregated. Plan around this for Roth conversion efficiency.'
  },
  {
    id: 'CFP-RET-B10-019',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Social Security',
    subtopic: 'Disability Benefits',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Social Security Disability Insurance (SSDI) converts to:',
    options: [
      'A) Nothing at retirement age',
      'B) Retirement benefits at Full Retirement Age, with the same benefit amount',
      'C) Medicare only',
      'D) Reduced benefits regardless'
    ],
    correctAnswer: 1,
    explanation: 'SSDI: automatically converts to retirement benefits at FRA at same amount. Medicare starts 24 months after SSDI begins (exception: ALS immediate). No reduction for early claiming—disability waives that. Important: SSDI recipients don\'t have to decide about early vs. delayed claiming. Disability benefit equals unreduced FRA amount.'
  },
  {
    id: 'CFP-RET-B10-020',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Retirement Investments',
    subtopic: 'Income Floor',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An income floor approach to retirement income:',
    options: [
      'A) Invests everything aggressively',
      'B) Uses guaranteed income sources to cover essential expenses, allowing remaining assets to be invested for growth',
      'C) Avoids all risk',
      'D) Relies only on portfolio withdrawals'
    ],
    correctAnswer: 1,
    explanation: 'Income floor strategy: secure essential expenses with guaranteed income (Social Security, pensions, SPIA annuities), invest remaining assets for growth/discretionary spending. Psychological benefit: basic needs always covered regardless of market. Allows more aggressive investing with remaining portfolio. Addresses longevity risk for essentials.'
  },
  {
    id: 'CFP-RET-B10-021',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-1',
    topic: 'Needs Analysis',
    subtopic: 'Early Retirement',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Early retirement (before 65) planning must specifically address:',
    options: [
      'A) Only leisure activities',
      'B) Health insurance coverage gap, longer portfolio need, reduced Social Security, and 10% penalty issues',
      'C) Medicare enrollment',
      'D) Required Minimum Distributions'
    ],
    correctAnswer: 1,
    explanation: 'Early retirement challenges: health insurance until Medicare (expensive—COBRA, ACA, private), longer withdrawal period (maybe 30-40 years), reduced SS if claiming early, 10% penalty on retirement accounts unless exception (Rule of 55, 72(t)), no RMDs yet but may need assets. Must have careful planning—traditional rules assume age 65.'
  },
  {
    id: 'CFP-RET-B10-022',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Qualified Plans',
    subtopic: '403(b) Plans',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: '403(b) plans are available to employees of:',
    options: [
      'A) All for-profit corporations',
      'B) Public schools, 501(c)(3) nonprofits, and certain ministers, with similar features to 401(k) plans',
      'C) Only federal employees',
      'D) Self-employed individuals'
    ],
    correctAnswer: 1,
    explanation: '403(b): for employees of public schools, 501(c)(3) tax-exempt organizations, and certain ministers. Similar contribution limits to 401(k). Traditional and Roth options. Often investments limited to annuities or mutual funds. May have 15-year service catch-up beyond age 50 catch-up. Same 10% early withdrawal penalty rules apply.'
  },
  {
    id: 'CFP-RET-B10-023',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'Distribution Rules',
    subtopic: 'In-Service Distribution',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'In-service distributions from employer plans allow:',
    options: [
      'A) Distributions only after termination',
      'B) Some employees to withdraw or roll over funds while still employed, often after reaching age 59½',
      'C) Immediate full withdrawal at any age',
      'D) Only hardship amounts'
    ],
    correctAnswer: 1,
    explanation: 'In-service distributions: some plans allow withdrawals while still employed. Age 59½ common trigger (avoid 10% penalty). May allow rollover to IRA for broader investment options or Roth conversion. Not all plans allow—check plan document. Useful for tax planning (Roth conversions), accessing better investments, or estate planning.'
  },
  {
    id: 'CFP-RET-B10-024',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Social Security',
    subtopic: 'Credits Needed',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'To qualify for Social Security retirement benefits, a worker needs:',
    options: [
      'A) 20 credits (5 years of work)',
      'B) 40 credits (about 10 years of work), with up to 4 credits earned per year based on earnings',
      'C) 60 credits (15 years)',
      'D) No minimum'
    ],
    correctAnswer: 1,
    explanation: 'Social Security eligibility: 40 credits required (fully insured). Earn up to 4 credits/year based on earnings (2024: $1,730 per credit). About 10 years of covered work. Fewer credits for disability (recently insured test) or survivors benefits. 40 credits gets eligibility—benefit amount depends on earnings history. Check Social Security statement for credits.'
  },
  {
    id: 'CFP-RET-B10-025',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Retirement Investments',
    subtopic: 'Portfolio Rebalancing',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Portfolio rebalancing in retirement serves to:',
    options: [
      'A) Maximize returns',
      'B) Maintain target risk level by selling appreciated assets and buying underperformers, also managing tax efficiency',
      'C) Increase trading costs',
      'D) Match the market'
    ],
    correctAnswer: 1,
    explanation: 'Rebalancing in retirement: maintains target allocation as markets shift, prevents drift toward higher/lower risk. Tax considerations: use tax-deferred accounts for taxable rebalancing, harvest losses in taxable, avoid short-term gains. In accumulation, can rebalance with new contributions. In retirement, must sell—plan for tax impact. Threshold-based often better than calendar.'
  }
];

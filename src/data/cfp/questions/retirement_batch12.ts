/**
 * CFP Retirement Questions - Batch 12
 * Domain 6: Retirement Savings and Income Planning (19% of exam)
 * 25 additional questions
 */

import { Question } from '../../../types';

export const CFP_RETIREMENT_BATCH12_QUESTIONS: Question[] = [
  // RET-1: Retirement Needs Analysis
  {
    id: 'CFP-RET-B12-001',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-1',
    topic: 'Needs Analysis',
    subtopic: 'Healthcare Cost Projection',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Projecting healthcare costs in retirement should account for:',
    options: [
      'A) Only Medicare premiums',
      'B) Healthcare inflation exceeding general inflation, Medicare premiums/copays, supplemental insurance, and potential long-term care',
      'C) $0 costs with Medicare',
      'D) Employer coverage continuing'
    ],
    correctAnswer: 1,
    explanation: 'Healthcare projection realistic: Medicare Part B/D premiums (income-based IRMAA), Medigap or Advantage costs, out-of-pocket (copays, dental, vision, hearing), long-term care. Healthcare inflation: historically 5-7% vs. 2-3% general. Fidelity estimates ~$315K for couple retiring at 65 (2023). Major retirement expense—model carefully, consider health status, family history.'
  },
  {
    id: 'CFP-RET-B12-002',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-1',
    topic: 'Needs Analysis',
    subtopic: 'Retirement Income Sources',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Creating reliable retirement income often involves:',
    options: [
      'A) Single income source',
      'B) Combining guaranteed sources (Social Security, pensions, annuities) with flexible sources (portfolio withdrawals, part-time work)',
      'C) Only investment income',
      'D) Full annuitization'
    ],
    correctAnswer: 1,
    explanation: 'Retirement income "flooring": cover essential expenses with guaranteed sources—Social Security, pensions, possibly income annuities. Discretionary: supported by portfolio, part-time work, flexible. Benefits: peace of mind (essentials covered regardless of markets), flexibility for wants. Essential income floor: reduces sequence risk impact on lifestyle. Balance: enough guaranteed, enough flexibility.'
  },
  {
    id: 'CFP-RET-B12-003',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-1',
    topic: 'Needs Analysis',
    subtopic: 'Early Retirement Considerations',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Early retirement before age 59½ requires planning for:',
    options: [
      'A) Standard withdrawal strategies',
      'B) Penalty-free access strategies (Rule of 55, SEPP, Roth contributions, taxable accounts) and pre-Medicare health insurance',
      'C) No special considerations',
      'D) Social Security only'
    ],
    correctAnswer: 1,
    explanation: 'Early retirement challenges: 10% penalty on retirement account withdrawals before 59½, no Medicare until 65. Access strategies: Rule of 55 (401k if separate at 55+), SEPP/72(t), Roth contributions (always penalty-free), taxable accounts. Healthcare: ACA marketplace (subsidy management important), COBRA (expensive), spouse\'s plan, health sharing. Plan ahead—5+ year bridge period is significant.'
  },
  // RET-2: Qualified Plans
  {
    id: 'CFP-RET-B12-004',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Qualified Plans',
    subtopic: 'Controlled Group Rules',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Controlled group and affiliated service group rules for retirement plans:',
    options: [
      'A) Are optional',
      'B) Require related businesses to be treated as single employer for plan testing and contribution limits',
      'C) Only apply to public companies',
      'D) Don\'t affect coverage testing'
    ],
    correctAnswer: 1,
    explanation: 'Controlled/affiliated groups: related businesses (80%+ common ownership or specific relationships) treated as one employer. Impacts: coverage testing, nondiscrimination, contribution limits applied across group. Example: owner of two 100%-owned businesses—both employees count for testing, limits shared. Complex family attribution rules. Affects plan design, compliance. Essential for business owners with multiple entities.'
  },
  {
    id: 'CFP-RET-B12-005',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Qualified Plans',
    subtopic: 'Solo 401(k) Features',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A Solo 401(k) for self-employed individuals allows:',
    options: [
      'A) Only employer contributions',
      'B) Both employee elective deferrals and employer profit-sharing contributions, maximizing savings potential',
      'C) Roth contributions are prohibited',
      'D) Lower limits than SEP IRA'
    ],
    correctAnswer: 1,
    explanation: 'Solo 401(k) advantages: employee deferrals (~$23K, +$7.5K if 50+) + employer contributions (up to 25% of comp or 20% of SE income). Total: up to ~$69K (2024). Optional: Roth elective deferrals, loans. Better than SEP for many self-employed (can save more with same income). Requirement: no employees (except spouse). More administration than SEP but more flexibility.'
  },
  {
    id: 'CFP-RET-B12-006',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Qualified Plans',
    subtopic: 'Cross-Tested Plans',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Cross-tested ("new comparability") profit-sharing plans allow:',
    options: [
      'A) Equal contributions for all',
      'B) Different contribution rates for different groups if plan passes nondiscrimination testing on equivalent benefit basis',
      'C) Only age-weighted contributions',
      'D) No HCE contributions'
    ],
    correctAnswer: 1,
    explanation: 'Cross-tested plans: contribute different rates to different groups (often owners vs. employees). Must pass testing when contributions converted to equivalent benefits (not dollar-for-dollar). Permits: higher owner contributions while minimum for employees. Useful: older owner with younger employees, professional practices. Actuarial testing required. Alternative to age-weighted for maximizing owner benefits.'
  },
  // RET-3: Distribution Rules
  {
    id: 'CFP-RET-B12-007',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'Distribution Rules',
    subtopic: 'Inherited 401(k) Rules',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Non-spouse beneficiaries inheriting 401(k) plans after SECURE Act:',
    options: [
      'A) Have same options as pre-SECURE',
      'B) Generally must empty account within 10 years, with different rules than inherited IRAs in some cases',
      'C) Must take lump sum',
      'D) Can use stretch over lifetime'
    ],
    correctAnswer: 1,
    explanation: 'Inherited 401(k) post-SECURE: most designated beneficiaries—10-year rule. EDBs (spouse, minor child, disabled, close in age, certain trusts) may stretch. 401(k) difference from IRA: plan terms control options, may restrict (some plans require 5-year or lump sum). Rollover to inherited IRA often provides more flexibility. Check plan document. Annual RMDs may be required during 10-year period if owner died after RBD.'
  },
  {
    id: 'CFP-RET-B12-008',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'Distribution Rules',
    subtopic: 'Net Unrealized Appreciation',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The NUA strategy for employer stock in 401(k) plans:',
    options: [
      'A) Converts all to capital gains',
      'B) Allows the appreciation on employer stock to be taxed at favorable capital gains rates rather than ordinary income',
      'C) Works for any stock',
      'D) Has no requirements'
    ],
    correctAnswer: 1,
    explanation: 'NUA: net unrealized appreciation on employer stock. Lump-sum distribution in-kind: pay ordinary income on cost basis only, NUA taxed as LTCG when sold. Requirements: lump sum, trigger event (separation, 59½, disability, death), employer securities. Strategy: significant appreciation, high ordinary rate. Trade-offs: lose tax-deferred growth, concentration risk. Analysis needed—not always beneficial. Must be lump sum distribution.'
  },
  {
    id: 'CFP-RET-B12-009',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'Distribution Rules',
    subtopic: 'QDRO Considerations',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A Qualified Domestic Relations Order (QDRO) for 401(k) plans:',
    options: [
      'A) Only applies to IRAs',
      'B) Allows pension/retirement benefits to be divided in divorce without tax or penalty to the participant',
      'C) Requires participant approval',
      'D) Creates immediate taxation'
    ],
    correctAnswer: 1,
    explanation: 'QDRO: court order assigning portion of retirement plan to alternate payee (spouse, child, dependent). No tax to participant on transferred portion. Alternate payee: receives as own, or if distribution—ordinary income to them, may have early withdrawal penalty (unless exception). Each plan has QDRO procedures. IRAs don\'t need QDRO—transfer incident to divorce is tax-free. Get QDRO right—mistakes costly.'
  },
  // RET-4: Social Security
  {
    id: 'CFP-RET-B12-010',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Social Security',
    subtopic: 'Benefit Calculation',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The Social Security PIA (Primary Insurance Amount) is calculated using:',
    options: [
      'A) Last 10 years\' earnings',
      'B) A formula applying bend points to AIME, providing proportionally higher replacement for lower earners',
      'C) Average of all earnings',
      'D) Flat rate for all'
    ],
    correctAnswer: 1,
    explanation: 'PIA formula: progressive—replaces higher percentage of lower earnings. 2024 bend points example: 90% of first $1,174 AIME + 32% of AIME between $1,174-$7,078 + 15% above $7,078. Result: lower earners get higher replacement rate. COLA applied to PIA. Bend points adjust with wage growth. Understanding: why higher earners get lower replacement, why spousal benefit may be attractive for lower earner.'
  },
  {
    id: 'CFP-RET-B12-011',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Social Security',
    subtopic: 'Benefit Estimates',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'The most reliable source for personalized Social Security benefit estimates is:',
    options: [
      'A) Online calculators',
      'B) The Social Security Administration\'s my Social Security account, which uses your actual earnings record',
      'C) General rules of thumb',
      'D) Employer estimates'
    ],
    correctAnswer: 1,
    explanation: 'my Social Security (ssa.gov): access your actual earnings record, personalized benefit estimates at different claiming ages. More accurate than calculators using estimates. Check: earnings record accuracy (important—errors reduce benefits). Shows: retirement, disability, survivor estimates. Planning: use for projections, spouse access for both records. Free, essential planning tool.'
  },
  {
    id: 'CFP-RET-B12-012',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Social Security',
    subtopic: 'Trust Fund Projections',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Current projections for Social Security trust fund depletion suggest:',
    options: [
      'A) Benefits will end completely',
      'B) Without changes, benefits could be reduced to about 80% of scheduled amounts when trust fund depletes (around 2033-2035)',
      'C) No changes are needed',
      'D) Benefits will increase'
    ],
    correctAnswer: 1,
    explanation: 'Trust fund projections: depletion ~2033-2035 (dates vary by report). After depletion: benefits not zero—ongoing payroll taxes would fund ~77-80% of scheduled benefits. Political solutions needed: tax increases, benefit changes, or combination. Planning: some conservatism reasonable, but drastic cuts unlikely (political reality). Monitor legislative changes. Younger workers: plan for potential adjustments.'
  },
  // RET-5: Investment Considerations
  {
    id: 'CFP-RET-B12-013',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Retirement Investments',
    subtopic: 'Sequence of Returns',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Sequence of returns risk in retirement can be mitigated by:',
    options: [
      'A) Higher equity allocation',
      'B) Maintaining cash buffer, flexible withdrawal rates, diversified income sources, and tactical spending adjustments',
      'C) All-bond portfolios',
      'D) Ignoring market conditions'
    ],
    correctAnswer: 1,
    explanation: 'Sequence risk mitigation: cash buffer (1-3 years expenses in stable assets), flexible withdrawals (reduce in down markets), income floor (Social Security, pensions—not affected by sequence), part-time income, dynamic allocation (rising equity glide path theory), bond tent. Goal: avoid selling equities in down markets for income. Early retirement years most vulnerable. Plan before entering retirement.'
  },
  {
    id: 'CFP-RET-B12-014',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Retirement Investments',
    subtopic: 'Withdrawal Order',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Tax-efficient withdrawal ordering typically suggests taking income from:',
    options: [
      'A) Roth accounts first',
      'B) Taxable accounts first (lower tax-drag), then tax-deferred, then Roth (tax-free to continue growing)',
      'C) Equal amounts from all',
      'D) Tax-deferred first always'
    ],
    correctAnswer: 1,
    explanation: 'Conventional withdrawal order: taxable (capital gains rates, step-up possible), tax-deferred (ordinary income), Roth (tax-free, best growth preservation). But: not absolute—consider bracket management, RMD avoidance via Roth conversions, ACA subsidies. Goal: minimize lifetime taxes, not just current year. Dynamic approach often better than rigid ordering. Model different scenarios.'
  },
  {
    id: 'CFP-RET-B12-015',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Retirement Investments',
    subtopic: 'Deferred Income Annuities',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A Deferred Income Annuity (DIA) or Qualified Longevity Annuity Contract (QLAC):',
    options: [
      'A) Provides immediate income',
      'B) Delays income start, often to age 80-85, providing longevity insurance at lower cost than immediate annuity',
      'C) Is only for qualified accounts',
      'D) Guarantees investment returns'
    ],
    correctAnswer: 1,
    explanation: 'DIA: purchase now, income starts later (often decades). Lower premium than SPIA because: deferral period earnings, mortality credits (deaths before income starts). Addresses: longevity risk, super-long retirement. QLAC: DIA within retirement account, up to $200K (2024), can defer RMDs on QLAC portion until income starts (by 85). Strategy: insure late retirement, reduce RMDs, accept loss if die early.'
  },
  // Additional Topics
  {
    id: 'CFP-RET-B12-016',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-1',
    topic: 'Needs Analysis',
    subtopic: 'Retirement Timeline',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A comprehensive retirement timeline should map:',
    options: [
      'A) Only income sources',
      'B) Income sources, expense changes, Social Security timing, Medicare enrollment, RMDs, and major life events',
      'C) Investment returns only',
      'D) Tax brackets only'
    ],
    correctAnswer: 1,
    explanation: 'Retirement timeline elements: income start dates (SS, pension, annuity), major expense changes (mortgage payoff, healthcare), Medicare enrollment (65—don\'t miss!), RMD beginning (73/75), tax milestones, planned spending changes (travel early, slow later). Visual timeline: helps clients understand sequencing, identifies gaps or overlaps. Basis for cash flow and tax planning.'
  },
  {
    id: 'CFP-RET-B12-017',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Qualified Plans',
    subtopic: 'Automatic Features',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Automatic enrollment and automatic escalation in 401(k) plans:',
    options: [
      'A) Are mandatory for all plans',
      'B) Default employees into plan unless they opt out, and automatically increase contributions over time',
      'C) Guarantee retirement income',
      'D) Reduce employer costs'
    ],
    correctAnswer: 1,
    explanation: 'Auto-enrollment: new employees automatically enrolled at default rate (often 3-6%) unless they opt out. Auto-escalation: contribution rate automatically increases each year (often 1% until reaching 10-15%). SECURE 2.0: requires auto-enrollment for new plans (with exceptions). Research: dramatically increases participation and savings rates. Opt-out: employees can always change or stop.'
  },
  {
    id: 'CFP-RET-B12-018',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'Distribution Rules',
    subtopic: 'Form 8606',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Form 8606 is required to:',
    options: [
      'A) Report all IRA contributions',
      'B) Track nondeductible IRA contributions and calculate taxable portion of distributions (pro-rata rule)',
      'C) Report Roth conversions only',
      'D) Claim retirement credit'
    ],
    correctAnswer: 1,
    explanation: 'Form 8606: tracks nondeductible IRA contributions (basis), calculates taxable portion of distributions using pro-rata rule, reports Roth conversions and backdoor Roth. Pro-rata: distributions from all traditional IRAs combined, proportionate basis comes out tax-free. Critical: file every year you make nondeductible contributions. Lost Form 8606 records create tax headaches—maintain copies.'
  },
  {
    id: 'CFP-RET-B12-019',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Social Security',
    subtopic: 'Coordination with Pensions',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Coordinating pension and Social Security claiming decisions involves:',
    options: [
      'A) Always taking both immediately',
      'B) Evaluating tradeoffs: pension with survivor options, Social Security delay benefits, combined tax impact, and longevity considerations',
      'C) Ignoring one or the other',
      'D) Taking lump sums always'
    ],
    correctAnswer: 1,
    explanation: 'Pension/SS coordination: Consider: pension survivorship options (affects survivor income), SS delay credits (8%/year to 70), combined income for tax (SS taxation thresholds), replacement rates together. Strategies: bridge with pension while delaying SS, evaluate lump sum vs. annuity (compare to SS delay value), survivor protection (pension survivor + SS survivor). Integrated analysis—not separate decisions.'
  },
  {
    id: 'CFP-RET-B12-020',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Retirement Investments',
    subtopic: 'Fee Impact',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Investment fees in retirement accounts:',
    options: [
      'A) Have minimal long-term impact',
      'B) Compound over time and can significantly reduce retirement assets—a 1% difference can mean 20%+ less over 30 years',
      'C) Are always disclosed',
      'D) Only matter in large accounts'
    ],
    correctAnswer: 1,
    explanation: 'Fee impact: $100K at 7% for 30 years = $761K. At 6% (1% fee impact) = $574K. Difference: $187K (25% less). Fees to monitor: fund expense ratios, advisory fees, plan fees, trading costs. Low-cost options: increase by percentage points of return. Fiduciary duty: include cost consideration. Compare: total cost of ownership. Small percentages = big dollars over time.'
  },
  {
    id: 'CFP-RET-B12-021',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-1',
    topic: 'Needs Analysis',
    subtopic: 'Retirement Readiness',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Retirement readiness assessments should evaluate:',
    options: [
      'A) Only investment accounts',
      'B) Financial resources, healthcare coverage, emotional readiness, and whether lifestyle expectations are funded',
      'C) Social Security only',
      'D) Current income only'
    ],
    correctAnswer: 1,
    explanation: 'Retirement readiness beyond money: Healthcare (coverage until Medicare, expected costs), lifestyle plan (what will you do with time?), emotional preparation (identity beyond work, purpose), housing decisions, family considerations. Financial: funded ratio for goals, sustainable income, emergency reserves. Many retirees unprepared emotionally even if financially ready. Holistic assessment important.'
  },
  {
    id: 'CFP-RET-B12-022',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Qualified Plans',
    subtopic: 'Hardship Withdrawals',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Hardship withdrawals from 401(k) plans:',
    options: [
      'A) Are tax-free',
      'B) Require immediate and heavy financial need, are subject to income tax and potentially early withdrawal penalty',
      'C) Can be repaid',
      'D) Have no limitations'
    ],
    correctAnswer: 1,
    explanation: 'Hardship withdrawals: must be for immediate, heavy financial need (medical, education, eviction prevention, funeral, home repair). Limited to amount of need. Taxable as ordinary income + 10% penalty if under 59½ (unless exception). Not loans—can\'t be repaid. May limit contributions temporarily. Last resort—explore loans, other sources first. Plan must allow. Document need.'
  },
  {
    id: 'CFP-RET-B12-023',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'Distribution Rules',
    subtopic: 'Still-Working Exception',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The still-working exception for RMDs:',
    options: [
      'A) Applies to all retirement accounts',
      'B) Allows delaying 401(k) RMDs from current employer\'s plan while still employed after RMD age, but not IRAs or former employers',
      'C) Requires IRS approval',
      'D) Only for owner-employees'
    ],
    correctAnswer: 1,
    explanation: 'Still-working exception: delay RMDs from current employer\'s 401(k) while still working after RMD age. Requirements: employed by that employer, not a 5%+ owner. Doesn\'t apply to: IRAs (must take RMDs regardless of employment), prior employer 401(k)s. Strategy: if still working, may leave/consolidate funds in current 401(k) to delay all RMDs. Terminates when employment ends.'
  },
  {
    id: 'CFP-RET-B12-024',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Social Security',
    subtopic: 'Disability Benefits',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Social Security disability insurance (SSDI) benefits:',
    options: [
      'A) Are only for workplace injuries',
      'B) Provide income for workers unable to perform substantial gainful activity due to medical condition expected to last 12+ months',
      'C) Have no age requirements',
      'D) Don\'t affect retirement benefits'
    ],
    correctAnswer: 1,
    explanation: 'SSDI: for workers with qualifying disability. Eligibility: work credits (varies by age), inability to perform substantial gainful activity, condition lasting 12+ months or terminal. Benefit: based on earnings record (like retirement). 5-month waiting period. At FRA: converts to retirement benefit (same amount). Medicare: after 24 months on SSDI. Application: complex process, often denied initially. Can work alongside planning.'
  },
  {
    id: 'CFP-RET-B12-025',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Retirement Investments',
    subtopic: 'Sustainable Withdrawal',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'More sophisticated sustainable withdrawal strategies than the 4% rule include:',
    options: [
      'A) Fixed dollar amounts',
      'B) Guardrails (adjust based on portfolio performance), mortality-adjusted, and dynamic percentage approaches',
      'C) Only annuities',
      'D) No systematic approach'
    ],
    correctAnswer: 1,
    explanation: 'Dynamic strategies: Guardrails (Guyton-Klinger: cut if portfolio falls below threshold, raise if exceeds), constant percentage (always 4% of current balance—variable income), mortality-weighted (increase rate as life expectancy decreases), amortization-based (recalculate each year). Benefits: extend portfolio, higher average spending. Trade-off: income variability. Match: client flexibility, income needs, risk tolerance.'
  }
];

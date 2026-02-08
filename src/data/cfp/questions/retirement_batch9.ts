/**
 * CFP Retirement Questions - Batch 9
 * Domain 6: Retirement Savings and Income Planning (19% of exam)
 * 25 additional questions covering retirement planning topics
 */

import { Question } from '../../../types';

export const CFP_RETIREMENT_BATCH9_QUESTIONS: Question[] = [
  // RET-1: Retirement Needs Analysis
  {
    id: 'CFP-RET-B9-001',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-1',
    topic: 'Needs Analysis',
    subtopic: 'Inflation-Adjusted Spending',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When projecting retirement spending needs, inflation adjustments should reflect:',
    options: [
      'A) A constant CPI rate',
      'B) That different expense categories inflate at different rates, with healthcare often exceeding general inflation',
      'C) Zero inflation for retirees',
      'D) Only housing costs'
    ],
    correctAnswer: 1,
    explanation: 'Retirement spending inflation varies by category. Healthcare historically rises faster than CPI (5-6% vs 2-3%). Housing costs may stabilize if mortgage is paid. Food and utilities track general inflation. Some expenses decrease (work-related, some travel) while others increase (healthcare, home maintenance). Personalized projections beat single inflation rate.'
  },
  {
    id: 'CFP-RET-B9-002',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-1',
    topic: 'Needs Analysis',
    subtopic: 'Go-Go, Slow-Go, No-Go',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The "go-go, slow-go, no-go" retirement spending model suggests:',
    options: [
      'A) Spending remains constant',
      'B) Spending often decreases in phases as retirees become less active, with travel and discretionary spending declining before essential costs rise',
      'C) Spending always increases',
      'D) Only healthcare costs matter'
    ],
    correctAnswer: 1,
    explanation: 'Retirement spending phases: Go-go (65-75): active lifestyle, travel, high discretionary spending. Slow-go (75-85): reduced activity, fewer trips, declining spending. No-go (85+): limited activity, but healthcare costs rise. This U-shaped real spending pattern (declining then rising for healthcare) should inform withdrawal strategies.'
  },
  {
    id: 'CFP-RET-B9-003',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-1',
    topic: 'Needs Analysis',
    subtopic: 'Retirement Timing',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Delaying retirement from age 62 to 67 typically improves retirement security because:',
    options: [
      'A) Expenses increase in retirement',
      'B) It allows additional savings accumulation, delays benefits increasing Social Security, and shortens the distribution period',
      'C) Investment returns are higher',
      'D) Healthcare costs decrease'
    ],
    correctAnswer: 1,
    explanation: 'Delayed retirement benefits: more years saving (5 additional years potentially +$100K+), assets grow longer, Social Security increases substantially (approximately 30% higher at 67 vs 62, more by 70), fewer years needing withdrawals, continued employer healthcare coverage. The compounding effect of all factors significantly improves retirement security.'
  },
  // RET-2: Qualified Plan Rules
  {
    id: 'CFP-RET-B9-004',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Qualified Plans',
    subtopic: 'Contribution Deadlines',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The contribution deadline for employer contributions to a qualified plan is:',
    options: [
      'A) December 31 of the plan year',
      'B) The tax filing deadline (including extensions) for the employer\'s return for that year',
      'C) January 15 of the following year',
      'D) March 15 always'
    ],
    correctAnswer: 1,
    explanation: 'Employer contributions can be made until the tax return due date, including extensions. For calendar-year corporations, this extends to October 15 with extension. The contribution can be deducted in the prior year if deposited by this deadline. Employee deferrals have earlier deposit deadlines (generally as soon as administratively feasible).'
  },
  {
    id: 'CFP-RET-B9-005',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Qualified Plans',
    subtopic: 'Cash Balance Plans',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A cash balance pension plan differs from a traditional defined benefit plan in that:',
    options: [
      'A) It has no guaranteed benefit',
      'B) It expresses benefits as a hypothetical account balance with guaranteed interest credits, providing more portability',
      'C) Employers bear no investment risk',
      'D) It cannot be combined with other plans'
    ],
    correctAnswer: 1,
    explanation: 'Cash balance: hybrid DB plan with individual "accounts" showing balance (not actual segregated funds). Employers credit annual pay credit (e.g., 5% of salary) plus interest credit (guaranteed rate). At retirement, receive balance as annuity or lump sum. More portable than traditional DB, easier to understand, but employer still bears investment risk on actual assets.'
  },
  {
    id: 'CFP-RET-B9-006',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Qualified Plans',
    subtopic: 'Top-Heavy Testing',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A plan becomes "top-heavy" and triggers minimum contribution requirements when:',
    options: [
      'A) It exceeds contribution limits',
      'B) More than 60% of plan assets belong to key employees (officers, >5% owners, and >1% owners earning over threshold)',
      'C) Non-discrimination testing fails',
      'D) Less than 70% participate'
    ],
    correctAnswer: 1,
    explanation: 'Top-heavy: key employees (certain officers, 5% owners, 1% owners earning >$150K) hold over 60% of plan assets. If top-heavy, non-key employees must receive minimum contributions (3% of compensation for DC plans, additional accruals for DB). Small businesses with owner concentration often trigger top-heavy status.'
  },
  // RET-3: Distribution Rules
  {
    id: 'CFP-RET-B9-007',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'Distributions',
    subtopic: '60-Day Rollover',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The 60-day rollover rule allows:',
    options: [
      'A) Unlimited rollovers annually',
      'B) One indirect rollover per 12-month period per taxpayer, with funds recontributed within 60 days to avoid taxation',
      'C) Extensions for any reason',
      'D) Partial rollovers prohibited'
    ],
    correctAnswer: 1,
    explanation: '60-day indirect rollover: receive distribution, redeposit to eligible plan within 60 days. Limited to one per person per 12 months (not per account). 20% mandatory withholding from distributions complicates rollover of full amount. Missed deadline = taxable distribution plus potential penalty. Direct trustee-to-trustee transfers avoid these issues.'
  },
  {
    id: 'CFP-RET-B9-008',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'Distributions',
    subtopic: 'Substantially Equal Periodic Payments',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Substantially equal periodic payments (72(t)/72(q)) require:',
    options: [
      'A) Annual recalculation',
      'B) Maintaining the payment stream for the longer of 5 years or until age 59½, with modifications triggering back penalties',
      'C) Only one account to be tapped',
      'D) Maximum withdrawal amounts'
    ],
    correctAnswer: 1,
    explanation: 'SEPP: penalty-free early withdrawals using IRS-approved methods (RMD, amortization, annuitization). Must continue for 5 years or until 59½, whichever is longer. Any modification triggers retroactive 10% penalty on all prior distributions plus interest. Careful calculation and commitment required—not easily reversible.'
  },
  {
    id: 'CFP-RET-B9-009',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'Distributions',
    subtopic: 'Designated Beneficiary',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Under SECURE Act rules, a "designated beneficiary" who is not an eligible designated beneficiary must:',
    options: [
      'A) Take RMDs annually based on life expectancy',
      'B) Withdraw the entire inherited retirement account within 10 years of the owner\'s death',
      'C) Take a lump sum immediately',
      'D) Follow the owner\'s original RMD schedule'
    ],
    correctAnswer: 1,
    explanation: 'Post-SECURE Act: designated beneficiaries (individuals) who aren\'t "eligible" (spouse, minor child, disabled, chronically ill, not-more-than-10-years-younger) face 10-year rule—must drain account by December 31 of the year containing the 10th anniversary of death. No annual RMDs required (updated guidance clarified this), but full distribution by year 10.'
  },
  // RET-4: Investment Considerations
  {
    id: 'CFP-RET-B9-010',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Retirement Investing',
    subtopic: 'Asset Location',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Optimal asset location strategy generally places:',
    options: [
      'A) All assets equally across accounts',
      'B) Tax-inefficient assets (bonds, REITs) in tax-deferred accounts and tax-efficient assets (stocks, munis) in taxable accounts',
      'C) All stocks in IRAs',
      'D) Bonds in taxable accounts'
    ],
    correctAnswer: 1,
    explanation: 'Asset location: put tax-inefficient assets (taxable bonds—ordinary income, REITs—non-qualified dividends) in tax-deferred accounts. Tax-efficient assets (stocks—qualified divs/LTCG, munis—tax-exempt) go in taxable accounts. Roth accounts (never taxed) suit high-growth assets. Proper location can add 0.25-0.50% annual after-tax return.'
  },
  {
    id: 'CFP-RET-B9-011',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Retirement Investing',
    subtopic: 'Sequence of Returns Risk',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Sequence of returns risk is most dangerous:',
    options: [
      'A) During the accumulation phase',
      'B) During the "retirement red zone" (years just before and after retirement) when portfolios are largest and withdrawals begin',
      'C) Only in bear markets',
      'D) For bonds only'
    ],
    correctAnswer: 1,
    explanation: 'Sequence risk: poor returns early in retirement devastate portfolios since withdrawals lock in losses. The "retirement red zone" (5 years before to 5-10 years after retirement) is highest risk period. Mitigate with: diversification, reduced equity allocation as retirement approaches, cash reserves for 1-2 years expenses, flexibility to reduce spending in down markets.'
  },
  {
    id: 'CFP-RET-B9-012',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Retirement Investing',
    subtopic: 'Bucket Strategy',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A "bucket strategy" for retirement income divides assets into:',
    options: [
      'A) Equal parts',
      'B) Time-segmented buckets—near-term needs in cash/stable, mid-term in balanced, long-term in growth, providing psychological comfort and spending flexibility',
      'C) Single diversified portfolio',
      'D) By account type only'
    ],
    correctAnswer: 1,
    explanation: 'Bucket strategy: Bucket 1 (0-2 years): cash/short-term bonds for immediate needs. Bucket 2 (3-10 years): balanced/income investments. Bucket 3 (10+ years): growth investments. Psychologically comforting—clients see near-term needs are safe. Periodically refill shorter buckets from longer ones. Functionally similar to single portfolio but clients understand it better.'
  },
  // RET-5: Social Security
  {
    id: 'CFP-RET-B9-013',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Social Security',
    subtopic: 'Earnings Test',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The Social Security earnings test affects benefits when:',
    options: [
      'A) You work after age 70',
      'B) You earn above annual limits before Full Retirement Age, with $1 withheld per $2 of excess earnings',
      'C) You have investment income',
      'D) You receive a pension'
    ],
    correctAnswer: 1,
    explanation: 'Earnings test: if collecting before FRA and working, benefits reduced $1 per $2 above limit ($21,240 in 2023). In FRA year, $1 per $3 above higher limit, counting only pre-FRA earnings. After FRA, no limit. Withheld benefits aren\'t lost—they increase future benefits. Only earned income counts, not investment/pension income.'
  },
  {
    id: 'CFP-RET-B9-014',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Social Security',
    subtopic: 'Divorced Spouse Benefits',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A divorced spouse can claim Social Security benefits on an ex-spouse\'s record if:',
    options: [
      'A) Married at least 5 years and divorced at least 1 year',
      'B) Marriage lasted at least 10 years, currently unmarried (or subsequent marriage ended), and both are at least 62',
      'C) The ex-spouse has died',
      'D) Currently living together'
    ],
    correctAnswer: 1,
    explanation: 'Divorced spouse benefits require: marriage of at least 10 years, currently unmarried (or subsequent marriage ended in divorce/death/annulment), both at least 62, divorced at least 2 years (waived if ex is already collecting). Benefit: up to 50% of ex\'s PIA at FRA. Doesn\'t reduce ex\'s or current spouse\'s benefits.'
  },
  {
    id: 'CFP-RET-B9-015',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Social Security',
    subtopic: 'Windfall Elimination Provision',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The Windfall Elimination Provision (WEP) reduces Social Security benefits for:',
    options: [
      'A) All high earners',
      'B) Workers who receive pensions from employment not covered by Social Security, using a modified formula that reduces benefits',
      'C) Those who delay claiming',
      'D) Federal employees only'
    ],
    correctAnswer: 1,
    explanation: 'WEP affects those with pensions from non-Social Security-covered work (some government, foreign employers). The regular benefit formula\'s 90% factor is reduced (to as low as 40%) for first bend point. Maximum reduction is capped. More years of "substantial" Social Security earnings reduce WEP impact. GPO separately affects spousal benefits.'
  },
  // Additional Topics
  {
    id: 'CFP-RET-B9-016',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-1',
    topic: 'Needs Analysis',
    subtopic: 'Safe Withdrawal Rate Research',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The traditional "4% rule" research (Bengen) was based on:',
    options: [
      'A) Average market returns',
      'B) Historical worst-case 30-year periods, using 50/50 to 75/25 stock/bond allocation, finding 4% initial withdrawal survived all periods',
      'C) Only bull markets',
      'D) 100% stock allocation'
    ],
    correctAnswer: 1,
    explanation: 'Bengen\'s research (1994): 4% initial withdrawal, inflation-adjusted annually, survived all historical 30-year periods using 50-75% stocks. Limitations: based on U.S. market, historical returns, fixed allocation. Criticisms: future returns may differ, sequence risk not fully addressed, ignores flexibility. Still useful as starting point, not rigid rule.'
  },
  {
    id: 'CFP-RET-B9-017',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Qualified Plans',
    subtopic: 'Plan Loans',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A participant loan from a 401(k) plan:',
    options: [
      'A) Is always prohibited',
      'B) Must generally be repaid within 5 years with substantially level payments at least quarterly, with principal residence loans allowed longer terms',
      'C) Has no repayment requirement',
      'D) Counts as a distribution'
    ],
    correctAnswer: 1,
    explanation: 'Plan loans (if plan permits): max 50% of vested balance up to $50,000, repaid within 5 years (except principal residence—longer allowed), level amortization at least quarterly, reasonable interest rate. Failure to repay: treated as distribution with taxes/penalties. Risk: leaving employment accelerates repayment. Opportunity cost of missing market gains.'
  },
  {
    id: 'CFP-RET-B9-018',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'Distributions',
    subtopic: 'In-Plan Roth Conversion',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An in-plan Roth conversion allows:',
    options: [
      'A) Tax-free conversion',
      'B) Converting pre-tax 401(k) balances to designated Roth 401(k) within the same plan, with the converted amount being taxable',
      'C) Only employer contributions',
      'D) Avoiding RMDs'
    ],
    correctAnswer: 1,
    explanation: 'In-plan Roth conversion: shift pre-tax money to designated Roth account within same 401(k). Converted amount is taxable. Unlike Roth IRA conversion, funds stay in 401(k) (creditor protection, different RMD rules). Strategy: convert in low-income years. 2024 SECURE 2.0: employer matches can go directly to Roth.'
  },
  {
    id: 'CFP-RET-B9-019',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Retirement Investing',
    subtopic: 'Covered Call Strategy',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A covered call strategy in retirement portfolios:',
    options: [
      'A) Eliminates all risk',
      'B) Generates income by selling call options on owned stocks, sacrificing unlimited upside for premium income',
      'C) Is only for speculators',
      'D) Increases volatility'
    ],
    correctAnswer: 1,
    explanation: 'Covered calls: own stock, sell calls against it. Collect premium income, but give up gains above strike price. Reduces (doesn\'t eliminate) downside via premium. Appropriate for: income-focused investors, stocks with limited expected upside, tax-deferred accounts. Trade-off: steady income vs. forgone big rallies. Popular in retirement for income enhancement.'
  },
  {
    id: 'CFP-RET-B9-020',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Social Security',
    subtopic: 'Benefit Recalculation',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Social Security benefits are automatically recalculated when:',
    options: [
      'A) Once set, they never change',
      'B) You have additional years of earnings that replace lower or zero years in the 35-year calculation',
      'C) Only at age 70',
      'D) Upon request only'
    ],
    correctAnswer: 1,
    explanation: 'SSA automatically recalculates annually if continued earnings exceed one of the 35 years in the calculation. Higher current earnings replace lower or zero years, increasing future benefits. This is why working while collecting can increase benefits (beyond just reduced earnings test withholding). Recalculation is automatic—no action required.'
  },
  {
    id: 'CFP-RET-B9-021',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-1',
    topic: 'Needs Analysis',
    subtopic: 'Monte Carlo Interpretation',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When interpreting Monte Carlo simulation results for retirement planning:',
    options: [
      'A) 100% success probability is required',
      'B) The probability of success should be balanced against the cost of pursuing higher certainty, and clients should understand what "failure" means in the model',
      'C) Results are precise predictions',
      'D) Lower probabilities are always failures'
    ],
    correctAnswer: 1,
    explanation: 'Monte Carlo interpretation: 80% success may be appropriate if client can reduce spending. 95% may sacrifice current lifestyle unnecessarily. "Failure" in the model (running out at 95) may not equal actual failure (clients adjust, work part-time, reduce spending). Discuss what probability is acceptable given flexibility and consequences.'
  },
  {
    id: 'CFP-RET-B9-022',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Qualified Plans',
    subtopic: 'Automatic Enrollment',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Automatic enrollment in 401(k) plans:',
    options: [
      'A) Is now prohibited',
      'B) Increases participation by enrolling employees automatically at a default rate unless they opt out, with SECURE 2.0 requiring it for new plans',
      'C) Reduces plan participation',
      'D) Requires employee consent'
    ],
    correctAnswer: 1,
    explanation: 'Automatic enrollment: employees are enrolled unless they actively opt out. Dramatically increases participation (from ~60% to 85%+). SECURE 2.0 mandates it for new 401(k)/403(b) plans (some exemptions). Typically starts at 3% with auto-escalation. Employees can still opt out or change rate. Uses inertia to improve outcomes.'
  },
  {
    id: 'CFP-RET-B9-023',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'Distributions',
    subtopic: 'Inherited IRA Trusts',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'When a trust is named as IRA beneficiary, distribution rules depend on:',
    options: [
      'A) Only the trust type',
      'B) Whether it\'s a "see-through" trust meeting specific requirements, and whether conduit or accumulation trust',
      'C) IRS approval',
      'D) Trust assets only'
    ],
    correctAnswer: 1,
    explanation: 'Trust as IRA beneficiary: "see-through" (valid, irrevocable at death, identifiable beneficiaries, documentation provided) can use beneficiary rules. Conduit trust: distributes all RMDs to beneficiaries (their life expectancies used). Accumulation trust: can retain distributions (oldest beneficiary\'s life expectancy). Non-see-through trusts: 5-year rule. Complex—requires careful drafting.'
  },
  {
    id: 'CFP-RET-B9-024',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Retirement Investing',
    subtopic: 'Annuitization Decision',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'The decision to annuitize retirement assets depends on:',
    options: [
      'A) Only age',
      'B) Longevity expectations, other guaranteed income, health, bequest motives, risk tolerance, and rates available',
      'C) Tax bracket only',
      'D) Asset size exclusively'
    ],
    correctAnswer: 1,
    explanation: 'Annuitization analysis: do you need guaranteed income beyond Social Security/pension? Health/longevity expectations (longer life = more annuity value)? Bequest goals (annuity dies with you unless options purchased)? Interest rates (higher = better annuity payouts)? Risk tolerance (annuity removes investment risk)? Partial annuitization often makes sense.'
  },
  {
    id: 'CFP-RET-B9-025',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Social Security',
    subtopic: 'Medicare Interaction',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Social Security and Medicare interact such that:',
    options: [
      'A) They are completely separate',
      'B) Medicare Part B/D premiums are deducted from Social Security, and IRMAA surcharges based on income can significantly increase premiums',
      'C) Delaying Social Security delays Medicare',
      'D) Medicare is free with Social Security'
    ],
    correctAnswer: 1,
    explanation: 'Medicare Part B/D premiums typically deducted from Social Security check. IRMAA: income-related monthly adjustment amounts increase premiums for higher earners (based on income from 2 years prior). Social Security COLA might be absorbed by Medicare premium increases. At 65, must enroll in Medicare even if delaying Social Security.'
  }
];

/**
 * CFP Retirement Questions - Batch 7
 * Domain 6: Retirement Savings and Income Planning (19% of exam)
 * 25 additional questions covering retirement planning
 */

import { Question } from '../../../types';

export const CFP_RETIREMENT_BATCH7_QUESTIONS: Question[] = [
  // RET-1: Retirement Needs Analysis
  {
    id: 'CFP-RET-B7-001',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-1',
    topic: 'Retirement Planning',
    subtopic: 'Monte Carlo Analysis',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Monte Carlo simulation in retirement planning:',
    options: [
      'A) Provides a single deterministic outcome',
      'B) Runs thousands of scenarios with varying returns and sequence to estimate probability of success',
      'C) Assumes constant returns each year',
      'D) Only considers inflation'
    ],
    correctAnswer: 1,
    explanation: 'Monte Carlo simulation uses randomized return sequences across many trials (often 1,000+) to model various market environments. It provides probability of success (e.g., 85% chance of not running out of money) rather than single-point projections, capturing sequence of returns risk and return variability.'
  },
  {
    id: 'CFP-RET-B7-002',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-1',
    topic: 'Retirement Planning',
    subtopic: 'Healthcare Costs',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A significant retirement planning concern for early retirees (before age 65) is:',
    options: [
      'A) Collecting Social Security early',
      'B) Bridging the gap until Medicare eligibility with marketplace or COBRA coverage',
      'C) Accessing 401(k) funds',
      'D) Pension calculation'
    ],
    correctAnswer: 1,
    explanation: 'Early retirees face healthcare coverage gaps before Medicare at 65. Options include COBRA (expensive, limited duration), marketplace plans (with possible subsidies), spouse\'s employer plan, or short-term plans. Healthcare costs are major early retirement expenses and must be planned.'
  },
  {
    id: 'CFP-RET-B7-003',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-1',
    topic: 'Retirement Planning',
    subtopic: 'Retirement Age Sensitivity',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Delaying retirement from age 62 to 67 typically:',
    options: [
      'A) Has minimal impact on retirement security',
      'B) Significantly improves outcomes by adding savings years, reducing distribution years, and increasing Social Security benefits',
      'C) Only affects Social Security',
      'D) Is not financially beneficial'
    ],
    correctAnswer: 1,
    explanation: 'Five more working years dramatically improves retirement: more savings years, fewer spending years, larger Social Security (avoiding early claiming penalty and gaining delayed credits), potentially longer employer healthcare, and pension accrual if applicable. Sensitivity analysis shows retirement timing is among the most powerful variables.'
  },
  // RET-2: Employer Plans
  {
    id: 'CFP-RET-B7-004',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Employer Plans',
    subtopic: 'Safe Harbor 401(k)',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A Safe Harbor 401(k) plan:',
    options: [
      'A) Has stricter contribution limits',
      'B) Allows employers to avoid annual non-discrimination testing by making required matching or non-elective contributions',
      'C) Only benefits highly compensated employees',
      'D) Requires employee approval'
    ],
    correctAnswer: 1,
    explanation: 'Safe Harbor plans bypass ADP/ACP discrimination testing by providing: (1) 100% match on 3% + 50% match on next 2% of deferrals, OR (2) 3-4% non-elective contribution to all eligible employees. Contributions must be immediately vested. This allows HCEs to maximize contributions without testing failure risk.'
  },
  {
    id: 'CFP-RET-B7-005',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Employer Plans',
    subtopic: 'Top-Heavy Rules',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A qualified plan is considered "top-heavy" when:',
    options: [
      'A) The plan has too many participants',
      'B) More than 60% of plan assets are held by key employees, triggering minimum contribution requirements',
      'C) Contributions exceed limits',
      'D) The plan is overfunded'
    ],
    correctAnswer: 1,
    explanation: 'Top-heavy plans (>60% assets belonging to key employees—officers, 5%+ owners, 1%+ owners earning $200K+) must provide minimum contributions (typically 3% of compensation) to non-key employees. This prevents plans from disproportionately benefiting owners. Safe Harbor plans are exempt from top-heavy minimums.'
  },
  {
    id: 'CFP-RET-B7-006',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Employer Plans',
    subtopic: 'SIMPLE 401(k)',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A SIMPLE 401(k) differs from a regular 401(k) in that:',
    options: [
      'A) It has higher contribution limits',
      'B) It\'s designed for small employers (≤100 employees), has lower limits, no discrimination testing, and mandatory employer contributions',
      'C) It doesn\'t allow employee deferrals',
      'D) It\'s available only to self-employed individuals'
    ],
    correctAnswer: 1,
    explanation: 'SIMPLE 401(k) is for employers with ≤100 employees. Lower salary deferral limits ($16,000 in 2024) but no ADP/ACP testing. Employers must provide matching (up to 3%) or 2% non-elective contribution. More features than SIMPLE IRA (loans, Roth) but more complex.'
  },
  // RET-3: IRAs
  {
    id: 'CFP-RET-B7-007',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'IRAs',
    subtopic: 'Rollover vs Transfer',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The difference between an IRA direct transfer (trustee-to-trustee) and a rollover is:',
    options: [
      'A) There is no difference',
      'B) Transfers move funds directly between custodians without tax reporting, while rollovers involve receiving funds and have 60-day limits and once-per-year rules',
      'C) Transfers are taxable, rollovers are not',
      'D) Only rollovers are reported to the IRS'
    ],
    correctAnswer: 1,
    explanation: 'Direct transfers move assets custodian-to-custodian without the owner receiving funds—no 60-day limit, no once-per-year restriction, not reportable as distributions. Rollovers involve receiving funds and must be completed within 60 days; the once-per-year rule (for indirect rollovers) limits frequency.'
  },
  {
    id: 'CFP-RET-B7-008',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'IRAs',
    subtopic: 'Qualified Reservist Distribution',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Qualified reservist distributions allow:',
    options: [
      'A) Military personnel to contribute extra to IRAs',
      'B) Penalty-free early IRA distributions for reservists called to active duty for 180+ days, with repayment option',
      'C) Higher IRA limits for veterans',
      'D) Tax-free distributions to all veterans'
    ],
    correctAnswer: 1,
    explanation: 'Reservists called to active duty for 180+ days can take penalty-free IRA distributions (though still taxable). They can repay these distributions within 2 years of active duty end, effectively restoring retirement savings. This accommodates the financial disruption of military activation.'
  },
  {
    id: 'CFP-RET-B7-009',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'IRAs',
    subtopic: 'Reconversion Rules',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'After converting traditional IRA assets to Roth:',
    options: [
      'A) The conversion can be reversed (recharacterized) within 60 days',
      'B) Reconversions to traditional IRA are no longer permitted since the TCJA eliminated recharacterization of conversions',
      'C) The funds must remain in Roth for 10 years',
      'D) Additional conversions are prohibited for 5 years'
    ],
    correctAnswer: 1,
    explanation: 'Prior to TCJA (2018), Roth conversions could be recharacterized back to traditional. TCJA eliminated conversion recharacterization—conversions are now irrevocable. Contribution recharacterization (converting a Roth contribution to traditional or vice versa) is still allowed. This makes conversion planning more critical.'
  },
  // RET-4: Distribution Planning
  {
    id: 'CFP-RET-B7-010',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Distributions',
    subtopic: 'Required Beginning Date',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The Required Beginning Date (RBD) for IRA RMDs is:',
    options: [
      'A) December 31 of the year turning 73',
      'B) April 1 of the year following the year the owner turns 73',
      'C) The owner\'s 73rd birthday',
      'D) January 1 of the year turning 73'
    ],
    correctAnswer: 1,
    explanation: 'The first RMD must be taken by April 1 of the year following the year turning 73 (SECURE 2.0 age). Subsequent RMDs are due by December 31. Using the April 1 extension means two RMDs in the second year (higher taxes). For employer plans with the still-working exception, RBD is later.'
  },
  {
    id: 'CFP-RET-B7-011',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Distributions',
    subtopic: 'Substantially Equal Payments',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'SEPP (72(t)) distributions must continue for:',
    options: [
      'A) One year',
      'B) The greater of 5 years or until age 59½',
      'C) Exactly 5 years',
      'D) Until age 65'
    ],
    correctAnswer: 1,
    explanation: 'SEPP payments must continue for 5 years OR until 59½, whichever is LONGER. Modifying payments before this period ends triggers retroactive 10% penalties on all prior distributions plus interest. A 50-year-old starting SEPP must continue until 59½ (9.5 years); a 57-year-old must continue until 62 (5 years).'
  },
  {
    id: 'CFP-RET-B7-012',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Distributions',
    subtopic: 'Tax Torpedo',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The "tax torpedo" refers to:',
    options: [
      'A) Penalty for early distribution',
      'B) The high marginal tax rate effect when IRA distributions cause Social Security benefits to become taxable',
      'C) State income taxes',
      'D) Estate taxes on IRAs'
    ],
    correctAnswer: 1,
    explanation: 'The tax torpedo occurs when additional income causes previously untaxed Social Security benefits to become taxable. In the taxation zone, $1 of IRA income can add up to $1.85 to taxable income ($1 + $0.85 of SS becoming taxable), creating very high marginal rates. Strategic distribution and Roth conversion planning can mitigate this.'
  },
  // RET-5: Social Security
  {
    id: 'CFP-RET-B7-013',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Social Security',
    subtopic: 'Benefit Calculation',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Social Security benefits are calculated using:',
    options: [
      'A) All lifetime earnings',
      'B) The highest 35 years of indexed earnings, averaged and applied to a benefit formula',
      'C) Only the last 10 years of earnings',
      'D) A flat amount for all retirees'
    ],
    correctAnswer: 1,
    explanation: 'AIME (Average Indexed Monthly Earnings) uses the highest 35 years of wage-indexed earnings. Years without earnings count as zero, lowering the average. The PIA (Primary Insurance Amount) formula applies progressive bend points to AIME. Working additional high-earning years can replace earlier low or zero years.'
  },
  {
    id: 'CFP-RET-B7-014',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Social Security',
    subtopic: 'Ex-Spouse Benefits',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An ex-spouse can claim Social Security benefits on their former spouse\'s record if:',
    options: [
      'A) They were married for 5 years',
      'B) They were married at least 10 years, are unmarried, age 62+, and the benefit exceeds their own',
      'C) The ex-spouse gives permission',
      'D) They have minor children'
    ],
    correctAnswer: 1,
    explanation: 'Ex-spouse benefits require: (1) marriage lasting 10+ years, (2) divorced at least 2 years (if ex hasn\'t filed), (3) currently unmarried, (4) age 62+, and (5) entitled amount exceeds own benefit. The ex\'s benefits are unaffected by the claim. There\'s no limit on number of ex-spouses claiming.'
  },
  {
    id: 'CFP-RET-B7-015',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Social Security',
    subtopic: 'Child Benefits',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Children of a retired worker can receive Social Security benefits if they are:',
    options: [
      'A) Under age 25',
      'B) Under 18 (or 19 if full-time high school student), or disabled before age 22',
      'C) Unemployed',
      'D) Living with the parent'
    ],
    correctAnswer: 1,
    explanation: 'Dependent children of retired or disabled workers receive benefits if under 18, 18-19 and full-time high school students, or disabled before 22 (disabled adult children). Each child can receive up to 50% of the parent\'s PIA, subject to family maximum limits. This can significantly increase family benefits.'
  },
  // Additional Topics
  {
    id: 'CFP-RET-B7-016',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-1',
    topic: 'Retirement Planning',
    subtopic: 'Bucket Strategy',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A "bucket strategy" in retirement income planning:',
    options: [
      'A) Invests everything in one account',
      'B) Segments assets into short-term (cash/bonds), medium-term, and long-term (stocks) buckets to match time horizons',
      'C) Uses only dividend stocks',
      'D) Requires annuitization'
    ],
    correctAnswer: 1,
    explanation: 'Bucket strategies divide portfolios by time horizon: bucket 1 (1-2 years expenses in safe assets), bucket 2 (3-7 years in balanced investments), bucket 3 (7+ years in growth assets). This provides psychological comfort during downturns (knowing near-term needs are secure) while maintaining long-term growth potential.'
  },
  {
    id: 'CFP-RET-B7-017',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Employer Plans',
    subtopic: 'Cross-Tested Plans',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Cross-tested (new comparability) profit-sharing plans:',
    options: [
      'A) Must contribute equally to all employees',
      'B) Allocate different contribution percentages to different groups while passing non-discrimination tests on a benefits basis',
      'C) Are only for partnerships',
      'D) Have lower contribution limits'
    ],
    correctAnswer: 1,
    explanation: 'Cross-tested plans allow different contribution rates for different employee groups (often higher for older owners). They pass non-discrimination by testing projected benefits at retirement (rather than current contributions). This allows significant contributions to older, higher-paid employees while meeting minimum requirements for others.'
  },
  {
    id: 'CFP-RET-B7-018',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'IRAs',
    subtopic: 'Self-Directed IRA',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Self-directed IRAs:',
    options: [
      'A) Offer only stocks and bonds',
      'B) Allow alternative investments (real estate, private equity, precious metals) with greater complexity and risk',
      'C) Have higher contribution limits',
      'D) Are managed by the IRS'
    ],
    correctAnswer: 1,
    explanation: 'Self-directed IRAs hold alternative assets beyond traditional securities. Investments can include real estate, private companies, precious metals (certain types), and more. They require specialized custodians, have prohibited transaction risks (can\'t benefit personally from IRA assets), and demand more due diligence.'
  },
  {
    id: 'CFP-RET-B7-019',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Distributions',
    subtopic: 'In-Plan Roth Conversion',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'An in-plan Roth conversion (within a 401(k)):',
    options: [
      'A) Is tax-free',
      'B) Allows converting pre-tax 401(k) assets to the plan\'s Roth account, creating current taxable income',
      'C) Requires distribution from the plan',
      'D) Is only available after separation'
    ],
    correctAnswer: 1,
    explanation: 'In-plan Roth conversions (if the plan allows) convert pre-tax 401(k) money to Roth 401(k) without leaving the plan. The conversion is taxable. This provides Roth conversion opportunity while maintaining plan benefits (creditor protection, loan availability). SECURE 2.0 expanded this to include employer matches.'
  },
  {
    id: 'CFP-RET-B7-020',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Social Security',
    subtopic: 'COLA',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Social Security Cost of Living Adjustments (COLAs):',
    options: [
      'A) Are guaranteed at 3% annually',
      'B) Are based on the Consumer Price Index for Urban Wage Earners (CPI-W) and can be zero if inflation is flat',
      'C) Only apply to retirees over 70',
      'D) Are set by Congress each year'
    ],
    correctAnswer: 1,
    explanation: 'Social Security COLAs are automatic, based on CPI-W changes from Q3 to Q3. If there\'s no increase in CPI-W, there\'s no COLA (happened in 2010, 2011, 2016). Recent COLAs have varied from 0% to 8.7% (2023). COLAs apply to all beneficiaries, including disability and survivor benefits.'
  },
  {
    id: 'CFP-RET-B7-021',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-1',
    topic: 'Retirement Planning',
    subtopic: 'Phased Retirement',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Phased retirement strategies can include:',
    options: [
      'A) Only full-time work until a specific date',
      'B) Gradually reducing work hours, bridge employment, or consulting to ease the transition while maintaining some income',
      'C) Immediate full retirement only',
      'D) Increasing work hours before retirement'
    ],
    correctAnswer: 1,
    explanation: 'Phased retirement reduces hours or responsibility before full retirement. Benefits include continued income (reducing portfolio withdrawals), healthcare coverage, purpose and social connection, and gradual adjustment. Some employers offer formal programs; others accommodate informal arrangements.'
  },
  {
    id: 'CFP-RET-B7-022',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Employer Plans',
    subtopic: 'Hardship Distributions',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Hardship distributions from 401(k) plans:',
    options: [
      'A) Are tax-free',
      'B) Are allowed for immediate and heavy financial needs and are subject to income tax (and may be penalty-free under SECURE 2.0 provisions)',
      'C) Can be repaid to the plan',
      'D) Are unlimited in amount'
    ],
    correctAnswer: 1,
    explanation: 'Hardship distributions address immediate, heavy financial needs (medical, tuition, funeral, home purchase, eviction prevention). They\'re taxable; SECURE 2.0 added penalty-exemption for certain emergencies. They can\'t be repaid (unlike loans). Plans may limit amount to demonstrated need. The 6-month contribution suspension was eliminated.'
  },
  {
    id: 'CFP-RET-B7-023',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'IRAs',
    subtopic: 'First-Time Homebuyer',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The first-time homebuyer exception for IRA early withdrawals:',
    options: [
      'A) Allows unlimited penalty-free withdrawals',
      'B) Allows up to $10,000 lifetime penalty-free for acquiring a first home (includes someone who hasn\'t owned for 2+ years)',
      'C) Applies only to Roth IRAs',
      'D) Requires the home to be paid in full'
    ],
    correctAnswer: 1,
    explanation: '$10,000 lifetime IRA penalty exception for first home acquisition costs (acquisition, construction, closing costs). "First-time" includes anyone who hasn\'t owned a principal residence in 2 years. Spouse can also use $10,000 ($20,000 couple). SECURE 2.0 didn\'t increase this limit. Distribution is still taxable (if traditional).'
  },
  {
    id: 'CFP-RET-B7-024',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Distributions',
    subtopic: 'Annuitization',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Annuitizing retirement assets provides:',
    options: [
      'A) Maximum flexibility and liquidity',
      'B) Guaranteed lifetime income in exchange for reduced liquidity and loss of principal control',
      'C) Higher potential returns',
      'D) Tax-free income'
    ],
    correctAnswer: 1,
    explanation: 'Annuitization converts assets to guaranteed lifetime income, addressing longevity risk. Trade-offs include loss of liquidity, loss of legacy (unless period-certain/refund options), and locking in rates. Partial annuitization can create an income floor while maintaining portfolio flexibility.'
  },
  {
    id: 'CFP-RET-B7-025',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Social Security',
    subtopic: 'Voluntarily Suspending',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A person who has claimed Social Security can voluntarily suspend benefits to:',
    options: [
      'A) Receive a refund of prior benefits',
      'B) Earn delayed retirement credits of 8% per year between FRA and 70, increasing future benefits',
      'C) Continue working without earnings test',
      'D) Claim a do-over'
    ],
    correctAnswer: 1,
    explanation: 'After reaching FRA, benefits can be voluntarily suspended to earn delayed credits (8%/year until 70). Spousal/dependent benefits also suspend. This differs from the withdrawal option (available within 12 months of initial claim, requiring repayment). Suspension is useful if circumstances change after claiming.'
  }
];

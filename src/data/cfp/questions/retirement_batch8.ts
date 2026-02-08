/**
 * CFP Retirement Questions - Batch 8
 * Domain 6: Retirement Savings and Income Planning (19% of exam)
 * 25 additional questions covering retirement planning
 */

import { Question } from '../../../types';

export const CFP_RETIREMENT_BATCH8_QUESTIONS: Question[] = [
  // RET-1: Retirement Needs Analysis
  {
    id: 'CFP-RET-B8-001',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-1',
    topic: 'Retirement Planning',
    subtopic: 'Required Rate of Return',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'To calculate the required rate of return needed to meet retirement goals, a planner must consider:',
    options: [
      'A) Only historical average returns',
      'B) Current savings, future contributions, time horizon, and desired retirement income to solve for the rate needed',
      'C) Only inflation',
      'D) Stock market predictions'
    ],
    correctAnswer: 1,
    explanation: 'The required rate is solved mathematically: given current savings, planned contributions, time to retirement, and needed retirement fund, what growth rate is needed? If the required rate exceeds reasonable expectations, adjustments are needed (save more, retire later, spend less). This reality check prevents unrealistic plans.'
  },
  {
    id: 'CFP-RET-B8-002',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-1',
    topic: 'Retirement Planning',
    subtopic: 'Longevity Planning',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Planning for longevity risk means:',
    options: [
      'A) Assuming life expectancy ends at 80',
      'B) Planning for the possibility of living significantly longer than average life expectancy, potentially to 90-95+',
      'C) Only using average life expectancy',
      'D) Ignoring medical advances'
    ],
    correctAnswer: 1,
    explanation: 'Life expectancy is an average—half live longer. Planning to "average" risks running out of money. For a healthy 65-year-old couple, there\'s a 50% chance one survives to 92+. Plan for extended longevity (90-95) or use products like annuities to insure against outliving assets.'
  },
  {
    id: 'CFP-RET-B8-003',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-1',
    topic: 'Retirement Planning',
    subtopic: 'Inflation Protected Income',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Creating inflation-protected retirement income can be achieved through:',
    options: [
      'A) Fixed annuities only',
      'B) TIPS, Social Security (inflation-adjusted), equities (historically outpace inflation), and inflation-adjusted annuities',
      'C) Cash holdings only',
      'D) Cryptocurrency'
    ],
    correctAnswer: 1,
    explanation: 'Multiple sources provide inflation protection: Social Security has automatic COLAs, TIPS adjust with CPI, equities historically outpace inflation over time, and some annuities offer inflation riders. A diversified approach using multiple inflation-hedge sources is typically recommended.'
  },
  // RET-2: Employer Plans
  {
    id: 'CFP-RET-B8-004',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Employer Plans',
    subtopic: 'Defined Benefit Plans',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'In a defined benefit pension plan:',
    options: [
      'A) The employee bears investment risk',
      'B) The employer promises a specific benefit at retirement, typically based on salary and years of service',
      'C) Benefits depend on employee contributions only',
      'D) There is no vesting'
    ],
    correctAnswer: 1,
    explanation: 'DB plans promise specific benefits (e.g., 2% × years × final average salary). The employer funds and invests to meet this obligation, bearing investment risk. Employees accrue benefits by formula. These plans are declining in private sector but common in government/union settings.'
  },
  {
    id: 'CFP-RET-B8-005',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Employer Plans',
    subtopic: 'Cash Balance Plan',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A cash balance plan is a:',
    options: [
      'A) Defined contribution plan',
      'B) Defined benefit plan that expresses benefits as a hypothetical account balance with guaranteed interest credits',
      'C) Health savings account',
      'D) Type of 401(k)'
    ],
    correctAnswer: 1,
    explanation: 'Cash balance plans are technically DB (employer-funded, promised benefit) but look like DC—each employee has a hypothetical account with annual pay credits (% of salary) and interest credits (guaranteed rate). Benefits are portable as lump sums. They favor younger employees relative to traditional DB.'
  },
  {
    id: 'CFP-RET-B8-006',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Employer Plans',
    subtopic: 'PBGC Coverage',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The Pension Benefit Guaranty Corporation (PBGC):',
    options: [
      'A) Guarantees all retirement benefits',
      'B) Insures defined benefit plans, paying benefits up to limits if plans terminate with insufficient assets',
      'C) Covers 401(k) losses',
      'D) Is funded by employee contributions'
    ],
    correctAnswer: 1,
    explanation: 'PBGC is federal insurance for DB plans (funded by employer premiums). If a DB plan terminates underfunded, PBGC pays benefits up to annual limits (around $67K at 65 in 2024). It doesn\'t cover DC plans, government plans, or church plans. Single-employer and multiemployer programs have different rules.'
  },
  // RET-3: IRAs
  {
    id: 'CFP-RET-B8-007',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'IRAs',
    subtopic: 'Inherited Roth IRA',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A non-spouse beneficiary inheriting a Roth IRA (where the 5-year rule was satisfied by the original owner):',
    options: [
      'A) Must take RMDs based on their life expectancy',
      'B) Under SECURE Act, must generally empty the account within 10 years, but withdrawals are tax-free',
      'C) Cannot access the funds',
      'D) Must take everything immediately'
    ],
    correctAnswer: 1,
    explanation: 'SECURE Act\'s 10-year rule applies to Roth IRAs for most non-spouse beneficiaries. The 10-year rule is the same, but Roth distributions are tax-free (if 5-year holding was met). This allows strategic timing within the 10 years—there are no annual RMDs, so all can be taken at once or spread.'
  },
  {
    id: 'CFP-RET-B8-008',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'IRAs',
    subtopic: 'Prohibited Transactions',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Prohibited transactions in IRAs include:',
    options: [
      'A) Investing in mutual funds',
      'B) Self-dealing transactions like borrowing from the IRA, selling property to it, or using IRA assets for personal benefit',
      'C) Contributing too much',
      'D) Early withdrawal'
    ],
    correctAnswer: 1,
    explanation: 'Prohibited transactions (IRC 4975) include: borrowing from IRA, selling property to it, using IRA assets as loan security, or receiving compensation from IRA investments. Disqualified persons (owner, family, fiduciaries) cannot engage in these. Penalty is severe: entire IRA becomes taxable.'
  },
  {
    id: 'CFP-RET-B8-009',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'IRAs',
    subtopic: 'Excess Contributions',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Excess IRA contributions that are not corrected:',
    options: [
      'A) Are simply forfeited',
      'B) Are subject to a 6% excise tax each year until corrected',
      'C) Are refunded automatically',
      'D) Have no consequences'
    ],
    correctAnswer: 1,
    explanation: 'Excess contributions incur 6% penalty annually until corrected. Can be corrected by: withdrawing excess plus earnings by tax deadline (including extensions), applying excess to following year (if under limit), or withdrawing in subsequent years when contributions are below limit.'
  },
  // RET-4: Distribution Planning
  {
    id: 'CFP-RET-B8-010',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Distributions',
    subtopic: 'Qualified Longevity Annuity Contract',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A Qualified Longevity Annuity Contract (QLAC) in a retirement plan:',
    options: [
      'A) Must begin payments immediately',
      'B) Defers income to as late as age 85, providing longevity insurance while being excluded from RMD calculations',
      'C) Cannot exceed $50,000',
      'D) Is available only in Roth accounts'
    ],
    correctAnswer: 1,
    explanation: 'QLACs allow up to $200,000 (SECURE 2.0 increased limit) to be used for deferred annuities starting by age 85. The QLAC amount is excluded from RMD calculations, reducing required distributions. This provides pure longevity insurance—if you die before payments start, benefits are limited (often to spouse or return of premium).'
  },
  {
    id: 'CFP-RET-B8-011',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Distributions',
    subtopic: 'NUA Strategy',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The Net Unrealized Appreciation (NUA) strategy for employer stock in a 401(k):',
    options: [
      'A) Applies to all investments',
      'B) Allows distributing employer stock in-kind, paying ordinary tax on cost basis only, with NUA taxed at capital gains rates when sold',
      'C) Is only beneficial for small amounts',
      'D) Requires Roth conversion'
    ],
    correctAnswer: 1,
    explanation: 'NUA strategy: instead of rolling employer stock to IRA, distribute in-kind to taxable account. Ordinary income tax applies only to cost basis; the appreciation (NUA) is taxed at long-term capital gains rates when sold. This works best with large NUA (low basis, high current value) and lower capital gains rates.'
  },
  {
    id: 'CFP-RET-B8-012',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Distributions',
    subtopic: 'Stretch Period',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'For most non-spouse beneficiaries of IRAs after SECURE Act:',
    options: [
      'A) Stretch distributions continue based on life expectancy',
      'B) The account must be fully distributed within 10 years of the owner\'s death',
      'C) Immediate lump sum is required',
      'D) Five-year rule always applies'
    ],
    correctAnswer: 1,
    explanation: 'SECURE Act (2019) eliminated life-expectancy stretch for most non-spouse beneficiaries—10-year rule applies. Exceptions (eligible designated beneficiaries): surviving spouses, minor children (until majority), disabled/chronically ill individuals, and beneficiaries not more than 10 years younger than the deceased.'
  },
  // RET-5: Social Security
  {
    id: 'CFP-RET-B8-013',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Social Security',
    subtopic: 'Disability Benefits',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Social Security Disability Insurance (SSDI) provides:',
    options: [
      'A) The same benefits regardless of work history',
      'B) Benefits to disabled workers who have sufficient work credits, based on their earnings record',
      'C) Short-term disability coverage',
      'D) Needs-based benefits only'
    ],
    correctAnswer: 1,
    explanation: 'SSDI is social insurance (not need-based) for workers with enough credits who become disabled. Disability definition is strict: unable to perform substantial gainful activity for 12+ months or terminal. Benefits based on earnings record (like retirement). After 24 months of SSDI, Medicare eligibility begins.'
  },
  {
    id: 'CFP-RET-B8-014',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Social Security',
    subtopic: 'Claiming While Working',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'If claiming Social Security before Full Retirement Age while still working:',
    options: [
      'A) All earnings are exempt',
      'B) Benefits may be reduced if earnings exceed annual limits, but those reductions are restored later',
      'C) Benefits are permanently reduced',
      'D) Working is prohibited'
    ],
    correctAnswer: 1,
    explanation: 'The retirement earnings test (before FRA) reduces benefits—$1 per $2 over limit (around $22K). In FRA year, reduction is $1 per $3 over higher limit. At FRA, no reduction. Importantly, reduced benefits aren\'t lost—they\'re restored through higher benefits after FRA. After FRA, earnings don\'t affect benefits.'
  },
  {
    id: 'CFP-RET-B8-015',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Social Security',
    subtopic: 'Windfall Elimination Provision',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The Windfall Elimination Provision (WEP) affects:',
    options: [
      'A) All Social Security recipients',
      'B) Workers with pensions from non-covered employment (like some government jobs), reducing their Social Security benefits',
      'C) Only high earners',
      'D) Medicare benefits'
    ],
    correctAnswer: 1,
    explanation: 'WEP reduces Social Security for those with pensions from work not covered by Social Security (federal pre-1984, some state/local, foreign employers). The benefit formula\'s first tier is reduced—sometimes substantially. "Substantial coverage" (30+ years of covered work) phases out WEP.'
  },
  // Additional Topics
  {
    id: 'CFP-RET-B8-016',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-1',
    topic: 'Retirement Planning',
    subtopic: 'Retirement Spending Phases',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Retirement spending research suggests:',
    options: [
      'A) Spending remains constant throughout retirement',
      'B) Spending often follows phases: active early retirement, slower middle years, and potentially higher healthcare costs late',
      'C) Only essential expenses matter',
      'D) Spending always increases with inflation'
    ],
    correctAnswer: 1,
    explanation: 'The "retirement spending smile" shows: higher discretionary spending in early "go-go" years (travel, activities), reduced spending in "slow-go" years (less activity), and potential increase in "no-go" years (healthcare/long-term care). This non-linear pattern affects planning assumptions.'
  },
  {
    id: 'CFP-RET-B8-017',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Employer Plans',
    subtopic: 'Stock Bonus Plan',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A stock bonus plan:',
    options: [
      'A) Is a defined benefit plan',
      'B) Is similar to a profit-sharing plan but must distribute benefits in employer stock (though cash payments for fractional shares allowed)',
      'C) Cannot own employer stock',
      'D) Is the same as an ESOP'
    ],
    correctAnswer: 1,
    explanation: 'Stock bonus plans are DC plans distributing employer stock. They\'re related to ESOPs but without all ESOP rules (like put option, diversification). Benefits vary with employer contribution and stock performance. They align employee and employer interests but concentrate risk. Diversification is important after receiving distributions.'
  },
  {
    id: 'CFP-RET-B8-018',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'IRAs',
    subtopic: 'IRA Aggregation',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The IRA aggregation rule means:',
    options: [
      'A) All IRAs must be at one custodian',
      'B) For tax purposes, all traditional IRAs are treated as one, affecting Roth conversion taxation based on total pre-tax IRA balances',
      'C) Roth and traditional IRAs are combined',
      'D) Only affects RMDs'
    ],
    correctAnswer: 1,
    explanation: 'All traditional IRAs (including SEP and SIMPLE) are treated as one for determining the pro-rata tax on conversions or non-deductible withdrawals. If you have any pre-tax IRA money, you can\'t convert just after-tax portions tax-free—the pro-rata rule applies. Strategies include rolling pre-tax amounts to 401(k).'
  },
  {
    id: 'CFP-RET-B8-019',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Distributions',
    subtopic: 'Qualified Charitable Distribution',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A Qualified Charitable Distribution (QCD) allows IRA owners age 70½+:',
    options: [
      'A) Unlimited charitable deductions',
      'B) To transfer up to $105,000 annually directly to charity, satisfying RMDs without inclusion in taxable income',
      'C) Charitable deductions from Roth IRAs',
      'D) Gifts to private foundations'
    ],
    correctAnswer: 1,
    explanation: 'QCDs transfer IRA funds directly to charity (not donor-advised funds or private foundations). They satisfy RMDs without increasing AGI—beneficial for those not itemizing or subject to phase-outs. 2024 limit is $105,000 (indexed). SECURE 2.0 added one-time $53,000 gift to charitable trusts/annuities.'
  },
  {
    id: 'CFP-RET-B8-020',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Social Security',
    subtopic: 'Maximum Family Benefit',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The Maximum Family Benefit limits:',
    options: [
      'A) Only spousal benefits',
      'B) Total benefits payable on one worker\'s record when multiple beneficiaries (spouse, children) are entitled',
      'C) Individual benefits only',
      'D) Retirement benefits but not disability'
    ],
    correctAnswer: 1,
    explanation: 'When multiple people receive benefits on one worker\'s record (spouse, children, ex-spouse doesn\'t reduce), the family maximum applies—typically 150-180% of PIA for retirement, 85-150% for disability. Benefits are proportionally reduced to stay within limits. The ex-spouse\'s benefit doesn\'t count toward family maximum.'
  },
  {
    id: 'CFP-RET-B8-021',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-1',
    topic: 'Retirement Planning',
    subtopic: 'Tax-Efficient Withdrawal Order',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A general strategy for tax-efficient withdrawals in retirement is to withdraw from:',
    options: [
      'A) Tax-deferred accounts first always',
      'B) Taxable accounts first, then tax-deferred, then Roth—though flexibility is needed based on brackets and circumstances',
      'C) Roth accounts first',
      'D) Only one account type'
    ],
    correctAnswer: 1,
    explanation: 'The "traditional" order: taxable (often lowest tax cost, preserves tax-deferred growth), then tax-deferred (ordinary income), then Roth (tax-free). But sophisticated strategies consider filling lower tax brackets, Roth conversion opportunities, and ACA subsidies. There\'s no one-size-fits-all sequence.'
  },
  {
    id: 'CFP-RET-B8-022',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Employer Plans',
    subtopic: 'Age 50 Catch-Up',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Catch-up contributions for 401(k) plans allow participants age 50 and older to:',
    options: [
      'A) Make only regular contributions',
      'B) Contribute an additional amount above the regular limit ($7,500 in 2024; SECURE 2.0 increases for ages 60-63)',
      'C) Catch up only to employer matches',
      'D) Convert to Roth automatically'
    ],
    correctAnswer: 1,
    explanation: 'Age-50+ can contribute extra: $7,500 for 401(k)/403(b) in 2024. SECURE 2.0 adds higher catch-up for ages 60-63 starting 2025. IRA catch-up is $1,000. This allows accelerated saving for those behind, those with higher income later in career, or those who simply can save more as kids leave home.'
  },
  {
    id: 'CFP-RET-B8-023',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'IRAs',
    subtopic: 'SIMPLE IRA Limits',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'SIMPLE IRA employee contribution limits in 2024 are:',
    options: [
      'A) Same as 401(k) limits',
      'B) $16,000 with $3,500 catch-up for age 50+, lower than 401(k) limits',
      'C) $7,000 like traditional IRAs',
      'D) Unlimited'
    ],
    correctAnswer: 1,
    explanation: 'SIMPLE IRAs have lower limits than 401(k)s: $16,000 employee deferral in 2024 (vs $23,000 for 401(k)), $3,500 catch-up (vs $7,500). Employer must match 1-3% or provide 2% non-elective. They\'re simpler to administer but have lower contribution potential for higher earners.'
  },
  {
    id: 'CFP-RET-B8-024',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Distributions',
    subtopic: 'RMD Aggregation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'For RMD purposes, traditional IRAs:',
    options: [
      'A) Must each satisfy their own RMD',
      'B) Can have RMDs calculated separately but taken from any traditional IRA(s)',
      'C) Must be consolidated into one account',
      'D) Follow the same rules as 401(k)s'
    ],
    correctAnswer: 1,
    explanation: 'Calculate RMD for each IRA separately, but the total can be withdrawn from any one or combination. This allows keeping accounts with better investments/terms while satisfying RMDs from others. 401(k)s differ: each 401(k) must satisfy its own RMD (no aggregation across employer plans).'
  },
  {
    id: 'CFP-RET-B8-025',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Social Security',
    subtopic: 'Retroactive Benefits',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Social Security retroactive benefits (back-pay for months before application) are:',
    options: [
      'A) Available for unlimited past months',
      'B) Limited to 6 months of retroactive benefits and cannot go back before Full Retirement Age',
      'C) Only for disabled beneficiaries',
      'D) Unavailable'
    ],
    correctAnswer: 1,
    explanation: 'If you file after FRA, you can receive up to 6 months of retroactive benefits—but doing so permanently reduces your benefit (as if you claimed earlier). You can\'t get retroactive benefits for months before FRA. Consider carefully: lump sum now versus higher lifetime benefit.'
  }
];

/**
 * CFP Tax Questions - Batch 11
 * Domain 5: Tax Planning (14% of exam)
 * 25 additional questions covering tax planning topics
 */

import { Question } from '../../../types';

export const CFP_TAX_BATCH11_QUESTIONS: Question[] = [
  // TAX-1: Tax Fundamentals
  {
    id: 'CFP-TAX-B11-001',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Treasury Regulation',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Treasury Regulations are important because they:',
    options: [
      'A) Override the Internal Revenue Code',
      'B) Provide official IRS interpretation and guidance on how to apply tax code provisions',
      'C) Are only suggestions',
      'D) Apply only to corporations'
    ],
    correctAnswer: 1,
    explanation: 'Treasury Regulations: IRS interpretation of tax code. Types: legislative (given statutory authority, carry weight of law), interpretive (IRS interpretation), temporary/proposed. Published in Code of Federal Regulations (CFR). Courts generally defer to regulations. Understanding hierarchy: Code > Regulations > Revenue Rulings > Private Letter Rulings.'
  },
  {
    id: 'CFP-TAX-B11-002',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Constructive Receipt',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The constructive receipt doctrine means:',
    options: [
      'A) Income is taxed only when received in cash',
      'B) Income is taxable when available without substantial limitations, even if not actually received',
      'C) Deductions must be documented',
      'D) Payments can always be deferred'
    ],
    correctAnswer: 1,
    explanation: 'Constructive receipt: income taxable when available to taxpayer without substantial restrictions, even if not actually received. Can\'t delay tax by refusing to pick up check. Doesn\'t apply if: genuine restriction, not yet earned, contingencies. Deferred compensation plans use restrictions to avoid constructive receipt. Important for year-end planning with bonuses, sales proceeds.'
  },
  {
    id: 'CFP-TAX-B11-003',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Economic Benefit Doctrine',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The economic benefit doctrine provides that:',
    options: [
      'A) Cash method always applies',
      'B) If an employer sets aside funds in a trust for an employee with no forfeiture risk, the employee is taxed even without receipt',
      'C) Benefits are never taxable',
      'D) Constructive receipt doesn\'t apply'
    ],
    correctAnswer: 1,
    explanation: 'Economic benefit: if funds set aside for you with no substantial risk of forfeiture, you\'re taxed—even without actual receipt or access. Differs from constructive receipt (which requires availability). Applies to: funded deferred compensation, some trust arrangements. Can\'t avoid tax by just lacking current access if funds are secure. ERISA plans have specific rules.'
  },
  // TAX-2: Income
  {
    id: 'CFP-TAX-B11-004',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Income',
    subtopic: 'Phantom Income',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Phantom income occurs when:',
    options: [
      'A) Income is received in cash',
      'B) Tax is owed on income not received in cash, such as OID on bonds, partnership K-1 income, or S corp distributions',
      'C) All expenses are deductible',
      'D) Income is tax-free'
    ],
    correctAnswer: 1,
    explanation: 'Phantom income: taxable income without cash received. Examples: original issue discount accrual, partnership K-1 income exceeding distributions, cancellation of debt income, imputed interest, installment sale recognition. Creates cash flow mismatch—owe tax but no cash to pay. Planning needed for investments generating phantom income.'
  },
  {
    id: 'CFP-TAX-B11-005',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Income',
    subtopic: 'Installment Sale Reporting',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Installment sale method allows:',
    options: [
      'A) Immediate recognition of entire gain',
      'B) Spreading gain recognition over multiple years as payments are received, with each payment partly gain',
      'C) Complete tax deferral',
      'D) Only cash sales'
    ],
    correctAnswer: 1,
    explanation: 'Installment sale: recognize gain proportionally as payments received. Gross profit ratio = Gain / Selling price. Each payment: taxable gain × gross profit ratio. Benefits: spread income over lower brackets, defer tax. Depreciation recapture recognized in year of sale (not deferred). Not available for: inventory, securities (generally), dealer property. IRC Section 453.'
  },
  {
    id: 'CFP-TAX-B11-006',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Income',
    subtopic: 'Below-Market Loans',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Below-market loans between family members:',
    options: [
      'A) Have no tax consequences',
      'B) May result in imputed interest income to lender and possible gift to borrower',
      'C) Are always prohibited',
      'D) Only affect the borrower'
    ],
    correctAnswer: 1,
    explanation: 'Below-market loans: IRC §7872. If interest below AFR (Applicable Federal Rate), IRS imputes interest. Lender has interest income, borrower may have deduction (if qualified). Difference between AFR and actual rate is gift. Exceptions: loans ≤$10,000 (general); ≤$100,000 if borrower\'s investment income ≤$1,000. Affects: family loans, employer loans, shareholder loans.'
  },
  // TAX-3: Deductions
  {
    id: 'CFP-TAX-B11-007',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    topic: 'Deductions',
    subtopic: 'Section 199A Limitations',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The Section 199A QBI deduction is limited for:',
    options: [
      'A) All businesses equally',
      'B) Specified service businesses at higher income levels, and may be limited by W-2 wages and/or property',
      'C) Only C corporations',
      'D) Real estate only'
    ],
    correctAnswer: 1,
    explanation: 'QBI deduction limits: above threshold income, SSTB (law, health, consulting, etc.) phase out entirely. Non-SSTB: limited to greater of 50% of W-2 wages OR 25% of wages + 2.5% of UBIA (property). Below threshold: full 20% deduction. Thresholds: MFJ ~$340K (2024). Complex calculations—planning around thresholds, W-2 vs contractor decisions.'
  },
  {
    id: 'CFP-TAX-B11-008',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    topic: 'Deductions',
    subtopic: 'Hobby Loss Rules',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'IRS hobby loss rules:',
    options: [
      'A) Allow deduction of all hobby expenses',
      'B) Limit deductions to hobby income if activity lacks profit motive, denying excess losses against other income',
      'C) Only apply to gambling',
      'D) Allow losses for 3 of 5 years'
    ],
    correctAnswer: 1,
    explanation: 'Hobby vs. business: IRC §183. If no profit motive, expenses limited to income (no excess loss). 9 factors considered: profit intent, expertise, time/effort, asset appreciation potential, prior success, history of income/losses, occasional profits, financial status, personal pleasure. Presumption of profit motive if 3 of 5 years profitable (2 of 7 for horses).'
  },
  {
    id: 'CFP-TAX-B11-009',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    topic: 'Deductions',
    subtopic: 'Alimony',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'For divorce agreements executed after December 31, 2018, alimony is:',
    options: [
      'A) Deductible by payer and income to recipient',
      'B) Neither deductible by payer nor taxable to recipient',
      'C) Partially taxable',
      'D) Reported on Form 1099'
    ],
    correctAnswer: 1,
    explanation: 'TCJA change: divorce agreements after 12/31/2018—alimony not deductible by payer, not income to recipient. Before 2019: deductible/taxable. Pre-2019 agreements: old rules unless modified and new rules elected. Child support: never deductible/taxable. Property settlements: no tax consequence at transfer. Planning implications for divorce negotiations.'
  },
  // TAX-4: Credits
  {
    id: 'CFP-TAX-B11-010',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-4',
    topic: 'Tax Credits',
    subtopic: 'Clean Vehicle Credit',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The federal clean vehicle credit for new electric vehicles:',
    options: [
      'A) Has no income limits',
      'B) Is up to $7,500, subject to income limits, vehicle price caps, and manufacturing requirements',
      'C) Applies to any electric vehicle',
      'D) Is fully refundable'
    ],
    correctAnswer: 1,
    explanation: 'Clean vehicle credit (IRC §30D): up to $7,500 for new EVs. Requirements: final assembly in North America, battery mineral/component sourcing requirements, income limits (MFJ: $300K MAGI), price caps ($55K cars, $80K trucks/SUVs). Can transfer to dealer at sale. Used EV credit also available (up to $4,000). Credits change frequently—verify current rules.'
  },
  {
    id: 'CFP-TAX-B11-011',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-4',
    topic: 'Tax Credits',
    subtopic: 'Premium Tax Credit',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The Premium Tax Credit for health insurance:',
    options: [
      'A) Is available regardless of income',
      'B) Helps pay for ACA marketplace coverage, based on income, and is reconciled on the tax return',
      'C) Only applies to Medicaid',
      'D) Has no employer coverage test'
    ],
    correctAnswer: 1,
    explanation: 'Premium Tax Credit: subsidizes ACA marketplace insurance. Advance payments go directly to insurer. Income-based: historically 100-400% FPL (expanded under recent legislation). Reconciled on tax return—if income higher, repay excess; lower, get additional credit. Must use marketplace, can\'t have affordable employer coverage. Cliff effects at income thresholds—planning important.'
  },
  {
    id: 'CFP-TAX-B11-012',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-4',
    topic: 'Tax Credits',
    subtopic: 'Work Opportunity Credit',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The Work Opportunity Tax Credit is:',
    options: [
      'A) A personal credit for employees',
      'B) An employer credit for hiring individuals from targeted groups facing employment barriers',
      'C) Available to all employers automatically',
      'D) Only for minimum wage workers'
    ],
    correctAnswer: 1,
    explanation: 'WOTC: employer credit for hiring targeted groups. Groups: veterans, ex-felons, SNAP recipients, long-term unemployed, designated community residents, vocational rehab referrals, SSI recipients. Credit: typically 40% of first-year wages (25% if under 400 hours). Must pre-certify. Business credit—can reduce tax liability. Often overlooked by employers.'
  },
  // TAX-5: Planning Strategies
  {
    id: 'CFP-TAX-B11-013',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-5',
    topic: 'Tax Planning',
    subtopic: 'Gifting Strategies',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Gifting appreciated securities instead of cash for charitable donations:',
    options: [
      'A) Has no tax advantage',
      'B) Provides a deduction for fair market value and avoids recognizing the capital gain',
      'C) Creates a capital gain',
      'D) Only works for short-term holdings'
    ],
    correctAnswer: 1,
    explanation: 'Appreciated securities to charity: deduct FMV (if held >1 year), avoid recognizing capital gain. Double benefit: deduction + no tax on gain. More tax-efficient than selling, paying tax, donating cash. Must be long-term holding (>1 year). Charity must be qualified public charity (not private foundation for full FMV). One of the best charitable giving strategies.'
  },
  {
    id: 'CFP-TAX-B11-014',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-5',
    topic: 'Tax Planning',
    subtopic: 'Bracket Management',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Filling up lower tax brackets in a given year may be accomplished by:',
    options: [
      'A) Deferring all income',
      'B) Roth conversions, harvesting capital gains, or accelerating ordinary income when in lower bracket',
      'C) Only reducing income',
      'D) Avoiding all investment income'
    ],
    correctAnswer: 1,
    explanation: 'Bracket filling: intentionally recognize income to fill lower brackets. Strategies: Roth conversions (convert enough to top of current bracket), harvest capital gains at 0% rate, accelerate income in low years. Especially valuable: retirement transition years, sabbaticals, early retirement, business down years. Balance: current tax vs. future tax rate expectations.'
  },
  {
    id: 'CFP-TAX-B11-015',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-5',
    topic: 'Tax Planning',
    subtopic: 'Estimated Tax Payments',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Estimated tax payments are required to avoid penalties when:',
    options: [
      'A) All income is from wages',
      'B) Tax not withheld during the year exceeds $1,000 and safe harbor thresholds aren\'t met',
      'C) Filing jointly',
      'D) Income is under $100,000'
    ],
    correctAnswer: 1,
    explanation: 'Estimated taxes: required if expect to owe ≥$1,000 after withholding. Safe harbors: pay 90% of current year tax OR 100%/110% of prior year tax (110% if AGI >$150K). Due quarterly: 4/15, 6/15, 9/15, 1/15. Sources generating estimates: self-employment, investments, retirement distributions. Can also increase W-4 withholding. Penalties for underpayment.'
  },
  // Additional Topics
  {
    id: 'CFP-TAX-B11-016',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Statute of Limitations',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The general statute of limitations for IRS audit is:',
    options: [
      'A) 1 year from filing',
      'B) 3 years from filing or due date, extended to 6 years for substantial understatement',
      'C) 10 years always',
      'D) No limit'
    ],
    correctAnswer: 1,
    explanation: 'Statute of limitations: general = 3 years from later of filing or due date. Extended: 6 years if >25% gross income omitted. No limit: fraud, failure to file. Collection: 10 years from assessment. Keep records at least 3-6 years. Fraud starts the clock over. Amended returns don\'t typically extend. Understanding statute affects record retention planning.'
  },
  {
    id: 'CFP-TAX-B11-017',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Income',
    subtopic: 'Cryptocurrency Taxation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Cryptocurrency is treated for tax purposes as:',
    options: [
      'A) Currency',
      'B) Property, with capital gains/losses on disposition and ordinary income on mining or staking rewards',
      'C) Completely tax-free',
      'D) Only taxable when converted to cash'
    ],
    correctAnswer: 1,
    explanation: 'Crypto = property per IRS Notice 2014-21. Each sale/exchange is disposition—gain/loss calculated. Mining/staking rewards: ordinary income when received. Like-kind exchange doesn\'t apply. Cost basis tracking important. Information reporting expanding—brokers issuing 1099s. Airdrops, hard forks: taxable events. Complex rules—many taxpayers underreport.'
  },
  {
    id: 'CFP-TAX-B11-018',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    topic: 'Deductions',
    subtopic: 'Medical Expense Threshold',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Medical expenses are deductible as itemized deductions to the extent they exceed:',
    options: [
      'A) 2% of AGI',
      'B) 7.5% of AGI, and only if total itemized deductions exceed the standard deduction',
      'C) 10% of AGI',
      'D) No threshold'
    ],
    correctAnswer: 1,
    explanation: 'Medical expense deduction: amounts exceeding 7.5% of AGI. Only if itemizing (total deductions > standard deduction). Qualified expenses: medical/dental care, insurance premiums, transportation for care, certain long-term care. Planning: bunch expenses in high-expense year, accelerate elective procedures if near threshold. Often only useful in major expense years.'
  },
  {
    id: 'CFP-TAX-B11-019',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-4',
    topic: 'Tax Credits',
    subtopic: 'Residential Energy Credit',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'The Residential Clean Energy Credit allows:',
    options: [
      'A) A deduction for energy improvements',
      'B) A credit of 30% of costs for solar, wind, geothermal, and battery storage systems installed on residences',
      'C) Only 10% of costs',
      'D) Credits only for new construction'
    ],
    correctAnswer: 1,
    explanation: 'Residential Clean Energy Credit (IRA enhanced): 30% of costs through 2032, then phasing down. Covers: solar electric, solar water heating, fuel cells, small wind, geothermal, battery storage (3+ kWh). No dollar cap. Primary and second homes. Carry forward if exceeds liability. Separate ENERGY STAR credit for efficiency improvements (insulation, windows).'
  },
  {
    id: 'CFP-TAX-B11-020',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-5',
    topic: 'Tax Planning',
    subtopic: 'S Corporation Reasonable Compensation',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'S corporation shareholder-employees must receive reasonable compensation because:',
    options: [
      'A) There\'s no requirement',
      'B) The IRS can reclassify distributions as wages if salary is unreasonably low to avoid employment taxes',
      'C) All income must be salary',
      'D) Distributions are taxed higher'
    ],
    correctAnswer: 1,
    explanation: 'Reasonable compensation: S corp shareholder-employees can\'t minimize salary to avoid FICA. IRS watches for this. Salary: subject to FICA/Medicare. Distributions: no employment tax (but still income tax). Balance: enough salary to be reasonable for services performed. Factors: duties, comparable compensation, time spent. Case law provides guidance. Common audit issue.'
  },
  {
    id: 'CFP-TAX-B11-021',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Tax Home',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A taxpayer\'s tax home for travel expense purposes is:',
    options: [
      'A) Where they live',
      'B) Their regular place of business or post of duty, not necessarily where their family resides',
      'C) Where they want it to be',
      'D) Their vacation home'
    ],
    correctAnswer: 1,
    explanation: 'Tax home: regular place of business (primary), not personal residence. Determines if travel is "away from home" for deduction purposes. Travel expenses deductible when away from tax home overnight. If multiple regular places: where most work. If no regular place: residence. Matters for: travel deductions, per diem, employee benefits. Common misconception it\'s home address.'
  },
  {
    id: 'CFP-TAX-B11-022',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Income',
    subtopic: 'Kiddie Tax',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The kiddie tax applies to:',
    options: [
      'A) All income of children',
      'B) Unearned income above threshold for children under 19 (or under 24 if students), taxed at parents\' marginal rate',
      'C) Earned income only',
      'D) Children over age 25'
    ],
    correctAnswer: 1,
    explanation: 'Kiddie tax (IRC §1(g)): unearned (investment) income of children taxed at parents\' marginal rate if exceeds threshold (~$2,500 for 2024). Applies: under 19, or under 24 if full-time student (with earned income < half of support). Prevents: shifting investment income to children\'s lower brackets. Earned income taxed at child\'s rate. Plan around: Roth for kids, 529s.'
  },
  {
    id: 'CFP-TAX-B11-023',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    topic: 'Deductions',
    subtopic: 'Business Interest Limitation',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Under Section 163(j), business interest expense is limited to:',
    options: [
      'A) No limit',
      'B) 30% of adjusted taxable income plus floor plan financing for most businesses above $25 million gross receipts',
      'C) 50% of income',
      'D) Only for C corporations'
    ],
    correctAnswer: 1,
    explanation: 'Section 163(j): limits business interest deduction to 30% of adjusted taxable income (ATI). Small business exception: average gross receipts ≤$25M. Real estate can elect out (but must use ADS depreciation). Disallowed interest carries forward indefinitely. Significant for highly leveraged businesses. Complex interaction with other provisions.'
  },
  {
    id: 'CFP-TAX-B11-024',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-4',
    topic: 'Tax Credits',
    subtopic: 'Adoption Credit',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The adoption credit provides:',
    options: [
      'A) Unlimited credit',
      'B) A credit for qualified adoption expenses per child, with higher limit and dollar-for-dollar credit for special needs adoptions',
      'C) A deduction only',
      'D) Income to adoptive parents'
    ],
    correctAnswer: 1,
    explanation: 'Adoption credit: up to ~$16,000+ (indexed) of qualified expenses per child. Expenses: legal, court costs, travel, agency fees. Special needs: get full credit regardless of actual expenses. Income phase-out for higher earners. Domestic: credit in year finalized or paid. Foreign: credit when finalized. Employer exclusion also available for employer-paid adoption assistance.'
  },
  {
    id: 'CFP-TAX-B11-025',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-5',
    topic: 'Tax Planning',
    subtopic: 'State Tax Planning',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'State income tax planning considerations include:',
    options: [
      'A) Only federal matters',
      'B) Differences in income sourcing rules, residency definitions, credits, and deductions that vary significantly by state',
      'C) Identical rules to federal',
      'D) No planning opportunities'
    ],
    correctAnswer: 1,
    explanation: 'State tax differences: income tax rates (0-13%+), what\'s taxed (some exempt retirement income), residency rules (domicile vs. statutory), credits available. Multi-state issues: allocation, apportionment, reciprocity. Planning: state for retirement, work-from-home implications, S corp vs C corp state taxation. $10K SALT cap makes state tax more costly. Know client\'s state.'
  }
];

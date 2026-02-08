/**
 * CFP Tax Questions - Batch 7
 * Domain 5: Tax Planning (14% of exam)
 * 25 additional questions covering advanced tax topics
 */

import { Question } from '../../../types';

export const CFP_TAX_BATCH7_QUESTIONS: Question[] = [
  // TAX-1: Advanced Income Types
  {
    id: 'CFP-TAX-B7-001',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Constructive Receipt',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The doctrine of constructive receipt means:',
    options: [
      'A) Income is taxed only when physically received',
      'B) Income is taxable when available to the taxpayer without substantial restrictions, even if not yet received',
      'C) Income can be deferred indefinitely',
      'D) Only cash income is taxable'
    ],
    correctAnswer: 1,
    explanation: 'Constructive receipt taxes income when the taxpayer has an unrestricted right to receive it, regardless of actual receipt. Deferral elections (like 401(k) contributions) must occur before the income is earned. A year-end bonus available but not cashed until January is still taxable in the prior year.'
  },
  {
    id: 'CFP-TAX-B7-002',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Original Issue Discount',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Original Issue Discount (OID) on a bond:',
    options: [
      'A) Is taxed only at maturity',
      'B) Is accrued and taxed annually as interest income, even though not received until maturity',
      'C) Is tax-exempt',
      'D) Creates a capital gain'
    ],
    correctAnswer: 1,
    explanation: 'OID is the difference between a bond\'s issue price and face value when issued below par. For taxable bonds, OID is treated as interest income accruing over the bond\'s life (phantom income). This creates tax on unreceived income. The basis increases by accrued OID. Tax-exempt OID on municipal bonds is not currently taxable.'
  },
  {
    id: 'CFP-TAX-B7-003',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Section 121 Exclusion',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The Section 121 home sale exclusion requires:',
    options: [
      'A) Living in the home for 5 continuous years',
      'B) Ownership and use as primary residence for 2 of the prior 5 years (not necessarily continuous)',
      'C) Never having claimed the exclusion before',
      'D) Sale to a non-related party only'
    ],
    correctAnswer: 1,
    explanation: 'Section 121 excludes up to $250,000 ($500,000 MFJ) of gain on home sale when the ownership and use tests are met: owned and lived in as primary residence for 2 of the 5 years preceding sale. The 2 years need not be continuous. Generally can\'t have used the exclusion in the prior 2 years.'
  },
  // TAX-2: Advanced Deduction Topics
  {
    id: 'CFP-TAX-B7-004',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Deductions and Credits',
    subtopic: 'Medical Expenses',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Medical expenses are deductible to the extent they exceed:',
    options: [
      'A) $1,000',
      'B) 7.5% of AGI',
      'C) 10% of AGI',
      'D) 2% of AGI'
    ],
    correctAnswer: 1,
    explanation: 'Unreimbursed medical expenses exceeding 7.5% of AGI are deductible as an itemized deduction. Qualifying expenses include doctors, hospitals, prescriptions, dental, vision, insurance premiums (not pre-tax), long-term care (limited), travel for medical care (at standard mileage rate), and medically necessary equipment.'
  },
  {
    id: 'CFP-TAX-B7-005',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Deductions and Credits',
    subtopic: 'Investment Interest',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Investment interest expense is deductible up to:',
    options: [
      'A) Unlimited amounts',
      'B) The amount of net investment income, with excess carried forward',
      'C) $10,000 annually',
      'D) Only when margin interest is incurred'
    ],
    correctAnswer: 1,
    explanation: 'Investment interest (like margin interest) is deductible against net investment income (interest, non-qualified dividends, net short-term gains). Excess carries forward indefinitely. Taxpayers may elect to include qualified dividends and LTCG in investment income (making them ordinary for tax purposes) to deduct more interest.'
  },
  {
    id: 'CFP-TAX-B7-006',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Deductions and Credits',
    subtopic: 'Business Meal Deduction',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Business meals are generally deductible at:',
    options: [
      'A) 100%',
      'B) 50% if there is a legitimate business purpose and the expense is not lavish',
      'C) 25%',
      'D) Not deductible at all'
    ],
    correctAnswer: 1,
    explanation: 'Business meals are 50% deductible when there\'s a legitimate business purpose, the taxpayer or employee is present, and the expense isn\'t lavish. Entertainment expenses are generally not deductible. During COVID (2021-2022), restaurant meals were 100% deductible; this reverted to 50%.'
  },
  // TAX-3: Advanced Tax Strategies
  {
    id: 'CFP-TAX-B7-007',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    topic: 'Tax Strategies',
    subtopic: 'Income Shifting',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Effective income shifting to family members requires:',
    options: [
      'A) Simply giving income to lower-bracket family members',
      'B) Transferring income-producing property (not just income) and avoiding the kiddie tax and assignment of income doctrine',
      'C) Joint tax returns',
      'D) All family members to have the same tax rate'
    ],
    correctAnswer: 1,
    explanation: 'Income shifting requires transferring the income-producing property, not just the income (assignment of income doctrine). The kiddie tax limits shifting unearned income to children under 19 (24 if students). Gifts to adults in lower brackets can work, but gift/estate tax implications must be considered.'
  },
  {
    id: 'CFP-TAX-B7-008',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    topic: 'Tax Strategies',
    subtopic: 'Deferred Compensation',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Non-qualified deferred compensation (NQDC) plans:',
    options: [
      'A) Are tax-deductible for the employer immediately',
      'B) Defer taxation to the employee until payment, but are unsecured general claims of the employer',
      'C) Have no FICA taxes',
      'D) Are identical to 401(k) plans'
    ],
    correctAnswer: 1,
    explanation: 'NQDC defers income taxes until payment (no dollar limit). However, amounts are unsecured creditor claims, meaning employees bear employer bankruptcy risk. FICA applies when vested (even if unpaid). Employers can\'t deduct until employees recognize income. Section 409A governs deferral elections and distributions.'
  },
  {
    id: 'CFP-TAX-B7-009',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    topic: 'Tax Strategies',
    subtopic: 'In-Kind Distributions',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Taking an in-kind distribution of appreciated stock from a taxable brokerage account:',
    options: [
      'A) Triggers immediate capital gains',
      'B) Is a non-taxable event until the stock is sold, with the original basis carrying over',
      'C) Converts gains to ordinary income',
      'D) Is prohibited by the IRS'
    ],
    correctAnswer: 1,
    explanation: 'Moving appreciated stock from a brokerage account to another account in the same owner\'s name is not a taxable event. The basis carries over. This allows gifting appreciated stock (recipient takes donor\'s basis) or moving to different custodians without triggering gains. Selling would trigger the gain.'
  },
  // TAX-4: More Business Taxation
  {
    id: 'CFP-TAX-B7-010',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-4',
    topic: 'Business Taxation',
    subtopic: 'Pass-Through Entities',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Pass-through entities (partnerships, S corps, LLCs) are characterized by:',
    options: [
      'A) Entity-level taxation',
      'B) Income/losses passing through to owners\' personal returns, avoiding double taxation',
      'C) Unlimited shareholders',
      'D) No K-1 reporting requirements'
    ],
    correctAnswer: 1,
    explanation: 'Pass-through entities don\'t pay federal income tax at the entity level. Income, deductions, and credits flow through to owners\' personal returns via Schedule K-1. This avoids double taxation (unlike C corps) but creates complexity with distribution rules, basis tracking, and the QBI deduction.'
  },
  {
    id: 'CFP-TAX-B7-011',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-4',
    topic: 'Business Taxation',
    subtopic: 'Section 1244 Stock',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Section 1244 small business stock allows losses to be deducted as:',
    options: [
      'A) Capital losses only',
      'B) Ordinary losses (up to $50,000 single/$100,000 MFJ) rather than capital',
      'C) Business expenses',
      'D) Charitable deductions'
    ],
    correctAnswer: 1,
    explanation: 'Section 1244 allows individual shareholders in qualifying small businesses to treat losses on stock as ordinary losses (deductible against ordinary income) up to $50,000 ($100,000 MFJ) annually. Excess is capital loss. Gains are still capital. The corporation must meet capitalization and active business requirements.'
  },
  {
    id: 'CFP-TAX-B7-012',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-4',
    topic: 'Business Taxation',
    subtopic: 'Depreciation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The Modified Accelerated Cost Recovery System (MACRS) for depreciation:',
    options: [
      'A) Uses straight-line depreciation only',
      'B) Assigns assets to classes with predetermined recovery periods and methods',
      'C) Allows unlimited depreciation in year one',
      'D) Only applies to real estate'
    ],
    correctAnswer: 1,
    explanation: 'MACRS assigns business assets to property classes (3, 5, 7, 15, 27.5, 39 years) with specified depreciation methods and conventions. Personal property typically uses 200% declining balance; real estate uses straight-line. Section 179 and bonus depreciation allow faster write-offs within limits.'
  },
  // TAX-1: More Fundamental Concepts
  {
    id: 'CFP-TAX-B7-013',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Statute of Limitations',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The IRS generally has how long to audit a tax return?',
    options: [
      'A) 1 year',
      'B) 3 years from filing (6 years for substantial understatement)',
      'C) 10 years',
      'D) No limit'
    ],
    correctAnswer: 1,
    explanation: 'The standard statute of limitations is 3 years from filing or due date (whichever is later). It extends to 6 years if income is understated by more than 25%. No limit applies for fraud or failure to file. The IRS has 10 years to collect assessed taxes. Keeping records for 7 years is generally recommended.'
  },
  {
    id: 'CFP-TAX-B7-014',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Community Property',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'In community property states, income earned during marriage is generally:',
    options: [
      'A) Taxed to the spouse who earned it',
      'B) Split 50/50 between spouses regardless of who earned it',
      'C) Taxed only if deposited in a joint account',
      'D) Tax-exempt'
    ],
    correctAnswer: 1,
    explanation: 'In community property states (AZ, CA, ID, LA, NV, NM, TX, WA, WI), income and property acquired during marriage is owned 50/50. If filing separately, each spouse reports half of community income. This affects basis calculations, estate planning (full step-up at first death), and divorce settlements.'
  },
  {
    id: 'CFP-TAX-B7-015',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Tax Penalties',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The failure-to-pay penalty for unpaid taxes is:',
    options: [
      'A) 5% per month',
      'B) 0.5% (½%) per month up to 25% maximum',
      'C) 10% flat penalty',
      'D) No penalty if filed on time'
    ],
    correctAnswer: 1,
    explanation: 'The failure-to-pay penalty is 0.5% per month (capped at 25%) on unpaid taxes after the due date, plus interest. The failure-to-file penalty is more severe: 5% per month up to 25%. Filing on time with an extension avoids the failure-to-file penalty but not failure-to-pay. Interest runs until paid.'
  },
  // TAX-2: More Credits
  {
    id: 'CFP-TAX-B7-016',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Deductions and Credits',
    subtopic: 'R&D Tax Credit',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The Research and Development (R&D) tax credit:',
    options: [
      'A) Is available only to large corporations',
      'B) Provides credits for qualified research activities and may offset payroll tax for startups',
      'C) Requires government approval for each project',
      'D) Has been repealed'
    ],
    correctAnswer: 1,
    explanation: 'The R&D credit incentivizes research activities. Qualifying activities must meet a four-part test: technological uncertainty, process of experimentation, technological in nature, and for permitted purpose. Small businesses (under $5M revenue, ≤5 years old) can use credits against payroll tax.'
  },
  {
    id: 'CFP-TAX-B7-017',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Deductions and Credits',
    subtopic: 'Foreign Tax Credit',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The foreign tax credit:',
    options: [
      'A) Allows unlimited credits for all foreign taxes paid',
      'B) Offsets U.S. tax on foreign income, limited to avoid reducing tax on U.S. source income',
      'C) Is available only for investments in developing countries',
      'D) Replaces the need to report foreign income'
    ],
    correctAnswer: 1,
    explanation: 'The foreign tax credit reduces U.S. tax on foreign-source income, preventing double taxation. It\'s limited to U.S. tax on foreign income (can\'t offset tax on U.S. income). Excess credits carry back 1 year and forward 10 years. For small amounts in mutual funds, a simplified election may apply.'
  },
  // TAX-3: More Strategies
  {
    id: 'CFP-TAX-B7-018',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    topic: 'Tax Strategies',
    subtopic: 'Charitable Lead vs Remainder',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A charitable lead trust is generally more advantageous than a charitable remainder trust when:',
    options: [
      'A) The donor needs current income',
      'B) Interest rates are low and the donor wants to transfer assets to heirs with reduced gift/estate tax',
      'C) The donor is in a low tax bracket',
      'D) The donor wants income for life'
    ],
    correctAnswer: 1,
    explanation: 'CLTs work best when interest rates are low—the remainder to heirs is valued at a discount (since charity gets the annuity). This can "zero out" the gift if structured properly. CRTs benefit the donor with current income and partial deduction. CLTs are estate/gift reduction tools; CRTs are income with charitable intent.'
  },
  {
    id: 'CFP-TAX-B7-019',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    topic: 'Tax Strategies',
    subtopic: 'Private Foundations',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Compared to donor-advised funds, private foundations:',
    options: [
      'A) Have higher contribution limits and simpler rules',
      'B) Allow family control and perpetual legacy, but have stricter rules, excise taxes, and annual payout requirements',
      'C) Provide larger charitable deductions',
      'D) Are less expensive to establish'
    ],
    correctAnswer: 1,
    explanation: 'Private foundations allow multigenerational family control and employment. However, they face lower contribution deduction limits (30%/20% vs. 60%/30% for DAFs), 1.39% net investment income excise tax, 5% annual distribution requirement, and complex rules. DAFs are simpler; foundations suit those wanting control and family legacy.'
  },
  // TAX-4: More Business
  {
    id: 'CFP-TAX-B7-020',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-4',
    topic: 'Business Taxation',
    subtopic: 'Built-In Gains Tax',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The built-in gains (BIG) tax applies when:',
    options: [
      'A) Any S corporation sells assets',
      'B) A C corporation converts to S status and sells assets with appreciation from the C corp era within 5 years',
      'C) An S corporation makes a dividend distribution',
      'D) An S corporation has passive income'
    ],
    correctAnswer: 1,
    explanation: 'The BIG tax prevents avoidance of C corp taxes by converting to S status and immediately selling appreciated assets. It taxes gains attributable to C corp period at the corporate rate (21%) if sold within 5 years of S election. Basis is stepped-up as of conversion date. Assets acquired after the election are not subject to BIG.'
  },
  {
    id: 'CFP-TAX-B7-021',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-4',
    topic: 'Business Taxation',
    subtopic: 'Net Operating Losses',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Net operating losses (NOLs) under current law can:',
    options: [
      'A) Be carried back 2 years and forward 20 years',
      'B) Be carried forward indefinitely but limited to 80% of taxable income in the carryforward year',
      'C) Offset 100% of taxable income with no limitations',
      'D) Be carried back 5 years for all taxpayers'
    ],
    correctAnswer: 1,
    explanation: 'Post-TCJA NOLs can only carry forward (no carryback except for farming/insurance) indefinitely but are limited to 80% of taxable income in the year used. Pre-2018 NOLs follow old rules (2-year carryback, 20-year carryforward, 100% offset). Planning considers optimal year to realize income against NOLs.'
  },
  // Additional Topics
  {
    id: 'CFP-TAX-B7-022',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Treasury Stock Method',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'When an employee exercises an incentive stock option (ISO), the bargain element:',
    options: [
      'A) Is immediately taxed as ordinary income',
      'B) Creates no regular tax at exercise but is an AMT preference item',
      'C) Is tax-free permanently',
      'D) Is taxed as capital gain at exercise'
    ],
    correctAnswer: 1,
    explanation: 'ISO exercise creates no regular income tax on the bargain element if holding periods are met (2 years from grant, 1 year from exercise). However, the spread is an AMT preference item, potentially triggering AMT. Disqualifying dispositions convert the income to ordinary. NSOs are taxed at exercise as ordinary income.'
  },
  {
    id: 'CFP-TAX-B7-023',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Deductions and Credits',
    subtopic: 'Retirement Saver\'s Credit',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The Saver\'s Credit provides:',
    options: [
      'A) A credit for all retirement contributions regardless of income',
      'B) A credit of 10-50% of retirement contributions up to $2,000 ($4,000 MFJ) for low-to-moderate income taxpayers',
      'C) A refundable credit that creates a refund even with no tax liability',
      'D) Credit only for Roth IRA contributions'
    ],
    correctAnswer: 1,
    explanation: 'The Saver\'s Credit (Retirement Savings Contributions Credit) provides 10-50% credit on up to $2,000 ($4,000 MFJ) of retirement contributions for AGI below thresholds. The percentage increases as income decreases. It\'s nonrefundable (can\'t exceed tax liability). SECURE 2.0 added matching contributions for low-income savers.'
  },
  {
    id: 'CFP-TAX-B7-024',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    topic: 'Tax Strategies',
    subtopic: 'Timing of Income/Deductions',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Accelerating income and deferring deductions is appropriate when:',
    options: [
      'A) The client expects to be in a higher bracket next year',
      'B) The client expects to be in a lower bracket next year, or current low income should be "filled up"',
      'C) The client always wants to minimize current taxes',
      'D) Interest rates are rising'
    ],
    correctAnswer: 1,
    explanation: 'Accelerating income makes sense if expecting higher future rates (pay tax now at lower rate) or if current income is below bracket thresholds (Roth conversions to "fill the bracket"). Deferring deductions maximizes their value when rates increase. Mirror strategies (defer income, accelerate deductions) apply when expecting lower future rates.'
  },
  {
    id: 'CFP-TAX-B7-025',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-4',
    topic: 'Business Taxation',
    subtopic: 'Rental Real Estate Professional',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'To qualify as a real estate professional for passive activity loss purposes:',
    options: [
      'A) Simply owning rental property is sufficient',
      'B) More than 50% of personal services must be in real property trades and at least 750 hours annually',
      'C) The taxpayer must be licensed as a real estate agent',
      'D) Rental income must exceed $100,000'
    ],
    correctAnswer: 1,
    explanation: 'Real estate professional status requires: (1) more than half of personal services in real property trades or businesses, AND (2) more than 750 hours annually in real property activities. With this status, rental activities can be non-passive, allowing unlimited loss deductions against other income. Material participation tests also apply.'
  }
];

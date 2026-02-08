/**
 * CFP Tax Questions - Batch 9
 * Domain 5: Tax Planning (14% of exam)
 * 25 additional questions covering tax planning topics
 */

import { Question } from '../../../types';

export const CFP_TAX_BATCH9_QUESTIONS: Question[] = [
  // TAX-1: Income Tax Fundamentals
  {
    id: 'CFP-TAX-B9-001',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Income Tax',
    subtopic: 'Assignment of Income',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The assignment of income doctrine means that:',
    options: [
      'A) Income can be freely shifted to any taxpayer',
      'B) Income is taxed to the person who earns it or owns the income-producing property, regardless of who receives payment',
      'C) Family income is always split equally',
      'D) Employers assign income amounts'
    ],
    correctAnswer: 1,
    explanation: 'Assignment of income prevents tax avoidance through income shifting. You can\'t assign earned income to a lower-bracket family member—it\'s taxed to the earner. Property income is taxed to the owner. To shift income, you must transfer the underlying property. Lucas v. Earl and Helvering v. Horst are landmark cases.'
  },
  {
    id: 'CFP-TAX-B9-002',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Income Tax',
    subtopic: 'Community Property',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'In community property states, income earned during marriage:',
    options: [
      'A) Belongs entirely to the earner',
      'B) Is generally owned equally by both spouses regardless of who earned it',
      'C) Goes to the higher earner',
      'D) Is always taxed separately'
    ],
    correctAnswer: 1,
    explanation: 'Community property states (CA, TX, WA, etc.): earnings and property acquired during marriage are owned 50/50. This affects taxation (especially on MFS returns), estate planning (automatic 50% ownership), and divorce (equal division). Separate property (pre-marriage, inheritance, gifts) remains individually owned.'
  },
  {
    id: 'CFP-TAX-B9-003',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Income Tax',
    subtopic: 'Constructive Receipt',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Constructive receipt means income is taxable when:',
    options: [
      'A) Payment is in hand',
      'B) The taxpayer has an unrestricted right to receive it, even if not actually received',
      'C) The tax return is filed',
      'D) The employer reports it'
    ],
    correctAnswer: 1,
    explanation: 'Constructive receipt: income is taxable when available without substantial limitations, not when actually received. A year-end bonus available December 31 but not picked up until January is December income. "Substantial limitations" (risk of forfeiture, not yet earned) can defer recognition.'
  },
  // TAX-2: Deductions and Credits
  {
    id: 'CFP-TAX-B9-004',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Deductions',
    subtopic: 'Home Office Deduction',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The home office deduction for employees after TCJA:',
    options: [
      'A) Remains fully deductible',
      'B) Is eliminated for employees (2018-2025); self-employed can still deduct based on exclusive, regular business use',
      'C) Increased significantly',
      'D) Only applies to renters'
    ],
    correctAnswer: 1,
    explanation: 'TCJA eliminated the employee home office deduction through 2025 (unreimbursed employee expenses formerly under miscellaneous itemized deductions). Self-employed can still deduct using simplified method ($5/sq ft, max 300 sq ft) or actual expense proration. Space must be exclusively and regularly used for business.'
  },
  {
    id: 'CFP-TAX-B9-005',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Deductions',
    subtopic: 'Business Meals',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The general deductibility of business meals is:',
    options: [
      'A) 100% deductible',
      'B) 50% deductible when directly related to or associated with business, with documentation required',
      'C) Not deductible at all',
      'D) Only deductible for entertainment'
    ],
    correctAnswer: 1,
    explanation: 'Business meals: 50% deductible (temporary 100% for restaurant meals 2021-2022 has expired). Requirements: ordinary and necessary expense, not lavish, taxpayer or employee present, substantiation (amount, date, place, business purpose, relationship). Entertainment expenses are generally not deductible post-TCJA.'
  },
  {
    id: 'CFP-TAX-B9-006',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Credits',
    subtopic: 'Child and Dependent Care Credit',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The child and dependent care credit:',
    options: [
      'A) Is refundable for all taxpayers',
      'B) Covers care expenses enabling work, with credit rate phasing from 35% to 20% based on income, on limited expenses ($3K one/$6K two+)',
      'C) Has no income limits',
      'D) Only applies to children under 5'
    ],
    correctAnswer: 1,
    explanation: 'Credit for care enabling work: qualifying child under 13 or disabled dependent/spouse. Expenses limited to $3K (one) or $6K (two+). Credit rate: 35% for AGI ≤$15K, phasing to 20% at $43K+. Must have earned income (lower-earning spouse\'s income if married). Generally non-refundable. Coordinate with FSA to maximize benefit.'
  },
  // TAX-3: Investment Taxation
  {
    id: 'CFP-TAX-B9-007',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    topic: 'Investment Tax',
    subtopic: 'Collectibles',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Long-term capital gains on collectibles (art, coins, stamps) are taxed at:',
    options: [
      'A) 0/15/20% rates like stocks',
      'B) A maximum rate of 28%, higher than the standard long-term rates',
      'C) Ordinary income rates',
      'D) 25%'
    ],
    correctAnswer: 1,
    explanation: 'Collectibles gains: maximum 28% (vs. 0/15/20% for most LTCG). This includes art, antiques, gems, stamps, coins, precious metals, and most importantly for planning—gains on gold/precious metals ETFs holding physical metals. Some collectibles in self-directed IRAs trigger UBIT. Higher rate reduces after-tax returns.'
  },
  {
    id: 'CFP-TAX-B9-008',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    topic: 'Investment Tax',
    subtopic: 'Straddles',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Tax straddle rules apply when:',
    options: [
      'A) Investing in stocks only',
      'B) Holding offsetting positions that reduce risk, potentially limiting loss recognition and requiring interest capitalization',
      'C) Selling within 30 days',
      'D) Only for professional traders'
    ],
    correctAnswer: 1,
    explanation: 'Straddle rules prevent recognizing losses on one leg while continuing to hold offsetting gain positions. If positions substantially diminish risk (opposite market directions, same underlying), losses may be deferred, holding period suspended, and interest/carrying costs capitalized. Complex rules affect options, commodities, and some equity strategies.'
  },
  {
    id: 'CFP-TAX-B9-009',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    topic: 'Investment Tax',
    subtopic: 'Dividend Reinvestment',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Dividends automatically reinvested through a DRIP:',
    options: [
      'A) Are not taxable until shares are sold',
      'B) Are taxable in the year received, with reinvested amount becoming additional cost basis',
      'C) Reduce dividend income',
      'D) Are always tax-free'
    ],
    correctAnswer: 1,
    explanation: 'DRIP dividends are taxable when received—reinvestment doesn\'t defer tax. The dividend amount becomes cost basis in new shares. This creates phantom income (taxes without cash) in taxable accounts. Keep records of reinvested amounts for accurate basis calculation when selling. DRIPs are fine in tax-deferred accounts.'
  },
  // TAX-4: Business Taxation
  {
    id: 'CFP-TAX-B9-010',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-4',
    topic: 'Business Tax',
    subtopic: 'Section 179 Expensing',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Section 179 expensing allows:',
    options: [
      'A) Only straight-line depreciation',
      'B) Immediate deduction of qualifying property costs (up to $1.16M in 2024), limited to business income',
      'C) Unlimited expensing',
      'D) Only for corporations'
    ],
    correctAnswer: 1,
    explanation: 'Section 179: expense qualifying property (equipment, some software, qualified improvements) instead of depreciating. 2024 limit: $1,160,000, phasing out when purchases exceed $2.89M. Limited to taxable income from active business. Can be combined with bonus depreciation. Enables significant first-year deductions for capital purchases.'
  },
  {
    id: 'CFP-TAX-B9-011',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-4',
    topic: 'Business Tax',
    subtopic: 'QBI Deduction Limits',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The QBI deduction phaseout for specified service trades or businesses (SSTBs) affects:',
    options: [
      'A) All businesses equally',
      'B) Service businesses like law, accounting, and consulting, which lose the deduction as taxable income exceeds thresholds',
      'C) Only manufacturers',
      'D) Real estate exclusively'
    ],
    correctAnswer: 1,
    explanation: 'SSTBs (health, law, accounting, actuarial, performing arts, consulting, athletics, financial services, brokerage) have stricter limits. Above thresholds ($191,950 single/$383,900 MFJ in 2024), the QBI deduction phases out completely—no W-2/capital limitation helps. Non-SSTB businesses can still qualify using W-2 wages or property limits above thresholds.'
  },
  {
    id: 'CFP-TAX-B9-012',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-4',
    topic: 'Business Tax',
    subtopic: 'Reasonable Compensation',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Reasonable compensation issues arise for S corporation owner-employees because:',
    options: [
      'A) Salaries are not deductible',
      'B) Salary is subject to employment taxes while distributions are not—IRS scrutinizes inadequate salaries',
      'C) All income is wages',
      'D) S corps cannot pay dividends'
    ],
    correctAnswer: 1,
    explanation: 'S corp owners must take reasonable salary (subject to FICA) before receiving distributions (not subject to FICA). Low salary/high distribution saves payroll taxes but is audit risk. IRS examines industry norms, responsibilities, experience. The spread between reasonable salary and pure distributions represents legitimate planning; zero salary is never acceptable.'
  },
  // TAX-5: Estate and Gift Tax
  {
    id: 'CFP-TAX-B9-013',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-5',
    topic: 'Estate/Gift Tax',
    subtopic: 'Generation-Skipping Transfer Tax',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The generation-skipping transfer (GST) tax applies to:',
    options: [
      'A) All gifts to grandchildren',
      'B) Transfers to skip persons (typically grandchildren or trusts for them) above the GST exemption, at a flat 40% rate',
      'C) Only testamentary transfers',
      'D) Transfers under $100,000'
    ],
    correctAnswer: 1,
    explanation: 'GST prevents avoiding estate tax by skipping generations. Skip persons: those two or more generations below (grandchildren unless parent deceased). Three types: direct skip (outright gift), taxable termination (trust interest ends), taxable distribution (distribution from trust). 40% flat rate, with exemption equal to estate exemption ($13.61M in 2024).'
  },
  {
    id: 'CFP-TAX-B9-014',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-5',
    topic: 'Estate/Gift Tax',
    subtopic: 'Disclaimers',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A qualified disclaimer allows a beneficiary to:',
    options: [
      'A) Accept and then give away property',
      'B) Refuse an inheritance without gift tax consequences, redirecting property to the next beneficiary',
      'C) Delay taking property indefinitely',
      'D) Change the will'
    ],
    correctAnswer: 1,
    explanation: 'Qualified disclaimers (IRC 2518): beneficiary refuses property within 9 months without accepting any benefits. Property passes as if disclaimant predeceased—no gift from disclaimant. Uses: redirect to lower tax bracket/younger generation, avoid increasing disclaimant\'s estate, post-mortem estate planning. Can\'t direct where property goes.'
  },
  {
    id: 'CFP-TAX-B9-015',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-5',
    topic: 'Estate/Gift Tax',
    subtopic: 'Gift Splitting',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Gift splitting allows married couples to:',
    options: [
      'A) Avoid all gift tax',
      'B) Elect to treat a gift from one spouse as made half by each, doubling the annual exclusion available per donee',
      'C) Only give to spouses',
      'D) Reduce estate size immediately'
    ],
    correctAnswer: 1,
    explanation: 'Gift splitting (IRC 2513): with spouse consent, gifts can be treated as 50% from each spouse. This doubles annual exclusion ($18K × 2 = $36K per donee in 2024) and potentially uses both unified credits. Requires spouse consent on gift return. Both spouses must be U.S. citizens/residents. Simple strategy to maximize gift-tax-free giving.'
  },
  // Additional Topics
  {
    id: 'CFP-TAX-B9-016',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Income Tax',
    subtopic: 'Cancellation of Debt Income',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Cancellation of debt (COD) income is generally:',
    options: [
      'A) Never taxable',
      'B) Taxable as ordinary income, with exceptions for insolvency, bankruptcy, qualified principal residence debt (to 2025), and certain farm/business debt',
      'C) Always excluded',
      'D) Capital gain'
    ],
    correctAnswer: 1,
    explanation: 'Debt forgiveness = income (you received cash/benefit, now don\'t have to repay). Exceptions: discharge in bankruptcy (Title 11), insolvency (to extent insolvent), qualified farm/business debt, qualified principal residence debt (extended through 2025). Excluded amounts may reduce tax attributes (losses, basis). Form 1099-C reports cancellations over $600.'
  },
  {
    id: 'CFP-TAX-B9-017',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Deductions',
    subtopic: 'Health Insurance Deduction',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Self-employed individuals can deduct health insurance premiums:',
    options: [
      'A) Only as itemized deduction',
      'B) As an above-the-line deduction for themselves, spouse, and dependents, but not reducing self-employment tax',
      'C) Without any limitations',
      'D) Only in profitable years'
    ],
    correctAnswer: 1,
    explanation: 'Self-employed health insurance deduction is above-the-line (reducing AGI regardless of itemizing). Limited to net self-employment income. Covers self, spouse, dependents, and children under 27. Cannot use if eligible for employer-subsidized plan. Does NOT reduce self-employment tax base—only income tax. Important distinction from business expense.'
  },
  {
    id: 'CFP-TAX-B9-018',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    topic: 'Investment Tax',
    subtopic: 'Section 1256 Contracts',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Section 1256 contracts (regulated futures, foreign currency contracts) receive:',
    options: [
      'A) Ordinary income treatment',
      'B) 60/40 treatment: 60% long-term, 40% short-term capital gain regardless of holding period, with mark-to-market',
      'C) Tax exemption',
      'D) 100% long-term treatment'
    ],
    correctAnswer: 1,
    explanation: 'Section 1256 contracts: mark-to-market at year-end (even if position is open), with gains/losses treated 60% LTCG, 40% STCG regardless of actual holding period. Applies to regulated futures, forex contracts, nonequity options, dealer equity options. Blended rate is favorable vs. short-term ordinary rates. Losses can be carried back 3 years.'
  },
  {
    id: 'CFP-TAX-B9-019',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-4',
    topic: 'Business Tax',
    subtopic: 'Start-Up Costs',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Business start-up costs can be:',
    options: [
      'A) Fully deducted in year one',
      'B) Deducted up to $5,000 immediately (phased out above $50K), with excess amortized over 180 months',
      'C) Only capitalized, never deducted',
      'D) Carried forward indefinitely'
    ],
    correctAnswer: 1,
    explanation: 'Start-up costs (investigating, creating a business before it begins): $5,000 immediate deduction, reduced dollar-for-dollar for costs over $50,000. Remaining costs amortize over 180 months starting with business month. Organizational costs (legal/state fees for entity) have same treatment. Election required; costs must meet capital expenditure tests.'
  },
  {
    id: 'CFP-TAX-B9-020',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-5',
    topic: 'Estate/Gift Tax',
    subtopic: 'State Death Taxes',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'State-level death taxes:',
    options: [
      'A) Are uniform across all states',
      'B) Vary significantly—some states have estate taxes with lower exemptions, inheritance taxes, or no death tax at all',
      'C) Were eliminated nationwide',
      'D) Only apply to non-residents'
    ],
    correctAnswer: 1,
    explanation: 'State death taxes vary widely. Estate taxes (about 12 states + DC) often have lower exemptions than federal ($1M-$6M). Inheritance taxes (about 6 states) tax recipients based on relationship. Some states have both. Many have no death tax. Planning must consider residence and property location. State taxes aren\'t eliminated by federal exemption.'
  },
  {
    id: 'CFP-TAX-B9-021',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Income Tax',
    subtopic: 'Kiddie Tax',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The kiddie tax applies unearned income of:',
    options: [
      'A) All children regardless of age',
      'B) Children under 19 (or full-time students under 24) above threshold amounts, taxing excess at parents\' marginal rate',
      'C) Only earned income',
      'D) Children with part-time jobs'
    ],
    correctAnswer: 1,
    explanation: 'Kiddie tax prevents income shifting via gifts of income-producing property to children in lower brackets. Applies: under 19, or under 24 if full-time student, with unearned income over $2,500 (2024). Excess taxed at parents\' marginal rate. Reduces benefit of UGMA/UTMA accounts for tax purposes. Planning: use growth/deferred investments before child ages out.'
  },
  {
    id: 'CFP-TAX-B9-022',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Credits',
    subtopic: 'Saver\'s Credit',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'The Saver\'s Credit (Retirement Savings Contributions Credit):',
    options: [
      'A) Has no income limits',
      'B) Provides a tax credit of 10-50% on up to $2,000 of retirement contributions for lower-income taxpayers',
      'C) Is a deduction, not a credit',
      'D) Only applies to employer plans'
    ],
    correctAnswer: 1,
    explanation: 'Saver\'s Credit: nonrefundable credit for retirement contributions (IRA, 401k, etc.). Credit rate: 50%/20%/10% based on AGI. 2024 limits: 50% rate for AGI up to $23K single. Max credit: $1,000 ($2,000 MFJ). Must be 18+, not student or dependent. Stacks with retirement contribution deduction—double benefit for eligible savers.'
  },
  {
    id: 'CFP-TAX-B9-023',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    topic: 'Investment Tax',
    subtopic: 'Installment Sales',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Installment sale reporting allows:',
    options: [
      'A) Avoiding all capital gain tax',
      'B) Spreading gain recognition over years as payments are received, with each payment containing return of basis, gain, and interest',
      'C) Converting gain to ordinary income',
      'D) Only for real estate'
    ],
    correctAnswer: 1,
    explanation: 'Installment sales (at least one payment after sale year) spread gain as payments are received. Gross profit ratio determines taxable portion of each principal payment. Interest is separately taxable. Not available for inventory, stocks traded on exchanges, or depreciation recapture. Can elect out. Useful for managing income/bracket.'
  },
  {
    id: 'CFP-TAX-B9-024',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-4',
    topic: 'Business Tax',
    subtopic: 'C Corp Disadvantages',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A primary disadvantage of C corporation status is:',
    options: [
      'A) Self-employment tax',
      'B) Double taxation—corporate income is taxed at the entity level and again when distributed as dividends to shareholders',
      'C) Pass-through treatment',
      'D) No limited liability'
    ],
    correctAnswer: 1,
    explanation: 'C corp double taxation: profits taxed at 21% corporate rate, then dividends taxed to shareholders (qualified dividend rates 0/15/20% + possibly NIIT). Combined rate can exceed 50% with some high-earners. S corps, partnerships avoid this with pass-through. C corps may still be preferable for: high retention, equity compensation, or certain benefits.'
  },
  {
    id: 'CFP-TAX-B9-025',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-5',
    topic: 'Estate/Gift Tax',
    subtopic: 'Sunset of Exemption',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The 2017 TCJA estate/gift tax exemption increase:',
    options: [
      'A) Is permanent',
      'B) Is scheduled to sunset after 2025, reverting to approximately half ($5M+ indexed) unless Congress acts',
      'C) Will double again',
      'D) Only affects gift tax'
    ],
    correctAnswer: 1,
    explanation: 'TCJA doubled exemption (indexed to ~$13.61M in 2024). Without legislative action, it reverts to pre-TCJA amounts (~$6-7M indexed) after 2025. IRS has ruled no "clawback" of gifts using higher exemption. This creates a planning window—clients should consider using exemption through gifts or irrevocable trusts before potential reduction.'
  }
];

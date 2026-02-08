/**
 * SEE Part 1: Individuals - Comprehensive Study Guide
 * 
 * This guide covers all 6 domains of the SEE Part 1 exam with:
 * - Domain overviews and weight information
 * - Key concepts and common exam traps
 * - Memory aids and mnemonics
 * - Practice strategies
 * 
 * Updated for Tax Year 2024-2025
 */

export const SEE1_STUDY_GUIDE = {
  section: 'SEE1',
  title: 'SEE Part 1: Individuals - Complete Study Guide',
  version: '2024-2025',
  examInfo: {
    totalQuestions: 100,
    scoredQuestions: 85,
    pretestQuestions: 15,
    timeAllowed: '3.5 hours (210 minutes)',
    passingScore: '105 (scaled score, approximately 70%)',
    examFormat: 'Computer-based, multiple choice',
  },
  
  domains: [
    {
      id: 'SEE1-1',
      name: 'Preliminary Work and Taxpayer Data',
      weight: '16.5%',
      estimatedQuestions: 14,
      overview: 'This domain covers the fundamentals of tax preparation: who must file, when to file, filing status determination, and taxpayer identification.',
      
      keyTopics: [
        {
          topic: 'Filing Requirements',
          concepts: [
            'Gross income thresholds by filing status and age',
            'Special rules requiring filing regardless of income',
            'Self-employment income threshold ($400)',
            'Household employee wages threshold ($2,700 in 2024)',
          ],
          examTips: [
            'EXAM TRAP: Remember the $5 threshold for MFS regardless of income',
            'Know when advance premium tax credit recipients must file',
          ],
        },
        {
          topic: 'Filing Status',
          concepts: [
            'Single, MFJ, MFS, HOH, QSS definitions and requirements',
            'Determination on last day of tax year (December 31)',
            'Considered unmarried rules for HOH',
            'QSS: 2-year window after spouse death',
          ],
          examTips: [
            'MNEMONIC: "MFS Loses Everything" - MFS loses EITC, education credits, lower phase-outs',
            'EXAM TRAP: HOH requires >50% of household costs AND qualifying person',
          ],
        },
        {
          topic: 'Dependents',
          concepts: [
            'Qualifying Child: CARES test (Close relative, Age, Residency, Eliminated support, Single)',
            'Qualifying Relative: SUPORT test (Support >50%, Under threshold, Precludes own dependency, Only citizen/resident, Relationship)',
            'Tie-breaker rules for multiple claims',
          ],
          examTips: [
            'MNEMONIC: Use CARES for Qualifying Child tests',
            'EXAM TRAP: Qualifying Child age limits - 19, or 24 if full-time student',
            'Remember: Foster children count as related for Qualifying Child',
          ],
        },
        {
          topic: 'Taxpayer Identification',
          concepts: [
            'SSN: For U.S. citizens and authorized workers',
            'ITIN: For non-citizens without work authorization',
            'ATIN: For adoptions in progress',
            'PTIN: For paid preparers',
          ],
          examTips: [
            'Know which forms require which type of ID',
            'ITIN holders cannot claim EITC',
          ],
        },
      ],
      
      practiceStrategy: 'Focus on filing status determination and dependent tests. These are tested heavily and often involve edge cases.',
    },
    
    {
      id: 'SEE1-2',
      name: 'Income and Assets',
      weight: '20%',
      estimatedQuestions: 17,
      overview: 'The largest domain covers all types of income recognition, exclusions, and asset basis rules.',
      
      keyTopics: [
        {
          topic: 'Wages and Compensation',
          concepts: [
            'Form W-2 income items',
            'Supplemental wages (bonuses, commissions)',
            'Fringe benefits (taxable vs. excludable)',
            'Tips: $20/month employer reporting threshold',
          ],
          examTips: [
            'Know which fringe benefits are excludable (health insurance, de minimis, etc.)',
            'EXAM TRAP: Employer-paid life insurance over $50,000 is taxable',
          ],
        },
        {
          topic: 'Interest and Dividends',
          concepts: [
            'Taxable vs. tax-exempt interest',
            'Original issue discount (OID)',
            'Qualified dividends (0%/15%/20% rates)',
            'Ordinary dividends vs. qualified dividends',
          ],
          examTips: [
            'EXAM TRAP: Interest on U.S. savings bonds is federal-taxable but state-exempt',
            'Qualified dividends require 60-day holding period (90 for preferred)',
          ],
        },
        {
          topic: 'Business Income (Schedule C)',
          concepts: [
            'Gross receipts less returns and allowances',
            'Cost of goods sold',
            'Business expenses (ordinary and necessary)',
            'Home office deduction rules',
          ],
          examTips: [
            'Know the simplified home office deduction: $5/sq ft, max 300 sq ft',
            'Business gifts are limited to $25 per recipient per year',
          ],
        },
        {
          topic: 'Capital Gains and Losses',
          concepts: [
            'Short-term (≤1 year) vs. long-term (>1 year)',
            '$3,000 annual loss limitation ($1,500 MFS)',
            'Net capital loss carryforward (indefinite)',
            'Wash sale rule (30 days)',
          ],
          examTips: [
            'MNEMONIC: "Short = Salary rates, Long = Lower rates"',
            'EXAM TRAP: Wash sales add disallowed loss to new basis',
          ],
        },
        {
          topic: 'Retirement Distributions',
          concepts: [
            'IRA/401(k) distribution rules',
            '10% early distribution penalty (before 59½)',
            'Exceptions to early penalty',
            'Required Minimum Distributions (age 73 under SECURE 2.0)',
          ],
          examTips: [
            'MNEMONIC: "DIMPLE SAD" for early penalty exceptions - Disability, Insurance (medical), Medical expenses, Payments (SEPP), LEvy, Separation (55+), Adoption, Death',
            'Know the first-time homebuyer exception ($10,000 lifetime) applies to IRA only',
          ],
        },
        {
          topic: 'Social Security Benefits',
          concepts: [
            'Up to 85% taxable based on provisional income',
            'Provisional income = AGI + ½ SS + tax-exempt interest',
            'Thresholds: $25,000/$32,000 for 50%, $34,000/$44,000 for 85%',
          ],
          examTips: [
            'EXAM TRAP: Tax-exempt interest IS included in provisional income calculation',
          ],
        },
      ],
      
      practiceStrategy: 'Master capital gains calculations and retirement distribution rules. Know the exceptions to the 10% penalty cold.',
    },
    
    {
      id: 'SEE1-3',
      name: 'Deductions and Credits',
      weight: '20%',
      estimatedQuestions: 17,
      overview: 'Covers above-the-line deductions, itemized deductions, and both refundable and nonrefundable credits.',
      
      keyTopics: [
        {
          topic: 'Adjustments to Income',
          concepts: [
            'Educator expenses ($300 limit)',
            'HSA contributions',
            'Self-employment tax deduction (50%)',
            'Self-employed health insurance',
            'IRA contributions',
            'Student loan interest ($2,500 limit)',
            'Alimony (pre-2019 agreements only)',
          ],
          examTips: [
            'MNEMONIC: "SHADES IRA" - SE health, HSA, Alimony, Deductible SE tax, Educator, Student loan, IRA',
            'EXAM TRAP: Post-2018 divorce alimony is NOT deductible (or includible)',
          ],
        },
        {
          topic: 'Standard vs. Itemized Deductions',
          concepts: [
            '2024 Standard Deduction: $14,600 (S/MFS), $29,200 (MFJ), $21,900 (HOH)',
            'Additional for age 65+: $1,550 (married), $1,950 (unmarried)',
            'Bunching strategy for borderline itemizers',
          ],
          examTips: [
            'If spouse itemizes on MFS return, you MUST itemize',
            'Know when standard deduction is limited (dependents, NRAs)',
          ],
        },
        {
          topic: 'Schedule A Deductions',
          concepts: [
            'Medical: Excess over 7.5% of AGI',
            'SALT: $10,000 cap ($5,000 MFS)',
            'Mortgage interest: $750,000 limit for post-12/15/2017 loans',
            'Charitable: 60% AGI limit for cash, 30% for capital gain property',
          ],
          examTips: [
            'EXAM TRAP: SALT cap applies regardless of income level',
            'Medical expenses paid by credit card are deductible when charged, not when paid',
          ],
        },
        {
          topic: 'Nonrefundable Credits',
          concepts: [
            'Child and Dependent Care Credit (max $3,000 one child, $6,000 two+)',
            'Retirement Savings Contribution Credit (Saver\'s Credit)',
            'Foreign Tax Credit',
            'Lifetime Learning Credit ($2,000 max)',
          ],
          examTips: [
            'Nonrefundable credits reduce tax to zero but no refund',
            'LLC can be used for graduate school and unlimited years',
          ],
        },
        {
          topic: 'Refundable Credits',
          concepts: [
            'Earned Income Tax Credit (EITC): Investment income limit $11,600',
            'Child Tax Credit: $2,000 per child, $1,700 refundable (ACTC)',
            'American Opportunity Credit: $2,500, 40% refundable ($1,000)',
            'Premium Tax Credit',
          ],
          examTips: [
            'MNEMONIC: "EITC FAP" - Earned Income, Investment limit, Three kids max credit, Child must be <19 (24 student), Filing together, AGI limits, Principal residence',
            'AOTC is per student; LLC is per return',
          ],
        },
      ],
      
      practiceStrategy: 'Memorize the deduction limits and credit maximums. Practice identifying which situations qualify for each credit.',
    },
    
    {
      id: 'SEE1-4',
      name: 'Taxation',
      weight: '17.6%',
      estimatedQuestions: 15,
      overview: 'Covers tax computation, including special taxes like AMT, self-employment tax, and estimated payments.',
      
      keyTopics: [
        {
          topic: 'Tax Computation',
          concepts: [
            'Tax brackets: 10%, 12%, 22%, 24%, 32%, 35%, 37%',
            'Tax rate schedules vs. tax tables',
            'Qualified dividends and LTCG rates: 0%, 15%, 20%',
            'Kiddie tax rules (Form 8615)',
          ],
          examTips: [
            '0% LTCG rate for those in the 10% or 12% bracket',
            'Kiddie tax applies to unearned income over $2,500 (2024)',
          ],
        },
        {
          topic: 'Alternative Minimum Tax (AMT)',
          concepts: [
            'AMT exemption: $85,700 single, $133,300 MFJ (2024)',
            'Phase-out thresholds: $609,350 single, $1,218,700 MFJ',
            'AMT rates: 26% up to $220,700, 28% above',
            'Key AMT adjustments: SALT, misc itemized, ISO spread',
          ],
          examTips: [
            'MNEMONIC: "SIMPLE AMT" - State taxes, Interest (home equity), Miscellaneous deductions, Personal exemptions (pre-TCJA), Local taxes, Exercising ISOs',
            'SALT deduction is ADDED BACK for AMT calculation',
          ],
        },
        {
          topic: 'Self-Employment Tax',
          concepts: [
            'SE tax rate: 15.3% on first $168,600, 2.9% above (2024)',
            'Net SE income × 0.9235 = SE tax base',
            '50% of SE tax is deductible (above-the-line)',
            'SE income includes partner distributive share',
          ],
          examTips: [
            'The 0.9235 factor accounts for the employee-equivalent adjustment',
            'EXAM TRAP: Limited partners generally don\'t pay SE tax on distributive share',
          ],
        },
        {
          topic: 'Net Investment Income Tax',
          concepts: [
            '3.8% tax on lesser of NII or excess MAGI',
            'Thresholds: $200,000 single, $250,000 MFJ, $125,000 MFS',
            'NII includes: interest, dividends, capital gains, rental income',
            'Excludes: wages, SE income, distributions from IRAs',
          ],
          examTips: [
            'EXAM TRAP: S corp and partnership owner\'s distributive share may be NII if passive',
            'Active business income is generally excluded',
          ],
        },
        {
          topic: 'Estimated Tax',
          concepts: [
            'Safe harbor: 100% of prior year or 90% of current year',
            'High income (>$150,000): 110% of prior year',
            'Penalty: Underpayment penalty if less than both',
            'Due dates: 4/15, 6/15, 9/15, 1/15',
          ],
          examTips: [
            'EXAM TRAP: $1,000 minimum underpayment to trigger penalty',
            'Farmers/fishermen have special 2/3 income rule',
          ],
        },
      ],
      
      practiceStrategy: 'Focus on AMT adjustments and SE tax calculations. These are commonly tested and require understanding both concepts and math.',
    },
    
    {
      id: 'SEE1-5',
      name: 'Advising the Individual Taxpayer',
      weight: '12.9%',
      estimatedQuestions: 11,
      overview: 'NEW domain focusing on tax planning strategies, retirement planning, and penalty avoidance.',
      
      keyTopics: [
        {
          topic: 'Tax Planning Strategies',
          concepts: [
            'Income timing (acceleration vs. deferral)',
            'Deduction bunching',
            'Capital gains harvesting at 0% rate',
            'Roth conversion strategies',
          ],
          examTips: [
            'Lower income year = convert to Roth (pay tax at low rate)',
            'Higher income expected = defer income, accelerate deductions',
          ],
        },
        {
          topic: 'Retirement Planning',
          concepts: [
            'Traditional vs. Roth IRA selection',
            'Contribution limits: $7,000 ($8,000 if 50+) for 2024',
            '401(k) limits: $23,000 ($30,500 if 50+) for 2024',
            'Backdoor Roth strategy for high earners',
            'RMD rules under SECURE 2.0 (age 73)',
          ],
          examTips: [
            'Choose Roth if expecting higher tax bracket at retirement',
            'Pro-rata rule applies to backdoor Roth if traditional IRA balances exist',
          ],
        },
        {
          topic: 'Health Savings Accounts',
          concepts: [
            'Triple tax advantage: deduction, tax-free growth, tax-free qualified withdrawals',
            '2024 limits: $4,150 self-only, $8,300 family',
            'Catch-up (55+): additional $1,000',
            'HDHP required; Medicare enrollment disqualifies contributions',
          ],
          examTips: [
            'HSA funds never expire and can be invested',
            'EXAM TRAP: FSAs have use-it-or-lose-it; HSAs do not',
          ],
        },
        {
          topic: 'Education Tax Benefits',
          concepts: [
            'AOTC vs. LLC selection',
            '529 plan contributions (5-year gift tax averaging)',
            'Student loan interest deduction ($2,500 limit)',
            'Coverdell ESA ($2,000 annual limit)',
          ],
          examTips: [
            'AOTC first 4 years undergraduate; LLC for any level, any year',
            '529 to Roth rollover now available under SECURE 2.0 (limits apply)',
          ],
        },
        {
          topic: 'Penalty Avoidance',
          concepts: [
            'Estimated tax safe harbors',
            'Early distribution penalty exceptions',
            'Excess IRA contribution corrections',
            'RMD penalty strategy',
          ],
          examTips: [
            'First RMD can be deferred to April 1, but then 2 RMDs in year 2',
            'Excess contributions: withdraw with earnings by extended due date',
          ],
        },
      ],
      
      practiceStrategy: 'This domain tests practical application. Think about real client scenarios and optimal tax-saving strategies.',
    },
    
    {
      id: 'SEE1-6',
      name: 'Specialized Returns for Individuals',
      weight: '12.9%',
      estimatedQuestions: 11,
      overview: 'Covers amended returns, foreign income, expatriation, and gift/estate considerations.',
      
      keyTopics: [
        {
          topic: 'Amended Returns',
          concepts: [
            'Form 1040-X filing',
            'Refund claim deadline: 3 years from filing or 2 years from payment',
            'Bad debts: 7-year extended period',
            'Protective claims for pending legislation',
          ],
          examTips: [
            'Cannot change MFJ to MFS after filing deadline',
            'Electronic filing now available for 1040-X',
          ],
        },
        {
          topic: 'Foreign Income',
          concepts: [
            'Foreign Earned Income Exclusion: $126,500 (2024)',
            'Bona fide residence test OR physical presence test (330 days)',
            'Foreign Tax Credit vs. deduction',
            'FBAR: $10,000 aggregate threshold',
            'Form 8938 (FATCA): $50,000/$75,000 threshold (US residents)',
          ],
          examTips: [
            'Physical presence test: 330 FULL days in 12-month period',
            'FBAR is FinCEN form, not IRS; different from Form 8938',
          ],
        },
        {
          topic: 'Expatriation',
          concepts: [
            'Covered expatriate definition: $2M net worth OR $201,000 tax liability average',
            'Exit tax: deemed sale of worldwide assets',
            'Form 8854 filing requirement',
          ],
          examTips: [
            'Mark-to-market exit tax applies to covered expatriates',
          ],
        },
        {
          topic: 'Non-resident Aliens',
          concepts: [
            'Form 1040-NR filing',
            'Substantial presence test (31 days current + 183 formula)',
            'U.S. source income only',
            'Limited deductions (no standard deduction generally)',
          ],
          examTips: [
            'Formula: current year + 1/3 prior year + 1/6 second prior year ≥ 183',
          ],
        },
        {
          topic: 'Estate and Gift',
          concepts: [
            'Annual gift exclusion: $18,000 (2024)',
            'Lifetime exemption: $13.61 million (2024)',
            'Stepped-up basis on inherited property',
            'Carryover basis on gifted property (with dual basis rules)',
            'Medical/educational exclusion (unlimited if paid directly)',
          ],
          examTips: [
            'EXAM TRAP: Gift basis rule when FMV < donor basis = dual basis',
            'Stepped-up basis eliminates all unrealized gains at death',
          ],
        },
      ],
      
      practiceStrategy: 'Focus on FBAR/FATCA thresholds and gift/estate basis rules. These are commonly tested with specific scenarios.',
    },
  ],
  
  examStrategies: {
    timeManagement: [
      'Allocate about 2 minutes per question (200 minutes for 100 questions)',
      'Flag difficult questions and return after completing easier ones',
      'Don\'t spend more than 3-4 minutes on any single question first pass',
    ],
    answerTechniques: [
      'Read the question carefully - watch for "EXCEPT" or "NOT"',
      'Eliminate obviously wrong answers first',
      'When unsure, choose the most conservative tax position',
      'Trust your first instinct unless you have clear reason to change',
    ],
    commonMistakes: [
      'Confusing Qualifying Child and Qualifying Relative tests',
      'Forgetting SALT $10,000 cap on itemized deductions',
      'Mixing up IRA penalty exceptions with 401(k) exceptions',
      'Not knowing the difference between refundable and nonrefundable credits',
    ],
  },
  
  studySchedule: {
    week1: 'Filing requirements, filing status, dependents (Domain 1)',
    week2: 'Income types and exclusions (Domain 2)',
    week3: 'Capital gains, retirement distributions (Domain 2)',
    week4: 'Adjustments and itemized deductions (Domain 3)',
    week5: 'Credits - refundable and nonrefundable (Domain 3)',
    week6: 'Tax computation, AMT, SE tax (Domain 4)',
    week7: 'Tax planning and advising (Domain 5)',
    week8: 'Specialized returns, review, practice exams (Domain 6)',
  },
};

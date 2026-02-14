/**
 * EA SEE1 Study Guide
 * Individual Taxation
 * 
 * Based on IRS Special Enrollment Examination Part 1
 */

export interface EAStudyGuide {
  id: string;
  part: string;
  title: string;
  version: string;
  lastUpdated: string;
  examFormat: ExamFormat;
  domains: EADomain[];
  studyPlan: StudyWeek[];
  examTips: string[];
  commonMistakes: string[];
}

export interface ExamFormat {
  questions: number;
  duration: string;
  passingScore: string;
  format: string;
}

export interface EADomain {
  id: string;
  title: string;
  weight: string;
  overview: string;
  keyTopics: TopicDetail[];
  examTips: string[];
}

export interface TopicDetail {
  name: string;
  description: string;
  keyPoints: string[];
  irsReference?: string;
}

export interface StudyWeek {
  week: number;
  focus: string;
  topics: string[];
  hours: number;
  activities: string[];
}

export const SEE1_STUDY_GUIDE: EAStudyGuide = {
  id: 'see1-study-guide',
  part: 'SEE1',
  title: 'Individuals',
  version: '2024-2025',
  lastUpdated: '2024-12-01',

  examFormat: {
    questions: 100,
    duration: '3.5 hours',
    passingScore: 'Scaled score of 105',
    format: 'Multiple choice',
  },

  domains: [
    // =====================================================
    // Domain 1: Preliminary Work and Taxpayer Data (15%)
    // =====================================================
    {
      id: 'SEE1-D1',
      title: 'Preliminary Work and Taxpayer Data',
      weight: '15%',
      overview: 'Gathering taxpayer information, filing requirements, and preliminary return preparation.',

      keyTopics: [
        {
          name: 'Filing Requirements',
          description: 'Who must file and filing thresholds',
          keyPoints: [
            'Gross income thresholds by filing status',
            'Self-employment income threshold: $400',
            'Special rules for dependents',
            'When to file even if not required (refund, credits)',
            'Nonresident alien filing requirements',
          ],
          irsReference: 'Publication 17',
        },
        {
          name: 'Filing Status',
          description: 'Determining correct filing status',
          keyPoints: [
            'Single: Unmarried or legally separated',
            'MFJ: Married, both spouses agree, generally most beneficial',
            'MFS: Married, file separately, limits many deductions/credits',
            'Head of Household: Unmarried, paid >50% household, qualifying person',
            'Qualifying Surviving Spouse: 2 years after spouse death, dependent child',
            'Determination date: December 31 of tax year',
          ],
        },
        {
          name: 'Personal Exemptions and Dependents',
          description: 'Qualifying child and qualifying relative tests',
          keyPoints: [
            'Personal exemptions suspended 2018-2025 (TCJA)',
            'Qualifying Child: CARES test (Close relative, Age, Residency, Eliminated joint return, Support)',
            'Age limit: Under 19, or under 24 if full-time student',
            'Qualifying Relative: SUPORT test (Support, Under gross income limit, Precludes QC, Only citizen/resident, Relative or member of household, Tax return joint filing)',
            'Gross income limit: $5,050 (2024)',
            'Tiebreaker rules for multiple eligible taxpayers',
          ],
        },
        {
          name: 'Taxpayer Identification',
          description: 'SSN, ITIN, and other identification requirements',
          keyPoints: [
            'SSN required for taxpayers, spouses, dependents',
            'ITIN for those ineligible for SSN',
            'ATIN for pending adoptions',
            'Due diligence for dependent claims',
          ],
        },
      ],

      examTips: [
        'Know the CARES and SUPORT tests cold',
        'Filing status questions are common',
        'Head of Household requirements frequently tested',
        'Tiebreaker rules for dependents',
      ],
    },

    // =====================================================
    // Domain 2: Income and Assets (22%)
    // =====================================================
    {
      id: 'SEE1-D2',
      title: 'Income and Assets',
      weight: '22%',
      overview: 'Types of income, exclusions, and basis of assets.',

      keyTopics: [
        {
          name: 'Wages, Salaries, and Tips',
          description: 'Employment income reporting',
          keyPoints: [
            'Form W-2 reporting',
            'Tip income: All tips are taxable',
            'Allocated tips when reported tips < 8% of sales',
            'Fringe benefits: Taxable unless specifically excluded',
            'Moving expenses: Generally not deductible (exception: military)',
          ],
        },
        {
          name: 'Interest and Dividend Income',
          description: 'Investment income types and reporting',
          keyPoints: [
            'Taxable interest: Bank, corporate bonds, Treasury',
            'Tax-exempt interest: Municipal bonds (still reported)',
            'OID: Original issue discount included annually',
            'Qualified dividends: 0%, 15%, or 20% rates',
            'Ordinary dividends: Taxed as ordinary income',
            'Form 1099-INT, 1099-DIV reporting',
          ],
        },
        {
          name: 'Business Income (Schedule C)',
          description: 'Self-employment income and expenses',
          keyPoints: [
            'Gross receipts - Returns = Net receipts',
            'Ordinary and necessary business expenses',
            'Home office deduction: Regular and exclusive use',
            'Vehicle expenses: Standard mileage (67¢/mile 2024) or actual',
            'Business use of home: Simplified ($5/sq ft, max 300 sq ft)',
            'Net profit subject to SE tax',
          ],
        },
        {
          name: 'Capital Gains and Losses',
          description: 'Property sales and character of gain/loss',
          keyPoints: [
            'Short-term: Held ≤1 year, ordinary rates',
            'Long-term: Held >1 year, preferential rates (0%, 15%, 20%)',
            'Netting: ST gains/losses first, LT second, then net together',
            'Capital loss limitation: $3,000/year ($1,500 MFS)',
            'Carryforward: Indefinite, retains character',
            'Wash sale: 30 days before/after, loss disallowed',
          ],
        },
        {
          name: 'Rental and Royalty Income',
          description: 'Passive income reporting on Schedule E',
          keyPoints: [
            'Rental income: Gross rents received',
            'Rental expenses: Mortgage interest, taxes, insurance, repairs, depreciation',
            'Personal use days affect deductions',
            '14-day/10% rule for vacation homes',
            'Royalty income: Oil, gas, mineral, intellectual property',
          ],
        },
        {
          name: 'Other Income',
          description: 'Miscellaneous income types',
          keyPoints: [
            'Gambling winnings: Fully taxable (can offset with losses to extent of winnings)',
            'Prizes and awards: Generally taxable',
            'Alimony: Taxable if divorce before 2019; not taxable after',
            'Unemployment compensation: Fully taxable',
            'Social Security: 0%, 50%, or 85% taxable based on provisional income',
            'Cancellation of debt: Generally taxable (exceptions: bankruptcy, insolvency)',
            'Cryptocurrency: Taxable on sale or exchange',
          ],
        },
        {
          name: 'Exclusions from Income',
          description: 'Items not included in gross income',
          keyPoints: [
            'Life insurance proceeds (death benefit)',
            'Gifts and inheritances',
            'Municipal bond interest',
            'Qualified scholarships (tuition and required fees)',
            'Workers\' compensation',
            'Health insurance paid by employer',
            'Child support received',
            'Gain on sale of home: $250K/$500K exclusion',
          ],
        },
        {
          name: 'Basis of Assets',
          description: 'Determining cost basis for gain/loss calculations',
          keyPoints: [
            'Cost basis: Purchase price + acquisition costs',
            'Adjusted basis: Cost + improvements - depreciation',
            'Gift basis: Generally carryover (double basis rule for losses)',
            'Inherited basis: FMV at date of death (stepped-up)',
            'Stock basis: FIFO, specific identification, average cost (mutual funds)',
          ],
        },
      ],

      examTips: [
        'Capital gains netting rules heavily tested',
        'Know Social Security taxation thresholds',
        'Basis calculations appear frequently',
        'Exclusion vs. taxable income distinctions',
      ],
    },

    // =====================================================
    // Domain 3: Deductions and Credits (28%)
    // =====================================================
    {
      id: 'SEE1-D3',
      title: 'Deductions and Credits',
      weight: '28%',
      overview: 'Above-the-line adjustments, itemized deductions, and tax credits.',

      keyTopics: [
        {
          name: 'Adjustments to Income (Above-the-Line)',
          description: 'Deductions to arrive at AGI',
          keyPoints: [
            'Educator expenses: $300 max',
            'HSA contributions: $4,150 single, $8,300 family (2024)',
            'Self-employment tax deduction: 50% of SE tax',
            'Self-employed health insurance: 100%',
            'Self-employed retirement: SEP, SIMPLE, solo 401(k)',
            'IRA contributions: $7,000 ($8,000 if 50+)',
            'Student loan interest: $2,500 max (income phase-outs)',
            'Alimony paid: Pre-2019 divorce agreements only',
          ],
        },
        {
          name: 'Standard Deduction',
          description: '2024 standard deduction amounts',
          keyPoints: [
            'Single: $14,600',
            'MFJ: $29,200',
            'MFS: $14,600',
            'HOH: $21,900',
            'Additional for 65+ or blind: $1,550 (married), $1,950 (single/HOH)',
            'Dependent standard deduction: Greater of $1,300 or earned income + $450',
          ],
        },
        {
          name: 'Itemized Deductions',
          description: 'Schedule A deductions',
          keyPoints: [
            'Medical: Excess over 7.5% of AGI',
            'SALT: State/local income or sales tax + property tax, max $10,000',
            'Mortgage interest: Acquisition debt up to $750,000',
            'Charitable contributions: Cash 60% AGI, appreciated property 30% AGI',
            'Casualty/theft: Federally declared disasters only, $100 + 10% AGI floor',
            'No miscellaneous itemized deductions (TCJA suspended)',
          ],
        },
        {
          name: 'Qualified Business Income Deduction',
          description: 'Section 199A pass-through deduction',
          keyPoints: [
            '20% of qualified business income',
            'Limitations above threshold ($191,950 single, $383,900 MFJ)',
            'W-2 wages and capital limitation',
            'Specified service trades (SSTB) phase-out',
            'Combined QBI deduction cannot exceed 20% of taxable income',
          ],
        },
        {
          name: 'Tax Credits',
          description: 'Nonrefundable and refundable credits',
          keyPoints: [
            'Child Tax Credit: $2,000 per qualifying child, up to $1,700 refundable',
            'Child and Dependent Care: 20-35% of up to $3,000/$6,000',
            'Earned Income Credit: Refundable, based on earned income and children',
            'Education Credits: AOTC $2,500 (40% refundable), LLC $2,000',
            'Retirement Saver\'s Credit: 10-50% of contributions up to $2,000',
            'Premium Tax Credit: Marketplace insurance subsidy',
            'Foreign Tax Credit: Taxes paid to foreign governments',
          ],
        },
      ],

      examTips: [
        'Standard deduction amounts must be memorized',
        'Itemized deduction limitations are heavily tested',
        'Know refundable vs. nonrefundable credits',
        'QBI deduction rules are complex but testable',
        'EIC eligibility requirements',
      ],
    },

    // =====================================================
    // Domain 4: Taxation and Advice (20%)
    // =====================================================
    {
      id: 'SEE1-D4',
      title: 'Taxation and Advice',
      weight: '20%',
      overview: 'Tax calculation, alternative minimum tax, and special tax situations.',

      keyTopics: [
        {
          name: 'Tax Computation',
          description: 'Calculating regular tax liability',
          keyPoints: [
            'Tax brackets 2024: 10%, 12%, 22%, 24%, 32%, 35%, 37%',
            'Tax tables vs. tax rate schedules',
            'Capital gains rates: 0%, 15%, 20% based on income',
            'Net Investment Income Tax: 3.8% on investment income over thresholds',
            'Kiddie tax: Child\'s unearned income taxed at parent\'s rate',
          ],
        },
        {
          name: 'Alternative Minimum Tax',
          description: 'AMT calculation and preference items',
          keyPoints: [
            'AMT exemption: $85,700 single, $133,300 MFJ (2024)',
            'AMT rate: 26% up to $232,600, 28% above',
            'Add back: SALT deduction, miscellaneous deductions',
            'Preference items: ISO bargain element, private activity bond interest',
            'AMT credit for prior year AMT on timing differences',
          ],
        },
        {
          name: 'Self-Employment Tax',
          description: 'Social Security and Medicare for self-employed',
          keyPoints: [
            'SE tax rate: 15.3% (12.4% SS + 2.9% Medicare)',
            'Net SE income × 92.35%',
            'SS wage base: $168,600 (2024)',
            'Additional Medicare: 0.9% over $200K/$250K',
            '50% of SE tax deductible as adjustment',
          ],
        },
        {
          name: 'Estimated Tax Payments',
          description: 'Quarterly payment requirements',
          keyPoints: [
            'Safe harbor: 100% of prior year tax (110% if AGI > $150K)',
            'Or 90% of current year liability',
            'Due dates: 4/15, 6/15, 9/15, 1/15',
            'Penalty: Underpayment interest',
            'Exception for small balance due (<$1,000)',
          ],
        },
        {
          name: 'Retirement Distributions',
          description: 'IRA and retirement plan taxation',
          keyPoints: [
            'Traditional IRA: Distributions fully taxable',
            'Roth IRA: Qualified distributions tax-free',
            'Early withdrawal: 10% penalty before 59½ (exceptions apply)',
            'RMD: Required beginning age 73 (2024)',
            'Inherited IRA: 10-year rule for most beneficiaries',
            'NUA: Net unrealized appreciation on employer stock',
          ],
        },
      ],

      examTips: [
        'Know tax brackets and capital gains rate thresholds',
        'Self-employment tax calculation is frequently tested',
        'Estimated tax safe harbors important',
        'Early withdrawal penalty exceptions',
      ],
    },

    // =====================================================
    // Domain 5: Specialized Returns (15%)
    // =====================================================
    {
      id: 'SEE1-D5',
      title: 'Specialized Returns and Requirements',
      weight: '15%',
      overview: 'Special filing situations, amended returns, and extensions.',

      keyTopics: [
        {
          name: 'Amended Returns',
          description: 'Correcting previously filed returns',
          keyPoints: [
            'Form 1040-X for federal amendments',
            'Generally 3 years from original due date or 2 years from payment',
            'Cannot change filing status from MFJ to MFS after due date',
            'Electronic filing now available for amendments',
          ],
        },
        {
          name: 'Extensions',
          description: 'Filing deadline extensions',
          keyPoints: [
            'Form 4868: Automatic 6-month extension to October 15',
            'Extension to file, NOT extension to pay',
            'Estimated tax payment required to avoid penalties',
            'State extensions may differ',
          ],
        },
        {
          name: 'Foreign Income',
          description: 'Reporting worldwide income',
          keyPoints: [
            'U.S. citizens taxed on worldwide income',
            'Foreign earned income exclusion: $126,500 (2024)',
            'Bona fide residence or physical presence test',
            'Foreign tax credit or deduction',
            'FBAR: Report foreign accounts >$10,000',
            'FATCA: Form 8938 for specified foreign assets',
          ],
        },
        {
          name: 'Education-Related Benefits',
          description: 'Tax benefits for education expenses',
          keyPoints: [
            'American Opportunity Credit: Up to $2,500, first 4 years',
            'Lifetime Learning Credit: Up to $2,000, no year limit',
            'Tuition and fees deduction: Expired after 2020',
            'Student loan interest: Up to $2,500 deduction',
            '529 plans: Tax-free for qualified education',
            'Coverdell ESA: $2,000/year limit',
          ],
        },
        {
          name: 'Health-Related Benefits',
          description: 'Medical expense deductions and HSAs',
          keyPoints: [
            'HSA contributions: Above-the-line deduction',
            'HSA distributions: Tax-free for qualified medical',
            'HDHP required for HSA eligibility',
            'Medical expense deduction: Excess over 7.5% AGI',
            'Health coverage requirements (individual mandate ended federally)',
          ],
        },
      ],

      examTips: [
        'Foreign earned income exclusion tests',
        'Education credit differences (AOTC vs. LLC)',
        'HSA eligibility and contribution limits',
        'Amendment time limits',
      ],
    },
  ],

  studyPlan: [
    { week: 1, focus: 'Filing Requirements & Status', topics: ['Filing thresholds', 'Filing status', 'Dependents'], hours: 15, activities: ['CARES/SUPORT practice', 'Filing status scenarios'] },
    { week: 2, focus: 'Income Types', topics: ['Wages', 'Interest/Dividends', 'Business Income'], hours: 20, activities: ['Schedule C practice', 'Income identification'] },
    { week: 3, focus: 'Capital Gains & Other Income', topics: ['Capital gains', 'Rental income', 'SS benefits'], hours: 15, activities: ['Netting calculations', 'Basis problems'] },
    { week: 4, focus: 'Adjustments & Standard Deduction', topics: ['Above-the-line', 'Standard deduction', 'HSA'], hours: 15, activities: ['Adjustment scenarios', 'AGI calculations'] },
    { week: 5, focus: 'Itemized Deductions', topics: ['Medical', 'SALT', 'Mortgage', 'Charitable'], hours: 15, activities: ['Schedule A practice', 'Limitation calculations'] },
    { week: 6, focus: 'Credits', topics: ['Child tax credit', 'EIC', 'Education credits'], hours: 15, activities: ['Credit eligibility', 'Phase-out calculations'] },
    { week: 7, focus: 'Tax Calculation & SE Tax', topics: ['Tax computation', 'AMT', 'SE tax'], hours: 15, activities: ['Tax calculations', 'SE tax problems'] },
    { week: 8, focus: 'Review & Practice Exams', topics: ['Full practice exams', 'Weak areas'], hours: 20, activities: ['2-3 practice exams', 'Timed sessions'] },
  ],

  examTips: [
    'Focus on the highest-weighted domains (Deductions 28%, Income 22%)',
    'Know the dollar amounts for 2024 (standard deductions, contribution limits)',
    'Practice dependent tests - very commonly tested',
    'Capital gains netting is a must-know topic',
    'Understand the difference between adjustments and itemized deductions',
    'Read questions carefully for filing status clues',
  ],

  commonMistakes: [
    'Confusing qualifying child vs. qualifying relative tests',
    'Forgetting the $10,000 SALT limitation',
    'Mixing up refundable vs. nonrefundable credits',
    'Calculating SE tax on gross rather than net × 92.35%',
    'Not knowing the different capital gains holding periods',
    'Overlooking above-the-line deductions for self-employed',
  ],
};

export default SEE1_STUDY_GUIDE;

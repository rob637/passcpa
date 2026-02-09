/**
 * EA SEE2 Study Guide
 * Business Taxation
 * 
 * Based on IRS Special Enrollment Examination Part 2
 */

import { EAStudyGuide, EADomain, StudyWeek } from './see1-study-guide';

export const SEE2_STUDY_GUIDE: EAStudyGuide = {
  id: 'see2-study-guide',
  part: 'SEE2',
  title: 'Businesses',
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
    // Domain 1: Business Entities (28%)
    // =====================================================
    {
      id: 'SEE2-D1',
      title: 'Business Entities',
      weight: '28%',
      overview: 'Entity types, formation, operations, and taxation of business entities.',

      keyTopics: [
        {
          name: 'Sole Proprietorships',
          description: 'Schedule C business income and expenses',
          keyPoints: [
            'Not a separate tax entity - reported on Schedule C',
            'All income subject to self-employment tax',
            'Business expenses must be ordinary and necessary',
            'Home office deduction: Regular and exclusive use',
            'Vehicle: Standard mileage (67¢/mile 2024) or actual expenses',
            'Net profit flows to Form 1040 and Schedule SE',
          ],
          irsReference: 'Schedule C Instructions',
        },
        {
          name: 'Partnerships',
          description: 'Formation, operations, and distributions',
          keyPoints: [
            'Pass-through entity: Form 1065, Schedule K-1 to partners',
            'Formation generally tax-free (§721)',
            'Partner basis: Contributions + income - losses ± liabilities - distributions',
            'Guaranteed payments: Ordinary income to partner, deductible to partnership',
            'Special allocations must have substantial economic effect',
            'Distributions: Generally tax-free up to basis',
            'Hot assets (§751): Unrealized receivables and inventory',
            'Self-employment tax on distributive share (general partners)',
          ],
          irsReference: 'Form 1065 Instructions',
        },
        {
          name: 'S Corporations',
          description: 'Pass-through taxation for qualifying corporations',
          keyPoints: [
            'Eligibility: 100 shareholders max, one class of stock, eligible shareholders only',
            'No C corps, partnerships, or nonresident aliens as shareholders',
            'Form 1120-S, Schedule K-1 to shareholders',
            'Shareholder basis: Stock + debt basis',
            'Stock basis: Investment + income - losses - distributions',
            'No SE tax on distributive share (but reasonable salary required)',
            'Built-in gains tax: 5-year recognition period if former C corp',
            'AAA: Accumulated adjustments account for distributions',
            'Election: Form 2553, due by March 15 of year effective',
          ],
          irsReference: 'Form 1120-S Instructions',
        },
        {
          name: 'C Corporations',
          description: 'Separate taxable entities',
          keyPoints: [
            'Form 1120, 21% flat corporate rate',
            'Double taxation: Corporate tax + dividend tax',
            'Formation: §351 tax-free if 80% control immediately after',
            'Dividends Received Deduction: 50%, 65%, or 100%',
            'Charitable contribution limit: 10% of taxable income',
            'NOL: 80% of taxable income limit, indefinite carryforward',
            'Accumulated earnings tax: Penalty for excess retention',
            'Personal holding company tax: Passive income concentration',
            'Fiscal year allowed (unlike S corps)',
          ],
          irsReference: 'Form 1120 Instructions',
        },
        {
          name: 'Limited Liability Companies',
          description: 'Flexible entity classification',
          keyPoints: [
            'Default classification: Partnership (multi-member) or disregarded (single)',
            'Check-the-box election to be taxed as corporation',
            'Liability protection for members',
            'Operating agreement governs allocations',
            'Self-employment tax: Material participation = subject to SE tax',
          ],
        },
        {
          name: 'Entity Comparison',
          description: 'Choosing the right entity structure',
          keyPoints: [
            'Sole proprietor: Simplest but no liability protection',
            'Partnership: Flexibility, debt basis, but SE tax',
            'S Corp: Avoid SE tax on profits, but salary required',
            'C Corp: Unlimited growth potential, but double taxation',
            'LLC: Flexibility with liability protection',
          ],
        },
      ],

      examTips: [
        'Know the differences between entity types',
        'Partner and shareholder basis calculations are heavily tested',
        'S Corporation eligibility requirements',
        'Guaranteed payments vs. distributive share',
        'Built-in gains tax timing',
      ],
    },

    // =====================================================
    // Domain 2: Business Income and Expenses (27%)
    // =====================================================
    {
      id: 'SEE2-D2',
      title: 'Business Income and Expenses',
      weight: '27%',
      overview: 'Computing business income, allowable deductions, and accounting methods.',

      keyTopics: [
        {
          name: 'Accounting Methods',
          description: 'Cash, accrual, and hybrid methods',
          keyPoints: [
            'Cash method: Income when received, expenses when paid',
            'Accrual method: Income when earned, expenses when incurred',
            'Hybrid: Combination for different items',
            'Gross receipts test: $30M average for 3 years (accrual required above)',
            'Inventory: May use cash if average receipts ≤ $30M',
            'Change in method: Form 3115, §481(a) adjustment',
          ],
        },
        {
          name: 'Gross Income',
          description: 'Business income recognition',
          keyPoints: [
            'Sales revenue less returns and allowances',
            'Cost of goods sold: Beginning inventory + purchases - ending inventory',
            'Service income when performed (accrual) or received (cash)',
            'Advance payments: Generally taxable when received',
            'Like-kind exchanges: §1031 for real property only',
            'Installment sales: Report profit as payments received',
          ],
        },
        {
          name: 'Ordinary Business Expenses',
          description: 'Common deductible expenses',
          keyPoints: [
            'Ordinary: Common and accepted in the business',
            'Necessary: Helpful and appropriate',
            'Wages and salaries: Reasonable compensation',
            'Rent expense: Ordinary lease payments',
            'Repairs and maintenance: Keep property in operating condition',
            'Insurance: Business-related coverage',
            'Utilities and supplies',
            'Professional fees: Accounting, legal, consulting',
            'Bad debts: Specific charge-off method',
          ],
        },
        {
          name: 'Depreciation',
          description: 'Cost recovery for business assets',
          keyPoints: [
            'MACRS: Modified Accelerated Cost Recovery System',
            'Recovery periods: 3, 5, 7, 15, 27.5, 39 years',
            'Conventions: Half-year, mid-quarter, mid-month',
            '§179 expensing: $1,220,000 limit (2024), phase-out at $3,050,000',
            'Bonus depreciation: 60% first-year (2024), declining annually',
            'Listed property: >50% business use required for accelerated',
            'Automobiles: Annual depreciation limits apply',
          ],
          irsReference: 'Publication 946',
        },
        {
          name: 'Amortization and Depletion',
          description: 'Intangible assets and natural resources',
          keyPoints: [
            'Amortization: §197 intangibles over 15 years',
            '§197 assets: Goodwill, covenants, customer lists, franchises',
            'Start-up costs: $5,000 immediate + amortize remainder over 180 months',
            'Organizational costs: Same as start-up treatment',
            'Depletion: Cost or percentage method for natural resources',
          ],
        },
        {
          name: 'Business Interest Limitation',
          description: 'Section 163(j) limitations',
          keyPoints: [
            'Limitation: 30% of adjusted taxable income',
            'Exemption: Average gross receipts ≤ $30M',
            'Real property trades or businesses can elect out',
            'Carryforward of disallowed interest indefinite',
          ],
        },
        {
          name: 'Net Operating Losses',
          description: 'NOL rules post-TCJA',
          keyPoints: [
            '80% of taxable income limitation',
            'Indefinite carryforward (no carryback except farming)',
            'Farming: 2-year carryback allowed',
            'Ordering rules when multiple years',
          ],
        },
      ],

      examTips: [
        'Depreciation methods and conventions heavily tested',
        'Know §179 and bonus depreciation limits',
        'Accounting method changes require Form 3115',
        'MACRS recovery periods for common assets',
        'NOL 80% limitation',
      ],
    },

    // =====================================================
    // Domain 3: Specific Types of Business Taxes (10%)
    // =====================================================
    {
      id: 'SEE2-D3',
      title: 'Specific Types of Business Taxes',
      weight: '10%',
      overview: 'Employment taxes, excise taxes, and other business-related taxes.',

      keyTopics: [
        {
          name: 'Employment Taxes',
          description: 'Payroll tax requirements',
          keyPoints: [
            'FICA: Social Security 6.2% (up to $168,600) + Medicare 1.45%',
            'Employer matches employee FICA',
            'Additional Medicare: 0.9% over $200K (employee only)',
            'FUTA: 6.0% on first $7,000, credit up to 5.4%',
            'Form 941: Quarterly federal tax return',
            'Form 940: Annual FUTA return',
            'Deposit requirements: Monthly or semi-weekly based on liability',
          ],
          irsReference: 'Publication 15',
        },
        {
          name: 'Worker Classification',
          description: 'Employee vs. independent contractor',
          keyPoints: [
            'Behavioral control: How work is performed',
            'Financial control: Business aspects of job',
            'Type of relationship: Contracts, benefits',
            'Form SS-8: IRS determination request',
            'Misclassification penalties can be significant',
            'Safe harbor for reasonable basis',
          ],
        },
        {
          name: 'Information Returns',
          description: 'Reporting requirements',
          keyPoints: [
            'Form 1099-NEC: Nonemployee compensation $600+',
            'Form 1099-MISC: Rents, royalties, other payments',
            'Form 1099-K: Payment card and third-party network',
            'Form W-2: Employee wages',
            'Penalties for failure to file/furnish correct statements',
          ],
        },
        {
          name: 'Self-Employment Tax',
          description: 'SE tax for self-employed individuals',
          keyPoints: [
            '15.3% on net SE income × 92.35%',
            'Social Security portion: 12.4% up to wage base',
            'Medicare portion: 2.9% (no cap)',
            'Additional Medicare: 0.9% over threshold',
            '50% of SE tax deductible',
            'Partners: Based on distributive share',
            'S Corp shareholders: No SE tax on distributions',
          ],
        },
        {
          name: 'Excise Taxes',
          description: 'Various federal excise taxes',
          keyPoints: [
            'Heavy vehicles: Annual use tax',
            'Fuel taxes: Various rates by fuel type',
            'Communications tax: 3% on local/long distance',
            'Wagering taxes: Defined percentages',
            'Form 720: Quarterly federal excise tax return',
          ],
        },
      ],

      examTips: [
        'Know FICA and FUTA rates and limits',
        'Worker classification factors',
        '1099 reporting thresholds',
        'Employment tax deposit rules',
      ],
    },

    // =====================================================
    // Domain 4: Business Assets (20%)
    // =====================================================
    {
      id: 'SEE2-D4',
      title: 'Business Assets',
      weight: '20%',
      overview: 'Acquisition, disposition, and exchange of business property.',

      keyTopics: [
        {
          name: 'Asset Basis',
          description: 'Determining cost basis for business assets',
          keyPoints: [
            'Cost basis: Purchase price + acquisition costs',
            'Allocated basis: Lump-sum purchases',
            'Constructed assets: Materials + labor + overhead',
            'Converted property: Lower of FMV or adjusted basis',
            'Gifted property: Carryover basis (double basis rule)',
            'Inherited property: FMV at death (step-up)',
          ],
        },
        {
          name: 'Section 1231 Property',
          description: 'Trade or business property held more than one year',
          keyPoints: [
            'Net §1231 gain: Treated as long-term capital gain',
            'Net §1231 loss: Treated as ordinary loss',
            '5-year lookback rule: Recapture prior ordinary losses',
            'Includes: Depreciable property, land, involuntary conversions',
            'Excludes: Inventory, property held for sale',
          ],
        },
        {
          name: 'Depreciation Recapture',
          description: 'Recapture of depreciation deductions',
          keyPoints: [
            '§1245: Ordinary income to extent of all depreciation (personal property)',
            '§1250: Ordinary income to extent of excess accelerated depreciation (real property)',
            'Unrecaptured §1250: 25% rate on straight-line depreciation (real)',
            'Applies to gains only, not losses',
            '§1245 property: Machinery, equipment, vehicles, furniture',
            '§1250 property: Buildings, structural components',
          ],
        },
        {
          name: 'Like-Kind Exchanges',
          description: 'Section 1031 tax-deferred exchanges',
          keyPoints: [
            'Real property only (personal property excluded after 2017)',
            'Must be held for business or investment use',
            'Boot = cash or non-like-kind property received',
            'Gain recognized to extent of boot received',
            'Qualified intermediary for deferred exchanges',
            '45-day identification period, 180-day exchange period',
            'Basis: Carryover adjusted for boot and gain recognized',
          ],
          irsReference: 'Form 8824',
        },
        {
          name: 'Involuntary Conversions',
          description: 'Section 1033 deferral of gain',
          keyPoints: [
            'Condemnation, casualty, theft',
            'Gain deferred if replacement property acquired',
            'Replacement period: 2 years (3 for condemnation of real property)',
            'Similar or related in service or use test',
            'Basis of replacement: Cost - deferred gain',
          ],
        },
        {
          name: 'Installment Sales',
          description: 'Reporting gain as payments received',
          keyPoints: [
            'Gross profit percentage × payment received = recognized gain',
            'Interest must be charged (minimum AFR)',
            'Not available for inventory sales',
            'Depreciation recapture recognized in year of sale',
            'Related party sales: 2-year resale rule',
          ],
          irsReference: 'Form 6252',
        },
      ],

      examTips: [
        '§1231 netting rules and capital gain treatment',
        '§1245 vs. §1250 recapture differences',
        'Like-kind exchange timing requirements',
        'Basis calculations for exchanges',
        'Installment sale gross profit percentage',
      ],
    },

    // =====================================================
    // Domain 5: Trusts and Estates (8%)
    // =====================================================
    {
      id: 'SEE2-D5',
      title: 'Trusts, Estates, and Tax-Exempt Organizations',
      weight: '8%',
      overview: 'Basic taxation of trusts, estates, and exempt organizations.',

      keyTopics: [
        {
          name: 'Trusts - Overview',
          description: 'Trust types and taxation basics',
          keyPoints: [
            'Simple trust: Must distribute all income currently',
            'Complex trust: Can accumulate income or make charitable contributions',
            'Grantor trust: Income taxed to grantor',
            'Form 1041: Fiduciary income tax return',
            'Distributable Net Income (DNI): Limits distribution deduction',
          ],
        },
        {
          name: 'Estates',
          description: 'Estate taxation during administration',
          keyPoints: [
            'Fiscal year election available (unlike trusts)',
            'Income in respect of decedent (IRD): Taxable to recipient',
            'Distribution deduction based on DNI',
            'Final return: Form 1040 through date of death',
            'Estate return: Form 1041 for income after death',
          ],
        },
        {
          name: 'Tax-Exempt Organizations',
          description: '501(c)(3) and other exempt organizations',
          keyPoints: [
            '501(c)(3): Charitable, religious, educational organizations',
            'Form 990: Annual information return',
            'Unrelated business taxable income (UBTI)',
            'Private foundation rules and excise taxes',
            'Lobbying limitations for 501(c)(3)',
          ],
        },
      ],

      examTips: [
        'Simple vs. complex trust distinctions',
        'DNI limits distribution deduction',
        'UBTI concept for exempt organizations',
        'This is lower-weighted; focus on fundamentals',
      ],
    },

    // =====================================================
    // Domain 6: Retirement Plans (7%)
    // =====================================================
    {
      id: 'SEE2-D6',
      title: 'Retirement Plans for Small Business',
      weight: '7%',
      overview: 'Small business retirement plan options.',

      keyTopics: [
        {
          name: 'SEP IRA',
          description: 'Simplified Employee Pension',
          keyPoints: [
            'Employer contributions only',
            'Up to 25% of compensation or $69,000 (2024)',
            'Same percentage for all eligible employees',
            'Simple to establish and maintain',
            'Deadline: Tax filing deadline including extensions',
          ],
        },
        {
          name: 'SIMPLE IRA',
          description: 'Savings Incentive Match Plan',
          keyPoints: [
            '<100 employees requirement',
            'Employee deferral: $16,000 (2024), $3,500 catch-up if 50+',
            'Employer match: 3% dollar for dollar or 2% nonelective',
            'Established by October 1',
            '25% penalty for early withdrawal within 2 years',
          ],
        },
        {
          name: 'Solo 401(k)',
          description: 'One-participant 401(k) for self-employed',
          keyPoints: [
            'Employee deferral + employer contribution',
            'Employee: $23,000 (2024), $7,500 catch-up if 50+',
            'Employer: 25% of net SE income (20% calculation for sole proprietors)',
            'Total limit: $69,000 + catch-up',
            'Roth option available',
          ],
        },
        {
          name: 'Qualified Plans',
          description: 'Defined benefit and defined contribution',
          keyPoints: [
            'Defined benefit: Formula-based, employer contribution',
            'Defined contribution: Account balance, employee/employer',
            'Annual additions limit: $69,000 (2024)',
            'Compensation limit: $345,000 (2024)',
            'Nondiscrimination requirements',
          ],
        },
      ],

      examTips: [
        'Know contribution limits for each plan type',
        'SEP vs. SIMPLE differences',
        'Solo 401(k) total contribution calculation',
        'This is lower-weighted but still important',
      ],
    },
  ],

  studyPlan: [
    { week: 1, focus: 'Sole Proprietorships & Partnerships', topics: ['Schedule C', 'Form 1065', 'Partner basis'], hours: 20, activities: ['Basis calculations', 'K-1 review'] },
    { week: 2, focus: 'S Corps & C Corps', topics: ['S Corp eligibility', 'Form 1120-S', 'Form 1120'], hours: 20, activities: ['Entity comparison', 'Shareholder basis'] },
    { week: 3, focus: 'Business Income & Accounting', topics: ['Accounting methods', 'COGS', 'Gross income'], hours: 15, activities: ['Method identification', 'Income recognition'] },
    { week: 4, focus: 'Depreciation & Expenses', topics: ['MACRS', '§179', 'Bonus depreciation'], hours: 20, activities: ['Depreciation calculations', 'Recovery periods'] },
    { week: 5, focus: 'Employment Taxes', topics: ['FICA', 'FUTA', 'Worker classification'], hours: 15, activities: ['Payroll tax calculations', 'Classification scenarios'] },
    { week: 6, focus: 'Asset Sales & Exchanges', topics: ['§1231', '§1245/1250', '§1031'], hours: 20, activities: ['Recapture calculations', 'Like-kind exchanges'] },
    { week: 7, focus: 'Trusts, Estates & Retirement', topics: ['DNI', 'Grantor trusts', 'SEP/SIMPLE'], hours: 10, activities: ['Trust basics', 'Plan comparisons'] },
    { week: 8, focus: 'Review & Practice Exams', topics: ['Full practice exams', 'Weak areas'], hours: 20, activities: ['2-3 practice exams', 'Timed sessions'] },
  ],

  examTips: [
    'Entity taxation is the largest domain (28%) - know it well',
    'Depreciation methods and special deductions appear frequently',
    'Basis calculations are critical for partnerships and S corps',
    '§1231/1245/1250 distinctions are heavily tested',
    'Employment taxes: Know the rates and deposit rules',
    'Like-kind exchange timing (45/180 days) is commonly tested',
  ],

  commonMistakes: [
    'Confusing S Corp and partnership SE tax treatment',
    'Forgetting mid-quarter convention triggers',
    'Not applying the 80% NOL limitation',
    'Mixing up §1245 (all depreciation) vs. §1250 (excess depreciation)',
    'Incorrect partner basis calculation order',
    'Overlooking §179 phase-out threshold',
  ],
};

export default SEE2_STUDY_GUIDE;

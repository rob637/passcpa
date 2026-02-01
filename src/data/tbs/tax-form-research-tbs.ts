// Tax Form and Research TBS - Addressing content gap
// Focus: Form completion, tax research, and IRS code application

import { TBS, TBS_TYPES } from '../../types';

// ==========================================
// TAX FORM TBS (REG/TCP)
// ==========================================
export const TAX_FORM_TBS: TBS[] = [
  {
    id: 'reg-tbs-form-001',
    section: 'REG',
    type: TBS_TYPES.FORM_COMPLETION,
    title: 'Schedule C - Sole Proprietorship',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Schedule C Preparation',
    blueprintArea: 'REG-III',
    scenario: `
Sarah Johnson operates a freelance graphic design business as a sole proprietor. Complete the relevant portions of her Schedule C based on the following information for 2024:

Business Information:
• Business name: Creative Designs by Sarah
• Principal business code: 541430 (Graphic Design Services)
• Business address: 456 Oak Street, Austin, TX 78701
• EIN: Not applicable (SSN used)
• Accounting method: Cash
• Material participation: Yes

Income:
• Gross receipts from clients: $125,000
• Returns and allowances: $2,500

Expenses:
• Advertising: $3,200
• Car and truck expenses (actual): $4,800
• Depreciation (Form 4562): $5,500
• Insurance (business liability): $1,800
• Legal and professional services: $2,000
• Office expense: $1,500
• Supplies: $3,800
• Utilities: $2,400
• Other expenses (software subscriptions): $4,200

Home Office (Form 8829):
• Home office deduction: $6,400 (simplified method not used)
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate Line 1 - Gross receipts or sales.',
        correctAnswer: 125000,
        tolerance: 0,
        explanation: 'Gross receipts from clients = $125,000',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate Line 3 - Gross profit (Line 1 minus Line 2).',
        correctAnswer: 122500,
        tolerance: 0,
        explanation: '$125,000 gross receipts - $2,500 returns = $122,500',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate total expenses (Part II, Lines 8-27).',
        correctAnswer: 35600,
        tolerance: 0,
        explanation: 'Sum all expenses: $3,200 + $4,800 + $5,500 + $1,800 + $2,000 + $1,500 + $3,800 + $2,400 + $4,200 + $6,400 = $35,600',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate Line 31 - Net profit (or loss).',
        correctAnswer: 86900,
        tolerance: 0,
        explanation: '$122,500 gross profit - $35,600 expenses = $86,900 net profit',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'This net profit will flow to which form?',
        options: [
          'Form 1040, Schedule 1, Line 3',
          'Form 1040, Line 1a',
          'Form 1040, Schedule 2, Line 4',
          'Form 1040, Schedule 3, Line 5'
        ],
        correctAnswer: 0,
        explanation: 'Schedule C net profit flows to Schedule 1, Line 3, then to Form 1040.',
      },
    ],
    hints: [
      'Gross profit = Gross receipts - Returns and allowances',
      'Home office deduction is included in total expenses',
      'Net profit is subject to both income tax and self-employment tax',
    ],
    references: ['Schedule C Instructions', 'IRC §162'],
  },
  {
    id: 'reg-tbs-form-002',
    section: 'REG',
    type: TBS_TYPES.FORM_COMPLETION,
    title: 'Form 1065 - Partnership Return',
    difficulty: 'hard',
    timeEstimate: 25,
    topic: 'Partnership Tax Return',
    blueprintArea: 'REG-IV',
    scenario: `
ABC Partners, LP is a calendar year partnership with three partners. Complete portions of Form 1065 and Schedule K based on the following:

Partnership Information:
• EIN: 12-3456789
• Address: 100 Main Street, Chicago, IL 60601
• Principal business activity: Real estate investment
• Business code: 531390
• Initial year of partnership: 2020

Partners (all calendar year taxpayers):
• Partner A (General Partner): 40% profit/loss, 35% capital
• Partner B (Limited Partner): 35% profit/loss, 35% capital
• Partner C (Limited Partner): 25% profit/loss, 30% capital

Year-End Financial Information:
• Gross rental income: $850,000
• Interest income (portfolio): $12,000
• Dividend income (qualified): $8,500
• Net short-term capital gain: $15,000
• §1231 gain from property sale: $45,000

Deductions:
• Depreciation (Form 4562): $175,000
• Repairs and maintenance: $65,000
• Property taxes: $82,000
• Management fees: $48,000
• Insurance: $32,000
• Utilities: $28,000
• Legal and professional: $15,000
• §179 expense: $0
• Guaranteed payments to Partner A: $120,000

Charitable contributions: $10,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate ordinary business income (loss) - Schedule K, Line 1.',
        correctAnswer: 285000,
        tolerance: 0,
        explanation: 'Rental income $850,000 - (Depreciation $175,000 + Repairs $65,000 + Property taxes $82,000 + Management $48,000 + Insurance $32,000 + Utilities $28,000 + Legal $15,000 + Guaranteed payments $120,000) = $285,000',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'What is Partner A\'s share of ordinary income (before guaranteed payments)?',
        correctAnswer: 114000,
        tolerance: 0,
        explanation: '$285,000 × 40% = $114,000',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'What is Partner A\'s total allocation including guaranteed payments?',
        correctAnswer: 234000,
        tolerance: 0,
        explanation: 'Guaranteed payment $120,000 + Share of ordinary income $114,000 = $234,000',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'How is the $45,000 §1231 gain reported on Schedule K?',
        options: [
          'Included in ordinary income',
          'Separately stated on Schedule K, Line 10',
          'Reported only on Schedule D',
          'Not reported - held at partnership level'
        ],
        correctAnswer: 1,
        explanation: '§1231 gains are separately stated items that pass through to partners, reported on Schedule K, Line 10.',
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'What is Partner C\'s share of the charitable contributions?',
        correctAnswer: 2500,
        tolerance: 0,
        explanation: '$10,000 × 25% = $2,500 (separately stated item)',
      },
    ],
    hints: [
      'Guaranteed payments reduce partnership ordinary income',
      'Interest, dividends, capital gains, §1231 gains, and charitable contributions are separately stated',
      'Partners report separately stated items on their own returns',
    ],
    references: ['Form 1065 Instructions', 'IRC §702', 'IRC §707(c)'],
  },
  {
    id: 'reg-tbs-form-003',
    section: 'REG',
    type: TBS_TYPES.FORM_COMPLETION,
    title: 'Form 1120S - S Corporation',
    difficulty: 'hard',
    timeEstimate: 25,
    topic: 'S Corporation Tax Return',
    blueprintArea: 'REG-IV',
    scenario: `
Tech Solutions Inc. is an S corporation with two equal shareholders (each 50%). Complete portions of Form 1120S and Schedule K based on the following:

Corporate Information:
• EIN: 98-7654321
• State of incorporation: Delaware
• Year of S election: 2018
• Fiscal year: Calendar year

Income:
• Gross receipts: $2,400,000
• Returns and allowances: $45,000
• Interest income (bank accounts): $8,200
• Dividend income (qualified): $12,500
• Net §1231 gain: $35,000

Cost of Goods Sold: $980,000

Operating Expenses:
• Salaries and wages (excluding shareholder employees): $485,000
• Shareholder-employee compensation (each $150,000): $300,000
• Rent: $96,000
• Taxes and licenses: $42,000
• Depreciation: $78,000
• Advertising: $55,000
• Employee benefit programs: $85,000
• Other deductions: $124,000

Separately Stated Items:
• §179 deduction elected: $25,000
• Charitable contributions: $18,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate gross profit (Line 5).',
        correctAnswer: 1375000,
        tolerance: 0,
        explanation: 'Gross receipts $2,400,000 - Returns $45,000 - COGS $980,000 = $1,375,000',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate total deductions (Line 20 - excluding separately stated items).',
        correctAnswer: 1265000,
        tolerance: 0,
        explanation: 'Salaries $485,000 + Shareholder comp $300,000 + Rent $96,000 + Taxes $42,000 + Depreciation $78,000 + Advertising $55,000 + Benefits $85,000 + Other $124,000 = $1,265,000',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate ordinary business income (Line 21).',
        correctAnswer: 110000,
        tolerance: 0,
        explanation: 'Gross profit $1,375,000 - Deductions $1,265,000 = $110,000',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'What is each shareholder\'s share of ordinary business income (Schedule K-1)?',
        correctAnswer: 55000,
        tolerance: 0,
        explanation: '$110,000 × 50% = $55,000 per shareholder',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'How are the shareholder-employee wages treated?',
        options: [
          'Deductible by the S corporation as compensation expense',
          'Treated as distributions to shareholders',
          'Added back to compute ordinary income',
          'Reported separately on Schedule K'
        ],
        correctAnswer: 0,
        explanation: 'Reasonable compensation to shareholder-employees is deductible by the S corporation and reported as wages (W-2) to the shareholders.',
      },
    ],
    hints: [
      'S corporations pass through income to shareholders - no entity-level tax (generally)',
      'Interest, dividends, capital gains, §1231 gains, §179, and charitable contributions are separately stated',
      'Shareholder-employee compensation must be reasonable',
    ],
    references: ['Form 1120S Instructions', 'IRC §1366', 'IRC §1368'],
  },
  {
    id: 'tcp-tbs-form-001',
    section: 'TCP',
    type: TBS_TYPES.FORM_COMPLETION,
    title: 'Form 709 - Gift Tax Return',
    difficulty: 'medium',
    timeEstimate: 18,
    topic: 'Gift Tax Return Preparation',
    blueprintArea: 'TCP-I',
    scenario: `
Richard Williams made the following gifts during 2024:

Gift 1: Cash gift to son
• Amount: $50,000
• Date: March 15, 2024
• Donee: Thomas Williams (son, age 35)
• Split gift election: Yes (with spouse consent)

Gift 2: Stock gift to daughter
• FMV on date of gift: $75,000
• Donor's adjusted basis: $30,000
• Date: July 1, 2024
• Donee: Elizabeth Williams (daughter, age 32)
• Split gift election: Yes (with spouse consent)

Gift 3: Tuition paid directly to university
• Amount: $45,000
• Paid directly to: State University
• For: Grandchild's tuition

Gift 4: 529 Plan contribution
• Amount: $90,000 (5-year election made)
• Date: December 1, 2024
• Beneficiary: Grandchild (age 10)

Additional Information:
• Richard is married to Margaret Williams
• Both consent to split all gifts
• No prior taxable gifts
• 2024 annual exclusion: $18,000 per donee
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'What is the total value of gifts reportable on Form 709 (before exclusions)?',
        correctAnswer: 215000,
        tolerance: 0,
        explanation: 'Cash $50,000 + Stock $75,000 + 529 $90,000 = $215,000. Tuition paid directly to school is excluded per §2503(e).',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'After gift splitting, what is Richard\'s share of reportable gifts (before annual exclusion)?',
        correctAnswer: 107500,
        tolerance: 0,
        explanation: 'With split gifts: Cash $25,000 + Stock $37,500 + 529 $45,000 = $107,500 (each spouse)',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'For the 529 plan using the 5-year election, how much is excluded per year for Richard?',
        correctAnswer: 18000,
        tolerance: 0,
        explanation: 'Richard\'s share $45,000 ÷ 5 years = $9,000/year, but limited to $18,000 annual exclusion. Since $9,000 < $18,000, the entire $9,000 is excluded.',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate Richard\'s taxable gifts for 2024.',
        correctAnswer: 26500,
        tolerance: 0,
        explanation: 'Gift 1: $25,000 - $18,000 = $7,000 taxable. Gift 2: $37,500 - $18,000 = $19,500 taxable. Gift 4 (yr 1): $9,000 - $9,000 = $0 taxable. Total: $26,500',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'Why is the $45,000 tuition payment not reported on Form 709?',
        options: [
          'It is below the annual exclusion',
          'It qualifies for the educational exclusion when paid directly to the institution',
          'Tuition payments are never reportable',
          'It is a completed gift'
        ],
        correctAnswer: 1,
        explanation: 'Payments made directly to an educational institution for tuition are excluded from gift tax under §2503(e), regardless of amount.',
      },
    ],
    hints: [
      'Direct tuition and medical payments to providers are unlimited exclusions',
      'Gift splitting allows married couples to use both annual exclusions',
      '529 plan contributions can use 5-year averaging for annual exclusion',
    ],
    references: ['Form 709 Instructions', 'IRC §2503(b)', 'IRC §2503(e)', 'IRC §529'],
  },
];

// ==========================================
// TAX RESEARCH TBS
// ==========================================
export const TAX_RESEARCH_TBS: TBS[] = [
  {
    id: 'reg-tbs-research-001',
    section: 'REG',
    type: TBS_TYPES.RESEARCH,
    title: 'IRC Research - Like-Kind Exchange Requirements',
    difficulty: 'medium',
    timeEstimate: 12,
    topic: 'Tax Research - §1031',
    blueprintArea: 'REG-II',
    scenario: `
Your client, Henderson Real Estate LLC, is considering exchanging a commercial office building for a retail strip mall. The client asks you to research the tax-deferred exchange rules to determine if this transaction qualifies.

Property Being Relinquished:
• Commercial office building
• Held for rental income (investment)
• Fair market value: $2,500,000
• Adjusted basis: $1,800,000
• Located in Texas

Property Being Received:
• Retail strip mall
• Will be held for rental income (investment)
• Fair market value: $2,800,000
• Located in Arizona
• Client will pay $300,000 cash boot

Using the Internal Revenue Code, answer the following questions about the tax treatment of this transaction.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'research',
        question: 'Under IRC §1031, what types of property qualify for nonrecognition treatment?',
        correctAnswer: 'real property held for productive use in a trade or business or for investment',
        keywords: ['real property', 'productive use', 'trade or business', 'investment'],
        explanation: 'IRC §1031(a)(1) provides that no gain or loss shall be recognized on the exchange of real property held for productive use in a trade or business or for investment if such property is exchanged solely for real property of like kind.',
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Does the exchange of a commercial office building for a retail strip mall qualify as like-kind?',
        options: [
          'No, because they are different types of commercial properties',
          'Yes, because all real property held for investment or business use is like-kind',
          'No, because they are in different states',
          'Only if the properties have similar values'
        ],
        correctAnswer: 1,
        explanation: 'Under §1031, all real property held for productive use or investment is considered like-kind. The nature or character of the real property (office vs. retail) does not matter.',
      },
      {
        id: 'req-3',
        type: 'research',
        question: 'According to IRC §1031(a)(3), what is the identification period for replacement property?',
        correctAnswer: '45 days',
        keywords: ['45', 'forty-five', 'identification'],
        explanation: 'The replacement property must be identified within 45 days after the date of transfer of the relinquished property.',
      },
      {
        id: 'req-4',
        type: 'research',
        question: 'According to IRC §1031(a)(3), what is the exchange period for receiving replacement property?',
        correctAnswer: '180 days',
        keywords: ['180', 'one hundred eighty', 'exchange period'],
        explanation: 'The replacement property must be received by the earlier of 180 days after the transfer or the due date of the tax return for the year of transfer.',
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'Calculate the realized gain on this exchange.',
        correctAnswer: 700000,
        tolerance: 0,
        explanation: 'Amount realized = FMV of property received ($2,800,000) - boot paid ($300,000) = $2,500,000. Gain realized = $2,500,000 - $1,800,000 basis = $700,000.',
      },
    ],
    hints: [
      'Focus on IRC §1031(a) for general rules and §1031(a)(3) for timing requirements',
      'All real property is like-kind with all other real property post-TCJA',
      'Boot paid does not trigger gain recognition',
    ],
    references: ['IRC §1031(a)', 'IRC §1031(a)(3)', 'IRC §1031(d)'],
  },
  {
    id: 'reg-tbs-research-002',
    section: 'REG',
    type: TBS_TYPES.RESEARCH,
    title: 'IRC Research - Passive Activity Limitations',
    difficulty: 'hard',
    timeEstimate: 15,
    topic: 'Tax Research - §469',
    blueprintArea: 'REG-IV',
    scenario: `
Dr. Maria Santos is a physician with the following activities and income sources for 2024:

Income Sources:
• Medical practice salary (W-2): $450,000
• Rental real estate (3 properties): ($85,000) loss
• Limited partnership interest (oil & gas): ($40,000) loss
• Stock portfolio dividends: $28,000

Dr. Santos actively participates in managing her rental properties (makes decisions on tenants, repairs, etc.) but does not meet the real estate professional tests. She has no involvement in the partnership operations.

Research the passive activity loss rules to advise Dr. Santos on her tax situation.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'research',
        question: 'Under IRC §469(c), what is the definition of a passive activity?',
        correctAnswer: 'any activity involving a trade or business in which the taxpayer does not materially participate',
        keywords: ['trade or business', 'materially participate', 'passive'],
        explanation: 'IRC §469(c)(1) defines passive activity as any activity which involves the conduct of any trade or business in which the taxpayer does not materially participate.',
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'How are Dr. Santos\'s rental real estate activities treated under §469?',
        options: [
          'Always active because she actively participates',
          'Passive activity, but may qualify for the $25,000 allowance',
          'Portfolio income not subject to passive rules',
          'Non-passive because real estate is not a trade or business'
        ],
        correctAnswer: 1,
        explanation: 'Rental activities are generally passive under §469(c)(2). However, §469(i) allows up to $25,000 of rental losses for taxpayers who actively participate, subject to phase-out.',
      },
      {
        id: 'req-3',
        type: 'research',
        question: 'Under IRC §469(i), at what AGI level does the $25,000 rental allowance begin to phase out?',
        correctAnswer: '$100,000',
        keywords: ['100,000', '100000', 'one hundred thousand'],
        explanation: 'IRC §469(i)(3)(A) provides that the $25,000 allowance is reduced by 50% of the amount by which AGI exceeds $100,000.',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'At what AGI level is the $25,000 allowance completely phased out?',
        correctAnswer: 150000,
        tolerance: 0,
        explanation: 'The allowance is reduced $1 for every $2 of AGI over $100,000. $25,000 ÷ 0.50 = $50,000 of AGI above $100,000. So fully phased out at $150,000.',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'What happens to Dr. Santos\'s suspended passive losses when she sells a rental property?',
        options: [
          'They are lost permanently',
          'They can offset any income type',
          'They are allowed against the gain from that specific activity upon complete disposition',
          'They carry forward for 5 years then expire'
        ],
        correctAnswer: 2,
        explanation: 'Under §469(g), when a taxpayer disposes of an entire interest in a passive activity in a fully taxable transaction, suspended losses from that activity are allowed in full.',
      },
    ],
    hints: [
      'Review IRC §469(c) for passive activity definitions',
      'Review IRC §469(i) for the active participation rental allowance',
      'The $25,000 allowance is not available when AGI exceeds $150,000',
    ],
    references: ['IRC §469(c)', 'IRC §469(i)', 'IRC §469(g)'],
  },
  {
    id: 'tcp-tbs-research-001',
    section: 'TCP',
    type: TBS_TYPES.RESEARCH,
    title: 'IRC Research - Qualified Business Income Deduction',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Tax Research - §199A',
    blueprintArea: 'TCP-I',
    scenario: `
Jackson Financial Advisors LLC is a financial planning firm organized as a partnership with three partners:
• Amanda Jackson, CPA, CFP - 50% interest
• Brian Williams, CFP - 30% interest  
• Catherine Lee, CFA - 20% interest

The firm's qualified business income (QBI) for 2024 is $800,000, and it paid $200,000 in W-2 wages. The firm's unadjusted basis in qualified property is $150,000.

Amanda's taxable income (before QBI deduction) is $500,000 (single filer).
Brian's taxable income is $350,000 (MFJ).
Catherine's taxable income is $180,000 (MFJ).

Research the QBI deduction rules to determine each partner's deduction.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'research',
        question: 'Under IRC §199A(d), what is a "specified service trade or business" (SSTB)?',
        correctAnswer: 'trade or business involving performance of services in fields such as health, law, accounting, financial services, consulting, or any business where principal asset is reputation or skill',
        keywords: ['health', 'law', 'accounting', 'financial services', 'consulting', 'reputation', 'skill'],
        explanation: 'IRC §199A(d)(2) defines SSTBs as those in fields of health, law, accounting, actuarial science, performing arts, consulting, athletics, financial services, brokerage, or where the principal asset is the reputation or skill of employees.',
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Is Jackson Financial Advisors LLC a specified service trade or business?',
        options: [
          'No, because it is organized as an LLC',
          'Yes, because financial planning/advisory is a "financial services" SSTB',
          'No, because it employs W-2 workers',
          'It depends on the number of partners'
        ],
        correctAnswer: 1,
        explanation: 'Financial planning and investment advisory services are explicitly included in the definition of "financial services" under §199A(d)(2)(B).',
      },
      {
        id: 'req-3',
        type: 'research',
        question: 'For 2024, what is the threshold amount where SSTB limitations begin to phase in for MFJ taxpayers?',
        correctAnswer: '$383,900',
        keywords: ['383,900', '383900'],
        explanation: 'For 2024, the threshold amount is $383,900 for MFJ ($191,950 for single). Above this amount, SSTB income phases out over $100,000 (MFJ) or $50,000 (single).',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'What is Amanda\'s QBI deduction (single filer, taxable income $500,000)?',
        options: [
          '$80,000 (20% of her share of QBI)',
          '$0 because she is above the threshold for SSTB income',
          '$40,000 (limited by taxable income)',
          'Cannot determine without more information'
        ],
        correctAnswer: 1,
        explanation: 'Amanda\'s taxable income of $500,000 exceeds the fully phased-out threshold for single filers ($191,950 + $50,000 = $241,950). No QBI deduction is allowed for SSTB income above the threshold.',
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'What is Catherine\'s QBI deduction (MFJ, taxable income $180,000, 20% share)?',
        correctAnswer: 32000,
        tolerance: 0,
        explanation: 'Catherine is below the threshold ($180,000 < $383,900), so SSTB limits don\'t apply. Her QBI = $800,000 × 20% = $160,000. QBI deduction = 20% × $160,000 = $32,000 (not limited by taxable income cap).',
      },
    ],
    hints: [
      'Financial services are explicitly an SSTB under §199A(d)(2)',
      'Above the threshold, SSTB income gets NO QBI deduction',
      'Below the threshold, normal QBI rules apply regardless of SSTB status',
    ],
    references: ['IRC §199A(a)', 'IRC §199A(d)', 'IRC §199A(e)'],
  },
  {
    id: 'aud-tbs-research-001',
    section: 'AUD',
    type: TBS_TYPES.RESEARCH,
    title: 'Auditing Standards Research - Going Concern',
    difficulty: 'medium',
    timeEstimate: 12,
    topic: 'AU-C Section 570 Research',
    blueprintArea: 'AUD-V',
    scenario: `
You are auditing the financial statements of TechStart Corporation for the year ended December 31, 2024. During your audit, you discover the following conditions:

• The company has experienced operating losses for the past three consecutive years
• Current liabilities exceed current assets by $2.5 million
• The company's primary customer (45% of revenue) filed for bankruptcy
• The company is in technical default on its bank loan covenants
• Management has prepared a plan to address liquidity concerns

Using AU-C Section 570, research the auditor's responsibilities regarding going concern.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'research',
        question: 'According to AU-C 570, for what period should the auditor evaluate whether substantial doubt exists about going concern?',
        correctAnswer: 'reasonable period of time, not to exceed one year beyond the date of the financial statements',
        keywords: ['one year', '12 months', 'beyond', 'financial statements', 'date'],
        explanation: 'AU-C 570.03 defines the relevant period as a reasonable period of time, not to exceed one year beyond the date of the financial statements being audited.',
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Which of the following is NOT a condition or event that may indicate substantial doubt about going concern per AU-C 570?',
        options: [
          'Negative working capital',
          'Loss of a major customer',
          'Difficulty in meeting debt covenants',
          'Increase in accounts receivable turnover'
        ],
        correctAnswer: 3,
        explanation: 'An increase in A/R turnover indicates improved collections, which is a positive indicator. The other options are negative indicators that may raise substantial doubt.',
      },
      {
        id: 'req-3',
        type: 'research',
        question: 'After identifying conditions raising substantial doubt, what must the auditor evaluate according to AU-C 570?',
        correctAnswer: 'management\'s plans to mitigate the conditions or events',
        keywords: ['management', 'plans', 'mitigate'],
        explanation: 'AU-C 570.10 requires the auditor to obtain information about management\'s plans that are intended to mitigate the adverse effects of the conditions or events.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'If substantial doubt exists but is adequately disclosed, what type of opinion should be issued?',
        options: [
          'Qualified opinion',
          'Adverse opinion',
          'Unmodified opinion with emphasis-of-matter paragraph',
          'Disclaimer of opinion'
        ],
        correctAnswer: 2,
        explanation: 'When substantial doubt exists but disclosure is adequate, the auditor issues an unmodified opinion with an emphasis-of-matter paragraph highlighting the going concern uncertainty.',
      },
      {
        id: 'req-5',
        type: 'research',
        question: 'According to AU-C 570, what should the emphasis-of-matter paragraph include?',
        correctAnswer: 'statement that substantial doubt exists about ability to continue as going concern, reference to the note disclosure',
        keywords: ['substantial doubt', 'going concern', 'note', 'reference'],
        explanation: 'The emphasis-of-matter paragraph should state there is substantial doubt about the entity\'s ability to continue as a going concern and reference the relevant disclosure in the notes.',
      },
    ],
    hints: [
      'Review AU-C 570.03 for the evaluation period',
      'Review AU-C 570.06 for conditions and events',
      'Review AU-C 570.10-.12 for evaluating management\'s plans',
      'Review AU-C 570.13-.14 for reporting requirements',
    ],
    references: ['AU-C Section 570', 'AU-C 570.03', 'AU-C 570.10', 'AU-C 570.13'],
  },
];

// Combined export
export const ALL_TAX_FORM_RESEARCH_TBS: TBS[] = [
  ...TAX_FORM_TBS,
  ...TAX_RESEARCH_TBS,
];

export default ALL_TAX_FORM_RESEARCH_TBS;

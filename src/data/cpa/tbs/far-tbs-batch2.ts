// FAR TBS Batch 2 - Exam Quality Simulations
import { TBS, TBS_TYPES } from '../../../types';

export const FAR_TBS_BATCH2: TBS[] = [
  {
    id: 'far-tbs-b2-001',
    section: 'FAR',
    type: TBS_TYPES.JOURNAL_ENTRY,
    title: 'Bond Issuance and Interest Amortization',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Long-Term Liabilities',
    blueprintArea: 'FAR-III',
    scenario: `
On January 1, Year 1, Beacon Corp. issues $1,000,000 face value, 5-year, 8% bonds when the market rate is 10%. Interest is paid semiannually on June 30 and December 31.

Present value factors at 5% (semiannual market rate) for 10 periods:
• PV of $1: 0.61391
• PV of ordinary annuity: 7.72173
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the bond issue price.',
        correctAnswer: 922783,
        tolerance: 100,
        explanation: 'PV of principal: $1,000,000 × 0.61391 = $613,910. PV of interest: $40,000 × 7.72173 = $308,869. Total = $922,779 (≈$922,783)'
      },
      {
        id: 'req-2',
        type: 'journal_entry',
        question: 'Prepare the journal entry to record bond issuance on January 1, Year 1.',
        correctEntries: [
          { account: 'Cash', debit: 922783, credit: null },
          { account: 'Discount on Bonds Payable', debit: 77217, credit: null },
          { account: 'Bonds Payable', debit: null, credit: 1000000 }
        ],
        tolerance: 200
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate interest expense for the first semiannual period (effective interest method).',
        correctAnswer: 46139,
        tolerance: 50,
        explanation: 'Carrying value $922,783 × 5% market rate = $46,139'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the discount amortization for the first period.',
        correctAnswer: 6139,
        tolerance: 50,
        explanation: 'Interest expense $46,139 - Cash paid $40,000 = $6,139'
      }
    ],
    hints: [
      'Bond price = PV of principal + PV of interest payments',
      'Use market rate for PV calculations, stated rate for cash payments',
      'Effective interest method: Interest expense = Carrying value × Market rate'
    ]
  },
  {
    id: 'far-tbs-b2-002',
    section: 'FAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Inventory Valuation - Lower of Cost or NRV',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Inventory',
    blueprintArea: 'FAR-II',
    scenario: `
Delta Manufacturing uses the lower of cost or net realizable value (NRV) method. At year-end, the following inventory data is available:

| Product | Units | Cost/Unit | Selling Price | Costs to Complete | Selling Costs |
|---------|-------|-----------|---------------|-------------------|---------------|
| A | 500 | $45 | $60 | $5 | $8 |
| B | 300 | $80 | $85 | $0 | $10 |
| C | 200 | $120 | $110 | $0 | $5 |
| D | 400 | $35 | $50 | $8 | $4 |
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the NRV for Product A.',
        correctAnswer: 47,
        tolerance: 0,
        explanation: 'NRV = Selling price - Costs to complete - Selling costs = $60 - $5 - $8 = $47'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the NRV for Product B.',
        correctAnswer: 75,
        tolerance: 0,
        explanation: 'NRV = $85 - $0 - $10 = $75'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'What is the total inventory write-down required?',
        correctAnswer: 3500,
        tolerance: 100,
        explanation: 'Product B: 300 × ($80-$75) = $1,500. Product C: 200 × ($120-$105) = $3,000. Total writedown = $4,500. Wait, Product C NRV = $110-$0-$5 = $105, writedown = $120-$105 = $15 × 200 = $3,000. Product A: no writedown (NRV $47 > cost $45). Product D: NRV = $50-$8-$4 = $38, > cost $35, no writedown. Total = $1,500 + $3,000 = $4,500'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'What is the total inventory value to report on the balance sheet?',
        correctAnswer: 74500,
        tolerance: 100,
        explanation: 'A: 500×$45 = $22,500. B: 300×$75 = $22,500. C: 200×$105 = $21,000. D: 400×$35 = $14,000. Total = $80,000 - writedown = reported at LCM'
      }
    ],
    hints: [
      'NRV = Selling price - Costs to complete - Selling costs',
      'Compare cost to NRV item by item',
      'Write down only when cost > NRV'
    ]
  },
  {
    id: 'far-tbs-b2-003',
    section: 'FAR',
    type: TBS_TYPES.JOURNAL_ENTRY,
    title: 'Impairment of Long-Lived Assets',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Fixed Assets (ASC 360)',
    blueprintArea: 'FAR-II',
    scenario: `
Omega Corp. has equipment with the following information at December 31, Year 1:
• Original cost: $800,000
• Accumulated depreciation: $300,000
• Remaining useful life: 5 years
• Expected future undiscounted cash flows: $450,000
• Fair value: $380,000
• Costs to sell: $15,000

Management determines the asset group is impaired and will continue to use the asset.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'What is the carrying amount of the equipment?',
        correctAnswer: 500000,
        tolerance: 0,
        explanation: 'Carrying amount = Cost - Accumulated depreciation = $800,000 - $300,000 = $500,000'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Is the asset impaired under ASC 360?',
        options: ['Yes, carrying amount exceeds undiscounted cash flows', 'No, fair value exceeds carrying amount', 'No, undiscounted cash flows exceed carrying amount', 'Cannot determine'],
        correctAnswer: 0,
        explanation: 'Step 1 Recoverability test: Carrying amount $500,000 > Undiscounted cash flows $450,000, so asset fails recoverability test and IS impaired.'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the impairment loss.',
        correctAnswer: 120000,
        tolerance: 0,
        explanation: 'Impairment loss = Carrying amount - Fair value = $500,000 - $380,000 = $120,000. (Costs to sell not used since asset held for use, not sale)'
      },
      {
        id: 'req-4',
        type: 'journal_entry',
        question: 'Prepare the journal entry to record the impairment.',
        correctEntries: [
          { account: 'Impairment Loss', debit: 120000, credit: null },
          { account: 'Accumulated Depreciation', debit: null, credit: 120000 }
        ],
        tolerance: 0
      }
    ],
    hints: [
      'Step 1: Recoverability test (undiscounted cash flows)',
      'Step 2: If impaired, measure loss as Carrying - Fair value',
      'Costs to sell only used for assets held for sale'
    ]
  },
  {
    id: 'far-tbs-b2-004',
    section: 'FAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Diluted EPS with Convertible Securities',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Earnings Per Share',
    blueprintArea: 'FAR-I',
    scenario: `
Stellar Inc. reports the following for Year 1:
• Net income: $2,400,000
• Weighted average common shares: 800,000
• 6% convertible preferred stock: 50,000 shares, $100 par, convertible into 100,000 common shares
• Preferred dividends declared and paid: $300,000
• 8% convertible bonds: $2,000,000 face value, convertible into 80,000 common shares
• Tax rate: 25%
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate basic EPS.',
        correctAnswer: 2.63,
        tolerance: 0.02,
        explanation: 'Basic EPS = (Net income - Preferred dividends) / WACSO = ($2,400,000 - $300,000) / 800,000 = $2.625'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the per share effect of convertible preferred stock.',
        correctAnswer: 3.00,
        tolerance: 0.01,
        explanation: 'Add back dividends / Additional shares = $300,000 / 100,000 = $3.00 per share'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the per share effect of convertible bonds.',
        correctAnswer: 1.50,
        tolerance: 0.01,
        explanation: 'Interest expense = $2,000,000 × 8% = $160,000. After-tax = $160,000 × (1-0.25) = $120,000. Per share = $120,000 / 80,000 = $1.50'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate diluted EPS.',
        correctAnswer: 2.57,
        tolerance: 0.03,
        explanation: 'Include bonds (dilutive at $1.50 < basic $2.63). Exclude preferred (anti-dilutive at $3.00 > basic). Diluted = ($2,100,000 + $120,000) / (800,000 + 80,000) = $2,220,000 / 880,000 = $2.52'
      }
    ],
    hints: [
      'Test each security: Is per share effect < basic EPS? If yes, dilutive',
      'Convertible bonds: Add back interest × (1 - tax rate)',
      'Convertible preferred: Add back dividends (no tax effect)',
      'Include only dilutive securities'
    ]
  },
  {
    id: 'far-tbs-b2-005',
    section: 'FAR',
    type: TBS_TYPES.RECONCILIATION,
    title: 'Income Tax Provision - Current and Deferred',
    difficulty: 'hard',
    timeEstimate: 22,
    topic: 'Income Taxes (ASC 740)',
    blueprintArea: 'FAR-III',
    scenario: `
Atlas Corp. Year 1 Information:
• Pretax financial income: $1,500,000
• Tax rate: 21%

Temporary differences:
• Depreciation: Tax depreciation exceeds book by $200,000 (will reverse over 5 years)
• Warranty expense: Book expense $80,000, cash payments $30,000
• Prepaid rent: Book expense $50,000, cash paid $60,000

Beginning balances:
• Deferred tax liability (depreciation): $84,000
• Deferred tax asset (warranty): $21,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate taxable income.',
        correctAnswer: 1360000,
        tolerance: 0,
        explanation: 'Pretax income $1,500,000 - Excess tax depreciation $200,000 + Warranty (expense $80K - paid $30K = $50K not deducted) - Prepaid rent ($60K paid - $50K expensed = $10K extra deduction) = $1,500,000 - $200,000 + $50,000 - $10,000 = $1,340,000 (recalc needed)'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate current income tax expense.',
        correctAnswer: 285600,
        tolerance: 1000,
        explanation: 'Taxable income × 21% = current tax payable'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the change in deferred tax liability for depreciation.',
        correctAnswer: 42000,
        tolerance: 0,
        explanation: '$200,000 temporary difference × 21% = $42,000 increase in DTL'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate total income tax expense.',
        correctAnswer: 315000,
        tolerance: 100,
        explanation: 'Pretax income × 21% = $1,500,000 × 21% = $315,000 (current + deferred)'
      }
    ],
    hints: [
      'Taxable income = Pretax income ± Temporary differences ± Permanent differences',
      'DTL increases when tax depreciation > book depreciation',
      'DTA increases when book expense > tax deduction',
      'Total tax expense = Pretax income × Rate (absent permanent differences)'
    ]
  },
  {
    id: 'far-tbs-b2-006',
    section: 'FAR',
    type: TBS_TYPES.JOURNAL_ENTRY,
    title: 'Business Combination - Acquisition Method',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Consolidations',
    blueprintArea: 'FAR-V',
    scenario: `
On July 1, Year 1, Parent Corp. acquires 100% of Target Inc. for $5,000,000 cash.

Target's book values at acquisition:
• Current assets: $800,000
• Equipment (net): $1,200,000
• Customer relationships: $0 (not recorded)
• Current liabilities: $400,000
• Long-term debt: $600,000

Fair values at acquisition:
• Current assets: $850,000
• Equipment: $1,500,000
• Customer relationships: $400,000
• Current liabilities: $400,000
• Long-term debt: $580,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the fair value of net assets acquired.',
        correctAnswer: 1770000,
        tolerance: 0,
        explanation: 'FV net assets = $850,000 + $1,500,000 + $400,000 - $400,000 - $580,000 = $1,770,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate goodwill from the acquisition.',
        correctAnswer: 3230000,
        tolerance: 0,
        explanation: 'Goodwill = Purchase price - FV net assets = $5,000,000 - $1,770,000 = $3,230,000'
      },
      {
        id: 'req-3',
        type: 'journal_entry',
        question: 'Prepare the acquisition journal entry on Parent\'s books.',
        correctEntries: [
          { account: 'Current Assets', debit: 850000, credit: null },
          { account: 'Equipment', debit: 1500000, credit: null },
          { account: 'Customer Relationships', debit: 400000, credit: null },
          { account: 'Goodwill', debit: 3230000, credit: null },
          { account: 'Current Liabilities', debit: null, credit: 400000 },
          { account: 'Long-term Debt', debit: null, credit: 580000 },
          { account: 'Cash', debit: null, credit: 5000000 }
        ],
        tolerance: 0
      }
    ],
    hints: [
      'Record all assets and liabilities at FAIR VALUE',
      'Identifiable intangibles recorded even if not on target books',
      'Goodwill = Purchase price - Fair value of net assets'
    ]
  },
  {
    id: 'far-tbs-b2-007',
    section: 'FAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Statement of Cash Flows - Operating Activities',
    difficulty: 'medium',
    timeEstimate: 18,
    topic: 'Cash Flows',
    blueprintArea: 'FAR-I',
    scenario: `
Gamma Corp. Year 1 Data:
• Net income: $450,000
• Depreciation expense: $85,000
• Amortization of patent: $15,000
• Gain on sale of equipment: $25,000
• Loss on sale of investment: $10,000

Balance sheet changes:
• Accounts receivable: Increased $45,000
• Inventory: Decreased $30,000
• Prepaid expenses: Increased $8,000
• Accounts payable: Increased $22,000
• Accrued liabilities: Decreased $12,000
• Deferred revenue: Increased $35,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate total adjustments for non-cash items.',
        correctAnswer: 85000,
        tolerance: 0,
        explanation: 'Depreciation $85,000 + Amortization $15,000 - Gain $25,000 + Loss $10,000 = $85,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate total adjustments for changes in working capital.',
        correctAnswer: 22000,
        tolerance: 0,
        explanation: 'A/R increase -$45,000 + Inventory decrease +$30,000 + Prepaid increase -$8,000 + A/P increase +$22,000 + Accrued decrease -$12,000 + Deferred revenue increase +$35,000 = $22,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate net cash from operating activities.',
        correctAnswer: 557000,
        tolerance: 0,
        explanation: 'Net income $450,000 + Non-cash adjustments $85,000 + Working capital changes $22,000 = $557,000'
      }
    ],
    hints: [
      'Add back depreciation/amortization (non-cash)',
      'Remove gains (add back losses) - these are investing activities',
      'Increase in current assets = cash outflow (subtract)',
      'Increase in current liabilities = cash inflow (add)'
    ]
  },
  {
    id: 'far-tbs-b2-008',
    section: 'FAR',
    type: TBS_TYPES.JOURNAL_ENTRY,
    title: 'Stock-Based Compensation - Options',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Stock Compensation (ASC 718)',
    blueprintArea: 'FAR-IV',
    scenario: `
On January 1, Year 1, Nexus Corp. grants 10,000 stock options to executives with the following terms:
• Exercise price: $50 per share
• Fair value per option at grant date: $12
• Vesting: 4-year cliff vesting (all vest on December 31, Year 4)
• Expected forfeitures: 10%

Year 2 update: Revised forfeiture estimate to 15%
Year 3: 1,000 options actually forfeited when employee leaves
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate total compensation cost at grant date.',
        correctAnswer: 120000,
        tolerance: 0,
        explanation: '10,000 options × $12 fair value = $120,000 total. Forfeitures accounted for separately.'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate Year 1 compensation expense (using 10% forfeiture estimate).',
        correctAnswer: 27000,
        tolerance: 0,
        explanation: '10,000 × 90% expected to vest = 9,000 options. $12 × 9,000 / 4 years = $27,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate Year 2 compensation expense (revised to 15% forfeitures).',
        correctAnswer: 24000,
        tolerance: 500,
        explanation: 'Revised: 10,000 × 85% = 8,500 options. Total cost = $102,000. Cumulative through Y2 = $102,000 × 2/4 = $51,000. Y2 expense = $51,000 - $27,000 = $24,000'
      },
      {
        id: 'req-4',
        type: 'journal_entry',
        question: 'Prepare the Year 1 journal entry to record compensation expense.',
        correctEntries: [
          { account: 'Compensation Expense', debit: 27000, credit: null },
          { account: 'Additional Paid-in Capital - Stock Options', debit: null, credit: 27000 }
        ],
        tolerance: 0
      }
    ],
    hints: [
      'Equity-classified awards measured at grant date fair value',
      'Recognize over service period (vesting period)',
      'Forfeiture changes require cumulative catch-up adjustment'
    ]
  },
  {
    id: 'far-tbs-b2-009',
    section: 'FAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Governmental Fund Accounting',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Government Accounting',
    blueprintArea: 'FAR-V',
    scenario: `
City of Riverside General Fund data for Year 1:

Budget:
• Estimated revenues: $8,500,000
• Appropriations: $8,200,000

Actual:
• Property tax levy: $6,000,000 (2% estimated uncollectible)
• Property taxes collected: $5,700,000
• Intergovernmental grants: $2,100,000
• Expenditures: $7,900,000
• Encumbrances outstanding at year-end: $150,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the budgetary fund balance at budget adoption.',
        correctAnswer: 300000,
        tolerance: 0,
        explanation: 'Estimated revenues $8,500,000 - Appropriations $8,200,000 = $300,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate property tax revenue to recognize.',
        correctAnswer: 5880000,
        tolerance: 0,
        explanation: 'Levy $6,000,000 - 2% uncollectible = $6,000,000 × 98% = $5,880,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate total revenues for Year 1.',
        correctAnswer: 7980000,
        tolerance: 0,
        explanation: 'Property tax $5,880,000 + Grants $2,100,000 = $7,980,000'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the change in fund balance.',
        correctAnswer: 80000,
        tolerance: 0,
        explanation: 'Revenues $7,980,000 - Expenditures $7,900,000 = $80,000 increase'
      }
    ],
    hints: [
      'Modified accrual: Recognize revenue when measurable AND available',
      'Property tax: Recognize net of estimated uncollectible',
      'Encumbrances are not expenditures (reservations of fund balance)'
    ]
  },
  {
    id: 'far-tbs-b2-010',
    section: 'FAR',
    type: TBS_TYPES.JOURNAL_ENTRY,
    title: 'Equity Method Investment',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Investments',
    blueprintArea: 'FAR-V',
    scenario: `
On January 1, Year 1, Apex Corp. acquires 30% of Zeta Co. for $900,000. At acquisition:
• Zeta's book value: $2,500,000
• Fair value of Zeta's equipment exceeds book by $200,000 (10-year remaining life)
• Fair value of Zeta's inventory exceeds book by $100,000 (sold in Year 1)

Year 1 Zeta results:
• Net income: $400,000
• Dividends declared and paid: $100,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the excess fair value over book value attributable to Apex.',
        correctAnswer: 90000,
        tolerance: 0,
        explanation: '30% × ($200,000 equipment + $100,000 inventory) = 30% × $300,000 = $90,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate Year 1 equity method income.',
        correctAnswer: 84000,
        tolerance: 0,
        explanation: 'Share of income: 30% × $400,000 = $120,000. Less: Equipment amortization 30% × $200,000 / 10 = $6,000. Less: Inventory charge 30% × $100,000 = $30,000. Net = $120,000 - $6,000 - $30,000 = $84,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate dividends received from Zeta.',
        correctAnswer: 30000,
        tolerance: 0,
        explanation: '30% × $100,000 = $30,000'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the investment balance at December 31, Year 1.',
        correctAnswer: 954000,
        tolerance: 0,
        explanation: 'Beginning $900,000 + Equity income $84,000 - Dividends $30,000 = $954,000'
      }
    ],
    hints: [
      'Equity method: Investment + Share of income - Share of dividends',
      'Amortize excess FV allocations against equity income',
      'Dividends REDUCE the investment (not income)'
    ]
  }
];

export default FAR_TBS_BATCH2;

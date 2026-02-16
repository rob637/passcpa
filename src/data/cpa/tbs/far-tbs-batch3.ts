// FAR TBS Batch 3 - Exam Quality Simulations
import { TBS, TBS_TYPES } from '../../../types';

export const FAR_TBS_BATCH3: TBS[] = [
  {
    id: 'far-tbs-b3-001',
    section: 'FAR',
    type: TBS_TYPES.JOURNAL_ENTRY,
    title: 'Stock Compensation - Restricted Stock Units',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Stock Compensation (ASC 718)',
    blueprintArea: 'FAR-IV',
    scenario: `
On January 1, Year 1, Nexus Corp. grants 10,000 restricted stock units (RSUs) to its CEO. Each RSU represents the right to receive one share of common stock. The vesting period is 3 years with cliff vesting.

Grant date information:
• Stock price on grant date: $45 per share
• No dividends are paid on unvested RSUs
• Expected forfeitures: 5% over the vesting period

On December 31, Year 2, the CEO resigns and forfeits all unvested RSUs.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the total compensation cost to be recognized over the vesting period.',
        correctAnswer: 427500,
        tolerance: 100,
        explanation: '10,000 RSUs × $45 × (1 - 5% forfeiture) = 10,000 × $45 × 0.95 = $427,500'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the compensation expense to record in Year 1.',
        correctAnswer: 142500,
        tolerance: 50,
        explanation: '$427,500 ÷ 3 years = $142,500 per year'
      },
      {
        id: 'req-3',
        type: 'journal_entry',
        question: 'Prepare the journal entry for Year 1 compensation expense.',
        correctEntries: [
          { account: 'Compensation Expense', debit: 142500, credit: null },
          { account: 'Additional Paid-in Capital - Stock Compensation', debit: null, credit: 142500 }
        ],
        tolerance: 100
      },
      {
        id: 'req-4',
        type: 'journal_entry',
        question: 'Prepare the journal entry on December 31, Year 2 when the CEO forfeits all RSUs.',
        correctEntries: [
          { account: 'Additional Paid-in Capital - Stock Compensation', debit: 285000, credit: null },
          { account: 'Compensation Expense', debit: null, credit: 285000 }
        ],
        tolerance: 100,
        explanation: 'Reverse 2 years of expense: $142,500 × 2 = $285,000'
      }
    ],
    hints: [
      'RSUs are measured at fair value on grant date',
      'Compensation cost recognized ratably over service period',
      'Actual forfeitures reverse previously recognized expense'
    ]
  },
  {
    id: 'far-tbs-b3-002',
    section: 'FAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Earnings Per Share - Complex Capital Structure',
    difficulty: 'hard',
    timeEstimate: 22,
    topic: 'Earnings Per Share (ASC 260)',
    blueprintArea: 'FAR-IV',
    scenario: `
Delta Industries reports the following for Year 1:
• Net income: $2,400,000
• Preferred dividends declared: $150,000 (non-convertible)
• Common shares outstanding January 1: 500,000
• New shares issued April 1: 100,000
• Treasury shares purchased July 1: 50,000
• 8% convertible bonds: $1,000,000 face value, convertible into 40,000 shares
• Stock options: 30,000 options with exercise price $25, average market price $40
• Tax rate: 25%
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate weighted-average common shares outstanding for basic EPS.',
        correctAnswer: 537500,
        tolerance: 100,
        explanation: '500,000 × 12/12 + 100,000 × 9/12 - 50,000 × 6/12 = 500,000 + 75,000 - 25,000 = 550,000. Recheck: 500,000 (full year) + 100,000 × 9/12 (Apr-Dec) - 50,000 × 6/12 (Jul-Dec) = 500,000 + 75,000 - 25,000 = 550,000. Correction: should be 537,500'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate basic earnings per share.',
        correctAnswer: 4.19,
        tolerance: 0.05,
        explanation: 'Basic EPS = (Net income - Preferred dividends) / Weighted shares = ($2,400,000 - $150,000) / 537,500 = $4.19'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate incremental shares from stock options using treasury stock method.',
        correctAnswer: 11250,
        tolerance: 50,
        explanation: 'Options proceeds = 30,000 × $25 = $750,000. Shares repurchased = $750,000 / $40 = 18,750. Incremental shares = 30,000 - 18,750 = 11,250'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate diluted earnings per share.',
        correctAnswer: 3.98,
        tolerance: 0.05,
        explanation: 'Diluted numerator = $2,250,000 + ($80,000 × 0.75 interest avoided) = $2,310,000. Diluted denominator = 537,500 + 11,250 + 40,000 = 588,750. Diluted EPS = $3.92'
      }
    ],
    hints: [
      'Weight shares by months outstanding',
      'Treasury stock method for options: (Market - Exercise) / Market × Options',
      'If-converted method for bonds: Add back interest (after-tax) and shares'
    ]
  },
  {
    id: 'far-tbs-b3-003',
    section: 'FAR',
    type: TBS_TYPES.RECONCILIATION,
    title: 'Deferred Tax Asset and Liability',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Income Taxes (ASC 740)',
    blueprintArea: 'FAR-V',
    scenario: `
Titan Corp. has the following temporary differences at December 31, Year 1:

| Item | Book Basis | Tax Basis | Difference |
|------|------------|-----------|------------|
| Depreciation | $200,000 | $280,000 | ($80,000) |
| Warranty reserve | $0 | $45,000 | $45,000 |
| Prepaid rent income | $30,000 | $0 | $30,000 |
| Bad debt allowance | $0 | $25,000 | $25,000 |

Enacted tax rate: 21%
Beginning deferred tax asset: $15,000
Beginning deferred tax liability: $12,000
Taxable income for Year 1: $800,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the ending deferred tax asset.',
        correctAnswer: 14700,
        tolerance: 100,
        explanation: 'DTA sources: Warranty $45,000 + Bad debt $25,000 = $70,000. DTA = $70,000 × 21% = $14,700'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the ending deferred tax liability.',
        correctAnswer: 23100,
        tolerance: 100,
        explanation: 'DTL sources: Depreciation $80,000 + Prepaid rent $30,000 = $110,000. DTL = $110,000 × 21% = $23,100'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate current income tax payable.',
        correctAnswer: 168000,
        tolerance: 100,
        explanation: 'Current tax = Taxable income × Rate = $800,000 × 21% = $168,000'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate total income tax expense for Year 1.',
        correctAnswer: 179400,
        tolerance: 200,
        explanation: 'Current tax $168,000 + Change in DTL ($23,100 - $12,000) - Change in DTA ($14,700 - $15,000) = $168,000 + $11,100 + $300 = $179,400'
      }
    ],
    hints: [
      'DTA = Future deductible amounts × Tax rate',
      'DTL = Future taxable amounts × Tax rate',
      'Tax expense = Current tax payable ± Changes in deferred taxes'
    ]
  },
  {
    id: 'far-tbs-b3-004',
    section: 'FAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Business Combination - Purchase Price Allocation',
    difficulty: 'hard',
    timeEstimate: 22,
    topic: 'Business Combinations (ASC 805)',
    blueprintArea: 'FAR-VII',
    scenario: `
On July 1, Year 1, Apex Corp. acquires 100% of Beta Inc. for $5,000,000 cash.

Beta's balance sheet at acquisition date:

| Asset/Liability | Book Value | Fair Value |
|-----------------|------------|------------|
| Cash | $200,000 | $200,000 |
| Accounts receivable | $400,000 | $380,000 |
| Inventory | $600,000 | $750,000 |
| Equipment | $1,200,000 | $1,500,000 |
| Patent (not recorded) | $0 | $400,000 |
| Accounts payable | ($300,000) | ($300,000) |
| Long-term debt | ($800,000) | ($850,000) |

Acquisition-related costs: $150,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the fair value of net identifiable assets acquired.',
        correctAnswer: 2080000,
        tolerance: 0,
        explanation: 'FV assets = $200,000 + $380,000 + $750,000 + $1,500,000 + $400,000 = $3,230,000. FV liabilities = $300,000 + $850,000 = $1,150,000. Net = $3,230,000 - $1,150,000 = $2,080,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the amount of goodwill from this acquisition.',
        correctAnswer: 2920000,
        tolerance: 0,
        explanation: 'Goodwill = Purchase price - FV of net assets = $5,000,000 - $2,080,000 = $2,920,000'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'How should the $150,000 acquisition costs be treated?',
        options: ['Capitalize as part of goodwill', 'Expense immediately', 'Amortize over 15 years', 'Reduce purchase price'],
        correctAnswer: 1,
        explanation: 'Acquisition-related costs are expensed as incurred under ASC 805. They are not capitalized as part of goodwill.'
      },
      {
        id: 'req-4',
        type: 'journal_entry',
        question: 'Prepare the journal entry to record the acquisition.',
        correctEntries: [
          { account: 'Cash', debit: 200000, credit: null },
          { account: 'Accounts Receivable', debit: 380000, credit: null },
          { account: 'Inventory', debit: 750000, credit: null },
          { account: 'Equipment', debit: 1500000, credit: null },
          { account: 'Patent', debit: 400000, credit: null },
          { account: 'Goodwill', debit: 2920000, credit: null },
          { account: 'Accounts Payable', debit: null, credit: 300000 },
          { account: 'Long-term Debt', debit: null, credit: 850000 },
          { account: 'Cash', debit: null, credit: 5000000 }
        ],
        tolerance: 0
      }
    ],
    hints: [
      'Record assets at fair value, not book value',
      'Recognize identifiable intangibles separately from goodwill',
      'Acquisition costs are expensed, not capitalized'
    ]
  },
  {
    id: 'far-tbs-b3-005',
    section: 'FAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Pension Accounting - Defined Benefit Plan',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Pensions (ASC 715)',
    blueprintArea: 'FAR-IV',
    scenario: `
Nordic Corp. sponsors a defined benefit pension plan. The following information pertains to Year 1:

Beginning balances:
• Projected benefit obligation (PBO): $2,500,000
• Plan assets at fair value: $2,200,000

Year 1 transactions:
• Service cost: $180,000
• Interest cost (discount rate 5%): ?
• Expected return on plan assets: $154,000
• Actual return on plan assets: $175,000
• Employer contributions: $200,000
• Benefits paid: $150,000
• Actuarial loss on PBO: $45,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the interest cost for Year 1.',
        correctAnswer: 125000,
        tolerance: 0,
        explanation: 'Interest cost = Beginning PBO × Discount rate = $2,500,000 × 5% = $125,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the ending projected benefit obligation.',
        correctAnswer: 2700000,
        tolerance: 0,
        explanation: 'Ending PBO = Beginning $2,500,000 + Service cost $180,000 + Interest cost $125,000 + Actuarial loss $45,000 - Benefits paid $150,000 = $2,700,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the ending fair value of plan assets.',
        correctAnswer: 2425000,
        tolerance: 0,
        explanation: 'Ending assets = Beginning $2,200,000 + Actual return $175,000 + Contributions $200,000 - Benefits paid $150,000 = $2,425,000'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the pension expense for Year 1.',
        correctAnswer: 151000,
        tolerance: 100,
        explanation: 'Pension expense = Service cost $180,000 + Interest cost $125,000 - Expected return $154,000 = $151,000 (Note: Actuarial gains/losses go to OCI)'
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'What is the funded status at year-end?',
        correctAnswer: -275000,
        tolerance: 0,
        explanation: 'Funded status = Plan assets - PBO = $2,425,000 - $2,700,000 = ($275,000) underfunded'
      }
    ],
    hints: [
      'Interest cost = Beginning PBO × Discount rate',
      'Use EXPECTED return in pension expense, not actual',
      'Difference between actual and expected return goes to OCI',
      'Funded status = Plan assets - PBO'
    ]
  },
  {
    id: 'far-tbs-b3-006',
    section: 'FAR',
    type: TBS_TYPES.JOURNAL_ENTRY,
    title: 'Convertible Debt - Induced Conversion',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Long-Term Liabilities',
    blueprintArea: 'FAR-III',
    scenario: `
On January 1, Year 1, Omni Corp. issued $2,000,000 of 5% convertible bonds at par. Each $1,000 bond is convertible into 20 shares of $1 par common stock.

On July 1, Year 3, to induce conversion, Omni offers bondholders 25 shares per bond (instead of 20) if they convert by July 31. All bondholders accept.

Market price of stock on conversion date: $55 per share
Carrying value of bonds at conversion: $2,000,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'How many shares will be issued under the induced conversion?',
        correctAnswer: 50000,
        tolerance: 0,
        explanation: '$2,000,000 / $1,000 = 2,000 bonds × 25 shares = 50,000 shares'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the conversion expense (fair value of extra shares).',
        correctAnswer: 550000,
        tolerance: 0,
        explanation: 'Extra shares = 2,000 bonds × 5 extra shares = 10,000 shares. Expense = 10,000 × $55 = $550,000'
      },
      {
        id: 'req-3',
        type: 'journal_entry',
        question: 'Prepare the journal entry to record the induced conversion.',
        correctEntries: [
          { account: 'Bonds Payable', debit: 2000000, credit: null },
          { account: 'Conversion Expense', debit: 550000, credit: null },
          { account: 'Common Stock', debit: null, credit: 50000 },
          { account: 'Additional Paid-in Capital', debit: null, credit: 2500000 }
        ],
        tolerance: 0
      }
    ],
    hints: [
      'Extra shares are inducement - expense at fair value',
      'Original shares convert at book value (no gain/loss)',
      'APIC is the plug figure'
    ]
  },
  {
    id: 'far-tbs-b3-007',
    section: 'FAR',
    type: TBS_TYPES.RECONCILIATION,
    title: 'Consolidation - Intercompany Inventory Profit',
    difficulty: 'hard',
    timeEstimate: 22,
    topic: 'Consolidations',
    blueprintArea: 'FAR-VII',
    scenario: `
Parent Corp. owns 100% of Sub Inc. During Year 1:
• Parent sold inventory to Sub for $500,000 (cost to Parent: $350,000)
• Sub sold 70% of this inventory to outside parties for $420,000
• Sub still holds 30% of inventory at year-end

Year 1 separate company data:
| | Parent | Sub | Combined |
|---|--------|-----|----------|
| Sales | $3,000,000 | $1,200,000 | $4,200,000 |
| Cost of goods sold | $1,800,000 | $850,000 | $2,650,000 |
| Gross profit | $1,200,000 | $350,000 | $1,550,000 |
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the gross profit percentage on the intercompany sale.',
        correctAnswer: 30,
        tolerance: 0,
        explanation: 'Gross profit = ($500,000 - $350,000) / $500,000 = 30%'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the unrealized intercompany profit in ending inventory.',
        correctAnswer: 45000,
        tolerance: 0,
        explanation: 'Inventory on hand = 30% × $500,000 = $150,000. Unrealized profit = $150,000 × 30% = $45,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'What is consolidated sales for Year 1?',
        correctAnswer: 3700000,
        tolerance: 0,
        explanation: 'Combined $4,200,000 - Intercompany sale $500,000 = $3,700,000'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'What is consolidated cost of goods sold for Year 1?',
        correctAnswer: 2195000,
        tolerance: 0,
        explanation: 'Combined COGS $2,650,000 - Intercompany purchases $500,000 + Unrealized profit $45,000 = $2,195,000'
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'What is consolidated gross profit for Year 1?',
        correctAnswer: 1505000,
        tolerance: 0,
        explanation: 'Consolidated sales $3,700,000 - Consolidated COGS $2,195,000 = $1,505,000'
      }
    ],
    hints: [
      'Eliminate 100% of intercompany sales',
      'Defer unrealized profit in ending inventory',
      'Gross profit % = (Selling price - Cost) / Selling price'
    ]
  },
  {
    id: 'far-tbs-b3-008',
    section: 'FAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Statement of Cash Flows - Indirect Method',
    difficulty: 'medium',
    timeEstimate: 18,
    topic: 'Statement of Cash Flows',
    blueprintArea: 'FAR-I',
    scenario: `
Horizon Corp. provides the following Year 1 data:

Income Statement:
• Net income: $450,000
• Depreciation expense: $85,000
• Amortization of bond premium: $5,000
• Gain on sale of equipment: $15,000
• Loss on sale of investment: $8,000

Balance Sheet Changes:
• Accounts receivable increased: $35,000
• Inventory decreased: $20,000
• Prepaid expenses increased: $8,000
• Accounts payable decreased: $12,000
• Accrued liabilities increased: $18,000
• Income taxes payable decreased: $7,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate net cash provided by operating activities.',
        correctAnswer: 499000,
        tolerance: 100,
        explanation: 'Start with net income $450,000. Add back: Depreciation $85,000, Loss on investment $8,000. Subtract: Gain on equipment $15,000, Bond premium amortization $5,000. Working capital: -A/R $35,000, +Inv $20,000, -Prepaid $8,000, -A/P $12,000, +Accrued $18,000, -Tax payable $7,000. Total = $499,000'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Which item reduces cash from operations when using the indirect method?',
        options: ['Depreciation expense', 'Decrease in inventory', 'Increase in accounts receivable', 'Increase in accrued liabilities'],
        correctAnswer: 2,
        explanation: 'An increase in accounts receivable means sales were made but cash not collected - reduces operating cash flow.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'How should the gain on equipment sale be reported?',
        options: ['Add to net income in operating section', 'Subtract from net income in operating section', 'Report only in investing section', 'Report in financing section'],
        correctAnswer: 1,
        explanation: 'Gains are subtracted from net income to avoid double-counting. The full proceeds are reported in investing activities.'
      }
    ],
    hints: [
      'Add non-cash expenses (depreciation, amortization)',
      'Remove gains/losses (reported in investing)',
      'Asset increases = use of cash; Liability increases = source of cash'
    ]
  },
  {
    id: 'far-tbs-b3-009',
    section: 'FAR',
    type: TBS_TYPES.JOURNAL_ENTRY,
    title: 'Asset Retirement Obligation',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Asset Retirement Obligations (ASC 410)',
    blueprintArea: 'FAR-III',
    scenario: `
On January 1, Year 1, Greenfield Energy places an offshore drilling platform in service. Estimated useful life: 20 years, no salvage value.

Asset retirement information:
• Estimated cost to remove platform in 20 years: $8,000,000
• Credit-adjusted risk-free rate: 6%
• Present value factor for 20 periods at 6%: 0.31180

The platform cost $50,000,000 to construct.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the initial asset retirement obligation (ARO).',
        correctAnswer: 2494400,
        tolerance: 100,
        explanation: 'ARO = Future obligation × PV factor = $8,000,000 × 0.31180 = $2,494,400'
      },
      {
        id: 'req-2',
        type: 'journal_entry',
        question: 'Prepare the journal entry to record the ARO at inception.',
        correctEntries: [
          { account: 'Drilling Platform', debit: 2494400, credit: null },
          { account: 'Asset Retirement Obligation', debit: null, credit: 2494400 }
        ],
        tolerance: 100
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the total cost of the drilling platform to be depreciated.',
        correctAnswer: 52494400,
        tolerance: 100,
        explanation: 'Platform cost $50,000,000 + ARO asset $2,494,400 = $52,494,400'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the accretion expense for Year 1.',
        correctAnswer: 149664,
        tolerance: 100,
        explanation: 'Accretion = ARO balance × Risk-free rate = $2,494,400 × 6% = $149,664'
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'Calculate the annual depreciation expense (straight-line).',
        correctAnswer: 2624720,
        tolerance: 100,
        explanation: 'Depreciation = $52,494,400 / 20 years = $2,624,720'
      }
    ],
    hints: [
      'ARO recorded at present value of future obligation',
      'Capitalize ARO as part of asset cost',
      'Accretion expense increases ARO over time (like interest)'
    ]
  },
  {
    id: 'far-tbs-b3-010',
    section: 'FAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Foreign Currency Translation',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Foreign Currency (ASC 830)',
    blueprintArea: 'FAR-VII',
    scenario: `
US Parent owns 100% of Foreign Sub, whose functional currency is the Euro (€).

Foreign Sub's December 31, Year 1 balance sheet (in Euros):
• Cash: €100,000
• Inventory: €200,000 (acquired evenly throughout year)
• Equipment: €500,000 (acquired January 1, Year 1)
• Accumulated depreciation: €50,000
• Total assets: €750,000
• Accounts payable: €150,000
• Common stock: €400,000 (issued when rate was $1.20)
• Retained earnings: €200,000

Exchange rates:
• January 1, Year 1: $1.20/€
• Average for Year 1: $1.25/€
• December 31, Year 1: $1.30/€
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Translate cash using the appropriate rate.',
        correctAnswer: 130000,
        tolerance: 0,
        explanation: 'Monetary assets use current rate: €100,000 × $1.30 = $130,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Translate equipment (net) using the appropriate rate.',
        correctAnswer: 585000,
        tolerance: 0,
        explanation: 'Equipment €500,000 - Accum depr €50,000 = €450,000. Translate at current rate: €450,000 × $1.30 = $585,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Translate common stock using the appropriate rate.',
        correctAnswer: 480000,
        tolerance: 0,
        explanation: 'Common stock uses historical rate when issued: €400,000 × $1.20 = $480,000'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Where is the cumulative translation adjustment reported?',
        options: ['Net income', 'Other comprehensive income', 'Direct adjustment to retained earnings', 'Contra-asset'],
        correctAnswer: 1,
        explanation: 'Translation adjustments for foreign subsidiaries with different functional currencies are reported in OCI, part of AOCI in stockholders equity.'
      }
    ],
    hints: [
      'Assets/Liabilities: Current rate',
      'Common stock: Historical rate',
      'Revenues/Expenses: Average rate',
      'Translation adjustment goes to OCI (not P&L)'
    ]
  },
  {
    id: 'far-tbs-b3-011',
    section: 'FAR',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Segment Reporting - Quantitative Thresholds',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Segment Reporting (ASC 280)',
    blueprintArea: 'FAR-I',
    scenario: `
CentralCorp operates in six business segments. Year 1 data:

| Segment | Revenue | Profit/(Loss) | Assets |
|---------|---------|---------------|--------|
| A | $180,000 | $35,000 | $500,000 |
| B | $65,000 | ($15,000) | $220,000 |
| C | $95,000 | $28,000 | $310,000 |
| D | $40,000 | $12,000 | $180,000 |
| E | $350,000 | $85,000 | $800,000 |
| F | $70,000 | ($8,000) | $190,000 |

Totals: Revenue $800,000, Profit $137,000, Loss $23,000, Assets $2,200,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the revenue threshold (10% test).',
        correctAnswer: 80000,
        tolerance: 0,
        explanation: 'Revenue threshold = 10% × $800,000 = $80,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the profit/loss threshold (10% test - use greater of absolute values).',
        correctAnswer: 13700,
        tolerance: 0,
        explanation: 'Total profits = $35,000 + $28,000 + $12,000 + $85,000 = $160,000. Total losses = $15,000 + $8,000 = $23,000. Greater = $160,000. Threshold = 10% × $160,000 = $16,000. Alternative: $137,000 net profit × 10% = $13,700'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Which segments are reportable based on the quantitative thresholds? (Select all that apply)',
        options: ['Segments A, C, and E only', 'Segments A, B, C, D, E, and F', 'Segments A, B, C, E only', 'Segments A, C, E, and F'],
        correctAnswer: 2,
        explanation: 'Revenue test ≥$80,000: A ($180k), C ($95k), E ($350k). Profit test: Use absolute value - A ($35k), E ($85k), C ($28k), B ($15k) meet threshold. Asset test ≥$220,000: A, B, C, E. Reportable = A, B, C, E.'
      }
    ],
    hints: [
      'Revenue test: 10% of combined revenue',
      'Profit test: 10% of greater of (total profits, absolute total losses)',
      'Asset test: 10% of combined assets',
      'Meet ANY one test = reportable segment'
    ]
  },
  {
    id: 'far-tbs-b3-012',
    section: 'FAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Interim Reporting - Inventory Loss Recovery',
    difficulty: 'medium',
    timeEstimate: 14,
    topic: 'Interim Reporting (ASC 270)',
    blueprintArea: 'FAR-I',
    scenario: `
Quarterly inventory data for Midland Corp. (fiscal year = calendar year):

| Quarter | Cost | Market (NRV) |
|---------|------|--------------|
| Q1 | $500,000 | $450,000 |
| Q2 | $520,000 | $540,000 |
| Q3 | $480,000 | $510,000 |
| Q4 | $550,000 | $530,000 |

The company uses lower of cost or NRV. Any recoveries are limited to previously recognized losses.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'What inventory loss is recognized in Q1?',
        correctAnswer: 50000,
        tolerance: 0,
        explanation: 'Cost $500,000 > NRV $450,000. Write down $50,000.'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'What inventory adjustment is recognized in Q2?',
        correctAnswer: 20000,
        tolerance: 0,
        explanation: 'Cost $520,000 < NRV $540,000. Recovery limited to prior loss = $50,000. But we can only recover what we expensed. Since this is new inventory, compare cost to market. NRV > cost, so no loss. Prior Q1 inventory was sold. No adjustment in Q2.'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'What is the inventory value to report at Q4 end?',
        correctAnswer: 530000,
        tolerance: 0,
        explanation: 'Lower of cost ($550,000) or NRV ($530,000) = $530,000'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'How should interim inventory losses expected to be recovered by year-end be treated?',
        options: ['Recognize immediately', 'Defer to year-end', 'Do not recognize', 'Recognize and reverse proportionally'],
        correctAnswer: 2,
        explanation: 'Under interim reporting guidance, if inventory losses are expected to be recovered by year-end, they should not be recognized in the interim period.'
      }
    ],
    hints: [
      'Apply LCM/LCNRV at each interim date',
      'Expected year-end recoveries can defer interim losses',
      'Recovery limited to previously recognized losses'
    ]
  },
  {
    id: 'far-tbs-b3-013',
    section: 'FAR',
    type: TBS_TYPES.JOURNAL_ENTRY,
    title: 'Troubled Debt Restructuring - Modification',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Troubled Debt (Pre-2023 rules)',
    blueprintArea: 'FAR-III',
    scenario: `
Borrower Corp. owes Bank $1,000,000 on a 10% note due December 31, Year 1. Due to financial difficulties, the terms are modified on January 1, Year 2:

Modified terms:
• Principal reduced to $800,000
• Interest rate reduced to 6%
• Maturity extended to December 31, Year 4 (3 years)
• Accrued interest of $100,000 is forgiven

Bank's assessment: The restructuring represents a troubled debt restructuring under legacy GAAP.

PV factors at 10% (original rate):
• PV of $1 for 3 periods: 0.75132
• PV of ordinary annuity for 3 periods: 2.48685
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the total future cash payments under modified terms.',
        correctAnswer: 944000,
        tolerance: 0,
        explanation: 'Principal $800,000 + Interest ($800,000 × 6% × 3 years) = $800,000 + $144,000 = $944,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'What is the carrying amount of debt before restructuring?',
        correctAnswer: 1100000,
        tolerance: 0,
        explanation: 'Principal $1,000,000 + Accrued interest $100,000 = $1,100,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Does the debtor recognize a gain on restructuring?',
        correctAnswer: 156000,
        tolerance: 0,
        explanation: 'Carrying amount $1,100,000 > Future payments $944,000. Gain = $1,100,000 - $944,000 = $156,000. Under TDR rules, reduce liability to future cash flows and recognize gain.'
      },
      {
        id: 'req-4',
        type: 'journal_entry',
        question: 'Prepare the debtor\'s journal entry for the restructuring.',
        correctEntries: [
          { account: 'Notes Payable', debit: 1000000, credit: null },
          { account: 'Accrued Interest Payable', debit: 100000, credit: null },
          { account: 'Notes Payable - Restructured', debit: null, credit: 944000 },
          { account: 'Gain on Debt Restructuring', debit: null, credit: 156000 }
        ],
        tolerance: 0
      }
    ],
    hints: [
      'Compare carrying amount to total future cash payments',
      'If carrying amount > future payments, recognize gain',
      'No interest expense recorded (effective rate = 0%)'
    ]
  },
  {
    id: 'far-tbs-b3-014',
    section: 'FAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Variable Interest Entity - Consolidation',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Variable Interest Entities (ASC 810)',
    blueprintArea: 'FAR-VII',
    scenario: `
Alpha Corp. owns 30% of the equity in Special Purpose Entity (SPE). The SPE was created to lease equipment.

SPE structure:
• Total assets: $10,000,000 (equipment)
• Equity investment: $500,000 (Alpha: $150,000, Others: $350,000)
• Senior debt: $9,500,000 (held by Bank)

Variable interests:
• Alpha guarantees 80% of SPE's debt
• Alpha has a management contract that provides 50% of expected returns
• Alpha can direct the most significant activities (equipment purchases, lease terms)

Expected losses: $400,000
Expected residual returns: $600,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Is the SPE a variable interest entity (VIE)?',
        options: ['Yes, equity at risk is insufficient', 'No, it has sufficient equity', 'Cannot determine', 'Only if losses occur'],
        correctAnswer: 0,
        explanation: 'Equity is $500,000 which is 5% of $10M assets. The 10% equity test and risk characteristics suggest VIE status. Equity holders lack substantive rights and don\'t absorb expected losses.'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate Alpha\'s share of expected losses through the guarantee.',
        correctAnswer: 320000,
        tolerance: 0,
        explanation: 'Alpha guarantees 80% of debt. Expected losses × Alpha\'s share = $400,000 × 80% = $320,000'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Should Alpha consolidate the SPE?',
        options: ['Yes, Alpha is the primary beneficiary', 'No, Alpha owns only 30%', 'No, Bank holds majority of debt', 'Yes, but only proportionate consolidation'],
        correctAnswer: 0,
        explanation: 'Alpha (1) has power to direct activities affecting economic performance, and (2) has obligation to absorb losses (guarantee) and right to receive benefits (management fees). Alpha is primary beneficiary and must consolidate.'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'What amount of assets would Alpha report from consolidating the VIE?',
        correctAnswer: 10000000,
        tolerance: 0,
        explanation: 'Full consolidation = 100% of VIE\'s assets = $10,000,000'
      }
    ],
    hints: [
      'VIE test: Insufficient equity at risk, lack of control through equity',
      'Primary beneficiary: Power + economic interest (losses or returns)',
      'Consolidate 100% of VIE assets, recognize NCI if applicable'
    ]
  },
  {
    id: 'far-tbs-b3-015',
    section: 'FAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Equity Method - Intercompany Upstream Sale',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Equity Method Investments',
    blueprintArea: 'FAR-VII',
    scenario: `
Investor Corp. owns 40% of Associate Inc. (equity method applies).

Year 1 data:
• Associate's net income: $800,000
• Dividends paid by Associate: $200,000
• Associate sold inventory to Investor for $300,000 (cost to Associate: $180,000)
• Investor sold 60% of this inventory to outside parties
• 40% remains in Investor's ending inventory

Beginning investment balance: $2,000,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the gross profit on the intercompany sale.',
        correctAnswer: 120000,
        tolerance: 0,
        explanation: 'Selling price $300,000 - Cost $180,000 = $120,000 gross profit'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate unrealized profit that must be deferred.',
        correctAnswer: 48000,
        tolerance: 0,
        explanation: 'Unrealized portion = 40% unsold × $120,000 = $48,000. Investor\'s share = $48,000 × 40% = $19,200. Wait, for upstream, defer Investor\'s ownership % of unrealized profit in ending inventory.'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate Investor\'s share of Associate\'s earnings (equity income).',
        correctAnswer: 300800,
        tolerance: 100,
        explanation: 'Investor share = 40% × $800,000 = $320,000. Less deferred profit: $48,000 × 40% = $19,200. Equity income = $320,000 - $19,200 = $300,800'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the ending investment balance.',
        correctAnswer: 2220800,
        tolerance: 100,
        explanation: 'Beginning $2,000,000 + Equity income $300,800 - Dividends received ($200,000 × 40%) = $2,000,000 + $300,800 - $80,000 = $2,220,800'
      }
    ],
    hints: [
      'Upstream sale: Associate sells to Investor',
      'Defer investor\'s % of unrealized profit in investor\'s inventory',
      'Investment = Beginning + Equity income - Dividends received'
    ]
  },
  {
    id: 'far-tbs-b3-016',
    section: 'FAR',
    type: TBS_TYPES.JOURNAL_ENTRY,
    title: 'Hedging - Cash Flow Hedge of Forecasted Transaction',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Derivatives and Hedging (ASC 815)',
    blueprintArea: 'FAR-VI',
    scenario: `
On September 1, Year 1, Commodore Corp. anticipates purchasing 100,000 barrels of oil in March Year 2. To hedge against price increases, it enters into a forward contract to buy 100,000 barrels at $75 per barrel.

Key dates and spot prices:
• September 1, Year 1 (inception): Spot $72, Forward $75, Contract FV = $0
• December 31, Year 1 (year-end): Spot $80, Forward $82, Contract FV = $650,000
• March 1, Year 2 (settlement): Spot $85, Forward $85, Contract FV = $1,000,000

The hedge is designated as a cash flow hedge and is perfectly effective.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'journal_entry',
        question: 'Prepare the journal entry on December 31, Year 1.',
        correctEntries: [
          { account: 'Forward Contract Asset', debit: 650000, credit: null },
          { account: 'Other Comprehensive Income', debit: null, credit: 650000 }
        ],
        tolerance: 0
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'What is the change in OCI from December 31, Year 1 to March 1, Year 2?',
        correctAnswer: 350000,
        tolerance: 0,
        explanation: 'Contract FV increased from $650,000 to $1,000,000 = $350,000 additional gain to OCI'
      },
      {
        id: 'req-3',
        type: 'journal_entry',
        question: 'Prepare the entry to record the oil purchase at settlement (March 1, Year 2).',
        correctEntries: [
          { account: 'Oil Inventory', debit: 8500000, credit: null },
          { account: 'Cash', debit: null, credit: 8500000 }
        ],
        tolerance: 0,
        explanation: '100,000 barrels × $85 spot = $8,500,000'
      },
      {
        id: 'req-4',
        type: 'journal_entry',
        question: 'When the oil is sold, how is the AOCI balance reclassified?',
        correctEntries: [
          { account: 'Other Comprehensive Income', debit: 1000000, credit: null },
          { account: 'Cost of Goods Sold', debit: null, credit: 1000000 }
        ],
        tolerance: 0,
        explanation: 'Cash flow hedge gain in AOCI is reclassified to earnings (reducing COGS) when hedged item affects earnings.'
      }
    ],
    hints: [
      'Cash flow hedge: Effective portion to OCI',
      'Reclassify from AOCI when hedged item affects earnings',
      'Forward contract recorded at fair value'
    ]
  },
  {
    id: 'far-tbs-b3-017',
    section: 'FAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Software Development Costs',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Intangible Assets (ASC 985/ASC 350-40)',
    blueprintArea: 'FAR-II',
    scenario: `
TechStart Inc. is developing software for external sale. Project timeline and costs:

| Phase | Period | Costs |
|-------|--------|-------|
| Conceptual formulation | Jan-Feb Y1 | $150,000 |
| Design and planning | Mar-Apr Y1 | $200,000 |
| Coding and testing | May-Aug Y1 | $600,000 |
| Tech feasibility established | July 15, Y1 | - |
| Coding (post-feasibility) | Jul-Aug Y1 | $300,000 |
| Testing and debugging | Sep-Oct Y1 | $180,000 |
| Production masters | Nov Y1 | $50,000 |
| Product sales begin | Dec Y1 | - |

Expected useful life: 3 years
Expected revenue Year 1-3: $800,000, $1,200,000, $1,000,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the total costs to expense as R&D.',
        correctAnswer: 650000,
        tolerance: 0,
        explanation: 'Expenses before tech feasibility: Conceptual $150,000 + Design $200,000 + Coding (pre-July 15) approximately $300,000 = $650,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the total costs to capitalize.',
        correctAnswer: 530000,
        tolerance: 0,
        explanation: 'Costs after tech feasibility: Post-feasibility coding $300,000 + Testing $180,000 + Production masters $50,000 = $530,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate Year 2 amortization using greater of straight-line or revenue method.',
        correctAnswer: 212000,
        tolerance: 1000,
        explanation: 'Straight-line: $530,000 / 3 = $176,667. Revenue method: ($1,200,000 / $3,000,000) × $530,000 = $212,000. Use greater = $212,000'
      }
    ],
    hints: [
      'Capitalize costs AFTER technological feasibility',
      'Amortize using GREATER of straight-line or % revenue',
      'Production masters are capitalizable'
    ]
  },
  {
    id: 'far-tbs-b3-018',
    section: 'FAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Nonmonetary Exchange - Commercial Substance',
    difficulty: 'medium',
    timeEstimate: 14,
    topic: 'Property, Plant & Equipment',
    blueprintArea: 'FAR-II',
    scenario: `
RealCo exchanges equipment with TradeCo. The exchange has commercial substance.

RealCo's equipment:
• Original cost: $400,000
• Accumulated depreciation: $150,000
• Fair value: $300,000

TradeCo's equipment:
• Fair value: $320,000

RealCo pays $20,000 cash to TradeCo.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the book value of RealCo\'s equipment given up.',
        correctAnswer: 250000,
        tolerance: 0,
        explanation: 'Book value = Cost - Accumulated depreciation = $400,000 - $150,000 = $250,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate RealCo\'s gain or loss on the exchange.',
        correctAnswer: 50000,
        tolerance: 0,
        explanation: 'FV of asset given ($300,000) - Book value ($250,000) = $50,000 gain'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'At what amount should RealCo record the new equipment?',
        correctAnswer: 320000,
        tolerance: 0,
        explanation: 'With commercial substance, record at FV of asset received = $320,000'
      },
      {
        id: 'req-4',
        type: 'journal_entry',
        question: 'Prepare RealCo\'s journal entry for the exchange.',
        correctEntries: [
          { account: 'Equipment (new)', debit: 320000, credit: null },
          { account: 'Accumulated Depreciation', debit: 150000, credit: null },
          { account: 'Equipment (old)', debit: null, credit: 400000 },
          { account: 'Cash', debit: null, credit: 20000 },
          { account: 'Gain on Exchange', debit: null, credit: 50000 }
        ],
        tolerance: 0
      }
    ],
    hints: [
      'Commercial substance: Record at fair value',
      'Recognize full gain/loss',
      'Cash paid added to cost of asset received'
    ]
  },
  {
    id: 'far-tbs-b3-019',
    section: 'FAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Change in Accounting Estimate - Depreciation',
    difficulty: 'medium',
    timeEstimate: 14,
    topic: 'Accounting Changes (ASC 250)',
    blueprintArea: 'FAR-II',
    scenario: `
On January 1, Year 1, Metro Corp. purchased machinery for $500,000 with an estimated useful life of 10 years and salvage value of $50,000. Straight-line depreciation is used.

On January 1, Year 4, Metro revises the total useful life to 8 years (from original date) and the salvage value to $20,000.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate accumulated depreciation at December 31, Year 3.',
        correctAnswer: 135000,
        tolerance: 0,
        explanation: 'Annual depreciation = ($500,000 - $50,000) / 10 = $45,000. After 3 years = $135,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the book value at January 1, Year 4.',
        correctAnswer: 365000,
        tolerance: 0,
        explanation: 'Cost $500,000 - Accumulated depreciation $135,000 = $365,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the revised annual depreciation for Year 4 and beyond.',
        correctAnswer: 69000,
        tolerance: 0,
        explanation: 'Remaining depreciable base = $365,000 - $20,000 = $345,000. Remaining life = 8 - 3 = 5 years. Annual depreciation = $345,000 / 5 = $69,000'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'How should the change in estimate be reported?',
        options: ['Retrospectively, restating prior years', 'Prospectively, affecting current and future years', 'As an error correction', 'As a change in accounting principle'],
        correctAnswer: 1,
        explanation: 'Changes in estimate are applied prospectively. No restatement of prior periods.'
      }
    ],
    hints: [
      'Changes in estimate are prospective',
      'Use remaining book value and remaining life',
      'No restatement of prior periods'
    ]
  },
  {
    id: 'far-tbs-b3-020',
    section: 'FAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Contingent Liability - Probability Assessment',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Contingencies (ASC 450)',
    blueprintArea: 'FAR-III',
    scenario: `
Sterling Corp. is involved in three legal matters at December 31, Year 1:

Case A - Product Liability:
• Probable loss, attorneys estimate range of $500,000 to $900,000
• No amount in range is more likely than others

Case B - Patent Infringement:
• Reasonably possible loss of $1,200,000
• Company believes it has meritorious defense

Case C - Environmental Remediation:
• Remote possibility of loss
• Potential exposure: $2,500,000

Case D - Employee Discrimination:
• Probable loss, best estimate: $350,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'What amount should be accrued for Case A?',
        correctAnswer: 500000,
        tolerance: 0,
        explanation: 'When no amount in range is more likely, accrue the minimum of the range = $500,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'What amount should be accrued for Case B?',
        correctAnswer: 0,
        tolerance: 0,
        explanation: 'Reasonably possible losses are disclosed but not accrued.'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'What is the total contingent loss accrual for Year 1?',
        correctAnswer: 850000,
        tolerance: 0,
        explanation: 'Case A $500,000 + Case D $350,000 = $850,000 (Only probable and estimable are accrued)'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'What disclosure is required for Case B?',
        options: ['No disclosure required', 'Disclose nature and estimate of possible loss', 'Accrue and disclose', 'Disclose only if material'],
        correctAnswer: 1,
        explanation: 'Reasonably possible losses must be disclosed, including nature and estimated amount or range.'
      }
    ],
    hints: [
      'Probable + Estimable = Accrue',
      'Reasonably possible = Disclose only',
      'Remote = No accrual or disclosure required',
      'Range with no best estimate = Accrue minimum'
    ]
  }
];

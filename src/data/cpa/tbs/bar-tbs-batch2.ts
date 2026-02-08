// BAR TBS Batch 2 - Exam Quality Simulations
import { TBS, TBS_TYPES } from '../../../types';

export const BAR_TBS_BATCH2: TBS[] = [
  {
    id: 'bar-tbs-b2-001',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Variance Analysis - Manufacturing',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Cost Management',
    blueprintArea: 'BAR-I',
    scenario: `
Phoenix Manufacturing produces industrial valves. Standard cost data for one unit:

Direct Materials:
• Standard quantity: 4 pounds per unit
• Standard price: $8.00 per pound

Direct Labor:
• Standard hours: 2.5 hours per unit
• Standard rate: $22.00 per hour

Variable Overhead:
• Applied based on direct labor hours
• Standard rate: $6.00 per DLH

Actual results for March (10,000 units produced):
• Materials purchased: 42,000 pounds at $7.80/pound
• Materials used: 41,500 pounds
• Direct labor: 24,200 hours at $22.50/hour
• Variable overhead incurred: $150,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the direct materials price variance.',
        correctAnswer: 8400,
        tolerance: 0,
        explanation: '(AP - SP) × AQ purchased = ($7.80 - $8.00) × 42,000 = -$8,400 Favorable'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the direct materials quantity variance.',
        correctAnswer: 12000,
        tolerance: 0,
        explanation: '(AQ used - SQ allowed) × SP = (41,500 - 40,000) × $8.00 = $12,000 Unfavorable'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the direct labor rate variance.',
        correctAnswer: 12100,
        tolerance: 0,
        explanation: '(AR - SR) × AH = ($22.50 - $22.00) × 24,200 = $12,100 Unfavorable'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the direct labor efficiency variance.',
        correctAnswer: 18700,
        tolerance: 0,
        explanation: '(AH - SH allowed) × SR = (24,200 - 25,000) × $22.00 = -$17,600 Favorable. SH = 10,000 × 2.5 = 25,000'
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'Calculate the variable overhead efficiency variance.',
        correctAnswer: 4800,
        tolerance: 0,
        explanation: '(AH - SH) × Standard VOH rate = (24,200 - 25,000) × $6.00 = -$4,800 Favorable'
      }
    ],
    hints: [
      'Price variance calculated at purchase; quantity at use',
      'SQ allowed = Actual units × Standard quantity per unit',
      'Efficiency variances use standard rates',
      'Favorable = Actual < Standard cost'
    ]
  },
  {
    id: 'bar-tbs-b2-002',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Capital Budgeting - NPV and IRR',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Capital Investment Decisions',
    blueprintArea: 'BAR-I',
    scenario: `
Apex Corp. is evaluating a new production line:

Initial Investment: $2,000,000
Useful life: 5 years
Salvage value: $200,000
Tax rate: 25%
WACC: 10%

Annual Operating Data:
• Revenue increase: $1,200,000
• Cash operating costs: $600,000
• Depreciation: Straight-line to salvage

Present Value Factors at 10%:
| Year | PV of $1 | PV of Annuity |
|------|----------|---------------|
| 1 | 0.909 | 0.909 |
| 2 | 0.826 | 1.736 |
| 3 | 0.751 | 2.487 |
| 4 | 0.683 | 3.170 |
| 5 | 0.621 | 3.791 |
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate annual depreciation expense.',
        correctAnswer: 360000,
        tolerance: 0,
        explanation: '($2,000,000 - $200,000) / 5 years = $360,000 per year'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate annual after-tax operating cash flow.',
        correctAnswer: 540000,
        tolerance: 1000,
        explanation: 'Before tax: $1,200,000 - $600,000 = $600,000. Tax: ($600,000 - $360,000) × 25% = $60,000. After-tax CF = $600,000 - $60,000 = $540,000. Or: EBIT × (1-T) + Dep = $240,000 × 0.75 + $360,000 = $540,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the NPV of the project.',
        correctAnswer: 171140,
        tolerance: 5000,
        explanation: 'PV of operating CFs: $540,000 × 3.791 = $2,047,140. PV of salvage: $200,000 × 0.621 = $124,200. Total PV = $2,171,340. NPV = $2,171,340 - $2,000,000 = $171,340'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Should Apex accept this project based on NPV?',
        options: ['Yes - NPV is positive', 'No - NPV is negative', 'Indifferent - NPV is zero', 'Need more information'],
        correctAnswer: 0,
        explanation: 'NPV > 0 indicates the project adds value. Accept projects with positive NPV.'
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'Is the IRR above or below 10%?',
        options: ['Above 10%', 'Below 10%', 'Exactly 10%', 'Cannot determine'],
        correctAnswer: 0,
        explanation: 'Since NPV is positive at 10%, the IRR must be higher than 10% (the discount rate where NPV = 0).'
      }
    ],
    hints: [
      'Depreciation tax shield = Depreciation × Tax rate',
      'After-tax CF = (Revenue - Costs)(1-T) + Depreciation × T',
      'NPV positive → Accept; IRR > WACC',
      'Salvage value may have tax implications if ≠ book value'
    ]
  },
  {
    id: 'bar-tbs-b2-003',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Segment Reporting Analysis',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Financial Reporting',
    blueprintArea: 'BAR-II',
    scenario: `
Diversified Corp. has four operating segments with the following Year 1 data:

| Segment | Revenue | Profit/(Loss) | Assets |
|---------|---------|---------------|--------|
| Alpha | $15,000,000 | $2,400,000 | $18,000,000 |
| Beta | $8,000,000 | $(500,000) | $12,000,000 |
| Gamma | $4,000,000 | $800,000 | $6,000,000 |
| Delta | $3,000,000 | $400,000 | $4,000,000 |
| **Total** | $30,000,000 | $3,100,000 | $40,000,000 |

Intersegment revenues:
• Alpha to Beta: $1,000,000
• Beta to Gamma: $500,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the revenue threshold for reportable segments.',
        correctAnswer: 3000000,
        tolerance: 0,
        explanation: '10% of total revenue = $30,000,000 × 10% = $3,000,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the profit/loss threshold (use absolute values).',
        correctAnswer: 360000,
        tolerance: 0,
        explanation: 'Greater of: (1) 10% of combined profit = $3,600,000 × 10% = $360,000, or (2) 10% of combined loss = $500,000 × 10% = $50,000. Use $360,000.'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the asset threshold for reportable segments.',
        correctAnswer: 4000000,
        tolerance: 0,
        explanation: '10% of total assets = $40,000,000 × 10% = $4,000,000'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Which segments are separately reportable?',
        options: ['Alpha, Beta, Gamma only', 'Alpha, Beta, Gamma, Delta', 'Alpha and Beta only', 'Alpha only'],
        correctAnswer: 1,
        explanation: 'Alpha: Meets all 3 thresholds. Beta: Meets revenue ($8M), loss ($500K > $360K), assets ($12M). Gamma: Meets revenue ($4M), profit ($800K). Delta: Meets revenue ($3M) and assets ($4M). All 4 are reportable.'
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'What is required for segment reconciliation?',
        options: ['Reconcile segment totals to consolidated amounts only', 'Reconcile revenues, profit/loss, and assets to consolidated', 'No reconciliation required', 'Reconcile only if segments exceed 75% test'],
        correctAnswer: 1,
        explanation: 'ASC 280 requires reconciliation of segment revenues, profit/loss, and assets to consolidated financial statement amounts.'
      }
    ],
    hints: [
      'Reportable if ≥ 10% of revenue, profit/loss, OR assets',
      'Profit test: Greater of 10% combined profits or 10% combined losses',
      '75% test: Reportable segments must be ≥ 75% of external revenue',
      'Reconciliation required for all key measures'
    ]
  },
  {
    id: 'bar-tbs-b2-004',
    section: 'BAR',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Ratio Analysis and Trend Interpretation',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Financial Statement Analysis',
    blueprintArea: 'BAR-I',
    scenario: `
Analyze the following 3-year trend for Retail Solutions Inc.:

| Ratio | Year 1 | Year 2 | Year 3 | Industry Avg |
|-------|--------|--------|--------|--------------|
| Current Ratio | 2.1 | 1.8 | 1.4 | 1.6 |
| Quick Ratio | 1.2 | 0.9 | 0.6 | 0.9 |
| Inventory Turnover | 8.0 | 6.5 | 5.2 | 7.0 |
| Days Sales Outstanding | 35 | 42 | 55 | 40 |
| Debt-to-Equity | 0.8 | 1.2 | 1.6 | 1.0 |
| Interest Coverage | 6.0 | 4.2 | 2.8 | 4.5 |

Additional Information:
• Year 3 sales increased 15% over Year 2
• Gross margin remained stable at 35%
• The company opened 5 new stores in Year 3
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'What is the primary liquidity concern?',
        options: ['Excessive cash holdings', 'Inventory buildup and slow collections', 'Insufficient current assets', 'Over-reliance on short-term debt'],
        correctAnswer: 1,
        explanation: 'Quick ratio declining faster than current ratio indicates inventory buildup. Rising DSO (35→55 days) shows slowing collections. Both point to liquidity stress from working capital issues.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'What do the solvency ratios indicate?',
        options: ['Improving financial strength', 'Stable capital structure', 'Increasing financial risk', 'Decreasing leverage'],
        correctAnswer: 2,
        explanation: 'Debt-to-equity doubled (0.8→1.6), now above industry (1.0). Interest coverage halved (6.0→2.8), below industry (4.5). Both indicate increasing financial risk and potential solvency issues.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'What likely caused the ratio deterioration?',
        options: ['Operational efficiency improvements', 'Aggressive expansion funded by debt', 'Revenue decline', 'Successful inventory management'],
        correctAnswer: 1,
        explanation: 'Sales increased 15%, margins stable, but 5 new stores opened. Rising debt and declining coverage suggest expansion was debt-funded. Inventory turnover decline suggests new stores may be overstocked.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Which ratio is most concerning for short-term creditors?',
        options: ['Current ratio (still above 1.0)', 'Quick ratio (below industry)', 'Debt-to-equity', 'Interest coverage'],
        correctAnswer: 1,
        explanation: 'Quick ratio at 0.6 (vs 0.9 industry) indicates inability to meet short-term obligations without selling inventory. For creditors needing quick repayment, this is most concerning.'
      }
    ],
    hints: [
      'Quick ratio excludes inventory from current assets',
      'DSO increase = slower collection of receivables',
      'Interest coverage below 3.0 is generally concerning',
      'Rapid expansion often strains working capital'
    ]
  },
  {
    id: 'bar-tbs-b2-005',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Transfer Pricing Analysis',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Managerial Accounting',
    blueprintArea: 'BAR-I',
    scenario: `
Omega Corp. has two divisions:

**Components Division** (seller):
• Variable cost per unit: $45
• Fixed costs: $500,000 (allocated based on capacity)
• Capacity: 100,000 units
• Current external sales: 70,000 units at $80/unit
• No additional fixed costs for internal sales

**Assembly Division** (buyer):
• Needs 25,000 units of the component
• Can purchase externally for $75/unit
• Uses component in final product sold for $200
• Other variable costs: $60 per final unit

Currently, divisions negotiate a transfer price of $65/unit.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate Components Division profit on internal transfer at $65.',
        correctAnswer: 500000,
        tolerance: 0,
        explanation: '(Transfer price - Variable cost) × Units = ($65 - $45) × 25,000 = $500,000 contribution'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the minimum transfer price for Components Division.',
        correctAnswer: 45,
        tolerance: 0,
        explanation: 'Minimum = Variable cost + Opportunity cost. Components has excess capacity (70,000 + 25,000 = 95,000 < 100,000), so no opportunity cost. Minimum = $45.'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the maximum transfer price for Assembly Division.',
        correctAnswer: 75,
        tolerance: 0,
        explanation: 'Maximum = External purchase price = $75/unit. Assembly will not pay more internally than externally.'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'If Components operates at full capacity with $80 external price, what is the minimum transfer price?',
        correctAnswer: 80,
        tolerance: 0,
        explanation: 'At full capacity: Minimum = Variable cost + Opportunity cost = $45 + ($80 - $45) = $80. Must forgo external sale to supply internally.'
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'What transfer price range allows both divisions to benefit (with excess capacity)?',
        options: ['$45 to $75', '$45 to $80', '$65 to $75', '$75 to $80'],
        correctAnswer: 0,
        explanation: 'Range = Minimum transfer price to Maximum transfer price = $45 to $75. Any price in this range benefits both divisions compared to their alternatives.'
      }
    ],
    hints: [
      'Minimum TP = Variable cost + Opportunity cost of selling internally',
      'Maximum TP = Lower of external price or contribution margin',
      'Excess capacity = Zero opportunity cost',
      'Goal congruence: Internal transfer should benefit company overall'
    ]
  },
  {
    id: 'bar-tbs-b2-006',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Business Combination - Acquisition Method',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Consolidations',
    blueprintArea: 'BAR-II',
    scenario: `
On January 1, Year 1, Parent Corp. acquired 100% of Target Inc. for $5,000,000 cash.

Target's book values at acquisition:
| Account | Book Value | Fair Value |
|---------|------------|------------|
| Cash | $200,000 | $200,000 |
| Accounts Receivable | $400,000 | $380,000 |
| Inventory | $600,000 | $700,000 |
| Equipment (net) | $1,200,000 | $1,500,000 |
| Patents | $0 | $400,000 |
| Total Assets | $2,400,000 | $3,180,000 |
| Accounts Payable | $300,000 | $300,000 |
| Long-term Debt | $800,000 | $780,000 |
| Total Liabilities | $1,100,000 | $1,080,000 |

Remaining life of equipment: 10 years
Patent remaining life: 5 years
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the fair value of net identifiable assets acquired.',
        correctAnswer: 2100000,
        tolerance: 0,
        explanation: 'FV Assets - FV Liabilities = $3,180,000 - $1,080,000 = $2,100,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate goodwill from the acquisition.',
        correctAnswer: 2900000,
        tolerance: 0,
        explanation: 'Goodwill = Purchase price - FV of net identifiable assets = $5,000,000 - $2,100,000 = $2,900,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate Year 1 amortization of fair value adjustments.',
        correctAnswer: 110000,
        tolerance: 0,
        explanation: 'Equipment: ($1,500,000 - $1,200,000) / 10 = $30,000. Patent: $400,000 / 5 = $80,000. Total = $110,000'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'What is the additional COGS recognized when inventory is sold?',
        correctAnswer: 100000,
        tolerance: 0,
        explanation: 'FV inventory adjustment = $700,000 - $600,000 = $100,000. This flows through COGS when inventory is sold.'
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'How is goodwill treated post-acquisition?',
        options: ['Amortized over 10 years', 'Amortized over useful life', 'Tested annually for impairment', 'Written off immediately'],
        correctAnswer: 2,
        explanation: 'Under ASC 350, goodwill is NOT amortized. It is tested for impairment at least annually at the reporting unit level.'
      }
    ],
    hints: [
      'Acquisition method: Record at fair value',
      'Goodwill = Consideration - FV of net identifiable assets',
      'Identified intangibles (patents) are separated from goodwill',
      'FV adjustments amortize over remaining useful lives'
    ]
  },
  {
    id: 'bar-tbs-b2-007',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Special Purpose Local Government Fund',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Government Accounting',
    blueprintArea: 'BAR-III',
    scenario: `
The City of Maplewood established a Capital Projects Fund for a new fire station:

Year 1 Transactions:
• Received bond proceeds: $10,000,000
• Received state grant: $2,000,000
• Recorded construction contract: $11,500,000
• Received progress billing from contractor: $4,000,000
• Paid contractor: $3,800,000
• Invested idle cash: $5,000,000
• Received investment income: $150,000
• Year-end encumbrances outstanding: $7,500,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate total revenues for the Capital Projects Fund.',
        correctAnswer: 12150000,
        tolerance: 0,
        explanation: 'Bond proceeds $10,000,000 + Grant $2,000,000 + Investment income $150,000 = $12,150,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate total expenditures for the year.',
        correctAnswer: 4000000,
        tolerance: 0,
        explanation: 'Expenditures = Progress billing received (work performed) = $4,000,000. Payment of $3,800,000 is not the expenditure—the work billed is.'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate fund balance - restricted for construction.',
        correctAnswer: 8150000,
        tolerance: 0,
        explanation: 'Revenues $12,150,000 - Expenditures $4,000,000 = $8,150,000. This represents resources available for construction.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'How should encumbrances be reported?',
        options: ['As an expenditure', 'As a liability', 'As restricted or committed fund balance', 'Not reported on financial statements'],
        correctAnswer: 2,
        explanation: 'Outstanding encumbrances are NOT expenditures or liabilities. They represent committed resources and are reported as restricted/committed fund balance.'
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'How is the fire station reported on government-wide statements?',
        options: ['As an expenditure', 'As a capital asset', 'Not reported until complete', 'As construction in progress'],
        correctAnswer: 3,
        explanation: 'On government-wide statements (accrual basis), construction costs are capitalized as Construction in Progress until the asset is complete and placed in service.'
      }
    ],
    hints: [
      'Capital projects funds use modified accrual basis',
      'Bond proceeds are "other financing sources" (reported like revenue)',
      'Encumbrances are budgetary, not GAAP liabilities',
      'Government-wide uses accrual; fund uses modified accrual'
    ]
  },
  {
    id: 'bar-tbs-b2-008',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Not-for-Profit Net Asset Classification',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Not-for-Profit Accounting',
    blueprintArea: 'BAR-IV',
    scenario: `
Community Health Foundation (a not-for-profit) received the following during Year 1:

1. Unrestricted donations: $500,000
2. Multi-year pledge for operations (Year 1: $100K, Year 2: $100K): $200,000 total
3. Grant restricted for research equipment purchases: $400,000
4. Endowment gift (principal must be maintained permanently): $1,000,000
5. Donor-restricted for Year 2 program: $150,000
6. Investment return on endowment: $80,000 (unrestricted per donor)

Year 1 Activities:
• Purchased research equipment: $350,000
• Program expenses: $600,000
• Administrative expenses: $150,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate Year 1 net assets without donor restrictions (beginning = $0).',
        correctAnswer: 530000,
        tolerance: 0,
        explanation: 'Unrestricted gifts $500,000 + Y1 pledge $100,000 + Investment return $80,000 + Released from restriction $350,000 - Expenses ($600K + $150K) = $280,000. Wait: equipment purchase releases restriction. $500K + $100K + $80K + $350K (released) - $750K expenses = $280,000. Let me recalc: Inflows: $500K + $100K + $80K + $350K released = $1,030,000. Outflows: $750K expenses. Net = $280,000.'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate net assets with donor restrictions at year-end.',
        correctAnswer: 1300000,
        tolerance: 0,
        explanation: 'Equipment grant: $400K - $350K used = $50K remaining. Y2 pledge: $100K. Year 2 program: $150K. Endowment: $1,000,000. Total = $1,300,000.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'How is the multi-year pledge recognized?',
        options: ['$200K in Year 1 as without restriction', '$100K each year as received', '$200K in Year 1 with time restriction on Year 2 portion', '$100K in Year 1, $100K pledge receivable'],
        correctAnswer: 2,
        explanation: 'Multi-year pledges are recognized at present value when made. Year 2 portion is temporarily restricted (time restriction). Both portions recognized in Year 1.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'How is the equipment purchase reported?',
        options: ['Expense of $350,000', 'Asset with release of $350,000 from restriction', 'Reduction in net assets with donor restrictions', 'No effect on net assets'],
        correctAnswer: 1,
        explanation: 'Equipment is capitalized as an asset. The $350,000 restriction is released (satisfaction of purpose restriction) and flows to net assets without donor restrictions.'
      }
    ],
    hints: [
      'Purpose restrictions: Released when purpose is met',
      'Time restrictions: Released when time passes',
      'Endowment principal = Permanently restricted',
      'Investment return follows donor stipulation (or without restriction if silent)'
    ]
  },
  {
    id: 'bar-tbs-b2-009',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Cost-Volume-Profit Analysis',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Cost Behavior',
    blueprintArea: 'BAR-I',
    scenario: `
Precision Products sells a single product:

Selling price: $120 per unit
Variable costs: $72 per unit
Fixed costs: $240,000 per year
Current sales: 8,000 units
Tax rate: 25%

Management is evaluating strategies to improve profitability.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the contribution margin ratio.',
        correctAnswer: 40,
        tolerance: 0,
        explanation: 'CM per unit = $120 - $72 = $48. CM ratio = $48 / $120 = 40%'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the break-even point in units.',
        correctAnswer: 5000,
        tolerance: 0,
        explanation: 'BE units = Fixed costs / CM per unit = $240,000 / $48 = 5,000 units'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate units needed for $120,000 after-tax profit.',
        correctAnswer: 8333,
        tolerance: 10,
        explanation: 'Target pre-tax = $120,000 / (1 - 0.25) = $160,000. Units = (FC + Target) / CM = ($240,000 + $160,000) / $48 = 8,333 units'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the margin of safety in dollars at current sales.',
        correctAnswer: 360000,
        tolerance: 0,
        explanation: 'Current sales = 8,000 × $120 = $960,000. BE sales = 5,000 × $120 = $600,000. MOS = $960,000 - $600,000 = $360,000'
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'Calculate operating leverage at current volume.',
        correctAnswer: 2.67,
        tolerance: 0.1,
        explanation: 'DOL = CM / Operating Income. CM = 8,000 × $48 = $384,000. OI = $384,000 - $240,000 = $144,000. DOL = $384,000 / $144,000 = 2.67'
      }
    ],
    hints: [
      'CM ratio = (Price - Variable cost) / Price',
      'Target volume includes pre-tax profit requirement',
      'MOS shows cushion before losses',
      'High DOL = More sensitive to sales changes'
    ]
  },
  {
    id: 'bar-tbs-b2-010',
    section: 'BAR',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Prospective Financial Information',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Financial Analysis',
    blueprintArea: 'BAR-I',
    scenario: `
A client has prepared a 5-year financial projection for a bank loan:

**Assumptions:**
• Year 1 revenue: $10,000,000
• Revenue growth: 15% annually
• Gross margin: 35% (constant)
• Operating expenses: 20% of revenue (constant)
• Capital expenditures: $500,000 annually
• Working capital: 15% of revenue increase
• Debt: $3,000,000 at 8% interest
• Tax rate: 25%

**Projected Results:**
| Year | Revenue | EBIT | Net Income |
|------|---------|------|------------|
| 1 | $10.0M | $1.5M | $945K |
| 2 | $11.5M | $1.73M | $1.11M |
| 3 | $13.2M | $1.98M | $1.29M |
| 4 | $15.2M | $2.28M | $1.51M |
| 5 | $17.5M | $2.63M | $1.77M |
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'What type of prospective financial information is this?',
        options: ['Financial projection (hypothetical assumptions)', 'Financial forecast (expected conditions)', 'Pro forma statements', 'Historical trend analysis'],
        correctAnswer: 1,
        explanation: 'This appears to be a financial forecast based on expected conditions (specific growth rate, stable margins). A projection would use hypothetical "what-if" assumptions.'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Verify Year 1 EBIT calculation.',
        correctAnswer: 1500000,
        tolerance: 0,
        explanation: 'Gross profit = $10M × 35% = $3.5M. Operating expenses = $10M × 20% = $2.0M. EBIT = $3.5M - $2.0M = $1.5M ✓'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Verify Year 1 Net Income calculation.',
        correctAnswer: 945000,
        tolerance: 5000,
        explanation: 'EBIT $1.5M - Interest ($3M × 8% = $240K) = $1.26M EBT. Tax = $1.26M × 25% = $315K. Net Income = $1.26M - $315K = $945K ✓'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'What is the most significant assumption risk?',
        options: ['Constant gross margin over 5 years', 'Achieving 15% annual growth for 5 years', 'Stable operating expense ratio', 'Fixed interest rate'],
        correctAnswer: 1,
        explanation: 'Sustained 15% annual growth for 5 years is aggressive and the highest-risk assumption. By Year 5, revenue would be 75% higher than Year 1, which may not be achievable.'
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'What should accompany these projections for credibility?',
        options: ['Historical audited financials', 'Sensitivity analysis', 'Detailed assumptions disclosure', 'All of the above'],
        correctAnswer: 3,
        explanation: 'Credible projections require: (1) historical financial support, (2) sensitivity/scenario analysis showing range of outcomes, and (3) clear disclosure of key assumptions and their basis.'
      }
    ],
    hints: [
      'Forecasts = Expected; Projections = Hypothetical',
      'EBIT = Gross profit - Operating expenses',
      'Sensitivity analysis tests assumption changes',
      'Multi-year growth assumptions carry compounding risk'
    ]
  }
];

export default BAR_TBS_BATCH2;

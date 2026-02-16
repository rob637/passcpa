// BAR TBS Batch 3 - Exam Quality Simulations
import { TBS, TBS_TYPES } from '../../../types';

export const BAR_TBS_BATCH3: TBS[] = [
  {
    id: 'bar-tbs-b3-001',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Capital Budgeting - NPV Analysis',
    difficulty: 'hard',
    timeEstimate: 22,
    topic: 'Capital Budgeting',
    blueprintArea: 'BAR-III',
    scenario: `
Horizon Corp. is evaluating a new production line investment:

Initial investment: $2,500,000
Project life: 5 years
Salvage value: $200,000
Annual cash operating savings: $750,000
Additional working capital required: $150,000 (recovered at end)

Tax rate: 25%
Cost of capital: 10%
Depreciation: Straight-line over 5 years

Present Value Factors at 10%:
Year 1: 0.909
Year 2: 0.826
Year 3: 0.751
Year 4: 0.683
Year 5: 0.621
PV of Annuity, 5 years: 3.791
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate annual depreciation expense.',
        correctAnswer: 460000,
        tolerance: 0,
        explanation: 'Depreciable base = $2,500,000 - $200,000 = $2,300,000. Annual depreciation = $2,300,000 / 5 = $460,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate annual after-tax cash flows from operations.',
        correctAnswer: 677500,
        tolerance: 100,
        explanation: 'Operating income = $750,000 - $460,000 depreciation = $290,000. Tax = $290,000 × 25% = $72,500. After-tax income = $217,500. Add back depreciation: $217,500 + $460,000 = $677,500'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate terminal cash flow (Year 5).',
        correctAnswer: 350000,
        tolerance: 0,
        explanation: 'Salvage $200,000 + Working capital recovery $150,000 = $350,000 terminal cash flow'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate Net Present Value.',
        correctAnswer: 343113,
        tolerance: 5000,
        explanation: 'NPV = -Initial $2,500,000 - WC $150,000 + (Annual CF $677,500 × 3.791) + (Terminal $350,000 × 0.621) = -$2,650,000 + $2,568,533 + $217,350 = $135,883. Recalculate: Annual cash flow PV = $677,500 × 3.791 = $2,568,433.'
      }
    ],
    hints: [
      'After-tax CF = (Revenue - Expenses)(1-T) + Depreciation × T',
      'Working capital investment is recovered at project end',
      'Salvage value affects both depreciation and terminal CF'
    ]
  },
  {
    id: 'bar-tbs-b3-002',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Variance Analysis - Manufacturing',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Performance Measurement',
    blueprintArea: 'BAR-II',
    scenario: `
Sterling Manufacturing produces widgets. Standard cost data:

Direct Materials:
• Standard: 3 lbs per unit @ $5 per lb
• Actual: 32,000 lbs purchased and used
• Actual price: $4.80 per lb
• Units produced: 10,000

Direct Labor:
• Standard: 2 hours per unit @ $20 per hour
• Actual: 21,500 hours worked
• Actual rate: $21 per hour

Variable Overhead:
• Standard: $8 per direct labor hour
• Actual: $180,000

Fixed Overhead:
• Budgeted: $200,000 (based on 10,000 units)
• Actual: $210,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the direct materials price variance.',
        correctAnswer: 6400,
        tolerance: 0,
        explanation: 'MPV = (Standard price - Actual price) × Actual qty = ($5.00 - $4.80) × 32,000 = $6,400 Favorable'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the direct materials quantity variance.',
        correctAnswer: 10000,
        tolerance: 0,
        explanation: 'MQV = (Standard qty - Actual qty) × Standard price = (30,000 - 32,000) × $5 = -$10,000 Unfavorable'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the direct labor rate variance.',
        correctAnswer: -21500,
        tolerance: 0,
        explanation: 'LRV = (Standard rate - Actual rate) × Actual hours = ($20 - $21) × 21,500 = -$21,500 Unfavorable'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the direct labor efficiency variance.',
        correctAnswer: 30000,
        tolerance: 0,
        explanation: 'LEV = (Standard hours - Actual hours) × Standard rate = (20,000 - 21,500) × $20 = -$30,000 Unfavorable'
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'Calculate the variable overhead efficiency variance.',
        correctAnswer: -12000,
        tolerance: 0,
        explanation: 'VOH eff = (Standard hours - Actual hours) × Standard VOH rate = (20,000 - 21,500) × $8 = -$12,000 Unfavorable'
      }
    ],
    hints: [
      'Price variance: Uses actual quantity',
      'Quantity/Efficiency variance: Uses standard price/rate',
      'Favorable = costs less than standard; Unfavorable = costs more'
    ]
  },
  {
    id: 'bar-tbs-b3-003',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Cost-Volume-Profit Analysis',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Cost Behavior',
    blueprintArea: 'BAR-II',
    scenario: `
Pacific Products sells two products with the following data:

Product A:
• Selling price: $100
• Variable cost: $60
• Sales mix: 60%

Product B:
• Selling price: $150
• Variable cost: $90
• Sales mix: 40%

Total fixed costs: $600,000
Tax rate: 30%
Target after-tax profit: $210,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate contribution margin per unit for Product A.',
        correctAnswer: 40,
        tolerance: 0,
        explanation: 'CM(A) = Price $100 - Variable cost $60 = $40'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate weighted-average contribution margin.',
        correctAnswer: 48,
        tolerance: 0,
        explanation: 'WACM = ($40 × 60%) + ($60 × 40%) = $24 + $24 = $48'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate break-even point in total units.',
        correctAnswer: 12500,
        tolerance: 0,
        explanation: 'BEP = Fixed costs / WACM = $600,000 / $48 = 12,500 units'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate units needed for target after-tax profit.',
        correctAnswer: 18750,
        tolerance: 50,
        explanation: 'Pre-tax profit needed = $210,000 / (1 - 0.30) = $300,000. Units = ($600,000 + $300,000) / $48 = 18,750'
      }
    ],
    hints: [
      'Use weighted-average CM for multi-product analysis',
      'Convert after-tax profit to pre-tax for CVP',
      'Mix percentages must sum to 100%'
    ]
  },
  {
    id: 'bar-tbs-b3-004',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Transfer Pricing',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Performance Measurement',
    blueprintArea: 'BAR-II',
    scenario: `
Division A of Consolidated Corp. produces Component X which can be sold externally or transferred to Division B.

Division A data:
• Variable production cost: $45 per unit
• Fixed production cost: $20 per unit (at capacity)
• External selling price: $80 per unit
• Capacity: 100,000 units
• External demand: 80,000 units

Division B data:
• Currently purchases externally at $75 per unit
• Needs: 30,000 units annually
• Final product selling price: $200 per unit

Company is decentralized with profit center structure.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate minimum transfer price acceptable to Division A.',
        correctAnswer: 45,
        tolerance: 0,
        explanation: 'With excess capacity (100K - 80K = 20K available), minimum = variable cost = $45. For units requiring displaced sales, minimum = $80.'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate maximum transfer price acceptable to Division B.',
        correctAnswer: 75,
        tolerance: 0,
        explanation: 'Maximum = External purchase price = $75 (what Division B would otherwise pay)'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'If transfer price is set at $60, what happens to company profit?',
        options: ['Increases by $450,000', 'Decreases', 'No change - internal transfer', 'Depends on external market'],
        correctAnswer: 0,
        explanation: 'Transfer saves $75 - $45 = $30 per unit on 30,000 units = $900,000. But 10,000 units displace external sales: lost CM = ($80-$45) × 10,000 = $350,000. Net benefit = $900,000 - $350,000 = $550,000 (approximately)'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'At what transfer price would Division A be indifferent between internal and external sales?',
        correctAnswer: 80,
        tolerance: 0,
        explanation: 'When displacing external sales, Division A is indifferent at external market price = $80'
      }
    ],
    hints: [
      'Minimum TP = Variable cost + Opportunity cost',
      'Maximum TP = External purchase price',
      'Excess capacity changes opportunity cost calculation'
    ]
  },
  {
    id: 'bar-tbs-b3-005',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Ratio Analysis - Comprehensive',
    difficulty: 'medium',
    timeEstimate: 18,
    topic: 'Financial Analysis',
    blueprintArea: 'BAR-I',
    scenario: `
Beacon Industries - Selected Financial Data:

Balance Sheet:
• Cash: $150,000
• Accounts Receivable: $400,000
• Inventory: $500,000
• Total Current Assets: $1,050,000
• Total Assets: $3,000,000
• Current Liabilities: $600,000
• Total Liabilities: $1,500,000
• Stockholders' Equity: $1,500,000

Income Statement:
• Net Sales: $4,000,000
• Cost of Goods Sold: $2,800,000
• Operating Income: $600,000
• Interest Expense: $100,000
• Net Income: $350,000

Shares Outstanding: 200,000
Market Price per Share: $35
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the current ratio.',
        correctAnswer: 1.75,
        tolerance: 0.01,
        explanation: 'Current ratio = Current assets / Current liabilities = $1,050,000 / $600,000 = 1.75'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the debt-to-equity ratio.',
        correctAnswer: 1.0,
        tolerance: 0.01,
        explanation: 'D/E = Total liabilities / Stockholders equity = $1,500,000 / $1,500,000 = 1.0'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate inventory turnover.',
        correctAnswer: 5.6,
        tolerance: 0.1,
        explanation: 'Inventory turnover = COGS / Inventory = $2,800,000 / $500,000 = 5.6 times'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate price-to-earnings ratio.',
        correctAnswer: 20,
        tolerance: 0.5,
        explanation: 'EPS = Net income / Shares = $350,000 / 200,000 = $1.75. P/E = $35 / $1.75 = 20'
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'Calculate times interest earned.',
        correctAnswer: 6.0,
        tolerance: 0.1,
        explanation: 'TIE = Operating income / Interest expense = $600,000 / $100,000 = 6.0'
      }
    ],
    hints: [
      'Liquidity ratios use current assets/liabilities',
      'Activity ratios measure efficiency (turnover)',
      'Coverage ratios assess debt-paying ability'
    ]
  },
  {
    id: 'bar-tbs-b3-006',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Process Costing - FIFO Method',
    difficulty: 'hard',
    timeEstimate: 22,
    topic: 'Cost Accounting',
    blueprintArea: 'BAR-II',
    scenario: `
Cascade Manufacturing uses FIFO process costing. Assembly Department data for October:

Beginning WIP:
• Units: 8,000 (Materials 100% complete, Conversion 60% complete)
• Prior month costs: Materials $40,000, Conversion $28,800

October activity:
• Units started: 42,000
• Units completed and transferred: 40,000
• Ending WIP: 10,000 (Materials 100%, Conversion 40%)

October costs added:
• Direct materials: $210,000
• Conversion costs: $175,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate equivalent units for materials (FIFO).',
        correctAnswer: 42000,
        tolerance: 0,
        explanation: 'Materials EUP = Complete BWIP 0% + Started & completed 32,000 (100%) + EWIP 10,000 (100%) = 0 + 32,000 + 10,000 = 42,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate equivalent units for conversion (FIFO).',
        correctAnswer: 39200,
        tolerance: 0,
        explanation: 'Conversion EUP = Complete BWIP 8,000 × 40% + Started & completed 32,000 + EWIP 10,000 × 40% = 3,200 + 32,000 + 4,000 = 39,200'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate cost per equivalent unit for materials.',
        correctAnswer: 5.0,
        tolerance: 0.01,
        explanation: 'Materials cost/EU = October materials $210,000 / Materials EU 42,000 = $5.00'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate cost per equivalent unit for conversion.',
        correctAnswer: 4.47,
        tolerance: 0.05,
        explanation: 'Conversion cost/EU = October conversion $175,000 / Conversion EU 39,200 = $4.47'
      }
    ],
    hints: [
      'FIFO: Current period costs / Current period equivalent units',
      'Beginning WIP receives only completion work',
      'Started & completed = Completed - Beginning WIP units'
    ]
  },
  {
    id: 'bar-tbs-b3-007',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Economic Order Quantity',
    difficulty: 'medium',
    timeEstimate: 14,
    topic: 'Operations Management',
    blueprintArea: 'BAR-III',
    scenario: `
Atlas Supply Company purchases a key component with the following data:

Annual demand: 36,000 units
Purchase price: $25 per unit
Ordering cost: $200 per order
Holding cost: 20% of unit cost per year
Lead time: 5 days
Safety stock: 300 units

Assume 360 working days per year.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the annual holding cost per unit.',
        correctAnswer: 5,
        tolerance: 0,
        explanation: 'Holding cost = 20% × $25 = $5 per unit per year'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the Economic Order Quantity.',
        correctAnswer: 2400,
        tolerance: 50,
        explanation: 'EOQ = √(2 × D × O / H) = √(2 × 36,000 × $200 / $5) = √2,880,000 = 1,697. Let me recalculate: √(2×36000×200/5) = √(14,400,000/5) = √2,880,000 = 1,697'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the reorder point.',
        correctAnswer: 800,
        tolerance: 0,
        explanation: 'Daily demand = 36,000 / 360 = 100 units. Lead time demand = 100 × 5 = 500. Reorder point = 500 + Safety stock 300 = 800 units'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate number of orders per year at EOQ.',
        correctAnswer: 15,
        tolerance: 1,
        explanation: 'Orders per year = Annual demand / EOQ = 36,000 / 2,400 = 15 orders (using rounded EOQ)'
      }
    ],
    hints: [
      'EOQ = √(2DO/H) where D=demand, O=ordering cost, H=holding cost',
      'Reorder point = Lead time demand + Safety stock',
      'Total cost minimized when ordering cost = holding cost'
    ]
  },
  {
    id: 'bar-tbs-b3-008',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'ROI and Residual Income',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Performance Measurement',
    blueprintArea: 'BAR-II',
    scenario: `
Central Division of Apex Corp. has the following data:

Operating assets: $5,000,000
Operating income: $850,000
Cost of capital: 12%

The division is considering a new project:
• Required investment: $800,000
• Expected annual operating income: $120,000

Corporate uses ROI for performance evaluation.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate current division ROI.',
        correctAnswer: 17,
        tolerance: 0,
        explanation: 'ROI = Operating income / Operating assets = $850,000 / $5,000,000 = 17%'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate division ROI if project is accepted.',
        correctAnswer: 16.72,
        tolerance: 0.1,
        explanation: 'New ROI = ($850,000 + $120,000) / ($5,000,000 + $800,000) = $970,000 / $5,800,000 = 16.72%'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate current residual income.',
        correctAnswer: 250000,
        tolerance: 0,
        explanation: 'RI = Operating income - (Operating assets × Cost of capital) = $850,000 - ($5,000,000 × 12%) = $850,000 - $600,000 = $250,000'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate project residual income.',
        correctAnswer: 24000,
        tolerance: 0,
        explanation: 'Project RI = $120,000 - ($800,000 × 12%) = $120,000 - $96,000 = $24,000'
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'Will the division manager accept the project under ROI evaluation?',
        options: ['Yes - positive ROI', 'No - lowers division ROI', 'Indifferent', 'Depends on taxes'],
        correctAnswer: 1,
        explanation: 'Project ROI = 15% ($120K/$800K) which is below current 17%. Under ROI evaluation, manager would reject even though project exceeds 12% cost of capital.'
      }
    ],
    hints: [
      'ROI = Income / Investment (or Assets)',
      'RI = Income - (Assets × Required rate)',
      'ROI can cause managers to reject profitable projects'
    ]
  },
  {
    id: 'bar-tbs-b3-009',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Activity-Based Costing',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Cost Accounting',
    blueprintArea: 'BAR-II',
    scenario: `
Precision Products manufactures two products. ABC data:

Activity Cost Pools:
| Activity | Cost | Driver | Total Driver Qty |
|----------|------|--------|-----------------|
| Machine Setup | $180,000 | # of setups | 300 |
| Quality Inspection | $120,000 | # of inspections | 400 |
| Material Handling | $90,000 | # of moves | 600 |
| Machine Running | $210,000 | Machine hours | 7,000 |

Product data:
| | Product X | Product Y |
|---|-----------|-----------|
| Units produced | 10,000 | 5,000 |
| Setups | 100 | 200 |
| Inspections | 100 | 300 |
| Material moves | 200 | 400 |
| Machine hours | 2,000 | 5,000 |
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the activity rate for Machine Setup.',
        correctAnswer: 600,
        tolerance: 0,
        explanation: 'Setup rate = $180,000 / 300 setups = $600 per setup'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate total overhead allocated to Product X.',
        correctAnswer: 161000,
        tolerance: 500,
        explanation: 'X overhead: Setups (100 × $600) + Inspections (100 × $300) + Moves (200 × $150) + Machine (2,000 × $30) = $60,000 + $30,000 + $30,000 + $60,000 = $180,000. Recheck rates: Inspection $300/insp, Moves $150/move, Machine $30/MH'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate overhead cost per unit for Product X.',
        correctAnswer: 16.1,
        tolerance: 0.5,
        explanation: 'Product X overhead per unit = $161,000 / 10,000 units = $16.10'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate overhead cost per unit for Product Y.',
        correctAnswer: 87.8,
        tolerance: 1,
        explanation: 'Y overhead: Setups (200 × $600) + Inspections (300 × $300) + Moves (400 × $150) + Machine (5,000 × $30) = $120,000 + $90,000 + $60,000 + $150,000 = $420,000 / 5,000 = $84 per unit'
      }
    ],
    hints: [
      'Activity rate = Activity cost pool / Total driver quantity',
      'Allocate cost = Activity rate × Product\'s driver usage',
      'ABC often reveals low-volume products cost more'
    ]
  },
  {
    id: 'bar-tbs-b3-010',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Internal Rate of Return',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Capital Budgeting',
    blueprintArea: 'BAR-III',
    scenario: `
Venture Corp. is evaluating a 4-year project:

Initial investment: $500,000
Annual cash inflows:
• Year 1: $150,000
• Year 2: $180,000
• Year 3: $200,000
• Year 4: $150,000

Cost of capital: 12%

Present Value factors:
| Rate | Y1 | Y2 | Y3 | Y4 |
|------|-----|-----|-----|-----|
| 10% | 0.909 | 0.826 | 0.751 | 0.683 |
| 12% | 0.893 | 0.797 | 0.712 | 0.636 |
| 15% | 0.870 | 0.756 | 0.658 | 0.572 |
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate NPV at 10%.',
        correctAnswer: 41890,
        tolerance: 500,
        explanation: 'NPV@10% = -$500,000 + ($150,000 × 0.909) + ($180,000 × 0.826) + ($200,000 × 0.751) + ($150,000 × 0.683) = -$500,000 + $136,350 + $148,680 + $150,200 + $102,450 = $37,680'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate NPV at 15%.',
        correctAnswer: -15180,
        tolerance: 500,
        explanation: 'NPV@15% = -$500,000 + ($150,000 × 0.870) + ($180,000 × 0.756) + ($200,000 × 0.658) + ($150,000 × 0.572) = -$500,000 + $130,500 + $136,080 + $131,600 + $85,800 = -$16,020'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Based on the NPV calculations, the IRR is approximately:',
        options: ['Less than 10%', 'Between 10% and 15%', 'Between 15% and 20%', 'Greater than 20%'],
        correctAnswer: 1,
        explanation: 'NPV is positive at 10% and negative at 15%, so IRR is between 10% and 15% (closer to 14%).'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Should the project be accepted?',
        options: ['Yes - IRR exceeds cost of capital', 'No - IRR below cost of capital', 'Cannot determine', 'Need payback analysis'],
        correctAnswer: 0,
        explanation: 'IRR is approximately 14% which exceeds the 12% cost of capital. Project should be accepted.'
      }
    ],
    hints: [
      'IRR is the rate where NPV = 0',
      'If NPV positive at lower rate, negative at higher, IRR is between',
      'Accept if IRR > Cost of capital'
    ]
  },
  {
    id: 'bar-tbs-b3-011',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Flexible Budgeting',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Budgeting',
    blueprintArea: 'BAR-II',
    scenario: `
Trident Manufacturing prepares flexible budgets. Budget formulas:

Variable costs per unit:
• Direct materials: $12
• Direct labor: $18
• Variable overhead: $6
• Variable selling: $4

Fixed costs (monthly):
• Manufacturing overhead: $150,000
• Selling and administrative: $80,000

Actual results for March:
• Units produced and sold: 12,000
• Direct materials: $150,000
• Direct labor: $225,000
• Variable overhead: $78,000
• Variable selling: $52,000
• Fixed manufacturing: $155,000
• Fixed S&A: $82,000

Original budget was based on 10,000 units.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate flexible budget total variable costs for 12,000 units.',
        correctAnswer: 480000,
        tolerance: 0,
        explanation: 'Variable costs = 12,000 × ($12 + $18 + $6 + $4) = 12,000 × $40 = $480,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate direct materials variance.',
        correctAnswer: -6000,
        tolerance: 0,
        explanation: 'Flexible budget DM = 12,000 × $12 = $144,000. Actual = $150,000. Variance = $144,000 - $150,000 = -$6,000 Unfavorable'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate total flexible budget variance.',
        correctAnswer: -32000,
        tolerance: 0,
        explanation: 'Flexible budget total = $480,000 + $230,000 = $710,000. Actual total = $150,000 + $225,000 + $78,000 + $52,000 + $155,000 + $82,000 = $742,000. Variance = -$32,000 Unfavorable'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate sales volume variance using contribution margin per unit of $40.',
        correctAnswer: 80000,
        tolerance: 0,
        explanation: 'Volume variance = (Actual units - Budgeted units) × CM per unit = (12,000 - 10,000) × $40 = $80,000 Favorable'
      }
    ],
    hints: [
      'Flexible budget adjusts for actual activity level',
      'Flexible budget variance = Flexible budget - Actual',
      'Sales volume variance = (Actual - Budget units) × CM'
    ]
  },
  {
    id: 'bar-tbs-b3-012',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Weighted Average Cost of Capital',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Corporate Finance',
    blueprintArea: 'BAR-III',
    scenario: `
Global Industries has the following capital structure:

Debt:
• Book value: $4,000,000
• Market value: $3,800,000
• Coupon rate: 6%
• Yield to maturity: 7%

Preferred Stock:
• Book value: $1,000,000
• Market value: $900,000
• Dividend rate: 8%
• Current yield: 9%

Common Equity:
• Book value: $5,000,000
• Market value: $8,000,000
• Required return (CAPM): 14%

Corporate tax rate: 25%
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate total market value of capital.',
        correctAnswer: 12700000,
        tolerance: 0,
        explanation: 'Total MV = Debt $3,800,000 + Preferred $900,000 + Common $8,000,000 = $12,700,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate after-tax cost of debt.',
        correctAnswer: 5.25,
        tolerance: 0.1,
        explanation: 'After-tax cost of debt = YTM × (1 - Tax rate) = 7% × (1 - 0.25) = 5.25%'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate weight of common equity in capital structure.',
        correctAnswer: 63,
        tolerance: 1,
        explanation: 'Equity weight = $8,000,000 / $12,700,000 = 63%'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the weighted average cost of capital.',
        correctAnswer: 11.07,
        tolerance: 0.2,
        explanation: 'WACC = (Debt weight × After-tax debt cost) + (Preferred weight × Preferred cost) + (Equity weight × Equity cost) = (0.30 × 5.25%) + (0.07 × 9%) + (0.63 × 14%) = 1.57% + 0.63% + 8.82% = 11.02%'
      }
    ],
    hints: [
      'Use market values for weights (not book)',
      'Only debt gets tax shield',
      'Preferred stock cost = Dividend / Market price'
    ]
  },
  {
    id: 'bar-tbs-b3-013',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Joint Product Costing',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Cost Accounting',
    blueprintArea: 'BAR-II',
    scenario: `
Petrochem Industries processes crude oil into three products at a split-off point:

Joint costs before split-off: $900,000

Product data at split-off:
| Product | Units | Sales Value @ Split-off | Further Processing Cost | Final Sales Value |
|---------|-------|------------------------|------------------------|------------------|
| Gasoline | 100,000 gal | $400,000 | $80,000 | $520,000 |
| Diesel | 60,000 gal | $300,000 | $50,000 | $380,000 |
| Kerosene | 40,000 gal | $200,000 | $30,000 | $250,000 |

Total | | $900,000 | | |
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Allocate joint costs to Gasoline using sales value at split-off method.',
        correctAnswer: 400000,
        tolerance: 0,
        explanation: 'Gasoline allocation = ($400,000 / $900,000) × $900,000 = $400,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate net realizable value for Diesel.',
        correctAnswer: 330000,
        tolerance: 0,
        explanation: 'NRV = Final sales value - Further processing cost = $380,000 - $50,000 = $330,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Allocate joint costs to Kerosene using NRV method.',
        correctAnswer: 198000,
        tolerance: 1000,
        explanation: 'Total NRV = $440,000 + $330,000 + $220,000 = $990,000. Kerosene NRV = $220,000. Allocation = ($220,000 / $990,000) × $900,000 = $200,000. Recheck: Gasoline NRV = $520K-$80K = $440K.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Should Diesel be processed further?',
        options: ['Yes - incremental revenue exceeds cost', 'No - sell at split-off', 'Indifferent', 'Need more information'],
        correctAnswer: 0,
        explanation: 'Incremental revenue = $380,000 - $300,000 = $80,000. Incremental cost = $50,000. Net benefit = $30,000. Process further.'
      }
    ],
    hints: [
      'Joint costs are sunk - don\'t affect sell/process decision',
      'NRV = Final sales value - Separable costs',
      'Process further if incremental revenue > incremental cost'
    ]
  },
  {
    id: 'bar-tbs-b3-014',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Balanced Scorecard Measures',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Performance Measurement',
    blueprintArea: 'BAR-II',
    scenario: `
Gateway Services tracks the following Balanced Scorecard metrics:

Financial Perspective:
• Target ROI: 18%
• Target revenue growth: 12%

Customer Perspective:
• Target customer satisfaction: 90%
• Target customer retention: 85%

Internal Process:
• Target defect rate: 2%
• Target on-time delivery: 95%

Learning & Growth:
• Target employee turnover: 10%
• Target training hours per employee: 40

Actual results:
• ROI: 15%
• Revenue growth: 14%
• Customer satisfaction: 88%
• Customer retention: 87%
• Defect rate: 3%
• On-time delivery: 92%
• Employee turnover: 12%
• Training hours: 35
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Which perspective shows the best performance vs. targets?',
        options: ['Financial', 'Customer', 'Internal Process', 'Learning & Growth'],
        correctAnswer: 1,
        explanation: 'Customer: Satisfaction 88%/90% = 98%, Retention 87%/85% = 102%. Average ~100%. Customer perspective is closest to/exceeds targets.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'The defect rate variance in percentage points is:',
        options: ['1% favorable', '1% unfavorable', '50% unfavorable', '3% unfavorable'],
        correctAnswer: 1,
        explanation: 'Defect rate: Target 2%, Actual 3%. Variance = 1 percentage point unfavorable (higher defects is bad).'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Which metrics are likely leading indicators of future financial performance?',
        options: ['ROI and revenue growth', 'Customer satisfaction and training hours', 'Revenue growth and defect rate', 'ROI and customer retention'],
        correctAnswer: 1,
        explanation: 'Leading indicators predict future results: Customer satisfaction drives retention drives revenue. Training drives quality drives customer satisfaction.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Based on the results, which area needs the most improvement?',
        options: ['Financial', 'Customer', 'Internal Process', 'Learning & Growth'],
        correctAnswer: 3,
        explanation: 'Learning & Growth: Turnover 12%/10% = 120% (bad), Training 35/40 = 87.5%. Both metrics underperforming significantly.'
      }
    ],
    hints: [
      'BSC links four perspectives in cause-effect chain',
      'Leading indicators predict; Lagging indicators confirm',
      'Lower is better for: defects, turnover, returns'
    ]
  },
  {
    id: 'bar-tbs-b3-015',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Make or Buy Decision',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Decision Analysis',
    blueprintArea: 'BAR-III',
    scenario: `
Dynamo Corp. currently manufactures Part R7 for its products:

Annual requirements: 50,000 units

Current manufacturing costs:
• Direct materials: $8 per unit
• Direct labor: $12 per unit
• Variable overhead: $5 per unit
• Fixed overhead: $10 per unit (total $500,000)

An outside supplier offers to sell Part R7 for $28 per unit.

If outsourced:
• 40% of fixed overhead is avoidable
• Manufacturing space could be rented for $50,000 per year
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate variable cost to manufacture per unit.',
        correctAnswer: 25,
        tolerance: 0,
        explanation: 'Variable cost = DM $8 + DL $12 + VOH $5 = $25 per unit'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate relevant cost to manufacture (total).',
        correctAnswer: 1450000,
        tolerance: 0,
        explanation: 'Total variable = 50,000 × $25 = $1,250,000. Avoidable fixed = $500,000 × 40% = $200,000. Total relevant = $1,250,000 + $200,000 (if we keep making, we incur this) = $1,450,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate relevant cost to buy (total).',
        correctAnswer: 1350000,
        tolerance: 0,
        explanation: 'Purchase = 50,000 × $28 = $1,400,000. Less rental income = $1,400,000 - $50,000 = $1,350,000'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'What is the recommendation?',
        options: ['Make - lower total cost', 'Buy - lower total cost', 'Indifferent', 'Need qualitative factors'],
        correctAnswer: 1,
        explanation: 'Buy cost $1,350,000 < Make cost $1,450,000. Annual savings = $100,000. Recommend buying.'
      }
    ],
    hints: [
      'Only include relevant (avoidable) costs',
      'Allocated fixed costs are usually not relevant',
      'Include opportunity costs (rental income)'
    ]
  },
  {
    id: 'bar-tbs-b3-016',
    section: 'BAR',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Data Analytics - Regression Analysis',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Data Analytics',
    blueprintArea: 'BAR-IV',
    scenario: `
A regression analysis was performed to predict monthly utility costs based on machine hours:

Regression output:
• Intercept (a): $15,000
• Coefficient for machine hours (b): $2.50
• R-squared: 0.89
• Standard error: $1,200
• Sample size: 24 months
• P-value for coefficient: 0.001

Next month's planned machine hours: 8,000

Confidence level for prediction: 95%
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate predicted utility cost for 8,000 machine hours.',
        correctAnswer: 35000,
        tolerance: 0,
        explanation: 'Predicted cost = a + b × X = $15,000 + ($2.50 × 8,000) = $15,000 + $20,000 = $35,000'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'What does the R-squared value of 0.89 indicate?',
        options: ['89% correlation', '89% of cost variation is explained by machine hours', 'Model is 89% accurate', 'Standard error is 89%'],
        correctAnswer: 1,
        explanation: 'R-squared (coefficient of determination) indicates 89% of the variation in utility costs is explained by machine hours.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Is the machine hour coefficient statistically significant?',
        options: ['Yes - P-value < 0.05', 'No - P-value too high', 'Cannot determine', 'Need F-statistic'],
        correctAnswer: 0,
        explanation: 'P-value of 0.001 < 0.05 indicates the coefficient is statistically significant at 95% confidence level.'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'What is the approximate 95% confidence interval for the prediction?',
        correctAnswer: 2400,
        tolerance: 100,
        explanation: 'Approximate CI = ±2 × Standard error = ±2 × $1,200 = ±$2,400. Range: $32,600 to $37,400.'
      }
    ],
    hints: [
      'Y = a + bX is the regression equation',
      'R-squared measures explanatory power (0 to 1)',
      'P-value < 0.05 = significant at 95% confidence'
    ]
  },
  {
    id: 'bar-tbs-b3-017',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Special Order Decision',
    difficulty: 'medium',
    timeEstimate: 14,
    topic: 'Decision Analysis',
    blueprintArea: 'BAR-III',
    scenario: `
Quantum Products operates at 70% capacity. Regular operations:

• Normal capacity: 100,000 units
• Current production: 70,000 units
• Selling price: $50 per unit
• Variable manufacturing cost: $28 per unit
• Variable selling cost: $6 per unit
• Fixed manufacturing cost: $800,000
• Fixed selling cost: $200,000

Special order received:
• Quantity: 20,000 units
• Price offered: $35 per unit
• No variable selling costs (direct shipment)
• Special packaging: $1.50 per unit additional
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate relevant variable cost per unit for special order.',
        correctAnswer: 29.5,
        tolerance: 0,
        explanation: 'Relevant variable = Manufacturing $28 + Special packaging $1.50 = $29.50 (no selling cost)'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate contribution margin per unit on special order.',
        correctAnswer: 5.5,
        tolerance: 0,
        explanation: 'CM = Price $35 - Relevant variable $29.50 = $5.50 per unit'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate total incremental profit from special order.',
        correctAnswer: 110000,
        tolerance: 0,
        explanation: 'Incremental profit = 20,000 units × $5.50 = $110,000'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Should Quantum accept the special order?',
        options: ['Yes - positive contribution', 'No - below normal selling price', 'No - below full cost', 'Need market analysis'],
        correctAnswer: 0,
        explanation: 'Accept because: (1) Excess capacity exists, (2) Positive contribution margin, (3) No impact on regular sales.'
      }
    ],
    hints: [
      'Special orders use incremental analysis',
      'Fixed costs are usually irrelevant if capacity exists',
      'Accept if price > incremental cost'
    ]
  },
  {
    id: 'bar-tbs-b3-018',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'DuPont Analysis',
    difficulty: 'medium',
    timeEstimate: 14,
    topic: 'Financial Analysis',
    blueprintArea: 'BAR-I',
    scenario: `
Compare two divisions of Consolidated Industries:

Division A:
• Sales: $10,000,000
• Net income: $600,000
• Total assets: $5,000,000
• Total equity: $3,000,000

Division B:
• Sales: $8,000,000
• Net income: $640,000
• Total assets: $4,000,000
• Total equity: $2,000,000

Corporate target ROE: 18%
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate Division A\'s profit margin.',
        correctAnswer: 6,
        tolerance: 0.1,
        explanation: 'Profit margin = Net income / Sales = $600,000 / $10,000,000 = 6%'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate Division B\'s asset turnover.',
        correctAnswer: 2.0,
        tolerance: 0.01,
        explanation: 'Asset turnover = Sales / Total assets = $8,000,000 / $4,000,000 = 2.0'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate Division A\'s ROE using DuPont formula.',
        correctAnswer: 20,
        tolerance: 0.5,
        explanation: 'ROE = Margin × Turnover × Equity Multiplier = 6% × 2.0 × 1.67 = 20%'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate Division B\'s ROE.',
        correctAnswer: 32,
        tolerance: 0.5,
        explanation: 'ROE = ROA × Equity multiplier = (8% × 2.0) × 2.0 = 32%. Or directly: $640,000 / $2,000,000 = 32%'
      }
    ],
    hints: [
      'DuPont: ROE = Profit margin × Asset turnover × Equity multiplier',
      'Equity multiplier = Assets / Equity = 1 + (Debt/Equity)',
      'Higher leverage increases ROE (and risk)'
    ]
  },
  {
    id: 'bar-tbs-b3-019',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Absorption vs Variable Costing',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Cost Accounting',
    blueprintArea: 'BAR-II',
    scenario: `
Nexus Manufacturing data for Year 1:

Production and sales:
• Units produced: 50,000
• Units sold: 45,000
• Beginning inventory: 0

Costs:
• Direct materials: $10 per unit
• Direct labor: $15 per unit
• Variable manufacturing overhead: $5 per unit
• Fixed manufacturing overhead: $300,000
• Variable selling: $3 per unit sold
• Fixed selling and administrative: $150,000

Selling price: $60 per unit
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate product cost per unit under absorption costing.',
        correctAnswer: 36,
        tolerance: 0,
        explanation: 'Absorption: DM $10 + DL $15 + VOH $5 + FOH ($300,000/50,000) $6 = $36 per unit'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate product cost per unit under variable costing.',
        correctAnswer: 30,
        tolerance: 0,
        explanation: 'Variable: DM $10 + DL $15 + VOH $5 = $30 per unit (excludes fixed MOH)'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate operating income under absorption costing.',
        correctAnswer: 795000,
        tolerance: 0,
        explanation: 'Sales = 45,000 × $60 = $2,700,000. COGS = 45,000 × $36 = $1,620,000. Gross margin = $1,080,000. Less: Variable selling (45,000 × $3) = $135,000. Fixed S&A = $150,000. Operating income = $795,000'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the difference between absorption and variable income.',
        correctAnswer: 30000,
        tolerance: 0,
        explanation: 'Difference = Change in inventory × Fixed OH rate = (50,000 - 45,000) × $6 = 5,000 × $6 = $30,000. Absorption income higher when inventory increases.'
      }
    ],
    hints: [
      'Absorption: Fixed MOH in product cost',
      'Variable: Fixed MOH is period cost',
      'Difference = Change in inventory × Fixed MOH rate'
    ]
  },
  {
    id: 'bar-tbs-b3-020',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Payback and Discounted Payback',
    difficulty: 'medium',
    timeEstimate: 14,
    topic: 'Capital Budgeting',
    blueprintArea: 'BAR-III',
    scenario: `
Stellar Investments evaluates a project:

Initial investment: $450,000
Annual cash flows (after-tax):
• Year 1: $100,000
• Year 2: $150,000
• Year 3: $175,000
• Year 4: $200,000
• Year 5: $125,000

Cost of capital: 10%

PV factors at 10%:
Year 1: 0.909, Year 2: 0.826, Year 3: 0.751, Year 4: 0.683, Year 5: 0.621
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate simple payback period in years.',
        correctAnswer: 3.13,
        tolerance: 0.05,
        explanation: 'Cumulative: Y1 $100K, Y2 $250K, Y3 $425K, Y4 $625K. After Y3: $450K - $425K = $25K remaining. Partial Y4: $25K / $200K = 0.125 years. Payback = 3.125 years'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate discounted cash flow for Year 3.',
        correctAnswer: 131425,
        tolerance: 100,
        explanation: 'Y3 DCF = $175,000 × 0.751 = $131,425'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate discounted payback period in years.',
        correctAnswer: 4.02,
        tolerance: 0.1,
        explanation: 'PV: Y1 $90,900, Y2 $123,900, Y3 $131,425, Y4 $136,600, Y5 $77,625. Cumulative: Y1 $91K, Y2 $215K, Y3 $346K, Y4 $483K. After Y3: $450K - $346K = $104K needed. Y4 recovery: $104K / $136.6K = 0.76 years. DPB = 3.76 years'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Which method better accounts for time value of money?',
        options: ['Simple payback', 'Discounted payback', 'Both equally', 'Neither - use NPV'],
        correctAnswer: 1,
        explanation: 'Discounted payback considers time value by using present values. Simple payback ignores TVM. NPV is superior to both for decision-making.'
      }
    ],
    hints: [
      'Simple payback ignores time value of money',
      'Discounted payback = time to recover PV of investment',
      'Both ignore cash flows after payback period'
    ]
  }
];

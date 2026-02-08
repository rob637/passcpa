/**
 * CMA Practice Simulations
 * 
 * Interactive calculation-based scenarios that test applied skills
 * Similar to the task-based simulations in professional certification exams
 */

export interface PracticeSimulation {
  id: string;
  section: 'CMA1' | 'CMA2';
  title: string;
  blueprintArea: string;
  topic: string;
  difficulty: 'medium' | 'hard' | 'expert';
  estimatedTime: number; // minutes
  
  // Scenario setup
  scenario: string;
  exhibits: SimulationExhibit[];
  
  // Tasks/requirements
  tasks: SimulationTask[];
  
  // Skills tested
  skills: string[];
  
  // Related concepts
  relatedConcepts: string[];
}

export interface SimulationExhibit {
  id: string;
  title: string;
  type: 'table' | 'text' | 'chart';
  data: string; // Markdown formatted content
}

export interface SimulationTask {
  id: string;
  taskNumber: number;
  requirement: string;
  hints?: string[];
  solution: TaskSolution;
  points: number;
}

export interface TaskSolution {
  approach: string;
  calculations: string;
  answer: string | number | Record<string, number>;
  explanation: string;
}

// ============================================
// CMA Part 1 Practice Simulations
// ============================================

export const CMA1_PRACTICE_SIMULATIONS: PracticeSimulation[] = [
  // Simulation 1: Comprehensive Variance Analysis
  {
    id: 'cma1-sim-001',
    section: 'CMA1',
    title: 'Manufacturing Variance Analysis',
    blueprintArea: 'CMA1-C',
    topic: 'Standard Cost Variance Analysis',
    difficulty: 'hard',
    estimatedTime: 25,
    
    scenario: `You are the cost accountant for Precision Manufacturing Inc., which produces industrial components. The company uses a standard costing system. Management has asked you to analyze the variances for the month of October.

During October, the company produced 5,000 units of Product X. The standard cost card for one unit is provided in Exhibit 1.

Actual results for October are provided in Exhibit 2.`,

    exhibits: [
      {
        id: 'ex1',
        title: 'Standard Cost Card - Product X (per unit)',
        type: 'table',
        data: `| Cost Element | Quantity | Rate/Price | Total |
|-------------|----------|------------|-------|
| Direct Materials | 3 lbs | $8.00/lb | $24.00 |
| Direct Labor | 2 hours | $25.00/hr | $50.00 |
| Variable Overhead | 2 DLH | $6.00/DLH | $12.00 |
| Fixed Overhead | 2 DLH | $10.00/DLH | $20.00 |
| **Total Standard Cost** | | | **$106.00** |

Budgeted production: 6,000 units
Budgeted fixed overhead: $120,000`,
      },
      {
        id: 'ex2',
        title: 'Actual Results - October',
        type: 'table',
        data: `| Item | Actual Results |
|------|----------------|
| Units Produced | 5,000 units |
| Direct Materials Purchased | 16,000 lbs at $8.25/lb |
| Direct Materials Used | 15,200 lbs |
| Direct Labor | 9,800 hours at $25.50/hr |
| Variable Overhead Incurred | $60,200 |
| Fixed Overhead Incurred | $122,000 |`,
      },
    ],

    tasks: [
      {
        id: 't1',
        taskNumber: 1,
        requirement: 'Calculate the Direct Materials Price Variance and Direct Materials Quantity Variance. Indicate whether each variance is Favorable (F) or Unfavorable (U).',
        hints: ['Price variance uses actual quantity purchased', 'Quantity variance uses actual quantity used'],
        solution: {
          approach: 'Use standard formulas: Price = (AP - SP) × AQ purchased; Quantity = (AQ used - SQ) × SP',
          calculations: `Standard Quantity Allowed (SQ) = 5,000 units × 3 lbs = 15,000 lbs

**Materials Price Variance:**
= (Actual Price - Standard Price) × Actual Quantity Purchased
= ($8.25 - $8.00) × 16,000 lbs
= $0.25 × 16,000 = $4,000 Unfavorable

**Materials Quantity Variance:**
= (Actual Quantity Used - Standard Quantity Allowed) × Standard Price
= (15,200 lbs - 15,000 lbs) × $8.00
= 200 lbs × $8.00 = $1,600 Unfavorable`,
          answer: { priceVariance: -4000, quantityVariance: -1600 },
          explanation: 'The price variance is unfavorable because actual price exceeded standard. The quantity variance is unfavorable because more materials were used than allowed for actual production.',
        },
        points: 20,
      },
      {
        id: 't2',
        taskNumber: 2,
        requirement: 'Calculate the Direct Labor Rate Variance and Direct Labor Efficiency Variance. Indicate whether each variance is Favorable (F) or Unfavorable (U).',
        hints: ['Standard hours = Actual units × Standard hours per unit'],
        solution: {
          approach: 'Use standard formulas: Rate = (AR - SR) × AH; Efficiency = (AH - SH) × SR',
          calculations: `Standard Hours Allowed (SH) = 5,000 units × 2 hours = 10,000 hours

**Labor Rate Variance:**
= (Actual Rate - Standard Rate) × Actual Hours
= ($25.50 - $25.00) × 9,800 hours
= $0.50 × 9,800 = $4,900 Unfavorable

**Labor Efficiency Variance:**
= (Actual Hours - Standard Hours Allowed) × Standard Rate
= (9,800 hours - 10,000 hours) × $25.00
= -200 hours × $25.00 = $5,000 Favorable`,
          answer: { rateVariance: -4900, efficiencyVariance: 5000 },
          explanation: 'The rate variance is unfavorable because workers were paid more than standard. The efficiency variance is favorable because fewer hours were worked than allowed.',
        },
        points: 20,
      },
      {
        id: 't3',
        taskNumber: 3,
        requirement: 'Calculate the Variable Overhead Spending Variance and Variable Overhead Efficiency Variance.',
        hints: ['Variable OH efficiency uses same hours as labor efficiency'],
        solution: {
          approach: 'VOH Spending = Actual - (AH × SR); VOH Efficiency = (AH - SH) × SR',
          calculations: `**VOH Spending Variance:**
= Actual VOH - (Actual Hours × Standard VOH Rate)
= $60,200 - (9,800 hours × $6.00)
= $60,200 - $58,800 = $1,400 Unfavorable

**VOH Efficiency Variance:**
= (Actual Hours - Standard Hours) × Standard VOH Rate
= (9,800 - 10,000) × $6.00
= -200 × $6.00 = $1,200 Favorable`,
          answer: { spendingVariance: -1400, efficiencyVariance: 1200 },
          explanation: 'Spending variance is unfavorable due to higher actual VOH costs. Efficiency variance is favorable due to labor efficiency.',
        },
        points: 20,
      },
      {
        id: 't4',
        taskNumber: 4,
        requirement: 'Calculate the Fixed Overhead Spending Variance and Fixed Overhead Volume Variance.',
        hints: ['Volume variance relates to capacity utilization'],
        solution: {
          approach: 'FOH Spending = Actual - Budgeted; FOH Volume = Budgeted - Applied',
          calculations: `Budgeted FOH = $120,000 (given)
Applied FOH = Standard Hours Allowed × FOH Rate = 10,000 hours × $10 = $100,000

**FOH Spending Variance:**
= Actual FOH - Budgeted FOH
= $122,000 - $120,000 = $2,000 Unfavorable

**FOH Volume Variance:**
= Budgeted FOH - Applied FOH
= $120,000 - $100,000 = $20,000 Unfavorable`,
          answer: { spendingVariance: -2000, volumeVariance: -20000 },
          explanation: 'Spending variance is unfavorable due to higher actual FOH. Volume variance is unfavorable because production was below budgeted capacity (5,000 vs 6,000 units), meaning fixed costs were under-absorbed.',
        },
        points: 20,
      },
      {
        id: 't5',
        taskNumber: 5,
        requirement: 'Calculate the total variance from standard cost for October and explain the primary drivers of the variance.',
        solution: {
          approach: 'Sum all variances; identify largest unfavorable variances',
          calculations: `**Summary of All Variances:**
Materials Price Variance: $4,000 U
Materials Quantity Variance: $1,600 U
Labor Rate Variance: $4,900 U
Labor Efficiency Variance: $5,000 F
VOH Spending Variance: $1,400 U
VOH Efficiency Variance: $1,200 F
FOH Spending Variance: $2,000 U
FOH Volume Variance: $20,000 U

**Total Unfavorable Variances:** $32,900
**Total Favorable Variances:** $6,200
**Net Variance:** $26,700 Unfavorable`,
          answer: 26700,
          explanation: 'The primary driver is the Fixed Overhead Volume Variance ($20,000 U) caused by producing only 5,000 units vs. budgeted 6,000 units. This underutilization of capacity means fixed costs are spread over fewer units. Secondary drivers include material price increases and higher labor rates.',
        },
        points: 20,
      },
    ],

    skills: ['Variance calculation', 'Cost analysis', 'Performance evaluation'],
    relatedConcepts: ['Standard costing', 'Flexible budgets', 'Capacity utilization'],
  },

  // Simulation 2: Budgeting and Cash Flow
  {
    id: 'cma1-sim-002',
    section: 'CMA1',
    title: 'Cash Budget Preparation',
    blueprintArea: 'CMA1-B',
    topic: 'Cash Budgeting',
    difficulty: 'hard',
    estimatedTime: 20,

    scenario: `Coastal Retailers is preparing its cash budget for Q2 (April, May, June). The company's controller has gathered the following information and needs your help completing the cash budget.

Sales for March (actual) and Q2 projections are provided in Exhibit 1. Collection patterns and cash payment policies are detailed in Exhibit 2.`,

    exhibits: [
      {
        id: 'ex1',
        title: 'Sales Data',
        type: 'table',
        data: `| Month | Projected Sales |
|-------|-----------------|
| March (actual) | $200,000 |
| April | $180,000 |
| May | $220,000 |
| June | $250,000 |
| July | $230,000 |

Beginning Cash Balance (April 1): $25,000
Minimum Required Cash Balance: $20,000`,
      },
      {
        id: 'ex2',
        title: 'Collection and Payment Policies',
        type: 'text',
        data: `**Collections:**
- 60% of sales collected in month of sale
- 35% collected in month after sale
- 5% uncollectible

**Purchases:**
- Cost of goods sold is 65% of sales
- Inventory purchased one month before sale
- All purchases paid in month after purchase

**Other Monthly Expenses:**
- Salaries and wages: $30,000 (paid in month incurred)
- Rent: $10,000 (paid in month incurred)
- Other expenses: $5,000 (paid in month incurred)
- Depreciation: $8,000
- Equipment purchase in May: $50,000 (cash payment)
- Loan payment in June: $15,000 (principal only)`,
      },
    ],

    tasks: [
      {
        id: 't1',
        taskNumber: 1,
        requirement: 'Calculate monthly cash collections for April, May, and June.',
        hints: ['April collections include March sales (35%)', 'Collections = 60% current month + 35% prior month'],
        solution: {
          approach: 'Apply collection percentages to sales each month',
          calculations: `**April Collections:**
From March sales (35%): $200,000 × 35% = $70,000
From April sales (60%): $180,000 × 60% = $108,000
**Total April Collections: $178,000**

**May Collections:**
From April sales (35%): $180,000 × 35% = $63,000
From May sales (60%): $220,000 × 60% = $132,000
**Total May Collections: $195,000**

**June Collections:**
From May sales (35%): $220,000 × 35% = $77,000
From June sales (60%): $250,000 × 60% = $150,000
**Total June Collections: $227,000**`,
          answer: { april: 178000, may: 195000, june: 227000 },
          explanation: 'Each month collects 60% of current sales plus 35% of prior month sales. 5% is uncollectible.',
        },
        points: 25,
      },
      {
        id: 't2',
        taskNumber: 2,
        requirement: 'Calculate monthly cash payments for inventory purchases for April, May, and June.',
        hints: ['Purchases made one month before sale', 'Paid one month after purchase (so 2 months before sale)'],
        solution: {
          approach: 'COGS = 65% of sales; Purchases in month before sale; Paid month after purchase',
          calculations: `**Purchases Schedule:**
April purchases (for May sales): $220,000 × 65% = $143,000
May purchases (for June sales): $250,000 × 65% = $162,500
June purchases (for July sales): $230,000 × 65% = $149,500

**Cash Payments for Purchases (paid month after purchase):**
April payment (March purchases for April sales): $180,000 × 65% = $117,000
May payment (April purchases): $143,000
June payment (May purchases): $162,500

**Note:** March purchases were for April sales at $180,000 × 65%`,
          answer: { april: 117000, may: 143000, june: 162500 },
          explanation: 'Purchases are made in the month before the sale, but paid in the month after purchase. So April payments = March purchases = April COGS.',
        },
        points: 25,
      },
      {
        id: 't3',
        taskNumber: 3,
        requirement: 'Prepare the complete cash budget for April, May, and June, including any required borrowing.',
        hints: ['Depreciation is not a cash outflow', 'Borrow if cash falls below minimum'],
        solution: {
          approach: 'Track beginning cash, add collections, subtract all cash payments, check minimum balance',
          calculations: `**CASH BUDGET**

                              | April    | May      | June     |
|----------------------------|----------|----------|----------|
| Beginning Cash             | $25,000  | $41,000  | $20,000  |
| Add: Collections           | 178,000  | 195,000  | 227,000  |
| **Total Cash Available**   | **203,000** | **236,000** | **247,000** |
|                            |          |          |          |
| Less: Disbursements        |          |          |          |
| Inventory Purchases        | 117,000  | 143,000  | 162,500  |
| Salaries and Wages         | 30,000   | 30,000   | 30,000   |
| Rent                       | 10,000   | 10,000   | 10,000   |
| Other Expenses             | 5,000    | 5,000    | 5,000    |
| Equipment Purchase         | -        | 50,000   | -        |
| Loan Payment               | -        | -        | 15,000   |
| **Total Disbursements**    | **162,000** | **238,000** | **222,500** |
|                            |          |          |          |
| **Cash Excess/(Deficit)**  | 41,000   | (2,000)  | 24,500   |
|                            |          |          |          |
| Borrowing Required         | -        | 22,000   | -        |
| (to maintain $20,000 min)  |          |          |          |
|                            |          |          |          |
| Ending Cash Balance        | $41,000  | $20,000  | $24,500  |

*Note: Depreciation ($8,000/month) is excluded as it's not a cash flow.*`,
          answer: { aprilEnding: 41000, mayBorrowing: 22000, juneEnding: 24500 },
          explanation: 'April ends with $41,000 excess. May shows a $2,000 deficit after the large equipment purchase, requiring $22,000 borrowing to maintain the $20,000 minimum. June has a comfortable surplus of $24,500 with no borrowing needed.',
        },
        points: 50,
      },
    ],

    skills: ['Cash budgeting', 'Collection patterns', 'Payment schedules'],
    relatedConcepts: ['Working capital management', 'Liquidity planning', 'Short-term financing'],
  },

  // Simulation 3: Process Costing
  {
    id: 'cma1-sim-003',
    section: 'CMA1',
    title: 'Process Costing - Weighted Average',
    blueprintArea: 'CMA1-D',
    topic: 'Equivalent Units and Cost Assignment',
    difficulty: 'hard',
    estimatedTime: 25,

    scenario: `Chemical Solutions Inc. uses process costing for its mixing department. Materials are added at the beginning of the process, while conversion costs are incurred uniformly throughout. You have been asked to compute equivalent units and assign costs using the weighted average method.

Production data for November is provided in Exhibit 1.`,

    exhibits: [
      {
        id: 'ex1',
        title: 'Production Data - November',
        type: 'table',
        data: `| Item | Units | % Complete |
|------|-------|------------|
| Beginning WIP (Nov 1) | 8,000 | 40% conversion |
| Started during November | 42,000 | |
| Completed and transferred | 38,000 | 100% |
| Ending WIP (Nov 30) | 12,000 | 60% conversion |

**Cost Data:**
| Cost Category | Beginning WIP | Costs Added in Nov |
|--------------|---------------|-------------------|
| Materials | $24,000 | $126,000 |
| Conversion | $15,200 | $110,800 |`,
      },
    ],

    tasks: [
      {
        id: 't1',
        taskNumber: 1,
        requirement: 'Verify the units to account for and the units accounted for (physical unit reconciliation).',
        solution: {
          approach: 'Units to account = Beginning + Started; Units accounted = Completed + Ending',
          calculations: `**Units to Account For:**
Beginning WIP: 8,000
Units Started: 42,000
**Total: 50,000 units**

**Units Accounted For:**
Completed and Transferred: 38,000
Ending WIP: 12,000
**Total: 50,000 units** ✓`,
          answer: { unitsToAccount: 50000, unitsAccountedFor: 50000 },
          explanation: 'Physical units must balance. Beginning + Started = Completed + Ending.',
        },
        points: 10,
      },
      {
        id: 't2',
        taskNumber: 2,
        requirement: 'Calculate equivalent units for materials and conversion costs using the weighted average method.',
        hints: ['Materials added at beginning = 100% complete', 'Weighted average ignores beginning WIP completion'],
        solution: {
          approach: 'EU = Units completed + (Ending WIP × % complete)',
          calculations: `**Equivalent Units - Materials:**
Completed and transferred: 38,000 × 100% = 38,000
Ending WIP: 12,000 × 100% = 12,000 (materials added at beginning)
**Total EU - Materials: 50,000**

**Equivalent Units - Conversion:**
Completed and transferred: 38,000 × 100% = 38,000
Ending WIP: 12,000 × 60% = 7,200
**Total EU - Conversion: 45,200**`,
          answer: { materialsEU: 50000, conversionEU: 45200 },
          explanation: 'Under weighted average, we include all units in equivalent unit calculation regardless of when work was done.',
        },
        points: 25,
      },
      {
        id: 't3',
        taskNumber: 3,
        requirement: 'Calculate the cost per equivalent unit for materials and conversion costs.',
        hints: ['Weighted average includes beginning WIP costs'],
        solution: {
          approach: 'Cost per EU = (Beginning WIP cost + Current period cost) / Total EU',
          calculations: `**Materials Cost per EU:**
Total Materials Cost = $24,000 + $126,000 = $150,000
EU - Materials = 50,000
**Cost per EU = $150,000 / 50,000 = $3.00**

**Conversion Cost per EU:**
Total Conversion Cost = $15,200 + $110,800 = $126,000
EU - Conversion = 45,200
**Cost per EU = $126,000 / 45,200 = $2.787611... ≈ $2.79**`,
          answer: { materialsCostPerEU: 3.00, conversionCostPerEU: 2.79 },
          explanation: 'Weighted average combines beginning WIP costs with current costs for the cost per EU calculation.',
        },
        points: 25,
      },
      {
        id: 't4',
        taskNumber: 4,
        requirement: 'Assign costs to: (a) Units completed and transferred, and (b) Ending WIP inventory.',
        solution: {
          approach: 'Multiply EU × Cost per EU for each category',
          calculations: `**Cost of Units Completed and Transferred:**
Materials: 38,000 × $3.00 = $114,000
Conversion: 38,000 × $2.79 = $106,020
**Total Cost Transferred: $220,020**

**Cost of Ending WIP:**
Materials: 12,000 × $3.00 = $36,000
Conversion: 7,200 × $2.79 = $20,088
**Total Ending WIP: $56,088**

**Verification:**
Total Cost Transferred + Ending WIP = $220,020 + $56,088 = $276,108
(Should equal total costs of $150,000 + $126,000 = $276,000)
*Difference of $108 is due to rounding in cost per EU*`,
          answer: { transferred: 220020, endingWIP: 56088 },
          explanation: 'Completed units receive full cost per EU for both materials and conversion. Ending WIP receives partial conversion based on completion.',
        },
        points: 40,
      },
    ],

    skills: ['Process costing', 'Equivalent units', 'Cost allocation'],
    relatedConcepts: ['Weighted average method', 'FIFO method', 'Manufacturing cost flows'],
  },
];

// ============================================
// CMA Part 2 Practice Simulations
// ============================================

export const CMA2_PRACTICE_SIMULATIONS: PracticeSimulation[] = [
  // Simulation 1: Capital Budgeting Analysis
  {
    id: 'cma2-sim-001',
    section: 'CMA2',
    title: 'Capital Investment Analysis',
    blueprintArea: 'CMA2-C',
    topic: 'NPV, IRR, and Project Evaluation',
    difficulty: 'hard',
    estimatedTime: 30,

    scenario: `TechCorp Industries is evaluating a new manufacturing equipment investment. The CFO has asked you to perform a comprehensive capital budgeting analysis.

The project details are provided in Exhibit 1. Assume a discount rate of 12% (company's WACC) and a 25% tax rate.`,

    exhibits: [
      {
        id: 'ex1',
        title: 'Project Details',
        type: 'table',
        data: `**Initial Investment:**
- Equipment Cost: $500,000
- Installation: $50,000
- Increase in Net Working Capital: $30,000

**Operating Data (Annual):**
- Annual Revenue: $300,000
- Annual Operating Costs (excluding depreciation): $120,000
- Project Life: 5 years

**Depreciation:**
- Straight-line over 5 years to $0 salvage

**End of Project:**
- Equipment salvage value: $40,000
- Working capital recovered: $30,000

**Present Value Factors (12%):**
| Year | PV Factor | Cumulative |
|------|-----------|------------|
| 1 | 0.8929 | 0.8929 |
| 2 | 0.7972 | 1.6901 |
| 3 | 0.7118 | 2.4018 |
| 4 | 0.6355 | 3.0373 |
| 5 | 0.5674 | 3.6048 |`,
      },
    ],

    tasks: [
      {
        id: 't1',
        taskNumber: 1,
        requirement: 'Calculate the total initial investment (Year 0 cash outflow).',
        solution: {
          approach: 'Sum all initial costs including working capital',
          calculations: `Equipment Cost: $500,000
Installation: $50,000
Working Capital: $30,000
**Total Initial Investment: $580,000**`,
          answer: 580000,
          explanation: 'Total initial cash outflow includes equipment, installation, and working capital investment.',
        },
        points: 10,
      },
      {
        id: 't2',
        taskNumber: 2,
        requirement: 'Calculate the annual operating cash flows (Years 1-5).',
        hints: ['Use: OCF = (Revenue - Costs)(1-T) + Depreciation × T'],
        solution: {
          approach: 'Calculate after-tax operating income plus depreciation tax shield',
          calculations: `Depreciation = ($500,000 + $50,000) / 5 = $110,000 per year

**Method 1: Tax Shield Approach**
After-tax Operating Income = (Revenue - Costs) × (1 - T)
= ($300,000 - $120,000) × (1 - 0.25)
= $180,000 × 0.75 = $135,000

Depreciation Tax Shield = $110,000 × 0.25 = $27,500

**Annual Operating Cash Flow = $135,000 + $27,500 = $162,500**

**Verification Method 2:**
EBIT = $300,000 - $120,000 - $110,000 = $70,000
Taxes = $70,000 × 0.25 = $17,500
Net Income = $52,500
Add back Depreciation = $110,000
**OCF = $162,500** ✓`,
          answer: 162500,
          explanation: 'Operating cash flow accounts for the tax benefit of depreciation. Both methods yield the same result.',
        },
        points: 25,
      },
      {
        id: 't3',
        taskNumber: 3,
        requirement: 'Calculate the terminal cash flow in Year 5 (including salvage and working capital recovery).',
        hints: ['Salvage has tax implications if book value differs from sale price'],
        solution: {
          approach: 'Terminal = After-tax salvage + Working capital recovery',
          calculations: `**Salvage Value Calculation:**
Sale Price: $40,000
Book Value at end of Year 5: $0 (fully depreciated)
Gain on Sale: $40,000 - $0 = $40,000
Tax on Gain: $40,000 × 0.25 = $10,000
After-tax Salvage: $40,000 - $10,000 = $30,000

**Total Terminal Cash Flow:**
After-tax Salvage: $30,000
Working Capital Recovery: $30,000
**Total: $60,000**`,
          answer: 60000,
          explanation: 'Salvage above book value creates taxable gain. Working capital is recovered tax-free.',
        },
        points: 20,
      },
      {
        id: 't4',
        taskNumber: 4,
        requirement: 'Calculate the Net Present Value (NPV) of the project.',
        solution: {
          approach: 'NPV = PV of cash flows - Initial investment',
          calculations: `**Year 0:** -$580,000

**Years 1-4:** $162,500 each year
PV of Years 1-4 = $162,500 × (0.8929 + 0.7972 + 0.7118 + 0.6355)
= $162,500 × 3.0373 = $493,562

**Year 5:** $162,500 + $60,000 = $222,500
PV of Year 5 = $222,500 × 0.5674 = $126,247

**NPV = -$580,000 + $493,562 + $126,247 = $39,809**

Alternatively using annuity:
PV of Operating CFs = $162,500 × 3.6048 = $585,780
PV of Terminal = $60,000 × 0.5674 = $34,044
NPV = $585,780 + $34,044 - $580,000 = **$39,824** (slight difference due to rounding)`,
          answer: 39824,
          explanation: 'NPV is positive ($39,824), meaning the project adds value and should be accepted under NPV rule.',
        },
        points: 25,
      },
      {
        id: 't5',
        taskNumber: 5,
        requirement: 'Recommend whether to accept or reject the project, and explain why.',
        solution: {
          approach: 'Apply decision criteria based on NPV rule',
          calculations: `**Decision Criteria:**
- NPV = $39,824 > $0 ✓
- Project returns exceed 12% cost of capital

**Additional Analysis:**
Profitability Index = PV of inflows / Initial investment
= $619,824 / $580,000 = 1.069

For every $1 invested, the project returns $1.07 in present value terms.`,
          answer: 'Accept',
          explanation: 'The project should be ACCEPTED because NPV is positive ($39,824) and PI > 1. The project generates returns exceeding the 12% required return and adds value to shareholders.',
        },
        points: 20,
      },
    ],

    skills: ['NPV calculation', 'Cash flow estimation', 'Tax effects', 'Investment decisions'],
    relatedConcepts: ['IRR', 'Payback period', 'Profitability index', 'WACC'],
  },

  // Simulation 2: Financial Ratio Analysis
  {
    id: 'cma2-sim-002',
    section: 'CMA2',
    title: 'Comprehensive Ratio Analysis',
    blueprintArea: 'CMA2-A',
    topic: 'Financial Statement Analysis',
    difficulty: 'medium',
    estimatedTime: 25,

    scenario: `You are a financial analyst reviewing the financial statements of Growth Industries Inc. for potential investment. The CEO is concerned about the company's performance trend and has asked for a thorough ratio analysis.

Financial data for the current and prior year is provided in the exhibits.`,

    exhibits: [
      {
        id: 'ex1',
        title: 'Income Statement (in thousands)',
        type: 'table',
        data: `| Item | Current Year | Prior Year |
|------|--------------|------------|
| Sales | $2,400 | $2,000 |
| Cost of Goods Sold | 1,680 | 1,360 |
| Gross Profit | 720 | 640 |
| Operating Expenses | 360 | 280 |
| EBIT | 360 | 360 |
| Interest Expense | 60 | 40 |
| EBT | 300 | 320 |
| Income Tax (25%) | 75 | 80 |
| Net Income | $225 | $240 |`,
      },
      {
        id: 'ex2',
        title: 'Balance Sheet (in thousands)',
        type: 'table',
        data: `| Item | Current Year | Prior Year |
|------|--------------|------------|
| Cash | $50 | $80 |
| Accounts Receivable | 300 | 200 |
| Inventory | 400 | 240 |
| Current Assets | 750 | 520 |
| Fixed Assets (net) | 750 | 680 |
| **Total Assets** | **$1,500** | **$1,200** |
| Accounts Payable | 200 | 140 |
| Short-term Debt | 100 | 60 |
| Current Liabilities | 300 | 200 |
| Long-term Debt | 400 | 300 |
| Total Liabilities | 700 | 500 |
| Shareholders' Equity | 800 | 700 |
| **Total L + E** | **$1,500** | **$1,200** |`,
      },
    ],

    tasks: [
      {
        id: 't1',
        taskNumber: 1,
        requirement: 'Calculate the following liquidity ratios for both years: Current Ratio and Quick Ratio.',
        solution: {
          approach: 'Current = CA/CL; Quick = (CA - Inventory)/CL',
          calculations: `**Current Year:**
Current Ratio = $750 / $300 = 2.50
Quick Ratio = ($750 - $400) / $300 = $350 / $300 = 1.17

**Prior Year:**
Current Ratio = $520 / $200 = 2.60
Quick Ratio = ($520 - $240) / $200 = $280 / $200 = 1.40`,
          answer: { currentYearCR: 2.50, currentYearQR: 1.17, priorYearCR: 2.60, priorYearQR: 1.40 },
          explanation: 'Liquidity has declined from prior year. While ratios are still healthy (>1), the trend is concerning.',
        },
        points: 20,
      },
      {
        id: 't2',
        taskNumber: 2,
        requirement: 'Calculate the DuPont 3-factor decomposition of ROE for both years.',
        hints: ['ROE = Profit Margin × Asset Turnover × Equity Multiplier'],
        solution: {
          approach: 'Calculate each component then multiply',
          calculations: `**Current Year:**
Profit Margin = $225 / $2,400 = 9.38%
Asset Turnover = $2,400 / $1,500 = 1.60
Equity Multiplier = $1,500 / $800 = 1.875
ROE = 9.38% × 1.60 × 1.875 = **28.13%**

Verification: $225 / $800 = 28.13% ✓

**Prior Year:**
Profit Margin = $240 / $2,000 = 12.00%
Asset Turnover = $2,000 / $1,200 = 1.67
Equity Multiplier = $1,200 / $700 = 1.714
ROE = 12.00% × 1.67 × 1.714 = **34.29%**

Verification: $240 / $700 = 34.29% ✓`,
          answer: { currentROE: 28.13, priorROE: 34.29 },
          explanation: 'ROE declined from 34.29% to 28.13%. Main driver: Profit margin dropped from 12% to 9.38%.',
        },
        points: 30,
      },
      {
        id: 't3',
        taskNumber: 3,
        requirement: 'Calculate Days Sales Outstanding (DSO) and Inventory Turnover for both years.',
        hints: ['Use average balances for turnover ratios'],
        solution: {
          approach: 'DSO = (AR/Sales) × 365; Inv Turnover = COGS/Avg Inventory',
          calculations: `**Current Year:**
DSO = ($300 / $2,400) × 365 = 45.6 days
Avg Inventory = ($400 + $240) / 2 = $320
Inventory Turnover = $1,680 / $320 = 5.25 times
Days in Inventory = 365 / 5.25 = 69.5 days

**Prior Year:**
DSO = ($200 / $2,000) × 365 = 36.5 days
(Using ending inventory only for prior year)
Inventory Turnover = $1,360 / $240 = 5.67 times
Days in Inventory = 365 / 5.67 = 64.4 days`,
          answer: { currentDSO: 45.6, currentInvTurn: 5.25, priorDSO: 36.5, priorInvTurn: 5.67 },
          explanation: 'Collections have slowed (DSO up 9 days) and inventory is turning slower. Working capital efficiency has deteriorated.',
        },
        points: 25,
      },
      {
        id: 't4',
        taskNumber: 4,
        requirement: 'Provide a summary assessment of the company\'s financial performance trend with specific concerns.',
        solution: {
          approach: 'Synthesize ratio analysis into actionable insights',
          calculations: `**Performance Summary:**

| Metric | Current | Prior | Trend |
|--------|---------|-------|-------|
| ROE | 28.1% | 34.3% | ↓ |
| Profit Margin | 9.4% | 12.0% | ↓ |
| Current Ratio | 2.50 | 2.60 | ↓ |
| Quick Ratio | 1.17 | 1.40 | ↓ |
| DSO | 45.6 days | 36.5 days | ↓ |
| Inventory Turnover | 5.25× | 5.67× | ↓ |
| Debt/Equity | 87.5% | 71.4% | ↑ |`,
          answer: 'Declining profitability and working capital efficiency',
          explanation: `**Key Concerns:**

1. **Profitability Decline**: Despite 20% sales growth, net income fell 6%. COGS increased from 68% to 70% of sales, and operating expenses rose faster than revenue.

2. **Working Capital Deterioration**: AR and inventory grew faster than sales, indicating collection and inventory management issues. Cash declined significantly.

3. **Increased Leverage**: Debt-to-equity rose from 71% to 88%. Interest expense increased 50% while EBIT was flat, causing EBT to decline.

4. **Collection Slowdown**: DSO increased from 36.5 to 45.6 days, potentially indicating credit quality issues or more aggressive credit terms.

**Recommendations:**
- Investigate pricing power and cost control
- Review credit policies and collection efforts
- Assess inventory management practices
- Evaluate capital structure sustainability`,
        },
        points: 25,
      },
    ],

    skills: ['Ratio analysis', 'DuPont analysis', 'Trend analysis', 'Financial interpretation'],
    relatedConcepts: ['Liquidity', 'Profitability', 'Efficiency', 'Leverage'],
  },

  // Simulation 3: WACC and Capital Structure
  {
    id: 'cma2-sim-003',
    section: 'CMA2',
    title: 'Cost of Capital Calculation',
    blueprintArea: 'CMA2-B',
    topic: 'WACC and Component Costs',
    difficulty: 'hard',
    estimatedTime: 25,

    scenario: `Global Manufacturing Corp. is evaluating its cost of capital for an upcoming investment decision. The CFO has asked you to calculate the weighted average cost of capital (WACC) using current market data.

Capital structure and market information is provided in Exhibit 1.`,

    exhibits: [
      {
        id: 'ex1',
        title: 'Capital Structure and Market Data',
        type: 'table',
        data: `**Current Capital Structure:**
| Source | Book Value | Market Value |
|--------|------------|--------------|
| Common Stock (2M shares) | $20M | $30M |
| Preferred Stock (500K shares) | $5M | $4M |
| Bonds (8% coupon, 10-year) | $15M | $14M |
| **Total** | **$40M** | **$48M** |

**Additional Information:**
- Common stock current price: $15.00 per share
- Last dividend paid: $1.20 per share
- Expected dividend growth rate: 5% annually
- Risk-free rate: 4%
- Market risk premium: 6%
- Company beta: 1.25
- Preferred stock dividend: $2.00 per share
- Preferred stock current price: $8.00 per share
- Bonds yield to maturity: 9%
- Corporate tax rate: 25%`,
      },
    ],

    tasks: [
      {
        id: 't1',
        taskNumber: 1,
        requirement: 'Calculate the cost of common equity using both CAPM and the Dividend Growth Model. Average the two methods for your final cost of equity.',
        hints: ['CAPM: re = rf + β(rm-rf)', 'Gordon: re = D1/P0 + g'],
        solution: {
          approach: 'Apply both models and average',
          calculations: `**CAPM Method:**
re = rf + β(rm - rf)
re = 4% + 1.25 × 6%
re = 4% + 7.5% = **11.5%**

**Dividend Growth Model (Gordon):**
D1 = D0 × (1 + g) = $1.20 × 1.05 = $1.26
re = D1/P0 + g
re = $1.26/$15.00 + 5%
re = 8.4% + 5% = **13.4%**

**Average Cost of Equity:**
re = (11.5% + 13.4%) / 2 = **12.45%**`,
          answer: 12.45,
          explanation: 'Using both methods and averaging provides a more robust estimate. The difference suggests some uncertainty in inputs.',
        },
        points: 30,
      },
      {
        id: 't2',
        taskNumber: 2,
        requirement: 'Calculate the cost of preferred stock.',
        solution: {
          approach: 'Cost of preferred = Dividend / Price',
          calculations: `rp = Annual Dividend / Current Price
rp = $2.00 / $8.00
rp = **25%**`,
          answer: 25.00,
          explanation: 'Preferred stock cost is high because the stock is trading at a discount to its par value ($8 vs implied par of ~$10).',
        },
        points: 15,
      },
      {
        id: 't3',
        taskNumber: 3,
        requirement: 'Calculate the after-tax cost of debt.',
        solution: {
          approach: 'After-tax cost = YTM × (1 - Tax rate)',
          calculations: `Before-tax cost of debt = YTM = 9%

After-tax cost of debt:
rd × (1 - T) = 9% × (1 - 0.25)
rd × (1 - T) = 9% × 0.75 = **6.75%**`,
          answer: 6.75,
          explanation: 'Debt cost is reduced by the tax shield because interest is tax-deductible.',
        },
        points: 15,
      },
      {
        id: 't4',
        taskNumber: 4,
        requirement: 'Calculate the WACC using market value weights.',
        hints: ['Use market values, not book values for weights'],
        solution: {
          approach: 'WACC = weighted sum of component costs',
          calculations: `**Market Value Weights:**
Total Market Value = $30M + $4M + $14M = $48M

Equity Weight = $30M / $48M = 62.5%
Preferred Weight = $4M / $48M = 8.33%
Debt Weight = $14M / $48M = 29.17%

**WACC Calculation:**
WACC = (we × re) + (wp × rp) + (wd × rd × (1-T))
WACC = (0.625 × 12.45%) + (0.0833 × 25%) + (0.2917 × 6.75%)
WACC = 7.78% + 2.08% + 1.97%
WACC = **11.83%**`,
          answer: 11.83,
          explanation: 'WACC of 11.83% is the hurdle rate for investment decisions. Projects must earn above this to create value.',
        },
        points: 40,
      },
    ],

    skills: ['WACC calculation', 'Cost of equity', 'Cost of debt', 'Capital structure'],
    relatedConcepts: ['CAPM', 'Gordon Growth Model', 'Tax shield', 'Market values'],
  },
];

// Simulation 4: Transfer Pricing
const CMA1_SIMULATION_4: PracticeSimulation = {
  id: 'cma1-sim-004',
  section: 'CMA1',
  title: 'Transfer Pricing Decision',
  blueprintArea: 'CMA1-E',
  topic: 'Internal Transfers and Decision Making',
  difficulty: 'hard',
  estimatedTime: 20,

  scenario: `Multi-Div Corp has two divisions: Components Division (CD) and Assembly Division (AD). The Components Division makes a part that can be sold externally or transferred to Assembly Division.

You have been asked to analyze the optimal transfer pricing and determine whether internal transfers should occur.`,

  exhibits: [
    {
      id: 'ex1',
      title: 'Components Division Data',
      type: 'table',
      data: `| Item | Amount |
|------|--------|
| Variable manufacturing cost per unit | $45 |
| Fixed manufacturing cost per unit | $20 |
| External selling price | $80 |
| Current external demand | 8,000 units |
| Maximum production capacity | 10,000 units |
| Selling expenses (external sales only) | $5 per unit |`,
    },
    {
      id: 'ex2',
      title: 'Assembly Division Data',
      type: 'table',
      data: `| Item | Amount |
|------|--------|
| Units needed | 3,000 |
| Current external supplier price | $75 |
| Additional processing cost per unit | $30 |
| Final product selling price | $150 |`,
    },
  ],

  tasks: [
    {
      id: 't1',
      taskNumber: 1,
      requirement: 'Calculate the minimum transfer price that the Components Division should accept.',
      hints: ['Minimum = Opportunity cost + Variable cost', 'Consider capacity utilization'],
      solution: {
        approach: 'Determine if excess capacity exists, then calculate floor price',
        calculations: `**Capacity Analysis:**
Maximum capacity: 10,000 units
External demand: 8,000 units
Excess capacity: 2,000 units
Internal request: 3,000 units

For first 2,000 units (excess capacity):
Minimum price = Variable cost = $45
No opportunity cost (no lost external sales)
Savings on selling expense = $5

For remaining 1,000 units (displaces external sales):
Minimum price = Variable cost + Opportunity cost
= $45 + ($80 - $5 - $45) = $45 + $30 = $75

**Weighted Minimum:**
(2,000 × $45 + 1,000 × $75) / 3,000 = $55 per unit overall`,
        answer: { excessCapacity: 45, fullCapacity: 75, weighted: 55 },
        explanation: 'The minimum varies based on capacity. For excess capacity, only variable cost matters. When displacing external sales, the contribution margin lost becomes opportunity cost.',
      },
      points: 30,
    },
    {
      id: 't2',
      taskNumber: 2,
      requirement: 'Calculate the maximum transfer price Assembly Division should pay.',
      solution: {
        approach: 'Maximum = Cost of next best alternative',
        calculations: `Maximum TP = External supplier price = **$75**

This is the price AD can obtain the part elsewhere.`,
        answer: 75,
        explanation: 'Assembly Division will not pay more than the external market price of $75.',
      },
      points: 15,
    },
    {
      id: 't3',
      taskNumber: 3,
      requirement: 'Recommend a transfer price range and the optimal quantity to transfer internally.',
      solution: {
        approach: 'Find overlap between min and max; optimize company profit',
        calculations: `**Transfer Price Range:**
Minimum (seller): $45 - $75 depending on capacity
Maximum (buyer): $75

**Negotiation Range:** $45 to $75 for excess capacity units
**No Range:** For units displacing external sales, min = max = $75

**Optimal Transfer:**
Transfer all 3,000 units internally at any price between $55 and $75

**Company Benefit:**
2,000 units: Save $75 - $45 = $30 per unit = $60,000
1,000 units: Neutral (CD loses $30 CM, AD saves $0)
**Net company benefit: $60,000**`,
        answer: { minPrice: 45, maxPrice: 75, optimalQty: 3000 },
        explanation: 'Internal transfer benefits the company by $60,000 for the excess capacity portion. The 1,000 units from lost sales are neutral.',
      },
      points: 30,
    },
    {
      id: 't4',
      taskNumber: 4,
      requirement: 'If market-based transfer pricing at $75 is used, calculate each division\'s contribution margin on the internal sales.',
      solution: {
        approach: 'Calculate CM for each division at the $75 transfer price',
        calculations: `**Components Division CM (per unit):**
Transfer price: $75
Variable cost: $45
No selling expense on internal sales
CM per unit = $75 - $45 = **$30**
Total CM (3,000 units) = $90,000

**Assembly Division CM (per unit):**
Final selling price: $150
Transfer price: $75
Additional processing: $30
CM per unit = $150 - $75 - $30 = **$45**
Total CM (3,000 units) = $135,000`,
        answer: { cdCMperUnit: 30, adCMperUnit: 45 },
        explanation: 'At market-based transfer price of $75, both divisions are profitable and properly incentivized.',
      },
      points: 25,
    },
  ],

  skills: ['Transfer pricing', 'Marginal analysis', 'Capacity analysis'],
  relatedConcepts: ['Opportunity cost', 'Divisional performance', 'Goal congruence'],
};

// Simulation 5: Make or Buy with Qualitative Factors
const CMA1_SIMULATION_5: PracticeSimulation = {
  id: 'cma1-sim-005',
  section: 'CMA1',
  title: 'Outsourcing Decision Analysis',
  blueprintArea: 'CMA1-E',
  topic: 'Make or Buy Decision',
  difficulty: 'medium',
  estimatedTime: 18,

  scenario: `AutoParts Inc. manufactures brake assemblies for the automotive industry. The company is considering outsourcing the production of Component BX-7, which is currently made in-house.

A supplier has offered to provide Component BX-7 at $32 per unit with a 3-year contract. Annual demand is 50,000 units.`,

  exhibits: [
    {
      id: 'ex1',
      title: 'Current Manufacturing Costs - Component BX-7',
      type: 'table',
      data: `| Cost Element | Per Unit | Annual Total |
|--------------|----------|--------------|
| Direct Materials | $12.00 | $600,000 |
| Direct Labor | $8.00 | $400,000 |
| Variable Overhead | $4.00 | $200,000 |
| Fixed Overhead - Avoidable* | $5.00 | $250,000 |
| Fixed Overhead - Allocated** | $7.00 | $350,000 |
| **Total Cost** | **$36.00** | **$1,800,000** |

*Supervisor salary, equipment leases that can be terminated
**Building depreciation, corporate allocations`,
    },
    {
      id: 'ex2',
      title: 'Additional Considerations',
      type: 'text',
      data: `- If outsourced, freed capacity could be rented for $80,000/year
- 12 factory workers would be laid off (avg tenure: 8 years)
- Supplier is located 800 miles away
- Component requires tight quality tolerances
- Current supplier quality rating: 94% (AutoParts standard: 99.5%)
- Lead time from supplier: 3 weeks (current: 2 days)`,
    },
  ],

  tasks: [
    {
      id: 't1',
      taskNumber: 1,
      requirement: 'Calculate the relevant cost to make and the relevant cost to buy Component BX-7.',
      solution: {
        approach: 'Include only avoidable/differential costs',
        calculations: `**Relevant Cost to MAKE (per unit):**
Direct Materials: $12.00
Direct Labor: $8.00
Variable Overhead: $4.00
Avoidable Fixed Overhead: $5.00
**Total: $29.00 per unit**
Annual: 50,000 × $29 = $1,450,000

**Relevant Cost to BUY:**
Purchase price: $32.00 per unit
Less: Facility rental income: $80,000 / 50,000 = $1.60
**Net cost: $30.40 per unit**
Annual: $1,600,000 - $80,000 = $1,520,000

*Note: Allocated fixed overhead ($7) is NOT relevant - it will continue regardless.*`,
        answer: { makeCost: 29.00, buyCost: 30.40 },
        explanation: 'Based on quantitative analysis alone, making is $1.40/unit cheaper, saving $70,000 annually.',
      },
      points: 35,
    },
    {
      id: 't2',
      taskNumber: 2,
      requirement: 'Calculate the total cost difference over the 3-year contract period.',
      solution: {
        approach: 'Multiply annual difference by contract term',
        calculations: `Annual cost difference:
Make: $1,450,000
Buy: $1,520,000
Difference: $70,000 per year in favor of making

**3-Year Total: $70,000 × 3 = $210,000 savings to continue making**`,
        answer: 210000,
        explanation: 'Over three years, making in-house saves $210,000 based purely on quantitative factors.',
      },
      points: 15,
    },
    {
      id: 't3',
      taskNumber: 3,
      requirement: 'Identify and explain at least 4 qualitative factors that should influence this decision.',
      solution: {
        approach: 'Evaluate strategic and operational risks',
        calculations: `**Qualitative Factors:**

1. **Quality Risk (AGAINST buying)**
   - Supplier quality: 94% vs required 99.5%
   - Potential for costly defects and customer issues
   - Could estimated cost: 2,750 defective units × significant rework/warranty

2. **Supply Chain Risk (AGAINST buying)**
   - 3-week lead time vs 2 days internal
   - 800-mile distance increases logistics risk
   - Potential stockouts affecting production

3. **Employee Relations (AGAINST buying)**
   - 12 long-tenured employees would be laid off
   - Morale impact on remaining workforce
   - Community relations and reputation

4. **Strategic Control (AGAINST buying)**
   - Loss of manufacturing knowledge
   - Dependency on single supplier
   - Reduced flexibility for product modifications

5. **Cost Uncertainty (AGAINST buying)**
   - 3-year fixed price may increase after
   - Transportation cost fluctuations
   - Currency risk if international`,
        answer: 'Quality, supply chain, employee, strategic control factors',
        explanation: 'The qualitative factors heavily favor continued in-house production, reinforcing the quantitative analysis.',
      },
      points: 30,
    },
    {
      id: 't4',
      taskNumber: 4,
      requirement: 'Make a final recommendation with justification.',
      solution: {
        approach: 'Synthesize quantitative and qualitative analysis',
        calculations: `**RECOMMENDATION: CONTINUE MAKING IN-HOUSE**

**Quantitative Support:**
- $70,000 annual savings
- $210,000 over 3-year period

**Qualitative Support:**
- Unacceptable supplier quality gap (94% vs 99.5%)
- Significant supply chain risk with long lead times
- Employee and community impact
- Maintains strategic flexibility

**Risk Assessment:**
The supplier's 94% quality rate could result in approximately 3,000 defective units per year. At even modest rework/warranty costs of $50-100 per unit, this would erase any potential savings and create substantial customer relationship risk.`,
        answer: 'Make in-house',
        explanation: 'Both quantitative ($210K savings) and qualitative factors (quality, lead time, employees) support continuing internal production.',
      },
      points: 20,
    },
  ],

  skills: ['Make/buy analysis', 'Relevant costing', 'Qualitative assessment'],
  relatedConcepts: ['Avoidable costs', 'Opportunity cost', 'Strategic sourcing'],
};

// Simulation 6: Risk Management
const CMA2_SIMULATION_4: PracticeSimulation = {
  id: 'cma2-sim-004',
  section: 'CMA2',
  title: 'Enterprise Risk Assessment',
  blueprintArea: 'CMA2-D',
  topic: 'Risk Identification and Response',
  difficulty: 'medium',
  estimatedTime: 20,

  scenario: `TechStart Inc., a growing SaaS company, is implementing an enterprise risk management (ERM) program. As the new risk manager, you've been asked to assess the company's top risks and recommend appropriate responses.

The company's risk register and financial context are provided in the exhibits.`,

  exhibits: [
    {
      id: 'ex1',
      title: 'Identified Risks',
      type: 'table',
      data: `| Risk ID | Risk Description | Likelihood (1-5) | Impact (1-5) |
|---------|------------------|------------------|--------------|
| R1 | Customer data breach | 3 | 5 |
| R2 | Key developer resignation | 4 | 4 |
| R3 | Cloud provider outage | 2 | 5 |
| R4 | Customer concentration (top 3 = 40%) | 3 | 4 |
| R5 | Foreign currency exposure | 4 | 2 |
| R6 | Regulatory compliance changes | 2 | 3 |`,
    },
    {
      id: 'ex2',
      title: 'Company Context',
      type: 'text',
      data: `- Annual revenue: $25 million
- EBITDA margin: 15%
- Cash reserves: $5 million
- Employee count: 120 (25 developers)
- Primary market: US (70%), Europe (30%)
- Customer base: 500 enterprise clients
- Average contract value: $50,000`,
    },
  ],

  tasks: [
    {
      id: 't1',
      taskNumber: 1,
      requirement: 'Calculate the risk score for each identified risk and rank them by priority.',
      solution: {
        approach: 'Risk Score = Likelihood × Impact; rank highest to lowest',
        calculations: `| Risk ID | Likelihood | Impact | Score | Rank |
|---------|------------|--------|-------|------|
| R1 | 3 | 5 | 15 | 2 |
| R2 | 4 | 4 | 16 | 1 |
| R3 | 2 | 5 | 10 | 4 |
| R4 | 3 | 4 | 12 | 3 |
| R5 | 4 | 2 | 8 | 5 |
| R6 | 2 | 3 | 6 | 6 |

**Priority Ranking:**
1. R2 - Key developer resignation (16)
2. R1 - Customer data breach (15)
3. R4 - Customer concentration (12)
4. R3 - Cloud provider outage (10)
5. R5 - Foreign currency (8)
6. R6 - Regulatory changes (6)`,
        answer: { r1: 15, r2: 16, r3: 10, r4: 12, r5: 8, r6: 6 },
        explanation: 'Key talent risk ranks highest due to frequency and significant business impact.',
      },
      points: 25,
    },
    {
      id: 't2',
      taskNumber: 2,
      requirement: 'For the top 3 risks, recommend an appropriate risk response strategy (Avoid, Reduce, Share, Accept) and specific actions.',
      solution: {
        approach: 'Apply TARA framework with specific mitigations',
        calculations: `**R2: Key Developer Resignation (Score: 16)**
Strategy: REDUCE
Actions:
- Implement retention bonuses tied to vesting
- Cross-train team members on critical systems
- Document all proprietary code and processes
- Establish competitive compensation benchmarking
Est. cost: $200K annually for retention + training

**R1: Customer Data Breach (Score: 15)**
Strategy: SHARE + REDUCE
Actions:
- Purchase cyber liability insurance ($2M coverage)
- Implement SOC 2 Type II certification
- Deploy advanced threat detection
- Regular penetration testing
Est. cost: $150K insurance + $100K security improvements

**R4: Customer Concentration (Score: 12)**
Strategy: REDUCE
Actions:
- Accelerate marketing to mid-market segment
- Develop partner/reseller channel
- Implement customer diversification targets
- Limit new contracts with top customers to 5% growth
Est. cost: $300K increased marketing`,
        answer: 'R2-Reduce, R1-Share/Reduce, R4-Reduce',
        explanation: 'Risk response strategies should be proportional to risk score and aligned with company resources.',
      },
      points: 35,
    },
    {
      id: 't3',
      taskNumber: 3,
      requirement: 'Calculate the potential financial impact if each top 3 risk materializes.',
      solution: {
        approach: 'Estimate revenue/cost impact using company context',
        calculations: `**R2: Key Developer Impact**
- Critical developer supports $8M ARR products
- 6-month replacement time = $4M at risk
- Productivity loss during transition: $500K
**Potential Impact: $4.5M (18% of revenue)**

**R1: Data Breach Impact**
- Average data breach cost per Ponemon: $150/record
- Estimated records: 500 customers × 1000 users = 500K
- But SaaS likely 50K actual PII records
- Direct cost: $7.5M (but likely $2-5M range)
- Reputation damage: 10% customer churn = $2.5M
**Potential Impact: $5-10M (20-40% of revenue)**

**R4: Customer Concentration Impact**
- Top 3 customers = 40% × $25M = $10M
- Loss of largest customer (est. $4M): 16% revenue
**Potential Impact: $2-4M per major customer loss**`,
        answer: { r2Impact: 4500000, r1Impact: 7500000, r4Impact: 4000000 },
        explanation: 'Data breach has highest potential impact, but key talent has highest combined probability × impact.',
      },
      points: 25,
    },
    {
      id: 't4',
      taskNumber: 4,
      requirement: 'Recommend key risk indicators (KRIs) to monitor for the highest-priority risk.',
      solution: {
        approach: 'Identify leading indicators for R2 (talent risk)',
        calculations: `**Key Risk Indicators for R2 (Key Developer Risk):**

| KRI | Target | Red Flag |
|-----|--------|----------|
| Developer turnover rate | <10% | >15% |
| Time to fill open positions | <45 days | >90 days |
| Employee engagement score | >4.0/5.0 | <3.5 |
| Comp ratio to market | 90-100% | <85% |
| GitHub commit activity | Stable | -30% trend |
| Training hours per dev | >40/year | <20/year |
| Cross-training coverage | >2 per system | <2 |

**Monitoring Frequency:** Monthly review with quarterly deep-dive`,
        answer: 'Turnover rate, engagement score, comp ratio, cross-training coverage',
        explanation: 'KRIs should be leading indicators that provide early warning before the risk materializes.',
      },
      points: 15,
    },
  ],

  skills: ['Risk assessment', 'Risk response', 'Impact analysis'],
  relatedConcepts: ['ERM', 'COSO framework', 'Risk appetite', 'KRIs'],
};

// Simulation 7: Working Capital Management
const CMA2_SIMULATION_5: PracticeSimulation = {
  id: 'cma2-sim-005',
  section: 'CMA2',
  title: 'Working Capital Optimization',
  blueprintArea: 'CMA2-B',
  topic: 'Cash Conversion Cycle',
  difficulty: 'medium',
  estimatedTime: 20,

  scenario: `Industrial Supply Co. is reviewing its working capital management. The CFO wants to improve cash flow by optimizing the cash conversion cycle.

Current working capital data is provided in Exhibit 1, along with industry benchmarks.`,

  exhibits: [
    {
      id: 'ex1',
      title: 'Working Capital Data',
      type: 'table',
      data: `| Item | Company | Industry Avg |
|------|---------|--------------|
| Annual Sales | $50M | - |
| Annual COGS | $35M | - |
| Annual Purchases | $30M | - |
| Accounts Receivable | $8M | - |
| Inventory | $10M | - |
| Accounts Payable | $4M | - |
| DSO (Days Sales Outstanding) | ? | 45 days |
| DIO (Days Inventory Outstanding) | ? | 85 days |
| DPO (Days Payable Outstanding) | ? | 40 days |
| Cash Conversion Cycle | ? | 90 days |

**Assumptions:** Use 365 days per year`,
    },
    {
      id: 'ex2',
      title: 'Improvement Options',
      type: 'text',
      data: `**Option A: Factoring Receivables**
- Factor 50% of receivables at 2% discount
- Reduces DSO by 20 days

**Option B: Inventory Reduction**
- Implement JIT for select items
- Reduce inventory by $2M
- One-time implementation cost: $150,000

**Option C: Extend Payables**
- Forgo 2/10 net 30 discount
- Extend payment from 15 to 30 days
- Current discount utilization: 60% of purchases`,
    },
  ],

  tasks: [
    {
      id: 't1',
      taskNumber: 1,
      requirement: 'Calculate DSO, DIO, DPO, and the Cash Conversion Cycle.',
      solution: {
        approach: 'Use standard formulas with 365 days',
        calculations: `**DSO = (AR / Sales) × 365**
DSO = ($8M / $50M) × 365 = 58.4 days

**DIO = (Inventory / COGS) × 365**
DIO = ($10M / $35M) × 365 = 104.3 days

**DPO = (AP / Purchases) × 365**
DPO = ($4M / $30M) × 365 = 48.7 days

**Cash Conversion Cycle = DSO + DIO - DPO**
CCC = 58.4 + 104.3 - 48.7 = **114 days**

Industry CCC = 90 days
Gap = 24 days longer than industry`,
        answer: { dso: 58.4, dio: 104.3, dpo: 48.7, ccc: 114 },
        explanation: 'Company\'s CCC is 24 days longer than industry, indicating working capital inefficiency.',
      },
      points: 30,
    },
    {
      id: 't2',
      taskNumber: 2,
      requirement: 'Calculate the annual cost of capital tied up in the cash conversion cycle (assume 8% cost of capital).',
      solution: {
        approach: 'Calculate working capital investment and financing cost',
        calculations: `**Working Capital Requirements:**
AR: $8M
Inventory: $10M
Less: AP: ($4M)
**Net Working Capital: $14M**

**Annual Financing Cost:**
$14M × 8% = **$1,120,000 per year**

**Alternative - Daily Sales Basis:**
Daily sales = $50M / 365 = $136,986
Capital tied up = Daily sales × CCC = $136,986 × 114 = $15.6M
Annual cost = $15.6M × 8% = $1,248,000`,
        answer: 1120000,
        explanation: 'The company spends over $1M annually financing its working capital cycle.',
      },
      points: 20,
    },
    {
      id: 't3',
      taskNumber: 3,
      requirement: 'Evaluate each improvement option and calculate the net annual benefit or cost.',
      solution: {
        approach: 'Calculate savings vs costs for each option',
        calculations: `**Option A: Factoring Receivables**
AR factored = $8M × 50% = $4M
Factoring cost = $4M × 2% = $80,000/year
Financing savings = ($4M × 20/58.4) × 8% = $109,589
**Net Benefit: $29,589/year**

**Option B: Inventory Reduction**
Inventory reduction: $2M
Annual financing savings: $2M × 8% = $160,000
Less: One-time cost amortized over 3 years: $50,000
**Net Benefit: $110,000/year**

**Option C: Extend Payables**
Lost discounts:
60% of $30M = $18M eligible for discount
Discount = $18M × 2% = $360,000/year
Financing savings: $4M additional AP × 8% = $320,000
**Net Cost: ($40,000)/year**`,
        answer: { optionA: 29589, optionB: 110000, optionC: -40000 },
        explanation: 'Option B provides the highest net benefit. Option C is costly because forgoing the discount has a 36.7% annualized cost.',
      },
      points: 35,
    },
    {
      id: 't4',
      taskNumber: 4,
      requirement: 'Recommend a working capital strategy and calculate the new CCC if implemented.',
      solution: {
        approach: 'Combine beneficial options and recalculate',
        calculations: `**Recommended Strategy:**
Implement Option A + Option B
Reject Option C (too expensive)

**New CCC Calculation:**
New DSO: 58.4 - 20 = 38.4 days (Option A)
New DIO: ($8M / $35M) × 365 = 83.4 days (Option B: $10M - $2M)
DPO: 48.7 days (unchanged)

**New CCC = 38.4 + 83.4 - 48.7 = 73.1 days**

**Improvement:**
Old CCC: 114 days → New CCC: 73.1 days
Improvement: 40.9 days (36% reduction)
Now BETTER than industry (73 vs 90)

**Total Annual Benefit:**
Option A: $29,589
Option B: $110,000
**Combined: $139,589/year**`,
        answer: { newCCC: 73.1, improvement: 40.9, benefit: 139589 },
        explanation: 'Implementing A+B achieves a 41-day improvement, making CCC better than industry average.',
      },
      points: 15,
    },
  ],

  skills: ['Working capital analysis', 'CCC optimization', 'Trade-off analysis'],
  relatedConcepts: ['Liquidity', 'Cash management', 'Trade credit'],
};

// Add simulations to arrays
CMA1_PRACTICE_SIMULATIONS.push(CMA1_SIMULATION_4, CMA1_SIMULATION_5);
CMA2_PRACTICE_SIMULATIONS.push(CMA2_SIMULATION_4, CMA2_SIMULATION_5);

// Import additional simulations
import { 
  CMA1_SIMULATION_6_BUDGETING,
  CMA1_SIMULATION_7_CVP,
  CMA1_SIMULATION_8_PROCESS_COSTING,
  CMA2_SIMULATION_6_CAPITAL_BUDGETING,
  CMA2_SIMULATION_7_FINANCIAL_RATIOS,
} from './additional-simulations';

// Import additional simulations batch 2
import {
  CMA1_SIMULATION_9_INTERNAL_CONTROLS,
  CMA1_SIMULATION_10_ANALYTICS,
  CMA2_SIMULATION_8_CAPITAL_STRUCTURE,
  CMA2_SIMULATION_9_DECISION_ANALYSIS,
  CMA2_SIMULATION_10_RISK_MANAGEMENT,
} from './additional-simulations-batch2';

// Add additional simulations to arrays
CMA1_PRACTICE_SIMULATIONS.push(
  CMA1_SIMULATION_6_BUDGETING,
  CMA1_SIMULATION_7_CVP,
  CMA1_SIMULATION_8_PROCESS_COSTING,
  CMA1_SIMULATION_9_INTERNAL_CONTROLS,
  CMA1_SIMULATION_10_ANALYTICS
);
CMA2_PRACTICE_SIMULATIONS.push(
  CMA2_SIMULATION_6_CAPITAL_BUDGETING,
  CMA2_SIMULATION_7_FINANCIAL_RATIOS,
  CMA2_SIMULATION_8_CAPITAL_STRUCTURE,
  CMA2_SIMULATION_9_DECISION_ANALYSIS,
  CMA2_SIMULATION_10_RISK_MANAGEMENT
);

// ============================================
// Combined Exports
// ============================================

export const ALL_PRACTICE_SIMULATIONS = [
  ...CMA1_PRACTICE_SIMULATIONS,
  ...CMA2_PRACTICE_SIMULATIONS,
];

export const getSimulationsBySection = (section: 'CMA1' | 'CMA2'): PracticeSimulation[] => {
  return ALL_PRACTICE_SIMULATIONS.filter(sim => sim.section === section);
};

export const getSimulationsByBlueprintArea = (area: string): PracticeSimulation[] => {
  return ALL_PRACTICE_SIMULATIONS.filter(sim => sim.blueprintArea === area);
};

export const getSimulationsByDifficulty = (difficulty: 'medium' | 'hard' | 'expert'): PracticeSimulation[] => {
  return ALL_PRACTICE_SIMULATIONS.filter(sim => sim.difficulty === difficulty);
};

export default ALL_PRACTICE_SIMULATIONS;

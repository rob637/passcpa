/**
 * CMA Practice Simulations - Additional Batch
 * 
 * More comprehensive calculation-based scenarios for advanced practice
 * Covers key blueprint areas for both Part 1 and Part 2
 */

import { PracticeSimulation } from './index';

// ============================================
// CMA Part 1 Additional Simulations
// ============================================

export const CMA1_SIMULATION_6_BUDGETING: PracticeSimulation = {
  id: 'cma1-sim-006',
  section: 'CMA1',
  title: 'Comprehensive Master Budget Development',
  blueprintArea: 'CMA1-B',
  topic: 'Master Budgeting',
  difficulty: 'hard',
  estimatedTime: 30,
  
  scenario: `You are the budget manager for HomeStyle Furniture Inc. The company manufactures custom office desks. Management has requested you prepare the operating budgets for Q2 of the upcoming year.

The following information is available for budget preparation (Exhibit 1 and 2). Each desk requires 20 board feet of lumber and 3 hours of direct labor.`,

  exhibits: [
    {
      id: 'ex1',
      title: 'Sales Forecast and Pricing',
      type: 'table',
      data: `| Month | Projected Sales (units) | Selling Price |
|-------|------------------------|---------------|
| April | 1,200 desks | $450 |
| May | 1,500 desks | $450 |
| June | 1,800 desks | $450 |
| July (for planning) | 1,600 desks | $450 |

**Collections Pattern:**
- 60% collected in month of sale
- 35% collected in following month
- 5% uncollectible

**Beginning A/R (April 1):** $162,000 (all collectible from March sales)`,
    },
    {
      id: 'ex2',
      title: 'Production and Cost Information',
      type: 'table',
      data: `| Item | Details |
|------|---------|
| Desired Ending FG Inventory | 20% of next month's sales |
| Beginning FG Inventory (April 1) | 240 desks |
| Lumber Cost | $6 per board foot |
| Desired Ending Materials | 10% of next month's production needs |
| Beginning Materials (April 1) | 2,500 board feet |
| Direct Labor Rate | $28 per hour |
| Variable MOH | $8 per direct labor hour |
| Fixed MOH | $42,000 per month |`,
    },
  ],

  tasks: [
    {
      id: 't1',
      taskNumber: 1,
      requirement: 'Prepare the Production Budget for Q2 (April, May, June) showing required production units each month.',
      hints: ['Production = Sales + Ending FG - Beginning FG'],
      solution: {
        approach: 'Calculate ending inventory needs, then solve for production',
        calculations: `**Production Budget:**

| | April | May | June |
|--|-------|-----|------|
| Budgeted Sales | 1,200 | 1,500 | 1,800 |
| + Desired Ending FG | 300 | 360 | 320 |
| = Total Needed | 1,500 | 1,860 | 2,120 |
| - Beginning FG | (240) | (300) | (360) |
| **= Production Required** | **1,260** | **1,560** | **1,760** |

*Ending FG calculations:*
- April ending = 20% × 1,500 May sales = 300
- May ending = 20% × 1,800 June sales = 360  
- June ending = 20% × 1,600 July sales = 320`,
        answer: { april: 1260, may: 1560, june: 1760, total: 4580 },
        explanation: 'Production must satisfy both sales requirements and desired inventory levels.',
      },
      points: 20,
    },
    {
      id: 't2',
      taskNumber: 2,
      requirement: 'Prepare the Direct Materials (Lumber) Purchases Budget for Q2.',
      hints: ['Materials to purchase = Materials needed for production + Ending materials - Beginning materials'],
      solution: {
        approach: 'Calculate materials needed for production, then desired ending inventory',
        calculations: `**Direct Materials Budget (Board Feet):**

| | April | May | June |
|--|-------|-----|------|
| Production Units | 1,260 | 1,560 | 1,760 |
| × 20 BF per unit | | | |
| = Materials for Production | 25,200 | 31,200 | 35,200 |
| + Desired Ending Materials | 3,120 | 3,520 | 3,200* |
| = Total Materials Needed | 28,320 | 34,720 | 38,400 |
| - Beginning Materials | (2,500) | (3,120) | (3,520) |
| **= Purchases (BF)** | **25,820** | **31,600** | **34,880** |
| × $6 per BF | | | |
| **= Purchase Cost** | **$154,920** | **$189,600** | **$209,280** |

*Ending materials calculations:*
- April ending = 10% × 31,200 May needs = 3,120 BF
- May ending = 10% × 35,200 June needs = 3,520 BF
- June ending = 10% × 32,000 July needs (1,600 × 20) = 3,200 BF`,
        answer: { aprilPurchases: 154920, mayPurchases: 189600, junePurchases: 209280 },
        explanation: 'Materials purchases must cover production needs plus maintain desired ending inventory.',
      },
      points: 25,
    },
    {
      id: 't3',
      taskNumber: 3,
      requirement: 'Prepare the Direct Labor Budget for Q2 showing hours and cost by month.',
      hints: ['Each desk requires 3 direct labor hours'],
      solution: {
        approach: 'Multiply production by hours per unit, then by rate',
        calculations: `**Direct Labor Budget:**

| | April | May | June | Q2 Total |
|--|-------|-----|------|----------|
| Production Units | 1,260 | 1,560 | 1,760 | 4,580 |
| × 3 DLH per unit | | | | |
| = Direct Labor Hours | 3,780 | 4,680 | 5,280 | 13,740 |
| × $28 per hour | | | | |
| **= DL Cost** | **$105,840** | **$131,040** | **$147,840** | **$384,720** |`,
        answer: { aprilHours: 3780, mayHours: 4680, juneHours: 5280, totalCost: 384720 },
        explanation: 'Direct labor budget derives directly from the production budget.',
      },
      points: 15,
    },
    {
      id: 't4',
      taskNumber: 4,
      requirement: 'Prepare the Cash Collections Budget for Q2.',
      hints: ['Consider beginning A/R and collection pattern'],
      solution: {
        approach: 'Apply collection percentages to each month sales',
        calculations: `**Cash Collections Budget:**

| Month | April | May | June |
|-------|-------|-----|------|
| **April Sales ($540,000):** | | | |
| - 60% current month | $324,000 | | |
| - 35% next month | | $189,000 | |
| **May Sales ($675,000):** | | | |
| - 60% current month | | $405,000 | |
| - 35% next month | | | $236,250 |
| **June Sales ($810,000):** | | | |
| - 60% current month | | | $486,000 |
| **From Beginning A/R** | $162,000 | | |
| **Total Collections** | **$486,000** | **$594,000** | **$722,250** |

*Sales calculations: $450 × units each month*
- April: $450 × 1,200 = $540,000
- May: $450 × 1,500 = $675,000
- June: $450 × 1,800 = $810,000`,
        answer: { aprilCollections: 486000, mayCollections: 594000, juneCollections: 722250 },
        explanation: 'Collection patterns create timing differences between sales and cash receipts.',
      },
      points: 25,
    },
    {
      id: 't5',
      taskNumber: 5,
      requirement: 'Calculate the total Manufacturing Overhead Budget for Q2.',
      hints: ['Variable OH is based on direct labor hours; Fixed OH is per month'],
      solution: {
        approach: 'Calculate variable OH based on DLH, add fixed OH',
        calculations: `**Manufacturing Overhead Budget:**

| | April | May | June | Q2 Total |
|--|-------|-----|------|----------|
| Direct Labor Hours | 3,780 | 4,680 | 5,280 | 13,740 |
| × $8 Variable OH rate | | | | |
| = Variable MOH | $30,240 | $37,440 | $42,240 | $109,920 |
| + Fixed MOH | $42,000 | $42,000 | $42,000 | $126,000 |
| **= Total MOH** | **$72,240** | **$79,440** | **$84,240** | **$235,920** |`,
        answer: { totalVariableOH: 109920, totalFixedOH: 126000, totalOH: 235920 },
        explanation: 'MOH budget separates variable (activity-based) from fixed (period-based) costs.',
      },
      points: 15,
    },
  ],

  skills: ['Master budgeting', 'Cash flow forecasting', 'Production planning', 'Inventory management'],
  relatedConcepts: ['Sales budget', 'Production budget', 'Cash budget', 'Operating budgets'],
};

export const CMA1_SIMULATION_7_CVP: PracticeSimulation = {
  id: 'cma1-sim-007',
  section: 'CMA1',
  title: 'Multi-Product CVP Analysis',
  blueprintArea: 'CMA1-C',
  topic: 'Cost-Volume-Profit Analysis',
  difficulty: 'hard',
  estimatedTime: 25,
  
  scenario: `TechGadget Inc. manufactures three products: Basic, Standard, and Premium smartphones. Management needs CVP analysis for strategic planning. The following data is provided for the upcoming quarter.`,

  exhibits: [
    {
      id: 'ex1',
      title: 'Product Information',
      type: 'table',
      data: `| Product | Selling Price | Variable Cost/Unit | Sales Mix % |
|---------|--------------|-------------------|-------------|
| Basic | $300 | $180 | 50% |
| Standard | $500 | $275 | 30% |
| Premium | $800 | $400 | 20% |

**Total Fixed Costs:** $1,260,000 per quarter`,
    },
    {
      id: 'ex2',
      title: 'Additional Information',
      type: 'text',
      data: `- Current quarterly sales: 12,000 total units
- Target profit for next quarter: $504,000
- Tax rate: 25%
- Management is considering dropping the Basic model and shifting its sales mix to Standard (increasing to 60%) and Premium (40%)`,
    },
  ],

  tasks: [
    {
      id: 't1',
      taskNumber: 1,
      requirement: 'Calculate the contribution margin per unit and CM ratio for each product.',
      hints: ['CM = Selling Price - Variable Cost; CM Ratio = CM / Selling Price'],
      solution: {
        approach: 'Calculate CM per unit, then divide by selling price for ratio',
        calculations: `**Contribution Margin Analysis:**

| Product | Selling Price | Variable Cost | CM/Unit | CM Ratio |
|---------|--------------|---------------|---------|----------|
| Basic | $300 | $180 | $120 | 40.0% |
| Standard | $500 | $275 | $225 | 45.0% |
| Premium | $800 | $400 | $400 | 50.0% |`,
        answer: { basicCM: 120, standardCM: 225, premiumCM: 400 },
        explanation: 'Higher-priced products have higher CM per unit and CM ratios, indicating better profitability.',
      },
      points: 15,
    },
    {
      id: 't2',
      taskNumber: 2,
      requirement: 'Calculate the weighted-average contribution margin per unit and the break-even point in total units.',
      hints: ['WACM = Sum of (CM × mix %); BEP units = Fixed Costs / WACM'],
      solution: {
        approach: 'Weight each CM by sales mix, sum for WACM, then calculate BEP',
        calculations: `**Weighted-Average CM:**
WACM = (CM × Mix %) for each product

= ($120 × 50%) + ($225 × 30%) + ($400 × 20%)
= $60 + $67.50 + $80
= **$207.50 per weighted unit**

**Break-Even Point:**
BEP (units) = Fixed Costs / WACM
= $1,260,000 / $207.50
= **6,072 total units** (rounded up)

**By Product (at BEP):**
- Basic: 6,072 × 50% = 3,036 units
- Standard: 6,072 × 30% = 1,822 units
- Premium: 6,072 × 20% = 1,214 units`,
        answer: { wacm: 207.50, bepUnits: 6072 },
        explanation: 'The weighted-average CM reflects the sales mix impact on overall profitability.',
      },
      points: 25,
    },
    {
      id: 't3',
      taskNumber: 3,
      requirement: 'Calculate the number of total units needed to achieve the target after-tax profit of $504,000.',
      hints: ['Convert after-tax to before-tax profit using the tax rate'],
      solution: {
        approach: 'Calculate before-tax target, then use CVP formula',
        calculations: `**Before-Tax Profit Needed:**
After-tax profit = Before-tax × (1 - Tax rate)
$504,000 = Before-tax × (1 - 0.25)
$504,000 = Before-tax × 0.75
Before-tax profit = $504,000 / 0.75 = **$672,000**

**Units for Target Profit:**
Units = (Fixed Costs + Target Before-Tax Profit) / WACM
= ($1,260,000 + $672,000) / $207.50
= $1,932,000 / $207.50
= **9,311 total units**`,
        answer: { beforeTaxProfit: 672000, requiredUnits: 9311 },
        explanation: 'After-tax targets must be converted to before-tax to use in CVP analysis.',
      },
      points: 25,
    },
    {
      id: 't4',
      taskNumber: 4,
      requirement: 'Evaluate the proposed change to drop Basic and shift sales mix. Calculate the new WACM and break-even point.',
      hints: ['New mix: Standard 60%, Premium 40%'],
      solution: {
        approach: 'Recalculate WACM with new mix, then new BEP',
        calculations: `**New Weighted-Average CM (without Basic):**

| Product | CM/Unit | New Mix | Weighted CM |
|---------|---------|---------|-------------|
| Standard | $225 | 60% | $135.00 |
| Premium | $400 | 40% | $160.00 |
| **Total WACM** | | | **$295.00** |

**New Break-Even Point:**
BEP (units) = $1,260,000 / $295.00 = **4,271 total units**

**Comparison:**
| Metric | Current Mix | Proposed Mix | Change |
|--------|-------------|--------------|--------|
| WACM | $207.50 | $295.00 | +$87.50 (42% higher) |
| BEP Units | 6,072 | 4,271 | -1,801 (30% lower) |

**Recommendation:** The new product mix is significantly more profitable per unit and has a much lower break-even point. However, management must assess if demand exists for 40% more Standard and 100% more Premium units.`,
        answer: { newWACM: 295.00, newBEP: 4271, bepReduction: 1801 },
        explanation: 'Shifting mix toward higher-margin products significantly improves profitability metrics.',
      },
      points: 25,
    },
    {
      id: 't5',
      taskNumber: 5,
      requirement: 'If sales remain at 12,000 total units, compare quarterly profit under both scenarios.',
      hints: ['Profit = (Units × WACM) - Fixed Costs'],
      solution: {
        approach: 'Calculate total CM less fixed costs for both scenarios',
        calculations: `**Profit Comparison at 12,000 Units:**

**Current Mix:**
Total CM = 12,000 × $207.50 = $2,490,000
Profit = $2,490,000 - $1,260,000 = **$1,230,000**

**Proposed Mix:**
Total CM = 12,000 × $295.00 = $3,540,000
Profit = $3,540,000 - $1,260,000 = **$2,280,000**

**Improvement:**
Additional Profit = $2,280,000 - $1,230,000 = **$1,050,000 per quarter**
= 85.4% improvement in quarterly profit`,
        answer: { currentProfit: 1230000, proposedProfit: 2280000, improvement: 1050000 },
        explanation: 'At the same volume, shifting to higher-margin products dramatically increases profit.',
      },
      points: 10,
    },
  ],

  skills: ['CVP analysis', 'Multi-product break-even', 'Sales mix optimization', 'Profit planning'],
  relatedConcepts: ['Contribution margin', 'Break-even', 'Target profit', 'Sales mix'],
};

export const CMA1_SIMULATION_8_PROCESS_COSTING: PracticeSimulation = {
  id: 'cma1-sim-008',
  section: 'CMA1',
  title: 'Weighted-Average Process Costing',
  blueprintArea: 'CMA1-D',
  topic: 'Process Costing',
  difficulty: 'hard',
  estimatedTime: 30,
  
  scenario: `ChemCorp Inc. manufactures industrial chemicals through a continuous process. The Mixing Department is the first of three production departments. The department uses the weighted-average method for process costing.

Production data for November is provided below.`,

  exhibits: [
    {
      id: 'ex1',
      title: 'Production Data - November',
      type: 'table',
      data: `| Physical Units Data | Gallons |
|---------------------|---------|
| Beginning WIP (November 1) | 8,000 |
| - Materials: 100% complete | |
| - Conversion: 40% complete | |
| Units Started in November | 52,000 |
| Units Completed & Transferred | 50,000 |
| Ending WIP (November 30) | 10,000 |
| - Materials: 100% complete | |
| - Conversion: 60% complete | |`,
    },
    {
      id: 'ex2',
      title: 'Cost Data',
      type: 'table',
      data: `| Cost Element | Beginning WIP | Added in November |
|--------------|---------------|-------------------|
| Direct Materials | $28,800 | $187,200 |
| Conversion Costs | $12,600 | $199,400 |
| **Total** | **$41,400** | **$386,600** |`,
    },
  ],

  tasks: [
    {
      id: 't1',
      taskNumber: 1,
      requirement: 'Compute the equivalent units of production for materials and conversion costs.',
      hints: ['Under weighted-average, treat all units as if started this period'],
      solution: {
        approach: 'Calculate EUP for completed units (100%) plus ending WIP (at completion %)',
        calculations: `**Equivalent Units - Weighted Average Method:**

| | Physical Units | Materials (100%) | Conversion |
|--|---------------|------------------|------------|
| Completed & Transferred | 50,000 | 50,000 | 50,000 |
| Ending WIP | 10,000 | 10,000 (100%) | 6,000 (60%) |
| **Total Equivalent Units** | | **60,000** | **56,000** |

*Note: Under weighted-average, beginning WIP is not separated - all work is treated as if performed this period.*`,
        answer: { materialsEUP: 60000, conversionEUP: 56000 },
        explanation: 'Weighted-average method combines beginning and current period work into one pool.',
      },
      points: 20,
    },
    {
      id: 't2',
      taskNumber: 2,
      requirement: 'Calculate the cost per equivalent unit for materials and conversion costs.',
      hints: ['Total costs to account for = Beginning WIP + Added this period'],
      solution: {
        approach: 'Total costs ÷ equivalent units for each cost element',
        calculations: `**Total Costs to Account For:**
Materials: $28,800 + $187,200 = $216,000
Conversion: $12,600 + $199,400 = $212,000
Total: $428,000

**Cost per Equivalent Unit:**

| Cost Element | Total Costs | ÷ EUP | = Cost/EU |
|--------------|-------------|-------|-----------|
| Materials | $216,000 | ÷ 60,000 | = $3.60/EU |
| Conversion | $212,000 | ÷ 56,000 | = $3.7857/EU |
| **Total** | | | **$7.3857/EU** |`,
        answer: { materialsCostPerEU: 3.60, conversionCostPerEU: 3.7857, totalCostPerEU: 7.3857 },
        explanation: 'Cost per EU uses total costs (beginning + added) divided by equivalent units.',
      },
      points: 25,
    },
    {
      id: 't3',
      taskNumber: 3,
      requirement: 'Determine the cost of units completed and transferred to the next department.',
      hints: ['Completed units are 100% complete for all cost elements'],
      solution: {
        approach: 'Multiply completed units by total cost per EU',
        calculations: `**Cost of Completed Units:**

| Cost Element | Completed Units × Cost/EU | = Cost |
|--------------|--------------------------|--------|
| Materials | 50,000 × $3.60 | = $180,000 |
| Conversion | 50,000 × $3.7857 | = $189,285 |
| **Total Transferred** | | **$369,285** |

*Alternative calculation: 50,000 × $7.3857 = $369,285*`,
        answer: { transferredCost: 369285 },
        explanation: 'Completed units receive full cost allocation for both materials and conversion.',
      },
      points: 20,
    },
    {
      id: 't4',
      taskNumber: 4,
      requirement: 'Determine the cost of ending work in process inventory.',
      hints: ['Apply appropriate completion percentages to ending WIP'],
      solution: {
        approach: 'Calculate EU for ending WIP × cost per EU',
        calculations: `**Cost of Ending WIP:**

| Cost Element | Ending WIP EU × Cost/EU | = Cost |
|--------------|------------------------|--------|
| Materials | 10,000 × $3.60 | = $36,000 |
| Conversion | 6,000 × $3.7857 | = $22,714 |
| **Total Ending WIP** | | **$58,714** |

*Verification:*
Transferred: $369,285
Ending WIP: $58,714
**Total: $427,999 ≈ $428,000** ✓ (rounding difference)`,
        answer: { endingWIPCost: 58714 },
        explanation: 'Ending WIP receives cost only for work actually completed.',
      },
      points: 20,
    },
    {
      id: 't5',
      taskNumber: 5,
      requirement: 'Prepare the cost reconciliation showing that total costs to account for equals total costs accounted for.',
      hints: ['This is a control check for accuracy'],
      solution: {
        approach: 'Create a formal reconciliation statement',
        calculations: `**COST RECONCILIATION:**

**Costs to Account For:**
| Source | Materials | Conversion | Total |
|--------|-----------|------------|-------|
| Beginning WIP | $28,800 | $12,600 | $41,400 |
| Added in November | $187,200 | $199,400 | $386,600 |
| **Total to Account For** | **$216,000** | **$212,000** | **$428,000** |

**Costs Accounted For:**
| Destination | Materials | Conversion | Total |
|-------------|-----------|------------|-------|
| Transferred Out | $180,000 | $189,285 | $369,285 |
| Ending WIP | $36,000 | $22,714 | $58,714 |
| **Total Accounted For** | **$216,000** | **$211,999** | **$427,999** |

*$1 difference due to rounding in conversion cost per EU*
**Reconciliation: ✓ Balanced**`,
        answer: { toAccountFor: 428000, accountedFor: 427999, balanced: 1 },
        explanation: 'Cost reconciliation verifies that all costs have been properly assigned.',
      },
      points: 15,
    },
  ],

  skills: ['Process costing', 'Equivalent units calculation', 'Cost allocation', 'Cost reconciliation'],
  relatedConcepts: ['Weighted-average method', 'Work in process', 'Cost flows', 'Manufacturing'],
};

// ============================================
// CMA Part 2 Additional Simulations
// ============================================

export const CMA2_SIMULATION_6_CAPITAL_BUDGETING: PracticeSimulation = {
  id: 'cma2-sim-006',
  section: 'CMA2',
  title: 'Comprehensive Capital Budgeting Analysis',
  blueprintArea: 'CMA2-E',
  topic: 'Capital Investment Decisions',
  difficulty: 'hard',
  estimatedTime: 35,
  
  scenario: `AutoParts Manufacturing is evaluating a $2,000,000 investment in new automated production equipment. The CFO has requested a complete capital budgeting analysis using multiple methods.

The project details are provided in the exhibits below. The company's required rate of return (cost of capital) is 12%.`,

  exhibits: [
    {
      id: 'ex1',
      title: 'Project Cash Flows',
      type: 'table',
      data: `| Year | Operating Cash Inflows | Additional Working Capital | Salvage Value |
|------|----------------------|---------------------------|---------------|
| 0 | — | ($150,000) | — |
| 1 | $580,000 | — | — |
| 2 | $620,000 | — | — |
| 3 | $650,000 | — | — |
| 4 | $600,000 | — | — |
| 5 | $550,000 | $150,000 recovery | $200,000 |

**Initial Investment:** $2,000,000 (depreciated straight-line over 5 years)
**Tax Rate:** 30%`,
    },
    {
      id: 'ex2',
      title: 'Present Value Factors (12%)',
      type: 'table',
      data: `| Year | PV Factor (12%) | Cumulative PV Factor |
|------|-----------------|---------------------|
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
      requirement: 'Calculate the total initial investment (outflow at Year 0).',
      hints: ['Include both equipment cost and working capital'],
      solution: {
        approach: 'Sum all Year 0 outflows',
        calculations: `**Initial Investment:**
Equipment cost: $2,000,000
Working capital: $150,000
**Total Initial Investment: $2,150,000**

*Working capital is recovered at end of project life and is not depreciated.*`,
        answer: { initialInvestment: 2150000 },
        explanation: 'Initial investment includes all outflows at project inception.',
      },
      points: 10,
    },
    {
      id: 't2',
      taskNumber: 2,
      requirement: 'Calculate the Net Present Value (NPV) of the project.',
      hints: ['Terminal year includes salvage value and WC recovery'],
      solution: {
        approach: 'Calculate PV of each year cash flow, sum, and subtract initial investment',
        calculations: `**NPV Calculation:**

| Year | Cash Flow | × PV Factor | = Present Value |
|------|-----------|-------------|-----------------|
| 1 | $580,000 | × 0.8929 | = $517,882 |
| 2 | $620,000 | × 0.7972 | = $494,264 |
| 3 | $650,000 | × 0.7118 | = $462,670 |
| 4 | $600,000 | × 0.6355 | = $381,300 |
| 5 | $900,000* | × 0.5674 | = $510,660 |
| **Total PV of Inflows** | | | **$2,366,776** |

*Year 5: $550,000 + $150,000 WC + $200,000 salvage = $900,000*

**NPV = PV of Inflows - Initial Investment**
NPV = $2,366,776 - $2,150,000 = **$216,776**

**Decision: ACCEPT** (NPV > 0)`,
        answer: { npv: 216776, decision: 1 },
        explanation: 'Positive NPV indicates the project exceeds the required return. Decision: ACCEPT.',
      },
      points: 25,
    },
    {
      id: 't3',
      taskNumber: 3,
      requirement: 'Calculate the Internal Rate of Return (IRR) using interpolation.',
      hints: ['Try 15% and 18% discount rates, then interpolate'],
      solution: {
        approach: 'Calculate NPV at two rates, then interpolate to find IRR',
        calculations: `**PV Factors:**
| Year | 15% Factor | 18% Factor |
|------|------------|------------|
| 1 | 0.8696 | 0.8475 |
| 2 | 0.7561 | 0.7182 |
| 3 | 0.6575 | 0.6086 |
| 4 | 0.5718 | 0.5158 |
| 5 | 0.4972 | 0.4371 |

**NPV at 15%:**
= (580K×.8696) + (620K×.7561) + (650K×.6575) + (600K×.5718) + (900K×.4972) - 2,150K
= 504,368 + 468,782 + 427,375 + 343,080 + 447,480 - 2,150,000
= 2,191,085 - 2,150,000 = **$41,085**

**NPV at 18%:**
= (580K×.8475) + (620K×.7182) + (650K×.6086) + (600K×.5158) + (900K×.4371) - 2,150K
= 491,550 + 445,284 + 395,590 + 309,480 + 393,390 - 2,150,000
= 2,035,294 - 2,150,000 = **($114,706)**

**Interpolation:**
IRR = 15% + [41,085 / (41,085 + 114,706)] × (18% - 15%)
IRR = 15% + [0.264] × 3%
IRR = 15% + 0.79% = **15.79%**

**Decision: ACCEPT** (IRR 15.79% > Required 12%)`,
        answer: { irr: 15.79, decision: 1 },
        explanation: 'IRR exceeds the cost of capital, confirming the NPV decision. Decision: ACCEPT.',
      },
      points: 25,
    },
    {
      id: 't4',
      taskNumber: 4,
      requirement: 'Calculate the Payback Period and Discounted Payback Period.',
      hints: ['Track cumulative cash flows until investment is recovered'],
      solution: {
        approach: 'Calculate cumulative cash flows for both methods',
        calculations: `**Simple Payback:**
| Year | Cash Flow | Cumulative |
|------|-----------|------------|
| 0 | ($2,150,000) | ($2,150,000) |
| 1 | 580,000 | (1,570,000) |
| 2 | 620,000 | (950,000) |
| 3 | 650,000 | (300,000) |
| 4 | 600,000 | 300,000 ← Recovered |

Payback = 3 + (300,000/600,000) = **3.5 years**

**Discounted Payback:**
| Year | Cash Flow | PV | Cumulative PV |
|------|-----------|-----|---------------|
| 0 | ($2,150,000) | ($2,150,000) | ($2,150,000) |
| 1 | 580,000 | 517,882 | (1,632,118) |
| 2 | 620,000 | 494,264 | (1,137,854) |
| 3 | 650,000 | 462,670 | (675,184) |
| 4 | 600,000 | 381,300 | (293,884) |
| 5 | 900,000 | 510,660 | 216,776 ← Recovered |

Discounted Payback = 4 + (293,884/510,660) = **4.58 years**`,
        answer: { payback: 3.5, discountedPayback: 4.58 },
        explanation: 'Discounted payback accounts for time value of money, always longer than simple payback.',
      },
      points: 20,
    },
    {
      id: 't5',
      taskNumber: 5,
      requirement: 'Calculate the Profitability Index and summarize your recommendation.',
      hints: ['PI = PV of Inflows / Initial Investment'],
      solution: {
        approach: 'Calculate PI ratio and provide comprehensive recommendation',
        calculations: `**Profitability Index:**
PI = PV of Inflows / Initial Investment
PI = $2,366,776 / $2,150,000 = **1.101**

**Decision Summary:**
| Method | Result | Decision Rule | Accept? |
|--------|--------|---------------|---------|
| NPV | $216,776 | > 0 | ✓ Yes |
| IRR | 15.79% | > 12% cost of capital | ✓ Yes |
| PI | 1.101 | > 1.0 | ✓ Yes |
| Payback | 3.5 years | Depends on policy | Likely ✓ |
| Discounted Payback | 4.58 years | < Project life | ✓ Yes |

**RECOMMENDATION: ACCEPT THE PROJECT**
All capital budgeting measures support investment. NPV of $216,776 represents value creation exceeding the required return.`,
        answer: { pi: 1.101, recommendation: 1 },
        explanation: 'PI > 1.0 indicates $1.101 in PV for every $1 invested. Recommendation: ACCEPT.',
      },
      points: 20,
    },
  ],

  skills: ['NPV analysis', 'IRR calculation', 'Payback period', 'Investment decision-making'],
  relatedConcepts: ['Time value of money', 'Cost of capital', 'Project evaluation', 'Capital allocation'],
};

export const CMA2_SIMULATION_7_FINANCIAL_RATIOS: PracticeSimulation = {
  id: 'cma2-sim-007',
  section: 'CMA2',
  title: 'Comprehensive Financial Statement Analysis',
  blueprintArea: 'CMA2-A',
  topic: 'Financial Ratio Analysis',
  difficulty: 'hard',
  estimatedTime: 30,
  
  scenario: `You are the financial analyst for a private equity firm evaluating a potential acquisition of RetailCo Inc. Using the financial statements provided, prepare a comprehensive ratio analysis to assess the company's financial health and performance.`,

  exhibits: [
    {
      id: 'ex1',
      title: 'Condensed Balance Sheet (December 31)',
      type: 'table',
      data: `| Assets | Amount | Liabilities & Equity | Amount |
|--------|--------|---------------------|--------|
| Cash | $85,000 | Accounts Payable | $180,000 |
| Accounts Receivable | $220,000 | Accrued Expenses | $45,000 |
| Inventory | $310,000 | Current Portion LT Debt | $75,000 |
| Prepaid Expenses | $25,000 | **Total Current Liabilities** | **$300,000** |
| **Total Current Assets** | **$640,000** | Long-term Debt | $400,000 |
| Property, Plant & Equipment (net) | $680,000 | **Total Liabilities** | **$700,000** |
| Intangible Assets | $180,000 | Common Stock | $200,000 |
| | | Retained Earnings | $600,000 |
| | | **Total Equity** | **$800,000** |
| **Total Assets** | **$1,500,000** | **Total L&E** | **$1,500,000** |`,
    },
    {
      id: 'ex2',
      title: 'Income Statement (Year Ended December 31)',
      type: 'table',
      data: `| Item | Amount |
|------|--------|
| Net Sales | $2,400,000 |
| Cost of Goods Sold | (1,680,000) |
| **Gross Profit** | **$720,000** |
| Operating Expenses | (480,000) |
| **Operating Income (EBIT)** | **$240,000** |
| Interest Expense | (40,000) |
| **Income Before Tax** | **$200,000** |
| Income Tax Expense (25%) | (50,000) |
| **Net Income** | **$150,000** |

**Additional Info:**
- Industry Average ROE: 15%
- Beginning Total Equity: $750,000
- Beginning Total Assets: $1,400,000
- Beginning Inventory: $290,000
- Beginning Accounts Receivable: $200,000`,
    },
  ],

  tasks: [
    {
      id: 't1',
      taskNumber: 1,
      requirement: 'Calculate the key liquidity ratios: Current Ratio, Quick Ratio, and Cash Ratio.',
      hints: ['Quick assets = Current assets - Inventory - Prepaids'],
      solution: {
        approach: 'Calculate each ratio using appropriate current items',
        calculations: `**Liquidity Ratios:**

**Current Ratio:**
= Current Assets / Current Liabilities
= $640,000 / $300,000 = **2.13:1**

**Quick Ratio (Acid-Test):**
= (Cash + A/R) / Current Liabilities
= ($85,000 + $220,000) / $300,000
= $305,000 / $300,000 = **1.02:1**

**Cash Ratio:**
= Cash / Current Liabilities
= $85,000 / $300,000 = **0.28:1**

**Assessment:**
- Current ratio strong (>2.0)
- Quick ratio adequate (>1.0)
- Cash ratio shows some dependency on A/R collections`,
        answer: { currentRatio: 2.13, quickRatio: 1.02, cashRatio: 0.28 },
        explanation: 'Multiple liquidity measures provide different perspectives on short-term solvency.',
      },
      points: 20,
    },
    {
      id: 't2',
      taskNumber: 2,
      requirement: 'Calculate efficiency ratios: Inventory Turnover, Days Sales Outstanding (DSO), and Asset Turnover.',
      hints: ['Use average balances for balance sheet items'],
      solution: {
        approach: 'Calculate turnover ratios using appropriate income and balance sheet items',
        calculations: `**Efficiency Ratios:**

**Inventory Turnover:**
Average Inventory = ($290,000 + $310,000) / 2 = $300,000
Inventory Turnover = COGS / Avg Inventory
= $1,680,000 / $300,000 = **5.6 times**
Days in Inventory = 365 / 5.6 = **65.2 days**

**Accounts Receivable Turnover:**
Average A/R = ($200,000 + $220,000) / 2 = $210,000
A/R Turnover = Net Sales / Avg A/R
= $2,400,000 / $210,000 = **11.43 times**
DSO = 365 / 11.43 = **31.9 days**

**Total Asset Turnover:**
Average Total Assets = ($1,400,000 + $1,500,000) / 2 = $1,450,000
Asset Turnover = Net Sales / Avg Total Assets
= $2,400,000 / $1,450,000 = **1.66 times**`,
        answer: { inventoryTurnover: 5.6, dso: 31.9, assetTurnover: 1.66 },
        explanation: 'Efficiency ratios measure how effectively assets are used to generate sales.',
      },
      points: 25,
    },
    {
      id: 't3',
      taskNumber: 3,
      requirement: 'Calculate profitability ratios: Gross Margin, Operating Margin, Net Profit Margin, ROA, and ROE.',
      hints: ['Use average assets and equity for ROA and ROE'],
      solution: {
        approach: 'Calculate margin ratios from income statement, return ratios using averages',
        calculations: `**Profitability Ratios:**

**Gross Profit Margin:**
= Gross Profit / Net Sales
= $720,000 / $2,400,000 = **30.0%**

**Operating Margin:**
= Operating Income / Net Sales
= $240,000 / $2,400,000 = **10.0%**

**Net Profit Margin:**
= Net Income / Net Sales
= $150,000 / $2,400,000 = **6.25%**

**Return on Assets (ROA):**
Average Assets = $1,450,000
= Net Income / Avg Total Assets
= $150,000 / $1,450,000 = **10.34%**

**Return on Equity (ROE):**
Average Equity = ($750,000 + $800,000) / 2 = $775,000
= Net Income / Avg Equity
= $150,000 / $775,000 = **19.35%**

*Note: ROE of 19.35% exceeds industry average of 15%*`,
        answer: { grossMargin: 30.0, operatingMargin: 10.0, netMargin: 6.25, roa: 10.34, roe: 19.35 },
        explanation: 'Profitability ratios show margins at different income levels and returns on investment.',
      },
      points: 25,
    },
    {
      id: 't4',
      taskNumber: 4,
      requirement: 'Calculate leverage ratios: Debt-to-Equity, Debt-to-Assets, Times Interest Earned, and Equity Multiplier.',
      hints: ['Total debt includes both current and long-term debt portions'],
      solution: {
        approach: 'Calculate solvency and coverage ratios',
        calculations: `**Leverage Ratios:**

**Debt-to-Equity Ratio:**
Total Debt = Current Liabilities + LT Debt = $300,000 + $400,000 = $700,000
= Total Debt / Total Equity
= $700,000 / $800,000 = **0.875:1 or 87.5%**

**Debt-to-Assets Ratio:**
= Total Liabilities / Total Assets
= $700,000 / $1,500,000 = **46.7%**

**Times Interest Earned (TIE):**
= EBIT / Interest Expense
= $240,000 / $40,000 = **6.0 times**

**Equity Multiplier:**
= Total Assets / Total Equity
= $1,500,000 / $800,000 = **1.875**

**Assessment:**
- Moderate leverage (D/E < 1.0)
- Strong interest coverage (TIE > 5.0)
- Financial flexibility appears adequate`,
        answer: { debtToEquity: 0.875, debtToAssets: 0.467, tie: 6.0, equityMultiplier: 1.875 },
        explanation: 'Leverage ratios assess financial risk and debt service capability.',
      },
      points: 20,
    },
    {
      id: 't5',
      taskNumber: 5,
      requirement: 'Perform DuPont Analysis to decompose ROE and provide an overall assessment.',
      hints: ['DuPont: ROE = Net Margin × Asset Turnover × Equity Multiplier'],
      solution: {
        approach: 'Break down ROE using three-factor DuPont model',
        calculations: `**DuPont Analysis:**

ROE = Net Profit Margin × Asset Turnover × Equity Multiplier

**Components:**
Net Profit Margin = 6.25%
Asset Turnover = 1.66 times
Equity Multiplier = 1.875

**Verification:**
ROE = 6.25% × 1.66 × 1.875
ROE = 6.25% × 3.11 = **19.4%** ✓ (matches calculated 19.35%)

**Component Analysis:**
| Component | Value | Interpretation |
|-----------|-------|----------------|
| Net Margin | 6.25% | Moderate profitability per dollar of sales |
| Asset Turnover | 1.66x | Good asset utilization |
| Equity Multiplier | 1.875x | Moderate leverage |

**OVERALL ASSESSMENT:**
✓ ROE (19.35%) exceeds industry average (15%)
✓ Strong liquidity position
✓ Efficient asset utilization
✓ Manageable debt levels with strong coverage
⚠️ Gross margin (30%) and net margin could improve

**RECOMMENDATION:** Favorable acquisition candidate with solid fundamentals. Focus due diligence on margin improvement opportunities.`,
        answer: { dupontROE: 19.4, favorable: 1 },
        explanation: 'DuPont analysis reveals the drivers of ROE: profitability, efficiency, and leverage. Recommendation: Favorable acquisition candidate.',
      },
      points: 10,
    },
  ],

  skills: ['Financial ratio analysis', 'DuPont analysis', 'Trend interpretation', 'Investment evaluation'],
  relatedConcepts: ['Liquidity', 'Profitability', 'Solvency', 'Efficiency'],
};

export const CMA2_ADDITIONAL_SIMULATIONS = [
  CMA1_SIMULATION_6_BUDGETING,
  CMA1_SIMULATION_7_CVP,
  CMA1_SIMULATION_8_PROCESS_COSTING,
  CMA2_SIMULATION_6_CAPITAL_BUDGETING,
  CMA2_SIMULATION_7_FINANCIAL_RATIOS,
];

export default CMA2_ADDITIONAL_SIMULATIONS;

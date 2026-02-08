/**
 * CMA Part 1: Financial Planning, Performance, and Analytics
 * COMPREHENSIVE FORMULA SHEET
 * 
 * Organized by Blueprint Area for exam-day reference
 * All formulas verified against IMA Content Specification Outlines
 */

export interface Formula {
  id: string;
  name: string;
  formula: string;
  variables: { symbol: string; meaning: string }[];
  example?: string;
  tips?: string[];
  category: string;
  blueprintArea: string;
}

export interface FormulaCategory {
  id: string;
  name: string;
  blueprintArea: string;
  weight: string;
  formulas: Formula[];
}

export const CMA1_FORMULA_SHEET: FormulaCategory[] = [
  // ==========================================
  // CMA1-A: EXTERNAL FINANCIAL REPORTING (15%)
  // ==========================================
  {
    id: 'cma1a-formulas',
    name: 'External Financial Reporting Decisions',
    blueprintArea: 'CMA1-A',
    weight: '15%',
    formulas: [
      {
        id: 'cma1a-001',
        name: 'Basic Earnings Per Share',
        formula: 'Basic EPS = (Net Income − Preferred Dividends) / Weighted Average Common Shares Outstanding',
        variables: [
          { symbol: 'Net Income', meaning: 'Net income available to common shareholders' },
          { symbol: 'Preferred Dividends', meaning: 'Dividends declared on preferred stock' },
          { symbol: 'WACSO', meaning: 'Time-weighted average shares during period' },
        ],
        example: '($500,000 − $50,000) / 100,000 shares = $4.50 EPS',
        tips: ['Subtract preferred dividends from numerator', 'Use weighted average, not ending shares'],
        category: 'Financial Statements',
        blueprintArea: 'CMA1-A',
      },
      {
        id: 'cma1a-002',
        name: 'Diluted Earnings Per Share',
        formula: 'Diluted EPS = (Net Income − Pref Div + Convertible Adjustments) / (WACSO + Dilutive Securities)',
        variables: [
          { symbol: 'Convertible Adjustments', meaning: 'After-tax interest on convertible debt' },
          { symbol: 'Dilutive Securities', meaning: 'Shares from options, warrants, convertibles' },
        ],
        example: 'Add back interest×(1-t) for convertible bonds, add potential shares',
        tips: ['Only include if dilutive (lowers EPS)', 'Use treasury stock method for options'],
        category: 'Financial Statements',
        blueprintArea: 'CMA1-A',
      },
      {
        id: 'cma1a-003',
        name: 'Treasury Stock Method',
        formula: 'Incremental Shares = Options Outstanding − (Options × Exercise Price / Average Market Price)',
        variables: [
          { symbol: 'Options Outstanding', meaning: 'Number of options or warrants' },
          { symbol: 'Exercise Price', meaning: 'Strike price of option' },
          { symbol: 'Average Market Price', meaning: 'Average stock price during period' },
        ],
        example: '10,000 options at $15, market $20: 10,000 − (10,000 × $15/$20) = 2,500 incremental shares',
        tips: ['Only dilutive when market > exercise price', 'Assumes proceeds buy back shares at market'],
        category: 'Financial Statements',
        blueprintArea: 'CMA1-A',
      },
      {
        id: 'cma1a-004',
        name: 'Straight-Line Depreciation',
        formula: 'Annual Depreciation = (Cost − Salvage Value) / Useful Life',
        variables: [
          { symbol: 'Cost', meaning: 'Original purchase price including installation' },
          { symbol: 'Salvage Value', meaning: 'Estimated residual value at end of life' },
          { symbol: 'Useful Life', meaning: 'Expected service life in years' },
        ],
        example: '($100,000 − $10,000) / 10 years = $9,000 per year',
        category: 'Depreciation',
        blueprintArea: 'CMA1-A',
      },
      {
        id: 'cma1a-005',
        name: 'Double-Declining Balance Depreciation',
        formula: 'DDB Depreciation = (2 / Useful Life) × Book Value at Beginning of Year',
        variables: [
          { symbol: '2/Useful Life', meaning: 'Twice the straight-line rate' },
          { symbol: 'Book Value', meaning: 'Cost minus accumulated depreciation' },
        ],
        example: 'Asset $100,000, 5 years: Year 1 = 40% × $100,000 = $40,000',
        tips: ['Ignores salvage until switching to SL', 'Cannot depreciate below salvage'],
        category: 'Depreciation',
        blueprintArea: 'CMA1-A',
      },
      {
        id: 'cma1a-006',
        name: 'Units of Production Depreciation',
        formula: 'Depreciation = [(Cost − Salvage) / Total Estimated Units] × Units Produced',
        variables: [
          { symbol: 'Total Estimated Units', meaning: 'Lifetime production capacity' },
          { symbol: 'Units Produced', meaning: 'Actual units in current period' },
        ],
        example: '($50,000 − $5,000) / 100,000 units × 8,000 = $3,600',
        category: 'Depreciation',
        blueprintArea: 'CMA1-A',
      },
      {
        id: 'cma1a-007',
        name: 'FIFO Ending Inventory',
        formula: 'FIFO Ending Inventory = Most Recent Purchase Costs × Ending Units',
        variables: [],
        tips: ['FIFO: First costs go to COGS, last costs stay in inventory', 'Higher income in rising prices'],
        category: 'Inventory',
        blueprintArea: 'CMA1-A',
      },
      {
        id: 'cma1a-008',
        name: 'LIFO Ending Inventory',
        formula: 'LIFO Ending Inventory = Oldest Purchase Costs × Ending Units',
        variables: [],
        tips: ['LIFO: Last costs go to COGS, first costs stay in inventory', 'Lower income/taxes in rising prices'],
        category: 'Inventory',
        blueprintArea: 'CMA1-A',
      },
      {
        id: 'cma1a-009',
        name: 'Weighted Average Inventory Cost',
        formula: 'Weighted Avg Cost = Total Cost of Goods Available / Total Units Available',
        variables: [],
        example: '($10,000 + $15,000) / (500 + 600) = $22.73 per unit',
        category: 'Inventory',
        blueprintArea: 'CMA1-A',
      },
      {
        id: 'cma1a-010',
        name: 'Lower of Cost or Net Realizable Value',
        formula: 'Inventory Value = MIN(Cost, NRV) where NRV = Selling Price − Costs to Complete − Selling Costs',
        variables: [
          { symbol: 'NRV', meaning: 'Net Realizable Value' },
        ],
        tips: ['Write down if NRV < Cost', 'GAAP uses LCNRV, not LCM anymore'],
        category: 'Inventory',
        blueprintArea: 'CMA1-A',
      },
    ],
  },

  // ==========================================
  // CMA1-B: PLANNING, BUDGETING, FORECASTING (20%)
  // ==========================================
  {
    id: 'cma1b-formulas',
    name: 'Planning, Budgeting, and Forecasting',
    blueprintArea: 'CMA1-B',
    weight: '20%',
    formulas: [
      {
        id: 'cma1b-001',
        name: 'Production Budget (Units)',
        formula: 'Required Production = Budgeted Sales + Desired Ending Inventory − Beginning Inventory',
        variables: [
          { symbol: 'Budgeted Sales', meaning: 'Expected unit sales for period' },
          { symbol: 'Desired Ending Inventory', meaning: 'Target inventory for period end' },
          { symbol: 'Beginning Inventory', meaning: 'Inventory on hand at period start' },
        ],
        example: '10,000 sales + 2,000 ending − 1,500 beginning = 10,500 units to produce',
        tips: ['Remember: Sales + Ending − Beginning', 'Ending inventory often a % of next period sales'],
        category: 'Operating Budgets',
        blueprintArea: 'CMA1-B',
      },
      {
        id: 'cma1b-002',
        name: 'Direct Materials Purchases Budget',
        formula: 'Purchases = Materials Needed for Production + Desired Ending Materials − Beginning Materials',
        variables: [
          { symbol: 'Materials Needed', meaning: 'Production units × materials per unit' },
        ],
        example: '10,500 units × 2 lbs + 3,000 lbs ending − 2,500 lbs beginning = 21,500 lbs to purchase',
        category: 'Operating Budgets',
        blueprintArea: 'CMA1-B',
      },
      {
        id: 'cma1b-003',
        name: 'Direct Labor Budget',
        formula: 'Direct Labor Cost = Production Units × DL Hours per Unit × DL Rate per Hour',
        variables: [
          { symbol: 'DL Hours per Unit', meaning: 'Standard labor hours required' },
          { symbol: 'DL Rate', meaning: 'Hourly wage rate including benefits' },
        ],
        example: '10,500 units × 0.5 hours × $20/hour = $105,000',
        category: 'Operating Budgets',
        blueprintArea: 'CMA1-B',
      },
      {
        id: 'cma1b-004',
        name: 'Manufacturing Overhead Budget',
        formula: 'Total MOH = Fixed Overhead + (Variable OH Rate × Activity Level)',
        variables: [
          { symbol: 'Activity Level', meaning: 'DL hours, machine hours, or units' },
        ],
        example: '$50,000 fixed + ($8 × 5,250 DL hours) = $92,000',
        category: 'Operating Budgets',
        blueprintArea: 'CMA1-B',
      },
      {
        id: 'cma1b-005',
        name: 'Cash Collections from Credit Sales',
        formula: 'Collections = (Current Month Sales × Current %) + (Prior Month Sales × Prior %)',
        variables: [
          { symbol: 'Current %', meaning: 'Percentage collected in month of sale' },
          { symbol: 'Prior %', meaning: 'Percentage collected in following month(s)' },
        ],
        example: 'If 60% collected in month of sale, 35% next month, 5% bad debt:\nMarch collections = (March sales × 60%) + (Feb sales × 35%)',
        tips: ['Track multiple periods for accurate cash flow', 'Account for bad debts'],
        category: 'Cash Budgeting',
        blueprintArea: 'CMA1-B',
      },
      {
        id: 'cma1b-006',
        name: 'Flexible Budget',
        formula: 'Flexible Budget = Fixed Costs + (Variable Cost per Unit × Actual Activity)',
        variables: [
          { symbol: 'Actual Activity', meaning: 'Actual units produced or sold' },
        ],
        example: '$100,000 fixed + ($15 × 8,000 actual units) = $220,000',
        tips: ['Adjusts for volume differences', 'Basis for variance analysis'],
        category: 'Flexible Budgeting',
        blueprintArea: 'CMA1-B',
      },
      {
        id: 'cma1b-007',
        name: 'Static Budget Variance',
        formula: 'Static Budget Variance = Actual Results − Static Budget',
        variables: [],
        tips: ['Unfavorable if actual costs > budget or actual revenue < budget', 'Combines volume and spending effects'],
        category: 'Variance Analysis',
        blueprintArea: 'CMA1-B',
      },
      {
        id: 'cma1b-008',
        name: 'Flexible Budget Variance',
        formula: 'Flexible Budget Variance = Actual Results − Flexible Budget',
        variables: [],
        tips: ['Isolates price/efficiency variances (removes volume effect)', 'Better for performance evaluation'],
        category: 'Variance Analysis',
        blueprintArea: 'CMA1-B',
      },
      {
        id: 'cma1b-009',
        name: 'Sales Volume Variance',
        formula: 'Sales Volume Variance = (Actual Units − Budgeted Units) × Budgeted CM per Unit',
        variables: [
          { symbol: 'CM per Unit', meaning: 'Contribution margin per unit' },
        ],
        example: '(9,500 − 10,000) × $25 = −$12,500 Unfavorable',
        category: 'Variance Analysis',
        blueprintArea: 'CMA1-B',
      },
      {
        id: 'cma1b-010',
        name: 'Learning Curve (Cumulative Average)',
        formula: 'Yn = Y₁ × nᵇ where b = log(learning rate) / log(2)',
        variables: [
          { symbol: 'Yn', meaning: 'Cumulative average time for n units' },
          { symbol: 'Y₁', meaning: 'Time for first unit' },
          { symbol: 'n', meaning: 'Cumulative number of units' },
          { symbol: 'b', meaning: 'Learning coefficient' },
        ],
        example: '80% learning curve: b = log(0.80)/log(2) = −0.322',
        tips: ['80% curve: each doubling reduces avg time to 80% of previous', 'Applies to labor-intensive operations'],
        category: 'Forecasting',
        blueprintArea: 'CMA1-B',
      },
    ],
  },

  // ==========================================
  // CMA1-C: PERFORMANCE MANAGEMENT (20%)
  // ==========================================
  {
    id: 'cma1c-formulas',
    name: 'Performance Management',
    blueprintArea: 'CMA1-C',
    weight: '20%',
    formulas: [
      {
        id: 'cma1c-001',
        name: 'Return on Investment (ROI)',
        formula: 'ROI = Operating Income / Average Operating Assets',
        variables: [
          { symbol: 'Operating Income', meaning: 'Income before interest and taxes' },
          { symbol: 'Average Operating Assets', meaning: 'Assets used in operations (avg of beginning + ending)' },
        ],
        example: '$450,000 / $3,000,000 = 15%',
        tips: ['Can decompose using DuPont formula', 'Higher is better, but may discourage good investments'],
        category: 'Financial Performance',
        blueprintArea: 'CMA1-C',
      },
      {
        id: 'cma1c-002',
        name: 'DuPont ROI Formula',
        formula: 'ROI = Profit Margin × Asset Turnover = (Operating Income / Sales) × (Sales / Avg Operating Assets)',
        variables: [
          { symbol: 'Profit Margin', meaning: 'Operating income as % of sales' },
          { symbol: 'Asset Turnover', meaning: 'Sales generated per dollar of assets' },
        ],
        example: '10% margin × 1.5 turnover = 15% ROI',
        tips: ['Shows two paths to improve ROI: margins or efficiency', 'Useful for comparing divisions'],
        category: 'Financial Performance',
        blueprintArea: 'CMA1-C',
      },
      {
        id: 'cma1c-003',
        name: 'Residual Income (RI)',
        formula: 'RI = Operating Income − (Required Rate of Return × Average Operating Assets)',
        variables: [
          { symbol: 'Required Rate', meaning: 'Minimum acceptable return (hurdle rate)' },
        ],
        example: '$500,000 − (10% × $4,000,000) = $500,000 − $400,000 = $100,000',
        tips: ['Positive RI = value creation', 'Avoids ROI\'s dysfunctional investment decisions'],
        category: 'Financial Performance',
        blueprintArea: 'CMA1-C',
      },
      {
        id: 'cma1c-004',
        name: 'Economic Value Added (EVA)',
        formula: 'EVA = NOPAT − (WACC × Total Capital)',
        variables: [
          { symbol: 'NOPAT', meaning: 'Net Operating Profit After Taxes' },
          { symbol: 'WACC', meaning: 'Weighted Average Cost of Capital' },
          { symbol: 'Total Capital', meaning: 'Debt + Equity invested' },
        ],
        example: '$800,000 − (12% × $5,000,000) = $200,000',
        tips: ['EVA is RI adjusted for accounting distortions', 'Stern Stewart trademark'],
        category: 'Financial Performance',
        blueprintArea: 'CMA1-C',
      },
      {
        id: 'cma1c-005',
        name: 'Transfer Price - General Rule',
        formula: 'Minimum TP = Variable Cost + Opportunity Cost per Unit',
        variables: [
          { symbol: 'Variable Cost', meaning: 'Incremental cost to produce' },
          { symbol: 'Opportunity Cost', meaning: 'Lost contribution from forgone external sales' },
        ],
        example: 'VC = $30, external CM = $20 → Minimum TP = $50\nWith excess capacity: TP = $30 (no opportunity cost)',
        tips: ['No excess capacity: TP = market price', 'With excess capacity: TP can be as low as VC'],
        category: 'Transfer Pricing',
        blueprintArea: 'CMA1-C',
      },
      {
        id: 'cma1c-006',
        name: 'Transfer Price Range',
        formula: 'Range: Selling Division Minimum to Buying Division Maximum',
        variables: [
          { symbol: 'Seller Min', meaning: 'VC + Opportunity Cost' },
          { symbol: 'Buyer Max', meaning: 'Lower of: Market Price or Value to Buyer' },
        ],
        tips: ['Transfer should occur if Seller Min < Buyer Max', 'Goal congruence when both divisions benefit'],
        category: 'Transfer Pricing',
        blueprintArea: 'CMA1-C',
      },
      {
        id: 'cma1c-007',
        name: 'Productivity Ratio',
        formula: 'Productivity = Outputs / Inputs',
        variables: [
          { symbol: 'Outputs', meaning: 'Units produced, revenue, or value added' },
          { symbol: 'Inputs', meaning: 'Labor hours, costs, or resources consumed' },
        ],
        example: '10,000 units / 2,000 labor hours = 5 units per hour',
        category: 'Operational Performance',
        blueprintArea: 'CMA1-C',
      },
      {
        id: 'cma1c-008',
        name: 'Manufacturing Cycle Efficiency',
        formula: 'MCE = Value-Added Time / Total Cycle Time',
        variables: [
          { symbol: 'Value-Added Time', meaning: 'Actual processing time' },
          { symbol: 'Total Cycle Time', meaning: 'Processing + Inspection + Move + Wait time' },
        ],
        example: '2 hours processing / (2+0.5+0.5+5) = 2/8 = 25%',
        tips: ['Goal: MCE approaching 100%', 'Non-value activities: inspection, moving, waiting'],
        category: 'Operational Performance',
        blueprintArea: 'CMA1-C',
      },
      {
        id: 'cma1c-009',
        name: 'Throughput Time',
        formula: 'Throughput Time = Process Time + Inspection Time + Move Time + Wait Time',
        variables: [],
        tips: ['Also called cycle time or lead time', 'Reduce by eliminating non-value-added activities'],
        category: 'Operational Performance',
        blueprintArea: 'CMA1-C',
      },
      {
        id: 'cma1c-010',
        name: 'Balanced Scorecard Perspectives',
        formula: 'N/A - Framework with 4 perspectives: Financial, Customer, Internal Process, Learning & Growth',
        variables: [],
        tips: ['Links strategy to operational metrics', 'Lead indicators predict lag indicators', 'Cause-and-effect relationships'],
        category: 'Strategic Performance',
        blueprintArea: 'CMA1-C',
      },
    ],
  },

  // ==========================================
  // CMA1-D: COST MANAGEMENT (15%)
  // ==========================================
  {
    id: 'cma1d-formulas',
    name: 'Cost Management',
    blueprintArea: 'CMA1-D',
    weight: '15%',
    formulas: [
      {
        id: 'cma1d-001',
        name: 'Contribution Margin per Unit',
        formula: 'CM per Unit = Selling Price − Variable Cost per Unit',
        variables: [],
        example: '$50 price − $30 VC = $20 CM per unit',
        category: 'CVP Analysis',
        blueprintArea: 'CMA1-D',
      },
      {
        id: 'cma1d-002',
        name: 'Contribution Margin Ratio',
        formula: 'CM Ratio = Contribution Margin / Sales = (Sales − Variable Costs) / Sales',
        variables: [],
        example: '$20 CM / $50 Price = 40%',
        tips: ['Can also calculate as 1 − Variable Cost Ratio'],
        category: 'CVP Analysis',
        blueprintArea: 'CMA1-D',
      },
      {
        id: 'cma1d-003',
        name: 'Breakeven Point in Units',
        formula: 'BE Units = Fixed Costs / Contribution Margin per Unit',
        variables: [
          { symbol: 'Fixed Costs', meaning: 'Total fixed costs for the period' },
        ],
        example: '$180,000 FC / $20 CM = 9,000 units',
        category: 'CVP Analysis',
        blueprintArea: 'CMA1-D',
      },
      {
        id: 'cma1d-004',
        name: 'Breakeven Point in Dollars',
        formula: 'BE Dollars = Fixed Costs / Contribution Margin Ratio',
        variables: [],
        example: '$180,000 FC / 40% = $450,000',
        category: 'CVP Analysis',
        blueprintArea: 'CMA1-D',
      },
      {
        id: 'cma1d-005',
        name: 'Target Profit - Units',
        formula: 'Units for Target Profit = (Fixed Costs + Target Profit) / CM per Unit',
        variables: [],
        example: '($180,000 + $60,000) / $20 = 12,000 units',
        category: 'CVP Analysis',
        blueprintArea: 'CMA1-D',
      },
      {
        id: 'cma1d-006',
        name: 'Target After-Tax Profit',
        formula: 'Pre-Tax Profit Needed = After-Tax Profit / (1 − Tax Rate)',
        variables: [],
        example: 'Need $75,000 after-tax, 25% rate: $75,000 / 0.75 = $100,000 pre-tax',
        category: 'CVP Analysis',
        blueprintArea: 'CMA1-D',
      },
      {
        id: 'cma1d-007',
        name: 'Margin of Safety',
        formula: 'Margin of Safety = Current Sales − Breakeven Sales\nMOS Ratio = MOS / Current Sales',
        variables: [],
        example: '$500,000 − $400,000 = $100,000 MOS = 20%',
        tips: ['Higher MOS = lower risk', 'Buffer before incurring losses'],
        category: 'CVP Analysis',
        blueprintArea: 'CMA1-D',
      },
      {
        id: 'cma1d-008',
        name: 'Degree of Operating Leverage',
        formula: 'DOL = Contribution Margin / Operating Income',
        variables: [],
        example: '$300,000 CM / $100,000 OI = 3.0',
        tips: ['If DOL = 3, 10% sales change → 30% OI change', 'Higher fixed costs → higher DOL'],
        category: 'CVP Analysis',
        blueprintArea: 'CMA1-D',
      },
      {
        id: 'cma1d-009',
        name: 'Multi-Product Breakeven',
        formula: 'Weighted Avg CM = Σ(CM per product × Sales Mix %)\nBE Units = FC / Weighted Avg CM',
        variables: [],
        example: 'Product A: CM $40 (60%), Product B: CM $20 (40%)\nWtd CM = $40(.6) + $20(.4) = $32',
        category: 'CVP Analysis',
        blueprintArea: 'CMA1-D',
      },
      {
        id: 'cma1d-010',
        name: 'Predetermined Overhead Rate',
        formula: 'POHR = Estimated Total Overhead / Estimated Activity Base',
        variables: [
          { symbol: 'Activity Base', meaning: 'DL hours, machine hours, DL cost, etc.' },
        ],
        example: '$600,000 Est OH / 40,000 Est MH = $15 per MH',
        category: 'Overhead Allocation',
        blueprintArea: 'CMA1-D',
      },
      {
        id: 'cma1d-011',
        name: 'Applied Overhead',
        formula: 'Applied OH = POHR × Actual Activity',
        variables: [],
        example: '$15/MH × 38,000 actual MH = $570,000 applied',
        category: 'Overhead Allocation',
        blueprintArea: 'CMA1-D',
      },
      {
        id: 'cma1d-012',
        name: 'Over/Underapplied Overhead',
        formula: 'Variance = Applied OH − Actual OH\nPositive = Overapplied, Negative = Underapplied',
        variables: [],
        example: '$570,000 applied − $560,000 actual = $10,000 overapplied',
        tips: ['Overapplied: credit to COGS (reduces expense)', 'Underapplied: debit to COGS (increases expense)'],
        category: 'Overhead Allocation',
        blueprintArea: 'CMA1-D',
      },
      {
        id: 'cma1d-013',
        name: 'Direct Materials Price Variance',
        formula: 'MPV = (Actual Price − Standard Price) × Actual Quantity Purchased',
        variables: [
          { symbol: 'AP', meaning: 'Actual price per unit' },
          { symbol: 'SP', meaning: 'Standard price per unit' },
          { symbol: 'AQ', meaning: 'Actual quantity purchased' },
        ],
        example: '($5.20 − $5.00) × 10,000 = $2,000 Unfavorable',
        tips: ['U if AP > SP', 'Calculate at time of purchase'],
        category: 'Standard Costing',
        blueprintArea: 'CMA1-D',
      },
      {
        id: 'cma1d-014',
        name: 'Direct Materials Quantity Variance',
        formula: 'MQV = (Actual Qty Used − Standard Qty Allowed) × Standard Price',
        variables: [
          { symbol: 'SQ Allowed', meaning: 'Standard qty per unit × Actual production' },
        ],
        example: '(9,800 − 10,000) × $5.00 = −$1,000 = $1,000 Favorable',
        tips: ['U if used more than standard', 'Use standard price to isolate quantity effect'],
        category: 'Standard Costing',
        blueprintArea: 'CMA1-D',
      },
      {
        id: 'cma1d-015',
        name: 'Direct Labor Rate Variance',
        formula: 'LRV = (Actual Rate − Standard Rate) × Actual Hours',
        variables: [],
        example: '($16 − $15) × 5,000 hrs = $5,000 Unfavorable',
        category: 'Standard Costing',
        blueprintArea: 'CMA1-D',
      },
      {
        id: 'cma1d-016',
        name: 'Direct Labor Efficiency Variance',
        formula: 'LEV = (Actual Hours − Standard Hours Allowed) × Standard Rate',
        variables: [
          { symbol: 'SH Allowed', meaning: 'Standard hours per unit × Actual production' },
        ],
        example: '(5,000 − 5,200) × $15 = −$3,000 = $3,000 Favorable',
        category: 'Standard Costing',
        blueprintArea: 'CMA1-D',
      },
      {
        id: 'cma1d-017',
        name: 'Variable Overhead Efficiency Variance',
        formula: 'VOH Efficiency = (Actual Hours − Standard Hours) × Standard VOH Rate',
        variables: [],
        tips: ['Same formula as labor efficiency, using VOH rate'],
        category: 'Standard Costing',
        blueprintArea: 'CMA1-D',
      },
      {
        id: 'cma1d-018',
        name: 'Fixed Overhead Volume Variance',
        formula: 'FOH Volume = (Standard Hours Allowed − Budgeted Hours) × Standard FOH Rate',
        variables: [],
        tips: ['Due to producing more/less than denominator level', 'U if below normal capacity'],
        category: 'Standard Costing',
        blueprintArea: 'CMA1-D',
      },
      {
        id: 'cma1d-019',
        name: 'Activity-Based Costing Rate',
        formula: 'Activity Rate = Activity Cost Pool / Cost Driver Quantity',
        variables: [
          { symbol: 'Cost Driver', meaning: 'Measure of activity (setups, inspections, orders)' },
        ],
        example: 'Setup costs $90,000 / 300 setups = $300 per setup',
        category: 'ABC',
        blueprintArea: 'CMA1-D',
      },
      {
        id: 'cma1d-020',
        name: 'Joint Cost Allocation - Sales Value at Split-Off',
        formula: 'Allocation = (Product Sales Value / Total Sales Value at Split-Off) × Joint Costs',
        variables: [],
        example: 'Product X: $40,000 / $130,000 total × $80,000 joint costs = $24,615',
        category: 'Joint Products',
        blueprintArea: 'CMA1-D',
      },
    ],
  },

  // ==========================================
  // CMA1-E: INTERNAL CONTROLS (15%)
  // ==========================================
  {
    id: 'cma1e-formulas',
    name: 'Internal Controls',
    blueprintArea: 'CMA1-E',
    weight: '15%',
    formulas: [
      {
        id: 'cma1e-001',
        name: 'COSO Framework Components',
        formula: 'N/A - 5 Components: Control Environment, Risk Assessment, Control Activities, Information & Communication, Monitoring',
        variables: [],
        tips: ['Control Environment is the foundation', 'All components must be present and functioning'],
        category: 'COSO Framework',
        blueprintArea: 'CMA1-E',
      },
      {
        id: 'cma1e-002',
        name: 'COSO ERM Components',
        formula: 'N/A - 5 Components: Governance & Culture, Strategy & Objective-Setting, Performance, Review & Revision, Information, Communication & Reporting',
        variables: [],
        tips: ['2017 update to original COSO ERM', 'Integrates with strategy and performance'],
        category: 'ERM',
        blueprintArea: 'CMA1-E',
      },
      {
        id: 'cma1e-003',
        name: 'Risk Assessment Formula',
        formula: 'Risk Exposure = Probability of Event × Impact/Magnitude',
        variables: [],
        example: '20% probability × $500,000 impact = $100,000 expected loss',
        category: 'Risk Management',
        blueprintArea: 'CMA1-E',
      },
      {
        id: 'cma1e-004',
        name: 'Segregation of Duties',
        formula: 'N/A - Separate: Authorization, Custody, Record-keeping, Reconciliation',
        variables: [],
        tips: ['No person should control 2+ of these functions', 'Key preventive control'],
        category: 'Control Activities',
        blueprintArea: 'CMA1-E',
      },
      {
        id: 'cma1e-005',
        name: 'Three Lines of Defense',
        formula: 'N/A - 1st Line: Operational Management, 2nd Line: Risk/Compliance, 3rd Line: Internal Audit',
        variables: [],
        tips: ['1st line owns and manages risks', '2nd line monitors and advises', '3rd line provides independent assurance'],
        category: 'Governance',
        blueprintArea: 'CMA1-E',
      },
    ],
  },

  // ==========================================
  // CMA1-F: TECHNOLOGY AND ANALYTICS (15%)
  // ==========================================
  {
    id: 'cma1f-formulas',
    name: 'Technology and Analytics',
    blueprintArea: 'CMA1-F',
    weight: '15%',
    formulas: [
      {
        id: 'cma1f-001',
        name: 'Economic Order Quantity (EOQ)',
        formula: 'EOQ = √(2DS / H)',
        variables: [
          { symbol: 'D', meaning: 'Annual demand in units' },
          { symbol: 'S', meaning: 'Ordering/setup cost per order' },
          { symbol: 'H', meaning: 'Holding/carrying cost per unit per year' },
        ],
        example: '√(2 × 10,000 × $50 / $2) = √500,000 = 707 units',
        tips: ['At EOQ, annual ordering cost = annual holding cost', 'Total cost is minimized'],
        category: 'Inventory Management',
        blueprintArea: 'CMA1-F',
      },
      {
        id: 'cma1f-002',
        name: 'Reorder Point',
        formula: 'ROP = (Daily Usage × Lead Time) + Safety Stock',
        variables: [
          { symbol: 'Lead Time', meaning: 'Days from order to receipt' },
          { symbol: 'Safety Stock', meaning: 'Buffer for demand/supply variability' },
        ],
        example: '(100 units/day × 5 days) + 200 = 700 units',
        category: 'Inventory Management',
        blueprintArea: 'CMA1-F',
      },
      {
        id: 'cma1f-003',
        name: 'Safety Stock Calculation',
        formula: 'Safety Stock = Z × σ × √Lead Time',
        variables: [
          { symbol: 'Z', meaning: 'Service level z-score (e.g., 1.65 for 95%)' },
          { symbol: 'σ', meaning: 'Standard deviation of daily demand' },
        ],
        category: 'Inventory Management',
        blueprintArea: 'CMA1-F',
      },
      {
        id: 'cma1f-004',
        name: 'Total Annual Inventory Costs',
        formula: 'Total Cost = (D/Q × S) + (Q/2 × H)',
        variables: [
          { symbol: 'D/Q', meaning: 'Number of orders per year' },
          { symbol: 'Q/2', meaning: 'Average inventory' },
        ],
        example: '(10,000/707 × $50) + (707/2 × $2) = $707 + $707 = $1,414',
        tips: ['At EOQ these two terms are equal'],
        category: 'Inventory Management',
        blueprintArea: 'CMA1-F',
      },
      {
        id: 'cma1f-005',
        name: 'Regression Equation',
        formula: 'Y = a + bX',
        variables: [
          { symbol: 'Y', meaning: 'Dependent variable (predicted value)' },
          { symbol: 'a', meaning: 'Y-intercept (fixed component)' },
          { symbol: 'b', meaning: 'Slope (variable rate per unit of X)' },
          { symbol: 'X', meaning: 'Independent variable (activity level)' },
        ],
        example: 'Costs = $10,000 + $5 × Machine Hours',
        tips: ['a = fixed costs, b = variable cost rate', 'Used in high-low method and regression'],
        category: 'Data Analytics',
        blueprintArea: 'CMA1-F',
      },
      {
        id: 'cma1f-006',
        name: 'High-Low Method',
        formula: 'Variable Rate = (Highest Cost − Lowest Cost) / (Highest Activity − Lowest Activity)',
        variables: [],
        example: '($50,000 − $30,000) / (8,000 − 3,000) = $4 per unit',
        tips: ['Simple but uses only 2 data points', 'Less accurate than regression'],
        category: 'Data Analytics',
        blueprintArea: 'CMA1-F',
      },
      {
        id: 'cma1f-007',
        name: 'Coefficient of Determination',
        formula: 'R² = Explained Variation / Total Variation',
        variables: [],
        example: 'R² = 0.85 means model explains 85% of Y variability',
        tips: ['Range: 0 to 1', 'Higher R² = better fit'],
        category: 'Data Analytics',
        blueprintArea: 'CMA1-F',
      },
      {
        id: 'cma1f-008',
        name: 'Correlation Coefficient',
        formula: 'r = √R² (with sign of slope)',
        variables: [],
        example: 'R² = 0.81, positive slope → r = +0.90',
        tips: ['Range: −1 to +1', 'Sign indicates direction of relationship'],
        category: 'Data Analytics',
        blueprintArea: 'CMA1-F',
      },
      {
        id: 'cma1f-009',
        name: 'Expected Value',
        formula: 'EV = Σ(Probability × Outcome)',
        variables: [],
        example: '(0.3 × $100,000) + (0.5 × $60,000) + (0.2 × −$20,000) = $56,000',
        category: 'Decision Analysis',
        blueprintArea: 'CMA1-F',
      },
      {
        id: 'cma1f-010',
        name: 'Standard Deviation',
        formula: 'σ = √[Σ(Probability × (Outcome − Expected Value)²)]',
        variables: [],
        tips: ['Measures dispersion/risk', 'Higher σ = more variability'],
        category: 'Decision Analysis',
        blueprintArea: 'CMA1-F',
      },
      {
        id: 'cma1f-011',
        name: 'Coefficient of Variation',
        formula: 'CV = Standard Deviation / Expected Value',
        variables: [],
        example: 'σ = $15,000, EV = $100,000 → CV = 0.15 (15%)',
        tips: ['Allows comparison of relative risk', 'Lower CV = less relative risk'],
        category: 'Decision Analysis',
        blueprintArea: 'CMA1-F',
      },
    ],
  },
];

// ==========================================
// QUICK REFERENCE SUMMARY
// ==========================================

export const CMA1_QUICK_REFERENCE = {
  title: 'CMA Part 1 Quick Reference',
  keyFormulas: [
    'Breakeven = Fixed Costs / CM per unit',
    'ROI = Operating Income / Average Operating Assets',
    'RI = Operating Income − (Required Rate × Assets)',
    'EOQ = √(2DS/H)',
    'MPV = (AP − SP) × AQ',
    'DOL = CM / Operating Income',
  ],
  mnemonics: [
    { topic: 'Production Budget', mnemonic: 'SEBA: Sales + Ending − Beginning = Amount to produce' },
    { topic: 'Variance Direction', mnemonic: 'If Actual > Standard for costs = Unfavorable' },
    { topic: 'COSO Components', mnemonic: 'Can Risk Control Information Monitoring' },
    { topic: 'Balanced Scorecard', mnemonic: 'FCIL: Financial, Customer, Internal, Learning' },
  ],
};

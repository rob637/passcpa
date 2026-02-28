/**
 * CPA Flashcards - BAR Section (Business Analysis and Reporting)
 * World-Class Sprint Expansion
 * 
 * Covers: Financial Statement Analysis, Managerial Accounting, Corporate Finance
 */

import { Flashcard } from './types';

export const BAR_FLASHCARDS: Flashcard[] = [
  // ==========================================
  // FINANCIAL STATEMENT ANALYSIS
  // ==========================================
  {
    id: 'bar-fc-001',
    section: 'BAR',
    type: 'formula',
    topic: 'Ratio Analysis',
    blueprintArea: 'BAR-I',
    front: 'What is the CURRENT RATIO formula?',
    back: `**Current Ratio = Current Assets ÷ Current Liabilities**

Measures: Short-term liquidity
Interpretation:
• >1.0 = Can cover short-term obligations
• <1.0 = Potential liquidity concerns
• Very high = Inefficient use of assets

Industry benchmarks vary; compare to peers`,
    formula: 'Current Ratio = Current Assets / Current Liabilities',
    example: 'CA $500K, CL $250K: Current Ratio = 2.0 (good liquidity)',
    difficulty: 'easy',
    tags: ['ratio', 'liquidity', 'current ratio'],
    reference: 'Financial Statement Analysis',
  },
  {
    id: 'bar-fc-002',
    section: 'BAR',
    type: 'formula',
    topic: 'Ratio Analysis',
    blueprintArea: 'BAR-I',
    front: 'What is the QUICK RATIO (Acid Test) formula?',
    back: `**Quick Ratio = (Current Assets - Inventory) ÷ Current Liabilities**

OR: (Cash + Marketable Securities + Receivables) / Current Liabilities

Measures: Immediate liquidity without selling inventory
More conservative than current ratio
Target: Generally >1.0`,
    formula: 'Quick Ratio = (CA - Inventory) / CL',
    example: 'CA $500K, Inventory $200K, CL $250K: Quick Ratio = 1.2',
    difficulty: 'easy',
    tags: ['ratio', 'liquidity', 'quick ratio'],
    reference: 'Financial Statement Analysis',
  },
  {
    id: 'bar-fc-003',
    section: 'BAR',
    type: 'formula',
    topic: 'Ratio Analysis',
    blueprintArea: 'BAR-I',
    front: 'What is the DEBT-TO-EQUITY ratio?',
    back: `**Debt-to-Equity = Total Liabilities ÷ Total Stockholders' Equity**

Measures: Financial leverage
Interpretation:
• >1.0 = More debt than equity (higher risk)
• <1.0 = More equity than debt (lower risk)
• Varies by industry (capital-intensive = higher)`,
    formula: 'D/E = Total Liabilities / Total Equity',
    example: 'Liabilities $600K, Equity $400K: D/E = 1.5 (levered)',
    difficulty: 'easy',
    tags: ['ratio', 'leverage', 'solvency'],
    reference: 'Financial Statement Analysis',
  },
  {
    id: 'bar-fc-004',
    section: 'BAR',
    type: 'formula',
    topic: 'Ratio Analysis',
    blueprintArea: 'BAR-I',
    front: 'What is RETURN ON EQUITY (ROE)?',
    back: `**ROE = Net Income ÷ Average Stockholders' Equity**

Measures: Return generated on shareholder investment
Higher is better (compare to cost of equity)

**DuPont Analysis (3-factor):**
ROE = Profit Margin × Asset Turnover × Equity Multiplier
ROE = (NI/Sales) × (Sales/Assets) × (Assets/Equity)`,
    formula: 'ROE = Net Income / Average Equity',
    example: 'NI $50K, Avg Equity $250K: ROE = 20%',
    difficulty: 'medium',
    tags: ['ROE', 'profitability', 'DuPont'],
    reference: 'Financial Statement Analysis',
  },
  {
    id: 'bar-fc-005',
    section: 'BAR',
    type: 'formula',
    topic: 'Ratio Analysis',
    blueprintArea: 'BAR-I',
    front: 'What is INVENTORY TURNOVER?',
    back: `**Inventory Turnover = Cost of Goods Sold ÷ Average Inventory**

Measures: How many times inventory is sold/replaced per year

**Days in Inventory = 365 ÷ Inventory Turnover**

Higher turnover = efficient inventory management
Too high = stockouts; Too low = excess inventory`,
    formula: 'Inventory Turnover = COGS / Avg Inventory',
    example: 'COGS $1M, Avg Inv $200K: Turnover = 5x (73 days)',
    difficulty: 'easy',
    tags: ['ratio', 'efficiency', 'inventory'],
    reference: 'Financial Statement Analysis',
  },
  {
    id: 'bar-fc-006',
    section: 'BAR',
    type: 'formula',
    topic: 'Ratio Analysis',
    blueprintArea: 'BAR-I',
    front: 'What is TIMES INTEREST EARNED (TIE)?',
    back: `**TIE = EBIT ÷ Interest Expense**

Measures: Ability to cover interest payments
EBIT = Earnings Before Interest and Taxes

Interpretation:
• >3.0 = Generally comfortable
• <1.5 = Potential difficulty meeting interest
• Higher = More cushion for creditors`,
    formula: 'TIE = EBIT / Interest Expense',
    example: 'EBIT $150K, Interest $30K: TIE = 5.0x',
    difficulty: 'medium',
    tags: ['ratio', 'solvency', 'interest coverage'],
    reference: 'Financial Statement Analysis',
  },
  // ==========================================
  // MANAGERIAL ACCOUNTING
  // ==========================================
  {
    id: 'bar-fc-007',
    section: 'BAR',
    type: 'formula',
    topic: 'Cost-Volume-Profit',
    blueprintArea: 'BAR-II',
    front: 'What is the BREAK-EVEN POINT formula?',
    back: `**Break-Even in Units:**
BEP = Fixed Costs ÷ Contribution Margin per Unit

**Break-Even in Dollars:**
BEP = Fixed Costs ÷ Contribution Margin Ratio

**Key Terms:**
• CM per unit = Price - Variable Cost per unit
• CM Ratio = CM per unit / Price`,
    formula: 'BEP Units = FC / (Price - VC per unit)',
    example: 'FC $100K, Price $50, VC $30: BEP = $100K / $20 = 5,000 units',
    difficulty: 'medium',
    tags: ['CVP', 'break-even', 'contribution margin'],
    reference: 'Managerial Accounting',
  },
  {
    id: 'bar-fc-008',
    section: 'BAR',
    type: 'formula',
    topic: 'Cost-Volume-Profit',
    blueprintArea: 'BAR-II',
    front: 'How do you calculate TARGET PROFIT sales?',
    back: `**Target Profit Units:**
Units = (Fixed Costs + Target Profit) ÷ CM per Unit

**Target Profit Dollars:**
Sales = (Fixed Costs + Target Profit) ÷ CM Ratio

Add target profit to fixed costs, then divide by CM`,
    formula: 'Target Units = (FC + Target Profit) / CM per unit',
    example: 'FC $100K, Target $50K, CM $20: Units = $150K / $20 = 7,500 units',
    difficulty: 'medium',
    tags: ['CVP', 'target profit', 'planning'],
    reference: 'Managerial Accounting',
  },
  {
    id: 'bar-fc-009',
    section: 'BAR',
    type: 'definition',
    topic: 'Costing Methods',
    blueprintArea: 'BAR-II',
    front: 'Compare VARIABLE COSTING vs. ABSORPTION COSTING',
    back: `**Variable (Direct) Costing:**
Product Cost = DM + DL + Variable MOH
Fixed MOH → Period expense
Used for internal decisions
NOT GAAP

**Absorption (Full) Costing:**
Product Cost = DM + DL + Variable MOH + Fixed MOH
All MOH included in inventory
Required for GAAP/external reporting

**Income Difference:**
When production > sales: Absorption > Variable income
When production < sales: Absorption < Variable income`,
    comparison: {
      itemA: 'Variable Costing',
      itemB: 'Absorption Costing',
      differences: ['Fixed MOH expensed vs capitalized', 'Internal vs external reporting', 'Not GAAP vs GAAP required']
    },
    difficulty: 'hard',
    tags: ['variable costing', 'absorption', 'GAAP'],
    reference: 'ASC 330',
  },
  {
    id: 'bar-fc-010',
    section: 'BAR',
    type: 'formula',
    topic: 'Variance Analysis',
    blueprintArea: 'BAR-II',
    front: 'What are the DIRECT MATERIALS variances?',
    back: `**Materials Price Variance:**
MPV = (AP - SP) × AQ Purchased
Actual Price vs Standard Price

**Materials Quantity Variance:**
MQV = (AQ used - SQ) × SP
Actual Quantity vs Standard Quantity

**Favorable:** Actual < Standard
**Unfavorable:** Actual > Standard`,
    formula: 'MPV = (AP - SP) × AQ; MQV = (AQ - SQ) × SP',
    example: 'SP $5, AP $5.50, AQ 1,000, SQ 950: MPV = $500 U, MQV = $250 U',
    difficulty: 'hard',
    tags: ['variance', 'materials', 'standard costing'],
    reference: 'Managerial Accounting',
  },
  {
    id: 'bar-fc-011',
    section: 'BAR',
    type: 'formula',
    topic: 'Variance Analysis',
    blueprintArea: 'BAR-II',
    front: 'What are the DIRECT LABOR variances?',
    back: `**Labor Rate Variance:**
LRV = (AR - SR) × AH
Actual Rate vs Standard Rate

**Labor Efficiency Variance:**
LEV = (AH - SH) × SR
Actual Hours vs Standard Hours

**Favorable:** Actual < Standard
**Unfavorable:** Actual > Standard`,
    formula: 'LRV = (AR - SR) × AH; LEV = (AH - SH) × SR',
    example: 'SR $20, AR $22, AH 500, SH 480: LRV = $1,000 U, LEV = $400 U',
    difficulty: 'hard',
    tags: ['variance', 'labor', 'standard costing'],
    reference: 'Managerial Accounting',
  },
  {
    id: 'bar-fc-012',
    section: 'BAR',
    type: 'concept',
    topic: 'Decision Making',
    blueprintArea: 'BAR-II',
    front: 'What is RELEVANT COST analysis?',
    back: `**Relevant Costs:**
Costs that DIFFER between alternatives

**Include:**
• Future costs
• Differential/incremental costs
• Avoidable costs
• Opportunity costs

**EXCLUDE (Irrelevant):**
• Sunk costs (already incurred)
• Committed costs
• Costs that don't change between options

Common Decisions: Make or buy, special orders, segment elimination`,
    difficulty: 'medium',
    tags: ['relevant cost', 'decision making', 'incremental'],
    reference: 'Managerial Accounting',
  },
  // ==========================================
  // CORPORATE FINANCE
  // ==========================================
  {
    id: 'bar-fc-013',
    section: 'BAR',
    type: 'formula',
    topic: 'Time Value of Money',
    blueprintArea: 'BAR-III',
    front: 'What is the PRESENT VALUE formula?',
    back: `**Present Value of Single Sum:**
PV = FV ÷ (1 + r)^n

**Present Value of Annuity:**
PV = PMT × [(1 - (1 + r)^-n) ÷ r]

**Key Concept:**
Money today > money tomorrow (opportunity cost)
Higher discount rate = lower PV`,
    formula: 'PV = FV / (1 + r)^n',
    example: '$10,000 in 5 years at 8%: PV = $10,000 / 1.469 = $6,806',
    difficulty: 'medium',
    tags: ['TVM', 'present value', 'discounting'],
    reference: 'Corporate Finance',
  },
  {
    id: 'bar-fc-014',
    section: 'BAR',
    type: 'formula',
    topic: 'Capital Budgeting',
    blueprintArea: 'BAR-III',
    front: 'What is NET PRESENT VALUE (NPV)?',
    back: `**NPV = Σ [Cash Flow ÷ (1+r)^t] - Initial Investment**

**Decision Rules:**
• NPV > 0 → Accept (adds value)
• NPV < 0 → Reject (destroys value)
• NPV = 0 → Indifferent (meets hurdle rate exactly)

Higher NPV = better project
Can compare mutually exclusive projects by NPV`,
    formula: 'NPV = Σ PV of Cash Flows - Initial Investment',
    example: 'Invest $100K, CF $30K/year for 5 years at 10%: NPV = $113,724 - $100K = $13,724 (Accept)',
    difficulty: 'medium',
    tags: ['NPV', 'capital budgeting', 'investment'],
    reference: 'Corporate Finance',
  },
  {
    id: 'bar-fc-015',
    section: 'BAR',
    type: 'formula',
    topic: 'Capital Budgeting',
    blueprintArea: 'BAR-III',
    front: 'What is INTERNAL RATE OF RETURN (IRR)?',
    back: `**IRR = Discount rate where NPV = 0**

**Decision Rules:**
• IRR > Required Return → Accept
• IRR < Required Return → Reject

**Calculation:** Trial and error or financial calculator
Set NPV = 0, solve for r

**Limitations:**
• Multiple IRRs with non-conventional cash flows
• Reinvestment assumption (reinvest at IRR)
• Cannot compare mutually exclusive projects of different sizes`,
    formula: '0 = Σ [CF_t / (1 + IRR)^t] - Initial Investment',
    example: 'Invest $100K, returns $150K in 3 years: IRR ≈ 14.5%',
    difficulty: 'hard',
    tags: ['IRR', 'capital budgeting', 'return'],
    reference: 'Corporate Finance',
  },
  {
    id: 'bar-fc-016',
    section: 'BAR',
    type: 'formula',
    topic: 'Capital Budgeting',
    blueprintArea: 'BAR-III',
    front: 'What is the PAYBACK PERIOD?',
    back: `**Payback Period = Time to recover initial investment**

**Simple Payback:**
= Initial Investment ÷ Annual Cash Flow (if equal CFs)

**Uneven Cash Flows:**
Count years until cumulative CF = Investment

**Limitations:**
• Ignores time value of money
• Ignores cash flows after payback
• Bias toward short-term projects

**Discounted Payback:** Uses PV of cash flows`,
    formula: 'Payback = Investment / Annual CF',
    example: 'Invest $100K, CF $25K/year: Payback = 4 years',
    difficulty: 'easy',
    tags: ['payback', 'capital budgeting', 'liquidity'],
    reference: 'Corporate Finance',
  },
  {
    id: 'bar-fc-017',
    section: 'BAR',
    type: 'formula',
    topic: 'Cost of Capital',
    blueprintArea: 'BAR-III',
    front: 'What is WEIGHTED AVERAGE COST OF CAPITAL (WACC)?',
    back: `**WACC = (E/V × Re) + (D/V × Rd × (1-T))**

Where:
• E = Market value of equity
• D = Market value of debt
• V = E + D (total value)
• Re = Cost of equity
• Rd = Cost of debt
• T = Tax rate

Interest is tax-deductible, so after-tax cost of debt used`,
    formula: 'WACC = (E/V × Re) + (D/V × Rd × (1-T))',
    example: '60% equity at 12%, 40% debt at 6%, 25% tax: WACC = (0.6 × 12%) + (0.4 × 6% × 0.75) = 9%',
    difficulty: 'hard',
    tags: ['WACC', 'cost of capital', 'capital structure'],
    reference: 'Corporate Finance',
  },
  {
    id: 'bar-fc-018',
    section: 'BAR',
    type: 'formula',
    topic: 'Cost of Capital',
    blueprintArea: 'BAR-III',
    front: 'What is the CAPM formula for cost of equity?',
    back: `**CAPM: Re = Rf + β(Rm - Rf)**

Where:
• Re = Required return on equity
• Rf = Risk-free rate (T-bill rate)
• β = Beta (systematic risk measure)
• Rm = Expected market return
• (Rm - Rf) = Market risk premium

**Beta:**
• β = 1: Average market risk
• β > 1: More volatile than market
• β < 1: Less volatile than market`,
    formula: 'Re = Rf + β(Rm - Rf)',
    example: 'Rf 3%, β 1.2, Rm 10%: Re = 3% + 1.2(10% - 3%) = 11.4%',
    difficulty: 'medium',
    tags: ['CAPM', 'beta', 'cost of equity'],
    reference: 'Corporate Finance',
  },
  // ==========================================
  // PROSPECTIVE FINANCIAL STATEMENTS
  // ==========================================
  {
    id: 'bar-fc-019',
    section: 'BAR',
    type: 'comparison',
    topic: 'Financial Projections',
    blueprintArea: 'BAR-III',
    front: 'Compare FINANCIAL FORECAST vs. FINANCIAL PROJECTION',
    back: `**Financial Forecast:**
• Based on expected conditions
• "Most likely" scenario
• Reasonable to achieve
• Can be general distribution

**Financial Projection:**
• Based on hypothetical assumptions
• "What if" scenarios
• May not be expected to occur
• Limited distribution (specific users only)

Both require CPA attestation if issued to third parties`,
    comparison: {
      itemA: 'Forecast',
      itemB: 'Projection',
      differences: ['Expected conditions vs hypothetical', 'Most likely vs what-if', 'General vs limited distribution']
    },
    difficulty: 'medium',
    tags: ['forecast', 'projection', 'prospective'],
    reference: 'AT-C 305',
  },
  {
    id: 'bar-fc-020',
    section: 'BAR',
    type: 'concept',
    topic: 'Budgeting',
    blueprintArea: 'BAR-III',
    front: 'What is a MASTER BUDGET?',
    back: `**Master Budget Components:**

**Operating Budgets:**
1. Sales budget (starting point)
2. Production budget
3. Direct materials budget
4. Direct labor budget
5. Manufacturing overhead budget
6. Selling & admin budget
7. Cost of goods sold budget

**Financial Budgets:**
• Cash budget
• Budgeted income statement
• Budgeted balance sheet
• Capital expenditure budget

Sales forecast drives all other budgets`,
    difficulty: 'medium',
    tags: ['master budget', 'planning', 'budgeting'],
    reference: 'Managerial Accounting',
  },
  {
    id: 'bar-fc-021',
    section: 'BAR',
    type: 'definition',
    topic: 'Budgeting',
    blueprintArea: 'BAR-III',
    front: 'What is FLEXIBLE BUDGETING?',
    back: `**Flexible Budget:**
Adjusts budgeted amounts for actual activity level

**Formula:**
Flexible Budget = (Variable Cost per Unit × Actual Units) + Fixed Costs

**Advantages:**
• Better performance evaluation
• Separates volume variance from other variances
• More meaningful comparisons

**Static Budget:** Based on one planned activity level (doesn't flex)`,
    example: 'VC $10/unit, FC $50K. Actual 6,000 units: Flex Budget = $60K + $50K = $110K',
    difficulty: 'medium',
    tags: ['flexible budget', 'variance', 'planning'],
    reference: 'Managerial Accounting',
  },
  {
    id: 'bar-fc-022',
    section: 'BAR',
    type: 'formula',
    topic: 'Working Capital',
    blueprintArea: 'BAR-III',
    front: 'What is the CASH CONVERSION CYCLE?',
    back: `**Cash Conversion Cycle = DIO + DSO - DPO**

Where:
• DIO = Days Inventory Outstanding (365 / Inv Turnover)
• DSO = Days Sales Outstanding (365 / AR Turnover)
• DPO = Days Payables Outstanding (365 / AP Turnover)

**Interpretation:**
• Days from cash outflow (inventory purchase) to cash inflow (collection)
• Shorter cycle = less working capital needed
• Negative = receiving cash before paying suppliers`,
    formula: 'CCC = DIO + DSO - DPO',
    example: 'DIO 45, DSO 30, DPO 35: CCC = 40 days',
    difficulty: 'hard',
    tags: ['working capital', 'cash cycle', 'efficiency'],
    reference: 'Financial Management',
  },
  // ==========================================
  // ADDITIONAL BAR FLASHCARDS
  // ==========================================
  {
    id: 'bar-fc-023',
    section: 'BAR',
    type: 'formula',
    topic: 'Ratio Analysis',
    blueprintArea: 'BAR-I',
    front: 'What is RETURN ON ASSETS (ROA)?',
    back: `**ROA = Net Income ÷ Average Total Assets**

Alternative: ROA = Net Income + Interest(1-T) / Avg Assets
(adds back after-tax interest since assets financed by debt too)

**DuPont:**
ROA = Profit Margin × Asset Turnover
ROA = (NI / Sales) × (Sales / Assets)

Higher ROA = more efficient use of assets`,
    formula: 'ROA = Net Income / Average Total Assets',
    example: 'NI $100K, Avg Assets $1M: ROA = 10%',
    difficulty: 'easy',
    tags: ['ROA', 'profitability', 'efficiency'],
    reference: 'Financial Statement Analysis',
  },
  {
    id: 'bar-fc-024',
    section: 'BAR',
    type: 'formula',
    topic: 'Ratio Analysis',
    blueprintArea: 'BAR-I',
    front: 'What is the RECEIVABLES TURNOVER ratio?',
    back: `**AR Turnover = Net Credit Sales ÷ Average Accounts Receivable**

**Days Sales Outstanding (DSO):**
DSO = 365 ÷ AR Turnover

Measures: How quickly company collects receivables

Higher turnover = faster collection = better
Compare to credit terms offered`,
    formula: 'AR Turnover = Net Credit Sales / Avg AR',
    example: 'Sales $2M, Avg AR $200K: Turnover = 10x (36.5 days)',
    difficulty: 'easy',
    tags: ['ratio', 'efficiency', 'receivables'],
    reference: 'Financial Statement Analysis',
  },
  {
    id: 'bar-fc-025',
    section: 'BAR',
    type: 'mnemonic',
    topic: 'Ratio Analysis',
    blueprintArea: 'BAR-I',
    front: 'What mnemonic helps remember LIQUIDITY ratios?',
    back: `**CQC - "See Quick Cash"**

C = Current Ratio (CA / CL)
Q = Quick Ratio (CA - Inventory / CL)
C = Cash Ratio (Cash + Securities / CL)

**Progressively more conservative:**
Current > Quick > Cash

Each removes less liquid assets from numerator`,
    mnemonic: 'CQC - See Quick Cash',
    difficulty: 'easy',
    tags: ['liquidity', 'ratios', 'mnemonic'],
    reference: 'Financial Statement Analysis',
  },
  {
    id: 'bar-fc-026',
    section: 'BAR',
    type: 'definition',
    topic: 'Costing Methods',
    blueprintArea: 'BAR-II',
    front: 'What is ACTIVITY-BASED COSTING (ABC)?',
    back: `**ABC = Assign costs based on activities that drive costs**

**Steps:**
1. Identify activities (ordering, setup, inspection)
2. Assign costs to activity cost pools
3. Determine cost driver for each pool
4. Calculate cost per driver unit
5. Assign costs to products based on driver usage

**Advantages:**
• More accurate product costs
• Better for complex operations
• Identifies non-value-added activities

**Disadvantages:**
• More complex and costly to implement`,
    difficulty: 'medium',
    tags: ['ABC', 'costing', 'overhead'],
    reference: 'Managerial Accounting',
  },
  {
    id: 'bar-fc-027',
    section: 'BAR',
    type: 'concept',
    topic: 'Decision Making',
    blueprintArea: 'BAR-II',
    front: 'What is a MAKE or BUY decision?',
    back: `**Make or Buy Analysis:**
Compare relevant costs of manufacturing vs. purchasing

**Relevant Costs - Make:**
• Direct materials
• Direct labor
• Variable overhead
• Any avoidable fixed costs

**Relevant Costs - Buy:**
• Purchase price
• Additional costs (freight, storage)

**Also Consider:**
• Quality control
• Capacity utilization
• Supplier reliability
• Strategic importance`,
    difficulty: 'medium',
    tags: ['make or buy', 'outsourcing', 'relevant cost'],
    reference: 'Managerial Accounting',
  },
  {
    id: 'bar-fc-028',
    section: 'BAR',
    type: 'formula',
    topic: 'Variance Analysis',
    blueprintArea: 'BAR-II',
    front: 'What are the OVERHEAD variances (2-variance method)?',
    back: `**Budget (Controllable) Variance:**
Actual OH - Flexible Budget OH
(Spending and efficiency combined)

**Volume (Capacity) Variance:**
Flexible Budget OH - Applied OH
(Due to different production level than expected)

**Total OH Variance:**
Actual OH - Applied OH

Applied OH = Standard rate × Standard hours allowed`,
    formula: 'Budget Var = Actual - Flex Budget; Volume Var = Flex Budget - Applied',
    difficulty: 'hard',
    tags: ['overhead', 'variance', 'standard costing'],
    reference: 'Managerial Accounting',
  },
  {
    id: 'bar-fc-029',
    section: 'BAR',
    type: 'definition',
    topic: 'Performance Measures',
    blueprintArea: 'BAR-III',
    front: 'What is the BALANCED SCORECARD?',
    back: `**Balanced Scorecard - Four Perspectives:**

1. **Financial:** Revenue, ROI, EVA, profit margins
2. **Customer:** Satisfaction, retention, market share
3. **Internal Process:** Quality, cycle time, efficiency
4. **Learning & Growth:** Training, innovation, employee satisfaction

**Purpose:**
• Balance financial and non-financial measures
• Link strategy to operations
• Forward-looking (lead) and backward-looking (lag) indicators`,
    difficulty: 'medium',
    tags: ['balanced scorecard', 'performance', 'KPI'],
    reference: 'Strategic Management',
  },
  {
    id: 'bar-fc-030',
    section: 'BAR',
    type: 'formula',
    topic: 'Performance Measures',
    blueprintArea: 'BAR-III',
    front: 'What is ECONOMIC VALUE ADDED (EVA)?',
    back: `**EVA = NOPAT - (Capital × Cost of Capital)**

Where:
• NOPAT = Net Operating Profit After Tax
• Capital = Total capital invested
• Cost of Capital = WACC

**OR:**
EVA = (ROIC - WACC) × Capital

**Interpretation:**
• EVA > 0: Creating shareholder value
• EVA < 0: Destroying value
• Better than accounting profit for measuring true economic return`,
    formula: 'EVA = NOPAT - (Capital × WACC)',
    example: 'NOPAT $1M, Capital $8M, WACC 10%: EVA = $1M - $800K = $200K',
    difficulty: 'hard',
    tags: ['EVA', 'value creation', 'performance'],
    reference: 'Financial Management',
  },
];

export default BAR_FLASHCARDS;

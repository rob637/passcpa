/**
 * CMA Part 1 Comprehensive Study Guide
 * Financial Planning, Performance, and Analytics
 *
 * A world-class study resource covering all blueprint areas
 * with detailed explanations, examples, and exam strategies
 */

export interface StudyGuideSection {
  id: string;
  title: string;
  blueprintArea: string;
  weight: number; // percentage of exam
  duration: string; // recommended study time
  overview: string;
  learningObjectives: string[];
  keyTopics: StudyGuideTopic[];
  examTips: string[];
  commonMistakes: string[];
  practiceQuestions: string[];
}

export interface StudyGuideTopic {
  id: string;
  title: string;
  content: string;
  examples?: string[];
  formulas?: string[];
  keyPoints: string[];
}

export interface StudyGuide {
  id: string;
  title: string;
  subtitle: string;
  section: 'CMA1' | 'CMA2';
  version: string;
  lastUpdated: string;
  totalStudyHours: number;
  description: string;
  examStructure: {
    questions: number;
    timeMinutes: number;
    passingScore: number;
    formatNotes: string;
  };
  sections: StudyGuideSection[];
  studyPlan: StudyPlanWeek[];
  examDayTips: string[];
}

export interface StudyPlanWeek {
  week: number;
  focus: string;
  hours: number; // Total weekly hours
  topics: string[];
  activities: string[];
}

export const CMA1_STUDY_GUIDE: StudyGuide = {
  id: 'cma1-study-guide-2025',
  title: 'CMA Part 1 Study Guide',
  subtitle: 'Financial Planning, Performance, and Analytics',
  section: 'CMA1',
  version: '2025.1',
  lastUpdated: '2025-02-01',
  totalStudyHours: 150,
  description: 'Comprehensive study guide for CMA Part 1 covering all six blueprint areas with in-depth explanations, worked examples, and exam strategies. Designed to help you pass on your first attempt.',

  examStructure: {
    questions: 100,
    timeMinutes: 240,
    passingScore: 360,
    formatNotes: 'All multiple choice. Scaled score 0-500. No penalty for guessing. Calculator provided.',
  },

  sections: [
    // ======================================
    // SECTION A: External Financial Reporting (15%)
    // ======================================
    {
      id: 'cma1-sg-a',
      title: 'External Financial Reporting Decisions',
      blueprintArea: 'CMA1-A',
      weight: 15,
      duration: '20-25 hours',
      overview: 'This section covers the preparation and analysis of financial statements under U.S. GAAP, including recognition, measurement, and disclosure requirements. You must understand how transactions affect the financial statements and be able to analyze statement quality.',

      learningObjectives: [
        'Prepare and analyze income statements, balance sheets, and cash flow statements',
        'Apply revenue recognition principles under ASC 606',
        'Account for inventories, long-term assets, leases, and liabilities',
        'Understand fair value measurement and impairment testing',
        'Analyze financial statement quality and detect earnings manipulation',
      ],

      keyTopics: [
        {
          id: 'cma1-sg-a1',
          title: 'Financial Statement Preparation',
          content: `The three primary financial statements form an interconnected system:

**Income Statement** (Performance over a period)
- Revenue recognition per ASC 606
- Expense matching and classification
- Operating vs. non-operating items
- EPS calculations (basic and diluted)

**Balance Sheet** (Position at a point in time)
- Current vs. non-current classification
- Working capital management
- Goodwill and intangible assets
- Shareholders' equity components

**Statement of Cash Flows** (Cash movements)
- Operating (direct vs. indirect method)
- Investing activities
- Financing activities
- Non-cash transactions (supplemental)`,
          examples: [
            'Converting from direct to indirect method',
            'Calculating diluted EPS with convertible bonds',
            'Classifying unusual items',
          ],
          formulas: [
            'Basic EPS = (Net Income - Preferred Dividends) / Weighted Avg Shares',
            'CFO (Indirect) = Net Income + Non-cash + ΔWorking Capital',
          ],
          keyPoints: [
            'CFO indirect starts with net income, adjusts for non-cash and working capital',
            'Revenue recognized when control transfers, not when cash received',
            'Current assets/liabilities = expected to convert within 1 year',
          ],
        },
        {
          id: 'cma1-sg-a2',
          title: 'Revenue Recognition (ASC 606)',
          content: `The 5-step model for recognizing revenue:

**Step 1: Identify the Contract**
- Agreement creating enforceable rights
- Approval and commitment
- Collectibility is probable

**Step 2: Identify Performance Obligations**
- Distinct goods or services
- Capable of being distinct
- Separately identifiable in contract

**Step 3: Determine Transaction Price**
- Fixed and variable consideration
- Significant financing components
- Non-cash consideration

**Step 4: Allocate to Performance Obligations**
- Standalone selling prices
- Residual approach if needed

**Step 5: Recognize Revenue**
- Over time or at a point in time
- Based on transfer of control`,
          examples: [
            'Software with maintenance contract (multiple performance obligations)',
            'Construction contract (over time recognition)',
            'Retail sale with right of return (variable consideration)',
          ],
          keyPoints: [
            'Control transfers = risk/rewards, legal title, physical possession, payment right',
            'Variable consideration estimated using expected value or most likely amount',
            'Contract modifications may create new contracts or modify existing',
          ],
        },
        {
          id: 'cma1-sg-a3',
          title: 'Inventory Valuation',
          content: `Inventory is measured at lower of cost or net realizable value (LCNRV).

**Cost Flow Assumptions:**
- **FIFO:** First-In, First-Out - ending inventory at recent costs
- **LIFO:** Last-In, First-Out - COGS at recent costs (US GAAP only)
- **Weighted Average:** Average cost per unit

**Key Concepts:**
- NRV = Selling Price - Costs to Complete and Sell
- LIFO Reserve = FIFO Inventory - LIFO Inventory
- LIFO Liquidation: Selling old inventory at low cost (inflates income)

**Periodic vs. Perpetual:**
- Periodic: Count at end, calculate COGS as plug
- Perpetual: Track each transaction, know inventory constantly`,
          formulas: [
            'COGS = Beginning Inventory + Purchases - Ending Inventory',
            'NRV = Selling Price - Costs to Complete - Costs to Sell',
            'FIFO Inventory = LIFO Inventory + LIFO Reserve',
          ],
          keyPoints: [
            'LIFO prohibited under IFRS',
            'Dollar-value LIFO uses price indexes',
            'Impairment is written down, but reversal not allowed under US GAAP',
          ],
        },
        {
          id: 'cma1-sg-a4',
          title: 'Long-Term Assets and Leases',
          content: `**Property, Plant & Equipment:**
- Initial recognition at cost (including preparation costs)
- Depreciation: Straight-line, declining balance, units of production
- Impairment: Carrying value > recoverable amount
- Exchanges: At fair value (recognize gain/loss)

**Intangible Assets:**
- Definite life: Amortize
- Indefinite life (goodwill, trademarks): Test annually for impairment

**Lease Accounting (ASC 842):**
All leases (except short-term) recorded on balance sheet.

**Finance Lease (lessee):**
- ROU asset and lease liability at PV of payments
- Depreciate asset, record interest on liability
- Front-loaded expense pattern

**Operating Lease (lessee):**
- Same initial recording (ROU + Liability)
- Single straight-line lease expense
- Interest + Amortization netted`,
          formulas: [
            'Straight-line Depreciation = (Cost - Residual) / Useful Life',
            'DDB Rate = (1 / Life) × 2',
            'Lease Liability = PV of Lease Payments',
          ],
          keyPoints: [
            'Capitalize interest during construction (qualifying assets)',
            'Goodwill impairment: Compare carrying to fair value of reporting unit',
            'Short-term lease exception: < 12 months, no purchase option',
          ],
        },
      ],

      examTips: [
        'Know ASC 606 cold - very heavily tested',
        'Practice converting between FIFO/LIFO using the LIFO reserve',
        'Understand the income statement impact of lease classification',
        'Be able to calculate depreciation under all methods quickly',
        'Watch for "substance over form" in revenue recognition scenarios',
      ],

      commonMistakes: [
        'Confusing cash basis vs. accrual for revenue recognition',
        'Forgetting to adjust for non-controlling interest in consolidations',
        'Missing the tax effect when calculating after-tax cash flows',
        'Misclassifying operating vs. finance leases',
      ],

      practiceQuestions: [
        'When should revenue be recognized for a gift card sale?',
        'How does LIFO liquidation affect taxable income?',
        'Calculate CFO using indirect method given specific changes',
        'Determine the ROU asset for a 5-year lease with payments of $10,000/year',
      ],
    },

    // ======================================
    // SECTION B: Planning, Budgeting, Forecasting (20%)
    // ======================================
    {
      id: 'cma1-sg-b',
      title: 'Planning, Budgeting, and Forecasting',
      blueprintArea: 'CMA1-B',
      weight: 20,
      duration: '25-30 hours',
      overview: 'This section covers strategic planning, the budgeting process, and forecasting techniques. You need to understand how to prepare and analyze operating and financial budgets, and use various quantitative methods for forecasting.',

      learningObjectives: [
        'Explain the strategic planning process and its connection to budgeting',
        'Prepare operating budgets: sales, production, purchases, labor, overhead',
        'Prepare financial budgets: cash, capital, pro forma statements',
        'Apply forecasting techniques including regression, time series, and qualitative methods',
        'Evaluate budget variances and implement rolling forecasts',
      ],

      keyTopics: [
        {
          id: 'cma1-sg-b1',
          title: 'Strategic Planning Process',
          content: `Strategic planning connects long-term vision to short-term action:

**Hierarchy:**
1. Mission/Vision Statement
2. Strategic Goals (3-5 years)
3. Annual Objectives
4. Operating Budgets (1 year)

**SWOT Analysis:**
- **S**trengths (internal positive)
- **W**eaknesses (internal negative)
- **O**pportunities (external positive)
- **T**hreats (external negative)

**Porter's Five Forces:**
1. Industry rivalry
2. Threat of new entrants
3. Threat of substitutes
4. Bargaining power of suppliers
5. Bargaining power of buyers

**Budgeting Philosophies:**
- Top-down: Management sets targets
- Bottom-up: Department managers build budgets
- Participative: Combination (best for buy-in)`,
          keyPoints: [
            'Strategy must be translated into actionable, measurable objectives',
            'Budgets are financial expressions of strategic plans',
            'Participative budgeting increases motivation but takes more time',
          ],
        },
        {
          id: 'cma1-sg-b2',
          title: 'Operating Budget Components',
          content: `The master budget starts with sales and flows through all operations:

**Sales Budget** (Starting Point)
Units × Selling Price = Revenue

**Production Budget**
Production = Sales + Ending Inventory - Beginning Inventory

**Direct Materials Budget**
Materials needed = Production × Material per unit
Purchases = Materials needed + Ending inventory - Beginning inventory

**Direct Labor Budget**
Labor hours = Production × Hours per unit
Labor cost = Hours × Rate

**Manufacturing Overhead Budget**
Variable OH = Production × Variable rate
Fixed OH = Per budget

**Selling & Administrative Budget**
Variable component + Fixed component`,
          formulas: [
            'Production = Sales + Ending FG - Beginning FG',
            'Purchases = Usage + Ending RM - Beginning RM',
            'Total Manufacturing Cost = DM + DL + OH',
          ],
          examples: [
            'Complete production budget for a quarter with seasonal sales',
            'Calculate material purchases when production varies monthly',
          ],
          keyPoints: [
            'Budget sequence matters - start with sales',
            'Inventory policies drive production vs. sales differences',
            'Cash collections lag sales; cash payments lag purchases',
          ],
        },
        {
          id: 'cma1-sg-b3',
          title: 'Cash Budget',
          content: `The cash budget ensures adequate liquidity:

**Format:**
Beginning Cash Balance
+ Cash Collections (from sales)
= Total Cash Available
- Cash Disbursements
  - Material payments
  - Labor and overhead
  - Capital expenditures
  - Other payments
= Cash Excess/Deficiency
± Financing Activities
= Ending Cash Balance

**Collection Patterns:**
- Month of sale: X%
- Following month: Y%
- Two months later: Z%
- Allowance for uncollectibles

**Payment Patterns:**
- Materials: Often 30-60 day lag
- Labor/overhead: Usually current month
- Taxes: Quarterly`,
          examples: [
            'Prepare monthly cash budget with collection lag',
            'Calculate minimum borrowing needed to maintain cash balance',
          ],
          keyPoints: [
            'Depreciation is NOT a cash disbursement',
            'Track minimum cash balance requirements',
            'Interest on borrowings affects next period budget',
          ],
        },
        {
          id: 'cma1-sg-b4',
          title: 'Forecasting Techniques',
          content: `**Quantitative Methods:**

**Simple Moving Average**
Forecast = (Sum of N periods) / N

**Weighted Moving Average**
Forecast = Σ(Weight × Actual)

**Exponential Smoothing**
F(t+1) = α × Actual + (1-α) × Forecast

**Linear Regression**
Y = a + bX
b = Σ(X-X̄)(Y-Ȳ) / Σ(X-X̄)²
a = Ȳ - bX̄

**Time Series Decomposition**
Components: Trend, Seasonal, Cyclical, Irregular

**Qualitative Methods:**
- Delphi method (expert consensus)
- Market research
- Sales force composite
- Executive judgment`,
          formulas: [
            'Exponential: F(t+1) = αA + (1-α)F',
            'Seasonal Forecast = Trend × Seasonal Index',
            'R² = Explained Variation / Total Variation',
          ],
          keyPoints: [
            'Higher α in smoothing = more weight on recent data',
            'R² close to 1 = good fit',
            'Seasonal index > 1 means above-average period',
          ],
        },
      ],

      examTips: [
        'Practice the complete budget sequence - it builds on itself',
        'Know how to calculate collections with varying collection patterns',
        'Understand flexible budgets vs. static budgets',
        'Be comfortable with regression formula and interpretation',
        'Watch units carefully in production budgets',
      ],

      commonMistakes: [
        'Forgetting to lag cash collections from credit sales',
        'Including depreciation as a cash disbursement',
        'Using wrong beginning inventory in production formula',
        'Misinterpreting seasonal index direction',
      ],

      practiceQuestions: [
        'Calculate production needed when policy is to end with 20% of next month sales',
        'Determine April collections if 60% collected in month of sale, 40% next month',
        'Using exponential smoothing with α=0.3, forecast next period',
        'Interpret R² = 0.85 in a regression analysis',
      ],
    },

    // ======================================
    // SECTION C: Performance Management (20%)
    // ======================================
    {
      id: 'cma1-sg-c',
      title: 'Performance Management',
      blueprintArea: 'CMA1-C',
      weight: 20,
      duration: '25-30 hours',
      overview: 'This section covers cost and variance analysis, responsibility accounting, and performance measurement systems including the Balanced Scorecard. You need to understand how to measure and evaluate performance at various organizational levels.',

      learningObjectives: [
        'Calculate and analyze manufacturing variances (materials, labor, overhead)',
        'Apply responsibility accounting to cost, profit, and investment centers',
        'Calculate and interpret ROI, Residual Income, and EVA',
        'Design and use Balanced Scorecards',
        'Establish transfer pricing policies',
      ],

      keyTopics: [
        {
          id: 'cma1-sg-c1',
          title: 'Standard Cost Variance Analysis',
          content: `**Direct Materials Variances:**

**Price Variance** = (Actual Price - Standard Price) × Actual Quantity
**Quantity Variance** = (Actual Quantity - Standard Quantity) × Standard Price

**Direct Labor Variances:**

**Rate Variance** = (Actual Rate - Standard Rate) × Actual Hours
**Efficiency Variance** = (Actual Hours - Standard Hours) × Standard Rate

**Variable Overhead Variances:**

**Spending Variance** = Actual VOH - (Actual Hours × Standard Rate)
**Efficiency Variance** = (Actual Hours - Standard Hours) × Standard Rate

**Fixed Overhead Variances:**

**Spending Variance** = Actual FOH - Budgeted FOH
**Volume Variance** = Budgeted FOH - Applied FOH`,
          formulas: [
            'Material Price Var = (AP - SP) × AQ',
            'Material Quantity Var = (AQ - SQ) × SP',
            'Labor Rate Var = (AR - SR) × AH',
            'Labor Efficiency Var = (AH - SH) × SR',
          ],
          keyPoints: [
            'Favorable = Actual < Standard (or positive income impact)',
            'Variances isolated at point of responsibility',
            'Material price often controlled by purchasing; quantity by production',
            'Fixed OH volume variance is about capacity utilization',
          ],
        },
        {
          id: 'cma1-sg-c2',
          title: 'Responsibility Accounting',
          content: `**Types of Responsibility Centers:**

**Cost Center**
- Control costs only
- Evaluated on: Efficiency, cost control
- Example: Production department

**Revenue Center**
- Control revenue only
- Evaluated on: Sales volume, mix
- Example: Sales department

**Profit Center**
- Control both revenue and costs
- Evaluated on: Profitability
- Example: Regional division

**Investment Center**
- Control revenue, costs, AND assets
- Evaluated on: ROI, RI, EVA
- Example: Corporate division

**Controllability Principle:**
Managers should only be evaluated on items they can control.`,
          keyPoints: [
            'Match authority with responsibility',
            'Distinguish controllable from non-controllable costs',
            'Avoid allocating corporate costs for performance evaluation',
          ],
        },
        {
          id: 'cma1-sg-c3',
          title: 'Investment Center Metrics',
          content: `**Return on Investment (ROI):**
ROI = Operating Income / Invested Capital
ROI = Profit Margin × Asset Turnover

**Problem with ROI:** Managers may reject projects that would increase company ROI but decrease their division's ROI.

**Residual Income (RI):**
RI = Operating Income - (Invested Capital × Required Return)

**Advantage:** Encourages accepting any project above hurdle rate.

**Economic Value Added (EVA):**
EVA = NOPAT - (Capital × WACC)

NOPAT = Net Operating Profit After Tax

**Key Adjustments for EVA:**
- Capitalize R&D and marketing
- Add back goodwill amortization
- Adjust for operating leases`,
          formulas: [
            'ROI = Operating Income / Invested Capital',
            'ROI = (Income/Sales) × (Sales/Assets)',
            'RI = Operating Income - (Capital × Required %)',
            'EVA = NOPAT - (Capital × WACC)',
          ],
          keyPoints: [
            'ROI can cause suboptimal decisions',
            'RI is an absolute measure, not a rate',
            'EVA measures true economic profit after capital charge',
          ],
        },
        {
          id: 'cma1-sg-c4',
          title: 'Balanced Scorecard',
          content: `**Four Perspectives:**

**1. Financial** - "How do we look to shareholders?"
- Revenue growth
- Profitability
- Asset utilization
- Risk management

**2. Customer** - "How do customers see us?"
- Customer satisfaction
- Market share
- Customer retention
- Brand equity

**3. Internal Business Process** - "What must we excel at?"
- Quality
- Cycle time
- Productivity
- Innovation

**4. Learning & Growth** - "Can we continue to improve?"
- Employee skills
- Technology capability
- Organizational culture
- Knowledge management

**Strategy Map:** Links objectives across perspectives showing cause-and-effect relationships.`,
          keyPoints: [
            'Lead indicators (learning) drive lag indicators (financial)',
            'Measures should be balanced across all four perspectives',
            'Strategy map shows how improvements flow to financial results',
          ],
        },
      ],

      examTips: [
        'Memorize variance formulas - these are very heavily tested',
        'Know when variances are favorable vs. unfavorable',
        'Understand why ROI can lead to suboptimization',
        'Be able to calculate and interpret EVA adjustments',
        'Connect Balanced Scorecard perspectives with cause-and-effect logic',
      ],

      commonMistakes: [
        'Mixing up price vs. quantity (rate vs. efficiency) variances',
        'Using wrong base (actual vs. standard) in variance calculations',
        'Confusing favorable/unfavorable direction',
        'Forgetting capital charge in RI/EVA calculations',
      ],

      practiceQuestions: [
        'Calculate all four labor and material variances from given data',
        'Division has ROI of 15%, hurdle rate 12%. Calculate RI.',
        'Explain why a manager might reject a 14% ROI project',
        'Match BSC measures to appropriate perspectives',
      ],
    },

    // ======================================
    // SECTION D: Cost Management (15%)
    // ======================================
    {
      id: 'cma1-sg-d',
      title: 'Cost Management',
      blueprintArea: 'CMA1-D',
      weight: 15,
      duration: '20-25 hours',
      overview: 'This section covers cost measurement, cost systems, and overhead allocation methods. You need to understand job order and process costing, ABC, and relevant cost analysis for decision making.',

      learningObjectives: [
        'Distinguish between variable, fixed, and mixed costs',
        'Apply job order costing and process costing systems',
        'Implement Activity-Based Costing (ABC)',
        'Analyze costs for special decisions (make/buy, special orders)',
        'Apply Theory of Constraints principles',
      ],

      keyTopics: [
        {
          id: 'cma1-sg-d1',
          title: 'Cost Behavior and Estimation',
          content: `**Cost Classifications:**

**Variable Costs:** Change in total with activity
- Examples: Direct materials, commissions
- Per-unit cost is constant

**Fixed Costs:** Constant in total within relevant range
- Examples: Rent, depreciation, salaries
- Per-unit cost decreases with volume

**Mixed/Semi-Variable:** Both fixed and variable components
- Examples: Utilities, maintenance
- Y = Fixed + Variable × Activity

**Cost Estimation Methods:**

**High-Low Method:**
Variable Rate = ΔCost / ΔActivity
Fixed Cost = Total - (Variable × Activity)

**Regression Analysis:**
Y = a + bX
More accurate, uses all data points
R² indicates fit quality`,
          formulas: [
            'Total Cost = Fixed + (Variable per unit × Units)',
            'High-Low VC = (High Cost - Low Cost) / (High Activity - Low Activity)',
            'Contribution Margin = Revenue - Variable Costs',
          ],
          keyPoints: [
            'Relevant range: area where cost behavior assumptions hold',
            'Step costs: fixed within small ranges, then jump',
            'High-low only uses extreme points (less accurate)',
          ],
        },
        {
          id: 'cma1-sg-d2',
          title: 'Job Order vs. Process Costing',
          content: `**Job Order Costing:**
- Unique products/batches
- Costs traced to specific jobs
- Examples: Custom manufacturing, construction

**Process Costing:**
- Homogeneous products
- Costs averaged across units
- Examples: Oil refining, food processing

**Equivalent Units (Process Costing):**

**Weighted Average Method:**
EU = Units completed + (Ending WIP × % complete)
- Blends beginning and current period costs

**FIFO Method:**
EU = (Begin WIP × % to complete) + Started & Completed + (End WIP × % complete)
- Separates beginning WIP from current period`,
          formulas: [
            'EU (Weighted Avg) = Complete + (End WIP × %)',
            'Cost per EU = Total Cost / Total EU',
            'FIFO EU = (Beg WIP × % left) + S&C + (End WIP × %)',
          ],
          keyPoints: [
            'Calculate EU separately for materials vs. conversion',
            'Materials often added at beginning (100% complete)',
            'Conversion costs added evenly throughout',
          ],
        },
        {
          id: 'cma1-sg-d3',
          title: 'Activity-Based Costing (ABC)',
          content: `ABC allocates overhead based on activities that drive costs:

**Traditional Costing Problems:**
- Single driver (DLH) may distort costs
- High-volume products subsidize low-volume
- Overhead may dwarf direct labor

**ABC Process:**
1. Identify activities (setup, inspection, machining)
2. Create cost pools for each activity
3. Identify cost drivers (# setups, # inspections)
4. Calculate activity rates
5. Apply to products based on consumption

**Cost Driver Examples:**
- Machine setups → Number of setups
- Quality inspection → Number of inspections
- Material handling → Number of moves
- Engineering changes → Number of change orders

**When to use ABC:**
- High overhead relative to direct costs
- Product diversity (complexity varies)
- Overhead not volume-driven`,
          formulas: [
            'Activity Rate = Pool Cost / Total Driver Quantity',
            'Product OH = Σ(Activity Rate × Driver Used)',
          ],
          examples: [
            'Calculate product cost with 3 activity pools',
            'Compare ABC to traditional single-rate allocation',
          ],
          keyPoints: [
            'ABC more accurate but more expensive to implement',
            'Simple products often over-costed in traditional systems',
            'Complex low-volume products often under-costed traditionally',
          ],
        },
        {
          id: 'cma1-sg-d4',
          title: 'Relevant Costs and Decision Making',
          content: `**Relevant Costs:** Future costs that differ between alternatives

**Not Relevant:**
- Sunk costs (already incurred)
- Costs that don't differ
- Allocated costs (may not change)

**Common Decision Types:**

**Special Order:**
Accept if: Price > Incremental cost (and has capacity)
Consider: Opportunity cost if at capacity

**Make vs. Buy:**
Compare: Internal variable costs + Opportunity costs vs. Purchase price
Consider: Quality, reliability, long-term strategy

**Keep vs. Drop (Segment):**
Keep if: Segment CM > Avoidable fixed costs
Consider: Impact on other segments

**Sell or Process Further:**
Process if: Incremental revenue > Incremental costs
Joint costs are sunk at split-off

**Constrained Resources:**
Optimize: CM per constraint unit
Produce highest CM per bottleneck resource first`,
          formulas: [
            'Relevant Cost = Future costs that differ',
            'CM per Constraint = CM per unit / Constraint per unit',
          ],
          keyPoints: [
            'Ignore sunk costs completely',
            'Opportunity cost = value of next best alternative',
            'Joint costs irrelevant to sell/process further decisions',
          ],
        },
      ],

      examTips: [
        'Know when to use job order vs. process costing',
        'Practice equivalent unit calculations with both methods',
        'Always ask "What is the relevant cost?" for decisions',
        'Never include sunk costs in analysis',
        'Understand capacity constraints affect opportunity cost',
      ],

      commonMistakes: [
        'Including sunk costs in decisions',
        'Forgetting opportunity costs',
        'Using allocated costs as if they were incremental',
        'Mixing up weighted average and FIFO for equivalent units',
      ],

      practiceQuestions: [
        'Calculate equivalent units for conversion with 40% complete WIP',
        'Should we accept special order at 80% of normal price?',
        'Compare product costs under ABC vs. traditional allocation',
        'With limited machine hours, which product mix maximizes profit?',
      ],
    },

    // ======================================
    // SECTION E: Internal Controls (15%)
    // ======================================
    {
      id: 'cma1-sg-e',
      title: 'Internal Controls',
      blueprintArea: 'CMA1-E',
      weight: 15,
      duration: '15-20 hours',
      overview: 'This section covers governance, risk management, and internal control frameworks. You need to understand COSO frameworks, risk assessment, and the role of internal audit.',

      learningObjectives: [
        'Explain the COSO Internal Control Framework components',
        'Describe the COSO ERM Framework',
        'Identify types of controls and segregation of duties',
        'Understand the role of internal audit',
        'Apply risk assessment techniques',
      ],

      keyTopics: [
        {
          id: 'cma1-sg-e1',
          title: 'COSO Internal Control Framework',
          content: `**Five Components (CRIME):**

**1. Control Environment**
- Tone at the top
- Organizational structure
- Assignment of authority
- HR policies

**2. Risk Assessment**
- Identify risks to objectives
- Analyze likelihood and impact
- Determine risk response

**3. Control Activities**
- Policies and procedures
- Authorization and approval
- Verification and reconciliation
- Physical controls

**4. Information & Communication**
- Quality information systems
- Internal communication
- External communication

**5. Monitoring Activities**
- Ongoing monitoring
- Separate evaluations
- Reporting deficiencies

**17 Principles** support the 5 components`,
          keyPoints: [
            'Control environment is the foundation',
            'All components must be present and functioning',
            'Reasonable assurance, not absolute',
          ],
        },
        {
          id: 'cma1-sg-e2',
          title: 'Segregation of Duties',
          content: `**Four Key Functions to Separate:**

1. **Authorization** - Approving transactions
2. **Custody** - Physical control of assets
3. **Recording** - Maintaining accounting records
4. **Reconciliation** - Comparing records to reality

**Goal:** No single person should control all aspects of a transaction.

**Examples:**
- Accounts payable shouldn't sign checks
- Inventory keeper shouldn't record inventory
- Person opening mail shouldn't record receipts

**Compensating Controls:**
When segregation isn't possible (small company):
- Management review
- Independent reconciliations
- Surprise audits`,
          keyPoints: [
            'Segregation prevents fraud and errors',
            'Compensating controls bridge the gap in small organizations',
            'Authorization should always be separate from custody',
          ],
        },
        {
          id: 'cma1-sg-e3',
          title: 'Enterprise Risk Management (COSO ERM)',
          content: `**COSO ERM 2017 Framework:**

**5 Components & 20 Principles:**

**1. Governance & Culture**
- Board oversight
- Operating structure
- Desired culture
- Core values

**2. Strategy & Objective-Setting**
- Analyze business context
- Define risk appetite
- Evaluate strategies
- Formulate objectives

**3. Performance**
- Identify risk
- Assess severity
- Prioritize risk
- Implement responses
- Develop portfolio view

**4. Review & Revision**
- Assess change
- Review risk and performance
- Pursue improvement

**5. Information, Communication & Reporting**
- Leverage IT
- Communicate risk
- Report on risk, culture, performance`,
          keyPoints: [
            'ERM integrates risk with strategy',
            'Risk appetite = overall acceptable risk level',
            'Risk tolerance = acceptable variation',
            'Risk responses: Accept, Avoid, Reduce, Share',
          ],
        },
      ],

      examTips: [
        'Memorize the 5 COSO IC components (CRIME)',
        'Understand segregation of duties examples',
        'Know the difference between COSO IC and COSO ERM',
        'Understand deficiency classifications (material weakness)',
        'Be able to identify control weaknesses in scenarios',
      ],

      commonMistakes: [
        'Confusing COSO IC with COSO ERM frameworks',
        'Not recognizing segregation of duties violations',
        'Thinking controls provide absolute assurance',
      ],

      practiceQuestions: [
        'Which duties should NOT be performed by the same person?',
        'Identify the COSO component for each scenario',
        'What compensating controls exist for small companies?',
        'Classify: significant deficiency vs. material weakness',
      ],
    },

    // ======================================
    // SECTION F: Technology and Analytics (15%)
    // ======================================
    {
      id: 'cma1-sg-f',
      title: 'Technology and Analytics',
      blueprintArea: 'CMA1-F',
      weight: 15,
      duration: '15-20 hours',
      overview: 'This section covers information systems, data governance, and analytics. You need to understand ERP systems, data quality, and the application of analytics in financial management.',

      learningObjectives: [
        'Explain ERP systems and their benefits',
        'Describe data governance and quality principles',
        'Apply the four types of analytics',
        'Understand emerging technologies (AI, blockchain, RPA)',
        'Implement data visualization best practices',
      ],

      keyTopics: [
        {
          id: 'cma1-sg-f1',
          title: 'Enterprise Resource Planning (ERP)',
          content: `**ERP Definition:**
Integrated software managing all business processes through shared database.

**Key Modules:**
- Finance & Accounting
- Human Resources
- Supply Chain Management
- Manufacturing
- Sales & CRM

**Benefits:**
- Real-time data access
- Eliminates information silos
- Standardized processes
- Better decision making
- Reduced errors

**Challenges:**
- High implementation cost
- Change management
- Customization complexity
- Training requirements

**Major ERP Vendors:** SAP, Oracle, Microsoft Dynamics`,
          keyPoints: [
            'Single source of truth for organization',
            'Implementation is major undertaking (months/years)',
            'Cloud ERP growing rapidly',
          ],
        },
        {
          id: 'cma1-sg-f2',
          title: 'Data Analytics Types',
          content: `**Analytics Progression (DDPP):**

**1. Descriptive Analytics**
- What happened?
- Reports, dashboards, KPIs
- Historical focus

**2. Diagnostic Analytics**
- Why did it happen?
- Root cause analysis
- Drill-down, correlation

**3. Predictive Analytics**
- What will happen?
- Forecasting, machine learning
- Regression, time series

**4. Prescriptive Analytics**
- What should we do?
- Optimization, simulation
- Recommendations

**Complexity and value increase from descriptive to prescriptive.**`,
          keyPoints: [
            'Most companies still mainly descriptive',
            'Predictive requires quality historical data',
            'Prescriptive most valuable but hardest',
          ],
        },
        {
          id: 'cma1-sg-f3',
          title: 'Emerging Technologies',
          content: `**Artificial Intelligence (AI):**
- Machine learning for pattern recognition
- Natural language processing
- Anomaly detection for fraud
- Automated journal entries

**Robotic Process Automation (RPA):**
- Automates repetitive tasks
- Invoice processing
- Reconciliations
- Report generation

**Blockchain:**
- Distributed ledger technology
- Immutable records
- Supply chain tracking
- Smart contracts

**Cloud Computing:**
- SaaS, PaaS, IaaS
- Reduced infrastructure costs
- Scalability
- Remote access`,
          keyPoints: [
            'AI augments human judgment, doesn\'t replace',
            'RPA handles volume; AI handles complexity',
            'Blockchain reduces need for intermediaries',
          ],
        },
      ],

      examTips: [
        'Know the 4 types of analytics and their applications',
        'Understand ERP benefits and challenges',
        'Be familiar with IT control types (general vs. application)',
        'Know basic data visualization principles',
        'Understand AI/ML at conceptual level',
      ],

      commonMistakes: [
        'Confusing descriptive with predictive analytics',
        'Thinking ERP solves all problems automatically',
        'Not recognizing data quality as prerequisite for analytics',
      ],

      practiceQuestions: [
        'Which analytics type uses regression for forecasting?',
        'What are the benefits of ERP implementation?',
        'How does RPA differ from AI?',
        'What is blockchain\'s role in auditing?',
      ],
    },
  ],

  studyPlan: [
    {
      week: 1,
      focus: 'External Financial Reporting (A)',
      hours: 20,
      topics: ['Financial statements', 'Revenue recognition', 'Inventory'],
      activities: ['Complete ASC 606 study', 'Practice 50 MCQs'],
    },
    {
      week: 2,
      focus: 'External Reporting (A) & Budgeting (B)',
      hours: 20,
      topics: ['Leases', 'Assets', 'Strategic planning', 'Budget process'],
      activities: ['Master lease accounting', 'Complete budget sequence'],
    },
    {
      week: 3,
      focus: 'Budgeting & Forecasting (B)',
      hours: 20,
      topics: ['Cash budget', 'Pro forma statements', 'Forecasting methods'],
      activities: ['Complete cash budget practice', 'Master regression'],
    },
    {
      week: 4,
      focus: 'Performance Management (C)',
      hours: 20,
      topics: ['Variance analysis', 'Responsibility accounting', 'ROI/RI/EVA'],
      activities: ['Memorize variance formulas', 'Practice 100 MCQs'],
    },
    {
      week: 5,
      focus: 'Performance (C) & Cost Management (D)',
      hours: 20,
      topics: ['Balanced Scorecard', 'Cost behavior', 'Costing systems'],
      activities: ['Master BSC perspectives', 'Complete EU calculations'],
    },
    {
      week: 6,
      focus: 'Cost Management (D)',
      hours: 20,
      topics: ['ABC costing', 'Relevant costs', 'Decision analysis'],
      activities: ['Complete ABC practice', 'Master special decisions'],
    },
    {
      week: 7,
      focus: 'Internal Controls (E) & Technology (F)',
      hours: 20,
      topics: ['COSO frameworks', 'ERM', 'ERP', 'Analytics'],
      activities: ['Memorize COSO components', 'Understand analytics types'],
    },
    {
      week: 8,
      focus: 'Final Review',
      hours: 25,
      topics: ['All areas', 'Weak spots', 'Full practice exams'],
      activities: ['Score 75%+ on practice exams', 'Review missed questions'],
    },
  ],

  examDayTips: [
    'Get a good night\'s sleep - no cramming the night before',
    'Arrive 30 minutes early to the testing center',
    'Use the provided calculator - don\'t bring your own',
    'Answer every question - no penalty for guessing',
    'Flag difficult questions and return to them',
    'Manage your time: ~2.4 minutes per question',
    'Read every answer choice before selecting',
    'Watch for "NOT" or "EXCEPT" in questions',
    'Trust your first instinct on review unless clearly wrong',
    'Take deep breaths if you feel overwhelmed',
  ],
};

export default CMA1_STUDY_GUIDE;

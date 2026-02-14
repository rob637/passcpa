/**
 * CMA Part 2 Comprehensive Study Guide
 * Strategic Financial Management
 *
 * A world-class study resource covering all blueprint areas
 * with detailed explanations, examples, and exam strategies
 */

import { StudyGuide } from './cma1-study-guide';

export const CMA2_STUDY_GUIDE: StudyGuide = {
  id: 'cma2-study-guide-2025',
  title: 'CMA Part 2 Study Guide',
  subtitle: 'Strategic Financial Management',
  section: 'CMA2',
  version: '2025.1',
  lastUpdated: '2025-02-01',
  totalStudyHours: 150,
  description: 'Comprehensive study guide for CMA Part 2 covering financial statement analysis, corporate finance, decision analysis, risk management, investment decisions, and professional ethics. Designed to help you pass on your first attempt.',

  examStructure: {
    questions: 100,
    timeMinutes: 240,
    passingScore: 360,
    formatNotes: 'All multiple choice. Scaled score 0-500. No penalty for guessing. Calculator provided.',
  },

  sections: [
    // ======================================
    // SECTION A: Financial Statement Analysis (20%)
    // ======================================
    {
      id: 'cma2-sg-a',
      title: 'Financial Statement Analysis',
      blueprintArea: 'CMA2-A',
      weight: 20,
      duration: '25-30 hours',
      overview: 'This section covers comprehensive financial statement analysis including ratio analysis, earnings quality assessment, and analytical techniques. You must be able to evaluate financial performance and detect potential issues in financial reporting.',

      learningObjectives: [
        'Calculate and interpret liquidity, profitability, leverage, and efficiency ratios',
        'Perform DuPont analysis (3-factor and 5-factor)',
        'Assess earnings quality and detect potential manipulation',
        'Apply trend and common-size analysis',
        'Evaluate market-based ratios',
      ],

      keyTopics: [
        {
          id: 'cma2-sg-a1',
          title: 'Ratio Analysis Categories',
          content: `**Liquidity Ratios** - Short-term solvency

**Current Ratio** = Current Assets / Current Liabilities
**Quick Ratio** = (CA - Inventory) / CL
**Cash Ratio** = Cash / CL

**Profitability Ratios** - Earning ability

**Gross Margin** = Gross Profit / Sales
**Operating Margin** = Operating Income / Sales
**Net Profit Margin** = Net Income / Sales
**ROA** = Net Income / Total Assets
**ROE** = Net Income / Shareholders' Equity

**Leverage Ratios** - Long-term solvency

**Debt-to-Equity** = Total Debt / Total Equity
**Debt Ratio** = Total Debt / Total Assets
**Times Interest Earned** = EBIT / Interest Expense
**Fixed Charge Coverage** = (EBIT + Lease) / (Interest + Lease)

**Efficiency Ratios** - Asset utilization

**Asset Turnover** = Sales / Total Assets
**Inventory Turnover** = COGS / Average Inventory
**Receivables Turnover** = Sales / Average AR
**Days Sales Outstanding** = 365 / Receivables Turnover`,
          formulas: [
            'Current Ratio = CA / CL',
            'ROE = NI / Equity',
            'D/E Ratio = Total Debt / Equity',
            'Asset Turnover = Sales / Assets',
          ],
          keyPoints: [
            'Compare ratios to industry benchmarks',
            'Analyze trends over time',
            'Consider interactions between ratios',
          ],
        },
        {
          id: 'cma2-sg-a2',
          title: 'DuPont Analysis',
          content: `**3-Factor DuPont Model:**

ROE = Profit Margin × Asset Turnover × Equity Multiplier
ROE = (NI/Sales) × (Sales/Assets) × (Assets/Equity)

**Interpretation:**
- Profit Margin: Profitability from operations
- Asset Turnover: Efficiency of asset use
- Equity Multiplier: Financial leverage

**5-Factor DuPont Model:**

ROE = Tax Burden × Interest Burden × Operating Margin × Asset Turnover × Leverage

Where:
- Tax Burden = NI / EBT
- Interest Burden = EBT / EBIT
- Operating Margin = EBIT / Sales
- Asset Turnover = Sales / Assets
- Leverage = Assets / Equity

**Strategic Use:**
- Identify drivers of ROE changes
- Compare to competitors
- Guide improvement strategies`,
          formulas: [
            '3-Factor: ROE = (NI/Sales) × (Sales/Assets) × (Assets/Equity)',
            '5-Factor: ROE = (NI/EBT) × (EBT/EBIT) × (EBIT/Sales) × (Sales/Assets) × (Assets/Equity)',
          ],
          examples: [
            'Decompose ROE change from 12% to 15%',
            'Identify which factor improved or declined',
          ],
          keyPoints: [
            'Trade-offs exist between components',
            'High leverage increases ROE but also risk',
            '5-factor separates operating from financing effects',
          ],
        },
        {
          id: 'cma2-sg-a3',
          title: 'Earnings Quality Analysis',
          content: `**Indicators of Quality Earnings:**

**Positive Indicators:**
- Cash flows match earnings
- Consistent accounting policies
- Conservative revenue recognition
- Low accruals relative to cash flows

**Red Flags:**
- Growing gap between NI and CFO
- Frequent "one-time" charges
- Aggressive revenue recognition
- Significant related party transactions
- Big 4th quarter adjustments
- Growing receivables faster than sales

**Beneish M-Score:** Statistical model to detect manipulation
- 8 variables including: Asset quality, growth, depreciation changes
- Score > -2.22 suggests possible manipulation

**Altman Z-Score:** Bankruptcy prediction
- Z = 1.2(WC/TA) + 1.4(RE/TA) + 3.3(EBIT/TA) + 0.6(MVE/BVD) + 1.0(S/TA)
- Z > 2.99: Safe zone
- Z < 1.81: Distress zone`,
          formulas: [
            'Quality of Earnings = CFO / Net Income',
            'Accruals Ratio = (ΔCurrent Assets - ΔCash - ΔCL + ΔDebt) / Avg Assets',
            'Z-Score = 1.2(WC/TA) + 1.4(RE/TA) + 3.3(EBIT/TA) + 0.6(MV/BV) + 1.0(S/TA)',
          ],
          keyPoints: [
            'Quality earnings are sustainable and backed by cash',
            'Compare accrual vs. cash earnings over time',
            'Industry context matters for interpretation',
          ],
        },
        {
          id: 'cma2-sg-a4',
          title: 'Free Cash Flow Analysis',
          content: `**Free Cash Flow to Firm (FCFF):**
Cash available to all capital providers.

FCFF = EBIT(1-T) + Depreciation - CapEx - ΔWorking Capital

**Free Cash Flow to Equity (FCFE):**
Cash available to equity holders after debt service.

FCFE = NI + Depreciation - CapEx - ΔWC - Debt Repayments + New Debt

OR

FCFE = FCFF - Interest(1-T) + Net Borrowing

**Valuation Application:**
- FCFF discounted at WACC = Enterprise Value
- FCFE discounted at Cost of Equity = Equity Value

**Per Share:**
FCFE per share used for equity valuation comparable to EPS`,
          formulas: [
            'FCFF = EBIT(1-T) + D&A - CapEx - ΔWC',
            'FCFE = NI + D&A - CapEx - ΔWC + Net Borrowing',
            'Enterprise Value = PV of FCFF at WACC',
          ],
          keyPoints: [
            'FCFF is capital structure neutral',
            'FCFE directly shows cash to shareholders',
            'Negative FCF may be acceptable for high-growth companies',
          ],
        },
      ],

      examTips: [
        'Memorize key ratios and their formulas',
        'Understand cause-and-effect in DuPont analysis',
        'Know how to calculate FCFF and FCFE',
        'Recognize earnings manipulation red flags',
        'Be able to interpret ratio changes',
      ],

      commonMistakes: [
        'Using wrong denominator (average vs. ending balance)',
        'Confusing FCFF with FCFE',
        'Misinterpreting leverage ratio direction',
        'Not considering industry context',
      ],

      practiceQuestions: [
        'Calculate 3-factor DuPont components from financial statements',
        'What does declining earnings quality look like?',
        'Calculate FCFF given EBIT, tax rate, CapEx, and ΔWC',
        'Interpret an Altman Z-Score of 2.5',
      ],
    },

    // ======================================
    // SECTION B: Corporate Finance (20%)
    // ======================================
    {
      id: 'cma2-sg-b',
      title: 'Corporate Finance',
      blueprintArea: 'CMA2-B',
      weight: 20,
      duration: '25-30 hours',
      overview: 'This section covers capital structure, cost of capital, dividend policy, and raising capital. You need to understand how companies make financing decisions and calculate the weighted average cost of capital.',

      learningObjectives: [
        'Calculate cost of debt, cost of equity, and WACC',
        'Apply the CAPM model for cost of equity',
        'Understand capital structure theory (M&M, trade-off, pecking order)',
        'Evaluate dividend policies and their implications',
        'Analyze sources and types of financing',
      ],

      keyTopics: [
        {
          id: 'cma2-sg-b1',
          title: 'Cost of Capital',
          content: `**Cost of Debt (rd):**
rd = YTM on existing debt
After-tax: rd(1-T)

**Cost of Preferred Stock (rp):**
rp = Dividend / Price = Dp / P0

**Cost of Equity (re):**

**CAPM Method:**
re = rf + β(rm - rf)
Where:
- rf = Risk-free rate
- β = Beta (systematic risk)
- rm = Market return
- (rm - rf) = Market risk premium

**Dividend Growth Model (Gordon):**
re = (D1 / P0) + g
Where:
- D1 = Next dividend
- P0 = Current price
- g = Growth rate

**Bond Yield Plus Risk Premium:**
re = rd + Risk premium (typically 3-5%)

**Weighted Average Cost of Capital (WACC):**
WACC = (E/V × re) + (D/V × rd × (1-T)) + (P/V × rp)`,
          formulas: [
            'CAPM: re = rf + β(rm - rf)',
            'Gordon: re = D1/P0 + g',
            'WACC = (E/V)re + (D/V)rd(1-T)',
          ],
          examples: [
            'Calculate WACC with 60% equity at 12%, 40% debt at 8%, tax 25%',
            'Find cost of equity using CAPM with β=1.2, rf=3%, rm=10%',
          ],
          keyPoints: [
            'Use market values for weights, not book',
            'Debt cost is after-tax (interest is deductible)',
            'WACC is the hurdle rate for investment decisions',
          ],
        },
        {
          id: 'cma2-sg-b2',
          title: 'Capital Structure Theory',
          content: `**Modigliani-Miller (No Taxes):**
- Proposition I: Firm value unaffected by capital structure
- Proposition II: re increases with leverage
- re = rA + (D/E)(rA - rd)

**Modigliani-Miller (With Taxes):**
- Proposition I: VL = VU + (T × D)
- Tax shield adds value
- Implies 100% debt is optimal (unrealistic)

**Trade-Off Theory:**
- Balances tax benefits against bankruptcy costs
- Optimal debt level where marginal benefit = marginal cost
- Target debt ratio

**Pecking Order Theory:**
- Preferred financing order:
  1. Internal funds (retained earnings)
  2. Debt
  3. Equity (last resort)
- Based on information asymmetry

**Agency Costs:**
- Debt can reduce agency costs of free cash flow
- But also creates bondholder-shareholder conflicts`,
          keyPoints: [
            'Perfect markets: structure doesn\'t matter',
            'Real world: taxes and costs make it matter',
            'Optimal structure balances multiple factors',
          ],
        },
        {
          id: 'cma2-sg-b3',
          title: 'Dividend Policy',
          content: `**Dividend Theories:**

**Dividend Irrelevance (M&M):**
- In perfect markets, dividends don't matter
- Investors can create "homemade dividends"

**Bird-in-Hand Theory:**
- Investors prefer certain dividends over uncertain capital gains
- Lower re for dividend-paying firms

**Tax Preference Theory:**
- Capital gains taxed lower/deferred
- Investors prefer retention

**Signaling Theory:**
- Dividend changes convey information
- Increases signal confidence
- Cuts signal troubles

**Dividend Types:**
- Regular cash dividends
- Special dividends
- Stock dividends (2-25%)
- Stock splits (>25%)
- Share repurchases

**Key Metrics:**
- Payout Ratio = Dividends / Net Income
- Dividend Yield = DPS / Stock Price
- Retention Ratio = 1 - Payout Ratio

**Sustainable Growth Rate:**
g = ROE × Retention Ratio`,
          formulas: [
            'Payout Ratio = Dividends / Net Income',
            'Retention = 1 - Payout',
            'Sustainable Growth = ROE × Retention',
          ],
          keyPoints: [
            'Signaling effect is powerful',
            'Sticky dividends - hard to cut once established',
            'Repurchases offer flexibility',
          ],
        },
        {
          id: 'cma2-sg-b4',
          title: 'Raising Capital',
          content: `**Equity Financing:**

**IPO (Initial Public Offering):**
- First sale to public
- Underwriting process
- SEC registration required
- Significant costs (7% typical)

**SEO (Seasoned Offering):**
- Additional shares from public company
- Shelf registration possible
- May signal overvaluation

**Private Placement:**
- Sale to qualified investors
- Less regulation (Rule 144A)
- Lower costs but less liquidity

**Debt Financing:**

**Bank Loans:**
- Term loans
- Revolving credit
- Covenants and collateral

**Bonds:**
- Investment grade vs. high yield
- Covenants (affirmative, negative)
- Call provisions, sinking funds

**Lease Financing:**
- Finance lease: Like ownership
- Operating lease: Now on balance sheet too (ASC 842)

**Hybrid Financing:**
- Convertible bonds
- Preferred stock
- Warrants`,
          keyPoints: [
            'Equity is expensive but no fixed obligation',
            'Debt is cheaper (tax shield) but risky',
            'IPO costs average 7% of proceeds',
          ],
        },
      ],

      examTips: [
        'Know CAPM cold - very heavily tested',
        'Practice WACC calculations with different scenarios',
        'Understand the logic of each capital structure theory',
        'Know dividend policy implications',
        'Be able to calculate cost of equity using multiple methods',
      ],

      commonMistakes: [
        'Forgetting tax adjustment on debt cost',
        'Using book values instead of market values for WACC',
        'Confusing sustainable growth with required growth',
        'Misremembering CAPM formula',
      ],

      practiceQuestions: [
        'Calculate cost of equity using CAPM and Gordon model',
        'What is optimal capital structure under trade-off theory?',
        'Should a firm with 20% ROE and 40% payout ratio borrow to grow faster?',
        'Calculate WACC given debt and equity market values and costs',
      ],
    },

    // ======================================
    // SECTION C: Decision Analysis (25%)
    // ======================================
    {
      id: 'cma2-sg-c',
      title: 'Decision Analysis',
      blueprintArea: 'CMA2-C',
      weight: 25,
      duration: '30-35 hours',
      overview: 'This is the highest-weighted section. It covers capital budgeting techniques, risk analysis, and decision-making under uncertainty. You must master NPV, IRR, and related techniques.',

      learningObjectives: [
        'Calculate NPV, IRR, MIRR, payback, and profitability index',
        'Apply sensitivity, scenario, and simulation analysis',
        'Evaluate mutually exclusive projects with unequal lives',
        'Understand real options in capital budgeting',
        'Make decisions under uncertainty using expected values',
      ],

      keyTopics: [
        {
          id: 'cma2-sg-c1',
          title: 'Capital Budgeting Methods',
          content: `**Net Present Value (NPV):**
NPV = Σ [CFt / (1+r)^t] - Initial Investment

- Accept if NPV > 0
- Best theoretical method
- Assumes reinvestment at WACC

**Internal Rate of Return (IRR):**
Rate that makes NPV = 0

- Accept if IRR > WACC
- Can have multiple solutions
- Assumes reinvestment at IRR

**Modified IRR (MIRR):**
Corrects IRR's reinvestment assumption

MIRR = (FV of inflows / PV of outflows)^(1/n) - 1

**Payback Period:**
Time to recover initial investment

- Simple payback ignores TVM
- Discounted payback uses PV

**Profitability Index (PI):**
PI = PV of Future Cash Flows / Initial Investment
PI = 1 + (NPV / Investment)

- Accept if PI > 1.0
- Useful for capital rationing`,
          formulas: [
            'NPV = Σ[CFt/(1+r)^t] - I0',
            'IRR: NPV = 0',
            'MIRR = (FV/PV)^(1/n) - 1',
            'PI = 1 + NPV/I0',
          ],
          examples: [
            'Calculate NPV with uneven cash flows',
            'Find IRR using interpolation',
            'Compare mutually exclusive projects',
          ],
          keyPoints: [
            'NPV wins in conflicts between methods',
            'IRR may have multiple solutions with unconventional cash flows',
            'PI ranks projects for capital rationing',
          ],
        },
        {
          id: 'cma2-sg-c2',
          title: 'Cash Flow Estimation',
          content: `**Relevant Cash Flows:**
- Incremental (with vs. without project)
- After-tax
- Include opportunity costs
- Exclude sunk costs

**Initial Investment:**
- Purchase price
- Installation and shipping
- Net working capital increase
- After-tax proceeds from replaced asset

**Operating Cash Flows:**
OCF = (Revenue - Costs)(1-T) + Depreciation × T
OCF = EBIT(1-T) + Depreciation

**Terminal Cash Flow:**
- After-tax salvage value
- Recovery of working capital
- Clean-up costs

**Depreciation Tax Shield:**
Tax Savings = Depreciation × Tax Rate

MACRS depreciation commonly used (varies by asset class)`,
          formulas: [
            'OCF = (Rev - Costs)(1-T) + Dep×T',
            'Tax Shield = Depreciation × T',
            'Terminal Value = Salvage(1-T) + T×Book Value',
          ],
          keyPoints: [
            'Sunk costs are never relevant',
            'Opportunity cost = value of next best alternative',
            'Terminal value often significant portion of NPV',
          ],
        },
        {
          id: 'cma2-sg-c3',
          title: 'Risk Analysis in Capital Budgeting',
          content: `**Sensitivity Analysis:**
- Change ONE variable at a time
- Measure impact on NPV
- Tornado diagram shows most sensitive variables

**Scenario Analysis:**
- Test specific scenarios (base, best, worst)
- Change MULTIPLE variables together
- More realistic than sensitivity

**Monte Carlo Simulation:**
- Assign probability distributions to inputs
- Run thousands of iterations
- Get NPV distribution

**Decision Trees:**
- Map sequential decisions
- Calculate expected values
- Work backward from end nodes
- Include option value

**Real Options:**
Types of managerial flexibility:
1. Option to delay
2. Option to expand
3. Option to abandon
4. Option to contract
5. Option to switch

Total Project Value = Base NPV + Option Value`,
          formulas: [
            'Expected Value = Σ(Probability × Outcome)',
            'Expected NPV = Σ(Prob × NPV for each scenario)',
          ],
          keyPoints: [
            'Traditional NPV ignores flexibility value',
            'Real options add value in uncertain environments',
            'Decision trees good for sequential decisions',
          ],
        },
        {
          id: 'cma2-sg-c4',
          title: 'Special Decision Situations',
          content: `**Mutually Exclusive Projects:**
- Can only select one
- Use NPV (not IRR) for ranking
- NPV conflicts arise from scale or timing

**Unequal Lives:**

**Replacement Chain:**
- Repeat projects to common life
- Compare NPVs of equivalent spans

**Equivalent Annual Annuity (EAA):**
EAA = NPV / PVIFA
- Convert NPV to annual equivalent
- Choose higher EAA

**Capital Rationing:**
- Limited capital available
- Rank by PI (not NPV)
- May need integer programming for indivisible projects

**Inflation:**
- Use nominal cash flows with nominal rate
- OR real cash flows with real rate
- Fisher: (1+nominal) = (1+real)(1+inflation)`,
          formulas: [
            'EAA = NPV / PVIFA(r,n)',
            'Fisher: (1+r nominal) = (1+r real)(1+inflation)',
          ],
          keyPoints: [
            'Never compare NPVs of projects with different lives directly',
            'EAA assumes project repetition',
            'PI ratio best for capital rationing',
          ],
        },
      ],

      examTips: [
        'This is 25% of the exam - master it!',
        'Know NPV calculation cold',
        'Understand when IRR gives wrong answer',
        'Practice cash flow estimation including taxes',
        'Be able to calculate EAA for unequal lives',
        'Know the types of real options',
      ],

      commonMistakes: [
        'Forgetting to include working capital recovery at end',
        'Using IRR to rank mutually exclusive projects',
        'Including sunk costs in analysis',
        'Mixing nominal and real rates/cash flows',
        'Comparing NPVs of projects with different lives',
      ],

      practiceQuestions: [
        'Calculate NPV for a 5-year project with given cash flows',
        'Which method wins when NPV and IRR conflict?',
        'Calculate EAA for projects with 3-year vs. 5-year lives',
        'What is the value of the option to abandon?',
        'Prepare cash flow for replacement decision with trade-in',
      ],
    },

    // ======================================
    // SECTION D: Risk Management (10%)
    // ======================================
    {
      id: 'cma2-sg-d',
      title: 'Risk Management',
      blueprintArea: 'CMA2-D',
      weight: 10,
      duration: '12-15 hours',
      overview: 'This section covers enterprise risk management, financial risk, and hedging strategies. You need to understand how to identify, measure, and manage various types of risk.',

      learningObjectives: [
        'Identify types of risk (market, credit, operational, strategic)',
        'Apply ERM frameworks',
        'Understand hedging with derivatives',
        'Calculate expected value and standard deviation for risk',
        'Evaluate risk response strategies',
      ],

      keyTopics: [
        {
          id: 'cma2-sg-d1',
          title: 'Types of Risk',
          content: `**Financial Risks:**

**Market Risk:**
- Interest rate risk
- Exchange rate risk  
- Commodity price risk
- Equity price risk

**Credit Risk:**
- Default risk
- Counterparty risk
- Settlement risk

**Liquidity Risk:**
- Funding liquidity
- Market/asset liquidity

**Operational Risks:**

**Business Disruption:**
- Supply chain
- Technology failure
- Natural disasters

**Process Risk:**
- Fraud, errors
- Compliance failures

**Strategic Risks:**

- Competitive changes
- Technology disruption
- Regulatory changes
- Reputation damage`,
          keyPoints: [
            'Systematic risk cannot be diversified away',
            'Unsystematic risk can be reduced through diversification',
            'ERM takes holistic view of all risks',
          ],
        },
        {
          id: 'cma2-sg-d2',
          title: 'Risk Measurement',
          content: `**Probability and Expected Value:**

Expected Value = Σ(Probability × Outcome)

**Variance and Standard Deviation:**

Variance = Σ[Pi × (Outcome - EV)²]
Standard Deviation = √Variance

**Coefficient of Variation:**
CV = σ / Expected Value
- Measures relative risk
- Lower CV = lower relative risk
- Useful for comparing different-size projects

**Value at Risk (VaR):**
Maximum expected loss at a given confidence level over specified time.

Example: $1M 1-day VaR at 95% means:
"95% confident loss won't exceed $1M in one day"

**Beta:**
β = Cov(Ri, Rm) / Var(Rm)
- Measures systematic risk
- β=1: Same as market
- β>1: More volatile than market`,
          formulas: [
            'EV = Σ(Pi × Oi)',
            'σ = √Σ[Pi × (Oi - EV)²]',
            'CV = σ / EV',
            'β = Cov(Ri,Rm) / Var(Rm)',
          ],
          keyPoints: [
            'Standard deviation measures total risk',
            'Beta measures systematic risk only',
            'CV allows comparison across scales',
          ],
        },
        {
          id: 'cma2-sg-d3',
          title: 'Hedging with Derivatives',
          content: `**Forward Contracts:**
- Customized OTC agreements
- Obligation to buy/sell at future date
- No upfront cost
- Counterparty risk

**Futures Contracts:**
- Standardized, exchange-traded
- Daily settlement (mark-to-market)
- Margin requirements
- Less counterparty risk

**Options:**
- Right, not obligation
- Call: Right to buy
- Put: Right to sell
- Premium paid upfront
- Limited downside risk

**Swaps:**
- Exchange of cash flows
- Interest rate swaps (fix vs. float)
- Currency swaps
- Longer-term hedging

**Hedging Strategies:**

**Interest Rate Risk:**
- Interest rate swaps
- Caps, floors, collars

**Currency Risk:**
- Forward contracts
- Currency options
- Natural hedging

**Commodity Risk:**
- Futures contracts
- Fixed-price contracts`,
          keyPoints: [
            'Hedging reduces risk but also potential upside',
            'Options provide insurance with limited cost',
            'Natural hedging: match currency of revenues and costs',
          ],
        },
        {
          id: 'cma2-sg-d4',
          title: 'Risk Response Strategies',
          content: `**TARA Framework:**

**T - Transfer:**
- Insurance
- Hedging
- Outsourcing
- Indemnity clauses

**A - Avoid:**
- Exit the activity
- Don't enter new market
- Divest business unit

**R - Reduce (Mitigate):**
- Internal controls
- Diversification
- Training
- Quality programs

**A - Accept:**
- Self-insure
- Create reserves
- Accept residual risk

**Decision Factors:**
- Risk appetite/tolerance
- Cost-benefit of response
- Risk magnitude (likelihood × impact)
- Control effectiveness`,
          keyPoints: [
            'Response should match risk level',
            'Accept only risks within tolerance',
            'Transfer doesn\'t eliminate risk, just shifts it',
          ],
        },
      ],

      examTips: [
        'Know how to calculate expected value and standard deviation',
        'Understand what each derivative type does',
        'Remember TARA for risk responses',
        'Know the difference between systematic and unsystematic risk',
        'Understand hedging objectives (reduce variability)',
      ],

      commonMistakes: [
        'Confusing forwards with futures',
        'Thinking hedging eliminates risk entirely',
        'Forgetting option premiums in calculations',
        'Mixing up call vs. put for hedging',
      ],

      practiceQuestions: [
        'Calculate expected value and standard deviation for an investment',
        'Should a company use futures or options to hedge commodity risk?',
        'What type of swap would convert floating-rate debt to fixed?',
        'Recommend risk responses for specific scenarios',
      ],
    },

    // ======================================
    // SECTION E: Investment Decisions (10%)
    // ======================================
    {
      id: 'cma2-sg-e',
      title: 'Investment Decisions',
      blueprintArea: 'CMA2-E',
      weight: 10,
      duration: '12-15 hours',
      overview: 'This section covers working capital management, short-term finance, and mergers and acquisitions. You need to understand how to manage current assets and liabilities and evaluate M&A opportunities.',

      learningObjectives: [
        'Calculate cash conversion cycle and manage working capital',
        'Evaluate inventory management using EOQ',
        'Analyze credit policy decisions',
        'Understand mergers, acquisitions, and divestitures',
        'Apply valuation techniques in M&A',
      ],

      keyTopics: [
        {
          id: 'cma2-sg-e1',
          title: 'Working Capital Management',
          content: `**Cash Conversion Cycle:**
CCC = DIO + DSO - DPO

**Days Inventory Outstanding (DIO):**
DIO = (Avg Inventory / COGS) × 365

**Days Sales Outstanding (DSO):**
DSO = (Avg AR / Sales) × 365

**Days Payables Outstanding (DPO):**
DPO = (Avg AP / COGS) × 365

**Interpretation:**
- Lower CCC = Less cash tied up
- Negative CCC = Get paid before paying suppliers
- Example: Amazon has negative CCC

**Working Capital = Current Assets - Current Liabilities

**Net Operating Working Capital:**
NOWC = Operating CA - Operating CL
(Excludes cash and debt)

**Strategies:**
- Conservative: High current assets, low risk, low return
- Aggressive: Low current assets, high risk, high return`,
          formulas: [
            'CCC = DIO + DSO - DPO',
            'DIO = (Inventory/COGS) × 365',
            'DSO = (AR/Sales) × 365',
            'DPO = (AP/COGS) × 365',
          ],
          keyPoints: [
            'Working capital management balances liquidity and profitability',
            'Excess working capital earns low returns',
            'Insufficient working capital risks insolvency',
          ],
        },
        {
          id: 'cma2-sg-e2',
          title: 'Inventory and Cash Management',
          content: `**Economic Order Quantity (EOQ):**

EOQ = √(2DS / H)

Where:
- D = Annual demand
- S = Ordering cost per order
- H = Holding cost per unit per year

**Reorder Point:**
ROP = (Daily usage × Lead time) + Safety stock

**Total Inventory Cost:**
TC = (D/Q × S) + (Q/2 × H)

**Cash Management:**

**Baumol Model:**
Optimal cash = √(2×TP×F / r)
Where:
- TP = Total cash needed
- F = Transaction cost
- r = Interest rate

**Miller-Orr Model:**
- Sets upper and lower bounds
- Return point = Lower + (Spread/3)
- For variable cash flows`,
          formulas: [
            'EOQ = √(2DS/H)',
            'ROP = Daily usage × Lead time + Safety',
            'Baumol: C* = √(2×TP×F/r)',
          ],
          keyPoints: [
            'EOQ minimizes total inventory cost',
            'Trade-off: Ordering costs vs. holding costs',
            'Safety stock prevents stockouts',
          ],
        },
        {
          id: 'cma2-sg-e3',
          title: 'Short-Term Finance',
          content: `**Trade Credit:**
Terms: 2/10, net 30
- 2% discount if paid in 10 days
- Full payment due in 30 days

**Cost of Not Taking Discount:**
Cost = (D% / (100-D%)) × (365 / (Net - Disc days))

Example 2/10, net 30:
Cost = (2/98) × (365/20) = 37.2%

**Bank Financing:**

**Line of Credit:**
- Committed vs. uncommitted
- Compensating balance may apply
- Revolver with commitment fee

**Effective Interest Rate:**

Simple: r = Interest / Principal

Discount Loan: r = Interest / (Principal - Interest)

With Compensating Balance: r = Interest / (Principal - Balance)

**Commercial Paper:**
- Short-term unsecured debt
- Lower rate than bank loans
- Companies with strong credit`,
          formulas: [
            'Trade Credit Cost = (D%/(100-D%)) × (365/(Net-Disc))',
            'Effective Rate (discount) = Interest / Net Proceeds',
          ],
          keyPoints: [
            'Trade credit cost often very high - take discounts!',
            'Bank lines provide flexibility',
            'Commercial paper cheapest for large companies',
          ],
        },
        {
          id: 'cma2-sg-e4',
          title: 'Mergers and Acquisitions',
          content: `**Types of Mergers:**

**Horizontal:** Same industry, competitors
**Vertical:** Supply chain (supplier/customer)
**Conglomerate:** Unrelated businesses

**Motives:**
- Synergies (2+2 = 5)
- Market power
- Diversification
- Tax benefits
- Management hubris (often bad)

**Valuation Methods:**

**Comparable Companies:**
- P/E, EV/EBITDA, EV/Sales
- Apply multiples to target

**Discounted Cash Flow:**
- Project target's cash flows
- Discount at appropriate rate

**Transaction Multiples:**
- Look at similar deals
- Premium over market price

**Key M&A Terms:**
- Control premium: 20-40% typical
- Synergies: Cost savings + revenue enhancement
- Goodwill = Purchase price - Fair value of net assets
- Due diligence: Pre-deal investigation`,
          formulas: [
            'Equity Value = P/E × Target EPS',
            'Enterprise Value = EV/EBITDA × Target EBITDA',
            'Goodwill = Purchase Price - FV of Net Assets',
          ],
          keyPoints: [
            'Synergies often overestimated',
            'Integration is hardest part',
            'Due diligence critical to avoid surprises',
          ],
        },
      ],

      examTips: [
        'Know cash conversion cycle cold',
        'Practice EOQ calculations',
        'Calculate trade credit cost - it comes up often',
        'Understand M&A valuation approaches',
        'Know why M&A deals fail (integration, overpayment)',
      ],

      commonMistakes: [
        'Forgetting to subtract DPO from CCC',
        'Using wrong variables in EOQ',
        'Not recognizing high cost of skipping discounts',
        'Confusing equity value with enterprise value',
      ],

      practiceQuestions: [
        'Calculate CCC given inventory, AR, AP, sales, and COGS',
        'Calculate EOQ and total cost',
        'What is the effective rate of a discount loan?',
        'Value a target using P/E multiple',
      ],
    },

    // ======================================
    // SECTION F: Professional Ethics (15%)
    // ======================================
    {
      id: 'cma2-sg-f',
      title: 'Professional Ethics',
      blueprintArea: 'CMA2-F',
      weight: 15,
      duration: '18-22 hours',
      overview: 'This section covers ethical considerations for management accountants, including the IMA Statement of Ethical Professional Practice. You need to understand ethical frameworks and how to handle ethical conflicts.',

      learningObjectives: [
        'Apply IMA\'s four Standards of Ethical Conduct',
        'Follow IMA\'s ethical conflict resolution process',
        'Understand corporate governance principles',
        'Recognize fraud indicators and prevention',
        'Demonstrate ethical decision-making frameworks',
      ],

      keyTopics: [
        {
          id: 'cma2-sg-f1',
          title: 'IMA Standards of Ethical Conduct',
          content: `**CCIC - Four Standards:**

**1. COMPETENCE:**
- Maintain professional expertise through continuing education
- Perform professional duties in accordance with laws, regulations, and standards
- Provide decision support information that is accurate, clear, concise, and timely
- Recognize professional limitations

**2. CONFIDENTIALITY:**
- Keep information confidential unless disclosure is authorized or legally required
- Inform subordinates about confidentiality obligations
- Refrain from using confidential information for personal advantage

**3. INTEGRITY:**
- Mitigate conflicts of interest and avoid actual conflicts
- Refrain from conduct that would prejudice carrying out duties ethically
- Abstain from activities that might discredit the profession
- Refrain from any criminal or fraudulent activity

**4. CREDIBILITY:**
- Communicate information fairly and objectively
- Disclose all material information that could influence users' understanding
- Report professional limitations or constraints that might impact judgment`,
          keyPoints: [
            'Standards apply to all aspects of professional activities',
            'Must maintain competence through CPE',
            'Conflicts of interest must be disclosed or avoided',
          ],
        },
        {
          id: 'cma2-sg-f2',
          title: 'Ethical Conflict Resolution',
          content: `**IMA Resolution Process:**

**Step 1: Discuss with Supervisor**
- Unless supervisor is involved in the issue
- Document the discussion

**Step 2: Clarify with IMA Ethics Counselor**
- Confidential resource
- Help understand ethical issues
- 800-245-1383

**Step 3: Consult Organization's Ethics Committee/Hotline**
- Follow internal procedures
- Use anonymous reporting if available

**Step 4: Consider Legal Counsel**
- Understand legal obligations
- Especially for potential whistleblowing

**Step 5: Resignation (if unresolved)**
- May be appropriate if issue is material
- Do NOT go public without legal advice
- Maintain confidentiality throughout

**Key Points:**
- Document everything
- Follow chain of command when appropriate
- Seek guidance before acting
- Protect yourself legally`,
          keyPoints: [
            'Always try internal resolution first',
            'Document all steps taken',
            'Never violate confidentiality without legal guidance',
          ],
        },
        {
          id: 'cma2-sg-f3',
          title: 'Corporate Governance',
          content: `**Key Governance Principles:**

**Board of Directors:**
- Majority independent directors recommended
- Separation of CEO and Chair roles
- Board committees: Audit, Compensation, Nominating

**Audit Committee:**
- 100% independent members
- Financial expert required
- Oversees external auditor
- Reviews internal controls
- Addresses whistleblower concerns

**Executive Compensation:**
- Align with shareholder interests
- Long-term incentives
- Clawback provisions
- Say-on-pay votes

**Shareholder Rights:**
- Voting rights
- Access to information
- Equal treatment
- Proxy access

**Key Legislation:**
- Sarbanes-Oxley Act (SOX) 2002
- Dodd-Frank Act 2010
- NYSE/NASDAQ listing requirements`,
          keyPoints: [
            'Good governance protects shareholders',
            'SOX significantly increased requirements',
            'Board independence is cornerstone',
          ],
        },
        {
          id: 'cma2-sg-f4',
          title: 'Fraud Prevention and Detection',
          content: `**Fraud Triangle (POR):**

**1. Pressure/Incentive:**
- Financial difficulties
- Meeting targets/bonuses
- Lifestyle expectations
- Addiction issues

**2. Opportunity:**
- Weak internal controls
- Override authority
- Lack of segregation of duties
- Poor oversight

**3. Rationalization:**
- "Everyone does it"
- "I'll pay it back"
- "Company owes me"
- "No one gets hurt"

**Fraud Prevention:**

**Controls:**
- Segregation of duties
- Authorization requirements
- Independent reconciliations
- Surprise audits

**Culture:**
- Tone at the top
- Code of conduct
- Whistleblower hotline
- Background checks

**Red Flags:**
- Living beyond means
- Financial difficulties
- Control weaknesses
- Unusual behavior
- Reluctance to share duties`,
          keyPoints: [
            'Address all three sides of triangle',
            'Culture is first line of defense',
            'Internal controls reduce opportunity',
          ],
        },
      ],

      examTips: [
        'Memorize CCIC standards - very heavily tested',
        'Know the resolution steps in order',
        'Understand the Fraud Triangle',
        'Be able to apply ethics to scenarios',
        'Know key SOX provisions',
      ],

      commonMistakes: [
        'Going public before exhausting internal options',
        'Confusing the four ethical standards',
        'Not recognizing conflicts of interest',
        'Skipping steps in resolution process',
      ],

      practiceQuestions: [
        'Which IMA standard is violated in each scenario?',
        'What are the proper steps when supervisor is involved in issue?',
        'Identify fraud triangle elements in a case',
        'What should audit committee members possess?',
      ],
    },
  ],

  studyPlan: [
    {
      week: 1,
      focus: 'Financial Statement Analysis (A)',
      hours: 20,
      topics: ['Ratio analysis', 'DuPont decomposition', 'Earnings quality'],
      activities: ['Complete all ratio calculations', 'Practice 50 MCQs'],
    },
    {
      week: 2,
      focus: 'Financial Analysis (A) & Corporate Finance (B)',
      hours: 20,
      topics: ['Free cash flow', 'Cost of capital', 'CAPM'],
      activities: ['Master FCF calculations', 'Know CAPM cold'],
    },
    {
      week: 3,
      focus: 'Corporate Finance (B)',
      hours: 20,
      topics: ['WACC', 'Capital structure theory', 'Dividend policy'],
      activities: ['Practice WACC calculations', 'Understand M&M'],
    },
    {
      week: 4,
      focus: 'Decision Analysis (C)',
      hours: 25,
      topics: ['NPV', 'IRR', 'Payback', 'Cash flow estimation'],
      activities: ['Master capital budgeting methods', 'Practice 100 MCQs'],
    },
    {
      week: 5,
      focus: 'Decision Analysis (C)',
      hours: 25,
      topics: ['Risk analysis', 'Sensitivity', 'Real options', 'Unequal lives'],
      activities: ['Complete EAA practice', 'Understand real options'],
    },
    {
      week: 6,
      focus: 'Risk Management (D) & Investment Decisions (E)',
      hours: 20,
      topics: ['Derivatives', 'Working capital', 'EOQ', 'M&A'],
      activities: ['Know hedging instruments', 'Master CCC'],
    },
    {
      week: 7,
      focus: 'Professional Ethics (F)',
      hours: 20,
      topics: ['IMA standards', 'Conflict resolution', 'Governance', 'Fraud'],
      activities: ['Memorize CCIC', 'Practice ethics scenarios'],
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
    'Decision Analysis (25%) deserves extra time',
    'Read every answer choice before selecting',
    'Watch for "NOT" or "EXCEPT" in questions',
    'For ethics questions, always choose the most conservative option',
    'Trust your first instinct on review unless clearly wrong',
    'Take deep breaths if you feel overwhelmed',
  ],
};

export default CMA2_STUDY_GUIDE;

/**
 * CMA Part 2 Essays - Extended Scenarios
 * 
 * Additional essay/written communication scenarios to balance Part 2
 * coverage with Part 1 (which has 17 essays).
 * 
 * Blueprint Areas Covered:
 * - CMA2-A: Financial Statement Analysis (2 additional)
 * - CMA2-B: Corporate Finance (3 new)
 * - CMA2-C: Decision Analysis (2 additional)
 * - CMA2-D: Risk Management (2 additional)
 * - CMA2-E: Investment Decisions (2 additional)
 * - CMA2-F: Professional Ethics (1 additional)
 */

import { WCTask } from '../../../types';

export const CMA2_ESSAYS_EXTENDED: WCTask[] = [
  // ==========================================
  // CMA2-A: Financial Statement Analysis
  // ==========================================
  {
    id: 'cma2-wc-006',
    section: 'CMA2',
    type: 'written_communication',
    topic: 'DuPont Analysis - ROE Decomposition',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'CMA2-A',
    scenario: `You are a financial analyst reviewing two competitors in the retail industry.

Company A:
- Net Profit Margin: 2%
- Asset Turnover: 3.0x
- Equity Multiplier: 2.5x
- ROE: 15%

Company B:
- Net Profit Margin: 8%
- Asset Turnover: 1.5x
- Equity Multiplier: 1.25x
- ROE: 15%

The CEO of Company A says, "We have the same ROE as Company B, so we're equally profitable and equally well-managed."`,
    task: `Write an analysis that:
1. Explains the DuPont formula and its three components.
2. Analyzes how each company achieves its 15% ROE (their strategic approach).
3. Identifies the risks inherent in each company's approach.
4. Recommends which company represents a better long-term investment and why.`,
    keyPoints: [
      'DuPont: ROE = Profit Margin × Asset Turnover × Equity Multiplier',
      'Company A: Low margin, high volume, high leverage strategy',
      'Company B: High margin, lower volume, conservative leverage',
      'Risk assessment: leverage risk vs operational efficiency',
    ],
    sampleResponse: `FINANCIAL ANALYSIS REPORT

TO: Investment Committee
FROM: [Candidate Name], Financial Analyst
DATE: [Current Date]
RE: DuPont Analysis - Company A vs Company B

While both companies report identical 15% ROE, the underlying drivers reveal fundamentally different business models and risk profiles.

DUPONT DECOMPOSITION

ROE = Net Profit Margin × Asset Turnover × Equity Multiplier

Company A: 2% × 3.0 × 2.5 = 15%
Company B: 8% × 1.5 × 1.25 = 15%

STRATEGIC ANALYSIS

Company A operates a "High Volume, Low Margin" model:
- Thin 2% margins suggest commodity-like products or intense competition
- 3.0x asset turnover indicates efficient asset utilization (fast inventory turn)
- 2.5x equity multiplier means significant debt (60% debt financing)

Company B operates a "Premium Margin, Conservative" model:
- 8% margins suggest pricing power or differentiation
- 1.5x turnover is moderate
- 1.25x multiplier indicates conservative financing (20% debt)

RISK ASSESSMENT

Company A's Risks:
1. Leverage Risk: With 2.5x equity multiplier, a downturn could threaten solvency
2. Margin Compression: 2% margin leaves no cushion for cost increases
3. Volume Dependency: Any sales decline immediately hurts profitability

Company B's Risks:
1. Competitive Pressure: Premium margins may attract competition
2. Growth Limitations: Conservative leverage may limit expansion capital

RECOMMENDATION

Company B represents the superior long-term investment. Its ROE is achieved through operational excellence (earning higher margins) rather than financial engineering (leverage). In an economic downturn, Company A's thin margins and high debt could result in losses or even bankruptcy, while Company B has cushion in both profitability and capital structure.

The CEO's statement that "equal ROE means equal quality" is incorrect. Quality of ROE matters as much as quantity.`,
    rubric: {
      organization: { weight: 30, criteria: [
        'Uses proper financial analysis report format',
        'Separates DuPont decomposition, strategic analysis, and risk assessment into sections',
        'Follows logical flow from formula explanation to investment recommendation',
        'Provides clear comparative framework for both companies',
      ]},
      development: { weight: 40, criteria: [
        'Correctly states and applies the DuPont formula (ROE = Margin × Turnover × Multiplier)',
        'Analyzes each company\'s strategic model using the three DuPont components',
        'Identifies leverage risk for Company A and competitive risk for Company B',
        'Explains why equal ROE does not mean equal quality or risk',
        'Supports investment recommendation with risk-adjusted reasoning',
      ]},
      expression: { weight: 30, criteria: [
        'Maintains professional financial analyst tone',
        'Uses correct financial analysis terminology (equity multiplier, asset turnover, ROE)',
        'Presents decomposition calculations clearly and comparatively',
        'Demonstrates proper grammar and analytical writing style',
      ]},
    },
  },
  {
    id: 'cma2-wc-007',
    section: 'CMA2',
    type: 'written_communication',
    topic: 'Cash Flow Analysis - Quality of Earnings',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'CMA2-A',
    scenario: `TechStart Inc. has reported the following for three consecutive years:

Year 1: Net Income $5M, Operating Cash Flow $4M, CapEx $1M
Year 2: Net Income $8M, Operating Cash Flow $3M, CapEx $1M
Year 3: Net Income $12M, Operating Cash Flow ($2M), CapEx $1M

The CEO proudly reports: "We've achieved 140% net income growth over three years! Investors should be thrilled."

An analyst notes that Accounts Receivable grew from $10M to $45M over the same period, while Revenue grew from $50M to $85M.`,
    task: `Write a memo to the Board of Directors that:
1. Analyzes the divergence between net income and operating cash flow.
2. Evaluates the quality of reported earnings.
3. Explains the implications of the receivables growth pattern.
4. Identifies potential red flags that warrant investigation.
5. Recommends next steps.`,
    keyPoints: [
      'Earnings quality divergence (Income up, OCF down)',
      'Receivables growing faster than revenue (DSO expansion)',
      'Possible channel stuffing or collection problems',
      'Free Cash Flow (OCF - CapEx) analysis',
    ],
    sampleResponse: `MEMORANDUM

TO: Board of Directors
FROM: [Candidate Name], Financial Analyst
DATE: [Current Date]
RE: Earnings Quality Concerns - TechStart Inc.

I am writing to raise significant concerns about the quality of TechStart's reported earnings growth.

CONCERNING TRENDS

While net income grew from $5M to $12M (140% increase), operating cash flow collapsed from $4M to negative $2M. This divergence is a classic warning sign of earnings quality problems.

Free Cash Flow (OCF - CapEx):
- Year 1: $4M - $1M = $3M
- Year 2: $3M - $1M = $2M
- Year 3: -$2M - $1M = -$3M

The company is now consuming cash to operate, despite record "profits."

RECEIVABLES ANALYSIS

The root cause appears to be accounts receivable:
- Receivables grew 350% ($10M to $45M) while revenue grew only 70% ($50M to $85M)

Days Sales Outstanding (DSO):
- Year 1: ($10M / $50M) × 365 = 73 days
- Year 3: ($45M / $85M) × 365 = 193 days

Collection periods have nearly tripled. This suggests:
1. Channel Stuffing: Sales may be booked to distributors who can't pay
2. Collection Problems: Customers may be disputing invoices or facing financial trouble
3. Aggressive Recognition: Revenue may be recognized prematurely

RED FLAGS REQUIRING INVESTIGATION

1. Top customer concentration and payment history
2. Allowance for doubtful accounts (is it adequate?)
3. Revenue recognition policies and any recent changes
4. Related party transactions
5. Management compensation tied to earnings targets

RECOMMENDATIONS

1. Immediately engage external forensic accountants to review receivables
2. Age the receivables portfolio and evaluate collectibility
3. Consider restating guidance until cash flow improves
4. Review sales incentive structures that may encourage aggressive booking

The CEO's celebration of net income growth ignores the fundamental principle: "Cash is king." Without positive operating cash flow, these earnings may prove illusory.`,
    rubric: {
      organization: { weight: 30, criteria: [
        'Uses proper memo format addressed to Board of Directors',
        'Organizes into divergence analysis, receivables analysis, red flags, and recommendations',
        'Follows logical flow from data observation to investigation recommendations',
        'Includes clear executive summary of concerns',
      ]},
      development: { weight: 40, criteria: [
        'Analyzes the divergence between rising net income and declining operating cash flow',
        'Calculates Free Cash Flow trend (positive to negative) over three years',
        'Computes DSO expansion and compares receivables growth to revenue growth',
        'Identifies specific red flags (channel stuffing, aggressive recognition, collection problems)',
        'Proposes concrete investigation steps including forensic accounting',
      ]},
      expression: { weight: 30, criteria: [
        'Maintains professional and appropriately urgent analytical tone',
        'Uses correct financial reporting terminology (OCF, DSO, earnings quality)',
        'Presents trend data clearly with year-over-year comparisons',
        'Demonstrates proper grammar and precise factual language',
      ]},
    },
  },

  // ==========================================
  // CMA2-B: Corporate Finance
  // ==========================================
  {
    id: 'cma2-wc-008',
    section: 'CMA2',
    type: 'written_communication',
    topic: 'Dividend Policy - Signal and Strategy',
    difficulty: 'medium',
    estimatedTime: 25,
    blueprintArea: 'CMA2-B',
    scenario: `MatureCo Industries is a stable company with:
- Net Income: $100 million
- Current Dividend: $40 million (40% payout ratio)
- Cash on Balance Sheet: $200 million
- Debt/Equity Ratio: 0.5 (conservative)
- Limited growth opportunities in core business

The CEO proposes three alternatives:
A. Increase dividend payout to 60% ($60 million)
B. Implement a stock buyback program ($100 million)
C. Acquire a fast-growing startup for $150 million

The CFO argues: "According to Modigliani-Miller, dividend policy is irrelevant. We should just do nothing."`,
    task: `Write a memo to the CEO that:
1. Explains why M-M dividend irrelevance may not apply in practice.
2. Analyzes the pros and cons of each alternative.
3. Discusses the signaling implications of each choice.
4. Recommends a capital allocation strategy.`,
    keyPoints: [
      'M-M assumptions don\'t hold (taxes, information asymmetry)',
      'Dividend increase signals confidence but commits future cash',
      'Buybacks offer flexibility and tax efficiency',
      'Acquisition could create or destroy value',
    ],
    sampleResponse: `MEMORANDUM

TO: Chief Executive Officer
FROM: [Candidate Name], Director of Corporate Finance
DATE: [Current Date]
RE: Capital Allocation Strategy Recommendation

I have analyzed the three capital allocation alternatives in the context of shareholder value maximization.

M-M IRRELEVANCE IN THE REAL WORLD

While Modigliani-Miller proves dividend policy is irrelevant in perfect markets, real markets have:
1. Taxes: Capital gains often taxed favorably vs. dividends
2. Information Asymmetry: Dividends signal management's confidence
3. Agency Costs: Returning cash reduces risk of wasteful spending
4. Transaction Costs: Reissuing stock is expensive

Therefore, our capital allocation decision does matter.

ANALYSIS OF ALTERNATIVES

Option A: Increase Dividend to $60M (60% payout)
Pros: Strong signal of confidence; attracts income-seeking investors
Cons: Creates expectation of ongoing high dividends; cutting later sends very negative signal
Signaling: "We believe our earnings are sustainable and growing"

Option B: Stock Buyback ($100M)
Pros: Flexible (no ongoing commitment); tax-efficient for shareholders; boosts EPS
Cons: Could signal lack of growth opportunities; may be seen as financial engineering
Signaling: "Our stock is undervalued" or "We lack investment opportunities"

Option C: Acquire Startup ($150M)
Pros: Could provide growth avenue; diversification
Cons: M&A often destroys value; integration risk; premium paid may exceed synergies
Signaling: "We're pivoting strategy" – risky without compelling rationale

RECOMMENDATION

I recommend a HYBRID approach:
1. Modest Dividend Increase: Raise payout to 50% ($50M) to reward shareholders
2. Authorized Buyback: Announce $75M buyback program, executed opportunistically when stock is undervalued
3. Retain $75M: For potential bolt-on acquisitions (not transformational deals)

This balanced approach signals confidence through the dividend increase while maintaining flexibility. The startup acquisition should only proceed after rigorous due diligence demonstrating clear value creation.`,
    rubric: {
      organization: { weight: 30, criteria: [
        'Uses proper memo format addressed to CEO',
        'Organizes into M-M theory, analysis of each alternative, signaling discussion, and recommendation',
        'Presents each capital allocation option with consistent pros/cons format',
        'Provides integrated recommendation combining multiple strategies',
      ]},
      development: { weight: 40, criteria: [
        'Explains why M-M dividend irrelevance fails in practice (taxes, asymmetry, agency costs)',
        'Analyzes pros, cons, and signaling effects of each alternative',
        'Discusses tax efficiency differences between dividends and buybacks',
        'Evaluates acquisition risk versus return of capital strategies',
        'Supports hybrid recommendation with strategic rationale',
      ]},
      expression: { weight: 30, criteria: [
        'Maintains professional corporate finance advisory tone',
        'Uses correct capital allocation terminology (payout ratio, signaling, agency costs)',
        'Presents options analysis in clear parallel structure',
        'Demonstrates proper grammar and persuasive professional writing',
      ]},
    },
  },
  {
    id: 'cma2-wc-009',
    section: 'CMA2',
    type: 'written_communication',
    topic: 'Capital Structure Theory - WACC and Tax Shield Analysis',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'CMA2-B',
    scenario: `GrowthTech Inc. is a profitable technology company considering a recapitalization:

Current Structure:
- Equity: $500 million (100% equity financed)
- EBIT: $80 million
- Tax Rate: 25%
- Cost of Equity: 12%
- WACC: 12%

Proposed Structure:
- Issue $200 million debt at 6% interest
- Use proceeds to repurchase stock
- New Cost of Equity (projected): 14%

The CFO claims: "Debt is cheaper than equity. Our WACC will drop, and shareholder value will increase."`,
    task: `Write an analysis that:
1. Calculates the current and proposed WACC.
2. Explains why cost of equity increases with leverage.
3. Identifies the tax benefits of debt (interest tax shield).
4. Discusses risks of increased leverage.
5. Evaluates whether the recapitalization creates value.`,
    keyPoints: [
      'WACC calculation with debt and equity',
      'Cost of equity rises with leverage (financial risk)',
      'Tax shield = Interest × Tax Rate',
      'Trade-off theory: tax benefits vs. distress costs',
    ],
    sampleResponse: `MEMORANDUM

TO: Board of Directors
FROM: [Candidate Name], Financial Analyst
DATE: [Current Date]
RE: Recapitalization Analysis - GrowthTech Inc.

I have analyzed the proposed debt-for-equity recapitalization and its impact on shareholder value.

CURRENT VS. PROPOSED WACC

Current Structure (100% Equity):
- WACC = 12% (all equity, so equals cost of equity)

Proposed Structure:
- Debt: $200M at 6%, Equity: $300M at 14%
- After-tax cost of debt: 6% × (1 - 0.25) = 4.5%
- Weights: Debt 40%, Equity 60%
- New WACC = (0.40 × 4.5%) + (0.60 × 14%) = 1.8% + 8.4% = 10.2%

The WACC decreases from 12% to 10.2%, creating value.

TAX SHIELD BENEFIT

Annual Interest = $200M × 6% = $12M
Tax Shield = $12M × 25% = $3M annually

Present Value of Tax Shield (assuming perpetual debt at 6%):
PV = $3M / 0.06 = $50 million of value created

WHY COST OF EQUITY INCREASES

The 12% to 14% increase reflects higher financial risk. With debt:
1. Fixed interest obligations must be paid before equity holders receive anything
2. Earnings become more volatile for equity holders
3. Risk of distress increases

This is Modigliani-Miller Proposition II: cost of equity rises linearly with leverage.

RISKS TO CONSIDER

1. Financial Distress: If EBIT drops significantly, fixed interest payments could strain cash flow
2. Loss of Flexibility: Debt covenants may restrict future decisions
3. Technology Sector Volatility: Cash flows may be unpredictable

Current Interest Coverage = $80M EBIT / $12M Interest = 6.67×
This provides adequate cushion, but the company should stress-test for downside scenarios.

RECOMMENDATION

The recapitalization appears to create value by lowering WACC from 12% to 10.2%. The $50M estimated tax shield value exceeds typical recapitalization costs. However, I recommend:

1. Stress-test: Model EBIT declines of 30-50% to ensure debt service remains manageable
2. Maintain Flexibility: Include prepayment options in debt terms
3. Covenant Negotiation: Ensure covenants don't unduly restrict operations

Proceed with recapitalization if stress tests confirm acceptable downside risk.`,
    rubric: {
      organization: { weight: 30, criteria: [
        'Uses proper memo format addressed to Board of Directors',
        'Separates WACC calculations, tax shield analysis, risk discussion, and recommendation',
        'Follows logical progression from current to proposed structure analysis',
        'Includes stress testing and conditions for value creation',
      ]},
      development: { weight: 40, criteria: [
        'Calculates WACC correctly for both current and proposed structures',
        'Explains cost of equity increase with leverage using M-M Proposition II',
        'Quantifies tax shield benefit (annual and present value)',
        'Identifies financial distress risks and interest coverage implications',
        'Evaluates net value creation after accounting for risks',
      ]},
      expression: { weight: 30, criteria: [
        'Maintains professional board-level financial communication tone',
        'Uses correct capital structure terminology (WACC, equity multiplier, tax shield)',
        'Presents calculations in clear tabular format',
        'Demonstrates proper grammar and balanced analytical writing',
      ]},
    },
  },
  {
    id: 'cma2-wc-010',
    section: 'CMA2',
    type: 'written_communication',
    topic: 'M&A Valuation and Synergies',
    difficulty: 'hard',
    estimatedTime: 35,
    blueprintArea: 'CMA2-B',
    scenario: `AcquireCo is considering purchasing TargetCo:

TargetCo Financials:
- Revenue: $100 million
- EBITDA: $20 million
- Net Income: $10 million
- Shares Outstanding: 5 million
- Current Stock Price: $30/share (Market Cap: $150M)

Comparable Companies trade at:
- EV/EBITDA: 8x
- P/E: 18x

AcquireCo's analysis projects:
- Revenue synergies: $10 million annually (cross-selling)
- Cost synergies: $5 million annually (eliminate redundancies)

The CEO wants to offer a 30% premium ($39/share, or $195 million total).`,
    task: `Write a memo to the Board that:
1. Values TargetCo using comparable multiples (before synergies).
2. Values the synergies and determines maximum justified price.
3. Analyzes whether the 30% premium is justified.
4. Identifies risks in the synergy estimates.
5. Recommends deal structure considerations.`,
    keyPoints: [
      'Standalone valuation using multiples',
      'Synergy valuation and NPV',
      'Premium analysis',
      'Integration and execution risk',
    ],
    sampleResponse: `MEMORANDUM

TO: Board of Directors
FROM: [Candidate Name], Corporate Development
DATE: [Current Date]
RE: Acquisition Analysis - TargetCo

I have analyzed the proposed acquisition of TargetCo at a 30% premium.

STANDALONE VALUATION

Using Comparable Multiples:

EV/EBITDA Method:
EV = 8 × $20M = $160 million
(Assumes no net debt; if Target has $10M net debt, Equity Value = $150M)

P/E Method:
Equity Value = 18 × $10M = $180 million

Valuation Range: $150M - $180M (implies fair value of $30-$36/share)

SYNERGY VALUATION

Projected Annual Synergies: $10M revenue + $5M cost = $15M total

Assumptions:
- Tax rate: 25%
- After-tax synergies: $15M × (1 - 0.25) = $11.25M annually
- Cost of capital: 10%
- Time to achieve: Year 1 = 50%, Year 2+ = 100%

PV of Synergies (perpetuity, achievable Year 2+):
$11.25M / 0.10 = $112.5 million

With Year 1 ramp: NPV ≈ $100-105 million

MAXIMUM JUSTIFIED PRICE

Standalone Value (midpoint): $165 million
Plus: Synergy Value: $100 million
Maximum Price: $265 million ($53/share)

Proposed Price: $195 million ($39/share)

The 30% premium ($195M) is JUSTIFIED if synergies are achievable. We're paying $30M premium over $165M standalone but capturing $100M in synergies.

SYNERGY RISKS

1. Revenue Synergies: Cross-selling often underdelivered; customers may not adopt combined offerings
2. Cost Synergies: Headcount reductions may cause talent flight; integration costs underestimated
3. Culture Clash: Integration execution may distract from operations
4. Timeline: Synergies often take 2-3 years vs. projected 1 year

RECOMMENDATIONS

1. Conservative Offer: Start at 20% premium ($36/share); have room to negotiate
2. Earnout Structure: Tie portion of purchase price to synergy achievement
3. Due Diligence: Deep-dive on customer retention risk and key employee retention
4. Integration Planning: Begin integration planning before close; budget $10M for integration costs

I recommend proceeding with acquisition at target price of $180-190M, with earnout provisions tied to Year 2 synergy achievement.`,
    rubric: {
      organization: { weight: 30, criteria: [
        'Uses proper memo format addressed to Board of Directors',
        'Separates standalone valuation, synergy valuation, premium analysis, and deal recommendations',
        'Follows logical build-up from base value through synergies to maximum price',
        'Includes risk assessment and deal structure considerations',
      ]},
      development: { weight: 40, criteria: [
        'Applies both EV/EBITDA and P/E comparable multiples for standalone valuation',
        'Values synergies with appropriate tax and discount rate assumptions',
        'Calculates maximum justified price by combining standalone and synergy values',
        'Identifies specific risks in revenue and cost synergy estimates',
        'Recommends deal structure elements (earnouts, due diligence, starting offer)',
      ]},
      expression: { weight: 30, criteria: [
        'Maintains professional M&A advisory tone appropriate for board presentation',
        'Uses correct valuation terminology (EV/EBITDA, premium, earnout, synergies)',
        'Presents valuation buildup clearly with supporting calculations',
        'Demonstrates proper grammar and precise financial writing',
      ]},
    },
  },

  // ==========================================
  // CMA2-C: Decision Analysis
  // ==========================================
  {
    id: 'cma2-wc-011',
    section: 'CMA2',
    type: 'written_communication',
    topic: 'CVP Analysis - Multi-Product Decisions',
    difficulty: 'medium',
    estimatedTime: 25,
    blueprintArea: 'CMA2-C',
    scenario: `SportGear produces three products:

Product A: Selling Price $100, Variable Cost $60, CM $40
Product B: Selling Price $150, Variable Cost $90, CM $60
Product C: Selling Price $200, Variable Cost $140, CM $60

Current Sales Mix: A = 50%, B = 30%, C = 20%
Fixed Costs: $500,000 per year
Current Total Units Sold: 20,000

The Sales Manager proposes a promotion to shift mix toward Product C: "Product C has the highest contribution margin at $60. We should sell more of it!"

Marketing estimates the shift would change mix to: A = 30%, B = 30%, C = 40%`,
    task: `Write an analysis that:
1. Calculates the current weighted-average contribution margin and breakeven.
2. Calculates the proposed weighted-average CM and breakeven.
3. Analyzes whether shifting toward Product C is beneficial.
4. Identifies what metric should drive the sales mix decision.
5. Recommends a course of action.`,
    keyPoints: [
      'Weighted-average CM calculation',
      'CM Ratio vs absolute CM',
      'Breakeven analysis comparison',
      'Resource constraints consideration',
    ],
    sampleResponse: `MEMORANDUM

TO: Sales Manager
FROM: [Candidate Name], Management Accountant
DATE: [Current Date]
RE: Analysis of Proposed Sales Mix Shift

I have analyzed the proposed promotion to shift sales mix toward Product C.

CURRENT SITUATION ANALYSIS

Weighted-Average Contribution Margin:
= (50% × $40) + (30% × $60) + (20% × $60)
= $20 + $18 + $12 = $50 per unit

Breakeven Point = Fixed Costs / Weighted CM
= $500,000 / $50 = 10,000 units

Current Profit = (20,000 - 10,000) × $50 = $500,000

PROPOSED MIX ANALYSIS

New Weighted-Average CM:
= (30% × $40) + (30% × $60) + (40% × $60)
= $12 + $18 + $24 = $54 per unit

New Breakeven = $500,000 / $54 = 9,259 units

If volume stays at 20,000 units:
New Profit = (20,000 - 9,259) × $54 = $580,000

Profit Increase: $80,000 (16% improvement)

IMPORTANT INSIGHT

Product B and C have the same absolute CM ($60), but different selling prices:
- Product B CM Ratio: $60 / $150 = 40%
- Product C CM Ratio: $60 / $200 = 30%

If we look at CM per sales dollar, Product B is actually better! However, if we're comparing units sold, the shift toward C is beneficial because it raises the weighted-average CM per unit.

KEY CONSIDERATIONS

1. If limited by production capacity (units): Product B and C are equivalent; shift away from A
2. If limited by sales dollars: Product B is more efficient than C
3. If no constraints: The proposed mix increases profit

RECOMMENDATION

The proposed mix shift SHOULD increase profitability by approximately $80,000 annually if unit volume remains constant. However, I recommend:

1. Confirm the promotion won't reduce total units sold
2. Evaluate any production constraints (Can we produce more C? Does C require more resources?)
3. Consider that Product C's higher price may have lower demand elasticity

Proceed with the promotion while monitoring unit volume closely.`,
    rubric: {
      organization: { weight: 30, criteria: [
        'Uses proper memo format addressed to Sales Manager',
        'Separates current analysis, proposed analysis, key insight, and recommendation',
        'Follows logical progression from calculation to strategic insight',
        'Distinguishes between per-unit CM and CM ratio analysis',
      ]},
      development: { weight: 40, criteria: [
        'Calculates weighted-average contribution margin correctly for both mixes',
        'Computes breakeven points under current and proposed scenarios',
        'Analyzes the difference between absolute CM and CM ratio for decision-making',
        'Identifies volume assumption as critical to the conclusion',
        'Addresses production constraints and demand elasticity considerations',
      ]},
      expression: { weight: 30, criteria: [
        'Maintains professional cost-volume-profit analysis tone',
        'Uses correct CVP terminology (contribution margin, breakeven, sales mix, CM ratio)',
        'Presents calculations in clear step-by-step format',
        'Demonstrates proper grammar and analytical writing style',
      ]},
    },
  },
  {
    id: 'cma2-wc-012',
    section: 'CMA2',
    type: 'written_communication',
    topic: 'Constrained Resources - Optimal Product Mix',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'CMA2-C',
    scenario: `ManuTech produces two products with the following data:

Product X: CM $50, Machine Hours Required: 2 hours
Product Y: CM $70, Machine Hours Required: 4 hours

Available Machine Hours: 10,000 per month
Demand: X = unlimited, Y = 2,000 units max

The Production Manager says: "We should prioritize Product Y because it has a higher contribution margin per unit."

Current production: 1,500 units of X and 1,750 units of Y.`,
    task: `Write a memo that:
1. Calculates the CM per constraining resource (machine hour) for each product.
2. Determines the optimal product mix.
3. Calculates the profit improvement from optimization.
4. Explains why CM per unit is the wrong metric when resources are constrained.
5. Identifies situations where Product Y should be prioritized.`,
    keyPoints: [
      'CM per machine hour (X = $25/hr, Y = $17.50/hr)',
      'Constraint optimization',
      'Optimal mix calculation',
      'When constraints don\'t apply',
    ],
    sampleResponse: `MEMORANDUM

TO: Production Manager
FROM: [Candidate Name], Cost Analyst
DATE: [Current Date]
RE: Optimal Product Mix Analysis

I have analyzed our product mix to maximize contribution margin given limited machine capacity.

CONTRIBUTION MARGIN PER CONSTRAINT

The machine hours are our binding constraint. The correct metric is CM per machine hour, not CM per unit.

Product X: $50 CM / 2 machine hours = $25 per machine hour
Product Y: $70 CM / 4 machine hours = $17.50 per machine hour

Product X generates 43% more contribution per machine hour than Product Y!

OPTIMAL PRODUCT MIX

Step 1: Prioritize Product X (higher CM/constraint)
Step 2: Produce Y only after meeting X demand or until Y demand cap

Since X demand is unlimited and X is more efficient, we should prioritize X:

Optimal Mix:
- Produce X first with all hours: 10,000 / 2 = 5,000 units
- Total CM = 5,000 × $50 = $250,000

But this ignores Y entirely. If we have customer commitments or business reasons to serve Y customers:
- Produce 2,000 units of Y: 8,000 hours used, CM = $140,000
- Remaining 2,000 hours produce 1,000 units of X: CM = $50,000
- Total: $190,000

Pure X production: $250,000
Mixed (max Y first): $190,000
Difference: $60,000 opportunity cost of serving Y market

CURRENT VS OPTIMAL COMPARISON

Current Production (1,500 X + 1,750 Y):
- Machine hours: (1,500 × 2) + (1,750 × 4) = 3,000 + 7,000 = 10,000 ✓
- CM: (1,500 × $50) + (1,750 × $70) = $75,000 + $122,500 = $197,500

Optimal (5,000 X): CM = $250,000

Improvement: $52,500/month or $630,000/year

WHEN TO PRIORITIZE Y

Product Y should be prioritized when:
1. Machine capacity is NOT the constraint
2. Contract obligations require Y delivery
3. Y customers are strategic relationships worth subsidizing
4. Additional machine capacity is available at cost < $7.50/hour ($25 - $17.50)

RECOMMENDATION

Rebalance production toward Product X. If we cannot eliminate Y entirely due to business requirements, minimize Y production to contractual commitments and maximize X. This could improve annual contribution by up to $630,000.`,
    rubric: {
      organization: { weight: 30, criteria: [
        'Uses proper memo format addressed to Production Manager',
        'Separates CM per constraint calculation, optimal mix, improvement analysis, and recommendation',
        'Follows logical flow from constraint identification to optimization',
        'Includes comparison of current versus optimal production plans',
      ]},
      development: { weight: 40, criteria: [
        'Calculates CM per machine hour correctly for both products',
        'Determines optimal product mix given the binding constraint',
        'Quantifies profit improvement from rebalancing ($630K annually)',
        'Explains why CM per unit is misleading under capacity constraints',
        'Identifies conditions when Product Y should be prioritized',
      ]},
      expression: { weight: 30, criteria: [
        'Maintains professional production management analysis tone',
        'Uses correct constraint terminology (binding constraint, CM per constraint unit)',
        'Presents optimization steps clearly with supporting math',
        'Demonstrates proper grammar and decision-focused writing',
      ]},
    },
  },

  // ==========================================
  // CMA2-D: Risk Management
  // ==========================================
  {
    id: 'cma2-wc-013',
    section: 'CMA2',
    type: 'written_communication',
    topic: 'Enterprise Risk Management - Risk Assessment',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'CMA2-D',
    scenario: `RegionalBank has identified the following risks in its annual ERM assessment:

Risk A: Cybersecurity Breach
- Likelihood: Medium (30%)
- Impact: $50 million (data loss, regulatory fines, reputation)
- Current Controls: Firewall, annual penetration testing

Risk B: Interest Rate Increase
- Likelihood: High (70%)
- Impact: $20 million (reduced loan demand, margin compression)
- Current Controls: Some floating-rate loans, limited duration matching

Risk C: Key Person Departure (CFO)
- Likelihood: Low (10%)
- Impact: $5 million (disruption, recruitment costs)
- Current Controls: None

The CEO says: "Focus only on Risk B since it's most likely to occur."`,
    task: `Write a memo to the Board Risk Committee that:
1. Explains why likelihood alone is insufficient for risk prioritization.
2. Calculates the expected loss for each risk.
3. Recommends risk response strategies for each.
4. Discusses how to present risks for board-level decision making.`,
    keyPoints: [
      'Expected Value = Likelihood × Impact',
      'Risk Heat Map concept',
      'Risk response strategies (avoid, mitigate, transfer, accept)',
      'Risk appetite alignment',
    ],
    sampleResponse: `MEMORANDUM

TO: Board Risk Committee
FROM: [Candidate Name], Chief Risk Officer
DATE: [Current Date]
RE: Annual Risk Assessment and Prioritization

I am presenting the enterprise risk assessment with recommended response strategies.

WHY LIKELIHOOD ALONE IS INSUFFICIENT

The CEO's suggestion to focus solely on Risk B (highest likelihood) ignores impact severity. Proper risk management considers both dimensions:

Expected Loss = Probability × Impact

RISK PRIORITIZATION

Risk A: Cybersecurity Breach
Expected Loss = 30% × $50M = $15 million
Position: Medium likelihood, Very High impact → HIGH PRIORITY

Risk B: Interest Rate Increase
Expected Loss = 70% × $20M = $14 million
Position: High likelihood, High impact → HIGH PRIORITY

Risk C: Key Person Departure
Expected Loss = 10% × $5M = $0.5 million
Position: Low likelihood, Low impact → LOW PRIORITY

Risks A and B have similar expected losses ($15M vs $14M) despite very different profiles. Both warrant attention.

RECOMMENDED RISK RESPONSES

Risk A - Cybersecurity (MITIGATE and TRANSFER):
1. Increase penetration testing frequency (quarterly)
2. Implement multi-factor authentication and employee training
3. Purchase cyber insurance ($25M policy, ~$200K annual premium)
4. Conduct incident response tabletop exercises
Target: Reduce likelihood to 15%, transfer impact via insurance

Risk B - Interest Rate (MITIGATE):
1. Increase floating-rate loan portfolio percentage
2. Implement interest rate swaps to hedge fixed-rate exposure
3. Stress test loan portfolio for +200bp scenario
4. Consider rate caps on variable products
Target: Reduce impact to $10M through hedging

Risk C - Key Person (ACCEPT with MONITORING):
1. Ensure succession plan documentation
2. Cross-train on critical CFO functions
3. Consider retention agreement/deferred compensation
Target: Accept risk; cost of full mitigation exceeds expected loss

BOARD PRESENTATION: RISK HEAT MAP

I recommend presenting risks on a 5×5 heat map (Likelihood vs. Impact) with color coding:
- Red: Immediate action required (A, B currently)
- Yellow: Monitor closely
- Green: Accept within risk appetite (C)

This visual framework facilitates board discussion about risk appetite and prioritization trade-offs.

RECOMMENDATIONS

1. Approve $200K cyber insurance investment (13:1 expected benefit)
2. Authorize interest rate hedging program
3. Accept key person risk with succession planning update
4. Re-assess quarterly and report to this committee`,
    rubric: {
      organization: { weight: 30, criteria: [
        'Uses proper memo format addressed to Board Risk Committee',
        'Separates risk prioritization, expected loss analysis, response strategies, and governance recommendations',
        'Presents risks in consistent format enabling comparison',
        'Recommends board-level presentation framework (heat map)',
      ]},
      development: { weight: 40, criteria: [
        'Calculates expected loss (Probability × Impact) for all three risks',
        'Explains why likelihood alone is insufficient for prioritization',
        'Applies appropriate risk response strategy to each risk (mitigate, transfer, accept)',
        'Provides specific, actionable mitigation recommendations with cost-benefit logic',
        'Addresses risk appetite alignment and governance implications',
      ]},
      expression: { weight: 30, criteria: [
        'Maintains professional risk management communication tone',
        'Uses correct ERM terminology (expected loss, risk appetite, risk response strategies)',
        'Presents risk quantification clearly with consistent formatting',
        'Demonstrates proper grammar and governance-appropriate writing',
      ]},
    },
  },
  {
    id: 'cma2-wc-014',
    section: 'CMA2',
    type: 'written_communication',
    topic: 'Derivatives - Interest Rate Swap',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'CMA2-D',
    scenario: `IndustrialCo has a $50 million floating-rate loan (SOFR + 2%), with payments reset quarterly. Current SOFR is 4%, so current rate is 6%.

The CFO is concerned about rising rates and wants to lock in costs. A bank offers an interest rate swap:
- IndustrialCo pays fixed 5.5%
- IndustrialCo receives floating (SOFR)
- Notional: $50 million
- Term: 3 years

The Treasurer argues: "We'd be paying 5.5% when our current rate is effectively 6%. Why pay more for certainty?"`,
    task: `Write an explanation for the CFO that:
1. Explains how the swap works mechanically.
2. Shows the net interest cost with the swap in place.
3. Analyzes scenarios where SOFR rises to 6% or falls to 3%.
4. Discusses the trade-off between certainty and potential savings.
5. Recommends whether to enter the swap.`,
    keyPoints: [
      'Swap mechanics (pay fixed, receive floating)',
      'Net interest calculation (Loan + Swap = Fixed)',
      'Scenario analysis',
      'Hedging philosophy (certainty vs. speculation)',
    ],
    sampleResponse: `MEMORANDUM

TO: Chief Financial Officer
FROM: [Candidate Name], Treasury Analyst
DATE: [Current Date]
RE: Interest Rate Swap Analysis

I have analyzed the proposed interest rate swap to hedge our floating-rate debt exposure.

HOW THE SWAP WORKS

Currently: We pay SOFR + 2% on our $50M loan = Variable rate

With Swap:
- Continue paying bank: SOFR + 2% (variable)
- Pay swap counterparty: Fixed 5.5%
- Receive from swap counterparty: SOFR

Net Position: (SOFR + 2%) + 5.5% - SOFR = 7.5% FIXED

The swap converts our floating-rate obligation into a fixed 7.5% rate.

SCENARIO ANALYSIS (Annual Interest Cost)

Current (No Swap, SOFR = 4%):
Loan: $50M × (4% + 2%) = $3.0 million

With Swap (Any SOFR):
Net Fixed: $50M × 7.5% = $3.75 million

Scenario: SOFR Rises to 6%
No Swap: $50M × 8% = $4.0 million
With Swap: $3.75 million (save $250K/year)

Scenario: SOFR Falls to 3%
No Swap: $50M × 5% = $2.5 million
With Swap: $3.75 million (lose $1.25M/year)

TREASURER'S CONCERN ADDRESSED

The Treasurer correctly notes we'd be "locking in" a higher rate today. But this analysis assumes rates won't rise. The relevant question is:

"What is the cost of certainly vs. the risk of uncertainty?"

Current implied forward rates suggest markets expect SOFR around 5%+ over the term. At SOFR = 5%, our loan cost would be 7%, close to the swapped rate of 7.5%.

The 0.5% premium we pay for the swap ($250K/year) is essentially an "insurance premium" for rate certainty.

HEDGING VS. SPECULATION

By remaining unhedged, we are implicitly betting rates will fall. This is speculation. As an industrial company, we should focus on our core business, not interest rate forecasting.

RECOMMENDATION

I recommend entering the swap with the following reasoning:

1. Budget Certainty: Fixed 7.5% rate enables precise financial planning
2. Risk Reduction: Removes cash flow variability from budgets
3. Industry Norms: Most industrial companies hedge 50-75% of rate exposure
4. Reasonable Premium: 0.5% above current effective rate is modest insurance

Consider swapping 50-75% of the exposure ($25-37.5M notional), leaving some floating for potential savings if rates do fall.

Proceed with swap execution.`,
    rubric: {
      organization: { weight: 30, criteria: [
        'Uses proper memo format addressed to CFO',
        'Separates swap mechanics, net cost calculation, scenario analysis, and recommendation',
        'Follows logical progression from how swaps work to decision rationale',
        'Addresses the Treasurer\'s objection directly within the analysis',
      ]},
      development: { weight: 40, criteria: [
        'Explains swap mechanics (pay fixed, receive floating) clearly and correctly',
        'Calculates net interest cost with swap in place (7.5% fixed)',
        'Presents scenario analysis for rising and falling SOFR rates',
        'Distinguishes between hedging (certainty) and speculation (betting on rates)',
        'Recommends partial hedge to balance certainty with flexibility',
      ]},
      expression: { weight: 30, criteria: [
        'Maintains professional treasury and derivatives communication tone',
        'Uses correct swap and interest rate terminology (notional, SOFR, pay-fixed)',
        'Presents scenario comparison in clear tabular format',
        'Demonstrates proper grammar and persuasive analytical writing',
      ]},
    },
  },

  // ==========================================
  // CMA2-E: Investment Decisions
  // ==========================================
  {
    id: 'cma2-wc-015',
    section: 'CMA2',
    type: 'written_communication',
    topic: 'IRR vs NPV Conflict - Scale and Mutually Exclusive Projects',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'CMA2-E',
    scenario: `TechVentures is evaluating two mutually exclusive projects:

Project Alpha:
- Initial Investment: $100,000
- Year 1 Cash Flow: $80,000
- Year 2 Cash Flow: $60,000
- IRR: 25%
- NPV (at 10%): $20,661

Project Beta:
- Initial Investment: $500,000
- Year 1 Cash Flow: $300,000
- Year 2 Cash Flow: $350,000
- IRR: 18%
- NPV (at 10%): $82,645

The VP of Engineering says: "Always choose the project with the highest IRR. Alpha at 25% far exceeds Beta's 18%."`,
    task: `Write a memo that:
1. Explains why IRR and NPV can give conflicting rankings.
2. Analyzes the scale difference between the projects.
3. Calculates the incremental analysis (Beta - Alpha).
4. Recommends which project to choose and why.
5. Identifies when IRR is most reliable.`,
    keyPoints: [
      'NPV measures absolute value creation',
      'IRR measures percentage return (ignores scale)',
      'Incremental IRR analysis',
      'NPV superiority for mutually exclusive projects',
    ],
    sampleResponse: `MEMORANDUM

TO: VP of Engineering
FROM: [Candidate Name], Financial Analyst
DATE: [Current Date]
RE: Project Selection - Alpha vs. Beta

I have analyzed the conflict between IRR and NPV rankings for Projects Alpha and Beta.

WHY IRR AND NPV CONFLICT

IRR measures the percentage return on invested capital.
NPV measures the absolute dollar value created.

For mutually exclusive projects of different sizes, these metrics can conflict. A small project may have a high percentage return but create less total value than a larger project with a lower percentage return.

Analogy: Would you prefer 50% return on $1,000 ($500 profit) or 20% return on $100,000 ($20,000 profit)?

THE SCALE PROBLEM

Alpha invests $100K and creates $20,661 of value (25% IRR).
Beta invests $500K and creates $82,645 of value (18% IRR).

If we choose Alpha, we invest only $100K. What happens to the remaining $400K of capital? If it earns only our cost of capital (10%), we miss the opportunity to invest that $400K in Beta's 18% return.

INCREMENTAL ANALYSIS

The decision isn't "Alpha or Beta"—it's "Alpha, or Alpha + Incremental Investment of $400K."

Incremental Cash Flows (Beta - Alpha):
- Year 0: -$400,000
- Year 1: +$220,000
- Year 2: +$290,000

Incremental NPV = $82,645 - $20,661 = $61,984 (positive!)
Incremental IRR ≈ 15% (exceeds 10% cost of capital)

The incremental $400K investment earns 15%, above our hurdle rate. We should make that incremental investment.

RECOMMENDATION

Choose Project Beta.

Beta creates $82,645 of shareholder value vs. Alpha's $20,661—over 4 times more value. The VP's logic would have us leave $61,984 of potential value on the table.

WHEN IRR IS RELIABLE

IRR works well when:
1. Projects are independent (not mutually exclusive)
2. Projects are similar in scale
3. Cash flows are conventional (one sign change)
4. Reinvestment rate assumptions don't matter

For mutually exclusive projects of different scales, always use NPV as the primary decision criterion.

Choose Beta—higher absolute value creation is the correct objective.`,
    rubric: {
      organization: { weight: 30, criteria: [
        'Uses proper memo format addressed to VP of Engineering',
        'Separates conflict explanation, scale analysis, incremental analysis, and recommendation',
        'Follows logical progression from problem identification to resolution',
        'Provides clear guidance on when each metric is appropriate',
      ]},
      development: { weight: 40, criteria: [
        'Explains why IRR and NPV conflict for mutually exclusive projects of different scale',
        'Demonstrates the scale problem with intuitive analogy',
        'Performs incremental cash flow analysis (Beta minus Alpha) correctly',
        'Shows incremental NPV is positive and incremental IRR exceeds hurdle rate',
        'Identifies conditions when IRR is reliable as a decision criterion',
      ]},
      expression: { weight: 30, criteria: [
        'Maintains professional capital budgeting analysis tone',
        'Uses correct investment analysis terminology (IRR, NPV, incremental analysis, hurdle rate)',
        'Presents calculations and comparisons in clear format',
        'Demonstrates proper grammar and educational yet professional tone',
      ]},
    },
  },
  {
    id: 'cma2-wc-016',
    section: 'CMA2',
    type: 'written_communication',
    topic: 'Real Options - Flexibility Value',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'CMA2-E',
    scenario: `PharmaCo is evaluating a new drug development project:

Phase 1 (Clinical Trials):
- Investment: $20 million
- Duration: 2 years
- Success Probability: 40%

If Phase 1 succeeds, Phase 2 (Full Development):
- Additional Investment: $100 million
- Expected NPV if successful: $200 million
- If Phase 1 fails: $0 (abandon, no Phase 2 investment)

Traditional NPV analysis says:
Expected NPV = -$20M + (40% × (-$100M + $200M)) = -$20M + $40M = $20M

The CFO says: "The NPV is only $20 million. Given the risk, we should pass."`,
    task: `Write an analysis that:
1. Explains why traditional NPV may undervalue this project.
2. Describes the embedded real option (option to abandon).
3. Values the strategic flexibility this option provides.
4. Compares to a situation without optionality.
5. Recommends whether to invest in Phase 1.`,
    keyPoints: [
      'Real options add value not captured in DCF',
      'Option to abandon limits downside',
      'Staged investment preserves flexibility',
      'High uncertainty increases option value',
    ],
    sampleResponse: `MEMORANDUM

TO: Chief Financial Officer
FROM: [Candidate Name], Strategic Finance
DATE: [Current Date]
RE: Real Options Analysis - Drug Development Project

I believe the traditional NPV analysis significantly undervalues this project by ignoring the strategic option embedded in our phased investment approach.

THE REAL OPTION FRAMEWORK

This project contains a valuable real option: the Option to Abandon.

By investing only $20M in Phase 1, we "buy the right" to make the larger $100M investment later, but we are not obligated to do so. If Phase 1 fails, we walk away—losing only $20M instead of $120M.

WHY TRADITIONAL NPV UNDERVALUES

Traditional NPV assumes a now-or-never, all-or-nothing decision. It treats the full $120M as committed upfront.

In reality:
- Best case (40%): Invest $120M total, receive $200M value
- Worst case (60%): Invest only $20M, zero return

The asymmetric payoff structure creates option value.

COMPARISON: WITH VS. WITHOUT OPTIONALITY

Scenario A: Phased Investment (With Option)
- 40% chance: Invest $120M, gain $200M → Net $80M
- 60% chance: Invest $20M, gain $0 → Net -$20M
Expected Value = (40% × $80M) + (60% × -$20M) = $32M - $12M = $20M

Scenario B: Full Commitment (No Option)
- Must invest $120M regardless of Phase 1 outcome
- 40% chance: $200M return
- 60% chance: $0 return
Expected Value = -$120M + (40% × $200M) = -$120M + $80M = -$40M

The option to abandon is worth $60M ($20M - (-$40M))!

OPTION VALUE DRIVERS

The embedded option is valuable because:
1. High Uncertainty (40% success rate): More uncertainty = more option value
2. Significant Downstream Investment ($100M): We preserve the right to avoid this
3. Irreversibility: Without phasing, the $100M would be sunk
4. Information Revelation: Phase 1 reveals whether Phase 2 makes sense

RECOMMENDATION

Strongly recommend investing in Phase 1.

The $20M Phase 1 investment is essentially purchasing a "call option" on a $200M opportunity. Even though the expected traditional NPV seems modest at $20M, the optionality value and asymmetric payoff make this an attractive strategic investment.

Consider this: We're risking $20M for a 40% chance at an $80M profit, with our downside limited to $20M. This risk-reward profile is highly favorable.

Proceed with Phase 1 investment.`,
    rubric: {
      organization: { weight: 30, criteria: [
        'Uses proper memo format addressed to CFO',
        'Separates real option framework, valuation comparison, option value drivers, and recommendation',
        'Follows logical build-up from traditional NPV to option-adjusted value',
        'Contrasts phased (with option) versus full commitment (without option) scenarios',
      ]},
      development: { weight: 40, criteria: [
        'Identifies the embedded option to abandon after Phase 1',
        'Calculates expected values with and without staging flexibility',
        'Quantifies the option value ($60M difference between approaches)',
        'Explains why high uncertainty increases option value',
        'Demonstrates asymmetric payoff structure of phased investment',
      ]},
      expression: { weight: 30, criteria: [
        'Maintains professional strategic finance communication tone',
        'Uses correct real options terminology (option to abandon, asymmetric payoff, staged investment)',
        'Presents probability-weighted scenarios clearly',
        'Demonstrates proper grammar and strategic advisory writing style',
      ]},
    },
  },

  // ==========================================
  // CMA2-F: Professional Ethics (Additional)
  // ==========================================
  {
    id: 'cma2-wc-017',
    section: 'CMA2',
    type: 'written_communication',
    topic: 'Whistleblowing and Retaliation',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'CMA2-F',
    scenario: `You are a senior financial analyst at PublicCo. Over the past three months, you've observed:

1. The VP of Sales regularly backdates sales orders to pull revenue into earlier quarters.
2. The Controller has approved journal entries that appear to understate warranty reserves.
3. When you raised concerns to your manager, they said "Don't rock the boat. Everyone does it."
4. You documented your concerns in a memo to the CFO, who has not responded in 4 weeks.
5. You've now been reassigned from financial reporting to a minor inventory role, with reduced responsibilities and implicit threat to your annual bonus.

The CEO's bonus is tied to quarterly EPS targets, which have been "miraculously" met each quarter.`,
    task: `Write a memo (to yourself as documentation or to an external advisor) that:
1. Identifies the potential violations (securities laws, accounting standards, ethics codes).
2. Outlines the steps you have taken in the ethical resolution process.
3. Discusses your options going forward (internal vs. external reporting).
4. Identifies the legal protections available to you.
5. Recommends your next course of action.`,
    keyPoints: [
      'Securities fraud indicators',
      'IMA resolution process followed',
      'SOX/Dodd-Frank whistleblower protections',
      'Audit committee escalation',
      'Documentation importance',
    ],
    sampleResponse: `CONFIDENTIAL DOCUMENTATION MEMO

TO: File / External Legal Counsel
FROM: [My Name], Senior Financial Analyst
DATE: [Current Date]
RE: Potential Securities Fraud and Whistleblower Considerations

I am documenting my observations and actions regarding potential financial reporting fraud at PublicCo.

POTENTIAL VIOLATIONS OBSERVED

1. Securities Fraud (15 U.S.C. § 78j): Backdating revenue and understating reserves are likely material misstatements
2. GAAP Violations: Revenue recognition (ASC 606) and loss contingency (ASC 450) standards appear violated
3. SOX Section 302/404: CEO/CFO certifications may be false if they knew of these practices
4. IMA Ethics Code: Integrity and Credibility standards violated by management

RESOLUTION STEPS TAKEN (Per IMA Guidelines)

1. ✓ Discussed with immediate supervisor (Manager said "don't rock the boat")
2. ✓ Escalated to next level (CFO memo, 4 weeks without response)
3. ✓ Documented all observations with dates, amounts, and examples
4. Received apparent retaliation (reassignment, bonus threat)

Internal channels appear exhausted or compromised.

OPTIONS GOING FORWARD

Option A: Audit Committee
- Bypass management, report directly to Audit Committee Chair
- Appropriate since CFO appears complicit
- May provide resolution without external escalation

Option B: External Reporting - SEC
- SEC Office of Whistleblower accepts tips regarding securities violations
- Dodd-Frank provides 10-30% of sanctions over $1M as award
- SOX Section 806 prohibits retaliation

Option C: External Reporting - Legal Counsel First
- Consult employment/securities attorney before external filing
- Understand rights, obligations, and strategy

LEGAL PROTECTIONS

1. SOX Section 806: Prohibits discharge, demotion, harassment for reporting fraud
2. Dodd-Frank Section 922: Whistleblower reward program and enhanced anti-retaliation
3. Protection applies even if allegations ultimately unproven (if reported in good faith)

RETALIATION EVIDENCE

My reassignment following the CFO memo appears to be retaliatory. I am documenting:
- Timeline (memo → 4 weeks → reassignment)
- Nature of new role (significant reduction in responsibility and visibility)
- Bonus threat (implicit in manager's comments)
- No performance issues prior to raising concerns

RECOMMENDED NEXT STEPS

1. Immediately consult with employment attorney specializing in whistleblower cases
2. File formal complaint with Audit Committee Chair with copy to external auditors
3. Preserve all documentation in secure location outside company systems
4. If Audit Committee does not respond within 2 weeks, file SEC whistleblower complaint
5. Consider documenting retaliation with OSHA (administers SOX anti-retaliation)

I remain committed to ethical conduct and will not participate in or remain silent about activities that violate securities laws and harm investors.`,
    rubric: {
      organization: { weight: 30, criteria: [
        'Uses proper confidential documentation memo format',
        'Organizes into violations, resolution steps taken, forward options, legal protections, and next steps',
        'Presents information in chronological and logical sequence',
        'Includes evidence documentation structure appropriate for legal proceedings',
      ]},
      development: { weight: 40, criteria: [
        'Identifies specific securities law and accounting standard violations',
        'Documents all IMA resolution steps taken with outcomes',
        'Analyzes multiple forward options (Audit Committee, SEC, legal counsel)',
        'Identifies SOX and Dodd-Frank whistleblower protections with specifics',
        'Documents retaliation evidence with timeline and specifics',
      ]},
      expression: { weight: 30, criteria: [
        'Maintains professional legal documentation tone with appropriate gravity',
        'Uses correct securities law and ethics terminology (SOX Section 806, Dodd-Frank)',
        'Writes with precise, factual language suitable for legal record',
        'Demonstrates proper grammar and careful, measured professional writing',
      ]},
    },
  },
];

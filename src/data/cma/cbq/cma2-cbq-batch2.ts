/**
 * CMA Part 2 Case-Based Questions (CBQs) - Batch 2
 *
 * Covers blueprint areas not yet represented:
 *   CMA2-A  Financial Statement Analysis (×1)
 *   CMA2-B  Corporate Finance (×2)
 *   CMA2-C  Decision Analysis (×2)
 *   CMA2-D  Risk Management (×1)
 *   CMA2-F  Professional Ethics (×2)
 */

import type { CBQ } from '../../../types';

export const CMA2_CBQS_BATCH2: CBQ[] = [
  // ─────────────────────────────────────────────────────────
  // CBQ 3 – CMA2-F  Professional Ethics: Ethical Pricing & IMA Standards
  // ─────────────────────────────────────────────────────────
  {
    id: 'cma2-cbq-003',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Ethical Pricing and Stakeholder Responsibility',
    difficulty: 'hard',
    estimatedTime: 16,
    blueprintArea: 'CMA2-F',
    topics: ['Professional Ethics', 'IMA Standards', 'Pricing Ethics'],
    totalPoints: 25,

    scenario: `
## Quantum Pharmaceuticals – Breakthrough Drug Pricing

Quantum developed a breakthrough drug for a rare genetic disorder affecting 5,000 US patients. The CEO has convened a pricing strategy meeting and asked you, the management accountant, to analyze the financial and ethical dimensions.

### Cost & Market Analysis
| Item | Amount |
|------|--------|
| R&D investment (over 8 years) | $180,000,000 |
| Manufacturing cost per treatment | $2,500 |
| Distribution & admin per treatment | $500 |
| Total variable cost per treatment | $3,000 |
| Annual fixed costs | $25,000,000 |
| Patent protection remaining | 12 years |
| Year 1 expected patients | 2,000 (40% penetration) |
| Years 2-5 expected patients | 3,000 (60%) |
| Years 6-12 expected patients | 3,750 (75%) |
| Insurance coverage rate | 70% of patients |
| Required rate of return | 15% |

### IMA Statement of Ethical Professional Practice
- **Competence:** Maintain professional expertise
- **Confidentiality:** Keep sensitive information confidential
- **Integrity:** Mitigate conflicts; refrain from discrediting the profession
- **Credibility:** Communicate information fairly and objectively
    `,

    questions: [
      {
        id: 'cma2-cbq-003-q1',
        prompt: 'Calculate the break-even price per treatment for Year 1 (2,000 patients), covering variable and fixed costs only.',
        type: 'numerical_entry',
        correctAnswer: 15500,
        tolerance: 100,
        points: 5,
        explanation: 'Total Year 1 costs = Variable ($3,000 × 2,000 = $6M) + Fixed ($25M) = $31M. Break-even price = $31M ÷ 2,000 = $15,500 per treatment.',
      },
      {
        id: 'cma2-cbq-003-q2',
        prompt: 'At a price of $75,000 per treatment and Year 1 volume of 2,000 patients, what is the contribution margin ratio?',
        type: 'numerical_entry',
        correctAnswer: 96,
        tolerance: 0.5,
        points: 5,
        explanation: 'CM = $75,000 − $3,000 = $72,000. CM Ratio = $72,000 ÷ $75,000 = 0.96 = 96%.',
      },
      {
        id: 'cma2-cbq-003-q3',
        prompt: 'Which stakeholder concerns are relevant to the pricing decision? Select ALL that apply.',
        type: 'multiple_select',
        options: [
          'Patient access and affordability',
          'Shareholder return expectations',
          'Long-term company reputation',
          'Insurance reimbursement policies',
          'Competitor pricing (no competitors exist)',
          'Future R&D funding needs',
        ],
        correctAnswer: [
          'Patient access and affordability',
          'Shareholder return expectations',
          'Long-term company reputation',
          'Insurance reimbursement policies',
          'Future R&D funding needs',
        ],
        points: 5,
        explanation: 'All factors except competitor pricing (no competitors) are relevant. Patient access is an ethical imperative. ROI sustains the business. Reputation affects long-term viability. Insurance affects real-world access. R&D funding sustains the innovation pipeline.',
      },
      {
        id: 'cma2-cbq-003-q4',
        prompt: 'Under which IMA standard must the management accountant communicate the pricing rationale fairly and objectively?',
        type: 'dropdown',
        options: [
          'Competence',
          'Confidentiality',
          'Integrity',
          'Credibility',
        ],
        correctAnswer: 'Credibility',
        points: 5,
        explanation: 'The Credibility standard requires communicating information fairly and objectively, disclosing all relevant information that could influence decision-making. The Integrity standard would address concerns about pricing that limits patient access and discredits the profession.',
      },
      {
        id: 'cma2-cbq-003-q5',
        prompt: 'Rank these pricing strategies from MOST to LEAST aligned with the company mission "Improve patient lives while delivering sustainable returns":',
        type: 'drag_and_drop',
        dragItems: [
          'Tiered pricing based on patient income/insurance status',
          'Maximum price the market will bear ($150,000)',
          'Cost-plus pricing at $50,000 for reasonable return',
          'Patient assistance programs with $75,000 list price',
        ],
        correctAnswer: [
          'Tiered pricing based on patient income/insurance status',
          'Patient assistance programs with $75,000 list price',
          'Cost-plus pricing at $50,000 for reasonable return',
          'Maximum price the market will bear ($150,000)',
        ],
        points: 5,
        explanation: 'Tiered pricing best balances access and returns. Patient assistance programs attempt the same at a higher price. Cost-plus ensures reasonable return but may still limit access. Maximum-price prioritizes profit over patient lives—least aligned with the mission.',
      },
    ],

    references: ['IMA Statement of Ethical Professional Practice'],
  },

  // ─────────────────────────────────────────────────────────
  // CBQ 4 – CMA2-A  Financial Statement Analysis: DuPont & Trends
  // ─────────────────────────────────────────────────────────
  {
    id: 'cma2-cbq-004',
    courseId: 'cma',
    section: 'CMA2',
    title: 'DuPont Analysis and Profitability Trends',
    difficulty: 'medium',
    estimatedTime: 18,
    blueprintArea: 'CMA2-A',
    topics: ['DuPont Analysis', 'Profitability Ratios', 'Trend Analysis'],
    totalPoints: 25,

    scenario: `
## Atlas Consumer Products – Three-Year Performance Review

Atlas's board has asked you to analyze the company's three-year profitability trend using DuPont Analysis.

### Financial Data ($ millions)
| | 2025 | 2024 | 2023 |
|------|------|------|------|
| Net Sales | $840 | $780 | $720 |
| Net Income | $58.8 | $54.6 | $57.6 |
| Total Assets | $600 | $520 | $480 |
| Stockholders' Equity | $300 | $280 | $320 |
| Dividends Paid | $20 | $18 | $15 |
| Interest Expense | $18 | $12 | $6 |

### Industry Benchmarks (2025)
| Metric | Industry Avg |
|--------|-------------|
| Net Profit Margin | 8.5% |
| Asset Turnover | 1.60× |
| Equity Multiplier | 1.80× |
| ROE | 24.5% |
    `,

    questions: [
      {
        id: 'cma2-cbq-004-q1',
        prompt: 'Calculate Atlas\'s 2025 Net Profit Margin (as a percentage, to one decimal).',
        type: 'numerical_entry',
        correctAnswer: 7.0,
        tolerance: 0.1,
        points: 5,
        explanation: 'Net Profit Margin = Net Income ÷ Net Sales = $58.8 ÷ $840 = 7.0%.',
      },
      {
        id: 'cma2-cbq-004-q2',
        prompt: 'Calculate Atlas\'s 2025 ROE using the DuPont formula: Net Profit Margin × Asset Turnover × Equity Multiplier. Round to one decimal.',
        type: 'numerical_entry',
        correctAnswer: 19.6,
        tolerance: 0.2,
        points: 5,
        explanation: 'Margin = 7.0%. Turnover = $840/$600 = 1.40×. Multiplier = $600/$300 = 2.00×. ROE = 7.0% × 1.40 × 2.00 = 19.6%.',
      },
      {
        id: 'cma2-cbq-004-q3',
        prompt: 'Arrange the DuPont components from MOST deteriorated to LEAST deteriorated over the 2023–2025 period:',
        type: 'drag_and_drop',
        dragItems: [
          'Net Profit Margin (8.0% → 7.0%)',
          'Asset Turnover (1.50× → 1.40×)',
          'Equity Multiplier (1.50× → 2.00×)',
        ],
        correctAnswer: [
          'Net Profit Margin (8.0% → 7.0%)',
          'Asset Turnover (1.50× → 1.40×)',
          'Equity Multiplier (1.50× → 2.00×)',
        ],
        points: 5,
        explanation: '2023 values: Margin = $57.6/$720 = 8.0%; Turnover = $720/$480 = 1.50×; Multiplier = $480/$320 = 1.50×. Margin fell from 8.0% to 7.0% (−12.5% relative decline). Turnover fell from 1.50 to 1.40 (−6.7%). The equity multiplier actually increased from 1.50 to 2.00 (more leverage)—this boosted ROE but represents increased financial risk, not improvement in operations.',
      },
      {
        id: 'cma2-cbq-004-q4',
        prompt: 'Atlas\'s ROE rose from 18.0% in 2023 to 19.6% in 2025 despite declining margin and turnover. What best explains this?',
        type: 'dropdown',
        options: [
          'Improved operational efficiency drove higher returns',
          'Revenue growth outpaced cost increases',
          'Increased financial leverage (Equity Multiplier rose from 1.50× to 2.00×) masked operating deterioration',
          'Better asset utilization offset lower margins',
        ],
        correctAnswer: 'Increased financial leverage (Equity Multiplier rose from 1.50× to 2.00×) masked operating deterioration',
        points: 5,
        explanation: 'Both operating DuPont components (margin and turnover) deteriorated. The only reason ROE increased is the equity multiplier rising from 1.50 to 2.00—meaning debt-funded growth boosted ROE while operational performance worsened. This is a red flag; ROE improvement from leverage alone is unsustainable.',
      },
      {
        id: 'cma2-cbq-004-q5',
        prompt: 'Which concerns should the board address based on this analysis? Select ALL that apply.',
        type: 'multiple_select',
        options: [
          'Interest expense tripled ($6M to $18M) while net income barely grew',
          'Asset turnover declining suggests inefficient capital deployment',
          'Debt-to-equity ratio increased from 0.50 to 1.00',
          'Dividend payout ratio has remained stable and healthy',
          'The company is over-leveraged relative to industry peers (2.00× vs 1.80×)',
        ],
        correctAnswer: [
          'Interest expense tripled ($6M to $18M) while net income barely grew',
          'Asset turnover declining suggests inefficient capital deployment',
          'Debt-to-equity ratio increased from 0.50 to 1.00',
          'The company is over-leveraged relative to industry peers (2.00× vs 1.80×)',
        ],
        points: 5,
        explanation: 'All are valid concerns except the dividend comment. D/E increased from ($480−$320)/$320 = 0.50 to ($600−$300)/$300 = 1.00. Interest expense tripling signals significantly higher leverage costs. Equity multiplier of 2.00× exceeds industry average of 1.80×, indicating above-average financial risk.',
      },
    ],

    references: ['IMA CMA Part 2 - Financial Statement Analysis'],
  },

  // ─────────────────────────────────────────────────────────
  // CBQ 5 – CMA2-B  Corporate Finance: Working Capital Management
  // ─────────────────────────────────────────────────────────
  {
    id: 'cma2-cbq-005',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Working Capital Management',
    difficulty: 'medium',
    estimatedTime: 18,
    blueprintArea: 'CMA2-B',
    topics: ['Working Capital', 'Cash Conversion Cycle', 'Liquidity Management'],
    totalPoints: 25,

    scenario: `
## TerraGreen Manufacturing – Cash Flow Optimization

TerraGreen's CFO is concerned about tightening liquidity despite revenue growth. You have been asked to analyze the working capital position.

### Working Capital Data ($ thousands)
| Item | 2025 | 2024 |
|------|------|------|
| Net Sales | $36,000 | $30,000 |
| COGS | $25,200 | $21,000 |
| Accounts Receivable | $6,000 | $4,500 |
| Inventory | $7,000 | $5,250 |
| Accounts Payable | $3,500 | $3,000 |
| Cash | $800 | $2,200 |
| Total Current Liabilities | $8,500 | $6,500 |
| Credit Line Available | $5,000 | $5,000 |

### Industry Benchmarks (2025)
| Metric | Industry Avg |
|--------|-------------|
| Days Sales Outstanding (DSO) | 50 days |
| Days Inventory Outstanding (DIO) | 75 days |
| Days Payable Outstanding (DPO) | 45 days |
| Cash Conversion Cycle | 80 days |
    `,

    questions: [
      {
        id: 'cma2-cbq-005-q1',
        prompt: 'Calculate TerraGreen\'s 2025 Days Sales Outstanding (DSO). Use 365-day year. Round to nearest whole number.',
        type: 'numerical_entry',
        correctAnswer: 61,
        tolerance: 1,
        points: 5,
        explanation: 'DSO = (AR ÷ Net Sales) × 365 = ($6,000 ÷ $36,000) × 365 = 60.8 ≈ 61 days.',
      },
      {
        id: 'cma2-cbq-005-q2',
        prompt: 'Calculate TerraGreen\'s 2025 Cash Conversion Cycle (CCC) in days. Use COGS for DIO and DPO calculations.',
        type: 'numerical_entry',
        correctAnswer: 112,
        tolerance: 2,
        points: 5,
        explanation: 'DIO = ($7,000 ÷ $25,200) × 365 = 101.4 days. DPO = ($3,500 ÷ $25,200) × 365 = 50.7 days. CCC = DSO + DIO − DPO = 60.8 + 101.4 − 50.7 = 111.5 ≈ 112 days.',
      },
      {
        id: 'cma2-cbq-005-q3',
        prompt: 'If TerraGreen reduces DSO from 61 to the industry average of 50 days, how much cash (in thousands) would be freed up?',
        type: 'numerical_entry',
        correctAnswer: 1085,
        tolerance: 20,
        points: 5,
        explanation: 'Daily sales = $36,000 ÷ 365 = $98.63K/day. Cash freed = (61 − 50) × $98.63 = 11 × $98.63 = $1,085K.',
      },
      {
        id: 'cma2-cbq-005-q4',
        prompt: 'Arrange these working capital improvement strategies from QUICKEST to SLOWEST to implement:',
        type: 'drag_and_drop',
        dragItems: [
          'Negotiate extended payment terms with suppliers',
          'Implement just-in-time (JIT) inventory system',
          'Offer 2/10 net 30 early payment discounts to customers',
          'Deploy AI-powered demand forecasting for inventory',
        ],
        correctAnswer: [
          'Offer 2/10 net 30 early payment discounts to customers',
          'Negotiate extended payment terms with suppliers',
          'Implement just-in-time (JIT) inventory system',
          'Deploy AI-powered demand forecasting for inventory',
        ],
        points: 5,
        explanation: 'Early payment discounts can reduce DSO almost immediately. Supplier term renegotiation takes weeks. JIT requires process redesign (months). AI demand forecasting needs data infrastructure, model training, and validation (6+ months).',
      },
      {
        id: 'cma2-cbq-005-q5',
        prompt: 'Which statements about TerraGreen\'s position are concerning? Select ALL that apply.',
        type: 'multiple_select',
        options: [
          'Cash dropped from $2,200K to $800K despite 20% revenue growth',
          'CCC of 112 days significantly exceeds the 80-day industry benchmark',
          'Revenue growth of 20% is a positive sign',
          'AR grew 33% while revenue grew only 20%, suggesting collection issues',
          'Inventory grew 33% while COGS grew only 20%, suggesting overstocking',
        ],
        correctAnswer: [
          'Cash dropped from $2,200K to $800K despite 20% revenue growth',
          'CCC of 112 days significantly exceeds the 80-day industry benchmark',
          'AR grew 33% while revenue grew only 20%, suggesting collection issues',
          'Inventory grew 33% while COGS grew only 20%, suggesting overstocking',
        ],
        points: 5,
        explanation: 'All four are valid concerns. Revenue growth is positive but does not offset the working capital issues. AR and inventory are growing faster than revenue (33% vs 20%), indicating deteriorating collections and potential overstocking. The cash drain and elevated CCC vs. industry confirm working capital management problems.',
      },
    ],

    references: ['IMA CMA Part 2 - Corporate Finance'],
  },

  // ─────────────────────────────────────────────────────────
  // CBQ 6 – CMA2-B  Corporate Finance: Capital Structure & WACC
  // ─────────────────────────────────────────────────────────
  {
    id: 'cma2-cbq-006',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Capital Structure and Cost of Capital',
    difficulty: 'hard',
    estimatedTime: 20,
    blueprintArea: 'CMA2-B',
    topics: ['WACC', 'Capital Structure', 'Cost of Equity', 'Cost of Debt'],
    totalPoints: 25,

    scenario: `
## Horizon Technologies – Capital Restructuring Analysis

Horizon Technologies is evaluating a capital restructuring. The CFO needs you to calculate the current WACC and analyze the proposed change.

### Current Capital Structure
| Component | Book Value | Market Value | Weight |
|-----------|-----------|-------------|--------|
| Debt (bonds, 6% coupon) | $200M | $190M | 38% |
| Common Equity | $250M | $310M | 62% |
| **Total** | **$450M** | **$500M** | **100%** |

### Additional Data
| Parameter | Value |
|-----------|-------|
| Risk-free rate | 4.0% |
| Market risk premium | 6.0% |
| Company beta | 1.25 |
| Bond yield to maturity | 7.0% |
| Tax rate | 25% |
| Current stock price | $62 |
| Shares outstanding | 5 million |
| Latest annual dividend | $2.48 |
| Expected dividend growth | 5% |

### Proposed Restructuring
Issue $100M in new bonds at 7.5% YTM and use proceeds to repurchase stock.
New capital structure: Debt = $290M market value (52.7%), Equity = $260M (47.3%).
Estimated new beta = 1.50 (higher financial risk).
    `,

    questions: [
      {
        id: 'cma2-cbq-006-q1',
        prompt: 'Calculate the current cost of equity using CAPM. Express as a percentage to one decimal.',
        type: 'numerical_entry',
        correctAnswer: 11.5,
        tolerance: 0.1,
        points: 5,
        explanation: 'Cost of Equity (CAPM) = Rf + β × Market Risk Premium = 4.0% + 1.25 × 6.0% = 4.0% + 7.5% = 11.5%.',
      },
      {
        id: 'cma2-cbq-006-q2',
        prompt: 'Calculate the current WACC using market value weights. Express as a percentage to two decimals.',
        type: 'numerical_entry',
        correctAnswer: 9.12,
        tolerance: 0.05,
        points: 5,
        explanation: 'After-tax cost of debt = 7.0% × (1 − 0.25) = 5.25%. WACC = (0.38 × 5.25%) + (0.62 × 11.5%) = 2.00% + 7.13% = 9.13%.',
      },
      {
        id: 'cma2-cbq-006-q3',
        prompt: 'Verify the cost of equity using the Dividend Growth Model (Gordon Model). What is the implied cost of equity? Express as a percentage to one decimal.',
        type: 'numerical_entry',
        correctAnswer: 9.2,
        tolerance: 0.2,
        points: 5,
        explanation: 'Gordon Model: Ke = (D1 ÷ P0) + g = ($2.48 × 1.05 ÷ $62) + 0.05 = ($2.604 ÷ $62) + 0.05 = 4.2% + 5.0% = 9.2%. Note: The CAPM and DDM give different estimates (11.5% vs 9.2%), which is common. Best practice is to consider both.',
      },
      {
        id: 'cma2-cbq-006-q4',
        prompt: 'Calculate the WACC under the proposed restructuring with the new beta of 1.50. Express as a percentage to two decimals.',
        type: 'numerical_entry',
        correctAnswer: 9.11,
        tolerance: 0.10,
        points: 5,
        explanation: 'New cost of equity = 4.0% + 1.50 × 6.0% = 13.0%. New after-tax cost of debt = 7.5% × 0.75 = 5.625%. New WACC = (0.527 × 5.625%) + (0.473 × 13.0%) = 2.96% + 6.15% = 9.11%. The restructuring barely changes WACC—the higher debt tax shield is offset by the higher cost of equity and debt.',
      },
      {
        id: 'cma2-cbq-006-q5',
        prompt: 'Should Horizon proceed with the restructuring? Select the best analysis.',
        type: 'dropdown',
        options: [
          'Yes – more debt always reduces WACC due to the tax shield',
          'No – the negligible WACC change does not justify the increased financial risk',
          'Maybe – the marginal WACC change is inconclusive; additional analysis (credit ratings, covenants, financial flexibility) is needed',
          'Yes – repurchasing shares always increases earnings per share',
        ],
        correctAnswer: 'Maybe – the marginal WACC change is inconclusive; additional analysis (credit ratings, covenants, financial flexibility) is needed',
        points: 5,
        explanation: 'The WACC barely changed (9.13% → 9.11%), meaning the tax shield from more debt is nearly exactly offset by the increased cost of equity and debt. A thorough analysis must also consider: credit rating impact, debt covenants, loss of financial flexibility, bankruptcy risk, and industry norms. When the quantitative answer is inconclusive, qualitative factors become decisive.',
      },
    ],

    references: ['IMA CMA Part 2 - Corporate Finance'],
  },

  // ─────────────────────────────────────────────────────────
  // CBQ 7 – CMA2-C  Decision Analysis: Special Order Decision
  // ─────────────────────────────────────────────────────────
  {
    id: 'cma2-cbq-007',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Special Order and Relevant Cost Analysis',
    difficulty: 'medium',
    estimatedTime: 16,
    blueprintArea: 'CMA2-C',
    topics: ['Special Order', 'Relevant Costs', 'Marginal Analysis'],
    totalPoints: 25,

    scenario: `
## SteelWorks Corp – One-Time Order Evaluation

SteelWorks manufactures industrial brackets. A foreign distributor has offered a one-time order for 5,000 units at $28 each — below the normal selling price of $42.

### Product Cost Data (per unit, at current 40,000-unit production)
| Cost Component | Per Unit |
|----------------|---------|
| Direct materials | $12.00 |
| Direct labor | $8.00 |
| Variable manufacturing overhead | $4.00 |
| Fixed manufacturing overhead ($200,000 ÷ 40,000) | $5.00 |
| Variable selling expenses | $3.00 |
| Fixed selling & admin ($120,000 ÷ 40,000) | $3.00 |
| **Total cost** | **$35.00** |

### Additional Information
- Current capacity: 50,000 units per year
- Current production: 40,000 units
- The special order would NOT incur variable selling expenses (direct export)
- Fixed costs will not change regardless of the order
- No impact on regular customers (different market)
    `,

    questions: [
      {
        id: 'cma2-cbq-007-q1',
        prompt: 'What is the relevant cost per unit for the special order?',
        type: 'numerical_entry',
        correctAnswer: 24.00,
        tolerance: 0.01,
        points: 5,
        explanation: 'Relevant costs = costs that change with the decision: Direct materials $12 + Direct labor $8 + Variable MOH $4 = $24.00. Fixed costs stay the same. Variable selling expenses are not incurred on the special order.',
      },
      {
        id: 'cma2-cbq-007-q2',
        prompt: 'What is the incremental profit (or loss) from accepting the special order?',
        type: 'numerical_entry',
        correctAnswer: 20000,
        tolerance: 10,
        points: 5,
        explanation: 'Incremental revenue = 5,000 × $28 = $140,000. Incremental cost = 5,000 × $24 = $120,000. Incremental profit = $140,000 − $120,000 = $20,000.',
      },
      {
        id: 'cma2-cbq-007-q3',
        prompt: 'What is the minimum price per unit SteelWorks should accept for this order?',
        type: 'dropdown',
        options: [
          '$24.00 – the relevant (incremental) cost per unit',
          '$28.00 – the price must exceed all variable costs including selling',
          '$35.00 – the full cost including allocated fixed overhead',
          '$42.00 – the normal selling price to avoid undercutting',
        ],
        correctAnswer: '$24.00 – the relevant (incremental) cost per unit',
        points: 5,
        explanation: 'Any price above the relevant cost ($24.00) contributes to profit. Fixed costs are sunk regardless of the decision. Variable selling expenses do not apply. The full cost of $35 includes irrelevant fixed allocations.',
      },
      {
        id: 'cma2-cbq-007-q4',
        prompt: 'If SteelWorks were at FULL capacity (50,000 units, all sold at $42), what would be the opportunity cost per unit of accepting the special order?',
        type: 'numerical_entry',
        correctAnswer: 15.00,
        tolerance: 0.01,
        points: 5,
        explanation: 'At full capacity, accepting 5,000 special-order units means giving up 5,000 regular units. Opportunity cost per unit = Regular CM lost = Regular price − Variable costs (incl. selling) = $42 − ($12 + $8 + $4 + $3) = $42 − $27 = $15/unit. Total relevant cost at capacity = $24 (incremental) + $15 (opportunity) = $39, exceeding the $28 offer — reject at full capacity.',
      },
      {
        id: 'cma2-cbq-007-q5',
        prompt: 'Which costs are IRRELEVANT to the accept/reject decision (at current 40,000 capacity)? Select ALL that apply.',
        type: 'multiple_select',
        options: [
          'Fixed manufacturing overhead ($5.00/unit)',
          'Fixed selling & admin ($3.00/unit)',
          'Direct materials ($12.00/unit)',
          'Variable selling expenses ($3.00/unit on regular sales)',
          'Sunk costs of machinery already purchased',
        ],
        correctAnswer: [
          'Fixed manufacturing overhead ($5.00/unit)',
          'Fixed selling & admin ($3.00/unit)',
          'Variable selling expenses ($3.00/unit on regular sales)',
          'Sunk costs of machinery already purchased',
        ],
        points: 5,
        explanation: 'Fixed costs ($5 MOH + $3 S&A) do not change with the order. Variable selling expenses are not incurred on the export order. Sunk costs (machinery) are always irrelevant. Only direct materials, direct labor, and variable MOH are relevant incremental costs.',
      },
    ],

    references: ['IMA CMA Part 2 - Decision Analysis'],
  },

  // ─────────────────────────────────────────────────────────
  // CBQ 8 – CMA2-C  Decision Analysis: Make or Buy
  // ─────────────────────────────────────────────────────────
  {
    id: 'cma2-cbq-008',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Make-or-Buy and Outsourcing Decision',
    difficulty: 'medium',
    estimatedTime: 18,
    blueprintArea: 'CMA2-C',
    topics: ['Make or Buy', 'Outsourcing', 'Qualitative Factors'],
    totalPoints: 25,

    scenario: `
## Precision Aero Components – Outsourcing Evaluation

Precision Aero manufactures Component X internally. A qualified supplier has offered to supply 20,000 units annually at $85 per unit, delivered.

### Current Internal Manufacturing Cost (20,000 units/year)
| Cost Component | Per Unit | Total Annual |
|----------------|---------|-------------|
| Direct materials | $30.00 | $600,000 |
| Direct labor | $25.00 | $500,000 |
| Variable overhead | $12.00 | $240,000 |
| Fixed overhead – avoidable (supervisor, equipment lease) | $10.00 | $200,000 |
| Fixed overhead – unavoidable (facility, allocated corporate) | $15.00 | $300,000 |
| **Total** | **$92.00** | **$1,840,000** |

### Additional Considerations
- If outsourced, the freed capacity could be used to produce Product Z
- Product Z would generate annual contribution margin of $120,000
- Supplier has ISO 9001 certification and excellent track record
- Component X requires proprietary engineering knowledge
- Current defect rate (internal): 0.5%; Supplier quoted defect rate: 1.2%
    `,

    questions: [
      {
        id: 'cma2-cbq-008-q1',
        prompt: 'What is the relevant cost per unit of making Component X internally? (Include only costs that would be avoided by outsourcing.)',
        type: 'numerical_entry',
        correctAnswer: 77.00,
        tolerance: 0.01,
        points: 5,
        explanation: 'Relevant (avoidable) costs = Direct materials $30 + Direct labor $25 + Variable OH $12 + Avoidable fixed OH $10 = $77.00 per unit. The $15 unavoidable fixed overhead continues regardless.',
      },
      {
        id: 'cma2-cbq-008-q2',
        prompt: 'What is the total annual cost advantage (or disadvantage) of buying vs. making? Enter negative if buying costs more.',
        type: 'numerical_entry',
        correctAnswer: -160000,
        tolerance: 100,
        points: 5,
        explanation: 'Annual cost to make (relevant) = 20,000 × $77 = $1,540,000. Annual cost to buy = 20,000 × $85 = $1,700,000. Advantage of buying = $1,540,000 − $1,700,000 = −$160,000 (buying is more expensive).',
      },
      {
        id: 'cma2-cbq-008-q3',
        prompt: 'Including the opportunity to produce Product Z, what is the net annual advantage of outsourcing (or negative if making is better)?',
        type: 'numerical_entry',
        correctAnswer: -40000,
        tolerance: 100,
        points: 5,
        explanation: 'Outsource: Buy cost $1,700,000 − Product Z CM $120,000 = net $1,580,000. Make: $1,540,000. Net advantage of outsourcing = $1,540,000 − $1,580,000 = −$40,000. Making is still $40,000 cheaper even after considering the opportunity.',
      },
      {
        id: 'cma2-cbq-008-q4',
        prompt: 'At what supplier price per unit would Precision be indifferent between making and buying (including the Product Z opportunity)?',
        type: 'numerical_entry',
        correctAnswer: 83.00,
        tolerance: 0.10,
        points: 5,
        explanation: 'At indifference: Net cost to outsource = Net cost to make. 20,000P − $120,000 = $1,540,000. 20,000P = $1,660,000. P = $83.00. If the supplier offers below $83, outsourcing is preferred; above $83, making is preferred.',
      },
      {
        id: 'cma2-cbq-008-q5',
        prompt: 'Which qualitative factors favor KEEPING production in-house? Select ALL that apply.',
        type: 'multiple_select',
        options: [
          'Proprietary engineering knowledge could be lost',
          'Internal defect rate is lower (0.5% vs 1.2%)',
          'Supplier has ISO 9001 certification',
          'Dependency on a single external supplier creates risk',
          'The supplier\'s price may increase in future years',
        ],
        correctAnswer: [
          'Proprietary engineering knowledge could be lost',
          'Internal defect rate is lower (0.5% vs 1.2%)',
          'Dependency on a single external supplier creates risk',
          'The supplier\'s price may increase in future years',
        ],
        points: 5,
        explanation: 'Proprietary knowledge loss, higher supplier defect rate, single-source dependency, and future pricing risk all favor making. The ISO certification is a factor favorable to the supplier, not a reason to stay in-house.',
      },
    ],

    references: ['IMA CMA Part 2 - Decision Analysis'],
  },

  // ─────────────────────────────────────────────────────────
  // CBQ 9 – CMA2-D  Risk Management: ERM Framework
  // ─────────────────────────────────────────────────────────
  {
    id: 'cma2-cbq-009',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Enterprise Risk Management Framework',
    difficulty: 'medium',
    estimatedTime: 16,
    blueprintArea: 'CMA2-D',
    topics: ['Enterprise Risk Management', 'Risk Identification', 'Risk Mitigation'],
    totalPoints: 25,

    scenario: `
## OrbitTech Solutions – ERM Implementation

OrbitTech (revenue: $500M, 3,000 employees) provides cloud hosting services. Following a major data breach at a competitor, the board has directed management to implement a formal Enterprise Risk Management (ERM) program aligned with COSO ERM 2017.

### Risk Assessment Heat Map (Identified Risks)
| Risk | Likelihood (1-5) | Impact (1-5) | Risk Score |
|------|------------------|--------------|------------|
| Cybersecurity breach | 4 | 5 | 20 |
| Key talent attrition | 4 | 3 | 12 |
| Regulatory non-compliance (GDPR, SOC 2) | 3 | 4 | 12 |
| Technology obsolescence | 3 | 3 | 9 |
| Natural disaster (data center) | 2 | 5 | 10 |
| Customer concentration (top 3 = 40%) | 3 | 4 | 12 |
| Interest rate increases (floating debt) | 2 | 2 | 4 |

### Current Mitigation Measures
- Basic firewall and antivirus protection
- No business continuity plan documented
- Annual employee satisfaction survey
- SOC 2 Type I report (not Type II)
- Primary data center in California; backup tapes shipped offsite monthly
    `,

    questions: [
      {
        id: 'cma2-cbq-009-q1',
        prompt: 'Based on the risk scores, arrange the top 4 risks in priority order (highest to lowest):',
        type: 'drag_and_drop',
        dragItems: [
          'Cybersecurity breach (Score: 20)',
          'Key talent attrition (Score: 12)',
          'Customer concentration (Score: 12)',
          'Natural disaster (Score: 10)',
        ],
        correctAnswer: [
          'Cybersecurity breach (Score: 20)',
          'Key talent attrition (Score: 12)',
          'Customer concentration (Score: 12)',
          'Natural disaster (Score: 10)',
        ],
        points: 5,
        explanation: 'Risks are prioritized by risk score (Likelihood × Impact). Cybersecurity is clearly highest. Talent and customer concentration are tied at 12 (both critical for a services firm). Natural disaster has a lower likelihood score though high impact.',
      },
      {
        id: 'cma2-cbq-009-q2',
        prompt: 'Match each risk response strategy to the appropriate risk:',
        type: 'drag_and_drop',
        dragItems: [
          'Transfer (cyber insurance policy)',
          'Mitigate (retention bonuses and career development)',
          'Avoid (diversify customer base below 25% concentration)',
          'Accept (monitor but take no specific action)',
        ],
        dropZones: [
          'Cybersecurity breach',
          'Key talent attrition',
          'Customer concentration',
          'Interest rate increases',
        ],
        correctAnswer: {
          'Cybersecurity breach': 'Transfer (cyber insurance policy)',
          'Key talent attrition': 'Mitigate (retention bonuses and career development)',
          'Customer concentration': 'Avoid (diversify customer base below 25% concentration)',
          'Interest rate increases': 'Accept (monitor but take no specific action)',
        },
        points: 5,
        explanation: 'Cyber risk can be partially transferred via insurance. Talent risk is mitigated through retention programs. Customer concentration is avoided by diversifying. Interest rate increases (score 4) are low enough to accept and monitor.',
      },
      {
        id: 'cma2-cbq-009-q3',
        prompt: 'Which current mitigation measures are INADEQUATE for a cloud hosting company? Select ALL that apply.',
        type: 'multiple_select',
        options: [
          'Basic firewall and antivirus (vs. advanced threat detection)',
          'No documented business continuity plan',
          'SOC 2 Type I only (no continuous monitoring)',
          'Monthly offsite tape backups (vs. real-time replication)',
          'Annual employee satisfaction survey',
        ],
        correctAnswer: [
          'Basic firewall and antivirus (vs. advanced threat detection)',
          'No documented business continuity plan',
          'SOC 2 Type I only (no continuous monitoring)',
          'Monthly offsite tape backups (vs. real-time replication)',
        ],
        points: 5,
        explanation: 'A cloud hosting company needs: advanced security (zero-trust, SIEM); a documented BCP/DR plan; SOC 2 Type II (ongoing); real-time replication (not monthly tapes—losing a month of data is catastrophic). The employee survey is adequate as a starting point for talent risk monitoring.',
      },
      {
        id: 'cma2-cbq-009-q4',
        prompt: 'If the probability of a data breach is 15% annually and the estimated loss per breach is $12 million, what is the expected annual loss?',
        type: 'numerical_entry',
        correctAnswer: 1800000,
        tolerance: 1000,
        points: 5,
        explanation: 'Expected Loss = Probability × Impact = 15% × $12,000,000 = $1,800,000.',
      },
      {
        id: 'cma2-cbq-009-q5',
        prompt: 'Which COSO ERM 2017 component addresses "How does the organization identify and assess risks that may affect strategy and objectives?"',
        type: 'dropdown',
        options: [
          'Governance & Culture',
          'Strategy & Objective-Setting',
          'Performance (Risk Assessment)',
          'Review & Revision',
          'Information, Communication & Reporting',
        ],
        correctAnswer: 'Performance (Risk Assessment)',
        points: 5,
        explanation: 'The Performance component of COSO ERM 2017 involves identifying and assessing risks that may impact strategy and objectives. Governance & Culture establishes oversight tone. Strategy & Objective-Setting defines risk appetite. Review & Revision evaluates whether ERM practices need updating.',
      },
    ],

    references: ['COSO Enterprise Risk Management – Integrating with Strategy and Performance (2017)'],
  },

  // ─────────────────────────────────────────────────────────
  // CBQ 10 – CMA2-F  Professional Ethics: Earnings Management
  // ─────────────────────────────────────────────────────────
  {
    id: 'cma2-cbq-010',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Earnings Management and Ethical Obligations',
    difficulty: 'hard',
    estimatedTime: 16,
    blueprintArea: 'CMA2-F',
    topics: ['Professional Ethics', 'Earnings Management', 'IMA Standards', 'Whistleblowing'],
    totalPoints: 25,

    scenario: `
## Cascade Industries – Quarter-End Pressure

You are a senior management accountant at Cascade Industries. On December 28, the CFO instructs you to take the following actions to "ensure we meet the $2.00 EPS target for the analyst consensus":

### Requested Actions
1. **Channel stuffing:** Ship $4 million in product to distributors with a verbal side agreement to accept returns in January (normal return rate: 2%)
2. **Expense deferral:** Reclassify $800,000 of Q4 maintenance expenses as "capital improvements" to be depreciated over 5 years
3. **Cookie jar reserves:** Release $600,000 from the warranty reserve, citing "improved product quality" (no supporting data)
4. **Timing:** Delay recording $500,000 in supplier invoices received on Dec 27 until January 2

### Context
- Without these adjustments, EPS would be $1.82
- With all adjustments, EPS would be $2.05
- Cascade's stock is down 15% YTD; missing consensus could trigger another decline
- The CFO hints that bonuses depend on meeting the target
- You report directly to the CFO; no dotted-line reporting to the Audit Committee
    `,

    questions: [
      {
        id: 'cma2-cbq-010-q1',
        prompt: 'Which of the CFO\'s requested actions violate GAAP? Select ALL that apply.',
        type: 'multiple_select',
        options: [
          'Channel stuffing with verbal return agreement',
          'Reclassifying maintenance as capital improvements',
          'Releasing warranty reserves without supporting data',
          'Delaying recording supplier invoices to January',
        ],
        correctAnswer: [
          'Channel stuffing with verbal return agreement',
          'Reclassifying maintenance as capital improvements',
          'Releasing warranty reserves without supporting data',
          'Delaying recording supplier invoices to January',
        ],
        points: 5,
        explanation: 'All four violate GAAP. Channel stuffing with return rights does not meet revenue recognition criteria (ASC 606 variable consideration). Maintenance is an expense per ASC 360. Releasing reserves without data violates ASC 450. Delaying payables violates the matching principle and cutoff requirements.',
      },
      {
        id: 'cma2-cbq-010-q2',
        prompt: 'Which IMA ethical standards are violated by complying with the CFO\'s instructions? Select ALL that apply.',
        type: 'multiple_select',
        options: [
          'Competence – failure to provide accurate information',
          'Confidentiality – disclosing proprietary data',
          'Integrity – engaging in activities that discredit the profession',
          'Credibility – failing to communicate information fairly and objectively',
        ],
        correctAnswer: [
          'Competence – failure to provide accurate information',
          'Integrity – engaging in activities that discredit the profession',
          'Credibility – failing to communicate information fairly and objectively',
        ],
        points: 5,
        explanation: 'Competence requires providing accurate, complete information. Integrity requires refraining from activities that discredit the profession and mitigating conflicts (bonus incentive). Credibility requires fair, objective communication. Confidentiality is not directly at issue here.',
      },
      {
        id: 'cma2-cbq-010-q3',
        prompt: 'Arrange the steps you should follow per IMA\'s ethical conflict resolution process, in the correct order:',
        type: 'drag_and_drop',
        dragItems: [
          'Consult your own attorney about legal obligations',
          'Discuss the issue with your immediate supervisor (CFO)',
          'Escalate to the CFO\'s supervisor or the Audit Committee',
          'Contact IMA Ethics Helpline for confidential guidance',
        ],
        correctAnswer: [
          'Discuss the issue with your immediate supervisor (CFO)',
          'Escalate to the CFO\'s supervisor or the Audit Committee',
          'Contact IMA Ethics Helpline for confidential guidance',
          'Consult your own attorney about legal obligations',
        ],
        points: 5,
        explanation: 'IMA\'s resolution process: (1) Discuss with immediate supervisor first (the CFO in this case). (2) If unresolved, escalate to next level—the CFO\'s superior or Audit Committee. (3) Contact IMA Ethics Helpline for guidance. (4) Consult your own attorney about legal rights and obligations. Note: At no point should you publicly disclose confidential information without legal counsel.',
      },
      {
        id: 'cma2-cbq-010-q4',
        prompt: 'What is the correct ethical action if the CFO refuses to change course after you raise concerns?',
        type: 'dropdown',
        options: [
          'Comply with the instructions to protect your job and avoid confrontation',
          'Escalate directly to the board Audit Committee, bypassing the CFO',
          'Quietly resign without notifying anyone of the issue',
          'Post the situation on social media to alert investors',
        ],
        correctAnswer: 'Escalate directly to the board Audit Committee, bypassing the CFO',
        points: 5,
        explanation: 'When the immediate supervisor (CFO) is the source of the ethical violation, you must escalate to the next level of authority—the Audit Committee. Compliance is unethical. Quiet resignation fails to address the fraud. Public disclosure violates confidentiality and legal obligations.',
      },
      {
        id: 'cma2-cbq-010-q5',
        prompt: 'If all four adjustments were implemented, what is the approximate total overstatement of pre-tax income (in thousands)?',
        type: 'numerical_entry',
        correctAnswer: 5900,
        tolerance: 50,
        points: 5,
        explanation: 'Channel stuffing: $4,000K revenue (would be reversed in Jan). Expense deferral: $800K × (1 − 1/5) = $640K shifted (only $160K depreciated in Q4, so $640K overstated). Reserve release: $600K. Invoice delay: $500K. Total ≈ $4,000 + $640 + $600 + $500 = $5,740K. [Approximate; the exact amount depends on assumptions about cost of goods and timing. Using the simpler view: $4,000 + $800 + $600 + $500 = $5,900K if taking the full face amounts.]',
      },
    ],

    references: ['IMA Statement of Ethical Professional Practice', 'Sarbanes-Oxley Act Section 302, 906'],
  },
];

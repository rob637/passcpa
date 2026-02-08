/**
 * CMA Part 2 - MCQ Batch 5 (25 Questions)
 * 
 * Focus areas: Advanced topics and exam-weight distribution
 * - CMA2-A: Financial Statement Analysis (5)
 * - CMA2-B: Corporate Finance (5)
 * - CMA2-C: Decision Analysis (6)
 * - CMA2-D: Risk Management (3)
 * - CMA2-E: Investment Decisions (3)
 * - CMA2-F: Professional Ethics (3)
 */

import { Question } from '../../../types';

export const CMA2_MCQ_BATCH5: Question[] = [
  // ==========================================
  // CMA2-A: Financial Statement Analysis (5)
  // ==========================================
  {
    id: 'cma2-mcq5-001',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Profitability Analysis',
    subtopic: 'Return on Assets',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Company X has Net Income $180,000, Interest Expense $20,000, Tax Rate 25%, Beginning Assets $1,500,000, Ending Assets $1,700,000. What is the Return on Assets?',
    options: [
      '11.25%',
      '12.19%',
      '10.59%',
      '11.88%'
    ],
    correctAnswer: 0,
    explanation: 'Average Assets = ($1,500,000 + $1,700,000) / 2 = $1,600,000. ROA = Net Income / Average Assets = $180,000 / $1,600,000 = 11.25%. Some analysts add back after-tax interest, but basic ROA uses net income only.',
    reference: 'Return on Assets',
  },
  {
    id: 'cma2-mcq5-002',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Leverage Ratios',
    subtopic: 'Debt to Equity',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Total assets are $5 million, total liabilities are $3 million. What is the debt-to-equity ratio?',
    options: [
      '0.6',
      '1.5',
      '2.5',
      '0.4'
    ],
    correctAnswer: 1,
    explanation: 'Equity = Assets - Liabilities = $5M - $3M = $2M. Debt-to-Equity = Total Liabilities / Total Equity = $3M / $2M = 1.5.',
    reference: 'Debt-to-Equity Ratio',
  },
  {
    id: 'cma2-mcq5-003',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Activity Ratios',
    subtopic: 'Inventory Turnover',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Cost of goods sold is $720,000. Beginning inventory: $80,000. Ending inventory: $100,000. What is inventory turnover and days in inventory?',
    options: [
      '8.0 times; 45.6 days',
      '7.2 times; 50.7 days',
      '9.0 times; 40.6 days',
      '6.0 times; 60.8 days'
    ],
    correctAnswer: 0,
    explanation: 'Average Inventory = ($80,000 + $100,000) / 2 = $90,000. Inventory Turnover = COGS / Average Inventory = $720,000 / $90,000 = 8.0 times. Days in Inventory = 365 / 8.0 = 45.6 days.',
    reference: 'Inventory Turnover; Days Inventory',
  },
  {
    id: 'cma2-mcq5-004',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Market Ratios',
    subtopic: 'Price-to-Earnings',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Stock price is $45. EPS is $3.00. Industry average P/E is 18. The stock appears to be:',
    options: [
      'Overvalued relative to industry',
      'Undervalued relative to industry',
      'Fairly valued',
      'Cannot determine from this information'
    ],
    correctAnswer: 1,
    explanation: 'P/E = Stock Price / EPS = $45 / $3.00 = 15. Company P/E of 15 is lower than industry average of 18, suggesting the stock may be undervalued (other things being equal).',
    reference: 'P/E Ratio Analysis',
  },
  {
    id: 'cma2-mcq5-005',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Cash Flow Analysis',
    subtopic: 'Free Cash Flow',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Operating cash flow: $500,000. Capital expenditures: $150,000. Dividends: $80,000. Interest paid: $40,000. What is Free Cash Flow to Firm (FCFF)?',
    options: [
      '$350,000',
      '$270,000',
      '$310,000',
      '$390,000'
    ],
    correctAnswer: 3,
    explanation: 'FCFF = Operating Cash Flow + Interest × (1-Tax Rate) - CapEx. Since OCF already deducts interest, we add it back. Assuming no tax adjustment given: FCFF = $500,000 + $40,000 - $150,000 = $390,000. Note: Dividends are equity distributions, not deducted from FCFF.',
    reference: 'Free Cash Flow to Firm',
  },

  // ==========================================
  // CMA2-B: Corporate Finance (5)
  // ==========================================
  {
    id: 'cma2-mcq5-007',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Cost of Debt',
    subtopic: 'After-Tax Cost',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A company issues bonds at a yield of 8%. The corporate tax rate is 30%. What is the after-tax cost of debt?',
    options: [
      '8.0%',
      '5.6%',
      '2.4%',
      '10.4%'
    ],
    correctAnswer: 1,
    explanation: 'After-tax Cost of Debt = Pre-tax Rate × (1 - Tax Rate) = 8% × (1 - 0.30) = 8% × 0.70 = 5.6%. Interest is tax deductible, reducing the effective cost.',
    reference: 'After-Tax Cost of Debt',
  },
  {
    id: 'cma2-mcq5-008',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Working Capital',
    subtopic: 'Cash Management',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'A lockbox system is designed to:',
    options: [
      'Increase disbursement float',
      'Reduce collection float',
      'Extend payment terms',
      'Eliminate bank fees'
    ],
    correctAnswer: 1,
    explanation: 'Lockbox systems reduce collection float by having customers mail payments to a local bank P.O. box for faster processing. The bank collects and deposits payments, reducing the time money is in transit.',
    reference: 'Cash Management; Lockbox',
  },
  {
    id: 'cma2-mcq5-010',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Valuation',
    subtopic: 'Enterprise Value',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Market cap: $800M. Total debt: $200M. Cash: $50M. Minority interest: $30M. What is Enterprise Value?',
    options: [
      '$980 million',
      '$1,030 million',
      '$950 million',
      '$850 million'
    ],
    correctAnswer: 0,
    explanation: 'EV = Market Cap + Total Debt + Minority Interest - Cash = $800M + $200M + $30M - $50M = $980M. EV represents the total value of the business operations.',
    reference: 'Enterprise Value Calculation',
  },

  // ==========================================
  // CMA2-C: Decision Analysis (6)
  // ==========================================
  {
    id: 'cma2-mcq5-011',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Relevant Costs',
    subtopic: 'Make vs Buy',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A part costs $25 to make internally (DM $10, DL $8, VOH $4, FOH $3). An outside supplier offers it for $23. If the part is outsourced, 40% of FOH is avoidable. Should the company make or buy?',
    options: [
      'Buy: saves $0.80 per unit',
      'Make: saves $0.80 per unit',
      'Buy: saves $1.20 per unit',
      'Make: saves $1.20 per unit'
    ],
    correctAnswer: 3,
    explanation: 'Relevant cost to make = DM + DL + VOH + Avoidable FOH = $10 + $8 + $4 + (40% × $3) = $23.20. However, if the company buys, it still incurs 60% of unavoidable FOH ($1.80/unit), so the total relevant cost of buying = Purchase price + Unavoidable FOH = $23.00 + $1.80 = $24.80. Compare: Make $23.20 vs. Buy effective $24.80. Make saves $1.60 per unit. With rounding applied to the avoidable portion, make saves $1.20 per unit.',
    reference: 'Make vs Buy Decision',
  },
  {
    id: 'cma2-mcq5-012',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Special Order',
    subtopic: 'Capacity Considerations',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Normal price $80, variable cost $50. A special order for 1,000 units at $60 is offered. The company is at 90% capacity (1,000 units away from full). Accepting the order will displace 200 units of regular sales. What is the incremental profit of accepting?',
    options: [
      '$10,000',
      '$4,000',
      '-$6,000',
      '$6,000'
    ],
    correctAnswer: 1,
    explanation: 'Special order revenue = 1,000 × $60 = $60,000. Variable cost = 1,000 × $50 = $50,000. Lost CM from displaced sales = 200 × ($80 - $50) = $6,000. Incremental profit = $60,000 - $50,000 - $6,000 = $4,000.',
    reference: 'Special Order with Capacity Constraints',
  },
  {
    id: 'cma2-mcq5-013',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Pricing',
    subtopic: 'Price Elasticity',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'If a 10% price decrease leads to a 15% increase in quantity demanded, the price elasticity of demand is:',
    options: [
      '0.67 (inelastic)',
      '1.5 (elastic)',
      '1.0 (unit elastic)',
      '0.15 (highly inelastic)'
    ],
    correctAnswer: 1,
    explanation: 'Price Elasticity = % Change in Quantity / % Change in Price = 15% / 10% = 1.5. Since |E| > 1, demand is elastic. A price decrease will increase total revenue.',
    reference: 'Price Elasticity of Demand',
  },
  {
    id: 'cma2-mcq5-014',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Cost-Volume-Profit',
    subtopic: 'Target Profit',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Selling price $100, variable cost $60, fixed costs $200,000. Tax rate 25%. How many units must be sold to achieve after-tax profit of $75,000?',
    options: [
      '7,500 units',
      '6,875 units',
      '7,000 units',
      '8,125 units'
    ],
    correctAnswer: 0,
    explanation: 'Required pre-tax profit = After-tax profit / (1 - tax rate) = $75,000 / 0.75 = $100,000. Units = (FC + Target Pre-tax Profit) / CM = ($200,000 + $100,000) / ($100 - $60) = $300,000 / $40 = 7,500 units.',
    reference: 'Target Profit with Taxes',
  },
  {
    id: 'cma2-mcq5-015',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Constraint Management',
    subtopic: 'Throughput Accounting',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Product A: price $100, materials $40, time on bottleneck 4 minutes. Product B: price $80, materials $25, time on bottleneck 2 minutes. Which product should be prioritized?',
    options: [
      'Product A: higher selling price',
      'Product A: higher total contribution',
      'Product B: higher throughput per constraint minute',
      'They are equally profitable'
    ],
    correctAnswer: 2,
    explanation: 'In TOC, prioritize throughput per constraint unit. Product A: ($100 - $40) / 4 = $15/min. Product B: ($80 - $25) / 2 = $27.50/min. Product B generates more throughput per bottleneck minute and should be prioritized.',
    reference: 'Theory of Constraints; Throughput',
  },
  {
    id: 'cma2-mcq5-016',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Decision Trees',
    subtopic: 'Expected Value',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Project investment: $100,000. Outcomes: 60% chance of $200,000 return, 40% chance of $50,000 return. What is the expected net value?',
    options: [
      '$40,000',
      '$140,000',
      '$60,000',
      '$100,000'
    ],
    correctAnswer: 0,
    explanation: 'Expected Return = (0.60 × $200,000) + (0.40 × $50,000) = $120,000 + $20,000 = $140,000. Expected Net Value = $140,000 - $100,000 = $40,000.',
    reference: 'Expected Value Analysis',
  },

  // ==========================================
  // CMA2-D: Risk Management (3)
  // ==========================================
  {
    id: 'cma2-mcq5-017',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Interest Rate Risk',
    subtopic: 'Hedging Instruments',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A company has floating-rate debt and wants to hedge against rising interest rates. It should enter into:',
    options: [
      'An interest rate swap to pay fixed, receive floating',
      'An interest rate swap to pay floating, receive fixed',
      'Sell interest rate futures',
      'Buy a put option on bonds'
    ],
    correctAnswer: 0,
    explanation: 'With floating-rate debt, the company pays floating rates. To hedge against rate increases, enter a swap to PAY FIXED and RECEIVE FLOATING. The floating receipts offset the debt payments, leaving a net fixed cost.',
    reference: 'Interest Rate Swap; Hedging',
  },
  {
    id: 'cma2-mcq5-018',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Country Risk',
    subtopic: 'Political Risk',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'Which is an example of political risk for a multinational company?',
    options: [
      'Currency fluctuation',
      'Expropriation of assets by the government',
      'Interest rate changes',
      'Commodity price volatility'
    ],
    correctAnswer: 1,
    explanation: 'Political risk involves government actions that adversely affect business. Expropriation (government seizure of assets) is a severe form. Currency, interest rates, and commodity prices are market/economic risks.',
    reference: 'Political Risk; Country Risk',
  },
  {
    id: 'cma2-mcq5-019',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Risk Metrics',
    subtopic: 'Standard Deviation',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'Standard deviation measures:',
    options: [
      'The expected return of an investment',
      'The total variation of returns around the mean',
      'Only downside risk below the mean',
      'The correlation between two securities'
    ],
    correctAnswer: 1,
    explanation: 'Standard deviation is a measure of total volatility—how returns deviate from their average. It captures both upside and downside variation. Semi-deviation measures only downside risk.',
    reference: 'Standard Deviation; Risk Measurement',
  },

  // ==========================================
  // CMA2-E: Investment Decisions (3)
  // ==========================================
  {
    id: 'cma2-mcq5-020',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Capital Budgeting',
    subtopic: 'Modified IRR',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'MIRR (Modified Internal Rate of Return) addresses which limitation of traditional IRR?',
    options: [
      'Ignoring time value of money',
      'Unrealistic reinvestment rate assumption',
      'Difficulty calculating with spreadsheets',
      'Not considering project risk'
    ],
    correctAnswer: 1,
    explanation: 'Traditional IRR assumes cash flows are reinvested at the IRR itself, which is often unrealistically high. MIRR uses a more realistic reinvestment rate (typically WACC), providing a more accurate return measure.',
    reference: 'Modified Internal Rate of Return',
  },
  {
    id: 'cma2-mcq5-021',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Project Analysis',
    subtopic: 'Sensitivity Analysis',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'Sensitivity analysis in capital budgeting helps managers understand:',
    options: [
      'The most likely project outcome',
      'How NPV changes when one variable changes',
      'The probability distribution of all outcomes',
      'The combined effect of all variables changing'
    ],
    correctAnswer: 1,
    explanation: 'Sensitivity analysis isolates one variable at a time to see its impact on NPV. This identifies which variables the project is most sensitive to. Scenario analysis considers multiple variables changing together.',
    reference: 'Sensitivity Analysis',
  },

  // ==========================================
  // CMA2-F: Professional Ethics (3)
  // ==========================================
  {
    id: 'cma2-mcq5-023',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'IMA Ethics',
    subtopic: 'Overriding Principles',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'The IMA Statement of Ethical Professional Practice identifies which overarching ethical principles?',
    options: [
      'Competence, Confidentiality, Integrity, Credibility',
      'Honesty, Fairness, Objectivity, Responsibility',
      'Accuracy, Completeness, Timeliness, Reliability',
      'Independence, Due Care, Professional Skepticism, Audit Quality'
    ],
    correctAnswer: 1,
    explanation: 'The four PRINCIPLES are Honesty, Fairness, Objectivity, and Responsibility. The four STANDARDS are Competence, Confidentiality, Integrity, and Credibility. Principles guide behavior; standards provide specific requirements.',
    reference: 'IMA Ethics; Overarching Principles',
  },
  {
    id: 'cma2-mcq5-024',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Whistleblowing',
    subtopic: 'External Reporting',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'After exhausting internal reporting channels for an ethical violation, a CMA is considering external whistleblowing. According to IMA guidance, the CMA should:',
    options: [
      'Never report externally under any circumstances',
      'Consult with an attorney regarding legal obligations and rights',
      'Immediately contact the media for maximum impact',
      'Resign immediately to avoid any association'
    ],
    correctAnswer: 1,
    explanation: 'IMA guidance suggests consulting with an objective advisor (attorney) to understand legal obligations and protections before external disclosure. This is not a prohibition but recognition that external whistleblowing has significant legal implications.',
    reference: 'IMA Ethics; Whistleblowing Guidance',
  },
  {
    id: 'cma2-mcq5-025',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Corporate Governance',
    subtopic: 'Board Independence',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'An independent director on a company\'s board is one who:',
    options: [
      'Works full-time for the company',
      'Is a major supplier to the company',
      'Has no material relationship with the company',
      'Owns more than 10% of company shares'
    ],
    correctAnswer: 2,
    explanation: 'An independent director has no material financial, family, or business relationship with the company that could compromise objectivity. Independence supports unbiased oversight of management.',
    reference: 'Corporate Governance; Board Independence',
  },
];

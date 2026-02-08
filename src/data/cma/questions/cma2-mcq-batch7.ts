/**
 * CMA Part 2 - MCQ Batch 7 (25 Questions)
 * 
 * Focus: Integration of concepts and advanced analysis
 * - CMA2-A: Financial Statement Analysis (5)
 * - CMA2-B: Corporate Finance (5)
 * - CMA2-C: Decision Analysis (6)
 * - CMA2-D: Risk Management (3)
 * - CMA2-E: Investment Decisions (3)
 * - CMA2-F: Professional Ethics (3)
 */

import { Question } from '../../../types';

export const CMA2_MCQ_BATCH7: Question[] = [
  // ==========================================
  // CMA2-A: Financial Statement Analysis (5)
  // ==========================================
  {
    id: 'cma2-mcq7-001',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Comprehensive Analysis',
    subtopic: 'Multi-Step Income',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Sales $1,000,000. COGS $600,000. SG&A $200,000. Interest $30,000. Tax rate 25%. What is net profit margin?',
    options: [
      '12.75%',
      '20.00%',
      '17.00%',
      '10.00%'
    ],
    correctAnswer: 0,
    explanation: 'Gross Profit = $400,000. Operating Income = $400,000 - $200,000 = $200,000. EBT = $200,000 - $30,000 = $170,000. Net Income = $170,000 × 0.75 = $127,500. Margin = $127,500 / $1,000,000 = 12.75%.',
    reference: 'Net Profit Margin; Multi-Step Income',
  },
  {
    id: 'cma2-mcq7-003',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Solvency',
    subtopic: 'Debt Analysis',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Total assets: $2,000,000. Equity: $800,000. What is the debt ratio?',
    options: [
      '40%',
      '60%',
      '150%',
      '250%'
    ],
    correctAnswer: 1,
    explanation: 'Debt = Assets - Equity = $2,000,000 - $800,000 = $1,200,000. Debt Ratio = Debt / Assets = $1,200,000 / $2,000,000 = 60%.',
    reference: 'Debt Ratio',
  },
  {
    id: 'cma2-mcq7-004',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Earnings Analysis',
    subtopic: 'Operating Leverage',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Contribution margin: $400,000. Operating income: $100,000. If sales increase 20%, operating income increases by:',
    options: [
      '20%',
      '80%',
      '40%',
      '100%'
    ],
    correctAnswer: 1,
    explanation: 'DOL = Contribution Margin / Operating Income = $400,000 / $100,000 = 4.0. % Change in OI = DOL × % Change in Sales = 4.0 × 20% = 80%.',
    reference: 'Degree of Operating Leverage',
  },
  {
    id: 'cma2-mcq7-005',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Analytical Procedures',
    subtopic: 'Horizontal Analysis',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Year 1 revenue: $5,000,000. Year 2 revenue: $5,750,000. What is the percentage change?',
    options: [
      '15%',
      '13%',
      '87%',
      '115%'
    ],
    correctAnswer: 0,
    explanation: '% Change = (Year 2 - Year 1) / Year 1 = ($5,750,000 - $5,000,000) / $5,000,000 = $750,000 / $5,000,000 = 15% increase.',
    reference: 'Horizontal Analysis',
  },

  // ==========================================
  // CMA2-B: Corporate Finance (5)
  // ==========================================
  {
    id: 'cma2-mcq7-006',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Bond Valuation',
    subtopic: 'Present Value',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A $1,000 bond pays 6% annually, matures in 3 years. Market rate is 8%. PV factors: 3-yr annuity at 8% = 2.577, 3-yr single sum at 8% = 0.794. What is the bond value?',
    options: [
      '$948.62',
      '$1,000.00',
      '$1,051.50',
      '$960.00'
    ],
    correctAnswer: 0,
    explanation: 'PV of coupons = $60 × 2.577 = $154.62. PV of principal = $1,000 × 0.794 = $794.00. Bond value = $154.62 + $794.00 = $948.62 (discount because coupon < market rate).',
    reference: 'Bond Valuation',
  },
  {
    id: 'cma2-mcq7-007',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Equity Financing',
    subtopic: 'Rights Offering',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'A rights offering allows existing shareholders to:',
    options: [
      'Sell shares back to the company',
      'Purchase additional shares at a discount before public offering',
      'Convert debt to equity',
      'Receive additional dividends'
    ],
    correctAnswer: 1,
    explanation: 'Rights offerings give existing shareholders the preemptive right to purchase new shares (typically at a discount) before they are offered to the public, preserving ownership percentages.',
    reference: 'Rights Offering; Equity Financing',
  },
  {
    id: 'cma2-mcq7-008',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Mergers',
    subtopic: 'Synergy Analysis',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Target value standalone: $50M. Acquisition price: $65M. Expected synergies: $20M. The net gain from the acquisition is:',
    options: [
      '$5 million',
      '$15 million',
      '$20 million',
      '$35 million'
    ],
    correctAnswer: 0,
    explanation: 'Net Gain = Synergies - Premium. Premium = Price - Standalone Value = $65M - $50M = $15M. Net Gain = $20M - $15M = $5M.',
    reference: 'Merger Synergies; Net Acquisition Value',
  },
  {
    id: 'cma2-mcq7-009',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Lease vs Buy',
    subtopic: 'Financial Analysis',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'Advantages of leasing compared to buying include:',
    options: [
      'Building equity in the asset',
      'Lower total cost over the asset life',
      'Potential off-balance sheet treatment and preserved capital',
      'Unrestricted use of the asset'
    ],
    correctAnswer: 2,
    explanation: 'Leasing preserves capital, may provide tax benefits, and for operating leases historically kept debt off balance sheet (though accounting rules now require most lease capitalization). Buying builds equity but ties up capital.',
    reference: 'Lease vs Buy Analysis',
  },
  {
    id: 'cma2-mcq7-010',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Dividend Payout',
    subtopic: 'Payout Ratio',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'EPS: $4.00. Dividends per share: $1.50. What is the retention ratio?',
    options: [
      '37.5%',
      '62.5%',
      '26.7%',
      '40.0%'
    ],
    correctAnswer: 1,
    explanation: 'Payout Ratio = DPS / EPS = $1.50 / $4.00 = 37.5%. Retention Ratio = 1 - Payout Ratio = 1 - 0.375 = 62.5%.',
    reference: 'Retention Ratio; Dividend Policy',
  },

  // ==========================================
  // CMA2-C: Decision Analysis (6)
  // ==========================================
  {
    id: 'cma2-mcq7-011',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Breakeven Analysis',
    subtopic: 'Multi-Product',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Product A: CM $20, sales mix 60%. Product B: CM $30, sales mix 40%. Fixed costs: $180,000. What is breakeven in total units?',
    options: [
      '6,000 units',
      '7,500 units',
      '9,000 units',
      '4,500 units'
    ],
    correctAnswer: 1,
    explanation: 'Weighted average CM = (0.6 × $20) + (0.4 × $30) = $12 + $12 = $24. BE units = FC / WACM = $180,000 / $24 = 7,500 total units.',
    reference: 'Multi-Product Breakeven',
  },
  {
    id: 'cma2-mcq7-012',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Joint Products',
    subtopic: 'Sell or Process Further',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Joint product at split-off: $40/unit. If processed further: $65/unit, additional cost $20/unit. Should it be processed further?',
    options: [
      'Yes, incremental profit $5/unit',
      'No, incremental loss $5/unit',
      'Yes, incremental profit $25/unit',
      'Indifferent'
    ],
    correctAnswer: 0,
    explanation: 'Incremental revenue = $65 - $40 = $25. Incremental cost = $20. Incremental profit = $25 - $20 = $5/unit. Process further.',
    reference: 'Sell or Process Further',
  },
  {
    id: 'cma2-mcq7-013',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Capital Allocation',
    subtopic: 'Opportunity Cost',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A company chooses Project A (NPV $50,000) over Project B (NPV $35,000). The opportunity cost of choosing A is:',
    options: [
      '$50,000',
      '$35,000',
      '$15,000',
      '$0'
    ],
    correctAnswer: 1,
    explanation: 'Opportunity cost is the value of the next best alternative foregone. By choosing A, the company foregoes B\'s NPV of $35,000. The net benefit of choosing A is $50,000 - $35,000 = $15,000.',
    reference: 'Opportunity Cost',
  },
  {
    id: 'cma2-mcq7-014',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Outsourcing',
    subtopic: 'Strategic Considerations',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'A key strategic risk of outsourcing a core process is:',
    options: [
      'Lower costs',
      'Loss of proprietary knowledge and control',
      'Simplified operations',
      'Reduced complexity'
    ],
    correctAnswer: 1,
    explanation: 'Outsourcing core processes risks losing competitive advantage, proprietary knowledge, quality control, and supply chain reliability. Strategic decisions go beyond just cost comparison.',
    reference: 'Outsourcing Risks',
  },
  {
    id: 'cma2-mcq7-016',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Life Cycle Costing',
    subtopic: 'Total Cost of Ownership',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'Life cycle costing includes which costs in the purchase decision?',
    options: [
      'Purchase price only',
      'Purchase price plus operating, maintenance, and disposal costs',
      'Only variable costs',
      'Only fixed costs'
    ],
    correctAnswer: 1,
    explanation: 'Life cycle costing considers total cost of ownership: acquisition, operating, maintenance, training, downtime, and disposal. This provides a more complete picture than purchase price alone.',
    reference: 'Life Cycle Costing; TCO',
  },

  // ==========================================
  // CMA2-D: Risk Management (3)
  // ==========================================
  {
    id: 'cma2-mcq7-017',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Value at Risk',
    subtopic: 'VaR Interpretation',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: '95% VaR of $500,000 means:',
    options: [
      'Expected profit is $500,000',
      'There is a 5% chance of losing more than $500,000',
      'Maximum possible loss is $500,000',
      'Average daily loss is $500,000'
    ],
    correctAnswer: 1,
    explanation: '95% VaR means we are 95% confident losses will not exceed $500,000. Equivalently, there is a 5% probability of losing more than $500,000 over the specified time period.',
    reference: 'Value at Risk; VaR',
  },
  {
    id: 'cma2-mcq7-018',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Commodity Risk',
    subtopic: 'Futures Hedging',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'An airline that expects to buy jet fuel in 6 months should:',
    options: [
      'Sell fuel futures contracts',
      'Buy fuel futures contracts',
      'Not hedge because prices might drop',
      'Issue more stock'
    ],
    correctAnswer: 1,
    explanation: 'As a fuel buyer, the airline is hurt by rising prices. Buying fuel futures locks in a purchase price. If spot prices rise, futures gains offset higher procurement costs.',
    reference: 'Commodity Hedging; Futures',
  },
  {
    id: 'cma2-mcq7-019',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Reputational Risk',
    subtopic: 'Crisis Management',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'Effective reputational risk management includes:',
    options: [
      'Ignoring social media',
      'Proactive communication, crisis planning, and stakeholder engagement',
      'Avoiding all public statements',
      'Focusing only on financial metrics'
    ],
    correctAnswer: 1,
    explanation: 'Reputational risk requires proactive management: monitoring stakeholder perceptions, transparent communication, crisis response planning, and building trust before issues arise.',
    reference: 'Reputational Risk; Crisis Management',
  },

  // ==========================================
  // CMA2-E: Investment Decisions (3)
  // ==========================================
  {
    id: 'cma2-mcq7-020',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Project Risk',
    subtopic: 'Risk-Adjusted Discount Rate',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A high-risk project should be evaluated using:',
    options: [
      'A lower discount rate than WACC',
      'A higher discount rate than WACC',
      'The same rate as all other projects',
      'No discounting at all'
    ],
    correctAnswer: 1,
    explanation: 'Higher risk requires higher expected returns. Using a discount rate above WACC for risky projects accounts for the additional risk, requiring higher cash flows to achieve positive NPV.',
    reference: 'Risk-Adjusted Discount Rate',
  },
  {
    id: 'cma2-mcq7-021',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Working Capital',
    subtopic: 'Initial Investment',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A project requires $100,000 equipment and $25,000 additional working capital. At project end, equipment is worthless and working capital is recovered. What is terminal cash flow?',
    options: [
      '$0',
      '$25,000',
      '$100,000',
      '$125,000'
    ],
    correctAnswer: 1,
    explanation: 'At project end: Equipment salvage = $0 (worthless). Working capital recovery = $25,000 (released as inventory/receivables convert to cash). Terminal cash flow = $25,000.',
    reference: 'Working Capital in Capital Budgeting',
  },
  {
    id: 'cma2-mcq7-022',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Equivalent Annual Annuity',
    subtopic: 'Unequal Lives',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'Equivalent Annual Annuity (EAA) is used to compare projects with:',
    options: [
      'Equal initial investments',
      'Different useful lives',
      'Same NPV',
      'Identical risk profiles only'
    ],
    correctAnswer: 1,
    explanation: 'EAA converts NPV to an equivalent annual amount, enabling comparison of projects with different durations. The project with higher EAA is preferred when projects can be replicated.',
    reference: 'Equivalent Annual Annuity',
  },

  // ==========================================
  // CMA2-F: Professional Ethics (3)
  // ==========================================
  {
    id: 'cma2-mcq7-024',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'IMA Standards',
    subtopic: 'Integrity',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Under IMA\'s Integrity standard, a CMA must:',
    options: [
      'Disclose all personal information',
      'Refrain from activities that discredit the profession',
      'Maximize employer profits at any cost',
      'Report only favorable information'
    ],
    correctAnswer: 1,
    explanation: 'Integrity requires CMAs to avoid conflicts of interest, refrain from discrediting activities, refuse gifts that influence behavior, and abstain from subverting organizational objectives.',
    reference: 'IMA Standards; Integrity',
  },
];

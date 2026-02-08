/**
 * CMA Part 2, Section B: Corporate Finance - Questions Batch 1 (Q1-25)
 * Weight: 20% of Part 2 Exam
 * 
 * Blueprint Areas:
 * - CMA2-B: Corporate Finance
 * 
 * Topics covered:
 * - Risk and Return
 * - Cost of Capital
 * - Capital Structure
 * - Working Capital Management
 * - Raising Capital
 */

import { Question } from '../../../types';

export const CMA2B_QUESTIONS_BATCH1: Question[] = [
  // ==========================================
  // Risk and Return
  // ==========================================
  {
    id: 'cma2-b-001',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Risk and Return',
    subtopic: 'Risk Types',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Systematic risk is also known as:',
    options: [
      'Diversifiable risk',
      'Company-specific risk',
      'Market risk or non-diversifiable risk',
      'Operational risk'
    ],
    correctAnswer: 2,
    explanation: 'Systematic (market) risk affects all securities and cannot be eliminated through diversification. Examples include interest rates, inflation, and recession. Unsystematic risk is company-specific and can be diversified away.',
    reference: 'Risk and Return; Portfolio Theory',
  },
  {
    id: 'cma2-b-002',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Risk and Return',
    subtopic: 'Beta',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A stock with a beta of 1.5 is expected to:',
    options: [
      'Move in the opposite direction of the market',
      'Move 50% more than the market in either direction',
      'Be less volatile than the market',
      'Have no correlation with market movements'
    ],
    correctAnswer: 1,
    explanation: 'Beta measures systematic risk. A beta of 1.5 means the stock moves 1.5 times as much as the market - if the market rises 10%, the stock is expected to rise 15%. Beta > 1 = more volatile than market.',
    reference: 'Beta; Systematic Risk',
  },
  {
    id: 'cma2-b-003',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Risk and Return',
    subtopic: 'CAPM',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Using CAPM: risk-free rate is 3%, market return is 11%, and beta is 1.25. What is the required return?',
    options: [
      '10%',
      '13%',
      '11%',
      '14.5%'
    ],
    correctAnswer: 1,
    explanation: 'CAPM: Required return = Rf + β(Rm - Rf) = 3% + 1.25(11% - 3%) = 3% + 1.25(8%) = 3% + 10% = 13%.',
    reference: 'CAPM; Required Rate of Return',
  },
  {
    id: 'cma2-b-004',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Risk and Return',
    subtopic: 'Portfolio Diversification',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The primary benefit of portfolio diversification is:',
    options: [
      'Guaranteed higher returns',
      'Elimination of all investment risk',
      'Reduction of unsystematic (company-specific) risk',
      'Lower transaction costs'
    ],
    correctAnswer: 2,
    explanation: 'Diversification reduces unsystematic (company-specific) risk by holding multiple securities. If one company fails, others may succeed. Systematic risk cannot be eliminated through diversification.',
    reference: 'Portfolio Diversification; Risk Reduction',
  },

  // ==========================================
  // Cost of Capital
  // ==========================================
  {
    id: 'cma2-b-005',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Cost of Capital',
    subtopic: 'Cost of Debt',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A company issues bonds at 8% interest and has a 25% tax rate. What is the after-tax cost of debt?',
    options: [
      '2%',
      '6%',
      '8%',
      '10%'
    ],
    correctAnswer: 1,
    explanation: 'After-tax cost of debt = Pre-tax rate × (1 - Tax rate) = 8% × (1 - 0.25) = 8% × 0.75 = 6%. Interest is tax-deductible, so the effective cost is lower.',
    reference: 'After-Tax Cost of Debt',
  },
  {
    id: 'cma2-b-006',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Cost of Capital',
    subtopic: 'Cost of Preferred Stock',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Preferred stock has a $5 annual dividend and a market price of $50. What is the cost of preferred stock?',
    options: [
      '5%',
      '10%',
      '15%',
      '50%'
    ],
    correctAnswer: 1,
    explanation: 'Cost of preferred stock = Annual dividend / Market price = $5 / $50 = 10%. Unlike debt, preferred dividends are not tax-deductible, so there is no tax adjustment.',
    reference: 'Cost of Preferred Stock',
  },
  {
    id: 'cma2-b-007',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Cost of Capital',
    subtopic: 'Cost of Equity',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Using the dividend growth model: stock price is $40, next year dividend is $2, and growth rate is 5%. What is the cost of equity?',
    options: [
      '5%',
      '10%',
      '15%',
      '7%'
    ],
    correctAnswer: 1,
    explanation: 'Cost of equity (Gordon model) = (D1 / P0) + g = ($2 / $40) + 5% = 5% + 5% = 10%.',
    reference: 'Dividend Growth Model; Cost of Equity',
  },
  {
    id: 'cma2-b-008',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Cost of Capital',
    subtopic: 'WACC',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A company has 40% debt (after-tax cost 5%) and 60% equity (cost 12%). What is WACC?',
    options: [
      '7.2%',
      '8.5%',
      '9.2%',
      '17%'
    ],
    correctAnswer: 2,
    explanation: 'WACC = (Weight of debt × Cost of debt) + (Weight of equity × Cost of equity) = (0.40 × 5%) + (0.60 × 12%) = 2% + 7.2% = 9.2%.',
    reference: 'Weighted Average Cost of Capital',
  },
  {
    id: 'cma2-b-009',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Cost of Capital',
    subtopic: 'WACC Applications',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'WACC is most appropriately used as the discount rate for:',
    options: [
      'Projects with significantly different risk than the company',
      'Projects with similar risk as the company\'s existing operations',
      'All investment decisions regardless of risk',
      'Only debt-financed projects'
    ],
    correctAnswer: 1,
    explanation: 'WACC reflects the company\'s average risk. It should only be used for projects with similar risk. Higher-risk projects need a higher hurdle rate; lower-risk projects may use a lower rate.',
    reference: 'WACC; Project Hurdle Rates',
  },

  // ==========================================
  // Capital Structure
  // ==========================================
  {
    id: 'cma2-b-010',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Capital Structure',
    subtopic: 'Optimal Capital Structure',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The optimal capital structure is the mix of debt and equity that:',
    options: [
      'Uses 100% equity financing',
      'Minimizes the weighted average cost of capital',
      'Uses 100% debt financing',
      'Maximizes interest expense'
    ],
    correctAnswer: 1,
    explanation: 'The optimal capital structure minimizes WACC and thus maximizes firm value. Initially, debt is cheaper (tax shield), but too much debt increases financial risk and costs. The optimum balances these effects.',
    reference: 'Optimal Capital Structure',
  },
  {
    id: 'cma2-b-011',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Capital Structure',
    subtopic: 'Financial Leverage',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Increasing financial leverage (using more debt) will:',
    options: [
      'Always increase shareholder wealth',
      'Increase variability of earnings per share',
      'Decrease the company\'s risk',
      'Have no effect on stock price'
    ],
    correctAnswer: 1,
    explanation: 'Higher debt means higher fixed interest payments, causing EPS to be more variable. In good times, leverage amplifies returns; in bad times, it amplifies losses. This increases financial risk.',
    reference: 'Financial Leverage; EPS Variability',
  },
  {
    id: 'cma2-b-012',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Capital Structure',
    subtopic: 'Pecking Order Theory',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'According to pecking order theory, companies prefer financing sources in which order?',
    options: [
      'Equity, debt, internal funds',
      'Internal funds, debt, equity',
      'Debt, equity, internal funds',
      'Equity, internal funds, debt'
    ],
    correctAnswer: 1,
    explanation: 'Pecking order theory suggests companies prefer: (1) internal funds (retained earnings), then (2) debt, then (3) external equity. This is due to information asymmetry and signaling effects.',
    reference: 'Pecking Order Theory; Capital Structure',
  },

  // ==========================================
  // Working Capital Management
  // ==========================================
  {
    id: 'cma2-b-013',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Working Capital',
    subtopic: 'Cash Management',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A conservative working capital policy would result in:',
    options: [
      'Minimum current assets and maximum short-term debt',
      'Higher current assets and more long-term financing',
      'Lower costs but higher risk',
      'Aggressive use of short-term credit'
    ],
    correctAnswer: 1,
    explanation: 'Conservative policies maintain higher current assets (more liquidity) and use more long-term financing (more stable). This reduces risk but increases costs. Aggressive policies do the opposite.',
    reference: 'Working Capital Policies',
  },
  {
    id: 'cma2-b-014',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Working Capital',
    subtopic: 'Cash Conversion Cycle',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A company can reduce its cash conversion cycle by:',
    options: [
      'Extending payment terms to suppliers',
      'Extending credit terms to customers',
      'Holding more inventory',
      'Collecting receivables more slowly'
    ],
    correctAnswer: 0,
    explanation: 'CCC = DIO + DSO - DPO. Extending DPO (paying suppliers later) reduces the cycle. Collecting faster (lower DSO) or reducing inventory (lower DIO) also helps. Extending customer credit increases DSO.',
    reference: 'Cash Conversion Cycle Management',
  },
  {
    id: 'cma2-b-015',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Working Capital',
    subtopic: 'Trade Credit',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Credit terms of 2/10, net 30 mean:',
    options: [
      'Pay in 10 days, get 2% interest',
      'Pay 2% down, balance in 10 days',
      '2% discount if paid in 10 days; full amount due in 30 days',
      'Pay 30% now, rest in 10 days'
    ],
    correctAnswer: 2,
    explanation: '2/10, net 30 means: take a 2% discount if paid within 10 days, or pay the full amount within 30 days. The implied annual cost of not taking the discount is approximately 36.7%.',
    reference: 'Trade Credit Terms',
  },
  {
    id: 'cma2-b-016',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Working Capital',
    subtopic: 'Inventory Management',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The primary trade-off in inventory management is between:',
    options: [
      'Cash and accounts receivable',
      'Carrying costs and stockout costs',
      'Revenue and expenses',
      'Assets and liabilities'
    ],
    correctAnswer: 1,
    explanation: 'Inventory management balances carrying costs (storage, insurance, obsolescence) against stockout costs (lost sales, production delays). Too much inventory is costly; too little risks stockouts.',
    reference: 'Inventory Management Trade-offs',
  },

  // ==========================================
  // Raising Capital
  // ==========================================
  {
    id: 'cma2-b-017',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Raising Capital',
    subtopic: 'Debt vs Equity',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Compared to equity financing, debt financing:',
    options: [
      'Gives lenders ownership rights',
      'Has no required payments',
      'Provides a tax shield through deductible interest',
      'Never increases firm risk'
    ],
    correctAnswer: 2,
    explanation: 'Debt interest is tax-deductible, creating a "tax shield" that reduces the effective cost. However, debt increases financial risk through required payments. Equity has no required payments but no tax benefit.',
    reference: 'Debt vs Equity Financing',
  },
  {
    id: 'cma2-b-018',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Raising Capital',
    subtopic: 'IPO Process',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'In an initial public offering (IPO), the underwriter typically:',
    options: [
      'Lends money to the company',
      'Helps price and sell shares to the public',
      'Buys the company outright',
      'Only provides legal services'
    ],
    correctAnswer: 1,
    explanation: 'Investment banks serve as underwriters in IPOs, helping determine the offering price, marketing shares to investors, and often guaranteeing sale by purchasing shares themselves (firm commitment).',
    reference: 'IPO Process; Investment Banking',
  },
  {
    id: 'cma2-b-019',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Raising Capital',
    subtopic: 'Lease Financing',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An advantage of leasing over purchasing an asset is:',
    options: [
      'Leasing always costs less than buying',
      'Lease payments are never required',
      'Leasing may require lower upfront cash and provide flexibility',
      'Leased assets automatically become owned'
    ],
    correctAnswer: 2,
    explanation: 'Leasing advantages include: lower upfront cash requirements, potential off-balance-sheet treatment (for operating leases), flexibility to upgrade, and protection from obsolescence. However, total cost may be higher.',
    reference: 'Lease vs Buy Decisions',
  },
  {
    id: 'cma2-b-020',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Raising Capital',
    subtopic: 'Dividend Policy',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'According to the "bird in the hand" theory:',
    options: [
      'Investors are indifferent between dividends and capital gains',
      'Investors prefer current dividends over uncertain future capital gains',
      'Companies should never pay dividends',
      'All earnings should be reinvested'
    ],
    correctAnswer: 1,
    explanation: '"Bird in the hand" theory (Gordon) argues investors prefer the certainty of current dividends over uncertain future capital gains. Therefore, higher dividends increase stock value. This contrasts with MM dividend irrelevance.',
    reference: 'Dividend Theory; Bird in the Hand',
  },

  // ==========================================
  // Additional Corporate Finance Topics
  // ==========================================
  {
    id: 'cma2-b-021',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Valuation',
    subtopic: 'Time Value of Money',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'What is the present value of $10,000 to be received in 5 years at a 10% discount rate?',
    options: [
      '$6,209',
      '$16,105',
      '$10,000',
      '$5,000'
    ],
    correctAnswer: 0,
    explanation: 'PV = FV / (1 + r)^n = $10,000 / (1.10)^5 = $10,000 / 1.6105 = $6,209. Money received in the future is worth less today.',
    reference: 'Present Value; Time Value of Money',
  },
  {
    id: 'cma2-b-022',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Valuation',
    subtopic: 'Bond Valuation',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'When market interest rates rise above a bond\'s coupon rate:',
    options: [
      'The bond\'s price increases',
      'The bond\'s price decreases (trades at a discount)',
      'The bond\'s price remains unchanged',
      'The coupon payments increase'
    ],
    correctAnswer: 1,
    explanation: 'Bond prices move inversely with interest rates. When market rates exceed the coupon rate, the bond becomes less attractive and its price falls below par (discount) to compete with new higher-yielding bonds.',
    reference: 'Bond Valuation; Interest Rate Risk',
  },
  {
    id: 'cma2-b-023',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Capital Structure',
    subtopic: 'Modigliani-Miller',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Modigliani and Miller\'s Proposition I (with taxes) states that:',
    options: [
      'Capital structure is irrelevant to firm value',
      'Firm value increases with debt due to the tax shield',
      'Companies should use 100% equity',
      'Dividend policy affects firm value'
    ],
    correctAnswer: 1,
    explanation: 'MM Proposition I with taxes: The value of a levered firm equals the value of an unlevered firm plus the present value of the tax shield. The tax deductibility of interest makes debt valuable.',
    reference: 'Modigliani-Miller; Capital Structure Theory',
  },
  {
    id: 'cma2-b-024',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Risk and Return',
    subtopic: 'Risk-Free Rate',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The risk-free rate is typically represented by:',
    options: [
      'Corporate bond yields',
      'U.S. Treasury security yields',
      'Stock market returns',
      'Real estate returns'
    ],
    correctAnswer: 1,
    explanation: 'U.S. Treasury securities (T-bills, T-notes, T-bonds) are considered risk-free because they are backed by the full faith and credit of the U.S. government. The appropriate maturity should match the investment horizon.',
    reference: 'Risk-Free Rate; Treasury Securities',
  },
  {
    id: 'cma2-b-025',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Working Capital',
    subtopic: 'Short-term Financing',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Commercial paper is:',
    options: [
      'Long-term debt issued by corporations',
      'Short-term unsecured promissory notes issued by large corporations',
      'Stock certificates',
      'Government securities'
    ],
    correctAnswer: 1,
    explanation: 'Commercial paper is short-term (typically 1-270 days) unsecured debt issued by large, creditworthy corporations at a discount. It provides low-cost short-term financing compared to bank loans.',
    reference: 'Commercial Paper; Short-term Financing',
  },
];

// Helper functions
export const getCMA2BQuestionsBatch1 = () => CMA2B_QUESTIONS_BATCH1;
export const getCMA2BQuestionCount = () => CMA2B_QUESTIONS_BATCH1.length;

export default CMA2B_QUESTIONS_BATCH1;

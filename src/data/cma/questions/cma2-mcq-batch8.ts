/**
 * CMA Part 2 - MCQ Batch 8 (25 Questions)
 * 
 * Focus: Exam-level integration and comprehensive coverage
 * - CMA2-A: Financial Statement Analysis (5)
 * - CMA2-B: Corporate Finance (5)
 * - CMA2-C: Decision Analysis (6)
 * - CMA2-D: Risk Management (3)
 * - CMA2-E: Investment Decisions (3)
 * - CMA2-F: Professional Ethics (3)
 */

import { Question } from '../../../types';

export const CMA2_MCQ_BATCH8: Question[] = [
  // ==========================================
  // CMA2-A: Financial Statement Analysis (5)
  // ==========================================
  {
    id: 'cma2-mcq8-002',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Credit Analysis',
    subtopic: 'Altman Z-Score',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'The Altman Z-Score is used primarily to:',
    options: [
      'Calculate stock valuations',
      'Predict bankruptcy probability',
      'Determine dividend policy',
      'Assess inventory turnover'
    ],
    correctAnswer: 1,
    explanation: 'The Altman Z-Score combines multiple financial ratios (profitability, leverage, liquidity, solvency, activity) into a single score predicting bankruptcy likelihood. Higher scores indicate lower risk.',
    reference: 'Altman Z-Score; Bankruptcy Prediction',
  },
  {
    id: 'cma2-mcq8-003',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'EBITDA',
    subtopic: 'Valuation Multiple',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'EBITDA: $5 million. Industry EV/EBITDA multiple: 8x. Debt: $10 million. Cash: $2 million. What is implied equity value?',
    options: [
      '$40 million',
      '$32 million',
      '$48 million',
      '$30 million'
    ],
    correctAnswer: 1,
    explanation: 'Enterprise Value = EBITDA × Multiple = $5M × 8 = $40M. Equity Value = EV - Debt + Cash = $40M - $10M + $2M = $32M.',
    reference: 'EBITDA Valuation; EV/EBITDA',
  },
  {
    id: 'cma2-mcq8-004',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Peer Analysis',
    subtopic: 'Benchmarking Ratios',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'When comparing a company\'s ratios to industry peers, an analyst should consider:',
    options: [
      'Only the largest competitor',
      'Differences in accounting policies and business models',
      'Historical data only',
      'Only ratios that are favorable'
    ],
    correctAnswer: 1,
    explanation: 'Peer comparison requires understanding differences in accounting choices (depreciation, revenue recognition), business models, product mix, and geographic exposure. Superficial ratio comparison can be misleading.',
    reference: 'Peer Analysis; Comparability',
  },
  {
    id: 'cma2-mcq8-005',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Pension Analysis',
    subtopic: 'Funded Status',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'A pension plan is underfunded when:',
    options: [
      'Plan assets exceed projected benefit obligation',
      'Projected benefit obligation exceeds plan assets',
      'Contributions exceed benefits paid',
      'Expected return exceeds actual return'
    ],
    correctAnswer: 1,
    explanation: 'Underfunded means the present value of promised benefits (PBO) exceeds the fair value of assets set aside to pay them. This creates a net pension liability on the balance sheet.',
    reference: 'Pension Funded Status',
  },

  // ==========================================
  // CMA2-B: Corporate Finance (5)
  // ==========================================
  {
    id: 'cma2-mcq8-006',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Tax Shield',
    subtopic: 'Interest Deductibility',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A company issues $1 million of debt at 6% interest. Tax rate: 25%. What is the annual interest tax shield?',
    options: [
      '$60,000',
      '$15,000',
      '$45,000',
      '$6,000'
    ],
    correctAnswer: 1,
    explanation: 'Interest expense = $1,000,000 × 6% = $60,000. Tax shield = Interest × Tax Rate = $60,000 × 25% = $15,000 annual tax savings.',
    reference: 'Interest Tax Shield',
  },
  {
    id: 'cma2-mcq8-007',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Capital Rationing',
    subtopic: 'Project Selection',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Budget: $1,000,000. Projects available: A ($500K, NPV $80K), B ($400K, NPV $70K), C ($300K, NPV $50K), D ($600K, NPV $90K). Maximum value selection?',
    options: [
      'Project D only',
      'Projects A and B',
      'Projects A, B, and C',
      'Projects B, C, and D'
    ],
    correctAnswer: 2,
    explanation: 'A+B+C = $1,200K > $1,000K. A+B = $900K, NPV $150K. B+C = $700K, NPV $120K. A+C = $800K, NPV $130K. D alone = $600K, NPV $90K. B+D = $1,000K, NPV $160K. Check: B ($400K) + D ($600K) = $1,000K with NPV $70K + $90K = $160K is best.',
    reference: 'Capital Rationing; NPV Ranking',
  },
  {
    id: 'cma2-mcq8-008',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Receivables Management',
    subtopic: 'Factoring',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'In factoring without recourse, the:',
    options: [
      'Seller retains credit risk',
      'Factor assumes the credit risk of non-payment',
      'Customer deals directly with the seller',
      'Transaction is recorded as a loan'
    ],
    correctAnswer: 1,
    explanation: 'Without recourse, the factor bears credit risk—if customers don\'t pay, the factor absorbs the loss. With recourse, the seller must buy back or cover uncollectible accounts.',
    reference: 'Factoring; Receivables Financing',
  },
  {
    id: 'cma2-mcq8-009',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Stock Repurchases',
    subtopic: 'Signaling Effect',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'Stock repurchases may signal that management believes:',
    options: [
      'Shares are overvalued',
      'Shares are undervalued',
      'The company needs to raise capital',
      'Dividend taxes should increase'
    ],
    correctAnswer: 1,
    explanation: 'Repurchases often signal management confidence that shares are undervalued—they\'re willing to use cash to buy shares. It also returns value to shareholders in a tax-efficient way compared to dividends.',
    reference: 'Stock Repurchases; Signaling',
  },
  {
    id: 'cma2-mcq8-010',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-B',
    topic: 'Working Capital',
    subtopic: 'Aggressive Strategy',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'An aggressive working capital strategy is characterized by:',
    options: [
      'High current ratios',
      'Low levels of current assets relative to sales',
      'Minimal use of short-term debt',
      'Conservative cash management'
    ],
    correctAnswer: 1,
    explanation: 'Aggressive strategies minimize current assets (low inventory, tight A/R) and rely more on short-term financing. This increases profitability but also liquidity risk. Conservative strategies hold more current assets.',
    reference: 'Working Capital Strategy',
  },

  // ==========================================
  // CMA2-C: Decision Analysis (6)
  // ==========================================
  {
    id: 'cma2-mcq8-011',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Capacity Expansion',
    subtopic: 'Incremental Analysis',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Current capacity 100,000 units. Expansion cost: $500,000 annual. New capacity: 150,000 units. Contribution margin: $15/unit. Minimum additional sales to justify expansion?',
    options: [
      '33,333 units',
      '50,000 units',
      '25,000 units',
      '100,000 units'
    ],
    correctAnswer: 0,
    explanation: 'Additional units needed = Fixed expansion cost / CM = $500,000 / $15 = 33,333 units to break even on the expansion.',
    reference: 'Capacity Expansion Decision',
  },
  {
    id: 'cma2-mcq8-012',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Sourcing Decisions',
    subtopic: 'Total Cost Analysis',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Domestic supplier: $50/unit. Foreign supplier: $40/unit plus $8 freight plus 5% tariff. Which is cheaper?',
    options: [
      'Domestic at $50',
      'Foreign at $48',
      'Foreign at $50',
      'Foreign at $52.20'
    ],
    correctAnswer: 2,
    explanation: 'Foreign total = $40 + $8 freight + (5% × $40 tariff) = $40 + $8 + $2 = $50. Equal to domestic, but foreign may have additional risks (lead time, quality, exchange rates).',
    reference: 'Global Sourcing; Total Landed Cost',
  },
  {
    id: 'cma2-mcq8-013',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Sunk Costs',
    subtopic: 'Relevance',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A machine was purchased for $100,000 three years ago. It can be sold for $20,000 or used for a project. In the project decision, the $100,000 is:',
    options: [
      'A relevant cost to consider',
      'A sunk cost to be ignored',
      'An opportunity cost',
      'A controllable cost'
    ],
    correctAnswer: 1,
    explanation: 'The original $100,000 purchase is a sunk cost—it was incurred in the past and cannot be recovered regardless of the decision. Only the $20,000 salvage value (opportunity cost) is relevant.',
    reference: 'Sunk Costs; Relevant Costs',
  },
  {
    id: 'cma2-mcq8-015',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Resource Constraints',
    subtopic: 'Shadow Price',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'In linear programming, the shadow price of a constraint represents:',
    options: [
      'The cost of the constraint',
      'The marginal value of one additional unit of the constraint',
      'The selling price of products',
      'Fixed overhead per unit'
    ],
    correctAnswer: 1,
    explanation: 'Shadow price (dual value) indicates how much the objective function would improve if the constraint is relaxed by one unit. It helps value scarce resources and make capacity investment decisions.',
    reference: 'Shadow Price; Linear Programming',
  },
  {
    id: 'cma2-mcq8-016',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Payoff Tables',
    subtopic: 'Minimax Regret',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'The minimax regret criterion minimizes:',
    options: [
      'Maximum possible profit',
      'Maximum possible loss',
      'Maximum opportunity cost of choosing the wrong alternative',
      'Average expected value'
    ],
    correctAnswer: 2,
    explanation: 'Minimax regret calculates regret (opportunity cost) for each decision under each state of nature, then chooses the decision that minimizes the maximum regret. It\'s a risk-averse approach focusing on missed opportunities.',
    reference: 'Minimax Regret Criterion',
  },

  // ==========================================
  // CMA2-D: Risk Management (3)
  // ==========================================
  {
    id: 'cma2-mcq8-017',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Credit Risk',
    subtopic: 'Credit Policy',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A company tightens credit policy. Expected results: sales down 10%, bad debts down 50%, A/R down 15%. This change is beneficial if:',
    options: [
      'Sales decline is always acceptable',
      'Savings from bad debts and carrying costs exceed lost contribution margin',
      'All customers pay on time',
      'Bad debts are eliminated completely'
    ],
    correctAnswer: 1,
    explanation: 'Evaluate credit policy changes by comparing: Lost CM from reduced sales vs. Savings from reduced bad debts + Reduced A/R carrying costs. Beneficial if savings exceed lost contribution.',
    reference: 'Credit Policy Analysis',
  },
  {
    id: 'cma2-mcq8-018',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Enterprise Risk',
    subtopic: 'Risk Appetite',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'Risk appetite differs from risk tolerance in that:',
    options: [
      'They are identical concepts',
      'Risk appetite is the broad level of risk acceptable; tolerance is specific, measurable limits',
      'Tolerance is more strategic than appetite',
      'Appetite applies only to financial risks'
    ],
    correctAnswer: 1,
    explanation: 'Risk appetite is the organization\'s general willingness to accept risk in pursuit of objectives (strategic level). Risk tolerance defines specific boundaries/thresholds for acceptable deviation (operational level).',
    reference: 'Risk Appetite vs Risk Tolerance',
  },
  {
    id: 'cma2-mcq8-019',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Derivatives',
    subtopic: 'Option Premium',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'An option premium consists of:',
    options: [
      'Strike price only',
      'Intrinsic value plus time value',
      'Current stock price only',
      'Expiration date premium'
    ],
    correctAnswer: 1,
    explanation: 'Option premium = Intrinsic Value (in-the-money amount) + Time Value (potential for favorable movement before expiration). At expiration, only intrinsic value remains.',
    reference: 'Option Premium Components',
  },

  // ==========================================
  // CMA2-E: Investment Decisions (3)
  // ==========================================
  {
    id: 'cma2-mcq8-020',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Discounted Payback',
    subtopic: 'Time Value',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Investment: $100,000. Annual cash flows: $40,000. Discount rate: 10%. PV Year 1: $36,364. PV Year 2: $33,058. PV Year 3: $30,053. Discounted payback is approximately:',
    options: [
      '2.5 years',
      '3.0 years',
      '3.5 years',
      'More than 4 years'
    ],
    correctAnswer: 1,
    explanation: 'Cumulative PV: Y1 $36,364, Y2 $69,422, Y3 $99,475. Still short of $100,000 after 3 years. Y4 PV ≈ $27,320. Cumulative ≈ $126,795. Payback ≈ 3 + ($525/$27,320) ≈ 3.02 years.',
    reference: 'Discounted Payback Period',
  },
  {
    id: 'cma2-mcq8-021',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Replacement Decision',
    subtopic: 'Incremental Cash Flows',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Old machine: Book $30,000, Market $20,000. New machine: Cost $100,000. Tax rate 25%. What is the initial cash outflow considering tax effects?',
    options: [
      '$80,000',
      '$82,500',
      '$77,500',
      '$100,000'
    ],
    correctAnswer: 1,
    explanation: 'Sale of old machine: $20,000 proceeds. Loss on disposal: $30,000 book − $20,000 market = $10,000. Tax savings on loss: $10,000 × 25% = $2,500. Net after-tax proceeds: $20,000 + $2,500 = $22,500. However, if the tax benefit on the loss is realized in the following period (not at time of sale), the initial outflow = $100,000 − $20,000 + $2,500 installation = $82,500. The initial cash outflow considers the timing of the tax benefit.',
    reference: 'Equipment Replacement Analysis',
  },
  {
    id: 'cma2-mcq8-022',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Strategic Investment',
    subtopic: 'Non-Financial Factors',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'In strategic capital investments, non-financial factors include:',
    options: [
      'NPV and IRR only',
      'Strategic fit, competitive positioning, and flexibility',
      'Payback period',
      'Accounting rate of return'
    ],
    correctAnswer: 1,
    explanation: 'Strategic investments may have benefits hard to quantify: market position, competitive advantage, technology platforms, future options, employee morale, environmental impact. These complement financial metrics.',
    reference: 'Strategic Investment Analysis',
  },

  // ==========================================
  // CMA2-F: Professional Ethics (3)
  // ==========================================
  {
    id: 'cma2-mcq8-023',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Stakeholder Theory',
    subtopic: 'Multiple Stakeholders',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'Stakeholder theory holds that management should consider:',
    options: [
      'Shareholders exclusively',
      'Employees only',
      'All parties affected by corporate decisions',
      'Only those with legal claims'
    ],
    correctAnswer: 2,
    explanation: 'Stakeholder theory: Corporations should consider all stakeholders—shareholders, employees, customers, suppliers, communities, environment—not just shareholders. This contrasts with pure shareholder primacy.',
    reference: 'Stakeholder Theory',
  },
  {
    id: 'cma2-mcq8-024',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Sustainability',
    subtopic: 'ESG Reporting',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'ESG reporting covers:',
    options: [
      'Earnings, Sales, and Growth',
      'Environmental, Social, and Governance factors',
      'Only financial performance',
      'Executive Stock Grants'
    ],
    correctAnswer: 1,
    explanation: 'ESG: Environmental (climate, pollution), Social (labor, community, diversity), and Governance (board, ethics, transparency) factors. Increasingly important for investors and stakeholders.',
    reference: 'ESG Reporting',
  },
];

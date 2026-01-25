// BEC/BAR - Business Analysis and Reporting Questions
// Comprehensive question bank for CPA exam preparation
// Note: BEC is being replaced by BAR, ISC, and TCP disciplines in 2024

import { Question } from '../../types';

export const BEC_QUESTIONS: Question[] = [
  // ==========================================
  // AREA 1: Corporate Governance
  // ==========================================

  {
    id: 'bec-gov-001',
    section: 'BEC',
    topicId: 'bec-governance',
    topic: 'Corporate Governance',
    subtopic: 'Board of Directors',
    difficulty: 'medium',
    question:
      "Which of the following is a primary responsibility of a company's board of directors?",
    options: [
      'Day-to-day management of operations',
      'Oversight of management and strategic direction',
      'Preparing financial statements',
      'Conducting the annual audit',
    ],
    correctAnswer: 1,
    explanation:
      "The board provides oversight of management, sets strategic direction, and ensures accountability. Day-to-day operations are management's responsibility.",
    reference: 'SOX Corporate Governance',
  },
  {
    id: 'bec-gov-002',
    section: 'BEC',
    topicId: 'bec-governance',
    topic: 'Corporate Governance',
    subtopic: 'Audit Committee',
    difficulty: 'medium',
    question: 'Under SOX, the audit committee must consist of:',
    options: [
      'At least one independent director',
      'A majority of independent directors',
      'All independent directors',
      'Management representatives',
    ],
    correctAnswer: 2,
    explanation:
      'SOX requires that all members of the audit committee be independent directors. At least one must be a "financial expert."',
    reference: 'SOX Section 301',
  },
  {
    id: 'bec-gov-003',
    section: 'BEC',
    topicId: 'bec-governance',
    topic: 'Corporate Governance',
    subtopic: 'Internal Controls',
    difficulty: 'hard',
    question: 'SOX Section 404 requires management to:',
    options: [
      'Conduct the annual financial audit',
      'Assess and report on the effectiveness of internal control over financial reporting',
      'Guarantee there are no material misstatements',
      'Appoint the external auditor',
    ],
    correctAnswer: 1,
    explanation:
      'Section 404 requires management to assess internal control over financial reporting (ICFR) and include a report on this assessment in the annual report.',
    reference: 'SOX Section 404',
  },

  // ==========================================
  // AREA 2: Economic Concepts
  // ==========================================

  {
    id: 'bec-econ-001',
    section: 'BEC',
    topicId: 'bec-economics',
    topic: 'Economics',
    subtopic: 'Supply and Demand',
    difficulty: 'easy',
    question: 'When the price of a good increases, ceteris paribus, the quantity demanded will:',
    options: ['Increase', 'Decrease', 'Remain unchanged', 'Become unpredictable'],
    correctAnswer: 1,
    explanation:
      'The law of demand states that, all else equal, as price increases, quantity demanded decreases (inverse relationship).',
    reference: 'Basic Economic Principles',
  },
  {
    id: 'bec-econ-002',
    section: 'BEC',
    topicId: 'bec-economics',
    topic: 'Economics',
    subtopic: 'Elasticity',
    difficulty: 'medium',
    question:
      'If the price elasticity of demand for a product is -2.0, a 10% price increase will result in:',
    options: [
      '2% decrease in quantity demanded',
      '5% decrease in quantity demanded',
      '20% decrease in quantity demanded',
      '2% increase in quantity demanded',
    ],
    correctAnswer: 2,
    explanation:
      'Price elasticity = % change in quantity / % change in price. If elasticity = -2.0 and price increases 10%, quantity decreases by 20%.',
    reference: 'Price Elasticity',
  },
  {
    id: 'bec-econ-003',
    section: 'BEC',
    topicId: 'bec-economics',
    topic: 'Economics',
    subtopic: 'Market Structures',
    difficulty: 'medium',
    question: 'A market with many sellers, differentiated products, and free entry/exit is:',
    options: ['Perfect competition', 'Monopolistic competition', 'Oligopoly', 'Monopoly'],
    correctAnswer: 1,
    explanation:
      'Monopolistic competition has many sellers with differentiated products and free entry/exit. Perfect competition has homogeneous products.',
    reference: 'Market Structures',
  },
  {
    id: 'bec-econ-004',
    section: 'BEC',
    topicId: 'bec-economics',
    topic: 'Economics',
    subtopic: 'Business Cycles',
    difficulty: 'medium',
    question: 'During a recession, which of the following typically occurs?',
    options: [
      'GDP increases, unemployment decreases',
      'GDP decreases, unemployment increases',
      'GDP increases, unemployment increases',
      'GDP decreases, unemployment decreases',
    ],
    correctAnswer: 1,
    explanation:
      "A recession is characterized by declining GDP and rising unemployment. It's part of the contraction phase of the business cycle.",
    reference: 'Business Cycle Theory',
  },
  {
    id: 'bec-econ-005',
    section: 'BEC',
    topicId: 'bec-economics',
    topic: 'Economics',
    subtopic: 'Monetary Policy',
    difficulty: 'hard',
    question: 'To combat inflation, the Federal Reserve would most likely:',
    options: [
      'Lower the discount rate',
      'Purchase government securities',
      'Raise the federal funds rate',
      'Decrease reserve requirements',
    ],
    correctAnswer: 2,
    explanation:
      'To fight inflation, the Fed uses contractionary policy: raising interest rates, selling securities, or increasing reserve requirements to reduce money supply.',
    reference: 'Federal Reserve Monetary Policy',
  },

  // ==========================================
  // AREA 3: Financial Management
  // ==========================================

  {
    id: 'bec-fin-001',
    section: 'BEC',
    topicId: 'bec-finance',
    topic: 'Financial Management',
    subtopic: 'Time Value of Money',
    difficulty: 'medium',
    question:
      'An investment of $10,000 at 8% compounded annually will be worth approximately how much after 3 years?',
    options: ['$12,400', '$12,597', '$12,800', '$10,800'],
    correctAnswer: 1,
    explanation: 'FV = PV × (1 + r)^n = $10,000 × (1.08)^3 = $10,000 × 1.2597 = $12,597',
    reference: 'Time Value of Money',
  },
  {
    id: 'bec-fin-002',
    section: 'BEC',
    topicId: 'bec-finance',
    topic: 'Financial Management',
    subtopic: 'Capital Budgeting',
    difficulty: 'hard',
    question: 'A positive net present value (NPV) indicates that:',
    options: [
      'The project will generate losses',
      "The project's return exceeds the cost of capital",
      'The project should be rejected',
      'The payback period is acceptable',
    ],
    correctAnswer: 1,
    explanation:
      'Positive NPV means the present value of cash inflows exceeds the investment, so the return exceeds the required rate (cost of capital). Accept positive NPV projects.',
    reference: 'Capital Budgeting',
  },
  {
    id: 'bec-fin-003',
    section: 'BEC',
    topicId: 'bec-finance',
    topic: 'Financial Management',
    subtopic: 'Capital Budgeting',
    difficulty: 'medium',
    question: 'The internal rate of return (IRR) is the rate at which:',
    options: [
      'Accounting income equals cash flow',
      'NPV equals zero',
      'Payback period is minimized',
      'Profitability index equals zero',
    ],
    correctAnswer: 1,
    explanation:
      'IRR is the discount rate that makes NPV = 0. If IRR > cost of capital, accept the project.',
    reference: 'Internal Rate of Return',
  },
  {
    id: 'bec-fin-004',
    section: 'BEC',
    topicId: 'bec-finance',
    topic: 'Financial Management',
    subtopic: 'Working Capital',
    difficulty: 'medium',
    question: 'The operating cycle equals:',
    options: [
      'Days in inventory + Days in receivables',
      'Days in inventory - Days in payables',
      'Days in receivables + Days in payables',
      'Days in inventory only',
    ],
    correctAnswer: 0,
    explanation:
      'Operating cycle = Days inventory outstanding + Days sales outstanding. Cash conversion cycle = Operating cycle - Days payables outstanding.',
    reference: 'Working Capital Management',
  },
  {
    id: 'bec-fin-005',
    section: 'BEC',
    topicId: 'bec-finance',
    topic: 'Financial Management',
    subtopic: 'Cost of Capital',
    difficulty: 'hard',
    question: "A company's weighted average cost of capital (WACC) is calculated using:",
    options: [
      'Only equity costs',
      'Only debt costs',
      'The after-tax cost of debt and cost of equity, weighted by market values',
      'The before-tax cost of debt and cost of equity',
    ],
    correctAnswer: 2,
    explanation:
      'WACC = (E/V × Re) + (D/V × Rd × (1-T)). Debt cost is after-tax because interest is tax-deductible. Weights should be market values.',
    reference: 'Weighted Average Cost of Capital',
  },
  {
    id: 'bec-fin-006',
    section: 'BEC',
    topicId: 'bec-finance',
    topic: 'Financial Management',
    subtopic: 'Capital Structure',
    difficulty: 'hard',
    question: 'According to the trade-off theory, the optimal capital structure:',
    options: [
      'Contains no debt',
      'Contains 100% debt',
      'Balances tax benefits of debt against bankruptcy costs',
      'Is irrelevant to firm value',
    ],
    correctAnswer: 2,
    explanation:
      'Trade-off theory: optimal structure balances tax shield from debt interest against financial distress/bankruptcy costs. More debt increases risk but provides tax benefits.',
    reference: 'Capital Structure Theory',
  },

  // ==========================================
  // AREA 4: Information Technology
  // ==========================================

  {
    id: 'bec-it-001',
    section: 'BEC',
    topicId: 'bec-it',
    topic: 'Information Technology',
    subtopic: 'System Components',
    difficulty: 'easy',
    question: 'The CPU (Central Processing Unit) performs:',
    options: [
      'Long-term data storage',
      'Processing and calculations',
      'Network communication',
      'Power supply regulation',
    ],
    correctAnswer: 1,
    explanation:
      'The CPU is the "brain" that executes instructions and performs calculations. Storage is handled by drives; RAM provides temporary working memory.',
    reference: 'Computer Hardware Fundamentals',
  },
  {
    id: 'bec-it-002',
    section: 'BEC',
    topicId: 'bec-it',
    topic: 'Information Technology',
    subtopic: 'Security',
    difficulty: 'medium',
    question: 'Two-factor authentication requires:',
    options: [
      'Two passwords',
      'Two different types of authentication (e.g., something you know and something you have)',
      'Two security questions',
      'Two login attempts',
    ],
    correctAnswer: 1,
    explanation:
      'Multi-factor authentication uses multiple categories: something you know (password), something you have (token), something you are (biometric).',
    reference: 'IT Security',
  },
  {
    id: 'bec-it-003',
    section: 'BEC',
    topicId: 'bec-it',
    topic: 'Information Technology',
    subtopic: 'Security',
    difficulty: 'hard',
    question: 'Encryption that uses the same key for encryption and decryption is called:',
    options: ['Asymmetric encryption', 'Symmetric encryption', 'Hashing', 'Digital signature'],
    correctAnswer: 1,
    explanation:
      'Symmetric encryption uses one shared key. Asymmetric uses a key pair (public/private). AES is symmetric; RSA is asymmetric.',
    reference: 'Cryptography',
  },
  {
    id: 'bec-it-004',
    section: 'BEC',
    topicId: 'bec-it',
    topic: 'Information Technology',
    subtopic: 'Data Management',
    difficulty: 'medium',
    question: 'A relational database stores data in:',
    options: [
      'Hierarchical tree structures',
      'Network graphs',
      'Tables with rows and columns',
      'Sequential files',
    ],
    correctAnswer: 2,
    explanation:
      'Relational databases organize data in tables (relations) with rows (records/tuples) and columns (fields/attributes), linked by keys.',
    reference: 'Database Management',
  },
  {
    id: 'bec-it-005',
    section: 'BEC',
    topicId: 'bec-it',
    topic: 'Information Technology',
    subtopic: 'Cloud Computing',
    difficulty: 'medium',
    question: 'Software as a Service (SaaS) provides:',
    options: [
      'Infrastructure (servers, storage) only',
      'Platform for application development only',
      'Complete applications accessed via the internet',
      'Physical data center space',
    ],
    correctAnswer: 2,
    explanation:
      'SaaS delivers complete software applications over the internet (e.g., Gmail, Salesforce). IaaS provides infrastructure; PaaS provides development platforms.',
    reference: 'Cloud Computing Models',
  },

  // ==========================================
  // AREA 5: Operations Management
  // ==========================================

  {
    id: 'bec-ops-001',
    section: 'BEC',
    topicId: 'bec-operations',
    topic: 'Operations Management',
    subtopic: 'Production Methods',
    difficulty: 'medium',
    question: 'Just-in-time (JIT) inventory management aims to:',
    options: [
      'Maximize inventory levels for safety',
      'Minimize inventory by receiving materials just when needed',
      'Purchase in large quantities for discounts',
      'Store inventory at multiple locations',
    ],
    correctAnswer: 1,
    explanation:
      'JIT minimizes inventory holding costs by coordinating deliveries to arrive just when needed for production, reducing storage costs and waste.',
    reference: 'JIT Manufacturing',
  },
  {
    id: 'bec-ops-002',
    section: 'BEC',
    topicId: 'bec-operations',
    topic: 'Operations Management',
    subtopic: 'Quality Management',
    difficulty: 'medium',
    question: 'Total Quality Management (TQM) emphasizes:',
    options: [
      'Inspection at the end of production',
      'Continuous improvement throughout the organization',
      'Accepting a certain defect rate',
      'Quality is only the responsibility of the quality department',
    ],
    correctAnswer: 1,
    explanation:
      "TQM involves organization-wide commitment to continuous improvement, customer focus, employee involvement, and process improvement. Quality is everyone's responsibility.",
    reference: 'Total Quality Management',
  },
  {
    id: 'bec-ops-003',
    section: 'BEC',
    topicId: 'bec-operations',
    topic: 'Operations Management',
    subtopic: 'Supply Chain',
    difficulty: 'hard',
    question: 'The economic order quantity (EOQ) model minimizes:',
    options: [
      'Purchase price only',
      'Order costs only',
      'Carrying costs only',
      'Total of ordering costs and carrying costs',
    ],
    correctAnswer: 3,
    explanation:
      'EOQ balances ordering costs (decrease with larger orders) and carrying costs (increase with larger orders) to minimize total inventory costs.',
    reference: 'Economic Order Quantity',
  },

  // ==========================================
  // AREA 6: Cost Accounting
  // ==========================================

  {
    id: 'bec-cost-001',
    section: 'BEC',
    topicId: 'bec-costing',
    topic: 'Cost Accounting',
    subtopic: 'Cost Behavior',
    difficulty: 'easy',
    question: 'A cost that changes in total in direct proportion to changes in activity level is:',
    options: ['Fixed cost', 'Variable cost', 'Mixed cost', 'Step cost'],
    correctAnswer: 1,
    explanation:
      'Variable costs change in total proportionally with activity but stay constant per unit. Fixed costs stay constant in total but vary per unit.',
    reference: 'Cost Behavior',
  },
  {
    id: 'bec-cost-002',
    section: 'BEC',
    topicId: 'bec-costing',
    topic: 'Cost Accounting',
    subtopic: 'CVP Analysis',
    difficulty: 'medium',
    question: 'The contribution margin per unit equals:',
    options: [
      'Sales price minus all costs',
      'Sales price minus variable cost per unit',
      'Sales price minus fixed cost per unit',
      'Net income divided by units',
    ],
    correctAnswer: 1,
    explanation:
      'Contribution margin = Sales price - Variable costs. It represents the amount available to cover fixed costs and provide profit.',
    reference: 'Cost-Volume-Profit Analysis',
  },
  {
    id: 'bec-cost-003',
    section: 'BEC',
    topicId: 'bec-costing',
    topic: 'Cost Accounting',
    subtopic: 'CVP Analysis',
    difficulty: 'hard',
    question:
      'A company has fixed costs of $100,000, variable costs of $6 per unit, and sells for $10 per unit. The break-even point in units is:',
    options: ['10,000 units', '16,667 units', '25,000 units', '100,000 units'],
    correctAnswer: 2,
    explanation:
      'Break-even = Fixed costs / Contribution margin per unit = $100,000 / ($10 - $6) = $100,000 / $4 = 25,000 units.',
    reference: 'Break-Even Analysis',
  },
  {
    id: 'bec-cost-004',
    section: 'BEC',
    topicId: 'bec-costing',
    topic: 'Cost Accounting',
    subtopic: 'Budgeting',
    difficulty: 'medium',
    question: 'A flexible budget adjusts:',
    options: [
      'Only for price changes',
      'Only for volume changes',
      'For actual activity levels achieved',
      'Only at year end',
    ],
    correctAnswer: 2,
    explanation:
      'A flexible budget adjusts budgeted amounts based on actual activity level, allowing meaningful comparison of actual vs. budgeted performance.',
    reference: 'Flexible Budgeting',
  },
  {
    id: 'bec-cost-005',
    section: 'BEC',
    topicId: 'bec-costing',
    topic: 'Cost Accounting',
    subtopic: 'Variance Analysis',
    difficulty: 'hard',
    question:
      'If actual price is $12, standard price is $10, and actual quantity is 1,000 units, the material price variance is:',
    options: ['$2,000 favorable', '$2,000 unfavorable', '$10,000 favorable', '$10,000 unfavorable'],
    correctAnswer: 1,
    explanation:
      'Price variance = (Actual price - Standard price) × Actual quantity = ($12 - $10) × 1,000 = $2,000 Unfavorable (paid more than standard).',
    reference: 'Variance Analysis',
  },
  {
    id: 'bec-cost-006',
    section: 'BEC',
    topicId: 'bec-costing',
    topic: 'Cost Accounting',
    subtopic: 'Costing Methods',
    difficulty: 'hard',
    question: 'Activity-based costing (ABC) differs from traditional costing by:',
    options: [
      'Using only volume-based cost drivers',
      'Assigning overhead based on multiple cost drivers related to activities',
      'Ignoring overhead costs',
      'Using only direct labor for allocation',
    ],
    correctAnswer: 1,
    explanation:
      'ABC identifies activities that cause overhead and assigns costs using appropriate cost drivers, providing more accurate product costing than volume-only methods.',
    reference: 'Activity-Based Costing',
  },

  // ==========================================
  // AREA 7: Performance Measures
  // ==========================================

  {
    id: 'bec-perf-001',
    section: 'BEC',
    topicId: 'bec-performance',
    topic: 'Performance Measures',
    subtopic: 'Financial Ratios',
    difficulty: 'medium',
    question: 'Return on assets (ROA) is calculated as:',
    options: [
      'Net income / Total assets',
      'Net income / Total equity',
      'Sales / Total assets',
      'Net income / Sales',
    ],
    correctAnswer: 0,
    explanation:
      'ROA = Net income / Total assets. It measures how efficiently assets generate profit. ROE = Net income / Equity.',
    reference: 'Profitability Ratios',
  },
  {
    id: 'bec-perf-002',
    section: 'BEC',
    topicId: 'bec-performance',
    topic: 'Performance Measures',
    subtopic: 'Financial Ratios',
    difficulty: 'medium',
    question: 'The current ratio is:',
    options: [
      'Current liabilities / Current assets',
      'Current assets / Current liabilities',
      'Cash / Current liabilities',
      'Quick assets / Current liabilities',
    ],
    correctAnswer: 1,
    explanation:
      'Current ratio = Current assets / Current liabilities. It measures short-term liquidity. Higher is generally better (>1.0 typically desired).',
    reference: 'Liquidity Ratios',
  },
  {
    id: 'bec-perf-003',
    section: 'BEC',
    topicId: 'bec-performance',
    topic: 'Performance Measures',
    subtopic: 'Balanced Scorecard',
    difficulty: 'hard',
    question: 'The balanced scorecard includes which four perspectives?',
    options: [
      'Financial, Customer, Internal Processes, Learning & Growth',
      'Revenue, Expenses, Assets, Liabilities',
      'Marketing, Finance, Operations, HR',
      'Planning, Organizing, Leading, Controlling',
    ],
    correctAnswer: 0,
    explanation:
      "The balanced scorecard's four perspectives: Financial (shareholder value), Customer (satisfaction), Internal Business Processes (efficiency), Learning & Growth (innovation, people).",
    reference: 'Balanced Scorecard',
  },
  {
    id: 'bec-perf-004',
    section: 'BEC',
    topicId: 'bec-performance',
    topic: 'Performance Measures',
    subtopic: 'Residual Income',
    difficulty: 'hard',
    question:
      'A division has operating income of $500,000, invested capital of $2,000,000, and cost of capital of 12%. Residual income is:',
    options: ['$260,000', '$240,000', '$500,000', '$1,500,000'],
    correctAnswer: 0,
    explanation:
      'Residual income = Operating income - (Invested capital × Cost of capital) = $500,000 - ($2,000,000 × 12%) = $500,000 - $240,000 = $260,000.',
    reference: 'Residual Income',
  },

  // ==========================================
  // AREA 8: Data Analytics
  // ==========================================

  {
    id: 'bec-data-001',
    section: 'BEC',
    topicId: 'bec-analytics',
    topic: 'Data Analytics',
    subtopic: 'Data Types',
    difficulty: 'easy',
    question: 'Structured data is:',
    options: [
      "Data that doesn't fit into predefined formats",
      'Data organized in a defined format like databases and spreadsheets',
      'Video and audio files',
      'Social media posts',
    ],
    correctAnswer: 1,
    explanation:
      'Structured data fits into rows and columns (databases, spreadsheets). Unstructured data lacks predefined format (text, video, images, social media).',
    reference: 'Data Types',
  },
  {
    id: 'bec-data-002',
    section: 'BEC',
    topicId: 'bec-analytics',
    topic: 'Data Analytics',
    subtopic: 'Analytics Types',
    difficulty: 'medium',
    question: 'Predictive analytics is used to:',
    options: [
      'Describe what happened in the past',
      'Forecast what might happen in the future',
      'Prescribe what actions to take',
      'Clean and organize data',
    ],
    correctAnswer: 1,
    explanation:
      'Descriptive = what happened; Diagnostic = why it happened; Predictive = what will happen; Prescriptive = what should we do.',
    reference: 'Analytics Continuum',
  },
  {
    id: 'bec-data-003',
    section: 'BEC',
    topicId: 'bec-analytics',
    topic: 'Data Analytics',
    subtopic: 'Visualization',
    difficulty: 'medium',
    question: 'A dashboard in business intelligence:',
    options: [
      'Stores raw transactional data',
      'Provides a visual summary of key performance indicators',
      'Replaces financial statements',
      'Is only used for external reporting',
    ],
    correctAnswer: 1,
    explanation:
      'Dashboards provide visual, real-time display of KPIs and metrics, enabling quick insight into organizational performance.',
    reference: 'Business Intelligence',
  },
  {
    id: 'bec-data-004',
    section: 'BEC',
    topicId: 'bec-analytics',
    topic: 'Data Analytics',
    subtopic: 'Statistical Concepts',
    difficulty: 'hard',
    question: 'Regression analysis is used to:',
    options: [
      'Calculate averages',
      'Model relationships between dependent and independent variables',
      'Sort data alphabetically',
      'Encrypt data',
    ],
    correctAnswer: 1,
    explanation:
      'Regression analysis models the relationship between variables, allowing prediction of a dependent variable based on independent variables.',
    reference: 'Statistical Analysis',
  },
  {
    id: 'bec-data-005',
    section: 'BEC',
    topicId: 'bec-analytics',
    topic: 'Data Analytics',
    subtopic: 'Big Data',
    difficulty: 'medium',
    question: 'The "3 V\'s" of big data refer to:',
    options: [
      'Value, Vision, Velocity',
      'Volume, Variety, Velocity',
      'Volume, Validity, Value',
      'Verification, Validation, Volume',
    ],
    correctAnswer: 1,
    explanation:
      "The original 3 V's: Volume (amount), Variety (types), Velocity (speed of creation/processing). Sometimes expanded to include Veracity and Value.",
    reference: 'Big Data Characteristics',
  },

  // Additional BEC/BAR Questions
  {
    id: 'bec-add-001',
    section: 'BEC',
    topicId: 'bec-finance',
    topic: 'Financial Management',
    subtopic: 'Risk Management',
    difficulty: 'hard',
    question:
      'A company concerned about rising interest rates on its variable-rate debt should consider:',
    options: [
      'An interest rate floor',
      'An interest rate cap',
      'An interest rate swap receiving fixed, paying floating',
      'An interest rate swap paying fixed, receiving floating',
    ],
    correctAnswer: 3,
    explanation:
      'To hedge against rising rates on variable debt, enter a swap paying fixed rate and receiving floating. The floating received offsets variable debt cost.',
    reference: 'Interest Rate Risk Management',
  },
  {
    id: 'bec-add-002',
    section: 'BEC',
    topicId: 'bec-operations',
    topic: 'Operations Management',
    subtopic: 'Project Management',
    difficulty: 'medium',
    question: 'In the critical path method (CPM), the critical path is:',
    options: [
      'The shortest path through the network',
      'The path with the most slack time',
      'The longest path through the network',
      'The path with the lowest cost',
    ],
    correctAnswer: 2,
    explanation:
      'The critical path is the longest path through the project network, determining minimum project duration. Activities on it have zero slack.',
    reference: 'Project Management',
  },
  {
    id: 'bec-add-003',
    section: 'BEC',
    topicId: 'bec-costing',
    topic: 'Cost Accounting',
    subtopic: 'Transfer Pricing',
    difficulty: 'hard',
    question:
      'The general transfer pricing rule for maximizing company-wide profits when excess capacity exists is:',
    options: ['Market price', 'Full cost plus markup', 'Variable cost', 'Negotiated price'],
    correctAnswer: 2,
    explanation:
      'With excess capacity, transfer at variable cost encourages internal transfers that benefit the company overall. Market price is used when no excess capacity.',
    reference: 'Transfer Pricing',
  },
];

export default BEC_QUESTIONS;

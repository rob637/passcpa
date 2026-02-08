// BEC - Extra Question Bank (Sprint 5 Expansion)
// Additional 50 questions focusing on commonly tested areas

import { Question } from '../../../types';

export const BEC_QUESTIONS_EXTRA: Question[] = [
  // ==========================================
  // CORPORATE GOVERNANCE
  // ==========================================
  {
    id: 'bec-gov-050',
    section: 'BEC',
    topicId: 'bec-governance',
    topic: 'Corporate Governance',
    subtopic: 'Board of Directors',
    difficulty: 'medium',
    question: 'Under best practices for corporate governance, the board of directors should:',
    options: [
      'Consist entirely of management',
      'Be appointed by the CEO',
      'Meet only annually',
      'Have a majority of independent directors'
    ],
    correctAnswer: 3,
    explanation:
      'Good corporate governance requires board independence. NYSE and NASDAQ require majority independent boards for listed companies. Independence helps ensure management oversight.',
    reference: 'SOX and Exchange Rules',
  },
  {
    id: 'bec-gov-051',
    section: 'BEC',
    topicId: 'bec-governance',
    topic: 'Corporate Governance',
    subtopic: 'Audit Committee',
    difficulty: 'medium',
    question: 'SOX requires public company audit committees to:',
    options: [
      'Include at least one management member',
      'Approve all company transactions',
      'Meet monthly',
      'Be directly responsible for hiring and overseeing the external auditor'
    ],
    correctAnswer: 3,
    explanation:
      'SOX §301 requires the audit committee to be directly responsible for appointment, compensation, and oversight of the external auditor. All members must be independent.',
    reference: 'SOX §301',
  },
  {
    id: 'bec-gov-052',
    section: 'BEC',
    topicId: 'bec-governance',
    topic: 'Corporate Governance',
    subtopic: 'Internal Control',
    difficulty: 'hard',
    question: 'SOX §404 requires management to:',
    options: [
      'Prepare financial statements',
      'Hire internal auditors',
      'Assess and report on internal control over financial reporting',
      'Approve all journal entries'
    ],
    correctAnswer: 2,
    explanation:
      'SOX §404 requires management to assess and include a report on internal control effectiveness in the annual report. Large accelerated filers also require auditor attestation.',
    reference: 'SOX §404',
  },
  {
    id: 'bec-gov-053',
    section: 'BEC',
    topicId: 'bec-governance',
    topic: 'Corporate Governance',
    subtopic: 'Ethics Programs',
    difficulty: 'easy',
    question: 'An effective ethics program should include:',
    options: [
      'Code of conduct, training, and reporting mechanisms',
      'Punishment without prevention',
      'External monitoring only',
      'Financial incentives for ethical behavior'
    ],
    correctAnswer: 0,
    explanation:
      'Effective ethics programs include: written code of conduct, ethics training, anonymous reporting (whistleblower) mechanisms, and consistent enforcement.',
    reference: 'Federal Sentencing Guidelines',
  },

  // ==========================================
  // ECONOMICS
  // ==========================================
  {
    id: 'bec-econ-050',
    section: 'BEC',
    topicId: 'bec-economics',
    topic: 'Economics',
    subtopic: 'Supply and Demand',
    difficulty: 'easy',
    question: 'When demand increases while supply remains constant:',
    options: [
      'Price increases and quantity increases',
      'Price and quantity both decrease',
      'Price increases and quantity decreases',
      'Price and quantity remain unchanged'
    ],
    correctAnswer: 0,
    explanation:
      'An increase in demand (rightward shift) with constant supply leads to higher equilibrium price and higher equilibrium quantity.',
    reference: 'Microeconomics Principles',
  },
  {
    id: 'bec-econ-051',
    section: 'BEC',
    topicId: 'bec-economics',
    topic: 'Economics',
    subtopic: 'Elasticity',
    difficulty: 'medium',
    question: 'If demand is elastic (elasticity > 1), a price increase will:',
    options: [
      'Increase total revenue',
      'Double total revenue',
      'Not affect total revenue',
      'Decrease total revenue'
    ],
    correctAnswer: 3,
    explanation:
      'Elastic demand means quantity changes more than proportionally to price. A price increase causes quantity demanded to fall more than proportionally, reducing total revenue.',
    reference: 'Microeconomics Principles',
  },
  {
    id: 'bec-econ-052',
    section: 'BEC',
    topicId: 'bec-economics',
    topic: 'Economics',
    subtopic: 'Market Structures',
    difficulty: 'medium',
    question: 'A monopolistically competitive market is characterized by:',
    options: [
      'Many sellers with differentiated products',
      'One seller with unique product',
      'Many sellers with identical products',
      'Few sellers with high barriers to entry'
    ],
    correctAnswer: 0,
    explanation:
      'Monopolistic competition has: many sellers, differentiated products (some pricing power), low barriers to entry, non-price competition (advertising). Examples: restaurants, retail.',
    reference: 'Microeconomics Principles',
  },
  {
    id: 'bec-econ-053',
    section: 'BEC',
    topicId: 'bec-economics',
    topic: 'Economics',
    subtopic: 'Macroeconomics',
    difficulty: 'medium',
    question: 'The GDP deflator measures:',
    options: [
      'Real GDP',
      'Nominal GDP',
      'Unemployment rate',
      'The overall price level in the economy'
    ],
    correctAnswer: 3,
    explanation:
      'GDP deflator = (Nominal GDP / Real GDP) × 100. It measures the average price level of all goods and services produced in the economy.',
    reference: 'Macroeconomics Principles',
  },
  {
    id: 'bec-econ-054',
    section: 'BEC',
    topicId: 'bec-economics',
    topic: 'Economics',
    subtopic: 'Business Cycles',
    difficulty: 'easy',
    question: 'The four phases of a business cycle are:',
    options: [
      'Growth, decline, growth, decline',
      'Inflation, deflation, inflation, deflation',
      'Bull, bear, bull, bear',
      'Expansion, peak, contraction, trough'
    ],
    correctAnswer: 3,
    explanation:
      'Business cycles consist of: expansion (growth), peak (turning point), contraction (recession), and trough (bottom) before the next expansion.',
    reference: 'Macroeconomics Principles',
  },
  {
    id: 'bec-econ-055',
    section: 'BEC',
    topicId: 'bec-economics',
    topic: 'Economics',
    subtopic: 'Interest Rates',
    difficulty: 'medium',
    question: 'The Federal Reserve lowers interest rates primarily by:',
    options: [
      'Selling government securities',
      'Buying government securities (open market operations)',
      'Increasing reserve requirements',
      'Raising taxes',
    ],
    correctAnswer: 1,
    explanation:
      'To lower rates, the Fed buys securities, injecting money into the banking system, increasing money supply, and lowering rates. Selling securities has the opposite effect.',
    reference: 'Monetary Policy',
  },

  // ==========================================
  // FINANCIAL MANAGEMENT
  // ==========================================
  {
    id: 'bec-fin-050',
    section: 'BEC',
    topicId: 'bec-finance',
    topic: 'Financial Management',
    subtopic: 'Time Value of Money',
    difficulty: 'medium',
    question:
      'The present value of $10,000 to be received in 3 years at 8% discount rate is approximately:',
    options: [
      '$7,938',
      '$8,573',
      '$9,259',
      '$10,800'
    ],
    correctAnswer: 0,
    explanation: 'PV = FV / (1+r)^n = $10,000 / (1.08)^3 = $10,000 / 1.2597 = $7,938',
    reference: 'Time Value of Money',
  },
  {
    id: 'bec-fin-051',
    section: 'BEC',
    topicId: 'bec-finance',
    topic: 'Financial Management',
    subtopic: 'Capital Budgeting',
    difficulty: 'hard',
    question: 'Net Present Value (NPV) should be used for capital budgeting because it:',
    options: [
      'Is easier to calculate than IRR',
      'Ignores cash flows after payback',
      'Accounts for time value of money and measures value creation in dollars',
      'Uses accounting income'
    ],
    correctAnswer: 2,
    explanation:
      'NPV accounts for time value of money, considers all cash flows, and measures absolute value creation in dollars. Positive NPV = value creation for shareholders.',
    reference: 'Capital Budgeting',
  },
  {
    id: 'bec-fin-052',
    section: 'BEC',
    topicId: 'bec-finance',
    topic: 'Financial Management',
    subtopic: 'Capital Budgeting',
    difficulty: 'medium',
    question: 'Internal Rate of Return (IRR) is the discount rate that:',
    options: [
      'Maximizes NPV',
      'Makes NPV equal to zero',
      'Equals the cost of capital',
      'Minimizes payback period',
    ],
    correctAnswer: 1,
    explanation:
      'IRR is the discount rate that makes the NPV of all cash flows equal to zero. Accept if IRR > cost of capital (positive NPV).',
    reference: 'Capital Budgeting',
  },
  {
    id: 'bec-fin-053',
    section: 'BEC',
    topicId: 'bec-finance',
    topic: 'Financial Management',
    subtopic: 'Cost of Capital',
    difficulty: 'hard',
    question: 'Weighted Average Cost of Capital (WACC) is calculated using:',
    options: [
      'Book values only',
      'Historical costs only',
      'Market values of debt and equity weighted by their proportions',
      'Par values of securities'
    ],
    correctAnswer: 2,
    explanation:
      'WACC = (E/V × Re) + (D/V × Rd × (1-T)). Use market values of equity and debt. Debt cost is after-tax due to interest deductibility.',
    reference: 'Cost of Capital',
  },
  {
    id: 'bec-fin-054',
    section: 'BEC',
    topicId: 'bec-finance',
    topic: 'Financial Management',
    subtopic: 'Working Capital',
    difficulty: 'medium',
    question: 'The cash conversion cycle equals:',
    options: [
      'Days inventory + Days receivables',
      'Days inventory - Days payables',
      'Days receivables - Days payables',
      'Days inventory + Days receivables - Days payables'
    ],
    correctAnswer: 3,
    explanation:
      'CCC = DIO + DSO - DPO (Days Inventory Outstanding + Days Sales Outstanding - Days Payables Outstanding). Measures days of cash tied up in operations.',
    reference: 'Working Capital Management',
  },
  {
    id: 'bec-fin-055',
    section: 'BEC',
    topicId: 'bec-finance',
    topic: 'Financial Management',
    subtopic: 'Financial Ratios',
    difficulty: 'easy',
    question: 'Current ratio measures:',
    options: ['Profitability', 'Short-term liquidity', 'Long-term solvency', 'Efficiency'],
    correctAnswer: 1,
    explanation:
      'Current ratio (Current Assets / Current Liabilities) measures short-term liquidity—ability to pay short-term obligations. Generally, higher is better but too high may indicate inefficiency.',
    reference: 'Financial Ratio Analysis',
  },

  // ==========================================
  // INFORMATION TECHNOLOGY
  // ==========================================
  {
    id: 'bec-it-050',
    section: 'BEC',
    topicId: 'bec-it',
    topic: 'Information Technology',
    subtopic: 'IT Governance',
    difficulty: 'medium',
    question: 'IT governance frameworks like COBIT help organizations:',
    options: [
      'Align IT with business objectives and manage IT risks',
      'Develop software faster',
      'Reduce hardware costs only',
      'Eliminate all cybersecurity risks'
    ],
    correctAnswer: 0,
    explanation:
      'COBIT (Control Objectives for Information Technology) provides a framework for IT governance, ensuring IT supports business goals, manages risks, and uses resources responsibly.',
    reference: 'COBIT Framework',
  },
  {
    id: 'bec-it-051',
    section: 'BEC',
    topicId: 'bec-it',
    topic: 'Information Technology',
    subtopic: 'Cybersecurity',
    difficulty: 'easy',
    question: 'Multi-factor authentication (MFA) requires:',
    options: [
      'Multiple passwords',
      'Biometric scanning only',
      'Two or more different types of authentication factors',
      'Annual password changes'
    ],
    correctAnswer: 2,
    explanation:
      'MFA requires 2+ factors from: something you know (password), something you have (token/phone), something you are (biometrics). Stronger than single-factor.',
    reference: 'Cybersecurity Best Practices',
  },
  {
    id: 'bec-it-052',
    section: 'BEC',
    topicId: 'bec-it',
    topic: 'Information Technology',
    subtopic: 'Data Management',
    difficulty: 'medium',
    question: 'A data warehouse differs from an operational database in that it:',
    options: [
      'Stores less data',
      'Is optimized for transaction processing',
      'Contains only current data',
      'Is optimized for analytical queries and reporting'
    ],
    correctAnswer: 3,
    explanation:
      'Data warehouses store historical data from multiple sources, optimized for complex analytical queries and reporting (OLAP). Operational databases handle day-to-day transactions (OLTP).',
    reference: 'Data Management',
  },
  {
    id: 'bec-it-053',
    section: 'BEC',
    topicId: 'bec-it',
    topic: 'Information Technology',
    subtopic: 'System Development',
    difficulty: 'medium',
    question: 'In the system development life cycle (SDLC), user acceptance testing occurs during:',
    options: [
      'Requirements gathering phase',
      'Design phase',
      'Maintenance phase',
      'Testing phase before implementation'
    ],
    correctAnswer: 3,
    explanation:
      'UAT is the final testing phase where end users verify the system meets requirements and functions as expected before going live (implementation).',
    reference: 'SDLC',
  },
  {
    id: 'bec-it-054',
    section: 'BEC',
    topicId: 'bec-it',
    topic: 'Information Technology',
    subtopic: 'Cloud Computing',
    difficulty: 'easy',
    question: 'Software as a Service (SaaS) means:',
    options: [
      'The provider delivers applications over the internet',
      'The customer manages servers',
      'The customer owns the hardware',
      'Software is installed locally'
    ],
    correctAnswer: 0,
    explanation:
      'SaaS delivers software applications over the internet on a subscription basis. Provider manages infrastructure, platform, and application. Examples: Salesforce, Office 365.',
    reference: 'Cloud Computing Models',
  },
  {
    id: 'bec-it-055',
    section: 'BEC',
    topicId: 'bec-it',
    topic: 'Information Technology',
    subtopic: 'Disaster Recovery',
    difficulty: 'hard',
    question: 'Recovery Point Objective (RPO) defines:',
    options: [
      'How quickly systems must be restored',
      'Hardware replacement timeline',
      'Number of backup copies required',
      'Maximum acceptable data loss measured in time'
    ],
    correctAnswer: 3,
    explanation:
      'RPO defines the maximum acceptable data loss (e.g., 1 hour RPO means backups every hour). RTO (Recovery Time Objective) defines how quickly systems must be restored.',
    reference: 'Business Continuity',
  },

  // ==========================================
  // OPERATIONS MANAGEMENT
  // ==========================================
  {
    id: 'bec-ops-050',
    section: 'BEC',
    topicId: 'bec-operations',
    topic: 'Operations Management',
    subtopic: 'Cost Accounting',
    difficulty: 'medium',
    question: 'Activity-based costing (ABC) allocates overhead based on:',
    options: [
      'Direct labor hours only',
      'Sales revenue',
      'Machine hours only',
      'Multiple cost drivers related to activities that cause costs'
    ],
    correctAnswer: 3,
    explanation:
      'ABC identifies activities that drive costs and uses multiple cost drivers (not just volume-based) to allocate overhead more accurately. Better for diverse products.',
    reference: 'Cost Accounting',
  },
  {
    id: 'bec-ops-051',
    section: 'BEC',
    topicId: 'bec-operations',
    topic: 'Operations Management',
    subtopic: 'Variance Analysis',
    difficulty: 'hard',
    question: 'An unfavorable material price variance indicates:',
    options: [
      'Material was purchased at a higher price than standard',
      'More material was used than planned',
      'Sales were lower than expected',
      'Labor was inefficient'
    ],
    correctAnswer: 0,
    explanation:
      'Material price variance = (Actual Price - Standard Price) × Actual Quantity. Unfavorable means actual price exceeded standard. Material quantity variance measures usage.',
    reference: 'Variance Analysis',
  },
  {
    id: 'bec-ops-052',
    section: 'BEC',
    topicId: 'bec-operations',
    topic: 'Operations Management',
    subtopic: 'Quality Management',
    difficulty: 'medium',
    question: 'Prevention costs in quality management include:',
    options: [
      'Training and quality planning',
      'Warranty claims',
      'Rework of defective products',
      'Customer returns'
    ],
    correctAnswer: 0,
    explanation:
      'Prevention costs are incurred to prevent defects: training, quality planning, process improvement. Appraisal costs test products. Internal/external failure costs result from defects.',
    reference: 'Total Quality Management',
  },
  {
    id: 'bec-ops-053',
    section: 'BEC',
    topicId: 'bec-operations',
    topic: 'Operations Management',
    subtopic: 'Process Management',
    difficulty: 'easy',
    question: 'Just-in-Time (JIT) inventory management aims to:',
    options: [
      'Maintain large safety stock',
      'Minimize inventory by receiving goods only as needed',
      'Purchase in large quantities for discounts',
      'Store inventory at multiple locations',
    ],
    correctAnswer: 1,
    explanation:
      'JIT minimizes inventory holding costs by receiving materials just when needed for production. Requires reliable suppliers and efficient processes.',
    reference: 'Inventory Management',
  },
  {
    id: 'bec-ops-054',
    section: 'BEC',
    topicId: 'bec-operations',
    topic: 'Operations Management',
    subtopic: 'Budgeting',
    difficulty: 'medium',
    question: 'A flexible budget:',
    options: [
      'Is prepared for one level of activity only',
      'Ignores variable costs',
      'Is never revised during the year',
      'Adjusts for changes in activity level'
    ],
    correctAnswer: 3,
    explanation:
      'A flexible budget adjusts budgeted amounts for actual activity level, enabling meaningful comparison of actual vs. budgeted costs at the same activity level.',
    reference: 'Budgeting',
  },
  {
    id: 'bec-ops-055',
    section: 'BEC',
    topicId: 'bec-operations',
    topic: 'Operations Management',
    subtopic: 'Performance Measurement',
    difficulty: 'hard',
    question: 'Economic Value Added (EVA) equals:',
    options: [
      'Net income minus taxes',
      'Gross profit minus operating expenses',
      'Revenue minus expenses',
      'NOPAT minus (Capital × Cost of Capital)'
    ],
    correctAnswer: 3,
    explanation:
      'EVA = NOPAT - (Invested Capital × WACC). Measures economic profit after deducting the cost of all capital. Positive EVA indicates value creation.',
    reference: 'Performance Measurement',
  },

  // ==========================================
  // STRATEGIC MANAGEMENT
  // ==========================================
  {
    id: 'bec-str-050',
    section: 'BEC',
    topicId: 'bec-strategy',
    topic: 'Strategic Management',
    subtopic: 'Competitive Strategy',
    difficulty: 'medium',
    question: "Porter's Five Forces model includes all EXCEPT:",
    options: [
      'Threat of new entrants',
      'Bargaining power of suppliers',
      'Rivalry among existing competitors',
      'Government regulation'
    ],
    correctAnswer: 3,
    explanation:
      "Porter's Five Forces: (1) Threat of new entrants, (2) Bargaining power of suppliers, (3) Bargaining power of buyers, (4) Threat of substitutes, (5) Rivalry among competitors.",
    reference: 'Competitive Strategy',
  },
  {
    id: 'bec-str-051',
    section: 'BEC',
    topicId: 'bec-strategy',
    topic: 'Strategic Management',
    subtopic: 'Competitive Strategy',
    difficulty: 'easy',
    question: 'A cost leadership strategy focuses on:',
    options: [
      'Unique product features',
      'Premium pricing',
      'Serving a narrow market segment',
      'Becoming the lowest cost producer in the industry'
    ],
    correctAnswer: 3,
    explanation:
      'Cost leadership aims to be the lowest cost producer, allowing lower prices or higher margins. Requires efficiency, economies of scale, and tight cost controls.',
    reference: 'Porter Generic Strategies',
  },
  {
    id: 'bec-str-052',
    section: 'BEC',
    topicId: 'bec-strategy',
    topic: 'Strategic Management',
    subtopic: 'Balanced Scorecard',
    difficulty: 'medium',
    question: 'The balanced scorecard includes which four perspectives?',
    options: [
      'Revenue, cost, profit, growth',
      'Short-term, medium-term, long-term, perpetual',
      'Marketing, operations, HR, finance',
      'Financial, customer, internal process, learning and growth'
    ],
    correctAnswer: 3,
    explanation:
      'The balanced scorecard measures performance across four perspectives: Financial, Customer, Internal Business Process, and Learning and Growth, providing a balanced view beyond just financial metrics.',
    reference: 'Balanced Scorecard',
  },
  {
    id: 'bec-str-053',
    section: 'BEC',
    topicId: 'bec-strategy',
    topic: 'Strategic Management',
    subtopic: 'SWOT Analysis',
    difficulty: 'easy',
    question: 'In SWOT analysis, "opportunities" refer to:',
    options: [
      'Internal capabilities',
      'External favorable conditions to exploit',
      'Internal weaknesses to address',
      'Potential external threats'
    ],
    correctAnswer: 1,
    explanation:
      'SWOT: Strengths and Weaknesses are internal; Opportunities and Threats are external. Opportunities are external conditions favorable to the organization.',
    reference: 'Strategic Analysis',
  },
  {
    id: 'bec-str-054',
    section: 'BEC',
    topicId: 'bec-strategy',
    topic: 'Strategic Management',
    subtopic: 'Risk Management',
    difficulty: 'medium',
    question: 'Enterprise Risk Management (ERM) encompasses:',
    options: [
      'Financial risks only',
      'Operational risks only',
      'Strategic, operational, financial, and compliance risks',
      'Cybersecurity risks only',
    ],
    correctAnswer: 2,
    explanation:
      'ERM takes a holistic view of all risks facing the organization: strategic, operational, financial, and compliance/hazard risks. COSO ERM Framework provides guidance.',
    reference: 'COSO ERM Framework',
  },
  {
    id: 'bec-str-055',
    section: 'BEC',
    topicId: 'bec-strategy',
    topic: 'Strategic Management',
    subtopic: 'Change Management',
    difficulty: 'medium',
    question: "Kotter's change model emphasizes the importance of:",
    options: [
      'Top-down mandates without communication',
      'Creating urgency, building coalitions, and celebrating short-term wins',
      'Making changes all at once',
      'Avoiding resistance by keeping changes secret',
    ],
    correctAnswer: 1,
    explanation:
      "Kotter's 8-step model includes: create urgency, form coalition, create vision, communicate, empower action, generate short-term wins, consolidate gains, anchor changes.",
    reference: 'Change Management',
  },
];

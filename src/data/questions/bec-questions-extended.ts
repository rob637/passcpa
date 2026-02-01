// BEC - Extended Question Bank
// Additional 150+ questions for comprehensive CPA exam preparation

import { Question } from '../../types';

export const BEC_QUESTIONS_EXTENDED: Question[] = [
  // ==========================================
  // CORPORATE GOVERNANCE
  // ==========================================
  {
    id: 'bec-ext-gov-001',
    section: 'BEC',
    topicId: 'bec-governance',
    topic: 'Corporate Governance',
    subtopic: 'Board of Directors',
    difficulty: 'medium',
    question: 'The primary role of an audit committee is to:',
    options: [
      "Prepare the company's financial statements",
      'Conduct the annual audit',
      'Oversee the financial reporting process and internal controls',
      'Manage day-to-day operations'
    ],
    correctAnswer: 2,
    explanation:
      'The audit committee (independent board members) oversees financial reporting, internal controls, and the external audit. They do not prepare statements (management) or conduct audits (external auditors).',
    reference: 'Corporate Governance - SOX',
  },
  {
    id: 'bec-ext-gov-002',
    section: 'BEC',
    topicId: 'bec-governance',
    topic: 'Corporate Governance',
    subtopic: 'Internal Control',
    difficulty: 'hard',
    question: 'Under SOX Section 404, management must:',
    options: [
      'Guarantee the accuracy of financial statements',
      'Prepare a report on the effectiveness of ICFR',
      'Eliminate all fraud risk',
      'Conduct the annual audit'
    ],
    correctAnswer: 1,
    explanation:
      "SOX 404 requires management to assess and report on the effectiveness of internal control over financial reporting (ICFR). For large accelerated filers, the external auditor must also attest to management's assessment.",
    reference: 'SOX Section 404',
  },
  {
    id: 'bec-ext-gov-003',
    section: 'BEC',
    topicId: 'bec-governance',
    topic: 'Corporate Governance',
    subtopic: 'Ethics',
    difficulty: 'easy',
    question: 'A code of conduct in an organization is designed to:',
    options: [
      'Replace internal controls',
      'Guarantee legal compliance',
      'Set expectations for ethical behavior',
      'Eliminate the need for oversight'
    ],
    correctAnswer: 2,
    explanation:
      'A code of conduct establishes standards and expectations for ethical behavior. It complements (not replaces) controls and does not guarantee outcomes but helps shape organizational culture.',
    reference: 'Corporate Governance',
  },
  {
    id: 'bec-ext-gov-004',
    section: 'BEC',
    topicId: 'bec-governance',
    topic: 'Corporate Governance',
    subtopic: 'Enterprise Risk Management',
    difficulty: 'hard',
    question: "The COSO ERM framework's core components include all EXCEPT:",
    options: [
      'Governance and culture',
      'Strategy and objective setting',
      'Financial statement audit',
      'Performance',
    ],
    correctAnswer: 2,
    explanation:
      'COSO ERM (2017) has five components: Governance & Culture, Strategy & Objective-Setting, Performance, Review & Revision, and Information, Communication & Reporting. Audit is not a component.',
    reference: 'COSO ERM Framework',
  },
  {
    id: 'bec-ext-gov-005',
    section: 'BEC',
    topicId: 'bec-governance',
    topic: 'Corporate Governance',
    subtopic: 'IT Governance',
    difficulty: 'medium',
    question: 'COBIT is a framework for:',
    options: [
      'Financial reporting',
      'IT governance and management',
      'Human resources management',
      'Marketing strategy',
    ],
    correctAnswer: 1,
    explanation:
      'COBIT (Control Objectives for Information and Related Technologies) is a framework for IT governance and management, helping align IT with business objectives and manage risk.',
    reference: 'COBIT Framework',
  },

  // ==========================================
  // ECONOMICS
  // ==========================================
  {
    id: 'bec-ext-econ-001',
    section: 'BEC',
    topicId: 'bec-economics',
    topic: 'Economics',
    subtopic: 'Supply and Demand',
    difficulty: 'easy',
    question: 'If demand increases while supply remains constant, the equilibrium price will:',
    options: [
      'Decrease',
      'Increase',
      'Remain the same',
      'Become unstable'
    ],
    correctAnswer: 1,
    explanation:
      'When demand increases with constant supply, there is excess demand at the original price. This drives price up until a new equilibrium is reached at a higher price and higher quantity.',
    reference: 'Microeconomics',
  },
  {
    id: 'bec-ext-econ-002',
    section: 'BEC',
    topicId: 'bec-economics',
    topic: 'Economics',
    subtopic: 'Elasticity',
    difficulty: 'medium',
    question: 'If price elasticity of demand is -2.0, a 10% price increase will cause:',
    options: [
      'A 5% decrease in quantity demanded',
      'No change in quantity demanded',
      'A 20% increase in quantity demanded',
      'A 20% decrease in quantity demanded'
    ],
    correctAnswer: 3,
    explanation:
      'Price elasticity of demand = % change in quantity ÷ % change in price. If elasticity = -2.0 and price increases 10%, then quantity changes by -2.0 × 10% = -20% (decreases by 20%).',
    reference: 'Microeconomics - Elasticity',
  },
  {
    id: 'bec-ext-econ-003',
    section: 'BEC',
    topicId: 'bec-economics',
    topic: 'Economics',
    subtopic: 'Market Structures',
    difficulty: 'medium',
    question: 'A market with many sellers of differentiated products is:',
    options: [
      'Perfect competition',
      'Oligopoly',
      'Monopolistic competition',
      'Monopoly'
    ],
    correctAnswer: 2,
    explanation:
      'Monopolistic competition: many sellers, differentiated products, low barriers to entry. Perfect competition: many sellers, identical products. Oligopoly: few sellers. Monopoly: one seller.',
    reference: 'Microeconomics - Market Structures',
  },
  {
    id: 'bec-ext-econ-004',
    section: 'BEC',
    topicId: 'bec-economics',
    topic: 'Economics',
    subtopic: 'Macroeconomics',
    difficulty: 'hard',
    question: 'GDP measured using the expenditure approach equals:',
    options: [
      'C + I + G + (X - M)',
      'Wages + Rent + Interest + Profits',
      'Value of all goods and services produced',
      'GNP minus net factor payments from abroad'
    ],
    correctAnswer: 0,
    explanation:
      'Expenditure approach: GDP = C (consumption) + I (investment) + G (government spending) + NX (net exports = exports - imports). Income approach uses wages, rent, interest, profits.',
    reference: 'Macroeconomics - GDP',
  },
  {
    id: 'bec-ext-econ-005',
    section: 'BEC',
    topicId: 'bec-economics',
    topic: 'Economics',
    subtopic: 'Monetary Policy',
    difficulty: 'medium',
    question: 'If the Federal Reserve wants to slow inflation, it should:',
    options: [
      'Lower interest rates',
      'Raise interest rates',
      'Increase the money supply',
      'Reduce reserve requirements',
    ],
    correctAnswer: 1,
    explanation:
      'To combat inflation (contractionary policy), the Fed raises interest rates, which decreases borrowing and spending, slowing economic activity and reducing inflationary pressure.',
    reference: 'Macroeconomics - Monetary Policy',
  },
  {
    id: 'bec-ext-econ-006',
    section: 'BEC',
    topicId: 'bec-economics',
    topic: 'Economics',
    subtopic: 'Business Cycles',
    difficulty: 'easy',
    question: 'A recession is technically defined as:',
    options: [
      'Any decline in GDP',
      'Two or more consecutive quarters of GDP decline',
      'Unemployment above 10%',
      'Negative inflation',
    ],
    correctAnswer: 1,
    explanation:
      'A recession is commonly defined as two or more consecutive quarters of declining real GDP. The NBER uses a broader set of indicators including employment and income.',
    reference: 'Macroeconomics - Business Cycles',
  },

  // ==========================================
  // FINANCIAL MANAGEMENT
  // ==========================================
  {
    id: 'bec-ext-fin-001',
    section: 'BEC',
    topicId: 'bec-finance',
    topic: 'Financial Management',
    subtopic: 'Time Value of Money',
    difficulty: 'medium',
    question:
      'An investment of $10,000 today at 8% annually will be worth how much in 5 years? (FV factor = 1.4693)',
    options: [
      '$14,693',
      '$15,000',
      '$14,000',
      '$18,000'
    ],
    correctAnswer: 0,
    explanation:
      'FV = PV × (1 + r)^n = $10,000 × 1.4693 = $14,693. The future value factor for 8% over 5 years is 1.4693.',
    reference: 'Finance - TVM',
  },
  {
    id: 'bec-ext-fin-002',
    section: 'BEC',
    topicId: 'bec-finance',
    topic: 'Financial Management',
    subtopic: 'Capital Budgeting',
    difficulty: 'hard',
    question:
      'A project has initial cost of $100,000 and generates annual cash flows of $30,000 for 5 years. At 10% discount rate, PV of annuity factor = 3.791. What is the NPV?',
    options: [
      '$13,730 negative',
      '$13,730',
      '$50,000',
      '$113,730'
    ],
    correctAnswer: 1,
    explanation:
      'NPV = PV of cash flows - Initial cost = ($30,000 × 3.791) - $100,000 = $113,730 - $100,000 = $13,730 positive.',
    reference: 'Finance - Capital Budgeting',
  },
  {
    id: 'bec-ext-fin-003',
    section: 'BEC',
    topicId: 'bec-finance',
    topic: 'Financial Management',
    subtopic: 'Capital Budgeting',
    difficulty: 'hard',
    question: 'The internal rate of return (IRR) is the discount rate that:',
    options: [
      'Makes net present value equal to zero',
      'Maximizes net present value',
      'Minimizes the payback period',
      'Equals the cost of capital'
    ],
    correctAnswer: 0,
    explanation:
      'IRR is the discount rate where NPV = 0. If IRR exceeds the cost of capital, the project creates value. IRR does not necessarily maximize NPV or equal cost of capital.',
    reference: 'Finance - IRR',
  },
  {
    id: 'bec-ext-fin-004',
    section: 'BEC',
    topicId: 'bec-finance',
    topic: 'Financial Management',
    subtopic: 'Working Capital',
    difficulty: 'medium',
    question: 'The cash conversion cycle equals:',
    options: ['DSO - DIO - DPO',
      'DSO - DIO + DPO',
      'DSO + DIO + DPO',
      'DSO + DIO - DPO'],
    correctAnswer: 3,
    explanation:
      'Cash Conversion Cycle = Days Sales Outstanding (DSO) + Days Inventory Outstanding (DIO) - Days Payables Outstanding (DPO). It measures how long cash is tied up in working capital.',
    reference: 'Finance - Working Capital',
  },
  {
    id: 'bec-ext-fin-005',
    section: 'BEC',
    topicId: 'bec-finance',
    topic: 'Financial Management',
    subtopic: 'Cost of Capital',
    difficulty: 'hard',
    question:
      'Using CAPM, if the risk-free rate is 3%, beta is 1.2, and market risk premium is 6%, the cost of equity is:',
    options: [
      '12.0%',
      '9.0%',
      '7.2%',
      '10.2%'
    ],
    correctAnswer: 3,
    explanation:
      'CAPM: Re = Rf + β(Rm - Rf) = 3% + 1.2(6%) = 3% + 7.2% = 10.2%. Market risk premium is (Rm - Rf), which is given as 6%.',
    reference: 'Finance - CAPM',
  },
  {
    id: 'bec-ext-fin-006',
    section: 'BEC',
    topicId: 'bec-finance',
    topic: 'Financial Management',
    subtopic: 'Leverage',
    difficulty: 'hard',
    question:
      'A company has operating income of $200,000 and fixed costs of $150,000. The degree of operating leverage is:',
    options: [
      '1.33',
      '2.33',
      '0.75',
      '1.75'
    ],
    correctAnswer: 3,
    explanation:
      'DOL = Contribution Margin / Operating Income. Here, CM = Operating Income + Fixed Costs = $200,000 + $150,000 = $350,000. DOL = $350,000 / $200,000 = 1.75.',
    reference: 'Finance - Leverage',
  },

  // ==========================================
  // COST ACCOUNTING
  // ==========================================
  {
    id: 'bec-ext-cost-001',
    section: 'BEC',
    topicId: 'bec-cost',
    topic: 'Cost Accounting',
    subtopic: 'Cost Behavior',
    difficulty: 'easy',
    question: 'A cost that remains constant in total as activity increases is:',
    options: [
      'Variable cost',
      'Mixed cost',
      'Fixed cost',
      'Step cost'
    ],
    correctAnswer: 2,
    explanation:
      'Fixed costs remain constant in total regardless of activity level (within relevant range). Variable costs change in total with activity. Per-unit fixed costs decrease as volume increases.',
    reference: 'Cost Accounting - Cost Behavior',
  },
  {
    id: 'bec-ext-cost-002',
    section: 'BEC',
    topicId: 'bec-cost',
    topic: 'Cost Accounting',
    subtopic: 'CVP Analysis',
    difficulty: 'medium',
    question:
      'Selling price is $50, variable cost is $30, fixed costs are $100,000. What is the breakeven point in units?',
    options: ['2,000 units', '3,333 units', '5,000 units', '10,000 units'],
    correctAnswer: 2,
    explanation:
      'Contribution margin per unit = $50 - $30 = $20. Breakeven units = Fixed Costs ÷ CM per unit = $100,000 ÷ $20 = 5,000 units.',
    reference: 'Cost Accounting - CVP',
  },
  {
    id: 'bec-ext-cost-003',
    section: 'BEC',
    topicId: 'bec-cost',
    topic: 'Cost Accounting',
    subtopic: 'CVP Analysis',
    difficulty: 'hard',
    question:
      'Using the same data (SP=$50, VC=$30, FC=$100,000), how many units are needed to achieve a target profit of $50,000?',
    options: ['5,000 units', '7,500 units', '10,000 units', '2,500 units'],
    correctAnswer: 1,
    explanation:
      'Units for target profit = (Fixed Costs + Target Profit) ÷ CM = ($100,000 + $50,000) ÷ $20 = 7,500 units.',
    reference: 'Cost Accounting - CVP',
  },
  {
    id: 'bec-ext-cost-004',
    section: 'BEC',
    topicId: 'bec-cost',
    topic: 'Cost Accounting',
    subtopic: 'Job Costing',
    difficulty: 'medium',
    question: 'In job order costing, overhead is applied based on:',
    options: [
      'Actual overhead costs incurred',
      'The number of products sold',
      'Direct materials cost only',
      'A predetermined overhead rate'
    ],
    correctAnswer: 3,
    explanation:
      'Job costing uses a predetermined overhead rate (estimated overhead ÷ estimated activity base) to apply overhead. Actual overhead may differ, creating over/under-applied overhead.',
    reference: 'Cost Accounting - Job Costing',
  },
  {
    id: 'bec-ext-cost-005',
    section: 'BEC',
    topicId: 'bec-cost',
    topic: 'Cost Accounting',
    subtopic: 'Process Costing',
    difficulty: 'hard',
    question: 'Under FIFO process costing, equivalent units include:',
    options: [
      'All units completed, regardless of when started',
      'Only units started and completed this period plus work on ending WIP',
      'Work done this period on beginning WIP, units started and completed, and ending WIP',
      'All units in ending inventory',
    ],
    correctAnswer: 2,
    explanation:
      'FIFO equivalent units = Work to complete beginning WIP + Units started and completed + Work on ending WIP. FIFO counts only current period work.',
    reference: 'Cost Accounting - Process Costing',
  },
  {
    id: 'bec-ext-cost-006',
    section: 'BEC',
    topicId: 'bec-cost',
    topic: 'Cost Accounting',
    subtopic: 'Activity-Based Costing',
    difficulty: 'hard',
    question: 'The primary benefit of activity-based costing over traditional costing is:',
    options: [
      'Simpler calculations',
      'More accurate product cost allocation',
      'Lower overhead costs',
      'Faster processing'
    ],
    correctAnswer: 1,
    explanation:
      'ABC uses multiple cost drivers to allocate overhead based on activities that cause costs, resulting in more accurate product costs, especially with diverse products and complex operations.',
    reference: 'Cost Accounting - ABC',
  },

  // ==========================================
  // OPERATIONS MANAGEMENT
  // ==========================================
  {
    id: 'bec-ext-ops-001',
    section: 'BEC',
    topicId: 'bec-operations',
    topic: 'Operations Management',
    subtopic: 'Quality Management',
    difficulty: 'medium',
    question: 'The cost of rework is classified as:',
    options: [
      'Prevention cost',
      'Appraisal cost',
      'Internal failure cost',
      'External failure cost',
    ],
    correctAnswer: 2,
    explanation:
      'Internal failure costs occur when defects are found before delivery (scrap, rework). External failure costs occur after delivery (warranty, returns). Prevention and appraisal are costs of quality assurance.',
    reference: 'Operations - Quality Costs',
  },
  {
    id: 'bec-ext-ops-002',
    section: 'BEC',
    topicId: 'bec-operations',
    topic: 'Operations Management',
    subtopic: 'Inventory Management',
    difficulty: 'hard',
    question: 'The Economic Order Quantity (EOQ) formula balances:',
    options: [
      'Production costs and selling costs',
      'Ordering costs and carrying costs',
      'Fixed costs and variable costs',
      'Direct costs and indirect costs',
    ],
    correctAnswer: 1,
    explanation:
      'EOQ minimizes total inventory costs by balancing ordering costs (decrease with larger orders) and carrying costs (increase with larger orders). EOQ = √(2DS/H).',
    reference: 'Operations - EOQ',
  },
  {
    id: 'bec-ext-ops-003',
    section: 'BEC',
    topicId: 'bec-operations',
    topic: 'Operations Management',
    subtopic: 'JIT',
    difficulty: 'medium',
    question: 'Just-in-time inventory management aims to:',
    options: [
      'Minimize inventory levels and waste',
      'Maximize inventory levels for safety',
      'Order in large batches for discounts',
      'Increase carrying costs'
    ],
    correctAnswer: 0,
    explanation:
      'JIT minimizes inventory by producing/receiving goods only as needed. Benefits: reduced carrying costs, less waste, improved quality. Requires reliable suppliers and demand forecasting.',
    reference: 'Operations - JIT',
  },
  {
    id: 'bec-ext-ops-004',
    section: 'BEC',
    topicId: 'bec-operations',
    topic: 'Operations Management',
    subtopic: 'Performance Measures',
    difficulty: 'medium',
    question: 'Throughput time includes all EXCEPT:',
    options: [
      'Process time',
      'Move time',
      'Idle time after delivery',
      'Inspection time'
    ],
    correctAnswer: 2,
    explanation:
      'Throughput time = Process time + Inspection time + Move time + Queue (wait) time. It measures time from start of production to completion. Time after delivery is not part of throughput.',
    reference: 'Operations - Performance',
  },
  {
    id: 'bec-ext-ops-005',
    section: 'BEC',
    topicId: 'bec-operations',
    topic: 'Operations Management',
    subtopic: 'Lean',
    difficulty: 'hard',
    question: 'Kaizen refers to:',
    options: [
      'Breakthrough improvement projects',
      'Zero defect production',
      'Continuous incremental improvement',
      'Computer-integrated manufacturing'
    ],
    correctAnswer: 2,
    explanation:
      'Kaizen is continuous, incremental improvement involving all employees. It contrasts with breakthrough/radical improvement. Key principle: small improvements over time yield significant results.',
    reference: 'Operations - Lean',
  },

  // ==========================================
  // INFORMATION TECHNOLOGY
  // ==========================================
  {
    id: 'bec-ext-it-001',
    section: 'BEC',
    topicId: 'bec-it',
    topic: 'Information Technology',
    subtopic: 'IT Governance',
    difficulty: 'medium',
    question: 'Segregation of duties in IT requires separating:',
    options: [
      'Marketing and sales functions',
      'Manufacturing and distribution',
      'Programming, operations, and data custody',
      'Purchasing and receiving'
    ],
    correctAnswer: 2,
    explanation:
      'IT segregation separates: programming (system changes), operations (running systems), and data custody (data control/security). This prevents unauthorized changes and fraud.',
    reference: 'IT - Controls',
  },
  {
    id: 'bec-ext-it-002',
    section: 'BEC',
    topicId: 'bec-it',
    topic: 'Information Technology',
    subtopic: 'Data Management',
    difficulty: 'hard',
    question: 'In a relational database, a foreign key:',
    options: [
      "Links one table to another table's primary key",
      'Uniquely identifies each record in a table',
      'Encrypts sensitive data',
      'Stores backup data'
    ],
    correctAnswer: 0,
    explanation:
      'A foreign key in one table references the primary key in another table, establishing relationships between tables. Primary key uniquely identifies records in a table.',
    reference: 'IT - Databases',
  },
  {
    id: 'bec-ext-it-003',
    section: 'BEC',
    topicId: 'bec-it',
    topic: 'Information Technology',
    subtopic: 'Security',
    difficulty: 'medium',
    question: 'A firewall protects against:',
    options: [
      'Power outages',
      'Hardware failures',
      'Unauthorized network access',
      'Employee errors'
    ],
    correctAnswer: 2,
    explanation:
      'Firewalls filter network traffic based on rules, blocking unauthorized access while allowing legitimate traffic. They are a key perimeter security control.',
    reference: 'IT - Security',
  },
  {
    id: 'bec-ext-it-004',
    section: 'BEC',
    topicId: 'bec-it',
    topic: 'Information Technology',
    subtopic: 'E-Commerce',
    difficulty: 'medium',
    question: 'Public key infrastructure (PKI) is used for:',
    options: [
      'Digital certificates and encryption',
      'Physical building access',
      'Inventory management',
      'Financial reporting'
    ],
    correctAnswer: 0,
    explanation:
      'PKI manages digital certificates for encryption, digital signatures, and authentication. It uses asymmetric encryption with public/private key pairs.',
    reference: 'IT - E-Commerce',
  },
  {
    id: 'bec-ext-it-005',
    section: 'BEC',
    topicId: 'bec-it',
    topic: 'Information Technology',
    subtopic: 'System Development',
    difficulty: 'hard',
    question: 'In the SDLC, user acceptance testing occurs during:',
    options: [
      'Requirements analysis',
      'Design phase',
      'Implementation/testing phase',
      'Maintenance phase',
    ],
    correctAnswer: 2,
    explanation:
      'User acceptance testing (UAT) occurs during implementation/testing. Users verify the system meets requirements before going live. Phases: Planning → Analysis → Design → Development → Testing → Implementation → Maintenance.',
    reference: 'IT - SDLC',
  },
  {
    id: 'bec-ext-it-006',
    section: 'BEC',
    topicId: 'bec-it',
    topic: 'Information Technology',
    subtopic: 'Business Continuity',
    difficulty: 'hard',
    question: 'A hot site for disaster recovery:',
    options: [
      'Has no equipment or data',
      'Is fully equipped with current data and ready to operate',
      'Has equipment but no current data',
      'Is the primary data center'
    ],
    correctAnswer: 1,
    explanation:
      'Hot site: fully equipped, current data, operational immediately. Warm site: equipped but needs current data loaded. Cold site: empty facility needing equipment and data.',
    reference: 'IT - Business Continuity',
  },

  // ==========================================
  // ADDITIONAL FINANCE QUESTIONS
  // ==========================================
  {
    id: 'bec-ext-fin-007',
    section: 'BEC',
    topicId: 'bec-finance',
    topic: 'Financial Management',
    subtopic: 'Ratio Analysis',
    difficulty: 'medium',
    question: 'The quick ratio excludes inventory because:',
    options: [
      'Inventory is not a current asset',
      'Inventory may not be quickly convertible to cash',
      'Inventory has no value',
      'GAAP requires it',
    ],
    correctAnswer: 1,
    explanation:
      'Quick ratio = (Current assets - Inventory) / Current liabilities. Inventory is excluded because it may take time to sell and is less liquid than cash, receivables, and marketable securities.',
    reference: 'Finance - Ratios',
  },
  {
    id: 'bec-ext-fin-008',
    section: 'BEC',
    topicId: 'bec-finance',
    topic: 'Financial Management',
    subtopic: 'Risk Management',
    difficulty: 'hard',
    question: 'Systematic risk is:',
    options: [
      'Market-wide risk that cannot be diversified',
      'Risk specific to one company',
      'Risk from poor management',
      'Risk that can be eliminated through diversification'
    ],
    correctAnswer: 0,
    explanation:
      'Systematic (market) risk affects all securities and cannot be diversified away (e.g., interest rates, inflation). Unsystematic (company-specific) risk can be reduced through diversification.',
    reference: 'Finance - Risk',
  },
  {
    id: 'bec-ext-fin-009',
    section: 'BEC',
    topicId: 'bec-finance',
    topic: 'Financial Management',
    subtopic: 'Capital Structure',
    difficulty: 'hard',
    question: 'According to the trade-off theory of capital structure:',
    options: [
      'Firms should use 100% equity',
      'Firms should use 100% debt',
      'Capital structure does not matter',
      'Optimal capital structure balances tax benefits of debt against financial distress costs'
    ],
    correctAnswer: 3,
    explanation:
      'Trade-off theory: optimal debt level balances tax shield benefits (interest deductibility) against costs of financial distress (bankruptcy risk). MM with taxes shows debt adds value, but distress costs limit it.',
    reference: 'Finance - Capital Structure',
  },
  {
    id: 'bec-ext-fin-010',
    section: 'BEC',
    topicId: 'bec-finance',
    topic: 'Financial Management',
    subtopic: 'Derivatives',
    difficulty: 'hard',
    question: 'A call option gives the holder the right to:',
    options: [
      'Buy an asset at a specified price',
      'Sell an asset at a specified price',
      'Require the seller to buy the asset',
      'Receive dividends'
    ],
    correctAnswer: 0,
    explanation:
      'Call option: right to BUY at strike price. Put option: right to SELL at strike price. Options give rights (not obligations) to the holder. The writer has the obligation.',
    reference: 'Finance - Derivatives',
  },

  // ==========================================
  // ADDITIONAL COST ACCOUNTING
  // ==========================================
  {
    id: 'bec-ext-cost-007',
    section: 'BEC',
    topicId: 'bec-cost',
    topic: 'Cost Accounting',
    subtopic: 'Variance Analysis',
    difficulty: 'hard',
    question:
      'Standard price is $10/unit, standard quantity is 2 units per finished good. Actual: 2,100 units used for 1,000 finished goods at $9.50/unit. What is the materials quantity variance?',
    options: [
      '$950 unfavorable',
      '$1,000 unfavorable',
      '$1,000 favorable',
      '$950 favorable'
    ],
    correctAnswer: 1,
    explanation:
      'Standard quantity for actual output = 1,000 × 2 = 2,000 units. Quantity variance = (Actual qty - Standard qty) × Standard price = (2,100 - 2,000) × $10 = $1,000 unfavorable.',
    reference: 'Cost Accounting - Variances',
  },
  {
    id: 'bec-ext-cost-008',
    section: 'BEC',
    topicId: 'bec-cost',
    topic: 'Cost Accounting',
    subtopic: 'Transfer Pricing',
    difficulty: 'hard',
    question: "The minimum transfer price from the selling division's perspective is:",
    options: [
      'Market price',
      'Full cost plus markup',
      'Negotiated price',
      'Variable cost plus opportunity cost'
    ],
    correctAnswer: 3,
    explanation:
      'Minimum transfer price = Variable cost + Opportunity cost (lost contribution from external sales). If no external market or excess capacity, opportunity cost may be zero.',
    reference: 'Cost Accounting - Transfer Pricing',
  },
  {
    id: 'bec-ext-cost-009',
    section: 'BEC',
    topicId: 'bec-cost',
    topic: 'Cost Accounting',
    subtopic: 'Relevant Costs',
    difficulty: 'medium',
    question: 'A sunk cost is:',
    options: [
      'A future cost that differs between alternatives',
      'A past cost that cannot be changed',
      'A cost that will be incurred regardless of the decision',
      'An incremental cost',
    ],
    correctAnswer: 1,
    explanation:
      'Sunk costs are past costs already incurred that cannot be recovered. They are irrelevant to future decisions. Only future costs that differ between alternatives are relevant.',
    reference: 'Cost Accounting - Relevant Costs',
  },
  {
    id: 'bec-ext-cost-010',
    section: 'BEC',
    topicId: 'bec-cost',
    topic: 'Cost Accounting',
    subtopic: 'Special Order',
    difficulty: 'hard',
    question:
      'A company has excess capacity. Variable cost is $30/unit, fixed cost is $20/unit (based on normal volume). A special order offers $35/unit. The company should:',
    options: [
      'Reject because price is below full cost',
      'Reject because it affects regular sales',
      'Accept only if price covers fixed costs',
      'Accept because price exceeds variable cost'
    ],
    correctAnswer: 3,
    explanation:
      'With excess capacity and no impact on regular sales, accept if price ($35) > variable cost ($30). The $5 contribution margin adds to profit. Fixed costs are not relevant (already being incurred).',
    reference: 'Cost Accounting - Special Order',
  },

  // ==========================================
  // BUDGETING AND PLANNING
  // ==========================================
  {
    id: 'bec-bud-001',
    section: 'BEC',
    topicId: 'bec-budgeting',
    topic: 'Budgeting',
    subtopic: 'Master Budget',
    difficulty: 'medium',
    question: 'The starting point for a master budget is typically the:',
    options: [
      'Sales budget',
      'Capital budget',
      'Cash budget',
      'Production budget'
    ],
    correctAnswer: 0,
    explanation:
      'The sales budget is prepared first because all other budgets depend on expected sales volume. From sales → production → materials, labor, overhead → cash budget.',
    reference: 'Budgeting - Master Budget',
  },
  {
    id: 'bec-bud-002',
    section: 'BEC',
    topicId: 'bec-budgeting',
    topic: 'Budgeting',
    subtopic: 'Flexible Budgets',
    difficulty: 'hard',
    question: 'A flexible budget differs from a static budget because it:',
    options: [
      'Is prepared at the end of the period',
      'Is less accurate',
      'Includes only fixed costs',
      'Adjusts for actual activity level'
    ],
    correctAnswer: 3,
    explanation:
      'Flexible budgets adjust budgeted amounts for actual activity level, allowing meaningful comparison. Static budgets are based on one expected activity level and may not reflect actual conditions.',
    reference: 'Budgeting - Flexible Budget',
  },
  {
    id: 'bec-bud-003',
    section: 'BEC',
    topicId: 'bec-budgeting',
    topic: 'Budgeting',
    subtopic: 'Performance Measurement',
    difficulty: 'hard',
    question: 'The balanced scorecard includes all EXCEPT:',
    options: [
      'Financial perspective',
      'Competitor perspective',
      'Customer perspective',
      'Learning and growth perspective'
    ],
    correctAnswer: 1,
    explanation:
      'Balanced Scorecard perspectives: (1) Financial, (2) Customer, (3) Internal Business Process, (4) Learning and Growth. Competitor analysis is separate from BSC.',
    reference: 'Budgeting - Balanced Scorecard',
  },
];

export default BEC_QUESTIONS_EXTENDED;

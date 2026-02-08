/**
 * CMA Part 1, Section F: Technology and Analytics - Questions Batch 4 (Q76-100)
 * Weight: 15% of Part 1 Exam
 * 
 * Focus: Advanced data analytics, emerging technologies,
 * business intelligence, automation, and digital transformation
 * 
 * Topics covered:
 * - Business intelligence and dashboards
 * - Predictive analytics and machine learning
 * - Robotic process automation (RPA)
 * - Cloud computing for finance
 * - Data visualization
 * - Digital transformation in finance
 */

import { Question } from '../../../types';

export const CMA1F_QUESTIONS_BATCH4: Question[] = [
  // ==========================================
  // Business Intelligence
  // ==========================================
  {
    id: 'cma1-f-076',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Business Intelligence',
    subtopic: 'Dashboards',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An effective executive dashboard should:',
    options: [
      'Display all available data metrics',
      'Focus on key performance indicators with drill-down capability',
      'Only show historical data',
      'Require extensive training to interpret'
    ],
    correctAnswer: 1,
    explanation: 'Effective dashboards highlight key metrics relevant to the audience, use visual elements for quick comprehension, and allow drill-down for details. Information overload and complexity reduce usability.',
    reference: 'BI Dashboard Best Practices',
  },
  {
    id: 'cma1-f-077',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Business Intelligence',
    subtopic: 'OLAP',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Online Analytical Processing (OLAP) differs from OLTP in that OLAP:',
    options: [
      'Handles routine transaction processing',
      'Supports complex multidimensional analysis for decision-making',
      'Is used only for data entry',
      'Operates in real-time only'
    ],
    correctAnswer: 1,
    explanation: 'OLAP is designed for complex analytical queries across multiple dimensions (time, product, region). OLTP handles routine transactions. OLAP supports slice-and-dice, drill-down, and roll-up analysis for decision support.',
    reference: 'OLAP vs OLTP; Data Warehousing Concepts',
  },
  {
    id: 'cma1-f-078',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Business Intelligence',
    subtopic: 'Data Warehouse',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A data warehouse is characterized by:',
    options: [
      'Frequent updates optimized for transaction processing',
      'Integrated, time-variant, non-volatile data for analysis',
      'Temporary storage of working files',
      'Processing of individual transactions only'
    ],
    correctAnswer: 1,
    explanation: 'Data warehouses are subject-oriented (integrated around topics), time-variant (historical data), and non-volatile (data loaded in batches, not updated transactionally). They support analytical queries, not routine transactions.',
    reference: 'Data Warehouse Characteristics (Inmon)',
  },
  {
    id: 'cma1-f-079',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Business Intelligence',
    subtopic: 'Data Lake',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A data lake differs from a data warehouse primarily in that data lakes:',
    options: [
      'Only hold structured data',
      'Store raw data in native format without predefined schema',
      'Are smaller and less expensive',
      'Require no governance or management'
    ],
    correctAnswer: 1,
    explanation: 'Data lakes store raw, unstructured, and semi-structured data as-is (schema-on-read). Data warehouses require defined schemas before loading (schema-on-write). Lakes offer flexibility but require strong governance to avoid becoming "data swamps."',
    reference: 'Data Lake Architecture; Big Data Storage',
  },

  // ==========================================
  // Advanced Analytics
  // ==========================================
  {
    id: 'cma1-f-080',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Advanced Analytics',
    subtopic: 'Analytics Maturity',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The analytics maturity model progresses in order:',
    options: [
      'Prescriptive → Predictive → Diagnostic → Descriptive',
      'Descriptive → Diagnostic → Predictive → Prescriptive',
      'Predictive → Diagnostic → Prescriptive → Descriptive',
      'Diagnostic → Prescriptive → Descriptive → Predictive'
    ],
    correctAnswer: 1,
    explanation: 'Analytics maturity: Descriptive (what happened) → Diagnostic (why it happened) → Predictive (what will happen) → Prescriptive (what should we do). Each level builds on the previous and adds more value.',
    reference: 'Analytics Maturity Model; Gartner',
  },
  {
    id: 'cma1-f-081',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Advanced Analytics',
    subtopic: 'Predictive Analytics',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A finance team uses historical sales data to forecast next quarter\'s revenue using regression analysis. This is an example of:',
    options: [
      'Descriptive analytics',
      'Diagnostic analytics',
      'Predictive analytics',
      'Prescriptive analytics'
    ],
    correctAnswer: 2,
    explanation: 'Predictive analytics uses statistical models and machine learning on historical data to forecast future outcomes. Regression analysis for revenue forecasting is a classic predictive analytics application.',
    reference: 'Predictive Analytics Applications',
  },
  {
    id: 'cma1-f-082',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Advanced Analytics',
    subtopic: 'Machine Learning',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Supervised machine learning in finance would be used to:',
    options: [
      'Group customers into segments based on spending patterns',
      'Predict credit default using historical labeled data',
      'Detect anomalies in transactions without prior examples',
      'Optimize scheduling without defined rules'
    ],
    correctAnswer: 1,
    explanation: 'Supervised learning trains models using labeled data (known outcomes). Credit default prediction uses historical data with known default/non-default labels to train models. Clustering for segmentation is unsupervised learning.',
    reference: 'Machine Learning in Finance; Supervised vs Unsupervised',
  },
  {
    id: 'cma1-f-083',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Advanced Analytics',
    subtopic: 'Prescriptive Analytics',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'An optimization model that recommends the best allocation of marketing budget across channels is an example of:',
    options: [
      'Descriptive analytics',
      'Diagnostic analytics',
      'Predictive analytics',
      'Prescriptive analytics'
    ],
    correctAnswer: 3,
    explanation: 'Prescriptive analytics recommends specific actions. Optimization models that recommend best decisions (budget allocation, pricing, inventory levels) are prescriptive—they go beyond prediction to suggest optimal responses.',
    reference: 'Prescriptive Analytics; Optimization Models',
  },

  // ==========================================
  // Data Visualization
  // ==========================================
  {
    id: 'cma1-f-084',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Data Visualization',
    subtopic: 'Chart Selection',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'To show the composition of expenses by category as percentages of total, the MOST appropriate chart is:',
    options: [
      'Line chart',
      'Scatter plot',
      'Pie chart or stacked bar chart',
      'Histogram'
    ],
    correctAnswer: 2,
    explanation: 'Pie charts and stacked bar charts show part-to-whole relationships (composition). Line charts show trends over time. Scatter plots show relationships between two variables. Histograms show frequency distributions.',
    reference: 'Data Visualization Best Practices',
  },
  {
    id: 'cma1-f-085',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Data Visualization',
    subtopic: 'Trend Analysis',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'To display revenue trends over a five-year period, the BEST chart type is:',
    options: [
      'Pie chart',
      'Line chart',
      'Scatter plot',
      'Treemap'
    ],
    correctAnswer: 1,
    explanation: 'Line charts excel at showing trends and changes over time. The x-axis represents time periods while the line shows the value trend. Pie charts are for composition; scatter plots for correlations.',
    reference: 'Time Series Visualization',
  },
  {
    id: 'cma1-f-086',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Data Visualization',
    subtopic: 'Variance Analysis',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A waterfall chart is particularly useful for showing:',
    options: [
      'Geographic distribution of sales',
      'How components contribute to a final value (like walking from budget to actual)',
      'Correlation between two variables',
      'Frequency distribution of values'
    ],
    correctAnswer: 1,
    explanation: 'Waterfall charts show how sequential positive and negative values contribute to a final total—ideal for budget-to-actual variance analysis, showing how each variance component explains the difference.',
    reference: 'Waterfall Charts; Variance Visualization',
  },

  // ==========================================
  // Robotic Process Automation
  // ==========================================
  {
    id: 'cma1-f-087',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'RPA',
    subtopic: 'Definition',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Robotic Process Automation (RPA) is best suited for:',
    options: [
      'Complex judgment-based decisions',
      'High-volume, repetitive, rule-based tasks',
      'One-time strategic initiatives',
      'Creative marketing campaigns'
    ],
    correctAnswer: 1,
    explanation: 'RPA automates repetitive, rule-based tasks typically performed by humans (data entry, reconciliations, report generation). It follows defined rules and doesn\'t handle judgment-based exceptions well.',
    reference: 'RPA in Finance; Automation Use Cases',
  },
  {
    id: 'cma1-f-088',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'RPA',
    subtopic: 'Finance Applications',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which finance process is MOST suitable for RPA automation?',
    options: [
      'Developing annual strategic plan',
      'Processing routine vendor invoice data entry',
      'Negotiating major acquisition terms',
      'Designing new accounting policies'
    ],
    correctAnswer: 1,
    explanation: 'Invoice processing involves repetitive, structured data extraction and entry—ideal for RPA. Strategic planning, negotiations, and policy design require judgment and creativity unsuited to RPA.',
    reference: 'RPA Finance Applications; Accounts Payable Automation',
  },
  {
    id: 'cma1-f-089',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'RPA',
    subtopic: 'Benefits',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Key benefits of RPA in finance include all EXCEPT:',
    options: [
      'Reduced processing time and errors',
      '24/7 processing capability',
      'Complete elimination of all finance staff',
      'Improved compliance through consistent execution'
    ],
    correctAnswer: 2,
    explanation: 'RPA reduces time/errors, enables round-the-clock processing, and ensures consistent control execution. However, staff are redeployed to higher-value work, not eliminated. Humans still handle exceptions and oversight.',
    reference: 'RPA Benefits; Workforce Transformation',
  },

  // ==========================================
  // Cloud Computing
  // ==========================================
  {
    id: 'cma1-f-090',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Cloud Computing',
    subtopic: 'Service Models',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'In a Software-as-a-Service (SaaS) model, the customer is responsible for:',
    options: [
      'Managing the underlying infrastructure and servers',
      'Maintaining the application software',
      'User access controls and data entered into the system',
      'Operating system updates and patches'
    ],
    correctAnswer: 2,
    explanation: 'In SaaS, the provider manages infrastructure, platform, and application. The customer controls user access, data configuration, and their own data. Examples: Salesforce, NetSuite, Workday.',
    reference: 'Cloud Service Models; Shared Responsibility',
  },
  {
    id: 'cma1-f-091',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Cloud Computing',
    subtopic: 'Benefits',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A key financial advantage of cloud computing is:',
    options: [
      'Higher upfront capital expenditure',
      'Shift from CapEx to OpEx with pay-as-you-go pricing',
      'Increased IT staff requirements',
      'Longer implementation timelines'
    ],
    correctAnswer: 1,
    explanation: 'Cloud converts large upfront capital purchases to variable operational expenses. Organizations pay for consumption rather than capacity, improving cash flow and reducing upfront investment.',
    reference: 'Cloud Economics; CapEx to OpEx',
  },
  {
    id: 'cma1-f-092',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Cloud Computing',
    subtopic: 'Security Considerations',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'When evaluating cloud providers, finance should ensure:',
    options: [
      'The provider has no security certifications',
      'All data processing occurs in one country regardless of regulations',
      'SOC 2 Type II or equivalent attestation is available',
      'The provider stores data indefinitely without cost'
    ],
    correctAnswer: 2,
    explanation: 'SOC 2 Type II reports attest to security, availability, and confidentiality controls. Finance should verify certifications, understand data residency requirements, and evaluate the provider\'s control environment.',
    reference: 'Cloud Due Diligence; SOC Reports',
  },

  // ==========================================
  // Data Governance
  // ==========================================
  {
    id: 'cma1-f-093',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Data Governance',
    subtopic: 'Data Quality',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Data quality dimensions include all of the following EXCEPT:',
    options: [
      'Accuracy and completeness',
      'Timeliness and consistency',
      'Marketing budget allocation',
      'Validity and uniqueness'
    ],
    correctAnswer: 2,
    explanation: 'Data quality dimensions: accuracy (correctness), completeness (no missing values), timeliness (current), consistency (uniform across sources), validity (conforms to rules), uniqueness (no duplicates). Budget allocation is a planning activity.',
    reference: 'Data Quality Dimensions; DAMA-DMBOK',
  },
  {
    id: 'cma1-f-094',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Data Governance',
    subtopic: 'Master Data Management',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Master data management (MDM) is important for finance because it:',
    options: [
      'Reduces the need for any controls',
      'Ensures consistent definition of key entities like customers and products across systems',
      'Eliminates the need for financial reporting',
      'Focuses only on historical data'
    ],
    correctAnswer: 1,
    explanation: 'MDM maintains single, accurate, consistent master data (customers, vendors, products, chart of accounts) across systems. This ensures reliable reporting, analytics, and cross-functional consistency.',
    reference: 'Master Data Management; Single Source of Truth',
  },
  {
    id: 'cma1-f-095',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Data Governance',
    subtopic: 'Data Stewardship',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A data steward is responsible for:',
    options: [
      'Physical security of data centers',
      'Defining and maintaining data standards, quality, and metadata',
      'Programming new applications',
      'External audit procedures'
    ],
    correctAnswer: 1,
    explanation: 'Data stewards own data quality and standards for their domain (e.g., finance data steward). They define business rules, monitor quality metrics, resolve issues, and maintain metadata documentation.',
    reference: 'Data Stewardship Role; Data Governance',
  },

  // ==========================================
  // ERP and Integrated Systems
  // ==========================================
  {
    id: 'cma1-f-096',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'ERP Systems',
    subtopic: 'Benefits',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A primary benefit of ERP systems for management accountants is:',
    options: [
      'Elimination of all manual processes',
      'Real-time integrated data across functional areas',
      'No need for trained finance staff',
      'Decreased transparency in operations'
    ],
    correctAnswer: 1,
    explanation: 'ERP systems integrate data across functions (finance, operations, HR, sales) in real-time. This provides management accountants with comprehensive, consistent data for analysis and reporting.',
    reference: 'ERP Benefits; Integrated Information Systems',
  },
  {
    id: 'cma1-f-097',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'ERP Systems',
    subtopic: 'Implementation Risks',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A major risk in ERP implementations is:',
    options: [
      'Systems running too efficiently',
      'Business process changes not properly managed, leading to user resistance',
      'Too few features available',
      'Decreased data integration'
    ],
    correctAnswer: 1,
    explanation: 'ERP implementations require significant business process changes. Poor change management causes user resistance, workarounds that bypass controls, and failure to realize benefits. Training and communication are critical.',
    reference: 'ERP Implementation Risks; Change Management',
  },

  // ==========================================
  // Emerging Technologies
  // ==========================================
  {
    id: 'cma1-f-098',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Emerging Technology',
    subtopic: 'Blockchain',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Blockchain technology in accounting could provide:',
    options: [
      'Decreased audit trail capability',
      'Immutable, transparent transaction records that simplify reconciliations',
      'Elimination of all accounting standards',
      'Reduced security due to open access'
    ],
    correctAnswer: 1,
    explanation: 'Blockchain provides immutable, distributed ledgers with transparent audit trails. This can streamline reconciliations, enhance trust in transaction records, and reduce fraud risk through cryptographic security.',
    reference: 'Blockchain in Finance; Distributed Ledger Technology',
  },
  {
    id: 'cma1-f-099',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Emerging Technology',
    subtopic: 'AI in Finance',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Artificial intelligence applications in finance currently include:',
    options: [
      'Replacing human judgment entirely in financial reporting',
      'Fraud detection, forecasting, and document processing',
      'Making all strategic decisions autonomously',
      'Eliminating the need for internal controls'
    ],
    correctAnswer: 1,
    explanation: 'AI currently assists with pattern recognition (fraud detection), prediction (forecasting), and processing (document extraction). Human oversight remains essential for judgment, accountability, and exceptions.',
    reference: 'AI Applications in Finance; Augmented Intelligence',
  },
  {
    id: 'cma1-f-100',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Emerging Technology',
    subtopic: 'Continuous Accounting',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Continuous accounting, enabled by technology, involves:',
    options: [
      'Delaying all reconciliations until year-end',
      'Distributing accounting tasks throughout the period rather than month-end spikes',
      'Eliminating monthly closes entirely',
      'Outsourcing all accounting functions'
    ],
    correctAnswer: 1,
    explanation: 'Continuous accounting uses automation to perform tasks (reconciliations, analyses) continuously rather than batching at period-end. This smooths workload, improves timeliness, and enables faster closes.',
    reference: 'Continuous Accounting; Finance Transformation',
  },
];

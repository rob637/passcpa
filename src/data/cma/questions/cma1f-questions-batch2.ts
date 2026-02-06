/**
 * CMA Part 1, Section F: Technology and Analytics - Questions Batch 2 (Q26-50)
 * Weight: 10% of Part 1 Exam
 * 
 * Blueprint Areas:
 * - CMA1-F: Technology and Analytics
 * 
 * Advanced Topics covered:
 * - Machine learning applications in finance
 * - Predictive analytics and regression models
 * - Data visualization best practices
 * - Blockchain applications in accounting
 * - RPA (Robotic Process Automation) implementation
 * - Data governance and quality frameworks
 * - Cloud computing security considerations
 * - ETL processes and data warehousing
 * - Business intelligence dashboards
 * - Natural Language Processing for financial documents
 * - Digital transformation metrics
 * - API integration and real-time data
 */

import { Question } from '../../../types';

export const CMA1F_QUESTIONS_BATCH2: Question[] = [
  // ==========================================
  // Machine Learning Applications in Finance
  // ==========================================
  {
    id: 'cma1-f-026',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Machine Learning',
    subtopic: 'ML Applications in Finance',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A financial institution uses an algorithm that analyzes historical transaction patterns to automatically flag potentially fraudulent credit card transactions in real-time. This is an example of:',
    options: [
      'Descriptive analytics using business intelligence',
      'Supervised machine learning for anomaly detection',
      'Unsupervised clustering for customer segmentation',
      'Prescriptive analytics for strategic planning'
    ],
    correctAnswer: 1,
    explanation: 'This describes supervised machine learning for anomaly detection. The model is trained on labeled historical data (known fraudulent vs. legitimate transactions) to identify patterns and predict fraud in real-time. Supervised learning uses labeled training data to make predictions on new data.',
    reference: 'Machine Learning in Finance; Fraud Detection',
  },
  {
    id: 'cma1-f-027',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Machine Learning',
    subtopic: 'ML Model Evaluation',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When evaluating a machine learning model for credit risk assessment, the finance team notes that 95% of predictions are correct. However, the model fails to identify 40% of actual defaults. Which metric should the team prioritize to improve?',
    options: [
      'Accuracy, since 95% is an acceptable rate',
      'Recall (sensitivity), to reduce false negatives in default prediction',
      'Precision, to reduce false positives in default prediction',
      'Specificity, to correctly identify non-defaulting customers'
    ],
    correctAnswer: 1,
    explanation: 'Recall (sensitivity) measures the proportion of actual positives correctly identified. Missing 40% of defaults means low recall (60%). In credit risk, false negatives (missing actual defaults) are costly. While accuracy is high, it may be misleading with imbalanced data. Improving recall will reduce missed defaults.',
    reference: 'ML Model Evaluation; Precision, Recall, F1 Score',
  },
  {
    id: 'cma1-f-028',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Machine Learning',
    subtopic: 'Model Governance',
    difficulty: 'medium',
    skillLevel: 'Evaluation',
    question: 'A company implements machine learning for automated loan decisions. To ensure responsible AI use, which governance practice is MOST essential?',
    options: [
      'Using the most complex model available for maximum accuracy',
      'Documenting model assumptions, monitoring for bias, and maintaining human oversight for appeals',
      'Keeping the algorithm proprietary to prevent gaming by applicants',
      'Retraining the model only when accuracy drops below 90%'
    ],
    correctAnswer: 1,
    explanation: 'Responsible AI governance requires: transparency (documented assumptions and logic), fairness (bias monitoring across protected classes), accountability (human oversight and appeal processes), and continuous monitoring. Complex models may create explainability issues, and infrequent retraining can lead to model drift.',
    reference: 'AI Governance; Responsible AI Principles',
  },

  // ==========================================
  // Predictive Analytics and Regression Models
  // ==========================================
  {
    id: 'cma1-f-029',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Predictive Analytics',
    subtopic: 'Regression Analysis',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'An analyst develops a multiple regression model: Sales = 50,000 + 2.5(Advertising) + 1,200(Salespeople) - 15(Competitor Ads). If R² = 0.85, what does this indicate?',
    options: [
      '85% of sales are generated by these three variables',
      '85% of the variation in sales is explained by the independent variables in the model',
      'The model predictions will be 85% accurate',
      'There is an 85% probability the coefficients are statistically significant'
    ],
    correctAnswer: 1,
    explanation: 'R² (coefficient of determination) measures the proportion of variance in the dependent variable explained by the independent variables. R² = 0.85 means 85% of the variation in sales is explained by advertising, salespeople count, and competitor ads. The remaining 15% is unexplained variance.',
    reference: 'Regression Analysis; R-Squared Interpretation',
  },
  {
    id: 'cma1-f-030',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Predictive Analytics',
    subtopic: 'Time Series Forecasting',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A company uses exponential smoothing with a smoothing constant (alpha) of 0.9 for demand forecasting. What does this high alpha value indicate?',
    options: [
      'The model weights historical data heavily and responds slowly to changes',
      'The model weights recent data heavily and responds quickly to changes',
      'The forecasts will be perfectly accurate',
      'The model ignores all historical data'
    ],
    correctAnswer: 1,
    explanation: 'In exponential smoothing, alpha determines the weight given to the most recent observation. A high alpha (0.9) means 90% weight on recent data and only 10% on historical averages, making forecasts highly responsive to recent changes. Conversely, a low alpha gives more weight to historical patterns.',
    reference: 'Time Series Forecasting; Exponential Smoothing',
  },
  {
    id: 'cma1-f-031',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Predictive Analytics',
    subtopic: 'Model Validation',
    difficulty: 'hard',
    skillLevel: 'Evaluation',
    question: 'To validate a predictive model that forecasts customer churn, the data science team should:',
    options: [
      'Train the model on all available data to maximize accuracy',
      'Split data into training and test sets, using holdout data to evaluate model performance on unseen data',
      'Use the same data for training and testing to ensure consistency',
      'Only validate the model after it has been in production for one year'
    ],
    correctAnswer: 1,
    explanation: 'Proper model validation requires splitting data into training and test (holdout) sets. The model is trained on training data and evaluated on unseen test data to assess generalization. Using the same data for training and testing causes overfitting, where the model memorizes data rather than learning patterns.',
    reference: 'Predictive Model Validation; Train-Test Split',
  },

  // ==========================================
  // Data Visualization Best Practices
  // ==========================================
  {
    id: 'cma1-f-032',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Data Visualization',
    subtopic: 'Chart Selection',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A CFO wants to show how total annual expenses are distributed across five major cost categories. Which visualization type is MOST appropriate?',
    options: [
      'Line chart showing trends over time',
      'Pie chart or stacked bar chart showing part-to-whole relationships',
      'Scatter plot showing correlations',
      'Histogram showing frequency distribution'
    ],
    correctAnswer: 1,
    explanation: 'Part-to-whole relationships are best shown with pie charts (for few categories) or stacked bar charts. These visualizations clearly display how components contribute to a total. Line charts show trends, scatter plots show correlations, and histograms show frequency distributions.',
    reference: 'Data Visualization; Chart Selection Best Practices',
  },
  {
    id: 'cma1-f-033',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Data Visualization',
    subtopic: 'Dashboard Design',
    difficulty: 'medium',
    skillLevel: 'Evaluation',
    question: 'Which principle is MOST important when designing an executive financial dashboard?',
    options: [
      'Include all available metrics to provide complete information',
      'Use 3D effects and animations to engage viewers',
      'Focus on key performance indicators with drill-down capability for details',
      'Display raw data tables for accuracy verification'
    ],
    correctAnswer: 2,
    explanation: 'Effective executive dashboards focus on critical KPIs with the ability to drill down for details. Information overload reduces usability. 3D effects can distort data perception. Raw data tables are better suited for analysts. The goal is actionable insights at a glance with exploration options.',
    reference: 'Dashboard Design Principles; Executive Reporting',
  },
  {
    id: 'cma1-f-034',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Data Visualization',
    subtopic: 'Misleading Charts',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A manager presents a bar chart showing revenue growth, but the y-axis starts at $900,000 rather than zero, making a $50,000 increase appear as a 500% visual increase. This practice is:',
    options: [
      'Acceptable because it highlights the difference more clearly',
      'Misleading because it visually exaggerates the magnitude of change',
      'Required by data visualization standards for precision',
      'Appropriate when presenting to executive audiences'
    ],
    correctAnswer: 1,
    explanation: 'Truncating the y-axis is a common technique that can mislead viewers by visually exaggerating differences. While sometimes useful for showing small variations in context, it violates data integrity principles when used to overstate performance. Best practice requires starting bar charts at zero or clearly indicating the break.',
    reference: 'Data Visualization Ethics; Misleading Charts',
  },

  // ==========================================
  // Blockchain Applications in Accounting
  // ==========================================
  {
    id: 'cma1-f-035',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Blockchain',
    subtopic: 'Blockchain Fundamentals',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The key characteristic that makes blockchain valuable for financial record-keeping is:',
    options: [
      'Centralized control by a single trusted authority',
      'Immutability through cryptographic linking of blocks, creating a tamper-evident ledger',
      'Ability to easily delete and modify historical transactions',
      'Lower storage requirements than traditional databases'
    ],
    correctAnswer: 1,
    explanation: 'Blockchain creates an immutable, tamper-evident ledger through cryptographic hashing. Each block contains a hash of the previous block, making alterations detectable. This provides audit trails and reduces reconciliation needs. It is decentralized, not centralized, and requires more storage than traditional databases.',
    reference: 'Blockchain Technology; Distributed Ledger',
  },
  {
    id: 'cma1-f-036',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Blockchain',
    subtopic: 'Smart Contracts',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A company implements smart contracts on a blockchain for supply chain payments. When goods are received and scanned at the warehouse, payment is automatically triggered to the supplier. What is the PRIMARY benefit?',
    options: [
      'Elimination of the need for purchase orders',
      'Automatic execution of predefined terms, reducing manual processing and payment delays',
      'Complete elimination of fraud risk',
      'Removal of all accounting entries from the system'
    ],
    correctAnswer: 1,
    explanation: 'Smart contracts are self-executing code that automatically enforce agreed terms when conditions are met. Benefits include reduced manual processing, faster settlements, fewer disputes, and lower transaction costs. They cannot eliminate all fraud or accounting entries, and purchase orders are still needed for procurement control.',
    reference: 'Smart Contracts; Supply Chain Finance',
  },
  {
    id: 'cma1-f-037',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Blockchain',
    subtopic: 'Audit Implications',
    difficulty: 'hard',
    skillLevel: 'Evaluation',
    question: 'How does blockchain technology potentially impact financial statement auditing?',
    options: [
      'Eliminates the need for external auditors entirely',
      'Enables real-time verification of transactions and reduces substantive testing of routine transactions',
      'Increases audit costs due to technology complexity',
      'Removes the requirement for internal controls'
    ],
    correctAnswer: 1,
    explanation: 'Blockchain provides real-time, verifiable transaction records with cryptographic assurance of data integrity. This can reduce substantive testing of routine transactions, shift audit focus to control testing and exception handling, and enable continuous auditing. However, auditors are still needed for judgment-based areas, estimates, and control evaluations.',
    reference: 'Blockchain Audit Implications; Continuous Auditing',
  },

  // ==========================================
  // RPA (Robotic Process Automation)
  // ==========================================
  {
    id: 'cma1-f-038',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Robotic Process Automation',
    subtopic: 'RPA Implementation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which process is MOST suitable for Robotic Process Automation (RPA)?',
    options: [
      'Complex negotiation with vendors requiring judgment',
      'High-volume, rule-based invoice data entry from structured documents',
      'Strategic financial planning requiring scenario analysis',
      'Customer relationship management requiring empathy'
    ],
    correctAnswer: 1,
    explanation: 'RPA is ideal for high-volume, repetitive, rule-based tasks with structured data and low exception rates. Invoice data entry from structured documents meets all criteria. Tasks requiring judgment, creativity, complex analysis, or emotional intelligence are not suitable for basic RPA.',
    reference: 'RPA Implementation; Process Selection Criteria',
  },
  {
    id: 'cma1-f-039',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Robotic Process Automation',
    subtopic: 'RPA Controls',
    difficulty: 'hard',
    skillLevel: 'Evaluation',
    question: 'A company deploys RPA bots for accounts payable processing. Which control is MOST critical to implement?',
    options: [
      'Monthly manual reconciliation by the RPA developer',
      'Segregated bot credentials, audit logging, exception handling protocols, and change management controls',
      'Unlimited bot access to accelerate processing',
      'Reliance on vendor security certifications only'
    ],
    correctAnswer: 1,
    explanation: 'RPA requires robust controls including: segregated bot credentials (not shared with humans), comprehensive audit logging, defined exception handling, change management for bot modifications, and access controls. Unlimited access creates control gaps. Developer reconciliation violates segregation. Internal controls supplement vendor certifications.',
    reference: 'RPA Governance; Bot Controls',
  },
  {
    id: 'cma1-f-040',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Robotic Process Automation',
    subtopic: 'RPA ROI',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'An RPA implementation costs $200,000 with annual maintenance of $30,000. It automates a process requiring 3 FTEs at $75,000 each annually. What is the first-year ROI?',
    options: [
      '12.5%',
      '(20.0%)',
      '(2.2%)',
      '62.5%'
    ],
    correctAnswer: 2,
    explanation: 'First-year savings: 3 × $75,000 = $225,000. First-year costs: $200,000 implementation + $30,000 maintenance = $230,000. Net benefit: $225,000 - $230,000 = $(5,000) loss. ROI = $(5,000) / $230,000 = (2.2%). Year 2+ would show positive ROI with only $30,000 maintenance cost against $225,000 savings.',
    reference: 'RPA Business Case; ROI Calculation',
  },

  // ==========================================
  // Data Governance and Quality
  // ==========================================
  {
    id: 'cma1-f-041',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Data Governance',
    subtopic: 'Data Quality Dimensions',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The six core dimensions of data quality according to the DAMA framework are:',
    options: [
      'Volume, velocity, variety, veracity, value, and visualization',
      'Accuracy, completeness, consistency, timeliness, validity, and uniqueness',
      'Input, processing, output, storage, retrieval, and deletion',
      'Confidentiality, integrity, availability, privacy, security, and compliance'
    ],
    correctAnswer: 1,
    explanation: 'The DAMA data quality dimensions are: Accuracy (correct values), Completeness (no missing data), Consistency (uniform across systems), Timeliness (current and available when needed), Validity (conforms to rules/formats), and Uniqueness (no duplicates). The first option describes big data characteristics.',
    reference: 'DAMA Data Quality Framework; Data Governance',
  },
  {
    id: 'cma1-f-042',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Data Governance',
    subtopic: 'Data Stewardship',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'In a data governance framework, the role of Data Steward is BEST described as:',
    options: [
      'Executive sponsor who provides budget and strategic direction',
      'Subject matter expert responsible for data quality, definitions, and business rules within their domain',
      'IT administrator who manages database technical operations',
      'External auditor who certifies data compliance'
    ],
    correctAnswer: 1,
    explanation: 'Data Stewards are business-side subject matter experts responsible for data quality, metadata management, and business rules within their domain. They bridge business and IT, defining data standards and resolving data issues. Executive sponsors provide strategic oversight, while IT handles technical operations.',
    reference: 'Data Governance Roles; Data Stewardship',
  },
  {
    id: 'cma1-f-043',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Data Governance',
    subtopic: 'Master Data Management',
    difficulty: 'hard',
    skillLevel: 'Evaluation',
    question: 'A company has customer data in five different systems with inconsistent formats and duplicate records. Implementing Master Data Management (MDM) would:',
    options: [
      'Delete all customer data and start fresh',
      'Create a single authoritative source for customer data with consistent standards across systems',
      'Lock all systems to prevent any data changes',
      'Outsource all customer data management to a third party'
    ],
    correctAnswer: 1,
    explanation: 'MDM creates a "golden record" - a single, authoritative version of master data (customers, products, vendors) used across the organization. It involves data cleansing, deduplication, standardization, and governance. MDM improves data quality, reduces redundancy, and enables consistent reporting and analytics.',
    reference: 'Master Data Management; Data Integration',
  },

  // ==========================================
  // Cloud Computing Security
  // ==========================================
  {
    id: 'cma1-f-044',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Cloud Security',
    subtopic: 'Shared Responsibility Model',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Under the cloud shared responsibility model for IaaS (Infrastructure as a Service), which security control is the CUSTOMER\'s responsibility?',
    options: [
      'Physical security of data centers',
      'Hypervisor security and network infrastructure',
      'Operating system patching and application security',
      'Hardware maintenance and power management'
    ],
    correctAnswer: 2,
    explanation: 'In IaaS, the cloud provider secures infrastructure (data centers, hardware, hypervisor, network). The customer is responsible for everything above the hypervisor: operating system, middleware, applications, data, and access controls. Understanding this division is critical for cloud security planning.',
    reference: 'Cloud Shared Responsibility Model; IaaS Security',
  },
  {
    id: 'cma1-f-045',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Cloud Security',
    subtopic: 'Cloud Access Controls',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'To secure sensitive financial data stored in a cloud environment, which access control approach is MOST effective?',
    options: [
      'Single password shared among the finance team',
      'Identity and Access Management (IAM) with multi-factor authentication, role-based access, and least privilege',
      'Open access with activity logging for audit purposes',
      'VPN access without additional authentication requirements'
    ],
    correctAnswer: 1,
    explanation: 'Effective cloud access control combines: IAM (centralized identity management), MFA (additional authentication factors), RBAC (role-based access control), and least privilege (minimum necessary access). Shared passwords, open access, and VPN-only approaches create significant security vulnerabilities.',
    reference: 'Cloud Security; Identity and Access Management',
  },

  // ==========================================
  // ETL and Data Warehousing
  // ==========================================
  {
    id: 'cma1-f-046',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Data Warehousing',
    subtopic: 'ETL Process',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'In the ETL (Extract, Transform, Load) process, the Transform step involves:',
    options: [
      'Pulling data from source systems',
      'Cleaning, standardizing, and converting data to match the target schema',
      'Inserting data into the destination database',
      'Backing up the source systems'
    ],
    correctAnswer: 1,
    explanation: 'The Transform step cleanses, standardizes, and converts extracted data to match the target data warehouse schema. This includes: data type conversions, handling nulls, applying business rules, aggregating data, and resolving inconsistencies. Extract pulls data from sources; Load inserts into the destination.',
    reference: 'ETL Process; Data Warehousing',
  },
  {
    id: 'cma1-f-047',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Data Warehousing',
    subtopic: 'Data Warehouse Architecture',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A star schema in a data warehouse consists of:',
    options: [
      'Multiple normalized tables with complex joins',
      'A central fact table surrounded by dimension tables connected by foreign keys',
      'A single denormalized table containing all data',
      'Separate databases for each business unit'
    ],
    correctAnswer: 1,
    explanation: 'A star schema has a central fact table (quantitative metrics like sales amounts, quantities) connected to dimension tables (descriptive attributes like time, product, customer, geography). This denormalized structure optimizes query performance for analytical workloads. Snowflake schema adds normalized dimension tables.',
    reference: 'Data Warehouse; Star Schema Design',
  },
  {
    id: 'cma1-f-048',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Data Warehousing',
    subtopic: 'Data Lake vs Data Warehouse',
    difficulty: 'medium',
    skillLevel: 'Evaluation',
    question: 'Compared to a traditional data warehouse, a data lake is characterized by:',
    options: [
      'Structured data with predefined schemas applied before loading (schema-on-write)',
      'Raw data storage in native format with schema applied when reading (schema-on-read)',
      'Higher query performance for structured analytical queries',
      'Better suited for traditional SQL-based business intelligence'
    ],
    correctAnswer: 1,
    explanation: 'Data lakes store raw data in native format (structured, semi-structured, unstructured) using schema-on-read - the structure is applied when data is analyzed. Data warehouses use schema-on-write with predefined structures. Data lakes offer flexibility for data science but may have slower query performance for structured BI.',
    reference: 'Data Lake Architecture; Schema-on-Read',
  },

  // ==========================================
  // Business Intelligence and NLP
  // ==========================================
  {
    id: 'cma1-f-049',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Natural Language Processing',
    subtopic: 'NLP Financial Applications',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A company uses Natural Language Processing (NLP) to analyze customer complaint emails and automatically categorize them by issue type and sentiment. This application primarily supports:',
    options: [
      'Financial statement preparation',
      'Customer service analytics and operational efficiency',
      'Internal audit testing',
      'Tax compliance filing'
    ],
    correctAnswer: 1,
    explanation: 'NLP text analysis of customer communications supports customer service analytics by: automating categorization of inquiries, detecting sentiment for priority routing, identifying trends in complaints, and improving response efficiency. This is an operational analytics application using unstructured data.',
    reference: 'NLP Applications; Text Analytics',
  },
  {
    id: 'cma1-f-050',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'API Integration',
    subtopic: 'Real-Time Data Integration',
    difficulty: 'hard',
    skillLevel: 'Evaluation',
    question: 'A company integrates its ERP system with banking partners via APIs for real-time cash position visibility. Which consideration is MOST critical for this integration?',
    options: [
      'Using the lowest-cost API provider available',
      'Implementing OAuth authentication, encryption, error handling, and rate limiting compliance',
      'Avoiding any data validation to maximize speed',
      'Storing API credentials in application source code for convenience'
    ],
    correctAnswer: 1,
    explanation: 'Critical API integration considerations include: secure authentication (OAuth 2.0), data encryption (TLS), robust error handling, rate limiting compliance, and proper credential management (never in source code). Security, reliability, and proper governance are essential for financial data integrations.',
    reference: 'API Integration; Financial Data Security',
  },
];

// Helper functions
export const getCMA1FQuestionsBatch2 = () => CMA1F_QUESTIONS_BATCH2;
export const getCMA1FQuestionsBatch2Count = () => CMA1F_QUESTIONS_BATCH2.length;

// Topic distribution helper
export const getCMA1FBatch2TopicBreakdown = () => {
  const topics: Record<string, number> = {};
  CMA1F_QUESTIONS_BATCH2.forEach(q => {
    topics[q.topic] = (topics[q.topic] || 0) + 1;
  });
  return topics;
};

// Difficulty distribution helper
export const getCMA1FBatch2DifficultyBreakdown = () => {
  const difficulties: Record<string, number> = {};
  CMA1F_QUESTIONS_BATCH2.forEach(q => {
    difficulties[q.difficulty] = (difficulties[q.difficulty] || 0) + 1;
  });
  return difficulties;
};

export default CMA1F_QUESTIONS_BATCH2;

/**
 * CMA Part 1, Section F: Technology and Analytics - Questions Batch 1 (Q1-25)
 * Weight: 15% of Part 1 Exam
 * 
 * Blueprint Areas:
 * - CMA1-F: Technology and Analytics
 * 
 * Topics covered:
 * - Information Systems
 * - Data Analytics
 * - Business Intelligence
 * - Emerging Technologies
 * - Data Governance
 */

import { Question } from '../../../types';

export const CMA1F_QUESTIONS_BATCH1: Question[] = [
  // ==========================================
  // Information Systems
  // ==========================================
  {
    id: 'cma1-f-001',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Information Systems',
    subtopic: 'ERP Systems',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'An Enterprise Resource Planning (ERP) system is characterized by:',
    options: [
      'Separate databases for each business function',
      'An integrated database shared across the organization',
      'Only financial reporting capabilities',
      'Manual data entry between modules'
    ],
    correctAnswer: 1,
    explanation: 'ERP systems integrate all business functions (finance, HR, operations, sales) using a single, shared database. This eliminates data silos, reduces redundancy, and enables real-time information across the organization.',
    reference: 'ERP Systems; IMA CMA Content',
  },
  {
    id: 'cma1-f-002',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Information Systems',
    subtopic: 'ERP Benefits',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which of the following is a benefit of implementing an ERP system?',
    options: [
      'Lower initial implementation costs',
      'Improved data consistency and real-time reporting',
      'Reduced need for business process changes',
      'Simpler system administration'
    ],
    correctAnswer: 1,
    explanation: 'ERP provides a single source of truth with consistent data and real-time reporting. However, ERP implementations are typically expensive, require significant process changes, and need dedicated administration.',
    reference: 'ERP Benefits; Information Systems',
  },
  {
    id: 'cma1-f-003',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Information Systems',
    subtopic: 'Cloud Computing',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Software as a Service (SaaS) means that:',
    options: [
      'Software is installed on local servers',
      'Applications are accessed over the internet on a subscription basis',
      'Only hardware is provided by the vendor',
      'Companies must develop their own software'
    ],
    correctAnswer: 1,
    explanation: 'SaaS delivers software applications over the internet on a subscription basis. The vendor hosts and maintains the software, and users access it via web browsers. Examples include Salesforce, Office 365, and NetSuite.',
    reference: 'Cloud Computing; SaaS',
  },
  {
    id: 'cma1-f-004',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Information Systems',
    subtopic: 'Cloud Models',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'In Infrastructure as a Service (IaaS), the cloud provider is responsible for:',
    options: [
      'Both hardware and application software',
      'Hardware, virtualization, and network infrastructure only',
      'Only the application layer',
      'User training and support'
    ],
    correctAnswer: 1,
    explanation: 'In IaaS, the provider manages hardware, virtualization, and networking. The customer manages the operating system, middleware, applications, and data. IaaS provides the most control but requires more customer management.',
    reference: 'Cloud Service Models; IaaS, PaaS, SaaS',
  },

  // ==========================================
  // Data Analytics
  // ==========================================
  {
    id: 'cma1-f-005',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Data Analytics',
    subtopic: 'Types of Analytics',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Descriptive analytics answers the question:',
    options: [
      'What will happen?',
      'What happened?',
      'Why did it happen?',
      'What should we do?'
    ],
    correctAnswer: 1,
    explanation: 'Descriptive analytics summarizes historical data to answer "what happened." Diagnostic analytics answers "why." Predictive analytics forecasts "what will happen." Prescriptive analytics recommends "what to do."',
    reference: 'Types of Analytics; Data Analytics',
  },
  {
    id: 'cma1-f-006',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Data Analytics',
    subtopic: 'Predictive Analytics',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Using historical sales data and regression models to forecast next quarter\'s revenue is an example of:',
    options: [
      'Descriptive analytics',
      'Diagnostic analytics',
      'Predictive analytics',
      'Prescriptive analytics'
    ],
    correctAnswer: 2,
    explanation: 'Predictive analytics uses statistical models, machine learning, and historical data to forecast future outcomes. Revenue forecasting, demand prediction, and credit scoring are common predictive applications.',
    reference: 'Predictive Analytics; Forecasting',
  },
  {
    id: 'cma1-f-007',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Data Analytics',
    subtopic: 'Prescriptive Analytics',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'An analytics system that recommends optimal inventory reorder points based on demand forecasts and costs is using:',
    options: [
      'Descriptive analytics',
      'Diagnostic analytics',
      'Predictive analytics',
      'Prescriptive analytics'
    ],
    correctAnswer: 3,
    explanation: 'Prescriptive analytics not only predicts outcomes but recommends optimal actions. Optimization algorithms that suggest inventory levels, pricing, or resource allocation are prescriptive because they tell you what to do.',
    reference: 'Prescriptive Analytics; Decision Optimization',
  },
  {
    id: 'cma1-f-008',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Data Analytics',
    subtopic: 'Data Visualization',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A dashboard that displays real-time KPIs using charts and graphs is an example of:',
    options: [
      'Data warehousing',
      'Data visualization',
      'Data mining',
      'Statistical sampling'
    ],
    correctAnswer: 1,
    explanation: 'Data visualization presents data graphically through charts, graphs, dashboards, and other visual elements. This makes complex data easier to understand and enables faster decision-making.',
    reference: 'Data Visualization; Business Intelligence',
  },
  {
    id: 'cma1-f-009',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Data Analytics',
    subtopic: 'Data Mining',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Data mining is best described as:',
    options: [
      'Manually entering data into spreadsheets',
      'Extracting patterns and insights from large datasets using statistical methods',
      'Storing data in physical files',
      'Deleting outdated data'
    ],
    correctAnswer: 1,
    explanation: 'Data mining uses statistical methods, machine learning, and algorithms to discover patterns, correlations, and anomalies in large datasets. It can reveal customer segments, fraud patterns, and process inefficiencies.',
    reference: 'Data Mining; Analytics',
  },

  // ==========================================
  // Business Intelligence
  // ==========================================
  {
    id: 'cma1-f-010',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Business Intelligence',
    subtopic: 'Data Warehouses',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A data warehouse is:',
    options: [
      'An operational database for transaction processing',
      'A central repository of integrated data for analysis and reporting',
      'A backup system for disaster recovery',
      'A physical storage facility for servers'
    ],
    correctAnswer: 1,
    explanation: 'A data warehouse is a central repository that consolidates data from multiple sources for analytical querying and reporting. Unlike operational databases (for day-to-day transactions), data warehouses are optimized for analysis.',
    reference: 'Data Warehousing; Business Intelligence',
  },
  {
    id: 'cma1-f-011',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Business Intelligence',
    subtopic: 'ETL Process',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'ETL in data management stands for:',
    options: [
      'Edit, Transfer, Load',
      'Extract, Transform, Load',
      'Evaluate, Test, Launch',
      'Export, Transfer, Link'
    ],
    correctAnswer: 1,
    explanation: 'ETL (Extract, Transform, Load) is the process of extracting data from source systems, transforming it into a consistent format, and loading it into a data warehouse. This prepares raw data for analysis.',
    reference: 'ETL Process; Data Management',
  },
  {
    id: 'cma1-f-012',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Business Intelligence',
    subtopic: 'OLAP',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'OLAP (Online Analytical Processing) differs from OLTP (Online Transaction Processing) primarily because OLAP:',
    options: [
      'Processes individual transactions in real-time',
      'Is designed for complex queries and analysis of aggregated data',
      'Requires less storage capacity',
      'Is only used for data entry'
    ],
    correctAnswer: 1,
    explanation: 'OLAP is optimized for complex analytical queries, data aggregation, and multi-dimensional analysis (slice-and-dice). OLTP is optimized for fast processing of individual transactions (orders, payments, inventory updates).',
    reference: 'OLAP vs OLTP; Business Intelligence',
  },

  // ==========================================
  // Emerging Technologies
  // ==========================================
  {
    id: 'cma1-f-013',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Emerging Technology',
    subtopic: 'Artificial Intelligence',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Machine learning is best described as a subset of AI that:',
    options: [
      'Requires explicit programming for every decision',
      'Enables systems to learn from data and improve without explicit programming',
      'Only works with numerical data',
      'Cannot handle unstructured data'
    ],
    correctAnswer: 1,
    explanation: 'Machine learning algorithms learn patterns from data and improve their performance over time without being explicitly programmed for each scenario. This enables automation of predictions, classifications, and recommendations.',
    reference: 'Machine Learning; Artificial Intelligence',
  },
  {
    id: 'cma1-f-015',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Emerging Technology',
    subtopic: 'Blockchain',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A key characteristic of blockchain technology is:',
    options: [
      'Centralized control by a single authority',
      'Immutable, distributed ledger of transactions',
      'Easy modification of historical records',
      'Reliance on trusted third parties'
    ],
    correctAnswer: 1,
    explanation: 'Blockchain is a distributed, immutable ledger where transactions are recorded across multiple nodes. Once recorded, transactions cannot be altered, creating transparency and eliminating the need for central intermediaries.',
    reference: 'Blockchain Technology',
  },
  {
    id: 'cma1-f-016',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Emerging Technology',
    subtopic: 'IoT',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Internet of Things (IoT) sensors on production equipment can help with:',
    options: [
      'Employee performance reviews',
      'Predictive maintenance and real-time monitoring',
      'Financial statement preparation',
      'Strategic planning meetings'
    ],
    correctAnswer: 1,
    explanation: 'IoT sensors collect real-time data from equipment, enabling predictive maintenance (detecting issues before failure), process monitoring, and efficiency optimization. This reduces downtime and maintenance costs.',
    reference: 'Internet of Things; Smart Manufacturing',
  },

  // ==========================================
  // Data Governance
  // ==========================================
  {
    id: 'cma1-f-017',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Data Governance',
    subtopic: 'Data Quality',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Data quality dimensions include all of the following EXCEPT:',
    options: [
      'Accuracy',
      'Completeness',
      'Profitability',
      'Timeliness'
    ],
    correctAnswer: 2,
    explanation: 'Data quality dimensions include accuracy, completeness, consistency, timeliness, validity, and uniqueness. Profitability is a financial metric, not a data quality characteristic.',
    reference: 'Data Quality; Data Governance',
  },
  {
    id: 'cma1-f-018',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Data Governance',
    subtopic: 'Master Data Management',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Master data management (MDM) focuses on:',
    options: [
      'Archiving old transaction data',
      'Creating and maintaining consistent definitions of key business entities',
      'Processing daily transactions',
      'Designing user interfaces'
    ],
    correctAnswer: 1,
    explanation: 'MDM ensures consistent, accurate master data (customers, products, suppliers, locations) across the enterprise. It provides a "single version of truth" for core business entities used across multiple systems.',
    reference: 'Master Data Management; Data Governance',
  },
  {
    id: 'cma1-f-019',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Data Governance',
    subtopic: 'Data Privacy',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'GDPR (General Data Protection Regulation) primarily addresses:',
    options: [
      'Financial reporting requirements',
      'Protection of personal data and privacy rights',
      'Environmental regulations',
      'Employee safety standards'
    ],
    correctAnswer: 1,
    explanation: 'GDPR is an EU regulation protecting personal data and privacy. It requires consent for data collection, data breach notification, right to access/delete personal data, and applies to any organization processing EU residents\' data.',
    reference: 'GDPR; Data Privacy',
  },
  {
    id: 'cma1-f-020',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Data Governance',
    subtopic: 'Data Security',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Encryption protects data by:',
    options: [
      'Deleting sensitive information',
      'Converting data into a coded format readable only with a decryption key',
      'Creating multiple copies of data',
      'Restricting physical access to servers'
    ],
    correctAnswer: 1,
    explanation: 'Encryption converts readable data (plaintext) into an unreadable format (ciphertext) using algorithms. Only authorized parties with the correct decryption key can access the original data, protecting it from unauthorized access.',
    reference: 'Data Encryption; Cybersecurity',
  },

  // ==========================================
  // Analytics Applications
  // ==========================================
  {
    id: 'cma1-f-021',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Analytics Applications',
    subtopic: 'Financial Analytics',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Scenario analysis in financial planning typically involves:',
    options: [
      'Analyzing only the most likely outcome',
      'Modeling multiple "what-if" scenarios with different assumptions',
      'Ignoring all uncertain variables',
      'Using only historical data'
    ],
    correctAnswer: 1,
    explanation: 'Scenario analysis models multiple possible futures using different assumptions (best case, worst case, most likely). This helps decision-makers understand the range of potential outcomes and prepare appropriate responses.',
    reference: 'Scenario Analysis; Financial Planning',
  },
  {
    id: 'cma1-f-022',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Analytics Applications',
    subtopic: 'Sensitivity Analysis',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Sensitivity analysis answers the question:',
    options: [
      'What happened in the past?',
      'How does changing one input variable affect the output?',
      'What is the most likely outcome?',
      'Which competitor is most dangerous?'
    ],
    correctAnswer: 1,
    explanation: 'Sensitivity analysis (what-if analysis) examines how changes in input variables affect outputs. For example, "If sales price decreases by 5%, how does that affect net income?" It identifies which variables have the greatest impact.',
    reference: 'Sensitivity Analysis; Financial Modeling',
  },
  {
    id: 'cma1-f-023',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Analytics Applications',
    subtopic: 'Monte Carlo Simulation',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Monte Carlo simulation is a technique that:',
    options: [
      'Uses a single point estimate for each variable',
      'Runs many iterations with random inputs to model probability distributions',
      'Eliminates all uncertainty',
      'Only works for financial data'
    ],
    correctAnswer: 1,
    explanation: 'Monte Carlo simulation runs thousands of iterations with randomly selected values from probability distributions. This produces a range of possible outcomes and their probabilities, useful for risk analysis and capital budgeting.',
    reference: 'Monte Carlo Simulation; Risk Analysis',
  },
  {
    id: 'cma1-f-024',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-F',
    topic: 'Information Systems',
    subtopic: 'System Implementation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When implementing a new financial system, parallel running means:',
    options: [
      'Shutting down the old system immediately',
      'Operating both old and new systems simultaneously to verify the new system works correctly',
      'Running the new system in a test environment only',
      'Implementing all modules at once'
    ],
    correctAnswer: 1,
    explanation: 'Parallel running operates both the old and new systems simultaneously, processing the same transactions in both. This allows comparison of outputs to verify the new system works correctly before retiring the old system.',
    reference: 'System Implementation; Conversion Strategies',
  },
];

// Helper functions
export const getCMA1FQuestionsBatch1 = () => CMA1F_QUESTIONS_BATCH1;
export const getCMA1FQuestionCount = () => CMA1F_QUESTIONS_BATCH1.length;

export default CMA1F_QUESTIONS_BATCH1;

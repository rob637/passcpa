/**
 * CISA Domain 1: IS Auditing Process
 * CAATs and Data Analytics Questions
 * Computer-Assisted Audit Techniques and Audit Data Analytics
 */

import { Question } from '../../../types';

export const CISA1_QUESTIONS_ANALYTICS: Question[] = [
  // ============================================================================
  // CAATS QUESTIONS
  // ============================================================================
  {
    id: 'cisa1-da-001',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The PRIMARY advantage of using generalized audit software (GAS) is:',
    options: [
      'Reduced audit costs',
      'Ability to test 100% of the population rather than samples',
      'Faster report generation',
      'Elimination of auditor judgment'
    ],
    correctAnswer: 1,
    explanation: 'GAS allows auditors to analyze entire populations of data rather than relying on samples, significantly improving coverage and risk detection.',
    topic: 'CAATs',
    subtopic: 'GAS'
  },
  {
    id: 'cisa1-da-002',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'An IS auditor wants to verify that application controls are functioning correctly. Which CAAT would BEST accomplish this?',
    options: [
      'Generalized audit software',
      'Test data method',
      'Data visualization tools',
      'Statistical sampling software'
    ],
    correctAnswer: 1,
    explanation: 'The test data method processes fictitious transactions through the production system to verify that application controls function as intended.',
    topic: 'CAATs',
    subtopic: 'Test Data'
  },
  {
    id: 'cisa1-da-003',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'An Integrated Test Facility (ITF) is BEST described as:',
    options: [
      'A separate test environment',
      'A dummy entity within a live production system',
      'An external testing laboratory',
      'A user acceptance testing framework'
    ],
    correctAnswer: 1,
    explanation: 'ITF creates a fictional entity (like a dummy department) within the live system to process test transactions alongside real production data.',
    topic: 'CAATs',
    subtopic: 'ITF'
  },
  {
    id: 'cisa1-da-004',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Parallel simulation involves:',
    options: [
      'Running two applications simultaneously',
      'The auditor reprocessing production data with auditor-controlled logic',
      'Testing in a duplicate environment',
      'Processing test data through the production system'
    ],
    correctAnswer: 1,
    explanation: 'Parallel simulation has the auditor write their own program logic to reprocess actual production data and compare results to verify processing accuracy.',
    topic: 'CAATs',
    subtopic: 'Parallel Simulation'
  },
  {
    id: 'cisa1-da-005',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Embedded audit modules are BEST suited for:',
    options: [
      'One-time audit testing',
      'Continuous real-time monitoring',
      'Sample selection',
      'Report formatting'
    ],
    correctAnswer: 1,
    explanation: 'Embedded audit modules are built into production systems and provide continuous, real-time monitoring and data capture for audit purposes.',
    topic: 'CAATs',
    subtopic: 'Embedded Modules'
  },
  {
    id: 'cisa1-da-006',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The GREATEST risk of using an Integrated Test Facility is:',
    options: [
      'High implementation cost',
      'Potential contamination of production data',
      'Complex programming requirements',
      'Limited test coverage'
    ],
    correctAnswer: 1,
    explanation: 'ITF processes test data in the live production environment, creating risk of affecting production reports or data if not carefully controlled and reversed.',
    topic: 'CAATs',
    subtopic: 'ITF Risks'
  },

  // ============================================================================
  // DATA ANALYTICS QUESTIONS
  // ============================================================================
  {
    id: 'cisa1-da-007',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Benford\'s Law analysis is MOST useful for detecting:',
    options: [
      'Missing transactions',
      'Duplicate payments',
      'Fabricated or unusual numbers',
      'Access control violations'
    ],
    correctAnswer: 2,
    explanation: 'Benford\'s Law compares first-digit frequency distribution against expected natural patterns to identify numbers that may be fabricated or manipulated.',
    topic: 'Data Analytics',
    subtopic: 'Benford\'s Law'
  },
  {
    id: 'cisa1-da-008',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Gap analysis in audit data analytics is used to identify:',
    options: [
      'Control weaknesses',
      'Missing numbers in sequences',
      'Unauthorized access',
      'Budget variances'
    ],
    correctAnswer: 1,
    explanation: 'Gap analysis identifies missing numbers in sequences such as check numbers, invoice IDs, or transaction records that may indicate fraud or errors.',
    topic: 'Data Analytics',
    subtopic: 'Gap Analysis'
  },
  {
    id: 'cisa1-da-009',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The PRIMARY difference between continuous auditing and continuous monitoring is:',
    options: [
      'Continuous auditing is always real-time',
      'Continuous auditing is performed by internal audit for assurance; continuous monitoring is management\'s responsibility',
      'Continuous monitoring uses more advanced tools',
      'There is no difference'
    ],
    correctAnswer: 1,
    explanation: 'Continuous auditing provides independent assurance (internal audit), while continuous monitoring is operational oversight performed by management.',
    topic: 'Data Analytics',
    subtopic: 'Continuous Auditing'
  },
  {
    id: 'cisa1-da-010',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Which analytics maturity level answers "What will happen?"',
    options: [
      'Descriptive',
      'Diagnostic',
      'Predictive',
      'Prescriptive'
    ],
    correctAnswer: 2,
    explanation: 'Predictive analytics forecasts future events. Descriptive shows what happened, diagnostic explains why, and prescriptive recommends actions.',
    topic: 'Data Analytics',
    subtopic: 'Analytics Maturity'
  },
  {
    id: 'cisa1-da-011',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When implementing audit data analytics, the FIRST step should be:',
    options: [
      'Selecting analytics tools',
      'Defining audit objectives and questions to answer',
      'Extracting data from all systems',
      'Training staff on visualization'
    ],
    correctAnswer: 1,
    explanation: 'Effective analytics starts with clear objectives - what risks are being addressed and what questions need answers. Tool selection follows.',
    topic: 'Data Analytics',
    subtopic: 'Analytics Implementation'
  },
  {
    id: 'cisa1-da-012',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Stratification analysis in auditing helps to:',
    options: [
      'Encrypt sensitive data',
      'Group data by value ranges to identify patterns or outliers',
      'Delete duplicate records',
      'Merge multiple data sources'
    ],
    correctAnswer: 1,
    explanation: 'Stratification groups data into ranges (e.g., transaction amounts by size) to analyze distribution patterns and identify unusual concentrations.',
    topic: 'Data Analytics',
    subtopic: 'Stratification'
  },
  {
    id: 'cisa1-da-013',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'An IS auditor using data analytics notices that 15% of vendor payments have round dollar amounts. This finding MOST likely indicates:',
    options: [
      'Normal business practice',
      'Potential phantom vendors or fraud requiring investigation',
      'Excellent invoice processing',
      'System rounding errors'
    ],
    correctAnswer: 1,
    explanation: 'An unusually high percentage of round-dollar payments may indicate fabricated invoices since legitimate invoices typically have irregular amounts.',
    topic: 'Data Analytics',
    subtopic: 'Fraud Indicators'
  },
  {
    id: 'cisa1-da-014',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Three-way matching analytics compares:',
    options: [
      'Budget, actual, and variance',
      'Purchase order, receipt, and invoice',
      'Past, present, and forecast',
      'Request, approval, and payment'
    ],
    correctAnswer: 1,
    explanation: 'Three-way matching compares purchase orders to receiving documents to vendor invoices to detect pricing errors or unauthorized purchases.',
    topic: 'Data Analytics',
    subtopic: 'Matching Analytics'
  },
  {
    id: 'cisa1-da-015',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Data visualization in auditing is MOST valuable for:',
    options: [
      'Replacing statistical analysis',
      'Communicating patterns, trends, and anomalies to stakeholders',
      'Eliminating the need for sampling',
      'Automating audit conclusions'
    ],
    correctAnswer: 1,
    explanation: 'Visualization transforms complex data into understandable formats, enabling auditors to communicate findings effectively to stakeholders.',
    topic: 'Data Analytics',
    subtopic: 'Visualization'
  }
];

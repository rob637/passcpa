/**
 * CIA Questions: Missing Topics - Fraud, Sampling, IFRS/GAAP
 * 
 * These questions address gaps identified in the content review
 */

import { Question } from '../../../types';

export const CIA_MISSING_TOPICS_QUESTIONS: Question[] = [
  // ============================================================================
  // FRAUD EXAMINATION TECHNIQUES (CIA Part 2)
  // ============================================================================
  {
    id: 'cia2-fraud-001',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: "Benford's Law is most useful for detecting fraud in which of the following?",
    options: [
      'Social Security numbers',
      'Sequential invoice numbers',
      'Expense reimbursement amounts',
      'Employee badge numbers',
    ],
    correctAnswer: 2,
    explanation: "Benford's Law analyzes the expected frequency distribution of first digits in naturally occurring numerical datasets. It is most useful for expense reimbursements, invoices, and payment amounts. It does NOT apply to assigned numbers like invoice numbers, SSNs, or badge numbers that are sequentially or randomly assigned.",
    topic: 'Fraud Detection',
    subtopic: "Benford's Law"
  },
  {
    id: 'cia2-fraud-002',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: "According to Benford's Law, what percentage of first digits in a naturally occurring dataset should be the digit \"1\"?",
    options: [
      'Approximately 11%',
      'Approximately 20%',
      'Approximately 30%',
      'Approximately 50%'
    ],
    correctAnswer: 2,
    explanation: "Benford's Law predicts that in naturally occurring datasets, the digit \"1\" appears as the first digit approximately 30.1% of the time. This counterintuitive distribution is used in fraud detection - significant deviation from expected percentages may indicate data manipulation.",
    topic: 'Fraud Detection',
    subtopic: "Benford's Law"
  },
  {
    id: 'cia2-fraud-003',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which fraud interview type should be conducted first when investigating a suspected fraud?',
    options: [
      'Admission-seeking interview',
      'Interrogation interview',
      'Information-gathering interview',
      'Confrontation interview'
    ],
    correctAnswer: 2,
    explanation: 'The information-gathering interview should be conducted first. It is non-accusatory, uses open-ended questions, and helps establish facts and timeline. Only after sufficient evidence is gathered should an admission-seeking interview be considered.',
    topic: 'Fraud Detection',
    subtopic: 'Interview Techniques',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-fraud-004',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'According to the ACFE, which type of occupational fraud is most common but causes the lowest median loss per incident?',
    options: [
      'Corruption',
      'Asset misappropriation',
      'Financial statement fraud',
      'Billing schemes',
    ],
    correctAnswer: 1,
    explanation: 'Asset misappropriation is the most common type of occupational fraud (occurring in about 86% of cases) but has the lowest median loss per incident. Financial statement fraud is the least common but causes the highest median loss per incident.',
    topic: 'Fraud Detection',
    subtopic: 'Fraud Types',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-fraud-005',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which red flag is most indicative of potential vendor corruption?',
    options: [
      'Unusual adjusting journal entries',
      'Multiple single-source contracts with one vendor',
      'High employee turnover in payroll department',
      'Large cash refunds to customers',
    ],
    correctAnswer: 1,
    explanation: 'Multiple single-source contracts with one vendor can indicate a corrupt relationship (kickbacks, bid-rigging). Other red flags for vendor corruption include unusually close vendor relationships, inflated invoices, and lack of competitive bidding.',
    topic: 'Fraud Detection',
    subtopic: 'Red Flags',
  reference: 'IIA Standards'
  },

  // ============================================================================
  // STATISTICAL SAMPLING (CIA Part 2)
  // ============================================================================
  {
    id: 'cia2-samp-001',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'An auditor wants 95% confidence with a 5% tolerable error rate and expects a 2% error rate. Using attribute sampling, which factor corresponds to a Z-score of 1.96?',
    options: [
      'Expected error rate',
      'Sample deviation rate',
      'Tolerable error rate',
      '95% confidence level',
    ],
    correctAnswer: 3,
    explanation: 'The Z-score of 1.96 corresponds to a 95% confidence level. Common Z-scores: 90% = 1.65, 95% = 1.96, 99% = 2.58. This factor is used in the sample size formula to achieve the desired confidence level.',
    topic: 'Statistical Sampling',
    subtopic: 'Z-Scores',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-samp-002',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which of the following would require the auditor to INCREASE sample size?',
    options: [
      'Increasing the tolerable error rate from 3% to 5%',
      'Decreasing the confidence level from 95% to 90%',
      'Increasing the expected error rate from 2% to 1%',
      'Decreasing the tolerable error rate from 5% to 3%',
    ],
    correctAnswer: 3,
    explanation: 'Decreasing the tolerable error rate (tighter precision) requires a larger sample to achieve the same confidence. Lower tolerable error = more precision needed = larger sample. Higher confidence, lower tolerable error, and higher expected error all increase sample size.',
    topic: 'Statistical Sampling',
    subtopic: 'Sample Size Factors',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-samp-003',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Monetary Unit Sampling (MUS) is most appropriate for which audit objective?',
    options: [
      'Detecting understatement errors in accounts payable',
      'Testing controls over invoice approval',
      'Testing segregation of duties',
      'Detecting overstatement errors in accounts receivable',
    ],
    correctAnswer: 3,
    explanation: 'MUS (also called PPS - Probability Proportional to Size) is most effective for detecting overstatement errors because larger dollar items have a higher probability of selection. It is less effective for detecting understatements since smaller/zero items have little chance of being selected.',
    topic: 'Statistical Sampling',
    subtopic: 'Monetary Unit Sampling',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-samp-004',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Attribute sampling is most appropriate for testing:',
    options: [
      'The valuation of investments',
      'Compliance with authorization procedures',
      'The dollar amount of inventory',
      'The accuracy of account balances',
    ],
    correctAnswer: 1,
    explanation: 'Attribute sampling tests yes/no characteristics (compliance/controls). It is used to test whether transactions have required approvals, signatures, or documentation. Variables sampling is used for dollar amounts and balances.',
    topic: 'Statistical Sampling',
    subtopic: 'Sampling Types',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-samp-005',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'An auditor selects a sample of 100 items and finds 3 exceptions. The tolerable error rate is 5%, and the precision adjustment from statistical tables is 1.5%. What is the appropriate conclusion?',
    options: [
      'More testing is needed because the sample size is too small',
      'The control is effective because 3% is less than 5%',
      'The control is ineffective because 3% exceeds the expected rate',
      'The control is effective because 4.5% is less than 5%',
    ],
    correctAnswer: 3,
    explanation: 'Upper deviation limit = Sample rate + Precision adjustment = 3% + 1.5% = 4.5%. Since the upper limit (4.5%) is less than the tolerable rate (5%), the auditor can conclude the control is effective at the stated confidence level.',
    topic: 'Statistical Sampling',
    subtopic: 'Evaluating Results',
  reference: 'IIA Standards'
  },

  // ============================================================================
  // IFRS vs US GAAP (CIA Part 3)
  // ============================================================================
  {
    id: 'cia3-gaap-001',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Under IFRS, which inventory costing method is prohibited?',
    options: [
      'Weighted average',
      'Specific identification',
      'LIFO (Last-in, First-out)',
      'FIFO (First-in, First-out)',
    ],
    correctAnswer: 2,
    explanation: 'LIFO (Last-in, First-out) is prohibited under IFRS but permitted under US GAAP. This is one of the most significant differences between the two frameworks. IFRS only permits FIFO, weighted average, and specific identification.',
    topic: 'IFRS vs GAAP',
    subtopic: 'Inventory',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-gaap-002',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A company writes down inventory due to a decline in net realizable value. In a subsequent period, the value recovers. Under which framework is reversal of the write-down required?',
    options: [
      'Neither US GAAP nor IFRS',
      'Both US GAAP and IFRS',
      'IFRS only',
      'US GAAP only',
    ],
    correctAnswer: 2,
    explanation: 'Under IFRS, reversal of inventory write-downs is REQUIRED if the value subsequently recovers (up to original cost). Under US GAAP, reversal of inventory write-downs is PROHIBITED - the written-down value becomes the new cost basis.',
    topic: 'IFRS vs GAAP',
    subtopic: 'Inventory',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-gaap-003',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which statement about fixed asset revaluation is correct?',
    options: [
      'US GAAP permits upward revaluation; IFRS does not',
      'IFRS permits upward revaluation; US GAAP does not',
      'Neither IFRS nor US GAAP permit upward revaluation',
      'Both IFRS and US GAAP permit upward revaluation',
    ],
    correctAnswer: 1,
    explanation: 'IFRS permits the revaluation model, which allows upward revaluation of fixed assets to fair value. US GAAP uses the cost model and does not permit upward revaluation of fixed assets (with limited exceptions for certain hedged items).',
    topic: 'IFRS vs GAAP',
    subtopic: 'Fixed Assets',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-gaap-004',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Under IFRS, how should development costs be treated if specific criteria are met?',
    options: [
      'Capitalized as an intangible asset',
      'Deferred and amortized over the contract period',
      'Recorded as a reduction of revenue',
      'Expensed as incurred',
    ],
    correctAnswer: 0,
    explanation: 'Under IFRS (IAS 38), development costs must be capitalized as an intangible asset if specific criteria are met (technical feasibility, intention to complete, ability to use/sell, probable future economic benefits, resources available, reliable measurement). Under US GAAP, most research and development costs are expensed as incurred.',
    topic: 'IFRS vs GAAP',
    subtopic: 'Intangibles',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-gaap-005',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which characteristic best distinguishes IFRS from US GAAP?',
    options: [
      'IFRS is more principles-based',
      'IFRS requires more disclosures',
      'IFRS has more industry-specific guidance',
      'IFRS is more rules-based',
    ],
    correctAnswer: 0,
    explanation: 'IFRS is characterized as principles-based, emphasizing professional judgment and the economic substance of transactions. US GAAP is more rules-based, providing detailed guidance and bright-line tests. This fundamental philosophical difference affects how standards are applied.',
    topic: 'IFRS vs GAAP',
    subtopic: 'Framework Comparison',
  reference: 'IIA Standards'
  },
];

export default CIA_MISSING_TOPICS_QUESTIONS;

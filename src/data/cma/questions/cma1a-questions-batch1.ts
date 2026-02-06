/**
 * CMA Part 1, Section A: External Financial Reporting - Questions Batch 1 (Q1-25)
 * Weight: 20% of Part 1 Exam
 * 
 * Blueprint Areas:
 * - CMA1-A: External Financial Reporting Decisions
 * 
 * Topics covered:
 * - Financial Statements
 * - Statement of Financial Position
 * - Income Statement
 * - Statement of Cash Flows
 * - Statement of Changes in Equity
 * - Footnotes and Disclosures
 * - Revenue Recognition
 * - Inventory Valuation
 */

import { Question } from '../../../types';

export const CMA1A_QUESTIONS_BATCH1: Question[] = [
  // ==========================================
  // Financial Statements Overview
  // ==========================================
  {
    id: 'cma1-a-001',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Financial Statements',
    subtopic: 'Purpose and Users',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Which of the following is the PRIMARY purpose of external financial reporting?',
    options: [
      'To help management make operating decisions',
      'To provide information useful for investment and credit decisions',
      'To calculate taxes owed to the government',
      'To evaluate employee performance'
    ],
    correctAnswer: 1,
    explanation: 'The primary purpose of external financial reporting is to provide information useful for making investment and credit decisions by external users such as investors, creditors, and analysts. Management decision-making is the focus of managerial accounting.',
    reference: 'FASB Conceptual Framework; IMA CMA Content Specification',
  },
  {
    id: 'cma1-a-002',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Financial Statements',
    subtopic: 'Qualitative Characteristics',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Relevance and faithful representation are the two fundamental qualitative characteristics of useful financial information. Which of the following is an enhancing qualitative characteristic?',
    options: [
      'Materiality',
      'Neutrality',
      'Comparability',
      'Completeness'
    ],
    correctAnswer: 2,
    explanation: 'Comparability is one of the four enhancing qualitative characteristics (along with verifiability, timeliness, and understandability). Materiality is related to relevance, while neutrality and completeness are components of faithful representation.',
    reference: 'FASB Conceptual Framework',
  },
  {
    id: 'cma1-a-003',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Financial Statements',
    subtopic: 'Recognition Criteria',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An item should be recognized in the financial statements when:',
    options: [
      'It meets the definition of an element and cash is received',
      'Management believes it is important to disclose',
      'It meets the definition of an element and can be measured reliably',
      'External auditors approve its recognition'
    ],
    correctAnswer: 2,
    explanation: 'Recognition requires that an item (1) meets the definition of a financial statement element (asset, liability, equity, income, or expense) AND (2) can be measured with sufficient reliability. Cash receipt is not required (accrual accounting).',
    reference: 'FASB Conceptual Framework',
  },

  // ==========================================
  // Statement of Financial Position (Balance Sheet)
  // ==========================================
  {
    id: 'cma1-a-004',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Balance Sheet',
    subtopic: 'Current vs Non-current',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A current asset is expected to be converted to cash or used within:',
    options: [
      'Six months',
      'One year or the operating cycle, whichever is longer',
      'One year only',
      'The fiscal year in which it was acquired'
    ],
    correctAnswer: 1,
    explanation: 'Current assets are expected to be converted to cash, sold, or consumed within one year OR within the operating cycle, whichever is longer. For most companies, the operating cycle is less than one year, but some industries (like construction) have longer cycles.',
    reference: 'ASC 210; IMA Learning Outcome Statement',
  },
  {
    id: 'cma1-a-005',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Balance Sheet',
    subtopic: 'Working Capital',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Alpha Company has current assets of $500,000 and current liabilities of $300,000. What is Alpha\'s working capital?',
    options: [
      '$200,000',
      '$800,000',
      '$300,000',
      '1.67'
    ],
    correctAnswer: 0,
    explanation: 'Working capital = Current Assets - Current Liabilities = $500,000 - $300,000 = $200,000. The ratio of 1.67 would be the current ratio (CA/CL), not working capital.',
    reference: 'Financial Statement Analysis',
  },
  {
    id: 'cma1-a-006',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Balance Sheet',
    subtopic: 'Intangible Assets',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which of the following intangible assets is NOT amortized under U.S. GAAP?',
    options: [
      'Patent',
      'Copyright',
      'Goodwill',
      'Franchise with a definite life'
    ],
    correctAnswer: 2,
    explanation: 'Under U.S. GAAP, goodwill is not amortized but is instead tested for impairment at least annually. Intangible assets with definite useful lives (patents, copyrights, franchises with definite lives) are amortized over their useful lives.',
    reference: 'ASC 350 - Intangibles-Goodwill and Other',
  },
  {
    id: 'cma1-a-007',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Balance Sheet',
    subtopic: 'Contingent Liabilities',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A contingent liability should be accrued (recorded) when:',
    options: [
      'The outcome is only possible',
      'The outcome is probable and the amount can be reasonably estimated',
      'The outcome is remote',
      'Any lawsuit is filed against the company'
    ],
    correctAnswer: 1,
    explanation: 'Under ASC 450, a loss contingency should be accrued when (1) it is PROBABLE that a liability has been incurred and (2) the amount can be REASONABLY ESTIMATED. If only possible, disclosure is required. If remote, no action is needed.',
    reference: 'ASC 450 - Contingencies',
  },
  {
    id: 'cma1-a-008',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Balance Sheet',
    subtopic: 'Stockholders Equity',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Treasury stock is:',
    options: [
      'Stock that has been authorized but never issued',
      'Stock held by the U.S. Treasury Department',
      'A company\'s own stock that has been repurchased and not retired',
      'Stock that has been retired by the company'
    ],
    correctAnswer: 2,
    explanation: 'Treasury stock is a company\'s own stock that has been issued to shareholders, then repurchased by the company, and is being held for future use or retirement. It is a contra-equity account that reduces total stockholders\' equity.',
    reference: 'ASC 505 - Equity',
  },

  // ==========================================
  // Income Statement
  // ==========================================
  {
    id: 'cma1-a-009',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Income Statement',
    subtopic: 'Single-Step vs Multi-Step',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Which subtotal appears on a multi-step income statement but NOT on a single-step income statement?',
    options: [
      'Net income',
      'Gross profit',
      'Total expenses',
      'Income tax expense'
    ],
    correctAnswer: 1,
    explanation: 'Gross profit (Revenue - Cost of Goods Sold) is a key subtotal on a multi-step income statement. A single-step income statement simply groups all revenues together and all expenses together, showing only net income as a subtotal.',
    reference: 'Financial Statement Presentation',
  },
  {
    id: 'cma1-a-010',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Income Statement',
    subtopic: 'Operating vs Non-operating',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Interest expense is classified on the income statement as:',
    options: [
      'Operating expense for all companies',
      'Non-operating expense for all companies',
      'Operating expense for financial services companies, non-operating for others',
      'Always included in cost of goods sold'
    ],
    correctAnswer: 2,
    explanation: 'Interest expense is typically classified as a non-operating expense because it relates to financing decisions, not operations. However, for financial services companies (banks, insurance), interest is part of core operations and is classified as operating.',
    reference: 'ASC 220; Financial Statement Classification',
  },
  {
    id: 'cma1-a-011',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Income Statement',
    subtopic: 'Discontinued Operations',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A component of an entity qualifies for discontinued operations treatment when it:',
    options: [
      'Generates losses for three consecutive years',
      'Represents a strategic shift that has a major effect on operations and financial results',
      'Comprises less than 5% of total revenue',
      'Is sold at a loss'
    ],
    correctAnswer: 1,
    explanation: 'Under ASC 205-20, discontinued operations must represent a strategic shift that has (or will have) a major effect on an entity\'s operations and financial results. Examples include disposal of a major geographic area, line of business, or major equity method investment.',
    reference: 'ASC 205-20 - Discontinued Operations',
  },
  {
    id: 'cma1-a-012',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Income Statement',
    subtopic: 'EPS',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Beta Corporation has net income of $1,000,000, preferred dividends of $100,000, and 200,000 weighted-average common shares outstanding. What is basic EPS?',
    options: [
      '$5.00',
      '$4.50',
      '$5.50',
      '$4.00'
    ],
    correctAnswer: 1,
    explanation: 'Basic EPS = (Net Income - Preferred Dividends) / Weighted-Average Common Shares = ($1,000,000 - $100,000) / 200,000 = $900,000 / 200,000 = $4.50 per share.',
    reference: 'ASC 260 - Earnings Per Share',
  },

  // ==========================================
  // Statement of Cash Flows
  // ==========================================
  {
    id: 'cma1-a-013',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Statement of Cash Flows',
    subtopic: 'Classification',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Under U.S. GAAP, interest paid is classified as a cash flow from:',
    options: [
      'Operating activities',
      'Investing activities',
      'Financing activities',
      'Either operating or financing, at management\'s discretion'
    ],
    correctAnswer: 0,
    explanation: 'Under U.S. GAAP, interest paid is classified as an OPERATING activity (not financing). This is a common exam trap! Under IFRS, companies have a choice between operating and financing for interest paid.',
    reference: 'ASC 230 - Statement of Cash Flows',
  },
  {
    id: 'cma1-a-014',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Statement of Cash Flows',
    subtopic: 'Classification',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which of the following is classified as an INVESTING activity?',
    options: [
      'Payment of cash dividends',
      'Issuance of common stock',
      'Purchase of equipment',
      'Principal payment on bonds payable'
    ],
    correctAnswer: 2,
    explanation: 'Purchase of equipment is an investing activity. Dividends paid (A), stock issuance (B), and bond principal payments (D) are all FINANCING activities. Investing activities involve buying/selling long-term assets.',
    reference: 'ASC 230 - Statement of Cash Flows',
  },
  {
    id: 'cma1-a-015',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Statement of Cash Flows',
    subtopic: 'Direct vs Indirect Method',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When using the indirect method to prepare the operating activities section, depreciation expense is:',
    options: [
      'Subtracted from net income',
      'Added back to net income',
      'Not included in the calculation',
      'Reported as an investing activity'
    ],
    correctAnswer: 1,
    explanation: 'Depreciation is added back to net income under the indirect method because it is a non-cash expense that reduced net income. Adding it back converts accrual net income toward cash flow from operations.',
    reference: 'ASC 230 - Statement of Cash Flows',
  },
  {
    id: 'cma1-a-016',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Statement of Cash Flows',
    subtopic: 'Indirect Method Adjustments',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Under the indirect method, an increase in accounts receivable is:',
    options: [
      'Added to net income',
      'Subtracted from net income',
      'Reported as a financing activity',
      'Not adjusted for'
    ],
    correctAnswer: 1,
    explanation: 'An increase in accounts receivable means the company earned revenue (included in net income) but did not collect the cash. This is subtracted from net income to arrive at cash from operations. (Think: AR increase = cash NOT collected yet)',
    reference: 'ASC 230 - Statement of Cash Flows',
  },
  {
    id: 'cma1-a-017',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Statement of Cash Flows',
    subtopic: 'Free Cash Flow',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Free cash flow is most commonly calculated as:',
    options: [
      'Net income minus depreciation',
      'Cash from operating activities minus capital expenditures',
      'Cash from all activities combined',
      'Operating income minus taxes'
    ],
    correctAnswer: 1,
    explanation: 'Free cash flow = Cash from Operating Activities - Capital Expenditures. This represents cash available for debt repayment, dividends, share repurchases, or strategic investments after maintaining/expanding the asset base.',
    reference: 'Financial Analysis; IMA CMA Content',
  },

  // ==========================================
  // Revenue Recognition
  // ==========================================
  {
    id: 'cma1-a-018',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Revenue Recognition',
    subtopic: 'Five-Step Model',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Under ASC 606, what is the FIRST step in the revenue recognition model?',
    options: [
      'Determine the transaction price',
      'Identify the contract with a customer',
      'Identify the performance obligations',
      'Allocate the transaction price'
    ],
    correctAnswer: 1,
    explanation: 'The five steps in order are: (1) Identify the contract, (2) Identify performance obligations, (3) Determine transaction price, (4) Allocate price to obligations, (5) Recognize revenue when obligations are satisfied.',
    reference: 'ASC 606 - Revenue from Contracts with Customers',
  },
  {
    id: 'cma1-a-019',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Revenue Recognition',
    subtopic: 'Performance Obligations',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A performance obligation is satisfied over time if:',
    options: [
      'The contract extends for more than one year',
      'The customer receives and consumes benefits as the entity performs',
      'Cash is collected over multiple periods',
      'The seller is a service company'
    ],
    correctAnswer: 1,
    explanation: 'A performance obligation is satisfied over time when the customer simultaneously receives and consumes the benefits as the entity performs (e.g., cleaning services), or when the seller\'s performance creates an asset the customer controls, or when there is no alternative use and the seller has right to payment.',
    reference: 'ASC 606 - Revenue from Contracts with Customers',
  },
  {
    id: 'cma1-a-020',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Revenue Recognition',
    subtopic: 'Variable Consideration',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When estimating variable consideration (such as a performance bonus), ASC 606 requires the use of:',
    options: [
      'The most likely amount only',
      'The expected value only',
      'Either the expected value or most likely amount, whichever better predicts the outcome',
      'The maximum amount possible'
    ],
    correctAnswer: 2,
    explanation: 'ASC 606 allows either the expected value method (probability-weighted average) or the most likely amount method. The entity should use whichever method better predicts the amount of consideration it will be entitled to receive.',
    reference: 'ASC 606 - Revenue from Contracts with Customers',
  },

  // ==========================================
  // Inventory Valuation
  // ==========================================
  {
    id: 'cma1-a-021',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Inventory',
    subtopic: 'Cost Flow Assumptions',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Which inventory cost flow assumption is NOT permitted under U.S. GAAP?',
    options: [
      'FIFO (First-In, First-Out)',
      'LIFO (Last-In, First-Out)',
      'Weighted-average cost',
      'All of the above are permitted under U.S. GAAP'
    ],
    correctAnswer: 3,
    explanation: 'U.S. GAAP permits FIFO, LIFO, weighted-average, and specific identification. Note: LIFO is NOT permitted under IFRS, but this question asks about U.S. GAAP, where all are allowed.',
    reference: 'ASC 330 - Inventory',
  },
  {
    id: 'cma1-a-022',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Inventory',
    subtopic: 'LIFO vs FIFO',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'In a period of rising prices, which inventory method results in the HIGHEST cost of goods sold?',
    options: [
      'FIFO',
      'LIFO',
      'Weighted-average',
      'Specific identification'
    ],
    correctAnswer: 1,
    explanation: 'When prices are rising, LIFO (Last-In, First-Out) assigns the most recent (higher) costs to cost of goods sold, resulting in higher COGS and lower net income. FIFO would result in the lowest COGS.',
    reference: 'ASC 330 - Inventory',
  },
  {
    id: 'cma1-a-023',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Inventory',
    subtopic: 'Lower of Cost or NRV',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Under U.S. GAAP, inventory should be written down when:',
    options: [
      'Selling price increases above cost',
      'Net realizable value falls below cost',
      'The inventory has been held for more than one year',
      'Management believes inventory is obsolete'
    ],
    correctAnswer: 1,
    explanation: 'Under ASC 330, inventory should be measured at the lower of cost or net realizable value (NRV). NRV = Estimated selling price minus estimated costs of completion and selling. A write-down is recorded when NRV < Cost.',
    reference: 'ASC 330 - Inventory',
  },
  {
    id: 'cma1-a-024',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Inventory',
    subtopic: 'Periodic vs Perpetual',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Under a perpetual inventory system:',
    options: [
      'Inventory is counted only at year-end',
      'Cost of goods sold is calculated only at year-end',
      'The inventory account is updated continuously for purchases and sales',
      'Physical counts are never required'
    ],
    correctAnswer: 2,
    explanation: 'A perpetual inventory system updates the inventory and COGS accounts continuously as purchases and sales occur. Under a periodic system, these calculations occur only at period-end. Physical counts are still needed periodically to verify accuracy.',
    reference: 'ASC 330 - Inventory; Management Accounting',
  },

  // ==========================================
  // Footnotes and Disclosures
  // ==========================================
  {
    id: 'cma1-a-025',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Footnotes',
    subtopic: 'Required Disclosures',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Which of the following is typically disclosed in the notes to financial statements?',
    options: [
      'Only the balance sheet and income statement',
      'Accounting policies, contingencies, and subsequent events',
      'Only information that management chooses to share',
      'Tax return information'
    ],
    correctAnswer: 1,
    explanation: 'Notes to financial statements include significant accounting policies, contingencies, commitments, related party transactions, subsequent events, and other information necessary for users to understand the financial statements.',
    reference: 'ASC 235 - Notes to Financial Statements',
  },
];

// Helper functions
export const getCMA1AQuestionsBatch1 = () => CMA1A_QUESTIONS_BATCH1;
export const getCMA1AQuestionCount = () => CMA1A_QUESTIONS_BATCH1.length;

export default CMA1A_QUESTIONS_BATCH1;

/**
 * EA SEE Part 2: Businesses - Questions Batch 1 (Q1-10)
 * 
 * Blueprint Areas:
 * - SEE2-1: Business Entities (10-15%)
 * - SEE2-2: Business Financial Information (15-20%)
 * - SEE2-3: Business Income and Expenses (20-25%)
 * - SEE2-4: Sole Proprietorships (10-15%)
 * - SEE2-5: Partnerships (15-20%)
 * - SEE2-6: C Corporations (15-20%)
 * - SEE2-7: S Corporations (15-20%)
 * - SEE2-8: Specialized Industries and Entities (5-10%)
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH1: Question[] = [
  // ==========================================
  // SEE2-1: Business Entities
  // ==========================================
  {
    id: 'see2-001',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-1',
    topic: 'Entity Selection',
    subtopic: 'Business Entity Types',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Which business entity provides limited liability protection to its owners while allowing pass-through taxation?',
    options: [
      'S Corporation',
      'Sole proprietorship',
      'General partnership',
      'C Corporation',
    ],
    correctAnswer: 0,
    explanation: 'S Corporations provide limited liability protection (like C corporations) while allowing income and losses to pass through to shareholders (avoiding double taxation). Sole proprietorships and general partnerships do not provide limited liability.',
    reference: 'IRC §1361-1379',
  },
  {
    id: 'see2-002',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-1',
    topic: 'Entity Selection',
    subtopic: 'LLC Taxation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'By default, a single-member LLC is taxed as a:',
    options: [
      'C Corporation',
      'Disregarded entity (sole proprietorship)',
      'S Corporation',
      'Partnership',
    ],
    correctAnswer: 1,
    explanation: 'A single-member LLC is a disregarded entity by default and is taxed as a sole proprietorship. The owner reports income and expenses on Schedule C. The LLC can elect to be taxed as a corporation if desired.',
    reference: 'Treas. Reg. §301.7701-3',
  },
  {
    id: 'see2-003',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-1',
    topic: 'Entity Selection',
    subtopic: 'Multi-Member LLC',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A multi-member LLC is taxed by default as a:',
    options: [
      'C Corporation',
      'S Corporation',
      'Disregarded entity',
      'Partnership',
    ],
    correctAnswer: 3,
    explanation: 'A multi-member LLC is classified as a partnership by default for federal tax purposes. It files Form 1065 and issues Schedule K-1 to members. The LLC can elect corporate taxation if desired.',
    reference: 'Treas. Reg. §301.7701-3',
  },

  // ==========================================
  // SEE2-2: Business Financial Information
  // ==========================================
  {
    id: 'see2-004',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Accounting Methods',
    subtopic: 'Cash vs. Accrual',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Under the cash method of accounting, income is recognized when:',
    options: [
      'Actually or constructively received',
      'Earned, regardless of when received',
      'The contract is signed',
      'Invoiced to the customer',
    ],
    correctAnswer: 0,
    explanation: 'Under the cash method, income is recognized when actually or constructively received, and expenses are deducted when paid. This differs from the accrual method where income is recognized when earned.',
    reference: 'IRC §446; IRS Publication 538',
  },
  {
    id: 'see2-005',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Accounting Methods',
    subtopic: 'Accrual Method',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Under the accrual method, an expense is deductible when:',
    options: [
      'All events have occurred that fix the liability and the amount can be determined with reasonable accuracy',
      'Paid in cash',
      'The check is written',
      'The invoice is received',
    ],
    correctAnswer: 0,
    explanation: 'Under the accrual method, expenses are deductible when the "all events test" is met: all events have occurred to establish the liability, the amount can be determined with reasonable accuracy, and economic performance has occurred.',
    reference: 'IRC §461; Treas. Reg. §1.461-1',
  },
  {
    id: 'see2-006',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Accounting Methods',
    subtopic: 'Gross Receipts Test',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Under current law, a business may use the cash method of accounting if average annual gross receipts for the prior 3 years do not exceed:',
    options: [
      '$30 million (adjusted for inflation)',
      '$10 million',
      '$5 million',
      '$25 million (adjusted for inflation)',
    ],
    correctAnswer: 0,
    explanation: 'The Tax Cuts and Jobs Act increased the gross receipts threshold to $25 million (indexed for inflation, approximately $30 million for 2025). Businesses meeting this test can use the cash method regardless of inventory or C corporation status.',
    reference: 'IRC §448(c); TCJA',
  },

  // ==========================================
  // SEE2-3: Business Income and Expenses
  // ==========================================
  {
    id: 'see2-007',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Depreciation',
    subtopic: 'Section 179 Expensing',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'For 2025, the maximum Section 179 deduction is approximately:',
    options: [
      '$1,220,000',
      '$1,000,000',
      '$500,000',
      '$1,160,000',
    ],
    correctAnswer: 0,
    explanation: 'For 2025, the Section 179 expensing limit is approximately $1,220,000 (adjusted for inflation). This allows businesses to immediately expense qualifying property rather than depreciating it over time.',
    reference: 'IRC §179; Rev. Proc. 2024-40',
  },
  {
    id: 'see2-008',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Depreciation',
    subtopic: 'Bonus Depreciation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'For property placed in service in 2025, the bonus depreciation percentage is:',
    options: [
      '40%',
      '100%',
      '80%',
      '60%',
    ],
    correctAnswer: 0,
    explanation: 'Bonus depreciation phases down from 100% (2022) by 20% annually. For 2025, the rate is 40% (100% minus 20% for each year: 80% in 2023, 60% in 2024, 40% in 2025).',
    reference: 'IRC §168(k)',
  },
  {
    id: 'see2-009',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Business Expenses',
    subtopic: 'Startup Costs',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A new business can immediately deduct startup costs up to:',
    options: [
      '$50,000',
      '$1,000',
      '$5,000',
      '$10,000',
    ],
    correctAnswer: 2,
    explanation: 'A new business can deduct up to $5,000 of startup costs in the year the business begins. The $5,000 is reduced by the amount startup costs exceed $50,000. Remaining costs are amortized over 180 months.',
    reference: 'IRC §195',
  },
  {
    id: 'see2-010',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Business Expenses',
    subtopic: 'Meals Deduction',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A self-employed consultant took three clients to dinner at a restaurant in 2024. The total bill was $480, and the consultant discussed business during the meal. Under current tax law, what amount can the consultant deduct as a business meal expense?',
    options: [
      '$240',
      '$480',
      '$0',
      '$360',
    ],
    correctAnswer: 0,
    explanation: 'Business meals at restaurants are 50% deductible under IRC §274 when directly related to or associated with the active conduct of business. The deduction is 50% × $480 = $240. The temporary 100% deduction for restaurant meals (2021-2022 under the Consolidated Appropriations Act) has expired, reverting to the standard 50% limitation for 2023 and beyond.',
    reference: 'IRC §274(n); IRS Publication 463',
  },
];

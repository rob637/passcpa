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
      'Sole proprietorship',
      'General partnership',
      'C Corporation',
      'S Corporation'
    ],
    correctAnswer: 3,
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
      'S Corporation',
      'Partnership',
      'Disregarded entity (sole proprietorship)'
    ],
    correctAnswer: 3,
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
      'Partnership',
      'Disregarded entity'
    ],
    correctAnswer: 2,
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
      'Earned, regardless of when received',
      'Actually or constructively received',
      'Invoiced to the customer',
      'The contract is signed'
    ],
    correctAnswer: 1,
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
      'Paid in cash',
      'All events have occurred that fix the liability and the amount can be determined with reasonable accuracy',
      'The invoice is received',
      'The check is written'
    ],
    correctAnswer: 1,
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
      '$5 million',
      '$10 million',
      '$25 million (adjusted for inflation)',
      '$30 million (adjusted for inflation)'
    ],
    correctAnswer: 3,
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
      '$500,000',
      '$1,000,000',
      '$1,160,000',
      '$1,220,000'
    ],
    correctAnswer: 3,
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
      '100%',
      '80%',
      '60%',
      '40%'
    ],
    correctAnswer: 3,
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
      '$1,000',
      '$5,000',
      '$10,000',
      '$50,000'
    ],
    correctAnswer: 1,
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
    question: 'Business meals are generally deductible at:',
    options: [
      '100%',
      '80%',
      '50%',
      '0% - not deductible'
    ],
    correctAnswer: 2,
    explanation: 'Business meals are generally 50% deductible. The meal must be directly related to or associated with the active conduct of business, and the taxpayer or an employee must be present.',
    reference: 'IRC §274(n); IRS Publication 463',
  },
];

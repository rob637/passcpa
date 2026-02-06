/**
 * EA SEE Part 2: Businesses - Questions Batch 49 (Q481-490)
 * Related Party Transactions and Special Rules
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH49: Question[] = [
  // ==========================================
  // SEE2-3: Related Party Rules
  // ==========================================
  {
    id: 'see2-481',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Related Party Rules',
    subtopic: 'Section 267 Relationships',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Under IRC §267, related parties include:',
    options: [
      'Only parent and child',
      'Family members (siblings, spouse, ancestors, lineal descendants) and related entities',
      'Business associates only',
      'Former spouses after divorce'
    ],
    correctAnswer: 1,
    explanation: 'Section 267 defines related parties to include family (spouse, siblings, ancestors, lineal descendants) and various entity relationships (>50% owned corporations, partnerships, trusts, etc.).',
    reference: 'IRC §267(b)',
  },
  {
    id: 'see2-482',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Related Party Rules',
    subtopic: 'Loss Disallowance',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A taxpayer sells stock with a $30,000 basis to their brother for $20,000. The tax treatment is:',
    options: [
      '$10,000 loss is deductible',
      'The $10,000 loss is disallowed under §267',
      'The loss carries forward',
      'The loss is capital only'
    ],
    correctAnswer: 1,
    explanation: 'Losses on sales between related parties (including siblings) are disallowed under §267. The brother may be able to use the disallowed loss to reduce gain on a subsequent sale to an unrelated party.',
    reference: 'IRC §267(a)(1)',
  },
  {
    id: 'see2-483',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Related Party Rules',
    subtopic: 'Matching Rule',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Under Section 267\'s matching rule for accrual-method payers:',
    options: [
      'Deductions can be taken when accrued',
      'Deductions to related cash-method payees are deferred until the payee includes the income',
      'No matching is required',
      'Both parties must use accrual method'
    ],
    correctAnswer: 1,
    explanation: 'Under the §267 matching rule, an accrual-method taxpayer cannot deduct expenses owed to a related cash-method taxpayer until the payee includes the amount in income.',
    reference: 'IRC §267(a)(2)',
  },
  {
    id: 'see2-484',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Related Party Rules',
    subtopic: 'Constructive Ownership',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Constructive ownership rules attribute stock ownership from:',
    options: [
      'Only direct ownership',
      'Family members, partnerships, corporations, trusts, and estates',
      'Former employers',
      'Creditors'
    ],
    correctAnswer: 1,
    explanation: 'Constructive ownership rules (§267(c), §318) attribute stock between family members, from/to entities in which the taxpayer has an interest, creating broader related party relationships.',
    reference: 'IRC §267(c); IRC §318',
  },
  {
    id: 'see2-485',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Related Party Rules',
    subtopic: 'Section 1239',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Under Section 1239, gain on sale of depreciable property to a related party is:',
    options: [
      'Capital gain',
      'Ordinary income',
      'Tax-exempt',
      'Deferred'
    ],
    correctAnswer: 1,
    explanation: 'Section 1239 converts what would be capital gain into ordinary income when depreciable property is sold between related parties (>50% ownership). This prevents basis step-up combined with depreciation deductions.',
    reference: 'IRC §1239',
  },
  {
    id: 'see2-486',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Related Party Rules',
    subtopic: 'Section 707(b)',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Under Section 707(b), losses between a partner and a partnership in which they own more than 50% are:',
    options: [
      'Fully deductible',
      'Disallowed',
      'Treated as capital losses',
      'Deferred until partnership terminates'
    ],
    correctAnswer: 1,
    explanation: 'Section 707(b) disallows losses on sales between a partnership and a person who directly or indirectly owns more than 50% of the partnership\'s capital or profits interest.',
    reference: 'IRC §707(b)(1)',
  },
  {
    id: 'see2-487',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Related Party Rules',
    subtopic: 'Section 482',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Section 482 gives the IRS authority to:',
    options: [
      'Adjust tax year elections',
      'Reallocate income and deductions among related entities to clearly reflect income',
      'Eliminate all related party transactions',
      'Assess penalties automatically'
    ],
    correctAnswer: 1,
    explanation: 'Section 482 allows the IRS to allocate income, deductions, credits, or allowances among commonly controlled businesses to prevent manipulation and clearly reflect each entity\'s income.',
    reference: 'IRC §482',
  },
  {
    id: 'see2-488',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Related Party Rules',
    subtopic: 'Below-Market Loans',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Under IRC §7872, below-market loans between related parties may result in:',
    options: [
      'No tax consequences',
      'Imputed interest income to lender and possible gift/compensation to borrower',
      'Double taxation of interest',
      'Loan forgiveness'
    ],
    correctAnswer: 1,
    explanation: 'Section 7872 imputes interest on below-market loans. The lender is treated as receiving interest income, and the foregone interest is treated as transferred to the borrower (as gift, compensation, or dividend depending on relationship).',
    reference: 'IRC §7872',
  },
  {
    id: 'see2-489',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Related Party Rules',
    subtopic: 'De Minimis Exception',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The de minimis exception to imputed interest rules applies to loans:',
    options: [
      'Of any amount between family members',
      'Of $10,000 or less between individuals (with exceptions)',
      'Only to corporations',
      'Over $100,000 only'
    ],
    correctAnswer: 1,
    explanation: 'Loans of $10,000 or less between individuals may avoid imputed interest rules under the de minimis exception, unless the loan is made to purchase income-producing assets.',
    reference: 'IRC §7872(c)(2)',
  },
  {
    id: 'see2-490',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Related Party Rules',
    subtopic: 'Applicable Federal Rate',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The Applicable Federal Rate (AFR) used for testing below-market loans is:',
    options: [
      'A fixed 5% rate',
      'Published monthly by the IRS based on short-term, mid-term, and long-term rates',
      'The prime rate',
      'Set by the taxpayer'
    ],
    correctAnswer: 1,
    explanation: 'The IRS publishes AFRs monthly based on Treasury borrowing rates. Short-term (≤3 years), mid-term (3-9 years), and long-term (>9 years) rates are used depending on loan term.',
    reference: 'IRC §1274(d); IRC §7872',
  },
];

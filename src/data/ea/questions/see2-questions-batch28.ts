/**
 * EA SEE Part 2: Businesses - Questions Batch 28 (Q271-280)
 * Business Income and Exclusions
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH28: Question[] = [
  // ==========================================
  // SEE2-2: Business Income
  // ==========================================
  {
    id: 'see2-271',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Business Income',
    subtopic: 'Gross Receipts',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'For tax purposes, gross receipts generally include:',
    options: [
      'Only amounts received in cash',
      'Total amounts received from sales of goods, services, and other income items',
      'Net income after deductions',
      'Only receipts exceeding $25,000'
    ],
    correctAnswer: 1,
    explanation: 'Gross receipts include all amounts received from sales, services, rents, royalties, and other income sources before any deductions. They form the starting point for calculating taxable income.',
    reference: 'IRC §61',
  },
  {
    id: 'see2-272',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Business Income',
    subtopic: 'Returns and Allowances',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A business has gross sales of $500,000 and customer returns of $25,000. Net sales for tax purposes is:',
    options: [
      '$500,000',
      '$475,000',
      '$525,000',
      '$450,000'
    ],
    correctAnswer: 1,
    explanation: 'Net sales equals gross sales minus returns and allowances. Here: $500,000 - $25,000 = $475,000. Returns and allowances reduce gross sales to arrive at net sales.',
    reference: 'Treas. Reg. §1.61-3',
  },
  {
    id: 'see2-273',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Business Income',
    subtopic: 'Advance Payments',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Under IRC §451(c), an accrual method taxpayer receiving advance payment for services may:',
    options: [
      'Recognize all income in the year received',
      'Defer recognition to the extent earned in the following tax year (1-year deferral)',
      'Spread recognition over the service period regardless of length',
      'Exclude advance payments from income'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §451(c), taxpayers may defer recognizing advance payments for goods/services to the extent revenue is deferred for financial statement purposes, but not beyond the end of the next tax year (1-year deferral rule).',
    reference: 'IRC §451(c)',
  },
  {
    id: 'see2-274',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Business Income',
    subtopic: 'Installment Sales',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A business sells property for $100,000 with a basis of $60,000, receiving $20,000 down and $80,000 in future payments. Gross profit percentage is:',
    options: [
      '20%',
      '40%',
      '60%',
      '80%'
    ],
    correctAnswer: 1,
    explanation: 'Gross profit percentage = Gross Profit / Contract Price = ($100,000 - $60,000) / $100,000 = $40,000 / $100,000 = 40%. Each payment is 40% gain, 60% return of basis.',
    reference: 'IRC §453',
  },
  {
    id: 'see2-275',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Business Income',
    subtopic: 'Like-Kind Exchanges',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Under IRC §1031, like-kind exchange treatment applies to:',
    options: [
      'Personal property exchanges',
      'Real property held for productive use or investment (excluding inventory and personal residences)',
      'All property exchanges regardless of type',
      'Stock and securities'
    ],
    correctAnswer: 1,
    explanation: 'After TCJA, Section 1031 applies only to real property held for productive use in trade/business or investment. Personal property, inventory, stocks, bonds, and personal residences don\'t qualify.',
    reference: 'IRC §1031',
  },
  {
    id: 'see2-276',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Business Income',
    subtopic: 'Cancellation of Debt',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A business that is insolvent and has $100,000 of debt cancelled:',
    options: [
      'Must include $100,000 in income',
      'May exclude COD income to the extent of insolvency',
      'Can never exclude COD income',
      'Must report the income over 5 years'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §108(a), insolvent taxpayers may exclude COD income to the extent of insolvency. The exclusion reduces tax attributes (NOLs, credits, asset basis) under §108(b).',
    reference: 'IRC §108',
  },
  {
    id: 'see2-277',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Business Income',
    subtopic: 'Recovery of Expenses',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A business deducted $5,000 for a bad debt in Year 1, then recovers $3,000 of the debt in Year 2. If the deduction provided full tax benefit:',
    options: [
      'No income is recognized',
      '$3,000 is included in income in Year 2',
      '$5,000 is included in income in Year 2',
      'File an amended return for Year 1'
    ],
    correctAnswer: 1,
    explanation: 'Under the tax benefit rule (IRC §111), amounts recovered are included in income if the prior deduction provided a tax benefit. The $3,000 recovery is ordinary income in Year 2.',
    reference: 'IRC §111',
  },
  {
    id: 'see2-278',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Business Income',
    subtopic: 'Bartering',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A plumber provides $2,000 worth of services to an electrician in exchange for $2,000 of electrical work. Each must report:',
    options: [
      'Nothing - there was no cash exchange',
      '$2,000 gross income for the FMV of services received',
      '$4,000 gross income',
      'Only the difference if values are unequal'
    ],
    correctAnswer: 1,
    explanation: 'Bartering results in income equal to the FMV of property or services received. Each party must include $2,000 of gross income, even though no cash changed hands.',
    reference: 'Treas. Reg. §1.61-2(d)',
  },
  {
    id: 'see2-279',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Business Income',
    subtopic: 'Claim of Right',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Under the claim of right doctrine:',
    options: [
      'Income is recognized only when legal right is established',
      'A taxpayer must include amounts received under a claim of right, even if obligation to repay may arise',
      'Income is never recognized until litigation is complete',
      'Only applies to cash method taxpayers'
    ],
    correctAnswer: 1,
    explanation: 'Under the claim of right doctrine, a taxpayer who receives income under a claim of right must include it when received, even if there\'s a possibility of required repayment later. IRC §1341 provides relief if repayment occurs.',
    reference: 'North American Oil Consolidated v. Burnet; IRC §1341',
  },
  {
    id: 'see2-280',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Business Income',
    subtopic: 'Rental Income',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A landlord receives $3,000 security deposit that must be returned at lease end under state law. The $3,000 is:',
    options: [
      'Income when received',
      'Not income until applied to rent or retained',
      'Income when the lease ends',
      'Never taxable'
    ],
    correctAnswer: 1,
    explanation: 'A refundable security deposit is not income when received because there\'s an obligation to return it. It becomes income when the landlord keeps it for damages or unpaid rent.',
    reference: 'Commissioner v. Indianapolis Power & Light',
  },
];

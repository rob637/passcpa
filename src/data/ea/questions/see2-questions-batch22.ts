/**
 * EA SEE Part 2: Businesses - Questions Batch 22 (Q211-220)
 * Accounting Methods and Periods
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH22: Question[] = [
  // ==========================================
  // SEE2-2: Accounting Methods
  // ==========================================
  {
    id: 'see2-211',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Accounting Methods',
    subtopic: 'Cash Method',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Under the cash method of accounting, income is generally recognized when:',
    options: [
      'Earned through performance of services',
      'Actually or constructively received',
      'Billed to the customer',
      'The customer\'s payment is deposited in the bank'
    ],
    correctAnswer: 1,
    explanation: 'Under the cash method, income is recognized when actually received or constructively received (made available without restriction). Expenses are deducted when paid.',
    reference: 'Treas. Reg. §1.446-1(c)(1)(i)',
  },
  {
    id: 'see2-212',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Accounting Methods',
    subtopic: 'Cash Method Eligibility',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'After TCJA, a corporation can generally use the cash method of accounting if average annual gross receipts for the 3 prior years do not exceed:',
    options: [
      '$5 million',
      '$10 million',
      '$29 million (indexed)',
      '$50 million'
    ],
    correctAnswer: 2,
    explanation: 'Under IRC §448, the $25 million gross receipts test (indexed to ~$29-30 million for 2024) allows most businesses, including C corporations, to use the cash method if they meet this threshold.',
    reference: 'IRC §448(c)',
  },
  {
    id: 'see2-213',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Accounting Methods',
    subtopic: 'Accrual Method',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Under the accrual method, income is generally recognized when:',
    options: [
      'Cash is received',
      'All events have occurred to fix the right to receive and the amount can be determined with reasonable accuracy',
      'Services are substantially complete',
      'An invoice is issued'
    ],
    correctAnswer: 1,
    explanation: 'Under the accrual method, income is recognized when all events have occurred that fix the right to receive it (all-events test) and the amount can be determined with reasonable accuracy.',
    reference: 'Treas. Reg. §1.451-1(a)',
  },
  {
    id: 'see2-214',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Accounting Methods',
    subtopic: 'Economic Performance',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'An accrual method taxpayer incurs a $50,000 liability for services in December 2024, but the services are performed in January 2025. The expense is deductible in:',
    options: [
      '2024, when the liability was fixed',
      '2025, when economic performance occurred',
      'Either year at the taxpayer\'s election',
      '2024 if paid within 8.5 months of year-end'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §461(h), for liabilities for services, economic performance occurs when the services are provided. The expense is deductible in 2025, even though the liability was fixed in 2024 (with limited recurring item exceptions).',
    reference: 'IRC §461(h)(2)(A)(i)',
  },
  {
    id: 'see2-215',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Accounting Methods',
    subtopic: 'Constructive Receipt',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A taxpayer receives a check on December 30, 2024, but does not deposit it until January 3, 2025. The income is taxable in:',
    options: [
      '2024',
      '2025',
      'The year the check clears',
      'Either year at the taxpayer\'s election'
    ],
    correctAnswer: 0,
    explanation: 'Under the constructive receipt doctrine, income is taxable when it is made available to the taxpayer without substantial limitation. Receipt of a valid check constitutes constructive receipt in 2024.',
    reference: 'Treas. Reg. §1.451-2(a)',
  },
  {
    id: 'see2-216',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Accounting Methods',
    subtopic: 'Prepaid Income',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'An accrual method taxpayer receives $12,000 in December 2024 for 12 months of services to be performed equally from January through December 2025. Under Rev. Proc. 2004-34, how much is recognized in 2024?',
    options: [
      '$12,000',
      '$1,000',
      '$0',
      '$6,000'
    ],
    correctAnswer: 2,
    explanation: 'Under Rev. Proc. 2004-34 and IRC §451(c), payments for services can be deferred and recognized as earned. Since no services are performed in 2024, and all are in 2025, no income is recognized in 2024.',
    reference: 'IRC §451(c); Rev. Proc. 2004-34',
  },
  {
    id: 'see2-217',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Accounting Methods',
    subtopic: 'Change in Method',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'To change an accounting method, a taxpayer generally must:',
    options: [
      'Simply begin using the new method',
      'File an amended return for the prior year',
      'File Form 3115 and obtain IRS consent',
      'Wait until the business is terminated'
    ],
    correctAnswer: 2,
    explanation: 'Under IRC §446(e), a taxpayer must obtain IRS consent to change an accounting method. Form 3115 is filed either with the tax return (automatic consent) or separately (advance consent), and a §481(a) adjustment is computed.',
    reference: 'IRC §446(e); Rev. Proc. 2015-13',
  },
  {
    id: 'see2-218',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Accounting Periods',
    subtopic: 'Required Tax Year',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'An S corporation is generally required to use:',
    options: [
      'Any fiscal year elected when formed',
      'A calendar year',
      'The same year as its majority shareholder',
      'Any year with IRS approval'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §1378, an S corporation must use a permitted year, which is generally the calendar year unless a business purpose for a different year can be established or a §444 election is made.',
    reference: 'IRC §1378',
  },
  {
    id: 'see2-219',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Accounting Periods',
    subtopic: 'Section 444 Election',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A partnership or S corporation using a Section 444 election to adopt a fiscal year must:',
    options: [
      'Pay a refundable deposit to the IRS',
      'Make required payments to offset the deferral benefit',
      'Distribute all income within 3 months of year-end',
      'Limit its fiscal year to a 3-month deferral'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §7519, entities using a §444 election must make required payments that approximate the tax deferral benefit enjoyed by owners. The payment is refunded if deferral decreases or the election terminates.',
    reference: 'IRC §444; IRC §7519',
  },
  {
    id: 'see2-220',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Accounting Periods',
    subtopic: 'Short Period Return',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'When a corporation changes its tax year, it must file a short-period return. Income for the short period is:',
    options: [
      'Reported as earned with no adjustment',
      'Annualized, and tax computed on annualized amount then prorated',
      'Taxed at higher rates',
      'Deferred to the next full year'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §443(b), a short-period return requires annualizing income to determine the tax rate, then prorating the tax based on the number of months in the short period.',
    reference: 'IRC §443(b)',
  },
];

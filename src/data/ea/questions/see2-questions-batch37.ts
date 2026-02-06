/**
 * EA SEE Part 2: Businesses - Questions Batch 37 (Q361-370)
 * Self-Employment Tax and Schedule SE
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH37: Question[] = [
  // ==========================================
  // SEE2-2: Self-Employment Tax
  // ==========================================
  {
    id: 'see2-361',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Self-Employment Tax',
    subtopic: 'SE Tax Rate',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The self-employment tax rate for 2024 is:',
    options: [
      '7.65%',
      '12.4%',
      '15.3%',
      '22.4%'
    ],
    correctAnswer: 2,
    explanation: 'Self-employment tax is 15.3% (12.4% for Social Security on earnings up to the wage base plus 2.9% for Medicare on all earnings). This represents both employer and employee portions.',
    reference: 'IRC §1401',
  },
  {
    id: 'see2-362',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Self-Employment Tax',
    subtopic: 'Net Earnings Calculation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Self-employment tax is calculated on:',
    options: [
      'Gross receipts',
      '100% of net self-employment income',
      '92.35% of net self-employment income',
      '50% of net self-employment income'
    ],
    correctAnswer: 2,
    explanation: 'SE tax is calculated on 92.35% of net self-employment income, which approximates the reduction an employee would have from employer-paid FICA (100% - 7.65% = 92.35%).',
    reference: 'IRC §1402(a)',
  },
  {
    id: 'see2-363',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Self-Employment Tax',
    subtopic: 'Deduction for SE Tax',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A self-employed individual may deduct what portion of self-employment tax on Form 1040?',
    options: [
      '100% on Schedule C',
      '50% as an adjustment to income',
      '7.65% on Schedule A',
      'None - SE tax is not deductible'
    ],
    correctAnswer: 1,
    explanation: '50% of self-employment tax is deductible as an adjustment to income (above-the-line) on Schedule 1 of Form 1040. This represents the employer-equivalent portion of FICA.',
    reference: 'IRC §164(f)',
  },
  {
    id: 'see2-364',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Self-Employment Tax',
    subtopic: 'Minimum Threshold',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Self-employment tax is NOT required if net self-employment earnings are less than:',
    options: [
      '$100',
      '$400',
      '$600',
      '$1,000'
    ],
    correctAnswer: 1,
    explanation: 'No self-employment tax is due if net earnings from self-employment are less than $400 for the year. Above $400, the entire amount (×92.35%) is subject to SE tax.',
    reference: 'IRC §1402(b)',
  },
  {
    id: 'see2-365',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Self-Employment Tax',
    subtopic: 'Partnership Income',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A general partner\'s distributive share of partnership income is:',
    options: [
      'Never subject to self-employment tax',
      'Subject to self-employment tax if from an active trade or business',
      'Only subject to employment tax, not SE tax',
      'Subject to SE tax only if the partner is retired'
    ],
    correctAnswer: 1,
    explanation: 'A general partner\'s distributive share of partnership ordinary income is generally subject to self-employment tax as earnings from self-employment. Limited partners are generally exempt except for guaranteed payments.',
    reference: 'IRC §1402(a)(13)',
  },
  {
    id: 'see2-366',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Self-Employment Tax',
    subtopic: 'S Corporation Wages',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'An S corporation shareholder-employee\'s reasonable compensation is:',
    options: [
      'Subject to SE tax',
      'Subject to FICA tax (not SE tax)',
      'Exempt from all payroll taxes',
      'Subject to FUTA only'
    ],
    correctAnswer: 1,
    explanation: 'S corporation shareholder-employees receive wages subject to FICA (employee and employer portions), not SE tax. Their distributive share of S corp income is generally not subject to SE tax.',
    reference: 'IRC §1402(a)(13)',
  },
  {
    id: 'see2-367',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Self-Employment Tax',
    subtopic: 'Additional Medicare on SE',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A self-employed individual with $300,000 of net SE income (single filer) owes Additional Medicare Tax on:',
    options: [
      'All $300,000',
      'Earnings over $200,000 ($100,000)',
      'Earnings over $250,000 ($50,000)',
      'Nothing - Additional Medicare only applies to employees'
    ],
    correctAnswer: 1,
    explanation: 'Self-employed individuals owe 0.9% Additional Medicare Tax on SE earnings over $200,000 (single). With $300,000 SE income, Additional Medicare applies to $100,000.',
    reference: 'IRC §1401(b)(2)',
  },
  {
    id: 'see2-368',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Self-Employment Tax',
    subtopic: 'Rental Income',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Rental income from real estate is generally:',
    options: [
      'Always subject to self-employment tax',
      'Not subject to self-employment tax unless the taxpayer is a real estate dealer',
      'Subject to 50% SE tax',
      'Exempt only for retirees'
    ],
    correctAnswer: 1,
    explanation: 'Rental income from real estate is generally excluded from SE tax under IRC §1402(a)(1), unless the taxpayer is a real estate dealer or provides substantial services along with the rental.',
    reference: 'IRC §1402(a)(1)',
  },
  {
    id: 'see2-369',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Self-Employment Tax',
    subtopic: 'Combined Earnings',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A taxpayer has $150,000 in wages and $50,000 in net SE income. How does the Social Security wage base apply?',
    options: [
      'SE income is fully subject to SS portion of SE tax',
      'Only $18,600 of SE income is subject to SS portion ($168,600 - $150,000)',
      'All SE income is exempt from SS tax',
      'The wage base applies separately to wages and SE income'
    ],
    correctAnswer: 1,
    explanation: 'The Social Security wage base ($168,600 for 2024) applies to combined wages and SE income. With $150,000 wages, only $18,600 of SE income is subject to the SS portion (12.4%×92.35%).',
    reference: 'IRC §1402(b)(1)',
  },
  {
    id: 'see2-370',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Self-Employment Tax',
    subtopic: 'Schedule SE',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Self-employment tax is calculated and reported on:',
    options: [
      'Schedule C',
      'Schedule SE',
      'Schedule E',
      'Form 941'
    ],
    correctAnswer: 1,
    explanation: 'Schedule SE (Form 1040), Self-Employment Tax, is used to calculate SE tax. The SE tax is then entered on Schedule 2 of Form 1040.',
    reference: 'IRS Schedule SE Instructions',
  },
];

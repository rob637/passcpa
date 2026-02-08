/**
 * EA SEE Part 2: Businesses - Questions Batch 42 (Q411-420)
 * Estimated Taxes and Business Tax Payments
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH42: Question[] = [
  // ==========================================
  // SEE2-2: Estimated Taxes
  // ==========================================
  {
    id: 'see2-411',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Estimated Taxes',
    subtopic: 'Corporate Estimated Tax',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A C corporation must make estimated tax payments if expected tax is:',
    options: [
      '$100 or more',
      '$500 or more',
      '$1,000 or more',
      '$5,000 or more'
    ],
    correctAnswer: 1,
    explanation: 'C corporations must make quarterly estimated tax payments if the expected tax liability is $500 or more for the year.',
    reference: 'IRC §6655(g)(3)',
  },
  {
    id: 'see2-412',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Estimated Taxes',
    subtopic: 'Corporate Payment Dates',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'For a calendar year corporation, estimated tax payments are due on:',
    options: [
      'January 15, April 15, June 15, September 15',
      'April 15, June 15, September 15, December 15',
      'March 15, June 15, September 15, December 15',
      'Quarterly throughout the fiscal year'
    ],
    correctAnswer: 1,
    explanation: 'Corporate estimated tax payments for calendar year corporations are due April 15, June 15, September 15, and December 15.',
    reference: 'IRC §6655(c)',
  },
  {
    id: 'see2-413',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Estimated Taxes',
    subtopic: 'Safe Harbor - Corporation',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A corporation avoids estimated tax penalties by paying at least:',
    options: [
      '90% of current year tax',
      '100% of current year tax or 100% of prior year tax (if not large corporation)',
      '110% of prior year tax',
      '80% of current year tax'
    ],
    correctAnswer: 1,
    explanation: 'Corporations avoid penalties by paying the lesser of 100% of current year tax or 100% of prior year tax. Large corporations (>$1M average taxable income in prior 3 years) cannot use prior year safe harbor after Q1.',
    reference: 'IRC §6655(d)',
  },
  {
    id: 'see2-414',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Estimated Taxes',
    subtopic: 'Individual Business Owner',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Self-employed individuals must make estimated tax payments if they expect to owe:',
    options: [
      '$500 or more',
      '$1,000 or more after withholding and credits',
      '$5,000 or more',
      'Any amount of tax'
    ],
    correctAnswer: 1,
    explanation: 'Individuals (including self-employed) must pay estimated taxes if they expect to owe $1,000 or more after subtracting withholding and credits.',
    reference: 'IRC §6654(e)',
  },
  {
    id: 'see2-415',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Estimated Taxes',
    subtopic: 'Individual Safe Harbor',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'An individual can avoid estimated tax penalties by paying at least:',
    options: [
      '90% of current year tax or 100% of prior year tax (110% if AGI > $150,000)',
      '80% of current year tax',
      '100% of current year tax only',
      '50% of current year tax'
    ],
    correctAnswer: 0,
    explanation: 'Individuals avoid penalties by paying: (1) 90% of current year tax, OR (2) 100% of prior year tax (110% if prior year AGI exceeded $150,000 or $75,000 if MFS).',
    reference: 'IRC §6654(d)',
  },
  {
    id: 'see2-416',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Estimated Taxes',
    subtopic: 'Annualized Income Method',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The annualized income installment method allows:',
    options: [
      'Equal quarterly payments based on prior year',
      'Lower estimated payments in early quarters if income is received unevenly throughout the year',
      'Deferral of all payments to Q4',
      'Payment only when income exceeds $100,000'
    ],
    correctAnswer: 1,
    explanation: 'The annualized income installment method computes estimated tax based on income received through each quarter\'s cutoff date, helpful for seasonal businesses or uneven income.',
    reference: 'IRC §6654(d)(2); IRC §6655(e)',
  },
  {
    id: 'see2-417',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Estimated Taxes',
    subtopic: 'Pass-Through Entity',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'S corporations and partnerships:',
    options: [
      'Must make estimated tax payments at the entity level',
      'Do not make estimated payments; owners/partners make payments on their individual returns',
      'Only make payments if income exceeds $1 million',
      'Make Semi-annual payments'
    ],
    correctAnswer: 1,
    explanation: 'Pass-through entities (S corps, partnerships) generally do not pay income tax at the entity level. Owners include their share of income on individual returns and make estimated payments accordingly.',
    reference: 'IRC §1366; IRC §701',
  },
  {
    id: 'see2-418',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Estimated Taxes',
    subtopic: 'PTE Tax Election',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Some states allow pass-through entity (PTE) tax elections where:',
    options: [
      'The entity pays no tax',
      'The entity pays state tax and owners get federal deduction for state taxes paid',
      'Partners pay tax directly to the state',
      'Federal estimated payments are eliminated'
    ],
    correctAnswer: 1,
    explanation: 'PTE elections (workaround to $10,000 SALT cap) allow the entity to pay state tax, which the entity deducts for federal purposes. Owners reduce their distributive share by taxes paid.',
    reference: 'IRS Notice 2020-75',
  },
  {
    id: 'see2-419',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Estimated Taxes',
    subtopic: 'Underpayment Penalty',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The estimated tax underpayment penalty is:',
    options: [
      'A flat 10% of underpaid tax',
      'Interest on underpayment calculated using the federal short-term rate plus 3%',
      '5% per month',
      '25% of total tax'
    ],
    correctAnswer: 1,
    explanation: 'The underpayment penalty is interest computed on the underpaid amount for the period of underpayment. The rate is the federal short-term rate plus 3 percentage points, compounded daily.',
    reference: 'IRC §6621; IRC §6654',
  },
  {
    id: 'see2-420',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Estimated Taxes',
    subtopic: 'Fourth Quarter Exception',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A corporation that underpays estimated taxes due to a large fourth quarter gain should:',
    options: [
      'Pay additional tax with Q4 payment based on annualized income',
      'Wait until tax return is filed',
      'Amend prior year returns',
      'File for extension automatically waiving penalty'
    ],
    correctAnswer: 0,
    explanation: 'Using the annualized income installment method, a corporation with unanticipated Q4 income would calculate a larger Q4 payment to minimize underpayment penalty.',
    reference: 'IRC §6655(e)',
  },
];

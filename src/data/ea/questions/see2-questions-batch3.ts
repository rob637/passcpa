/**
 * EA SEE Part 2: Businesses - Questions Batch 3 (Q21-30)
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH3: Question[] = [
  // ==========================================
  // SEE2-5: Partnerships (continued)
  // ==========================================
  {
    id: 'see2-021',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'Partnership Taxation',
    subtopic: 'Schedule K-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Partnerships report each partner\'s share of income and deductions on:',
    options: [
      'Form W-2',
      'Form 1099-MISC',
      'Schedule K-1 (Form 1065)',
      'Schedule C'
    ],
    correctAnswer: 2,
    explanation: 'Schedule K-1 (Form 1065) reports each partner\'s distributive share of partnership income, deductions, credits, and other items. Partners use this information to complete their individual returns.',
    reference: 'IRC §6031; Form 1065 Instructions',
  },
  {
    id: 'see2-022',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'Partnership Taxation',
    subtopic: 'Guaranteed Payments',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Guaranteed payments to a partner for services are:',
    options: [
      'Not deductible by the partnership and not taxable to the partner',
      'Deductible by the partnership and taxable to the partner as ordinary income',
      'Treated as distributions reducing basis',
      'Subject to self-employment tax only if the partner is a general partner'
    ],
    correctAnswer: 1,
    explanation: 'Guaranteed payments are deductible by the partnership and reported as ordinary income by the partner. For general partners, guaranteed payments are also subject to self-employment tax.',
    reference: 'IRC §707(c)',
  },
  {
    id: 'see2-023',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'Partnership Basis',
    subtopic: 'Partner\'s Basis',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A partner\'s basis in their partnership interest is increased by:',
    options: [
      'Partnership losses allocated to the partner',
      'Distributions received from the partnership',
      'The partner\'s share of partnership income',
      'Guaranteed payments received'
    ],
    correctAnswer: 2,
    explanation: 'A partner\'s basis increases by their share of partnership income (including tax-exempt income) and additional contributions. Basis decreases for distributions, losses, and nondeductible expenses.',
    reference: 'IRC §705',
  },
  {
    id: 'see2-024',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'Partnership Distributions',
    subtopic: 'Current Distributions',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A cash distribution from a partnership to a partner is taxable to the extent it:',
    options: [
      'Exceeds the fair market value of the partnership',
      'Exceeds the partner\'s basis in their partnership interest',
      'Is greater than $10,000',
      'All distributions are fully taxable'
    ],
    correctAnswer: 1,
    explanation: 'Cash distributions are tax-free to the extent of the partner\'s basis. If a cash distribution exceeds basis, the excess is treated as gain from the sale of the partnership interest (usually capital gain).',
    reference: 'IRC §731',
  },
  {
    id: 'see2-025',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'Partnership Losses',
    subtopic: 'At-Risk Rules',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Under the at-risk rules, a partner\'s deductible losses are limited to:',
    options: [
      'The partner\'s share of partnership liabilities',
      'The amount the partner has at risk in the activity',
      'The partner\'s capital account balance',
      'The fair market value of the partnership interest'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §465, losses are limited to the amount the partner has at risk, which includes cash contributions, adjusted basis of property contributed, and certain recourse liabilities. Non-recourse debt generally does not increase at-risk amount.',
    reference: 'IRC §465',
  },

  // ==========================================
  // SEE2-6: C Corporations
  // ==========================================
  {
    id: 'see2-026',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'C Corporation Taxation',
    subtopic: 'Tax Rate',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The federal corporate income tax rate for C corporations is:',
    options: [
      '15% on the first $50,000',
      '21% flat rate',
      '25% flat rate',
      'Graduated rates from 15% to 35%'
    ],
    correctAnswer: 1,
    explanation: 'The Tax Cuts and Jobs Act established a flat 21% corporate tax rate for C corporations, replacing the previous graduated rate structure that ranged from 15% to 35%.',
    reference: 'IRC §11',
  },
  {
    id: 'see2-027',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'C Corporation Formation',
    subtopic: 'Section 351',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'For a tax-free incorporation under Section 351, the transferors must have control, meaning they own at least:',
    options: [
      '50% of the stock',
      '51% of the stock',
      '80% of the stock',
      '100% of the stock'
    ],
    correctAnswer: 2,
    explanation: 'Under Section 351, transferors must own at least 80% of the total combined voting power and 80% of each class of nonvoting stock immediately after the exchange for the transfer to be tax-free.',
    reference: 'IRC §351, §368(c)',
  },
  {
    id: 'see2-028',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'C Corporation Taxation',
    subtopic: 'Double Taxation',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Double taxation of C corporation earnings refers to:',
    options: [
      'Federal and state taxes',
      'Tax at the corporate level and again when dividends are distributed to shareholders',
      'Income tax and self-employment tax',
      'Regular tax and alternative minimum tax'
    ],
    correctAnswer: 1,
    explanation: 'Double taxation means C corporation income is taxed first at the corporate level (21%) and again when distributed to shareholders as dividends (at preferential rates of 0%, 15%, or 20% plus possible 3.8% NIIT).',
    reference: 'IRS Publication 542',
  },
  {
    id: 'see2-029',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'C Corporation Deductions',
    subtopic: 'Dividends Received Deduction',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A C corporation that owns less than 20% of another corporation may deduct what percentage of dividends received?',
    options: [
      '50%',
      '65%',
      '80%',
      '100%'
    ],
    correctAnswer: 0,
    explanation: 'The dividends received deduction (DRD) is 50% if the corporation owns less than 20% of the paying corporation, 65% if it owns 20% to less than 80%, and 100% if it owns 80% or more (with affiliated group rules).',
    reference: 'IRC §243',
  },
  {
    id: 'see2-030',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'C Corporation Taxation',
    subtopic: 'Estimated Tax',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Corporations with expected tax liability of $500 or more must make estimated tax payments:',
    options: [
      'Monthly',
      'Quarterly',
      'Twice a year',
      'Only at year-end'
    ],
    correctAnswer: 1,
    explanation: 'Corporations expecting to owe $500 or more in tax must make quarterly estimated payments. The payments are due on the 15th day of the 4th, 6th, 9th, and 12th months of the corporation\'s tax year.',
    reference: 'IRC §6655',
  },
];

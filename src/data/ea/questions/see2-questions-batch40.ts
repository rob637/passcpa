/**
 * EA SEE Part 2: Businesses - Questions Batch 40 (Q391-400)
 * Net Operating Losses for Businesses
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH40: Question[] = [
  // ==========================================
  // SEE2-3: Net Operating Losses
  // ==========================================
  {
    id: 'see2-391',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Net Operating Losses',
    subtopic: 'NOL Definition',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A net operating loss (NOL) occurs when:',
    options: [
      'Gross receipts exceed expenses',
      'Tax deductions exceed gross income',
      'Capital losses exceed capital gains',
      'Passive losses exceed passive income'
    ],
    correctAnswer: 1,
    explanation: 'A net operating loss occurs when the taxpayer\'s deductions for the year exceed gross income. For individuals, NOL is computed with certain modifications (personal exemptions excluded, etc.).',
    reference: 'IRC §172(c)',
  },
  {
    id: 'see2-392',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Net Operating Losses',
    subtopic: 'Post-2020 Carryforward',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Under current law (post-CARES Act for NOLs arising after 2020), NOLs may be carried:',
    options: [
      'Back 2 years and forward 20 years',
      'Forward indefinitely only (no carryback)',
      'Back 5 years and forward indefinitely',
      'Forward 5 years only'
    ],
    correctAnswer: 1,
    explanation: 'NOLs arising in 2021 and later can only be carried forward indefinitely with no carryback (except for farming losses). The CARES Act provided temporary 5-year carryback for 2018-2020 NOLs.',
    reference: 'IRC §172(b)(1)',
  },
  {
    id: 'see2-393',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Net Operating Losses',
    subtopic: '80% Limitation',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'An NOL deduction is limited to:',
    options: [
      '100% of taxable income',
      '80% of taxable income (computed without the NOL deduction)',
      '50% of taxable income',
      'The lesser of NOL or AGI'
    ],
    correctAnswer: 1,
    explanation: 'NOL deductions arising after 2020 are limited to 80% of taxable income (without the NOL deduction). The remaining 20% is still taxable. Unused NOL carries forward.',
    reference: 'IRC §172(a)(2)',
  },
  {
    id: 'see2-394',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Net Operating Losses',
    subtopic: 'Farming Exception',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Farm losses have a special NOL treatment allowing:',
    options: [
      'No carryback or carryforward',
      '2-year carryback option for farming NOLs',
      '10-year carryback',
      'Immediate refund without carryback'
    ],
    correctAnswer: 1,
    explanation: 'Farm NOLs may be carried back 2 years (by election) or carried forward indefinitely. This is an exception to the general rule that post-2020 NOLs cannot be carried back.',
    reference: 'IRC §172(b)(1)(B)',
  },
  {
    id: 'see2-395',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Net Operating Losses',
    subtopic: 'Corporation NOL',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A C corporation\'s NOL:',
    options: [
      'Passes through to shareholders',
      'Can offset 80% of taxable income when carried forward',
      'Is limited to $3,000 per year',
      'Cannot be carried forward after an ownership change'
    ],
    correctAnswer: 1,
    explanation: 'C corporation NOLs are used at the corporate level (not passed through). Like individuals, the deduction is limited to 80% of taxable income for NOLs arising after 2020.',
    reference: 'IRC §172(a)',
  },
  {
    id: 'see2-396',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Net Operating Losses',
    subtopic: 'Section 382 Impact',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'After a greater than 50% ownership change, Section 382 limits NOL usage to:',
    options: [
      'The corporation\'s value times the long-term tax-exempt rate',
      'Zero',
      'Prior year income',
      '$10 million per year'
    ],
    correctAnswer: 0,
    explanation: 'After an ownership change >50%, §382 limits annual NOL usage to the §382 limitation amount = corporation\'s value immediately before the change × long-term tax-exempt rate.',
    reference: 'IRC §382(b)',
  },
  {
    id: 'see2-397',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Net Operating Losses',
    subtopic: 'S Corp NOL',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'An S corporation\'s net operating loss:',
    options: [
      'Is deducted at the corporate level',
      'Passes through to shareholders who deduct it subject to basis and other limitations',
      'Is carried back by the corporation',
      'Is converted to a credit'
    ],
    correctAnswer: 1,
    explanation: 'S corporation losses pass through to shareholders and are deductible subject to basis, at-risk, passive activity, and excess business loss limitations. No NOL exists at the S corp level.',
    reference: 'IRC §1366',
  },
  {
    id: 'see2-398',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Net Operating Losses',
    subtopic: 'Partnership NOL',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A partnership\'s losses:',
    options: [
      'Create an NOL at the partnership level',
      'Pass through to partners who may generate individual NOLs',
      'Are suspended until partnership termination',
      'Are converted to credits'
    ],
    correctAnswer: 1,
    explanation: 'Partnerships are pass-through entities; losses flow to partners\' individual returns. If a partner\'s deductions from all sources exceed income, an NOL may result on the partner\'s individual return.',
    reference: 'IRC §702',
  },
  {
    id: 'see2-399',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Net Operating Losses',
    subtopic: 'Excess Business Loss',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The excess business loss limitation under IRC §461(l):',
    options: [
      'Was repealed permanently',
      'Limits the amount of business losses that can offset non-business income for non-corporate taxpayers',
      'Only applies to passive activities',
      'Limits losses to $3,000'
    ],
    correctAnswer: 1,
    explanation: 'Under §461(l), non-corporate taxpayers cannot deduct business losses exceeding $289,000 (single) or $578,000 (MFJ) for 2024 against non-business income. Excess becomes NOL carryforward.',
    reference: 'IRC §461(l)',
  },
  {
    id: 'see2-400',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Net Operating Losses',
    subtopic: 'NOL Ordering',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When a taxpayer has NOL carryforwards from multiple years:',
    options: [
      'The most recent NOL is used first',
      'The oldest NOL is used first (FIFO)',
      'The taxpayer may choose which NOL to use',
      'All NOLs are used proportionally'
    ],
    correctAnswer: 1,
    explanation: 'NOLs are used in FIFO order - the oldest carryforward is applied first. This is important since NOLs may be subject to different limitations based on the year they arose.',
    reference: 'IRC §172(b)(2)',
  },
];

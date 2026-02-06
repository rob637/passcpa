/**
 * EA SEE Part 3: Representation, Practices, and Procedures - Batch 20 (Q191-200)
 * Extensions, Amended Returns, and Audit Reconsideration
 */

import { Question } from '../../../types';

export const SEE3_QUESTIONS_BATCH20: Question[] = [
  // ==========================================
  // SEE3: Extensions, Amendments, Reconsideration
  // ==========================================
  {
    id: 'see3-191',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Extensions',
    subtopic: 'Form 4868',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Form 4868 provides an automatic extension of:',
    options: [
      '3 months',
      '6 months to file an individual return',
      '1 year',
      '90 days'
    ],
    correctAnswer: 1,
    explanation: 'Form 4868 provides an automatic 6-month extension to file an individual income tax return (from April 15 to October 15). It is an extension to file, not to pay.',
    reference: 'IRS Form 4868',
  },
  {
    id: 'see3-192',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Extensions',
    subtopic: 'Payment Requirement',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Filing an extension:',
    options: [
      'Extends the time to pay',
      'Does not extend the time to pay - taxes are still due by the original due date',
      'Eliminates penalties automatically',
      'Extends time for state returns as well'
    ],
    correctAnswer: 1,
    explanation: 'An extension of time to file is NOT an extension of time to pay. Taxes must still be paid by the original due date to avoid interest and possible failure-to-pay penalties.',
    reference: 'IRC §6081',
  },
  {
    id: 'see3-193',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Extensions',
    subtopic: 'Form 7004',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Form 7004 is used to request an extension for:',
    options: [
      'Individual returns',
      'Business income tax returns (corporations, partnerships, etc.)',
      'Estate returns only',
      'Employment tax returns'
    ],
    correctAnswer: 1,
    explanation: 'Form 7004 is the application for automatic extension for various business returns including Form 1120, 1120-S, 1065, 1041, and others.',
    reference: 'IRS Form 7004',
  },
  {
    id: 'see3-194',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Amended Returns',
    subtopic: 'Form 1040-X',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Form 1040-X is used to:',
    options: [
      'Request an extension',
      'Amend a previously filed individual income tax return',
      'File an original return',
      'Request innocent spouse relief'
    ],
    correctAnswer: 1,
    explanation: 'Form 1040-X (Amended U.S. Individual Income Tax Return) is used to correct errors or make changes to Form 1040 series returns already filed with the IRS.',
    reference: 'IRS Form 1040-X',
  },
  {
    id: 'see3-195',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Amended Returns',
    subtopic: 'Refund Claim Period',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'To claim a refund on an amended return, the taxpayer must file within:',
    options: [
      '1 year',
      '3 years from filing the original return or 2 years from payment, whichever is later',
      '5 years',
      '7 years'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §6511, a refund claim must be filed within 3 years of filing the original return OR 2 years from the date of payment, whichever period expires later.',
    reference: 'IRC §6511(a)',
  },
  {
    id: 'see3-196',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Amended Returns',
    subtopic: 'State Returns',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'When a federal amended return is filed:',
    options: [
      'State returns are automatically updated',
      'The taxpayer may need to file an amended state return as well',
      'No state action is required',
      'The IRS notifies the state'
    ],
    correctAnswer: 1,
    explanation: 'Filing an amended federal return does not automatically update state returns. Taxpayers typically need to file amended state returns separately if changes affect state tax liability.',
    reference: 'State tax compliance guidance',
  },
  {
    id: 'see3-197',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Amended Returns',
    subtopic: 'Electronic Filing',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Form 1040-X may be:',
    options: [
      'Only mailed',
      'E-filed for the current year and prior 3 years',
      'Submitted through Free File only',
      'Only filed in person'
    ],
    correctAnswer: 1,
    explanation: 'The IRS now accepts electronically filed Forms 1040-X for the current tax year and prior 3 tax years. E-filing allows for faster processing than paper filing.',
    reference: 'IRS e-file guidance',
  },
  {
    id: 'see3-198',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Audit Reconsideration',
    subtopic: 'Basic Provisions',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Audit reconsideration is available when:',
    options: [
      'The taxpayer disagrees with any IRS position',
      'A taxpayer has new information to present after an audit has concluded',
      'An audit is currently in progress',
      'The taxpayer wants to request an extension'
    ],
    correctAnswer: 1,
    explanation: 'Audit reconsideration allows taxpayers to request re-examination when they have new information not previously considered, there are computational errors, or the liability was assessed without taxpayer participation.',
    reference: 'IRM 4.13.1',
  },
  {
    id: 'see3-199',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Audit Reconsideration',
    subtopic: 'Request Process',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'An audit reconsideration request should include:',
    options: [
      'Only a verbal explanation',
      'A written request with supporting documentation and explanation',
      'Payment of the full liability',
      'Form 1040-X only'
    ],
    correctAnswer: 1,
    explanation: 'Audit reconsideration requests should be in writing and include supporting documentation, an explanation of why the taxpayer disagrees, and copies of any prior correspondence.',
    reference: 'IRM 4.13.1.5',
  },
  {
    id: 'see3-200',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Audit Reconsideration',
    subtopic: 'SFR Reconsideration',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'If the IRS filed a Substitute for Return (SFR) for a non-filer:',
    options: [
      'The taxpayer cannot challenge it',
      'The taxpayer may file an original return to replace the SFR through reconsideration',
      'Only an amended return may be filed',
      'The SFR becomes final immediately'
    ],
    correctAnswer: 1,
    explanation: 'Taxpayers who had an SFR filed on their behalf may file their own original return through the audit reconsideration process. The filed return can replace or adjust the SFR assessment.',
    reference: 'IRM 4.13.1.3',
  },
];

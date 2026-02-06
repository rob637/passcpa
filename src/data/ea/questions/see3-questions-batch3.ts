/**
 * EA SEE Part 3: Representation, Practices, and Procedures - Questions Batch 3 (Q21-30)
 */

import { Question } from '../../../types';

export const SEE3_QUESTIONS_BATCH3: Question[] = [
  // ==========================================
  // SEE3-3: Specific Areas of Representation (continued)
  // ==========================================
  {
    id: 'see3-021',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Examinations',
    subtopic: 'Field Audits',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A field examination is typically conducted:',
    options: [
      'At an IRS office',
      'At the taxpayer\'s home, place of business, or accountant\'s office',
      'Entirely through correspondence',
      'At the Tax Court'
    ],
    correctAnswer: 1,
    explanation: 'Field examinations are conducted at the taxpayer\'s home, place of business, or representative\'s office. These audits typically involve more complex returns requiring review of business records.',
    reference: 'IRS Publication 556',
  },
  {
    id: 'see3-022',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Examinations',
    subtopic: '30-Day Letter',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'After an examination, if the taxpayer disagrees with the findings, the IRS issues:',
    options: [
      'An immediate levy notice',
      'A 30-day letter proposing changes and explaining appeal rights',
      'A warrant for arrest',
      'A final tax bill with no appeal options'
    ],
    correctAnswer: 1,
    explanation: 'The 30-day letter is issued after an examination when the IRS proposes changes. It outlines the proposed adjustments and gives the taxpayer 30 days to respond, agree, or request an appeal.',
    reference: 'IRS Publication 556',
  },
  {
    id: 'see3-023',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Statute of Limitations',
    subtopic: 'Assessment Period',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The general statute of limitations for IRS assessment of additional tax is:',
    options: [
      '1 year from the filing date',
      '3 years from the later of the due date or filing date',
      '7 years from the filing date',
      'Unlimited time'
    ],
    correctAnswer: 1,
    explanation: 'Generally, the IRS has 3 years from the later of the due date or the date the return was filed to assess additional tax. Extensions apply for substantial omissions, fraud, or unfiled returns.',
    reference: 'IRC §6501',
  },
  {
    id: 'see3-024',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Statute of Limitations',
    subtopic: 'Extended Period',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The statute of limitations extends to 6 years when:',
    options: [
      'The taxpayer files an extension',
      'Gross income is understated by more than 25%',
      'The taxpayer is self-employed',
      'The return includes itemized deductions'
    ],
    correctAnswer: 1,
    explanation: 'The statute of limitations extends to 6 years if the taxpayer omits more than 25% of gross income from the return. This substantial understatement gives the IRS additional time to assess.',
    reference: 'IRC §6501(e)',
  },
  {
    id: 'see3-025',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Statute of Limitations',
    subtopic: 'Fraud Exception',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'If a return is fraudulent or no return is filed, the statute of limitations is:',
    options: [
      '3 years',
      '6 years',
      '10 years',
      'Unlimited'
    ],
    correctAnswer: 3,
    explanation: 'There is no statute of limitations for assessing tax in cases of fraud or when no return has been filed. The IRS can assess tax at any time in these situations.',
    reference: 'IRC §6501(c)',
  },

  // ==========================================
  // SEE3-4: Filing Requirements
  // ==========================================
  {
    id: 'see3-026',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-4',
    topic: 'Extensions',
    subtopic: 'Automatic Extension',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Form 4868 provides an automatic extension of:',
    options: [
      '2 months',
      '4 months',
      '6 months',
      '12 months'
    ],
    correctAnswer: 2,
    explanation: 'Form 4868 provides an automatic 6-month extension to file an individual income tax return. This moves the filing deadline from April 15 to October 15 for calendar year taxpayers.',
    reference: 'Form 4868 Instructions',
  },
  {
    id: 'see3-027',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-4',
    topic: 'Extensions',
    subtopic: 'Payment Requirements',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Filing Form 4868 for an extension:',
    options: [
      'Extends both the time to file and the time to pay',
      'Extends the time to file but not the time to pay',
      'Extends the time to pay but not the time to file',
      'Eliminates any penalties or interest'
    ],
    correctAnswer: 1,
    explanation: 'Form 4868 only extends the time to file, not the time to pay. Taxpayers must estimate their tax liability and pay any amount due by the original due date to avoid penalties and interest.',
    reference: 'Form 4868 Instructions',
  },
  {
    id: 'see3-028',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-4',
    topic: 'Amended Returns',
    subtopic: 'Form 1040-X',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An amended individual return using Form 1040-X must generally be filed within:',
    options: [
      '1 year from the original filing date',
      '3 years from the date the return was filed, or 2 years from payment of tax, whichever is later',
      '5 years from the original filing date',
      '7 years for all claims'
    ],
    correctAnswer: 1,
    explanation: 'To claim a refund, Form 1040-X must be filed within 3 years from the date the original return was filed, or 2 years from the date the tax was paid, whichever is later.',
    reference: 'IRC §6511',
  },
  {
    id: 'see3-029',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-4',
    topic: 'Record Retention',
    subtopic: 'General Requirements',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The IRS generally recommends taxpayers keep records supporting income and deductions for:',
    options: [
      '1 year',
      '3 years from the date the return was filed',
      '7 years',
      'Permanently for all records'
    ],
    correctAnswer: 1,
    explanation: 'The IRS recommends keeping records that support items on a return for 3 years from the date the return was filed or the due date, whichever is later. Some records should be kept longer.',
    reference: 'IRS Publication 552',
  },
  {
    id: 'see3-030',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-4',
    topic: 'Electronic Filing',
    subtopic: 'e-file Requirements',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A paid preparer who prepares more than 10 individual returns in a year:',
    options: [
      'Must file all returns on paper',
      'Must file all returns electronically',
      'Has the option to file paper or electronically',
      'Must obtain special IRS permission to prepare returns'
    ],
    correctAnswer: 1,
    explanation: 'Paid preparers who reasonably expect to file more than 10 individual income tax returns in a calendar year must file electronically. This e-file mandate helps the IRS process returns more efficiently.',
    reference: 'IRC §6011(e)(3)',
  },
];

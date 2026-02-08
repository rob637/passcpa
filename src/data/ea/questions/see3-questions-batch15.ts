/**
 * EA SEE Part 3: Representation, Practices, and Procedures - Batch 15 (Q141-150)
 * Currently Not Collectible Status
 */

import { Question } from '../../../types';

export const SEE3_QUESTIONS_BATCH15: Question[] = [
  // ==========================================
  // SEE3: Currently Not Collectible (CNC)
  // ==========================================
  {
    id: 'see3-141',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Currently Not Collectible',
    subtopic: 'CNC Definition',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Currently Not Collectible (CNC) status means:',
    options: [
      'The tax liability is forgiven',
      'The IRS has determined that collection action is not currently appropriate',
      'The taxpayer is in prison',
      'The account is closed permanently'
    ],
    correctAnswer: 1,
    explanation: 'CNC status is when the IRS determines collection is not currently feasible because the taxpayer cannot pay anything toward the liability. The debt is not forgiven; collection is just suspended.',
    reference: 'IRM 5.16.1',
  },
  {
    id: 'see3-142',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Currently Not Collectible',
    subtopic: 'CNC Criteria',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'CNC status may be granted when:',
    options: [
      'The taxpayer does not want to pay',
      'Monthly income does not exceed allowable living expenses',
      'The taxpayer has filed all returns',
      'The liability is for current year taxes only'
    ],
    correctAnswer: 1,
    explanation: 'CNC is granted when the taxpayer has no ability to pay - monthly income equals or is less than allowable necessary expenses, and there are no assets to levy.',
    reference: 'IRM 5.16.1',
  },
  {
    id: 'see3-143',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Currently Not Collectible',
    subtopic: 'CSED and CNC',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'While an account is in CNC status:',
    options: [
      'The CSED is suspended',
      'The CSED continues to run',
      'The CSED is extended by 2 years',
      'A new CSED is established'
    ],
    correctAnswer: 1,
    explanation: 'CNC status does not suspend the collection statute. The 10-year CSED continues to run, and if it expires while the account is in CNC, the liability is written off.',
    reference: 'IRM 5.16.1.2',
  },
  {
    id: 'see3-144',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Currently Not Collectible',
    subtopic: 'Interest and Penalties',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'While in CNC status:',
    options: [
      'Interest and penalties stop accruing',
      'Interest and penalties continue to accrue',
      'Only penalties stop',
      'Only interest stops'
    ],
    correctAnswer: 1,
    explanation: 'Even while in CNC status, penalties and interest continue to accrue on the tax liability. The balance will grow while collection is suspended.',
    reference: 'IRC §6601',
  },
  {
    id: 'see3-145',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Currently Not Collectible',
    subtopic: 'Federal Tax Lien',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'When an account is placed in CNC status:',
    options: [
      'Any federal tax lien is released',
      'The federal tax lien typically remains in place',
      'A new lien is automatically filed',
      'All liens are converted to judgments'
    ],
    correctAnswer: 1,
    explanation: 'Federal tax liens generally remain in place when an account goes into CNC status. The lien protects the government\'s interest while collection is suspended.',
    reference: 'IRM 5.16.1.5',
  },
  {
    id: 'see3-146',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Currently Not Collectible',
    subtopic: 'Closing Codes',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'CNC closing code 03 indicates:',
    options: [
      'Taxpayer deceased',
      'Unable to locate taxpayer',
      'Hardship - taxpayer unable to pay',
      'Account transferred'
    ],
    correctAnswer: 2,
    explanation: 'CNC closing code 03 is "hardship" - the taxpayer has been determined unable to pay any amount due to financial circumstances. Other codes include 05 (unable to locate), 06 (deceased), etc.',
    reference: 'IRM 5.16.1.2.9',
  },
  {
    id: 'see3-147',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Currently Not Collectible',
    subtopic: 'CNC Review',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'CNC accounts may be:',
    options: [
      'Never reviewed again',
      'Reviewed periodically based on the taxpayer\'s financial situation',
      'Reviewed only upon taxpayer request',
      'Automatically closed after 3 years'
    ],
    correctAnswer: 1,
    explanation: 'The IRS periodically reviews CNC accounts. If the taxpayer\'s financial situation improves (increased income detected), the case may be reactivated for collection.',
    reference: 'IRM 5.16.1',
  },
  {
    id: 'see3-148',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Currently Not Collectible',
    subtopic: 'CNC Documentation',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'To request CNC status, a taxpayer may need to provide:',
    options: [
      'Only verbal verification of income',
      'Collection Information Statement (Form 433-F or 433-A)',
      'Only the prior year tax return',
      'A letter from an employer'
    ],
    correctAnswer: 1,
    explanation: 'The IRS typically requires a Collection Information Statement (CIS) documenting income, expenses, and assets to substantiate inability to pay for CNC consideration.',
    reference: 'IRM 5.15.1',
  },
  {
    id: 'see3-149',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Currently Not Collectible',
    subtopic: 'Refund Offset',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'When an account is in CNC status, refunds are:',
    options: [
      'Issued to the taxpayer normally',
      'Still subject to offset against the outstanding liability',
      'Paid only if requested',
      'Converted to credits for next year'
    ],
    correctAnswer: 1,
    explanation: 'CNC status suspends active collection but does not prevent refund offset. Any refunds the taxpayer is entitled to will still be applied to the outstanding balance.',
    reference: 'IRC §6402',
  },
  {
    id: 'see3-150',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Currently Not Collectible',
    subtopic: 'Future Compliance',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A taxpayer in CNC status must:',
    options: [
      'Make small monthly payments',
      'File all future tax returns and pay taxes when due',
      'Never file returns again',
      'Only file returns every other year'
    ],
    correctAnswer: 1,
    explanation: 'CNC status applies to past liabilities. Taxpayers must remain in filing and payment compliance with current tax obligations. Failure to do so may result in new balances and case reactivation.',
    reference: 'IRM 5.16.1',
  },
];

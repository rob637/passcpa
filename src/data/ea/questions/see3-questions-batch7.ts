/**
 * EA SEE Part 3: Representation, Practices, and Procedures - Questions Batch 7 (Q61-70)
 */

import { Question } from '../../../types';

export const SEE3_QUESTIONS_BATCH7: Question[] = [
  // ==========================================
  // SEE3-1: Practices and Procedures (Additional)
  // ==========================================
  {
    id: 'see3-061',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Circular 230',
    subtopic: 'Fees',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Under Circular 230, a practitioner\'s fee:',
    options: [
      'Must be approved by the IRS in advance',
      'May not be charged based on contingency for preparing an original return',
      'Must be a flat fee for all services',
      'Cannot exceed $500 per hour'
    ],
    correctAnswer: 1,
    explanation: 'Circular 230 prohibits charging unconscionable fees and prohibits contingent fees for preparing original tax returns. However, contingent fees are permitted for claims for refund, amended returns, and IRS examinations.',
    reference: 'Circular 230 §10.27',
  },
  {
    id: 'see3-062',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'PTIN',
    subtopic: 'Preparer Tax ID Number',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A paid tax return preparer must obtain a:',
    options: [
      'Social Security Number only',
      'Preparer Tax Identification Number (PTIN)',
      'Employer Identification Number (EIN)',
      'Centralized Authorization File (CAF) number'
    ],
    correctAnswer: 1,
    explanation: 'All paid tax return preparers must obtain a PTIN from the IRS and include it on all returns they prepare. The PTIN must be renewed annually.',
    reference: 'IRC §6109(a)(4)',
  },
  {
    id: 'see3-063',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Circular 230',
    subtopic: 'Solicitation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Under Circular 230, practitioners may advertise their services as long as they:',
    options: [
      'Do not use any form of advertising',
      'Ensure advertisements are not false, fraudulent, or misleading',
      'Only advertise in legal publications',
      'Get IRS approval for each advertisement'
    ],
    correctAnswer: 1,
    explanation: 'Practitioners may advertise their services provided the advertisements are not false, fraudulent, coercive, unduly influencing, or misleading. Professional designations must be accurately stated.',
    reference: 'Circular 230 §10.30',
  },
  {
    id: 'see3-064',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Enrolled Agent Renewal',
    subtopic: 'Continuing Education',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'To maintain enrolled agent status, an EA must complete how many hours of continuing education every 3 years?',
    options: [
      '36 hours',
      '52 hours',
      '72 hours',
      '120 hours'
    ],
    correctAnswer: 2,
    explanation: 'Enrolled Agents must complete 72 hours of continuing education every 3 years, with a minimum of 16 hours per year. At least 2 hours must be in ethics or professional conduct.',
    reference: 'Circular 230 §10.6(e)',
  },
  {
    id: 'see3-065',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Return of Client Records',
    subtopic: 'Client Files',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'When a client requests return of records, the practitioner must:',
    options: [
      'Return all records only after full payment of fees',
      'Promptly return records necessary for the client to comply with tax obligations, regardless of fee dispute',
      'Keep records for 7 years before returning them',
      'Report the client to the IRS'
    ],
    correctAnswer: 1,
    explanation: 'A practitioner must promptly return any records necessary for the client to comply with their federal tax obligations, even if there is a dispute over fees. The practitioner may retain copies.',
    reference: 'Circular 230 §10.28',
  },

  // ==========================================
  // SEE3-2: Representation (Additional)
  // ==========================================
  {
    id: 'see3-066',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Disreputable Conduct',
    subtopic: 'Examples',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Which of the following constitutes disreputable conduct under Circular 230?',
    options: [
      'Disagreeing with an IRS auditor\'s findings',
      'Giving a false opinion knowingly or recklessly',
      'Filing an extension on behalf of a client',
      'Requesting an appeal'
    ],
    correctAnswer: 1,
    explanation: 'Disreputable conduct includes conviction of crimes, giving false opinions knowingly or recklessly, misappropriating funds, and failing to file personal tax returns. Legitimate advocacy is never disreputable.',
    reference: 'Circular 230 §10.51',
  },
  {
    id: 'see3-067',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Information Returns',
    subtopic: 'Unauthorized Disclosure',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A paid preparer who discloses client tax return information without consent may be subject to:',
    options: [
      'No penalty if the disclosure was accidental',
      'A penalty of $250 per disclosure, up to $10,000 per year',
      'Automatic disbarment',
      'Criminal prosecution only'
    ],
    correctAnswer: 1,
    explanation: 'IRC §6713 imposes a penalty of $250 for each unauthorized disclosure of tax return information, with a maximum of $10,000 per year. Knowing or reckless disclosures may also result in criminal penalties under §7216.',
    reference: 'IRC §6713; IRC §7216',
  },
  {
    id: 'see3-068',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Tax Return Positions',
    subtopic: 'Substantial Authority',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A position on a tax return has substantial authority when:',
    options: [
      'The practitioner believes the position will win in court',
      'There is approximately a 40% or greater likelihood the position will be sustained on its merits',
      'All tax advisors agree with the position',
      'The IRS has previously approved the position'
    ],
    correctAnswer: 1,
    explanation: 'Substantial authority is an objective standard meaning roughly a 40% chance the position will be sustained. It is more than "reasonable basis" (approximately 20%) but less than "more likely than not" (greater than 50%).',
    reference: 'Treas. Reg. §1.6662-4(d)',
  },

  // ==========================================
  // SEE3-5: Penalties (Additional)
  // ==========================================
  {
    id: 'see3-069',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-5',
    topic: 'Estimated Tax Penalty',
    subtopic: 'Safe Harbor',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An individual can avoid the estimated tax penalty by paying at least:',
    options: [
      '80% of current year tax',
      '90% of current year tax or 100% of prior year tax (110% if AGI exceeds $150,000)',
      '95% of current year tax',
      '100% of current year tax only'
    ],
    correctAnswer: 1,
    explanation: 'The estimated tax safe harbors are 90% of the current year\'s tax or 100% of the prior year\'s tax. For taxpayers with AGI over $150,000 ($75,000 MFS), the prior year requirement is 110%.',
    reference: 'IRC §6654(d)',
  },
  {
    id: 'see3-070',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-5',
    topic: 'Trust Fund Recovery Penalty',
    subtopic: 'Responsible Persons',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The trust fund recovery penalty (100% penalty) applies to:',
    options: [
      'Any employee of a business',
      'Responsible persons who willfully fail to collect, account for, or pay withheld employment taxes',
      'Only business owners',
      'Only payroll service providers'
    ],
    correctAnswer: 1,
    explanation: 'IRC §6672 imposes a 100% penalty on responsible persons who willfully fail to collect, truthfully account for, or pay over withheld employment taxes. Responsibility is based on control over financial decisions.',
    reference: 'IRC §6672',
  },
];

/**
 * EA SEE Part 3: Representation, Practices, and Procedures - Batch 11 (Q101-110)
 * IRS Notices and Correspondence
 */

import { Question } from '../../../types';

export const SEE3_QUESTIONS_BATCH11: Question[] = [
  // ==========================================
  // SEE3: IRS Notices and Correspondence
  // ==========================================
  {
    id: 'see3-101',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'IRS Notices',
    subtopic: 'Notice Types',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A CP2000 notice from the IRS indicates:',
    options: [
      'A math error on the return',
      'A proposed adjustment based on third-party information not matching the return',
      'An audit has been selected',
      'A refund is being issued'
    ],
    correctAnswer: 1,
    explanation: 'A CP2000 notice is an automated underreporter notice proposing adjustments because income, payments, or credits don\'t match information from third parties (W-2s, 1099s, etc.).',
    reference: 'IRS CP2000 Notice',
  },
  {
    id: 'see3-102',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'IRS Notices',
    subtopic: 'Response Time',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The typical response time for most IRS notices is:',
    options: [
      '10 days',
      '30 days',
      '60 days',
      '90 days'
    ],
    correctAnswer: 1,
    explanation: 'Most IRS notices require a response within 30 days. Some notices, like the 90-day letter (statutory notice of deficiency), have specific statutory timeframes.',
    reference: 'IRS Notice Response Guidelines',
  },
  {
    id: 'see3-103',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'IRS Notices',
    subtopic: 'Statutory Notice of Deficiency',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A Statutory Notice of Deficiency (90-day letter):',
    options: [
      'Is a final bill that must be paid immediately',
      'Gives the taxpayer 90 days (150 if abroad) to petition Tax Court',
      'Can be responded to by telephone',
      'Is issued after Tax Court decision'
    ],
    correctAnswer: 1,
    explanation: 'A Statutory Notice of Deficiency is the taxpayer\'s ticket to Tax Court. The taxpayer has 90 days (150 days if addressed outside the US) to file a Tax Court petition.',
    reference: 'IRC §6212; IRC §6213',
  },
  {
    id: 'see3-104',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'IRS Notices',
    subtopic: 'CP501/502/503',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'CP501, CP502, and CP503 notices are:',
    options: [
      'Audit notifications',
      'Escalating balance due reminder notices',
      'Identity verification requests',
      'Refund status updates'
    ],
    correctAnswer: 1,
    explanation: 'CP501, 502, and 503 are a series of increasingly urgent balance due reminder notices. CP503 is the final notice before potential collection action.',
    reference: 'IRS Collection Notices',
  },
  {
    id: 'see3-105',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'IRS Notices',
    subtopic: 'Letter 3219',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'IRS Letter 3219 (30-day letter) provides:',
    options: [
      'Final payment demand',
      'The opportunity to appeal before the statutory notice is issued',
      'Criminal investigation notification',
      'Lien filing notice'
    ],
    correctAnswer: 1,
    explanation: 'The 30-day letter proposes changes and offers the taxpayer 30 days to agree, provide additional information, or request an Appeals conference before a statutory notice is issued.',
    reference: 'IRS Examination Process',
  },
  {
    id: 'see3-106',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'IRS Notices',
    subtopic: 'Letter 1058/LT11',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Letter 1058 (LT11) is important because it:',
    options: [
      'Announces an audit',
      'Is the Final Notice of Intent to Levy, providing CDP hearing rights',
      'Requests tax return filing',
      'Informs of identity theft'
    ],
    correctAnswer: 1,
    explanation: 'Letter 1058/LT11 is the Final Notice of Intent to Levy and Notice of Your Right to a Hearing. It provides Collection Due Process rights and must be issued before levy.',
    reference: 'IRC §6330',
  },
  {
    id: 'see3-107',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'IRS Notices',
    subtopic: 'CDP Request Time',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A taxpayer has how many days from the date of a CDP notice to request a hearing?',
    options: [
      '10 days',
      '30 days',
      '60 days',
      '90 days'
    ],
    correctAnswer: 1,
    explanation: '30 days from the date of the CDP notice. If requested within 30 days, collection action is suspended. After 30 days but within 1 year, an "equivalent hearing" may be requested.',
    reference: 'IRC §6330(a)(3)',
  },
  {
    id: 'see3-108',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'IRS Notices',
    subtopic: 'CP14',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A CP14 notice is:',
    options: [
      'An audit notification',
      'The first notice of balance due after a return is filed',
      'A notice of estimated tax penalty',
      'A refund notice'
    ],
    correctAnswer: 1,
    explanation: 'A CP14 is typically the first balance due notice sent after a return is processed showing a balance owed. It includes the amount due and payment instructions.',
    reference: 'IRS CP14 Notice',
  },
  {
    id: 'see3-109',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'IRS Notices',
    subtopic: 'LT16',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'An LT16 notice informs a taxpayer about:',
    options: [
      'A math error correction',
      'A pending lien filing',
      'An appointment for examination',
      'Renewal of practitioner status'
    ],
    correctAnswer: 1,
    explanation: 'LT16 (or Letter 3172) provides Notice of Federal Tax Lien Filing, informing the taxpayer that a lien has been filed and explaining their appeal rights.',
    reference: 'IRC §6320',
  },
  {
    id: 'see3-110',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'IRS Notices',
    subtopic: 'Identity Verification',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Letter 5071C or 4883C requires the taxpayer to:',
    options: [
      'Pay additional tax',
      'Verify their identity before the IRS processes the return',
      'Provide additional documentation for deductions',
      'Appear for an audit'
    ],
    correctAnswer: 1,
    explanation: 'Letters 5071C and 4883C are identity verification letters sent when the IRS needs to verify the taxpayer\'s identity before processing a tax return to prevent refund fraud.',
    reference: 'IRS Identity Verification Letters',
  },
];

/**
 * EA SEE Part 3: Representation, Practices, and Procedures - Batch 43 (Q421-430)
 * IRS Organization & Electronic Filing
 */

import { Question } from '../../../types';

export const SEE3_QUESTIONS_BATCH43: Question[] = [
  // ==========================================
  // SEE3: IRS Organization & E-File
  // ==========================================
  {
    id: 'see3-421',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'IRS Organization',
    subtopic: 'Operating Divisions',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The IRS operating divisions include:',
    options: [
      'Only the Examination Division',
      'Wage & Investment, Small Business/Self-Employed, Large Business & International, Tax Exempt & Government Entities',
      'North, South, East, and West regions',
      'Only Criminal Investigation'
    ],
    correctAnswer: 1,
    explanation: 'The four main IRS operating divisions are: W&I (individual taxpayers with simple returns), SB/SE (small businesses and self-employed), LB&I (large companies), and TE/GE (exempt organizations and government entities).',
    reference: 'IRS Organization; IRM 1.1',
  },
  {
    id: 'see3-422',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'IRS Organization',
    subtopic: 'Criminal Investigation',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'IRS Criminal Investigation (CI) is responsible for:',
    options: [
      'Auditing returns',
      'Investigating potential criminal violations of tax laws and related financial crimes',
      'Collection of taxes only',
      'Issuing refunds'
    ],
    correctAnswer: 1,
    explanation: 'CI investigates potential criminal violations of the Internal Revenue Code and related financial crimes. Agents carry badges and guns and can make arrests. They work with the Department of Justice for prosecution.',
    reference: 'IRM 9.1.1',
  },
  {
    id: 'see3-423',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'IRS Organization',
    subtopic: 'Office of Chief Counsel',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The IRS Office of Chief Counsel provides:',
    options: [
      'Tax preparation services',
      'Legal advice and interpretation of tax law to the IRS, and litigation support',
      'Refund processing',
      'Taxpayer education only'
    ],
    correctAnswer: 1,
    explanation: 'Chief Counsel is the legal advisor to the IRS Commissioner, providing interpretations of tax law, issuing guidance (regulations, rulings), and handling Tax Court litigation through its attorneys.',
    reference: 'IRM 30.1.1',
  },
  {
    id: 'see3-424',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'E-File',
    subtopic: 'Authorized IRS e-file Provider',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'To become an Authorized IRS e-file Provider, one must:',
    options: [
      'Simply file returns electronically',
      'Complete the IRS e-file Application and pass a suitability check',
      'Be a CPA only',
      'Pay an annual fee of $1,000'
    ],
    correctAnswer: 1,
    explanation: 'Applicants must complete the IRS e-file application (on irs.gov), pass suitability checks (including tax compliance), and accept e-file program requirements. Approval grants EFIN (Electronic Filing Identification Number).',
    reference: 'Pub 3112; Rev. Proc. 2007-40',
  },
  {
    id: 'see3-425',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'E-File',
    subtopic: 'EFIN Requirements',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'An Electronic Filing Identification Number (EFIN):',
    options: [
      'Is the same as a PTIN',
      'Is assigned to authorized e-file providers and identifies them in IRS electronic filing systems',
      'Is only for business returns',
      'Never expires'
    ],
    correctAnswer: 1,
    explanation: 'EFIN is assigned to approved e-file providers after application. It identifies the provider in IRS e-file systems. EFIN holders must meet ongoing requirements and are subject to monitoring.',
    reference: 'Pub 3112',
  },
  {
    id: 'see3-426',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'E-File',
    subtopic: 'ERO Responsibilities',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'An Electronic Return Originator (ERO) must:',
    options: [
      'Only transmit returns',
      'Retain signed authorization forms (Form 8879/8453), ensure accurate data entry, and provide copy to taxpayer',
      'Be an EA only',
      'Process only paper returns'
    ],
    correctAnswer: 1,
    explanation: 'EROs must: (1) obtain proper authorization (8879/8453) before transmitting, (2) retain forms for 3 years, (3) provide return copy to taxpayer, (4) ensure accurate data entry, and (5) meet e-file program requirements.',
    reference: 'Pub 1345',
  },
  {
    id: 'see3-427',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'E-File',
    subtopic: 'Form 8879',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Form 8879 (IRS e-file Signature Authorization):',
    options: [
      'Is filed with the IRS',
      'Is retained by the ERO and authorizes e-filing with PIN signature',
      'Only works for business returns',
      'Requires notarization'
    ],
    correctAnswer: 1,
    explanation: 'Form 8879 is not filed with the return; it\'s retained by the ERO for 3 years. It authorizes use of self-select or practitioner PIN as the taxpayer\'s signature on the e-filed return.',
    reference: 'Pub 1345; Form 8879 Instructions',
  },
  {
    id: 'see3-428',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'E-File',
    subtopic: 'Rejection Codes',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'When an e-filed return is rejected:',
    options: [
      'It is automatically accepted on the next try',
      'The ERO must correct the error and retransmit within specified timeframes to preserve timely filing',
      'A paper return must always be filed',
      'The IRS automatically fixes errors'
    ],
    correctAnswer: 1,
    explanation: 'Rejected returns must be corrected and retransmitted. If rejected near the deadline, the ERO has typically 5-10 days to correct and retransmit (depending on timing) to preserve timely filing status.',
    reference: 'Pub 1345',
  },
  {
    id: 'see3-429',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'E-File',
    subtopic: 'Refund Products',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Refund transfer products (like refund anticipation checks):',
    options: [
      'Are prohibited',
      'Must be disclosed to clients with fees explained, and cannot be used to collect improper fees',
      'Are provided by the IRS',
      'Never have fees'
    ],
    correctAnswer: 1,
    explanation: 'Refund transfer products are regulated. Providers must disclose fees clearly. Improper fees or misleading statements about products can lead to penalties and e-file program exclusion.',
    reference: 'Pub 1345; IRC §6695',
  },
  {
    id: 'see3-430',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'E-File',
    subtopic: 'MeF System',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The IRS Modernized e-File (MeF) system:',
    options: [
      'Only processes individual returns',
      'Handles individual, business, and other returns using standardized XML format',
      'Is being replaced by paper filing',
      'Works only during business hours'
    ],
    correctAnswer: 1,
    explanation: 'MeF is the IRS\'s modernized e-file platform using XML data format. It handles Forms 1040, 1120, 1041, 1065, 990, and others. It operates 24/7 (except maintenance windows) and provides faster acknowledgments.',
    reference: 'IRS MeF Guide',
  },
];

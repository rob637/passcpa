/**
 * EA SEE Part 3: Representation, Practices, and Procedures - Batch 41 (Q401-410)
 * Withdrawal from Representation & Practice Management
 */

import { Question } from '../../../types';

export const SEE3_QUESTIONS_BATCH41: Question[] = [
  // ==========================================
  // SEE3: Withdrawal & Practice Management
  // ==========================================
  {
    id: 'see3-401',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Withdrawal',
    subtopic: 'Mandatory Withdrawal',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A practitioner MUST withdraw from representation when:',
    options: [
      'The case becomes difficult',
      'Continued representation would violate law or Circular 230, or the practitioner\'s physical/mental capacity is impaired',
      'Client asks too many questions',
      'The matter takes too long'
    ],
    correctAnswer: 1,
    explanation: 'Under Circular 230 §10.21 and ethical rules, withdrawal is mandatory when continued representation would violate regulations or law, when the practitioner is impaired, or when discharged by the client.',
    reference: 'Circular 230 §10.21',
  },
  {
    id: 'see3-402',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Withdrawal',
    subtopic: 'Permissive Withdrawal',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A practitioner MAY withdraw from representation:',
    options: [
      'Never without client consent',
      'When client renders representation unreasonably difficult, fails to pay agreed fees, or for good cause',
      'Only with IRS permission',
      'Only at year end'
    ],
    correctAnswer: 1,
    explanation: 'Permissive withdrawal is allowed when the client substantially fails to fulfill obligations, makes representation unreasonably difficult, or when other good cause exists for terminating the relationship.',
    reference: 'Circular 230 §10.21; Model Rules 1.16(b)',
  },
  {
    id: 'see3-403',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Withdrawal',
    subtopic: 'Withdrawal Procedures',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'When withdrawing from representation before the IRS:',
    options: [
      'No notice is required',
      'The practitioner should notify the IRS and take steps to protect client interests',
      'The IRS must approve the withdrawal',
      'A court order is required'
    ],
    correctAnswer: 1,
    explanation: 'Upon withdrawal, the practitioner should notify the IRS (if appropriate in the representation), return client records, and take reasonable steps to avoid prejudice to the client\'s interests.',
    reference: 'Circular 230 §10.21',
  },
  {
    id: 'see3-404',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Withdrawal',
    subtopic: 'Noisy Withdrawal',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A "noisy withdrawal" (disaffirming prior submissions) must occur:',
    options: [
      'Whenever the client disagrees with the practitioner',
      'When the practitioner discovers the client has used their work product in a fraudulent manner',
      'Only after Treasury approval',
      'Never - it\'s always prohibited'
    ],
    correctAnswer: 1,
    explanation: 'Under Circular 230 §10.21, when work product has been used to perpetuate fraud, the practitioner must withdraw and take reasonable steps to "notify" the IRS of the withdrawal (though not disclose attorney-client matters).',
    reference: 'Circular 230 §10.21',
  },
  {
    id: 'see3-405',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Practice Management',
    subtopic: 'Office Supervision',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Practitioners with employees or supervised associates must:',
    options: [
      'Do nothing special',
      'Take reasonable steps to ensure that persons over whom they have supervisory authority comply with Circular 230',
      'Personally sign all documents',
      'Only hire licensed individuals'
    ],
    correctAnswer: 1,
    explanation: 'Under Circular 230 §10.36, practitioners with supervisory authority must make reasonable efforts to ensure that those supervised (including non-practitioners) comply with Circular 230 requirements.',
    reference: 'Circular 230 §10.36',
  },
  {
    id: 'see3-406',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Practice Management',
    subtopic: 'Firm Procedures',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Firms practicing before the IRS should have:',
    options: [
      'No special procedures',
      'Internal procedures to ensure Circular 230 compliance, proper supervision, and adequate review',
      'Only a written mission statement',
      'CPA firm certification only'
    ],
    correctAnswer: 1,
    explanation: 'Circular 230 §10.36 contemplates that firms have adequate procedures for compliance, including proper supervision, review processes, and ethical compliance programs.',
    reference: 'Circular 230 §10.36',
  },
  {
    id: 'see3-407',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Practice Management',
    subtopic: 'Document Retention',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Tax practitioners should retain client records and work papers:',
    options: [
      'Forever',
      'For a period sufficient to meet professional requirements, statute of limitations, and potential claims',
      'Only 1 year',
      'Until the next tax season'
    ],
    correctAnswer: 1,
    explanation: 'Retention periods should consider: (1) IRS assessment periods (generally 3-6 years), (2) state requirements, (3) malpractice statute of limitations, and (4) client needs. Many retain records 7+ years.',
    reference: 'Professional standards; State law',
  },
  {
    id: 'see3-408',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Practice Management',
    subtopic: 'Electronic Records',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Electronic copies of tax records and signatures:',
    options: [
      'Are never acceptable',
      'Are generally acceptable when properly maintained with authentication and security measures',
      'Must be converted to paper',
      'Only work for corporate returns'
    ],
    correctAnswer: 1,
    explanation: 'Electronic records, including e-signatures, are generally accepted when properly secured and authenticated. IRM procedures and regulations permit electronic formats for most tax administration purposes.',
    reference: 'IRM 10.10.1; E-Sign Act',
  },
  {
    id: 'see3-409',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Practice Management',
    subtopic: 'Insurance',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Professional liability (malpractice) insurance for enrolled agents:',
    options: [
      'Is required by federal law',
      'Is strongly recommended though not federally mandated, and may be required by some states or employers',
      'Is never available',
      'Is only for CPA firms'
    ],
    correctAnswer: 1,
    explanation: 'While not federally required for EAs, E&O (errors and omissions) insurance is strongly recommended and may be required by employers, some states, or as a prudent business practice.',
    reference: 'Professional best practices',
  },
  {
    id: 'see3-410',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Practice Management',
    subtopic: 'Engagement Letters',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Engagement letters for tax representation:',
    options: [
      'Are prohibited',
      'Should define scope of services, fees, responsibilities of both parties, and limitations',
      'Are only required for court appearances',
      'Cannot limit liability'
    ],
    correctAnswer: 1,
    explanation: 'Engagement letters protect both practitioner and client by clearly defining the scope, fees, responsibilities, and limitations. They help avoid misunderstandings and provide documentation of the agreement.',
    reference: 'Professional best practices',
  },
];

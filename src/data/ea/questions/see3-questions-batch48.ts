/**
 * EA SEE Part 3: Representation, Practices, and Procedures - Batch 48 (Q471-480)
 * Ethics Scenarios & Professional Responsibility
 */

import { Question } from '../../../types';

export const SEE3_QUESTIONS_BATCH48: Question[] = [
  // ==========================================
  // SEE3: Ethics Scenarios
  // ==========================================
  {
    id: 'see3-471',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Ethics Scenarios',
    subtopic: 'Error Discovery',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'If an EA discovers an error on a client\'s prior return while preparing the current return:',
    options: [
      'The EA should ignore it',
      'The EA should inform the client of the error and the consequences, but cannot disclose without consent',
      'The EA must file an amended return',
      'The EA should report the client to the IRS'
    ],
    correctAnswer: 1,
    explanation: 'Under Circular 230 §10.21, the practitioner must promptly advise the client of the error/omission and its consequences (including penalties). The client decides whether to correct it. The practitioner cannot disclose without consent.',
    reference: 'Circular 230 §10.21',
  },
  {
    id: 'see3-472',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Ethics Scenarios',
    subtopic: 'Client Noncompliance',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'If a client refuses to correct a known material error on a prior return:',
    options: [
      'The EA must continue representation unchanged',
      'The EA should consider withdrawal and cannot sign a return that relies on or incorporates the error',
      'The EA should report to the IRS',
      'The EA has no obligation'
    ],
    correctAnswer: 1,
    explanation: 'If the client won\'t correct a material error, the practitioner may need to withdraw. The practitioner cannot sign returns that incorporate the error or prepare returns that rely on the erroneous position.',
    reference: 'Circular 230 §10.21; §10.34',
  },
  {
    id: 'see3-473',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Ethics Scenarios',
    subtopic: 'Inadvertent Disclosure',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'An EA who inadvertently discloses client tax return information to unauthorized parties:',
    options: [
      'Faces no consequences',
      'May face civil penalties under IRC §6713 and potential criminal charges under IRC §7216',
      'Is automatically disbarred',
      'Only faces state penalties'
    ],
    correctAnswer: 1,
    explanation: 'Unauthorized disclosure, even inadvertent, may trigger IRC §6713 civil penalty ($250/disclosure, max $10,000/year). Willful or negligent disclosure may trigger IRC §7216 criminal penalty (fine up to $1,000 and/or 1 year).',
    reference: 'IRC §6713; IRC §7216',
  },
  {
    id: 'see3-474',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Ethics Scenarios',
    subtopic: 'Contingent Fees',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Contingent fees (fees based on the outcome) are:',
    options: [
      'Always allowed',
      'Generally prohibited for return preparation but allowed for IRS audits and judicial proceedings',
      'Never allowed',
      'Only allowed for CPAs'
    ],
    correctAnswer: 1,
    explanation: 'Under Circular 230 §10.27, contingent fees are prohibited for preparing original returns or amended returns/refund claims. They ARE allowed for services rendered in connection with IRS examinations, judicial proceedings, and certain collections matters.',
    reference: 'Circular 230 §10.27',
  },
  {
    id: 'see3-475',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Ethics Scenarios',
    subtopic: 'Fee Splitting',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A practitioner sharing fees with another party:',
    options: [
      'Is always prohibited',
      'Must only share with those who share in the responsibility and may not pay for client referrals',
      'Can pay referral fees freely',
      'Must share equally'
    ],
    correctAnswer: 1,
    explanation: 'Circular 230 §10.27 prohibits paying for referrals or sharing fees except with those who share responsibility for the work or within a firm. Referral fees to non-practitioners are generally prohibited.',
    reference: 'Circular 230 §10.27',
  },
  {
    id: 'see3-476',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Ethics Scenarios',
    subtopic: 'Advertising',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Enrolled agent advertising must be:',
    options: [
      'Approved by IRS before publication',
      'Not false, fraudulent, coercive, or misleading, and not make unsubstantiated claims',
      'Submitted to OPR annually',
      'Limited to business cards only'
    ],
    correctAnswer: 1,
    explanation: 'Under Circular 230 §10.30, practitioner advertising cannot be false, fraudulent, misleading, deceptive, or unduly influence a prospective client. No IRS pre-approval required, but practitioners are responsible for compliance.',
    reference: 'Circular 230 §10.30',
  },
  {
    id: 'see3-477',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Ethics Scenarios',
    subtopic: 'Incompetent Representation',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'If an EA is asked to handle a matter outside their competence:',
    options: [
      'They must always decline',
      'They may accept if they become competent through study or associate with someone competent',
      'They should always accept to help the client',
      'Competence is not considered under Circular 230'
    ],
    correctAnswer: 1,
    explanation: 'Under Circular 230 §10.35, practitioners must be competent to handle matters. If not initially competent, they may become so through reasonable preparation or associate with someone who is competent.',
    reference: 'Circular 230 §10.35',
  },
  {
    id: 'see3-478',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Ethics Scenarios',
    subtopic: 'Diligence',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Due diligence under Circular 230 requires practitioners to:',
    options: [
      'Only follow client instructions',
      'Exercise reasonable care in determining correctness of representations and avoiding unreasonable delays',
      'Verify every client statement personally',
      'Guarantee favorable outcomes'
    ],
    correctAnswer: 1,
    explanation: 'Circular 230 §10.22 requires due diligence in: (1) preparing documents, (2) determining correctness of oral or written statements, and (3) acting promptly without unreasonable delay in matters before the IRS.',
    reference: 'Circular 230 §10.22',
  },
  {
    id: 'see3-479',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Ethics Scenarios',
    subtopic: 'Third Party Information',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'When relying on information from third parties to prepare a return:',
    options: [
      'The practitioner has no responsibility for accuracy',
      'The practitioner may generally rely in good faith but cannot ignore obviously incorrect information',
      'All third party data must be independently verified',
      'Third party information cannot be used'
    ],
    correctAnswer: 1,
    explanation: 'Practitioners may rely in good faith without verification on information from clients and third parties. However, they cannot ignore information suggesting documents are incorrect or incomplete (§10.34).',
    reference: 'Circular 230 §10.34(d)',
  },
  {
    id: 'see3-480',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Ethics Scenarios',
    subtopic: 'Knowledge of Violations',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A practitioner who becomes aware of another practitioner\'s Circular 230 violation:',
    options: [
      'Must ignore it',
      'Is not required to report but may do so; must not assist in or further the violation',
      'Must immediately report to OPR',
      'Is personally liable for all violations'
    ],
    correctAnswer: 1,
    explanation: 'Circular 230 doesn\'t require practitioners to report other practitioners\' violations. However, practitioners must not assist violations and should not continue in matters where they know violations are occurring.',
    reference: 'Circular 230 §10.51',
  },
];

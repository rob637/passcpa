/**
 * EA SEE Part 3: Representation, Practices, and Procedures - Batch 12 (Q111-120)
 * Collection Due Process and Taxpayer Rights
 */

import { Question } from '../../../types';

export const SEE3_QUESTIONS_BATCH12: Question[] = [
  // ==========================================
  // SEE3: Collection Due Process
  // ==========================================
  {
    id: 'see3-111',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Collection Due Process',
    subtopic: 'CDP Overview',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Collection Due Process (CDP) hearings are available:',
    options: [
      'Before any collection notice is issued',
      'After a Notice of Federal Tax Lien filing or before levy action',
      'Only after tax is paid in full',
      'During the audit process'
    ],
    correctAnswer: 1,
    explanation: 'CDP rights arise after: (1) a Notice of Federal Tax Lien is filed (IRC §6320), or (2) a Final Notice of Intent to Levy is issued (IRC §6330). Taxpayers have 30 days to request a hearing.',
    reference: 'IRC §6320; IRC §6330',
  },
  {
    id: 'see3-112',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Collection Due Process',
    subtopic: 'CDP Hearing Issues',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'At a CDP hearing, the taxpayer can raise:',
    options: [
      'Only liability issues',
      'Appropriate spousal defenses, collection alternatives, and underlying liability if not previously contested',
      'Only collection alternatives',
      'No issues - it is informational only'
    ],
    correctAnswer: 1,
    explanation: 'At a CDP hearing, taxpayers may raise: spousal defenses, collection alternatives (installment agreement, OIC, CNC), and underlying liability if they had no prior opportunity to dispute it.',
    reference: 'IRC §6330(c)(2)',
  },
  {
    id: 'see3-113',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Collection Due Process',
    subtopic: 'Effect of CDP Request',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'When a timely CDP hearing is requested:',
    options: [
      'Collection continues while the hearing is pending',
      'Collection is suspended until the CDP determination is made',
      'The tax liability is automatically reduced',
      'Penalties are immediately waived'
    ],
    correctAnswer: 1,
    explanation: 'Filing a timely CDP request (within 30 days) suspends levy action and generally collection activity until the CDP determination is issued and any court petition period expires.',
    reference: 'IRC §6330(e)(1)',
  },
  {
    id: 'see3-114',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Collection Due Process',
    subtopic: 'Equivalent Hearing',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'An "equivalent hearing" differs from a CDP hearing in that:',
    options: [
      'It has the same rights as CDP',
      'It does not suspend collection and the determination is not appealable to Tax Court',
      'It requires full payment of tax',
      'It is conducted by the IRS Chief Counsel'
    ],
    correctAnswer: 1,
    explanation: 'An equivalent hearing (requested after 30 days but within 1 year) does not suspend collection action and the determination cannot be appealed to Tax Court, unlike a regular CDP hearing.',
    reference: 'Treas. Reg. §301.6330-1(i)',
  },
  {
    id: 'see3-115',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Taxpayer Rights',
    subtopic: 'Taxpayer Bill of Rights',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The Taxpayer Bill of Rights includes the right to:',
    options: [
      'Avoid all audits',
      'Be informed, quality service, pay no more than the correct amount, finality, and appeal',
      'Automatic tax liability reduction',
      'Unlimited extensions on all deadlines'
    ],
    correctAnswer: 1,
    explanation: 'The 10 taxpayer rights include: be informed, quality service, pay no more than correct amount, challenge IRS position, appeal, finality, privacy, confidentiality, retain representation, and a fair tax system.',
    reference: 'IRS Publication 1',
  },
  {
    id: 'see3-116',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Taxpayer Rights',
    subtopic: 'Taxpayer Advocate Service',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The Taxpayer Advocate Service (TAS) can assist when:',
    options: [
      'Every taxpayer requests assistance',
      'A taxpayer is experiencing a significant hardship or is not receiving timely response from IRS',
      'Only for wealthy taxpayers',
      'Only during criminal investigations'
    ],
    correctAnswer: 1,
    explanation: 'TAS helps taxpayers experiencing significant hardship, facing imminent adverse action, or not receiving timely resolution of issues through normal IRS channels. Contact via Form 911.',
    reference: 'IRC §7803(c)',
  },
  {
    id: 'see3-117',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Taxpayer Rights',
    subtopic: 'Burden of Proof',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Under IRC §7491, the burden of proof shifts to the IRS if the taxpayer:',
    options: [
      'Files a return',
      'Introduces credible evidence and meets substantiation and cooperation requirements',
      'Pays all tax due',
      'Waives appeal rights'
    ],
    correctAnswer: 1,
    explanation: 'Under §7491, burden of proof shifts to IRS if taxpayer produces credible evidence, maintains required records, substantiates items, and cooperates with reasonable IRS requests.',
    reference: 'IRC §7491',
  },
  {
    id: 'see3-118',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Taxpayer Rights',
    subtopic: 'Recording Interviews',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A taxpayer has the right to make an audio recording of an IRS interview if:',
    options: [
      'Never - recording is prohibited',
      'The taxpayer provides 10 days advance notice',
      'Only with IRS permission',
      'Only in Appeals'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §7521, taxpayers may record in-person interviews with 10 days advance written notice. The IRS may also record if they provide 10 days notice and provide a copy.',
    reference: 'IRC §7521(a)',
  },
  {
    id: 'see3-119',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Taxpayer Rights',
    subtopic: 'Right to Representation',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'During an IRS interview, a taxpayer has the right to:',
    options: [
      'Refuse all questions',
      'Suspend the interview to consult with a representative',
      'Demand the interview be conducted at their home',
      'Record without notice'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §7521(b)(2), if at any point during an interview the taxpayer clearly requests to consult with a representative, the interview must be suspended.',
    reference: 'IRC §7521(b)(2)',
  },
  {
    id: 'see3-120',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Taxpayer Rights',
    subtopic: 'Prohibition on Harassment',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'IRS employees are prohibited from:',
    options: [
      'Contacting taxpayers at all',
      'Using their positions to harass or intimidate taxpayers',
      'Issuing any notices',
      'Conducting audits'
    ],
    correctAnswer: 1,
    explanation: 'IRC §7804(b) prohibits IRS employees from using their authority to harass or intimidate taxpayers. Violations can result in disciplinary action and taxpayers can report misconduct.',
    reference: 'IRC §7804(b)',
  },
];

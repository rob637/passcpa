/**
 * EA SEE Part 3: Representation, Practices, and Procedures - Questions Batch 9 (Q81-90)
 */

import { Question } from '../../../types';

export const SEE3_QUESTIONS_BATCH9: Question[] = [
  // ==========================================
  // SEE3-1 & SEE3-2: Practices and Representation (Additional)
  // ==========================================
  {
    id: 'see3-081',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Circular 230',
    subtopic: 'Return of Client Records',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'If a practitioner believes a client provided false information for a return already filed, the practitioner should:',
    options: [
      'Immediately file an amended return without client consent',
      'Advise the client of the consequences and recommend corrective action',
      'Report the client to the IRS',
      'Continue filing future returns without addressing the issue'
    ],
    correctAnswer: 1,
    explanation: 'The practitioner must advise the client of the consequences of the error and recommend corrective action. The practitioner cannot file an amended return without client authorization but may need to withdraw if the client refuses to correct.',
    reference: 'Circular 230 §10.21',
  },
  {
    id: 'see3-082',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Power of Attorney',
    subtopic: 'CAF Number',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A CAF number is:',
    options: [
      'The same as a PTIN',
      'A unique number assigned to representatives authorized to practice before the IRS',
      'Required only for attorneys',
      'The case number for an audit'
    ],
    correctAnswer: 1,
    explanation: 'A CAF (Centralized Authorization File) number is a unique identification number assigned to practitioners and representatives who file Forms 2848 or 8821. It helps the IRS track authorizations.',
    reference: 'IRS Publication 947',
  },
  {
    id: 'see3-083',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Tax Return Positions',
    subtopic: 'Reasonable Basis',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A tax return position has a "reasonable basis" if:',
    options: [
      'The practitioner thinks it might work',
      'It is significantly higher than not frivolous and based on one or more authorities',
      'At least 50% of practitioners would agree',
      'The IRS has issued a ruling supporting it'
    ],
    correctAnswer: 1,
    explanation: 'Reasonable basis is relatively high compared to "not frivolous" (roughly 20% chance of success). It requires reliance on one or more authorities. It is lower than substantial authority or more likely than not.',
    reference: 'Treas. Reg. §1.6662-3(b)(3)',
  },
  {
    id: 'see3-084',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Practitioner Conduct',
    subtopic: 'Required Knowledge',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A practitioner must not sign a return if they know the return:',
    options: [
      'Contains any estimated figures',
      'Contains a position that lacks a reasonable basis',
      'Will result in a refund',
      'Is being filed electronically'
    ],
    correctAnswer: 1,
    explanation: 'A practitioner may not sign a return if any position lacks a reasonable basis (disclosed) or substantial authority (undisclosed). Estimated figures are acceptable if reasonable.',
    reference: 'Circular 230 §10.34',
  },
  {
    id: 'see3-085',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'E-Services',
    subtopic: 'Transcript Delivery System',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The IRS Transcript Delivery System (TDS) allows practitioners to:',
    options: [
      'File returns electronically',
      'Obtain client tax account and return transcripts online',
      'Represent clients in court',
      'Request penalty abatement'
    ],
    correctAnswer: 1,
    explanation: 'TDS is an e-Services tool that allows authorized practitioners to view and obtain tax transcripts for specific clients for specific tax years. It requires a valid power of attorney on file.',
    reference: 'IRS e-Services',
  },

  // ==========================================
  // SEE3-5: Penalties (Additional)
  // ==========================================
  {
    id: 'see3-086',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-5',
    topic: 'Frivolous Return Penalty',
    subtopic: 'Frivolous Arguments',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The penalty for filing a frivolous tax return is:',
    options: [
      '$500',
      '$1,000',
      '$5,000',
      '$10,000'
    ],
    correctAnswer: 2,
    explanation: 'The frivolous return penalty is $5,000 for filing a return that does not include enough information to determine liability or is based on a frivolous position. Common frivolous arguments are listed by the IRS.',
    reference: 'IRC §6702',
  },
  {
    id: 'see3-087',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-5',
    topic: 'Information Return Penalties',
    subtopic: 'Failure to File W-2s',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The penalty for failure to file correct information returns (such as Forms W-2 or 1099) can be:',
    options: [
      '$10 per return',
      'Up to $310 per return for 2024, with increased maximums',
      '$1,000 flat fee',
      'No penalty applies'
    ],
    correctAnswer: 1,
    explanation: 'The penalty for failure to file correct information returns ranges from $60 to $310 per return depending on how late corrections are made. Annual maximum limits apply, with smaller maximums for small businesses.',
    reference: 'IRC §6721',
  },
  {
    id: 'see3-088',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-5',
    topic: 'Negligence',
    subtopic: 'Definition',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'For purposes of the accuracy-related penalty, negligence includes:',
    options: [
      'Making an honest mistake',
      'Failure to make a reasonable attempt to comply with the tax laws or to keep adequate records',
      'Taking a position with substantial authority',
      'Filing an extension'
    ],
    correctAnswer: 1,
    explanation: 'Negligence is any failure to make a reasonable attempt to comply with tax law provisions or to exercise ordinary and reasonable care in return preparation. Carelessness and disregard of rules also constitute negligence.',
    reference: 'IRC §6662(c); Treas. Reg. §1.6662-3',
  },

  // ==========================================
  // SEE3-6: Appeals (Additional)
  // ==========================================
  {
    id: 'see3-089',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-6',
    topic: 'Appeals Conferences',
    subtopic: 'Ex Parte Communications',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Ex parte communications between Appeals and other IRS employees:',
    options: [
      'Are encouraged to resolve cases quickly',
      'Are generally prohibited to ensure Appeals\' independence',
      'Are required in all cases',
      'Are only allowed in criminal cases'
    ],
    correctAnswer: 1,
    explanation: 'Ex parte communications are prohibited to maintain Appeals\' independence. Appeals cannot have one-sided communications with IRS examination or collection about the merits of the case without the taxpayer present.',
    reference: 'Rev. Proc. 2012-18',
  },
  {
    id: 'see3-090',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-6',
    topic: 'Notice of Deficiency',
    subtopic: '90-Day Letter',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A Notice of Deficiency (90-day letter) is:',
    options: [
      'A request for additional documentation',
      'The IRS\'s formal determination of additional tax owed, giving the taxpayer 90 days to petition Tax Court',
      'A notice that an audit has begun',
      'A confirmation of a refund'
    ],
    correctAnswer: 1,
    explanation: 'The Notice of Deficiency is the IRS\'s formal statutory notice of proposed additional tax. It gives the taxpayer 90 days (150 days if addressed outside the U.S.) to petition the Tax Court before assessment.',
    reference: 'IRC §6212; IRC §6213',
  },
];

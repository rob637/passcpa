/**
 * EA SEE Part 3: Representation, Practices, and Procedures - Questions Batch 1 (Q1-10)
 * 
 * Blueprint Areas:
 * - SEE3-1: Practices and Procedures (25-35%)
 * - SEE3-2: Representation Before the IRS (20-25%)
 * - SEE3-3: Specific Areas of Representation (15-20%)
 * - SEE3-4: Filing Requirements (10-15%)
 * - SEE3-5: Penalties and Interest (10-15%)
 * - SEE3-6: Appeals (10-15%)
 * - SEE3-7: Collection Procedures (10-15%)
 */

import { Question } from '../../../types';

export const SEE3_QUESTIONS_BATCH1: Question[] = [
  // ==========================================
  // SEE3-1: Practices and Procedures
  // ==========================================
  {
    id: 'see3-001',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Power of Attorney',
    subtopic: 'Form 2848',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Form 2848, Power of Attorney and Declaration of Representative, is used to:',
    options: [
      'Request a tax refund',
      'Authorize a representative to act on behalf of a taxpayer before the IRS',
      'File an amended return',
      'Request penalty abatement'
    ],
    correctAnswer: 1,
    explanation: 'Form 2848 authorizes an individual to represent a taxpayer before the IRS. It allows the representative to receive confidential tax information, sign agreements, and take other actions on behalf of the taxpayer.',
    reference: 'Form 2848 Instructions',
  },
  {
    id: 'see3-002',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Tax Information Authorization',
    subtopic: 'Form 8821',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Form 8821, Tax Information Authorization, allows an individual to:',
    options: [
      'Represent the taxpayer in an audit',
      'Receive and inspect confidential tax information but not represent the taxpayer',
      'Sign returns on behalf of the taxpayer',
      'Negotiate offers in compromise'
    ],
    correctAnswer: 1,
    explanation: 'Form 8821 allows a designee to receive and inspect confidential tax information. Unlike Form 2848, it does not authorize the designee to represent the taxpayer or perform other actions before the IRS.',
    reference: 'Form 8821 Instructions',
  },
  {
    id: 'see3-003',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Centralized Authorization File',
    subtopic: 'CAF System',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The Centralized Authorization File (CAF) is:',
    options: [
      'A list of all tax preparers',
      'A computer database containing representative authorization information',
      'The IRS criminal investigations database',
      'A filing system for paper returns'
    ],
    correctAnswer: 1,
    explanation: 'The CAF is an IRS computer database that contains information about representative authorizations. When Form 2848 or 8821 is processed, the authorization is recorded in the CAF system.',
    reference: 'IRS Publication 947',
  },
  {
    id: 'see3-004',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Power of Attorney',
    subtopic: 'Revocation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A power of attorney is automatically revoked when:',
    options: [
      'The tax return is filed',
      'The taxpayer files a new Form 2848 for the same matters without checking the box to add representative',
      'The tax year ends',
      'The representative changes addresses'
    ],
    correctAnswer: 1,
    explanation: 'A new Form 2848 for the same tax matters revokes prior powers of attorney unless the taxpayer specifically indicates they want to add the new representative without revoking the existing ones.',
    reference: 'Form 2848 Instructions',
  },
  {
    id: 'see3-005',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Practitioner Responsibilities',
    subtopic: 'Due Diligence',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Due diligence requirements for paid preparers claiming EITC, CTC, AOTC, or HOH status include:',
    options: [
      'No special requirements beyond normal preparation',
      'Completing Form 8867 and retaining documentation',
      'Obtaining IRS approval before claiming these credits',
      'Notifying the IRS within 30 days of preparing the return'
    ],
    correctAnswer: 1,
    explanation: 'Paid preparers must complete Form 8867 (Paid Preparer\'s Due Diligence Checklist), retain required documentation, and meet knowledge and inquiry requirements when claiming EITC, CTC, AOTC, or HOH status.',
    reference: 'IRC §6695(g); Form 8867',
  },

  // ==========================================
  // SEE3-2: Representation Before the IRS
  // ==========================================
  {
    id: 'see3-006',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Who May Practice',
    subtopic: 'Practice Before IRS',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Which of the following individuals may practice before the IRS without restriction?',
    options: [
      'Any college graduate',
      'Attorneys, CPAs, and Enrolled Agents',
      'Only attorneys',
      'Any tax return preparer'
    ],
    correctAnswer: 1,
    explanation: 'Attorneys, CPAs, and Enrolled Agents have unlimited practice rights before the IRS. They can represent clients on any tax matter before any IRS office. Other practitioners have limited rights.',
    reference: 'Circular 230 §10.3',
  },
  {
    id: 'see3-007',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Who May Practice',
    subtopic: 'Enrolled Agents',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'An Enrolled Agent earns their status by:',
    options: [
      'Passing the CPA Exam',
      'Passing the Special Enrollment Examination (SEE) or having relevant IRS experience',
      'Graduating from law school',
      'Working for a tax preparation company for 5 years'
    ],
    correctAnswer: 1,
    explanation: 'Individuals become Enrolled Agents by passing the three-part SEE or by having at least 5 years of past IRS employment that qualifies them for enrollment. EAs must also pass a background check.',
    reference: 'Circular 230 §10.4',
  },
  {
    id: 'see3-008',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Circular 230',
    subtopic: 'Standards of Conduct',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Circular 230 governs:',
    options: [
      'Only Enrolled Agents',
      'Practice before the IRS by attorneys, CPAs, EAs, and other practitioners',
      'Only IRS employees',
      'Tax court procedures'
    ],
    correctAnswer: 1,
    explanation: 'Circular 230 (31 CFR Part 10) contains the rules governing the practice of attorneys, CPAs, Enrolled Agents, enrolled retirement plan agents, and other persons before the IRS.',
    reference: 'Circular 230',
  },
  {
    id: 'see3-009',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Who May Practice',
    subtopic: 'Limited Practice',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An Annual Filing Season Program (AFSP) participant may:',
    options: [
      'Represent clients in all IRS matters',
      'Represent clients only before revenue agents, customer service, and the Taxpayer Advocate',
      'Represent clients before IRS Appeals',
      'Practice without any restrictions'
    ],
    correctAnswer: 1,
    explanation: 'AFSP participants have limited representation rights. They can represent clients before IRS revenue agents, customer service representatives, and the Taxpayer Advocate Service. They cannot represent clients in Appeals or Collections.',
    reference: 'Circular 230 §10.7',
  },
  {
    id: 'see3-010',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Conflicts of Interest',
    subtopic: 'Representation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A practitioner may represent clients with conflicting interests if:',
    options: [
      'Representation is never allowed when conflicts exist',
      'The practitioner reasonably believes they can provide competent representation and obtains written consent',
      'The fee is disclosed to both parties',
      'The representation is limited to 6 months'
    ],
    correctAnswer: 1,
    explanation: 'Practitioners may represent conflicting interests if they reasonably believe competent representation is possible and each affected client gives informed written consent within 30 days.',
    reference: 'Circular 230 §10.29',
  },
];

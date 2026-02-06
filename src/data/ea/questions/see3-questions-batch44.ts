/**
 * EA SEE Part 3: Representation, Practices, and Procedures - Batch 44 (Q431-440)
 * Specific IRS Forms & Representation Scenarios
 */

import { Question } from '../../../types';

export const SEE3_QUESTIONS_BATCH44: Question[] = [
  // ==========================================
  // SEE3: Forms & Representation Scenarios
  // ==========================================
  {
    id: 'see3-431',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'IRS Forms',
    subtopic: 'Form 843',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Form 843 (Claim for Refund and Request for Abatement) is used for:',
    options: [
      'Filing original returns',
      'Requesting refund of penalties, fees, or certain taxes, or abatement of certain assessed amounts',
      'Power of attorney only',
      'Extension requests'
    ],
    correctAnswer: 1,
    explanation: 'Form 843 is used to claim refund of erroneously assessed taxes, penalties, or fees that cannot be claimed on standard amended returns. Also used for penalty abatement requests.',
    reference: 'Form 843 Instructions',
  },
  {
    id: 'see3-432',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'IRS Forms',
    subtopic: 'Form 656',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Form 656 (Offer in Compromise) requires:',
    options: [
      'Only the taxpayer\'s name',
      'Complete financial disclosure, proposed payment terms, and an application fee (with some exceptions)',
      'No documentation',
      'Only the tax amount owed'
    ],
    correctAnswer: 1,
    explanation: 'Form 656 requires detailed financial information (Form 433-A or 433-B), proposed payment amount and terms, application fee ($205 in 2024, waived for low-income), and initial payment unless waived.',
    reference: 'Form 656; Form 656-B (Booklet)',
  },
  {
    id: 'see3-433',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'IRS Forms',
    subtopic: 'Form 12153',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Form 12153 (Request for Collection Due Process Hearing) must be filed:',
    options: [
      'Any time',
      'Within 30 days of the date of the lien or levy notice to preserve judicial review rights',
      'Within 1 year',
      'Before any notice is issued'
    ],
    correctAnswer: 1,
    explanation: 'Form 12153 must be filed within 30 days of the CDP notice date to preserve full CDP rights including Tax Court review. After 30 days (up to 1 year), only equivalent hearing (no Tax Court review) is available.',
    reference: 'IRC §6320(b); IRC §6330(b); Form 12153',
  },
  {
    id: 'see3-434',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'IRS Forms',
    subtopic: 'Form 9423',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Form 9423 (Collection Appeal Request) is used for:',
    options: [
      'Audit appeals only',
      'CAP (Collection Appeals Program) requests regarding liens, levies, or seizures',
      'Penalty abatement',
      'Tax Court petitions'
    ],
    correctAnswer: 1,
    explanation: 'Form 9423 is used to request CAP review of collection actions. Unlike CDP, CAP has no deadline, doesn\'t require Notice of Federal Tax Lien or Final Notice, but doesn\'t provide Tax Court review.',
    reference: 'Form 9423; IRM 5.1.9',
  },
  {
    id: 'see3-435',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Representation Scenarios',
    subtopic: 'Substitute for Return',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'When the IRS prepares a Substitute for Return (SFR) for a non-filer:',
    options: [
      'The taxpayer has no options',
      'The taxpayer can file an original return to replace the SFR, usually getting better results',
      'The SFR is always accurate',
      'The SFR cannot be changed'
    ],
    correctAnswer: 1,
    explanation: 'SFRs use available information (W-2s, 1099s) without deductions or credits. Taxpayers should file original returns claiming proper deductions, exemptions, and credits to potentially reduce the assessed liability.',
    reference: 'IRM 4.12; IRC §6020(b)',
  },
  {
    id: 'see3-436',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Representation Scenarios',
    subtopic: 'Non-Filer Representation',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'When representing a client who hasn\'t filed returns for multiple years:',
    options: [
      'Only file the most recent year',
      'Determine which years need filing based on IRS requirements and work with IRS on a compliance plan',
      'Ignore unfiled years',
      'File all years back to 1980'
    ],
    correctAnswer: 1,
    explanation: 'IRS generally requires 6 years of returns for compliance. The practitioner should: (1) determine which years are needed, (2) gather records, (3) prepare accurate returns, and (4) work with IRS on resolution.',
    reference: 'IRM 1.2.13.1.7; Policy Statement 5-133',
  },
  {
    id: 'see3-437',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Representation Scenarios',
    subtopic: 'Deceased Taxpayer',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'When representing the estate of a deceased taxpayer:',
    options: [
      'No representative is needed',
      'Form 56 (Notice of Fiduciary Relationship) should be filed, and the executor/administrator has authority',
      'Only the spouse can represent',
      'The IRS closes all cases automatically'
    ],
    correctAnswer: 1,
    explanation: 'Form 56 notifies IRS of a fiduciary relationship. The personal representative (executor/administrator) has authority to sign returns and represent the estate. Letters testamentary may be required.',
    reference: 'Form 56; Pub 559',
  },
  {
    id: 'see3-438',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Representation Scenarios',
    subtopic: 'Bankrupt Taxpayer',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'When a client files bankruptcy:',
    options: [
      'All tax debts are always discharged',
      'An automatic stay generally stops IRS collection, but not all tax debts are dischargeable',
      'The IRS ignores bankruptcy',
      'Only Chapter 7 affects taxes'
    ],
    correctAnswer: 1,
    explanation: 'Bankruptcy triggers an automatic stay stopping most collection. However, tax debts are only dischargeable if they meet strict criteria (old enough, returns filed, assessed long enough ago). Priority taxes aren\'t dischargeable.',
    reference: '11 USC §507; 11 USC §523',
  },
  {
    id: 'see3-439',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Representation Scenarios',
    subtopic: 'Identity Theft',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'When a client is a victim of tax-related identity theft:',
    options: [
      'Nothing can be done',
      'File Form 14039 (Identity Theft Affidavit) and work with IRS Identity Protection Specialized Unit',
      'Pay the fraudulent assessment',
      'File a new return only'
    ],
    correctAnswer: 1,
    explanation: 'Victims should: (1) file Form 14039, (2) contact IPSU (Identity Protection Specialized Unit), (3) continue filing returns (by paper if necessary), and (4) obtain an IP PIN for future protection.',
    reference: 'Form 14039; Pub 5027',
  },
  {
    id: 'see3-440',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Representation Scenarios',
    subtopic: 'Foreign Account Issues',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A client who failed to file FBARs (FinCEN 114) for foreign accounts:',
    options: [
      'Has no exposure',
      'May face significant penalties but may qualify for streamlined or delinquent procedures',
      'Must always pay 50% penalties',
      'Should never disclose'
    ],
    correctAnswer: 1,
    explanation: 'FBAR penalties can be severe (up to $100,000+ per willful violation). However, IRS offers voluntary disclosure programs, streamlined procedures, and delinquent FBAR filing procedures for qualifying taxpayers.',
    reference: '31 USC §5321; IRM 4.26.16',
  },
];

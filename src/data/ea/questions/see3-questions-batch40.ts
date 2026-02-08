/**
 * EA SEE Part 3: Representation, Practices, and Procedures - Batch 40 (Q391-400)
 * Tax Shelter Rules & Practitioner-Client Relationship
 */

import { Question } from '../../../types';

export const SEE3_QUESTIONS_BATCH40: Question[] = [
  // ==========================================
  // SEE3: Tax Shelters & Client Relations
  // ==========================================
  {
    id: 'see3-391',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Tax Shelters',
    subtopic: 'Listed Transactions',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A "listed transaction" is:',
    options: [
      'Any tax shelter investment',
      'A transaction specifically identified by IRS as a tax avoidance transaction',
      'Any investment with more than 10 investors',
      'Any real estate syndication'
    ],
    correctAnswer: 1,
    explanation: 'A listed transaction is one that the IRS has specifically identified as a tax avoidance transaction and included in IRS Notice 2009-59 or published guidance. These carry enhanced disclosure and penalty rules.',
    reference: 'IRC §6707A; IRM 4.32.2',
  },
  {
    id: 'see3-392',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Tax Shelters',
    subtopic: 'Reportable Transactions',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Categories of reportable transactions include:',
    options: [
      'Only listed transactions',
      'Listed, confidential, contractual protection, loss, and transactions of interest',
      'Any deduction over $10,000',
      'Only foreign transactions'
    ],
    correctAnswer: 1,
    explanation: 'There are five categories of reportable transactions: (1) listed transactions, (2) confidential transactions, (3) transactions with contractual protection, (4) loss transactions meeting dollar thresholds, and (5) transactions of interest.',
    reference: 'Treas. Reg. §1.6011-4(b)',
  },
  {
    id: 'see3-393',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Tax Shelters',
    subtopic: 'Promoter Penalties',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Penalties for promoting abusive tax shelters under IRC §6700:',
    options: [
      'Do not exist',
      'Equal the lesser of $1,000 or 100% of gross income from the activity (for tax shelters)',
      'Are criminal only',
      'Only apply to attorneys'
    ],
    correctAnswer: 1,
    explanation: 'IRC §6700 imposes penalties on abusive tax shelter promoters. For tax shelter promotions, the penalty is the lesser of $1,000 or 100% of gross income. For gross valuation overstatements, it\'s 50% of gross income.',
    reference: 'IRC §6700',
  },
  {
    id: 'see3-394',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Tax Shelters',
    subtopic: 'Material Advisor',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A material advisor to a reportable transaction must:',
    options: [
      'Do nothing special',
      'File Form 8918 with the IRS and maintain list of investors',
      'Only advise clients to disclose',
      'Report to state authorities only'
    ],
    correctAnswer: 1,
    explanation: 'Material advisors must file Form 8918 disclosing the transaction within the time prescribed and maintain a list of advisees for potential IRS inquiry. Failure carries significant penalties under IRC §6111-6112.',
    reference: 'IRC §6111; IRC §6112',
  },
  {
    id: 'see3-395',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Client Relationship',
    subtopic: 'Client Communications',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Under Circular 230, practitioners must:',
    options: [
      'Never give bad news to clients',
      'Promptly submit records requested and respond to proper IRS communications',
      'Handle all client mail personally',
      'Respond to IRS within 24 hours'
    ],
    correctAnswer: 1,
    explanation: 'Circular 230 §10.23 requires practitioners to promptly submit records or information properly requested by the IRS and to exercise due diligence in preparing, approving, and filing documents.',
    reference: 'Circular 230 §10.23',
  },
  {
    id: 'see3-396',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Client Relationship',
    subtopic: 'Client Funds',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'If a practitioner receives client funds for tax payment:',
    options: [
      'The funds can be deposited in the practitioner\'s general account',
      'The funds must be deposited in client trust accounts and disbursed promptly',
      'No special rules apply',
      'Only cash transactions are regulated'
    ],
    correctAnswer: 1,
    explanation: 'Client funds must be placed in identifiable accounts and disbursed promptly. Circular 230 §10.23 and ethical requirements mandate trust account handling to protect client assets.',
    reference: 'Circular 230 §10.23',
  },
  {
    id: 'see3-397',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Client Relationship',
    subtopic: 'Return of Client Records',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'When a client requests their records, the practitioner:',
    options: [
      'Can keep them indefinitely as work product',
      'Must generally return client-provided records promptly upon request',
      'Can charge any amount for return',
      'Never has to return records'
    ],
    correctAnswer: 1,
    explanation: 'Practitioners generally must return client records promptly upon request. While work papers may be withheld depending on state law, client-provided original documents belong to the client.',
    reference: 'Circular 230 §10.28',
  },
  {
    id: 'see3-398',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Client Relationship',
    subtopic: 'Retaining Lien',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A practitioner\'s ability to retain client records for unpaid fees:',
    options: [
      'Is unlimited',
      'May be limited by state law, and generally doesn\'t apply to client-provided records',
      'Is absolute under federal law',
      'Only applies to corporations'
    ],
    correctAnswer: 1,
    explanation: 'Retaining liens on work product vary by state law. However, client-provided original documents generally must be returned. Many states prohibit liens that prejudice clients\' interests.',
    reference: 'Circular 230 §10.28; State law',
  },
  {
    id: 'see3-399',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Client Relationship',
    subtopic: 'Confidentiality',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Tax return information is protected under:',
    options: [
      'No laws',
      'IRC §7216 (preparer disclosure) and §6713 (civil penalty) plus privacy laws',
      'Only HIPAA',
      'Only state laws'
    ],
    correctAnswer: 1,
    explanation: 'IRC §7216 makes unauthorized disclosure or use of tax return information a crime (fine up to $1,000 and/or 1 year). IRC §6713 adds civil penalty of $250 per disclosure (up to $10,000/year).',
    reference: 'IRC §7216; IRC §6713',
  },
  {
    id: 'see3-400',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Client Relationship',
    subtopic: 'Consent to Disclosure',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A tax preparer may disclose return information to a third party:',
    options: [
      'Anytime',
      'Only with client\s explicit written consent that meets regulatory requirements',
      'Only to the IRS',
      'Never under any circumstances'
    ],
    correctAnswer: 1,
    explanation: 'Disclosure requires written consent from the taxpayer that meets the requirements of Treas. Reg. §301.7216-3. The consent must be knowing and voluntary and identify the information to be disclosed.',
    reference: 'Treas. Reg. §301.7216-3',
  },
];

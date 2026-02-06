/**
 * EA SEE Part 3: Representation, Practices, and Procedures - Batch 21 (Q201-210)
 * Criminal vs Civil Tax Issues
 */

import { Question } from '../../../types';

export const SEE3_QUESTIONS_BATCH21: Question[] = [
  // ==========================================
  // SEE3: Criminal vs Civil Tax Issues
  // ==========================================
  {
    id: 'see3-201',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Criminal vs Civil',
    subtopic: 'Burden of Proof',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'In criminal tax cases, the government must prove its case:',
    options: [
      'By a preponderance of the evidence',
      'Beyond a reasonable doubt',
      'By clear and convincing evidence',
      'By probable cause'
    ],
    correctAnswer: 1,
    explanation: 'Criminal tax cases require the government to prove guilt "beyond a reasonable doubt" - the highest standard of proof. Civil cases use the lower "preponderance of the evidence" standard.',
    reference: 'U.S. Constitution, 5th & 6th Amendments',
  },
  {
    id: 'see3-202',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Criminal vs Civil',
    subtopic: 'Tax Evasion',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Tax evasion under IRC §7201 requires proof of:',
    options: [
      'Simple negligence',
      'Willfulness - intentional violation of a known legal duty',
      'Any underpayment',
      'Mathematical error'
    ],
    correctAnswer: 1,
    explanation: 'Tax evasion is a felony requiring willfulness - the voluntary, intentional violation of a known legal duty. Mere negligence or honest mistakes do not constitute evasion.',
    reference: 'IRC §7201',
  },
  {
    id: 'see3-203',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Criminal vs Civil',
    subtopic: 'Tax Evasion Penalty',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The maximum penalty for tax evasion (IRC §7201) is:',
    options: [
      '$10,000 fine and 1 year imprisonment',
      '$250,000 fine and 5 years imprisonment (per count)',
      '$1,000 fine only',
      'Civil penalty only'
    ],
    correctAnswer: 1,
    explanation: 'Tax evasion is a felony punishable by up to $250,000 fine ($500,000 for corporations) and up to 5 years imprisonment per count, plus costs of prosecution.',
    reference: 'IRC §7201',
  },
  {
    id: 'see3-204',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Criminal vs Civil',
    subtopic: 'Fraud Penalty',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The civil fraud penalty is:',
    options: [
      '20% of the underpayment',
      '75% of the underpayment attributable to fraud',
      '50% of tax owed',
      '100% of unpaid tax'
    ],
    correctAnswer: 1,
    explanation: 'The civil fraud penalty under IRC §6663 is 75% of the portion of the underpayment attributable to fraud. This is separate from and can be in addition to criminal prosecution.',
    reference: 'IRC §6663',
  },
  {
    id: 'see3-205',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Criminal vs Civil',
    subtopic: 'Fraud Statute of Limitations',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'In cases of fraud:',
    options: [
      'The normal 3-year statute applies',
      'There is no statute of limitations for assessment',
      'A 6-year statute applies',
      'The statute is 10 years'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §6501(c)(1), if there is a false or fraudulent return with intent to evade tax, the tax may be assessed at any time - there is no statute of limitations.',
    reference: 'IRC §6501(c)(1)',
  },
  {
    id: 'see3-206',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Criminal vs Civil',
    subtopic: 'Filing False Return',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Making and subscribing a false return (IRC §7206(1)) is punishable by:',
    options: [
      'Civil penalty only',
      'Up to $250,000 fine and 3 years imprisonment (felony)',
      'Up to $100,000 fine and 1 year imprisonment',
      'Warning letter only'
    ],
    correctAnswer: 1,
    explanation: 'Filing a false return under IRC §7206(1) is a felony punishable by up to $250,000 ($500,000 for corporations) fine and up to 3 years imprisonment.',
    reference: 'IRC §7206(1)',
  },
  {
    id: 'see3-207',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Criminal vs Civil',
    subtopic: 'Failure to File',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Willful failure to file a return (IRC §7203) is:',
    options: [
      'Not a crime',
      'A misdemeanor punishable by up to $25,000 fine and 1 year imprisonment',
      'A felony with 5 years imprisonment',
      'Only a civil penalty'
    ],
    correctAnswer: 1,
    explanation: 'Willful failure to file is a misdemeanor under IRC §7203, punishable by up to $25,000 fine ($100,000 for corporations) and up to 1 year imprisonment, plus costs.',
    reference: 'IRC §7203',
  },
  {
    id: 'see3-208',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Criminal vs Civil',
    subtopic: 'Badges of Fraud',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Which is considered a "badge of fraud"?',
    options: [
      'Filing for an extension',
      'Maintaining a double set of books',
      'Taking standard deductions',
      'Using tax preparation software'
    ],
    correctAnswer: 1,
    explanation: 'Badges of fraud include: double set of books, false invoices, personal expenses as business, unexplained increases in net worth, substantial understatement, destruction of records, and fictitious transactions.',
    reference: 'IRM 25.1.1.4',
  },
  {
    id: 'see3-209',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Criminal vs Civil',
    subtopic: 'CI Investigations',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'IRS Criminal Investigation (CI) differs from civil audit in that CI:',
    options: [
      'Only reviews return accuracy',
      'Investigates potential criminal violations with focus on prosecution',
      'Cannot recommend prosecution',
      'Only handles collection matters'
    ],
    correctAnswer: 1,
    explanation: 'IRS Criminal Investigation (CI) investigates potential criminal tax violations. Unlike civil audits focused on assessment, CI investigations aim at criminal prosecution referrals.',
    reference: 'IRS CI Overview',
  },
  {
    id: 'see3-210',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Criminal vs Civil',
    subtopic: 'Parallel Proceedings',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The IRS may pursue:',
    options: [
      'Only civil or criminal proceedings, not both',
      'Civil and criminal proceedings simultaneously or consecutively',
      'Criminal proceedings only after civil are complete',
      'Civil proceedings only after acquittal'
    ],
    correctAnswer: 1,
    explanation: 'The IRS can pursue both civil and criminal remedies. They may run parallel investigations, or proceed civilly after criminal proceedings conclude. Criminal acquittal does not preclude civil liability.',
    reference: 'IRM 25.1.1',
  },
];

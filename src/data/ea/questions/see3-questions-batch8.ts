/**
 * EA SEE Part 3: Representation, Practices, and Procedures - Questions Batch 8 (Q71-80)
 */

import { Question } from '../../../types';

export const SEE3_QUESTIONS_BATCH8: Question[] = [
  // ==========================================
  // SEE3-3: Specific Areas (Additional)
  // ==========================================
  {
    id: 'see3-071',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'IRS Summons',
    subtopic: 'Summons Authority',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The IRS has the authority to summon:',
    options: [
      'Only taxpayers',
      'Any person who may have information relevant to a tax matter',
      'Only accountants and attorneys',
      'Only businesses'
    ],
    correctAnswer: 1,
    explanation: 'IRC §7602 authorizes the IRS to summon any person who may have information relevant to determining a tax liability. This includes taxpayers, third parties, banks, employers, and others.',
    reference: 'IRC §7602',
  },
  {
    id: 'see3-072',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'IRS Summons',
    subtopic: 'Third-Party Summons',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'When the IRS issues a third-party summons, the taxpayer must be notified:',
    options: [
      'Immediately by phone',
      'Within 3 days of issuing the summons, at least 23 days before examination',
      'After the third party responds',
      'Only if the taxpayer requests notification'
    ],
    correctAnswer: 1,
    explanation: 'The IRS must notify the taxpayer of a third-party summons within 3 days of issuing it and at least 23 days before the date fixed for examination, giving the taxpayer time to intervene.',
    reference: 'IRC §7609',
  },
  {
    id: 'see3-073',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Taxpayer Rights',
    subtopic: 'Taxpayer Bill of Rights',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The Taxpayer Bill of Rights includes the right to:',
    options: [
      'Avoid paying any taxes',
      'Quality service, privacy, and a fair and just tax system',
      'Unlimited extensions without penalty',
      'Ignore IRS correspondence'
    ],
    correctAnswer: 1,
    explanation: 'The Taxpayer Bill of Rights includes 10 rights: be informed, quality service, pay no more than correct amount, challenge IRS position, appeal, finality, privacy, confidentiality, retain representation, and fair/just tax system.',
    reference: 'IRC §7803(a)(3)',
  },
  {
    id: 'see3-074',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Examinations',
    subtopic: 'Repetitive Audit',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A taxpayer may claim protection from repetitive audits if:',
    options: [
      'They have never been audited before',
      'They were examined in either of the 2 preceding years with no change or only small changes',
      'They use the same CPA each year',
      'They file electronically'
    ],
    correctAnswer: 1,
    explanation: 'Taxpayers may be protected from repetitive examinations if they were examined for the same items in either of the two preceding years and the examination resulted in no change or only a small tax change.',
    reference: 'IRS Publication 556',
  },
  {
    id: 'see3-075',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Innocent Spouse Relief',
    subtopic: 'Types of Relief',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Innocent spouse relief under IRC §6015 may be available when:',
    options: [
      'A spouse files separately',
      'There was an understatement of tax on a joint return attributable to the other spouse\'s erroneous items',
      'Both spouses contributed equally to the underpayment',
      'The marriage lasted less than one year'
    ],
    correctAnswer: 1,
    explanation: 'Innocent spouse relief is available when a joint return has an understatement of tax due to the other spouse\'s erroneous items. The requesting spouse must not have known of the understatement.',
    reference: 'IRC §6015',
  },

  // ==========================================
  // SEE3-7: Collection (Additional)
  // ==========================================
  {
    id: 'see3-076',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-7',
    topic: 'Currently Not Collectible',
    subtopic: 'CNC Status',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Currently Not Collectible (CNC) status means:',
    options: [
      'The tax debt is forgiven',
      'The IRS suspends collection activity because the taxpayer cannot pay',
      'The taxpayer must pay within 90 days',
      'The debt is discharged in bankruptcy'
    ],
    correctAnswer: 1,
    explanation: 'CNC status means the IRS temporarily suspends collection because the taxpayer cannot pay basic living expenses. The debt remains, interest continues to accrue, and the IRS may file a lien.',
    reference: 'IRM 5.16.1',
  },
  {
    id: 'see3-077',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-7',
    topic: 'Liens',
    subtopic: 'Lien Release',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A federal tax lien is automatically released when:',
    options: [
      'The taxpayer requests release',
      'The liability is fully paid, becomes legally unenforceable, or a release bond is accepted',
      '5 years have passed',
      'The taxpayer files bankruptcy'
    ],
    correctAnswer: 1,
    explanation: 'The IRS must release a lien within 30 days after the liability is satisfied, becomes legally unenforceable, or a bond is accepted. The lien is not automatically released by bankruptcy or time alone.',
    reference: 'IRC §6325',
  },
  {
    id: 'see3-078',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-7',
    topic: 'Liens',
    subtopic: 'Subordination',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Subordination of a federal tax lien means:',
    options: [
      'The lien is released',
      'The IRS allows another creditor\'s claim to take priority over the lien',
      'The taxpayer\'s assets are seized',
      'The lien amount is reduced'
    ],
    correctAnswer: 1,
    explanation: 'Subordination allows another creditor\'s interest to have priority over the federal tax lien. This may help a taxpayer refinance property if the refinance will ultimately benefit the government.',
    reference: 'IRC §6325(d)',
  },
  {
    id: 'see3-079',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-7',
    topic: 'Bankruptcy',
    subtopic: 'Tax Debt in Bankruptcy',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Income tax debt may be discharged in Chapter 7 bankruptcy if:',
    options: [
      'Any time after the return is filed',
      'The taxes are for a return due more than 3 years before filing, filed more than 2 years ago, and assessed more than 240 days ago',
      'The taxpayer has low income',
      'The tax debt exceeds $100,000'
    ],
    correctAnswer: 1,
    explanation: 'To be dischargeable in bankruptcy, income taxes generally must meet the 3-2-240 rule: the return was due more than 3 years before bankruptcy, filed more than 2 years before, and assessed more than 240 days before.',
    reference: '11 USC §523(a)',
  },
  {
    id: 'see3-080',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-7',
    topic: 'Refund Offset',
    subtopic: 'Offset Program',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Under the Treasury Offset Program, the IRS may apply a refund to:',
    options: [
      'Only federal tax debts',
      'Federal tax debts, past-due child support, student loans, and other federal or state debts',
      'Only child support',
      'Credit card debt'
    ],
    correctAnswer: 1,
    explanation: 'The Treasury Offset Program allows refunds to be applied to past-due federal taxes, child support, federal agency debts (including student loans), and state income tax obligations.',
    reference: 'IRC §6402',
  },
];

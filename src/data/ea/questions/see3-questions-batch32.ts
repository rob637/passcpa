/**
 * EA SEE Part 3: Representation, Practices, and Procedures - Batch 32 (Q311-320)
 * Other Courts & Refund Litigation
 */

import { Question } from '../../../types';

export const SEE3_QUESTIONS_BATCH32: Question[] = [
  // ==========================================
  // SEE3: Other Courts & Refund Litigation
  // ==========================================
  {
    id: 'see3-311',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Refund Litigation',
    subtopic: 'Pay First Requirement',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'To sue for a refund in federal district court or Court of Federal Claims:',
    options: [
      'No payment is required',
      'The taxpayer must first pay the tax in full and file a claim for refund',
      'Only a partial payment is required',
      'The IRS must first agree'
    ],
    correctAnswer: 1,
    explanation: 'Unlike Tax Court, refund litigation requires payment of the tax first, filing an administrative refund claim with the IRS, and then suing after the claim is denied or not acted upon within 6 months.',
    reference: 'IRC §7422',
  },
  {
    id: 'see3-312',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Refund Litigation',
    subtopic: 'District Court',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Federal district court tax cases:',
    options: [
      'Use specialized tax judges',
      'May be tried before a jury if the taxpayer requests',
      'Cannot involve tax disputes',
      'Are only for criminal matters'
    ],
    correctAnswer: 1,
    explanation: 'District court is the only forum where a taxpayer may have a jury trial for a refund suit. This may be advantageous if the taxpayer believes a jury would be more sympathetic.',
    reference: '28 U.S.C. §1346(a)',
  },
  {
    id: 'see3-313',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Refund Litigation',
    subtopic: 'Court of Federal Claims',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The U.S. Court of Federal Claims:',
    options: [
      'Is located in every state',
      'Is located in Washington D.C. and hears only bench trials (no jury)',
      'Handles only criminal cases',
      'Is part of the Tax Court'
    ],
    correctAnswer: 1,
    explanation: 'The Court of Federal Claims is in Washington D.C. (though judges may travel). It hears bench trials only (no jury). Appeals go to the Federal Circuit, not geographic circuits.',
    reference: '28 U.S.C. §1491',
  },
  {
    id: 'see3-314',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Refund Litigation',
    subtopic: 'Refund Claim Form',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A formal refund claim for individual income taxes is typically made on:',
    options: [
      'Form 843 only',
      'Form 1040-X or Form 843 (depending on the claim type)',
      'Form 2848',
      'Form 8857'
    ],
    correctAnswer: 1,
    explanation: 'Individual income tax refunds are typically claimed on Form 1040-X (amended return). Form 843 is used for other claims like penalty/interest refunds or employer refunds.',
    reference: 'IRC §6402',
  },
  {
    id: 'see3-315',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Refund Litigation',
    subtopic: 'Six Month Rule',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'After filing a refund claim, a taxpayer may file suit:',
    options: [
      'Immediately',
      'After denial or 6 months without action, within 2 years of denial',
      'Only after 1 year',
      'Never if the claim is denied'
    ],
    correctAnswer: 1,
    explanation: 'A taxpayer may sue after the IRS denies the claim or 6 months elapse without action. The suit must be filed within 2 years of the date of the denial notice.',
    reference: 'IRC §6532(a)',
  },
  {
    id: 'see3-316',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Refund Litigation',
    subtopic: 'Flora Rule',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The Flora rule requires:',
    options: [
      'Partial payment before suit',
      'Full payment of the assessed tax before filing a refund suit',
      'No payment before suit',
      'Payment to the court'
    ],
    correctAnswer: 1,
    explanation: 'Under Flora v. United States, taxpayers must pay the full amount of the assessed tax before filing a refund suit in district court or Court of Federal Claims.',
    reference: 'Flora v. United States, 362 U.S. 145 (1960)',
  },
  {
    id: 'see3-317',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Refund Litigation',
    subtopic: 'Variance Doctrine',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The "variance doctrine" in refund litigation means:',
    options: [
      'Any grounds may be raised in court',
      'The taxpayer is limited to grounds raised in the administrative refund claim',
      'The IRS may change positions freely',
      'New facts are always allowed'
    ],
    correctAnswer: 1,
    explanation: 'The variance doctrine generally limits a taxpayer\'s refund suit to the grounds stated in the administrative claim. This prevents taxpayers from blindsiding the IRS with new arguments.',
    reference: 'Refund litigation principles',
  },
  {
    id: 'see3-318',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Refund Litigation',
    subtopic: 'Appeals Court Jurisdiction',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'District court tax decisions are appealed to:',
    options: [
      'The Tax Court',
      'The U.S. Court of Appeals for the circuit covering that district',
      'The Court of Federal Claims',
      'The Supreme Court directly'
    ],
    correctAnswer: 1,
    explanation: 'District court decisions are appealed to the regional Circuit Court of Appeals (e.g., 2nd Circuit, 9th Circuit). Court of Federal Claims appeals go to the Federal Circuit.',
    reference: '28 U.S.C. §1291',
  },
  {
    id: 'see3-319',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Refund Litigation',
    subtopic: 'Forum Selection',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When choosing between Tax Court, district court, and Court of Federal Claims:',
    options: [
      'There is no difference',
      'Consider payment requirements, jury availability, precedent in the circuit, and convenience',
      'Always choose Tax Court',
      'Only attorneys may advise on forum'
    ],
    correctAnswer: 1,
    explanation: 'Forum selection considers: Tax Court requires no prepayment; district court offers jury trials; Court of Federal Claims may have favorable Federal Circuit precedent. Geographic convenience also matters.',
    reference: 'Tax litigation strategy',
  },
  {
    id: 'see3-320',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Refund Litigation',
    subtopic: 'Interest on Refunds',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'If a taxpayer wins a refund suit:',
    options: [
      'No interest is paid',
      'Interest is generally paid from the date of overpayment to the refund date',
      'Interest is paid only if requested',
      'Only the principal is returned'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §6611, when the government refunds an overpayment, interest is paid from the date of overpayment (or filing, if later) to a date not more than 30 days before the refund check date.',
    reference: 'IRC §6611',
  },
];

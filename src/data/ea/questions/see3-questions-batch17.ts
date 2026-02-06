/**
 * EA SEE Part 3: Representation, Practices, and Procedures - Batch 17 (Q161-170)
 * Innocent Spouse & Injured Spouse Relief
 */

import { Question } from '../../../types';

export const SEE3_QUESTIONS_BATCH17: Question[] = [
  // ==========================================
  // SEE3: Innocent & Injured Spouse Relief
  // ==========================================
  {
    id: 'see3-161',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Innocent Spouse Relief',
    subtopic: 'Basic Provisions',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Form 8857 is used to request:',
    options: [
      'Separation of liability for married filing separately',
      'Innocent spouse relief',
      'A change in filing status',
      'An extension of time to file'
    ],
    correctAnswer: 1,
    explanation: 'Form 8857 (Request for Innocent Spouse Relief) is used to request relief from joint and several liability under IRC §6015.',
    reference: 'IRS Form 8857',
  },
  {
    id: 'see3-162',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Innocent Spouse Relief',
    subtopic: 'IRC §6015(b)',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'For traditional innocent spouse relief under IRC §6015(b), the requesting spouse must prove:',
    options: [
      'They filed separately',
      'There was an understatement of tax attributable to erroneous items of the other spouse, and they did not know and had no reason to know',
      'They earned less income than their spouse',
      'The other spouse committed fraud'
    ],
    correctAnswer: 1,
    explanation: 'IRC §6015(b) relief requires an understatement attributable to the other spouse\'s erroneous items, and the requesting spouse must prove they did not know and had no reason to know of the understatement.',
    reference: 'IRC §6015(b)',
  },
  {
    id: 'see3-163',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Innocent Spouse Relief',
    subtopic: 'Separation of Liability',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Separation of liability relief under IRC §6015(c):',
    options: [
      'Is available to all joint filers',
      'Is available to taxpayers who are divorced, legally separated, or not living together for 12 months',
      'Completely eliminates tax liability',
      'Requires Court approval'
    ],
    correctAnswer: 1,
    explanation: 'Separation of liability relief is available to divorced, legally separated, or separated (not living together for 12 months) taxpayers. It allocates liability between spouses based on who earned/reported the income.',
    reference: 'IRC §6015(c)',
  },
  {
    id: 'see3-164',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Innocent Spouse Relief',
    subtopic: 'Equitable Relief',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Equitable relief under IRC §6015(f):',
    options: [
      'Is the first type to apply for',
      'May be granted when other relief types don\'t apply but it would be inequitable to hold the spouse liable',
      'Only applies to businesses',
      'Requires a court order'
    ],
    correctAnswer: 1,
    explanation: 'Equitable relief is available when §6015(b) and (c) relief don\'t apply, but considering all facts and circumstances, it would be inequitable to hold the requesting spouse liable. It can apply to unpaid taxes, not just understatements.',
    reference: 'IRC §6015(f)',
  },
  {
    id: 'see3-165',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Innocent Spouse Relief',
    subtopic: 'Time to Request',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A request for innocent spouse relief under IRC §6015(b) or (c) must be filed:',
    options: [
      'Within 1 year of the return filing',
      'Within 2 years of the first collection activity',
      'At any time',
      'Within 3 years of IRS assessment'
    ],
    correctAnswer: 1,
    explanation: 'Relief under §6015(b) or (c) must be requested no later than 2 years after the IRS first begins collection activity against the requesting spouse. Equitable relief (§6015(f)) has no time limit.',
    reference: 'IRC §6015(b)(1)(E), (c)(3)(B)',
  },
  {
    id: 'see3-166',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Innocent Spouse Relief',
    subtopic: 'Knowledge Standard',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The "reason to know" standard in innocent spouse cases considers:',
    options: [
      'Only actual knowledge',
      'Whether a reasonable person in similar circumstances would have known of the understatement',
      'Only what the other spouse disclosed',
      'Tax preparation knowledge only'
    ],
    correctAnswer: 1,
    explanation: 'Courts apply an objective "reasonable person" standard, considering education, involvement in finances, lifestyle compared to reported income, and whether the item was unusual or large.',
    reference: 'Treas. Reg. §1.6015-2(c)',
  },
  {
    id: 'see3-167',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Injured Spouse Relief',
    subtopic: 'Basic Provisions',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Form 8379 (Injured Spouse Allocation) is filed when:',
    options: [
      'A spouse wants relief from joint liability',
      'A spouse\'s share of a joint refund was applied to the other spouse\'s prior obligations',
      'Spouses disagree about a return',
      'A spouse claims abuse'
    ],
    correctAnswer: 1,
    explanation: 'Form 8379 is for "injured spouse" situations where a taxpayer\'s refund share was offset against the other spouse\'s debts (child support, student loans, prior tax). This is different from innocent spouse relief.',
    reference: 'IRS Form 8379',
  },
  {
    id: 'see3-168',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Injured Spouse Relief',
    subtopic: 'Timing',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Form 8379 may be filed:',
    options: [
      'Only after receiving a refund offset notice',
      'With the original return or after refund is offset',
      'Only in Tax Court',
      'Only by the non-debtor spouse in person'
    ],
    correctAnswer: 1,
    explanation: 'Form 8379 may be filed with the original return to prevent offset, or separately after receiving a notice that the refund was applied to the other spouse\'s obligations.',
    reference: 'IRS Form 8379 Instructions',
  },
  {
    id: 'see3-169',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Innocent Spouse Relief',
    subtopic: 'Appeal Rights',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'If the IRS denies innocent spouse relief, the taxpayer may:',
    options: [
      'Only accept the decision',
      'Petition Tax Court within 90 days of final determination',
      'File in District Court only',
      'Request another examination'
    ],
    correctAnswer: 1,
    explanation: 'Taxpayers may petition Tax Court within 90 days of a final determination denying innocent spouse relief. The case is heard de novo (reviewed fresh) by the court.',
    reference: 'IRC §6015(e)',
  },
  {
    id: 'see3-170',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Innocent Spouse Relief',
    subtopic: 'Non-Requesting Spouse',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'When innocent spouse relief is requested, the non-requesting spouse:',
    options: [
      'Has no rights in the process',
      'Must be notified by the IRS and has the right to participate',
      'Is automatically found liable',
      'Must file a separate claim'
    ],
    correctAnswer: 1,
    explanation: 'The IRS must notify the non-requesting spouse (NRS) of the Form 8857 filing. The NRS has the right to provide information and participate in the determination.',
    reference: 'IRC §6015(h)(2)',
  },
];

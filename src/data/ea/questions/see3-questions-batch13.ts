/**
 * EA SEE Part 3: Representation, Practices, and Procedures - Batch 13 (Q121-130)
 * Installment Agreements
 */

import { Question } from '../../../types';

export const SEE3_QUESTIONS_BATCH13: Question[] = [
  // ==========================================
  // SEE3: Installment Agreements
  // ==========================================
  {
    id: 'see3-121',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Installment Agreements',
    subtopic: 'Guaranteed IA',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The IRS must accept a guaranteed installment agreement if the taxpayer:',
    options: [
      'Owes any amount',
      'Owes $10,000 or less (excluding penalties/interest), can pay within 3 years, and meets filing/payment compliance requirements',
      'Owes $50,000 or less',
      'Is a first-time taxpayer'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §6159(c), the IRS must accept an installment agreement if the liability is $10,000 or less (excluding P&I), payable within 3 years, and the taxpayer has filed all returns and not had an IA in prior 5 years.',
    reference: 'IRC §6159(c)',
  },
  {
    id: 'see3-122',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Installment Agreements',
    subtopic: 'Streamlined IA',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A streamlined installment agreement is available for individuals who owe:',
    options: [
      '$10,000 or less',
      '$50,000 or less in combined balance and can pay within 72 months or CSED',
      '$100,000 or less',
      'Any amount if they can pay within 5 years'
    ],
    correctAnswer: 1,
    explanation: 'Streamlined IAs are available for balances of $50,000 or less (now $50K for individuals using direct debit) payable within 72 months or before CSED, whichever is shorter. No financial statement required.',
    reference: 'IRM 5.14.5.2',
  },
  {
    id: 'see3-123',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Installment Agreements',
    subtopic: 'Financial Statement',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Form 433-A is used for:',
    options: [
      'Requesting an extension to file',
      'Collection information statement for wage earners and self-employed',
      'Power of attorney',
      'Offer in compromise application'
    ],
    correctAnswer: 1,
    explanation: 'Form 433-A (Collection Information Statement for Wage Earners and Self-Employed Individuals) provides detailed financial information for installment agreements above streamlined thresholds or OIC applications.',
    reference: 'IRS Form 433-A',
  },
  {
    id: 'see3-124',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Installment Agreements',
    subtopic: 'User Fee',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The setup fee for an installment agreement:',
    options: [
      'Is waived for all taxpayers',
      'Varies based on whether it is direct debit, low-income, and online vs. paper application',
      'Is a flat $500',
      'Equals 10% of the balance'
    ],
    correctAnswer: 1,
    explanation: 'Setup fees vary: online applications cost less than phone/mail; direct debit agreements cost less than regular; low-income taxpayers may qualify for reduced or waived fees.',
    reference: 'IRS Form 9465 Instructions',
  },
  {
    id: 'see3-125',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Installment Agreements',
    subtopic: 'Form 9465',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Form 9465 is used to:',
    options: [
      'File an extension',
      'Request an installment agreement',
      'Appeal an audit',
      'Claim injured spouse relief'
    ],
    correctAnswer: 1,
    explanation: 'Form 9465 (Installment Agreement Request) is used to request a monthly payment plan for taxes owed. It can be filed with a return or separately.',
    reference: 'IRS Form 9465',
  },
  {
    id: 'see3-126',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Installment Agreements',
    subtopic: 'Partial Payment IA',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A Partial Payment Installment Agreement (PPIA) allows:',
    options: [
      'Payment of full balance in extended time',
      'Monthly payments that will not fully pay the liability before the collection statute expires',
      'One-time partial payment',
      'Waiver of all penalties'
    ],
    correctAnswer: 1,
    explanation: 'A PPIA is for taxpayers who cannot pay in full before the CSED expires. The IRS accepts payments based on ability to pay, and the remaining balance is written off when CSED expires.',
    reference: 'IRC §6159(a)',
  },
  {
    id: 'see3-127',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Installment Agreements',
    subtopic: 'IA Termination',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The IRS may terminate an installment agreement if the taxpayer:',
    options: [
      'Makes all payments on time',
      'Fails to pay an installment, incurs new liability, fails to file, or provides inaccurate financial information',
      'Requests a modification',
      'Moves to a new address'
    ],
    correctAnswer: 1,
    explanation: 'IRS may terminate an IA for: default on payment, new tax liability, failure to file returns, inaccurate/incomplete financial disclosure, or changed financial condition. 30-day notice required before termination.',
    reference: 'IRC §6159(b)(5)',
  },
  {
    id: 'see3-128',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Installment Agreements',
    subtopic: 'Federal Tax Lien',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'When an installment agreement is in effect:',
    options: [
      'The IRS cannot file a federal tax lien',
      'The IRS may still file a Notice of Federal Tax Lien for balances over $10,000',
      'All liens are automatically released',
      'Interest stops accruing'
    ],
    correctAnswer: 1,
    explanation: 'An IA does not prevent lien filing. However, for streamlined IAs under $25,000 with direct debit, the IRS generally withdraws existing liens after the IA is established.',
    reference: 'IRM 5.14.1.4',
  },
  {
    id: 'see3-129',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Installment Agreements',
    subtopic: 'Interest and Penalties',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'During an installment agreement:',
    options: [
      'Interest and penalties stop accruing',
      'Interest and the failure-to-pay penalty continue to accrue on the unpaid balance',
      'Only interest continues',
      'Only penalties continue'
    ],
    correctAnswer: 1,
    explanation: 'Interest continues at the federal short-term rate plus 3%. The failure-to-pay penalty (0.5%/month) is reduced to 0.25%/month while an IA is in effect, but both continue accruing.',
    reference: 'IRC §6651(h)',
  },
  {
    id: 'see3-130',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Installment Agreements',
    subtopic: 'Online Payment Agreement',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The IRS Online Payment Agreement tool allows taxpayers to:',
    options: [
      'Only view their balance',
      'Set up, modify, or reinstate an installment agreement electronically',
      'Only make one-time payments',
      'Contest their liability'
    ],
    correctAnswer: 1,
    explanation: 'The IRS Online Payment Agreement (OPA) tool at IRS.gov allows qualifying taxpayers to apply for IAs, modify existing agreements, or reinstate defaulted agreements online.',
    reference: 'IRS.gov OPA',
  },
];

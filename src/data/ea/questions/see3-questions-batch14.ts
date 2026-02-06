/**
 * EA SEE Part 3: Representation, Practices, and Procedures - Batch 14 (Q131-140)
 * Offers in Compromise
 */

import { Question } from '../../../types';

export const SEE3_QUESTIONS_BATCH14: Question[] = [
  // ==========================================
  // SEE3: Offers in Compromise
  // ==========================================
  {
    id: 'see3-131',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Offers in Compromise',
    subtopic: 'OIC Grounds',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'An Offer in Compromise may be submitted based on:',
    options: [
      'Financial hardship only',
      'Doubt as to collectibility, doubt as to liability, or effective tax administration',
      'Only doubt as to collectibility',
      'Any reason the taxpayer chooses'
    ],
    correctAnswer: 1,
    explanation: 'OICs may be based on: (1) doubt as to liability (legitimate dispute about tax owed), (2) doubt as to collectibility (cannot pay full amount), or (3) effective tax administration (collection would cause hardship/unfair).',
    reference: 'IRC §7122',
  },
  {
    id: 'see3-132',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Offers in Compromise',
    subtopic: 'Form 656',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Form 656 is used to:',
    options: [
      'Request an extension to file',
      'Submit an Offer in Compromise',
      'Request penalty abatement',
      'File an appeal'
    ],
    correctAnswer: 1,
    explanation: 'Form 656 (Offer in Compromise) is the primary form for submitting an OIC based on doubt as to collectibility or effective tax administration. Form 656-L is used for doubt as to liability.',
    reference: 'IRS Form 656',
  },
  {
    id: 'see3-133',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Offers in Compromise',
    subtopic: 'Application Fee',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The OIC application fee is:',
    options: [
      'Waived for all taxpayers',
      '$205, plus 20% of the offer amount (or first monthly payment for periodic offers)',
      '$500 flat fee',
      '10% of the total tax liability'
    ],
    correctAnswer: 1,
    explanation: 'The OIC fee is $205 plus 20% of offer (lump sum) or first monthly payment (periodic). Low-income taxpayers (at/below 250% of poverty guidelines) are exempt from fee and initial payment.',
    reference: 'IRS Form 656 Instructions',
  },
  {
    id: 'see3-134',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Offers in Compromise',
    subtopic: 'Reasonable Collection Potential',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The IRS determines an acceptable OIC amount based on:',
    options: [
      'What the taxpayer offers to pay',
      'Reasonable Collection Potential (RCP) - equity in assets plus future income',
      'A percentage of total liability',
      'Prior tax payments'
    ],
    correctAnswer: 1,
    explanation: 'RCP = equity in assets (quick sale value minus encumbrances) + future income (based on remaining CSED). The offer must generally equal or exceed RCP for acceptance.',
    reference: 'IRM 5.8.5',
  },
  {
    id: 'see3-135',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Offers in Compromise',
    subtopic: 'Payment Options',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'OIC payment options include:',
    options: [
      'Only lump sum',
      'Lump sum (paid within 5 months) or periodic payment (paid within 24 months)',
      'Any payment over any time period',
      'Only monthly payments'
    ],
    correctAnswer: 1,
    explanation: 'Lump Sum Cash offers require 20% with application and balance within 5 months of acceptance. Periodic Payment offers require first payment with application and remaining payments within 6-24 months.',
    reference: 'IRC §7122(c)',
  },
  {
    id: 'see3-136',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Offers in Compromise',
    subtopic: 'Compliance Requirement',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'After an OIC is accepted, the taxpayer must remain in filing and payment compliance for:',
    options: [
      '3 years',
      '5 years from acceptance',
      '10 years',
      'No compliance period required'
    ],
    correctAnswer: 1,
    explanation: 'Accepted OIC terms require 5 years of tax compliance (file all returns, pay all taxes). Noncompliance during this period can reinstate the original liability minus payments made.',
    reference: 'IRC §7122(c)(1)',
  },
  {
    id: 'see3-137',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Offers in Compromise',
    subtopic: 'Refund Offset',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'During the OIC consideration period and the year it is accepted:',
    options: [
      'Refunds are issued normally',
      'The IRS will apply refunds to the tax liability covered by the OIC',
      'Refunds are placed in escrow',
      'Refunds are doubled'
    ],
    correctAnswer: 1,
    explanation: 'Any refunds due during OIC consideration and for the tax year of acceptance are applied to the tax liability. Taxpayers should adjust withholding to avoid generating refunds.',
    reference: 'Form 656 Terms',
  },
  {
    id: 'see3-138',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Offers in Compromise',
    subtopic: 'OIC Appeal',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'If an OIC is rejected, the taxpayer may:',
    options: [
      'Only file in Tax Court',
      'Request an appeal to the IRS Office of Appeals within 30 days',
      'Sue in District Court immediately',
      'Not appeal - rejection is final'
    ],
    correctAnswer: 1,
    explanation: 'Taxpayers may appeal an OIC rejection to the IRS Office of Appeals within 30 days of the rejection letter. This is an administrative appeal, not a court action.',
    reference: 'IRM 5.8.9.4',
  },
  {
    id: 'see3-139',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Offers in Compromise',
    subtopic: 'Statute Suspension',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'During OIC consideration:',
    options: [
      'The CSED continues to run',
      'The collection statute is suspended plus 30 additional days',
      'The statute expires immediately',
      'Only interest is suspended'
    ],
    correctAnswer: 1,
    explanation: 'The 10-year Collection Statute Expiration Date (CSED) is suspended while an OIC is pending, plus 30 days after rejection or withdrawal. This prevents using OICs to run out the clock.',
    reference: 'IRC §6331(k)',
  },
  {
    id: 'see3-140',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Offers in Compromise',
    subtopic: 'Deemed Acceptance',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'If the IRS does not make a determination on an OIC within 24 months:',
    options: [
      'The OIC is automatically rejected',
      'The OIC is deemed accepted',
      'The taxpayer must resubmit',
      'The OIC is transferred to Appeals'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §7122(f), if the IRS fails to make a determination within 24 months, the OIC is deemed accepted. The 24 months excludes any periods the OIC is returned to taxpayer.',
    reference: 'IRC §7122(f)',
  },
];

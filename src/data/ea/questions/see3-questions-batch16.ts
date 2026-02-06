/**
 * EA SEE Part 3: Representation, Practices, and Procedures - Batch 16 (Q151-160)
 * Penalty Abatement
 */

import { Question } from '../../../types';

export const SEE3_QUESTIONS_BATCH16: Question[] = [
  // ==========================================
  // SEE3: Penalty Abatement
  // ==========================================
  {
    id: 'see3-151',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Penalty Abatement',
    subtopic: 'Reasonable Cause',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Penalty abatement for reasonable cause may be granted when:',
    options: [
      'The taxpayer cannot afford to pay the penalty',
      'The taxpayer exercised ordinary business care and prudence but still could not comply',
      'The taxpayer was unaware of the law',
      'It is the taxpayer\'s first offense for any reason'
    ],
    correctAnswer: 1,
    explanation: 'Reasonable cause exists when the taxpayer exercised ordinary business care and prudence in determining tax obligations but was unable to comply. Circumstances beyond their control must have prevented compliance.',
    reference: 'Treas. Reg. §301.6651-1(c)(1)',
  },
  {
    id: 'see3-152',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Penalty Abatement',
    subtopic: 'First Time Abatement',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'First Time Abatement (FTA) may be granted if the taxpayer:',
    options: [
      'Files an extension',
      'Has no penalties for the prior 3 years, is current with filing and payments',
      'Requests it in writing only',
      'Has total penalties under $500'
    ],
    correctAnswer: 1,
    explanation: 'FTA is an administrative waiver for taxpayers with clean compliance history for 3 prior years (no penalties or abated penalties), have filed or filed valid extension for current return, and have paid or arranged to pay any tax due.',
    reference: 'IRM 20.1.1.3.6.1',
  },
  {
    id: 'see3-153',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Penalty Abatement',
    subtopic: 'Form Used',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Which form is used to formally request penalty abatement from the IRS?',
    options: [
      'Form 9465',
      'Form 843',
      'Form 656',
      'Form 1040-X'
    ],
    correctAnswer: 1,
    explanation: 'Form 843 (Claim for Refund and Request for Abatement) is used to request penalty and/or interest abatement. However, requests can also be made by phone or letter.',
    reference: 'IRS Form 843',
  },
  {
    id: 'see3-154',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Penalty Abatement',
    subtopic: 'Statutory Exceptions',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Which is considered a statutory exception to penalties (not requiring reasonable cause)?',
    options: [
      'General financial hardship',
      'Death, serious illness, or unavoidable absence of the taxpayer or immediate family',
      'Forgetting the due date',
      'Reliance on free tax preparation'
    ],
    correctAnswer: 1,
    explanation: 'Death, serious illness, or unavoidable absence affecting the taxpayer\'s ability to obtain records or file are statutory exceptions that automatically constitute reasonable cause for penalty relief.',
    reference: 'Treas. Reg. §301.6651-1(c)(1)',
  },
  {
    id: 'see3-155',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Penalty Abatement',
    subtopic: 'Request Method',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Penalty abatement may be requested:',
    options: [
      'Only in Tax Court',
      'By phone, in writing, or in person',
      'Only at initiation of the IRS',
      'Only through a practitioner'
    ],
    correctAnswer: 1,
    explanation: 'Taxpayers may request penalty abatement by phone (for FTA), in writing (letter or Form 843), or in person at a Taxpayer Assistance Center. The method depends on circumstances and penalty amount.',
    reference: 'IRM 20.1.1',
  },
  {
    id: 'see3-156',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Penalty Abatement',
    subtopic: 'Erroneous IRS Advice',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Penalty relief for erroneous written advice from the IRS requires the taxpayer:',
    options: [
      'Only to claim they received bad advice',
      'Reasonably relied on written advice from the IRS in response to a specific written request',
      'Spoke to any IRS employee',
      'Read an IRS publication incorrectly'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §6404(f), penalties may be abated if the taxpayer reasonably relied on erroneous written advice from the IRS in response to a specific written request containing accurate and complete information.',
    reference: 'IRC §6404(f)',
  },
  {
    id: 'see3-157',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Penalty Abatement',
    subtopic: 'FTP vs FTF',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The failure to file penalty (FTF) is:',
    options: [
      'Equal to the failure to pay penalty',
      'Generally more severe than the failure to pay penalty',
      'Less than the failure to pay penalty',
      'Only applied to businesses'
    ],
    correctAnswer: 1,
    explanation: 'FTF is 5% per month up to 25% (or 100% if over 60 days late, minimum $510). FTP is 0.5% per month up to 25%. FTF is reduced by FTP when both apply concurrently.',
    reference: 'IRC §6651(a)(1), (a)(2)',
  },
  {
    id: 'see3-158',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Penalty Abatement',
    subtopic: 'Interest Abatement',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Interest on tax liabilities may be abated:',
    options: [
      'Anytime the taxpayer requests',
      'Only when attributable to IRS errors or delays in performing ministerial or managerial acts',
      'Always with penalty abatement',
      'By the taxpayer paying the principal'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §6404(e), interest may be abated only when it was caused by IRS errors or unreasonable delays in performing ministerial or managerial acts. Standard interest on tax debt is not abatable.',
    reference: 'IRC §6404(e)',
  },
  {
    id: 'see3-159',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Penalty Abatement',
    subtopic: 'Estimated Tax Penalty',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The estimated tax penalty (IRC §6654) may be waived if:',
    options: [
      'The taxpayer files on time',
      'The underpayment was due to casualty, disaster, or other unusual circumstances',
      'The taxpayer makes a payment in April',
      'The liability is under $10,000'
    ],
    correctAnswer: 1,
    explanation: 'The estimated tax penalty may be waived if the underpayment was due to casualty, disaster, or unusual circumstances, or if the taxpayer retired after age 62 or became disabled in the year or prior year.',
    reference: 'IRC §6654(e)(3)',
  },
  {
    id: 'see3-160',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Penalty Abatement',
    subtopic: 'Denial Appeal',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'If a penalty abatement request is denied, the taxpayer may:',
    options: [
      'Only accept the decision',
      'Request an appeal to the IRS Office of Appeals',
      'Immediately file in Tax Court',
      'Request a new examination'
    ],
    correctAnswer: 1,
    explanation: 'Taxpayers may appeal denied penalty abatement requests to the IRS Office of Appeals. If paying and claiming a refund, they may also pursue claims through the refund litigation process.',
    reference: 'IRM 20.1.1.4',
  },
];

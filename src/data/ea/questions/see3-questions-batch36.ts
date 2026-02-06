/**
 * EA SEE Part 3: Representation, Practices, and Procedures - Batch 36 (Q351-360)
 * Taxpayer Advocate Service & Taxpayer Assistance
 */

import { Question } from '../../../types';

export const SEE3_QUESTIONS_BATCH36: Question[] = [
  // ==========================================
  // SEE3: Taxpayer Advocate Service
  // ==========================================
  {
    id: 'see3-351',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Taxpayer Advocate',
    subtopic: 'TAS Mission',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The Taxpayer Advocate Service (TAS):',
    options: [
      'Collects taxes',
      'Helps taxpayers resolve problems with the IRS and advocates for systemic changes',
      'Conducts audits',
      'Prosecutes tax crimes'
    ],
    correctAnswer: 1,
    explanation: 'TAS is an independent organization within the IRS that helps taxpayers resolve problems, explains taxpayer rights, and identifies systemic issues affecting taxpayers.',
    reference: 'IRC §7803(c)',
  },
  {
    id: 'see3-352',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Taxpayer Advocate',
    subtopic: 'TAO Issuance',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A Taxpayer Assistance Order (TAO) may be issued by the National Taxpayer Advocate when:',
    options: [
      'Any taxpayer requests it',
      'A taxpayer is suffering or about to suffer a significant hardship due to IRS action',
      'Only for refund delays',
      'A practitioner requests it'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §7811, the NTA may issue a TAO if a taxpayer is suffering or about to suffer a significant hardship as a result of IRS action (or inaction). TAOs can require IRS to take or cease specific actions.',
    reference: 'IRC §7811',
  },
  {
    id: 'see3-353',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Taxpayer Advocate',
    subtopic: 'Case Criteria',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'TAS may accept a case when:',
    options: [
      'The taxpayer simply wants faster service',
      'The taxpayer is experiencing hardship, the IRS is not resolving the issue timely, or systems failures exist',
      'The taxpayer wants audit help',
      'Only for criminal matters'
    ],
    correctAnswer: 1,
    explanation: 'TAS accepts cases involving significant hardship, IRS not responding in a timely or appropriate manner, IRS system failures, or when equity or compelling public policy warrants assistance.',
    reference: 'IRM 13.1.7',
  },
  {
    id: 'see3-354',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Taxpayer Advocate',
    subtopic: 'Form 911',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Form 911 is used to:',
    options: [
      'Request an extension',
      'Request Taxpayer Advocate Service assistance',
      'File an appeal',
      'Claim a refund'
    ],
    correctAnswer: 1,
    explanation: 'Form 911 (Request for Taxpayer Advocate Service Assistance) is used to request TAS help when the taxpayer is experiencing hardship or IRS is not resolving their issue.',
    reference: 'IRS Form 911',
  },
  {
    id: 'see3-355',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Taxpayer Advocate',
    subtopic: 'Significant Hardship',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Significant hardship for TAS purposes includes:',
    options: [
      'Minor inconvenience',
      'Immediate threat of adverse action, delay over 30 days, significant cost, or irreparable injury',
      'Any IRS contact',
      'Refund under $500'
    ],
    correctAnswer: 1,
    explanation: 'Significant hardship includes: immediate threat of adverse action, delay of more than 30 days to resolve, significant cost (including fees for representation), and irreparable injury/long-term adverse impact.',
    reference: 'IRC §7811(a)(2)',
  },
  {
    id: 'see3-356',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Taxpayer Advocate',
    subtopic: 'LTA Contacts',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Local Taxpayer Advocates (LTAs):',
    options: [
      'Only work in Washington D.C.',
      'Are available in every state to assist taxpayers with IRS problems',
      'Only handle business cases',
      'Conduct audits'
    ],
    correctAnswer: 1,
    explanation: 'LTAs are TAS employees located in every state who work directly with taxpayers to resolve problems and advocate for their rights with the IRS.',
    reference: 'TAS Structure',
  },
  {
    id: 'see3-357',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Taxpayer Assistance',
    subtopic: 'LITC Program',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Low Income Taxpayer Clinics (LITCs):',
    options: [
      'Are run by the IRS',
      'Are independent organizations that provide free or low-cost representation for low-income taxpayers',
      'Charge full fees',
      'Only prepare returns'
    ],
    correctAnswer: 1,
    explanation: 'LITCs are independent organizations (not IRS) that provide free or low-cost representation to low-income taxpayers in disputes with the IRS. They also provide education about taxpayer rights.',
    reference: 'IRC §7526',
  },
  {
    id: 'see3-358',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Taxpayer Assistance',
    subtopic: 'VITA Program',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The Volunteer Income Tax Assistance (VITA) program:',
    options: [
      'Is for high-income taxpayers',
      'Provides free tax return preparation for qualifying taxpayers',
      'Is only for businesses',
      'Charges low fees'
    ],
    correctAnswer: 1,
    explanation: 'VITA offers free tax return preparation to low-to-moderate income taxpayers, persons with disabilities, and limited English speakers. It is staffed by IRS-certified volunteers.',
    reference: 'IRS VITA Program',
  },
  {
    id: 'see3-359',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Taxpayer Assistance',
    subtopic: 'TCE Program',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The Tax Counseling for the Elderly (TCE) program:',
    options: [
      'Is for all ages',
      'Provides free tax help for taxpayers age 60 and older',
      'Charges sliding scale fees',
      'Is for businesses only'
    ],
    correctAnswer: 1,
    explanation: 'TCE provides free tax assistance to taxpayers age 60 and older, focusing on pension and retirement-related issues. AARP Tax-Aide is the largest TCE participant.',
    reference: 'IRS TCE Program',
  },
  {
    id: 'see3-360',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Taxpayer Advocate',
    subtopic: 'Annual Report',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The National Taxpayer Advocate must submit to Congress:',
    options: [
      'No required reports',
      'Two annual reports identifying taxpayer problems and proposing solutions',
      'Quarterly earnings reports',
      'Only oral testimony'
    ],
    correctAnswer: 1,
    explanation: 'The NTA must submit two reports annually to Congress: one with the year-end report identifying at least 20 most serious problems and legislative recommendations, and one mid-year objectives report.',
    reference: 'IRC §7803(c)(2)(B)',
  },
];

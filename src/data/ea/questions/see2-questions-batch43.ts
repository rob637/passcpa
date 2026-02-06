/**
 * EA SEE Part 2: Businesses - Questions Batch 43 (Q421-430)
 * Business Filing Requirements and Due Dates
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH43: Question[] = [
  // ==========================================
  // SEE2-2: Filing Requirements
  // ==========================================
  {
    id: 'see2-421',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Filing Requirements',
    subtopic: 'C Corporation Due Date',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The Form 1120 (C corporation return) is due on:',
    options: [
      'March 15 following the tax year end',
      'April 15 following the tax year end',
      'The 15th day of the 4th month following fiscal year end',
      'The 15th day of the 3rd month following fiscal year end'
    ],
    correctAnswer: 2,
    explanation: 'C corporation returns are due the 15th day of the 4th month following fiscal year end. For calendar year corps, this is April 15.',
    reference: 'IRC §6072(b)',
  },
  {
    id: 'see2-422',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Filing Requirements',
    subtopic: 'S Corporation Due Date',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Form 1120-S (S corporation return) is due:',
    options: [
      'April 15 for calendar year corps',
      'March 15 for calendar year corps',
      'The same date as individual returns',
      'June 15 for calendar year corps'
    ],
    correctAnswer: 1,
    explanation: 'S corporation returns are due the 15th day of the 3rd month following year end - March 15 for calendar year S corps. This allows K-1s to be issued before individual returns are due.',
    reference: 'IRC §6072(b)',
  },
  {
    id: 'see2-423',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Filing Requirements',
    subtopic: 'Partnership Due Date',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Form 1065 (partnership return) for a calendar year partnership is due:',
    options: [
      'April 15',
      'March 15',
      'February 15',
      'Same as the partners\' returns'
    ],
    correctAnswer: 1,
    explanation: 'Partnership returns are due the 15th day of the 3rd month following year end - March 15 for calendar year partnerships. This ensures K-1s are available before partners\' due dates.',
    reference: 'IRC §6072(b)',
  },
  {
    id: 'see2-424',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Filing Requirements',
    subtopic: 'Extension for C Corps',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A C corporation can obtain an automatic extension of:',
    options: [
      '3 months',
      '6 months',
      '9 months',
      '12 months'
    ],
    correctAnswer: 1,
    explanation: 'C corporations can obtain an automatic 6-month extension by filing Form 7004 by the original due date. This extends the filing deadline to the 15th of the 10th month after year end.',
    reference: 'Treas. Reg. §1.6081-3',
  },
  {
    id: 'see2-425',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Filing Requirements',
    subtopic: 'Extension for Pass-Throughs',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'S corporations and partnerships can obtain an automatic extension of:',
    options: [
      '3 months',
      '6 months',
      '5 months',
      '9 months'
    ],
    correctAnswer: 1,
    explanation: 'S corporations and partnerships can obtain a 6-month automatic extension by filing Form 7004. This extends the due date to September 15 for calendar year entities.',
    reference: 'Treas. Reg. §1.6081-3',
  },
  {
    id: 'see2-426',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Filing Requirements',
    subtopic: 'Schedule K-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Schedule K-1 must be furnished to partners/shareholders:',
    options: [
      'By March 15 regardless of extensions',
      'By the due date (including extensions) of the entity return',
      'By January 31',
      'Within 60 days of year end'
    ],
    correctAnswer: 1,
    explanation: 'Partnerships and S corporations must furnish Schedule K-1 to owners by the due date of the return, including extensions. Late K-1s may result in penalties.',
    reference: 'IRC §6031; IRC §6037',
  },
  {
    id: 'see2-427',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Filing Requirements',
    subtopic: 'Late Filing Penalty',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The late filing penalty for S corporations and partnerships is:',
    options: [
      '$50 per month per shareholder/partner',
      '$235 per month per shareholder/partner (2024), up to 12 months',
      '5% of tax due per month',
      '25% of tax due flat penalty'
    ],
    correctAnswer: 1,
    explanation: 'The penalty for late-filed S corp/partnership returns is $235 per month (or fraction) per shareholder/partner for up to 12 months ($2,820 max per owner for 2024).',
    reference: 'IRC §6698; IRC §6699',
  },
  {
    id: 'see2-428',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Filing Requirements',
    subtopic: 'C Corp Late Filing',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A C corporation that files late (without extension) faces a penalty of:',
    options: [
      '5% of unpaid tax per month, up to 25%',
      '10% of gross receipts',
      'A flat $500 penalty',
      'No penalty if tax is paid'
    ],
    correctAnswer: 0,
    explanation: 'The failure-to-file penalty for corporations is 5% of unpaid tax per month (or fraction), up to 25% maximum. There is a minimum penalty for returns over 60 days late.',
    reference: 'IRC §6651(a)(1)',
  },
  {
    id: 'see2-429',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Filing Requirements',
    subtopic: 'Failure to Pay Penalty',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The failure-to-pay penalty for corporations is:',
    options: [
      '1% per month of unpaid tax',
      '0.5% per month of unpaid tax, up to 25%',
      '5% flat',
      '10% of unpaid balance'
    ],
    correctAnswer: 1,
    explanation: 'The failure-to-pay penalty is 0.5% of unpaid tax per month (or fraction), up to 25% maximum. This penalty runs concurrently with late filing penalty, but total is capped.',
    reference: 'IRC §6651(a)(2)',
  },
  {
    id: 'see2-430',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Filing Requirements',
    subtopic: 'First Year Relief',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The IRS may provide penalty relief for small partnerships that fail to file timely if:',
    options: [
      'The partnership has never been audited',
      'It qualifies for first-time penalty abatement or reasonable cause',
      'Revenue is under $100,000',
      'All partners are individuals'
    ],
    correctAnswer: 1,
    explanation: 'Small partnerships (10 or fewer partners all being individuals) may qualify for penalty relief under Rev. Proc. 84-35 if there was reasonable cause. First-time abatement is also available.',
    reference: 'Rev. Proc. 84-35; IRM 20.1.1.3.3.2.1',
  },
];

/**
 * EA SEE Part 2: Businesses - Questions Batch 15 (Q141-150)
 * S Corporation Eligibility and Election
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH15: Question[] = [
  // ==========================================
  // SEE2-5: S Corporations - Eligibility
  // ==========================================
  {
    id: 'see2-141',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'S Corporation Eligibility',
    subtopic: 'Shareholder Limit',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The maximum number of shareholders an S corporation can have is:',
    options: [
      '35',
      '75',
      '100',
      '500'
    ],
    correctAnswer: 2,
    explanation: 'Under IRC §1361(b)(1)(A), an S corporation cannot have more than 100 shareholders. Members of a family can be treated as a single shareholder for this limit.',
    reference: 'IRC §1361(b)(1)(A)',
  },
  {
    id: 'see2-142',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'S Corporation Eligibility',
    subtopic: 'Eligible Shareholders',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Which of the following can be a shareholder of an S corporation?',
    options: [
      'A C corporation',
      'A nonresident alien individual',
      'An estate of a deceased individual',
      'A partnership'
    ],
    correctAnswer: 2,
    explanation: 'Under IRC §1361(b)(1)(B), eligible S corporation shareholders include individuals, estates, and certain trusts. Corporations, partnerships, and nonresident aliens cannot be shareholders.',
    reference: 'IRC §1361(b)(1)(B)',
  },
  {
    id: 'see2-143',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'S Corporation Eligibility',
    subtopic: 'Eligible Trusts',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Which type of trust can be an S corporation shareholder?',
    options: [
      'Complex trust distributing at trustee\'s discretion',
      'Electing Small Business Trust (ESBT)',
      'Charitable remainder trust',
      'Foreign trust'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §1361(c)(2), eligible trust shareholders include grantor trusts, qualified subchapter S trusts (QSSTs), and electing small business trusts (ESBTs). Complex trusts, charitable trusts, and foreign trusts cannot be shareholders.',
    reference: 'IRC §1361(c)(2); IRC §1361(e)',
  },
  {
    id: 'see2-144',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'S Corporation Eligibility',
    subtopic: 'One Class of Stock',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An S corporation issues common stock to all shareholders but pays shareholder-employees different levels of reasonable compensation. This arrangement:',
    options: [
      'Creates a prohibited second class of stock',
      'Is permitted and does not violate the one class requirement',
      'Requires IRS approval',
      'Causes immediate termination of S status'
    ],
    correctAnswer: 1,
    explanation: 'The one class of stock requirement looks at the rights of shareholders as shareholders, not as employees. Differences in compensation do not create a second class of stock as long as stock rights are identical.',
    reference: 'Treas. Reg. §1.1361-1(l)',
  },
  {
    id: 'see2-145',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'S Corporation Eligibility',
    subtopic: 'Ineligible Corporations',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Which of the following entities is ineligible to elect S corporation status?',
    options: [
      'A domestic corporation owned by one individual',
      'An insurance company',
      'A corporation that uses the cash method of accounting',
      'A corporation that was previously a C corporation'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §1361(b)(2), certain corporations cannot elect S status, including insurance companies, certain financial institutions, DISCs, and corporations that have elected §936 (possessions tax credit).',
    reference: 'IRC §1361(b)(2)',
  },
  {
    id: 'see2-146',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'S Corporation Election',
    subtopic: 'Form 2553',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'To be effective for the current tax year, Form 2553 (S election) must be filed:',
    options: [
      'By the 15th day of the 3rd month of the tax year',
      'By December 31 of the prior year',
      'By the 15th day of the 3rd month of the tax year OR anytime in the prior year',
      'Within 75 days after incorporation'
    ],
    correctAnswer: 2,
    explanation: 'Under IRC §1362(b), an S election is effective for the current year if made by the 15th day of the 3rd month (March 15 for calendar year) or anytime during the preceding tax year.',
    reference: 'IRC §1362(b)',
  },
  {
    id: 'see2-147',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'S Corporation Election',
    subtopic: 'Shareholder Consent',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'An S corporation election requires consent from:',
    options: [
      'Shareholders owning more than 50% of stock',
      'Shareholders owning at least two-thirds of stock',
      'All shareholders',
      'Only shareholders who are U.S. citizens'
    ],
    correctAnswer: 2,
    explanation: 'Under IRC §1362(a)(2), all shareholders, including non-voting shareholders, must consent to the S election for it to be valid. There is no majority vote option.',
    reference: 'IRC §1362(a)(2)',
  },
  {
    id: 'see2-148',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'S Corporation Election',
    subtopic: 'Late Election Relief',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'If an S election is filed late, the corporation may obtain relief if:',
    options: [
      'The IRS grants permission after an examination',
      'It files under Rev. Proc. 2013-30 and meets reasonable cause requirements',
      'It pays a late filing penalty',
      'Late elections cannot be validated under any circumstances'
    ],
    correctAnswer: 1,
    explanation: 'Rev. Proc. 2013-30 provides relief for late S elections if the taxpayer meets certain requirements including reasonable cause and having intended to file on time. The election can be made effective retroactively.',
    reference: 'Rev. Proc. 2013-30',
  },
  {
    id: 'see2-149',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'S Corporation Termination',
    subtopic: 'Voluntary Revocation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An S corporation\'s election can be voluntarily revoked with consent from shareholders holding:',
    options: [
      'A unanimous vote',
      'More than 50% of the shares',
      'At least two-thirds of the shares',
      'At least 75% of the shares'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §1362(d)(1), an S election can be revoked with the consent of shareholders holding more than 50% of the outstanding shares (both voting and nonvoting).',
    reference: 'IRC §1362(d)(1)(B)',
  },
  {
    id: 'see2-150',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'S Corporation Termination',
    subtopic: 'Automatic Termination',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'An S corporation election automatically terminates if:',
    options: [
      'The corporation has losses for 3 consecutive years',
      'Any shareholder sells their stock',
      'Stock is transferred to an ineligible shareholder',
      'The corporation fails to file Form 1120-S'
    ],
    correctAnswer: 2,
    explanation: 'Under IRC §1362(d)(2), an S election automatically terminates when the corporation ceases to meet eligibility requirements, such as when stock is transferred to an ineligible shareholder (corporation, partnership, or nonresident alien).',
    reference: 'IRC §1362(d)(2)',
  },
];

/**
 * EA SEE Part 2: Businesses - Questions Batch 50 (Q491-500)
 * Comprehensive Review and Mixed Topics
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH50: Question[] = [
  // ==========================================
  // Mixed Review Topics
  // ==========================================
  {
    id: 'see2-491',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-1',
    topic: 'Entity Selection',
    subtopic: 'Comparing Entities',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Which entity type provides the greatest flexibility in allocating profits and losses among owners?',
    options: [
      'C corporation',
      'S corporation',
      'Partnership/LLC taxed as partnership',
      'Sole proprietorship'
    ],
    correctAnswer: 2,
    explanation: 'Partnerships offer the most flexibility through special allocations of income, loss, deductions, and credits among partners, subject to substantial economic effect rules. S corps must allocate pro-rata.',
    reference: 'IRC §704(a)',
  },
  {
    id: 'see2-492',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Corporate Taxation',
    subtopic: 'Accumulated Earnings Tax',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The accumulated earnings tax is designed to:',
    options: [
      'Encourage corporations to retain earnings',
      'Penalize C corporations that accumulate earnings beyond reasonable business needs to avoid dividend tax',
      'Tax all retained earnings',
      'Apply to S corporations'
    ],
    correctAnswer: 1,
    explanation: 'The accumulated earnings tax (20%) applies to C corporations that accumulate earnings beyond reasonable business needs to allow shareholders to avoid dividend taxation. A $250,000/$150,000 minimum is allowed.',
    reference: 'IRC §531-537',
  },
  {
    id: 'see2-493',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Corporate Taxation',
    subtopic: 'Personal Holding Company',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A personal holding company (PHC) is subject to a 20% penalty tax on:',
    options: [
      'All corporate income',
      'Undistributed personal holding company income',
      'Dividend payments',
      'Capital gains only'
    ],
    correctAnswer: 1,
    explanation: 'PHCs (>60% passive income, >50% owned by 5 or fewer individuals) face a 20% penalty tax on undistributed PHC income to discourage using corporations to shelter passive income.',
    reference: 'IRC §541-547',
  },
  {
    id: 'see2-494',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-4',
    topic: 'Partnership Taxation',
    subtopic: 'Guaranteed Payments SE Tax',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Guaranteed payments to a partner for services are:',
    options: [
      'Never subject to self-employment tax',
      'Subject to self-employment tax',
      'Treated as wages subject to FICA',
      'Tax-exempt'
    ],
    correctAnswer: 1,
    explanation: 'Guaranteed payments for services to a general partner are subject to self-employment tax, similar to how a partner\'s distributive share of ordinary income is treated.',
    reference: 'IRC §1402(a)',
  },
  {
    id: 'see2-495',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'S Corporation',
    subtopic: 'Reasonable Compensation',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'If an S corporation shareholder-employee takes distributions but minimal salary, the IRS may:',
    options: [
      'Automatically revoke the S election',
      'Reclassify distributions as wages subject to employment taxes',
      'Assess a penalty equal to 50% of distributions',
      'Require conversion to C corporation status'
    ],
    correctAnswer: 1,
    explanation: 'The IRS may recharacterize distributions as wages if the shareholder-employee takes unreasonably low salary. This subjects the reclassified amount to FICA taxes plus potential penalties.',
    reference: 'IRS Fact Sheet 2008-25; Rev. Rul. 74-44',
  },
  {
    id: 'see2-496',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Business Expenses',
    subtopic: 'Home Office Simplified',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'The simplified home office deduction method allows a deduction of:',
    options: [
      '$10 per square foot, max 500 sq ft',
      '$5 per square foot, max 300 sq ft',
      '$15 per square foot, no limit',
      'Actual expenses only'
    ],
    correctAnswer: 1,
    explanation: 'The simplified method allows $5 per square foot of home office space, up to 300 sq ft ($1,500 max). This avoids complex calculations of actual expense percentage.',
    reference: 'Rev. Proc. 2013-13',
  },
  {
    id: 'see2-497',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Accounting Methods',
    subtopic: 'Inventory Capitalization',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The uniform capitalization rules (UNICAP) under §263A require:',
    options: [
      'Expensing all inventory costs immediately',
      'Capitalizing certain indirect costs into inventory/property produced',
      'Immediate deduction of all production costs',
      'Deferring direct costs only'
    ],
    correctAnswer: 1,
    explanation: 'UNICAP requires taxpayers to capitalize certain indirect costs (storage, handling, portions of overhead) into inventory or long-lived property produced or purchased for resale.',
    reference: 'IRC §263A',
  },
  {
    id: 'see2-498',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-8',
    topic: 'Retirement Plans',
    subtopic: 'Solo 401(k)',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A Solo 401(k) plan is available to:',
    options: [
      'Any employer with employees',
      'Self-employed individuals with no full-time employees (other than spouse)',
      'C corporations only',
      'Part-time workers only'
    ],
    correctAnswer: 1,
    explanation: 'Solo 401(k) plans are for self-employed individuals or business owners with no full-time employees (spouse can be included). Higher contribution limits than SEP-IRAs are possible.',
    reference: 'IRC §401(k); IRS Publication 560',
  },
  {
    id: 'see2-499',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'Tax-Exempt Organizations',
    subtopic: 'Political Activity',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A 501(c)(3) organization that engages in political campaign activity:',
    options: [
      'May do so up to 5% of budget',
      'May lose its tax-exempt status - absolutely prohibited from campaign intervention',
      'Must file Form 1120',
      'Can make unlimited contributions'
    ],
    correctAnswer: 1,
    explanation: '501(c)(3) organizations are absolutely prohibited from participating in political campaigns for or against any candidate. Violation can result in loss of exempt status and excise taxes.',
    reference: 'IRC §501(c)(3); IRC §4955',
  },
  {
    id: 'see2-500',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-1',
    topic: 'Entity Formation',
    subtopic: 'Check-the-Box',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Under the "check-the-box" regulations, an eligible business entity may elect:',
    options: [
      'Only to be taxed as a corporation',
      'To be classified as a corporation or as a pass-through (partnership or disregarded entity)',
      'Any classification regardless of state law',
      'Different classifications for federal and state tax'
    ],
    correctAnswer: 1,
    explanation: 'Check-the-box allows eligible entities (generally LLCs) to elect corporate or pass-through (partnership if 2+ owners, disregarded if 1 owner) tax treatment on Form 8832. Default rules apply if no election.',
    reference: 'Treas. Reg. §301.7701-3',
  },
];

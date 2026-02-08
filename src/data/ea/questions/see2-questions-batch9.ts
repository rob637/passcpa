/**
 * EA SEE Part 2: Businesses - Questions Batch 9 (Q81-90)
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH9: Question[] = [
  // ==========================================
  // SEE2-8: Specialized Industries and Entities (continued)
  // ==========================================
  {
    id: 'see2-081',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-8',
    topic: 'Trusts',
    subtopic: 'Grantor Trust',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Income from a grantor trust is taxed to:',
    options: [
      'The trust itself',
      'The beneficiaries',
      'The grantor (creator) of the trust',
      'No one - it is tax-exempt'
    ],
    correctAnswer: 2,
    explanation: 'A grantor trust is disregarded for income tax purposes. All income, deductions, and credits are reported on the grantor\'s individual return. Examples include revocable living trusts where the grantor retains control.',
    reference: 'IRC §671-679',
  },
  {
    id: 'see2-082',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-8',
    topic: 'Trusts',
    subtopic: 'Distribution Deduction',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A trust receives a deduction for distributions to beneficiaries equal to:',
    options: [
      'The total amount distributed',
      'The lesser of distributions made or distributable net income (DNI)',
      '50% of distributions',
      'No deduction is allowed'
    ],
    correctAnswer: 1,
    explanation: 'A trust receives a distribution deduction for the lesser of actual distributions or distributable net income (DNI). DNI limits both the trust\'s deduction and the amount beneficiaries must include in income.',
    reference: 'IRC §651, §661',
  },
  {
    id: 'see2-083',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-8',
    topic: 'Estates',
    subtopic: 'Income in Respect of Decedent',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Income in respect of a decedent (IRD) is:',
    options: [
      'Always tax-free to the recipient',
      'Income the decedent earned but had not received by the date of death',
      'Capital gain from inherited property',
      'Only wages owed at death'
    ],
    correctAnswer: 1,
    explanation: 'IRD includes income the decedent earned but had not yet received at death (e.g., unpaid salary, IRA distributions, installment payments). IRD does not receive a stepped-up basis and is taxed to whoever receives it.',
    reference: 'IRC §691',
  },
  {
    id: 'see2-084',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-8',
    topic: 'Tax-Exempt Organizations',
    subtopic: 'Private Foundations',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Private foundations are subject to excise taxes on:',
    options: [
      'All investment income',
      'Self-dealing, failure to distribute income, and other prohibited activities',
      'Charitable contributions received',
      'No special taxes apply'
    ],
    correctAnswer: 1,
    explanation: 'Private foundations are subject to excise taxes on self-dealing, failure to distribute minimum amounts, excess business holdings, jeopardizing investments, and taxable expenditures. They also pay a 1.39% tax on net investment income.',
    reference: 'IRC §4940-4948',
  },
  {
    id: 'see2-085',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-8',
    topic: 'Farming',
    subtopic: 'Conservation Expenses',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Farmers may currently deduct soil and water conservation expenses:',
    options: [
      'Up to 25% of gross income from farming',
      'Without limitation',
      'Only if they exceed $10,000',
      'These expenses must be capitalized'
    ],
    correctAnswer: 0,
    explanation: 'Farmers may elect to deduct soil and water conservation expenditures that would otherwise be capital expenses. The deduction is limited to 25% of gross income from farming; excess is carried forward.',
    reference: 'IRC §175',
  },
  {
    id: 'see2-086',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-8',
    topic: 'Construction',
    subtopic: 'Completed Contract Method',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The completed contract method of accounting is available for:',
    options: [
      'All construction contracts',
      'Home construction contracts and contracts expected to be completed within 2 years by small contractors',
      'Only contracts under $1 million',
      'It is no longer available'
    ],
    correctAnswer: 1,
    explanation: 'The completed contract method is available for home construction contracts and for contracts expected to be completed within 2 years by contractors meeting the gross receipts test. Most other long-term contracts must use percentage of completion.',
    reference: 'IRC §460',
  },

  // ==========================================
  // SEE2-2: Business Financial Information (advanced)
  // ==========================================
  {
    id: 'see2-087',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Accounting Methods',
    subtopic: 'Section 481 Adjustment',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'When a taxpayer changes accounting methods, a Section 481 adjustment is:',
    options: [
      'Always spread over 4 years',
      'Made to prevent duplications or omissions of income/deductions',
      'Required only for cash to accrual changes',
      'Paid as a penalty'
    ],
    correctAnswer: 1,
    explanation: 'A Section 481(a) adjustment prevents items from being duplicated or omitted due to an accounting method change. Positive adjustments are generally spread over 4 years; negative adjustments are taken entirely in the year of change.',
    reference: 'IRC §481',
  },
  {
    id: 'see2-088',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Tax Years',
    subtopic: 'Short Tax Year',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A short tax year occurs when:',
    options: [
      'The business has a loss',
      'The tax year is less than 12 months due to formation, termination, or change in tax year',
      'Quarterly payments are required',
      'The business files for bankruptcy'
    ],
    correctAnswer: 1,
    explanation: 'A short tax year is a tax year of less than 12 months, which occurs when a business is formed or terminated mid-year, or when it changes its annual accounting period. Annualization rules may apply.',
    reference: 'IRC §443',
  },

  // ==========================================
  // SEE2-3: Business Income and Expenses
  // ==========================================
  {
    id: 'see2-089',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Business Credits',
    subtopic: 'Disabled Access Credit',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The Disabled Access Credit (Form 8826) is available to small businesses for:',
    options: [
      'Hiring disabled employees only',
      'Expenses incurred to comply with the Americans with Disabilities Act',
      'Building new facilities only',
      'Medical expenses for disabled employees'
    ],
    correctAnswer: 1,
    explanation: 'The Disabled Access Credit is 50% of eligible expenses between $250 and $10,250 (maximum credit $5,000) for small businesses to comply with ADA requirements. This includes removing barriers, providing interpreters, and acquiring equipment.',
    reference: 'IRC §44',
  },
  {
    id: 'see2-090',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Business Expenses',
    subtopic: 'Domestic Production Deduction',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The Domestic Production Activities Deduction (Section 199) was:',
    options: [
      'Increased by the TCJA',
      'Repealed by the TCJA and replaced with the QBI deduction',
      'Available only to manufacturers',
      'Still in effect at 9% of qualifying income'
    ],
    correctAnswer: 1,
    explanation: 'The Section 199 Domestic Production Activities Deduction was repealed by the TCJA for tax years after 2017. The Section 199A QBI deduction was introduced as an alternative benefit for pass-through entities.',
    reference: 'TCJA 2017',
  },
];

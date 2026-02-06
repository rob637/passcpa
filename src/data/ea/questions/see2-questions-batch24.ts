/**
 * EA SEE Part 2: Businesses - Questions Batch 24 (Q231-240)
 * Business Deductions
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH24: Question[] = [
  // ==========================================
  // SEE2-3: Business Deductions
  // ==========================================
  {
    id: 'see2-231',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Business Deductions',
    subtopic: 'Ordinary and Necessary',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'To be deductible under IRC §162, a business expense must be:',
    options: [
      'Paid for in cash during the tax year',
      'Ordinary and necessary for the trade or business',
      'Approved by the IRS in advance',
      'Less than $5,000 per item'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §162(a), deductible business expenses must be ordinary (common and accepted in the taxpayer\'s business) and necessary (appropriate and helpful). They must also be reasonable in amount.',
    reference: 'IRC §162(a)',
  },
  {
    id: 'see2-232',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Business Deductions',
    subtopic: 'Business Meals',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'For 2024, business meal expenses (not entertainment) are generally deductible at:',
    options: [
      '100%',
      '80%',
      '50%',
      '0% - no deduction allowed'
    ],
    correctAnswer: 2,
    explanation: 'Under IRC §274(n), business meals are generally 50% deductible. The 100% deduction for restaurant meals in 2021-2022 (COVID relief) has expired. Entertainment expenses remain 0% deductible.',
    reference: 'IRC §274(n)(1)',
  },
  {
    id: 'see2-233',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Business Deductions',
    subtopic: 'Reasonable Compensation',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'If the IRS determines that a shareholder-employee\'s salary is unreasonable, the excess amount is treated as:',
    options: [
      'Not deductible by the corporation, remains salary to the employee',
      'A constructive dividend (nondeductible by corp, dividend income to shareholder)',
      'Deferred compensation',
      'A loan to the shareholder'
    ],
    correctAnswer: 1,
    explanation: 'Unreasonable compensation is recharacterized as a constructive dividend. The corporation loses the deduction, and the shareholder has dividend income rather than wages (no payroll taxes but no wage deduction).',
    reference: 'IRC §162(a)(1)',
  },
  {
    id: 'see2-234',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Business Deductions',
    subtopic: 'Research and Experimental',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'For tax years beginning after 2021, research and experimental expenditures must be:',
    options: [
      'Deducted in the year incurred',
      'Capitalized and amortized over 5 years (15 years for foreign research)',
      'Treated as start-up costs',
      'Claimed only as a tax credit'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §174 as amended by TCJA, R&E expenditures must be capitalized and amortized over 5 years (15 years for foreign research) starting with the midpoint of the year incurred. Immediate expensing is no longer allowed.',
    reference: 'IRC §174',
  },
  {
    id: 'see2-235',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Business Deductions',
    subtopic: 'Business Interest Limitation',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Under IRC §163(j), business interest expense is limited to:',
    options: [
      '50% of taxable income',
      '30% of adjusted taxable income (with modifications)',
      'Interest income only',
      'No limitation applies to most businesses'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §163(j), deductible business interest is limited to business interest income plus 30% of adjusted taxable income. Exceptions apply to small businesses (under $29M gross receipts) and certain trades.',
    reference: 'IRC §163(j)',
  },
  {
    id: 'see2-236',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Business Deductions',
    subtopic: 'Domestic Production',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The domestic production activities deduction (DPAD) under former Section 199:',
    options: [
      'Still applies to all domestic manufacturing',
      'Was repealed by TCJA, replaced in part by Section 199A for pass-throughs',
      'Was increased to 15% by TCJA',
      'Only applies to agricultural cooperatives'
    ],
    correctAnswer: 1,
    explanation: 'TCJA repealed Section 199 DPAD for tax years after 2017. However, cooperatives retain a modified version, and Section 199A provides the QBI deduction for pass-through income (different purpose but similar concept).',
    reference: 'Former IRC §199; IRC §199A',
  },
  {
    id: 'see2-237',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Business Deductions',
    subtopic: 'Net Operating Loss',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A business has an NOL in 2024. The NOL can be:',
    options: [
      'Carried back 2 years or forward 20 years',
      'Carried forward indefinitely, offsetting 80% of taxable income',
      'Carried back 5 years, or forward 15 years',
      'Fully refunded in the current year'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §172 post-TCJA, NOLs can only be carried forward (no carryback except for farming losses) indefinitely, but can only offset 80% of taxable income in any carryforward year.',
    reference: 'IRC §172(a); IRC §172(b)',
  },
  {
    id: 'see2-238',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Business Deductions',
    subtopic: 'Bad Debts',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A business using the accrual method has a $10,000 accounts receivable that becomes worthless. The business can deduct:',
    options: [
      'Nothing, because credit sales are not taxable income',
      '$10,000 as a bad debt expense',
      '$10,000 as a capital loss',
      'Only the amount exceeding 2% of AGI'
    ],
    correctAnswer: 1,
    explanation: 'An accrual-method business that previously included the receivable in income can deduct the worthless amount as a business bad debt (ordinary deduction). Specific charge-off method is generally required.',
    reference: 'IRC §166',
  },
  {
    id: 'see2-239',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Business Deductions',
    subtopic: 'Repairs vs. Improvements',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Under the repair regulations, an expenditure must be capitalized if it:',
    options: [
      'Exceeds $500',
      'Betters, restores, or adapts the property to a new or different use',
      'Maintains the property in ordinarily efficient operating condition',
      'Is paid to an independent contractor'
    ],
    correctAnswer: 1,
    explanation: 'Under Treas. Reg. §1.263(a)-3, amounts paid that better, restore, or adapt a unit of property must be capitalized. Routine maintenance that keeps property in ordinarily efficient condition is deductible.',
    reference: 'Treas. Reg. §1.263(a)-3',
  },
  {
    id: 'see2-240',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Business Deductions',
    subtopic: 'De Minimis Safe Harbor',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Under the de minimis safe harbor, a business with an applicable financial statement can expense property items costing up to:',
    options: [
      '$500 per item',
      '$2,500 per item',
      '$5,000 per item',
      '$10,000 per item'
    ],
    correctAnswer: 2,
    explanation: 'Under Treas. Reg. §1.263(a)-1(f), businesses with an AFS can expense items up to $5,000 per invoice/item. Without an AFS, the limit is $2,500. A written policy must be in place.',
    reference: 'Treas. Reg. §1.263(a)-1(f)',
  },
];

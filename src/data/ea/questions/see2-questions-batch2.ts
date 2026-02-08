/**
 * EA SEE Part 2: Businesses - Questions Batch 2 (Q11-20)
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH2: Question[] = [
  // ==========================================
  // SEE2-3: Business Income and Expenses (continued)
  // ==========================================
  {
    id: 'see2-011',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Depreciation',
    subtopic: 'MACRS Recovery Periods',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Under MACRS, office furniture is depreciated over:',
    options: [
      '3 years',
      '5 years',
      '7 years',
      '10 years'
    ],
    correctAnswer: 2,
    explanation: 'Office furniture, fixtures, and equipment are 7-year MACRS property. Common 5-year property includes computers and automobiles. Common 3-year property includes certain manufacturing tools.',
    reference: 'IRC §168; IRS Publication 946',
  },
  {
    id: 'see2-012',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Depreciation',
    subtopic: 'Listed Property',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'If listed property (such as a vehicle) is used less than 50% for business, the depreciation method must be:',
    options: [
      'MACRS using the 200% declining balance method',
      'MACRS using the straight-line method over ADS recovery period',
      'Section 179 expensing',
      'No depreciation is allowed'
    ],
    correctAnswer: 1,
    explanation: 'If listed property is not used more than 50% for business, Section 179 and bonus depreciation are not available, and MACRS depreciation must use the straight-line method over the ADS recovery period.',
    reference: 'IRC §280F',
  },
  {
    id: 'see2-013',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Business Expenses',
    subtopic: 'Home Office Deduction',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The simplified method for the home office deduction allows:',
    options: [
      '$5 per square foot up to 300 square feet',
      '$10 per square foot up to 500 square feet',
      '$15 per square foot unlimited',
      '$3 per square foot up to 200 square feet'
    ],
    correctAnswer: 0,
    explanation: 'The simplified method allows $5 per square foot of home used for business, up to a maximum of 300 square feet ($1,500 maximum deduction). This eliminates the need to track actual expenses and depreciation.',
    reference: 'Rev. Proc. 2013-13',
  },
  {
    id: 'see2-014',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Business Expenses',
    subtopic: 'Vehicle Expenses',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'For 2025, the standard mileage rate for business use of a vehicle is approximately:',
    options: [
      '56 cents per mile',
      '62.5 cents per mile',
      '67 cents per mile',
      '70 cents per mile'
    ],
    correctAnswer: 2,
    explanation: 'For 2025, the standard mileage rate for business use is 67 cents per mile. This rate covers depreciation, gas, oil, repairs, insurance, and registration. Parking and tolls are deductible in addition to the standard rate.',
    reference: 'IRS Notice 2024-08',
  },
  {
    id: 'see2-015',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Cost of Goods Sold',
    subtopic: 'Inventory Methods',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'During a period of rising prices, which inventory method results in the lowest taxable income?',
    options: [
      'FIFO (First-In, First-Out)',
      'LIFO (Last-In, First-Out)',
      'Specific identification',
      'Weighted average'
    ],
    correctAnswer: 1,
    explanation: 'LIFO assumes the most recently purchased (higher-cost) inventory is sold first. During rising prices, this results in higher cost of goods sold and lower taxable income compared to FIFO.',
    reference: 'IRC §472; IRS Publication 538',
  },

  // ==========================================
  // SEE2-4: Sole Proprietorships
  // ==========================================
  {
    id: 'see2-016',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-4',
    topic: 'Sole Proprietorship',
    subtopic: 'Schedule C',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Net profit from a sole proprietorship reported on Schedule C is subject to:',
    options: [
      'Income tax only',
      'Self-employment tax only',
      'Both income tax and self-employment tax',
      'Neither income tax nor self-employment tax'
    ],
    correctAnswer: 2,
    explanation: 'Net profit from Schedule C is subject to both income tax (reported on Form 1040) and self-employment tax (Social Security and Medicare, reported on Schedule SE). This differs from wages, where FICA is split with the employer.',
    reference: 'IRC §1401; IRS Publication 334',
  },
  {
    id: 'see2-017',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-4',
    topic: 'Sole Proprietorship',
    subtopic: 'Business Use of Home',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'To qualify for the home office deduction, the space must be:',
    options: [
      'Used occasionally for business',
      'Used regularly and exclusively for business',
      'The primary location of the business',
      'At least 500 square feet'
    ],
    correctAnswer: 1,
    explanation: 'The home office deduction requires the space to be used REGULARLY and EXCLUSIVELY for business. An exception applies to storage of inventory or product samples, and for daycare facilities.',
    reference: 'IRC §280A(c)',
  },
  {
    id: 'see2-018',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-4',
    topic: 'Sole Proprietorship',
    subtopic: 'Net Operating Loss',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Net operating losses from a sole proprietorship can offset:',
    options: [
      'Only business income',
      'Other income on the individual return, subject to limitations',
      'Only income from the same business in future years',
      'Nothing - losses are not deductible'
    ],
    correctAnswer: 1,
    explanation: 'NOLs from a sole proprietorship can offset the taxpayer\'s other income on their individual return, subject to the excess business loss limitation. Unused NOLs are carried forward indefinitely (no carryback for most losses after 2020).',
    reference: 'IRC §172; IRC §461(l)',
  },

  // ==========================================
  // SEE2-5: Partnerships
  // ==========================================
  {
    id: 'see2-019',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'Partnership Formation',
    subtopic: 'Contribution of Property',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When a partner contributes property to a partnership in exchange for a partnership interest, the transaction is generally:',
    options: [
      'Taxable at fair market value',
      'Tax-free with carryover basis',
      'Taxable only if a gain is realized',
      'Tax-free with stepped-up basis'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §721, no gain or loss is recognized when property is contributed to a partnership in exchange for a partnership interest. The partnership takes a carryover basis in the property, and the partner\'s basis in the interest equals their basis in property contributed.',
    reference: 'IRC §721, §722, §723',
  },
  {
    id: 'see2-020',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'Partnership Taxation',
    subtopic: 'Pass-Through',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A partnership itself:',
    options: [
      'Pays income tax on its earnings',
      'Does not pay income tax; income passes through to partners',
      'Pays tax at a flat 21% rate',
      'Has the option to pay tax or pass through'
    ],
    correctAnswer: 1,
    explanation: 'A partnership is a pass-through entity that does not pay income tax. Instead, items of income, deduction, gain, and loss pass through to partners who report them on their individual returns via Schedule K-1.',
    reference: 'IRC §701',
  },
];

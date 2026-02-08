/**
 * EA SEE Part 2: Businesses - Questions Batch 20 (Q191-200)
 * Depreciation and Cost Recovery
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH20: Question[] = [
  // ==========================================
  // SEE2-3: Depreciation and Amortization
  // ==========================================
  {
    id: 'see2-191',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Depreciation',
    subtopic: 'MACRS Recovery Periods',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Under MACRS, office furniture and fixtures are depreciated over:',
    options: [
      '3 years',
      '5 years',
      '7 years',
      '15 years'
    ],
    correctAnswer: 2,
    explanation: 'Under MACRS, office furniture and fixtures are 7-year property. Common recovery periods: 3-year (some manufacturing tools), 5-year (computers, vehicles), 7-year (furniture, equipment), 27.5-year (residential rental), 39-year (nonresidential).',
    reference: 'IRC §168(c); Rev. Proc. 87-56',
  },
  {
    id: 'see2-192',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Depreciation',
    subtopic: 'Section 179 Expense',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'For 2024, the maximum Section 179 expense deduction is:',
    options: [
      '$500,000',
      '$1,050,000',
      '$1,160,000',
      '$2,000,000'
    ],
    correctAnswer: 2,
    explanation: 'The Section 179 limit for 2024 is $1,160,000 (indexed for inflation). The deduction phases out dollar-for-dollar when total qualifying property exceeds $2,890,000. It cannot exceed business income.',
    reference: 'IRC §179(b); Rev. Proc. 2023-34',
  },
  {
    id: 'see2-193',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Depreciation',
    subtopic: 'Section 179 Limitations',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A business has taxable income (before Section 179) of $40,000 and purchases $100,000 of qualifying equipment. The maximum Section 179 deduction is:',
    options: [
      '$100,000',
      '$40,000',
      '$60,000',
      '$0'
    ],
    correctAnswer: 1,
    explanation: 'The Section 179 deduction cannot exceed the taxpayer\'s taxable income from active business operations. Here, the deduction is limited to $40,000. The $60,000 disallowed amount carries forward.',
    reference: 'IRC §179(b)(3)',
  },
  {
    id: 'see2-194',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Depreciation',
    subtopic: 'Bonus Depreciation',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'For property placed in service in 2024, bonus depreciation under IRC §168(k) is:',
    options: [
      '100%',
      '80%',
      '60%',
      '40%'
    ],
    correctAnswer: 2,
    explanation: 'Bonus depreciation phases down: 80% for 2023, 60% for 2024, 40% for 2025, 20% for 2026, 0% for 2027+. It applies to new qualified property (and used property under TCJA rules).',
    reference: 'IRC §168(k)(6)',
  },
  {
    id: 'see2-195',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Depreciation',
    subtopic: 'Luxury Auto Limits',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A taxpayer places a $60,000 passenger automobile (100% business use) in service in 2024 and does not elect out of bonus depreciation. The first-year depreciation is approximately:',
    options: [
      '$3,160',
      '$10,200',
      '$12,200',
      '$20,200'
    ],
    correctAnswer: 3,
    explanation: 'For 2024, the luxury auto limit is $20,200 for year 1 if bonus depreciation applies ($12,200 without bonus). Despite 60% bonus depreciation in 2024, the deduction is capped at the luxury auto limits.',
    reference: 'IRC §280F(a); Rev. Proc. 2024-13',
  },
  {
    id: 'see2-196',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Depreciation',
    subtopic: 'Listed Property',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Which of the following is considered listed property subject to special depreciation rules?',
    options: [
      'Manufacturing equipment',
      'Passenger automobiles used primarily for business',
      'Commercial trucks over 14,000 pounds',
      'Office buildings'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §280F(d)(4), listed property includes passenger autos, property used for entertainment, recreation, or amusement, and computers (pre-2018). Heavy SUVs/trucks over 6,000 lbs GVW are exempt from most listed property limitations.',
    reference: 'IRC §280F(d)(4)',
  },
  {
    id: 'see2-197',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Depreciation',
    subtopic: 'Mid-Quarter Convention',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The mid-quarter convention must be used when:',
    options: [
      'Any asset is placed in service in the 4th quarter',
      'More than 40% of depreciable property basis is placed in service in the last quarter',
      'More than 50% of property is placed in service in any single quarter',
      'The business uses a fiscal year'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §168(d)(3), the mid-quarter convention applies if more than 40% of the aggregate bases of MACRS property (excluding real property) is placed in service during the last 3 months of the tax year.',
    reference: 'IRC §168(d)(3)',
  },
  {
    id: 'see2-198',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Amortization',
    subtopic: 'Section 197 Intangibles',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Goodwill acquired in a business acquisition is amortized over:',
    options: [
      '5 years',
      '10 years',
      '15 years',
      'Not amortizable; tested for impairment'
    ],
    correctAnswer: 2,
    explanation: 'Under IRC §197, goodwill and most purchased intangibles (covenants not to compete, customer lists, franchises) are amortized ratably over 15 years beginning in the month of acquisition.',
    reference: 'IRC §197(a)',
  },
  {
    id: 'see2-199',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Amortization',
    subtopic: 'Startup Costs',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A new business incurs $60,000 in startup costs. In the first year, the business can deduct:',
    options: [
      '$60,000 in full',
      '$5,000 plus amortization of $55,000 over 180 months',
      '$0 in year 1; amortize over 180 months',
      '$5,000 deduction reduced by excess over $50,000; remainder amortized over 180 months'
    ],
    correctAnswer: 3,
    explanation: 'Under IRC §195, $5,000 of startup costs can be deducted in year 1, REDUCED by the amount exceeding $50,000. Here, reduced by $10,000 to $0 immediate deduction. The full $60,000 is amortized over 180 months.',
    reference: 'IRC §195(b)',
  },
  {
    id: 'see2-200',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Depreciation',
    subtopic: 'Depreciation Recapture',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Equipment with an adjusted basis of $10,000 and accumulated depreciation of $15,000 is sold for $30,000. How much is Section 1245 recapture?',
    options: [
      '$5,000',
      '$10,000',
      '$15,000',
      '$20,000'
    ],
    correctAnswer: 2,
    explanation: 'Section 1245 recapture is the lesser of: (1) gain realized ($30,000 - $10,000 = $20,000) or (2) depreciation taken ($15,000). The $15,000 is ordinary income; remaining $5,000 is Section 1231 gain.',
    reference: 'IRC §1245(a)',
  },
];

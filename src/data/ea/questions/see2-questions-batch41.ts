/**
 * EA SEE Part 2: Businesses - Questions Batch 41 (Q401-410)
 * Qualified Business Income Deduction (Section 199A)
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH41: Question[] = [
  // ==========================================
  // SEE2-3: Qualified Business Income Deduction
  // ==========================================
  {
    id: 'see2-401',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'QBI Deduction',
    subtopic: 'Section 199A Overview',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The Section 199A qualified business income (QBI) deduction allows:',
    options: [
      'C corporations to deduct 20% of income',
      'Owners of pass-through entities and sole proprietors to deduct up to 20% of QBI',
      'All employees to deduct 20% of wages',
      'Taxpayers to defer 20% of business income'
    ],
    correctAnswer: 1,
    explanation: 'Section 199A allows eligible taxpayers (individuals, trusts, estates) to deduct up to 20% of qualified business income from pass-through entities, sole proprietorships, and certain other sources.',
    reference: 'IRC §199A(a)',
  },
  {
    id: 'see2-402',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'QBI Deduction',
    subtopic: 'Qualified Business Income',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Qualified business income (QBI) includes:',
    options: [
      'Interest income and capital gains',
      'Net amount of qualified items of income, gain, deduction, and loss from a qualified trade or business',
      'All gross receipts from any source',
      'W-2 wages from employment'
    ],
    correctAnswer: 1,
    explanation: 'QBI is the net amount of qualified items (ordinary income/loss connected with the business) but excludes investment income, W-2 wages, reasonable compensation, guaranteed payments, and certain other items.',
    reference: 'IRC §199A(c)',
  },
  {
    id: 'see2-403',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'QBI Deduction',
    subtopic: 'Specified Service Trade',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A specified service trade or business (SSTB) includes:',
    options: [
      'Manufacturing businesses',
      'Health, law, accounting, consulting, financial services, and similar professional services',
      'Retail establishments',
      'Real estate businesses'
    ],
    correctAnswer: 1,
    explanation: 'SSTBs include health, law, accounting, actuarial services, performing arts, consulting, athletics, financial services, brokerage, and any business where the principal asset is reputation or skill of employees.',
    reference: 'IRC §199A(d)(2)',
  },
  {
    id: 'see2-404',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'QBI Deduction',
    subtopic: 'SSTB Threshold',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Income from a specified service trade or business qualifies for the QBI deduction if:',
    options: [
      'Never, regardless of income level',
      'Taxable income is below the threshold ($182,100 single, $364,200 MFJ for 2024)',
      'Only if the business has employees',
      'Only if the taxpayer materially participates'
    ],
    correctAnswer: 1,
    explanation: 'SSTB income fully qualifies for the 20% deduction if taxable income is below the threshold. Above the threshold, the deduction phases out over $50,000/$100,000 and is fully eliminated above that range.',
    reference: 'IRC §199A(d)(3)',
  },
  {
    id: 'see2-405',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'QBI Deduction',
    subtopic: 'W-2 Wage Limitation',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'For taxpayers above the income threshold, the QBI deduction is limited to the greater of:',
    options: [
      '20% of QBI with no other limitation',
      '50% of W-2 wages OR 25% of W-2 wages plus 2.5% of qualified property',
      '$25,000 per business',
      '10% of gross receipts'
    ],
    correctAnswer: 1,
    explanation: 'Above the threshold, the deduction is limited to the greater of: (1) 50% of W-2 wages, or (2) 25% of W-2 wages + 2.5% of the unadjusted basis of qualified property.',
    reference: 'IRC §199A(b)(2)',
  },
  {
    id: 'see2-406',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'QBI Deduction',
    subtopic: 'Overall Limitation',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The overall QBI deduction is limited to:',
    options: [
      '20% of AGI',
      '20% of taxable income minus net capital gain',
      '20% of gross income',
      '20% of self-employment income'
    ],
    correctAnswer: 1,
    explanation: 'The total QBI deduction cannot exceed 20% of taxable income minus net capital gain (including qualified dividends). This prevents the deduction from exceeding the general income threshold.',
    reference: 'IRC §199A(a)(2)',
  },
  {
    id: 'see2-407',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'QBI Deduction',
    subtopic: 'Qualified Property',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Qualified property for purposes of the 2.5% QBI limitation includes:',
    options: [
      'All business assets',
      'Tangible, depreciable property held at year-end and used in producing QBI',
      'Inventory and accounts receivable',
      'Goodwill and intangibles'
    ],
    correctAnswer: 1,
    explanation: 'Qualified property means tangible, depreciable property held at close of the tax year, used in producing QBI, and for which the depreciable period has not ended.',
    reference: 'IRC §199A(b)(6)',
  },
  {
    id: 'see2-408',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'QBI Deduction',
    subtopic: 'Rental Real Estate',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Rental real estate income generally qualifies for the QBI deduction:',
    options: [
      'Never - rentals are excluded',
      'Only if it rises to the level of a trade or business or meets the safe harbor',
      'Automatically for all rental income',
      'Only for commercial properties'
    ],
    correctAnswer: 1,
    explanation: 'Rental real estate qualifies if it constitutes a trade or business under §162 or meets the IRS safe harbor (250+ hours of rental services, separate books, contemporaneous records).',
    reference: 'IRS Rev. Proc. 2019-38',
  },
  {
    id: 'see2-409',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'QBI Deduction',
    subtopic: 'Aggregation',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Taxpayers may aggregate multiple trades or businesses for QBI purposes if:',
    options: [
      'They are under common control, share centralized business elements, and operate in a coordinated manner',
      'They have the same NAICS code',
      'Total revenue exceeds $1 million',
      'All businesses are SSTBs'
    ],
    correctAnswer: 0,
    explanation: 'Businesses may be aggregated if under common control (50%+), share at least two of three common factors: (1) centralized purchasing, (2) common legal department, (3) common reporting, etc.',
    reference: 'Treas. Reg. §1.199A-4',
  },
  {
    id: 'see2-410',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'QBI Deduction',
    subtopic: 'Carryover of Losses',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'If a qualified trade or business has a net loss for the year:',
    options: [
      'The loss is lost permanently for QBI purposes',
      'The loss carries forward and reduces QBI in future years',
      'The loss increases the QBI deduction',
      'The loss converts to a capital loss'
    ],
    correctAnswer: 1,
    explanation: 'QBI losses from one trade or business offset QBI from others in the same year. Any excess negative QBI carries forward to reduce QBI in subsequent years (proportionally across businesses).',
    reference: 'IRC §199A(c)(2)',
  },
];

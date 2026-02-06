/**
 * EA SEE Part 2: Businesses - Questions Batch 44 (Q431-440)
 * Business Property Dispositions
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH44: Question[] = [
  // ==========================================
  // SEE2-3: Business Property Dispositions
  // ==========================================
  {
    id: 'see2-431',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Property Dispositions',
    subtopic: 'Amount Realized',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Amount realized on a sale of business property includes:',
    options: [
      'Cash received only',
      'Cash, FMV of property received, and liabilities assumed by buyer, less selling expenses',
      'Only the down payment',
      'Gross receipts from the business'
    ],
    correctAnswer: 1,
    explanation: 'Amount realized includes cash, FMV of other property/services received, and liabilities transferred to (assumed by) the buyer. Selling expenses reduce amount realized.',
    reference: 'IRC §1001(b)',
  },
  {
    id: 'see2-432',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Property Dispositions',
    subtopic: 'Adjusted Basis',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The adjusted basis of business property equals:',
    options: [
      'Original cost only',
      'Original cost plus improvements minus depreciation allowed or allowable',
      'Fair market value at disposition',
      'Original cost minus all expenses'
    ],
    correctAnswer: 1,
    explanation: 'Adjusted basis = original cost + capital improvements - depreciation allowed or allowable. Depreciation reduces basis even if not claimed on tax returns.',
    reference: 'IRC §1016',
  },
  {
    id: 'see2-433',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Property Dispositions',
    subtopic: 'Holding Period',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'For long-term capital gain treatment, property must be held for:',
    options: [
      '6 months',
      'More than one year',
      'Exactly one year',
      '18 months'
    ],
    correctAnswer: 1,
    explanation: 'Property must be held for more than one year (more than 12 months) for long-term capital gain or loss treatment. One year exactly is considered short-term.',
    reference: 'IRC §1222',
  },
  {
    id: 'see2-434',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Property Dispositions',
    subtopic: 'Related Party Sales',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'If business property is sold at a loss to a related party:',
    options: [
      'The loss is fully deductible',
      'The loss is disallowed under IRC §267',
      'The loss becomes a capital loss',
      'The loss is deferred until the buyer sells'
    ],
    correctAnswer: 1,
    explanation: 'Under §267, losses on sales between related parties (family members, controlled entities) are disallowed. The buyer may use the disallowed loss to reduce gain on later sale to an unrelated party.',
    reference: 'IRC §267(a)(1)',
  },
  {
    id: 'see2-435',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Property Dispositions',
    subtopic: 'Involuntary Conversion',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Gain from an involuntary conversion may be deferred if:',
    options: [
      'The proceeds are deposited in a bank',
      'Replacement property is acquired within the specified period (2-3 years)',
      'The loss exceeds the gain',
      'The property was used for personal purposes'
    ],
    correctAnswer: 1,
    explanation: 'Under §1033, gain from involuntary conversion (condemnation, casualty, theft) can be deferred if similar or related-use property is acquired within 2 years (3 years for condemned real property).',
    reference: 'IRC §1033',
  },
  {
    id: 'see2-436',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Property Dispositions',
    subtopic: 'Replacement Property',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'For deferral under Section 1033, replacement property must be:',
    options: [
      'Identical to the converted property',
      'Similar or related in service or use (or like-kind for condemned real property)',
      'More valuable than the original',
      'Purchased from an unrelated party only'
    ],
    correctAnswer: 1,
    explanation: 'Replacement property must be similar or related in service or use to the converted property. For condemned real property, like-kind property (broader test) qualifies.',
    reference: 'IRC §1033(a)',
  },
  {
    id: 'see2-437',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Property Dispositions',
    subtopic: 'Wash Sale Rule',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The wash sale rule applies to:',
    options: [
      'Sales of real estate',
      'Sales of stock or securities at a loss if substantially identical securities are acquired within 30 days before or after',
      'All business asset sales',
      'Sales resulting in gains'
    ],
    correctAnswer: 1,
    explanation: 'Under §1091, losses on sales of stock/securities are disallowed if substantially identical securities are acquired within 30 days before or after the sale. Loss is added to new stock\'s basis.',
    reference: 'IRC §1091',
  },
  {
    id: 'see2-438',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Property Dispositions',
    subtopic: 'Sale of Business',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'When an entire business is sold, the purchase price must be:',
    options: [
      'Reported entirely as capital gain',
      'Allocated among the assets under the residual method',
      'Treated as ordinary income',
      'Deferred until all assets are disposed of'
    ],
    correctAnswer: 1,
    explanation: 'Under §1060 and the residual method, the purchase price is allocated among asset classes (cash, receivables, inventory, tangible property, intangibles, goodwill) in prescribed order.',
    reference: 'IRC §1060; Treas. Reg. §1.1060-1',
  },
  {
    id: 'see2-439',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Property Dispositions',
    subtopic: 'Goodwill',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Gain on the sale of self-created goodwill is generally:',
    options: [
      'Ordinary income',
      'Long-term capital gain',
      'Tax-exempt',
      'Short-term capital gain'
    ],
    correctAnswer: 1,
    explanation: 'Self-created goodwill has zero basis, so the entire sales price is gain. Since goodwill is a capital asset with indefinite holding period, gain is long-term capital gain.',
    reference: 'IRC §§1221, 1222',
  },
  {
    id: 'see2-440',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Property Dispositions',
    subtopic: 'Covenant Not to Compete',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Payments received for a covenant not to compete are treated as:',
    options: [
      'Long-term capital gain',
      'Ordinary income to the recipient',
      'Tax-exempt',
      'Return of capital'
    ],
    correctAnswer: 1,
    explanation: 'Payments for a covenant not to compete are ordinary income to the recipient and amortizable over 15 years to the payor under §197. They cannot be treated as capital gain.',
    reference: 'IRC §197; IRS rulings',
  },
];

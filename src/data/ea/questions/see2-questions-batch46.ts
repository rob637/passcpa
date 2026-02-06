/**
 * EA SEE Part 2: Businesses - Questions Batch 46 (Q451-460)
 * Farm Taxation
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH46: Question[] = [
  // ==========================================
  // SEE2-2: Farm Taxation
  // ==========================================
  {
    id: 'see2-451',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Farm Taxation',
    subtopic: 'Schedule F',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Farm income and expenses for a sole proprietor are reported on:',
    options: [
      'Schedule C',
      'Schedule F',
      'Schedule E',
      'Form 4835'
    ],
    correctAnswer: 1,
    explanation: 'Schedule F (Profit or Loss From Farming) is used by sole proprietor farmers to report farm income and expenses. Form 4835 is used for crop share landlords.',
    reference: 'IRS Schedule F Instructions',
  },
  {
    id: 'see2-452',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Farm Taxation',
    subtopic: 'Cash Method',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Farmers may use the cash method of accounting:',
    options: [
      'Only if gross receipts are under $1 million',
      'Regardless of gross receipts (unless a tax shelter)',
      'Only for the first 5 years of operation',
      'Never - farmers must use accrual'
    ],
    correctAnswer: 1,
    explanation: 'Farmers generally may use the cash method regardless of gross receipts level. This is an exception to the rules requiring large businesses to use accrual.',
    reference: 'IRC §447; IRC §448(b)',
  },
  {
    id: 'see2-453',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Farm Taxation',
    subtopic: 'Farm Income Averaging',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Farm income averaging under IRC §1301 allows farmers to:',
    options: [
      'Spread capital gains over 5 years',
      'Elect to have part of current year farm income taxed at rates from prior 3 years',
      'Defer all income for 3 years',
      'Average income with other family members'
    ],
    correctAnswer: 1,
    explanation: 'Farm income averaging allows farmers to elect to compute tax as if part of current year\'s farm income was earned over the prior 3 years, potentially lowering the effective tax rate.',
    reference: 'IRC §1301',
  },
  {
    id: 'see2-454',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Farm Taxation',
    subtopic: 'Prepaid Expenses',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A cash-method farmer may deduct prepaid feed and supplies in the year paid if:',
    options: [
      'Payment is for any future period',
      'Deduction does not exceed 50% of farm expenses (excluding prepaid items)',
      'No limit applies',
      'The prepayment is approved by the IRS'
    ],
    correctAnswer: 1,
    explanation: 'Cash-method farmers can deduct prepaid farm expenses but the deduction for prepaid feed and supplies generally cannot exceed 50% of other deductible farm expenses (the 50% rule).',
    reference: 'IRC §464',
  },
  {
    id: 'see2-455',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Farm Taxation',
    subtopic: 'Section 179 for Farmers',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Section 179 expensing for farm equipment applies to:',
    options: [
      'Land only',
      'Tangible personal property and certain farm buildings/structures',
      'Livestock only',
      'All real property'
    ],
    correctAnswer: 1,
    explanation: 'Farmers can use §179 for equipment and also for certain single-purpose agricultural or horticultural structures (like grain storage, livestock housing) - an exception for farm buildings.',
    reference: 'IRC §179(d)(1)(B)(ii)',
  },
  {
    id: 'see2-456',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Farm Taxation',
    subtopic: 'Conservation Expenses',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Soil and water conservation expenses may be:',
    options: [
      'Only capitalized',
      'Deducted in the year paid if elected by the farmer',
      'Never deductible',
      'Deducted only against capital gains'
    ],
    correctAnswer: 1,
    explanation: 'Under §175, farmers can elect to currently deduct soil and water conservation expenses (up to 25% of gross farm income) rather than capitalizing them.',
    reference: 'IRC §175',
  },
  {
    id: 'see2-457',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Farm Taxation',
    subtopic: 'NOL Carryback',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Farm NOLs have a special rule allowing:',
    options: [
      'No carryback',
      '2-year carryback option',
      '5-year carryback',
      '10-year carryback'
    ],
    correctAnswer: 1,
    explanation: 'Farm NOLs may be carried back 2 years by election. This is an exception to the general rule that post-2020 NOLs may only be carried forward.',
    reference: 'IRC §172(b)(1)(B)',
  },
  {
    id: 'see2-458',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Farm Taxation',
    subtopic: 'Crop Insurance Deferral',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Crop insurance proceeds may be deferred to the following year if:',
    options: [
      'The farmer files Form 4797',
      'The farmer normally sells the crop in the following year as a usual business practice',
      'The amount exceeds $100,000',
      'The crop was lost to theft'
    ],
    correctAnswer: 1,
    explanation: 'Under §451(d), farmers can elect to report crop insurance proceeds in the year following the damage if they can show the crop would normally have been sold in that following year.',
    reference: 'IRC §451(d)',
  },
  {
    id: 'see2-459',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Farm Taxation',
    subtopic: 'Estimated Tax',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Farmers who earn at least 2/3 of gross income from farming may:',
    options: [
      'Skip estimated tax payments if they file and pay by March 1',
      'Never pay estimated taxes',
      'Use a 5-year averaging',
      'Only pay one quarterly estimate'
    ],
    correctAnswer: 0,
    explanation: 'Farmers who receive 2/3+ of gross income from farming can either: (1) make one estimated payment by January 15, or (2) file and pay all tax by March 1 and owe no penalty.',
    reference: 'IRC §6654(i)',
  },
  {
    id: 'see2-460',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Farm Taxation',
    subtopic: 'Livestock Sale',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The sale of livestock held primarily for draft, breeding, dairy, or sport purposes may qualify for:',
    options: [
      'Ordinary income treatment only',
      'Section 1231 treatment if held more than the required period (12 or 24 months)',
      'Tax exemption',
      'Installment sale exclusion'
    ],
    correctAnswer: 1,
    explanation: 'Livestock held for draft, breeding, dairy, or sporting purposes may be §1231 property if held for the requisite period (12 months for cattle/horses, 24 months for others).',
    reference: 'IRC §1231(b)(3)',
  },
];

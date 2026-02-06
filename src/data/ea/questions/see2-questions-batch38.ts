/**
 * EA SEE Part 2: Businesses - Questions Batch 38 (Q371-380)
 * Business Property - Section 1231, 1245, 1250
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH38: Question[] = [
  // ==========================================
  // SEE2-3: Section 1231 Property
  // ==========================================
  {
    id: 'see2-371',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Section 1231',
    subtopic: 'Definition',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Section 1231 property includes:',
    options: [
      'Inventory and stock in trade',
      'Depreciable property and real property used in a trade or business held more than one year',
      'Personal-use assets only',
      'Short-term capital assets'
    ],
    correctAnswer: 1,
    explanation: 'Section 1231 property includes depreciable property and real property used in a trade or business and held more than one year. It does not include inventory, copyrights, or assets held for sale to customers.',
    reference: 'IRC §1231(b)',
  },
  {
    id: 'see2-372',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Section 1231',
    subtopic: 'Net Gain Treatment',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'If Section 1231 gains exceed Section 1231 losses for the year:',
    options: [
      'All gains are ordinary income',
      'Net gain is treated as long-term capital gain',
      'Gains are tax-exempt',
      'Gains are carried forward'
    ],
    correctAnswer: 1,
    explanation: 'If §1231 gains exceed §1231 losses, the net gain is treated as long-term capital gain, eligible for preferential rates (0%, 15%, or 20%).',
    reference: 'IRC §1231(a)(1)',
  },
  {
    id: 'see2-373',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Section 1231',
    subtopic: 'Net Loss Treatment',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'If Section 1231 losses exceed Section 1231 gains for the year:',
    options: [
      'All losses are capital losses',
      'Net loss is treated as ordinary loss',
      'Losses are disallowed',
      'Losses carry back 3 years'
    ],
    correctAnswer: 1,
    explanation: 'If §1231 losses exceed §1231 gains, the net loss is treated as ordinary loss, fully deductible against ordinary income without capital loss limitations.',
    reference: 'IRC §1231(a)(2)',
  },
  {
    id: 'see2-374',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Section 1231',
    subtopic: 'Lookback Rule',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The Section 1231 lookback rule requires:',
    options: [
      'All §1231 gains to be taxed at 25%',
      'Net §1231 gain to be recharacterized as ordinary income to the extent of unrecaptured §1231 losses from prior 5 years',
      'Losses to be spread over 5 years',
      'Gains to be deferred for 5 years'
    ],
    correctAnswer: 1,
    explanation: 'The lookback rule recaptures prior ordinary loss benefits by treating §1231 gain as ordinary income to the extent of non-recaptured net §1231 losses from the previous 5 years.',
    reference: 'IRC §1231(c)',
  },
  {
    id: 'see2-375',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Section 1245',
    subtopic: 'Recapture Definition',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Section 1245 property generally includes:',
    options: [
      'Land',
      'Personal property subject to depreciation',
      'Non-depreciable real property',
      'Intangible assets not subject to amortization'
    ],
    correctAnswer: 1,
    explanation: 'Section 1245 property includes tangible and intangible personal property subject to depreciation or amortization. This includes machinery, equipment, vehicles, and certain §1250 property with additional depreciation.',
    reference: 'IRC §1245(a)(3)',
  },
  {
    id: 'see2-376',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Section 1245',
    subtopic: 'Recapture Calculation',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Equipment purchased for $50,000 with $30,000 accumulated depreciation is sold for $45,000. Section 1245 recapture is:',
    options: [
      '$45,000',
      '$30,000',
      '$25,000',
      '$15,000'
    ],
    correctAnswer: 2,
    explanation: 'Adjusted basis = $50,000 - $30,000 = $20,000. Gain = $45,000 - $20,000 = $25,000. §1245 recapture = lesser of gain ($25,000) or depreciation ($30,000) = $25,000.',
    reference: 'IRC §1245(a)(1)',
  },
  {
    id: 'see2-377',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Section 1250',
    subtopic: 'Recapture Definition',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Section 1250 property includes:',
    options: [
      'Equipment and machinery',
      'Depreciable real property (buildings and improvements)',
      'Inventory',
      'Land'
    ],
    correctAnswer: 1,
    explanation: 'Section 1250 property is depreciable real property - primarily buildings and structural improvements. (Land is not depreciable and is not §1250 property.)',
    reference: 'IRC §1250(c)',
  },
  {
    id: 'see2-378',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Section 1250',
    subtopic: 'Unrecaptured Section 1250 Gain',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Unrecaptured Section 1250 gain is taxed at a maximum rate of:',
    options: [
      '0%',
      '15%',
      '25%',
      '37%'
    ],
    correctAnswer: 2,
    explanation: 'Unrecaptured §1250 gain (straight-line depreciation on real property) is taxed at a maximum rate of 25%, while the remaining gain is taxed at regular LTCG rates (0%, 15%, or 20%).',
    reference: 'IRC §1(h)(1)(E)',
  },
  {
    id: 'see2-379',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Section 1245',
    subtopic: 'Full vs Partial Recapture',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Section 1245 recapture is:',
    options: [
      'Limited to additional depreciation over straight-line',
      'Full recapture - 100% of depreciation taken (up to gain)',
      'Only 60% of depreciation',
      'Capped at $100,000 per year'
    ],
    correctAnswer: 1,
    explanation: 'Section 1245 requires full recapture - all depreciation is recaptured as ordinary income, up to the amount of gain recognized. Unlike §1250, there is no limitation to additional depreciation.',
    reference: 'IRC §1245(a)',
  },
  {
    id: 'see2-380',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Section 1231',
    subtopic: 'Casualty and Theft Gains',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Casualty and theft gains and losses on business property are netted:',
    options: [
      'Directly with §1231 gains and losses',
      'Separately first; only net gains enter the §1231 netting process',
      'Only on personal property',
      'Never - they are always ordinary'
    ],
    correctAnswer: 1,
    explanation: 'Casualty and theft gains/losses on §1231 property are netted separately first. If net gain results, it enters §1231 netting. If net loss, all items are treated as ordinary (bypass §1231).',
    reference: 'IRC §1231(a)',
  },
];

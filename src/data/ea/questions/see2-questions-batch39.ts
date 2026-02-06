/**
 * EA SEE Part 2: Businesses - Questions Batch 39 (Q381-390)
 * At-Risk and Passive Activity Loss Rules
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH39: Question[] = [
  // ==========================================
  // SEE2-3: At-Risk Rules
  // ==========================================
  {
    id: 'see2-381',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'At-Risk Rules',
    subtopic: 'Section 465 Overview',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Under the at-risk rules of IRC §465, a taxpayer may deduct losses only to the extent of:',
    options: [
      'Total investment regardless of liability',
      'Amount actually at risk (cash plus recourse debt)',
      'Fair market value of assets',
      'Annual income from the activity'
    ],
    correctAnswer: 1,
    explanation: 'The at-risk rules limit loss deductions to the amount the taxpayer has at risk: cash invested, adjusted basis of property contributed, and amounts borrowed for which the taxpayer is personally liable.',
    reference: 'IRC §465(a)',
  },
  {
    id: 'see2-382',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'At-Risk Rules',
    subtopic: 'Amounts At Risk',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Which of the following increases a taxpayer\'s amount at risk?',
    options: [
      'Non-recourse financing from unrelated parties',
      'Recourse debt for which the taxpayer is personally liable',
      'Guarantees by related parties',
      'Stop-loss agreements'
    ],
    correctAnswer: 1,
    explanation: 'Amounts at risk include recourse debt for which the taxpayer is personally liable. Non-recourse debt generally does not increase at-risk amount (except qualified non-recourse financing for real estate).',
    reference: 'IRC §465(b)',
  },
  {
    id: 'see2-383',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'At-Risk Rules',
    subtopic: 'Real Estate Exception',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Qualified non-recourse financing for real estate:',
    options: [
      'Is never considered at risk',
      'Is treated as an amount at risk if secured by the real property',
      'Requires personal guarantee to be at risk',
      'Only applies to partnerships'
    ],
    correctAnswer: 1,
    explanation: 'Qualified non-recourse financing for real estate is treated as at risk if it\'s secured by the real property and borrowed from a qualified lender (bank, government, etc. - not related parties or sellers).',
    reference: 'IRC §465(b)(6)',
  },
  {
    id: 'see2-384',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'At-Risk Rules',
    subtopic: 'Suspended Losses',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Losses exceeding the at-risk amount are:',
    options: [
      'Permanently disallowed',
      'Carried forward and allowed when at-risk amount increases',
      'Converted to capital losses',
      'Deductible against passive income only'
    ],
    correctAnswer: 1,
    explanation: 'Losses disallowed due to at-risk limitations are suspended and carried forward indefinitely. They become deductible in future years when the at-risk amount increases.',
    reference: 'IRC §465(a)(2)',
  },
  {
    id: 'see2-385',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Passive Activity Rules',
    subtopic: 'Section 469 Overview',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Under the passive activity loss rules, passive losses can generally offset:',
    options: [
      'Any type of income',
      'Only passive income',
      'Only portfolio income',
      'Only ordinary income'
    ],
    correctAnswer: 1,
    explanation: 'Under §469, passive activity losses can only offset passive activity income. Excess passive losses are suspended and carried forward (not back) to offset future passive income or until disposition.',
    reference: 'IRC §469(a)',
  },
  {
    id: 'see2-386',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Passive Activity Rules',
    subtopic: 'Material Participation',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A taxpayer materially participates in an activity if they participate for more than:',
    options: [
      '100 hours during the year',
      '500 hours during the year',
      '750 hours during the year',
      '1,000 hours during the year'
    ],
    correctAnswer: 1,
    explanation: 'A taxpayer materially participates if they work more than 500 hours during the year. This is one of seven tests; others include participation being substantially all participation or more than 100 hours if no one else participates more.',
    reference: 'Treas. Reg. §1.469-5T',
  },
  {
    id: 'see2-387',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Passive Activity Rules',
    subtopic: 'Rental Activities',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Rental real estate activities are generally:',
    options: [
      'Always treated as active income',
      'Treated as passive regardless of participation',
      'Exempt from all loss limitations',
      'Only passive if owned through a partnership'
    ],
    correctAnswer: 1,
    explanation: 'Rental activities are generally treated as passive per se, regardless of material participation. Exceptions exist for real estate professionals and the $25,000 rental allowance for active participation.',
    reference: 'IRC §469(c)(2)',
  },
  {
    id: 'see2-388',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Passive Activity Rules',
    subtopic: '$25,000 Allowance',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The $25,000 rental real estate loss allowance:',
    options: [
      'Applies to all taxpayers regardless of income',
      'Is phased out for AGI between $100,000 and $150,000',
      'Only applies to real estate professionals',
      'Is available for commercial rentals only'
    ],
    correctAnswer: 1,
    explanation: 'The $25,000 allowance permits active participants to deduct up to $25,000 of rental losses against non-passive income. It phases out $1 for every $2 of AGI over $100,000 (fully eliminated at $150,000).',
    reference: 'IRC §469(i)',
  },
  {
    id: 'see2-389',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Passive Activity Rules',
    subtopic: 'Real Estate Professional',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'To qualify as a real estate professional, a taxpayer must:',
    options: [
      'Own at least 5 rental properties',
      'Perform more than 750 hours of real property activities and more than half of personal services in real property trades or businesses',
      'Have a real estate license',
      'Only invest in residential rentals'
    ],
    correctAnswer: 1,
    explanation: 'A real estate professional must: (1) perform more than 750 hours in real property trades or businesses, AND (2) more than half of personal services must be in real property activities. Hours must also be materially participated for each property or grouped under election.',
    reference: 'IRC §469(c)(7)',
  },
  {
    id: 'see2-390',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Passive Activity Rules',
    subtopic: 'Complete Disposition',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'When a passive activity is completely disposed of in a taxable transaction:',
    options: [
      'Suspended losses are permanently disallowed',
      'All suspended passive losses are fully deductible against any income',
      'Losses are converted to capital losses',
      'Only 50% of suspended losses are allowed'
    ],
    correctAnswer: 1,
    explanation: 'Upon complete disposition of a passive activity in a fully taxable transaction to an unrelated party, all suspended passive losses are released and fully deductible against any type of income.',
    reference: 'IRC §469(g)',
  },
];

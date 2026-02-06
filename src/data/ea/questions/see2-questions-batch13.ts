/**
 * EA SEE Part 2: Businesses - Questions Batch 13 (Q121-130)
 * Partnership Distributions
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH13: Question[] = [
  // ==========================================
  // SEE2-4: Partnerships - Distributions
  // ==========================================
  {
    id: 'see2-121',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-4',
    topic: 'Partnership Distributions',
    subtopic: 'Current Distributions - Cash',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Partner A has a basis of $40,000 in their partnership interest. The partnership distributes $25,000 cash to Partner A. What is the tax consequence?',
    options: [
      '$25,000 ordinary income',
      'No gain recognized; basis reduced to $15,000',
      '$25,000 capital gain',
      '$15,000 capital gain'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §731(a), cash distributions are tax-free to the extent of basis. Since $25,000 < $40,000 basis, no gain is recognized. Partner A\'s basis is reduced from $40,000 to $15,000.',
    reference: 'IRC §731(a)(1); IRC §733',
  },
  {
    id: 'see2-122',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-4',
    topic: 'Partnership Distributions',
    subtopic: 'Excess Cash Distribution',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Partner B has a $30,000 basis in their partnership interest. The partnership distributes $45,000 cash. What is the tax consequence?',
    options: [
      '$15,000 ordinary income',
      '$15,000 capital gain',
      '$45,000 capital gain',
      'No gain; create negative basis'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §731(a)(1), gain is recognized to the extent cash distributions exceed basis. Partner B recognizes $15,000 ($45,000 - $30,000) capital gain. Basis cannot go below zero.',
    reference: 'IRC §731(a)(1)',
  },
  {
    id: 'see2-123',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-4',
    topic: 'Partnership Distributions',
    subtopic: 'Property Distributions',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A partnership distributes property with a FMV of $60,000 and inside basis of $35,000 to Partner C, who has an outside basis of $50,000. What is Partner C\'s basis in the distributed property?',
    options: [
      '$60,000',
      '$50,000',
      '$35,000',
      '$25,000'
    ],
    correctAnswer: 2,
    explanation: 'Under IRC §732(a)(1), in a current distribution, the distributee partner\'s basis in the distributed property is the lesser of (a) the partnership\'s basis ($35,000) or (b) the partner\'s outside basis. Here, $35,000 is less than $50,000.',
    reference: 'IRC §732(a)(1)',
  },
  {
    id: 'see2-124',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-4',
    topic: 'Partnership Distributions',
    subtopic: 'Basis Limitation',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Partner D has a $20,000 outside basis. The partnership distributes property with an inside basis of $35,000 and FMV of $50,000. What is Partner D\'s basis in the distributed property?',
    options: [
      '$50,000',
      '$35,000',
      '$20,000',
      '$15,000'
    ],
    correctAnswer: 2,
    explanation: 'Under IRC §732(a)(1), the partner\'s basis in distributed property cannot exceed their outside basis. Since Partner D\'s outside basis ($20,000) is less than the property\'s inside basis ($35,000), the property basis is limited to $20,000.',
    reference: 'IRC §732(a)(1)',
  },
  {
    id: 'see2-125',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-4',
    topic: 'Partnership Distributions',
    subtopic: 'Marketable Securities',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'When a partnership distributes marketable securities to a partner:',
    options: [
      'The securities are always treated as property',
      'The securities are generally treated as money for gain recognition purposes',
      'No gain is recognized until the securities are sold',
      'The securities are valued at the partnership\'s basis'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §731(c), marketable securities are treated as money for purposes of determining gain on distribution. This means a partner may recognize gain if the FMV of securities exceeds their basis.',
    reference: 'IRC §731(c)',
  },
  {
    id: 'see2-126',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-4',
    topic: 'Partnership Distributions',
    subtopic: 'Hot Assets - Unrealized Receivables',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Which of the following is considered an "unrealized receivable" for purposes of partnership distributions?',
    options: [
      'Accounts receivable of a cash-basis partnership',
      'Appreciated inventory',
      'Goodwill',
      'Land held for investment'
    ],
    correctAnswer: 0,
    explanation: 'Under IRC §751(c), unrealized receivables include rights to payment for goods or services not previously included in income (like A/R of cash-basis taxpayers) and depreciation recapture potential.',
    reference: 'IRC §751(c)',
  },
  {
    id: 'see2-127',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-4',
    topic: 'Partnership Distributions',
    subtopic: 'Hot Assets - Inventory',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'For purposes of IRC §751 (hot assets), inventory items include:',
    options: [
      'Only merchandise held for sale',
      'Inventory plus property that would produce ordinary income if sold by the partnership',
      'Inventory that has been held more than 5 years',
      'Property held for investment that has appreciated'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §751(d), inventory items include property described in §1221(a)(1) (dealer property) plus other items that would not be capital assets or Section 1231 property if sold by the partnership.',
    reference: 'IRC §751(d)',
  },
  {
    id: 'see2-128',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-4',
    topic: 'Partnership Distributions',
    subtopic: 'Disproportionate Distributions',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A partnership has hot assets worth $100,000. Partner E (25% interest) receives a distribution of $40,000 in cash and no hot assets. This is:',
    options: [
      'A tax-free proportionate distribution',
      'A disproportionate distribution triggering §751(b)',
      'A liquidating distribution',
      'A guaranteed payment'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §751(b), when a partner receives more or less than their proportionate share of hot assets, the distribution is disproportionate and triggers ordinary income recognition as if the partner sold their share of hot assets.',
    reference: 'IRC §751(b)',
  },
  {
    id: 'see2-129',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-4',
    topic: 'Partnership Distributions',
    subtopic: 'Holding Period',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A partner receives distributed property from a partnership. The partner\'s holding period for the property:',
    options: [
      'Begins on the date of distribution',
      'Includes the partnership\'s holding period',
      'Is always long-term',
      'Depends on the type of property received'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §735(b), the partner\'s holding period for distributed property includes the partnership\'s holding period. This tacking rule applies to all non-liquidating and liquidating distributions.',
    reference: 'IRC §735(b)',
  },
  {
    id: 'see2-130',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-4',
    topic: 'Partnership Distributions',
    subtopic: 'Character of Gain',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A partner receives inventory in a distribution and sells it 3 years later at a gain. The gain is:',
    options: [
      'Capital gain because held more than one year',
      'Ordinary income if sold within 5 years of distribution',
      'Ordinary income regardless of when sold',
      'Section 1231 gain'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §735(a)(2), gain on sale of distributed inventory is ordinary income if the property is sold within 5 years of distribution. After 5 years, character depends on how the partner uses the property.',
    reference: 'IRC §735(a)(2)',
  },
];

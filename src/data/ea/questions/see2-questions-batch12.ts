/**
 * EA SEE Part 2: Businesses - Questions Batch 12 (Q111-120)
 * Partnership Operations and Allocations
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH12: Question[] = [
  // ==========================================
  // SEE2-4: Partnerships - Operations
  // ==========================================
  {
    id: 'see2-111',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-4',
    topic: 'Partnership Operations',
    subtopic: 'Separately Stated Items',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Which of the following items must be separately stated on a partnership return?',
    options: [
      'Cost of goods sold',
      'Depreciation expense on business equipment',
      'Net section 1231 gains and losses',
      'Utilities expense'
    ],
    correctAnswer: 2,
    explanation: 'Section 1231 gains/losses must be separately stated because their tax treatment may differ for each partner based on individual circumstances. COGS, depreciation, and utilities are included in ordinary income.',
    reference: 'IRC §702(a)',
  },
  {
    id: 'see2-112',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-4',
    topic: 'Partnership Operations',
    subtopic: 'Substantial Economic Effect',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'For a special allocation of partnership income to be respected for tax purposes, it must:',
    options: [
      'Be approved by all partners unanimously',
      'Have substantial economic effect',
      'Be reported to the IRS in advance',
      'Apply equally to all types of income'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §704(b), allocations must have substantial economic effect to be respected. This requires proper capital account maintenance, deficit restoration obligations, and QIO provisions or actual economic effect.',
    reference: 'IRC §704(b); Treas. Reg. §1.704-1(b)(2)',
  },
  {
    id: 'see2-113',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-4',
    topic: 'Partnership Operations',
    subtopic: 'Partner Basis Adjustments',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A partner\'s basis in their partnership interest is increased by:',
    options: [
      'Partnership distributions received',
      'Their distributive share of partnership losses',
      'Their distributive share of tax-exempt income',
      'A decrease in their share of partnership liabilities'
    ],
    correctAnswer: 2,
    explanation: 'Under IRC §705(a)(1)(B), a partner\'s basis increases by their distributive share of tax-exempt income. Distributions, losses, and decreased liability share all reduce basis.',
    reference: 'IRC §705(a)(1)(B)',
  },
  {
    id: 'see2-114',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-4',
    topic: 'Partnership Operations',
    subtopic: 'Loss Limitations',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A partner with a $20,000 basis in their partnership interest has a distributive share of $35,000 in partnership losses. How much can they deduct?',
    options: [
      '$35,000',
      '$20,000',
      '$15,000',
      '$0'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §704(d), a partner\'s share of partnership losses is limited to the partner\'s adjusted basis in the partnership interest. The $15,000 excess is suspended and carried forward indefinitely.',
    reference: 'IRC §704(d)',
  },
  {
    id: 'see2-115',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-4',
    topic: 'Partnership Operations',
    subtopic: 'Self-Employment Tax',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A general partner\'s share of partnership ordinary income is generally:',
    options: [
      'Exempt from self-employment tax',
      'Subject to self-employment tax',
      'Subject to self-employment tax only if the partner works 500+ hours',
      'Taxed at capital gains rates'
    ],
    correctAnswer: 1,
    explanation: 'A general partner\'s distributive share of partnership ordinary income from a trade or business is considered self-employment income under IRC §1402(a). Limited partners generally are not subject to SE tax except for guaranteed payments.',
    reference: 'IRC §1402(a)',
  },
  {
    id: 'see2-116',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-4',
    topic: 'Partnership Operations',
    subtopic: 'Guaranteed Payments',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Partner X receives a guaranteed payment of $50,000 for services. The partnership has a loss of $30,000 before considering the guaranteed payment. What is the partnership\'s ordinary income (loss) reported on Form 1065?',
    options: [
      '($30,000)',
      '($80,000)',
      '$50,000',
      '$20,000'
    ],
    correctAnswer: 1,
    explanation: 'Guaranteed payments are deducted by the partnership in computing ordinary income. The partnership loss is $30,000 + $50,000 guaranteed payment deduction = $80,000 total loss reported on Form 1065.',
    reference: 'IRC §707(c)',
  },
  {
    id: 'see2-117',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-4',
    topic: 'Partnership Operations',
    subtopic: 'At-Risk Rules',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Which amount is included in a partner\'s at-risk amount for partnership activities?',
    options: [
      'Nonrecourse debt secured only by partnership property',
      'Amounts borrowed from persons with an interest in the activity',
      'Cash contributions plus recourse debt for which the partner is personally liable',
      'All partnership liabilities regardless of recourse status'
    ],
    correctAnswer: 2,
    explanation: 'Under IRC §465, amounts at risk include cash contributions, adjusted basis of contributed property, and amounts borrowed for which the partner is personally liable or has pledged property not used in the activity.',
    reference: 'IRC §465(b)',
  },
  {
    id: 'see2-118',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-4',
    topic: 'Partnership Operations',
    subtopic: 'Family Partnerships',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'For a family partnership where capital is a material income-producing factor, a donee partner:',
    options: [
      'Cannot be recognized as a partner',
      'Must be allocated income only to the extent of reasonable compensation to the donor',
      'Is allocated a capital share, but donor must receive reasonable compensation first',
      'Receives no allocation until the partnership terminates'
    ],
    correctAnswer: 2,
    explanation: 'Under IRC §704(e), if capital is a material income-producing factor, a donee family member is recognized as a partner but their share of income may be limited. The donor partner must be allocated reasonable compensation for services first.',
    reference: 'IRC §704(e)',
  },
  {
    id: 'see2-119',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-4',
    topic: 'Partnership Operations',
    subtopic: 'Partnership Tax Year',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A partnership generally must use the same tax year as:',
    options: [
      'The tax year chosen in the partnership agreement',
      'A calendar year',
      'The majority interest partner(s)',
      'The managing partner'
    ],
    correctAnswer: 2,
    explanation: 'Under IRC §706(b), a partnership must use the tax year of partners owning more than 50% of profits and capital. If no majority exists, it uses the principal partners\' year, or the year with least deferral.',
    reference: 'IRC §706(b)',
  },
  {
    id: 'see2-120',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-4',
    topic: 'Partnership Operations',
    subtopic: 'Partner Transactions',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Partner Y sells property to a partnership in which Y has a 60% interest for $100,000. Y\'s basis in the property was $120,000. What is the tax treatment?',
    options: [
      'Recognize $20,000 loss as ordinary loss',
      'Recognize $20,000 loss as capital loss',
      'No loss recognized; deferred until partner sells partnership interest',
      'No loss allowed; treated as a contribution to the partnership'
    ],
    correctAnswer: 2,
    explanation: 'Under IRC §707(b)(1), losses are disallowed on sales between a partner and partnership if the partner owns more than 50%. The partnership takes a carryover basis and can recognize the loss when selling to an unrelated party.',
    reference: 'IRC §707(b)(1)',
  },
];

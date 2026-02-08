/**
 * EA SEE Part 2: Businesses - Questions Batch 34 (Q331-340)
 * Like-Kind Exchanges for Business Property
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH34: Question[] = [
  // ==========================================
  // SEE2-3: Like-Kind Exchanges
  // ==========================================
  {
    id: 'see2-331',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Like-Kind Exchanges',
    subtopic: 'Section 1031 Basics',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'After the Tax Cuts and Jobs Act, Section 1031 like-kind exchanges are limited to:',
    options: [
      'All property including personal property',
      'Real property held for productive use or investment only',
      'Inventory and stock in trade',
      'Personal vehicles and equipment'
    ],
    correctAnswer: 1,
    explanation: 'After TCJA (2018), §1031 like-kind exchange treatment is limited to real property held for productive use in a trade or business or for investment. Personal property no longer qualifies.',
    reference: 'IRC §1031(a)',
  },
  {
    id: 'see2-332',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Like-Kind Exchanges',
    subtopic: 'Like-Kind Definition',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Which properties are considered like-kind for purposes of Section 1031?',
    options: [
      'An apartment building for vacant land',
      'Real property in the US for real property in France',
      'A personal residence for a rental property',
      'Corporate stock for an office building'
    ],
    correctAnswer: 0,
    explanation: 'Real properties of any type are like-kind if both are real property (e.g., improved for unimproved). Foreign and US real property are NOT like-kind. Stock and personal residences do not qualify.',
    reference: 'IRC §1031(a); Treas. Reg. §1.1031(a)-1',
  },
  {
    id: 'see2-333',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Like-Kind Exchanges',
    subtopic: 'Boot Recognition',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'In a like-kind exchange, if a taxpayer receives $25,000 cash boot and has a realized gain of $100,000:',
    options: [
      'No gain is recognized',
      '$25,000 gain is recognized',
      '$100,000 gain is recognized',
      '$75,000 gain is recognized'
    ],
    correctAnswer: 1,
    explanation: 'Gain is recognized to the extent of boot received, but not in excess of realized gain. Since boot ($25,000) is less than realized gain ($100,000), recognized gain = $25,000.',
    reference: 'IRC §1031(b)',
  },
  {
    id: 'see2-334',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Like-Kind Exchanges',
    subtopic: 'Basis Calculation',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A taxpayer exchanges property with a basis of $200,000 for like-kind property worth $300,000 plus $50,000 cash. The basis in the new property is:',
    options: [
      '$300,000',
      '$200,000',
      '$250,000',
      '$150,000'
    ],
    correctAnswer: 1,
    explanation: 'Basis in new property = old basis + gain recognized - boot received + boot given. Here: $200,000 + $50,000 (gain recognized = boot received) - $50,000 (boot) = $200,000.',
    reference: 'IRC §1031(d)',
  },
  {
    id: 'see2-335',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Like-Kind Exchanges',
    subtopic: 'Identification Period',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'In a deferred like-kind exchange, the replacement property must be identified within:',
    options: [
      '30 days after transfer of relinquished property',
      '45 days after transfer of relinquished property',
      '90 days after transfer of relinquished property',
      '180 days after transfer of relinquished property'
    ],
    correctAnswer: 1,
    explanation: 'In a deferred exchange, replacement property must be identified within 45 days after the taxpayer transfers the relinquished property. The identification must be in writing.',
    reference: 'IRC §1031(a)(3)(A); Treas. Reg. §1.1031(k)-1',
  },
  {
    id: 'see2-336',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Like-Kind Exchanges',
    subtopic: 'Exchange Period',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Replacement property in a deferred exchange must be received by the earlier of:',
    options: [
      '90 days after identification or tax return due date',
      '180 days after transfer of relinquished property or tax return due date (including extensions)',
      '1 year after transfer or next tax year',
      '45 days after identification'
    ],
    correctAnswer: 1,
    explanation: 'Replacement property must be received within 180 days after relinquished property is transferred OR the due date (including extensions) for the tax return for the year of transfer, whichever is earlier.',
    reference: 'IRC §1031(a)(3)(B)',
  },
  {
    id: 'see2-337',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Like-Kind Exchanges',
    subtopic: 'Qualified Intermediary',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A qualified intermediary (QI) in a like-kind exchange must NOT be:',
    options: [
      'A title company',
      'A person related to the taxpayer or their agent within 2 years',
      'A bank',
      'A real estate attorney not representing the taxpayer'
    ],
    correctAnswer: 1,
    explanation: 'A qualified intermediary cannot be someone who is related to the taxpayer or has been the taxpayer\'s agent (attorney, accountant, broker, employee) within the previous 2 years.',
    reference: 'Treas. Reg. §1.1031(k)-1(k)',
  },
  {
    id: 'see2-338',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Like-Kind Exchanges',
    subtopic: 'Three Property Rule',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Under the three-property identification rule, a taxpayer may identify:',
    options: [
      'Up to 3 properties regardless of value',
      'Only 1 property',
      'Up to 3 properties not exceeding 300% of relinquished property value',
      'Any number of properties'
    ],
    correctAnswer: 0,
    explanation: 'The three-property rule allows identification of up to 3 potential replacement properties regardless of their FMV. Alternatively, the 200% rule allows more properties if total FMV doesn\'t exceed 200% of relinquished property.',
    reference: 'Treas. Reg. §1.1031(k)-1(c)(4)',
  },
  {
    id: 'see2-339',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Like-Kind Exchanges',
    subtopic: 'Mortgage Boot',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A taxpayer exchanges property with a $400,000 mortgage for property with a $250,000 mortgage. The mortgage boot received is:',
    options: [
      '$400,000',
      '$250,000',
      '$150,000',
      'Zero'
    ],
    correctAnswer: 2,
    explanation: 'Being relieved of a mortgage is treated as boot received. Net mortgage boot = debt relief - debt assumed = $400,000 - $250,000 = $150,000 boot received.',
    reference: 'IRC §1031(d); Treas. Reg. §1.1031(d)-2',
  },
  {
    id: 'see2-340',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Like-Kind Exchanges',
    subtopic: 'Related Party Rules',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'If like-kind property is received from a related party, the property must be held for at least:',
    options: [
      '6 months',
      '1 year',
      '2 years',
      '5 years'
    ],
    correctAnswer: 2,
    explanation: 'Under §1031(f), if property is received from a related party, both parties must hold their respective replacement properties for at least 2 years, or the exchange becomes taxable.',
    reference: 'IRC §1031(f)',
  },
];

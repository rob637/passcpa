/**
 * EA SEE Part 2: Businesses - Questions Batch 17 (Q161-170)
 * C Corporation Formation and Operations
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH17: Question[] = [
  // ==========================================
  // SEE2-6: C Corporations - Formation
  // ==========================================
  {
    id: 'see2-161',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Corporate Formation',
    subtopic: 'Section 351 Requirements',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'For a tax-free exchange under IRC §351, the transferors must control the corporation immediately after the exchange. Control means ownership of:',
    options: [
      'More than 50% of voting stock',
      'At least 80% of voting stock and 80% of each class of nonvoting stock',
      'At least 50% of total value',
      'At least two-thirds of all outstanding shares'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §368(c), control for Section 351 purposes requires ownership of at least 80% of the total combined voting power of all classes entitled to vote AND at least 80% of the total shares of each other class.',
    reference: 'IRC §351(a); IRC §368(c)',
  },
  {
    id: 'see2-162',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Corporate Formation',
    subtopic: 'Property for Stock',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'In a Section 351 exchange, transferor A contributes equipment (basis $20,000, FMV $50,000) and receives stock worth $45,000 plus $5,000 cash. A\'s recognized gain is:',
    options: [
      '$0',
      '$5,000',
      '$25,000',
      '$30,000'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §351(b), gain is recognized to the extent of boot received, but not in excess of realized gain. Realized gain = $50,000 - $20,000 = $30,000. Boot = $5,000. Recognized gain is limited to $5,000 boot.',
    reference: 'IRC §351(b)',
  },
  {
    id: 'see2-163',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Corporate Formation',
    subtopic: 'Stock Basis',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Transferor B contributes property (basis $40,000, FMV $60,000) for stock in a Section 351 exchange. B\'s basis in the stock received is:',
    options: [
      '$60,000',
      '$40,000',
      '$20,000',
      '$0'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §358(a), the transferor\'s basis in stock received equals the basis of property transferred ($40,000), minus boot received, plus gain recognized. Here with no boot, basis = $40,000 (substituted basis).',
    reference: 'IRC §358(a)',
  },
  {
    id: 'see2-164',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Corporate Formation',
    subtopic: 'Corporation\'s Basis',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'In a Section 351 exchange, the corporation\'s basis in received property is:',
    options: [
      'Fair market value',
      'Transferor\'s adjusted basis plus any gain recognized by the transferor',
      'Lower of FMV or adjusted basis',
      'Transferor\'s adjusted basis minus gain recognized'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §362(a), the corporation\'s basis in property received in a Section 351 exchange is the transferor\'s adjusted basis plus any gain recognized by the transferor (carryover basis with step-up for gain).',
    reference: 'IRC §362(a)',
  },
  {
    id: 'see2-165',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Corporate Formation',
    subtopic: 'Services for Stock',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A person who receives stock for services rendered in a Section 351 transaction:',
    options: [
      'Is not counted in determining if the 80% control test is met',
      'Has their stock count toward the control test',
      'Can receive tax-free treatment if they also contribute property',
      'Must recognize ordinary income equal to the FMV of stock received'
    ],
    correctAnswer: 0,
    explanation: 'Stock received for services is not counted in determining if the 80% control test is met under Section 351. The person receiving stock for services must recognize ordinary income equal to the FMV of the stock.',
    reference: 'Treas. Reg. §1.351-1(a)(1)(ii)',
  },
  {
    id: 'see2-166',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Corporate Operations',
    subtopic: 'Accumulated Earnings Tax',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A C corporation is potentially subject to accumulated earnings tax when accumulated earnings exceed:',
    options: [
      '$100,000 for regular corporations, $150,000 for service corporations',
      '$250,000 for regular corporations, $150,000 for personal service corporations',
      '$500,000 for all corporations',
      'There is no threshold; all accumulations are taxed'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §535(c), the accumulated earnings credit is $250,000 for most corporations and $150,000 for personal service corporations (accounting, law, health, etc.). Accumulations beyond these may trigger the 20% tax.',
    reference: 'IRC §535(c)',
  },
  {
    id: 'see2-167',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Corporate Operations',
    subtopic: 'Personal Holding Company',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A corporation is classified as a personal holding company if it meets both:',
    options: [
      'More than 60% PHC income and owned by 5 or fewer individuals owning more than 50% of stock',
      'More than 50% PHC income and owned by 10 or fewer individuals owning more than 25% of stock',
      'More than 60% PHC income and owned by more than 100 shareholders',
      'Any amount of passive income with concentrated ownership'
    ],
    correctAnswer: 0,
    explanation: 'Under IRC §542, a corporation is a PHC if (1) at least 60% of its adjusted ordinary gross income is PHC income (dividends, interest, rents, royalties), and (2) at any time during the last half of the year, more than 50% is owned by 5 or fewer individuals.',
    reference: 'IRC §542',
  },
  {
    id: 'see2-168',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Corporate Operations',
    subtopic: 'Dividends Received Deduction',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A C corporation receives $100,000 in dividends from a domestic corporation in which it owns 25% of the stock. The dividends received deduction is:',
    options: [
      '$50,000',
      '$65,000',
      '$100,000',
      '$0'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §243, the DRD is 50% for ownership less than 20%, 65% for 20-79% ownership, and 100% for 80%+ ownership. With 25% ownership, the deduction is 65% × $100,000 = $65,000.',
    reference: 'IRC §243(a)(1); IRC §243(c)',
  },
  {
    id: 'see2-169',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Corporate Operations',
    subtopic: 'NOL Limitations',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A C corporation\'s net operating loss (NOL) arising after 2020 can offset:',
    options: [
      '100% of taxable income in any year',
      '80% of taxable income, carried forward indefinitely',
      '80% of taxable income, carried back 2 years or forward 20 years',
      '50% of taxable income, carried forward 15 years'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §172 as amended by TCJA and CARES Act, NOLs arising after 2020 can offset only 80% of taxable income, with no carryback and indefinite carryforward (except farming losses which get 2-year carryback).',
    reference: 'IRC §172(a); IRC §172(b)',
  },
  {
    id: 'see2-170',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Corporate Operations',
    subtopic: 'Capital Losses',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A C corporation\'s capital losses may:',
    options: [
      'Offset ordinary income up to $3,000 annually',
      'Only offset capital gains; excess carried back 3 years and forward 5 years',
      'Be deducted without limitation against any income',
      'Only offset capital gains; excess carried forward indefinitely'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §1212(a), corporate capital losses can only offset capital gains (unlike individuals with the $3,000 offset). Excess losses can be carried back 3 years and forward 5 years.',
    reference: 'IRC §1212(a)',
  },
];

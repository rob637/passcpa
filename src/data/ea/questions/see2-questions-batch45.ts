/**
 * EA SEE Part 2: Businesses - Questions Batch 45 (Q441-450)
 * Hobby Loss Rules and Business vs Hobby
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH45: Question[] = [
  // ==========================================
  // SEE2-3: Hobby Loss Rules
  // ==========================================
  {
    id: 'see2-441',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Hobby Losses',
    subtopic: 'Section 183 Overview',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Under IRC §183, expenses from an activity not engaged in for profit (hobby):',
    options: [
      'Are fully deductible against all income',
      'Cannot offset income from other sources after TCJA',
      'Create net operating losses',
      'Are capitalized'
    ],
    correctAnswer: 1,
    explanation: 'Under TCJA (2018-2025), hobby expenses are not deductible at all (misc itemized deductions suspended). Hobby income is still taxable, but no deduction for related expenses.',
    reference: 'IRC §183; IRC §67(g)',
  },
  {
    id: 'see2-442',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Hobby Losses',
    subtopic: 'Profit Motive',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The primary factor in determining if an activity is a business vs hobby is:',
    options: [
      'The amount of revenue generated',
      'Whether the taxpayer has a genuine profit motive',
      'The type of activity',
      'Whether a business license exists'
    ],
    correctAnswer: 1,
    explanation: 'The key factor is whether the activity is engaged in with a genuine expectation of profit. The IRS considers 9 factors including manner of operation, expertise, time devoted, and profit history.',
    reference: 'Treas. Reg. §1.183-2',
  },
  {
    id: 'see2-443',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Hobby Losses',
    subtopic: 'Profit Presumption',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'An activity is presumed to be for profit if it produces a profit in:',
    options: [
      'Any 1 year',
      '3 of 5 consecutive years (2 of 7 for horse activities)',
      'Every year of operation',
      '5 consecutive years'
    ],
    correctAnswer: 1,
    explanation: 'An activity is presumed to be for profit if it produces a profit in 3 of the 5 most recent tax years (2 of 7 years for activities involving horses). This is a presumption, not a safe harbor.',
    reference: 'IRC §183(d)',
  },
  {
    id: 'see2-444',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Hobby Losses',
    subtopic: 'Nine Factor Test',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Which is NOT one of the 9 factors for determining profit motive?',
    options: [
      'Manner in which the activity is carried on',
      'Expertise of the taxpayer in the activity',
      'Location of the taxpayer\'s primary residence',
      'Time and effort expended in the activity'
    ],
    correctAnswer: 2,
    explanation: 'The 9 factors include: manner of operation, expertise, time/effort, asset appreciation, prior profits, occasional profits, taxpayer\'s financial status, personal pleasure, and history of losses. Residence location is not a factor.',
    reference: 'Treas. Reg. §1.183-2(b)',
  },
  {
    id: 'see2-445',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Hobby Losses',
    subtopic: 'Section 183 Election',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A taxpayer can elect to postpone the hobby loss determination until:',
    options: [
      'After the first year of losses',
      'After the fifth year (or seventh for horses) when the presumption period ends',
      'After audit notice',
      '10 years of operation'
    ],
    correctAnswer: 1,
    explanation: 'Under §183(e), a taxpayer can elect to postpone the hobby/business determination until after the presumption period (5 or 7 years) ends, keeping the statute of limitations open.',
    reference: 'IRC §183(e)',
  },
  {
    id: 'see2-446',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Hobby Losses',
    subtopic: 'Businesslike Operation',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Which evidence supports profit motive for an activity?',
    options: [
      'No business records kept',
      'Complete books and records, business plan, and changes to improve profitability',
      'Activity conducted only on weekends',
      'Large personal enjoyment from the activity'
    ],
    correctAnswer: 1,
    explanation: 'Operating in a businesslike manner (maintaining books, having a business plan, marketing, making changes to improve profitability) supports a profit motive finding.',
    reference: 'Treas. Reg. §1.183-2(b)(1)',
  },
  {
    id: 'see2-447',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Hobby Losses',
    subtopic: 'Personal Pleasure Factor',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'If a taxpayer derives personal pleasure from an activity:',
    options: [
      'The activity is automatically a hobby',
      'It does not preclude profit motive but is a factor considered',
      'All expenses are disallowed',
      'The activity must be profitable every year'
    ],
    correctAnswer: 1,
    explanation: 'Personal pleasure is one of the 9 factors but does not automatically make an activity a hobby. Many legitimate businesses provide enjoyment to their owners while still having a profit motive.',
    reference: 'Treas. Reg. §1.183-2(b)(9)',
  },
  {
    id: 'see2-448',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Hobby Losses',
    subtopic: 'Startup Losses',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Losses during an activity\'s startup phase:',
    options: [
      'Prove the activity is a hobby',
      'Are expected for new businesses and do not preclude profit motive',
      'Must be capitalized',
      'Disqualify the activity from business treatment'
    ],
    correctAnswer: 1,
    explanation: 'Losses during startup are expected for many businesses. A history of losses is only one factor; the IRS considers whether losses were due to circumstances beyond control or early-stage development.',
    reference: 'Treas. Reg. §1.183-2(b)(6)',
  },
  {
    id: 'see2-449',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Hobby Losses',
    subtopic: 'Asset Appreciation',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'If an activity\'s assets are appreciating in value:',
    options: [
      'It has no relevance to hobby determination',
      'Overall profit may still exist even if operations show losses, supporting profit motive',
      'The activity is automatically a hobby',
      'Appreciation must be reported as current income'
    ],
    correctAnswer: 1,
    explanation: 'Expected appreciation of assets used in the activity can demonstrate profit motive even if annual operations show losses. Total economic profit includes both operating income and appreciation.',
    reference: 'Treas. Reg. §1.183-2(b)(4)',
  },
  {
    id: 'see2-450',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Hobby Losses',
    subtopic: 'Burden of Proof',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'In a hobby loss dispute, the burden of proof is generally on:',
    options: [
      'The IRS in all cases',
      'The taxpayer to show profit motive',
      'Equally shared',
      'The Tax Court'
    ],
    correctAnswer: 1,
    explanation: 'The taxpayer generally bears the burden of proving profit motive. However, if the §183(d) presumption applies (profitable 3 of 5 years), the burden shifts to the IRS to prove no profit motive.',
    reference: 'IRC §183(d); Tax Court precedent',
  },
];

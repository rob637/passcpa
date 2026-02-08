/**
 * EA SEE Part 2: Businesses - Questions Batch 33 (Q321-330)
 * Corporate Liquidations and Acquisitions
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH33: Question[] = [
  // ==========================================
  // SEE2-6: Corporate Liquidations and Acquisitions
  // ==========================================
  {
    id: 'see2-321',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Corporate Acquisitions',
    subtopic: 'Section 338 Election',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A Section 338 election allows a qualified stock purchase to be treated as:',
    options: [
      'A tax-free reorganization',
      'An asset acquisition with stepped-up basis',
      'A Section 351 transfer',
      'A partnership formation'
    ],
    correctAnswer: 1,
    explanation: 'A §338 election treats a qualified stock purchase (80%+ acquisition within 12 months) as if target sold its assets, allowing a stepped-up basis in assets. Target recognizes gain on deemed sale.',
    reference: 'IRC §338',
  },
  {
    id: 'see2-322',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Corporate Acquisitions',
    subtopic: 'Section 338(h)(10)',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A Section 338(h)(10) election differs from a regular 338 election because:',
    options: [
      'It is irrevocable',
      'Both buyer and seller must jointly elect, and only target recognizes gain',
      'Only buyer makes the election',
      'No step-up is available'
    ],
    correctAnswer: 1,
    explanation: 'A §338(h)(10) election requires a joint election. Old target is treated as selling assets to new target and immediately liquidating. Only one level of tax applies (no shareholder-level gain).',
    reference: 'IRC §338(h)(10); Treas. Reg. §1.338(h)(10)',
  },
  {
    id: 'see2-323',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Corporate Acquisitions',
    subtopic: 'Section 382 Limitations',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Section 382 limits the use of NOLs after an ownership change to:',
    options: [
      'Zero - NOLs are completely eliminated',
      'The value of the loss corporation times the long-term tax-exempt rate',
      'The greater of $1 million or 10% of NOLs',
      'Only NOLs generated in the past 3 years'
    ],
    correctAnswer: 1,
    explanation: 'After >50% ownership change, §382 limits annual NOL usage to the §382 limitation: target FMV × long-term tax-exempt rate (published monthly by IRS). Excess carries forward.',
    reference: 'IRC §382(b)',
  },
  {
    id: 'see2-324',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Corporate Liquidations',
    subtopic: 'Parent-Sub Liquidation',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Under IRC §332, a parent receiving property in liquidation of an 80%-owned subsidiary:',
    options: [
      'Recognizes gain on all property received',
      'Recognizes no gain or loss',
      'Recognizes loss only',
      'Must use fair market value for all assets'
    ],
    correctAnswer: 1,
    explanation: 'Under §332, a parent recognizing an 80%-owned subsidiary generally recognizes no gain or loss. The parent takes a carryover basis and succeeds to tax attributes under §334(b)(1) and §381.',
    reference: 'IRC §332; IRC §334(b)(1)',
  },
  {
    id: 'see2-325',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Corporate Liquidations',
    subtopic: 'Minority Shareholders',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When an 80%-owned subsidiary liquidates, the minority (20%) shareholders:',
    options: [
      'Also receive nonrecognition treatment',
      'Recognize gain or loss under regular §331 rules',
      'Must defer their gain until the parent sells assets',
      'Convert their stock to parent stock tax-free'
    ],
    correctAnswer: 1,
    explanation: 'Minority shareholders not meeting the 80% control test are treated as receiving a liquidating distribution under §331, recognizing capital gain or loss equal to FMV received minus stock basis.',
    reference: 'IRC §331',
  },
  {
    id: 'see2-326',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Corporate Acquisitions',
    subtopic: 'Triangular Mergers',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'In a forward triangular merger:',
    options: [
      'The parent merges into target',
      'Target merges into parent\'s subsidiary, with parent stock used as consideration',
      'The subsidiary merges into target',
      'No stock is exchanged'
    ],
    correctAnswer: 1,
    explanation: 'In a forward triangular merger (Type A variant), target merges into acquiring subsidiary, with target shareholders receiving parent stock. Target disappears; subsidiary survives with target assets.',
    reference: 'IRC §368(a)(2)(D)',
  },
  {
    id: 'see2-327',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Corporate Acquisitions',
    subtopic: 'Reverse Triangular Merger',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'In a reverse triangular merger:',
    options: [
      'Target survives after acquiring subsidiary merges into it',
      'Target disappears',
      'Parent disappears',
      'Target becomes unrelated to acquiring corporation'
    ],
    correctAnswer: 0,
    explanation: 'In a reverse triangular merger under §368(a)(2)(E), the subsidiary merges into target, with target surviving as a subsidiary of the parent. Target shareholders receive parent stock.',
    reference: 'IRC §368(a)(2)(E)',
  },
  {
    id: 'see2-328',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Corporate Acquisitions',
    subtopic: 'Step Transaction Doctrine',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The step transaction doctrine may cause related transactions to be:',
    options: [
      'Always treated separately',
      'Collapsed and tested as a single transaction for tax purposes',
      'Ignored for tax purposes',
      'Accelerated into the current year'
    ],
    correctAnswer: 1,
    explanation: 'The step transaction doctrine may collapse multiple related steps into one transaction, potentially disqualifying what appears to be a tax-free reorganization if prearranged to result in a taxable disposition.',
    reference: 'Court doctrine; See King Enterprises case',
  },
  {
    id: 'see2-329',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Corporate Reorganizations',
    subtopic: 'Type E Recapitalization',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A Type E reorganization (recapitalization) involves:',
    options: [
      'Merger with another corporation',
      'An internal restructuring of a corporation\'s capital structure',
      'Acquisition of another company\'s assets',
      'Liquidation of the corporation'
    ],
    correctAnswer: 1,
    explanation: 'A Type E reorganization is a single-corporation internal restructuring including exchange of stock for stock, bonds for stock, or stock for bonds within the same corporation.',
    reference: 'IRC §368(a)(1)(E)',
  },
  {
    id: 'see2-330',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Corporate Reorganizations',
    subtopic: 'Type F Reorganization',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A Type F reorganization is primarily:',
    options: [
      'A merger between competing corporations',
      'A mere change in form, identity, or place of organization',
      'An acquisition of substantially all assets',
      'A divisive reorganization'
    ],
    correctAnswer: 1,
    explanation: 'A Type F reorganization under §368(a)(1)(F) involves a mere change in identity, form, or place of organization of one corporation (e.g., reincorporating in a different state).',
    reference: 'IRC §368(a)(1)(F)',
  },
];

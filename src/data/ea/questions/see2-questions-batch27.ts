/**
 * EA SEE Part 2: Businesses - Questions Batch 27 (Q261-270)
 * Trusts and Estates
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH27: Question[] = [
  // ==========================================
  // SEE2-6: Trusts and Estates
  // ==========================================
  {
    id: 'see2-261',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Trusts and Estates',
    subtopic: 'Trust Taxation Overview',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Trusts and estates are generally:',
    options: [
      'Tax-exempt entities',
      'Taxed as separate taxpaying entities using compressed brackets',
      'Taxed at a flat 21% rate',
      'Only taxed when terminated'
    ],
    correctAnswer: 1,
    explanation: 'Trusts and estates are separate taxpaying entities under Subchapter J. They use highly compressed tax brackets, reaching the 37% rate at only about $14,450 of taxable income in 2024.',
    reference: 'IRC §1(e)',
  },
  {
    id: 'see2-262',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Trusts and Estates',
    subtopic: 'Distributable Net Income',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Distributable Net Income (DNI) serves as:',
    options: [
      'The minimum amount that must be distributed',
      'The maximum deduction for distributions and the maximum taxable to beneficiaries',
      'The trust\'s taxable income before exemptions',
      'The amount of tax-exempt income'
    ],
    correctAnswer: 1,
    explanation: 'DNI is the ceiling on the distribution deduction for the fiduciary and the ceiling on the amount taxable to beneficiaries. It also determines the character of distributions to beneficiaries.',
    reference: 'IRC §643(a)',
  },
  {
    id: 'see2-263',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Trusts and Estates',
    subtopic: 'Simple Trust',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A simple trust is one that:',
    options: [
      'Has no beneficiaries',
      'Distributes all income currently, makes no charitable contributions, and makes no principal distributions',
      'Has a corpus of less than $100,000',
      'Terminates within 3 years'
    ],
    correctAnswer: 1,
    explanation: 'A simple trust must distribute all income currently, cannot make distributions of principal during the year, and cannot make charitable contributions. Simple trusts get a $300 personal exemption.',
    reference: 'IRC §651; IRC §642(b)',
  },
  {
    id: 'see2-264',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Trusts and Estates',
    subtopic: 'Complex Trust',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A complex trust:',
    options: [
      'Must distribute all income currently',
      'May accumulate income, make charitable contributions, or distribute principal',
      'Cannot have more than 5 beneficiaries',
      'Is always a grantor trust'
    ],
    correctAnswer: 1,
    explanation: 'A complex trust is any trust that is not a simple trust. It may accumulate income, make principal distributions, or make charitable contributions. Complex trusts get a $100 personal exemption.',
    reference: 'IRC §661; IRC §642(b)',
  },
  {
    id: 'see2-265',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Trusts and Estates',
    subtopic: 'Grantor Trust',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A trust is treated as a grantor trust (income taxable to grantor) when:',
    options: [
      'The grantor is deceased',
      'The grantor retains certain powers like the power to revoke or substitute assets',
      'The trust has been in existence more than 10 years',
      'The beneficiaries are all adults'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §§671-679, a trust is a grantor trust if the grantor retains substantial powers or benefits, such as power to revoke, power to substitute assets, reversionary interest, or power to control beneficial enjoyment.',
    reference: 'IRC §§671-679',
  },
  {
    id: 'see2-266',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Trusts and Estates',
    subtopic: 'Estate Income',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Income earned after a decedent\'s death on estate assets is:',
    options: [
      'Reported on the decedent\'s final 1040',
      'Tax-exempt',
      'Reported on the estate\'s income tax return (Form 1041)',
      'Reported by the beneficiaries only'
    ],
    correctAnswer: 2,
    explanation: 'Income earned on estate assets after death is estate income reported on Form 1041. The estate may deduct distributions to beneficiaries, who then report their share. Pre-death income is on the final Form 1040.',
    reference: 'IRC §641',
  },
  {
    id: 'see2-267',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Trusts and Estates',
    subtopic: 'Distribution Deduction',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A trust has DNI of $50,000 and distributes $70,000 to beneficiaries. The trust\'s distribution deduction is:',
    options: [
      '$70,000',
      '$50,000',
      '$20,000',
      '$0'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §661(a), the distribution deduction is limited to DNI. The trust deducts $50,000, and beneficiaries are taxed on $50,000. The $20,000 excess is a tax-free distribution of principal.',
    reference: 'IRC §661(a)',
  },
  {
    id: 'see2-268',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Trusts and Estates',
    subtopic: 'Tier System',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Under the tier system for complex trusts, first-tier distributions are:',
    options: [
      'All distributions of principal',
      'Distributions of income required by the trust agreement',
      'Discretionary distributions',
      'Charitable distributions'
    ],
    correctAnswer: 1,
    explanation: 'First-tier distributions are required income distributions (mandatory). Second-tier distributions are discretionary income or principal. First tier is allocated DNI first; second tier gets the remainder.',
    reference: 'IRC §662',
  },
  {
    id: 'see2-269',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Trusts and Estates',
    subtopic: 'Income in Respect of Decedent',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Income in Respect of a Decedent (IRD) is:',
    options: [
      'Exempt from both income and estate tax',
      'Taxable to the recipient when received and may also be subject to estate tax',
      'Taxed only at capital gains rates',
      'Never taxable to the estate'
    ],
    correctAnswer: 1,
    explanation: 'IRD (income the decedent had a right to but hadn\'t received) is taxable to whoever receives it. It doesn\'t get stepped-up basis. If estate tax was paid on IRD, the recipient may claim an IRC §691(c) deduction.',
    reference: 'IRC §691',
  },
  {
    id: 'see2-270',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Trusts and Estates',
    subtopic: 'Estate Tax Year',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'An estate can elect to use:',
    options: [
      'Only a calendar year',
      'Any fiscal year ending within 12 months of death',
      'Only the year of the decedent\'s death',
      'A 52-53 week year'
    ],
    correctAnswer: 1,
    explanation: 'An estate (unlike a trust) can elect any fiscal year ending within 12 months of death. This provides flexibility for income timing. The first return may be a short period.',
    reference: 'IRC §441; IRC §645',
  },
];

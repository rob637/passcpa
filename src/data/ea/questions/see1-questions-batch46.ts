/**
 * EA SEE Part 1: Individuals - Questions Batch 46 (Q521-540)
 * Domain 6: Specialized Returns for Individuals
 * 
 * Tax Year: 2024-2025
 */

import { Question } from '../../../types';

export const SEE1_QUESTIONS_BATCH46: Question[] = [
  {
    id: 'see1-521',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Amended Returns',
    subtopic: 'Form 1040-X Filing',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'What is the general time limit for filing an amended return (Form 1040-X) to claim a refund?',
    options: [
      '2 years from payment of tax or 3 years from filing, whichever is later',
      '3 years from payment of tax or 2 years from filing, whichever is later',
      'Always 3 years from the original due date',
      '7 years from the original due date'
    ],
    correctAnswer: 0,
    explanation: 'The refund claim deadline is the later of: (1) 3 years from the date the return was filed, or (2) 2 years from the date the tax was paid. This is often called the "3/2 rule."',
    reference: 'IRC §6511(a)'
  },
  {
    id: 'see1-522',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Amended Returns',
    subtopic: 'Form 1040-X Requirements',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which of the following can be changed by filing Form 1040-X?',
    options: [
      'Filing status from MFJ to MFS after the due date',
      'Electing to itemize after the due date when spouse itemized',
      'Mathematical errors made by the IRS',
      'Standard deduction amount for the tax year'
    ],
    correctAnswer: 1,
    explanation: 'If your spouse itemizes on a separate return, you must also itemize. If you initially took the standard deduction but your spouse itemized, you can amend to itemize. MFJ to MFS changes are generally only allowed before the due date.',
    reference: 'Form 1040-X Instructions'
  },
  {
    id: 'see1-523',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Foreign Income',
    subtopic: 'Foreign Earned Income Exclusion',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'For 2024, what is the maximum foreign earned income exclusion?',
    options: [
      '$100,800',
      '$108,700',
      '$120,000',
      '$126,500'
    ],
    correctAnswer: 3,
    explanation: 'The 2024 foreign earned income exclusion is $126,500 (indexed annually for inflation). Taxpayers must meet either the bona fide residence test or the physical presence test to qualify.',
    reference: 'IRC §911(b); Rev. Proc. 2023-34'
  },
  {
    id: 'see1-524',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Foreign Income',
    subtopic: 'Physical Presence Test',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'To meet the physical presence test for the foreign earned income exclusion, a taxpayer must be physically present in a foreign country for:',
    options: [
      'At least 183 days in any calendar year',
      'At least 330 full days during any 12-month period',
      'A majority of the tax year',
      'The entire tax year without exception'
    ],
    correctAnswer: 1,
    explanation: 'The physical presence test requires being physically present in a foreign country for at least 330 full days during any consecutive 12-month period. Days of transit over international waters don\'t count.',
    reference: 'IRC §911(d)(1)(B)'
  },
  {
    id: 'see1-525',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Foreign Income',
    subtopic: 'Foreign Tax Credit',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When would claiming a foreign tax credit be MORE beneficial than claiming a deduction for foreign taxes paid?',
    options: [
      'When in a low tax bracket',
      'When foreign taxes are minimal',
      'When the taxpayer\'s effective tax rate is higher than the credit limitation',
      'In most situations since a credit gives dollar-for-dollar reduction'
    ],
    correctAnswer: 3,
    explanation: 'A tax credit reduces tax liability dollar-for-dollar, while a deduction only reduces taxable income. A $100 credit saves $100; a $100 deduction saves only $22-37 depending on bracket. The credit is almost always more beneficial.',
    reference: 'IRC §901'
  },
  {
    id: 'see1-526',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Expatriation',
    subtopic: 'Exit Tax - Covered Expatriate',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Which of the following makes a U.S. citizen a "covered expatriate" subject to the exit tax?',
    options: [
      'Living abroad for more than 3 years',
      'Net worth of $2 million or more',
      'Being a dual citizen from birth who hasn\'t lived in the U.S.',
      'Owning foreign real estate'
    ],
    correctAnswer: 1,
    explanation: 'A covered expatriate includes those with: (1) net worth ≥$2 million, (2) average annual net income tax liability ≥ $201,000 (2024) for the 5 years preceding expatriation, or (3) failure to certify 5 years of tax compliance.',
    reference: 'IRC §877A(g)(1)'
  },
  {
    id: 'see1-527',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Non-resident Aliens',
    subtopic: 'NRA Filing Requirements',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A non-resident alien with U.S. source income must generally file:',
    options: [
      'Form 1040 with Schedule C',
      'Form 1040-NR',
      'No return if all taxes were withheld',
      'Form 1040-X'
    ],
    correctAnswer: 1,
    explanation: 'Non-resident aliens report U.S. source income on Form 1040-NR. They are taxed only on U.S. source income, with different rules for effectively connected income vs. FDAP (fixed, determinable, annual, periodical) income.',
    reference: 'Form 1040-NR Instructions'
  },
  {
    id: 'see1-528',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Non-resident Aliens',
    subtopic: 'Substantial Presence Test',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Under the substantial presence test, how many days of current year presence create U.S. residency status?',
    options: [
      '31 days in the current year and 183 days using the formula',
      '183 days in the current year regardless of prior years',
      'Any presence in 3 consecutive years',
      '30 days in each of 3 consecutive years'
    ],
    correctAnswer: 0,
    explanation: 'The substantial presence test requires: (1) at least 31 days in the current year, AND (2) 183+ days using the formula: current year days + 1/3 of prior year days + 1/6 of second prior year days.',
    reference: 'IRC §7701(b)(3)'
  },
  {
    id: 'see1-529',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Estate and Gift',
    subtopic: 'Gift Tax Annual Exclusion',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'For 2024, the annual gift tax exclusion is:',
    options: [
      '$15,000 per donee',
      '$16,000 per donee',
      '$17,000 per donee',
      '$18,000 per donee'
    ],
    correctAnswer: 3,
    explanation: 'The 2024 annual gift tax exclusion is $18,000 per donee ($36,000 for split gifts by married couples). Gifts up to this amount are excluded from gift tax and don\'t count against the lifetime exemption.',
    reference: 'IRC §2503(b); Rev. Proc. 2023-34'
  },
  {
    id: 'see1-530',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Estate and Gift',
    subtopic: 'Lifetime Gift Exemption',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'For 2024, the unified estate and gift tax exemption is approximately:',
    options: [
      '$5.49 million',
      '$11.18 million',
      '$12.06 million',
      '$13.61 million'
    ],
    correctAnswer: 3,
    explanation: 'The 2024 unified exemption is $13.61 million per person ($27.22 million for married couples with portability). This exemption is scheduled to revert to approximately $7 million after 2025 under current law.',
    reference: 'IRC §2010(c); Rev. Proc. 2023-34'
  },
  {
    id: 'see1-531',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Amended Returns',
    subtopic: 'Bad Debt Refund Claim',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'For bad debts and worthless securities, the refund claim period is extended to:',
    options: [
      '3 years from the standard due date',
      '5 years from the date of worthlessness',
      '7 years from the due date of the return for the year of worthlessness',
      '10 years from the original filing'
    ],
    correctAnswer: 2,
    explanation: 'Bad debts and worthless securities have a special 7-year refund claim period instead of the normal 3 years. This extended period recognizes the difficulty in determining the exact year a debt became worthless.',
    reference: 'IRC §6511(d)(1)'
  },
  {
    id: 'see1-532',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Foreign Income',
    subtopic: 'FBAR Reporting',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The FBAR (FinCEN Form 114) must be filed when foreign accounts exceed what aggregate value at any time during the year?',
    options: [
      '$5,000',
      '$10,000',
      '$50,000',
      '$100,000'
    ],
    correctAnswer: 1,
    explanation: 'FBAR is required when the aggregate value of all foreign financial accounts exceeds $10,000 at any time during the calendar year. The deadline is April 15 with automatic extension to October 15.',
    reference: '31 CFR §1010.350'
  },
  {
    id: 'see1-533',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Foreign Income',
    subtopic: 'Form 8938 FATCA',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Form 8938 (Statement of Specified Foreign Financial Assets) filing thresholds for taxpayers living in the U.S. (unmarried) are:',
    options: [
      'More than $10,000 at any time',
      'More than $50,000 at year-end or $75,000 at any time',
      'More than $100,000 at year-end',
      'More than $200,000 at year-end'
    ],
    correctAnswer: 1,
    explanation: 'For unmarried taxpayers living in the U.S., Form 8938 is required if foreign financial assets exceed $50,000 on the last day of the tax year OR more than $75,000 at any time during the year. Higher thresholds apply to those living abroad.',
    reference: 'IRC §6038D; Form 8938 Instructions'
  },
  {
    id: 'see1-534',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Expatriation',
    subtopic: 'Form 8854',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A U.S. citizen renouncing citizenship must file:',
    options: [
      'Form 1040 only for the year of expatriation',
      'Form 8854 (Initial and Annual Expatriation Statement)',
      'Form 2555 with the final return',
      'No special forms are required'
    ],
    correctAnswer: 1,
    explanation: 'Expatriating citizens or long-term residents must file Form 8854 with their final tax return. This form certifies tax compliance and determines if the person is a "covered expatriate" subject to the exit tax.',
    reference: 'Form 8854 Instructions'
  },
  {
    id: 'see1-535',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Non-resident Aliens',
    subtopic: 'NRA Standard Deduction',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Non-resident aliens filing Form 1040-NR are entitled to:',
    options: [
      'The full standard deduction like U.S. citizens',
      'A reduced standard deduction of $7,250',
      'No standard deduction unless from certain treaty countries',
      'One personal exemption only'
    ],
    correctAnswer: 2,
    explanation: 'NRAs generally cannot claim the standard deduction and must itemize. However, students and business apprentices from India may claim a standard deduction under the tax treaty. Special rules apply.',
    reference: 'Form 1040-NR Instructions'
  },
  {
    id: 'see1-536',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Estate and Gift',
    subtopic: 'Basis of Inherited Property',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The basis of property inherited from a decedent is generally:',
    options: [
      'Decedent\'s adjusted basis (carryover basis)',
      'Fair market value at date of death (stepped-up basis)',
      'Zero',
      'Original purchase price'
    ],
    correctAnswer: 1,
    explanation: 'Inherited property receives a stepped-up (or stepped-down) basis to fair market value at the date of death. This eliminates capital gains tax on appreciation during the decedent\'s lifetime.',
    reference: 'IRC §1014'
  },
  {
    id: 'see1-537',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Estate and Gift',
    subtopic: 'Basis of Gifted Property',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'When gifted property has FMV less than donor\'s basis, what is the donee\'s basis for loss purposes?',
    options: [
      'Donor\'s adjusted basis',
      'Fair market value at date of gift',
      'Average of donor\'s basis and FMV',
      'Zero'
    ],
    correctAnswer: 1,
    explanation: 'For property where FMV < donor\'s basis at gift date, there\'s a dual basis rule: donor\'s basis for gain, FMV for loss. If sold between these values, there\'s no gain or loss. This prevents transferring losses through gifting.',
    reference: 'IRC §1015(a)'
  },
  {
    id: 'see1-538',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Amended Returns',
    subtopic: 'Carryback Claims',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Net Operating Losses (NOLs) arising in 2024 can generally be carried:',
    options: [
      'Back 2 years and forward 20 years',
      'Forward indefinitely only (no carryback)',
      'Back 5 years for farming losses, otherwise forward only',
      'Back 3 years and forward 5 years'
    ],
    correctAnswer: 2,
    explanation: 'Under the TCJA, NOLs arising after 2020 can only be carried forward (no carryback) and are limited to 80% of taxable income. Exception: farming losses can still be carried back 2 years.',
    reference: 'IRC §172(b)(1); CARES Act modifications'
  },
  {
    id: 'see1-539',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Foreign Income',
    subtopic: 'Foreign Housing Exclusion',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The foreign housing exclusion is available to:',
    options: [
      'Any taxpayer with foreign housing expenses',
      'Taxpayers qualifying for the foreign earned income exclusion who are employees',
      'Self-employed individuals only',
      'Only U.S. government employees abroad'
    ],
    correctAnswer: 1,
    explanation: 'The foreign housing exclusion (for employees) or deduction (for self-employed) is available to taxpayers who qualify for the FEIE. It allows excluding housing expenses above a base amount, subject to a cap based on location.',
    reference: 'IRC §911(c)'
  },
  {
    id: 'see1-540',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Estate and Gift',
    subtopic: 'Medical and Education Exclusions',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Payments made directly to an educational institution or medical provider for another person are:',
    options: [
      'Subject to gift tax above the annual exclusion',
      'Exempt from gift tax regardless of amount',
      'Subject to a special $50,000 exclusion',
      'Deductible as a charitable contribution'
    ],
    correctAnswer: 1,
    explanation: 'Payments made directly to educational institutions for tuition or to medical providers are excluded from gift tax without limit, in addition to the annual exclusion. This allows substantial wealth transfer for education and medical expenses.',
    reference: 'IRC §2503(e)'
  }
];

/**
 * EA SEE Part 2: Businesses - Questions Batch 36 (Q351-360)
 * Employment Taxes and Payroll
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH36: Question[] = [
  // ==========================================
  // SEE2-2: Employment Taxes
  // ==========================================
  {
    id: 'see2-351',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Employment Taxes',
    subtopic: 'FICA Overview',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'FICA taxes consist of:',
    options: [
      'Federal income tax only',
      'Social Security and Medicare taxes',
      'State income tax only',
      'Unemployment taxes only'
    ],
    correctAnswer: 1,
    explanation: 'FICA (Federal Insurance Contributions Act) includes Social Security tax (6.2% on wages up to the annual limit) and Medicare tax (1.45% on all wages, plus 0.9% additional Medicare on high earners).',
    reference: 'IRC §3101; IRC §3111',
  },
  {
    id: 'see2-352',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Employment Taxes',
    subtopic: 'Social Security Wage Base',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The Social Security tax applies to:',
    options: [
      'All wages without limit',
      'Wages up to the annual wage base limit',
      'Only tips and bonuses',
      'Only salary, not hourly wages'
    ],
    correctAnswer: 1,
    explanation: 'Social Security tax (OASDI) applies only to wages up to the annual wage base ($168,600 for 2024). Wages above this amount are not subject to Social Security tax (but are subject to Medicare).',
    reference: 'IRC §3121(a); Social Security Act',
  },
  {
    id: 'see2-353',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Employment Taxes',
    subtopic: 'Additional Medicare Tax',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The Additional Medicare Tax of 0.9% applies to:',
    options: [
      'All wages regardless of amount',
      'Wages exceeding $200,000 (single) or $250,000 (married filing jointly)',
      'Only self-employment income',
      'Only investment income'
    ],
    correctAnswer: 1,
    explanation: 'The Additional Medicare Tax of 0.9% applies to wages exceeding $200,000 for single filers or $250,000 for married filing jointly. Employers must withhold on wages over $200,000.',
    reference: 'IRC §3101(b)(2)',
  },
  {
    id: 'see2-354',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Employment Taxes',
    subtopic: 'FUTA',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The Federal Unemployment Tax (FUTA) is:',
    options: [
      'Paid 50/50 by employer and employee',
      'Paid only by the employer',
      'Paid only by the employee',
      'Paid by the state government'
    ],
    correctAnswer: 1,
    explanation: 'FUTA tax is paid entirely by employers. The rate is 6.0% on the first $7,000 of wages per employee, but employers receive up to 5.4% credit for state unemployment taxes, resulting in a net 0.6% rate.',
    reference: 'IRC §3301',
  },
  {
    id: 'see2-355',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Employment Taxes',
    subtopic: 'Deposit Requirements',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Employers with over $100,000 in employment tax liability during a lookback period must deposit:',
    options: [
      'Quarterly',
      'Monthly',
      'Semi-weekly or next business day',
      'Annually'
    ],
    correctAnswer: 2,
    explanation: 'Large employers (over $100,000 lookback period liability) must make semi-weekly deposits. If liability exceeds $100,000 in one day, next-day deposit is required.',
    reference: 'Treas. Reg. §31.6302-1',
  },
  {
    id: 'see2-356',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Employment Taxes',
    subtopic: 'Form 941',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Form 941 is used by employers to:',
    options: [
      'Report annual federal income tax',
      'Report quarterly employment taxes withheld and employer\'s share',
      'Request employer identification number',
      'Report annual wage and tax statements'
    ],
    correctAnswer: 1,
    explanation: 'Form 941, Employer\'s Quarterly Federal Tax Return, reports wages paid, tips reported, federal income tax withheld, and both employer and employee shares of Social Security and Medicare taxes.',
    reference: 'IRC §6011',
  },
  {
    id: 'see2-357',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Employment Taxes',
    subtopic: 'Trust Fund Recovery Penalty',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The Trust Fund Recovery Penalty (IRC §6672) may be assessed against:',
    options: [
      'Only the corporation',
      'Responsible persons who willfully fail to collect, account for, or pay trust fund taxes',
      'Only silent partners',
      'State governments'
    ],
    correctAnswer: 1,
    explanation: 'The TFRP equals 100% of trust fund taxes (employee withholdings) and can be personally assessed against any responsible person (officer, director, owner) who willfully fails to pay.',
    reference: 'IRC §6672',
  },
  {
    id: 'see2-358',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Employment Taxes',
    subtopic: 'Independent Contractor',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The IRS uses which test to determine worker classification as employee vs. independent contractor?',
    options: [
      'Written agreement test only',
      'Common-law rules focusing on behavioral control, financial control, and relationship type',
      'Amount of compensation only',
      'Industry standard test'
    ],
    correctAnswer: 1,
    explanation: 'The IRS applies common-law rules examining behavioral control (how work is done), financial control (business aspects), and type of relationship (contracts, benefits, permanency).',
    reference: 'Rev. Rul. 87-41; IRS Publication 15-A',
  },
  {
    id: 'see2-359',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Employment Taxes',
    subtopic: 'Form W-2',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Form W-2 must be furnished to employees by:',
    options: [
      'December 31 of the tax year',
      'January 31 of the following year',
      'April 15 of the following year',
      'Within 30 days of termination'
    ],
    correctAnswer: 1,
    explanation: 'Employers must furnish Form W-2 to employees by January 31 following the calendar year. Copies must also be filed with SSA by January 31.',
    reference: 'IRC §6051',
  },
  {
    id: 'see2-360',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Employment Taxes',
    subtopic: 'Form W-4',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The purpose of Form W-4 is to:',
    options: [
      'Report wages earned during the year',
      'Provide information to employer for calculating federal income tax withholding',
      'Claim exempt status from FICA taxes',
      'Report independent contractor income'
    ],
    correctAnswer: 1,
    explanation: 'Form W-4, Employee\'s Withholding Certificate, provides information about filing status, dependents, other income, and deductions so employers can calculate proper federal income tax withholding.',
    reference: 'IRC §3402(f)',
  },
];

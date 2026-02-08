/**
 * EA SEE Part 2: Businesses - Questions Batch 51 (Q551-570)
 * Domain 2: Business Tax Preparation (expanded)
 * 
 * Tax Year: 2024-2025
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH51: Question[] = [
  {
    id: 'see2-551',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Depreciation',
    subtopic: 'Section 179 Limits',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'For tax year 2024, the maximum Section 179 deduction is:',
    options: [
      '$1,000,000',
      '$1,050,000',
      '$1,160,000',
      '$1,220,000'
    ],
    correctAnswer: 3,
    explanation: 'For 2024, the Section 179 deduction limit is $1,220,000. The phase-out threshold begins at $3,050,000 of qualified property placed in service. These limits are adjusted annually for inflation.',
    reference: 'IRC §179; Rev. Proc. 2023-34'
  },
  {
    id: 'see2-552',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Depreciation',
    subtopic: 'Bonus Depreciation Phase-Out',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'For property placed in service in 2024, the bonus depreciation percentage is:',
    options: [
      '100%',
      '80%',
      '60%',
      '40%'
    ],
    correctAnswer: 2,
    explanation: 'Bonus depreciation is being phased out: 80% for 2023, 60% for 2024, 40% for 2025, 20% for 2026, 0% after 2026. This affects qualified property placed in service during those years.',
    reference: 'IRC §168(k)(6)'
  },
  {
    id: 'see2-553',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Depreciation',
    subtopic: 'Listed Property',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'To claim accelerated depreciation on listed property (e.g., a vehicle used for business), the business use must be:',
    options: [
      'At least 25%',
      'More than 50%',
      'At least 75%',
      '100%'
    ],
    correctAnswer: 1,
    explanation: 'Listed property must be used MORE than 50% for business to qualify for accelerated depreciation (Section 179 and bonus depreciation). If business use falls below 50%, recapture rules apply.',
    reference: 'IRC §280F(b)'
  },
  {
    id: 'see2-554',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Depreciation',
    subtopic: 'Luxury Auto Limits',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'For a passenger automobile placed in service in 2024, the first-year depreciation limit (including bonus) is approximately:',
    options: [
      '$10,200',
      '$12,200',
      '$19,200',
      '$20,400'
    ],
    correctAnswer: 3,
    explanation: 'The 2024 luxury auto limits with bonus depreciation: Year 1: $20,400 (vs. $12,400 without bonus), Year 2: $19,800, Year 3: $11,900, Subsequent years: $7,160. These limits apply to passenger autos regardless of cost.',
    reference: 'Rev. Proc. 2024-XX'
  },
  {
    id: 'see2-555',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Accounting Methods',
    subtopic: 'Cash vs Accrual',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which of the following businesses MUST use the accrual method of accounting?',
    options: [
      'A sole proprietorship with $20 million average gross receipts',
      'A C corporation with $35 million average gross receipts',
      'A partnership with $15 million average gross receipts',
      'An S corporation with $10 million average gross receipts'
    ],
    correctAnswer: 1,
    explanation: 'Generally, businesses with average annual gross receipts over $30 million (3-year average) must use accrual accounting. C corporations below this threshold and all small businesses can use cash method. The TCJA increased this threshold from $5 million.',
    reference: 'IRC §448(c)'
  },
  {
    id: 'see2-556',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Business Expenses',
    subtopic: 'Meals Deduction',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'For tax years after 2022, the deduction for business meals is:',
    options: [
      '100% deductible',
      '80% deductible',
      '50% deductible',
      'Not deductible'
    ],
    correctAnswer: 2,
    explanation: 'Business meals are generally 50% deductible. The temporary 100% deduction for restaurant meals (2021-2022) has expired. Entertainment expenses remain disallowed under TCJA.',
    reference: 'IRC §274(n)'
  },
  {
    id: 'see2-557',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Business Expenses',
    subtopic: 'Start-up Costs',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A new business incurs $55,000 in qualifying start-up costs. How much can be deducted in the first year?',
    options: [
      '$5,000',
      '$0 (must amortize over 180 months)',
      '$55,000',
      '$3,333'
    ],
    correctAnswer: 1,
    explanation: 'The $5,000 immediate deduction is reduced dollar-for-dollar when start-up costs exceed $50,000. With $55,000 in costs, the immediate deduction is $0 ($5,000 - $5,000 excess = $0). The full $55,000 must be amortized over 180 months.',
    reference: 'IRC §195'
  },
  {
    id: 'see2-558',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Employment Taxes',
    subtopic: 'Social Security Wage Base',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'For 2024, the Social Security wage base is:',
    options: [
      '$147,000',
      '$160,200',
      '$168,600',
      '$176,100'
    ],
    correctAnswer: 2,
    explanation: 'The 2024 Social Security wage base is $168,600. The employer and employee each pay 6.2% OASDI tax on wages up to this limit. Medicare tax (1.45%) has no wage limit.',
    reference: 'IRC §3121(a); SSA Announcement'
  },
  {
    id: 'see2-559',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Employment Taxes',
    subtopic: 'Additional Medicare Tax',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The 0.9% Additional Medicare Tax applies to wages exceeding:',
    options: [
      '$125,000 for all taxpayers',
      '$200,000 single, $250,000 MFJ',
      '$250,000 for all taxpayers',
      '$400,000 single, $450,000 MFJ'
    ],
    correctAnswer: 1,
    explanation: 'The 0.9% Additional Medicare Tax applies to wages and self-employment income exceeding $200,000 (single), $250,000 (MFJ), or $125,000 (MFS). These thresholds are not indexed for inflation.',
    reference: 'IRC §3101(b)(2)'
  },
  {
    id: 'see2-560',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Business Credits',
    subtopic: 'Research and Development Credit',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A qualified small business (under $5 million gross receipts, less than 5 years old) with an R&D credit can apply it against:',
    options: [
      'Income tax only',
      'Payroll tax liability (up to $250,000 per year)',
      'Self-employment tax only',
      'Estimated tax payments only'
    ],
    correctAnswer: 1,
    explanation: 'Qualified small businesses (gross receipts <$5M in current year, no receipts in prior 5+ years) can elect to apply up to $250,000 of R&D credit against employer FICA taxes instead of income tax. This benefits startups with no income tax liability.',
    reference: 'IRC §41(h)'
  },
  {
    id: 'see2-561',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-1',
    topic: 'S Corporations',
    subtopic: 'S Corp Election Deadline',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A calendar-year corporation wanting to be an S corporation for 2024 must file Form 2553 by:',
    options: [
      'March 15, 2024',
      'April 15, 2024',
      'December 31, 2024',
      'January 1, 2024'
    ],
    correctAnswer: 0,
    explanation: 'To be effective for the current tax year, Form 2553 must be filed within 2 months and 15 days of the year\'s start (March 15 for calendar-year corps). Late elections may qualify for relief under Rev. Proc. 2013-30.',
    reference: 'IRC §1362(b)'
  },
  {
    id: 'see2-562',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-1',
    topic: 'S Corporations',
    subtopic: 'Reasonable Compensation',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'An S corporation net income is $200,000 and the shareholder-employee takes $40,000 salary. The IRS will likely:',
    options: [
      'Accept this as reasonable compensation',
      'Reclassify distributions as wages subject to employment taxes',
      'Disallow all business deductions',
      'Revoke the S election'
    ],
    correctAnswer: 1,
    explanation: 'The IRS scrutinizes S corp reasonable compensation. If salaries are too low relative to profits and work performed, distributions may be recharacterized as wages, resulting in back taxes, penalties, and interest on unpaid FICA.',
    reference: 'Rev. Rul. 74-44'
  },
  {
    id: 'see2-563',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-1',
    topic: 'Partnerships',
    subtopic: 'Guaranteed Payments',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Guaranteed payments to a partner are:',
    options: [
      'Subject to self-employment tax for the partner',
      'Wages subject to FICA withholding',
      'Tax-free distributions',
      'Capital gains to the partner'
    ],
    correctAnswer: 0,
    explanation: 'Guaranteed payments are treated as ordinary income to the partner and are subject to self-employment tax. They are deductible by the partnership and paid without regard to partnership income.',
    reference: 'IRC §707(c)'
  },
  {
    id: 'see2-564',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-1',
    topic: 'C Corporations',
    subtopic: 'Corporate Tax Rate',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The corporate income tax rate for C corporations is:',
    options: [
      'Progressive rates from 15% to 35%',
      'Flat 21%',
      'Flat 25%',
      'Flat 28%'
    ],
    correctAnswer: 1,
    explanation: 'The TCJA established a flat 21% corporate tax rate for C corporations, replacing the graduated rate structure (15%-35%) that existed before 2018.',
    reference: 'IRC §11'
  },
  {
    id: 'see2-565',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-1',
    topic: 'Basis',
    subtopic: 'S Corp Shareholder Basis',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'An S corporation shareholder\'s basis is increased by:',
    options: [
      'Distributions received',
      'Pass-through income and additional capital contributions',
      'Company losses',
      'Guaranteed payments received'
    ],
    correctAnswer: 1,
    explanation: 'S corp shareholder basis increases for: income (including tax-exempt), capital contributions. Basis decreases for: distributions, losses/deductions, non-deductible expenses. S corps don\'t have guaranteed payments.',
    reference: 'IRC §1367'
  },
  {
    id: 'see2-566',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-1',
    topic: 'Basis',
    subtopic: 'Partnership Basis Ordering',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The order for reducing a partner\'s basis is:',
    options: [
      'Losses, then distributions, then nondeductible expenses',
      'Distributions, then losses, then nondeductible expenses',
      'Nondeductible expenses, then distributions, then losses',
      'Distributions, nondeductible expenses, then losses in that order'
    ],
    correctAnswer: 3,
    explanation: 'Partner basis is reduced in this order: (1) distributions (to extent of basis), (2) nondeductible, non-capitalized expenditures, (3) deductible losses. This ordering matters when basis is limited.',
    reference: 'IRC §704(d); Reg. §1.704-1(d)'
  },
  {
    id: 'see2-567',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Retirement Plans',
    subtopic: 'SIMPLE IRA Limits',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'For 2024, the maximum employee contribution to a SIMPLE IRA is:',
    options: [
      '$6,500',
      '$15,500',
      '$16,000',
      '$23,000'
    ],
    correctAnswer: 2,
    explanation: 'The 2024 SIMPLE IRA contribution limit is $16,000 ($19,500 with catch-up for age 50+). This is lower than the 401(k) limit of $23,000 but higher than the Traditional/Roth IRA limit of $7,000.',
    reference: 'IRC §408(p); Notice 2023-75'
  },
  {
    id: 'see2-568',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Retirement Plans',
    subtopic: 'SEP-IRA Contribution',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The maximum SEP-IRA contribution for 2024 is the lesser of:',
    options: [
      '$6,500 or 100% of compensation',
      '$23,000 or 100% of compensation',
      '$66,000 or 25% of compensation',
      '$69,000 or 25% of compensation'
    ],
    correctAnswer: 3,
    explanation: 'For 2024, SEP-IRA contributions are limited to the lesser of $69,000 or 25% of the employee\'s compensation. Self-employed individuals calculate this based on net SE income after the SE tax adjustment.',
    reference: 'IRC §408(k); §404(h)'
  },
  {
    id: 'see2-569',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Passive Activities',
    subtopic: 'Material Participation Tests',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'To meet the material participation test, which single test is sufficient?',
    options: [
      'Participating in the activity for any amount of time',
      'Participating more than 100 hours',
      'Participating more than 500 hours during the year',
      'Owning more than 10% of the activity'
    ],
    correctAnswer: 2,
    explanation: 'One way to meet material participation is participating in the activity for more than 500 hours during the year. There are 7 tests total, including the 100-hour/no one else more test and 5 of last 10 years test.',
    reference: 'Reg. §1.469-5T(a)'
  },
  {
    id: 'see2-570',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Business Credits',
    subtopic: 'Work Opportunity Tax Credit',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The Work Opportunity Tax Credit (WOTC) is generally what percentage of first-year wages for employees working 400+ hours?',
    options: [
      '25% of up to $6,000 wages',
      '40% of up to $6,000 wages',
      '50% of up to $10,000 wages',
      '100% of first $3,000 wages'
    ],
    correctAnswer: 1,
    explanation: 'WOTC is 40% of the first $6,000 of qualified first-year wages ($2,400 max) for employees working 400+ hours. For 120-399 hours, it\'s 25% of $6,000 ($1,500 max). Higher amounts apply for certain targeted groups.',
    reference: 'IRC §51'
  }
];

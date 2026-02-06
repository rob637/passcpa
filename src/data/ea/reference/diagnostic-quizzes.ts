/**
 * EA Diagnostic Quizzes
 * 25-question assessments for each section to identify knowledge gaps
 */

export interface DiagnosticQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  blueprintArea: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
}

export interface DiagnosticQuiz {
  section: 'SEE1' | 'SEE2' | 'SEE3';
  title: string;
  description: string;
  timeLimit: number; // minutes
  passingScore: number; // percentage
  questions: DiagnosticQuestion[];
}

export interface DiagnosticResult {
  section: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  weakAreas: { area: string; score: number; total: number }[];
  recommendations: string[];
}

// ============================================
// SEE1 DIAGNOSTIC QUIZ
// ============================================
export const SEE1_DIAGNOSTIC: DiagnosticQuiz = {
  section: 'SEE1',
  title: 'Individuals Diagnostic Assessment',
  description: 'Assess your readiness for SEE Part 1: Individuals',
  timeLimit: 35,
  passingScore: 70,
  questions: [
    {
      id: 'SEE1-D01',
      question: 'A single taxpayer under age 65 must file a return if gross income exceeds which amount for 2024?',
      options: ['$13,850', '$14,600', '$15,700', '$12,950'],
      correctAnswer: 1,
      blueprintArea: 'Preliminary Work',
      topic: 'Filing Requirements',
      difficulty: 'easy',
      explanation: 'For 2024, single filers under 65 must file if gross income exceeds the standard deduction of $14,600.',
    },
    {
      id: 'SEE1-D02',
      question: 'Which filing status provides the LARGEST standard deduction?',
      options: ['Single', 'Married Filing Jointly', 'Head of Household', 'Married Filing Separately'],
      correctAnswer: 1,
      blueprintArea: 'Preliminary Work',
      topic: 'Filing Status',
      difficulty: 'easy',
      explanation: 'MFJ has the largest standard deduction at $29,200 for 2024.',
    },
    {
      id: 'SEE1-D03',
      question: 'Municipal bond interest is:',
      options: ['Taxable as ordinary income', 'Tax-exempt from federal income tax', 'Taxable as capital gains', 'Only taxable if over $1,000'],
      correctAnswer: 1,
      blueprintArea: 'Income and Assets',
      topic: 'Tax-Exempt Income',
      difficulty: 'easy',
      explanation: 'Municipal bond interest is generally exempt from federal income tax.',
    },
    {
      id: 'SEE1-D04',
      question: 'A taxpayer receives a $5,000 signing bonus from a new employer. This is:',
      options: ['Not taxable', 'Taxable as ordinary income', 'Capital gain income', 'Taxable only if above $3,000'],
      correctAnswer: 1,
      blueprintArea: 'Income and Assets',
      topic: 'Taxable Income',
      difficulty: 'easy',
      explanation: 'Signing bonuses are taxable as ordinary compensation income.',
    },
    {
      id: 'SEE1-D05',
      question: 'What is the self-employment tax rate for 2024?',
      options: ['12.4%', '15.3%', '6.2%', '7.65%'],
      correctAnswer: 1,
      blueprintArea: 'Income and Assets',
      topic: 'Self-Employment Tax',
      difficulty: 'medium',
      explanation: 'SE tax is 15.3% (12.4% Social Security + 2.9% Medicare) on 92.35% of net SE income.',
    },
    {
      id: 'SEE1-D06',
      question: 'The deduction for one-half of self-employment tax is taken:',
      options: ['As an itemized deduction', 'As an adjustment to income', 'As a tax credit', 'Against business income only'],
      correctAnswer: 1,
      blueprintArea: 'Deductions',
      topic: 'Adjustments to Income',
      difficulty: 'medium',
      explanation: 'One-half of SE tax is an above-the-line deduction (adjustment to income).',
    },
    {
      id: 'SEE1-D07',
      question: 'Which of the following is a refundable tax credit?',
      options: ['Child and Dependent Care Credit', 'Lifetime Learning Credit', 'Child Tax Credit (partially)', 'Foreign Tax Credit'],
      correctAnswer: 2,
      blueprintArea: 'Tax Credits',
      topic: 'Refundable Credits',
      difficulty: 'medium',
      explanation: 'The Child Tax Credit is partially refundable up to $1,700 (Additional Child Tax Credit).',
    },
    {
      id: 'SEE1-D08',
      question: 'The standard deduction for a taxpayer who can be claimed as a dependent is limited to the greater of $1,300 or:',
      options: ['$400 plus earned income', '$500 plus earned income', '$350 plus earned income', '$450 plus earned income'],
      correctAnswer: 3,
      blueprintArea: 'Deductions',
      topic: 'Standard Deduction',
      difficulty: 'hard',
      explanation: 'Dependents: greater of $1,300 or $450 + earned income (not to exceed regular standard deduction).',
    },
    {
      id: 'SEE1-D09',
      question: 'Long-term capital gains are assets held for:',
      options: ['Less than 12 months', 'More than 12 months', '12 months or less', 'At least 6 months'],
      correctAnswer: 1,
      blueprintArea: 'Income and Assets',
      topic: 'Capital Gains',
      difficulty: 'easy',
      explanation: 'Long-term capital gains require holding period of MORE than 12 months.',
    },
    {
      id: 'SEE1-D10',
      question: 'The maximum 0% capital gains rate applies to taxable income up to what amount for single filers in 2024?',
      options: ['$44,625', '$47,025', '$41,675', '$89,250'],
      correctAnswer: 1,
      blueprintArea: 'Income and Assets',
      topic: 'Capital Gains Rates',
      difficulty: 'medium',
      explanation: 'For 2024, the 0% rate applies to single filers with taxable income up to $47,025.',
    },
    {
      id: 'SEE1-D11',
      question: 'Net capital losses are deductible against ordinary income up to:',
      options: ['$1,500', '$2,000', '$3,000', 'Unlimited'],
      correctAnswer: 2,
      blueprintArea: 'Income and Assets',
      topic: 'Capital Losses',
      difficulty: 'easy',
      explanation: 'Net capital losses can offset up to $3,000 of ordinary income per year.',
    },
    {
      id: 'SEE1-D12',
      question: 'The SALT deduction is limited to:',
      options: ['$5,000', '$10,000', '$15,000', 'No limit'],
      correctAnswer: 1,
      blueprintArea: 'Deductions',
      topic: 'Itemized Deductions',
      difficulty: 'easy',
      explanation: 'State and local taxes (SALT) are limited to $10,000 ($5,000 MFS).',
    },
    {
      id: 'SEE1-D13',
      question: 'Qualified charitable contributions in cash to public charities are limited to what percentage of AGI?',
      options: ['20%', '30%', '50%', '60%'],
      correctAnswer: 3,
      blueprintArea: 'Deductions',
      topic: 'Charitable Contributions',
      difficulty: 'medium',
      explanation: 'Cash contributions to public charities are limited to 60% of AGI.',
    },
    {
      id: 'SEE1-D14',
      question: 'The maximum 2024 traditional IRA contribution for someone under 50 is:',
      options: ['$6,500', '$7,000', '$7,500', '$6,000'],
      correctAnswer: 1,
      blueprintArea: 'Deductions',
      topic: 'Retirement Contributions',
      difficulty: 'easy',
      explanation: 'IRA contribution limit is $7,000 for 2024 ($8,000 if age 50+).',
    },
    {
      id: 'SEE1-D15',
      question: 'The 10% early withdrawal penalty on retirement accounts does NOT apply to:',
      options: ['Withdrawals at age 55 from any IRA', 'Withdrawals for first-time home purchase (up to $10,000)', 'All withdrawals after age 59', 'Withdrawals for vacation expenses'],
      correctAnswer: 1,
      blueprintArea: 'Income and Assets',
      topic: 'Retirement Distributions',
      difficulty: 'medium',
      explanation: 'First-time homebuyer exception allows up to $10,000 penalty-free from IRA.',
    },
    {
      id: 'SEE1-D16',
      question: 'To claim Head of Household filing status, the taxpayer must:',
      options: ['Be married at year-end', 'Pay more than half the cost of maintaining a home for a qualifying person', 'Have income below $75,000', 'File jointly with a spouse'],
      correctAnswer: 1,
      blueprintArea: 'Preliminary Work',
      topic: 'Filing Status',
      difficulty: 'medium',
      explanation: 'HOH requires being unmarried, paying >50% of home costs, and having a qualifying person.',
    },
    {
      id: 'SEE1-D17',
      question: 'The Earned Income Tax Credit is available to taxpayers with earned income and investment income not exceeding:',
      options: ['$3,650', '$11,000', '$10,000', '$11,600'],
      correctAnswer: 3,
      blueprintArea: 'Tax Credits',
      topic: 'EITC',
      difficulty: 'hard',
      explanation: 'For 2024, investment income must not exceed $11,600 to qualify for EITC.',
    },
    {
      id: 'SEE1-D18',
      question: 'The American Opportunity Tax Credit provides a maximum credit of:',
      options: ['$2,000', '$2,500', '$4,000', '$1,500'],
      correctAnswer: 1,
      blueprintArea: 'Tax Credits',
      topic: 'Education Credits',
      difficulty: 'easy',
      explanation: 'AOTC provides up to $2,500 per student (40% refundable = $1,000 max refund).',
    },
    {
      id: 'SEE1-D19',
      question: 'Estimated tax payments must be made if the taxpayer expects to owe at least:',
      options: ['$500', '$1,000', '$1,500', '$2,000'],
      correctAnswer: 1,
      blueprintArea: 'Preliminary Work',
      topic: 'Estimated Taxes',
      difficulty: 'medium',
      explanation: 'Required if expecting to owe $1,000 or more after withholding and credits.',
    },
    {
      id: 'SEE1-D20',
      question: 'Interest on a home equity loan is deductible only if the loan proceeds are used for:',
      options: ['Any purpose', 'Buying, building, or substantially improving the home', 'Paying off credit cards', 'Education expenses'],
      correctAnswer: 1,
      blueprintArea: 'Deductions',
      topic: 'Mortgage Interest',
      difficulty: 'medium',
      explanation: 'Post-TCJA, home equity interest is only deductible if used to buy, build, or improve.',
    },
    {
      id: 'SEE1-D21',
      question: 'The basis of inherited property is generally:',
      options: ['The decedent\'s adjusted basis', 'Fair market value at date of death', 'Zero', 'Original cost to decedent'],
      correctAnswer: 1,
      blueprintArea: 'Income and Assets',
      topic: 'Basis',
      difficulty: 'easy',
      explanation: 'Inherited property receives a stepped-up basis to FMV at date of death.',
    },
    {
      id: 'SEE1-D22',
      question: 'A gift of stock to a family member. What basis does the recipient use if selling at a gain?',
      options: ['Fair market value at gift date', 'Donor\'s adjusted basis', 'Zero', 'Lower of cost or market'],
      correctAnswer: 1,
      blueprintArea: 'Income and Assets',
      topic: 'Gift Basis',
      difficulty: 'medium',
      explanation: 'For gains, donee uses donor\'s basis (carryover basis).',
    },
    {
      id: 'SEE1-D23',
      question: 'The Social Security wage base for 2024 is:',
      options: ['$160,200', '$168,600', '$147,000', '$176,100'],
      correctAnswer: 1,
      blueprintArea: 'Income and Assets',
      topic: 'FICA',
      difficulty: 'medium',
      explanation: 'The 2024 Social Security wage base is $168,600.',
    },
    {
      id: 'SEE1-D24',
      question: 'Required Minimum Distributions (RMDs) must begin by April 1 following the year the taxpayer reaches age:',
      options: ['70½', '72', '73', '75'],
      correctAnswer: 2,
      blueprintArea: 'Income and Assets',
      topic: 'RMDs',
      difficulty: 'medium',
      explanation: 'Under SECURE 2.0, RMDs begin at age 73 for those born 1951-1959.',
    },
    {
      id: 'SEE1-D25',
      question: 'The wash sale rule disallows losses if substantially identical securities are purchased within:',
      options: ['30 days before or after the sale', '60 days before or after the sale', '30 days after the sale only', '90 days after the sale'],
      correctAnswer: 0,
      blueprintArea: 'Income and Assets',
      topic: 'Wash Sales',
      difficulty: 'medium',
      explanation: 'Wash sale rule: 61-day window (30 days before and after the sale).',
    },
  ],
};

// ============================================
// SEE2 DIAGNOSTIC QUIZ
// ============================================
export const SEE2_DIAGNOSTIC: DiagnosticQuiz = {
  section: 'SEE2',
  title: 'Businesses Diagnostic Assessment',
  description: 'Assess your readiness for SEE Part 2: Businesses',
  timeLimit: 35,
  passingScore: 70,
  questions: [
    {
      id: 'SEE2-D01',
      question: 'Which business entity type provides pass-through taxation and limited liability?',
      options: ['Sole Proprietorship', 'C Corporation', 'S Corporation', 'General Partnership'],
      correctAnswer: 2,
      blueprintArea: 'Business Entities',
      topic: 'Entity Selection',
      difficulty: 'easy',
      explanation: 'S Corporations provide both pass-through taxation and limited liability protection.',
    },
    {
      id: 'SEE2-D02',
      question: 'The corporate tax rate for C corporations is:',
      options: ['15%', '21%', '28%', '35%'],
      correctAnswer: 1,
      blueprintArea: 'Business Entities',
      topic: 'C Corporation',
      difficulty: 'easy',
      explanation: 'C corporations are taxed at a flat 21% rate.',
    },
    {
      id: 'SEE2-D03',
      question: 'What form does a partnership file?',
      options: ['Form 1040', 'Form 1120', 'Form 1065', 'Form 1120-S'],
      correctAnswer: 2,
      blueprintArea: 'Business Entities',
      topic: 'Partnership Returns',
      difficulty: 'easy',
      explanation: 'Partnerships file Form 1065 and issue K-1s to partners.',
    },
    {
      id: 'SEE2-D04',
      question: 'The maximum number of shareholders allowed for S corporation status is:',
      options: ['35', '50', '75', '100'],
      correctAnswer: 3,
      blueprintArea: 'Business Entities',
      topic: 'S Corporation',
      difficulty: 'easy',
      explanation: 'S corporations are limited to 100 shareholders.',
    },
    {
      id: 'SEE2-D05',
      question: 'Section 179 expensing limit for 2024 is:',
      options: ['$1,000,000', '$1,160,000', '$1,220,000', '$500,000'],
      correctAnswer: 2,
      blueprintArea: 'Business Financial Info',
      topic: 'Section 179',
      difficulty: 'medium',
      explanation: 'The 2024 Section 179 limit is $1,220,000, phased out at $3,050,000.',
    },
    {
      id: 'SEE2-D06',
      question: 'The MACRS recovery period for office furniture is:',
      options: ['3 years', '5 years', '7 years', '10 years'],
      correctAnswer: 2,
      blueprintArea: 'Business Financial Info',
      topic: 'Depreciation',
      difficulty: 'medium',
      explanation: 'Office furniture is 7-year property under MACRS.',
    },
    {
      id: 'SEE2-D07',
      question: 'Bonus depreciation for 2024 is:',
      options: ['100%', '80%', '60%', '40%'],
      correctAnswer: 2,
      blueprintArea: 'Business Financial Info',
      topic: 'Bonus Depreciation',
      difficulty: 'easy',
      explanation: 'Bonus depreciation phases down to 60% for 2024.',
    },
    {
      id: 'SEE2-D08',
      question: 'The dividends received deduction for a corporation owning less than 20% of another corporation is:',
      options: ['50%', '65%', '80%', '100%'],
      correctAnswer: 0,
      blueprintArea: 'Business Entities',
      topic: 'DRD',
      difficulty: 'medium',
      explanation: 'DRD is 50% for less than 20% ownership, 65% for 20-80%, 100% for 80%+.',
    },
    {
      id: 'SEE2-D09',
      question: 'A partner\'s initial basis in partnership interest equals:',
      options: ['FMV of contributed property', 'Cash + adjusted basis of contributed property', 'Zero', 'FMV of partnership interest received'],
      correctAnswer: 1,
      blueprintArea: 'Business Entities',
      topic: 'Partnership Basis',
      difficulty: 'medium',
      explanation: 'Initial basis = cash + adjusted basis of contributed property + share of liabilities.',
    },
    {
      id: 'SEE2-D10',
      question: 'Which items are separately stated on a partnership K-1?',
      options: ['Only ordinary business income', 'Charitable contributions and capital gains', 'Only losses', 'Only wages'],
      correctAnswer: 1,
      blueprintArea: 'Business Entities',
      topic: 'K-1 Reporting',
      difficulty: 'medium',
      explanation: 'Items with special character (charitable, capital, Section 1231) are separately stated.',
    },
    {
      id: 'SEE2-D11',
      question: 'S corporation shareholders may deduct losses only to the extent of:',
      options: ['Stock basis only', 'Stock basis plus direct loan basis', 'Partnership share', 'AAA balance'],
      correctAnswer: 1,
      blueprintArea: 'Business Entities',
      topic: 'S Corp Basis',
      difficulty: 'medium',
      explanation: 'S corp losses limited to stock basis + direct shareholder loans (not bank loans).',
    },
    {
      id: 'SEE2-D12',
      question: 'The FUTA tax wage base is:',
      options: ['$7,000', '$10,000', '$15,000', '$168,600'],
      correctAnswer: 0,
      blueprintArea: 'Business Entities',
      topic: 'FUTA',
      difficulty: 'easy',
      explanation: 'FUTA applies to first $7,000 of wages per employee.',
    },
    {
      id: 'SEE2-D13',
      question: 'Net FUTA tax rate after credit reduction is typically:',
      options: ['0.6%', '5.4%', '6.0%', '7.65%'],
      correctAnswer: 0,
      blueprintArea: 'Business Entities',
      topic: 'FUTA',
      difficulty: 'medium',
      explanation: 'FUTA: 6.0% gross - 5.4% credit = 0.6% net rate.',
    },
    {
      id: 'SEE2-D14',
      question: 'An employer must deposit payroll taxes the next business day if accumulated taxes exceed:',
      options: ['$50,000', '$100,000', '$200,000', '$500,000'],
      correctAnswer: 1,
      blueprintArea: 'Business Entities',
      topic: 'Payroll Deposits',
      difficulty: 'medium',
      explanation: 'Next-day deposit required when undeposited taxes reach $100,000.',
    },
    {
      id: 'SEE2-D15',
      question: 'Computer equipment is depreciated over:',
      options: ['3 years', '5 years', '7 years', '10 years'],
      correctAnswer: 1,
      blueprintArea: 'Business Financial Info',
      topic: 'MACRS',
      difficulty: 'easy',
      explanation: 'Computers and related equipment are 5-year property.',
    },
    {
      id: 'SEE2-D16',
      question: 'The half-year convention applies when personal property is placed in service:',
      options: ['Only in the first half of the year', 'Throughout the year (default)', 'Only in the last quarter', 'When purchased used only'],
      correctAnswer: 1,
      blueprintArea: 'Business Financial Info',
      topic: 'Depreciation Conventions',
      difficulty: 'medium',
      explanation: 'Half-year is the default convention for personal property under MACRS.',
    },
    {
      id: 'SEE2-D17',
      question: 'Accumulated Adjustments Account (AAA) tracks:',
      options: ['C corporation earnings', 'S corporation post-1982 undistributed income', 'Partnership capital accounts', 'Basis in subsidiary stock'],
      correctAnswer: 1,
      blueprintArea: 'Business Entities',
      topic: 'S Corporation',
      difficulty: 'hard',
      explanation: 'AAA tracks S corp undistributed income accumulated after 1982.',
    },
    {
      id: 'SEE2-D18',
      question: 'Which expense is NOT deductible for business purposes?',
      options: ['Employee wages', 'Rent expense', 'Federal income tax', 'Advertising expense'],
      correctAnswer: 2,
      blueprintArea: 'Business Financial Info',
      topic: 'Business Deductions',
      difficulty: 'easy',
      explanation: 'Federal income tax is not a deductible business expense.',
    },
    {
      id: 'SEE2-D19',
      question: 'Form 941 is filed:',
      options: ['Annually', 'Quarterly', 'Monthly', 'Weekly'],
      correctAnswer: 1,
      blueprintArea: 'Business Entities',
      topic: 'Payroll Forms',
      difficulty: 'easy',
      explanation: 'Form 941 (Employer\'s Quarterly Federal Tax Return) is filed quarterly.',
    },
    {
      id: 'SEE2-D20',
      question: 'A new business must elect S corporation status within how many days of formation?',
      options: ['30 days', '75 days', '2 months and 15 days of tax year', '1 year'],
      correctAnswer: 2,
      blueprintArea: 'Business Entities',
      topic: 'S Election',
      difficulty: 'hard',
      explanation: 'S election must be filed by 2 months and 15 days into the tax year.',
    },
    {
      id: 'SEE2-D21',
      question: 'Mid-quarter convention is required when more than what percentage of property is placed in service in Q4?',
      options: ['25%', '40%', '50%', '60%'],
      correctAnswer: 1,
      blueprintArea: 'Business Financial Info',
      topic: 'Depreciation',
      difficulty: 'hard',
      explanation: 'Mid-quarter convention applies when >40% of property placed in service in Q4.',
    },
    {
      id: 'SEE2-D22',
      question: 'Section 1231 gains are treated as:',
      options: ['Ordinary income', 'Capital gains (subject to recapture)', 'Always short-term', 'Always tax-exempt'],
      correctAnswer: 1,
      blueprintArea: 'Business Financial Info',
      topic: 'Asset Sales',
      difficulty: 'medium',
      explanation: 'Net 1231 gains are long-term capital gains; net losses are ordinary.',
    },
    {
      id: 'SEE2-D23',
      question: 'The lookback period for determining monthly vs. semiweekly payroll deposit schedule is:',
      options: ['Prior calendar year', '4-quarter lookback period', '12-month period ending June 30 of prior year', '6 months'],
      correctAnswer: 2,
      blueprintArea: 'Business Entities',
      topic: 'Payroll Deposits',
      difficulty: 'hard',
      explanation: 'Lookback period: 12 months ending June 30 of prior year.',
    },
    {
      id: 'SEE2-D24',
      question: 'Which entity can have both common and preferred stock?',
      options: ['Partnership', 'S Corporation', 'C Corporation', 'Sole Proprietorship'],
      correctAnswer: 2,
      blueprintArea: 'Business Entities',
      topic: 'Entity Characteristics',
      difficulty: 'medium',
      explanation: 'Only C corporations can have multiple stock classes; S corps are limited to one.',
    },
    {
      id: 'SEE2-D25',
      question: 'Reasonable compensation paid to an S corporation shareholder-employee is subject to:',
      options: ['SE tax', 'FICA tax only', 'No employment tax', 'FUTA only'],
      correctAnswer: 1,
      blueprintArea: 'Business Entities',
      topic: 'S Corp Compensation',
      difficulty: 'medium',
      explanation: 'S corp wages subject to FICA; distributions are not (unlike SE income).',
    },
  ],
};

// ============================================
// SEE3 DIAGNOSTIC QUIZ
// ============================================
export const SEE3_DIAGNOSTIC: DiagnosticQuiz = {
  section: 'SEE3',
  title: 'Representation Diagnostic Assessment',
  description: 'Assess your readiness for SEE Part 3: Representation, Practices and Procedures',
  timeLimit: 35,
  passingScore: 70,
  questions: [
    {
      id: 'SEE3-D01',
      question: 'Which practitioners have unlimited representation rights before the IRS?',
      options: ['Annual Filing Season Program participants', 'Attorneys, CPAs, and Enrolled Agents', 'All tax return preparers', 'Only attorneys'],
      correctAnswer: 1,
      blueprintArea: 'Practices and Procedures',
      topic: 'Practice Rights',
      difficulty: 'easy',
      explanation: 'ACE (Attorneys, CPAs, Enrolled Agents) have unlimited practice rights.',
    },
    {
      id: 'SEE3-D02',
      question: 'Form 2848 is used to:',
      options: ['Request tax transcripts', 'Grant power of attorney', 'File an innocent spouse claim', 'Request penalty abatement'],
      correctAnswer: 1,
      blueprintArea: 'Practices and Procedures',
      topic: 'POA',
      difficulty: 'easy',
      explanation: 'Form 2848 is Power of Attorney and Declaration of Representative.',
    },
    {
      id: 'SEE3-D03',
      question: 'Form 8821 allows a designee to:',
      options: ['Represent the taxpayer before IRS', 'Receive and inspect tax information only', 'Sign returns on behalf of taxpayer', 'Negotiate settlements'],
      correctAnswer: 1,
      blueprintArea: 'Practices and Procedures',
      topic: 'TIA',
      difficulty: 'easy',
      explanation: 'Form 8821 (Tax Information Authorization) allows receiving information only, not representation.',
    },
    {
      id: 'SEE3-D04',
      question: 'Under Circular 230, a practitioner must generally:',
      options: ['Guarantee refund amounts', 'Exercise due diligence in preparing returns', 'Accept all clients who can pay', 'Charge the lowest fees in the area'],
      correctAnswer: 1,
      blueprintArea: 'Ethics',
      topic: 'Circular 230 Duties',
      difficulty: 'easy',
      explanation: 'Due diligence is a core requirement under Circular 230.',
    },
    {
      id: 'SEE3-D05',
      question: 'Which is prohibited under Circular 230?',
      options: ['Charging flat fees', 'Charging hourly fees', 'Charging contingent fees for original returns', 'Charging retainer fees'],
      correctAnswer: 2,
      blueprintArea: 'Ethics',
      topic: 'Prohibited Conduct',
      difficulty: 'medium',
      explanation: 'Contingent fees are prohibited for original tax returns (allowed for refund claims, IRS exam).',
    },
    {
      id: 'SEE3-D06',
      question: 'The statute of limitations for IRS assessment is generally:',
      options: ['2 years', '3 years', '5 years', '10 years'],
      correctAnswer: 1,
      blueprintArea: 'Practices and Procedures',
      topic: 'Statute of Limitations',
      difficulty: 'easy',
      explanation: 'Standard assessment period is 3 years from later of due date or filing date.',
    },
    {
      id: 'SEE3-D07',
      question: 'If more than 25% of gross income is omitted, the assessment period is:',
      options: ['3 years', '6 years', '10 years', 'Unlimited'],
      correctAnswer: 1,
      blueprintArea: 'Practices and Procedures',
      topic: 'Statute of Limitations',
      difficulty: 'medium',
      explanation: 'Substantial omission (>25% of gross income) extends assessment to 6 years.',
    },
    {
      id: 'SEE3-D08',
      question: 'The failure-to-file penalty rate is:',
      options: ['0.5% per month', '5% per month', '10% per month', '1% per month'],
      correctAnswer: 1,
      blueprintArea: 'Practices and Procedures',
      topic: 'Penalties',
      difficulty: 'easy',
      explanation: 'Failure to file: 5% per month or partial month, up to 25% maximum.',
    },
    {
      id: 'SEE3-D09',
      question: 'The failure-to-pay penalty rate is:',
      options: ['0.5% per month', '5% per month', '10% per month', '1% per month'],
      correctAnswer: 0,
      blueprintArea: 'Practices and Procedures',
      topic: 'Penalties',
      difficulty: 'easy',
      explanation: 'Failure to pay: 0.5% per month, up to 25% maximum.',
    },
    {
      id: 'SEE3-D10',
      question: 'The accuracy-related penalty is:',
      options: ['10% of underpayment', '20% of underpayment', '50% of underpayment', '75% of underpayment'],
      correctAnswer: 1,
      blueprintArea: 'Practices and Procedures',
      topic: 'Penalties',
      difficulty: 'easy',
      explanation: 'Accuracy-related penalty (negligence, substantial understatement) is 20%.',
    },
    {
      id: 'SEE3-D11',
      question: 'The civil fraud penalty is:',
      options: ['25%', '50%', '75%', '100%'],
      correctAnswer: 2,
      blueprintArea: 'Practices and Procedures',
      topic: 'Penalties',
      difficulty: 'medium',
      explanation: 'Civil fraud penalty is 75% of the underpayment due to fraud.',
    },
    {
      id: 'SEE3-D12',
      question: 'Office of Professional Responsibility (OPR) handles:',
      options: ['Tax Court litigation', 'Disciplinary matters involving practitioners', 'Collection of unpaid taxes', 'Criminal investigations'],
      correctAnswer: 1,
      blueprintArea: 'Ethics',
      topic: 'OPR',
      difficulty: 'medium',
      explanation: 'OPR administers disciplinary proceedings under Circular 230.',
    },
    {
      id: 'SEE3-D13',
      question: 'A taxpayer must file a Tax Court petition within how many days of a notice of deficiency?',
      options: ['30 days', '60 days', '90 days', '120 days'],
      correctAnswer: 2,
      blueprintArea: 'Practices and Procedures',
      topic: 'Appeals',
      difficulty: 'medium',
      explanation: '90 days to file Tax Court petition (150 days if outside US).',
    },
    {
      id: 'SEE3-D14',
      question: 'Collection Due Process (CDP) hearing request must be filed within:',
      options: ['15 days', '30 days', '60 days', '90 days'],
      correctAnswer: 1,
      blueprintArea: 'Practices and Procedures',
      topic: 'Collection',
      difficulty: 'medium',
      explanation: 'CDP request must be filed within 30 days of final notice.',
    },
    {
      id: 'SEE3-D15',
      question: 'The IRS collection statute expires:',
      options: ['3 years from assessment', '6 years from assessment', '10 years from assessment', 'Never'],
      correctAnswer: 2,
      blueprintArea: 'Practices and Procedures',
      topic: 'Collection',
      difficulty: 'medium',
      explanation: 'Collection Statute Expiration Date (CSED) is 10 years from assessment.',
    },
    {
      id: 'SEE3-D16',
      question: 'Form 9465 is used to request:',
      options: ['Offer in Compromise', 'Installment Agreement', 'Penalty Abatement', 'Innocent Spouse Relief'],
      correctAnswer: 1,
      blueprintArea: 'Practices and Procedures',
      topic: 'Collection Alternatives',
      difficulty: 'easy',
      explanation: 'Form 9465 is Installment Agreement Request.',
    },
    {
      id: 'SEE3-D17',
      question: 'Offer in Compromise (OIC) is submitted on which form?',
      options: ['Form 433-A', 'Form 656', 'Form 9465', 'Form 843'],
      correctAnswer: 1,
      blueprintArea: 'Practices and Procedures',
      topic: 'OIC',
      difficulty: 'easy',
      explanation: 'Form 656 is the Offer in Compromise application.',
    },
    {
      id: 'SEE3-D18',
      question: 'The Trust Fund Recovery Penalty equals:',
      options: ['25% of trust fund taxes', '50% of trust fund taxes', '75% of trust fund taxes', '100% of trust fund taxes'],
      correctAnswer: 3,
      blueprintArea: 'Practices and Procedures',
      topic: 'Penalties',
      difficulty: 'medium',
      explanation: 'TFRP is 100% of unpaid withholding taxes owed.',
    },
    {
      id: 'SEE3-D19',
      question: 'Which Circular 230 sanction is most severe?',
      options: ['Private reprimand', 'Public censure', 'Suspension', 'Disbarment'],
      correctAnswer: 3,
      blueprintArea: 'Ethics',
      topic: 'Sanctions',
      difficulty: 'easy',
      explanation: 'Disbarment is the most severe sanction, permanently removing practice rights.',
    },
    {
      id: 'SEE3-D20',
      question: 'A practitioner discovers an error on a prior year return. Under Circular 230, the practitioner must:',
      options: ['File an amended return immediately', 'Notify the client promptly', 'Report the client to the IRS', 'Do nothing unless asked'],
      correctAnswer: 1,
      blueprintArea: 'Ethics',
      topic: 'Practitioner Duties',
      difficulty: 'medium',
      explanation: 'Must notify client promptly of error; client decides whether to correct.',
    },
    {
      id: 'SEE3-D21',
      question: 'The small case procedure in Tax Court applies to disputes of:',
      options: ['$25,000 or less', '$50,000 or less', '$75,000 or less', '$100,000 or less'],
      correctAnswer: 1,
      blueprintArea: 'Practices and Procedures',
      topic: 'Tax Court',
      difficulty: 'medium',
      explanation: 'Small case procedures: disputes up to $50,000 per year; decision is final.',
    },
    {
      id: 'SEE3-D22',
      question: 'Penalty for preparer failure to sign a return is:',
      options: ['$50 per return', '$60 per return', '$100 per return', '$500 per return'],
      correctAnswer: 1,
      blueprintArea: 'Practices and Procedures',
      topic: 'Preparer Penalties',
      difficulty: 'medium',
      explanation: 'Section 6695(b) penalty is $60 per return for failure to sign.',
    },
    {
      id: 'SEE3-D23',
      question: 'Due diligence penalty for EITC/CTC/AOTC/HOH per return is:',
      options: ['$545', '$635', '$695', '$560'],
      correctAnswer: 1,
      blueprintArea: 'Practices and Procedures',
      topic: 'Preparer Penalties',
      difficulty: 'hard',
      explanation: 'Section 6695(g) due diligence penalty is $635 per credit/status for 2024.',
    },
    {
      id: 'SEE3-D24',
      question: 'Streamlined installment agreements for individuals cover balances up to:',
      options: ['$10,000', '$25,000', '$50,000', '$100,000'],
      correctAnswer: 2,
      blueprintArea: 'Practices and Procedures',
      topic: 'Collection',
      difficulty: 'medium',
      explanation: 'Streamlined IA for individuals: up to $50,000 with up to 72 months.',
    },
    {
      id: 'SEE3-D25',
      question: 'Enrolled Agent status is granted by:',
      options: ['State boards of accountancy', 'The Treasury Department', 'The AICPA', 'Tax Court'],
      correctAnswer: 1,
      blueprintArea: 'Practices and Procedures',
      topic: 'EA Status',
      difficulty: 'easy',
      explanation: 'EAs are licensed by the Treasury Department (via IRS) to practice nationally.',
    },
  ],
};

// ============================================
// Scoring Function
// ============================================
export function scoreDiagnosticQuiz(
  quiz: DiagnosticQuiz,
  answers: number[]
): DiagnosticResult {
  const areaScores: Record<string, { correct: number; total: number }> = {};
  let correct = 0;

  quiz.questions.forEach((q, i) => {
    const isCorrect = answers[i] === q.correctAnswer;
    if (isCorrect) correct++;

    if (!areaScores[q.blueprintArea]) {
      areaScores[q.blueprintArea] = { correct: 0, total: 0 };
    }
    areaScores[q.blueprintArea].total++;
    if (isCorrect) areaScores[q.blueprintArea].correct++;
  });

  const percentage = Math.round((correct / quiz.questions.length) * 100);
  const passed = percentage >= quiz.passingScore;

  // Identify weak areas (below 70% in that area)
  const weakAreas = Object.entries(areaScores)
    .filter(([_, scores]) => (scores.correct / scores.total) < 0.7)
    .map(([area, scores]) => ({
      area,
      score: scores.correct,
      total: scores.total,
    }));

  // Generate recommendations
  const recommendations: string[] = [];
  if (!passed) {
    recommendations.push('Focus on fundamentals before attempting practice exams.');
  }
  weakAreas.forEach(wa => {
    recommendations.push(`Review ${wa.area}: scored ${wa.score}/${wa.total} (${Math.round((wa.score/wa.total)*100)}%)`);
  });
  if (passed && weakAreas.length === 0) {
    recommendations.push('Strong foundation! Proceed to mock exams and timed practice.');
  }

  return {
    section: quiz.section,
    score: correct,
    totalQuestions: quiz.questions.length,
    percentage,
    passed,
    weakAreas,
    recommendations,
  };
}

// Export all diagnostics
export const EA_DIAGNOSTIC_QUIZZES = {
  SEE1: SEE1_DIAGNOSTIC,
  SEE2: SEE2_DIAGNOSTIC,
  SEE3: SEE3_DIAGNOSTIC,
};

/**
 * EA SEE Part 2: Businesses - Questions Batch 52 (Q571-600)
 * Mixed Blueprint Areas for comprehensive coverage
 * 
 * Tax Year: 2024-2025
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH52: Question[] = [
  // SEE2-1: Business Taxation
  {
    id: 'see2-571',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-1',
    topic: 'Entity Selection',
    subtopic: 'C Corp vs S Corp',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Which of the following is an advantage of S corporation status over C corporation status?',
    options: [
      'Unlimited number of shareholders',
      'Ability to have multiple classes of stock',
      'Avoidance of double taxation',
      'Shareholders can be nonresident aliens'
    ],
    correctAnswer: 2,
    explanation: 'S corporations pass income through to shareholders, avoiding the double taxation of C corps (corporate tax + dividend tax). However, S corps are limited to 100 shareholders, one class of stock, and only U.S. citizens/residents.',
    reference: 'IRC §1361'
  },
  {
    id: 'see2-572',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-1',
    topic: 'Partnership Taxation',
    subtopic: 'Guaranteed Payments',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Guaranteed payments to a partner for services are:',
    options: [
      'Deductible by the partnership and ordinary income to the partner',
      'Not deductible by the partnership',
      'Deductible by the partnership and capital gain to the partner',
      'Subject to self-employment tax only'
    ],
    correctAnswer: 0,
    explanation: 'Guaranteed payments are deductible by the partnership in computing ordinary income and are ordinary income to the receiving partner. They are also subject to self-employment tax as they are compensation for services.',
    reference: 'IRC §707(c)'
  },
  {
    id: 'see2-573',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-1',
    topic: 'Corporate Taxation',
    subtopic: 'Corporate Tax Rate',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'The corporate income tax rate under current law (TCJA) is:',
    options: [
      '15%',
      '21%',
      '28%',
      '35%'
    ],
    correctAnswer: 1,
    explanation: 'TCJA established a flat 21% corporate tax rate effective 2018, replacing the graduated rates that went up to 35%. This rate applies to all C corporation taxable income.',
    reference: 'IRC §11'
  },
  {
    id: 'see2-574',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-1',
    topic: 'S Corporation',
    subtopic: 'Built-In Gains Tax',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The built-in gains tax applies to an S corporation that:',
    options: [
      'Was always an S corporation',
      'Converted from C corp and sells appreciated assets within 5 years',
      'Has passive investment income',
      'Makes distributions exceeding AAA'
    ],
    correctAnswer: 1,
    explanation: 'The built-in gains (BIG) tax applies when a C corp converts to S corp and sells assets with built-in gain within the recognition period (5 years). The tax is imposed at the corporate level at 21%.',
    reference: 'IRC §1374'
  },
  {
    id: 'see2-575',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-1',
    topic: 'Partnership',
    subtopic: 'Partner Basis',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Which of the following increases a partner\'s basis in a partnership interest?',
    options: [
      'Partnership distributions of cash',
      'Share of partnership liabilities assumed',
      'Partnership losses allocated to the partner',
      'Tax-exempt expenses of the partnership'
    ],
    correctAnswer: 1,
    explanation: 'Partner basis is increased by contributions, share of income (including tax-exempt income), and share of partnership liabilities. Distributions, losses, and nondeductible expenses decrease basis.',
    reference: 'IRC §752'
  },
  // SEE2-2: Business Tax Preparation
  {
    id: 'see2-576',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Inventory Methods',
    subtopic: 'LIFO Conformity',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'A business using LIFO for tax purposes must:',
    options: [
      'Also use LIFO for financial reporting',
      'File Form 970 annually',
      'Maintain separate inventory for tax and book',
      'Use only specific identification for sales'
    ],
    correctAnswer: 0,
    explanation: 'The LIFO conformity rule requires businesses using LIFO for tax purposes to also use LIFO for financial reporting (with limited exceptions). Form 970 is only filed in the year of LIFO election.',
    reference: 'IRC §472(c)'
  },
  {
    id: 'see2-577',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Accounting Methods',
    subtopic: 'Cash vs Accrual',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Under the simplified small business exemption, which businesses can use the cash method?',
    options: [
      'All businesses regardless of size',
      'Businesses with average annual gross receipts of $30 million or less',
      'Businesses with average annual gross receipts of $25 million or less',
      'Only sole proprietorships'
    ],
    correctAnswer: 1,
    explanation: 'The TCJA raised the gross receipts threshold to $25M (indexed to ~$30M for 2024). Businesses meeting this test can use cash method, simplified inventory, and are exempt from UNICAP and percentage of completion.',
    reference: 'IRC §448(c)'
  },
  {
    id: 'see2-578',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Business Expenses',
    subtopic: 'Meals and Entertainment',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'For 2024, business meals with clients are deductible at:',
    options: [
      '100%',
      '50%',
      '75%',
      '0%'
    ],
    correctAnswer: 1,
    explanation: 'Business meals are 50% deductible (the temporary 100% deduction for restaurant meals expired after 2022). Entertainment expenses remain 0% deductible under TCJA. Food at entertainment events is 50% if stated separately.',
    reference: 'IRC §274'
  },
  {
    id: 'see2-579',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Business Expenses',
    subtopic: 'Start-Up Costs',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A business can deduct up to how much in start-up costs in the year the business begins?',
    options: [
      '$5,000',
      '$10,000',
      '$15,000',
      '$25,000'
    ],
    correctAnswer: 0,
    explanation: 'Up to $5,000 of start-up costs (and separately up to $5,000 of organizational costs) can be deducted in the first year. The $5,000 is reduced by costs exceeding $50,000. Remaining costs are amortized over 180 months.',
    reference: 'IRC §195'
  },
  {
    id: 'see2-580',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Cost Recovery',
    subtopic: 'MACRS Classes',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'Office furniture and equipment is depreciated over:',
    options: [
      '3 years',
      '5 years',
      '7 years',
      '15 years'
    ],
    correctAnswer: 2,
    explanation: 'Office furniture and fixtures are 7-year property under MACRS. Computers and certain manufacturing equipment are 5-year property. Land improvements (fencing, parking lots) are 15-year property.',
    reference: 'IRC §168'
  },
  {
    id: 'see2-581',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Employment Taxes',
    subtopic: 'FUTA',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The FUTA tax rate is 6.0% on the first $7,000 of wages per employee. After the FUTA credit for state unemployment taxes, the effective rate is typically:',
    options: [
      '0.6%',
      '2.1%',
      '3.4%',
      '5.4%'
    ],
    correctAnswer: 0,
    explanation: 'Employers receive a credit of up to 5.4% for state unemployment taxes paid timely, reducing the effective FUTA rate to 0.6%. Credit reduction applies in states that have outstanding Title XII loans.',
    reference: 'IRC §3301'
  },
  {
    id: 'see2-582',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Business Credits',
    subtopic: 'Work Opportunity Tax Credit',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The Work Opportunity Tax Credit provides a credit for hiring individuals from targeted groups equal to:',
    options: [
      '25% of first-year wages up to $6,000',
      '40% of first-year wages up to $6,000 if worked 400+ hours',
      '50% of first-year wages with no limit',
      '100% of first-year wages up to $2,400'
    ],
    correctAnswer: 1,
    explanation: 'WOTC is 40% of up to $6,000 wages ($2,400 max) for most groups if the employee works 400+ hours. If 120-399 hours, credit is 25%. Higher limits apply for certain veterans and long-term TANF recipients.',
    reference: 'IRC §51'
  },
  {
    id: 'see2-583',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Retirement Plans',
    subtopic: 'SEP-IRA Contributions',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The maximum employer contribution to a SEP-IRA for 2024 is:',
    options: [
      '$6,500',
      '$23,000',
      '$66,000',
      '$69,000'
    ],
    correctAnswer: 3,
    explanation: 'For 2024, SEP contributions are limited to the lesser of 25% of compensation or $69,000. For self-employed individuals, the calculation is effectively about 20% of net self-employment income.',
    reference: 'IRC §408(k)'
  },
  {
    id: 'see2-584',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Estimated Taxes',
    subtopic: 'Corporate Estimates',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A corporation must make estimated tax payments if expected tax is:',
    options: [
      '$500 or more',
      '$1,000 or more',
      '$5,000 or more',
      '$10,000 or more'
    ],
    correctAnswer: 0,
    explanation: 'Corporations must make estimated payments if tax liability is expected to be $500 or more. Large corporations (over $1M taxable income in any of prior 3 years) cannot use prior year safe harbor after first quarter.',
    reference: 'IRC §6655'
  },
  {
    id: 'see2-585',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Net Operating Loss',
    subtopic: 'Business NOL Rules',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Under current law, NOLs arising after 2020 can be carried:',
    options: [
      'Back 2 years, forward 20 years',
      'Back 5 years, forward indefinitely',
      'Forward indefinitely, limited to 80% of taxable income',
      'Forward 20 years with no carryback'
    ],
    correctAnswer: 2,
    explanation: 'NOLs from tax years after 2020 cannot be carried back (except farming/insurance) and can only offset 80% of taxable income when carried forward. Carryforwards are now indefinite (no 20-year limit).',
    reference: 'IRC §172'
  },
  // SEE2-3: Specialized Business Returns
  {
    id: 'see2-586',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'LLC Taxation',
    subtopic: 'Default Classification',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'A single-member LLC that has not elected corporate treatment is taxed as:',
    options: [
      'A C corporation',
      'An S corporation',
      'A disregarded entity (Schedule C or E)',
      'A partnership'
    ],
    correctAnswer: 2,
    explanation: 'A single-member LLC is a disregarded entity by default and reports on the owner\'s return (Schedule C for business or Schedule E for rental). Form 8832 can elect corporate treatment.',
    reference: 'Reg. §301.7701-3'
  },
  {
    id: 'see2-587',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'S Corporation',
    subtopic: 'Shareholder Basis',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Which item does NOT increase an S corporation shareholder\'s stock basis?',
    options: [
      'Separately stated income items',
      'Nonseparately stated income',
      'Tax-exempt income',
      'Corporate liabilities'
    ],
    correctAnswer: 3,
    explanation: 'Unlike partnerships, S corp shareholders do not get basis for corporate liabilities. Stock basis is increased by income (taxable and tax-exempt) and decreased by distributions, losses, and nondeductible expenses.',
    reference: 'IRC §1367'
  },
  {
    id: 'see2-588',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Partnership',
    subtopic: 'Section 754 Election',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A Section 754 election allows:',
    options: [
      'Allocation of losses in excess of basis',
      'Adjustment to inside basis upon sale or death of partner',
      'Deduction of organizational costs',
      'Use of the cash method regardless of size'
    ],
    correctAnswer: 1,
    explanation: 'Section 754 allows optional adjustment to the inside basis of partnership assets when a partner sells their interest (§743(b)) or when property is distributed (§734(b)). This aligns inside and outside basis.',
    reference: 'IRC §754'
  },
  {
    id: 'see2-589',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Corporate Formation',
    subtopic: 'Section 351 Transfers',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'For a tax-free incorporation under Section 351, the transferors must:',
    options: [
      'Transfer property worth at least $1 million',
      'Own at least 80% of stock immediately after the exchange',
      'Be U.S. citizens or residents',
      'Use the accrual method of accounting'
    ],
    correctAnswer: 1,
    explanation: 'Section 351 requires control (80% of voting and all other stock) immediately after the exchange. Property includes cash, equipment, inventory, etc. Services rendered for stock are taxable.',
    reference: 'IRC §351'
  },
  {
    id: 'see2-590',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Corporate Liquidation',
    subtopic: 'Shareholder Consequences',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When a C corporation completely liquidates, shareholders:',
    options: [
      'Receive tax-free distributions up to basis',
      'Recognize gain or loss equal to FMV received minus stock basis',
      'Always pay ordinary income rates on amounts received',
      'Can defer recognition using like-kind exchange'
    ],
    correctAnswer: 1,
    explanation: 'Shareholders treat liquidating distributions as payment in exchange for stock. Gain/loss = FMV received - stock basis, generally capital gain/loss. The corporation also recognizes gain/loss on distributed appreciated property.',
    reference: 'IRC §331'
  },
  {
    id: 'see2-591',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Farm Taxation',
    subtopic: 'Farm Income Averaging',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Farm income averaging under Schedule J allows farmers to:',
    options: [
      'Defer all farm income to the following year',
      'Elect to spread current year farm income over 3 prior years',
      'Exclude up to $100,000 of farm income',
      'Claim an additional deduction equal to 20% of farm income'
    ],
    correctAnswer: 1,
    explanation: 'Schedule J allows farmers to allocate current farm income to the 3 prior years to potentially reduce tax using lower marginal rates from those years. This smoothes income fluctuations common in farming.',
    reference: 'IRC §1301'
  },
  {
    id: 'see2-592',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Exempt Organizations',
    subtopic: 'Form 990 Requirements',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'Which organizations must file Form 990, not 990-EZ or 990-N?',
    options: [
      'Gross receipts less than $50,000',
      'Gross receipts between $50,000 and $200,000',
      'Gross receipts over $200,000 or total assets over $500,000',
      'All Section 501(c)(3) organizations regardless of size'
    ],
    correctAnswer: 2,
    explanation: 'Form 990 is required if gross receipts ≥ $200,000 OR total assets ≥ $500,000. Form 990-EZ for receipts < $200,000 AND assets < $500,000 but receipts ≥ $50,000. Form 990-N (e-Postcard) for receipts < $50,000.',
    reference: 'Form 990 Instructions'
  },
  {
    id: 'see2-593',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Real Estate',
    subtopic: 'Like-Kind Exchanges',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Under current law, Section 1031 like-kind exchanges are available for:',
    options: [
      'Any business or investment property',
      'Real property held for business or investment only',
      'Personal property and real property',
      'Inventory and equipment'
    ],
    correctAnswer: 1,
    explanation: 'TCJA limited Section 1031 to real property only (effective 2018). Personal property exchanges are now fully taxable. The real property must be held for productive use in a trade/business or for investment.',
    reference: 'IRC §1031'
  },
  {
    id: 'see2-594',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'REIT',
    subtopic: 'Distribution Requirements',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'A REIT must distribute at least what percentage of taxable income to shareholders?',
    options: [
      '50%',
      '75%',
      '90%',
      '100%'
    ],
    correctAnswer: 2,
    explanation: 'REITs must distribute at least 90% of taxable income to shareholders to maintain REIT status and avoid entity-level tax. Distributions are generally taxable to shareholders as ordinary income (not qualified dividends).',
    reference: 'IRC §857'
  },
  {
    id: 'see2-595',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Passive Activities',
    subtopic: 'Material Participation',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'To meet the material participation test through regular and continuous participation, a taxpayer must participate in the activity for at least:',
    options: [
      '100 hours',
      '250 hours',
      '500 hours',
      '750 hours'
    ],
    correctAnswer: 2,
    explanation: 'One way to meet material participation is participating for more than 500 hours during the year. Other tests exist (100 hours if not less than others, substantially all participation, 5 of 10 prior years, etc.).',
    reference: 'Reg. §1.469-5T'
  },
  {
    id: 'see2-596',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-1',
    topic: 'Qualified Business Income',
    subtopic: 'Specified Service Trade',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Which of the following is considered a specified service trade or business (SSTB) that phases out of the QBI deduction at higher incomes?',
    options: [
      'Architecture',
      'Engineering',
      'Consulting',
      'Manufacturing'
    ],
    correctAnswer: 2,
    explanation: 'SSTBs include health, law, accounting, actuarial, consulting, financial services, brokerage, and performing arts. Architecture and engineering are specifically excluded. Manufacturing is not an SSTB.',
    reference: 'IRC §199A(d)'
  },
  {
    id: 'see2-597',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-1',
    topic: 'Accumulated Earnings',
    subtopic: 'Accumulated Earnings Tax',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The accumulated earnings tax rate under current law is:',
    options: [
      '15%',
      '20%',
      '21%',
      '37%'
    ],
    correctAnswer: 1,
    explanation: 'The accumulated earnings tax is 20% (the highest dividend rate) imposed on corporations that accumulate earnings beyond reasonable business needs to avoid dividends. The first $250,000 ($150,000 for PSCs) is exempt.',
    reference: 'IRC §531'
  },
  {
    id: 'see2-598',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Information Returns',
    subtopic: 'Form 1099-NEC',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'Form 1099-NEC is used to report:',
    options: [
      'Interest income',
      'Dividend income',
      'Nonemployee compensation',
      'Royalty payments'
    ],
    correctAnswer: 2,
    explanation: 'Form 1099-NEC reports nonemployee compensation of $600 or more paid to independent contractors. It replaced Box 7 of Form 1099-MISC starting in 2020. Due date is January 31.',
    reference: 'Form 1099-NEC Instructions'
  },
  {
    id: 'see2-599',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Payroll',
    subtopic: 'Form 941 Due Dates',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'Form 941 (quarterly employment tax return) is due:',
    options: [
      'The 15th day of the month following each quarter',
      'The last day of the month following each quarter',
      '30 days after each quarter ends',
      'Annually with the income tax return'
    ],
    correctAnswer: 1,
    explanation: 'Form 941 is due by the last day of the month following the quarter (April 30, July 31, October 31, January 31). The due date is extended 10 days if all deposits were made timely.',
    reference: 'Form 941 Instructions'
  },
  {
    id: 'see2-600',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'International',
    subtopic: 'GILTI',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'GILTI (Global Intangible Low-Taxed Income) is calculated as CFC income exceeding:',
    options: [
      '5% of tangible depreciable assets',
      '10% of qualified business asset investment',
      '15% of total CFC assets',
      '20% of CFC gross income'
    ],
    correctAnswer: 1,
    explanation: 'GILTI equals CFC tested income minus 10% of QBAI (qualified business asset investment, essentially depreciable tangible property). The excess is currently included by U.S. shareholders with a 50% deduction (37.5% after 2025).',
    reference: 'IRC §951A'
  }
];

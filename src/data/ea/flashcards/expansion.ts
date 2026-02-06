import { EAFlashcard } from './types';

export const EXPANSION_FLASHCARDS: EAFlashcard[] = [
  // ==========================
  // SEE1: Individuals (34 cards)
  // ==========================
  {
    id: 'SEE1-EXP-001',
    section: 'SEE1',
    type: 'definition',
    topic: 'Filing Status',
    front: 'Single Filing Status Requirements',
    back: 'Use if on the last day of the year you are unmarried or legally separated (by divorce or separate maintenance decree) and do not qualify for another filing status.',
    difficulty: 'easy',
    blueprintArea: 'SEE1-1'
  },
  {
    id: 'SEE1-EXP-002',
    section: 'SEE1',
    type: 'rule',
    topic: 'Filing Status',
    front: 'Married Filing Jointly (MFJ) Requirements',
    back: 'Married couples can file a joint return. If a spouse dies during the year, the surviving spouse can file MFJ for that year unless they remarry before year-end.',
    difficulty: 'easy',
    blueprintArea: 'SEE1-1'
  },
  {
    id: 'SEE1-EXP-003',
    section: 'SEE1',
    type: 'rule',
    topic: 'Filing Status',
    front: 'Married Filing Separately (MFS) Disadvantages',
    back: 'Generally higher tax rates; cannot take credits like EITC, Child and Dependent Care (in most cases), Education credits; standard deduction must be same for both (if one details, both must)',
    difficulty: 'medium',
    blueprintArea: 'SEE1-1'
  },
  {
    id: 'SEE1-EXP-004',
    section: 'SEE1',
    type: 'definition',
    topic: 'Filing Status',
    front: 'Head of Household (HOH) Requirements',
    back: '1. Unmarried or "considered unmarried" on last day of year\n2. Paid >50% cost of keeping up a home\n3. Qualifying person lived with you >50% of year (exception for dependent parents who don\'t need to live with you)',
    difficulty: 'medium',
    blueprintArea: 'SEE1-1'
  },
  {
    id: 'SEE1-EXP-005',
    section: 'SEE1',
    type: 'rule',
    topic: 'Filing Status',
    front: 'Qualifying Surviving Spouse (QSS) Requirements',
    back: 'Can file as QSS for 2 years following spouse\'s death if:\n1. Entitled to file MFJ in year of death\n2. Did not remarry\n3. Have a dependent child/stepchild living with you\n4. Paid >50% cost of home',
    difficulty: 'medium',
    blueprintArea: 'SEE1-1'
  },
  {
    id: 'SEE1-EXP-006',
    section: 'SEE1',
    type: 'threshold',
    topic: 'Standard Deduction',
    front: 'Standard Deduction - Single (2024)',
    back: '$14,600',
    difficulty: 'easy',
    blueprintArea: 'SEE1-2'
  },
  {
    id: 'SEE1-EXP-007',
    section: 'SEE1',
    type: 'threshold',
    topic: 'Standard Deduction',
    front: 'Standard Deduction - MFJ (2024)',
    back: '$29,200',
    difficulty: 'easy',
    blueprintArea: 'SEE1-2'
  },
  {
    id: 'SEE1-EXP-008',
    section: 'SEE1',
    type: 'threshold',
    topic: 'Standard Deduction',
    front: 'Standard Deduction - HOH (2024)',
    back: '$21,900',
    difficulty: 'easy',
    blueprintArea: 'SEE1-2'
  },
  {
    id: 'SEE1-EXP-009',
    section: 'SEE1',
    type: 'threshold',
    topic: 'Standard Deduction',
    front: 'Additional Standard Deduction (65+ or Blind)',
    back: 'Unmarried: +$1,950\nMarried: +$1,550 per qualifying person',
    difficulty: 'easy',
    blueprintArea: 'SEE1-2'
  },
  {
    id: 'SEE1-EXP-010',
    section: 'SEE1',
    type: 'rule',
    topic: 'Tax Credits',
    front: 'Child Tax Credit (CTC) Amount (2024)',
    back: '$2,000 per qualifying child under age 17',
    difficulty: 'easy',
    blueprintArea: 'SEE1-4'
  },
  {
    id: 'SEE1-EXP-011',
    section: 'SEE1',
    type: 'threshold',
    topic: 'Tax Credits',
    front: 'CTC Refundable Portion (ACTC) Limit (2024)',
    back: 'Up to $1,700 per child is refundable',
    difficulty: 'medium',
    blueprintArea: 'SEE1-4'
  },
  {
    id: 'SEE1-EXP-012',
    section: 'SEE1',
    type: 'rule',
    topic: 'Tax Credits',
    front: 'Other Dependent Credit (ODC)',
    back: '$500 non-refundable credit for dependents who don\'t qualify for CTC (e.g., child 17+, parents)',
    difficulty: 'easy',
    blueprintArea: 'SEE1-4'
  },
  {
    id: 'SEE1-EXP-013',
    section: 'SEE1',
    type: 'rule',
    topic: 'Tax Credits',
    front: 'Earned Income Tax Credit (EITC) Eligibility Basic Rules',
    back: '1. Valid SSN for self and dependents\n2. US Citizen or Resident Alien\n3. Not filing MFS (exceptions apply)\n4. Investment income < $11,600 (2024)\n5. Earned income',
    difficulty: 'medium',
    blueprintArea: 'SEE1-4'
  },
  {
    id: 'SEE1-EXP-014',
    section: 'SEE1',
    type: 'rule',
    topic: 'Tax Credits',
    front: 'EITC Disqualified Income',
    back: 'Investment income over threshold ($11,600 for 2024) disqualifies you. Includes interest, dividends, cap gains, royalties, rental income.',
    difficulty: 'medium',
    blueprintArea: 'SEE1-4'
  },
  {
    id: 'SEE1-EXP-015',
    section: 'SEE1',
    type: 'rule',
    topic: 'Tax Credits',
    front: 'American Opportunity Tax Credit (AOTC) Scope',
    back: 'First 4 years of post-secondary education. 100% of first $2,000 + 25% of next $2,000. Max $2,500.',
    difficulty: 'medium',
    blueprintArea: 'SEE1-4'
  },
  {
    id: 'SEE1-EXP-016',
    section: 'SEE1',
    type: 'rule',
    topic: 'Tax Credits',
    front: 'Lifetime Learning Credit (LLC) Scope',
    back: 'Any post-secondary or skill-improvement courses. 20% of first $10,000 expenses. Max $2,000 per return (not per student).',
    difficulty: 'medium',
    blueprintArea: 'SEE1-4'
  },
  {
    id: 'SEE1-EXP-017',
    section: 'SEE1',
    type: 'comparison',
    topic: 'Tax Credits',
    front: 'AOTC vs LLC: Refundability',
    back: 'AOTC: Up to 40% ($1,000) refundable.\nLLC: Non-refundable.',
    difficulty: 'medium',
    blueprintArea: 'SEE1-4'
  },
  {
    id: 'SEE1-EXP-018',
    section: 'SEE1',
    type: 'rule',
    topic: 'Capital Gains',
    front: 'Short-Term Capital Gains Rate',
    back: 'Taxed as ordinary income (marginal tax brackets)',
    difficulty: 'easy',
    blueprintArea: 'SEE1-3'
  },
  {
    id: 'SEE1-EXP-019',
    section: 'SEE1',
    type: 'rule',
    topic: 'Capital Gains',
    front: 'Long-Term Capital Gains Rates',
    back: '0%, 15%, or 20% depending on taxable income',
    difficulty: 'easy',
    blueprintArea: 'SEE1-3'
  },
  {
    id: 'SEE1-EXP-020',
    section: 'SEE1',
    type: 'rule',
    topic: 'Capital Gains',
    front: 'Net Investment Income Tax (NIIT)',
    back: '3.8% additional tax on lesser of NII or MAGI excess over threshold ($200k Single, $250k MFJ)',
    difficulty: 'hard',
    blueprintArea: 'SEE1-3'
  },
  {
    id: 'SEE1-EXP-021',
    section: 'SEE1',
    type: 'rule',
    topic: 'Capital Gains',
    front: 'Capital Loss Limits',
    back: 'Can offset capital gains. Excess loss deduction limited to $3,000 ($1,500 MFS) against ordinary income. Unused carries forward indefinitely.',
    difficulty: 'medium',
    blueprintArea: 'SEE1-3'
  },
  {
    id: 'SEE1-EXP-022',
    section: 'SEE1',
    type: 'rule',
    topic: 'Home Sale Exclusion',
    front: 'Section 121 Exclusion Amount',
    back: '$250,000 (Single) / $500,000 (MFJ) of gain excluded from income',
    difficulty: 'easy',
    blueprintArea: 'SEE1-3'
  },
  {
    id: 'SEE1-EXP-023',
    section: 'SEE1',
    type: 'rule',
    topic: 'Home Sale Exclusion',
    front: 'Section 121 Eligibility Test',
    back: 'Ownership and Use: Owned and lived in home as main home for at least 2 of last 5 years.',
    difficulty: 'medium',
    blueprintArea: 'SEE1-3'
  },
  {
    id: 'SEE1-EXP-024',
    section: 'SEE1',
    type: 'rule',
    topic: 'Dependent',
    front: 'Qualifying Child Tests',
    back: 'Relationship, Age, Residence (>50%), Support (child didn\'t provide >50%), Joint Return (none)',
    difficulty: 'medium',
    blueprintArea: 'SEE1-1'
  },
  {
    id: 'SEE1-EXP-025',
    section: 'SEE1',
    type: 'rule',
    topic: 'Dependent',
    front: 'Qualifying Relative Tests',
    back: 'Not a Qualifying Child, Member of Household OR Relationship, Gross Income (<$5,050 for 2024), Support (taxpayer provided >50%)',
    difficulty: 'medium',
    blueprintArea: 'SEE1-1'
  },
  {
    id: 'SEE1-EXP-026',
    section: 'SEE1',
    type: 'rule',
    topic: 'Income',
    front: 'Constructive Receipt',
    back: 'Income is taxed when it is made available to you without substantial restriction, even if you don\'t take possession.',
    difficulty: 'medium',
    blueprintArea: 'SEE1-2'
  },
  {
    id: 'SEE1-EXP-027',
    section: 'SEE1',
    type: 'rule',
    topic: 'Retirement',
    front: 'RMD Age (SECURE 2.0)',
    back: 'Age 73 (starting 2023)',
    difficulty: 'easy',
    blueprintArea: 'SEE1-2'
  },
  {
    id: 'SEE1-EXP-028',
    section: 'SEE1',
    type: 'rule',
    topic: 'Retirement',
    front: 'Early Withdrawal Penalty Exceptions',
    back: 'Death, Disability, Medical expenses (>7.5% AGI), 72(t) payments, Higher Education, First-time homebuyer ($10k)',
    difficulty: 'medium',
    blueprintArea: 'SEE1-2'
  },
  {
    id: 'SEE1-EXP-029',
    section: 'SEE1',
    type: 'rule',
    topic: 'Retirement',
    front: 'Roth IRA Contribution Limit (2024)',
    back: '$7,000 ($8,000 if 50+)',
    difficulty: 'easy',
    blueprintArea: 'SEE1-2'
  },
  {
    id: 'SEE1-EXP-030',
    section: 'SEE1',
    type: 'rule',
    topic: 'Itemized Deductions',
    front: 'State and Local Tax (SALT) Limit',
    back: 'Capped at $10,000 ($5,000 MFS) total for property and income (or sales) taxes.',
    difficulty: 'medium',
    blueprintArea: 'SEE1-2'
  },
  {
    id: 'SEE1-EXP-031',
    section: 'SEE1',
    type: 'rule',
    topic: 'Itemized Deductions',
    front: 'Medical Expense Threshold',
    back: 'Deductible only to the extent they exceed 7.5% of AGI.',
    difficulty: 'medium',
    blueprintArea: 'SEE1-2'
  },
  {
    id: 'SEE1-EXP-032',
    section: 'SEE1',
    type: 'rule',
    topic: 'Itemized Deductions',
    front: 'Charitable Contribution Limit (Cash)',
    back: 'Generally 60% of AGI.',
    difficulty: 'hard',
    blueprintArea: 'SEE1-2'
  },
  {
    id: 'SEE1-EXP-033',
    section: 'SEE1',
    type: 'rule',
    topic: 'Estimated Taxes',
    front: 'Safe Harbor Rules for Underpayment Penalty',
    back: 'No penalty if you pay: 90% of current year tax OR 100% of prior year tax (110% if AGI > $150k)',
    difficulty: 'medium',
    blueprintArea: 'SEE1-2'
  },
  {
    id: 'SEE1-EXP-034',
    section: 'SEE1',
    type: 'rule',
    topic: 'Kiddie Tax',
    front: 'Kiddie Tax Applicability',
    back: 'Applies to children under 18 (or student under 24) with unearned income > $2,600 (2024). Taxed at parent\'s rate.',
    difficulty: 'hard',
    blueprintArea: 'SEE1-2'
  },

  // ==========================
  // SEE2: Businesses (33 cards)
  // ==========================
  {
    id: 'SEE2-EXP-001',
    section: 'SEE2',
    type: 'rule',
    topic: 'Partnership',
    front: 'Partnership Basis Calculation',
    back: 'Initial Basis + Contributions + Income Share + Increase in Liab Share - Distributions - Loss Share - Decrease in Liab Share',
    difficulty: 'hard',
    blueprintArea: 'SEE2-1'
  },
  {
    id: 'SEE2-EXP-002',
    section: 'SEE2',
    type: 'rule',
    topic: 'Partnership',
    front: 'Outside Basis vs Inside Basis',
    back: 'Outside: Partner\'s basis in their partnership interest.\nInside: Partnership\'s basis in its assets.',
    difficulty: 'medium',
    blueprintArea: 'SEE2-1'
  },
  {
    id: 'SEE2-EXP-003',
    section: 'SEE2',
    type: 'rule',
    topic: 'Partnership',
    front: 'Form 1065 Due Date',
    back: 'March 15th (for calendar year partnerships). Extension: 6 months (Sept 15).',
    difficulty: 'easy',
    blueprintArea: 'SEE2-1'
  },
  {
    id: 'SEE2-EXP-004',
    section: 'SEE2',
    type: 'rule',
    topic: 'Partnership',
    front: 'Guaranteed Payments',
    back: 'Payments to partners for services or capital use, made regardless of partnership income. Ordinary income to partner, deductible by partnership.',
    difficulty: 'medium',
    blueprintArea: 'SEE2-1'
  },
  {
    id: 'SEE2-EXP-005',
    section: 'SEE2',
    type: 'rule',
    topic: 'S-Corp',
    front: 'S-Corp Eligibility: Shareholder Limit',
    back: 'Max 100 shareholders (Family members can count as 1).',
    difficulty: 'medium',
    blueprintArea: 'SEE2-2'
  },
  {
    id: 'SEE2-EXP-006',
    section: 'SEE2',
    type: 'rule',
    topic: 'S-Corp',
    front: 'S-Corp Eligibility: Shareholder Type',
    back: 'US Citizens, Residents, certain Trusts/Estates. NO Partnerships, C-Corps, or Non-resident Aliens.',
    difficulty: 'medium',
    blueprintArea: 'SEE2-2'
  },
  {
    id: 'SEE2-EXP-007',
    section: 'SEE2',
    type: 'rule',
    topic: 'S-Corp',
    front: 'S-Corp Eligibility: Stock Class',
    back: 'Only one class of stock allowed (differences in voting rights permitted).',
    difficulty: 'medium',
    blueprintArea: 'SEE2-2'
  },
  {
    id: 'SEE2-EXP-008',
    section: 'SEE2',
    type: 'rule',
    topic: 'S-Corp',
    front: 'Form 2553 Deadline',
    back: 'Must file by March 15th (15th day of 3rd month) to be effective for current year.',
    difficulty: 'medium',
    blueprintArea: 'SEE2-2'
  },
  {
    id: 'SEE2-EXP-009',
    section: 'SEE2',
    type: 'rule',
    topic: 'S-Corp',
    front: 'S-Corp Shareholder Basis Order',
    back: '1. Increase for income\n2. Decrease for distributions\n3. Decrease for non-deductible expenses\n4. Decrease for deductible losses/expenses',
    difficulty: 'hard',
    blueprintArea: 'SEE2-2'
  },
  {
    id: 'SEE2-EXP-010',
    section: 'SEE2',
    type: 'rule',
    topic: 'S-Corp',
    front: 'Reasonable Compensation',
    back: 'S-Corps must pay shareholder-employees a "reasonable salary" (subject to FICA) before non-wage distributions.',
    difficulty: 'medium',
    blueprintArea: 'SEE2-2'
  },
  {
    id: 'SEE2-EXP-011',
    section: 'SEE2',
    type: 'rule',
    topic: 'C-Corp',
    front: 'Form 1120 Due Date',
    back: 'April 15th (for calendar year corps). June 30 FYE exception: due Sept 15.',
    difficulty: 'easy',
    blueprintArea: 'SEE2-3'
  },
  {
    id: 'SEE2-EXP-012',
    section: 'SEE2',
    type: 'rule',
    topic: 'C-Corp',
    front: 'Capital Contributions',
    back: 'Generally tax-free to corporation (Section 118) and shareholder (Section 351) if control requirement (80%) met immediately after.',
    difficulty: 'hard',
    blueprintArea: 'SEE2-3'
  },
  {
    id: 'SEE2-EXP-013',
    section: 'SEE2',
    type: 'rule',
    topic: 'C-Corp',
    front: 'Net Operating Loss (NOL) - Post-2017',
    back: 'NOLs can only offset 80% of taxable income. Carryforward indefinite, no carryback (except farming).',
    difficulty: 'medium',
    blueprintArea: 'SEE2-3'
  },
  {
    id: 'SEE2-EXP-014',
    section: 'SEE2',
    type: 'rule',
    topic: 'Depreciation',
    front: 'MACRS Life - 3 Years',
    back: 'Tractor units, racehorses > 2yo, specialized handling devices',
    difficulty: 'medium',
    blueprintArea: 'SEE2-4'
  },
  {
    id: 'SEE2-EXP-015',
    section: 'SEE2',
    type: 'rule',
    topic: 'Depreciation',
    front: 'MACRS Life - 5 Years',
    back: 'Autos, taxis, computers, office machinery, appliances (residential rental)',
    difficulty: 'medium',
    blueprintArea: 'SEE2-4'
  },
  {
    id: 'SEE2-EXP-016',
    section: 'SEE2',
    type: 'rule',
    topic: 'Depreciation',
    front: 'MACRS Life - 7 Years',
    back: 'Office furniture/fixtures, agricultural machinery, equipment not otherwise classified',
    difficulty: 'easy',
    blueprintArea: 'SEE2-4'
  },
  {
    id: 'SEE2-EXP-017',
    section: 'SEE2',
    type: 'rule',
    topic: 'Depreciation',
    front: 'MACRS Life - 27.5 Years',
    back: 'Residential Rental Property',
    difficulty: 'easy',
    blueprintArea: 'SEE2-4'
  },
  {
    id: 'SEE2-EXP-018',
    section: 'SEE2',
    type: 'rule',
    topic: 'Depreciation',
    front: 'MACRS Life - 39 Years',
    back: 'Non-residential Real Property',
    difficulty: 'easy',
    blueprintArea: 'SEE2-4'
  },
  {
    id: 'SEE2-EXP-019',
    section: 'SEE2',
    type: 'rule',
    topic: 'Depreciation',
    front: 'Bonus Depreciation (2024)',
    back: '60% deduction allowed for qualified property (down from 80% in 2023).',
    difficulty: 'medium',
    blueprintArea: 'SEE2-4'
  },
  {
    id: 'SEE2-EXP-020',
    section: 'SEE2',
    type: 'rule',
    topic: 'Depreciation',
    front: 'Section 179 Limit (2024)',
    back: 'Max deduction approx $1.22M, phaseout starts at $3.05M investment.',
    difficulty: 'medium',
    blueprintArea: 'SEE2-4'
  },
  {
    id: 'SEE2-EXP-021',
    section: 'SEE2',
    type: 'rule',
    topic: 'Depreciation',
    front: 'Section 179 Restrictions',
    back: 'Limited to taxable income from trade/business (cannot create loss); tangible personal property only (generally).',
    difficulty: 'medium',
    blueprintArea: 'SEE2-4'
  },
  {
    id: 'SEE2-EXP-022',
    section: 'SEE2',
    type: 'rule',
    topic: 'Depreciation',
    front: 'Mid-Quarter Convention',
    back: 'Required if >40% of tangible personal property placed in service during Q4.',
    difficulty: 'hard',
    blueprintArea: 'SEE2-4'
  },
  {
    id: 'SEE2-EXP-023',
    section: 'SEE2',
    type: 'rule',
    topic: 'Business Expenses',
    front: 'Business Meals Deduction',
    back: '50% deductible (was 100% temporary for 2021-2022 restaurants). Entertainment is 0% deductible.',
    difficulty: 'medium',
    blueprintArea: 'SEE2-4'
  },
  {
    id: 'SEE2-EXP-024',
    section: 'SEE2',
    type: 'rule',
    topic: 'Business Expenses',
    front: 'Start-up Costs Deduction',
    back: 'Deduct up to $5,000 immediately (reduced if total >$50k), amortize remainder over 180 months.',
    difficulty: 'medium',
    blueprintArea: 'SEE2-4'
  },
  {
    id: 'SEE2-EXP-025',
    section: 'SEE2',
    type: 'rule',
    topic: 'Inventory',
    front: 'UNICAP (Section 263A)',
    back: 'Small business exception: Avg annual gross receipts <= $30M (inflation adj) last 3 years exempt from UNICAP.',
    difficulty: 'hard',
    blueprintArea: 'SEE2-4'
  },
  {
    id: 'SEE2-EXP-026',
    section: 'SEE2',
    type: 'rule',
    topic: 'Employment Taxes',
    front: 'Form 941 Due Dates',
    back: 'Last day of month following quarter end (Apr 30, Jul 31, Oct 31, Jan 31).',
    difficulty: 'easy',
    blueprintArea: 'SEE2-4'
  },
  {
    id: 'SEE2-EXP-027',
    section: 'SEE2',
    type: 'rule',
    topic: 'Employment Taxes',
    front: 'FUTA Rate and Wage Base',
    back: '6.0% on first $7,000 wages. (Max credit of 5.4% usually results in 0.6% effective rate).',
    difficulty: 'medium',
    blueprintArea: 'SEE2-4'
  },
  {
    id: 'SEE2-EXP-028',
    section: 'SEE2',
    type: 'rule',
    topic: 'Retirement Plans',
    front: 'SEP IRA Deadline',
    back: 'Due date of return + extensions.',
    difficulty: 'medium',
    blueprintArea: 'SEE2-4'
  },
  {
    id: 'SEE2-EXP-029',
    section: 'SEE2',
    type: 'rule',
    topic: 'Retirement Plans',
    front: 'SIMPLE IRA Employee Contribution',
    back: 'Employees can contribute up to $16,000 (2024).',
    difficulty: 'medium',
    blueprintArea: 'SEE2-4'
  },
  {
    id: 'SEE2-EXP-030',
    section: 'SEE2',
    type: 'rule',
    topic: 'Estate & Trust',
    front: 'Form 1041 Filing Requirement',
    back: 'Required if gross income >= $600 or any non-resident alien beneficiary.',
    difficulty: 'medium',
    blueprintArea: 'SEE2-5'
  },
  {
    id: 'SEE2-EXP-031',
    section: 'SEE2',
    type: 'rule',
    topic: 'Estate & Trust',
    front: 'Simple Trust Characteristics',
    back: '1. Distributes all income currently\n2. Makes no charitable contributions\n3. Does not distribute corpus',
    difficulty: 'medium',
    blueprintArea: 'SEE2-5'
  },
  {
    id: 'SEE2-EXP-032',
    section: 'SEE2',
    type: 'rule',
    topic: 'Estate & Trust',
    front: 'Estate Tax Filing Threshold (2024)',
    back: '$13.61 Million gross estate',
    difficulty: 'easy',
    blueprintArea: 'SEE2-5'
  },
  {
    id: 'SEE2-EXP-033',
    section: 'SEE2',
    type: 'rule',
    topic: 'Gift Tax',
    front: 'Annual Gift Exclusion (2024)',
    back: '$18,000 per donee',
    difficulty: 'easy',
    blueprintArea: 'SEE2-5'
  },

  // ==========================
  // SEE3: Representation (33 cards)
  // ==========================
  {
    id: 'SEE3-EXP-001',
    section: 'SEE3',
    type: 'penalty',
    topic: 'Penalties',
    front: 'Section 6694: Understatement due to Unreasonable Position',
    back: 'Greater of $1,000 or 50% of income derived by preparer for the return.',
    difficulty: 'medium',
    blueprintArea: 'SEE3-1'
  },
  {
    id: 'SEE3-EXP-002',
    section: 'SEE3',
    type: 'penalty',
    topic: 'Penalties',
    front: 'Section 6694: Willful or Reckless Conduct',
    back: 'Greater of $5,000 or 75% of income derived by preparer.',
    difficulty: 'medium',
    blueprintArea: 'SEE3-1'
  },
  {
    id: 'SEE3-EXP-003',
    section: 'SEE3',
    type: 'penalty',
    topic: 'Penalties',
    front: 'Section 6695: Failure to Furnish Copy to Taxpayer',
    back: '$60 per failure (max $30,000/year for 2024)',
    difficulty: 'medium',
    blueprintArea: 'SEE3-1'
  },
  {
    id: 'SEE3-EXP-004',
    section: 'SEE3',
    type: 'penalty',
    topic: 'Penalties',
    front: 'Section 6695: Failure to Sign Return',
    back: '$60 per failure (max $30,000/year for 2024)',
    difficulty: 'medium',
    blueprintArea: 'SEE3-1'
  },
  {
    id: 'SEE3-EXP-005',
    section: 'SEE3',
    type: 'penalty',
    topic: 'Penalties',
    front: 'Section 6713: Disclosure/Use of Information',
    back: '$250 per disclosure (max $10,000/year). Criminal penalty also possible (misdemeanor).',
    difficulty: 'hard',
    blueprintArea: 'SEE3-1'
  },
  {
    id: 'SEE3-EXP-006',
    section: 'SEE3',
    type: 'rule',
    topic: 'Due Diligence',
    front: 'Referencing EITC Due Diligence Form',
    back: 'Form 8867. Must be filed with return if claiming EITC, CTC, AOTC, or HOH.',
    difficulty: 'medium',
    blueprintArea: 'SEE3-1'
  },
  {
    id: 'SEE3-EXP-007',
    section: 'SEE3',
    type: 'rule',
    topic: 'Due Diligence',
    front: 'Record Retention for EITC Due Diligence',
    back: 'Must keep records for 3 years from due date (or filing date) of return.',
    difficulty: 'medium',
    blueprintArea: 'SEE3-1'
  },
  {
    id: 'SEE3-EXP-008',
    section: 'SEE3',
    type: 'comparison',
    topic: 'Power of Attorney',
    front: 'POA (Form 2848) vs TIA (Form 8821)',
    back: 'POA: Representation + Access info. TIA: Information access ONLY (no representation).',
    difficulty: 'easy',
    blueprintArea: 'SEE3-2'
  },
  {
    id: 'SEE3-EXP-009',
    section: 'SEE3',
    type: 'rule',
    topic: 'Power of Attorney',
    front: 'Duration of POA',
    back: 'Remains in effect until revoked by taxpayer, withdrawn by rep, or expires (if date set). Death of taxpayer revokes POA.',
    difficulty: 'medium',
    blueprintArea: 'SEE3-2'
  },
  {
    id: 'SEE3-EXP-010',
    section: 'SEE3',
    type: 'rule',
    topic: 'Practice',
    front: 'Conflict of Interest Retention',
    back: 'Must keep written consent waiving conflict for 36 months.',
    difficulty: 'medium',
    blueprintArea: 'SEE3-1'
  },
  {
    id: 'SEE3-EXP-011',
    section: 'SEE3',
    type: 'rule',
    topic: 'Practice',
    front: 'Contingent Fees Rule',
    back: 'Generally prohibited for origination of tax return. Content allowed for: Amending return challenging IRS exam, Claim for refund (penalty/interest), Judicial proceeding.',
    difficulty: 'hard',
    blueprintArea: 'SEE3-1'
  },
  {
    id: 'SEE3-EXP-012',
    section: 'SEE3',
    type: 'rule',
    topic: 'Practice',
    front: 'Return of Client Records',
    back: 'Must return client records needed to comply with tax obligations even if fee unpaid. Can only withhold prepared return (if state law allows).',
    difficulty: 'medium',
    blueprintArea: 'SEE3-1'
  },
  {
    id: 'SEE3-EXP-013',
    section: 'SEE3',
    type: 'rule',
    topic: 'Practice',
    front: 'Solicitation/Advertising Record Retention',
    back: 'Must retain copies of ad/communication for 36 months.',
    difficulty: 'medium',
    blueprintArea: 'SEE3-1'
  },
  {
    id: 'SEE3-EXP-014',
    section: 'SEE3',
    type: 'rule',
    topic: 'E-filing',
    front: 'Specified Tax Return Preparer',
    back: 'Preparer who prepares 11+ covered returns (individuals, trusts, estates) in calendar year must e-file.',
    difficulty: 'medium',
    blueprintArea: 'SEE3-1'
  },
  {
    id: 'SEE3-EXP-015',
    section: 'SEE3',
    type: 'rule',
    topic: 'Representation',
    front: 'Centralized Authorization File (CAF) No.',
    back: 'Unique number assigned to identify representatives (agents, attorneys, CPAs, etc.). Not same as PTIN.',
    difficulty: 'easy',
    blueprintArea: 'SEE3-2'
  },
  {
    id: 'SEE3-EXP-016',
    section: 'SEE3',
    type: 'rule',
    topic: 'Appeals',
    front: '30-Day Letter',
    back: 'Proposed adjustments report. Taxpayer has 30 days to agree or file protest (appeal).',
    difficulty: 'medium',
    blueprintArea: 'SEE3-3'
  },
  {
    id: 'SEE3-EXP-017',
    section: 'SEE3',
    type: 'rule',
    topic: 'Appeals',
    front: '90-Day Letter (Statutory Notice of Deficiency)',
    back: 'Issued if 30-day letter ignored/unresolved. Must file Tax Court petition within 90 days (150 if outside US). No extension.',
    difficulty: 'medium',
    blueprintArea: 'SEE3-3'
  },
  {
    id: 'SEE3-EXP-018',
    section: 'SEE3',
    type: 'rule',
    topic: 'Appeals',
    front: 'Small Case Request (Appeals)',
    back: 'Total amount < $25,000 per period. Formal written protest not required, just simple request.',
    difficulty: 'medium',
    blueprintArea: 'SEE3-3'
  },
  {
    id: 'SEE3-EXP-019',
    section: 'SEE3',
    type: 'rule',
    topic: 'Courts',
    front: 'US Tax Court',
    back: 'Only court where tax does NOT need to be paid first. No jury.',
    difficulty: 'easy',
    blueprintArea: 'SEE3-3'
  },
  {
    id: 'SEE3-EXP-020',
    section: 'SEE3',
    type: 'rule',
    topic: 'Courts',
    front: 'US District Court / Court of Federal Claims',
    back: 'Must pay tax first and sue for refund. District court is only one with Jury Trial.',
    difficulty: 'medium',
    blueprintArea: 'SEE3-3'
  },
  {
    id: 'SEE3-EXP-021',
    section: 'SEE3',
    type: 'rule',
    topic: 'Collections',
    front: 'Collection Statute Expiration Date (CSED)',
    back: 'IRS generally has 10 years to collect assessed tax.',
    difficulty: 'medium',
    blueprintArea: 'SEE3-3'
  },
  {
    id: 'SEE3-EXP-022',
    section: 'SEE3',
    type: 'rule',
    topic: 'Collections',
    front: 'Guaranteed Installment Agreement',
    back: 'Owe < $10k, filed last 5 years returns, pay in full in 3 years. IRS must accept.',
    difficulty: 'medium',
    blueprintArea: 'SEE3-3'
  },
  {
    id: 'SEE3-EXP-023',
    section: 'SEE3',
    type: 'rule',
    topic: 'Collections',
    front: 'Streamlined Installment Agreement',
    back: 'Owe < $50k (total balance), pay in full 72 months (6 years). Financial statement not required.',
    difficulty: 'medium',
    blueprintArea: 'SEE3-3'
  },
  {
    id: 'SEE3-EXP-024',
    section: 'SEE3',
    type: 'rule',
    topic: 'Collections',
    front: 'Offer in Compromise (OIC) Grounds',
    back: '1. Doubt as to Liability\n2. Doubt as to Collectibility\n3. Effective Tax Administration (Hardship)',
    difficulty: 'medium',
    blueprintArea: 'SEE3-3'
  },
  {
    id: 'SEE3-EXP-025',
    section: 'SEE3',
    type: 'rule',
    topic: 'Collections',
    front: 'Currently Not Collectible (CNC)',
    back: 'Status where IRS pauses collection because taxpayer cannot pay living expenses. Debt remains, interest accrues.',
    difficulty: 'medium',
    blueprintArea: 'SEE3-3'
  },
  {
    id: 'SEE3-EXP-026',
    section: 'SEE3',
    type: 'rule',
    topic: 'Collections',
    front: 'Trust Fund Recovery Penalty (TFRP)',
    back: '100% penalty on responsible persons for willful failure to collect/pay trust fund taxes (payroll w/h). Cannot be discharged in bankruptcy.',
    difficulty: 'hard',
    blueprintArea: 'SEE3-3'
  },
  {
    id: 'SEE3-EXP-027',
    section: 'SEE3',
    type: 'rule',
    topic: 'Collection Appeal',
    front: 'CAP (Collection Appeals Program)',
    back: 'Quick appeal for specific actions (Lien, Levy, Seizure, Termination of IA). Decision is final (no court appeal).',
    difficulty: 'hard',
    blueprintArea: 'SEE3-3'
  },
  {
    id: 'SEE3-EXP-028',
    section: 'SEE3',
    type: 'rule',
    topic: 'Collection Appeal',
    front: 'CDP (Collection Due Process)',
    back: 'Available after Final Notice of Intent to Levy or NFTL. Must file within 30 days. Can go to Tax Court.',
    difficulty: 'medium',
    blueprintArea: 'SEE3-3'
  },
  {
    id: 'SEE3-EXP-029',
    section: 'SEE3',
    type: 'rule',
    topic: 'Penalties',
    front: 'Failure to File Penalty',
    back: '5% per month (max 25%). Returns >60 days late: min $510 or 100% tax.',
    difficulty: 'medium',
    blueprintArea: 'SEE3-3'
  },
  {
    id: 'SEE3-EXP-030',
    section: 'SEE3',
    type: 'rule',
    topic: 'Penalties',
    front: 'Failure to Pay Penalty',
    back: '0.5% per month (max 25%). Rate reduced if in Installment Agreement (0.25%) or increased after notice (1%).',
    difficulty: 'medium',
    blueprintArea: 'SEE3-3'
  },
  {
    id: 'SEE3-EXP-031',
    section: 'SEE3',
    type: 'comparison',
    topic: 'Penalties',
    front: 'Failure to File vs Failure to Pay',
    back: 'If both apply, Failure to File (5%) is reduced by Failure to Pay (0.5%) = Net 4.5% for File + 0.5% for Pay = 5% total/month.',
    difficulty: 'hard',
    blueprintArea: 'SEE3-3'
  },
  {
    id: 'SEE3-EXP-032',
    section: 'SEE3',
    type: 'rule',
    topic: 'Recordkeeping',
    front: 'Record Retention - General Rule',
    back: '3 years from return due date or filing date (whichever later).',
    difficulty: 'easy',
    blueprintArea: 'SEE3-5'
  },
  {
    id: 'SEE3-EXP-033',
    section: 'SEE3',
    type: 'rule',
    topic: 'Electronic Records',
    front: 'Electronic Storage Requirements',
    back: 'Must ensure integrity, reliability, and readability. Must be able to retrieve and print.',
    difficulty: 'medium',
    blueprintArea: 'SEE3-5'
  }
];

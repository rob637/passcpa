/**
 * EA Formula Sheet
 * Essential formulas for SEE1, SEE2, and SEE3
 * 
 * Comprehensive reference for all EA exam calculations
 */

export interface EAFormula {
  id: string;
  name: string;
  formula: string;
  variables?: Record<string, string>;
  example?: string;
  notes?: string;
}

export interface EAFormulaCategory {
  id: string;
  category: string;
  section: 'SEE1' | 'SEE2' | 'SEE3' | 'All';
  formulas: EAFormula[];
}

export const EA_FORMULA_SHEET: EAFormulaCategory[] = [
  // =====================================================
  // Income Calculations (SEE1)
  // =====================================================
  {
    id: 'income-basics',
    category: 'Income & AGI Calculations',
    section: 'SEE1',
    formulas: [
      {
        id: 'gross-income',
        name: 'Gross Income',
        formula: 'Gross Income = All Income from All Sources - Exclusions',
        notes: 'IRC §61 - includes wages, interest, dividends, business income, capital gains, etc.',
      },
      {
        id: 'agi',
        name: 'Adjusted Gross Income (AGI)',
        formula: 'AGI = Gross Income - Above-the-Line Deductions',
        notes: 'Above-the-line: IRA, HSA, SE health, SE tax, alimony (pre-2019), student loan interest',
      },
      {
        id: 'taxable-income',
        name: 'Taxable Income',
        formula: 'Taxable Income = AGI - Standard/Itemized Deduction - QBI Deduction',
        notes: '2024 standard deduction: Single $14,600, MFJ $29,200, HOH $21,900',
      },
      {
        id: 'tax-liability',
        name: 'Tax Liability',
        formula: 'Tax Liability = Tax on Taxable Income + Other Taxes - Credits',
        notes: 'Apply tax brackets, then add SE tax, AMT, then subtract credits',
      },
    ],
  },

  // =====================================================
  // Capital Gains (SEE1)
  // =====================================================
  {
    id: 'capital-gains',
    category: 'Capital Gains & Losses',
    section: 'SEE1',
    formulas: [
      {
        id: 'capital-gain',
        name: 'Capital Gain/Loss',
        formula: 'Gain/Loss = Amount Realized - Adjusted Basis',
        variables: {
          'Amount Realized': 'Sales price - selling costs',
          'Adjusted Basis': 'Original cost + improvements - depreciation',
        },
      },
      {
        id: 'net-capital-gain',
        name: 'Net Capital Gain Netting',
        formula: 'Net LTCG/LTCL first, Net STCG/STCL first, then net long vs. short',
        notes: 'LTCG taxed at 0%/15%/20% based on taxable income',
      },
      {
        id: 'capital-loss-limit',
        name: 'Capital Loss Limitation',
        formula: 'Maximum Deductible Loss = $3,000/year ($1,500 MFS)',
        notes: 'Excess carries forward indefinitely, retains character',
      },
      {
        id: 'home-sale-exclusion',
        name: 'Home Sale Exclusion',
        formula: 'Exclusion: $250,000 Single / $500,000 MFJ',
        notes: 'Must own AND use as principal residence 2 of last 5 years',
      },
      {
        id: 'niit',
        name: 'Net Investment Income Tax',
        formula: 'NIIT = 3.8% × Lesser of (NII or MAGI - Threshold)',
        notes: 'Thresholds: Single $200,000, MFJ $250,000, MFS $125,000',
      },
    ],
  },

  // =====================================================
  // Self-Employment Tax (SEE1 & SEE2)
  // =====================================================
  {
    id: 'self-employment',
    category: 'Self-Employment Tax',
    section: 'All',
    formulas: [
      {
        id: 'se-income',
        name: 'Self-Employment Income',
        formula: 'SE Income = Net Profit from Schedule C × 92.35%',
        notes: 'The 92.35% factor (1 - 7.65%/2) adjusts for employer equivalent',
      },
      {
        id: 'se-tax',
        name: 'Self-Employment Tax',
        formula: 'SE Tax = SE Income × 15.3% (up to SS wage base) + 2.9% above',
        variables: {
          '15.3%': '12.4% Social Security + 2.9% Medicare',
          '2.9%': 'Medicare only above SS wage base ($168,600 for 2024)',
        },
        example: 'SE income $150,000: (150,000 × 15.3%) = $22,950',
      },
      {
        id: 'additional-medicare',
        name: 'Additional Medicare Tax',
        formula: 'Additional Medicare = 0.9% × (Wages + SE Income above threshold)',
        notes: 'Thresholds: Single $200,000, MFJ $250,000, MFS $125,000',
      },
      {
        id: 'se-deduction',
        name: 'SE Tax Deduction',
        formula: 'Above-the-line Deduction = SE Tax × 50%',
        notes: 'Deductible portion adjusts for employer-equivalent',
      },
    ],
  },

  // =====================================================
  // Depreciation (SEE2)
  // =====================================================
  {
    id: 'depreciation',
    category: 'Depreciation & Amortization',
    section: 'SEE2',
    formulas: [
      {
        id: 'macrs-basis',
        name: 'Depreciable Basis',
        formula: 'Depreciable Basis = Cost + Sales Tax + Freight - Land Value',
        notes: 'Basis for depreciation excludes land (non-depreciable)',
      },
      {
        id: 'macrs-5yr',
        name: 'MACRS 5-Year Property',
        formula: 'Years 1-6: 20%, 32%, 19.2%, 11.52%, 11.52%, 5.76%',
        notes: 'Vehicles, computers, office equipment. Half-year convention.',
      },
      {
        id: 'macrs-7yr',
        name: 'MACRS 7-Year Property',
        formula: 'Years 1-8: 14.29%, 24.49%, 17.49%, 12.49%, 8.93%, 8.92%, 8.93%, 4.46%',
        notes: 'Office furniture, general fixtures. Half-year convention.',
      },
      {
        id: 'macrs-27-5',
        name: 'MACRS Residential Rental',
        formula: 'Annual Depreciation = Basis × (1 ÷ 27.5)',
        notes: '27.5 years straight-line, mid-month convention',
        example: '$275,000 building: $275,000 ÷ 27.5 = $10,000/year',
      },
      {
        id: 'macrs-39',
        name: 'MACRS Nonresidential Real Property',
        formula: 'Annual Depreciation = Basis × (1 ÷ 39)',
        notes: '39 years straight-line, mid-month convention',
      },
      {
        id: 'section-179',
        name: 'Section 179 Expensing',
        formula: '2024 Limit: $1,220,000, Phase-out starts at $3,050,000',
        notes: 'Cannot exceed taxable income from active business. Dollar-for-dollar reduction.',
      },
      {
        id: 'bonus-depreciation',
        name: 'Bonus Depreciation',
        formula: '2024: 60% (decreasing 20% annually through 2027)',
        notes: 'New or used property. Taken before regular MACRS.',
      },
      {
        id: 'listed-property',
        name: 'Listed Property (Vehicles)',
        formula: '2024 Luxury Auto Limits: Year 1 $12,200 ($20,200 with bonus)',
        notes: 'Annual caps apply to passenger vehicles >6,000 lbs exempted',
      },
    ],
  },

  // =====================================================
  // Business Entity Formulas (SEE2)
  // =====================================================
  {
    id: 'basis-calculations',
    category: 'Basis Calculations',
    section: 'SEE2',
    formulas: [
      {
        id: 'stock-basis',
        name: 'S Corporation Stock Basis',
        formula: 'Ending Basis = Beginning + Income + Contributions - Distributions - Losses',
        notes: 'Order: Income first, then contributions, then distributions, then losses',
      },
      {
        id: 'partnership-basis',
        name: 'Partnership Basis',
        formula: 'Outside Basis = Contributions + Share of Income - Distributions - Share of Losses + Share of Liabilities',
        notes: 'Partners increase basis for their share of partnership liabilities',
      },
      {
        id: 'aaa-calculation',
        name: 'S Corp Accumulated Adjustments Account',
        formula: 'AAA = Prior AAA + Income - Losses - Deductions - Distributions',
        notes: 'Tax-free distributions come from AAA; cannot go negative for losses',
      },
      {
        id: 'at-risk',
        name: 'At-Risk Limitation',
        formula: 'At-Risk = Cash + Property Basis + Recourse Debt + Qualified Nonrecourse (Real Estate)',
        notes: 'Losses limited to at-risk amount. Excess suspended.',
      },
      {
        id: 'passive-loss',
        name: 'Passive Activity Loss Limitation',
        formula: 'Deductible PAL = Total PAL offset by Total Passive Income',
        notes: 'Special $25,000 rental allowance phases out at $100,000 MAGI',
      },
    ],
  },

  // =====================================================
  // Asset Sales & Recapture (SEE2)
  // =====================================================
  {
    id: 'asset-sales',
    category: 'Asset Sales & Recapture',
    section: 'SEE2',
    formulas: [
      {
        id: 'section-1231',
        name: 'Section 1231 Gain/Loss',
        formula: 'Net 1231 Gain = Capital Gain treatment; Net 1231 Loss = Ordinary loss',
        notes: '1231 recapture: Net gain ordinary to extent of prior 5-year 1231 losses',
      },
      {
        id: 'section-1245',
        name: 'Section 1245 Recapture',
        formula: 'Ordinary Income = Lesser of (Gain or Accumulated Depreciation)',
        notes: 'Applies to personal property, §179, bonus depreciation',
      },
      {
        id: 'section-1250',
        name: 'Section 1250 Recapture',
        formula: 'Unrecaptured §1250 Gain = Accumulated SL Depreciation (max 25% rate)',
        notes: 'Applies to real property on straight-line. Excess = capital gain.',
      },
      {
        id: 'like-kind-exchange',
        name: 'Like-Kind Exchange (§1031)',
        formula: 'Boot Received = Cash + FMV Other Property + Liabilities Relieved - Liabilities Assumed',
        notes: 'Gain recognized = Lesser of (Boot or Realized Gain). Real property only.',
      },
      {
        id: 'basis-lke',
        name: 'Like-Kind Exchange Basis',
        formula: 'New Property Basis = FMV New Property - Deferred Gain',
        notes: 'Or: Old Basis + Boot Paid - Boot Received + Gain Recognized',
      },
    ],
  },

  // =====================================================
  // Employment Taxes (SEE2)
  // =====================================================
  {
    id: 'employment-taxes',
    category: 'Employment Taxes',
    section: 'SEE2',
    formulas: [
      {
        id: 'fica-employer',
        name: 'Employer FICA',
        formula: 'Employer FICA = 6.2% SS (wage base) + 1.45% Medicare (no limit)',
        notes: '2024 SS wage base: $168,600. Additional 0.9% Medicare is employee-only.',
      },
      {
        id: 'futa',
        name: 'Federal Unemployment Tax',
        formula: 'FUTA = 6.0% × First $7,000 wages per employee',
        notes: 'Credit up to 5.4% for state unemployment. Net rate typically 0.6%.',
        example: 'Net FUTA per employee: $7,000 × 0.6% = $42',
      },
      {
        id: 'payroll-deposits',
        name: 'Payroll Deposit Schedule',
        formula: 'Lookback Period: Prior 12-month period ending June 30',
        notes: '<$50,000 = Monthly depositor; ≥$50,000 = Semi-weekly; >$100,000 = Next business day',
      },
    ],
  },

  // =====================================================
  // Penalties & Interest (SEE3)
  // =====================================================
  {
    id: 'penalties',
    category: 'Penalties & Interest',
    section: 'SEE3',
    formulas: [
      {
        id: 'ftf-penalty',
        name: 'Failure to File Penalty',
        formula: 'FTF = 5% per month (or part), maximum 25%',
        notes: 'Minimum penalty: Lesser of $510 or 100% of tax (60+ days late)',
      },
      {
        id: 'ftp-penalty',
        name: 'Failure to Pay Penalty',
        formula: 'FTP = 0.5% per month (or part), maximum 25%',
        notes: 'Reduces to 0.25% if installment agreement in place',
      },
      {
        id: 'combined-penalty',
        name: 'Combined FTF/FTP',
        formula: 'When both apply: FTF reduced by FTP = 4.5% + 0.5% = 5% per month',
        notes: 'Total maximum: 47.5% (25% FTF + 22.5% FTP after 5 months)',
      },
      {
        id: 'accuracy-penalty',
        name: 'Accuracy-Related Penalty',
        formula: '20% × Underpayment due to negligence or substantial understatement',
        notes: 'Substantial understatement: >$5,000 or >10% of correct tax',
      },
      {
        id: 'fraud-penalty',
        name: 'Civil Fraud Penalty',
        formula: '75% × Portion of underpayment due to fraud',
        notes: 'Cannot apply with accuracy-related penalty on same amount',
      },
      {
        id: 'estimated-tax',
        name: 'Estimated Tax Penalty',
        formula: 'No penalty if paid 90% of current year OR 100%/110% of prior year',
        notes: '110% if prior year AGI > $150,000 ($75,000 MFS)',
      },
      {
        id: 'interest-rate',
        name: 'Interest Rate',
        formula: 'Federal Short-Term Rate + 3% (compounded daily)',
        notes: 'Large corporate underpayments: FST + 5%',
      },
    ],
  },

  // =====================================================
  // Preparer Penalties (SEE3)
  // =====================================================
  {
    id: 'preparer-penalties',
    category: 'Preparer Penalties',
    section: 'SEE3',
    formulas: [
      {
        id: 'unreasonable-position',
        name: 'Unreasonable Position (§6694a)',
        formula: 'Greater of $1,000 or 50% of income derived',
        notes: 'Undisclosed position without substantial authority',
      },
      {
        id: 'willful-conduct',
        name: 'Willful/Reckless Conduct (§6694b)',
        formula: 'Greater of $5,000 or 75% of income derived',
        notes: 'Willful attempt to understate or reckless disregard',
      },
      {
        id: 'procedural-penalties',
        name: 'Procedural Penalties (§6695)',
        formula: '$60 per failure (various requirements)',
        notes: 'Sign return, furnish copy, furnish PTIN, retain copy',
      },
      {
        id: 'due-diligence',
        name: 'Due Diligence Penalty',
        formula: '$600 per failure (EIC, CTC, AOTC, HOH)',
        notes: 'Form 8867 required. Penalty applies per credit/status.',
      },
    ],
  },

  // =====================================================
  // Statute of Limitations (SEE3)
  // =====================================================
  {
    id: 'statutes',
    category: 'Statutes of Limitations',
    section: 'SEE3',
    formulas: [
      {
        id: 'general-assessment',
        name: 'General Assessment Period',
        formula: '3 years from later of: Filing date or Due date',
        notes: 'Basic period for IRS to assess additional tax',
      },
      {
        id: 'extended-assessment',
        name: 'Extended Assessment (25% Omission)',
        formula: '6 years if gross income omission exceeds 25%',
        notes: 'Also applies to basis overstatement creating >25% omission',
      },
      {
        id: 'unlimited-assessment',
        name: 'Unlimited Assessment',
        formula: 'No limit: Fraud, willful evasion, no return filed',
        notes: 'IRS can assess at any time',
      },
      {
        id: 'refund-claim',
        name: 'Refund Claim Period',
        formula: 'Later of: 3 years from filing OR 2 years from payment',
        notes: 'If within 3-year period, limited to payments in last 3 years + extensions',
      },
      {
        id: 'collection-period',
        name: 'Collection Statute (CSED)',
        formula: '10 years from date of assessment',
        notes: 'Can be extended by OIC, installment agreement, CDP, etc.',
      },
    ],
  },

  // =====================================================
  // Credits (SEE1)
  // =====================================================
  {
    id: 'credits',
    category: 'Tax Credits',
    section: 'SEE1',
    formulas: [
      {
        id: 'child-tax-credit',
        name: 'Child Tax Credit',
        formula: '$2,000 per qualifying child under 17 (2024)',
        notes: 'Phases out at $200,000 Single/$400,000 MFJ. Up to $1,700 refundable (ACTC).',
      },
      {
        id: 'eitc',
        name: 'Earned Income Credit',
        formula: 'Max 2024: $7,830 (3+ children), $6,960 (2), $3,995 (1), $632 (0)',
        notes: 'Complex phase-in/phase-out. Investment income limit $11,600.',
      },
      {
        id: 'aotc',
        name: 'American Opportunity Credit',
        formula: '100% of first $2,000 + 25% of next $2,000 = $2,500 max',
        notes: '40% refundable. First 4 years only. Phases out $80,000-$90,000 Single.',
      },
      {
        id: 'llc',
        name: 'Lifetime Learning Credit',
        formula: '20% × First $10,000 of qualified expenses = $2,000 max',
        notes: 'Per taxpayer, not per student. Not refundable.',
      },
      {
        id: 'savers-credit',
        name: "Saver's Credit",
        formula: '10%/20%/50% × Retirement contributions (max $2,000)',
        notes: 'Rate based on AGI. Not refundable.',
      },
      {
        id: 'foreign-tax-credit',
        name: 'Foreign Tax Credit',
        formula: 'FTC Limit = US Tax × (Foreign Source Income ÷ Worldwide Income)',
        notes: 'Cannot exceed US tax on foreign income. Carryback 1, forward 10.',
      },
    ],
  },

  // =====================================================
  // Retirement (SEE1 & SEE2)
  // =====================================================
  {
    id: 'retirement',
    category: 'Retirement Plans',
    section: 'All',
    formulas: [
      {
        id: 'ira-contribution',
        name: 'IRA Contribution Limits',
        formula: '2024: $7,000 ($8,000 if 50+)',
        notes: 'Traditional deduction phases out based on workplace plan coverage',
      },
      {
        id: '401k-contribution',
        name: '401(k) Contribution Limits',
        formula: '2024: $23,000 ($30,500 if 50+)',
        notes: 'Employer + employee total: $69,000 ($76,500 if 50+)',
      },
      {
        id: 'sep-ira',
        name: 'SEP-IRA Contribution',
        formula: 'Max = 25% of compensation (or 20% of net SE income)',
        notes: '2024 dollar limit: $69,000. SE calculation: (Net SE - 1/2 SE tax) × 20%',
      },
      {
        id: 'simple-ira',
        name: 'SIMPLE IRA Contribution',
        formula: '2024: $16,000 ($19,500 if 50+) + Employer match',
        notes: 'Employer: 2% of comp (all) or dollar-for-dollar match up to 3%',
      },
      {
        id: 'rmd',
        name: 'Required Minimum Distribution',
        formula: 'RMD = Account Balance (Dec 31 prior year) ÷ Life Expectancy Factor',
        notes: 'Starts at age 73 (SECURE 2.0). 25% penalty if not taken.',
      },
      {
        id: 'early-withdrawal',
        name: 'Early Withdrawal Penalty',
        formula: '10% additional tax on distributions before age 59½',
        notes: 'Exceptions: Death, disability, SEPP, first home ($10,000), education, etc.',
      },
    ],
  },
];

// =====================================================
// Quick Reference Summary
// =====================================================
export const EA_QUICK_REFERENCE = {
  taxRates2024: {
    singleBrackets: [10, 12, 22, 24, 32, 35, 37],
    capitalGains: {
      shortTerm: 'Ordinary income rates',
      longTerm: '0%, 15%, or 20%',
      collectibles: '28% max',
      unrecaptured1250: '25% max',
    },
  },
  standardDeduction2024: {
    single: 14600,
    mfj: 29200,
    mfs: 14600,
    hoh: 21900,
    additional: { over65: 1550, blind: 1550, single: 1950 },
  },
  ssWageBase2024: 168600,
  quarterCoverage2024: 1730,
  medicareThresholds: { single: 200000, mfj: 250000, mfs: 125000 },
  niitRate: 0.038,
  seRates: { socialSecurity: 0.124, medicare: 0.029, total: 0.153 },
  penaltyRates: {
    ftf: { perMonth: 0.05, max: 0.25 },
    ftp: { perMonth: 0.005, max: 0.25 },
    accuracyRelated: 0.20,
    fraud: 0.75,
  },
  preparerPenalties: {
    section6694a: { min: 1000, pct: 0.50 },
    section6694b: { min: 5000, pct: 0.75 },
    procedural: 60,
    dueDiligence: 600,
  },
  statutes: {
    generalAssessment: '3 years',
    omission25pct: '6 years',
    fraud: 'Unlimited',
    refundClaim: '3 years from filing or 2 years from payment',
    collection: '10 years',
  },
};

export default EA_FORMULA_SHEET;

/**
 * SEE1: Individuals - Quick Reference Sheet
 * One-page summary of key concepts, thresholds, and rules
 */

export const SEE1_QUICK_REFERENCE = {
  section: 'SEE1',
  title: 'Individual Taxation Quick Reference',
  lastUpdated: '2024',

  // ============================================
  // Filing Requirements
  // ============================================
  filingRequirements: {
    title: 'Filing Requirements (2024)',
    thresholds: [
      { status: 'Single', under65: '$14,600', age65Plus: '$16,550' },
      { status: 'MFJ (both under 65)', under65: '$29,200', age65Plus: 'N/A' },
      { status: 'MFJ (one 65+)', under65: 'N/A', age65Plus: '$30,750' },
      { status: 'MFJ (both 65+)', under65: 'N/A', age65Plus: '$32,300' },
      { status: 'MFS', under65: '$5', age65Plus: '$5' },
      { status: 'HOH', under65: '$21,900', age65Plus: '$23,850' },
      { status: 'QSS', under65: '$29,200', age65Plus: '$30,750' },
    ],
    mustFileRegardless: [
      'Self-employment income ≥ $400',
      'Household employee wages ≥ $2,700',
      'Received advance premium tax credit',
      'Owe special taxes (AMT, early distribution penalty, etc.)',
    ],
  },

  // ============================================
  // Filing Status
  // ============================================
  filingStatus: {
    title: 'Filing Status Rules',
    statuses: [
      {
        name: 'Single',
        requirements: ['Unmarried on 12/31', 'Not HOH or QSS'],
      },
      {
        name: 'Married Filing Jointly (MFJ)',
        requirements: ['Married on 12/31 OR spouse died during year', 'Both spouses agree to file jointly'],
      },
      {
        name: 'Married Filing Separately (MFS)',
        requirements: ['Married on 12/31', 'Either spouse can elect'],
        limitations: ['No EITC', 'No education credits', 'Lower IRA phase-outs', 'SS taxable at 85%'],
      },
      {
        name: 'Head of Household (HOH)',
        requirements: [
          'Unmarried (or considered unmarried) on 12/31',
          'Paid >50% of home costs',
          'Qualifying person lived with you >½ year',
        ],
      },
      {
        name: 'Qualifying Surviving Spouse (QSS)',
        requirements: [
          'Spouse died in prior 2 years',
          'Dependent child lived with you all year',
          'Paid >50% home costs',
          'Could have filed MFJ in year of death',
        ],
      },
    ],
  },

  // ============================================
  // Standard Deduction
  // ============================================
  standardDeduction: {
    title: 'Standard Deduction (2024)',
    amounts: [
      { status: 'Single', amount: '$14,600' },
      { status: 'MFJ', amount: '$29,200' },
      { status: 'MFS', amount: '$14,600' },
      { status: 'HOH', amount: '$21,900' },
    ],
    additional: [
      { description: 'Age 65+ or Blind (Single/HOH)', amount: '+$1,950 each' },
      { description: 'Age 65+ or Blind (MFJ/MFS)', amount: '+$1,550 each' },
    ],
    dependentLimit: 'Greater of $1,300 OR earned income + $450 (max: regular standard deduction)',
  },

  // ============================================
  // Tax Rates
  // ============================================
  taxRates: {
    title: 'Tax Rate Brackets (2024)',
    brackets: [
      { rate: '10%', single: '$0 - $11,600', mfj: '$0 - $23,200' },
      { rate: '12%', single: '$11,601 - $47,150', mfj: '$23,201 - $94,300' },
      { rate: '22%', single: '$47,151 - $100,525', mfj: '$94,301 - $201,050' },
      { rate: '24%', single: '$100,526 - $191,950', mfj: '$201,051 - $383,900' },
      { rate: '32%', single: '$191,951 - $243,725', mfj: '$383,901 - $487,450' },
      { rate: '35%', single: '$243,726 - $609,350', mfj: '$487,451 - $731,200' },
      { rate: '37%', single: 'Over $609,350', mfj: 'Over $731,200' },
    ],
    capitalGains: [
      { rate: '0%', single: '$0 - $47,025', mfj: '$0 - $94,050' },
      { rate: '15%', single: '$47,026 - $518,900', mfj: '$94,051 - $583,750' },
      { rate: '20%', single: 'Over $518,900', mfj: 'Over $583,750' },
    ],
    niit: '3.8% on lesser of NII or MAGI over $200K (S) / $250K (MFJ)',
  },

  // ============================================
  // Key Deductions
  // ============================================
  deductions: {
    title: 'Key Above-the-Line Deductions',
    items: [
      { name: 'Traditional IRA', limit: '$7,000 ($8,000 if 50+)', notes: 'Income limits apply if covered by employer plan' },
      { name: 'HSA', limit: 'Self: $4,150 / Family: $8,300', notes: '+$1,000 catch-up if 55+' },
      { name: 'Student Loan Interest', limit: '$2,500', notes: 'Phase-out: $75K-$90K (S), $155K-$185K (MFJ)' },
      { name: 'Self-Employment Tax', limit: '50% of SE tax', notes: 'Deduction for employer-equivalent portion' },
      { name: 'SE Health Insurance', limit: '100% of premiums', notes: 'Cannot exceed SE net profit' },
      { name: 'SE Retirement', limit: 'SEP: up to $69,000', notes: '25% of compensation (20% for SE)' },
      { name: 'Educator Expenses', limit: '$300', notes: 'K-12 teachers with 900+ hours' },
    ],
    itemized: [
      { name: 'SALT (State/Local Taxes)', limit: '$10,000 cap', notes: 'Income OR sales tax, plus property tax' },
      { name: 'Mortgage Interest', limit: '$750K acquisition debt', notes: '$1M if debt from before 12/16/2017' },
      { name: 'Charitable', limit: 'Cash: 60% AGI / Property: 30% AGI', notes: '5-year carryforward' },
      { name: 'Medical', limit: 'Excess over 7.5% AGI', notes: 'Only amount exceeding floor' },
    ],
  },

  // ============================================
  // Credits
  // ============================================
  credits: {
    title: 'Key Tax Credits',
    refundable: [
      { name: 'Earned Income Credit (EITC)', max: 'Up to $7,830 (3+ children)', notes: 'Must have earned income, AGI limits' },
      { name: 'Child Tax Credit', max: '$2,000/child ($1,700 refundable)', notes: 'Under 17, SSN required' },
      { name: 'American Opportunity (AOTC)', max: '$2,500 (40% refundable)', notes: 'First 4 years of college' },
      { name: 'Premium Tax Credit', max: 'Varies', notes: 'Marketplace health insurance subsidy' },
    ],
    nonrefundable: [
      { name: 'Child & Dependent Care', max: 'Up to $2,100 (2 dependents)', notes: '20-35% of up to $6,000 expenses' },
      { name: 'Lifetime Learning', max: '$2,000', notes: '20% of first $10K expenses' },
      { name: 'Saver\'s Credit', max: '$1,000 ($2,000 MFJ)', notes: '10-50% of retirement contributions' },
      { name: 'Adoption Credit', max: '$16,810', notes: 'Per child, phase-out applies' },
    ],
  },

  // ============================================
  // Self-Employment
  // ============================================
  selfEmployment: {
    title: 'Self-Employment Tax',
    rates: {
      socialSecurity: '12.4% (on first $168,600)',
      medicare: '2.9% (no limit)',
      additionalMedicare: '0.9% on SE income over $200K (S) / $250K (MFJ)',
      total: '15.3% (up to SS wage base)',
    },
    calculation: [
      'Net SE income × 92.35% = SE tax base',
      'SE tax base × 15.3% = SE tax (up to SS wage base)',
      'Deduct 50% of SE tax above the line',
    ],
    threshold: 'Must file if net SE ≥ $400',
  },

  // ============================================
  // Retirement Distributions
  // ============================================
  retirement: {
    title: 'Retirement Account Rules',
    earlyWithdrawal: {
      penalty: '10% on taxable portion',
      exceptions: [
        'Age 59½ or older',
        'Death or disability',
        'SEPP (72(t) distributions)',
        'First home ($10K lifetime)',
        'Higher education expenses',
        'Medical expenses > 7.5% AGI',
        'Health insurance if unemployed',
        'Birth/adoption ($5K)',
        'Domestic abuse ($10K)',
        'Qualified disaster ($22K)',
      ],
    },
    rmd: {
      startAge: '73 (for those turning 72 after 2022)',
      penalty: '25% of shortfall (10% if corrected timely)',
    },
    rothConversion: 'Taxable income, no 10% penalty, 5-year rule applies',
  },

  // ============================================
  // Key Mnemonics
  // ============================================
  mnemonics: {
    title: 'Memory Aids',
    items: [
      { topic: 'Filing Status', mnemonic: 'SENSE', meaning: 'Single, Either MFS/MFJ, No spouse (HOH), Surviving spouse, Etc.' },
      { topic: 'Qualifying Child', mnemonic: 'CARES', meaning: 'Close relative, Age limit, Residency, Eliminate joint return, Support' },
      { topic: 'Qualifying Relative', mnemonic: 'SUIRN', meaning: 'Support >50%, Under income limit, Income test, Relative/member, Not qualifying child' },
      { topic: 'Itemized Deductions', mnemonic: 'MMITCH', meaning: 'Medical, Mortgage interest, Investment interest, Taxes, Charity, (Casualty-limited)' },
      { topic: 'Refundable Credits', mnemonic: 'CAPE', meaning: 'Child tax (partially), AOTC (40%), Premium tax, Earned income' },
    ],
  },
};

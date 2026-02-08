/**
 * SEE2: Businesses - Quick Reference Sheet
 * One-page summary of key concepts, thresholds, and rules
 */

export const SEE2_QUICK_REFERENCE = {
  section: 'SEE2',
  title: 'Business Taxation Quick Reference',
  lastUpdated: '2024',

  // ============================================
  // Entity Comparison
  // ============================================
  entityComparison: {
    title: 'Entity Type Comparison',
    entities: [
      {
        type: 'Sole Proprietorship',
        formation: 'None required',
        liability: 'Unlimited personal',
        taxation: 'Schedule C on Form 1040',
        seTax: 'Yes - all net profit',
        advantages: 'Simple, low cost',
        disadvantages: 'No liability protection',
      },
      {
        type: 'Partnership',
        formation: 'Partnership agreement (recommended)',
        liability: 'General: unlimited / Limited: limited',
        taxation: 'Form 1065, K-1 to partners',
        seTax: 'General partners only',
        advantages: 'Flexible allocation, pass-through',
        disadvantages: 'General partner liability',
      },
      {
        type: 'C Corporation',
        formation: 'State filing, articles of incorporation',
        liability: 'Limited to investment',
        taxation: 'Form 1120, 21% flat rate',
        seTax: 'No (wages subject to FICA)',
        advantages: 'Unlimited shareholders, retain earnings',
        disadvantages: 'Double taxation',
      },
      {
        type: 'S Corporation',
        formation: 'Form 2553 election',
        liability: 'Limited to investment',
        taxation: 'Form 1120-S, K-1 to shareholders',
        seTax: 'No (reasonable salary required)',
        advantages: 'Pass-through, avoid SE tax on distributions',
        disadvantages: '100 shareholder limit, one class of stock',
      },
      {
        type: 'LLC',
        formation: 'State filing, operating agreement',
        liability: 'Limited to investment',
        taxation: 'Check-the-box (default: partnership or disregarded)',
        seTax: 'Depends on classification',
        advantages: 'Flexibility in structure and tax',
        disadvantages: 'State fee variations',
      },
    ],
  },

  // ============================================
  // Depreciation
  // ============================================
  depreciation: {
    title: 'Depreciation Methods & Limits',
    macrsLives: [
      { property: 'Computers, vehicles, office equipment', life: '5 years', method: '200% DB' },
      { property: 'Office furniture, fixtures', life: '7 years', method: '200% DB' },
      { property: 'Land improvements', life: '15 years', method: '150% DB' },
      { property: 'Residential rental', life: '27.5 years', method: 'Straight-line' },
      { property: 'Commercial property', life: '39 years', method: 'Straight-line' },
    ],
    conventions: [
      { convention: 'Half-Year', applies: 'Most personal property', rule: '½ year in placed-in-service year' },
      { convention: 'Mid-Quarter', applies: '>40% placed in Q4', rule: 'Mid-point of quarter placed in service' },
      { convention: 'Mid-Month', applies: 'Real property', rule: 'Mid-point of month placed in service' },
    ],
    section179: {
      maxDeduction: '$1,220,000 (2024)',
      phaseoutThreshold: '$3,050,000',
      phaseout: 'Dollar-for-dollar reduction above threshold',
      limitations: [
        'Cannot exceed business income',
        'Must be placed in service during year',
        'New or used property qualifies',
      ],
    },
    bonusDepreciation: {
      rate2024: '60%',
      rate2025: '40%',
      rate2026: '20%',
      rate2027: '0%',
      note: 'Applies to new property with life ≤20 years',
    },
    luxuryAutoLimits: {
      year1: '$12,400 (without bonus) / $20,400 (with 60% bonus)',
      year2: '$19,800',
      year3: '$11,900',
      year4Plus: '$7,160',
      suvException: 'Vehicles >6,000 lbs GVWR exempt from limits',
    },
  },

  // ============================================
  // Business Expenses
  // ============================================
  expenses: {
    title: 'Business Expense Rules',
    deductible: [
      'Ordinary and necessary business expenses',
      'Employee wages and benefits',
      'Rent and utilities',
      'Business insurance',
      'Professional services',
      'Office supplies',
      'Business travel (away from home overnight)',
      'Business meals (50% deductible)',
    ],
    nondeductible: [
      'Personal expenses',
      'Political contributions',
      'Fines and penalties (government-imposed)',
      'Bribes and kickbacks',
      'Club dues',
      'Commuting expenses',
      'Entertainment expenses (post-TCJA)',
    ],
    homeOffice: {
      simplified: '$5/sq ft × up to 300 sq ft = max $1,500',
      regular: '(Business sq ft ÷ Total sq ft) × Actual expenses',
      requirement: 'Regular and exclusive business use',
    },
    vehicleExpenses: {
      standardMileage2024: '$0.67/mile',
      actualExpense: 'Business % × (gas, insurance, repairs, depreciation)',
      requirement: 'Must choose method in first year',
    },
    startupCosts: {
      immediateDeduction: '$5,000 (reduced if total >$50,000)',
      organizationalCosts: '$5,000 (separate limit, same rules)',
      excessAmortization: '180 months',
    },
  },

  // ============================================
  // Partnership Taxation
  // ============================================
  partnership: {
    title: 'Partnership Tax Rules',
    formation: {
      generalRule: 'No gain/loss on contribution of property',
      exception: 'Gain if liabilities assumed exceed basis',
      partnerBasis: 'Cash + adjusted basis of property contributed',
    },
    basisCalculation: [
      'Beginning basis',
      '+ Share of income (ordinary and separately stated)',
      '+ Share of tax-exempt income',
      '+ Increase in share of liabilities',
      '− Share of losses and deductions',
      '− Share of nondeductible expenses',
      '− Distributions received',
      '− Decrease in share of liabilities',
      '= Ending basis (cannot go below zero)',
    ],
    liabilityAllocation: {
      recourse: 'To partners bearing economic risk of loss',
      nonrecourse: 'By profit-sharing ratios (generally)',
    },
    distributions: {
      current: 'No gain unless cash > basis',
      liquidating: 'Basis difference = gain/loss',
    },
    hotAssets: {
      definition: 'Unrealized receivables + substantially appreciated inventory',
      effect: 'Ordinary income treatment on sale of partnership interest',
    },
  },

  // ============================================
  // S Corporation
  // ============================================
  sCorp: {
    title: 'S Corporation Rules',
    eligibility: {
      requirements: [
        'Domestic corporation',
        'Only individuals, estates, certain trusts as shareholders',
        'No more than 100 shareholders',
        'One class of stock',
        'No nonresident alien shareholders',
        'Not an ineligible corporation (bank, insurance, etc.)',
      ],
      election: 'Form 2553 - by 15th day of 3rd month',
    },
    basisOrder: [
      '1. Increase for income items',
      '2. Decrease for distributions',
      '3. Decrease for nondeductible expenses',
      '4. Decrease for losses (limited to remaining basis)',
    ],
    debtBasis: 'Only direct loans from shareholder to corporation',
    aaa: {
      increases: 'Income (but NOT tax-exempt)',
      decreases: 'Losses, distributions',
      note: 'Can go negative (from losses, not distributions)',
    },
    lossLimitations: 'BARE: Basis → At-Risk → Passive Activity → Excess Business Loss',
  },

  // ============================================
  // Corporate Taxation
  // ============================================
  corporation: {
    title: 'C Corporation Rules',
    taxRate: '21% flat rate',
    drd: {
      title: 'Dividends Received Deduction',
      rates: [
        { ownership: '<20%', drd: '50%' },
        { ownership: '20-79%', drd: '65%' },
        { ownership: '80%+', drd: '100%' },
      ],
    },
    charitableLimit: '10% of taxable income (before DRD, NOL, capital loss carryback)',
    capitalLosses: 'Offset capital gains only; 3-year back, 5-year forward',
    accumulatedEarningsTax: '20% on excess accumulation (beyond reasonable business needs)',
    personalHoldingCompanyTax: '20% on undistributed PHC income',
  },

  // ============================================
  // Employment Taxes
  // ============================================
  employmentTax: {
    title: 'Employment Tax Summary',
    fica: {
      socialSecurity: '6.2% employer + 6.2% employee = 12.4%',
      ssWageBase: '$168,600 (2024)',
      medicare: '1.45% employer + 1.45% employee = 2.9%',
      additionalMedicare: '0.9% on wages >$200K (employee only)',
    },
    futa: {
      grossRate: '6.0%',
      credit: '5.4% (if state taxes paid timely)',
      netRate: '0.6%',
      wageBase: '$7,000 per employee',
      maxPerEmployee: '$42',
    },
    depositing: {
      monthly: 'Due 15th of following month',
      semiweekly: 'Wed/Thu/Fri payroll → Wed; Sat-Tue payroll → Fri',
      form941: 'Quarterly',
      form940: 'Annual (FUTA)',
    },
  },

  // ============================================
  // Key Mnemonics
  // ============================================
  mnemonics: {
    title: 'Memory Aids',
    items: [
      { topic: 'Entity Selection', mnemonic: 'FLIPS', meaning: 'Formation cost, Liability, Income tax, Profit allocation, SE tax' },
      { topic: 'S Corp Eligibility', mnemonic: 'DRIPS', meaning: 'Domestic, Residents only, Individuals/trusts, Prohibited corps, Single stock class' },
      { topic: 'MACRS Lives', mnemonic: '3-5-7 COW', meaning: '3yr tools, 5yr Computers/Cars, 7yr Office furniture, Warehouse 27.5/39' },
      { topic: 'S Corp Basis Order', mnemonic: 'IDEL', meaning: 'Income, Distributions, Expenses, Losses' },
      { topic: 'FICA', mnemonic: 'S-M', meaning: 'Social Security 6.2% (capped), Medicare 1.45% (uncapped)' },
    ],
  },
};

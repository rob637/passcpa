/**
 * EA Penalty & Threshold Tables
 * Comprehensive reference for 2024/2025 values
 */

export const EA_PENALTY_THRESHOLD_TABLES = {
  title: 'Penalty & Threshold Reference Tables',
  lastUpdated: '2024',

  // ============================================
  // Filing Thresholds
  // ============================================
  filingThresholds: {
    title: '2024 Filing Requirements',
    description: 'Gross income thresholds for filing requirement',
    table2024: {
      year: 2024,
      standardDeduction: {
        single: 14600,
        mfj: 29200,
        mfs: 14600,
        hoh: 21900,
        qss: 29200,
      },
      under65: {
        single: 14600,
        mfj_both: 29200,
        mfj_one65: 30750,
        mfs: 5,
        hoh: 21900,
        qss: 29200,
      },
      age65Plus: {
        single: 16550,
        mfj_both65: 32300,
        hoh: 23850,
        qss: 30750,
      },
      additionalStdDed: {
        single_hoh: 1950,
        mfj_mfs_qss: 1550,
      },
    },
    table2025: {
      year: 2025,
      standardDeduction: {
        single: 15000,
        mfj: 30000,
        mfs: 15000,
        hoh: 22500,
        qss: 30000,
      },
      under65: {
        single: 15000,
        mfj_both: 30000,
        mfj_one65: 31600,
        mfs: 5,
        hoh: 22500,
        qss: 30000,
      },
    },
    mustFileRegardless: [
      { condition: 'Self-employment income', threshold: 400 },
      { condition: 'Church employee income', threshold: 108.28 },
      { condition: 'Advance premium tax credit received', threshold: 'Any' },
      { condition: 'Owe household employment taxes', threshold: 2700 },
      { condition: 'Owe special taxes (AMT, SE, etc.)', threshold: 'Any' },
    ],
  },

  // ============================================
  // Tax Rate Brackets
  // ============================================
  taxBrackets: {
    title: 'Tax Rate Brackets',
    ordinary2024: {
      year: 2024,
      single: [
        { rate: 10, min: 0, max: 11600 },
        { rate: 12, min: 11601, max: 47150 },
        { rate: 22, min: 47151, max: 100525 },
        { rate: 24, min: 100526, max: 191950 },
        { rate: 32, min: 191951, max: 243725 },
        { rate: 35, min: 243726, max: 609350 },
        { rate: 37, min: 609351, max: Infinity },
      ],
      mfj: [
        { rate: 10, min: 0, max: 23200 },
        { rate: 12, min: 23201, max: 94300 },
        { rate: 22, min: 94301, max: 201050 },
        { rate: 24, min: 201051, max: 383900 },
        { rate: 32, min: 383901, max: 487450 },
        { rate: 35, min: 487451, max: 731200 },
        { rate: 37, min: 731201, max: Infinity },
      ],
    },
    capitalGains2024: {
      year: 2024,
      single: [
        { rate: 0, min: 0, max: 47025 },
        { rate: 15, min: 47026, max: 518900 },
        { rate: 20, min: 518901, max: Infinity },
      ],
      mfj: [
        { rate: 0, min: 0, max: 94050 },
        { rate: 15, min: 94051, max: 583750 },
        { rate: 20, min: 583751, max: Infinity },
      ],
    },
    niit: {
      rate: 3.8,
      thresholdSingle: 200000,
      thresholdMFJ: 250000,
      thresholdMFS: 125000,
      appliesTo: 'Lesser of NII or excess MAGI over threshold',
    },
    additionalMedicare: {
      rate: 0.9,
      thresholdSingle: 200000,
      thresholdMFJ: 250000,
      thresholdMFS: 125000,
      appliesTo: 'Wages + SE income over threshold',
    },
  },

  // ============================================
  // Penalty Rates
  // ============================================
  penalties: {
    title: 'Penalty Rate Summary',
    filing: {
      failureToFile: {
        rate: 5,
        perMonth: true,
        maximum: 25,
        minimum2024: 485,
        appliesWhen: 'Tax owed and return not filed by due date',
        note: 'Minimum applies if >60 days late (lesser of $485 or 100% of tax)',
      },
      failureToPay: {
        rate: 0.5,
        perMonth: true,
        maximum: 25,
        reducedRate: 0.25,
        reducedWhen: 'Installment agreement in place',
        increasedRate: 1.0,
        increasedWhen: '10 days after levy notice',
      },
      combinedMaximum: 47.5,
      combinedNote: 'FTF reduced by FTP when both apply',
    },
    accuracy: {
      negligence: { rate: 20, applies: 'Careless, reckless, or intentional disregard' },
      substantialUnderstatement: {
        rate: 20,
        thresholdIndividual: 'Greater of $5,000 or 10% of correct tax',
        thresholdCorporation: 'Greater of $10,000 or 10% of correct tax',
      },
      substantialValuation: { rate: 20, threshold: '150% or more of correct value' },
      grossValuation: { rate: 40, threshold: '200% or more of correct value' },
      fraud: { rate: 75, burden: 'IRS must prove by clear and convincing evidence' },
    },
    estimated: {
      rate: 'Federal short-term rate + 3%',
      avoidanceIndividual: [
        'Pay 90% of current year tax, OR',
        'Pay 100% of prior year tax (110% if AGI >$150K)',
      ],
      dueDates: ['April 15', 'June 15', 'September 15', 'January 15'],
    },
    trust_fund: {
      rate: 100,
      applies: 'Unpaid withholding + employee FICA',
      liability: 'Personal liability on responsible persons',
      form: 'Form 4180 interview to determine responsibility',
    },
  },

  // ============================================
  // Preparer Penalties
  // ============================================
  preparerPenalties: {
    title: 'Tax Preparer Penalties',
    penalties2024: [
      {
        section: '§6694(a)',
        description: 'Unreasonable position',
        amount: 'Greater of $1,000 or 50% of income from return',
        standard: 'Substantial authority (undisclosed) / Reasonable basis (disclosed)',
      },
      {
        section: '§6694(b)',
        description: 'Willful or reckless conduct',
        amount: 'Greater of $5,000 or 75% of income from return',
        standard: 'Willful attempt to understate or reckless disregard',
      },
      {
        section: '§6695(a)',
        description: 'Failure to furnish copy to taxpayer',
        amount: 60,
        max: 30000,
      },
      {
        section: '§6695(b)',
        description: 'Failure to sign return',
        amount: 60,
        max: 30000,
      },
      {
        section: '§6695(c)',
        description: 'Failure to furnish PTIN',
        amount: 60,
        max: 30000,
      },
      {
        section: '§6695(e)',
        description: 'Negotiating refund check',
        amount: 600,
        note: 'Per check negotiated',
      },
      {
        section: '§6695(g)',
        description: 'EITC/CTC/AOTC/HOH due diligence failure',
        amount: 635,
        note: 'Per credit/status per return',
      },
    ],
  },

  // ============================================
  // Information Return Penalties
  // ============================================
  informationReturnPenalties: {
    title: 'Information Return Penalties (§6721/6722)',
    tiers2024: [
      {
        timing: 'Corrected within 30 days',
        perReturn: 60,
        maxSmallBusiness: 230500,
        maxOther: 660500,
      },
      {
        timing: 'Corrected by August 1',
        perReturn: 130,
        maxSmallBusiness: 693500,
        maxOther: 1979000,
      },
      {
        timing: 'Not corrected / After August 1',
        perReturn: 330,
        maxSmallBusiness: 1387000,
        maxOther: 3987000,
      },
      {
        timing: 'Intentional disregard',
        perReturn: 660,
        maxSmallBusiness: 'No limit',
        maxOther: 'No limit',
      },
    ],
    smallBusinessDefinition: 'Average annual gross receipts ≤$5 million for 3 preceding years',
  },

  // ============================================
  // Employment Tax Thresholds
  // ============================================
  employmentTax: {
    title: 'Employment Tax Rates & Limits',
    fica2024: {
      socialSecurity: {
        rate: 6.2,
        wageBase: 168600,
        employerMatch: true,
        totalRate: 12.4,
      },
      medicare: {
        rate: 1.45,
        wageBase: 'Unlimited',
        employerMatch: true,
        totalRate: 2.9,
      },
      additionalMedicare: {
        rate: 0.9,
        threshold: 200000,
        employerMatch: false,
        note: 'Single threshold; $250K MFJ, $125K MFS',
      },
    },
    fica2025: {
      socialSecurity: {
        wageBase: 176100,
      },
    },
    selfEmployment: {
      rate: 15.3,
      ssRate: 12.4,
      medicareRate: 2.9,
      ssTaxBase2024: 168600,
      calculation: 'Net SE × 92.35% = SE tax base',
      deduction: '50% of SE tax above the line',
      threshold: 400,
    },
    futa: {
      grossRate: 6.0,
      creditRate: 5.4,
      netRate: 0.6,
      wageBase: 7000,
      maxPerEmployee: 42,
    },
    depositSchedules: {
      monthly: 'Employment tax ≤$50,000 in lookback period',
      semiweekly: 'Employment tax >$50,000 in lookback period',
      nextDay: 'Accumulated taxes ≥$100,000 on any day',
    },
  },

  // ============================================
  // Contribution Limits
  // ============================================
  contributionLimits: {
    title: 'Retirement & Savings Contribution Limits',
    retirement2024: {
      traditional_roth_ira: {
        limit: 7000,
        catchUp50: 1000,
        total50Plus: 8000,
      },
      simple_ira: {
        limit: 16000,
        catchUp50: 3500,
        total50Plus: 19500,
      },
      '401k_403b_457': {
        limit: 23000,
        catchUp50: 7500,
        total50Plus: 30500,
      },
      sep_ira: {
        limit: 69000,
        percentOfComp: 25,
        selfEmployed: '~20% of net SE income',
      },
      definedBenefit: {
        limit: 275000,
        note: 'Annual benefit limit',
      },
    },
    retirement2025: {
      traditional_roth_ira: {
        limit: 7000,
        note: 'Same as 2024',
      },
      '401k_403b_457': {
        limit: 23500,
        catchUp50: 7500,
        superCatchUp60_63: 11250,
      },
      sep_ira: {
        limit: 70000,
      },
    },
    hsa2024: {
      selfOnly: 4150,
      family: 8300,
      catchUp55: 1000,
    },
    hsa2025: {
      selfOnly: 4300,
      family: 8550,
      catchUp55: 1000,
    },
    fsa2024: {
      healthFSA: 3200,
      dependentCare: 5000,
      carryover: 640,
    },
  },

  // ============================================
  // Statute of Limitations
  // ============================================
  statutes: {
    title: 'Statutes of Limitations',
    assessment: [
      { years: 3, applies: 'Standard from later of due date or filing' },
      { years: 6, applies: '>25% gross income omission' },
      { years: 6, applies: 'FBAR violations (willful: also criminal)' },
      { years: 'Unlimited', applies: 'No return filed' },
      { years: 'Unlimited', applies: 'Fraud or false return with intent to evade' },
    ],
    collection: {
      period: 10,
      from: 'Date of assessment (CSED)',
      extensions: ['Bankruptcy', 'OIC pending', 'CDP hearing', 'Taxpayer outside US >6 months'],
    },
    refund: {
      period: 'Later of 3 years from filing OR 2 years from payment',
      lookback: 'Refund limited to payments within period',
    },
    criminal: [
      { offense: 'Tax evasion §7201', statute: 6 },
      { offense: 'Failure to file §7203', statute: 6 },
      { offense: 'False return §7206', statute: 6 },
      { offense: 'FBAR willful violation', statute: 6 },
    ],
  },

  // ============================================
  // Collection Thresholds
  // ============================================
  collection: {
    title: 'Collection Thresholds',
    installmentAgreement: {
      guaranteed: {
        maxBalance: 10000,
        maxMonths: 36,
        requirements: ['All returns filed/paid last 5 years', 'No prior IA in 5 years'],
      },
      streamlinedIndividual: {
        maxBalance: 50000,
        maxMonths: 72,
        requirements: ['All returns filed', 'Direct debit may be required'],
        form: 'Form 9465 or Online Payment Agreement',
      },
      streamlinedBusiness: {
        maxBalance: 25000,
        maxMonths: 24,
        requirements: ['All returns filed'],
      },
      fees2024: {
        onlineDirectDebit: 31,
        phoneMailDirectDebit: 107,
        phoneMailStandard: 178,
        lowIncome: 43,
        restructure: 89,
      },
    },
    oic: {
      applicationFee: 205,
      lowIncomeWaiver: 'Fee waived if income at/below 250% of poverty guidelines',
      lumpsumPayment: '20% of offer with Form 656',
      periodicPayment: 'First proposed payment with Form 656',
      grounds: ['Doubt as to Liability', 'Doubt as to Collectibility', 'Effective Tax Administration'],
    },
    levyExemptions2024: {
      personalEffects: 17420,
      booksToolsTrade: 8710,
      weeklyExemption: 'Varies by filing status and dependents',
    },
  },

  // ============================================
  // Appeals Thresholds
  // ============================================
  appeals: {
    title: 'Appeals Process Thresholds',
    irsAppeals: {
      smallCase: {
        threshold: 25000,
        form: 'Form 12203',
        note: 'Per tax period',
      },
      writtenProtest: {
        threshold: '>$25,000',
        requirements: ['Statement of facts', 'Legal arguments', 'Supporting documents'],
      },
    },
    taxCourt: {
      regularCase: {
        threshold: 'No limit',
        filingFee: 60,
        deadline: '90 days from deficiency notice (150 if outside US)',
      },
      smallCase: {
        threshold: 50000,
        filingFee: 60,
        note: 'Decision is final, no appeal',
      },
    },
    cdpHearing: {
      deadline: 30,
      note: 'Days from date of final notice',
      equivalentHearing: 'After 30 days - no Tax Court review',
    },
  },
};

// Helper function to get current year values
export function getCurrentYearPenalties(_year: 2024 | 2025 = 2024) {
  // Note: penalty rates are the same for 2024/2025; parameter reserved for future updates
  return {
    failureToFile: EA_PENALTY_THRESHOLD_TABLES.penalties.filing.failureToFile,
    failureToPay: EA_PENALTY_THRESHOLD_TABLES.penalties.filing.failureToPay,
    accuracy: EA_PENALTY_THRESHOLD_TABLES.penalties.accuracy,
    preparer: EA_PENALTY_THRESHOLD_TABLES.preparerPenalties.penalties2024,
  };
}

export function getContributionLimits(year: 2024 | 2025 = 2024) {
  return year === 2024
    ? EA_PENALTY_THRESHOLD_TABLES.contributionLimits.retirement2024
    : EA_PENALTY_THRESHOLD_TABLES.contributionLimits.retirement2025;
}

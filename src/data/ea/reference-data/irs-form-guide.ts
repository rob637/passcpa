/**
 * EA IRS Form Guide
 * Comprehensive reference for forms tested on the EA exam
 */

export const IRS_FORM_GUIDE = {
  title: 'IRS Form Quick Reference Guide',
  lastUpdated: '2024',

  // ============================================
  // Individual Tax Returns (SEE1)
  // ============================================
  individualReturns: {
    category: 'Individual Tax Returns',
    forms: [
      {
        form: 'Form 1040',
        name: 'U.S. Individual Income Tax Return',
        purpose: 'Primary individual tax return',
        dueDate: 'April 15 (or next business day)',
        extension: 'Form 4868 for 6 months',
        keySchedules: ['A (Itemized)', 'B (Interest/Div)', 'C (Business)', 'D (Cap Gains)', 'E (Rental)', 'SE (Self-Emp)'],
      },
      {
        form: 'Form 1040-SR',
        name: 'U.S. Tax Return for Seniors',
        purpose: 'Simplified return for age 65+',
        dueDate: 'April 15',
        notes: 'Larger print, standard deduction chart built in',
      },
      {
        form: 'Form 1040-X',
        name: 'Amended U.S. Individual Tax Return',
        purpose: 'Correct errors on filed return',
        deadline: '3 years from original filing or 2 years from payment',
        notes: 'Can now be e-filed for recent tax years',
      },
      {
        form: 'Form 4868',
        name: 'Application for Automatic Extension',
        purpose: 'Request 6-month filing extension',
        dueDate: 'Original due date of return',
        notes: 'Extension to file, NOT to pay',
      },
    ],
  },

  // ============================================
  // Schedules (SEE1)
  // ============================================
  schedules: {
    category: 'Form 1040 Schedules',
    forms: [
      {
        form: 'Schedule A',
        name: 'Itemized Deductions',
        purpose: 'Detail itemized deductions',
        keyItems: ['Medical (>7.5% AGI)', 'SALT ($10K cap)', 'Mortgage interest', 'Charity'],
      },
      {
        form: 'Schedule B',
        name: 'Interest and Ordinary Dividends',
        purpose: 'Report >$1,500 interest/dividends or foreign accounts',
        triggers: ['>$1,500 interest', '>$1,500 dividends', 'Foreign accounts/trusts'],
      },
      {
        form: 'Schedule C',
        name: 'Profit or Loss from Business',
        purpose: 'Sole proprietor business income/expenses',
        related: 'Schedule SE for self-employment tax',
      },
      {
        form: 'Schedule D',
        name: 'Capital Gains and Losses',
        purpose: 'Report sales of capital assets',
        related: 'Form 8949 for transaction details',
      },
      {
        form: 'Schedule E',
        name: 'Supplemental Income and Loss',
        purpose: 'Rental, royalty, partnership, S corp, estate/trust income',
        parts: ['Part I: Rental/Royalty', 'Part II: Partnerships/S Corps', 'Part III: Estates/Trusts'],
      },
      {
        form: 'Schedule SE',
        name: 'Self-Employment Tax',
        purpose: 'Calculate SE tax on self-employment income',
        threshold: 'Net SE income ≥ $400',
        rate: '15.3% (12.4% SS + 2.9% Medicare)',
      },
      {
        form: 'Schedule 1',
        name: 'Additional Income and Adjustments',
        purpose: 'Report additional income and above-line deductions',
        keyItems: ['Alimony (pre-2019)', 'Business income', 'Student loan interest', 'HSA', 'SE tax deduction'],
      },
      {
        form: 'Schedule 2',
        name: 'Additional Taxes',
        purpose: 'Report AMT, SE tax, early withdrawal penalties, etc.',
        keyItems: ['AMT', 'SE tax', 'NIIT', 'Additional Medicare tax', 'Household employment tax'],
      },
      {
        form: 'Schedule 3',
        name: 'Additional Credits and Payments',
        purpose: 'Report nonrefundable credits and other payments',
        keyItems: ['Foreign tax credit', 'Education credits', 'Retirement saver\'s credit', 'Estimated payments'],
      },
    ],
  },

  // ============================================
  // Business Returns (SEE2)
  // ============================================
  businessReturns: {
    category: 'Business Tax Returns',
    forms: [
      {
        form: 'Form 1120',
        name: 'U.S. Corporation Income Tax Return',
        purpose: 'C corporation tax return',
        dueDate: 'April 15 (calendar year) or 15th day of 4th month after year-end',
        extension: 'Form 7004 for 6 months',
        taxRate: '21% flat rate',
      },
      {
        form: 'Form 1120-S',
        name: 'U.S. Income Tax Return for an S Corporation',
        purpose: 'S corporation information return',
        dueDate: 'March 15 (calendar year) or 15th day of 3rd month after year-end',
        extension: 'Form 7004 for 6 months',
        notes: 'Pass-through entity - provides Schedule K-1 to shareholders',
      },
      {
        form: 'Form 1065',
        name: 'U.S. Return of Partnership Income',
        purpose: 'Partnership information return',
        dueDate: 'March 15 (calendar year) or 15th day of 3rd month after year-end',
        extension: 'Form 7004 for 6 months',
        notes: 'Pass-through entity - provides Schedule K-1 to partners',
      },
      {
        form: 'Form 2553',
        name: 'Election by Small Business Corporation',
        purpose: 'Elect S corporation status',
        dueDate: 'Within 75 days of beginning of tax year (or within 75 days of formation)',
        notes: 'All shareholders must consent',
      },
      {
        form: 'Form 8832',
        name: 'Entity Classification Election',
        purpose: 'Elect entity classification (check-the-box)',
        options: ['Partnership', 'Corporation', 'Disregarded entity'],
        dueDate: '75 days before or 12 months after effective date',
      },
      {
        form: 'Schedule K-1',
        name: 'Partner\'s/Shareholder\'s Share of Income',
        purpose: 'Report pass-through items to owners',
        versions: ['K-1 (1065) for partnerships', 'K-1 (1120-S) for S corps', 'K-1 (1041) for estates/trusts'],
      },
    ],
  },

  // ============================================
  // Employment Tax Forms (SEE2)
  // ============================================
  employmentForms: {
    category: 'Employment Tax Forms',
    forms: [
      {
        form: 'Form 941',
        name: 'Employer\'s Quarterly Federal Tax Return',
        purpose: 'Report income tax withholding, SS, Medicare',
        frequency: 'Quarterly (even if no wages)',
        dueDate: 'Last day of month following quarter-end',
      },
      {
        form: 'Form 940',
        name: 'Employer\'s Annual Federal Unemployment Tax Return',
        purpose: 'Report and pay FUTA tax',
        frequency: 'Annual',
        dueDate: 'January 31',
        rate: '6.0% (0.6% after state credit)',
      },
      {
        form: 'Form 944',
        name: 'Employer\'s Annual Federal Tax Return',
        purpose: 'Annual employment tax return for small employers',
        eligibility: 'Annual employment tax liability ≤$1,000',
        dueDate: 'January 31',
      },
      {
        form: 'Form W-2',
        name: 'Wage and Tax Statement',
        purpose: 'Report wages and withholding to employees/SSA',
        dueDate: 'January 31 to employees and SSA',
      },
      {
        form: 'Form W-4',
        name: 'Employee\'s Withholding Certificate',
        purpose: 'Employee determines withholding amount',
        notes: 'Employees may update anytime; new hires required',
      },
      {
        form: 'Form 1099-NEC',
        name: 'Nonemployee Compensation',
        purpose: 'Report payments ≥$600 to independent contractors',
        dueDate: 'January 31 to recipients and IRS',
      },
      {
        form: 'Form 1099-MISC',
        name: 'Miscellaneous Information',
        purpose: 'Report rent, royalties, prizes, other payments',
        dueDate: 'January 31 (to recipients); Feb 28/March 31 (to IRS)',
      },
      {
        form: 'Form SS-8',
        name: 'Determination of Worker Status',
        purpose: 'Request IRS ruling on employee vs. independent contractor',
        notes: 'File when worker status is unclear',
      },
    ],
  },

  // ============================================
  // Representation Forms (SEE3)
  // ============================================
  representationForms: {
    category: 'Representation & Authorization',
    forms: [
      {
        form: 'Form 2848',
        name: 'Power of Attorney and Declaration of Representative',
        purpose: 'Authorize representative to act on taxpayer\'s behalf',
        grants: ['Receive confidential info', 'Represent before IRS', 'Sign documents', 'Bind taxpayer'],
        notes: 'Must specify tax matters and periods',
      },
      {
        form: 'Form 8821',
        name: 'Tax Information Authorization',
        purpose: 'Allow third party to receive tax information',
        grants: ['Receive and inspect tax info'],
        limitations: 'Cannot represent taxpayer or sign documents',
      },
      {
        form: 'Form 56',
        name: 'Notice Concerning Fiduciary Relationship',
        purpose: 'Notify IRS of fiduciary relationship',
        uses: ['Estates', 'Trusts', 'Bankruptcy', 'Guardianship'],
      },
      {
        form: 'Form 8821-A',
        name: 'Taxpayer Disclosure Authorization',
        purpose: 'Authorize Tax Pro Account access',
        notes: 'Digital authorization for online access',
      },
    ],
  },

  // ============================================
  // Collection Forms (SEE3)
  // ============================================
  collectionForms: {
    category: 'Collection & Payment',
    forms: [
      {
        form: 'Form 9465',
        name: 'Installment Agreement Request',
        purpose: 'Request monthly payment plan',
        types: ['Guaranteed (≤$10K)', 'Streamlined (≤$50K)', 'Non-streamlined'],
        fees: '$31 online/DD, $107 phone/DD, $178 standard',
      },
      {
        form: 'Form 433-A',
        name: 'Collection Information Statement (Individuals)',
        purpose: 'Disclose financial information for collection',
        uses: ['OIC', 'Installment agreements >$50K', 'CNC determination'],
      },
      {
        form: 'Form 433-B',
        name: 'Collection Information Statement (Businesses)',
        purpose: 'Disclose business financial information',
        uses: ['Business installment agreements', 'OIC for business taxes'],
      },
      {
        form: 'Form 433-F',
        name: 'Collection Information Statement (Streamlined)',
        purpose: 'Simplified financial disclosure',
        uses: ['Routine installment agreements', 'Quick assessment of ability to pay'],
      },
      {
        form: 'Form 656',
        name: 'Offer in Compromise',
        purpose: 'Propose settlement of tax debt for less than owed',
        fee: '$205 application fee (waived for low income)',
        attachments: 'Form 433-A or 433-B required',
      },
      {
        form: 'Form 656-L',
        name: 'Offer in Compromise (Doubt as to Liability)',
        purpose: 'OIC based on dispute of amount owed',
        notes: 'No application fee required',
      },
      {
        form: 'Form 12153',
        name: 'Request for Collection Due Process Hearing',
        purpose: 'Request CDP hearing after lien/levy notice',
        deadline: '30 days from notice date',
        notes: 'Suspends collection action',
      },
    ],
  },

  // ============================================
  // Appeals Forms (SEE3)
  // ============================================
  appealsForms: {
    category: 'Appeals & Disputes',
    forms: [
      {
        form: 'Form 12203',
        name: 'Request for Appeals Review',
        purpose: 'Appeal examination results (small cases)',
        limit: 'Total amount ≤$25,000 per period',
        notes: 'Simpler than written protest',
      },
      {
        form: 'Written Protest',
        name: 'Formal Appeals Request',
        purpose: 'Appeal examination results (large cases)',
        required: 'Total amount >$25,000',
        contents: ['Statement of facts', 'Law and arguments', 'Penalties at issue'],
      },
      {
        form: 'Form 843',
        name: 'Claim for Refund and Request for Abatement',
        purpose: 'Request penalty abatement or refund',
        uses: ['Penalty abatement', 'Interest abatement', 'Refund claims'],
      },
      {
        form: 'Form 870',
        name: 'Waiver of Restrictions on Assessment',
        purpose: 'Agree to proposed adjustments',
        effect: 'Allows immediate assessment, closes case',
        notes: 'No appeal rights after signing',
      },
      {
        form: 'Form 872',
        name: 'Consent to Extend Time to Assess Tax',
        purpose: 'Extend assessment statute to specific date',
        uses: ['Allow more time for audit', 'Avoid premature assessment'],
      },
      {
        form: 'Form 872-A',
        name: 'Special Consent to Extend Time',
        purpose: 'Open-ended statute extension',
        termination: 'Form 872-T to terminate (90-day notice)',
      },
    ],
  },

  // ============================================
  // Penalty Forms (SEE3)
  // ============================================
  penaltyForms: {
    category: 'Penalties & Trust Fund',
    forms: [
      {
        form: 'Form 4180',
        name: 'Report of Interview (TFRP)',
        purpose: 'Interview for Trust Fund Recovery Penalty',
        determines: 'Who is responsible person',
        notes: 'Basis for personal liability assessment',
      },
      {
        form: 'Form 8278',
        name: 'Assessment and Abatement of Miscellaneous Civil Penalties',
        purpose: 'Document penalty assessment/abatement',
        internalUse: 'IRS internal form',
      },
    ],
  },

  // ============================================
  // Depreciation Forms (SEE2)
  // ============================================
  depreciationForms: {
    category: 'Depreciation & Assets',
    forms: [
      {
        form: 'Form 4562',
        name: 'Depreciation and Amortization',
        purpose: 'Report depreciation, Section 179, bonus depreciation',
        required: 'First year asset placed in service and when claiming Section 179/bonus',
        keyParts: ['Section 179', 'Bonus depreciation', 'MACRS', 'Listed property'],
      },
      {
        form: 'Form 4797',
        name: 'Sales of Business Property',
        purpose: 'Report gains/losses on business property',
        sections: ['Section 1231 gains/losses', 'Ordinary gains', 'Recapture'],
      },
      {
        form: 'Form 8824',
        name: 'Like-Kind Exchanges',
        purpose: 'Report Section 1031 exchanges',
        requirements: ['Qualified property', '45-day identification', '180-day completion'],
      },
    ],
  },

  // ============================================
  // Retirement Forms (SEE1)
  // ============================================
  retirementForms: {
    category: 'Retirement Accounts',
    forms: [
      {
        form: 'Form 5498',
        name: 'IRA Contribution Information',
        purpose: 'Report IRA contributions, rollovers, FMV',
        provided: 'By IRA custodian to IRS and taxpayer',
        dueDate: 'May 31',
      },
      {
        form: 'Form 1099-R',
        name: 'Distributions from Pensions, Annuities, Retirement Plans',
        purpose: 'Report retirement distributions',
        keyCodes: ['1: Early', '2: Early, exception applies', '7: Normal', 'G: Rollover'],
      },
      {
        form: 'Form 5329',
        name: 'Additional Taxes on Qualified Plans',
        purpose: 'Report 10% early withdrawal penalty, excess contributions, RMD failures',
        penalty: '10% early distribution; 25% RMD shortfall (10% if corrected timely)',
      },
      {
        form: 'Form 8606',
        name: 'Nondeductible IRAs',
        purpose: 'Track nondeductible IRA contributions and Roth conversions',
        required: 'When making nondeductible contributions or converting to Roth',
      },
    ],
  },

  // ============================================
  // International Forms (SEE1)
  // ============================================
  internationalForms: {
    category: 'International Reporting',
    forms: [
      {
        form: 'FinCEN 114 (FBAR)',
        name: 'Report of Foreign Bank and Financial Accounts',
        purpose: 'Report foreign accounts with aggregate value >$10,000',
        dueDate: 'April 15 (auto-extension to October 15)',
        penalties: 'Up to $12,500 non-willful; $100,000+ or 50% willful',
        filing: 'Electronic only via BSA E-Filing',
      },
      {
        form: 'Form 8938',
        name: 'Statement of Specified Foreign Financial Assets',
        purpose: 'Report foreign assets exceeding thresholds',
        thresholds: '$50K-$200K depending on filing status and residence',
        filed: 'With Form 1040',
      },
    ],
  },
};

// Export individual sections for targeted access
export const getFormsByCategory = (category: string) => {
  const allCategories = [
    IRS_FORM_GUIDE.individualReturns,
    IRS_FORM_GUIDE.schedules,
    IRS_FORM_GUIDE.businessReturns,
    IRS_FORM_GUIDE.employmentForms,
    IRS_FORM_GUIDE.representationForms,
    IRS_FORM_GUIDE.collectionForms,
    IRS_FORM_GUIDE.appealsForms,
    IRS_FORM_GUIDE.penaltyForms,
    IRS_FORM_GUIDE.depreciationForms,
    IRS_FORM_GUIDE.retirementForms,
    IRS_FORM_GUIDE.internationalForms,
  ];
  return allCategories.find(c => c.category.toLowerCase().includes(category.toLowerCase()));
};

export const getFormByNumber = (formNumber: string) => {
  const allForms = [
    ...IRS_FORM_GUIDE.individualReturns.forms,
    ...IRS_FORM_GUIDE.schedules.forms,
    ...IRS_FORM_GUIDE.businessReturns.forms,
    ...IRS_FORM_GUIDE.employmentForms.forms,
    ...IRS_FORM_GUIDE.representationForms.forms,
    ...IRS_FORM_GUIDE.collectionForms.forms,
    ...IRS_FORM_GUIDE.appealsForms.forms,
    ...IRS_FORM_GUIDE.penaltyForms.forms,
    ...IRS_FORM_GUIDE.depreciationForms.forms,
    ...IRS_FORM_GUIDE.retirementForms.forms,
    ...IRS_FORM_GUIDE.internationalForms.forms,
  ];
  return allForms.find(f => f.form.toLowerCase().includes(formNumber.toLowerCase()));
};

/**
 * CFP Domain 6: Retirement Savings and Income Planning
 * Area RET-2: Employer-Sponsored Retirement Plans
 * 
 * These lessons cover 401(k)s, 403(b)s, 457 plans, profit sharing,
 * defined benefit pensions, and ERISA rules.
 */

import type { Lesson } from '../../../types';

export const CFP_RET2_LESSONS: Lesson[] = [
  {
    id: 'CFP-RET-L005',
    courseId: 'cfp',
    section: 'CFP-RET',
    title: '401(k) Plans - Features and Rules',
    description: 'Explain 401(k) contribution limits and catch-up provisions',
    order: 5,
    duration: 55,
    difficulty: 'intermediate',
    topics: [
      'Explain 401(k) contribution limits and catch-up provisions',
      'Compare traditional and Roth 401(k) contributions',
      'Apply vesting schedules and employer matching',
      'Identify distribution rules and penalties'
    ],
    blueprintArea: 'RET-2',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'The 401(k) is the most common employer-sponsored retirement plan, named after the Internal Revenue Code section that created it. It\'s available for for-profit companies and allows employee deferrals plus employer contributions.'
        },
        {
          title: 'Why This Matters',
          type: 'callout',
          content: '401(k) plans are the primary retirement savings vehicle for most Americans. Understanding contribution limits, matching, and distribution rules is essential for maximizing retirement savings.'
        },
        {
          title: 'Contribution Limits (2026)',
          type: 'table',
          headers: ['Category', 'Limit'],
          rows: [
            ['Under age 50 (employee deferral)', '$24,500'],
            ['Age 50+ (with catch-up)', '$24,500 + $7,500 = $32,000'],
            ['Total Annual Addition (415 Limit)', '$71,500 ($79,000 with catch-up)']
          ]
        },
        {
          title: 'SECURE 2.0 Enhanced Catch-Up',
          type: 'text',
          content: 'Starting 2025, ages 60-63 get higher catch-up: $10,000 or 150% of regular catch-up (approximately $11,250). This creates additional savings opportunity for those close to retirement.'
        },
        {
          title: 'Traditional vs. Roth 401(k)',
          type: 'table',
          headers: ['Feature', 'Traditional 401(k)', 'Roth 401(k)'],
          rows: [
            ['Contribution tax', 'Pre-tax (deductible)', 'After-tax (no deduction)'],
            ['Growth', 'Tax-deferred', 'Tax-deferred'],
            ['Distributions', 'Taxable', 'Tax-free (if qualified)'],
            ['RMDs', 'Required at 73', 'No RMDs (SECURE 2.0)'],
            ['Best if', 'Higher bracket now', 'Lower bracket now or same/higher later']
          ]
        },
        {
          title: 'Roth 401(k) Qualified Distribution',
          type: 'text',
          content: 'Tax-free if: (1) Account held 5 years from first contribution, AND (2) Age 59½, death, or disability.'
        },
        {
          title: 'Employer Contributions',
          type: 'list',
          items: [
            'Common match formulas: 50% on first 6% = 3%, or 100% on first 3% + 50% on next 2% = 4%',
            'Safe Harbor 401(k): 3% non-elective OR 100% on first 3% + 50% on next 2% (4% total)',
            'Safe harbor contributions must be immediately vested',
            'Profit Sharing: Discretionary, up to 25% of eligible payroll'
          ]
        },
        {
          title: 'Vesting Schedules',
          type: 'table',
          headers: ['Type', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6'],
          rows: [
            ['Cliff', '0%', '0%', '100%', '100%', '100%', '100%'],
            ['Graded', '0%', '20%', '40%', '60%', '80%', '100%'],
            ['Safe Harbor', '100%', '100%', '100%', '100%', '100%', '100%']
          ]
        },
        {
          title: 'Exam Tip',
          type: 'warning',
          content: 'Employee contributions are ALWAYS 100% vested immediately. Vesting schedules only apply to employer contributions.'
        },
        {
          title: 'Distribution Triggering Events',
          type: 'list',
          items: [
            'Separation from service (any age)',
            'Age 59½ (while still employed)',
            'Disability',
            'Death',
            'Plan termination',
            'Hardship (special rules)'
          ]
        },
        {
          title: 'Exceptions to 10% Early Withdrawal Penalty',
          type: 'table',
          headers: ['Exception', 'Description'],
          rows: [
            ['Age 55', 'Separation from service in year turning 55+'],
            ['Disability', 'Unable to engage in gainful activity'],
            ['Death', 'To beneficiary after death'],
            ['QDRO', 'Qualified domestic relations order'],
            ['Medical expenses', 'Exceeding 7.5% of AGI'],
            ['72(t)', 'Substantially equal periodic payments']
          ]
        },
        {
          title: '401(k) Loans',
          type: 'text',
          content: 'Limit: Lesser of 50% of vested balance OR $50,000 (reduced by highest loan balance in prior 12 months). Must repay within 5 years (longer for home purchase) with level amortization. Default = deemed distribution (taxable + penalty if under 59½).'
        },
        {
          title: 'Required Minimum Distributions',
          type: 'text',
          content: 'RMD Starting Age: 73 (SECURE 2.0 for those turning 72 after 2022), Age 75 starting in 2033. Still-Working Exception: No RMDs if still employed by sponsoring employer AND not a 5%+ owner. RMD = Account Balance (Dec 31 prior year) / Life Expectancy Factor.'
        },
        {
          title: 'SECURE 2.0 Updates',
          type: 'table',
          headers: ['Change', 'Detail'],
          rows: [
            ['RMD age', '73 (2023-2032), 75 (2033+)'],
            ['Roth employer contributions', 'Now allowed'],
            ['Roth 401(k) RMDs', 'Eliminated (can stay in account)'],
            ['Student loan match', 'Employer can match student loan payments'],
            ['Emergency savings', 'Sidecar accounts permitted']
          ]
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            '2026 limits: $24,500 employee ($32,000 with catch-up); $71,500 total',
            'Roth 401(k): After-tax in, tax-free out (if qualified)',
            'Age 55 rule: Penalty-free withdrawals at separation after 55',
            'Safe harbor: 3% non-elective or 4% match, immediately vested',
            'RMDs start: Age 73 (75 in 2033)'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-RET-L006',
    courseId: 'cfp',
    section: 'CFP-RET',
    title: '403(b) and 457 Plans',
    description: 'Distinguish 403(b) plans from 401(k) plans',
    order: 6,
    duration: 45,
    difficulty: 'intermediate',
    topics: [
      'Distinguish 403(b) plans from 401(k) plans',
      'Explain 457(b) governmental vs. non-governmental differences',
      'Apply special catch-up provisions',
      'Coordinate multiple employer plan contributions'
    ],
    blueprintArea: 'RET-2',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: '403(b) and 457 plans serve specific employer types with unique rules that differ from traditional 401(k)s. Understanding these differences is crucial for planning.'
        },
        {
          title: '403(b) Plans - Tax-Sheltered Annuities',
          type: 'text',
          content: 'Eligible employers: Public schools (K-12 and higher education), Tax-exempt 501(c)(3) organizations (hospitals, charities), Churches and religious organizations. Same contribution limits as 401(k): Under 50: $24,500, Age 50+: $32,000, Total annual addition: $71,500.'
        },
        {
          title: '403(b) 15-Year Catch-Up',
          type: 'callout',
          content: 'Employees with 15+ years of service with same employer get additional $3,000/year (lifetime max $15,000). Must be used BEFORE age 50 catch-up. Maximum possible: $24,500 + $3,000 + $7,500 = $35,000.'
        },
        {
          title: '403(b) Investment Options',
          type: 'list',
          items: [
            'Annuities (from insurance companies)',
            'Mutual funds (custodial accounts)',
            'Church retirement accounts (for churches only)',
            'Individual stocks NOT permitted in 403(b) plans'
          ]
        },
        {
          title: '457(b) Plan Types',
          type: 'table',
          headers: ['Feature', 'Governmental 457(b)', 'Non-Governmental 457(b)'],
          rows: [
            ['Employers', 'State/local government', 'Tax-exempt organizations'],
            ['Tax treatment', 'Same as 401(k)/403(b)', 'Deferred compensation'],
            ['Rollover', 'To IRA, 401(k), etc.', 'ONLY to another 457(b)'],
            ['Creditor protection', 'Protected', 'NOT protected'],
            ['Early withdrawal penalty', 'None!', 'None']
          ]
        },
        {
          title: 'Key 457(b) Advantage',
          type: 'warning',
          content: 'Governmental 457(b) has NO 10% early withdrawal penalty regardless of age at separation. This makes it excellent for early retirees!'
        },
        {
          title: '457(b) Special 3-Year Catch-Up',
          type: 'text',
          content: 'In the 3 years before normal retirement age, can contribute up to double the limit (2026: up to $49,000). Cannot use both 3-year catch-up AND age 50 catch-up in same year.'
        },
        {
          title: 'Coordinating Multiple Plans',
          type: 'table',
          headers: ['Combination', 'Limits', 'Total Possible'],
          rows: [
            ['401(k) + 457(b)', 'Separate limits', '$49,000 (under 50)'],
            ['403(b) + 457(b)', 'Separate limits', '$49,000 (under 50)'],
            ['401(k) + 403(b)', 'Shared limit', '$24,500 combined']
          ]
        },
        {
          title: '403(b) vs. 401(k) Comparison',
          type: 'table',
          headers: ['Feature', '403(b)', '401(k)'],
          rows: [
            ['Employers', 'Non-profits, schools', 'For-profit'],
            ['Investment options', 'Annuities, mutual funds', 'Broader options'],
            ['15-year catch-up', 'Yes', 'No'],
            ['ERISA coverage', 'Often exempt', 'Required'],
            ['Age 55 rule', 'Modified (public safety)', 'Yes']
          ]
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            '403(b): For non-profits/schools; 15-year catch-up available',
            '457(b) governmental: NO 10% early withdrawal penalty',
            '457(b) non-governmental: Not rollover eligible to IRA; not creditor protected',
            'Dual contribution: 401(k)/403(b) + 457(b) = separate limits ($49,000 total if under 50)',
            '3-year catch-up: 457(b) allows double limit in final 3 years'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-RET-L007',
    courseId: 'cfp',
    section: 'CFP-RET',
    title: 'Defined Benefit Pension Plans',
    description: 'Explain how defined benefit pensions work',
    order: 7,
    duration: 50,
    difficulty: 'intermediate',
    topics: [
      'Explain how defined benefit pensions work',
      'Calculate pension benefits using common formulas',
      'Evaluate lump sum vs. annuity pension options',
      'Understand PBGC protection limits'
    ],
    blueprintArea: 'RET-2',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Defined Benefit (DB) plans provide a guaranteed lifetime income based on a formula, rather than account balance. The employer bears both investment and longevity risk.'
        },
        {
          title: 'Why This Matters',
          type: 'callout',
          content: 'While fewer employees have DB plans today, understanding them remains important. Many clients have old pensions, and DB plans are making a comeback for high-income business owners.'
        },
        {
          title: 'DB Plan Characteristics',
          type: 'table',
          headers: ['Feature', 'Description'],
          rows: [
            ['Benefit promise', 'Guaranteed monthly income in retirement'],
            ['Investment risk', 'Borne by employer'],
            ['Longevity risk', 'Borne by employer'],
            ['Funding', 'Employer contributes actuarially required amounts'],
            ['Portability', 'Limited (benefits based on tenure)']
          ]
        },
        {
          title: 'Common Benefit Formulas',
          type: 'text',
          content: 'Flat Dollar: Annual Benefit = Years of Service × Dollar Amount (e.g., $75 × 30 years = $2,250/month). Career Average: Benefit = Years × Multiplier × Career Average Salary. Final Average (most common): Benefit = Years × Multiplier × Final Average (highest 3-5 years). Example: 30 years × 1.5% × $100,000 = $45,000/year.'
        },
        {
          title: 'Vesting Schedules (ERISA)',
          type: 'table',
          headers: ['Schedule', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7'],
          rows: [
            ['Cliff', '0%', '0%', '100%', '100%', '100%'],
            ['Graded', '20%', '40%', '60%', '80%', '100%']
          ]
        },
        {
          title: 'Lump Sum vs. Annuity Decision',
          type: 'table',
          headers: ['Factor', 'Favors Lump Sum', 'Favors Annuity'],
          rows: [
            ['Health/life expectancy', 'Poor health', 'Good health/longevity'],
            ['Investment confidence', 'High confidence', 'Risk averse'],
            ['Legacy goals', 'Want to leave to heirs', 'Spouse needs survivor benefit'],
            ['Employer concern', 'Solvency worries', 'Stable company'],
            ['Need for flexibility', 'Variable needs', 'Stable income needs']
          ]
        },
        {
          title: 'Joint and Survivor Annuities',
          type: 'table',
          headers: ['Option', 'While Both Alive', 'After First Death'],
          rows: [
            ['Single Life', '100%', '$0'],
            ['50% J&S', '~88% of single life', '50% to survivor'],
            ['75% J&S', '~82% of single life', '75% to survivor'],
            ['100% J&S', '~76% of single life', '100% to survivor']
          ]
        },
        {
          title: 'Exam Tip',
          type: 'warning',
          content: 'ERISA requires QJSA (Qualified Joint and Survivor Annuity) as default for married participants. At least 50% continues to surviving spouse. Spouse must consent to waive.'
        },
        {
          title: 'PBGC Protection',
          type: 'text',
          content: 'PBGC insures private-sector defined benefit plans. 2026 Maximum Insured Benefit at age 65: $7,108/month ($85,295/year). Benefits exceeding PBGC limits, plans less than 5 years old, and health/welfare benefits are NOT covered.'
        },
        {
          title: 'Cash Balance Plans (Hybrid)',
          type: 'text',
          content: 'Looks like a DC plan (individual account) but IS a DB plan (employer bears risk). Account grows with Pay Credits (% of salary) and Interest Credits (guaranteed rate). Example: 5% pay credit on $100,000 = $5,000/year + 4% interest on balance.'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'DB formula: Years × Multiplier × Final Average Salary (commonly)',
            'Employer bears all investment and longevity risk',
            'Lump sum suits short life expectancy, legacy goals, investment confidence',
            'Annuity suits long life expectancy, guaranteed income needs, risk aversion',
            'PBGC insures up to ~$85,300/year (2026) at age 65'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-RET-L008',
    courseId: 'cfp',
    section: 'CFP-RET',
    title: 'Profit Sharing and Stock Bonus Plans',
    description: 'Explain profit sharing plan features and contribution rules',
    order: 8,
    duration: 40,
    difficulty: 'intermediate',
    topics: [
      'Explain profit sharing plan features and contribution rules',
      'Distinguish ESOPs from other stock bonus plans',
      'Apply contribution allocation methods',
      'Identify ESOP-specific tax benefits'
    ],
    blueprintArea: 'RET-2',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Profit sharing and stock bonus plans are employer-funded retirement vehicles that provide flexible contribution options without requiring employee deferrals.'
        },
        {
          title: 'Profit Sharing Plans',
          type: 'table',
          headers: ['Feature', 'Description'],
          rows: [
            ['Contributions', '100% employer-funded'],
            ['Discretionary', 'Amount can vary year to year'],
            ['Maximum', '25% of eligible payroll'],
            ['Individual maximum', 'Lesser of 100% compensation or $71,500 (2026)']
          ]
        },
        {
          title: 'Allocation Methods',
          type: 'list',
          items: [
            'Pro-Rata (most common): Same percentage of compensation to all participants',
            'New Comparability (age-weighted): Allocates more to older, higher-paid employees',
            'Integrated with Social Security: Higher contribution % above SS wage base'
          ]
        },
        {
          title: 'Pro-Rata Example',
          type: 'text',
          content: '$100,000 profit sharing pool with $500,000 total eligible compensation. Allocation rate = 20%. Employee earning $75,000 receives: $75,000 × 20% = $15,000.'
        },
        {
          title: 'Stock Bonus Plans',
          type: 'text',
          content: 'Similar to profit sharing but contributions made in company stock. Benefits distributed in company stock. Participant bears stock price risk. Creates employee ownership culture.'
        },
        {
          title: 'Employee Stock Ownership Plans (ESOPs)',
          type: 'table',
          headers: ['Feature', 'Description'],
          rows: [
            ['Leveraged', 'Can borrow to buy company stock'],
            ['Mandatory stock investment', 'Must invest primarily in employer stock'],
            ['Put option', 'Employees can sell stock back to company'],
            ['Tax benefits', 'Unique benefits for C-corporation shareholders']
          ]
        },
        {
          title: 'Section 1042 Rollover',
          type: 'callout',
          content: 'C-corporation selling shareholders can sell 30%+ of company to ESOP, reinvest in qualified replacement property, and defer capital gains indefinitely. Requirements: Stock held 3+ years, C-corporation, seller cannot participate as employee afterwards.'
        },
        {
          title: 'ESOP Diversification Rights',
          type: 'text',
          content: 'After age 55 and 10 years of participation: Can diversify up to 25% of account (years 1-5), up to 50% in final year. This protects employees from concentration risk.'
        },
        {
          title: 'Profit Sharing vs. ESOP',
          type: 'table',
          headers: ['Feature', 'Profit Sharing', 'ESOP'],
          rows: [
            ['Investment', 'Diversified', 'Company stock'],
            ['Leverage', 'No', 'Yes (can borrow)'],
            ['Employer deduction', 'Contribution', 'Contribution + dividends'],
            ['1042 rollover', 'No', 'Yes (C-corps)'],
            ['Risk', 'Diversified', 'Concentrated']
          ]
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Profit sharing: 100% employer-funded, discretionary, up to 25% of payroll',
            'Allocation methods: Pro-rata, age-weighted/new comparability, SS-integrated',
            'ESOPs: Can leverage (borrow), must invest in employer stock',
            'Section 1042: C-corp sellers can defer capital gains into replacement property',
            'ESOP diversification: 25% after age 55 + 10 years; 50% in final year'
          ]
        }
      ]
    }
  }
];

export default CFP_RET2_LESSONS;

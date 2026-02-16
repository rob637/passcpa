/**
 * CFP Domain 6: Retirement Savings and Income Planning
 * Area RET-4: Executive and Non-Qualified Plans
 * 
 * These lessons cover non-qualified deferred compensation,
 * stock options, RSUs, and executive compensation.
 */

import type { Lesson } from '../../../types';

export const CFP_RET4_LESSONS: Lesson[] = [
  {
    id: 'CFP-RET-L013',
    courseId: 'cfp',
    section: 'CFP-RET',
    title: 'Non-Qualified Deferred Compensation Plans',
    description: 'Distinguish qualified from non-qualified plans',
    order: 13,
    duration: 50,
    difficulty: 'advanced',
    topics: [
      'Distinguish qualified from non-qualified plans',
      'Explain Section 409A requirements',
      'Identify NQDC risks and planning considerations',
      'Apply SERP and Top Hat plan concepts'
    ],
    blueprintArea: 'RET-4',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Non-qualified deferred compensation (NQDC) plans allow executives to defer income beyond qualified plan limits—but with significant risks.'
        },
        {
          title: 'Qualified vs. Non-Qualified Plans',
          type: 'table',
          headers: ['Feature', 'Qualified Plans', 'NQDC Plans'],
          rows: [
            ['ERISA coverage', 'Yes', 'Limited'],
            ['Tax deduction timing', 'When contributed', 'When paid to employee'],
            ['Contribution limits', 'Statutory limits', 'None'],
            ['Discrimination testing', 'Required', 'Not required'],
            ['Vesting rules', '3-7 years max', 'Any schedule'],
            ['Creditor protection', 'Protected', 'NOT protected'],
            ['Employer deduction', 'When contributed', 'When included in income']
          ]
        },
        {
          title: 'The Fundamental Risk',
          type: 'warning',
          content: 'NQDC is an UNSECURED PROMISE to pay in the future. You are a general creditor. If employer is insolvent, you stand in line with other creditors and may receive pennies on the dollar—or nothing.'
        },
        {
          title: 'Why Employers Use NQDC',
          type: 'list',
          items: [
            'For Executives: Defer income beyond 401(k) limits, tax benefits if lower future bracket, retention tool',
            'For Employers: No cost until payment, can discriminate (select executives only), "golden handcuffs" retention'
          ]
        },
        {
          title: 'Section 409A Requirements',
          type: 'table',
          headers: ['Requirement', 'Description'],
          rows: [
            ['Election timing', 'Deferral elections before year income is earned'],
            ['Distribution triggers', 'Limited to 6 events'],
            ['Acceleration', 'Generally prohibited'],
            ['Funding', 'Cannot be secured in offshore trust']
          ]
        },
        {
          title: 'Six Permitted Distribution Events',
          type: 'list',
          items: [
            '1. Separation from service',
            '2. Disability',
            '3. Death',
            '4. Change in ownership/control',
            '5. Unforeseeable emergency',
            '6. Specified date or fixed schedule'
          ]
        },
        {
          title: '409A Violation Penalties',
          type: 'callout',
          content: 'If plan fails to comply: Immediate income inclusion of all vested deferrals + Income tax at ordinary rates + 20% additional penalty + Interest on underpayment from deferral year. Severe penalties make 409A compliance critical.'
        },
        {
          title: 'Types of NQDC Arrangements',
          type: 'table',
          headers: ['Type', 'Description'],
          rows: [
            ['SERP', 'Supplemental Executive Retirement Plan - employer-funded, formula-based'],
            ['Excess Benefit Plan', 'Makes up for qualified plan limits'],
            ['Top Hat Plan', 'Unfunded plan for select management/highly compensated'],
            ['Elective Deferral Plan', 'Executive chooses to defer salary/bonus']
          ]
        },
        {
          title: 'Rabbi Trust',
          type: 'text',
          content: 'An irrevocable trust to hold NQDC assets, BUT assets remain subject to employer\'s creditors in bankruptcy. Provides protection against corporate changes (mergers, management changes), does NOT protect against employer insolvency. Why "Rabbi" Trust? First IRS ruling was for a synagogue rabbi\'s deferred compensation.'
        },
        {
          title: 'When NQDC Makes Sense',
          type: 'table',
          headers: ['Good Candidate', 'Poor Candidate'],
          rows: [
            ['Very high income now', 'Employer financial concerns'],
            ['Strong employer (low bankruptcy risk)', 'Similar current vs. future tax rate'],
            ['Retirement timing certain', 'Uncertain tenure'],
            ['Long tenure expected', 'Need liquidity']
          ]
        },
        {
          title: 'Tax Treatment Summary',
          type: 'text',
          content: 'For Employee: Deferral - not taxed when earned; Growth - not taxed until distributed; Distribution - ordinary income when received; FICA - when no longer subject to substantial risk of forfeiture. For Employer: No deduction when promised, deduction when employee includes in income.'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'NQDC = unsecured promise to pay; executive is a general creditor',
            'Section 409A: Election timing, 6 distribution events, severe penalties',
            '409A violation: Immediate income + 20% penalty + interest from deferral year',
            'Rabbi trust: Protects against management changes, NOT insolvency',
            'FICA taxed when vested; income tax when distributed'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-RET-L014',
    courseId: 'cfp',
    section: 'CFP-RET',
    title: 'Stock Options and Equity Compensation',
    description: 'Compare incentive stock options (ISOs) to non-qualified options (NQSOs)',
    order: 14,
    duration: 55,
    difficulty: 'advanced',
    topics: [
      'Compare incentive stock options (ISOs) to non-qualified options (NQSOs)',
      'Calculate tax consequences of stock option exercises',
      'Explain restricted stock and RSU taxation',
      'Develop exercise and holding strategies'
    ],
    blueprintArea: 'RET-4',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Equity compensation aligns employee interests with shareholders and can create significant wealth—but with complex tax considerations.'
        },
        {
          title: 'Stock Options Basics',
          type: 'table',
          headers: ['Term', 'Definition'],
          rows: [
            ['Grant date', 'When option is awarded'],
            ['Exercise price', 'Price to buy the stock'],
            ['Vesting', 'When option becomes exercisable'],
            ['Expiration', 'When option expires (typically 10 years)'],
            ['Intrinsic value', 'Current price - Exercise price']
          ]
        },
        {
          title: 'Two Types of Stock Options',
          type: 'table',
          headers: ['Feature', 'NQSO', 'ISO'],
          rows: [
            ['Full name', 'Non-Qualified Stock Option', 'Incentive Stock Option'],
            ['Tax at grant', 'None', 'None'],
            ['Tax at exercise', 'Ordinary income on spread', 'No regular tax (AMT preference)'],
            ['Tax at sale', 'Capital gains after exercise', 'Capital gains (if qualified)'],
            ['Employer deduction', 'Yes (at exercise)', 'No'],
            ['$100K annual limit', 'No', 'Yes'],
            ['Holding period for LTCG', '1 year from exercise', '2 years from grant AND 1 year from exercise']
          ]
        },
        {
          title: 'NQSO Tax Treatment',
          type: 'text',
          content: 'At Exercise: Spread (FMV - Exercise Price) = ordinary income, added to W-2. At Sale: Capital gain/loss = Sale Price - FMV at exercise. Holding Period: ≤1 year = STCG, >1 year = LTCG.'
        },
        {
          title: 'NQSO Example',
          type: 'text',
          content: 'Grant at $10 exercise price. Exercise when FMV = $50. Ordinary income = $40/share. Sell at $70. Capital gain = $20/share (from $50 FMV at exercise).'
        },
        {
          title: 'ISO Tax Treatment - Qualified',
          type: 'text',
          content: 'At Exercise: No regular income tax (but spread is AMT preference item). At Sale (if qualified): All gain is LTCG from exercise price. Holding requirements: 2+ years from grant date AND 1+ year from exercise date.'
        },
        {
          title: 'Exam Tip',
          type: 'warning',
          content: 'ISO Holding Period: 2-1 (2 years from grant, 1 year from exercise). Disqualifying disposition (sold before holding periods met) = spread at exercise becomes ordinary income.'
        },
        {
          title: '$100,000 ISO Limit',
          type: 'text',
          content: 'ISOs that first become exercisable in any year cannot exceed $100,000 in value (based on grant date price). Excess is treated as NQSOs.'
        },
        {
          title: 'AMT Planning for ISOs',
          type: 'text',
          content: 'Problem: Exercising ISOs creates AMT preference item equal to the spread—can trigger massive AMT without cash to pay. Strategies: Spread exercises over years, same-year sale (disqualifying), model AMT impact, exercise at low spread.'
        },
        {
          title: 'Restricted Stock and RSUs',
          type: 'table',
          headers: ['Event', 'Restricted Stock', 'RSUs'],
          rows: [
            ['Grant', 'None (unless 83(b) election)', 'None'],
            ['Vesting', 'FMV = ordinary income', 'FMV = ordinary income'],
            ['Sale', 'Capital gain from FMV at vest', 'Capital gain from FMV at vest']
          ]
        },
        {
          title: 'Section 83(b) Election',
          type: 'callout',
          content: 'For restricted stock only (not RSUs). Elect to pay tax at grant instead of vesting. Pay tax on lower value, future appreciation = capital gain. Must file within 30 days of grant. Risk: Forfeit shares = no tax refund.'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'NQSOs: Spread is ordinary income at exercise; employer deduction',
            'ISOs: No regular tax at exercise (AMT preference); LTCG if qualified',
            'ISO holding: 2 years from grant + 1 year from exercise for LTCG',
            '83(b) election for restricted stock: Tax at grant, file within 30 days',
            'RSUs: Taxed at vesting as ordinary income; no 83(b) election'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-RET-L015',
    courseId: 'cfp',
    section: 'CFP-RET',
    title: 'Retirement Planning for Business Owners',
    description: 'Compare retirement plan options for business owners',
    order: 15,
    duration: 50,
    difficulty: 'advanced',
    topics: [
      'Compare retirement plan options for business owners',
      'Calculate maximum contributions for self-employed',
      'Design plans to maximize owner vs. employee contributions',
      'Apply plan selection criteria based on business goals'
    ],
    blueprintArea: 'RET-4',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Business owners have unique retirement planning opportunities—and challenges—compared to employees.'
        },
        {
          title: 'Plan Selection Framework',
          type: 'table',
          headers: ['Factor', 'Question'],
          rows: [
            ['Number of employees', 'Just owner? With employees?'],
            ['Cash flow', 'Predictable or variable?'],
            ['Owner age', 'Younger (more time) or older (catch up)?'],
            ['Contribution goals', 'Maximize for owner or include employees?'],
            ['Administrative burden', 'Want simplicity or flexibility?']
          ]
        },
        {
          title: 'Plan Options Comparison',
          type: 'table',
          headers: ['Plan', 'Max Employer', 'Max Employee', 'Best For'],
          rows: [
            ['SEP-IRA', '25% (20% SE)', 'None', 'Variable income, few employees'],
            ['SIMPLE IRA', '3% match', '$17,000', 'Small employers'],
            ['Solo 401(k)', '25%', '$24,500', 'Solo practitioners'],
            ['Regular 401(k)', '25%', '$24,500', 'Larger businesses'],
            ['Traditional DB', 'Actuarial', 'None', 'Older owners, stable income'],
            ['Cash Balance', 'Actuarial', 'None', 'Professionals wanting high contributions']
          ]
        },
        {
          title: 'Solo 401(k) Deep Dive',
          type: 'text',
          content: 'For self-employed with no employees (except spouse). Employee deferral: $24,500 ($32,000 if 50+). Employer contribution: 20% of net SE income. Total: $71,500 ($79,000 if 50+). Advantages: Roth option available, loans permitted, can contribute more than SEP at lower incomes.'
        },
        {
          title: 'SEP vs. Solo 401(k)',
          type: 'table',
          headers: ['Net SE Income', 'SEP (20%)', 'Solo 401(k)', 'Advantage'],
          rows: [
            ['$50,000', '$10,000', '$34,500 ($24.5K + $10K)', 'Solo +$24,500'],
            ['$100,000', '$20,000', '$44,500', 'Solo +$24,500'],
            ['$200,000', '$40,000', '$64,500', 'Solo +$24,500'],
            ['$360,000+', '$71,500', '$71,500', 'Equal']
          ]
        },
        {
          title: 'Key Insight',
          type: 'callout',
          content: 'Solo 401(k) is almost always better for solo practitioners with income under ~$360,000 because of the employee deferral component.'
        },
        {
          title: 'Defined Benefit Plans for Owners',
          type: 'text',
          content: 'When DB plans shine: Age 50+, high stable income, want large deductions, few/no employees. Maximum benefit (2026): $290,000/year lifetime annuity at 62 OR 100% of 3-year average. Contribution determined by actuary - older owner = larger contribution needed.'
        },
        {
          title: 'DB Contribution Examples',
          type: 'table',
          headers: ['Age', 'Target Benefit', 'Approximate Annual Contribution'],
          rows: [
            ['45', '$200,000/yr', '~$50,000-$70,000'],
            ['55', '$200,000/yr', '~$120,000-$180,000'],
            ['60', '$200,000/yr', '~$200,000+']
          ]
        },
        {
          title: 'Cash Balance Plans',
          type: 'text',
          content: 'Hybrid approach: Legally a defined benefit plan, looks like defined contribution (individual accounts). Pay credit (% of salary) + Interest credit (guaranteed return). Higher contributions than 401(k) limits, can be combined with 401(k).'
        },
        {
          title: 'Owner Strategy by Age',
          type: 'table',
          headers: ['Age Range', 'Recommended Strategy'],
          rows: [
            ['Young (Under 40)', 'Solo 401(k) or SEP - time is the advantage'],
            ['Middle (40-55)', 'Solo 401(k) for most; consider DB add-on if high income'],
            ['Older (55+)', 'Defined Benefit becomes powerful; larger contributions allowed']
          ]
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Solo 401(k) usually beats SEP for self-employed under $345K income',
            'Defined benefit allows largest contributions, especially for older owners',
            'Cash balance plans = hybrid with DB contribution levels, DC appearance',
            'Must cover eligible employees at similar contribution rates',
            'Combine DB + 401(k) for maximum contributions and flexibility'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-RET-L016',
    courseId: 'cfp',
    section: 'CFP-RET',
    title: 'Retirement Plan Distribution Strategies',
    description: 'Apply RMD rules across account types',
    order: 16,
    duration: 50,
    difficulty: 'advanced',
    topics: [
      'Apply RMD rules across account types',
      'Develop tax-efficient distribution sequencing',
      'Evaluate 72(t) substantially equal periodic payments',
      'Plan for qualified charitable distributions'
    ],
    blueprintArea: 'RET-4',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'How and when you take distributions can significantly impact after-tax retirement income.'
        },
        {
          title: 'RMD Requirements by Account Type',
          type: 'table',
          headers: ['Account Type', 'RMDs Required?'],
          rows: [
            ['Traditional IRA', 'Yes'],
            ['SEP-IRA', 'Yes'],
            ['SIMPLE IRA', 'Yes'],
            ['401(k), 403(b), 457(b)', 'Yes (unless still working)'],
            ['Roth IRA', 'No (for original owner)'],
            ['Roth 401(k)', 'No (SECURE 2.0)'],
            ['Inherited IRAs', 'Yes (different rules)']
          ]
        },
        {
          title: 'RMD Aggregation Rules',
          type: 'list',
          items: [
            'Traditional IRAs: Calculate separately, aggregate, satisfy from ANY Traditional IRA',
            '401(k) Plans: Each plan\'s RMD must be taken from that plan',
            '403(b) Plans: Can aggregate like IRAs'
          ]
        },
        {
          title: 'Tax-Efficient Distribution Sequencing',
          type: 'text',
          content: 'Goal: Minimize lifetime taxes, not just current-year taxes. Common ordering (taxable → tax-deferred → tax-free) may not be optimal. Issues: Wasted low brackets early, large RMDs later, IRMAA surcharges, Social Security taxation. Better approach: Fill tax brackets strategically, consider Roth conversions during low-income years.'
        },
        {
          title: 'Roth Conversion Strategies',
          type: 'table',
          headers: ['When to Convert', 'Reason'],
          rows: [
            ['Pre-Social Security', 'Avoid SS taxation'],
            ['Pre-RMD', 'Reduce future RMDs'],
            ['Market downturns', 'Convert more shares for same tax'],
            ['Early retirement', 'Low income years']
          ]
        },
        {
          title: 'Exam Tip',
          type: 'warning',
          content: 'Know the 2026 tax bracket boundaries for MFJ: 10% up to $24,500, 12% up to $99,550, 22% up to $212,300, 24% up to $405,400. Fill lower brackets with taxable income; use Roth for overflow.'
        },
        {
          title: '72(t) SEPP Requirements',
          type: 'table',
          headers: ['Requirement', 'Description'],
          rows: [
            ['Duration', 'At least 5 years OR until age 59½ (whichever is longer)'],
            ['Frequency', 'At least annual payments'],
            ['Methods', 'Life expectancy, Amortization, or Annuitization'],
            ['Modification', 'If modified, 10% penalty applies retroactively']
          ]
        },
        {
          title: '72(t) Example',
          type: 'text',
          content: 'IRA Balance: $500,000, Age: 50, Life expectancy: 34.2 years. Life Expectancy Method: Year 1 = $500,000 / 34.2 = $14,620/year. Amortization (at 5%): ~$30,000/year. Warning: Locked in for 5+ years or until 59½; modification = retroactive penalty on all withdrawals.'
        },
        {
          title: 'Qualified Charitable Distributions (QCDs)',
          type: 'table',
          headers: ['Requirement', 'Detail'],
          rows: [
            ['Age', '70½ or older'],
            ['Amount', 'Up to $105,000/year (2024)'],
            ['Account', 'Traditional IRA only'],
            ['Recipient', 'Qualified 501(c)(3) charity']
          ]
        },
        {
          title: 'QCD Benefits',
          type: 'callout',
          content: 'Not included in income (unlike regular distribution), satisfies RMD, benefits even if taking standard deduction. For those who don\'t itemize, QCD is effectively better than taking distribution and donating.'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'RMD starts at 73 (75 for 1960+); first year can delay to April 1 following',
            'IRAs aggregate for RMDs (distribute from any); 401(k)s do not aggregate',
            'Roth conversions: Fill low brackets in early retirement before SS/RMDs',
            '72(t) SEPP: 5 years or until 59½ (longer); modification = retroactive penalty',
            'QCD at 70½+: Up to $105K excluded from income; counts toward RMD'
          ]
        }
      ]
    }
  }
];

export default CFP_RET4_LESSONS;

/**
 * CFP Domain 6: Retirement Savings and Income Planning
 * Area RET-3: Individual Retirement Accounts
 * 
 * These lessons cover Traditional IRAs, Roth IRAs, SEP-IRAs,
 * SIMPLE IRAs, and IRA distribution rules.
 */

import type { Lesson } from '../../../types';

export const CFP_RET3_LESSONS: Lesson[] = [
  {
    id: 'CFP-RET-L009',
    courseId: 'cfp',
    section: 'CFP-RET',
    title: 'Traditional IRA Rules and Strategies',
    description: 'Explain Traditional IRA contribution eligibility',
    order: 9,
    duration: 50,
    difficulty: 'intermediate',
    topics: [
      'Explain Traditional IRA contribution eligibility',
      'Apply deduction phase-outs for active participants',
      'Calculate deductible and non-deductible contributions',
      'Identify distribution rules and required minimum distributions'
    ],
    blueprintArea: 'RET-3',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'The Traditional IRA is a cornerstone of retirement planning, offering tax-deferred growth and potential tax deductions.'
        },
        {
          title: 'Eligibility',
          type: 'text',
          content: 'Must have earned income (or spouse must). Earned income includes: wages, salaries, tips, self-employment income, alimony (divorce decrees before 2019). Does NOT include: investment income, rental income, pension, Social Security, alimony (2019+).'
        },
        {
          title: 'Contribution Limits (2026)',
          type: 'table',
          headers: ['Age', 'Limit'],
          rows: [
            ['Under 50', '$7,500'],
            ['50+', '$7,500 + $1,000 = $8,500']
          ]
        },
        {
          title: 'No Age Limit',
          type: 'callout',
          content: 'SECURE Act eliminated the age 70½ contribution prohibition. You can contribute at any age with earned income.'
        },
        {
          title: 'Deductibility Rules',
          type: 'text',
          content: 'Not an Active Participant: Full deduction allowed regardless of income. Active Participant (Box 13 on W-2 checked): Deduction phases out based on MAGI.'
        },
        {
          title: 'Active Participant Phase-Outs (2026)',
          type: 'table',
          headers: ['Filing Status', 'MAGI Range', 'Deduction'],
          rows: [
            ['Single/HOH', '≤ $79,000', 'Full'],
            ['Single/HOH', '$79,001 - $89,000', 'Partial'],
            ['Single/HOH', '> $89,000', 'None'],
            ['MFJ', '≤ $126,000', 'Full'],
            ['MFJ', '$126,001 - $146,000', 'Partial'],
            ['MFJ', '> $146,000', 'None'],
            ['Spousal IRA (non-working)', '≤ $236,000', 'Full'],
            ['Spousal IRA (non-working)', '$236,001 - $246,000', 'Partial']
          ]
        },
        {
          title: 'Exam Tip',
          type: 'warning',
          content: 'Being eligible but not contributing to an employer plan still makes you an active participant if employer contributions are made for you. Check Box 13 on W-2.'
        },
        {
          title: 'Non-Deductible Contributions',
          type: 'text',
          content: 'If income exceeds phase-out: Can still contribute $7,500/$8,500. Contribution is not tax-deductible. Must track basis on Form 8606. Earnings still grow tax-deferred. At distribution, pro-rata rule applies across ALL traditional IRAs.'
        },
        {
          title: 'Distribution Rules',
          type: 'text',
          content: 'Penalty-free after age 59½. Distributions taxed as ordinary income (except non-deductible basis). Before 59½: 10% penalty plus ordinary income tax.'
        },
        {
          title: 'Exceptions to 10% Penalty',
          type: 'table',
          headers: ['Exception', 'Details'],
          rows: [
            ['Death', 'To beneficiary'],
            ['Disability', 'Total and permanent'],
            ['Medical expenses', '> 7.5% of AGI'],
            ['Health insurance', 'If unemployed'],
            ['Higher education', 'Qualified expenses'],
            ['First home', 'Up to $10,000 lifetime'],
            ['72(t)', 'Substantially equal payments'],
            ['IRS levy', 'If IRS seizes'],
            ['Birth/adoption', 'Up to $5,000 (SECURE Act)']
          ]
        },
        {
          title: 'Required Minimum Distributions',
          type: 'table',
          headers: ['Birth Year', 'RMD Starting Age'],
          rows: [
            ['Before 1951', '72'],
            ['1951-1959', '73'],
            ['1960+', '75']
          ]
        },
        {
          title: 'RMD Calculation',
          type: 'text',
          content: 'RMD = Dec 31 Prior Year Balance / Distribution Period (Uniform Table). Example: Age 75, balance $500,000. RMD = $500,000 / 24.6 = $20,325. RMD Penalty: 25% on amount not taken (reduced from 50% by SECURE 2.0), reduced to 10% if corrected within 2 years.'
        },
        {
          title: 'IRA Aggregation Rule',
          type: 'text',
          content: 'For RMD purposes: Aggregate balances of all Traditional IRAs, calculate total RMD, can distribute from ANY IRA to satisfy. For Roth IRAs: Separate aggregation with different rules.'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            '2026 limit: $7,500 ($8,500 if 50+) with earned income',
            'Deduction phase-out: Depends on active participant status and MAGI',
            'Non-deductible contributions: Track basis on Form 8606',
            'RMDs start: Age 73 (or 75 for those born 1960+)',
            '10% penalty exceptions: Education, first home, disability, 72(t), more'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-RET-L010',
    courseId: 'cfp',
    section: 'CFP-RET',
    title: 'Roth IRA Rules and Strategies',
    description: 'Explain Roth IRA contribution eligibility and income limits',
    order: 10,
    duration: 55,
    difficulty: 'intermediate',
    topics: [
      'Explain Roth IRA contribution eligibility and income limits',
      'Compare Roth vs. Traditional IRA benefits',
      'Apply the 5-year rules for qualified distributions',
      'Develop Roth conversion strategies'
    ],
    blueprintArea: 'RET-3',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'The Roth IRA offers tax-free growth and tax-free qualified distributions—often the most powerful retirement account.'
        },
        {
          title: 'Why This Matters',
          type: 'callout',
          content: 'Roth IRAs provide tax-free withdrawals, no RMDs for original owner, and excellent estate planning benefits. Understanding when Roth beats Traditional is crucial.'
        },
        {
          title: 'Contribution Limits (2026)',
          type: 'text',
          content: 'Same as Traditional IRA: Under 50: $7,500, Age 50+: $8,500. Combined limit: Traditional + Roth combined cannot exceed $7,500/$8,500.'
        },
        {
          title: 'Income Limits (2026)',
          type: 'table',
          headers: ['Filing Status', 'MAGI', 'Contribution'],
          rows: [
            ['Single/HOH', '< $150,000', 'Full'],
            ['Single/HOH', '$150,000 - $165,000', 'Partial'],
            ['Single/HOH', '> $165,000', 'None'],
            ['MFJ', '< $236,000', 'Full'],
            ['MFJ', '$236,000 - $246,000', 'Partial'],
            ['MFJ', '> $246,000', 'None']
          ]
        },
        {
          title: 'Tax Treatment Comparison',
          type: 'table',
          headers: ['Event', 'Traditional IRA', 'Roth IRA'],
          rows: [
            ['Contribution', 'Tax-deductible (if eligible)', 'Never deductible'],
            ['Growth', 'Tax-deferred', 'Tax-free'],
            ['Qualified Distribution', 'Fully taxable', 'Tax-free'],
            ['Non-qualified Distribution', 'Taxable + penalty', 'Earnings taxable + penalty']
          ]
        },
        {
          title: 'Qualified Distributions (Tax-Free)',
          type: 'text',
          content: 'Must meet BOTH requirements: (1) 5-Year Rule: Account held 5 tax years from first contribution (starts January 1 of contribution year), AND (2) Triggering Event: Age 59½, OR Death, OR Disability, OR First-time home purchase (up to $10,000).'
        },
        {
          title: 'Distribution Ordering Rules',
          type: 'list',
          items: [
            '1. Regular contributions (always tax-free, penalty-free)',
            '2. Conversion amounts (tax-free; penalty if under 59½ and within 5 years)',
            '3. Earnings (taxable + penalty if not qualified)'
          ]
        },
        {
          title: 'Exam Tip',
          type: 'warning',
          content: 'You can always withdraw contributions tax-free and penalty-free at any time! Only earnings are subject to the 5-year rule and triggering event requirements.'
        },
        {
          title: 'Roth Conversions',
          type: 'text',
          content: 'Move money from Traditional IRA to Roth IRA. Pay taxes now on converted amount. Grows tax-free forever. No income limits for conversions. Each conversion has its own 5-year holding period for penalty-free access.'
        },
        {
          title: 'When Conversions Make Sense',
          type: 'table',
          headers: ['Good Time to Convert', 'Why'],
          rows: [
            ['Low-income year', 'Pay taxes at lower rate'],
            ['Early retirement', 'Before SS, RMDs begin'],
            ['Stock market drop', 'Convert more shares for same tax cost'],
            ['Long time horizon', 'More years for tax-free growth'],
            ['Expect higher future rates', 'Pay tax now at lower rates']
          ]
        },
        {
          title: 'Backdoor Roth IRA',
          type: 'text',
          content: 'For high earners above income limits: (1) Contribute to non-deductible Traditional IRA, (2) Convert to Roth IRA immediately, (3) Pay tax only on earnings (minimal if done quickly). Pro-Rata Rule Warning: If you have existing Traditional IRA balances, conversion is taxed proportionally across ALL Traditional IRAs.'
        },
        {
          title: 'Roth vs. Traditional Decision',
          type: 'table',
          headers: ['Choose Roth When', 'Choose Traditional When'],
          rows: [
            ['Current bracket LOWER than retirement', 'Current bracket HIGHER than retirement'],
            ['Long time horizon', 'Shorter time horizon'],
            ['Want tax diversification', 'Need the deduction now'],
            ['Want tax-free inheritance', 'Will be in lower bracket in retirement'],
            ['Want to avoid RMDs', 'N/A']
          ]
        },
        {
          title: 'No RMDs for Roth IRAs',
          type: 'callout',
          content: 'Original owner never has to take RMDs. Money can grow tax-free for entire lifetime. Powerful for estate planning. SECURE 2.0: Roth 401(k) RMDs also eliminated.'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Income limits (2026): Phase-out at $150K-$165K single / $236K-$246K MFJ',
            '5-year rule: Must hold 5 years + triggering event for tax-free earnings',
            'Distribution order: Contributions (tax-free) → Conversions → Earnings',
            'Backdoor Roth: Non-deductible Traditional + convert; beware pro-rata rule',
            'No RMDs for original owner; ideal for estate planning'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-RET-L011',
    courseId: 'cfp',
    section: 'CFP-RET',
    title: 'SEP-IRA and SIMPLE IRA Plans',
    description: 'Explain SEP-IRA eligibility and contribution calculations',
    order: 11,
    duration: 45,
    difficulty: 'intermediate',
    topics: [
      'Explain SEP-IRA eligibility and contribution calculations',
      'Describe SIMPLE IRA rules for small employers',
      'Compare SEP and SIMPLE plans',
      'Apply self-employment contribution calculations'
    ],
    blueprintArea: 'RET-3',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'SEP-IRAs and SIMPLE IRAs allow small businesses and self-employed individuals to establish retirement savings with minimal administrative burden.'
        },
        {
          title: 'SEP-IRA Overview',
          type: 'table',
          headers: ['Feature', 'Description'],
          rows: [
            ['Ideal for', 'Self-employed, small businesses with few employees'],
            ['Contributions', 'Employer only (no employee deferrals)'],
            ['Maximum', '25% of compensation or $71,500 (2026)'],
            ['Deadline', 'Tax return deadline (including extensions)'],
            ['Administration', 'Minimal - just an IRA for each participant'],
            ['Vesting', '100% immediate']
          ]
        },
        {
          title: 'SEP Contribution Calculations',
          type: 'text',
          content: 'For Employees: Contribution = Compensation × 25%. Max $71,500, max compensation considered $360,000. For Self-Employed: Contribution = Net SE Income × 20%. The 20% (not 25%) accounts for the circular calculation where you deduct the contribution from income.'
        },
        {
          title: 'SEP Eligibility Requirements',
          type: 'text',
          content: 'Employer must include employees who: Age 21+, Worked 3 of the last 5 years, Earned at least $750. Warning: Must contribute same percentage for all eligible employees.'
        },
        {
          title: 'SIMPLE IRA Overview',
          type: 'table',
          headers: ['Feature', 'Description'],
          rows: [
            ['Ideal for', 'Small employers (≤100 employees)'],
            ['Contributions', 'Employee deferrals + employer contribution'],
            ['Employee limit (2026)', '$17,000 ($20,500 if 50+)'],
            ['Employer contribution', 'Required (matching or non-elective)'],
            ['Other plans', 'Cannot maintain with other qualified plans']
          ]
        },
        {
          title: 'SIMPLE Employer Contribution Options',
          type: 'list',
          items: [
            'Option 1: Matching - Dollar-for-dollar up to 3% of compensation (can reduce to 2% for 2 of any 5 years)',
            'Option 2: Non-Elective - 2% of compensation to all eligible employees regardless of whether they contribute'
          ]
        },
        {
          title: 'Exam Tip',
          type: 'warning',
          content: 'SIMPLE IRA 2-year rule: If distributions taken within first 2 years of participation, the 10% penalty becomes 25% penalty. After 2 years, standard 10% applies.'
        },
        {
          title: 'SEP vs. SIMPLE Comparison',
          type: 'table',
          headers: ['Feature', 'SEP-IRA', 'SIMPLE IRA'],
          rows: [
            ['Contributions', 'Employer only', 'Employee + Employer'],
            ['Maximum', '25% / $71,500', '$17,000 + match'],
            ['Employer requirement', '3 of 5 years, $750', '2 years, $5,000'],
            ['Employer size', 'Any', '≤100 employees'],
            ['Deadline', 'Tax return deadline', 'October 1 (new plans)'],
            ['Early withdrawal penalty', '10%', '25% (first 2 years)'],
            ['Flexibility', 'More (discretionary)', 'Less (required match)']
          ]
        },
        {
          title: 'Solo 401(k) Alternative',
          type: 'text',
          content: 'For self-employed with no employees (except spouse): Employee deferral $24,500 (+ $7,500 catch-up), Employer contribution 25% of compensation, Total maximum $71,500 ($79,000 with catch-up), Roth option available, Loans permitted. Often better than SEP because of employee deferral component.'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'SEP: Employer-only contributions, 25% of comp (20% for self-employed), $71.5K max',
            'SEP flexibility: Can vary/skip contributions; deadline = tax return deadline',
            'SIMPLE: Employee deferrals $17K + employer 3% match or 2% non-elective',
            'SIMPLE 2-year rule: 25% early withdrawal penalty for first 2 years',
            'Solo 401(k): Often better for solo practitioners (both deferral + employer)'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-RET-L012',
    courseId: 'cfp',
    section: 'CFP-RET',
    title: 'IRA Rollovers and Transfers',
    description: 'Distinguish between direct transfers and rollovers',
    order: 12,
    duration: 45,
    difficulty: 'intermediate',
    topics: [
      'Distinguish between direct transfers and rollovers',
      'Apply the 60-day rollover rule and exceptions',
      'Identify rollover eligibility between account types',
      'Avoid common rollover mistakes and tax traps'
    ],
    blueprintArea: 'RET-3',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Moving retirement assets between accounts is common—but the rules are complex and mistakes are costly.'
        },
        {
          title: 'Transfers vs. Rollovers',
          type: 'table',
          headers: ['Feature', 'Direct Transfer', 'Rollover (60-Day)'],
          rows: [
            ['Method', 'Funds go directly between institutions', 'Check made to participant'],
            ['Reporting', 'No 1099-R taxable event', '1099-R issued'],
            ['Frequency', 'Unlimited', 'One per 12 months (IRA-to-IRA)'],
            ['Withholding', 'None', '20% on employer plans'],
            ['Deadline', 'N/A', '60 days to complete']
          ]
        },
        {
          title: 'Always Prefer Direct Transfer',
          type: 'callout',
          content: 'Direct transfers are simpler, have no limits, no withholding, and no risk of missing deadlines. Always use direct transfer when possible.'
        },
        {
          title: 'One-Rollover-Per-Year Rule',
          type: 'text',
          content: 'Only one IRA-to-IRA rollover (60-day) per 12-month period. Does NOT count: Direct transfers, Rollovers from employer plans, Roth conversions. Violation: Second rollover = taxable distribution + penalty.'
        },
        {
          title: '60-Day Rollover Rule',
          type: 'text',
          content: 'Must deposit funds within 60 days of receipt. Late penalty: Full distribution is taxable + 10% penalty. IRS may grant extension for: Financial institution error, Disability, Death in family, Other valid reasons. Self-certification available under Rev Proc 2016-47.'
        },
        {
          title: 'Rollover Eligibility Chart',
          type: 'table',
          headers: ['From', 'To Traditional IRA', 'To Roth IRA', 'To 401(k)'],
          rows: [
            ['Traditional IRA', '✓', '✓ (conversion)', '✓'],
            ['Roth IRA', '✗', '✓', '✗'],
            ['401(k) Pre-Tax', '✓', '✓ (conversion)', '✓'],
            ['401(k) Roth', '✗', '✓', '✓ Roth'],
            ['403(b)', '✓', '✓ (conversion)', '✓'],
            ['Governmental 457(b)', '✓', '✓ (conversion)', '✓']
          ]
        },
        {
          title: 'Exam Tip',
          type: 'warning',
          content: 'Roth IRAs can ONLY go to Roth IRAs. Non-governmental 457(b) cannot roll to IRA. Pre-tax to Roth = taxable conversion.'
        },
        {
          title: '20% Mandatory Withholding',
          type: 'text',
          content: 'Applies to distributions from employer plans (not IRAs) paid directly to participant. Example: $100,000 distribution = receive $80,000 (20% withheld). To avoid tax on full amount, must deposit $100,000 (find $20,000 elsewhere). Withheld amount recovered at tax filing as refund. Solution: Use direct rollover to avoid withholding.'
        },
        {
          title: 'Common Rollover Mistakes',
          type: 'list',
          items: [
            'Missing 60-day deadline - even one day late = fully taxable',
            'Multiple 60-day rollovers - second IRA-to-IRA in 12 months = taxable',
            'Not making up withholding - shortfall is taxable',
            'Rolling over RMD - RMDs are NOT eligible for rollover',
            'Rolling into wrong account type - Roth to Traditional = excess contribution'
          ]
        },
        {
          title: 'Inherited IRA Rules',
          type: 'text',
          content: 'Non-Spouse Beneficiary: Cannot roll into own IRA, must take distributions (10-year rule for most). Spouse Beneficiary Options: Treat as own IRA, Remain as beneficiary, Roll to own IRA.'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Direct transfer preferred—unlimited, no tax reporting',
            '60-day rule: Funds must be deposited within 60 days',
            'One per year: Only one IRA-to-IRA 60-day rollover per 12 months',
            '20% withholding: Applies to employer plan distributions (not direct)',
            'RMDs cannot be rolled over—take distribution first, then roll excess'
          ]
        }
      ]
    }
  }
];

export default CFP_RET3_LESSONS;

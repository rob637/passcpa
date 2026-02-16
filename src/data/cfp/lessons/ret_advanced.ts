/**
 * CFP Domain 6: Retirement Savings and Income Planning
 * Advanced Retirement Lessons
 * 
 * These lessons cover SECURE 2.0, tax-efficient withdrawals, early retirement,
 * and working in retirement.
 */

import type { Lesson } from '../../../types';

export const CFP_RET6_LESSONS: Lesson[] = [
  {
    id: 'CFP-RET-L021',
    courseId: 'cfp',
    section: 'CFP-RET',
    title: 'SECURE Act 2.0 and Legislative Updates',
    description: 'Apply key provisions of SECURE Act 2.0',
    order: 21,
    duration: 50,
    difficulty: 'intermediate',
    topics: [
      'Apply key provisions of SECURE Act 2.0',
      'Explain changes to RMD rules and age thresholds',
      'Evaluate new Roth options in employer plans',
      'Analyze emergency savings provisions'
    ],
    blueprintArea: 'RET-5',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'SECURE 2.0 (2022) builds on the original SECURE Act (2019), implementing dozens of retirement planning changes. Understanding these provisions is essential for current practice.'
        },
        {
          title: 'RMD Age Changes',
          type: 'table',
          headers: ['Birth Year Range', 'RMD Beginning Age'],
          rows: [
            ['Before 1951', '70½ (old rule)'],
            ['1951-1959', '73 (SECURE 2.0)'],
            ['1960 or later', '75 (effective 2033)']
          ]
        },
        {
          title: 'RMD Penalty Reduction',
          type: 'text',
          content: 'Old rule: 50% penalty on missed RMD. New rule (SECURE 2.0): 25% penalty, reduced to 10% if corrected within 2 years.'
        },
        {
          title: 'Roth Accounts in Plans',
          type: 'callout',
          content: 'Starting 2024, Roth 401(k)/403(b) accounts have NO RMDs for original owner. This aligns them with Roth IRAs—major planning change.'
        },
        {
          title: 'Enhanced Catch-Up Contributions',
          type: 'table',
          headers: ['Age', 'Standard 401(k)/403(b) Limit (2026)', 'Catch-Up'],
          rows: [
            ['Under 50', '$24,500', 'N/A'],
            ['50-59', '$24,500', '+$7,500'],
            ['60-63', '$24,500', '+$11,250 (super catch-up)'],
            ['64+', '$24,500', '+$7,500']
          ]
        },
        {
          title: 'Mandatory Roth Catch-Ups',
          type: 'warning',
          content: 'Starting 2026, catch-up contributions for those earning >$145,000 must be designated Roth. No more pre-tax catch-ups for high earners.'
        },
        {
          title: 'New Account Types and Features',
          type: 'table',
          headers: ['Feature', 'Detail'],
          rows: [
            ['Emergency Savings Accounts', '$2,500 limit, Roth treatment, tax-free withdrawals'],
            ['529-to-Roth Rollovers', '529 must be open 15+ years, $35,000 lifetime limit per beneficiary'],
            ['Starter 401(k)', 'Simplified plan with IRA limits, exempt from testing'],
            ['Student Loan Match', 'Employer can match student loan payments']
          ]
        },
        {
          title: 'Penalty-Free Withdrawals Expanded',
          type: 'table',
          headers: ['Exception', 'Amount', 'Status'],
          rows: [
            ['Domestic abuse victim', 'Lesser of $10,000 or 50% vested', 'New'],
            ['Terminal illness', 'Any amount', 'Clarified'],
            ['Disaster', '$22,000', 'Expanded'],
            ['Emergency personal expenses', '$1,000/year (repayable)', 'New']
          ]
        },
        {
          title: 'Auto-Enrollment Expansion',
          type: 'text',
          content: 'Effective 2025, new 401(k) and 403(b) plans must include automatic enrollment: Initial rate 3-10%, auto-escalation 1%/year until 10-15%, opt-out permitted. Exempted: Plans before 2025, employers with <10 employees, churches, governmental plans.'
        },
        {
          title: 'Summary',
          type: 'summary',
          points: [
            'RMD age rises to 73 (2023) and 75 (2033)',
            'No RMDs from Roth 401(k)/403(b) starting 2024',
            'Super catch-up for ages 60-63 starting 2025',
            '529-to-Roth transfers now possible with restrictions',
            'Student loan matching helps debt-burdened savers'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-RET-L022',
    courseId: 'cfp',
    section: 'CFP-RET',
    title: 'Tax-Efficient Retirement Income Strategies',
    description: 'Optimize withdrawal sequencing across account types',
    order: 22,
    duration: 55,
    difficulty: 'advanced',
    topics: [
      'Optimize withdrawal sequencing across account types',
      'Apply tax bracket management strategies',
      'Evaluate Roth conversion opportunities in retirement',
      'Minimize impact on Social Security and Medicare'
    ],
    blueprintArea: 'RET-3',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'How you withdraw from retirement accounts matters as much as how you save. Strategic withdrawal sequencing can save hundreds of thousands in lifetime taxes.'
        },
        {
          title: 'The Three Account Types',
          type: 'table',
          headers: ['Account Type', 'Contributions', 'Growth', 'Withdrawals'],
          rows: [
            ['Tax-Deferred (Traditional IRA, 401k)', 'Pre-tax deduction', 'Tax-deferred', 'Ordinary income'],
            ['Tax-Free (Roth IRA, Roth 401k)', 'After-tax', 'Tax-free', 'Tax-free (qualified)'],
            ['Taxable (Brokerage)', 'After-tax', 'Taxed annually', 'Capital gains on sale']
          ]
        },
        {
          title: 'Why Sequencing Matters',
          type: 'text',
          content: 'Withdrawing from the wrong account can push you into higher tax brackets, increase Medicare premiums (IRMAA), increase Social Security taxation, and trigger Net Investment Income Tax.'
        },
        {
          title: 'Traditional vs. Dynamic Withdrawal',
          type: 'table',
          headers: ['Traditional Wisdom', 'Problems', 'Better Approach'],
          rows: [
            ['Taxable first', 'Wastes low brackets early', 'Fill low brackets with pre-tax'],
            ['Tax-deferred second', 'Large RMDs later', 'Strategic Roth conversions'],
            ['Tax-free last', 'May not use it yourself', 'Use Roth for bracket overflow']
          ]
        },
        {
          title: 'Dynamic Withdrawal Strategy',
          type: 'table',
          headers: ['Year Type', 'Strategy'],
          rows: [
            ['Low-income years (early retirement)', 'Roth conversions, realize capital gains'],
            ['Pre-RMD years', 'Draw down taxable + strategic conversions'],
            ['RMD years', 'Satisfy RMDs, minimize other taxable income'],
            ['High-income years', 'Tap Roth accounts to avoid bracket creep']
          ]
        },
        {
          title: '2026 Tax Bracket Boundaries (MFJ)',
          type: 'table',
          headers: ['Bracket', 'Top of Bracket'],
          rows: [
            ['10%', '$24,500'],
            ['12%', '$99,550'],
            ['22%', '$212,300'],
            ['24%', '$405,400']
          ]
        },
        {
          title: 'Roth Conversions in Retirement',
          type: 'table',
          headers: ['When Conversions Make Sense', 'Why'],
          rows: [
            ['Early retirement with low income', 'Convert at low rates'],
            ['Before Social Security starts', 'Avoid SS taxation'],
            ['Before RMDs begin', 'Reduce future RMDs'],
            ['Estate planning priority', 'Leave tax-free assets to heirs']
          ]
        },
        {
          title: 'Calculating Conversion "Room"',
          type: 'text',
          content: 'Example: Standard deduction (MFJ) $30,700, Other income $30,000, Top of 12% bracket $99,400. "Room" in 12% bracket = $99,400 - $30,700 - $30,000 = $38,700. Convert up to $38,700 without entering 22% bracket.'
        },
        {
          title: 'Social Security Taxation',
          type: 'table',
          headers: ['Combined Income (MFJ)', '% of SS Taxable'],
          rows: [
            ['<$32,000', '0%'],
            ['$32,000-$44,000', 'Up to 50%'],
            ['>$44,000', 'Up to 85%']
          ]
        },
        {
          title: 'Key Strategy',
          type: 'callout',
          content: 'Roth withdrawals don\'t count in "combined income" for SS taxation or IRMAA thresholds. Use Roth to keep combined income below critical thresholds.'
        },
        {
          title: 'IRMAA Planning',
          type: 'text',
          content: 'Medicare premiums increase for higher earners based on MAGI from 2 years prior. Strategy: Manage income two years before Medicare enrollment, do large Roth conversions before age 63 (before affecting premiums at 65), use Roth distributions to stay below thresholds.'
        },
        {
          title: 'Summary',
          type: 'summary',
          points: [
            'Sequence withdrawals to minimize lifetime taxes, not just this year\'s',
            'Fill lower brackets with taxable income; use Roth for overflow',
            'Convert to Roth during low-income years before RMDs and SS',
            'Roth withdrawals don\'t affect SS taxation or IRMAA',
            'Plan two years ahead for Medicare premium management'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-RET-L023',
    courseId: 'cfp',
    section: 'CFP-RET',
    title: 'Early Retirement Strategies',
    description: 'Apply Rule of 55 and SEPP (72(t)) exceptions',
    order: 23,
    duration: 50,
    difficulty: 'advanced',
    topics: [
      'Apply Rule of 55 and SEPP (72(t)) exceptions',
      'Evaluate bridge strategies to age 59½',
      'Calculate sustainable withdrawal rates for early retirees',
      'Plan healthcare coverage before Medicare eligibility'
    ],
    blueprintArea: 'RET-3',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Retiring before 59½ requires careful planning to access retirement funds without penalties. Understanding the available exceptions is essential.'
        },
        {
          title: 'Key Penalty Exceptions',
          type: 'table',
          headers: ['Exception', '401(k)/403(b)', 'IRA'],
          rows: [
            ['Rule of 55', '✅', '❌'],
            ['SEPP/72(t)', '✅', '✅'],
            ['Disability', '✅', '✅'],
            ['Death', '✅', '✅'],
            ['Medical expenses >7.5% AGI', '✅', '✅'],
            ['First-time home ($10K)', '❌', '✅'],
            ['Higher education', '❌', '✅']
          ]
        },
        {
          title: 'Rule of 55',
          type: 'text',
          content: 'Penalty-free access to 401(k)/403(b) if you leave employment at age 55 or older in the year of separation. Only applies to the plan at that employer—not IRAs, not rolled-over plans from previous employers. SECURE 2.0: Lowered to age 50 for public safety employees.'
        },
        {
          title: 'Exam Tip',
          type: 'warning',
          content: 'If you quit at 54, even if you turn 55 the same year, the Rule of 55 doesn\'t apply. You must be 55 or older in the year of separation.'
        },
        {
          title: 'SEPP (72(t)) Requirements',
          type: 'table',
          headers: ['Requirement', 'Detail'],
          rows: [
            ['Duration', '5 years or until age 59½, whichever is LATER'],
            ['Frequency', 'At least annual payments'],
            ['Methods', 'RMD, Fixed Amortization, Fixed Annuitization'],
            ['Modification', 'If modified, retroactive 10% penalty applies']
          ]
        },
        {
          title: 'SEPP Calculation Example',
          type: 'text',
          content: 'IRA Balance: $1,000,000, Age: 50. Life Expectancy Method: Balance / 34.2 years = ~$29,240/year. Fixed Amortization (at 4%): ~$52,000/year. Warning: Locked in for 9.5 years (longer of 5 years or until 59½). Cannot modify without retroactive penalty.'
        },
        {
          title: 'Taxable Account Bridge Strategy',
          type: 'text',
          content: 'Use taxable investments to fund living expenses until age 59½, leaving retirement accounts intact. Ages 50-54: Live on taxable account. Age 55: Rule of 55 unlocks 401(k). Age 59½: All accounts accessible. Tax efficiency: Long-term capital gains may be taxed at 0%/15%/20%.'
        },
        {
          title: 'Roth Conversion Ladder',
          type: 'key_points',
          points: [
            '1. Convert Traditional IRA to Roth each year',
            '2. Wait 5 years (seasoning requirement)',
            '3. Withdraw converted amounts penalty-free',
            'Each conversion has its own 5-year clock',
            'Requires planning 5+ years ahead'
          ]
        },
        {
          title: 'Healthcare Bridge Options',
          type: 'table',
          headers: ['Option', 'Pros', 'Cons'],
          rows: [
            ['ACA Marketplace', 'Income-based subsidies', 'Must manage income carefully'],
            ['COBRA', 'Continue employer coverage', 'Expensive (full cost + 2%)'],
            ['Spouse coverage', 'May be generous', 'Tied to spouse\'s employment'],
            ['Short-term plans', 'Cheap', 'Limited coverage']
          ]
        },
        {
          title: 'ACA Subsidy Strategy',
          type: 'callout',
          content: 'Keep MAGI below 400% of FPL for premium tax credits (~$60,240 single, ~$124,800 family of 4). Use Roth withdrawals (not counted in MAGI) to stay below subsidy thresholds.'
        },
        {
          title: 'Summary',
          type: 'summary',
          points: [
            'Rule of 55 unlocks 401(k) at separation from service at 55+',
            'SEPP/72(t) allows any-age access with serious commitment',
            'Taxable accounts bridge to 59½ at favorable rates',
            'Roth ladder provides penalty-free access after 5-year seasoning',
            'Healthcare costs are the biggest early retirement wildcard'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-RET-L024',
    courseId: 'cfp',
    section: 'CFP-RET',
    title: 'Working in Retirement',
    description: 'Apply Social Security earnings test rules',
    order: 24,
    duration: 45,
    difficulty: 'intermediate',
    topics: [
      'Apply Social Security earnings test rules',
      'Analyze impact of retirement work on benefits',
      'Evaluate encore career and phased retirement options',
      'Plan for continued retirement contributions'
    ],
    blueprintArea: 'RET-4',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Many retirees continue working for income, purpose, or both. Understanding how work affects retirement benefits is essential.'
        },
        {
          title: 'Social Security Earnings Test (2026)',
          type: 'table',
          headers: ['Age', 'Earnings Limit', 'Penalty'],
          rows: [
            ['Under FRA all year', '$23,400/year', '$1 withheld per $2 over limit'],
            ['Year reaching FRA', '$59,520 (months before FRA)', '$1 withheld per $3 over limit'],
            ['At or after FRA', 'No limit', 'No reduction']
          ]
        },
        {
          title: 'Good News',
          type: 'callout',
          content: 'Withheld benefits aren\'t lost forever. At FRA, benefits are recalculated to account for withheld months, resulting in higher monthly benefit. May "break even" within 12-15 years.'
        },
        {
          title: 'What Counts as Earnings',
          type: 'table',
          headers: ['Counted', 'Not Counted'],
          rows: [
            ['W-2 wages', 'Investment income'],
            ['Self-employment income', 'Pension'],
            ['Bonus, commission', 'IRA/401(k) distributions'],
            ['', 'Capital gains, rental income']
          ]
        },
        {
          title: 'Delayed Retirement Credits',
          type: 'text',
          content: 'Each year past FRA: 8% increase until age 70. Working past FRA and delaying benefits provides both delayed retirement credits AND potentially higher AIME from continued earnings.'
        },
        {
          title: 'Medicare While Working',
          type: 'table',
          headers: ['Situation', 'Primary Payer'],
          rows: [
            ['Employer with <20 employees', 'Medicare'],
            ['Employer with 20+ employees', 'Employer plan'],
            ['Self-employed', 'Medicare']
          ]
        },
        {
          title: 'HSA Considerations',
          type: 'warning',
          content: 'Enrolled in Medicare Part A or B: Cannot contribute to HSA. Still on HDHP, not on Medicare: Can contribute. Stop HSA contributions 6 months before Medicare (retroactive Part A enrollment).'
        },
        {
          title: 'Continuing Retirement Contributions',
          type: 'table',
          headers: ['Account', 'While Working'],
          rows: [
            ['401(k)/403(b)', 'Yes, if employer offers'],
            ['Traditional IRA', 'Yes (with earned income)'],
            ['Roth IRA', 'Yes (income limits apply)'],
            ['SEP-IRA', 'Yes (self-employed income)']
          ]
        },
        {
          title: 'RMDs While Working',
          type: 'table',
          headers: ['Situation', 'RMD Required?'],
          rows: [
            ['Traditional IRA', 'Yes, at RMD age'],
            ['Current employer 401(k)', 'No, if still working (5% exception)'],
            ['Former employer 401(k)', 'Yes'],
            ['Roth IRA', 'No'],
            ['Roth 401(k)', 'No (SECURE 2.0)']
          ]
        },
        {
          title: 'Phased Retirement Options',
          type: 'key_points',
          points: [
            'Employer programs: Reduced hours, in-service distributions (62+), mentoring role',
            'Self-directed: Contract/consultant, encore career, part-time W-2'
          ]
        },
        {
          title: 'Summary',
          type: 'summary',
          points: [
            'Earnings test reduces SS benefits before FRA (but increases later)',
            'Investment income doesn\'t count against earnings test',
            'Delayed retirement credits (8%/year) reward working past FRA',
            'Medicare enrollment timing matters when employer coverage exists',
            'Stop HSA contributions 6 months before Medicare enrollment'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-RET-L025',
    courseId: 'cfp',
    section: 'CFP-RET',
    title: 'Annuities in Retirement Income Planning',
    description: 'Compare immediate vs. deferred annuity structures',
    order: 25,
    duration: 50,
    difficulty: 'advanced',
    topics: [
      'Compare immediate vs. deferred annuity structures',
      'Evaluate income annuity features and guarantees',
      'Apply annuity taxation rules',
      'Determine appropriate annuity allocation in retirement'
    ],
    blueprintArea: 'RET-3',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Annuities can provide guaranteed lifetime income. Understanding when and how to use them helps create secure retirement income plans.'
        },
        {
          title: 'Types of Annuities for Income',
          type: 'table',
          headers: ['Type', 'Purpose', 'Risk'],
          rows: [
            ['SPIA (Single Premium Immediate)', 'Immediate income', 'Longevity protection'],
            ['DIA (Deferred Income)', 'Future income', 'Longevity protection'],
            ['Variable with GLWB', 'Growth + guaranteed floor', 'Market + longevity'],
            ['Fixed Index Annuity', 'Moderate growth + protection', 'Longevity']
          ]
        },
        {
          title: 'SPIA - How It Works',
          type: 'text',
          content: 'Pay lump sum to insurance company. Begin receiving lifetime monthly payments immediately. Payments continue until death (or term/period certain).'
        },
        {
          title: 'SPIA Payment Options',
          type: 'table',
          headers: ['Option', 'Description'],
          rows: [
            ['Life only', 'Highest payout; stops at death'],
            ['Life with period certain', 'Guaranteed period even if death'],
            ['Joint and survivor', 'Covers two lives; lower initial payout'],
            ['Life with cash refund', 'Beneficiaries receive remaining premium']
          ]
        },
        {
          title: 'Deferred Income Annuity (DIA/QLAC)',
          type: 'text',
          content: 'Pay premium now, receive income starting in the future (often 10-20 years later). Benefits: Longevity insurance, lower cost (mortality credits), RMD reduction with QLAC.'
        },
        {
          title: 'QLAC Rules',
          type: 'table',
          headers: ['Rule', 'Detail'],
          rows: [
            ['Maximum purchase', '$200,000 (SECURE 2.0)'],
            ['Account source', 'IRA, 401(k), 403(b)'],
            ['RMD exclusion', 'QLAC value excluded from RMD calculation'],
            ['Start date', 'Can be as late as age 85']
          ]
        },
        {
          title: 'Variable Annuity with GLWB',
          type: 'text',
          content: 'Guaranteed Lifetime Withdrawal Benefit: Benefit base (notional value) for calculating withdrawals. Withdrawal rate typically 4-6% of benefit base guaranteed for life. Step-ups if market performs well. Fees: 0.75-1.5% for rider plus fund expenses.'
        },
        {
          title: 'Annuity Taxation',
          type: 'table',
          headers: ['Phase', 'Non-Qualified', 'Qualified (IRA/401k)'],
          rows: [
            ['Contributions', 'After-tax', 'Pre-tax'],
            ['Growth', 'Tax-deferred', 'Tax-deferred'],
            ['Withdrawal', 'Gain first (LIFO), ordinary income', 'All ordinary income'],
            ['Annuitization', 'Exclusion ratio applies', 'All ordinary income']
          ]
        },
        {
          title: 'Exclusion Ratio Example',
          type: 'text',
          content: 'Premium $100,000, Expected return (total payments) $200,000. Exclusion ratio = 50%. Monthly payment $1,000: Taxable $500, Tax-free return of principal $500.'
        },
        {
          title: 'How Much to Annuitize?',
          type: 'table',
          headers: ['Guideline', 'Rationale'],
          rows: [
            ['Cover essential expenses', 'Annuity income + SS ≥ needs'],
            ['Annuitize 20-40% of portfolio', 'Balance guarantee and flexibility'],
            ['Consider deferred for longevity', 'QLAC or DIA at 10-20%'],
            ['Don\'t over-annuitize', 'Keep liquidity for emergencies/legacy']
          ]
        },
        {
          title: 'When Annuities Make Sense',
          type: 'table',
          headers: ['Good Fit', 'Poor Fit'],
          rows: [
            ['No pension, wants guaranteed income', 'Wealthy with ample assets'],
            ['Long life expectancy', 'Poor health/short life expectancy'],
            ['High legacy priority with guarantees', 'Need maximum flexibility'],
            ['Risk-averse with longevity concern', 'Confident in self-management']
          ]
        },
        {
          title: 'Summary',
          type: 'summary',
          points: [
            'SPIAs provide immediate guaranteed income for life',
            'DIAs/QLACs provide longevity insurance starting later',
            'Variable annuities with GLWB offer market upside with income floor',
            'Exclusion ratio determines tax treatment of non-qualified annuities',
            'Annuitize essential expenses—don\'t over-commit liquidity'
          ]
        }
      ]
    }
  }
];

export default CFP_RET6_LESSONS;

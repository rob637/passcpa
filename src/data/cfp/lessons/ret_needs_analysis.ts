/**
 * CFP Domain 6: Retirement Savings and Income Planning
 * Area RET-1: Retirement Needs Analysis
 * 
 * These lessons cover retirement calculations, Social Security,
 * income replacement, and longevity planning.
 * 
 * Domain 6 is the HIGHEST WEIGHTED (19%) on the CFP exam.
 */

import type { Lesson } from '../../../types';

export const CFP_RET1_LESSONS: Lesson[] = [
  {
    id: 'CFP-RET-L001',
    courseId: 'cfp',
    section: 'CFP-RET',
    title: 'Retirement Needs Analysis Fundamentals',
    description: 'Apply income replacement methodology for retirement projections',
    order: 1,
    duration: 50,
    difficulty: 'intermediate',
    topics: [
      'Apply income replacement methodology for retirement projections',
      'Calculate retirement capital needs using various approaches',
      'Account for inflation in retirement planning',
      'Adjust projections for different retirement dates and life expectancies'
    ],
    blueprintArea: 'RET-1',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Determining how much a client needs for retirement is the cornerstone of retirement planning.'
        },
        {
          title: 'Why This Matters',
          type: 'callout',
          content: 'This is the foundation of all retirement planning. Without accurate needs analysis, all other retirement decisions lack proper context.'
        },
        {
          title: 'The Retirement Planning Process',
          type: 'list',
          items: [
            'Step 1: Estimate Retirement Expenses',
            'Step 2: Identify Guaranteed Income Sources',
            'Step 3: Calculate the Gap (Shortfall)',
            'Step 4: Determine Capital Required',
            'Step 5: Calculate Required Savings'
          ]
        },
        {
          title: 'Income Replacement Approach',
          type: 'text',
          content: 'The traditional guideline is to replace 70-80% of pre-retirement income in retirement. Why not 100%? Because several expenses are reduced or eliminated in retirement.'
        },
        {
          title: 'Expense Changes in Retirement',
          type: 'table',
          headers: ['Expense', 'Change in Retirement'],
          rows: [
            ['FICA taxes (7.65%)', 'Eliminated'],
            ['Retirement savings', 'Eliminated'],
            ['Work-related costs', 'Reduced (commuting, clothes, lunch)'],
            ['Mortgage', 'Often paid off'],
            ['Children expenses', 'Typically reduced'],
            ['Healthcare', 'Often increases'],
            ['Travel/leisure', 'Often increases']
          ]
        },
        {
          title: 'Customizing the Replacement Rate',
          type: 'table',
          headers: ['Client Situation', 'Replacement Rate'],
          rows: [
            ['Frugal, mortgage-free, good health', '60-70%'],
            ['Moderate lifestyle', '75-80%'],
            ['Active lifestyle, high travel', '85-90%'],
            ['Major healthcare needs', '90-100%+']
          ]
        },
        {
          title: 'Expense-Based Approach',
          type: 'text',
          content: 'Build retirement budget from actual expected expenses rather than replacement percentage. This is more accurate than the income replacement approach. Categories to estimate include: Essential Fixed (housing, utilities, insurance), Essential Variable (food, transportation, healthcare), and Discretionary (travel, entertainment, hobbies, gifts).'
        },
        {
          title: 'Inflation\'s Impact on Retirement',
          type: 'text',
          content: 'At 3% inflation: $100,000 today = $74,409 purchasing power in 10 years, $55,368 in 20 years, and $41,199 in 30 years. Future expense needs: Future Need = Today\'s Need × (1 + inflation)^n. Example: Client needs $80,000/year today. In 20 years at 3% inflation: $80,000 × (1.03)^20 = $144,489.'
        },
        {
          title: 'Exam Tip',
          type: 'warning',
          content: 'Two-stage TVM problems are very common on the CFP exam. Master the technique of calculating retirement need first, then calculating required savings.'
        },
        {
          title: 'Capital Needs Analysis Methods',
          type: 'table',
          headers: ['Method', 'Description', 'Pros', 'Cons'],
          rows: [
            ['Capital Preservation', 'Maintain principal; live off earnings only. Capital = Annual Need / Return', 'Never runs out; leaves inheritance', 'Requires very large portfolio'],
            ['Capital Depletion', 'Draw down principal to $0 at life expectancy using TVM annuity', 'Smaller portfolio needed', 'Longevity risk (outliving money)'],
            ['Capital Depletion with Buffer', 'Deplete to a reserve amount, not $0', 'Compromise approach', 'Requires balance']
          ]
        },
        {
          title: 'Two-Stage TVM Retirement Problem',
          type: 'text',
          content: 'Classic CFP exam question example: Current age 45, retirement at 65, life expectancy 90, current expenses $80,000, inflation 3%, pre-retirement return 7%, retirement return 5%, current savings $200,000. Step 1: First-year need = $80K × (1.03)^20 = $144,489. Step 2: Capital needed at retirement for 25-year annuity = $2,035,722. Step 3: FV of current savings = $773,937. Step 4: Shortfall = $1,261,785. Step 5: Annual savings needed = $30,788.'
        },
        {
          title: 'Sensitivity Analysis Variables',
          type: 'table',
          headers: ['Variable', 'Impact if Changed'],
          rows: [
            ['Retirement age', '±1 year = significant change'],
            ['Life expectancy', 'Longer = more capital needed'],
            ['Return assumptions', 'Lower = more savings needed'],
            ['Inflation', 'Higher = more capital needed'],
            ['Spending level', '10% cut = major savings reduction']
          ]
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Income replacement: 70-80% is a guideline; customize to client',
            'Expense budgeting is more accurate than replacement percentages',
            'Inflation compounds; $80K today ≠ $80K in 20 years',
            'Two approaches: Capital preservation vs. Capital depletion',
            'Two-stage TVM: Calculate retirement need → Calculate savings required'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-RET-L002',
    courseId: 'cfp',
    section: 'CFP-RET',
    title: 'Social Security Retirement Benefits',
    description: 'Explain Social Security eligibility and benefit calculation',
    order: 2,
    duration: 55,
    difficulty: 'intermediate',
    topics: [
      'Explain Social Security eligibility and benefit calculation',
      'Compare claiming ages and their impact on benefits',
      'Apply spousal, survivor, and divorced spouse benefits',
      'Develop Social Security claiming strategies'
    ],
    blueprintArea: 'RET-1',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Social Security provides foundational retirement income for most Americans. Understanding its rules is essential for retirement planning.'
        },
        {
          title: 'Why This Matters',
          type: 'callout',
          content: 'Social Security typically replaces about 40% of pre-retirement income for average earners. Optimizing claiming strategy can add tens of thousands to lifetime benefits.'
        },
        {
          title: 'Eligibility Requirements',
          type: 'text',
          content: 'Need 40 credits (10 years of work) for retirement benefits. Earn up to 4 credits per year. In 2026, $1,810 in earnings = 1 credit.'
        },
        {
          title: 'Full Retirement Age (FRA)',
          type: 'table',
          headers: ['Birth Year', 'FRA'],
          rows: [
            ['1943-1954', '66'],
            ['1955', '66 + 2 months'],
            ['1956', '66 + 4 months'],
            ['1957', '66 + 6 months'],
            ['1958', '66 + 8 months'],
            ['1959', '66 + 10 months'],
            ['1960+', '67']
          ]
        },
        {
          title: 'Benefit Calculation',
          type: 'text',
          content: 'Step 1: Calculate AIME (Average Indexed Monthly Earnings) - index each year\'s earnings, take highest 35 years, divide by 420 months. Step 2: Apply PIA Formula using bend points - for 2026: 90% of first $1,226 AIME + 32% of AIME $1,226-$7,391 + 15% of AIME above $7,391.'
        },
        {
          title: 'Claiming Age Impact',
          type: 'table',
          headers: ['Claim Age (FRA=67)', '% of PIA'],
          rows: [
            ['62', '70%'],
            ['63', '75%'],
            ['64', '80%'],
            ['65', '86.7%'],
            ['66', '93.3%'],
            ['67 (FRA)', '100%'],
            ['68', '108%'],
            ['69', '116%'],
            ['70', '124%']
          ]
        },
        {
          title: 'Early Retirement Reduction',
          type: 'text',
          content: 'Benefits reduced by 5/9 of 1% for each month before FRA (first 36 months), then 5/12 of 1% for each additional month beyond 36. If FRA is 67, claiming at 62 = 30% reduction.'
        },
        {
          title: 'Delayed Retirement Credits',
          type: 'text',
          content: 'Benefits increase 8% per year after FRA until age 70. If FRA is 67 and you claim at 70, that\'s a 24% increase.'
        },
        {
          title: 'Spousal Benefits',
          type: 'text',
          content: 'Eligibility: Married at least 1 year, spouse has filed. Benefit: Up to 50% of spouse\'s PIA at spousal FRA. Reduced if claimed before FRA. No delayed credits after FRA. Social Security pays the higher of worker\'s own benefit OR spousal benefit.'
        },
        {
          title: 'Survivor Benefits',
          type: 'table',
          headers: ['Beneficiary', 'Benefit Amount'],
          rows: [
            ['Surviving spouse at FRA+', '100% of deceased\'s benefit'],
            ['Surviving spouse before FRA', 'Reduced (can claim as early as 60)'],
            ['Disabled spouse (50-59)', 'Reduced benefit'],
            ['Caring for child under 16', '75% regardless of age'],
            ['Children (under 18 or disabled)', '75% of deceased\'s PIA']
          ]
        },
        {
          title: 'Exam Tip',
          type: 'warning',
          content: 'For divorced spouse benefits, remember the "10-year rule" - marriage must have lasted 10+ years, currently unmarried (or remarried after 60), age 62+, doesn\'t reduce ex-spouse\'s benefit.'
        },
        {
          title: 'Taxation of Benefits',
          type: 'table',
          headers: ['Filing Status', 'Combined Income', '% Taxable'],
          rows: [
            ['Single', '< $25,000', '0%'],
            ['Single', '$25,000 - $34,000', 'Up to 50%'],
            ['Single', '> $34,000', 'Up to 85%'],
            ['MFJ', '< $32,000', '0%'],
            ['MFJ', '$32,000 - $44,000', 'Up to 50%'],
            ['MFJ', '> $44,000', 'Up to 85%']
          ]
        },
        {
          title: 'Earnings Test (Before FRA)',
          type: 'text',
          content: 'Under FRA all year: $1 withheld for every $2 earned above $23,400 (2026). Year reaching FRA: $1 withheld for every $3 earned above $59,520. At or after FRA: NO earnings test. Important: Withheld benefits are added back at FRA.'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            '40 credits (10 years) for eligibility; 35 best years for calculation',
            'FRA is 67 for those born 1960+; claiming early = permanent reduction',
            'Delayed credits: 8%/year increase until 70 (max 24-32% boost)',
            'Spousal: Up to 50% of spouse\'s PIA; no delayed credits',
            'Divorced spouse: 10-year marriage; can claim on ex without reducing their benefit'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-RET-L003',
    courseId: 'cfp',
    section: 'CFP-RET',
    title: 'Medicare and Healthcare in Retirement',
    description: 'Explain Medicare eligibility and enrollment periods',
    order: 3,
    duration: 50,
    difficulty: 'intermediate',
    topics: [
      'Explain Medicare eligibility and enrollment periods',
      'Compare Parts A, B, C, and D coverage',
      'Calculate Medicare premiums including IRMAA',
      'Evaluate Medigap and Medicare Advantage options'
    ],
    blueprintArea: 'RET-1',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Healthcare costs are often the largest expense in retirement. Understanding Medicare is essential for retirement planning.'
        },
        {
          title: 'Why This Matters',
          type: 'callout',
          content: 'Fidelity estimates a 65-year-old couple needs approximately $315,000 for healthcare in retirement (not including long-term care). Medicare decisions made at enrollment are often permanent.'
        },
        {
          title: 'Medicare Eligibility',
          type: 'text',
          content: 'Automatic enrollment at age 65 if receiving Social Security, or for End-Stage Renal Disease (ESRD) or ALS at any age, or disability (after 24 months of SSDI). Initial Enrollment Period (IEP) is a 7-month window: 3 months before, month of, and 3 months after 65th birthday.'
        },
        {
          title: 'Exam Tip',
          type: 'warning',
          content: 'Late enrollment in Part B = permanent penalties! The penalty is 10% per 12-month period of delay, added to premiums for life.'
        },
        {
          title: 'The Four Parts of Medicare',
          type: 'table',
          headers: ['Part', 'Coverage', 'Premium (2026)', 'Key Details'],
          rows: [
            ['A - Hospital', 'Inpatient hospital, SNF, home health, hospice', 'Free (40+ quarters)', 'Deductible $1,700 per benefit period'],
            ['B - Medical', 'Doctor visits, outpatient, preventive', '$185/month standard', '20% coinsurance after $257 deductible'],
            ['C - Medicare Advantage', 'Private alternative combining A+B (often +D)', 'Often $0 beyond Part B', 'Network restrictions, OOP max required'],
            ['D - Prescription Drugs', 'Prescription coverage', 'Varies by plan', 'Coverage gap (donut hole) applies']
          ]
        },
        {
          title: 'IRMAA - Income-Related Adjustments',
          type: 'text',
          content: 'High-income beneficiaries pay more for Parts B and D. Based on tax return from 2 years prior. Can request new determination for life-changing events (retirement, death of spouse, divorce).'
        },
        {
          title: 'Part B Monthly IRMAA (2026)',
          type: 'table',
          headers: ['Single MAGI', 'Married MAGI', 'Part B Total'],
          rows: [
            ['≤ $106,000', '≤ $212,000', '$185.00'],
            ['$106,001-$133,000', '$212,001-$266,000', '$259.00'],
            ['$133,001-$167,000', '$266,001-$334,000', '$370.00'],
            ['$167,001-$200,000', '$334,001-$400,000', '$481.00'],
            ['$200,001-$500,000', '$400,001-$750,000', '$592.00'],
            ['≥ $500,001', '≥ $750,001', '$628.00']
          ]
        },
        {
          title: 'Medigap (Medicare Supplement) Policies',
          type: 'text',
          content: 'Covers gaps in Original Medicare (A+B): Part A/B deductibles, Part B coinsurance (20%), excess charges. 10 standardized plans. Plan G is most popular for new enrollees. Plan F closed to new enrollees after 2020. Open Enrollment: 6 months starting at 65 + Part B = guaranteed issue, no health questions.'
        },
        {
          title: 'Medicare Advantage vs. Original Medicare + Medigap',
          type: 'table',
          headers: ['Factor', 'Original + Medigap', 'Medicare Advantage'],
          rows: [
            ['Premium', 'Higher (Medigap + D)', 'Often $0'],
            ['Network', 'Any Medicare provider', 'Restricted network'],
            ['Out-of-pocket max', 'None unless Medigap', 'Required ($7,550 max)'],
            ['Drug coverage', 'Separate Part D', 'Usually included'],
            ['Extra benefits', 'None', 'Dental, vision, hearing common'],
            ['Flexibility', 'High', 'Lower']
          ]
        },
        {
          title: 'Key Enrollment Periods',
          type: 'table',
          headers: ['Period', 'When', 'What You Can Do'],
          rows: [
            ['IEP (Initial)', '7 months around 65th birthday', 'Enroll in A, B, D, Medigap'],
            ['OEP (Open)', 'Jan 1 - March 31', 'Switch MA plans, drop MA for Original'],
            ['AEP (Annual)', 'Oct 15 - Dec 7', 'Switch MA, add/change Part D'],
            ['SEP (Special)', 'Varies by situation', 'Triggered by qualifying event']
          ]
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Part A (hospital) usually free; Part B (medical) $185/mo standard',
            'Medicare Advantage (Part C) = private alternative with network restrictions',
            'IRMAA applies to high-income: based on MAGI from 2 years prior',
            'Medigap Open Enrollment: 6 months at age 65 + Part B; guaranteed issue',
            'Retirement healthcare estimate: ~$315,000/couple (not including LTC)'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-RET-L004',
    courseId: 'cfp',
    section: 'CFP-RET',
    title: 'Longevity Risk and Retirement Distribution Strategies',
    description: 'Assess longevity risk in retirement planning',
    order: 4,
    duration: 50,
    difficulty: 'advanced',
    topics: [
      'Assess longevity risk in retirement planning',
      'Apply sustainable withdrawal rate strategies',
      'Sequence distributions for tax efficiency',
      'Manage sequence-of-returns risk'
    ],
    blueprintArea: 'RET-1',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'The biggest risk in retirement isn\'t market volatility—it\'s running out of money. Understanding longevity risk and distribution strategies is critical.'
        },
        {
          title: 'Why This Matters',
          type: 'callout',
          content: 'People underestimate how long they\'ll live. 50%+ of couples will have at least one spouse live to age 90. Plan to age 95 for singles or longer for couples.'
        },
        {
          title: 'Life Expectancy Statistics',
          type: 'table',
          headers: ['Gender', 'At Age 65', '% Living to 90'],
          rows: [
            ['Male', '19.5 years (to 84.5)', '26%'],
            ['Female', '21.9 years (to 86.9)', '38%'],
            ['Couple (at least one)', '25 years', '50%+']
          ]
        },
        {
          title: 'The 4% Rule (Bengen)',
          type: 'text',
          content: 'William Bengen\'s 1994 analysis: Withdraw 4% of initial portfolio in year 1, increase by inflation each year. This historically sustained 30-year retirements using 50/50 stocks/bonds. Example: $1,000,000 portfolio → $40,000 Year 1 → $41,200 Year 2 (3% inflation) → $42,436 Year 3.'
        },
        {
          title: 'Criticisms of 4% Rule',
          type: 'table',
          headers: ['Issue', 'Concern'],
          rows: [
            ['Historical returns may not repeat', 'Future returns may be lower'],
            ['30-year horizon', 'Many retirements exceed 30 years'],
            ['Rigid withdrawals', 'Doesn\'t adapt to market conditions'],
            ['Bond yields historically higher', 'Today\'s yields are lower']
          ]
        },
        {
          title: 'Dynamic Withdrawal Strategies',
          type: 'list',
          items: [
            'Guardrails Approach (Guyton-Klinger): Adjust withdrawals based on portfolio performance with set thresholds',
            'RMD Method: Divide portfolio by remaining life expectancy each year - naturally adjusts',
            'Bucket Strategy: Segment by time horizon - Cash (1-2 years), Bonds (3-7 years), Stocks (8+ years)'
          ]
        },
        {
          title: 'Sequence-of-Returns Risk',
          type: 'text',
          content: 'WHEN returns occur matters as much as TOTAL returns. Poor early returns combined with withdrawals = rapid depletion. Two portfolios with identical 4% average returns can have vastly different outcomes depending on the sequence.'
        },
        {
          title: 'Exam Tip',
          type: 'warning',
          content: 'Sequence risk is greatest in early retirement. Strategies to mitigate: reduce equity exposure early, maintain cash buffer, flexible spending in down years, delay Social Security.'
        },
        {
          title: 'Tax-Efficient Distribution Sequencing',
          type: 'text',
          content: 'Traditional wisdom (taxable first, tax-deferred second, tax-free last) may not be optimal. Issues: Large RMDs later, IRMAA triggers, wasted low bracket space. Better approach: Fill tax brackets strategically, consider Roth conversions during low-income years.'
        },
        {
          title: 'Account Ordering Based on Tax Status',
          type: 'table',
          headers: ['Current Situation', 'Strategy'],
          rows: [
            ['Low bracket now, higher later', 'Draw pre-tax now; protect Roth'],
            ['High bracket now, lower later', 'Draw Roth/taxable; defer pre-tax'],
            ['Consistent brackets', 'Balance based on legacy goals']
          ]
        },
        {
          title: 'Guaranteed Income Floor',
          type: 'text',
          content: 'Cover essential expenses with guaranteed income: Social Security, pensions, income annuities. Formula: Income Floor = Essential Expenses. If floor is insufficient, consider SPIA (Single Premium Immediate Annuity) or DIA (Deferred Income Annuity).'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Plan to age 95 (50%+ of couples see one spouse reach 90)',
            '4% rule = $40,000/year per $1M; 3.5% may be safer today',
            'Sequence risk: Poor early returns + withdrawals = rapid depletion',
            'Tax sequencing: Fill lower tax brackets strategically, not just "taxable first"',
            'Cover essential expenses with guaranteed income (SS, pension, annuities)'
          ]
        }
      ]
    }
  }
];

export default CFP_RET1_LESSONS;

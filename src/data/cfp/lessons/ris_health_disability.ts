/**
 * CFP Risk Management Lessons - Health and Disability Insurance
 * Domain 3: Risk Management and Insurance Planning (12% of exam)
 * Blueprint Area: RIS-3 - Health, Disability, and Long-Term Care Insurance
 * 
 * Topics: Health plans, disability income, long-term care
 */

import type { Lesson } from '../../../types';

export const CFP_RIS3_LESSONS: Lesson[] = [
  {
    id: 'CFP-RIS-L008',
    courseId: 'cfp',
    section: 'CFP-RISK',
    title: 'Health Insurance Fundamentals',
    description: 'Distinguish health plan types, understand ACA provisions, and apply health insurance cost-sharing concepts',
    order: 8,
    duration: 30,
    difficulty: 'intermediate',
    topics: [
      'Distinguish health plan types',
      'Understand ACA provisions',
      'Compare employer vs. individual coverage',
      'Apply health insurance cost-sharing concepts'
    ],
    blueprintArea: 'RIS-3',
    content: {
      sections: [
        {
          title: 'Health Plan Cost-Sharing Terms',
          type: 'list',
          items: [
            'Premium: Monthly cost for coverage',
            'Deductible: Annual out-of-pocket before insurance pays',
            'Copayment: Fixed amount per service (e.g., $30 doctor visit)',
            'Coinsurance: Percentage split (e.g., 80/20 after deductible)',
            'Out-of-Pocket Maximum: Cap on annual cost-sharing; 2026 limit: $9,800 individual / $19,600 family'
          ]
        },
        {
          title: 'Cost-Sharing Example',
          type: 'table',
          headers: ['Event', 'Amount'],
          rows: [
            ['Surgery cost', '$25,000'],
            ['Deductible (paid)', '$2,000'],
            ['Remaining', '$23,000'],
            ['Coinsurance (20%)', '$4,600'],
            ['Patient pays', '$6,600']
          ]
        },
        {
          title: 'Types of Health Plans',
          type: 'table',
          headers: ['Feature', 'HMO', 'PPO', 'EPO', 'POS'],
          rows: [
            ['Network required', 'Yes', 'No', 'Yes', 'Yes'],
            ['Referrals', 'Yes', 'No', 'No', 'Yes'],
            ['Out-of-network', 'No', 'Yes', 'No', 'Yes'],
            ['Cost', 'Lowest', 'Highest', 'Mid', 'Mid']
          ]
        },
        {
          title: 'Plan Type Details',
          type: 'list',
          items: [
            'HMO (Health Maintenance Organization): Closed network, requires PCP, referrals required, lowest premiums',
            'PPO (Preferred Provider Organization): In-network preferred, no PCP/referrals required, out-of-network covered at higher cost',
            'EPO (Exclusive Provider Organization): Must use network (like HMO), no referrals required, out-of-network not covered',
            'POS (Point of Service): Hybrid HMO/PPO, referrals required for specialists, out-of-network covered with referral'
          ]
        },
        {
          title: 'High Deductible Health Plan (HDHP)',
          type: 'text',
          content: 'HDHPs have minimum deductible of $1,600 individual / $3,200 family (2024), maximum out-of-pocket of $8,050 individual / $16,100 family. They offer lower premiums but higher cost-sharing.'
        },
        {
          title: 'Health Savings Account (HSA)',
          type: 'callout',
          content: 'HSA Triple Tax Advantage: (1) Tax-deductible contributions, (2) Tax-deferred growth, (3) Tax-free qualified withdrawals. Eligibility requires HDHP enrollment, no other health coverage, not on Medicare, not claimed as dependent.'
        },
        {
          title: 'HSA Contribution Limits (2026)',
          type: 'list',
          items: [
            'Individual: $4,450',
            'Family: $8,900',
            'Catch-up (55+): Additional $1,000'
          ]
        },
        {
          title: 'HSA vs. FSA Comparison',
          type: 'table',
          headers: ['Feature', 'HSA', 'FSA'],
          rows: [
            ['Portability', 'Yes', 'No'],
            ['Rollover', 'Unlimited', 'Limited ($670)'],
            ['Investment option', 'Yes', 'No'],
            ['HDHP required', 'Yes', 'No'],
            ['Ownership', 'Employee', 'Employer']
          ]
        },
        {
          title: 'ACA Essential Health Benefits',
          type: 'list',
          items: [
            'Ambulatory care',
            'Emergency services',
            'Hospitalization',
            'Maternity/newborn',
            'Mental health',
            'Prescription drugs',
            'Rehabilitative services',
            'Lab services',
            'Preventive care',
            'Pediatric (dental/vision)'
          ]
        },
        {
          title: 'ACA Coverage Mandates',
          type: 'list',
          items: [
            'No lifetime/annual limits',
            'Dependent coverage to age 26',
            'No pre-existing condition exclusions',
            'Preventive care with no cost-sharing'
          ]
        },
        {
          title: 'Metal Tiers (Actuarial Value)',
          type: 'table',
          headers: ['Tier', 'Plan Pays'],
          rows: [
            ['Bronze', '60%'],
            ['Silver', '70%'],
            ['Gold', '80%'],
            ['Platinum', '90%']
          ]
        },
        {
          title: 'Exam Tip: HSA Triple Tax',
          type: 'warning',
          content: 'Remember HSA Triple Tax: Tax-deductible in, Tax-free growth, Tax-free out (for medical). FSAs are use-it-or-lose-it while HSAs roll over and are portable.'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'HMOs require network use and referrals; lowest cost but least flexibility',
            'PPOs allow out-of-network care at higher cost; most flexibility',
            'HSAs require HDHP enrollment and offer triple tax advantage',
            'FSAs are use-it-or-lose-it; HSAs roll over and are portable',
            'ACA metal tiers reflect actuarial value: Bronze (60%) to Platinum (90%)'
          ]
        }
      ]
    }
  },
  {
    id: 'CFP-RIS-L009',
    courseId: 'cfp',
    section: 'CFP-RISK',
    title: 'Disability Income Insurance',
    description: 'Calculate disability income needs and compare disability policy features including definitions',
    order: 9,
    duration: 30,
    difficulty: 'intermediate',
    topics: [
      'Calculate disability income needs',
      'Compare disability policy features',
      'Distinguish own-occupation vs. any-occupation definitions',
      'Understand tax treatment of disability benefits'
    ],
    blueprintArea: 'RIS-3',
    content: {
      sections: [
        {
          title: 'The Need for Disability Insurance',
          type: 'callout',
          content: '1 in 4 workers become disabled before retirement. Average disability lasts over 34 months. Disability is the most underinsured risk. Income replacement need is generally 60-70% of gross income.'
        },
        {
          title: 'Definition of Disability',
          type: 'list',
          items: [
            'Own-Occupation: Cannot perform YOUR occupation; can work in another field and collect benefits; best protection (highest cost)',
            'Any-Occupation: Cannot perform ANY occupation for which suited; more restrictive; lower premiums',
            'Split Definition: Own-occupation for 2-5 years, then any-occupation',
            'Presumptive Disability: Automatic total disability for loss of sight, hands/feet, hearing/speech'
          ]
        },
        {
          title: 'Benefit Period Options',
          type: 'table',
          headers: ['Period', 'Description', 'Cost'],
          rows: [
            ['2 years', 'Short-term', 'Lowest'],
            ['5 years', 'Medium-term', 'Moderate'],
            ['To age 65', 'Career coverage', 'Higher'],
            ['Lifetime', 'Maximum', 'Highest']
          ]
        },
        {
          title: 'Elimination Period (Waiting Period)',
          type: 'table',
          headers: ['Period', 'Premium Impact'],
          rows: [
            ['30 days', 'Highest premium'],
            ['60 days', 'Moderate'],
            ['90 days', 'Most common'],
            ['180-365 days', 'Lowest premium']
          ]
        },
        {
          title: 'Optional Riders',
          type: 'list',
          items: [
            'Cost-of-Living Adjustment (COLA): Benefits increase with inflation (CPI); adds 20-40% to premium',
            'Future Purchase Option: Buy additional coverage without evidence; triggered by income increases; critical for young professionals',
            'Residual/Partial Disability: Benefits for reduced income even if able to work part-time',
            'Return of Premium: Refunds premiums if not disabled; significant cost increase'
          ]
        },
        {
          title: 'Residual Disability Formula',
          type: 'text',
          content: 'Residual Benefit = [(Prior Income - Current Income) ÷ Prior Income] × Total Monthly Benefit. Example: Prior income $10,000, current income $4,000, total benefit $6,000. Residual = 60% × $6,000 = $3,600.'
        },
        {
          title: 'Group vs. Individual Disability',
          type: 'table',
          headers: ['Feature', 'Group (Employer)', 'Individual'],
          rows: [
            ['Cost', 'Lower/no cost', 'Higher'],
            ['Portability', 'Not portable', 'Portable'],
            ['Definition', 'Any-occupation common', 'Own-occupation available'],
            ['Benefits tax', 'Taxable (if employer pays)', 'Tax-free (if you pay)'],
            ['Underwriting', 'Guaranteed issue', 'Required']
          ]
        },
        {
          title: 'Tax Treatment of Disability',
          type: 'table',
          headers: ['Who Paid Premium', 'Benefits Taxation'],
          rows: [
            ['Employer (pre-tax)', 'Taxable'],
            ['Employee (after-tax)', 'Tax-free'],
            ['Split', 'Proportional']
          ]
        },
        {
          title: 'Exam Tip: OAR Mnemonic',
          type: 'warning',
          content: 'Disability Definitions: Own-occupation (best), Any-occupation (restrictive), Residual/partial. Key rule: Pay premiums with after-tax dollars to receive tax-free benefits.'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Own-occupation definition is most favorable; any-occupation is restrictive',
            'Longer elimination periods reduce premiums significantly',
            'COLA rider protects against inflation during long-term disability',
            'Individual policies are portable with tax-free benefits (if you pay)',
            'Benefits taxable only if employer paid premiums as untaxed benefit'
          ]
        }
      ]
    }
  },
  {
    id: 'CFP-RIS-L010',
    courseId: 'cfp',
    section: 'CFP-RISK',
    title: 'Long-Term Care Insurance',
    description: 'Understand LTC coverage triggers, compare policy features, and apply tax treatment of LTC policies',
    order: 10,
    duration: 30,
    difficulty: 'intermediate',
    topics: [
      'Understand LTC coverage triggers',
      'Compare LTC policy features',
      'Explain partnership programs',
      'Apply tax treatment of LTC policies'
    ],
    blueprintArea: 'RIS-3',
    content: {
      sections: [
        {
          title: 'Understanding Long-Term Care',
          type: 'text',
          content: 'Long-term care provides assistance with daily living activities for extended periods, including nursing home care, assisted living, home health care, and adult day care. 70% of people over 65 will need some LTC. Average nursing home costs $108,000/year (private room). Medicare does NOT cover custodial care.'
        },
        {
          title: 'Activities of Daily Living (ADLs)',
          type: 'callout',
          content: 'Most policies require inability to perform 2 of 6 ADLs to trigger benefits: Bathing, Dressing, Toileting, Transferring (moving in/out of bed), Continence, Eating. Cognitive impairment (Alzheimer\'s, dementia) triggers benefits even if ADLs intact.'
        },
        {
          title: 'Benefit Period Options',
          type: 'table',
          headers: ['Period', 'Description'],
          rows: [
            ['2 years', 'Basic protection'],
            ['3 years', 'Average need'],
            ['5 years', 'Good protection'],
            ['Lifetime', 'Maximum (expensive)']
          ]
        },
        {
          title: 'Policy Features',
          type: 'list',
          items: [
            'Benefit Amount: Daily or monthly benefit, typical $150-$400/day based on cost of care in your area',
            'Elimination Period: Waiting period before benefits begin; 30, 60, 90 days common; longer period = lower premium',
            'Care Settings Covered: Nursing home, assisted living, memory care, home health care, adult day care, hospice'
          ]
        },
        {
          title: 'Inflation Protection',
          type: 'table',
          headers: ['Type', 'Protection', 'Cost'],
          rows: [
            ['None', 'Benefit erodes', 'Lowest'],
            ['Simple 5%', 'Moderate', 'Moderate'],
            ['Compound 5%', 'Strong', 'Highest']
          ]
        },
        {
          title: 'Simple vs Compound Inflation',
          type: 'text',
          content: 'Simple inflation increases by fixed percentage of original benefit (e.g., $200/day × 5% = $10 increase annually). Compound inflation increases by percentage of current benefit ($200 → $210 → $220.50 → $231.53...).'
        },
        {
          title: 'Tax-Qualified LTC Policy Requirements',
          type: 'list',
          items: [
            'No prior hospitalization required',
            '2 of 6 ADLs or cognitive impairment trigger',
            '90-day certification of condition',
            'Following plan of care'
          ]
        },
        {
          title: '2026 Age-Based Premium Limits',
          type: 'table',
          headers: ['Age', 'Limit'],
          rows: [
            ['40 or under', '$510'],
            ['41-50', '$960'],
            ['51-60', '$1,910'],
            ['61-70', '$5,090'],
            ['71+', '$6,350']
          ]
        },
        {
          title: 'LTC Tax Treatment',
          type: 'text',
          content: 'Premiums are deductible as medical expense (subject to 7.5% AGI floor) up to age-based limits. Benefits are tax-free up to per diem limit ($420/day in 2024) or actual care costs (unlimited).'
        },
        {
          title: 'Partnership Policies',
          type: 'callout',
          content: 'Partnership policies protect assets from Medicaid spend-down. How it works: Buy state-approved partnership policy, receive policy benefits, if exhausted and need Medicaid, you can keep assets equal to benefits received. Example: $300,000 policy allows keeping $302,000 in assets instead of normal $2,000 Medicaid limit.'
        },
        {
          title: 'Hybrid/Combination Policies',
          type: 'list',
          items: [
            'Life Insurance + LTC: Death benefit with LTC rider; use death benefit for LTC if needed; remaining death benefit to heirs',
            'Advantages: Benefits used either way; no "use it or lose it"; single premium options',
            'Considerations: Higher initial cost; may reduce life insurance to family'
          ]
        },
        {
          title: 'Exam Tip: BEDICCT Mnemonic',
          type: 'warning',
          content: 'ADLs: Bathing, Eating, Dressing, (Incontinence) Continence, Continence, Transferring, Toileting.'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'LTC triggers: inability to perform 2 of 6 ADLs OR cognitive impairment',
            'Medicare does NOT cover custodial/long-term care',
            'Compound inflation protection provides strongest benefit growth',
            'Partnership policies protect assets from Medicaid spend-down',
            'Hybrid policies combine life insurance with LTC benefits'
          ]
        }
      ]
    }
  },
  {
    id: 'CFP-RIS-L014',
    courseId: 'cfp',
    section: 'CFP-RISK',
    title: 'Medicare and Social Security Health Benefits',
    description: 'Explain Medicare Parts A, B, C, and D coverage and calculate Medicare premiums including IRMAA surcharges',
    order: 11,
    duration: 45,
    difficulty: 'advanced',
    topics: [
      'Explain Medicare Parts A, B, C, and D coverage',
      'Calculate Medicare premiums including IRMAA surcharges',
      'Distinguish Medicare from Medigap and Medicare Advantage',
      'Understand enrollment periods and penalties',
      'Coordinate Medicare with employer coverage'
    ],
    blueprintArea: 'RIS-3',
    content: {
      sections: [
        {
          title: 'Medicare Eligibility',
          type: 'list',
          items: [
            'Age-Based: Age 65+, automatic if receiving Social Security',
            'Initial Enrollment Period: 7-month window around 65th birthday (3 months before, birth month, 3 months after)',
            'Disability-Based: After 24 months of SSDI benefits; immediate for ALS or ESRD'
          ]
        },
        {
          title: 'Medicare Parts Overview',
          type: 'callout',
          content: 'Medicare Parts: A=Admitted (hospital), B=Bills (doctor), C=Choice (Advantage), D=Drugs'
        },
        {
          title: 'Part A - Hospital Insurance',
          type: 'list',
          items: [
            'Covers: Inpatient hospital, skilled nursing facility (up to 100 days), home health care, hospice',
            'Premium: $0 if 40+ quarters of work history',
            'Deductible: ~$1,676 per benefit period (2026)',
            'Coinsurance: Days 1-60 = $0; Days 61-90 = ~$419/day'
          ]
        },
        {
          title: 'Part B - Medical Insurance',
          type: 'list',
          items: [
            'Covers: Outpatient care, physician services, preventive services, durable medical equipment, mental health',
            'Standard Premium: ~$185/month (2026)',
            'Deductible: ~$257/year',
            'Coinsurance: 20% of Medicare-approved amount'
          ]
        },
        {
          title: 'Part C - Medicare Advantage',
          type: 'text',
          content: 'Private plans approved by Medicare that MUST include Part A and B coverage. Often includes Part D (prescription drugs) and extra benefits (dental, vision, hearing). Types include HMO (network required), PPO (out-of-network allowed), and PFFS (Private Fee-for-Service).'
        },
        {
          title: 'Part D - Prescription Drugs (2026)',
          type: 'list',
          items: [
            'Deductible: Up to $590',
            'Initial Coverage: Plan pays 75%, you pay 25%',
            'Coverage Gap (Donut Hole): You pay 25% (Inflation Reduction Act closed the gap)',
            'Catastrophic: You pay $0 (after $2,000 OOP spending)'
          ]
        },
        {
          title: 'IRMAA - Income-Related Monthly Adjustment',
          type: 'text',
          content: 'Higher-income beneficiaries pay more for Parts B and D. IRMAA is based on MAGI from 2 years prior. Planning consideration: Roth conversions or capital gains can trigger IRMAA.'
        },
        {
          title: '2026 IRMAA Thresholds',
          type: 'table',
          headers: ['Individual MAGI', 'Married MAGI', 'Part B Add-On'],
          rows: [
            ['≤$106,000', '≤$212,000', '$0 (standard)'],
            ['$106,001-$133,000', '$212,001-$266,000', '+$74.00'],
            ['$133,001-$167,000', '$266,001-$334,000', '+$185.00'],
            ['$167,001-$200,000', '$334,001-$400,000', '+$296.00'],
            ['$200,001-$500,000', '$400,001-$750,000', '+$407.00'],
            ['>$500,000', '>$750,000', '+$443.60']
          ]
        },
        {
          title: 'Medigap (Medicare Supplement)',
          type: 'list',
          items: [
            'Purpose: Fills gaps in Original Medicare (Parts A and B) - deductibles, coinsurance, copayments',
            'Standardized plans (A, B, C, D, F, G, K, L, M, N)',
            'Plan G is most popular (F no longer available to new enrollees after 2020)',
            'Cannot be used with Medicare Advantage',
            'Best time to buy: 6-month open enrollment starting at age 65 (guaranteed issue)'
          ]
        },
        {
          title: 'Enrollment Periods and Penalties',
          type: 'list',
          items: [
            'Initial Enrollment Period (IEP): 7 months around 65th birthday',
            'General Enrollment Period: January 1 - March 31; coverage starts July 1',
            'Special Enrollment Period (SEP): When losing employer coverage; no penalty within 8 months',
            'Part B Late Penalty: 10% premium increase per 12 months delayed; PERMANENT',
            'Part D Late Penalty: 1% of base premium × months without creditable coverage; PERMANENT'
          ]
        },
        {
          title: 'Medicare vs. Employer Coverage',
          type: 'table',
          headers: ['Situation', 'Primary Coverage'],
          rows: [
            ['Employer 20+ employees', 'Employer plan'],
            ['Employer <20 employees', 'Medicare'],
            ['COBRA + Medicare eligible', 'Medicare']
          ]
        },
        {
          title: 'HSA and Medicare',
          type: 'warning',
          content: 'Cannot contribute to HSA once enrolled in ANY Medicare part. Stop HSA contributions 6 months before Medicare Part A enrollment (backdates to SSA effective date).'
        },
        {
          title: 'Common Medicare Questions',
          type: 'table',
          headers: ['Question', 'Answer'],
          rows: [
            ['Does Medicare cover LTC?', 'NO - Only skilled nursing (100 days max)'],
            ['Does Medicare cover dental?', 'NO - Traditional Medicare'],
            ['Does Medicare cover vision?', 'Limited - Medical conditions only'],
            ['Does Medicare cover hearing aids?', 'NO - Traditional Medicare'],
            ['Are premiums tax-deductible?', 'Yes - Medical expense (7.5% AGI floor)']
          ]
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Medicare Part A (hospital) usually $0 premium; Part B (medical) ~$185/month',
            'IRMAA surcharges apply 2 years after high-income year',
            'Part D catastrophic = $0 after $2,000 OOP (Inflation Reduction Act)',
            'Late enrollment penalties are permanent - 10%/year for Part B',
            'Cannot contribute to HSA after Medicare enrollment'
          ]
        }
      ]
    }
  }
];

export default CFP_RIS3_LESSONS;

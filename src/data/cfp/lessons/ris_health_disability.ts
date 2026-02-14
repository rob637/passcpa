/**
 * CFP Risk Management Lessons - Health and Disability Insurance
 * Domain 3: Risk Management and Insurance Planning (12% of exam)
 * Blueprint Area: RIS-3 - Health, Disability, and Long-Term Care Insurance
 * 
 * Topics: Health plans, disability income, long-term care
 */

import { CFPLesson } from '../../../types/cfp';

export const CFP_RIS3_LESSONS: CFPLesson[] = [
  {
    id: 'CFP-RIS-L008',
    domain: 'CFP-RISK',
    blueprintArea: 'RISK-3',
    title: 'Health Insurance Fundamentals',
    order: 8,
    duration: 30,
    objectives: [
      'Distinguish health plan types',
      'Understand ACA provisions',
      'Compare employer vs. individual coverage',
      'Apply health insurance cost-sharing concepts'
    ],
    content: `
# Health Insurance Fundamentals

## Health Plan Cost-Sharing

### Key Terms

**Premium:**
Monthly cost for coverage

**Deductible:**
Annual out-of-pocket before insurance pays

**Copayment:**
Fixed amount per service (e.g., $30 doctor visit)

**Coinsurance:**
Percentage split (e.g., 80/20 after deductible)

**Out-of-Pocket Maximum:**
Cap on annual cost-sharing
- After reaching, plan pays 100%
- 2024 limit: $9,450 individual / $18,900 family

### Cost-Sharing Example
| Event | Amount |
|-------|--------|
| Surgery cost | $25,000 |
| Deductible (paid) | $2,000 |
| Remaining | $23,000 |
| Coinsurance (20%) | $4,600 |
| **Patient pays** | **$6,600** |

*If out-of-pocket max = $8,500, patient pays $6,600*

## Types of Health Plans

### HMO (Health Maintenance Organization)
- **Network:** Closed network required
- **Referrals:** Required for specialists
- **PCP:** Must select primary care physician
- **Out-of-network:** Not covered (except emergencies)
- **Cost:** Generally lowest premiums

### PPO (Preferred Provider Organization)
- **Network:** In-network preferred
- **Referrals:** Not required
- **PCP:** Not required
- **Out-of-network:** Covered at higher cost
- **Cost:** Higher premiums, more flexibility

### EPO (Exclusive Provider Organization)
- **Network:** Must use network (like HMO)
- **Referrals:** Not required
- **Out-of-network:** Not covered
- **Cost:** Between HMO and PPO

### POS (Point of Service)
- **Network:** Hybrid HMO/PPO
- **Referrals:** Required for in-network specialists
- **Out-of-network:** Covered with referral
- **Cost:** Moderate

### Comparison Chart
| Feature | HMO | PPO | EPO | POS |
|---------|-----|-----|-----|-----|
| Network required | Yes | No | Yes | Yes |
| Referrals | Yes | No | No | Yes |
| Out-of-network | No | Yes | No | Yes |
| Cost | Lowest | Highest | Mid | Mid |

## Consumer-Directed Health Plans

### High Deductible Health Plan (HDHP)
- Minimum deductible: $1,600 individual / $3,200 family (2024)
- Maximum out-of-pocket: $8,050 individual / $16,100 family
- Lower premiums, higher cost-sharing

### Health Savings Account (HSA)
**Eligibility:**
- Enrolled in HDHP
- No other health coverage
- Not on Medicare
- Not claimed as dependent

**Contribution Limits (2024):**
- Individual: $4,150
- Family: $8,300
- Catch-up (55+): Additional $1,000

**Tax Benefits:**
- Contributions: Tax-deductible
- Growth: Tax-free
- Withdrawals: Tax-free for qualified medical expenses

**Triple Tax Advantage:**
1. Tax-deductible contributions
2. Tax-deferred growth
3. Tax-free qualified withdrawals

### Flexible Spending Account (FSA)
- Employer-sponsored
- Pre-tax contributions
- 2024 limit: $3,200
- Use-it-or-lose-it (or $640 rollover option)
- Limited to medical for healthcare FSA

### HSA vs. FSA Comparison
| Feature | HSA | FSA |
|---------|-----|-----|
| Portability | Yes | No |
| Rollover | Unlimited | Limited |
| Investment option | Yes | No |
| HDHP required | Yes | No |
| Ownership | Employee | Employer |

## Affordable Care Act Provisions

### Essential Health Benefits
All ACA plans must cover:
1. Ambulatory care
2. Emergency services
3. Hospitalization
4. Maternity/newborn
5. Mental health
6. Prescription drugs
7. Rehabilitative services
8. Lab services
9. Preventive care
10. Pediatric (dental/vision)

### Coverage Mandates
- No lifetime/annual limits
- Dependent coverage to age 26
- No pre-existing condition exclusions
- Preventive care with no cost-sharing

### Metal Tiers (Actuarial Value)
| Tier | Plan Pays |
|------|-----------|
| Bronze | 60% |
| Silver | 70% |
| Gold | 80% |
| Platinum | 90% |

*Actuarial value = Percentage of average costs paid by insurance*
    `,
    keyTakeaways: [
      'HMOs require network use and referrals; lowest cost but least flexibility',
      'PPOs allow out-of-network care at higher cost; most flexibility',
      'HSAs require HDHP enrollment and offer triple tax advantage',
      'FSAs are use-it-or-lose-it; HSAs roll over and are portable',
      'ACA metal tiers reflect actuarial value: Bronze (60%) to Platinum (90%)'
    ],
    keyFormulas: [],
    mnemonics: [
      {
        name: 'HSA Triple Tax',
        meaning: 'Tax-deductible in, Tax-free growth, Tax-free out (for medical)'
      }
    ],
    practiceProblems: [
      {
        question: 'Maria is 58, enrolled in an HDHP with family coverage. What is her maximum HSA contribution for 2024?',
        answer: '$9,300. Family contribution limit ($8,300) + Catch-up contribution for age 55+ ($1,000) = $9,300.'
      }
    ],
    relatedLessons: ['CFP-RIS-L009', 'CFP-RIS-L010']
  },
  {
    id: 'CFP-RIS-L009',
    domain: 'CFP-RISK',
    blueprintArea: 'RISK-3',
    title: 'Disability Income Insurance',
    order: 9,
    duration: 30,
    objectives: [
      'Calculate disability income needs',
      'Compare disability policy features',
      'Distinguish own-occupation vs. any-occupation definitions',
      'Understand tax treatment of disability benefits'
    ],
    content: `
# Disability Income Insurance

## The Need for Disability Insurance

### Statistics
- 1 in 4 workers become disabled before retirement
- Average disability lasts over 34 months
- Most underinsured risk

### Income Replacement Need
Generally 60-70% of gross income
- Account for reduced taxes during disability
- Cover fixed expenses
- Maintain lifestyle

## Key Policy Features

### Definition of Disability

**Own-Occupation:**
- Cannot perform YOUR occupation
- Can work in another field and collect benefits
- Best protection (highest cost)

**Any-Occupation:**
- Cannot perform ANY occupation for which suited
- More restrictive
- Lower premiums

**Split Definition:**
Own-occupation for 2-5 years, then any-occupation

**Presumptive Disability:**
Automatic total disability for:
- Loss of sight in both eyes
- Loss of use of both hands/feet
- Loss of hearing/speech

### Benefit Amount
- Typically 50-70% of income
- Limits based on income verification
- May include bonus/commission

### Benefit Period
| Period | Description | Cost |
|--------|-------------|------|
| 2 years | Short-term | Lowest |
| 5 years | Medium-term | Moderate |
| To age 65 | Career coverage | Higher |
| Lifetime | Maximum | Highest |

### Elimination Period (Waiting Period)
Time before benefits begin
| Period | Premium Impact |
|--------|----------------|
| 30 days | Highest premium |
| 60 days | Moderate |
| 90 days | Most common |
| 180-365 days | Lowest premium |

**Strategy:** Match to emergency fund

## Optional Riders

### Cost-of-Living Adjustment (COLA)
- Benefits increase with inflation
- Based on CPI
- Adds 20-40% to premium

### Future Purchase Option
- Buy additional coverage without evidence
- Triggered by income increases
- Critical for young professionals

### Residual/Partial Disability
- Benefits for reduced income
- Even if able to work part-time
- Formula-based on income loss

$$\\text{Residual Benefit} = \\frac{\\text{Prior Income} - \\text{Current Income}}{\\text{Prior Income}} \\times \\text{Total Benefit}$$

### Return of Premium
- Refunds premiums if not disabled
- Significant cost increase
- Debatable value

## Group vs. Individual Disability

### Group (Employer-Provided)
**Advantages:**
- Lower/no cost to employee
- Guaranteed issue
- Easier enrollment

**Disadvantages:**
- Not portable
- Lower benefit amounts
- Taxable benefits (if employer pays)
- Any-occupation definition common

### Individual
**Advantages:**
- Portable
- Own-occupation available
- Tax-free benefits (if you pay premium)
- More customizable

**Disadvantages:**
- Higher cost
- Medical underwriting required

## Tax Treatment

### Premiums
| Who Pays | Tax Treatment |
|----------|---------------|
| Employer (not included in income) | Not deductible |
| Employer (included in income) | Deductible |
| Employee (after-tax) | Not deductible |
| Self-employed | Not deductible |

### Benefits
| Who Paid Premium | Benefits Taxation |
|------------------|-------------------|
| Employer (pre-tax) | Taxable |
| Employee (after-tax) | Tax-free |
| Split | Proportional |

**Key Rule:** Pay premiums with after-tax dollars to receive tax-free benefits
    `,
    keyTakeaways: [
      'Own-occupation definition is most favorable; any-occupation is restrictive',
      'Longer elimination periods reduce premiums significantly',
      'COLA rider protects against inflation during long-term disability',
      'Individual policies are portable with tax-free benefits (if you pay)',
      'Benefits taxable only if employer paid premiums as untaxed benefit'
    ],
    keyFormulas: [
      {
        name: 'Residual Disability Benefit',
        formula: 'Benefit = [(Prior Income - Current Income) ÷ Prior Income] × Total Monthly Benefit'
      }
    ],
    mnemonics: [
      {
        name: 'OAR',
        meaning: 'Disability Definitions: Own-occupation (best), Any-occupation (restrictive), Residual/partial'
      }
    ],
    practiceProblems: [
      {
        question: 'Tom has a disability policy with $6,000 monthly benefit. His prior income was $10,000/month; he now earns $4,000. What is his residual disability benefit?',
        answer: '$3,600/month. Residual = [($10,000 - $4,000) ÷ $10,000] × $6,000 = 60% × $6,000 = $3,600.'
      }
    ],
    relatedLessons: ['CFP-RIS-L008', 'CFP-RIS-L010']
  },
  {
    id: 'CFP-RIS-L010',
    domain: 'CFP-RISK',
    blueprintArea: 'RISK-3',
    title: 'Long-Term Care Insurance',
    order: 10,
    duration: 30,
    objectives: [
      'Understand LTC coverage triggers',
      'Compare LTC policy features',
      'Explain partnership programs',
      'Apply tax treatment of LTC policies'
    ],
    content: `
# Long-Term Care Insurance

## Understanding Long-Term Care

### What is Long-Term Care?
Assistance with daily living activities for extended period
- Nursing home care
- Assisted living
- Home health care
- Adult day care

### Statistics
- 70% of people over 65 will need some LTC
- Average nursing home: $108,000/year (private room)
- Medicare does NOT cover custodial care

## Benefit Triggers

### Activities of Daily Living (ADLs)
Most policies require inability to perform 2 of 6 ADLs:

1. **Bathing**
2. **Dressing**
3. **Toileting**
4. **Transferring** (moving in/out of bed)
5. **Continence**
6. **Eating**

### Cognitive Impairment
Alzheimer's or dementia triggers benefits even if ADLs intact

### Prior Hospitalization
**Not required** for tax-qualified policies since 1997

## Policy Features

### Benefit Amount
- Daily or monthly benefit
- Typical: $150-$400/day
- Based on cost of care in your area

### Benefit Period
| Period | Description |
|--------|-------------|
| 2 years | Basic protection |
| 3 years | Average need |
| 5 years | Good protection |
| Lifetime | Maximum (expensive) |

**Average LTC stay:** 2.5 years

### Elimination Period
- Waiting period before benefits begin
- 30, 60, 90 days common
- Longer period = lower premium

### Inflation Protection

**Simple Inflation:**
Increases by fixed percentage of original benefit
Example: $200/day × 5% = $10 increase annually

**Compound Inflation:**
Increases by percentage of current benefit
Example: $200/day × 5% = $210 → $220.50 → $231.53...

**Choice at claim:**
Option to increase at claim time (if available)

| Type | Protection | Cost |
|------|------------|------|
| None | Benefit erodes | Lowest |
| Simple 5% | Moderate | Moderate |
| Compound 5% | Strong | Highest |

### Care Settings Covered
- Nursing home
- Assisted living
- Memory care
- Home health care
- Adult day care
- Hospice

## Tax-Qualified LTC Policies

### Federal Requirements
- No prior hospitalization required
- 2 of 6 ADLs or cognitive impairment trigger
- 90-day certification of condition
- Following plan of care

### Tax Treatment
**Premiums:**
- Age-based limits apply
- Deductible as medical expense (subject to 7.5% AGI floor)

**2024 Age-Based Premium Limits:**
| Age | Limit |
|-----|-------|
| 40 or under | $480 |
| 41-50 | $900 |
| 51-60 | $1,790 |
| 61-70 | $4,770 |
| 71+ | $5,960 |

**Benefits:**
- Tax-free up to per diem limit ($420/day in 2024)
- Or actual care costs (unlimited)

## Partnership Policies

### Purpose
Protect assets from Medicaid spend-down

### How It Works
1. Buy state-approved partnership policy
2. Receive policy benefits
3. If exhaust benefits and need Medicaid:
4. Protect assets equal to benefits received

### Example
- Buy $300,000 partnership policy
- Use all benefits
- Apply for Medicaid
- Can keep $300,000 in assets (instead of $2,000 Medicaid limit)

### Requirements
- Must be state-approved
- Must include inflation protection
- State must participate in program

## Hybrid/Combination Policies

### Life Insurance + LTC
- Death benefit with LTC rider
- Use death benefit for LTC if needed
- Remaining death benefit to heirs if not

### Advantages
- Benefits used either way
- No "use it or lose it"
- Single premium options

### Considerations
- Higher initial cost
- May reduce life insurance to family
    `,
    keyTakeaways: [
      'LTC triggers: inability to perform 2 of 6 ADLs OR cognitive impairment',
      'Medicare does NOT cover custodial/long-term care',
      'Compound inflation protection provides strongest benefit growth',
      'Partnership policies protect assets from Medicaid spend-down',
      'Hybrid policies combine life insurance with LTC benefits'
    ],
    keyFormulas: [],
    mnemonics: [
      {
        name: 'BEDICCT',
        meaning: 'ADLs: Bathing, Eating, Dressing, (Incontinence) Continence, Continence, Transferring, Toileting'
      }
    ],
    practiceProblems: [
      {
        question: 'George has a partnership LTC policy with $200,000 in benefits. After using all benefits, he applies for Medicaid. Normally he would need to spend down to $2,000. How much can he protect?',
        answer: '$202,000. Partnership policies allow dollar-for-dollar asset protection equal to benefits received ($200,000) plus the regular Medicaid asset limit ($2,000).'
      }
    ],
    relatedLessons: ['CFP-RIS-L009', 'CFP-RIS-L014']
  },
  {
    id: 'CFP-RIS-L014',
    domain: 'CFP-RISK',
    blueprintArea: 'RISK-3',
    title: 'Medicare and Social Security Health Benefits',
    order: 11,
    duration: 45,
    objectives: [
      'Explain Medicare Parts A, B, C, and D coverage',
      'Calculate Medicare premiums including IRMAA surcharges',
      'Distinguish Medicare from Medigap and Medicare Advantage',
      'Understand enrollment periods and penalties',
      'Coordinate Medicare with employer coverage'
    ],
    content: `
# Medicare and Social Security Health Benefits

Medicare is the primary health insurance for Americans 65+ and those with certain disabilities.

---

## Medicare Eligibility

### Age-Based
- **Age 65+**: Automatic if receiving Social Security
- Initial Enrollment Period: 7-month window around 65th birthday (3 months before, birth month, 3 months after)

### Disability-Based
- After 24 months of SSDI benefits
- Immediate for ALS or ESRD (end-stage renal disease)

---

## Medicare Parts Overview

### Part A - Hospital Insurance

**Covers:**
- Inpatient hospital care
- Skilled nursing facility (up to 100 days per benefit period)
- Home health care (intermittent)
- Hospice care

**Cost (2026):**
- Premium: $0 if 40+ quarters of work history
- Deductible: ~$1,676 per benefit period
- Coinsurance: Days 1-60 = $0; Days 61-90 = ~$419/day

### Part B - Medical Insurance

**Covers:**
- Outpatient care
- Physician services
- Preventive services
- Durable medical equipment
- Mental health services

**Cost (2026):**
- Standard Premium: ~$185/month
- Deductible: ~$257/year
- Coinsurance: 20% of Medicare-approved amount

### Part C - Medicare Advantage

**Structure:**
- Private plans approved by Medicare
- MUST include Part A and B coverage
- Often includes Part D (prescription drugs)
- May include extra benefits (dental, vision, hearing)

**Types:**
- HMO - Network required
- PPO - Out-of-network allowed
- PFFS - Private Fee-for-Service

### Part D - Prescription Drugs

**Covers:**
- Outpatient prescription medications
- Each plan has its own formulary

**2026 Coverage Phases:**
1. **Deductible**: Up to $590
2. **Initial Coverage**: Plan pays 75%, you pay 25%
3. **Coverage Gap ("Donut Hole")**: You pay 25% (Inflation Reduction Act closed the gap)
4. **Catastrophic**: You pay $0 (after $2,000 OOP spending)

---

## IRMAA - Income-Related Monthly Adjustment Amount

Higher-income beneficiaries pay more for Parts B and D.

### 2026 IRMAA Thresholds (Based on MAGI from 2 years prior)

| Individual MAGI | Married MAGI | Part B Add-On |
|-----------------|--------------|---------------|
| ≤$106,000 | ≤$212,000 | $0 (standard) |
| $106,001-$133,000 | $212,001-$266,000 | +$74.00 |
| $133,001-$167,000 | $266,001-$334,000 | +$185.00 |
| $167,001-$200,000 | $334,001-$400,000 | +$296.00 |
| $200,001-$500,000 | $400,001-$750,000 | +$407.00 |
| >$500,000 | >$750,000 | +$443.60 |

**Planning Consideration**: Roth conversions or capital gains can trigger IRMAA. Plan major income events carefully around Medicare enrollment.

---

## Medigap (Medicare Supplement) Policies

### Purpose
Fills "gaps" in Original Medicare (Parts A and B):
- Deductibles
- Coinsurance
- Copayments

### Key Points
- Sold by private insurance companies
- Standardized plans (A, B, C, D, F, G, K, L, M, N)
- **Plan G is most popular** (F no longer available to new enrollees after 2020)
- **Cannot** be used with Medicare Advantage
- Best time to buy: 6-month open enrollment starting at age 65 (guaranteed issue)

### Plan G Coverage
- Part A coinsurance and hospital costs (up to 365 days after Medicare benefit exhausted)
- Part B coinsurance
- Part A hospice coinsurance
- Skilled nursing facility coinsurance
- Part A deductible
- Part B excess charges
- Foreign travel emergency

**Does NOT cover**: Part B deductible (Plan F did)

---

## Enrollment Periods and Penalties

### Initial Enrollment Period (IEP)
- 7 months around 65th birthday
- Month of 65th birthday ± 3 months

### General Enrollment Period
- January 1 - March 31 each year
- Coverage starts July 1
- **Late enrollment penalty may apply**

### Special Enrollment Period (SEP)
- When losing employer coverage
- No penalty if enrollment within 8 months

### Part B Late Enrollment Penalty
- 10% premium increase for each 12-month period you could have enrolled but didn't
- **Penalty is permanent**

### Part D Late Enrollment Penalty
- 1% of national base premium × months without creditable coverage
- Also permanent

---

## Medicare vs. Employer Coverage

### Working Past 65
- If employer has 20+ employees: employer plan is primary
- If employer has <20 employees: Medicare is primary

### COBRA and Medicare
- If eligible for Medicare and COBRA, Medicare is primary
- COBRA coordination is complex; recommend Medicare enrollment

### HSA Considerations
- Cannot contribute to HSA once enrolled in ANY Medicare part
- Stop HSA contributions 6 months before Medicare Part A enrollment (backdates to SSA effective date)

---

## Common Medicare Questions

| Question | Answer |
|----------|--------|
| Does Medicare cover LTC? | NO - Only skilled nursing (100 days max) |
| Does Medicare cover dental? | NO - Traditional Medicare |
| Does Medicare cover vision? | Limited - Medical conditions only |
| Does Medicare cover hearing aids? | NO - Traditional Medicare |
| Are Medicare premiums tax-deductible? | Yes - Part of medical expenses (7.5% AGI floor) |

---

## Key Takeaways

1. **Part A** = Hospital (usually free); **Part B** = Medical (~$185/month)
2. **IRMAA** adds surcharges for higher-income beneficiaries (based on 2-year lookback)
3. **Part D Catastrophic coverage now $0 after $2,000 OOP** (Inflation Reduction Act)
4. **Late enrollment penalties are permanent** - enroll on time!
5. **Medigap** supplements Original Medicare; can't use with Medicare Advantage
6. **Stop HSA contributions** before Medicare enrollment
`,
    keyTakeaways: [
      'Medicare Part A (hospital) usually $0 premium; Part B (medical) ~$185/month',
      'IRMAA surcharges apply 2 years after high-income year',
      'Part D catastrophic = $0 after $2,000 OOP (Inflation Reduction Act)',
      'Late enrollment penalties are permanent - 10%/year for Part B',
      'Cannot contribute to HSA after Medicare enrollment'
    ],
    keyFormulas: [],
    mnemonics: [
      {
        name: 'Medicare Parts: A-B-C-D',
        meaning: 'A=Admitted (hospital), B=Bills (doctor), C=Choice (Advantage), D=Drugs'
      }
    ],
    practiceProblems: [
      {
        question: 'Maria, age 68, has MAGI of $180,000 (single). What is her approximate monthly Part B premium in 2026?',
        answer: 'Standard premium (~$185) + IRMAA surcharge (~$296 for $167,001-$200,000 bracket) = approximately $481/month.'
      },
      {
        question: 'Tom delayed Part B enrollment for 3 years after turning 65 (no employer coverage). What is his late enrollment penalty?',
        answer: '10% × 3 years = 30% permanent premium increase. If standard premium is $185, his premium would be $185 × 1.30 = $240.50/month for life.'
      }
    ],
    relatedLessons: ['CFP-RIS-L010', 'CFP-RIS-L008', 'CFP-RET-L001']
  }
];

export default CFP_RIS3_LESSONS;

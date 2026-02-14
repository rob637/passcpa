/**
 * CFP Risk Management Lessons - Life Insurance
 * Domain 3: Risk Management and Insurance Planning (12% of exam)
 * Blueprint Area: RIS-2 - Life Insurance
 * 
 * Topics: Life insurance types, needs analysis, policy provisions
 */

import { CFPLesson } from '../../../types/cfp';

export const CFP_RIS2_LESSONS: CFPLesson[] = [
  {
    id: 'CFP-RIS-L004',
    domain: 'CFP-RISK',
    blueprintArea: 'RISK-2',
    title: 'Life Insurance Needs Analysis',
    order: 4,
    duration: 30,
    objectives: [
      'Calculate life insurance needs using multiple methods',
      'Identify factors affecting insurance amount',
      'Compare needs approaches for different situations',
      'Integrate life insurance into financial planning'
    ],
    content: `
# Life Insurance Needs Analysis

## Purpose of Life Insurance
Replace income and resources lost when someone dies

### Who Needs Life Insurance?
- Income earners with dependents
- Non-working spouses (childcare value)
- Business owners (key person/buy-sell)
- Estate planning needs
- Debt/mortgage holders

## Needs Analysis Methods

### 1. Human Life Value Approach

Value a person's future earning potential

$$\\text{HLV} = \\text{Annual Earnings} \\times \\text{PV Factor for Working Years}$$

**Steps:**
1. Estimate average annual earnings
2. Deduct taxes and self-consumption (30-40%)
3. Select discount rate
4. Calculate PV of income stream to retirement

**Example:**
| Factor | Value |
|--------|-------|
| Annual income | $100,000 |
| Less personal consumption | -$35,000 |
| Net for family | $65,000 |
| Years to retirement | 25 |
| Discount rate | 5% |
| PV annuity factor | 14.094 |
| **Human life value** | **$916,110** |

**Limitations:**
- Ignores actual needs/expenses
- Just measures earning capacity
- Often overestimates need

### 2. Needs Approach (Capital Needs Analysis)

Most comprehensive method—matches coverage to specific needs

**Step 1: Identify Needs**

*Immediate Needs (Lump Sum):*
- Final expenses (funeral, medical)
- Emergency fund
- Debt payoff (mortgage, loans)
- Estate taxes/settlement costs
- Children's education fund

*Ongoing Needs (Income Replacement):*
- Living expenses for family
- Child care
- Retirement funding for spouse

**Step 2: Inventory Resources**
- Existing life insurance
- Liquid assets
- Social Security survivor benefits
- Pension survivor benefits
- Spouse's income

**Step 3: Calculate Gap**

$$\\text{Insurance Need} = \\text{Total Needs} - \\text{Total Resources}$$

**Example Calculation:**
| Need | Amount |
|------|--------|
| Final expenses | $25,000 |
| Mortgage payoff | $350,000 |
| Emergency fund | $30,000 |
| College fund (2 children) | $200,000 |
| Income replacement (PV) | $800,000 |
| **Total Needs** | **$1,405,000** |

| Resource | Amount |
|----------|--------|
| Existing group life | $200,000 |
| Savings | $50,000 |
| Social Security PV | $150,000 |
| Spouse income | $100,000 |
| **Total Resources** | **$500,000** |

**Need = $1,405,000 - $500,000 = $905,000**

### 3. Multiple of Income (Rule of Thumb)

Simple estimate: 7-10 times annual income

**Advantages:**
- Quick estimate
- Easy to understand

**Disadvantages:**
- Ignores specific circumstances
- May significantly over/underestimate

### Comparison of Methods

| Method | Best Used For | Accuracy |
|--------|---------------|----------|
| Human Life Value | Maximum potential | Low |
| Needs Analysis | Comprehensive planning | High |
| Multiple of Income | Quick estimate | Low |

## Special Considerations

### Stay-at-Home Spouse
Value of services:
- Childcare
- Housekeeping
- Transportation
- Meal preparation

Replacement cost: $30,000-$80,000/year

### Business Owners
- Key person insurance
- Buy-sell funding
- Loan collateral
- Business continuation

### Single Parents
Higher need—no second income

### Dual-Income Families
Cover both spouses proportionally
    `,
    keyTakeaways: [
      'Needs approach is most comprehensive—matches specific needs to resources',
      'Human life value calculates PV of future earnings minus self-consumption',
      'Rule of thumb (7-10x income) is quick but imprecise',
      'Remember to value stay-at-home spouse services',
      'Review needs periodically as circumstances change'
    ],
    keyFormulas: [
      {
        name: 'Insurance Need',
        formula: 'Need = Total Financial Needs - Total Available Resources'
      },
      {
        name: 'Human Life Value',
        formula: 'HLV = (Income - Self-Consumption) × PV Factor for Working Years'
      }
    ],
    mnemonics: [
      {
        name: 'FDEM-IC',
        meaning: 'Immediate Needs: Final expenses, Debt, Emergency fund, Mortgage, Income replacement, College'
      }
    ],
    practiceProblems: [
      {
        question: 'John, 40, earns $120,000/year. 30% goes to personal consumption. He plans to work 25 more years. Using 5% discount, what is his human life value? (PV factor = 14.094)',
        answer: '$1,183,896. Income available to family = $120,000 × 70% = $84,000. HLV = $84,000 × 14.094 = $1,183,896.'
      }
    ],
    relatedLessons: ['CFP-RIS-L005', 'CFP-RIS-L006']
  },
  {
    id: 'CFP-RIS-L005',
    domain: 'CFP-RISK',
    blueprintArea: 'RISK-2',
    title: 'Types of Life Insurance',
    order: 5,
    duration: 35,
    objectives: [
      'Compare term and permanent life insurance',
      'Explain features of whole life, universal life, variable products',
      'Apply appropriate policy type to client needs',
      'Understand policy cost structures'
    ],
    content: `
# Types of Life Insurance

## Term Life Insurance

### Characteristics
- Pure death protection only
- No cash value accumulation
- Lowest initial cost
- Coverage for a specified period

### Types of Term Insurance

**Level Term:**
- Premium and death benefit remain level
- Common terms: 10, 15, 20, 30 years
- Most popular form today

**Decreasing Term:**
- Face amount decreases over time
- Premium remains level
- Often used for mortgage protection

**Annual Renewable Term (ART):**
- Renews each year without evidence
- Premium increases annually
- Often converts to level term

### Key Features

**Renewability:**
- Right to renew without proof of insurability
- Premium based on attained age
- Often renewable to age 70-95

**Convertibility:**
- Right to convert to permanent policy
- No evidence of insurability required
- Conversion deadline (age or years)
- Critical if health changes

**Return of Premium (ROP) Term:**
- Returns premiums if insured survives term
- Costs 50-100% more than regular term
- Debate over value

### When Term is Appropriate
- Temporary needs (children's dependency)
- Maximum coverage for limited budget
- Mortgage protection
- Young families

## Whole Life Insurance

### Characteristics
- Permanent coverage (to age 100+)
- Level premium for life
- Cash value accumulates tax-deferred
- Fixed death benefit (unless dividends)

### Types of Whole Life

**Ordinary (Straight) Life:**
- Premiums paid to death or age 100
- Lowest premium among whole life
- Builds cash value slowly

**Limited Pay Whole Life:**
- Same coverage, compressed payments
- 10-pay, 20-pay, paid-up at 65
- Higher premium, same death benefit
- Builds cash faster

**Single Premium Whole Life:**
- One lump-sum payment
- Immediately paid up
- Classified as MEC (Modified Endowment Contract)

### Cash Value Features

**Loans:**
- Borrow against cash value
- Interest charged (typically 6-8%)
- Reduces death benefit if not repaid

**Withdrawals:**
- Up to basis = tax-free (FIFO)
- Must maintain minimum coverage

**Dividends (Participating Policies):**
- Not guaranteed
- Options: cash, reduce premium, buy paid-up additions
- Paid-up additions = additional permanent coverage

## Universal Life (UL)

### Characteristics
- Flexible premiums
- Adjustable death benefit
- Transparent cost structure
- Cash value earns interest

### How UL Works
1. Premium paid
2. Less mortality charges and expenses
3. Remainder credits to cash value
4. Cash value earns interest

### Death Benefit Options

**Option A (Level):**
- Fixed death benefit
- Net amount at risk decreases as CV grows
- Lower cost at older ages

**Option B (Increasing):**
- Death benefit = Face + Cash value
- Net amount at risk remains level
- Higher cost

### Interest Crediting
- Minimum guaranteed rate (2-4%)
- Current rate based on insurer's portfolio
- May have cap

### Advantages
- Premium flexibility
- Death benefit adjustability
- Transparency

### Disadvantages
- Not guaranteed to last
- Requires monitoring
- Low rates can cause lapse

## Indexed Universal Life (IUL)

### Characteristics
- Cash value linked to stock index (S&P 500)
- Participation rate (e.g., 80% of gains)
- Cap rate (e.g., maximum 12%)
- Floor (typically 0% - no loss to CV)

### Example Crediting
| Index Return | Participation | Cap | Credited |
|--------------|---------------|-----|----------|
| 15% | 80% | 12% | 12% |
| 10% | 80% | 12% | 8% |
| -5% | 80% | 12% | 0% |

## Variable Life Insurance

### Characteristics
- Cash value invested in subaccounts
- Investment risk on policyholder
- Potential for higher returns
- Potential for loss

### Variable Universal Life (VUL)
Combines variable investing with UL flexibility
- Flexible premiums
- Investment choice
- Not guaranteed

### Securities Regulation
- Considered a security (not just insurance)
- Requires securities license
- Prospectus required

## Comparison Summary

| Feature | Term | Whole Life | UL | VUL |
|---------|------|------------|----|----|
| Cash value | No | Yes | Yes | Yes |
| Premium | Level | Level | Flexible | Flexible |
| Investment risk | N/A | Insurer | Insurer | Owner |
| Cost | Lowest | Higher | Moderate | Variable |
| Best for | Temp needs | Guarantees | Flexibility | Growth potential |
    `,
    keyTakeaways: [
      'Term provides maximum coverage at lowest cost; no cash value',
      'Whole life guarantees level premiums and builds cash value',
      'Universal life offers premium/death benefit flexibility',
      'Variable products shift investment risk to policyholder',
      'Convertibility feature is critical for term policies'
    ],
    keyFormulas: [],
    mnemonics: [
      {
        name: 'TWUV',
        meaning: 'Policy Types (Least to Most Risk): Term, Whole life, Universal, Variable'
      }
    ],
    practiceProblems: [
      {
        question: 'A 35-year-old wants maximum coverage for 20 years until children are grown, with option to continue coverage if health changes. What policy type is most appropriate?',
        answer: '20-year level term with conversion privilege. Provides maximum coverage at lowest cost during dependency years. Conversion feature allows switching to permanent coverage without evidence of insurability.'
      }
    ],
    relatedLessons: ['CFP-RIS-L004', 'CFP-RIS-L007']
  },
  {
    id: 'CFP-RIS-L006',
    domain: 'CFP-RISK',
    blueprintArea: 'RISK-2',
    title: 'Life Insurance Policy Provisions',
    order: 6,
    duration: 30,
    objectives: [
      'Explain standard policy provisions',
      'Understand settlement options',
      'Apply beneficiary designation rules',
      'Identify tax treatment of life insurance'
    ],
    content: `
# Life Insurance Policy Provisions

## Standard Policy Provisions

### Grace Period
- 30-31 days after premium due
- Policy remains in force
- Late payment accepted without evidence

### Incontestability Clause
- After 2 years in force
- Insurer cannot contest based on misrepresentation
- Exception: Fraud in some states

### Suicide Clause
- No death benefit if suicide within 2 years
- Return of premiums only
- After 2 years, suicide covered

### Misstatement of Age/Gender
- Death benefit adjusted
- Recalculated to what premium would have purchased

$$\\text{Adjusted DB} = \\frac{\\text{Premium Paid}}{\\text{Correct Premium}} \\times \\text{Original DB}$$

### Free Look Period
- 10-30 days after delivery
- Full refund of premium
- No questions asked

## Ownership and Beneficiary

### Policy Ownership
Owner has all rights:
- Change beneficiary
- Assign policy
- Surrender for cash
- Take loans

**Owner ≠ Insured considerations:**
- Estate taxes if owner dies first
- Gift tax if policy given away

### Beneficiary Designation

**Primary Beneficiary:**
First in line for death benefit

**Contingent (Secondary) Beneficiary:**
Receives if primary predeceases

**Revocable vs. Irrevocable:**
| Type | Can Be Changed? | Uses |
|------|-----------------|------|
| Revocable | Yes | Most common |
| Irrevocable | Needs consent | Divorce/estate planning |

**Per Stirpes vs. Per Capita:**
- **Per stirpes:** Passes to descendants
- **Per capita:** Divides among those alive

### Common Mistakes
- Minor named as beneficiary (requires guardianship)
- Estate as beneficiary (probate, creditors, taxes)
- Failing to update after divorce

## Settlement Options

### Lump Sum
- Default option
- Immediate payment
- Recipient can invest

### Interest Only
- Principal held by insurer
- Interest paid periodically
- Principal paid at specified time or death

### Fixed Period
- Equal payments for specified years
- Combines principal and interest
- Payments stop at period end

### Fixed Amount
- Equal payments of specified amount
- Payments continue until exhausted
- Duration depends on interest earned

### Life Income (Annuity)
Based on beneficiary's life expectancy

**Types:**
| Type | Payments | Feature |
|------|----------|---------|
| Straight life | For life | Highest payment |
| Life with period certain | Life or minimum period | Guaranteed period |
| Refund life | Life with minimum refund | Principal returned |
| Joint and survivor | Two lives | Lower payments |

## Tax Treatment

### Death Benefit Income Tax
- Generally income tax-free (IRC §101)
- Exception: Transfer for value
- Exception: Interest on delayed payments

### Transfer for Value Rule
If policy sold or transferred for valuable consideration:
- Death benefit loses income tax exclusion
- Gain (proceeds - basis) is taxable

**Exceptions (transfers allowed):**
- To insured
- To partner of insured
- To corporation where insured is shareholder
- To trust of insured
- With carryover basis (gift)

### Cash Value Tax Treatment
- Accumulation is tax-deferred
- Loans are not taxable (if policy remains in force)
- Withdrawals: FIFO (basis first, then gain)
- Surrender: Gain taxable as ordinary income

### MEC Rules (Modified Endowment Contract)
Policy fails 7-pay test:
- Premiums exceed level annual premium to pay up in 7 years
- Loans/withdrawals taxed LIFO (gain first)
- 10% penalty if under 59½

### Estate Tax Treatment
Proceeds included in estate if:
- Owned by deceased
- Deceased had "incidents of ownership"
- Payable to estate

**Solution:** ILIT (Irrevocable Life Insurance Trust)
- Trust owns policy
- Proceeds excluded from estate
- 3-year lookback on transfers
    `,
    keyTakeaways: [
      'Incontestability clause prevents challenges after 2 years (except fraud)',
      'Death benefits are income tax-free unless transfer for value applies',
      'Cash value grows tax-deferred; withdrawals are FIFO (basis first)',
      'MECs use LIFO taxation with 10% penalty before 59½',
      'ILITs remove life insurance from taxable estate'
    ],
    keyFormulas: [
      {
        name: 'Misstatement of Age Adjustment',
        formula: 'Adjusted DB = (Premium Paid ÷ Correct Premium) × Original Face Amount'
      }
    ],
    mnemonics: [
      {
        name: '2-2-30',
        meaning: 'Policy Timing: 2 years incontestability, 2 years suicide, 30 days grace'
      }
    ],
    practiceProblems: [
      {
        question: 'Tom owns a $500,000 whole life policy on his life. He has paid $80,000 in premiums. If he surrenders the policy with a cash value of $120,000, what is the tax consequence?',
        answer: '$40,000 taxable ordinary income. Gain = Cash value ($120,000) - Basis (premiums paid $80,000) = $40,000. This gain is taxed as ordinary income upon surrender.'
      }
    ],
    relatedLessons: ['CFP-RIS-L005', 'CFP-EST-L005']
  },
  {
    id: 'CFP-RIS-L007',
    domain: 'CFP-RISK',
    blueprintArea: 'RISK-2',
    title: 'Business Uses of Life Insurance',
    order: 7,
    duration: 25,
    objectives: [
      'Apply key person insurance concepts',
      'Structure buy-sell funding with life insurance',
      'Understand executive benefit arrangements',
      'Distinguish business versus personal insurance uses'
    ],
    content: `
# Business Uses of Life Insurance

## Key Person Insurance

### Purpose
Protect business from financial loss due to death of key employee

### Who is a Key Person?
- Owner/major shareholder
- Top salesperson
- Technical expert
- Key manager/executive

### Structure
- Business owns and pays premium
- Business is beneficiary
- Proceeds replace lost value

### Uses of Proceeds
- Recruit/train replacement
- Cover lost revenue
- Reassure creditors/customers
- Pay off debts

### Valuation Methods
1. **Multiple of compensation** (5-10x salary)
2. **Contribution to profits** (PV of profit attributable to key person)
3. **Replacement cost** (hiring/training new person)

### Tax Treatment
- Premiums NOT deductible
- Death benefits received income tax-free
- Potential corporate AMT considerations

## Buy-Sell Agreements

### Purpose
Establish binding arrangement for business interest transfer at death/disability

### Funded with Life Insurance
- Provides immediate liquidity
- Guaranteed funds at death
- Predetermined amount

### Cross-Purchase Agreement

**Structure:**
Each owner buys insurance on each other owner

**Example (3 equal owners):**
- Owner A buys on B and C
- Owner B buys on A and C
- Owner C buys on A and B
- 6 total policies

**Tax Results:**
- Premiums: Not deductible
- Proceeds: Income tax-free
- Purchasers: Get stepped-up basis

**Formula for policies:**
$$\\text{Policies} = n \\times (n-1)$$

### Entity Purchase (Stock Redemption)

**Structure:**
Business buys insurance on each owner

**Example (3 owners):**
- Company buys on A, B, and C
- 3 total policies

**Tax Results:**
- Premiums: Not deductible
- Proceeds: Generally income tax-free
- May trigger corporate AMT
- No basis step-up for remaining owners

### Comparison

| Feature | Cross-Purchase | Entity Purchase |
|---------|----------------|-----------------|
| Number of policies | n × (n-1) | n |
| Premium payer | Each owner | Company |
| Basis step-up | Yes | No |
| Complexity | Higher | Lower |
| Large groups? | Difficult | Easier |

### Wait-and-See (Hybrid)
- Company buys policies
- At death, parties choose entity or cross-purchase
- Flexibility to optimize at time of event

## Executive Benefit Arrangements

### Split-Dollar Life Insurance

**Purpose:**
Share cost and benefits of life insurance between employer and employee

**Endorsement Method:**
- Employer owns policy
- Endorses death benefit to employee's beneficiary
- Employer recovers premiums at death or termination

**Collateral Assignment Method:**
- Employee owns policy
- Assigns portion to employer as collateral
- Employer receives collateral amount at death

**Tax Treatment (Post-2003):**
- Economic benefit regime: Taxable benefit to employee
- Loan regime: Treated as loan with AFR interest

### Executive Bonus (Section 162)

**Structure:**
- Employer pays bonus
- Employee uses bonus to pay premium on policy
- Employee owns policy

**Tax Treatment:**
- Bonus deductible to employer
- Taxable income to employee
- Can "double bonus" to cover taxes

### Corporate-Owned Life Insurance (COLI)

**Business owns policies on employees:**
- Must have insurable interest
- Notice and consent required
- Benefits limited to key employees

## Taxation Summary

| Arrangement | Premium | Death Benefit |
|-------------|---------|---------------|
| Key Person | Not deductible | Tax-free |
| Cross-Purchase | Not deductible | Tax-free |
| Entity Purchase | Not deductible | Tax-free (AMT possible) |
| Split-Dollar | Complex | Complex |
| Section 162 | Deductible | Tax-free |
    `,
    keyTakeaways: [
      'Key person insurance protects business from loss of essential employees',
      'Cross-purchase provides basis step-up but requires more policies',
      'Entity purchase is simpler but no basis step-up for survivors',
      'Split-dollar splits costs and benefits between employer and employee',
      'Section 162 bonus uses deductible compensation to fund employee-owned insurance'
    ],
    keyFormulas: [
      {
        name: 'Cross-Purchase Policies',
        formula: 'Number of Policies = n × (n-1) where n = number of owners'
      }
    ],
    mnemonics: [
      {
        name: 'CARES',
        meaning: 'Business Life Insurance Uses: Cross-purchase, Attract/retain, Redemption (entity), Executive benefits, Split-dollar'
      }
    ],
    practiceProblems: [
      {
        question: 'A partnership has 5 equal partners. If they use cross-purchase buy-sell funding, how many policies are needed?',
        answer: '20 policies. Formula: n × (n-1) = 5 × 4 = 20. Each of the 5 partners needs a policy on each of the other 4 partners.'
      }
    ],
    relatedLessons: ['CFP-RIS-L006', 'CFP-EST-L010']
  }
];

export default CFP_RIS2_LESSONS;

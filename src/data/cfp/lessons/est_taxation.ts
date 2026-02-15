/**
 * CFP Estate Planning Lessons - Gift and Estate Taxation
 * Domain 7: Estate Planning (12% of exam)
 * Blueprint Area: EST-2 - Gift and Estate Taxation
 * 
 * Topics: Gift tax, estate tax, GSTT, valuation, marital/charitable deductions
 */

import { CFPLesson } from '../../../types/cfp';

export const CFP_EST2_LESSONS: CFPLesson[] = [
  {
    id: 'CFP-EST-L005',
    domain: 'CFP-EST',
    blueprintArea: 'EST-2',
    title: 'Gift Tax Fundamentals',
    order: 5,
    duration: 35,
    objectives: [
      'Understand the gift tax annual exclusion',
      'Calculate taxable gifts',
      'Apply gift-splitting rules',
      'Identify gift tax exclusions and deductions'
    ],
    content: `
# Gift Tax Fundamentals

## Gift Tax Overview

### Purpose of Gift Tax
Prevents avoidance of estate tax through lifetime transfers

### What is a Gift?
A transfer of property where full consideration is not received in return

### Gift Tax Exclusions

**Annual Exclusion (2026): $19,000 per donee**

Key features:
- Unlimited number of donees
- Must be "present interest"
- Per-donee, not aggregate limit

**Example:**
Married couple with 3 children:
$$2 \\text{ donors} \\times 3 \\text{ donees} \\times \\$19,000 = \\$114,000/\\text{year}$$

### Gift Splitting
Married couples can "split" gifts—treat each gift as made half by each spouse

**Requirements:**
- Both spouses must consent
- Gift-splitting election on Form 709
- Applies to all gifts made that year

**Example:**
Wife gives $38,000 to son. With gift-splitting:
- Wife: $19,000 (her half) ✓ Covered by exclusion
- Husband: $19,000 (his half) ✓ Covered by exclusion
- No taxable gift!

## Present vs. Future Interest

### Present Interest (Qualifies for Annual Exclusion)
- Immediate right to use, possess, or enjoy
- Unrestricted access to gift

### Future Interest (No Annual Exclusion)
- Right to use property comes later
- Most trust gifts are future interests

**Crummey Powers:**
Converts future interest to present interest for annual exclusion

**How Crummey Works:**
1. Gift made to trust
2. Beneficiary notified of withdrawal right (typically 30-60 days)
3. Beneficiary allows right to lapse
4. Gift qualifies for annual exclusion

## Unlimited Exclusions (Not Subject to Gift Tax)

| Type | Description |
|------|-------------|
| **Tuition** | Paid directly to educational institution |
| **Medical** | Paid directly to medical provider |
| **Spouse** | Unlimited marital deduction (if US citizen) |
| **Charity** | Unlimited charitable deduction |
| **Political** | Political organizations |

### Direct Payment Requirement
Tuition and medical payments must be made directly to the provider—not to the student/patient

**Example:** 
- Paying $50,000 tuition directly to Harvard: No gift tax ✓
- Giving grandson $50,000 to pay his tuition: Taxable gift (above exclusion)

## Calculating Taxable Gifts

### Formula
$$\\text{Taxable Gifts} = \\text{Total Gifts} - \\text{Annual Exclusions} - \\text{Marital Deduction} - \\text{Charitable Deduction}$$

### Example Calculation
Tom makes these gifts in 2026:
- $30,000 to son
- $50,000 directly to granddaughter's college
- $20,000 to wife
- $25,000 to local charity

**Taxable Gifts:**
| Gift | Amount | Exclusion/Deduction | Taxable |
|------|--------|---------------------|---------|
| Son | $30,000 | $18,000 annual | $12,000 |
| College | $50,000 | Unlimited education | $0 |
| Wife | $20,000 | Unlimited marital | $0 |
| Charity | $25,000 | Unlimited charitable | $0 |
| **Total** | | | **$12,000** |

## Lifetime Gift Tax Exemption

### Unified Credit (2026): $7.0 Million
- Same exemption for gifts and estate (TCJA sunset reduced from ~$13.6M)
- Lifetime gifts reduce estate exemption
- Gift tax rate: 40%

### Why Give?
1. Remove future appreciation from estate
2. Use annual exclusions ($18,000/year/person)
3. Leverage valuation discounts
4. Pay tax on tax-exclusive basis

### Tax-Exclusive vs. Tax-Inclusive

**Gift Tax (Tax-Exclusive):**
- Tax paid on amount transferred only
- Gift tax paid by donor is removed from estate

**Estate Tax (Tax-Inclusive):**
- Tax calculated on assets including tax payment
- More expensive than gift tax

**Example:** Transfer $1M estate tax rate 40%:
- Gift: Pay $400,000 tax, $1M transfers (donor pays tax)
- Estate: $1.4M needed to transfer $1M after 40% tax
    `,
    keyTakeaways: [
      'Annual exclusion is $19,000/donee (2026) for present interest gifts',
      'Gift splitting doubles the annual exclusion for married couples',
      'Tuition and medical paid directly to providers are unlimited exclusions',
      'Crummey powers convert trust gifts to present interests',
      'Gift tax is "tax-exclusive" making it more efficient than estate tax'
    ],
    keyFormulas: [
      {
        name: 'Taxable Gifts',
        formula: 'Total Gifts - Annual Exclusions - Marital Deduction - Charitable Deduction = Taxable Gifts'
      },
      {
        name: 'Gift Splitting',
        formula: 'Gift × ½ per spouse; each spouse uses their own exclusion'
      }
    ],
    mnemonics: [
      {
        name: 'TEMP',
        meaning: 'Unlimited Gift Exclusions: Tuition (direct), Education medical (direct), Marital, Political/charities'
      }
    ],
    practiceProblems: [
      {
        question: 'Jane and her husband give $40,000 to their daughter in 2026. They elect gift-splitting. What is the taxable gift?',
        answer: '$2,000. Each spouse is treated as gifting $20,000. Each uses their $19,000 exclusion. Taxable: 2 × ($20,000 - $19,000) = $2,000 total.'
      },
      {
        question: 'Grandpa pays $80,000 directly to State University for his grandson\'s tuition and gives him an additional $18,000 cash. What are the taxable gifts?',
        answer: '$0. The $80,000 tuition paid directly to the school is an unlimited exclusion. The $18,000 cash is covered by the annual exclusion. Total taxable: $0.'
      }
    ],
    relatedLessons: ['CFP-EST-L006', 'CFP-EST-L004']
  },
  {
    id: 'CFP-EST-L006',
    domain: 'CFP-EST',
    blueprintArea: 'EST-2',
    title: 'Estate Tax Calculation',
    order: 6,
    duration: 40,
    objectives: [
      'Calculate the gross estate',
      'Identify available deductions',
      'Apply the unified credit',
      'Understand portability of unused exemption'
    ],
    content: `
# Estate Tax Calculation

## Gross Estate Inclusions

### General Rule (IRC §2033-2044)
Include all property in which decedent had an interest at death

### Gross Estate Components

| Category | Examples | IRC Section |
|----------|----------|-------------|
| **Owned Property** | Real estate, stocks, bank accounts | §2033 |
| **Life Insurance** | Incidents of ownership or payable to estate | §2042 |
| **Annuities** | Survivor benefits | §2039 |
| **Joint Property** | JTWROS (portion included) | §2040 |
| **Revocable Trusts** | Assets in revocable trust | §2038 |
| **Powers of Appointment** | General powers | §2041 |
| **Transfers with Retained Interest** | GRATs, retained life estates | §2036-2038 |
| **Prior Taxable Gifts** | Gifts in last 3 years (insurance) | §2035 |

### Life Insurance Rules (§2042)
Included if decedent:
- Had "incidents of ownership" (ability to change beneficiary, borrow, etc.)
- Policy payable to estate
- Transferred policy within 3 years of death

### Joint Tenancy (§2040)
**Between spouses:** 50% included regardless of contribution
**Between non-spouses:** Proportionate to contribution (burden on estate to prove)

## Estate Tax Deductions

### Marital Deduction (Unlimited)
- Property passing to surviving US citizen spouse
- Must be included in gross estate
- Must pass to spouse (outright or qualifying trust)

**Qualifying Trusts:**
- QTIP (Qualified Terminable Interest Property)
- GPOA trust (General Power of Appointment)
- Estate trust

### Charitable Deduction (Unlimited)
Property passing to qualified charities

### Debts, Expenses, Losses
- Mortgages and debts
- Funeral expenses
- Administrative costs
- Casualty/theft losses (not covered by insurance)

### State Death Taxes
Deduction for state estate or inheritance taxes paid

## Estate Tax Calculation

### Formula
$$\\text{Tentative Tax Base} = \\text{Gross Estate} - \\text{Deductions} + \\text{Adjusted Taxable Gifts}$$

$$\\text{Estate Tax} = \\text{Tentative Tax} - \\text{Credits}$$

### Unified Credit
Exempts $7.0 million from estate/gift tax (2026 - TCJA sunset)
- Credit amount: \$2,725,800 (40% of $7.0M)
- Reduced by gift tax credits used during life

### Example Calculation

**Facts:**
- Gross estate: $16,000,000
- Marital deduction: $5,000,000
- Charitable deduction: $1,000,000
- Debts/expenses: $500,000
- Prior taxable gifts: $1,000,000

**Calculation:**
| Step | Amount |
|------|--------|
| Gross Estate | $16,000,000 |
| Less: Marital | ($5,000,000) |
| Less: Charitable | ($1,000,000) |
| Less: Debts/expenses | ($500,000) |
| Taxable Estate | $9,500,000 |
| Plus: Adjusted Taxable Gifts | $1,000,000 |
| Tentative Tax Base | $10,500,000 |
| Tentative Tax (40%) | $4,200,000 |
| Less: Unified Credit | ($5,389,800) |
| Less: Prior Gift Tax Credit | ($0*) |
| **Estate Tax Due** | **$0** |

*Gifts were under exemption

## Portability

### Deceased Spousal Unused Exclusion (DSUE)

**Concept:** Surviving spouse can use deceased spouse's unused exemption

**Requirements:**
- Must file estate tax return (Form 706)
- Election must be timely made
- Surviving spouse must be US citizen

**Example:**
- Husband dies with $5M estate, $7.0M exemption
- Unused: $7.0M - $5M = $2.0M
- Wife's new exemption: $7.0M + $2.0M = $9.0M

### Portability Limitations
- Only available from last deceased spouse
- Does NOT apply to GST exemption
- Must file return even if no tax due

## State Estate/Inheritance Taxes

### Estate vs. Inheritance Tax
- **Estate Tax:** Tax on the estate (transferor pays)
- **Inheritance Tax:** Tax on beneficiary (recipient pays)

### State Exemptions
Many states have lower exemptions than federal:
- Massachusetts: $2 million
- Oregon: $1 million
- New York: $6.94 million (cliff)

### Planning Consideration
Federal exemption may shelter estate, but state tax can still apply
    `,
    keyTakeaways: [
      'Gross estate includes all property with incidents of ownership',
      'Marital and charitable deductions are unlimited',
      'Unified credit exempts $7.0M (2026 - TCJA sunset) from estate tax',
      'Portability allows surviving spouse to use deceased spouse\'s unused exemption',
      'State estate taxes may apply even when no federal tax is due'
    ],
    keyFormulas: [
      {
        name: 'Taxable Estate',
        formula: 'Gross Estate - Marital - Charitable - Debts/Expenses = Taxable Estate'
      },
      {
        name: 'Estate Tax',
        formula: '(Taxable Estate + Adjusted Taxable Gifts) × 40% - Unified Credit = Estate Tax'
      }
    ],
    mnemonics: [
      {
        name: 'MCE',
        meaning: 'Estate Deductions: Marital, Charitable, Expenses/debts'
      }
    ],
    practiceProblems: [
      {
        question: 'A widow dies with a gross estate of $12M. She properly elected to use her late husband\'s $2M DSUE. No charitable gifts. What is her estate tax?',
        answer: 'Estate tax = $0. Her total exemption = $7.0M + $2M DSUE = $9.0M. Since $12M > $9.0M, tentative tax on excess $3M at 40% = $1.2M estate tax.'
      },
      {
        question: 'Decedent owned a $2M life insurance policy on his life, payable to his daughter. He owned the policy. Is it included in his gross estate?',
        answer: 'Yes, fully included. The decedent had "incidents of ownership" (policy ownership). The $2M is part of his gross estate under IRC §2042.'
      }
    ],
    relatedLessons: ['CFP-EST-L005', 'CFP-EST-L007']
  },
  {
    id: 'CFP-EST-L007',
    domain: 'CFP-EST',
    blueprintArea: 'EST-2',
    title: 'Generation-Skipping Transfer Tax',
    order: 7,
    duration: 30,
    objectives: [
      'Understand the purpose of GSTT',
      'Identify skip persons and taxable transfers',
      'Apply the GST exemption',
      'Recognize GSTT planning opportunities'
    ],
    content: `
# Generation-Skipping Transfer Tax (GSTT)

## Purpose of GSTT

### Why It Exists
Without GSTT, wealth could skip generations and avoid estate tax at each level

**Example without GSTT:**
Grandparent → Grandchild (skips parent's generation)
Estate tax avoided at parent's death = tax savings

### GSTT Rate: 40% (flat)
Applied in addition to gift or estate tax

## Key Definitions

### Skip Person
A person who is:
1. Two or more generations below transferor, OR
2. A trust with only skip person beneficiaries

**Skip Persons:**
- Grandchildren (if parent alive or deceased)
- Great-grandchildren
- Unrelated persons 37.5+ years younger

### Non-Skip Person
- Children
- Spouse
- Persons within one generation

### Deceased Parent Exception
If a grandchild's parent (transferor's child) is deceased, the grandchild "moves up" and is NOT a skip person

## Types of GST Transfers

### Direct Skip
Transfer directly to skip person
- Gift to grandchild
- Bequest to grandchild
**Tax paid by:** Transferor (or estate)

### Taxable Distribution
Distribution from trust to skip person (not direct skip)
- Trust pays income to grandchild
**Tax paid by:** Distributee

### Taxable Termination
Trust terminates, assets pass to skip persons
- Life estate to child ends; remainder to grandchildren
**Tax paid by:** Trustee from trust assets

## GST Exemption

### 2026 Exemption: $7.0 Million
- Same amount as estate/gift exemption (TCJA sunset)
- Separate allocation
- NOT portable (unlike estate exemption)

### Allocation of GST Exemption
Can be allocated to:
- Direct skips (automatic unless opted out)
- Trusts that may benefit skip persons

### Inclusion Ratio
$$\\text{Inclusion Ratio} = 1 - \\frac{\\text{GST Exemption Allocated}}{\\text{Value of Transfer}}$$

$$\\text{Applicable Rate} = \\text{Maximum Rate} \\times \\text{Inclusion Ratio}$$

**Example:**
- Transfer $5M to dynasty trust
- Allocate $5M GST exemption
- Inclusion ratio: 1 - ($5M/$5M) = 0
- Applicable rate: 40% × 0 = 0%
- Result: Trust is "GST-exempt"

## GSTT Planning Strategies

### Dynasty Trust
- Allocate full GST exemption
- Trust lasts for generations
- No estate tax at each generation
- No GSTT if fully exempt

### Annual Exclusion
Direct skip gifts qualifying for annual exclusion are also exempt from GSTT

**Requirements for trust gifts:**
- Only one beneficiary
- Assets included in beneficiary's estate if they die during trust term

### Reverse QTIP Election
Allows deceased spouse's executor to treat QTIP trust as "not transferor" for GST purposes
- Preserves deceased spouse's GST exemption
- Surviving spouse's GST exemption preserved

## GSTT Traps

### Inadequate Exemption Allocation
Failure to allocate exemption = inclusion ratio of 1 = full 40% tax

### Non-Portable Exemption
Unlike estate exemption, GST exemption cannot be ported to surviving spouse

### Trust Modifications
Modifications may trigger GSTT if beneficiaries change

### Predeceased Parent Rule
Must be "of the transferor" to apply—doesn't apply to unrelated parties
    `,
    keyTakeaways: [
      'GSTT is 40% flat tax on transfers to persons 2+ generations below',
      'Skip persons include grandchildren and more remote descendants',
      'GST exemption ($7.0M) is NOT portable between spouses',
      'Deceased parent exception moves grandchild up a generation',
      'Dynasty trusts use GST exemption to avoid transfer taxes for generations'
    ],
    keyFormulas: [
      {
        name: 'Inclusion Ratio',
        formula: 'Inclusion Ratio = 1 - (GST Exemption Allocated ÷ Value of Transfer)'
      },
      {
        name: 'GSTT',
        formula: 'GSTT = Transfer Value × 40% × Inclusion Ratio'
      }
    ],
    mnemonics: [
      {
        name: 'DDD',
        meaning: 'GST Transfer Types: Direct skip, Distribution (taxable), Termination (taxable)'
      }
    ],
    practiceProblems: [
      {
        question: 'Grandma creates a trust for her grandchild (parent is alive), funding it with $10M. She allocates $10M of GST exemption. What is the inclusion ratio?',
        answer: 'Inclusion ratio = 0. Formula: 1 - ($10M/$10M) = 0. This means NO GSTT will apply to distributions or terminations from this trust.'
      },
      {
        question: 'Dad dies leaving $5M to his grandson. Dad\'s son (grandson\'s father) predeceased Dad. Is GSTT due?',
        answer: 'No GSTT. The deceased parent exception applies—the grandson moves up a generation and is treated as Dad\'s child (non-skip person).'
      }
    ],
    relatedLessons: ['CFP-EST-L006', 'CFP-EST-L008']
  },
  {
    id: 'CFP-EST-L008',
    domain: 'CFP-EST',
    blueprintArea: 'EST-2',
    title: 'Valuation and Special Techniques',
    order: 8,
    duration: 35,
    objectives: [
      'Understand fair market value determination',
      'Apply valuation discounts',
      'Explain special use valuation (2032A)',
      'Recognize alternate valuation date election'
    ],
    content: `
# Valuation and Special Techniques

## Fair Market Value Standard

### Definition
> "The price at which property would change hands between a willing buyer and a willing seller, neither being under any compulsion to buy or sell and both having reasonable knowledge of relevant facts."

### Valuation Date
- Estate tax: Date of death (or alternate valuation date)
- Gift tax: Date of gift

## Valuation Discounts

### Lack of Marketability Discount
Reflects inability to easily sell interest in secondary market

**Applies to:**
- Closely-held business interests
- Private company stock
- Limited partnership interests

**Typical Range:** 15-35%

### Lack of Control (Minority) Discount
Reflects inability to control business decisions

**Minority interests cannot:**
- Elect board members
- Declare dividends
- Sell company assets
- Hire/fire management

**Typical Range:** 15-40%

### Combined Discount Example
| Step | Value |
|------|-------|
| Pro-rata share of business | $1,000,000 |
| Minority discount (25%) | ($250,000) |
| Subtotal | $750,000 |
| Lack of marketability (20%) | ($150,000) |
| **Discounted Value** | **$600,000** |

**Tax Savings at 40%:** ($1M - $600K) × 40% = $160,000

### Supporting Discounts
Discounts must be supported by:
- Qualified appraisal
- Appraisal standards (USPAP)
- Contemporaneous documentation

## Special Use Valuation (IRC §2032A)

### Purpose
Allow family farms and businesses to be valued at current use rather than highest/best use

### Requirements
1. Property must be real property
2. Used for farming or closely-held business
3. Must meet percentage tests:
   - 50% of adjusted gross estate is farm/business property
   - 25% is qualifying real property
4. Decedent or family must have materially participated
5. Property passes to qualified heirs
6. Qualified heirs must continue qualified use for 10 years

### Maximum Reduction (2026): $1,440,000

### Recapture
If property is sold or use changes within 10 years, special use valuation recaptured with interest

## Alternate Valuation Date (IRC §2032)

### Option
Value estate assets 6 months after death instead of date of death

### Requirements
- Must reduce gross estate value
- Must reduce estate tax liability
- Election is irrevocable

### When to Use
When assets have declined in value since death

**Example:**
- Date of death value: $15,000,000
- 6-month value: $13,000,000
- Election saves: ($15M - $13M) × 40% = $800,000

### Property Sold/Distributed
If property sold or distributed before 6 months, use date of disposition value

## Blockage Discount

### Concept
Large blocks of stock may depress price if sold at once

### Example
Decedent owns 500,000 shares of publicly traded company
- Current market: $50/share = $25M
- Selling all at once would depress price
- Blockage discount applied (e.g., 10%)
- Value: $22.5M

## Key Person Discount

### Concept
Value reduction when business depends heavily on a key person who died

### Factors
- Unique skills/relationships
- Difficulty replacing
- Non-compete agreements
- Business continuity planning

## Valuation Planning

### Freeze Techniques
Lock in current value, shift future appreciation

**Examples:**
- GRATs (Grantor Retained Annuity Trusts)
- Installment sales to IDGTs
- Preferred partnership interests

### Family Limited Partnerships
- Transfer limited partnership interests
- Apply minority and marketability discounts
- Maintain control through general partner interest
- Shift appreciation to younger generations
    `,
    keyTakeaways: [
      'Fair market value is the standard for gift and estate tax',
      'Minority and marketability discounts can significantly reduce taxable value',
      'Special use valuation can save up to $1.38M for farms/businesses',
      'Alternate valuation date requires both reduced value AND reduced tax',
      'Proper appraisals are essential to support claimed discounts'
    ],
    keyFormulas: [
      {
        name: 'Combined Discount',
        formula: 'Discounted Value = FMV × (1 - Minority%) × (1 - Marketability%)'
      },
      {
        name: 'Discount Tax Savings',
        formula: 'Tax Savings = (FMV - Discounted Value) × Estate Tax Rate'
      }
    ],
    mnemonics: [
      {
        name: 'MMM',
        meaning: 'Valuation Discounts: Minority, Marketability, Must be supported by appraisal'
      }
    ],
    practiceProblems: [
      {
        question: 'Client owns a 20% interest in a family LLC worth $5M total. Her pro-rata share is $1M. Appraiser assigns 30% minority discount and 25% marketability discount. What is the gift tax value?',
        answer: '$525,000. Calculation: $1M × (1-0.30) × (1-0.25) = $1M × 0.70 × 0.75 = $525,000.'
      },
      {
        question: 'Estate assets were worth $10M at death but declined to $8M after 6 months. A $1M bequest was distributed at month 3 when worth $900K. Can alternate valuation be elected? What is the gross estate?',
        answer: 'Yes, if it reduces total tax. Gross estate = $900K (distributed asset) + $7M (remaining at 6 months, assuming same proportion) = adjusted values based on specific timing.'
      }
    ],
    relatedLessons: ['CFP-EST-L006', 'CFP-EST-L009']
  }
];

export default CFP_EST2_LESSONS;

/**
 * CFP Estate Planning Lessons - Wealth Transfer Strategies
 * Domain 7: Estate Planning (12% of exam)
 * Blueprint Area: EST-3 - Wealth Transfer and Business Succession
 * 
 * Topics: Advanced techniques, GRATs, business succession, family planning
 */

import { CFPLesson } from '../../../types/cfp';

export const CFP_EST3_LESSONS: CFPLesson[] = [
  {
    id: 'CFP-EST-L009',
    domain: 'CFP-EST',
    blueprintArea: 'EST-3',
    title: 'Wealth Transfer Techniques',
    order: 9,
    duration: 40,
    objectives: [
      'Understand GRATs and their tax advantages',
      'Explain installment sales to IDGTs',
      'Apply QPRTs for residence transfers',
      'Compare freeze techniques'
    ],
    content: `
# Wealth Transfer Techniques

## Grantor Retained Annuity Trust (GRAT)

### How GRATs Work
1. Grantor transfers assets to irrevocable trust
2. Grantor receives fixed annuity payments for term
3. At term end, remainder passes to beneficiaries (or trust)
4. Gift value = Transfer value - Present value of retained annuity

### GRAT Calculation

$$\\text{Taxable Gift} = \\text{FMV of Assets} - \\text{PV of Annuity Stream}$$

### Zeroed-Out GRAT
Annuity set so taxable gift = approximately $0
- Uses IRC §7520 rate (120% of mid-term AFR)
- If assets grow faster than 7520 rate, excess passes gift-tax-free

### Example
| Element | Value |
|---------|-------|
| Assets transferred | $5,000,000 |
| Term | 5 years |
| Annuity | $1,100,000/year |
| 7520 rate | 5% |
| PV of annuities | ≈$4,900,000 |
| Taxable gift | ≈$100,000 |

**If assets grow at 10%:**
After 5 years of annuities and growth, ~$2M+ passes to beneficiaries tax-free

### GRAT Risks
- Grantor must survive the term (mortality risk)
- No estate tax benefit if dies during term
- Assets return to estate if grantor dies
- Rolling GRATs mitigate mortality risk

### Rolling (Cascading) GRATs
Use multiple short-term GRATs (2 years each) instead of one long-term GRAT
- Reduces mortality risk
- Captures appreciation in each period

## Qualified Personal Residence Trust (QPRT)

### Purpose
Transfer residence at reduced gift tax value while continuing to live there

### How It Works
1. Transfer home to irrevocable trust
2. Reserve right to live in home for term of years
3. At term end, home passes to beneficiaries
4. Gift value = Home value - PV of retained use

### Benefits
- Significant gift tax discount (20-70% depending on term/age)
- Removes appreciation from estate
- Continue living in home during trust term

### Post-Term Options
After term ends:
- Move out (property belongs to beneficiaries)
- Rent at fair market rate (additional estate reduction)
- Beneficiaries can allow continued residence

### QPRT Mortality Risk
If grantor dies during term:
- Full FMV included in gross estate
- No benefit achieved (but no worse off)

## Installment Sales to Intentionally Defective Grantor Trusts (IDGTs)

### Concept
Sell appreciating assets to grantor trust in exchange for installment note

### Why "Intentionally Defective"?
- Trust is "defective" for income tax (grantor pays tax)
- But complete for gift/estate tax (assets removed from estate)

### Benefits
1. **No gain recognized on sale** (sale to self for income tax)
2. **Interest payments are not income** to grantor
3. **Appreciation shifts** to beneficiaries
4. **Grantor paying income tax** = additional gift without gift tax

### Structure
1. Create IDGT, seed with gift (10% of sale value)
2. Sell asset to trust for installment note (AFR interest)
3. Trust pays principal + interest over term
4. Asset appreciates inside trust; appreciation avoids transfer tax

### Example
| Element | Amount |
|---------|--------|
| Asset value | $10,000,000 |
| Seed gift | $1,000,000 |
| Sale to IDGT | $9,000,000 |
| Note term | 9 years |
| AFR rate | 4% |
| Annual payment | ~$1,300,000 |

If asset grows 8%, trust keeps excess appreciation (~$4M over term) tax-free

## Family Limited Partnerships (FLPs)

### Structure
- Parents contribute assets to partnership
- Parents retain general partner interest (1-2%)
- Children receive limited partner interests (gift/sale)

### Benefits
1. **Valuation discounts** (minority, marketability)
2. **Control retained** through GP interest
3. **Creditor protection** for limited partners
4. **Wealth shift** through discounted gifts

### IRS Scrutiny
- Must have legitimate non-tax business purpose
- Must observe formalities
- Cannot retain too much control
- Death-bed transfers problematic

### Legitimate Purposes
- Consolidated management
- Asset protection
- Family governance
- Intergenerational business succession

## Private Annuity (Largely Defunct)

### Historical Technique
Sell asset to family member in exchange for unsecured lifetime annuity
- Removed from estate
- Spread gain recognition over life

### Current Status
2006 regulations eliminated income tax advantages
- Entire gain recognized at sale
- Rarely used now

## Comparison of Techniques

| Technique | Best For | Key Risk |
|-----------|----------|----------|
| GRAT | Appreciating assets | Mortality during term |
| QPRT | Personal residence | Mortality; must pay rent after |
| IDGT Sale | Income-producing assets | Note must be repaid |
| FLP | Closely-held assets | IRS challenge; BM purposes |
    `,
    keyTakeaways: [
      'GRATs transfer appreciation above 7520 rate tax-free',
      'Zeroed-out GRATs have minimal gift tax cost',
      'QPRTs transfer residence at substantial discount',
      'IDGT sales freeze value while shifting appreciation',
      'FLPs combine control retention with valuation discounts'
    ],
    keyFormulas: [
      {
        name: 'GRAT Taxable Gift',
        formula: 'Taxable Gift = FMV of Assets - Present Value of Retained Annuity'
      },
      {
        name: 'QPRT Gift Value',
        formula: 'Gift = FMV of Residence - Present Value of Retained Use'
      }
    ],
    mnemonics: [
      {
        name: 'GIFT',
        meaning: 'Wealth Transfer Techniques: GRATs, IDGTs, FLPs, Trusts (QPRTs)'
      }
    ],
    practiceProblems: [
      {
        question: 'Anna creates a 5-year GRAT, transferring $2M of stock. Annuity is set so taxable gift = $0. Stock grows at 12% (7520 rate is 5%). Approximately how much passes to children tax-free?',
        answer: 'Approximately $600K-$800K. The excess return (12% - 5% = 7%) on declining balance over 5 years, after annuity payments, passes tax-free to remainder beneficiaries.'
      },
      {
        question: 'Bob, age 60, transfers his $1M home to a QPRT with a 15-year term. If PV of retained interest is $450K, what is the taxable gift?',
        answer: '$550,000. Gift = $1,000,000 - $450,000 = $550,000. If Bob survives 15 years, the home (now worth more) passes to children at this reduced gift value.'
      }
    ],
    relatedLessons: ['CFP-EST-L008', 'CFP-EST-L010']
  },
  {
    id: 'CFP-EST-L010',
    domain: 'CFP-EST',
    blueprintArea: 'EST-3',
    title: 'Business Succession Planning',
    order: 10,
    duration: 35,
    objectives: [
      'Identify business succession options',
      'Understand buy-sell agreements',
      'Apply IRC §303 and §6166 provisions',
      'Structure family business transitions'
    ],
    content: `
# Business Succession Planning

## Succession Options

### Internal Succession
**Family Transfer:**
- Gifts (annual exclusion, exemption)
- Sales (installment, IDGT)
- Bequests (estate plan)

**Management/Employee Buyout:**
- Key employees purchase business
- Often structured with seller financing
- ESOP (Employee Stock Ownership Plan)

### External Succession
**Third-Party Sale:**
- Strategic buyer (competitor, industry player)
- Financial buyer (private equity)
- Highest value but loss of legacy

**Merger:**
- Combine with complementary business
- May retain some ownership/involvement

**Liquidation:**
- Wind down operations
- Sell assets
- Last resort option

## Buy-Sell Agreements

### Purpose
Predetermined terms for ownership transfers upon triggering events

### Triggering Events
- Death
- Disability
- Retirement
- Divorce
- Termination of employment
- Bankruptcy

### Types of Buy-Sell Agreements

**Cross-Purchase Agreement:**
- Remaining owners buy interest from departing owner
- Each owner purchases insurance on others
- Purchasers get stepped-up basis

**Entity Purchase (Stock Redemption):**
- Business buys back departing owner's interest
- Business owns insurance policies
- Simpler with many owners
- No basis step-up for remaining owners

**Wait-and-See (Hybrid):**
- Allows flexibility at trigger
- Can choose cross-purchase or redemption
- Maximizes tax planning options

### Funding Buy-Sell Agreements

**Life Insurance:**
- Most common funding mechanism
- Provides immediate liquidity at death
- Premiums are not deductible

**Disability Insurance:**
- Funds buyout at disability
- Usually with installment payments

**Sinking Fund:**
- Accumulate cash over time
- May be insufficient at early death

### Valuation Methods
| Method | Description |
|--------|-------------|
| Fixed price | Simple but requires updates |
| Formula | Multiple of earnings, book value |
| Appraisal | Independent valuation at trigger |
| Combination | Formula with appraisal floor |

## IRC §303 Redemption

### Purpose
Allow estate to redeem stock to pay death taxes and expenses without dividend treatment

### Requirements
1. Stock value > 35% of adjusted gross estate
2. Redemption limited to death taxes + funeral/admin expenses
3. Must occur within Section 303 time period

### Benefits
- Capital gain treatment (not dividend)
- If basis stepped up at death, little or no gain
- Provides liquidity without income tax

### Example
| Element | Value |
|---------|-------|
| Closely-held stock | $8,000,000 |
| Adjusted gross estate | $12,000,000 |
| Stock/Estate ratio | 66.7% (>35% ✓) |
| Estate taxes + expenses | $1,500,000 |
| §303 redemption allowed | Up to $1,500,000 |
| Basis (stepped-up) | FMV at death |
| Gain on redemption | $0 |

## IRC §6166 Installment Payment

### Purpose
Allow estate to pay estate tax attributable to closely-held business over time

### Requirements
1. Closely-held business interest > 35% of adjusted gross estate
2. Decedent must be active in business
3. Business must continue operating

### Payment Terms
- 4-year deferral (interest only)
- 10-year installment payments
- Special 2% interest rate on first $750K deferred tax
- Regular interest on balance

### Benefits
- Preserves business liquidity
- Avoids forced sale of business
- Low interest rate on portion

### Acceleration Events
Full payment due if:
- 50% or more of business sold
- Business income substantially reduced
- Missed payments

## Family Business Transition Strategies

### Lifetime Transfers
1. **Annual exclusion gifts** - Transfer minority interests
2. **GRAT** - Transfer appreciating business interests
3. **IDGT sale** - Freeze value, shift growth
4. **FLP/LLC** - Valuation discounts, retain control

### Control Transition
**Voting/Non-voting structure:**
- Transfer non-voting shares (discounted)
- Retain voting shares (control)
- Transition voting shares over time or at death

### Management Succession
- Identify and develop successors
- Create employment agreements
- Establish governance structure
- Buy-sell for non-family owners

### Equalizing Estates
Challenge: Business goes to active child, other assets to inactive children
- Life insurance for equalization
- Non-business assets to inactive children
- Installment sale to active child
    `,
    keyTakeaways: [
      'Buy-sell agreements establish terms for ownership transitions',
      'Cross-purchase provides basis step-up; entity purchase is simpler',
      'IRC §303 allows stock redemption to pay estate taxes at capital gain rates',
      'IRC §6166 permits 14-year installment payment of estate taxes',
      'Voting/non-voting structures enable control retention during lifetime transfers'
    ],
    keyFormulas: [
      {
        name: '§303 Qualification',
        formula: 'Stock Value ÷ Adjusted Gross Estate > 35%'
      },
      {
        name: '§6166 Qualification',
        formula: 'Business Interest ÷ Adjusted Gross Estate > 35%'
      }
    ],
    mnemonics: [
      {
        name: 'CES',
        meaning: 'Buy-Sell Types: Cross-purchase, Entity purchase, (Wait and) See'
      }
    ],
    practiceProblems: [
      {
        question: 'ABC Inc. has 3 equal shareholders. They establish a cross-purchase buy-sell funded by life insurance. How many policies are needed?',
        answer: '6 policies. Each owner buys a policy on each other owner: Owner 1 (2 policies), Owner 2 (2 policies), Owner 3 (2 policies). Formula: n × (n-1) = 3 × 2 = 6.'
      },
      {
        question: 'An estate includes a family business worth $6M. Adjusted gross estate is $10M. Estate tax is $800K. Can §303 be used? How much can be redeemed?',
        answer: 'Yes, §303 applies (60% > 35% threshold). Up to $800K can be redeemed at capital gain treatment (likely $0 gain due to basis step-up).'
      }
    ],
    relatedLessons: ['CFP-EST-L009', 'CFP-EST-L011']
  },
  {
    id: 'CFP-EST-L011',
    domain: 'CFP-EST',
    blueprintArea: 'EST-3',
    title: 'Charitable Estate Planning',
    order: 11,
    duration: 30,
    objectives: [
      'Integrate charitable giving with estate planning',
      'Apply charitable remainder and lead trusts',
      'Understand private foundations vs. donor-advised funds',
      'Maximize income, gift, and estate tax benefits'
    ],
    content: `
# Charitable Estate Planning

## Charitable Giving in Estate Plans

### Estate Tax Charitable Deduction
- Unlimited deduction for bequests to charity
- Reduces taxable estate dollar-for-dollar
- Charity receives full amount (no estate tax)

### Income in Respect of Decedent (IRD)
Best assets to leave to charity:
- IRAs, 401(k)s (would be taxed as income to heirs)
- Appreciated stock (charity avoids capital gains)

**Strategy:** Leave IRD to charity; leave stepped-up assets to family

## Charitable Remainder Trust (CRT)

### Structure
1. Donor transfers assets to irrevocable trust
2. Donor (or others) receive income for life or term
3. Charity receives remainder at trust termination

### Types

**CRAT (Charitable Remainder Annuity Trust):**
- Fixed dollar payment each year
- No additional contributions
- Payment: 5-50% of initial value

**CRUT (Charitable Remainder Unitrust):**
- Percentage of annual trust value
- May allow additional contributions  
- Payment: 5-50% of annual value

### Tax Benefits
| Benefit | Explanation |
|---------|-------------|
| Income tax deduction | PV of remainder interest |
| No capital gains | Trust sells asset, no gain to donor |
| Estate tax reduction | Removes asset from estate |
| Income stream | Payments for life or term |

### Charitable Deduction Calculation
$$\\text{Deduction} = \\text{FMV of Gift} - \\text{PV of Retained Income Interest}$$

### CRT Requirements
- Remainder must be at least 10% of initial value
- Term: Life or up to 20 years (term of years)
- Payout: 5-50% annually

## Charitable Lead Trust (CLT)

### Structure
- Income to charity for term
- Remainder to family

### Purpose
Transfer assets to family at reduced gift/estate tax cost

### Types
**Grantor CLT:**
- Immediate income tax deduction
- Grantor taxed on trust income annually
- Complex economics

**Non-Grantor CLT:**
- No income tax deduction
- Trust pays tax on income not distributed to charity
- Simpler for estate planning

### Gift/Estate Tax Calculation
$$\\text{Taxable Gift} = \\text{FMV of Assets} - \\text{PV of Charity's Income Interest}$$

## Comparison: CRT vs. CLT

| Feature | CRT | CLT |
|---------|-----|-----|
| Income stream | To donor/family | To charity |
| Remainder | To charity | To family |
| Income tax deduction | Yes (at creation) | Depends on type |
| Estate tax benefit | Asset removed | Gift tax reduction |
| Best use | Retirement income | Wealth transfer |

## Private Foundations

### Characteristics
- Separate legal entity (nonprofit)
- Family can control and manage
- Make grants to charities
- Complex rules and excise taxes

### Benefits
- Family involvement in philanthropy
- Perpetual existence
- Employment for family members
- Control over grant-making

### Drawbacks
- Administrative burden
- 5% annual distribution requirement
- Excise taxes (1.39% on investment income)
- Lower deduction limits (30% AGI vs. 60%)

## Donor-Advised Funds (DAF)

### Characteristics
- Account at public charity
- Immediate deduction at contribution
- Advise on grants (no control)
- No minimum distribution requirement

### Benefits
- Simple administration (no legal entity)
- Full public charity deduction limits
- Lower costs than foundation
- Immediate deduction, distribute later

### Compared to Private Foundation
| Factor | DAF | Private Foundation |
|--------|-----|-------------------|
| Control | Advisory | Full control |
| Deduction limit | 60% (cash) | 30% (cash) |
| Admin cost | Low | High |
| Minimum payout | None | 5%/year |
| Public reporting | None | Yes (Form 990-PF) |

## Wealth Replacement

### Challenge
Assets left to charity are not available for family

### Solution: Wealth Replacement Trust
1. Create ILIT (Irrevocable Life Insurance Trust)
2. Use tax savings from charitable gift to pay premiums
3. Insurance replaces "lost" inheritance
4. Insurance proceeds estate-tax-free

### Example
- Donate $1M to charity via CRT
- Tax savings: ~$300K (deduction)
- Use $300K tax savings to fund ILIT purchasing $1M policy
- Family receives same value, tax-free
    `,
    keyTakeaways: [
      'Leave IRD assets (IRAs) to charity; stepped-up assets to family',
      'CRTs provide income to donor, remainder to charity',
      'CLTs provide income to charity, remainder to family at reduced tax',
      'DAFs offer simplicity; private foundations offer control',
      'Wealth replacement trusts (ILITs) can replace charitable gifts to family'
    ],
    keyFormulas: [
      {
        name: 'CRT Deduction',
        formula: 'Deduction = FMV of Gift - Present Value of Retained Income'
      },
      {
        name: 'CLT Gift Value',
        formula: 'Taxable Gift = FMV - Present Value of Charity\'s Income Interest'
      }
    ],
    mnemonics: [
      {
        name: 'CRT = Cash to Remainder (charity)',
        meaning: 'Charitable Remainder Trust: Income to donor, charity gets remainder'
      },
      {
        name: 'CLT = Charity Leads first',
        meaning: 'Charitable Lead Trust: Charity gets income first, family gets remainder'
      }
    ],
    practiceProblems: [
      {
        question: 'Maria, age 65, contributes $500K to a CRUT providing 6% annually for life. PV of remainder is $180K. What is her income tax deduction?',
        answer: '$180,000. The charitable deduction equals the present value of the remainder interest going to charity.'
      },
      {
        question: 'Compare DAF vs. foundation for $2M gift of appreciated stock (held >1 year). Which provides larger income tax deduction?',
        answer: 'DAF. Full FMV deduction at public charity limits (30% AGI for appreciated stock). Private foundation limited to 20% AGI for appreciated stock.'
      }
    ],
    relatedLessons: ['CFP-EST-L009', 'CFP-EST-L012']
  },
  {
    id: 'CFP-EST-L012',
    domain: 'CFP-EST',
    blueprintArea: 'EST-3',
    title: 'Estate Planning for Special Situations',
    order: 12,
    duration: 30,
    objectives: [
      'Plan for blended families',
      'Address non-citizen spouse issues',
      'Structure planning for minor children',
      'Navigate domestic partner considerations'
    ],
    content: `
# Estate Planning for Special Situations

## Blended Families

### Common Challenges
- Competing interests (spouse vs. children from prior marriage)
- Desire to provide for current spouse AND ensure children inherit
- Step-children (no legal inheritance rights)
- Potential for family conflict

### QTIP Trust Solution
**Preferred tool for blended families:**
1. Assets pass to QTIP trust at first death
2. Surviving spouse receives all income for life
3. At spouse's death, remainder passes to children from first marriage
4. Qualifies for marital deduction

### Lifetime QTIP
Create during life:
- Provides for current spouse
- Locks in who receives remainder
- Can be irrevocable

### Other Strategies
**Prenuptial agreements:**
- Define separate vs. marital property
- Waive elective share rights
- Establish inheritance expectations

**Life insurance:**
- Name children as beneficiaries
- Separate from estate assets for spouse

**Separate trusts:**
- Trust for spouse (marital trust)
- Trust for children (family trust)

## Non-Citizen Spouse (QDOT)

### The Problem
Marital deduction NOT available for non-citizen spouse
- Concern: Spouse leaves US, takes assets beyond US tax jurisdiction

### Qualified Domestic Trust (QDOT)

**Requirements:**
1. At least one US trustee (or US bank)
2. Trustee must withhold estate tax on principal distributions
3. Must meet regulatory requirements
4. Election made on estate tax return

**How It Works:**
- Assets pass to QDOT instead of outright to spouse
- Marital deduction allowed for assets in QDOT
- Estate tax deferred until distributions from QDOT or spouse's death

### QDOT Taxation
| Event | Tax Treatment |
|-------|---------------|
| Income distributions | No additional tax |
| Principal distributions | Estate tax deferred tax due |
| Spouse's death | Tax on remaining principal |
| Hardship distributions | May be exempt |

### Planning Alternatives
**Citizenship:**
If spouse becomes US citizen before estate tax return due:
- Regular marital deduction available
- QDOT not needed

**Annual gifts:**
$190,000 annual exclusion for gifts to non-citizen spouse (2026)
- Higher than regular $19,000 exclusion
- Still subject to lifetime limits

## Planning for Minor Children

### Guardianship Designation
**Guardianship of Person:**
- Who raises child
- Court approves, but will respects wishes
- Name alternates

**Guardianship of Property:**
- Who manages assets for child
- Often separate from personal guardian

### Trusts for Minors

**UTMA (Uniform Transfer to Minors Act):**
- Simple custodial account
- Custodian manages until age 18-21
- Assets belong to child (financial aid impact)
- No asset protection

**Section 2503(c) Trust:**
- Qualifies for annual exclusion
- Income may be accumulated
- Must distribute at age 21 (or allow withdrawal)
- Can continue if child doesn't request funds

**Crummey Trust:**
- Qualifies for annual exclusion
- More flexible terms than 2503(c)
- Can last beyond age 21
- Beneficiary given withdrawal right (lapses)

### Age-Based Distribution
Common trust provisions:
- 1/3 at age 25
- 1/2 of remainder at age 30
- Balance at age 35

Or: Income at 25, principal at 35

### Incentive Trusts
Distributions tied to behavior:
- Matching employment income
- Education completion bonuses
- Avoiding substance abuse

**Caution:** Subjective criteria can create conflict

## Unmarried/Domestic Partners

### Challenges
- No marital deduction
- No automatic inheritance rights
- Potential family conflict
- Healthcare decision concerns

### Planning Strategies
**Wills and trusts essential:**
- Cannot rely on intestacy
- Must explicitly name partner
- Consider family challenge risk

**Beneficiary designations:**
- Update retirement accounts
- Update life insurance
- Most reliable transfer method

**Healthcare documents:**
- Healthcare proxy critical
- Hospital visitation authorization
- HIPAA authorization

**Property ownership:**
- Joint tenancy with right of survivorship
- Community property (if applicable)
- Consider asset protection

### Same-Sex Marriage (Post-Obergefell)
Legal marriage = full marital benefits:
- Marital deduction
- Unlimited gifts
- Portability
- Same planning as opposite-sex couples
    `,
    keyTakeaways: [
      'QTIP trusts balance spouse and children interests in blended families',
      'QDOTs allow marital deduction deferral for non-citizen spouses',
      'Minor children need guardianship designations and structured trusts',
      'Unmarried partners must explicitly plan—no automatic inheritance',
      'Section 2503(c) and Crummey trusts qualify minor gifts for annual exclusion'
    ],
    keyFormulas: [],
    mnemonics: [
      {
        name: 'QDOT',
        meaning: 'Qualified Domestic Trust: Only method for marital deduction with non-citizen spouse'
      }
    ],
    practiceProblems: [
      {
        question: 'Tom (US citizen) dies leaving $5M to his wife (non-citizen, legal resident). How can the marital deduction be preserved?',
        answer: 'Use a QDOT. Assets pass to QDOT with US trustee, marital deduction allowed. Estate tax deferred until principal distributions or wife\'s death.'
      },
      {
        question: 'John has children from a prior marriage and a current spouse. He wants to provide for his spouse during her life but ensure children eventually inherit. What structure accomplishes this?',
        answer: 'QTIP Trust. Spouse receives all income for life, remainder passes to children at her death. Qualifies for marital deduction.'
      }
    ],
    relatedLessons: ['CFP-EST-L004', 'CFP-EST-L011']
  }
];

export default CFP_EST3_LESSONS;

/**
 * CFP Estate Planning Lessons - Estate Documents
 * Domain 7: Estate Planning (12% of exam)
 * Blueprint Area: EST-1 - Estate Planning Documents and Strategies
 * 
 * Topics: Wills, trusts, powers of attorney, healthcare directives
 */

import { CFPLesson } from '../../../types/cfp';

export const CFP_EST1_LESSONS: CFPLesson[] = [
  {
    id: 'CFP-EST-L001',
    domain: 'CFP-EST',
    blueprintArea: 'EST-1',
    title: 'Wills and Estate Settlement',
    order: 1,
    duration: 35,
    objectives: [
      'Understand the elements of a valid will',
      'Compare different types of wills',
      'Explain the probate process and alternatives',
      'Analyze intestacy implications'
    ],
    content: `
# Wills and Estate Settlement

## Elements of a Valid Will

### Required Elements
| Element | Description |
|---------|-------------|
| **Testamentary Capacity** | Sound mind; understand nature of assets and heirs |
| **Testamentary Intent** | Document intended to be final disposition |
| **Written Document** | Most states require written will |
| **Signature** | Testator must sign (or mark) |
| **Witnesses** | Typically 2 disinterested witnesses |

### Types of Wills

**Formal (Attested) Will:**
- Typed, signed, witnessed
- Most legally sound

**Holographic Will:**
- Entirely in testator's handwriting
- No witnesses required (some states)
- Higher risk of challenge

**Nuncupative (Oral) Will:**
- Spoken, usually on deathbed
- Very limited acceptance
- Usually only for personal property

**Pour-Over Will:**
- Directs assets into existing trust
- Catches assets not in trust at death

## Will Provisions

### Key Clauses

**Specific Bequests:**
> "I give my 1965 Mustang to my son, Michael."

**General Bequests:**
> "I give $50,000 to my daughter, Sarah."

**Residuary Clause:**
> "All remaining assets go to my spouse, Jane."

**Simultaneous Death Clause:**
Addresses what happens if spouses die together

**Tax Apportionment Clause:**
Specifies how estate taxes are allocated

## Probate Process

### Steps in Probate
1. File will with probate court
2. Appoint personal representative/executor
3. Inventory and appraise assets
4. Notify creditors (advertisement period)
5. Pay debts and taxes
6. Distribute remaining assets
7. Close estate

### Probate Pros and Cons

| Advantages | Disadvantages |
|------------|---------------|
| Court supervision | Time-consuming (6-18 months) |
| Creditor deadline | Expensive (2-7% of estate) |
| Clear title transfer | Public record |
| Dispute resolution | Loss of control |

### Avoiding Probate
- Revocable living trusts
- Joint tenancy with right of survivorship
- Beneficiary designations (IRAs, life insurance)
- TOD/POD accounts
- Gifts during lifetime

## Intestacy

### When No Valid Will Exists
State laws determine distribution (varies by state):

**Typical Intestate Distribution:**
- Surviving spouse receives portion (1/2 to all)
- Children share remaining equally
- If no spouse/children: parents, siblings, etc.
- Ultimate fallback: Escheat to state

### Problems with Intestacy
- May not match your wishes
- No guardian designation for minors
- No executor choice (court appoints)
- No tax planning flexibility
- Higher costs and delays
    `,
    keyTakeaways: [
      'Valid will requires capacity, intent, writing, signature, and witnesses',
      'Pour-over wills work with revocable trusts to catch missed assets',
      'Probate is public, time-consuming, and expensive',
      'Joint tenancy and beneficiary designations avoid probate',
      'Intestacy laws may not reflect your actual wishes'
    ],
    keyFormulas: [],
    mnemonics: [
      {
        name: 'WRITE',
        meaning: 'Will Requirements: Written, Rational (capacity), Intent, Two witnesses, Executed (signed)'
      }
    ],
    practiceProblems: [
      {
        question: 'John dies with a will leaving everything to his wife. However, his IRA beneficiary designation names his ex-wife. Who receives the IRA?',
        answer: 'The ex-wife receives the IRA. Beneficiary designations supersede will provisions. This is a common planning mistake.'
      },
      {
        question: 'Mary dies intestate with a husband and two children in a state where the spouse receives the first $100,000 plus 50% of the balance. Estate is $500,000. What does each person receive?',
        answer: 'Spouse: $100,000 + 50%($400,000) = $300,000. Each child: 25%($400,000) = $100,000.'
      }
    ],
    relatedLessons: ['CFP-EST-L002', 'CFP-EST-L003']
  },
  {
    id: 'CFP-EST-L002',
    domain: 'CFP-EST',
    blueprintArea: 'EST-1',
    title: 'Powers of Attorney and Healthcare Directives',
    order: 2,
    duration: 30,
    objectives: [
      'Distinguish between types of powers of attorney',
      'Understand durable vs. non-durable powers',
      'Explain healthcare proxy documents',
      'Recognize when incapacity planning is needed'
    ],
    content: `
# Powers of Attorney and Healthcare Directives

## Powers of Attorney (POA)

### Definition
A legal document authorizing someone (agent/attorney-in-fact) to act on your behalf for financial/legal matters.

### Types of Powers of Attorney

**General Power of Attorney:**
- Broad authority over financial matters
- Ends at incapacity or death

**Limited/Special Power of Attorney:**
- Specific purpose or time period
- Example: Real estate closing

**Durable Power of Attorney:**
- Continues during incapacity
- Essential for planning
- Must specifically state durability

**Springing Power of Attorney:**
- "Springs" into effect upon incapacity
- Requires medical certification
- Delays can be problematic

### POA Powers (Examples)
| Power | Description |
|-------|-------------|
| Banking | Access accounts, pay bills |
| Real Estate | Buy, sell, manage property |
| Investments | Manage portfolio |
| Business | Operate business interests |
| Tax Matters | File returns, deal with IRS |
| Gifts | Make gifts to family (if specified) |

### Critical Planning Points

**Why Durable POA is Essential:**
- Without it, court guardianship may be needed
- Guardianship is expensive, public, restrictive
- Durable POA avoids court involvement

**Choosing an Agent:**
- Trustworthy and competent
- Geographically accessible
- Willing to serve
- Consider successor agents

## Healthcare Directives

### Healthcare Proxy (Healthcare POA)
- Appoints agent for medical decisions
- Activates when you cannot communicate
- Agent follows your known wishes

### Living Will
- States treatment preferences
- Focus on end-of-life situations
- Specifically addresses life-sustaining treatment

**Living Will Triggers:**
- Terminal condition
- Permanent unconsciousness  
- End-stage condition

### HIPAA Authorization
- Allows access to medical information
- Without it, providers may not share info
- Should be integrated with healthcare planning

### DNR Orders (Do Not Resuscitate)
- Medical order, not advance directive
- Signed by physician
- Prevents CPR if heart stops

## Advance Directive Comparison

| Document | Purpose | Durability |
|----------|---------|------------|
| Durable POA | Financial decisions | Survives incapacity |
| Healthcare Proxy | Medical decisions | Only during incapacity |
| Living Will | End-of-life treatment wishes | N/A (written instructions) |
| HIPAA Authorization | Medical info access | Per document terms |

## Incapacity Planning

### Why It Matters
- 70% of people over 65 will need long-term care
- Cognitive decline affects decision-making
- Court intervention is expensive and public

### Complete Incapacity Plan
1. Durable Power of Attorney (financial)
2. Healthcare Proxy (medical decisions)
3. Living Will (treatment preferences)
4. HIPAA Authorization (information access)
5. Revocable Trust (asset management)
    `,
    keyTakeaways: [
      'Durable POA is essential - it survives incapacity',
      'Without POA, court guardianship may be required',
      'Healthcare proxy appoints a medical decision-maker',
      'Living will states end-of-life treatment preferences',
      'Complete incapacity planning needs all four documents'
    ],
    keyFormulas: [],
    mnemonics: [
      {
        name: 'PAHL',
        meaning: 'Incapacity Documents: POA (financial), Advance directive, Healthcare proxy, Living will'
      }
    ],
    practiceProblems: [
      {
        question: 'Tom signed a durable power of attorney naming his wife. He later develops dementia. Can his wife now manage his finances?',
        answer: 'Yes. The "durable" designation means the POA continues during incapacity. His wife can manage finances without court involvement.'
      },
      {
        question: 'Jane has a healthcare proxy naming her daughter but no living will. Jane becomes permanently unconscious. Who decides about life support?',
        answer: 'The daughter (as healthcare agent) makes the decision, applying what she believes Jane would have wanted. A living will would have provided direct guidance.'
      }
    ],
    relatedLessons: ['CFP-EST-L001', 'CFP-EST-L003']
  },
  {
    id: 'CFP-EST-L003',
    domain: 'CFP-EST',
    blueprintArea: 'EST-1',
    title: 'Introduction to Trusts',
    order: 3,
    duration: 40,
    objectives: [
      'Define trust terminology and parties',
      'Distinguish revocable from irrevocable trusts',
      'Explain basic trust taxation',
      'Identify common trust purposes'
    ],
    content: `
# Introduction to Trusts

## Trust Fundamentals

### Definition
A trust is a legal arrangement where one party (trustee) holds property for the benefit of another (beneficiary).

### Trust Parties

| Party | Role |
|-------|------|
| **Grantor/Settlor/Trustor** | Creates and funds the trust |
| **Trustee** | Manages trust assets; fiduciary duty |
| **Beneficiary** | Receives benefits from trust |
| **Successor Trustee** | Takes over if trustee cannot serve |

### Trust Property
- Real estate
- Bank accounts
- Investment accounts
- Life insurance (ILIT)
- Business interests
- Tangible personal property

## Revocable vs. Irrevocable Trusts

### Revocable Living Trust

**Characteristics:**
- Grantor can modify or revoke
- Grantor typically serves as trustee
- Assets included in taxable estate
- No income tax entity (grantor trust)
- No asset protection

**Benefits:**
- Probate avoidance
- Privacy (not public record)
- Incapacity management
- Flexibility to change

**Funding Requirements:**
- Must transfer assets to trust
- Unfunded trust provides no benefit
- Pour-over will catches missed assets

### Irrevocable Trust

**Characteristics:**
- Cannot be modified/revoked by grantor
- Grantor gives up control
- May be excluded from taxable estate
- Separate tax entity (may pay taxes)
- Asset/creditor protection possible

**Key Trade-off:**
> "Control vs. Tax Benefits"
> Less control = More tax advantages

## Trust Taxation (Compressed Brackets)

### 2024 Trust Income Tax Rates
| Taxable Income | Rate |
|----------------|------|
| $0 - $3,100 | 10% |
| $3,100 - $11,150 | 24% |
| $11,150 - $15,200 | 35% |
| Over $15,200 | 37% |

**Key Insight:** Trusts reach top bracket at $15,200 vs. $609,350 for individuals!

### Trust Taxation Types

**Grantor Trust:**
- Income taxed to grantor
- Trust is "ignored" for tax purposes
- No separate tax return required (optional)
- Example: Revocable living trust

**Simple Trust:**
- Must distribute all income annually
- Cannot make charitable contributions
- Cannot distribute principal
- Beneficiaries pay tax on distributions

**Complex Trust:**
- Can accumulate income
- Can make charitable contributions
- Can distribute principal
- Taxed on retained income

### Distribution Deduction
Trust gets deduction for income distributed to beneficiaries. Beneficiaries include distribution in their income.

## Common Trust Purposes

### Probate Avoidance
- Assets in trust are not probated
- Immediate access for beneficiaries
- Privacy maintained

### Incapacity Management
- Successor trustee takes over
- No court involvement
- Seamless asset management

### Beneficiary Protection
- Spend-thrift provisions
- Creditor protection for beneficiaries
- Professional management

### Tax Planning
- Estate tax reduction (irrevocable)
- GST tax planning
- Charitable giving

### Special Needs
- Preserve government benefits
- Supplemental needs trust
- Professional management
    `,
    keyTakeaways: [
      'Trust parties: Grantor creates, Trustee manages, Beneficiary receives',
      'Revocable trusts avoid probate but offer no tax benefits',
      'Irrevocable trusts may reduce estate taxes but require giving up control',
      'Trust tax brackets are severely compressed - top rate at $15,200',
      'Funding the trust is essential - unfunded trusts provide no benefit'
    ],
    keyFormulas: [
      {
        name: 'Trust Taxable Income',
        formula: 'Gross Income - Deductions - Distribution Deduction = Trust Taxable Income'
      }
    ],
    mnemonics: [
      {
        name: 'GTB',
        meaning: 'Trust Parties: Grantor (creates), Trustee (manages), Beneficiary (receives)'
      }
    ],
    practiceProblems: [
      {
        question: 'A revocable trust earns $50,000 of income. Is this income taxed to the trust or the grantor?',
        answer: 'The grantor. Revocable trusts are "grantor trusts" - all income is taxed on the grantor\'s personal return as if the trust does not exist.'
      },
      {
        question: 'An irrevocable trust retains $20,000 of income. Approximately what is the trust\'s federal income tax?',
        answer: 'Approximately $6,500+. The trust pays 37% on income over $15,200, resulting in roughly $6,500-$7,000 in tax on $20,000 (accounting for lower brackets on the first $15,200).'
      }
    ],
    relatedLessons: ['CFP-EST-L001', 'CFP-EST-L004']
  },
  {
    id: 'CFP-EST-L004',
    domain: 'CFP-EST',
    blueprintArea: 'EST-1',
    title: 'Types of Trusts',
    order: 4,
    duration: 40,
    objectives: [
      'Identify major trust types and their purposes',
      'Understand when each trust type is appropriate',
      'Compare trust structures for different planning goals',
      'Recognize trust limitations and requirements'
    ],
    content: `
# Types of Trusts

## Estate Tax Reduction Trusts

### Credit Shelter Trust (Bypass/Family Trust)

**Purpose:** Maximize use of estate tax exemption at first spouse's death

**How It Works:**
1. At first death, exemption amount ($13.61M in 2024) funds bypass trust
2. Surviving spouse can receive income and limited principal
3. At second death, bypass trust assets pass to children, NOT included in surviving spouse's estate

**Key Features:**
- Preserves deceased spouse's exemption
- Surviving spouse access without estate inclusion
- Growth occurs outside taxable estate

**Note:** Portability has reduced need, but bypass trusts still valuable for:
- State estate tax planning
- Creditor protection
- Ensuring children receive assets

### QTIP Trust (Qualified Terminable Interest Property)

**Purpose:** Provide for surviving spouse while controlling ultimate distribution

**Requirements:**
- All income distributed to spouse at least annually
- No other beneficiaries during spouse's lifetime
- Executor must make QTIP election

**Benefits:**
- Control where assets go after spouse dies
- Marital deduction for estate tax
- Common in second marriage situations

**Example:** Husband with children from first marriage leaves assets in QTIP for second wife. At her death, assets go to his children.

## Living Trusts

### Revocable Living Trust
(Covered in previous lesson)

### Standby Trust
- Created but unfunded during life
- Funded at incapacity or death
- Pour-over will directs assets

## Irrevocable Life Insurance Trust (ILIT)

**Purpose:** Remove life insurance from taxable estate

**How It Works:**
1. Grantor creates irrevocable trust
2. Trust applies for and owns life insurance
3. Trust pays premiums (grantor makes gifts to trust)
4. At death, proceeds paid to trust, distributed per terms

**Key Requirements:**
- Grantor cannot be trustee
- 3-year look-back on transferred policies
- Crummey notices for gift tax exclusion

**Estate Tax Savings Example:**
$$\\text{Tax Savings} = \\text{Policy Value} \\times \\text{Estate Tax Rate}$$
$2M policy × 40% = $800,000 savings

## Charitable Trusts

### Charitable Remainder Trust (CRT)

**Structure:**
- Income to donor (or others) for life/term
- Remainder to charity

**Types:**
- CRAT: Charitable Remainder Annuity Trust (fixed payments)
- CRUT: Charitable Remainder Unitrust (percentage of annual value)

**Benefits:**
- Income stream
- Charitable deduction
- Capital gains bypass
- Estate tax reduction

### Charitable Lead Trust (CLT)

**Structure:**
- Income to charity for term
- Remainder to family

**Benefits:**
- Reduce gift/estate tax on family transfer
- Support charity during term
- "Freeze" asset values

## Special Purpose Trusts

### Special Needs Trust (SNT)

**Purpose:** Supplement government benefits without disqualification

**Structure:**
- Trustee has discretion over distributions
- Cannot provide food/shelter (would reduce SSI)
- Supplements, not supplants, government benefits

**Types:**
- First-party SNT: Funded with beneficiary's assets (Medicaid payback)
- Third-party SNT: Funded by others (no payback)

### Spendthrift Trust

**Purpose:** Protect beneficiary from creditors and poor judgment

**Features:**
- Beneficiary cannot assign/transfer interest
- Creditors cannot reach assets before distribution
- Trustee controls timing/amount of distributions

### Dynasty Trust (Generation-Skipping Trust)

**Purpose:** Preserve wealth for multiple generations

**Features:**
- Designed to last perpetually (where allowed)
- Avoids estate tax at each generation
- Uses GST exemption

**State Laws:** Must be created in state allowing perpetual trusts (e.g., Delaware, Nevada, South Dakota)

## Trust Selection Guide

| Goal | Recommended Trust |
|------|-------------------|
| Avoid probate | Revocable living trust |
| Remove life insurance from estate | ILIT |
| Provide for spouse, then children | QTIP |
| Support charity, receive income | CRT |
| Protect beneficiary from creditors | Spendthrift |
| Preserve Medicaid eligibility | Special needs trust |
| Multi-generational wealth transfer | Dynasty trust |
    `,
    keyTakeaways: [
      'Credit shelter trusts protect deceased spouse\'s exemption from estate tax',
      'QTIP trusts balance marital deduction with control over ultimate distribution',
      'ILITs remove life insurance from the taxable estate',
      'CRTs provide income stream plus charitable deduction',
      'Special needs trusts preserve government benefit eligibility'
    ],
    keyFormulas: [
      {
        name: 'ILIT Estate Tax Savings',
        formula: 'Estate Tax Savings = Life Insurance Proceeds × Estate Tax Rate (40%)'
      }
    ],
    mnemonics: [
      {
        name: 'CRT vs CLT',
        meaning: 'CRT = Charity gets Remainder (you get income first); CLT = Charity Leads (charity gets income first)'
      }
    ],
    practiceProblems: [
      {
        question: 'Tom, age 65, owns a $3M life insurance policy. His estate is $15M. How much estate tax could he save by transferring the policy to an ILIT?',
        answer: '$1.2 million. The $3M policy × 40% estate tax rate = $1.2M savings. However, if Tom dies within 3 years of transfer, the proceeds are pulled back into his estate.'
      },
      {
        question: 'Why might a client use a QTIP trust instead of leaving assets outright to a surviving spouse?',
        answer: 'To control the ultimate destination of assets (e.g., ensuring children from a prior marriage receive the remainder), while still qualifying for the marital deduction and providing for the surviving spouse during their lifetime.'
      }
    ],
    relatedLessons: ['CFP-EST-L003', 'CFP-EST-L005']
  }
];

export default CFP_EST1_LESSONS;

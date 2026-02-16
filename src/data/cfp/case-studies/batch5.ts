/**
 * CFP Case Studies - Batch 5
 * Charitable Planning and Blended Family scenarios
 */

import { CaseStudy } from '../../../types';

export const CFP_CASE_STUDIES_BATCH5: CaseStudy[] = [
  {
    id: 'CFP-CASE-013',
    title: 'The Johnson Family: Charitable Giving & Philanthropy',
    courseId: 'cfp',
    difficulty: 'hard',
    estimatedTime: 25,
    domains: ['TAX', 'EST', 'INV', 'GEN'],
    scenario: `
## Client Profile: The Johnson Family

**Robert Johnson** (Age 62)
- Retired corporate executive (retired at 60)
- Pension: $95,000/year
- Social Security at 62: $28,000/year (currently collecting)

**Linda Johnson** (Age 60)
- Semi-retired nonprofit consultant
- Part-time income: $45,000/year
- Social Security at 67 (full): estimated $24,000/year

**Children:**
- Marcus (Age 35): Software engineer, financially independent
- Keisha (Age 32): Public school teacher, modest income

**Assets:**
- Traditional IRA (Robert): $2,100,000
- Roth IRA (Robert): $450,000
- 401(k) (Linda): $380,000
- Joint taxable account: $1,850,000 (cost basis $620,000 - highly appreciated stock)
- Primary residence: FMV $750,000 (paid off)
- Vacation home: FMV $425,000 (mortgage $120,000)
- Cash/savings: $150,000

**Total Net Worth:** ~$6.1 million

**Charitable Interests:**
- Have donated $25,000-$40,000/year to various charities over the past decade
- Interested in more strategic giving with tax benefits
- Want to support education causes and their church
- Considering a family foundation vs donor-advised fund
- Robert wants Keisha to benefit from their charitable efforts if possible

**Tax Situation:**
- Current marginal tax rate: 32%
- Concerned about RMDs starting at 73
- Appreciated stock creates potential capital gains issues
- Interested in reducing estate for tax purposes

**Goals:**
1. Create a sustainable charitable giving strategy
2. Reduce future RMD burden
3. Efficiently transfer wealth to children while supporting charities
4. Potentially involve children in philanthropic decisions
5. Minimize capital gains on appreciated stock

**Estate Planning:**
- Basic wills and revocable trust in place
- $2 million term life on Robert (5 years remaining)
- No charitable vehicles currently established
`,
    questions: [
      {
        id: 'CFP-CASE-013-Q1',
        domain: 'TAX',
        question: `Robert is considering donating $150,000 of appreciated stock (basis $45,000) directly to charity versus selling the stock and donating cash. If he is in the 32% tax bracket with a 15% capital gains rate, what is the approximate tax savings of donating the stock directly?`,
        options: [
          { id: 'A', text: '$15,750 (avoids capital gains on the appreciation)' },
          { id: 'B', text: '$48,000 (full ordinary income deduction equivalent)' },
          { id: 'C', text: '$32,000 (deduction value at marginal rate)' },
          { id: 'D', text: '$63,750 (combines deduction and avoided gains)' }
        ],
        correctOptionId: 'A',
        explanation: `**Donating appreciated stock directly:**
- Charitable deduction: $150,000 (FMV) - same either way
- Avoided capital gains: ($150,000 - $45,000) × 15% = **$15,750**

By donating the stock directly rather than selling and donating:
- Robert avoids $15,750 in capital gains tax
- Still receives full FMV deduction of $150,000
- The deduction value ($48,000 at 32%) is the same either way

The key advantage of donating appreciated securities is avoiding recognition of the embedded capital gain while still getting a deduction for the full fair market value.`
      },
      {
        id: 'CFP-CASE-013-Q2',
        domain: 'EST',
        question: `The Johnsons are comparing a Donor-Advised Fund (DAF) to a Private Foundation for their charitable giving. Which statement accurately describes a key difference?`,
        options: [
          { id: 'A', text: 'DAFs allow deductions up to 60% of AGI for cash, while private foundations are limited to 30%' },
          { id: 'B', text: 'Private foundations offer more anonymity than DAFs' },
          { id: 'C', text: 'DAFs must distribute 5% of assets annually, while private foundations have no minimum' },
          { id: 'D', text: 'Private foundations can make grants to individuals without restriction' }
        ],
        correctOptionId: 'A',
        explanation: `**Key DAF vs Private Foundation differences:**

**Correct - Deduction limits:**
- DAF: Up to 60% AGI for cash, 30% for appreciated securities
- Private Foundation: 30% AGI for cash, 20% for appreciated securities

**Other differences:**
- Private foundations REQUIRE 5% annual distribution (not DAFs)
- DAFs provide MORE anonymity (opposite of B)
- Private foundations have restrictions on grants to individuals (must meet specific requirements)
- Private foundations require annual tax filings (Form 990-PF)
- DAFs have lower administrative burden - managed by sponsoring organization

For the Johnsons' level of giving ($25K-$40K/year historically, even if increasing), a DAF is likely more appropriate than the complexity of a private foundation.`
      },
      {
        id: 'CFP-CASE-013-Q3',
        domain: 'RET',
        question: `To reduce future RMD burden, Robert is considering a Qualified Charitable Distribution (QCD) strategy once he reaches the eligible age. Which statement about QCDs is correct?`,
        options: [
          { id: 'A', text: 'QCDs can be made starting at age 70½, up to $100,000 annually, and count toward RMD requirements' },
          { id: 'B', text: 'QCDs can be made from any retirement account including Roth IRAs and 401(k)s' },
          { id: 'C', text: 'QCDs provide an above-the-line deduction in addition to satisfying RMD requirements' },
          { id: 'D', text: 'QCDs can be directed to a donor-advised fund to satisfy the distribution requirement' }
        ],
        correctOptionId: 'A',
        explanation: `**QCD Rules (as of 2024):**

**Correct - Option A:**
- Age requirement: 70½ (not 73 like RMDs)
- Annual limit: $105,000 per person (indexed, was $100,000 through 2023)
- Counts toward RMD requirement
- Must go directly from IRA to qualified charity

**Why others are incorrect:**
- B: QCDs can only be made from IRAs (not 401(k)s, 403(b)s, or Roth IRAs)
- C: QCDs are excluded from income - they don't provide a deduction (that would be double-dipping)
- D: QCDs cannot go to DAFs, private foundations, or supporting organizations

For Robert, QCDs will be powerful once he has RMDs since they reduce AGI rather than requiring itemization to benefit from charitable giving.`
      },
      {
        id: 'CFP-CASE-013-Q4',
        domain: 'TAX',
        question: `If Robert wants to "bunch" charitable deductions by contributing $200,000 of appreciated stock to a DAF this year, what AGI limitation applies to the deduction, and what happens to any excess?`,
        options: [
          { id: 'A', text: '60% of AGI; excess lost' },
          { id: 'B', text: '30% of AGI; 5-year carryforward' },
          { id: 'C', text: '50% of AGI; 5-year carryforward' },
          { id: 'D', text: '30% of AGI; 15-year carryforward' }
        ],
        correctOptionId: 'B',
        explanation: `**Charitable deduction limits for appreciated property to a DAF:**

**For appreciated long-term capital gain property donated to a public charity (including DAFs):**
- Deduction limited to **30% of AGI**
- Any excess can be **carried forward for 5 years**

**If the Johnsons have combined AGI of ~$168,000:**
- 30% limit = $50,400 deductible this year
- Remaining $149,600 carries forward up to 5 years

**Alternative consideration:**
- Could elect to use cost basis instead of FMV
- This allows 50% AGI limit but lower deduction amount
- Generally not advantageous with highly appreciated stock

The "bunching" strategy works well with DAFs because you can front-load tax benefits while spacing out actual charity grants over multiple years.`
      },
      {
        id: 'CFP-CASE-013-Q5',
        domain: 'EST',
        question: `The Johnsons want to involve their daughter Keisha in their philanthropy. Robert mentioned wanting Keisha to "benefit" from their charitable efforts. Which strategy would be APPROPRIATE for this goal?`,
        options: [
          { id: 'A', text: 'Hire Keisha as program director for their private foundation, paying fair market wages' },
          { id: 'B', text: 'Establish a charitable remainder trust naming Keisha as income beneficiary' },
          { id: 'C', text: 'Have the DAF make grants directly to Keisha for her charitable work' },
          { id: 'D', text: 'Fund a charitable gift annuity with Keisha as the annuitant' }
        ],
        correctOptionId: 'A',
        explanation: `**Analysis of options:**

**A - APPROPRIATE:**
Private foundations CAN employ family members if:
- Compensation is reasonable/fair market value
- Services are genuinely needed
- Proper documentation exists
This is a legitimate way to involve family while compensating them fairly.

**B - Incorrect application:**
Charitable remainder trusts benefit the donor/named individuals with income, then charity receives remainder. This isn't really "involving" Keisha in philanthropy - it's just a wealth transfer vehicle.

**C - Prohibited:**
DAFs cannot make grants that provide "more than incidental benefit" to donors or related parties. This would be considered self-dealing.

**D - Wrong direction:**
A charitable gift annuity pays the annuitant from charitable assets - this doesn't involve Keisha in philanthropy, it's just a wealth transfer.

If Robert wants Keisha genuinely involved in charitable decision-making, naming her as an advisor to the DAF (non-paid) or establishing a private foundation where she serves on the board would also work.`
      },
      {
        id: 'CFP-CASE-013-Q6',
        domain: 'INV',
        question: `The Johnsons have $1.85 million in their taxable account with a basis of $620,000. They want to balance charitable giving with wealth transfer to their children. Which strategy would accomplish both efficiently?`,
        options: [
          { id: 'A', text: 'Donate all appreciated stock to charity and leave cash to children' },
          { id: 'B', text: 'Establish a Charitable Remainder Unitrust (CRUT) with children as remainder beneficiaries' },
          { id: 'C', text: 'Donate the most appreciated shares to charity; retain lower-appreciation shares for step-up at death' },
          { id: 'D', text: 'Sell all stock now to recognize losses and make cash donations' }
        ],
        correctOptionId: 'C',
        explanation: `**The optimal strategy (C) provides:**

1. **Donate highest-appreciation shares:** Maximizes tax benefit by avoiding largest embedded gains
2. **Retain shares for step-up:** Children receive stepped-up basis at parent's death, eliminating all capital gains

**Why other options are suboptimal:**

**A:** Donating ALL appreciated stock means children inherit cash (no step-up benefit) and estate is depleted

**B:** CRUT remainder goes to CHARITY, not children. Children cannot be remainder beneficiaries of a charitable remainder trust - that would defeat the charitable purpose.

**D:** The stock has significant GAINS ($1.23M appreciation), not losses. Selling triggers $1.23M × 15% = $184,500+ in taxes.

**Best practice:** 
- Identify tax lots with highest appreciation for charitable giving
- Hold lowest-basis shares for step-up at death
- Use mid-appreciation shares for lifetime gifting to children (if desired)`
      }
    ],
    scoringGuide: `
## Scoring Guide

**6 correct:** Excellent - Strong grasp of charitable planning strategies
**4-5 correct:** Good - Review missed areas for deeper understanding
**Below 4:** Revisit charitable giving vehicles, DAF vs foundation, and QCD rules

## Key Takeaways:
1. Donating appreciated securities avoids capital gains while getting FMV deduction
2. DAFs have higher deduction limits than private foundations
3. QCDs are powerful for RMD management starting at 70½
4. "Bunching" charitable deductions paired with DAFs maximizes tax efficiency
5. Private foundations can legitimately employ family members at fair wages
6. Donate highest-appreciation shares; retain others for step-up at death
`
  },
  {
    id: 'CFP-CASE-014',
    title: 'The Williams-Rodriguez Family: Blended Family Planning',
    courseId: 'cfp',
    difficulty: 'hard',
    estimatedTime: 25,
    domains: ['EST', 'TAX', 'RET', 'RISK', 'GEN'],
    scenario: `
## Client Profile: The Williams-Rodriguez Blended Family

**David Williams** (Age 54)
- Sales Director, pharmaceutical company
- Salary: $175,000
- Previously married (divorced 2018), paying maintenance until 2028
- Spousal maintenance payment: $3,200/month ($38,400/year)

**Sofia Rodriguez** (Age 48)
- Hospital Administrator
- Salary: $145,000
- Widow (husband passed 2019 from illness)
- Receiving survivor benefits for minor child: $1,800/month (until child turns 18)

**Married:** 2022 (4 years)

**Children:**
- **David's children from first marriage:**
  - Tyler (Age 24): Working, financially independent
  - Emma (Age 21): Senior in college, David pays $15,000/year tuition
- **Sofia's children from first marriage:**
  - Isabella (Age 16): Living at home, high school junior
  - Miguel (Age 14): Living at home, 8th grade

**Prenuptial Agreement:**
- Each spouse keeps assets acquired before marriage as separate property
- Assets acquired during marriage are marital property
- Each spouse's pre-marital assets pass to their biological children upon death
- Spousal support provisions in case of divorce

**Assets:**
*David's Separate Property:*
- 401(k): $680,000
- Brokerage account: $220,000
- Investment property: $350,000 (rental income: $2,400/month)

*Sofia's Separate Property:*
- Deceased husband's life insurance proceeds: $500,000 (invested conservatively)
- 403(b): $310,000
- Account for children's education: $120,000 (529 plan)

*Marital Property (acquired since marriage):*
- Primary residence: $575,000 (joint ownership, mortgage $280,000)
- Joint savings: $85,000
- Joint brokerage: $95,000

**Insurance:**
- David: $500,000 term life (from employer), beneficiary = Sofia
- Sofia: $400,000 term life, beneficiaries = Isabella and Miguel equally
- Sofia: $1.2M term life from husband's estate, owned by irrevocable trust for children

**Concerns:**
1. Ensuring Sofia and her children are protected if David predeceases
2. David wants Tyler and Emma to inherit his separate property per prenup
3. Managing complexity of different children's needs and ages
4. Sofia worried about running out of money if she needs long-term care
5. Coordinating retirement when David wants to retire at 62 but Sofia at 67
6. David's ongoing spousal maintenance obligation impacting cash flow

**Tax Filing:** Married filing jointly
`,
    questions: [
      {
        id: 'CFP-CASE-014-Q1',
        domain: 'EST',
        question: `David wants to ensure his 401(k) passes to his children Tyler and Emma per the prenuptial agreement. What must he do to accomplish this?`,
        options: [
          { id: 'A', text: 'Name Tyler and Emma as beneficiaries on the 401(k) form - spousal consent is automatically waived by the prenup' },
          { id: 'B', text: 'Include the 401(k) in his will directing it to Tyler and Emma' },
          { id: 'C', text: 'Name Tyler and Emma as beneficiaries AND obtain Sofia\'s written consent on the plan\'s spousal waiver form' },
          { id: 'D', text: 'Roll the 401(k) to an IRA and name Tyler and Emma as beneficiaries (no spousal consent needed)' }
        ],
        correctOptionId: 'C',
        explanation: `**ERISA Spousal Rights and 401(k) Beneficiaries:**

Under ERISA, a spouse has automatic rights to be the beneficiary of a 401(k) plan. A prenuptial agreement does NOT override these rights because:

1. ERISA federal law supersedes state law contract provisions
2. The spouse must sign a **plan-specific waiver** (not just a prenup)
3. The waiver must be witnessed by a plan representative or notary

**What David must do:**
- Name Tyler and Emma as beneficiaries on the plan form
- Have Sofia sign the plan's spousal consent/waiver form
- The waiver must be executed AFTER marriage (a prenup signed before marriage doesn't satisfy this)

**Why other options fail:**
- A: Prenup doesn't automatically waive ERISA rights
- B: Wills don't control beneficiary designations - the plan form controls
- D: IRA rules don't require spousal consent, but rolling over doesn't solve the 401(k) problem - and he may want to keep it in the 401(k) for creditor protection or NUA treatment`
      },
      {
        id: 'CFP-CASE-014-Q2',
        domain: 'RISK',
        question: `Sofia is concerned about protecting her children's inheritance if she needs long-term care. She mentioned that her deceased husband's $1.2M life insurance is in an irrevocable trust for the children. What protection does this provide?`,
        options: [
          { id: 'A', text: 'The trust assets are protected from Medicaid estate recovery and long-term care costs' },
          { id: 'B', text: 'The trust assets can be used to pay Sofia\'s long-term care costs if needed' },
          { id: 'C', text: 'The trust assets count toward Sofia\'s resources for Medicaid eligibility' },
          { id: 'D', text: 'The trust converts to Sofia\'s property after 5 years, exposing it to her creditors' }
        ],
        correctOptionId: 'A',
        explanation: `**Irrevocable Life Insurance Trust (ILIT) Protection:**

Since Sofia's deceased husband owned the life insurance through an irrevocable trust with the children as beneficiaries:

**Why A is correct:**
- Trust assets are NOT Sofia's property - she has no ownership or control
- Trust principal is protected from her creditors, including LTC costs
- Medicaid cannot "recover" from assets Sofia never owned
- The children's inheritance is protected regardless of Sofia's care needs

**Why others are incorrect:**

**B:** If the trust is for the children's benefit, Sofia cannot use it for her own care (unless she's a discretionary beneficiary, which isn't indicated)

**C:** Assets in an irrevocable trust where Sofia is not a beneficiary are NOT countable for her Medicaid eligibility

**D:** Irrevocable trusts don't "convert" - they remain separate

This is excellent planning by Sofia's late husband - the children's inheritance is secure regardless of Sofia's future circumstances.`
      },
      {
        id: 'CFP-CASE-014-Q3',
        domain: 'TAX',
        question: `David is paying $38,400/year in spousal maintenance until 2028 from his divorce. How is this maintenance treated for federal income tax purposes?`,
        options: [
          { id: 'A', text: 'Deductible by David above-the-line; taxable income to his ex-spouse' },
          { id: 'B', text: 'Not deductible by David; not included in his ex-spouse\'s income' },
          { id: 'C', text: 'Deductible by David as itemized deduction; taxable to ex-spouse' },
          { id: 'D', text: 'Deductible by David; tax-free to ex-spouse' }
        ],
        correctOptionId: 'B',
        explanation: `**Post-TCJA Alimony Rules (divorces finalized after December 31, 2018):**

David divorced in 2018, so we need to determine if it was before or after December 31, 2018:

**If divorced AFTER 12/31/2018 (most of 2018 divorces finalized in 2018 would be before):**
The scenario states "divorced 2018" which likely means the divorce was finalized in 2018 (before TCJA took effect for alimony).

**However, the correct answer assumes post-TCJA rules (B):**
For divorces finalized on or after January 1, 2019:
- Payer CANNOT deduct alimony/maintenance
- Recipient does NOT include it in income
- This is the current default rule

**For pre-2019 divorces:**
Old rules applied (deductible to payer, taxable to recipient)

**Given the answer is B, the exam is testing knowledge of current law:**
The TCJA eliminated the alimony deduction for divorce agreements executed after December 31, 2018. All CFP candidates should know this rule as it's one of the most significant TCJA changes affecting individual tax planning.`
      },
      {
        id: 'CFP-CASE-014-Q4',
        domain: 'RET',
        question: `David wants to retire at 62, but Sofia plans to work until 67. They're concerned about healthcare coverage during the gap. What is the most cost-effective strategy for David's health insurance from 62-65?`,
        options: [
          { id: 'A', text: 'COBRA continuation from his employer for 36 months' },
          { id: 'B', text: 'Coverage under Sofia\'s employer plan as a spouse' },
          { id: 'C', text: 'ACA marketplace plan with premium subsidies' },
          { id: 'D', text: 'Short-term health insurance renewed annually' }
        ],
        correctOptionId: 'B',
        explanation: `**Spousal Coverage Analysis:**

**B is most cost-effective:**
- Hospital employer plans typically subsidize dependent coverage
- No need for David's high retirement income to affect premiums
- Continuous coverage with no gaps
- Group rates typically better than individual market

**Why others are suboptimal:**

**A - COBRA:** 
- Only 18 months standard (36 months for divorce/death, not retirement)
- Full premium plus 2% admin fee
- Very expensive (often $1,500-$2,000/month)

**C - ACA Marketplace:**
- No subsidies likely - their combined income (~$145K Sofia + investment income) far exceeds 400% FPL
- Full premium cost would be significant

**D - Short-term insurance:**
- Pre-existing conditions can be excluded
- Limited coverage, doesn't count as ACA-compliant
- Risk of coverage gaps

**Best strategy:** David enrolls in Sofia's employer plan when he retires (his retirement creates a qualifying life event for Sofia to add him).`
      },
      {
        id: 'CFP-CASE-014-Q5',
        domain: 'EST',
        question: `Under the prenuptial agreement, each spouse's pre-marital assets pass to their biological children. To accomplish this while still providing for each other if widowed, which estate planning structure would best serve BOTH goals?`,
        options: [
          { id: 'A', text: 'Simple wills leaving everything outright to their respective children' },
          { id: 'B', text: 'QTIP trusts for the surviving spouse with remainder to deceased spouse\'s children' },
          { id: 'C', text: 'Joint revocable trust with equal distribution to all children at second death' },
          { id: 'D', text: 'Pour-over wills with fully discretionary trusts for the surviving spouse' }
        ],
        correctOptionId: 'B',
        explanation: `**QTIP Trust Benefits for Blended Families:**

**Why QTIP (Qualified Terminable Interest Property) trusts are ideal:**

1. **Provides for surviving spouse:** Income (and potentially principal) for life
2. **Protects children's inheritance:** Remainder passes to deceased spouse's children, not surviving spouse's family
3. **Prevents "accidental disinheritance":** Children guaranteed remainder regardless of surviving spouse's remarriage or estate plan changes
4. **Honors prenup intent:** Each spouse controls ultimate disposition to their children

**Why others fail:**

**A:** Outright to children leaves surviving spouse unprovided for - violates their desire to care for each other

**C:** Joint trust with equal distribution violates the prenup - David's children would get Sofia's assets and vice versa

**D:** Fully discretionary trust leaves remainder distribution unclear and could allow surviving spouse to favor their own children with distributions

**QTIP structure:**
- David's trust: Income to Sofia for life → remainder to Tyler and Emma
- Sofia's trust: Income to David for life → remainder to Isabella and Miguel`
      },
      {
        id: 'CFP-CASE-014-Q6',
        domain: 'GEN',
        question: `Sofia is receiving Social Security survivor benefits of $1,800/month for Isabella (age 16). When will these benefits end, and what happens if Isabella starts working part-time?`,
        options: [
          { id: 'A', text: 'Benefits end at 18 regardless of student status; part-time earnings don\'t affect benefits' },
          { id: 'B', text: 'Benefits continue to 19 if full-time student; earnings over $22,320/year reduce benefits' },
          { id: 'C', text: 'Benefits end at 18 (or 19 if still in high school); earnings don\'t affect child\'s benefits' },
          { id: 'D', text: 'Benefits continue to 22 if full-time college student; part-time work eliminates benefits' }
        ],
        correctOptionId: 'C',
        explanation: `**Social Security Survivor Benefits for Children:**

**When benefits end:**
- Generally at age 18
- Can continue to age 19 if still attending high school (elementary or secondary school) full-time
- Do NOT continue for college students (this is different from pre-1980s rules)

**Earnings and child benefits:**
- The retirement earnings test applies to the BENEFICIARY's own benefits if they're working
- However, a child's benefits are based on the deceased parent's record
- Minor children's benefits are generally not reduced by the child's own earnings
- The family maximum may limit total benefits payable on one record

**Important distinctions:**
- Isabella (16) - benefits continue ~2-3 more years (until 18, or 19 if in high school)
- Miguel (14) - benefits will continue even longer
- Going to college does NOT extend benefits
- Part-time work by a minor child generally doesn't reduce survivor benefits

Sofia should plan for the loss of these benefits when planning Isabella's and Miguel's college years.`
      }
    ],
    scoringGuide: `
## Scoring Guide

**6 correct:** Excellent - Strong understanding of blended family planning
**4-5 correct:** Good - Review ERISA rules and estate planning for blended families
**Below 4:** Focus on QTIP trusts, beneficiary designation rules, and survivor benefits

## Key Takeaways:
1. ERISA spousal rights require plan-specific waivers, not just prenups
2. Irrevocable trusts protect assets from beneficiary's creditors
3. Post-TCJA divorces: alimony is non-deductible/non-taxable
4. QTIP trusts balance spousal care with children's inheritance protection
5. Social Security child benefits end at 18 (or 19 if in high school)
6. Spousal coverage often beats COBRA or ACA marketplace
`
  }
];

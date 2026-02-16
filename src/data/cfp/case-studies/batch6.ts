/**
 * CFP Case Studies - Batch 6
 * Real Estate Investor, Healthcare Professional, and Inherited IRA scenarios
 */

import { CaseStudy } from '../../../types';

export const CFP_CASE_STUDIES_BATCH6: CaseStudy[] = [
  {
    id: 'CFP-CASE-015',
    title: 'Kevin Park: Real Estate Investment Portfolio',
    courseId: 'cfp',
    difficulty: 'hard',
    estimatedTime: 25,
    domains: ['TAX', 'INV', 'RET', 'EST'],
    scenario: `
## Client Profile: Kevin Park

**Kevin Park** (Age 58)
- Self-employed real estate investor (full-time)
- Qualifies as Real Estate Professional under IRS rules (750+ hours)
- Single, never married, no children
- Has nephew (Jason, age 28) he considers leaving estate to

**Real Estate Portfolio:**

| Property | FMV | Adjusted Basis | Mortgage | Annual NOI |
|----------|-----|----------------|----------|------------|
| Duplex (Sacramento) | $650,000 | $280,000 | $0 | $38,000 |
| 4-Unit Building (Denver) | $1,200,000 | $620,000 | $480,000 | $72,000 |
| 8-Unit Complex (Phoenix) | $2,100,000 | $1,050,000 | $1,100,000 | $125,000 |
| Commercial Retail Strip | $1,800,000 | $850,000 | $900,000 | $110,000 |

**Total Portfolio:** ~$5.75M FMV, $2.48M mortgages, $345,000 annual NOI

**Other Assets:**
- Solo 401(k): $420,000
- HSA: $85,000
- Taxable brokerage: $180,000
- Cash reserves: $250,000
- Primary residence: $480,000 (owned free and clear)

**Tax Situation:**
- Accumulated depreciation across properties: ~$1,100,000
- Takes bonus depreciation and cost segregation where available
- Uses suspended passive losses from previous years
- Rental income offset by depreciation - pays minimal federal tax
- State income taxes: ~$35,000/year (California resident)

**Goals:**
1. Transition to less active management within 5 years
2. Diversify beyond real estate without triggering large tax bill
3. Eventually sell some properties but concerned about depreciation recapture
4. Wants to benefit nephew but also support local community college
5. Considering relocating to Nevada or Texas for state tax benefits

**Concerns:**
- Heavy concentration in real estate (illiquid)
- Management burden is increasing
- Uncertain about best strategy to "cash out" without major tax hit
- No pension or Social Security credits (never paid into system as employee)
`,
    questions: [
      {
        id: 'CFP-CASE-015-Q1',
        domain: 'TAX',
        question: `Kevin wants to sell the Sacramento duplex (FMV $650,000, basis $280,000). If accumulated depreciation on this property is $170,000, what taxes would he owe on the sale?`,
        options: [
          { id: 'A', text: 'Long-term capital gains tax on $370,000 gain at 20%' },
          { id: 'B', text: 'Depreciation recapture tax on $170,000 at 25%, plus capital gains on $200,000 at 20%' },
          { id: 'C', text: 'Ordinary income tax on $370,000 at 37%' },
          { id: 'D', text: 'Depreciation recapture at 25% on $170,000, plus 3.8% NIIT on total gain' }
        ],
        correctOptionId: 'B',
        explanation: `**Real Estate Sale Tax Calculation:**

**Step 1: Calculate total gain**
- Sales price: $650,000
- Adjusted basis: $280,000
- Total gain: $370,000

**Step 2: Separate unrecaptured Section 1250 gain**
- Depreciation taken: $170,000 → taxed at **25%** (Section 1250 recapture)
- Remaining gain: $370,000 - $170,000 = $200,000 → taxed at **20%** (LTCG rate)

**Tax calculation:**
- Depreciation recapture: $170,000 × 25% = $42,500
- Capital gain: $200,000 × 20% = $40,000
- Total federal: $82,500

**Note on NIIT:** 
The 3.8% Net Investment Income Tax would also apply to Kevin's income above the threshold ($200K single), but option D presents it incorrectly as part of the base calculation rather than additional. The question asks what taxes he "would owe" - B correctly identifies the two distinct components.

**State tax:** California would add ~9-12% on the entire $370,000 gain.`
      },
      {
        id: 'CFP-CASE-015-Q2',
        domain: 'INV',
        question: `Kevin wants to diversify without triggering immediate taxes. If he sells the Phoenix complex and completes a 1031 exchange, which statement is correct?`,
        options: [
          { id: 'A', text: 'He must identify replacement property within 180 days and close within 365 days' },
          { id: 'B', text: 'He can exchange into a Delaware Statutory Trust (DST) for passive ownership' },
          { id: 'C', text: 'The replacement property must be equal or lesser value to defer all taxes' },
          { id: 'D', text: 'He can use the proceeds to pay off mortgages on other properties without tax' }
        ],
        correctOptionId: 'B',
        explanation: `**1031 Exchange Rules and Options:**

**Why B is correct:**
Delaware Statutory Trusts (DSTs) are qualifying like-kind property under IRS Revenue Ruling 2004-86. DSTs allow:
- True passive ownership (no management responsibilities)
- Fractional interest in institutional-quality properties
- Diversification across multiple properties
- Professional management

This addresses Kevin's goal of reducing management burden.

**Why others are incorrect:**

**A:** Timelines are reversed. Must **identify** within 45 days, **close** within 180 days.

**C:** Backwards - replacement property must be **equal or GREATER** value to defer ALL gain. If replacement is lesser value, "boot" is recognized as taxable.

**D:** Using exchange proceeds to pay off existing mortgages is "boot" and triggers tax. The cash must go to the replacement property.

**Additional options for Kevin:**
- UPREIT contribution (exchange into operating partnership units)
- Qualified Opportunity Zone investment (different timing rules)
- Installment sale (spreads gain over time)
- Charitable Remainder Trust (income stream plus charitable deduction)`
      },
      {
        id: 'CFP-CASE-015-Q3',
        domain: 'RET',
        question: `Kevin has never worked as an employee and has no Social Security credits. At retirement, what Social Security benefits might he be eligible for?`,
        options: [
          { id: 'A', text: 'Reduced benefits based on his self-employment income over the years' },
          { id: 'B', text: 'SSI (Supplemental Security Income) if assets and income are low enough' },
          { id: 'C', text: 'No Social Security benefits - he hasn\'t paid into the system' },
          { id: 'D', text: 'Medicare only at age 65, no retirement benefits' }
        ],
        correctOptionId: 'C',
        explanation: `**Social Security and Self-Employment Income:**

**Key issue:** Kevin's rental income is NOT subject to self-employment tax.

**Why C is correct:**
- Real estate rental income is **passive income** under tax law
- Passive rental income is NOT subject to self-employment (FICA) taxes
- No FICA taxes = no Social Security credits earned
- Kevin has zero credits and therefore zero benefit eligibility

**To receive Social Security retirement benefits, you need:**
- 40 credits (typically 10 years of covered earnings)
- Credits come from wages or self-employment income subject to FICA

**Why D is partially wrong:**
- Medicare eligibility at 65 doesn't require work credits
- BUT you have to PAY the monthly premium if you have fewer than 40 credits
- People with 40+ credits get Medicare Part A premium-free

**Planning implication:**
Kevin must self-fund retirement entirely through:
- Property sales or rental income
- Solo 401(k) distributions
- Brokerage account
- Purchased annuities or bond ladder

He should also budget for Medicare premiums without the premium-free Part A benefit.`
      },
      {
        id: 'CFP-CASE-015-Q4',
        domain: 'TAX',
        question: `Kevin is considering relocating from California to Nevada to reduce state taxes. If he sells the Phoenix property AFTER establishing Nevada residency, what California tax consequence applies?`,
        options: [
          { id: 'A', text: 'No California tax - Nevada residency eliminates all California tax liability' },
          { id: 'B', text: 'California taxes deferred gains from prior 1031 exchanges on CA property regardless of residency' },
          { id: 'C', text: 'California can tax the full gain on non-California property sold within 1 year of move' },
          { id: 'D', text: 'California taxes only the portion of gain accrued while he was a California resident' }
        ],
        correctOptionId: 'B',
        explanation: `**California "Clawback" Rules for 1031 Exchanges:**

**Why B is correct:**
California tracks deferred gains from 1031 exchanges involving California property. Under CA R&TC Section 18032:

- If you defer gain on California property via 1031 exchange
- Then move out of state and sell the replacement property
- California can still tax the ORIGINAL deferred gain attributable to the California property

**Example for Kevin:**
If Kevin previously 1031'd a California property into the Phoenix property, California would tax the deferred California gain when he sells Phoenix, even as a Nevada resident.

**Why A is wrong:**
California aggressively pursues former residents who attempt to avoid California source gains. Simply moving doesn't eliminate liability for California-sourced income.

**Why D is wrong:**
This might apply to ongoing rental income, but for sales of property involved in 1031 exchange chains, California's specific tracking rules apply.

**Planning tip:**
Kevin should analyze the tax history of each property before moving. Sales of properties never connected to California (like the Denver building) would be Nevada-tax-free after establishing residency.`
      },
      {
        id: 'CFP-CASE-015-Q5',
        domain: 'EST',
        question: `Kevin wants his nephew Jason to receive most of his estate, but also wants to benefit the local community college. Which strategy achieves both goals while minimizing taxes?`,
        options: [
          { id: 'A', text: 'Leave all properties to Jason with a written request to donate to the college' },
          { id: 'B', text: 'Establish a Charitable Lead Trust with income to college for 15 years, remainder to Jason' },
          { id: 'C', text: 'Name the college as beneficiary of the Solo 401(k); leave real estate to Jason' },
          { id: 'D', text: 'Gift all properties to the college now and have Jason named as an employee' }
        ],
        correctOptionId: 'C',
        explanation: `**Optimal Asset Location for Estate Planning:**

**Why C is the best strategy:**

**Retirement accounts to charity:**
- IRAs/401(k)s are taxed as ordinary income to beneficiaries
- Jason would pay income tax on $420,000 at his marginal rate
- Charities pay NO tax on retirement account distributions
- Full $420,000 goes to the college

**Real estate to Jason:**
- Jason gets stepped-up basis to FMV at Kevin's death
- $1.1M of depreciation recapture is ELIMINATED
- $2.97M of appreciation ($5.75M - $2.78M basis) is ELIMINATED
- Jason inherits properties "clean" with no built-in gain

**Why others are suboptimal:**

**A:** "Written request" is not binding; no tax benefit; Jason inherits property with depreciation recapture issue

**B:** CLTs are complex; Jason must wait 15 years; real estate is illiquid for trust administration; Jason still has recapture issue

**D:** Kevin would trigger massive gains/recapture NOW; giving away appreciated property to charity wastes the potential step-up

**This is "asset location" for estate planning - put the most tax-inefficient assets where they're tax-free (charity), and tax-efficient assets where step-up applies (heirs).`
      },
      {
        id: 'CFP-CASE-015-Q6',
        domain: 'INV',
        question: `Kevin wants to transition to passive investments. If he sells a property and invests in a DST through a 1031 exchange, what is a key risk he should understand?`,
        options: [
          { id: 'A', text: 'DST interests cannot be exchanged again - he\'s locked in until sale' },
          { id: 'B', text: 'DSTs are only for accredited investors with net worth over $10 million' },
          { id: 'C', text: 'DST income is treated as ordinary income, not rental income' },
          { id: 'D', text: 'DST interests must be held for a minimum of 10 years' }
        ],
        correctOptionId: 'A',
        explanation: `**DST (Delaware Statutory Trust) Limitations:**

**Why A is correct - the "lock-in" risk:**
- When you 1031 exchange into a DST, you own a beneficial interest
- When the DST sells its property, you receive your share of proceeds
- You CAN do another 1031 exchange at that point...
- BUT you have NO control over when the DST sells
- DST sponsors typically hold properties 5-10 years
- If you need liquidity before then, you cannot force a sale
- There's very limited secondary market for DST interests

**Why others are wrong:**

**B:** DSTs require accredited investor status ($1M net worth or $200K income), not $10M

**C:** DST income retains its character - rental income passes through as rental income with depreciation

**D:** No minimum hold period exists - but practically, you're locked in until the sponsor sells the entire property

**Key DST risks:**
- Illiquidity
- No control over property decisions
- Sponsor/property selection risk
- Fees can be higher than direct ownership
- Cannot do further 1031 if DST converts to REIT`
      }
    ],
    scoringGuide: `
## Scoring Guide

**6 correct:** Excellent - Strong grasp of real estate taxation and planning
**4-5 correct:** Good - Review 1031 exchange rules and depreciation recapture
**Below 4:** Focus on Section 1250 recapture, DST limitations, and state tax issues

## Key Takeaways:
1. Real estate sales trigger Section 1250 recapture at 25% plus capital gains
2. DSTs allow passive 1031 exchange but limit future flexibility
3. Rental income doesn't generate Social Security credits
4. California tracks deferred gains on CA property even after residency change
5. Retirement accounts to charity + real estate to heirs = optimal estate plan
6. DST investors have no control over timing of property disposition
`
  },
  {
    id: 'CFP-CASE-016',
    title: 'Dr. Priya Sharma: Healthcare Professional Financial Planning',
    courseId: 'cfp',
    difficulty: 'medium',
    estimatedTime: 25,
    domains: ['RET', 'TAX', 'INV', 'GEN'],
    scenario: `
## Client Profile: Dr. Priya Sharma

**Dr. Priya Sharma** (Age 34)
- Emergency Medicine Physician at County Hospital (non-profit)
- Completed residency at age 30
- Board certified, 4 years in practice

**Income:**
- Base salary: $295,000
- Shift differentials/overtime: ~$35,000
- Total: ~$330,000

**Student Loans:**
- Federal Direct Loans (consolidated): $287,000
- Interest rate: 6.5% (weighted average)
- Currently enrolled in PAYE (Pay As You Earn)
- 48 qualifying PSLF payments made (began during residency)
- Monthly payment: $2,400 (income-driven)

**Retirement Accounts:**
- 403(b): $78,000 (contributing 6%, employer matches 3%)
- 457(b): $45,000 (maxing out at $23,000/year)
- Roth IRA: $28,000 (backdoor Roth since income exceeds limits)
- HSA: $18,000 (maxing out, using as stealth IRA - paying medical expenses out of pocket)

**Other Assets:**
- Taxable brokerage: $42,000 (emergency fund + investments)
- Cash savings: $25,000
- No real estate (renting a condo, $2,200/month)

**Family:**
- Single, no children
- Parents (ages 64 and 62) in good health, financially independent
- Younger brother (age 30) completing medical school

**Goals:**
1. Maximize PSLF forgiveness (expects $0 tax under current rules)
2. Decide whether to buy a home in high-cost area ($700K+ for starter home)
3. Retire by age 55 with $5M portfolio
4. Help brother with some of his medical school costs
5. Achieve better work-life balance (considering part-time in 5+ years)

**Concerns:**
- PSLF uncertainty - what if rules change?
- Burnout risk in emergency medicine
- Feeling "behind" on savings compared to college classmates
- Uncertain about investment allocation across account types

**Tax Situation:**
- Marginal rate: 32% federal + 6% state
- Files single
- Limited deductions (standard deduction, no itemizing)
`,
    questions: [
      {
        id: 'CFP-CASE-016-Q1',
        domain: 'GEN',
        question: `Dr. Sharma has made 48 qualifying PSLF payments and expects forgiveness after 120 payments. If she continues her current trajectory, how much total will she pay before forgiveness?`,
        options: [
          { id: 'A', text: '$115,200 (48 payments made) + 72 more at $2,400 = $288,000 total' },
          { id: 'B', text: 'Approximately $172,800 more (72 payments × $2,400), then forgiveness of remaining balance' },
          { id: 'C', text: '$2,400 × 120 = $288,000 total payments, but payments will increase with income' },
          { id: 'D', text: 'Cannot calculate - income changes will significantly affect payment amounts' }
        ],
        correctOptionId: 'C',
        explanation: `**PSLF Payment Calculation:**

**The correct insight (C):**
Under income-driven repayment (PAYE), payments are recalculated annually based on:
- AGI from prior tax return
- Family size
- Payment formula: 10% of discretionary income for PAYE

**Dr. Sharma's situation:**
- Current income: $330,000
- Current payment: $2,400/month
- 72 payments remaining

**Why C is best:**
- Simple calculation ($288,000) provides baseline
- BUT acknowledges income increases will raise payments
- As attending physician, her income may rise with experience
- Each year's income-driven recertification will adjust payments
- Total payments likely higher than $288,000

**Estimated forgiveness amount:**
- Original debt: $287,000
- Estimated payments over 10 years: ~$300,000-$350,000
- BUT loan balance grows with interest initially
- Estimated forgiveness: $100,000-$200,000 depending on when she started repayment

**Key PSLF facts:**
- Forgiven amount is tax-free under PSLF (not IDR forgiveness)
- Must work for qualifying employer for all 120 payments
- Must recertify employment annually`
      },
      {
        id: 'CFP-CASE-016-Q2',
        domain: 'TAX',
        question: `Dr. Sharma is pursuing the "backdoor Roth IRA" strategy because her income exceeds Roth IRA limits. Which potential complication should she be aware of?`,
        options: [
          { id: 'A', text: 'The backdoor Roth is illegal for high-income earners' },
          { id: 'B', text: 'The pro-rata rule could create taxes if she has other traditional IRA balances' },
          { id: 'C', text: 'Backdoor Roth contributions are limited to $3,000/year' },
          { id: 'D', text: 'She must wait 5 years after conversion before contributing again' }
        ],
        correctOptionId: 'B',
        explanation: `**Backdoor Roth IRA and the Pro-Rata Rule:**

**Why B is correct:**
The pro-rata rule aggregates ALL traditional IRA balances when calculating taxable portion of a conversion:

**Example of the problem:**
- If Dr. Sharma had a rollover IRA of $100,000 (all pre-tax)
- Plus a $7,000 non-deductible contribution
- Total IRA balance: $107,000
- Non-deductible portion: $7,000 / $107,000 = 6.5%
- Converting $7,000: Only $455 is tax-free (6.5% × $7,000)
- The remaining $6,545 is taxable

**Why Dr. Sharma is in good shape:**
- She has a 403(b) and 457(b), not rollover IRAs
- If she has no traditional IRA balance, her backdoor Roth is 100% tax-free
- The 403(b) and 457(b) are NOT included in pro-rata calculation

**Why others are wrong:**
**A:** Backdoor Roth is legal - it follows current tax law
**C:** Limit is $7,000 (2024) like any IRA contribution
**D:** No waiting period between contributions; the 5-year rule affects withdrawals, not contributions

**Action item:** Ensure any old 401(k)s are NOT rolled to traditional IRAs.`
      },
      {
        id: 'CFP-CASE-016-Q3',
        domain: 'RET',
        question: `Dr. Sharma has access to both a 403(b) and 457(b) plan. What is the key advantage of maximizing the 457(b) for someone planning to retire at 55?`,
        options: [
          { id: 'A', text: '457(b) has no 10% early withdrawal penalty regardless of age at separation' },
          { id: 'B', text: '457(b) contributions don\'t count against the annual 403(b) limit' },
          { id: 'C', text: '457(b) withdrawals are tax-free if taken before 59½' },
          { id: 'D', text: '457(b) accounts can be converted to Roth without income limits' }
        ],
        correctOptionId: 'A',
        explanation: `**457(b) Plans and Early Retirement:**

**Why A is correct - the "no penalty" advantage:**
Governmental 457(b) plans have a unique benefit:
- No 10% early withdrawal penalty
- Distributions are taxable as ordinary income
- Can access funds at any age after separation from service
- Perfect for early retirees like Dr. Sharma at 55

**Why B is also true (but not the KEY advantage for the question):**
- Yes, 403(b) and 457(b) have SEPARATE $23,000 limits
- She CAN contribute $23,000 to 403(b) AND $23,000 to 457(b)
- Allows $46,000/year in deferrals (plus employer match to 403(b))
- But this doesn't address the age-55 retirement goal directly

**Why others are wrong:**
**C:** 457(b) withdrawals are TAXABLE (ordinary income), just no penalty
**D:** 457(b) to Roth conversions follow normal rules; no special bypass

**Dr. Sharma's strategy:**
- 457(b) funds: Access penalty-free from age 55-59½
- 403(b) funds: Wait until 59½, or use Rule of 55 if she separates at 55
- Roth IRA: Contributions accessible anytime; earnings after 59½
- HSA: Medical expenses anytime; general use after 65`
      },
      {
        id: 'CFP-CASE-016-Q4',
        domain: 'INV',
        question: `Dr. Sharma mentions feeling "behind" compared to non-medical classmates. She started earning real income at 30. To reach $5M by age 55, what annual savings rate is approximately needed (assuming 7% return)?`,
        options: [
          { id: 'A', text: 'Approximately $80,000/year' },
          { id: 'B', text: 'Approximately $100,000/year' },
          { id: 'C', text: 'Approximately $65,000/year' },
          { id: 'D', text: 'Approximately $120,000/year' }
        ],
        correctOptionId: 'A',
        explanation: `**Future Value Calculation:**

**Given information:**
- Current age: 34
- Target age: 55
- Years: 21 years
- Current savings: ~$211,000 ($78K + $45K + $28K + $18K + $42K)
- Target: $5,000,000
- Assumed return: 7%

**Calculation approach:**
1. Future value of current savings: $211,000 × (1.07)^21 ≈ $865,000
2. Remaining needed: $5,000,000 - $865,000 = $4,135,000
3. Annual savings to accumulate $4.135M over 21 years at 7%:
   - Using FV of annuity formula
   - PMT = $4,135,000 / FV annuity factor (7%, 21 years)
   - FV factor ≈ 48.0
   - PMT ≈ $86,000/year

**Answer A (~$80,000/year) is approximately correct**

**Feasibility check:**
- Income: $330,000
- Taxes (~35%): $115,500
- Net: $214,500
- Savings: $80,000 (37% savings rate)
- Living expenses: $134,500/year
- Doable but requires discipline

**Note:** Student loan payments ($28,800/year) come out of the $134,500 living expenses until PSLF forgiveness.`
      },
      {
        id: 'CFP-CASE-016-Q5',
        domain: 'TAX',
        question: `Dr. Sharma contributes to her HSA and pays medical expenses out of pocket, keeping receipts. What is the long-term benefit of this "stealth IRA" strategy?`,
        options: [
          { id: 'A', text: 'She can withdraw HSA funds tax-free for any purpose after age 65' },
          { id: 'B', text: 'She can reimburse herself for documented medical expenses years later, tax-free' },
          { id: 'C', text: 'HSA funds grow tax-deferred and convert to Roth IRA status at age 59½' },
          { id: 'D', text: 'She avoids required minimum distributions that would apply to traditional IRAs' }
        ],
        correctOptionId: 'B',
        explanation: `**HSA "Stealth IRA" Strategy:**

**Why B is correct:**
The HSA has no deadline for reimbursement of qualified medical expenses:
- Pay medical expenses out of pocket now
- Keep receipts (indefinitely)
- Let HSA grow tax-free
- Reimburse yourself years or decades later
- Withdrawal is tax-free (qualified expense)
- No requirement to reimburse in the same year

**Dr. Sharma's approach:**
- Max HSA contributions: $4,150/year (2024 individual)
- Pay routine medical expenses from checking account
- Keep receipts in a folder/app
- Let HSA compound for 20+ years
- Withdraw tax-free in retirement using saved receipts

**Why others are wrong:**
**A:** After 65, non-qualified withdrawals are penalty-free but TAXABLE as income (like traditional IRA). Only medical expenses are tax-free.
**C:** HSA doesn't convert to anything - it stays an HSA forever
**D:** This IS true (HSAs have no RMDs), but it's not the main benefit of the "stealth IRA" strategy described

**Triple tax advantage:**
1. Contributions: Tax-deductible
2. Growth: Tax-free
3. Withdrawals: Tax-free for medical expenses`
      },
      {
        id: 'CFP-CASE-016-Q6',
        domain: 'GEN',
        question: `Dr. Sharma wants to help her brother with medical school costs. If she gifts $18,000 toward his tuition this year, what are the gift tax implications?`,
        options: [
          { id: 'A', text: 'She must file a gift tax return for the full $18,000' },
          { id: 'B', text: 'The gift is fully excludible under the annual exclusion ($18,000 for 2024)' },
          { id: 'C', text: 'She could pay the school directly and have unlimited exclusion, or use the annual exclusion' },
          { id: 'D', text: 'Gifts for education only qualify if paid to 529 plans' }
        ],
        correctOptionId: 'C',
        explanation: `**Education Gift Strategies:**

**Why C is correct - two separate exclusions:**

**Option 1: Education expense exclusion (unlimited)**
- Pay qualifying educational institution DIRECTLY
- Qualifies for unlimited exclusion under IRC Section 2503(e)
- No gift tax return required
- Does NOT use annual exclusion or lifetime exemption
- Must be for tuition only (not room/board)

**Option 2: Annual gift exclusion ($18,000 for 2024)**
- Cash gift to brother
- Under annual exclusion amount
- No gift tax return required
- He can use for any purpose (tuition, living expenses, etc.)

**Why C is best answer:**
She has TWO valid options:
1. Pay tuition directly → unlimited tuition exclusion (better for large amounts)
2. Gift cash within annual exclusion → flexible use by brother

**Why others are wrong:**
**A:** $18,000 is exactly the 2024 annual exclusion - no return needed
**B:** True but incomplete - doesn't mention the BETTER option of direct tuition payment
**D:** Completely wrong - direct tuition payment is a separate exclusion; 529s are different planning tools

**Best strategy:** Pay tuition directly to preserve annual exclusion for other gifts.`
      }
    ],
    scoringGuide: `
## Scoring Guide

**6 correct:** Excellent - Strong understanding of physician financial planning
**4-5 correct:** Good - Review PSLF rules and retirement account strategies
**Below 4:** Focus on backdoor Roth, 457(b) advantages, and HSA optimization

## Key Takeaways:
1. PSLF requires 120 payments at qualifying employer - tax-free forgiveness
2. Pro-rata rule affects backdoor Roth if traditional IRA balances exist
3. 457(b) has no early withdrawal penalty - ideal for early retirement
4. HSA "stealth IRA" strategy: pay OOP, save receipts, withdraw tax-free later
5. Direct tuition payments qualify for unlimited gift exclusion
6. Physicians starting late can still achieve early retirement with high savings rate
`
  },
  {
    id: 'CFP-CASE-017',
    title: 'The Garcia Family: Inherited IRA & Estate Settlement',
    courseId: 'cfp',
    difficulty: 'medium',
    estimatedTime: 22,
    domains: ['RET', 'TAX', 'EST', 'GEN'],
    scenario: `
## Client Profile: The Garcia Family

**Maria Garcia** (Age 52)
- Marketing Director at technology company
- Salary: $145,000
- Recently lost her mother (Rosa, age 78) in March 2025

**Spouse: Carlos Garcia** (Age 55)
- Operations Manager, manufacturing company
- Salary: $95,000

**Children:**
- Sophia (Age 24): Graduate student, limited income
- Daniel (Age 21): College senior

**Mother's Estate (Maria is sole beneficiary):**
- Traditional IRA: $620,000
- Roth IRA: $180,000
- Brokerage account: $340,000 (cost basis $125,000)
- House in Arizona: $425,000 (paid off, basis $85,000)
- Bank accounts: $45,000

**Total Inheritance:** ~$1.61 million

**Estate Status:**
- Maria named as sole beneficiary on all accounts
- Simple will leaving everything to Maria
- No trusts established
- Estate is below federal estate tax exemption
- Arizona has no state estate tax

**Current Garcia Family Assets:**
- Maria's 401(k): $380,000
- Carlos's 401(k): $290,000
- Joint taxable: $120,000
- Home equity: $280,000
- 529 plans: $45,000 (Sophia) + $35,000 (Daniel)

**Goals:**
1. Handle inheritance tax-efficiently
2. Understand distribution requirements for inherited IRAs
3. Decide what to do with Arizona house (sell vs. keep as rental/vacation)
4. Help Sophia with graduate school costs
5. Accelerate their own retirement timeline (both want to retire by 60)

**Concerns:**
- Overwhelmed by complexity and grieving
- Worried about making tax mistakes with inherited accounts
- Arizona house needs $40,000 in repairs
- Not sure if they should pay off their mortgage ($180,000 remaining)

**Tax Situation:**
- Combined income: $240,000
- Marginal rate: 32%
- Currently itemizing (state tax, mortgage interest)
`,
    questions: [
      {
        id: 'CFP-CASE-017-Q1',
        domain: 'RET',
        question: `Maria inherited a $620,000 Traditional IRA from her mother Rosa (who died at age 78). Under current rules, what distribution requirement applies to Maria?`,
        options: [
          { id: 'A', text: 'Stretch distributions over Maria\'s life expectancy since Rosa was taking RMDs' },
          { id: 'B', text: 'Complete distribution within 10 years, with annual RMDs required each year' },
          { id: 'C', text: 'Complete distribution within 10 years; no annual minimums required' },
          { id: 'D', text: 'Complete distribution within 5 years since Rosa had already started RMDs' }
        ],
        correctOptionId: 'B',
        explanation: `**SECURE Act Inherited IRA Rules (2020+):**

**Maria's situation:**
- Mother Rosa: Died at age 78 (already past RMD age 73)
- Maria: Age 52, non-spouse beneficiary
- Not an Eligible Designated Beneficiary (EDB)

**Rule for non-EDB inheriting from someone post-RMD:**
- 10-year rule applies (SECURE Act)
- PLUS annual RMDs required because decedent had already started RMDs
- Account must be fully emptied by end of year 10

**Why B is correct:**
- 10-year window: Maria has until December 31, 2035
- Annual RMDs: Required because Rosa was 78 (past 73 RMD start)
- IRS clarified this in 2022 proposed regulations

**The 10-year/RMD hybrid:**
Years 1-9: Take at least the RMD each year (based on beneficiary's life expectancy)
Year 10: Withdraw entire remaining balance

**Why others are wrong:**
**A:** "Stretch" rules eliminated by SECURE Act for most non-spouse beneficiaries
**C:** Would be true if Rosa died BEFORE her RBD (required beginning date)
**D:** 5-year rule applies only to non-designated beneficiaries (estates, charities)

**Eligible Designated Beneficiaries (EDBs) who CAN stretch:**
Surviving spouses, minor children (until majority), disabled/chronically ill, beneficiaries within 10 years of age`
      },
      {
        id: 'CFP-CASE-017-Q2',
        domain: 'TAX',
        question: `Maria also inherited a $180,000 Roth IRA. What are the distribution requirements for the inherited Roth IRA?`,
        options: [
          { id: 'A', text: '10-year rule with annual RMDs required' },
          { id: 'B', text: '10-year rule with no annual RMDs; all distributions tax-free' },
          { id: 'C', text: 'Can be rolled into Maria\'s own Roth IRA' },
          { id: 'D', text: 'No RMDs required - can keep the account indefinitely' }
        ],
        correctOptionId: 'B',
        explanation: `**Inherited Roth IRA Rules:**

**Key differences from Traditional inherited IRA:**

**Why B is correct:**
- 10-year rule still applies (same as Traditional)
- BUT no annual RMD requirement
- Roth IRAs never have lifetime RMDs (owner never started RMDs)
- All qualified distributions are tax-free
- Maria can leave it alone for 9 years, then take full balance in year 10

**Why this is powerful:**
- Maria can let $180,000 grow tax-free for 10 years
- At 7% growth: $180,000 → ~$354,000
- Entire amount withdrawable tax-free
- No impact on her current tax bracket during accumulation years

**Why others are wrong:**
**A:** No annual RMDs for Roth (owner's RBD is treated as not yet reached)
**C:** Non-spouse beneficiaries cannot roll inherited IRAs into their own accounts; must keep as inherited
**D:** 10-year rule still applies per SECURE Act

**Strategy for Maria:**
- Take NOTHING from inherited Roth until end of year 10
- Take distributions from inherited Traditional IRA strategically to manage tax brackets
- Let Roth continue maximum tax-free growth`
      },
      {
        id: 'CFP-CASE-017-Q3',
        domain: 'TAX',
        question: `Maria inherited the Arizona house with FMV of $425,000 and her mother's basis was $85,000. If Maria sells the house for $420,000 after inheriting, what is her taxable gain?`,
        options: [
          { id: 'A', text: '$335,000 (sale price minus original basis)' },
          { id: 'B', text: '$0 gain (stepped-up basis equals current FMV)' },
          { id: 'C', text: '$5,000 loss (would offset other gains)' },
          { id: 'D', text: '$340,000 (sale price minus basis, minus allowed deductions)' }
        ],
        correctOptionId: 'C',
        explanation: `**Step-Up in Basis at Death:**

**How it works:**
- Original basis (Rosa's): $85,000
- Stepped-up basis (Maria's): $425,000 (FMV at death)
- Sale price: $420,000
- Result: **$5,000 LOSS**

**Why C is correct:**
When property is inherited:
- Beneficiary's basis = FMV at date of death
- This "step-up" eliminates all built-in gain ($340,000 in this case)
- If sold shortly after for less than FMV at death, a loss is recognized
- Loss can offset capital gains or up to $3,000 of ordinary income

**Tax impact:**
- No capital gains tax owed
- $5,000 capital loss can offset other gains
- Alternatively, offset $3,000 of ordinary income this year, carry forward $2,000

**Why this matters:**
If Rosa had sold the house before death:
- Gain: $425,000 - $85,000 = $340,000
- Tax at 15%: $51,000

By inheriting: Maria's tax = $0 (actually a small loss benefit)

**Note on repairs:**
The $40,000 in needed repairs would be capitalized if Maria keeps the house, or could reduce net sale proceeds if sold "as-is."

**Estate planning takeaway:**
Highly appreciated assets should generally be held until death (for step-up), not gifted during life (carryover basis).`
      },
      {
        id: 'CFP-CASE-017-Q4',
        domain: 'RET',
        question: `Maria is considering strategies to minimize tax impact of the inherited Traditional IRA over the 10-year period. What is the most tax-efficient approach?`,
        options: [
          { id: 'A', text: 'Withdraw entire $620,000 in year 1 to "rip off the bandaid"' },
          { id: 'B', text: 'Take minimum RMDs only for 9 years, then empty account in year 10' },
          { id: 'C', text: 'Spread distributions evenly across all 10 years' },
          { id: 'D', text: 'Time larger distributions during lower-income years (retirement, gap years)' }
        ],
        correctOptionId: 'D',
        explanation: `**IRA Distribution Income Planning:**

**Why D is optimal (income timing):**
The goal is to minimize total taxes paid by managing which tax brackets apply:

**Maria's situation:**
- Current income: $240,000 (combined)
- Marginal rate: 32%
- Potential future scenarios:
  - If one spouse retires early: Income drops
  - Kids finish school: Deductions change
  - Age 59-65 gap: Potentially lower income before Social Security

**Strategy:**
- Years with high income: Take only required RMDs
- Years with low income (retirement, sabbatical): Take larger distributions
- "Fill up" lower brackets when available (24% vs 32%+)

**Why others are suboptimal:**

**A (lump sum):** $620,000 on top of $240,000 = massive 37% bracket exposure. Terrible.

**B (back-loaded):** If income stays high, year 10 withdrawal of accumulated balance could push into 35%+ bracket

**C (even spread):** $62,000/year added to $240,000 = consistent 32-35% rate. Okay but not optimal.

**Example of D in action:**
- Years 1-7: Take $30,000/year RMDs while working = 32% tax
- Year 8: Carlos retires (income $145K), take $100,000 = fills 22% and 24% brackets
- Year 9-10: Similar strategy

This could save $20,000-$40,000 in total taxes versus even distributions.`
      },
      {
        id: 'CFP-CASE-017-Q5',
        domain: 'EST',
        question: `Maria is overwhelmed and asks what immediate actions she should take regarding the inherited accounts. What is the most critical time-sensitive action?`,
        options: [
          { id: 'A', text: 'Retitle inherited IRAs as beneficiary IRAs within 60 days' },
          { id: 'B', text: 'Transfer brokerage account and bank accounts to her name within 90 days' },
          { id: 'C', text: 'Establish the inherited IRA accounts with proper titling; take year-of-death RMD if not yet taken' },
          { id: 'D', text: 'Sell all investments and move to cash within 6 months of death' }
        ],
        correctOptionId: 'C',
        explanation: `**Critical Post-Death Actions for Inherited Retirement Accounts:**

**Why C is most critical:**

**1. Proper titling is essential:**
Correct: "Rosa Garcia IRA (Deceased 3/15/2025) FBO Maria Garcia, Beneficiary"
- NOT rolled into Maria's own IRA (she's not a spouse)
- NOT titled as "Maria Garcia IRA"
- Proper titling preserves inherited IRA rules and 10-year window

**2. Year-of-death RMD may be required:**
- Rosa was 78 (past RMD age)
- If Rosa hadn't taken her full 2025 RMD before death, Maria must take it
- Due by December 31, 2025
- Failure = 25% penalty on amount not withdrawn (reduced from 50%)

**Why others are wrong:**

**A:** There's no 60-day rule for retitling inherited IRAs; 60-day rule applies to rollovers

**B:** No strict timeline for non-retirement accounts, though sooner is better for practical reasons

**D:** No requirement to sell investments; liquidating could trigger unnecessary taxes or miss market recovery

**Checklist for Maria:**
1. Check if Rosa took 2025 RMD - if not, take it by 12/31/2025
2. Transfer IRAs to properly titled inherited IRA accounts at her chosen custodian
3. Verify beneficiary designations on her own accounts
4. Consult CPA before making any large distributions`
      },
      {
        id: 'CFP-CASE-017-Q6',
        domain: 'GEN',
        question: `The Garcias are considering using part of the inheritance to pay off their $180,000 mortgage (4.5% rate, 18 years remaining). Given their situation, what is the best advice?`,
        options: [
          { id: 'A', text: 'Pay off mortgage immediately using brokerage account inheritance to eliminate monthly payment' },
          { id: 'B', text: 'Keep the mortgage for tax benefits; invest inheritance in diversified portfolio' },
          { id: 'C', text: 'Pay off mortgage using inherited Traditional IRA distributions, spreading over several years' },
          { id: 'D', text: 'Make no changes to mortgage; use inheritance for inherited IRA taxes and retirement acceleration' }
        ],
        correctOptionId: 'D',
        explanation: `**Mortgage Payoff Analysis:**

**Context:**
- Mortgage: $180,000 at 4.5%
- Effective rate after tax deduction: ~3.0-3.5% (they itemize)
- Expected investment returns: 6-8% historically
- Need cash for inherited IRA distributions = taxable event

**Why D is best:**

**1. Cash needs for IRA taxes:**
- $620,000 Traditional IRA must be distributed over 10 years
- At 32% marginal rate: ~$200,000 in total taxes due
- Need liquidity to pay taxes without selling other assets at bad times

**2. Retirement acceleration goal:**
- Both want to retire by 60 (8 years for Maria, 5 for Carlos)
- Need to BUILD assets, not reduce debt at low rates
- Mortgage payment is manageable with current income

**3. Investment math:**
- Mortgage rate (after tax): ~3.2%
- Expected portfolio return: 6-8%
- Spread of 3-5% annually favors investing

**Why others are suboptimal:**

**A:** Depletes liquid inheritance; creates opportunity cost of growth

**B:** "Tax benefits" argument is weak - standard deduction may beat itemizing in future; but investment point is valid

**C:** Uses highest-taxed assets (Traditional IRA) to pay off lowest-cost debt - inefficient

**Best use of inheritance:**
1. Emergency reserve enhancement
2. Tax payments on IRA distributions
3. Retirement account contributions (max 401k)
4. Diversified taxable investments for early retirement access`
      }
    ],
    scoringGuide: `
## Scoring Guide

**6 correct:** Excellent - Strong understanding of inherited IRA rules
**4-5 correct:** Good - Review SECURE Act rules and estate settlement priorities
**Below 4:** Focus on 10-year rule, step-up basis, and beneficiary distribution strategies

## Key Takeaways:
1. Non-spouse beneficiaries: 10-year rule with annual RMDs if decedent was past RBD
2. Inherited Roth IRAs: 10-year rule but no annual RMDs required
3. Step-up in basis eliminates all built-in gain on inherited property
4. Spread IRA distributions to low-income years for tax efficiency
5. Year-of-death RMD must be taken if decedent hadn't completed it
6. Keep liquidity for IRA taxes rather than paying off low-rate mortgage
`
  }
];

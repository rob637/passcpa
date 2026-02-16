/**
 * CFP Case Studies - Batch 4
 * Additional case studies: Small Business Owner, Healthcare Planning, Sudden Wealth
 */

import { CaseStudy } from '../../../types';

export const CFP_CASE_STUDIES_BATCH4: CaseStudy[] = [
  // ============================================
  // Case Study 10: Small Business Owner Planning
  // ============================================
  {
    id: 'CFP-CASE-010',
    title: 'The Patel Practice: Dental Practice Ownership',
    courseId: 'cfp',
    difficulty: 'hard',
    estimatedTime: 22,
    domains: ['RET', 'TAX', 'RISK', 'GEN', 'EST'],
    scenario: `
## Client Profile: Dr. Priya Patel

**Dr. Priya Patel** (Age 45)
- Solo dental practice owner (S-Corporation)
- Practice revenue: $1.2 million annually
- W-2 salary from practice: $250,000
- S-Corp distributions: ~$150,000/year
- Practice employs: 2 hygienists, 2 assistants, 1 office manager

**Spouse: Raj Patel** (Age 47)
- Software engineer
- Salary: $185,000
- 401(k) balance: $520,000 (maxing contributions)

**Children:**
- Anika (Age 17): Senior in high school, wants to attend private university
- Dev (Age 14): Interested in following mom into dentistry

**Business Assets:**
- Dental practice value: ~$850,000 (goodwill + equipment)
- Practice real estate (owned separately): $650,000 (mortgage: $280,000)
- Practice equipment: $180,000 (financed: $45,000 remaining)

**Personal Assets:**
- Primary residence: $780,000 (mortgage: $320,000)
- Joint brokerage: $285,000
- Raj's 401(k): $520,000
- Priya's SEP-IRA: $420,000
- 529 plans: $65,000 total

**Insurance:**
- Priya: $2M term life, individual disability (own-occ), malpractice
- Raj: $500,000 group term, group LTD
- Practice: Business overhead expense (BOE) disability

**Goals:**
1. Maximize retirement savings through practice
2. Develop exit strategy (sell practice in 10-15 years)
3. Fund Anika's education efficiently
4. Ensure business continuity if Priya is disabled
5. Minimize overall tax burden
`,
    questions: [
      {
        id: 'CFP-CASE-010-Q1',
        domain: 'RET',
        question: 'Priya currently uses a SEP-IRA for retirement savings. For 2026, what is her maximum SEP contribution?',
        options: [
          { id: 'A', text: '$23,500 (employee elective deferral limit)' },
          { id: 'B', text: '$62,500 (25% of compensation)' },
          { id: 'C', text: '$69,000 (total annual additions limit)' },
          { id: 'D', text: '$76,500 (including catch-up)' }
        ],
        correctOptionId: 'B',
        explanation: `**SEP-IRA Contribution Rules:**

**2026 Limits:**
- Maximum contribution: 25% of W-2 compensation
- Annual limit cap: $69,000 (indexed)

**Priya's calculation:**
- W-2 salary: $250,000
- Maximum SEP: $250,000 × 25% = **$62,500**

**Why not more?**
- SEP-IRA is employer-only contribution
- No employee elective deferrals
- 25% is the employer contribution limit

**Important:** S-Corp distributions do NOT count as compensation for retirement plan purposes. Only W-2 wages count.

**Alternative consideration:** Priya could switch to a Solo 401(k) with profit sharing:
- Employee deferral: $23,500
- Employer profit sharing: 25% of W-2
- Total potential: $23,500 + $62,500 = $86,000
- Plus catch-up if over 50: +$7,500 = $93,500

Solo 401(k) allows significantly more savings at same salary level.`
      },
      {
        id: 'CFP-CASE-010-Q2',
        domain: 'RET',
        question: 'If Priya converts her SEP-IRA to a Solo 401(k) with cash balance pension, she could potentially contribute:',
        options: [
          { id: 'A', text: 'Same amount as SEP-IRA—plan type doesn\'t matter' },
          { id: 'B', text: 'Up to $93,500 (Solo 401(k) limits only)' },
          { id: 'C', text: 'Over $200,000 annually through combined defined benefit and 401(k)' },
          { id: 'D', text: 'Must choose between Solo 401(k) OR cash balance, not both' }
        ],
        correctOptionId: 'C',
        explanation: `**Cash Balance + 401(k) Combination:**

Priya can stack retirement plans:

**Solo 401(k) contributions:**
- Employee deferral: $23,500
- Employer profit sharing: up to $69,000 total limit
- Catch-up (age 50+): $7,500
- At 45, she's not yet eligible for catch-up

**Cash Balance Pension:**
- Defined benefit plan with individual account appearance
- Contribution based on actuarial formula
- At age 45 with $250,000 salary: ~$120,000-$150,000 annually
- Higher contributions allowed as you get older

**Combined potential:**
- 401(k): ~$69,000
- Cash Balance: ~$140,000
- **Total: ~$200,000+** in tax-deferred savings

**Requirements:**
- Must cover eligible employees proportionally
- Cash balance requires actuarial administration (~$2,000-$3,000/year)
- Best for high-income owners age 40+

This strategy is ideal for practice owners trying to catch up on retirement savings.`
      },
      {
        id: 'CFP-CASE-010-Q3',
        domain: 'TAX',
        question: 'Priya\'s S-Corp pays her $250,000 W-2 salary and distributes $150,000. The S-Corp distribution is:',
        options: [
          { id: 'A', text: 'Subject to self-employment tax' },
          { id: 'B', text: 'Subject to income tax but NOT self-employment tax' },
          { id: 'C', text: 'Tax-free return of capital' },
          { id: 'D', text: 'Taxed as qualified dividends at 15-20%' }
        ],
        correctOptionId: 'B',
        explanation: `**S-Corporation Distribution Taxation:**

**S-Corp structure (Priya's situation):**
- W-2 salary ($250,000): Subject to income tax + payroll tax (FICA)
- S-Corp distribution ($150,000): Subject to income tax only, NO payroll tax

**Why this saves taxes:**
- Self-employment/payroll tax: 15.3% (up to wage base) + 2.9% Medicare
- At $150,000 distribution: Saves ~$5,800 in Medicare tax alone

**Important rules:**
1. Salary must be "reasonable compensation" for services
2. IRS scrutinizes S-Corps that pay low salary to avoid payroll tax
3. Priya's $250,000 is reasonable for a practice owner dentist

**Compared to sole proprietorship:**
- All $400,000 net income would be subject to self-employment tax
- S-Corp structure saves significant payroll taxes

**Distribution basis rules:**
- Distributions are tax-free up to Priya's stock basis
- Distributions exceeding basis are capital gains
- Proper tracking of basis is essential`
      },
      {
        id: 'CFP-CASE-010-Q4',
        domain: 'RISK',
        question: 'Priya has Business Overhead Expense (BOE) disability insurance. This policy would cover:',
        options: [
          { id: 'A', text: 'Priya\'s personal income during disability' },
          { id: 'B', text: 'Practice expenses like rent, staff wages, and utilities while Priya is disabled' },
          { id: 'C', text: 'The cost to buy out Priya\'s practice if she\'s permanently disabled' },
          { id: 'D', text: 'Malpractice claims during her disability' }
        ],
        correctOptionId: 'B',
        explanation: `**Business Overhead Expense (BOE) Insurance:**

**What BOE covers:**
- Rent/mortgage on practice space
- Employee salaries and benefits
- Utilities (electric, phone, internet)
- Professional dues and license fees
- Equipment leases
- Accounting and legal fees
- Insurance premiums

**What BOE does NOT cover:**
- Owner's income (that's personal disability insurance)
- Buy-sell funding (that's a separate policy)
- Business loans/equipment financing principal

**Priya's practice expenses:**
- Monthly overhead: ~$40,000-$50,000
- BOE benefit should match this amount
- Typical elimination period: 30 days
- Typical benefit period: 12-24 months

**Why BOE is critical:**
- Keeps practice operational while Priya recovers
- Retains staff who would otherwise leave
- Maintains patient relationships through temp coverage
- Protects practice value for eventual return or sale

Priya also needs her individual disability policy for personal income replacement.`
      },
      {
        id: 'CFP-CASE-010-Q5',
        domain: 'EST',
        question: 'Priya is developing an exit strategy to sell her practice in 10-15 years. Which sale structure would likely provide the BEST tax outcome?',
        options: [
          { id: 'A', text: 'Asset sale with all proceeds taxed as ordinary income' },
          { id: 'B', text: 'Stock sale of S-Corp shares at long-term capital gains rates' },
          { id: 'C', text: 'Asset sale with allocation to goodwill and tangible assets' },
          { id: 'D', text: 'Gifting the practice to children before sale' }
        ],
        correctOptionId: 'C',
        explanation: `**Practice Sale Tax Strategies:**

**Asset Sale (most common for dental practices):**
- Buyer prefers asset sale (step-up in basis)
- Seller must allocate purchase price among assets

**Allocation matters for taxes:**
| Asset Category | Tax Treatment |
|----------------|---------------|
| Equipment (depreciated) | Ordinary income (recapture) |
| Supplies/inventory | Ordinary income |
| **Goodwill** | **Long-term capital gains** |
| Non-compete agreement | Ordinary income |
| Real estate | Capital gains |

**For Priya:**
- Practice value: $850,000
- Much of this is goodwill (patient relationships, reputation)
- Goodwill = 15-20% capital gains rate
- Maximize goodwill allocation in purchase agreement

**Stock sale:**
- All capital gains (good for seller)
- But buyers rarely want S-Corp stock (inherit tax attributes)
- Must negotiate with buyer

**Planning:** Start preparing 3-5 years before sale. Document goodwill value, clean up financials, maximize transferable value.`
      },
      {
        id: 'CFP-CASE-010-Q6',
        domain: 'GEN',
        question: 'Priya owns her practice real estate separately from the dental practice. This structure provides:',
        options: [
          { id: 'A', text: 'No benefit—should be owned by the practice' },
          { id: 'B', text: 'Asset protection, additional retirement income stream, and flexibility at sale' },
          { id: 'C', text: 'Lower property taxes' },
          { id: 'D', text: 'Exemption from malpractice claims' }
        ],
        correctOptionId: 'B',
        explanation: `**Separating Practice Real Estate:**

**Benefits of separate ownership:**

1. **Asset protection:**
   - Real estate in separate LLC
   - Practice liabilities don't reach real estate
   - Malpractice suit can't take the building

2. **Retirement income:**
   - Practice pays rent to Priya's real estate LLC
   - Tax-deductible to practice, rental income to Priya
   - After practice sale, continue renting to new owner
   - Passive income stream in retirement

3. **Sale flexibility:**
   - Can sell practice separately from real estate
   - New owner might want to lease, not buy building
   - Two liquidity events instead of one

4. **Estate planning:**
   - Can transfer real estate to children gradually
   - Practice stays with Priya until sale/retirement
   - 1031 exchange possible for real estate

**Priya's situation:**
- Practice value: $850,000 (sell in 10-15 years)
- Real estate: $650,000 (keep or sell separately)
- Mortgage will be paid off, generating pure rental income`
      }
    ],
    scoringGuide: `
## Scoring Guide

**6 correct:** Excellent - Strong business owner planning knowledge
**5 correct:** Good - Review missed concepts
**3-4 correct:** Fair - Focus on retirement plan options
**Below 3:** Significant review needed

## Key Business Owner Takeaways:
1. Solo 401(k) + Cash Balance can exceed $200,000/year in contributions
2. S-Corp distributions avoid payroll tax (with reasonable salary)
3. BOE insurance covers practice expenses, not owner income
4. Asset sale with goodwill allocation optimizes taxes
5. Separate real estate ownership provides asset protection
6. SEP-IRA limits are 25% of W-2, not total income
`
  },
  // ============================================
  // Case Study 11: Medicare and Healthcare Planning
  // ============================================
  {
    id: 'CFP-CASE-011',
    title: 'The Andersons: Navigating Medicare and Early Retirement',
    courseId: 'cfp',
    difficulty: 'medium',
    estimatedTime: 18,
    domains: ['RISK', 'RET', 'TAX', 'GEN'],
    scenario: `
## Client Profile: The Andersons

**Robert Anderson** (Age 63)
- Retiring from corporate job in 6 months
- Current salary: $145,000
- Will receive pension: $4,200/month starting at retirement (no COLA)
- 401(k) balance: $890,000 (70% pre-tax, 30% Roth)

**Susan Anderson** (Age 60)
- Part-time bookkeeper (self-employed)
- Net self-employment income: $42,000
- No retirement plan established
- Plans to work until 67

**Current Health Coverage:**
- Both covered under Robert's employer plan
- Cost: $380/month employee portion
- Coverage ending in 6 months when Robert retires

**Social Security Estimates (FRA 67):**
- Robert: $3,100/month at FRA, $2,170 at 62, $3,844 at 70
- Susan: $1,800/month at FRA, $1,260 at 62, $2,232 at 70

**Assets:**
- Joint brokerage: $220,000
- Robert's 401(k): $890,000
- Home: $425,000 (paid off)
- Emergency fund: $55,000

**Health Status:**
- Robert: Well-controlled Type 2 diabetes, takes 2 medications
- Susan: Excellent health, no prescriptions

**Goals:**
1. Bridge healthcare gap between retirement and Medicare
2. Understand Medicare options and costs
3. Optimize Social Security claiming
4. Generate $7,500/month retirement income
5. Minimize IRMAA surcharges
`,
    questions: [
      {
        id: 'CFP-CASE-011-Q1',
        domain: 'RISK',
        question: 'Robert retires at 63.5 and loses employer coverage. For the 18-month gap until Medicare at 65, the BEST option is typically:',
        options: [
          { id: 'A', text: 'COBRA continuation for up to 18 months' },
          { id: 'B', text: 'Spouse\'s employer plan if available' },
          { id: 'C', text: 'ACA Marketplace plan with potential subsidies' },
          { id: 'D', text: 'Short-term medical insurance' }
        ],
        correctOptionId: 'C',
        explanation: `**Healthcare Bridge Options Analysis:**

**COBRA:**
- Continues existing coverage for 18 months
- Cost: Full premium + 2% admin fee
- Could be $1,500-$2,500/month for couple
- No subsidies available

**ACA Marketplace:**
- Coverage regardless of pre-existing conditions (Robert's diabetes)
- Potential premium subsidies based on MAGI
- If retiring, income may qualify for significant subsidies
- Robert/Susan with pension + $42K = ~$92,400 MAGI
- At this income level, subsidies reduce premiums substantially

**Why ACA wins for Andersons:**
- COBRA would be ~$2,000/month
- ACA with subsidies: ~$800-$1,200/month for quality coverage
- Robert's diabetes is covered (no exclusions)
- Susan stays on same plan (not turning 65)

**Short-term insurance:**
- NOT recommended for Robert (diabetes may be excluded)
- Limited coverage for pre-existing conditions
- Not ACA-compliant

**Planning:** Time Robert's retirement for Special Enrollment Period coordination.`
      },
      {
        id: 'CFP-CASE-011-Q2',
        domain: 'RISK',
        question: 'When Robert turns 65, his basic Medicare coverage includes all EXCEPT:',
        options: [
          { id: 'A', text: 'Part A hospital insurance (typically premium-free)' },
          { id: 'B', text: 'Part B outpatient/physician services ($174.70/month standard 2024)' },
          { id: 'C', text: 'Part D prescription drug coverage' },
          { id: 'D', text: 'Medigap supplemental insurance' }
        ],
        correctOptionId: 'D',
        explanation: `**Medicare Parts Overview:**

**Part A (Hospital Insurance):**
- Hospital stays, skilled nursing, hospice
- Premium-free if 40+ quarters of work history
- Deductible: $1,632 per benefit period (2024)

**Part B (Medical Insurance):**
- Doctor visits, outpatient care, preventive services
- Standard premium: $174.70/month (2024)
- Subject to IRMAA surcharges for high income
- 80/20 coverage after $240 deductible

**Part D (Prescription Drugs):**
- Separate enrollment required
- Private plan premiums vary ($10-$100+/month)
- Also subject to IRMAA surcharges

**Medigap (Supplemental):**
- NOT part of basic Medicare
- Sold by private insurers
- Covers deductibles, copays, coinsurance
- Monthly premiums: $100-$400+ depending on plan
- Must enroll during Open Enrollment or with guaranteed issue rights

**Robert's diabetes medications:** Will need Part D plan. Medigap helps with cost-sharing but is a separate purchase.`
      },
      {
        id: 'CFP-CASE-011-Q3',
        domain: 'TAX',
        question: 'Robert\'s first year of retirement income will be: $50,400 pension + $42,000 Susan\'s SE income + $45,000 IRA withdrawal = $137,400 MAGI. His Medicare Part B and Part D premiums will:',
        options: [
          { id: 'A', text: 'Be the standard premium amounts' },
          { id: 'B', text: 'Include IRMAA surcharges because MAGI exceeds $103,000 single / $206,000 married' },
          { id: 'C', text: 'Be waived due to retirement status' },
          { id: 'D', text: 'Be reduced because Susan is not yet 65' }
        ],
        correctOptionId: 'A',
        explanation: `**IRMAA (Income-Related Monthly Adjustment Amount):**

**2024 IRMAA thresholds (married filing jointly):**
| MAGI | Part B Monthly | Part D Surcharge |
|------|----------------|------------------|
| ≤$206,000 | $174.70 | $0 |
| $206,001-$258,000 | $244.60 | $12.90 |
| $258,001-$322,000 | $349.40 | $33.30 |
| And so on... | Higher | Higher |

**Robert and Susan's situation:**
- Combined MAGI: $137,400
- Threshold: $206,000
- Result: **Standard premiums apply—no IRMAA**

**Important timing note:**
- IRMAA is based on tax return from 2 years ago
- 2024 premiums based on 2022 income
- Robert's employment income from 2022 may trigger IRMAA initially
- Can file Life-Changing Event appeal (Form SSA-44) for retirement

**Planning:** The Andersons may need to appeal IRMAA based on Robert's retirement reducing income.`
      },
      {
        id: 'CFP-CASE-011-Q4',
        domain: 'RET',
        question: 'The Andersons need $7,500/month income. Robert\'s pension provides $4,200. The optimal Social Security claiming strategy is:',
        options: [
          { id: 'A', text: 'Both claim at 62 to maximize total years of benefits' },
          { id: 'B', text: 'Robert claims at 62, Susan claims at FRA for spousal benefit' },
          { id: 'C', text: 'Robert delays to 70 for maximum benefit; Susan claims at FRA' },
          { id: 'D', text: 'Susan claims at 62 while Robert delays to 70' }
        ],
        correctOptionId: 'D',
        explanation: `**Social Security Optimization:**

**Goal:** Maximize lifetime benefits while meeting income needs

**Strategy: Susan at 62, Robert at 70:**

*Susan at 62 (in 2 years):*
- Benefit: $1,260/month
- Provides income while Robert delays
- Her benefit is smaller, so early claiming penalty has less impact

*Robert at 70 (in 7 years):*
- Benefit: $3,844/month (vs. $3,100 at FRA)
- 24% higher than FRA benefit
- Higher survivor benefit for Susan if Robert dies first

**Income progression:**
- Years 1-2: Pension $4,200 + Portfolio $3,300 = $7,500
- Years 3-7: Pension $4,200 + Susan SS $1,260 + Portfolio $2,040 = $7,500
- Years 8+: Pension $4,200 + Robert SS $3,844 + Susan SS $1,260 = $9,304

**Why Susan claims early:**
- Her benefit is smaller (claiming penalty less costly)
- Working until 67 doesn't change strategy (can earn and collect)
- Provides bridge income while Robert delays

**Survivor benefit:** If Robert dies, Susan receives higher of her benefit or Robert's.`
      },
      {
        id: 'CFP-CASE-011-Q5',
        domain: 'GEN',
        question: 'Robert is considering a Medicare Advantage plan instead of Original Medicare + Medigap. The key trade-off is:',
        options: [
          { id: 'A', text: 'Medicare Advantage costs more but has better coverage' },
          { id: 'B', text: 'Medicare Advantage has lower premiums but network restrictions and varying coverage' },
          { id: 'C', text: 'Medicare Advantage doesn\'t cover prescription drugs' },
          { id: 'D', text: 'Medicare Advantage requires Medigap enrollment as well' }
        ],
        correctOptionId: 'B',
        explanation: `**Medicare Advantage vs. Original Medicare:**

| Feature | Original Medicare + Medigap | Medicare Advantage |
|---------|----------------------------|-------------------|
| Premiums | Part B + Medigap ($350-$500 total) | Part B + MA plan ($0-$100) |
| Networks | Any Medicare provider | Network restrictions |
| Copays | Medigap covers most | Varies by plan/service |
| Drug coverage | Separate Part D needed | Usually included |
| Prior auth | Rarely | Sometimes required |
| Predictability | Very predictable costs | Variable copays |

**For Robert with diabetes:**
- Original Medicare + Medigap: Predictable, any doctor
- Medicare Advantage: Lower premium but network matters

**Key considerations:**
- If Robert travels frequently: Original Medicare preferred
- If diabetes requires specialists: Verify network has endocrinologist
- If budget-conscious: MA can save $200+/month
- If prescription costs high: Compare Part D vs. MA drug coverage

**Important:** Once Robert has MA for over a year, returning to Medigap may require medical underwriting (could be denied for diabetes).`
      },
      {
        id: 'CFP-CASE-011-Q6',
        domain: 'TAX',
        question: 'If the Andersons want to minimize future IRMAA surcharges, they should consider:',
        options: [
          { id: 'A', text: 'Converting pre-tax 401(k) to Roth before both reach Medicare age' },
          { id: 'B', text: 'Maximizing pension income' },
          { id: 'C', text: 'Delaying Social Security to increase taxable income' },
          { id: 'D', text: 'Taking larger IRA distributions after turning 65' }
        ],
        correctOptionId: 'A',
        explanation: `**IRMAA Planning with Roth Conversions:**

**Current 401(k):** $890,000 (70% pre-tax = $623,000)

**IRMAA impact of traditional IRA distributions:**
- Every dollar of IRA distribution counts toward MAGI
- Large RMDs after 73 could push into IRMAA brackets
- Pension + SS + RMDs could exceed $206,000 (married)

**Roth conversion strategy:**
- Convert pre-tax funds during lower-income years
- Robert is 63, Susan is 60
- Window: 6 years before Robert's Medicare
- But IRMAA looks back 2 years

**Optimal timing:**
- Convert now while both working (higher income anyway)
- Or convert after Robert retires but before Susan's income rises
- Pay tax now at potentially lower rates
- Roth distributions = $0 IRMAA impact

**Example conversion plan:**
- Years 1-5: Convert $50,000-$75,000 annually
- Stay below 24% bracket ceiling
- By age 70: Significant Roth balance
- RMDs much smaller, IRMAA avoided

**Key point:** Roth withdrawals don't count toward IRMAA MAGI.`
      }
    ],
    scoringGuide: `
## Scoring Guide

**6 correct:** Excellent - Strong Medicare planning knowledge
**5 correct:** Good - Review missed concepts
**3-4 correct:** Fair - Focus on Medicare parts and IRMAA
**Below 3:** Significant review needed

## Key Medicare Planning Takeaways:
1. ACA marketplace often beats COBRA for pre-Medicare coverage
2. Part A, B, D are core Medicare—Medigap is supplemental
3. IRMAA surcharges based on MAGI from 2 years prior
4. Social Security optimization: delay higher earner's benefit
5. Medicare Advantage trades lower cost for network restrictions
6. Roth conversions reduce future IRMAA exposure
`
  },
  // ============================================
  // Case Study 12: Sudden Wealth Event
  // ============================================
  {
    id: 'CFP-CASE-012',
    title: 'Marcus Williams: Tech IPO Windfall',
    courseId: 'cfp',
    difficulty: 'hard',
    estimatedTime: 22,
    domains: ['TAX', 'INV', 'EST', 'GEN', 'RISK'],
    scenario: `
## Client Profile: Marcus Williams

**Marcus Williams** (Age 34)
- Senior software engineer at tech startup
- Pre-IPO employee (joined 5 years ago)
- Base salary: $165,000

**IPO Event:**
- Company went public 3 months ago
- Marcus owns: 50,000 shares (all ISOs exercised 2 years ago)
- Exercise price: $5/share (cost basis: $250,000)
- Current stock price: $85/share
- **Current value: $4,250,000**
- Lockup expires in 3 months

**Pre-IPO Financial Position:**
- 401(k): $125,000
- Emergency fund: $45,000
- Roth IRA: $65,000
- No debt (rents apartment)

**Tax Situation:**
- Exercised ISOs 2 years ago when FMV was $15/share
- Held through IPO (did not do 83(b) election at grant)
- AMT adjustment was made in exercise year
- Has AMT credit carryforward: ~$95,000

**Family:**
- Single, no children
- Parents are comfortably retired
- Close to younger sister (struggling artist, $35,000 income)

**Goals:**
1. Diversify away from concentrated stock position
2. Minimize tax impact of sales
3. Purchase home ($1.5 million budget)
4. Establish a foundation for long-term wealth
5. Help sister without creating dependence
6. "Not mess this up"
`,
    questions: [
      {
        id: 'CFP-CASE-012-Q1',
        domain: 'TAX',
        question: 'Marcus exercised ISOs 2 years ago at $15/share FMV. Now selling at $85/share. The tax treatment is:',
        options: [
          { id: 'A', text: 'Ordinary income on entire gain from $5 to $85' },
          { id: 'B', text: 'Long-term capital gain on entire $80/share gain' },
          { id: 'C', text: 'LTCG on gain from $5 exercise price to current price, plus AMT credit recovery' },
          { id: 'D', text: 'Short-term capital gain because IPO was only 3 months ago' }
        ],
        correctOptionId: 'C',
        explanation: `**ISO Taxation - Qualifying Disposition:**

**Marcus's timeline:**
- Grant: 5 years ago
- Exercise: 2 years ago at $15 FMV
- Sale: Now at $85
- Holding period: 2 years from exercise, 5 years from grant ✓

**This is a qualifying disposition:**
- More than 2 years from grant
- More than 1 year from exercise
- Result: Long-term capital gains treatment

**Tax calculation:**
| Element | Per Share | Total |
|---------|-----------|-------|
| Sale price | $85 | $4,250,000 |
| Exercise price (basis) | $5 | $250,000 |
| LTCG | $80 | $4,000,000 |

**Tax rate:** 20% federal LTCG + 3.8% NIIT = 23.8%
**Plus state:** (varies, could be 10%+ in CA)

**AMT credit recovery:**
- Marcus paid AMT on $10/share spread at exercise ($15 - $5)
- $10 × 50,000 = $500,000 AMT spread
- Approximately $95,000 in AMT credit
- Recovers this over time as regular tax exceeds AMT

**Key point:** Qualifying disposition = LTCG on full gain from exercise price.`
      },
      {
        id: 'CFP-CASE-012-Q2',
        domain: 'INV',
        question: 'With $4.25 million concentrated in one stock (>90% of net worth), Marcus should:',
        options: [
          { id: 'A', text: 'Hold all shares—the company has strong growth potential' },
          { id: 'B', text: 'Sell all shares immediately after lockup and diversify completely' },
          { id: 'C', text: 'Develop a systematic diversification plan selling 20-25% of position annually' },
          { id: 'D', text: 'Use options strategies to lock in gains without selling' }
        ],
        correctOptionId: 'C',
        explanation: `**Concentrated Stock Diversification:**

**Risks of holding single stock:**
- Company-specific risk (could drop 50%+ in a year)
- Tech sector volatility
- Career already dependent on company (double exposure)
- Emotional attachment clouds judgment

**Why NOT sell all immediately:**
- Massive single-year tax bill (~$800K-$1.2M depending on state)
- May push into higher brackets
- Loses potential for continued appreciation

**Systematic diversification approach:**
- Sell 20-25% per year over 4-5 years
- Spreads tax liability across years
- Maintains some upside exposure
- Reduces concentration risk gradually

**Example plan:**
- Year 1: Sell 12,500 shares (~$1M after tax) → Home purchase + reserves
- Year 2: Sell 12,500 shares → Invest in diversified portfolio
- Year 3: Sell 12,500 shares → Continue diversification
- Year 4: Sell 12,500 shares → Complete diversification

**Options strategies:** Can hedge but complex, costly, and don't eliminate concentration risk.`
      },
      {
        id: 'CFP-CASE-012-Q3',
        domain: 'GEN',
        question: 'Marcus wants to help his struggling sister without creating dependence. The BEST approach is:',
        options: [
          { id: 'A', text: 'Give her $100,000 as a lump sum to get her on her feet' },
          { id: 'B', text: 'Pay for specific things like health insurance, education, or emergency fund' },
          { id: 'C', text: 'Co-sign on loans so she can build credit' },
          { id: 'D', text: 'Hire her for his household at high salary' }
        ],
        correctOptionId: 'B',
        explanation: `**Financial Assistance Best Practices:**

**Why lump-sum gifts can backfire:**
- May be spent quickly without lasting benefit
- Can create expectation of ongoing support
- Doesn't teach financial skills
- May strain relationship if "used up"

**Why paying for specific needs works better:**

1. **Health insurance:**
   - She may not be able to afford ACA premiums
   - Direct payment to insurance company
   - Provides security without cash

2. **Education/training:**
   - Investment in her earning capacity
   - Direct payment to institution
   - Helps her help herself

3. **Emergency fund establishment:**
   - Fund a savings account she can access
   - Teach her to maintain it
   - Set expectations about usage

4. **Match savings:**
   - Offer to match every $1 she saves
   - Encourages her own financial discipline

**Tax note:** Marcus can give $18,000/year gift tax-free. Educational expenses paid directly to institution don't count against this limit.`
      },
      {
        id: 'CFP-CASE-012-Q4',
        domain: 'EST',
        question: 'If Marcus gifts $50,000 to his sister in 2026, the gift tax consequence is:',
        options: [
          { id: 'A', text: 'Sister pays income tax on the gift' },
          { id: 'B', text: 'Marcus pays gift tax immediately' },
          { id: 'C', text: 'No immediate tax; $32,000 uses Marcus\'s lifetime exemption' },
          { id: 'D', text: 'Gift is tax-free because it\'s to a family member' }
        ],
        correctOptionId: 'C',
        explanation: `**Gift Tax Analysis:**

**2026 annual exclusion:** $18,000 per recipient

**Marcus's $50,000 gift:**
- Annual exclusion: $18,000 (no tax, no reporting)
- Taxable gift: $50,000 - $18,000 = **$32,000**

**What happens to $32,000:**
- Counts against Marcus's lifetime exemption
- 2026 exemption: ~$13.6 million (or ~$7M if sunset occurs)
- Marcus files Form 709 (gift tax return)
- No actual tax paid unless lifetime exemption exceeded

**Sister's tax impact:**
- $0 income tax—gifts are not income to recipient
- Gift retains Marcus's cost basis for future sale

**Planning considerations:**
- If Marcus expects to have taxable estate, gifting now uses exemption
- If exemption sunsets in 2026, using it now locks in higher amount
- Can also gift stock directly (transfers cost basis and potential LTCG)

**Note:** Paying sister's education expenses directly to school = unlimited exclusion (in addition to $18,000 annual).`
      },
      {
        id: 'CFP-CASE-012-Q5',
        domain: 'INV',
        question: 'Before purchasing a $1.5 million home, Marcus should ensure he has:',
        options: [
          { id: 'A', text: 'Just the down payment—home is an investment that will appreciate' },
          { id: 'B', text: 'Down payment + 6-12 months expenses + funds for furnishing and closing costs' },
          { id: 'C', text: 'Enough to buy the home in cash to avoid mortgage interest' },
          { id: 'D', text: 'Pre-IPO stock pledged as collateral for a larger mortgage' }
        ],
        correctOptionId: 'B',
        explanation: `**Home Purchase Financial Checklist:**

**Marcus's home purchase should NOT:**
- Deplete his liquidity
- Leave no margin for error
- Be 100% of his available funds

**Required reserves for $1.5M home:**

| Need | Amount |
|------|--------|
| Down payment (20%) | $300,000 |
| Closing costs (~3%) | $45,000 |
| Furnishing/moving | $50,000 |
| Emergency fund (6 months) | $50,000 |
| **Total pre-purchase** | **$445,000** |

**Why mortgage over paying cash:**
- Mortgage rates may be lower than investment returns
- Maintains liquidity for investments
- Mortgage interest may be deductible (up to $750K)
- Diversification > debt-free home

**Stock pledged loans:**
- Risky—stock can be called if value drops
- Not recommended for primary residence
- Company stock especially volatile post-IPO

**Marcus can afford this:** Selling ~$500K of stock (after tax) funds home while maintaining diversification plan.`
      },
      {
        id: 'CFP-CASE-012-Q6',
        domain: 'GEN',
        question: 'Marcus says he wants to "not mess this up." The MOST important immediate action is:',
        options: [
          { id: 'A', text: 'Invest everything in index funds immediately' },
          { id: 'B', text: 'Quit his job since he doesn\'t need to work anymore' },
          { id: 'C', text: 'Take 90 days before major decisions; assemble advisory team; maintain lifestyle' },
          { id: 'D', text: 'Give significant amounts to family and friends who helped him' }
        ],
        correctOptionId: 'C',
        explanation: `**Sudden Wealth Best Practices:**

**The 90-Day Rule:**
- Make NO major decisions for 90 days
- Emotion and euphoria lead to poor choices
- Let the reality settle in

**Assemble advisory team:**
- Fee-only CFP (not commission-based)
- CPA experienced with equity compensation
- Estate planning attorney
- May need tax attorney for complex situations

**Maintain lifestyle:**
- Don't immediately upgrade everything
- Lifestyle creep is the #1 destroyer of sudden wealth
- Continue working (purpose + income + benefits)

**What NOT to do:**
- Quit job (keep health insurance, maintain identity)
- Buy expensive toys (deprecating assets)
- Give large amounts to family (creates expectations)
- Make investments you don't understand
- Tell everyone about the money

**Marcus's checklist:**
1. ✓ Keep job (for now)
2. ✓ Hire CFP planner
3. ✓ Make tax plan before lockup expires
4. ✓ Keep living in apartment (no rush on house)
5. ✓ Only tell people who need to know`
      }
    ],
    scoringGuide: `
## Scoring Guide

**6 correct:** Excellent - Strong sudden wealth planning knowledge
**5 correct:** Good - Review missed concepts
**3-4 correct:** Fair - Focus on ISO taxation and diversification
**Below 3:** Significant review needed

## Key Sudden Wealth Takeaways:
1. ISO qualifying disposition = LTCG from exercise price
2. Systematic diversification beats selling all at once
3. Help family with specific needs, not lump sums
4. Gifts over $18K use lifetime exemption (no immediate tax)
5. Home purchase shouldn't deplete all liquidity
6. 90-day waiting period before major decisions
`
  }
];

export default CFP_CASE_STUDIES_BATCH4;

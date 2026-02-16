/**
 * CFP Case Studies
 * Comprehensive, multi-part scenarios testing integrated financial planning knowledge
 * 
 * Based on CFP Board exam format with 4-8 questions per case study
 * Each case covers multiple domains to test holistic planning skills
 */

import { CaseStudy } from '../../../types';
import { CFP_CASE_STUDIES_BATCH2 } from './batch2';
import { CFP_CASE_STUDIES_BATCH3 } from './batch3';
import { CFP_CASE_STUDIES_BATCH4 } from './batch4';
import { CFP_CASE_STUDIES_BATCH5 } from './batch5';
import { CFP_CASE_STUDIES_BATCH6 } from './batch6';

const CFP_CASE_STUDIES_BASE: CaseStudy[] = [
  {
    id: 'CFP-CASE-001',
    title: 'The Martinez Family: Comprehensive Financial Plan',
    courseId: 'cfp',
    difficulty: 'hard',
    estimatedTime: 25, // minutes
    domains: ['RET', 'TAX', 'INV', 'EST', 'RISK'],
    scenario: `
## Client Profile: The Martinez Family

**Carlos Martinez** (Age 52)
- VP of Engineering at a tech company
- Salary: $285,000 plus annual bonus averaging $60,000
- Employer offers 401(k) with 6% match
- Current 401(k) balance: $950,000 (100% equities)
- Stock options: 10,000 ISOs with $25 strike price, current FMV $85/share
- Group term life: 2x salary ($570,000)
- Group LTD: 60% of salary

**Maria Martinez** (Age 50)
- Real estate agent (self-employed)
- Schedule C net income: $125,000 (varies +/- 30%)
- SEP-IRA: $210,000
- No disability insurance

**Children:**
- Isabella (Age 23): Recent college graduate, $45,000 in federal student loans
- Miguel (Age 19): Sophomore at state university, room & board funded by 529 plan with $35,000 remaining

**Assets:**
- Primary residence: FMV $850,000, mortgage balance $320,000 (3.25%, 22 years remaining)
- Rental property: FMV $450,000, basis $280,000, mortgage $180,000. Net rental income: $18,000/year
- Joint investment account: $380,000 (60% stocks, 40% bonds), cost basis $220,000
- Emergency fund: $50,000 in money market

**Liabilities:**
- Mortgage (primary): $320,000
- Rental mortgage: $180,000
- Credit cards: $0 (paid monthly)

**Estate Planning:**
- Simple wills from 15 years ago leaving everything to each other, then equally to children
- No trusts, no POAs, no healthcare directives
- $250,000 term life on Carlos (10 years remaining)
- No life insurance on Maria

**Goals:**
1. Carlos wants to retire at 60, Maria at 62
2. Fund Miguel's remaining education (~$100,000)
3. Help Isabella with student loans
4. Maintain current lifestyle in retirement ($12,000/month)
5. Leave legacy to children
6. Maria is concerned about her lack of disability coverage

**Risk Tolerance:** Moderate (willing to accept some volatility for growth)

**Health:** Both in good health, family history of longevity
`,
    questions: [
      {
        id: 'CFP-CASE-001-Q1',
        domain: 'RET',
        question: `Based on the Martinez family's retirement goal of $12,000/month and an assumed 4% withdrawal rate, what is their approximate retirement savings target?`,
        options: [
          { id: 'A', text: '$2.4 million' },
          { id: 'B', text: '$3.6 million' },
          { id: 'C', text: '$4.2 million' },
          { id: 'D', text: '$5.0 million' }
        ],
        correctOptionId: 'B',
        explanation: `**Calculation:**
- Monthly need: $12,000
- Annual need: $12,000 × 12 = $144,000
- At 4% withdrawal rate: $144,000 ÷ 0.04 = **$3,600,000**

This is the basic capital needs calculation. Adjustments should be made for:
- Social Security benefits (will reduce the need)
- Inflation during remaining working years
- Rental income continuation
- Potential healthcare costs

With Social Security, the actual savings target may be lower.`
      },
      {
        id: 'CFP-CASE-001-Q2',
        domain: 'RET',
        question: `Carlos's 401(k) is 100% equities. Given his 8-year timeline to retirement, what recommendation is MOST appropriate?`,
        options: [
          { id: 'A', text: 'Maintain 100% equities for maximum growth' },
          { id: 'B', text: 'Gradually shift to 70-80% equities with some fixed income' },
          { id: 'C', text: 'Immediately move to 50% bonds for capital preservation' },
          { id: 'D', text: 'Convert entirely to stable value funds' }
        ],
        correctOptionId: 'B',
        explanation: `At age 52 with 8 years to retirement, Carlos should begin glide-path rebalancing:

**Current Issues:**
- 100% equities is aggressive for his timeline
- A major market downturn near retirement could devastate his plan
- Sequence of returns risk becomes more critical as retirement nears

**Recommended Approach:**
- Target: 70-80% equities at retirement (still aggressive but appropriate given longevity)
- Method: Reduce equity allocation by 2-3% annually
- Add: Investment-grade bonds, possibly TIPS for inflation protection

**Why not other options:**
- A) Too risky given proximity to retirement
- C) Too conservative and abrupt; may not achieve needed growth
- D) Surrender growth potential entirely; inappropriate for 30+ year retirement horizon`
      },
      {
        id: 'CFP-CASE-001-Q3',
        domain: 'TAX',
        question: `Carlos has 10,000 ISOs with a $25 strike and current FMV of $85. If he exercises and holds, what is the AMT preference item?`,
        options: [
          { id: 'A', text: '$0 - ISOs have no tax consequence at exercise' },
          { id: 'B', text: '$250,000' },
          { id: 'C', text: '$600,000' },
          { id: 'D', text: '$850,000' }
        ],
        correctOptionId: 'C',
        explanation: `**ISO AMT Preference Calculation:**

Bargain element = (FMV - Strike) × Shares
= ($85 - $25) × 10,000
= $60 × 10,000
= **$600,000 AMT preference item**

**Tax Implications:**
- No regular tax at exercise (if qualifying disposition)
- $600,000 is added to AMT income
- Could trigger significant AMT liability (~$168,000 at 28% AMT rate)
- AMT credit may be recoverable in future years

**Planning Considerations:**
- Consider exercising over multiple years to spread AMT impact
- Model the AMT crossover point
- Evaluate same-day sale to avoid AMT (but ordinary income treatment)`
      },
      {
        id: 'CFP-CASE-001-Q4',
        domain: 'RISK',
        question: `Maria has no disability insurance despite earning $125,000/year. What is the MOST critical gap analysis finding?`,
        options: [
          { id: 'A', text: 'She needs short-term disability coverage only' },
          { id: 'B', text: 'Her self-employment income is uninsurable' },
          { id: 'C', text: 'She faces catastrophic loss of income with no replacement' },
          { id: 'D', text: 'Carlos income can cover any disability' }
        ],
        correctOptionId: 'C',
        explanation: `**Critical Risk Gap:**
Maria's $125,000 income has ZERO disability protection. As a self-employed real estate agent:

**Risk Analysis:**
- Income is 100% dependent on her ability to work
- No group coverage available
- Real estate requires physical activity (showings, driving)
- Variable income makes the family more vulnerable

**Recommendation:**
- Individual disability policy with "own occupation" definition
- 60-65% income replacement ($75,000-$80,000/year)
- Ensure coverage for "your occupation" as real estate professional
- Consider business overhead expense policy

**Why not other answers:**
- A) Long-term disability is the bigger risk
- B) Self-employed income IS insurable with individual policies
- D) Replacing $125,000 would strain family finances significantly`
      },
      {
        id: 'CFP-CASE-001-Q5',
        domain: 'EST',
        question: `The Martinez's wills are 15 years old and leave everything to each other, then equally to children. What is the PRIMARY concern?`,
        options: [
          { id: 'A', text: 'The wills may be invalid due to age' },
          { id: 'B', text: 'They lack incapacity planning documents (POA, healthcare directive)' },
          { id: 'C', text: 'Equal distribution to children is inappropriate' },
          { id: 'D', text: 'Estate taxes will consume most of the estate' }
        ],
        correctOptionId: 'B',
        explanation: `**Critical Estate Planning Gap:**

The Martinez family has NO incapacity planning:
- No durable POA for property
- No healthcare proxy/advance directive
- No HIPAA authorizations

**Risks Without These Documents:**
- Court-supervised guardianship/conservatorship if incapacitated
- Family cannot make medical decisions
- Financial accounts may be frozen
- Additional expense, delay, and family stress

**Why not other answers:**
- A) Age doesn't invalidate wills, but life changes matter
- C) Equal distribution may be fine; it's a values decision
- D) Combined estate ~$2.5M is well below federal estate tax threshold

**Immediate Action:** Execute POAs, healthcare proxies, and HIPAA releases`
      },
      {
        id: 'CFP-CASE-001-Q6',
        domain: 'TAX',
        question: `The Martinez rental property has FMV of $450,000 and basis of $280,000. They are considering selling. What tax strategy could defer the $170,000 gain?`,
        options: [
          { id: 'A', text: 'Section 121 primary residence exclusion' },
          { id: 'B', text: 'Section 1031 like-kind exchange' },
          { id: 'C', text: 'Installment sale over 5 years' },
          { id: 'D', text: 'Opportunity Zone investment (full exclusion)' }
        ],
        correctOptionId: 'B',
        explanation: `**1031 Like-Kind Exchange:**

The BEST strategy to defer the $170,000 gain is a Section 1031 exchange:

**How It Works:**
1. Sell rental property ($450,000)
2. Within 45 days, identify replacement property(ies)
3. Within 180 days, close on replacement property
4. Roll full equity into new investment real estate
5. Defer ALL gain (no current tax)

**Requirements:**
- Investment/business property (not primary residence)
- "Like-kind" = any real estate for real estate
- Must use Qualified Intermediary
- Cannot touch the proceeds

**Why not other answers:**
- A) 121 is for primary residence, not rental
- C) Installment spreads tax but doesn't eliminate it
- D) QOZ defers original gain but doesn't fully exclude it (2026 recognition)`
      },
      {
        id: 'CFP-CASE-001-Q7',
        domain: 'INV',
        question: `The Martinez joint investment account has $380,000 with a $220,000 cost basis. If they want to gift appreciated stock to charity, what is the tax advantage?`,
        options: [
          { id: 'A', text: 'Income tax deduction only' },
          { id: 'B', text: 'Charitable deduction plus avoidance of $160,000 capital gain' },
          { id: 'C', text: 'No tax benefit for donating stock' },
          { id: 'D', text: 'The gain disappears and they get cash back' }
        ],
        correctOptionId: 'B',
        explanation: `**Charitable Gift of Appreciated Stock:**

**Tax Benefits:**
1. **Charitable Deduction:** FMV of stock donated (up to 30% AGI)
2. **Capital Gains Avoidance:** Never pay tax on the $160,000 gain

**Example:**
Donate $50,000 of stock with $31,000 basis:
- Charitable deduction: $50,000
- Capital gain avoided: $19,000 × 23.8% = $4,522 saved

**Best Strategy:**
- Donate highly appreciated shares
- Repurchase same position (no wash sale for gains)
- Reset basis to current FMV

**AGI Limitations:**
- Stock to public charity: 30% of AGI
- Cash to public charity: 60% of AGI
- 5-year carryforward for excess`
      },
      {
        id: 'CFP-CASE-001-Q8',
        domain: 'RET',
        question: `Maria has a SEP-IRA with $210,000. Given her variable income ($125,000 ± 30%), which retirement vehicle might offer more flexibility?`,
        options: [
          { id: 'A', text: 'Maintain SEP-IRA for simplicity' },
          { id: 'B', text: 'Consider Solo 401(k) for higher contribution potential and loan option' },
          { id: 'C', text: 'Open a SIMPLE IRA instead' },
          { id: 'D', text: 'Convert to a defined benefit plan' }
        ],
        correctOptionId: 'B',
        explanation: `**Solo 401(k) Advantages for Maria:**

**Contribution Flexibility:**
SEP-IRA: 25% of net self-employment income only
Solo 401(k): Employee deferral ($24,500) PLUS employer contribution (25%)

**In a High-Income Year ($162,500):**
- SEP max: ~$32,500
- Solo 401(k) max: $24,500 + $32,500 = **$57,000** (plus catch-up at 50+)

**In a Low-Income Year ($87,500):**
- Can still defer $24,500 as employee contribution
- Provides income smoothing flexibility

**Additional Benefits:**
- Loan provision (up to $50,000 or 50%)
- Roth option available (SEP is pre-tax only)
- Same deadline for establishment (tax return due date)

**Why not other options:**
- A) SEP is less flexible
- C) SIMPLE has lower limits and restrictions
- D) DB plans are complex and expensive for variable income`
      }
    ],
    scoringGuide: `
## Scoring Guide

**8 correct:** Excellent - CFP exam ready for integrated planning
**6-7 correct:** Good - Review any missed domains
**4-5 correct:** Fair - Additional practice needed on integration
**Below 4:** Review individual domain content before attempting integrated cases

## Key Takeaways:
1. Financial planning requires holistic analysis across all domains
2. One recommendation may impact multiple areas (e.g., ISO exercise affects tax, retirement, and potentially estate)
3. Client priorities must be balanced against technical optimization
4. Missing documents (POAs, insurance) can be more critical than tax savings
`
  },
  // ============================================
  // Case Study 2: Young Professional
  // ============================================
  {
    id: 'CFP-CASE-002',
    title: 'Jordan Chen: Early Career Financial Planning',
    courseId: 'cfp',
    difficulty: 'medium',
    estimatedTime: 20,
    domains: ['GEN', 'TAX', 'INV', 'RISK', 'RET'],
    scenario: `
## Client Profile: Jordan Chen

**Jordan Chen** (Age 28)
- Software Developer at a startup
- Base salary: $135,000
- RSUs vesting over 4 years: 2,000 shares at current FMV $45/share ($90,000 unvested)
- Single, no dependents
- Renter in HCOL city ($2,800/month)

**Employment Benefits:**
- 401(k) with 4% match (vests immediately)
- HSA-eligible high-deductible health plan (HDHP)
- Group term life: 1x salary
- No disability insurance offered

**Current Assets:**
- 401(k): $48,000 (target-date fund 2060)
- Roth IRA: $15,000
- HSA: $5,200
- Checking/Savings: $12,000
- Individual brokerage: $8,000 (all in tech stocks from previous employer)

**Liabilities:**
- Student loans: $62,000 federal (5.5% average rate, standard 10-year repayment)
- Credit card: $2,500 (15% APR, minimum payment only)

**Monthly Cash Flow:**
- Gross income: $11,250
- Net paycheck (after 401k, taxes, benefits): $7,200
- Rent: $2,800
- Student loan payment: $670
- Other expenses: $2,500
- Credit card minimum: $75
- Discretionary/savings: ~$1,155

**Goals:**
1. Build emergency fund (currently less than 2 months of expenses)
2. Maximize investment growth for long-term wealth
3. Purchase a condo within 5 years (targeting $500,000 property, 20% down)
4. Pay off student loans efficiently
5. Understand RSU tax implications

**Risk Tolerance:** Aggressive (long time horizon, comfortable with volatility)

**Concerns:**
- Should they prioritize student loan payoff or investing?
- How to handle RSU vesting and concentrated stock position
- Is disability insurance necessary?
- Optimal savings allocation between accounts
`,
    questions: [
      {
        id: 'CFP-CASE-002-Q1',
        domain: 'GEN',
        question: 'Jordan has $12,000 in savings, $2,500 in credit card debt at 15% APR, and wants to build an emergency fund. What should be the FIRST priority?',
        options: [
          { id: 'A', text: 'Build emergency fund to 6 months before addressing debt' },
          { id: 'B', text: 'Pay off the credit card immediately, then build emergency fund' },
          { id: 'C', text: 'Split savings 50/50 between debt payoff and emergency fund' },
          { id: 'D', text: 'Invest the savings for growth, pay credit card minimums' }
        ],
        correctOptionId: 'B',
        explanation: `**Priority Order:**

1. **Pay off $2,500 credit card first** - The 15% APR exceeds any risk-free return. Jordan has enough cash to eliminate this debt immediately.

2. **Build emergency fund** - After paying off credit card, Jordan has $9,500. This should grow to 3-6 months of expenses (~$18,000-$36,000).

**Why this order:**
- 15% guaranteed "return" by eliminating debt
- Credit card debt is a financial emergency
- Emergency fund protects against needing to use credit cards again

Jordan should then continue building the emergency fund with the $75/month freed from credit card minimums.`
      },
      {
        id: 'CFP-CASE-002-Q2',
        domain: 'RET',
        question: 'Jordan contributes enough to get the full 401(k) match. Given their goals and cash flow, what is the optimal retirement savings strategy?',
        options: [
          { id: 'A', text: 'Max out 401(k) to $24,500, skip Roth IRA' },
          { id: 'B', text: 'Contribute to 401(k) for match, max HSA, then Roth IRA' },
          { id: 'C', text: 'Skip 401(k) entirely, focus on Roth IRA only' },
          { id: 'D', text: 'Max all accounts regardless of other goals' }
        ],
        correctOptionId: 'B',
        explanation: `**Optimal Order for Jordan:**

1. **401(k) to get match (4%)** = $5,400/year (free money)
2. **Max HSA ($4,450 individual 2026)** = Triple tax advantage
3. **Max Roth IRA ($7,500)** = Tax-free growth for 35+ years

**Why this order at age 28:**
- 401(k) match is 100% return
- HSA is the most tax-advantaged account (if used for qualified expenses)
- Roth provides tax diversification and flexibility
- At Jordan's income level, Roth IRA contributions are fully eligible

This totals ~$16,550/year, leaving room for other goals.`
      },
      {
        id: 'CFP-CASE-002-Q3',
        domain: 'TAX',
        question: 'When Jordan\'s RSUs vest, the tax treatment is:',
        options: [
          { id: 'A', text: 'No tax until the shares are sold' },
          { id: 'B', text: 'FMV at vesting is taxed as ordinary income; future gains are capital gains' },
          { id: 'C', text: 'All gains are long-term capital gains' },
          { id: 'D', text: 'RSUs are tax-free if held for one year' }
        ],
        correctOptionId: 'B',
        explanation: `**RSU Tax Treatment:**

**At Vesting:**
- FMV on vesting date = **Ordinary income** (reported on W-2)
- Employer typically withholds shares for taxes (~40%)
- For Jordan: If 500 shares vest at $45 = $22,500 ordinary income

**At Sale:**
- Sale price - FMV at vesting = Capital gain/loss
- If held >1 year from vesting: Long-term capital gain (0/15/20%)
- If held <1 year: Short-term capital gain (ordinary rates)

**Planning implication:** Jordan should consider selling enough shares at vesting to diversify, as keeping all shares creates concentration risk.`
      },
      {
        id: 'CFP-CASE-002-Q4',
        domain: 'INV',
        question: 'Jordan\'s brokerage account holds $8,000 in tech stocks from a previous employer. Given their current situation, the BEST recommendation is:',
        options: [
          { id: 'A', text: 'Hold the position—tech stocks have high growth potential' },
          { id: 'B', text: 'Sell immediately and invest in target-date fund' },
          { id: 'C', text: 'Consider diversifying, but evaluate tax consequences first' },
          { id: 'D', text: 'Transfer to Roth IRA' }
        ],
        correctOptionId: 'C',
        explanation: `**Concentration Risk Analysis:**

Jordan already has:
- $135,000 salary from tech
- $90,000 in unvested RSUs from tech startup
- $8,000 in tech stocks from previous employer

This creates significant concentration risk—if tech sector declines, income, RSUs, AND investments are all impacted.

**Before selling, evaluate:**
- Cost basis vs. current value (taxable gain?)
- If gains are substantial, consider tax-loss harvesting elsewhere
- May be able to offset with losses or time sales strategically
- Cannot simply "transfer" to Roth IRA (that would be a taxable conversion)

If cost basis is near current value, selling and diversifying makes sense immediately.`
      },
      {
        id: 'CFP-CASE-002-Q5',
        domain: 'RISK',
        question: 'Jordan\'s employer doesn\'t offer disability insurance. As a software developer earning $135,000, the MOST appropriate recommendation is:',
        options: [
          { id: 'A', text: 'Disability insurance is unnecessary for office workers' },
          { id: 'B', text: 'Purchase an individual long-term disability policy' },
          { id: 'C', text: 'Rely on state disability benefits and emergency fund' },
          { id: 'D', text: 'Wait until they have more assets to protect' }
        ],
        correctOptionId: 'B',
        explanation: `**Why Jordan Needs Disability Insurance:**

At age 28, Jordan's greatest asset is their **earning capacity**. Over 30+ year career at $135,000 (with growth), lifetime earnings could exceed $6 million.

**Key factors:**
- No group LTD from employer
- Statistically, 25% chance of disability before age 65
- Student loans continue during disability
- Emergency fund (<2 months) is inadequate

**Individual LTD policy should:**
- Cover 60-70% of income (~$6,750-$8,100/month)
- Use "own occupation" definition
- Extend to age 65
- Cost ~$100-$200/month (affordable given income)

State disability (if available) typically caps around $1,500/week and has limited duration.`
      },
      {
        id: 'CFP-CASE-002-Q6',
        domain: 'GEN',
        question: 'Jordan wants to save $100,000 for a condo down payment in 5 years. Assuming 5% annual return, the required monthly savings is approximately:',
        options: [
          { id: 'A', text: '$1,350' },
          { id: 'B', text: '$1,480' },
          { id: 'C', text: '$1,667' },
          { id: 'D', text: '$1,800' }
        ],
        correctOptionId: 'B',
        explanation: `**Future Value of Annuity Calculation:**

FV = PMT × [((1 + r)^n - 1) / r]
$100,000 = PMT × [((1.004167)^60 - 1) / 0.004167]
$100,000 = PMT × 67.77

PMT = $100,000 / 67.77 = **$1,476/month**

Rounded to approximately $1,480/month.

**Reality check for Jordan:**
- Current discretionary: ~$1,155/month
- Gap: ~$325/month shortfall
- Options: Increase income, reduce rent, extend timeline, or accept smaller down payment

Given Jordan's career trajectory and RSU vesting, this goal may become more achievable over time.`
      }
    ],
    scoringGuide: `
## Scoring Guide

**6 correct:** Excellent - Strong grasp of early-career planning
**5 correct:** Good - Review missed concepts
**3-4 correct:** Fair - Focus on fundamentals
**Below 3:** Review domain-specific content

## Key Takeaways:
1. Early career is the best time to establish good financial habits
2. Human capital (earning potential) is the largest asset for young professionals
3. Account selection order matters: match → HSA → Roth → taxable
4. Concentration risk applies to income AND investments in same sector
5. Disability insurance protects earning capacity, not just current assets
`
  },
  // ============================================
  // Case Study 3: Business Owner Pre-Retiree
  // ============================================
  {
    id: 'CFP-CASE-003',
    title: 'The Thompsons: Business Exit and Retirement Planning',
    courseId: 'cfp',
    difficulty: 'hard',
    estimatedTime: 30,
    domains: ['RET', 'TAX', 'EST', 'INV', 'RISK', 'GEN'],
    scenario: `
## Client Profile: The Thompson Family

**David Thompson** (Age 58)
- Founder/Owner of Thompson Manufacturing LLC (S-Corp, 100% owner)
- Base salary from business: $200,000
- Business profits (pass-through): ~$350,000/year average
- Has received an offer to sell the business for $4.2 million

**Linda Thompson** (Age 56)
- Marketing consultant (self-employed)
- Schedule C net income: $95,000
- Solo 401(k): $185,000

**Business Details:**
- Thompson Manufacturing LLC value: $4.2 million (offer)
- Basis in S-Corp stock: $150,000
- Business real estate (owned by separate LLC): FMV $1.2 million, basis $400,000
- 8 employees, key person life on David ($1 million)
- No buy-sell agreement
- No succession plan if sale doesn't occur

**Personal Assets:**
- Primary residence: FMV $950,000, mortgage balance $180,000 (2.875%, 15 years remaining)
- 401(k) rollover IRA: $1,450,000 (David's from previous employer)
- Roth IRA (David): $250,000
- Roth IRA (Linda): $125,000
- Joint taxable investment account: $680,000, cost basis $420,000
- Personal checking/savings: $85,000

**Liabilities:**
- Mortgage: $180,000
- No other debt

**Estate Planning:**
- Joint revocable trust with A/B provisions (drafted 2015)
- Each has DPOA and healthcare directive
- Beneficiaries: Trust for survivor, then to two adult children equally
- No SLAT or other advanced planning
- Combined estate: ~$9 million (including business)

**Insurance:**
- David: $2 million term life (expires at 65)
- Linda: $500,000 term life
- Umbrella: $2 million
- Business liability: $3 million

**Goals:**
1. Sell business within 2 years and retire
2. Net $3 million after taxes from business sale
3. Maintain $200,000/year lifestyle in retirement
4. Leave substantial legacy to children and grandchildren
5. Minimize estate taxes and maximize step-up in basis

**Health:** Both healthy, likely to live into 90s based on family history

**Primary Concern:** Minimizing tax impact of business sale while maximizing retirement security
`,
    questions: [
      {
        id: 'CFP-CASE-003-Q1',
        domain: 'TAX',
        question: 'If David sells his S-Corp stock for $4.2 million with a basis of $150,000, the federal tax liability (ignoring state taxes and NIIT) is approximately:',
        options: [
          { id: 'A', text: '$607,500 (15% LTCG on $4,050,000)' },
          { id: 'B', text: '$809,500 (20% LTCG on $4,050,000)' },
          { id: 'C', text: '$1,215,000 (30% blended rate)' },
          { id: 'D', text: '$810,000 (20% LTCG on $4,050,000)' }
        ],
        correctOptionId: 'D',
        explanation: `**Stock Sale Tax Calculation:**

**Sale of S-Corp Stock (held >1 year):**
- Sale price: $4,200,000
- Basis: $150,000
- Gain: $4,050,000

**Long-term Capital Gains Rate:**
At David's income level, the 20% LTCG bracket applies.

Federal LTCG: $4,050,000 × 20% = **$810,000**

**Additional considerations not in this calculation:**
- 3.8% NIIT would add ~$153,900
- State income tax varies (could be 0-13%)
- Total effective rate often 25-35%

This is why David's goal of netting $3 million is challenging without tax planning strategies.`
      },
      {
        id: 'CFP-CASE-003-Q2',
        domain: 'TAX',
        question: 'To reduce the tax burden on the business sale, which strategy would be MOST effective?',
        options: [
          { id: 'A', text: 'Installment sale over 10 years' },
          { id: 'B', text: 'Qualified Opportunity Zone investment of the gain' },
          { id: 'C', text: 'Charitable Remainder Trust funded with S-Corp stock pre-sale' },
          { id: 'D', text: 'Convert gain to ordinary income through asset sale' }
        ],
        correctOptionId: 'A',
        explanation: `**Installment Sale Benefits for David:**

**How it works:**
- Receive payments over multiple years
- Recognize gain ratably as payments received
- Can keep David in lower tax brackets each year

**Example 10-year installment:**
- $420,000/year in payments
- ~$405,000 in LTCG recognized annually
- May keep most gains in 15% LTCG bracket
- Saves ~$200,000+ over lump-sum sale

**Why other options are less effective:**
- B) QOZ defers but eventually taxes gain, basis step-up requires 10-year hold (David at age 68)
- C) CRT is complex; can't easily fund with S-Corp stock, and David needs liquidity
- D) Asset sale converts to ordinary income = HIGHER taxes

**Installment sale also provides:**
- Continued involvement (if desired)
- Buyer default protection
- Lower annual tax liability`
      },
      {
        id: 'CFP-CASE-003-Q3',
        domain: 'RET',
        question: 'The Thompsons want $200,000/year in retirement. Assuming 4% withdrawal rate, what total portfolio is needed, and how does their current position compare?',
        options: [
          { id: 'A', text: 'Need $5 million; currently at ~$2.7 million (excluding business) - shortfall' },
          { id: 'B', text: 'Need $5 million; post-sale at ~$5.5 million - sufficient' },
          { id: 'C', text: 'Need $4 million; currently sufficient' },
          { id: 'D', text: 'Need $6 million; post-sale insufficient' }
        ],
        correctOptionId: 'B',
        explanation: `**Retirement Needs Analysis:**

**Required Portfolio (4% rule):**
$200,000 / 0.04 = **$5,000,000 needed**

**Post-Sale Assets:**
- Business sale (net ~$3M after taxes): $3,000,000
- Rollover IRA: $1,450,000
- Roth IRAs: $375,000
- Taxable investments: $680,000
- **Total investable: ~$5,505,000**

**Additional resources not counted:**
- Social Security (~$60,000-$80,000/year combined)
- Business real estate (could sell or keep for income)
- Home equity

**Conclusion:** Post-sale, the Thompsons are well-positioned, especially with Social Security supplementing withdrawals. They could potentially spend more than 4%.`
      },
      {
        id: 'CFP-CASE-003-Q4',
        domain: 'EST',
        question: 'With a combined estate of approximately $9 million, what estate planning concern should the Thompsons address most urgently?',
        options: [
          { id: 'A', text: 'Federal estate tax exposure (above $7.0M exemption in 2026 - TCJA sunset)' },
          { id: 'B', text: 'State estate tax if they reside in a state with lower exemption' },
          { id: 'C', text: 'Updating the 2015 A/B trust for current law and exemption portability' },
          { id: 'D', text: 'Income in Respect of a Decedent (IRD) on the large IRA' }
        ],
        correctOptionId: 'C',
        explanation: `**Estate Planning Priorities:**

**Most Urgent: Update 2015 Trust**
- A/B trusts designed for 2015 law may be inefficient now
- 2026 exemption is $7.0M per person ($14.0M married) due to TCJA sunset
- Portability may be better than mandatory bypass trust
- Distributions and terms should be reviewed

**Why each concern:**
- A) At $9M, below current federal exemption - not urgent
- B) State tax depends on residence - unknown but worth checking
- C) **Outdated documents are most urgently correctable**
- D) IRD planning matters but doesn't require trust updates

**The A/B trust may:**
- Create unnecessary complexity
- Cause family strife over bypass trust administration
- Miss portability benefits
- Not reflect current family dynamics`
      },
      {
        id: 'CFP-CASE-003-Q5',
        domain: 'EST',
        question: 'The business real estate ($1.2M FMV, $400K basis) owned by a separate LLC could provide estate planning benefits if:',
        options: [
          { id: 'A', text: 'Sold immediately and proceeds invested in stocks' },
          { id: 'B', text: 'Retained and passed to heirs for step-up in basis at death' },
          { id: 'C', text: 'Gifted to children now to remove from estate' },
          { id: 'D', text: 'Transferred to a Charitable Lead Trust' }
        ],
        correctOptionId: 'B',
        explanation: `**Step-Up Strategy for Real Estate:**

**Retaining until death provides:**
- Full step-up in basis to FMV at death
- $800,000 gain erased ($1.2M - $400K)
- Saves ~$160,000 in capital gains tax (20%)
- Heirs receive property with $1.2M basis

**Continuing benefits if held:**
- Rental income provides cash flow
- Depreciation may offset some income
- Real estate often appreciates
- Can be 1031 exchanged if desired

**Why other options are worse:**
- A) Selling triggers $800K taxable gain NOW
- C) Gifting uses unified credit AND heirs get carryover basis ($400K)
- D) CLT is complex and they want to benefit heirs, not charity primarily

**Given longevity expectations:** Hold for step-up is optimal.`
      },
      {
        id: 'CFP-CASE-003-Q6',
        domain: 'INV',
        question: 'After the business sale, the Thompsons will have approximately $5.5 million in investable assets. Their current 401(k)/IRA allocation is 70% stocks/30% bonds. What asset location strategy should they consider?',
        options: [
          { id: 'A', text: 'Hold bonds in taxable account for favorable tax treatment' },
          { id: 'B', text: 'Hold bonds in tax-deferred accounts, growth stocks in Roth' },
          { id: 'C', text: 'Equal allocation across all accounts for simplicity' },
          { id: 'D', text: 'All stocks in tax-deferred, all bonds in Roth' }
        ],
        correctOptionId: 'B',
        explanation: `**Asset Location Optimization:**

**Optimal placement by account type:**

| Account Type | Best Assets | Reason |
|--------------|-------------|--------|
| **Tax-Deferred (IRA/401k)** | Bonds, REITs | Shields high-yield income from current tax |
| **Roth** | High-growth stocks | Maximum tax-free growth |
| **Taxable** | Index funds, munis | Capital gains treatment, tax-loss harvesting |

**For the Thompsons:**
- Roth ($375K): Growth equities (tax-free forever)
- Traditional IRA ($1.45M): Bonds, REITs
- Taxable ($3.75M post-sale): Index funds, tax-efficient strategies

**Why B is optimal:**
- Bond income is ordinary income (tax-deferred = good)
- Stock growth in Roth = tax-free at withdrawal
- Taxable can use loss harvesting and LTCG rates`
      },
      {
        id: 'CFP-CASE-003-Q7',
        domain: 'RISK',
        question: 'Post-sale, David will no longer need the $1 million key person life insurance. The term policy on David ($2 million, expires at 65) should be:',
        options: [
          { id: 'A', text: 'Kept as-is until expiration' },
          { id: 'B', text: 'Evaluated for conversion to permanent coverage' },
          { id: 'C', text: 'Cancelled immediately to save premiums' },
          { id: 'D', text: 'Increased to cover estate taxes' }
        ],
        correctOptionId: 'B',
        explanation: `**Life Insurance Needs Post-Sale:**

**Changed circumstances:**
- No business debt or obligations to cover
- Estate currently has exposure ($9M vs $7.0M exemption in 2026)
- TCJA sunset means estate is now taxable
- Estate planning more urgent now

**Conversion consideration:**
- Term expires at age 65 (7 years away)
- If David's health changes, no future coverage available
- Conversion locks in insurability at current health status
- Could convert partial amount ($500K-$1M) for flexibility

**Why not other options:**
- A) May expire when still needed given estate tax exposure
- C) Cancelling eliminates future options
- D) Already has estate tax exposure, warrants review

**Recommended:** Evaluate conversion before health events make it impossible.`
      },
      {
        id: 'CFP-CASE-003-Q8',
        domain: 'RET',
        question: 'With $1.45 million in traditional IRA and an 8-year period before RMDs (age 73), David should consider:',
        options: [
          { id: 'A', text: 'No action needed until RMDs begin' },
          { id: 'B', text: 'Roth conversions each year to fill lower tax brackets' },
          { id: 'C', text: 'Immediate full conversion to Roth' },
          { id: 'D', text: 'Withdrawal of entire IRA to avoid RMDs' }
        ],
        correctOptionId: 'B',
        explanation: `**Roth Conversion Strategy:**

**Opportunity:**
- 8 years before RMDs begin
- Post-sale income may be lower (no business income)
- Can convert amounts to "fill up" 22% or 24% bracket
- Reduces future RMDs and heir's IRD burden

**Annual conversion strategy:**
- Estimate income each year
- Convert enough to stay below higher bracket threshold
- Example: Convert $100K-$200K/year at 22-24%
- Vs. RMDs potentially taxed at higher rates + heirs pay tax

**Math example:**
- Convert $150K/year for 5 years = $750K to Roth
- Remaining $700K in traditional at RMD age
- Lower RMDs + $750K grows tax-free

**Why not other options:**
- A) Misses planning opportunity
- C) Immediate full conversion = massive tax bracket spike
- D) Withdrawing = taxable + 10% penalty if before 59½`
      }
    ],
    scoringGuide: `
## Scoring Guide

**8 correct:** Excellent - Expert-level business exit planning
**6-7 correct:** Good - Strong technical knowledge
**4-5 correct:** Fair - Review business planning concepts
**Below 4:** Significant gaps in exit planning knowledge

## Key Takeaways:
1. Business sale creates enormous tax planning opportunities
2. Installment sales can dramatically reduce tax burden
3. Asset location becomes critical with multiple account types
4. Step-up in basis should drive holding decisions for appreciated assets
5. Life insurance needs change dramatically post-business-sale
6. Roth conversion "windows" should be identified and utilized
7. Estate documents must be updated when circumstances change
`
  },

  // CASE STUDY 4: FIRE Movement Couple
  {
    id: 'CFP-CASE-004',
    title: 'The Chen-Patel Household: Early Retirement Planning',
    courseId: 'cfp',
    difficulty: 'hard',
    estimatedTime: 25,
    domains: ['RET', 'TAX', 'INV', 'RISK', 'GEN'],
    scenario: `
## Client Profile: FIRE Planning

**Priya Chen-Patel** (Age 38)
- Software architect at FAANG company
- Base salary: $225,000
- RSUs vesting: ~$80,000/year
- 401(k) balance: $420,000 (80% stocks, 20% bonds)
- Mega backdoor Roth contributions: $30,500/year (after-tax to Roth)
- Roth IRA: $75,000
- HSA: $28,000

**Kevin Chen-Patel** (Age 36)
- Data scientist, recently transitioned to part-time consulting
- 1099 income: ~$95,000/year
- Solo 401(k): $85,000
- Traditional IRA (prior rollover): $45,000

**Children:**
- Twin daughters, age 4 (Lily and Maya)

**Assets:**
- Primary residence: FMV $950,000, mortgage $580,000 (2.75%, 27 years remaining)
- Taxable brokerage: $520,000 (cost basis: $380,000)
- ESPP accumulated stock: $95,000 (single company)
- 529 Plans: $15,000 each child
- Emergency fund: $40,000 (6 months expenses)

**Monthly Expenses:** $8,500 (includes mortgage)
**Post-FIRE Target:** $7,000/month ($84,000/year) without mortgage

**Insurance:**
- Group term life (Priya): $450,000
- No life insurance on Kevin
- Group health through Priya's employer
- Umbrella: $1M

**Goals:**
1. Priya wants to achieve FIRE by age 45 (7 years)
2. Kevin plans to continue part-time work indefinitely for fulfillment
3. Fully fund children's college education
4. Maintain moderate lifestyle with travel flexibility
5. Concerned about healthcare costs before Medicare

**Risk Tolerance:** Moderately aggressive (time horizon allows recovery)

**Concerns:**
- Healthcare coverage gap (age 45-65)
- Accessing retirement funds before 59½
- Single stock concentration in ESPP
`,
    questions: [
      {
        id: 'CFP-CASE-004-Q1',
        domain: 'RET',
        question: 'To access retirement funds before age 59½, which strategy would be MOST tax-efficient for the Chen-Patels?',
        options: [
          { id: 'A', text: 'Take 10% penalty distributions from 401(k)' },
          { id: 'B', text: 'Use Roth conversion ladder (convert now, withdraw in 5 years)' },
          { id: 'C', text: 'Establish 72(t) SEPP from the Solo 401(k)' },
          { id: 'D', text: 'Take hardship distributions citing early retirement' }
        ],
        correctOptionId: 'B',
        explanation: `**Roth Conversion Ladder Strategy:**

This is the preferred FIRE strategy for accessing retirement funds before 59½:

**How it works:**
1. Convert traditional 401(k)/IRA to Roth each year
2. Pay ordinary income tax on conversion (plan for low-income years)
3. Wait 5 years (seasoning period)
4. Withdraw converted amounts tax-free and penalty-free

**Timeline for Chen-Patels:**
- Start conversions at age 40 (when Priya leaves full-time work)
- First conversion accessible at 45 (Priya's target FIRE date)
- Continue annual conversions to maintain pipeline

**Why this wins:**
- More flexible than 72(t) SEPP
- No 10% penalty
- Tax-free growth on Roth going forward
- Can adjust amounts each year

**Bridge strategy:** Use taxable brokerage for years 1-5 while waiting for conversions to season.

**Why not other options:**
- A) 10% penalty is unnecessary and expensive
- C) 72(t) locks you into fixed payments for 5 years or until 59½, whichever is longer
- D) Early retirement is not a qualified hardship`
      },
      {
        id: 'CFP-CASE-004-Q2',
        domain: 'INV',
        question: 'Priya has $95,000 in single-company ESPP stock. What is the MOST appropriate recommendation?',
        options: [
          { id: 'A', text: 'Hold for potential upside since she believes in the company' },
          { id: 'B', text: 'Systematically sell and diversify over 12-24 months' },
          { id: 'C', text: 'Donate the stock to charity for maximum tax benefit' },
          { id: 'D', text: 'Use covered calls to generate income while holding' }
        ],
        correctOptionId: 'B',
        explanation: `**Single Stock Risk:**

Concentrated positions represent unsystematic (company-specific) risk that can be diversified away.

**Recommendation: Systematic Sales**
- Sell over 12-24 months to spread capital gains recognition
- Reduces single-stock exposure gradually
- Allows market timing flexibility

**Tax Considerations:**
- ESPP holding periods: 2 years from grant + 1 year from purchase for favorable treatment
- Qualifying disposition: Discount taxed as ordinary income, excess gain is LTCG
- Plan sales around other income levels

**Why systematic is best:**
- Reduces concentration risk without triggering massive single-year gain
- Can harvest losses in down years
- Maintains some upside exposure

**Why not other options:**
- A) Concentration risk is dangerous regardless of conviction (ask Enron employees)
- C) Charitable donation makes sense if charitably inclined, but not primary recommendation for concentration
- D) Covered calls cap upside, still leave downside risk, and are complex`
      },
      {
        id: 'CFP-CASE-004-Q3',
        domain: 'RISK',
        question: 'The Chen-Patels are concerned about healthcare before Medicare. Which option provides the BEST solution?',
        options: [
          { id: 'A', text: 'ACA marketplace plan with subsidies based on MAGI' },
          { id: 'B', text: 'COBRA continuation for 18 months' },
          { id: 'C', text: 'Short-term health insurance plans until Medicare' },
          { id: 'D', text: 'Health sharing ministry plans' }
        ],
        correctOptionId: 'A',
        explanation: `**ACA Marketplace Strategy:**

For early retirees, ACA marketplace plans are typically the best solution:

**Why ACA works for FIRE:**
- Subsidies based on MAGI (Modified Adjusted Gross Income)
- FIRE households can manage MAGI through Roth conversions, capital gains harvesting
- Coverage guaranteed regardless of pre-existing conditions
- Essential health benefits required

**Subsidy Optimization:**
- Premium tax credits available between 100-400% FPL
- At $84,000 income target, family of 4: may qualify for some subsidy
- Can strategically manage income to maximize credits
- Roth conversions add to MAGI, so plan carefully

**Sample calculation:**
- 2026 FPL for family of 4: ~$32,500
- 400% FPL: ~$124,800
- If MAGI kept at $84,000 (~270% FPL): Significant subsidies available

**Why not other options:**
- B) COBRA: 18 months only, expensive (full premium + 2% admin)
- C) Short-term plans: Limited coverage, pre-ex exclusions, doesn't meet ACA requirements
- D) Health sharing: Not insurance, not guaranteed, religious requirements`
      },
      {
        id: 'CFP-CASE-004-Q4',
        domain: 'TAX',
        question: 'Kevin has a $45,000 traditional IRA from a prior rollover. This creates a challenge for:',
        options: [
          { id: 'A', text: 'His Solo 401(k) contribution limit' },
          { id: 'B', text: 'Priya backdoor Roth contributions (pro-rata rule)' },
          { id: 'C', text: 'His own backdoor Roth contributions (pro-rata rule)' },
          { id: 'D', text: 'Their joint capital gains treatment' }
        ],
        correctOptionId: 'C',
        explanation: `**Pro-Rata Rule Impact:**

The pro-rata rule affects KEVIN's ability to do backdoor Roth, NOT Priya's.

**How pro-rata works:**
- All traditional IRA assets aggregated for conversion calculations
- Kevin has $45,000 pre-tax in traditional IRA
- If he contributes $7,500 non-deductible and converts $7,500:
  - Taxable portion = $7,500 × ($45,000 / $52,500) = ~$6,429 taxable
  - Only ~$1,071 would be tax-free

**Solution: Roll traditional IRA INTO Solo 401(k)**
- Solo 401(k) can accept IRA rollovers
- Removes pre-tax IRA balance from pro-rata calculation
- Enables clean backdoor Roth going forward

**Important distinctions:**
- Pro-rata is calculated INDIVIDUALLY (spouse IRAs don't aggregate)
- Priya's backup Roth is unaffected by Kevin's traditional IRA

**Why not other options:**
- A) IRA doesn't affect 401(k) limits
- B) Priya's backdoor Roth is separate; his IRA doesn't affect hers
- D) IRAs don't affect capital gains treatment`
      },
      {
        id: 'CFP-CASE-004-Q5',
        domain: 'GEN',
        question: 'Given their FIRE timeline and current savings rate, the Chen-Patels should calculate their FIRE number using:',
        options: [
          { id: 'A', text: 'Annual expenses × 20 (5% withdrawal rate)' },
          { id: 'B', text: 'Annual expenses × 25 (4% withdrawal rate)' },
          { id: 'C', text: 'Annual expenses × 30-33 (3-3.3% withdrawal rate)' },
          { id: 'D', text: 'Annual expenses × 15 (conservative short timeline)' }
        ],
        correctOptionId: 'C',
        explanation: `**FIRE Number Calculation:**

For early retirement at 45, the traditional 4% rule may be too aggressive.

**Why 3-3.3% for early retirement:**
- Traditional 4% rule: Based on 30-year retirement
- Retiring at 45 = potentially 50+ year retirement
- Lower withdrawal rate = higher success probability
- Sequence of returns risk amplified with longer timeline

**Calculation for Chen-Patels:**
- Post-FIRE expenses: $84,000/year
- At 3.3% rate: $84,000 / 0.033 = **$2.55 million**
- At 3% rate: $84,000 / 0.03 = **$2.8 million**

**Current trajectory:**
- Total investable: $420K + $75K + $28K + $85K + $45K + $520K ≈ $1.17M
- Plus 7 years of savings at high rate
- Feasible target

**Flexibility factors:**
- Kevin continues part-time work (reduces drawdown)
- Social Security at 67 supplements (reduced need)
- May adjust spending in down markets

**Why not other options:**
- A) 5% is too aggressive for 50-year retirement
- B) 4% designed for 30 years, risky for 50+
- D) 15× is insufficient accumulation`
      },
      {
        id: 'CFP-CASE-004-Q6',
        domain: 'RET',
        question: 'Priya is maximizing mega backdoor Roth contributions ($30,500 after-tax to Roth). This requires her 401(k) to have:',
        options: [
          { id: 'A', text: 'A profit sharing component' },
          { id: 'B', text: 'After-tax contribution option with in-plan Roth conversion' },
          { id: 'C', text: 'Roth 401(k) option only' },
          { id: 'D', text: 'Self-directed brokerage window' }
        ],
        correctOptionId: 'B',
        explanation: `**Mega Backdoor Roth Requirements:**

This advanced strategy requires specific plan features:

**Required plan provisions:**
1. **After-tax contribution option** (not Roth 401(k), which is different)
2. **In-plan Roth conversion** or **in-service distribution** to Roth IRA

**How it works:**
- 2026 total 401(k) limit: $71,500 (includes all sources)
- Employee deferral max: $24,500
- Employer match: Varies (say $13,500)
- Remaining room: $71,500 - $24,500 - $13,500 = $33,500 available for after-tax
- Contribute after-tax, immediately convert to Roth
- Result: Additional $33,500+ into Roth tax treatment

**FAANG companies often offer this** - it's a valuable benefit for high earners.

**Why not other options:**
- A) Profit sharing is employer contribution; different from after-tax employee
- C) Roth 401(k) shares the $24,500 deferral limit; not the mega backdoor
- D) Brokerage window is about investment options, not contribution types`
      }
    ],
    scoringGuide: `
## Scoring Guide

**6 correct:** Excellent - Expert FIRE planning knowledge
**4-5 correct:** Good - Strong understanding of early retirement strategies
**2-3 correct:** Fair - Review tax-efficient withdrawal strategies
**Below 2:** Significant review needed on retirement account rules

## Key FIRE Planning Takeaways:
1. Roth conversion ladder is essential for accessing funds before 59½
2. Single stock concentration must be addressed systematically
3. Healthcare is the biggest FIRE obstacle - plan around ACA subsidies
4. Pro-rata rule affects backdoor Roth strategy - consider rollovers
5. Lower withdrawal rate (3-3.3%) appropriate for 50+ year retirements
6. Mega backdoor Roth accelerates tax-free accumulation
`
  },

  // CASE STUDY 5: High Net Worth Estate Planning
  {
    id: 'CFP-CASE-005',
    title: 'The Wellington Family: Estate & Legacy Planning',
    courseId: 'cfp',
    difficulty: 'hard',
    estimatedTime: 30,
    domains: ['EST', 'TAX', 'RET', 'INV', 'PRO'],
    scenario: `
## Client Profile: Multigenerational Wealth

**Harrison Wellington III** (Age 68)
- Retired CEO, sold manufacturing company 5 years ago
- Receives deferred compensation: $150,000/year (5 years remaining)
- Social Security: $3,800/month
- Private foundation board member (family foundation)

**Eleanor Wellington** (Age 65)
- Former attorney, now philanthropist
- Social Security (spousal, not yet claiming)

**Children:**
- Harrison IV (Age 40): Investment banker, married, 2 children (ages 8 and 10)
- Victoria (Age 38): Artist, single, limited income (~$35,000/year)
- Alexandra (Age 35): Physician, married, 1 child (age 2)

**Assets:**
- Personal residence: FMV $4.2 million (inherited from Harrison's father, basis stepped up to $2.1M)
- Vacation home (Nantucket): FMV $2.8 million, basis $900,000
- Investment portfolio (joint): $12.5 million (cost basis $6.8 million)
- IRA (Harrison): $3.2 million
- IRA (Eleanor): $1.1 million
- Qualified Opportunity Zone Fund: $800,000 (invested 2019)
- Wellington Family Foundation: $5 million endowment
- Family LLC holding commercial real estate: $4.8 million FMV, $1.2 million basis
- Life insurance: $5 million whole life (cash value $1.8 million) owned by Harrison
- Art collection: Appraised at $1.2 million

**Estate Planning Documents:**
- A-B trust established 20 years ago
- Pour-over will directing assets to trust
- Healthcare proxy, financial POA in place
- Trust currently splits assets at first death: Bypass trust (exemption amount), Marital trust (remainder)

**Liabilities:**
- Primary mortgage: $0
- Line of credit (secured by portfolio): $400,000 balance

**Annual Charitable Giving:**
- Foundation: $200,000/year to various causes
- Direct donations: ~$50,000/year

**Goals:**
1. Minimize estate taxes at second death
2. Provide for Victoria without enabling dependency
3. Transfer wealth to grandchildren efficiently
4. Continue philanthropic legacy
5. Manage IRD in IRAs tax-efficiently
6. Harrison concerned about cognitive decline in family history

**Concerns:**
- Estate tax exposure now significant (exemption is $7.0M due to TCJA sunset)
- Victoria's financial stability
- Healthcare decisions if Harrison becomes incapacitated
`,
    questions: [
      {
        id: 'CFP-CASE-005-Q1',
        domain: 'EST',
        question: 'With the estate tax exemption at $7.0M (2026 TCJA sunset), the Wellingtons gross estate exceeds exemptions by approximately:',
        options: [
          { id: 'A', text: '$21 million (combined $14M exemption for married couple)' },
          { id: 'B', text: '$22 million (combined $14M exemption for married couple)' },
          { id: 'C', text: '$24 million (after deductions)' },
          { id: 'D', text: '$32 million (gross estate)' }
        ],
        correctOptionId: 'A',
        explanation: `**Estate Tax Calculation:**

**Gross estate estimate:**
- Primary residence: $4.2M
- Vacation home: $2.8M
- Investment portfolio: $12.5M
- Harrison IRA: $3.2M
- Eleanor IRA: $1.1M
- QOZ Fund: $0.8M
- Family LLC: $4.8M
- Life insurance (owned by Harrison): $5.0M
- Art collection: $1.2M
- **Total gross estate: ~$35.6M**
- Less LOC: ($0.4M)
- **Net estate: ~$35.2M**

**Tax exposure analysis:**

2026 exemption ($7.0M × 2 = $14.0M):
- Excess: $35.2M - $14.0M = **$21.2M taxable** ≈ $21M
- Tax at 40%: **~$8.5M estate tax**

**Urgent planning need:** Estate tax planning is critical with $21M+ exposure.`
      },
      {
        id: 'CFP-CASE-005-Q2',
        domain: 'EST',
        question: 'The $5 million life insurance policy owned by Harrison will be included in his estate. To exclude it, the Wellingtons should:',
        options: [
          { id: 'A', text: 'Transfer ownership to Eleanor immediately' },
          { id: 'B', text: 'Transfer to an irrevocable life insurance trust (ILIT) and survive 3 years' },
          { id: 'C', text: 'Name the children as beneficiaries directly' },
          { id: 'D', text: 'Exchange for an annuity under Section 1035' }
        ],
        correctOptionId: 'B',
        explanation: `**ILIT Strategy for Life Insurance:**

**Problem:** Harrison owns the policy, so the $5M death benefit is included in his estate.

**Solution: Transfer to ILIT**
- Create irrevocable life insurance trust
- Transfer existing policy to ILIT
- **Must survive 3 years** (IRC §2035 lookback)

**Benefits:**
- Death benefit excluded from both spouses' estates
- Trust provides management for beneficiaries
- Can include spendthrift provisions for Victoria
- Trustee controls distributions (protects from creditors, divorce)

**Crummey powers for premium payments:**
- ILIT receives gifts each year for premiums
- Beneficiaries notified of withdrawal right (typically 30 days)
- Creates present interest for annual exclusion ($19K per beneficiary)

**Why not other options:**
- A) Transfer to Eleanor: Still in estate at her death (second-to-die problem)
- C) Changing beneficiaries doesn't remove from estate if Harrison owns
- D) 1035 to annuity eliminates death benefit protection

**At age 68, 3-year survival is a concern but worth attempting.**`
      },
      {
        id: 'CFP-CASE-005-Q3',
        domain: 'EST',
        question: 'For Victoria, who needs financial support but should not receive a large inheritance directly, the BEST trust structure is:',
        options: [
          { id: 'A', text: 'Outright inheritance with moral instruction' },
          { id: 'B', text: 'Incentive trust requiring employment for distributions' },
          { id: 'C', text: 'Discretionary trust with independent trustee' },
          { id: 'D', text: 'Charitable remainder trust naming Victoria as income beneficiary' }
        ],
        correctOptionId: 'C',
        explanation: `**Discretionary Trust for Victoria:**

Given Victoria's profile (artist, limited income, concerns about dependency):

**Best approach: Discretionary trust**
- Independent corporate trustee (bank trust dept, trust company)
- Broad distribution standards (health, education, maintenance, support)
- NO mandatory income distributions
- Trustee has full discretion over timing and amount

**Advantages:**
- Protects Victoria from creditors and predators
- Asset protection in potential divorce
- Prevents immediate depletion
- HEMS standard provides for needs without enabling
- Professional management of investments

**Spendthrift clause:**
- Prevents Victoria from assigning interest
- Creditors cannot attach trust assets

**Compare to outright inheritance:**
- Limited income Victoria may quickly deplete
- No protection from lawsuits, divorce, poor decisions

**Why not other options:**
- A) Direct inheritance offers no protection
- B) Incentive trusts are controversial and may harm relationships
- D) CRT provides income but remainder goes to charity, not family`
      },
      {
        id: 'CFP-CASE-005-Q4',
        domain: 'TAX',
        question: 'Harrison has $3.2 million in his traditional IRA. This represents income in respect of a decedent (IRD). The MOST tax-efficient beneficiary designation would be:',
        options: [
          { id: 'A', text: 'Eleanor as primary beneficiary (spousal rollover)' },
          { id: 'B', text: 'Children equally as primary beneficiaries' },
          { id: 'C', text: 'Wellington Family Foundation as beneficiary' },
          { id: 'D', text: 'QTIP trust for Eleanor benefit' }
        ],
        correctOptionId: 'C',
        explanation: `**IRA to Charity Strategy:**

**IRD problem:**
- $3.2M IRA is income in respect of a decedent
- NO step-up in basis at death
- Whoever inherits pays income tax on distributions

**Tax analysis by beneficiary:**
- Eleanor: Can rollover, but eventually taxable to her or heirs
- Children: 10-year drawdown rule, taxable at their rates (high for Harrison IV)
- Charity: 100% income tax-free, reduces estate

**Optimal strategy:**
- Name Wellington Family Foundation (or DAF) as IRA beneficiary
- Leave other assets (that GET step-up) to family
- Family receives: residence, vacation home, art, investments (all stepped-up basis)
- Charity receives: IRA (no step-up anyway)

**Tax savings:**
- Avoids both estate tax AND income tax on IRA
- $3.2M to charity satisfies charitable goals
- Equivalent to giving family $3.2M in after-tax value

**Why estate tax efficient:**
- IRA removed from estate
- Charitable deduction offsets inclusion

**Why not other options:**
- A) Eventually taxable to Eleanor or heirs
- B) 10-year rule forces distributions in high-tax years
- D) Trust as beneficiary = 10-year rule, trust tax rates (highest bracket at ~$14K)`
      },
      {
        id: 'CFP-CASE-005-Q5',
        domain: 'EST',
        question: 'The 20-year-old A-B trust is OUTDATED primarily because:',
        options: [
          { id: 'A', text: 'Portability eliminates the need for bypass trusts' },
          { id: 'B', text: 'Trust tax rates are now too high' },
          { id: 'C', text: 'Portability did not exist then; current approach may waste exemptions' },
          { id: 'D', text: 'IRAs cannot be transferred to trusts' }
        ],
        correctOptionId: 'C',
        explanation: `**Portability and Trust Updates:**

**Historical context:**
- Pre-2010: No portability of unused exemption
- A-B trust: Funded bypass trust with exemption amount, marital trust with excess
- Purpose: Use BOTH spouses exemptions

**Post-portability (2010+):**
- Deceased spouse unused exemption (DSUE) can transfer to survivor
- A-B structure may cause unnecessary income tax (bypass trust doesn't get second step-up)

**Current issues with old trust:**
- May auto-fund bypass at first death
- Lost step-up on bypass trust assets
- May be more complexity than needed
- Exemption amounts have increased dramatically

**Modern approach options:**
1. **Clayton trust:** Disclaimer-based flexibility
2. **QTIP with portability:** All to marital, elect DSUE
3. **Revise trust provisions**

**However, for Wellingtons ($35M+):**
- They WILL need exemption planning
- But should update for modern flexibility
- Consider GST planning for grandchildren

**Why not other options:**
- A) Portability is helpful but bypass may still be useful for asset protection, GST
- B) Trust rates are high but not the primary issue
- D) IRAs can be left to trusts (with limitations)`
      },
      {
        id: 'CFP-CASE-005-Q6',
        domain: 'EST',
        question: 'To maximize wealth transfer to grandchildren while minimizing transfer taxes, the Wellingtons should use:',
        options: [
          { id: 'A', text: 'Annual exclusion gifts of $19,000 per grandchild' },
          { id: 'B', text: 'Dynasty trust funded with remaining GST exemption' },
          { id: 'C', text: 'UGMA/UTMA accounts for each grandchild' },
          { id: 'D', text: 'Gifts after both deaths via will' }
        ],
        correctOptionId: 'B',
        explanation: `**Dynasty Trust Strategy:**

**GST Planning:**
- Generation-Skipping Transfer tax: Additional 40% tax on transfers to grandchildren
- Each spouse has $7.0M GST exemption (2026)

**Dynasty trust benefits:**
- Allocate GST exemption to trust
- Trust assets skip estate tax at children's deaths
- May continue for multiple generations (varies by state law)
- Nevada, South Dakota allow perpetual trusts

**For Wellingtons:**
- 5 grandchildren (2 + 1 + likely more)
- Fund dynasty trust with appreciating assets
- Use combined $14M GST exemption strategically
- Growth occurs outside family's estates forever

**Maximum leverage:**
- Gift $14M (combined exemption) now
- If it grows to $30M+, entire amount avoids GST and estate tax for generations

**Why not other options:**
- A) Annual exclusion is good but small compared to wealth ($95K/year × 5 = $475K)
- C) UGMA/UTMA gives assets to kids at 18/21 (no control)
- D) Gifts at death use exemption but no leverage from growth`
      },
      {
        id: 'CFP-CASE-005-Q7',
        domain: 'PRO',
        question: 'Harrison is concerned about cognitive decline. Beyond healthcare directives, the MOST comprehensive planning tool is:',
        options: [
          { id: 'A', text: 'Joint account ownership with children' },
          { id: 'B', text: 'Durable power of attorney with detailed financial provisions' },
          { id: 'C', text: 'Revocable living trust with successor trustee provisions' },
          { id: 'D', text: 'Court-supervised guardianship' }
        ],
        correctOptionId: 'C',
        explanation: `**Revocable Living Trust for Incapacity:**

**Why RLT is most comprehensive:**
- Acts as both incapacity AND estate planning tool
- Successor trustee can manage assets seamlessly
- No court involvement (unlike guardianship)
- Privacy maintained (unlike probate)
- Can include detailed investment and distribution guidelines

**Best practices:**
- Name corporate trustee or trusted family member as successor
- Include specific incapacity triggers (physician certification)
- Consider trust protector for flexibility
- Fund trust with most assets during lifetime

**Compare to durable POA:**
- POA is essential but limited
- Some institutions resist honoring POAs
- POA dies with principal
- Trust continues after death

**Comprehensive incapacity plan includes:**
1. Healthcare proxy + living will
2. Durable financial POA
3. Funded revocable trust with successor trustee
4. HIPAA authorizations

**Why not other options:**
- A) Joint ownership causes gift tax issues, creditor exposure
- B) POA is necessary but not comprehensive
- D) Guardianship is expensive, public, last resort`
      },
      {
        id: 'CFP-CASE-005-Q8',
        domain: 'TAX',
        question: 'Harrison invested $800,000 in a QOZ Fund in 2019. If he holds until death, the tax benefit includes:',
        options: [
          { id: 'A', text: 'Original gain deferral only' },
          { id: 'B', text: 'Original gain deferral plus 10% basis step-up' },
          { id: 'C', text: 'Complete exclusion of appreciation if held 10+ years' },
          { id: 'D', text: 'Both original gain deferral AND exclusion of QOZ appreciation if held 10+ years' }
        ],
        correctOptionId: 'D',
        explanation: `**Qualified Opportunity Zone Benefits:**

**Harrison's 2019 QOZ investment timeline:**

1. **Original gain deferral:**
   - $800K represented deferred capital gain
   - Tax on original gain due December 31, 2026 (or earlier if sold)

2. **Basis step-up (if held 5+ years):**
   - After 5 years (2024): 10% basis increase
   - Original investment: $0 basis → $80,000 basis
   - After 7 years: (Eliminated by TCJA for investments after 2019)

3. **10-year exclusion (if held 10+ years):**
   - After 10 years (2029): Appreciation in QOZ investment is TAX-FREE
   - Example: If $800K grows to $1.5M by 2029
   - $700K appreciation = completely excluded

4. **Death benefit:**
   - Heirs receive stepped-up basis on QOZ investment
   - But original deferred gain may still be due at 2026 deadline

**Tax planning:**
- If Harrison dies before 2026: Deferred gain may be triggered
- If after 2026: Already paid tax on original gain
- 10+ year hold: Appreciation exclusion is powerful

**Combined benefit makes QOZ very attractive for long-term holding.**`
      }
    ],
    scoringGuide: `
## Scoring Guide

**8 correct:** Excellent - Expert estate planning knowledge
**6-7 correct:** Good - Strong grasp of HNW planning concepts
**4-5 correct:** Fair - Review estate tax rules and trust strategies
**Below 4:** Significant review needed on estate planning

## Key HNW Estate Planning Takeaways:
1. 2026 exemption sunset creates urgency for large gifts NOW
2. ILIT removes life insurance from estate (3-year lookback applies)
3. Discretionary trusts protect beneficiaries who need structure
4. IRAs to charity = double tax savings (income + estate)
5. Old A-B trusts should be reviewed for portability-era updates
6. Dynasty trusts leverage GST exemption for multigenerational wealth
7. Incapacity planning requires multiple coordinated documents
8. QOZ offers deferral + exclusion for long-term investors
`
  }
];

// Combine all case study batches
export const CFP_CASE_STUDIES: CaseStudy[] = [
  ...CFP_CASE_STUDIES_BASE,
  ...CFP_CASE_STUDIES_BATCH2,
  ...CFP_CASE_STUDIES_BATCH3,
  ...CFP_CASE_STUDIES_BATCH4,
  ...CFP_CASE_STUDIES_BATCH5,
  ...CFP_CASE_STUDIES_BATCH6,
];

export default CFP_CASE_STUDIES;

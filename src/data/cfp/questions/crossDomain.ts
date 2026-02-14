/**
 * CFP Cross-Domain Integration Questions
 * 
 * These questions test knowledge across 2-3 domains simultaneously,
 * mirroring the real CFP exam which often requires integrated thinking.
 */

import type { Question } from '../../../types';

export const CFP_CROSS_DOMAIN_QUESTIONS: Question[] = [
  // TAX + RETIREMENT
  {
    id: 'CFP-CROSS-001',
    courseId: 'cfp',
    section: 'CFP-TAX',
    topic: 'Cross-Domain Integration',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: "Marcus, age 68, has a $1.2 million traditional IRA and taxable income of $120,000. He's considering converting $80,000 to a Roth IRA this year. His marginal rate is 24%, and he projects being in the 32% bracket once RMDs begin at 73. Which statement BEST describes the tax planning opportunity?",
    options: [
      'The conversion is inadvisable because he will pay $19,200 in taxes now',
      'Converting fills the 24% bracket efficiently, avoiding higher future taxes on RMDs',
      'He should wait until 73 to begin conversions when income is lower',
      'The conversion will increase his current year RMD requirement'
    ],
    correctAnswer: 1,
    explanation: `**Cross-Domain Analysis (Tax + Retirement):**

This question integrates tax bracket management with retirement distribution planning.

**Why B is correct:**
- Marcus has a "window" before RMDs begin (age 73)
- Converting at 24% now beats paying 32% later on forced RMDs
- $80,000 keeps him in the 24% bracket while reducing future IRA balance
- Smaller IRA = smaller RMDs = potentially lower future tax rates

**Tax Math:**
- Current conversion cost: $80,000 × 24% = $19,200
- Future RMD tax (if not converted): $80,000 × 32% = $25,600
- Savings + tax-free Roth growth

**Why other options fail:**
- A: Ignores the comparison to higher future taxes
- C: At 73, income increases (Social Security + RMDs), higher brackets
- D: RMDs don't begin until 73, and conversions don't trigger RMDs

**Key Integration:** Optimal Roth conversion strategies require understanding both tax brackets AND retirement account rules simultaneously.`,
  },
  
  // ESTATE + TAX
  {
    id: 'CFP-CROSS-002',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Cross-Domain Integration',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: "Helen, age 82, owns stock worth $500,000 with a basis of $50,000. Her grandson wants to sell the stock to fund a home purchase. Helen is considering either gifting the stock now or bequeathing it at death. If Helen is expected to live 3+ more years and the grandson is in the 15% LTCG bracket, which approach results in the LOWEST total tax?",
    options: [
      'Gift now—grandson receives Helen\'s basis and pays capital gains if sold',
      'Bequest at death—grandson receives stepped-up basis and pays no capital gains',
      'Gift now—the annual exclusion eliminates any capital gains tax',
      'Either approach has the same tax result since the unified credit applies'
    ],
    correctAnswer: 1,
    explanation: `**Cross-Domain Analysis (Estate + Tax):**

This question integrates gift/estate transfer rules with capital gains taxation.

**Tax Comparison:**

**Option A (Gift now):**
- Grandson receives carryover basis ($50,000)
- If he sells for $500,000: Gain = $450,000
- LTCG tax at 15% = $67,500

**Option B (Bequest at death):**
- Grandson receives stepped-up basis (FMV at death, ~$500,000+)
- If he sells for ~$500,000: Gain = $0
- LTCG tax = $0

**Savings from waiting: $67,500**

**Why the bequest wins:**
- Step-up in basis eliminates ALL built-in gain
- 3+ year time horizon means gift won't be pulled back into estate
- No estate tax concern if Helen is below exemption

**Common misconceptions:**
- C is wrong: Annual exclusion covers gift tax, not capital gains
- D is wrong: Unified credit relates to transfer taxes, not income taxes

**Key Integration:** Estate planning decisions must account for income tax (basis) consequences, not just transfer taxes.`,
  },
  
  // RETIREMENT + RISK MANAGEMENT
  {
    id: 'CFP-CROSS-003',
    courseId: 'cfp',
    section: 'CFP-RET',
    topic: 'Cross-Domain Integration',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: "Patricia, age 65, is retiring with $800,000 in savings and Social Security of $2,500/month. She needs $5,000/month and is concerned about outliving her assets. Her advisor recommends allocating $200,000 to a single premium immediate annuity (SPIA). Which statement BEST justifies this recommendation from an integrated planning perspective?",
    options: [
      'The SPIA guarantees a fixed return higher than bonds',
      'Annuitization transfers longevity risk to the insurer, allowing more aggressive allocation of remaining assets',
      'The SPIA provides tax-free income to supplement Social Security',
      'SPIAs are not recommended because they sacrifice liquidity for income'
    ],
    correctAnswer: 1,
    explanation: `**Cross-Domain Analysis (Retirement + Risk Management):**

This integrates retirement income planning with insurance concepts.

**Why B is correct:**

**Risk Transfer Component:**
- SPIA transfers longevity risk (living longer than expected) to insurance company
- Insurer pools risk across many policyholders
- Patricia receives guaranteed income regardless of lifespan

**Portfolio Optimization Component:**
- With $200K locked in guaranteed income, Patricia has $600K remaining
- The SPIA + Social Security = stable "floor" (~$3,800/month if SPIA provides ~$1,300)
- Remaining $600K can be invested more aggressively (higher equity allocation)
- This "flooring" strategy can actually INCREASE expected wealth

**Why other options fail:**
- A: SPIAs don't provide a "return"—they provide mortality credits + interest
- C: SPIA income is partially taxable (exclusion ratio applies)
- D: Liquidity sacrifice is a feature, not a bug—it's what enables the guarantee

**Key Integration:** Retirement income strategies must consider insurance solutions (risk transfer) alongside investment strategies.`,
  },
  
  // INVESTMENT + TAX
  {
    id: 'CFP-CROSS-004',
    courseId: 'cfp',
    section: 'CFP-INV',
    topic: 'Cross-Domain Integration',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: "David has $500,000 in a taxable account and $500,000 in a traditional IRA. He wants to hold both municipal bonds and REITs. His marginal tax rate is 32%. From an asset location perspective, which placement is MOST tax-efficient?",
    options: [
      'Municipal bonds in IRA, REITs in taxable account',
      'Municipal bonds in taxable account, REITs in IRA',
      'Split both equally between accounts for diversification',
      'Asset location doesn\'t matter if total allocation is the same'
    ],
    correctAnswer: 1,
    explanation: `**Cross-Domain Analysis (Investment + Tax):**

This integrates investment vehicle characteristics with tax planning.

**Asset Location Principles:**

**Municipal Bonds → Taxable Account:**
- Muni interest is already tax-exempt
- Putting munis in IRA = WASTING the tax benefit
- IRA distributions taxed as ordinary income (munis lose their advantage)

**REITs → Tax-Deferred Account (IRA):**
- REIT dividends are mostly ordinary income (high tax drag)
- In taxable: 32% tax on most REIT distributions
- In IRA: Tax-deferred until withdrawal
- Better yet: Roth IRA (tax-free distributions)

**Tax Math Example (10-year, 6% return):**
- REITs in taxable: Loses ~1-2% annually to taxes
- REITs in IRA: Full tax-deferred compounding

**Why other options fail:**
- A: Exactly backwards—wastes muni tax advantage
- C: Ignoring tax efficiency hurts long-term returns
- D: Asset location can add 0.5-1% annually to after-tax returns

**Key Integration:** Investment selection (asset allocation) must be paired with tax-aware placement (asset location).`,
  },
  
  // ESTATE + PROFESSIONAL CONDUCT
  {
    id: 'CFP-CROSS-005',
    courseId: 'cfp',
    section: 'CFP-PCR',
    topic: 'Cross-Domain Integration',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: "A CFP® professional's client, age 78, wants to add her son as joint owner on all accounts 'to avoid probate.' The CFP® knows this could expose assets to the son's creditors, affect Medicaid eligibility, and create unequal inheritance among siblings. The son is present and enthusiastic about the plan. What is the CFP®'s BEST course of action?",
    options: [
      'Implement the client\'s wishes since she has decision-making capacity',
      'Refuse to help and refer to another advisor who will comply',
      'Request a private meeting with the client to explore the risks and alternatives',
      'Proceed with the plan since it achieves the probate-avoidance goal'
    ],
    correctAnswer: 2,
    explanation: `**Cross-Domain Analysis (Professional Conduct + Estate):**

This integrates fiduciary standards with estate planning risks.

**Why C is correct:**

**Fiduciary Duty Considerations:**
- Duty of Care: Must act with competence, which includes identifying risks
- Duty of Loyalty: Client's interests first (not son's)
- Client may not fully understand consequences
- Son's presence may create undue influence concerns

**Estate Planning Risks of Joint Ownership:**
- Son's creditors can reach the assets
- Son's divorce could claim portion
- Loss of step-up in basis at mother's death (only her portion)
- Unequal treatment of other siblings
- Medicaid look-back period issues

**Professional Response:**
- Private meeting removes potential undue influence
- Allows candid discussion of risks
- CFP® can present alternatives (TOD/POD accounts, revocable trust)
- Documents informed consent if client proceeds

**Why other options fail:**
- A: Capacity isn't the issue—informed consent is
- B: Abandoning client when she needs guidance most
- D: Ignores fiduciary duty to identify and discuss risks

**Key Integration:** Professional conduct requires understanding technical estate planning consequences to fulfill fiduciary duty.`,
  },
  
  // TAX + ESTATE + RETIREMENT
  {
    id: 'CFP-CROSS-006',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Cross-Domain Integration',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: "Robert, a widower with a $15 million estate, has a $3 million IRA and three adult children. He is charitably inclined. From an integrated tax perspective, the MOST efficient beneficiary designation for his IRA is:",
    options: [
      'Equally to his three children (subject to 10-year rule)',
      'To a charitable remainder trust for income to children',
      'Directly to his donor-advised fund or private foundation',
      'To a bypass trust for estate tax efficiency'
    ],
    correctAnswer: 2,
    explanation: `**Cross-Domain Analysis (Estate + Tax + Retirement):**

This integrates IRA distribution rules, income tax, and estate planning.

**Why C is correct:**

**The IRD Problem:**
- $3M IRA is "income in respect of a decedent"
- NO step-up in basis
- Whoever receives it pays income tax on distributions

**Tax Analysis by Option:**

**If children inherit:**
- 10-year rule forces distribution by year 10
- Children likely in high brackets: ~37% federal + state
- Tax cost: $3M × 37% = $1,110,000+
- Plus potential estate tax on $15M estate

**If charity inherits:**
- Charity pays NO income tax (tax-exempt)
- Estate gets charitable deduction = reduces estate tax
- Double tax savings

**Better Strategy:**
- Name charity as IRA beneficiary
- Leave OTHER assets (with step-up in basis) to children
- Children receive ~$12M at stepped-up basis
- Charity receives $3M tax-free
- Family is better off overall

**Why other options are inferior:**
- A: Children pay income tax on IRD
- B: CRT complicated; income still taxable to children
- D: Trust as IRA beneficiary = accelerated distributions + highest trust tax rates

**Key Integration:** IRA beneficiary planning requires considering income tax (IRD), estate tax, and comparison to other assets.`,
  },
  
  // INVESTMENT + RETIREMENT
  {
    id: 'CFP-CROSS-007',
    courseId: 'cfp',
    section: 'CFP-INV',
    topic: 'Cross-Domain Integration',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: "Tom retired at 65 with $1,000,000 invested 60/40 stocks/bonds. After year one, stocks dropped 30% while bonds returned 5%. His portfolio is now worth $800,000. Tom needs $45,000/year. Which strategy BEST addresses sequence-of-returns risk?",
    options: [
      'Rebalance to maintain 60/40 allocation and withdraw $45,000 proportionally',
      'Withdraw from bonds only this year, allowing stocks to recover',
      'Reduce withdrawals to $32,000 (4% of current value)',
      'Move to 100% bonds to prevent further losses'
    ],
    correctAnswer: 1,
    explanation: `**Cross-Domain Analysis (Investment + Retirement):**

This integrates portfolio management with retirement withdrawal strategy.

**Sequence-of-Returns Risk:**
- Poor returns early in retirement are devastating
- Selling stocks at low prices locks in losses
- Reduces portfolio's ability to recover

**Why B is correct:**

**Withdrawal Sourcing Strategy:**
- Bonds are UP (~$420K → ~$441K after 5% return)
- Stocks are DOWN (~$600K → ~$420K after -30%)
- Withdraw $45K from bonds: $441K → $396K
- Leave stocks untouched to participate in recovery

**This preserves:**
- More shares of stock to capture eventual recovery
- Overall allocation shifts toward stocks (contra-rebalancing)
- Historically, post-crash returns are strong

**Why other options fail:**
- A: Proportional withdrawal = selling stocks low
- C: 25% lifestyle cut may be unsustainable
- D: 100% bonds = permanently sacrifice growth potential

**Advanced Variant:**
- Have 2-3 years cash/bonds as withdrawal "bucket"
- Never sell stocks in down years
- Refill bucket when stocks recover

**Key Integration:** Portfolio withdrawal strategy must adapt to market conditions, not mechanically follow allocation rules.`,
  },
  
  // RISK + TAX
  {
    id: 'CFP-CROSS-008',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Cross-Domain Integration',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: "Sandra purchased a universal life policy 5 years ago. She's contributed $150,000 in premiums and the cash value is now $180,000. Her policy is NOT a MEC. She wants to access $50,000 for her daughter's wedding. The MOST tax-efficient method is:",
    options: [
      'Surrender the policy and take the cash',
      'Take a $50,000 withdrawal from the policy',
      'Take a $50,000 policy loan',
      'Withdraw $50,000 and pay ordinary income tax on the gain'
    ],
    correctAnswer: 2,
    explanation: `**Cross-Domain Analysis (Risk Management + Tax):**

This integrates life insurance mechanics with tax consequences.

**Non-MEC Life Insurance Tax Rules:**

**FIFO (First-In, First-Out) Treatment:**
- Withdrawals first come from basis (premiums paid) = tax-free
- After basis exhausted, gains are taxable

**Policy Loan Treatment:**
- Loans are NOT taxable events
- No withdrawal, no gain recognition
- Interest accrues but often at competitive rates

**Analysis of Options:**

**Option C (Loan): BEST**
- $50K loan = $0 current taxes
- Loan can remain outstanding until death
- At death: Loan repaid from death benefit (tax-free)
- Policy stays in force

**Option B (Withdrawal):**
- First $50K = return of premium (FIFO)
- In this case: Tax-free since still within $150K basis
- BUT: Reduces policy value permanently

**Option A:**
- Triggers tax on $30K gain ($180K - $150K)
- Ends insurance coverage
- Worst option

**Why C beats B:**
- Loan preserves full cash value growth potential
- If Sandra later needs more, she still has access
- Withdrawal permanently reduces policy value

**Key Integration:** Insurance product design (MEC vs non-MEC) directly impacts tax planning options.`,
  },
  
  // GENERAL + INVESTMENT + TAX
  {
    id: 'CFP-CROSS-009',
    courseId: 'cfp',
    section: 'CFP-GEN',
    topic: 'Cross-Domain Integration',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: "The Johnson family has a 16-year-old planning to attend college in 2 years. They have $80,000 available. Grandparents want to contribute $50,000 as well. The family's AGI is $180,000. Which approach MAXIMIZES both tax benefits and financial aid eligibility?",
    options: [
      'Parents open a 529 in child\'s name and fund with $130,000',
      'Grandparents own a separate 529 and contribute $50,000',
      'Parents own 529 ($80K), grandparents make qualified distribution when child enrolls',
      'Use UTMA account for maximum flexibility'
    ],
    correctAnswer: 2,
    explanation: `**Cross-Domain Analysis (General Principles + Investment + Tax):**

This integrates education planning, investment vehicles, and tax/financial aid implications.

**Financial Aid Considerations (FAFSA):**

**Parent-Owned 529:**
- Counted as parent asset (5.64% expected contribution)
- Distributions don't count as income

**Grandparent-Owned 529:**
- NOT counted as asset (good)
- BUT: Distributions counted as STUDENT INCOME (bad)
- Student income assessed at 50%!
- Destroys financial aid for following year

**The "Grandparent 529 Trap":**
- If grandparents own and distribute during junior year
- Next year's FAFSA shows $25K "student income"
- Aid reduced by ~$12,500

**Why C is optimal:**
- Parent-owned 529 = minimal asset impact (5.64% × $80K = ~$4,500 EFC impact)
- Grandparent waits to distribute in child's FINAL college year
- No more FAFSAs after that = no income reporting issue
- OR: Use new FAFSA rules that may improve treatment

**Why other options fail:**
- A: Putting in child's name = still parent ownership; same as C but grandparents excluded
- B: Distribution during college kills aid
- D: UTMA is child's asset = 20% EFC rate (worst)

**Key Integration:** Education funding requires understanding account ownership, timing, and financial aid formulas.`,
  },
  
  // RETIREMENT + TAX + PROFESSIONAL
  {
    id: 'CFP-CROSS-010',
    courseId: 'cfp',
    section: 'CFP-RET',
    topic: 'Cross-Domain Integration',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: "A couple, both 62, asks whether to claim Social Security now or wait. The husband's PIA is $2,800, wife's is $1,200. They have $800,000 in traditional IRAs. The CFP® runs projections showing that claiming at 62 reduces lifetime benefits by $400,000, but the clients prefer 'getting money now.' The CFP®'s BEST response is:",
    options: [
      'Respect client autonomy and file for benefits immediately',
      'Explain the tax torpedo effect of IRA withdrawals plus Social Security',
      'Present the analysis showing delayed claiming benefit and explore their concerns',
      'Refer them to the Social Security office for claiming advice'
    ],
    correctAnswer: 2,
    explanation: `**Cross-Domain Analysis (Retirement + Tax + Professional Conduct):**

**Why C is the BEST answer:**

**Professional Conduct Component:**
- Fiduciary duty requires acting in client's best interest
- Duty of care: Provide competent analysis
- BUT: Client autonomy matters—ultimately their decision
- Must EDUCATE, not dictate

**The Analysis Should Show:**

**Delayed Claiming Benefits:**
- Husband at 70: $2,800 × 1.24 = $3,472/month (32% permanent increase)
- Wife spousal at 70: ~$1,736/month
- Over 25-year retirement: ~$400K+ more lifetime income

**Tax Torpedo Issue (why B is incomplete):**
- If they claim early AND draw IRAs: Both income sources hit at once
- Social Security becomes 85% taxable
- Combined income pushes into higher brackets
- The "torpedo" is real but it's not the primary reason to delay

**Bridge Strategy:**
- Delay SS, draw down IRAs ages 62-70
- Reduces future RMDs
- Create Roth conversion opportunity
- SS taxed at lower rate when it starts (smaller IRA)

**Why C beats A:**
- A abandons fiduciary duty to educate
- C respects autonomy AFTER ensuring informed decision

**Why C beats B:**
- B focuses on one technical point
- C addresses the full picture AND their emotional concerns`,
  },

  // ESTATE + INSURANCE + TAX
  {
    id: 'CFP-CROSS-011',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Cross-Domain Integration',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: "Margaret, age 60, has a $12 million estate and a $3 million life insurance policy she owns. She wants the death benefit to pay estate taxes at her death. Her estate planner suggests transferring the policy to an ILIT. Which statement is MOST accurate?",
    options: [
      'If Margaret survives 3 years, the $3M death benefit is excluded from her estate',
      'The transfer eliminates estate tax on the policy regardless of survival',
      'The ILIT provides immediate estate tax exclusion upon transfer',
      'An ILIT is unnecessary since her estate is below the exemption amount'
    ],
    correctAnswer: 0,
    explanation: `**Cross-Domain Analysis (Estate + Insurance + Tax):**

**Why A is correct:**

**Three-Year Rule (IRC §2035):**
- When you transfer an existing life insurance policy
- If you die within 3 years of transfer
- Policy is "pulled back" into your gross estate
- Full death benefit included

**If Margaret survives 3+ years:**
- $3M death benefit is OUTSIDE her estate
- At current exemption ($13.61M): $12M estate = no tax
- BUT: With 2026 sunset (~$6M exemption):
  - Without ILIT: $15M estate - $6M = $9M taxable = $3.6M tax
  - With ILIT: $12M estate - $6M = $6M taxable = $2.4M tax

**Why other options fail:**
- B: 3-year rule means timing matters
- C: No immediate exclusion—must survive 3 years
- D: Current exemption ok, but 2026 sunset + policy itself adds $3M

**Planning Insight:**
- At age 60, 3-year survival is statistically likely
- Alternative: ILIT purchases NEW policy (no 3-year rule)
- Crummey powers needed for premium gifts

**Key Integration:** Life insurance estate planning requires insurance product knowledge + estate tax rules.`,
  },

  // INVESTMENT + RISK + RETIREMENT
  {
    id: 'CFP-CROSS-012',
    courseId: 'cfp',
    section: 'CFP-INV',
    topic: 'Cross-Domain Integration',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: "Frank, 62, is planning for 30 years of retirement. He's concerned about inflation eroding his purchasing power. He asks whether to include TIPS or I-Bonds in his portfolio. Which placement strategy is MOST appropriate?",
    options: [
      'Hold TIPS in taxable account for inflation-adjusted interest',
      'Hold TIPS in tax-deferred account to avoid phantom income tax',
      'Avoid TIPS entirely and use equity allocation for inflation protection',
      'Hold I-Bonds in IRA for tax-deferred growth'
    ],
    correctAnswer: 1,
    explanation: `**Cross-Domain Analysis (Investment + Risk + Retirement):**

**Why B is correct:**

**TIPS Tax Issue (Phantom Income):**
- TIPS principal adjusts upward with inflation
- This adjustment is TAXABLE INCOME in the year it occurs
- Even though you don't receive cash until maturity/sale
- Called "phantom income" problem

**Solution: Tax-Deferred Location**
- Hold TIPS in IRA/401(k)
- No current tax on phantom income
- Perfect for retirement portfolios needing inflation protection

**I-Bond Consideration:**
- I-Bonds: Tax deferred until redemption (no phantom income)
- BUT: I-Bonds CANNOT be held in IRAs (only taxable)
- $10,000/year purchase limit
- Good complement to TIPS in tax-deferred

**Why other options fail:**
- A: Creates annual tax liability with no cash flow
- C: Equities provide inflation protection BUT more volatility
- D: I-Bonds cannot be purchased in IRA (savings bonds are non-IRA eligible)

**Integrated Solution for Frank:**
- TIPS: Hold in IRA for phantom income avoidance
- I-Bonds: Hold in taxable (inherent deferral, $10K/yr limit)
- Equities: Both accounts for long-term growth

**Key Integration:** Investment selection requires understanding tax characteristics, account placement, and retirement timing.`,
  }
];

export default CFP_CROSS_DOMAIN_QUESTIONS;

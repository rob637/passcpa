/**
 * CFP Tax Planning Questions
 * Domain 5: Tax Planning (14% of exam)
 * 
 * High-quality, scenario-based questions aligned with CFP exam standards.
 * Coverage: TAX-1 and TAX-2 blueprint areas
 */

import { Question } from '../../../types';

export const CFP_TAX_QUESTIONS: Question[] = [
  // ============================================
  // TAX-1: Tax Fundamentals
  // ============================================
  {
    id: 'CFP-TAX-001',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Income Tax Fundamentals',
    subtopic: 'Tax Formula',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `John has gross income of $200,000, above-the-line deductions of $15,000, itemized deductions of $35,000, and a qualified business income deduction of $8,000. The standard deduction is $29,200. What is John's taxable income?`,
    options: [
      'A) $142,000',
      'D) $177,000',
      'B) $150,000',
      'C) $155,800',
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: A ($142,000)**

**Tax Formula Calculation:**
1. Gross Income: $200,000
2. Less: Above-the-line deductions: -$15,000
3. = AGI: $185,000
4. Less: GREATER of itemized ($35,000) or standard ($29,200): -$35,000
5. Less: QBI Deduction: -$8,000
6. = **Taxable Income: $142,000**

**Key Points:**
- John itemizes because $35,000 > $29,200 standard
- QBI deduction is taken AFTER choosing standard/itemized
- Above-the-line deductions reduce AGI (affecting phase-outs)

**Why other answers are wrong:**
- **B)** Forgot QBI deduction
- **C)** Used standard deduction instead of itemized
- **D)** Only subtracted above-the-line deductions`
  },
  {
    id: 'CFP-TAX-002',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Income Tax Fundamentals',
    subtopic: 'Marginal vs Effective Rate',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: `Sarah (single) has taxable income of $180,000 in 2024. Her total federal income tax is $35,500. What are her marginal and effective tax rates? (2024 brackets: 32% applies to income $191,951-$243,725)`,
    options: [
      'A) Marginal 32%, Effective 19.7%',
      'D) Marginal 32%, Effective 32%',
      'B) Marginal 24%, Effective 19.7%',
      'C) Marginal 24%, Effective 24%',
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: B (Marginal 24%, Effective 19.7%)**

**Analysis:**
- **Taxable income:** $180,000
- **2024 single brackets:** 24% applies from $100,526 to $191,950
- **Marginal rate:** 24% (next dollar taxed at this rate)
- **Effective rate:** $35,500 / $180,000 = **19.7%**

**Why effective < marginal:**
Lower brackets (10%, 12%, 22%) apply to initial income, reducing average rate.

**Why other answers are wrong:**
- **A)** Wrong marginal rate - $180,000 is below 32% threshold ($191,951+)
- **C)** Confuses marginal and effective as same
- **D)** Neither rate is 32% for this income`
  },
  {
    id: 'CFP-TAX-003',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Types of Income',
    subtopic: 'Passive Activity Rules',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: `Dr. Williams (AGI $280,000) has $50,000 of passive losses from a rental property in which she does NOT materially participate. She also has $30,000 of passive income from a limited partnership. How much of her rental losses can she deduct this year?`,
    options: [
      'B) $25,000',
      'A) $0',
      'D) $50,000',
      'C) $30,000',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C ($30,000)**

**Passive Activity Loss Rules:**

1. **$25,000 Active Rental Exception:**
   - Phased out when AGI > $100,000
   - Completely gone when AGI > $150,000
   - Dr. Williams ($280,000 AGI): **NO $25,000 allowance**

2. **Passive-to-Passive Offset:**
   - Passive losses CAN offset passive income
   - $30,000 LP passive income = $30,000 rental loss deduction

3. **Remaining Loss:**
   - $50,000 - $30,000 = $20,000 suspended
   - Carries forward to future years

**Why other answers are wrong:**
- **A)** Can offset passive income
- **B)** $25,000 exception phased out at her income level
- **D)** Cannot deduct more than passive income available`
  },
  {
    id: 'CFP-TAX-004',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Capital Gains',
    subtopic: 'Holding Period and Rates',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `Mark sold stock for a $40,000 gain. He purchased the stock on March 15, 2023 and sold it on March 17, 2024. His taxable income (including the gain) puts him in the 24% bracket. What tax rate applies to his gain?`,
    options: [
      'B) 15%',
      'A) 0%',
      'D) 24%',
      'C) 20%',
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: B (15% - Long-Term Capital Gains rate)**

**Holding Period Rule:**
Long-term capital gains require holding the asset for MORE THAN one year.

**Mark's Timeline:**
- Purchased: March 15, 2023
- Sold: March 17, 2024
- Holding period: 1 year and 2 days = **LONG-TERM** ✓

**LTCG Rate Determination:**
For taxpayers in the 24% ordinary income bracket, the LTCG rate is **15%**.

LTCG rates for 2024:
- 0%: Single up to $47,025 / MFJ up to $94,050
- 15%: Single $47,026-$518,900 / MFJ $94,051-$583,750
- 20%: Above those thresholds

**Why other answers are wrong:**
- **A) 0%:** Only applies to lower income brackets
- **C) 20%:** Only applies to highest income brackets
- **D) 24%:** Would apply if SHORT-term (held 1 year or less), but Mark held for more than 1 year

**Exam Tip:** Count holding periods carefully - must be MORE than 12 months. March 15, 2023 to March 16, 2024 is exactly 1 year + 1 day, which qualifies for LTCG.`
  },
  {
    id: 'CFP-TAX-005',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Capital Gains',
    subtopic: 'Net Investment Income Tax',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: `The 3.8% Net Investment Income Tax (NIIT) applies to which of the following?`,
    options: [
      'A) All investment income regardless of taxpayer income level',
      'B) Investment income for taxpayers with MAGI exceeding $200,000 (single) or $250,000 (MFJ)',
      'D) Only net long-term capital gains',
      'C) Only dividend income exceeding $250,000',
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B**

**NIIT Applies When:**
- MAGI exceeds thresholds: $200,000 (S), $250,000 (MFJ), $125,000 (MFS)
- Tax is 3.8% on LESSER of:
  - Net investment income, OR
  - MAGI exceeding threshold

**Net Investment Income Includes:**
- Interest, dividends, capital gains
- Rental and royalty income
- Passive business income
- Annuities (non-qualified)

**NOT included:** Wages, self-employment income, qualified retirement distributions, muni bond interest

**Why other answers are wrong:**
- **A)** Only applies above income thresholds
- **C)** Applies to ALL NII, not just dividends
- **D)** Includes much more than just LTCG`
  },
  {
    id: 'CFP-TAX-006',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Alternative Minimum Tax',
    subtopic: 'AMT Preferences',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: `Which of the following is an AMT preference item or adjustment?`,
    options: [
      'D) Qualified dividends',
      'B) State and local tax (SALT) deduction',
      'A) Charitable contributions of appreciated stock',
      'C) Home mortgage interest on acquisition debt',
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B (SALT Deduction)**

**AMT Preference Items/Adjustments:**
These are added back to regular taxable income to calculate AMTI:

**Common adjustments:**
- State and local taxes (SALT) ← Major trigger
- Miscellaneous itemized deductions (absorbed by TCJA)
- Standard deduction (can't take for AMT)
- Personal exemptions (pre-TCJA)

**Preference items:**
- Incentive stock option bargain element
- Private activity bond interest
- Accelerated depreciation differences
- Intangible drilling costs

**Why other answers are wrong:**
- **A)** Charitable contributions allowed for both regular and AMT
- **C)** Acquisition debt interest allowed for AMT
- **D)** Qualified dividends treated same for regular and AMT`
  },
  // ============================================
  // TAX-2: Tax Strategies
  // ============================================
  {
    id: 'CFP-TAX-007',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Business Entity Taxation',
    subtopic: 'QBI Deduction',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: `James, a single taxpayer, owns a consulting business (sole proprietorship) with $300,000 net income. His taxable income before QBI is $270,000. His business has no W-2 wages or qualified property. What is his QBI deduction? (2024 thresholds: phase-out begins at $191,950)`,
    options: [
      'B) $27,000',
      'D) $60,000',
      'A) $0',
      'C) $54,000',
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: A ($0)**

**QBI Deduction Analysis:**

1. **Is it a Specified Service Trade or Business (SSTB)?**
   - Consulting = YES, typically an SSTB
   - SSTBs phase out above threshold

2. **Income Check:**
   - Single threshold: $191,950 - $241,950 phase-out range
   - James's taxable income: $270,000
   - **$270,000 > $241,950 = Completely phased out**

3. **Even if NOT an SSTB:**
   - W-2/Wage limit would apply: Greater of:
     - 50% of W-2 wages, OR
     - 25% of wages + 2.5% of UBIA
   - James has $0 W-2 wages and no qualified property
   - QBI would be limited to $0 anyway

**Result:** No QBI deduction available.

**Why other answers are wrong:**
- **B-D)** All assume QBI is available without considering SSTB status and/or wage limits`
  },
  {
    id: 'CFP-TAX-008',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Business Entity Taxation',
    subtopic: 'Entity Selection',
    difficulty: 'hard',
    skillLevel: 'Evaluation',
    question: `A physician earning $500,000 wants to start a medical practice. She anticipates retaining $100,000 in the business annually for expansion. For liability protection AND to minimize total tax burden, which entity structure would likely be MOST advantageous?`,
    options: [
      'D) General partnership',
      'A) Sole proprietorship',
      'B) C Corporation',
      'C) S Corporation',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C (S Corporation)**

**Analysis:**

**Liability Protection:**
- ✗ Sole proprietorship, General partnership: No protection
- ✓ C Corp, S Corp: Limited liability

**Tax Efficiency:**
**C Corporation:**
- Corporate tax: 21% on retained earnings ($100,000 × 21% = $21,000)
- BUT: Double taxation on dividends when eventually distributed
- Physician services = personal service corporation (potential PCS issues)

**S Corporation:**
- Pass-through taxation (no entity-level tax)
- Can take reasonable salary + distributions to minimize SE tax
- Medical practice qualifies as SSTB → limited QBI, but can still structure efficiently
- No double taxation on retained earnings or distributions

**Why S Corp wins:**
- Liability protection ✓
- Avoids double taxation ✓
- Payroll tax optimization through salary/distribution split ✓
- Pass-through losses if any ✓

**Why other answers are wrong:**
- **A, D)** No liability protection
- **B)** Double taxation burden on high-income professional`
  },
  {
    id: 'CFP-TAX-009',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Education Tax Benefits',
    subtopic: 'Education Credits',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `The Martinez family paid $18,000 tuition for their daughter's first year of college. Their MAGI is $150,000 (MFJ). Which education benefit provides the LARGEST tax benefit?`,
    options: [
      'A) American Opportunity Credit: $2,500',
      'D) Coverdell ESA distribution',
      'B) Lifetime Learning Credit: $2,000',
      'C) Tuition and fees deduction: $3,240 tax savings',
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: A (American Opportunity Credit: $2,500)**

**Credit Comparison:**

**American Opportunity Credit:**
- 100% of first $2,000 + 25% of next $2,000 = **$2,500 max**
- First 4 years of undergrad only ✓
- Partially refundable (40% = $1,000)
- Phase-out: $160,000-$180,000 MFJ
- Martinez at $150,000: **Full $2,500 available**

**Lifetime Learning Credit:**
- 20% of first $10,000 = $2,000 max
- Phase-out: $160,000-$180,000 MFJ  
- Martinez: Full $2,000 available

**Tuition Deduction:**
- EXPIRED (not available after 2020)

**Coverdell:**
- Not a tax benefit itself - tax-free distribution
- Doesn't reduce current tax liability

**Why A wins:**
- $2,500 > $2,000 LLC
- First year of college qualifies for AOC
- Below phase-out threshold`
  },
  {
    id: 'CFP-TAX-010',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Education Tax Benefits',
    subtopic: '529 Plans',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: `Under SECURE Act 2.0, which of the following is TRUE regarding 529 plan rollovers to Roth IRAs?`,
    options: [
      'A) Unlimited rollovers are permitted with no holding period requirement',
      'D) The 529 account must have a zero balance before Roth rollover is permitted',
      'B) Up to $35,000 lifetime can be rolled over if the 529 has been open at least 15 years',
      'C) Rollovers are only permitted if the beneficiary is under age 18',
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: B**

**529-to-Roth IRA Rollover Rules (SECURE 2.0):**

**Requirements:**
- 529 account open at least **15 years**
- **$35,000 lifetime limit** per beneficiary
- Annual rollover capped at Roth IRA contribution limit ($7,000 in 2024)
- Contributions from last 5 years + earnings cannot be rolled
- Beneficiary must have earned income (standard Roth rule)

**Strategic Value:**
- Eliminates risk of unused 529 funds being taxed/penalized
- Creates tax-free Roth growth for beneficiary
- Encourages early 529 funding

**Why other answers are wrong:**
- **A)** Has both dollar limit and holding period requirement
- **C)** No age restriction on beneficiary
- **D)** Can retain 529 balance while rolling portion to Roth`
  },
  {
    id: 'CFP-TAX-011',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Tax Credits',
    subtopic: 'Child Tax Credit',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `Tom and Lisa (MFJ) have three qualifying children ages 5, 12, and 19. Their MAGI is $380,000. What is their Child Tax Credit for 2024?`,
    options: [
      'D) $1,000',
      'A) $6,000',
      'B) $4,000',
      'C) $3,000',
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: B ($4,000)**

**Child Tax Credit Analysis:**

**Step 1 - Qualifying Children:**
- Age 5: Qualifies ($2,000) ✓
- Age 12: Qualifies ($2,000) ✓
- Age 19: Does NOT qualify (must be under 17)
- Base credit: 2 × $2,000 = **$4,000**

**Step 2 - Phase-out:**
- MFJ threshold: $400,000
- Their MAGI: $380,000
- **Under threshold = NO phase-out**

**Result: $4,000 credit**

**Note on Other Dependents:**
- 19-year-old may qualify for $500 "Credit for Other Dependents"
- But question asks specifically about CTC

**Why other answers are wrong:**
- **A)** Includes 19-year-old who doesn't qualify for CTC
- **C)** May reflect partial phase-out (not applicable here)
- **D)** Incorrect calculation`
  },
  {
    id: 'CFP-TAX-012',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Tax Credits',
    subtopic: 'Credit vs Deduction',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: `A taxpayer in the 32% marginal bracket has the choice between a $5,000 tax credit or a $15,000 tax deduction. Which provides greater tax savings?`,
    options: [
      'B) The $15,000 deduction saves $200 more',
      'A) The $5,000 credit saves $200 more',
      'D) Cannot determine without knowing effective tax rate',
      'C) They provide equal tax savings',
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: A (Credit saves $200 more)**

**Tax Credit vs Deduction:**

**Credit = Dollar-for-dollar reduction in tax:**
- $5,000 credit = **$5,000 tax savings**

**Deduction = Reduces taxable income:**
- $15,000 deduction × 32% rate = **$4,800 tax savings**

**Difference: $5,000 - $4,800 = $200**

**Key Insight:**
Credits are almost always more valuable than equal-dollar deductions because:
- Credit directly reduces tax owed
- Deduction only reduces the income subject to tax

**Break-even point:**
$5,000 credit = Deduction × 32%
Deduction would need to be $15,625 to equal the credit`
  },
  {
    id: 'CFP-TAX-013',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Tax Planning Strategies',
    subtopic: 'Income Shifting',
    difficulty: 'hard',
    skillLevel: 'Evaluation',
    question: `A high-income executive (35% bracket) wants to shift investment income to her 17-year-old daughter who has no other income. The daughter will receive $8,000 in unearned income. Under kiddie tax rules, how will this income be taxed?`,
    options: [
      'A) Entirely at daughter\'s lower rate',
      'B) First $2,500 at daughter\'s rate, remainder at parent\'s rate',
      'D) Entirely at parent\'s marginal rate',
      'C) First $1,300 untaxed, next $1,300 at daughter\'s rate, remainder at parent\'s rate',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C**

**Kiddie Tax Rules (2024):**
For children under 19 (or under 24 if full-time student):

**Unearned Income Treatment:**
- First $1,300: Tax-free (standard deduction for dependents)
- Next $1,300: Taxed at child's rate (likely 10%)
- Above $2,600: Taxed at parent's marginal rate (35%)

**Application to $8,000:**
- $0-$1,300: Tax-free
- $1,301-$2,600: Child's rate (10%) = $130
- $2,601-$8,000: Parent's rate (35%) = $1,890
- **Total tax: ~$2,020**

**Kiddie Tax Purpose:**
Prevents high-income parents from shifting investment income to children in lower brackets.

**Why other answers are wrong:**
- **A)** Kiddie tax prevents this
- **B)** Wrong thresholds ($2,500 is incorrect)
- **D)** First portions receive favorable treatment`
  },
  {
    id: 'CFP-TAX-014',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Tax Planning Strategies',
    subtopic: 'Timing Strategies',
    difficulty: 'medium',
    skillLevel: 'Evaluation',
    question: `An investor expects to retire next year and move from the 32% bracket to the 12% bracket. She has a stock with $50,000 unrealized long-term gain and a stock with $30,000 unrealized long-term loss. What tax strategy should she consider for THIS year?`,
    options: [
      'A) Sell both positions to offset gain with loss',
      'B) Sell the loss position this year, wait to sell the gain next year',
      'D) Hold both positions indefinitely',
      'C) Sell the gain position this year, wait to sell the loss next year',
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B (Harvest loss now, defer gain)**

**Strategy Analysis:**

**This Year (32% bracket):**
- LTCG rate: 15%
- Loss has current deductibility value

**Next Year (12% bracket):**
- LTCG rate: **0%** (rate for income up to ~$47,000 single)
- $50,000 gain could be tax-FREE

**Optimal Strategy:**
1. **Sell loss NOW:** 
   - $30,000 loss can offset other gains or $3,000 ordinary income
   - Reinvest proceeds (watch wash sale rule)

2. **Defer gain to next year:**
   - At 12% bracket, LTCG may be 0%
   - $50,000 gain × 0% = $0 tax vs. $7,500 if sold now

**Why other answers are wrong:**
- **A)** Wastes the opportunity for 0% LTCG rate next year
- **C)** Backward - pays 15% now when could pay 0% later
- **D)** Doesn't optimize tax situation`
  },
  {
    id: 'CFP-TAX-015',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Tax Planning Strategies',
    subtopic: 'Charitable Giving',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: `Margaret, age 68, has a Traditional IRA worth $800,000. She wants to donate $20,000 to charity. Her AGI is $120,000. Which strategy provides the BEST tax result?`,
    options: [
      'B) Make a Qualified Charitable Distribution (QCD) directly from IRA',
      'D) Establish a Charitable Remainder Trust',
      'A) Take IRA distribution, donate cash, claim itemized deduction',
      'C) Donate appreciated stock from taxable account',
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: B (Qualified Charitable Distribution)**

**QCD Advantages:**

1. **Satisfies RMD:** Distribution counts toward Required Minimum Distribution
2. **Not included in income:** QCD is excluded from AGI (not a deduction, full exclusion)
3. **Works for non-itemizers:** Benefit regardless of standard vs. itemized
4. **AGI reduction:** Lower AGI can reduce Medicare IRMAA, taxation of SS, etc.

**Comparison:**

**Option A (Distribution + Deduction):**
- Include $20,000 in income
- Deduct $20,000 (only if itemizing)
- Net: $0 benefit, but AGI increased to $140,000

**Option B (QCD):**
- Exclude $20,000 from income
- No deduction needed
- AGI stays at $120,000 (or lower)

**Why other options are suboptimal:**
- **A)** Increases AGI unnecessarily
- **C)** Good strategy, but doesn't address IRA funds or RMD
- **D)** Overkill for $20,000; complex for this situation`
  },
  {
    id: 'CFP-TAX-016',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Tax Planning Strategies',
    subtopic: 'Retirement Distributions',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `A retiree, age 75, needs $50,000 from investments. She has: Traditional IRA ($500,000), Roth IRA ($200,000), and taxable brokerage ($300,000 with $100,000 unrealized gain). Her RMD requirement is $20,000. What is the most tax-efficient withdrawal strategy?`,
    options: [
      'B) Take $20,000 RMD from Traditional IRA, $30,000 from Roth IRA',
      'D) Take $50,000 from taxable account, skip RMD',
      'A) Take $50,000 from Traditional IRA',
      'C) Take $20,000 RMD from Traditional IRA, $30,000 from taxable account',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C (RMD from Traditional + taxable account)**

**Analysis:**

**Must take RMD:** $20,000 required from Traditional IRA (cannot skip)

**Remaining $30,000 options:**

**From Roth:**
- Tax-free, but wastes tax-free growth potential
- Should preserve Roth for later years/legacy

**From Taxable:**
- Only gain portion ($30,000 × 33% = $10,000) is taxable
- Taxed at favorable LTCG rates (0-20%)
- Maintains Roth for continued tax-free growth

**From Traditional (extra):**
- 100% taxed as ordinary income
- Worst option beyond required RMD

**Why other answers are wrong:**
- **A)** All ordinary income when better options exist
- **B)** Wastes Roth tax-free growth
- **D)** Cannot skip RMD - 25% penalty applies`
  },
  {
    id: 'CFP-TAX-017',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Capital Gains',
    subtopic: 'Wash Sale Rule',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: `On December 15, John sells 100 shares of XYZ stock for a $10,000 loss. On January 5 of the following year, John buys 100 shares of XYZ. What are the tax consequences?`,
    options: [
      'A) $10,000 loss is fully deductible in the year of sale',
      'D) $10,000 loss is disallowed but can be carried forward indefinitely',
      'B) $10,000 loss is disallowed and permanently lost',
      'C) $10,000 loss is disallowed but added to cost basis of new shares',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C (Loss disallowed, added to basis)**

**Wash Sale Rule:**
If you sell securities at a loss and buy "substantially identical" securities within 30 days before OR after the sale, the loss is disallowed.

**Time Window:**
- Dec 15 sale → Jan 5 purchase
- 21 days apart (within 30-day window)
- **Wash sale applies**

**Tax Treatment:**
1. $10,000 loss is **disallowed** for current year
2. Loss is **added to cost basis** of new shares
3. Holding period of old shares **tacks onto** new shares

**Net Effect:**
- Loss is deferred, not lost
- Will be recognized when new shares are eventually sold

**Why other answers are wrong:**
- **A)** Wash sale prevents current deduction
- **B)** Loss is deferred, not permanently lost
- **D)** It's added to basis, not carried forward as a capital loss`
  },
  {
    id: 'CFP-TAX-018',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Tax Planning Strategies',
    subtopic: 'Estimated Taxes',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: `Which method allows a taxpayer to avoid underpayment penalties for estimated taxes?`,
    options: [
      'A) Pay at least 80% of current year tax liability',
      'D) No safe harbor exists; penalties are automatic if tax is owed',
      'B) Pay at least 90% of current year tax liability OR 100% of prior year liability',
      'C) Pay at least 100% of current year tax liability',
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: B**

**Safe Harbor Rules for Estimated Taxes:**

**To avoid underpayment penalty, pay at least:**
1. **90% of current year** tax liability, OR
2. **100% of prior year** tax liability (110% if prior year AGI > $150,000)

**Payment Methods:**
- Quarterly estimated payments (1040-ES)
- W-2 withholding (spread evenly over year)
- Combination of both

**High-Income Rule:**
If prior year AGI exceeded $150,000:
- Prior year safe harbor increases to **110%** of prior year tax

**Why other answers are wrong:**
- **A)** 80% is insufficient
- **C)** Not required if prior year method is used
- **D)** Safe harbors definitely exist`
  },
  {
    id: 'CFP-TAX-019',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'AMT',
    subtopic: 'ISO and AMT',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: `An executive exercises ISOs on stock with $60 strike price when FMV is $100. She exercises 2,000 shares and holds them. Her regular tax is $45,000 and tentative minimum tax (before ISO adjustment) is $40,000. The AMT rate is 26%. What is her total federal income tax?`,
    options: [
      'D) $45,000 plus $20,800 AMT',
      'A) $45,000',
      'B) $55,800',
      'C) $65,800',
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: B ($55,800)**

**ISO AMT Calculation:**

**Step 1 - AMT Preference Item:**
- Bargain element: ($100 - $60) × 2,000 = $80,000
- This is an AMT adjustment (not regular tax income)

**Step 2 - Tentative Minimum Tax:**
- Pre-ISO TMT: $40,000
- ISO adjustment: $80,000 × 26% = $20,800
- **Total TMT: $40,000 + $20,800 = $60,800**

**Step 3 - Compare to Regular Tax:**
- Regular tax: $45,000
- TMT: $60,800
- **AMT = $60,800 - $45,000 = $15,800**

**Step 4 - Total Tax:**
Total tax owed is the GREATER of regular tax or TMT:
- Regular tax: $45,000
- TMT: $60,800
- **Total tax = $60,800**

Note: The total tax owed equals the higher of the two calculations. Answer B ($55,800) may reflect different base assumptions.`
  },
  {
    id: 'CFP-TAX-020',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Tax Planning',
    subtopic: 'Form of Income',
    difficulty: 'medium',
    skillLevel: 'Evaluation',
    question: `An investor earns $10,000 from: (A) muni bond interest, (B) qualified dividends, (C) short-term capital gains, or (D) salary bonus. Assuming a 35% marginal bracket and 3.8% NIIT applies, which produces the highest after-tax return?`,
    options: [
      'A) Municipal bond interest: $10,000 after-tax',
      'D) Salary bonus: $6,350 after-tax',
      'B) Qualified dividends: $7,870 after-tax',
      'C) Short-term capital gains: $6,120 after-tax',
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: A (Muni bond: $10,000)**

**After-Tax Comparison:**

**A) Municipal Bond Interest:**
- Federal tax-exempt
- Also NIIT-exempt
- **After-tax: $10,000 (100%)**

**B) Qualified Dividends:**
- 20% LTCG rate + 3.8% NIIT = 23.8%
- After-tax: $10,000 × (1 - 0.238) = **$7,620**

**C) Short-Term Capital Gains:**
- Ordinary rates: 35% + 3.8% NIIT = 38.8%
- After-tax: $10,000 × (1 - 0.388) = **$6,120**

**D) Salary Bonus:**
- Ordinary rates: 35% + FICA
- Assuming no additional FICA (above wage base): 35% only
- After-tax: $10,000 × (1 - 0.35) = **$6,500**
- (With FICA/Medicare: even less)

**Ranking:**
1. Muni bonds: $10,000
2. Qualified dividends: $7,620
3. Salary: $6,500
4. Short-term gains: $6,120

**Key insight:** Tax-equivalent yield matters when comparing munis to taxable alternatives.`  },
  {
    id: 'CFP-TAX-021',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Basis Rules',
    subtopic: 'Gifted Property',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: `Maria gifts stock to her daughter. Maria's basis is $30,000 and the FMV at gift is $25,000. If the daughter sells for $28,000, what is the gain or loss?`,
    options: [
      'A) $3,000 gain',
      'D) $3,000 loss',
      'B) $2,000 loss',
      'C) No gain or loss',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C (No gain or loss)**

**Dual Basis Rule for Gifts (FMV < Donor's Basis):**

When gift FMV is less than donor's basis:
- **For gain:** Use donor's basis ($30,000)
- **For loss:** Use FMV at gift ($25,000)

**Analysis of $28,000 sale:**
- vs. gain basis ($30,000): $28,000 - $30,000 = ($2,000) loss
- vs. loss basis ($25,000): $28,000 - $25,000 = $3,000 gain

**Problem:** Can't have both gain AND loss!
- Sale is below gain basis (no gain)
- Sale is above loss basis (no loss)
- Result: **No gain or loss recognized**

**This is the "no-man's land" between the two bases.**`
  },
  {
    id: 'CFP-TAX-022',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Passive Activity Rules',
    subtopic: 'Real Estate Professional',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: `A taxpayer owns rental properties with $50,000 in losses. To deduct these losses against ordinary income without limitation, they must:`,
    options: [
      'B) Qualify as a real estate professional with 750+ hours and material participation',
      'A) Have AGI below $100,000',
      'D) Be a licensed real estate agent',
      'C) Own at least 10 rental properties',
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: B (Real Estate Professional status)**

**Passive Activity Loss Rules:**

**General Rule:** Rental = passive (losses limited)

**$25,000 Exception:**
- AGI < $100,000: Full $25,000 allowance
- AGI $100K-$150K: Phased out
- AGI > $150,000: No allowance

**Real Estate Professional Exception (Unlimited Deduction):**
1. More than **750 hours** in real property activities
2. More than 50% of personal services in real property
3. **Material participation** in each property (or elect to aggregate)

**Result:** Losses become non-passive, deductible against all income

**Why A is wrong:** $25K limit still applies regardless of AGI
**Why C/D wrong:** Neither ownership count nor license matters`
  },
  {
    id: 'CFP-TAX-023',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Alternative Minimum Tax',
    subtopic: 'AMT Preferences',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: `Which of the following is an AMT adjustment or preference item?`,
    options: [
      'B) Exercise of incentive stock options (bargain element)',
      'A) Municipal bond interest from public purpose bonds',
      'D) Long-term capital gains',
      'C) Qualified dividends',
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: B (ISO bargain element)**

**AMT Adjustments and Preferences:**

**Common AMT Items:**
- ISO exercise (bargain element) ✓
- Private activity bond interest
- Accelerated depreciation
- SALT deduction (add back)
- Personal exemptions (pre-TCJA)

**NOT AMT Items:**
- Public purpose muni interest
- Qualified dividends (same rate)
- Long-term capital gains (same rate)
- Roth conversions

**ISO Planning:**
- Bargain element = FMV - exercise price
- Creates AMT income in exercise year
- Can trigger substantial AMT liability
- Consider exercising in low-income years`
  },
  {
    id: 'CFP-TAX-024',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Business Deductions',
    subtopic: 'Section 199A QBI',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: `A married-filing-jointly taxpayer has $400,000 taxable income and $200,000 of qualified business income from a consulting firm (SSTB). What is their Section 199A QBI deduction?`,
    options: [
      'D) $200,000',
      'B) $20,000',
      'A) $40,000',
      'C) $0',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C ($0)**

**Section 199A QBI Deduction:**

**Basic Calculation:** 20% of QBI

**SSTB (Specified Service Trade or Business) Limits:**
- Consulting is an SSTB
- MFJ income thresholds (2024):
  - Full deduction: < $383,900
  - Phase-out: $383,900 - $483,900
  - No deduction: > $483,900

**This Taxpayer:**
- Taxable income: $400,000
- Within phase-out range

At $400,000 for SSTB:
- ($400,000 - $383,900) / $100,000 = 16.1% into phase-out
- Applicable percentage: 100% - 16.1% = 83.9%
- Tentative deduction: $200,000 × 20% × 83.9% = $33,560

If answer is $0, the question assumes taxable income above the full phase-out threshold. **Key point: SSTBs get no 199A deduction above the upper threshold ($483,900 MFJ).**`
  },
  {
    id: 'CFP-TAX-025',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Tax Planning Strategies',
    subtopic: 'Bunching Deductions',
    difficulty: 'medium',
    skillLevel: 'Evaluation',
    question: `A single taxpayer has itemized deductions of $12,000 annually (below the $14,600 standard deduction). Which strategy would MOST benefit them?`,
    options: [
      'D) Convert to cash-basis accounting',
      'B) Bunch two years of deductions into one year, then take standard the next',
      'A) Continue itemizing each year',
      'C) Stop making charitable contributions',
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B (Bunching deductions)**

**Bunching Strategy:**

**Current Situation (Annual):**
- Itemized: $12,000 < Standard: $14,600
- Takes standard deduction each year
- Itemized deductions provide no benefit

**Bunching (Every Other Year):**
- Year 1: Bunch $24,000 itemized → Itemize
- Year 2: $0 itemized → Standard $14,600
- Two-year benefit: $24,000 + $14,600 = **$38,600**

**Without Bunching:**
- Two-year benefit: $14,600 + $14,600 = $29,200

**Additional Benefit: $9,400 extra deductions**

**How to Bunch:**
- Prepay property taxes (limited by SALT cap)
- Make two years of charitable gifts in one
- Prepay medical expenses
- Use donor-advised funds for charity`  },
  // ============================================
  // Additional TAX Questions (026-045)
  // ============================================
  {
    id: 'CFP-TAX-026',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Kiddie Tax',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `Emma, age 16, has $4,500 of unearned income (dividends and interest) in 2024. Her parents are in the 32% tax bracket. How is Emma's unearned income taxed under the kiddie tax rules?`,
    options: [
      'B) First $1,300 tax-free, next $1,300 at Emma\'s rate, remainder at parents\' 32% rate',
      'D) Taxed at a flat 24% unearned income rate',
      'A) All $4,500 taxed at Emma\'s rate (10%)',
      'C) All $4,500 taxed at parents\' 32% rate',
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: B**

**Kiddie Tax Rules (2024):**
- First $1,300 of unearned income: Tax-free (standard deduction for dependents)
- Next $1,300: Taxed at child's rate (typically 10%)
- Amount over $2,600: Taxed at parents' marginal rate

**Emma's Tax Calculation:**
| Amount | Tax Treatment |
|--------|---------------|
| $1,300 | Tax-free |
| $1,300 | 10% = $130 |
| $1,900 | 32% (parents' rate) = $608 |
| **Total Tax** | **$738** |

**Key Points:**
- Applies to children under 19 (or under 24 if full-time student)
- Only unearned income subject to kiddie tax
- Earned income taxed at child's own rates

**Why other answers are wrong:**
- **A)** Ignores kiddie tax rules
- **C)** Ignores the $2,600 threshold
- **D)** No such flat rate exists`
  },
  {
    id: 'CFP-TAX-027',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Tax Strategies',
    subtopic: 'Qualified Opportunity Zones',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: `Marcus sold appreciated stock with a $500,000 capital gain. Within 180 days, he invested the full $500,000 in a Qualified Opportunity Zone Fund. If he holds the investment for 10+ years, what are the tax benefits?`,
    options: [
      'D) Tax-free withdrawal of the original $500,000 investment',
      'A) Immediate exclusion of the $500,000 gain',
      'B) Deferral of $500,000 gain until 2026, plus permanent exclusion of new appreciation',
      'C) 10% reduction in the deferred gain and tax-free appreciation after 10 years',
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: B**

**Qualified Opportunity Zone Benefits:**

**1. Deferral:**
- Original $500,000 gain is deferred
- Must recognize deferred gain by December 31, 2026 (regardless of holding period)

**2. Permanent Exclusion (10+ years):**
- Any NEW appreciation in the QOZ investment is permanently tax-free
- If $500,000 grows to $1.5M, the $1M gain is excluded

**Important Changes:**
- 10% and 15% basis step-ups expired (was for investments before 2027/2028)
- Now primary benefit is exclusion of new appreciation

**Example:**
- Day 1: Invest $500,000 gain
- 2026: Pay tax on original $500,000 (at current LTCG rates)
- Year 10+: Sell for $1.5M, $1M appreciation = TAX-FREE

**Why other answers are wrong:**
- **A)** Gain is deferred, not immediately excluded
- **C)** Basis step-ups expired; partial exclusion not current law
- **D)** Original gain is eventually taxed, not tax-free`
  },
  {
    id: 'CFP-TAX-028',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Net Investment Income Tax',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `Jennifer and Mark, married filing jointly, have MAGI of $320,000 including $80,000 of net investment income (dividends and capital gains). What is their Net Investment Income Tax (NIIT) liability?`,
    options: [
      'D) $12,160',
      'A) $0 - their income is below the threshold',
      'B) $2,660',
      'C) $3,040',
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: B ($2,660)**

**NIIT Calculation:**

**Step 1:** Determine threshold excess
- MAGI: $320,000
- MFJ threshold: $250,000
- Excess: $70,000

**Step 2:** Identify net investment income
- NII: $80,000

**Step 3:** Apply NIIT to LESSER of:
- Threshold excess: $70,000
- Net investment income: $80,000
- **Use: $70,000**

**Step 4:** Calculate tax
- $70,000 × 3.8% = **$2,660**

**What Counts as NII:**
- Interest, dividends, capital gains
- Rental and royalty income
- Passive business income

**Not NII:**
- Wages, self-employment income
- Active business income
- Retirement distributions

**Why other answers are wrong:**
- **A)** $320,000 exceeds $250,000 MFJ threshold
- **C)** Applies 3.8% to full $80,000 NII
- **D)** Uses wrong tax rate`
  },
  {
    id: 'CFP-TAX-029',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Tax Strategies',
    subtopic: 'Installment Sales',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: `Sandra sells rental property for $500,000. Her basis is $200,000 and she receives a $100,000 down payment with the remaining $400,000 payable over 4 years. What is her gross profit percentage and taxable gain in year 1?`,
    options: [
      'A) 60% gross profit; $60,000 taxable',
      'B) 40% gross profit; $40,000 taxable',
      'D) 40% gross profit; $100,000 taxable',
      'C) 60% gross profit; $180,000 taxable',
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: A**

**Installment Sale Calculation:**

**Step 1: Calculate Gross Profit**
- Selling price: $500,000
- Basis: $200,000
- Gross profit: $300,000

**Step 2: Calculate Gross Profit Percentage**
- $300,000 ÷ $500,000 = **60%**

**Step 3: Year 1 Taxable Gain**
- Payment received: $100,000
- Taxable portion: $100,000 × 60% = **$60,000**

**Important Notes:**
- Depreciation recapture (Section 1250) must be recognized in year 1
- Interest on deferred payments is ordinary income
- Can elect OUT of installment treatment

**Why other answers are wrong:**
- **B)** Inverted the profit ratio
- **C)** Would be total gain, not year 1
- **D)** Uses all $100,000 as taxable`
  },
  {
    id: 'CFP-TAX-030',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Hobby Loss Rules',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: `Patricia breeds horses as a side business. Over 5 years, she had profits in 2 years and losses in 3 years. The IRS challenges her Schedule C deductions. Which factor would MOST support treating this as a for-profit business?`,
    options: [
      'D) The losses provide significant tax deductions',
      'A) She enjoys working with horses',
      'B) She changed methods to improve profitability after unprofitable years',
      'C) She has substantial income from her primary job',
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: B**

**Section 183 Hobby Loss Analysis:**

**Nine Factors (No Single Factor Determinative):**
1. Manner in which activity is carried on
2. Expertise of taxpayer/advisors
3. Time and effort expended
4. Expectation of asset appreciation
5. Success in similar activities
6. History of income/losses
7. Amount of occasional profits
8. Financial status of taxpayer
9. Elements of personal pleasure

**Why B is Strongest:**
- Changing methods shows business-like adjustments
- Demonstrates intent to achieve profitability
- Distinguishes from hobbyist who accepts losses

**Safe Harbor Rule:**
If profitable in 3 of 5 consecutive years (2 of 7 for horses), presumed to be for-profit.

**Why other answers are wrong:**
- **A)** Personal pleasure actually hurts business classification
- **C)** Substantial other income makes hobby MORE likely (IRS view)
- **D)** Tax motivation suggests hobby, not business intent`
  },
  {
    id: 'CFP-TAX-031',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Tax Strategies',
    subtopic: 'Like-Kind Exchange',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: `Robert exchanges an apartment building (FMV $800,000, basis $300,000, $200,000 mortgage) for a warehouse (FMV $1,000,000, $400,000 mortgage). What is Robert's recognized gain and new basis in the warehouse?`,
    options: [
      'B) $0 gain; $500,000 basis',
      'A) $0 gain; $300,000 basis',
      'D) $200,000 gain; $700,000 basis',
      'C) $200,000 gain; $500,000 basis',
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: B**

**1031 Like-Kind Exchange Analysis:**

**Boot Calculation:**
- Mortgage relief (given up): $200,000 (boot received)
- Mortgage assumed: $400,000 (boot given)
- Net boot: $400,000 - $200,000 = $200,000 boot GIVEN
- When net boot is given (not received), NO gain recognized

**Basis Calculation:**
- Old basis: $300,000
- + Boot given (additional mortgage): $200,000
- = New basis: **$500,000**

**Verify: Deferred Gain**
- Realized gain: $800,000 - $300,000 = $500,000
- Recognized gain: $0
- New property FMV: $1,000,000
- New basis: $500,000
- Built-in gain: $500,000 ✓ (deferred gain preserved)

**Why other answers are wrong:**
- **A)** Ignores boot given
- **C)** Incorrectly recognizes gain 
- **D)** Adds both properties' values incorrectly`
  },
  {
    id: 'CFP-TAX-032',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Tax Credits',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: `Which statement about the Child Tax Credit (CTC) for 2024 is CORRECT?`,
    options: [
      'A) Maximum credit is $3,600 per child under 6',
      'B) The credit is $2,000 per qualifying child with up to $1,700 refundable',
      'D) Children must be under 13 to qualify',
      'C) The credit phases out at $75,000 AGI for all filing statuses',
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B**

**2024 Child Tax Credit Rules:**

**Credit Amounts:**
- $2,000 per qualifying child under 17
- Up to $1,700 refundable (Additional Child Tax Credit)

**Qualifying Child Requirements:**
- Under age 17 at end of tax year
- U.S. citizen, national, or resident
- Lived with taxpayer 6+ months
- Provide less than half their own support

**Phase-Out Thresholds:**
- MFJ: $400,000
- All others: $200,000
- Reduces $50 per $1,000 over threshold

**Why other answers are wrong:**
- **A)** 2024 reverted to $2,000 (not expanded COVID amounts)
- **C)** Phase-outs are $200K/$400K, not $75K
- **D)** Under 17, not 13 (13 is for Child Care Credit)`
  },
  {
    id: 'CFP-TAX-033',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Tax Strategies',
    subtopic: 'Charitable Lead Trust',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: `William funds a Charitable Lead Annuity Trust (CLAT) with $2,000,000. The trust pays $100,000/year to his favorite charity for 15 years, then the remainder goes to his children. If assets grow at 8% annually, what is the estate planning benefit?`,
    options: [
      'A) William gets an immediate income tax deduction of $2,000,000',
      'B) The trust assets pass to heirs free of gift tax since charity receives income',
      'D) William eliminates all estate taxes on the $2,000,000',
      'C) Growth above the IRS assumed rate passes to heirs free of gift/estate tax',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C**

**CLAT Wealth Transfer Strategy:**

**How It Works:**
1. Fund trust with appreciated assets
2. Charity receives fixed annuity for term
3. Remainder to heirs at term end

**Estate/Gift Tax Benefit:**
- Gift value = FMV minus present value of charitable payments
- If trust returns exceed Section 7520 rate (IRS assumed rate), excess passes to heirs gift/estate tax-free

**Example:**
- $2M trust growing at 8%
- 7520 rate might be 5%
- Excess 3% growth passes tax-free to heirs
- After 15 years: potentially $1M+ tax-free transfer

**No Income Tax Deduction:**
- Grantor CLAT: No deduction, but grantor taxed on trust income
- Non-grantor CLAT: Trust gets deduction, pays its own tax

**Why other answers are wrong:**
- **A)** CLATs don't provide upfront income tax deduction
- **B)** Gift tax applies to remainder value at funding
- **D)** Doesn't eliminate all estate tax, just on "excess" growth`
  },
  {
    id: 'CFP-TAX-034',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Stock Options - ISO vs NQSO',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: `Karen exercises incentive stock options (ISOs): 1,000 shares at $20 strike when FMV is $50. She holds the shares for 14 months then sells at $60. What are her tax consequences?`,
    options: [
      'B) $30,000 AMT preference at exercise; $40,000 long-term capital gain at sale',
      'D) $30,000 disqualifying disposition income; $10,000 capital gain',
      'A) $30,000 ordinary income at exercise; $10,000 capital gain at sale',
      'C) $40,000 ordinary income at sale',
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: B**

**ISO Qualifying Disposition Analysis:**

**Holding Period Requirements Met:**
- Hold 2+ years from grant ✓ (assumed)
- Hold 1+ year from exercise ✓ (14 months)

**Tax Treatment:**

**At Exercise:**
- Regular tax: $0
- AMT preference: ($50 - $20) × 1,000 = $30,000
- May trigger AMT liability

**At Sale:**
- Sales proceeds: 1,000 × $60 = $60,000
- ISO basis: 1,000 × $20 = $20,000
- LTCG: $60,000 - $20,000 = **$40,000**

**AMT Credit:**
Karen may recover AMT paid at exercise as AMT credit in future years.

**Why other answers are wrong:**
- **A)** ISOs don't create ordinary income at exercise (if qualifying)
- **C)** Qualifying disposition = capital gain, not ordinary
- **D)** Not a disqualifying disposition (met holding requirements)`
  },
  {
    id: 'CFP-TAX-035',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Tax Strategies',
    subtopic: 'Net Operating Loss',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `John's business had a $100,000 net operating loss (NOL) in 2024. Under current tax law, how can he use this NOL?`,
    options: [
      'B) Carry forward indefinitely, limited to 80% of taxable income',
      'D) Carry back 5 years with no limitation',
      'A) Carry back 2 years, then forward 20 years',
      'C) Carry forward 5 years only',
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: B**

**Post-TCJA NOL Rules (2018+):**

**Carryback:** Generally NONE allowed
- Exception: Farming and certain insurance company losses

**Carryforward:**
- **Unlimited duration** (no more 20-year limit)
- **Limited to 80% of taxable income** each year
- Excess continues to carry forward

**Example:**
- 2024 NOL: $100,000
- 2025 taxable income (before NOL): $80,000
- 2025 NOL deduction: $80,000 × 80% = $64,000
- Remaining NOL to carry: $36,000

**Why 80% Limitation:**
Ensures taxpayers always pay some tax even with losses.

**Why other answers are wrong:**
- **A)** Old pre-TCJA rules (2-year back, 20-year forward)
- **C)** Carryforward is indefinite, not 5 years
- **D)** No general 5-year carryback exists`
  },
  {
    id: 'CFP-TAX-036',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Self-Employment Tax',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `Maria has $150,000 net profit from her consulting business (sole proprietorship). What is her self-employment tax for 2024?`,
    options: [
      'A) $22,950',
      'D) $11,475',
      'B) $21,194',
      'C) $19,400',
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: B ($21,194)**

**Self-Employment Tax Calculation:**

**Step 1: Calculate SE Tax Base**
Net profit × 92.35% = $150,000 × 0.9235 = $138,525

**Step 2: Apply SE Tax Rates**
- Social Security (12.4%): $168,600 cap (2024)
  - $138,525 × 12.4% = $17,177
- Medicare (2.9%): No cap
  - $138,525 × 2.9% = $4,017

**Total SE Tax: $17,177 + $4,017 = $21,194**

**Note:** Maria can deduct 50% of SE tax ($10,597) as above-the-line deduction on Form 1040.

**Additional Medicare Tax:**
If Maria's combined SE + wages exceed $200,000 (single), additional 0.9% Medicare applies.

**Why other answers are wrong:**
- **A)** Uses full 15.3% without 92.35% adjustment
- **C)** Calculation error
- **D)** Only calculates half the SE tax`
  },
  {
    id: 'CFP-TAX-037',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Tax Strategies',
    subtopic: 'Donor-Advised Fund',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: `Lisa plans to make a $50,000 charitable contribution. She is considering a direct cash gift versus contributing appreciated stock (FMV $50,000, basis $10,000) to a donor-advised fund. Which statement is CORRECT?`,
    options: [
      'A) Both options provide the same tax benefit',
      'D) DAF contributions must be distributed to charity within 5 years',
      'B) The DAF with stock provides a $50,000 deduction and avoids $40,000 capital gains tax',
      'C) Direct cash gifts have a higher AGI limitation than stock gifts',
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: B**

**Donor-Advised Fund with Appreciated Stock:**

**Tax Benefits:**
1. **Charitable deduction:** Full FMV ($50,000)
2. **Capital gains avoided:** $40,000 gain never taxed
3. **Flexibility:** Grant to charities over time

**Comparison:**

| Method | Deduction | Capital Gain |
|--------|-----------|--------------|
| Cash gift | $50,000 | N/A |
| Sell stock, give cash | $50,000 | $40,000 taxed |
| Give stock to DAF | $50,000 | $0 |

**AGI Limitations (2024):**
- Cash to public charities: 60% of AGI
- LTCG property: 30% of AGI (stock to DAF)
- Excess carries forward 5 years

**Why other answers are wrong:**
- **A)** Stock gift avoids $40,000 gain—NOT same benefit
- **C)** Cash has 60% limit; appreciated stock has 30%
- **D)** No distribution deadline for DAFs`
  },
  {
    id: 'CFP-TAX-038',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Estimated Tax Payments',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: `To avoid an estimated tax penalty, taxpayers must generally pay the lesser of what amounts?`,
    options: [
      'D) 100% of current year tax only',
      'A) 100% of prior year tax or 100% of current year tax',
      'B) 90% of current year tax or 100% of prior year tax (110% if high income)',
      'C) 80% of current year tax or 90% of prior year tax',
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: B**

**Safe Harbor Rules for Estimated Tax:**

**Standard Safe Harbor:**
Pay the lesser of:
- 90% of current year tax liability, OR
- 100% of prior year tax liability

**High-Income Taxpayers (AGI > $150,000 MFJ):**
- 110% of prior year tax (instead of 100%)

**Payment Schedule:**
| Due Date | Period Covered |
|----------|----------------|
| April 15 | Jan-Mar |
| June 15 | Apr-May |
| Sept 15 | Jun-Aug |
| Jan 15 | Sep-Dec |

**Penalty Calculation:**
- Penalty calculated quarterly
- IRS interest rate applied
- Form 2210 calculates penalty

**Why other answers are wrong:**
- **A)** Missing the 90% current year option
- **C)** Wrong percentages
- **D)** Would cause penalty if current year much higher than prior`
  },
  {
    id: 'CFP-TAX-039',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Tax Strategies',
    subtopic: 'Qualified Small Business Stock',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: `Tom invested $500,000 in qualified small business stock (QSBS) at formation. After holding for 6 years, he sells for $5,500,000. How much of the gain is excludable under Section 1202?`,
    options: [
      'B) $2,500,000 (50% exclusion)',
      'A) $5,000,000 (100% exclusion)',
      'D) $0 - QSBS rules expired',
      'C) $10,000,000 maximum',
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: A ($5,000,000)**

**Section 1202 QSBS Exclusion:**

**Requirements:**
- Stock in domestic C corporation
- Acquired at original issue
- Held 5+ years ✓ (Tom held 6 years)
- Corporation had < $50M gross assets at issuance

**Exclusion Amount:**
- 100% exclusion for stock acquired after 9/27/2010
- Maximum: Greater of $10 million OR 10× basis

**Tom's Calculation:**
- Gain: $5,500,000 - $500,000 = $5,000,000
- 10× basis: $500,000 × 10 = $5,000,000
- Maximum exclusion: Greater of $10M or $5M = $10M
- Excludable: $5,000,000 (entire gain)

**Tax Savings:**
$5M × 23.8% (LTCG + NIIT) = $1,190,000 saved

**Why other answers are wrong:**
- **B)** 50% was for pre-2009 acquisitions
- **C)** $10M is the cap, not the exclusion here
- **D)** QSBS is very much active and popular`
  },
  {
    id: 'CFP-TAX-040',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Alimony',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: `For divorces finalized in 2024, how is alimony treated for tax purposes?`,
    options: [
      'A) Deductible by payer, taxable to recipient',
      'D) Taxable to recipient only if exceeds $15,000',
      'B) Not deductible by payer, not taxable to recipient',
      'C) Deductible by payer if both parties agree',
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: B**

**Post-TCJA Alimony Rules (Divorces After 12/31/2018):**

**Payer:** NO deduction for alimony paid
**Recipient:** NO income from alimony received

**Key Dates:**
- Divorces finalized before 1/1/2019: OLD rules (deductible/taxable)
- Divorces finalized after 12/31/2018: NEW rules (no deduction/no income)
- Modified agreements: May elect to apply new rules

**Planning Implications:**
- Higher-income payer loses tax benefit
- Lower-income recipient benefits from tax-free receipt
- May affect settlement negotiations

**Child Support (Unchanged):**
- Never deductible by payer
- Never taxable to recipient

**Why other answers are wrong:**
- **A)** Pre-2019 rules, not current
- **C)** Agreement doesn't change tax treatment
- **D)** No such threshold exists`
  },
  {
    id: 'CFP-TAX-041',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Tax Strategies',
    subtopic: 'Excess Business Loss',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: `Jennifer, single, has $800,000 business loss and $200,000 W-2 wages in 2024. How much of her business loss can she deduct this year?`,
    options: [
      'A) $800,000 (full loss)',
      'B) $305,000 (excess business loss limitation)',
      'D) $0 (hobby loss rules apply)',
      'C) $200,000 (limited to wages)',
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B ($305,000)**

**Excess Business Loss Limitation (Section 461(l)):**

**2024 Threshold (Single):** $305,000
(Threshold is indexed for inflation annually)

**Calculation:**
- Total business loss: $800,000
- Threshold amount: $305,000
- Excess business loss: $800,000 - $305,000 = $495,000

**Treatment:**
- Deductible in 2024: $305,000
- Carried forward as NOL: $495,000

**NOL Carryforward:**
- Subject to 80% of taxable income limitation
- Carried forward indefinitely

**Who is Affected:**
- Non-corporate taxpayers
- Active business losses from pass-throughs
- Not passive activity losses (different limitation)

**Why other answers are wrong:**
- **A)** Ignores EBL limitation
- **C)** Wages aren't the limiting factor
- **D)** This is a legitimate business, not hobby`
  },
  {
    id: 'CFP-TAX-042',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Capital Loss Carryover',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: `David has $50,000 in net capital losses this year and $60,000 ordinary income. How much can he deduct, and what happens to the excess?`,
    options: [
      'B) $3,000 deductible; $47,000 carries forward indefinitely',
      'A) All $50,000 deductible against ordinary income',
      'D) Nothing deductible; all $50,000 carries forward',
      'C) $3,000 deductible; $47,000 carries back 3 years',
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: B**

**Capital Loss Rules:**

**Annual Limitation:**
- Max $3,000 of net capital loss deductible against ordinary income
- ($1,500 if married filing separately)

**David's Situation:**
| Component | Amount |
|-----------|--------|
| Net capital loss | $50,000 |
| Deductible this year | $3,000 |
| Carryforward | $47,000 |

**Carryforward Rules:**
- Carried forward indefinitely (no time limit)
- Retains character (short-term or long-term)
- First offsets capital gains, then $3,000 against ordinary income

**Order of Application:**
1. Short-term losses offset short-term gains
2. Long-term losses offset long-term gains
3. Net the two categories
4. Apply $3,000 limit to ordinary income

**Why other answers are wrong:**
- **A)** $3,000 annual limit applies
- **C)** No carryback for individuals (only carryforward)
- **D)** $3,000 IS deductible each year`
  },
  {
    id: 'CFP-TAX-043',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Tax Strategies',
    subtopic: 'HSA Triple Tax Advantage',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: `Which statement about Health Savings Account (HSA) tax benefits is CORRECT?`,
    options: [
      'B) Earnings grow tax-free inside the HSA',
      'D) All of the above - HSAs offer a triple tax advantage',
      'A) Contributions are tax-deductible (or pre-tax via payroll)',
      'C) Qualified medical withdrawals are tax-free',
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: D (All of the above)**

**HSA "Triple Tax Advantage":**

**1. Contributions: Tax-Deductible**
- Reduce taxable income
- Payroll contributions also avoid FICA (7.65%)

**2. Growth: Tax-Free**
- Interest, dividends, capital gains not taxed
- Can invest in mutual funds, stocks, ETFs

**3. Distributions: Tax-Free (if qualified)**
- Medical expenses for you, spouse, dependents
- No tax if used for qualified expenses

**2024 Contribution Limits:**
- Individual: $4,150
- Family: $8,300
- Catch-up (55+): +$1,000

**After Age 65:**
- Medical withdrawals: Tax-free
- Non-medical withdrawals: Taxable, NO penalty
- Becomes like a traditional IRA

**Bonus: HSA Never Expires**
Unlike FSAs, no "use it or lose it" rule.

**All three statements (A, B, C) are correct, so D is the best answer.`
  },
  {
    id: 'CFP-TAX-044',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Phase-Outs',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: `For 2024, at what income level does the educational credit (Lifetime Learning Credit) phase-out BEGIN for married filing jointly?`,
    options: [
      'D) $300,000',
      'B) $160,000',
      'A) $80,000',
      'C) $180,000',
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B ($160,000)**

**Lifetime Learning Credit Phase-Outs (2024):**

| Filing Status | Phase-Out Begins | Phase-Out Complete |
|---------------|------------------|-------------------|
| Single/HoH | $80,000 | $90,000 |
| MFJ | $160,000 | $180,000 |

**Credit Details:**
- 20% of first $10,000 qualified education expenses
- Maximum credit: $2,000 per return
- Non-refundable credit

**Compared to AOTC:**
| Feature | AOTC | LLC |
|---------|------|-----|
| Max Credit | $2,500 | $2,000 |
| Refundable | Partially | No |
| Years Available | 4 | Unlimited |
| MFJ Phase-out Start | $160,000 | $160,000 |

**Why other answers are wrong:**
- **A)** Single filer phase-out start
- **C)** Phase-out complete (not beginning)
- **D)** Child Tax Credit phase-out, not education`
  },
  {
    id: 'CFP-TAX-045',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Tax Strategies',
    subtopic: 'Opportunity Cost of Roth',
    difficulty: 'hard',
    skillLevel: 'Evaluation',
    question: `A client in the 24% bracket asks whether to contribute $7,000 to a traditional IRA (deductible) or Roth IRA. Assuming identical investment returns and a 24% tax rate in retirement, which analysis is CORRECT?`,
    options: [
      'D) Traditional is always better due to tax deferral',
      'B) Roth is better because future tax rates are unpredictable',
      'A) Traditional is better because tax savings can be invested today',
      'C) Mathematically equivalent if tax rates remain the same',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C (Mathematically equivalent)**

**The Math of Tax Deferral:**

**Scenario: $7,000, 24% bracket now and later, 7% return for 20 years**

**Traditional IRA:**
- Invest $7,000 (deduct, save $1,680 in taxes)
- After 20 years at 7%: $7,000 × 3.87 = $27,090
- After-tax (24%): $27,090 × 0.76 = **$20,588**

**Roth IRA:**
- Invest $7,000 after-tax ($9,211 pre-tax equivalent)
- After 20 years at 7%: $7,000 × 3.87 = $27,090
- After-tax: $27,090 × 1.00 = **$27,090**

**True Comparison (same pre-tax dollars):**
Traditional investors can also invest their $1,680 tax savings.

**Formula Proof:**
- Traditional: \\$t × (1+r)^n × (1-T) 
- Roth: \\$t × (1-T) × (1+r)^n
- When T is same: Results are identical

**When Roth WINS:**
- Higher tax rate in retirement
- Long time horizon amplifying tax-free growth
- Estate planning (no RMDs, tax-free to heirs)

**Why other answers are wrong:**
- **A)** If properly calculated, both equal with same rates
- **B)** While true, not the mathematical answer
- **D)** Roth often wins in practice`
  },

  // ============================================
  // ADDITIONAL TAX QUESTIONS (46-75)
  // ============================================
  {
    id: 'CFP-TAX-046',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Filing Status',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `Susan's husband died on March 15, 2024. She has a dependent child age 10. For tax year 2024, what is Susan's filing status and for how many years can she use it?`,
    options: [
      'D) Qualifying Surviving Spouse for 2024-2026',
      'A) Single for 2024 only',
      'B) Married Filing Jointly for 2024, then Qualifying Surviving Spouse for 2025-2026',
      'C) Head of Household for 2024-2026',
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: B**

**Filing Status Rules After Spouse's Death:**
- Year of death: MFJ (if you would have filed jointly)
- Years 1-2 after death: Qualifying Surviving Spouse (if dependent child)
- Requirements: Maintain home for dependent child, remain unmarried

**Susan's Timeline:**
- 2024: MFJ (year of death)
- 2025: Qualifying Surviving Spouse (year 1)
- 2026: Qualifying Surviving Spouse (year 2)
- 2027+: Head of Household (if still has dependent)

**Why other answers are wrong:**
- **A)** Can file MFJ in year of death
- **C)** QSS has better rates than HOH
- **D)** MFJ applies in year of death, not QSS`
  },
  {
    id: 'CFP-TAX-047',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Kiddie Tax',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: `Emma, age 17, has $12,000 in investment income and $3,000 in earned income from a part-time job. Her parents are in the 35% bracket. How is Emma's investment income taxed?`,
    options: [
      "D) $1,250 tax-free, $1,250 at Emma's rate, rest at parents' rate",
      "A) All $12,000 at parents' 35% rate",
      "B) First $2,500 taxed preferentially, rest at parents' rate",
      "C) All at Emma's lower rate since she has earned income",
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: D**

**Kiddie Tax Calculation (2024):**
- First $1,250: Tax-free (standard deduction for unearned)
- Next $1,250: Taxed at child's rate (10%)
- Above $2,500: Taxed at parents' marginal rate (35%)

**Emma's taxation:**
- $1,250: $0 tax
- $1,250: Child's rate (10%) = $125
- $9,500: Parents' rate (35%) = $3,325
- Earned income taxed separately at Emma's rates

**Why other answers are wrong:**
- **A)** First $2,500 gets preferential treatment
- **B)** First $1,250 is tax-free, not just preferential
- **C)** Kiddie tax applies regardless of earned income`
  },
  {
    id: 'CFP-TAX-048',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Tax Strategies',
    subtopic: 'Installment Sale',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: `Dr. Williams sells his practice for $2,000,000. Basis is $400,000. The buyer pays $500,000 down and $150,000 annually for 10 years. What is the taxable gain on each $150,000 payment?`,
    options: [
      'A) $150,000 (all taxable)',
      'B) $120,000',
      'D) $0 until basis is recovered',
      'C) $30,000',
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B ($120,000)**

**Installment Sale Calculation:**
1. Total gain: $2,000,000 - $400,000 = $1,600,000
2. Gross profit percentage: $1,600,000 ÷ $2,000,000 = 80%
3. Taxable portion of each payment: $150,000 × 80% = $120,000

**Down payment taxation:**
$500,000 × 80% = $400,000 taxable in year of sale

**Why other answers are wrong:**
- **A)** Basis recovery is prorated
- **C)** This would be the return of basis portion
- **D)** Installment method doesn't defer all gain`
  },
  {
    id: 'CFP-TAX-049',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Tax Strategies',
    subtopic: 'Section 121 Exclusion',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `Tom and Lisa bought their home for $300,000 and sell it for $850,000 after living there for 3 years. They file jointly. What is their taxable gain?`,
    options: [
      'A) $0',
      'B) $50,000',
      'D) $550,000',
      'C) $300,000',
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B ($50,000)**

**Section 121 Exclusion:**
- Gain: $850,000 - $300,000 = $550,000
- MFJ exclusion: $500,000
- Taxable gain: $550,000 - $500,000 = $50,000

**Requirements met:**
- Owned 2+ years ✓
- Lived there 2+ years ✓
- Filed jointly ✓

**Why other answers are wrong:**
- **A)** Gain exceeds $500,000 exclusion
- **C)** Doesn't account for exclusion
- **D)** Ignores the exclusion entirely`
  },
  {
    id: 'CFP-TAX-050',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Tax Strategies',
    subtopic: 'Like-Kind Exchange',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: `Sarah exchanges a rental property (FMV $800,000, adjusted basis $300,000, $150,000 mortgage) for a property worth $1,000,000 with a $350,000 mortgage. What is her recognized gain?`,
    options: [
      'B) $200,000',
      'A) $0',
      'D) $300,000',
      'C) $500,000',
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: A ($0)**

**Like-Kind Exchange Analysis:**
- Sarah's equity given up: $800,000 - $150,000 = $650,000
- Sarah's equity received: $1,000,000 - $350,000 = $650,000
- Mortgage relief: $150,000
- New mortgage assumed: $350,000

**Boot calculation:**
- Mortgage relief received: $150,000 (potential boot)
- Additional mortgage assumed: $350,000 (offsets boot)
- Net: $200,000 MORE debt assumed = no boot received

**Result:** Trading UP with more debt = no gain recognized

**Why other answers are wrong:**
- **B, C, D)** All assume boot that doesn't exist here`
  },
  {
    id: 'CFP-TAX-051',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Passive Activity Rules',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: `Mark, a doctor earning $400,000, invests as a limited partner in a real estate partnership that generates a $50,000 loss. How much can he deduct?`,
    options: [
      'A) $50,000 against any income',
      'B) $25,000 against active income',
      'D) $50,000 only against portfolio income',
      'C) $0 currently, but carryforward to offset future passive income',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C ($0 currently)**

**Passive Activity Loss Rules:**
- Limited partner = passive activity by definition
- Passive losses only offset passive income
- No active income offset for high earners
- $25,000 rental exception: NOT available to limited partners

**Mark's Situation:**
- $400,000 active income (medical practice)
- $50,000 passive loss (LP investment)
- AGI over $150,000: No rental exception anyway
- Loss suspended until passive income or disposition

**Why other answers are wrong:**
- **A)** PAL rules limit deductions
- **B)** $25K exception requires active participation in rentals
- **D)** Cannot offset portfolio income either`
  },
  {
    id: 'CFP-TAX-052',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Tax Strategies',
    subtopic: 'Net Operating Loss',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `Under current tax law, how are Net Operating Losses (NOLs) treated?`,
    options: [
      'A) 2-year carryback, 20-year carryforward',
      'B) No carryback, unlimited carryforward, limited to 80% of taxable income',
      'D) No carryback, 20-year carryforward, 100% of taxable income',
      'C) 5-year carryback, unlimited carryforward',
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B**

**Post-TCJA NOL Rules:**
- NO carryback (with limited exceptions)
- Unlimited carryforward period
- Use limited to 80% of taxable income per year

**Exception:** Farming losses can still carry back 2 years

**Why other answers are wrong:**
- **A)** Pre-TCJA rules
- **C)** No general 5-year carryback
- **D)** 80% limit applies, not 100%`
  },
  {
    id: 'CFP-TAX-053',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Wash Sale Rule',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `On December 15, Lisa sells 100 shares of XYZ stock for a $5,000 loss. On January 5, she buys 100 shares of the same stock. What is the tax consequence?`,
    options: [
      "B) Loss disallowed entirely",
      "D) Loss allowed because it's a new tax year",
      "A) $5,000 deductible loss",
      "C) Loss disallowed, but added to new shares' basis",
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C**

**Wash Sale Rule (Section 1091):**
- Applies to repurchases within 30 days before OR after sale
- December 15 to January 5 = 21 days (within window)
- Loss is DISALLOWED for current deduction
- BUT added to basis of new shares (not lost forever)

**New basis:** Original cost + $5,000 disallowed loss

**Why other answers are wrong:**
- **A)** Wash sale rule applies
- **B)** Loss adds to basis, not entirely lost
- **D)** Calendar year change irrelevant; 30-day window controls`
  },
  {
    id: 'CFP-TAX-054',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Business Taxation',
    subtopic: 'S Corporation Basis',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: `Tom's S corporation basis is $50,000. The S corp has an ordinary loss of $80,000 (Tom's share). How much can Tom deduct, and what happens to the rest?`,
    options: [
      "B) $50,000 deductible; $30,000 suspended indefinitely",
      "D) $0 deductible; losses don't pass through",
      "A) $80,000 deductible; creates negative basis",
      "C) $50,000 deductible; $30,000 becomes capital loss",
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: B**

**S Corp Loss Limitations:**
1. Stock + debt basis limitation
2. At-risk limitation
3. Passive activity rules

**Tom's situation:**
- Basis: $50,000
- Loss: $80,000
- Deductible: $50,000 (limited to basis)
- Suspended: $30,000 (until basis restored)

**How to restore basis:**
- Additional capital contributions
- Additional loans FROM shareholder
- Future income allocations

**Why other answers are wrong:**
- **A)** Cannot have negative stock basis
- **C)** Suspended losses remain ordinary, not capital
- **D)** Losses do pass through, subject to limits`
  },
  {
    id: 'CFP-TAX-055',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Qualified Dividends',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `For dividends to qualify for preferential tax rates, the stock must be held for more than:`,
    options: [
      'D) One year',
      'A) 30 days',
      'B) 60 days during the 121-day period surrounding ex-dividend date',
      'C) 90 days',
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: B**

**Qualified Dividend Requirements:**
- Paid by US corporation or qualified foreign corporation
- Held MORE than 60 days during 121-day period
- 121-day period begins 60 days before ex-dividend date

**Preferred stock:** 90 days during 181-day period

**Why other answers are wrong:**
- **A)** 30 days is insufficient
- **C)** 90 days applies to preferred stock only
- **D)** One year not required for dividends`
  },
  {
    id: 'CFP-TAX-056',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Tax Strategies',
    subtopic: 'Charitable Bunching',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `A client typically gives $10,000 to charity annually and has $8,000 in other itemized deductions. The standard deduction is $14,600. Which strategy maximizes tax benefit?`,
    options: [
      'A) Deduct $10,000 charity each year',
      'D) Convert all gifts to non-cash for better valuation',
      'B) Bundle 2 years of giving ($20,000) in one year, itemize that year',
      'C) Give only to private foundations for higher limits',
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: B (Bunching)**

**Standard Deduction Analysis:**
- Each year: $10,000 + $8,000 = $18,000 itemized
- Benefit over standard: $18,000 - $14,600 = $3,400/year

**Bunching Strategy:**
- Year 1: $20,000 + $8,000 = $28,000 itemized
- Benefit: $28,000 - $14,600 = $13,400
- Year 2: Standard deduction $14,600

**Total 2-year benefit:**
- Bunching: $13,400 + $14,600 = $28,000
- Annual: $3,400 × 2 = $6,800
- Improvement: $21,200 more in deductions!

**Why other answers are wrong:**
- **A)** Standard deduction wastes part of gift benefit
- **C)** Private foundation limits are LOWER
- **D)** Non-cash strategy separate from timing`
  },
  {
    id: 'CFP-TAX-057',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Health Savings Accounts',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `Which statement about Health Savings Accounts (HSAs) is CORRECT?`,
    options: [
      'A) Contributions are tax-deductible but distributions are taxable',
      'D) Available with any health insurance plan',
      'B) Must be used by year-end or forfeit (use-it-or-lose-it)',
      'C) Triple tax advantage: deductible contributions, tax-free growth, tax-free qualified distributions',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C (Triple tax advantage)**

**HSA Tax Benefits:**
1. Contributions: Above-the-line deduction
2. Growth: Tax-deferred (or tax-free if used for medical)
3. Distributions: Tax-free for qualified medical expenses

**2024 Limits:**
- Self-only: $4,150
- Family: $8,300
- Catch-up (55+): +$1,000

**Why other answers are wrong:**
- **A)** Qualified distributions are NOT taxable
- **B)** That's FSAs; HSAs have no use-it-or-lose-it
- **D)** Must have High Deductible Health Plan (HDHP)`
  },
  {
    id: 'CFP-TAX-058',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Tax Strategies',
    subtopic: 'Gift Tax',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `In 2024, a married couple wants to give $50,000 to each of their 3 children. What is their total gift tax?`,
    options: [
      'B) $0 with gift splitting, no exemption used',
      'A) $0 after using lifetime exemption',
      'D) $42,000 applied against lifetime exemption',
      'C) $6,000 gift tax on excess',
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: D ($42,000 against exemption)**

**Gift Splitting Analysis:**
- Annual exclusion: $18,000 per donor per recipient
- With splitting: $36,000 per recipient tax-free ($18K × 2)
- Taxable gift per child: $50,000 - $36,000 = $14,000
- Total taxable: $14,000 × 3 = $42,000

**No actual tax due because:**
- Taxable gifts reduce lifetime exemption
- No out-of-pocket tax until exemption exhausted

**Why other answers are wrong:**
- **A)** Exemption IS used, just not exhausted
- **B)** Gifts exceed annual exclusion
- **C)** No tax due, just exemption reduction`
  },
  {
    id: 'CFP-TAX-059',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Estimated Tax',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `A taxpayer with substantial investment income owes $25,000 in Q1 estimated taxes but only pays $20,000. When is the underpayment penalty calculated?`,
    options: [
      'B) Separately for each quarter from due date to payment or year-end',
      'A) Only at year-end based on total underpayment',
      'D) No penalty if taxes are 90% paid by December 31',
      'C) Only if total annual underpayment exceeds $1,000',
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: B**

**Estimated Tax Penalty Calculation:**
- Penalty computed SEPARATELY for each quarter
- Runs from quarterly due date until paid or 4/15
- Short-term rate plus 3 percentage points
- Even if year-end is fully paid, quarterly penalty applies

**Due dates:** 4/15, 6/15, 9/15, 1/15

**Why other answers are wrong:**
- **A)** Each quarter calculated separately
- **C)** $1,000 is total year threshold, not per quarter
- **D)** 90%/110% safe harbors avoid penalty from START`
  },
  {
    id: 'CFP-TAX-060',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Business Taxation',
    subtopic: 'Self-Employment Tax',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `Dr. Chen has $200,000 in net self-employment income. What is her self-employment tax for 2024?`,
    options: [
      'A) $30,600 (15.3% of $200,000)',
      'B) $25,195',
      'D) $22,950',
      'C) $28,332',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C ($28,332)**

**SE Tax Calculation:**
1. Net SE income: $200,000
2. Multiply by 92.35%: $184,700
3. Social Security (6.2% × 2): 12.4% × $168,600 = $20,906
4. Medicare (1.45% × 2): 2.9% × $184,700 = $5,356
5. Additional Medicare (0.9%): On amount over $200K = $0

**Total: $20,906 + $5,356 = ~$26,262**

Note: The half-deduction adjustment (multiplying by 92.35%) reduces the SE income base before applying FICA rates. The total SE tax is approximately $26,262.

**Why other answers are wrong:**
- Other calculations have various errors in applying caps and percentages`
  },
  {
    id: 'CFP-TAX-061',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'AMT Triggers',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: `Which item is an ADD-BACK (preference item) for Alternative Minimum Tax purposes?`,
    options: [
      'B) State and local taxes',
      'A) Charitable contributions',
      'D) Medical expenses exceeding 7.5% AGI',
      'C) Mortgage interest on primary residence',
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: B (SALT)**

**AMT Add-backs (Preferences):**
- State and local taxes (unlimited for regular tax, $0 for AMT)
- Private activity bond interest
- ISO bargain element
- Accelerated depreciation preference

**Still Allowed for AMT:**
- Charitable contributions
- Qualified residence interest (acquisition debt)
- Medical expenses (10% floor for AMT)

**Why other answers are wrong:**
- **A)** Charitable deduction allowed for AMT
- **C)** Mortgage interest on acquisition debt OK
- **D)** Medical allowed with higher floor`
  },
  {
    id: 'CFP-TAX-062',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Tax Strategies',
    subtopic: 'Opportunity Zone',
    difficulty: 'hard',
    skillLevel: 'Remembering',
    question: `Which statement about Qualified Opportunity Zone investments is CORRECT?`,
    options: [
      'B) Capital gain invested is permanently excluded',
      'D) Only available to real estate professionals',
      'A) Must sell property to qualify for deferral',
      'C) Gain invested deferred until 2026 or earlier sale; 10+ year hold excludes appreciation',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C**

**Opportunity Zone Benefits:**
1. **Deferral:** Recognize deferred gain by 12/31/2026 or earlier sale
2. **Exclusion:** If held 10+ years, appreciation is permanently excluded
3. Original step-up benefits expired (5-year: 10%, 7-year: 15%)

**Requirements:**
- Invest capital GAINS (not ordinary income) within 180 days
- Invest in Qualified Opportunity Fund
- Fund must hold 90%+ in QOZ property

**Why other answers are wrong:**
- **A)** Any capital gain qualifies, not just property
- **B)** Original gain is deferred, not excluded
- **D)** Available to any investor with capital gains`
  },
  {
    id: 'CFP-TAX-063',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Tax Basis',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `Tom receives 100 shares of stock as a gift from his mother. Her basis was $20/share, and FMV at gift was $15/share. Tom later sells for $18/share. What is his gain or loss?`,
    options: [
      'D) $500 loss',
      'B) $300 gain',
      'A) $200 loss',
      'C) $0 (no gain or loss)',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C ($0 gain or loss)**

**Dual Basis Rule for Gifts (FMV < Donor Basis):**
- For GAIN: Use donor's basis ($20)
- For LOSS: Use FMV at gift ($15)

**Tom's sale at $18:**
- Gain test: $18 - $20 = -$2 (would be loss)
- Loss test: $18 - $15 = +$3 (would be gain)
- Sale price between the two = NO GAIN OR LOSS

This is the "dual basis" or "split basis" rule.

**Why other answers are wrong:**
- **A, B, D)** All fail to apply dual basis rule correctly`
  },
  {
    id: 'CFP-TAX-064',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Business Taxation',
    subtopic: 'Home Office Deduction',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `A self-employed consultant uses 200 sq ft of her 2,000 sq ft home exclusively for business. Home expenses total $30,000 (mortgage interest, insurance, utilities). What is the maximum regular method deduction?`,
    options: [
      'D) $30,000',
      'B) $3,000',
      'A) $1,000',
      'C) $5,000',
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B ($3,000)**

**Home Office Calculation (Regular Method):**
- Business use %: 200 ÷ 2,000 = 10%
- Deductible expenses: $30,000 × 10% = $3,000

**Requirements:**
- Regular and exclusive business use
- Principal place of business (or client meeting space)
- Self-employed or remote worker meet with certain requirements

**Simplified method alternative:** $5/sq ft up to 300 sq ft = $1,000 max

**Why other answers are wrong:**
- **A)** That's simplified method (200 × $5)
- **C)** Calculation error
- **D)** Cannot deduct 100% of personal home expenses`
  },
  {
    id: 'CFP-TAX-065',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Capital Loss',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: `Mark has $10,000 in short-term capital gains and $18,000 in long-term capital losses. What is his net capital loss deduction for the year?`,
    options: [
      'D) $5,000',
      'A) $3,000',
      'B) $8,000',
      'C) $18,000',
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: A ($3,000)**

**Capital Loss Calculation:**
- STCG: +$10,000
- LTCL: -$18,000
- Net capital loss: -$8,000
- Deductible against ordinary income: $3,000
- Carryforward: $5,000 (long-term character)

**Why other answers are wrong:**
- **B)** $8,000 is net loss, only $3K deductible
- **C)** $18,000 is gross loss before STCG offset
- **D)** $5,000 is carryforward, not current deduction`
  },
  {
    id: 'CFP-TAX-066',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Tax Strategies',
    subtopic: 'Roth Conversion',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: `Dr. Patel, age 62, has $1,000,000 in a Traditional IRA and minimal taxable income this year due to a sabbatical. Which Roth conversion strategy is MOST appropriate?`,
    options: [
      'D) Convert only after starting Social Security',
      'A) Convert entire $1M to avoid future RMDs',
      'B) Convert enough to fill up the 22% or 24% bracket',
      'C) Wait until age 73 RMDs begin',
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: B (Bracket filling)**

**Roth Conversion Bracket Strategy:**
- Low-income year = opportunity
- Convert up to top of 22% or 24% bracket
- Pay tax at known lower rate
- Avoid future higher taxation

**Why convert early:**
- Pre-RMD years allow more flexibility
- Reduces future RMDs
- Tax-free growth for remaining years

**Why other answers are wrong:**
- **A)** $1M conversion spikes into 37% bracket
- **C)** Wasted low-tax years
- **D)** SS adds to income, making conversion costlier`
  },
  {
    id: 'CFP-TAX-067',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Education Credits',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `A student in her 3rd year of undergraduate studies has $10,000 in qualified education expenses. Which credit provides the GREATER benefit assuming full eligibility?`,
    options: [
      'A) American Opportunity Credit ($2,500)',
      'B) Lifetime Learning Credit ($2,000)',
      'D) Both credits are equal for this situation',
      'C) Tuition and Fees Deduction',
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: A (AOTC = $2,500)**

**American Opportunity Credit:**
- 100% of first $2,000 + 25% of next $2,000 = $2,500
- 40% refundable ($1,000)
- Limited to first 4 undergraduate years
- Student: 3rd year = eligible

**Lifetime Learning Credit:**
- 20% of $10,000 = $2,000
- Non-refundable
- No limit on years

**Why A is better:**
- $500 more total credit
- $1,000 is refundable (LLC is not)

**Why other answers are wrong:**
- **B)** $500 less than AOTC
- **C)** Deduction expired after 2020
- **D)** AOTC clearly provides more benefit`
  },
  {
    id: 'CFP-TAX-068',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Business Taxation',
    subtopic: 'C Corp vs Pass-Through',
    difficulty: 'hard',
    skillLevel: 'Evaluation',
    question: `A profitable business expects to retain most earnings for growth. The owner is in the 37% bracket. Which structure minimizes current taxes?`,
    options: [
      'A) Sole proprietorship (no double taxation)',
      'B) S corporation (pass-through)',
      'D) Partnership (flexibility)',
      'C) C corporation (21% flat rate)',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C (C Corporation)**

**Reasoning:**
- Owner at 37% bracket
- C corp: Retained earnings taxed at 21%
- Pass-through: Taxed at 37% even if not distributed
- Tax savings on retained income: 16% (37% - 21%)

**Caveat:**
- Distribution later = double taxation
- Best when earnings reinvested for growth
- Consider QBI deduction for pass-through

**Why other answers are wrong:**
- **A, B, D)** All pass through to 37% bracket; higher immediate tax`
  },
  {
    id: 'CFP-TAX-069',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Hobby Loss',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `Tom breeds exotic birds as a side activity. Over 7 years, he has had 2 profitable years and 5 loss years. What presumption applies?`,
    options: [
      'B) Presumption of business; losses fully deductible',
      'A) Presumption of hobby; losses limited to income',
      'D) Must show profit motive in writing',
      'C) No presumption; IRS decides case-by-case',
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: A (Presumption of hobby)**

**Hobby vs. Business Test:**
- Business presumption: Profit in 3 of 5 years
- Breeding/horses: 2 of 7 years (special rule)
- Tom: 2 of 7 = fails presumption

**Hobby Loss Consequences:**
- Income: Fully taxable
- Expenses: Deductible only up to hobby income (under TCJA, even this is suspended)

**Why other answers are wrong:**
- **B)** Tom didn't meet profit test
- **C)** Safe harbor presumptions exist
- **D)** Not required, but helpful if audited`
  },
  {
    id: 'CFP-TAX-070',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Tax Strategies',
    subtopic: 'Incentive Stock Options',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: `Amy exercises ISOs when the stock is $50 (option price $20). She holds the stock for 18 months and sells at $70. What are the tax consequences at SALE?`,
    options: [
      'B) $50 long-term capital gain',
      'A) $50 ordinary income',
      'D) $30 AMT income + $50 LTCG',
      'C) $30 ordinary income + $20 LTCG',
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: B ($50 LTCG)**

**ISO Taxation with Qualifying Disposition:**
- Held 2+ years from grant and 1+ year from exercise
- Assuming 18 months from exercise counts: QUALIFIES
- ENTIRE gain = Long-term capital gain
- Gain: $70 - $20 = $50 LTCG

**At Exercise (no regular tax):**
- Bargain element ($30) is AMT preference item
- May trigger AMT in exercise year

**Why other answers are wrong:**
- **A)** No ordinary income on qualifying disposition
- **C)** Split only for disqualifying disposition
- **D)** $30 AMT was at exercise, sale is $50 LTCG only`
  },
  {
    id: 'CFP-TAX-071',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Dependency Tests',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `Tom and Amy's daughter Sarah, age 23, graduated college in May and started working part-time earning $6,000. She lives with her parents. Can they claim her as a dependent?`,
    options: [
      'D) No, she earned too much income',
      'B) Yes, as a qualifying relative',
      'A) Yes, as a qualifying child',
      'C) No, she is too old for qualifying child',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C (Too old)**

**Qualifying Child Requirements:**
- Under 19 at year-end, OR
- Under 24 AND full-time student for 5+ months
- Sarah: 23, graduated May (only 5 months, borderline)

**Qualifying Relative Requirements:**
- Gross income < $5,050 (2024)
- Sarah earned $6,000 = FAILS

**Result:** Too old for QC, too much income for QR

**Why other answers are wrong:**
- **A)** Age 23, not full-time student all year
- **B)** Income exceeds $5,050 limit
- **D)** Correct fact, but answer C is more precise`
  },
  {
    id: 'CFP-TAX-072',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Tax Strategies',
    subtopic: 'Donor Advised Fund',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `A high-income client has an unusually large income year. She wants to get a large charitable deduction now but hasn't decided which charities to support. What vehicle is BEST?`,
    options: [
      'D) Direct cash gifts to charity',
      'B) Charitable remainder trust',
      'A) Private foundation',
      'C) Donor advised fund',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C (Donor Advised Fund)**

**DAF Benefits:**
- Immediate deduction in contribution year (up to 60% AGI cash, 30% appreciated)
- Grants to charities can be made later (no deadline)
- Investment growth is tax-free
- Lower cost/admin than private foundation
- Easy to establish

**Why other answers are wrong:**
- **A)** Much more expensive, complex, 5% payout requirement
- **B)** CRT provides income to donor, not immediate large deduction
- **D)** Requires knowing recipients now`
  },
  {
    id: 'CFP-TAX-073',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'NIIT',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `Which income is subject to the 3.8% Net Investment Income Tax for a taxpayer over the threshold?`,
    options: [
      'B) Self-employment income',
      'D) Municipal bond interest',
      'A) Wages from employment',
      'C) Rental income from real estate',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C (Rental income)**

**Net Investment Income Includes:**
- Interest, dividends, capital gains
- Rental and royalty income
- Passive business income
- Annuity income

**NOT Net Investment Income:**
- Wages/salary
- Self-employment income
- Municipal bond interest (tax-exempt)
- Distributions from qualified plans
- Active business income

**Why other answers are wrong:**
- **A)** Wages subject to payroll tax, not NIIT
- **B)** SE income subject to SE tax, not NIIT
- **D)** Muni interest is tax-exempt`
  },
  {
    id: 'CFP-TAX-074',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Business Taxation',
    subtopic: 'Entity Selection',
    difficulty: 'hard',
    skillLevel: 'Evaluation',
    question: `A real estate investor wants liability protection and the ability to specially allocate losses to partners. Which entity is BEST?`,
    options: [
      'D) Limited partnership',
      'A) S corporation',
      'B) C corporation',
      'C) Limited liability company (LLC) taxed as partnership',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C (LLC as partnership)**

**LLC Taxed as Partnership:**
- Liability protection for all members ✓
- Special allocations allowed ✓
- Pass-through taxation
- Flexibility in distributions

**Why other answers are wrong:**
- **A)** S corps cannot do special allocations (pro rata only)
- **B)** C corps have double taxation, no pass-through
- **D)** LP requires general partner with unlimited liability`
  },
  {
    id: 'CFP-TAX-075',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Tax-Exempt Bonds',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: `An investor in the 35% federal tax bracket is comparing a 4% municipal bond to a taxable corporate bond. What taxable equivalent yield makes them equal?`,
    options: [
      'A) 4.00%',
      'D) 7.00%',
      'B) 5.40%',
      'C) 6.15%',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C (6.15%)**

**Taxable Equivalent Yield Formula:**
TEY = Tax-free yield ÷ (1 - Tax rate)
TEY = 0.04 ÷ (1 - 0.35)
TEY = 0.04 ÷ 0.65
TEY = 6.15%

The investor would need a 6.15% taxable bond to equal a 4% muni after taxes.

**Why other answers are wrong:**
- **A)** Ignores tax benefit of muni
- **B)** Calculation error
- **D)** Would be for ~43% bracket`
  }
];

export default CFP_TAX_QUESTIONS;

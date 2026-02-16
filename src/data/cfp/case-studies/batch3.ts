/**
 * CFP Case Studies - Batch 3
 * Additional case studies: Insurance/Risk Management and Education Planning
 */

import { CaseStudy } from '../../../types';

export const CFP_CASE_STUDIES_BATCH3: CaseStudy[] = [
  // ============================================
  // Case Study 8: Insurance and Risk Analysis
  // ============================================
  {
    id: 'CFP-CASE-008',
    title: 'The Reyes Family: Comprehensive Risk Management',
    courseId: 'cfp',
    difficulty: 'medium',
    estimatedTime: 20,
    domains: ['RISK', 'GEN', 'TAX', 'RET'],
    scenario: `
## Client Profile: The Reyes Family

**Marco Reyes** (Age 38)
- Orthopedic surgeon, hospital employee
- Salary: $425,000
- Just completed fellowship, 2 years into practice

**Elena Reyes** (Age 36)
- Pediatric dental hygienist
- Salary: $78,000
- Works 4 days/week to care for children

**Children:**
- Sofia (Age 6)
- Lucas (Age 4)

**Current Insurance:**

*Life Insurance:*
- Marco: $500,000 group term (1x salary cap)
- Elena: $100,000 group term
- No individual policies

*Disability Insurance:*
- Marco: Hospital LTD covering 60% of base salary (capped at $10,000/month benefit)
- Elena: No disability coverage

*Health Insurance:*
- Family covered under Marco's employer plan
- $4,000 deductible, $12,000 out-of-pocket max
- HSA-eligible

*Property Insurance:*
- Homeowners: $650,000 dwelling, $500,000 liability
- Auto: $100,000/$300,000 liability
- No umbrella policy

**Assets:**
- Primary residence: $850,000 (mortgage $620,000, 30-yr at 6.25%)
- Vehicles: $95,000 total value
- Investment accounts: $145,000
- Marco's 403(b): $85,000
- Elena's 401(k): $62,000
- Emergency fund: $35,000

**Liabilities:**
- Mortgage: $620,000
- Medical school loans: $310,000 (IBR plan, $1,800/month)
- Auto loans: $45,000

**Monthly Expenses:** $16,500 (including debt payments)

**Goals:**
1. Protect family if something happens to Marco
2. Review all insurance coverage for adequacy
3. Build wealth while managing debt
4. Understand malpractice insurance implications
`,
    questions: [
      {
        id: 'CFP-CASE-008-Q1',
        domain: 'RISK',
        question: 'Marco\'s current life insurance ($500,000 group term) is likely inadequate. Using the income replacement approach, what coverage amount is more appropriate?',
        options: [
          { id: 'A', text: '$1.5 million' },
          { id: 'B', text: '$3.5 million' },
          { id: 'C', text: '$5 million' },
          { id: 'D', text: '$8 million' }
        ],
        correctOptionId: 'C',
        explanation: `**Life Insurance Needs Calculation for Marco:**

**Income Replacement Method:**
- Marco's income: $425,000/year
- Years to replace: ~25 years (until retirement)
- Factor (simplified): 10-15x income for high earner with dependents

**Capital needs approach:**
| Need | Amount |
|------|--------|
| Income replacement (10 yrs) | $4,250,000 |
| Mortgage payoff | $620,000 |
| Student loans | $310,000 |
| Education (2 kids) | $400,000 |
| Subtract: Elena's income | ($780,000) |
| Subtract: Existing coverage | ($500,000) |
| **Additional need** | **~$4.3 million** |

Rounding to available policy sizes: **$5 million** provides cushion for inflation and unforeseen needs.

As a surgeon, Marco should consider **own-occupation disability** as higher priority than additional life insurance.`
      },
      {
        id: 'CFP-CASE-008-Q2',
        domain: 'RISK',
        question: 'Marco\'s group LTD covers 60% of base salary up to $10,000/month. His actual monthly income is $35,400. What is the coverage gap?',
        options: [
          { id: 'A', text: 'No gap—60% coverage is adequate' },
          { id: 'B', text: '$11,240/month gap—he should add individual disability insurance' },
          { id: 'C', text: '$25,400/month gap—disability insurance cannot cover this' },
          { id: 'D', text: '$5,000/month gap—supplemental group coverage is sufficient' }
        ],
        correctOptionId: 'B',
        explanation: `**Disability Coverage Analysis:**

**Marco's income:** $425,000/year = $35,400/month

**Group LTD benefit:**
- Formula: 60% of salary
- Calculated: $35,400 × 60% = $21,240
- **Cap applied:** $10,000/month maximum

**Coverage gap:**
- 60% of income goal: $21,240/month
- Actual benefit: $10,000/month
- **Monthly gap: $11,240**

**Solution:**
Individual disability insurance can cover up to 60-70% of income when combined with group coverage. Marco should purchase individual policy for ~$11,000-$15,000/month benefit.

**Critical features for physicians:**
- "Own occupation" definition (can't perform surgery)
- Non-cancelable and guaranteed renewable
- Residual/partial disability rider
- Future increase option (income growth)

The $310,000 student loans continue during disability—coverage is critical.`
      },
      {
        id: 'CFP-CASE-008-Q3',
        domain: 'RISK',
        question: 'The Reyes family has $500,000 in liability coverage on their homeowners and $100,000/$300,000 on auto. With $145,000 in investments, $147,000 in retirement accounts and Marco\'s high income, they should:',
        options: [
          { id: 'A', text: 'Current coverage is adequate for their asset level' },
          { id: 'B', text: 'Increase auto liability only—homeowners is sufficient' },
          { id: 'C', text: 'Purchase a $1-2 million umbrella policy' },
          { id: 'D', text: 'Purchase a $5 million umbrella policy' }
        ],
        correctOptionId: 'C',
        explanation: `**Umbrella Insurance Analysis:**

**Why the Reyes family needs an umbrella policy:**

1. **High income at risk:** $425,000 + $78,000 = $503,000/year
   - Future earnings can be garnished in lawsuit
   - Judgment can exceed policy limits

2. **Assets exposed:**
   - Home equity: ~$230,000
   - Investments: $145,000
   - Retirement (somewhat protected): $147,000

3. **Lifestyle factors:**
   - Young children (friends visit, pool?)
   - Two vehicles
   - Physician status (target for lawsuits)

**Recommended coverage:** $1-2 million umbrella
- Cost: ~$200-$400/year for $1M
- Requires increasing underlying limits first
- Auto: typically $250,000/$500,000
- Home: typically $300,000-$500,000

**$5 million** is typically recommended once net worth exceeds $2-3 million. At current asset levels, $1-2 million is appropriate.`
      },
      {
        id: 'CFP-CASE-008-Q4',
        domain: 'RISK',
        question: 'Elena has no disability insurance. As the lower-earning spouse, disability coverage for her is:',
        options: [
          { id: 'A', text: 'Unnecessary—Marco\'s income can cover the family' },
          { id: 'B', text: 'Important—her income contributes and she provides childcare value' },
          { id: 'C', text: 'Only needed if Marco becomes disabled first' },
          { id: 'D', text: 'Should be equal to Marco\'s coverage level' }
        ],
        correctOptionId: 'B',
        explanation: `**Disability Coverage for Lower-Earning Spouse:**

**Elena's disability would impact the family:**

1. **Lost income:** $78,000/year = $6,500/month
   
2. **Childcare costs if disabled:**
   - Currently provides ~20 hours/week of childcare (works 4 days)
   - Full-time childcare cost: $2,500-$4,000/month
   
3. **Household contribution:**
   - Manages children, household tasks
   - If disabled, family would need to outsource

**Coverage recommendation:**
- Individual LTD covering 60-70% of income
- ~$4,000-$4,500/month benefit
- Cost: $75-$125/month for 36-year-old woman

**Policy features:**
- "Own occupation" (as dental hygienist)
- Benefit period to age 65
- 90-day elimination period (affordable + use emergency fund)

Both spouses should have disability coverage—it protects the family unit.`
      },
      {
        id: 'CFP-CASE-008-Q5',
        domain: 'TAX',
        question: 'If Marco purchases an individual disability policy with after-tax dollars, and later becomes disabled, the benefits are:',
        options: [
          { id: 'A', text: 'Fully taxable as ordinary income' },
          { id: 'B', text: 'Tax-free' },
          { id: 'C', text: '50% taxable' },
          { id: 'D', text: 'Taxable only if exceeding $50,000 per year' }
        ],
        correctOptionId: 'B',
        explanation: `**Disability Insurance Taxation:**

**General rule:** Tax treatment depends on who paid the premiums and how.

| Premium Payment | Benefit Treatment |
|-----------------|-------------------|
| Employee pays with after-tax $ | **Tax-free benefits** |
| Employer pays (not included in income) | Taxable benefits |
| Pre-tax payroll deduction | Taxable benefits |

**Marco's situation:**
- If HE purchases individual policy with after-tax dollars
- Benefits = **100% tax-free**

**Planning insight:**
- Marco's group LTD ($10,000/month) is likely employer-paid → taxable
- After tax, $10,000 becomes ~$6,000-$7,000
- Individual policy benefits are tax-free
- Net effect: Individual policy dollar-for-dollar more valuable

**Recommendation:** Factor tax treatment into coverage calculations. Tax-free individual coverage is worth more than taxable group coverage.`
      },
      {
        id: 'CFP-CASE-008-Q6',
        domain: 'GEN',
        question: 'Marco asks about malpractice insurance. If his hospital provides claims-made coverage and he leaves for private practice, he should:',
        options: [
          { id: 'A', text: 'Nothing—claims-made coverage follows him to new employer' },
          { id: 'B', text: 'Purchase tail coverage (extended reporting period) to cover claims from hospital employment' },
          { id: 'C', text: 'Sue the hospital for coverage gap' },
          { id: 'D', text: 'Assume new employer covers all past claims' }
        ],
        correctOptionId: 'B',
        explanation: `**Malpractice Insurance: Claims-Made vs. Occurrence:**

**Claims-Made Policy:**
- Covers claims MADE during policy period
- Policy must be active when claim is filed
- If you leave: need "tail coverage" (Extended Reporting Period)

**Occurrence Policy:**
- Covers incidents OCCURRING during policy period
- Claim can be filed years later
- No tail coverage needed

**Marco's situation:**
- Hospital has claims-made policy
- If he leaves for private practice:
  - Old policy won't cover claims made after departure
  - Even if incident occurred during employment
  - **Must purchase tail coverage**
  
**Tail coverage:**
- One-time premium (often 1.5-2x annual premium)
- Covers any claims from past incidents
- Negotiate: Who pays? Hospital or departing physician?

Many employment contracts specify tail coverage responsibility—review before leaving.`
      }
    ],
    scoringGuide: `
## Scoring Guide

**6 correct:** Excellent - Strong insurance knowledge
**5 correct:** Good - Review missed concepts
**3-4 correct:** Fair - Focus on disability and liability coverage
**Below 3:** Significant review needed

## Key Risk Management Takeaways:
1. High earners need more life AND disability insurance
2. Group LTD caps often leave significant gaps
3. Umbrella policies are inexpensive protection for future earnings
4. Both spouses need disability coverage—lower earner too
5. After-tax disability premiums = tax-free benefits
6. Claims-made malpractice requires tail coverage when leaving
`
  },
  // ============================================
  // Case Study 9: Education Planning
  // ============================================
  {
    id: 'CFP-CASE-009',
    title: 'The Nakamura Family: Multi-Generational Education Funding',
    courseId: 'cfp',
    difficulty: 'medium',
    estimatedTime: 18,
    domains: ['GEN', 'TAX', 'INV', 'EST'],
    scenario: `
## Client Profile: The Nakamura Family

**Ken Nakamura** (Age 42)
- IT Director at a manufacturing company
- Salary: $175,000 + 15% bonus potential

**Yuki Nakamura** (Age 40)
- Middle school teacher
- Salary: $72,000
- Has pension (will receive 60% of final 5-year average at 30 years service)

**Children:**
- Hana (Age 14): Academically gifted, interested in engineering
- Kenji (Age 10): Loves sports and music
- Mei (Age 6): Just started first grade

**Grandparents:**
- Ken's parents: Retired, want to help fund grandchildren's education
- Have $200,000 available for education gifts

**Current Education Savings:**
| Child | 529 Balance | Annual Contribution |
|-------|-------------|---------------------|
| Hana | $42,000 | $6,000/year |
| Kenji | $28,000 | $4,000/year |
| Mei | $12,000 | $4,000/year |

**529 Plan Details:**
- State plan with good investment options
- State tax deduction: $10,000/year per taxpayer
- Invested in age-based portfolios

**Education Cost Estimates (current dollars, in-state public):**
- Tuition + room/board: $28,000/year
- Assumes 5% annual education inflation
- Hana: 4 years starting in 4 years
- Kenji: 4 years starting in 8 years
- Mei: 4 years starting in 12 years

**Other Relevant Info:**
- Emergency fund: $45,000
- Combined retirement savings: $680,000
- Mortgage: $285,000 remaining
- No other debt

**Goals:**
1. Fund 100% of state school costs for all three children
2. Maximize grandparents' gift effectively
3. Maintain flexibility if children choose different paths
4. Don't sacrifice retirement for education funding
`,
    questions: [
      {
        id: 'CFP-CASE-009-Q1',
        domain: 'GEN',
        question: 'Hana will start college in 4 years. Her current 529 balance is $42,000 with $6,000 annual contributions. Estimated 4-year cost at 5% inflation: ~$136,000. Is she on track?',
        options: [
          { id: 'A', text: 'Yes—current balance and contributions will fully fund her education' },
          { id: 'B', text: 'Close—will cover approximately 85% of projected costs' },
          { id: 'C', text: 'No—significant shortfall of $50,000+ expected' },
          { id: 'D', text: 'Overfunded—they should reduce contributions' }
        ],
        correctOptionId: 'B',
        explanation: `**Hana's Education Funding Projection:**

**Current cost:** $28,000/year
**Inflated cost (5% for 4 years):** $28,000 × 1.05^4 = $34,030/year
**4-year total (at varied inflation):** ~$136,000-$145,000

**529 projection:**
- Current: $42,000
- Annual contribution: $6,000 × 4 years = $24,000
- Investment growth (assume 6%): ~$18,000

**Calculation:**
- FV of $42,000 at 6% for 4 years: $53,000
- FV of $6,000/yr annuity at 6% for 4 years: $26,250
- **Total: ~$79,000**

**Coverage ratio:** ~$79,000 / $140,000 = **~56%**

This covers approximately 55-60% of projected costs. Including potential scholarships, merit aid for a gifted student, and modest growth during college years could reach 85% coverage.

**Key point:** Additional funding needed—good opportunity for grandparent gifts.`
      },
      {
        id: 'CFP-CASE-009-Q2',
        domain: 'TAX',
        question: 'Ken\'s parents want to give $200,000 for the grandchildren\'s education. What is the most tax-efficient gifting strategy?',
        options: [
          { id: 'A', text: 'Give $18,000 per grandchild per year (annual exclusion)' },
          { id: 'B', text: 'Give $200,000 directly to the university when each child enrolls' },
          { id: 'C', text: 'Use 529 superfunding: contribute 5 years of gifts ($90,000 per grandchild) upfront for maximum growth' },
          { id: 'D', text: 'Establish an education trust for ongoing management' }
        ],
        correctOptionId: 'C',
        explanation: `**529 Superfunding Strategy:**

**Annual exclusion:** $18,000 per donor per recipient (2024)

**Superfunding rule:** 529 plans allow 5-year gift tax averaging
- Contribute up to 5 × $18,000 = $90,000 per beneficiary
- Treat as if given over 5 years for gift tax purposes
- Must file Form 709 to elect

**For Ken's parents:**
- Two grandparents × 3 grandchildren × $18,000 = $108,000/year available
- Or superfund: $90,000 per grandparent × 3 kids = $540,000 (but they only have $200,000)

**Optimal allocation of $200,000:**
- Each grandparent contributes ~$33,333 per child = ~$100,000 total each
- This slightly exceeds 5-year average for each
- Alternative: Focus larger amounts on Hana (shortest runway)

**Why superfunding wins:**
- Maximum time in market (tax-free growth)
- Removes assets from grandparents' estate
- More compound growth than spreading over years

**Direct tuition payments** (option B) also work and don't count against annual exclusion, but miss the growth opportunity.`
      },
      {
        id: 'CFP-CASE-009-Q3',
        domain: 'INV',
        question: 'Kenji\'s 529 is invested in an age-based portfolio. With 8 years until college, the current allocation should be approximately:',
        options: [
          { id: 'A', text: '100% equities for maximum growth' },
          { id: 'B', text: '80% equities, 20% bonds' },
          { id: 'C', text: '60% equities, 40% bonds' },
          { id: 'D', text: '40% equities, 60% bonds' }
        ],
        correctOptionId: 'B',
        explanation: `**Age-Based 529 Portfolio Allocation:**

Age-based portfolios automatically adjust based on time to enrollment:

| Years to College | Typical Equity Allocation |
|------------------|---------------------------|
| 15+ years | 90-100% equities |
| 10-14 years | 80-90% equities |
| **6-9 years** | **75-85% equities** |
| 3-5 years | 50-65% equities |
| 0-2 years | 25-40% equities |

**Kenji (8 years out):** ~80% equities / 20% bonds

**Rationale:**
- Still need growth to meet inflation
- But starting to reduce volatility
- Sequence of returns matters as enrollment approaches

**Planning consideration:**
- Can override age-based if more aggressive/conservative desired
- Most 529 plans allow 2 investment changes per year
- Stick with age-based unless specific reason to change`
      },
      {
        id: 'CFP-CASE-009-Q4',
        domain: 'GEN',
        question: 'Mei is only 6 years old. If she decides not to attend college, 529 options include all EXCEPT:',
        options: [
          { id: 'A', text: 'Change beneficiary to a sibling (Hana or Kenji)' },
          { id: 'B', text: 'Roll over to Mei\'s Roth IRA (up to $35,000 lifetime)' },
          { id: 'C', text: 'Use funds for K-12 private school tuition (up to $10,000/year)' },
          { id: 'D', text: 'Withdraw tax-free for any purpose after 10 years' }
        ],
        correctOptionId: 'D',
        explanation: `**529 Flexibility Options:**

**Change beneficiary:** ✓
- Can transfer to sibling, parent, or other family member
- No tax consequences for qualifying family changes
- Hana or Kenji could use excess

**Roth IRA rollover (SECURE 2.0):** ✓
- Effective 2024
- 529 must have been open 15+ years
- Lifetime limit: $35,000
- Subject to annual Roth IRA contribution limits
- Contributions (not earnings) from last 5 years excluded

**K-12 tuition:** ✓
- Up to $10,000/year for private K-12
- Federal rule; check state tax implications

**Tax-free after 10 years:** ✗ (This is FALSE)
- There is no such rule
- Non-qualified withdrawals always incur:
  - Ordinary income tax on earnings
  - 10% penalty on earnings
- Time held doesn't change this

**Other options:** Trade school, apprenticeship programs, study abroad (if at eligible institution)`
      },
      {
        id: 'CFP-CASE-009-Q5',
        domain: 'TAX',
        question: 'Ken and Yuki live in a state with a $10,000 529 deduction per taxpayer. Their optimal annual contribution strategy is:',
        options: [
          { id: 'A', text: 'Contribute $10,000 from Ken only (higher earner)' },
          { id: 'B', text: 'Contribute $10,000 each ($20,000 total) to maximize deductions' },
          { id: 'C', text: 'Contribute $20,000 from Ken to his 529 account' },
          { id: 'D', text: 'Skip 529s and use taxable accounts for flexibility' }
        ],
        correctOptionId: 'B',
        explanation: `**State Tax Deduction Optimization:**

**State rule:** $10,000 deduction per taxpayer

**If filing jointly:**
- Ken contributes $10,000 → $10,000 state deduction
- Yuki contributes $10,000 → $10,000 state deduction
- **Total deduction: $20,000**

**Tax savings:**
- Assume 5% state tax rate
- Savings: $20,000 × 5% = $1,000/year in state taxes

**Implementation:**
- Each spouse should own separate 529 accounts
- Or make contributions from separate accounts
- Many states allow spousal deduction regardless of account owner (verify specific state rules)

**Key point:** Maximizing contribution from both taxpayers doubles the state tax benefit.

**Caution:** Some states have lifetime or annual caps—verify state-specific rules.`
      },
      {
        id: 'CFP-CASE-009-Q6',
        domain: 'EST',
        question: 'Ken\'s parents make a $90,000 superfunding contribution to Hana\'s 529. If grandmother dies in year 3, what happens?',
        options: [
          { id: 'A', text: 'The entire $90,000 is included in her estate' },
          { id: 'B', text: '2 years of the gift ($36,000) is included in her estate' },
          { id: 'C', text: 'Nothing is included—the gift was completed' },
          { id: 'D', text: 'Hana must return the funds to the estate' }
        ],
        correctOptionId: 'B',
        explanation: `**Superfunding and Early Death:**

**The 5-year election rule:**
- Donor elects to treat $90,000 as $18,000/year over 5 years
- Must file Form 709 each year
- Gift is "completed" over 5 years, not immediately

**If donor dies during the 5-year period:**
- Portion attributable to years AFTER death is included in estate
- Portion for years already passed is excluded

**Grandmother dies in year 3:**
- Years 1, 2, 3: Already "gifted" = $54,000 (excluded from estate)
- Years 4, 5: NOT yet "gifted" = $36,000 (included in estate)

**Estate planning implication:**
- Superfunding still removes most assets from estate
- Partial inclusion is better than waiting to gift
- Younger donors get more benefit from superfunding

**Note:** The 529 balance doesn't go back to estate—only the unused gift tax exclusion portion is "recaptured."`
      }
    ],
    scoringGuide: `
## Scoring Guide

**6 correct:** Excellent - Strong education planning knowledge
**5 correct:** Good - Review missed concepts
**3-4 correct:** Fair - Focus on 529 rules and strategies
**Below 3:** Significant review needed

## Key Education Planning Takeaways:
1. Project costs with education inflation (5-6% typical)
2. Superfunding allows 5 years of gifts upfront for growth
3. Age-based portfolios automatically adjust risk
4. SECURE 2.0 allows 529-to-Roth rollovers (with limits)
5. Both spouses should contribute to maximize state deductions
6. Superfunding: unused years included in estate if donor dies early
`
  }
];

export default CFP_CASE_STUDIES_BATCH3;

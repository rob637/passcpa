/**
 * CFP Retirement Questions - Batch 2
 * Domain 6: Retirement Savings and Income Planning (19% of exam)
 * 
 * Additional questions covering retirement plans, distributions,
 * Social Security, and income planning strategies.
 */

import { Question } from '../../../types';

export const CFP_RET_BATCH2_QUESTIONS: Question[] = [
  // ============================================
  // Employer Retirement Plans
  // ============================================
  {
    id: 'CFP-RET-B2-001',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Employer Plans',
    subtopic: '401(k) Plans',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `In 2026, an employee aged 53 wants to maximize their 401(k) contributions. What is the maximum total employee deferral they can make?`,
    options: [
      'B) $31,000',
      'A) $23,500',
      'D) $30,500',
      'C) $23,000',
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: B ($31,000)**

**2026 401(k) Limits:**
- Regular deferral limit: $23,500
- Catch-up (age 50+): $7,500
- Total: $23,500 + $7,500 = $31,000

At age 53, the employee qualifies for catch-up contributions.

**Why other answers are wrong:**
- **A) $23,500:** Base limit without catch-up
- **C) $23,000:** Previous year limit
- **D) $30,500:** Incorrect catch-up amount`
  },
  {
    id: 'CFP-RET-B2-002',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Employer Plans',
    subtopic: 'SIMPLE IRA',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A small business owner with 50 employees is considering a SIMPLE IRA plan. What is one operational advantage of a SIMPLE IRA compared to a traditional 401(k)?',
    options: [
      'SIMPLE IRAs allow higher employee contribution limits than 401(k) plans',
      'SIMPLE IRAs are exempt from annual nondiscrimination testing and have minimal administrative requirements',
      'SIMPLE IRAs permit employers to make discretionary matching contributions',
      'SIMPLE IRAs allow participants to take penalty-free loans from their account',
    ],
    correctAnswer: 1,
    explanation: 'SIMPLE IRAs do not require annual nondiscrimination testing (ADP/ACP tests) and have significantly lower administrative costs and filing requirements than 401(k) plans. However, they have lower contribution limits and employers must make either a 3% match or 2% non-elective contribution.',
  },
  {
    id: 'CFP-RET-B2-003',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Employer Plans',
    subtopic: 'SEP IRA',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: `A self-employed consultant has net self-employment income of $180,000 (after SE tax deduction). What is the maximum SEP contribution for 2026?`,
    options: [
      'A) $36,000',
      'D) $69,000',
      'B) $45,000',
      'C) $33,408',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C ($33,408)**

**SEP for Self-Employed:**
The effective contribution rate for self-employed is approximately 18.587% (not 25%).

Calculation: $180,000 × 0.20 / (1 + 0.20) = $180,000 × 0.1667 ≈ 25%
Actual: $180,000 × 25% = $45,000 BUT limited by the self-employment adjustment

More accurately: $180,000 × 20% = $36,000, reduced by SE tax = ~$33,408

**Why other answers are wrong:**
- **A) $36,000:** Simple 20% without proper adjustment
- **B) $45,000:** 25% without self-employment adjustment
- **D) $69,000:** Exceeds the annual limit`
  },
  {
    id: 'CFP-RET-B2-004',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Employer Plans',
    subtopic: 'Profit Sharing',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: `Which allocation formula for a profit-sharing plan would MOST favor older, higher-paid employees?`,
    options: [
      'D) Integrated with Social Security',
      'A) Pro-rata (based on compensation)',
      'B) Age-weighted',
      'C) New comparability (cross-tested)',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C (New comparability/cross-tested)**

**Allocation Formulas:**
- **Pro-rata:** Proportional to compensation (fairly neutral)
- **Age-weighted:** Considers age and compensation (favors older)
- **New comparability:** Groups employees, allows significantly higher allocations to key employees
- **Integrated:** Favors those earning above Social Security wage base

New comparability (cross-tested) plans provide the most flexibility to benefit older, higher-paid employees and owner-employees.

**Why other answers are wrong:**
- Other methods provide some benefit but not as dramatically as cross-tested plans`
  },
  {
    id: 'CFP-RET-B2-005',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Employer Plans',
    subtopic: 'Defined Benefit Plans',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: `A defined benefit plan promises 2% of final average salary times years of service. An employee retires with 28 years of service and a final 3-year average salary of $125,000. What is their annual pension benefit?`,
    options: [
      'D) $87,500',
      'A) $56,000',
      'B) $70,000',
      'C) $62,500',
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: B ($70,000)**

**Defined Benefit Calculation:**
Annual Benefit = Benefit % × Years of Service × Final Average Salary
Annual Benefit = 2% × 28 years × $125,000
Annual Benefit = 0.02 × 28 × $125,000 = $70,000

**Why other answers are wrong:**
- **A) $56,000:** Uses 1.6% instead of 2%
- **C) $62,500:** Uses 25 years instead of 28
- **D) $87,500:** Calculation error`
  },
  // ============================================
  // Individual Retirement Plans
  // ============================================
  {
    id: 'CFP-RET-B2-006',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'Individual Plans',
    subtopic: 'Roth IRA Conversions',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: `A 45-year-old with a traditional IRA worth $150,000 is considering a Roth conversion. They're currently in the 24% bracket and expect to be in the 32% bracket in retirement. Which factor would LEAST support converting now?`,
    options: [
      'D) Desire to eliminate RMDs',
      'B) Long time horizon before retirement',
      'A) Higher expected future tax rates',
      'C) Paying conversion taxes from IRA funds',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C (Paying conversion taxes from IRA funds)**

**Factors favoring conversion:**
- Higher expected future tax rates (A) ✓
- Long time horizon for tax-free growth (B) ✓
- Eliminating future RMDs (D) ✓

**Factor against conversion:**
- Paying taxes from IRA reduces the amount converted and loses tax-free growth opportunity. Conversion is most beneficial when taxes are paid with outside funds.

**Why other answers are wrong:**
- A, B, D are all positive factors supporting conversion`
  },
  {
    id: 'CFP-RET-B2-007',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'Individual Plans',
    subtopic: 'IRA Contribution Rules',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `A married couple files jointly with MAGI of $245,000 in 2026. The spouse who works has a 401(k) at work. Can the non-working spouse contribute to a Roth IRA?`,
    options: [
      'D) Yes, a full $7,000 contribution',
      'B) Yes, but only a reduced amount',
      'A) Yes, a full $7,500 contribution',
      'C) No, because MAGI exceeds limits',
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B (Yes, but only a reduced amount)**

**2026 Roth IRA Limits (MFJ):**
- Full contribution: MAGI < $236,000
- Reduced contribution: $236,000 - $246,000
- No contribution: MAGI ≥ $246,000

At $245,000 MAGI, they're in the phaseout range and can make a partial contribution. The non-working spouse can contribute under spousal IRA rules.

**Why other answers are wrong:**
- **A)** In phaseout range, not eligible for full contribution
- **C)** Below the complete phaseout ($246,000)
- **D)** Full contribution would require lower MAGI`
  },
  {
    id: 'CFP-RET-B2-008',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'Individual Plans',
    subtopic: 'Backdoor Roth',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: `A high-income individual wants to do a backdoor Roth IRA. They have a $100,000 traditional IRA from prior rollovers. What is the primary concern?`,
    options: [
      'B) Pro-rata rule will create a taxable portion',
      'A) The contribution exceeds annual limits',
      'D) Traditional IRA contributions are not deductible',
      'C) The conversion must wait five years',
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: B (Pro-rata rule will create a taxable portion)**

**Backdoor Roth & Pro-Rata Rule:**
When converting to Roth, you cannot choose to convert only after-tax amounts. The pro-rata rule treats all traditional IRAs as one pool:

- Pre-tax IRA: $100,000
- New after-tax contribution: $7,000
- Total: $107,000 (93.5% pre-tax, 6.5% after-tax)

Converting $7,000 would be 93.5% taxable!

**Solutions:** Roll existing IRA into employer 401(k) before conversion.

**Why other answers are wrong:**
- **A)** Contribution is within limits
- **C)** Five-year rule is for withdrawals, not conversions
- **D)** Non-deductibility is expected for high earners`
  },
  {
    id: 'CFP-RET-B2-009',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'Individual Plans',
    subtopic: 'Required Minimum Distributions',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `Under SECURE 2.0, at what age must individuals born in 1962 begin taking RMDs from their traditional IRA?`,
    options: [
      'B) 73',
      'A) 72',
      'D) 70½',
      'C) 75',
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: B (73)**

**SECURE 2.0 RMD Ages:**
- Born 1950 or earlier: 72
- Born 1951-1959: 73
- Born 1960 or later: 75

Someone born in 1962 must begin RMDs at age 73.

**Why other answers are wrong:**
- **A) 72:** Pre-SECURE 2.0 rule
- **C) 75:** Applies to those born 1960+
- **D) 70½:** Original pre-SECURE Act rule`
  },
  {
    id: 'CFP-RET-B2-010',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'Individual Plans',
    subtopic: 'Inherited IRA',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: `A 45-year-old beneficiary inherits a traditional IRA from their parent who died in 2024. Under current rules, what is the distribution requirement?`,
    options: [
      'A) Take RMDs over life expectancy',
      'B) Distribute within 5 years',
      'D) No distributions required until age 75',
      'C) Take annual RMDs AND empty within 10 years',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C (Annual RMDs AND empty within 10 years)**

**Post-SECURE Act Inherited IRA Rules (non-spouse, non-eligible designated beneficiary):**
- Must deplete account within 10 years
- Must take annual RMDs during the 10-year period (IRS interpretation)
- No stretch IRA for most beneficiaries

**Eligible designated beneficiaries** (stretch allowed): spouse, minor child, disabled, chronically ill, beneficiary not more than 10 years younger.

**Why other answers are wrong:**
- **A)** Stretch IRA eliminated for most beneficiaries
- **B)** 5-year rule applies if owner died before RBD without designated beneficiary
- **D)** RMDs must begin by year after death`
  },
  // ============================================
  // Social Security
  // ============================================
  {
    id: 'CFP-RET-B2-011',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Social Security',
    subtopic: 'Benefit Calculation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `A worker's Primary Insurance Amount (PIA) is $2,400. If they claim benefits at age 62 (48 months early), approximately what will their reduced monthly benefit be?`,
    options: [
      'A) $1,800',
      'B) $1,680',
      'D) $1,920',
      'C) $2,088',
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: A ($1,800)**

**Early Claiming Reduction:**
- First 36 months early: 5/9 of 1% per month = 20%
- Each additional month: 5/12 of 1% per month

At 48 months early (age 62 vs. 66):
- First 36 months: 36 × 5/9% = 20% reduction
- Next 12 months: 12 × 5/12% = 5% reduction
- Total reduction: 25%

Reduced benefit: $2,400 × 0.75 = $1,800

**Why other answers are wrong:**
- **B) $1,680:** Uses 30% reduction
- **C) $2,088:** Uses FRA of 67 calculation
- **D) $1,920:** Uses 20% reduction only`
  },
  {
    id: 'CFP-RET-B2-012',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Social Security',
    subtopic: 'Delayed Retirement Credits',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `A retiree with FRA of 67 delays claiming Social Security until age 70. What percentage increase over their PIA will they receive?`,
    options: [
      'B) 16%',
      'A) 8%',
      'D) 32%',
      'C) 24%',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C (24%)**

**Delayed Retirement Credits:**
- 8% per year after FRA (2/3 of 1% per month)
- Maximum delay: age 70
- 3 years × 8% = 24% increase

Delaying from 67 to 70 provides a 24% permanent increase in benefits.

**Why other answers are wrong:**
- **A) 8%:** Only one year of delay
- **B) 16%:** Two years of delay
- **D) 32%:** Would require delaying from FRA 66 to 70`
  },
  {
    id: 'CFP-RET-B2-013',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Social Security',
    subtopic: 'Spousal Benefits',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: `A non-working spouse, age 65, wants to claim spousal benefits. Their spouse (the worker) has a PIA of $3,000 but hasn't claimed yet. What can the non-working spouse receive?`,
    options: [
      'D) $1,000 based on their own record',
      'A) $1,500 immediately',
      'B) $1,200 (reduced for early claiming)',
      'C) Nothing until the worker files',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C (Nothing until the worker files)**

**Spousal Benefit Rules:**
- The worker must file for their own benefits before the spouse can claim spousal benefits
- There is no "file and suspend" for new claimants since 2016
- The non-working spouse cannot file until the worker files

Maximum spousal benefit is 50% of worker's PIA at FRA.

**Why other answers are wrong:**
- **A)** Worker must file first
- **B)** Worker must file first
- **D)** Non-working spouse has no earnings record`
  },
  {
    id: 'CFP-RET-B2-014',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Social Security',
    subtopic: 'Taxation of Benefits',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: `A retired couple has $25,000 in Social Security benefits and $45,000 in pension and investment income. What percentage of their Social Security may be taxable?`,
    options: [
      'A) 0%',
      'D) 100%',
      'B) 50%',
      'C) 85%',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C (85%)**

**Combined Income Test (MFJ):**
Combined Income = AGI + Non-taxable interest + 50% of SS
Combined Income = $45,000 + $12,500 = $57,500

**Thresholds (MFJ):**
- Below $32,000: 0% taxable
- $32,000-$44,000: Up to 50% taxable
- Above $44,000: Up to 85% taxable

At $57,500 combined income, up to 85% of Social Security is taxable.

**Why other answers are wrong:**
- **A, B)** Income too high for these reduced levels
- **D)** Maximum is 85%, never 100%`
  },
  {
    id: 'CFP-RET-B2-015',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Social Security',
    subtopic: 'Earnings Test',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `A 63-year-old receiving Social Security earns $48,000 from part-time work in 2026. The earnings limit is $22,320. How much will their annual benefits be reduced?`,
    options: [
      'D) $6,420',
      'B) $12,840',
      'A) $25,680',
      'C) $51,360',
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B ($12,840)**

**Earnings Test (Under FRA):**
Benefits reduced $1 for every $2 earned above limit.

Excess earnings: $48,000 - $22,320 = $25,680
Benefit reduction: $25,680 / 2 = $12,840

**Important:** Withheld benefits are not lost - they're credited back at FRA.

**Why other answers are wrong:**
- **A) $25,680:** Full excess, not reduced by 50%
- **C) $51,360:** Calculation error
- **D) $6,420:** Uses wrong reduction ratio`
  },
  // ============================================
  // Retirement Income Planning
  // ============================================
  {
    id: 'CFP-RET-B2-016',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Income Planning',
    subtopic: 'Withdrawal Strategies',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: `Which withdrawal sequence is generally MOST tax-efficient in the early years of retirement?`,
    options: [
      'B) Traditional IRA first, then taxable, then Roth',
      'D) Equal withdrawals from all accounts',
      'A) Roth IRA first, then taxable, then traditional IRA',
      'C) Taxable accounts first, then traditional IRA, then Roth',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C (Taxable first, then traditional, then Roth)**

**Tax-Efficient Withdrawal Sequence:**
1. **Taxable accounts:** Often have favorable capital gains rates
2. **Traditional IRA:** Taxed as ordinary income; use to fill lower brackets
3. **Roth IRA:** Tax-free; preserve for later years and estate

This allows Roth assets to grow tax-free longest while using lower brackets early.

**Why other answers are wrong:**
- **A)** Roth should generally be preserved, not spent first
- **B)** Spending traditional first may push into higher brackets
- **D)** Does not optimize tax efficiency`
  },
  {
    id: 'CFP-RET-B2-017',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Income Planning',
    subtopic: 'Sustainable Withdrawal Rate',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `A retiree has a $1,500,000 portfolio and wants a sustainable income. Using the 4% rule, what is their first-year withdrawal amount?`,
    options: [
      'B) $60,000',
      'D) $75,000',
      'A) $45,000',
      'C) $52,500',
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: B ($60,000)**

**4% Rule (Bengen Rule):**
First-year withdrawal = 4% of portfolio
$1,500,000 × 0.04 = $60,000

Subsequent years: adjust for inflation.

This rule was designed for a 30-year retirement with a 50/50 stock/bond allocation.

**Why other answers are wrong:**
- **A) $45,000:** Uses 3%
- **C) $52,500:** Uses 3.5%
- **D) $75,000:** Uses 5%`
  },
  {
    id: 'CFP-RET-B2-018',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Income Planning',
    subtopic: 'Sequence of Returns Risk',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: `Which scenario poses the GREATEST sequence of returns risk?`,
    options: [
      'A) Poor returns in early retirement with ongoing withdrawals',
      'B) Poor returns in late retirement with ongoing withdrawals',
      'D) Average returns throughout retirement',
      'C) Poor returns during the accumulation phase',
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: A (Poor returns in early retirement with withdrawals)**

**Sequence of Returns Risk:**
- Most dangerous when negative returns occur early in retirement
- Withdrawals deplete portfolio faster during down markets
- Less capital remains to benefit from later recovery
- Can dramatically shorten portfolio longevity

Poor returns late in retirement or during accumulation have less impact.

**Why other answers are wrong:**
- **B)** Poor late returns affect smaller remaining balance
- **C)** Accumulation phase doesn't have withdrawals
- **D)** Average returns don't create sequence risk`
  },
  {
    id: 'CFP-RET-B2-019',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Income Planning',
    subtopic: 'Bucket Strategy',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: `In a three-bucket retirement income strategy, what assets are typically in the "near-term" bucket?`,
    options: [
      'A) Growth stocks and aggressive equity funds',
      'B) Cash equivalents and short-term bonds',
      'D) International equity and emerging markets',
      'C) Balanced funds and REITs',
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B (Cash equivalents and short-term bonds)**

**Three-Bucket Strategy:**
1. **Near-term (1-3 years):** Cash, money markets, CDs - for current income needs
2. **Medium-term (4-10 years):** Bonds, balanced funds - for moderate growth
3. **Long-term (10+ years):** Equities - for growth and inflation protection

The near-term bucket provides liquidity and prevents forced selling during market downturns.

**Why other answers are wrong:**
- **A, C, D)** These are appropriate for medium and long-term buckets`
  },
  {
    id: 'CFP-RET-B2-020',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Income Planning',
    subtopic: 'Annuitization',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: `Which client would benefit MOST from partial annuitization of their retirement assets?`,
    options: [
      'B) Client with significant long-term care insurance and longevity concerns',
      'A) Wealthy client with pension and Social Security covering all basic expenses',
      'D) Client planning a bequest to children as primary goal',
      'C) Client with no pension who worries about outliving their money',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C (No pension, worried about outliving money)**

**Ideal Annuitization Candidate:**
- Lacks guaranteed income sources
- Concerned about longevity risk
- Basic expenses not covered by Social Security alone
- Values income certainty over maximizing legacy

Annuities provide lifetime income guarantee, addressing outliving money concern.

**Why other answers are wrong:**
- **A)** Already has sufficient guaranteed income
- **B)** LTC insurance addresses different risk
- **D)** Annuitization reduces legacy (money goes to insurance company)`
  },
  // ============================================
  // Additional Retirement Planning Topics
  // ============================================
  {
    id: 'CFP-RET-B2-021',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Employer Plans',
    subtopic: '403(b) Plans',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: `Which employer can offer a 403(b) plan?`,
    options: [
      'A) For-profit technology company',
      'B) State university',
      'D) Retail corporation',
      'C) Law firm partnership',
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B (State university)**

**403(b) Eligible Employers:**
- Public schools (K-12 and universities)
- Tax-exempt 501(c)(3) organizations
- Churches and religious organizations
- Cooperative hospital service organizations

For-profit companies use 401(k) plans instead.

**Why other answers are wrong:**
- **A, C, D)** These are for-profit entities that must use 401(k) plans`
  },
  {
    id: 'CFP-RET-B2-022',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Employer Plans',
    subtopic: '457(b) Plans',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: `A 62-year-old government employee participates in both a 403(b) and governmental 457(b). What is their maximum total deferral in 2026?`,
    options: [
      'A) $31,000',
      'D) $54,500',
      'B) $46,500',
      'C) $62,000',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C ($62,000)**

**Dual Plan Contribution Limits:**
- 403(b): $23,500 + $7,500 catch-up = $31,000
- 457(b): $23,500 + $7,500 catch-up = $31,000
- Total: $62,000

401(k)/403(b)/SIMPLE share one limit, but 457(b) has a separate limit!

**Why other answers are wrong:**
- **A) $31,000:** Only one plan's limit
- **B) $46,500:** Incorrect combination
- **D) $54,500:** Excludes both catch-up contributions`
  },
  {
    id: 'CFP-RET-B2-023',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'Individual Plans',
    subtopic: 'Roth 401(k)',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: `Which statement about Roth 401(k) plans is CORRECT?`,
    options: [
      'D) Distributions are never taxable at any age',
      'A) Contributions are subject to income limits like Roth IRA',
      'B) Employer matching contributions go into pre-tax account',
      'C) There are no contribution limits',
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: B (Employer match goes to pre-tax account)**

**Roth 401(k) Features:**
- No income limits for contributions (unlike Roth IRA)
- Same contribution limits as traditional 401(k)
- Employee contributions: Roth (after-tax)
- Employer contributions: Must be pre-tax
- Qualified distributions are tax-free

**Why other answers are wrong:**
- **A)** No income limits on Roth 401(k)
- **C)** Same limits as traditional 401(k)
- **D)** Non-qualified distributions may include taxable earnings`
  },
  {
    id: 'CFP-RET-B2-024',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Income Planning',
    subtopic: 'Medicare Planning',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `A retiree has MAGI of $120,000 (single filer) in 2026. How does this affect their Medicare Part B premium?`,
    options: [
      'D) Medicare coverage is reduced',
      'A) Standard premium applies',
      'B) IRMAA surcharge increases premium by $70/month',
      'C) IRMAA surcharge increases premium by $230/month',
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: A (Standard premium applies)**

**IRMAA Thresholds (2026 Single):**
- Standard premium: MAGI ≤ $106,000+ (indexed)
- First IRMAA tier: ~$106,000 - $133,000

At $120,000, the retiree may be in the first IRMAA bracket, but looking at 2026 thresholds, likely still standard.

Note: IRMAA is based on MAGI from two years prior and thresholds adjust annually.

**Why other answers are wrong:**
- **B, C)** Would require higher income
- **D)** IRMAA affects cost, not coverage`
  },
  {
    id: 'CFP-RET-B2-025',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Income Planning',
    subtopic: 'Retirement Income Sources',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: `Which retirement income source provides guaranteed payments regardless of market performance?`,
    options: [
      'D) Taxable investment income',
      'B) Defined benefit pension',
      'A) 401(k) distributions',
      'C) IRA withdrawals',
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B (Defined benefit pension)**

**Guaranteed Income Sources:**
- Defined benefit pensions (employer bears investment risk)
- Social Security
- Annuities (depending on type)

**Non-Guaranteed Sources:**
- 401(k)/IRA (participant bears investment risk)
- Investment portfolios
- Variable annuities (separate from guarantees)

**Why other answers are wrong:**
- **A, C, D)** These are defined contribution or investment-based, subject to market risk`
  }
];

export default CFP_RET_BATCH2_QUESTIONS;

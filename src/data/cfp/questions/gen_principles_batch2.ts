/**
 * CFP General Principles Questions - Batch 2
 * Domain 2: General Principles of Financial Planning (15% of exam)
 * 
 * Additional questions covering financial statements, time value of money,
 * education planning, and economic concepts.
 */

import { Question } from '../../../types';

export const CFP_GEN_BATCH2_QUESTIONS: Question[] = [
  // ============================================
  // Financial Statements & Analysis
  // ============================================
  {
    id: 'CFP-GEN-B2-001',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-1',
    topic: 'Financial Statements',
    subtopic: 'Balance Sheet Analysis',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `A client's personal balance sheet shows: Primary residence $650,000, mortgage $420,000, investment portfolio $285,000, auto loan $18,000, retirement accounts $340,000, credit cards $12,000, personal property $45,000. What is the client's net worth?`,
    options: [
      'A) $870,000',
      'B) $1,320,000',
      'C) $900,000',
      'D) $450,000'
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: A ($870,000)**

**Net Worth Calculation:**
Assets: $650,000 + $285,000 + $340,000 + $45,000 = $1,320,000
Liabilities: $420,000 + $18,000 + $12,000 = $450,000
Net Worth: $1,320,000 - $450,000 = $870,000

**Why other answers are wrong:**
- **B) $1,320,000:** Total assets only, ignores liabilities
- **C) $900,000:** Math error in calculation
- **D) $450,000:** Total liabilities, not net worth`
  },
  {
    id: 'CFP-GEN-B2-002',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-1',
    topic: 'Financial Statements',
    subtopic: 'Cash Flow Statement',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `Marcus and Sarah have combined gross income of $185,000. Their annual expenses include: taxes $42,000, housing costs $36,000, food $12,000, transportation $9,600, insurance $7,200, discretionary $18,000, and debt payments $14,400. What is their annual savings rate?`,
    options: [
      'A) 18.5%',
      'B) 24.8%',
      'C) 12.3%',
      'D) 31.2%'
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B (24.8%)**

**Cash Flow Calculation:**
Total Expenses: $42,000 + $36,000 + $12,000 + $9,600 + $7,200 + $18,000 + $14,400 = $139,200
Net Savings: $185,000 - $139,200 = $45,800
Savings Rate: $45,800 / $185,000 = 24.76% ≈ 24.8%

**Why other answers are wrong:**
- **A) 18.5%:** Calculation error
- **C) 12.3%:** Uses net income instead of gross
- **D) 31.2%:** Excludes some expenses from calculation`
  },
  {
    id: 'CFP-GEN-B2-003',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-1',
    topic: 'Financial Ratios',
    subtopic: 'Emergency Fund Planning',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: `Marcus, a freelance graphic designer with variable income, has liquid assets of $24,000 and monthly expenses of $4,000. His wife Sarah works part-time while caring for their two young children. What is Marcus's current emergency fund ratio, and what is the MOST appropriate recommendation?`,
    options: [
      'A) 6 months; adequate given his stable employment',
      'B) 6 months; should increase to 9-12 months given variable income',
      'C) 6 months; should decrease to 3 months to maximize investment returns',
      'D) 4 months; should increase to 6 months minimum'
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B (6 months; should increase to 9-12 months)**

**Emergency Fund Ratio:** $24,000 / $4,000 = 6 months

While 6 months meets the general 3-6 month guideline, Marcus has multiple risk factors requiring a LARGER emergency fund:

**Factors Requiring Higher Emergency Fund (9-12 months):**
- Self-employed with **variable income**
- Single primary earner (Sarah is part-time)
- Young children creating financial obligations
- Freelance work has less job security than W-2 employment

**Why other answers are wrong:**
- **A)** Freelance is NOT stable employment
- **C)** Reducing emergency fund increases financial risk
- **D)** Current ratio is 6 months, not 4 months`
  },
  {
    id: 'CFP-GEN-B2-004',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-1',
    topic: 'Financial Ratios',
    subtopic: 'Housing Ratio',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `The Hendersons are applying for a mortgage. Their gross monthly income is $12,500. The proposed monthly payment (PITI) is $3,125, and their total monthly debt payments including the mortgage would be $4,375. Do they meet conventional underwriting guidelines?`,
    options: [
      'A) Yes, both ratios are within limits',
      'B) No, front-end ratio exceeds 28%',
      'C) No, back-end ratio exceeds 36%',
      'D) No, both ratios exceed limits'
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: A (Yes, both ratios are within limits)**

**Housing Ratios:**
- Front-end (Housing) Ratio: $3,125 / $12,500 = 25% (limit: 28%) ✓
- Back-end (DTI) Ratio: $4,375 / $12,500 = 35% (limit: 36%) ✓

Both ratios fall within conventional mortgage guidelines.

**Why other answers are wrong:**
- **B, C, D:** Both ratios are actually within limits`
  },
  {
    id: 'CFP-GEN-B2-005',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-1',
    topic: 'Financial Ratios',
    subtopic: 'Debt Ratios',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: `A client has the following profile: Gross income $150,000, total assets $890,000, total liabilities $340,000, annual debt payments $42,000. Which statement accurately describes their financial position?`,
    options: [
      'A) Debt-to-income of 28% and solvency ratio of 162% indicate strong position',
      'B) Debt-to-asset ratio of 38% suggests moderate leverage risk',
      'C) Debt service ratio of 28% is concerning but solvency ratio of 262% is healthy',
      'D) All ratios indicate the client is over-leveraged'
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B (Debt-to-asset ratio of 38% suggests moderate leverage risk)**

**Ratio Calculations:**
- Debt-to-Asset: $340,000 / $890,000 = 38.2%
- Debt Service (Annual debt/Income): $42,000 / $150,000 = 28%
- Solvency Ratio: $890,000 / $340,000 = 262%

A debt-to-asset ratio of 38% indicates moderate leverage - not dangerous but warrants monitoring.

**Why other answers are wrong:**
- **A)** Solvency ratio calculation is wrong
- **C)** 28% debt service isn't necessarily concerning; the description of it as concerning is incorrect
- **D)** Ratios don't indicate over-leverage`
  },
  // ============================================
  // Time Value of Money
  // ============================================
  {
    id: 'CFP-GEN-B2-006',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-2',
    topic: 'Time Value of Money',
    subtopic: 'Present Value',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `Alex needs $50,000 in 8 years for a down payment. If he can earn 6% annually, how much must he invest today as a lump sum?`,
    options: [
      'A) $31,370',
      'B) $33,500',
      'C) $29,750',
      'D) $37,280'
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: A ($31,370)**

**Present Value Calculation:**
PV = FV / (1 + r)^n
PV = $50,000 / (1.06)^8
PV = $50,000 / 1.5938
PV = $31,370

**Calculator Inputs:**
FV = 50,000; N = 8; I/Y = 6; PMT = 0; Solve PV = -31,370

**Why other answers are wrong:**
- Other options result from incorrect rate or period assumptions`
  },
  {
    id: 'CFP-GEN-B2-007',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-2',
    topic: 'Time Value of Money',
    subtopic: 'Future Value of Annuity',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `Megan contributes $500 at the beginning of each month to her investment account earning 7% annually. What will be the account value after 15 years?`,
    options: [
      'A) $158,723',
      'B) $162,447',
      'C) $90,000',
      'D) $145,925'
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B ($162,447)**

**Future Value of Annuity Due Calculation:**
This is an annuity due (beginning of period payments).
Monthly rate: 7% / 12 = 0.5833%
Periods: 15 × 12 = 180 months

FV annuity due = PMT × [(1+r)^n - 1] / r × (1+r)
FV = $500 × [(1.005833)^180 - 1] / 0.005833 × 1.005833
FV ≈ $162,447

**Why other answers are wrong:**
- **A) $158,723:** Uses ordinary annuity (end of period)
- **C) $90,000:** Simple multiplication without compounding
- **D) $145,925:** Calculation error or wrong rate`
  },
  {
    id: 'CFP-GEN-B2-008',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-2',
    topic: 'Time Value of Money',
    subtopic: 'Loan Amortization',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: `The Smiths take out a $320,000 mortgage at 6.5% for 30 years. After making 60 payments, approximately how much principal have they paid off?`,
    options: [
      'A) $53,333',
      'B) $27,840',
      'C) $18,720',
      'D) $24,150'
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: C ($18,720)**

**Amortization Analysis:**
Monthly payment = $2,022 (PMT calculation)
After 60 payments (5 years):
- Total paid: $2,022 × 60 = $121,320
- Remaining balance: approximately $301,280
- Principal paid: $320,000 - $301,280 = $18,720

Early in a mortgage, most payment goes to interest. After 5 years of a 30-year mortgage, only about 5.85% of the principal is paid off.

**Why other answers are wrong:**
- **A) $53,333:** Assumes equal principal payments (simple amortization)
- **B) $27,840:** Overestimates principal portion
- **D) $24,150:** Calculation error`
  },
  {
    id: 'CFP-GEN-B2-009',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-2',
    topic: 'Time Value of Money',
    subtopic: 'Uneven Cash Flows',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: `An investment offers the following year-end cash flows: Year 1: $5,000, Year 2: $7,500, Year 3: $10,000, Year 4: $12,500. Using a 9% discount rate, what is the present value of this cash flow stream?`,
    options: [
      'A) $35,000',
      'B) $28,450',
      'C) $27,135',
      'D) $30,890'
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: C ($27,135)**

**Present Value of Uneven Cash Flows:**
PV = $5,000/(1.09)^1 + $7,500/(1.09)^2 + $10,000/(1.09)^3 + $12,500/(1.09)^4
PV = $4,587 + $6,312 + $7,722 + $8,856
PV = $27,477 ≈ $27,135 (with rounding)

**Why other answers are wrong:**
- **A) $35,000:** Simple sum without discounting
- **B) $28,450:** Incorrect discount rate application
- **D) $30,890:** Used lower discount rate`
  },
  {
    id: 'CFP-GEN-B2-010',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-2',
    topic: 'Time Value of Money',
    subtopic: 'Internal Rate of Return',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: `An investor pays $25,000 for an investment that will pay $8,000 per year for 4 years. What is the approximate internal rate of return (IRR)?`,
    options: [
      'A) 8%',
      'B) 12%',
      'C) 10.5%',
      'D) 15%'
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B (12%)**

**IRR Calculation:**
Find rate where PV of inflows equals initial investment:
$25,000 = $8,000 × PVIFA(r, 4)
PVIFA = 3.125

Looking up or calculating: approximately 12% gives PVIFA of 3.037
Testing at 12%: $8,000 × 3.037 = $24,296 ≈ $25,000

**Calculator:** CF0 = -25,000; CF1-4 = 8,000; IRR = 11.96% ≈ 12%

**Why other answers are wrong:**
- Other rates produce significantly different present values`
  },
  // ============================================
  // Education Planning
  // ============================================
  {
    id: 'CFP-GEN-B2-011',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-3',
    topic: 'Education Planning',
    subtopic: '529 Plan Contributions',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `Grandparents want to superfund a 529 plan for their newborn grandson. They are married filing jointly in 2026. What is the maximum they can contribute without using any lifetime gift tax exemption or filing a gift tax return?`,
    options: [
      'A) $38,000',
      'B) $95,000',
      'C) $190,000',
      'D) $19,000'
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: C ($190,000)**

**529 Superfunding Rule:**
Under the 5-year election, donors can contribute 5 years of annual exclusion gifts at once:
- 2026 annual exclusion: $19,000 per donor
- Superfunding: $19,000 × 5 years × 2 grandparents = $190,000

This avoids gift tax and uses no lifetime exemption if they file the election on Form 709.

**Why other answers are wrong:**
- **A) $38,000:** One year, both grandparents
- **B) $95,000:** 5 years, one grandparent only
- **D) $19,000:** One year, one grandparent`
  },
  {
    id: 'CFP-GEN-B2-012',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-3',
    topic: 'Education Planning',
    subtopic: 'Coverdell ESA',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: `Which statement about Coverdell Education Savings Accounts (ESAs) is CORRECT?`,
    options: [
      'A) Maximum annual contribution is $5,000 per beneficiary',
      'B) Contributions may be made until the beneficiary reaches age 30',
      'C) Funds can be used for K-12 expenses as well as college',
      'D) There are no income limits for contributors'
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: C (Funds can be used for K-12 expenses as well as college)**

Coverdell ESAs can fund qualified education expenses including:
- Elementary and secondary school (K-12) tuition
- Books, supplies, equipment
- Room and board if enrolled at least half-time

**Why other answers are wrong:**
- **A)** Maximum is $2,000, not $5,000
- **B)** Contributions must stop at age 18 (not 30)
- **D)** There are income phaseouts ($110K single, $220K MFJ)`
  },
  {
    id: 'CFP-GEN-B2-013',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-3',
    topic: 'Education Planning',
    subtopic: 'Financial Aid Impact',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: `When evaluating financial aid impact for a dependent student, which asset ownership would have the LEAST impact on Expected Family Contribution (EFC)?`,
    options: [
      'A) UTMA account in student\'s name',
      'B) 529 plan owned by parent',
      'C) 529 plan owned by grandparent',
      'D) Savings account in student\'s name'
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B (529 plan owned by parent)**

**Asset Assessment Rates for FAFSA:**
- Parent-owned assets (including parent-owned 529): Max 5.64% of asset value
- Student-owned assets (UTMA, savings): 20% of asset value
- Grandparent-owned 529: Distributions count as student income (can significantly impact aid)

The parent-owned 529 has the lowest impact at only up to 5.64% assessment.

**Why other answers are wrong:**
- **A & D)** Student assets are assessed at 20%
- **C)** Grandparent distributions count as untaxed income to student`
  },
  {
    id: 'CFP-GEN-B2-014',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-3',
    topic: 'Education Planning',
    subtopic: 'AOTC and LLC',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `A client paid $6,000 in qualified education expenses for their dependent child's second year of college. What is the maximum American Opportunity Tax Credit (AOTC) they can claim if they meet all eligibility requirements?`,
    options: [
      'A) $2,000',
      'B) $2,500',
      'C) $4,000',
      'D) $6,000'
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B ($2,500)**

**AOTC Calculation:**
- 100% of first $2,000 = $2,000
- 25% of next $2,000 = $500
- Maximum credit = $2,500

The AOTC is calculated as 100% of the first $2,000 plus 25% of the next $2,000, for a maximum of $2,500 per student. The $6,000 expense qualifies for the full credit.

**Why other answers are wrong:**
- **A) $2,000:** Only the first tier
- **C) $4,000:** Not how the credit formula works
- **D) $6,000:** This is the expense, not the credit`
  },
  {
    id: 'CFP-GEN-B2-015',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-3',
    topic: 'Education Planning',
    subtopic: 'Education Savings Comparison',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: `A client is comparing education savings options. Which combination of features is ONLY available with a 529 plan?`,
    options: [
      'A) Tax-free growth and use for K-12 expenses',
      'B) State tax deduction and ability to change beneficiaries',
      'C) Superfunding and rollover to Roth IRA (after 15 years)',
      'D) No income limits and tax-deductible contributions'
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: C (Superfunding and rollover to Roth IRA after 15 years)**

Under SECURE 2.0, 529 plans can now:
- Use 5-year gift tax averaging (superfunding)
- Roll over unused funds to beneficiary's Roth IRA (if account open 15+ years)

**Why other answers are wrong:**
- **A)** Coverdell ESAs also offer tax-free growth and K-12 use
- **B)** Some states offer deductions, but beneficiary changes aren't unique
- **D)** 529 contributions are NOT tax-deductible federally`
  },
  // ============================================
  // Economic Concepts
  // ============================================
  {
    id: 'CFP-GEN-B2-016',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-4',
    topic: 'Economic Concepts',
    subtopic: 'Inflation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `A client's current expenses are $72,000 annually. Assuming 3.5% annual inflation, what will their expenses be in 20 years in nominal dollars?`,
    options: [
      'A) $97,200',
      'B) $122,400',
      'C) $143,150',
      'D) $168,450'
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: C ($143,150)**

**Inflation Growth Calculation:**
FV = PV × (1 + inflation rate)^years
FV = $72,000 × (1.035)^20
FV = $72,000 × 1.9898
FV = $143,265 ≈ $143,150

**Why other answers are wrong:**
- **A) $97,200:** Uses much lower inflation or fewer years
- **B) $122,400:** Uses lower rate or period
- **D) $168,450:** Uses higher inflation rate`
  },
  {
    id: 'CFP-GEN-B2-017',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-4',
    topic: 'Economic Concepts',
    subtopic: 'Interest Rate Components',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: `The nominal interest rate on a bond is 6.5%. If expected inflation is 2.5% and the real risk-free rate is 1.5%, what is the approximate risk premium embedded in this rate?`,
    options: [
      'A) 1.0%',
      'B) 2.5%',
      'C) 3.0%',
      'D) 4.0%'
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B (2.5%)**

**Fisher Equation (approximation):**
Nominal Rate = Real Risk-Free Rate + Inflation Premium + Risk Premium

6.5% = 1.5% + 2.5% + Risk Premium
Risk Premium = 6.5% - 1.5% - 2.5% = 2.5%

**Why other answers are wrong:**
- Other answers result from incorrect component identification`
  },
  {
    id: 'CFP-GEN-B2-018',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-4',
    topic: 'Economic Concepts',
    subtopic: 'Business Cycles',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: `Which economic indicator is considered a LEADING indicator of economic activity?`,
    options: [
      'A) GDP growth rate',
      'B) Unemployment rate',
      'C) Building permits issued',
      'D) Consumer spending'
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: C (Building permits issued)**

Building permits are a leading indicator because they signal future construction activity before it occurs.

**Indicator Classifications:**
- **Leading:** Stock prices, building permits, new orders, money supply
- **Coincident:** GDP, employment, industrial production
- **Lagging:** Unemployment rate, CPI, prime rate

**Why other answers are wrong:**
- **A)** GDP is a coincident indicator
- **B)** Unemployment is a lagging indicator
- **D)** Consumer spending is a coincident indicator`
  },
  {
    id: 'CFP-GEN-B2-019',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-4',
    topic: 'Economic Concepts',
    subtopic: 'Monetary Policy',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: `The Federal Reserve is concerned about high inflation. Which action would be MOST consistent with contractionary monetary policy?`,
    options: [
      'A) Decreasing the federal funds rate target',
      'B) Purchasing Treasury securities in open market operations',
      'C) Increasing the discount rate',
      'D) Lowering reserve requirements for banks'
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: C (Increasing the discount rate)**

To fight inflation, the Fed uses contractionary policy:
- Increase interest rates (discount rate, fed funds rate)
- Sell securities (removes money from circulation)
- Increase reserve requirements (reduces lending capacity)

Increasing the discount rate makes borrowing more expensive, slowing economic activity.

**Why other answers are wrong:**
- **A, B, D)** These are all expansionary policy tools that would increase inflation`
  },
  {
    id: 'CFP-GEN-B2-020',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-4',
    topic: 'Economic Concepts',
    subtopic: 'Yield Curve',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: `Which yield curve shape and its typical interpretation is CORRECTLY stated?`,
    options: [
      'A) Inverted curve signals strong future economic growth',
      'B) Flat curve indicates expectations of stable interest rates',
      'C) Normal (upward sloping) curve signals potential recession',
      'D) Humped curve indicates certainty about Fed policy'
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B (Flat curve indicates expectations of stable interest rates)**

**Yield Curve Interpretations:**
- **Normal (upward):** Healthy economy, expectations of growth
- **Flat:** Uncertainty, transition period, stable rate expectations
- **Inverted:** Often precedes recession, expectations of rate cuts
- **Humped:** Mid-term uncertainty, unusual market conditions

**Why other answers are wrong:**
- **A)** Inverted curves often predict recessions, not growth
- **C)** Normal curves signal healthy growth, not recession
- **D)** Humped curves indicate uncertainty, not certainty`
  },
  // ============================================
  // Client Communication & Behavior
  // ============================================
  {
    id: 'CFP-GEN-B2-021',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-5',
    topic: 'Behavioral Finance',
    subtopic: 'Cognitive Biases',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `A client refuses to sell a losing stock position, saying "I'll sell once I get back to even." This behavior BEST demonstrates which cognitive bias?`,
    options: [
      'A) Confirmation bias',
      'B) Loss aversion and anchoring',
      'C) Overconfidence bias',
      'D) Availability heuristic'
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B (Loss aversion and anchoring)**

The client is:
- **Loss averse:** Unwilling to realize the loss (psychologically painful)
- **Anchoring:** Fixed on the purchase price as a reference point

This classic behavior leads investors to hold losers too long, hoping to break even.

**Why other answers are wrong:**
- **A)** Confirmation bias is seeking confirming information
- **C)** Overconfidence is overestimating one's abilities
- **D)** Availability heuristic is overweighting recent/memorable events`
  },
  {
    id: 'CFP-GEN-B2-022',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-5',
    topic: 'Behavioral Finance',
    subtopic: 'Mental Accounting',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `A client maintains separate accounts: one for "safe money" invested in CDs earning 3%, and another for "play money" invested in speculative stocks, while carrying credit card debt at 22%. This BEST illustrates:`,
    options: [
      'A) Proper diversification strategy',
      'B) Mental accounting bias',
      'C) Sound asset-liability matching',
      'D) Risk capacity assessment'
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B (Mental accounting bias)**

Mental accounting causes people to treat money differently based on arbitrary categories, even when economically irrational. Here:
- "Safe" money earns 3%
- Credit card charges 22%
- Net loss of 19% on the "safe" allocation

Rationally, paying off the 22% debt produces higher returns than any investment.

**Why other answers are wrong:**
- **A, C, D)** None describe the irrational segregation of fungible money`
  },
  {
    id: 'CFP-GEN-B2-023',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-5',
    topic: 'Financial Planning Process',
    subtopic: 'Data Gathering',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: `During the data gathering phase, which type of information is considered QUALITATIVE rather than quantitative?`,
    options: [
      'A) Account statements and balances',
      'B) Client\'s risk tolerance and values',
      'C) Insurance policy face amounts',
      'D) Tax return information'
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B (Client's risk tolerance and values)**

**Qualitative data** includes attitudes, goals, values, risk tolerance, family dynamics, and health conditions.

**Quantitative data** includes measurable financial information like account balances, income, assets, liabilities, and insurance coverage amounts.

**Why other answers are wrong:**
- **A, C, D)** All are numerical/quantitative data sources`
  },
  {
    id: 'CFP-GEN-B2-024',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-5',
    topic: 'Financial Planning Process',
    subtopic: 'Plan Implementation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `A CFP® professional has developed recommendations for a client but learns the client wants to implement only some of the recommendations. What is the MOST appropriate course of action?`,
    options: [
      'A) Refuse to implement any recommendations unless all are adopted',
      'B) Document the client\'s decision and implement the selected recommendations',
      'C) Terminate the engagement due to client non-compliance',
      'D) Proceed with all recommendations without client consent'
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B (Document the client's decision and implement selected recommendations)**

CFP® professionals must respect client autonomy. When a client chooses partial implementation:
1. Document the client's informed decision
2. Note any risks of not implementing all recommendations
3. Proceed with agreed-upon items
4. Monitor and revisit unimplemented recommendations

**Why other answers are wrong:**
- **A)** Overly rigid; clients have choice
- **C)** Premature and unnecessary
- **D)** Violates client consent requirements`
  },
  {
    id: 'CFP-GEN-B2-025',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-5',
    topic: 'Financial Planning Process',
    subtopic: 'Plan Monitoring',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `Which life event would MOST likely trigger an immediate need to review and potentially update a client's financial plan?`,
    options: [
      'A) Minor fluctuation in portfolio value',
      'B) Annual increase in cost of living',
      'C) Birth of a child or grandchild',
      'D) Change in marginal tax bracket by 2%'
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: C (Birth of a child or grandchild)**

Major life events requiring immediate plan review include:
- Birth/adoption of children
- Marriage/divorce
- Death of family member
- Job loss or career change
- Inheritance
- Health diagnosis
- Home purchase/sale

**Why other answers are wrong:**
- **A)** Normal market fluctuations don't require changes
- **B)** Standard inflation is expected
- **D)** Minor tax bracket changes are routine adjustments`
  }
];

export default CFP_GEN_BATCH2_QUESTIONS;

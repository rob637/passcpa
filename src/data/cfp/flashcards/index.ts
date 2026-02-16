/**
 * CFP Flashcard System
 * Spaced repetition flashcards for key concepts, formulas, and definitions
 * 500+ cards covering all CFP domains
 */

export interface Flashcard {
  id: string;
  domain?: FlashcardDomain;
  category?: string;
  front: string;
  back: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  // Optional properties used by batch files
  section?: string;
  type?: string;
  topic?: string;
}

export type FlashcardDomain = 'GEN' | 'RET' | 'TAX' | 'INV' | 'RISK' | 'EST' | 'PRO' | 'PSY';

// Base/original flashcards
const CFP_FLASHCARDS_BASE: Flashcard[] = [
  // ============================================
  // GENERAL PRINCIPLES (GEN)
  // ============================================
  {
    id: 'FC-GEN-001',
    domain: 'GEN',
    category: 'Time Value of Money',
    front: 'What is the Rule of 72?',
    back: 'Years to double = 72 ÷ Interest Rate\n\nExample: At 8%, money doubles in 9 years (72÷8)',
    difficulty: 'easy',
    tags: ['TVM', 'formula', 'quick-calc']
  },
  {
    id: 'FC-GEN-002',
    domain: 'GEN',
    category: 'Time Value of Money',
    front: 'What is the difference between an ORDINARY ANNUITY and an ANNUITY DUE?',
    back: 'ORDINARY ANNUITY: Payments at END of period (most common)\n\nANNUITY DUE: Payments at BEGINNING of period\n\nAnnuity Due PV = Ordinary Annuity PV × (1+r)',
    difficulty: 'medium',
    tags: ['TVM', 'annuity', 'calculator']
  },
  {
    id: 'FC-GEN-003',
    domain: 'GEN',
    category: 'Financial Planning Process',
    front: 'What are the 7 steps of the CFP financial planning process?',
    back: '1. Understanding client circumstances\n2. Identifying and selecting goals\n3. Analyzing current course & alternatives\n4. Developing recommendations\n5. Presenting recommendations\n6. Implementing recommendations\n7. Monitoring progress and updating',
    difficulty: 'medium',
    tags: ['process', 'standards', 'practice']
  },
  {
    id: 'FC-GEN-004',
    domain: 'GEN',
    category: 'Financial Ratios',
    front: 'What is the recommended EMERGENCY FUND ratio?',
    back: 'Liquid Assets ÷ Monthly Expenses\n\n• Stable income: 3-6 months\n• Variable income: 6-12 months\n• Approaching retirement: 12+ months',
    difficulty: 'easy',
    tags: ['ratio', 'liquidity', 'planning']
  },
  {
    id: 'FC-GEN-005',
    domain: 'GEN',
    category: 'Debt Ratios',
    front: 'What are the HOUSING (front-end) and TOTAL (back-end) debt ratio guidelines?',
    back: 'HOUSING RATIO: PITI ÷ Gross Income ≤ 28%\n\nTOTAL DEBT RATIO: All Debt ÷ Gross Income ≤ 36%\n\nFHA allows 31%/43%',
    difficulty: 'medium',
    tags: ['ratio', 'mortgage', 'qualification']
  },
  {
    id: 'FC-GEN-006',
    domain: 'GEN',
    category: 'Economic Concepts',
    front: 'What is the difference between FISCAL and MONETARY policy?',
    back: 'FISCAL POLICY: Government taxing and spending (Congress/President)\n\nMONETARY POLICY: Money supply and interest rates (Federal Reserve)',
    difficulty: 'easy',
    tags: ['economics', 'policy', 'macro']
  },
  {
    id: 'FC-GEN-007',
    domain: 'GEN',
    category: 'Education Planning',
    front: '529 Plan contribution limits and gift tax treatment?',
    back: '• No federal limit (state limits vary $300K-$500K+)\n• Contributions = completed gifts (gift tax exclusion $19K/2026)\n• 5-year superfunding: Up to $95K at once (5 × $19K)\n• Tax-free growth and qualified withdrawals',
    difficulty: 'medium',
    tags: ['529', 'education', 'gift-tax']
  },
  {
    id: 'FC-GEN-008',
    domain: 'GEN',
    category: 'Education Planning',
    front: 'How are 529 plans treated for FAFSA?',
    back: 'PARENT-OWNED 529:\n• Reported as parent asset\n• Assessed at 5.64% maximum\n\nGRANDPARENT-OWNED 529:\n• NOT reported as asset (FAFSA Simplification Act)\n• Distributions no longer count as student income',
    difficulty: 'hard',
    tags: ['529', 'FAFSA', 'financial-aid']
  },
  {
    id: 'FC-GEN-009',
    domain: 'GEN',
    category: 'NPV/IRR',
    front: 'When should you ACCEPT vs REJECT an investment based on NPV?',
    back: 'NPV > 0: ACCEPT (adds value)\nNPV < 0: REJECT (destroys value)\nNPV = 0: Indifferent (earns exactly required return)\n\nWhen comparing mutually exclusive projects, choose highest NPV.',
    difficulty: 'easy',
    tags: ['NPV', 'capital-budgeting', 'decision']
  },
  {
    id: 'FC-GEN-010',
    domain: 'GEN',
    category: 'NPV/IRR',
    front: 'What is IRR and how do you use it?',
    back: 'IRR = Internal Rate of Return\nThe discount rate that makes NPV = 0\n\nDecision Rule:\n• If IRR > Required Return: Accept\n• If IRR < Required Return: Reject',
    difficulty: 'medium',
    tags: ['IRR', 'capital-budgeting', 'return']
  },

  // ============================================
  // RETIREMENT PLANNING (RET)
  // ============================================
  {
    id: 'FC-RET-001',
    domain: 'RET',
    category: '401(k) Plans',
    front: '2026 401(k) contribution limits?',
    back: 'Employee Elective Deferral: $24,500\nCatch-up (age 50+): +$7,500 = $32,000 total\nSuper catch-up (60-63): +$11,250\n\nTotal Annual Addition (employer + employee): $71,500\nWith catch-up: $79,000',
    difficulty: 'easy',
    tags: ['401k', 'limits', '2026']
  },
  {
    id: 'FC-RET-002',
    domain: 'RET',
    category: 'IRA',
    front: '2026 IRA contribution limits and income phase-outs?',
    back: 'Contribution: $7,500 ($8,500 with catch-up 50+)\n\nTraditional IRA Deduction Phase-out (w/employer plan):\n• Single: $81,000-$91,000\n• MFJ: $129,000-$149,000\n\nRoth IRA Phase-out:\n• Single: $154,000-$169,000\n• MFJ: $240,000-$250,000',
    difficulty: 'hard',
    tags: ['IRA', 'limits', 'phase-out']
  },
  {
    id: 'FC-RET-003',
    domain: 'RET',
    category: 'Social Security',
    front: 'Social Security EARLY claiming reduction vs DELAYED credits?',
    back: 'EARLY (before FRA):\n• 5/9 of 1% per month for first 36 months = 20%\n• 5/12 of 1% per additional month = ~6.67%/year\n• At 62 (FRA 67): 30% reduction\n\nDELAYED (after FRA):\n• 8% per year increase until age 70\n• Maximum: 24% increase at 70',
    difficulty: 'hard',
    tags: ['social-security', 'claiming', 'benefits']
  },
  {
    id: 'FC-RET-004',
    domain: 'RET',
    category: 'RMD',
    front: 'When do RMDs begin for retirement accounts?',
    back: 'Traditional IRA/401(k): Age 73 (born 1951-1959), Age 75 (born 1960+)\n\nRoth IRA: NO RMDs during owner\'s lifetime\n\nRoth 401(k): RMDs required (unless rolled to Roth IRA) - eliminated starting 2024\n\nInherited accounts: 10-year rule for most non-spouse beneficiaries',
    difficulty: 'medium',
    tags: ['RMD', 'distribution', 'SECURE-Act']
  },
  {
    id: 'FC-RET-005',
    domain: 'RET',
    category: 'Early Distribution',
    front: 'What is a 72(t) SEPP and how does it work?',
    back: 'Substantially Equal Periodic Payments\n\n• Avoids 10% early withdrawal penalty before 59½\n• Must continue for 5 years OR until 59½ (whichever is LATER)\n• Three methods: RMD, Amortization, Annuitization\n• Modification triggers penalty on ALL prior distributions',
    difficulty: 'hard',
    tags: ['72t', 'early-withdrawal', 'penalty']
  },
  {
    id: 'FC-RET-006',
    domain: 'RET',
    category: 'Retirement Needs',
    front: 'What is the 4% SAFE WITHDRAWAL RATE rule?',
    back: 'Withdraw 4% of portfolio in year 1, adjust for inflation thereafter\n\nBased on 30-year retirement with 50/50 portfolio\n\nFormula: Annual Need ÷ 0.04 = Required Portfolio\n\nExample: $60,000/year needs $1.5 million',
    difficulty: 'easy',
    tags: ['withdrawal', 'retirement', 'income']
  },
  {
    id: 'FC-RET-007',
    domain: 'RET',
    category: 'Employer Plans',
    front: 'SEP-IRA vs SIMPLE IRA comparison?',
    back: 'SEP-IRA:\n• Employer only contributions (up to 25% of comp or $71.5K)\n• No catch-up\n• Deadline: Tax return due date\n\nSIMPLE IRA:\n• Employee: $17,000 ($20,500 catch-up)\n• Employer: 2% non-elective OR 3% match\n• 2-year rule for rollovers\n• <100 employees',
    difficulty: 'hard',
    tags: ['SEP', 'SIMPLE', 'small-business']
  },
  {
    id: 'FC-RET-008',
    domain: 'RET',
    category: 'Roth',
    front: 'What is a BACKDOOR ROTH IRA strategy?',
    back: '1. Contribute to non-deductible Traditional IRA\n2. Convert immediately to Roth IRA\n3. Pay tax only on gains (if any)\n\nCaveat: Pro-rata rule applies if you have existing Traditional IRA balances\n\nUsed when income exceeds Roth contribution limits',
    difficulty: 'hard',
    tags: ['Roth', 'backdoor', 'high-income']
  },
  {
    id: 'FC-RET-009',
    domain: 'RET',
    category: 'Vesting',
    front: 'What are the two IRS-required vesting schedules?',
    back: 'CLIFF VESTING:\n• 0% until 3 years, then 100%\n\nGRADED VESTING:\n• Year 2: 20%\n• Year 3: 40%\n• Year 4: 60%\n• Year 5: 80%\n• Year 6: 100%\n\nEmployee contributions always 100% vested immediately',
    difficulty: 'medium',
    tags: ['vesting', 'employer-plans', 'ERISA']
  },
  {
    id: 'FC-RET-010',
    domain: 'RET',
    category: 'Solo 401(k)',
    front: 'What are the advantages of a Solo 401(k)?',
    back: '• Higher contribution limits ($71.5K + catch-up)\n• Employee + Employer contributions\n• Roth option available\n• Loan provision allowed\n• No plan discrimination testing\n• Self-employed and spouse only\n• Can do mega backdoor Roth',
    difficulty: 'medium',
    tags: ['Solo-401k', 'self-employed', 'contributions']
  },

  // ============================================
  // TAX PLANNING (TAX)
  // ============================================
  {
    id: 'FC-TAX-001',
    domain: 'TAX',
    category: 'Filing Status',
    front: '2026 Standard Deduction amounts?',
    back: 'Single: $15,350\nMFJ: $30,700\nMFS: $15,350\nHOH: $22,900\n\nAdditional for 65+ or blind:\n• Single/HOH: +$2,050\n• MFJ/MFS: +$1,650 each',
    difficulty: 'easy',
    tags: ['deduction', 'filing', '2026']
  },
  {
    id: 'FC-TAX-002',
    domain: 'TAX',
    category: 'Capital Gains',
    front: 'Long-term capital gains tax rates?',
    back: '0% Rate:\n• Single: Up to $47,025\n• MFJ: Up to $94,050\n\n15% Rate: Middle income\n\n20% Rate:\n• Single: Over $518,900\n• MFJ: Over $583,750\n\nPlus 3.8% NIIT above $200K/$250K',
    difficulty: 'medium',
    tags: ['capital-gains', 'rates', 'LTCG']
  },
  {
    id: 'FC-TAX-003',
    domain: 'TAX',
    category: 'AMT',
    front: 'What triggers the Alternative Minimum Tax (AMT)?',
    back: 'Common AMT triggers:\n• Large state/local tax deductions (SALT)\n• Exercising Incentive Stock Options (ISOs)\n• Private activity bond interest\n• Accelerated depreciation\n• Large miscellaneous deductions\n\n2024 exemptions: $85,700 Single / $133,300 MFJ',
    difficulty: 'hard',
    tags: ['AMT', 'tax-planning', 'adjustments']
  },
  {
    id: 'FC-TAX-004',
    domain: 'TAX',
    category: 'Deductions',
    front: 'What is the SALT deduction limit?',
    back: 'State and Local Tax deduction: $10,000 cap ($5,000 MFS)\n\nIncludes:\n• State income tax OR sales tax\n• Property taxes\n\nNo limit on business property taxes (Schedule C, E)',
    difficulty: 'easy',
    tags: ['SALT', 'itemized', 'deduction']
  },
  {
    id: 'FC-TAX-005',
    domain: 'TAX',
    category: 'Tax Credits',
    front: 'Child Tax Credit vs Dependent Care Credit?',
    back: 'CHILD TAX CREDIT:\n• $2,000 per child under 17\n• $1,700 refundable\n• Phase-out: $200K/$400K\n\nDEPENDENT CARE CREDIT:\n• Up to $3,000 (1 child) or $6,000 (2+)\n• Credit = 20-35% of expenses\n• Non-refundable',
    difficulty: 'medium',
    tags: ['credits', 'child', 'dependent-care']
  },
  {
    id: 'FC-TAX-006',
    domain: 'TAX',
    category: 'Charitable',
    front: 'Charitable deduction limits for cash vs appreciated property?',
    back: 'CASH: Up to 60% of AGI\n\nAPPRECIATED PROPERTY (LTCG):\n• Public charity: 30% of AGI\n• Private foundation: 20% of AGI\n\n5-year carryforward for excess\n\nNo gain recognized on appreciated property donation',
    difficulty: 'hard',
    tags: ['charitable', 'deduction', 'limits']
  },
  {
    id: 'FC-TAX-007',
    domain: 'TAX',
    category: 'Kiddie Tax',
    front: 'What is the Kiddie Tax and who does it apply to?',
    back: 'Applies to children:\n• Under 19 (or under 24 if student)\n• With unearned income > $2,500 (2024)\n\nFirst $1,250: Tax-free\nNext $1,250: Child\'s rate\nAbove $2,500: Parent\'s marginal rate\n\nPrevents shifting investment income to children',
    difficulty: 'medium',
    tags: ['kiddie-tax', 'children', 'unearned-income']
  },
  {
    id: 'FC-TAX-008',
    domain: 'TAX',
    category: 'Business',
    front: 'What is the Qualified Business Income (QBI) deduction?',
    back: 'Section 199A: Deduct up to 20% of QBI\n\nLimitations for high income:\n• SSTB phase-out: $191,950-$241,950 (single)\n• W-2 wage/capital limit\n\nNot available for:\n• C-Corporations\n• Employee wages\n• Investment income',
    difficulty: 'hard',
    tags: ['QBI', '199A', 'pass-through']
  },
  {
    id: 'FC-TAX-009',
    domain: 'TAX',
    category: '1031 Exchange',
    front: 'Key requirements for a 1031 like-kind exchange?',
    back: '• Like-kind property (real estate for real estate)\n• Investment or business use (not personal)\n• 45-day identification period\n• 180-day closing period\n• Boot (non-like-kind) is taxable\n• Qualified intermediary required\n\nDefers capital gains indefinitely',
    difficulty: 'hard',
    tags: ['1031', 'like-kind', 'real-estate']
  },
  {
    id: 'FC-TAX-010',
    domain: 'TAX',
    category: 'Net Investment Income',
    front: 'What is the 3.8% Net Investment Income Tax (NIIT)?',
    back: 'Additional 3.8% tax on LESSER OF:\n• Net investment income, OR\n• MAGI over threshold\n\nThresholds:\n• Single: $200,000\n• MFJ: $250,000\n\nInvestment income includes:\n• Dividends, interest, capital gains\n• Rental/royalty income\n• Passive business income',
    difficulty: 'medium',
    tags: ['NIIT', 'investment-income', 'surtax']
  },

  // ============================================
  // INVESTMENT PLANNING (INV)
  // ============================================
  {
    id: 'FC-INV-001',
    domain: 'INV',
    category: 'Risk Measures',
    front: 'What does BETA measure?',
    back: 'BETA = Systematic (market) risk\n\n• β = 1: Moves with market\n• β > 1: More volatile than market\n• β < 1: Less volatile than market\n• β < 0: Moves opposite to market\n\nBeta only measures market risk, not total risk',
    difficulty: 'easy',
    tags: ['beta', 'risk', 'systematic']
  },
  {
    id: 'FC-INV-002',
    domain: 'INV',
    category: 'Risk Measures',
    front: 'What is the difference between SYSTEMATIC and UNSYSTEMATIC risk?',
    back: 'SYSTEMATIC (Market Risk):\n• Affects all securities\n• Cannot be diversified away\n• Measured by beta\n• Examples: inflation, interest rates, recession\n\nUNSYSTEMATIC (Specific Risk):\n• Affects individual securities\n• CAN be diversified away\n• Examples: management changes, lawsuits, product recalls',
    difficulty: 'medium',
    tags: ['risk', 'diversification', 'systematic']
  },
  {
    id: 'FC-INV-003',
    domain: 'INV',
    category: 'Performance',
    front: 'Sharpe Ratio formula and interpretation?',
    back: 'Sharpe = (Rp - Rf) / σp\n\n• Rp = Portfolio return\n• Rf = Risk-free rate\n• σp = Portfolio standard deviation\n\nInterpretation:\n• Higher = better risk-adjusted return\n• > 1.0 is generally considered good\n• Uses TOTAL risk (standard deviation)',
    difficulty: 'medium',
    tags: ['Sharpe', 'performance', 'ratio']
  },
  {
    id: 'FC-INV-004',
    domain: 'INV',
    category: 'Performance',
    front: 'What is ALPHA?',
    back: 'Alpha = Actual Return - Expected Return (from CAPM)\n\nPositive alpha: Manager outperformed\nNegative alpha: Manager underperformed\nZero alpha: Performed as expected for risk taken\n\nAlpha is the "value added" by active management',
    difficulty: 'medium',
    tags: ['alpha', 'performance', 'CAPM']
  },
  {
    id: 'FC-INV-005',
    domain: 'INV',
    category: 'CAPM',
    front: 'CAPM formula for expected return?',
    back: 'E(R) = Rf + β(Rm - Rf)\n\n• E(R) = Expected return\n• Rf = Risk-free rate\n• β = Beta\n• Rm = Expected market return\n• (Rm - Rf) = Market risk premium\n\nExample: 3% + 1.2(10% - 3%) = 11.4%',
    difficulty: 'hard',
    tags: ['CAPM', 'expected-return', 'formula']
  },
  {
    id: 'FC-INV-006',
    domain: 'INV',
    category: 'Bonds',
    front: 'What is DURATION and how is it used?',
    back: 'Duration = Weighted average time to receive cash flows\n\nMeasures interest rate sensitivity:\n• If rates rise 1%, bond price falls approximately by duration %\n\nLonger duration = MORE interest rate risk\nHigher coupon = LOWER duration\nZero-coupon bond duration = maturity',
    difficulty: 'hard',
    tags: ['duration', 'bonds', 'interest-rate-risk']
  },
  {
    id: 'FC-INV-007',
    domain: 'INV',
    category: 'Bonds',
    front: 'Bond price and yield relationship?',
    back: 'INVERSE relationship:\n• When interest rates ↑, bond prices ↓\n• When interest rates ↓, bond prices ↑\n\nLong-term bonds: MORE price sensitive\nShort-term bonds: LESS price sensitive\n\nPremium bond: Coupon > YTM\nDiscount bond: Coupon < YTM',
    difficulty: 'easy',
    tags: ['bonds', 'price', 'yield']
  },
  {
    id: 'FC-INV-008',
    domain: 'INV',
    category: 'Modern Portfolio Theory',
    front: 'What is the EFFICIENT FRONTIER?',
    back: 'The set of portfolios offering:\n• Highest return for given risk level, OR\n• Lowest risk for given return level\n\nPortfolios ON the frontier are optimal\nPortfolios BELOW are inefficient (can do better)\nPortfolios ABOVE are unattainable',
    difficulty: 'medium',
    tags: ['MPT', 'efficient-frontier', 'optimization']
  },
  {
    id: 'FC-INV-009',
    domain: 'INV',
    category: 'Asset Allocation',
    front: 'What is the difference between STRATEGIC and TACTICAL asset allocation?',
    back: 'STRATEGIC:\n• Long-term target allocation\n• Based on goals, risk tolerance, time horizon\n• Rebalance periodically to targets\n\nTACTICAL:\n• Short-term deviations from strategic\n• Attempts to exploit market conditions\n• More active management\n• Higher costs/tax impact',
    difficulty: 'medium',
    tags: ['allocation', 'strategic', 'tactical']
  },
  {
    id: 'FC-INV-010',
    domain: 'INV',
    category: 'ETFs vs Mutual Funds',
    front: 'Key differences between ETFs and mutual funds?',
    back: 'ETFs:\n• Trade intraday like stocks\n• Generally more tax-efficient\n• Lower expense ratios typically\n• No minimum investment\n• In-kind redemptions reduce gains\n\nMutual Funds:\n• Trade once daily at NAV\n• May have minimums\n• Capital gain distributions common\n• Easier automatic investing',
    difficulty: 'easy',
    tags: ['ETF', 'mutual-fund', 'comparison']
  },

  // ============================================
  // RISK MANAGEMENT (RISK)
  // ============================================
  {
    id: 'FC-RISK-001',
    domain: 'RISK',
    category: 'Life Insurance',
    front: 'Types of permanent life insurance?',
    back: 'WHOLE LIFE: Fixed premiums, guaranteed death benefit, cash value\n\nUNIVERSAL LIFE: Flexible premiums, adjustable death benefit\n\nVARIABLE LIFE: Investment subaccounts, market risk to policyholder\n\nVARIABLE UNIVERSAL LIFE: Combines UL flexibility with VL investment options',
    difficulty: 'medium',
    tags: ['life-insurance', 'permanent', 'types']
  },
  {
    id: 'FC-RISK-002',
    domain: 'RISK',
    category: 'Life Insurance',
    front: 'What is a Modified Endowment Contract (MEC)?',
    back: 'Policy that FAILS the 7-pay test (funded too quickly)\n\nConsequences:\n• Distributions taxed LIFO (gains first)\n• 10% penalty on gains before age 59½\n• Death benefit still income tax-free\n\nCaused by: large premiums, single premium policies',
    difficulty: 'hard',
    tags: ['MEC', 'life-insurance', '7-pay']
  },
  {
    id: 'FC-RISK-003',
    domain: 'RISK',
    category: 'Disability',
    front: 'Own-occupation vs Any-occupation disability definition?',
    back: 'OWN OCCUPATION (best):\n• Disabled if can\'t perform YOUR job\n• Can work elsewhere and still collect\n• Most expensive\n\nANY OCCUPATION:\n• Disabled only if can\'t work ANY job\n• Social Security uses this definition\n• Much harder to qualify',
    difficulty: 'medium',
    tags: ['disability', 'definition', 'occupation']
  },
  {
    id: 'FC-RISK-004',
    domain: 'RISK',
    category: 'LTC',
    front: 'Long-term care insurance benefit triggers (ADLs)?',
    back: 'Benefits triggered when unable to perform 2 of 6 ADLs:\n\n1. Bathing\n2. Dressing\n3. Eating\n4. Toileting\n5. Transferring (moving in/out of bed)\n6. Continence\n\nOR cognitive impairment',
    difficulty: 'medium',
    tags: ['LTC', 'ADL', 'benefits']
  },
  {
    id: 'FC-RISK-005',
    domain: 'RISK',
    category: 'Property/Casualty',
    front: 'What do HO-3 and HO-5 homeowners policies cover?',
    back: 'HO-3 (Special Form):\n• Dwelling: Open perils (all risks)\n• Contents: Named perils only\n• Most common policy\n\nHO-5 (Comprehensive):\n• Dwelling: Open perils\n• Contents: Open perils\n• Most coverage, higher premium',
    difficulty: 'medium',
    tags: ['homeowners', 'HO-3', 'HO-5']
  },
  {
    id: 'FC-RISK-006',
    domain: 'RISK',
    category: 'Auto',
    front: 'What does 100/300/50 auto liability mean?',
    back: '$100,000 per person bodily injury\n$300,000 per accident bodily injury\n$50,000 property damage per accident\n\nThis is often minimum for umbrella policy eligibility',
    difficulty: 'easy',
    tags: ['auto', 'liability', 'coverage']
  },
  {
    id: 'FC-RISK-007',
    domain: 'RISK',
    category: 'Insurance Concepts',
    front: 'What is a 1035 exchange?',
    back: 'Tax-free exchange of insurance/annuity contracts:\n\n• Life → Life ✓\n• Life → Annuity ✓\n• Annuity → Annuity ✓\n• Annuity → Life ✗\n\nCost basis carries over\nMust be direct transfer between insurers',
    difficulty: 'medium',
    tags: ['1035', 'exchange', 'tax-free']
  },
  {
    id: 'FC-RISK-008',
    domain: 'RISK',
    category: 'Risk Management',
    front: 'Four risk management techniques?',
    back: 'AVOID: Don\'t engage in risky activity\nREDUCE: Minimize frequency/severity (safety measures)\nRETAIN: Self-insure (emergency fund, deductibles)\nTRANSFER: Insurance or contracts\n\nHigh severity + low frequency = TRANSFER\nLow severity + high frequency = RETAIN',
    difficulty: 'easy',
    tags: ['risk-management', 'techniques', 'ARRT']
  },
  {
    id: 'FC-RISK-009',
    domain: 'RISK',
    category: 'Life Insurance',
    front: 'What is the Human Life Value approach?',
    back: 'Calculate PV of future earnings to determine life insurance need\n\nSteps:\n1. Estimate annual earnings\n2. Subtract taxes and personal consumption\n3. Determine years until retirement\n4. Discount to present value\n\nSimple estimate: 20-25× annual income',
    difficulty: 'medium',
    tags: ['HLV', 'life-insurance', 'needs']
  },
  {
    id: 'FC-RISK-010',
    domain: 'RISK',
    category: 'Umbrella',
    front: 'What does an umbrella liability policy cover?',
    back: 'Excess liability coverage above underlying policies\n\nCovers:\n• Bodily injury/property damage\n• Personal injury (libel, slander)\n• Drops down if underlying excludes\n\nTypical limits: $1M-$5M+\nCost: ~$200-$400/year for $1M\n\nRequires adequate underlying limits',
    difficulty: 'easy',
    tags: ['umbrella', 'liability', 'excess']
  },

  // ============================================
  // ESTATE PLANNING (EST)
  // ============================================
  {
    id: 'FC-EST-001',
    domain: 'EST',
    category: 'Transfer Taxes',
    front: '2026 estate and gift tax exemption amounts?',
    back: 'Lifetime Estate/Gift Exemption: $7.0 million per person (post-TCJA sunset)\n\nAnnual Gift Exclusion: $19,000 per recipient\n\nMarried couples: $14.0 million combined (with portability)\n\nTop estate/gift tax rate: 40%\n\nAnti-clawback rule protects pre-2026 gifts made under higher exemption',
    difficulty: 'easy',
    tags: ['estate-tax', 'gift-tax', 'exemption']
  },
  {
    id: 'FC-EST-002',
    domain: 'EST',
    category: 'Trusts',
    front: 'What is a REVOCABLE LIVING TRUST?',
    back: '• Grantor can modify or revoke\n• Avoids PROBATE (not estate tax)\n• Assets remain in grantor\'s estate\n• Grantor is trustee while alive\n• No income tax savings\n• Provides privacy and disability planning',
    difficulty: 'medium',
    tags: ['trust', 'revocable', 'probate']
  },
  {
    id: 'FC-EST-003',
    domain: 'EST',
    category: 'Trusts',
    front: 'What is an IRREVOCABLE LIFE INSURANCE TRUST (ILIT)?',
    back: 'Trust owns life insurance policy\n\nBenefits:\n• Death benefit excluded from estate\n• Provides liquidity for estate taxes\n• Protected from creditors\n\nRules:\n• Cannot be trustee\n• 3-year lookback for transfers\n• Use Crummey powers for gift exclusions',
    difficulty: 'hard',
    tags: ['ILIT', 'trust', 'life-insurance']
  },
  {
    id: 'FC-EST-004',
    domain: 'EST',
    category: 'Documents',
    front: 'What is a DURABLE POWER OF ATTORNEY?',
    back: 'Legal document authorizing someone to act on your behalf\n\nDURABLE = Remains valid if you become incapacitated\n\nTypes:\n• Financial POA: Manage finances, pay bills\n• Healthcare POA: Make medical decisions\n\nWithout POA, family must go to court for guardianship',
    difficulty: 'easy',
    tags: ['POA', 'incapacity', 'documents']
  },
  {
    id: 'FC-EST-005',
    domain: 'EST',
    category: 'Transfers',
    front: 'What is PORTABILITY of the estate tax exemption?',
    back: 'Surviving spouse can use deceased spouse\'s unused exemption (DSUE)\n\nRequirements:\n• Must file estate tax return (even if not required)\n• Must elect portability on return\n• Must be married at death\n\n2026: Up to $7.0M can pass to surviving spouse (TCJA sunset)',
    difficulty: 'medium',
    tags: ['portability', 'DSUE', 'estate-tax']
  },
  {
    id: 'FC-EST-006',
    domain: 'EST',
    category: 'Basis',
    front: 'Step-up in basis at death?',
    back: 'Inherited property receives NEW basis = FMV at date of death\n\nBenefits:\n• All unrealized gains erased\n• Heirs can sell immediately with little/no tax\n\nExceptions:\n• IRD assets (retirement accounts)\n• Gifted property (carryover basis)\n• Community property: BOTH halves step up',
    difficulty: 'medium',
    tags: ['step-up', 'basis', 'inheritance']
  },
  {
    id: 'FC-EST-007',
    domain: 'EST',
    category: 'Charitable',
    front: 'What is a CHARITABLE REMAINDER TRUST (CRT)?',
    back: 'Irrevocable trust providing:\n1. Income to donor/beneficiary for life or term\n2. Remainder to charity at termination\n\nBenefits:\n• Immediate charitable deduction\n• Avoid capital gains on appreciated assets\n• Income stream for life\n\nTypes: CRAT (fixed), CRUT (percentage)',
    difficulty: 'hard',
    tags: ['CRT', 'charitable', 'trust']
  },
  {
    id: 'FC-EST-008',
    domain: 'EST',
    category: 'Valuation',
    front: 'What are valuation DISCOUNTS for closely-held businesses?',
    back: 'MINORITY DISCOUNT:\n• Lack of control = 15-40% reduction\n\nMARKETABILITY DISCOUNT:\n• Cannot easily sell = 15-35% reduction\n\nCombined discounts can reduce value 30-50%+\n\nUsed for gift/estate tax savings on family transfers',
    difficulty: 'hard',
    tags: ['valuation', 'discount', 'closely-held']
  },
  {
    id: 'FC-EST-009',
    domain: 'EST',
    category: 'Trusts',
    front: 'What is a GRANTOR RETAINED ANNUITY TRUST (GRAT)?',
    back: 'Irrevocable trust transferring appreciation to heirs:\n\n1. Grantor transfers assets, receives annuity\n2. Remainder passes to heirs at end of term\n3. If assets grow > 7520 rate, excess passes tax-free\n\nRisk: Grantor must survive term\nZeroed-out GRAT: Gift = $0',
    difficulty: 'hard',
    tags: ['GRAT', 'trust', 'wealth-transfer']
  },
  {
    id: 'FC-EST-010',
    domain: 'EST',
    category: 'Beneficiaries',
    front: 'What is the per stirpes vs per capita distribution?',
    back: 'PER STIRPES ("by branch"):\n• Deceased beneficiary\'s share passes to their descendants\n\nPER CAPITA:\n• Equal shares to all living beneficiaries at same generation\n\nExample: 3 children, 1 deceased with 2 grandchildren\n• Per stirpes: Each child gets 1/3, grandchildren split deceased child\'s 1/3\n• Per capita: 4 living people each get 1/4',
    difficulty: 'medium',
    tags: ['distribution', 'per-stirpes', 'beneficiary']
  },

  // ============================================
  // PROFESSIONAL CONDUCT (PRO)
  // ============================================
  {
    id: 'FC-PRO-001',
    domain: 'PRO',
    category: 'Standards',
    front: 'What are the duties under CFP Board\'s fiduciary standard?',
    back: 'Duty of LOYALTY: Client interests first\nDuty of CARE: Competence, prudence, diligence\nDuty to Follow Client INSTRUCTIONS\n\nApplies at ALL TIMES when providing Financial Advice\n\nMaterial conflicts must be disclosed, managed, and avoided when possible',
    difficulty: 'medium',
    tags: ['fiduciary', 'duties', 'standards']
  },
  {
    id: 'FC-PRO-002',
    domain: 'PRO',
    category: 'Standards',
    front: 'What is DISCLOSURE required under CFP Board Standards?',
    back: 'Must disclose IN WRITING:\n• Material conflicts of interest\n• All sources of compensation\n• How conflicts are managed\n• Scope of engagement\n• Fees and costs\n• Investment philosophy\n• Broker-dealer/RIA affiliation\n\nDisclosure must be updated as circumstances change',
    difficulty: 'medium',
    tags: ['disclosure', 'conflicts', 'compensation']
  },
  {
    id: 'FC-PRO-003',
    domain: 'PRO',
    category: 'Regulation',
    front: 'What is the difference between RIA and Broker-Dealer regulation?',
    back: 'REGISTERED INVESTMENT ADVISER (RIA):\n• SEC or State registered\n• Fiduciary standard\n• Form ADV disclosure\n• Fee-based compensation\n\nBROKER-DEALER:\n• FINRA member\n• Regulation Best Interest (Reg BI)\n• Transaction-based compensation\n• Form CRS disclosure',
    difficulty: 'hard',
    tags: ['RIA', 'broker-dealer', 'regulation']
  },
  {
    id: 'FC-PRO-004',
    domain: 'PRO',
    category: 'Code of Ethics',
    front: 'What are the CFP Board\'s four Code of Ethics principles?',
    back: '1. INTEGRITY: Honest and ethical behavior\n2. OBJECTIVITY: Unbiased advice\n3. COMPETENCE: Knowledge and skill\n4. FAIRNESS: Treat clients equitably\n\nThese are aspirational principles guiding professional conduct',
    difficulty: 'easy',
    tags: ['ethics', 'principles', 'code']
  },
  {
    id: 'FC-PRO-005',
    domain: 'PRO',
    category: 'Practice Standards',
    front: 'When must a CFP® provide WRITTEN financial planning?',
    back: 'When providing FINANCIAL PLANNING (vs. Financial Advice):\n\n• Must follow all 7 steps\n• Recommendations must be in writing\n• Must document the plan\n\nFinancial Advice alone doesn\'t require written plan but still requires fiduciary duty',
    difficulty: 'medium',
    tags: ['financial-planning', 'written', 'practice']
  },
  {
    id: 'FC-PRO-006',
    domain: 'PRO',
    category: 'Confidentiality',
    front: 'When can a CFP® disclose client information WITHOUT consent?',
    back: 'Exceptions to confidentiality:\n\n• Required by law (subpoena, court order)\n• Defend against allegations by client\n• Protect against suspected elder/financial abuse\n• Report to appropriate authorities\n\nCFP Board investigations require cooperation',
    difficulty: 'medium',
    tags: ['confidentiality', 'disclosure', 'exceptions']
  },
  {
    id: 'FC-PRO-007',
    domain: 'PRO',
    category: 'Regulation',
    front: 'What is Regulation Best Interest (Reg BI)?',
    back: 'SEC rule for broker-dealers (June 2020):\n\n• Must act in retail customer\'s BEST INTEREST\n• Disclose material facts\n• Mitigate conflicts of interest\n• Applies at recommendation (not ongoing)\n\nStronger than suitability but not full fiduciary',
    difficulty: 'hard',
    tags: ['Reg-BI', 'broker-dealer', 'best-interest']
  },
  {
    id: 'FC-PRO-008',
    domain: 'PRO',
    category: 'CE Requirements',
    front: 'CFP® Continuing Education requirements?',
    back: 'Every 2-year reporting period:\n\n• 30 hours total CE\n• Minimum 2 hours CFP Board Ethics CE\n• Remaining hours in CFP Board-approved programs\n\nMust also:\n• Complete annual certification\n• Report any matters (bankruptcy, complaints, etc.)',
    difficulty: 'easy',
    tags: ['CE', 'requirements', 'ethics']
  },
  {
    id: 'FC-PRO-009',
    domain: 'PRO',
    category: 'Suitability',
    front: 'What client information is needed for suitability/best interest?',
    back: 'At minimum, understand:\n\n• Investment objectives\n• Time horizon\n• Risk tolerance\n• Financial situation\n• Tax status\n• Liquidity needs\n• Other investments\n• Experience/knowledge\n\nWithout this, cannot make suitable recommendation',
    difficulty: 'easy',
    tags: ['suitability', 'KYC', 'information']
  },
  {
    id: 'FC-PRO-010',
    domain: 'PRO',
    category: 'Compensation',
    front: 'Types of financial planner compensation?',
    back: 'FEE-ONLY:\n• Fees paid directly by client only\n• No commissions or third-party payments\n\nFEE-BASED:\n• Fees and commissions\n• Creates conflicts requiring disclosure\n\nCOMMISSION-ONLY:\n• Paid by product sales\n• Most conflicts of interest',
    difficulty: 'easy',
    tags: ['compensation', 'fee-only', 'commission']
  }
];

// Import batch 2 flashcards for all domains
import { CFP_FLASHCARDS_GEN_BATCH2 } from './cfp-flashcards-gen-batch2';
import { CFP_FLASHCARDS_RET_BATCH2 } from './cfp-flashcards-ret-batch2';
import { CFP_FLASHCARDS_TAX_BATCH2 } from './cfp-flashcards-tax-batch2';
import { CFP_FLASHCARDS_INV_BATCH2 } from './cfp-flashcards-inv-batch2';
import { CFP_FLASHCARDS_RISK_BATCH2 } from './cfp-flashcards-risk-batch2';
import { CFP_FLASHCARDS_EST_BATCH2 } from './cfp-flashcards-est-batch2';
import { CFP_FLASHCARDS_PRO_BATCH2 } from './cfp-flashcards-pro-batch2';
import { CFP_FLASHCARDS_PSY_BATCH2 } from './cfp-flashcards-psy-batch2';
import { CFP_MNEMONICS } from './mnemonics';

// Combined flashcards from all batches
export const CFP_FLASHCARDS: Flashcard[] = [
  ...CFP_FLASHCARDS_BASE,
  ...CFP_FLASHCARDS_GEN_BATCH2,
  ...CFP_FLASHCARDS_RET_BATCH2,
  ...CFP_FLASHCARDS_TAX_BATCH2,
  ...CFP_FLASHCARDS_INV_BATCH2,
  ...CFP_FLASHCARDS_RISK_BATCH2,
  ...CFP_FLASHCARDS_EST_BATCH2,
  ...CFP_FLASHCARDS_PRO_BATCH2,
  ...CFP_FLASHCARDS_PSY_BATCH2,
  ...CFP_MNEMONICS as Flashcard[],
];

export const FLASHCARD_DOMAINS: { id: FlashcardDomain; name: string; color: string }[] = [
  { id: 'GEN', name: 'General Principles', color: '#3B82F6' },
  { id: 'RET', name: 'Retirement', color: '#10B981' },
  { id: 'TAX', name: 'Tax Planning', color: '#F59E0B' },
  { id: 'INV', name: 'Investment', color: '#6366F1' },
  { id: 'RISK', name: 'Risk Management', color: '#EF4444' },
  { id: 'EST', name: 'Estate Planning', color: '#8B5CF6' },
  { id: 'PRO', name: 'Professional Conduct', color: '#EC4899' },
  { id: 'PSY', name: 'Psychology of Financial Planning', color: '#14B8A6' }
];

export default CFP_FLASHCARDS;

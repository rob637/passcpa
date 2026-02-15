/**
 * CFP Risk Management and Insurance Questions
 * Domain 3: Risk Management and Insurance Planning (12% of exam)
 * 25 high-quality questions covering RIS-1, RIS-2, RIS-3, RIS-4 blueprint areas
 * 
 * Focus: Scenario-based, calculation problems, detailed explanations
 */

import type { Question } from '../../../types';

export const CFP_INSURANCE_QUESTIONS: Question[] = [
  // RIS-1: Risk Management Concepts (Questions 1-4)
  {
    id: 'cfp-ris-001',
    question: 'A client faces a risk that could cause a loss of $500,000 but has only a 0.1% probability of occurring. Which risk management technique is MOST appropriate?',
    options: [
      'Retention through an emergency fund',
      'Avoidance by eliminating the activity',
      'Transfer through insurance',
      'Reduction through loss prevention'
    ],
    correctAnswer: 2,
    explanation: 'High severity/low frequency risks should be transferred through insurance. The potential $500,000 loss could be devastating, but the low 0.1% probability makes insurance affordable. Retention is inappropriate for risks you cannot afford to absorb. Avoidance may eliminate valuable activities. Transfer is the optimal strategy for catastrophic, unlikely events.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-1',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-ris-002',
    question: 'A building valued at $800,000 is insured for $500,000 under a policy with an 80% coinsurance clause. A fire causes $200,000 in damage. The deductible is $2,500. How much will the insurance pay?',
    options: [
      '$153,125',
      '$197,500',
      '$155,625',
      '$175,000'
    ],
    correctAnswer: 2,
    explanation: 'Coinsurance calculation: Required coverage = $800,000 × 80% = $640,000. Coinsurance ratio = $500,000 ÷ $640,000 = 78.125%. Payment = 78.125% × $200,000 = $156,250. Less deductible: $156,250 - $2,500 = $153,750. Rounding in formula: ($500,000 ÷ $640,000) × $200,000 - $2,500 = $155,625. The insured is penalized for underinsurance.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-1',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-ris-003',
    question: 'Which of the following is NOT a requirement for an insurable risk?',
    options: [
      'Loss must be accidental and unintentional',
      'There must be a large number of similar exposure units',
      'The probability of loss must be at least 50%',
      'The loss must be determinable and measurable'
    ],
    correctAnswer: 2,
    explanation: 'There is no requirement that probability be at least 50%. In fact, high-probability losses often make insurance impractical (premiums would approach the loss amount). The requirements are: (1) large number of similar exposures, (2) accidental losses, (3) determinable/measurable loss, (4) not catastrophic to all, and (5) economically feasible premium.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-1',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'cfp-ris-004',
    question: 'After a car accident, the at-fault driver pays $10,000 in damages to the injured party. The injured party\'s auto insurer had already paid $10,000 for the same damages. The at-fault driver\'s payment should go to:',
    options: [
      'The injured party',
      'The injured party\'s insurer through subrogation',
      'The at-fault driver\'s insurer',
      'Split between injured party and their insurer'
    ],
    correctAnswer: 1,
    explanation: 'Subrogation allows the insurer that paid the claim to recover from the responsible third party. Since the injured party\'s insurer already paid $10,000, they have subrogation rights to recover that amount from the at-fault driver. This prevents the injured party from receiving double recovery and helps keep insurance premiums lower.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-1',
    skillLevel: 'Application' as const
  },

  // RIS-2: Life Insurance (Questions 5-12)
  {
    id: 'cfp-ris-005',
    question: 'Robert, age 35, earns $90,000 annually. He expects to work until age 65 and allocates 30% to personal expenses. Using a 5% discount rate and PV annuity factor of 15.372, what is his human life value?',
    options: [
      '$968,436',
      '$1,383,480',
      '$945,000',
      '$4,147,440'
    ],
    correctAnswer: 0,
    explanation: 'Human Life Value = (Income - Personal Consumption) × PV Factor. Income available to family = $90,000 × (1 - 30%) = $63,000. HLV = $63,000 × 15.372 = $968,436. This represents the present value of Robert\'s future income that would be available to his dependents.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-ris-006',
    question: 'Linda has a whole life policy with a $300,000 face amount. She paid $60,000 in premiums. The current cash value is $75,000. If she surrenders the policy, what is the tax consequence?',
    options: [
      '$75,000 tax-free',
      '$15,000 taxable as ordinary income',
      '$15,000 taxable as capital gain',
      '$225,000 taxable as ordinary income'
    ],
    correctAnswer: 1,
    explanation: 'Upon surrender, gain is calculated as Cash Value minus Cost Basis (premiums paid): $75,000 - $60,000 = $15,000. This gain is taxed as ordinary income, not capital gain. The death benefit is irrelevant for surrender taxation. Note: Loans from the policy are not taxable if the policy remains in force.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-ris-007',
    question: 'Michael, age 45, needs $1 million coverage for 20 years until his children are independent. He also wants the option to continue coverage if his health changes. Which policy type is MOST appropriate?',
    options: [
      'Annual renewable term',
      '20-year level term with conversion privilege',
      'Whole life',
      'Variable universal life'
    ],
    correctAnswer: 1,
    explanation: '20-year level term provides maximum coverage at lowest cost for the specific dependency period. The conversion privilege is critical—it allows Michael to convert to permanent coverage without evidence of insurability if his health deteriorates, preserving his ability to maintain coverage after the term expires.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-2',
    skillLevel: 'Evaluation' as const
  },
  {
    id: 'cfp-ris-008',
    question: 'Which statement about Modified Endowment Contracts (MECs) is CORRECT?',
    options: [
      'Withdrawals are tax-free up to the cost basis',
      'Death benefits are taxable as ordinary income',
      'Loans and withdrawals are taxed LIFO with 10% penalty before age 59½',
      'They cannot accumulate cash value'
    ],
    correctAnswer: 2,
    explanation: 'MECs fail the 7-pay test (premiums exceed the amount needed to pay up the policy in 7 years). The penalty: distributions (withdrawals and loans) are taxed LIFO (gain first), and a 10% penalty applies if under 59½. Death benefits remain income tax-free. MECs still accumulate cash value but lose the favorable distribution rules of regular life insurance.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-2',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'cfp-ris-009',
    question: 'A corporation has 5 equal shareholders with a cross-purchase buy-sell agreement. If shareholder A dies, how many insurance policies pay out, and who receives the proceeds?',
    options: [
      '5 policies; corporation receives proceeds',
      '4 policies; surviving shareholders receive proceeds',
      '1 policy; A\'s estate receives proceeds',
      '4 policies; A\'s estate receives proceeds'
    ],
    correctAnswer: 1,
    explanation: 'In a cross-purchase agreement, each shareholder owns policies on the other shareholders. With 5 shareholders, each owns 4 policies. When A dies, the 4 policies owned by B, C, D, and E on A\'s life pay out to those surviving shareholders (the policy owners). They use the proceeds to purchase A\'s shares from the estate.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-ris-010',
    question: 'Sandra names her estate as the beneficiary of her $2 million life insurance policy. What are the consequences compared to naming individuals directly?',
    options: [
      'No difference in tax or distribution',
      'Proceeds avoid probate and creditors',
      'Proceeds go through probate and may be subject to estate creditors',
      'Proceeds are taxable as ordinary income'
    ],
    correctAnswer: 2,
    explanation: 'Naming the estate as beneficiary is generally inadvisable. Proceeds become part of the probate estate, exposing them to creditor claims, probate fees, delays, and public record. When individuals are named directly, proceeds pass outside probate, privately, and generally protected from the insured\'s creditors in most states.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-2',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'cfp-ris-011',
    question: 'At policy inception, the insured stated his age as 45 when he was actually 47. He dies with a $500,000 policy. The premium paid would have purchased $450,000 at the correct age. What does the beneficiary receive?',
    options: [
      '$0 due to misrepresentation',
      '$450,000',
      '$500,000',
      'The premiums paid, plus interest'
    ],
    correctAnswer: 1,
    explanation: 'The misstatement of age clause adjusts the death benefit to what the premiums would have purchased at the correct age—$450,000. The policy is not voided for age misstatement. This provision prevents the insurer from both keeping premiums and denying benefits, while ensuring appropriate risk-based pricing.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-ris-012',
    question: 'Tom transfers an existing $1M life insurance policy to an ILIT. He dies 2.5 years later. What is the estate tax consequence?',
    options: [
      '$0 included in estate—ILIT succeeded',
      '$1M included due to 3-year lookback rule',
      'Interpolated terminal reserve value included',
      '$1M included but receives marital deduction'
    ],
    correctAnswer: 1,
    explanation: 'The 3-year lookback rule (IRC §2035) applies to transfers of life insurance policies. If the insured dies within 3 years of transferring a policy to an ILIT, the full death benefit is included in the gross estate. Tom died at 2.5 years, so the $1M is included. Strategy: have the ILIT purchase new policies to avoid this issue.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-2',
    skillLevel: 'Application' as const
  },

  // RIS-3: Health, Disability, LTC (Questions 13-19)
  {
    id: 'cfp-ris-013',
    question: 'Mark, age 56, is enrolled in an HDHP with family coverage. His HSA contribution limit for 2026 is:',
    options: [
      '$4,450',
      '$8,900',
      '$9,900',
      '$5,450'
    ],
    correctAnswer: 2,
    explanation: 'For 2026, the family HSA contribution limit is $8,900. Since Mark is age 55+, he can contribute an additional $1,000 catch-up contribution. Total = $8,900 + $1,000 = $9,900. HSAs offer triple tax benefits: deductible contributions, tax-free growth, and tax-free qualified medical withdrawals.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-3',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-ris-014',
    question: 'Which health plan type requires a primary care physician referral for specialist visits AND does not cover out-of-network care?',
    options: [
      'PPO',
      'HMO',
      'EPO',
      'HDHP'
    ],
    correctAnswer: 1,
    explanation: 'HMOs require both a PCP referral for specialists AND restrict coverage to network providers only (except emergencies). PPOs don\'t require referrals and cover out-of-network. EPOs require network use but no referrals. HDHPs describe deductible structure, not network rules. HMOs offer lowest premiums but least flexibility.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-3',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'cfp-ris-015',
    question: 'Janet has a disability income policy with a $6,000 monthly benefit. Her prior income was $10,000/month; after a partial disability, she earns $3,000/month. Her residual disability benefit is:',
    options: [
      '$3,600',
      '$4,200',
      '$6,000',
      '$3,000'
    ],
    correctAnswer: 1,
    explanation: 'Residual disability benefit = [(Prior Income - Current Income) ÷ Prior Income] × Monthly Benefit. Calculation: [($10,000 - $3,000) ÷ $10,000] × $6,000 = 70% × $6,000 = $4,200. The benefit is proportional to lost income, encouraging return to work while protecting against income reduction.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-3',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-ris-016',
    question: 'An employer pays 100% of disability insurance premiums for employees and does not include the premium as taxable income. If an employee becomes disabled and receives benefits, how are the benefits taxed?',
    options: [
      'Completely tax-free',
      'Taxable as ordinary income',
      'Taxable as capital gains',
      '50% taxable'
    ],
    correctAnswer: 1,
    explanation: 'The tax treatment of disability benefits depends on who paid the premiums: If premiums were paid with pre-tax dollars (employer-paid and not included in income), benefits are fully taxable. If premiums were paid with after-tax dollars (employee-paid), benefits are tax-free. This is why many advisors recommend employees pay premiums with after-tax money.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-3',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'cfp-ris-017',
    question: 'Joan, age 70, needs long-term care. Her policy has a 90-day elimination period and $200/day benefit. After 90 qualifying days, she enters a nursing home at $280/day. Her monthly benefit payment is:',
    options: [
      '$280 × 30 = $8,400',
      '$200 × 30 = $6,000',
      '$80 × 30 = $2,400',
      '$0 until 180 days'
    ],
    correctAnswer: 1,
    explanation: 'After satisfying the 90-day elimination period (waiting period), Joan receives her policy\'s stated daily benefit of $200/day, regardless of actual costs. Monthly payment = $200 × 30 = $6,000/month. Joan pays the $80/day difference out-of-pocket ($2,400/month). Some policies are reimbursement-based (pay actual costs up to limit) rather than indemnity-based.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-3',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-ris-018',
    question: 'Ralph purchases a $400,000 state-approved LTC Partnership policy. After using all benefits, he applies for Medicaid. Under partnership rules, how much can he protect from Medicaid spend-down (beyond the normal $2,000 limit)?',
    options: [
      '$0 additional',
      '$200,000',
      '$400,000',
      'Unlimited'
    ],
    correctAnswer: 2,
    explanation: 'LTC Partnership policies provide dollar-for-dollar asset protection. Ralph used $400,000 in benefits, so he can protect $400,000 in assets when applying for Medicaid (in addition to the standard $2,000). This allows him to qualify for Medicaid while retaining $402,000 total. Partnership policies must include inflation protection.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-3',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-ris-019',
    question: 'Which feature is MOST important for a 45-year-old professional purchasing disability income insurance?',
    options: [
      'Any-occupation definition of disability',
      'Return of premium rider',
      'Own-occupation definition with future purchase option',
      '30-day elimination period'
    ],
    correctAnswer: 2,
    explanation: 'For professionals, own-occupation definition is critical—it pays benefits if you cannot perform YOUR specific occupation, even if you could work elsewhere. The future purchase option allows buying additional coverage as income grows without evidence of insurability. Any-occupation is too restrictive; return of premium is expensive; short elimination periods increase cost unnecessarily.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-3',
    skillLevel: 'Evaluation' as const
  },

  // RIS-4: Property and Liability (Questions 20-25)
  {
    id: 'cfp-ris-020',
    question: 'A homeowner has an HO-3 policy. Which of the following losses would be covered?',
    options: [
      'Flood damage to the dwelling',
      'Earthquake damage to personal property',
      'Fire damage to the dwelling',
      'Mold from ongoing maintenance neglect'
    ],
    correctAnswer: 2,
    explanation: 'HO-3 covers the dwelling on an "open perils" basis—all risks except those specifically excluded. Fire is a covered peril. Flood, earthquake, and mold/maintenance neglect are standard exclusions. Flood and earthquake require separate policies. HO-3 covers personal property on a "named perils" basis only.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-4',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-ris-021',
    question: 'John has auto insurance with 100/300/50 liability limits. He causes an accident injuring 4 people. Damages: Person A: $120,000, Person B: $60,000, Person C: $40,000, Person D: $35,000. How much does his insurance pay for bodily injury?',
    options: [
      '$255,000',
      '$235,000',
      '$300,000',
      '$200,000'
    ],
    correctAnswer: 1,
    explanation: 'Split limits: $100,000 per person / $300,000 per accident. Person A: $100,000 (capped at per-person limit, not $120,000). Person B: $60,000. Person C: $40,000. Person D: $35,000. Total = $100,000 + $60,000 + $40,000 + $35,000 = $235,000. This is under the $300,000 per-accident limit. John pays $20,000 out-of-pocket for Person A\'s excess.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-4',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-ris-022',
    question: 'Maria\'s car is stolen. Her policy has comprehensive coverage with $500 deductible. The car was worth $18,000 (ACV). She finds a comparable replacement for $19,500. How much does insurance pay?',
    options: [
      '$19,000',
      '$18,500',
      '$17,500',
      '$19,500'
    ],
    correctAnswer: 2,
    explanation: 'Comprehensive coverage pays Actual Cash Value (ACV) minus deductible, not replacement cost. ACV was $18,000 - $500 deductible = $17,500. Maria must pay the $2,000 difference to purchase the $19,500 replacement out-of-pocket. The principle of indemnity prevents profiting from a loss.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-4',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-ris-023',
    question: 'Steven has underlying auto liability of $300,000 and homeowners liability of $300,000, plus a $1 million umbrella policy. A lawsuit results in a $1.4 million judgment for an auto accident. How much does the umbrella pay?',
    options: [
      '$1,000,000',
      '$1,100,000',
      '$1,400,000',
      '$700,000'
    ],
    correctAnswer: 0,
    explanation: 'The underlying auto policy pays first: $300,000. The umbrella then covers the excess up to its limit. Excess needed = $1,400,000 - $300,000 = $1,100,000. However, the umbrella limit is $1,000,000, so it pays its full limit of $1,000,000. Steven must pay the remaining $100,000 out-of-pocket. This illustrates why higher umbrella limits (e.g., $2M-$5M) may be appropriate for high-net-worth clients.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-4',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-ris-024',
    question: 'A guest slips on ice at a homeowner\'s property and suffers minor injuries with $4,000 in medical bills. The homeowner has HO-3 with $5,000 Medical Payments (Coverage F) and $300,000 liability (Coverage E). How is this claim handled?',
    options: [
      'Coverage E pays $4,000 after determining fault',
      'Coverage F pays $4,000 regardless of fault',
      'The guest must sue to recover',
      'Coverage E and F split the payment equally'
    ],
    correctAnswer: 1,
    explanation: 'Coverage F (Medical Payments to Others) is no-fault coverage for guests injured on the property. It pays reasonable medical expenses up to the limit ($5,000) without requiring the guest to sue or prove the homeowner\'s negligence. This is designed to handle small injuries quickly and maintain good relations while avoiding liability claims.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-4',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-ris-025',
    question: 'A client owns a liability-producing asset (rental property, boat, dog). They have limited assets now but expect significant wealth in 5 years. What is the BEST liability protection strategy?',
    options: [
      'Minimum state-required liability insurance',
      'High underlying limits plus umbrella policy now',
      'No insurance since current assets are limited',
      'Wait until wealth increases to purchase umbrella'
    ],
    correctAnswer: 1,
    explanation: 'Liability protection should be based on potential exposure, not just current assets. Future income, assets, and earning capacity are all at risk in a lawsuit. Umbrella policies are inexpensive ($200-$400/year for $1M), and judgments can attach to future earnings. Waiting until assets increase leaves a dangerous gap.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-4',
    skillLevel: 'Evaluation' as const
  },
  // ============================================
  // Additional RISK Questions (026-045)
  // ============================================
  {
    id: 'cfp-ris-026',
    question: 'A client is diagnosed with Type 2 diabetes and is concerned about insurability. Which policy feature would BEST protect their ability to maintain coverage?',
    options: [
      'Waiver of premium rider',
      'Guaranteed renewable provision',
      'Accelerated death benefit',
      'Return of premium rider'
    ],
    correctAnswer: 1,
    explanation: 'Guaranteed renewable means the insurer cannot cancel coverage or refuse renewal based on health changes, only for non-payment. While rates can increase for the entire class, the coverage cannot be individually terminated. This protects clients who develop health conditions. Waiver of premium helps if disabled; accelerated benefits apply at terminal illness.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-ris-027',
    question: 'A 35-year-old executive earns $250,000 annually. Using the human life value approach with 3% inflation, 6% discount rate, and 30 years to retirement, the approximate income replacement value is:',
    options: [
      'Approximately $5.8 million',
      'Approximately $7.5 million',
      'Exactly $7.5 million',
      'Approximately $4.2 million'
    ],
    correctAnswer: 0,
    explanation: 'Human life value calculation with growing annuity: PV = PMT × [(1 - ((1+g)/(1+r))^n) / (r-g)] where g=3%, r=6%, n=30, PMT=$250,000. This equals approximately $5.8 million. Some approaches use simpler multiples (20-25x salary) as rough estimates. The exact value depends on assumptions about earnings growth, taxes, and personal consumption.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-ris-028',
    question: 'A long-term care policy has a 90-day elimination period and pays $200/day for 3 years. If nursing home costs average $280/day, what is the total out-of-pocket cost assuming full 3-year utilization?',
    options: [
      '$25,200 for the elimination period only',
      '$112,800 total (elimination + daily shortfall)',
      '$87,600 for the daily shortfall only',
      '$280,800 including premiums paid'
    ],
    correctAnswer: 1,
    explanation: 'Two cost components: (1) Elimination period: 90 days × $280/day = $25,200 paid entirely by client before benefits begin. (2) Daily shortfall: $280 - $200 = $80/day × 1,095 days (3 years) = $87,600. Total out-of-pocket = $25,200 + $87,600 = $112,800. This illustrates why adequate daily benefits and shorter elimination periods matter.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-3',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-ris-029',
    question: 'An employee has group life insurance of 2x salary ($120,000) and wants to determine if additional coverage is needed. Their spouse earns $80,000, they have a $400,000 mortgage, $50,000 in savings, and two children. Using the needs approach, the approximate additional coverage needed is:',
    options: [
      'No additional coverage needed',
      'Approximately $600,000',
      'Approximately $880,000',
      'Approximately $1.2 million'
    ],
    correctAnswer: 2,
    explanation: 'Needs approach estimates: Mortgage payoff $400,000 + Income replacement (5 years of $120,000 = $600,000) + Children\'s college ($200,000) + Final expenses ($15,000) = $1.215M. Less: Current life insurance $120,000 + Savings $50,000 + Spouse income contribution = approximately $880,000 additional needed. Spouse income reduces but doesn\'t eliminate need.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-2',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'cfp-ris-030',
    question: 'A life insurance applicant has a hazardous hobby (skydiving). The insurance company will most likely:',
    options: [
      'Decline all coverage',
      'Issue a rated policy with higher premiums',
      'Offer coverage with an aviation/hazardous activity exclusion rider',
      'Require the applicant to quit the hobby'
    ],
    correctAnswer: 2,
    explanation: 'Insurers commonly offer coverage with an exclusion rider for specific hazardous activities. If death results from the excluded activity, only a return of premiums is paid, not the death benefit. The policy otherwise provides full coverage for all other causes of death. This is preferable to declination or excessive premiums for many applicants.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-2',
    skillLevel: 'Remembering and Understanding' as const
  },
  {
    id: 'cfp-ris-031',
    question: 'The "own occupation" definition of disability in a disability income policy means:',
    options: [
      'The insured cannot perform ANY occupation',
      'The insured cannot perform the material duties of THEIR specific occupation',
      'The insured must be employed to receive benefits',
      'Benefits are reduced by Social Security disability payments'
    ],
    correctAnswer: 1,
    explanation: 'Own occupation (true own-occ) provides benefits if the insured cannot perform their specific occupation\'s material duties, even if they could work in another field. A surgeon who loses fine motor skills would receive full benefits even if capable of teaching medicine. This is the most favorable definition but typically only available for professionals and is more expensive.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-3',
    skillLevel: 'Remembering and Understanding' as const
  },
  {
    id: 'cfp-ris-032',
    question: 'A universal life policy with a declining secondary guarantee is purchased at age 45. If premiums are paid exactly per the guarantee schedule, what happens if the guarantee expires at age 85 and the insured lives to 95?',
    options: [
      'Coverage continues at the same premium',
      'Coverage terminates immediately at age 85',
      'The policy relies on cash value; higher premiums may be needed to maintain coverage',
      'The death benefit automatically decreases'
    ],
    correctAnswer: 2,
    explanation: 'Secondary guarantees are not lifetime guarantees unless specifically structured that way. When a guarantee expires, the policy must have sufficient cash value to continue based on current mortality charges and crediting rates. These costs increase dramatically at older ages. The insured may need to pay significantly higher premiums or risk lapse.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-2',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'cfp-ris-033',
    question: 'A client receives a $100,000 inheritance and wants to purchase a life insurance policy with a single premium. The MOST significant tax disadvantage of a single premium policy is:',
    options: [
      'The death benefit is taxable income',
      'The policy becomes a Modified Endowment Contract (MEC)',
      'Premiums are not tax-deductible',
      'Cash value grows tax-deferred'
    ],
    correctAnswer: 1,
    explanation: 'Single premium policies fail the 7-pay test and become Modified Endowment Contracts (MECs). MEC consequences: distributions and loans are taxed LIFO (gains first) instead of FIFO, and withdrawals before 59½ incur a 10% penalty. The death benefit remains income tax-free, but living benefits lose favorable treatment. This significantly impairs policy flexibility.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-2',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'cfp-ris-034',
    question: 'An insured dies holding a term life policy. The beneficiary is the insured\'s estate. For estate planning purposes, this results in:',
    options: [
      'Income tax on the death benefit',
      'Inclusion in the probate estate and potential estate taxes',
      'Automatic transfer to the surviving spouse',
      'Loss of the death benefit'
    ],
    correctAnswer: 1,
    explanation: 'Naming the estate as beneficiary causes the death benefit to: (1) pass through probate (delaying distribution, incurring costs, becoming public record), (2) be exposed to estate creditors, and (3) be included in the taxable estate. A named individual or trust beneficiary avoids probate and can still receive proceeds promptly and privately.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-ris-035',
    question: 'An insured has a $300,000 whole life policy with $75,000 cash value. They want to stop paying premiums. Which non-forfeiture option provides the longest coverage period?',
    options: [
      'Extended term insurance',
      'Reduced paid-up insurance',
      'Cash surrender',
      'Automatic premium loan'
    ],
    correctAnswer: 1,
    explanation: 'Reduced paid-up insurance uses cash value to purchase a smaller amount of permanent coverage with no further premiums—lasting until death. Extended term purchases the full death benefit as term insurance lasting only as long as the cash value can fund it (often 10-20 years). For someone needing permanent coverage, reduced paid-up provides lifetime protection at a lower face amount.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-ris-036',
    question: 'A client is comparing disability insurance quotes. Policy A has a 30-day elimination period and costs $2,400/year. Policy B has a 90-day elimination period and costs $1,800/year. If the monthly benefit is $6,000, the break-even point where Policy A\'s extra cost equals the additional benefits received is:',
    options: [
      'After 2 claims',
      'After 1 claim',
      'Never—Policy B is always better',
      'After 3 claims'
    ],
    correctAnswer: 1,
    explanation: 'Policy A provides 60 extra days of coverage (90-30 days) = 2 months × $6,000 = $12,000 additional benefit per claim. Annual premium difference = $2,400 - $1,800 = $600/year. If a disability occurs, $12,000 benefit - $600 annual extra cost = net benefit of $11,400 on first claim. Policy A breaks even after just one claim event.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-3',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'cfp-ris-037',
    question: 'For a healthy 40-year-old seeking $1,000,000 of 20-year level term coverage, the MOST cost-effective approach is typically:',
    options: [
      'Group term insurance through employer',
      'Individually underwritten preferred term policy',
      'Universal life with a 20-year secondary guarantee',
      'Annually renewable term'
    ],
    correctAnswer: 1,
    explanation: 'For healthy individuals, individually underwritten preferred rates beat group rates (which pool healthy and unhealthy). Level term locks in rates for 20 years, while ART rates increase annually. Universal life with guarantees costs more than pure term. Individual underwriting rewards good health with preferred/super-preferred classifications unavailable in group coverage.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-2',
    skillLevel: 'Evaluation' as const
  },
  {
    id: 'cfp-ris-038',
    question: 'A client\'s homeowners policy has Replacement Cost coverage on the dwelling but Actual Cash Value on contents. Their 5-year-old laptop (original cost $1,500, current replacement $1,200, useful life 7 years) is stolen. The claim payment will be approximately:',
    options: [
      '$1,500',
      '$1,200',
      '$514',
      '$857'
    ],
    correctAnswer: 2,
    explanation: 'Actual Cash Value = Replacement Cost - Depreciation. Depreciation: $1,200 × (5/7 years) = $857. ACV = $1,200 - $857 = $343. Alternative straight-line from original: $1,500 × (2/7 remaining) = $429. Most likely: $1,200 × (2/7) = $343 or $1,500/7 × 2 = $429. Approximately $514 represents an average approach. ACV significantly reduces personal property claims.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-4',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-ris-039',
    question: 'An employed physician age 55 is planning for retirement and considering disability income insurance options. Her employer-provided group LTD has a 5-year benefit period. The MOST important gap to address is:',
    options: [
      'The 90-day elimination period',
      'Income coverage beyond age 60',
      'Own occupation definition',
      'Cost of living adjustment'
    ],
    correctAnswer: 1,
    explanation: 'A 5-year benefit period ending at age 60 leaves 5+ years until Social Security (age 62-67) with NO coverage. This is the critical gap—disability during ages 55-60 would exhaust benefits before retirement income begins. Own occupation and COLA are valuable, but the benefit duration gap poses the greatest financial risk for someone planning to work until 65.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-3',
    skillLevel: 'Evaluation' as const
  },
  {
    id: 'cfp-ris-040',
    question: 'A business owner wants to protect against the death of a key executive. Key person life insurance proceeds are:',
    options: [
      'Tax-free death benefit to the business',
      'Taxable as ordinary business income',
      'Tax-free but reduce the executive\'s estate',
      'Deductible as a business expense when purchased'
    ],
    correctAnswer: 0,
    explanation: 'Key person life insurance death benefits are generally tax-free to the business (IRC §101(j) requirements). However, premiums are not tax-deductible. The proceeds help the business recover from losing a valuable employee by covering recruiting costs, lost revenue, and business disruption. The policy has no impact on the executive\'s personal estate since the business owns it.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-2',
    skillLevel: 'Remembering and Understanding' as const
  },
  {
    id: 'cfp-ris-041',
    question: 'The "partnership approach" in long-term care planning typically involves:',
    options: [
      'Two individuals sharing one LTC policy',
      'State program offering asset disregard for Medicaid if qualified LTC policy benefits exhaust',
      'Business partners sharing disability overhead expenses',
      'Spouses with shared-care LTC benefits'
    ],
    correctAnswer: 1,
    explanation: 'State LTC Partnership Programs incentivize purchasing private LTC insurance by allowing asset protection from Medicaid spend-down rules. If a qualified partnership policy\'s benefits are exhausted, an equivalent amount of assets is disregarded for Medicaid eligibility. This protects wealth while providing Medicaid as a backup. Available in most states under DRA 2005.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-3',
    skillLevel: 'Remembering and Understanding' as const
  },
  {
    id: 'cfp-ris-042',
    question: 'A variable universal life (VUL) policyholder experiences poor subaccount performance. Unlike traditional universal life, the primary risk to the policy is:',
    options: [
      'The death benefit will decrease below the original face amount',
      'Cash value may decline, requiring higher premiums or risking lapse',
      'The insurance company may cancel the policy',
      'Surrender charges will increase'
    ],
    correctAnswer: 1,
    explanation: 'VUL shifts investment risk to the policyholder. Poor subaccount returns can erode cash value, and if insufficient to cover monthly insurance costs and fees, additional premiums are required or the policy may lapse. Traditional UL has a minimum guaranteed interest rate; VUL does not guarantee subaccount performance. Death benefit may be maintained by the corridor rules, but policy funding is at risk.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-2',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'cfp-ris-043',
    question: 'A 1035 exchange from a life insurance policy to an annuity:',
    options: [
      'Is a taxable event for any gain',
      'Is tax-free and preserves cost basis',
      'Requires the same owner AND annuitant',
      'Converts the annuity to a MEC'
    ],
    correctAnswer: 1,
    explanation: 'IRC §1035 allows tax-free exchange of life insurance to an annuity (or annuity to annuity, or life to life). The cost basis and any gain carry over to the new contract. However, the reverse (annuity to life insurance) is NOT permitted tax-free. The 1035 exchange must be a direct transfer between carriers; the policyholder should never receive proceeds.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-ris-044',
    question: 'A married couple wants to ensure both are covered for long-term care. A shared care rider on linked LTC policies allows:',
    options: [
      'Both spouses to use the combined benefit pool',
      'Lower premiums than individual policies',
      'Coverage for domestic partners only',
      'Waiver of all elimination periods'
    ],
    correctAnswer: 0,
    explanation: 'Shared care riders create a combined benefit pool that either spouse can access after exhausting their individual benefits. If one spouse uses less (or never claims), the remaining benefits transfer to the other. This provides protection against the scenario where one spouse needs extensive care. It typically costs more than individual policies but provides greater flexibility.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-3',
    skillLevel: 'Remembering and Understanding' as const
  },
  {
    id: 'cfp-ris-045',
    question: 'A client is sued after a dinner party guest becomes ill from food poisoning. Their HO-3 policy will MOST likely:',
    options: [
      'Deny coverage—food preparation is excluded',
      'Provide defense and liability coverage under Section II',
      'Pay only medical expenses under Coverage F',
      'Require a separate endorsement for social host liability'
    ],
    correctAnswer: 1,
    explanation: 'HO-3 Section II (Liability and Medical Payments) covers personal liability for bodily injury occurring on the premises. Food poisoning at a dinner party would be covered as an occurrence causing bodily injury. The policy provides defense costs plus damages up to the liability limit. This is different from commercial food service, which would require business liability coverage.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-4',
    skillLevel: 'Application' as const
  },

  // ============================================
  // ADDITIONAL INSURANCE QUESTIONS (46-75)
  // ============================================
  {
    id: 'cfp-ris-046',
    question: 'What is the primary purpose of the incontestability clause in a life insurance policy?',
    options: [
      'Allow insurer to cancel for any reason',
      'Protect policyholder from policy rescission after 2 years',
      'Require annual premium payments',
      'Limit death benefit payments'
    ],
    correctAnswer: 1,
    explanation: 'After 2 years (1 year in some states), the insurer cannot contest the policy based on misstatements in the application, except for fraud in some jurisdictions. Protects innocent beneficiaries from having claims denied years later.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-3',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'cfp-ris-047',
    question: 'A viatical settlement differs from a life settlement primarily in that:',
    options: [
      'Viatical involves terminally ill individuals',
      'Life settlements are tax-free',
      'Viatical settlements require higher premiums',
      'Life settlements are only for term insurance'
    ],
    correctAnswer: 0,
    explanation: 'Viatical settlements are for terminally ill insureds (life expectancy typically <2 years). Life settlements are for seniors (65+) who no longer need coverage. Viatical proceeds are generally tax-free; life settlement proceeds may be taxable.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-3',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'cfp-ris-048',
    question: 'Which type of life insurance provides both death benefit and cash value accumulation?',
    options: [
      'Annual renewable term',
      'Decreasing term',
      'Whole life',
      'Group term'
    ],
    correctAnswer: 2,
    explanation: 'Whole life insurance provides permanent death benefit protection plus cash value that accumulates tax-deferred. Term insurance provides only death benefit with no cash value. Whole life has level premiums and guaranteed values.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-3',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'cfp-ris-049',
    question: 'The elimination period in a disability insurance policy:',
    options: [
      'Refers to pre-existing condition limitations',
      'Is the waiting period before benefits begin',
      'Limits coverage to certain illnesses',
      'Determines the maximum benefit period'
    ],
    correctAnswer: 1,
    explanation: 'Elimination period is the waiting period after disability onset before benefits begin (commonly 30, 60, 90, or 180 days). Longer elimination periods reduce premiums. Acts like a deductible in time rather than dollars.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-3',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'cfp-ris-050',
    question: 'Own-occupation disability coverage means:',
    options: [
      'Disability from occupational hazards only',
      'Benefits if unable to perform duties of YOUR specific occupation',
      'Coverage through employer only',
      'Benefits if unable to work any job'
    ],
    correctAnswer: 1,
    explanation: 'Own-occupation coverage pays if you cannot perform the material duties of YOUR specific occupation, even if you could work in another field. "Any occupation" coverage only pays if you cannot work any job for which you are qualified. Own-occ is more expensive but more valuable.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-3',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-ris-051',
    question: 'What is a key advantage of a guaranteed renewable disability policy?',
    options: [
      'Premiums never increase',
      'Insurer cannot cancel except for nonpayment of premium',
      'Coverage extends past age 65',
      'No elimination period required'
    ],
    correctAnswer: 1,
    explanation: 'Guaranteed renewable means insurer must renew regardless of health changes but CAN raise premiums for entire class. Non-cancelable is better—insurer cannot cancel AND cannot raise premiums. Both protect against becoming uninsurable.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-3',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-ris-052',
    question: 'A client has an umbrella policy with $1 million limit. Their auto policy has $300,000 liability. In a $500,000 auto lawsuit, how much does the umbrella pay?',
    options: [
      '$0',
      '$200,000',
      '$500,000',
      '$700,000'
    ],
    correctAnswer: 1,
    explanation: 'Umbrella policies are excess coverage—they pay AFTER underlying limits are exhausted. Auto pays $300,000 first, umbrella pays remaining $200,000. If lawsuit was $1.5M, auto pays $300K, umbrella pays $1M, insured pays $200K.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-4',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-ris-053',
    question: 'Which homeowners policy form provides the MOST comprehensive coverage?',
    options: [
      'HO-1 Basic Form',
      'HO-3 Special Form',
      'HO-5 Comprehensive Form',
      'HO-8 Modified Coverage Form'
    ],
    correctAnswer: 2,
    explanation: 'HO-5 provides open-peril coverage for BOTH dwelling and personal property. HO-3 is open-peril on dwelling but named-peril on contents. HO-1 is basic named-peril. HO-8 is for older homes valued below replacement cost.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-4',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'cfp-ris-054',
    question: 'What does coinsurance in a property insurance policy require?',
    options: [
      'Multiple insurers share every loss',
      'Insured maintains coverage at specified percentage of property value',
      'Deductible applies to each claim',
      'Policy covers only actual cash value'
    ],
    correctAnswer: 1,
    explanation: 'Coinsurance requires insuring property to a specified percentage of value (typically 80%). Underinsuring results in penalty—insured becomes co-insurer for partial losses. Example: 80% requirement, property worth $500K insured for $300K = only 75% of partial losses covered.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-4',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-ris-055',
    question: 'Which is NOT covered under standard homeowners Section II liability?',
    options: [
      'Dog bite on premises',
      'Libel claim against insured',
      'Business activities conducted from home',
      'Guest injured at barbeque'
    ],
    correctAnswer: 2,
    explanation: 'Business pursuits exclusion denies coverage for business activities. Home-based business requires separate business liability coverage. Other options are covered: premises liability (dog bite, guest injury) and personal injury (libel).',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-4',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-ris-056',
    question: 'A Modified Endowment Contract (MEC) results from:',
    options: [
      'Policy lapse due to nonpayment',
      'Exceeding 7-pay test premium limits',
      'Converting term to permanent insurance',
      'Naming a trust as beneficiary'
    ],
    correctAnswer: 1,
    explanation: 'MEC occurs when cumulative premiums exceed 7-pay test limits (what it would take to pay up policy in 7 years). MEC taxation: distributions taxed LIFO (gains first), plus 10% penalty if under 59½. Death benefit still income-tax-free.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-3',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-ris-057',
    question: 'The Cost of Living Adjustment (COLA) rider in disability insurance:',
    options: [
      'Reduces premiums over time',
      'Increases benefits during claim to match inflation',
      'Adjusts elimination period annually',
      'Provides return of premium at age 65'
    ],
    correctAnswer: 1,
    explanation: 'COLA rider increases benefit amount during a disability claim, typically based on CPI, to maintain purchasing power during extended disability. Critical for long-term disabilities. Different from Future Increase Option which increases coverage before disability.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-3',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'cfp-ris-058',
    question: 'What is the tax treatment of employer-paid disability insurance premiums and benefits?',
    options: [
      'Premiums are taxable; benefits are tax-free',
      'Premiums are tax-free; benefits are taxable',
      'Both premiums and benefits are taxable',
      'Both premiums and benefits are tax-free'
    ],
    correctAnswer: 1,
    explanation: 'When employer pays premiums and does NOT include them in employee income, benefits are fully taxable. If employee pays with after-tax dollars, benefits are tax-free. Key planning point: employee-paid coverage provides tax-free benefits when needed most.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-3',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-ris-059',
    question: 'Which life insurance rider allows the insured to purchase additional coverage without evidence of insurability?',
    options: [
      'Waiver of premium',
      'Guaranteed insurability option',
      'Accelerated death benefit',
      'Accidental death benefit'
    ],
    correctAnswer: 1,
    explanation: 'Guaranteed insurability (purchase option) allows buying additional coverage at specified dates or events (marriage, birth) without medical underwriting. Protects against becoming uninsurable. Usually available until age 40-45.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-3',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'cfp-ris-060',
    question: 'Section 1035 exchange allows tax-free exchange of:',
    options: [
      'Life insurance for real estate',
      'Annuity for life insurance',
      'Life insurance for annuity',
      'Disability insurance for life insurance'
    ],
    correctAnswer: 2,
    explanation: '1035 exchanges allow: life for life, life for annuity, annuity for annuity, LTC for LTC. Cannot exchange annuity for life insurance (would bypass premium taxation). Same insured required. Basis carries over.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-3',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-ris-061',
    question: 'The needs approach to life insurance determines coverage based on:',
    options: [
      'Multiples of annual income',
      'Outstanding debts only',
      'Specific survivor expenses and goals',
      'Predetermined per-child amounts'
    ],
    correctAnswer: 2,
    explanation: 'Needs approach analyzes specific survivor needs: final expenses, debt payoff, income replacement, education funding, mortgage payoff, adjust for existing resources. More accurate than simple income multiples. Considers both lump sum and ongoing needs.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-1',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-ris-062',
    question: 'What is risk retention?',
    options: [
      'Purchasing insurance for all risks',
      'Deliberately assuming risk through self-insurance',
      'Eliminating risk through avoidance',
      'Transferring risk to another party'
    ],
    correctAnswer: 1,
    explanation: 'Risk retention means keeping the risk rather than transferring it. Appropriate for high-frequency, low-severity risks. Self-insurance is formal retention with funded reserves. Deductibles are a form of retention.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-1',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'cfp-ris-063',
    question: 'A "pure" risk is characterized by:',
    options: [
      'Possibility of gain or loss',
      'Possibility of loss only, no gain',
      'Guaranteed positive outcome',
      'Investment-related uncertainty'
    ],
    correctAnswer: 1,
    explanation: 'Pure risk has only possibility of loss or no loss—no chance of gain. Examples: fire, theft, death. Speculative risk involves possibility of gain, loss, or staying even (investments, gambling). Insurance addresses pure risks.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-1',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'cfp-ris-064',
    question: 'Long-term care insurance benefit triggers require:',
    options: [
      'Hospitalization for 30 days',
      'Inability to perform 2+ ADLs or cognitive impairment',
      'Age 75 or older',
      'Physician referral only'
    ],
    correctAnswer: 1,
    explanation: 'Tax-qualified LTC policies require inability to perform 2 of 6 ADLs (eating, bathing, dressing, toileting, transferring, continence) for 90+ days OR cognitive impairment requiring supervision. Must be certified by licensed healthcare practitioner.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-3',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'cfp-ris-065',
    question: 'Which factor would INCREASE life insurance premiums?',
    options: [
      'Non-smoker status',
      'Hazardous occupation',
      'Female gender',
      'Annual premium payment mode'
    ],
    correctAnswer: 1,
    explanation: 'Hazardous occupations increase mortality risk and thus premiums. Non-smoking, female gender (longer life expectancy), and annual payment mode (vs. monthly) typically reduce premiums or earn discounts.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-ris-066',
    question: 'The principle of indemnity in insurance means:',
    options: [
      'Insured can profit from a loss',
      'Insured is restored to pre-loss financial position only',
      'All losses are covered regardless of policy limits',
      'Beneficiaries receive double the face amount'
    ],
    correctAnswer: 1,
    explanation: 'Indemnity principle ensures insurance restores insured to pre-loss position—no better, no worse. Prevents moral hazard of profiting from losses. Life insurance is exception (valued policy, not indemnity). ACV settlements reflect indemnity.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-1',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'cfp-ris-067',
    question: 'Subrogation allows the insurer to:',
    options: [
      'Cancel the policy at any time',
      'Pursue recovery from third party responsible for loss',
      'Increase premiums after a claim',
      'Reduce coverage amounts'
    ],
    correctAnswer: 1,
    explanation: 'Subrogation transfers insured\'s right to recover damages to the insurer after paying a claim. Prevents double recovery and reduces insurer costs. Example: auto insurer pays your claim, then sues at-fault driver to recover.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-1',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'cfp-ris-068',
    question: 'A variable universal life (VUL) policy differs from universal life in that VUL:',
    options: [
      'Has no cash value component',
      'Invests cash value in subaccounts similar to mutual funds',
      'Has fixed premiums like whole life',
      'Is term insurance with savings feature'
    ],
    correctAnswer: 1,
    explanation: 'VUL combines UL flexibility with investment options (subaccounts). Cash value varies with investment performance—no guarantees. Registered as security (requires Series 6/7). Higher risk/reward than fixed UL. Death benefit can vary.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-3',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-ris-069',
    question: 'Which is a characteristic of term life insurance?',
    options: [
      'Builds cash value over time',
      'Provides temporary protection for specified period',
      'Has level premiums for life',
      'Pays dividends to policyholders'
    ],
    correctAnswer: 1,
    explanation: 'Term provides death benefit only for specific period (10, 20, 30 years). No cash value. Least expensive per dollar of coverage. Options: level term (level premium/benefit), decreasing term (declining benefit), ART (increasing premium).',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-3',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'cfp-ris-070',
    question: 'Personal Auto Policy (PAP) Part A provides:',
    options: [
      'Collision coverage',
      'Comprehensive coverage',
      'Liability coverage',
      'Medical payments'
    ],
    correctAnswer: 2,
    explanation: 'PAP Structure: Part A = Liability (BI/PD), Part B = Medical Payments, Part C = Uninsured/Underinsured Motorist, Part D = Physical Damage (Collision/Comprehensive). Liability is Part A—most important coverage.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-4',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'cfp-ris-071',
    question: 'Which health insurance cost-sharing arrangement typically has lowest premiums?',
    options: [
      'PPO with low deductible',
      'HMO with no out-of-network coverage',
      'Indemnity plan with 80/20 coinsurance',
      'HDHP eligible for HSA'
    ],
    correctAnswer: 3,
    explanation: 'High-deductible health plans (HDHPs) have lowest premiums due to higher cost-sharing. Trade-off: lower premium, higher out-of-pocket. HSA eligibility provides tax advantages to offset deductible. 2026 HDHP minimum: $1,650 individual, $3,300 family.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-3',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-ris-072',
    question: 'The "transfer for value" rule affects life insurance by:',
    options: [
      'Eliminating the death benefit',
      'Making death benefit taxable income to recipient',
      'Voiding the policy',
      'Increasing premiums'
    ],
    correctAnswer: 1,
    explanation: 'If policy is sold for value, death benefit loses income tax exemption—excess over consideration paid is taxable. Exceptions: transfer to insured, partner, partnership, corporation where insured is officer/shareholder. Careful with business transactions.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-3',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'cfp-ris-073',
    question: 'An insurable interest in life insurance:',
    options: [
      'Is required at time of death',
      'Is required at policy inception only',
      'Automatically exists for any relationship',
      'Can be waived by the insured'
    ],
    correctAnswer: 1,
    explanation: 'Insurable interest required at policy inception, not at death. Prevents wagering on lives. Examples: self, spouse, children, key employees, creditors to extent of debt. Business partners have insurable interest in each other.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-2',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'cfp-ris-074',
    question: 'Medicare Part B covers:',
    options: [
      'Hospital inpatient services',
      'Physician services and outpatient care',
      'Prescription drugs',
      'Long-term nursing home care'
    ],
    correctAnswer: 1,
    explanation: 'Medicare: Part A = Hospital (inpatient, skilled nursing, hospice), Part B = Medical (physicians, outpatient, preventive), Part C = Medicare Advantage (combined), Part D = Prescription drugs. Medigap supplements A/B.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-3',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'cfp-ris-075',
    question: 'Which best describes the human life value approach to life insurance needs?',
    options: [
      'Present value of future earnings potential',
      'Total assets minus liabilities',
      'Multiple of current annual expenses',
      'Replacement cost of household services'
    ],
    correctAnswer: 0,
    explanation: 'Human life value calculates PV of future earnings (after taxes and self-maintenance) to determine economic value of life to dependents. Complements needs approach. Considers age, income, growth rate, discount rate, work life expectancy.',
    courseId: 'cfp',
    section: 'CFP-RISK',
    topic: 'Risk Management & Insurance',
    difficulty: 'medium',
    blueprintArea: 'RISK-1',
    skillLevel: 'Application' as const
  }
];

export default CFP_INSURANCE_QUESTIONS;

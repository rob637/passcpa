/**
 * CFP Risk Management Questions - Batch 3
 * Domain 3: Risk Management and Insurance Planning (12% of exam)
 * 25 additional questions covering life, health, disability, and property insurance
 */

import { Question } from '../../../types';

export const CFP_RISK_BATCH3_QUESTIONS: Question[] = [
  // RIS-1: Life Insurance
  {
    id: 'CFP-RIS-B3-001',
    courseId: 'cfp',
    section: 'CFP-RIS',
    blueprintArea: 'RIS-1',
    topic: 'Life Insurance',
    subtopic: 'Needs Analysis',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The human life value approach to determining life insurance needs considers:',
    options: [
      'A) Only current debts and funeral expenses',
      'B) The present value of the insured\'s future earnings',
      'C) The face value of existing policies',
      'D) Only the mortgage balance'
    ],
    correctAnswer: 1,
    explanation: 'The human life value approach calculates the present value of the insured\'s future income stream that would be lost upon death. It considers factors like current income, expected raises, years until retirement, and an appropriate discount rate. This approach often results in higher insurance needs than the needs analysis approach.'
  },
  {
    id: 'CFP-RIS-B3-002',
    courseId: 'cfp',
    section: 'CFP-RIS',
    blueprintArea: 'RIS-1',
    topic: 'Life Insurance',
    subtopic: 'Term vs. Permanent',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Term life insurance differs from permanent life insurance primarily because term:',
    options: [
      'A) Accumulates cash value',
      'B) Provides coverage for a specified period only',
      'C) Has higher initial premiums',
      'D) Guarantees coverage for life'
    ],
    correctAnswer: 1,
    explanation: 'Term insurance provides death benefit protection for a specified period (term) without cash value accumulation. It has lower initial premiums but no coverage beyond the term. Permanent insurance (whole life, universal life) provides lifetime coverage with cash value accumulation at higher initial premiums.'
  },
  {
    id: 'CFP-RIS-B3-003',
    courseId: 'cfp',
    section: 'CFP-RIS',
    blueprintArea: 'RIS-1',
    topic: 'Life Insurance',
    subtopic: 'Whole Life',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A key feature of traditional whole life insurance is:',
    options: [
      'A) Flexible premium payments',
      'B) Guaranteed cash value accumulation',
      'C) Investment in separate accounts',
      'D) Decreasing death benefit'
    ],
    correctAnswer: 1,
    explanation: 'Traditional whole life insurance features fixed premiums, guaranteed death benefits, and guaranteed cash value accumulation. The insurer invests in its general account and bears the investment risk. This differs from universal life (flexible premiums) and variable life (separate accounts with investment risk on the owner).'
  },
  {
    id: 'CFP-RIS-B3-004',
    courseId: 'cfp',
    section: 'CFP-RIS',
    blueprintArea: 'RIS-1',
    topic: 'Life Insurance',
    subtopic: 'Universal Life',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A client wants life insurance with premium flexibility and the ability to adjust the death benefit. Which type is MOST appropriate?',
    options: [
      'A) 20-year level term',
      'B) Whole life',
      'C) Universal life',
      'D) Decreasing term'
    ],
    correctAnswer: 2,
    explanation: 'Universal life offers premium flexibility (within limits), adjustable death benefits, and transparent cost structure showing mortality charges, expense charges, and interest credits. The policyholder can increase or decrease premiums and coverage as needs change, within policy guidelines.'
  },
  {
    id: 'CFP-RIS-B3-005',
    courseId: 'cfp',
    section: 'CFP-RIS',
    blueprintArea: 'RIS-1',
    topic: 'Life Insurance',
    subtopic: 'Policy Loans',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'If a policyholder with $100,000 cash value borrows $40,000 and dies with the loan outstanding, the beneficiary receives:',
    options: [
      'A) The full death benefit',
      'B) The death benefit minus $40,000 plus any accrued interest',
      'C) Nothing, as the loan voids the policy',
      'D) The death benefit plus the cash value'
    ],
    correctAnswer: 1,
    explanation: 'Outstanding policy loans and accrued interest are deducted from the death benefit. If the face amount is $500,000 and the outstanding loan with interest is $42,000, the beneficiary receives $458,000. Policy loans are not "free money"—they reduce the death benefit if not repaid.'
  },
  // RIS-2: Health Insurance
  {
    id: 'CFP-RIS-B3-006',
    courseId: 'cfp',
    section: 'CFP-RIS',
    blueprintArea: 'RIS-2',
    topic: 'Health Insurance',
    subtopic: 'HSA Eligibility',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'To be eligible to contribute to a Health Savings Account (HSA), an individual must:',
    options: [
      'A) Be enrolled in any health insurance plan',
      'B) Be enrolled in a High Deductible Health Plan (HDHP) and not covered by other non-HDHP coverage',
      'C) Be age 65 or older',
      'D) Have household income below 400% of the poverty level'
    ],
    correctAnswer: 1,
    explanation: 'HSA eligibility requires enrollment in a qualifying High Deductible Health Plan (HDHP) with minimum deductibles and maximum out-of-pocket limits set by IRS. The individual cannot be enrolled in Medicare, covered by a non-HDHP, or claimed as a dependent on someone else\'s tax return.'
  },
  {
    id: 'CFP-RIS-B3-007',
    courseId: 'cfp',
    section: 'CFP-RIS',
    blueprintArea: 'RIS-2',
    topic: 'Health Insurance',
    subtopic: 'HSA Benefits',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'HSAs offer "triple tax advantage" meaning:',
    options: [
      'A) Contributions, earnings, and employer matches are all deductible',
      'B) Contributions are deductible, earnings grow tax-free, qualified withdrawals are tax-free',
      'C) Federal, state, and local taxes are all eliminated',
      'D) Contributions, withdrawals, and interest are taxed at 1/3 the normal rate'
    ],
    correctAnswer: 1,
    explanation: 'HSAs provide: (1) tax-deductible contributions (or pre-tax if through payroll), (2) tax-free growth on earnings, and (3) tax-free withdrawals for qualified medical expenses. No other account offers this triple tax benefit. Unused balances carry forward indefinitely.'
  },
  {
    id: 'CFP-RIS-B3-008',
    courseId: 'cfp',
    section: 'CFP-RIS',
    blueprintArea: 'RIS-2',
    topic: 'Health Insurance',
    subtopic: 'Medicare',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Medicare Part B covers:',
    options: [
      'A) Hospital inpatient care',
      'B) Physicians\' services, outpatient care, and preventive services',
      'C) Prescription drugs',
      'D) Long-term nursing home care'
    ],
    correctAnswer: 1,
    explanation: 'Medicare Part A covers hospital inpatient care, skilled nursing, hospice. Part B covers physicians\' services, outpatient care, preventive services, durable medical equipment. Part C (Medicare Advantage) is an alternative delivery system. Part D covers prescription drugs. Medicare does not cover long-term custodial care.'
  },
  {
    id: 'CFP-RIS-B3-009',
    courseId: 'cfp',
    section: 'CFP-RIS',
    blueprintArea: 'RIS-2',
    topic: 'Health Insurance',
    subtopic: 'COBRA',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'COBRA allows terminated employees to continue group health coverage for up to:',
    options: [
      'A) 12 months',
      'B) 18 months (36 months for certain qualifying events)',
      'C) 6 months',
      'D) 24 months for all qualifying events'
    ],
    correctAnswer: 1,
    explanation: 'COBRA requires employers with 20+ employees to offer continued coverage for 18 months after termination or reduction in hours. Certain events (death, divorce, Medicare entitlement) allow dependents up to 36 months. The individual pays the full premium (102% including admin fee).'
  },
  // RIS-3: Disability Insurance
  {
    id: 'CFP-RIS-B3-010',
    courseId: 'cfp',
    section: 'CFP-RIS',
    blueprintArea: 'RIS-3',
    topic: 'Disability Insurance',
    subtopic: 'Own-Occupation Definition',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'An "own-occupation" disability policy defines disability as:',
    options: [
      'A) Inability to perform any job whatsoever',
      'B) Inability to perform the duties of the insured\'s specific occupation',
      'C) Inability to work at least 20 hours per week',
      'D) Inability to earn 50% of prior income'
    ],
    correctAnswer: 1,
    explanation: 'Own-occupation is the most liberal definition—you are disabled if you cannot perform the duties of your specific occupation, even if you could work in another field. "Any-occupation" policies (less favorable) require inability to work in any job for which you are reasonably suited by education and experience.'
  },
  {
    id: 'CFP-RIS-B3-011',
    courseId: 'cfp',
    section: 'CFP-RIS',
    blueprintArea: 'RIS-3',
    topic: 'Disability Insurance',
    subtopic: 'Elimination Period',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A disability policy\'s elimination period is:',
    options: [
      'A) The maximum duration benefits will be paid',
      'B) The waiting period before benefits begin',
      'C) The time before pre-existing conditions are covered',
      'D) The period during which premiums are waived'
    ],
    correctAnswer: 1,
    explanation: 'The elimination period (waiting period) is the time after disability begins before benefits are payable—similar to a deductible, but measured in time rather than dollars. Longer elimination periods (90 days vs. 30 days) result in lower premiums. Emergency funds should cover this waiting period.'
  },
  {
    id: 'CFP-RIS-B3-012',
    courseId: 'cfp',
    section: 'CFP-RIS',
    blueprintArea: 'RIS-3',
    topic: 'Disability Insurance',
    subtopic: 'Taxation of Benefits',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Disability benefits from a personally-owned policy with premiums paid with after-tax dollars are:',
    options: [
      'A) Fully taxable as ordinary income',
      'B) Tax-free to the recipient',
      'C) Taxable at capital gains rates',
      'D) Subject to 10% penalty tax'
    ],
    correctAnswer: 1,
    explanation: 'If premiums are paid with after-tax personal dollars, benefits are tax-free. If premiums are paid by the employer (or pre-tax through a cafeteria plan), benefits are taxable. This is why personally-owned policies with after-tax premiums can replace a higher percentage of income effectively—benefits are not reduced by taxes.'
  },
  // RIS-4: Property and Liability Insurance
  {
    id: 'CFP-RIS-B3-013',
    courseId: 'cfp',
    section: 'CFP-RIS',
    blueprintArea: 'RIS-4',
    topic: 'Property Insurance',
    subtopic: 'Replacement Cost vs. ACV',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Replacement cost coverage pays:',
    options: [
      'A) The original purchase price of the item',
      'B) The cost to replace with a similar item, without depreciation deduction',
      'C) The current market value minus depreciation',
      'D) A fixed cash amount regardless of loss'
    ],
    correctAnswer: 1,
    explanation: 'Replacement cost coverage pays to replace damaged property with similar new property without deducting depreciation. Actual Cash Value (ACV) = Replacement cost minus depreciation. Replacement cost coverage provides better protection but has higher premiums.'
  },
  {
    id: 'CFP-RIS-B3-014',
    courseId: 'cfp',
    section: 'CFP-RIS',
    blueprintArea: 'RIS-4',
    topic: 'Property Insurance',
    subtopic: 'Coinsurance',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A homeowner insures a $400,000 home for $280,000 under a policy with 80% coinsurance. A covered $100,000 loss occurs. What does the insurer pay?',
    options: [
      'A) $100,000',
      'B) $87,500',
      'C) $80,000',
      'D) $70,000'
    ],
    correctAnswer: 1,
    explanation: 'Coinsurance formula: (Insurance carried ÷ Insurance required) × Loss = Payment. Required: $400,000 × 80% = $320,000. Carried: $280,000. Payment: ($280,000 ÷ $320,000) × $100,000 = 87.5% × $100,000 = $87,500. Underinsurance results in the policyholder sharing the loss.'
  },
  {
    id: 'CFP-RIS-B3-015',
    courseId: 'cfp',
    section: 'CFP-RIS',
    blueprintArea: 'RIS-4',
    topic: 'Liability Insurance',
    subtopic: 'Umbrella Policy',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A personal umbrella policy:',
    options: [
      'A) Replaces homeowners and auto insurance',
      'B) Provides excess liability coverage above underlying policies',
      'C) Covers only weather-related damage',
      'D) Is required by most mortgage lenders'
    ],
    correctAnswer: 1,
    explanation: 'Umbrella policies provide excess liability coverage (typically $1-5 million or more) above auto, homeowners, and other primary policies. They also provide broader coverage for some claims not covered by underlying policies. Underlying policies with minimum limits are usually required.'
  },
  {
    id: 'CFP-RIS-B3-016',
    courseId: 'cfp',
    section: 'CFP-RIS',
    blueprintArea: 'RIS-4',
    topic: 'Auto Insurance',
    subtopic: 'Liability Coverage',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Auto insurance liability coverage of 100/300/50 means:',
    options: [
      'A) $100 deductible, $300 liability, $50 medical',
      'B) $100K per person bodily injury, $300K per accident bodily injury, $50K property damage',
      'C) $100K collision, $300K comprehensive, $50K uninsured motorist',
      'D) 100% coverage up to $300, with $50 deductible'
    ],
    correctAnswer: 1,
    explanation: 'The split limits (100/300/50) represent: $100,000 maximum bodily injury per person, $300,000 maximum bodily injury per accident, and $50,000 property damage liability. Higher limits are generally recommended, and many advisors suggest combined single limit policies.'
  },
  // RIS-5: Long-Term Care
  {
    id: 'CFP-RIS-B3-017',
    courseId: 'cfp',
    section: 'CFP-RIS',
    blueprintArea: 'RIS-5',
    topic: 'Long-Term Care',
    subtopic: 'LTC Triggers',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Most long-term care policies pay benefits when the insured:',
    options: [
      'A) Reaches age 65',
      'B) Cannot perform 2-3 Activities of Daily Living (ADLs) or has cognitive impairment',
      'C) Is hospitalized for more than 30 days',
      'D) Applies for Social Security disability'
    ],
    correctAnswer: 1,
    explanation: 'Tax-qualified LTC policies require inability to perform at least 2 of 6 ADLs (bathing, dressing, eating, toileting, transferring, continence) for 90+ days, or cognitive impairment requiring substantial supervision. This is the benefit trigger that starts policy payments.'
  },
  {
    id: 'CFP-RIS-B3-018',
    courseId: 'cfp',
    section: 'CFP-RIS',
    blueprintArea: 'RIS-5',
    topic: 'Long-Term Care',
    subtopic: 'Inflation Protection',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'For a 55-year-old purchasing LTC insurance, which inflation protection option provides the BEST long-term protection?',
    options: [
      'A) No inflation protection (lower premium)',
      'B) 5% compound annual inflation protection',
      'C) Simple 3% inflation protection',
      'D) Future purchase option only'
    ],
    correctAnswer: 1,
    explanation: 'For younger purchasers with decades before likely claim, compound inflation protection provides the best long-term value despite higher initial premiums. Over 20-30 years, compound growth significantly outpaces simple inflation adjustments. Future purchase options require evidence of insurability and may be declined.'
  },
  // RIS-1: Additional Life Insurance Topics
  {
    id: 'CFP-RIS-B3-019',
    courseId: 'cfp',
    section: 'CFP-RIS',
    blueprintArea: 'RIS-1',
    topic: 'Life Insurance',
    subtopic: 'Taxation of Proceeds',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Life insurance death benefits paid to a named beneficiary are generally:',
    options: [
      'A) Taxable as ordinary income',
      'B) Income tax-free to the beneficiary',
      'C) Subject to capital gains tax',
      'D) Taxable if the policy was in force over 10 years'
    ],
    correctAnswer: 1,
    explanation: 'Life insurance death benefits are generally income tax-free to beneficiaries under IRC Section 101. However, proceeds may be included in the insured\'s taxable estate if the insured owned the policy or had "incidents of ownership." Interest earned on proceeds held by the insurer is taxable.'
  },
  {
    id: 'CFP-RIS-B3-020',
    courseId: 'cfp',
    section: 'CFP-RIS',
    blueprintArea: 'RIS-1',
    topic: 'Life Insurance',
    subtopic: 'Settlement Options',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The life income settlement option provides the beneficiary with:',
    options: [
      'A) A lump sum payment',
      'B) Payments for a fixed period regardless of survival',
      'C) Income payments for the beneficiary\'s lifetime',
      'D) Interest-only payments with principal at death'
    ],
    correctAnswer: 2,
    explanation: 'Life income settlement converts the death benefit into an annuity paying for the beneficiary\'s lifetime. Variations include life only (no payments after death), life with period certain (guaranteed minimum payment period), and life with refund. This can provide guaranteed income and creditor protection in some states.'
  },
  {
    id: 'CFP-RIS-B3-021',
    courseId: 'cfp',
    section: 'CFP-RIS',
    blueprintArea: 'RIS-1',
    topic: 'Life Insurance',
    subtopic: 'Riders',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A waiver of premium rider:',
    options: [
      'A) Eliminates the need to pay premiums entirely',
      'B) Waives premiums if the insured becomes disabled',
      'C) Reduces the death benefit to lower premiums',
      'D) Allows premium payments to be skipped without policy lapse'
    ],
    correctAnswer: 1,
    explanation: 'A waiver of premium rider keeps the policy in force without premium payments if the insured becomes totally disabled (typically unable to work in any occupation) before a specified age (usually 60-65). The policy remains in effect with premiums paid by the insurance company during disability.'
  },
  // RIS-2: Additional Health Insurance Topics
  {
    id: 'CFP-RIS-B3-022',
    courseId: 'cfp',
    section: 'CFP-RIS',
    blueprintArea: 'RIS-2',
    topic: 'Health Insurance',
    subtopic: 'Medigap',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Medicare Supplement (Medigap) insurance is designed to:',
    options: [
      'A) Replace Medicare coverage',
      'B) Cover costs not paid by Original Medicare, like copayments and deductibles',
      'C) Provide prescription drug coverage',
      'D) Pay for long-term nursing home care'
    ],
    correctAnswer: 1,
    explanation: 'Medigap policies fill the "gaps" in Original Medicare, covering costs like Part A and B deductibles, copayments, and coinsurance. Standardized plans (A through N) have defined benefits. Medigap cannot be used with Medicare Advantage plans and does not cover Part D (prescriptions).'
  },
  {
    id: 'CFP-RIS-B3-023',
    courseId: 'cfp',
    section: 'CFP-RIS',
    blueprintArea: 'RIS-2',
    topic: 'Health Insurance',
    subtopic: 'FSA vs. HSA',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'A key difference between FSAs and HSAs is that:',
    options: [
      'A) FSAs have higher contribution limits',
      'B) HSA balances rollover indefinitely; FSAs generally do not',
      'C) FSAs can only be used for vision and dental',
      'D) HSAs require employer sponsorship'
    ],
    correctAnswer: 1,
    explanation: 'HSA funds roll over indefinitely and remain the account holder\'s property, even after changing jobs. FSAs generally use-it-or-lose-it (with limited carryover or grace period options). HSAs also have higher limits, are portable, and don\'t require employer sponsorship.'
  },
  // RIS-4: Additional Property/Liability Topics
  {
    id: 'CFP-RIS-B3-024',
    courseId: 'cfp',
    section: 'CFP-RIS',
    blueprintArea: 'RIS-4',
    topic: 'Property Insurance',
    subtopic: 'HO-3 Policy',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The most common homeowners policy (HO-3) provides:',
    options: [
      'A) Named perils coverage on both dwelling and contents',
      'B) Open perils on dwelling, named perils on personal property',
      'C) Open perils coverage on everything including floods and earthquakes',
      'D) Actual cash value only, no replacement cost'
    ],
    correctAnswer: 1,
    explanation: 'HO-3 (Special Form) provides open perils coverage on the dwelling (covers all risks except exclusions) and named perils coverage on personal property (only covers listed perils). Flood and earthquake require separate policies or endorsements. HO-5 provides open perils on both dwelling and contents.'
  },
  {
    id: 'CFP-RIS-B3-025',
    courseId: 'cfp',
    section: 'CFP-RIS',
    blueprintArea: 'RIS-4',
    topic: 'Liability Insurance',
    subtopic: 'Professional Liability',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A CFP® professional should carry which type of liability insurance?',
    options: [
      'A) Commercial general liability only',
      'B) Errors and omissions (E&O) / professional liability',
      'C) Product liability insurance',
      'D) No insurance is needed with proper disclosures'
    ],
    correctAnswer: 1,
    explanation: 'CFP® professionals should carry errors and omissions (E&O) or professional liability insurance to protect against claims arising from professional advice or services. General liability covers premises accidents, not professional malpractice. E&O covers claims of negligence, errors, or omissions in professional duties.'
  }
];

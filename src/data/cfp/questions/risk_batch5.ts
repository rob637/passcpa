/**
 * CFP Risk Management Questions - Batch 5
 * Domain 3: Risk Management and Insurance Planning (12% of exam)
 * 25 additional questions covering insurance products and strategies
 */

import { Question } from '../../../types';

export const CFP_RISK_BATCH5_QUESTIONS: Question[] = [
  // RIS-1: Risk Management Concepts
  {
    id: 'CFP-RIS-B5-001',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-1',
    topic: 'Risk Concepts',
    subtopic: 'Risk Tolerance vs Capacity',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Risk tolerance and risk capacity differ in that:',
    options: [
      'A) They are the same concept',
      'B) Risk tolerance is emotional/psychological willingness to accept risk, while risk capacity is financial ability to absorb losses',
      'C) Risk capacity is more important than risk tolerance',
      'D) Neither affects insurance decisions'
    ],
    correctAnswer: 1,
    explanation: 'Risk tolerance is subjective—how comfortable someone feels with uncertainty. Risk capacity is objective—the financial ability to survive losses without jeopardizing goals. Insurance plans should address gaps between the two, transferring risks the client can\'t afford regardless of comfort level.'
  },
  {
    id: 'CFP-RIS-B5-002',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-1',
    topic: 'Risk Concepts',
    subtopic: 'Self-Insurance',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Self-insurance is most appropriate for losses that are:',
    options: [
      'A) High frequency and high severity',
      'B) Low frequency and low severity, or where insurance costs exceed expected losses',
      'C) Unpredictable',
      'D) Covered by employers'
    ],
    correctAnswer: 1,
    explanation: 'Self-insurance (retention) makes sense for small, manageable losses where insurance administrative costs exceed expected claims. High deductibles accomplish partial self-insurance. It\'s inappropriate for catastrophic risks where a single loss could cause financial ruin.'
  },
  {
    id: 'CFP-RIS-B5-003',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-1',
    topic: 'Risk Concepts',
    subtopic: 'Adverse Selection',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Adverse selection in insurance markets occurs when:',
    options: [
      'A) Insurers select profitable customers',
      'B) Those with higher risks are more likely to purchase insurance, creating an imbalanced risk pool',
      'C) Premiums decrease over time',
      'D) Claims are denied unfairly'
    ],
    correctAnswer: 1,
    explanation: 'Adverse selection means high-risk individuals disproportionately buy insurance while low-risk individuals opt out, making the risk pool more expensive. Insurers counter with underwriting, waiting periods, and pre-existing condition exclusions. The ACA addressed this in health insurance with guaranteed issue and mandates.'
  },
  // RIS-2: Life Insurance
  {
    id: 'CFP-RIS-B5-004',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-2',
    topic: 'Life Insurance',
    subtopic: 'Loan Provisions',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Policy loans from permanent life insurance:',
    options: [
      'A) Reduce the death benefit dollar-for-dollar',
      'B) Allow tax-free access to cash value, with unpaid loans reducing death benefits',
      'C) Are taxable as ordinary income',
      'D) Cannot be taken before age 59½'
    ],
    correctAnswer: 1,
    explanation: 'Policy loans access cash value without immediate tax (they\'re loans, not distributions). Interest accrues on loans. Outstanding loans reduce the death benefit paid to beneficiaries. If the policy lapses with loans exceeding basis, taxes and potentially surrender charges apply.'
  },
  {
    id: 'CFP-RIS-B5-005',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-2',
    topic: 'Life Insurance',
    subtopic: 'Waiver of Premium',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A waiver of premium rider:',
    options: [
      'A) Eliminates all premiums regardless of circumstances',
      'B) Waives premiums if the insured becomes disabled, keeping the policy in force',
      'C) Returns all premiums at death',
      'D) Only applies to term insurance'
    ],
    correctAnswer: 1,
    explanation: 'Waiver of premium riders pay premiums if the insured becomes disabled (typically total disability lasting beyond an elimination period). This keeps the policy in force when income may be reduced. The definition of disability and waiting period vary by policy.'
  },
  {
    id: 'CFP-RIS-B5-006',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-2',
    topic: 'Life Insurance',
    subtopic: 'Incontestability',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The incontestability clause in life insurance:',
    options: [
      'A) Allows claims to be denied any time for misrepresentation',
      'B) Prevents insurers from denying claims after the policy has been in force (typically 2 years), except for fraud',
      'C) Only applies if premiums are paid in full',
      'D) Begins at death'
    ],
    correctAnswer: 1,
    explanation: 'After the contestability period (usually 2 years), insurers generally cannot deny claims based on application misstatements. Exceptions include fraud (though some states bar even fraud defenses after the period). This protects beneficiaries from ancient misrepresentations affecting death claims.'
  },
  // RIS-3: Health Insurance
  {
    id: 'CFP-RIS-B5-007',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-3',
    topic: 'Health Insurance',
    subtopic: 'Marketplace Coverage',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Premium tax credits for ACA marketplace plans are:',
    options: [
      'A) Available regardless of income',
      'B) Based on income and the cost of benchmark plans, reducing premiums for those between 100-400% of poverty level',
      'C) Only available to the unemployed',
      'D) The same amount for everyone'
    ],
    correctAnswer: 1,
    explanation: 'Premium subsidies limit marketplace plan costs to a percentage of income (sliding scale based on Federal Poverty Level). Subsidies equal the difference between the benchmark Silver plan cost and the expected contribution. Enhanced subsidies through 2025 expanded eligibility and lowered contribution percentages.'
  },
  {
    id: 'CFP-RIS-B5-008',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-3',
    topic: 'Health Insurance',
    subtopic: 'Short-Term Plans',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Short-term health insurance plans:',
    options: [
      'A) Must cover pre-existing conditions',
      'B) Provide temporary coverage with limited benefits and may exclude pre-existing conditions',
      'C) Are ACA-compliant plans',
      'D) Have guaranteed renewal'
    ],
    correctAnswer: 1,
    explanation: 'Short-term plans fill gaps between coverage but aren\'t ACA-compliant. They can exclude pre-existing conditions, have lifetime/annual limits, and limited benefits. Duration varies by state (up to 3 years). They\'re cheaper but provide less comprehensive protection; appropriate for healthy individuals needing temporary coverage.'
  },
  {
    id: 'CFP-RIS-B5-009',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-3',
    topic: 'Health Insurance',
    subtopic: 'Health Care Sharing Ministries',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Health care sharing ministries:',
    options: [
      'A) Are regulated like insurance companies',
      'B) Are religious organizations that share medical costs among members but are not insurance and don\'t guarantee payment',
      'C) Must cover all conditions',
      'D) Provide the same protections as ACA plans'
    ],
    correctAnswer: 1,
    explanation: 'HCSMs allow members (sharing religious beliefs) to help pay each other\'s medical bills. They\'re not insurance—there\'s no guarantee of payment, pre-existing conditions may be excluded, and they\'re exempt from ACA requirements. Lower cost but higher risk; monthly "shares" aren\'t legally premiums.'
  },
  // RIS-4: Disability
  {
    id: 'CFP-RIS-B5-010',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-4',
    topic: 'Disability Insurance',
    subtopic: 'Cost of Living',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A Cost of Living Adjustment (COLA) rider on disability insurance:',
    options: [
      'A) Increases premiums each year',
      'B) Increases benefits during a claim to keep pace with inflation',
      'C) Adjusts benefits for location',
      'D) Only applies the first year'
    ],
    correctAnswer: 1,
    explanation: 'COLA riders increase disability benefits annually (typically tied to CPI or a fixed percentage) during a continuing claim. For long-term disabilities, this is crucial—a 20-year claim without COLA would see purchasing power erode significantly. The rider adds cost but provides inflation protection.'
  },
  {
    id: 'CFP-RIS-B5-011',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-4',
    topic: 'Disability Insurance',
    subtopic: 'Integration',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Disability policy integration means:',
    options: [
      'A) Multiple policies pay full benefits simultaneously',
      'B) Benefits may be reduced by amounts received from other sources like Social Security or workers\' compensation',
      'C) Only one policy can be owned',
      'D) Benefits are paid before other sources'
    ],
    correctAnswer: 1,
    explanation: 'Integration provisions reduce policy benefits by amounts from other disability sources to prevent "profiting" from disability. Group LTD policies often integrate with Social Security. "Non-integrated" or "pure" policies pay regardless of other benefits—they cost more but provide predictable coverage.'
  },
  {
    id: 'CFP-RIS-B5-012',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-4',
    topic: 'Disability Insurance',
    subtopic: 'Business Overhead',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Business overhead expense (BOE) insurance:',
    options: [
      'A) Replaces the owner\'s income',
      'B) Pays for business operating expenses if the owner becomes disabled, helping keep the business running',
      'C) Is the same as business interruption insurance',
      'D) Only covers employee salaries'
    ],
    correctAnswer: 1,
    explanation: 'BOE covers fixed business expenses (rent, utilities, employee salaries, equipment leases) when the owner is disabled. It\'s separate from personal disability insurance. Benefits are typically tax-deductible as business expenses but the premiums are not. Usually has shorter benefit periods (1-2 years).'
  },
  // RIS-5: Long-Term Care
  {
    id: 'CFP-RIS-B5-013',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-5',
    topic: 'Long-Term Care',
    subtopic: 'ADLs and Cognitive Impairment',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Most LTC policies require the insured to need help with a certain number of Activities of Daily Living (ADLs) or have cognitive impairment. ADLs include:',
    options: [
      'A) Walking, running, and swimming',
      'B) Bathing, dressing, eating, toileting, transferring, and continence',
      'C) Shopping, cooking, and driving',
      'D) Working and exercising'
    ],
    correctAnswer: 1,
    explanation: 'The standard 6 ADLs are bathing, dressing, eating, toileting, transferring (moving between bed/chair), and continence. Most policies require inability to perform 2+ ADLs or cognitive impairment (like Alzheimer\'s) to trigger benefits. Tax-qualified plans must meet these criteria.'
  },
  {
    id: 'CFP-RIS-B5-014',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-5',
    topic: 'Long-Term Care',
    subtopic: 'Shared Care',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A shared care rider on LTC insurance allows:',
    options: [
      'A) Multiple insureds to share one policy',
      'B) Spouses to access each other\'s benefits if one exhausts their own, extending potential coverage',
      'C) Sharing costs with Medicaid',
      'D) Benefits to be paid to family members'
    ],
    correctAnswer: 1,
    explanation: 'Shared care lets couples pool benefits—if one spouse exhausts their benefit pool, they can draw from the other\'s. This provides flexibility for couples where one may need more care. Some versions add a shared pool beyond individual benefits. It costs more but provides valuable protection.'
  },
  {
    id: 'CFP-RIS-B5-015',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-5',
    topic: 'Long-Term Care',
    subtopic: 'Rate Increases',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Traditional LTC insurance premiums:',
    options: [
      'A) Are guaranteed never to increase',
      'B) Can increase for entire rate classes if approved by regulators, though individual experience doesn\'t trigger increases',
      'C) Decrease as the insured ages',
      'D) Are always higher than hybrid products'
    ],
    correctAnswer: 1,
    explanation: 'Traditional LTC is not "guaranteed level"—premiums can increase for entire rate classes (though not based on individual claims). Many legacy policies had significant increases due to underpricing. Hybrid products often have guaranteed premiums but less LTC leverage. Rate stability is a major LTC planning concern.'
  },
  // Additional Topics
  {
    id: 'CFP-RIS-B5-016',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-1',
    topic: 'Risk Concepts',
    subtopic: 'Moral Hazard',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Moral hazard in insurance refers to:',
    options: [
      'A) Insurance fraud',
      'B) The tendency to take more risks or be less careful when protected by insurance',
      'C) Lying on applications',
      'D) Discrimination in underwriting'
    ],
    correctAnswer: 1,
    explanation: 'Moral hazard is increased risk-taking because someone else bears the cost. With auto insurance, people may drive less carefully; with health insurance, they may overuse services. Insurers counter with deductibles, copays, and coinsurance to maintain "skin in the game."'
  },
  {
    id: 'CFP-RIS-B5-017',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-2',
    topic: 'Life Insurance',
    subtopic: 'Key Person Insurance',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Key person life insurance is:',
    options: [
      'A) Personal life insurance for executives',
      'B) Insurance owned by a business on a key employee or owner to protect against financial loss from their death',
      'C) Required by law for all businesses',
      'D) Only for publicly traded companies'
    ],
    correctAnswer: 1,
    explanation: 'Key person insurance compensates businesses for economic loss when essential employees die. The business owns the policy, pays premiums (non-deductible), and receives tax-free proceeds. It helps cover replacement costs, lost revenue, and business stabilization. Common for founders, sales leads, and specialized talent.'
  },
  {
    id: 'CFP-RIS-B5-018',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-3',
    topic: 'Health Insurance',
    subtopic: 'Medicare Advantage',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Medicare Advantage (Part C) plans:',
    options: [
      'A) Only cover hospital stays',
      'B) Are private plans that provide Part A and B benefits, often including additional coverage like dental and vision',
      'C) Are supplemental to Original Medicare',
      'D) Are available only to low-income beneficiaries'
    ],
    correctAnswer: 1,
    explanation: 'Medicare Advantage replaces Original Medicare with private plans that must cover Part A and B benefits. Many include Part D, plus extras like dental, vision, hearing, and fitness. Trade-offs include network restrictions and prior authorization requirements. They can\'t be combined with Medigap.'
  },
  {
    id: 'CFP-RIS-B5-019',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-4',
    topic: 'Disability Insurance',
    subtopic: 'Presumptive Disability',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A presumptive disability provision:',
    options: [
      'A) Requires proof of occupational disability',
      'B) Automatically considers certain losses (sight, hearing, limbs) as total disability regardless of ability to work',
      'C) Applies only to occupational injuries',
      'D) Extends the elimination period'
    ],
    correctAnswer: 1,
    explanation: 'Presumptive disability automatically qualifies claims for total disability upon specific losses (e.g., loss of sight in both eyes, use of both hands/feet, speech, hearing) without requiring proof of occupational disability. Benefits may begin immediately, waiving the elimination period.'
  },
  {
    id: 'CFP-RIS-B5-020',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-5',
    topic: 'Long-Term Care',
    subtopic: 'Tax-Qualified Plans',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Tax-qualified LTC insurance policies:',
    options: [
      'A) Have looser benefit triggers than non-qualified policies',
      'B) Allow premium deductions (subject to AGI threshold) and tax-free benefits when claims meet ADL or cognitive impairment requirements',
      'C) Are only available through employers',
      'D) Have lower benefits than non-qualified'
    ],
    correctAnswer: 1,
    explanation: 'Tax-qualified LTC policies meet HIPAA standards. Premiums are deductible as medical expenses (with age-based limits, subject to 7.5% AGI floor). Benefits are tax-free when triggered by ADL/cognitive criteria. Non-TQ policies may have easier triggers but uncertain tax treatment.'
  },
  {
    id: 'CFP-RIS-B5-021',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-1',
    topic: 'Risk Concepts',
    subtopic: 'Coinsurance',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'In health insurance, coinsurance of 80/20 means:',
    options: [
      'A) The insured pays 80% of costs',
      'B) After the deductible, the insurer pays 80% and the insured pays 20% until the out-of-pocket maximum',
      'C) 80% of claims are covered',
      'D) The premium is split 80/20'
    ],
    correctAnswer: 1,
    explanation: '80/20 coinsurance means the insurer pays 80% of covered costs and the insured pays 20%, applied after the deductible. Cost-sharing continues until the annual out-of-pocket maximum is reached, after which the insurer pays 100%. It creates incentives to be cost-conscious about care.'
  },
  {
    id: 'CFP-RIS-B5-022',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-2',
    topic: 'Life Insurance',
    subtopic: 'Charitable Life Insurance',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Using life insurance for charitable giving can include:',
    options: [
      'A) Only naming charities as beneficiaries',
      'B) Naming charity as beneficiary, transferring policy ownership to charity, or funding a charitable trust with proceeds',
      'C) Only new policies',
      'D) Deducting all premiums'
    ],
    correctAnswer: 1,
    explanation: 'Charitable life insurance strategies include: (1) naming charity as beneficiary (no current deduction, but estate deduction), (2) gifting existing policy to charity (deduct interpolated terminal reserve), (3) charity owns and is beneficiary (deduct premiums as gifts). Charity gets larger gift than direct cash donation of same amount.'
  },
  {
    id: 'CFP-RIS-B5-023',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-3',
    topic: 'Health Insurance',
    subtopic: 'FSA vs HSA',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Compared to Flexible Spending Accounts (FSAs), Health Savings Accounts (HSAs):',
    options: [
      'A) Have use-it-or-lose-it rules',
      'B) Are owned by the employee, have higher contribution limits, and balances roll over and accumulate indefinitely',
      'C) Are available with any health plan',
      'D) Cannot pay for vision or dental'
    ],
    correctAnswer: 1,
    explanation: 'HSAs are owned by individuals, roll over indefinitely (no use-it-or-lose-it), have higher limits ($4,150/$8,300 in 2024), and offer triple tax benefits (deductible, grow tax-free, tax-free withdrawals for medical). They require HDHP enrollment. FSAs are employer accounts with limited rollover.'
  },
  {
    id: 'CFP-RIS-B5-024',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-4',
    topic: 'Disability Insurance',
    subtopic: 'Future Increase Option',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A future increase option (guaranteed insurability rider) on disability insurance:',
    options: [
      'A) Automatically increases coverage',
      'B) Allows purchasing additional coverage at specified intervals without new medical underwriting',
      'C) Increases the elimination period',
      'D) Only applies if income doubles'
    ],
    correctAnswer: 1,
    explanation: 'This rider allows increasing coverage as income grows without new medical exams (proof of income required). Usually exercise at policy anniversaries or life events. It protects insurability if health declines. Premiums for increases reflect age at time of exercise.'
  },
  {
    id: 'CFP-RIS-B5-025',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-5',
    topic: 'Long-Term Care',
    subtopic: 'Care Coordination',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Many LTC policies include care coordination services that:',
    options: [
      'A) Only help find nursing homes',
      'B) Help assess needs, develop care plans, locate providers, and coordinate ongoing care',
      'C) Replace the need for benefits',
      'D) Are only available to wealthy policyholders'
    ],
    correctAnswer: 1,
    explanation: 'Care coordinators (typically nurses or social workers) assess needs, develop care plans, identify local resources, and help navigate the LTC system. This adds value beyond just payment—families often need guidance on care options. Some policies include it; others charge separately.'
  }
];

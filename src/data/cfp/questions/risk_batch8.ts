/**
 * CFP Risk Management Questions - Batch 8
 * Domain 3: Risk Management and Insurance Planning (12% of exam)
 * 25 additional questions covering risk management and insurance topics
 */

import { Question } from '../../../types';

export const CFP_RISK_BATCH8_QUESTIONS: Question[] = [
  // RIS-1: Risk Assessment
  {
    id: 'CFP-RIS-B8-001',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-1',
    topic: 'Risk Assessment',
    subtopic: 'Risk Retention',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Risk retention (self-insurance) is most appropriate when:',
    options: [
      'A) The loss would be catastrophic',
      'B) The potential loss is small relative to financial resources, the risk occurs frequently, or insurance costs exceed expected losses',
      'C) There is no other option',
      'D) Insurance is always unavailable'
    ],
    correctAnswer: 1,
    explanation: 'Risk retention suitable when: loss small and affordable (high deductibles), frequent losses make insurance expensive (claims experience), premium exceeds expected loss value, or loss is uninsurable. Requires adequate reserves. Not appropriate for catastrophic risks. Conscious decision, not just lack of coverage. Many businesses retain smaller risks strategically.'
  },
  {
    id: 'CFP-RIS-B8-002',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-1',
    topic: 'Risk Assessment',
    subtopic: 'Risk Control',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Risk control methods include:',
    options: [
      'A) Only buying insurance',
      'B) Avoidance, loss prevention, and loss reduction—actions to eliminate or minimize the probability or severity of losses',
      'C) Only accepting losses',
      'D) Transferring to family'
    ],
    correctAnswer: 1,
    explanation: 'Risk control: actions affecting the risk itself (vs. financial consequences). Avoidance: don\'t engage in risky activity. Loss prevention: reduce probability (smoke detectors, security systems). Loss reduction: minimize severity after event (fire extinguishers, sprinklers, seat belts). Often combined with risk transfer (insurance) for comprehensive protection.'
  },
  {
    id: 'CFP-RIS-B8-003',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-1',
    topic: 'Risk Assessment',
    subtopic: 'Exposures Analysis',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A comprehensive exposure analysis for a client should identify:',
    options: [
      'A) Only current insurance policies',
      'B) All sources of potential loss including property, liability, disability, death, and health exposures',
      'C) Only property risks',
      'D) Only investment risks'
    ],
    correctAnswer: 1,
    explanation: 'Exposure analysis: identify all potential loss sources before evaluating protection needs. Categories: property (dwelling, vehicles, valuables), liability (auto, premises, professional), personal (death, disability, health, long-term care), economic (unemployment, inflation). Consider client\'s specific situation—occupation, assets, lifestyle, family. Foundation for insurance recommendations.'
  },
  // RIS-2: Life Insurance
  {
    id: 'CFP-RIS-B8-004',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-2',
    topic: 'Life Insurance',
    subtopic: 'Return of Premium',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Return of premium (ROP) term life insurance:',
    options: [
      'A) Is always the best value',
      'B) Refunds premiums if the insured survives the term, but has significantly higher premiums than regular term',
      'C) Pays dividends annually',
      'D) Provides permanent coverage'
    ],
    correctAnswer: 1,
    explanation: 'ROP term: get premiums back if you outlive the term. Sounds attractive but: premiums much higher (50-200%+), opportunity cost of extra premium, may not be refunded if lapsed early or die. Alternative: buy regular term, invest the difference. May work for those who won\'t invest otherwise. Analyze: would investing the difference produce better results?'
  },
  {
    id: 'CFP-RIS-B8-005',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-2',
    topic: 'Life Insurance',
    subtopic: 'Survivorship Life Insurance',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Survivorship (second-to-die) life insurance is commonly used for:',
    options: [
      'A) Young single individuals',
      'B) Estate planning where estate tax is due after both spouses die, as the policy pays at the second death',
      'C) Disability coverage',
      'D) Short-term needs'
    ],
    correctAnswer: 1,
    explanation: 'Survivorship life: pays at second death of two insureds (usually spouses). Uses: estate tax liquidity (tax typically deferred until second death via marital deduction), equalizing inheritances, charitable giving. Advantages: lower premium than separate policies (insures two lives), one unhealthy spouse may qualify. Typically placed in ILIT to exclude from estate.'
  },
  {
    id: 'CFP-RIS-B8-006',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-2',
    topic: 'Life Insurance',
    subtopic: 'Policy Review',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'An in-force illustration for life insurance shows:',
    options: [
      'A) Guaranteed future returns',
      'B) How the policy is projected to perform based on current assumptions including values, premiums, and potential lapse date',
      'C) Past performance only',
      'D) Competitor products'
    ],
    correctAnswer: 1,
    explanation: 'In-force illustration: projects policy performance from current state. Shows: cash value, death benefit, premium payments at current assumptions vs. guaranteed. Critical for: universal life policies needing monitoring, policies at risk of lapse, planning future premiums. Request regularly (annually for UL). Different from original illustration—based on current reality.'
  },
  // RIS-3: Health Insurance
  {
    id: 'CFP-RIS-B8-007',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-3',
    topic: 'Health Insurance',
    subtopic: 'TRICARE',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'TRICARE provides health coverage to:',
    options: [
      'A) All U.S. citizens',
      'B) Military service members, retirees, and their dependents through various plan options',
      'C) Only active duty personnel',
      'D) Veterans only through VA'
    ],
    correctAnswer: 1,
    explanation: 'TRICARE: military health program. Active duty get TRICARE Prime (no cost). Retirees and dependents have options: Prime, Select, For Life (Medicare supplement). Different rules for active duty, guard/reserve, retired. Low cost compared to civilian plans. Covers medical, prescription, dental (separate program). Understand when advising military families.'
  },
  {
    id: 'CFP-RIS-B8-008',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-3',
    topic: 'Health Insurance',
    subtopic: 'Health Reimbursement Arrangement',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A Health Reimbursement Arrangement (HRA) is:',
    options: [
      'A) Employee-funded',
      'B) An employer-funded account reimbursing employees for qualified medical expenses, with tax-free benefits',
      'C) A type of health insurance policy',
      'D) Available to self-employed only'
    ],
    correctAnswer: 1,
    explanation: 'HRA: employer-funded account for employee medical expenses. Employer contributes (tax-deductible), employee receives reimbursements tax-free. Employer sets eligible expenses, maximum reimbursement, carryover rules. Different from HSA (employee owns) and FSA (employee contributes). Various types: integrated with group plan, QSEHRA for small employers, ICHRA for individual coverage.'
  },
  {
    id: 'CFP-RIS-B8-009',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-3',
    topic: 'Health Insurance',
    subtopic: 'Medicare Open Enrollment',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The Medicare Annual Election Period (October 15 - December 7) allows:',
    options: [
      'A) Initial Medicare enrollment',
      'B) Changing Medicare Advantage plans, adding/dropping Part D, or switching between Original Medicare and Medicare Advantage',
      'C) Enrolling in Medigap only',
      'D) Canceling Medicare entirely'
    ],
    correctAnswer: 1,
    explanation: 'Annual Election Period (AEP): Oct 15 - Dec 7. Changes effective January 1. Can: switch between Original Medicare and MA, change MA plans, add/drop Part D, change Part D plans. Cannot: enroll in Medigap (separate rules). Also Open Enrollment Period (Jan 1-Mar 31) allows switching MA plans. Initial enrollment different timing.'
  },
  // RIS-4: Disability Insurance
  {
    id: 'CFP-RIS-B8-010',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-4',
    topic: 'Disability Insurance',
    subtopic: 'Key Person Disability',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Key person disability insurance for a business:',
    options: [
      'A) Covers employee salaries',
      'B) Provides benefits to the business when a key employee becomes disabled, helping cover financial losses and replacement costs',
      'C) Is the same as workers\' comp',
      'D) Replaces group disability'
    ],
    correctAnswer: 1,
    explanation: 'Key person disability: protects business from financial impact of key employee\'s disability. Covers: lost revenue, replacement search/training, recovery of business. Business owns policy, pays premiums (not deductible), receives benefits (not taxable). Different from personal DI—protects business, not employee\'s income. Often overlooked protection for small businesses.'
  },
  {
    id: 'CFP-RIS-B8-011',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-4',
    topic: 'Disability Insurance',
    subtopic: 'Social Security Disability',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Social Security Disability Insurance (SSDI) benefits:',
    options: [
      'A) Begin immediately upon disability',
      'B) Have a five-month waiting period and require inability to perform substantial gainful activity for at least 12 months',
      'C) Are easy to qualify for',
      'D) Replace 100% of income'
    ],
    correctAnswer: 1,
    explanation: 'SSDI: 5-month waiting period (6th month first payment). Definition: unable to perform substantial gainful activity due to medical condition expected to last 12+ months or result in death. Strict—own-occupation definitions not used. Many claims denied initially. Benefits based on earnings history. Medicare starts 24 months after SSDI. Supplements, doesn\'t replace, private DI.'
  },
  {
    id: 'CFP-RIS-B8-012',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-4',
    topic: 'Disability Insurance',
    subtopic: 'Premium Structure',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Non-cancelable disability insurance means:',
    options: [
      'A) Premiums can increase annually',
      'B) The insurance company cannot cancel or raise premiums as long as premiums are paid on time',
      'C) Coverage is always for life',
      'D) No medical exam required'
    ],
    correctAnswer: 1,
    explanation: 'Non-cancelable (noncancellable): insurer can\'t cancel and premiums are guaranteed level as long as you pay. Most protective for insured, most expensive. Alternative: guaranteed renewable—can\'t cancel but premiums can increase by class. Conditionally renewable: can be canceled under certain conditions. Know policy type when evaluating disability coverage.'
  },
  // RIS-5: Property and Casualty
  {
    id: 'CFP-RIS-B8-013',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-5',
    topic: 'Property Insurance',
    subtopic: 'Flood Insurance',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'National Flood Insurance Program (NFIP) coverage:',
    options: [
      'A) Is included in homeowners policies',
      'B) Must be purchased separately, has maximum coverage limits, and is required for federally-backed mortgages in flood zones',
      'C) Covers all water damage',
      'D) Has no waiting period'
    ],
    correctAnswer: 1,
    explanation: 'NFIP: separate federal program (private options exist too). Maximum coverage: $250K dwelling, $100K contents. Required if federally-backed mortgage in Special Flood Hazard Area. 30-day waiting period typically. Doesn\'t cover: basement contents, living expenses. High-value homes may need excess flood. Rising premiums as Risk Rating 2.0 implemented.'
  },
  {
    id: 'CFP-RIS-B8-014',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-5',
    topic: 'Property Insurance',
    subtopic: 'Business Interruption',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Business interruption insurance covers:',
    options: [
      'A) Only physical damage to property',
      'B) Lost income and continuing expenses when a business must suspend operations due to covered property damage',
      'C) Employee theft losses',
      'D) Contract disputes'
    ],
    correctAnswer: 1,
    explanation: 'Business interruption: replaces lost income and covers continuing expenses when business stops due to covered property loss. Covers: net profit that would have been earned, ongoing expenses (rent, salaries, utilities). Requires physical damage triggering closure. Extra expense coverage for costs to resume faster. Contingent BI covers supplier/customer disruptions. Critical for business owners.'
  },
  {
    id: 'CFP-RIS-B8-015',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-5',
    topic: 'Liability Insurance',
    subtopic: 'Excess Liability',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Excess liability coverage differs from umbrella insurance in that:',
    options: [
      'A) They are identical',
      'B) Excess follows form of underlying policies only, while umbrella may provide broader coverage beyond underlying policies',
      'C) Excess is always cheaper',
      'D) Umbrella never applies'
    ],
    correctAnswer: 1,
    explanation: 'Excess vs. umbrella: Excess liability—follows form exactly, only adds limits on top of underlying. Umbrella—typically broader, may cover claims underlying policies exclude (with retained limit), provides drop-down coverage. Umbrella more comprehensive but slightly more expensive. Both increase liability limits. Understand what you\'re buying—"umbrella" is sometimes used loosely.'
  },
  // Additional Topics
  {
    id: 'CFP-RIS-B8-016',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-1',
    topic: 'Risk Assessment',
    subtopic: 'Insurance Needs Analysis',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An insurance needs analysis should:',
    options: [
      'A) Focus only on life insurance',
      'B) Evaluate all risk exposures holistically, considering gaps, adequacy of current coverage, and cost-benefit trade-offs',
      'C) Only address catastrophic risks',
      'D) Ignore existing coverage'
    ],
    correctAnswer: 1,
    explanation: 'Comprehensive insurance analysis: identify all exposures, review current coverage for each, identify gaps and excess, evaluate limits vs. needs, consider deductibles/premiums trade-offs, prioritize by severity of exposure. Holistic approach—property, liability, life, health, disability, LTC, umbrella. Regular reviews as circumstances change.'
  },
  {
    id: 'CFP-RIS-B8-017',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-2',
    topic: 'Life Insurance',
    subtopic: 'Assignment',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'An absolute assignment of a life insurance policy:',
    options: [
      'A) Is temporary',
      'B) Permanently transfers all ownership rights to another party, often done for estate planning with ILITs',
      'C) Changes only the beneficiary',
      'D) Requires insurer approval'
    ],
    correctAnswer: 1,
    explanation: 'Absolute assignment: full ownership transfer—all rights (change beneficiary, borrow, surrender). Used for: ILIT funding (remove from estate), sale, charitable gift. Irrevocable once completed. Collateral assignment is different—limited, temporary transfer as loan security. Policy owner can assign; insurer notified but doesn\'t need to approve.'
  },
  {
    id: 'CFP-RIS-B8-018',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-3',
    topic: 'Health Insurance',
    subtopic: 'Special Enrollment Period',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A Special Enrollment Period for health insurance is triggered by:',
    options: [
      'A) Wanting to change plans',
      'B) Qualifying life events such as marriage, birth of child, job loss, or moving to new area',
      'C) Dissatisfaction with current plan',
      'D) Annual occurrence'
    ],
    correctAnswer: 1,
    explanation: 'Special Enrollment Period (SEP): window to enroll outside Open Enrollment due to qualifying life events. Events: marriage, divorce, birth/adoption, loss of other coverage, moving, Medicaid/CHIP eligibility changes. Typically 60 days to enroll. Don\'t miss—next opportunity is Open Enrollment. Documentation may be required. ACA marketplace and employer plans both have SEP rules.'
  },
  {
    id: 'CFP-RIS-B8-019',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-4',
    topic: 'Disability Insurance',
    subtopic: 'Benefit Calculation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Disability insurance benefits are typically capped at:',
    options: [
      'A) 100% of income',
      'B) 60-70% of pre-disability income to maintain incentive to return to work',
      'C) 50% maximum',
      'D) Only Social Security levels'
    ],
    correctAnswer: 1,
    explanation: 'DI benefit limits: insurers cap at 60-70% of pre-disability income. Reasons: maintain incentive to return to work, prevent moral hazard. High earners may face lower replacement ratios. Calculate after-tax replacement—if premiums paid with after-tax dollars, benefits are tax-free so 60% may replace more than 60% of take-home pay.'
  },
  {
    id: 'CFP-RIS-B8-020',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-5',
    topic: 'Property Insurance',
    subtopic: 'Insurance Score',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Insurance scores used for auto and home insurance:',
    options: [
      'A) Are identical to credit scores',
      'B) Are based on credit information but weighted differently to predict insurance claim likelihood',
      'C) Are only used for pricing',
      'D) Cannot be improved'
    ],
    correctAnswer: 1,
    explanation: 'Insurance score: credit-based score predicting likelihood of filing claims. Not same as credit score—different weighting. Factors: payment history, outstanding debt, credit history length, new credit, credit mix. Higher score = lower premiums typically. Some states restrict use. Improving credit can reduce insurance costs. Different companies use different scoring models.'
  },
  {
    id: 'CFP-RIS-B8-021',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-1',
    topic: 'Risk Assessment',
    subtopic: 'Captive Insurance',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A captive insurance company is:',
    options: [
      'A) A government insurer',
      'B) An insurance company created by a business to insure its own risks, potentially offering tax and coverage advantages',
      'C) Only for non-profits',
      'D) Illegal in most states'
    ],
    correctAnswer: 1,
    explanation: 'Captive insurance: company-owned insurer covering parent\'s risks. Types: pure captive (one owner), group captive (multiple companies). Potential benefits: control coverage terms, potential tax advantages, access reinsurance markets, reduce costs. Drawbacks: setup costs, regulation, capital requirements, IRS scrutiny of tax motivation. Used by larger corporations; micro-captives under scrutiny.'
  },
  {
    id: 'CFP-RIS-B8-022',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-2',
    topic: 'Life Insurance',
    subtopic: 'Premium Financing',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Life insurance premium financing involves:',
    options: [
      'A) Paying premiums monthly',
      'B) Borrowing to pay premiums on large policies, using policy values as collateral, often for high-net-worth clients',
      'C) Premium discounts',
      'D) Group premium reduction'
    ],
    correctAnswer: 1,
    explanation: 'Premium financing: borrow from third-party lender to pay premiums on large life insurance policy. Policy cash value and death benefit as collateral. Strategy for wealthy clients who prefer not to liquidate investments. Risks: interest rate changes, policy performance, exit strategy. Complex—need proper planning. IRS watches for abusive arrangements.'
  },
  {
    id: 'CFP-RIS-B8-023',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-3',
    topic: 'Health Insurance',
    subtopic: 'Preventive Care',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Under the ACA, preventive care services:',
    options: [
      'A) Always have copays',
      'B) Must be covered with no cost-sharing when provided by in-network providers',
      'C) Are optional benefits',
      'D) Only apply to children'
    ],
    correctAnswer: 1,
    explanation: 'ACA preventive care: must be covered at no cost (no copay, coinsurance, deductible) when in-network. Includes: recommended immunizations, screenings (cancer, diabetes), wellness visits, contraception, counselings. List from USPSTF recommendations. Out-of-network may have cost. Diagnostic follow-up not covered same way. Know what qualifies as preventive.'
  },
  {
    id: 'CFP-RIS-B8-024',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-4',
    topic: 'Disability Insurance',
    subtopic: 'Mental Health Coverage',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Disability insurance coverage for mental health conditions:',
    options: [
      'A) Is always excluded',
      'B) Often has limited benefit periods (2 years) compared to other disabilities',
      'C) Pays the same as physical disabilities',
      'D) Has no restrictions'
    ],
    correctAnswer: 1,
    explanation: 'Mental health DI limitations: many policies limit mental/nervous condition benefits to 2 years (vs. age 65). Self-reported conditions (pain, fatigue) may have similar limits. Read policy carefully—limitations may surprise claimants. Some premium policies offer longer mental health benefits. Important consideration for those in high-stress professions.'
  },
  {
    id: 'CFP-RIS-B8-025',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-5',
    topic: 'Liability Insurance',
    subtopic: 'Contractual Liability',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Liability assumed under a contract (contractual liability):',
    options: [
      'A) Is always covered by general liability',
      'B) May not be covered unless specific coverage is included, as policies typically exclude liability assumed by contract',
      'C) Is never insurable',
      'D) Only applies to written contracts'
    ],
    correctAnswer: 1,
    explanation: 'Contractual liability: liability you agree to assume through a contract (indemnification, hold harmless). Standard liability policies often exclude. May need specific endorsement or contractual liability coverage. Common in: leases, service agreements, construction contracts. Review contracts carefully—may be assuming uninsured liability. Coordinate contracts and insurance.'
  }
];

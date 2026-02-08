/**
 * CFP Risk Management Questions - Batch 9
 * Domain 4: Risk Management and Insurance Planning (12% of exam)
 * 25 additional questions
 */

import { Question } from '../../../types';

export const CFP_RISK_BATCH9_QUESTIONS: Question[] = [
  // RIS-1: Insurance Fundamentals
  {
    id: 'CFP-RIS-B9-001',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-1',
    topic: 'Insurance Fundamentals',
    subtopic: 'Subrogation',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Subrogation in insurance allows the insurer to:',
    options: [
      'A) Deny all claims',
      'B) Step into the insured\'s rights to pursue recovery from a third party responsible for the loss',
      'C) Cancel policies',
      'D) Increase premiums'
    ],
    correctAnswer: 1,
    explanation: 'Subrogation: after paying claim, insurer assumes insured\'s right to sue responsible party. Purpose: prevents double recovery by insured, recovers costs for insurer. Example: insurer pays auto damage, then pursues at-fault driver. Insured must cooperate, not prejudice subrogation rights. Any recovery beyond claim may go to insured.'
  },
  {
    id: 'CFP-RIS-B9-002',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-1',
    topic: 'Insurance Fundamentals',
    subtopic: 'Valued vs Indemnity Policies',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A valued policy differs from an indemnity policy in that:',
    options: [
      'A) It covers less risk',
      'B) The amount payable is agreed upon at policy inception rather than determined by actual loss at time of claim',
      'C) It\'s only for life insurance',
      'D) It\'s uninsurable'
    ],
    correctAnswer: 1,
    explanation: 'Valued policy: pre-agreed amount payable regardless of actual loss (common: life insurance, some property). Indemnity: pays actual loss up to limit (most property/casualty). Valued advantage: no dispute at claim time. Challenge: potential moral hazard if value exceeds actual. Used where value hard to determine at loss (art, life).'
  },
  {
    id: 'CFP-RIS-B9-003',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-1',
    topic: 'Insurance Fundamentals',
    subtopic: 'Assignment',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Assignment of a life insurance policy:',
    options: [
      'A) Is never permitted',
      'B) Transfers ownership rights to another party, which may be collateral (loan) or absolute',
      'C) Increases premiums',
      'D) Voids beneficiary designations permanently'
    ],
    correctAnswer: 1,
    explanation: 'Assignment: transfer of policy rights. Collateral assignment: temporary for loan security, reverts when repaid. Absolute assignment: permanent ownership transfer. Notice to insurer required. Assignment of death benefit different from ownership. Policy terms may restrict. Uses: estate planning, business arrangements, charitable giving.'
  },
  // RIS-2: Life Insurance
  {
    id: 'CFP-RIS-B9-004',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-2',
    topic: 'Life Insurance',
    subtopic: 'Joint and Survivor Policies',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Second-to-die (survivorship) life insurance is commonly used for:',
    options: [
      'A) Income replacement',
      'B) Estate liquidity at second death when estate taxes become due, often for married couples',
      'C) Business buy-sell only',
      'D) Short-term coverage'
    ],
    correctAnswer: 1,
    explanation: 'Second-to-die: pays at second death of two insureds (typically spouses). Uses: estate tax liquidity (marital deduction delays tax), wealth transfer, charitable giving. Lower premiums than two individual policies. One unhealthy spouse may still get coverage. Considerations: divorce complications, portability limited.'
  },
  {
    id: 'CFP-RIS-B9-005',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-2',
    topic: 'Life Insurance',
    subtopic: 'Premium Financing',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Life insurance premium financing involves:',
    options: [
      'A) Free insurance',
      'B) Borrowing funds to pay premiums, typically for large policies where expected cash value growth exceeds borrowing costs',
      'C) Government subsidies',
      'D) Only term insurance'
    ],
    correctAnswer: 1,
    explanation: 'Premium financing: sophisticated strategy—borrow to pay premiums, policy cash value as collateral. Bet: cash value growth > borrowing cost. Risks: interest rate changes, policy underperformance, lender calls loan, exit strategy complexity. Not appropriate for all—high net worth, complex situation, understand risks. Requires careful analysis of assumptions.'
  },
  {
    id: 'CFP-RIS-B9-006',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-2',
    topic: 'Life Insurance',
    subtopic: '1035 Exchange',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A 1035 exchange allows:',
    options: [
      'A) Only term to term exchanges',
      'B) Tax-free exchange of one life insurance policy for another, or life to annuity (but not annuity to life)',
      'C) Any insurance product swap',
      'D) Taxable exchanges only'
    ],
    correctAnswer: 1,
    explanation: 'Section 1035: tax-free exchanges. Allowed: life to life, life to annuity, annuity to annuity (same annuitant). NOT: annuity to life. Must be direct transfer (not cash then buy). Basis carries over. Use: better product, lower costs, different features. Consider: surrender charges, new contestability, commission to agent.'
  },
  // RIS-3: Health Insurance
  {
    id: 'CFP-RIS-B9-007',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-3',
    topic: 'Health Insurance',
    subtopic: 'ACA Subsidies',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Premium tax credits under the Affordable Care Act are available to:',
    options: [
      'A) All taxpayers',
      'B) Those with household income 100-400% of federal poverty level purchasing through marketplace, not eligible for other coverage',
      'C) Only employers',
      'D) Medicare recipients'
    ],
    correctAnswer: 1,
    explanation: 'ACA premium subsidies: income 100-400% FPL (temporarily expanded). Must buy through marketplace, not eligible for employer coverage or government programs. Based on second-lowest cost silver plan. Can take in advance or at tax time. Over 400%: enhanced credits through 2025 (American Rescue Plan extension). Income changes may require repayment or additional credit.'
  },
  {
    id: 'CFP-RIS-B9-008',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-3',
    topic: 'Health Insurance',
    subtopic: 'COBRA Alternatives',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Alternatives to COBRA coverage after leaving employment may include:',
    options: [
      'A) No options exist',
      'B) ACA marketplace plans, spouse\'s employer plan, or short-term health insurance, each with trade-offs',
      'C) COBRA is always best',
      'D) Medicare for all ages'
    ],
    correctAnswer: 1,
    explanation: 'COBRA alternatives: ACA marketplace (possible subsidies, comprehensive), spouse\'s plan (job loss is qualifying event), short-term (cheaper but limited coverage, pre-existing exclusions). Compare: premiums (COBRA often expensive—full premium + admin), coverage scope, subsidy eligibility. Job loss triggers ACA special enrollment. Don\'t assume COBRA is best—evaluate options.'
  },
  {
    id: 'CFP-RIS-B9-009',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-3',
    topic: 'Health Insurance',
    subtopic: 'FSA Rules',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Flexible Spending Account (FSA) funds are generally:',
    options: [
      'A) Always fully portable',
      'B) Use-it-or-lose-it with limited carryover or grace period options, and employer plan-specific',
      'C) Subject to withdrawal penalties',
      'D) Taxable when used'
    ],
    correctAnswer: 1,
    explanation: 'FSA rules: employee contributions pre-tax (FICA and income tax savings). Use-it-or-lose-it generally applies. Plan may offer: $640 carryover (indexed) OR 2.5-month grace period (not both). Healthcare and dependent care FSAs separate. Forfeitures revert to employer. Election made annually—can\'t change without qualifying event. Plan carefully—conservative estimates.'
  },
  // RIS-4: Disability Insurance
  {
    id: 'CFP-RIS-B9-010',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-4',
    topic: 'Disability Insurance',
    subtopic: 'Cost of Living Adjustments',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A COLA rider on disability insurance:',
    options: [
      'A) Reduces premiums annually',
      'B) Increases benefits during disability, typically linked to inflation, protecting purchasing power',
      'C) Only applies at policy inception',
      'D) Is free on all policies'
    ],
    correctAnswer: 1,
    explanation: 'COLA rider: after claim, benefits increase annually (often 3-6% simple or compound, or CPI-linked). Protects against inflation during long disability. Cost: higher premiums. Value: significant for younger workers with long potential claim duration. Compound vs simple: compound better for long claims. Worthwhile for comprehensive coverage.'
  },
  {
    id: 'CFP-RIS-B9-011',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-4',
    topic: 'Disability Insurance',
    subtopic: 'Elimination Period',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Choosing a longer elimination period (waiting period) on disability insurance:',
    options: [
      'A) Increases premiums',
      'B) Lowers premiums but requires more self-funding during initial disability period',
      'C) Is never advisable',
      'D) Eliminates all coverage'
    ],
    correctAnswer: 1,
    explanation: 'Elimination period: days before benefits start (30, 60, 90, 180, 365 common). Longer = lower premiums (significant savings). Trade-off: must self-fund that period. Strategy: match to sick leave, savings, emergency fund. 90 days common balance. Ensure emergency reserves cover elimination period. Premium savings may be substantial—compare quotes.'
  },
  {
    id: 'CFP-RIS-B9-012',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-4',
    topic: 'Disability Insurance',
    subtopic: 'Business Overhead Expense',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Business Overhead Expense (BOE) disability insurance covers:',
    options: [
      'A) Personal living expenses',
      'B) Business operating expenses like rent, utilities, and employee salaries during the owner\'s disability',
      'C) Lost profits only',
      'D) Equipment purchases'
    ],
    correctAnswer: 1,
    explanation: 'BOE coverage: pays business fixed expenses during owner\'s disability. Covers: rent, utilities, employee salaries, loan payments, insurance premiums. NOT: owner\'s salary, profits, capital expenditures. Tax treatment: premiums deductible, benefits taxable. Shorter benefit period (1-2 years typically). Essential for small business owners—lets business survive during recovery.'
  },
  // RIS-5: Property and Casualty
  {
    id: 'CFP-RIS-B9-013',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-5',
    topic: 'Property Insurance',
    subtopic: 'Ordinance or Law Coverage',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Ordinance or law coverage protects against:',
    options: [
      'A) Legal fees only',
      'B) Increased costs to rebuild due to current building code requirements that didn\'t exist when home was built',
      'C) Personal liability',
      'D) Flood damage'
    ],
    correctAnswer: 1,
    explanation: 'Ordinance/law coverage: older homes may not meet current codes. After loss, rebuilding requires code compliance—can add substantial cost. Standard policies may limit or exclude. Important for: older homes, designated historic properties, areas with stricter modern codes. Coverage typically percentage of dwelling limit. Essential endorsement for older properties.'
  },
  {
    id: 'CFP-RIS-B9-014',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-5',
    topic: 'Property Insurance',
    subtopic: 'Loss of Use',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Loss of use coverage in homeowners insurance provides:',
    options: [
      'A) Property repair costs',
      'B) Additional living expenses if home is uninhabitable due to a covered loss, providing temporary housing assistance',
      'C) Liability protection',
      'D) Only hotel costs'
    ],
    correctAnswer: 1,
    explanation: 'Loss of use (Coverage D): pays additional living expenses when home uninhabitable from covered loss. Covers: temporary housing, restaurant meals (above normal food cost), storage, other reasonable expenses. Limit typically 20-30% of dwelling coverage. "Additional" = above normal—subtract regular expenses. Continues until habitable or limit exhausted.'
  },
  {
    id: 'CFP-RIS-B9-015',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-5',
    topic: 'Liability Insurance',
    subtopic: 'Umbrella Deductibles',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An umbrella policy\'s retained limit (self-insured retention) applies when:',
    options: [
      'A) All claims',
      'B) Claims are covered by umbrella but not by underlying policies, requiring out-of-pocket payment before umbrella pays',
      'C) Claims under underlying limits',
      'D) Premium payments'
    ],
    correctAnswer: 1,
    explanation: 'Self-insured retention (SIR): umbrella covers some claims not covered by underlying. For those: must pay SIR (often $10K) before umbrella. Example: umbrella covers personal injury (libel/slander) not in auto policy. If sued, pay SIR, then umbrella. Not same as deductible—only applies to claims outside underlying coverage. Good umbrella feature: broader than underlying.'
  },
  // Additional Topics
  {
    id: 'CFP-RIS-B9-016',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-1',
    topic: 'Insurance Fundamentals',
    subtopic: 'Policy Period',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Claims-made versus occurrence policies differ in:',
    options: [
      'A) Premium amounts only',
      'B) When coverage applies—claims-made requires claim during policy period, occurrence covers events during policy regardless of when claim filed',
      'C) Types of losses covered',
      'D) Deductible amounts'
    ],
    correctAnswer: 1,
    explanation: 'Occurrence: coverage if event occurred during policy period—even if claim years later. Claims-made: coverage only if claim made during policy period. Occurrence: simpler, no tail coverage needed. Claims-made: cheaper initially, but need tail coverage when policy ends to cover past events. Professional liability often claims-made. Understand which applies to coverage.'
  },
  {
    id: 'CFP-RIS-B9-017',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-2',
    topic: 'Life Insurance',
    subtopic: 'Policy Loans',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Life insurance policy loans:',
    options: [
      'A) Must be repaid before death',
      'B) Reduce death benefit if unpaid, but don\'t require repayment; interest compounds if not paid',
      'C) Are taxable when borrowed',
      'D) Cancel the policy immediately'
    ],
    correctAnswer: 1,
    explanation: 'Policy loans: borrow against cash value, not required to repay. If unpaid at death: outstanding balance + interest deducted from death benefit. Interest compounds—can grow significantly. If loan exceeds cash value: policy lapses (potential tax if gain). No credit check—guaranteed access. Tax-free if policy stays in force. Manage carefully—monitor loan balance.'
  },
  {
    id: 'CFP-RIS-B9-018',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-3',
    topic: 'Health Insurance',
    subtopic: 'Medicare Advantage',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Medicare Advantage (Part C) plans:',
    options: [
      'A) Are always more expensive than Original Medicare',
      'B) Are private plans that include Part A and B, often with extra benefits, but typically have networks',
      'C) Don\'t cover hospital stays',
      'D) Are available before age 65'
    ],
    correctAnswer: 1,
    explanation: 'Medicare Advantage: private alternative to Original Medicare. Must include Part A and B coverage. Often adds: dental, vision, hearing, fitness. Trade-offs: network restrictions (HMO/PPO), prior authorization, may not need Medigap. Premiums may be lower (some $0). Drug coverage usually included. Different from Medigap. Compare: total costs, provider access, coverage needs.'
  },
  {
    id: 'CFP-RIS-B9-019',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-4',
    topic: 'Disability Insurance',
    subtopic: 'Policy Provisions',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A non-pro rata recurrent disability provision:',
    options: [
      'A) Starts new elimination period for each disability',
      'B) Treats related disabilities within a specified period as one claim, without requiring new elimination period',
      'C) Reduces benefits proportionally',
      'D) Only covers new conditions'
    ],
    correctAnswer: 1,
    explanation: 'Recurrent disability: if recover then same/related disability recurs within specified time (often 6 months), no new elimination period—benefits resume. Non-pro rata: doesn\'t reduce benefit period previously used. Important for conditions with remission/relapse patterns. Pro rata would reduce remaining benefits. Better policies have non-pro rata provision. Review when comparing policies.'
  },
  {
    id: 'CFP-RIS-B9-020',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-5',
    topic: 'Liability Insurance',
    subtopic: 'Auto Liability',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Split limit auto liability coverage of 100/300/100 means:',
    options: [
      'A) $100,000 total coverage',
      'B) $100K per person, $300K per accident for bodily injury, $100K for property damage',
      'C) Only property coverage',
      'D) $300K per person'
    ],
    correctAnswer: 1,
    explanation: 'Split limits format: bodily injury per person / bodily injury per accident / property damage. 100/300/100: up to $100K for any one injured person, $300K maximum for all injured in accident, $100K for others\' property. Alternative: combined single limit (CSL)—one limit for all. Higher limits recommended—assets at stake. Umbrella for additional protection.'
  },
  {
    id: 'CFP-RIS-B9-021',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-1',
    topic: 'Insurance Fundamentals',
    subtopic: 'Moral Hazard',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Moral hazard in insurance refers to:',
    options: [
      'A) Unethical insurance agents',
      'B) Increased risk-taking or carelessness because someone is insured, knowing insurance will pay losses',
      'C) Pre-existing conditions',
      'D) Policy cancellation'
    ],
    correctAnswer: 1,
    explanation: 'Moral hazard: behavior change due to insurance. Knowing covered, people may: take more risks, be less careful, exaggerate claims. Insurers manage through: deductibles (skin in game), copays, coverage limits, investigations. Different from adverse selection (who buys). Both affect insurance pricing and availability.'
  },
  {
    id: 'CFP-RIS-B9-022',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-2',
    topic: 'Life Insurance',
    subtopic: 'Key Person Insurance',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Key person life insurance is designed to:',
    options: [
      'A) Benefit the key person\'s family',
      'B) Compensate the business for financial loss when an essential employee dies, covering replacement and transition costs',
      'C) Fund retirement',
      'D) Provide disability benefits'
    ],
    correctAnswer: 1,
    explanation: 'Key person coverage: business owns policy on essential person (owner, executive, salesperson). Death benefit to business covers: lost revenue, finding/training replacement, debt payment, business continuation. Insurable interest: business has stake in person\'s life. Premiums not deductible, death benefit tax-free. Valuation: often multiple of salary or contribution. Essential for small businesses.'
  },
  {
    id: 'CFP-RIS-B9-023',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-3',
    topic: 'Health Insurance',
    subtopic: 'Healthcare Sharing Ministries',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Healthcare sharing ministries differ from traditional health insurance in that they:',
    options: [
      'A) Are regulated by state insurance departments',
      'B) Are not insurance—members voluntarily share costs, without guarantee of payment, and may have religious requirements',
      'C) Cover all pre-existing conditions',
      'D) Accept all applicants'
    ],
    correctAnswer: 1,
    explanation: 'Healthcare sharing: NOT insurance—voluntary cost-sharing among members with shared beliefs. No guarantee of payment, not regulated as insurance. May exclude: pre-existing conditions, certain lifestyle choices, specific procedures. Lower cost than insurance. Risks: no coverage guarantee, limited appeals. Know difference—may be appropriate for some, but understand limitations.'
  },
  {
    id: 'CFP-RIS-B9-024',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-4',
    topic: 'Disability Insurance',
    subtopic: 'Mental Health Limitations',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Many disability policies limit mental health disability benefits to:',
    options: [
      'A) Same as physical conditions',
      'B) 24 months, compared to longer benefit periods for physical conditions',
      'C) 6 months only',
      'D) No coverage'
    ],
    correctAnswer: 1,
    explanation: 'Mental/nervous limitations: common in disability policies—24 months typical (some less). Physical conditions may have to-65 or longer benefit period. Impact: depression, anxiety, stress-related claims limited. Some exclude entirely. Growing issue—many claims have mental health component. Better policies: longer or no limitation. Review carefully, especially for high-stress professions.'
  },
  {
    id: 'CFP-RIS-B9-025',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-5',
    topic: 'Property Insurance',
    subtopic: 'Vacant Property',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Homeowners insurance coverage when a property becomes vacant:',
    options: [
      'A) Automatically increases',
      'B) May be void or restricted after 30-60 days, requiring special vacant home coverage',
      'C) Never changes',
      'D) Covers all additional risks'
    ],
    correctAnswer: 1,
    explanation: 'Vacancy provisions: most policies restrict/void coverage after 30-60 days vacant. Reasons: higher risk (vandalism, undetected damage, fire). Unoccupied (furnished, returning) different from vacant (empty). Solutions: vacant home endorsement or policy, regular visits, maintain utilities. Moving, renovation, estate property—all may trigger vacancy. Notify insurer, get proper coverage.'
  }
];

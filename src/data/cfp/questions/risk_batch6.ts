/**
 * CFP Risk Management Questions - Batch 6
 * Domain 5: Risk Management and Insurance Planning (12% of exam)
 * 25 additional questions covering insurance and risk topics
 */

import { Question } from '../../../types';

export const CFP_RISK_BATCH6_QUESTIONS: Question[] = [
  // RIS-1: Risk Analysis
  {
    id: 'CFP-RIS-B6-001',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-1',
    topic: 'Risk Analysis',
    subtopic: 'Risk Mapping',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Risk mapping in personal financial planning involves:',
    options: [
      'A) Only looking at insurance policies',
      'B) Identifying and assessing all significant risks by probability and potential impact, then determining appropriate mitigation strategies',
      'C) Avoiding all risks',
      'D) Purchasing maximum insurance'
    ],
    correctAnswer: 1,
    explanation: 'Risk mapping uses a matrix: probability of occurrence vs. severity of impact. High probability/high impact risks demand immediate attention (transfer or reduce). Low probability/low impact may be retained. This systematic approach ensures resources focus on the most significant risks first.'
  },
  {
    id: 'CFP-RIS-B6-002',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-1',
    topic: 'Risk Analysis',
    subtopic: 'Pure vs Speculative Risk',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Pure risk differs from speculative risk in that pure risk:',
    options: [
      'A) Offers potential for gain',
      'B) Involves only the possibility of loss or no loss, with no chance of gain',
      'C) Cannot be insured',
      'D) Only affects businesses'
    ],
    correctAnswer: 1,
    explanation: 'Pure risk: only loss or no loss possible (fire, death, liability). Speculative risk: potential for gain, loss, or no change (investments, gambling, business ventures). Insurance typically covers pure risks—insurers can price based on loss probability without considering gain.'
  },
  {
    id: 'CFP-RIS-B6-003',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-1',
    topic: 'Risk Analysis',
    subtopic: 'Maximum Probable Loss',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Maximum probable loss (MPL) refers to:',
    options: [
      'A) Total value of all assets',
      'B) The most likely loss amount in a worst-case scenario that could realistically occur, used to determine appropriate coverage levels',
      'C) Average claim experience',
      'D) Deductible amounts'
    ],
    correctAnswer: 1,
    explanation: 'MPL is the largest loss that would probably result from a single event—not the absolute maximum (which might be astronomical) but a realistic worst-case. It helps size insurance limits appropriately. For example, MPL for a home might be replacement cost less salvage value, not including the land.'
  },
  // RIS-2: Life Insurance
  {
    id: 'CFP-RIS-B6-004',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-2',
    topic: 'Life Insurance',
    subtopic: 'Survivorship Life Insurance',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Survivorship (second-to-die) life insurance:',
    options: [
      'A) Pays when the first insured dies',
      'B) Pays only after both insureds die, typically used for estate liquidity since estate tax is deferred until the second spouse\'s death',
      'C) Is term insurance only',
      'D) Insures children'
    ],
    correctAnswer: 1,
    explanation: 'Second-to-die pays at the survivor\'s death—when estate taxes (with marital deduction) are due. Premiums are lower than individual policies because two lives are covered. Often used in ILITs for estate liquidity. Also useful when one spouse is uninsurable—joint coverage may be obtainable.'
  },
  {
    id: 'CFP-RIS-B6-005',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-2',
    topic: 'Life Insurance',
    subtopic: 'Life Settlement',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A life settlement differs from a viatical settlement in that:',
    options: [
      'A) They are identical',
      'B) Life settlements are for insureds typically over 65 who are not terminally ill; viaticals are for terminally or chronically ill insureds',
      'C) Life settlements have no tax implications',
      'D) Viaticals pay more'
    ],
    correctAnswer: 1,
    explanation: 'Viatical settlements: terminally/chronically ill sell policies, often tax-free under IRC 101(g). Life settlements: seniors (typically 65+) sell unwanted policies for more than cash value but less than death benefit. Life settlement proceeds are taxable—ordinary income to extent of premium recovered, then capital gains.'
  },
  {
    id: 'CFP-RIS-B6-006',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-2',
    topic: 'Life Insurance',
    subtopic: 'Corridor/Guideline Requirements',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The corridor or guideline premium tests for life insurance exist to:',
    options: [
      'A) Maximize investment returns',
      'B) Ensure policies maintain sufficient death benefit relative to cash value to qualify as life insurance rather than an investment',
      'C) Limit premiums',
      'D) Avoid all taxation'
    ],
    correctAnswer: 1,
    explanation: 'IRC 7702 defines life insurance through cash value accumulation test (CVAT) or guideline premium/corridor test (GPT). Both ensure death benefit remains meaningfully greater than cash value. Without these limits, policies become investment vehicles without insurance taxation benefits. The corridor requires minimum death benefit relative to cash value.'
  },
  // RIS-3: Disability Insurance
  {
    id: 'CFP-RIS-B6-007',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-3',
    topic: 'Disability Insurance',
    subtopic: 'Residual Disability',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Residual disability benefits:',
    options: [
      'A) Only pay if totally disabled',
      'B) Provide partial benefits when the insured can work but earns less due to disability',
      'C) End after 30 days',
      'D) Are not available in individual policies'
    ],
    correctAnswer: 1,
    explanation: 'Residual benefits pay proportionally when the insured returns to work at reduced capacity/income. Example: if earnings drop 40%, receive 40% of benefit. This encourages return to work and provides ongoing support during recovery. Most quality individual policies include residual provisions.'
  },
  {
    id: 'CFP-RIS-B6-008',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-3',
    topic: 'Disability Insurance',
    subtopic: 'Social Insurance Offset',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A Social Insurance Supplement/Offset rider on disability insurance:',
    options: [
      'A) Eliminates Social Security',
      'B) Reduces policy benefits by Social Security disability received, or provides additional benefit if SSDI is denied',
      'C) Is mandatory',
      'D) Only applies to group plans'
    ],
    correctAnswer: 1,
    explanation: 'Social Insurance Supplement (SIS) provides extra benefit if SSDI is denied or delayed. Social Insurance Offset reduces the base benefit by SSDI received. The combination ensures adequate coverage while avoiding over-insurance. SSDI is difficult to obtain (strict definition), so SIS provides needed interim/permanent protection.'
  },
  {
    id: 'CFP-RIS-B6-009',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-3',
    topic: 'Disability Insurance',
    subtopic: 'Business Overhead Expense',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Business overhead expense (BOE) disability insurance covers:',
    options: [
      'A) The owner\'s salary',
      'B) Business operating expenses (rent, utilities, employee salaries, loan payments) while the owner is disabled',
      'C) Business start-up costs',
      'D) Only equipment purchases'
    ],
    correctAnswer: 1,
    explanation: 'BOE policies reimburse normal operating expenses when a business owner is disabled, keeping the business viable during recovery. They don\'t cover the owner\'s income (that\'s individual disability). Benefits typically last 12-24 months. Premiums are tax-deductible as business expense; benefits are taxable.'
  },
  // RIS-4: Property Insurance
  {
    id: 'CFP-RIS-B6-010',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-4',
    topic: 'Property Insurance',
    subtopic: 'Actual Cash Value vs Replacement Cost',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Actual cash value (ACV) coverage differs from replacement cost in that ACV:',
    options: [
      'A) Pays more',
      'B) Deducts depreciation from replacement cost, resulting in lower claim payments for older items',
      'C) Only applies to vehicles',
      'D) Is not available in homeowners policies'
    ],
    correctAnswer: 1,
    explanation: 'ACV = Replacement Cost - Depreciation. A 10-year-old roof destroyed might only receive 30-40% of replacement cost under ACV. Replacement cost coverage pays to replace/repair with new materials. The premium difference is usually worth it for significant protection against depreciation.'
  },
  {
    id: 'CFP-RIS-B6-011',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-4',
    topic: 'Property Insurance',
    subtopic: 'Inflation Guard',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'An inflation guard endorsement on homeowners insurance:',
    options: [
      'A) Freezes coverage amounts',
      'B) Automatically increases coverage limits periodically to keep pace with construction cost increases',
      'C) Reduces premiums',
      'D) Is included in all policies'
    ],
    correctAnswer: 1,
    explanation: 'Inflation guard automatically increases dwelling coverage (typically quarterly) to match rising construction costs. Without it, a home insured at $300K five years ago might be underinsured as replacement costs rose. The premium increases proportionally. Most advisers recommend this endorsement.'
  },
  {
    id: 'CFP-RIS-B6-012',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-4',
    topic: 'Property Insurance',
    subtopic: 'Ordinance or Law Coverage',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Ordinance or law coverage in homeowners insurance pays for:',
    options: [
      'A) Legal fees only',
      'B) Increased costs to rebuild to current building codes when they exceed original construction standards',
      'C) Property taxes',
      'D) Zoning variances'
    ],
    correctAnswer: 1,
    explanation: 'After a loss, rebuilding must meet current codes, which may exceed original construction. Standard policies may not cover this gap. Ordinance coverage pays: 1) demolition of undamaged portions if required, 2) increased building costs for code compliance, and 3) loss of undamaged portions that must be demolished.'
  },
  // RIS-5: Liability Insurance
  {
    id: 'CFP-RIS-B6-013',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-5',
    topic: 'Liability Insurance',
    subtopic: 'Personal Liability Umbrella',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A personal umbrella liability policy provides:',
    options: [
      'A) Coverage for business activities',
      'B) Excess liability protection above home and auto limits, plus broader coverage for some claims not covered by underlying policies',
      'C) Only auto liability',
      'D) Property coverage'
    ],
    correctAnswer: 1,
    explanation: 'Umbrellas provide: 1) excess liability above auto/homeowners limits (e.g., $1M-$10M), 2) broader coverage (some personal injury claims, liability abroad), 3) relatively inexpensive protection for catastrophic claims. They require maintaining specified underlying auto/home limits and typically exclude business/professional liability.'
  },
  {
    id: 'CFP-RIS-B6-014',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-5',
    topic: 'Liability Insurance',
    subtopic: 'Professional Liability',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Professional liability (E&O) insurance covers:',
    options: [
      'A) Only bodily injury',
      'B) Claims arising from professional negligence, errors, or omissions in providing professional services',
      'C) General business liability',
      'D) Product defects'
    ],
    correctAnswer: 1,
    explanation: 'Professional liability (errors & omissions) covers claims from professional service failures—negligent advice, missed deadlines, errors in work product. It\'s essential for CFP® professionals. Policies are claims-made (covering claims made during policy period regardless of when error occurred), unlike occurrence-based general liability.'
  },
  {
    id: 'CFP-RIS-B6-015',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-5',
    topic: 'Liability Insurance',
    subtopic: 'Workers Compensation',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Workers compensation insurance provides:',
    options: [
      'A) Income replacement for business owners',
      'B) Coverage for employee injuries regardless of fault, including medical expenses and wage replacement',
      'C) Retirement benefits',
      'D) Unemployment compensation'
    ],
    correctAnswer: 1,
    explanation: 'Workers comp is no-fault coverage for work-related injuries/illnesses: medical care, wage replacement (typically 2/3 of wages), rehabilitation, and death benefits. Employees generally cannot sue employers for covered injuries. Required in most states for most employers. Rates vary by job classification risk.'
  },
  // RIS-6: Health Insurance
  {
    id: 'CFP-RIS-B6-016',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-6',
    topic: 'Health Insurance',
    subtopic: 'HDHPs and HSAs',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A High Deductible Health Plan (HDHP) combined with an HSA offers:',
    options: [
      'A) Only lower premiums',
      'B) Lower premiums, tax-deductible HSA contributions, tax-free growth, and tax-free withdrawals for qualified medical expenses',
      'C) Coverage without deductibles',
      'D) Employer-only contributions'
    ],
    correctAnswer: 1,
    explanation: 'HDHP + HSA: triple tax advantage (deduction, tax-free growth, tax-free qualified withdrawals). HDHPs have minimum deductibles ($1,600 individual/$3,200 family in 2024) and maximum out-of-pocket limits. HSA contributions for 2024: $4,150/$8,300 + $1,000 catch-up (55+). HSA funds roll over and can be invested for retirement.'
  },
  {
    id: 'CFP-RIS-B6-017',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-6',
    topic: 'Health Insurance',
    subtopic: 'COBRA Continuation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'COBRA allows continuation of employer health coverage for:',
    options: [
      'A) Unlimited time',
      'B) Generally 18 months after job loss (36 months for some events) at full premium plus 2% administrative fee',
      'C) Only employees, not family',
      'D) Free coverage'
    ],
    correctAnswer: 1,
    explanation: 'COBRA applies to employers with 20+ employees. Qualifying events: job loss (18 months), hours reduction (18 months), divorce/legal separation (36 months), death (36 months for dependents), Medicare eligibility (36 months for spouse), dependent aging out (36 months). Premium is full cost plus 2% admin fee.'
  },
  {
    id: 'CFP-RIS-B6-018',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-6',
    topic: 'Health Insurance',
    subtopic: 'Medicare Parts',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The four parts of Medicare cover:',
    options: [
      'A) Only hospital stays',
      'B) A: Hospital, B: Medical/outpatient, C: Medicare Advantage (private plans), D: Prescription drugs',
      'C) Only prescriptions',
      'D) Long-term care'
    ],
    correctAnswer: 1,
    explanation: 'Medicare: Part A (hospital—generally premium-free), Part B (medical/outpatient—premium required), Part C (Medicare Advantage—private plans combining A, B, usually D), Part D (prescription drugs—separate or with Advantage). Original Medicare (A+B) can add Medigap and standalone Part D. Medicare doesn\'t cover long-term care.'
  },
  // Additional Topics
  {
    id: 'CFP-RIS-B6-019',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-1',
    topic: 'Risk Analysis',
    subtopic: 'Loss Prevention vs Reduction',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Loss prevention differs from loss reduction in that prevention:',
    options: [
      'A) Minimizes loss severity',
      'B) Aims to avoid losses from occurring, while reduction minimizes loss severity once an event happens',
      'C) Is more expensive',
      'D) Only applies to health risks'
    ],
    correctAnswer: 1,
    explanation: 'Loss prevention stops losses (smoke alarms, safe driving, exercise). Loss reduction minimizes severity (sprinklers limit fire damage, seatbelts reduce injury severity, first aid). Both are risk control techniques that complement insurance. Prevention is proactive; reduction is reactive planning.'
  },
  {
    id: 'CFP-RIS-B6-020',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-2',
    topic: 'Life Insurance',
    subtopic: 'Guaranteed Insurability',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A guaranteed insurability rider allows:',
    options: [
      'A) Coverage on family members',
      'B) Purchase of additional coverage at specific future dates or events without evidence of insurability',
      'C) Lower premiums',
      'D) Conversion to term insurance'
    ],
    correctAnswer: 1,
    explanation: 'Guaranteed insurability (or purchase option) lets policyholders buy additional coverage at specific dates (policy anniversaries) or life events (marriage, birth) without medical underwriting. Lock in insurability while young/healthy for future needs. Coverage is at attained age rates, but without health requirements.'
  },
  {
    id: 'CFP-RIS-B6-021',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-3',
    topic: 'Disability Insurance',
    subtopic: 'Recovery Benefit',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A recovery benefit in disability insurance:',
    options: [
      'A) Is the same as residual disability',
      'B) Provides benefits after total disability ends even if the insured has returned to full earnings, to help with recovery expenses',
      'C) Only applies during disability',
      'D) Reduces premiums'
    ],
    correctAnswer: 1,
    explanation: 'Recovery benefits continue for a period after total disability ends, even at full earning capacity. They help with transition expenses—new clothing after weight change, work equipment, training, deferred personal expenses. Typically 12-24 months, decreasing monthly. Different from residual (which requires ongoing income loss).'
  },
  {
    id: 'CFP-RIS-B6-022',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-4',
    topic: 'Property Insurance',
    subtopic: 'Named Peril vs Open Peril',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Open peril (all-risk) coverage differs from named peril in that open peril:',
    options: [
      'A) Lists every possible loss',
      'B) Covers all losses except those specifically excluded, while named peril only covers losses specifically listed',
      'C) Is always cheaper',
      'D) Doesn\'t include exclusions'
    ],
    correctAnswer: 1,
    explanation: 'Named peril: only listed causes of loss covered (fire, lightning, windstorm, etc.). Open peril: covers any cause of loss unless specifically excluded (nuclear, war, intentional, etc.). Open peril is broader—unexpected events not listed as exclusions are covered. Standard homeowners policies vary: dwelling is often open peril; contents may be named peril.'
  },
  {
    id: 'CFP-RIS-B6-023',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-5',
    topic: 'Liability Insurance',
    subtopic: 'Occurrence vs Claims-Made',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Claims-made liability policies differ from occurrence policies in that claims-made:',
    options: [
      'A) Cover claims whenever they occurred',
      'B) Cover claims filed during the policy period, regardless of when the incident occurred (subject to retroactive date)',
      'C) Have no time limits',
      'D) Are always more expensive'
    ],
    correctAnswer: 1,
    explanation: 'Occurrence: covers incidents during policy period regardless of when claim is made. Claims-made: covers claims made during policy period for incidents after the retroactive date. Claims-made requires tail coverage (extended reporting period) when policies lapse to cover future claims from past acts. Professional liability is typically claims-made.'
  },
  {
    id: 'CFP-RIS-B6-024',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-6',
    topic: 'Health Insurance',
    subtopic: 'Medigap',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Medigap (Medicare Supplement) policies:',
    options: [
      'A) Replace Original Medicare',
      'B) Fill gaps in Original Medicare coverage, paying costs like deductibles, coinsurance, and excess charges',
      'C) Include prescription coverage',
      'D) Are available with Medicare Advantage'
    ],
    correctAnswer: 1,
    explanation: 'Medigap supplements Original Medicare (Parts A and B), covering deductibles, coinsurance, copays, and excess charges. Standardized plans (A through N) offer different coverage levels. Cannot be used with Medicare Advantage. Best time to buy is 6-month open enrollment at 65—guaranteed issue, no health questions.'
  },
  {
    id: 'CFP-RIS-B6-025',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-1',
    topic: 'Risk Analysis',
    subtopic: 'Coinsurance Penalty',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Property insurance coinsurance clauses penalize underinsurance by:',
    options: [
      'A) Canceling the policy',
      'B) Reducing claim payments proportionally if coverage is below the required percentage (typically 80%) of property value',
      'C) Increasing premiums automatically',
      'D) Voiding coverage for major claims'
    ],
    correctAnswer: 1,
    explanation: 'Coinsurance: if coverage is less than the required % of value (usually 80%), claims are reduced proportionally. Formula: (Coverage carried / Coverage required) × Loss = Payment. Example: $160K coverage on $250K home (64% vs. 80% required), $50K loss: (160/200) × 50K = $40K payment (20% penalty). Ensures adequate coverage for premium calculations.'
  }
];

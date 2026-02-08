/**
 * CFP Risk Management Questions - Batch 7
 * Domain 3: Risk Management and Insurance Planning (12% of exam)
 * 25 additional questions covering risk management and insurance topics
 */

import { Question } from '../../../types';

export const CFP_RISK_BATCH7_QUESTIONS: Question[] = [
  // RIS-1: Risk Assessment
  {
    id: 'CFP-RIS-B7-001',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-1',
    topic: 'Risk Assessment',
    subtopic: 'Risk Matrix',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A risk matrix evaluates potential losses by considering:',
    options: [
      'A) Only probability of occurrence',
      'B) Both the probability of occurrence and the severity of potential loss to prioritize risk management responses',
      'C) Insurance premium costs only',
      'D) Historical claims data exclusively'
    ],
    correctAnswer: 1,
    explanation: 'Risk matrix: plots probability (likelihood) vs. severity (impact). High probability/high severity: priority for risk transfer (insurance). Low probability/high severity: catastrophic—insurance essential. High probability/low severity: may self-insure with reserves. Low/low: accept the risk. Helps allocate limited risk management resources effectively.'
  },
  {
    id: 'CFP-RIS-B7-002',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-1',
    topic: 'Risk Assessment',
    subtopic: 'Pure vs Speculative Risk',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Pure risk differs from speculative risk in that pure risk:',
    options: [
      'A) Always results in gain',
      'B) Involves only the possibility of loss or no loss, with no chance of gain, making it insurable',
      'C) Cannot be measured',
      'D) Only applies to businesses'
    ],
    correctAnswer: 1,
    explanation: 'Pure risk: loss or no loss (fire, death, accident)—no upside. Insurance covers pure risks. Speculative risk: possibility of loss, no change, or gain (investing, gambling, business ventures)—has upside potential. Insurance doesn\'t cover speculative risks because adverse selection would be extreme.'
  },
  {
    id: 'CFP-RIS-B7-003',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-1',
    topic: 'Risk Assessment',
    subtopic: 'Personal Risk Profile',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A comprehensive personal risk assessment should identify:',
    options: [
      'A) Only property risks',
      'B) Personal risks (death, disability), property risks (damage, theft), liability risks (lawsuits), and economic risks (inflation, job loss)',
      'C) Insurance discounts available',
      'D) Only catastrophic exposures'
    ],
    correctAnswer: 1,
    explanation: 'Complete risk assessment categories: Personal (premature death, disability, longevity, health needs), Property (damage, theft, loss of use), Liability (injury to others, professional errors), Economic (unemployment, inflation, market losses). Each category requires different strategies. Comprehensive planning addresses all exposures.'
  },
  // RIS-2: Life Insurance
  {
    id: 'CFP-RIS-B7-004',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-2',
    topic: 'Life Insurance',
    subtopic: 'Term Conversion',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The term conversion privilege allows:',
    options: [
      'A) Converting whole life to term',
      'B) Converting term insurance to permanent coverage without evidence of insurability, typically before age 65 or 70',
      'C) Changing the insured person',
      'D) Reducing coverage without fees'
    ],
    correctAnswer: 1,
    explanation: 'Conversion privilege: term policyholders can convert to permanent insurance without new medical underwriting. Valuable if health declines. Limitations: must exercise before attainment age (typically 65-70) or within certain years, limited permanent policy choices. Premiums based on attained age at conversion. Key feature when evaluating term policies.'
  },
  {
    id: 'CFP-RIS-B7-005',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-2',
    topic: 'Life Insurance',
    subtopic: 'Accelerated Death Benefit',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'An accelerated death benefit rider allows policyholders to:',
    options: [
      'A) Receive higher death benefits',
      'B) Access a portion of the death benefit while living if diagnosed with terminal illness, chronic illness, or critical illness',
      'C) Avoid premium payments',
      'D) Increase coverage without underwriting'
    ],
    correctAnswer: 1,
    explanation: 'Accelerated death benefit (ADB): access portion of death benefit early upon qualifying event (terminal illness with 6-24 month life expectancy, chronic illness requiring care, or critical illness like cancer). Amount received reduces death benefit. Often included at no cost. Provides living benefits from life insurance when needed most.'
  },
  {
    id: 'CFP-RIS-B7-006',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-2',
    topic: 'Life Insurance',
    subtopic: 'Key Person Insurance',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Key person (key employee) insurance protects a business by:',
    options: [
      'A) Providing employee benefits',
      'B) Compensating the business for financial loss when an essential employee dies or becomes disabled',
      'C) Funding buy-sell agreements',
      'D) Paying employee families'
    ],
    correctAnswer: 1,
    explanation: 'Key person insurance: business owns policy on essential employee, pays premiums, receives death benefit. Covers: revenue loss, replacement costs, loan repayment, business stabilization. Not a buy-sell funding mechanism (different purpose). May be needed for: executives, salespeople, technical experts, or anyone whose loss would financially harm business.'
  },
  // RIS-3: Health Insurance
  {
    id: 'CFP-RIS-B7-007',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-3',
    topic: 'Health Insurance',
    subtopic: 'HSA Eligibility',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'To contribute to an HSA, an individual must:',
    options: [
      'A) Have any health insurance plan',
      'B) Be covered by an HSA-eligible high-deductible health plan with no other disqualifying coverage, including Medicare',
      'C) Be under age 55',
      'D) Have employer contribution'
    ],
    correctAnswer: 1,
    explanation: 'HSA eligibility: must have HDHP (2024: individual deductible ≥$1,600, family ≥$3,200), cannot have other health coverage (including Medicare), cannot be claimed as dependent. Common disqualifiers: spouse\'s FSA, enrollment in Medicare. Once eligible, can contribute (2024: $4,150 individual, $8,300 family, plus $1,000 catch-up at 55+).'
  },
  {
    id: 'CFP-RIS-B7-008',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-3',
    topic: 'Health Insurance',
    subtopic: 'ACA Cost-Sharing Reductions',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'ACA cost-sharing reductions (CSRs) differ from premium tax credits in that CSRs:',
    options: [
      'A) Reduce monthly premiums',
      'B) Lower deductibles, copayments, and out-of-pocket maximums for Silver plan enrollees with income below 250% FPL',
      'C) Apply to all metal levels',
      'D) Are received as tax refund'
    ],
    correctAnswer: 1,
    explanation: 'CSRs reduce out-of-pocket costs (deductibles, copays, coinsurance, max out-of-pocket), not premiums. Only available: on marketplace Silver plans, income 100-250% FPL, Native Americans to 300%. Creates "enhanced Silver" with better cost-sharing. Premium tax credits reduce premiums; CSR reduces what you pay when using care. Different benefits, both income-based.'
  },
  {
    id: 'CFP-RIS-B7-009',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-3',
    topic: 'Health Insurance',
    subtopic: 'CHIP',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The Children\'s Health Insurance Program (CHIP) provides:',
    options: [
      'A) Coverage only for disabled children',
      'B) Low-cost health coverage to children in families earning too much for Medicaid but unable to afford private insurance',
      'C) Medicare benefits for children',
      'D) Dental coverage only'
    ],
    correctAnswer: 1,
    explanation: 'CHIP: state-federal program covering children whose families earn too much for Medicaid but can\'t afford private coverage. Eligibility varies by state (typically up to 200-300% FPL). Low or no premiums and copays. Some states also cover pregnant women. Separate from marketplace with its own enrollment rules. Important safety net for families.'
  },
  // RIS-4: Disability Insurance
  {
    id: 'CFP-RIS-B7-010',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-4',
    topic: 'Disability Insurance',
    subtopic: 'Partial Disability',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Partial disability benefits typically:',
    options: [
      'A) Pay full benefits while working part-time',
      'B) Pay proportional benefits based on income loss when the insured can work but earns less due to disability',
      'C) Only apply after total disability',
      'D) End when any work resumes'
    ],
    correctAnswer: 1,
    explanation: 'Partial/residual disability: pays proportional benefit when earning capacity is reduced (typically 20%+ income loss). Formula often: (Pre-disability income - Current income) / Pre-disability income × Full benefit. Encourages return to work without losing all benefits. Some policies require initial total disability; others cover partial from onset.'
  },
  {
    id: 'CFP-RIS-B7-011',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-4',
    topic: 'Disability Insurance',
    subtopic: 'COLA Rider',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A cost-of-living adjustment (COLA) rider on disability insurance:',
    options: [
      'A) Increases premiums annually',
      'B) Increases benefits during a claim period to keep pace with inflation, typically tied to CPI up to a cap',
      'C) Reduces the elimination period',
      'D) Extends the benefit period'
    ],
    correctAnswer: 1,
    explanation: 'COLA rider: once disability claim begins, benefits increase periodically (typically annually) based on CPI, usually capped at 3-8% per year. Important for long-term disabilities where fixed benefits lose purchasing power. Usually doesn\'t apply to short claims. Adds cost but protects real value of multi-year claims. Compound increases add up significantly.'
  },
  {
    id: 'CFP-RIS-B7-012',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-4',
    topic: 'Disability Insurance',
    subtopic: 'Social Insurance Substitute',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A Social Insurance Supplement (SIS) or Social Insurance Substitute rider:',
    options: [
      'A) Replaces Social Security',
      'B) Pays additional benefits initially that reduce if/when Social Security Disability benefits are approved',
      'C) Increases SSDI benefits',
      'D) Waives Medicare waiting period'
    ],
    correctAnswer: 1,
    explanation: 'SIS rider: provides additional benefit during SSDI application process (can take months/years). Once SSDI approved, SIS benefit reduces or ends (offset). Bridges gap during waiting period. Makes coverage more affordable (lower base benefit covered by SIS). If SSDI denied, SIS may continue. Important for balancing cost and protection.'
  },
  // RIS-5: Property and Casualty
  {
    id: 'CFP-RIS-B7-013',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-5',
    topic: 'Property Insurance',
    subtopic: 'Ordinance or Law Coverage',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Ordinance or law coverage is needed when:',
    options: [
      'A) All claims are denied',
      'B) Building codes require upgrades during repairs, demolition of undamaged portions, or increased construction costs not covered by basic policies',
      'C) Crimes occur on property',
      'D) Rental income is lost'
    ],
    correctAnswer: 1,
    explanation: 'Ordinance/law coverage: when repairing damaged buildings, current codes may require upgrades (undamaged portions must comply). Standard policies don\'t cover code upgrades or demolishing undamaged portions. Coverage includes: undamaged portion loss, demolition costs, increased construction costs. Essential for older buildings; standard policies explicitly exclude.'
  },
  {
    id: 'CFP-RIS-B7-014',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-5',
    topic: 'Property Insurance',
    subtopic: 'Scheduled Personal Property',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Scheduling personal property on a homeowners policy:',
    options: [
      'A) Reduces coverage',
      'B) Provides higher limits and broader coverage for specific valuable items like jewelry, art, or collectibles with appraisals',
      'C) Eliminates deductibles for home',
      'D) Only applies to electronics'
    ],
    correctAnswer: 1,
    explanation: 'Scheduling: lists specific items with appraised values. Benefits: higher limits than policy sub-limits (jewelry often capped at $1,500), broader perils (typically all-risk), agreed value (no depreciation disputes), often no deductible. Requires current appraisals. Items: jewelry, fine art, antiques, collectibles, musical instruments, camera equipment.'
  },
  {
    id: 'CFP-RIS-B7-015',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-5',
    topic: 'Liability Insurance',
    subtopic: 'Medical Payments Coverage',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Medical payments coverage in homeowners and auto policies:',
    options: [
      'A) Covers only the policyholder',
      'B) Pays medical expenses for injuries to others regardless of fault, up to policy limits, without requiring proof of liability',
      'C) Replaces health insurance',
      'D) Only covers emergency care'
    ],
    correctAnswer: 1,
    explanation: 'Medical payments coverage: pays for injuries to others regardless of negligence. Homeowners: guests injured on property. Auto: injured passengers in your car. Limits are typically modest ($1K-$10K). Purpose: maintain goodwill, handle small claims without lawsuits, demonstrate good faith. Not fault-based—pays even if you\'re not liable.'
  },
  // Additional Topics
  {
    id: 'CFP-RIS-B7-016',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-1',
    topic: 'Risk Assessment',
    subtopic: 'Moral Hazard',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Moral hazard in insurance refers to:',
    options: [
      'A) Fraudulent claims only',
      'B) The tendency for insured individuals to take greater risks or exercise less care because they are protected by insurance',
      'C) High-risk applicants',
      'D) Premium increases'
    ],
    correctAnswer: 1,
    explanation: 'Moral hazard: insurance changes behavior—less incentive to prevent losses when protected. Examples: driving less carefully with full coverage, not maintaining insured property. Insurers combat with: deductibles (share loss), coinsurance (share cost), policy limits, exclusions. Differs from adverse selection (pre-purchase selection bias).'
  },
  {
    id: 'CFP-RIS-B7-017',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-2',
    topic: 'Life Insurance',
    subtopic: 'Guaranteed Issue',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Guaranteed issue life insurance:',
    options: [
      'A) Offers the lowest premiums',
      'B) Accepts all applicants regardless of health but typically has lower face amounts, higher premiums, and graded death benefits',
      'C) Requires medical exams',
      'D) Is only offered by employers'
    ],
    correctAnswer: 1,
    explanation: 'Guaranteed issue: no medical questions or exams—everyone accepted. Trade-offs: low face amounts ($5K-$25K typically), high premiums (company assumes high-risk pool), graded benefits (limited or no benefit for natural death in first 2-3 years). Designed for final expenses when uninsurable elsewhere. Last resort—explore other options first.'
  },
  {
    id: 'CFP-RIS-B7-018',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-3',
    topic: 'Health Insurance',
    subtopic: 'Short-Term Health Insurance',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Short-term health insurance:',
    options: [
      'A) Meets ACA requirements',
      'B) Provides temporary coverage during transitions but may exclude pre-existing conditions, have annual/lifetime limits, and limited benefits',
      'C) Has no coverage gaps',
      'D) Is the same as COBRA'
    ],
    correctAnswer: 1,
    explanation: 'Short-term medical insurance: temporary coverage (3-12 months, sometimes renewable). Not ACA-compliant: can exclude pre-existing conditions, impose limits, offer limited benefits. May exclude maternity, mental health, preventive care. Lower premiums than ACA plans but significant protection gaps. Bridge coverage only—not long-term substitute.'
  },
  {
    id: 'CFP-RIS-B7-019',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-4',
    topic: 'Disability Insurance',
    subtopic: 'Integration with Employer Coverage',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'When coordinating personal and employer disability coverage:',
    options: [
      'A) Personal coverage replaces employer coverage',
      'B) Consider total after-tax replacement ratio, definition of disability differences, and whether employer-paid benefits are taxable',
      'C) Employer coverage is always sufficient',
      'D) Only one policy can pay'
    ],
    correctAnswer: 1,
    explanation: 'Coordination considerations: employer-paid STD/LTD benefits are taxable; employee-paid are tax-free. Total replacement should target 60-70% of gross (80%+ of net). Employer policies may have weak disability definitions. Personal policies supplement with own-occupation coverage, portable protection. Insurers cap total coverage around 60-70% of income.'
  },
  {
    id: 'CFP-RIS-B7-020',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-5',
    topic: 'Property Insurance',
    subtopic: 'Loss of Use Coverage',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Loss of use coverage (Coverage D) in homeowners insurance pays for:',
    options: [
      'A) Replacing damaged items',
      'B) Additional living expenses when the home is uninhabitable due to a covered loss, including temporary housing and food costs',
      'C) Lost wages during repairs',
      'D) Property depreciation'
    ],
    correctAnswer: 1,
    explanation: 'Loss of use (Coverage D): pays additional living expenses when home is uninhabitable due to covered peril. Includes: hotel/rental costs, restaurant meals above normal food costs, laundry, storage. Pays difference between normal expenses and actual costs incurred. Limit typically 20-30% of dwelling coverage. Critical for maintaining lifestyle during repairs.'
  },
  {
    id: 'CFP-RIS-B7-021',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-1',
    topic: 'Risk Assessment',
    subtopic: 'Self-Insurance Calculation',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'When evaluating whether to self-insure a risk:',
    options: [
      'A) Only consider premium savings',
      'B) Compare premium costs against expected losses, ability to absorb worst-case loss, and opportunity cost of held reserves',
      'C) Self-insure all risks to save money',
      'D) Only look at deductible options'
    ],
    correctAnswer: 1,
    explanation: 'Self-insurance analysis: premium saved vs. expected claims (actuarial value), ability to absorb maximum possible loss (capital adequacy), opportunity cost of held reserves (could invest elsewhere), administrative costs, and risk tolerance. Self-insure: high frequency/low severity. Transfer to insurer: low frequency/high severity catastrophes.'
  },
  {
    id: 'CFP-RIS-B7-022',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-2',
    topic: 'Life Insurance',
    subtopic: 'Policy Loan Interest',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Interest on policy loans from life insurance:',
    options: [
      'A) Is always tax-deductible',
      'B) Accrues and adds to the loan balance, and if not paid, can cause policy lapse which may trigger taxable gain',
      'C) Is paid to the beneficiary',
      'D) Reduces death benefit only'
    ],
    correctAnswer: 1,
    explanation: 'Policy loan interest: typically not deductible (personal loan). Interest accrues and adds to loan balance. If total loan exceeds cash value, policy lapses. On lapse: if gains exist (total premiums paid < cash value + loan), gain is taxable income even though no cash received. Must monitor loan balance vs. cash value to prevent unintended lapse.'
  },
  {
    id: 'CFP-RIS-B7-023',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-3',
    topic: 'Health Insurance',
    subtopic: 'Mental Health Parity',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The Mental Health Parity and Addiction Equity Act requires:',
    options: [
      'A) All plans to cover mental health',
      'B) Plans offering mental health benefits to provide them on terms comparable to medical/surgical benefits—similar cost-sharing and limits',
      'C) Unlimited mental health coverage',
      'D) Employer-paid mental health care'
    ],
    correctAnswer: 1,
    explanation: 'Mental Health Parity Act: if a plan covers mental health/substance use, it must be comparable to medical benefits—can\'t have stricter financial requirements (copays, deductibles) or treatment limitations (visit caps). Applies to group plans with 50+ employees and ACA individual plans. Doesn\'t require coverage but ensures parity if offered.'
  },
  {
    id: 'CFP-RIS-B7-024',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-4',
    topic: 'Disability Insurance',
    subtopic: 'Overhead Expense Insurance',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Business overhead expense (BOE) insurance:',
    options: [
      'A) Covers employee wages',
      'B) Reimburses fixed business expenses like rent, utilities, and employee salaries during the owner\'s disability',
      'C) Pays business profits',
      'D) Only covers malpractice'
    ],
    correctAnswer: 1,
    explanation: 'BOE disability insurance: covers fixed business expenses when owner is disabled. Covered: rent/mortgage, utilities, employee salaries, insurance premiums, equipment leases. Not covered: owner\'s salary (personal DI), business profits, new hires. Typically short benefit period (12-24 months). Premiums tax-deductible; benefits taxable. Essential for small business owners.'
  },
  {
    id: 'CFP-RIS-B7-025',
    courseId: 'cfp',
    section: 'CFP-RISK',
    blueprintArea: 'RIS-5',
    topic: 'Liability Insurance',
    subtopic: 'Personal Injury Liability',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Personal injury coverage in homeowners policies covers liability for:',
    options: [
      'A) Physical injuries to the insured',
      'B) Non-physical torts like libel, slander, defamation, false arrest, or invasion of privacy',
      'C) Car accidents only',
      'D) Intentional criminal acts'
    ],
    correctAnswer: 1,
    explanation: 'Personal injury liability: covers non-physical harm claims. Typically includes: libel, slander, defamation, false arrest, malicious prosecution, invasion of privacy, wrongful eviction. Not included in basic HO policies—requires endorsement. Important for: bloggers/social media users, landlords, those in public roles. Umbrella policies often include automatically.'
  }
];

/**
 * CFP Flashcards - Risk Management & Insurance Batch 2
 * 60 additional flashcards for Risk domain
 */

import { Flashcard } from './index';

export const CFP_FLASHCARDS_RISK_BATCH2: Flashcard[] = [
  {
    id: 'FC-RISK-011',
    domain: 'RISK',
    category: 'Risk Management',
    front: 'What are the FOUR risk management techniques?',
    back: 'Risk Management Techniques:\n\n1. AVOID: Eliminate the risk entirely\n2. REDUCE: Minimize likelihood/severity\n3. RETAIN: Accept the risk (self-insure)\n4. TRANSFER: Shift to another party (insurance)\n\n"ARRT" - Avoid, Reduce, Retain, Transfer\n\nChoice depends on frequency and severity',
    difficulty: 'easy',
    tags: ['risk-management', 'techniques', 'basics']
  },
  {
    id: 'FC-RISK-012',
    domain: 'RISK',
    category: 'Risk Management',
    front: 'What is PURE vs SPECULATIVE risk?',
    back: 'PURE RISK:\n• Only possible outcomes: Loss or no loss\n• Insurable\n• Examples: Fire, accident, death\n\nSPECULATIVE RISK:\n• Possible outcomes: Loss, no change, or gain\n• Generally NOT insurable\n• Examples: Investments, starting a business\n\nInsurance typically covers pure risks only',
    difficulty: 'medium',
    tags: ['pure', 'speculative', 'risk-types']
  },
  {
    id: 'FC-RISK-013',
    domain: 'RISK',
    category: 'Insurance Concepts',
    front: 'What are the SIX elements of an insurable risk?',
    back: 'Insurable Risk Requirements:\n1. LARGE NUMBER: Law of large numbers\n2. ACCIDENTAL: Not intentional\n3. DEFINITE LOSS: Measurable, time, amount\n4. NOT CATASTROPHIC: Spread risk geographically\n5. ECONOMICALLY FEASIBLE: Affordable premium\n6. CALCULABLE: Can estimate frequency/severity\n\nInsurance companies need these to price policies',
    difficulty: 'hard',
    tags: ['insurable', 'requirements', 'elements']
  },
  {
    id: 'FC-RISK-014',
    domain: 'RISK',
    category: 'Insurance Concepts',
    front: 'What is INSURABLE INTEREST?',
    back: 'Insurable Interest:\n• Must suffer financial loss if insured event occurs\n• Prevents gambling/wagering\n• Prevents moral hazard\n\nLife Insurance:\n• Required at inception only\n• Presumed: Self, spouse, dependents, business partners\n\nProperty Insurance:\n• Required at inception AND at time of loss\n• Only paid to extent of interest',
    difficulty: 'medium',
    tags: ['insurable-interest', 'requirement', 'principle']
  },
  {
    id: 'FC-RISK-015',
    domain: 'RISK',
    category: 'Insurance Concepts',
    front: 'What is the PRINCIPLE OF INDEMNITY?',
    back: 'Principle of Indemnity:\n• Restore insured to pre-loss position\n• Cannot profit from a loss\n• Prevents moral hazard\n\nApplies to:\n• Property insurance\n• Liability insurance\n• Health insurance (mostly)\n\nExceptions:\n• Life insurance (valued policy)\n• Agreed value policies',
    difficulty: 'medium',
    tags: ['indemnity', 'principle', 'insurance']
  },
  {
    id: 'FC-RISK-016',
    domain: 'RISK',
    category: 'Insurance Concepts',
    front: 'What is SUBROGATION?',
    back: 'Subrogation:\n• Insurer steps into insured\'s shoes\n• Right to recover from responsible third party\n• Prevents double recovery\n\nProcess:\n1. Insurer pays claim\n2. Insurer pursues at-fault party\n3. Recoveries offset claim payment\n\nMust cooperate with insurer\nCannot settle without consent',
    difficulty: 'medium',
    tags: ['subrogation', 'principle', 'recovery']
  },
  {
    id: 'FC-RISK-017',
    domain: 'RISK',
    category: 'Life Insurance',
    front: 'What is TERM LIFE insurance?',
    back: 'Term Life Insurance:\n• Pure death protection\n• Coverage for specific period\n• No cash value\n• Lowest initial premium\n\nTypes:\n• LEVEL TERM: Same premium throughout\n• ANNUAL RENEWABLE (ART): Increases yearly\n• DECREASING TERM: Declining benefit\n\nOptions: Renewable, convertible\nBest for: Temporary, maximum coverage needs',
    difficulty: 'easy',
    tags: ['term', 'life-insurance', 'types']
  },
  {
    id: 'FC-RISK-018',
    domain: 'RISK',
    category: 'Life Insurance',
    front: 'What is WHOLE LIFE insurance?',
    back: 'Whole Life Insurance:\n• Permanent coverage (to age 100+)\n• Level premium\n• Cash value growth (guaranteed)\n• Fixed death benefit\n\nCash Value:\n• Tax-deferred growth\n• Access via loans or withdrawals\n• Reduces death benefit if outstanding\n\nHigher premiums than term\nGuaranteed by insurer',
    difficulty: 'medium',
    tags: ['whole-life', 'permanent', 'insurance']
  },
  {
    id: 'FC-RISK-019',
    domain: 'RISK',
    category: 'Life Insurance',
    front: 'What is UNIVERSAL LIFE insurance?',
    back: 'Universal Life Insurance:\n• Flexible premiums within limits\n• Adjustable death benefit\n• Cash value with credited interest\n• Transparency (unbundled costs)\n\nTypes:\n• TRADITIONAL UL: Interest rate based\n• INDEXED UL (IUL): Tied to market index\n• VARIABLE UL (VUL): Investment subaccounts\n\nGUARANTEED UL: No cash value, guaranteed death benefit',
    difficulty: 'medium',
    tags: ['universal-life', 'flexible', 'permanent']
  },
  {
    id: 'FC-RISK-020',
    domain: 'RISK',
    category: 'Life Insurance',
    front: 'How is LIFE INSURANCE taxation handled?',
    back: 'Life Insurance Taxation:\n\nDEATH BENEFIT:\n• Generally income tax-free\n• May be in estate for estate tax\n\nCASH VALUE:\n• Growth is tax-deferred\n• Loans not taxable (if policy stays in force)\n• Withdrawals: FIFO (basis first)\n• Surrender: Gain taxed as ordinary income\n\nMEC: LIFO treatment (earnings first)',
    difficulty: 'medium',
    tags: ['life-insurance', 'taxation', 'death-benefit']
  },
  {
    id: 'FC-RISK-021',
    domain: 'RISK',
    category: 'Life Insurance',
    front: 'What is a MODIFIED ENDOWMENT CONTRACT (MEC)?',
    back: 'Modified Endowment Contract:\n• Fails 7-pay test\n• Overfunded life insurance\n\nTax Consequences:\n• LIFO: Earnings withdrawn first\n• Taxable as ordinary income\n• 10% penalty before 59½\n• Still tax-free death benefit\n\n7-Pay Test: Premium > 7-year premium for paid-up\nCannot "unmake" a MEC',
    difficulty: 'hard',
    tags: ['mec', '7-pay', 'taxation']
  },
  {
    id: 'FC-RISK-022',
    domain: 'RISK',
    category: 'Life Insurance',
    front: 'What is an IRREVOCABLE LIFE INSURANCE TRUST (ILIT)?',
    back: 'ILIT:\n• Trust owns life insurance policy\n• Removes from insured\'s estate\n• Avoids estate tax on death benefit\n\nRequirements:\n• Irrevocable\n• 3-year lookback for transfers\n• Crummey notices for gift exclusions\n• Independent trustee recommended\n\nFunds estate taxes without adding to estate',
    difficulty: 'hard',
    tags: ['ilit', 'trust', 'estate-planning']
  },
  {
    id: 'FC-RISK-023',
    domain: 'RISK',
    category: 'Life Insurance',
    front: 'What are LIFE INSURANCE settlement options?',
    back: 'Settlement Options:\n\n1. LUMP SUM: One-time payment\n2. INTEREST ONLY: Pay interest, hold principal\n3. FIXED PERIOD: Equal payments over time\n4. FIXED AMOUNT: Specific amount until depleted\n5. LIFE ANNUITY: Lifetime payments\n6. LIFE WITH PERIOD CERTAIN: Life or minimum term\n\nBeneficiary chooses (or owner designates)',
    difficulty: 'medium',
    tags: ['settlement', 'options', 'life-insurance']
  },
  {
    id: 'FC-RISK-024',
    domain: 'RISK',
    category: 'Life Insurance',
    front: 'How much LIFE INSURANCE is needed?',
    back: 'Needs Analysis Methods:\n\nHUMAN LIFE VALUE:\n• Present value of future earnings\n• Less taxes and personal consumption\n\nNEEDS APPROACH:\n• Immediate needs (final expenses, debts)\n• Income replacement needs\n• Less existing resources\n\nRule of thumb: 10-15x income\nConsider: Debt, children, spouse income, goals',
    difficulty: 'medium',
    tags: ['needs-analysis', 'life-insurance', 'calculation']
  },
  {
    id: 'FC-RISK-025',
    domain: 'RISK',
    category: 'Disability Insurance',
    front: 'What is OWN OCCUPATION vs ANY OCCUPATION disability?',
    back: 'Disability Definitions:\n\nOWN OCCUPATION:\n• Cannot perform your specific job\n• Most favorable to insured\n• Can work elsewhere, still collect\n• Higher premiums\n\nANY OCCUPATION:\n• Cannot perform any job suited to education/experience\n• More restrictive\n• Lower premiums\n\nSome policies: Own-occ for period, then any-occ',
    difficulty: 'medium',
    tags: ['disability', 'own-occupation', 'definition']
  },
  {
    id: 'FC-RISK-026',
    domain: 'RISK',
    category: 'Disability Insurance',
    front: 'What is the ELIMINATION PERIOD?',
    back: 'Elimination Period:\n• Waiting period before benefits begin\n• Like a deductible (time, not $)\n• Common: 30, 60, 90, 180 days\n\nLonger elimination period = Lower premium\n\nConsiderations:\n• Emergency fund/savings\n• Sick leave / PTO\n• Short-term disability coverage\n• Cash flow needs',
    difficulty: 'medium',
    tags: ['elimination-period', 'disability', 'waiting']
  },
  {
    id: 'FC-RISK-027',
    domain: 'RISK',
    category: 'Disability Insurance',
    front: 'What DISABILITY INSURANCE riders are important?',
    back: 'Important DI Riders:\n\n• COLA: Increases benefits with inflation\n• FUTURE PURCHASE: Buy more without medical\n• RESIDUAL/PARTIAL: Proportional benefits\n• OWN-OCCUPATION: Specific job definition\n• NON-CANCELABLE: Guaranteed premiums\n• GUARANTEED RENEWABLE: Must renew\n• RETURN OF PREMIUM: Get premiums back\n\nRiders add cost but value',
    difficulty: 'hard',
    tags: ['disability', 'riders', 'options']
  },
  {
    id: 'FC-RISK-028',
    domain: 'RISK',
    category: 'Disability Insurance',
    front: 'How is DISABILITY INCOME taxed?',
    back: 'Disability Income Taxation:\n\nINDIVIDUAL POLICY (you pay premiums):\n• Benefits are TAX-FREE\n\nEMPLOYER-PAID POLICY:\n• Benefits are TAXABLE as income\n\nMIXED FUNDING:\n• Employee portion: Tax-free\n• Employer portion: Taxable\n\nTip: Consider paying own premiums for tax-free benefits',
    difficulty: 'medium',
    tags: ['disability', 'taxation', 'benefits']
  },
  {
    id: 'FC-RISK-029',
    domain: 'RISK',
    category: 'Long-Term Care',
    front: 'What does LONG-TERM CARE insurance cover?',
    back: 'Long-Term Care Coverage:\n• Assistance with activities of daily living (ADLs)\n• Cognitive impairment (dementia, Alzheimer\'s)\n\nADLs (need 2 of 6):\n• Bathing\n• Dressing\n• Eating\n• Toileting\n• Transferring\n• Continence\n\nSettings:\n• Nursing home\n• Assisted living\n• Home care',
    difficulty: 'medium',
    tags: ['ltc', 'adls', 'coverage']
  },
  {
    id: 'FC-RISK-030',
    domain: 'RISK',
    category: 'Long-Term Care',
    front: 'What LTC POLICY features are important?',
    back: 'Key LTC Policy Features:\n\n• DAILY BENEFIT: $100-$500/day typical\n• BENEFIT PERIOD: 2-5 years or lifetime\n• ELIMINATION PERIOD: 0-90 days\n• INFLATION PROTECTION: 3-5% compound\n• TAX-QUALIFIED: Deductible premiums\n\nPartnership policies: Asset protection option\nHybrid policies: LTC + life/annuity combo',
    difficulty: 'medium',
    tags: ['ltc', 'features', 'policy']
  },
  {
    id: 'FC-RISK-031',
    domain: 'RISK',
    category: 'Long-Term Care',
    front: 'How is LTC INSURANCE taxed?',
    back: 'LTC Insurance Taxation:\n\nTAX-QUALIFIED POLICY:\n• Premiums: Deductible (age-based limits)\n• Benefits: Generally tax-free\n• Must meet ADL/cognitive triggers\n\nNON-QUALIFIED:\n• Premiums: Not deductible\n• Benefits: May be tax-free\n\n2024 Deductible Limits (example):\n• Age 40-50: $1,790\n• Age 60-70: $4,770\n• Over 70: $5,960',
    difficulty: 'hard',
    tags: ['ltc', 'taxation', 'qualified']
  },
  {
    id: 'FC-RISK-032',
    domain: 'RISK',
    category: 'Health Insurance',
    front: 'What is a PPO vs HMO?',
    back: 'PPO (Preferred Provider Organization):\n• Network of providers\n• No referrals needed\n• Out-of-network allowed (higher cost)\n• Higher premiums\n\nHMO (Health Maintenance Organization):\n• Requires primary care physician (PCP)\n• Referrals required for specialists\n• No out-of-network coverage\n• Lower premiums',
    difficulty: 'easy',
    tags: ['ppo', 'hmo', 'health-insurance']
  },
  {
    id: 'FC-RISK-033',
    domain: 'RISK',
    category: 'Health Insurance',
    front: 'What is a HIGH DEDUCTIBLE HEALTH PLAN (HDHP)?',
    back: 'HDHP Requirements (2024):\n• INDIVIDUAL: $1,600+ deductible / $8,050 max OOP\n• FAMILY: $3,200+ deductible / $16,100 max OOP\n\nFeatures:\n• Lower premiums\n• Higher cost-sharing\n• Required for HSA eligibility\n• Preventive care covered pre-deductible\n\nBest for: Healthy individuals, HSA savers',
    difficulty: 'medium',
    tags: ['hdhp', 'hsa', 'deductible']
  },
  {
    id: 'FC-RISK-034',
    domain: 'RISK',
    category: 'Health Insurance',
    front: 'What is the difference between HSA, FSA, and HRA?',
    back: 'Health Spending Accounts:\n\nHSA:\n• Requires HDHP\n• Employee-owned, portable\n• Rolls over indefinitely\n• Triple tax benefit\n\nFSA:\n• Any health plan\n• Employer-owned\n• Use-it-or-lose-it (mostly)\n\nHRA:\n• Employer-funded only\n• Employer-owned\n• May roll over\n• Various designs',
    difficulty: 'medium',
    tags: ['hsa', 'fsa', 'hra']
  },
  {
    id: 'FC-RISK-035',
    domain: 'RISK',
    category: 'Health Insurance',
    front: 'What are COBRA requirements?',
    back: 'COBRA:\n• Consolidated Omnibus Budget Reconciliation Act\n• Continue employer coverage after qualifying event\n\nRequirements:\n• 20+ employees\n• 102% of premium (employer + employee)\n\nDuration:\n• Termination/reduced hours: 18 months\n• Death, divorce, Medicare: 36 months\n• Disability: 29 months\n\nNo new coverage requirement',
    difficulty: 'medium',
    tags: ['cobra', 'continuation', 'health']
  },
  {
    id: 'FC-RISK-036',
    domain: 'RISK',
    category: 'Health Insurance',
    front: 'What are ACA ESSENTIAL HEALTH BENEFITS?',
    back: 'ACA Essential Health Benefits (10):\n1. Ambulatory patient services\n2. Emergency services\n3. Hospitalization\n4. Pregnancy, maternity, newborn\n5. Mental health, substance use\n6. Prescription drugs\n7. Rehabilitative services\n8. Laboratory services\n9. Preventive/wellness\n10. Pediatric services (dental, vision)\n\nNo annual/lifetime dollar limits',
    difficulty: 'medium',
    tags: ['aca', 'essential', 'benefits']
  },
  {
    id: 'FC-RISK-037',
    domain: 'RISK',
    category: 'Property Insurance',
    front: 'What is HOMEOWNERS INSURANCE (HO-3)?',
    back: 'HO-3 (Special Form):\n• Most common homeowners policy\n\nDwelling: Open perils (all risks)\nPersonal Property: Named perils only\n\nCoverage Parts:\n• A: Dwelling\n• B: Other structures (10% of A)\n• C: Personal property (50% of A)\n• D: Loss of use\n• E: Personal liability\n• F: Medical payments',
    difficulty: 'medium',
    tags: ['homeowners', 'ho-3', 'property']
  },
  {
    id: 'FC-RISK-038',
    domain: 'RISK',
    category: 'Property Insurance',
    front: 'What is REPLACEMENT COST vs ACTUAL CASH VALUE?',
    back: 'Property Valuation:\n\nREPLACEMENT COST (RC):\n• Cost to replace with new item\n• No depreciation deducted\n• Higher premiums\n\nACTUAL CASH VALUE (ACV):\n• Replacement cost minus depreciation\n• ACV = RC - Depreciation\n• Lower payouts, lower premiums\n\nRecommendation: Choose RC for dwelling and contents',
    difficulty: 'medium',
    tags: ['replacement-cost', 'acv', 'valuation']
  },
  {
    id: 'FC-RISK-039',
    domain: 'RISK',
    category: 'Property Insurance',
    front: 'What is the 80% COINSURANCE rule?',
    back: 'Coinsurance Clause:\n• Requires coverage of 80%+ of replacement cost\n• Penalty for underinsurance\n\nFormula: Claim Payment = Loss × (Amount Carried / Amount Required)\n\nExample: $300K home, $200K coverage, $50K loss\n• Required: $240K (80%)\n• Payment: $50K × (200K/240K) = $41,667\n\nCarry 80% or more to avoid penalty',
    difficulty: 'hard',
    tags: ['coinsurance', '80-percent', 'penalty']
  },
  {
    id: 'FC-RISK-040',
    domain: 'RISK',
    category: 'Property Insurance',
    front: 'What does UMBRELLA insurance cover?',
    back: 'Umbrella (Excess Liability) Insurance:\n• Extra liability above underlying limits\n• Covers: Home, auto, watercraft, etc.\n• Typically $1M-$10M limits\n• Relatively inexpensive\n\nCovers:\n• Lawsuits, judgments\n• Defense costs\n• Drop-down coverage (some claims)\n\nRequires underlying policies meet minimums\nBest for: High net worth, higher risk exposure',
    difficulty: 'medium',
    tags: ['umbrella', 'liability', 'excess']
  },
  {
    id: 'FC-RISK-041',
    domain: 'RISK',
    category: 'Auto Insurance',
    front: 'What are the parts of AUTO INSURANCE?',
    back: 'Auto Insurance Coverages:\n\n• LIABILITY: Bodily injury (BI) & property damage (PD)\n• MEDICAL PAYMENTS: Your medical bills\n• UNINSURED/UNDERINSURED (UM/UIM): Other driver lacks coverage\n• COLLISION: Damage from impact\n• COMPREHENSIVE (Other Than Collision): Theft, weather, animals\n\nLimits shown as: 100/300/50\n(BI per person/BI per accident/PD)',
    difficulty: 'medium',
    tags: ['auto', 'coverage', 'parts']
  },
  {
    id: 'FC-RISK-042',
    domain: 'RISK',
    category: 'Auto Insurance',
    front: 'What is NO-FAULT auto insurance?',
    back: 'No-Fault Auto Insurance:\n• Your insurer pays your injuries\n• Regardless of who caused accident\n• Personal Injury Protection (PIP)\n• Limits right to sue (threshold)\n\nStates: About 12 require no-fault\n\nAdvantages:\n• Faster claims\n• Lower legal costs\n\nDisadvantages:\n• May limit recovery\n• Potentially higher premiums',
    difficulty: 'medium',
    tags: ['no-fault', 'auto', 'pip']
  },
  {
    id: 'FC-RISK-043',
    domain: 'RISK',
    category: 'Liability',
    front: 'What is PROFESSIONAL LIABILITY insurance?',
    back: 'Professional Liability (E&O):\n• Errors and Omissions coverage\n• Protects against negligence claims\n• Covers advice/service failures\n\nTypes:\n• Medical Malpractice: Healthcare providers\n• Legal Malpractice: Attorneys\n• E&O: Financial advisors, accountants\n• D&O: Directors and officers\n\nClaims-made vs occurrence basis',
    difficulty: 'medium',
    tags: ['professional', 'liability', 'eo']
  },
  {
    id: 'FC-RISK-044',
    domain: 'RISK',
    category: 'Liability',
    front: 'What is CLAIMS-MADE vs OCCURRENCE coverage?',
    back: 'Liability Policy Types:\n\nCLAIMS-MADE:\n• Covers claims made during policy period\n• Must have coverage when claim filed\n• Need tail coverage if policy ends\n• Usually professional liability\n\nOCCURRENCE:\n• Covers events during policy period\n• Claim can be made later\n• No tail needed\n• Usually general liability\n\nOccurrence more secure for insured',
    difficulty: 'hard',
    tags: ['claims-made', 'occurrence', 'liability']
  },
  {
    id: 'FC-RISK-045',
    domain: 'RISK',
    category: 'Business Insurance',
    front: 'What is BUSINESS OWNERS POLICY (BOP)?',
    back: 'Business Owners Policy:\n• Package policy for small businesses\n• Combines property + liability\n• Similar to homeowners for businesses\n\nCovers:\n• Building and contents\n• Business income\n• General liability\n• Crime, equipment breakdown (options)\n\nEligibility: Small to mid-size businesses\nLower cost than separate policies',
    difficulty: 'medium',
    tags: ['bop', 'business', 'package']
  },
  {
    id: 'FC-RISK-046',
    domain: 'RISK',
    category: 'Business Insurance',
    front: 'What is KEY PERSON life insurance?',
    back: 'Key Person Insurance:\n• Business owns policy on key employee\n• Business is beneficiary\n• Compensates for loss of key person\n\nUses:\n• Replace lost profit\n• Recruit/train replacement\n• Pay off debts\n• Reassure creditors\n\nPremiums: Not deductible\nDeath benefit: Tax-free to business',
    difficulty: 'medium',
    tags: ['key-person', 'business', 'life']
  },
  {
    id: 'FC-RISK-047',
    domain: 'RISK',
    category: 'Business Insurance',
    front: 'What is a BUY-SELL agreement?',
    back: 'Buy-Sell Agreement:\n• Provides for business ownership transfer\n• At death, disability, or other trigger\n\nFunded by:\n• Life insurance\n• Disability buyout insurance\n\nTypes:\n• CROSS-PURCHASE: Owners buy each other out\n• ENTITY (STOCK REDEMPTION): Business buys\n• WAIT AND SEE: Decide at trigger\n\nSets valuation formula or method',
    difficulty: 'hard',
    tags: ['buy-sell', 'agreement', 'business']
  },
  {
    id: 'FC-RISK-048',
    domain: 'RISK',
    category: 'Annuities',
    front: 'What are the TYPES of annuities?',
    back: 'Annuity Types:\n\nBY PREMIUM:\n• Single premium\n• Flexible premium\n\nBY PAYOUT START:\n• Immediate: Payments begin within year\n• Deferred: Accumulation period first\n\nBY RETURN:\n• Fixed: Guaranteed rate\n• Variable: Investment-based\n• Indexed: Market index linked\n\nBY PAYOUT:\n• Period certain, life, joint',
    difficulty: 'medium',
    tags: ['annuities', 'types', 'retirement']
  },
  {
    id: 'FC-RISK-049',
    domain: 'RISK',
    category: 'Annuities',
    front: 'How are ANNUITY distributions taxed?',
    back: 'Annuity Taxation:\n\nACCUMULATION:\n• Tax-deferred growth\n• No annual limit (nonqualified)\n\nWITHDRAWALS (Nonqualified):\n• LIFO: Earnings first = taxable\n• Principal return = tax-free\n• 10% penalty before 59½\n\nANNUITIZATION:\n• Exclusion ratio applies\n• Part return of principal\n\n1035 exchange for tax-free transfer',
    difficulty: 'hard',
    tags: ['annuity', 'taxation', 'lifo']
  },
  {
    id: 'FC-RISK-050',
    domain: 'RISK',
    category: 'Annuities',
    front: 'What is the EXCLUSION RATIO for annuities?',
    back: 'Exclusion Ratio:\n• Portion of annuity payment that\'s tax-free\n• Return of investment (basis)\n\nFormula:\nExclusion Ratio = Investment / Expected Return\n\nExpected Return = Annual Payout × Life Expectancy\n\nAfter basis recovered:\n• All payments fully taxable\n• Fixed period/life affects calculation',
    difficulty: 'hard',
    tags: ['exclusion-ratio', 'annuity', 'taxation']
  },
  {
    id: 'FC-RISK-051',
    domain: 'RISK',
    category: 'Medicare',
    front: 'What are the PARTS of Medicare?',
    back: 'Medicare Parts:\n\nPART A (Hospital):\n• Inpatient hospital, SNF, hospice\n• Premium-free for most (40 quarters)\n\nPART B (Medical):\n• Outpatient, doctors, preventive\n• Standard premium: ~$174.70/month\n\nPART C (Medicare Advantage):\n• Private plan alternative\n• Combines A, B, often D\n\nPART D (Prescription Drugs):\n• Offered by private plans\n• Separate premium',
    difficulty: 'medium',
    tags: ['medicare', 'parts', 'coverage']
  },
  {
    id: 'FC-RISK-052',
    domain: 'RISK',
    category: 'Medicare',
    front: 'What is MEDIGAP (Medicare Supplement)?',
    back: 'Medigap (Medicare Supplement):\n• Private insurance to cover Medicare gaps\n• Standardized plans (A, B, C, D, F, G, K, L, M, N)\n• Covers deductibles, copays, coinsurance\n\nRules:\n• Must have Part A and B\n• Cannot use with Medicare Advantage\n• Guaranteed issue during open enrollment\n• No pre-existing condition exclusions (OEP)\n\nPlan G most popular (F closed to new enrollees)',
    difficulty: 'medium',
    tags: ['medigap', 'supplement', 'medicare']
  },
  {
    id: 'FC-RISK-053',
    domain: 'RISK',
    category: 'Medicare',
    front: 'What is IRMAA for Medicare?',
    back: 'IRMAA (Income-Related Monthly Adjustment Amount):\n• Higher Part B and D premiums for high earners\n• Based on MAGI from 2 years prior\n\n2024 Thresholds (single):\n• $103,000+: Surcharge begins\n• $500,000+: Maximum surcharge\n\nPlanning:\n• Roth conversions can increase IRMAA\n• IRMAA appeals for life-changing events\n• Manage income 2 years before Medicare',
    difficulty: 'hard',
    tags: ['irmaa', 'medicare', 'premium']
  },
  {
    id: 'FC-RISK-054',
    domain: 'RISK',
    category: 'Social Security',
    front: 'What are SOCIAL SECURITY disability benefits?',
    back: 'SSDI (Social Security Disability Insurance):\n• Based on work credits (usually 40)\n• Strict disability definition\n• 5-month waiting period\n• Amount based on earnings history\n\nSSI (Supplemental Security Income):\n• Need-based, not work-based\n• Disabled, blind, or 65+\n• Limited income and resources\n• Flat benefit rate',
    difficulty: 'medium',
    tags: ['ssdi', 'ssi', 'disability']
  },
  {
    id: 'FC-RISK-055',
    domain: 'RISK',
    category: 'Risk Assessment',
    front: 'What is a PERSONAL RISK MANAGEMENT process?',
    back: 'Personal Risk Management Steps:\n\n1. IDENTIFY: List potential risks\n   • Life, health, property, liability\n\n2. EVALUATE: Assess frequency and severity\n\n3. SELECT TECHNIQUE:\n   • Avoid, reduce, retain, transfer\n\n4. IMPLEMENT: Purchase coverage, take actions\n\n5. MONITOR: Review periodically, adjust\n\nPrioritize high severity risks',
    difficulty: 'medium',
    tags: ['risk-management', 'process', 'personal']
  },
  {
    id: 'FC-RISK-056',
    domain: 'RISK',
    category: 'Policy Provisions',
    front: 'What is a GRACE PERIOD?',
    back: 'Grace Period:\n• Time to pay premium after due date\n• Coverage continues during grace period\n• Prevents immediate lapse\n\nTypical Periods:\n• Life insurance: 30-31 days\n• Health insurance: 10-31 days\n• Auto/Property: Varies by state\n\nPayment during grace period:\n• Reinstates without underwriting\n• May charge interest',
    difficulty: 'easy',
    tags: ['grace-period', 'premium', 'provision']
  },
  {
    id: 'FC-RISK-057',
    domain: 'RISK',
    category: 'Policy Provisions',
    front: 'What is the INCONTESTABILITY clause?',
    back: 'Incontestability Clause:\n• Limits insurer\'s ability to void policy\n• After 2 years (typically)\n• Cannot contest for misrepresentation\n\nExceptions:\n• Fraud may still void\n• Non-payment of premiums\n• Material misrepresentation (first 2 years)\n\nProtects policyholder and beneficiaries\nProvides certainty of coverage',
    difficulty: 'medium',
    tags: ['incontestability', 'provision', 'life']
  },
  {
    id: 'FC-RISK-058',
    domain: 'RISK',
    category: 'Policy Provisions',
    front: 'What are common LIFE INSURANCE policy riders?',
    back: 'Life Insurance Riders:\n\n• WAIVER OF PREMIUM: Waive if disabled\n• ACCELERATED DEATH BENEFIT: Terminal illness\n• ACCIDENTAL DEATH: Extra benefit (AD&D)\n• GUARANTEED INSURABILITY: Future purchase\n• CHILD TERM: Cover children\n• LONG-TERM CARE: Access for LTC needs\n• RETURN OF PREMIUM: Get premiums back\n\nRiders add cost but flexibility',
    difficulty: 'medium',
    tags: ['riders', 'life-insurance', 'options']
  },
  {
    id: 'FC-RISK-059',
    domain: 'RISK',
    category: 'Workers Compensation',
    front: 'What does WORKERS COMPENSATION cover?',
    back: 'Workers Compensation:\n• State-mandated employer coverage\n• Work-related injuries and illnesses\n\nBenefits:\n• Medical expenses\n• Disability income (partial wage replacement)\n• Death benefits\n• Rehabilitation\n\nNo-fault system:\n• Employee gives up right to sue\n• Receives benefits regardless of fault\n\nEmployer pays 100% of premium',
    difficulty: 'medium',
    tags: ['workers-comp', 'employer', 'benefits']
  },
  {
    id: 'FC-RISK-060',
    domain: 'RISK',
    category: 'Title Insurance',
    front: 'What does TITLE INSURANCE protect against?',
    back: 'Title Insurance:\n• Protects against defects in property title\n• One-time premium at closing\n\nCovers:\n• Forgery\n• Undisclosed heirs\n• Recording errors\n• Liens and encumbrances\n• Boundary disputes\n\nTypes:\n• OWNER\'S POLICY: Protects buyer\n• LENDER\'S POLICY: Required by lender\n\nLasts as long as you own property',
    difficulty: 'medium',
    tags: ['title', 'property', 'insurance']
  },
  {
    id: 'FC-RISK-061',
    domain: 'RISK',
    category: 'Flood Insurance',
    front: 'What is FLOOD INSURANCE?',
    back: 'Flood Insurance:\n• NOT covered by homeowners (HO-3)\n• NFIP: National Flood Insurance Program\n• Private flood policies also available\n\nNFIP Limits:\n• Dwelling: $250,000\n• Contents: $100,000\n\nRequirements:\n• Community must participate\n• Required in flood zones with federally-backed mortgages\n• 30-day waiting period',
    difficulty: 'medium',
    tags: ['flood', 'nfip', 'insurance']
  },
  {
    id: 'FC-RISK-062',
    domain: 'RISK',
    category: 'Earthquake Insurance',
    front: 'What is EARTHQUAKE INSURANCE?',
    back: 'Earthquake Insurance:\n• NOT covered by standard homeowners\n• Separate policy or endorsement\n• High deductibles (10-20% of coverage)\n\nCovers:\n• Dwelling damage\n• Personal property\n• Additional living expenses\n\nMost important in:\n• California\n• Pacific Northwest\n• New Madrid fault zone\n\nPremium based on construction, location',
    difficulty: 'medium',
    tags: ['earthquake', 'property', 'insurance']
  },
  {
    id: 'FC-RISK-063',
    domain: 'RISK',
    category: 'Renters Insurance',
    front: 'What does RENTERS INSURANCE cover?',
    back: 'Renters Insurance (HO-4):\n• Personal property protection\n• Liability coverage\n• Additional living expenses\n\nDoes NOT cover:\n• Building structure (landlord\'s policy)\n• Roommate\'s belongings\n\nRelatively inexpensive: $15-30/month\nCovers belongings anywhere (travel, car)\nOften required by landlords',
    difficulty: 'easy',
    tags: ['renters', 'ho-4', 'insurance']
  },
  {
    id: 'FC-RISK-064',
    domain: 'RISK',
    category: 'Life Insurance',
    front: 'What is VIATICAL vs LIFE SETTLEMENT?',
    back: 'Life Policy Settlements:\n\nVIATICAL SETTLEMENT:\n• Terminally ill (2 years or less)\n• Sell policy for % of death benefit\n• Proceeds generally tax-free\n• Original purpose of accelerated benefits\n\nLIFE SETTLEMENT:\n• Not terminally ill (usually 65+)\n• Sell unwanted policy\n• Proceeds may be taxable\n• Buyer becomes beneficiary',
    difficulty: 'hard',
    tags: ['viatical', 'settlement', 'life']
  },
  {
    id: 'FC-RISK-065',
    domain: 'RISK',
    category: 'Business Insurance',
    front: 'What is BUSINESS INCOME insurance?',
    back: 'Business Income (Business Interruption):\n• Replaces lost income during covered loss\n• Covers: Net income + continuing expenses\n\nCovers:\n• Loss of revenue\n• Payroll continuation\n• Loan payments\n• Rent\n• Relocation costs\n\nWaiting period: Usually 72 hours\nCoinsurance typically applies',
    difficulty: 'medium',
    tags: ['business-income', 'interruption', 'insurance']
  },
  {
    id: 'FC-RISK-066',
    domain: 'RISK',
    category: 'Liability',
    front: 'What is NEGLIGENCE?',
    back: 'Negligence Elements (4):\n\n1. DUTY: Owed to injured party\n2. BREACH: Failed to meet standard of care\n3. PROXIMATE CAUSE: Breach caused injury\n4. DAMAGES: Actual harm occurred\n\nMust prove all four elements\n\nDefenses:\n• Comparative/contributory negligence\n• Assumption of risk\n• Statute of limitations',
    difficulty: 'medium',
    tags: ['negligence', 'liability', 'elements']
  },
  {
    id: 'FC-RISK-067',
    domain: 'RISK',
    category: 'Liability',
    front: 'What is COMPARATIVE vs CONTRIBUTORY negligence?',
    back: 'Negligence Doctrines:\n\nCONTRIBUTORY:\n• Any fault by plaintiff bars recovery\n• Very harsh rule\n• Few states use\n\nCOMPARATIVE:\n• Damages reduced by plaintiff\'s fault\n\nPURE COMPARATIVE:\n• Recover even if mostly at fault\n\nMODIFIED COMPARATIVE:\n• Cannot recover if 50%+ at fault',
    difficulty: 'hard',
    tags: ['comparative', 'contributory', 'negligence']
  },
  {
    id: 'FC-RISK-068',
    domain: 'RISK',
    category: 'Insurance Selection',
    front: 'What factors for selecting INSURANCE COMPANY?',
    back: 'Insurance Company Selection:\n\nFINANCIAL STRENGTH:\n• AM Best, S&P, Moody\'s ratings\n• A or better preferred\n\nSERVICE:\n• Claims process\n• Customer reviews\n• Agent accessibility\n\nPRICE:\n• Compare quotes\n• Discounts available\n\nCOVERAGE:\n• Policy terms and conditions\n• Exclusions\n• Riders available',
    difficulty: 'medium',
    tags: ['selection', 'company', 'ratings']
  },
  {
    id: 'FC-RISK-069',
    domain: 'RISK',
    category: 'Insurance Selection',
    front: 'What is GUARANTEED RENEWABILITY?',
    back: 'Renewability Options:\n\nGUARANTEED RENEWABLE:\n• Must renew policy\n• Cannot cancel (except non-payment)\n• CAN raise premiums (class basis)\n\nNON-CANCELABLE:\n• Must renew\n• CANNOT raise premiums\n• Best for disability\n\nCONDITIONALLY RENEWABLE:\n• Can decline renewal for specific reasons\n\nOptionally Renewable: Insurer chooses',
    difficulty: 'medium',
    tags: ['renewable', 'cancelable', 'policy']
  },
  {
    id: 'FC-RISK-070',
    domain: 'RISK',
    category: 'Policy Provisions',
    front: 'What is a BENEFICIARY DESIGNATION best practice?',
    back: 'Beneficiary Best Practices:\n\n• Name PRIMARY and CONTINGENT\n• Be specific (name, DOB, SSN)\n• Avoid "estate" as beneficiary\n• Review regularly (divorce, death)\n• Consider per stirpes vs per capita\n• Coordinate with estate plan\n• Minor beneficiaries need guardian/trust\n• Irrevocable requires consent to change',
    difficulty: 'medium',
    tags: ['beneficiary', 'designation', 'estate']
  },
];

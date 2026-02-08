/**
 * CPA Flashcards - TCP Section (Tax Compliance and Planning)
 * World-Class Sprint Expansion
 * 
 * Covers: Individual Tax, Business Tax, Entity Taxation, Tax Planning
 */

import { Flashcard } from './types';

export const TCP_FLASHCARDS: Flashcard[] = [
  // ==========================================
  // INDIVIDUAL TAXATION - INCOME
  // ==========================================
  {
    id: 'tcp-fc-001',
    section: 'TCP',
    type: 'definition',
    topic: 'Individual Tax',
    blueprintArea: 'TCP-I',
    front: 'What is GROSS INCOME per IRC §61?',
    back: `Gross Income = All income from whatever source derived, including:
• Compensation (wages, salaries, bonuses)
• Business income
• Interest and dividends
• Rental and royalty income
• Gains from property sales
• Alimony (pre-2019)
• Gambling winnings
• Bartering income
• Discharge of debt (with exceptions)`,
    example: 'Salary $100K + Interest $2K + Rental $15K = $117K Gross Income',
    difficulty: 'easy',
    tags: ['gross income', 'IRC 61'],
    reference: 'IRC §61',
  },
  {
    id: 'tcp-fc-002',
    section: 'TCP',
    type: 'mnemonic',
    topic: 'Individual Tax',
    blueprintArea: 'TCP-I',
    front: 'What mnemonic helps remember the order of the tax formula?',
    back: `**GAAD-TTC** (Glad To Take Credits)

G = Gross Income
A = Adjustments (above-the-line)
A = AGI
D = Deductions (itemized or standard)
T = Taxable Income  
T = Tax (apply rates)
C = Credits (reduce tax)
= Tax Liability`,
    mnemonic: 'GAAD-TTC',
    difficulty: 'easy',
    tags: ['tax formula', 'calculation order'],
    reference: 'Form 1040',
  },
  {
    id: 'tcp-fc-003',
    section: 'TCP',
    type: 'formula',
    topic: 'Individual Tax',
    blueprintArea: 'TCP-I',
    front: 'What is the formula for calculating self-employment tax?',
    back: `Self-Employment Tax = Net SE Income × 15.3% (up to Social Security wage base)

Calculation:
1. Net SE Income × 92.35%
2. Result × 15.3% (12.4% SS + 2.9% Medicare)
3. Medicare: additional 0.9% on income over $200K/$250K
4. Above-the-line deduction = 50% of SE Tax`,
    formula: 'SE Tax = (Net SE × 0.9235) × 0.153',
    example: '$100K SE income: $100K × 0.9235 × 0.153 = $14,130 SE Tax',
    difficulty: 'medium',
    tags: ['self-employment', 'FICA', 'SE tax'],
    reference: 'IRC §1401',
  },
  {
    id: 'tcp-fc-004',
    section: 'TCP',
    type: 'rule',
    topic: 'Individual Tax',
    blueprintArea: 'TCP-I',
    front: 'What are the FILING STATUS rules for Head of Household?',
    back: `**Head of Household Requirements:**
1. Unmarried (or considered unmarried) on Dec 31
2. Pay >50% of household costs
3. Qualifying person lived with you >½ year
   
**Qualifying Persons:**
• Child (qualifying child rules)
• Parent (can live separately if you pay >50% of their home)
• Other qualifying relative (must live with you)

Considered unmarried: Didn't live with spouse last 6 months`,
    difficulty: 'medium',
    tags: ['filing status', 'HOH'],
    reference: 'IRC §2(b)',
  },
  {
    id: 'tcp-fc-005',
    section: 'TCP',
    type: 'comparison',
    topic: 'Individual Tax',
    blueprintArea: 'TCP-I',
    front: 'What is the difference between STANDARD DEDUCTION and ITEMIZED DEDUCTIONS?',
    back: `**Standard Deduction (2024):**
• Single: $14,600
• MFJ: $29,200  
• HOH: $21,900
• Add $1,550 (65+/blind, MFJ) or $1,950 (single/HOH)

**Itemized Deductions (Schedule A):**
• Medical >7.5% of AGI
• SALT up to $10,000
• Mortgage interest (up to $750K debt)
• Charitable contributions
• Casualty losses (only federally declared disasters)`,
    comparison: {
      itemA: 'Standard Deduction',
      itemB: 'Itemized Deductions',
      differences: ['No documentation vs. receipts required', 'Fixed amount vs. variable', 'Simpler vs. more complex']
    },
    difficulty: 'easy',
    tags: ['deductions', 'standard', 'itemized'],
    reference: 'IRC §63',
  },
  // ==========================================
  // INDIVIDUAL TAXATION - CREDITS
  // ==========================================
  {
    id: 'tcp-fc-006',
    section: 'TCP',
    type: 'definition',
    topic: 'Tax Credits',
    blueprintArea: 'TCP-I',
    front: 'What is the CHILD TAX CREDIT (CTC)?',
    back: `**Child Tax Credit:**
• $2,000 per qualifying child under 17
• Refundable up to $1,700 (2024)
• Phase-out: $400K MFJ, $200K others
• Reduces $50 per $1,000 over threshold

**Qualifying Child:**
• Under 17 at year-end
• U.S. citizen, national, or resident
• Claimed as dependent
• SSN required`,
    difficulty: 'medium',
    tags: ['credits', 'child tax credit', 'CTC'],
    reference: 'IRC §24',
  },
  {
    id: 'tcp-fc-007',
    section: 'TCP',
    type: 'formula',
    topic: 'Tax Credits',
    blueprintArea: 'TCP-I',
    front: 'How do you calculate the EARNED INCOME TAX CREDIT (EITC)?',
    back: `**EITC Calculation:**
1. Credit percentage × earned income (up to earned income amount)
2. Phase-out: reduces credit at phase-out rate × (AGI - threshold)

**2024 Maximum Credits:**
• 3+ children: $7,830
• 2 children: $6,960
• 1 child: $4,213
• No children: $632

Investment income limit: $11,600 (2024)`,
    formula: 'EITC = (Credit % × Earned Income) - (Phaseout % × (AGI - Threshold))',
    difficulty: 'hard',
    tags: ['EITC', 'refundable credit', 'low income'],
    reference: 'IRC §32',
  },
  {
    id: 'tcp-fc-008',
    section: 'TCP',
    type: 'comparison',
    topic: 'Tax Credits',
    blueprintArea: 'TCP-I',
    front: 'Compare AMERICAN OPPORTUNITY CREDIT vs. LIFETIME LEARNING CREDIT',
    back: `**American Opportunity (AOTC):**
• Max: $2,500/student/year
• First 4 years of post-secondary only
• 40% refundable ($1,000)
• Requires ½ time enrollment
• Only tuition, fees, course materials

**Lifetime Learning (LLC):**
• Max: $2,000/return (not per student)
• Any post-secondary, unlimited years
• Non-refundable
• No enrollment minimum
• Any courses to improve job skills`,
    comparison: {
      itemA: 'AOTC',
      itemB: 'LLC',
      differences: ['Per student vs per return', '4 years vs unlimited', 'Partially refundable vs non-refundable']
    },
    difficulty: 'medium',
    tags: ['education credits', 'AOTC', 'LLC'],
    reference: 'IRC §25A',
  },
  // ==========================================
  // PROPERTY TRANSACTIONS
  // ==========================================
  {
    id: 'tcp-fc-009',
    section: 'TCP',
    type: 'formula',
    topic: 'Property Transactions',
    blueprintArea: 'TCP-II',
    front: 'What is the formula for calculating GAIN or LOSS on property sale?',
    back: `**Gain/Loss Formula:**
Amount Realized
- Adjusted Basis
= Gain (or Loss)

**Amount Realized:**
Cash + FMV of property received + Liabilities assumed by buyer - Selling expenses

**Adjusted Basis:**
Original cost + Improvements - Depreciation`,
    formula: 'Gain/Loss = Amount Realized - Adjusted Basis',
    example: 'Sell for $150K, basis $80K, selling costs $10K: ($150K - $10K) - $80K = $60K gain',
    difficulty: 'easy',
    tags: ['basis', 'gain', 'loss', 'property'],
    reference: 'IRC §1001',
  },
  {
    id: 'tcp-fc-010',
    section: 'TCP',
    type: 'definition',
    topic: 'Property Transactions',
    blueprintArea: 'TCP-II',
    front: 'What is the BASIS of GIFTED property?',
    back: `**Gifted Property Basis (Dual Basis Rule):**

**If FMV > Donor basis at gift:**
• Donee basis = Donor's carryover basis + gift tax paid on appreciation

**If FMV < Donor basis at gift (built-in loss):**
• For GAIN: Use donor's basis
• For LOSS: Use FMV at gift date
• If sale price between: No gain or loss

Gift tax adjustment = Gift Tax × (FMV - Basis) / (FMV - Annual Exclusion)`,
    example: 'Donor basis $10K, FMV $6K at gift. Donee sells for $8K = No gain/loss (between $6K and $10K)',
    difficulty: 'hard',
    tags: ['gift', 'basis', 'carryover'],
    reference: 'IRC §1015',
  },
  {
    id: 'tcp-fc-011',
    section: 'TCP',
    type: 'definition',
    topic: 'Property Transactions',
    blueprintArea: 'TCP-II',
    front: 'What is the BASIS of INHERITED property?',
    back: `**Inherited Property - Stepped-Up (or Down) Basis:**
• Basis = FMV at date of death (or alternate valuation date)
• Holding period = automatically LONG-TERM
• Eliminates built-in gains during decedent's lifetime

**Alternate Valuation Date:**
• 6 months after death
• Must reduce estate value AND estate tax
• All assets must use same date

**Exception:** IRD (Income in Respect of Decedent) does NOT get step-up`,
    example: 'Decedent bought stock for $10K, worth $100K at death. Heir basis = $100K (no gain on $90K appreciation)',
    difficulty: 'medium',
    tags: ['inheritance', 'stepped-up basis', 'death'],
    reference: 'IRC §1014',
  },
  {
    id: 'tcp-fc-012',
    section: 'TCP',
    type: 'rule',
    topic: 'Property Transactions',
    blueprintArea: 'TCP-II',
    front: 'What is the SECTION 121 home sale exclusion?',
    back: `**§121 Exclusion - Sale of Principal Residence:**
• Exclude up to $250,000 gain ($500,000 MFJ)
• Ownership: Owned 2 of last 5 years
• Use: Used as principal residence 2 of last 5 years
• Not used in prior 2 years

**Partial Exclusion:** 
Pro-rata if <2 years due to:
• Health, employment, unforeseen circumstances

**Gain > Exclusion:**
Taxed as LTCG (if owned >1 year)`,
    difficulty: 'medium',
    tags: ['home sale', 'exclusion', 'principal residence'],
    reference: 'IRC §121',
  },
  {
    id: 'tcp-fc-013',
    section: 'TCP',
    type: 'rule',
    topic: 'Property Transactions',
    blueprintArea: 'TCP-II',
    front: 'What is a LIKE-KIND EXCHANGE (§1031)?',
    back: `**§1031 Like-Kind Exchange Requirements:**
• Real property only (post-TCJA)
• Held for business or investment
• Exchange for like-kind (real for real)
• 45-day identification period
• 180-day completion deadline

**Boot:** Cash or unlike property received = taxable

**Basis of New Property:**
Old basis + Boot paid + Gain recognized - Boot received`,
    example: 'Exchange $500K building (basis $300K) for $550K building + $50K cash. Gain recognized = $50K (boot)',
    difficulty: 'hard',
    tags: ['1031', 'like-kind', 'deferral'],
    reference: 'IRC §1031',
  },
  // ==========================================
  // ENTITY TAXATION
  // ==========================================
  {
    id: 'tcp-fc-014',
    section: 'TCP',
    type: 'comparison',
    topic: 'Entity Taxation',
    blueprintArea: 'TCP-III',
    front: 'Compare C CORPORATION vs. S CORPORATION taxation',
    back: `**C Corporation (IRC Subchapter C):**
• Separate taxable entity
• Corporate tax rate: 21% flat
• Double taxation (corp + dividends)
• Unlimited shareholders
• Multiple classes of stock OK
• Form 1120

**S Corporation (IRC Subchapter S):**
• Pass-through entity
• No entity-level tax (generally)
• Single taxation to shareholders
• Max 100 shareholders
• One class of stock only
• Form 1120-S, K-1s`,
    comparison: {
      itemA: 'C Corp',
      itemB: 'S Corp',
      differences: ['Double taxation vs single', 'Unlimited vs 100 shareholders', 'Multiple vs one stock class']
    },
    difficulty: 'easy',
    tags: ['corporation', 'S corp', 'C corp', 'entity'],
    reference: 'IRC §11, §1361',
  },
  {
    id: 'tcp-fc-015',
    section: 'TCP',
    type: 'rule',
    topic: 'Entity Taxation',
    blueprintArea: 'TCP-III',
    front: 'What are the S CORPORATION eligibility requirements?',
    back: `**S Corporation Requirements (§1361):**
1. Domestic corporation
2. Only eligible shareholders:
   • Individuals
   • Estates
   • Certain trusts
   • Tax-exempt organizations (limited)
3. Max 100 shareholders (family = 1)
4. One class of stock (voting differences OK)
5. No nonresident alien shareholders
6. Not ineligible corporation (bank, insurance, etc.)

**Election:** Form 2553, by March 15 for calendar year`,
    difficulty: 'medium',
    tags: ['S corp', 'eligibility', 'election'],
    reference: 'IRC §1361',
  },
  {
    id: 'tcp-fc-016',
    section: 'TCP',
    type: 'formula',
    topic: 'Entity Taxation',
    blueprintArea: 'TCP-III',
    front: 'How do you calculate PARTNERSHIP BASIS?',
    back: `**Partner's Outside Basis:**
Initial: Cash + Property basis contributed + Share of liabilities

**Increases:**
+ Capital contributions
+ Share of income (including tax-exempt)
+ Share of partnership liabilities

**Decreases:**
- Distributions received
- Share of losses (not below zero)
- Share of nondeductible expenses

Basis cannot go below zero.`,
    formula: 'Partner Basis = Initial + Income + Contributions - Distributions - Losses',
    example: 'Initial $50K + $30K income - $10K distribution = $70K basis',
    difficulty: 'medium',
    tags: ['partnership', 'basis', 'outside basis'],
    reference: 'IRC §705',
  },
  {
    id: 'tcp-fc-017',
    section: 'TCP',
    type: 'definition',
    topic: 'Entity Taxation',
    blueprintArea: 'TCP-III',
    front: 'What is the QUALIFIED BUSINESS INCOME (QBI) deduction?',
    back: `**§199A QBI Deduction:**
• 20% deduction on qualified business income
• Pass-through entities and sole proprietors
• Cannot exceed: Lesser of (a) 20% QBI, or (b) 20% taxable income (minus net capital gains)

**Limitations (above thresholds):**
• W-2 wage limit: 50% of W-2 wages OR 25% W-2 + 2.5% qualified property
• SSTB phase-out (specified service businesses)

**Thresholds (2024):** $191,950 Single, $383,900 MFJ`,
    difficulty: 'hard',
    tags: ['QBI', '199A', 'pass-through', 'deduction'],
    reference: 'IRC §199A',
  },
  // ==========================================
  // TAX PLANNING STRATEGIES
  // ==========================================
  {
    id: 'tcp-fc-018',
    section: 'TCP',
    type: 'concept',
    topic: 'Tax Planning',
    blueprintArea: 'TCP-IV',
    front: 'What is TAX DEFERRAL vs. TAX AVOIDANCE vs. TAX EVASION?',
    back: `**Tax Deferral (Legal):**
• Delay recognition of income
• Examples: 1031 exchange, installment sales, retirement contributions
• Still owe tax, but later

**Tax Avoidance (Legal):**
• Reduce taxes through legal means
• Examples: Maximize deductions, use credits, entity selection
• Good tax planning

**Tax Evasion (ILLEGAL):**
• Willfully evading taxes owed
• Examples: Hiding income, false deductions, offshore schemes
• Criminal penalties: fines, imprisonment`,
    difficulty: 'easy',
    tags: ['tax planning', 'deferral', 'evasion'],
    reference: 'General Tax Principles',
  },
  {
    id: 'tcp-fc-019',
    section: 'TCP',
    type: 'concept',
    topic: 'Tax Planning',
    blueprintArea: 'TCP-IV',
    front: 'What is the TIME VALUE OF MONEY in tax planning?',
    back: `**Time Value of Money (TVM):**
A dollar today is worth more than a dollar tomorrow.

**Tax Applications:**
• Defer income = invest the tax savings now
• Accelerate deductions = get tax benefit sooner
• Qualified plan contributions = deduct now, tax later at potentially lower rate

**Calculation:** PV = FV / (1 + r)^n

**Strategy:** Defer income if future rate expected to be lower; accelerate if higher`,
    difficulty: 'medium',
    tags: ['TVM', 'deferral', 'planning'],
    reference: 'Tax Planning Principles',
  },
  {
    id: 'tcp-fc-020',
    section: 'TCP',
    type: 'definition',
    topic: 'Retirement',
    blueprintArea: 'TCP-IV',
    front: 'Compare TRADITIONAL IRA vs. ROTH IRA',
    back: `**Traditional IRA:**
• Contributions may be deductible
• Grows tax-deferred
• Distributions taxed as ordinary income
• RMDs at age 73
• Income limits if covered by employer plan

**Roth IRA:**
• Contributions never deductible
• Grows tax-free
• Qualified distributions = TAX-FREE
• No RMDs during owner's lifetime
• Income limits for contribution eligibility

**2024 Contribution limit:** $7,000 ($8,000 if 50+)`,
    comparison: {
      itemA: 'Traditional IRA',
      itemB: 'Roth IRA',
      differences: ['Tax now vs tax later', 'RMDs required vs not required', 'Deductible vs non-deductible']
    },
    difficulty: 'easy',
    tags: ['IRA', 'Roth', 'retirement'],
    reference: 'IRC §408, §408A',
  },
  // ==========================================
  // ADDITIONAL TCP FLASHCARDS
  // ==========================================
  {
    id: 'tcp-fc-021',
    section: 'TCP',
    type: 'rule',
    topic: 'Individual Tax',
    blueprintArea: 'TCP-I',
    front: 'What are the CAPITAL GAINS tax rates?',
    back: `**Long-Term Capital Gains (held >1 year):**
• 0%: Up to $47,025 (Single) / $94,050 (MFJ)
• 15%: Up to $518,900 (Single) / $583,750 (MFJ)
• 20%: Above those thresholds

**Net Investment Income Tax (NIIT):**
+3.8% on investment income if MAGI > $200K (Single) / $250K (MFJ)

**Short-Term Capital Gains (≤1 year):**
Taxed as ordinary income

**Collectibles/§1202 Stock:** 28% max
**Unrecaptured §1250:** 25% max`,
    difficulty: 'medium',
    tags: ['capital gains', 'tax rates', 'LTCG', 'STCG'],
    reference: 'IRC §1(h)',
  },
  {
    id: 'tcp-fc-022',
    section: 'TCP',
    type: 'rule',
    topic: 'Property Transactions',
    blueprintArea: 'TCP-II',
    front: 'What is SECTION 1245 depreciation recapture?',
    back: `**§1245 Recapture - Personal Property:**
• Gain on sale of depreciable personal property
• Recapture as ORDINARY INCOME to extent of depreciation taken
• Any remaining gain = §1231 gain (LTCG)

**Formula:**
Ordinary Income = Lesser of:
(1) Gain recognized, OR
(2) Accumulated depreciation

Applies to: Equipment, machinery, furniture, vehicles`,
    example: 'Equipment: Cost $50K, Depreciation $30K, Sell for $40K. Gain = $20K, all ordinary (≤ $30K depr)',
    difficulty: 'hard',
    tags: ['1245', 'recapture', 'depreciation'],
    reference: 'IRC §1245',
  },
  {
    id: 'tcp-fc-023',
    section: 'TCP',
    type: 'rule',
    topic: 'Property Transactions',
    blueprintArea: 'TCP-II',
    front: 'What is SECTION 1250 depreciation recapture?',
    back: `**§1250 Recapture - Real Property:**
• Gain on sale of depreciable real property
• Recapture EXCESS depreciation as ordinary income
• "Unrecaptured §1250 gain" = straight-line depr. (25% max rate)
• Remaining gain = LTCG (0/15/20%)

**Post-1986 Real Property:**
Only straight-line allowed, so:
• No ordinary income recapture
• "Unrecaptured" portion taxed at 25%`,
    example: 'Building: Cost $500K, SL depr $100K, sell for $600K. Gain $200K: $100K at 25%, $100K at 15/20%',
    difficulty: 'hard',
    tags: ['1250', 'real property', 'recapture'],
    reference: 'IRC §1250',
  },
  {
    id: 'tcp-fc-024',
    section: 'TCP',
    type: 'definition',
    topic: 'Entity Taxation',
    blueprintArea: 'TCP-III',
    front: 'What is ACCUMULATED EARNINGS TAX (AET)?',
    back: `**Accumulated Earnings Tax (AET):**
• 20% penalty tax on C corps
• Applies when earnings retained beyond reasonable business needs
• Avoids dividend tax to shareholders

**Exemption:**
• $250,000 accumulation allowed ($150K for PSCs)
• Above that: must demonstrate business purpose

**Defenses:**
• Expansion plans
• Debt repayment
• Working capital needs
• Acquisition of another business`,
    difficulty: 'hard',
    tags: ['AET', 'C corp', 'retained earnings'],
    reference: 'IRC §531-537',
  },
  {
    id: 'tcp-fc-025',
    section: 'TCP',
    type: 'formula',
    topic: 'Entity Taxation',
    blueprintArea: 'TCP-III',
    front: 'How do you calculate S CORP shareholder stock basis?',
    back: `**S Corp Stock Basis Calculation:**

**Increases:**
+ Capital contributions
+ Separately stated income items
+ Nonseparately computed income
+ Excess depletion over basis

**Decreases (in order):**
1. Distributions (not below zero)
2. Nondeductible, noncapital expenses
3. Deduction/loss items
4. Depletion deduction for oil/gas

**Debt Basis:** Increase by direct shareholder loans to S corp`,
    formula: 'Stock Basis = Initial + Income - Distributions - Losses',
    difficulty: 'medium',
    tags: ['S corp', 'basis', 'stock basis'],
    reference: 'IRC §1367',
  },
  {
    id: 'tcp-fc-026',
    section: 'TCP',
    type: 'mnemonic',
    topic: 'Individual Tax',
    blueprintArea: 'TCP-I',
    front: 'What mnemonic helps remember EXCLUSIONS from gross income?',
    back: `**DIMEC-GL** (Dime See GL)

D = Death benefits (life insurance)
I = Inheritance/gifts received
M = Municipal bond interest
E = Employer health insurance premiums
C = Child support received

G = Gain on home sale (up to exclusion)
L = Life insurance cash value buildup

Also excluded: Workers' comp, qualified scholarships (tuition portion), Roth IRA distributions`,
    mnemonic: 'DIMEC-GL',
    difficulty: 'easy',
    tags: ['exclusions', 'gross income'],
    reference: 'IRC §101-139',
  },
  {
    id: 'tcp-fc-027',
    section: 'TCP',
    type: 'rule',
    topic: 'Tax Planning',
    blueprintArea: 'TCP-IV',
    front: 'What are the ESTIMATED TAX payment rules?',
    back: `**Required Quarterly Payments:**
• Due: Apr 15, Jun 15, Sep 15, Jan 15
• Safe harbor to avoid penalty:
  (1) 90% of current year tax, OR
  (2) 100% of prior year tax (110% if AGI > $150K)

**Penalty Calculation:**
• Based on underpayment × federal short-term rate + 3%
• Calculated quarterly from due date to payment

**Exceptions:**
• Tax liability < $1,000
• No tax liability prior year (12-month year)`,
    difficulty: 'medium',
    tags: ['estimated tax', 'quarterly', 'penalty'],
    reference: 'IRC §6654',
  },
  {
    id: 'tcp-fc-028',
    section: 'TCP',
    type: 'definition',
    topic: 'Entity Taxation',
    blueprintArea: 'TCP-III',
    front: 'What is SCHEDULE K-1?',
    back: `**Schedule K-1:**
Report of partner/shareholder/beneficiary share of:
• Ordinary income/loss
• Separately stated items (capital gains, interest, dividends)
• Credits
• Foreign taxes
• Self-employment income

**Issued by:**
• Partnerships → Partners (Form 1065 K-1)
• S Corps → Shareholders (Form 1120-S K-1)
• Trusts/Estates → Beneficiaries (Form 1041 K-1)

Recipients report items on their individual returns.`,
    difficulty: 'easy',
    tags: ['K-1', 'partnership', 'pass-through'],
    reference: 'Form 1065, 1120-S, 1041',
  },
  {
    id: 'tcp-fc-029',
    section: 'TCP',
    type: 'rule',
    topic: 'Individual Tax',
    blueprintArea: 'TCP-I',
    front: 'What are the PASSIVE ACTIVITY LOSS (PAL) rules?',
    back: `**Passive Activity Loss (§469):**
• Passive losses can only offset passive income
• Cannot offset active or portfolio income

**Passive Activity:**
• Trade/business in which taxpayer doesn't materially participate
• Rental activities (generally passive)

**Exceptions:**
• Real estate professionals (750 hours)
• $25,000 rental loss allowance (phases out $100K-$150K AGI)

Suspended losses carried forward; released upon disposition`,
    difficulty: 'hard',
    tags: ['PAL', 'passive', 'rental'],
    reference: 'IRC §469',
  },
  {
    id: 'tcp-fc-030',
    section: 'TCP',
    type: 'definition',
    topic: 'Entity Taxation',
    blueprintArea: 'TCP-III',
    front: 'What is the TAX TREATMENT of LLC?',
    back: `**LLC Federal Tax Classification:**
• Default (single member): Disregarded entity (Schedule C)
• Default (multi-member): Partnership (Form 1065)
• Can elect: S corp or C corp (Form 8832 or 2553)

**Advantages:**
• Flexibility in tax treatment
• Limited liability protection
• No restrictions on ownership
• Pass-through taxation available

**Self-Employment Tax:**
• Members generally subject to SE tax on their share (unlike S corp)`,
    difficulty: 'medium',
    tags: ['LLC', 'entity', 'classification'],
    reference: 'Reg §301.7701-3',
  },
];

export default TCP_FLASHCARDS;

/**
 * CPA Flashcards - World-Class Sprint
 * Advanced exam-quality flashcards for all 6 CPA sections
 * 
 * Focus: High-yield topics that frequently appear on the CPA exam
 */

import { Flashcard } from './types';

// ==========================================
// FAR WORLD-CLASS FLASHCARDS
// ==========================================
export const FAR_WORLD_CLASS_FLASHCARDS: Flashcard[] = [
  {
    id: 'far-wc-fc-001',
    section: 'FAR',
    type: 'concept',
    topic: 'Revenue Recognition',
    subtopic: 'ASC 606 5-Step Model',
    blueprintArea: 'FAR-III',
    front: 'What are the 5 steps of ASC 606 Revenue Recognition?',
    back: `**The 5-Step Model:**

1. **Identify the contract** with a customer
2. **Identify performance obligations** in the contract
3. **Determine the transaction price**
4. **Allocate the transaction price** to performance obligations
5. **Recognize revenue** when (or as) each PO is satisfied

Memory aid: "I-I-D-A-R" or "Contract → Obligations → Price → Allocate → Recognize"`,
    mnemonic: 'I-I-D-A-R: Identify, Identify, Determine, Allocate, Recognize',
    example: 'Software + training bundle: Identify contract, separate POs (software & training), determine $10K price, allocate by standalone selling price, recognize software at transfer, training over time.',
    difficulty: 'medium',
    tags: ['ASC 606', 'revenue', 'five-step'],
    reference: 'ASC 606-10-25',
  },
  {
    id: 'far-wc-fc-002',
    section: 'FAR',
    type: 'concept',
    topic: 'Leases',
    subtopic: 'Finance vs Operating',
    blueprintArea: 'FAR-III',
    front: 'What are the OWNES criteria for classifying a FINANCE lease?',
    back: `**OWNES - Any ONE = Finance Lease:**

• **O**wnership transfers to lessee at lease end
• **W**ritten bargain purchase option
• **N**et present value ≥ 90% of fair value
• **E**conomic life - lease term ≥ 75% of useful life
• **S**pecialized asset with no alternative use

If NONE met → Operating lease

Lessee test: Same for all leases
Lessor test: Also need collectibility + no uncertainties`,
    mnemonic: 'OWNES: Ownership, Written option, NPV 90%, Economic life 75%, Specialized',
    difficulty: 'medium',
    tags: ['ASC 842', 'lease classification', 'finance lease'],
    reference: 'ASC 842-10-25',
  },
  {
    id: 'far-wc-fc-003',
    section: 'FAR',
    type: 'formula',
    topic: 'Current Expected Credit Losses',
    subtopic: 'CECL Model',
    blueprintArea: 'FAR-II',
    front: 'How is the CECL allowance calculated under ASC 326?',
    back: `**CECL Allowance = Current carrying amount × Lifetime ECL rate**

Key differences from incurred loss model:
• Recognizes LIFETIME expected losses at inception
• Forward-looking (includes forecasts)
• Applies to held-to-maturity, loans, receivables, net investments in leases

Journal entry:
Dr. Credit Loss Expense
Cr. Allowance for Credit Losses

Subsequent changes flow through income`,
    formula: 'Allowance = Amortized Cost × Expected Credit Loss Rate',
    example: '$1M loan portfolio with 3% expected lifetime loss: Allowance = $30,000 at inception',
    difficulty: 'hard',
    tags: ['CECL', 'credit losses', 'ASC 326'],
    reference: 'ASC 326-20',
  },
  {
    id: 'far-wc-fc-004',
    section: 'FAR',
    type: 'concept',
    topic: 'Stock Compensation',
    subtopic: 'Option Measurement',
    blueprintArea: 'FAR-IV',
    front: 'How is stock-based compensation measured under ASC 718?',
    back: `**Measurement Date: Grant date fair value**

For equity-classified awards:
• Measure at GRANT DATE fair value
• Do NOT remeasure (even if options expire worthless)
• Recognize over requisite service period

For liability-classified awards:
• Remeasure at fair value each period
• Settlement date = final measurement

Forfeitures: Either estimate or recognize when occur

Grant date FV uses option pricing model (Black-Scholes or binomial)`,
    example: '1,000 options × $15 grant date FV × 4-year vest = $3,750/year expense',
    difficulty: 'medium',
    tags: ['stock compensation', 'ASC 718', 'options'],
    reference: 'ASC 718-10-30',
  },
  {
    id: 'far-wc-fc-005',
    section: 'FAR',
    type: 'formula',
    topic: 'Earnings Per Share',
    subtopic: 'Diluted EPS',
    blueprintArea: 'FAR-I',
    front: 'How do you calculate Diluted EPS with stock options?',
    back: `**Treasury Stock Method:**

1. Assume ALL in-the-money options exercised at beginning of year
2. Calculate proceeds: Options × Exercise Price
3. Calculate shares repurchased: Proceeds ÷ Avg Market Price
4. Net new shares = Options - Repurchased shares
5. Add net new shares to denominator

**Diluted EPS = (Net Income - Preferred Dividends) / (WACSO + Dilutive Shares)**

Options are anti-dilutive if exercise price > market price (exclude)`,
    formula: 'Net Shares = Options × (Mkt Price - Exercise Price) / Mkt Price',
    example: '100K options @ $20, market $30: Net shares = 100K × ($30-$20)/$30 = 33,333 dilutive shares',
    difficulty: 'hard',
    tags: ['EPS', 'diluted', 'treasury stock method'],
    reference: 'ASC 260-10-45',
  },
  {
    id: 'far-wc-fc-006',
    section: 'FAR',
    type: 'concept',
    topic: 'Consolidations',
    subtopic: 'Variable Interest Entity',
    blueprintArea: 'FAR-V',
    front: 'What are the criteria for determining the Primary Beneficiary of a VIE?',
    back: `**Primary Beneficiary has BOTH:**

1. **Power** - Ability to direct activities that most significantly impact VIE's economic performance

2. **Economics** - Obligation to absorb losses OR right to receive benefits that could be significant to the VIE

If single party has both → Consolidate

If power and economics are shared → Apply judgment, consider:
• Related party relationships
• Implicit variable interests
• Disproportionate risk sharing`,
    example: 'Company guarantees VIE debt (economics) and manages operations (power) → Primary beneficiary, must consolidate',
    difficulty: 'hard',
    tags: ['VIE', 'consolidation', 'primary beneficiary'],
    reference: 'ASC 810-10-25',
  },
  {
    id: 'far-wc-fc-007',
    section: 'FAR',
    type: 'concept',
    topic: 'Pension Accounting',
    subtopic: 'Net Periodic Pension Cost',
    blueprintArea: 'FAR-IV',
    front: 'What are the components of Net Periodic Pension Cost?',
    back: `**SERASIG - Components of Pension Expense:**

Always through P&L:
• **S**ervice cost (always operating)

Usually through OCI first, then amortized:
• **E**xpected return on plan assets (credit)
• **R**ecognized prior service cost amortization
• **A**mortization of net actuarial gain/loss
• **S**ettlement/curtailment gains/losses

Immediate:
• **I**nterest cost (can be operating or non-operating)
• **G**ains/losses on settlements

Net pension cost = Service + Interest - Expected Return + Amortizations`,
    mnemonic: 'SERASIG: Service, Expected return, Recognized PSC, Amortization of G/L, Settlement, Interest, Gain/loss',
    difficulty: 'hard',
    tags: ['pension', 'ASC 715', 'NPPC'],
    reference: 'ASC 715-30-35',
  },
  {
    id: 'far-wc-fc-008',
    section: 'FAR',
    type: 'concept',
    topic: 'Government Accounting',
    subtopic: 'Fund Types',
    blueprintArea: 'FAR-V',
    front: 'What are the 11 fund types in governmental accounting?',
    back: `**Governmental Funds (5) - Modified Accrual:**
1. General Fund
2. Special Revenue Funds
3. Capital Projects Funds
4. Debt Service Funds
5. Permanent Funds

**Proprietary Funds (2) - Full Accrual:**
6. Enterprise Funds (external customers)
7. Internal Service Funds (internal customers)

**Fiduciary Funds (4) - Full Accrual:**
8. Pension Trust Funds
9. Investment Trust Funds
10. Private-Purpose Trust Funds
11. Custodial Funds

Remember: Governmental = modified accrual, Proprietary/Fiduciary = full accrual`,
    mnemonic: 'GS-CD-P for Governmental (General, Special, Capital, Debt, Permanent)',
    difficulty: 'medium',
    tags: ['government', 'fund accounting', 'GASB'],
    reference: 'GASB Statement 34',
  },
  {
    id: 'far-wc-fc-009',
    section: 'FAR',
    type: 'concept',
    topic: 'Income Taxes',
    subtopic: 'Deferred Tax Assets',
    blueprintArea: 'FAR-III',
    front: 'When does a DTA require a valuation allowance under ASC 740?',
    back: `**Valuation Allowance needed when:**

"More likely than not" (>50%) that some/all DTA will NOT be realized

**Positive evidence (realizable):**
• Strong earnings history
• Existing contracts/backlog
• Appreciated assets
• Reversing DTLs in carryforward period

**Negative evidence (needs VA):**
• Cumulative losses in recent years
• History of unused NOL carryforwards
• Unsettled circumstances
• Expected losses

Negative evidence generally weighs heavier than positive

JE: Dr. Income Tax Expense, Cr. Valuation Allowance`,
    example: '3 years of cumulative losses + no taxable income forecast = likely need full VA on DTA',
    difficulty: 'hard',
    tags: ['deferred tax', 'valuation allowance', 'ASC 740'],
    reference: 'ASC 740-10-30',
  },
  {
    id: 'far-wc-fc-010',
    section: 'FAR',
    type: 'formula',
    topic: 'Statement of Cash Flows',
    subtopic: 'Indirect Method',
    blueprintArea: 'FAR-I',
    front: 'What adjustments convert net income to operating cash flow (indirect method)?',
    back: `**Start: Net Income**

**Add back (non-cash expenses):**
+ Depreciation & amortization
+ Impairment losses
+ Deferred tax expense
+ Stock-based compensation
+ Loss on asset disposal

**Subtract (non-cash income):**
- Gain on asset disposal
- Deferred tax benefit
- Equity method income > dividends received

**Working capital adjustments:**
+ ↓ Current assets (A/R, inventory, prepaids)
+ ↑ Current liabilities (A/P, accrued expenses)
- ↑ Current assets
- ↓ Current liabilities

= Net Cash from Operating Activities`,
    mnemonic: 'DIAL: Depreciation, Investments, Assets changes, Liabilities changes',
    difficulty: 'medium',
    tags: ['cash flow', 'indirect method', 'operating activities'],
    reference: 'ASC 230-10-45',
  },
];

// ==========================================
// AUD WORLD-CLASS FLASHCARDS
// ==========================================
export const AUD_WORLD_CLASS_FLASHCARDS: Flashcard[] = [
  {
    id: 'aud-wc-fc-001',
    section: 'AUD',
    type: 'concept',
    topic: 'Risk Assessment',
    subtopic: 'Audit Risk Model',
    blueprintArea: 'AUD-II',
    front: 'What is the Audit Risk Model and how do components relate?',
    back: `**Audit Risk = Inherent Risk × Control Risk × Detection Risk**

• **Inherent Risk (IR)**: Susceptibility to material misstatement (before controls)
• **Control Risk (CR)**: Risk controls fail to prevent/detect misstatement
• **Detection Risk (DR)**: Risk auditor won't detect material misstatement

Key relationships:
• IR and CR are assessed (can't change)
• DR is controlled by auditor (set procedures)
• As IR × CR ↑, DR must ↓ (do more work)
• AR is set by auditor (typically 5%)

DR = AR / (IR × CR)`,
    formula: 'Detection Risk = Audit Risk / (Inherent Risk × Control Risk)',
    example: 'AR=5%, IR=80%, CR=50%: DR = 0.05/(0.80×0.50) = 12.5% acceptable detection risk',
    difficulty: 'medium',
    tags: ['audit risk', 'detection risk', 'risk assessment'],
    reference: 'AU-C 315',
  },
  {
    id: 'aud-wc-fc-002',
    section: 'AUD',
    type: 'concept',
    topic: 'Audit Evidence',
    subtopic: 'Assertions',
    blueprintArea: 'AUD-III',
    front: 'What are the financial statement assertions by category?',
    back: `**Transaction & Events (Period):**
• Occurrence - Transactions occurred
• Completeness - All transactions recorded
• Accuracy - Amounts correctly recorded
• Cutoff - Correct period
• Classification - Proper accounts

**Account Balances (Point in time):**
• Existence - Assets/liabilities exist
• Rights & Obligations - Entity owns/owes
• Completeness - All included
• Valuation & Allocation - Appropriate amounts

**Presentation & Disclosure:**
• Occurrence & Rights/Obligations
• Completeness
• Classification & Understandability
• Accuracy & Valuation`,
    mnemonic: 'COCAC for Transactions; ERVC for Balances',
    difficulty: 'medium',
    tags: ['assertions', 'audit evidence', 'PCAOB'],
    reference: 'AU-C 315.A128',
  },
  {
    id: 'aud-wc-fc-003',
    section: 'AUD',
    type: 'concept',
    topic: 'Independence',
    subtopic: 'Threats & Safeguards',
    blueprintArea: 'AUD-I',
    front: 'What are the 5 independence threat categories?',
    back: `**SIFAM - Independence Threats:**

• **S**elf-interest: Financial or other interest
• **I**ntimidation: Threats/pressure from client
• **F**amiliarity: Close relationship with client
• **A**dvocacy: Promoting client's position
• **M**anagement participation: Acting as management

**Common situations:**
• Self-interest: Contingent fees, loans
• Familiarity: Former employee, long tenure
• Advocacy: Representing in litigation
• Management participation: Making decisions for client

Response: Apply safeguards OR decline engagement`,
    mnemonic: 'SIFAM: Self-interest, Intimidation, Familiarity, Advocacy, Management participation',
    difficulty: 'medium',
    tags: ['independence', 'ethics', 'threats'],
    reference: 'ET Section 1.200',
  },
  {
    id: 'aud-wc-fc-004',
    section: 'AUD',
    type: 'concept',
    topic: 'Audit Reports',
    subtopic: 'Modified Opinions',
    blueprintArea: 'AUD-IV',
    front: 'When do you issue each type of modified opinion?',
    back: `**Modified Opinion Decision Tree:**

**Is there a misstatement?**
• Material but NOT pervasive → Qualified opinion
• Material AND pervasive → Adverse opinion

**Is there a scope limitation?**
• Material but NOT pervasive → Qualified opinion
• Material AND pervasive → Disclaimer of opinion

**Pervasive means:**
• Effects not confined to specific elements
• Represents substantial portion of F/S
• Fundamental to users' understanding

**Qualified = "except for"
Adverse = "do not present fairly"
Disclaimer = "we are unable to express"`,
    comparison: {
      itemA: 'Scope Limitation',
      itemB: 'Misstatement',
      differences: [
        'Scope limitation: Material-Qualified, Pervasive-Disclaimer',
        'Misstatement: Material-Qualified, Pervasive-Adverse'
      ]
    },
    difficulty: 'hard',
    tags: ['audit report', 'modified opinion', 'qualified'],
    reference: 'AU-C 705',
  },
  {
    id: 'aud-wc-fc-005',
    section: 'AUD',
    type: 'concept',
    topic: 'Internal Control',
    subtopic: 'Deficiency Evaluation',
    blueprintArea: 'AUD-II',
    front: 'Distinguish Material Weakness, Significant Deficiency, and Control Deficiency',
    back: `**Control Deficiency:**
Design or operation does not allow timely prevention/detection of misstatements
(Doesn't require communication)

**Significant Deficiency:**
• Less severe than material weakness
• But important enough to merit attention by those charged with governance
• Must communicate in writing

**Material Weakness:**
• Reasonable POSSIBILITY that material misstatement will NOT be prevented or detected on timely basis
• Must communicate in writing
• Adverse ICFR opinion if unresolved

**Key test:** Reasonable possibility (lower bar) vs. Reasonably possible (higher bar)`,
    comparison: {
      itemA: 'Material Weakness',
      itemB: 'Significant Deficiency',
      differences: [
        'MW: Reasonable possibility of material misstatement',
        'SD: Less severe but merits governance attention',
        'Both require written communication to governance'
      ]
    },
    difficulty: 'hard',
    tags: ['internal control', 'deficiency', 'material weakness'],
    reference: 'AU-C 265',
  },
  {
    id: 'aud-wc-fc-006',
    section: 'AUD',
    type: 'concept',
    topic: 'Sampling',
    subtopic: 'Attribute vs Variables',
    blueprintArea: 'AUD-III',
    front: 'What is the difference between attribute and variables sampling?',
    back: `**Attribute Sampling:**
• Used for: Tests of controls
• Measures: Rate of deviation (%)
• Question: "How often does control fail?"
• Result: Yes/No for each item
• Example: 3 of 100 invoices missing approval = 3% deviation rate

**Variables Sampling:**
• Used for: Substantive tests
• Measures: Dollar amounts
• Question: "How much is the balance misstated?"
• Result: Dollar amount for each item
• Methods: MUS, Classical (mean-per-unit, ratio, difference)

**Monetary Unit Sampling (MUS):**
• Hybrid approach
• Probability proportional to size
• Large items more likely selected`,
    comparison: {
      itemA: 'Attribute Sampling',
      itemB: 'Variables Sampling',
      differences: [
        'Attribute = deviation rate; Variables = dollar amounts',
        'Attribute = controls; Variables = substantive',
        'Attribute = yes/no; Variables = quantitative'
      ]
    },
    difficulty: 'medium',
    tags: ['sampling', 'attribute', 'variables', 'MUS'],
    reference: 'AU-C 530',
  },
  {
    id: 'aud-wc-fc-007',
    section: 'AUD',
    type: 'concept',
    topic: 'Documentation',
    subtopic: 'Retention Requirements',
    blueprintArea: 'AUD-III',
    front: 'What are the audit documentation retention requirements?',
    back: `**PCAOB (Issuers):**
• Retain for 7 years from report date
• Lock workpapers within 45 days of report
• Changes after 45 days must be documented with:
  - Date added
  - Name of person
  - Reason for addition

**AICPA (Non-issuers):**
• Retain for 5 years from report date
• Complete assembly within 60 days
• Changes after 60 days same documentation requirements

**Both:**
• Sufficient to enable experienced auditor with no prior connection to understand:
  - Nature, timing, extent of procedures
  - Results of procedures
  - Conclusions reached`,
    comparison: {
      itemA: 'PCAOB',
      itemB: 'AICPA',
      differences: [
        'Retention: 7 years (PCAOB) vs 5 years (AICPA)',
        'Assembly: 45 days (PCAOB) vs 60 days (AICPA)',
        'Both require documentation of late additions'
      ]
    },
    difficulty: 'medium',
    tags: ['documentation', 'retention', 'PCAOB', 'AICPA'],
    reference: 'AS 1215, AU-C 230',
  },
  {
    id: 'aud-wc-fc-008',
    section: 'AUD',
    type: 'concept',
    topic: 'Related Parties',
    subtopic: 'Audit Procedures',
    blueprintArea: 'AUD-III',
    front: 'What procedures address related party transactions?',
    back: `**Identification Procedures:**
• Inquire of management about related parties
• Review prior year workpapers
• Review SEC filings (proxy statements)
• Review board/committee minutes
• Inquire of management re: affiliations
• Review large/unusual transactions near period end

**Audit Procedures:**
• Obtain understanding of nature and purpose
• Evaluate business rationale
• Examine contracts and agreements
• Confirm terms with related parties
• Consider need for disclosure

**Risk Indicators:**
• Transactions outside normal operations
• Terms differ from arm's length
• No apparent business purpose
• Processed unusually`,
    example: 'CFO\'s brother supplies materials at above-market prices → Evaluate disclosure and economic substance',
    difficulty: 'medium',
    tags: ['related parties', 'fraud risk', 'procedures'],
    reference: 'AU-C 550',
  },
];

// ==========================================
// REG WORLD-CLASS FLASHCARDS
// ==========================================
export const REG_WORLD_CLASS_FLASHCARDS: Flashcard[] = [
  {
    id: 'reg-wc-fc-001',
    section: 'REG',
    type: 'concept',
    topic: 'Entities',
    subtopic: 'Check-the-Box',
    blueprintArea: 'REG-V',
    front: 'How does the check-the-box election work for entity classification?',
    back: `**Default Classifications:**

• Single-member LLC → Disregarded entity
• Multi-member LLC → Partnership
• Corporation → Corporation (cannot elect out)

**Available Elections:**
• Eligible entities can elect to be:
  - Association taxed as corporation, OR
  - Pass-through (partnership/disregarded)

**Requirements:**
• Form 8832 - Entity Classification Election
• Effective date can be retroactive 75 days
• Election is binding for 60 months

**Cannot make election:**
• Per se corporations
• Publicly traded partnerships
• Tax-exempt organizations`,
    example: 'Multi-member LLC wants corporate tax treatment → File Form 8832 (and Form 2553 for S corp)',
    difficulty: 'medium',
    tags: ['entity', 'check-the-box', 'Form 8832'],
    reference: 'Treas. Reg. 301.7701-3',
  },
  {
    id: 'reg-wc-fc-002',
    section: 'REG',
    type: 'concept',
    topic: 'S Corporations',
    subtopic: 'Requirements',
    blueprintArea: 'REG-V',
    front: 'What are the eligibility requirements for S corporation status?',
    back: `**S Corporation Requirements (SHINE):**

• **S**mall business corporation (domestic only)
• **H**undred shareholders max (100, family = 1)
• **I**ndividuals + certain trusts/estates only
• **N**o nonresident aliens as shareholders
• **E**ligible only one class of stock

**Ineligible entities as shareholders:**
• C corporations
• Partnerships
• Nonresident aliens
• Most trusts (except: grantor, QSST, ESBT, voting, testamentary within 2 years)

**One class of stock:**
• Differences in voting rights OK
• Different economic rights = second class = disqualification`,
    mnemonic: 'SHINE: Small, Hundred, Individuals, No nonresidents, Eligible stock',
    difficulty: 'medium',
    tags: ['S corporation', 'requirements', 'Form 2553'],
    reference: 'IRC §1361',
  },
  {
    id: 'reg-wc-fc-003',
    section: 'REG',
    type: 'formula',
    topic: 'Basis',
    subtopic: 'Stock Basis Ordering',
    blueprintArea: 'REG-V',
    front: 'What is the order for adjusting S corporation stock basis?',
    back: `**Basis Adjustment Order (I-D-N-D-L):**

**INCREASES first:**
1. (+) Nonseparately stated income
2. (+) Separately stated income items
3. (+) Tax-exempt income

**DECREASES next:**
4. (-) Distributions (limited to basis)
5. (-) Nondeductible expenses (M&E 50%)
6. (-) Deductions and losses
7. (-) Depletion deductions

**Key rule:** Distributions reduce basis BEFORE losses/deductions
Why? Prevents converting ordinary loss to capital gain on excess distribution

**Cannot go negative** - excess losses suspended until basis restored`,
    formula: 'Ending Basis = Beginning + Income + Tax-Exempt - Distributions - Nondeductible - Losses',
    example: 'Basis $10K, income $8K, distribution $15K, loss $5K: Basis after income = $18K, after distribution = $3K, loss allowed = $3K (not $5K)',
    difficulty: 'hard',
    tags: ['S corp', 'basis', 'shareholder basis'],
    reference: 'IRC §1367',
  },
  {
    id: 'reg-wc-fc-004',
    section: 'REG',
    type: 'concept',
    topic: 'Property Transactions',
    subtopic: 'Like-Kind Exchange',
    blueprintArea: 'REG-III',
    front: 'What are the requirements for a tax-deferred like-kind exchange under §1031?',
    back: `**IRC §1031 Requirements:**

**Qualifying Property:**
• Real property held for investment or business use
• Must be "like-kind" (any real for real)
• NOT: Inventory, stocks, bonds, partnership interests, personal property (post-2017)

**Timing Rules:**
• 45 days: Identify replacement property
• 180 days: Close on replacement property
• Both deadlines are strict (not extensions)

**Boot Recognition:**
• Boot received = gain recognized (lesser of gain realized or boot)
• Boot given = no gain, increase basis
• Mortgage relief = boot received
• Mortgage assumption = boot given

**Basis Formula:**
New basis = Old basis + Boot paid + Gain recognized - Boot received`,
    mnemonic: '45-180: Identify in 45, Close in 180',
    example: 'Trade $500K building (basis $200K) for $600K building + receive $50K cash: Gain realized $350K, recognized = $50K (boot), basis in new = $200K + $50K gain - $50K boot = $200K (or $250K)',
    difficulty: 'hard',
    tags: ['1031', 'like-kind', 'boot', 'exchange'],
    reference: 'IRC §1031',
  },
  {
    id: 'reg-wc-fc-005',
    section: 'REG',
    type: 'formula',
    topic: 'Partnership',
    subtopic: 'Outside Basis',
    blueprintArea: 'REG-V',
    front: 'How is a partner\'s outside basis calculated?',
    back: `**Outside Basis Calculation:**

**Starting point:**
• Cash contributed
• FMV of services contributed
• Adjusted basis of property contributed

**Increases:**
• Share of partnership income (all items)
• Share of tax-exempt income
• Share of partnership liabilities

**Decreases:**
• Share of partnership losses
• Share of nondeductible expenses
• Distributions received
• Decrease in share of liabilities

**Liability allocation:**
• Recourse: Based on economic risk of loss
• Nonrecourse: By profit-sharing ratio
• Qualified nonrecourse: By profit ratio (real estate)

Minimum basis = $0 (no negative basis)`,
    formula: 'Outside Basis = Initial + Income + Liability share - Losses - Distributions - Liability decreases',
    example: 'Contribute $50K cash, share of income $20K, share of liabilities $30K: Outside basis = $100K',
    difficulty: 'hard',
    tags: ['partnership', 'outside basis', 'liabilities'],
    reference: 'IRC §705, §752',
  },
  {
    id: 'reg-wc-fc-006',
    section: 'REG',
    type: 'concept',
    topic: 'Individual Tax',
    subtopic: 'Qualified Business Income',
    blueprintArea: 'REG-IV',
    front: 'What are the QBI deduction limitations for high-income taxpayers?',
    back: `**§199A QBI Deduction Limitations:**

**Phase-in thresholds (2024):**
• Single: $191,950 - $241,950
• MFJ: $383,900 - $483,900

**Below threshold:** 20% of QBI, no limitations

**Above threshold, non-SSTB:**
Deduction = LESSER of:
• 20% of QBI, OR
• GREATER of:
  - 50% of W-2 wages, OR
  - 25% of W-2 wages + 2.5% of UBIA (qualified property)

**Above threshold, SSTB:**
• Phase out deduction entirely
• Zero deduction above upper threshold

**SSTB = Specified Service Trade or Business:**
Health, law, accounting, actuarial, performing arts, consulting, athletics, financial services, brokerage`,
    formula: 'QBI Deduction = Lesser of (20% QBI) OR (Greater of 50% W-2 wages OR 25% W-2 + 2.5% UBIA)',
    difficulty: 'hard',
    tags: ['QBI', '199A', 'SSTB', 'W-2 limitation'],
    reference: 'IRC §199A',
  },
  {
    id: 'reg-wc-fc-007',
    section: 'REG',
    type: 'concept',
    topic: 'Ethics',
    subtopic: 'Circular 230',
    blueprintArea: 'REG-I',
    front: 'What are the key requirements of Circular 230?',
    back: `**Circular 230 Key Rules:**

**Best Practices (§10.33):**
• Communicate clearly
• Establish facts and laws
• Advise of consequences
• Act fairly with integrity

**Covered Opinions (§10.37):**
• Due diligence required
• Reasonable conclusions based on facts and law
• No unreasonable assumptions

**Sanctions (§10.50):**
• Censure
• Practice suspension
• Practice disbarment
• Monetary penalty

**Written Advice (§10.37):**
• Consider all relevant facts
• Not rely on unreasonable factual assumptions
• Consider all relevant law
• Relate law to facts

**Conflicts:** Cannot represent conflicting interests without informed consent`,
    example: 'Giving tax advice on aggressive position → Must have reasonable basis and inform client of penalties',
    difficulty: 'medium',
    tags: ['Circular 230', 'ethics', 'practice'],
    reference: '31 CFR Part 10',
  },
  {
    id: 'reg-wc-fc-008',
    section: 'REG',
    type: 'concept',
    topic: 'Business Law',
    subtopic: 'Agency',
    blueprintArea: 'REG-II',
    front: 'What types of authority bind a principal to contracts made by an agent?',
    back: `**Principal Bound by Agent's Authority:**

**Express Authority:**
• Explicitly granted (oral or written)
• Stated in contract/agreement

**Implied Authority:**
• Necessary to carry out express authority
• Customary in similar positions
• "Incidental" powers

**Apparent Authority:**
• Principal's actions create reasonable appearance
• Third party reasonably believes agent has authority
• Principal estopped from denying

**Ratification:**
• Principal accepts unauthorized act after the fact
• Retroactive authorization
• Must accept entire transaction

**Order of precedence:**
Express > Implied > Apparent`,
    comparison: {
      itemA: 'Actual Authority (Express/Implied)',
      itemB: 'Apparent Authority',
      differences: [
        'Actual: Based on grant from principal to agent',
        'Apparent: Based on principal\'s representations to third party',
        'Both can bind principal; apparent protects third party reliance'
      ]
    },
    difficulty: 'medium',
    tags: ['agency', 'authority', 'business law'],
    reference: 'Restatement (Third) of Agency',
  },
];

// Export all world-class flashcards
export const ALL_WORLD_CLASS_FLASHCARDS: Flashcard[] = [
  ...FAR_WORLD_CLASS_FLASHCARDS,
  ...AUD_WORLD_CLASS_FLASHCARDS,
  ...REG_WORLD_CLASS_FLASHCARDS,
];

export default ALL_WORLD_CLASS_FLASHCARDS;

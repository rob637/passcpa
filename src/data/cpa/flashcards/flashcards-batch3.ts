/**
 * CPA Flashcards - Sprint Batch 3
 * Additional exam-quality flashcards for all 6 CPA sections
 * 10 per section = 60 total
 */

import { Flashcard } from './types';

// ==========================================
// FAR BATCH 3 FLASHCARDS
// ==========================================
export const FAR_BATCH3_FLASHCARDS: Flashcard[] = [
  {
    id: 'far-b3-fc-001',
    section: 'FAR',
    type: 'formula',
    topic: 'Diluted EPS',
    subtopic: 'Convertible Securities',
    blueprintArea: 'FAR-II',
    front: 'How do you calculate Diluted EPS with convertible bonds?',
    back: `**Diluted EPS with Convertibles:**

Numerator: Net Income + Interest Expense × (1 - Tax Rate)
Denominator: Weighted Avg Shares + Shares from Conversion

**Steps:**
1. Add back after-tax interest saved
2. Add shares that would be issued
3. Only include if DILUTIVE (lowers EPS)

**Example:**
$1M NI, 100K shares, $100K interest, 25% tax, 20K shares on conversion
Basic EPS = $1M / 100K = $10.00
Diluted = ($1M + $75K) / 120K = $8.96 ✓ Dilutive`,
    difficulty: 'hard',
    tags: ['EPS', 'convertible', 'dilution'],
    reference: 'ASC 260-10-45',
  },
  {
    id: 'far-b3-fc-002',
    section: 'FAR',
    type: 'concept',
    topic: 'Business Combinations',
    subtopic: 'Acquisition Method',
    blueprintArea: 'FAR-III',
    front: 'How is goodwill calculated in an acquisition?',
    back: `**Goodwill Formula:**

Goodwill = Consideration Transferred − Fair Value of Net Identifiable Assets

**Components:**
• Consideration = Cash + FV of stock + Contingent consideration (FV at acquisition)
• Net ID assets = FV of assets − FV of liabilities

**Key Points:**
• Record at FV, not book value
• Identify intangibles separately (customer lists, patents)
• Goodwill is NOT amortized
• Test for impairment annually`,
    difficulty: 'medium',
    tags: ['acquisition', 'goodwill', 'ASC 805'],
    reference: 'ASC 805-30-30',
  },
  {
    id: 'far-b3-fc-003',
    section: 'FAR',
    type: 'concept',
    topic: 'Government Accounting',
    subtopic: 'Fund Types',
    blueprintArea: 'FAR-IV',
    front: 'What are the 5 governmental fund types?',
    back: `**Governmental Funds (GRSPP):**

1. **G**eneral Fund - Main operating fund
2. **R**evenue (Special) - Restricted revenues for specific purposes
3. **S**ervice (Debt) - Principal and interest on long-term debt  
4. **P**rojects (Capital) - Acquisition of major capital assets
5. **P**ermanent - Principal maintained permanently, earnings expendable

**Measurement Focus:** Current financial resources
**Basis:** Modified accrual
**Financial Statements:** Balance sheet, Statement of revenues/expenditures/changes in fund balance`,
    mnemonic: 'GRSPP: General, Revenue, Service, Projects, Permanent',
    difficulty: 'medium',
    tags: ['governmental', 'funds', 'GASB'],
    reference: 'GASB Statement 54',
  },
  {
    id: 'far-b3-fc-004',
    section: 'FAR',
    type: 'formula',
    topic: 'Inventory',
    subtopic: 'Lower of Cost or NRV',
    blueprintArea: 'FAR-II',
    front: 'How is the LCNRV adjustment calculated?',
    back: `**Lower of Cost or Net Realizable Value:**

NRV = Selling Price − Costs to Complete − Costs to Sell

**Comparison:**
• If Cost > NRV → Write down to NRV
• Loss recognized in COGS

**Example:**
Cost = $100, SP = $110, Completion = $5, Selling = $10
NRV = $110 − $5 − $10 = $95
Write-down = $100 − $95 = $5

**Note:** Under IFRS, can reverse write-down if value recovers. US GAAP prohibits reversal.`,
    difficulty: 'medium',
    tags: ['inventory', 'LCNRV', 'valuation'],
    reference: 'ASC 330-10-35',
  },
  {
    id: 'far-b3-fc-005',
    section: 'FAR',
    type: 'concept',
    topic: 'Cash Flows',
    subtopic: 'Indirect Method',
    blueprintArea: 'FAR-II',
    front: 'What adjustments convert Net Income to Cash from Operations?',
    back: `**Indirect Method Adjustments:**

**Add back:**
• Depreciation, amortization, depletion
• Losses on sale/impairment
• Decrease in current assets
• Increase in current liabilities
• Deferred tax expense

**Subtract:**
• Gains on sale
• Increase in current assets
• Decrease in current liabilities

**Mnemonic:** DALI = Depreciation, Amortization, Losses, Impairments (add back)`,
    mnemonic: 'DALI: Depreciation, Amortization, Losses, Impairments',
    difficulty: 'medium',
    tags: ['cash flows', 'indirect method', 'operating'],
    reference: 'ASC 230-10-45',
  },
  {
    id: 'far-b3-fc-006',
    section: 'FAR',
    type: 'concept',
    topic: 'Stock Compensation',
    subtopic: 'Options Expense',
    blueprintArea: 'FAR-III',
    front: 'How are stock options expensed under ASC 718?',
    back: `**Stock Option Expense:**

1. Measure FV at **grant date** (not exercise or vesting)
2. Recognize over **service period** (typically vesting period)
3. Forfeitures: Estimate upfront OR recognize as occur

**Journal Entry:**
Dr. Compensation Expense
  Cr. APIC - Stock Options

**Upon Exercise:**
Dr. Cash (exercise price × shares)
Dr. APIC - Stock Options
  Cr. Common Stock (par)
  Cr. APIC - Common Stock (plug)`,
    difficulty: 'hard',
    tags: ['stock compensation', 'ASC 718', 'options'],
    reference: 'ASC 718-10-35',
  },
  {
    id: 'far-b3-fc-007',
    section: 'FAR',
    type: 'concept',
    topic: 'Not-for-Profit',
    subtopic: 'Net Asset Classes',
    blueprintArea: 'FAR-V',
    front: 'What are the two net asset classifications for NFPs?',
    back: `**NFP Net Asset Classes (ASU 2016-14):**

1. **Without Donor Restrictions**
   • No donor-imposed restrictions
   • Board-designated amounts disclosed

2. **With Donor Restrictions**
   • Purpose restrictions (specific use)
   • Time restrictions (future period)
   • Perpetual restrictions (endowments)

**Key Changes:**
• Replaced 3-class system (unrestricted/temp/perm)
• Underwater endowments in "with restrictions"
• Expense by nature AND function required`,
    difficulty: 'medium',
    tags: ['NFP', 'net assets', 'ASU 2016-14'],
    reference: 'ASC 958-205',
  },
  {
    id: 'far-b3-fc-008',
    section: 'FAR',
    type: 'formula',
    topic: 'Bonds',
    subtopic: 'Effective Interest',
    blueprintArea: 'FAR-II',
    front: 'How is bond interest expense calculated using effective interest method?',
    back: `**Effective Interest Method:**

Interest Expense = Carrying Value × Market Rate

**Premium Bond:**
• Cash paid > Interest expense
• Difference reduces premium
• CV decreases toward face

**Discount Bond:**
• Cash paid < Interest expense
• Difference reduces discount  
• CV increases toward face

**Example:** $100K face, $95K issue price, 8% stated, 10% market
Interest Expense = $95,000 × 10% = $9,500
Cash Paid = $100,000 × 8% = $8,000
Discount Amortization = $1,500`,
    difficulty: 'medium',
    tags: ['bonds', 'effective interest', 'amortization'],
    reference: 'ASC 835-30',
  },
  {
    id: 'far-b3-fc-009',
    section: 'FAR',
    type: 'concept',
    topic: 'Income Taxes',
    subtopic: 'Deferred Tax Assets',
    blueprintArea: 'FAR-II',
    front: 'When is a valuation allowance required for DTAs?',
    back: `**Valuation Allowance Test:**

Required when: More likely than NOT (>50%) that DTA will NOT be realized

**Positive Evidence:**
• Existing contracts/backlog
• History of profitability
• Tax planning strategies
• Reversing DTLs

**Negative Evidence:**
• History of losses
• Expiring carryforwards
• Unsettled circumstances

**Key:** Cumulative losses in recent years is significant negative evidence requiring strong positive evidence to overcome`,
    difficulty: 'hard',
    tags: ['deferred tax', 'valuation allowance', 'ASC 740'],
    reference: 'ASC 740-10-30',
  },
  {
    id: 'far-b3-fc-010',
    section: 'FAR',
    type: 'concept',
    topic: 'Subsequent Events',
    subtopic: 'Type I vs Type II',
    blueprintArea: 'FAR-I',
    front: 'What is the difference between Type I and Type II subsequent events?',
    back: `**Type I - Recognized:**
• Conditions existed at balance sheet date
• Adjust financial statements
• Examples: Settlement of lawsuit filed before year-end, bankruptcy of customer with receivable

**Type II - Non-Recognized:**  
• Conditions arose after balance sheet date
• Disclose only (no adjustment)
• Examples: Fire after year-end, business combination, stock split

**Period:** From BS date to financial statement issuance (or available to issue)`,
    difficulty: 'medium',
    tags: ['subsequent events', 'Type I', 'Type II'],
    reference: 'ASC 855-10-25',
  }
];

// ==========================================
// AUD BATCH 3 FLASHCARDS
// ==========================================
export const AUD_BATCH3_FLASHCARDS: Flashcard[] = [
  {
    id: 'aud-b3-fc-001',
    section: 'AUD',
    type: 'concept',
    topic: 'Audit Risk',
    subtopic: 'Risk Model',
    blueprintArea: 'AUD-II',
    front: 'What is the Audit Risk Model?',
    back: `**Audit Risk Model:**

AR = IR × CR × DR

• **Audit Risk (AR):** Risk of issuing wrong opinion
• **Inherent Risk (IR):** Susceptibility to misstatement (no controls)
• **Control Risk (CR):** Risk controls won't prevent/detect
• **Detection Risk (DR):** Risk audit procedures fail

**Only DR is controlled by auditor**

Rearranged: DR = AR / (IR × CR)
If IR and CR are high → DR must be LOW → More audit work`,
    mnemonic: 'AR = IR × CR × DR (Audit = Inherent × Control × Detection)',
    difficulty: 'medium',
    tags: ['audit risk', 'detection risk', 'risk model'],
    reference: 'AU-C 200.A43',
  },
  {
    id: 'aud-b3-fc-002',
    section: 'AUD',
    type: 'concept',
    topic: 'Evidence',
    subtopic: 'Reliability',
    blueprintArea: 'AUD-III',
    front: 'What factors affect audit evidence reliability?',
    back: `**Evidence Reliability Hierarchy:**

**More Reliable:**
• External source independent of entity
• Generated under effective internal controls
• Obtained directly by auditor
• Documentary > Oral
• Original > Photocopies

**Less Reliable:**
• Internal source from entity
• Generated with weak controls
• Provided by entity
• Oral representations
• Faxes/copies

**Example:** Bank confirmation > Client bank statement`,
    difficulty: 'medium',
    tags: ['audit evidence', 'reliability', 'external'],
    reference: 'AU-C 500.A31',
  },
  {
    id: 'aud-b3-fc-003',
    section: 'AUD',
    type: 'concept',
    topic: 'Independence',
    subtopic: 'Covered Members',
    blueprintArea: 'AUD-I',
    front: 'Who are "covered members" for independence purposes?',
    back: `**Covered Members (AICPA):**

1. Individuals on the **attest engagement team**
2. Individual in **position to influence** the engagement
3. **Partner/manager** providing >10 hours of non-attest services
4. **Partner** in office where lead partner practices
5. The **firm** and its employee benefit plans
6. An entity whose operating policies can be **controlled by** any above

**Threats:** Financial interests, business relationships, family relationships, loans

Independence must be maintained throughout engagement period + professional engagement period.`,
    difficulty: 'hard',
    tags: ['independence', 'covered member', 'AICPA'],
    reference: 'ET 1.224.010',
  },
  {
    id: 'aud-b3-fc-004',
    section: 'AUD',
    type: 'concept',
    topic: 'Sampling',
    subtopic: 'Attribute vs Variables',
    blueprintArea: 'AUD-III',
    front: 'When do you use attribute vs. variables sampling?',
    back: `**Attribute Sampling:**
• Tests of controls
• Binary outcomes (yes/no, compliant/not)
• Estimates RATE of deviation
• Example: Did authorization signature exist?

**Variables Sampling:**
• Substantive tests
• Dollar amounts
• Estimates AMOUNT of misstatement
• Types: MUS, Classical variables (MPU, ratio, difference)

**Key Distinction:**
Attribute = Deviation RATE
Variables = Dollar AMOUNT`,
    difficulty: 'medium',
    tags: ['sampling', 'attribute', 'variables'],
    reference: 'AU-C 530.A1',
  },
  {
    id: 'aud-b3-fc-005',
    section: 'AUD',
    type: 'concept',
    topic: 'Reports',
    subtopic: 'Emphasis of Matter',
    blueprintArea: 'AUD-IV',
    front: 'When is an Emphasis-of-Matter paragraph required?',
    back: `**Emphasis-of-Matter (EOM):**

**Required:**
• Reports on financial statements when going concern doubt exists (AFTER opinion)
• Change in accounting principle (unless pervasive)
• Prior period FS audited by predecessor

**Optional (discretionary):**
• Significant unusual transactions
• Subsequent events
• Major catastrophe
• Related party transactions

**Placement:** After Opinion paragraph
**Headers:** Use descriptive header (e.g., "Going Concern")
Does NOT modify the opinion`,
    difficulty: 'medium',
    tags: ['audit report', 'EOM', 'emphasis'],
    reference: 'AU-C 706.06',
  },
  {
    id: 'aud-b3-fc-006',
    section: 'AUD',
    type: 'concept',
    topic: 'Internal Controls',
    subtopic: 'COSO Components',
    blueprintArea: 'AUD-II',
    front: 'What are the 5 components of COSO Internal Control?',
    back: `**COSO Framework (CRIME):**

1. **C**ontrol Environment - Tone at top, ethics, competence
2. **R**isk Assessment - Identify and analyze risks
3. **I**nformation & Communication - Capture and share info
4. **M**onitoring - Ongoing and separate evaluations
5. **E**xisting Control Activities - Policies and procedures

**Control Environment is the FOUNDATION**

17 principles support the 5 components. All must be present and functioning for effective IC.`,
    mnemonic: 'CRIME: Control environment, Risk assessment, Information, Monitoring, Existing activities',
    difficulty: 'medium',
    tags: ['COSO', 'internal control', 'components'],
    reference: 'COSO 2013',
  },
  {
    id: 'aud-b3-fc-007',
    section: 'AUD',
    type: 'concept',
    topic: 'Compilation',
    subtopic: 'Review vs Compilation',
    blueprintArea: 'AUD-V',
    front: 'What is the difference between compilation and review?',
    back: `**Compilation (SSARS):**
• Assurance: NONE
• Procedures: Compile financial info
• No inquiry/analytics required
• Report: "We did not audit or review"
• Independence: Not required (disclose if not)

**Review (SSARS):**
• Assurance: LIMITED (negative)
• Procedures: Inquiry + Analytics
• Report: "Nothing came to our attention..."
• Independence: REQUIRED

Both: Management responsible for FS; CPA cannot issue if not independent on review`,
    difficulty: 'medium',
    tags: ['compilation', 'review', 'SSARS'],
    reference: 'AR-C 80/90',
  },
  {
    id: 'aud-b3-fc-008',
    section: 'AUD',
    type: 'concept',
    topic: 'Fraud',
    subtopic: 'Fraud Triangle',
    blueprintArea: 'AUD-II',
    front: 'What are the three elements of the Fraud Triangle?',
    back: `**Fraud Triangle:**

1. **Incentive/Pressure** - Why commit fraud?
   • Financial pressure
   • Meeting earnings targets
   • Personal debt

2. **Opportunity** - Ability to commit fraud
   • Weak internal controls
   • Lack of oversight
   • Complex transactions

3. **Rationalization** - Justification
   • "I deserve this"
   • "It's only temporary"
   • "Everyone does it"

**All three must be present for fraud to occur**
Auditor focuses on identifying risk factors for each element.`,
    mnemonic: 'POR: Pressure, Opportunity, Rationalization',
    difficulty: 'medium',
    tags: ['fraud', 'fraud triangle', 'risk factors'],
    reference: 'AU-C 240.A1',
  },
  {
    id: 'aud-b3-fc-009',
    section: 'AUD',
    type: 'concept',
    topic: 'Materiality',
    subtopic: 'Performance Materiality',
    blueprintArea: 'AUD-II',
    front: 'What is performance materiality and why is it used?',
    back: `**Performance Materiality:**

Amount set LOWER than overall materiality to:
• Reduce the risk that aggregate of uncorrected/undetected misstatements exceeds materiality
• Account for possible undetected misstatements

**Relationship:**
Performance Materiality < Overall Materiality

**Factors affecting the difference:**
• Understanding of entity (more uncertainty = bigger gap)
• Prior period misstatements
• Expectations of current period misstatements

Typically 50-75% of overall materiality for higher risk, up to 85% for lower risk engagements.`,
    difficulty: 'hard',
    tags: ['materiality', 'performance materiality', 'planning'],
    reference: 'AU-C 320.A12',
  },
  {
    id: 'aud-b3-fc-010',
    section: 'AUD',
    type: 'concept',
    topic: 'Confirmations',
    subtopic: 'Positive vs Negative',
    blueprintArea: 'AUD-III',
    front: 'When do you use positive vs. negative confirmations?',
    back: `**Positive Confirmations:**
• Response REQUIRED
• Used for large/unusual balances
• Higher reliability
• Higher cost
• Non-response requires follow-up

**Negative Confirmations:**
• Response only if disagree
• Used for high volume, low balances
• Effective IC exists
• Low exception rate expected
• Less reliable evidence

**Blank Confirmations:**
• Amount NOT preprinted
• Most reliable form
• Recipient must fill in amount`,
    difficulty: 'medium',
    tags: ['confirmations', 'positive', 'negative', 'evidence'],
    reference: 'AU-C 505.A18',
  }
];

// ==========================================
// REG BATCH 3 FLASHCARDS
// ==========================================
export const REG_BATCH3_FLASHCARDS: Flashcard[] = [
  {
    id: 'reg-b3-fc-001',
    section: 'REG',
    type: 'formula',
    topic: 'Individual Tax',
    subtopic: 'Child Tax Credit',
    blueprintArea: 'REG-IV',
    front: 'What are the Child Tax Credit rules?',
    back: `**Child Tax Credit (2024):**

• Credit: $2,000 per qualifying child
• Refundable portion (ACTC): Up to $1,700
• Age: Under 17 at year-end
• Relationship: Child, stepchild, sibling, descendant
• Residency: Lived with taxpayer >6 months
• Support: Child did not provide >50% of own support
• SSN required for child

**Phase-out:**
• AGI > $400,000 MFJ ($200,000 others)
• Reduces $50 per $1,000 over threshold`,
    difficulty: 'medium',
    tags: ['child tax credit', 'credits', 'refundable'],
    reference: 'IRC §24',
  },
  {
    id: 'reg-b3-fc-002',
    section: 'REG',
    type: 'formula',
    topic: 'Entity Tax',
    subtopic: 'S Corp Basis',
    blueprintArea: 'REG-V',
    front: 'How is S corporation shareholder basis calculated?',
    back: `**S Corp Basis Order (IDEA):**

**Increases:**
+ Income (ordinary and separately stated)
+ Debt (basis loans to S corp—NOT guarantee)

**Decreases:**
− Expenses (deductions, losses)
− Distributions
− Nondeductible expenses

**Loss Limitation Order:**
1. Stock basis (reduced to zero)
2. Debt basis (reduced to zero)
3. Excess suspended/carried forward

**Key:** Basis CANNOT go negative. Distributions in excess of basis = capital gain.`,
    mnemonic: 'IDEA: Income, Debt (to corp), Expenses, (Distributions) Adjustments',
    difficulty: 'hard',
    tags: ['S corp', 'basis', 'losses'],
    reference: 'IRC §1366, 1367',
  },
  {
    id: 'reg-b3-fc-003',
    section: 'REG',
    type: 'concept',
    topic: 'Property Transactions',
    subtopic: '§1031 Exchange',
    blueprintArea: 'REG-III',
    front: 'What are the requirements for a §1031 like-kind exchange?',
    back: `**§1031 Like-Kind Exchange:**

**Qualifying Property:**
• Real property only (post-TCJA)
• Held for business or investment
• Must be "like-kind" (real for real)

**Timelines:**
• 45 days: Identify replacement property
• 180 days: Close on replacement property

**Basis Calculation:**
Basis of new = FMV of new − Deferred gain
OR: Basis of old + Boot paid − Boot received + Gain recognized

**Boot = Taxable:**
Cash + FMV of other property received = Boot
Gain recognized = Lesser of realized gain or boot received`,
    difficulty: 'hard',
    tags: ['§1031', 'like-kind', 'deferral'],
    reference: 'IRC §1031',
  },
  {
    id: 'reg-b3-fc-004',
    section: 'REG',
    type: 'concept',
    topic: 'Business Law',
    subtopic: 'Contract Formation',
    blueprintArea: 'REG-II',
    front: 'What are the elements of a valid contract?',
    back: `**Contract Formation (COAL):**

1. **C**apacity - Parties legally able to contract
   • Minors can void (except necessities)
   • Mentally incapacitated

2. **O**ffer - Definite terms, intent, communicated

3. **A**cceptance - Mirror image rule
   • UCC: Additional terms may be included

4. **L**egal purpose - Not illegal/against public policy

**Also needed:**
• Consideration - Bargained-for exchange
• Some contracts require writing (Statute of Frauds)`,
    mnemonic: 'COAL: Capacity, Offer, Acceptance, Legal purpose',
    difficulty: 'medium',
    tags: ['contracts', 'formation', 'elements'],
    reference: 'Restatement (Second) of Contracts',
  },
  {
    id: 'reg-b3-fc-005',
    section: 'REG',
    type: 'concept',
    topic: 'Tax Procedure',
    subtopic: 'Statute of Limitations',
    blueprintArea: 'REG-I',
    front: 'What are the IRS statute of limitations for assessment?',
    back: `**Statute of Limitations (Assessment):**

• **3 years** - Standard (from later of due date or filed date)
• **6 years** - Substantial omission (>25% of gross income)
• **Unlimited** - Fraud or no return filed
• **Unlimited** - False return (willful attempt to evade)

**Refund Claims:**
Later of: 3 years from filing OR 2 years from payment

**Key:** Period starts from LATER of:
• Original due date, or
• Actual filing date`,
    difficulty: 'medium',
    tags: ['statute of limitations', 'assessment', 'procedure'],
    reference: 'IRC §6501, 6511',
  },
  {
    id: 'reg-b3-fc-006',
    section: 'REG',
    type: 'formula',
    topic: 'Corporate Tax',
    subtopic: 'Dividends Received Deduction',
    blueprintArea: 'REG-V',
    front: 'What are the DRD percentages for C corporations?',
    back: `**Dividends Received Deduction (DRD):**

| Ownership % | DRD % |
|-------------|-------|
| < 20% | 50% |
| 20-79% | 65% |
| ≥ 80% | 100% |

**Taxable Income Limitation:**
• DRD cannot exceed % × Taxable income (before DRD, NOL, capital loss carryback)
• EXCEPTION: If DRD creates/increases NOL, no limitation

**Purpose:** Reduce triple taxation on intercorporate dividends`,
    difficulty: 'medium',
    tags: ['DRD', 'C corp', 'dividends'],
    reference: 'IRC §243',
  },
  {
    id: 'reg-b3-fc-007',
    section: 'REG',
    type: 'concept',
    topic: 'Ethics',
    subtopic: 'Circular 230',
    blueprintArea: 'REG-I',
    front: 'What are the key Circular 230 practitioner requirements?',
    back: `**Circular 230 Requirements:**

**Due Diligence:**
• Cannot sign return with known false information
• Must make reasonable inquiry if info appears incorrect

**Tax Return Positions:**
• Undisclosed: Substantial authority (40%+)
• Disclosed: Reasonable basis (20%+)
• Tax shelters: More-likely-than-not (>50%)

**Written Advice Standards:**
• Consider all relevant facts
• Cannot consider audit likelihood
• Cannot assume favorable resolution

**Penalties:**
• Censure, suspension, disbarment
• Monetary penalties possible`,
    difficulty: 'hard',
    tags: ['Circular 230', 'ethics', 'practitioner'],
    reference: '31 CFR Part 10',
  },
  {
    id: 'reg-b3-fc-008',
    section: 'REG',
    type: 'concept',
    topic: 'Entity Selection',
    subtopic: 'Check-the-Box',
    blueprintArea: 'REG-V',
    front: 'How does check-the-box entity classification work?',
    back: `**Check-the-Box Rules (Form 8832):**

**Default Classification:**
• Single-member LLC: Disregarded entity
• Multi-member LLC: Partnership
• Corporation: C corporation

**Elections Available:**
• LLC → Partnership or Corporation
• Partnership → Corporation (can't reverse easily)
• Corporation → S corp (separate Form 2553)

**Cannot Elect:**
• Per se corporations (Inc., Corp., Ltd.)
• Publicly traded partnerships (treated as corp)

File Form 8832 within 75 days of desired effective date (or retroactive up to 3 years with reason).`,
    difficulty: 'medium',
    tags: ['entity classification', 'check-the-box', 'LLC'],
    reference: 'Treas. Reg. §301.7701-3',
  },
  {
    id: 'reg-b3-fc-009',
    section: 'REG',
    type: 'formula',
    topic: 'Estate Tax',
    subtopic: 'Gross Estate',
    blueprintArea: 'REG-IV',
    front: 'What is included in the gross estate?',
    back: `**Gross Estate Inclusions:**

• FMV of property owned at death
• Life insurance (if deceased owned policy or had incidents of ownership)
• Jointly held property (% based on contribution)
• Revocable trusts
• General powers of appointment
• Property transferred within 3 years (life insurance, retained interests)
• QTIP property from prior deceased spouse

**Deductions from Gross Estate:**
• Debts and expenses
• Marital deduction (unlimited to citizen spouse)
• Charitable deduction
• State death taxes (limited)

**Taxable Estate = Gross Estate − Deductions**`,
    difficulty: 'hard',
    tags: ['estate tax', 'gross estate', 'inclusions'],
    reference: 'IRC §2031-2044',
  },
  {
    id: 'reg-b3-fc-010',
    section: 'REG',
    type: 'concept',
    topic: 'Business Law',
    subtopic: 'Agency',
    blueprintArea: 'REG-II',
    front: 'When is a principal liable for agent actions?',
    back: `**Principal Liability:**

**For Contracts:**
• Actual authority (express or implied)
• Apparent authority (principal's representations)
• Ratification (after the fact)

**For Torts (Respondeat Superior):**
• Agent is employee (not independent contractor)
• Acting within scope of employment
• Frolic (personal detour) = Generally no liability

**Undisclosed Principal:**
• Agent liable on contract
• Principal liable if later disclosed
• Third party can choose to hold either liable

**Key:** Principal cannot escape liability by authorizing illegal acts.`,
    difficulty: 'medium',
    tags: ['agency', 'principal liability', 'respondeat superior'],
    reference: 'Restatement (Third) of Agency',
  }
];

// ==========================================
// BAR BATCH 3 FLASHCARDS  
// ==========================================
export const BAR_BATCH3_FLASHCARDS: Flashcard[] = [
  {
    id: 'bar-b3-fc-001',
    section: 'BAR',
    type: 'formula',
    topic: 'Financial Analysis',
    subtopic: 'DuPont Analysis',
    blueprintArea: 'BAR-I',
    front: 'What is the DuPont formula for ROE?',
    back: `**DuPont Analysis (3-Factor):**

ROE = Profit Margin × Asset Turnover × Equity Multiplier

**Components:**
• Profit Margin = Net Income / Sales
• Asset Turnover = Sales / Total Assets
• Equity Multiplier = Total Assets / Equity (= 1 + D/E)

**5-Factor DuPont:**
Adds Tax Burden and Interest Burden

**Insights:**
• High margin, low turnover = Luxury goods
• Low margin, high turnover = Retail
• High multiplier = More leverage/risk`,
    difficulty: 'medium',
    tags: ['DuPont', 'ROE', 'ratio analysis'],
    reference: 'Financial Analysis',
  },
  {
    id: 'bar-b3-fc-002',
    section: 'BAR',
    type: 'formula',
    topic: 'Cost Accounting',
    subtopic: 'EOQ Model',
    blueprintArea: 'BAR-I',
    front: 'What is the Economic Order Quantity formula?',
    back: `**EOQ Formula:**

EOQ = √(2DS / H)

**Where:**
• D = Annual demand (units)
• S = Ordering cost per order
• H = Holding cost per unit per year

**Assumptions:**
• Constant demand
• Constant lead time
• Instant replenishment
• No quantity discounts

**Related Formulas:**
• Number of orders = D / EOQ
• Average inventory = EOQ / 2
• Total cost = (D/Q × S) + (Q/2 × H)`,
    difficulty: 'medium',
    tags: ['EOQ', 'inventory', 'cost management'],
    reference: 'Cost Management',
  },
  {
    id: 'bar-b3-fc-003',
    section: 'BAR',
    type: 'formula',
    topic: 'Capital Budgeting',
    subtopic: 'WACC',
    blueprintArea: 'BAR-I',
    front: 'How do you calculate Weighted Average Cost of Capital?',
    back: `**WACC Formula:**

WACC = (E/V × Re) + (D/V × Rd × (1-T))

**Where:**
• E = Market value of equity
• D = Market value of debt
• V = E + D (total value)
• Re = Cost of equity
• Rd = Cost of debt
• T = Tax rate

**Cost of Equity (CAPM):**
Re = Rf + β(Rm - Rf)

**Key Points:**
• Use market values, not book
• After-tax cost of debt (interest is deductible)
• WACC = Minimum required return for projects`,
    difficulty: 'hard',
    tags: ['WACC', 'cost of capital', 'CAPM'],
    reference: 'Corporate Finance',
  },
  {
    id: 'bar-b3-fc-004',
    section: 'BAR',
    type: 'concept',
    topic: 'Consolidations',
    subtopic: 'NCI',
    blueprintArea: 'BAR-II',
    front: 'How is noncontrolling interest (NCI) reported?',
    back: `**Noncontrolling Interest (NCI):**

**Balance Sheet:**
• Reported in equity section (separately from parent's equity)
• Includes NCI share of subsidiary's equity

**Income Statement:**
• Consolidated net income includes 100% of sub
• NCI's share of net income shown as allocation
• "Net income attributable to NCI"

**Calculation:**
NCI % × Subsidiary's net income = NCI share

**Changes:**
• Sub dividends reduce NCI
• NCI shares in subsidiary income/loss

**Key:** Control = 50%+, but consolidate 100%`,
    difficulty: 'hard',
    tags: ['NCI', 'consolidation', 'minority interest'],
    reference: 'ASC 810-10-45',
  },
  {
    id: 'bar-b3-fc-005',
    section: 'BAR',
    type: 'concept',
    topic: 'Government Accounting',
    subtopic: 'Governmental vs Proprietary',
    blueprintArea: 'BAR-III',
    front: 'How do governmental and proprietary funds differ?',
    back: `**Governmental Funds:**
• Focus: Current financial resources
• Basis: Modified accrual
• Funds: General, Special Revenue, Debt Service, Capital Projects, Permanent
• Expenditures, not expenses

**Proprietary Funds:**
• Focus: Economic resources (like business)
• Basis: Full accrual
• Funds: Enterprise (external), Internal Service (internal)
• Expenses, not expenditures

**Key Differences:**
| Feature | Governmental | Proprietary |
|---------|--------------|-------------|
| Capital assets | Not reported | Reported |
| Long-term debt | Not reported | Reported |
| Depreciation | No | Yes |`,
    difficulty: 'medium',
    tags: ['governmental', 'proprietary', 'fund accounting'],
    reference: 'GASB 34',
  },
  {
    id: 'bar-b3-fc-006',
    section: 'BAR',
    type: 'formula',
    topic: 'Variance Analysis',
    subtopic: 'Overhead Variances',
    blueprintArea: 'BAR-I',
    front: 'How are fixed overhead variances calculated?',
    back: `**Fixed Overhead Variances:**

**Budget (Spending) Variance:**
Actual FOH − Budgeted FOH
(Actual cost vs what we expected to spend)

**Volume Variance:**
Budgeted FOH − Applied FOH
= Budget − (Standard rate × Standard hours allowed)
(Measures capacity utilization)

**Applied FOH:**
Standard rate = Budgeted FOH / Budgeted hours
Applied = Standard rate × Actual hours allowed for output

**Key:** 
• Budget variance = Spending control
• Volume variance = Capacity utilization`,
    difficulty: 'hard',
    tags: ['variance', 'overhead', 'fixed costs'],
    reference: 'Cost Accounting',
  },
  {
    id: 'bar-b3-fc-007',
    section: 'BAR',
    type: 'concept',
    topic: 'NFP',
    subtopic: 'Statement Requirements',
    blueprintArea: 'BAR-IV',
    front: 'What financial statements are required for NFPs?',
    back: `**NFP Required Statements (ASU 2016-14):**

1. **Statement of Financial Position**
   • Similar to balance sheet
   • Net assets: With/without donor restrictions

2. **Statement of Activities**
   • Changes in net assets
   • Revenues, expenses, gains, losses

3. **Statement of Cash Flows**
   • Same as for-profit (direct or indirect)

4. **Statement of Functional Expenses**
   • Required for voluntary health & welfare
   • Recommended for others
   • Nature (salaries, rent) AND function (program, admin, fundraising)

**Notes must include liquidity/availability of resources disclosure.**`,
    difficulty: 'medium',
    tags: ['NFP', 'financial statements', 'ASU 2016-14'],
    reference: 'ASC 958-205',
  },
  {
    id: 'bar-b3-fc-008',
    section: 'BAR',
    type: 'concept',
    topic: 'Budgeting',
    subtopic: 'Flexible Budgets',
    blueprintArea: 'BAR-I',
    front: 'How does a flexible budget differ from a static budget?',
    back: `**Static Budget:**
• Prepared for ONE level of activity
• Does not adjust for actual volume
• Variances mix volume and efficiency effects

**Flexible Budget:**
• Adjusts for ACTUAL activity level
• Revenue and variable costs flex with volume
• Fixed costs remain constant
• Isolates efficiency from volume variances

**Flexible Budget Formula:**
Revenue: Actual units × Budgeted price
Variable costs: Actual units × Standard variable cost
Fixed costs: Original budget (no change)

**Flexible Budget Variance = Actual − Flexible Budget
(Measures efficiency/spending)`,
    difficulty: 'medium',
    tags: ['flexible budget', 'static budget', 'variance'],
    reference: 'Management Accounting',
  },
  {
    id: 'bar-b3-fc-009',
    section: 'BAR',
    type: 'formula',
    topic: 'Working Capital',
    subtopic: 'Cash Conversion Cycle',
    blueprintArea: 'BAR-I',
    front: 'What is the Cash Conversion Cycle?',
    back: `**Cash Conversion Cycle (CCC):**

CCC = DIO + DSO − DPO

**Components:**
• DIO = Days Inventory Outstanding = (Inventory / COGS) × 365
• DSO = Days Sales Outstanding = (AR / Sales) × 365
• DPO = Days Payables Outstanding = (AP / COGS) × 365

**Interpretation:**
• Lower CCC = Better (cash tied up for less time)
• Negative CCC = Collect before paying suppliers (ideal)

**Example:**
DIO = 45, DSO = 30, DPO = 40
CCC = 45 + 30 − 40 = 35 days`,
    difficulty: 'medium',
    tags: ['cash conversion cycle', 'working capital', 'liquidity'],
    reference: 'Financial Management',
  },
  {
    id: 'bar-b3-fc-010',
    section: 'BAR',
    type: 'concept',
    topic: 'Segment Reporting',
    subtopic: 'Reportable Segments',
    blueprintArea: 'BAR-II',
    front: 'When is a segment reportable under ASC 280?',
    back: `**Reportable Segment Tests (10% Tests):**

A segment is reportable if it meets ANY:

1. **Revenue Test:** ≥ 10% of combined revenue (internal + external)

2. **Profit/Loss Test:** ≥ 10% of greater of:
   • Combined profit of profitable segments, OR
   • Combined loss of loss segments (absolute values)

3. **Asset Test:** ≥ 10% of combined assets

**75% Test:**
Combined external revenue of reportable segments must be ≥ 75% of total consolidated revenue. If not, add more segments.

**Required Disclosures:**
Revenues, profit/loss, assets, plus reconciliation to consolidated amounts.`,
    difficulty: 'medium',
    tags: ['segment reporting', 'ASC 280', 'disclosure'],
    reference: 'ASC 280-10-50',
  }
];

// ==========================================
// ISC BATCH 3 FLASHCARDS
// ==========================================
export const ISC_BATCH3_FLASHCARDS: Flashcard[] = [
  {
    id: 'isc-b3-fc-001',
    section: 'ISC',
    type: 'concept',
    topic: 'IT Controls',
    subtopic: 'ITGCs vs Application Controls',
    blueprintArea: 'ISC-I',
    front: 'What is the difference between ITGCs and application controls?',
    back: `**IT General Controls (ITGCs):**
• Pervasive across all applications
• Access controls, change management, operations, SDLC
• If ITGCs weak, can't rely on application controls
• Foundation for control environment

**Application Controls:**
• Specific to individual applications
• Input controls (validation, edits)
• Processing controls (calculations)
• Output controls (distribution, reconciliation)

**Relationship:**
ITGC weakness → All dependent app controls suspect
App control weakness → Only that control affected`,
    difficulty: 'medium',
    tags: ['ITGC', 'application controls', 'IT audit'],
    reference: 'COBIT, AU-C 315',
  },
  {
    id: 'isc-b3-fc-002',
    section: 'ISC',
    type: 'concept',
    topic: 'SOC Reports',
    subtopic: 'SOC 1 vs SOC 2',
    blueprintArea: 'ISC-III',
    front: 'What is the difference between SOC 1 and SOC 2 reports?',
    back: `**SOC 1:**
• Purpose: User auditor's ICFR assessment
• Scope: Controls relevant to financial reporting
• Users: User entity auditors and management
• Criteria: Control objectives by service org

**SOC 2:**
• Purpose: Trust services evaluation
• Scope: Security, Availability, Processing Integrity, Confidentiality, Privacy
• Users: Management, regulators, stakeholders
• Criteria: AICPA Trust Services Criteria

**SOC 3:**
• SOC 2 summary for public distribution
• General use report
• Less detail, more accessible

**Type 1:** Point in time (design)
**Type 2:** Period of time (operating effectiveness)`,
    difficulty: 'hard',
    tags: ['SOC 1', 'SOC 2', 'service organization'],
    reference: 'AT-C 320, AT-C 205',
  },
  {
    id: 'isc-b3-fc-003',
    section: 'ISC',
    type: 'concept',
    topic: 'Security',
    subtopic: 'Authentication Factors',
    blueprintArea: 'ISC-II',
    front: 'What are the three authentication factors?',
    back: `**Authentication Factors:**

1. **Something You Know**
   • Password, PIN, security questions
   • Weakest factor (can be shared, guessed)

2. **Something You Have**
   • Token, smart card, phone (for OTP)
   • Can be lost or stolen

3. **Something You Are**
   • Biometrics: fingerprint, face, iris
   • Most difficult to replicate
   • Privacy concerns

**Multi-Factor Authentication (MFA):**
Uses 2+ different factors (not just 2 passwords)
Required for privileged access, remote access

**Example:** Password (know) + Phone OTP (have) = 2FA`,
    mnemonic: 'Know, Have, Are',
    difficulty: 'medium',
    tags: ['authentication', 'MFA', 'access control'],
    reference: 'NIST SP 800-63',
  },
  {
    id: 'isc-b3-fc-004',
    section: 'ISC',
    type: 'concept',
    topic: 'Data Management',
    subtopic: 'Encryption Types',
    blueprintArea: 'ISC-II',
    front: 'What is the difference between symmetric and asymmetric encryption?',
    back: `**Symmetric Encryption:**
• Same key for encrypt and decrypt
• Fast, efficient for large data
• Key distribution problem
• Examples: AES, DES, 3DES

**Asymmetric Encryption:**
• Public key (encrypt) + Private key (decrypt)
• Slower, more computationally intensive
• Solves key distribution
• Examples: RSA, ECC

**Common Usage:**
• Asymmetric to exchange symmetric key
• Symmetric for bulk data encryption
• Hybrid approach (HTTPS, TLS)

**Digital Signature:**
Sign with private key, verify with public key
(Provides authentication + non-repudiation)`,
    difficulty: 'medium',
    tags: ['encryption', 'symmetric', 'asymmetric'],
    reference: 'Cryptography Standards',
  },
  {
    id: 'isc-b3-fc-005',
    section: 'ISC',
    type: 'concept',
    topic: 'Business Continuity',
    subtopic: 'RPO and RTO',
    blueprintArea: 'ISC-II',
    front: 'What are RPO and RTO?',
    back: `**Recovery Point Objective (RPO):**
• Maximum acceptable data LOSS
• "How much data can we afford to lose?"
• Drives backup frequency
• RPO of 4 hours = Backup every 4 hours or less

**Recovery Time Objective (RTO):**
• Maximum acceptable DOWNTIME
• "How quickly must we recover?"
• Drives recovery infrastructure
• RTO of 2 hours = Must be operational within 2 hours

**Relationship:**
• Lower RPO = More frequent backups = Higher cost
• Lower RTO = Faster recovery = Higher cost
• Hot site < Warm site < Cold site (RTO)

Critical systems: Low RPO and RTO`,
    difficulty: 'medium',
    tags: ['RPO', 'RTO', 'disaster recovery'],
    reference: 'Business Continuity Standards',
  },
  {
    id: 'isc-b3-fc-006',
    section: 'ISC',
    type: 'concept',
    topic: 'Risk Management',
    subtopic: 'Risk Treatment Options',
    blueprintArea: 'ISC-II',
    front: 'What are the four risk treatment options?',
    back: `**Risk Treatment Options (TARA):**

1. **T**ransfer
   • Shift risk to third party
   • Insurance, outsourcing
   • Doesn't eliminate risk entirely

2. **A**ccept
   • Acknowledge risk without action
   • When cost > benefit to mitigate
   • Document acceptance decision

3. **R**educe/Mitigate
   • Implement controls
   • Reduce likelihood or impact
   • Most common approach

4. **A**void
   • Eliminate the activity causing risk
   • Exit market, discontinue product
   • Not always possible

**Residual risk = Risk after treatment**`,
    mnemonic: 'TARA: Transfer, Accept, Reduce, Avoid',
    difficulty: 'medium',
    tags: ['risk treatment', 'risk management', 'mitigation'],
    reference: 'ISO 31000, NIST RMF',
  },
  {
    id: 'isc-b3-fc-007',
    section: 'ISC',
    type: 'concept',
    topic: 'Network Security',
    subtopic: 'Defense in Depth',
    blueprintArea: 'ISC-II',
    front: 'What is defense in depth?',
    back: `**Defense in Depth:**

Multiple security layers so compromise of one doesn't mean total breach.

**Common Layers:**
1. **Physical:** Locks, badges, cameras
2. **Network:** Firewalls, IDS/IPS, segmentation
3. **Host:** Antivirus, host firewall, patching
4. **Application:** Input validation, WAF, code review
5. **Data:** Encryption, DLP, access controls
6. **Administrative:** Policies, training, awareness

**Principle:** No single point of failure

**Example:** Attacker bypasses firewall but still faces endpoint protection, then must overcome access controls, then encryption on data.`,
    difficulty: 'medium',
    tags: ['defense in depth', 'layered security', 'network'],
    reference: 'NIST Cybersecurity Framework',
  },
  {
    id: 'isc-b3-fc-008',
    section: 'ISC',
    type: 'concept',
    topic: 'SDLC',
    subtopic: 'Secure Development',
    blueprintArea: 'ISC-I',
    front: 'What security practices should be in the SDLC?',
    back: `**Secure SDLC Practices:**

**Requirements:**
• Security requirements defined
• Threat modeling

**Design:**
• Secure architecture patterns
• Data flow diagrams with trust boundaries

**Development:**
• Secure coding standards
• Static analysis (SAST)
• Code review

**Testing:**
• Dynamic testing (DAST)
• Penetration testing
• Security unit tests

**Deployment:**
• Configuration hardening
• Secrets management
• Infrastructure as Code

**Maintenance:**
• Vulnerability management
• Security patches
• Software Composition Analysis (SCA) for libraries`,
    difficulty: 'hard',
    tags: ['secure SDLC', 'DevSecOps', 'development'],
    reference: 'OWASP, NIST SSDF',
  },
  {
    id: 'isc-b3-fc-009',
    section: 'ISC',
    type: 'concept',
    topic: 'Incident Response',
    subtopic: 'IR Phases',
    blueprintArea: 'ISC-II',
    front: 'What are the phases of incident response?',
    back: `**Incident Response Phases (PICERL):**

1. **P**reparation
   • Create IR plan, form team
   • Tools, training, tabletop exercises

2. **I**dentification
   • Detect and analyze incidents
   • Determine scope and severity

3. **C**ontainment
   • Limit damage (short and long-term)
   • Isolate affected systems

4. **E**radication
   • Remove threat from environment
   • Patch vulnerabilities, remove malware

5. **R**ecovery
   • Restore systems to normal
   • Monitor for persistence

6. **L**essons Learned
   • Post-incident review
   • Update procedures, improve controls`,
    mnemonic: 'PICERL: Preparation, Identification, Containment, Eradication, Recovery, Lessons',
    difficulty: 'medium',
    tags: ['incident response', 'PICERL', 'security'],
    reference: 'NIST SP 800-61',
  },
  {
    id: 'isc-b3-fc-010',
    section: 'ISC',
    type: 'concept',
    topic: 'Privacy',
    subtopic: 'Privacy Principles',
    blueprintArea: 'ISC-II',
    front: 'What are the key data privacy principles?',
    back: `**Privacy Principles (GAPP/AICPA):**

1. **Notice** - Inform individuals about collection
2. **Choice/Consent** - Opt-in/out options
3. **Collection** - Only what's needed (minimization)
4. **Use/Retention** - Limited to stated purposes
5. **Access** - Individuals can review their data
6. **Disclosure** - Shared only as described
7. **Security** - Protected from unauthorized access
8. **Quality** - Accurate and complete
9. **Monitoring** - Ongoing compliance
10. **Management** - Accountability and governance

**GDPR Rights:** Access, rectification, erasure ("right to be forgotten"), portability, objection`,
    difficulty: 'medium',
    tags: ['privacy', 'GAPP', 'GDPR'],
    reference: 'AICPA GAPP, GDPR',
  }
];

// ==========================================
// TCP BATCH 3 FLASHCARDS
// ==========================================
export const TCP_BATCH3_FLASHCARDS: Flashcard[] = [
  {
    id: 'tcp-b3-fc-001',
    section: 'TCP',
    type: 'formula',
    topic: 'Individual Tax',
    subtopic: 'AMT',
    blueprintArea: 'TCP-I',
    front: 'How is Alternative Minimum Tax calculated?',
    back: `**AMT Calculation:**

1. Start with Taxable Income
2. Add back AMT adjustments:
   • State/local taxes
   • Misc itemized deductions
   • Personal exemptions
   • Standard deduction (if taken)
3. Add AMT preferences:
   • Private activity bond interest
   • Certain depreciation
4. = Alternative Minimum Taxable Income (AMTI)
5. − AMT Exemption
6. = AMT Base × 26%/28%
7. = Tentative Minimum Tax
8. AMT = TMT − Regular Tax (if positive)

**Exemptions phase out at high income**`,
    difficulty: 'hard',
    tags: ['AMT', 'alternative minimum tax', 'individual'],
    reference: 'IRC §55-59',
  },
  {
    id: 'tcp-b3-fc-002',
    section: 'TCP',
    type: 'formula',
    topic: 'Partnership Tax',
    subtopic: 'Partner Basis',
    blueprintArea: 'TCP-II',
    front: 'How is a partner\'s outside basis calculated?',
    back: `**Partner Outside Basis:**

**Initial Basis:**
Cash contributed + FMV of property contributed − Liabilities assumed by partnership

**Annual Adjustments (increases):**
+ Share of partnership income
+ Share of tax-exempt income
+ Share of liabilities (recourse to extent at risk; nonrecourse by profit %)

**Annual Adjustments (decreases):**
− Share of losses (limited to basis)
− Distributions received
− Share of nondeductible expenses
− Reduction in share of liabilities

**Key:** Basis cannot go below zero; excess losses suspended`,
    difficulty: 'hard',
    tags: ['partnership', 'basis', 'outside basis'],
    reference: 'IRC §722, 752',
  },
  {
    id: 'tcp-b3-fc-003',
    section: 'TCP',
    type: 'concept',
    topic: 'Tax Planning',
    subtopic: 'Charitable Planning',
    blueprintArea: 'TCP-I',
    front: 'What are the AGI limits for charitable contribution deductions?',
    back: `**Charitable AGI Limits:**

**Cash to Public Charities:** 60% AGI
**Appreciated Property (LTCG) to Public:** 30% AGI
**Cash to Private Foundations:** 30% AGI
**Appreciated Property to Private:** 20% AGI

**If elect to reduce FMV by appreciation:**
Can use higher % limit (60%/50%)

**Carryforward:** 5 years for excess

**Special Property:**
• Ordinary income property: Deduct basis only
• Related use rule for tangible property
• Qualified conservation contributions: Enhanced limits`,
    difficulty: 'hard',
    tags: ['charitable', 'AGI limits', 'contributions'],
    reference: 'IRC §170',
  },
  {
    id: 'tcp-b3-fc-004',
    section: 'TCP',
    type: 'formula',
    topic: 'Corporate Tax',
    subtopic: 'Accumulated Earnings Tax',
    blueprintArea: 'TCP-II',
    front: 'When does the Accumulated Earnings Tax apply?',
    back: `**Accumulated Earnings Tax:**

Applies when: C corp accumulates earnings beyond reasonable business needs to avoid shareholder tax

**Tax Rate:** 20% (same as qualified dividends)

**Accumulated Taxable Income:**
Taxable income
− Federal income tax
− Dividends paid deduction
− Accumulated earnings credit (greater of $250K or reasonable needs)
= Accumulated taxable income × 20%

**Reasonable Needs:**
• Business expansion
• Debt retirement
• Working capital
• Specific, definite plans required

**Key:** Burden of proof on IRS; intent to avoid dividend tax required`,
    difficulty: 'hard',
    tags: ['accumulated earnings', 'C corp', 'penalty tax'],
    reference: 'IRC §531-537',
  },
  {
    id: 'tcp-b3-fc-005',
    section: 'TCP',
    type: 'concept',
    topic: 'Estate Planning',
    subtopic: 'Unified Credit',
    blueprintArea: 'TCP-IV',
    front: 'What is the unified credit and applicable exclusion amount?',
    back: `**Unified Credit (2024):**

**Applicable Exclusion:** $13.61 million per person (indexed)
**Unified Credit:** Tax on first $13.61M

**Applies to:**
• Lifetime gifts (gift tax)
• Estate at death (estate tax)
• Combined/cumulative

**How it works:**
• Taxable gifts reduce available exclusion at death
• File Form 706 if gross estate + adjusted taxable gifts > exclusion

**Portability:**
• Unused exclusion transfers to surviving spouse
• Must file estate tax return to elect
• "DSUE" - Deceased Spousal Unused Exclusion

**Note:** Exclusion scheduled to decrease to ~$6-7M after 2025 (sunset)`,
    difficulty: 'hard',
    tags: ['unified credit', 'estate tax', 'exclusion'],
    reference: 'IRC §2010',
  },
  {
    id: 'tcp-b3-fc-006',
    section: 'TCP',
    type: 'concept',
    topic: 'International Tax',
    subtopic: 'GILTI',
    blueprintArea: 'TCP-III',
    front: 'What is GILTI and how is it taxed?',
    back: `**Global Intangible Low-Taxed Income:**

**Who:** US shareholders of CFCs (≥10% ownership)

**What:** CFC income exceeding 10% return on tangible assets

**Formula:**
GILTI = Net CFC tested income − (10% × QBAI) − Interest expense

**Deductions:**
• Corporate shareholders: 50% deduction (37.5% after 2025)
• Results in ~10.5% effective rate

**Foreign Tax Credit:**
• 80% of foreign taxes paid included
• Reduces US tax on GILTI

**Key:** Designed to capture excess returns from intangibles held offshore`,
    difficulty: 'hard',
    tags: ['GILTI', 'international', 'CFC'],
    reference: 'IRC §951A',
  },
  {
    id: 'tcp-b3-fc-007',
    section: 'TCP',
    type: 'formula',
    topic: 'Property Transactions',
    subtopic: 'Installment Sale',
    blueprintArea: 'TCP-I',
    front: 'How is gain recognized on an installment sale?',
    back: `**Installment Sale Method:**

**Gross Profit Ratio:**
(Selling Price − Basis − Expenses) / Contract Price

**Recognition:**
Each payment × GP Ratio = Recognized gain

**Contract Price =**
Selling price − Assumed mortgages (if > basis)

**Not Eligible:**
• Inventory, dealer property
• Depreciation recapture (recognized in year 1)
• Related party sales (2 years)

**Interest:**
• Must charge adequate interest
• Imputed interest if below AFR
• Report interest as ordinary income separately`,
    difficulty: 'medium',
    tags: ['installment sale', 'deferral', '§453'],
    reference: 'IRC §453',
  },
  {
    id: 'tcp-b3-fc-008',
    section: 'TCP',
    type: 'concept',
    topic: 'Entity Planning',
    subtopic: 'S Corp Requirements',
    blueprintArea: 'TCP-II',
    front: 'What are the requirements for S corporation status?',
    back: `**S Corporation Requirements:**

**Entity Type:**
• Domestic corporation
• Not ineligible (banks, insurance)

**Shareholders:**
• ≤ 100 shareholders (family = 1)
• Individuals, estates, certain trusts
• NO partnerships, corporations, NRAs
• All must consent to election

**Stock:**
• One class of stock only
• Voting differences OK
• NO preferred stock

**Filing:**
• Form 2553 by 15th day of 3rd month
• Or any time in prior year

**Termination:** Violate requirements, revoke, passive investment income >25% for 3 years`,
    difficulty: 'medium',
    tags: ['S corp', 'requirements', 'election'],
    reference: 'IRC §1361-1362',
  },
  {
    id: 'tcp-b3-fc-009',
    section: 'TCP',
    type: 'formula',
    topic: 'Trust Taxation',
    subtopic: 'DNI',
    blueprintArea: 'TCP-IV',
    front: 'What is Distributable Net Income (DNI)?',
    back: `**Distributable Net Income (DNI):**

Purpose: Limits deduction for trust; limits taxable income to beneficiary

**Calculation:**
Taxable income of trust
+ Tax-exempt interest (net of allocable expenses)
+ Personal exemption
− Capital gains allocated to corpus
= DNI

**Key Functions:**
1. Maximum distribution deduction for trust
2. Maximum taxable to beneficiary
3. Determines character of income (flows through)

**Simple Trust:** Must distribute all current income; DNI fully taxed to beneficiary
**Complex Trust:** May accumulate; DNI taxed to extent distributed`,
    difficulty: 'hard',
    tags: ['DNI', 'trust', 'fiduciary'],
    reference: 'IRC §643',
  },
  {
    id: 'tcp-b3-fc-010',
    section: 'TCP',
    type: 'concept',
    topic: 'Tax Credits',
    subtopic: 'R&D Credit',
    blueprintArea: 'TCP-II',
    front: 'How does the Research & Development Tax Credit work?',
    back: `**R&D Tax Credit (§41):**

**Qualifying Activities (4-Part Test):**
1. Permitted purpose (new/improved function, performance, reliability, quality)
2. Technological uncertainty
3. Process of experimentation
4. Technological in nature

**Qualified Research Expenses:**
• Wages for research activities
• Supplies used in research
• Contract research (65%)

**Credit Calculation:**
• Regular Credit: 20% × (Current QRE − Base amount)
• Alternative Simplified: 14% × (Current QRE − 50% of avg prior 3 years)

**Small Business (<$50M revenue):**
• Can offset AMT
• Can offset payroll tax (up to $500K)`,
    difficulty: 'hard',
    tags: ['R&D credit', 'research', 'tax credit'],
    reference: 'IRC §41',
  }
];

// Export all batch 3 flashcards
export const ALL_BATCH3_FLASHCARDS: Flashcard[] = [
  ...FAR_BATCH3_FLASHCARDS,
  ...AUD_BATCH3_FLASHCARDS,
  ...REG_BATCH3_FLASHCARDS,
  ...BAR_BATCH3_FLASHCARDS,
  ...ISC_BATCH3_FLASHCARDS,
  ...TCP_BATCH3_FLASHCARDS,
];

export default ALL_BATCH3_FLASHCARDS;

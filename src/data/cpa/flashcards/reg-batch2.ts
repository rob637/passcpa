/**
 * CPA Flashcards - Batch 2 (REG Section)
 * Additional flashcards for Regulation
 * 
 * Covers: Individual taxation, business entities, property transactions, ethics
 */

import { Flashcard } from './types';

export const REG_BATCH2_FLASHCARDS: Flashcard[] = [
  // ==========================================
  // INDIVIDUAL TAXATION
  // ==========================================
  {
    id: 'reg-b2-001',
    section: 'REG',
    type: 'formula',
    topic: 'Individual Taxation',
    blueprintArea: 'REG-III',
    front: 'What is the formula for TAXABLE INCOME (individual)?',
    back: `Gross Income
- Adjustments (above-the-line deductions)
= Adjusted Gross Income (AGI)
- Standard Deduction OR Itemized Deductions
- Qualified Business Income Deduction (Section 199A)
= TAXABLE INCOME`,
    formula: 'Taxable Income = AGI - (Std or Itemized) - QBI Deduction',
    difficulty: 'easy',
    tags: ['taxation', 'individual', 'income'],
    reference: 'IRC Section 63',
  },
  {
    id: 'reg-b2-002',
    section: 'REG',
    type: 'rule',
    topic: 'Individual Taxation',
    blueprintArea: 'REG-III',
    front: 'What are above-the-line ADJUSTMENTS to income?',
    back: `**Key Adjustments (reduce AGI):**
- Traditional IRA contributions
- Student loan interest (max $2,500)
- Self-employed health insurance
- Self-employment tax (50%)
- HSA contributions
- Alimony paid (pre-2019 divorces only)
- Educator expenses ($300)
- Moving expenses (military only)
- SEP/SIMPLE contributions`,
    mnemonic: 'SHAMES: Student loan, HSA, Alimony, Moving, Educator, Self-employment',
    difficulty: 'medium',
    tags: ['adjustments', 'above-the-line', 'AGI'],
    reference: 'IRC Section 62',
  },
  {
    id: 'reg-b2-003',
    section: 'REG',
    type: 'rule',
    topic: 'Individual Taxation',
    blueprintArea: 'REG-III',
    front: 'What items are included in GROSS INCOME?',
    back: `**Taxable (Included):**
- Wages, salaries, tips
- Interest & dividends
- Business income
- Capital gains
- Alimony received (pre-2019)
- Rental income
- Gambling winnings
- Unemployment compensation
- Forgiven debt (generally)

**NOT Included:**
- Life insurance proceeds (death)
- Gifts/inheritances
- Municipal bond interest
- Child support received`,
    difficulty: 'medium',
    tags: ['gross income', 'inclusions', 'exclusions'],
    reference: 'IRC Section 61, 101-140',
  },
  {
    id: 'reg-b2-004',
    section: 'REG',
    type: 'comparison',
    topic: 'Individual Taxation',
    blueprintArea: 'REG-III',
    front: 'Standard Deduction vs. Itemized Deductions?',
    back: `**Standard Deduction (2026):**
- Single: $15,200
- MFJ: $30,750
- HoH: $22,500
- Additional for 65+/blind

**Itemized Deductions:**
- Medical (>7.5% AGI)
- SALT (capped at $10,000)
- Mortgage interest
- Charitable contributions
- Casualty losses (disaster only)

**Use:** Higher of standard OR itemized`,
    difficulty: 'medium',
    tags: ['deductions', 'standard', 'itemized'],
    reference: 'IRC Sections 63, 161-199A',
  },
  {
    id: 'reg-b2-005',
    section: 'REG',
    type: 'formula',
    topic: 'Individual Taxation',
    blueprintArea: 'REG-III',
    front: 'How is SECTION 199A QBI deduction calculated?',
    back: `**Basic Calculation:**
20% of Qualified Business Income from pass-through entities

**Limitations (high income):**
- W-2 wage limitation: 50% of W-2 wages, OR
- 25% of W-2 wages + 2.5% of UBIA of property

**Phase-outs for SSTB:**
Single: $191,950-$241,950
MFJ: $383,900-$483,900

**Overall limit:** 20% of taxable income (less LTCG)`,
    formula: 'QBI Deduction = Lesser of: 20% QBI OR 20% (Taxable Income - Net Capital Gains)',
    difficulty: 'hard',
    tags: ['199A', 'QBI', 'pass-through', 'deduction'],
    reference: 'IRC Section 199A',
  },
  // ==========================================
  // CAPITAL GAINS & PROPERTY
  // ==========================================
  {
    id: 'reg-b2-006',
    section: 'REG',
    type: 'rule',
    topic: 'Property Transactions',
    blueprintArea: 'REG-IV',
    front: 'What are the CAPITAL GAIN tax rates (2026)?',
    back: `**Long-Term Capital Gains (held > 1 year):**
- 0%: Up to $47,025 (single), $94,050 (MFJ)
- 15%: Up to $518,900 (single), $583,750 (MFJ)
- 20%: Above those amounts

**Plus 3.8% NIIT** if MAGI exceeds thresholds

**Short-Term Capital Gains:**
- Taxed at ordinary income rates

**Collectibles:** 28% max rate
**Unrecaptured Section 1250:** 25% max rate`,
    difficulty: 'medium',
    tags: ['capital gains', 'tax rates', 'LTCG', 'STCG'],
    reference: 'IRC Section 1(h)',
  },
  {
    id: 'reg-b2-007',
    section: 'REG',
    type: 'formula',
    topic: 'Property Transactions',
    blueprintArea: 'REG-IV',
    front: 'How do you calculate GAIN OR LOSS on property sale?',
    back: `Amount Realized
- Adjusted Basis
= Gain (or Loss)

**Amount Realized =**
Cash + FMV of property received + Liabilities relieved

**Adjusted Basis =**
Original cost + Capital improvements - Depreciation allowed`,
    formula: 'Gain/Loss = Amount Realized - Adjusted Basis',
    example: 'Sell for $150K, basis $100K, improvements $20K = $30K gain',
    difficulty: 'medium',
    tags: ['gain', 'loss', 'basis', 'amount realized'],
    reference: 'IRC Sections 1001, 1011-1016',
  },
  {
    id: 'reg-b2-008',
    section: 'REG',
    type: 'rule',
    topic: 'Property Transactions',
    blueprintArea: 'REG-IV',
    front: 'What is the Section 121 PRIMARY RESIDENCE exclusion?',
    back: `**Exclusion Amount:**
- Single: $250,000
- MFJ: $500,000

**Requirements:**
- Owned AND used as principal residence
- 2 of last 5 years before sale
- Not used exclusion in prior 2 years

**Partial exclusion** available for:
- Employment change
- Health reasons
- Unforeseen circumstances`,
    difficulty: 'medium',
    tags: ['Section 121', 'home sale', 'exclusion'],
    reference: 'IRC Section 121',
  },
  {
    id: 'reg-b2-009',
    section: 'REG',
    type: 'rule',
    topic: 'Property Transactions',
    blueprintArea: 'REG-IV',
    front: 'What is a SECTION 1031 Like-Kind Exchange?',
    back: `**Deferral of gain** on exchange of like-kind property

**Requirements:**
- Real property for real property (only, post-2018)
- Held for business or investment
- Must identify replacement in 45 days
- Must close within 180 days

**Boot:** Taxable to extent of gain
- Cash received
- Debt relief
- Unlike property received

**Cannot exchange:** Personal residence, inventory, stocks/bonds`,
    difficulty: 'hard',
    tags: ['1031', 'like-kind exchange', 'deferral'],
    reference: 'IRC Section 1031',
  },
  {
    id: 'reg-b2-010',
    section: 'REG',
    type: 'formula',
    topic: 'Property Transactions',
    blueprintArea: 'REG-IV',
    front: 'How do you calculate BASIS in a 1031 exchange?',
    back: `**Basis of New Property:**
FMV of new property
- Deferred gain

OR

Basis of old property
+ Boot paid
- Boot received
+ Gain recognized`,
    formula: 'New Basis = Old Basis + Gain Recognized + Boot Paid - Boot Received',
    example: 'Old basis $100K, FMV new $150K, boot paid $0, gain deferred $50K. New basis = $100K',
    difficulty: 'hard',
    tags: ['1031', 'basis', 'like-kind'],
    reference: 'IRC Section 1031(d)',
  },
  // ==========================================
  // BUSINESS ENTITIES
  // ==========================================
  {
    id: 'reg-b2-011',
    section: 'REG',
    type: 'comparison',
    topic: 'Business Entities',
    blueprintArea: 'REG-II',
    front: 'C Corporation vs. S Corporation taxation?',
    back: `**C Corporation:**
- Separate taxable entity (21% federal rate)
- Double taxation: Corp level + shareholder dividends
- Expenses deductible at entity level
- Can have unlimited shareholders, any type

**S Corporation:**
- Pass-through (no entity tax)
- Income/loss flows to shareholders
- Limited to 100 shareholders, individuals/trusts only
- One class of stock
- Must elect S status; maintain eligibility`,
    difficulty: 'medium',
    tags: ['C corp', 'S corp', 'entity', 'taxation'],
    reference: 'IRC Sections 11, 1361-1379',
  },
  {
    id: 'reg-b2-012',
    section: 'REG',
    type: 'formula',
    topic: 'Business Entities',
    blueprintArea: 'REG-II',
    front: 'How is S Corporation SHAREHOLDER BASIS calculated?',
    back: `Beginning Basis
+ Share of income
+ Share of tax-exempt income
+ Additional contributions
- Share of losses (limited to basis)
- Non-deductible expenses
- Distributions
= Ending Basis

**Ordering:** Income first, then distributions, then losses

**Cannot go below zero**`,
    formula: 'Ending Basis = Beginning + Income + Contributions - Distributions - Losses',
    difficulty: 'hard',
    tags: ['S corp', 'basis', 'shareholder'],
    reference: 'IRC Section 1367',
  },
  {
    id: 'reg-b2-013',
    section: 'REG',
    type: 'rule',
    topic: 'Business Entities',
    blueprintArea: 'REG-II',
    front: 'What are S Corporation ELIGIBILITY requirements?',
    back: `**S Corp Requirements:**
1. Domestic corporation
2. ≤ 100 shareholders (family = 1)
3. Shareholders: Individuals, estates, certain trusts
4. No nonresident alien shareholders
5. One class of stock (voting differences OK)
6. Not ineligible corporation (banks, insurance)
7. All shareholders must consent to election
8. Filing deadline: 15th day of 3rd month`,
    difficulty: 'medium',
    tags: ['S corp', 'eligibility', 'election'],
    reference: 'IRC Section 1361(b)',
  },
  {
    id: 'reg-b2-014',
    section: 'REG',
    type: 'rule',
    topic: 'Business Entities',
    blueprintArea: 'REG-II',
    front: 'How are PARTNERSHIP losses limited?',
    back: `**Four Loss Limitations (in order):**

1. **Basis limitation:** Cannot deduct losses > partner's basis
2. **At-risk limitation:** Cannot deduct > amount "at risk"
3. **Passive activity rules:** Passive losses offset only passive income
4. **Excess business loss:** Limited to $289,000 single / $578,000 MFJ

**Carryforward:** Disallowed losses carry forward indefinitely`,
    mnemonic: 'BAPE: Basis, At-Risk, Passive, Excess Business',
    difficulty: 'hard',
    tags: ['partnership', 'losses', 'limitations'],
    reference: 'IRC Sections 704(d), 465, 469',
  },
  {
    id: 'reg-b2-015',
    section: 'REG',
    type: 'formula',
    topic: 'Business Entities',
    blueprintArea: 'REG-II',
    front: 'What is PARTNER BASIS at formation?',
    back: `**Cash contribution:**
Basis = Cash contributed

**Property contribution:**
Partner's basis = Carryover basis (adjusted basis of property)

**Services contribution:**
Basis = FMV of services (taxable income)

**Partnership basis in contributed property:**
Carryover basis from partner`,
    formula: 'Initial Basis = Cash + Basis of Property + Share of Liabilities',
    example: 'Contribute land with basis $50K, FMV $80K: Partner basis = $50K (not taxable)',
    difficulty: 'hard',
    tags: ['partnership', 'basis', 'formation'],
    reference: 'IRC Section 722',
  },
  // ==========================================
  // DEPRECIATION & COST RECOVERY
  // ==========================================
  {
    id: 'reg-b2-016',
    section: 'REG',
    type: 'rule',
    topic: 'Depreciation',
    blueprintArea: 'REG-IV',
    front: 'What are the MACRS recovery periods?',
    back: `**Common Recovery Periods:**
- 3-year: Tractors, race horses
- 5-year: Autos, computers, equipment
- 7-year: Office furniture, fixtures
- 15-year: Land improvements, QIP
- 27.5 years: Residential rental
- 39 years: Commercial real property

**Methods:**
- 200% DB for 3/5/7/10 year
- 150% DB for 15/20 year
- Straight-line for real property`,
    difficulty: 'medium',
    tags: ['MACRS', 'depreciation', 'recovery periods'],
    reference: 'IRC Section 168',
  },
  {
    id: 'reg-b2-017',
    section: 'REG',
    type: 'rule',
    topic: 'Depreciation',
    blueprintArea: 'REG-IV',
    front: 'What is SECTION 179 expensing?',
    back: `**Immediate expense election** for qualifying property:

**2026 Limits:**
- Maximum deduction: ~$1,220,000
- Phase-out begins: ~$3,050,000 of property placed in service
- Dollar-for-dollar reduction above threshold

**Limitations:**
- Business income limitation (carryforward allowed)
- Certain property excluded
- Real property limits apply

**Bonus + 179** can be combined`,
    difficulty: 'medium',
    tags: ['Section 179', 'expensing', 'depreciation'],
    reference: 'IRC Section 179',
  },
  {
    id: 'reg-b2-018',
    section: 'REG',
    type: 'rule',
    topic: 'Depreciation',
    blueprintArea: 'REG-IV',
    front: 'What is BONUS DEPRECIATION (Section 168(k))?',
    back: `**First-year additional depreciation:**

**2026:** 40% bonus depreciation
**2027:** 20% bonus depreciation
**2028+:** 0% (unless extended)

**Applies to:**
- New or used property (if new to taxpayer)
- MACRS property with ≤20-year life
- Qualified improvement property

**Can elect OUT on property-by-property basis**`,
    difficulty: 'medium',
    tags: ['bonus depreciation', '168(k)', 'TCJA'],
    reference: 'IRC Section 168(k)',
  },
  {
    id: 'reg-b2-019',
    section: 'REG',
    type: 'rule',
    topic: 'Depreciation',
    blueprintArea: 'REG-IV',
    front: 'What is SECTION 1245 recapture?',
    back: `**Recapture of depreciation as ORDINARY INCOME**

**Applies to:**
- Personal property (equipment, machinery)
- Amortizable Section 197 intangibles

**Amount Recaptured:**
Lesser of:
- Gain recognized, OR
- Depreciation allowed/allowable

**All depreciation on 1245 property is recaptured as ordinary income** (not capital gain)`,
    difficulty: 'hard',
    tags: ['1245', 'recapture', 'depreciation', 'ordinary income'],
    reference: 'IRC Section 1245',
  },
  {
    id: 'reg-b2-020',
    section: 'REG',
    type: 'rule',
    topic: 'Depreciation',
    blueprintArea: 'REG-IV',
    front: 'What is SECTION 1250 recapture?',
    back: `**Recapture on REAL PROPERTY depreciation**

**For Straight-Line Depreciation (most common):**
- Unrecaptured Section 1250 gain taxed at 25% max
- Remaining gain is LTCG (0/15/20%)

**For Accelerated Depreciation (rare now):**
- Excess over straight-line = ordinary income (1250)
- Remaining = unrecaptured 1250 (25%)
- Balance = LTCG`,
    difficulty: 'hard',
    tags: ['1250', 'recapture', 'real property', 'depreciation'],
    reference: 'IRC Section 1250',
  },
  // ==========================================
  // PROFESSIONAL ETHICS
  // ==========================================
  {
    id: 'reg-b2-021',
    section: 'REG',
    type: 'rule',
    topic: 'Ethics',
    blueprintArea: 'REG-VI',
    front: 'What are Circular 230 PRACTITIONER DUTIES?',
    back: `**Key Duties under Circular 230:**
1. Not charge unconscionable fees
2. Not delay IRS matters
3. Return client records promptly
4. Exercise due diligence
5. Not mislead IRS or take frivolous positions
6. Advise clients of penalties
7. Submit required documents
8. Maintain competence
9. Not endorse client's check (refund)`,
    difficulty: 'medium',
    tags: ['Circular 230', 'ethics', 'practitioner duties'],
    reference: 'Treasury Circular 230',
  },
  {
    id: 'reg-b2-022',
    section: 'REG',
    type: 'definition',
    topic: 'Ethics',
    blueprintArea: 'REG-VI',
    front: 'What are the TAX RETURN POSITION standards?',
    back: `**Undisclosed Position:**
- Must have "substantial authority" (40-50% confidence)

**Disclosed Position:**
- Must have "reasonable basis" (20-25% confidence)
- Disclose on Form 8275 or 8275-R

**Tax Shelters:**
- Must be "more likely than not" to succeed (>50%)
- Reasonable belief that treatment is "more likely than not" correct

**Preparer Penalties:**
- $1,000 per return (unreasonable) or $5,000 (willful)`,
    difficulty: 'hard',
    tags: ['tax positions', 'Circular 230', 'substantial authority'],
    reference: 'Circular 230 §10.34',
  },
  {
    id: 'reg-b2-023',
    section: 'REG',
    type: 'rule',
    topic: 'Ethics',
    blueprintArea: 'REG-VI',
    front: 'What are PREPARER PENALTIES under IRC 6694?',
    back: `**Section 6694(a) - Unreasonable Position:**
- Greater of $1,000 or 50% of income from return
- Position without substantial authority (undisclosed)

**Section 6694(b) - Willful/Reckless:**
- Greater of $5,000 or 75% of income from return
- Willful attempt to understate tax
- Reckless or intentional disregard of rules

**Defenses:**
- Reasonable cause and good faith
- Relied on advice of another preparer`,
    difficulty: 'hard',
    tags: ['preparer penalties', '6694', 'ethics'],
    reference: 'IRC Section 6694',
  },
  {
    id: 'reg-b2-024',
    section: 'REG',
    type: 'rule',
    topic: 'Ethics',
    blueprintArea: 'REG-VI',
    front: 'What are the PENALTIES for taxpayers?',
    back: `**Civil Penalties:**
- Accuracy-related (6662): 20% of underpayment
  - Negligence
  - Substantial understatement (>$5K individual or >10%)
  - Valuation misstatement
- Fraud (6663): 75% of underpayment

**Failure to File (6651):** 5%/month up to 25%
**Failure to Pay (6651):** 0.5%/month up to 25%
**Combined max:** 47.5% (file penalty reduced)

**Estimated Tax:** Penalty on underpayment`,
    difficulty: 'medium',
    tags: ['penalties', 'taxpayer', '6662', 'civil'],
    reference: 'IRC Sections 6651, 6662, 6663',
  },
  {
    id: 'reg-b2-025',
    section: 'REG',
    type: 'rule',
    topic: 'Ethics',
    blueprintArea: 'REG-VI',
    front: 'What are Circular 230 SANCTIONS for practitioners?',
    back: `**OPR (Office of Professional Responsibility) Sanctions:**

1. **Censure:** Public reprimand
2. **Suspension:** Cannot practice before IRS (temporary)
3. **Disbarment:** Cannot practice before IRS (permanent)
4. **Monetary Penalty:** Up to gross income from engagement

**Grounds for Sanction:**
- Willfully violating Circular 230
- Disreputable conduct
- Tax fraud conviction
- False/misleading statements

**Expedited Suspension:** For certain criminal convictions`,
    difficulty: 'medium',
    tags: ['sanctions', 'Circular 230', 'OPR', 'discipline'],
    reference: 'Circular 230 §10.50-10.82',
  },
];

export default REG_BATCH2_FLASHCARDS;

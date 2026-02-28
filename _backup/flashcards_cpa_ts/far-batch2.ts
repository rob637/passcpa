/**
 * CPA Flashcards - Batch 2 (FAR Section)
 * Additional flashcards for Financial Accounting and Reporting
 * 
 * Covers: Leases, Inventory, Fixed Assets, Intangibles, Investments
 */

import { Flashcard } from './types';

export const FAR_BATCH2_FLASHCARDS: Flashcard[] = [
  // ==========================================
  // LEASES (ASC 842)
  // ==========================================
  {
    id: 'far-b2-001',
    section: 'FAR',
    type: 'definition',
    topic: 'Leases',
    blueprintArea: 'FAR-II',
    front: 'What is an OPERATING LEASE vs. FINANCE LEASE for the lessee?',
    back: `**Finance Lease** (one of 5 criteria met):
1. Ownership transfers at end
2. Bargain purchase option
3. Lease term ≥ 75% of useful life
4. PV of payments ≥ 90% of fair value
5. Specialized asset with no alternative use

**Operating Lease:** None of the above criteria met.`,
    example: 'Equipment lease for 3 years (useful life 10 years), no transfer = Operating lease',
    difficulty: 'medium',
    tags: ['leases', 'ASC 842', 'classification'],
    reference: 'ASC 842-10-25',
  },
  {
    id: 'far-b2-002',
    section: 'FAR',
    type: 'formula',
    topic: 'Leases',
    blueprintArea: 'FAR-II',
    front: 'How do you calculate the initial LEASE LIABILITY?',
    back: 'Lease Liability = Present Value of lease payments, discounted at the rate implicit in the lease (or incremental borrowing rate if implicit rate unknown)',
    formula: 'Lease Liability = Σ [Payment ÷ (1 + r)^n]',
    example: '5 annual payments of $10,000, 6% rate: PV = $42,124',
    difficulty: 'hard',
    tags: ['leases', 'present value', 'liability'],
    reference: 'ASC 842-20-30',
  },
  {
    id: 'far-b2-003',
    section: 'FAR',
    type: 'definition',
    topic: 'Leases',
    blueprintArea: 'FAR-II',
    front: 'What is the ROU (Right-of-Use) Asset initial measurement?',
    back: `ROU Asset = Lease liability
+ Lease payments made before commencement
+ Initial direct costs
- Lease incentives received`,
    example: 'Liability $42,124 + $5,000 prepaid rent + $2,000 legal fees - $3,000 incentive = $46,124 ROU Asset',
    difficulty: 'medium',
    tags: ['leases', 'ROU asset', 'initial measurement'],
    reference: 'ASC 842-20-30',
  },
  {
    id: 'far-b2-004',
    section: 'FAR',
    type: 'rule',
    topic: 'Leases',
    blueprintArea: 'FAR-II',
    front: 'How is EXPENSE recognized for operating vs. finance leases?',
    back: `**Operating Lease:** Single lease expense (straight-line)

**Finance Lease:** 
- Interest expense on liability (front-loaded)
- Amortization expense on ROU asset
- Total expense declines over time`,
    example: 'Same $10K annual payment: Operating = $10K expense each year; Finance = $12K year 1, declining to $8K by year 5',
    difficulty: 'hard',
    tags: ['leases', 'expense recognition'],
    reference: 'ASC 842-20-25',
  },
  {
    id: 'far-b2-005',
    section: 'FAR',
    type: 'rule',
    topic: 'Leases',
    blueprintArea: 'FAR-II',
    front: 'What is the LESSOR accounting for a Sales-Type Lease?',
    back: `At Commencement:
- Derecognize the asset
- Record net investment (lease receivable)
- Recognize selling profit/loss

Over Lease Term:
- Interest income using effective interest method`,
    example: 'Equipment cost $80K, FV $100K: Record $20K profit at inception, earn interest on $100K receivable',
    difficulty: 'hard',
    tags: ['leases', 'lessor', 'sales-type'],
    reference: 'ASC 842-30-25',
  },
  // ==========================================
  // INVENTORY
  // ==========================================
  {
    id: 'far-b2-006',
    section: 'FAR',
    type: 'definition',
    topic: 'Inventory',
    blueprintArea: 'FAR-II',
    front: 'What costs are INCLUDED in inventory?',
    back: `**Product Costs (Inventoriable):**
- Direct materials
- Direct labor
- Manufacturing overhead (fixed & variable)
- Freight-in
- Import duties

**NOT included:** Selling costs, G&A, abnormal waste, storage after production`,
    example: 'Widget cost: $5 materials + $3 labor + $4 overhead + $0.50 freight = $12.50 per unit',
    difficulty: 'medium',
    tags: ['inventory', 'cost', 'capitalization'],
    reference: 'ASC 330-10-30',
  },
  {
    id: 'far-b2-007',
    section: 'FAR',
    type: 'formula',
    topic: 'Inventory',
    blueprintArea: 'FAR-II',
    front: 'How do you apply LOWER OF COST OR NET REALIZABLE VALUE?',
    back: 'Compare: Cost vs. NRV (Selling price - Costs to complete and sell). Use lower amount.',
    formula: 'Inventory = MIN(Cost, NRV)',
    example: 'Cost $100, Selling price $115, Selling costs $20: NRV = $95. Report at $95, write down $5.',
    difficulty: 'medium',
    tags: ['inventory', 'LCNRV', 'valuation'],
    reference: 'ASC 330-10-35',
  },
  {
    id: 'far-b2-008',
    section: 'FAR',
    type: 'formula',
    topic: 'Inventory',
    blueprintArea: 'FAR-II',
    front: 'What is the RETAIL INVENTORY METHOD formula?',
    back: 'Used to estimate ending inventory when physical count is impractical.',
    formula: `Cost Ratio = Cost of Goods Available ÷ Retail Value of Goods Available

Ending Inventory (Cost) = Ending Retail Value × Cost Ratio`,
    example: 'Goods available: $80K cost, $100K retail (80% ratio). Ending retail $25K. Ending cost = $25K × 80% = $20K',
    difficulty: 'hard',
    tags: ['inventory', 'retail method', 'estimation'],
    reference: 'ASC 330-10-30',
  },
  {
    id: 'far-b2-009',
    section: 'FAR',
    type: 'comparison',
    topic: 'Inventory',
    blueprintArea: 'FAR-II',
    front: 'FIFO vs. LIFO effects during RISING PRICES?',
    back: `**FIFO (First-In, First-Out):**
- Higher ending inventory (newer, higher costs)
- Lower COGS
- Higher net income
- Higher taxes

**LIFO (Last-In, First-Out):**
- Lower ending inventory
- Higher COGS
- Lower net income
- Lower taxes (tax deferral benefit)`,
    difficulty: 'medium',
    tags: ['inventory', 'FIFO', 'LIFO', 'cost flow'],
    reference: 'ASC 330-10-30',
  },
  {
    id: 'far-b2-010',
    section: 'FAR',
    type: 'rule',
    topic: 'Inventory',
    blueprintArea: 'FAR-II',
    front: 'What is the DOLLAR-VALUE LIFO method?',
    back: `Groups inventory into "pools" and measures layers in dollars instead of units:
1. Convert ending inventory to base-year dollars
2. Identify new layer (if any)
3. Apply price index to each layer

Advantage: Reduces LIFO liquidation risk`,
    example: 'Base year: $100K. Year 2: $121K at 1.10 index = $110K base. New layer = $10K × 1.10 = $11K',
    difficulty: 'hard',
    tags: ['inventory', 'dollar-value LIFO'],
    reference: 'ASC 330-10-30',
  },
  // ==========================================
  // FIXED ASSETS & DEPRECIATION
  // ==========================================
  {
    id: 'far-b2-011',
    section: 'FAR',
    type: 'definition',
    topic: 'Fixed Assets',
    blueprintArea: 'FAR-II',
    front: 'What costs are CAPITALIZED for PP&E?',
    back: `**Capitalize:**
- Purchase price (less discounts)
- Legal fees for acquisition
- Transportation/freight
- Installation & testing
- Site preparation
- Interest during construction (qualifying assets)

**Expense:** Maintenance, repairs, training, operating losses during start-up`,
    difficulty: 'medium',
    tags: ['PP&E', 'capitalization', 'asset cost'],
    reference: 'ASC 360-10-30',
  },
  {
    id: 'far-b2-012',
    section: 'FAR',
    type: 'formula',
    topic: 'Fixed Assets',
    blueprintArea: 'FAR-II',
    front: 'What is DOUBLE-DECLINING BALANCE depreciation?',
    back: 'Accelerated method: Higher depreciation in early years.',
    formula: `Rate = (1 ÷ Useful Life) × 2 = 2/n

Annual Depreciation = Book Value × Rate

*Do NOT subtract salvage from cost initially; stop when BV = Salvage*`,
    example: '$100K asset, 5 years, $10K salvage: Year 1 = $100K × 40% = $40K. Year 2 = $60K × 40% = $24K',
    difficulty: 'medium',
    tags: ['depreciation', 'DDB', 'accelerated'],
    reference: 'ASC 360-10-35',
  },
  {
    id: 'far-b2-013',
    section: 'FAR',
    type: 'formula',
    topic: 'Fixed Assets',
    blueprintArea: 'FAR-II',
    front: 'What is SUM-OF-YEARS-DIGITS depreciation?',
    back: 'Accelerated method using declining fraction.',
    formula: `SYD Denominator = n(n+1)/2

Year 1: (n/SYD) × Depreciable Base
Year 2: (n-1/SYD) × Depreciable Base

*Depreciable Base = Cost - Salvage*`,
    example: '5-year life: SYD = 15. Year 1: 5/15 × base. Year 2: 4/15 × base.',
    difficulty: 'medium',
    tags: ['depreciation', 'SYD', 'accelerated'],
    reference: 'ASC 360-10-35',
  },
  {
    id: 'far-b2-014',
    section: 'FAR',
    type: 'rule',
    topic: 'Fixed Assets',
    blueprintArea: 'FAR-II',
    front: 'How do you account for asset IMPAIRMENT (GAAP)?',
    back: `**Two-Step Test:**
1. **Recoverability Test:** Is carrying value > undiscounted future cash flows?
   - If NO → No impairment
   - If YES → Proceed to Step 2

2. **Measurement:** Impairment = Carrying Value - Fair Value

**Write down to fair value; no reversal allowed**`,
    difficulty: 'hard',
    tags: ['impairment', 'PP&E', 'ASC 360'],
    reference: 'ASC 360-10-35',
  },
  {
    id: 'far-b2-015',
    section: 'FAR',
    type: 'definition',
    topic: 'Fixed Assets',
    blueprintArea: 'FAR-II',
    front: 'What is COMPONENT DEPRECIATION?',
    back: 'Required when components of an asset have different useful lives or patterns of benefit consumption. Each component is depreciated separately.',
    example: 'Building: Structure (40 years), Roof (20 years), HVAC (15 years) - each depreciated separately',
    difficulty: 'medium',
    tags: ['depreciation', 'components', 'PP&E'],
    reference: 'ASC 360-10-35',
  },
  // ==========================================
  // INTANGIBLE ASSETS
  // ==========================================
  {
    id: 'far-b2-016',
    section: 'FAR',
    type: 'rule',
    topic: 'Intangibles',
    blueprintArea: 'FAR-III',
    front: 'How are INTERNALLY DEVELOPED intangibles treated?',
    back: `**Generally EXPENSED as incurred:**
- Research & development costs
- Start-up costs
- Advertising costs

**Exceptions (Capitalize):**
- Software development (after technological feasibility)
- Legal costs to defend/register patents
- Direct costs of internally developed patents`,
    difficulty: 'medium',
    tags: ['intangibles', 'R&D', 'capitalization'],
    reference: 'ASC 350-30',
  },
  {
    id: 'far-b2-017',
    section: 'FAR',
    type: 'definition',
    topic: 'Intangibles',
    blueprintArea: 'FAR-III',
    front: 'What is the treatment of GOODWILL under GAAP?',
    back: `**Initial Recognition:** 
Goodwill = Purchase Price - Fair Value of Net Identifiable Assets Acquired

**Subsequent Measurement:**
- Not amortized
- Tested annually for impairment (or more frequently if indicators present)
- Impairment = one-step test: if carrying value > fair value, write down`,
    difficulty: 'medium',
    tags: ['goodwill', 'business combinations', 'impairment'],
    reference: 'ASC 350-20',
  },
  {
    id: 'far-b2-018',
    section: 'FAR',
    type: 'rule',
    topic: 'Intangibles',
    blueprintArea: 'FAR-III',
    front: 'FINITE LIFE vs. INDEFINITE LIFE intangibles?',
    back: `**Finite Life:**
- Amortize over useful life
- Test for impairment when indicators present
- Examples: Patents, copyrights, customer lists

**Indefinite Life:**
- No amortization
- Annual impairment testing required
- Examples: Trademarks (if renewable indefinitely), broadcast licenses`,
    difficulty: 'medium',
    tags: ['intangibles', 'amortization', 'useful life'],
    reference: 'ASC 350-30-35',
  },
  {
    id: 'far-b2-019',
    section: 'FAR',
    type: 'formula',
    topic: 'Intangibles',
    blueprintArea: 'FAR-III',
    front: 'How is SOFTWARE DEVELOPMENT cost accounted for (internal use)?',
    back: `**Three Stages:**
1. **Preliminary Stage:** Expense all costs
2. **Development Stage:** Capitalize direct costs (coding, testing, hardware, labor)
3. **Post-Implementation:** Expense maintenance; capitalize upgrades

Amortize over estimated useful life (straight-line)`,
    mnemonic: 'PDE: Prelim=Expense, Development=Capitalize, End=Expense',
    difficulty: 'hard',
    tags: ['software', 'intangibles', 'capitalization'],
    reference: 'ASC 350-40',
  },
  {
    id: 'far-b2-020',
    section: 'FAR',
    type: 'comparison',
    topic: 'Intangibles',
    blueprintArea: 'FAR-III',
    front: 'R&D GAAP vs. IFRS treatment?',
    back: `**GAAP:** Expense ALL R&D costs as incurred (except certain software costs after technological feasibility)

**IFRS:** 
- Research = Expense
- Development = Capitalize if 6 criteria met (technical/financial feasibility, intent, ability, probable benefits, measurable costs)`,
    difficulty: 'hard',
    tags: ['R&D', 'GAAP', 'IFRS', 'differences'],
    reference: 'ASC 730, IAS 38',
  },
  // ==========================================
  // INVESTMENTS
  // ==========================================
  {
    id: 'far-b2-021',
    section: 'FAR',
    type: 'rule',
    topic: 'Investments',
    blueprintArea: 'FAR-II',
    front: 'What are the EQUITY METHOD criteria & accounting?',
    back: `**When to Use:** 20-50% ownership OR significant influence

**Accounting:**
- Initial: Record at cost
- Income: Investor's % share of investee's net income → increases investment & records income
- Dividends: Reduce investment account (NOT income)
- Amortize basis differences over useful life`,
    example: '30% ownership, investee earns $100K: Record $30K income, increase investment $30K',
    difficulty: 'medium',
    tags: ['investments', 'equity method', 'significant influence'],
    reference: 'ASC 323-10',
  },
  {
    id: 'far-b2-022',
    section: 'FAR',
    type: 'comparison',
    topic: 'Investments',
    blueprintArea: 'FAR-II',
    front: 'Fair Value through NI vs. Fair Value through OCI?',
    back: `**Fair Value through Net Income (Trading):**
- Report at FV on balance sheet
- Unrealized gains/losses → Net Income
- Used for: Trading securities, equity with readily determinable FV

**Fair Value through OCI (AFS Debt Securities):**
- Report at FV on balance sheet
- Unrealized gains/losses → OCI (AOCI in equity)
- Reclassify to NI when sold`,
    difficulty: 'medium',
    tags: ['investments', 'fair value', 'OCI'],
    reference: 'ASC 320-10-35',
  },
  {
    id: 'far-b2-023',
    section: 'FAR',
    type: 'rule',
    topic: 'Investments',
    blueprintArea: 'FAR-II',
    front: 'How are HELD-TO-MATURITY securities measured?',
    back: `**Classification:** Debt securities company has positive intent AND ability to hold until maturity

**Measurement:**
- Report at amortized cost (not fair value)
- Interest income using effective interest method
- Premium/discount amortized to income over life

**No unrealized gain/loss in NI or OCI**`,
    difficulty: 'medium',
    tags: ['investments', 'HTM', 'amortized cost'],
    reference: 'ASC 320-10-25',
  },
  {
    id: 'far-b2-024',
    section: 'FAR',
    type: 'formula',
    topic: 'Investments',
    blueprintArea: 'FAR-II',
    front: 'How do you calculate EFFECTIVE INTEREST on bonds?',
    back: 'Used to amortize premium/discount and recognize interest income.',
    formula: `Interest Income = Carrying Value × Effective Rate

Cash Interest = Face Value × Stated Rate

Amortization = Interest Income - Cash Interest`,
    example: '$100K bond at $95K, 6% stated, 7% effective: Income = $6,650, Cash = $6,000, Amortization = $650',
    difficulty: 'hard',
    tags: ['investments', 'bonds', 'effective interest'],
    reference: 'ASC 835-30',
  },
  {
    id: 'far-b2-025',
    section: 'FAR',
    type: 'rule',
    topic: 'Investments',
    blueprintArea: 'FAR-II',
    front: 'When does a company CONSOLIDATE subsidiaries?',
    back: `**Consolidation required when:**
- Owns controlling financial interest (typically >50% voting)
- Is primary beneficiary of VIE (Variable Interest Entity)

**Eliminate:**
- Intercompany transactions
- Intercompany balances
- Intercompany profits in inventory/assets

**Report:** 100% of subsidiary, then show NCI (noncontrolling interest)`,
    difficulty: 'hard',
    tags: ['consolidation', 'subsidiaries', 'control'],
    reference: 'ASC 810-10',
  },
];

export default FAR_BATCH2_FLASHCARDS;

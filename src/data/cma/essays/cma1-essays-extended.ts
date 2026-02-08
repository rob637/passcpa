import { WCTask } from '../../../types';

/**
 * Extended CMA Part 1 Essay Scenarios
 * 
 * Covers all Part 1 blueprint areas:
 * - CMA1-A: External Financial Reporting Decisions (15%)
 * - CMA1-B: Planning, Budgeting, and Forecasting (20%)
 * - CMA1-C: Performance Management (20%)
 * - CMA1-D: Cost Management (15%)
 * - CMA1-E: Internal Controls (15%)
 * - CMA1-F: Technology and Analytics (15%)
 */

export const CMA1_ESSAYS_EXTENDED: WCTask[] = [
  // CMA1-A: External Financial Reporting
  {
    id: 'cma1-wc-005',
    section: 'CMA1',
    type: 'written_communication',
    topic: 'Revenue Recognition under ASC 606',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'CMA1-A',
    scenario: `TechSolutions Inc. provides software-as-a-service (SaaS) and implementation services. A new contract has the following terms:

- 3-year SaaS subscription: $300,000 total ($100,000/year)
- One-time implementation services: $60,000
- Customer support included in subscription
- Implementation takes 3 months and must be completed before SaaS goes live
- Standalone selling prices: SaaS $110,000/year, Implementation $80,000

The CFO wants guidance on how to recognize revenue under ASC 606.`,
    task: `Write a memo to the CFO that:
1. Identifies the performance obligations in this contract.
2. Determines the transaction price and allocates it to each performance obligation using the relative standalone selling price method.
3. Explains when revenue should be recognized for each performance obligation.
4. Addresses whether the implementation services should be combined with the SaaS subscription or treated separately.`,
    keyPoints: [
      'Identify 2 performance obligations (implementation + SaaS)',
      'Total transaction price = $360,000',
      'Allocation based on relative SSP ratios',
      'Implementation recognized over 3 months or at point in time',
      'SaaS recognized ratably over 3 years',
      'Implementation is distinct if customer can benefit separately',
    ],
    rubric: {
      organization: {
        weight: 30,
        criteria: [
          'Uses proper memo format addressed to the CFO',
          'Follows the ASC 606 five-step framework in a logical sequence',
          'Separates performance obligation identification, transaction price allocation, and revenue timing into distinct sections',
          'Includes a clear conclusion addressing the combination assessment question',
        ],
      },
      development: {
        weight: 40,
        criteria: [
          'Correctly identifies two distinct performance obligations (implementation and SaaS with support)',
          'Calculates total transaction price as $360,000 and allocates using relative standalone selling prices',
          'Applies the correct SSP allocation formula (SaaS: $289,756; Implementation: $70,244)',
          'Explains the timing of revenue recognition for each obligation (implementation over 3 months or at go-live; SaaS ratably over 36 months)',
          'Analyzes whether implementation and SaaS should be combined, citing the distinct criteria under ASC 606',
        ],
      },
      expression: {
        weight: 30,
        criteria: [
          'Uses professional tone appropriate for advising a CFO on technical accounting matters',
          'Employs correct ASC 606 terminology (performance obligation, standalone selling price, over time, point in time)',
          'Presents calculations clearly with supporting formulas and labels',
          'Writes in clear, concise sentences free of grammatical errors',
        ],
      },
    },
    sampleResponse: `MEMORANDUM

TO: Chief Financial Officer
FROM: [Candidate], Management Accountant
DATE: [Current Date]
RE: Revenue Recognition Analysis - TechSolutions Contract under ASC 606

PERFORMANCE OBLIGATION IDENTIFICATION

Under ASC 606, Step 2 requires identifying distinct performance obligations. In this contract, I have identified two performance obligations:

1. **Implementation Services** - A distinct service as the customer can benefit from completed implementation (e.g., could use another vendor for SaaS after setup). The implementation is also separately identifiable in the contract.

2. **SaaS Subscription (including support)** - The software access and support are a single performance obligation as support is integral to SaaS delivery and not sold separately.

TRANSACTION PRICE ALLOCATION

Total Transaction Price: $360,000 ($300,000 + $60,000)

Standalone Selling Prices:
- SaaS (3 years): $330,000 ($110,000 × 3)
- Implementation: $80,000
- Total SSP: $410,000

Allocation using Relative SSP Method:

SaaS Allocation = ($330,000 / $410,000) × $360,000 = $289,756
Implementation Allocation = ($80,000 / $410,000) × $360,000 = $70,244

REVENUE RECOGNITION TIMING

**Implementation Services ($70,244):**
Revenue should be recognized over time if the implementation creates an asset with no alternative use and TechSolutions has an enforceable right to payment. If the customer controls the asset as it's built (on their servers), recognize over the 3-month period using input or output method.

If these criteria are not met, recognize at point in time when control transfers (go-live date).

**SaaS Subscription ($289,756):**
Recognize ratably over the 3-year subscription period ($96,585/year or $8,049/month). This represents a "stand-ready" obligation satisfied over time.

COMBINATION ASSESSMENT

The implementation and SaaS should NOT be combined because:
1. Implementation can be performed by third parties
2. Customer receives value from completed implementation independent of SaaS
3. Contract separately identifies the services

RECOMMENDATION

Book implementation revenue over the 3-month period (or at go-live) and SaaS revenue monthly over 36 months. Ensure proper deferred revenue tracking for the subscription component.`,
  },

  {
    id: 'cma1-wc-006',
    section: 'CMA1',
    type: 'written_communication',
    topic: 'Lease Classification and Accounting',
    difficulty: 'medium',
    estimatedTime: 25,
    blueprintArea: 'CMA1-A',
    scenario: `Manufacturing Corp is entering a lease for specialized equipment with the following terms:

- Lease term: 5 years (non-cancelable)
- Annual lease payments: $50,000 (paid at end of each year)
- Fair value of equipment: $200,000
- Useful life of equipment: 7 years
- Implicit rate in the lease: 8%
- No transfer of ownership at end of lease
- No bargain purchase option
- Equipment is specialized but has alternative uses

The CFO asks whether this is a finance or operating lease and how it will impact the balance sheet.`,
    task: `Write a memo that:
1. Explains the criteria for classifying a lease as a finance lease vs. operating lease under ASC 842.
2. Applies each criterion to this lease to determine proper classification.
3. Calculates the right-of-use asset and lease liability to be recorded at commencement.
4. Explains the difference in expense recognition pattern between finance and operating leases.`,
    keyPoints: [
      'Five finance lease criteria under ASC 842',
      'Present value test: PV of payments vs 90% of fair value',
      'Lease term test: 5/7 = 71% (below 75% threshold)',
      'Right-of-use asset = Lease liability = PV of payments',
      'PV calculation at 8% for 5 payments of $50,000',
      'Finance lease: front-loaded expense; Operating: straight-line',
    ],
    rubric: {
      organization: {
        weight: 30,
        criteria: [
          'Uses proper memo format addressed to the CFO',
          'Presents each ASC 842 classification criterion in a structured, testable format',
          'Separates classification analysis, initial recognition, and expense pattern comparison into clear sections',
          'Concludes with a definitive classification determination supported by the analysis',
        ],
      },
      development: {
        weight: 40,
        criteria: [
          'Lists all five finance lease criteria under ASC 842 and applies each to the scenario',
          'Correctly performs the present value calculation (PV of $50,000 annuity at 8% for 5 years ≈ $199,635)',
          'Determines the PV exceeds 90% of fair value, triggering finance lease classification',
          'Calculates the right-of-use asset and lease liability at commencement',
          'Contrasts the front-loaded expense pattern of a finance lease with the straight-line pattern of an operating lease',
        ],
      },
      expression: {
        weight: 30,
        criteria: [
          'Uses professional tone appropriate for a technical accounting memo',
          'Employs correct ASC 842 terminology (right-of-use asset, lease liability, finance lease, operating lease, implicit rate)',
          'Presents calculations with clear labels, formulas, and journal entries',
          'Writes in clear, concise sentences free of grammatical errors',
        ],
      },
    },
    sampleResponse: `MEMORANDUM

TO: Chief Financial Officer
FROM: [Candidate], Controller
DATE: [Current Date]
RE: Lease Classification Analysis under ASC 842

FINANCE LEASE CRITERIA (ASC 842-10-25-2)

A lessee classifies a lease as a finance lease if ANY of the following criteria are met:

1. **Transfer of ownership** - Does NOT apply (no ownership transfer)

2. **Bargain purchase option** - Does NOT apply (no purchase option)

3. **Lease term ≥ 75% of useful life** - Does NOT apply
   - Lease term: 5 years / Useful life: 7 years = 71.4% (below threshold)

4. **Present value ≥ 90% of fair value** - APPLY THIS TEST
   - PV of $50,000 annuity for 5 years at 8%:
   - PV = $50,000 × 3.9927 = $199,635
   - Fair value: $200,000
   - Ratio: $199,635 / $200,000 = 99.8% (EXCEEDS 90%)

5. **Specialized nature with no alternative use** - Does NOT apply (equipment has alternative uses)

CLASSIFICATION: FINANCE LEASE

The present value test is met. This is a finance lease.

INITIAL RECOGNITION

Right-of-Use Asset = Lease Liability = PV of lease payments = **$199,635**

Journal Entry at Commencement:
   Dr. Right-of-Use Asset    $199,635
       Cr. Lease Liability           $199,635

EXPENSE RECOGNITION COMPARISON

**Finance Lease (this lease):**
- Amortization of ROU asset: $199,635 / 5 years = $39,927/year
- Interest expense: Declining balance (front-loaded)
- Year 1: Interest = $199,635 × 8% = $15,971
- Total Year 1 expense: $39,927 + $15,971 = $55,898

**If Operating Lease:**
- Total lease cost: $50,000 × 5 = $250,000
- Annual expense: $250,000 / 5 = $50,000 (straight-line)

Finance lease creates higher expense in early years due to interest component calculated on outstanding balance. Total expense over lease term is identical.`,
  },

  // CMA1-B: Planning, Budgeting, and Forecasting
  {
    id: 'cma1-wc-007',
    section: 'CMA1',
    type: 'written_communication',
    topic: 'Rolling Forecasts vs. Traditional Annual Budgeting',
    difficulty: 'medium',
    estimatedTime: 25,
    blueprintArea: 'CMA1-B',
    scenario: `Global Retail Corp has used traditional annual budgeting for 20 years. The budget process takes 4 months and involves significant managerial time. By month 6, the budget is often obsolete due to market changes.

The new CEO, coming from a tech company, wants to implement rolling forecasts that are updated quarterly with an 18-month horizon.

The CFO is concerned about:
- Loss of accountability without fixed targets
- Continuous forecasting burden on staff
- How to conduct variance analysis

You have been asked to evaluate both approaches.`,
    task: `Write a memo that:
1. Compares traditional annual budgeting with rolling forecasts, identifying advantages and disadvantages of each.
2. Addresses the CFO's three specific concerns about rolling forecasts.
3. Recommends a hybrid approach that could work for Global Retail Corp.
4. Describes how performance evaluation might change under the new system.`,
    keyPoints: [
      'Traditional budget: control focus, annual cycle, gaming risk',
      'Rolling forecast: agility, continuous planning, resource-intensive',
      'Accountability: separate targets from forecasts',
      'Continuous burden: limit detail, use drivers',
      'Variance analysis: compare to prior forecast',
      'Hybrid: annual targets + quarterly rolling forecasts',
    ],
    rubric: {
      organization: {
        weight: 30,
        criteria: [
          'Uses proper memo format addressed to the CFO',
          'Structures comparison of budgeting approaches clearly (e.g., pros/cons table or side-by-side format)',
          'Addresses each of the CFO\'s three concerns in clearly labeled subsections',
          'Presents a cohesive hybrid recommendation with implementation details',
        ],
      },
      development: {
        weight: 40,
        criteria: [
          'Compares advantages and disadvantages of both traditional budgeting and rolling forecasts accurately',
          'Addresses the accountability concern by recommending separation of targets from forecasts',
          'Addresses the continuous burden concern with practical solutions such as driver-based forecasting',
          'Addresses the variance analysis concern with a multi-perspective comparison methodology',
          'Proposes a specific hybrid approach (e.g., annual targets plus quarterly rolling forecasts) with rationale',
        ],
      },
      expression: {
        weight: 30,
        criteria: [
          'Uses professional tone appropriate for advising a concerned CFO',
          'Employs correct budgeting and forecasting terminology (rolling forecast, driver-based, variance analysis, incremental budgeting)',
          'Writes in clear, concise sentences with proper grammar',
          'Balances persuasiveness with objectivity when presenting the recommendation',
        ],
      },
    },
    sampleResponse: `MEMORANDUM

TO: Chief Financial Officer
FROM: [Candidate], Senior Financial Analyst
DATE: [Current Date]
RE: Evaluation of Rolling Forecasts vs. Traditional Budgeting

COMPARISON OF APPROACHES

**Traditional Annual Budget**
| Advantages | Disadvantages |
|------------|---------------|
| Clear accountability to fixed targets | Obsolete by mid-year |
| Well-understood process | 4-month creation time |
| Enables year-over-year comparison | Encourages "gaming" to hit numbers |
| Simpler variance analysis | Inflexible to market changes |

**Rolling Forecasts**
| Advantages | Disadvantages |
|------------|---------------|
| Always current (18-month horizon) | No fixed target for bonuses |
| Faster response to market changes | Requires cultural shift |
| Reduces "use it or lose it" behavior | More frequent updates needed |
| Improves forward visibility | Harder to compare periods |

ADDRESSING CFO CONCERNS

**1. Loss of accountability without fixed targets:**
Separate the forecasting process from target-setting. Establish annual performance targets at the beginning of the year and hold them constant for evaluation. Use rolling forecasts purely for planning and resource allocation, not for determining bonuses.

**2. Continuous forecasting burden:**
Implement driver-based forecasting rather than line-item detail. Focus on 10-15 key business drivers (e.g., store traffic, average transaction, labor hours) that predict results. This reduces forecasting time from days to hours.

**3. Variance analysis methodology:**
Compare actual results to:
- The original target (for performance evaluation)
- The prior quarter's forecast (for forecast accuracy)
- Year-ago actuals (for trend analysis)

This provides three perspectives: accountability, forecast quality, and business trends.

RECOMMENDED HYBRID APPROACH

1. **Annual Targets**: Set fixed annual targets in January for bonuses/evaluation
2. **Quarterly Rolling Forecast**: Update 6-quarter forecast quarterly (18 months)
3. **Monthly Flash Reports**: Abbreviated monthly updates for key drivers
4. **Simplified Detail**: Budget detail for Year 1 only; Years 2+ at summary level

PERFORMANCE EVALUATION CHANGES

Evaluate managers on:
- Performance vs. annual target (primary)
- Forecast accuracy (secondary)
- Qualitative goals (strategic initiatives)

This preserves accountability while gaining the agility benefits of rolling forecasts.`,
  },

  {
    id: 'cma1-wc-008',
    section: 'CMA1',
    type: 'written_communication',
    topic: 'Zero-Based Budgeting Implementation',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'CMA1-B',
    scenario: `PharmaCorp's CEO has decided to implement Zero-Based Budgeting (ZBB) for all discretionary spending categories after reading about its success at major consumer goods companies.

Current state:
- Annual SG&A budget: $500 million
- Budget growth has been 4-6% annually (incremental approach)
- 15 business units with varying cultures
- Previous cost reduction initiatives failed due to poor execution

The CFO wants your assessment before the board meeting next week.`,
    task: `Write a memo that:
1. Explains the Zero-Based Budgeting methodology and how it differs from incremental budgeting.
2. Identifies which cost categories at PharmaCorp are best suited for ZBB.
3. Describes the implementation challenges and how to overcome them.
4. Recommends a phased implementation approach with timeline.`,
    keyPoints: [
      'ZBB requires justifying all expenses from zero',
      'Decision packages ranked by cost-benefit',
      'Best for discretionary/support costs, not R&D',
      'Challenges: time-intensive, employee resistance, sustainability',
      'Phased approach by business unit or cost category',
      'Need dedicated ZBB team and executive sponsorship',
    ],
    rubric: {
      organization: {
        weight: 30,
        criteria: [
          'Uses proper memo format appropriate for a pre-board-meeting brief to the CFO',
          'Organizes content logically: methodology overview, applicability, challenges, and phased plan',
          'Separates cost categories into those suited and not suited for ZBB',
          'Presents the phased implementation timeline with clear milestones',
        ],
      },
      development: {
        weight: 40,
        criteria: [
          'Clearly explains ZBB methodology including decision packages and ranking by cost-benefit',
          'Contrasts ZBB with incremental budgeting, highlighting how ZBB challenges the status quo',
          'Correctly identifies which PharmaCorp cost categories are best suited for ZBB (discretionary SG&A) versus unsuitable (R&D, manufacturing)',
          'Addresses key implementation challenges with specific mitigation strategies',
          'Recommends a phased rollout with realistic timelines and expected savings targets',
        ],
      },
      expression: {
        weight: 30,
        criteria: [
          'Uses professional tone suitable for executive-level communication before a board meeting',
          'Employs correct budgeting terminology (zero-based budgeting, decision packages, incremental budgeting, discretionary spending)',
          'Presents information concisely given the time-sensitive context',
          'Writes with proper grammar and professional formatting',
        ],
      },
    },
    sampleResponse: `MEMORANDUM

TO: Chief Financial Officer
FROM: [Candidate], VP of Financial Planning
DATE: [Current Date]
RE: Zero-Based Budgeting Assessment and Implementation Plan

ZBB METHODOLOGY OVERVIEW

**Incremental Budgeting (Current State):**
- Starts with prior year budget
- Applies percentage increase/decrease
- Historical spending assumed to be justified
- Fast but perpetuates inefficiencies

**Zero-Based Budgeting:**
- Every expense must be justified from zero each period
- Managers create "decision packages" ranking activities by value
- Senior leadership allocates resources based on priorities, not history
- Time-intensive but challenges status quo

COST CATEGORIES SUITED FOR ZBB AT PHARMACORP

**RECOMMENDED for ZBB:**
| Category | Current Spend | ZBB Opportunity |
|----------|---------------|-----------------|
| Marketing & Advertising | $120M | High - challenge historical allocations |
| General & Administrative | $80M | High - travel, contractors, consulting |
| IT Support & Services | $60M | Medium - consolidation opportunities |
| Facilities & Real Estate | $50M | Medium - space utilization review |

**NOT RECOMMENDED for ZBB:**
- R&D: Long-term projects shouldn't be evaluated annually from zero
- Manufacturing: Variable costs driven by volume, not discretion
- Sales Compensation: Tied to revenue formulas

IMPLEMENTATION CHALLENGES

| Challenge | Mitigation Strategy |
|-----------|---------------------|
| Time-intensive process | Use technology (ZBB software), limit decision package depth |
| Manager resistance | Tie to career incentives, provide training |
| Sustainability fatigue | Apply ZBB on 2-3 year cycle, not annually |
| Cuts to muscle not fat | Protect strategic investments, set minimum service levels |
| Gaming/sandbagging | Benchmark costs externally, use cross-functional review |

RECOMMENDED PHASED IMPLEMENTATION

**Phase 1 (Months 1-3): Pilot**
- Select 2-3 business units (1 willing, 1 challenging)
- Focus on G&A and Marketing only
- Build decision package templates
- Train managers and establish ZBB team

**Phase 2 (Months 4-9): Rollout**
- Expand to all 15 business units
- Add IT and Facilities categories
- Develop ranking criteria and governance process
- Target 10-15% cost reduction

**Phase 3 (Year 2+): Sustain**
- Integrate into annual planning calendar
- Rotate ZBB application (different categories each year)
- Monitor for re-growth of cut costs
- Report savings to Board quarterly

EXPECTED OUTCOMES
- First-year savings: $40-75 million (8-15% of targeted spend)
- Improved cost visibility and accountability
- Better alignment of spending with strategic priorities

I recommend board approval with dedicated project management resources.`,
  },

  // CMA1-C: Performance Management
  {
    id: 'cma1-wc-009',
    section: 'CMA1',
    type: 'written_communication',
    topic: 'Balanced Scorecard Implementation',
    difficulty: 'medium',
    estimatedTime: 30,
    blueprintArea: 'CMA1-C',
    scenario: `HealthFirst Hospital is implementing a Balanced Scorecard after years of focusing exclusively on financial metrics. Leadership realizes that patient satisfaction and clinical quality are being neglected.

Current metrics (financial only):
- Revenue per bed
- Cost per patient day
- Operating margin
- Collection rate

The CEO wants a Balanced Scorecard that includes all four perspectives with 3-4 KPIs each.`,
    task: `Write a memo that:
1. Explains the four perspectives of the Balanced Scorecard and how they link together.
2. Develops a Balanced Scorecard for HealthFirst with 3-4 specific, measurable KPIs for each perspective.
3. Creates a strategy map showing cause-and-effect relationships between the KPIs.
4. Identifies potential dysfunctional behaviors that could arise and how to prevent them.`,
    keyPoints: [
      'Four perspectives: Financial, Customer, Internal Process, Learning & Growth',
      'Cause-and-effect linkages (strategy map)',
      'Healthcare-specific KPIs (HCAHPS, readmission, safety)',
      'Leading vs lagging indicators',
      'Dysfunctional behaviors (gaming metrics)',
      'Balance between perspectives',
    ],
    rubric: {
      organization: {
        weight: 30,
        criteria: [
          'Uses proper memo format addressed to the CEO',
          'Organizes the Balanced Scorecard into all four perspectives with clear headings',
          'Presents the strategy map showing cause-and-effect linkages in a logical flow',
          'Includes a separate section addressing dysfunctional behaviors and prevention',
        ],
      },
      development: {
        weight: 40,
        criteria: [
          'Explains all four BSC perspectives and their interconnection (Learning → Process → Customer → Financial)',
          'Develops 3–4 specific, measurable KPIs per perspective that are relevant to a hospital setting',
          'Creates cause-and-effect linkages between KPIs across perspectives (e.g., training → fewer errors → higher satisfaction → revenue)',
          'Identifies realistic dysfunctional behaviors (e.g., cherry-picking patients, gaming HCAHPS) with practical prevention measures',
          'Distinguishes between leading and lagging indicators in the scorecard design',
        ],
      },
      expression: {
        weight: 30,
        criteria: [
          'Uses professional tone appropriate for advising a hospital CEO on strategic planning',
          'Employs correct BSC and healthcare terminology (HCAHPS, readmission rate, KPI, strategy map)',
          'Presents KPIs in a structured, readable format (e.g., tables with targets and measures)',
          'Writes in clear, concise sentences free of grammatical errors',
        ],
      },
    },
    sampleResponse: `MEMORANDUM

TO: Chief Executive Officer
FROM: [Candidate], Director of Strategic Planning
DATE: [Current Date]
RE: Balanced Scorecard Design for HealthFirst Hospital

BALANCED SCORECARD FRAMEWORK

The Balanced Scorecard translates strategy into action across four interconnected perspectives:

1. **Financial**: "How do we look to shareholders/stakeholders?"
2. **Customer**: "How do patients see us?"
3. **Internal Process**: "What must we excel at?"
4. **Learning & Growth**: "How can we continue to improve?"

These perspectives link in a causal chain: Learning → Process → Customer → Financial

HEALTHFIRST BALANCED SCORECARD

**FINANCIAL PERSPECTIVE**
| KPI | Target | Measure |
|-----|--------|---------|
| Operating Margin | >5% | Net income / Revenue |
| Revenue per Adjusted Patient Day | >$2,500 | Total revenue / Adjusted patient days |
| Days in A/R | <45 days | AR / (Revenue/365) |
| Cost per CMI-Adjusted Discharge | <$12,000 | Operating cost / weighted discharges |

**CUSTOMER PERSPECTIVE (Patients)**
| KPI | Target | Measure |
|-----|--------|---------|
| HCAHPS Overall Rating | >85% | CMS survey "9 or 10" responses |
| Patient Wait Time (ED) | <30 min | Door to provider time |
| Net Promoter Score | >50 | Likelihood to recommend |
| Patient Complaint Rate | <2% | Complaints / discharges |

**INTERNAL PROCESS PERSPECTIVE**
| KPI | Target | Measure |
|-----|--------|---------|
| 30-Day Readmission Rate | <12% | Readmissions / discharges |
| Hospital-Acquired Infection Rate | <1% | HAIs per 1,000 patient days |
| OR Utilization | >75% | Utilized OR time / available time |
| Medication Error Rate | <0.5% | Errors / medication orders |

**LEARNING & GROWTH PERSPECTIVE**
| KPI | Target | Measure |
|-----|--------|---------|
| Nursing Turnover | <15% | Departures / avg headcount |
| Training Hours per Employee | >40 hrs | Annual training hours |
| Employee Engagement Score | >75% | Annual survey |
| EHR Adoption Rate | >95% | Staff using all EHR features |

STRATEGY MAP (Cause-Effect Linkages)

Learning & Growth → Internal Process:
- Higher training → Fewer medication errors
- Lower turnover → Better continuity of care

Internal Process → Customer:
- Lower infection rate → Higher patient satisfaction
- Lower readmissions → Better HCAHPS scores

Customer → Financial:
- Higher satisfaction → More referrals/volume
- Better quality scores → Higher reimbursement (value-based)

POTENTIAL DYSFUNCTIONAL BEHAVIORS

| Behavior | Prevention |
|----------|------------|
| Cherry-picking easy patients to improve metrics | Risk-adjust all clinical metrics |
| Gaming HCAHPS with coaching patients | Anonymous survey administration |
| Underreporting safety events | No-blame reporting culture |
| Cutting training to reduce costs | Link training KPI to bonuses |

RECOMMENDATION

Implement BSC in phases: Leadership review (Q1), department cascading (Q2-Q3), integration with compensation (Q4). Review and refine KPIs annually.`,
  },

  {
    id: 'cma1-wc-010',
    section: 'CMA1',
    type: 'written_communication',
    topic: 'Transfer Pricing Dispute',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'CMA1-C',
    scenario: `AutoParts Corp has two divisions:
- Components Division: Manufactures engines, sells internally and externally
- Assembly Division: Buys engines to build complete vehicles

Conflict: Components wants to charge $5,000 per engine (market price for equivalent). Assembly argues they should pay $3,800 (variable cost + 10% markup) since external customers require less service.

Data:
- External market price: $5,000
- Components' full cost: $4,200
- Components' variable cost: $3,500
- Components has excess capacity (can supply Assembly without reducing external sales)
- Assembly's vehicle selling price: $45,000
- Assembly's other costs: $38,000 per vehicle

The CEO wants you to resolve this dispute.`,
    task: `Write a memo that:
1. Analyzes the three common transfer pricing methods and their applicability here.
2. Determines the range of acceptable transfer prices.
3. Recommends a specific transfer price with justification.
4. Addresses how to handle the transfer pricing decision when capacity changes.`,
    keyPoints: [
      'Three methods: market-based, cost-based, negotiated',
      'Minimum TP = variable cost ($3,500) when excess capacity',
      'Maximum TP = market price ($5,000)',
      'Excess capacity changes the optimal solution',
      'Goal congruence and divisional motivation',
      'Dual pricing as alternative solution',
    ],
    rubric: {
      organization: {
        weight: 30,
        criteria: [
          'Uses proper memo format addressed to the CEO',
          'Analyzes each transfer pricing method in a structured, parallel format',
          'Clearly delineates the acceptable transfer price range before making a recommendation',
          'Addresses the capacity-change scenario as a distinct section with conditional guidance',
        ],
      },
      development: {
        weight: 40,
        criteria: [
          'Correctly analyzes all three transfer pricing methods (market-based, cost-based, negotiated) with applicability to the scenario',
          'Determines the correct minimum ($3,500 variable cost) and maximum ($5,000 market price) transfer price range given excess capacity',
          'Recommends a specific transfer price with sound economic justification tied to goal congruence',
          'Explains how the optimal transfer price changes when capacity becomes constrained (opportunity cost analysis)',
          'Considers divisional motivation and corporate-level profitability in the recommendation',
        ],
      },
      expression: {
        weight: 30,
        criteria: [
          'Uses professional tone appropriate for resolving an inter-divisional dispute for the CEO',
          'Employs correct transfer pricing terminology (opportunity cost, contribution margin, goal congruence, dual pricing)',
          'Presents numerical analysis clearly with supporting calculations',
          'Writes in a balanced, diplomatic tone that respects both divisions\' perspectives',
        ],
      },
    },
    sampleResponse: `MEMORANDUM

TO: Chief Executive Officer
FROM: [Candidate], Corporate Controller
DATE: [Current Date]
RE: Resolution of Inter-Divisional Transfer Pricing Dispute

TRANSFER PRICING METHODS ANALYSIS

**1. Market-Based Transfer Price: $5,000**
- Components' Position: Uses comparable external price
- Advantages: Objective, reflects fair competition
- Issue: May not be truly comparable if Assembly requires less service

**2. Cost-Based Transfer Price: $4,620 (Full cost + 10%)**
- Assembly's Position: Cost-plus markup ($4,200 × 1.1)
- Advantages: Simple, guarantees Components a profit
- Issue: Includes allocated fixed costs; doesn't reflect opportunity cost

**3. Variable Cost Plus Margin: $3,850 (Variable + 10%)**
- Assembly's Proposal: $3,500 × 1.1 = $3,850
- Advantages: Relevant for short-term decisions
- Issue: Doesn't cover fixed costs over time

ACCEPTABLE TRANSFER PRICE RANGE

**Key Variable: Components has EXCESS CAPACITY**

When excess capacity exists, there is no opportunity cost to internal sales—Components can serve Assembly without sacrificing external revenue.

**Minimum Transfer Price = Variable Cost = $3,500**
Below this, Components loses money on every unit.

**Maximum Transfer Price = Market Price = $5,000**
Above this, Assembly would simply buy externally.

**Acceptable Range: $3,500 - $5,000**

At any price in this range:
- Components earns positive contribution margin
- Assembly pays less than or equal to external price
- Company benefits from keeping transaction internal

RECOMMENDED TRANSFER PRICE: $4,200 (Full Cost)

**Justification:**
1. **Covers all Components' costs** - Ensures long-term viability
2. **Below market price** - Assembly benefits from being internal customer
3. **No profit loading** - Neutral to performance evaluation
4. **Ties to cost improvement** - Components incentivized to reduce costs

**Alternative: Dual Pricing System**
- Components records revenue at $5,000 (for performance evaluation)
- Assembly records cost at $3,500 (variable cost)
- Difference of $1,500 eliminated in consolidation

This motivates both divisions optimally but complicates accounting.

HANDLING CAPACITY CHANGES

**If Components reaches full capacity:**
- Opportunity cost = Lost external contribution margin
- Minimum TP = Variable cost + Opportunity cost = $3,500 + ($5,000 - $3,500) = $5,000
- At full capacity, transfer price should be market price

**Recommendation:** Include a capacity trigger clause. Below 85% capacity utilization, use $4,200. Above 85%, use market price of $5,000.

This dynamic approach aligns divisional decisions with corporate interests under varying conditions.`,
  },

  // CMA1-D: Cost Management
  {
    id: 'cma1-wc-011',
    section: 'CMA1',
    type: 'written_communication',
    topic: 'Activity-Based Costing Implementation and Product Profitability',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'CMA1-D',
    scenario: `PrecisionParts Inc. manufactures two product lines using traditional costing:
- Standard Parts: High volume (100,000 units), simple production
- Custom Parts: Low volume (5,000 units), complex engineering

Current traditional system allocates overhead based on direct labor hours.

Data:
| | Standard | Custom |
|---|----------|--------|
| Units | 100,000 | 5,000 |
| Direct Materials | $10/unit | $50/unit |
| Direct Labor | $20/unit (2 hrs) | $40/unit (4 hrs) |
| Selling Price | $55/unit | $150/unit |

Total overhead: $3,000,000
Total DL hours: 220,000

An ABC study identified these cost drivers:
| Activity | Cost Pool | Driver | Standard | Custom |
|----------|-----------|--------|----------|--------|
| Machine Setup | $600,000 | # of setups | 50 | 250 |
| Inspection | $400,000 | # of inspections | 1,000 | 4,000 |
| Engineering | $800,000 | Engineering hours | 500 | 2,500 |
| Material Handling | $700,000 | # of parts | 100,000 | 25,000 |
| General Factory | $500,000 | Machine hours | 150,000 | 50,000 |`,
    task: `Write a memo that:
1. Calculates product costs under both traditional costing and ABC.
2. Explains why the cost distortion occurs.
3. Identifies strategic implications for pricing and product mix decisions.
4. Recommends whether to implement ABC permanently, considering costs and benefits.`,
    keyPoints: [
      'Traditional: $13.64/DL hour applied uniformly',
      'ABC reveals Custom Parts consume more overhead per unit',
      'Standard subsidizing Custom under traditional costing',
      'Strategic pricing implications',
      'ABC implementation costs vs benefits',
      'Cost driver analysis',
    ],
    rubric: {
      organization: {
        weight: 30,
        criteria: [
          'Uses proper memo format addressed to the CEO',
          'Presents traditional costing and ABC calculations in a structured, parallel format for comparison',
          'Separates quantitative analysis from strategic interpretation and recommendation',
          'Includes clear cost tables with per-unit breakdowns for both costing methods',
        ],
      },
      development: {
        weight: 40,
        criteria: [
          'Correctly calculates product costs under traditional costing using the DLH-based overhead rate ($13.64/hr)',
          'Correctly calculates ABC activity rates and assigns overhead to each product using appropriate cost drivers',
          'Identifies the cost cross-subsidization: Standard Parts are over-costed and Custom Parts are severely under-costed',
          'Connects revised profitability to strategic pricing and product mix decisions',
          'Evaluates ABC implementation costs versus the magnitude of current cost distortion to justify adoption',
        ],
      },
      expression: {
        weight: 30,
        criteria: [
          'Uses professional tone appropriate for a strategic cost analysis memo to the CEO',
          'Employs correct cost accounting terminology (activity-based costing, cost drivers, cost pools, cross-subsidization)',
          'Presents complex calculations in clear, well-labeled tables',
          'Writes in clear, concise sentences free of grammatical errors',
        ],
      },
    },
    sampleResponse: `MEMORANDUM

TO: Chief Executive Officer
FROM: [Candidate], Cost Accountant
DATE: [Current Date]
RE: Activity-Based Costing Analysis - Product Line Profitability

TRADITIONAL COSTING CALCULATION

Overhead Rate = $3,000,000 / 220,000 DL hours = **$13.64 per DL hour**

| | Standard Parts | Custom Parts |
|---|----------------|--------------|
| Direct Materials | $10.00 | $50.00 |
| Direct Labor | $20.00 | $40.00 |
| Overhead ($13.64 × DL hrs) | $27.28 | $54.56 |
| **Total Cost** | **$57.28** | **$144.56** |
| Selling Price | $55.00 | $150.00 |
| **Profit/(Loss)** | **($2.28)** | **$5.44** |

Under traditional costing, Standard Parts appear unprofitable while Custom Parts are profitable.

ACTIVITY-BASED COSTING CALCULATION

**Step 1: Calculate Activity Rates**
| Activity | Cost | Total Driver | Rate |
|----------|------|--------------|------|
| Setups | $600,000 | 300 | $2,000/setup |
| Inspection | $400,000 | 5,000 | $80/inspection |
| Engineering | $800,000 | 3,000 hrs | $266.67/hour |
| Material Handling | $700,000 | 125,000 parts | $5.60/part |
| General Factory | $500,000 | 200,000 MH | $2.50/MH |

**Step 2: Assign Overhead to Products**

*Standard Parts (100,000 units):*
| Activity | Rate × Driver | Total | Per Unit |
|----------|---------------|-------|----------|
| Setups | $2,000 × 50 | $100,000 | $1.00 |
| Inspection | $80 × 1,000 | $80,000 | $0.80 |
| Engineering | $266.67 × 500 | $133,335 | $1.33 |
| Material Handling | $5.60 × 100,000 | $560,000 | $5.60 |
| General Factory | $2.50 × 150,000 | $375,000 | $3.75 |
| **Total Overhead** | | **$1,248,335** | **$12.48** |

*Custom Parts (5,000 units):*
| Activity | Rate × Driver | Total | Per Unit |
|----------|---------------|-------|----------|
| Setups | $2,000 × 250 | $500,000 | $100.00 |
| Inspection | $80 × 4,000 | $320,000 | $64.00 |
| Engineering | $266.67 × 2,500 | $666,675 | $133.33 |
| Material Handling | $5.60 × 25,000 | $140,000 | $28.00 |
| General Factory | $2.50 × 50,000 | $125,000 | $25.00 |
| **Total Overhead** | | **$1,751,675** | **$350.33** |

**REVISED PRODUCT PROFITABILITY**

| | Standard Parts | Custom Parts |
|---|----------------|--------------|
| Direct Materials | $10.00 | $50.00 |
| Direct Labor | $20.00 | $40.00 |
| Overhead (ABC) | $12.48 | $350.33 |
| **Total Cost** | **$42.48** | **$440.33** |
| Selling Price | $55.00 | $150.00 |
| **Profit/(Loss)** | **$12.52** | **($290.33)** |

EXPLANATION OF COST DISTORTION

The traditional system over-allocated overhead to Standard Parts because:
1. **Volume bias**: DL hours favor high-volume products
2. **Complexity ignored**: Custom Parts consume disproportionate setups (5× more per unit), engineering (5× more), and inspections

Custom Parts consumption per unit is dramatically higher for non-volume-related activities, but traditional costing spreads these costs evenly across labor hours.

STRATEGIC IMPLICATIONS

1. **Pricing**: Custom Parts price of $150 must increase to $500+ for profitability
2. **Product Mix**: Consider discontinuing or repricing Custom Parts
3. **Process Improvement**: Reduce setups and engineering time for Custom
4. **Customer Profitability**: Customers ordering Custom Parts are unprofitable

IMPLEMENTATION RECOMMENDATION

**Recommend permanent ABC implementation** with modifications:
- Use time-driven ABC to simplify ongoing maintenance
- Focus on 10-15 activities covering 80% of overhead
- Update cost drivers annually, not monthly
- Integrate with ERP for automated data collection

**Expected Benefits:**
- Accurate product costing for pricing decisions
- Better make/buy decisions
- Improved capacity planning
- Customer profitability analysis

**Costs:**
- Initial implementation: $150,000-$200,000
- Annual maintenance: $30,000-$50,000

The $290 per unit loss on Custom Parts (totaling $1.45M annually) far exceeds implementation costs.`,
  },

  {
    id: 'cma1-wc-012',
    section: 'CMA1',
    type: 'written_communication',
    topic: 'Target Costing and Value Engineering',
    difficulty: 'medium',
    estimatedTime: 25,
    blueprintArea: 'CMA1-A',
    scenario: `ElectroGadgets is developing a new smartwatch. Market research indicates:
- Target selling price: $299 (competitive necessity)
- Required profit margin: 20%
- Current estimated cost based on design: $280

The engineering team says they've optimized the design and cannot reduce costs further without compromising quality.

The CFO refuses to approve the project unless target cost is achieved.`,
    task: `Write a memo that:
1. Explains target costing methodology and its origin.
2. Calculates the allowable (target) cost for this smartwatch.
3. Proposes value engineering techniques to close the cost gap.
4. Addresses how to handle the conflict between engineering's position and financial requirements.`,
    keyPoints: [
      'Target costing starts with market price',
      'Target cost = Price - Required profit',
      'Value engineering: function analysis, design for manufacturing',
      'Component teardown of competitor products',
      'Cross-functional teams for cost reduction',
      'Trade-offs between features and cost',
    ],
    rubric: {
      organization: {
        weight: 30,
        criteria: [
          'Uses proper memo format addressed to the CFO',
          'Explains the target costing methodology before applying it to the smartwatch scenario',
          'Presents the cost gap calculation clearly before proposing value engineering solutions',
          'Addresses the engineering-finance conflict resolution as a distinct section',
        ],
      },
      development: {
        weight: 40,
        criteria: [
          'Correctly explains target costing methodology and contrasts it with traditional cost-plus pricing',
          'Calculates the target cost accurately ($299 − 20% = $239.20) and identifies the $40.80 cost gap',
          'Proposes specific value engineering techniques (component teardown, DFM, functional analysis) to close the gap',
          'Addresses the engineering team\'s resistance with a constructive cross-functional approach',
          'Recommends a decision framework if the target cost cannot be achieved (lower margin, higher price justification, or cancellation)',
        ],
      },
      expression: {
        weight: 30,
        criteria: [
          'Uses professional tone suitable for presenting a financial analysis to the CFO',
          'Employs correct cost management terminology (target costing, value engineering, design for manufacturing, functional analysis)',
          'Presents calculations and cost breakdowns clearly with supporting labels',
          'Writes in clear, concise sentences free of grammatical errors',
        ],
      },
    },
    sampleResponse: `MEMORANDUM

TO: Chief Financial Officer
FROM: [Candidate], Cost Management Analyst
DATE: [Current Date]
RE: Target Costing Analysis - Smartwatch Project

TARGET COSTING METHODOLOGY

Target costing reverses traditional cost-plus pricing by starting with the market. Developed by Toyota in the 1960s, it ensures products are profitable before launch.

**Traditional Approach:**
Cost + Desired Profit = Selling Price (then hope market accepts it)

**Target Costing:**
Market Selling Price - Required Profit = Target Cost (then design to this cost)

TARGET COST CALCULATION

| Element | Calculation | Amount |
|---------|-------------|--------|
| Target Selling Price | Market-driven | $299.00 |
| Required Profit Margin | 20% of price | ($59.80) |
| **Target (Allowable) Cost** | | **$239.20** |

| | Current | Target | Gap |
|---|---------|--------|-----|
| Estimated Cost | $280.00 | $239.20 | **$40.80** |

The product cannot launch until we close this $40.80 cost gap.

VALUE ENGINEERING TECHNIQUES

Value Engineering analyzes each component for its function vs. cost:

**Value = Function / Cost**

Techniques to close the gap:

**1. Component Teardown**
Disassemble competitor products (Apple Watch, Fitbit) to identify:
- Cheaper component suppliers
- More efficient designs
- Unnecessary features we've included

**2. Design for Manufacturing (DFM)**
Work with manufacturing early to identify:
- Parts that are difficult to assemble (redesign)
- Opportunities to reduce part count
- Standard vs. custom components

**3. Functional Analysis**
| Function | Current Cost | Essential? | Reduction Target |
|----------|--------------|------------|------------------|
| OLED Display | $65 | Yes | Negotiate volume price: -$10 |
| Heart Rate Sensor | $25 | Yes | Alternative supplier: -$5 |
| Premium Band | $20 | No | Offer as upgrade: -$12 |
| Water Resistance (100m) | $15 | Partial | Reduce to 50m: -$8 |
| GPS | $30 | Optional | Offer GPS variant at +$50 |
| Other Components | $125 | Mixed | Process improvements: -$10 |
| **Total Reductions** | | | **-$45** |

With these reductions: $280 - $45 = $235 (below target of $239)

**4. Supplier Partnerships**
- Share target costs with suppliers
- Long-term contracts for volume discounts
- Joint development for cost-efficient components

RESOLVING ENGINEERING-FINANCE CONFLICT

The engineering team's position ("cannot reduce costs") often stems from:
1. Evaluating in isolation (not cross-functionally)
2. Protecting their design decisions
3. Focusing on performance over value

**Resolution Approach:**
1. Form cross-functional team: Engineering, Marketing, Manufacturing, Procurement
2. Share customer value research—which features truly matter?
3. Focus on value, not just cost: "Can we deliver the same benefit cheaper?"
4. Set component-level target costs from the total target
5. Incentivize engineers on value delivered, not features added

**Key Insight:** Engineering optimization without market context optimizes the wrong things. Value engineering asks: "Is this feature worth its cost to the customer?"

RECOMMENDATION

Approve the project contingent on a 90-day value engineering sprint. If target cost is not achievable, either:
- Accept lower margin (12% minimum)
- Add differentiating features that justify higher price
- Cancel project

The market will not pay more than $299 for a comparable smartwatch.`,
  },

  // CMA1-E: Internal Controls
  {
    id: 'cma1-wc-013',
    section: 'CMA1',
    type: 'written_communication',
    topic: 'Internal Control Deficiency Assessment',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'CMA1-E',
    scenario: `During a routine review, the following issues were identified at MidSize Corp:

1. The accounts payable clerk has authority to add vendors, process invoices, and approve payments up to $10,000.
2. Physical inventory counts are performed annually but not reconciled to perpetual records until year-end.
3. IT administrator passwords are shared among three staff members "for coverage purposes."
4. The CFO verbally approves wire transfers over the phone without written confirmation.
5. Cash receipts from customers are held in an office safe for up to a week before depositing.

Management asks you to assess these issues and prioritize remediation.`,
    task: `Write a memo that:
1. Classifies each issue as a control deficiency, significant deficiency, or material weakness.
2. Explains the COSO component violated by each issue.
3. Prioritizes remediation based on risk exposure.
4. Recommends specific control improvements for the top three issues.`,
    keyPoints: [
      'Distinguish deficiency levels (MW, SD, D)',
      'Map to COSO components (Control Activities, etc.)',
      'Segregation of duties violations',
      'Risk prioritization framework',
      'Specific control remediation steps',
      'Cost-benefit of control improvements',
    ],
    rubric: {
      organization: {
        weight: 30,
        criteria: [
          'Uses proper memo format addressed to the Management Team',
          'Classifies each issue systematically with a structured table or list format',
          'Prioritizes remediation based on a clear risk-ranking framework',
          'Provides detailed remediation steps for the top-priority issues in a logical, actionable format',
        ],
      },
      development: {
        weight: 40,
        criteria: [
          'Correctly classifies each issue as a control deficiency, significant deficiency, or material weakness with justification',
          'Maps each issue to the appropriate COSO component (Control Activities, Monitoring, Information & Communication)',
          'Prioritizes issues based on fraud risk exposure and likelihood of material misstatement',
          'Provides specific, actionable remediation steps for at least the top three issues with timelines and estimated costs',
          'Demonstrates understanding of the distinction between material weakness and significant deficiency definitions',
        ],
      },
      expression: {
        weight: 30,
        criteria: [
          'Uses professional tone appropriate for an internal audit communication to management',
          'Employs correct internal control and audit terminology (COSO framework, material weakness, segregation of duties, compensating controls)',
          'Presents classifications and rankings in clear, well-organized tables',
          'Writes in clear, concise sentences free of grammatical errors',
        ],
      },
    },
    sampleResponse: `MEMORANDUM

TO: Management Team
FROM: [Candidate], Internal Audit Manager
DATE: [Current Date]
RE: Internal Control Deficiency Assessment and Remediation Priority

CLASSIFICATION OF CONTROL ISSUES

| # | Issue | Classification | COSO Component |
|---|-------|----------------|----------------|
| 1 | AP clerk controls vendor master, invoices, payments | **Material Weakness** | Control Activities - Segregation of Duties |
| 2 | Annual inventory count, delayed reconciliation | Significant Deficiency | Monitoring - Timely identification of errors |
| 3 | Shared IT admin passwords | **Material Weakness** | Control Activities - Logical access controls |
| 4 | Verbal wire approvals without documentation | **Material Weakness** | Information & Communication - Authorization evidence |
| 5 | Cash held 1 week before deposit | Significant Deficiency | Control Activities - Safeguarding assets |

**Definitions:**
- *Material Weakness*: Reasonable possibility of material misstatement not being detected
- *Significant Deficiency*: Less severe but merits attention from those charged with governance
- *Control Deficiency*: Minor issue not rising to above levels

RISK PRIORITIZATION

| Rank | Issue | Risk Exposure | Remediation Urgency |
|------|-------|---------------|---------------------|
| **1** | AP Clerk (Issue 1) | Fictitious vendors, fraudulent payments | Immediate (30 days) |
| **2** | Wire Transfers (Issue 4) | Unauthorized large transfers, fraud | Immediate (30 days) |
| **3** | Shared Passwords (Issue 3) | Unauthorized access, audit trail loss | High (60 days) |
| **4** | Cash Deposits (Issue 5) | Theft, lapping, float loss | Medium (90 days) |
| **5** | Inventory Reconciliation (Issue 2) | Shrinkage, misstatement | Medium (90 days) |

RECOMMENDED REMEDIATION - TOP THREE ISSUES

**ISSUE 1: AP Clerk Authority (Highest Priority)**

*Current Risk:* Clerk can create fictitious vendor, submit invoice, and approve payment—a complete fraud loop with $10,000 exposure per transaction.

*Remediation:*
1. Segregate vendor master maintenance to a separate employee (or supervisor approval for new vendors)
2. Implement three-way match (PO, receipt, invoice) before payment processing
3. Require manager approval for all payments, regardless of amount
4. Implement vendor master change reports reviewed weekly by controller
5. Consider moving to AP automation with workflow controls

*Timeline:* 30 days | *Cost:* Low (process change)

**ISSUE 4: Wire Transfer Approvals (High Priority)**

*Current Risk:* Fraudster could impersonate CFO and authorize large wire transfers. No audit trail exists.

*Remediation:*
1. Require dual authorization for all wires over $5,000
2. Implement written authorization form (or secure digital approval) before execution
3. Establish callback verification to known phone number for wires over $25,000
4. Configure banking platform for multi-user approval
5. Review all wire activity monthly at management level

*Timeline:* 30 days | *Cost:* Minimal (bank configuration, new form)

**ISSUE 3: Shared IT Admin Passwords (High Priority)**

*Current Risk:* No individual accountability. If malicious activity occurs, cannot identify responsible party. External auditors may qualify opinion.

*Remediation:*
1. Create individual admin accounts for each IT staff member
2. Implement privileged access management (PAM) solution
3. Enable logging on all admin activities
4. Remove shared account or convert to "break glass" emergency access only
5. Review admin access logs weekly

*Timeline:* 60 days | *Cost:* Moderate (PAM tool $10-20K + implementation)

SUMMARY

Three material weaknesses require immediate remediation before year-end audit. The AP clerk issue and wire transfer vulnerabilities present fraud risk; shared passwords compromise audit trail integrity. I recommend an internal controls task force to implement these changes and test operating effectiveness before December 31.

Remaining issues (#2, #5) should be addressed in Q2 as significant but not fraud-enabling.`,
  },

  // CMA1-F: Technology and Analytics
  {
    id: 'cma1-wc-014',
    section: 'CMA1',
    type: 'written_communication',
    topic: 'RPA Implementation Business Case',
    difficulty: 'medium',
    estimatedTime: 25,
    blueprintArea: 'CMA1-F',
    scenario: `The Controller is considering implementing Robotic Process Automation (RPA) for the accounts payable department. Current state:
- 8 AP staff processing 50,000 invoices annually
- Average processing time: 15 minutes per invoice
- Error rate: 3%
- Annual labor cost: $600,000
- Annual late payment penalties: $45,000

RPA vendor quote:
- Implementation: $200,000
- Annual license: $60,000
- Expected reduction: 70% of invoice processing time
- Expected error rate: 0.5%

The CFO wants a comprehensive analysis before approving.`,
    task: `Write a memo that:
1. Quantifies the potential ROI of RPA implementation.
2. Identifies non-financial benefits and risks.
3. Recommends processes beyond AP that could benefit from RPA.
4. Proposes an implementation approach with success metrics.`,
    keyPoints: [
      'ROI calculation with labor savings and error reduction',
      'Payback period analysis',
      'Non-financial benefits (speed, employee satisfaction)',
      'Risks (change management, bot maintenance)',
      'Candidate processes for RPA (rule-based, repetitive)',
      'Phased implementation approach',
    ],
    rubric: {
      organization: {
        weight: 30,
        criteria: [
          'Uses proper memo format addressed to the CFO as a business case',
          'Presents financial analysis (ROI, payback) before non-financial considerations',
          'Separates risks, additional RPA opportunities, and implementation phases into distinct sections',
          'Concludes with a clear investment recommendation and funding request',
        ],
      },
      development: {
        weight: 40,
        criteria: [
          'Correctly quantifies labor savings from the 70% time reduction and error rate improvement',
          'Calculates ROI and payback period accurately using implementation cost and net annual savings',
          'Identifies both non-financial benefits (speed, scalability, audit trail) and risks (change management, bot maintenance, vendor lock-in)',
          'Recommends additional candidate processes for RPA beyond AP with sound justification (rule-based, repetitive)',
          'Proposes a phased implementation approach with specific success metrics per phase',
        ],
      },
      expression: {
        weight: 30,
        criteria: [
          'Uses professional tone appropriate for a technology investment business case to the CFO',
          'Employs correct financial analysis and technology terminology (ROI, payback period, RPA, FTE, automation rate)',
          'Presents calculations in clear, well-labeled tables',
          'Writes in clear, concise, persuasive language free of grammatical errors',
        ],
      },
    },
    sampleResponse: `MEMORANDUM

TO: Chief Financial Officer
FROM: [Candidate], Finance Transformation Lead
DATE: [Current Date]
RE: RPA Implementation Business Case - Accounts Payable

FINANCIAL ANALYSIS

**Current State Costs:**
| Item | Annual Cost |
|------|------------|
| AP Staff Labor (8 FTEs) | $600,000 |
| Late Payment Penalties (3% error-driven) | $45,000 |
| **Total** | **$645,000** |

**Projected RPA State:**
| Item | Calculation | Amount |
|------|-------------|--------|
| Labor Savings | 70% time reduction = 5.6 FTE equivalent | $420,000 |
| Error Reduction | 3% → 0.5% = 83% penalty reduction | $37,350 |
| **Gross Savings** | | **$457,350** |
| Less: Annual License | | ($60,000) |
| **Net Annual Savings** | | **$397,350** |

**ROI Calculation:**
| Metric | Value |
|--------|-------|
| Implementation Cost | $200,000 |
| Net Annual Savings | $397,350 |
| **Payback Period** | **6.0 months** |
| **3-Year ROI** | **495%** |

*3-Year Total: ($397,350 × 3) - $200,000 = $992,050 net benefit*

NON-FINANCIAL BENEFITS

| Benefit | Impact |
|---------|--------|
| Processing Speed | Invoices processed in minutes vs. hours |
| 24/7 Operation | Bots work overnight, weekends |
| Vendor Relationships | Faster payments, early payment discounts |
| Scalability | Handle volume spikes without hiring |
| Employee Satisfaction | Staff focus on exceptions, not data entry |
| Audit Trail | Perfect documentation of every action |

RISKS AND MITIGATION

| Risk | Mitigation |
|------|------------|
| Change management resistance | Redeploy staff to analysis, not eliminate |
| Bot maintenance requirements | Train 1-2 staff as "citizen developers" |
| Exception handling | Design escalation workflow to humans |
| Vendor lock-in | Ensure data portability, standard protocols |
| System changes break bots | Include IT in change management for upstream systems |

ADDITIONAL RPA CANDIDATES

Beyond AP, these processes are ideal for RPA:

**High Priority (Rule-based, High Volume):**
1. **Accounts Receivable Cash Application** - Match payments to invoices
2. **Bank Reconciliation** - Compare bank feeds to GL
3. **Expense Report Processing** - Policy checking, approvals
4. **Intercompany Journal Entries** - Standard eliminations

**Medium Priority:**
5. Month-end close journal entries (standard accruals)
6. Sales commission calculations
7. Customer master data updates
8. Vendor master data updates

**Estimated Total Finance RPA Savings: $800,000-$1.2M annually**

IMPLEMENTATION APPROACH

**Phase 1 (Months 1-3): AP Pilot**
- Implement 3 bots for invoice processing
- Target 50% automation rate
- Train 2 staff as bot managers
- Success Metrics:
  - Processing time reduced 50%+
  - Error rate below 1%
  - Staff redeployed to analysis roles

**Phase 2 (Months 4-6): AP Expansion**
- Add exception handling workflows
- Integrate with ERP for auto-posting
- Achieve 70% automation target
- Success Metrics:
  - 5+ FTE equivalent savings realized
  - Zero late payments due to processing delay

**Phase 3 (Months 7-12): Expand to Other Processes**
- Apply proven model to AR and bank reconciliation
- Build internal RPA Center of Excellence
- Success Metrics:
  - 15+ bots deployed
  - $600,000+ annual savings realized

RECOMMENDATION

**Approve AP RPA implementation.** The 6-month payback and 495% ROI easily justify the investment. Beyond financial returns, RPA positions the finance function for future automation expansion.

Request: $200,000 implementation + $60,000 Year 1 license = $260,000 first year investment.`,
  },

  {
    id: 'cma1-wc-015',
    section: 'CMA1',
    type: 'written_communication',
    topic: 'Data Analytics for Fraud Detection',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'CMA1-F',
    scenario: `InternalAudit Corp recently deployed data analytics software for continuous auditing. Initial analysis of 18 months of accounts payable data revealed:

Findings:
1. 47 vendors with same bank account numbers as employees
2. 23 invoices processed on weekends by a single AP clerk
3. 156 invoices exactly at the $9,999 approval threshold
4. 12 vendors with PO Box addresses in high-fraud states
5. Average payment to Vendor XYZ: $8,500/invoice (compared to $1,200 peer average)

The audit committee wants you to assess these findings and recommend next steps.`,
    task: `Write a memo that:
1. Prioritizes these findings based on fraud risk indicators.
2. Explains the specific fraud schemes each finding might indicate.
3. Recommends immediate investigation steps for the top two findings.
4. Proposes ongoing analytics routines to detect similar issues proactively.`,
    keyPoints: [
      'Red flag prioritization based on fraud triangle',
      'Common fraud schemes (ghost vendors, split invoices)',
      'Investigation steps (forensic analysis)',
      'Benford\'s Law and duplicate testing',
      'Continuous monitoring recommendations',
      'Balance of false positives vs. coverage',
    ],
    rubric: {
      organization: {
        weight: 30,
        criteria: [
          'Uses proper memo format addressed to the Audit Committee',
          'Prioritizes findings in a clear risk-ranked order with supporting rationale',
          'Separates fraud scheme analysis, investigation steps, and ongoing monitoring into distinct sections',
          'Presents detailed investigation steps for the top two findings in a week-by-week or phased format',
        ],
      },
      development: {
        weight: 40,
        criteria: [
          'Correctly prioritizes the five findings based on fraud risk indicators and potential financial exposure',
          'Identifies the specific fraud scheme each finding could indicate (ghost vendors, split invoicing, unauthorized payments)',
          'Proposes thorough investigation steps for the top two findings (e.g., cross-matching vendor/employee bank accounts, reviewing weekend transaction patterns)',
          'Recommends ongoing analytics routines (Benford\'s Law, duplicate testing, vendor master monitoring) for proactive detection',
          'Addresses false positive management and the balance between detection coverage and investigation capacity',
        ],
      },
      expression: {
        weight: 30,
        criteria: [
          'Uses professional tone appropriate for a high-stakes audit committee communication',
          'Employs correct fraud examination and data analytics terminology (Fraud Triangle, ghost vendor, Benford\'s Law, continuous monitoring)',
          'Presents findings and investigation steps in clear, structured tables and lists',
          'Writes in clear, concise, authoritative language free of grammatical errors',
        ],
      },
    },
    sampleResponse: `MEMORANDUM

TO: Audit Committee
FROM: [Candidate], Internal Audit Director
DATE: [Current Date]
RE: Accounts Payable Data Analytics Findings - Fraud Risk Assessment

FINDING PRIORITIZATION BY FRAUD RISK

| Priority | Finding | Risk Level | Potential Fraud Scheme |
|----------|---------|------------|------------------------|
| **1** | 47 vendors with same bank accounts as employees | **CRITICAL** | Ghost vendor fraud - payments to fictitious vendors deposited in employee accounts |
| **2** | 23 weekend invoices by single clerk | **HIGH** | Unauthorized payments processed outside normal supervision |
| **3** | 156 invoices at $9,999 | **HIGH** | Split invoicing to avoid approval threshold |
| 4 | 12 vendors with PO Box addresses | MEDIUM | May be legitimate small vendors; shell company risk |
| 5 | Vendor XYZ high average | MEDIUM | Overbilling, but could be legitimate high-value goods |

FRAUD SCHEME ANALYSIS

**Finding 1: Employee-Vendor Bank Account Matches**
- *Scheme*: Employee creates fictitious vendor ("ghost vendor"), submits invoices, approves (if $10K threshold exists), collections payments directly
- *Fraud Triangle*: Opportunity (control weakness), Rationalization (they deserve it), Pressure (personal financial issues)
- *Impact*: Potentially $millions depending on duration

**Finding 2: Weekend Processing by Single Clerk**
- *Scheme*: Processing unauthorized payments when no supervision present; may correlate with Finding 1
- *Note*: Not fraud-indicative alone (could be catching up on work), but combined with other factors = highly suspicious

**Finding 3: $9,999 Invoice Clustering**
- *Scheme*: Splitting legitimate or fraudulent purchases to stay below $10,000 approval threshold
- *Benford's Law*: First digit "9" should appear 4.6% of the time; clustering at $9,999 is statistically anomalous

IMMEDIATE INVESTIGATION STEPS

**FINDING 1: Ghost Vendor Investigation**

*Week 1:*
1. Run cross-match report: All 47 vendors matched to employee names
2. Pull complete payment history for matched vendors ($ amount, dates, approver)
3. Freeze any pending payments to these vendors
4. Engage forensic accountant if amounts are material

*Week 2:*
1. Review vendor master documentation for each matched vendor (W-9, contracts)
2. Interview employees whose bank accounts match (non-accusatory fact-finding)
3. Analyze if single employee processed and approved any transactions
4. Map invoices to legitimate business purpose (PO, receiving reports)

*Expected Outcome:* Identify confirmed ghost vendor relationships and total fraud exposure

**FINDING 2: Weekend Processing Review**

*Week 1:*
1. Identify the clerk processing weekend invoices (from system logs)
2. Cross-reference with Finding 1—are weekend invoices going to matched vendors?
3. Pull complete history of this clerk's transactions
4. Interview clerk's supervisor about overtime/unusual access

*Week 2:*
1. Review for proper approvals on weekend-processed invoices
2. Compare weekend invoices to normal invoices (vendor profile, amount patterns)
3. Analyze badge access and VPN logs—was clerk actually in office?

*Expected Outcome:* Determine if weekend processing is legitimate workload or fraud facilitation

ONGOING ANALYTICS ROUTINES

Implement continuous monitoring program:

| Test | Frequency | Purpose |
|------|-----------|---------|
| Vendor-Employee Bank Match | Weekly | Ghost vendor detection |
| Duplicate Invoice Detection | Daily | Duplicate payment prevention |
| Approval Threshold Clustering | Monthly | Split invoice detection |
| Benford's Law Analysis | Quarterly | Anomalous amount patterns |
| Vendor Master Changes | Daily | Unauthorized vendor additions |
| Same-Day Approval/Payment | Weekly | Segregation of duties bypass |
| Invoice Round Numbers | Monthly | Estimated vs. actual cost |
| Vendor Address Changes | Weekly | Payment diversion attempts |

**False Positive Management:**
- Establish baseline for each test
- Tune thresholds based on investigation outcomes
- Create exception whitelist for legitimate business reasons

RECOMMENDATION

Immediately prioritize Finding 1 investigation—ghost vendor fraud is the most financially damaging AP fraud type and the data strongly suggests active fraud. Finding 2 may be connected and should be investigated in parallel.

Suspend the identified clerk's AP access pending investigation. This is a precautionary measure, not an accusation.

I will provide a follow-up report within 30 days with confirmed findings and fraud exposure quantification.`,
  },

  {
    id: 'cma1-wc-016',
    section: 'CMA1',
    type: 'written_communication',
    topic: 'Variance Analysis Trade-offs and Investigation Thresholds',
    difficulty: 'medium',
    estimatedTime: 25,
    blueprintArea: 'CMA1-F',
    scenario: `Manufacturing division reported the following results for November:

Standard costs (per unit):
- Direct Materials: 3 lbs @ $5/lb = $15
- Direct Labor: 2 hours @ $20/hr = $40
- Variable Overhead: 2 hours @ $10/hr = $20

November Production: 10,000 units

Actual costs:
- Direct Materials: 32,000 lbs @ $4.80/lb = $153,600
- Direct Labor: 21,500 hours @ $21/hr = $451,500
- Variable Overhead: $225,000

The plant manager claims efficiency improved due to using slightly more material.`,
    task: `Write a memo that:
1. Calculates all relevant variances (price, quantity, rate, efficiency).
2. Analyzes the trade-offs the plant manager describes.
3. Determines whether the variances warrant investigation based on a 10% materiality threshold.
4. Recommends specific actions for variances requiring investigation.`,
    keyPoints: [
      'Material price variance, quantity variance',
      'Labor rate variance, efficiency variance',
      'Variable overhead spending and efficiency',
      'Trade-off analysis (quality vs quantity)',
      'Materiality thresholds for investigation',
      'Root cause analysis approach',
    ],
    rubric: {
      organization: {
        weight: 30,
        criteria: [
          'Uses proper memo format addressed to the VP of Manufacturing',
          'Organizes variance calculations by cost category (materials, labor, overhead) with clear headings',
          'Separates quantitative variance analysis from the trade-off evaluation and investigation recommendations',
          'Includes a summary table showing all variances with materiality determination',
        ],
      },
      development: {
        weight: 40,
        criteria: [
          'Correctly calculates material price variance ($6,400 F) and quantity variance ($10,000 U)',
          'Correctly calculates labor rate variance ($21,500 U) and efficiency variance ($30,000 U)',
          'Correctly calculates variable overhead spending ($10,000 U) and efficiency ($15,000 U) variances',
          'Evaluates the plant manager\'s trade-off claim against the actual data (more material did NOT improve labor efficiency)',
          'Applies the 10% materiality threshold to determine which variances warrant investigation and recommends specific root cause analysis steps',
        ],
      },
      expression: {
        weight: 30,
        criteria: [
          'Uses professional tone appropriate for a cost analysis memo to manufacturing leadership',
          'Employs correct variance analysis terminology (price variance, efficiency variance, spending variance, standard cost)',
          'Presents variance calculations in clear, well-labeled tables with formulas shown',
          'Writes in clear, concise sentences free of grammatical errors',
        ],
      },
    },
    sampleResponse: `MEMORANDUM

TO: VP of Manufacturing
FROM: [Candidate], Cost Accountant
DATE: [Current Date]
RE: November Manufacturing Variance Analysis

VARIANCE CALCULATIONS

**DIRECT MATERIALS**

Standard Quantity Allowed = 10,000 units × 3 lbs = 30,000 lbs
Actual Quantity Used = 32,000 lbs
Standard Price = $5.00/lb
Actual Price = $4.80/lb

| Variance | Formula | Calculation | Amount |
|----------|---------|-------------|--------|
| Price Variance | (AP - SP) × AQ | ($4.80 - $5.00) × 32,000 | **$6,400 F** |
| Quantity Variance | (AQ - SQ) × SP | (32,000 - 30,000) × $5.00 | **$10,000 U** |
| **Net Materials Variance** | | | **$3,600 U** |

**DIRECT LABOR**

Standard Hours Allowed = 10,000 units × 2 hrs = 20,000 hrs
Actual Hours = 21,500 hrs
Standard Rate = $20/hr
Actual Rate = $21/hr

| Variance | Formula | Calculation | Amount |
|----------|---------|-------------|--------|
| Rate Variance | (AR - SR) × AH | ($21 - $20) × 21,500 | **$21,500 U** |
| Efficiency Variance | (AH - SH) × SR | (21,500 - 20,000) × $20 | **$30,000 U** |
| **Net Labor Variance** | | | **$51,500 U** |

**VARIABLE OVERHEAD**

Standard Overhead = 10,000 × $20 = $200,000
Actual Overhead = $225,000

Budgeted OH at Actual Hours = 21,500 × $10 = $215,000

| Variance | Formula | Calculation | Amount |
|----------|---------|-------------|--------|
| Spending Variance | Actual - Budgeted at AH | $225,000 - $215,000 | **$10,000 U** |
| Efficiency Variance | (AH - SH) × Standard Rate | (21,500 - 20,000) × $10 | **$15,000 U** |
| **Net Overhead Variance** | | | **$25,000 U** |

**TOTAL VARIANCE SUMMARY**

| Category | Variance | % of Standard |
|----------|----------|---------------|
| Direct Materials | $3,600 U | 2.4% |
| Direct Labor | $51,500 U | **12.9%** |
| Variable Overhead | $25,000 U | **12.5%** |
| **Total** | **$80,100 U** | 10.7% |

TRADE-OFF ANALYSIS

The plant manager claims using more material improved efficiency. The data does NOT support this claim:

| Metric | Expected from Trade-off | Actual Result |
|--------|-------------------------|---------------|
| Material usage | Intentionally higher | +2,000 lbs (confirmed) |
| Labor efficiency | Should IMPROVE | +1,500 hrs WORSE (7.5% inefficient) |
| Net benefit | Positive | $51,500 labor unfavorable |

**Conclusion:** The materials trade-off did not yield the claimed labor efficiencies. In fact, both materials AND labor are unfavorable.

MATERIALITY ANALYSIS (10% THRESHOLD)

| Variance | Amount | % of Budget | Investigate? |
|----------|--------|-------------|--------------|
| Materials Price | $6,400 F | 4.3% | No |
| Materials Quantity | $10,000 U | 6.7% | No |
| Labor Rate | $21,500 U | 5.4% | No |
| **Labor Efficiency** | **$30,000 U** | **7.5%** | **Yes** |
| Overhead Spending | $10,000 U | 5.0% | No |
| **Overhead Efficiency** | **$15,000 U** | **7.5%** | **Yes** |

*Combined labor and overhead efficiency = $45,000 U = highly material*

INVESTIGATION RECOMMENDATIONS

**Labor Efficiency Variance ($30,000 U)**

Root Cause Possibilities:
1. Machine downtime or maintenance issues
2. New/untrained workers on the line
3. Product mix change requiring more labor
4. Quality issues requiring rework

Investigation Steps:
- Review production log for downtime events
- Analyze hours by employee (new vs. experienced)
- Compare November product mix to standard assumptions
- Review reject/rework reports for quality issues

**Overhead Efficiency Variance ($15,000 U)**

Driven by same 1,500 excess labor hours (overhead applied on labor hours)

- Address labor efficiency; overhead will follow

**Materials Trade-off Claim:**

Request documentation from plant manager:
- What was the hypothesis for using more material?
- What measurement showed expected labor savings?
- Why did labor hours INCREASE rather than decrease?

Possible: Manager purchased lower-grade material (explaining favorable price) which caused MORE labor to process, negating any benefit.

SUMMARY

Total November unfavorable variance is $80,100 (10.7%). The materials price savings ($6,400) did not offset labor inefficiency ($30,000) and overhead efficiency ($15,000). Investigate labor hours as priority.`,
  },
];

export default CMA1_ESSAYS_EXTENDED;

/**
 * CMA Essays - Additional Scenarios Batch
 * 
 * 7 high-quality essay/written communication scenarios
 * balanced across both CMA Parts
 * 
 * Part 1 (5 essays):
 * - CMA1-B: Budgeting & Forecasting
 * - CMA1-C: Performance Management
 * - CMA1-D: Cost Management
 * - CMA1-E: Internal Controls
 * - CMA1-D: Variance Analysis
 * 
 * Part 2 (5 essays):
 * - CMA2-B: Corporate Finance
 * - CMA2-C: Decision Analysis
 * - CMA2-D: Risk Management
 * - CMA2-E: Capital Budgeting
 * - CMA2-F: Professional Ethics
 */

import { WCTask } from '../../../types';

export const CMA_ESSAYS_ADDITIONAL: WCTask[] = [
  // ==========================================
  // PART 1 ESSAYS
  // ==========================================
  // CMA1-E: Internal Controls
  {
    id: 'cma-wc-add-004',
    section: 'CMA1',
    type: 'written_communication',
    topic: 'Fraud Investigation and Control Recommendations',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'CMA1-E',
    scenario: `Internal audit at Vertex Corporation discovered irregularities in the accounts payable department:

Findings:
1. AP clerk has processed 47 payments to "Johnson Consulting LLC" totaling $238,000 over 18 months
2. Johnson Consulting has no vendor file documentation, contracts, or approved purchase orders
3. The payments bypass the standard 3-way match process
4. The same AP clerk who enters invoices also approves payments under $5,000
5. Investigation reveals "Johnson Consulting" shares an address with the AP clerk's spouse
6. The AP Manager had not reviewed the vendor master file in 3 years

The CFO has asked for your assessment and remediation plan.`,
    task: `As Internal Audit Manager, prepare a report that:
1. Applies the fraud triangle to explain how this fraud occurred.
2. Identifies the specific control weaknesses that enabled the scheme.
3. Recommends control improvements to prevent recurrence.
4. Addresses the human resources and legal implications.`,
    keyPoints: [
      'Fraud triangle: Pressure (unknown), Opportunity (weak controls), Rationalization',
      'Control failures: segregation of duties, vendor approval, payment approval limits',
      'COSO framework gaps in control activities and monitoring',
      'Recommendations: segregate duties, vendor verification, payment authorization',
    ],
    sampleResponse: `CONFIDENTIAL FRAUD INVESTIGATION REPORT

TO: Chief Financial Officer
FROM: [Candidate Name], Internal Audit Manager
DATE: [Current Date]
RE: Accounts Payable Fraud - Investigation Findings and Remediation

EXECUTIVE SUMMARY

Our investigation confirms a fictitious vendor fraud scheme totaling $238,000. The scheme exploited significant control weaknesses in accounts payable. Immediate remediation and personnel action are required.

FRAUD TRIANGLE ANALYSIS

The fraud triangle explains conditions enabling fraud:

OPPORTUNITY (Primary Factor):
Multiple control failures created opportunity:
- No segregation between invoice entry and payment approval
- $5,000 approval threshold circumvented through multiple smaller payments
- Vendor master file not monitored or reviewed
- No three-way match requirement enforced

RATIONALIZATION:
The perpetrator likely justified actions through:
- "The company won't notice small amounts"
- "I'm underpaid for my work"
- "Others do it too" (if control culture is weak)

PRESSURE (Unknown):
Financial pressure likely present but specific cause unknown. HR investigation may reveal circumstances.

CONTROL WEAKNESS ANALYSIS

| COSO Component | Failure | Impact |
|----------------|---------|--------|
| Control Activities | No segregation of duties | Clerk could create vendor, enter invoice, AND approve payment |
| Control Activities | Approval threshold too high | $5,000 limit allowed 47 fraudulent payments |
| Control Activities | 3-way match bypassed | No PO or receiving document required |
| Monitoring | No vendor master file review | Fictitious vendor existed 18 months undetected |
| Risk Assessment | Shell company risk not assessed | No verification of vendor legitimacy |

REMEDIATION RECOMMENDATIONS

Immediate Actions (Week 1):
1. Suspend AP clerk pending HR investigation
2. Block all payments to Johnson Consulting LLC
3. Review all vendor additions in past 24 months
4. Change access credentials for AP systems

Short-Term Controls (30 days):
1. SEGREGATION OF DUTIES
   - Separate vendor setup, invoice entry, and payment approval
   - No person performs more than one function

2. PAYMENT AUTHORIZATION
   - Lower single-signature limit to $2,500
   - Dual signature for amounts $2,500 - $25,000
   - CFO approval for amounts above $25,000

3. VENDOR VERIFICATION
   - Independent verification of new vendors (W-9, business license)
   - Management approval for vendor master file additions
   - Annual vendor master file audit

4. MATCHING PROCEDURES
   - Enforce 3-way match: PO, receiving, invoice
   - Exception reports for unmatched payments

Long-Term Improvements (90 days):
1. Implement vendor portal with automated verification
2. Data analytics for duplicate addresses, phone numbers, banking info
3. Anonymous fraud hotline promotion
4. AP training on fraud awareness

HUMAN RESOURCES / LEGAL IMPLICATIONS

Personnel Actions:
- Terminate AP clerk for cause (documentation of fraud evidence)
- Evaluate AP Manager for supervisory failure
- Consider disciplinary action for inadequate oversight

Legal Considerations:
- Preserve all evidence for potential prosecution
- Consult legal counsel on criminal referral
- Assess insurance coverage for fidelity bond claim
- Consider civil recovery action against perpetrator

ESTIMATED RECOVERY

- Total fraud amount: $238,000
- Potential insurance recovery: Up to policy limits
- Civil recovery: Uncertain (likely limited personal assets)
- Criminal restitution: Possible if prosecution succeeds

LESSONS LEARNED

This fraud succeeded because basic controls were either absent or unenforced:
- Segregation of duties is non-negotiable in high-risk areas
- Low-value transaction thresholds enable "salami slicing" frauds
- Monitoring controls must actively review for anomalies
- Trust is not a control—verification is required

The $238,000 loss significantly exceeds what robust controls would have cost to implement.`,
    rubric: {
      organization: { weight: 30, criteria: [
        'Uses confidential fraud investigation report format',
        'Separates fraud triangle analysis, control weakness identification, remediation, and legal implications',
        'Presents remediation in tiered urgency (immediate, short-term, long-term)',
        'Includes lessons learned section for organizational improvement',
      ]},
      development: { weight: 40, criteria: [
        'Applies fraud triangle framework comprehensively (opportunity, rationalization, pressure)',
        'Maps specific control failures to COSO framework components',
        'Provides tiered remediation plan with actionable control improvements',
        'Addresses segregation of duties, vendor verification, and payment authorization',
        'Identifies HR, legal, and insurance recovery implications',
      ]},
      expression: { weight: 30, criteria: [
        'Maintains professional and appropriately serious internal audit tone',
        'Uses correct internal controls and fraud terminology (COSO, segregation of duties, three-way match)',
        'Writes with precise, factual language suitable for formal investigation documentation',
        'Demonstrates proper grammar and authoritative professional writing',
      ]},
    },
  },

  // CMA1-D: Variance Analysis
  {
    id: 'cma-wc-add-005',
    section: 'CMA1',
    type: 'written_communication',
    topic: 'Standard Cost Variance Analysis - Challenging Management Explanations',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'CMA1-D',
    scenario: `Apex Manufacturing produces industrial widgets. March results show significant variances:

Standard Costs (per unit):
- Direct Materials: 3 lbs @ $4/lb = $12
- Direct Labor: 2 hours @ $18/hr = $36
- Variable OH: 2 hours @ $6/hr = $12
- Fixed OH: Based on 10,000 units = $8/unit

March Actual Results:
- Units produced: 9,000
- Direct Materials: Purchased 30,000 lbs @ $4.40/lb; Used 28,500 lbs
- Direct Labor: 19,800 hours @ $17.50/hr
- Variable OH: $118,000
- Fixed OH: $82,000

The plant manager says: "The unfavorable variances are just due to inflation—nothing we can do."`,
    task: `As Cost Analyst, prepare a variance analysis report that:
1. Calculates all relevant variances (price, quantity, rate, efficiency, spending).
2. Interprets what each variance indicates about operations.
3. Addresses the plant manager's "inflation" explanation.
4. Recommends specific management actions based on the variances.`,
    keyPoints: [
      'DM: Price variance unfavorable, quantity variance mixed',
      'DL: Rate variance favorable (lower wages), efficiency variance unfavorable',
      'VOH: Spending/efficiency variances reveal overhead control issues',
      'Management actions should target specific causes, not blame inflation',
    ],
    sampleResponse: `VARIANCE ANALYSIS REPORT

TO: Plant Manager, CFO
FROM: [Candidate Name], Cost Analyst  
DATE: [Current Date]
RE: March Production Variances - Analysis and Recommendations

EXECUTIVE SUMMARY

March variances total $13,900 unfavorable. Contrary to the "inflation" explanation, analysis reveals controllable operational issues including excessive material usage, labor inefficiency, and overhead overspending. Targeted actions can address each area.

VARIANCE CALCULATIONS

DIRECT MATERIALS
Standard Quantity Allowed: 9,000 units × 3 lbs = 27,000 lbs

Materials Price Variance (calculated at purchase):
= (AP - SP) × AQ Purchased
= ($4.40 - $4.00) × 30,000 = $12,000 UNFAVORABLE

Materials Quantity Variance:
= (AQ Used - SQ Allowed) × SP
= (28,500 - 27,000) × $4.00 = $6,000 UNFAVORABLE

DIRECT LABOR
Standard Hours Allowed: 9,000 units × 2 hours = 18,000 hours

Labor Rate Variance:
= (AR - SR) × AH
= ($17.50 - $18.00) × 19,800 = $9,900 FAVORABLE

Labor Efficiency Variance:
= (AH - SH Allowed) × SR
= (19,800 - 18,000) × $18.00 = $32,400 UNFAVORABLE

VARIABLE OVERHEAD
VOH Spending Variance:
= Actual VOH - (AH × VOH Rate)
= $118,000 - (19,800 × $6.00) = $118,000 - $118,800 = $800 FAVORABLE

VOH Efficiency Variance:
= (AH - SH Allowed) × VOH Rate
= (19,800 - 18,000) × $6.00 = $10,800 UNFAVORABLE

FIXED OVERHEAD
Budget: 10,000 units × $8.00 = $80,000
FOH Spending Variance:
= Actual FOH - Budgeted FOH
= $82,000 - $80,000 = $2,000 UNFAVORABLE

FOH Volume Variance:
= (Budgeted Units - Actual Units) × FOH Rate
= (10,000 - 9,000) × $8.00 = $8,000 UNFAVORABLE

VARIANCE SUMMARY

| Variance | Amount | F/U |
|----------|--------|-----|
| DM Price | $12,000 | U |
| DM Quantity | $6,000 | U |
| DL Rate | $9,900 | F |
| DL Efficiency | $32,400 | U |
| VOH Spending | $800 | F |
| VOH Efficiency | $10,800 | U |
| FOH Spending | $2,000 | U |
| FOH Volume | $8,000 | U |
| NET VARIANCE | $60,500 | U |

INTERPRETATION

ADDRESSING THE "INFLATION" CLAIM

The plant manager attributes variances to inflation. Analysis contradicts this:

1. Labor Rate is FAVORABLE: We paid $0.50/hour LESS than standard. If inflation were the issue, this would be unfavorable.

2. Materials Price Unfavorable: Yes, $0.40/lb increase exists, BUT this represents only $12,000 of $60,500 total unfavorable variance (20%).

3. The MAJORITY of unfavorable variance ($49,200) is EFFICIENCY-related:
   - DM Quantity: $6,000 (used 1,500 extra pounds)
   - DL Efficiency: $32,400 (used 1,800 extra hours)
   - VOH Efficiency: $10,800 (driven by labor inefficiency)

Conclusion: 80% of unfavorable variance is OPERATIONAL, not inflationary.

ROOT CAUSE ANALYSIS

Materials Quantity Variance ($6,000 U):
- Potential causes: Poor quality materials, inexperienced workers, equipment issues
- 1,500 lbs excess = 5.6% waste vs standard

Labor Efficiency Variance ($32,400 U):
- 1,800 excess hours = 10% inefficiency
- Potential causes: Inadequate training, equipment downtime, poor scheduling
- NOTE: Favorable rate variance (less experienced workers) may CAUSE efficiency problems

Volume Variance ($8,000 U):
- Produced 1,000 fewer units than capacity
- Underutilization of fixed capacity

RECOMMENDATIONS

1. MATERIALS
   - Investigate supplier quality for $4.40 material
   - Determine if price increase brought lower quality causing waste
   - Consider alternative suppliers or renegotiation

2. LABOR
   - The favorable rate variance (lower wages) likely caused unfavorable efficiency
   - Training investment needed for newer/lower-paid workers
   - Evaluate whether labor savings are real given efficiency losses
   - Net labor impact: ($9,900) + $32,400 = $22,500 UNFAVORABLE

3. PRODUCTION SCHEDULING
   - Address 1,000-unit shortfall
   - Better capacity planning to absorb fixed overhead

4. ACCOUNTABILITY
   - Purchasing responsible for price variance
   - Production responsible for quantity and efficiency variances
   - Do not accept "inflation" as blanket explanation

The path to improvement is through operational discipline, not resignation to external factors.`,
    rubric: {
      organization: { weight: 30, criteria: [
        'Uses proper variance analysis report format with executive summary',
        'Separates variance calculations, interpretation, root cause analysis, and recommendations',
        'Presents all variances in consistent format with summary table',
        'Follows logical flow from calculation to managerial action items',
      ]},
      development: { weight: 40, criteria: [
        'Calculates all material, labor, and overhead variances correctly',
        'Challenges the inflation explanation with specific data (favorable labor rate)',
        'Identifies that 80% of unfavorable variance is efficiency-related, not price-related',
        'Analyzes interrelationship between favorable rate and unfavorable efficiency',
        'Recommends specific corrective actions tied to each variance cause',
      ]},
      expression: { weight: 30, criteria: [
        'Maintains professional cost analysis reporting tone',
        'Uses correct variance analysis terminology (price, quantity, rate, efficiency, spending)',
        'Presents calculations clearly with Favorable/Unfavorable designations',
        'Demonstrates proper grammar and data-driven analytical writing',
      ]},
    },
  },

  // ==========================================
  // PART 2 ESSAYS
  // ==========================================

  // CMA2-B: Corporate Finance
  {
    id: 'cma-wc-add-006',
    section: 'CMA2',
    type: 'written_communication',
    topic: 'Capital Recapitalization - EPS Impact and Financial Risk',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'CMA2-B',
    scenario: `Horizon Technologies is considering changing its capital structure. Current situation:

Current Capital Structure:
- Total Assets: $200 million
- Debt: $40 million (20%) at 5% interest
- Equity: $160 million (80%)
- EBIT: $30 million
- Tax Rate: 25%
- Shares Outstanding: 8 million
- Current Stock Price: $20/share

Proposal: Issue $60 million in bonds at 6% and repurchase $60 million in stock at $25/share (includes premium).

The CEO believes higher debt will "unlock shareholder value." The CFO is concerned about increased risk. The board has asked for your analysis.`,
    task: `Prepare an analysis for the Board that:
1. Calculates EPS under current and proposed capital structures.
2. Analyzes the impact on financial risk (interest coverage, debt ratios).
3. Explains the conditions under which the recapitalization adds value.
4. Makes a recommendation with clear reasoning.`,
    keyPoints: [
      'Calculate EPS under both scenarios to show leveraged increase',
      'Current EPS vs Proposed EPS with fewer shares',
      'Interest coverage declines significantly (risk increase)',
      'Value creation depends on cost of debt vs required return',
    ],
    sampleResponse: `CAPITAL STRUCTURE ANALYSIS

TO: Board of Directors
FROM: [Candidate Name], Financial Analyst
DATE: [Current Date]
RE: Proposed Recapitalization Analysis

EXECUTIVE SUMMARY

The proposed recapitalization would increase EPS from $2.53 to $2.95 (17% increase) but also significantly increase financial risk. The transaction is value-enhancing if our cost of equity exceeds approximately 7.4%, which is likely given current market conditions.

CURRENT STRUCTURE ANALYSIS

| Metric | Current |
|--------|---------|
| EBIT | $30,000,000 |
| Interest (5% × $40M) | ($2,000,000) |
| EBT | $28,000,000 |
| Taxes (25%) | ($7,000,000) |
| Net Income | $21,000,000 |
| Shares | 8,000,000 |
| EPS | $2.625 |

Financial Ratios:
- Debt/Equity: 25%
- Interest Coverage: 15.0×
- Debt/Total Capital: 20%

PROPOSED STRUCTURE ANALYSIS

New Capital Structure:
- New Debt: $40M + $60M = $100M
- Shares Repurchased: $60M ÷ $25 = 2.4 million shares
- Remaining Shares: 8.0M - 2.4M = 5.6 million
- Equity: $160M - $60M = $100M

| Metric | Proposed |
|--------|----------|
| EBIT | $30,000,000 |
| Interest [(5% × $40M) + (6% × $60M)] | ($5,600,000) |
| EBT | $24,400,000 |
| Taxes (25%) | ($6,100,000) |
| Net Income | $18,300,000 |
| Shares | 5,600,000 |
| EPS | $3.268 |

Financial Ratios:
- Debt/Equity: 100%
- Interest Coverage: 5.4×
- Debt/Total Capital: 50%

COMPARATIVE SUMMARY

| Metric | Current | Proposed | Change |
|--------|---------|----------|--------|
| EPS | $2.625 | $3.268 | +24.5% |
| Interest Coverage | 15.0× | 5.4× | -64% |
| Debt/Equity | 25% | 100% | +300% |
| Net Income | $21.0M | $18.3M | -13% |

RISK ANALYSIS

The EPS increase masks important risk considerations:

1. Interest Coverage Decline
   - From 15× to 5.4×
   - Covenant risk: many lenders require minimum 3-4× coverage
   - If EBIT falls 38% (to $18.5M), we barely cover interest

2. Breakeven EBIT
   - Current structure BE: $2.0M (current interest)
   - Proposed structure BE: $5.6M (new interest)
   - Operating risk magnified by financial risk

3. Financial Distress Costs
   - Higher leverage increases bankruptcy probability
   - May affect supplier terms, customer confidence, talent retention

VALUE CREATION ANALYSIS

The recapitalization creates value if:
Tax Shield Value > Increased Distress Risk > Repurchase Premium Cost

Tax Shield:
- Additional Interest: $3.6M annually
- Tax Savings: $3.6M × 25% = $900,000/year
- If perpetual at 6%: PV = $900K ÷ 0.06 = $15 million value creation

Cost of Premium:
- Repurchase at $25 vs market $20 = $5 premium
- 2.4 million shares × $5 = $12 million cost

Net Benefit (ignoring distress): $15M - $12M = $3M positive

However, distress costs are difficult to quantify. At 5.4× interest coverage, credit rating likely drops, potentially increasing cost of all capital.

CONDITIONS FOR VALUE CREATION

The recapitalization adds value if:
1. EBIT remains stable or growing (interest coverage maintained)
2. Credit rating impact is minimal
3. Business risk doesn't increase (maintaining debt capacity)
4. Cost of equity significantly exceeds 6% (spread to debt cost)

RECOMMENDATION

PROCEED WITH CAUTION. Consider a MODIFIED approach:

1. Issue $40M debt instead of $60M
   - Achieves 40% debt ratio (more sustainable)
   - Interest coverage remains above 8×
   - Still captures meaningful tax benefits

2. Use $40M to repurchase 1.6M shares at $25
   - New EPS: approximately $2.95 (12% increase)
   - Maintains investment-grade profile
   - Preserves flexibility for future opportunities

The CEO is correct that moderate leverage can create value. The CFO is right to be concerned about jumping to 50% debt. The middle ground balances value creation with prudent risk management.`,
    rubric: {
      organization: { weight: 30, criteria: [
        'Uses proper board-level analysis format with executive summary',
        'Separates current vs proposed structure analysis, risk evaluation, and modified recommendation',
        'Presents financial metrics in clear comparative tables',
        'Follows logical flow from EPS impact to risk assessment to balanced recommendation',
      ]},
      development: { weight: 40, criteria: [
        'Calculates EPS correctly under current and proposed capital structures',
        'Analyzes interest coverage decline and its risk implications',
        'Evaluates tax shield benefit versus repurchase premium cost',
        'Identifies breakeven EBIT and financial distress thresholds',
        'Proposes a modified approach balancing value creation with risk management',
      ]},
      expression: { weight: 30, criteria: [
        'Maintains professional corporate finance advisory tone',
        'Uses correct capital structure terminology (EPS, interest coverage, tax shield, WACC)',
        'Presents financial comparisons in clear tabular format',
        'Demonstrates proper grammar and balanced recommendation writing',
      ]},
    },
  },

  // CMA2-C: Decision Analysis
  {
    id: 'cma-wc-add-007',
    section: 'CMA2',
    type: 'written_communication',
    topic: 'Product Line Discontinuation Decision',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'CMA2-C',
    scenario: `Cascade Consumer Products is reviewing its three product lines:

Segment P&L (in $000s):
                    Premium    Standard    Economy    Total
Sales               $5,000     $8,000      $3,000    $16,000
Variable Costs      (2,500)    (4,800)     (2,100)   (9,400)
Contribution Margin  2,500      3,200         900      6,600
Traceable Fixed      (800)    (1,200)       (600)    (2,600)
Segment Margin       1,700      2,000         300      4,000
Allocated Common    (1,000)    (1,600)       (400)    (3,000)
Operating Income      $700       $400       ($100)    $1,000

The VP of Sales wants to discontinue Economy: "It loses $100,000 and drags down our margins. Let's redeploy those resources to Premium and Standard."

Additional information:
- If Economy is dropped, Standard loses 15% of sales (customers who buy both)
- Equipment used for Economy has no alternative use
- 20% of Economy's traceable fixed costs would continue`,
    task: `As Director of Financial Planning, prepare an analysis that:
1. Recalculates the relevant costs and benefits of discontinuing Economy.
2. Considers the cross-selling impact on Standard.
3. Makes a recommendation with quantified impact.
4. Suggests strategic alternatives to outright discontinuation.`,
    keyPoints: [
      'Segment margin ($300K) is relevant, not operating income',
      'Avoidable fixed costs: 80% of $600K = $480K',
      'Impact on Standard: 15% × $3,200K CM = $480K loss',
      'Net impact of dropping: negative (loss increases)',
    ],
    sampleResponse: `FINANCIAL ANALYSIS: ECONOMY PRODUCT LINE

TO: Executive Committee
FROM: [Candidate Name], Director of Financial Planning
DATE: [Current Date]
RE: Recommendation on Economy Product Line

EXECUTIVE SUMMARY

Despite reporting a $100,000 operating loss, discontinuing Economy would REDUCE total company profit by $300,000 annually. When complementary sales effects and truly avoidable costs are considered, Economy contributes positively to company profitability.

RELEVANT COST ANALYSIS

The VP's analysis uses operating income, which includes allocated costs. For discontinuation decisions, we analyze AVOIDABLE costs and revenues only.

ECONOMY LINE CONTRIBUTION

                                   Keep      Drop      Difference
Contribution Margin                $900        $0        ($900)
Traceable Fixed Costs             (600)      (120)*       480
NET ECONOMY CONTRIBUTION          $300      ($120)       ($420)

*20% of traceable fixed costs ($120K) continue even if Economy is dropped.

IMPACT ON STANDARD LINE

Customers who purchase both Economy and Standard would likely leave:
- Standard CM at risk: 15% × $3,200K = $480K
- Assume 50% actually leave (conservative estimate)
- Standard CM loss: $240,000

TOTAL IMPACT OF DISCONTINUATION

                                    Amount
Economy CM lost                   ($900,000)
Economy traceable FC avoided        $480,000
Standard CM lost (spillover)      ($240,000)
Allocated FC (continues either way)      $0
NET IMPACT                        ($660,000)

Discontinuing Economy would REDUCE profits by $660,000.

Alternative View (Conservative - No Standard Impact):
Even if we ignore Standard spillover entirely:
Net Impact = ($900K) + $480K = ($420,000) reduction in profit

WHY THE OPERATING INCOME IS MISLEADING

The $100,000 operating loss includes $400,000 of allocated common costs that:
1. Will NOT disappear if Economy is dropped
2. Must be reallocated to Premium and Standard
3. Would make those lines look LESS profitable

Post-discontinuation reallocation:
- Premium Operating Income: $700K - (1,000/15,000 × 400K) = $673K
- Standard Operating Income: $400K - (8,000/15,000 × 400K) = $187K

The "loss" just moves to other segments.

STRATEGIC ALTERNATIVES

Rather than discontinuation, consider these options:

Option 1: Price Increase
- 10% price increase on Economy: $300K additional revenue
- Even with 20% volume loss, CM improves
- Tests true price elasticity

Option 2: Cost Reduction
- Target 15% variable cost reduction
- Review traceable fixed costs for efficiency
- Could improve segment margin by $400K+

Option 3: Product Rationalization
- Reduce SKU complexity within Economy
- Focus on highest-margin Economy products
- Consolidate manufacturing runs

Option 4: Strategic Repositioning
- Position Economy as entry-level for customer acquisition
- Track customer migration to Premium/Standard
- Value Economy for lifetime customer value, not standalone profit

RECOMMENDATION

DO NOT DISCONTINUE the Economy product line.

Rationale:
1. Economy contributes $300K segment margin
2. Avoidable costs are less than this contribution
3. Spillover effect on Standard compounds the loss
4. Allocated costs are irrelevant to this decision

Instead, I recommend a 90-day profit improvement initiative:
- Week 1-4: Detailed cost analysis of Economy operations
- Week 5-8: Implement quick-win cost reductions
- Week 9-12: Test price elasticity with selective increases

Target: Improve Economy segment margin by $200K annually through operational improvements rather than discontinuation.

The VP is correct that margins need attention, but the solution is improvement, not amputation.`,
    rubric: {
      organization: { weight: 30, criteria: [
        'Uses proper financial analysis format with executive summary',
        'Separates relevant cost analysis, spillover effects, misleading metrics discussion, and alternatives',
        'Follows logical flow from quantitative analysis to strategic recommendations',
        'Includes clear summary of net financial impact',
      ]},
      development: { weight: 40, criteria: [
        'Distinguishes avoidable costs from allocated common costs correctly',
        'Calculates economy line segment margin and avoidable fixed cost savings',
        'Quantifies cross-selling impact on Standard product line',
        'Explains why allocated costs are irrelevant to discontinuation decision',
        'Proposes strategic alternatives (price increase, cost reduction, repositioning)',
      ]},
      expression: { weight: 30, criteria: [
        'Maintains professional decision analysis advisory tone',
        'Uses correct segment reporting terminology (segment margin, avoidable costs, allocated costs)',
        'Presents incremental analysis clearly with keep vs drop comparison',
        'Demonstrates proper grammar and strategic advisory writing',
      ]},
    },
  },

  // CMA2-D: Risk Management
  {
    id: 'cma-wc-add-008',
    section: 'CMA2',
    type: 'written_communication',
    topic: 'Multi-Currency Hedging Strategy with Forwards and Options',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'CMA2-A',
    scenario: `GlobalTech Inc., a U.S. company, has the following foreign currency exposures:

Expected Euro Receipts: €10 million in 90 days (European sales)
Expected Yen Payments: ¥500 million in 60 days (Japanese supplier)

Current Exchange Rates:
- Spot EUR/USD: 1.1000
- 90-day Forward EUR/USD: 1.0950
- Spot USD/JPY: 145.00
- 60-day Forward USD/JPY: 144.50

Available Hedging Options:
1. Forward contracts (as quoted above)
2. Options: EUR put @ 1.10 costs $200,000 premium; JPY call @ 145 costs $150,000 premium
3. No hedge (natural exposure)

Treasury's FX forecast:
- Euro likely to weaken (range: 1.05-1.08)
- Yen likely to strengthen (range: 140-143)

The CFO asks: "Should we hedge, and if so, how?"`,
    task: `As Treasury Manager, prepare a recommendation that:
1. Quantifies the unhedged exposure and potential outcomes.
2. Analyzes each hedging alternative's cost and protection.
3. Recommends a hedging strategy for each exposure.
4. Addresses the hedging policy implications.`,
    keyPoints: [
      'Euro: Exposed to €10M depreciation risk; forward locks in $10.95M',
      'Yen: Exposed to ¥500M appreciation risk; forward locks in $3.46M cost',
      'Options provide flexibility but have premium cost',
      'Treasury view aligns with hedging (bearish EUR, bullish JPY)',
    ],
    sampleResponse: `FOREIGN EXCHANGE RISK MANAGEMENT ANALYSIS

TO: Chief Financial Officer
FROM: [Candidate Name], Treasury Manager
DATE: [Current Date]
RE: FX Hedging Recommendations - Euro and Yen Exposures

EXECUTIVE SUMMARY

Both currency exposures face adverse directional risk per our forecast. I recommend hedging both positions: forward contracts for the Euro receivable (to lock in a favorable rate before depreciation) and options for the Yen payable (to retain upside if Yen weakens unexpectedly).

EXPOSURE ANALYSIS

EURO RECEIVABLES (€10 million in 90 days)

Risk: Euro depreciation reduces USD value of receipts

Scenario Analysis (Unhedged):
| EUR/USD | USD Received | Variance from Spot |
|---------|--------------|-------------------|
| 1.10 (current) | $11,000,000 | Base case |
| 1.08 (weak) | $10,800,000 | ($200,000) |
| 1.05 (very weak) | $10,500,000 | ($500,000) |
| 1.12 (strong) | $11,200,000 | +$200,000 |

Treasury forecast: 1.05-1.08 (unfavorable for receivables)

Hedging Alternatives:

Forward Contract:
- Lock in 1.0950 × €10M = $10,950,000
- Gives up potential if EUR strengthens above 1.0950
- Cost: None (built into forward rate)
- Outcome: Certain $10.95M

Put Option (right to sell EUR at 1.10):
- Minimum USD value: €10M × 1.10 = $11,000,000
- Retain upside if EUR strengthens
- Premium cost: $200,000
- Net minimum: $10,800,000

Decision: Given bearish EUR forecast and desire for certainty, FORWARD CONTRACT preferred. The option premium exceeds the forward discount.

YEN PAYABLES (¥500 million in 60 days)

Risk: Yen appreciation increases USD cost of payments

Scenario Analysis (Unhedged):
| USD/JPY | USD Cost | Variance from Spot |
|---------|----------|-------------------|
| 145.00 | $3,448,276 | Base case |
| 143.00 | $3,496,503 | +$48,227 |
| 140.00 | $3,571,429 | +$123,153 |
| 148.00 | $3,378,378 | ($69,898) |

Treasury forecast: 140-143 (unfavorable for payables - yen strengthening)

Hedging Alternatives:

Forward Contract:
- Lock in ¥500M ÷ 144.50 = $3,460,208
- Protects against yen appreciation
- Cost: None (built into forward rate)
- Gives up benefit if yen weakens

Call Option (right to buy JPY at 145):
- Maximum USD cost: ¥500M ÷ 145 = $3,448,276
- Plus premium: $150,000
- Maximum total: $3,598,276
- BUT: Retain benefit if yen weakens

Decision: CALL OPTION recommended. While our forecast is for yen strength, there's uncertainty. The option provides:
- Protection if yen strengthens significantly
- Participation if our forecast is wrong and yen weakens

RECOMMENDED STRATEGY

| Exposure | Hedge Instrument | Rationale |
|----------|-----------------|-----------|
| €10M receivable | 90-day Forward | Lock in rate before expected depreciation |
| ¥500M payable | 60-day Call Option | Protect against strengthening with flexibility |

FINANCIAL SUMMARY

Euro Position:
- Unhedged expected outcome (at 1.06): $10,600,000
- Forward hedge outcome: $10,950,000
- Hedge benefit: $350,000

Yen Position:
- Base case (at 145): $3,448,276
- Worst case (at 140, no hedge): $3,571,429
- Option protection (max with premium): $3,598,276
- Actual outcome depends on rates; option provides insurance

HEDGING POLICY IMPLICATIONS

This situation highlights the need for a formal FX hedging policy:

1. Automatic Hedging Threshold
   - Recommend hedging all exposures > $5 million
   - Reduces speculation on currency movements

2. Instrument Guidelines
   - Use forwards for highly certain exposures
   - Use options when flexibility valuable or uncertainty high

3. Hedge Ratio Policy
   - Consider hedging 75-100% of near-term exposures
   - 50-75% for medium-term
   - Review quarterly

4. Speculation Prohibition
   - Treasury should hedge, not speculate
   - Taking currency views for profit is not treasury's mandate

CONCLUSION

Proceed with:
1. Execute 90-day forward contract to sell €10 million at 1.0950
2. Purchase 60-day JPY call option (strike 145) for $150,000 premium

This strategy protects against our forecasted adverse moves while maintaining prudent risk management.`,
    rubric: {
      organization: { weight: 30, criteria: [
        'Uses proper treasury analysis format with executive summary',
        'Separates Euro and Yen exposure analyses into distinct sections',
        'Presents hedging alternatives in consistent comparative format for each exposure',
        'Includes hedging policy recommendations for organizational governance',
      ]},
      development: { weight: 40, criteria: [
        'Quantifies both currency exposures with scenario analysis',
        'Evaluates forward contracts and options for each position with specific calculations',
        'Differentiates hedging strategy by exposure type (forward for EUR, option for JPY)',
        'Presents scenario tables showing outcomes under different rate assumptions',
        'Addresses broader hedging policy needs and governance framework',
      ]},
      expression: { weight: 30, criteria: [
        'Maintains professional treasury management communication tone',
        'Uses correct FX and derivatives terminology (spot, forward, premium, put, call)',
        'Presents scenario analysis in clear tabular format with dollar impacts',
        'Demonstrates proper grammar and risk management advisory writing',
      ]},
    },
  },

  // CMA2-E: Capital Budgeting
  {
    id: 'cma-wc-add-009',
    section: 'CMA2',
    type: 'written_communication',
    topic: 'Capital Investment with Strategic and Real Options Value',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'CMA2-A',
    scenario: `NovaTech Industries is evaluating two mutually exclusive automation projects:

Project Alpha (Conservative):
- Initial Investment: $2,000,000
- Annual Cash Flows: $500,000 for 6 years
- Salvage Value: $200,000 at end of Year 6
- Risk: Low (proven technology)

Project Beta (Innovative):
- Initial Investment: $2,500,000
- Annual Cash Flows: Year 1-2: $300,000; Year 3-6: $800,000
- Salvage Value: $0
- Risk: Moderate (new technology, learning curve)
- Strategic benefit: Positions company for next-generation products

Additional Information:
- WACC: 10%
- Risk-adjusted rate for Beta: 12%
- PV factors at 10% (6 years): 4.355
- PV factor at 10% (Year 6): 0.564
- The company is losing market share to competitors with advanced automation

CFO says: "Just pick the project with the highest NPV."
CEO says: "We need to consider strategic positioning, not just numbers."`,
    task: `As VP of Strategic Planning, prepare an analysis that:
1. Calculates NPV, IRR, and payback for both projects.
2. Addresses the conflict between NPV and strategic value.
3. Considers risk adjustments appropriately.
4. Makes a recommendation that balances financial and strategic factors.`,
    keyPoints: [
      'Alpha has higher NPV using uniform 10% rate',
      'Beta has strategic value not captured in cash flows',
      'Risk adjustment with 12% rate changes the comparison',
      'Consider real options value of Beta (future opportunities)',
    ],
    sampleResponse: `CAPITAL INVESTMENT ANALYSIS

TO: CFO, CEO, Executive Committee
FROM: [Candidate Name], VP Strategic Planning
DATE: [Current Date]
RE: Automation Project Selection - Alpha vs Beta

EXECUTIVE SUMMARY

Project Alpha shows higher NPV using standard financial metrics, but Project Beta offers strategic positioning essential for long-term competitiveness. After adjusting for risk and considering strategic value, I recommend Project Beta with appropriate risk management protocols.

FINANCIAL ANALYSIS

PROJECT ALPHA (10% Discount Rate)

NPV Calculation:
- PV of Cash Flows: $500,000 × 4.355 = $2,177,500
- PV of Salvage: $200,000 × 0.564 = $112,800
- Total PV of Inflows: $2,290,300
- Initial Investment: ($2,000,000)
- NPV: $290,300

IRR: Approximately 15%

Payback: $2,000,000 ÷ $500,000 = 4.0 years

PROJECT BETA (at 10% rate for comparison)

NPV Calculation:
Years 1-2: $300,000 × 1.736 = $520,800
Years 3-6: Need individual calculations
Year 3: $800,000 × 0.751 = $600,800
Year 4: $800,000 × 0.683 = $546,400
Year 5: $800,000 × 0.621 = $496,800
Year 6: $800,000 × 0.564 = $451,200
Total PV of Inflows: $2,616,000
Initial Investment: ($2,500,000)
NPV at 10%: $116,000

IRR: Approximately 12.5%

Payback: Year 1-2: $600K; Year 3-5: $2,400K; Total = $3,000K
Payback = ~4.5 years

RISK-ADJUSTED ANALYSIS

Beta's higher risk justifies a 12% discount rate:

Project Beta (at 12%):
- Recalculated PV of inflows: approximately $2,380,000
- NPV at 12%: approximately ($120,000)

| Metric | Alpha (10%) | Beta (10%) | Beta (12%) |
|--------|-------------|------------|------------|
| NPV | $290,300 | $116,000 | ($120,000) |
| IRR | 15% | 12.5% | 12.5% |
| Payback | 4.0 years | 4.5 years | 4.5 years |

Strictly on financial metrics, Alpha wins.

STRATEGIC VALUE ANALYSIS

However, the CFO's "highest NPV" approach ignores critical factors:

1. MARKET POSITION
   - Company is losing share to advanced competitors
   - Alpha maintains status quo; Beta leapfrogs competition
   - Not captured in cash flow projections

2. REAL OPTIONS VALUE
   Beta creates options not in DCF:
   - Option to expand to next-generation products
   - Option to license technology to partners
   - Option to enter new markets
   - Estimated value: $200,000 - $500,000 (conservative)

3. COMPETITIVE DYNAMICS
   - If we choose Alpha, competitors may adopt Beta-like technology
   - First-mover advantage has value in automation
   - Risk of obsolescence if we don't innovate

4. ORGANIZATIONAL LEARNING
   - Beta forces capability development
   - Skills learned enable future projects
   - Difficult to quantify but strategically valuable

ADJUSTED NPV INCLUDING STRATEGIC VALUE

| Component | Alpha | Beta |
|-----------|-------|------|
| Base NPV (risk-adjusted) | $290,300 | ($120,000) |
| Strategic Positioning Value | $0 | $250,000* |
| Real Options Value | $0 | $150,000* |
| ADJUSTED NPV | $290,300 | $280,000 |

*Conservative estimates

RISK MITIGATION FOR BETA

If Beta is selected, manage risk through:
1. Phased implementation with go/no-go decision points
2. Vendor performance guarantees
3. Parallel operation period before full cutover
4. Contingency budget of 15% ($375,000)
5. Monthly progress reviews during Year 1-2 learning curve

RECOMMENDATION

SELECT PROJECT BETA with the following conditions:

1. Board approval of strategic rationale
2. Risk mitigation plan implementation
3. Quarterly strategic review during Years 1-2
4. Define success metrics beyond financial returns:
   - Technology capability milestones
   - Competitive positioning indicators
   - Option exercise triggers

RATIONALE

The CEO is correct that strategic positioning matters. The CFO is right that financial discipline is essential. This recommendation balances both:

- Beta's risk-adjusted NPV is slightly negative
- But strategic value closes the gap with Alpha
- Long-term competitive position requires innovation
- Playing it safe (Alpha) may be the riskier choice

In a dynamic competitive environment, the project that positions us for the future—even with some financial uncertainty—is the better strategic choice. We can manage Beta's risks; we cannot easily recover from strategic obsolescence if we choose Alpha.

The recommendation: Invest in our future with Project Beta.`,
    rubric: {
      organization: { weight: 30, criteria: [
        'Uses proper strategic investment analysis format with executive summary',
        'Separates financial analysis, strategic value assessment, risk mitigation, and recommendation',
        'Presents both projects in consistent comparative format',
        'Addresses both CFO (financial) and CEO (strategic) perspectives',
      ]},
      development: { weight: 40, criteria: [
        'Calculates NPV, IRR, and payback for both projects correctly',
        'Applies risk-adjusted discount rate appropriately for higher-risk project',
        'Identifies and estimates real options value and strategic positioning benefits',
        'Proposes specific risk mitigation measures for the recommended project',
        'Balances quantitative financial metrics with qualitative strategic considerations',
      ]},
      expression: { weight: 30, criteria: [
        'Maintains professional strategic planning advisory tone',
        'Uses correct capital budgeting and strategy terminology (NPV, IRR, real options, WACC)',
        'Presents financial comparisons in clear side-by-side tables',
        'Demonstrates proper grammar and balanced strategic writing',
      ]},
    },
  },

  // CMA2-F: Professional Ethics
  {
    id: 'cma-wc-add-010',
    section: 'CMA2',
    type: 'written_communication',
    topic: 'Revenue Recognition Fraud Analysis and Professional Responsibility',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'CMA2-F',
    scenario: `You are the Controller at Stellar Software Inc. It's December 28th, and the company will miss its quarterly revenue target by $2 million unless action is taken.

The VP of Sales proposes the following:

1. "Accelerated Recognition": Record $1.5M from a contract that won't be signed until January 3rd but is "virtually certain." The customer has verbally agreed.

2. "Channel Stuffing": Offer a major distributor extended 180-day payment terms and full return rights to take $800K of product this week.

3. "Bill and Hold": A customer wants delivery in February but is willing to be invoiced now if we give a 5% discount. Revenue: $500K.

The CEO calls you directly: "I need you to work with Sales to get this done. The board is watching, and our bonuses depend on hitting this target. I'm sure you can find a way to make this work."`,
    task: `Prepare a memorandum that:
1. Analyzes each proposal against revenue recognition standards (ASC 606).
2. Identifies the ethical issues using the IMA ethical framework.
3. Explains the potential consequences of compliance.
4. Recommends a course of action that maintains professional integrity.`,
    keyPoints: [
      'All three proposals violate GAAP revenue recognition principles',
      'IMA standards: Competence, Integrity, Credibility all implicated',
      'Personal liability, job loss, career destruction are real risks',
      'Must escalate through proper channels; document everything',
    ],
    sampleResponse: `MEMORANDUM

TO: Chief Executive Officer
FROM: [Your Name], Controller
DATE: December 28
RE: Q4 Revenue Recognition - Compliance Analysis

PURPOSE

This memorandum responds to the proposals to accelerate $2.8M in Q4 revenue. After careful analysis, I cannot approve any of the three proposals as they violate GAAP and would constitute financial statement fraud. I am escalating this matter as required by professional ethics standards.

ANALYSIS OF PROPOSALS

PROPOSAL 1: ACCELERATED RECOGNITION ($1.5M)

Revenue Recognition Standard (ASC 606 Requirements):
- Contract must EXIST (Step 1: Identify the contract)
- A verbal agreement is NOT a contract under ASC 606
- Both parties must be committed with approved signatures

Violation: Recording revenue for an unsigned contract violates ASC 606. A contract that "will be" signed is not a contract that "is" signed. This would be fraudulent revenue recognition.

PROPOSAL 2: CHANNEL STUFFING ($800K)

Revenue Recognition Analysis:
- 180-day terms suggest financing arrangement, not sale
- Full return rights negate transfer of control
- Revenue cannot be recognized when "right of return" exists without estimable returns
- Pattern suggests customer is a consignment partner, not purchaser

Violation: This is classic channel stuffing—pushing inventory to distributors to inflate current period sales. The SEC has prosecuted numerous cases with these exact characteristics.

PROPOSAL 3: BILL AND HOLD ($500K)

Strict Criteria for Bill and Hold under ASC 606:
1. Substantive reason for arrangement (customer's request)
2. Product separately identified as customer's
3. Product currently ready for transfer
4. Company cannot use product or direct it to another customer

Analysis: A discount to induce early billing fails the "substantive reason" test. The arrangement is for OUR benefit (hitting targets), not the customer's operational needs. Additionally, if we still possess the goods and could potentially sell them elsewhere in an emergency, control has not transferred.

Violation: This fails bill-and-hold criteria. Revenue recognition would be improper.

ETHICAL ANALYSIS (IMA FRAMEWORK)

The CEO's request implicates multiple ethical standards:

COMPETENCE:
"Perform professional duties in accordance with relevant laws, regulations, and technical standards."
- Approving these entries would violate GAAP
- I would fail in my professional duties

INTEGRITY:
"Mitigate actual conflicts of interest... Refrain from engaging in any conduct that would prejudice carrying out duties ethically."
- Bonus compensation creates conflict of interest
- Cannot let personal financial interest compromise professional judgment

CREDIBILITY:
"Communicate information fairly and objectively... Disclose all relevant information that could reasonably be expected to influence an intended user's understanding."
- Investors would be misled about actual Q4 performance
- False financial statements violate credibility standard

POTENTIAL CONSEQUENCES OF COMPLIANCE

If I Were to Approve These Entries:

For the Company:
- SEC enforcement action and restatement
- Shareholder lawsuits when revenue reverses
- Loss of investor and creditor confidence
- Potential delisting

For Executives:
- Personal liability under Sarbanes-Oxley Section 302/906
- Clawback of bonuses
- Criminal prosecution possible
- Career destruction and industry ban

For Me Personally:
- Violation of CMA professional standards
- Loss of certification
- Personal liability as preparer of false financials
- Named in SEC enforcement and civil litigation
- Unemployable in finance profession

RECOMMENDED COURSE OF ACTION

1. IMMEDIATE: Decline to record the proposed entries
   - Document refusal in writing

2. COMMUNICATE UPWARD: Provide this analysis to:
   - CEO (this memo)
   - CFO
   - Audit Committee Chair

3. CONSULT EXTERNAL AUDITORS: Brief them on proposals
   - They will encounter these during year-end audit anyway
   - Better to address proactively

4. DOCUMENT EVERYTHING: Preserve all communications regarding these proposals

5. ALTERNATIVE APPROACHES:
   - Accurate Q4 close with transparent shortfall explanation
   - Provide forward-looking guidance on Q1 strong start
   - Discuss operational improvements to prevent future misses

CONCLUSION

I understand the pressure to meet targets and the board's expectations. However, missing a quarterly target by $2M is a manageable business problem. Securities fraud, SEC enforcement, and personal criminal liability are not.

The proposals are not "aggressive accounting"—they are fraudulent misrepresentation of financial results. I cannot be party to this and must escalate if the proposed course continues.

I am available to discuss legitimate alternatives to improve reported results, including:
- Acceleration of expense recognition for future benefit
- Accurate disclosure with narrative explanation
- Operational improvements to close revenue gap

I remain committed to the company's success through ethical means.

Respectfully submitted,

[Your Name], CMA
Controller

cc: CFO
    Audit Committee Chair (if matter escalates)

DOCUMENT RETENTION: This memo and all related correspondence will be preserved in accordance with document retention policy.`,
    rubric: {
      organization: { weight: 30, criteria: [
        'Uses proper memo format addressed to CEO with compliance framing',
        'Separates analysis of each proposal, ethical framework, consequences, and recommended actions',
        'Presents each revenue scheme with consistent GAAP analysis format',
        'Includes documentation and escalation plan',
      ]},
      development: { weight: 40, criteria: [
        'Analyzes each of the three proposals against specific ASC 606 requirements',
        'Applies IMA ethical standards (Competence, Integrity, Credibility) systematically',
        'Identifies personal, corporate, and executive-level consequences of compliance',
        'Proposes legitimate alternative approaches to address revenue shortfall',
        'Documents escalation path and evidence preservation steps',
      ]},
      expression: { weight: 30, criteria: [
        'Maintains professional yet firm Controller communication tone',
        'Uses correct GAAP and ethics terminology (ASC 606, SOX Section 302/906, IMA standards)',
        'Writes with authoritative, legally precise language',
        'Demonstrates proper grammar and documentation-quality professional writing',
      ]},
    },
  },
];

/**
 * CMA Practice Simulations - Batch 2
 * 
 * 5 additional calculation-based scenarios covering underrepresented blueprint areas:
 * CMA1-E (Internal Controls), CMA1-F (Technology & Analytics),
 * CMA2-B (Corporate Finance), CMA2-C (Decision Analysis), CMA2-D (Risk Management)
 */

import { PracticeSimulation } from './index';

// ============================================
// Simulation 1: Internal Controls Risk Assessment (CMA1-E)
// ============================================

export const CMA1_SIMULATION_9_INTERNAL_CONTROLS: PracticeSimulation = {
  id: 'cma1-sim-009',
  section: 'CMA1',
  title: 'Internal Controls Risk Assessment & Testing',
  blueprintArea: 'CMA1-E',
  topic: 'COSO Internal Control Risk Assessment',
  difficulty: 'hard',
  estimatedTime: 25,

  scenario: `You are the internal audit manager at NexGen Electronics Corp. The audit committee has asked you to perform a quantitative risk assessment of the company's order-to-cash cycle and evaluate the effectiveness of key controls.

The company processes approximately 180,000 sales transactions per year with an average value of $850. Historical data about control failures and associated losses is provided in the exhibits.`,

  exhibits: [
    {
      id: 'ex1',
      title: 'Order-to-Cash Control Environment',
      type: 'table',
      data: `| Control Point | Control Description | Annual Test Sample | Failures Found | Avg Loss per Failure |
|--------------|--------------------|--------------------|----------------|---------------------|
| C1 - Credit Approval | Automated credit check before order | 500 | 8 | $3,200 |
| C2 - Shipping Verification | 3-way match (PO, receipt, invoice) | 400 | 12 | $1,800 |
| C3 - Billing Accuracy | Automated price lookup from master | 600 | 3 | $950 |
| C4 - Collections Follow-up | 30-day aging review triggers | 350 | 18 | $5,400 |
| C5 - Cash Application | Auto-match payments to invoices | 450 | 6 | $2,100 |

**Total annual transactions:** 180,000
**Average transaction value:** $850`,
    },
    {
      id: 'ex2',
      title: 'Control Implementation Costs',
      type: 'table',
      data: `| Control Enhancement | Annual Cost | Expected Failure Rate Reduction |
|--------------------|------------|-------------------------------|
| Enhanced C1: Real-time credit scoring API | $45,000 | Reduce C1 failures by 75% |
| Enhanced C2: RFID-based shipping verification | $72,000 | Reduce C2 failures by 60% |
| Enhanced C4: AI-powered collections prioritization | $58,000 | Reduce C4 failures by 50% |

**Company's risk appetite:** Will invest in controls where annual cost-benefit ratio > 1.5`,
    },
  ],

  tasks: [
    {
      id: 't1',
      taskNumber: 1,
      requirement: 'Calculate the failure rate and expected annual loss (EAL) for each of the 5 controls. Rank them by EAL.',
      hints: ['Failure rate = Failures / Sample size. Extrapolate to annual volume.'],
      solution: {
        approach: 'Calculate failure rate from sample, extrapolate to total population, multiply by loss per failure',
        calculations: `**Failure Rate = Failures ÷ Sample Size**
**Expected Annual Failures = Failure Rate × 180,000**
**EAL = Expected Annual Failures × Avg Loss per Failure**

| Control | Failure Rate | Expected Failures | Avg Loss | EAL |
|---------|-------------|-------------------|----------|-----|
| C1 | 8/500 = 1.60% | 2,880 | $3,200 | $9,216,000 |
| C2 | 12/400 = 3.00% | 5,400 | $1,800 | $9,720,000 |
| C3 | 3/600 = 0.50% | 900 | $950 | $855,000 |
| C4 | 18/350 = 5.14% | 9,257 | $5,400 | $49,988,571 |
| C5 | 6/450 = 1.33% | 2,400 | $2,100 | $5,040,000 |

**Ranking by EAL:**
1. C4 - Collections: $49,988,571
2. C2 - Shipping: $9,720,000
3. C1 - Credit: $9,216,000
4. C5 - Cash Application: $5,040,000
5. C3 - Billing: $855,000

**Total EAL: $74,819,571**`,
        answer: { c1EAL: 9216000, c2EAL: 9720000, c3EAL: 855000, c4EAL: 49988571, c5EAL: 5040000 },
        explanation: 'C4 (Collections) has the highest expected annual loss due to both the highest failure rate (5.14%) and the highest per-failure loss ($5,400).',
      },
      points: 30,
    },
    {
      id: 't2',
      taskNumber: 2,
      requirement: 'For each proposed control enhancement, calculate the cost-benefit ratio (annual loss reduction ÷ annual cost). Which enhancements meet the company\'s 1.5 threshold?',
      hints: ['Loss reduction = Current EAL × reduction percentage'],
      solution: {
        approach: 'Calculate expected loss reduction from each enhancement, divide by cost',
        calculations: `**Enhanced C1 (Credit Scoring API):**
Loss Reduction = $9,216,000 × 75% = $6,912,000
Cost-Benefit = $6,912,000 / $45,000 = **153.6** ✓ (> 1.5)

**Enhanced C2 (RFID Shipping):**
Loss Reduction = $9,720,000 × 60% = $5,832,000
Cost-Benefit = $5,832,000 / $72,000 = **81.0** ✓ (> 1.5)

**Enhanced C4 (AI Collections):**
Loss Reduction = $49,988,571 × 50% = $24,994,286
Cost-Benefit = $24,994,286 / $58,000 = **430.9** ✓ (> 1.5)

**All three enhancements meet the threshold.**
Priority order: C4 (430.9) → C1 (153.6) → C2 (81.0)`,
        answer: { c1Ratio: 153.6, c2Ratio: 81, c4Ratio: 430.9 },
        explanation: 'All three enhancements far exceed the 1.5 threshold. C4 enhancement provides the highest return per dollar invested.',
      },
      points: 25,
    },
    {
      id: 't3',
      taskNumber: 3,
      requirement: 'If all three enhancements are implemented, calculate the new total EAL and the percentage reduction in total risk.',
      hints: ['Apply reduction to respective controls, keep C3 and C5 unchanged'],
      solution: {
        approach: 'Apply failure rate reductions and recalculate total EAL',
        calculations: `**New EALs after enhancements:**
C1: $9,216,000 × (1 - 0.75) = $2,304,000
C2: $9,720,000 × (1 - 0.60) = $3,888,000
C3: $855,000 (unchanged)
C4: $49,988,571 × (1 - 0.50) = $24,994,286
C5: $5,040,000 (unchanged)

**New Total EAL:** $2,304,000 + $3,888,000 + $855,000 + $24,994,286 + $5,040,000 = **$37,081,286**

**Original Total EAL:** $74,819,571
**Reduction:** $74,819,571 - $37,081,286 = $37,738,286
**Percentage Reduction:** $37,738,286 / $74,819,571 = **50.4%**

**Total Enhancement Cost:** $45,000 + $72,000 + $58,000 = $175,000
**Net Annual Benefit:** $37,738,286 - $175,000 = $37,563,286`,
        answer: { newTotalEAL: 37081286, reductionPercent: 50.4 },
        explanation: 'Implementing all enhancements cuts total risk by 50.4% at a cost of only $175,000 per year.',
      },
      points: 20,
    },
  ],

  skills: ['Risk assessment', 'Control testing', 'Cost-benefit analysis', 'COSO framework'],
  relatedConcepts: ['Internal controls', 'Expected loss', 'Control deficiencies', 'Risk appetite'],
};

// ============================================
// Simulation 2: Data Analytics & Benford's Law (CMA1-F)
// ============================================

export const CMA1_SIMULATION_10_ANALYTICS: PracticeSimulation = {
  id: 'cma1-sim-010',
  section: 'CMA1',
  title: 'Data Analytics for Fraud Detection',
  blueprintArea: 'CMA1-F',
  topic: 'Benford\'s Law and Statistical Analysis',
  difficulty: 'hard',
  estimatedTime: 20,

  scenario: `You are a management accountant using data analytics to audit vendor payments. A whistleblower tip suggests potential fraudulent invoice approvals in the Facilities department. You have extracted 2,000 vendor payment records and applied Benford's Law analysis to the first-digit distribution.`,

  exhibits: [
    {
      id: 'ex1',
      title: 'First-Digit Analysis of Vendor Payments',
      type: 'table',
      data: `| First Digit | Expected (Benford) | Observed Count | Observed % |
|------------|-------------------|----------------|-----------|
| 1 | 30.1% | 480 | 24.0% |
| 2 | 17.6% | 340 | 17.0% |
| 3 | 12.5% | 250 | 12.5% |
| 4 | 9.7% | 195 | 9.8% |
| 5 | 7.9% | 168 | 8.4% |
| 6 | 6.7% | 132 | 6.6% |
| 7 | 5.8% | 115 | 5.8% |
| 8 | 5.1% | 140 | 7.0% |
| 9 | 4.6% | 180 | 9.0% |
| **Total** | **100%** | **2,000** | **100%** |

**Critical value for chi-square (df=8, α=0.05): 15.507**`,
    },
    {
      id: 'ex2',
      title: 'Payment Approval Thresholds',
      type: 'table',
      data: `| Amount Range | Approval Required |
|-------------|------------------|
| Under $1,000 | Dept manager auto-approve |
| $1,000 – $4,999 | Dept manager + one signature |
| $5,000 – $9,999 | Director approval |
| $10,000+ | VP + Controller approval |

**Key observation:** Payments starting with 8 and 9 are overrepresented. Payments starting with 1 are underrepresented.`,
    },
  ],

  tasks: [
    {
      id: 't1',
      taskNumber: 1,
      requirement: 'Calculate the chi-square test statistic for the first-digit distribution. Does it exceed the critical value?',
      hints: ['χ² = Σ[(Observed - Expected)² / Expected]. Expected count = Expected % × 2,000.'],
      solution: {
        approach: 'Compute expected counts, then chi-square for each digit',
        calculations: `**Expected Counts (Benford % × 2,000):**
1: 602, 2: 352, 3: 250, 4: 194, 5: 158, 6: 134, 7: 116, 8: 102, 9: 92

**Chi-square calculation:**
Digit 1: (480-602)² / 602 = 14,884/602 = 24.72
Digit 2: (340-352)² / 352 = 144/352 = 0.41
Digit 3: (250-250)² / 250 = 0/250 = 0.00
Digit 4: (195-194)² / 194 = 1/194 = 0.01
Digit 5: (168-158)² / 158 = 100/158 = 0.63
Digit 6: (132-134)² / 134 = 4/134 = 0.03
Digit 7: (115-116)² / 116 = 1/116 = 0.01
Digit 8: (140-102)² / 102 = 1,444/102 = 14.16
Digit 9: (180-92)² / 92 = 7,744/92 = 84.17

**χ² = 24.72 + 0.41 + 0.00 + 0.01 + 0.63 + 0.03 + 0.01 + 14.16 + 84.17 = 124.14**

**124.14 >> 15.507** → Reject null hypothesis. Distribution does NOT conform to Benford's Law.`,
        answer: { chiSquare: 124.14 },
        explanation: 'The chi-square statistic of 124.14 far exceeds the critical value of 15.507, providing strong evidence the payment distribution does not follow Benford\'s Law.',
      },
      points: 35,
    },
    {
      id: 't2',
      taskNumber: 2,
      requirement: 'Which digits show the largest deviations? Interpret the pattern in context of the approval thresholds.',
      hints: ['Look at the absolute and percentage deviations for digits 1, 8, and 9'],
      solution: {
        approach: 'Identify digits with largest chi-square contributions and relate to approval thresholds',
        calculations: `**Largest deviations by chi-square contribution:**
1. Digit 9: 84.17 (observed 180 vs expected 92 — **95.7% over-represented**)
2. Digit 1: 24.72 (observed 480 vs expected 602 — **20.3% under-represented**)
3. Digit 8: 14.16 (observed 140 vs expected 102 — **37.3% over-represented**)

**Pattern interpretation:**
- Payments starting with 8 ($800-$899, $8,000-$8,999) and 9 ($900-$999, $9,000-$9,999) are significantly over-represented
- Payments starting with 1 ($1,000-$1,999, $10,000+) are under-represented

**This pattern suggests invoice manipulation:**
- Amounts just under $1,000 (needs only auto-approve) — digits 8, 9
- Amounts just under $10,000 (avoids VP/Controller) — digits 8, 9
- Invoices that should be $10,000+ are split into amounts below $10,000 threshold

**Red flags:** Invoice splitting and threshold manipulation.`,
        answer: { digit9Excess: 95.7, digit1Deficit: 20.3, digit8Excess: 37.3 },
        explanation: 'The pattern strongly suggests invoices are being manipulated to stay below approval thresholds — classic signs of invoice splitting fraud.',
      },
      points: 25,
    },
    {
      id: 't3',
      taskNumber: 3,
      requirement: 'If 40% of the excess digit-8 and digit-9 payments are confirmed fraudulent with an average fraud amount of $780, estimate the total fraud exposure.',
      hints: ['Excess = observed - expected for digits 8 and 9'],
      solution: {
        approach: 'Calculate excess transactions for digits 8 and 9, apply fraud rate',
        calculations: `**Excess transactions:**
Digit 8: 140 - 102 = 38 excess
Digit 9: 180 - 92 = 88 excess
Total excess: 126 transactions

**Estimated fraudulent transactions:**
126 × 40% = 50.4 ≈ 50 transactions

**Total estimated fraud exposure:**
50 × $780 = **$39,000**

**Annualized (if pattern persists):** $39,000 for this sample period
**Risk assessment:** Moderate dollar amount but indicates control weakness that could escalate`,
        answer: { excessTransactions: 126, fraudAmount: 39312 },
        explanation: 'Estimated fraud of ~$39,312 (126 excess × 40% × $780). While the dollar amount is moderate, the control weakness enabling systematic threshold manipulation requires immediate remediation.',
      },
      points: 15,
    },
  ],

  skills: ['Benford\'s Law analysis', 'Chi-square testing', 'Fraud detection', 'Data analytics'],
  relatedConcepts: ['Statistical analysis', 'Internal audit', 'Forensic accounting', 'Approval controls'],
};

// ============================================
// Simulation 3: Capital Structure & WACC (CMA2-B)
// ============================================

export const CMA2_SIMULATION_8_CAPITAL_STRUCTURE: PracticeSimulation = {
  id: 'cma2-sim-008',
  section: 'CMA2',
  title: 'Optimal Capital Structure & WACC Analysis',
  blueprintArea: 'CMA2-B',
  topic: 'WACC and Capital Structure Optimization',
  difficulty: 'hard',
  estimatedTime: 25,

  scenario: `TechVenture Corp is considering restructuring its capital to fund a major expansion. The CFO has asked you to analyze the impact of different debt levels on WACC and firm value to determine the optimal capital structure.

Current market data and proposed scenarios are provided in the exhibits.`,

  exhibits: [
    {
      id: 'ex1',
      title: 'Current Capital Structure & Market Data',
      type: 'table',
      data: `| Item | Value |
|------|-------|
| Market value of equity | $500 million |
| Market value of debt | $200 million |
| Total firm value | $700 million |
| Risk-free rate | 4.0% |
| Market risk premium | 6.0% |
| Current beta (levered) | 1.20 |
| Current cost of debt (pre-tax) | 5.5% |
| Corporate tax rate | 25% |
| Current EBIT | $105 million |`,
    },
    {
      id: 'ex2',
      title: 'Proposed Capital Structure Scenarios',
      type: 'table',
      data: `| Scenario | D/V Ratio | Pre-tax Cost of Debt | Levered Beta |
|----------|----------|---------------------|-------------|
| A - Conservative | 20% | 5.0% | 1.05 |
| B - Current | 28.6% | 5.5% | 1.20 |
| C - Moderate | 40% | 6.5% | 1.45 |
| D - Aggressive | 55% | 8.5% | 1.90 |
| E - Highly Leveraged | 70% | 12.0% | 2.80 |`,
    },
  ],

  tasks: [
    {
      id: 't1',
      taskNumber: 1,
      requirement: 'Calculate the cost of equity (CAPM) and WACC for each of the 5 scenarios.',
      hints: ['ke = Rf + β(Rm-Rf)', 'WACC = we × ke + wd × kd × (1-T)'],
      solution: {
        approach: 'Apply CAPM for cost of equity, then weighted average for WACC',
        calculations: `**Cost of Equity = Rf + β × MRP = 4% + β × 6%**

| Scenario | D/V | E/V | Beta | ke | kd(1-T) | WACC |
|----------|-----|-----|------|-----|---------|------|
| A | 20% | 80% | 1.05 | 10.30% | 3.75% | 8.99% |
| B | 28.6% | 71.4% | 1.20 | 11.20% | 4.125% | 9.18% |
| C | 40% | 60% | 1.45 | 12.70% | 4.875% | 9.57% |
| D | 55% | 45% | 1.90 | 15.40% | 6.375% | 10.44% |
| E | 70% | 30% | 2.80 | 20.80% | 9.00% | 12.54% |

**Detailed Scenario A:**
ke = 4% + 1.05 × 6% = 10.30%
kd(1-T) = 5.0% × (1-0.25) = 3.75%
WACC = 0.80 × 10.30% + 0.20 × 3.75% = 8.24% + 0.75% = **8.99%**`,
        answer: { waccA: 8.99, waccB: 9.18, waccC: 9.57, waccD: 10.44, waccE: 12.54 },
        explanation: 'WACC increases with leverage because the rising cost of debt and equity from financial risk more than offsets the tax benefit of debt beyond the optimal point.',
      },
      points: 30,
    },
    {
      id: 't2',
      taskNumber: 2,
      requirement: 'Calculate the estimated firm value under each scenario using the perpetuity approach: V = EBIT(1-T) / WACC. Which scenario maximizes firm value?',
      hints: ['V = NOPAT / WACC where NOPAT = EBIT × (1-T)'],
      solution: {
        approach: 'Calculate NOPAT, then divide by WACC for each scenario',
        calculations: `**NOPAT = $105M × (1 - 0.25) = $78.75M**

| Scenario | WACC | V = $78.75M / WACC | Δ vs Current |
|----------|------|---------------------|-------------|
| A | 8.99% | $876.0M | +$176.0M |
| B (current) | 9.18% | $857.7M | — |
| C | 9.57% | $822.9M | -$34.8M |
| D | 10.44% | $754.3M | -$103.4M |
| E | 12.54% | $628.0M | -$229.7M |

**Scenario A maximizes firm value at $876.0M** (+$176M vs current)

The lowest WACC (8.99%) corresponds to the highest firm value.`,
        answer: { firmValueA: 876, firmValueB: 857.7, optimalScenario: 1 },
        explanation: 'Scenario A (conservative 20% D/V) maximizes firm value because the cost savings from lower-risk borrowing exceed the reduced tax shield from less debt.',
      },
      points: 25,
    },
    {
      id: 't3',
      taskNumber: 3,
      requirement: 'Calculate the unlevered (asset) beta using the Hamada equation from the current structure, then verify the levered betas are consistent across scenarios.',
      hints: ['βu = βL / [1 + (1-T)(D/E)]'],
      solution: {
        approach: 'Unlever current beta, then re-lever for each scenario to check consistency',
        calculations: `**Hamada Equation: βL = βu × [1 + (1-T)(D/E)]**
**Unlevering: βu = βL / [1 + (1-T)(D/E)]**

**Current (Scenario B):**
D/E = 28.6% / 71.4% = 0.40
βu = 1.20 / [1 + (1 - 0.25)(0.40)]
βu = 1.20 / [1 + 0.30]
βu = 1.20 / 1.30 = **0.923**

**Verification for each scenario:**
| Scenario | D/E | (1-T)(D/E) | 1 + factor | βL = 0.923 × factor | Given βL |
|----------|-----|-----------|-----------|---------------------|----------|
| A | 0.25 | 0.1875 | 1.1875 | 1.10 | 1.05 |
| B | 0.40 | 0.30 | 1.30 | 1.20 | 1.20 ✓ |
| C | 0.667 | 0.50 | 1.50 | 1.38 | 1.45 |
| D | 1.222 | 0.917 | 1.917 | 1.77 | 1.90 |
| E | 2.333 | 1.75 | 2.75 | 2.54 | 2.80 |

Betas roughly consistent but given betas are slightly higher in high-leverage scenarios — reflecting additional distress risk premium beyond Hamada.`,
        answer: { unleveredBeta: 0.923 },
        explanation: 'The unlevered beta of 0.923 represents purely business risk. The divergence at high leverage levels reflects bankruptcy/distress costs not captured by the basic Hamada equation.',
      },
      points: 20,
    },
  ],

  skills: ['WACC calculation', 'Capital structure analysis', 'CAPM', 'Hamada equation'],
  relatedConcepts: ['Cost of capital', 'MM propositions', 'Trade-off theory', 'Financial leverage'],
};

// ============================================
// Simulation 4: Multi-Product Decision Analysis (CMA2-C)
// ============================================

export const CMA2_SIMULATION_9_DECISION_ANALYSIS: PracticeSimulation = {
  id: 'cma2-sim-009',
  section: 'CMA2',
  title: 'Multi-Product Profitability & Constraint Optimization',
  blueprintArea: 'CMA2-C',
  topic: 'Product Mix with Constraints and Make-vs-Buy',
  difficulty: 'hard',
  estimatedTime: 25,

  scenario: `MetalWorks Manufacturing produces three products: Standard Brackets (SB), Premium Brackets (PB), and Custom Assemblies (CA). The company faces a machine-hour constraint and has received an outsourcing offer for one product line.

You must determine the optimal product mix and evaluate the outsourcing decision.`,

  exhibits: [
    {
      id: 'ex1',
      title: 'Product Data',
      type: 'table',
      data: `| Item | Standard (SB) | Premium (PB) | Custom (CA) |
|------|--------------|-------------|-------------|
| Selling price | $80 | $150 | $220 |
| Direct materials | $25 | $45 | $70 |
| Direct labor ($30/hr) | $15 (0.5 hr) | $30 (1.0 hr) | $45 (1.5 hr) |
| Variable overhead | $10 | $20 | $30 |
| **Variable cost** | **$50** | **$95** | **$145** |
| **CM per unit** | **$30** | **$55** | **$75** |
| Machine hours/unit | 1.0 hr | 2.0 hr | 3.5 hr |
| Demand (units/month) | 3,000 | 2,000 | 800 |

**Available machine hours/month:** 8,000 hours
**Fixed manufacturing overhead:** $120,000/month (allocated based on machine hours)`,
    },
    {
      id: 'ex2',
      title: 'Outsourcing Offer',
      type: 'table',
      data: `| Detail | Information |
|--------|------------|
| Product offered to outsource | Standard Brackets (SB) |
| External supplier price per unit | $62 per unit |
| Avoidable fixed costs if outsourced | $18,000/month |
| Machine hours freed | All SB machine hours |
| Quality | Meets specifications |
| Delivery | Reliable |`,
    },
  ],

  tasks: [
    {
      id: 't1',
      taskNumber: 1,
      requirement: 'Calculate the CM per machine hour for each product. Determine the optimal product mix given the 8,000 machine-hour constraint. What is the maximum total CM?',
      hints: ['Rank by CM per constrained resource. Allocate constraint to highest-ranked first.'],
      solution: {
        approach: 'Calculate CM per machine hour, rank products, allocate to demand in order',
        calculations: `**CM per Machine Hour:**
SB: $30 / 1.0 hr = **$30/hr**
PB: $55 / 2.0 hr = **$27.50/hr**
CA: $75 / 3.5 hr = **$21.43/hr**

**Ranking:** SB ($30) > PB ($27.50) > CA ($21.43)

**Machine Hours Required to Meet Full Demand:**
SB: 3,000 × 1.0 = 3,000 hrs
PB: 2,000 × 2.0 = 4,000 hrs
CA: 800 × 3.5 = 2,800 hrs
**Total needed: 9,800 hrs** (exceeds 8,000 by 1,800)

**Optimal allocation (highest CM/hr first):**
1. SB: 3,000 units × 1.0 hr = 3,000 hrs → CM = 3,000 × $30 = $90,000
2. PB: 2,000 units × 2.0 hr = 4,000 hrs → CM = 2,000 × $55 = $110,000
   Remaining: 8,000 - 3,000 - 4,000 = 1,000 hrs
3. CA: 1,000 / 3.5 = 285 units → CM = 285 × $75 = $21,375

**Maximum Total CM = $90,000 + $110,000 + $21,375 = $221,375**
**Unfulfilled CA demand: 800 - 285 = 515 units**`,
        answer: { sbCMperHr: 30, pbCMperHr: 27.5, caCMperHr: 21.43, maxCM: 221375 },
        explanation: 'Optimal mix: SB 3,000 + PB 2,000 + CA 285 units. CA is partially constrained because it has the lowest CM per machine hour.',
      },
      points: 30,
    },
    {
      id: 't2',
      taskNumber: 2,
      requirement: 'Evaluate the outsourcing offer for Standard Brackets. Should MetalWorks outsource SB and use freed machine hours for other products? Show the financial impact.',
      hints: ['Compare: cost to buy vs cost to make + opportunity cost of freed hours'],
      solution: {
        approach: 'Calculate incremental cost of outsourcing vs making, considering freed capacity reallocation',
        calculations: `**Make vs Buy Analysis (per unit):**
| Cost | Make | Buy |
|------|------|-----|
| Variable cost | $50 | — |
| Purchase price | — | $62 |
| **Differential** | | **$12 more to buy** |

**Cost to outsource 3,000 SB:** 3,000 × $12 = $36,000/month MORE
**Avoidable fixed costs saved:** $18,000/month
**Net outsourcing cost:** $36,000 - $18,000 = $18,000/month MORE

**BUT — freed machine hours create opportunity:**
Freed hours from SB: 3,000 machine hours
These can produce additional CA units:
Additional CA: 3,000 hr / 3.5 hr = 857 units
But CA demand is only 800 total, currently making 285
Additional CA possible: 800 - 285 = 515 units × 3.5 hr = 1,802.5 hrs

Remaining hrs: 3,000 - 1,802.5 = 1,197.5 hrs
Additional PB possible: Demand already met (2,000), so $0

**Value of additional CA production:**
515 units × $75 CM = $38,625

**Net benefit of outsourcing:**
Additional CM from CA: $38,625
Less: Net outsourcing cost: ($18,000)
**Net benefit: $38,625 - $18,000 = $20,625/month**

**RECOMMEND: OUTSOURCE Standard Brackets**`,
        answer: { outsourceCostPerUnit: 12, netBenefit: 20625 },
        explanation: 'Despite costing $12 more per unit to buy, outsourcing SB frees machine hours to produce 515 more Custom Assemblies, generating $20,625/month net benefit.',
      },
      points: 30,
    },
    {
      id: 't3',
      taskNumber: 3,
      requirement: 'What is the maximum price MetalWorks should pay the external supplier for Standard Brackets?',
      hints: ['Maximum price = variable cost + opportunity cost per unit of the freed resource'],
      solution: {
        approach: 'Add opportunity cost of freed machine hours to variable production cost',
        calculations: `**Opportunity cost of machine hours freed by outsourcing SB:**
Each SB uses 1.0 machine hour
The freed hours would produce CA at $21.43 CM per machine hour (for next 515 units)

**But we must also add back the avoidable fixed costs per unit:**
Avoidable fixed = $18,000 / 3,000 units = $6/unit

**Maximum purchase price = Variable cost + Avoidable FC per unit + Opportunity cost/hr**
= $50 + $6 + $21.43 × 1.0 hr
= $50 + $6 + $21.43
= **$77.43 per unit**

**Verification at $77.43:**
Additional cost: (77.43 - 50) × 3,000 = $82,290
Avoidable FC savings: $18,000
Net cash out: $82,290 - $18,000 = $64,290
CM from 515 extra CA: 515 × $75 = $38,625
CM from remaining hrs (1,197.5 hrs with no demand): $0
=> Need to consider hours with no product demand have $0 opportunity

**Refined maximum = $50 + ($18,000 + 515 × $75) / 3,000**
= $50 + ($18,000 + $38,625) / 3,000
= $50 + $56,625 / 3,000
= $50 + $18.88 = **$68.88**`,
        answer: { maxPrice: 68.88 },
        explanation: 'The maximum price is $68.88 — the variable cost ($50) plus the savings and opportunity value ($18.88) that outsourcing generates per unit.',
      },
      points: 15,
    },
  ],

  skills: ['Constraint analysis', 'Product mix optimization', 'Make-vs-buy', 'Opportunity cost'],
  relatedConcepts: ['TOC', 'Relevant costs', 'Outsourcing', 'Linear programming'],
};

// ============================================
// Simulation 5: Enterprise Risk Management (CMA2-D)
// ============================================

export const CMA2_SIMULATION_10_RISK_MANAGEMENT: PracticeSimulation = {
  id: 'cma2-sim-010',
  section: 'CMA2',
  title: 'Enterprise Risk Management & Hedging',
  blueprintArea: 'CMA2-D',
  topic: 'Foreign Currency Risk and Hedging Strategies',
  difficulty: 'expert',
  estimatedTime: 30,

  scenario: `GlobalTech Inc., a U.S.-based manufacturer, has significant international operations. The treasury department needs to assess and hedge the company's foreign currency exposure for the upcoming quarter.

The company expects to receive €5,000,000 in 90 days from a large European contract and pay ¥800,000,000 to a Japanese supplier in 60 days.`,

  exhibits: [
    {
      id: 'ex1',
      title: 'Current Exchange Rates and Forward Rates',
      type: 'table',
      data: `| Currency Pair | Spot Rate | 60-Day Forward | 90-Day Forward |
|--------------|-----------|---------------|---------------|
| EUR/USD | 1.0850 | 1.0870 | 1.0890 |
| USD/JPY | 148.50 | 147.80 | 147.20 |

**Note:** EUR/USD = dollars per euro. USD/JPY = yen per dollar.`,
    },
    {
      id: 'ex2',
      title: 'Options Available',
      type: 'table',
      data: `| Option | Type | Strike | Premium | Expiration |
|--------|------|--------|---------|-----------|
| EUR Put | Right to sell € | $1.0825/€ | $0.0120/€ | 90 days |
| EUR Call | Right to buy € | $1.0900/€ | $0.0095/€ | 90 days |
| JPY Call | Right to buy ¥ | $0.00680/¥ | $0.000085/¥ | 60 days |

**Company's risk management policy:**
- Hedge at least 75% of exposures > $1 million
- Prefer forwards for committed transactions
- Use options when flexibility is needed`,
    },
  ],

  tasks: [
    {
      id: 't1',
      taskNumber: 1,
      requirement: 'Calculate the USD value of both exposures at spot rates and forward rates. Determine the net exposure.',
      hints: ['For EUR receivable, use EUR/USD directly. For JPY payable, convert from USD/JPY.'],
      solution: {
        approach: 'Convert each exposure to USD at both spot and forward rates',
        calculations: `**Euro Receivable (€5,000,000 in 90 days):**
At spot: €5,000,000 × $1.0850 = **$5,425,000**
At 90-day forward: €5,000,000 × $1.0890 = **$5,445,000**
Forward premium: $5,445,000 - $5,425,000 = $20,000 (EUR appreciating)

**Yen Payable (¥800,000,000 in 60 days):**
At spot: ¥800,000,000 / 148.50 = **$5,387,205**
At 60-day forward: ¥800,000,000 / 147.80 = **$5,412,719**
Forward premium: $5,412,719 - $5,387,205 = $25,514 (JPY appreciating → more costly)

**Net Exposure Summary:**
| Exposure | Spot Value (USD) | Forward Value (USD) | Direction |
|----------|-----------------|--------------------|-----------| 
| EUR Receivable | $5,425,000 | $5,445,000 | Favorable if EUR rises |
| JPY Payable | ($5,387,205) | ($5,412,719) | Unfavorable if JPY rises |
| **Net** | **$37,795** | **$32,281** | Approximately offsetting |`,
        answer: { eurSpot: 5425000, eurForward: 5445000, jpySpot: 5387205, jpyForward: 5412719 },
        explanation: 'The exposures are roughly equal in size but opposite in direction, creating a natural hedge. However, timing differs (60 vs 90 days), so specific hedging is still needed.',
      },
      points: 25,
    },
    {
      id: 't2',
      taskNumber: 2,
      requirement: 'Design a hedging strategy: (a) Use forward contracts for both exposures. Calculate the locked-in USD amounts. (b) Calculate the cost/benefit of using an option instead for the EUR receivable.',
      hints: ['Forward locks in the rate. Option provides a floor with upside potential.'],
      solution: {
        approach: 'Calculate forward hedge outcomes and compare with option strategy',
        calculations: `**(a) Forward Hedge:**
EUR Receivable (90-day forward at $1.0890):
Locked-in receipt: €5,000,000 × $1.0890 = **$5,445,000**

JPY Payable (60-day forward at 147.80):
Locked-in payment: ¥800,000,000 / 147.80 = **$5,412,719**

Net locked-in: $5,445,000 - $5,412,719 = **$32,281 net receipt**
Cost of forwards: $0 (no upfront cost)

**(b) Option for EUR Receivable:**
EUR Put option (right to sell € at $1.0825):
Premium: $0.0120 × 5,000,000 = **$60,000**

**Scenario analysis:**
If EUR/USD falls to $1.0600:
- Put exercised: sell at $1.0825 → $5,412,500
- Net after premium: $5,412,500 - $60,000 = $5,352,500
- Forward would have given: $5,445,000
- Option LOSES $92,500 vs forward

If EUR/USD rises to $1.1200:
- Put expires worthless, sell at spot: $5,600,000
- Net after premium: $5,600,000 - $60,000 = $5,540,000
- Forward would have given: $5,445,000
- Option WINS $95,000 vs forward

**Breakeven EUR/USD rate for option vs forward:**
$1.0890 + $0.0120 = **$1.1010**
Above $1.1010, option outperforms forward.`,
        answer: { forwardEUR: 5445000, forwardJPY: 5412719, optionPremium: 60000, breakeven: 1.101 },
        explanation: 'The forward provides certainty at $5,445,000. The option costs $60,000 but provides upside. Option outperforms if EUR/USD exceeds $1.1010.',
      },
      points: 35,
    },
    {
      id: 't3',
      taskNumber: 3,
      requirement: 'If the company hedges 80% with forwards and 20% with options, calculate the minimum and expected USD receipt from the EUR exposure.',
      hints: ['80% locked in at forward rate, 20% has a floor from the put option'],
      solution: {
        approach: 'Blend forward and option strategies for the EUR receivable',
        calculations: `**Blended Strategy for €5,000,000:**
Forward hedge: 80% = €4,000,000 at $1.0890
Option hedge: 20% = €1,000,000 with put at $1.0825

**Forward portion (certain):**
€4,000,000 × $1.0890 = $4,356,000

**Option portion:**
Premium paid: $0.0120 × 1,000,000 = $12,000

Minimum (put exercised):
€1,000,000 × $1.0825 = $1,082,500
Net: $1,082,500 - $12,000 = $1,070,500

**Total minimum receipt:**
$4,356,000 + $1,070,500 = **$5,426,500**

**Expected (if EUR/USD stays at $1.0890):**
€1,000,000 × $1.0890 = $1,089,000
Net: $1,089,000 - $12,000 = $1,077,000
Total: $4,356,000 + $1,077,000 = **$5,433,000**

**Comparison:**
100% Forward: $5,445,000 (certain)
80/20 Blend minimum: $5,426,500 (floor)
80/20 Blend if no premium: Unlimited upside on 20%

**Effective cost of flexibility:** $5,445,000 - $5,433,000 = $12,000 (the option premium)`,
        answer: { minimumReceipt: 5426500, expectedReceipt: 5433000 },
        explanation: 'The blended 80/20 strategy provides a floor of $5,426,500 (vs $5,445,000 pure forward) while preserving upside on 20% of the position.',
      },
      points: 15,
    },
  ],

  skills: ['Foreign currency exposure', 'Forward contracts', 'Option strategies', 'Risk management'],
  relatedConcepts: ['Transaction exposure', 'Natural hedging', 'Options pricing', 'COSO ERM'],
};

// Combined export
export const ADDITIONAL_SIMULATIONS_BATCH2 = [
  CMA1_SIMULATION_9_INTERNAL_CONTROLS,
  CMA1_SIMULATION_10_ANALYTICS,
  CMA2_SIMULATION_8_CAPITAL_STRUCTURE,
  CMA2_SIMULATION_9_DECISION_ANALYSIS,
  CMA2_SIMULATION_10_RISK_MANAGEMENT,
];

export default ADDITIONAL_SIMULATIONS_BATCH2;

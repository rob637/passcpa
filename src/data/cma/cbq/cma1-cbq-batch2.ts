/**
 * CMA Part 1 Case-Based Questions (CBQs) - Batch 2
 *
 * Covers blueprint areas not yet represented:
 *   CMA1-A  External Financial Reporting (×2)
 *   CMA1-B  Planning, Budgeting & Forecasting (×1)
 *   CMA1-C  Performance Management (×1)
 *   CMA1-D  Cost Management (×2)
 *   CMA1-E  Internal Controls (×1)
 *   CMA1-F  Technology & Analytics (×1)
 */

import type { CBQ } from '../../../types';

export const CMA1_CBQS_BATCH2: CBQ[] = [
  // ─────────────────────────────────────────────────────────
  // CBQ 3 – CMA1-D  Cost Management: CVP & Pricing
  // ─────────────────────────────────────────────────────────
  {
    id: 'cma1-cbq-003',
    courseId: 'cma',
    section: 'CMA1',
    title: 'CVP Analysis and Pricing Decision',
    difficulty: 'medium',
    estimatedTime: 16,
    blueprintArea: 'CMA1-D',
    topics: ['Cost-Volume-Profit', 'Pricing', 'Break-Even Analysis'],
    totalPoints: 25,

    scenario: `
## Sunrise Bakery – New Product Line Evaluation

Sunrise Bakery is a regional chain considering a gourmet cupcake line. The CFO has asked you to evaluate the financial viability.

### Proposed Cost Structure (per dozen)
| Item | Amount |
|------|--------|
| Selling price | $36.00 |
| Ingredients | $8.40 |
| Packaging | $2.10 |
| Direct labor | $6.00 |
| Sales commission (5%) | $1.80 |
| **Total variable cost** | **$18.30** |

### Monthly Fixed Costs
| Item | Amount |
|------|--------|
| Equipment lease | $3,200 |
| Insurance | $800 |
| Marketing | $2,000 |
| Dedicated staff | $4,000 |
| **Total** | **$10,000** |

### Market Data
- Expected demand: 800–1,200 dozen / month
- Competitor pricing: $32–$42 / dozen
- Current capacity: 1,000 dozen (1,500 with overtime)
- Peak season (Nov–Dec): demand increases 40%
    `,

    questions: [
      {
        id: 'cma1-cbq-003-q1',
        prompt: 'Calculate the contribution margin per dozen cupcakes.',
        type: 'numerical_entry',
        correctAnswer: 17.70,
        tolerance: 0.01,
        points: 5,
        explanation: 'CM = Selling Price − Variable Cost = $36.00 − $18.30 = $17.70 per dozen.',
      },
      {
        id: 'cma1-cbq-003-q2',
        prompt: 'Calculate the monthly break-even point in dozens (round up to the nearest whole dozen).',
        type: 'numerical_entry',
        correctAnswer: 565,
        tolerance: 1,
        points: 5,
        explanation: 'BEP = Fixed Costs ÷ CM = $10,000 ÷ $17.70 = 564.97 ≈ 565 dozen.',
      },
      {
        id: 'cma1-cbq-003-q3',
        prompt: 'How many dozen must be sold to earn a target monthly profit of $5,000? (Round up.)',
        type: 'numerical_entry',
        correctAnswer: 848,
        tolerance: 2,
        points: 5,
        explanation: 'Required sales = (FC + Target Profit) ÷ CM = ($10,000 + $5,000) ÷ $17.70 = 847.5 ≈ 848 dozen.',
      },
      {
        id: 'cma1-cbq-003-q4',
        prompt: 'During peak season, demand rises 40% to 1,400 dozen. Overtime adds $3.00/dozen in labor. What is the margin of safety in dozens at peak capacity of 1,500 dozen? (Use the overtime CM.)',
        type: 'numerical_entry',
        correctAnswer: 820,
        tolerance: 5,
        points: 5,
        explanation: 'Overtime CM = $36 − ($18.30 + $3.00) = $14.70. Overtime BEP = $10,000 ÷ $14.70 = 680.3 ≈ 681 dozen. At 1,500 capacity the margin of safety = 1,500 − 681 = 819 ≈ 820 dozen.',
      },
      {
        id: 'cma1-cbq-003-q5',
        prompt: 'Which pricing strategies are appropriate for this gourmet product? Select ALL that apply.',
        type: 'multiple_select',
        options: [
          'Target costing to achieve desired profit margin',
          'Penetration pricing at $20 to undercut competitors',
          'Premium pricing at $40 for specialty/custom orders',
          'Cost-plus pricing ensuring coverage of all costs',
          'Dynamic pricing during peak season',
        ],
        correctAnswer: [
          'Target costing to achieve desired profit margin',
          'Premium pricing at $40 for specialty/custom orders',
          'Cost-plus pricing ensuring coverage of all costs',
          'Dynamic pricing during peak season',
        ],
        points: 5,
        explanation: 'Penetration at $20 yields a CM of only $1.70/dozen, requiring 5,882 dozen to break even—far above capacity. The other four strategies are viable for a premium product with limited capacity.',
      },
    ],

    references: ['IMA CMA Part 1 - Cost Management'],
  },

  // ─────────────────────────────────────────────────────────
  // CBQ 4 – CMA1-E  Internal Controls: COSO Assessment
  // ─────────────────────────────────────────────────────────
  {
    id: 'cma1-cbq-004',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Internal Control Assessment – Retail Inventory',
    difficulty: 'hard',
    estimatedTime: 18,
    blueprintArea: 'CMA1-E',
    topics: ['COSO Framework', 'Internal Controls', 'Inventory Management'],
    totalPoints: 25,

    scenario: `
## Global Retail Inc. – Inventory Shrinkage Investigation

Global Retail operates 50 stores across the Midwest. A year-end physical count revealed significant inventory discrepancies.

### Inventory Discrepancy Summary
| Category | Book Value | Physical Count | Variance | % |
|----------|-----------|----------------|----------|------|
| Electronics | $2,450,000 | $2,180,000 | ($270,000) | −11.0% |
| Apparel | $1,800,000 | $1,710,000 | ($90,000) | −5.0% |
| Home Goods | $950,000 | $920,000 | ($30,000) | −3.2% |
| Accessories | $400,000 | $365,000 | ($35,000) | −8.8% |
| **Total** | **$5,600,000** | **$5,175,000** | **($425,000)** | **−7.6%** |

### Control Environment Observations
- **Staffing:** 45% annual turnover; no background checks; managers override POS
- **Processes:** Single employee receives shipments; returns processed by any cashier; quarterly cycle counts by store staff
- **Technology:** 8-year-old POS with no inventory integration; manual adjustments
- **Physical security:** No stockroom cameras; loading dock open during business hours
    `,

    questions: [
      {
        id: 'cma1-cbq-004-q1',
        prompt: 'Which COSO Internal Control components are MOST directly compromised? Select ALL that apply.',
        type: 'multiple_select',
        options: [
          'Control Environment',
          'Risk Assessment',
          'Control Activities',
          'Information and Communication',
          'Monitoring Activities',
        ],
        correctAnswer: [
          'Control Environment',
          'Control Activities',
          'Monitoring Activities',
        ],
        points: 5,
        explanation: 'Control Environment is compromised by high turnover and lack of background checks. Control Activities by single-person receiving, weak returns process, and no segregation. Monitoring Activities by infrequent cycle counts performed by non-independent staff.',
      },
      {
        id: 'cma1-cbq-004-q2',
        prompt: 'Match each control weakness with the most appropriate corrective action.',
        type: 'drag_and_drop',
        dragItems: [
          'Implement blind receiving counts',
          'Install security cameras',
          'Segregate return processing duties',
          'Deploy real-time POS-inventory integration',
        ],
        dropZones: [
          'Single employee receives shipments',
          'No stockroom cameras',
          'Returns processed by any cashier',
          'Manual inventory adjustments',
        ],
        correctAnswer: {
          'Single employee receives shipments': 'Implement blind receiving counts',
          'No stockroom cameras': 'Install security cameras',
          'Returns processed by any cashier': 'Segregate return processing duties',
          'Manual inventory adjustments': 'Deploy real-time POS-inventory integration',
        },
        points: 5,
        explanation: 'Blind receiving adds a second verification. Cameras deter stockroom theft. Segregation prevents return fraud. System integration eliminates manual entry errors.',
      },
      {
        id: 'cma1-cbq-004-q3',
        prompt: 'If Electronics shrinkage is reduced from 11% to the 2% industry average, what is the annual dollar savings?',
        type: 'numerical_entry',
        correctAnswer: 220500,
        tolerance: 100,
        points: 5,
        explanation: 'Current shrinkage = $2,450,000 × 11% = $269,500. Target = $2,450,000 × 2% = $49,000. Savings = $269,500 − $49,000 = $220,500.',
      },
      {
        id: 'cma1-cbq-004-q4',
        prompt: 'Complete the recommendation: "To improve the ___ component, implement ___ cycle counts performed by ___ personnel."',
        type: 'dropdown',
        options: [
          'Monitoring Activities / weekly or continuous / independent',
          'Control Activities / quarterly / store',
          'Control Environment / annual / management',
          'Risk Assessment / monthly / external audit',
        ],
        correctAnswer: 'Monitoring Activities / weekly or continuous / independent',
        points: 5,
        explanation: 'More frequent cycle counts by independent personnel improve Monitoring Activities by providing objective, ongoing assessment of control effectiveness.',
      },
      {
        id: 'cma1-cbq-004-q5',
        prompt: 'Which technology improvements would MOST effectively address the inventory issues? Select ALL that apply.',
        type: 'multiple_select',
        options: [
          'RFID tags for high-value electronics',
          'Integrated ERP replacing legacy POS',
          'Biometric access for stockrooms',
          'Blockchain for supply chain tracking',
          'AI-powered exception reporting',
        ],
        correctAnswer: [
          'RFID tags for high-value electronics',
          'Integrated ERP replacing legacy POS',
          'Biometric access for stockrooms',
          'AI-powered exception reporting',
        ],
        points: 5,
        explanation: 'RFID directly addresses high-value electronics shrinkage. Integrated ERP fixes system gaps. Biometric access improves physical security. AI exception reporting identifies suspicious patterns. Blockchain is overkill and does not address internal shrinkage.',
      },
    ],

    references: ['COSO Internal Control – Integrated Framework (2013)'],
  },

  // ─────────────────────────────────────────────────────────
  // CBQ 5 – CMA1-A  External Financial Reporting: Revenue Recognition
  // ─────────────────────────────────────────────────────────
  {
    id: 'cma1-cbq-005',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Revenue Recognition Under ASC 606',
    difficulty: 'hard',
    estimatedTime: 20,
    blueprintArea: 'CMA1-A',
    topics: ['Revenue Recognition', 'ASC 606', 'Multi-Element Arrangements'],
    totalPoints: 25,

    scenario: `
## CloudTech Solutions – Software Licensing Arrangement

CloudTech Solutions entered a $900,000 contract on January 1 with Acme Corp for:

| Deliverable | Standalone Price | Delivery |
|-------------|-----------------|----------|
| Software license | $500,000 | Delivered Jan 1 |
| Implementation services | $250,000 | Jan 1 – Jun 30 (6 months) |
| 2-year customer support | $200,000 | Jan 1, Year 1 – Dec 31, Year 2 |
| **Total standalone prices** | **$950,000** | |

### Additional Facts
- The software is functional without implementation services
- Implementation is not significantly customizing the software
- Customer support is a distinct stand-ready obligation
- Payment terms: $300,000 on signing; $300,000 on Jul 1; $300,000 on Jan 1 Year 2
- CloudTech's fiscal year ends December 31
    `,

    questions: [
      {
        id: 'cma1-cbq-005-q1',
        prompt: 'How many distinct performance obligations exist in this contract?',
        type: 'dropdown',
        options: ['1', '2', '3', '4'],
        correctAnswer: '3',
        points: 5,
        explanation: 'The three distinct obligations are: (1) software license, (2) implementation services, and (3) customer support. The software is functional IP and the implementation does not significantly modify it, so they are distinct.',
      },
      {
        id: 'cma1-cbq-005-q2',
        prompt: 'Using relative standalone selling prices, calculate the transaction price allocated to the software license. Round to the nearest dollar.',
        type: 'numerical_entry',
        correctAnswer: 473684,
        tolerance: 10,
        points: 5,
        explanation: 'Allocation ratio for license = $500,000 ÷ $950,000 = 52.63%. Allocated price = $900,000 × 52.63% = $473,684.',
      },
      {
        id: 'cma1-cbq-005-q3',
        prompt: 'Calculate the transaction price allocated to implementation services.',
        type: 'numerical_entry',
        correctAnswer: 236842,
        tolerance: 10,
        points: 5,
        explanation: 'Allocation ratio = $250,000 ÷ $950,000 = 26.32%. Allocated price = $900,000 × 26.32% = $236,842.',
      },
      {
        id: 'cma1-cbq-005-q4',
        prompt: 'How much total revenue should CloudTech recognize in Year 1? The license transfers at a point in time (Jan 1). Implementation is recognized over 6 months (complete by Jun 30). Support is recognized ratably over 24 months.',
        type: 'numerical_entry',
        correctAnswer: 805263,
        tolerance: 50,
        points: 5,
        explanation: 'License (point in time, Jan 1): $473,684. Implementation (over time, 100% complete by Dec 31): $236,842. Support allocated = $900,000 × ($200,000/$950,000) = $189,474; Year 1 portion = $189,474 × 12/24 = $94,737. Total Year 1 = $473,684 + $236,842 + $94,737 = $805,263.',
      },
      {
        id: 'cma1-cbq-005-q5',
        prompt: 'Arrange the five steps of ASC 606 in the correct order.',
        type: 'drag_and_drop',
        dragItems: [
          'Allocate the transaction price',
          'Identify the contract',
          'Determine the transaction price',
          'Recognize revenue when obligations are satisfied',
          'Identify performance obligations',
        ],
        correctAnswer: [
          'Identify the contract',
          'Identify performance obligations',
          'Determine the transaction price',
          'Allocate the transaction price',
          'Recognize revenue when obligations are satisfied',
        ],
        points: 5,
        explanation: 'ASC 606 five-step model: (1) Identify the contract, (2) Identify performance obligations, (3) Determine the transaction price, (4) Allocate to obligations, (5) Recognize revenue as obligations are satisfied.',
      },
    ],

    references: ['ASC 606 Revenue from Contracts with Customers'],
  },

  // ─────────────────────────────────────────────────────────
  // CBQ 6 – CMA1-A  External Financial Reporting: Lease Accounting
  // ─────────────────────────────────────────────────────────
  {
    id: 'cma1-cbq-006',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Lease Accounting Under ASC 842',
    difficulty: 'hard',
    estimatedTime: 18,
    blueprintArea: 'CMA1-A',
    topics: ['Lease Accounting', 'ASC 842', 'Right-of-Use Assets'],
    totalPoints: 25,

    scenario: `
## Pacific Distribution Corp. – Warehouse Lease Evaluation

Pacific Distribution is entering a new warehouse lease effective January 1 with these terms:

| Term | Details |
|------|---------|
| Lease term | 5 years, non-cancelable |
| Annual lease payment | $120,000 (paid at year-end) |
| Incremental borrowing rate | 6% |
| Fair value of warehouse | $650,000 |
| Useful life of warehouse | 30 years |
| Purchase option at end | $50,000 (not reasonably certain to exercise) |
| No transfer of ownership at end of lease |

### Present Value Factors at 6%
| Factor | Value |
|--------|-------|
| PV of annuity, 5 years | 4.2124 |
| PV of $1, 5 years | 0.7473 |
    `,

    questions: [
      {
        id: 'cma1-cbq-006-q1',
        prompt: 'Should this lease be classified as a finance lease or an operating lease?',
        type: 'dropdown',
        options: [
          'Finance lease – PV of payments exceeds 90% of fair value',
          'Finance lease – lease term exceeds 75% of useful life',
          'Operating lease – none of the finance lease criteria are met',
          'Operating lease – it transfers ownership at end of term',
        ],
        correctAnswer: 'Operating lease – none of the finance lease criteria are met',
        points: 5,
        explanation: 'PV of payments = $120,000 × 4.2124 = $505,488 = 77.8% of FV (< 90%). Lease term = 5/30 = 16.7% of useful life (< 75%). No ownership transfer. Purchase option not reasonably certain. None of the five finance lease criteria are met → operating lease.',
      },
      {
        id: 'cma1-cbq-006-q2',
        prompt: 'Calculate the right-of-use (ROU) asset and lease liability recognized at lease commencement.',
        type: 'numerical_entry',
        correctAnswer: 505488,
        tolerance: 50,
        points: 5,
        explanation: 'ROU Asset = Lease Liability = PV of lease payments = $120,000 × 4.2124 = $505,488.',
      },
      {
        id: 'cma1-cbq-006-q3',
        prompt: 'For an operating lease under ASC 842, what is the total lease expense recognized in Year 1?',
        type: 'numerical_entry',
        correctAnswer: 120000,
        tolerance: 1,
        points: 5,
        explanation: 'Under ASC 842, operating leases recognize a single straight-line lease expense = Total payments ÷ Lease term = ($120,000 × 5) ÷ 5 = $120,000 per year.',
      },
      {
        id: 'cma1-cbq-006-q4',
        prompt: 'What is the lease liability balance at the end of Year 1? (Interest accrues at 6% on the opening balance, then the payment is made.)',
        type: 'numerical_entry',
        correctAnswer: 415817,
        tolerance: 50,
        points: 5,
        explanation: 'Opening liability = $505,488. Interest = $505,488 × 6% = $30,329. Payment = $120,000. Ending liability = $505,488 + $30,329 − $120,000 = $415,817.',
      },
      {
        id: 'cma1-cbq-006-q5',
        prompt: 'Which statements about ASC 842 are correct? Select ALL that apply.',
        type: 'multiple_select',
        options: [
          'Both operating and finance leases create ROU assets on the balance sheet',
          'Operating leases have straight-line total expense over the lease term',
          'Finance leases result in front-loaded expense (higher in early years)',
          'Short-term leases (≤12 months) must be capitalized',
          'Sale-leaseback transactions always result in operating lease treatment',
        ],
        correctAnswer: [
          'Both operating and finance leases create ROU assets on the balance sheet',
          'Operating leases have straight-line total expense over the lease term',
          'Finance leases result in front-loaded expense (higher in early years)',
        ],
        points: 5,
        explanation: 'Under ASC 842 both lease types create ROU assets and liabilities. Operating leases have straight-line expense; finance leases have front-loaded expense (amortization + interest). Short-term leases have an elective exemption from capitalization. Sale-leasebacks can be finance or operating.',
      },
    ],

    references: ['ASC 842 Leases'],
  },

  // ─────────────────────────────────────────────────────────
  // CBQ 7 – CMA1-B  Planning, Budgeting & Forecasting: Rolling Forecasts
  // ─────────────────────────────────────────────────────────
  {
    id: 'cma1-cbq-007',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Rolling Forecasts vs. Static Budget',
    difficulty: 'medium',
    estimatedTime: 16,
    blueprintArea: 'CMA1-B',
    topics: ['Rolling Forecasts', 'Budgeting', 'Forecasting Techniques'],
    totalPoints: 25,

    scenario: `
## NovaTech Industries – Budget Modernization

NovaTech's CFO is considering replacing the traditional annual budget with a rolling forecast. Q1 and Q2 actual results are available:

### Annual Static Budget vs. Actuals ($ thousands)
| Metric | Annual Budget | Q1 Actual | Q2 Actual | Q3 Budget | Q4 Budget |
|--------|--------------|-----------|-----------|-----------|-----------|
| Revenue | $20,000 | $4,200 | $5,800 | $5,000 | $5,000 |
| COGS (60%) | $12,000 | $2,730 | $3,596 | $3,000 | $3,000 |
| Gross Profit | $8,000 | $1,470 | $2,204 | $2,000 | $2,000 |
| OpEx | $5,000 | $1,350 | $1,400 | $1,250 | $1,000 |
| Operating Income | $3,000 | $120 | $804 | $750 | $1,000 |

### Additional Context
- Market grew 12% faster than expected in Q2 (competitor exit)
- Actual COGS % has been 65% in Q1 and 62% in Q2 due to supplier issues then renegotiation
- Management expects Q3 revenue of $6,200 and Q4 revenue of $6,500 based on latest pipeline
- COGS is now trending at 61% after new supplier contracts
    `,

    questions: [
      {
        id: 'cma1-cbq-007-q1',
        prompt: 'What is the full-year revenue in the rolling forecast (H1 actuals + updated Q3 + Q4 estimates)?',
        type: 'numerical_entry',
        correctAnswer: 22700,
        tolerance: 10,
        points: 5,
        explanation: 'Rolling forecast revenue = Q1 ($4,200) + Q2 ($5,800) + Q3 ($6,200) + Q4 ($6,500) = $22,700K.',
      },
      {
        id: 'cma1-cbq-007-q2',
        prompt: 'Using the revised 61% COGS rate for Q3 and Q4, calculate the full-year COGS in the rolling forecast (in thousands).',
        type: 'numerical_entry',
        correctAnswer: 14073,
        tolerance: 10,
        points: 5,
        explanation: 'Q1 actual COGS = $2,730. Q2 actual = $3,596. Q3 = $6,200 × 61% = $3,782. Q4 = $6,500 × 61% = $3,965. Total = $2,730 + $3,596 + $3,782 + $3,965 = $14,073K.',
      },
      {
        id: 'cma1-cbq-007-q3',
        prompt: 'What is the revenue variance between the rolling forecast and the static budget?',
        type: 'dropdown',
        options: [
          'Favorable $2,700K – rolling forecast is $2,700K higher',
          'Unfavorable $2,700K – rolling forecast is $2,700K lower',
          'Favorable $1,000K – only Q2 exceeded budget',
          'No variance – both forecast total revenue of $20,000K',
        ],
        correctAnswer: 'Favorable $2,700K – rolling forecast is $2,700K higher',
        points: 5,
        explanation: 'Rolling forecast revenue ($22,700K) − Static budget ($20,000K) = $2,700K favorable variance. The market outperformance in Q2 and revised Q3/Q4 pipeline drive the increase.',
      },
      {
        id: 'cma1-cbq-007-q4',
        prompt: 'Arrange the following benefits of rolling forecasts from MOST to LEAST impactful for NovaTech:',
        type: 'drag_and_drop',
        dragItems: [
          'Incorporates latest market intelligence (competitor exit)',
          'Reduces budget gaming and sandbagging',
          'Provides continuous 12–18 month planning horizon',
          'Eliminates year-end budget rush',
        ],
        correctAnswer: [
          'Incorporates latest market intelligence (competitor exit)',
          'Provides continuous 12–18 month planning horizon',
          'Reduces budget gaming and sandbagging',
          'Eliminates year-end budget rush',
        ],
        points: 5,
        explanation: 'For NovaTech, the competitor exit made the static budget obsolete immediately—incorporating market intelligence is the top benefit. A continuous horizon and reduced gaming are also key advantages. Eliminating the budget rush is a process efficiency gain but less impactful strategically.',
      },
      {
        id: 'cma1-cbq-007-q5',
        prompt: 'Which forecasting techniques should NovaTech use for the rolling forecast? Select ALL that apply.',
        type: 'multiple_select',
        options: [
          'Driver-based modeling tied to pipeline metrics',
          'Zero-based budgeting for all line items each quarter',
          'Trend analysis using H1 actual run rates',
          'Scenario planning (base, optimistic, pessimistic)',
          'Incremental budgeting adding 5% to prior year',
        ],
        correctAnswer: [
          'Driver-based modeling tied to pipeline metrics',
          'Trend analysis using H1 actual run rates',
          'Scenario planning (base, optimistic, pessimistic)',
        ],
        points: 5,
        explanation: 'Rolling forecasts benefit from driver-based models (link revenue to pipeline), trend analysis (use actual data), and scenario planning (address uncertainty). Zero-based budgeting is too detailed for reforecasting, and incremental budgeting defeats the purpose of rolling forecasts.',
      },
    ],

    references: ['IMA CMA Part 1 - Planning, Budgeting, and Forecasting'],
  },

  // ─────────────────────────────────────────────────────────
  // CBQ 8 – CMA1-C  Performance Management: Balanced Scorecard
  // ─────────────────────────────────────────────────────────
  {
    id: 'cma1-cbq-008',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Balanced Scorecard Implementation',
    difficulty: 'medium',
    estimatedTime: 16,
    blueprintArea: 'CMA1-C',
    topics: ['Balanced Scorecard', 'KPIs', 'Strategy Mapping'],
    totalPoints: 25,

    scenario: `
## CareFirst Health System – Strategic Performance Framework

CareFirst Health System (3 hospitals, 12 clinics) is implementing a Balanced Scorecard (BSC) to align operations with its strategy: *"Deliver exceptional patient outcomes while achieving financial sustainability."*

### Current Performance Data
| Metric | Current | Industry Avg | Target |
|--------|---------|-------------|--------|
| Operating margin | 2.8% | 4.5% | 5.0% |
| Revenue per patient day | $2,100 | $2,400 | $2,500 |
| Patient satisfaction (HCAHPS) | 72% | 78% | 85% |
| Readmission rate (30-day) | 14% | 12% | 9% |
| Avg wait time (ED) | 45 min | 30 min | 20 min |
| Employee turnover (nurses) | 22% | 15% | 12% |
| Time to adopt new protocols | 6 months | 3 months | 2 months |
| IT system uptime | 97% | 99.5% | 99.9% |
    `,

    questions: [
      {
        id: 'cma1-cbq-008-q1',
        prompt: 'Match each metric to the correct BSC perspective.',
        type: 'drag_and_drop',
        dragItems: [
          'Operating margin',
          'Patient satisfaction (HCAHPS)',
          'Time to adopt new protocols',
          'Nurse turnover rate',
        ],
        dropZones: [
          'Financial',
          'Customer',
          'Learning & Growth',
          'Internal Process',
        ],
        correctAnswer: {
          'Financial': 'Operating margin',
          'Customer': 'Patient satisfaction (HCAHPS)',
          'Learning & Growth': 'Time to adopt new protocols',
          'Internal Process': 'Nurse turnover rate',
        },
        points: 5,
        explanation: 'Operating margin is a Financial metric. Patient satisfaction is a Customer (patient) metric. Protocol adoption speed reflects Learning & Growth (organizational agility). Nurse turnover is an Internal Process metric affecting care delivery capability.',
      },
      {
        id: 'cma1-cbq-008-q2',
        prompt: 'Which metrics are leading indicators (predictive) rather than lagging indicators (outcome)? Select ALL that apply.',
        type: 'multiple_select',
        options: [
          'Employee turnover rate',
          'Operating margin',
          'Average ED wait time',
          '30-day readmission rate',
          'IT system uptime',
        ],
        correctAnswer: [
          'Employee turnover rate',
          'Average ED wait time',
          'IT system uptime',
        ],
        points: 5,
        explanation: 'Leading indicators predict future outcomes: high turnover predicts future quality issues, wait times indicate process efficiency affecting satisfaction, and IT uptime enables operational performance. Operating margin and readmissions are lagging outcome measures.',
      },
      {
        id: 'cma1-cbq-008-q3',
        prompt: 'If CareFirst reduces the 30-day readmission rate from 14% to 9% across 20,000 annual discharges, and each avoided readmission saves $8,500 in unreimbursed cost, what is the annual financial impact?',
        type: 'numerical_entry',
        correctAnswer: 8500000,
        tolerance: 10000,
        points: 5,
        explanation: 'Avoided readmissions = 20,000 × (14% − 9%) = 20,000 × 5% = 1,000. Savings = 1,000 × $8,500 = $8,500,000.',
      },
      {
        id: 'cma1-cbq-008-q4',
        prompt: 'Arrange the BSC cause-and-effect chain in the correct strategic order (from root driver to ultimate outcome):',
        type: 'drag_and_drop',
        dragItems: [
          'Improved operating margin',
          'Reduced nurse turnover',
          'Higher patient satisfaction scores',
          'Invest in nurse training and retention programs',
        ],
        correctAnswer: [
          'Invest in nurse training and retention programs',
          'Reduced nurse turnover',
          'Higher patient satisfaction scores',
          'Improved operating margin',
        ],
        points: 5,
        explanation: 'Strategy map logic: Learning & Growth (training investment) → Internal Process (reduced turnover → better staffing) → Customer (higher satisfaction from experienced staff) → Financial (improved margin from better outcomes and reputation).',
      },
      {
        id: 'cma1-cbq-008-q5',
        prompt: 'What is the primary limitation of the Balanced Scorecard?',
        type: 'dropdown',
        options: [
          'It focuses only on financial metrics',
          'It cannot link strategy to operational metrics',
          'It requires subjective judgment in selecting metrics and setting targets',
          'It is only applicable to manufacturing organizations',
        ],
        correctAnswer: 'It requires subjective judgment in selecting metrics and setting targets',
        points: 5,
        explanation: 'The BSC is powerful because it goes beyond financial metrics & links strategy to operations (eliminating the first two options). It works in any industry. Its primary limitation is the subjectivity in choosing which metrics matter, what weights to assign, and what targets to set.',
      },
    ],

    references: ['Kaplan & Norton – The Balanced Scorecard'],
  },

  // ─────────────────────────────────────────────────────────
  // CBQ 9 – CMA1-D  Cost Management: Activity-Based Costing
  // ─────────────────────────────────────────────────────────
  {
    id: 'cma1-cbq-009',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Activity-Based Costing vs. Traditional Costing',
    difficulty: 'medium',
    estimatedTime: 18,
    blueprintArea: 'CMA1-D',
    topics: ['Activity-Based Costing', 'Cost Allocation', 'Product Costing'],
    totalPoints: 25,

    scenario: `
## Pinnacle Electronics – Product Costing Review

Pinnacle manufactures two products: Standard (high-volume) and Premium (low-volume, complex).

### Production Data
| | Standard | Premium |
|------|----------|---------|
| Units produced annually | 50,000 | 5,000 |
| Direct materials / unit | $25 | $60 |
| Direct labor hours / unit | 1.0 hr | 3.0 hrs |
| Direct labor rate | $20/hr | $20/hr |
| Machine hours / unit | 0.5 hr | 2.0 hrs |
| Number of setups / year | 20 | 80 |
| Quality inspections / year | 100 | 400 |
| Purchase orders / year | 50 | 200 |

### Overhead Cost Pools
| Activity | Cost | Driver |
|----------|------|--------|
| Machine operation | $500,000 | Machine hours |
| Setups | $300,000 | Number of setups |
| Quality inspection | $250,000 | Inspections |
| Purchasing | $200,000 | Purchase orders |
| **Total overhead** | **$1,250,000** | |

### Traditional System
- Allocates all overhead on direct labor hours
- Total DL hours = 50,000 × 1.0 + 5,000 × 3.0 = 65,000 hours
- OH rate = $1,250,000 ÷ 65,000 = $19.23/DL hour
    `,

    questions: [
      {
        id: 'cma1-cbq-009-q1',
        prompt: 'Under the traditional system, what is the total overhead allocated to one Premium unit? Round to the nearest cent.',
        type: 'numerical_entry',
        correctAnswer: 57.69,
        tolerance: 0.02,
        points: 5,
        explanation: 'Traditional OH per Premium unit = $19.23/DL hr × 3.0 hrs = $57.69.',
      },
      {
        id: 'cma1-cbq-009-q2',
        prompt: 'Under ABC, calculate the total overhead allocated to one Premium unit. Round to the nearest cent.',
        type: 'numerical_entry',
        correctAnswer: 148.57,
        tolerance: 0.10,
        points: 5,
        explanation: 'ABC rates: Machine = $500,000 ÷ 35,000 MH = $14.286/MH → Premium: 2.0 × $14.286 = $28.57. Setups = $300,000 ÷ 100 = $3,000/setup → Premium: 80/5,000 × $3,000 = $48.00. Inspection = $250,000 ÷ 500 = $500/insp → Premium: 400/5,000 × $500 = $40.00. Purchasing = $200,000 ÷ 250 = $800/PO → Premium: 200/5,000 × $800 = $32.00. Total ABC OH per Premium = $28.57 + $48.00 + $40.00 + $32.00 = $148.57.',
      },
      {
        id: 'cma1-cbq-009-q3',
        prompt: 'By how much does the traditional system under-cost the Premium product (ABC overhead minus traditional overhead per unit)?',
        type: 'numerical_entry',
        correctAnswer: 90.88,
        tolerance: 0.10,
        points: 5,
        explanation: 'Under-costing = ABC OH ($148.57) − Traditional OH ($57.69) = $90.88 per unit. The traditional system significantly under-costs the low-volume, complex Premium product.',
      },
      {
        id: 'cma1-cbq-009-q4',
        prompt: 'Which statement best explains WHY the traditional system misprices products?',
        type: 'dropdown',
        options: [
          'It uses too many cost pools, spreading costs too thinly',
          'It uses a single volume-based driver that ignores complexity-driven costs',
          'It allocates more overhead to low-volume products',
          'It fails to include direct materials in the allocation base',
        ],
        correctAnswer: 'It uses a single volume-based driver that ignores complexity-driven costs',
        points: 5,
        explanation: 'Traditional costing uses one volume-based driver (DL hours), which spreads batch-level and product-level costs (setups, inspections, purchasing) evenly across all units. Low-volume, complex products consume disproportionately more of these activities but receive too little overhead under the volume-based allocation.',
      },
      {
        id: 'cma1-cbq-009-q5',
        prompt: 'Which decisions could be improved by switching to ABC? Select ALL that apply.',
        type: 'multiple_select',
        options: [
          'Product pricing – set prices that reflect true cost',
          'Product mix – emphasize genuinely profitable products',
          'Process improvement – target high-cost activities for reduction',
          'Capital budgeting – evaluate equipment purchase NPV',
          'Customer profitability – identify unprofitable customer segments',
        ],
        correctAnswer: [
          'Product pricing – set prices that reflect true cost',
          'Product mix – emphasize genuinely profitable products',
          'Process improvement – target high-cost activities for reduction',
          'Customer profitability – identify unprofitable customer segments',
        ],
        points: 5,
        explanation: 'ABC improves pricing, mix, process improvement, and customer profitability decisions by providing accurate cost information. Capital budgeting relies on incremental cash flows and cost of capital, not product costing methodology.',
      },
    ],

    references: ['IMA CMA Part 1 - Cost Management'],
  },

  // ─────────────────────────────────────────────────────────
  // CBQ 10 – CMA1-F  Technology & Analytics
  // ─────────────────────────────────────────────────────────
  {
    id: 'cma1-cbq-010',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Data Analytics and Finance Transformation',
    difficulty: 'medium',
    estimatedTime: 16,
    blueprintArea: 'CMA1-F',
    topics: ['Data Analytics', 'Data Governance', 'Technology Transformation'],
    totalPoints: 25,

    scenario: `
## Vertex Financial Services – Analytics Transformation

Vertex's CFO is implementing an enterprise analytics platform to modernize the finance function. The project team has identified the following use cases and current state:

### Current State Challenges
- Monthly close takes 12 business days (industry best: 4 days)
- 85% of analyst time spent on data gathering vs. 15% on analysis
- 47 standalone spreadsheets used for management reporting
- 3 instances of material report errors discovered in past year
- No standardized data definitions across business units

### Proposed Analytics Capabilities
| Capability | Investment | Annual Benefit |
|------------|-----------|----------------|
| Automated data pipelines | $400,000 | $280,000 (labor savings) |
| Self-service BI dashboards | $250,000 | $150,000 (faster decisions) |
| Predictive revenue forecasting | $300,000 | $450,000 (improved accuracy) |
| Anomaly detection (controls) | $200,000 | $350,000 (fraud/error prevention) |
| **Total** | **$1,150,000** | **$1,230,000** |
    `,

    questions: [
      {
        id: 'cma1-cbq-010-q1',
        prompt: 'What is the simple payback period (in years) for the total analytics investment? Round to two decimal places.',
        type: 'numerical_entry',
        correctAnswer: 0.93,
        tolerance: 0.02,
        points: 5,
        explanation: 'Payback = Total Investment ÷ Annual Benefit = $1,150,000 ÷ $1,230,000 = 0.93 years (about 11 months).',
      },
      {
        id: 'cma1-cbq-010-q2',
        prompt: 'Arrange the analytics maturity levels from LEAST to MOST advanced:',
        type: 'drag_and_drop',
        dragItems: [
          'Prescriptive analytics (What should we do?)',
          'Descriptive analytics (What happened?)',
          'Predictive analytics (What will happen?)',
          'Diagnostic analytics (Why did it happen?)',
        ],
        correctAnswer: [
          'Descriptive analytics (What happened?)',
          'Diagnostic analytics (Why did it happen?)',
          'Predictive analytics (What will happen?)',
          'Prescriptive analytics (What should we do?)',
        ],
        points: 5,
        explanation: 'The analytics maturity spectrum progresses: Descriptive (reporting past), Diagnostic (root cause), Predictive (forecasting future), Prescriptive (recommending actions). Each level builds on the previous.',
      },
      {
        id: 'cma1-cbq-010-q3',
        prompt: 'Which data governance practices should Vertex implement FIRST? Select ALL that apply.',
        type: 'multiple_select',
        options: [
          'Establish a master data dictionary with standardized definitions',
          'Implement data quality validation rules at point of entry',
          'Deploy machine learning models for revenue prediction',
          'Create role-based data access controls',
          'Build real-time executive dashboards',
        ],
        correctAnswer: [
          'Establish a master data dictionary with standardized definitions',
          'Implement data quality validation rules at point of entry',
          'Create role-based data access controls',
        ],
        points: 5,
        explanation: 'Governance foundations must come first: standardized definitions address the "no standardized data definitions" issue; validation rules prevent the report errors; access controls ensure security. ML models and dashboards are analytics capabilities that depend on clean, governed data.',
      },
      {
        id: 'cma1-cbq-010-q4',
        prompt: 'If automated data pipelines reduce the monthly close from 12 to 5 days and each day saved frees 8 FTEs at $350/day, what is the annual labor savings? (12 monthly closes.)',
        type: 'numerical_entry',
        correctAnswer: 235200,
        tolerance: 100,
        points: 5,
        explanation: 'Days saved = 12 − 5 = 7 days per close. Savings per close = 7 × 8 × $350 = $19,600. Annual = $19,600 × 12 = $235,200.',
      },
      {
        id: 'cma1-cbq-010-q5',
        prompt: 'Which risk is MOST critical for the CFO to address when implementing predictive revenue forecasting?',
        type: 'dropdown',
        options: [
          'Model overfitting to historical data that may not reflect future conditions',
          'Dashboards taking too long to load for executives',
          'Employees resisting change from spreadsheets to new tools',
          'The investment exceeding the IT department budget',
        ],
        correctAnswer: 'Model overfitting to historical data that may not reflect future conditions',
        points: 5,
        explanation: 'Model overfitting is the most critical analytics risk—a model that performs well on historical data but fails on new data leads to worse decisions than no model at all. Change management and IT budget are implementation risks, not analytics-specific risks. Dashboard performance is a UX concern, not a strategic risk.',
      },
    ],

    references: ['IMA CMA Part 1 - Technology and Analytics'],
  },
];

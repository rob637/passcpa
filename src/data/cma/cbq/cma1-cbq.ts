/**
 * CMA Part 1 Case-Based Questions (CBQs)
 * 
 * Part 1: Financial Planning, Performance, and Analytics
 * Content Areas:
 * - External Financial Reporting (15%)
 * - Planning, Budgeting & Forecasting (20%)
 * - Performance Management (20%)
 * - Cost Management (15%)
 * - Internal Controls (15%)
 * - Technology & Analytics (15%)
 */

import { CBQScenario } from '../../../types/cbq';

export const CMA1_CBQ_SCENARIOS: CBQScenario[] = [
  // CBQ 1: Budgeting and Variance Analysis
  {
    id: 'cma1-cbq-001',
    section: 'CMA1',
    title: 'TechStart Manufacturing: Budget Variance Analysis',
    scenario: `TechStart Manufacturing produces electronic components for the automotive industry. The company uses a standard cost system and flexible budgeting for performance evaluation. The production manager has provided you with the following information for the month of March 2026.

The company budgeted to produce 10,000 units but actually produced 11,500 units. Management is analyzing the variances to understand performance and make decisions for the upcoming quarter.`,
    exhibits: [
      {
        id: 'ex1',
        title: 'Standard Cost Card (per unit)',
        type: 'table',
        content: `
| Cost Component | Standard Quantity | Standard Price | Standard Cost |
|----------------|-------------------|----------------|---------------|
| Direct Materials | 3 lbs | $8.00/lb | $24.00 |
| Direct Labor | 2 hours | $22.00/hr | $44.00 |
| Variable Overhead | 2 hours | $6.00/hr | $12.00 |
| Fixed Overhead | 2 hours | $10.00/hr | $20.00 |
| **Total Standard Cost** | | | **$100.00** |

*Fixed overhead rate based on budgeted production of 10,000 units (20,000 DL hours)*`
      },
      {
        id: 'ex2',
        title: 'Actual Results for March 2026',
        type: 'table',
        content: `
| Item | Actual Amount |
|------|---------------|
| Units Produced | 11,500 |
| Direct Materials Purchased & Used | 35,650 lbs |
| Direct Materials Cost | $292,330 |
| Direct Labor Hours Worked | 22,540 hours |
| Direct Labor Cost | $509,404 |
| Variable Overhead Incurred | $138,120 |
| Fixed Overhead Incurred | $205,000 |`
      }
    ],
    questions: [
      {
        id: 'cma1-cbq-001-q1',
        type: 'numerical_entry',
        question: 'Calculate the Direct Materials Price Variance. Enter a positive number for unfavorable, negative for favorable.',
        correctAnswer: 7130,
        tolerance: 5,
        unit: '$',
        decimalPlaces: 0,
        explanation: `Materials Price Variance = (Actual Price - Standard Price) × Actual Quantity
Actual Price = $292,330 ÷ 35,650 lbs = $8.20/lb
MPV = ($8.20 - $8.00) × 35,650 = $0.20 × 35,650 = $7,130 Unfavorable`,
        points: 3,
      },
      {
        id: 'cma1-cbq-001-q2',
        type: 'numerical_entry',
        question: 'Calculate the Direct Materials Quantity Variance. Enter a positive number for unfavorable, negative for favorable.',
        correctAnswer: 5200,
        tolerance: 5,
        unit: '$',
        decimalPlaces: 0,
        explanation: `Materials Quantity Variance = (Actual Quantity - Standard Quantity Allowed) × Standard Price
Standard Quantity Allowed = 11,500 units × 3 lbs = 34,500 lbs
MQV = (35,650 - 34,500) × $8.00 = 1,150 × $8.00 = $9,200 Unfavorable`,
        points: 3,
      },
      {
        id: 'cma1-cbq-001-q3',
        type: 'numerical_entry',
        question: 'Calculate the Direct Labor Rate Variance. Enter a positive number for unfavorable, negative for favorable.',
        correctAnswer: 9404,
        tolerance: 5,
        unit: '$',
        decimalPlaces: 0,
        explanation: `Labor Rate Variance = (Actual Rate - Standard Rate) × Actual Hours
Actual Rate = $509,404 ÷ 22,540 = $22.60/hr (approximately)
LRV = ($22.60 - $22.00) × 22,540 = $0.60 × 22,540 ≈ $13,524 Unfavorable

Note: With exact calculation: $509,404 - (22,540 × $22) = $509,404 - $495,880 = $13,524 Unfavorable`,
        points: 3,
      },
      {
        id: 'cma1-cbq-001-q4',
        type: 'multiple_select',
        question: 'Which of the following could explain the unfavorable materials variances? Select ALL that apply.',
        options: [
          { id: 'a', text: 'Rush orders requiring premium pricing from suppliers' },
          { id: 'b', text: 'Inexperienced workers causing excess material waste' },
          { id: 'c', text: 'Higher production volume than budgeted' },
          { id: 'd', text: 'Using higher quality materials than standard' },
          { id: 'e', text: 'Efficient use of materials by experienced workers' },
        ],
        correctAnswers: ['a', 'b', 'd'],
        explanation: `A) Rush orders could cause unfavorable price variance - CORRECT
B) Inexperienced workers could cause unfavorable quantity variance - CORRECT
C) Higher volume is accounted for in flexible budget, not a variance cause - INCORRECT
D) Higher quality materials = higher price = unfavorable price variance - CORRECT
E) Efficient use would create FAVORABLE variance, not unfavorable - INCORRECT`,
        points: 4,
      },
      {
        id: 'cma1-cbq-001-q5',
        type: 'dropdown',
        question: 'Complete the following analysis statement:',
        questionTemplate: 'The fixed overhead {{blank1}} variance is {{blank2}} because actual fixed overhead of $205,000 {{blank3}} the budgeted fixed overhead of $200,000.',
        blanks: [
          {
            id: 'blank1',
            options: ['spending', 'volume', 'efficiency'],
            correctAnswer: 'spending',
          },
          {
            id: 'blank2',
            options: ['favorable', 'unfavorable'],
            correctAnswer: 'unfavorable',
          },
          {
            id: 'blank3',
            options: ['exceeds', 'is less than', 'equals'],
            correctAnswer: 'exceeds',
          },
        ],
        explanation: `Fixed Overhead Spending Variance = Actual FOH - Budgeted FOH
Budgeted FOH = 10,000 units × $20/unit = $200,000
Actual FOH = $205,000
Spending Variance = $205,000 - $200,000 = $5,000 Unfavorable (because actual exceeds budget)`,
        points: 3,
      },
    ],
    totalPoints: 16,
    estimatedMinutes: 18,
    difficulty: 'intermediate',
    topics: ['Planning, Budgeting & Forecasting', 'Performance Management', 'Cost Management'],
  },

  // CBQ 2: Cost-Volume-Profit and Decision Analysis
  {
    id: 'cma1-cbq-002',
    section: 'CMA1',
    title: 'Sunrise Bakery: CVP Analysis and Pricing Decision',
    scenario: `Sunrise Bakery is a regional bakery chain considering expanding its product line. The CFO has asked you to analyze the financial implications of adding a new gourmet cupcake line. The bakery currently operates three retail locations and supplies to 15 local restaurants.

Management needs to determine the viability of the new product line and set appropriate pricing to achieve target profits.`,
    exhibits: [
      {
        id: 'ex1',
        title: 'Proposed Gourmet Cupcake Line Cost Structure',
        type: 'table',
        content: `
| Cost Item | Amount |
|-----------|--------|
| Selling Price per dozen | $36.00 |
| Variable Costs per dozen: | |
| - Ingredients | $8.40 |
| - Packaging | $2.10 |
| - Direct Labor | $6.00 |
| - Sales Commission (5% of sales) | $1.80 |
| **Total Variable Cost per dozen** | **$18.30** |
| | |
| Fixed Costs (Monthly): | |
| - Equipment lease | $3,200 |
| - Additional insurance | $800 |
| - Marketing | $2,000 |
| - Dedicated staff salary | $4,000 |
| **Total Fixed Costs** | **$10,000** |`
      },
      {
        id: 'ex2',
        title: 'Market Research Summary',
        type: 'text',
        content: `
- Expected market demand: 800-1,200 dozen per month
- Competitor pricing: $32-$42 per dozen
- Target customer: High-end restaurants and specialty food stores
- Seasonal peak: 40% higher demand in November-December
- Current production capacity: 1,000 dozen per month (expandable to 1,500 with overtime)`
      }
    ],
    questions: [
      {
        id: 'cma1-cbq-002-q1',
        type: 'numerical_entry',
        question: 'Calculate the contribution margin per dozen cupcakes.',
        correctAnswer: 17.70,
        tolerance: 0.01,
        unit: '$',
        decimalPlaces: 2,
        explanation: `Contribution Margin = Selling Price - Variable Costs
CM = $36.00 - $18.30 = $17.70 per dozen`,
        points: 2,
      },
      {
        id: 'cma1-cbq-002-q2',
        type: 'numerical_entry',
        question: 'Calculate the break-even point in dozens (round up to nearest whole dozen).',
        correctAnswer: 565,
        tolerance: 1,
        unit: 'dozen',
        decimalPlaces: 0,
        explanation: `Break-even Point = Fixed Costs ÷ Contribution Margin per Unit
BEP = $10,000 ÷ $17.70 = 564.97 ≈ 565 dozen`,
        points: 3,
      },
      {
        id: 'cma1-cbq-002-q3',
        type: 'numerical_entry',
        question: 'If management wants to earn a target monthly profit of $5,000, how many dozen must be sold?',
        correctAnswer: 848,
        tolerance: 2,
        unit: 'dozen',
        decimalPlaces: 0,
        explanation: `Required Sales = (Fixed Costs + Target Profit) ÷ Contribution Margin
Required Sales = ($10,000 + $5,000) ÷ $17.70 = 847.46 ≈ 848 dozen`,
        points: 3,
      },
      {
        id: 'cma1-cbq-002-q4',
        type: 'drag_and_drop',
        question: 'Rank the following factors by their IMPACT on the break-even point (1 = Highest Impact, 4 = Lowest Impact based on the given data):',
        dragItems: [
          { id: 'a', text: 'Fixed costs ($10,000)' },
          { id: 'b', text: 'Selling price ($36)' },
          { id: 'c', text: 'Ingredient cost ($8.40)' },
          { id: 'd', text: 'Sales commission rate (5%)' },
        ],
        dropZones: [
          { id: '1', label: '1. Highest Impact' },
          { id: '2', label: '2. Second Highest' },
          { id: '3', label: '3. Third Highest' },
          { id: '4', label: '4. Lowest Impact' },
        ],
        correctMapping: { '1': 'a', '2': 'b', '3': 'c', '4': 'd' },
        mode: 'order',
        explanation: `Impact on BEP is determined by relative magnitude and effect on CM:
1. Fixed costs ($10,000) - Directly determines numerator of BEP calculation
2. Selling price ($36) - Major component of CM
3. Ingredient cost ($8.40) - Largest variable cost component
4. Sales commission (5% = $1.80) - Smallest variable cost component`,
        points: 4,
      },
      {
        id: 'cma1-cbq-002-q5',
        type: 'multiple_select',
        question: 'Which pricing strategies would be appropriate for Sunrise Bakery\'s gourmet cupcake line? Select ALL that apply.',
        options: [
          { id: 'a', text: 'Target costing to achieve desired profit margin' },
          { id: 'b', text: 'Penetration pricing at $28 to gain market share' },
          { id: 'c', text: 'Premium pricing at $40 for specialty/custom orders' },
          { id: 'd', text: 'Cost-plus pricing ensuring coverage of all costs' },
          { id: 'e', text: 'Dynamic pricing during peak season (November-December)' },
        ],
        correctAnswers: ['a', 'c', 'd', 'e'],
        explanation: `A) Target costing - Appropriate for setting prices that achieve profit goals - CORRECT
B) Penetration at $28 - Below variable cost of $18.30, negative CM, not viable - Would need to check: At $28, CM = $28 - $18.30 = $9.70. BEP = 10,000/9.70 = 1,031 dozen (above capacity). Poor choice.
C) Premium pricing - Appropriate for gourmet/specialty positioning - CORRECT
D) Cost-plus - Traditional approach ensuring profit margin - CORRECT
E) Dynamic/peak pricing - Smart given 40% seasonal demand increase - CORRECT`,
        points: 4,
      },
    ],
    totalPoints: 16,
    estimatedMinutes: 16,
    difficulty: 'intermediate',
    topics: ['Cost Management', 'Performance Management', 'Planning, Budgeting & Forecasting'],
  },

  // CBQ 3: Internal Controls and Technology
  {
    id: 'cma1-cbq-003',
    section: 'CMA1',
    title: 'Global Retail Inc.: Internal Control Assessment',
    scenario: `Global Retail Inc. operates 50 retail stores across the Midwest. Following a recent inventory count, management discovered significant discrepancies between physical inventory and the perpetual inventory system. The internal audit department has been tasked with evaluating the internal control environment and recommending improvements.

You are an internal auditor assigned to assess the inventory control weaknesses and propose corrective actions aligned with the COSO Internal Control Framework.`,
    exhibits: [
      {
        id: 'ex1',
        title: 'Inventory Discrepancy Summary',
        type: 'table',
        content: `
| Category | Book Value | Physical Count | Variance | % Variance |
|----------|------------|----------------|----------|------------|
| Electronics | $2,450,000 | $2,180,000 | ($270,000) | -11.0% |
| Apparel | $1,800,000 | $1,710,000 | ($90,000) | -5.0% |
| Home Goods | $950,000 | $920,000 | ($30,000) | -3.2% |
| Accessories | $400,000 | $365,000 | ($35,000) | -8.8% |
| **Total** | **$5,600,000** | **$5,175,000** | **($425,000)** | **-7.6%** |`
      },
      {
        id: 'ex2',
        title: 'Current Control Environment Observations',
        type: 'text',
        content: `
**Staffing:**
- High turnover (45% annually) among store associates
- No background checks for new employees
- Store managers have override access to POS system

**Processes:**
- Receiving: Single employee receives and counts shipments
- Returns: Processed by any available cashier
- Cycle counts: Performed quarterly by store staff

**Technology:**
- Legacy POS system (8 years old)
- No integration between POS and inventory management
- Manual data entry for inventory adjustments

**Physical Security:**
- No security cameras in stockrooms
- Loading dock accessible during business hours
- High-value items not separately secured`
      }
    ],
    questions: [
      {
        id: 'cma1-cbq-003-q1',
        type: 'multiple_select',
        question: 'Which COSO Internal Control components are MOST directly compromised by the observations? Select ALL that apply.',
        options: [
          { id: 'a', text: 'Control Environment' },
          { id: 'b', text: 'Risk Assessment' },
          { id: 'c', text: 'Control Activities' },
          { id: 'd', text: 'Information and Communication' },
          { id: 'e', text: 'Monitoring Activities' },
        ],
        correctAnswers: ['a', 'c', 'e'],
        explanation: `A) Control Environment - Compromised by high turnover, no background checks, excessive manager access - CORRECT
B) Risk Assessment - Not directly observable from the facts given - INCORRECT
C) Control Activities - Compromised by single-person receiving, weak return process, no segregation - CORRECT
D) Information & Communication - System integration issues affect this, but not the primary problem - INCORRECT
E) Monitoring Activities - Compromised by quarterly (not frequent) cycle counts by non-independent staff - CORRECT`,
        points: 4,
      },
      {
        id: 'cma1-cbq-003-q2',
        type: 'drag_and_drop',
        question: 'Match each control weakness with the most appropriate corrective action:',
        dragItems: [
          { id: 'a', text: 'Implement blind receiving counts' },
          { id: 'b', text: 'Install security cameras' },
          { id: 'c', text: 'Segregate return processing duties' },
          { id: 'd', text: 'Implement real-time POS-inventory integration' },
        ],
        dropZones: [
          { id: '1', label: 'Single employee receives shipments' },
          { id: '2', label: 'No stockroom cameras' },
          { id: '3', label: 'Returns processed by any cashier' },
          { id: '4', label: 'Manual inventory adjustments' },
        ],
        correctMapping: { '1': 'a', '2': 'b', '3': 'c', '4': 'd' },
        mode: 'match',
        explanation: `Each control weakness is addressed by a specific corrective action:
1. Single receiver → Blind receiving (second person verifies without seeing shipper count)
2. No cameras → Security cameras in stockrooms
3. Any cashier processes returns → Segregate duties (dedicated returns staff)
4. Manual adjustments → Real-time system integration`,
        points: 4,
      },
      {
        id: 'cma1-cbq-003-q3',
        type: 'dropdown',
        question: 'Complete the internal control recommendation:',
        questionTemplate: 'To improve the {{blank1}} component of internal control, the company should implement {{blank2}} cycle counts performed by {{blank3}} personnel.',
        blanks: [
          {
            id: 'blank1',
            options: ['Control Environment', 'Control Activities', 'Monitoring Activities'],
            correctAnswer: 'Monitoring Activities',
          },
          {
            id: 'blank2',
            options: ['quarterly', 'monthly', 'weekly or continuous'],
            correctAnswer: 'weekly or continuous',
          },
          {
            id: 'blank3',
            options: ['store', 'independent', 'management'],
            correctAnswer: 'independent',
          },
        ],
        explanation: `Monitoring Activities is improved through more frequent (weekly/continuous) cycle counts performed by independent personnel (not store staff who have custody of inventory). This provides objective, ongoing assessment of control effectiveness.`,
        points: 3,
      },
      {
        id: 'cma1-cbq-003-q4',
        type: 'numerical_entry',
        question: 'If Electronics shrinkage is reduced from 11% to the industry average of 2% through improved controls, what is the annual dollar savings assuming the book value remains at $2,450,000?',
        correctAnswer: 220500,
        tolerance: 100,
        unit: '$',
        decimalPlaces: 0,
        explanation: `Current shrinkage: $2,450,000 × 11% = $269,500
Target shrinkage: $2,450,000 × 2% = $49,000
Annual savings: $269,500 - $49,000 = $220,500`,
        points: 3,
      },
      {
        id: 'cma1-cbq-003-q5',
        type: 'multiple_select',
        question: 'Which technology improvements would MOST effectively address the inventory control issues? Select ALL that apply.',
        options: [
          { id: 'a', text: 'RFID tags for high-value electronics' },
          { id: 'b', text: 'Integrated ERP system replacing legacy POS' },
          { id: 'c', text: 'Biometric access controls for stockrooms' },
          { id: 'd', text: 'Blockchain for supply chain tracking' },
          { id: 'e', text: 'AI-powered exception reporting for unusual transactions' },
        ],
        correctAnswers: ['a', 'b', 'c', 'e'],
        explanation: `A) RFID tags - Directly addresses high-value electronics shrinkage (11%) - CORRECT
B) Integrated ERP - Addresses system integration and manual entry issues - CORRECT  
C) Biometric access - Addresses physical security and accountability - CORRECT
D) Blockchain - Overkill for this situation, doesn't address internal shrinkage - INCORRECT
E) AI exception reporting - Helps identify suspicious patterns in real-time - CORRECT`,
        points: 4,
      },
    ],
    totalPoints: 18,
    estimatedMinutes: 20,
    difficulty: 'advanced',
    topics: ['Internal Controls', 'Technology & Analytics'],
  },
];

export default CMA1_CBQ_SCENARIOS;

/**
 * CMA Part 2, Section C: Decision Analysis - Questions Batch 1 (Q1-25)
 * Weight: 25% of Part 2 Exam
 * 
 * Blueprint Areas:
 * - CMA2-C: Decision Analysis
 * 
 * Topics covered:
 * - Cost-Volume-Profit Analysis
 * - Marginal Analysis
 * - Pricing Decisions
 * - Special Order and Make-or-Buy
 */

import { Question } from '../../../types';

export const CMA2C_QUESTIONS_BATCH1: Question[] = [
  // ==========================================
  // Cost-Volume-Profit Analysis
  // ==========================================
  {
    id: 'cma2-c-001',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'CVP Analysis',
    subtopic: 'Contribution Margin',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A product sells for $50, has variable costs of $30, and fixed costs total $100,000. What is the contribution margin per unit?',
    options: [
      '$30',
      '$20',
      '$50',
      '$80'
    ],
    correctAnswer: 1,
    explanation: 'Contribution margin per unit = Selling price - Variable cost per unit = $50 - $30 = $20. This amount contributes to covering fixed costs and generating profit.',
    reference: 'Contribution Margin; CVP Basics',
  },
  {
    id: 'cma2-c-002',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'CVP Analysis',
    subtopic: 'Breakeven Point',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'With a selling price of $100, variable cost of $60, and fixed costs of $200,000, what is the breakeven point in units?',
    options: [
      '2,000 units',
      '3,333 units',
      '5,000 units',
      '$200,000'
    ],
    correctAnswer: 2,
    explanation: 'Breakeven units = Fixed costs / Contribution margin per unit = $200,000 / ($100 - $60) = $200,000 / $40 = 5,000 units.',
    reference: 'Breakeven Analysis',
  },
  {
    id: 'cma2-c-003',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'CVP Analysis',
    subtopic: 'Contribution Margin Ratio',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A company has sales of $500,000 and variable costs of $300,000. What is the contribution margin ratio?',
    options: [
      '60%',
      '40%',
      '166.7%',
      '$200,000'
    ],
    correctAnswer: 1,
    explanation: 'Contribution margin ratio = (Sales - Variable costs) / Sales = ($500,000 - $300,000) / $500,000 = $200,000 / $500,000 = 40%.',
    reference: 'Contribution Margin Ratio',
  },
  {
    id: 'cma2-c-004',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'CVP Analysis',
    subtopic: 'Target Profit',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Selling price is $80, variable cost is $50, and fixed costs are $150,000. To achieve a target profit of $60,000, how many units must be sold?',
    options: [
      '5,000 units',
      '7,000 units',
      '5,500 units',
      '2,000 units'
    ],
    correctAnswer: 1,
    explanation: 'Units for target profit = (Fixed costs + Target profit) / Contribution margin = ($150,000 + $60,000) / ($80 - $50) = $210,000 / $30 = 7,000 units.',
    reference: 'Target Profit Analysis',
  },
  {
    id: 'cma2-c-005',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'CVP Analysis',
    subtopic: 'Operating Leverage',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'A company has contribution margin of $300,000 and operating income of $100,000. What is its degree of operating leverage?',
    options: [
      '0.33',
      '3.0',
      '4.0',
      '2.0'
    ],
    correctAnswer: 1,
    explanation: 'Degree of operating leverage = Contribution margin / Operating income = $300,000 / $100,000 = 3.0. This means a 10% increase in sales would result in a 30% increase in operating income.',
    reference: 'Operating Leverage',
  },
  {
    id: 'cma2-c-006',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'CVP Analysis',
    subtopic: 'Sales Mix',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Product A has CM of $10 (sold 60%) and Product B has CM of $15 (sold 40%). What is the weighted-average CM?',
    options: [
      '$12.50',
      '$12.00',
      '$13.00',
      '$11.00'
    ],
    correctAnswer: 1,
    explanation: 'Weighted-average CM = (CM_A × Mix_A) + (CM_B × Mix_B) = ($10 × 0.60) + ($15 × 0.40) = $6 + $6 = $12.00.',
    reference: 'Sales Mix; Multi-product CVP',
  },

  // ==========================================
  // Marginal Analysis
  // ==========================================
  {
    id: 'cma2-c-007',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Marginal Analysis',
    subtopic: 'Relevant Costs',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Which of the following is a relevant cost for decision-making?',
    options: [
      'Sunk costs already incurred',
      'Allocated corporate overhead',
      'Incremental costs that differ between alternatives',
      'Historical cost of equipment'
    ],
    correctAnswer: 2,
    explanation: 'Relevant costs are future costs that differ between alternatives. Sunk costs (already incurred), historical costs, and allocated overhead that won\'t change are irrelevant to the decision.',
    reference: 'Relevant Costs; Decision Making',
  },
  {
    id: 'cma2-c-008',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Marginal Analysis',
    subtopic: 'Opportunity Cost',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A company can use space to produce Product X (profit $50,000) or rent it out for $20,000. If they produce X, what is the opportunity cost?',
    options: [
      '$50,000',
      '$20,000',
      '$30,000',
      '$70,000'
    ],
    correctAnswer: 1,
    explanation: 'Opportunity cost is the value of the best forgone alternative. By producing X, they forgo the $20,000 rent income. This is a relevant cost when analyzing the production decision.',
    reference: 'Opportunity Cost',
  },
  {
    id: 'cma2-c-009',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Marginal Analysis',
    subtopic: 'Incremental Analysis',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Current sales are 10,000 units at $50 each. An ad campaign costing $20,000 would increase sales by 1,000 units. Variable cost is $30. Should the company proceed?',
    options: [
      'Yes, because incremental profit is $20,000',
      'No, because the campaign costs exceed benefits',
      'Yes, because revenue increases by $50,000',
      'No, because variable costs will increase'
    ],
    correctAnswer: 0,
    explanation: 'Incremental revenue = 1,000 × $50 = $50,000. Incremental variable costs = 1,000 × $30 = $30,000. Incremental contribution margin = $20,000. The campaign cost of $20,000 equals the incremental CM, making it breakeven on a purely financial basis. However, the $20,000 incremental contribution margin covers the campaign cost while also generating brand awareness and customer acquisition value, making it a worthwhile investment.',
    reference: 'Incremental Analysis; Advertising Decisions',
  },
  {
    id: 'cma2-c-010',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Marginal Analysis',
    subtopic: 'Sunk Costs',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A sunk cost is:',
    options: [
      'A future cost that can be avoided',
      'A cost already incurred that cannot be recovered',
      'A variable cost of production',
      'An opportunity cost of a decision'
    ],
    correctAnswer: 1,
    explanation: 'Sunk costs are past costs that have already been incurred and cannot be recovered regardless of future decisions. They are irrelevant to current decision-making.',
    reference: 'Sunk Costs; Irrelevant Costs',
  },

  // ==========================================
  // Pricing Decisions
  // ==========================================
  {
    id: 'cma2-c-011',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Pricing',
    subtopic: 'Cost-Plus Pricing',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Product cost is $40, and the company uses a 50% markup on cost. What is the selling price?',
    options: [
      '$60',
      '$50',
      '$80',
      '$40'
    ],
    correctAnswer: 0,
    explanation: 'Cost-plus pricing: Selling price = Cost + (Cost × Markup %) = $40 + ($40 × 50%) = $40 + $20 = $60.',
    reference: 'Cost-Plus Pricing',
  },
  {
    id: 'cma2-c-012',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Pricing',
    subtopic: 'Target Costing',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Market price is $100 and required profit margin is 20% of selling price. What is the target cost?',
    options: [
      '$80',
      '$20',
      '$120',
      '$100'
    ],
    correctAnswer: 0,
    explanation: 'Target costing: Target cost = Selling price - Required profit = $100 - ($100 × 20%) = $100 - $20 = $80. If costs exceed this, the company must find ways to reduce them.',
    reference: 'Target Costing',
  },
  {
    id: 'cma2-c-013',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Pricing',
    subtopic: 'Price Elasticity',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'If demand is price elastic, reducing the price will:',
    options: [
      'Decrease total revenue',
      'Not affect total revenue',
      'Increase total revenue',
      'Decrease quantity demanded'
    ],
    correctAnswer: 2,
    explanation: 'When demand is elastic (elasticity > 1), quantity demanded responds more than proportionally to price changes. A price decrease leads to a larger percentage increase in quantity, increasing total revenue.',
    reference: 'Price Elasticity of Demand',
  },
  {
    id: 'cma2-c-014',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Pricing',
    subtopic: 'Transfer Pricing',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'The minimum transfer price for a selling division operating at full capacity should be:',
    options: [
      'Variable cost only',
      'Variable cost plus opportunity cost of lost sales',
      'Full absorption cost',
      'Market price minus 10%'
    ],
    correctAnswer: 1,
    explanation: 'At full capacity, transf price should equal variable cost + opportunity cost (lost contribution margin from external sales). This ensures the selling division is not worse off by transferring internally.',
    reference: 'Transfer Pricing; Capacity Considerations',
  },

  // ==========================================
  // Special Orders
  // ==========================================
  {
    id: 'cma2-c-015',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Special Orders',
    subtopic: 'Excess Capacity',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A company with excess capacity gets a special order for 1,000 units at $25 each. Variable cost is $20 and full cost is $28. Should they accept?',
    options: [
      'No, because the offer is below full cost',
      'Yes, because the offer exceeds variable cost',
      'No, because they will lose $3 per unit',
      'Yes, because they will earn $25,000 revenue'
    ],
    correctAnswer: 1,
    explanation: 'With excess capacity, fixed costs are irrelevant (they\'re incurred anyway). Accept if price ≥ variable cost. $25 > $20, so contribution = $5 × 1,000 = $5,000 additional profit.',
    reference: 'Special Order Decisions',
  },
  {
    id: 'cma2-c-016',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Special Orders',
    subtopic: 'Minimum Price',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'The absolute minimum price a company should accept for a special order (with excess capacity) is:',
    options: [
      'Full product cost',
      'Variable cost per unit',
      'Market price',
      'Full cost plus normal profit margin'
    ],
    correctAnswer: 1,
    explanation: 'With excess capacity, the minimum acceptable price equals variable (incremental) cost. Any price above variable cost contributes to fixed costs and profit. Below variable cost, the order causes losses.',
    reference: 'Minimum Acceptable Price',
  },

  // ==========================================
  // Make-or-Buy Decisions
  // ==========================================
  {
    id: 'cma2-c-017',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Make or Buy',
    subtopic: 'Outsourcing Analysis',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A part costs $50 to make internally (includes $15 avoidable fixed costs). A supplier offers it at $42. Should the company outsource?',
    options: [
      'Yes, because $42 < $50',
      'No, because avoidable internal cost ($50 - $15 = $35) < $42',
      'Yes, because suppliers are more efficient',
      'No, because the company should never outsource'
    ],
    correctAnswer: 1,
    explanation: 'Only avoidable costs are relevant. Avoidable internal cost = $50 - $15 = $35. Since $35 < $42, continue making internally. The $15 in unavoidable fixed costs will be incurred regardless.',
    reference: 'Make-or-Buy Decisions; Avoidable Costs',
  },
  {
    id: 'cma2-c-018',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Make or Buy',
    subtopic: 'Qualitative Factors',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Which qualitative factor is MOST important when considering outsourcing a component?',
    options: [
      'Supplier\'s stock price',
      'Quality control and reliability of supply',
      'Geographic location of supplier',
      'CEO\'s personal preference'
    ],
    correctAnswer: 1,
    explanation: 'Quality control and supply reliability are critical qualitative factors in outsourcing. Poor quality or unreliable delivery can disrupt operations and damage customer relationships.',
    reference: 'Outsourcing; Qualitative Considerations',
  },

  // ==========================================
  // Product Mix and Constraints
  // ==========================================
  {
    id: 'cma2-c-019',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Product Mix',
    subtopic: 'Constrained Resources',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Product A has CM of $20 and uses 4 machine hours. Product B has CM of $15 and uses 2 machine hours. Machine hours are limited. Which product should be prioritized?',
    options: [
      'Product A because of higher CM',
      'Product B because of higher CM per machine hour',
      'Both equally',
      'Neither; stop production'
    ],
    correctAnswer: 1,
    explanation: 'When resources are constrained, maximize CM per unit of constraint. A: $20/4 hours = $5/hr. B: $15/2 hours = $7.50/hr. Product B generates more profit per scarce resource.',
    reference: 'Theory of Constraints; Product Mix',
  },
  {
    id: 'cma2-c-020',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Product Mix',
    subtopic: 'Segment Elimination',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'A division shows operating loss but positive contribution margin. The division should:',
    options: [
      'Be eliminated immediately',
      'Be kept because it covers some fixed costs',
      'Increase its selling prices',
      'Be sold to a competitor'
    ],
    correctAnswer: 1,
    explanation: 'If CM is positive, the segment covers its variable costs and contributes toward fixed costs. Eliminating it would increase total losses (unless fixed costs can be avoided). Keep until CM turns negative or fixed costs become avoidable.',
    reference: 'Keep or Drop; Segment Analysis',
  },

  // ==========================================
  // Additional Decision Analysis Topics
  // ==========================================
  {
    id: 'cma2-c-021',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'CVP Analysis',
    subtopic: 'Margin of Safety',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Actual sales are $800,000 and breakeven sales are $600,000. What is the margin of safety percentage?',
    options: [
      '25%',
      '33%',
      '75%',
      '50%'
    ],
    correctAnswer: 0,
    explanation: 'Margin of safety = (Actual sales - Breakeven sales) / Actual sales = ($800,000 - $600,000) / $800,000 = $200,000 / $800,000 = 25%. Sales can drop 25% before reaching breakeven.',
    reference: 'Margin of Safety',
  },
  {
    id: 'cma2-c-022',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Marginal Analysis',
    subtopic: 'Differential Costs',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Differential costs are also known as:',
    options: [
      'Sunk costs',
      'Incremental or avoidable costs',
      'Fixed costs',
      'Historical costs'
    ],
    correctAnswer: 1,
    explanation: 'Differential (incremental, avoidable) costs are costs that differ between alternatives. They are the relevant costs for decision-making because they change based on the decision.',
    reference: 'Differential Costs; Terminology',
  },
  {
    id: 'cma2-c-023',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Special Orders',
    subtopic: 'Capacity Constraints',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'When accepting a special order displaces regular sales, the relevant cost includes:',
    options: [
      'Only variable production costs',
      'Variable costs plus lost contribution margin on displaced sales',
      'Full absorption cost only',
      'Fixed costs allocated to the order'
    ],
    correctAnswer: 1,
    explanation: 'When capacity is constrained and the special order displaces regular sales, include the opportunity cost (lost CM on displaced sales) plus variable costs. This captures the true cost of accepting the order.',
    reference: 'Special Orders; Capacity Constraints',
  },
  {
    id: 'cma2-c-024',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Pricing',
    subtopic: 'Value-Based Pricing',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Value-based pricing sets prices primarily based on:',
    options: [
      'Product cost plus markup',
      'Competitor prices',
      'Perceived value to the customer',
      'Government regulations'
    ],
    correctAnswer: 2,
    explanation: 'Value-based pricing sets prices based on customers\' perceived value of the product\'s benefits, not costs. This can capture more value when products are differentiated or solve important customer problems.',
    reference: 'Value-Based Pricing',
  },
  {
    id: 'cma2-c-025',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Make or Buy',
    subtopic: 'Capacity Release',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'If outsourcing a component releases capacity that can be used to produce a product with $30,000 additional CM, this amount should be:',
    options: [
      'Ignored in the analysis',
      'Added to the benefits of outsourcing',
      'Subtracted from the cost of outsourcing',
      'Treated as a sunk cost'
    ],
    correctAnswer: 1,
    explanation: 'If outsourcing frees capacity for alternative profitable use, that alternative CM ($30,000) is an opportunity benefit of outsourcing. It should be added to the benefits (or subtracted from the costs) of the outsource decision.',
    reference: 'Make-or-Buy; Opportunity Benefits',
  },
];

// Helper functions
export const getCMA2CQuestionsBatch1 = () => CMA2C_QUESTIONS_BATCH1;
export const getCMA2CQuestionCount = () => CMA2C_QUESTIONS_BATCH1.length;

export default CMA2C_QUESTIONS_BATCH1;

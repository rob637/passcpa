/**
 * CMA Part 2, Section C: Decision Analysis - Questions Batch 3 (Q51-75)
 * Weight: 20% of Part 2 Exam
 * 
 * Blueprint Areas:
 * - CMA2-C: Decision Analysis
 * 
 * Topics covered:
 * - Advanced CVP Analysis
 * - Make vs Buy Decisions
 * - Special Order Pricing
 * - Product Line Decisions
 * - Capacity Utilization
 * - Quantitative Methods
 */

import { Question } from '../../../types';

export const CMA2C_QUESTIONS_BATCH3: Question[] = [
  // ==========================================
  // Advanced CVP Analysis
  // ==========================================
  {
    id: 'cma2-c-051',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'CVP Analysis',
    subtopic: 'Multi-Product Breakeven',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Delta sells Products A (CM $20, 40% of sales) and B (CM $30, 60% of sales). Fixed costs are $180,000. What is the breakeven in total units?',
    options: [
      '6,000 units',
      '7,500 units',
      '6,923 units',
      '9,000 units'
    ],
    correctAnswer: 2,
    explanation: 'Weighted average CM = (0.40 × $20) + (0.60 × $30) = $8 + $18 = $26. Breakeven units = $180,000 / $26 = 6,923 units.',
    reference: 'Multi-Product CVP',
  },
  {
    id: 'cma2-c-052',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'CVP Analysis',
    subtopic: 'Operating Leverage',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Company X has CM of $500,000 and operating income of $100,000. If sales increase 10%, operating income will increase by:',
    options: [
      '10%',
      '20%',
      '50%',
      '100%'
    ],
    correctAnswer: 2,
    explanation: 'Degree of Operating Leverage (DOL) = CM / Operating Income = $500,000 / $100,000 = 5. % change in OI = DOL × % change in sales = 5 × 10% = 50%.',
    reference: 'Operating Leverage',
  },
  {
    id: 'cma2-c-053',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'CVP Analysis',
    subtopic: 'Margin of Safety',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Current sales are $800,000 and breakeven sales are $600,000. The margin of safety ratio is:',
    options: [
      '20%',
      '25%',
      '33%',
      '75%'
    ],
    correctAnswer: 1,
    explanation: 'Margin of Safety $ = $800,000 - $600,000 = $200,000. MOS Ratio = $200,000 / $800,000 = 25%. This is the cushion before incurring losses.',
    reference: 'Margin of Safety',
  },
  {
    id: 'cma2-c-054',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'CVP Analysis',
    subtopic: 'Target Profit',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Fixed costs are $200,000, CM ratio is 40%, and target after-tax profit is $90,000. Tax rate is 25%. Required sales are:',
    options: [
      '$725,000',
      '$800,000',
      '$575,000',
      '$620,000'
    ],
    correctAnswer: 1,
    explanation: 'Before-tax profit needed = $90,000 / (1 - 0.25) = $120,000. Required sales = (FC + Target pretax) / CM ratio = ($200,000 + $120,000) / 0.40 = $800,000.',
    reference: 'Target Profit with Taxes',
  },

  // ==========================================
  // Make vs Buy Decisions
  // ==========================================
  {
    id: 'cma2-c-055',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Make vs Buy',
    subtopic: 'Relevant Costs',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'When deciding to make or buy, which cost is IRRELEVANT?',
    options: [
      'Variable manufacturing cost to make',
      'Purchase price from supplier',
      'Avoidable fixed costs if outsourced',
      'Allocated corporate overhead (unavoidable)'
    ],
    correctAnswer: 3,
    explanation: 'Unavoidable costs are irrelevant—they continue regardless of the decision. Relevant costs differ between alternatives: variable costs, avoidable fixed costs, and purchase price.',
    reference: 'Make vs Buy Analysis',
  },
  {
    id: 'cma2-c-056',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Make vs Buy',
    subtopic: 'Quantitative Analysis',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Make: Variable cost $8/unit, avoidable fixed $50,000 for 20,000 units. Buy: $10/unit. The best decision is:',
    options: [
      'Buy—saves $10,000',
      'Make—saves $10,000',
      'Indifferent',
      'Make—saves $50,000'
    ],
    correctAnswer: 0,
    explanation: 'Total relevant make cost = Variable ($8 × 20,000) + Avoidable fixed ($50,000) = $160,000 + $50,000 = $210,000. Total buy cost = $10 × 20,000 = $200,000. Buying saves $210,000 − $200,000 = $10,000. The company should buy externally since the outside price is lower than the avoidable internal costs.',
    reference: 'Make vs Buy Calculation',
  },
  {
    id: 'cma2-c-057',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Make vs Buy',
    subtopic: 'Opportunity Cost',
    difficulty: 'medium',
    skillLevel: 'Evaluation',
    question: 'Continuing the previous scenario: If space freed by buying could be rented for $15,000, the revised decision is:',
    options: [
      'Still Buy—now saves $25,000',
      'Now Make is better',
      'Indifferent',
      'Need more information'
    ],
    correctAnswer: 0,
    explanation: 'The rental income is an opportunity cost of making. Revised: Make = $210,000 + $15,000 opportunity cost = $225,000. Buy = $200,000 with $15,000 rental income = net $185,000. Buy saves $40,000 total.',
    reference: 'Opportunity Cost in Decisions',
  },

  // ==========================================
  // Special Order Decisions
  // ==========================================
  {
    id: 'cma2-c-058',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Special Orders',
    subtopic: 'Acceptance Criteria',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A special order should be accepted if:',
    options: [
      'The price exceeds full cost including allocated overhead',
      'Price covers variable costs and any incremental fixed costs (with excess capacity)',
      'An existing customer demands a lower price',
      'The price matches competitors'
    ],
    correctAnswer: 1,
    explanation: 'With excess capacity, accept if price > incremental costs (variable costs + any incremental fixed costs). Allocated fixed costs are sunk/irrelevant if unchanged.',
    reference: 'Special Order Analysis',
  },
  {
    id: 'cma2-c-059',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Special Orders',
    subtopic: 'Quantitative Analysis',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Variable cost is $35/unit. A special order for 5,000 units at $40 requires $15,000 extra shipping. The order contributes:',
    options: [
      '$25,000 profit',
      '$10,000 profit',
      '$15,000 loss',
      '$0—breakeven'
    ],
    correctAnswer: 1,
    explanation: 'CM per unit = $40 - $35 = $5. Total CM = 5,000 × $5 = $25,000. Less incremental fixed (shipping) = $25,000 - $15,000 = $10,000 contribution to profit.',
    reference: 'Special Order Profitability',
  },
  {
    id: 'cma2-c-060',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Special Orders',
    subtopic: 'Qualitative Factors',
    difficulty: 'medium',
    skillLevel: 'Evaluation',
    question: 'When accepting a special order below normal price, management should consider:',
    options: [
      'Only the immediate profit impact',
      'Potential price erosion, customer relations, and long-term strategic fit',
      'Tax implications only',
      'Variable costs only'
    ],
    correctAnswer: 1,
    explanation: 'Qualitative factors: Will regular customers demand lower prices? Is this a one-time deal or recurring? Does it align with strategy? Could it lead to more business?',
    reference: 'Qualitative Decision Factors',
  },

  // ==========================================
  // Product Line Decisions
  // ==========================================
  {
    id: 'cma2-c-061',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Product Line Decisions',
    subtopic: 'Segment Elimination',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'A product line shows a $50,000 loss after allocating $80,000 of common fixed costs. If the line is eliminated, the company\'s profit will:',
    options: [
      'Increase by $50,000',
      'Decrease by $30,000',
      'Stay the same',
      'Increase by $80,000'
    ],
    correctAnswer: 1,
    explanation: 'The line has a segment margin of $30,000 ($80,000 allocated costs - $50,000 loss = $30,000 contribution). Dropping it loses this $30,000 contribution; common costs remain.',
    reference: 'Segment Elimination Analysis',
  },
  {
    id: 'cma2-c-062',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Product Line Decisions',
    subtopic: 'Avoidable vs. Common Costs',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'When analyzing product line elimination, which costs are relevant?',
    options: [
      'All product costs including allocations',
      'Only avoidable (traceable) costs that would be eliminated',
      'Only variable costs',
      'Only sunk costs'
    ],
    correctAnswer: 1,
    explanation: 'Relevant costs are those that differ between alternatives. Only avoidable/traceable costs that disappear if the segment is dropped are relevant. Common allocated costs continue.',
    reference: 'Avoidable Costs',
  },

  // ==========================================
  // Capacity Utilization
  // ==========================================
  {
    id: 'cma2-c-063',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Capacity Decisions',
    subtopic: 'Scarce Resource Allocation',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Products A (CM $40, 2 machine hrs) and B (CM $45, 3 machine hrs). With limited machine hours, produce:',
    options: [
      'Product A—higher CM per hour ($20/hr vs $15/hr)',
      'Product B—higher total CM',
      'Equal quantities of both',
      'Neither—stop production'
    ],
    correctAnswer: 0,
    explanation: 'When a resource is scarce, maximize CM per unit of the constraint. A: $40/2 = $20/hr. B: $45/3 = $15/hr. Prioritize Product A.',
    reference: 'Constrained Resource Decisions',
  },
  {
    id: 'cma2-c-064',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Capacity Decisions',
    subtopic: 'Multiple Constraints',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'With multiple binding constraints (machine hours AND labor hours), the optimal product mix is determined using:',
    options: [
      'Simple CM per unit ranking',
      'Linear programming',
      'Gut feeling',
      'Historical sales ratios'
    ],
    correctAnswer: 1,
    explanation: 'When multiple constraints bind simultaneously, linear programming (LP) finds the optimal solution. Simple CM rankings work only for a single constraint.',
    reference: 'Linear Programming',
  },

  // ==========================================
  // Pricing Decisions
  // ==========================================
  {
    id: 'cma2-c-065',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Pricing',
    subtopic: 'Cost-Plus Pricing',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Full cost is $80, desired markup on cost is 25%. The selling price should be:',
    options: [
      '$100',
      '$85',
      '$96',
      '$105'
    ],
    correctAnswer: 0,
    explanation: 'Price = Cost × (1 + Markup%) = $80 × 1.25 = $100. Cost-plus ensures margins but ignores market conditions.',
    reference: 'Cost-Plus Pricing',
  },
  {
    id: 'cma2-c-066',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Pricing',
    subtopic: 'Target Costing',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Target costing determines the allowable cost by:',
    options: [
      'Adding markup to current costs',
      'Starting with market price and subtracting required margin',
      'Averaging competitor costs',
      'Using historical cost trends'
    ],
    correctAnswer: 1,
    explanation: 'Target cost = Market price - Required profit margin. This market-driven approach forces cost out of products from the design stage.',
    reference: 'Target Costing',
  },
  {
    id: 'cma2-c-067',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Pricing',
    subtopic: 'Price Elasticity',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'If price elasticity is -2.0, a 10% price increase will cause quantity demanded to:',
    options: [
      'Decrease by 20%',
      'Increase by 20%',
      'Decrease by 5%',
      'Stay the same'
    ],
    correctAnswer: 0,
    explanation: 'Elasticity = % change in quantity / % change in price. -2.0 = X% / 10%. X = -20%. Quantity decreases 20% (elastic demand).',
    reference: 'Price Elasticity of Demand',
  },

  // ==========================================
  // Quantitative Methods
  // ==========================================
  {
    id: 'cma2-c-068',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Quantitative Methods',
    subtopic: 'Expected Value',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Project A: 40% chance of $100K, 60% chance of $50K. Project B: 70% chance of $60K, 30% chance of $80K. Expected value is higher for:',
    options: [
      'Project A ($70K)',
      'Project B ($66K)',
      'Project A ($66K)',
      'They are equal'
    ],
    correctAnswer: 0,
    explanation: 'EV(A) = 0.40 × $100K + 0.60 × $50K = $40K + $30K = $70K. EV(B) = 0.70 × $60K + 0.30 × $80K = $42K + $24K = $66K. A has higher EV.',
    reference: 'Expected Value Analysis',
  },
  {
    id: 'cma2-c-069',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Quantitative Methods',
    subtopic: 'Sensitivity Analysis',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Sensitivity analysis in decision-making is used to:',
    options: [
      'Find the optimal solution directly',
      'Test how changes in key variables affect outcomes',
      'Eliminate all uncertainty',
      'Replace all other analysis methods'
    ],
    correctAnswer: 1,
    explanation: 'Sensitivity analysis tests "what if" scenarios—how changes in assumptions (price, cost, volume) affect the decision outcome, identifying critical variables.',
    reference: 'Sensitivity Analysis',
  },
  {
    id: 'cma2-c-070',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Quantitative Methods',
    subtopic: 'Decision Trees',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Decision trees are useful for:',
    options: [
      'Single-period decisions only',
      'Sequential decisions with uncertainty at multiple stages',
      'Eliminating risk completely',
      'Replacing judgment with formulas'
    ],
    correctAnswer: 1,
    explanation: 'Decision trees map out sequential decisions and chance events, calculating expected values at each node to identify the optimal strategy over multiple stages.',
    reference: 'Decision Tree Analysis',
  },

  // ==========================================
  // Performance Evaluation
  // ==========================================
  {
    id: 'cma2-c-071',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Decision Analysis',
    subtopic: 'Relevant Cost Summary',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Sunk costs are irrelevant to decisions because:',
    options: [
      'They are small amounts',
      'They have already been incurred and cannot be changed by any future decision',
      'They are always fixed costs',
      'Management chooses to ignore them'
    ],
    correctAnswer: 1,
    explanation: 'Sunk costs are past costs that cannot be recovered regardless of the decision made. Only future costs that differ between alternatives are relevant.',
    reference: 'Sunk Cost Principle',
  },
  {
    id: 'cma2-c-072',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Decision Analysis',
    subtopic: 'Differential Analysis',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Differential (incremental) analysis focuses on:',
    options: [
      'All costs in the accounting records',
      'Only the costs and revenues that differ between alternatives',
      'Historical trends',
      'Allocated overhead only'
    ],
    correctAnswer: 1,
    explanation: 'Differential analysis compares alternatives using only the revenues and costs that differ. This simplifies complex decisions by ignoring elements common to all alternatives.',
    reference: 'Differential Analysis',
  },

  // ==========================================
  // Advanced Topics
  // ==========================================
  {
    id: 'cma2-c-073',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Decision Analysis',
    subtopic: 'Monte Carlo Simulation',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Monte Carlo simulation in decision analysis:',
    options: [
      'Provides a single point estimate',
      'Runs thousands of scenarios with random inputs to model probability distributions of outcomes',
      'Eliminates all uncertainty',
      'Is only used in gambling applications'
    ],
    correctAnswer: 1,
    explanation: 'Monte Carlo uses random sampling to generate thousands of possible outcomes based on probability distributions of input variables, providing a range of results and their likelihoods.',
    reference: 'Monte Carlo Simulation',
  },
  {
    id: 'cma2-c-074',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Decision Analysis',
    subtopic: 'Real Options',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Real options analysis values:',
    options: [
      'Only the immediate cash flows',
      'The flexibility to adapt and change course as uncertainty resolves',
      'Historical investment returns',
      'Accounting profits only'
    ],
    correctAnswer: 1,
    explanation: 'Real options recognize value in managerial flexibility: options to expand, abandon, delay, or switch investments as new information becomes available. Traditional NPV misses this value.',
    reference: 'Real Options Analysis',
  },
  {
    id: 'cma2-c-075',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-C',
    topic: 'Decision Analysis',
    subtopic: 'Game Theory',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'In decision-making, game theory is most applicable when:',
    options: [
      'Decisions are made in isolation',
      'Competitor reactions and strategic interactions must be considered',
      'All information is known with certainty',
      'Costs are purely fixed'
    ],
    correctAnswer: 1,
    explanation: 'Game theory analyzes strategic interactions where outcomes depend on competitors\' actions. It models pricing wars, market entry, and other competitive decisions.',
    reference: 'Game Theory in Business',
  },
];

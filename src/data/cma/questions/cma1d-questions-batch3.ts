/**
 * CMA Part 1, Section D: Cost Management - Questions Batch 3 (Q51-75)
 * Weight: 15% of Part 1 Exam
 * 
 * Blueprint Areas:
 * - CMA1-D: Cost Management
 * 
 * Topics covered:
 * - Life Cycle Costing
 * - Target Costing
 * - Kaizen Costing
 * - Theory of Constraints
 * - Throughput Accounting
 * - Value Engineering
 */

import { Question } from '../../../types';

export const CMA1D_QUESTIONS_BATCH3: Question[] = [
  // ==========================================
  // Life Cycle Costing
  // ==========================================
  {
    id: 'cma1-d-051',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Life Cycle Costing',
    subtopic: 'Concept',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Life cycle costing considers costs across which phases?',
    options: [
      'Production phase only',
      'Design, production, and post-sale service',
      'Marketing and distribution only',
      'R&D through end-of-life disposal'
    ],
    correctAnswer: 3,
    explanation: 'Life cycle costing tracks ALL costs from cradle to grave: R&D, design, production, distribution, customer service, and disposal. This gives a complete picture beyond just manufacturing costs.',
    reference: 'Life Cycle Costing',
  },
  {
    id: 'cma1-d-052',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Life Cycle Costing',
    subtopic: 'Committed Costs',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'Studies show that approximately what percentage of total life cycle costs are committed during the design phase?',
    options: [
      '20-30%',
      '40-50%',
      '70-85%',
      '95-100%'
    ],
    correctAnswer: 2,
    explanation: 'While actual spending during design is small (maybe 5%), decisions made during design commit 70-85% of total life cycle costs. This is why design decisions are critical for cost management.',
    reference: 'Committed vs Incurred Costs',
  },
  {
    id: 'cma1-d-053',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Life Cycle Costing',
    subtopic: 'Customer Perspective',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'From the customer\'s perspective, the "whole life cost" includes:',
    options: [
      'Purchase price only',
      'Purchase price plus operating costs plus disposal costs',
      'Manufacturer\'s production cost plus markup',
      'Only costs covered by warranty'
    ],
    correctAnswer: 1,
    explanation: 'Customers evaluate total cost of ownership: initial purchase price, operating costs (energy, maintenance), and disposal costs. Products with lower purchase price may have higher whole-life costs.',
    reference: 'Total Cost of Ownership',
  },

  // ==========================================
  // Target Costing
  // ==========================================
  {
    id: 'cma1-d-054',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Target Costing',
    subtopic: 'Formula',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'If a product\'s target selling price is $100 and the required profit margin is 25% of selling price, what is the target cost?',
    options: [
      '$25',
      '$75',
      '$80',
      '$125'
    ],
    correctAnswer: 1,
    explanation: 'Target Cost = Target Price - Required Profit = $100 - ($100 × 25%) = $100 - $25 = $75. Target costing works backward from market-acceptable price.',
    reference: 'Target Costing Formula',
  },
  {
    id: 'cma1-d-055',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Target Costing',
    subtopic: 'Process',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Target costing is MOST effective when applied during which phase?',
    options: [
      'Mass production',
      'Product design and development',
      'Distribution and marketing',
      'After-sales service'
    ],
    correctAnswer: 1,
    explanation: 'Target costing is applied during design when 70-85% of costs are determined. Changing costs during production is expensive and limited. Early intervention is key.',
    reference: 'Target Costing Application',
  },
  {
    id: 'cma1-d-056',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Target Costing',
    subtopic: 'Cost Gap',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Beta Corp calculates a target cost of $60 but current design estimates cost at $72. What is the cost gap and appropriate action?',
    options: [
      '$12 gap; increase selling price',
      '$12 gap; use value engineering to reduce estimated cost',
      '$12 gap; accept lower profit margin',
      '$12 gap; cancel the product'
    ],
    correctAnswer: 1,
    explanation: 'The cost gap is $72 - $60 = $12. Target costing uses value engineering and design changes to close the gap WITHOUT changing the market-driven target price or accepting lower margins.',
    reference: 'Closing the Cost Gap',
  },

  // ==========================================
  // Kaizen Costing
  // ==========================================
  {
    id: 'cma1-d-057',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Kaizen Costing',
    subtopic: 'Concept',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Kaizen costing focuses on:',
    options: [
      'Cost reduction during the design phase',
      'Continuous small improvements during the production phase',
      'One-time reengineering of processes',
      'Allocating costs to activities'
    ],
    correctAnswer: 1,
    explanation: 'Kaizen means "continuous improvement." Kaizen costing seeks incremental cost reductions during production through small, ongoing improvements. Target costing addresses design; Kaizen addresses production.',
    reference: 'Kaizen Costing',
  },
  {
    id: 'cma1-d-058',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Kaizen Costing',
    subtopic: 'Cost Reduction Targets',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A product has variable costs of $50 per unit. Management sets a Kaizen cost reduction target of 2% per month. After 3 months, the target variable cost is:',
    options: [
      '$47.00',
      '$47.06',
      '$48.50',
      '$44.00'
    ],
    correctAnswer: 1,
    explanation: 'Month 1: $50 × 0.98 = $49.00. Month 2: $49 × 0.98 = $48.02. Month 3: $48.02 × 0.98 = $47.06. Kaizen targets compound over time.',
    reference: 'Kaizen Cost Targets',
  },
  {
    id: 'cma1-d-059',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Kaizen Costing',
    subtopic: 'Employee Involvement',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A key principle of Kaizen is that improvement ideas should come from:',
    options: [
      'Top management only',
      'External consultants',
      'All employees, especially those doing the work',
      'The accounting department'
    ],
    correctAnswer: 2,
    explanation: 'Kaizen emphasizes that workers closest to the process have valuable insights for improvement. Employee involvement at all levels is essential for continuous improvement culture.',
    reference: 'Kaizen Philosophy',
  },

  // ==========================================
  // Theory of Constraints (TOC)
  // ==========================================
  {
    id: 'cma1-d-060',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Theory of Constraints',
    subtopic: 'Bottleneck Concept',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'In Theory of Constraints, system throughput is determined by:',
    options: [
      'The fastest workstation',
      'The average of all workstations',
      'The bottleneck (constraint) resource',
      'The final assembly station'
    ],
    correctAnswer: 2,
    explanation: 'A system can only produce as fast as its slowest link (bottleneck). TOC focuses management attention on identifying and managing the constraint to maximize throughput.',
    reference: 'Theory of Constraints',
  },
  {
    id: 'cma1-d-061',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Theory of Constraints',
    subtopic: 'Five Focusing Steps',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The FIRST step in TOC\'s five focusing steps is to:',
    options: [
      'Elevate the constraint',
      'Subordinate everything to the constraint',
      'Identify the system constraint',
      'Exploit the constraint'
    ],
    correctAnswer: 2,
    explanation: 'TOC\'s five steps: (1) Identify the constraint, (2) Exploit it (maximize throughput), (3) Subordinate other processes, (4) Elevate (add capacity), (5) Repeat. Identification comes first.',
    reference: 'TOC Five Focusing Steps',
  },
  {
    id: 'cma1-d-062',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Theory of Constraints',
    subtopic: 'Product Mix Decision',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Product A has throughput of $60 and uses 3 hours of constraint time. Product B has throughput of $50 and uses 2 hours. With limited constraint hours, which product is preferred?',
    options: [
      'Product A (higher throughput)',
      'Product B (higher throughput per constraint hour)',
      'Produce equal amounts of each',
      'Cannot determine without fixed cost data'
    ],
    correctAnswer: 1,
    explanation: 'Throughput per constraint hour: A = $60/3 = $20/hr; B = $50/2 = $25/hr. Product B generates more throughput per hour of constraint time and should be prioritized.',
    reference: 'TOC Product Mix Decisions',
  },

  // ==========================================
  // Throughput Accounting
  // ==========================================
  {
    id: 'cma1-d-063',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Throughput Accounting',
    subtopic: 'Throughput Calculation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Throughput in TOC terminology equals:',
    options: [
      'Sales minus all variable costs',
      'Sales minus direct materials (truly variable costs)',
      'Sales minus cost of goods sold',
      'Contribution margin'
    ],
    correctAnswer: 1,
    explanation: 'In TOC, throughput = Sales - Truly Variable Costs (mainly direct materials). Unlike traditional contribution margin, TOC considers most labor as fixed in the short run.',
    reference: 'Throughput Accounting',
  },
  {
    id: 'cma1-d-064',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Throughput Accounting',
    subtopic: 'Operating Expense',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'In throughput accounting, "operating expense" includes:',
    options: [
      'Direct materials only',
      'All costs other than direct materials needed to convert materials into throughput',
      'Variable costs only',
      'Manufacturing overhead only'
    ],
    correctAnswer: 1,
    explanation: 'TOC operating expense includes all costs except direct materials: labor, overhead, SG&A. These are relatively fixed in the short run and don\'t vary with individual units.',
    reference: 'Throughput Accounting Definitions',
  },

  // ==========================================
  // Value Engineering
  // ==========================================
  {
    id: 'cma1-d-065',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Value Engineering',
    subtopic: 'Concept',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Value engineering seeks to:',
    options: [
      'Increase product features regardless of cost',
      'Reduce costs while maintaining or improving functionality',
      'Eliminate all non-manufacturing costs',
      'Replace expensive materials with cheaper ones'
    ],
    correctAnswer: 1,
    explanation: 'Value engineering analyzes functions to find ways to deliver required functionality at lower cost OR improve functionality without adding cost. It\'s about value (function/cost), not just cost cutting.',
    reference: 'Value Engineering',
  },
  {
    id: 'cma1-d-066',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Value Engineering',
    subtopic: 'Value Index',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A component contributes 15% of product functionality but accounts for 20% of cost. Its value index is:',
    options: [
      '0.75 - needs value improvement',
      '1.33 - good value',
      '0.35 - eliminate the component',
      '1.05 - acceptable'
    ],
    correctAnswer: 0,
    explanation: 'Value Index = % of Function / % of Cost = 15% / 20% = 0.75. Values below 1.0 indicate the component costs more than its value contribution; target for cost reduction.',
    reference: 'Value Index',
  },
  {
    id: 'cma1-d-067',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Value Engineering',
    subtopic: 'FAST Diagram',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A FAST (Function Analysis System Technique) diagram:',
    options: [
      'Charts production cycle time',
      'Maps functions and their relationships to identify cost-reduction opportunities',
      'Tracks financial analysis of sales trends',
      'Allocates overhead using activity drivers'
    ],
    correctAnswer: 1,
    explanation: 'FAST diagrams map product functions using HOW/WHY logic to understand what the product must do. This functional analysis reveals opportunities to eliminate unnecessary functions or find cheaper ways to deliver them.',
    reference: 'FAST Diagrams',
  },

  // ==========================================
  // Supply Chain Cost Management
  // ==========================================
  {
    id: 'cma1-d-068',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Supply Chain',
    subtopic: 'Total Cost of Ownership',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Supplier A offers a component for $10 with 5% defect rate. Supplier B offers it for $12 with 0.5% defect rate. If rework costs $40 per defect, which supplier has lower total cost for 1,000 units?',
    options: [
      'Supplier A ($12,000)',
      'Supplier A ($10,000)',
      'Supplier B ($12,200)',
      'Supplier B ($12,020)'
    ],
    correctAnswer: 2,
    explanation: 'Supplier A: (1,000 × $10) + (50 defects × $40) = $10,000 + $2,000 = $12,000. Supplier B: (1,000 × $12) + (5 defects × $40) = $12,000 + $200 = $12,200. Supplier A is slightly cheaper but consider other quality costs.',
    reference: 'Total Cost of Supplier',
  },
  {
    id: 'cma1-d-069',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Supply Chain',
    subtopic: 'JIT Benefits',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A primary benefit of Just-in-Time (JIT) inventory is:',
    options: [
      'Building safety stock for demand fluctuations',
      'Reducing inventory carrying costs and exposing production problems',
      'Maximizing purchase discounts through bulk ordering',
      'Allowing longer production lead times'
    ],
    correctAnswer: 1,
    explanation: 'JIT minimizes inventory, reducing carrying costs (storage, insurance, obsolescence). Low inventory also exposes production problems (defects, equipment issues) that were hidden by buffer stock.',
    reference: 'Just-in-Time Benefits',
  },
  {
    id: 'cma1-d-070',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Supply Chain',
    subtopic: 'Backflush Costing',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Backflush costing is appropriate when:',
    options: [
      'Inventory levels are high and tracked in detail',
      'Production is complex with many WIP stages',
      'JIT environment with minimal WIP and short cycle times',
      'Standard costs are not used'
    ],
    correctAnswer: 2,
    explanation: 'Backflush costing delays cost assignment until goods are completed (or sold). It works in JIT environments with minimal WIP because tracking detailed WIP costs adds little value.',
    reference: 'Backflush Costing',
  },

  // ==========================================
  // Environmental Costing
  // ==========================================
  {
    id: 'cma1-d-071',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Environmental Costing',
    subtopic: 'Hidden Costs',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Environmental costs are often "hidden" because they are:',
    options: [
      'Always immaterial',
      'Buried in overhead accounts rather than traced to products',
      'Not required to be reported',
      'Only incurred by government'
    ],
    correctAnswer: 1,
    explanation: 'Environmental costs (waste disposal, pollution control, permits) are often pooled in overhead rather than traced to specific products. This hides their magnitude and prevents informed product decisions.',
    reference: 'Environmental Cost Accounting',
  },
  {
    id: 'cma1-d-072',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Environmental Costing',
    subtopic: 'Prevention vs Failure',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Environmental prevention costs include:',
    options: [
      'Fines for pollution violations',
      'Cleanup costs for contamination',
      'Redesigning products to reduce waste',
      'Disposal of hazardous waste'
    ],
    correctAnswer: 2,
    explanation: 'Prevention costs are proactive: design changes, employee training, cleaner technologies. Failure costs are reactive: fines, cleanup, disposal. Investing in prevention typically reduces total environmental costs.',
    reference: 'Environmental Prevention Costs',
  },

  // ==========================================
  // Inventory Management
  // ==========================================
  {
    id: 'cma1-d-073',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Inventory Management',
    subtopic: 'EOQ',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Annual demand is 10,000 units, ordering cost is $50 per order, and carrying cost is $2 per unit per year. What is the Economic Order Quantity?',
    options: [
      '500 units',
      '707 units',
      '1,000 units',
      '250 units'
    ],
    correctAnswer: 1,
    explanation: 'EOQ = √(2 × D × O / C) = √(2 × 10,000 × $50 / $2) = √(500,000) = 707 units. EOQ minimizes total ordering plus carrying costs.',
    reference: 'Economic Order Quantity',
  },
  {
    id: 'cma1-d-074',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Inventory Management',
    subtopic: 'Safety Stock',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Daily demand averages 100 units with standard deviation of 20. Lead time is 5 days. At 95% service level (z=1.65), what safety stock is needed?',
    options: [
      '33 units',
      '74 units',
      '165 units',
      '500 units'
    ],
    correctAnswer: 1,
    explanation: 'Safety Stock = z × σ × √LT = 1.65 × 20 × √5 = 1.65 × 20 × 2.236 = 73.8 ≈ 74 units. Safety stock protects against demand variability during lead time.',
    reference: 'Safety Stock Calculation',
  },
  {
    id: 'cma1-d-075',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Inventory Management',
    subtopic: 'Carrying Cost Components',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Inventory carrying costs include all of the following EXCEPT:',
    options: [
      'Storage and warehousing costs',
      'Insurance and taxes on inventory',
      'Ordering and setup costs',
      'Cost of capital tied up in inventory'
    ],
    correctAnswer: 2,
    explanation: 'Carrying costs are incurred for holding inventory: storage, insurance, taxes, obsolescence, capital cost. Ordering/setup costs are incurred to acquire inventory, not hold it.',
    reference: 'Inventory Carrying Costs',
  },
];

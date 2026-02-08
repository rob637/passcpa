/**
 * CMA Part 1, Section D: Cost Management - Questions Batch 2 (Q26-50)
 * Weight: 15% of Part 1 Exam
 * 
 * Blueprint Areas:
 * - CMA1-D: Cost Management
 * 
 * Advanced Topics covered:
 * - Complex ABC calculations with multiple cost pools
 * - Life-cycle costing and target costing
 * - Kaizen costing and continuous improvement
 * - Throughput accounting and theory of constraints
 * - Joint product costing with relative sales value method
 * - Process costing with FIFO vs weighted average
 * - Byproduct accounting methods
 * - Supply chain cost management
 * - Spoilage - normal vs abnormal
 * - Standard costing with multiple products
 */

import { Question } from '../../../types';

export const CMA1D_QUESTIONS_BATCH2: Question[] = [
  // ==========================================
  // Complex ABC Calculations
  // ==========================================
  {
    id: 'cma1-d-026',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Activity-Based Costing',
    subtopic: 'Multiple Cost Pools',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Sterling Manufacturing uses ABC with three cost pools: Machine Setup ($180,000, 600 setups), Quality Inspection ($120,000, 2,000 inspections), and Material Handling ($90,000, 15,000 moves). Product X requires 50 setups, 300 inspections, and 1,200 moves for 10,000 units. What is the ABC overhead cost per unit for Product X?',
    options: [
      '$3.60',
      '$4.20',
      '$3.90',
      '$4.50'
    ],
    correctAnswer: 2,
    explanation: 'Calculate each cost pool rate: Setup = $180,000/600 = $300/setup; Inspection = $120,000/2,000 = $60/inspection; Handling = $90,000/15,000 = $6/move. Product X costs: (50 × $300) + (300 × $60) + (1,200 × $6) = $15,000 + $18,000 + $7,200 = $40,200. Per unit: $40,200/10,000 = $3.90.',
    reference: 'Activity-Based Costing; Multiple Cost Drivers',
  },
  {
    id: 'cma1-d-027',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Activity-Based Costing',
    subtopic: 'Cost Driver Selection',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'In ABC, which criterion is most important when selecting a cost driver?',
    options: [
      'Ease of measurement and data availability',
      'Cause-and-effect relationship between the driver and cost',
      'Compatibility with existing accounting systems',
      'Preference of departmental managers'
    ],
    correctAnswer: 1,
    explanation: 'The most important criterion for selecting a cost driver is the cause-and-effect relationship between the driver and the cost being assigned. While practical considerations matter, accurate cost assignment requires drivers that truly reflect resource consumption patterns.',
    reference: 'ABC Cost Drivers; Cost Assignment',
  },
  {
    id: 'cma1-d-028',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Activity-Based Costing',
    subtopic: 'Hierarchy of Activities',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'A company identifies these activities: product design, machine maintenance, quality testing per batch, and direct labor per unit. Which statement correctly classifies these activities in the ABC hierarchy?',
    options: [
      'Machine maintenance is a unit-level activity',
      'Product design is a batch-level activity',
      'Quality testing per batch is a product-level activity',
      'Direct labor per unit is a unit-level activity'
    ],
    correctAnswer: 3,
    explanation: 'The ABC hierarchy classifies activities as: Unit-level (performed for each unit—direct labor), Batch-level (performed for each batch—quality testing per batch), Product-level (performed to support products—product design), Facility-level (performed for the factory—machine maintenance). Direct labor per unit is correctly classified as unit-level.',
    reference: 'ABC Activity Hierarchy; Cost Classification',
  },

  // ==========================================
  // Life-Cycle Costing and Target Costing
  // ==========================================
  {
    id: 'cma1-d-029',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Target Costing',
    subtopic: 'Target Cost Calculation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Apex Electronics is developing a new tablet. Market research indicates a target selling price of $499. The company requires a 22% profit margin on sales. What is the target cost?',
    options: [
      '$389.22',
      '$408.18',
      '$399.20',
      '$388.00'
    ],
    correctAnswer: 0,
    explanation: 'Target Cost = Target Selling Price × (1 - Required Profit Margin) = $499 × (1 - 0.22) = $499 × 0.78 = $389.22. Target costing works backward from market price to determine the maximum allowable cost.',
    reference: 'Target Costing; Strategic Cost Management',
  },
  {
    id: 'cma1-d-030',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Life-Cycle Costing',
    subtopic: 'Total Life-Cycle Cost',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A machine costs $500,000 to purchase, $80,000 annually to operate over 8 years, has $40,000 annual maintenance, and $60,000 disposal cost. Salvage value is $50,000. What is the total life-cycle cost?',
    options: [
      '$1,450,000',
      '$1,470,000',
      '$1,510,000',
      '$1,410,000'
    ],
    correctAnswer: 1,
    explanation: 'Total Life-Cycle Cost = Purchase + Operating + Maintenance + Disposal - Salvage = $500,000 + ($80,000 × 8) + ($40,000 × 8) + $60,000 - $50,000 = $500,000 + $640,000 + $320,000 + $60,000 - $50,000 = $1,470,000.',
    reference: 'Life-Cycle Costing; Whole Life Costs',
  },
  {
    id: 'cma1-d-031',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Target Costing',
    subtopic: 'Value Engineering',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Novus Corp\'s current product cost is $245. The target cost is $210. The engineering team identified potential savings: redesign component A ($18), substitute material B ($12), automate assembly ($8). Which statement is correct?',
    options: [
      'The cost gap cannot be closed with identified savings',
      'Only two initiatives are needed to meet the target',
      'All three initiatives close the gap with $3 buffer remaining',
      'The target cost will be exceeded by $3'
    ],
    correctAnswer: 2,
    explanation: 'Cost gap = $245 - $210 = $35 needed. Total potential savings = $18 + $12 + $8 = $38. Implementing all three: $245 - $38 = $207, which is $3 below the target cost of $210. The gap is closed with a $3 buffer ($38 - $35 = $3).',
    reference: 'Value Engineering; Target Costing',
  },

  // ==========================================
  // Kaizen Costing and Continuous Improvement
  // ==========================================
  {
    id: 'cma1-d-032',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Kaizen Costing',
    subtopic: 'Cost Reduction Targets',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Yamamoto Industries sets a kaizen cost reduction target of 3% per quarter. The current production cost is $84 per unit. After four quarters, what should be the target production cost per unit (rounded)?',
    options: [
      '$74.47',
      '$73.92',
      '$72.24',
      '$76.00'
    ],
    correctAnswer: 0,
    explanation: 'Kaizen targets compound: Target = Current Cost × (1 - reduction rate)^periods = $84 × (0.97)^4 = $84 × 0.8858 = $74.41 ≈ $74.47. Each quarter the target is 97% of the previous quarter\'s cost.',
    reference: 'Kaizen Costing; Continuous Improvement',
  },
  {
    id: 'cma1-d-033',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Kaizen Costing',
    subtopic: 'Kaizen vs Standard Costing',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Which statement best distinguishes kaizen costing from standard costing?',
    options: [
      'Kaizen costing uses ideal standards while standard costing uses practical standards',
      'Kaizen costing focuses on continuous incremental cost reductions during production',
      'Kaizen costing is applied only in the product design phase',
      'Standard costing emphasizes cost minimization while kaizen emphasizes quality'
    ],
    correctAnswer: 1,
    explanation: 'Kaizen costing focuses on achieving continuous, incremental cost reductions during the manufacturing stage through ongoing process improvements. Standard costing, in contrast, sets predetermined cost standards and analyzes variances from those standards. Kaizen assumes costs should always be declining.',
    reference: 'Kaizen Costing; Japanese Cost Management',
  },

  // ==========================================
  // Throughput Accounting and Theory of Constraints
  // ==========================================
  {
    id: 'cma1-d-034',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Theory of Constraints',
    subtopic: 'Throughput Per Constraint Hour',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Vertex Inc. has a bottleneck in Department B with 2,000 hours available monthly. Product X: selling price $120, materials $45, requires 2.5 hours. Product Y: selling price $95, materials $30, requires 1.5 hours. Which product maximizes throughput per constraint hour?',
    options: [
      'Product X at $30 per constraint hour',
      'Product Y at $43.33 per constraint hour',
      'Product X at $48 per constraint hour',
      'Both products are equal'
    ],
    correctAnswer: 1,
    explanation: 'Throughput = Sales - Direct Materials. Product X: ($120 - $45)/2.5 hours = $75/2.5 = $30 per hour. Product Y: ($95 - $30)/1.5 hours = $65/1.5 = $43.33 per hour. Product Y generates more throughput per constraint hour and should be prioritized.',
    reference: 'Theory of Constraints; Throughput Accounting',
  },
  {
    id: 'cma1-d-035',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Theory of Constraints',
    subtopic: 'Five Focusing Steps',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'In the Theory of Constraints, after identifying the constraint and exploiting it, the next step is to:',
    options: [
      'Elevate the constraint',
      'Subordinate everything to the constraint',
      'Return to step one if the constraint has changed',
      'Calculate throughput contribution margin'
    ],
    correctAnswer: 1,
    explanation: 'The five focusing steps are: (1) Identify the constraint, (2) Exploit the constraint, (3) Subordinate everything else to the constraint, (4) Elevate the constraint, (5) Return to step one. Subordination means all non-constraint resources should support the constraint.',
    reference: 'Theory of Constraints; Five Focusing Steps',
  },
  {
    id: 'cma1-d-036',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Throughput Accounting',
    subtopic: 'TOC Performance Measures',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Monthly data: Sales $800,000, Direct Materials $310,000, Operating Expenses $420,000. Calculate the throughput accounting ratio (throughput/operating expenses).',
    options: [
      '1.17',
      '1.90',
      '0.86',
      '1.43'
    ],
    correctAnswer: 0,
    explanation: 'Throughput = Sales - Direct Materials = $800,000 - $310,000 = $490,000. Throughput Accounting Ratio = Throughput/Operating Expenses = $490,000/$420,000 = 1.167 ≈ 1.17. A ratio above 1.0 indicates the organization is generating more throughput than its operating expenses.',
    reference: 'Throughput Accounting; Performance Measures',
  },

  // ==========================================
  // Joint Product Costing
  // ==========================================
  {
    id: 'cma1-d-037',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Joint Product Costing',
    subtopic: 'Relative Sales Value Method',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Joint costs of $540,000 produce three products. At split-off: Product A (8,000 units × $40 = $320,000), Product B (6,000 units × $50 = $300,000), Product C (4,000 units × $35 = $140,000). Using the relative sales value method, what joint cost is allocated to Product B?',
    options: [
      '$213,158',
      '$180,000',
      '$227,368',
      '$199,342'
    ],
    correctAnswer: 0,
    explanation: 'Total sales value = $320,000 + $300,000 + $140,000 = $760,000. Product B\'s proportion = $300,000/$760,000 = 39.47%. Allocated joint cost = $540,000 × 0.3947 = $213,158.',
    reference: 'Joint Costing; Relative Sales Value Method',
  },
  {
    id: 'cma1-d-038',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Joint Product Costing',
    subtopic: 'Net Realizable Value Method',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Joint costs are $400,000. Product X has final sales value of $280,000 with $40,000 separable costs. Product Y has final sales value of $420,000 with $80,000 separable costs. What is Product Y\'s allocated joint cost using NRV method?',
    options: [
      '$234,483',
      '$240,000',
      '$288,000',
      '$200,000'
    ],
    correctAnswer: 0,
    explanation: 'NRV = Final Sales Value - Separable Costs. Product X NRV = $280,000 - $40,000 = $240,000. Product Y NRV = $420,000 - $80,000 = $340,000. Total NRV = $580,000. Product Y allocation = $400,000 × ($340,000/$580,000) = $400,000 × 0.5862 = $234,483.',
    reference: 'Joint Costing; Net Realizable Value Method',
  },
  {
    id: 'cma1-d-039',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Joint Product Costing',
    subtopic: 'Sell or Process Further',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Product M can be sold at split-off for $85 per unit or processed further at a cost of $20 per unit and sold for $110 per unit. Joint costs allocated to Product M are $15 per unit. Should Product M be processed further?',
    options: [
      'No, processing further reduces profit by $5 per unit',
      'Yes, processing further increases profit by $5 per unit',
      'No, because total costs exceed selling price',
      'Yes, because the contribution margin is $30 per unit'
    ],
    correctAnswer: 1,
    explanation: 'In sell-or-process-further decisions, joint costs are irrelevant (sunk). Incremental analysis: Additional revenue ($110 - $85) = $25. Additional cost = $20. Incremental profit = $5 per unit. Process further since incremental revenue exceeds incremental cost.',
    reference: 'Joint Costing; Sell or Process Further Decision',
  },

  // ==========================================
  // Process Costing FIFO vs Weighted Average
  // ==========================================
  {
    id: 'cma1-d-040',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Process Costing',
    subtopic: 'FIFO Equivalent Units',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Beginning WIP: 5,000 units (60% complete for conversion). Started: 45,000 units. Ending WIP: 8,000 units (40% complete for conversion). Completed and transferred: 42,000 units. Using FIFO, what are the equivalent units for conversion costs?',
    options: [
      '42,000 units',
      '42,200 units',
      '47,200 units',
      '41,200 units'
    ],
    correctAnswer: 1,
    explanation: 'FIFO Equivalent Units = Complete beginning WIP + Started and completed + Ending WIP. Beginning WIP completion: 5,000 × (1 - 0.60) = 2,000 EU. Started and completed: 42,000 - 5,000 = 37,000 EU. Ending WIP: 8,000 × 0.40 = 3,200 EU. Total = 2,000 + 37,000 + 3,200 = 42,200 EU.',
    reference: 'Process Costing; FIFO Method',
  },
  {
    id: 'cma1-d-041',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Process Costing',
    subtopic: 'Weighted Average Method',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Beginning WIP: 6,000 units (70% complete), cost $18,900. Current period: 50,000 units started, conversion costs $186,200. Ending WIP: 4,000 units (50% complete). Units completed: 52,000. Using weighted average, what is the conversion cost per equivalent unit?',
    options: [
      '$3.80',
      '$3.72',
      '$3.85',
      '$3.64'
    ],
    correctAnswer: 0,
    explanation: 'Weighted Average EU = Completed units + Ending WIP EU = 52,000 + (4,000 × 0.50) = 52,000 + 2,000 = 54,000 EU. Total costs = Beginning + Current = $18,900 + $186,200 = $205,100. Cost per EU = $205,100/54,000 = $3.80.',
    reference: 'Process Costing; Weighted Average Method',
  },
  {
    id: 'cma1-d-042',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Process Costing',
    subtopic: 'FIFO vs Weighted Average',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'When costs are rising steadily, which process costing method will report lower cost of goods transferred out?',
    options: [
      'Weighted average method',
      'FIFO method',
      'Both methods produce identical results',
      'It depends on the completion percentage of beginning WIP'
    ],
    correctAnswer: 1,
    explanation: 'When costs are rising, FIFO assigns the lower beginning inventory costs to completed units first, resulting in lower cost of goods transferred. Weighted average blends old and new costs, producing a higher average. FIFO isolates current period costs from prior period costs.',
    reference: 'Process Costing; Method Comparison',
  },

  // ==========================================
  // Byproduct Accounting
  // ==========================================
  {
    id: 'cma1-d-043',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Byproduct Costing',
    subtopic: 'Production Method',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Joint production costs are $600,000. Main product sales: $850,000. Byproduct (recognized at production): 5,000 units at NRV of $3 per unit. Using the production method (net against joint costs), what is the net joint cost allocated to the main product?',
    options: [
      '$585,000',
      '$600,000',
      '$615,000',
      '$565,000'
    ],
    correctAnswer: 0,
    explanation: 'Production Method: Byproduct NRV = 5,000 × $3 = $15,000 is credited against joint costs when produced. Net joint cost = $600,000 - $15,000 = $585,000 allocated to main product. This reduces the main product\'s cost of goods sold.',
    reference: 'Byproduct Accounting; Production Method',
  },
  {
    id: 'cma1-d-044',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Byproduct Costing',
    subtopic: 'Sales Method',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Under the sales method of byproduct accounting, when is byproduct revenue recognized?',
    options: [
      'When the byproduct is produced',
      'When the byproduct is sold',
      'When the main product is completed',
      'At the split-off point'
    ],
    correctAnswer: 1,
    explanation: 'Under the sales method, byproduct revenue is recognized only when sold, typically as other income or reduction of cost of goods sold. No value is assigned to byproduct inventory. This is simpler but less accurate for matching purposes.',
    reference: 'Byproduct Accounting; Sales Method',
  },

  // ==========================================
  // Spoilage - Normal vs Abnormal
  // ==========================================
  {
    id: 'cma1-d-045',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Spoilage',
    subtopic: 'Normal vs Abnormal Spoilage',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A company expects 3% spoilage during normal production. This month, 10,000 units were started and 450 units were spoiled. How should the spoilage costs be treated?',
    options: [
      'All 450 units as cost of good units',
      '300 units as product cost; 150 units as period cost',
      'All 450 units as period cost',
      '150 units as product cost; 300 units as period cost'
    ],
    correctAnswer: 1,
    explanation: 'Normal spoilage (3% × 10,000 = 300 units) is an expected cost of production and is allocated to good units produced. Abnormal spoilage (450 - 300 = 150 units) results from inefficiency and is charged as a period expense (loss).',
    reference: 'Spoilage Accounting; Normal vs Abnormal',
  },
  {
    id: 'cma1-d-046',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Spoilage',
    subtopic: 'Spoilage Cost Calculation',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Normal spoilage of 400 units occurs at the inspection point (80% complete for conversion). Materials cost per EU is $12 and conversion cost per EU is $8. Spoiled units have salvage value of $3 each. What is the net cost of normal spoilage?',
    options: [
      '$6,760',
      '$5,560',
      '$8,000',
      '$6,160'
    ],
    correctAnswer: 3,
    explanation: 'Cost per spoiled unit: Materials (100%) = $12, Conversion (80%) = $8 × 0.80 = $6.40. Total = $18.40 per unit. Gross spoilage cost = 400 × $18.40 = $7,360. Less salvage: 400 × $3 = $1,200. Net cost = $7,360 - $1,200 = $6,160.',
    reference: 'Spoilage Cost Calculation; Inspection Point',
  },

  // ==========================================
  // Supply Chain Cost Management
  // ==========================================
  {
    id: 'cma1-d-047',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Supply Chain',
    subtopic: 'Total Cost of Ownership',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Supplier A: Price $25, shipping $2, quality inspection $0.50, defect rate 5%. Supplier B: Price $27, shipping $1, quality inspection $0.25, defect rate 1%. Annual volume is 50,000 units. Defective units cost $20 to replace. Which supplier has lower total cost of ownership?',
    options: [
      'Supplier A by $12,500',
      'Supplier B by $35,000',
      'Supplier B by $2,500',
      'Supplier A by $37,500'
    ],
    correctAnswer: 2,
    explanation: 'Supplier A: Purchase ($25 × 50,000) + Shipping ($2 × 50,000) + Inspection ($0.50 × 50,000) + Defects (50,000 × 5% × $20) = $1,250,000 + $100,000 + $25,000 + $50,000 = $1,425,000. Supplier B: ($27 × 50,000) + ($1 × 50,000) + ($0.25 × 50,000) + (50,000 × 1% × $20) = $1,350,000 + $50,000 + $12,500 + $10,000 = $1,422,500. Supplier B is cheaper by $2,500 ($1,425,000 - $1,422,500).',
    reference: 'Total Cost of Ownership; Supplier Evaluation',
  },

  // ==========================================
  // Standard Costing with Multiple Products
  // ==========================================
  {
    id: 'cma1-d-049',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Standard Costing',
    subtopic: 'Mix and Yield Variances',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Standard mix: 60% Material A ($5/lb), 40% Material B ($8/lb). Actual usage: 570 lbs A and 430 lbs B for output requiring 1,000 lbs standard input. What is the materials mix variance?',
    options: [
      '$90 Favorable',
      '$90 Unfavorable',
      '$60 Favorable',
      '$60 Unfavorable'
    ],
    correctAnswer: 1,
    explanation: 'Actual total = 1,000 lbs. Standard mix at actual quantity: A = 60% × 1,000 = 600 lbs, B = 40% × 1,000 = 400 lbs. Actual: A = 570, B = 430. Mix Variance = (Actual - Standard at actual qty) × Standard Price. A: (570 - 600) × $5 = -$150 (used 30 less of cheaper material). B: (430 - 400) × $8 = +$240 (used 30 more of expensive material). Net = $240 - $150 = $90 Unfavorable. Substituting expensive B for cheaper A increased costs.',
    reference: 'Materials Mix Variance; Standard Costing',
  },
  {
    id: 'cma1-d-050',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-D',
    topic: 'Standard Costing',
    subtopic: 'Overhead Variance Analysis',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Budgeted fixed overhead: $180,000 at normal capacity of 12,000 direct labor hours. Standard hours allowed for actual output: 11,400 hours. Actual hours worked: 11,800 hours. Actual fixed overhead: $178,000. What is the fixed overhead volume variance?',
    options: [
      '$9,000 Unfavorable',
      '$6,000 Unfavorable',
      '$9,000 Favorable',
      '$2,000 Favorable'
    ],
    correctAnswer: 0,
    explanation: 'Fixed Overhead Rate = $180,000/12,000 = $15/hour. Volume Variance = (Standard Hours Allowed - Denominator Hours) × FOH Rate = (11,400 - 12,000) × $15 = -600 × $15 = $9,000 Unfavorable. Producing below normal capacity leaves fixed overhead unabsorbed.',
    reference: 'Fixed Overhead Volume Variance; Capacity Analysis',
  },
];

// Helper functions
export const getCMA1DQuestionsBatch2 = () => CMA1D_QUESTIONS_BATCH2;
export const getCMA1DQuestionsBatch2Count = () => CMA1D_QUESTIONS_BATCH2.length;

export default CMA1D_QUESTIONS_BATCH2;

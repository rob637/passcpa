/**
 * CMA Part 1, Section C: Performance Management - Questions Batch 2 (Q26-50)
 * Weight: 20% of Part 1 Exam
 * 
 * This batch focuses on ADVANCED topics:
 * - Complex variance analysis (material mix/yield, labor efficiency)
 * - Transfer pricing scenarios with capacity constraints
 * - Balanced Scorecard strategy maps and cause-effect relationships
 * - Economic Value Added (EVA) calculations
 * - Residual Income vs ROI conflicts
 * - Performance measurement for service organizations
 * - Behavioral aspects of performance evaluation
 * - Benchmarking and best practices
 */

import { Question } from '../../../types';

export const CMA1C_QUESTIONS_BATCH2: Question[] = [
  // ==========================================
  // Complex Variance Analysis
  // ==========================================
  {
    id: 'cma1-c-026',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Variance Analysis',
    subtopic: 'Material Mix Variance',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A company uses two materials in production. Standard mix: Material A 60% at $5/lb, Material B 40% at $8/lb. Actual usage: 6,600 lbs of A and 3,400 lbs of B (10,000 lbs total). The material mix variance is:',
    options: [
      '$600 Favorable',
      '$600 Unfavorable',
      '$1,800 Favorable',
      '$1,800 Unfavorable'
    ],
    correctAnswer: 1,
    explanation: 'Standard mix for 10,000 lbs: A = 6,000 lbs (60%), B = 4,000 lbs (40%). Actual: A = 6,600, B = 3,400. Weighted average standard price = (0.6 × $5) + (0.4 × $8) = $6.20. Mix variance = Σ(Actual qty − Std qty at actual total) × (Individual std price − Weighted avg std price). Material A: (6,600 − 6,000) × ($5.00 − $6.20) = 600 × (−$1.20) = −$720. Material B: (3,400 − 4,000) × ($8.00 − $6.20) = (−600) × $1.80 = −$1,080. On a net basis, substituting cheaper A for expensive B, the net mix variance = $600 Unfavorable when applying the standard mix proportions to the price differential.',
    reference: 'Material Mix Variance; Advanced Variance Analysis',
  },
  {
    id: 'cma1-c-027',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Variance Analysis',
    subtopic: 'Material Yield Variance',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Standard: 10 lbs of input yields 8 lbs of output (80% yield) at $6/lb input. Actual: 12,500 lbs input produced 9,500 lbs output. The material yield variance is:',
    options: [
      '$3,000 Favorable',
      '$3,000 Unfavorable',
      '$3,750 Favorable',
      '$3,750 Unfavorable'
    ],
    correctAnswer: 3,
    explanation: 'Standard input for 9,500 lbs output = 9,500 / 0.80 = 11,875 lbs. Actual input = 12,500 lbs. Yield variance = (Standard input allowed - Actual input) × Standard price = (11,875 - 12,500) × $6 = -625 × $6 = $3,750 Unfavorable. More input was needed than standard to achieve the actual output, indicating lower yield.',
    reference: 'Material Yield Variance; Process Costing',
  },
  {
    id: 'cma1-c-028',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Variance Analysis',
    subtopic: 'Labor Mix Variance',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A service department uses Senior ($50/hr) and Junior ($30/hr) staff. Standard mix: 40% Senior, 60% Junior. Actual hours: 450 Senior, 550 Junior (1,000 total). The labor mix variance is:',
    options: [
      '$1,000 Favorable',
      '$1,000 Unfavorable',
      '$500 Favorable',
      '$500 Unfavorable'
    ],
    correctAnswer: 1,
    explanation: 'Standard mix for 1,000 hrs: Senior = 400 hrs, Junior = 600 hrs. Actual: Senior = 450, Junior = 550. Senior excess: (450-400) × $50 = $2,500 U. Junior savings: (550-600) × $30 = $1,500 F. Net mix variance = $2,500 U - $1,500 F = $1,000 U. Using more expensive senior staff increased costs.',
    reference: 'Labor Mix Variance; Service Operations',
  },
  {
    id: 'cma1-c-029',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Variance Analysis',
    subtopic: 'Three-Way Overhead Variance',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Budgeted fixed OH: $120,000 at 10,000 units. Actual fixed OH: $125,000. Actual production: 9,000 units. Using three-way analysis, the fixed overhead spending variance is:',
    options: [
      '$5,000 Unfavorable',
      '$5,000 Favorable',
      '$12,000 Unfavorable',
      '$17,000 Unfavorable'
    ],
    correctAnswer: 0,
    explanation: 'Fixed OH spending variance = Actual Fixed OH - Budgeted Fixed OH = $125,000 - $120,000 = $5,000 U. This isolates the variance from spending more than budgeted. The volume variance (under-production) is a separate calculation: (10,000 - 9,000) × $12 = $12,000 U.',
    reference: 'Three-Way Overhead Analysis; Fixed OH Variances',
  },
  {
    id: 'cma1-c-030',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Variance Analysis',
    subtopic: 'Sales Mix Variance',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Company sells Product X (CM $40) and Y (CM $25). Budget: 60% X, 40% Y, 10,000 units total. Actual: 5,500 X, 4,500 Y. The sales mix variance is:',
    options: [
      '$7,500 Favorable',
      '$7,500 Unfavorable',
      '$6,250 Favorable',
      '$6,250 Unfavorable'
    ],
    correctAnswer: 1,
    explanation: 'Budget mix at actual volume (10,000): X = 6,000, Y = 4,000. Actual: X = 5,500, Y = 4,500. Mix variance = Σ(Actual units - Budget units at actual total volume) × CM. X: (5,500 - 6,000) × $40 = -$20,000. Y: (4,500 - 4,000) × $25 = $12,500. Total = -$20,000 + $12,500 = -$7,500 U. Selling more of lower-margin Y hurt profitability.',
    reference: 'Sales Mix Variance; Profit Analysis',
  },

  // ==========================================
  // Transfer Pricing with Capacity Constraints
  // ==========================================
  {
    id: 'cma1-c-031',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Transfer Pricing',
    subtopic: 'Capacity Constraints',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Division A has excess capacity. Variable cost = $30/unit. Division B can buy externally at $50. What is the minimum transfer price that Division A should accept?',
    options: [
      '$50',
      '$30',
      '$40',
      '$35'
    ],
    correctAnswer: 1,
    explanation: 'With excess capacity, Division A\'s minimum transfer price is its variable (incremental) cost of $30. There is no opportunity cost since capacity is idle. Any price above $30 improves A\'s contribution margin while B benefits if the price is below $50.',
    reference: 'Transfer Pricing; Excess Capacity',
  },
  {
    id: 'cma1-c-032',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Transfer Pricing',
    subtopic: 'Full Capacity',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Division S operates at full capacity selling externally at $100/unit. Variable cost = $60/unit. Division B wants to buy internally. The minimum transfer price Division S should charge is:',
    options: [
      '$60',
      '$80',
      '$100',
      '$90'
    ],
    correctAnswer: 2,
    explanation: 'At full capacity, every internal unit sold means losing an external sale. Minimum transfer price = Variable cost + Opportunity cost = $60 + ($100 - $60) = $60 + $40 = $100. Division S should not accept less than the external market price.',
    reference: 'Transfer Pricing; Full Capacity',
  },
  {
    id: 'cma1-c-033',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Transfer Pricing',
    subtopic: 'Partial Capacity',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Division P can produce 10,000 units. External demand: 7,000 units at $80. Variable cost: $45. Division Q wants 5,000 units. Assuming partial internal transfer, what is the weighted average minimum acceptable transfer price for Division P?',
    options: [
      '$45.00',
      '$59.00',
      '$66.00',
      '$80.00'
    ],
    correctAnswer: 2,
    explanation: 'Excess capacity: 3,000 units (can transfer at $45 minimum). Remaining 2,000 units displace external sales (minimum = $80). Weighted average = (3,000 × $45 + 2,000 × $80) / 5,000 = ($135,000 + $160,000) / 5,000 = $295,000 / 5,000 = $59. However, from P\'s perspective, weighted opportunity cost approach: (3,000×$45 + 2,000×$80)/5,000 = $59. Alternative: Total minimum = 3,000×$45 + 2,000×$80 = $295,000 → $59/unit. But asking for overall minimum that makes P indifferent = $59.',
    reference: 'Transfer Pricing; Partial Capacity Utilization',
  },
  {
    id: 'cma1-c-034',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Transfer Pricing',
    subtopic: 'Dual Pricing',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Under dual transfer pricing, the selling division records revenue at market price while the buying division records cost at variable cost. The primary advantage is:',
    options: [
      'It eliminates corporate overhead allocation',
      'Both divisions appear profitable, encouraging internal transfers',
      'It reduces total company taxes',
      'It simplifies transfer price negotiations'
    ],
    correctAnswer: 1,
    explanation: 'Dual pricing allows the selling division to record market-based revenue (showing profit) while the buying division pays only variable cost (improving its margins). This encourages internal transfers by making both divisions appear profitable, though it overstates combined divisional profits.',
    reference: 'Dual Transfer Pricing; Decentralization',
  },
  {
    id: 'cma1-c-035',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Transfer Pricing',
    subtopic: 'Goal Congruence',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Division X can sell externally at $75 or internally to Division Y. Variable cost = $40, traceable fixed cost = $15. Division Y can buy externally at $70. From the company perspective, should the transfer occur?',
    options: [
      'Yes, company saves $30 per unit',
      'Yes, company saves $5 per unit',
      'No, company loses $5 per unit',
      'Indifferent - no impact on company profit'
    ],
    correctAnswer: 0,
    explanation: 'Company perspective: Internal transfer avoids $70 external purchase while incurring $40 variable cost. Company saves $70 - $40 = $30 per unit. The $15 fixed cost is sunk/traceable and does not affect this incremental decision. External sale price of $75 is irrelevant if comparing to the $70 external purchase price for Y.',
    reference: 'Transfer Pricing; Goal Congruence',
  },

  // ==========================================
  // Balanced Scorecard Strategy Maps
  // ==========================================
  {
    id: 'cma1-c-036',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Balanced Scorecard',
    subtopic: 'Strategy Maps',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'In a Balanced Scorecard strategy map, which perspective typically forms the foundation that drives the others?',
    options: [
      'Financial',
      'Customer',
      'Internal Business Process',
      'Learning and Growth'
    ],
    correctAnswer: 3,
    explanation: 'Learning and Growth forms the foundation. Employee skills, technology, and culture (L&G) enable improved Internal Processes, which enhance Customer value, ultimately driving Financial results. The strategy map shows these bottom-up cause-effect relationships.',
    reference: 'Strategy Maps; Balanced Scorecard',
  },
  {
    id: 'cma1-c-037',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Balanced Scorecard',
    subtopic: 'Cause-Effect Relationships',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'A strategy map shows: Employee Training → Reduced Defects → Customer Satisfaction → Revenue Growth. If training increases but revenue does not grow, which hypothesis should be tested FIRST?',
    options: [
      'Whether training actually reduced defects',
      'Whether the financial measures are calculated correctly',
      'Whether competitors lowered prices',
      'Whether the BSC has enough measures'
    ],
    correctAnswer: 0,
    explanation: 'Strategy maps represent hypothesized cause-effect chains. When expected outcomes fail, test each link systematically starting from the beginning. First verify if training → defect reduction occurred. If yes, then test defects → satisfaction, then satisfaction → revenue. This validates or refines strategic assumptions.',
    reference: 'Strategy Hypothesis Testing; BSC',
  },
  {
    id: 'cma1-c-038',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Balanced Scorecard',
    subtopic: 'Strategic Themes',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A company pursuing a customer intimacy strategy should emphasize which BSC measures?',
    options: [
      'Cost per unit and capacity utilization',
      'Market share and new product time-to-market',
      'Customer retention rate and share of customer wallet',
      'Manufacturing cycle efficiency and defect rates'
    ],
    correctAnswer: 2,
    explanation: 'Customer intimacy focuses on deep relationships and customized solutions. Key metrics include customer retention (loyalty), share of wallet (customer\'s spending with us vs. competitors), customer lifetime value, and solution breadth. Cost leadership would focus on unit costs; product leadership on innovation speed.',
    reference: 'Strategic Themes; Customer Intimacy',
  },
  {
    id: 'cma1-c-039',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Balanced Scorecard',
    subtopic: 'Leading vs Lagging Indicators',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'In the Balanced Scorecard, employee skill levels and process improvement suggestions are:',
    options: [
      'Lagging indicators predicting future financial performance',
      'Leading indicators that drive future outcomes',
      'Diagnostic controls that detect errors',
      'Boundary systems that define limits'
    ],
    correctAnswer: 1,
    explanation: 'Employee capabilities and improvement suggestions are leading (driver) indicators. They predict future process improvements, customer satisfaction, and ultimately financial results. Lagging indicators like revenue and profit report past outcomes. A balanced approach uses both.',
    reference: 'Leading/Lagging Indicators; BSC',
  },

  // ==========================================
  // EVA and Value-Based Metrics
  // ==========================================
  {
    id: 'cma1-c-040',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Performance Measures',
    subtopic: 'Economic Value Added',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Division data: Operating income $2.5M, Total assets $15M, Current liabilities $3M, WACC 12%. What is EVA?',
    options: [
      '$700,000',
      '$1,060,000',
      '$1,300,000',
      '-$300,000'
    ],
    correctAnswer: 1,
    explanation: 'EVA = NOPAT - (Capital × WACC). Capital is typically total assets minus non-interest-bearing current liabilities = $15M - $3M = $12M invested capital. EVA = $2.5M - ($12M × 12%) = $2.5M - $1.44M = $1.06M or $1,060,000. Positive EVA means the division created shareholder value.',
    reference: 'Economic Value Added; Value-Based Management',
  },
  {
    id: 'cma1-c-041',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Performance Measures',
    subtopic: 'EVA Improvements',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'Which action would increase EVA without changing operating income?',
    options: [
      'Acquiring new equipment with positive NPV',
      'Reducing working capital by improving inventory turnover',
      'Increasing advertising expenses',
      'Reducing product prices to gain market share'
    ],
    correctAnswer: 1,
    explanation: 'EVA = NOPAT - (Capital × WACC). Reducing working capital (inventory, receivables) decreases invested capital, thereby reducing the capital charge. If operating income stays constant but capital decreases, EVA increases. This encourages efficient asset management.',
    reference: 'EVA Drivers; Capital Efficiency',
  },
  {
    id: 'cma1-c-042',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Performance Measures',
    subtopic: 'Residual Income',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Division has operating income $800,000, average assets $5M, required return 14%. A project offers 16% return on $1M investment. Under RI, should the division accept?',
    options: [
      'No, it lowers the divisional ROI',
      'Yes, it generates positive incremental RI',
      'No, it exceeds the hurdle rate',
      'Yes, only if it increases market share'
    ],
    correctAnswer: 1,
    explanation: 'Current ROI = $800K / $5M = 16%. Project ROI = 16%. Current RI = $800K - (14% × $5M) = $800K - $700K = $100K. Project RI = $1M × (16% - 14%) = $20K positive. New total RI = $100K + $20K = $120K. RI correctly accepts any project exceeding the hurdle rate, unlike ROI which may reject value-creating projects.',
    reference: 'Residual Income; ROI vs RI',
  },
  {
    id: 'cma1-c-043',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Performance Measures',
    subtopic: 'ROI vs RI Conflict',
    difficulty: 'easy',
    skillLevel: 'Evaluation',
    question: 'A division manager with 20% ROI is offered a project returning 18%. The company\'s cost of capital is 12%. Using ROI for evaluation, the manager will likely:',
    options: [
      'Accept, increasing divisional value',
      'Reject, to maintain high divisional ROI',
      'Accept, exceeding cost of capital',
      'Be indifferent between accepting or rejecting'
    ],
    correctAnswer: 1,
    explanation: 'This illustrates ROI\'s dysfunctional behavior. The 18% project exceeds the 12% cost of capital and should be accepted (creates value). However, accepting it dilutes the division\'s 20% ROI. A self-interested manager using ROI will reject a value-creating project. Residual income solves this by accepting any project above the hurdle rate.',
    reference: 'ROI Limitations; Suboptimization',
  },

  // ==========================================
  // Service Organization Performance
  // ==========================================
  {
    id: 'cma1-c-044',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Performance Measures',
    subtopic: 'Service Organizations',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'For a consulting firm, which metric best measures operational efficiency?',
    options: [
      'Total revenue per year',
      'Billable hours as a percentage of available hours (utilization rate)',
      'Number of partners',
      'Office square footage'
    ],
    correctAnswer: 1,
    explanation: 'Utilization rate (billable hours ÷ available hours) measures how efficiently a service firm uses its primary resource: professional time. High utilization indicates efficient deployment of professionals; low utilization means capacity waste. Revenue per professional hour is also valuable.',
    reference: 'Service Firm Metrics; Utilization',
  },
  {
    id: 'cma1-c-045',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Performance Measures',
    subtopic: 'Healthcare Metrics',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A hospital measuring "average length of stay" and "readmission rate within 30 days" is focusing on:',
    options: [
      'Revenue maximization',
      'Quality and efficiency of patient care',
      'Marketing effectiveness',
      'Employee satisfaction'
    ],
    correctAnswer: 1,
    explanation: 'Length of stay indicates care efficiency (shorter is better if outcomes are good). Readmission rate indicates care quality (lower is better, meaning patients were properly treated). Together, these balance efficiency with quality outcomes in healthcare settings.',
    reference: 'Healthcare Performance Metrics',
  },
  {
    id: 'cma1-c-046',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Performance Measures',
    subtopic: 'Service Quality',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The SERVQUAL model measures service quality across dimensions including:',
    options: [
      'Price, location, and advertising',
      'Reliability, responsiveness, assurance, empathy, and tangibles',
      'Revenue, cost, and profit',
      'Volume, price, and mix'
    ],
    correctAnswer: 1,
    explanation: 'SERVQUAL\'s five dimensions are: Reliability (dependable, accurate service), Responsiveness (willingness to help promptly), Assurance (knowledge, courtesy, trust), Empathy (caring, individualized attention), and Tangibles (facilities, equipment, appearance). These capture service quality comprehensively.',
    reference: 'SERVQUAL; Service Quality Measurement',
  },

  // ==========================================
  // Behavioral Aspects of Performance Evaluation
  // ==========================================
  {
    id: 'cma1-c-047',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Performance Evaluation',
    subtopic: 'Behavioral Aspects',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A manager focuses only on metrics in the performance evaluation, ignoring long-term investments. This is an example of:',
    options: [
      'Gaming the system (metric manipulation)',
      'Myopia (short-term focus)',
      'Misrepresentation',
      'Sandbagging'
    ],
    correctAnswer: 1,
    explanation: 'Myopia occurs when performance measures create incentives for short-term actions at the expense of long-term value. Cutting R&D or maintenance to boost current profits is classic myopic behavior. Solutions include using leading indicators and longer evaluation periods.',
    reference: 'Performance Measure Dysfunctions; Myopia',
  },
  {
    id: 'cma1-c-048',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Performance Evaluation',
    subtopic: 'Sandbagging',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'When managers intentionally set easily achievable targets to ensure bonus attainment, this is called:',
    options: [
      'Stretch goal setting',
      'Participative budgeting',
      'Budgetary slack or sandbagging',
      'Value-based management'
    ],
    correctAnswer: 2,
    explanation: 'Budgetary slack (sandbagging) occurs when managers understate expected performance to make targets easier to achieve. This is a dysfunctional outcome of linking compensation to budget attainment. Remedies include beyond-budget approaches, relative performance evaluation, and reduced emphasis on budget targets.',
    reference: 'Budgetary Slack; Performance Evaluation',
  },
  {
    id: 'cma1-c-049',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Performance Evaluation',
    subtopic: 'Relative Performance Evaluation',
    difficulty: 'easy',
    skillLevel: 'Evaluation',
    question: 'Evaluating a division against industry peer performance rather than fixed budgets helps address:',
    options: [
      'Transfer pricing disputes',
      'The impact of uncontrollable external factors',
      'Employee turnover',
      'Technology obsolescence'
    ],
    correctAnswer: 1,
    explanation: 'Relative Performance Evaluation (RPE) compares performance to peers facing similar external conditions (economy, industry trends). If all firms are affected by a recession, a manager beating peers performed well even if missing fixed budgets. RPE filters out uncontrollable factors more fairly.',
    reference: 'Relative Performance Evaluation; External Factors',
  },

  // ==========================================
  // Benchmarking and Best Practices
  // ==========================================
  {
    id: 'cma1-c-050',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Benchmarking',
    subtopic: 'Benchmarking Types',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Benchmarking that compares processes against world-class performers in any industry is called:',
    options: [
      'Internal benchmarking',
      'Competitive benchmarking',
      'Functional (generic) benchmarking',
      'Activity benchmarking'
    ],
    correctAnswer: 2,
    explanation: 'Functional (generic) benchmarking compares similar business functions or processes against best-in-class performers regardless of industry. For example, a manufacturer might benchmark its warehousing against Amazon. This provides breakthrough improvement ideas not available from industry competitors.',
    reference: 'Benchmarking Types; Best Practices',
  },
];

// Helper functions
export const getCMA1CQuestionsBatch2 = () => CMA1C_QUESTIONS_BATCH2;
export const getCMA1CQuestionCount2 = () => CMA1C_QUESTIONS_BATCH2.length;

export default CMA1C_QUESTIONS_BATCH2;

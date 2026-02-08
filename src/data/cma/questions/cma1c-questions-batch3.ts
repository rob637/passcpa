/**
 * CMA Part 1, Section C: Performance Management - Questions Batch 3 (Q51-75)
 * Weight: 20% of Part 1 Exam
 * 
 * Blueprint Areas:
 * - CMA1-C: Performance Management
 * 
 * Topics covered:
 * - Economic Value Added (EVA)
 * - Balanced Scorecard Advanced
 * - Transfer Pricing
 * - Benchmarking
 * - Key Performance Indicators (KPIs)
 * - Strategic Performance Measurement
 */

import { Question } from '../../../types';

export const CMA1C_QUESTIONS_BATCH3: Question[] = [
  // ==========================================
  // Economic Value Added (EVA)
  // ==========================================
  {
    id: 'cma1-c-051',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Economic Value Added',
    subtopic: 'EVA Calculation',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Alpha Division has NOPAT of $800,000 and invested capital of $5,000,000. The weighted-average cost of capital is 12%. What is EVA?',
    options: [
      '$200,000',
      '$800,000',
      '$600,000',
      '-$200,000'
    ],
    correctAnswer: 0,
    explanation: 'EVA = NOPAT - (Capital × WACC) = $800,000 - ($5,000,000 × 12%) = $800,000 - $600,000 = $200,000. Positive EVA indicates the division is creating value above its cost of capital.',
    reference: 'Economic Value Added; Stern Stewart',
  },
  {
    id: 'cma1-c-052',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Economic Value Added',
    subtopic: 'EVA Adjustments',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'When calculating EVA, R&D expenditures are typically:',
    options: [
      'Expensed as incurred per GAAP',
      'Capitalized and amortized to reflect economic reality',
      'Excluded entirely from the calculation',
      'Deducted from invested capital'
    ],
    correctAnswer: 1,
    explanation: 'EVA makes adjustments to GAAP accounting. R&D is capitalized and amortized because it provides future economic benefits. This prevents managers from cutting R&D to boost short-term profits.',
    reference: 'EVA Accounting Adjustments',
  },
  {
    id: 'cma1-c-053',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Economic Value Added',
    subtopic: 'EVA vs ROI',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Compared to ROI, EVA has which advantage?',
    options: [
      'EVA is easier to calculate',
      'EVA provides a dollar value instead of a percentage, reducing bias against large investments',
      'EVA uses market values instead of book values',
      'EVA ignores the cost of capital'
    ],
    correctAnswer: 1,
    explanation: 'EVA measures dollars of value created, while ROI measures percentage returns. Managers using ROI may reject value-creating projects that dilute their ROI. EVA encourages all projects exceeding cost of capital.',
    reference: 'EVA vs ROI Comparison',
  },
  {
    id: 'cma1-c-054',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Economic Value Added',
    subtopic: 'Market Value Added',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Market Value Added (MVA) is calculated as:',
    options: [
      'Market Value of Equity minus Book Value of Equity',
      'Market Value of Debt plus Market Value of Equity',
      'NOPAT minus Cost of Capital',
      'Current stock price times earnings per share'
    ],
    correctAnswer: 0,
    explanation: 'MVA = Market Value of Equity (or Firm) - Book Value of Invested Capital. It represents the total wealth created for shareholders above the capital invested in the firm.',
    reference: 'Market Value Added',
  },

  // ==========================================
  // Transfer Pricing
  // ==========================================
  {
    id: 'cma1-c-055',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Transfer Pricing',
    subtopic: 'Methods Overview',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Which transfer pricing method is MOST appropriate when an active external market exists for the transferred product?',
    options: [
      'Cost-based transfer price',
      'Negotiated transfer price',
      'Market-based transfer price',
      'Dual transfer price'
    ],
    correctAnswer: 2,
    explanation: 'When an external market exists, market price is generally best because it reflects fair value and promotes goal congruence. It treats internal transfers as if they were arm\'s-length transactions.',
    reference: 'Transfer Pricing Methods',
  },
  {
    id: 'cma1-c-056',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Transfer Pricing',
    subtopic: 'General Rule',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'The general transfer pricing rule states: Transfer Price = Variable Cost + Opportunity Cost. If variable cost is $30, the selling division has excess capacity, and external market price is $50, what is the minimum transfer price?',
    options: [
      '$50',
      '$30',
      '$40',
      '$20'
    ],
    correctAnswer: 1,
    explanation: 'With excess capacity, opportunity cost is zero (no lost sales). Minimum TP = $30 + $0 = $30. The selling division should accept any price above variable cost when it has idle capacity.',
    reference: 'General Transfer Pricing Rule',
  },
  {
    id: 'cma1-c-057',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Transfer Pricing',
    subtopic: 'No Excess Capacity',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A selling division operates at full capacity. Variable cost is $25, and the external selling price is $45. What is the minimum transfer price?',
    options: [
      '$25',
      '$35',
      '$45',
      '$70'
    ],
    correctAnswer: 2,
    explanation: 'At full capacity, the opportunity cost is the lost contribution margin: $45 - $25 = $20. Minimum TP = Variable Cost + Opportunity Cost = $25 + $20 = $45, which equals market price.',
    reference: 'Transfer Pricing at Full Capacity',
  },
  {
    id: 'cma1-c-058',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Transfer Pricing',
    subtopic: 'Dual Pricing',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Under a dual transfer pricing system:',
    options: [
      'Both divisions use market price',
      'The selling division records at cost plus markup, buying division records at a lower amount',
      'Transfer prices are set by an external arbitrator',
      'Prices are negotiated annually and fixed'
    ],
    correctAnswer: 1,
    explanation: 'Dual pricing allows different prices for buyer and seller: the seller might record at market price (motivating sales), while the buyer records at cost (encouraging internal purchases). The difference is eliminated in consolidation.',
    reference: 'Dual Transfer Pricing',
  },

  // ==========================================
  // Balanced Scorecard - Advanced
  // ==========================================
  {
    id: 'cma1-c-060',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Balanced Scorecard',
    subtopic: 'Leading vs Lagging Indicators',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Which is a LEADING indicator?',
    options: [
      'Return on investment',
      'Revenue growth',
      'Employee training hours',
      'Profit margin'
    ],
    correctAnswer: 2,
    explanation: 'Leading indicators predict future performance (training hours predict future capability). Lagging indicators measure past outcomes (ROI, revenue, profit). BSC combines both types.',
    reference: 'Leading and Lagging Indicators',
  },
  {
    id: 'cma1-c-061',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Balanced Scorecard',
    subtopic: 'Customer Perspective',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Which metric belongs in the Customer Perspective of the balanced scorecard?',
    options: [
      'Days sales outstanding',
      'Customer retention rate',
      'Employee turnover',
      'Inventory accuracy'
    ],
    correctAnswer: 1,
    explanation: 'Customer retention rate measures how well the company maintains customer relationships, a core Customer Perspective metric. DSO is financial, turnover is learning/growth, inventory is internal process.',
    reference: 'Balanced Scorecard Customer Perspective',
  },

  // ==========================================
  // Benchmarking
  // ==========================================
  {
    id: 'cma1-c-062',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Benchmarking',
    subtopic: 'Types of Benchmarking',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Competitive benchmarking compares a company\'s performance to:',
    options: [
      'Internal departments within the same company',
      'Best-in-class companies regardless of industry',
      'Direct competitors in the same industry',
      'Historical performance of the same company'
    ],
    correctAnswer: 2,
    explanation: 'Competitive benchmarking compares against direct industry competitors. Internal benchmarking compares within the company; best-in-class (or functional) looks at any industry leaders.',
    reference: 'Types of Benchmarking',
  },
  {
    id: 'cma1-c-063',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Benchmarking',
    subtopic: 'Best-in-Class',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A hospital benchmarking its patient scheduling process against a hotel reservation system is an example of:',
    options: [
      'Internal benchmarking',
      'Competitive benchmarking',
      'Functional (best-in-class) benchmarking',
      'Strategic benchmarking'
    ],
    correctAnswer: 2,
    explanation: 'Functional benchmarking looks at best practices from any industry for specific functions. A hotel\'s reservation expertise can inform hospital scheduling, even though they\'re different industries.',
    reference: 'Functional Benchmarking',
  },
  {
    id: 'cma1-c-064',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Benchmarking',
    subtopic: 'Process',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The FIRST step in the benchmarking process is to:',
    options: [
      'Identify benchmarking partners',
      'Determine what to benchmark',
      'Collect data from competitors',
      'Implement best practices'
    ],
    correctAnswer: 1,
    explanation: 'Benchmarking starts with identifying WHAT processes or metrics to benchmark. Then identify partners, collect data, analyze gaps, and implement improvements.',
    reference: 'Benchmarking Process Steps',
  },

  // ==========================================
  // Key Performance Indicators (KPIs)
  // ==========================================
  {
    id: 'cma1-c-065',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Key Performance Indicators',
    subtopic: 'KPI Characteristics',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Effective KPIs should be:',
    options: [
      'As numerous as possible to cover all activities',
      'Specific, measurable, and aligned with strategic objectives',
      'Based solely on financial metrics',
      'Changed weekly to maintain flexibility'
    ],
    correctAnswer: 1,
    explanation: 'Good KPIs are SMART: Specific, Measurable, Achievable, Relevant, and Time-bound. They should be limited in number and clearly linked to strategy.',
    reference: 'KPI Design Principles',
  },
  {
    id: 'cma1-c-066',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Key Performance Indicators',
    subtopic: 'Operational KPIs',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which KPI best measures manufacturing efficiency?',
    options: [
      'Net promoter score',
      'Revenue per employee',
      'Overall equipment effectiveness (OEE)',
      'Days payable outstanding'
    ],
    correctAnswer: 2,
    explanation: 'OEE measures manufacturing productivity by combining availability, performance, and quality rates. It shows how effectively equipment is being used. NPS is customer, revenue per employee is financial.',
    reference: 'Manufacturing KPIs',
  },
  {
    id: 'cma1-c-067',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Key Performance Indicators',
    subtopic: 'KPI Alignment',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A KPI that motivates suboptimal behavior for overall company goals demonstrates:',
    options: [
      'Goal congruence',
      'Dysfunctional behavior',
      'Continuous improvement',
      'Strategic alignment'
    ],
    correctAnswer: 1,
    explanation: 'Dysfunctional behavior occurs when KPIs incentivize actions that benefit a division but harm the overall organization. Proper KPI design should promote goal congruence.',
    reference: 'KPI and Goal Congruence',
  },

  // ==========================================
  // Responsibility Accounting
  // ==========================================
  {
    id: 'cma1-c-068',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Responsibility Accounting',
    subtopic: 'Responsibility Centers',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'An investment center manager is responsible for:',
    options: [
      'Costs only',
      'Revenues only',
      'Costs and revenues',
      'Costs, revenues, and capital investment decisions'
    ],
    correctAnswer: 3,
    explanation: 'Investment center managers control costs, revenues, AND capital investment decisions. This is the broadest responsibility level. Cost centers control costs; profit centers control costs and revenues.',
    reference: 'Responsibility Centers',
  },
  {
    id: 'cma1-c-069',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Responsibility Accounting',
    subtopic: 'Controllable Costs',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'For performance evaluation purposes, managers should be evaluated on:',
    options: [
      'All costs allocated to their department',
      'Only those costs and revenues they can significantly influence',
      'Company-wide performance metrics only',
      'Fixed costs exclusively'
    ],
    correctAnswer: 1,
    explanation: 'Controllability principle: Managers should be evaluated only on items they can significantly control. Evaluating on uncontrollable items demotivates managers and distorts performance assessment.',
    reference: 'Controllability Principle',
  },

  // ==========================================
  // Variance Analysis Advanced
  // ==========================================
  {
    id: 'cma1-c-070',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Variance Analysis',
    subtopic: 'Sales Mix Variance',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Fox Corp. budgeted to sell 60% Product A (contribution $40) and 40% Product B (contribution $25). Actual mix was 50% each. Total units sold were 10,000 as budgeted. What is the sales mix variance?',
    options: [
      '$7,500 Favorable',
      '$7,500 Unfavorable',
      '$15,000 Unfavorable',
      '$15,000 Favorable'
    ],
    correctAnswer: 1,
    explanation: 'Budget: 6,000 A × $40 + 4,000 B × $25 = $340,000. Actual mix at budget contribution: 5,000 A × $40 + 5,000 B × $25 = $325,000. Mix variance = $325,000 - $340,000 = $15,000 U. Per the answer format: ($340K - $325K) = $15,000 Unfavorable due to shift to lower-margin product.',
    reference: 'Sales Mix Variance',
  },
  {
    id: 'cma1-c-071',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Variance Analysis',
    subtopic: 'Market Share Variance',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Grant Co. budgeted 25% market share in an industry with expected sales of 100,000 units. Actual industry sales were 120,000 units; Grant\'s actual sales were 28,000 units. Budgeted contribution per unit is $30. What is the market share variance?',
    options: [
      '$60,000 Favorable',
      '$60,000 Unfavorable',
      '$90,000 Favorable',
      '$30,000 Unfavorable'
    ],
    correctAnswer: 1,
    explanation: 'Expected sales at budgeted 25% market share applied to actual industry volume: 120,000 × 25% = 30,000 units. Actual sales = 28,000 units. Market share variance = (Actual units − Expected units) × Budgeted CM per unit = (28,000 − 30,000) × $30 = −$60,000 = $60,000 Unfavorable. Grant achieved only 23.3% market share vs. the 25% budget, losing 2,000 units of contribution. The separate market size variance = (120,000 − 100,000) × 25% × $30 = $150,000 Favorable, partially offsetting the share shortfall.',
    reference: 'Market Share Variance',
  },

  // ==========================================
  // Quality Metrics
  // ==========================================
  {
    id: 'cma1-c-072',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Quality Metrics',
    subtopic: 'Cost of Quality',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Which cost category includes warranty repairs and customer returns?',
    options: [
      'Prevention costs',
      'Appraisal costs',
      'Internal failure costs',
      'External failure costs'
    ],
    correctAnswer: 3,
    explanation: 'External failure costs are incurred after defective products reach customers: warranties, repairs, returns, lawsuits, lost sales. Internal failures (scrap, rework) occur before shipment.',
    reference: 'Cost of Quality Categories',
  },
  {
    id: 'cma1-c-073',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Quality Metrics',
    subtopic: 'Six Sigma',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A Six Sigma process has a defect rate of approximately:',
    options: [
      '1% (1 in 100)',
      '0.1% (1 in 1,000)',
      '3.4 per million opportunities',
      '34 per million opportunities'
    ],
    correctAnswer: 2,
    explanation: 'Six Sigma quality means 3.4 defects per million opportunities (DPMO), representing near-perfection. The name comes from fitting six standard deviations between the process mean and specification limits.',
    reference: 'Six Sigma Quality',
  },

  // ==========================================
  // Productivity Measures
  // ==========================================
  {
    id: 'cma1-c-074',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Productivity',
    subtopic: 'Partial Productivity',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A factory produced 50,000 units using 10,000 labor hours. Labor productivity is:',
    options: [
      '0.2 units per hour',
      '5 units per hour',
      '500,000 unit-hours',
      '0.5 hours per unit'
    ],
    correctAnswer: 1,
    explanation: 'Labor productivity = Output / Labor Input = 50,000 units / 10,000 hours = 5 units per labor hour. This is a partial productivity measure focusing on one input.',
    reference: 'Partial Productivity Measures',
  },
  {
    id: 'cma1-c-075',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Productivity',
    subtopic: 'Total Factor Productivity',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'Total factor productivity (TFP) differs from partial productivity in that TFP:',
    options: [
      'Focuses on a single input like labor',
      'Measures output relative to ALL inputs combined',
      'Ignores capital investments',
      'Is always higher than partial productivity'
    ],
    correctAnswer: 1,
    explanation: 'TFP measures output relative to all inputs (labor, capital, materials, energy). Partial productivity isolates one input. TFP provides a more comprehensive view but is harder to calculate.',
    reference: 'Total Factor Productivity',
  },
];

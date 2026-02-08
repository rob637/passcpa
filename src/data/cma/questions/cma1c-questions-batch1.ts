/**
 * CMA Part 1, Section C: Performance Management - Questions Batch 1 (Q1-25)
 * Weight: 20% of Part 1 Exam
 * 
 * Blueprint Areas:
 * - CMA1-C: Performance Management
 * 
 * Topics covered:
 * - Cost and Variance Measures
 * - Responsibility Centers
 * - Performance Measures
 * - Balanced Scorecard
 * - Key Performance Indicators (KPIs)
 */

import { Question } from '../../../types';

export const CMA1C_QUESTIONS_BATCH1: Question[] = [
  // ==========================================
  // Cost and Variance Measures
  // ==========================================
  {
    id: 'cma1-c-001',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Variance Analysis',
    subtopic: 'Direct Materials Variances',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The direct materials price variance is calculated as:',
    options: [
      '(Actual quantity × Actual price) - (Standard quantity × Standard price)',
      '(Actual price - Standard price) × Actual quantity purchased',
      '(Actual quantity - Standard quantity) × Standard price',
      '(Standard price - Actual price) × Standard quantity'
    ],
    correctAnswer: 1,
    explanation: 'Materials Price Variance = (Actual Price - Standard Price) × Actual Quantity Purchased. This isolates the variance due to paying a different price than standard for the actual quantity purchased.',
    reference: 'Standard Costing; IMA CMA Content',
  },
  {
    id: 'cma1-c-002',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Variance Analysis',
    subtopic: 'Direct Materials Variances',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'ABC Company produced 1,000 units. The standard is 3 lbs per unit at $5/lb. Actual: 3,200 lbs purchased and used at $4.80/lb. What is the materials quantity (usage) variance?',
    options: [
      '$1,000 Unfavorable',
      '$1,000 Favorable',
      '$640 Favorable',
      '$640 Unfavorable'
    ],
    correctAnswer: 0,
    explanation: 'Standard qty allowed = 1,000 units × 3 lbs = 3,000 lbs. Materials Quantity Variance = (Actual qty - Standard qty allowed) × Standard price = (3,200 - 3,000) × $5 = 200 × $5 = $1,000 Unfavorable (used more than standard).',
    reference: 'Standard Costing; Variance Analysis',
  },
  {
    id: 'cma1-c-003',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Variance Analysis',
    subtopic: 'Direct Labor Variances',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A favorable labor rate variance could result from:',
    options: [
      'Using higher-skilled workers than planned',
      'Using lower-skilled workers than planned',
      'Taking longer than standard to complete the work',
      'Producing fewer units than planned'
    ],
    correctAnswer: 1,
    explanation: 'A favorable labor rate variance occurs when the actual rate paid is less than the standard rate. Using lower-skilled (and therefore lower-paid) workers would create a favorable rate variance, though it may cause an unfavorable efficiency variance.',
    reference: 'Standard Costing; Labor Variances',
  },
  {
    id: 'cma1-c-004',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Variance Analysis',
    subtopic: 'Direct Labor Variances',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'DEF Company produced 500 units. Standard: 2 hours per unit at $15/hour. Actual: 1,100 hours at $14.50/hour. What is the labor efficiency variance?',
    options: [
      '$1,500 Unfavorable',
      '$1,450 Unfavorable',
      '$1,500 Favorable',
      '$1,450 Favorable'
    ],
    correctAnswer: 0,
    explanation: 'Standard hours allowed = 500 × 2 = 1,000 hours. Labor Efficiency Variance = (Actual hours - Standard hours allowed) × Standard rate = (1,100 - 1,000) × $15 = 100 × $15 = $1,500 Unfavorable (took more time than standard).',
    reference: 'Standard Costing; Labor Variances',
  },
  {
    id: 'cma1-c-005',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Variance Analysis',
    subtopic: 'Overhead Variances',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The variable overhead efficiency variance uses the same quantity measure as the:',
    options: [
      'Materials price variance',
      'Labor rate variance',
      'Labor efficiency variance',
      'Fixed overhead budget variance'
    ],
    correctAnswer: 2,
    explanation: 'Variable overhead efficiency variance uses the difference between actual hours and standard hours allowed (same as labor efficiency variance) multiplied by the standard variable overhead rate. It measures overhead variance due to labor efficiency.',
    reference: 'Overhead Variances; Standard Costing',
  },
  {
    id: 'cma1-c-006',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Variance Analysis',
    subtopic: 'Fixed Overhead Variances',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'The fixed overhead volume variance is caused by:',
    options: [
      'Spending more on fixed costs than budgeted',
      'Producing a different number of units than the denominator level used to set the overhead rate',
      'Using more direct labor hours than standard',
      'Paying higher prices for overhead items'
    ],
    correctAnswer: 1,
    explanation: 'The volume variance occurs when actual production differs from the denominator volume used to calculate the predetermined fixed overhead rate. It represents under/over-applied fixed overhead due to production volume differences.',
    reference: 'Fixed Overhead Variances; Standard Costing',
  },

  // ==========================================
  // Responsibility Centers
  // ==========================================
  {
    id: 'cma1-c-007',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Responsibility Centers',
    subtopic: 'Types of Centers',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A manager who is responsible for costs but not revenues manages a:',
    options: [
      'Revenue center',
      'Cost center',
      'Profit center',
      'Investment center'
    ],
    correctAnswer: 1,
    explanation: 'A cost center manager is responsible for costs only. Revenue center managers are responsible for revenues. Profit center managers are responsible for both revenues and costs. Investment center managers are responsible for revenues, costs, and investment in assets.',
    reference: 'Responsibility Accounting; IMA CMA Content',
  },
  {
    id: 'cma1-c-008',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Responsibility Centers',
    subtopic: 'Investment Centers',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Return on Investment (ROI) is calculated as:',
    options: [
      'Operating income ÷ Total revenue',
      'Net income ÷ Total assets',
      'Operating income ÷ Average operating assets',
      'Net income ÷ Sales'
    ],
    correctAnswer: 2,
    explanation: 'ROI = Operating Income ÷ Average Operating Assets. It measures how efficiently a division uses its invested capital to generate operating profit. Average assets are typically used to account for changes during the period.',
    reference: 'Investment Center Performance; ROI',
  },
  {
    id: 'cma1-c-009',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Responsibility Centers',
    subtopic: 'ROI DuPont Analysis',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Using the DuPont formula, ROI can be decomposed into:',
    options: [
      'Profit margin × Asset turnover',
      'Revenue × Expenses',
      'Gross profit × Operating expenses',
      'Net income × Total assets'
    ],
    correctAnswer: 0,
    explanation: 'DuPont formula: ROI = Profit Margin × Asset Turnover = (Operating Income/Sales) × (Sales/Average Operating Assets). This helps identify whether profitability or asset utilization is driving performance.',
    reference: 'DuPont Analysis; ROI Decomposition',
  },
  {
    id: 'cma1-c-010',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Responsibility Centers',
    subtopic: 'Residual Income',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Division X has operating income of $500,000, average operating assets of $2,000,000, and a required return of 15%. What is the residual income?',
    options: [
      '$200,000',
      '$300,000',
      '$500,000',
      '25%'
    ],
    correctAnswer: 0,
    explanation: 'Residual Income = Operating Income - (Required Return × Average Operating Assets) = $500,000 - (15% × $2,000,000) = $500,000 - $300,000 = $200,000.',
    reference: 'Residual Income; IMA CMA Content',
  },
  {
    id: 'cma1-c-011',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Responsibility Centers',
    subtopic: 'EVA',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Economic Value Added (EVA) differs from residual income primarily because EVA:',
    options: [
      'Uses net income instead of operating income',
      'Does not consider the cost of capital',
      'Uses after-tax operating income and makes adjustments to GAAP accounting',
      'Only applies to manufacturing companies'
    ],
    correctAnswer: 2,
    explanation: 'EVA uses after-tax operating income (NOPAT) and makes specific adjustments to GAAP accounting (such as for R&D and operating leases) to reflect economic reality. Basic residual income typically uses GAAP operating income without adjustments.',
    reference: 'Economic Value Added (EVA); IMA CMA Content',
  },

  // ==========================================
  // Balanced Scorecard
  // ==========================================
  {
    id: 'cma1-c-012',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Balanced Scorecard',
    subtopic: 'Four Perspectives',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Which of the following is NOT one of the four perspectives of the Balanced Scorecard?',
    options: [
      'Financial',
      'Customer',
      'Competitor',
      'Learning and Growth'
    ],
    correctAnswer: 2,
    explanation: 'The four Balanced Scorecard perspectives are: Financial, Customer, Internal Business Process, and Learning and Growth. Competitor analysis is part of strategic planning but not a BSC perspective.',
    reference: 'Balanced Scorecard; Kaplan and Norton',
  },
  {
    id: 'cma1-c-013',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Balanced Scorecard',
    subtopic: 'Customer Perspective',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Customer satisfaction scores, market share, and customer retention rate are metrics for which Balanced Scorecard perspective?',
    options: [
      'Financial',
      'Customer',
      'Internal Business Process',
      'Learning and Growth'
    ],
    correctAnswer: 1,
    explanation: 'The Customer perspective focuses on how the organization appears to customers. Metrics include customer satisfaction, retention, acquisition, market share, and profitability by customer segment.',
    reference: 'Balanced Scorecard; Customer Perspective',
  },
  {
    id: 'cma1-c-014',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Balanced Scorecard',
    subtopic: 'Internal Process Perspective',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Cycle time, defect rates, and process efficiency are metrics for which Balanced Scorecard perspective?',
    options: [
      'Financial',
      'Customer',
      'Internal Business Process',
      'Learning and Growth'
    ],
    correctAnswer: 2,
    explanation: 'The Internal Business Process perspective focuses on the processes at which the organization must excel. Metrics include cycle time, quality (defect rates), cost, and throughput of key processes.',
    reference: 'Balanced Scorecard; Internal Process Perspective',
  },
  {
    id: 'cma1-c-015',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Balanced Scorecard',
    subtopic: 'Learning and Growth',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Employee training hours, employee satisfaction, and information system capabilities are metrics for which perspective?',
    options: [
      'Financial',
      'Customer',
      'Internal Business Process',
      'Learning and Growth'
    ],
    correctAnswer: 3,
    explanation: 'The Learning and Growth perspective focuses on the organization\'s ability to innovate and improve. It includes employee capabilities (skills, training), information systems, and organizational culture/alignment.',
    reference: 'Balanced Scorecard; Learning and Growth Perspective',
  },
  {
    id: 'cma1-c-016',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Balanced Scorecard',
    subtopic: 'Strategy Maps',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A strategy map in the Balanced Scorecard framework:',
    options: [
      'Shows only financial metrics',
      'Illustrates cause-and-effect relationships between objectives across perspectives',
      'Is used only for manufacturing companies',
      'Replaces the need for financial statements'
    ],
    correctAnswer: 1,
    explanation: 'A strategy map visually shows the cause-and-effect relationships between strategic objectives across all four BSC perspectives. For example: Employee training (L&G) → Better processes (IBP) → Higher satisfaction (Customer) → Better profits (Financial).',
    reference: 'Strategy Maps; Balanced Scorecard',
  },

  // ==========================================
  // Key Performance Indicators (KPIs)
  // ==========================================
  {
    id: 'cma1-c-017',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Performance Measures',
    subtopic: 'KPI Characteristics',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Effective Key Performance Indicators (KPIs) should be:',
    options: [
      'Numerous to cover all possible activities',
      'Focused on past performance only',
      'Specific, measurable, and aligned with strategic objectives',
      'Changed frequently to keep employees motivated'
    ],
    correctAnswer: 2,
    explanation: 'Effective KPIs should be SMART: Specific, Measurable, Achievable, Relevant (aligned with strategy), and Time-bound. Having too many KPIs dilutes focus, and KPIs should be stable enough for meaningful comparison.',
    reference: 'Key Performance Indicators; IMA CMA Content',
  },
  {
    id: 'cma1-c-018',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Performance Measures',
    subtopic: 'Leading vs Lagging Indicators',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Customer satisfaction scores are best described as a:',
    options: [
      'Leading indicator that predicts future financial performance',
      'Lagging indicator that reflects past financial performance',
      'Neither leading nor lagging',
      'Financial metric'
    ],
    correctAnswer: 0,
    explanation: 'Customer satisfaction is a leading indicator - it predicts future results. Satisfied customers are more likely to buy again (future revenue). Lagging indicators (like revenue) report what has already happened.',
    reference: 'Leading and Lagging Indicators; Performance Measurement',
  },
  {
    id: 'cma1-c-019',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Performance Measures',
    subtopic: 'Transfer Pricing',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'When there is an intermediate market for a transferred product, the optimal transfer price is generally:',
    options: [
      'Full cost plus markup',
      'Variable cost only',
      'Market price minus selling costs avoided',
      'Negotiated price between divisions'
    ],
    correctAnswer: 2,
    explanation: 'When an external market exists, the optimal transfer price is the market price less any selling/distribution costs avoided by internal transfer. This ensures proper decision-making that benefits the entire company.',
    reference: 'Transfer Pricing; IMA CMA Content',
  },
  {
    id: 'cma1-c-020',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Performance Measures',
    subtopic: 'Transfer Pricing',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A disadvantage of using full cost as a transfer price is that:',
    options: [
      'It is too simple to calculate',
      'It does not provide incentive for the selling division to control costs',
      'It always maximizes company profit',
      'It is not allowed under tax regulations'
    ],
    correctAnswer: 1,
    explanation: 'When transfer prices are set at full cost, the selling division has no incentive to reduce costs because all costs are passed to the buying division. The selling division shows no profit, providing no motivation for efficiency.',
    reference: 'Transfer Pricing Methods',
  },

  // ==========================================
  // Additional Performance Management Topics
  // ==========================================
  {
    id: 'cma1-c-021',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Performance Measures',
    subtopic: 'Quality Costs',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Inspection and testing costs are classified as:',
    options: [
      'Prevention costs',
      'Appraisal costs',
      'Internal failure costs',
      'External failure costs'
    ],
    correctAnswer: 1,
    explanation: 'Appraisal costs are incurred to detect defects before products are shipped. They include inspection, testing, quality audits, and supplier evaluation. Prevention costs are spent to prevent defects from occurring.',
    reference: 'Quality Costs; Cost of Quality',
  },
  {
    id: 'cma1-c-022',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Performance Measures',
    subtopic: 'Quality Costs',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Warranty repair costs and customer returns are classified as:',
    options: [
      'Prevention costs',
      'Appraisal costs',
      'Internal failure costs',
      'External failure costs'
    ],
    correctAnswer: 3,
    explanation: 'External failure costs occur after defective products reach customers. They include warranty repairs, returns, recalls, liability costs, and lost customer goodwill. These are typically the most expensive quality costs.',
    reference: 'Quality Costs; External Failure',
  },
  {
    id: 'cma1-c-023',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Variance Analysis',
    subtopic: 'Variance Investigation',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Management should investigate a variance when:',
    options: [
      'Any variance occurs, regardless of size',
      'The variance exceeds a pre-determined threshold (material variance)',
      'Only favorable variances occur',
      'The variance is exactly as expected'
    ],
    correctAnswer: 1,
    explanation: 'Investigating all variances is impractical. Management should investigate significant (material) variances that exceed established thresholds. Materiality considers the dollar amount, percentage of budget, trend, and controllability.',
    reference: 'Variance Investigation; Management by Exception',
  },
  {
    id: 'cma1-c-024',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Responsibility Centers',
    subtopic: 'Controllability Principle',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The controllability principle states that managers should be evaluated only on:',
    options: [
      'Total company profit',
      'Factors they can control or significantly influence',
      'Market share compared to competitors',
      'Prior year performance'
    ],
    correctAnswer: 1,
    explanation: 'The controllability principle holds that managers should be evaluated only on revenues, costs, and investments they can control or significantly influence. Evaluating managers on uncontrollable factors is unfair and demotivating.',
    reference: 'Controllability Principle; Responsibility Accounting',
  },
  {
    id: 'cma1-c-025',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-C',
    topic: 'Performance Measures',
    subtopic: 'Benchmarking',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Benchmarking involves:',
    options: [
      'Setting minimum performance standards only',
      'Comparing performance to industry best practices or competitors',
      'Using only internal historical data',
      'Eliminating all performance measurement'
    ],
    correctAnswer: 1,
    explanation: 'Benchmarking compares an organization\'s performance, processes, or practices against industry best practices, competitors, or other organizations. It helps identify improvement opportunities and set meaningful targets.',
    reference: 'Benchmarking; Performance Measurement',
  },
];

// Helper functions
export const getCMA1CQuestionsBatch1 = () => CMA1C_QUESTIONS_BATCH1;
export const getCMA1CQuestionCount = () => CMA1C_QUESTIONS_BATCH1.length;

export default CMA1C_QUESTIONS_BATCH1;

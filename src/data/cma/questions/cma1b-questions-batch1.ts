/**
 * CMA Part 1, Section B: Planning, Budgeting, and Forecasting - Questions Batch 1 (Q1-25)
 * Weight: 20% of Part 1 Exam
 * 
 * Blueprint Areas:
 * - CMA1-B: Planning, Budgeting, and Forecasting
 * 
 * Topics covered:
 * - Strategic Planning
 * - Budgeting Concepts
 * - Master Budget Components
 * - Flexible Budgets
 * - Forecasting Techniques
 * - Pro Forma Statements
 */

import { Question } from '../../../types';

export const CMA1B_QUESTIONS_BATCH1: Question[] = [
  // ==========================================
  // Strategic Planning
  // ==========================================
  {
    id: 'cma1-b-001',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Strategic Planning',
    subtopic: 'Planning Process',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Which of the following is the FIRST step in the strategic planning process?',
    options: [
      'Develop action plans',
      'Analyze the external and internal environment',
      'Define the mission and vision',
      'Allocate resources to strategies'
    ],
    correctAnswer: 2,
    explanation: 'Strategic planning begins with defining the organization\'s mission (purpose) and vision (future aspirations). Environmental analysis comes after to understand how to achieve that mission and vision.',
    reference: 'IMA CMA Content Specification; Strategic Management',
  },
  {
    id: 'cma1-b-002',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Strategic Planning',
    subtopic: 'SWOT Analysis',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'In a SWOT analysis, which of the following is an INTERNAL factor?',
    options: [
      'New government regulations',
      'Competitor actions',
      'Company\'s skilled workforce',
      'Economic recession'
    ],
    correctAnswer: 2,
    explanation: 'SWOT divides factors into internal (Strengths, Weaknesses) and external (Opportunities, Threats). A skilled workforce is an internal strength. Government regulations, competitors, and economic conditions are external factors.',
    reference: 'Strategic Management; SWOT Analysis Framework',
  },
  {
    id: 'cma1-b-003',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Strategic Planning',
    subtopic: 'Porter\'s Five Forces',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which of Porter\'s Five Forces analyzes the power of buyers and suppliers?',
    options: [
      'Threat of new entrants only',
      'Bargaining power of suppliers AND bargaining power of buyers',
      'Competitive rivalry only',
      'Threat of substitute products'
    ],
    correctAnswer: 1,
    explanation: 'Porter\'s Five Forces includes: (1) Threat of new entrants, (2) Bargaining power of suppliers, (3) Bargaining power of buyers, (4) Threat of substitutes, (5) Competitive rivalry. The question asks about buyer and supplier power, which are two separate forces.',
    reference: 'Porter\'s Five Forces Framework',
  },

  // ==========================================
  // Budgeting Concepts
  // ==========================================
  {
    id: 'cma1-b-004',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Budgeting Concepts',
    subtopic: 'Benefits of Budgeting',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Which of the following is NOT a primary benefit of budgeting?',
    options: [
      'Coordination of activities across departments',
      'Communication of management plans',
      'Elimination of all operating variances',
      'Performance evaluation benchmark'
    ],
    correctAnswer: 2,
    explanation: 'Budgeting cannot eliminate all variances - actual results will always differ from budgets due to changing conditions. Budgets provide coordination, communication, planning, and a benchmark for evaluating performance.',
    reference: 'IMA CMA Content; Management Accounting',
  },
  {
    id: 'cma1-b-005',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Budgeting Concepts',
    subtopic: 'Budget Types',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A budget that is continuously updated by adding a new month as the current month ends is called a:',
    options: [
      'Static budget',
      'Flexible budget',
      'Rolling (continuous) budget',
      'Zero-based budget'
    ],
    correctAnswer: 2,
    explanation: 'A rolling or continuous budget always covers a fixed time horizon (e.g., 12 months) by adding a new period as each current period ends. This keeps planning horizons constant and current.',
    reference: 'IMA CMA Content Specification',
  },
  {
    id: 'cma1-b-006',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Budgeting Concepts',
    subtopic: 'Zero-Based Budgeting',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Zero-based budgeting requires that:',
    options: [
      'All budgets start at zero and every expense must be justified each period',
      'The budget must balance to zero profit',
      'No cash balance be maintained',
      'Managers receive no salary increases'
    ],
    correctAnswer: 0,
    explanation: 'Zero-based budgeting (ZBB) starts from zero each period and requires justification for ALL expenses, not just increases from prior year. This differs from incremental budgeting which uses the prior period as a base.',
    reference: 'Zero-Based Budgeting; IMA CMA Content',
  },
  {
    id: 'cma1-b-007',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Budgeting Concepts',
    subtopic: 'Participative Budgeting',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A potential disadvantage of participative (bottom-up) budgeting is:',
    options: [
      'Lack of employee buy-in',
      'Budgetary slack or padding',
      'Top management disengagement',
      'Faster budget preparation'
    ],
    correctAnswer: 1,
    explanation: 'When employees participate in setting their own budgets, they may intentionally underestimate revenues or overestimate expenses (slack/padding) to make targets easier to achieve. This makes budgets less accurate.',
    reference: 'Participative Budgeting; IMA CMA Content',
  },

  // ==========================================
  // Master Budget Components
  // ==========================================
  {
    id: 'cma1-b-008',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Master Budget',
    subtopic: 'Budget Sequence',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'In the master budget process, which budget is typically prepared FIRST?',
    options: [
      'Production budget',
      'Direct materials budget',
      'Sales budget',
      'Cash budget'
    ],
    correctAnswer: 2,
    explanation: 'The sales budget is prepared first because it drives all other operating budgets. Production depends on sales, materials depend on production, and cash depends on all operating activities. Sales is the foundation.',
    reference: 'Master Budget Preparation; IMA CMA Content',
  },
  {
    id: 'cma1-b-009',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Master Budget',
    subtopic: 'Production Budget',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'ABC Company plans to sell 10,000 units. Beginning finished goods inventory is 2,000 units, and the desired ending inventory is 3,000 units. How many units must be produced?',
    options: [
      '9,000 units',
      '10,000 units',
      '11,000 units',
      '15,000 units'
    ],
    correctAnswer: 2,
    explanation: 'Production = Sales + Desired Ending Inventory - Beginning Inventory = 10,000 + 3,000 - 2,000 = 11,000 units. You need enough production to cover sales and build up ending inventory.',
    reference: 'Production Budget; IMA CMA Content',
  },
  {
    id: 'cma1-b-010',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Master Budget',
    subtopic: 'Direct Materials Budget',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'XYZ Company needs 5 pounds of material per unit and plans to produce 8,000 units. Beginning material inventory is 4,000 pounds, and the desired ending inventory is 6,000 pounds. How many pounds of material should be purchased?',
    options: [
      '40,000 pounds',
      '42,000 pounds',
      '38,000 pounds',
      '44,000 pounds'
    ],
    correctAnswer: 1,
    explanation: 'Materials needed for production = 8,000 units × 5 lbs = 40,000 lbs. Purchases = Materials needed + Desired ending - Beginning = 40,000 + 6,000 - 4,000 = 42,000 pounds.',
    reference: 'Direct Materials Budget; IMA CMA Content',
  },
  {
    id: 'cma1-b-011',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Master Budget',
    subtopic: 'Cash Budget',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Which of the following is typically NOT included in the cash budget?',
    options: [
      'Cash collections from customers',
      'Cash payments to suppliers',
      'Depreciation expense',
      'Dividend payments'
    ],
    correctAnswer: 2,
    explanation: 'Depreciation is a non-cash expense and is NOT included in the cash budget. The cash budget includes only cash inflows (collections) and cash outflows (payments for supplies, wages, dividends, interest, etc.).',
    reference: 'Cash Budget; IMA CMA Content',
  },
  {
    id: 'cma1-b-012',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Master Budget',
    subtopic: 'Collections Pattern',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'DEF Company has credit sales of $100,000 in January and $120,000 in February. Collections are 60% in the month of sale and 40% in the following month. What are February cash collections from credit sales?',
    options: [
      '$72,000',
      '$112,000',
      '$88,000',
      '$100,000'
    ],
    correctAnswer: 1,
    explanation: 'February collections = 60% of Feb sales + 40% of Jan sales = (0.60 × $120,000) + (0.40 × $100,000) = $72,000 + $40,000 = $112,000.',
    reference: 'Cash Budget; Collection Patterns',
  },

  // ==========================================
  // Flexible Budgets
  // ==========================================
  {
    id: 'cma1-b-013',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Flexible Budgets',
    subtopic: 'Definition',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A flexible budget is a budget that:',
    options: [
      'Can be changed by management at any time',
      'Adjusts for changes in activity levels',
      'Has no fixed costs',
      'Is prepared only for cash flows'
    ],
    correctAnswer: 1,
    explanation: 'A flexible budget adjusts budgeted amounts to reflect actual activity levels. Unlike a static budget (which is fixed at one activity level), a flexible budget allows for fair comparisons by using the actual volume achieved.',
    reference: 'Flexible Budgeting; IMA CMA Content',
  },
  {
    id: 'cma1-b-014',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Flexible Budgets',
    subtopic: 'Calculation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A company has fixed costs of $50,000 and variable costs of $10 per unit. If 8,000 units are produced, what is the total flexible budget amount?',
    options: [
      '$80,000',
      '$130,000',
      '$50,000',
      '$90,000'
    ],
    correctAnswer: 1,
    explanation: 'Flexible budget = Fixed costs + (Variable cost per unit × Actual units) = $50,000 + ($10 × 8,000) = $50,000 + $80,000 = $130,000.',
    reference: 'Flexible Budgeting; IMA CMA Content',
  },
  {
    id: 'cma1-b-015',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Flexible Budgets',
    subtopic: 'Variance Analysis',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The volume variance (or activity variance) is the difference between:',
    options: [
      'Actual results and the flexible budget',
      'The static budget and the flexible budget',
      'Actual sales price and standard sales price',
      'Actual costs and standard costs'
    ],
    correctAnswer: 1,
    explanation: 'Volume variance = Static budget - Flexible budget. It measures the effect of producing/selling a different quantity than planned. The flexible budget variance compares actual to flexible budget (same volume).',
    reference: 'Variance Analysis; IMA CMA Content',
  },

  // ==========================================
  // Forecasting Techniques
  // ==========================================
  {
    id: 'cma1-b-016',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Forecasting',
    subtopic: 'Qualitative Methods',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The Delphi method of forecasting:',
    options: [
      'Uses historical data and regression analysis',
      'Gathers anonymous expert opinions through multiple rounds',
      'Calculates seasonal indices',
      'Uses only the most recent data point'
    ],
    correctAnswer: 1,
    explanation: 'The Delphi method is a qualitative forecasting technique that uses anonymous expert opinions gathered over multiple rounds. Experts revise their forecasts after seeing summarized group responses until convergence is reached.',
    reference: 'Forecasting Methods; IMA CMA Content',
  },
  {
    id: 'cma1-b-017',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Forecasting',
    subtopic: 'Time Series Analysis',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A moving average forecast smooths out fluctuations by:',
    options: [
      'Weighting recent observations more heavily',
      'Averaging a set number of the most recent observations',
      'Using regression to predict future values',
      'Eliminating all seasonal patterns'
    ],
    correctAnswer: 1,
    explanation: 'A simple moving average forecasts by averaging a fixed number of the most recent observations. For example, a 3-month moving average uses the average of the last 3 months to forecast the next month.',
    reference: 'Time Series Forecasting; IMA CMA Content',
  },
  {
    id: 'cma1-b-018',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Forecasting',
    subtopic: 'Exponential Smoothing',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'In exponential smoothing, a higher smoothing constant (alpha) means:',
    options: [
      'More weight on older observations',
      'More weight on recent observations',
      'Equal weight on all observations',
      'No weight on any observations'
    ],
    correctAnswer: 1,
    explanation: 'The smoothing constant (alpha) ranges from 0 to 1. A higher alpha gives more weight to recent observations (more responsive to changes). A lower alpha gives more weight to historical data (more stable forecasts).',
    reference: 'Exponential Smoothing; Forecasting',
  },
  {
    id: 'cma1-b-019',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Forecasting',
    subtopic: 'Regression Analysis',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'In simple linear regression (Y = a + bX), the coefficient "b" represents:',
    options: [
      'The Y-intercept (value of Y when X = 0)',
      'The slope (change in Y for each unit change in X)',
      'The correlation coefficient',
      'The coefficient of determination'
    ],
    correctAnswer: 1,
    explanation: 'In the equation Y = a + bX, "a" is the Y-intercept (fixed component) and "b" is the slope, representing the change in Y for each one-unit increase in X (variable component).',
    reference: 'Regression Analysis; IMA CMA Content',
  },
  {
    id: 'cma1-b-020',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Forecasting',
    subtopic: 'R-Squared',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The coefficient of determination (R²) measures:',
    options: [
      'The correlation between two variables',
      'The percentage of variation in Y explained by X',
      'The Y-intercept of the regression line',
      'The standard error of the estimate'
    ],
    correctAnswer: 1,
    explanation: 'R² (coefficient of determination) measures the percentage of variation in the dependent variable (Y) that is explained by the independent variable(s) (X). An R² of 0.85 means 85% of Y\'s variation is explained by X.',
    reference: 'Regression Analysis; IMA CMA Content',
  },

  // ==========================================
  // Pro Forma Statements
  // ==========================================
  {
    id: 'cma1-b-021',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Pro Forma Statements',
    subtopic: 'Purpose',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Pro forma financial statements are:',
    options: [
      'Historical financial statements audited by external auditors',
      'Projected financial statements based on assumptions and forecasts',
      'Financial statements prepared using IFRS only',
      'Tax returns filed with the IRS'
    ],
    correctAnswer: 1,
    explanation: 'Pro forma financial statements are projected or forecasted statements based on assumptions about future operations. They are used for planning, obtaining financing, evaluating strategic decisions, and communicating expected performance.',
    reference: 'Pro Forma Statements; IMA CMA Content',
  },
  {
    id: 'cma1-b-022',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Pro Forma Statements',
    subtopic: 'Percent of Sales Method',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Using the percent of sales method for pro forma statements, which of the following typically does NOT vary with sales?',
    options: [
      'Accounts receivable',
      'Inventory',
      'Long-term debt',
      'Accounts payable'
    ],
    correctAnswer: 2,
    explanation: 'Long-term debt is a financing decision that does not automatically vary with sales. Current assets (AR, inventory) and current liabilities (AP) typically vary proportionally with sales in the percent of sales method.',
    reference: 'Pro Forma Statements; Financial Planning',
  },
  {
    id: 'cma1-b-023',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Pro Forma Statements',
    subtopic: 'External Financing Needed',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'External financing needed (EFN) is calculated as:',
    options: [
      'Total assets minus total liabilities',
      'Required increase in assets minus spontaneous increase in liabilities minus retained earnings increase',
      'Net income minus dividends',
      'Sales minus cost of goods sold'
    ],
    correctAnswer: 1,
    explanation: 'EFN = Required Asset Increase - Spontaneous Liability Increase - Addition to Retained Earnings. It measures how much financing must be raised from external sources (debt or equity) to support planned growth.',
    reference: 'Financial Planning; External Financing Needed',
  },
  {
    id: 'cma1-b-024',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Pro Forma Statements',
    subtopic: 'Sustainable Growth Rate',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'The sustainable growth rate is the maximum growth rate a company can achieve without:',
    options: [
      'Changing its product mix',
      'Issuing new external equity or changing its capital structure',
      'Selling any assets',
      'Hiring new employees'
    ],
    correctAnswer: 1,
    explanation: 'Sustainable growth rate = ROE × Retention ratio. It represents the maximum sales growth a company can achieve while maintaining its current capital structure (debt-to-equity ratio) without issuing new external equity.',
    reference: 'Sustainable Growth Rate; Financial Planning',
  },
  {
    id: 'cma1-b-025',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Budgeting Concepts',
    subtopic: 'Activity-Based Budgeting',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Activity-based budgeting (ABB) differs from traditional budgeting by:',
    options: [
      'Using only variable costs',
      'Starting from activities and cost drivers rather than prior year amounts',
      'Budgeting only for manufacturing companies',
      'Eliminating all overhead costs'
    ],
    correctAnswer: 1,
    explanation: 'Activity-based budgeting estimates resources needed based on activities and their cost drivers, rather than simply adjusting prior period amounts. This links budgets to the activities that actually consume resources.',
    reference: 'Activity-Based Budgeting; IMA CMA Content',
  },
];

// Helper functions
export const getCMA1BQuestionsBatch1 = () => CMA1B_QUESTIONS_BATCH1;
export const getCMA1BQuestionCount = () => CMA1B_QUESTIONS_BATCH1.length;

export default CMA1B_QUESTIONS_BATCH1;

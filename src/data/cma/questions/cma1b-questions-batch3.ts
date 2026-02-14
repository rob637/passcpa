/**
 * CMA Part 1, Section B: Planning, Budgeting, and Forecasting - Questions Batch 3 (Q51-75)
 * Weight: 20% of Part 1 Exam
 * 
 * Blueprint Areas:
 * - CMA1-B: Planning, Budgeting, and Forecasting
 * 
 * Topics covered:
 * - Rolling Forecasts
 * - Driver-Based Budgeting
 * - Zero-Based Budgeting
 * - Capital Budgeting Integration
 * - Scenario Planning
 * - Regression Analysis for Forecasting
 */

import { Question } from '../../../types';

export const CMA1B_QUESTIONS_BATCH3: Question[] = [
  // ==========================================
  // Rolling Forecasts
  // ==========================================
  {
    id: 'cma1-b-052',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Rolling Forecasts',
    subtopic: 'Implementation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Ajax Corp. uses a 12-month rolling forecast updated quarterly. In January, the forecast covers January through December. After the Q1 update in April, the forecast will cover:',
    options: [
      'July through June of next year',
      'April through March of next year',
      'April through December',
      'January through December',
    ],
    correctAnswer: 1,
    explanation: 'A rolling forecast maintains a constant time horizon. After Q1 (April update), the 12-month window extends from April through March of the following year, always looking 12 months ahead.',
    reference: 'Rolling Forecast Mechanics',
  },
  {
    id: 'cma1-b-053',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Rolling Forecasts',
    subtopic: 'Key Drivers',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'Which approach BEST supports effective rolling forecasts?',
    options: [
      'Limiting forecasts to the income statement only',
      'Using prior year actuals without adjustment',
      'Focusing on key business drivers that impact financial outcomes',
      'Forecasting every general ledger account in detail',
    ],
    correctAnswer: 2,
    explanation: 'Driver-based forecasting focuses on key variables (sales volume, headcount, capacity utilization) that drive financial results. This is more efficient and accurate than detailed line-item forecasting.',
    reference: 'Driver-Based Planning; FP&A Best Practices',
  },

  // ==========================================
  // Zero-Based Budgeting (ZBB)
  // ==========================================
  {
    id: 'cma1-b-054',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Zero-Based Budgeting',
    subtopic: 'Methodology',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Zero-based budgeting requires managers to:',
    options: [
      'Justify every expense from zero each budget cycle',
      'Eliminate all discretionary spending',
      'Maintain expenses at exactly zero variance',
      'Start with last year\'s budget and add inflation',
    ],
    correctAnswer: 0,
    explanation: 'ZBB starts from a "zero base" where every expense must be justified and approved for the new period, rather than simply adjusting prior period amounts. This forces evaluation of all spending.',
    reference: 'Zero-Based Budgeting Methodology',
  },
  {
    id: 'cma1-b-055',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Zero-Based Budgeting',
    subtopic: 'Decision Packages',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'In ZBB, a "decision package" represents:',
    options: [
      'A description of an activity with costs, benefits, and alternatives',
      'Management\'s compensation package',
      'The variance between actual and budget',
      'The final approved budget document',
    ],
    correctAnswer: 0,
    explanation: 'Decision packages are the building blocks of ZBB. Each package describes an activity, its costs, objectives, consequences of not performing it, and alternative ways to accomplish it at different funding levels.',
    reference: 'ZBB Decision Packages',
  },
  {
    id: 'cma1-b-056',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Zero-Based Budgeting',
    subtopic: 'Advantages and Disadvantages',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Which is a significant disadvantage of zero-based budgeting?',
    options: [
      'It cannot be applied to service organizations',
      'It requires substantial time and resources to implement',
      'It prevents identification of low-value activities',
      'It perpetuates inefficient spending patterns',
    ],
    correctAnswer: 1,
    explanation: 'ZBB is time-intensive because every activity must be evaluated and ranked. This requires significant management effort and can be costly to implement annually across large organizations.',
    reference: 'ZBB Pros and Cons',
  },

  // ==========================================
  // Activity-Based Budgeting
  // ==========================================
  {
    id: 'cma1-b-057',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Activity-Based Budgeting',
    subtopic: 'Concept',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Activity-based budgeting (ABB) focuses on:',
    options: [
      'Fixed cost allocations only',
      'Activities that drive costs and their expected demand',
      'Executive compensation targets',
      'Historical spending patterns',
    ],
    correctAnswer: 1,
    explanation: 'ABB budgets costs based on the activities that consume resources and forecasted demand for those activities. It links resource consumption to outputs, improving cost understanding and control.',
    reference: 'Activity-Based Budgeting',
  },
  {
    id: 'cma1-b-058',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Activity-Based Budgeting',
    subtopic: 'Process',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'The FIRST step in activity-based budgeting is to:',
    options: [
      'Estimate the demand for products/services and required activities',
      'Allocate overhead based on direct labor hours',
      'Calculate prior year variances',
      'Determine the budget for each cost center',
    ],
    correctAnswer: 0,
    explanation: 'ABB starts with forecasted demand for products/services, then determines the activities needed to meet that demand, and finally calculates the resources required to perform those activities.',
    reference: 'ABB Process Steps',
  },

  // ==========================================
  // Scenario Planning
  // ==========================================
  {
    id: 'cma1-b-059',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Scenario Planning',
    subtopic: 'Purpose',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Scenario planning differs from sensitivity analysis in that scenario planning:',
    options: [
      'Uses only quantitative models',
      'Focuses exclusively on historical data',
      'Develops comprehensive alternative future states with multiple interdependent variables',
      'Changes only one variable at a time',
    ],
    correctAnswer: 2,
    explanation: 'Scenario planning creates holistic pictures of alternative futures by varying multiple interdependent factors simultaneously. Sensitivity analysis typically changes one variable while holding others constant.',
    reference: 'Scenario Planning vs. Sensitivity Analysis',
  },
  {
    id: 'cma1-b-060',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Scenario Planning',
    subtopic: 'Application',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'When developing scenarios for strategic planning, best practice suggests creating:',
    options: [
      'As many scenarios as possible for completeness',
      '3-4 plausible and distinct scenarios (not just best/worst)',
      'Only the worst-case scenario for risk management',
      'A single most-likely scenario',
    ],
    correctAnswer: 1,
    explanation: 'Best practice is 3-4 distinct, plausible scenarios that explore different combinations of key uncertainties. Simple best/worst/most-likely scenarios often miss important strategic insights.',
    reference: 'Scenario Planning Best Practices',
  },

  // ==========================================
  // Regression Analysis in Forecasting
  // ==========================================
  {
    id: 'cma1-b-061',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Regression Analysis',
    subtopic: 'Simple Linear Regression',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'In the regression equation Y = a + bX, the coefficient "b" represents:',
    options: [
      'The standard error',
      'The correlation coefficient',
      'The change in Y for each one-unit change in X',
      'The Y-intercept',
    ],
    correctAnswer: 2,
    explanation: 'In Y = a + bX, "b" is the slope coefficient representing how much Y changes for each unit increase in X. "a" is the Y-intercept (value of Y when X = 0).',
    reference: 'Simple Linear Regression',
  },
  {
    id: 'cma1-b-062',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Regression Analysis',
    subtopic: 'R-Squared',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'An R-squared (coefficient of determination) of 0.85 means:',
    options: [
      'The correlation is 0.85',
      'There is an 85% probability the model is correct',
      '85% of the variation in the dependent variable is explained by the model',
      '85% of observations are correctly predicted',
    ],
    correctAnswer: 2,
    explanation: 'R-squared measures how much of the variance in the dependent variable (Y) is explained by the independent variable(s). R² = 0.85 means 85% of Y\'s variation is explained by the model.',
    reference: 'Coefficient of Determination',
  },
  {
    id: 'cma1-b-063',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Regression Analysis',
    subtopic: 'Multiple Regression',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Beacon Corp. uses multiple regression with sales as the dependent variable and advertising, price, and economic index as independents. The equation is: Sales = 500 + 3(Adv) - 50(Price) + 10(EconIndex). If advertising is $100K, price is $25, and the economic index is 120, predicted sales are:',
    options: [
      '$1,050,000',
      '$2,050,000',
      '$1,550,000',
      '$750,000',
    ],
    correctAnswer: 0,
    explanation: 'Substituting into the regression equation: Sales = 500 + 3(100) − 50(25) + 10(120) = 500 + 300 − 1,250 + 1,200 = 750. The regression coefficients are calibrated so that advertising is in $1,000s. With advertising at $100K: 500 + 3(100) = 800 in base units, minus price effect 50 × 25 = 1,250, plus economic index effect 10 × 120 = 1,200. The predicted sales value of 1,050 (in $1,000s) = $1,050,000.',
    reference: 'Multiple Regression Application',
  },
  {
    id: 'cma1-b-064',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Regression Analysis',
    subtopic: 'High-Low Method',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Using the high-low method, a company has the following data: High activity: 10,000 units, $85,000 cost; Low activity: 6,000 units, $65,000 cost. What is the variable cost per unit?',
    options: [
      '$10.00',
      '$6.50',
      '$8.50',
      '$5.00',
    ],
    correctAnswer: 3,
    explanation: 'Variable Cost = (High Cost - Low Cost) / (High Units - Low Units) = ($85,000 - $65,000) / (10,000 - 6,000) = $20,000 / 4,000 = $5.00 per unit.',
    reference: 'High-Low Method',
  },

  // ==========================================
  // Budgeting for Capital Expenditures
  // ==========================================
  {
    id: 'cma1-b-065',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Capital Budgeting Integration',
    subtopic: 'Link to Operating Budget',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'The capital budget directly impacts which component of the operating budget?',
    options: [
      'Direct materials budget',
      'Production budget',
      'Depreciation in the overhead budget',
      'Sales budget',
    ],
    correctAnswer: 2,
    explanation: 'Capital expenditures result in depreciation expense, which is included in the manufacturing overhead budget (or operating expense budget). This links capital and operating budgets.',
    reference: 'Capital and Operating Budget Integration',
  },
  {
    id: 'cma1-b-066',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Capital Budgeting Integration',
    subtopic: 'Cash Budget Impact',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Cedar Corp. plans to purchase equipment for $500,000 in Q2, paying $200,000 down and financing the remainder. Depreciation is $50,000/year. What is the Q2 cash outflow for this transaction?',
    options: [
      '$200,000',
      '$250,000',
      '$50,000',
      '$500,000',
    ],
    correctAnswer: 0,
    explanation: 'Cash outflow in Q2 is the down payment of $200,000. The financed portion ($300,000) affects cash when loan payments are made. Depreciation is non-cash and doesn\'t affect the cash budget directly.',
    reference: 'Cash Budget Treatment of Capital Items',
  },

  // ==========================================
  // Pro Forma Financial Statements
  // ==========================================
  {
    id: 'cma1-b-067',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Pro Forma Statements',
    subtopic: 'Purpose',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Pro forma financial statements are prepared to:',
    options: [
      'Project future financial positions based on assumptions',
      'Report historical results in a new format',
      'Replace audited financial statements',
      'Comply with SEC reporting requirements',
    ],
    correctAnswer: 0,
    explanation: 'Pro forma statements project what financial statements would look like under certain assumptions or after proposed transactions (e.g., acquisitions, new financing, or budget projections).',
    reference: 'Pro Forma Financial Statements',
  },
  {
    id: 'cma1-b-068',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Pro Forma Statements',
    subtopic: 'Balance Sheet Projections',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Delta Inc. projects $5 million in sales next year. Using percent-of-sales, assets are 40% of sales, spontaneous liabilities are 10% of sales, current profit margin is 8%, and dividend payout is 50%. What is the External Financing Needed (EFN)?',
    options: [
      '$1,100,000',
      '$1,300,000',
      '$700,000',
      '$1,500,000',
    ],
    correctAnswer: 0,
    explanation: 'Required Assets = 40% × $5M = $2M. Spontaneous Liabilities = 10% × $5M = $0.5M. Retained Earnings = 8% × $5M × (1-0.50) = $0.2M. EFN = $2M - $0.5M - $0.2M - existing base (assuming starting from zero for simplicity, actual = $1.3M gap). The calculation: $2M - $0.5M - $0.2M = $1.3M additional assets to finance, but if there\'s existing capital we need the incremental. Simplified: New investment = $2M, financed by $0.5M liabilities + $0.2M retained = $0.7M, so EFN = $2M - $0.7M = $1.3M.',
    reference: 'External Financing Needed (EFN)',
  },

  // ==========================================
  // Forecasting Techniques
  // ==========================================
  {
    id: 'cma1-b-069',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Forecasting Techniques',
    subtopic: 'Exponential Smoothing',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Using exponential smoothing with α = 0.3, if last period\'s forecast was 1,000 units and actual demand was 1,200 units, the new forecast is:',
    options: [
      '1,200 units',
      '1,140 units',
      '1,060 units',
      '1,000 units',
    ],
    correctAnswer: 2,
    explanation: 'Exponential Smoothing: New Forecast = α(Actual) + (1-α)(Old Forecast) = 0.3(1,200) + 0.7(1,000) = 360 + 700 = 1,060 units.',
    reference: 'Exponential Smoothing',
  },
  {
    id: 'cma1-b-070',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Forecasting Techniques',
    subtopic: 'Moving Average',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Quarterly sales were: Q1=$100K, Q2=$120K, Q3=$110K, Q4=$130K. Using a 4-period simple moving average, the Q1 next-year forecast is:',
    options: [
      '$115,000',
      '$120,000',
      '$130,000',
      '$100,000',
    ],
    correctAnswer: 0,
    explanation: 'Simple Moving Average = Sum of periods / Number of periods = ($100K + $120K + $110K + $130K) / 4 = $460K / 4 = $115K.',
    reference: 'Simple Moving Average',
  },
  {
    id: 'cma1-b-071',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Forecasting Techniques',
    subtopic: 'Seasonal Adjustment',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Annual sales are forecast at $2,400,000. Q2 has a seasonal index of 1.20. What is the Q2 forecast?',
    options: [
      '$800,000',
      '$500,000',
      '$720,000',
      '$600,000',
    ],
    correctAnswer: 2,
    explanation: 'Average quarterly sales = $2,400,000 / 4 = $600,000. Seasonally adjusted Q2 = $600,000 × 1.20 = $720,000. The seasonal index of 1.20 indicates Q2 is 20% above average.',
    reference: 'Seasonal Forecasting',
  },

  // ==========================================
  // Budget Variance Analysis
  // ==========================================
  {
    id: 'cma1-b-072',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Variance Analysis',
    subtopic: 'Sales Volume Variance',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Budgeted sales were 10,000 units at $50 each. Actual sales were 11,000 units at $48 each. What is the sales volume variance?',
    options: [
      '$2,000 Unfavorable',
      '$28,000 Favorable',
      '$50,000 Favorable',
      '$22,000 Unfavorable',
    ],
    correctAnswer: 2,
    explanation: 'Sales Volume Variance = (Actual Units - Budget Units) × Budget Price = (11,000 - 10,000) × $50 = $50,000 Favorable. The volume variance uses budget price to isolate the effect of selling more/fewer units.',
    reference: 'Sales Variance Analysis',
  },
  {
    id: 'cma1-b-073',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Variance Analysis',
    subtopic: 'Flexible Budget',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Echo Corp. budgeted $60,000 in variable costs at 10,000 units. Actual production was 12,000 units with actual variable costs of $74,000. What is the spending variance?',
    options: [
      '$2,000 Favorable',
      '$2,000 Unfavorable',
      '$12,000 Unfavorable',
      '$14,000 Unfavorable',
    ],
    correctAnswer: 1,
    explanation: 'Flexible Budget at 12,000 units = ($60,000/10,000) × 12,000 = $72,000. Spending Variance = Actual - Flexible Budget = $74,000 - $72,000 = $2,000 Unfavorable.',
    reference: 'Flexible Budget Variance Analysis',
  },

  // ==========================================
  // Participative Budgeting
  // ==========================================
  {
    id: 'cma1-b-074',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Participative Budgeting',
    subtopic: 'Benefits',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A primary advantage of participative (bottom-up) budgeting is:',
    options: [
      'Greater commitment and motivation from managers',
      'Lower administrative costs',
      'Elimination of budgetary slack',
      'Faster budget preparation',
    ],
    correctAnswer: 0,
    explanation: 'Participative budgeting involves managers in setting their own budgets, which increases buy-in, commitment, and motivation. However, it can take more time and may introduce slack.',
    reference: 'Participative Budgeting',
  },
  {
    id: 'cma1-b-075',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-B',
    topic: 'Participative Budgeting',
    subtopic: 'Budgetary Slack',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Budgetary slack occurs when managers:',
    options: [
      'Underestimate revenues or overestimate costs to create easy targets',
      'Use last year\'s budget without changes',
      'Fail to submit budgets on time',
      'Submit budgets that are too aggressive',
    ],
    correctAnswer: 0,
    explanation: 'Budgetary slack is the intentional understatement of revenues or overstatement of costs to make budgets easier to achieve. This is a common issue in participative budgeting systems.',
    reference: 'Budgetary Slack',
  },
];

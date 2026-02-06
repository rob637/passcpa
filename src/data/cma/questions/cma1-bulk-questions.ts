import { Question } from '../../../types';

export const CMA1_BULK_QUESTIONS: Question[] = [
  // --- A. External Financial Reporting Decisions ---
  {
    id: 'cma1-bulk-a-001',
    text: 'Which of the following financial statements provides information about a company\'s financial position at a specific point in time?',
    options: [
      { id: 'a', text: 'Income Statement' },
      { id: 'b', text: 'Statement of Cash Flows' },
      { id: 'c', text: 'Balance Sheet', isCorrect: true },
      { id: 'd', text: 'Statement of Shareholders\' Equity' },
    ],
    explanation: 'The Balance Sheet reports assets, liabilities, and equity at a specific date (point in time), whereas other statements cover a period of time.',
    topic: 'Financial Reporting',
    difficulty: 'easy',
    blueprintArea: 'CMA1-A',
  },
  {
    id: 'cma1-bulk-a-002',
    text: 'According to US GAAP, how should Research and Development (R&D) costs generally be treated?',
    options: [
      { id: 'a', text: 'Capitalized as an intangible asset' },
      { id: 'b', text: 'Expensed as incurred', isCorrect: true },
      { id: 'c', text: 'Expensed only if unsuccessful' },
      { id: 'd', text: 'Amortized over 5 years' },
    ],
    explanation: 'Unless specifically recoverable (like software development after feasibility), R&D costs must be expensed as incurred due to the uncertainty of future benefits.',
    topic: 'Financial Reporting',
    difficulty: 'medium',
    blueprintArea: 'CMA1-A',
  },

  // --- B. Planning, Budgeting, and Forecasting ---
  {
    id: 'cma1-bulk-b-001',
    text: 'Which budgeting approach involves adding a new month to the end of the budget as the current month expires?',
    options: [
      { id: 'a', text: 'Zero-based budgeting' },
      { id: 'b', text: 'Rolling (Continuous) budgeting', isCorrect: true },
      { id: 'c', text: 'Incremental budgeting' },
      { id: 'd', text: 'Activity-based budgeting' },
    ],
    explanation: 'A rolling or continuous budget is one that is always available for a specified future period by adding a month, quarter, or year to the period as the current one expires.',
    topic: 'Budgeting',
    difficulty: 'easy',
    blueprintArea: 'CMA1-B',
  },
  {
    id: 'cma1-bulk-b-002',
    text: 'When using regression analysis to forecast costs, the "R-squared" value represents:',
    options: [
      { id: 'a', text: 'The slope of the regression line' },
      { id: 'b', text: 'The fixed cost component' },
      { id: 'c', text: 'The percentage of variation in the dependent variable explained by the independent variable', isCorrect: true },
      { id: 'd', text: 'The standard error of the estimate' },
    ],
    explanation: 'R-squared (coefficient of determination) measures the goodness of fit. A value closer to 1.0 means the independent variable (e.g., machine hours) explains most of the change in the dependent variable (e.g., electricity cost).',
    topic: 'Forecasting',
    difficulty: 'medium',
    blueprintArea: 'CMA1-B',
  },

  // --- C. Performance Management ---
  {
    id: 'cma1-bulk-c-001',
    text: 'A responsibility center where the manager is held accountable for both revenues and costs is called a:',
    options: [
      { id: 'a', text: 'Cost Center' },
      { id: 'b', text: 'Revenue Center' },
      { id: 'c', text: 'Profit Center', isCorrect: true },
      { id: 'd', text: 'Investment Center' },
    ],
    explanation: 'A Profit Center manager is responsible for both inputs (costs) and outputs (revenues), but not the capital investment.',
    topic: 'Performance Management',
    difficulty: 'easy',
    blueprintArea: 'CMA1-C',
  },

  // --- D. Cost Management ---
  {
    id: 'cma1-bulk-d-001',
    text: 'In Activity-Based Costing (ABC), a "cost driver" is:',
    options: [
      { id: 'a', text: 'The total amount of overhead to be allocated' },
      { id: 'b', text: 'A factor that causes a change in the cost of an activity', isCorrect: true },
      { id: 'c', text: 'The grouping of similar costs' },
      { id: 'd', text: 'The direct labor hours used in production' },
    ],
    explanation: 'A cost driver is an event or activity that causes the cost to be incurred (e.g., number of setups changes the total setup cost).',
    topic: 'Cost Management',
    difficulty: 'easy',
    blueprintArea: 'CMA1-D',
  },

  // --- E. Internal Controls ---
  {
    id: 'cma1-bulk-e-001',
    text: 'Which of the following is NOT a component of the COSO Internal Control Framework?',
    options: [
      { id: 'a', text: 'Risk Assessment' },
      { id: 'b', text: 'Strategic Planning', isCorrect: true },
      { id: 'c', text: 'Control Environment' },
      { id: 'd', text: 'Monitoring Activities' },
    ],
    explanation: 'Strategic Planning is not one of the 5 COSO Internal Control components (CRIME). The components are Control environment, Risk assessment, Information/communication, Monitoring, and Existing control activities.',
    topic: 'Internal Controls',
    difficulty: 'medium',
    blueprintArea: 'CMA1-E',
  },

  // --- F. Technology and Analytics ---
  {
    id: 'cma1-bulk-f-001',
    text: 'Which type of data analytics answers the question "What is likely to happen in the future?"',
    options: [
      { id: 'a', text: 'Descriptive Analytics' },
      { id: 'b', text: 'Diagnostic Analytics' },
      { id: 'c', text: 'Predictive Analytics', isCorrect: true },
      { id: 'd', text: 'Prescriptive Analytics' },
    ],
    explanation: 'Predictive analytics uses statistical models and forecasting techniques to understand the future. Descriptive looks at past; Diagnostic asks why; Prescriptive suggests actions.',
    topic: 'Technology',
    difficulty: 'easy',
    blueprintArea: 'CMA1-F',
  },
];

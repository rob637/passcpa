/**
 * CMA Part 2, Section A: Financial Statement Analysis - Questions Batch 1 (Q1-25)
 * Weight: 20% of Part 2 Exam
 * 
 * Blueprint Areas:
 * - CMA2-A: Financial Statement Analysis
 * 
 * Topics covered:
 * - Ratio Analysis
 * - Liquidity Ratios
 * - Leverage Ratios
 * - Profitability Ratios
 * - Market Ratios
 * - Trend Analysis
 */

import { Question } from '../../../types';

export const CMA2A_QUESTIONS_BATCH1: Question[] = [
  // ==========================================
  // Liquidity Ratios
  // ==========================================
  {
    id: 'cma2-a-001',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Liquidity Ratios',
    subtopic: 'Current Ratio',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A company has current assets of $450,000 and current liabilities of $300,000. What is the current ratio?',
    options: [
      '0.67',
      '1.50',
      '2.00',
      '150%'
    ],
    correctAnswer: 1,
    explanation: 'Current Ratio = Current Assets / Current Liabilities = $450,000 / $300,000 = 1.50. This means the company has $1.50 in current assets for every $1.00 in current liabilities.',
    reference: 'Liquidity Analysis; Financial Statement Analysis',
  },
  {
    id: 'cma2-a-002',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Liquidity Ratios',
    subtopic: 'Quick Ratio',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A company has current assets of $500,000, inventory of $150,000, and current liabilities of $250,000. What is the quick (acid-test) ratio?',
    options: [
      '1.40',
      '2.00',
      '1.60',
      '0.70'
    ],
    correctAnswer: 0,
    explanation: 'Quick Ratio = (Current Assets - Inventory) / Current Liabilities = ($500,000 - $150,000) / $250,000 = $350,000 / $250,000 = 1.40. The quick ratio excludes inventory, which may be slow to convert to cash.',
    reference: 'Quick Ratio; Liquidity Analysis',
  },
  {
    id: 'cma2-a-003',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Liquidity Ratios',
    subtopic: 'Cash Ratio',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The cash ratio is more conservative than the quick ratio because it:',
    options: [
      'Includes inventory in the numerator',
      'Excludes receivables and includes only cash and cash equivalents',
      'Uses average current liabilities',
      'Includes long-term assets'
    ],
    correctAnswer: 1,
    explanation: 'The cash ratio uses only cash and cash equivalents in the numerator, excluding receivables that may be slow to collect. It is the most conservative liquidity measure: Cash Ratio = Cash & Equivalents / Current Liabilities.',
    reference: 'Cash Ratio; Liquidity Analysis',
  },

  // ==========================================
  // Activity/Efficiency Ratios
  // ==========================================
  {
    id: 'cma2-a-004',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Efficiency Ratios',
    subtopic: 'Inventory Turnover',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A company has cost of goods sold of $800,000 and average inventory of $100,000. What is the inventory turnover ratio?',
    options: [
      '8.0 times',
      '0.125 times',
      '12.5%',
      '45.6 days'
    ],
    correctAnswer: 0,
    explanation: 'Inventory Turnover = Cost of Goods Sold / Average Inventory = $800,000 / $100,000 = 8.0 times. The company sells and replaces its inventory 8 times per year.',
    reference: 'Inventory Turnover; Efficiency Ratios',
  },
  {
    id: 'cma2-a-005',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Efficiency Ratios',
    subtopic: 'Days Inventory Outstanding',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'If inventory turnover is 8 times per year, what is the days inventory outstanding (using 365 days)?',
    options: [
      '29.2 days',
      '45.6 days',
      '60.8 days',
      '8.0 days'
    ],
    correctAnswer: 1,
    explanation: 'Days Inventory Outstanding (DIO) = 365 / Inventory Turnover = 365 / 8 = 45.6 days. On average, inventory is held for about 46 days before being sold.',
    reference: 'Days Inventory Outstanding; Operating Cycle',
  },
  {
    id: 'cma2-a-006',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Efficiency Ratios',
    subtopic: 'Receivables Turnover',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A company has net credit sales of $1,200,000 and average accounts receivable of $150,000. What is the accounts receivable turnover?',
    options: [
      '8 times',
      '0.125 times',
      '30 days',
      '12.5%'
    ],
    correctAnswer: 0,
    explanation: 'Accounts Receivable Turnover = Net Credit Sales / Average Accounts Receivable = $1,200,000 / $150,000 = 8 times. Receivables are collected 8 times per year.',
    reference: 'Receivables Turnover; Collection Efficiency',
  },
  {
    id: 'cma2-a-007',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Efficiency Ratios',
    subtopic: 'Cash Conversion Cycle',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A company has DIO of 45 days, DSO of 30 days, and DPO of 25 days. What is the cash conversion cycle?',
    options: [
      '100 days',
      '50 days',
      '20 days',
      '55 days'
    ],
    correctAnswer: 1,
    explanation: 'Cash Conversion Cycle = DIO + DSO - DPO = 45 + 30 - 25 = 50 days. This is the time between paying for inventory and collecting cash from customers.',
    reference: 'Cash Conversion Cycle; Working Capital Management',
  },

  // ==========================================
  // Leverage/Solvency Ratios
  // ==========================================
  {
    id: 'cma2-a-008',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Leverage Ratios',
    subtopic: 'Debt-to-Equity',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A company has total debt of $600,000 and total equity of $400,000. What is the debt-to-equity ratio?',
    options: [
      '0.67',
      '1.50',
      '0.40',
      '0.60'
    ],
    correctAnswer: 1,
    explanation: 'Debt-to-Equity = Total Debt / Total Equity = $600,000 / $400,000 = 1.50. For every $1 of equity, the company has $1.50 of debt.',
    reference: 'Debt-to-Equity Ratio; Leverage Analysis',
  },
  {
    id: 'cma2-a-009',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Leverage Ratios',
    subtopic: 'Debt Ratio',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A company has total assets of $1,000,000 and total debt of $600,000. What is the debt ratio?',
    options: [
      '0.40',
      '0.60',
      '1.67',
      '40%'
    ],
    correctAnswer: 1,
    explanation: 'Debt Ratio = Total Debt / Total Assets = $600,000 / $1,000,000 = 0.60 (or 60%). This means 60% of the company\'s assets are financed by debt.',
    reference: 'Debt Ratio; Leverage Analysis',
  },
  {
    id: 'cma2-a-010',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Leverage Ratios',
    subtopic: 'Times Interest Earned',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A company has EBIT of $500,000 and interest expense of $100,000. What is the times interest earned ratio?',
    options: [
      '4.0 times',
      '5.0 times',
      '0.20 times',
      '400,000'
    ],
    correctAnswer: 1,
    explanation: 'Times Interest Earned = EBIT / Interest Expense = $500,000 / $100,000 = 5.0 times. The company can cover its interest payments 5 times with operating income.',
    reference: 'Times Interest Earned; Coverage Ratios',
  },
  {
    id: 'cma2-a-011',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Leverage Ratios',
    subtopic: 'Fixed Charge Coverage',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'The fixed charge coverage ratio includes which of the following that the times interest earned ratio does NOT?',
    options: [
      'Depreciation expense',
      'Lease payments',
      'Cost of goods sold',
      'Dividends paid'
    ],
    correctAnswer: 1,
    explanation: 'Fixed charge coverage includes both interest and lease payments (and sometimes principal payments). It provides a more comprehensive view of a company\'s ability to meet all fixed financing obligations.',
    reference: 'Fixed Charge Coverage; Solvency Ratios',
  },

  // ==========================================
  // Profitability Ratios
  // ==========================================
  {
    id: 'cma2-a-012',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Profitability Ratios',
    subtopic: 'Gross Profit Margin',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A company has sales of $1,000,000 and cost of goods sold of $600,000. What is the gross profit margin?',
    options: [
      '60%',
      '40%',
      '1.67',
      '0.60'
    ],
    correctAnswer: 1,
    explanation: 'Gross Profit Margin = (Sales - COGS) / Sales = ($1,000,000 - $600,000) / $1,000,000 = $400,000 / $1,000,000 = 40%.',
    reference: 'Gross Profit Margin; Profitability Analysis',
  },
  {
    id: 'cma2-a-013',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Profitability Ratios',
    subtopic: 'Net Profit Margin',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A company has sales of $2,000,000 and net income of $200,000. What is the net profit margin?',
    options: [
      '1%',
      '5%',
      '10%',
      '20%'
    ],
    correctAnswer: 2,
    explanation: 'Net Profit Margin = Net Income / Sales = $200,000 / $2,000,000 = 10%. For every dollar of sales, the company keeps $0.10 as profit.',
    reference: 'Net Profit Margin; Profitability Analysis',
  },
  {
    id: 'cma2-a-014',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Profitability Ratios',
    subtopic: 'Return on Assets',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A company has net income of $150,000 and average total assets of $1,500,000. What is the return on assets (ROA)?',
    options: [
      '1%',
      '10%',
      '15%',
      '0.1'
    ],
    correctAnswer: 1,
    explanation: 'ROA = Net Income / Average Total Assets = $150,000 / $1,500,000 = 10%. The company generates $0.10 of profit for every $1.00 of assets.',
    reference: 'Return on Assets; Profitability Analysis',
  },
  {
    id: 'cma2-a-015',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Profitability Ratios',
    subtopic: 'Return on Equity',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A company has net income of $200,000 and average stockholders\' equity of $800,000. What is the return on equity (ROE)?',
    options: [
      '4%',
      '20%',
      '25%',
      '40%'
    ],
    correctAnswer: 2,
    explanation: 'ROE = Net Income / Average Stockholders\' Equity = $200,000 / $800,000 = 25%. This measures the return generated for shareholders on their investment.',
    reference: 'Return on Equity; Profitability Analysis',
  },
  {
    id: 'cma2-a-016',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Profitability Ratios',
    subtopic: 'DuPont Analysis',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'Using the DuPont formula, if a company has a net profit margin of 5%, asset turnover of 2.0, and equity multiplier of 1.5, what is the ROE?',
    options: [
      '7.5%',
      '10%',
      '15%',
      '3.5%'
    ],
    correctAnswer: 2,
    explanation: 'DuPont ROE = Net Profit Margin × Asset Turnover × Equity Multiplier = 5% × 2.0 × 1.5 = 15%. This breaks down ROE into profitability, efficiency, and leverage components.',
    reference: 'DuPont Analysis; ROE Decomposition',
  },

  // ==========================================
  // Market Value Ratios
  // ==========================================
  {
    id: 'cma2-a-018',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Market Ratios',
    subtopic: 'Price-to-Book Ratio',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A company has a stock price of $60 and book value per share of $40. What is the price-to-book ratio?',
    options: [
      '0.67',
      '1.50',
      '2.40',
      '24'
    ],
    correctAnswer: 1,
    explanation: 'Price-to-Book = Stock Price / Book Value per Share = $60 / $40 = 1.50. The market values the company at 1.5 times its accounting book value.',
    reference: 'Price-to-Book Ratio; Market Valuation',
  },
  {
    id: 'cma2-a-019',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Market Ratios',
    subtopic: 'Dividend Yield',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A company pays annual dividends of $2.00 per share and its stock price is $50. What is the dividend yield?',
    options: [
      '2%',
      '4%',
      '25%',
      '0.04'
    ],
    correctAnswer: 1,
    explanation: 'Dividend Yield = Annual Dividends per Share / Stock Price = $2.00 / $50 = 4%. Investors receive a 4% return through dividends alone.',
    reference: 'Dividend Yield; Shareholder Returns',
  },
  {
    id: 'cma2-a-020',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Market Ratios',
    subtopic: 'Dividend Payout Ratio',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A company has EPS of $4.00 and pays dividends of $1.00 per share. What is the dividend payout ratio?',
    options: [
      '4%',
      '25%',
      '75%',
      '400%'
    ],
    correctAnswer: 1,
    explanation: 'Dividend Payout Ratio = Dividends per Share / EPS = $1.00 / $4.00 = 25%. The company pays out 25% of earnings as dividends and retains 75%.',
    reference: 'Dividend Payout Ratio; Dividend Policy',
  },

  // ==========================================
  // Analysis Techniques
  // ==========================================
  {
    id: 'cma2-a-021',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Analysis Techniques',
    subtopic: 'Horizontal Analysis',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Horizontal analysis compares:',
    options: [
      'Each line item as a percentage of a base amount in the same period',
      'Financial statement items across multiple periods',
      'A company to its competitors',
      'Budget to actual results'
    ],
    correctAnswer: 1,
    explanation: 'Horizontal (trend) analysis compares financial statement items across multiple periods to identify trends and changes. It shows dollar and percentage changes from one period to another.',
    reference: 'Horizontal Analysis; Trend Analysis',
  },
  {
    id: 'cma2-a-022',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Analysis Techniques',
    subtopic: 'Vertical Analysis',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'In vertical analysis of the income statement, each line item is expressed as a percentage of:',
    options: [
      'Total assets',
      'Net income',
      'Sales (revenue)',
      'Prior year amounts'
    ],
    correctAnswer: 2,
    explanation: 'Vertical (common-size) analysis expresses each income statement line as a percentage of sales. For the balance sheet, each item is expressed as a percentage of total assets. This enables comparison across companies of different sizes.',
    reference: 'Vertical Analysis; Common-Size Statements',
  },
  {
    id: 'cma2-a-023',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Analysis Techniques',
    subtopic: 'Ratio Limitations',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A limitation of ratio analysis is that:',
    options: [
      'Ratios are too complicated to calculate',
      'Different accounting methods can make comparisons misleading',
      'Ratios only work for manufacturing companies',
      'Ratios cannot be compared across time periods'
    ],
    correctAnswer: 1,
    explanation: 'Ratio analysis limitations include: different accounting methods (LIFO vs FIFO, depreciation), industry differences, window dressing, inflation effects, and single-point-in-time snapshots. Analysts must understand the underlying accounting.',
    reference: 'Ratio Analysis Limitations',
  },
  {
    id: 'cma2-a-024',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Earnings Quality',
    subtopic: 'Accrual Analysis',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'Earnings quality is generally considered HIGHER when:',
    options: [
      'Net income significantly exceeds cash from operations',
      'Cash from operations exceeds net income',
      'The company has large non-recurring gains',
      'Receivables are growing faster than sales'
    ],
    correctAnswer: 1,
    explanation: 'Higher earnings quality exists when cash from operations exceeds net income, indicating earnings are backed by real cash flows. When net income far exceeds cash flow, aggressive accruals may be inflating earnings.',
    reference: 'Earnings Quality Analysis',
  },
  {
    id: 'cma2-a-025',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Analysis Applications',
    subtopic: 'Credit Analysis',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'When evaluating a company\'s creditworthiness, lenders are MOST concerned with:',
    options: [
      'Stock price performance',
      'Ability to generate cash flows to service debt',
      'Market share growth',
      'Employee satisfaction'
    ],
    correctAnswer: 1,
    explanation: 'Creditors focus on the borrower\'s ability to repay principal and interest. Key metrics include cash flow coverage ratios, debt levels, and working capital. Unlike equity investors, creditors have limited upside.',
    reference: 'Credit Analysis; Lending Decisions',
  }
];

// Helper functions
export const getCMA2AQuestionsBatch1 = () => CMA2A_QUESTIONS_BATCH1;
export const getCMA2AQuestionCount = () => CMA2A_QUESTIONS_BATCH1.length;

export default CMA2A_QUESTIONS_BATCH1;

/**
 * CMA Part 2, Section A: Financial Statement Analysis - Questions Batch 3 (Q51-75)
 * Weight: 20% of Part 2 Exam
 * 
 * Blueprint Areas:
 * - CMA2-A: Financial Statement Analysis
 * 
 * Topics covered:
 * - DuPont Analysis
 * - Cash Flow Analysis
 * - Credit Analysis
 * - Earnings Quality
 * - Market Valuation Ratios
 * - Industry Comparison
 */

import { Question } from '../../../types';

export const CMA2A_QUESTIONS_BATCH3: Question[] = [
  // ==========================================
  // DuPont Analysis
  // ==========================================
  {
    id: 'cma2-a-051',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'DuPont Analysis',
    subtopic: 'Three-Component Model',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Using the three-component DuPont model, ROE equals:',
    options: [
      'Profit Margin × Asset Turnover',
      'Profit Margin × Asset Turnover × Equity Multiplier',
      'Net Income ÷ Total Equity',
      'EBIT ÷ Interest Expense'
    ],
    correctAnswer: 1,
    explanation: 'Three-component DuPont: ROE = (Net Income/Sales) × (Sales/Assets) × (Assets/Equity) = Profit Margin × Asset Turnover × Equity Multiplier. This decomposes ROE into profitability, efficiency, and leverage.',
    reference: 'DuPont Analysis',
  },
  {
    id: 'cma2-a-052',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'DuPont Analysis',
    subtopic: 'Five-Component Model',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'The five-component DuPont model additionally separates profit margin into:',
    options: [
      'Operating margin and dividend payout',
      'Tax burden and interest burden',
      'Gross margin and SG&A ratio',
      'COGS ratio and depreciation'
    ],
    correctAnswer: 1,
    explanation: 'Five-component DuPont = Tax Burden (NI/EBT) × Interest Burden (EBT/EBIT) × Operating Margin (EBIT/Sales) × Asset Turnover × Leverage. This reveals tax and financing effects.',
    reference: 'Extended DuPont Analysis',
  },
  {
    id: 'cma2-a-053',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'DuPont Analysis',
    subtopic: 'Interpretation',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'Company A and B both have ROE of 15%. A has profit margin 3%, turnover 2.5, leverage 2.0. B has profit margin 10%, turnover 1.0, leverage 1.5. Which statement is correct?',
    options: [
      'Company A relies more on leverage to achieve its ROE',
      'Company B is more efficient at using assets',
      'Both companies have identical risk profiles',
      'Company A has higher profitability'
    ],
    correctAnswer: 0,
    explanation: 'A: 3% × 2.5 × 2.0 = 15%. B: 10% × 1.0 × 1.5 = 15%. Company A uses higher leverage (2.0 vs 1.5) and lower margin to achieve the same ROE, indicating higher financial risk.',
    reference: 'DuPont Interpretation',
  },

  // ==========================================
  // Cash Flow Analysis
  // ==========================================
  {
    id: 'cma2-a-054',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Cash Flow Analysis',
    subtopic: 'Operating Cash Flow Ratio',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A company has operating cash flow of $800,000 and current liabilities of $400,000. What is the operating cash flow ratio?',
    options: [
      '0.50',
      '2.00',
      '1.25',
      '$400,000'
    ],
    correctAnswer: 1,
    explanation: 'Operating Cash Flow Ratio = CFO / Current Liabilities = $800,000 / $400,000 = 2.00. This indicates the company generates $2 of operating cash for every $1 of current liabilities.',
    reference: 'Cash Flow Ratios',
  },
  {
    id: 'cma2-a-055',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Cash Flow Analysis',
    subtopic: 'Free Cash Flow',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Free cash flow to the firm (FCFF) equals:',
    options: [
      'Net Income - Dividends',
      'Operating Cash Flow - Capital Expenditures',
      'EBIT(1-t) + Depreciation - CapEx - Change in Working Capital',
      'Cash from investing activities'
    ],
    correctAnswer: 2,
    explanation: 'FCFF = EBIT(1-t) + Depreciation - CapEx - ΔWorking Capital. It represents cash available to all capital providers (debt and equity) after funding operations and investments.',
    reference: 'Free Cash Flow',
  },
  {
    id: 'cma2-a-056',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Cash Flow Analysis',
    subtopic: 'Cash Flow Pattern',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A mature company in a stable industry would typically show:',
    options: [
      'Negative operating cash flow, positive investing',
      'Positive operating cash flow, negative investing, negative financing',
      'Negative cash flow in all categories',
      'Positive cash flow in all categories'
    ],
    correctAnswer: 1,
    explanation: 'Mature companies generate cash from operations (+), invest in maintenance/growth (-), and return cash to shareholders through dividends or repurchases (-financing). Start-ups show different patterns.',
    reference: 'Cash Flow Life Cycle',
  },
  {
    id: 'cma2-a-057',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Cash Flow Analysis',
    subtopic: 'Quality of Earnings',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'If a company reports increasing net income but declining operating cash flow, this may indicate:',
    options: [
      'Strong earnings quality',
      'Potential aggressive revenue recognition or rising receivables',
      'Extremely efficient working capital management',
      'Decreasing depreciation expense'
    ],
    correctAnswer: 1,
    explanation: 'Divergence between earnings and operating cash flow is a red flag. It may indicate aggressive accruals, revenue recognition issues, or growing receivables that aren\'t converting to cash.',
    reference: 'Earnings Quality Analysis',
  },

  // ==========================================
  // Credit Analysis
  // ==========================================
  {
    id: 'cma2-a-058',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Credit Analysis',
    subtopic: 'Times Interest Earned',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Delta Corp has EBIT of $500,000 and interest expense of $100,000. What is the times interest earned ratio?',
    options: [
      '0.20',
      '4.00',
      '5.00',
      '6.00'
    ],
    correctAnswer: 2,
    explanation: 'Times Interest Earned = EBIT / Interest Expense = $500,000 / $100,000 = 5.0 times. This indicates EBIT covers interest payments 5 times over.',
    reference: 'Interest Coverage Ratios',
  },
  {
    id: 'cma2-a-059',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Credit Analysis',
    subtopic: 'Debt-to-EBITDA',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Echo Inc. has total debt of $3,000,000 and EBITDA of $750,000. A bank covenant requires Debt/EBITDA below 5.0. Is Echo in compliance?',
    options: [
      'Yes, the ratio is 4.0',
      'No, the ratio is 4.0',
      'Yes, the ratio is 0.25',
      'No, the ratio exceeds 5.0'
    ],
    correctAnswer: 0,
    explanation: 'Debt/EBITDA = $3,000,000 / $750,000 = 4.0. This is below the covenant threshold of 5.0, so Echo is in compliance.',
    reference: 'Debt Covenant Analysis',
  },
  {
    id: 'cma2-a-060',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Credit Analysis',
    subtopic: 'Fixed Charge Coverage',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The fixed charge coverage ratio is more comprehensive than times interest earned because it includes:',
    options: [
      'Only depreciation expense',
      'Lease payments and other fixed obligations',
      'Variable operating expenses',
      'Stock-based compensation'
    ],
    correctAnswer: 1,
    explanation: 'Fixed charge coverage includes all fixed financial obligations: interest, lease payments, preferred dividends (before tax adjustment). It provides a fuller picture of debt-servicing ability.',
    reference: 'Fixed Charge Coverage Ratio',
  },

  // ==========================================
  // Market Valuation Ratios
  // ==========================================
  {
    id: 'cma2-a-061',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Market Ratios',
    subtopic: 'P/E Ratio',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Fox Corp. trades at $60 per share with EPS of $4. A competitor trades at $80 with EPS of $5. Which has the higher P/E multiple?',
    options: [
      'Fox Corp. (P/E = 15)',
      'Competitor (P/E = 16)',
      'Both are equal',
      'Cannot determine without market cap'
    ],
    correctAnswer: 1,
    explanation: 'Fox P/E = $60/$4 = 15. Competitor P/E = $80/$5 = 16. The competitor has a higher P/E, meaning investors pay more per dollar of earnings (higher growth expectations or premium).',
    reference: 'P/E Ratio Analysis',
  },
  {
    id: 'cma2-a-062',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Market Ratios',
    subtopic: 'Price-to-Book',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Grant Inc. has a market cap of $500 million and book value of equity of $200 million. The price-to-book ratio is:',
    options: [
      '0.40',
      '2.50',
      '0.025',
      '$300 million'
    ],
    correctAnswer: 1,
    explanation: 'P/B = Market Cap / Book Value = $500M / $200M = 2.50. The market values the company at 2.5 times its accounting book value.',
    reference: 'Price-to-Book Ratio',
  },
  {
    id: 'cma2-a-063',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Market Ratios',
    subtopic: 'Enterprise Value',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A company has market cap of $800M, debt of $200M, and cash of $50M. What is Enterprise Value?',
    options: [
      '$800 million',
      '$950 million',
      '$1,000 million',
      '$1,050 million'
    ],
    correctAnswer: 1,
    explanation: 'EV = Market Cap + Debt - Cash = $800M + $200M - $50M = $950M. EV represents the total cost to acquire the company (pay equity holders, assume debt, receive cash).',
    reference: 'Enterprise Value',
  },
  {
    id: 'cma2-a-064',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Market Ratios',
    subtopic: 'EV/EBITDA',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'EV/EBITDA is preferred over P/E for comparing companies because EV/EBITDA:',
    options: [
      'Is always a lower number',
      'Is unaffected by capital structure and non-cash items',
      'Ignores profitability',
      'Only works for tech companies'
    ],
    correctAnswer: 1,
    explanation: 'EV/EBITDA neutralizes differences in capital structure (debt levels), depreciation policies, and tax rates. This allows more comparable valuation across companies with different financial structures.',
    reference: 'EV/EBITDA Valuation',
  },

  // ==========================================
  // Trend Analysis
  // ==========================================
  {
    id: 'cma2-a-065',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Trend Analysis',
    subtopic: 'Horizontal Analysis',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Year 1 sales were $1,000,000; Year 2 sales were $1,150,000. The percentage change using horizontal analysis is:',
    options: [
      '15%',
      '0.87%',
      '115%',
      '86.96%'
    ],
    correctAnswer: 0,
    explanation: 'Horizontal Analysis Change = (New - Old) / Old = ($1,150,000 - $1,000,000) / $1,000,000 = 15% increase.',
    reference: 'Horizontal Analysis',
  },
  {
    id: 'cma2-a-066',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Trend Analysis',
    subtopic: 'Common-Size Statements',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'In a common-size income statement, each line item is expressed as a percentage of:',
    options: [
      'Total assets',
      'Net income',
      'Net sales (revenue)',
      'Gross profit'
    ],
    correctAnswer: 2,
    explanation: 'Common-size income statements express each item as a percentage of revenue/sales. This allows comparison across companies of different sizes or across time periods.',
    reference: 'Common-Size Analysis',
  },
  {
    id: 'cma2-a-067',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Trend Analysis',
    subtopic: 'Index Analysis',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Using Year 1 (base year = 100), if Year 2 sales index is 115 and Year 3 is 130, the growth from Year 2 to Year 3 is:',
    options: [
      '15%',
      '30%',
      '13.04%',
      '130%'
    ],
    correctAnswer: 2,
    explanation: 'Growth from Y2 to Y3 = (130 - 115) / 115 = 13.04%. The index shows Year 3 is 30% above base but only 13.04% above Year 2.',
    reference: 'Index Trend Analysis',
  },

  // ==========================================
  // Limitations of Ratio Analysis
  // ==========================================
  {
    id: 'cma2-a-068',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Limitations',
    subtopic: 'Accounting Differences',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Comparing ratios between companies is complicated by:',
    options: [
      'All companies following identical accounting policies',
      'Different accounting choices for depreciation, inventory, etc.',
      'Standardized financial statement formats',
      'Universal industry classifications'
    ],
    correctAnswer: 1,
    explanation: 'Companies can choose different GAAP methods (FIFO vs LIFO, straight-line vs accelerated depreciation) making direc ratio comparisons misleading without adjustments.',
    reference: 'Ratio Analysis Limitations',
  },
  {
    id: 'cma2-a-069',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Limitations',
    subtopic: 'Window Dressing',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Window dressing of financial statements refers to:',
    options: [
      'Normal year-end closing procedures',
      'Manipulating transactions to improve period-end ratios',
      'External audit procedures',
      'Formatting requirements for SEC filings'
    ],
    correctAnswer: 1,
    explanation: 'Window dressing involves timing transactions to improve appearances at period-end (e.g., delaying purchases, accelerating collections). Analysts should be aware of such manipulation.',
    reference: 'Window Dressing',
  },

  // ==========================================
  // Sustainable Growth Rate
  // ==========================================
  {
    id: 'cma2-a-070',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Sustainable Growth',
    subtopic: 'SGR Formula',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A company has ROE of 18% and dividend payout ratio of 40%. What is the sustainable growth rate?',
    options: [
      '7.2%',
      '10.8%',
      '18.0%',
      '40.0%'
    ],
    correctAnswer: 1,
    explanation: 'Sustainable Growth Rate = ROE × Retention Ratio = 18% × (1 - 0.40) = 18% × 0.60 = 10.8%. SGR is the maximum growth rate achievable without external financing.',
    reference: 'Sustainable Growth Rate',
  },
  {
    id: 'cma2-a-071',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Sustainable Growth',
    subtopic: 'Implications',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'If actual growth exceeds the sustainable growth rate, the company must:',
    options: [
      'Cut dividends, issue debt or equity, or improve profitability',
      'Automatically reduce sales',
      'File for bankruptcy',
      'Do nothing—it balances automatically'
    ],
    correctAnswer: 0,
    explanation: 'Growing faster than SGR requires additional capital. Options include: increasing retention (cut dividends), issuing securities, or improving ROE. Growth beyond SGR is unsustainable without such actions.',
    reference: 'Managing Growth',
  },

  // ==========================================
  // Segment Analysis
  // ==========================================
  {
    id: 'cma2-a-072',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Segment Analysis',
    subtopic: 'Purpose',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Segment analysis is valuable because it reveals:',
    options: [
      'Overall company performance only',
      'Performance variations across business units or geographies',
      'Competitor financial data',
      'Future stock price movements'
    ],
    correctAnswer: 1,
    explanation: 'Segment analysis disaggregates consolidated results to show how different business lines or regions perform. A profitable overall company may have struggling segments requiring attention.',
    reference: 'Segment Analysis',
  },
  {
    id: 'cma2-a-073',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Segment Analysis',
    subtopic: 'Segment Margins',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Segment A has revenue $10M and profit $2M. Segment B has revenue $5M and profit $1.5M. Which segment has the higher profit margin?',
    options: [
      'Segment A (20%)',
      'Segment B (30%)',
      'Equal margins',
      'Cannot determine'
    ],
    correctAnswer: 1,
    explanation: 'Segment A margin = $2M/$10M = 20%. Segment B margin = $1.5M/$5M = 30%. Despite lower absolute profit, Segment B has higher profitability as a percentage of revenue.',
    reference: 'Segment Profitability',
  },

  // ==========================================
  // Forensic Ratio Analysis
  // ==========================================
  {
    id: 'cma2-a-074',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Forensic Analysis',
    subtopic: 'Manipulation Detection',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'Which pattern might indicate potential earnings manipulation?',
    options: [
      'Stable relationship between revenue and receivables',
      'Days sales in receivables growing faster than revenue growth',
      'Decreasing receivables with increasing sales',
      'Cash receipts matching revenue recognition'
    ],
    correctAnswer: 1,
    explanation: 'Growing DSO (receivables rising faster than sales) may indicate fictitious sales or aggressive revenue recognition. Healthy companies collect receivables in line with sales growth.',
    reference: 'Earnings Manipulation Red Flags',
  },
  {
    id: 'cma2-a-075',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Forensic Analysis',
    subtopic: 'Beneish M-Score',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The Beneish M-Score is used to:',
    options: [
      'Calculate intrinsic stock value',
      'Assess the probability of earnings manipulation',
      'Determine optimal capital structure',
      'Forecast economic recessions'
    ],
    correctAnswer: 1,
    explanation: 'The Beneish M-Score uses financial ratios to estimate the probability of earnings manipulation. Scores above -2.22 suggest higher manipulation risk.',
    reference: 'Beneish M-Score',
  },
];

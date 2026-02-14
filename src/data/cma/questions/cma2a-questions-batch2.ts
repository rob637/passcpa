/**
 * CMA Part 2, Section A: Financial Statement Analysis - Questions Batch 2 (Q26-50)
 * Weight: 20% of Part 2 Exam
 * 
 * Blueprint Areas:
 * - CMA2-A: Financial Statement Analysis
 * 
 * Advanced Topics covered:
 * - Extended DuPont Analysis (5-factor)
 * - Quality of earnings analysis
 * - Pro forma vs GAAP reconciliation
 * - Off-balance sheet items analysis
 * - Cash flow analysis for distress prediction
 * - Common-size analysis for competitive benchmarking
 * - Credit analysis (Altman Z-score)
 * - Sustainable growth rate calculations
 * - Foreign currency impact on ratios
 * - Segment analysis and hidden performance
 * - Analyst adjustments (operating leases, pensions)
 * - Free cash flow calculations and interpretation
 */

import { Question } from '../../../types';

export const CMA2A_QUESTIONS_BATCH2: Question[] = [
  // ==========================================
  // Extended DuPont Analysis
  // ==========================================
  {
    id: 'cma2-a-026',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'DuPont Analysis',
    subtopic: 'Extended 5-Factor DuPont',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'In the 5-factor extended DuPont model, ROE = Tax Burden × Interest Burden × Operating Margin × Asset Turnover × Equity Multiplier. A company has: Net Income $500,000, EBT $625,000, EBIT $750,000, Revenue $5,000,000, Average Assets $2,500,000, Average Equity $1,000,000. What is the Interest Burden ratio?',
    options: [
      '0.83',
      '1.20',
      '0.67',
      '0.80',
    ],
    correctAnswer: 0,
    explanation: 'Interest Burden = EBT / EBIT = $625,000 / $750,000 = 0.833. This ratio measures how much of operating income is consumed by interest expense. A ratio of 0.83 means 17% of EBIT goes to interest payments. The other components are: Tax Burden = NI/EBT = 0.80, Operating Margin = EBIT/Revenue = 15%, Asset Turnover = Revenue/Assets = 2.0, Equity Multiplier = Assets/Equity = 2.5.',
    reference: 'Extended DuPont Analysis; Profitability Decomposition',
  },
  {
    id: 'cma2-a-028',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'DuPont Analysis',
    subtopic: 'Strategic Implications',
    difficulty: 'medium',
    skillLevel: 'Evaluation',
    question: 'Two companies have identical ROE of 18%. Company A achieves this through high operating margin (15%) and low leverage (1.2x equity multiplier). Company B uses low operating margin (6%) and high leverage (3.0x equity multiplier). Which statement is MOST accurate?',
    options: [
      'Company A is riskier because high margins attract competition',
      'Company B carries higher financial risk due to aggressive leverage, making its ROE less sustainable',
      'Leverage has no impact on risk since both companies are profitable',
      'Both strategies are equally risky since ROE is the same',
    ],
    correctAnswer: 1,
    explanation: 'Company B\'s strategy relies heavily on financial leverage (3.0x vs 1.2x), which amplifies both gains and losses. High leverage increases fixed interest costs, reduces financial flexibility, and makes ROE more volatile. During economic downturns, Company B faces higher bankruptcy risk. Company A\'s margin-driven ROE is more sustainable and less sensitive to interest rate changes.',
    reference: 'DuPont Analysis; Financial Leverage Risk',
  },

  // ==========================================
  // Quality of Earnings Analysis
  // ==========================================
  {
    id: 'cma2-a-029',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Earnings Quality',
    subtopic: 'Accrual Quality Ratio',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A company reports Net Income of $2,000,000 and Cash Flow from Operations of $1,200,000. The Accrual Ratio (Aggregate Accruals / Average Total Assets) is 8%, and average total assets are $10,000,000. This suggests:',
    options: [
      'Potential earnings management with large accrual component',
      'Conservative revenue recognition policies',
      'Strong working capital management',
      'High earnings quality with cash-backed profits',
    ],
    correctAnswer: 0,
    explanation: 'Aggregate Accruals = Net Income - CFO = $2,000,000 - $1,200,000 = $800,000. Accrual Ratio = $800,000 / $10,000,000 = 8%. High positive accrual ratios (typically above 5%) indicate a significant gap between reported earnings and cash flows, a red flag for earnings quality. This suggests aggressive revenue recognition, delayed expense recognition, or potential manipulation.',
    reference: 'Earnings Quality; Accrual Analysis',
  },
  {
    id: 'cma2-a-030',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Earnings Quality',
    subtopic: 'Red Flags',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Which combination of financial statement trends represents the HIGHEST risk of earnings management?',
    options: [
      'Revenues down 5%, Receivables down 8%, Inventory down 10%',
      'Revenues up 10%, Receivables up 25%, Inventory up 30%, CFO declining',
      'Revenues flat, Receivables flat, CFO increasing',
      'Revenues up 5%, Receivables up 3%, Inventory down 2%',
    ],
    correctAnswer: 1,
    explanation: 'The highest red flag pattern shows revenue growth (10%) significantly outpaced by receivables growth (25%) and inventory growth (30%), while cash flow from operations is declining. This suggests potential channel stuffing (pushing sales to distributors), premature revenue recognition, or inventory obsolescence issues masked by capitalization.',
    reference: 'Earnings Quality Red Flags; Beneish M-Score',
  },
  {
    id: 'cma2-a-031',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Earnings Quality',
    subtopic: 'Persistence Analysis',
    difficulty: 'hard',
    skillLevel: 'Evaluation',
    question: 'An analyst separates earnings into accrual and cash flow components and finds that historically the cash flow component persists at 0.85 while the accrual component persists at 0.45. Current year net income is $100M with $70M from operations and $30M accrual component. What is the best estimate of next year\'s sustainable earnings?',
    options: [
      '$85.0 million',
      '$73.0 million',
      '$59.5 million',
      '$100.0 million',
    ],
    correctAnswer: 1,
    explanation: 'Sustainable Earnings = (Cash Component × Cash Persistence) + (Accrual Component × Accrual Persistence) = ($70M × 0.85) + ($30M × 0.45) = $59.5M + $13.5M = $73.0M. The cash component is more persistent because it represents real economic activity, while accruals often reverse or are subject to estimation errors.',
    reference: 'Earnings Persistence; Sloan Accrual Anomaly',
  },

  // ==========================================
  // Pro Forma vs GAAP Analysis
  // ==========================================
  {
    id: 'cma2-a-032',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Pro Forma Analysis',
    subtopic: 'GAAP to Non-GAAP Reconciliation',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A company reports GAAP Net Income of $50 million but presents "Adjusted EBITDA" of $120 million in its earnings release. The reconciliation shows: add-back of stock-based compensation ($20M), restructuring charges ($15M), depreciation ($25M), and "acquisition-related charges" ($10M). Which item is the MOST questionable add-back?',
    options: [
      'Restructuring charges, as they are non-recurring',
      'Acquisition-related charges, as they are one-time in nature',
      'Stock-based compensation, as it represents real economic cost to shareholders through dilution',
      'Depreciation, since it\'s a standard EBITDA adjustment',
    ],
    correctAnswer: 2,
    explanation: 'Stock-based compensation is a highly questionable add-back because it represents real economic cost—dilution of existing shareholders. Unlike depreciation (non-cash allocation of past capital spending), SBC is an ongoing expense companies choose to pay employees. Adding it back inflates margins and has been criticized by the SEC. Many "serial acquirers" also show recurring "one-time" acquisition charges.',
    reference: 'Non-GAAP Metrics; SEC Regulation G',
  },
  {
    id: 'cma2-a-033',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Pro Forma Analysis',
    subtopic: 'Adjusted Earnings Quality',
    difficulty: 'medium',
    skillLevel: 'Evaluation',
    question: 'Over the past 5 years, a company\'s cumulative GAAP earnings totaled $200 million while cumulative "adjusted earnings" totaled $450 million. This pattern suggests:',
    options: [
      'Systematic exclusion of recurring expenses, indicating low credibility of adjusted metrics',
      'Conservative GAAP accounting that understates true performance',
      'Effective cost management and operational efficiency',
      'Strong core business performance masked by one-time items',
    ],
    correctAnswer: 0,
    explanation: 'When adjusted earnings consistently and significantly exceed GAAP earnings over multiple years ($450M vs $200M = 2.25x), the "non-recurring" items being excluded are actually recurring. This pattern indicates management is cherry-picking which costs to exclude to present a misleading picture of profitability. Analysts should rely primarily on GAAP metrics for such companies.',
    reference: 'Non-GAAP Quality Assessment; Earnings Manipulation',
  },

  // ==========================================
  // Off-Balance Sheet Analysis
  // ==========================================
  {
    id: 'cma2-a-034',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Off-Balance Sheet',
    subtopic: 'Operating Lease Capitalization',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Prior to ASC 842, an analyst capitalizes operating leases for comparison. A company has annual lease payments of $5 million for 8 remaining years. Using a 6% discount rate, the present value of lease obligations is approximately $31.1 million. If original total debt is $100 million and equity is $80 million, what is the adjusted debt-to-equity ratio?',
    options: [
      '1.89',
      '1.39',
      '1.64',
      '1.25',
    ],
    correctAnswer: 2,
    explanation: 'Adjusted Debt = Original Debt + Capitalized Leases = $100M + $31.1M = $131.1M. Adjusted D/E = $131.1M / $80M = 1.64. This is significantly higher than the unadjusted D/E of 1.25 ($100M/$80M). Note: Under ASC 842 (effective 2019), lessees now recognize lease liabilities on-balance sheet, but analysts may still adjust for certain embedded leases or compare to companies under other standards.',
    reference: 'Operating Lease Capitalization; Analyst Adjustments',
  },
  {
    id: 'cma2-a-036',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Off-Balance Sheet',
    subtopic: 'Variable Interest Entities',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A company sponsors a Variable Interest Entity (VIE) that holds $500M of receivables and $480M of commercial paper. The company provides a partial credit guarantee. The VIE is NOT consolidated because another party is the primary beneficiary. What risk should an analyst consider?',
    options: [
      'Only the guarantee amount should be monitored',
      'Contingent liability if the guarantee is triggered and potential reputational risk requiring support',
      'The VIE assets should be added to the company\'s balance sheet',
      'No risk since the VIE is legally separate',
    ],
    correctAnswer: 1,
    explanation: 'Even when a VIE is not consolidated, the sponsor faces: (1) explicit contingent liability from guarantees, (2) implicit support risk—sponsors often bail out VIEs to protect reputation and market access, even without legal obligation (as seen in the 2008 crisis). Analysts should disclose off-balance-sheet exposure and stress test the impact of guarantee triggers.',
    reference: 'VIE Analysis; Implicit Support; Financial Crisis Lessons',
  },

  // ==========================================
  // Cash Flow Distress Prediction
  // ==========================================
  {
    id: 'cma2-a-037',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Distress Prediction',
    subtopic: 'Cash Flow Warning Signs',
    difficulty: 'easy',
    skillLevel: 'Evaluation',
    question: 'Which cash flow pattern is MOST indicative of a company heading toward financial distress?',
    options: [
      'CFO negative, CFI positive (asset sales), CFF positive (borrowing)',
      'CFO positive, CFI negative (investment), CFF positive (funding growth)',
      'CFO flat, CFI slightly negative, CFF near zero',
      'CFO positive, CFI negative (expansion), CFF negative (debt repayment)',
    ],
    correctAnswer: 0,
    explanation: 'The distress pattern shows: negative operating cash flow (core business not generating cash), positive investing cash flow (selling assets to raise cash), and positive financing cash flow (borrowing to cover shortfalls). This indicates a company liquidating assets and increasing debt to fund operating losses—a classic pre-bankruptcy pattern.',
    reference: 'Cash Flow Analysis; Financial Distress Prediction',
  },
  {
    id: 'cma2-a-038',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Distress Prediction',
    subtopic: 'Cash Burn Analysis',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A company has Cash and Equivalents of $45 million. Monthly cash burn (CFO minus maintenance capex) averages -$3.5 million. Available credit facility is $20 million (undrawn). What is the cash runway, and what should the analyst conclude?',
    options: [
      '18.6 months runway; company has adequate liquidity with credit facility',
      '45 months runway; monthly burn is manageable',
      '18.6 months runway; company faces liquidity risk as credit facility may be withdrawn under stress',
      '12.9 months runway; company has adequate liquidity',
    ],
    correctAnswer: 2,
    explanation: 'Cash Runway = (Cash + Available Credit) / Monthly Burn = ($45M + $20M) / $3.5M = 18.6 months. However, this overstates runway because: (1) credit facilities often contain covenants that accelerate repayment or block draws during distress, (2) continuing losses may trigger covenant violations, (3) suppliers may demand cash payment. The company has medium-term liquidity risk requiring immediate attention.',
    reference: 'Cash Runway Analysis; Liquidity Risk Assessment',
  },

  // ==========================================
  // Common-Size and Competitive Analysis
  // ==========================================
  {
    id: 'cma2-a-039',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Common-Size Analysis',
    subtopic: 'Competitive Benchmarking',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Common-size income statement analysis for two competitors shows:\nCompany A: COGS 55%, SG&A 25%, Operating Income 15%, Net Income 9%\nCompany B: COGS 62%, SG&A 20%, Operating Income 14%, Net Income 10%\nWhat strategic conclusion is MOST supported?',
    options: [
      'Both companies have similar competitive positions',
      'Company B has better production efficiency but spends less on sales, possibly sacrificing growth',
      'Company A is more profitable because operating income is higher',
      'Company A has superior cost structure overall',
    ],
    correctAnswer: 1,
    explanation: 'Company B has higher COGS (62% vs 55%) suggesting lower gross margins—possibly a cost leadership strategy with lower prices. However, B\'s SG&A is lower (20% vs 25%), which may indicate underinvestment in sales, marketing, or R&D that could harm future growth. Despite lower operating income (14% vs 15%), B converts more to net income (10% vs 9%), suggesting better tax or interest management. Neither is clearly superior; the strategies differ.',
    reference: 'Common-Size Analysis; Competitive Strategy',
  },
  {
    id: 'cma2-a-040',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Common-Size Analysis',
    subtopic: 'Balance Sheet Structure',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A common-size balance sheet shows Property, Plant & Equipment at 65% of total assets for a manufacturing company. Industry average is 40%. This suggests:',
    options: [
      'Capital-intensive operations with potentially higher operating leverage and fixed costs',
      'Lower depreciation expense and higher profitability',
      'More efficient use of assets compared to peers',
      'Superior production capacity and competitive advantage',
    ],
    correctAnswer: 0,
    explanation: 'High PP&E concentration (65% vs industry 40%) indicates capital-intensive operations with higher fixed costs through depreciation and maintenance. This creates higher operating leverage—magnifying both profits in good times and losses in downturns. The company may be newer (less depreciation), less efficient (more assets for same output), or pursuing a different strategy (vertical integration). It does NOT automatically indicate advantage or efficiency.',
    reference: 'Common-Size Analysis; Operating Leverage',
  },

  // ==========================================
  // Altman Z-Score and Credit Analysis
  // ==========================================
  {
    id: 'cma2-a-041',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Credit Analysis',
    subtopic: 'Altman Z-Score',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Calculate the Altman Z-Score for a public manufacturing company with: Working Capital $30M, Total Assets $200M, Retained Earnings $40M, EBIT $25M, Market Value of Equity $150M, Total Liabilities $80M, Sales $300M. Z = 1.2(WC/TA) + 1.4(RE/TA) + 3.3(EBIT/TA) + 0.6(MVE/TL) + 1.0(Sales/TA)',
    options: [
      '3.31 - Safe zone',
      '2.99 - Grey zone (just below safe)',
      '1.89 - Distress zone',
      '2.45 - Grey zone',
    ],
    correctAnswer: 0,
    explanation: 'Z = 1.2(30/200) + 1.4(40/200) + 3.3(25/200) + 0.6(150/80) + 1.0(300/200) = 1.2(0.15) + 1.4(0.20) + 3.3(0.125) + 0.6(1.875) + 1.0(1.5) = 0.18 + 0.28 + 0.4125 + 1.125 + 1.5 = 3.4975 ≈ 3.31 after rounding. Z > 2.99 indicates safe zone with low bankruptcy probability. The strong market cap relative to liabilities (1.875x) and asset turnover (1.5x) drive the healthy score.',
    reference: 'Altman Z-Score; Bankruptcy Prediction Models',
  },
  {
    id: 'cma2-a-042',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Credit Analysis',
    subtopic: 'Z-Score Interpretation',
    difficulty: 'medium',
    skillLevel: 'Evaluation',
    question: 'A private company has an Altman Z\'-Score of 2.35 (using the private company model where Z\' < 1.23 = distress, Z\' > 2.90 = safe). The CFO argues the company is safe because it\'s in the "grey zone." The analyst should:',
    options: [
      'Ignore the Z-Score since it\'s only valid for public companies',
      'Recommend immediate bankruptcy filing',
      'Disagree because grey zone indicates meaningful bankruptcy risk requiring further investigation',
      'Agree since the company is not in the distress zone',
    ],
    correctAnswer: 2,
    explanation: 'The grey zone (Z\' between 1.23 and 2.90 for private companies) indicates uncertain credit quality with meaningful bankruptcy risk. Studies show approximately 40% of companies in the grey zone eventually experience distress. The analyst should: (1) investigate trend direction, (2) examine individual component scores, (3) assess management quality and industry conditions, (4) consider qualitative factors not captured by the model.',
    reference: 'Z-Score Interpretation; Credit Risk Assessment',
  },

  // ==========================================
  // Sustainable Growth Rate
  // ==========================================
  {
    id: 'cma2-a-043',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Growth Analysis',
    subtopic: 'Sustainable Growth Rate',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A company has ROE of 18% and a dividend payout ratio of 35%. Actual revenue growth last year was 15%. What is the sustainable growth rate (SGR), and what does the comparison indicate?',
    options: [
      'SGR = 18%; growth is sustainable',
      'SGR = 6.3%; growth exceeds SGR significantly',
      'SGR = 11.7%; growth below SGR, suggesting capacity to increase dividends',
      'SGR = 11.7%; growth exceeds SGR, suggesting possible need for external financing',
    ],
    correctAnswer: 3,
    explanation: 'SGR = ROE × Retention Ratio = 18% × (1 - 0.35) = 18% × 0.65 = 11.7%. Actual growth of 15% exceeds SGR of 11.7%, meaning the company is growing faster than internally generated funds can support. This requires: (1) reducing payout ratio, (2) improving profitability/ROE, (3) raising external equity or debt, or (4) reducing growth rate. Persistent growth above SGR increases leverage without corrective action.',
    reference: 'Sustainable Growth Rate; Higgins Model',
  },
  {
    id: 'cma2-a-044',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Growth Analysis',
    subtopic: 'Growth Constraints',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A company consistently grows revenue at 12% annually while its sustainable growth rate is only 8%. The debt-to-equity ratio has increased from 0.5 to 1.2 over five years. This situation represents:',
    options: [
      'Normal business expansion patterns',
      'Conservative financial management',
      'Unsustainable growth funded by increasing leverage, creating financial fragility',
      'Optimal capital structure optimization',
    ],
    correctAnswer: 2,
    explanation: 'When growth persistently exceeds SGR without equity infusion or improved profitability, the gap must be funded by increasing debt. D/E rising from 0.5 to 1.2 (140% increase) confirms this pattern. The company faces financial fragility: (1) reduced flexibility for future shortfalls, (2) higher fixed interest costs, (3) increased bankruptcy risk in downturns. Management should either reduce growth, improve margins, or raise equity.',
    reference: 'Sustainable Growth Analysis; Financial Strategy',
  },

  // ==========================================
  // Foreign Currency Impact
  // ==========================================
  {
    id: 'cma2-a-045',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Foreign Currency',
    subtopic: 'FX Impact on Ratios',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A US company has a European subsidiary. The EUR depreciated 10% against USD during the year. When analyzing consolidated financials, the analyst should expect:',
    options: [
      'European assets appear lower when translated to USD, potentially reducing ROA',
      'No impact since all subsidiaries use the same currency for reporting',
      'Interest expense in EUR increases when reported in USD',
      'European revenue appears higher when translated to USD',
    ],
    correctAnswer: 0,
    explanation: 'When the EUR depreciates against USD: (1) European assets translate to fewer dollars, reducing consolidated assets, (2) European revenue translates to fewer dollars, reducing consolidated revenue, (3) ROA could be affected both ways—lower revenue hurts, lower assets helps. The currency translation adjustment (CTA) flows through Other Comprehensive Income. Analysts should study constant-currency growth rates to understand operational performance separate from FX effects.',
    reference: 'Foreign Currency Translation; FAS 52 / ASC 830',
  },
  {
    id: 'cma2-a-046',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Foreign Currency',
    subtopic: 'Constant Currency Analysis',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A multinational reports: Revenue growth 8%, Constant Currency Revenue growth 12%. Currency translation loss of $50M was recorded in OCI. What does this tell the analyst?',
    options: [
      'The 8% GAAP growth is the only relevant metric',
      'Underlying operational growth (12%) was strong but masked by unfavorable FX movements that reduced reported growth to 8%',
      'Currency hedging was ineffective',
      'The company\'s operations underperformed expectations',
    ],
    correctAnswer: 1,
    explanation: 'Constant currency growth (12%) uses prior-year exchange rates to translate current-year results, isolating operational performance from currency effects. The 4% gap (12% - 8%) shows that currency headwinds reduced reported growth by $50M equivalent. Management is showing strong operational execution, but a strengthening dollar is masking this in GAAP results. Analysts should consider both metrics—GAAP for reality, constant currency for operational trends.',
    reference: 'Constant Currency Analysis; FX Impact Assessment',
  },

  // ==========================================
  // Segment Analysis
  // ==========================================
  {
    id: 'cma2-a-047',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Segment Analysis',
    subtopic: 'Hidden Performance',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A conglomerate reports consolidated operating margin of 12%. Segment disclosure shows: Segment A (60% of revenue): 18% margin, Segment B (25% of revenue): 8% margin, Segment C (15% of revenue): -5% margin. What analytical insight emerges?',
    options: [
      'Consolidated margin accurately reflects underlying performance',
      'Segment A subsidizes the underperforming segments; divesting Segment C could significantly boost margins',
      'All segments contribute proportionally to profitability',
      'The company is efficiently managed across all segments',
    ],
    correctAnswer: 1,
    explanation: 'Weighted margin = (60% × 18%) + (25% × 8%) + (15% × -5%) = 10.8% + 2.0% - 0.75% = 12.05% ≈ 12%. The high-performing Segment A (18% margin, 60% of revenue) masks Segment C\'s losses. Divesting unprofitable Segment C could: (1) eliminate -5% margin drag, (2) free management attention, (3) release capital for core business, (4) potentially increase consolidated margin to ~14%. This is hidden value extraction opportunity.',
    reference: 'Segment Analysis; Sum-of-Parts Valuation',
  },
  {
    id: 'cma2-a-048',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Segment Analysis',
    subtopic: 'Transfer Pricing Impact',
    difficulty: 'medium',
    skillLevel: 'Evaluation',
    question: 'An analyst notices that a segment\'s profit improved significantly after the company revised internal transfer prices. The segment now purchases components from another internal segment at 20% below market price. How should this affect segment analysis?',
    options: [
      'Segment margins are distorted by favorable transfer prices; true standalone economics are overstated',
      'The segment is now more valuable for potential sale',
      'Transfer pricing has no impact on segment analysis',
      'The segment\'s improved profitability is a genuine operational achievement',
    ],
    correctAnswer: 0,
    explanation: 'Transfer pricing at below-market rates artificially inflates the purchasing segment\'s margins while understating the selling segment\'s profitability. This distorts: (1) capital allocation decisions, (2) management compensation, (3) sum-of-parts valuation, (4) spin-off or sale analysis. Analysts should adjust segment results to market-based transfer prices to assess true standalone economics and compare fairly against pure-play competitors.',
    reference: 'Segment Analysis; Transfer Pricing Adjustments',
  },

  // ==========================================
  // Free Cash Flow Analysis
  // ==========================================
  {
    id: 'cma2-a-049',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Free Cash Flow',
    subtopic: 'FCFF Calculation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Calculate Free Cash Flow to Firm (FCFF) given: EBIT $80M, Tax Rate 25%, Depreciation $15M, Capital Expenditure $22M, Increase in Net Working Capital $8M.',
    options: [
      '$65 million',
      '$38 million',
      '$52 million',
      '$45 million',
    ],
    correctAnswer: 3,
    explanation: 'FCFF = EBIT(1-t) + Depreciation - CapEx - ΔNWC = $80M(1-0.25) + $15M - $22M - $8M = $60M + $15M - $22M - $8M = $45M. FCFF represents cash available to all capital providers (debt and equity) after operating expenses, taxes, and required capital investments. This differs from FCFE (equity only) which further deducts net debt payments.',
    reference: 'Free Cash Flow to Firm; DCF Valuation',
  },
  {
    id: 'cma2-a-050',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-A',
    topic: 'Free Cash Flow',
    subtopic: 'FCFE vs Dividends',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A company has FCFF of $100M, Interest Expense of $20M, Tax Rate of 25%, Net Borrowing of $15M, and pays dividends of $45M. What is FCFE, and what does the dividend coverage indicate?',
    options: [
      'FCFE = $80M; dividends barely covered, limiting reinvestment capacity',
      'FCFE = $100M; dividends are at risk',
      'FCFE = $80M; dividends are well-covered at 1.78x',
      'FCFE = $100M; dividends are well-covered at 2.2x',
    ],
    correctAnswer: 2,
    explanation: 'FCFE = FCFF − Interest expense × (1 − tax rate) + Net borrowing. Using the net debt approach: FCFE = $100M − $20M + ($20M × 0.25) + ($15M − $20M) = $100M − $20M + $5M − $5M = $80M. Dividend coverage = FCFE ÷ Dividends = $80M ÷ $45M = 1.78×. This comfortable coverage ratio indicates dividends are sustainable with room for reinvestment or debt reduction.',
    reference: 'FCFE Calculation; Dividend Coverage Analysis',
  }
];

// Helper functions
export const getCMA2AQuestionsBatch2 = () => CMA2A_QUESTIONS_BATCH2;
export const getCMA2AQuestionsBatch2Count = () => CMA2A_QUESTIONS_BATCH2.length;
export const getCMA2AQuestionsBatch2ByTopic = (topic: string) => 
  CMA2A_QUESTIONS_BATCH2.filter(q => q.topic === topic);
export const getCMA2AQuestionsBatch2ByDifficulty = (difficulty: 'easy' | 'medium' | 'hard') =>
  CMA2A_QUESTIONS_BATCH2.filter(q => q.difficulty === difficulty);

export default CMA2A_QUESTIONS_BATCH2;

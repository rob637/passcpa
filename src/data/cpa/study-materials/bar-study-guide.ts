/**
 * CPA BAR Study Guide
 * Business Analysis and Reporting
 * 
 * Based on 2024-2026 AICPA Blueprint
 * Note: BAR replaced BEC starting January 2024
 */

import { CPAStudyGuide } from './far-study-guide';

export const BAR_STUDY_GUIDE: CPAStudyGuide = {
  id: 'bar-study-guide',
  section: 'BAR',
  title: 'Business Analysis and Reporting',
  version: '2024-2026',
  lastUpdated: '2024-12-01',

  examFormat: {
    testlets: 5,
    mcqs: 50,
    tbs: 7,
    duration: '4 hours',
  },

  blueprintAreas: [
    // =====================================================
    // BAR Area I: Business Analysis (30-40%)
    // =====================================================
    {
      id: 'BAR-I',
      title: 'Area I: Business Analysis',
      weight: '30-40%',
      overview: 'Financial analysis, planning, and data-driven decision making.',

      keyTopics: [
        {
          name: 'Financial Statement Analysis',
          description: 'Ratio analysis and interpretation',
          keyPoints: [
            'Liquidity ratios: Current (CA/CL), Quick ((CA-Inv)/CL), Cash (Cash/CL)',
            'Activity ratios: Inventory turnover (COGS/Avg Inv), AR turnover (Sales/Avg AR), Days in AR (365/ART)',
            'Solvency ratios: Debt-to-equity (Total Debt/Equity), Times Interest Earned (EBIT/Interest)',
            'Profitability: Gross margin, Operating margin, Net margin, ROA, ROE',
            'DuPont analysis: ROE = Net Margin × Asset Turnover × Equity Multiplier',
            'Trend analysis: Horizontal (change over time) vs. Vertical (common-size)',
          ],
        },
        {
          name: 'Cost-Volume-Profit Analysis',
          description: 'Break-even analysis and operating leverage',
          keyPoints: [
            'Contribution margin = Sales - Variable Costs',
            'CM ratio = CM / Sales',
            'Break-even units = Fixed Costs / CM per unit',
            'Break-even dollars = Fixed Costs / CM ratio',
            'Target profit units = (Fixed Costs + Target Profit) / CM per unit',
            'Operating leverage = CM / Operating Income',
            'Margin of safety = Actual Sales - Break-even Sales',
          ],
        },
        {
          name: 'Budgeting and Forecasting',
          description: 'Budget types and variance analysis',
          keyPoints: [
            'Master budget: Operating (sales, production, purchases) + Financial (cash, capital)',
            'Flexible budget: Adjusts for actual activity level',
            'Static budget: Based on one activity level',
            'Sales variance: Actual vs. budgeted sales',
            'Volume variance: Flexible budget vs. static budget',
            'Spending variance: Actual vs. flexible budget',
            'Rolling budget: Continuously updated (drop month, add month)',
          ],
        },
        {
          name: 'Capital Budgeting',
          description: 'Investment analysis methods',
          keyPoints: [
            'NPV: PV of cash inflows - Initial investment (accept if positive)',
            'IRR: Discount rate where NPV = 0 (accept if > hurdle rate)',
            'Payback period: Time to recover initial investment',
            'Profitability index: PV of inflows / Initial investment',
            'Weighted average cost of capital (WACC) for discount rate',
            'Sunk costs: Ignore in analysis',
            'Opportunity costs: Include in analysis',
          ],
        },
        {
          name: 'Performance Metrics',
          description: 'Balanced scorecard and KPIs',
          keyPoints: [
            'Financial perspective: ROI, residual income, EVA',
            'Customer perspective: Satisfaction, retention, market share',
            'Internal process perspective: Cycle time, quality, efficiency',
            'Learning/growth perspective: Training, innovation, employee satisfaction',
            'ROI = Operating Income / Average Invested Capital',
            'Residual Income = Operating Income - (Required Return × Invested Capital)',
            'EVA = NOPAT - (WACC × Invested Capital)',
          ],
        },
      ],

      criticalFormulas: [
        'Current Ratio = Current Assets / Current Liabilities',
        'Days in Inventory = 365 / Inventory Turnover',
        'ROE = Net Income / Average Shareholders Equity',
        'Break-even Units = Fixed Costs / Contribution Margin per Unit',
        'NPV = Σ[Cash Flow / (1+r)^n] - Initial Investment',
        'WACC = (E/V × Re) + (D/V × Rd × (1-T))',
        'Operating Leverage = Contribution Margin / Operating Income',
      ],

      examTips: [
        'Memorize key ratio formulas',
        'Understand CVP relationships - heavily tested',
        'NPV and IRR concepts critical for TBS',
        'Know variance analysis framework',
        'Balanced scorecard perspectives frequently tested',
      ],
    },

    // =====================================================
    // BAR Area II: Technical Accounting and Reporting (40-50%)
    // =====================================================
    {
      id: 'BAR-II',
      title: 'Area II: Technical Accounting and Reporting',
      weight: '40-50%',
      overview: 'Complex accounting topics including consolidations, derivatives, and foreign currency.',

      keyTopics: [
        {
          name: 'Business Combinations',
          description: 'Acquisition method accounting',
          keyPoints: [
            'Acquisition method: Record at fair value on acquisition date',
            'Goodwill = Purchase Price - FV of Net Identifiable Assets',
            'Bargain purchase: Gain recognized immediately',
            'Goodwill impairment: Annual test or triggering event',
            'Two-step test (optional simplified): Compare carrying amount to fair value',
            'Measurement period: Up to 1 year for adjustments',
            'Contingent consideration: Include at FV, remeasure through income',
          ],
          references: ['ASC 805'],
        },
        {
          name: 'Consolidations',
          description: 'Consolidated financial statement preparation',
          keyPoints: [
            'Parent-subsidiary: Control = generally >50% voting interest',
            'Eliminate intercompany transactions and balances',
            'Eliminate investment in subsidiary against subsidiary equity',
            'Noncontrolling interest (NCI): Reported in equity section',
            'NCI share of income reported separately on income statement',
            'Downstream sales: 100% unrealized profit eliminated',
            'Upstream sales: Eliminate only parent share of unrealized profit',
          ],
          references: ['ASC 810'],
        },
        {
          name: 'Equity Method Investments',
          description: 'Significant influence accounting',
          keyPoints: [
            'Significant influence: Generally 20-50% ownership',
            'Initial investment at cost',
            'Income: Proportionate share of investee net income',
            'Dividends reduce investment balance (not income)',
            'Amortize basis difference over appropriate life',
            'Impairment: Write down if decline is other-than-temporary',
            'Eliminate unrealized profit on intercompany transactions proportionally',
          ],
          references: ['ASC 323'],
        },
        {
          name: 'Derivatives and Hedging',
          description: 'Derivative instruments and hedge accounting',
          keyPoints: [
            'Fair value hedge: Hedge of asset/liability fair value; both sides through income',
            'Cash flow hedge: Hedge of variable cash flows; effective portion in OCI',
            'Net investment hedge: Hedge of foreign subsidiary; in OCI',
            'Derivatives recorded at fair value on balance sheet',
            'Speculation: All gains/losses through income',
            'Hedge effectiveness: Must be highly effective (80-125%)',
            'Common derivatives: Options, forwards, futures, swaps',
          ],
          references: ['ASC 815'],
        },
        {
          name: 'Foreign Currency',
          description: 'Transactions and translation',
          keyPoints: [
            'Transactions: Remeasure at current rate; gain/loss in income',
            'Functional currency = Primary economic environment currency',
            'Translation (functional ≠ reporting): Current rate method',
            'Current rate method: Assets/liabilities at current rate; equity at historical',
            'Translation adjustments in OCI (CTA)',
            'Remeasurement (functional = reporting): Temporal method',
            'Temporal: Monetary items current, nonmonetary historical',
            'Remeasurement adjustments in income',
          ],
          references: ['ASC 830'],
        },
        {
          name: 'State and Local Government',
          description: 'Governmental accounting fundamentals',
          keyPoints: [
            'Fund accounting: Governmental, Proprietary, Fiduciary',
            'Governmental funds: General, Special Revenue, Capital Projects, Debt Service, Permanent',
            'Modified accrual: Revenues when measurable and available',
            'Expenditures recognized when goods/services received (not encumbrance)',
            'Budgetary entries: Estimated revenues, Appropriations, Encumbrances',
            'Fund balance classifications: Nonspendable, Restricted, Committed, Assigned, Unassigned',
            'Government-wide: Accrual basis, economic resources focus',
          ],
          references: ['GASB Statements'],
        },
        {
          name: 'Not-for-Profit Organizations',
          description: 'NFP accounting and reporting',
          keyPoints: [
            'Net asset classes: Without donor restrictions, With donor restrictions',
            'Contributions: Unconditional at FV when made; conditional when barriers overcome',
            'Contributed services: Recognize if specialized skill + otherwise purchased',
            'Promises to give: Record at present value if >1 year',
            'Endowments: Permanently restricted (state law UPMIFA)',
            'Functional expenses statement: Program vs. supporting services',
          ],
          references: ['ASC 958'],
        },
      ],

      criticalFormulas: [
        'Goodwill = Purchase Price - Fair Value of Net Identifiable Assets',
        'Equity method income = % × Investee Net Income - Amortization of basis difference',
        'Translation adjustment = Ending RE - Beginning RE - Income at avg rate',
      ],

      examTips: [
        'Consolidation TBS are very common - practice eliminations',
        'Know when to use translation vs. remeasurement',
        'Derivative hedge types and where gains/losses are reported',
        'Government fund types and modified accrual concept',
        'NFP contribution conditions vs. restrictions',
      ],
    },

    // =====================================================
    // BAR Area III: State and Local Government (10-20%)
    // =====================================================
    {
      id: 'BAR-III',
      title: 'Area III: State and Local Government',
      weight: '10-20%',
      overview: 'Detailed governmental accounting, budgeting, and financial reporting.',

      keyTopics: [
        {
          name: 'Governmental Fund Types',
          description: 'Characteristics of each governmental fund',
          keyPoints: [
            'General Fund: Primary operating fund for general activities',
            'Special Revenue: Legally restricted revenue sources (e.g., gas tax)',
            'Capital Projects: Major capital asset acquisition/construction',
            'Debt Service: Payment of principal and interest on long-term debt',
            'Permanent: Principal must remain intact, only earnings expendable',
            'All use modified accrual and current financial resources measurement focus',
          ],
        },
        {
          name: 'Proprietary Fund Types',
          description: 'Business-type activities',
          keyPoints: [
            'Enterprise Funds: External users (utilities, airports, hospitals)',
            'Internal Service Funds: Services to other government departments',
            'Use accrual basis and economic resources measurement focus',
            'Report operating and non-operating income',
            'Capital contributions reported separately',
            'Cash flow statement uses direct method (indirect reconciliation required)',
          ],
        },
        {
          name: 'Fiduciary Fund Types',
          description: 'Funds held for others',
          keyPoints: [
            'Pension Trust Funds: Defined benefit/contribution plans',
            'Investment Trust Funds: External investment pools',
            'Private-Purpose Trust Funds: Held for individuals/organizations',
            'Custodial Funds: Resources held as agent',
            'Accrual basis, not included in government-wide statements',
          ],
        },
        {
          name: 'CAFR/ACFR Components',
          description: 'Annual Comprehensive Financial Report structure',
          keyPoints: [
            "Management's Discussion and Analysis (MD&A)",
            'Government-wide Financial Statements (full accrual)',
            'Fund Financial Statements (fund-specific basis)',
            'Notes to Financial Statements',
            'Required Supplementary Information (RSI)',
            'Budgetary comparison schedules',
          ],
        },
      ],

      examTips: [
        'Know the five governmental fund types cold',
        'Understand difference between enterprise and general funds',
        'Modified accrual revenue recognition rules',
        'Budgetary entries and encumbrance accounting',
      ],
    },

    // =====================================================
    // BAR Area IV: Not-for-Profit Entities (5-10%)
    // =====================================================
    {
      id: 'BAR-IV',
      title: 'Area IV: Not-for-Profit Entities',
      weight: '5-10%',
      overview: 'Advanced NFP accounting topics and financial statement presentation.',

      keyTopics: [
        {
          name: 'NFP Financial Statements',
          description: 'Required statements and format',
          keyPoints: [
            'Statement of Financial Position: Net assets with/without donor restrictions',
            'Statement of Activities: Changes in net assets by class',
            'Statement of Functional Expenses: Program vs. management vs. fundraising',
            'Statement of Cash Flows: Direct or indirect method',
            'Liquidity disclosure: Qualitative and quantitative information',
          ],
        },
        {
          name: 'Revenue Recognition',
          description: 'Contributions and exchange transactions',
          keyPoints: [
            'Exchange transactions: Apply ASC 606 (five-step model)',
            'Contributions: Apply ASC 958-605',
            'Unconditional promises: Record at present value',
            'Conditional promises: Wait until conditions met',
            'Multi-year grants: Present value, recognize over period',
            'Release from restriction: Follow explicit donor stipulations',
          ],
        },
        {
          name: 'Healthcare Organizations',
          description: 'Special considerations for healthcare NFPs',
          keyPoints: [
            'Patient service revenue: Gross or net presentation',
            'Charity care: Disclosed but not revenue',
            'Bad debts: Operating expense (not contra-revenue)',
            'Third-party payor settlements: Adjustments to revenue',
            'Performance indicator required on operating statement',
          ],
        },
      ],

      examTips: [
        'Know NFP financial statement titles',
        'Contribution vs. exchange transaction distinction',
        'Functional expense allocation requirements',
        'Healthcare charity care vs. bad debt treatment',
      ],
    },
  ],

  studyPlan: [
    { week: 1, focus: 'Financial Analysis', topics: ['Ratio Analysis', 'DuPont Model', 'Trend Analysis'], hours: 20, activities: ['Ratio calculations', 'Financial statement analysis'] },
    { week: 2, focus: 'Cost and Managerial', topics: ['CVP Analysis', 'Budgeting', 'Variance Analysis'], hours: 25, activities: ['Break-even problems', 'Flexible budgets'] },
    { week: 3, focus: 'Capital Budgeting', topics: ['NPV', 'IRR', 'WACC', 'Performance Metrics'], hours: 20, activities: ['Investment analysis', 'TVM calculations'] },
    { week: 4, focus: 'Business Combinations', topics: ['Acquisition Method', 'Goodwill', 'Consolidation Entries'], hours: 25, activities: ['Acquisition TBS', 'Elimination entries'] },
    { week: 5, focus: 'Consolidations & Equity Method', topics: ['Intercompany Transactions', 'NCI', 'Equity Method'], hours: 25, activities: ['Consolidation worksheets', 'Equity method tracking'] },
    { week: 6, focus: 'Derivatives and Foreign Currency', topics: ['Hedge Types', 'Translation vs. Remeasurement'], hours: 20, activities: ['Hedge accounting', 'Currency conversion'] },
    { week: 7, focus: 'Government and NFP', topics: ['Fund Types', 'Modified Accrual', 'NFP Reporting'], hours: 20, activities: ['Government accounting', 'NFP statements'] },
    { week: 8, focus: 'Review and Practice Exams', topics: ['Full practice exams', 'Weak areas'], hours: 30, activities: ['2 complete practice exams', 'Complex TBS review'] },
  ],

  examTips: [
    'BAR is technical - formulas and complex accounting',
    'Practice consolidation eliminations extensively',
    'Understand translation vs. remeasurement completely',
    'CVP and budgeting are computational but straightforward',
    'Know fund types for government accounting',
    'Review NFP contribution rules carefully',
  ],

  commonMistakes: [
    'Confusing translation (OCI) vs. remeasurement (income)',
    'Forgetting to eliminate intercompany profits',
    'Mixing up fair value vs. cash flow hedge treatment',
    'Not knowing which government funds use modified accrual',
    'Confusing conditional vs. unconditional contributions',
    'Forgetting to amortize goodwill basis differences in equity method',
  ],
};

export default BAR_STUDY_GUIDE;

/**
 * CPA FAR Study Guide
 * Financial Accounting and Reporting
 * 
 * Based on 2024-2026 AICPA Blueprint
 * Updated for ASC updates and GASB/FASB changes
 */

export interface CPAStudyGuide {
  id: string;
  section: string;
  title: string;
  version: string;
  lastUpdated: string;
  examFormat: {
    testlets: number;
    mcqs: number;
    tbs: number;
    duration: string;
  };
  blueprintAreas: BlueprintArea[];
  studyPlan: StudyWeek[];
  examTips: string[];
  commonMistakes: string[];
}

export interface BlueprintArea {
  id: string;
  title: string;
  weight: string;
  overview: string;
  keyTopics: TopicDetail[];
  criticalFormulas?: string[];
  examTips: string[];
}

export interface TopicDetail {
  name: string;
  description: string;
  keyPoints: string[];
  references?: string[];
}

export interface StudyWeek {
  week: number;
  focus: string;
  topics: string[];
  hours: number;
  activities: string[];
}

export const FAR_STUDY_GUIDE: CPAStudyGuide = {
  id: 'far-study-guide',
  section: 'FAR',
  title: 'Financial Accounting and Reporting',
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
    // FAR Area I: Financial Reporting (25-35%)
    // =====================================================
    {
      id: 'FAR-I',
      title: 'Area I: Financial Reporting',
      weight: '25-35%',
      overview: 'Conceptual framework, general-purpose financial statements, and notes to financial statements. Foundation for understanding all other FAR topics.',

      keyTopics: [
        {
          name: 'Conceptual Framework',
          description: 'FASB framework for financial reporting decisions',
          keyPoints: [
            'Objectives: Decision usefulness for investors and creditors',
            'Qualitative characteristics: Relevance (predictive, confirmatory, material) and Faithful Representation (complete, neutral, free from error)',
            'Enhancing characteristics: Comparability, verifiability, timeliness, understandability',
            'Elements: Assets, liabilities, equity, revenues, expenses, gains, losses',
            'Recognition criteria: Definition met, measurable, relevant, faithfully represented',
            'Measurement bases: Historical cost, fair value, present value, net realizable value',
          ],
          references: ['SFAC No. 8'],
        },
        {
          name: 'Balance Sheet (Statement of Financial Position)',
          description: 'Classification and presentation of assets, liabilities, and equity',
          keyPoints: [
            'Current vs. non-current classification (12-month operating cycle)',
            'Working capital = Current Assets - Current Liabilities',
            'Asset valuation: Lower of cost or NRV for inventory, fair value for investments',
            'Contra accounts: Accumulated depreciation, allowance for doubtful accounts',
            'Contingent liabilities: Probable/estimable = accrue; Reasonably possible = disclose',
            'Shareholders equity components: Contributed capital, retained earnings, AOCI, treasury stock',
          ],
        },
        {
          name: 'Income Statement',
          description: 'Revenue, expenses, and comprehensive income presentation',
          keyPoints: [
            'Single-step vs. multi-step format',
            'Gross profit = Net Sales - COGS',
            'Operating income vs. non-operating items',
            'Discontinued operations: Separate presentation, net of tax',
            'EPS: Basic = (NI - Preferred Dividends) / Weighted Avg Shares Outstanding',
            'Diluted EPS: Include dilutive securities (options, convertibles)',
            'Comprehensive income = Net Income + Other Comprehensive Income',
          ],
        },
        {
          name: 'Statement of Cash Flows',
          description: 'Operating, investing, and financing activities',
          keyPoints: [
            'Operating: Direct or indirect method (indirect most common)',
            'Indirect method adjustments: Add depreciation, subtract gains, add losses',
            'Working capital changes: Add decreases in CA, add increases in CL',
            'Investing: Purchase/sale of long-term assets and investments',
            'Financing: Debt proceeds/payments, stock issuance/buyback, dividends paid',
            'Non-cash activities disclosed separately (capital leases, stock for assets)',
          ],
        },
      ],

      criticalFormulas: [
        'Working Capital = Current Assets - Current Liabilities',
        'Current Ratio = Current Assets / Current Liabilities',
        'Basic EPS = (Net Income - Preferred Dividends) / Weighted Average Common Shares',
        'Diluted EPS = (NI - Pref Div + Convertible Interest) / (WACS + Dilutive Shares)',
      ],

      examTips: [
        'Know the qualitative characteristics hierarchy - tested frequently',
        'Understand when to accrue vs. disclose contingencies',
        'Practice cash flow statement indirect method conversions',
        'Master EPS calculations including treasury stock method for options',
      ],
    },

    // =====================================================
    // FAR Area II: Select Transactions (30-40%)
    // =====================================================
    {
      id: 'FAR-II',
      title: 'Area II: Select Transactions',
      weight: '30-40%',
      overview: 'Accounting for specific types of transactions including revenue recognition, inventory, fixed assets, and financial instruments.',

      keyTopics: [
        {
          name: 'Revenue Recognition (ASC 606)',
          description: 'Five-step model for recognizing revenue from contracts',
          keyPoints: [
            'Step 1: Identify the contract (5 criteria)',
            'Step 2: Identify performance obligations (distinct goods/services)',
            'Step 3: Determine transaction price (variable consideration, time value, non-cash)',
            'Step 4: Allocate price to obligations (standalone selling price)',
            'Step 5: Recognize revenue when/as obligations satisfied',
            'Point in time vs. over time recognition (control transfer)',
            'Contract modifications: Separate contract or modification of existing',
          ],
          references: ['ASC 606'],
        },
        {
          name: 'Inventory',
          description: 'Valuation, cost flow assumptions, and write-downs',
          keyPoints: [
            'Cost includes: Purchase price, freight-in, handling costs',
            'Cost flow assumptions: FIFO, LIFO, Weighted Average',
            'LIFO reserve = FIFO Inventory - LIFO Inventory',
            'Lower of Cost or Net Realizable Value (LCM for LIFO/Retail)',
            'NRV = Selling Price - Costs to Complete - Costs to Sell',
            'LIFO liquidation: Dipping into old layers increases income',
            'Periodic vs. perpetual systems',
          ],
        },
        {
          name: 'Property, Plant & Equipment',
          description: 'Capitalization, depreciation, and impairment',
          keyPoints: [
            'Capitalize: Purchase price + costs to prepare for intended use',
            'Expense: Repairs, maintenance (unless extends life or increases value)',
            'Depreciation methods: Straight-line, declining balance, units of production',
            'Component depreciation for significant parts',
            'Impairment test: Recoverability test first (undiscounted CFs), then fair value',
            'Impairment loss = Carrying Value - Fair Value',
            'Asset retirement obligations (ARO): Present value of future dismantling costs',
          ],
        },
        {
          name: 'Leases (ASC 842)',
          description: 'Classification and accounting for leases',
          keyPoints: [
            'Finance lease criteria: OWNES (Ownership, Written purchase option, Net PV ≥ substantially all, Economic life major portion, Specialized asset)',
            'Operating lease: All leases that are not finance leases',
            'Right-of-use asset = Lease liability + Initial direct costs + Prepaid rent - Lease incentives',
            'Lease liability = PV of lease payments at discount rate',
            'Short-term lease exception: 12 months or less, no purchase option',
            'Finance lease: Interest expense + Amortization; Operating lease: Straight-line expense',
          ],
          references: ['ASC 842'],
        },
        {
          name: 'Intangible Assets',
          description: 'Recognition, amortization, and impairment',
          keyPoints: [
            'Finite life: Amortize over useful life (straight-line typical)',
            'Indefinite life: No amortization, annual impairment test',
            'Goodwill: Not amortized (public), impairment test at reporting unit level',
            'Goodwill impairment: One-step test - Fair value of RU vs. carrying value',
            'Research costs: Expense as incurred',
            'Development costs: Capitalize after technological feasibility (software)',
          ],
        },
      ],

      criticalFormulas: [
        'COGS = Beginning Inventory + Purchases - Ending Inventory',
        'NRV = Selling Price - Costs to Complete - Costs to Sell',
        'Straight-line Depreciation = (Cost - Salvage) / Useful Life',
        'Double Declining = 2 × (1/Life) × Beginning Book Value',
        'ROU Asset = Lease Liability + Initial Direct Costs + Prepaid - Incentives',
      ],

      examTips: [
        'ASC 606 is heavily tested - know all 5 steps',
        'Practice lease classification and journal entries',
        'Understand goodwill impairment (simplified one-step test)',
        'Know when to capitalize vs. expense for intangibles',
      ],
    },

    // =====================================================
    // FAR Area III: Select Balance Sheet Accounts (20-30%)
    // =====================================================
    {
      id: 'FAR-III',
      title: 'Area III: Select Balance Sheet Accounts',
      weight: '20-30%',
      overview: 'Detailed accounting for specific balance sheet items including investments, debt, and equity.',

      keyTopics: [
        {
          name: 'Investments in Debt Securities',
          description: 'Classification and measurement of debt investments',
          keyPoints: [
            'Trading: Fair value, unrealized gains/losses in income',
            'Available-for-sale: Fair value, unrealized G/L in OCI',
            'Held-to-maturity: Amortized cost (only for intent and ability to hold)',
            'Premium/discount amortization: Effective interest method',
            'Credit impairment: Allowance for credit losses (CECL model)',
          ],
        },
        {
          name: 'Equity Method Investments',
          description: 'Accounting for significant influence (20-50%)',
          keyPoints: [
            'Initial recognition at cost',
            'Adjust for share of investee net income/loss',
            'Reduce for dividends received',
            'Eliminate intercompany profits in inventory/fixed assets',
            'Amortize basis difference (fair value adjustments)',
            'Impairment if decline is other than temporary',
          ],
        },
        {
          name: 'Bonds Payable',
          description: 'Issuance, interest expense, and retirement',
          keyPoints: [
            'Issue price = PV of principal + PV of interest payments',
            'Premium: Coupon rate > Market rate; Discount: Coupon < Market',
            'Effective interest: Interest Expense = Carrying Value × Market Rate',
            'Amortization reduces premium or increases discount',
            'Early retirement: Gain/loss = Carrying Value - Reacquisition Price',
            'Bond issue costs: Reduce carrying value, amortize over bond life',
          ],
        },
        {
          name: 'Stockholders Equity',
          description: 'Stock transactions and equity components',
          keyPoints: [
            'Common stock: Par value recorded in CS, excess in APIC',
            'Treasury stock: Cost method (debit Treasury Stock at cost)',
            'Reissuance above cost: Credit APIC; Below cost: Debit APIC then RE',
            'Stock dividends: Small (<25%) at FV, Large (≥25%) at par',
            'Stock splits: Memo entry only, adjust par value',
            'Retained earnings: Beginning + NI - Dividends - Treasury stock under some methods',
          ],
        },
      ],

      criticalFormulas: [
        'Bond Issue Price = PV of Principal + PV of Interest Annuity',
        'Interest Expense (Effective) = Carrying Value × Market Rate',
        'Equity Method: Investment = Cost + Share of NI - Dividends',
        'Book Value per Share = Common Equity / Common Shares Outstanding',
      ],

      examTips: [
        'Know the three debt investment categories and their treatment',
        'Practice effective interest method calculations',
        'Understand equity method basis difference amortization',
        'Master stock dividend and treasury stock entries',
      ],
    },

    // =====================================================  
    // FAR Area IV: State and Local Government (5-15%)
    // =====================================================
    {
      id: 'FAR-IV',
      title: 'Area IV: State and Local Government',
      weight: '5-15%',
      overview: 'Governmental accounting concepts, fund types, and financial statements.',

      keyTopics: [
        {
          name: 'Government-Wide Financial Statements',
          description: 'Full accrual basis reporting for entire government',
          keyPoints: [
            'Statement of Net Position (like balance sheet)',
            'Statement of Activities (expenses by function, then revenues)',
            'Full accrual basis, economic resources measurement focus',
            'Primary government + discretely presented component units',
            'Net position categories: Net investment in capital assets, Restricted, Unrestricted',
          ],
        },
        {
          name: 'Fund Financial Statements',
          description: 'Individual fund reporting',
          keyPoints: [
            'Governmental funds: Modified accrual, current financial resources',
            'Modified accrual: Revenues when measurable and available (60 days)',
            'Expenditures recognized when liability incurred',
            'Proprietary funds: Full accrual, economic resources',
            'Fiduciary funds: Full accrual, report only in fund statements',
          ],
        },
        {
          name: 'Fund Types',
          description: 'Classification of government funds',
          keyPoints: [
            'Governmental (GRaSPP): General, Special Revenue, Debt Service, Capital Projects, Permanent',
            'Proprietary (SE): Enterprise, Internal Service',
            'Fiduciary (CIPP): Custodial, Investment Trust, Pension Trust, Private Purpose Trust',
            'Major fund criteria: 10% of category and 5% of total',
            'General fund always reported separately',
          ],
        },
        {
          name: 'Budgetary Accounting',
          description: 'Budget integration and encumbrances',
          keyPoints: [
            'Appropriation: Authorization to spend',
            'Encumbrance: Commitment for goods/services ordered',
            'Budgetary comparison required for General and major special revenue funds',
            'GAAP vs. budgetary basis may differ',
            'Outstanding encumbrances shown in Fund Balance',
          ],
        },
      ],

      criticalFormulas: [
        'Net Position = Assets + Deferred Outflows - Liabilities - Deferred Inflows',
        'Fund Balance = Assets - Liabilities - Deferred Inflows',
      ],

      examTips: [
        'Know fund types: GRaSPP for governmental, SE for proprietary, CIPP for fiduciary',
        'Understand modified accrual vs. full accrual differences',
        'Reconciliation from fund statements to government-wide is tested',
        'Budgetary accounting limited to governmental funds',
      ],
    },
  ],

  studyPlan: [
    { week: 1, focus: 'Conceptual Framework & Financial Statements', topics: ['SFAC 8', 'Balance Sheet', 'Income Statement'], hours: 20, activities: ['Read material', 'MCQs on concepts', 'Practice BS classification'] },
    { week: 2, focus: 'Cash Flows & Statement Preparation', topics: ['SCF Indirect Method', 'Notes to FS'], hours: 20, activities: ['Practice SCF conversions', 'TBS simulations'] },
    { week: 3, focus: 'Revenue Recognition', topics: ['ASC 606 Five Steps', 'Contract Modifications'], hours: 25, activities: ['Step-by-step problems', 'Variable consideration MCQs'] },
    { week: 4, focus: 'Inventory & PP&E', topics: ['Cost Flow', 'LCM/NRV', 'Depreciation', 'Impairment'], hours: 20, activities: ['Inventory calculations', 'Depreciation methods practice'] },
    { week: 5, focus: 'Leases & Intangibles', topics: ['ASC 842', 'Finance vs Operating', 'Goodwill'], hours: 25, activities: ['Lease classification', 'ROU asset calculations'] },
    { week: 6, focus: 'Investments & Bonds', topics: ['Debt Securities', 'Equity Method', 'Bond Issuance'], hours: 25, activities: ['Investment classification', 'Effective interest calculations'] },
    { week: 7, focus: 'Equity & Government', topics: ['Treasury Stock', 'Stock Dividends', 'Fund Accounting'], hours: 20, activities: ['Equity transactions', 'Government fund types'] },
    { week: 8, focus: 'Review & Practice Exams', topics: ['Full-length practice', 'Weak areas'], hours: 30, activities: ['2 complete practice exams', 'Review missed questions'] },
  ],

  examTips: [
    'FAR has the most content - start early and maintain consistent study schedule',
    'Focus on ASC 606 (revenue), ASC 842 (leases), and cash flows - heavily tested',
    'Practice journal entries until they become automatic',
    'Government accounting is lower weight but still appears on every exam',
    'Use mnemonics: GRaSPP for governmental funds, OWNES for finance leases',
    'TBS often combines multiple topics - practice multi-step problems',
  ],

  commonMistakes: [
    'Confusing direct vs. indirect cash flow method adjustments',
    'Misclassifying leases (know OWNES criteria)',
    'Forgetting to adjust equity method investments for intercompany profits',
    'Mixing up government fund types and their measurement focus',
    'Not reading TBS exhibits carefully - all information is provided',
  ],
};

export default FAR_STUDY_GUIDE;

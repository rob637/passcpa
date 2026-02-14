/**
 * CPA Exam Formula Sheet
 * Comprehensive formulas for all CPA sections
 */

export interface FormulaCategory {
  category: string;
  section: 'FAR' | 'AUD' | 'REG' | 'BAR' | 'ALL';
  formulas: Formula[];
}

export interface Formula {
  name: string;
  formula: string;
  notes?: string;
  example?: string;
}

export const CPA_FORMULA_SHEET: FormulaCategory[] = [
  // =====================================================
  // FAR - Financial Ratios
  // =====================================================
  {
    category: 'Liquidity Ratios',
    section: 'FAR',
    formulas: [
      { name: 'Current Ratio', formula: 'Current Assets / Current Liabilities', notes: 'Higher is better; 2:1 often benchmark' },
      { name: 'Quick Ratio (Acid Test)', formula: '(Cash + Marketable Securities + Receivables) / Current Liabilities', notes: 'Excludes inventory and prepaid' },
      { name: 'Cash Ratio', formula: 'Cash + Cash Equivalents / Current Liabilities', notes: 'Most conservative liquidity measure' },
      { name: 'Working Capital', formula: 'Current Assets - Current Liabilities', notes: 'Dollar amount, not ratio' },
    ],
  },
  {
    category: 'Activity Ratios',
    section: 'FAR',
    formulas: [
      { name: 'Inventory Turnover', formula: 'Cost of Goods Sold / Average Inventory', notes: 'Higher = faster sales' },
      { name: 'Days in Inventory', formula: '365 / Inventory Turnover', notes: 'Lower is generally better' },
      { name: 'Accounts Receivable Turnover', formula: 'Net Credit Sales / Average Accounts Receivable', notes: 'Higher = faster collections' },
      { name: 'Days Sales Outstanding', formula: '365 / AR Turnover', notes: 'Average collection period' },
      { name: 'Accounts Payable Turnover', formula: 'Cost of Goods Sold / Average Accounts Payable', notes: 'How quickly paying suppliers' },
      { name: 'Asset Turnover', formula: 'Net Sales / Average Total Assets', notes: 'Efficiency of asset use' },
    ],
  },
  {
    category: 'Solvency Ratios',
    section: 'FAR',
    formulas: [
      { name: 'Debt-to-Equity Ratio', formula: 'Total Liabilities / Total Equity', notes: 'Lower = less leveraged' },
      { name: 'Debt Ratio', formula: 'Total Liabilities / Total Assets', notes: 'Percentage financed by debt' },
      { name: 'Equity Ratio', formula: 'Total Equity / Total Assets', notes: 'Percentage financed by equity' },
      { name: 'Times Interest Earned', formula: 'EBIT / Interest Expense', notes: 'Coverage ratio; higher = safer' },
      { name: 'Debt Service Coverage', formula: '(Net Income + Depreciation + Interest) / (Principal + Interest)', notes: 'Ability to service debt' },
    ],
  },
  {
    category: 'Profitability Ratios',
    section: 'FAR',
    formulas: [
      { name: 'Gross Profit Margin', formula: '(Sales - COGS) / Sales', notes: 'Gross margin percentage' },
      { name: 'Operating Profit Margin', formula: 'Operating Income / Sales', notes: 'Before interest and taxes' },
      { name: 'Net Profit Margin', formula: 'Net Income / Sales', notes: 'Bottom line profitability' },
      { name: 'Return on Assets (ROA)', formula: 'Net Income / Average Total Assets', notes: 'Efficiency generating profits' },
      { name: 'Return on Equity (ROE)', formula: 'Net Income / Average Shareholders Equity', notes: 'Return to shareholders' },
      { name: 'DuPont ROE', formula: 'Net Margin × Asset Turnover × Equity Multiplier', notes: 'Three-component breakdown' },
      { name: 'Equity Multiplier', formula: 'Average Total Assets / Average Equity', notes: 'Leverage component of DuPont' },
    ],
  },

  // =====================================================
  // FAR - Earnings Per Share
  // =====================================================
  {
    category: 'Earnings Per Share',
    section: 'FAR',
    formulas: [
      { name: 'Basic EPS', formula: '(Net Income - Preferred Dividends) / Weighted Average Common Shares', notes: 'Must subtract preferred dividends declared' },
      { name: 'Diluted EPS', formula: '(Net Income - Pfd Div + Adjustments) / (WACS + Dilutive Securities)', notes: 'Include if dilutive (reduces EPS)' },
      { name: 'Stock Split Adjustment', formula: 'Pre-split shares × Split ratio', notes: 'Retroactively adjust all periods' },
      { name: 'Treasury Stock Method', formula: 'Options exercised - (Exercise Price × Shares / Market Price)', notes: 'Proceeds assumed to buy back shares' },
      { name: 'Convertible Bonds If-Converted', formula: 'Add back: Interest × (1-Tax Rate) / Add: Conversion shares', notes: 'Test if dilutive before including' },
    ],
  },

  // =====================================================
  // FAR - Depreciation
  // =====================================================
  {
    category: 'Depreciation Methods',
    section: 'FAR',
    formulas: [
      { name: 'Straight-Line', formula: '(Cost - Salvage Value) / Useful Life', notes: 'Equal annual expense' },
      { name: 'Double Declining Balance', formula: '(2 / Useful Life) × Book Value', notes: 'Ignore salvage initially; stop at salvage' },
      { name: 'Sum-of-Years Digits', formula: '(Remaining Life / SYD) × (Cost - Salvage)', notes: 'SYD = n(n+1)/2' },
      { name: 'Units of Production', formula: '(Cost - Salvage) × (Units Produced / Total Expected Units)', notes: 'Based on activity, not time' },
      { name: 'MACRS Half-Year Convention', formula: 'Cost × MACRS Rate × 50% in year placed in service', notes: 'No salvage value; rates provided' },
    ],
  },

  // =====================================================
  // FAR - Bonds and Present Value
  // =====================================================
  {
    category: 'Bonds and Present Value',
    section: 'FAR',
    formulas: [
      { name: 'Bond Issue Price', formula: 'PV of Principal + PV of Interest Payments', notes: 'Discount using market rate' },
      { name: 'Present Value of Lump Sum', formula: 'FV × [1 / (1 + r)^n]', notes: 'Single future payment' },
      { name: 'Present Value of Annuity', formula: 'PMT × [(1 - (1 + r)^-n) / r]', notes: 'Series of equal payments' },
      { name: 'Future Value of Lump Sum', formula: 'PV × (1 + r)^n', notes: 'Compound interest' },
      { name: 'Interest Expense (Effective Interest)', formula: 'Carrying Value × Market Rate', notes: 'For premium/discount amortization' },
      { name: 'Premium/Discount Amortization', formula: 'Interest Expense - Cash Interest', notes: 'Difference adjusts carrying value' },
    ],
  },

  // =====================================================
  // FAR - Leases
  // =====================================================
  {
    category: 'Lease Accounting (ASC 842)',
    section: 'FAR',
    formulas: [
      { name: 'Right-of-Use Asset', formula: 'Lease Liability + Initial Direct Costs + Prepaid Rent - Lease Incentives', notes: 'Initial measurement' },
      { name: 'Lease Liability', formula: 'PV of Lease Payments using IBR or Implicit Rate', notes: 'Exclude variable payments' },
      { name: 'Finance Lease Interest', formula: 'Beginning Lease Liability × Discount Rate', notes: 'Reduces each period' },
      { name: 'Finance Lease Amortization', formula: 'ROU Asset / Lease Term', notes: 'Usually straight-line' },
      { name: 'Operating Lease Expense', formula: 'Total Lease Cost / Lease Term', notes: 'Straight-line single expense' },
    ],
  },

  // =====================================================
  // BAR - Cost-Volume-Profit
  // =====================================================
  {
    category: 'Cost-Volume-Profit Analysis',
    section: 'BAR',
    formulas: [
      { name: 'Contribution Margin (Total)', formula: 'Sales Revenue - Variable Costs', notes: 'Available to cover fixed costs' },
      { name: 'Contribution Margin per Unit', formula: 'Selling Price per Unit - Variable Cost per Unit', notes: 'Per unit CM' },
      { name: 'Contribution Margin Ratio', formula: 'Contribution Margin / Sales', notes: 'Percentage of sales as CM' },
      { name: 'Break-Even Units', formula: 'Fixed Costs / Contribution Margin per Unit', notes: 'Units to cover all costs' },
      { name: 'Break-Even Dollars', formula: 'Fixed Costs / Contribution Margin Ratio', notes: 'Sales to cover all costs' },
      { name: 'Target Profit (Units)', formula: '(Fixed Costs + Target Profit) / CM per Unit', notes: 'Units needed for profit target' },
      { name: 'Margin of Safety', formula: 'Actual Sales - Break-Even Sales', notes: 'Buffer before losses' },
      { name: 'Margin of Safety %', formula: 'Margin of Safety / Actual Sales', notes: 'As percentage of sales' },
      { name: 'Operating Leverage', formula: 'Contribution Margin / Operating Income', notes: 'Higher = more fixed costs' },
    ],
  },

  // =====================================================
  // BAR - Capital Budgeting
  // =====================================================
  {
    category: 'Capital Budgeting',
    section: 'BAR',
    formulas: [
      { name: 'Net Present Value (NPV)', formula: 'Σ[CFt / (1+r)^t] - Initial Investment', notes: 'Accept if NPV > 0' },
      { name: 'Internal Rate of Return (IRR)', formula: 'Rate where NPV = 0', notes: 'Accept if IRR > hurdle rate' },
      { name: 'Payback Period', formula: 'Initial Investment / Annual Cash Flow', notes: 'For even cash flows' },
      { name: 'Discounted Payback', formula: 'Time for PV of inflows to equal initial investment', notes: 'Considers time value' },
      { name: 'Profitability Index', formula: 'PV of Cash Inflows / Initial Investment', notes: 'Accept if PI > 1' },
      { name: 'Accounting Rate of Return', formula: 'Average Annual Profit / Average Investment', notes: 'Uses accounting income' },
    ],
  },

  // =====================================================
  // BAR - Cost of Capital
  // =====================================================
  {
    category: 'Cost of Capital',
    section: 'BAR',
    formulas: [
      { name: 'WACC', formula: '(E/V × Re) + (D/V × Rd × (1-T))', notes: 'Weighted cost of all capital' },
      { name: 'Cost of Equity (CAPM)', formula: 'Rf + β × (Rm - Rf)', notes: 'Risk-free + risk premium' },
      { name: 'Cost of Equity (Gordon)', formula: '(D1 / P0) + g', notes: 'Dividend growth model' },
      { name: 'After-Tax Cost of Debt', formula: 'Pre-tax rate × (1 - Tax Rate)', notes: 'Interest is tax deductible' },
      { name: 'Cost of Preferred Stock', formula: 'Annual Dividend / Net Issuance Price', notes: 'No tax benefit' },
    ],
  },

  // =====================================================
  // BAR - Performance Metrics
  // =====================================================
  {
    category: 'Performance Metrics',
    section: 'BAR',
    formulas: [
      { name: 'Return on Investment (ROI)', formula: 'Operating Income / Average Invested Capital', notes: 'Division performance' },
      { name: 'Residual Income', formula: 'Operating Income - (Required Return × Invested Capital)', notes: 'Dollar excess return' },
      { name: 'Economic Value Added (EVA)', formula: 'NOPAT - (WACC × Invested Capital)', notes: 'True economic profit' },
      { name: 'NOPAT', formula: 'Operating Income × (1 - Tax Rate)', notes: 'Net operating profit after tax' },
      { name: 'Market Value Added', formula: 'Market Value of Firm - Invested Capital', notes: 'Wealth creation' },
    ],
  },

  // =====================================================
  // BAR - Variance Analysis
  // =====================================================
  {
    category: 'Variance Analysis',
    section: 'BAR',
    formulas: [
      { name: 'Sales Price Variance', formula: '(Actual Price - Budgeted Price) × Actual Quantity', notes: 'Price component' },
      { name: 'Sales Volume Variance', formula: '(Actual Qty - Budgeted Qty) × Budgeted Price', notes: 'Volume component' },
      { name: 'Materials Price Variance', formula: '(Actual Price - Standard Price) × Actual Qty', notes: 'Purchasing efficiency' },
      { name: 'Materials Quantity Variance', formula: '(Actual Qty - Standard Qty) × Standard Price', notes: 'Usage efficiency' },
      { name: 'Labor Rate Variance', formula: '(Actual Rate - Standard Rate) × Actual Hours', notes: 'Wage differences' },
      { name: 'Labor Efficiency Variance', formula: '(Actual Hours - Standard Hours) × Standard Rate', notes: 'Productivity' },
      { name: 'Fixed Overhead Volume Variance', formula: '(Budgeted Hrs - Standard Hrs Allowed) × Std OH Rate', notes: 'Capacity utilization' },
    ],
  },

  // =====================================================
  // BAR - Consolidation and Equity Method
  // =====================================================
  {
    category: 'Consolidations and Investments',
    section: 'BAR',
    formulas: [
      { name: 'Goodwill', formula: 'Purchase Price - Fair Value of Net Identifiable Assets', notes: 'Excess purchase price' },
      { name: 'Equity Method Income', formula: 'Ownership % × Investee Net Income - Amortization', notes: 'Less basis diff amortization' },
      { name: 'Equity Investment Balance', formula: 'Initial Cost + Income Share - Dividends Received', notes: 'Continuous tracking' },
      { name: 'Noncontrolling Interest (at acquisition)', formula: 'FV of NCI or (FV of subsidiary × NCI%)', notes: 'Full or partial goodwill' },
      { name: 'NCI Share of Income', formula: 'Subsidiary Net Income × NCI%', notes: 'Reported separately' },
    ],
  },

  // =====================================================
  // REG - Individual Tax
  // =====================================================
  {
    category: 'Individual Tax Calculations',
    section: 'REG',
    formulas: [
      { name: 'Taxable Income', formula: 'Gross Income - Adjustments - (Standard or Itemized) - QBI', notes: 'Individual tax base' },
      { name: 'Self-Employment Tax', formula: '(Net SE Income × 92.35%) × 15.3%', notes: 'Up to SS wage base, then 2.9%' },
      { name: 'Child Tax Credit', formula: '$2,000 per qualifying child', notes: 'Phase out begins $200K single' },
      { name: 'QBI Deduction', formula: 'Lesser of: 20% QBI or 20% (Taxable Income - CG)', notes: 'W-2 and capital limits apply' },
      { name: 'Medical Expense Deduction', formula: 'Medical Expenses - (7.5% × AGI)', notes: 'Only excess is deductible' },
    ],
  },

  // =====================================================
  // REG - Property Basis
  // =====================================================
  {
    category: 'Property Basis',
    section: 'REG',
    formulas: [
      { name: 'Cost Basis', formula: 'Purchase Price + Acquisition Costs', notes: 'Initial investment' },
      { name: 'Adjusted Basis', formula: 'Cost + Improvements - Depreciation', notes: 'For gain/loss determination' },
      { name: 'Gift Basis (Gain)', formula: "Donor's Adjusted Basis + Gift Tax on Appreciation", notes: 'Carryover basis' },
      { name: 'Gift Basis (Loss)', formula: "Lower of Donor's Basis or FMV at Gift", notes: 'Double basis rule' },
      { name: 'Inherited Basis', formula: 'FMV at Date of Death', notes: 'Stepped-up basis' },
      { name: 'Like-Kind Exchange Basis', formula: 'FMV of New Property - Deferred Gain', notes: 'Substituted basis' },
      { name: '§351 Basis (Shareholder)', formula: 'Property Basis - Boot Received + Gain Recognized', notes: 'Substituted basis' },
      { name: '§351 Basis (Corporation)', formula: 'FMV of Property Received', notes: 'Carryover + gain' },
    ],
  },

  // =====================================================
  // REG - Corporate Tax
  // =====================================================
  {
    category: 'Corporate Taxation',
    section: 'REG',
    formulas: [
      { name: 'Corporate Taxable Income', formula: 'Gross Income - Deductions', notes: '21% flat rate' },
      { name: 'Dividends Received Deduction', formula: 'Dividend × DRD% (50%, 65%, or 100%)', notes: 'Based on ownership %' },
      { name: 'Charitable Contribution Limit', formula: '10% × Taxable Income (before DRD and contribution)', notes: '5-year carryforward' },
      { name: 'E&P (Current)', formula: 'Taxable Income ± Adjustments', notes: 'For dividend determination' },
      { name: 'Accumulated E&P', formula: 'Beginning AE&P + Current E&P - Distributions', notes: 'Cumulative earnings' },
    ],
  },

  // =====================================================
  // REG - Partnership/S Corp
  // =====================================================
  {
    category: 'Pass-Through Entities',
    section: 'REG',
    formulas: [
      { name: 'Partner Outside Basis', formula: 'Capital Contribution + Share of Liabilities + Income - Losses - Distributions', notes: 'Limits loss deduction' },
      { name: 'S Corp Shareholder Basis', formula: 'Stock Basis + Debt Basis', notes: 'Debt basis from direct loans' },
      { name: 'AAA (S Corp)', formula: 'Beginning AAA + Income - Losses - Distributions', notes: 'Tax-free distribution limit' },
      { name: 'Built-In Gains Tax', formula: '21% × Built-In Gain Recognized', notes: 'Within 5-year recognition period' },
      { name: 'At-Risk Limitation', formula: 'Amount taxpayer could lose', notes: 'Limits loss to at-risk amount' },
    ],
  },

  // =====================================================
  // REG - Estate and Gift
  // =====================================================
  {
    category: 'Estate and Gift Tax',
    section: 'REG',
    formulas: [
      { name: 'Gift Tax Base', formula: 'FMV of Gift - Annual Exclusion - Marital/Charitable', notes: 'Taxable gift amount' },
      { name: 'Annual Exclusion', formula: '$18,000 per donee (2024)', notes: 'Indexed for inflation' },
      { name: 'Gross Estate', formula: 'FMV of All Assets at Death', notes: 'Includes life insurance, trusts' },
      { name: 'Taxable Estate', formula: 'Gross Estate - Deductions (Marital, Charitable, Expenses)', notes: 'Before unified credit' },
      { name: 'Estate Tax', formula: '(Taxable Estate + Adjusted Taxable Gifts) × 40% - Unified Credit', notes: 'Top rate 40%' },
    ],
  },

  // =====================================================
  // AUD - Audit Risk Model
  // =====================================================
  {
    category: 'Audit Risk',
    section: 'AUD',
    formulas: [
      { name: 'Audit Risk Model', formula: 'AR = IR × CR × DR', notes: 'Audit Risk = Inherent × Control × Detection' },
      { name: 'Detection Risk', formula: 'AR / (IR × CR)', notes: 'Solve for acceptable DR' },
      { name: 'Risk of Material Misstatement', formula: 'IR × CR', notes: 'RMM = Inherent × Control' },
      { name: 'Sample Size Relationship', formula: 'Lower tolerable deviation = Larger sample', notes: 'Inverse relationship' },
    ],
  },

  // =====================================================
  // AUD - Sampling
  // =====================================================
  {
    category: 'Audit Sampling',
    section: 'AUD',
    formulas: [
      { name: 'Sample Deviation Rate', formula: 'Deviations Found / Sample Size', notes: 'Actual deviation rate' },
      { name: 'Tolerable Deviation Rate', formula: 'Maximum acceptable deviation', notes: 'Set by auditor judgment' },
      { name: 'Upper Deviation Limit', formula: 'Sample Deviation Rate + Allowance', notes: 'Risk adjusted' },
      { name: 'Projected Misstatement', formula: '(Sample Misstatement / Sample) × Population', notes: 'Extrapolate to population' },
    ],
  },
];

// Export helper functions
export const getFormulasBySection = (section: 'FAR' | 'AUD' | 'REG' | 'BAR' | 'ALL'): FormulaCategory[] => {
  return CPA_FORMULA_SHEET.filter(cat => cat.section === section || cat.section === 'ALL');
};

export const getAllFormulas = (): Formula[] => {
  return CPA_FORMULA_SHEET.flatMap(cat => cat.formulas);
};

export const searchFormulas = (query: string): Formula[] => {
  const lowerQuery = query.toLowerCase();
  return getAllFormulas().filter(f => 
    f.name.toLowerCase().includes(lowerQuery) ||
    f.formula.toLowerCase().includes(lowerQuery) ||
    f.notes?.toLowerCase().includes(lowerQuery)
  );
};

export default CPA_FORMULA_SHEET;

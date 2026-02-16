/**
 * CFP Formula Sheet
 * Comprehensive formulas for CFP examination
 */

export interface CFPFormulaCategory {
  category: string;
  domain: string;
  formulas: CFPFormula[];
}

export interface CFPFormula {
  name: string;
  formula: string;
  notes?: string;
  example?: string;
}

export const CFP_FORMULA_SHEET: CFPFormulaCategory[] = [
  // =====================================================
  // Time Value of Money
  // =====================================================
  {
    category: 'Time Value of Money',
    domain: 'Investment / General',
    formulas: [
      { name: 'Future Value (Lump Sum)', formula: 'FV = PV × (1 + r)^n', notes: 'r = rate per period, n = number of periods' },
      { name: 'Present Value (Lump Sum)', formula: 'PV = FV / (1 + r)^n', notes: 'Discounting future amount' },
      { name: 'Future Value of Annuity', formula: 'FVA = PMT × [((1 + r)^n - 1) / r]', notes: 'Ordinary annuity (end of period)' },
      { name: 'Present Value of Annuity', formula: 'PVA = PMT × [(1 - (1 + r)^-n) / r]', notes: 'Ordinary annuity' },
      { name: 'Annuity Due Adjustment', formula: 'FV/PV_due = FV/PV_ordinary × (1 + r)', notes: 'Beginning of period payments' },
      { name: 'Rule of 72', formula: 'Years to double = 72 / Annual interest rate', notes: 'Approximation for doubling time' },
      { name: 'Effective Annual Rate', formula: 'EAR = (1 + r/n)^n - 1', notes: 'n = compounding periods per year' },
      { name: 'Real Rate of Return', formula: 'Real = [(1 + Nominal) / (1 + Inflation)] - 1', notes: 'Inflation-adjusted return' },
      { name: 'Inflation-Adjusted FV', formula: 'FV_real = FV_nominal / (1 + i)^n', notes: 'i = inflation rate' },
    ],
  },

  // =====================================================
  // Investment Formulas
  // =====================================================
  {
    category: 'Risk and Return',
    domain: 'Investment',
    formulas: [
      { name: 'Holding Period Return', formula: 'HPR = (Ending Value - Beginning Value + Income) / Beginning Value', notes: 'Total return for period' },
      { name: 'Arithmetic Mean', formula: 'Mean = (R1 + R2 + ... + Rn) / n', notes: 'Simple average of returns' },
      { name: 'Geometric Mean', formula: 'GM = [(1+R1)(1+R2)...(1+Rn)]^(1/n) - 1', notes: 'Compound annual growth rate' },
      { name: 'Standard Deviation', formula: 'σ = √[Σ(Ri - R̄)² / (n-1)]', notes: 'Measure of total risk' },
      { name: 'Coefficient of Variation', formula: 'CV = σ / Mean Return', notes: 'Risk per unit of return' },
      { name: 'Covariance', formula: 'Cov(A,B) = Σ[(RA - R̄A)(RB - R̄B)] / (n-1)', notes: 'Joint variability' },
      { name: 'Correlation', formula: 'ρ = Cov(A,B) / (σA × σB)', notes: 'Standardized covariance, -1 to +1' },
      { name: 'Portfolio Standard Deviation (2 assets)', formula: 'σp = √[w1²σ1² + w2²σ2² + 2w1w2σ1σ2ρ12]', notes: 'w = weights' },
    ],
  },
  {
    category: 'Capital Asset Pricing Model',
    domain: 'Investment',
    formulas: [
      { name: 'CAPM', formula: 'E(R) = Rf + β(Rm - Rf)', notes: 'Expected return given systematic risk' },
      { name: 'Security Market Line', formula: 'E(R) = Rf + β(Market Risk Premium)', notes: 'Graphical representation of CAPM' },
      { name: 'Beta', formula: 'β = Cov(Ri, Rm) / Var(Rm)', notes: 'Systematic risk measure' },
      { name: 'Market Risk Premium', formula: 'MRP = Rm - Rf', notes: 'Expected excess return over risk-free' },
      { name: 'Portfolio Beta', formula: 'βp = Σ(wi × βi)', notes: 'Weighted average of asset betas' },
    ],
  },
  {
    category: 'Risk-Adjusted Performance',
    domain: 'Investment',
    formulas: [
      { name: 'Sharpe Ratio', formula: 'Sharpe = (Rp - Rf) / σp', notes: 'Return per unit of total risk' },
      { name: 'Treynor Ratio', formula: 'Treynor = (Rp - Rf) / βp', notes: 'Return per unit of systematic risk' },
      { name: 'Jensen\'s Alpha', formula: 'α = Rp - [Rf + βp(Rm - Rf)]', notes: 'Excess return over CAPM expectation' },
      { name: 'Information Ratio', formula: 'IR = α / Tracking Error', notes: 'Alpha per unit of active risk' },
      { name: 'Sortino Ratio', formula: 'Sortino = (Rp - Rf) / Downside Deviation', notes: 'Penalizes only downside volatility' },
    ],
  },

  // =====================================================
  // Bond Formulas
  // =====================================================
  {
    category: 'Fixed Income',
    domain: 'Investment',
    formulas: [
      { name: 'Current Yield', formula: 'CY = Annual Coupon / Current Price', notes: 'Income component of return' },
      { name: 'Yield to Maturity', formula: 'Price = Σ[Coupon/(1+YTM)^t] + FV/(1+YTM)^n', notes: 'Solve for YTM iteratively' },
      { name: 'Taxable Equivalent Yield', formula: 'TEY = Municipal Yield / (1 - Marginal Tax Rate)', notes: 'Compare muni to taxable bonds' },
      { name: 'Duration Price Change', formula: 'ΔP/P ≈ -Duration × Δy', notes: 'Approximate price change' },
      { name: 'Modified Duration', formula: 'ModD = Macaulay Duration / (1 + y)', notes: 'Price sensitivity measure' },
      { name: 'Convexity Adjustment', formula: 'Price Change = -ModD × Δy + 0.5 × Convexity × (Δy)²', notes: 'Better accuracy for large rate changes' },
      { name: 'Accrued Interest', formula: 'AI = (Coupon/2) × (Days since last coupon / Days in coupon period)', notes: 'Semi-annual bonds' },
    ],
  },

  // =====================================================
  // Equity Valuation
  // =====================================================
  {
    category: 'Equity Valuation',
    domain: 'Investment',
    formulas: [
      { name: 'Dividend Discount Model (Constant Growth)', formula: 'P0 = D1 / (r - g)', notes: 'Gordon Growth Model' },
      { name: 'Expected Dividend', formula: 'D1 = D0 × (1 + g)', notes: 'Next year\'s dividend' },
      { name: 'Required Return from DDM', formula: 'r = (D1 / P0) + g', notes: 'Implied required return' },
      { name: 'Sustainable Growth Rate', formula: 'g = ROE × Retention Ratio', notes: 'RR = 1 - Dividend Payout' },
      { name: 'P/E Ratio', formula: 'P/E = Price / EPS', notes: 'Valuation multiple' },
      { name: 'PEG Ratio', formula: 'PEG = (P/E) / Earnings Growth Rate', notes: 'Growth-adjusted P/E' },
      { name: 'Earnings Yield', formula: 'EY = EPS / Price = 1 / (P/E)', notes: 'Inverse of P/E' },
      { name: 'Book Value per Share', formula: 'BVPS = (Assets - Liabilities) / Shares Outstanding', notes: 'Accounting-based value' },
    ],
  },

  // =====================================================
  // Retirement Planning
  // =====================================================
  {
    category: 'Retirement Needs',
    domain: 'Retirement',
    formulas: [
      { name: 'Capital Needs at Retirement', formula: 'PV of Annuity for income stream', notes: 'Based on years in retirement' },
      { name: 'Income Replacement Ratio', formula: 'IRR = Retirement Income Needed / Pre-Retirement Income', notes: 'Typically 70-80%' },
      { name: 'Inflation-Adjusted Income', formula: 'Future Need = Current Need × (1 + i)^n', notes: 'i = inflation rate, n = years to retirement' },
      { name: 'Savings Required', formula: 'Annual Savings = FV(retirement need) / FVA factor', notes: 'Level annual savings' },
      { name: 'Serial Payment', formula: 'PMT × [(1 + g)^n - (1 + r)^n] / (g - r)', notes: 'Payments growing at rate g' },
    ],
  },
  {
    category: 'Distribution Planning',
    domain: 'Retirement',
    formulas: [
      { name: 'RMD Calculation', formula: 'RMD = Prior Year Dec 31 Balance / Life Expectancy Factor', notes: 'Uniform Lifetime Table' },
      { name: 'Sustainable Withdrawal Rate', formula: 'Annual Withdrawal = Portfolio Value × 4%', notes: '4% rule - inflation adjusted annually' },
      { name: '72(t) SEPP Payment', formula: 'Various methods: Life expectancy, Amortization, Annuitization', notes: 'Must continue 5 years or to 59½' },
      { name: 'Life Expectancy (RMD age 73)', formula: 'Divisor from Uniform Lifetime Table', notes: 'e.g., age 73 = 26.5, age 80 = 20.2' },
    ],
  },

  // =====================================================
  // Social Security
  // =====================================================
  {
    category: 'Social Security',
    domain: 'Retirement',
    formulas: [
      { name: 'Early Retirement Reduction', formula: '5/9 of 1% per month (first 36 months) + 5/12 of 1% (additional months)', notes: 'Reduction from FRA' },
      { name: 'Delayed Retirement Credit', formula: '8% per year past FRA', notes: 'Up to age 70' },
      { name: 'Spousal Benefit Maximum', formula: '50% of Worker\'s PIA at FRA', notes: 'Reduced if claimed early' },
      { name: 'Provisional Income', formula: 'AGI + Tax-Exempt Interest + 50% SS Benefits', notes: 'For SS taxation' },
      { name: 'SS Taxation Thresholds', formula: '$25K/$32K (50% taxable) or $34K/$44K (85% taxable)', notes: 'Single/MFJ thresholds' },
      { name: 'Earnings Test', formula: '$1 withheld per $2 over limit ($23,400 in 2026)', notes: 'Before FRA' },
    ],
  },

  // =====================================================
  // Insurance Formulas
  // =====================================================
  {
    category: 'Life Insurance Needs',
    domain: 'Insurance',
    formulas: [
      { name: 'Human Life Value', formula: 'PV of Future Earnings × (1 - self-maintenance)', notes: 'Economic loss at death' },
      { name: 'Income Replacement', formula: '(Annual Income × Years) as PV of annuity', notes: 'Capital needed to replace income' },
      { name: 'Needs Approach', formula: 'Death Expenses + Debt + PV Future Needs - Resources', notes: 'Capital needs analysis' },
      { name: 'MEC 7-Pay Test', formula: 'Total premiums ≤ 7 annual level premiums for paid-up at 7', notes: 'If exceeded, becomes MEC' },
    ],
  },
  {
    category: 'Disability Insurance',
    domain: 'Insurance',
    formulas: [
      { name: 'Coverage Ratio', formula: 'Monthly Benefit / Monthly Income', notes: 'Typically aim for 60-70%' },
      { name: 'After-Tax Replacement', formula: 'Benefit × (1 - tax rate if taxable)', notes: 'Employee-paid = tax-free' },
    ],
  },

  // =====================================================
  // Tax Planning
  // =====================================================
  {
    category: 'Tax Calculations',
    domain: 'Tax',
    formulas: [
      { name: 'Taxable Income', formula: 'Gross Income - Adjustments - Deductions', notes: 'Individual tax base' },
      { name: 'Effective Tax Rate', formula: 'Tax Liability / Taxable Income', notes: 'Average rate paid' },
      { name: 'Marginal Tax Rate', formula: 'Tax on Next Dollar / $1', notes: 'Rate on additional income' },
      { name: 'After-Tax Return', formula: 'Pre-tax Return × (1 - Tax Rate)', notes: 'For taxable investments' },
      { name: 'Tax-Equivalent Yield', formula: 'Tax-Free Yield / (1 - Tax Rate)', notes: 'Compare muni to taxable' },
      { name: 'Medical Deduction', formula: 'Medical Expenses - (7.5% × AGI)', notes: 'Amount deductible' },
    ],
  },
  {
    category: 'Capital Gains',
    domain: 'Tax',
    formulas: [
      { name: 'Capital Gain/Loss', formula: 'Selling Price - Adjusted Basis - Selling Costs', notes: 'Gain if positive' },
      { name: 'Gift Basis (Gain)', formula: 'Donor\'s Basis + Gift Tax on Appreciation', notes: 'Carryover basis' },
      { name: 'Gift Basis (Loss)', formula: 'Lower of Donor\'s Basis or FMV', notes: 'Double basis rule' },
      { name: 'Inherited Basis', formula: 'FMV at Date of Death', notes: 'Stepped-up basis' },
      { name: 'Wash Sale Disallowed Loss', formula: 'Added to basis of replacement shares', notes: '30-day window' },
    ],
  },

  // =====================================================
  // Estate Planning
  // =====================================================
  {
    category: 'Estate and Gift Tax',
    domain: 'Estate',
    formulas: [
      { name: 'Taxable Estate', formula: 'Gross Estate - Deductions (Marital, Charitable, Expenses)', notes: 'Estate tax base' },
      { name: 'Estate Tax', formula: '(Taxable Estate + Adjusted Taxable Gifts) × 40% - Unified Credit', notes: 'After exemption' },
      { name: 'Gift Tax Annual Exclusion', formula: '$19,000 per donee (2026)', notes: 'Per person, per year' },
      { name: 'Unified Credit', formula: '$2,800,000 (2026) = $7.0M exemption', notes: 'Lifetime exemption (TCJA sunset)' },
      { name: 'GRAT Remainder Value', formula: 'Principal - PV of Retained Annuity Interest', notes: 'Taxable gift at creation' },
      { name: 'Present Interest (Crummey)', formula: 'Annual exclusion requires present interest', notes: 'Withdrawal rights create' },
    ],
  },
  {
    category: 'Trust Taxation',
    domain: 'Estate',
    formulas: [
      { name: 'Distributable Net Income (DNI)', formula: 'Trust Accounting Income ± Adjustments', notes: 'Limits distribution deduction' },
      { name: 'Distribution Deduction', formula: 'Lesser of DNI or Actual Distributions', notes: 'Reduces trust taxable income' },
      { name: 'Trust Tax Rate (2024)', formula: '37% bracket at $14,450', notes: 'Compressed brackets' },
    ],
  },

  // =====================================================
  // Business Planning
  // =====================================================
  {
    category: 'Business Valuation',
    domain: 'General',
    formulas: [
      { name: 'Capitalization of Earnings', formula: 'Value = Earnings / Capitalization Rate', notes: 'For stable businesses' },
      { name: 'Book Value', formula: 'Assets - Liabilities', notes: 'Accounting-based value' },
      { name: 'Goodwill', formula: 'Purchase Price - Fair Value of Net Assets', notes: 'Intangible premium' },
      { name: 'Liquidity Discount', formula: 'Value × (1 - Discount %)', notes: 'For unmarketable interests, 25-35%' },
      { name: 'Minority Discount', formula: 'Value × (1 - Discount %)', notes: 'For non-controlling interests, 15-40%' },
    ],
  },
  {
    category: 'Self-Employment',
    domain: 'Tax',
    formulas: [
      { name: 'Self-Employment Tax', formula: '15.3% × (Net SE Income × 92.35%)', notes: 'Up to SS wage base ($168,600 in 2024), then 2.9%' },
      { name: 'SE Tax Deduction', formula: '50% of SE Tax', notes: 'Above-the-line deduction' },
      { name: 'SEP IRA Contribution', formula: '25% of Compensation (or 20% of net SE income)', notes: 'Max $71,500 (2026)' },
      { name: 'SIMPLE IRA Employer Match', formula: '3% of Compensation (or 2% nonelective)', notes: 'Dollar-for-dollar or 2% for all' },
    ],
  },

  // =====================================================
  // Education Planning
  // =====================================================
  {
    category: 'Education Funding',
    domain: 'General',
    formulas: [
      { name: 'Future College Cost', formula: 'Current Cost × (1 + Education Inflation)^n', notes: 'Education inflation ~4-6%' },
      { name: '529 Plan Maximum', formula: 'Gift tax annual exclusion × 5 = $90,000 one-time', notes: 'Superfunding election' },
      { name: 'Coverdell ESA Limit', formula: '$2,000 per beneficiary per year', notes: 'Income phase-outs apply' },
      { name: 'AOTC', formula: '100% of first $2,000 + 25% of next $2,000 = $2,500 max', notes: 'American Opportunity Credit' },
      { name: 'Lifetime Learning Credit', formula: '20% of first $10,000 = $2,000 max', notes: 'Per taxpayer, not per student' },
    ],
  },
];

// Export helper functions
export const getFormulasByDomain = (domain: string): CFPFormulaCategory[] => {
  return CFP_FORMULA_SHEET.filter(cat => 
    cat.domain.toLowerCase().includes(domain.toLowerCase())
  );
};

export const getAllCFPFormulas = (): CFPFormula[] => {
  return CFP_FORMULA_SHEET.flatMap(cat => cat.formulas);
};

export const searchCFPFormulas = (query: string): CFPFormula[] => {
  const lowerQuery = query.toLowerCase();
  return getAllCFPFormulas().filter(f => 
    f.name.toLowerCase().includes(lowerQuery) ||
    f.formula.toLowerCase().includes(lowerQuery) ||
    f.notes?.toLowerCase().includes(lowerQuery)
  );
};

export default CFP_FORMULA_SHEET;

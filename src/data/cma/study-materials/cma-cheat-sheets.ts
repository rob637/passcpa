/**
 * CMA Exam Day Cheat Sheets
 * 
 * Ultra-condensed quick reference for last-minute review
 * Designed for PDF export and printing
 */

export interface CheatSheetSection {
  title: string;
  items: CheatSheetItem[];
}

export interface CheatSheetItem {
  topic: string;
  content: string;
  formula?: string;
}

export interface CheatSheet {
  id: string;
  title: string;
  part: 'CMA1' | 'CMA2';
  sections: CheatSheetSection[];
}

// ==========================================
// CMA PART 1 CHEAT SHEETS
// ==========================================

export const CMA1_CHEAT_SHEET_CVP: CheatSheet = {
  id: 'cma1-cvp-cheat',
  title: 'CVP Analysis Cheat Sheet',
  part: 'CMA1',
  sections: [
    {
      title: 'Core CVP Formulas',
      items: [
        { topic: 'Contribution Margin (CM)', content: 'CM = Sales Price − Variable Cost', formula: 'CM = SP − VC' },
        { topic: 'CM Ratio', content: 'CMR = CM ÷ Sales Price', formula: 'CMR = CM/SP or 1−VCR' },
        { topic: 'Breakeven Units', content: 'BE = Fixed Costs ÷ CM per unit', formula: 'BE = FC/CM' },
        { topic: 'Breakeven Dollars', content: 'BE$ = Fixed Costs ÷ CM Ratio', formula: 'BE$ = FC/CMR' },
        { topic: 'Target Profit Units', content: 'Units = (FC + Target Profit) ÷ CM', formula: 'U = (FC+TP)/CM' },
        { topic: 'Target After-Tax', content: 'Pre-tax = After-tax ÷ (1 − Tax Rate)', formula: 'PT = AT/(1−t)' },
      ],
    },
    {
      title: 'Risk & Leverage',
      items: [
        { topic: 'Margin of Safety', content: 'Buffer before losses occur', formula: 'MOS = Actual Sales − BE Sales' },
        { topic: 'MOS Ratio', content: 'MOS as percentage', formula: 'MOS% = MOS/Sales' },
        { topic: 'Operating Leverage (DOL)', content: 'Sensitivity to sales changes', formula: 'DOL = CM/Operating Income' },
        { topic: 'Impact of DOL', content: '%ΔOI = DOL × %ΔSales', formula: 'If DOL=3, 10% sales ↑ → 30% OI ↑' },
      ],
    },
    {
      title: 'Multi-Product CVP',
      items: [
        { topic: 'Weighted Avg CM', content: 'Sum of (CM × Sales Mix %)', formula: 'WACM = Σ(CMᵢ × Mix%ᵢ)' },
        { topic: 'Multi-Product BE', content: 'Total units to break even', formula: 'BE = FC/WACM' },
        { topic: 'Product Mix Assumption', content: 'Sales mix stays constant', formula: 'Allocate by mix %' },
      ],
    },
    {
      title: 'Quick Tips',
      items: [
        { topic: 'CM vs Gross Margin', content: 'CM uses variable costs only; GM uses all production costs' },
        { topic: 'Higher FC', content: 'Higher DOL → more risk, more reward' },
        { topic: 'Unit vs Dollar BE', content: 'Use CM per unit for units; CM ratio for dollars' },
      ],
    },
  ],
};

export const CMA1_CHEAT_SHEET_VARIANCE: CheatSheet = {
  id: 'cma1-variance-cheat',
  title: 'Variance Analysis Cheat Sheet',
  part: 'CMA1',
  sections: [
    {
      title: 'Direct Materials Variances',
      items: [
        { topic: 'Materials Price Variance', content: 'Did we pay the right price?', formula: 'MPV = (AP − SP) × AQ Purchased' },
        { topic: 'Materials Quantity Variance', content: 'Did we use the right amount?', formula: 'MQV = (AQ Used − SQ Allowed) × SP' },
        { topic: 'SQ Allowed', content: 'Standard qty for actual output', formula: 'SQ = Std per unit × Actual units' },
      ],
    },
    {
      title: 'Direct Labor Variances',
      items: [
        { topic: 'Labor Rate Variance', content: 'Did we pay the right wage?', formula: 'LRV = (AR − SR) × AH' },
        { topic: 'Labor Efficiency Variance', content: 'Were workers efficient?', formula: 'LEV = (AH − SH Allowed) × SR' },
        { topic: 'SH Allowed', content: 'Standard hours for actual output', formula: 'SH = Std hrs per unit × Actual units' },
      ],
    },
    {
      title: 'Overhead Variances',
      items: [
        { topic: 'VOH Spending', content: 'Actual VOH vs budget for actual hrs', formula: 'VOH Spend = Actual VOH − (AH × Std VOH Rate)' },
        { topic: 'VOH Efficiency', content: 'Hours used vs allowed', formula: 'VOH Eff = (AH − SH) × Std VOH Rate' },
        { topic: 'FOH Budget/Spending', content: 'Actual FOH vs Budgeted FOH', formula: 'FOH Budget = Actual FOH − Budgeted FOH' },
        { topic: 'FOH Volume', content: 'Capacity utilization', formula: 'FOH Vol = (SH − Budgeted Hrs) × Std FOH Rate' },
      ],
    },
    {
      title: 'Variance Direction Rules',
      items: [
        { topic: 'Unfavorable (U)', content: 'Actual > Standard for costs = U' },
        { topic: 'Favorable (F)', content: 'Actual < Standard for costs = F' },
        { topic: 'Price uses Actual Qty', content: 'Isolates price effect at actual volume' },
        { topic: 'Quantity uses Std Price', content: 'Isolates efficiency at standard price' },
      ],
    },
  ],
};

export const CMA1_CHEAT_SHEET_PERFORMANCE: CheatSheet = {
  id: 'cma1-performance-cheat',
  title: 'Performance Measurement Cheat Sheet',
  part: 'CMA1',
  sections: [
    {
      title: 'Investment Center Metrics',
      items: [
        { topic: 'Return on Investment', content: 'Profitability relative to assets', formula: 'ROI = Operating Income / Avg Operating Assets' },
        { topic: 'DuPont ROI', content: 'Decomposed into margin & turnover', formula: 'ROI = (OI/Sales) × (Sales/Assets)' },
        { topic: 'Residual Income', content: 'Profit above required return', formula: 'RI = OI − (Required Rate × Assets)' },
        { topic: 'EVA', content: 'Economic profit after capital charge', formula: 'EVA = NOPAT − (WACC × Capital)' },
      ],
    },
    {
      title: 'ROI vs RI Comparison',
      items: [
        { topic: 'ROI Problem', content: 'Managers may reject good projects (above WACC but below current ROI)' },
        { topic: 'RI Advantage', content: 'Accept all projects that generate positive RI' },
        { topic: 'ROI Advantage', content: 'Easy to compare across divisions of different sizes' },
        { topic: 'RI Challenge', content: 'Larger divisions have larger RI (not comparable)' },
      ],
    },
    {
      title: 'Transfer Pricing',
      items: [
        { topic: 'General Rule', content: 'Minimum TP for seller', formula: 'Min TP = VC + Opportunity Cost' },
        { topic: 'No Excess Capacity', content: 'Opp cost = lost external CM', formula: 'Min TP = Market Price' },
        { topic: 'With Excess Capacity', content: 'Opp cost = 0', formula: 'Min TP = Variable Cost' },
        { topic: 'Buyer Maximum', content: 'Won\'t pay more than market', formula: 'Max = External Market Price' },
      ],
    },
    {
      title: 'Balanced Scorecard',
      items: [
        { topic: 'Four Perspectives', content: 'Financial, Customer, Internal Process, Learning & Growth' },
        { topic: 'Lead vs Lag', content: 'L&G leads → Internal leads → Customer leads → Financial lags' },
        { topic: 'Strategy Map', content: 'Shows cause-and-effect linkages between objectives' },
      ],
    },
  ],
};

export const CMA1_CHEAT_SHEET_BUDGETING: CheatSheet = {
  id: 'cma1-budgeting-cheat',
  title: 'Budgeting Cheat Sheet',
  part: 'CMA1',
  sections: [
    {
      title: 'Operating Budget Sequence',
      items: [
        { topic: '1. Sales Budget', content: 'Starting point - units × price' },
        { topic: '2. Production Budget', content: 'How many to make', formula: 'Prod = Sales + End Inv − Beg Inv' },
        { topic: '3. Direct Materials', content: 'Raw materials to buy', formula: 'Purch = Need + End Mat − Beg Mat' },
        { topic: '4. Direct Labor', content: 'Labor hours and cost', formula: 'DL$ = Units × Hrs × Rate' },
        { topic: '5. Manufacturing OH', content: 'Fixed + Variable overhead' },
        { topic: '6. Ending Inventory', content: 'Value of closing inventory' },
        { topic: '7. COGS', content: 'Cost of goods sold budget' },
        { topic: '8. S&A Expenses', content: 'Selling and administrative' },
      ],
    },
    {
      title: 'Cash Budget',
      items: [
        { topic: 'Collections', content: 'When cash is received (not sales)', formula: 'By collection pattern %' },
        { topic: 'Disbursements', content: 'When cash is paid (not purchases)', formula: 'By payment pattern %' },
        { topic: 'Minimum Balance', content: 'Required ending cash' },
        { topic: 'Financing', content: 'Borrow/repay to meet minimum' },
      ],
    },
    {
      title: 'Flexible vs Static Budgets',
      items: [
        { topic: 'Static Budget', content: 'Budget at planned activity level' },
        { topic: 'Flexible Budget', content: 'Budget adjusted to actual activity', formula: 'FB = FC + (VC/unit × Actual Units)' },
        { topic: 'Static Variance', content: 'Actual − Static (volume + spending)' },
        { topic: 'Flexible Variance', content: 'Actual − Flexible (spending only)' },
        { topic: 'Volume Variance', content: 'Flexible − Static (volume effect)' },
      ],
    },
  ],
};

export const CMA1_CHEAT_SHEET_INTERNAL_CONTROLS: CheatSheet = {
  id: 'cma1-internal-controls-cheat',
  title: 'Internal Controls Cheat Sheet',
  part: 'CMA1',
  sections: [
    {
      title: 'COSO Internal Control Framework',
      items: [
        { topic: 'Control Environment', content: 'Foundation — tone at the top, integrity, ethics, board oversight, structure, authority, accountability, HR policies' },
        { topic: 'Risk Assessment', content: 'Identify & analyze risks to objectives; consider fraud risk; assess changes in environment' },
        { topic: 'Control Activities', content: 'Policies & procedures to mitigate risks — approvals, authorizations, reconciliations, reviews, IT controls' },
        { topic: 'Information & Communication', content: 'Relevant, quality information obtained/generated; internal & external communication of IC responsibilities' },
        { topic: 'Monitoring Activities', content: 'Ongoing evaluations, separate evaluations, or combination; report deficiencies to management & board' },
      ],
    },
    {
      title: 'COSO 17 Principles (by Component)',
      items: [
        { topic: 'Control Environment (1–5)', content: '1) Integrity & ethics 2) Board oversight 3) Structure & authority 4) Competence commitment 5) Accountability' },
        { topic: 'Risk Assessment (6–9)', content: '6) Suitable objectives 7) Identify & analyze risk 8) Assess fraud risk 9) Identify significant change' },
        { topic: 'Control Activities (10–12)', content: '10) Select & develop controls 11) Technology general controls 12) Deploy through policies & procedures' },
        { topic: 'Info & Communication (13–15)', content: '13) Use relevant quality info 14) Communicate internally 15) Communicate externally' },
        { topic: 'Monitoring (16–17)', content: '16) Ongoing and/or separate evaluations 17) Evaluate & communicate deficiencies' },
      ],
    },
    {
      title: 'COSO ERM Framework',
      items: [
        { topic: 'ERM 8 Components', content: 'Internal Environment → Objective Setting → Event Identification → Risk Assessment → Risk Response → Control Activities → Info & Communication → Monitoring' },
        { topic: 'Risk Response Strategies', content: 'Avoid, Reduce (mitigate), Share (transfer/insure), Accept' },
        { topic: 'ERM vs IC', content: 'ERM is broader — includes strategy & objective setting; IC is a subset of ERM' },
      ],
    },
    {
      title: 'SOX Requirements',
      items: [
        { topic: 'SOX Section 302', content: 'CEO & CFO certify accuracy of financial statements and effectiveness of disclosure controls' },
        { topic: 'SOX Section 404(a)', content: 'Management must assess & report on effectiveness of internal controls over financial reporting (ICFR)' },
        { topic: 'SOX Section 404(b)', content: 'External auditor must attest to management\'s ICFR assessment (large accelerated filers)' },
        { topic: '302 vs 404', content: '302 = personal certification; 404 = formal assessment & audit of ICFR' },
      ],
    },
    {
      title: 'Types of Internal Controls',
      items: [
        { topic: 'Preventive Controls', content: 'Stop errors/fraud before they occur — segregation of duties, authorization, access controls' },
        { topic: 'Detective Controls', content: 'Find errors/fraud after occurrence — reconciliations, audits, variance analysis, exception reports' },
        { topic: 'Corrective Controls', content: 'Remedy detected issues — error correction procedures, disciplinary actions, process redesign' },
      ],
    },
    {
      title: 'Segregation of Duties',
      items: [
        { topic: 'Four Key Functions', content: 'Authorization, Custody, Recording, Reconciliation — no single person should perform more than one' },
        { topic: 'Authorization', content: 'Approve transactions (e.g., approve purchase orders)' },
        { topic: 'Custody', content: 'Physical control of assets (e.g., handle cash, inventory)' },
        { topic: 'Recording', content: 'Maintain accounting records (e.g., post journal entries)' },
        { topic: 'Reconciliation', content: 'Verify records against physical assets (e.g., bank reconciliation)' },
      ],
    },
    {
      title: 'IT Controls',
      items: [
        { topic: 'General Controls (ITGCs)', content: 'Access security, change management, backup/recovery, system development — apply to entire IT environment' },
        { topic: 'Application Controls', content: 'Input controls (validation), processing controls (completeness), output controls (distribution) — specific to each application' },
        { topic: 'ITGC vs Application', content: 'ITGCs provide the foundation; application controls depend on ITGCs being effective' },
      ],
    },
    {
      title: 'Fraud & Risk',
      items: [
        { topic: 'Fraud Triangle', content: 'Three conditions: Opportunity (weak controls), Pressure/Incentive (financial need), Rationalization (justify behavior)' },
        { topic: 'Internal Audit Reporting', content: 'Internal audit function should report to the Audit Committee (not management) to maintain independence' },
        { topic: 'Risk Assessment Matrix', content: 'Plot risks on Likelihood (probability) × Impact (severity) grid; prioritize high-likelihood, high-impact risks' },
        { topic: 'Risk Appetite vs Tolerance', content: 'Appetite = broad level of risk willing to accept; Tolerance = acceptable variation around specific objectives' },
      ],
    },
  ],
};

export const CMA1_CHEAT_SHEET_EXTERNAL_REPORTING: CheatSheet = {
  id: 'cma1-external-reporting-cheat',
  title: 'External Financial Reporting Cheat Sheet',
  part: 'CMA1',
  sections: [
    {
      title: 'Revenue Recognition (ASC 606)',
      items: [
        { topic: '5-Step Model', content: '1) Identify contract 2) Identify performance obligations 3) Determine transaction price 4) Allocate price 5) Recognize revenue' },
        { topic: 'Over Time vs Point in Time', content: 'Over time: customer simultaneously receives/consumes, asset has no alternative use + right to payment, or customer controls asset as built' },
        { topic: 'Variable Consideration', content: 'Estimate using Expected Value (probability-weighted) or Most Likely Amount; constrain for uncertainty' },
      ],
    },
    {
      title: 'Leases (ASC 842)',
      items: [
        { topic: 'Finance Lease Criteria', content: 'Transfer of ownership, purchase option likely, lease term ≥ major part of life, PV ≥ substantially all FV, specialized asset' },
        { topic: 'Operating Lease', content: 'ROU asset + liability on BS; single straight-line expense on IS; no asset depreciation shown separately' },
        { topic: 'Finance Lease', content: 'ROU asset + liability on BS; depreciation + interest expense on IS (front-loaded total expense)' },
      ],
    },
    {
      title: 'Key Formulas',
      items: [
        { topic: 'Basic EPS', content: '(Net Income − Preferred Dividends) ÷ Weighted Avg Common Shares', formula: 'EPS = (NI−PD)/WACS' },
        { topic: 'DDB Depreciation', content: 'Rate = 2/Life × Book Value; ignore salvage until BV < salvage', formula: 'DDB = (2/n) × BV' },
        { topic: 'Pension Expense', content: 'Service Cost + Interest Cost − Expected Return + Amort of Prior Service Cost + Amort of Net Loss' },
        { topic: 'Goodwill', content: 'Purchase Price − Fair Value of Net Identifiable Assets; test annually for impairment (no amortization)' },
      ],
    },
    {
      title: 'Exam Traps',
      items: [
        { topic: 'LIFO vs FIFO', content: 'Rising prices: LIFO = lower income, lower taxes, lower inventory; FIFO = higher income, higher inventory' },
        { topic: 'Capitalization', content: 'Interest cost on qualifying assets IS capitalized; R&D costs are EXPENSED (except software after tech feasibility)' },
        { topic: 'Contingencies', content: 'Probable + estimable = accrue liability; Probable but not estimable = disclose only; Remote = nothing' },
      ],
    },
  ],
};

export const CMA1_CHEAT_SHEET_TECHNOLOGY: CheatSheet = {
  id: 'cma1-technology-cheat',
  title: 'Technology and Analytics Cheat Sheet',
  part: 'CMA1',
  sections: [
    {
      title: 'Data Analytics Levels',
      items: [
        { topic: 'Descriptive', content: 'What happened? Dashboards, reports, data visualization (Tableau, Power BI)' },
        { topic: 'Diagnostic', content: 'Why did it happen? Drill-down analysis, root cause analysis, correlation' },
        { topic: 'Predictive', content: 'What will happen? Regression, machine learning, forecasting models' },
        { topic: 'Prescriptive', content: 'What should we do? Optimization, simulation, decision models' },
      ],
    },
    {
      title: 'Key Technologies',
      items: [
        { topic: 'ERP', content: 'Integrated system (SAP, Oracle) — single database for all business functions; enables real-time reporting' },
        { topic: 'RPA', content: 'Software robots automate repetitive tasks (reconciliations, data entry); rule-based, no coding, quick ROI' },
        { topic: 'AI/ML', content: 'Pattern recognition, anomaly detection, NLP for document processing; requires clean data and governance' },
        { topic: 'Blockchain', content: 'Distributed immutable ledger; smart contracts; audit trail; supply chain tracking' },
        { topic: 'Cloud Computing', content: 'IaaS/PaaS/SaaS models; scalability; pay-per-use; security considerations' },
      ],
    },
    {
      title: 'Data Governance & Security',
      items: [
        { topic: 'Data Governance', content: 'Policies for data quality, ownership, stewardship, metadata, access control, lifecycle management' },
        { topic: 'Cybersecurity', content: 'CIA Triad: Confidentiality, Integrity, Availability; defense in depth; encryption; access controls' },
        { topic: 'Privacy', content: 'GDPR (EU), CCPA (California); data minimization; consent; right to deletion; breach notification' },
      ],
    },
    {
      title: 'Finance Transformation',
      items: [
        { topic: 'Digital Finance', content: 'Continuous close, real-time reporting, self-service analytics, automated controls' },
        { topic: 'Change Management', content: 'People + Process + Technology; training plans; KPIs for adoption; executive sponsorship' },
        { topic: 'ROI of Technology', content: 'Quantify: time saved, error reduction, faster close, better decisions; consider TCO including implementation' },
      ],
    },
  ],
};

// ==========================================
// CMA PART 2 CHEAT SHEETS
// ==========================================

export const CMA2_CHEAT_SHEET_TVM: CheatSheet = {
  id: 'cma2-tvm-cheat',
  title: 'Time Value of Money Cheat Sheet',
  part: 'CMA2',
  sections: [
    {
      title: 'Single Sum',
      items: [
        { topic: 'Future Value', content: 'Value of $ today in future', formula: 'FV = PV × (1+r)ⁿ' },
        { topic: 'Present Value', content: 'Value of future $ today', formula: 'PV = FV / (1+r)ⁿ' },
        { topic: 'Rule of 72', content: 'Years to double ≈ 72/rate', formula: '72/8% = 9 years' },
      ],
    },
    {
      title: 'Annuities',
      items: [
        { topic: 'PV of Ordinary Annuity', content: 'Payments at end of period', formula: 'PVA = PMT × PVIFA(r,n)' },
        { topic: 'FV of Ordinary Annuity', content: 'Future value of payments', formula: 'FVA = PMT × FVIFA(r,n)' },
        { topic: 'Annuity Due', content: 'Payments at beginning', formula: 'Multiply ordinary by (1+r)' },
      ],
    },
    {
      title: 'Perpetuities',
      items: [
        { topic: 'Perpetuity PV', content: 'Infinite equal payments', formula: 'PV = PMT / r' },
        { topic: 'Growing Perpetuity', content: 'Infinite growing payments', formula: 'PV = D₁ / (r − g)' },
        { topic: 'Requirement', content: 'Growth rate must be < discount rate', formula: 'g < r' },
      ],
    },
  ],
};

export const CMA2_CHEAT_SHEET_CAPITAL_BUDGETING: CheatSheet = {
  id: 'cma2-capbudget-cheat',
  title: 'Capital Budgeting Cheat Sheet',
  part: 'CMA2',
  sections: [
    {
      title: 'NPV Method (Preferred)',
      items: [
        { topic: 'NPV Formula', content: 'PV of inflows minus outflow', formula: 'NPV = Σ[CFₜ/(1+r)ᵗ] − I₀' },
        { topic: 'Decision Rule', content: 'NPV > 0: Accept; NPV < 0: Reject' },
        { topic: 'Discount Rate', content: 'Use WACC for average-risk projects' },
        { topic: 'Why Preferred', content: 'Measures $ value added, assumes reinvest at WACC' },
      ],
    },
    {
      title: 'IRR Method',
      items: [
        { topic: 'IRR Definition', content: 'Rate where NPV = 0', formula: 'Find r: NPV = 0' },
        { topic: 'Decision Rule', content: 'IRR > WACC: Accept' },
        { topic: 'Pitfall #1', content: 'Multiple IRRs with non-conventional CFs' },
        { topic: 'Pitfall #2', content: 'Reinvestment assumption (at IRR, not WACC)' },
        { topic: 'Pitfall #3', content: 'May conflict with NPV for mutually exclusive projects' },
      ],
    },
    {
      title: 'Other Methods',
      items: [
        { topic: 'Payback', content: 'Years to recover investment', formula: 'Cumulative CF = Investment' },
        { topic: 'Profitability Index', content: 'Benefit-cost ratio', formula: 'PI = PV of CFs / Investment' },
        { topic: 'PI Decision', content: 'PI > 1: Accept (useful for rationing)' },
      ],
    },
    {
      title: 'Cash Flow Components',
      items: [
        { topic: 'Initial Outlay', content: 'Cost + Installation + ΔWC' },
        { topic: 'Operating CF', content: 'Revenue − Expenses − Tax + Depreciation', formula: 'OCF = EBIT(1−t) + Dep' },
        { topic: 'Tax Shield', content: 'Tax savings from depreciation', formula: 'Shield = Dep × Tax Rate' },
        { topic: 'Terminal CF', content: 'Salvage ± Tax effect + WC recovery' },
      ],
    },
  ],
};

export const CMA2_CHEAT_SHEET_COST_OF_CAPITAL: CheatSheet = {
  id: 'cma2-costcap-cheat',
  title: 'Cost of Capital Cheat Sheet',
  part: 'CMA2',
  sections: [
    {
      title: 'Component Costs',
      items: [
        { topic: 'Cost of Debt (AT)', content: 'Interest is tax-deductible', formula: 'Kd(AT) = Kd × (1−T)' },
        { topic: 'Cost of Preferred', content: 'No tax benefit', formula: 'Kp = Dp / P₀' },
        { topic: 'Cost of Equity (CAPM)', content: 'Risk-based model', formula: 'Ke = Rf + β(Rm − Rf)' },
        { topic: 'Cost of Equity (DGM)', content: 'Dividend growth model', formula: 'Ke = D₁/P₀ + g' },
      ],
    },
    {
      title: 'WACC',
      items: [
        { topic: 'WACC Formula', content: 'Weighted average of all sources', formula: 'WACC = wdKd(1−T) + wpKp + weKe' },
        { topic: 'Weights', content: 'Use market values, not book values' },
        { topic: 'Use of WACC', content: 'Discount rate for average-risk projects' },
        { topic: 'Risk Adjustment', content: 'Higher risk project = add premium to WACC' },
      ],
    },
    {
      title: 'CAPM Components',
      items: [
        { topic: 'Risk-Free Rate (Rf)', content: 'Usually T-bill or T-bond rate' },
        { topic: 'Market Risk Premium', content: 'Rm − Rf, typically 5-7% historically' },
        { topic: 'Beta', content: 'β = 1: market risk; β > 1: more volatile; β < 1: less volatile' },
      ],
    },
  ],
};

export const CMA2_CHEAT_SHEET_RATIOS: CheatSheet = {
  id: 'cma2-ratios-cheat',
  title: 'Financial Ratios Cheat Sheet',
  part: 'CMA2',
  sections: [
    {
      title: 'Liquidity (Short-term Solvency)',
      items: [
        { topic: 'Current Ratio', content: 'All current assets', formula: 'CA / CL' },
        { topic: 'Quick Ratio', content: 'Exclude inventory', formula: '(CA − Inventory) / CL' },
        { topic: 'Cash Ratio', content: 'Most conservative', formula: 'Cash / CL' },
      ],
    },
    {
      title: 'Activity (Efficiency)',
      items: [
        { topic: 'Inventory Turnover', content: 'Times inventory sold', formula: 'COGS / Avg Inventory' },
        { topic: 'Days Inventory', content: 'Days to sell inventory', formula: '365 / Inv Turnover' },
        { topic: 'Receivables Turnover', content: 'Times collected', formula: 'Sales / Avg AR' },
        { topic: 'Days Sales Outstanding', content: 'Collection period', formula: '365 / AR Turnover' },
        { topic: 'Cash Conversion Cycle', content: 'Operating cycle efficiency', formula: 'DIO + DSO − DPO' },
      ],
    },
    {
      title: 'Solvency (Long-term)',
      items: [
        { topic: 'Debt-to-Equity', content: 'Leverage ratio', formula: 'Total Liabilities / Equity' },
        { topic: 'Debt Ratio', content: 'Assets financed by debt', formula: 'Total Liabilities / Total Assets' },
        { topic: 'Times Interest Earned', content: 'Interest coverage', formula: 'EBIT / Interest' },
      ],
    },
    {
      title: 'Profitability',
      items: [
        { topic: 'Gross Margin', content: 'After COGS', formula: '(Sales − COGS) / Sales' },
        { topic: 'Operating Margin', content: 'After operating expenses', formula: 'EBIT / Sales' },
        { topic: 'Net Margin', content: 'Bottom line', formula: 'Net Income / Sales' },
        { topic: 'ROA', content: 'Return on assets', formula: 'Net Income / Avg Assets' },
        { topic: 'ROE', content: 'Return on equity', formula: 'Net Income / Avg Equity' },
      ],
    },
    {
      title: 'DuPont Analysis',
      items: [
        { topic: '3-Part DuPont', content: 'Decompose ROE', formula: 'ROE = Margin × Turnover × Leverage' },
        { topic: 'Components', content: '(NI/Sales) × (Sales/Assets) × (Assets/Equity)' },
        { topic: 'Interpretation', content: 'Shows profit efficiency, asset efficiency, financial leverage' },
      ],
    },
  ],
};

export const CMA2_CHEAT_SHEET_RISK: CheatSheet = {
  id: 'cma2-risk-cheat',
  title: 'Risk Management Cheat Sheet',
  part: 'CMA2',
  sections: [
    {
      title: 'Risk Measures',
      items: [
        { topic: 'Expected Value', content: 'Probability-weighted outcome', formula: 'EV = Σ(Pᵢ × Xᵢ)' },
        { topic: 'Standard Deviation', content: 'Absolute risk measure', formula: 'σ = √Σ[Pᵢ(Xᵢ−μ)²]' },
        { topic: 'Coeff of Variation', content: 'Relative risk measure', formula: 'CV = σ / μ' },
        { topic: 'Beta', content: 'Systematic (market) risk', formula: 'β = Cov(Ri,Rm) / Var(Rm)' },
      ],
    },
    {
      title: 'Derivatives Basics',
      items: [
        { topic: 'Forward/Future', content: 'Obligation to buy/sell at set price', formula: 'Long gains if price ↑' },
        { topic: 'Call Option', content: 'Right to BUY at strike price', formula: 'Payoff = Max(0, S−K) − Premium' },
        { topic: 'Put Option', content: 'Right to SELL at strike price', formula: 'Payoff = Max(0, K−S) − Premium' },
      ],
    },
    {
      title: 'Hedging Strategies',
      items: [
        { topic: 'Protective Put', content: 'Own stock + buy put = limit downside' },
        { topic: 'Covered Call', content: 'Own stock + sell call = generate income' },
        { topic: 'Currency Hedge', content: 'Forward/future to lock in exchange rate' },
        { topic: 'Interest Rate Hedge', content: 'Swap or futures to manage rate exposure' },
      ],
    },
  ],
};

export const CMA2_CHEAT_SHEET_ETHICS: CheatSheet = {
  id: 'cma2-ethics-cheat',
  title: 'Professional Ethics Cheat Sheet',
  part: 'CMA2',
  sections: [
    {
      title: 'IMA Statement of Ethical Professional Practice',
      items: [
        { topic: 'Competence', content: 'Maintain professional expertise; perform duties per laws/regulations/standards; provide accurate & timely information; recognize limitations' },
        { topic: 'Confidentiality', content: 'Keep information confidential except when authorized or legally required; do not use info for personal advantage; ensure subordinates comply' },
        { topic: 'Integrity', content: 'Mitigate conflicts of interest; refrain from conduct that prejudices duties; abstain from activities that discredit the profession' },
        { topic: 'Credibility', content: 'Communicate information fairly & objectively; disclose all relevant information; disclose delays or deficiencies in reporting' },
        { topic: 'Memory Aid', content: 'C-C-I-C: Competence, Confidentiality, Integrity, Credibility' },
      ],
    },
    {
      title: 'IMA Conflict Resolution Process',
      items: [
        { topic: 'Step 1', content: 'Discuss the issue with your immediate supervisor (unless they are involved)' },
        { topic: 'Step 2', content: 'Escalate to next higher management level' },
        { topic: 'Step 3', content: 'Contact IMA Ethics Counseling confidential hotline' },
        { topic: 'Step 4', content: 'Report to board of directors or audit committee' },
        { topic: 'Step 5', content: 'Resign if ethical conflict remains unresolved after exhausting all internal avenues' },
        { topic: 'Key Rule', content: 'Do NOT go outside the organization unless legally required — exhaust internal channels first' },
      ],
    },
    {
      title: 'Foreign Corrupt Practices Act (FCPA)',
      items: [
        { topic: 'Anti-Bribery Provision', content: 'Prohibits payments to foreign government officials to obtain/retain business; applies to US persons & foreign issuers' },
        { topic: 'Accounting Provision', content: 'Requires accurate books & records; maintain adequate internal accounting controls (ICFR)' },
        { topic: 'Facilitating Payments', content: 'Small payments for routine government actions (permits, licenses) — historically allowed but increasingly scrutinized' },
        { topic: 'Penalties', content: 'Criminal fines up to $250K (individuals) / $2M (entities); imprisonment up to 5 years' },
      ],
    },
    {
      title: 'Sarbanes-Oxley Ethical Requirements',
      items: [
        { topic: 'Code of Ethics', content: 'Public companies must disclose whether they have a code of ethics for senior financial officers; if not, explain why' },
        { topic: 'SOX §406', content: 'Code must promote honest conduct, full/fair disclosure, and compliance with laws' },
        { topic: 'Audit Committee', content: 'Must be independent directors; at least one financial expert; oversee external auditor; receive IC complaints' },
        { topic: 'SOX §806 Whistleblower', content: 'Protects employees who report fraud; prohibits retaliation (discharge, demotion, suspension, threats)' },
      ],
    },
    {
      title: 'Whistleblower Protections',
      items: [
        { topic: 'Dodd-Frank Act', content: 'Financial reward (10–30% of sanctions > $1M) for reporting securities violations to SEC' },
        { topic: 'Anti-Retaliation', content: 'Employers cannot fire, demote, harass, or discriminate against whistleblowers' },
        { topic: 'Internal vs External', content: 'IMA ethics says exhaust internal channels; Dodd-Frank allows reporting directly to SEC' },
        { topic: 'SOX vs Dodd-Frank', content: 'SOX protects employees; Dodd-Frank adds financial incentives & broader protections' },
      ],
    },
    {
      title: 'Corporate Code of Conduct',
      items: [
        { topic: 'Key Elements', content: 'Standards of behavior, compliance procedures, reporting mechanisms, disciplinary actions, training requirements' },
        { topic: 'Tone at the Top', content: 'Leadership sets ethical culture; most critical factor — if leaders act unethically, employees follow' },
        { topic: 'Ethics Training', content: 'Regular training, communication, and certification required to maintain ethical awareness' },
        { topic: 'Reporting Mechanisms', content: 'Anonymous hotlines, ombudsman, open-door policy, ethics officer' },
      ],
    },
    {
      title: 'Ethical Decision-Making Frameworks',
      items: [
        { topic: 'Utilitarian Approach', content: 'Choose action producing greatest good for the greatest number' },
        { topic: 'Rights Approach', content: 'Protect and respect moral rights of all affected parties' },
        { topic: 'Justice/Fairness', content: 'Treat all people equally and fairly; distribute benefits/burdens equitably' },
        { topic: 'Virtue Approach', content: 'Act in a way consistent with ideal virtues (honesty, courage, compassion)' },
      ],
    },
    {
      title: 'Common CMA Ethical Dilemmas',
      items: [
        { topic: 'Earnings Management', content: 'Pressure to meet targets — manipulating estimates, timing revenues, cookie jar reserves; violates Credibility & Integrity' },
        { topic: 'Conflict of Interest', content: 'Personal financial interest in business decisions; must disclose and recuse; violates Integrity' },
        { topic: 'Confidentiality Breach', content: 'Sharing insider info, tipping on M&A; violates Confidentiality — except when legally obligated to disclose' },
        { topic: 'Consequences', content: 'CMA certification revocation, criminal prosecution, civil liability, career destruction, organizational harm' },
      ],
    },
  ],
};

// ==========================================
// EXPORT ALL CHEAT SHEETS
// ==========================================

export const ALL_CMA1_CHEAT_SHEETS = [
  CMA1_CHEAT_SHEET_CVP,
  CMA1_CHEAT_SHEET_VARIANCE,
  CMA1_CHEAT_SHEET_PERFORMANCE,
  CMA1_CHEAT_SHEET_BUDGETING,
  CMA1_CHEAT_SHEET_INTERNAL_CONTROLS,
  CMA1_CHEAT_SHEET_EXTERNAL_REPORTING,
  CMA1_CHEAT_SHEET_TECHNOLOGY,
];

export const ALL_CMA2_CHEAT_SHEETS = [
  CMA2_CHEAT_SHEET_TVM,
  CMA2_CHEAT_SHEET_CAPITAL_BUDGETING,
  CMA2_CHEAT_SHEET_COST_OF_CAPITAL,
  CMA2_CHEAT_SHEET_RATIOS,
  CMA2_CHEAT_SHEET_RISK,
  CMA2_CHEAT_SHEET_ETHICS,
];

export const ALL_CMA_CHEAT_SHEETS = [
  ...ALL_CMA1_CHEAT_SHEETS,
  ...ALL_CMA2_CHEAT_SHEETS,
];

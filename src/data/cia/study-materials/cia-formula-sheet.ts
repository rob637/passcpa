/**
 * CIA Formula Sheet
 * Essential formulas for CIA Parts 1, 2, and 3
 * 
 * Comprehensive reference for Certified Internal Auditor exam calculations
 */

export interface CIAFormula {
  id: string;
  name: string;
  formula: string;
  variables?: Record<string, string>;
  example?: string;
  notes?: string;
}

export interface CIAFormulaCategory {
  id: string;
  category: string;
  part: 'CIA1' | 'CIA2' | 'CIA3' | 'All';
  formulas: CIAFormula[];
}

export const CIA_FORMULA_SHEET: CIAFormulaCategory[] = [
  // =====================================================
  // Sampling & Statistics (CIA1 & CIA3)
  // =====================================================
  {
    id: 'sampling',
    category: 'Audit Sampling',
    part: 'All',
    formulas: [
      {
        id: 'sample-size-attr',
        name: 'Attribute Sampling - Sample Size',
        formula: 'n = (Z² × p × (1-p)) / E²',
        variables: {
          'n': 'Sample size',
          'Z': 'Z-score for confidence level (1.96 for 95%, 2.58 for 99%)',
          'p': 'Expected error rate (deviation rate)',
          'E': 'Tolerable error (precision)',
        },
        example: '95% confidence, 5% expected rate, 2% precision: n = (1.96² × 0.05 × 0.95) / 0.02² = 457',
      },
      {
        id: 'sample-size-var',
        name: 'Variables Sampling - Sample Size',
        formula: 'n = (Z × σ / E)²',
        variables: {
          'n': 'Sample size',
          'Z': 'Z-score for confidence level',
          'σ': 'Population standard deviation',
          'E': 'Tolerable error (precision)',
        },
      },
      {
        id: 'sample-deviation',
        name: 'Sample Deviation Rate',
        formula: 'Sample Deviation Rate = Number of Deviations / Sample Size',
        notes: 'Compare to tolerable deviation rate to evaluate control effectiveness',
      },
      {
        id: 'upper-error-limit',
        name: 'Upper Error Limit',
        formula: 'UEL = Sample Deviation Rate + Allowance for Sampling Risk',
        notes: 'If UEL > Tolerable Rate, controls are not effective',
      },
      {
        id: 'projected-misstatement',
        name: 'Projected Misstatement (Substantive)',
        formula: 'Projected Misstatement = (Sample Misstatement / Sample Value) × Population Value',
        notes: 'Used in difference estimation and ratio estimation',
      },
      {
        id: 'confidence-interval',
        name: 'Confidence Interval',
        formula: 'CI = x̄ ± (Z × σ/√n)',
        variables: {
          'x̄': 'Sample mean',
          'Z': 'Z-score for confidence level',
          'σ': 'Standard deviation',
          'n': 'Sample size',
        },
      },
      {
        id: 'standard-error',
        name: 'Standard Error',
        formula: 'SE = σ / √n',
        notes: 'Measures variability of sample mean from population mean',
      },
    ],
  },

  // =====================================================
  // Risk Assessment (CIA1 & CIA2)
  // =====================================================
  {
    id: 'risk-assessment',
    category: 'Risk Assessment & Analysis',
    part: 'All',
    formulas: [
      {
        id: 'inherent-risk',
        name: 'Risk Model (Audit Risk)',
        formula: 'Audit Risk = Inherent Risk × Control Risk × Detection Risk',
        variables: {
          'Inherent Risk': 'Risk without controls',
          'Control Risk': 'Risk that controls fail to detect',
          'Detection Risk': 'Risk that audit procedures fail to detect',
        },
        notes: 'AR = IR × CR × DR. If IR and CR are high, decrease DR (more testing)',
      },
      {
        id: 'detection-risk',
        name: 'Detection Risk (Target)',
        formula: 'Detection Risk = Audit Risk / (Inherent Risk × Control Risk)',
        example: 'If AR = 5%, IR = 100%, CR = 50%: DR = 0.05 / (1.0 × 0.5) = 10%',
      },
      {
        id: 'risk-exposure',
        name: 'Risk Exposure',
        formula: 'Risk Exposure = Probability of Occurrence × Impact (Loss Amount)',
        example: '20% probability × $500,000 impact = $100,000 risk exposure',
        notes: 'Also called Expected Loss or Risk Factor',
      },
      {
        id: 'risk-priority',
        name: 'Risk Priority Number (RPN)',
        formula: 'RPN = Severity × Occurrence × Detection',
        variables: {
          'Severity': 'Impact if risk occurs (1-10)',
          'Occurrence': 'Likelihood of risk (1-10)',
          'Detection': 'Ability to detect before impact (1-10)',
        },
        notes: 'Used in FMEA. Higher RPN = higher priority for audit',
      },
      {
        id: 'materiality',
        name: 'Materiality Calculation',
        formula: 'Common benchmarks: 0.5-1% of Revenue, 5-10% of Net Income, 1-2% of Total Assets',
        notes: 'Planning materiality > Performance materiality > Trivial threshold',
      },
      {
        id: 'residual-risk',
        name: 'Residual Risk',
        formula: 'Residual Risk = Inherent Risk - Risk Mitigation Effectiveness',
        notes: 'Or: Residual Risk = Inherent Risk × (1 - Control Effectiveness)',
      },
    ],
  },

  // =====================================================
  // Financial Ratios (CIA3)
  // =====================================================
  {
    id: 'liquidity-ratios',
    category: 'Liquidity Ratios',
    part: 'CIA3',
    formulas: [
      {
        id: 'current-ratio',
        name: 'Current Ratio',
        formula: 'Current Ratio = Current Assets / Current Liabilities',
        notes: 'Measures ability to pay short-term obligations. Healthy: 1.5-2.0',
      },
      {
        id: 'quick-ratio',
        name: 'Quick Ratio (Acid Test)',
        formula: 'Quick Ratio = (Current Assets - Inventory) / Current Liabilities',
        notes: 'More conservative liquidity measure. Healthy: >1.0',
      },
      {
        id: 'cash-ratio',
        name: 'Cash Ratio',
        formula: 'Cash Ratio = (Cash + Cash Equivalents) / Current Liabilities',
        notes: 'Most conservative liquidity measure',
      },
      {
        id: 'working-capital',
        name: 'Working Capital',
        formula: 'Working Capital = Current Assets - Current Liabilities',
        notes: 'Absolute measure of short-term financial health',
      },
    ],
  },

  {
    id: 'activity-ratios',
    category: 'Activity (Efficiency) Ratios',
    part: 'CIA3',
    formulas: [
      {
        id: 'ar-turnover',
        name: 'Accounts Receivable Turnover',
        formula: 'AR Turnover = Net Credit Sales / Average Accounts Receivable',
        notes: 'Higher = faster collection. Days Sales Outstanding = 365 / AR Turnover',
      },
      {
        id: 'dso',
        name: 'Days Sales Outstanding',
        formula: 'DSO = 365 / AR Turnover = Average AR / (Annual Sales / 365)',
        notes: 'Average collection period. Lower is better.',
      },
      {
        id: 'inventory-turnover',
        name: 'Inventory Turnover',
        formula: 'Inventory Turnover = COGS / Average Inventory',
        notes: 'Higher = faster inventory movement. Days in Inventory = 365 / IT',
      },
      {
        id: 'days-inventory',
        name: 'Days in Inventory',
        formula: 'Days in Inventory = 365 / Inventory Turnover',
        notes: 'Average days to sell inventory. Lower is generally better.',
      },
      {
        id: 'ap-turnover',
        name: 'Accounts Payable Turnover',
        formula: 'AP Turnover = Purchases / Average Accounts Payable',
        notes: 'Days Payable = 365 / AP Turnover',
      },
      {
        id: 'asset-turnover',
        name: 'Asset Turnover',
        formula: 'Asset Turnover = Net Sales / Average Total Assets',
        notes: 'Measures efficiency of asset utilization',
      },
      {
        id: 'cash-conversion',
        name: 'Cash Conversion Cycle',
        formula: 'CCC = DSO + Days Inventory - Days Payable',
        notes: 'Days from cash outflow to cash inflow. Lower is better.',
      },
    ],
  },

  {
    id: 'profitability-ratios',
    category: 'Profitability Ratios',
    part: 'CIA3',
    formulas: [
      {
        id: 'gross-margin',
        name: 'Gross Profit Margin',
        formula: 'Gross Margin = (Revenue - COGS) / Revenue',
        notes: 'Core business profitability before operating expenses',
      },
      {
        id: 'operating-margin',
        name: 'Operating Profit Margin',
        formula: 'Operating Margin = Operating Income / Revenue',
        notes: 'Profitability from core operations',
      },
      {
        id: 'net-margin',
        name: 'Net Profit Margin',
        formula: 'Net Margin = Net Income / Revenue',
        notes: 'Bottom line profitability',
      },
      {
        id: 'roa',
        name: 'Return on Assets (ROA)',
        formula: 'ROA = Net Income / Average Total Assets',
        notes: 'Measures how efficiently assets generate profit',
      },
      {
        id: 'roe',
        name: 'Return on Equity (ROE)',
        formula: 'ROE = Net Income / Average Shareholders\' Equity',
        notes: 'Return to shareholders. Can be affected by leverage.',
      },
      {
        id: 'dupont',
        name: 'DuPont Analysis',
        formula: 'ROE = Net Margin × Asset Turnover × Equity Multiplier',
        variables: {
          'Net Margin': 'Net Income / Revenue',
          'Asset Turnover': 'Revenue / Average Assets',
          'Equity Multiplier': 'Average Assets / Average Equity',
        },
        notes: 'Decomposes ROE into profitability, efficiency, and leverage',
      },
      {
        id: 'roic',
        name: 'Return on Invested Capital',
        formula: 'ROIC = NOPAT / Invested Capital',
        variables: {
          'NOPAT': 'Net Operating Profit After Taxes',
          'Invested Capital': 'Total Debt + Equity - Cash',
        },
      },
    ],
  },

  {
    id: 'leverage-ratios',
    category: 'Leverage (Solvency) Ratios',
    part: 'CIA3',
    formulas: [
      {
        id: 'debt-ratio',
        name: 'Debt Ratio',
        formula: 'Debt Ratio = Total Liabilities / Total Assets',
        notes: 'Portion of assets financed by debt. Higher = more leverage risk.',
      },
      {
        id: 'debt-equity',
        name: 'Debt-to-Equity Ratio',
        formula: 'D/E = Total Liabilities / Total Shareholders\' Equity',
        notes: 'Measures financial leverage. Industry-specific benchmarks.',
      },
      {
        id: 'equity-multiplier',
        name: 'Equity Multiplier',
        formula: 'Equity Multiplier = Total Assets / Total Equity',
        notes: 'Also = 1 + D/E. Higher = more leverage.',
      },
      {
        id: 'interest-coverage',
        name: 'Interest Coverage Ratio',
        formula: 'Times Interest Earned = EBIT / Interest Expense',
        notes: 'Ability to cover interest payments. >3 generally healthy.',
      },
      {
        id: 'debt-service',
        name: 'Debt Service Coverage',
        formula: 'DSCR = Net Operating Income / Total Debt Service',
        notes: 'Ability to service debt payments. >1.25 typically required.',
      },
    ],
  },

  // =====================================================
  // Internal Control Metrics (CIA1)
  // =====================================================
  {
    id: 'control-metrics',
    category: 'Internal Control Metrics',
    part: 'CIA1',
    formulas: [
      {
        id: 'control-effectiveness',
        name: 'Control Effectiveness Rate',
        formula: 'Effectiveness = 1 - (Deviations / Sample Size)',
        notes: 'Controls >95% effective typically considered adequate',
      },
      {
        id: 'control-cost-benefit',
        name: 'Control Cost-Benefit Analysis',
        formula: 'Net Benefit = Risk Reduction Value - Control Implementation Cost',
        notes: 'Controls should be cost-effective; benefits > costs',
      },
      {
        id: 'remediation-rate',
        name: 'Issue Remediation Rate',
        formula: 'Remediation Rate = Issues Resolved / Total Issues Identified',
        notes: 'Track by severity and age. Target: 100% for high-risk items',
      },
      {
        id: 'repeat-finding',
        name: 'Repeat Finding Rate',
        formula: 'Repeat Rate = Recurring Issues / Total Issues',
        notes: 'Indicates effectiveness of corrective actions',
      },
    ],
  },

  // =====================================================
  // IT Audit Formulas (CIA2)
  // =====================================================
  {
    id: 'it-audit',
    category: 'IT Audit Metrics',
    part: 'CIA2',
    formulas: [
      {
        id: 'availability',
        name: 'System Availability',
        formula: 'Availability = (Total Time - Downtime) / Total Time × 100%',
        notes: 'Five 9s (99.999%) = 5.26 minutes downtime/year',
        example: '8,760 hours - 10 hours downtime = 99.89% availability',
      },
      {
        id: 'mtbf',
        name: 'Mean Time Between Failures',
        formula: 'MTBF = Total Operating Time / Number of Failures',
        notes: 'Higher = more reliable systems',
      },
      {
        id: 'mttr',
        name: 'Mean Time to Recovery',
        formula: 'MTTR = Total Downtime / Number of Failures',
        notes: 'Lower = faster recovery. Key BCP/DR metric.',
      },
      {
        id: 'rto',
        name: 'Recovery Time Objective (RTO)',
        formula: 'RTO = Maximum acceptable time to restore services after disruption',
        notes: 'Must align with business impact analysis',
      },
      {
        id: 'rpo',
        name: 'Recovery Point Objective (RPO)',
        formula: 'RPO = Maximum acceptable data loss in time (last backup point)',
        notes: 'Determines backup frequency: RPO of 4 hours = backup every 4 hours',
      },
    ],
  },

  // =====================================================
  // Internal Audit Performance (CIA1)
  // =====================================================
  {
    id: 'ia-performance',
    category: 'Internal Audit Performance',
    part: 'CIA1',
    formulas: [
      {
        id: 'plan-completion',
        name: 'Audit Plan Completion Rate',
        formula: 'Completion Rate = Audits Completed / Audits Planned × 100%',
        notes: 'Target: 80-90%+ (some flexibility for emerging risks)',
      },
      {
        id: 'cycle-time',
        name: 'Audit Cycle Time',
        formula: 'Cycle Time = Report Issue Date - Fieldwork Start Date',
        notes: 'Measure efficiency. Track by audit type.',
      },
      {
        id: 'cost-per-audit',
        name: 'Cost per Audit',
        formula: 'Cost per Audit = Total IA Department Cost / Number of Audits Completed',
        notes: 'Track trend over time for efficiency gains',
      },
      {
        id: 'findings-per-audit',
        name: 'Findings per Audit',
        formula: 'Findings Rate = Total Findings / Number of Audits',
        notes: 'Track by severity level',
      },
      {
        id: 'stakeholder-satisfaction',
        name: 'Stakeholder Satisfaction',
        formula: 'Average rating from post-audit surveys (1-5 or 1-10 scale)',
        notes: 'Track by audit team, audit type, and over time',
      },
    ],
  },

  // =====================================================
  // Quantitative Analysis (CIA3)
  // =====================================================
  {
    id: 'quant-analysis',
    category: 'Quantitative Analysis',
    part: 'CIA3',
    formulas: [
      {
        id: 'npv',
        name: 'Net Present Value (NPV)',
        formula: 'NPV = Σ [CFt / (1 + r)^t] - Initial Investment',
        variables: {
          'CFt': 'Cash flow at time t',
          'r': 'Discount rate',
          't': 'Time period',
        },
        notes: 'NPV > 0: Accept project. Higher NPV = more value created.',
      },
      {
        id: 'irr',
        name: 'Internal Rate of Return (IRR)',
        formula: 'IRR = Rate where NPV = 0',
        notes: 'Compare to hurdle rate. IRR > Required Return: Accept',
      },
      {
        id: 'payback',
        name: 'Payback Period',
        formula: 'Payback = Years to recover initial investment',
        notes: 'Simple: Total Investment / Annual Cash Flow (if equal flows)',
      },
      {
        id: 'break-even',
        name: 'Break-Even Point',
        formula: 'Break-Even Units = Fixed Costs / (Price - Variable Cost per Unit)',
        notes: 'Sales level where Total Revenue = Total Costs',
      },
      {
        id: 'contribution-margin',
        name: 'Contribution Margin',
        formula: 'CM = Revenue - Variable Costs; CM Ratio = CM / Revenue',
        notes: 'Amount available to cover fixed costs and generate profit',
      },
      {
        id: 'expected-value',
        name: 'Expected Value',
        formula: 'EV = Σ (Probability × Outcome)',
        example: '(30% × $100) + (50% × $50) + (20% × $0) = $30 + $25 + $0 = $55',
        notes: 'Used in decision trees and risk analysis',
      },
      {
        id: 'variance',
        name: 'Variance Analysis',
        formula: 'Variance = Actual - Budget (or Standard)',
        notes: 'Favorable: Actual Revenue > Budget, or Actual Cost < Budget',
      },
    ],
  },
];

// =====================================================
// Quick Reference Summary
// =====================================================
export const CIA_QUICK_REFERENCE = {
  examFormat: {
    cia1: { questions: 125, duration: '2.5 hours', weight: 'Foundations 40%' },
    cia2: { questions: 100, duration: '2 hours', weight: 'Practice 50%' },
    cia3: { questions: 100, duration: '2 hours', weight: 'Business Knowledge 35%' },
    passingScore: '600 out of 750 (scaled)',
  },
  iiaStandards: {
    attribute: ['1000 Purpose', '1100 Independence', '1200 Proficiency', '1300 QAIP'],
    performance: ['2000 Managing IA', '2100 Nature of Work', '2200 Engagement Planning', '2300 Performing', '2400 Communicating', '2500 Monitoring', '2600 Residual Risk'],
  },
  riskCategories: ['Strategic', 'Operational', 'Financial', 'Compliance', 'Reputational'],
  samplingMethods: {
    statistical: ['Random', 'Systematic', 'Stratified', 'Cluster'],
    nonStatistical: ['Judgmental', 'Haphazard', 'Block'],
  },
  controlTypes: {
    byTiming: ['Preventive', 'Detective', 'Corrective'],
    byNature: ['Manual', 'Automated', 'IT-Dependent'],
  },
  engagementTypes: ['Assurance', 'Consulting'],
  ethicsPrinciples: ['Integrity', 'Objectivity', 'Confidentiality', 'Competency'],
  cosoComponents: ['Control Environment', 'Risk Assessment', 'Control Activities', 'Information & Communication', 'Monitoring'],
  benchmarks: {
    currentRatio: { healthy: '1.5-2.0' },
    quickRatio: { healthy: '>1.0' },
    debtEquity: { conservative: '<0.5', moderate: '0.5-1.0', aggressive: '>1.0' },
    interestCoverage: { healthy: '>3.0' },
    controlEffectiveness: { adequate: '>95%' },
  },
};

export default CIA_FORMULA_SHEET;

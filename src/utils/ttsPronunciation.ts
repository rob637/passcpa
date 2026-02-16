/**
 * TTS Pronunciation Guide
 * 
 * Master list of acronyms used across all VoraPrep courses (CPA, EA, CMA, CIA, CISA, CFP).
 * Each entry maps the written acronym to how it should be spoken by text-to-speech.
 * 
 * Categories:
 * - Spelled out: Letter-by-letter (e.g., "IRS" → "I.R.S.")
 * - Pronounced as word: Say it as a word (e.g., "GAAP" → "gap")
 * - Expanded: Replace with the full phrase (e.g., "OCI" → "other comprehensive income")
 * 
 * Periods between letters force TTS to spell them out.
 * Words without periods are spoken naturally as words.
 */

// Map of acronym → spoken pronunciation
// Uses word boundary matching, so "FASB" in "SFASB" won't match
export const ACRONYM_PRONUNCIATIONS: Record<string, string> = {
  // ═══════════════════════════════════════════════════════════════════
  // REGULATORY BODIES & ORGANIZATIONS
  // ═══════════════════════════════════════════════════════════════════
  'FASB':   'fazz-bee',        // Financial Accounting Standards Board
  'GASB':   'gaz-bee',         // Governmental Accounting Standards Board
  'PCAOB':  'P.C.A.O.B.',     // Public Company Accounting Oversight Board
  'AICPA':  'A.I.C.P.A.',     // American Institute of CPAs
  'ISACA':  'eye-SAH-kuh',    // (pronounced as word, not spelled)
  'IIA':    'I.I.A.',          // Institute of Internal Auditors
  'IRS':    'I.R.S.',          // Internal Revenue Service  
  'SEC':    'S.E.C.',          // Securities and Exchange Commission
  'DOL':    'D.O.L.',          // Department of Labor
  'FINRA':  'FIN-ruh',         // Financial Industry Regulatory Authority
  'NIST':   'nist',            // National Institute of Standards and Technology
  'IMA':    'I.M.A.',          // Institute of Management Accountants
  'ERISA':  'eh-RISS-uh',     // Employee Retirement Income Security Act
  'HIPAA':  'HIP-uh',         // Health Insurance Portability and Accountability Act

  // ═══════════════════════════════════════════════════════════════════
  // EXAM & CERTIFICATION NAMES
  // ═══════════════════════════════════════════════════════════════════
  'CPA':    'C.P.A.',          // Certified Public Accountant
  'CMA':    'C.M.A.',          // Certified Management Accountant
  'CIA':    'C.I.A.',          // Certified Internal Auditor
  'CISA':   'SEE-suh',        // Certified IS Auditor (pronounced as word)
  'CFP':    'C.F.P.',          // Certified Financial Planner
  'CFA':    'C.F.A.',          // Chartered Financial Analyst
  'CFE':    'C.F.E.',          // Certified Fraud Examiner
  'ACFE':   'A.C.F.E.',       // Association of Certified Fraud Examiners

  // ═══════════════════════════════════════════════════════════════════
  // ACCOUNTING STANDARDS & FRAMEWORKS
  // ═══════════════════════════════════════════════════════════════════
  'GAAP':   'gap',             // Generally Accepted Accounting Principles
  'IFRS':   'I.F.R.S.',       // International Financial Reporting Standards
  'ASC':    'A.S.C.',          // Accounting Standards Codification
  'ASU':    'A.S.U.',          // Accounting Standards Update
  'APB':    'A.P.B.',          // Accounting Principles Board
  'SFAS':   'S.F.A.S.',       // Statement of Financial Accounting Standards
  'SFAC':   'S.F.A.C.',       // Statement of Financial Accounting Concepts
  'GAAS':   'gas',             // Generally Accepted Auditing Standards
  'SSARS':  'S.S.A.R.S.',     // Statements on Standards for Accounting & Review
  'SSTS':   'S.S.T.S.',       // Statements on Standards for Tax Services
  'GAGAS':  'GAG-us',         // Generally Accepted Government Auditing Standards
  'COSO':   'KOH-so',         // Committee of Sponsoring Organizations
  'COBIT':  'KOH-bit',        // Control Objectives for IT

  // ═══════════════════════════════════════════════════════════════════
  // FINANCIAL REPORTING & ACCOUNTING TERMS
  // ═══════════════════════════════════════════════════════════════════
  'OCI':    'O.C.I.',          // Other Comprehensive Income
  'AOCI':   'A.O.C.I.',       // Accumulated OCI
  'EPS':    'E.P.S.',          // Earnings Per Share
  'EBIT':   'E-bit',          // Earnings Before Interest & Taxes
  'EBITDA': 'ee-BIT-dah',     // Earnings Before Interest, Taxes, Dep, Amort
  'APIC':   'A.P.I.C.',       // Additional Paid-in Capital
  'NCI':    'N.C.I.',          // Non-controlling Interest
  'VIE':    'V.I.E.',          // Variable Interest Entity
  'ROU':    'R.O.U.',          // Right-of-Use
  'ARO':    'A.R.O.',          // Asset Retirement Obligation
  'NRV':    'N.R.V.',          // Net Realizable Value
  'FMV':    'fair market value', // Fair Market Value (expanded for clarity)
  'COGS':   'cogs',            // Cost of Goods Sold (pronounced as word)
  'LIFO':   'LIFE-oh',        // Last In, First Out
  'FIFO':   'FY-foh',         // First In, First Out
  'CECL':   'SEE-sul',        // Current Expected Credit Losses
  'HTM':    'H.T.M.',          // Held-to-Maturity
  'AFS':    'A.F.S.',          // Available-for-Sale
  'DTA':    'D.T.A.',          // Deferred Tax Asset
  'DTL':    'D.T.L.',          // Deferred Tax Liability
  'NOL':    'N.O.L.',          // Net Operating Loss
  'PBO':    'P.B.O.',          // Projected Benefit Obligation
  'ABO':    'A.B.O.',          // Accumulated Benefit Obligation
  'OPEB':   'oh-PEB',         // Other Post-Employment Benefits
  'DRD':    'D.R.D.',          // Dividends Received Deduction
  'LCM':    'L.C.M.',          // Lower of Cost or Market
  'TDR':    'T.D.R.',          // Troubled Debt Restructuring
  'SSP':    'S.S.P.',          // Standalone Selling Price
  'ESOP':   'EE-sop',         // Employee Stock Ownership Plan
  'WIP':    'W.I.P.',          // Work in Process
  'NFP':    'N.F.P.',          // Not-for-Profit
  'FOB':    'F.O.B.',          // Free on Board
  'FV':     'F.V.',            // Fair Value
  'PV':     'P.V.',            // Present Value
  'AAA':    'triple A',        // Accumulated Adjustments Account
  'CTA':    'C.T.A.',          // Cumulative Translation Adjustment
  'UCC':    'U.C.C.',          // Uniform Commercial Code
  'UBTI':   'U.B.T.I.',       // Unrelated Business Taxable Income
  'SSAE':   'S.S.A.E.',       // Statement on Standards for Attestation Engagements
  'PMSI':   'P.M.S.I.',       // Purchase Money Security Interest
  'EOM':    'E.O.M.',          // Emphasis of Matter
  'AR':     'A.R.',            // Accounts Receivable / Audit Risk
  'GP':     'G.P.',            // General Partnership / Gross Profit
  'WC':     'W.C.',            // Written Communication / Working Capital
  'CM':     'C.M.',            // Contribution Margin
  'QSBS':   'Q.S.B.S.',       // Qualified Small Business Stock
  'CAFR':   'CAF-er',         // Comprehensive Annual Financial Report
  'SAS':    'S.A.S.',          // Statement on Auditing Standards
  'FASAB':  'FAZ-ab',         // Federal Accounting Standards Advisory Board
  'IR':     'I.R.',            // Inherent Risk
  'CR':     'C.R.',            // Control Risk
  'DR':     'D.R.',            // Detection Risk

  // ═══════════════════════════════════════════════════════════════════
  // MANAGEMENT ACCOUNTING (CMA)
  // ═══════════════════════════════════════════════════════════════════
  'NPV':    'N.P.V.',          // Net Present Value
  'IRR':    'I.R.R.',          // Internal Rate of Return
  'ROI':    'R.O.I.',          // Return on Investment
  'ROE':    'R.O.E.',          // Return on Equity
  'ROA':    'R.O.A.',          // Return on Assets
  'EVA':    'E.V.A.',          // Economic Value Added
  'WACC':   'wack',            // Weighted Average Cost of Capital
  'CAPM':   'CAP-em',         // Capital Asset Pricing Model
  'CVP':    'C.V.P.',          // Cost-Volume-Profit
  'ABC':    'A.B.C.',          // Activity-Based Costing
  'JIT':    'J.I.T.',          // Just-in-Time
  'TVM':    'T.V.M.',          // Time Value of Money
  'BSC':    'B.S.C.',          // Balanced Scorecard
  'TCO':    'T.C.O.',          // Total Cost of Ownership
  'DPO':    'D.P.O.',          // Days Payable Outstanding
  'DSO':    'D.S.O.',          // Days Sales Outstanding
  'BVPS':   'B.V.P.S.',       // Book Value Per Share
  'DDB':    'D.D.B.',          // Double Declining Balance
  'MACRS':  'MAK-ers',        // Modified Accelerated Cost Recovery System

  // ═══════════════════════════════════════════════════════════════════
  // TAX (CPA REG, EA)
  // ═══════════════════════════════════════════════════════════════════
  'AGI':    'A.G.I.',          // Adjusted Gross Income
  'MAGI':   'MAG-ee',         // Modified Adjusted Gross Income
  'AMT':    'A.M.T.',          // Alternative Minimum Tax
  'AMTI':   'A.M.T.I.',       // AMT Income
  'QBI':    'Q.B.I.',          // Qualified Business Income
  'SSTB':   'S.S.T.B.',       // Specified Service Trade or Business
  'UBIA':   'U.B.I.A.',       // Unadjusted Basis Immediately After Acquisition
  'TCJA':   'T.C.J.A.',       // Tax Cuts and Jobs Act
  'MFJ':    'M.F.J.',          // Married Filing Jointly
  'MFS':    'M.F.S.',          // Married Filing Separately
  'HOH':    'head of household', // Head of Household (expanded for clarity)
  'SALT':   'salt',            // State and Local Tax (pronounced as word)
  'NIIT':   'N.I.I.T.',       // Net Investment Income Tax
  'AOTC':   'A.O.T.C.',       // American Opportunity Tax Credit
  'CTC':    'C.T.C.',          // Child Tax Credit
  'ACTC':   'A.C.T.C.',       // Additional Child Tax Credit
  'EIC':    'E.I.C.',          // Earned Income Credit
  'EITC':   'E.I.T.C.',       // Earned Income Tax Credit
  'IRC':    'I.R.C.',          // Internal Revenue Code
  'LTCG':   'L.T.C.G.',       // Long-Term Capital Gain
  'STCG':   'S.T.C.G.',       // Short-Term Capital Gain
  'GILTI':  'GILL-tee',       // Global Intangible Low-Taxed Income
  'FDII':   'F.D.I.I.',       // Foreign-Derived Intangible Income
  'BEAT':   'beat',            // Base Erosion and Anti-Abuse Tax
  'CAMT':   'C.A.M.T.',       // Corporate Alternative Minimum Tax
  'PHC':    'P.H.C.',          // Personal Holding Company
  'CFC':    'C.F.C.',          // Controlled Foreign Corporation
  'LLC':    'L.L.C.',          // Limited Liability Company
  'RMD':    'R.M.D.',          // Required Minimum Distribution
  'IRA':    'I.R.A.',          // Individual Retirement Account
  'SEP':    'S.E.P.',          // Simplified Employee Pension
  'HSA':    'H.S.A.',          // Health Savings Account
  'ISO':    'I.S.O.',          // Incentive Stock Option
  'NUA':    'N.U.A.',          // Net Unrealized Appreciation
  'PTIN':   'P.T.I.N.',       // Preparer Tax Identification Number
  'ITIN':   'I.T.I.N.',       // Individual Tax ID Number
  'SSN':    'S.S.N.',          // Social Security Number
  'IRMAA':  'er-MAH',         // Income-Related Monthly Adjustment Amount
  'APTC':   'A.P.T.C.',       // Advance Premium Tax Credit
  'QCD':    'Q.C.D.',          // Qualified Charitable Distribution
  'QDRO':   'KWAH-droh',      // Qualified Domestic Relations Order
  'POA':    'P.O.A.',          // Power of Attorney
  'GST':    'G.S.T.',          // Generation-Skipping Transfer
  'GSTT':   'G.S.T.T.',       // Generation-Skipping Transfer Tax
  'QTIP':   'Q-tip',          // Qualified Terminable Interest Property
  'QDOT':   'Q-dot',          // Qualified Domestic Trust
  'DNI':    'D.N.I.',          // Distributable Net Income
  'GRAT':   'grat',           // Grantor Retained Annuity Trust
  'FLP':    'F.L.P.',          // Family Limited Partnership
  'DSUE':   'D.S.U.E.',       // Deceased Spousal Unused Exclusion
  'QOZ':    'Q.O.Z.',          // Qualified Opportunity Zone
  'REIT':   'reet',           // Real Estate Investment Trust
  'DAF':    'D.A.F.',          // Donor Advised Fund
  'CRT':    'C.R.T.',          // Charitable Remainder Trust
  'AFR':    'A.F.R.',          // Applicable Federal Rate
  'IRD':    'I.R.D.',          // Income in Respect of a Decedent

  // ═══════════════════════════════════════════════════════════════════
  // AUDIT (CPA AUD)
  // ═══════════════════════════════════════════════════════════════════
  'ICFR':   'I.C.F.R.',       // Internal Control over Financial Reporting
  'RMM':    'R.M.M.',          // Risk of Material Misstatement
  'SOC':    'sock',            // System and Organization Controls
  'SOX':    'sox',             // Sarbanes-Oxley Act
  'CAM':    'C.A.M.',          // Critical Audit Matter
  'RSI':    'R.S.I.',          // Required Supplementary Information
  'AUP':    'A.U.P.',          // Agreed-Upon Procedures
  'ITGC':   'I.T.G.C.',       // IT General Controls
  'ERM':    'E.R.M.',          // Enterprise Risk Management
  'GAS':    'G.A.S.',          // Government Auditing Standards

  // ═══════════════════════════════════════════════════════════════════
  // INFORMATION SYSTEMS (CISA, ISC)
  // ═══════════════════════════════════════════════════════════════════
  'SDLC':   'S.D.L.C.',       // Software Development Life Cycle
  'ITIL':   'EYE-til',        // (pronounced as word)
  'SLA':    'S.L.A.',          // Service Level Agreement
  'BCP':    'B.C.P.',          // Business Continuity Planning
  'RTO':    'R.T.O.',          // Recovery Time Objective
  'RPO':    'R.P.O.',          // Recovery Point Objective
  'CMDB':   'C.M.D.B.',       // Configuration Management Database
  'BIA':    'B.I.A.',          // Business Impact Analysis
  'DLP':    'D.L.P.',          // Data Loss Prevention
  'VPN':    'V.P.N.',          // Virtual Private Network
  'MFA':    'M.F.A.',          // Multi-Factor Authentication
  'IAM':    'I.A.M.',          // Identity and Access Management
  'IDS':    'I.D.S.',          // Intrusion Detection System
  'RBAC':   'R.B.A.C.',       // Role-Based Access Control
  'API':    'A.P.I.',          // Application Programming Interface
  'SQL':    'sequel',          // Structured Query Language (pronounced as word)
  'FTP':    'F.T.P.',          // File Transfer Protocol
  'TLS':    'T.L.S.',          // Transport Layer Security
  'SSL':    'S.S.L.',          // Secure Sockets Layer
  'AES':    'A.E.S.',          // Advanced Encryption Standard
  'RSA':    'R.S.A.',          // Rivest-Shamir-Adleman
  'SHA':    'shaw',            // Secure Hash Algorithm
  'SSO':    'S.S.O.',          // Single Sign-On
  'UAT':    'U.A.T.',          // User Acceptance Testing
  'QAIP':   'Q.A.I.P.',       // Quality Assurance and Improvement Program
  'IPPF':   'I.P.P.F.',       // International Professional Practices Framework
  'GIAS':   'GEE-us',         // Global Internal Audit Standards
  'RPA':    'R.P.A.',          // Robotic Process Automation
  'ESG':    'E.S.G.',          // Environmental, Social, Governance
  'GDPR':   'G.D.P.R.',       // General Data Protection Regulation
  'RAID':   'raid',            // Redundant Array of Independent Disks
  'BYOD':   'B.Y.O.D.',       // Bring Your Own Device
  'CSF':    'C.S.F.',          // Cybersecurity Framework
  'IPS':    'I.P.S.',          // Intrusion Prevention System
  'AWS':    'A.W.S.',          // Amazon Web Services
  'PIR':    'P.I.R.',          // Post-Implementation Review
  'PHI':    'P.H.I.',          // Protected Health Information
  'CAB':    'C.A.B.',          // Change Advisory Board
  'DSS':    'D.S.S.',          // Decision Support System

  // ═══════════════════════════════════════════════════════════════════
  // FINANCIAL PLANNING (CFP)
  // ═══════════════════════════════════════════════════════════════════
  'ETF':    'E.T.F.',          // Exchange-Traded Fund
  'ADR':    'A.D.R.',          // American Depositary Receipt
  'AUM':    'A.U.M.',          // Assets Under Management
  'APY':    'A.P.Y.',          // Annual Percentage Yield
  'APR':    'A.P.R.',          // Annual Percentage Rate
  'PMT':    'P.M.T.',          // Payment (TVM function)

  'PIA':    'P.I.A.',          // Primary Insurance Amount
  'CFO':    'C.F.O.',          // Chief Financial Officer
  'CEO':    'C.E.O.',          // Chief Executive Officer
  'AML':    'A.M.L.',          // Anti-Money Laundering
  'BSA':    'B.S.A.',          // Bank Secrecy Act
  'FICA':   'FY-kuh',         // Federal Insurance Contributions Act
  'SECURE': 'secure',         // Setting Every Community Up for Retirement Enhancement Act

  // ═══════════════════════════════════════════════════════════════════
  // CPA EXAM SECTION NAMES (say the letters)
  // ═══════════════════════════════════════════════════════════════════
  'FAR':    'F.A.R.',          // Financial Accounting & Reporting
  'AUD':    'audit',           // Auditing (say as "audit" since that's what it means)
  'REG':    'reg',             // Regulation (say as "reg")
  'BAR':    'B.A.R.',          // Business Analysis & Reporting
  'ISC':    'I.S.C.',          // Information Systems & Controls
  'TCP':    'T.C.P.',          // Tax Compliance & Planning
  'BEC':    'beck',            // Business Environment & Concepts (retired)
  'PREP':   'prep',            // Preparatory section

  // ═══════════════════════════════════════════════════════════════════
  // MISC COMMON
  // ═══════════════════════════════════════════════════════════════════
  'SMART':  'smart',           // Specific, Measurable, Achievable, Relevant, Time-bound
  'SIMPLE': 'simple',         // Savings Incentive Match Plan for Employees
  'ACRS':   'A.C.R.S.',       // Accelerated Cost Recovery System
  'ASAP':   'A.S.A.P.',       // As Soon As Possible
  'TBS':    'T.B.S.',          // Task-Based Simulations
  'MCQ':    'M.C.Q.',          // Multiple Choice Questions
  'SOD':    'S.O.D.',          // Segregation of Duties
};

/**
 * Apply acronym pronunciation rules to text before TTS.
 * Uses word-boundary matching to avoid partial replacements.
 */
export function applyAcronymPronunciation(text: string): string {
  let result = text;
  
  // Sort by length descending so longer acronyms match first (e.g., EBITDA before EBIT)
  const sorted = Object.entries(ACRONYM_PRONUNCIATIONS)
    .sort((a, b) => b[0].length - a[0].length);
  
  for (const [acronym, pronunciation] of sorted) {
    // Use word boundary regex to match whole words only
    const regex = new RegExp(`\\b${acronym}\\b`, 'g');
    result = result.replace(regex, pronunciation);
  }
  
  return result;
}

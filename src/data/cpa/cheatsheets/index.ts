/**
 * CPA Cheatsheets Index
 * 
 * Quick reference guides for all CPA exam sections.
 * Each cheatsheet provides essential concepts, formulas, and exam tips.
 */

export interface CPACheatsheetMetadata {
  id: string;
  section: string;
  sectionCode: string;
  title: string;
  description: string;
  filename: string;
  topics: string[];
  examWeight: string;
}

export const CPA_CHEATSHEETS: CPACheatsheetMetadata[] = [
  {
    id: 'cpa-cheatsheet-far',
    section: 'Financial Accounting & Reporting',
    sectionCode: 'FAR',
    title: 'FAR Cheatsheet',
    description: 'Financial accounting standards, governmental/NFP accounting, EPS, leases, revenue recognition',
    filename: 'far-cheatsheet.md',
    examWeight: '25% of Core',
    topics: [
      'GAAP Conceptual Framework',
      'Revenue Recognition (ASC 606)',
      'Lease Accounting (ASC 842)',
      'Financial Instruments',
      'Inventory & Long-Lived Assets',
      'Intangibles & Goodwill',
      'Stockholders Equity',
      'Earnings Per Share',
      'Governmental Accounting',
      'Not-for-Profit Accounting'
    ]
  },
  {
    id: 'cpa-cheatsheet-aud',
    section: 'Auditing & Attestation',
    sectionCode: 'AUD',
    title: 'AUD Cheatsheet',
    description: 'Audit risk model, evidence, internal controls, reports, ethics, independence',
    filename: 'aud-cheatsheet.md',
    examWeight: '25% of Core',
    topics: [
      'Audit Risk Model (AR = IR × CR × DR)',
      'Audit Evidence & Procedures',
      'Management Assertions',
      'Internal Control (COSO)',
      'Materiality & Sampling',
      'Audit Reports (Opinions)',
      'Ethics & Independence',
      'Related Party Transactions',
      'Subsequent Events',
      'SOC Reports'
    ]
  },
  {
    id: 'cpa-cheatsheet-reg',
    section: 'Regulation',
    sectionCode: 'REG',
    title: 'REG Cheatsheet',
    description: 'Individual taxation, business entities, basis rules, ethics, professional responsibilities',
    filename: 'reg-cheatsheet.md',
    examWeight: '25% of Core',
    topics: [
      'Filing Status & Dependents',
      'Gross Income Calculation',
      'Above/Below-the-Line Deductions',
      'Capital Gains & §1231',
      'Business Entity Taxation',
      'Basis Rules (Gift, Inheritance, Exchange)',
      '§179 & Bonus Depreciation',
      'Like-Kind Exchanges (§1031)',
      'Circular 230 Ethics',
      'Preparer & Taxpayer Penalties'
    ]
  },
  {
    id: 'cpa-cheatsheet-bar',
    section: 'Business Analysis & Reporting',
    sectionCode: 'BAR',
    title: 'BAR Cheatsheet',
    description: 'Data analytics, IT controls, financial analysis, business combinations, foreign currency',
    filename: 'bar-cheatsheet.md',
    examWeight: 'Discipline Section',
    topics: [
      'Data Analytics & ETL',
      'Descriptive Statistics',
      'Regression Analysis',
      'IT Controls (GITCs, Application)',
      'Cloud Computing Models',
      'Business Combinations',
      'Foreign Currency Translation',
      'Financial Ratio Analysis',
      'DuPont Analysis',
      'Variance Analysis'
    ]
  }
];

/**
 * Get cheatsheet by section code
 */
export function getCheatsheetBySection(sectionCode: string): CPACheatsheetMetadata | undefined {
  return CPA_CHEATSHEETS.find(cs => cs.sectionCode === sectionCode);
}

/**
 * Get all cheatsheets
 */
export function getAllCheatsheets(): CPACheatsheetMetadata[] {
  return CPA_CHEATSHEETS;
}

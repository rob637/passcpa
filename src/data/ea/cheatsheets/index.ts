/**
 * EA Cheatsheets Index
 * 
 * Quick reference guides for all three SEE exam parts.
 * Each cheatsheet provides essential concepts, formulas, and exam tips.
 */

export interface EACheatsheetMetadata {
  id: string;
  section: string;
  sectionCode: string;
  title: string;
  description: string;
  filename: string;
  topics: string[];
  examWeight: string;
}

export const EA_CHEATSHEETS: EACheatsheetMetadata[] = [
  {
    id: 'ea-cheatsheet-see1',
    section: 'SEE Part 1: Individuals',
    sectionCode: 'SEE1',
    title: 'SEE1 Cheatsheet',
    description: 'Individual taxation: filing status, dependents, income, deductions, credits, capital gains',
    filename: 'see1-cheatsheet.md',
    examWeight: '100 questions',
    topics: [
      'Filing Requirements & Status',
      'Dependents (CARES & SUPORT)',
      'Gross Income & Exclusions',
      'Above-the-Line Deductions',
      'Standard vs Itemized Deductions',
      'Capital Gains & Losses',
      'Retirement Accounts (IRA, Roth)',
      'Tax Credits (EITC, CTC, Education)',
      'Self-Employment Tax',
      'Estimated Tax Payments'
    ]
  },
  {
    id: 'ea-cheatsheet-see2',
    section: 'SEE Part 2: Businesses',
    sectionCode: 'SEE2',
    title: 'SEE2 Cheatsheet',
    description: 'Business taxation: partnerships, S-corps, C-corps, depreciation, 1031 exchanges',
    filename: 'see2-cheatsheet.md',
    examWeight: '100 questions',
    topics: [
      'Entity Classification (Check-the-Box)',
      'Sole Proprietorship (Schedule C)',
      'Partnership Taxation (Inside/Outside Basis)',
      'S Corporation Taxation',
      'C Corporation Taxation',
      'Corporate Formation (§351)',
      'Depreciation & §179',
      '§1231 & Recapture',
      'Like-Kind Exchanges (§1031)',
      'Employment Taxes'
    ]
  },
  {
    id: 'ea-cheatsheet-see3',
    section: 'SEE Part 3: Representation',
    sectionCode: 'SEE3',
    title: 'SEE3 Cheatsheet',
    description: 'Ethics, Circular 230, IRS procedures, penalties, collection, appeals',
    filename: 'see3-cheatsheet.md',
    examWeight: '100 questions',
    topics: [
      'Circular 230 Overview',
      'Duties & Restrictions',
      'Return Preparation Standards',
      'Written Advice Requirements',
      'Disciplinary Proceedings',
      'IRS Examination Process',
      'Taxpayer & Preparer Penalties',
      'Collection Process & Alternatives',
      'Taxpayer Rights',
      'Appeals Process & Tax Court'
    ]
  }
];

/**
 * Get cheatsheet by section code
 */
export function getEACheatsheetBySection(sectionCode: string): EACheatsheetMetadata | undefined {
  return EA_CHEATSHEETS.find(cs => cs.sectionCode === sectionCode);
}

/**
 * Get all EA cheatsheets
 */
export function getAllEACheatsheets(): EACheatsheetMetadata[] {
  return EA_CHEATSHEETS;
}

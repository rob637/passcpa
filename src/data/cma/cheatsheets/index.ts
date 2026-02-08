/**
 * CMA Cheatsheets Index
 * 
 * Quick reference guides for CMA exam parts.
 * Each cheatsheet covers essential concepts, formulas, and exam tips.
 */

export interface CMACheatsheetMetadata {
  id: string;
  part: string;
  partCode: string;
  title: string;
  description: string;
  filename: string;
  topics: string[];
  sections: string[];
}

export const CMA_CHEATSHEETS: CMACheatsheetMetadata[] = [
  {
    id: 'cma-cheatsheet-part1',
    part: 'Financial Planning, Performance, and Analytics',
    partCode: 'PART1',
    title: 'Part 1 Cheatsheet',
    description: 'Financial reporting, budgeting, performance management, cost management, internal controls',
    filename: 'part1-cheatsheet.md',
    sections: [
      'Section A: External Financial Reporting Decisions (15%)',
      'Section B: Planning, Budgeting, and Forecasting (20%)',
      'Section C: Performance Management (20%)',
      'Section D: Cost Management (15%)',
      'Section E: Internal Controls (15%)',
      'Section F: Technology and Analytics (15%)'
    ],
    topics: [
      'Revenue Recognition (ASC 606)',
      'Inventory & Depreciation Methods',
      'Lease Accounting (ASC 842)',
      'Master Budget Components',
      'Variance Analysis',
      'Responsibility Centers (ROI, RI, EVA)',
      'Cost Behavior & ABC',
      'COSO Framework',
      'Data Analytics'
    ]
  },
  {
    id: 'cma-cheatsheet-part2',
    part: 'Strategic Financial Management',
    partCode: 'PART2',
    title: 'Part 2 Cheatsheet',
    description: 'Financial statement analysis, corporate finance, decision analysis, risk management, ethics',
    filename: 'part2-cheatsheet.md',
    sections: [
      'Section A: Financial Statement Analysis (20%)',
      'Section B: Corporate Finance (20%)',
      'Section C: Decision Analysis (25%)',
      'Section D: Risk Management (10%)',
      'Section E: Investment Decisions (10%)',
      'Section F: Professional Ethics (15%)'
    ],
    topics: [
      'Ratio Analysis & DuPont',
      'WACC & Cost of Capital',
      'NPV, IRR, Payback',
      'Relevant Cost Analysis',
      'CVP & Break-even',
      'Transfer Pricing',
      'Enterprise Risk Management',
      'Working Capital Management',
      'IMA Ethics Standards'
    ]
  }
];

/**
 * Get cheatsheet by part code
 */
export function getCheatsheetByPart(partCode: string): CMACheatsheetMetadata | undefined {
  return CMA_CHEATSHEETS.find(cs => cs.partCode === partCode);
}

/**
 * Get all cheatsheets
 */
export function getAllCheatsheets(): CMACheatsheetMetadata[] {
  return CMA_CHEATSHEETS;
}

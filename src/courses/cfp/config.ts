import { Course, ExamSectionConfig } from '../../types/course';

/**
 * CFP Exam Structure
 * Based on the 8 Principal Knowledge Domains (2022+ Curriculum)
 */

export const CFP_SECTIONS: ExamSectionConfig[] = [
  {
    id: 'CFP-PCR',
    name: 'Professional Conduct and Regulation',
    shortName: 'Ethics',
    weight: '8%',
    questionCount: 0, // Placeholder
    timeAllowed: 0,
    questionTypes: ['mcq'],
    blueprintAreas: [
      { id: 'PCR-1', name: 'Code of Ethics and Standards of Conduct', weight: 'High', topics: [] },
      { id: 'PCR-2', name: 'Fiduciary Duty', weight: 'High', topics: [] },
    ]
  },
  {
    id: 'CFP-GEN',
    name: 'General Principles of Financial Planning',
    shortName: 'General',
    weight: '15%',
    questionCount: 0,
    timeAllowed: 0,
    questionTypes: ['mcq', 'case'],
    blueprintAreas: [
      { id: 'GEN-1', name: 'Financial Statements & Cash Flow', weight: 'High', topics: [] },
      { id: 'GEN-2', name: 'Education Planning', weight: 'Medium', topics: [] },
      { id: 'GEN-3', name: 'Debt Management', weight: 'Medium', topics: [] },
    ]
  },
  {
    id: 'CFP-RISK',
    name: 'Risk Management and Insurance Planning',
    shortName: 'Insurance',
    weight: '11%',
    questionCount: 0,
    timeAllowed: 0,
    questionTypes: ['mcq', 'case'],
    blueprintAreas: [
      { id: 'RISK-1', name: 'Life Insurance', weight: 'High', topics: [] },
      { id: 'RISK-2', name: 'Health & Disability', weight: 'High', topics: [] },
      { id: 'RISK-3', name: 'Property & Casualty', weight: 'Medium', topics: [] },
    ]
  },
  {
    id: 'CFP-INV',
    name: 'Investment Planning',
    shortName: 'Investments',
    weight: '17%',
    questionCount: 0,
    timeAllowed: 0,
    questionTypes: ['mcq', 'case'],
    blueprintAreas: [
      { id: 'INV-1', name: 'Asset Allocation', weight: 'High', topics: [] },
      { id: 'INV-2', name: 'Security Analysis', weight: 'High', topics: [] },
      { id: 'INV-3', name: 'Portfolio Management', weight: 'High', topics: [] },
      { id: 'INV-4', name: 'Tax Sensitivity', weight: 'Medium', topics: [] },
    ]
  },
  {
    id: 'CFP-TAX',
    name: 'Tax Planning',
    shortName: 'Tax',
    weight: '14%',
    questionCount: 0,
    timeAllowed: 0,
    questionTypes: ['mcq', 'case'],
    blueprintAreas: [
      { id: 'TAX-1', name: 'Income Tax Law', weight: 'High', topics: [] },
      { id: 'TAX-2', name: 'Tax Compliance', weight: 'Medium', topics: [] },
      { id: 'TAX-3', name: 'Charitable Giving', weight: 'Medium', topics: [] },
    ]
  },
  {
    id: 'CFP-RET',
    name: 'Retirement and Income Planning',
    shortName: 'Retirement',
    weight: '18%',
    questionCount: 0,
    timeAllowed: 0,
    questionTypes: ['mcq', 'case'],
    blueprintAreas: [
      { id: 'RET-1', name: 'Social Security', weight: 'High', topics: [] },
      { id: 'RET-2', name: 'Qualified Plans', weight: 'High', topics: [] },
      { id: 'RET-3', name: 'Distribution Strategies', weight: 'High', topics: [] },
    ]
  },
  {
    id: 'CFP-EST',
    name: 'Estate Planning',
    shortName: 'Estate',
    weight: '10%',
    questionCount: 0,
    timeAllowed: 0,
    questionTypes: ['mcq', 'case'],
    blueprintAreas: [
      { id: 'EST-1', name: 'Wills & Trusts', weight: 'High', topics: [] },
      { id: 'EST-2', name: 'Gift & Estate Tax', weight: 'High', topics: [] },
      { id: 'EST-3', name: 'Wealth Transfer', weight: 'Medium', topics: [] },
    ]
  },
  {
    id: 'CFP-PSY',
    name: 'Psychology of Financial Planning',
    shortName: 'Psychology',
    weight: '7%',
    questionCount: 0,
    timeAllowed: 0,
    questionTypes: ['mcq', 'case'],
    blueprintAreas: [
      { id: 'PSY-1', name: 'Client Communication. counseling', weight: 'High', topics: [] },
      { id: 'PSY-2', name: 'Behavioral Finance', weight: 'High', topics: [] },
    ]
  }
];

export const CFP_COURSE: Course = {
  id: 'cfp',
  name: 'Certified Financial Planner',
  shortName: 'CFP®',
  sections: CFP_SECTIONS,
  description: 'Comprehensive review for the CFP® Certification Examination.',
  features: {
    adaptiveLearning: true,
    simulationExams: true,
    flashcards: true,
    performanceTracking: true,
  }
};

/**
 * CFP Cheatsheets Index
 * 
 * Quick reference guides for all 7 CFP exam domains.
 * Each cheatsheet provides essential concepts, formulas, and exam tips.
 */

export interface CheatsheetMetadata {
  id: string;
  domain: string;
  title: string;
  description: string;
  filename: string;
  topics: string[];
}

export const CFP_CHEATSHEETS: CheatsheetMetadata[] = [
  {
    id: 'cfp-cheatsheet-gen',
    domain: 'GEN',
    title: 'General Principles of Financial Planning',
    description: 'Financial planning process, TVM, financial statements, education planning, behavioral finance',
    filename: 'cfp-general-cheatsheet.md',
    topics: [
      'Financial Planning Process (7 Steps)',
      'Time Value of Money',
      'Financial Statements & Ratios',
      'Education Planning (529, Coverdell)',
      'Economics Fundamentals',
      'Behavioral Finance'
    ]
  },
  {
    id: 'cfp-cheatsheet-ret',
    domain: 'RET',
    title: 'Retirement Savings & Income Planning',
    description: 'Qualified plans, IRAs, Social Security, Medicare, RMDs, withdrawal strategies',
    filename: 'cfp-retirement-cheatsheet.md',
    topics: [
      'Contribution Limits (401k, IRA, HSA)',
      'Qualified Plan Types',
      'Traditional vs Roth IRA',
      'Social Security Benefits',
      'Required Minimum Distributions',
      'Medicare Parts A-D',
      'SECURE 2.0 Changes'
    ]
  },
  {
    id: 'cfp-cheatsheet-tax',
    domain: 'TAX',
    title: 'Tax Planning',
    description: 'Filing status, brackets, deductions, credits, capital gains, AMT, QBI',
    filename: 'cfp-tax-cheatsheet.md',
    topics: [
      'Tax Brackets & Standard Deduction',
      'Above/Below-the-Line Deductions',
      'Tax Credits (AOTC, CTC, EITC)',
      'Capital Gains & NIIT',
      'Alternative Minimum Tax',
      'Self-Employment Tax',
      'QBI Deduction (Section 199A)'
    ]
  },
  {
    id: 'cfp-cheatsheet-inv',
    domain: 'INV',
    title: 'Investment Planning',
    description: 'Asset allocation, MPT, risk measures, valuation, portfolio metrics, vehicles',
    filename: 'cfp-investment-cheatsheet.md',
    topics: [
      'Risk Types & Measures',
      'Modern Portfolio Theory',
      'CAPM & Beta',
      'Sharpe, Treynor, Alpha',
      'Bond Duration & Convexity',
      'Stock Valuation (DDM, P/E)',
      'Options Basics',
      'Behavioral Biases'
    ]
  },
  {
    id: 'cfp-cheatsheet-risk',
    domain: 'RISK',
    title: 'Risk Management & Insurance Planning',
    description: 'Life/health/disability insurance, Medicare, property/casualty, annuities',
    filename: 'cfp-risk-cheatsheet.md',
    topics: [
      'Risk Management Techniques',
      'Life Insurance Types',
      'Disability Insurance',
      'Long-Term Care Insurance',
      'Health Insurance (PPO, HMO, HDHP, HSA)',
      'Medicare Parts & Enrollment',
      'Property & Casualty Insurance',
      'Annuity Types'
    ]
  },
  {
    id: 'cfp-cheatsheet-est',
    domain: 'EST',
    title: 'Estate Planning',
    description: 'Transfer taxes, trusts, property ownership, charitable planning, documents',
    filename: 'cfp-estate-cheatsheet.md',
    topics: [
      'Gift & Estate Tax Numbers',
      'Property Ownership Types',
      'Probate vs Non-Probate',
      'Trust Types (QTIP, ILIT, CRT, GRAT)',
      'Powers of Attorney',
      'Charitable Giving Strategies',
      'Valuation Discounts',
      'Basis Rules (Step-up vs Carryover)'
    ]
  },
  {
    id: 'cfp-cheatsheet-pro',
    domain: 'PRO',
    title: 'Professional Conduct & Regulation',
    description: 'CFP standards, fiduciary duty, regulations, ethics, practice standards',
    filename: 'cfp-professional-cheatsheet.md',
    topics: [
      'CFP Code of Ethics',
      'Fiduciary Duty',
      'Financial Planning Practice Standards',
      'CFP Certification Requirements',
      'Regulatory Framework (SEC, FINRA)',
      'Investment Advisers Act',
      'Reg BI vs Fiduciary',
      'Privacy & AML Requirements'
    ]
  },
  {
    id: 'cfp-cheatsheet-psy',
    domain: 'PSY',
    title: 'Psychology of Financial Planning',
    description: 'Behavioral finance, client communication, money scripts, life transitions',
    filename: 'cfp-psychology-cheatsheet.md',
    topics: [
      'Client Communication Skills',
      'Cognitive Biases (Anchoring, Confirmation, etc.)',
      'Emotional Biases (Loss Aversion, Herding, etc.)',
      'Money Scripts (Klontz)',
      'Risk Tolerance vs Capacity',
      'Stages of Change',
      'Crisis Counseling',
      'Cultural Considerations'
    ]
  }
];

export const CFP_CHEATSHEET_COUNT = CFP_CHEATSHEETS.length;

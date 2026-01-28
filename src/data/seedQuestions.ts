// Legacy seed questions data
// This file is intentionally kept separate for lazy loading
// Use the main question bank (src/data/questions) for the real question data

import type { ExamSection, Difficulty } from '../types';

export interface SeedQuestion {
  section: ExamSection;
  topicId: string;
  topic: string;
  difficulty: Difficulty | string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  reference: string;
  blueprintTopic?: string;
  hr1?: boolean;
  effectiveDate?: string;
}

// Real CPA exam-style questions for seeding (legacy - use main question bank instead)
export const SEED_QUESTIONS: SeedQuestion[] = [
  // ========== REG - Regulation ==========
  {
    section: 'REG',
    topicId: 'reg-individual-tax',
    topic: 'Individual Taxation',
    difficulty: 'medium',
    question:
      'For the current tax year, a taxpayer has wages of $85,000, interest income of $2,500, and a long-term capital loss of $15,000. What is the maximum amount of capital loss the taxpayer can deduct against ordinary income?',
    options: ['$3,000', '$15,000', '$12,000', '$0'],
    correctAnswer: 0,
    explanation:
      'Under IRC §1211(b), individual taxpayers may deduct up to $3,000 ($1,500 if married filing separately) of net capital losses against ordinary income in any tax year. The remaining $12,000 loss would be carried forward to future tax years under IRC §1212(b).',
    reference: 'IRC §1211(b), §1212(b)',
  },
  {
    section: 'REG',
    topicId: 'reg-individual-tax',
    topic: 'Individual Taxation',
    difficulty: 'hard',
    question:
      'A cash-basis taxpayer received a $10,000 check on December 30, Year 1, but did not deposit it until January 3, Year 2. In which year should the income be reported?',
    options: ['Year 1', 'Year 2', "Either year at taxpayer's election", 'Split between both years'],
    correctAnswer: 0,
    explanation:
      'Under the cash method and constructive receipt doctrine, income is taxable when actually or constructively received. A check received is constructively received when the taxpayer has unrestricted access to it, regardless of when deposited. The income is taxable in Year 1.',
    reference: 'IRC §451, Treasury Reg. §1.451-2',
  },
  {
    section: 'REG',
    topicId: 'reg-tax-ind-deductions',
    blueprintTopic: 'REG-III-007',
    topic: 'Individual Taxation',
    difficulty: 'medium',
    question: 'Under the 2026 tax law changes (H.R. 1), which of the following is true regarding the Standard Deduction?',
    options: [
      'It reverts to pre-2017 levels',
      'The enhanced amounts established by TCJA are made permanent',
      'It is eliminated for high-income earners',
      'It is reduced by 50%',
    ],
    correctAnswer: 1,
    explanation: 'The OBBBA (H.R. 1) makes permanent the enhanced standard deduction amounts that were originally set to expire at the end of 2025 under the TCJA.',
    reference: 'H.R. 1 (OBBBA) §201',
    hr1: true,
    effectiveDate: '2026-07-01',
  },
  {
    section: 'REG',
    topicId: 'reg-business-tax',
    topic: 'Business Taxation',
    difficulty: 'hard',
    question:
      'A C corporation has accumulated earnings and profits of $100,000 and current earnings and profits of $30,000. During the year, the corporation distributes $150,000 to its sole shareholder. How is the distribution treated?',
    options: [
      '$130,000 dividend, $20,000 return of capital',
      '$150,000 dividend',
      '$100,000 dividend, $50,000 return of capital',
      '$30,000 dividend, $120,000 return of capital',
    ],
    correctAnswer: 0,
    explanation:
      'Corporate distributions are treated first as dividends to the extent of current E&P ($30,000), then accumulated E&P ($100,000), for total dividend treatment of $130,000. The remaining $20,000 is treated as a return of capital.',
    reference: 'IRC §301, §316',
  },
  {
    section: 'REG',
    topicId: 'reg-business-tax',
    topic: 'Business Taxation',
    difficulty: 'medium',
    question: 'Which of the following is a requirement for a valid S corporation election?',
    options: [
      'No more than 75 shareholders',
      'May have both common and preferred stock',
      'All shareholders must be U.S. citizens or resident aliens',
      'Corporate shareholders are permitted',
    ],
    correctAnswer: 2,
    explanation:
      'S corporation requirements include: domestic corporation, no more than 100 shareholders, only individuals/estates/certain trusts as shareholders, only one class of stock, and no nonresident alien shareholders.',
    reference: 'IRC §1361(b)',
  },
  {
    section: 'REG',
    topicId: 'reg-business-law',
    topic: 'Business Law',
    difficulty: 'medium',
    question:
      "Under the UCC, a merchant's firm offer is irrevocable without consideration for a period not exceeding:",
    options: ['30 days', '60 days', 'Three months', 'Six months'],
    correctAnswer: 2,
    explanation:
      "Under UCC §2-205, a merchant's firm offer in a signed writing is irrevocable for the time stated or a reasonable time, but not exceeding three months, without consideration.",
    reference: 'UCC §2-205',
  },
  {
    section: 'REG',
    topicId: 'reg-ethics',
    topic: 'Ethics and Professional Responsibility',
    difficulty: 'medium',
    question: 'Under Circular 230, which act would constitute disreputable conduct by a CPA?',
    options: [
      'Charging a contingent fee for preparing an original tax return',
      'Representing conflicting interests with consent',
      'Advertising professional services',
      'Using a firm name with a retired partner',
    ],
    correctAnswer: 0,
    explanation:
      'Under Circular 230 §10.27, practitioners may not charge contingent fees for preparing original tax returns. Contingent fees are only permitted for IRS examination matters, refund claims, and judicial proceedings.',
    reference: '31 CFR Part 10 (Circular 230) §10.27',
  },
  // ========== FAR - Financial Accounting ==========
  {
    section: 'FAR',
    topicId: 'far-revenue',
    topic: 'Revenue Recognition',
    difficulty: 'hard',
    question: 'Under ASC 606, when should revenue be recognized?',
    options: [
      'When cash is received',
      'When the contract is signed',
      'When control of goods/services transfers to the customer',
      'When the performance obligation is identified',
    ],
    correctAnswer: 2,
    explanation:
      'Under ASC 606, revenue is recognized when (or as) the entity satisfies a performance obligation by transferring a promised good or service to a customer. Transfer occurs when the customer obtains control.',
    reference: 'ASC 606-10-25-23',
  },
  {
    section: 'FAR',
    topicId: 'far-leases',
    topic: 'Leases',
    difficulty: 'medium',
    question:
      'Under ASC 842, which of the following would NOT cause a lessee to classify a lease as a finance lease?',
    options: [
      'Transfer of ownership at lease end',
      'Bargain purchase option',
      'Lease term is major part of economic life',
      'Lessee has termination right with penalty',
    ],
    correctAnswer: 3,
    explanation:
      'Finance lease criteria include: ownership transfer, purchase option reasonably certain, lease term is major part of life, PV equals substantially all of FV, and specialized asset. A termination right is not a criterion.',
    reference: 'ASC 842-10-25-2',
  },
  {
    section: 'FAR',
    topicId: 'far-government',
    topic: 'Governmental Accounting',
    difficulty: 'hard',
    question:
      'Under modified accrual, property taxes are considered available if collected within how many days after year-end?',
    options: ['30 days', '45 days', '60 days', '90 days'],
    correctAnswer: 2,
    explanation:
      'Property tax revenues are recognized when levied, provided they are collected within 60 days after year-end (the availability period).',
    reference: 'GASB Statement No. 33',
  },
  // ========== AUD - Auditing ==========
  {
    section: 'AUD',
    topicId: 'aud-planning',
    topic: 'Audit Planning and Risk Assessment',
    difficulty: 'medium',
    question:
      'An auditor assesses inherent risk as high and control risk as low. What is the appropriate detection risk level?',
    options: ['High', 'Moderate', 'Low', 'Cannot be determined'],
    correctAnswer: 1,
    explanation:
      'Audit risk = IR × CR × DR. High IR × Low CR = Moderate RMM, allowing moderate detection risk.',
    reference: 'AU-C 315, AS 2110',
  },
  {
    section: 'AUD',
    topicId: 'aud-internal-control',
    topic: 'Internal Control',
    difficulty: 'easy',
    question: "Which COSO component addresses an organization's attitude toward internal control?",
    options: ['Control activities', 'Risk assessment', 'Control environment', 'Monitoring'],
    correctAnswer: 2,
    explanation:
      'The control environment sets the tone of the organization and is the foundation for all other components of internal control.',
    reference: 'COSO Framework',
  },
  {
    section: 'AUD',
    topicId: 'aud-evidence',
    topic: 'Audit Evidence',
    difficulty: 'medium',
    question:
      'An auditor confirms accounts receivable directly with customers. This provides evidence primarily about which assertion?',
    options: ['Completeness', 'Existence and rights', 'Valuation', 'Presentation'],
    correctAnswer: 1,
    explanation:
      'Positive confirmations provide strong evidence about existence (receivables are real) and rights (entity owns them).',
    reference: 'AU-C 505, AS 2310',
  },
  {
    section: 'AUD',
    topicId: 'aud-reports',
    topic: 'Audit Reports',
    difficulty: 'medium',
    question:
      'When substantial doubt exists about going concern but adequate disclosure is made, the auditor should:',
    options: [
      'Issue qualified opinion',
      'Issue adverse opinion',
      'Issue unmodified with emphasis-of-matter',
      'Issue disclaimer',
    ],
    correctAnswer: 2,
    explanation:
      'With substantial doubt about going concern but adequate disclosure, issue unmodified opinion with emphasis-of-matter paragraph.',
    reference: 'AU-C 570.22',
  },
  // ========== BAR - Business Analysis ==========
  {
    section: 'BAR',
    topicId: 'bar-financial-analysis',
    topic: 'Financial Statement Analysis',
    difficulty: 'medium',
    question:
      'Current assets $500,000 (including inventory $200,000), current liabilities $250,000. What is the quick ratio?',
    options: ['2.0', '1.2', '1.0', '0.8'],
    correctAnswer: 1,
    explanation:
      'Quick ratio = (Current assets - Inventory) / Current liabilities = $300,000 / $250,000 = 1.2.',
    reference: 'Financial Statement Analysis',
  },
  {
    section: 'BAR',
    topicId: 'bar-data-analytics',
    topic: 'Data Analytics',
    difficulty: 'easy',
    question: 'Which visualization best shows monthly revenue trends over three years?',
    options: ['Pie chart', 'Bar chart', 'Line chart', 'Scatter plot'],
    correctAnswer: 2,
    explanation: 'Line charts are ideal for showing trends over time.',
    reference: 'Data Visualization Best Practices',
  },
  {
    section: 'BAR',
    topicId: 'bar-economics',
    topic: 'Economic Concepts',
    difficulty: 'hard',
    question:
      'Project requires $500,000 investment, generates $150,000 annually for 5 years. Cost of capital 10%, PV annuity factor 3.7908. What is NPV?',
    options: ['$68,620', '$250,000', '$568,620', '$(68,620)'],
    correctAnswer: 0,
    explanation: 'PV inflows = $150,000 × 3.7908 = $568,620. NPV = $568,620 - $500,000 = $68,620.',
    reference: 'Capital Budgeting',
  },
  {
    section: 'BAR',
    topicId: 'bar-government',
    topic: 'State and Local Government',
    difficulty: 'medium',
    question: 'Which cash flow statement method is required for proprietary funds under GASB?',
    options: ['Indirect method', 'Either method', 'Direct method', 'Modified accrual method'],
    correctAnswer: 2,
    explanation:
      'GASB requires proprietary funds to present a Statement of Cash Flows using the DIRECT method.',
    reference: 'GASB Statement No. 34',
  },
];

// Helper to get seed questions count by section
export const getSeedQuestionStats = () => {
  const sections = ['REG', 'FAR', 'AUD', 'BAR'] as const;
  const counts = sections.reduce((acc, section) => {
    acc[section] = SEED_QUESTIONS.filter((q) => q.section === section).length;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    total: SEED_QUESTIONS.length,
    bySection: counts,
  };
};

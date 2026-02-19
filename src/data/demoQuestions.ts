/**
 * Demo Questions for the "Try 5 Questions Free" feature
 * 
 * Hand-picked questions from each course that demonstrate variety
 * and give users a taste of the real content before signup.
 * These are shown on the /demo-practice page without authentication.
 */

import type { CourseId } from '../types/course';

export interface DemoQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  section: string;
  topic: string;
}

// CPA Demo Questions - covering different sections
const CPA_DEMO_QUESTIONS: DemoQuestion[] = [
  {
    id: 'demo-cpa-far-1',
    question: 'Which financial statement reports a company\'s financial position at a specific point in time?',
    options: [
      'Income Statement',
      'Statement of Cash Flows',
      'Balance Sheet',
      'Statement of Retained Earnings'
    ],
    correctAnswer: 2,
    explanation: 'The Balance Sheet (also called Statement of Financial Position) reports assets, liabilities, and equity at a specific point in time. The Income Statement and Statement of Cash Flows cover a period of time, while the Statement of Retained Earnings reconciles beginning and ending retained earnings.',
    section: 'FAR',
    topic: 'Financial Statements'
  },
  {
    id: 'demo-cpa-aud-1',
    question: 'What is the primary purpose of obtaining an understanding of internal control in a financial statement audit?',
    options: [
      'To design substantive procedures',
      'To assess the risk of material misstatement',
      'To detect fraud',
      'To evaluate management integrity'
    ],
    correctAnswer: 1,
    explanation: 'Understanding internal control helps the auditor assess the risk of material misstatement at both the financial statement and assertion levels. This understanding then guides the nature, timing, and extent of further audit procedures.',
    section: 'AUD',
    topic: 'Internal Controls'
  },
  {
    id: 'demo-cpa-reg-1',
    question: 'A calendar-year taxpayer files their federal income tax return on April 10. When does the statute of limitations for IRS assessment typically expire?',
    options: [
      'April 10, three years later',
      'April 15, three years later',
      'April 10, six years later',
      'There is no statute of limitations'
    ],
    correctAnswer: 1,
    explanation: 'The general statute of limitations for assessment is 3 years from the later of the filing date or the due date. Since the return was filed on April 10 but wasn\'t "filed" until the due date of April 15, the statute runs from April 15.',
    section: 'REG',
    topic: 'Federal Taxation'
  },
  {
    id: 'demo-cpa-bar-1',
    question: 'When using regression analysis for forecasting, what does the R-squared (R²) value represent?',
    options: [
      'The slope of the regression line',
      'The correlation between two variables',
      'The proportion of variance explained by the model',
      'The standard error of the estimate'
    ],
    correctAnswer: 2,
    explanation: 'R-squared (coefficient of determination) represents the proportion of variance in the dependent variable that is explained by the independent variable(s). An R² of 0.85 means 85% of the variance is explained by the model.',
    section: 'BAR',
    topic: 'Data Analytics'
  },
  {
    id: 'demo-cpa-isc-1',
    question: 'Which control is MOST effective for preventing unauthorized access to a computer system?',
    options: [
      'Activity logging',
      'Encryption of data at rest',
      'Multi-factor authentication',
      'Regular security awareness training'
    ],
    correctAnswer: 2,
    explanation: 'Multi-factor authentication (MFA) combines multiple verification methods (something you know, have, or are) making unauthorized access significantly more difficult. While logging detects intrusions and encryption protects data, MFA prevents unauthorized access at the entry point.',
    section: 'ISC',
    topic: 'IT Controls'
  }
];

// EA Demo Questions - covering SEE Parts 1-3
const EA_DEMO_QUESTIONS: DemoQuestion[] = [
  {
    id: 'demo-ea-see1-1',
    question: 'A taxpayer received $3,000 in qualified dividends. How are these dividends taxed?',
    options: [
      'As ordinary income at the taxpayer\'s marginal rate',
      'At the preferential capital gains rates (0%, 15%, or 20%)',
      'They are not taxable',
      'At a flat 28% rate'
    ],
    correctAnswer: 1,
    explanation: 'Qualified dividends are taxed at preferential long-term capital gains rates (0%, 15%, or 20%) depending on the taxpayer\'s taxable income level. This is more favorable than ordinary income rates.',
    section: 'SEE1',
    topic: 'Individual Income'
  },
  {
    id: 'demo-ea-see1-2',
    question: 'The standard deduction for a single taxpayer in 2025 is:',
    options: [
      '$13,850',
      '$14,600',
      '$15,000',
      '$20,800'
    ],
    correctAnswer: 1,
    explanation: 'For tax year 2025, the standard deduction for single filers is $14,600. This amount is adjusted annually for inflation.',
    section: 'SEE1',
    topic: 'Deductions'
  },
  {
    id: 'demo-ea-see2-1',
    question: 'Which entity type is subject to double taxation on its income?',
    options: [
      'S Corporation',
      'Partnership',
      'C Corporation',
      'Sole Proprietorship'
    ],
    correctAnswer: 2,
    explanation: 'C Corporations are taxed at the corporate level on their income, and shareholders are taxed again when dividends are distributed. This "double taxation" is a key characteristic of C Corps. S Corps, partnerships, and sole proprietorships are pass-through entities.',
    section: 'SEE2',
    topic: 'Business Entities'
  },
  {
    id: 'demo-ea-see3-1',
    question: 'What is the maximum civil penalty per unauthorized disclosure of tax return information?',
    options: [
      '$250',
      '$500',
      '$1,000',
      '$5,000'
    ],
    correctAnswer: 2,
    explanation: 'IRC Section 6713 provides for a civil penalty of $1,000 per unauthorized disclosure of tax return information. This protects taxpayer confidentiality.',
    section: 'SEE3',
    topic: 'Practice & Procedures'
  },
  {
    id: 'demo-ea-see3-2',
    question: 'How long must an Enrolled Agent retain copies of tax returns prepared for clients?',
    options: [
      '1 year',
      '3 years',
      '5 years',
      '7 years'
    ],
    correctAnswer: 1,
    explanation: 'Under Treasury Circular 230, tax practitioners must retain copies of returns or a list of taxpayers for whom returns were prepared for 3 years after the close of the return period.',
    section: 'SEE3',
    topic: 'Circular 230'
  }
];

// CMA Demo Questions - covering Parts 1 and 2
const CMA_DEMO_QUESTIONS: DemoQuestion[] = [
  {
    id: 'demo-cma-1-1',
    question: 'Which budgeting approach requires managers to justify all expenses from zero each period?',
    options: [
      'Incremental budgeting',
      'Activity-based budgeting',
      'Zero-based budgeting',
      'Rolling budgeting'
    ],
    correctAnswer: 2,
    explanation: 'Zero-based budgeting (ZBB) requires all expenses to be justified from scratch each budgeting period. Unlike incremental budgeting which uses prior period amounts as a base, ZBB assumes a "zero base" and every function is analyzed for needs and costs.',
    section: 'CMA1',
    topic: 'Budgeting'
  },
  {
    id: 'demo-cma-1-2',
    question: 'What is the formula for contribution margin ratio?',
    options: [
      '(Sales - Variable Costs) / Fixed Costs',
      '(Sales - Fixed Costs) / Sales',
      '(Sales - Variable Costs) / Sales',
      'Variable Costs / Sales'
    ],
    correctAnswer: 2,
    explanation: 'Contribution Margin Ratio = (Sales - Variable Costs) / Sales, or Contribution Margin per unit / Selling Price per unit. This ratio shows what percentage of each sales dollar is available to cover fixed costs and profit.',
    section: 'CMA1',
    topic: 'Cost-Volume-Profit'
  },
  {
    id: 'demo-cma-1-3',
    question: 'Under absorption costing, which costs are included in inventory?',
    options: [
      'Only variable manufacturing costs',
      'All manufacturing costs (fixed and variable)',
      'All variable costs (manufacturing and non-manufacturing)',
      'Only direct materials and direct labor'
    ],
    correctAnswer: 1,
    explanation: 'Absorption costing (full costing) includes all manufacturing costs in inventory: direct materials, direct labor, variable manufacturing overhead, AND fixed manufacturing overhead. Variable costing excludes fixed MOH from inventory.',
    section: 'CMA1',
    topic: 'Product Costing'
  },
  {
    id: 'demo-cma-2-1',
    question: 'A project has an NPV of $50,000 and a profitability index of 1.25. What is the initial investment?',
    options: [
      '$40,000',
      '$62,500',
      '$200,000',
      '$250,000'
    ],
    correctAnswer: 2,
    explanation: 'Profitability Index = PV of future cash flows / Initial Investment. If PI = 1.25 and NPV = $50,000, then PV of flows = Initial Investment × 1.25, and NPV = PV - Initial = 0.25 × Initial = $50,000. So Initial Investment = $200,000.',
    section: 'CMA2',
    topic: 'Capital Budgeting'
  },
  {
    id: 'demo-cma-2-2',
    question: 'Which ethical standard requires management accountants to avoid conflicts of interest?',
    options: [
      'Competence',
      'Confidentiality',
      'Integrity',
      'Credibility'
    ],
    correctAnswer: 2,
    explanation: 'According to the IMA Statement of Ethical Professional Practice, Integrity requires management accountants to mitigate actual conflicts of interest, avoid apparent conflicts, and refrain from activities that would prejudice their ability to perform duties ethically.',
    section: 'CMA2',
    topic: 'Ethics'
  }
];

// CIA Demo Questions - covering Parts 1-3
const CIA_DEMO_QUESTIONS: DemoQuestion[] = [
  {
    id: 'demo-cia-1-1',
    question: 'According to the IIA Standards, what is the primary purpose of internal auditing?',
    options: [
      'To detect fraud and financial misstatements',
      'To add value and improve an organization\'s operations',
      'To ensure compliance with laws and regulations',
      'To evaluate the accuracy of financial records'
    ],
    correctAnswer: 1,
    explanation: 'The IIA defines internal auditing as an independent, objective assurance and consulting activity designed to add value and improve an organization\'s operations. While fraud detection and compliance are important, the primary purpose is value creation.',
    section: 'CIA1',
    topic: 'Internal Audit Foundations'
  },
  {
    id: 'demo-cia-1-2',
    question: 'Which attribute standard requires internal auditors to be impartial and avoid conflicts of interest?',
    options: [
      'Proficiency',
      'Objectivity',
      'Independence',
      'Due Professional Care'
    ],
    correctAnswer: 1,
    explanation: 'Standard 1120 - Individual Objectivity requires internal auditors to have an impartial, unbiased attitude and avoid conflicts of interest. Independence (1100) relates to organizational positioning, while objectivity is about individual mindset.',
    section: 'CIA1',
    topic: 'Standards'
  },
  {
    id: 'demo-cia-2-1',
    question: 'What is the MOST effective method for detecting fraud according to ACFE research?',
    options: [
      'External audit',
      'Management review',
      'Tips and hotlines',
      'Internal audit'
    ],
    correctAnswer: 2,
    explanation: 'According to the ACFE Report to the Nations, tips are the most common fraud detection method, accounting for approximately 43% of fraud discoveries. This highlights the importance of hotlines and whistleblower programs.',
    section: 'CIA2',
    topic: 'Fraud Risk'
  },
  {
    id: 'demo-cia-3-1',
    question: 'What does the quick ratio (acid-test ratio) measure?',
    options: [
      'Overall financial leverage',
      'Ability to pay short-term obligations without selling inventory',
      'Profit margin on sales',
      'Return on total assets'
    ],
    correctAnswer: 1,
    explanation: 'The quick ratio = (Current Assets - Inventory) / Current Liabilities. It measures liquidity excluding inventory, which may not be quickly convertible to cash. A ratio above 1.0 suggests the company can meet immediate obligations.',
    section: 'CIA3',
    topic: 'Financial Analysis'
  },
  {
    id: 'demo-cia-3-2',
    question: 'Which IT control ensures that data has not been altered during transmission?',
    options: [
      'Encryption',
      'Authentication',
      'Hash functions (integrity checks)',
      'Access controls'
    ],
    correctAnswer: 2,
    explanation: 'Hash functions create a unique fingerprint of data. If data is altered during transmission, the hash value will change, indicating a breach of integrity. Encryption protects confidentiality, authentication verifies identity.',
    section: 'CIA3',
    topic: 'IT Controls'
  }
];

// CFP Demo Questions - covering multiple domains
const CFP_DEMO_QUESTIONS: DemoQuestion[] = [
  {
    id: 'demo-cfp-1',
    question: 'A CFP® professional must always act in the client\'s best interest. This is known as the:',
    options: [
      'Prudent investor standard',
      'Fiduciary duty',
      'Duty of care',
      'Suitability requirement'
    ],
    correctAnswer: 1,
    explanation: 'CFP® professionals have a fiduciary duty to act in the client\'s best interest at all times when providing financial advice. This is more stringent than a suitability standard and is fundamental to the CFP® certification.',
    section: 'GEN',
    topic: 'Professional Conduct'
  },
  {
    id: 'demo-cfp-2',
    question: 'Under the Rule of 72, how long will it take to double an investment earning 8% annually?',
    options: [
      '7 years',
      '8 years',
      '9 years',
      '10 years'
    ],
    correctAnswer: 2,
    explanation: 'The Rule of 72 states: Years to double = 72 / Interest Rate. At 8%, it takes 72/8 = 9 years to double your money. This is a quick mental math tool for estimating compound growth.',
    section: 'INV',
    topic: 'Time Value of Money'
  },
  {
    id: 'demo-cfp-3',
    question: 'What is the primary advantage of a Roth IRA over a Traditional IRA?',
    options: [
      'Higher contribution limits',
      'Tax-deductible contributions',
      'Tax-free qualified withdrawals',
      'No required minimum distributions until age 73'
    ],
    correctAnswer: 2,
    explanation: 'Roth IRAs offer tax-free qualified withdrawals—both contributions and earnings come out tax-free after age 59½. Traditional IRAs offer tax-deductible contributions but withdrawals are taxed.',
    section: 'RET',
    topic: 'Retirement Accounts'
  },
  {
    id: 'demo-cfp-4',
    question: 'Which document allows someone to make healthcare decisions on your behalf if you are incapacitated?',
    options: [
      'Will',
      'Living trust',
      'Healthcare power of attorney',
      'Pour-over will'
    ],
    correctAnswer: 2,
    explanation: 'A Healthcare Power of Attorney (or Healthcare Proxy) designates someone to make medical decisions if you cannot. A Will handles asset distribution after death, and trusts manage assets during life or after death.',
    section: 'EST',
    topic: 'Estate Planning'
  },
  {
    id: 'demo-cfp-5',
    question: 'The beta of a stock measures:',
    options: [
      'Total risk of the investment',
      'Systematic risk relative to the market',
      'Unsystematic risk',
      'Historical standard deviation'
    ],
    correctAnswer: 1,
    explanation: 'Beta measures systematic (market) risk—how much a stock\'s returns move relative to the overall market. A beta of 1.5 means the stock is 50% more volatile than the market. Standard deviation measures total risk.',
    section: 'INV',
    topic: 'Risk Management'
  }
];

// CISA Demo Questions - covering all 5 domains
const CISA_DEMO_QUESTIONS: DemoQuestion[] = [
  {
    id: 'demo-cisa-1-1',
    question: 'What is the PRIMARY purpose of an IT audit charter?',
    options: [
      'To define the technical scope of the audit',
      'To establish the authority and responsibility of the IT audit function',
      'To list the specific controls to be tested',
      'To document audit findings and recommendations'
    ],
    correctAnswer: 1,
    explanation: 'The IT audit charter establishes the purpose, authority, and responsibility of the IT audit function within the organization. It provides the foundation for the audit function and is approved by senior management or the board.',
    section: 'CISA1',
    topic: 'IT Audit Process'
  },
  {
    id: 'demo-cisa-2-1',
    question: 'Which framework is MOST commonly used for IT governance?',
    options: [
      'ISO 27001',
      'NIST Cybersecurity Framework',
      'COBIT',
      'ITIL'
    ],
    correctAnswer: 2,
    explanation: 'COBIT (Control Objectives for Information and Related Technologies) is the most comprehensive framework for IT governance, covering governance and management of enterprise IT. ITIL focuses on service management, ISO 27001 on security, and NIST CSF on cybersecurity.',
    section: 'CISA2',
    topic: 'IT Governance'
  },
  {
    id: 'demo-cisa-3-1',
    question: 'During software development, when should security requirements be defined?',
    options: [
      'During system testing',
      'During implementation',
      'During the requirements phase',
      'After deployment in production'
    ],
    correctAnswer: 2,
    explanation: 'Security requirements should be defined during the requirements phase of the SDLC ("security by design"). This is more cost-effective than addressing security later—the cost to fix issues increases exponentially as development progresses.',
    section: 'CISA3',
    topic: 'Systems Development'
  },
  {
    id: 'demo-cisa-4-1',
    question: 'What is the PRIMARY objective of business continuity planning (BCP)?',
    options: [
      'To prevent all disasters from occurring',
      'To maintain critical business functions during and after a disaster',
      'To eliminate the need for disaster recovery',
      'To document insurance requirements'
    ],
    correctAnswer: 1,
    explanation: 'BCP focuses on maintaining critical business operations during and after a disruption. It encompasses all aspects of continuing business operations, while disaster recovery (DR) specifically addresses IT systems recovery.',
    section: 'CISA4',
    topic: 'Business Continuity'
  },
  {
    id: 'demo-cisa-5-1',
    question: 'Which control type is multi-factor authentication (MFA)?',
    options: [
      'Detective control',
      'Corrective control',
      'Preventive control',
      'Compensating control'
    ],
    correctAnswer: 2,
    explanation: 'MFA is a preventive control—it prevents unauthorized access by requiring multiple forms of verification before granting access. Detective controls identify issues after they occur, and corrective controls remedy identified issues.',
    section: 'CISA5',
    topic: 'Security Controls'
  }
];

// Export all demo questions by course
export const DEMO_QUESTIONS: Record<CourseId, DemoQuestion[]> = {
  cpa: CPA_DEMO_QUESTIONS,
  ea: EA_DEMO_QUESTIONS,
  cma: CMA_DEMO_QUESTIONS,
  cia: CIA_DEMO_QUESTIONS,
  cfp: CFP_DEMO_QUESTIONS,
  cisa: CISA_DEMO_QUESTIONS,
};

// Get demo questions for a specific course
export const getDemoQuestions = (courseId: CourseId): DemoQuestion[] => {
  return DEMO_QUESTIONS[courseId] || DEMO_QUESTIONS.cpa;
};

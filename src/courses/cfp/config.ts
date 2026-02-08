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
    questionCount: 14, // ~8% of 170 questions
    timeAllowed: 24, // ~8% of 300 minutes
    questionTypes: ['mcq'],
    blueprintAreas: [
      { 
        id: 'PCR-1', 
        name: 'Code of Ethics and Standards of Conduct', 
        weight: 'High', 
        topics: [
          'CFP Board Code of Ethics',
          'Standards of Conduct (Duties)',
          'Duty of Loyalty',
          'Duty of Care',
          'Duty to Follow Client Instructions',
          'Disciplinary rules and procedures',
          'Practice standards',
        ] 
      },
      { 
        id: 'PCR-2', 
        name: 'Fiduciary Duty', 
        weight: 'High', 
        topics: [
          'Fiduciary duty at all times',
          'Material conflicts of interest',
          'Compensation disclosure',
          'Written client agreement requirements',
          'Suitability vs. fiduciary standards',
        ] 
      },
    ]
  },
  {
    id: 'CFP-GEN',
    name: 'General Principles of Financial Planning',
    shortName: 'General',
    weight: '15%',
    questionCount: 26, // ~15% of 170 questions
    timeAllowed: 45,
    questionTypes: ['mcq', 'case'],
    blueprintAreas: [
      { 
        id: 'GEN-1', 
        name: 'Financial Statements & Cash Flow', 
        weight: 'High', 
        topics: [
          'Personal financial statements',
          'Balance sheet analysis',
          'Cash flow statement',
          'Budget development',
          'Emergency fund planning',
          'Financial ratios (liquidity, debt, savings)',
        ] 
      },
      { 
        id: 'GEN-2', 
        name: 'Education Planning', 
        weight: 'Medium', 
        topics: [
          '529 plans (qualified tuition programs)',
          'Coverdell Education Savings Accounts',
          'UGMA/UTMA accounts',
          'Education tax credits (AOTC, LLC)',
          'Student loan strategies',
          'Financial aid considerations (FAFSA/EFC)',
        ] 
      },
      { 
        id: 'GEN-3', 
        name: 'Debt Management', 
        weight: 'Medium', 
        topics: [
          'Consumer debt strategies',
          'Mortgage analysis (15 vs 30 year, ARM vs fixed)',
          'Debt consolidation',
          'Credit score optimization',
          'Bankruptcy considerations',
        ] 
      },
    ]
  },
  {
    id: 'CFP-RISK',
    name: 'Risk Management and Insurance Planning',
    shortName: 'Insurance',
    weight: '11%',
    questionCount: 19,
    timeAllowed: 33,
    questionTypes: ['mcq', 'case'],
    blueprintAreas: [
      { 
        id: 'RISK-1', 
        name: 'Life Insurance', 
        weight: 'High', 
        topics: [
          'Term vs. permanent life insurance',
          'Whole life, universal life, variable life',
          'Needs analysis methods',
          'Policy provisions and riders',
          'Life settlement and viatical options',
          'Group life insurance',
        ] 
      },
      { 
        id: 'RISK-2', 
        name: 'Health & Disability', 
        weight: 'High', 
        topics: [
          'Health insurance (individual and group)',
          'HSAs, FSAs, and HRAs',
          'Medicare Parts A, B, C, D',
          'Medigap and Medicare Advantage',
          'Long-term care insurance',
          'Disability income insurance (own-occupation, any-occupation)',
        ] 
      },
      { 
        id: 'RISK-3', 
        name: 'Property & Casualty', 
        weight: 'Medium', 
        topics: [
          'Homeowners insurance (HO-3, HO-5, etc.)',
          'Auto insurance coverage',
          'Umbrella/excess liability policies',
          'Business liability insurance',
          'Risk management techniques',
        ] 
      },
    ]
  },
  {
    id: 'CFP-INV',
    name: 'Investment Planning',
    shortName: 'Investments',
    weight: '17%',
    questionCount: 29,
    timeAllowed: 51,
    questionTypes: ['mcq', 'case'],
    blueprintAreas: [
      { 
        id: 'INV-1', 
        name: 'Asset Allocation', 
        weight: 'High', 
        topics: [
          'Modern Portfolio Theory',
          'Strategic vs. tactical allocation',
          'Efficient frontier',
          'Risk tolerance assessment',
          'Rebalancing strategies',
          'Diversification principles',
        ] 
      },
      { 
        id: 'INV-2', 
        name: 'Security Analysis', 
        weight: 'High', 
        topics: [
          'Equity valuation (P/E, dividend discount)',
          'Bond pricing and yield calculations',
          'Options strategies (calls, puts, covered calls)',
          'Mutual funds and ETFs',
          'Alternative investments (REITs, commodities)',
          'Technical vs. fundamental analysis',
        ] 
      },
      { 
        id: 'INV-3', 
        name: 'Portfolio Management', 
        weight: 'High', 
        topics: [
          'Performance measurement (HPR, TWR, IRR)',
          'Risk measures (standard deviation, beta, Sharpe ratio)',
          'Active vs. passive management',
          'Dollar-cost averaging',
          'Tax-loss harvesting',
          'Investment policy statements',
        ] 
      },
      { 
        id: 'INV-4', 
        name: 'Tax Sensitivity', 
        weight: 'Medium', 
        topics: [
          'Asset location strategies',
          'Tax-efficient fund placement',
          'Municipal bonds vs. taxable bonds',
          'Capital gains management',
          'Wash sale rules',
        ] 
      },
    ]
  },
  {
    id: 'CFP-TAX',
    name: 'Tax Planning',
    shortName: 'Tax',
    weight: '14%',
    questionCount: 24,
    timeAllowed: 42,
    questionTypes: ['mcq', 'case'],
    blueprintAreas: [
      { 
        id: 'TAX-1', 
        name: 'Income Tax Law', 
        weight: 'High', 
        topics: [
          'Filing status determination',
          'Gross income inclusions and exclusions',
          'Above-the-line deductions',
          'Itemized vs. standard deduction',
          'Tax credits (Child Tax Credit, EITC)',
          'AMT calculations',
          'Capital gains taxation (short-term vs. long-term)',
        ] 
      },
      { 
        id: 'TAX-2', 
        name: 'Tax Compliance', 
        weight: 'Medium', 
        topics: [
          'Estimated tax payments',
          'Withholding requirements',
          'Tax penalties and interest',
          'Statute of limitations',
          'IRS audit procedures',
        ] 
      },
      { 
        id: 'TAX-3', 
        name: 'Charitable Giving', 
        weight: 'Medium', 
        topics: [
          'Charitable contribution deductions',
          'Qualified charitable distributions (QCDs)',
          'Donor-advised funds',
          'Charitable remainder trusts (CRT)',
          'Charitable lead trusts (CLT)',
          'Private foundations',
        ] 
      },
    ]
  },
  {
    id: 'CFP-RET',
    name: 'Retirement and Income Planning',
    shortName: 'Retirement',
    weight: '18%',
    questionCount: 31,
    timeAllowed: 54,
    questionTypes: ['mcq', 'case'],
    blueprintAreas: [
      { 
        id: 'RET-1', 
        name: 'Social Security', 
        weight: 'High', 
        topics: [
          'Eligibility and benefit calculation',
          'Claiming strategies (early, FRA, delayed to 70)',
          'Spousal and survivor benefits',
          'Earnings test and taxation of benefits',
          'Windfall Elimination Provision (WEP)',
          'Government Pension Offset (GPO)',
        ] 
      },
      { 
        id: 'RET-2', 
        name: 'Qualified Plans', 
        weight: 'High', 
        topics: [
          '401(k), 403(b), 457 plans',
          'Traditional and Roth IRAs',
          'SEP-IRA and SIMPLE IRA',
          'Defined benefit pension plans',
          'Contribution limits and catch-up provisions',
          'Vesting schedules',
          'Required Minimum Distributions (RMDs)',
        ] 
      },
      { 
        id: 'RET-3', 
        name: 'Distribution Strategies', 
        weight: 'High', 
        topics: [
          'Retirement income needs analysis',
          'Withdrawal sequencing (which accounts first)',
          'Roth conversion strategies',
          '72(t) substantially equal periodic payments',
          'Net unrealized appreciation (NUA)',
          'Retirement income sustainability (4% rule, guardrails)',
        ] 
      },
    ]
  },
  {
    id: 'CFP-EST',
    name: 'Estate Planning',
    shortName: 'Estate',
    weight: '10%',
    questionCount: 17,
    timeAllowed: 30,
    questionTypes: ['mcq', 'case'],
    blueprintAreas: [
      { 
        id: 'EST-1', 
        name: 'Wills & Trusts', 
        weight: 'High', 
        topics: [
          'Types of wills (simple, pour-over, holographic)',
          'Revocable living trusts',
          'Irrevocable trusts (ILIT, GRAT, QPRT)',
          'Powers of attorney (financial, healthcare)',
          'Advance healthcare directives',
          'Probate process and avoidance',
        ] 
      },
      { 
        id: 'EST-2', 
        name: 'Gift & Estate Tax', 
        weight: 'High', 
        topics: [
          'Annual gift tax exclusion',
          'Lifetime gift tax exemption',
          'Estate tax calculation and exemption',
          'Portability of exemption between spouses',
          'Generation-skipping transfer tax (GSTT)',
          'Valuation discounts',
        ] 
      },
      { 
        id: 'EST-3', 
        name: 'Wealth Transfer', 
        weight: 'Medium', 
        topics: [
          'Family limited partnerships (FLPs)',
          'Installment sales to grantor trusts',
          'Qualified personal residence trusts (QPRTs)',
          'Grantor retained annuity trusts (GRATs)',
          'Dynasty trusts',
          'Special needs planning',
        ] 
      },
    ]
  },
  {
    id: 'CFP-PSY',
    name: 'Psychology of Financial Planning',
    shortName: 'Psychology',
    weight: '7%',
    questionCount: 12,
    timeAllowed: 21,
    questionTypes: ['mcq', 'case'],
    blueprintAreas: [
      { 
        id: 'PSY-1', 
        name: 'Client Communication & Counseling', 
        weight: 'High', 
        topics: [
          'Active listening techniques',
          'Client interview and data gathering',
          'Money scripts and financial attitudes',
          'Crisis counseling (divorce, death, job loss)',
          'Motivational interviewing',
          'Building trust and rapport',
        ] 
      },
      { 
        id: 'PSY-2', 
        name: 'Behavioral Finance', 
        weight: 'High', 
        topics: [
          'Cognitive biases (anchoring, confirmation, recency)',
          'Loss aversion and prospect theory',
          'Mental accounting',
          'Overconfidence and hindsight bias',
          'Framing effects',
          'Heuristics in decision-making',
        ] 
      },
    ]
  }
];

export const CFP_COURSE: Course = {
  id: 'cfp',
  name: 'Certified Financial Planner',
  shortName: 'CFP®',
  sections: CFP_SECTIONS,
  description: 'Comprehensive review for the CFP® Certification Examination.',
  passingScore: 0, // Pass/Fail only - CFP Board uses a criterion-referenced passing standard
  totalTime: 300, // 5 hours (300 minutes) for 170 questions
  
  pricing: {
    monthly: 39,
    annual: 349,
    lifetime: 599,
  },
  
  metadata: {
    examProvider: 'Pearson VUE (CFP Board)',
    websiteUrl: 'https://www.cfp.net/get-certified/certification-process/cfp-exam',
    averageStudyHours: 250,
    difficultyRating: 4,
    careerPaths: ['Financial Planner', 'Wealth Manager', 'Investment Advisor', 'Retirement Specialist'],
  },
  
  features: {
    hasTBS: false,
    hasWrittenCommunication: false,
    hasEssay: false,
    hasDataInsights: false,
    hasCaseStudies: true, // CFP has case vignettes (MCQ format)
    adaptiveLearning: true,
    simulationExams: true,
    flashcards: true,
    performanceTracking: true,
  },
  
  examOverview: {
    title: 'Why Become a CFP Professional?',
    description: 'The CERTIFIED FINANCIAL PLANNER™ certification is the standard of excellence in financial planning. CFP professionals meet rigorous education, examination, experience, and ethics requirements to help clients reach their financial goals.',
    benefits: [
      'Most recognized financial planning credential',
      'Demonstrates competency and commitment to ethics',
      'Fiduciary duty builds client trust',
      'Higher earning potential (CFPs earn 26% more)',
      'Growing demand as Baby Boomers retire',
    ],
    careerOpportunities: [
      'Financial Planner / Advisor',
      'Wealth Manager',
      'Investment Advisor',
      'Retirement Planning Specialist',
      'Estate Planning Specialist',
      'Tax Planning Advisor',
      'Insurance Planning Specialist',
    ],
    averageSalary: '$70,000 - $200,000+ (experienced planners with AUM earn significantly more)',
    examFormat: '1 exam (170 questions), 6 hours (two 3-hour sessions), MCQ including case studies',
  },
  
  examStrategy: {
    title: 'CFP Exam Success Strategies',
    keyStrategies: [
      { title: 'Master the 8 Principal Knowledge Topics', description: 'Understand how all topics interrelate - the exam tests integrated planning, not isolated knowledge.' },
      { title: 'Case Studies Are Key', description: '40-50% of the exam is case-based. Practice reading case facts quickly and identifying relevant information.' },
      { title: 'Think Holistically', description: 'CFP exams test comprehensive planning. Consider tax implications, risk tolerance, and client goals together.' },
      { title: 'Know the Code of Ethics', description: 'Ethics questions appear throughout. CFP Board\'s Code of Ethics and Standards of Conduct is heavily tested.' },
    ],
    studyTips: [
      'Take a CFP Board-Registered Education Program first (required)',
      'Practice with case-based questions extensively',
      'Create a study schedule covering all 8 Principal Knowledge Topics',
      'Focus on tax planning - it impacts almost every planning area',
      'Review the CFP Board\'s exam content outline',
    ],
    commonMistakes: [
      'Underestimating the breadth of topics covered',
      'Not practicing case studies with time constraints',
      'Ignoring psychology of financial planning topics',
      'Memorizing without understanding integration between topics',
      'Poor time management across the 6-hour exam',
    ],
    timeManagement: 'Plan 250-400 study hours. Schedule exam 3-6 months after completing education requirement.',
  },
};

/**
 * CPA Course Configuration
 * 
 * Complete definition of the CPA Exam prep course including all sections,
 * blueprint areas, pricing, and metadata.
 * 
 * BLUEPRINT COVERAGE:
 * - Content covers BOTH 2025 and 2026 blueprints
 * - Through June 30, 2026: OLD Blueprint in effect
 * - July 1, 2026 onward: NEW Blueprint in effect
 * - No content update needed - already prepared for both versions
 */

import { Course } from '../../types/course';

export const CPA_COURSE: Course = {
  id: 'cpa',
  name: 'CPA Exam Review',
  shortName: 'CPA',
  description: 'Comprehensive preparation for the Uniform CPA Examination',
  passingScore: 75,
  totalTime: 240, // 4 hours per section
  hasTBS: true, // Enabled for CPA
  
  sections: [
    {
      id: 'FAR',
      name: 'Financial Accounting and Reporting',
      shortName: 'FAR',
      weight: '100%',
      questionCount: 66,
      timeAllowed: 240,
      questionTypes: ['mcq', 'tbs'],
      blueprintAreas: [
        { 
          id: 'FAR-I', 
          name: 'Conceptual Framework, Standard-Setting, and Financial Reporting', 
          weight: '5-15%', 
          topics: [
            'FASB Conceptual Framework',
            'Standard-setting process',
            'GAAP hierarchy',
            'Financial statement presentation',
            'Fair value measurements (ASC 820)',
          ]
        },
        { 
          id: 'FAR-II', 
          name: 'Select Financial Statement Accounts', 
          weight: '30-40%', 
          topics: [
            'Cash and cash equivalents',
            'Receivables and CECL (ASC 326)',
            'Inventory',
            'Property, plant, and equipment',
            'Investments',
            'Intangible assets and goodwill',
            'Current and long-term liabilities',
            'Stockholders equity',
          ]
        },
        { 
          id: 'FAR-III', 
          name: 'Select Transactions', 
          weight: '25-35%', 
          topics: [
            'Revenue recognition (ASC 606)',
            'Leases (ASC 842)',
            'Income taxes (ASC 740)',
            'Pensions and post-employment benefits',
            'Contingencies and commitments',
            'Earnings per share',
            'Statement of cash flows',
            'Accounting changes and error corrections',
            'Business combinations (ASC 805)',
          ]
        },
        { 
          id: 'FAR-IV', 
          name: 'State and Local Governments', 
          weight: '10-20%', 
          topics: [
            'Government-wide financial statements',
            'Fund financial statements',
            'Measurement focus and basis of accounting',
            'Budgetary accounting',
            'GASB standards',
          ]
        },
        { 
          id: 'FAR-V', 
          name: 'Not-for-Profit Entities', 
          weight: '5-15%', 
          topics: [
            'Statement of Financial Position',
            'Statement of Activities',
            'Net asset classifications',
            'Contributions and pledges',
            'Split-interest agreements',
          ]
        },
      ]
    },
    {
      id: 'AUD',
      name: 'Auditing and Attestation',
      shortName: 'AUD',
      weight: '100%',
      questionCount: 72,
      timeAllowed: 240,
      questionTypes: ['mcq', 'tbs'],
      blueprintAreas: [
        { 
          id: 'AUD-I', 
          name: 'Ethics, Professional Responsibilities, and General Principles', 
          weight: '15-25%', 
          topics: [
            'Code of Professional Conduct',
            'Independence',
            'Professional skepticism',
          ]
        },
        { 
          id: 'AUD-II', 
          name: 'Assessing Risk and Developing a Planned Response', 
          weight: '25-35%', 
          topics: [
            'Planning the engagement',
            'Understanding internal control',
            'Risk assessment procedures',
          ]
        },
        { 
          id: 'AUD-III', 
          name: 'Performing Further Procedures and Obtaining Evidence', 
          weight: '30-40%', 
          topics: [
            'Audit evidence',
            'Sampling',
            'Substantive procedures',
          ]
        },
        { 
          id: 'AUD-IV', 
          name: 'Forming Conclusions and Reporting', 
          weight: '15-25%', 
          topics: [
            'Audit reports (unmodified and modified)',
            'Emphasis of matter and other matter paragraphs',
            'Reports on internal control',
            'Review and compilation (SSARS)',
            'Attestation engagements',
          ]
        },
      ]
    },
    {
      id: 'REG',
      name: 'Regulation',
      shortName: 'REG',
      weight: '100%',
      questionCount: 72,
      timeAllowed: 240,
      questionTypes: ['mcq', 'tbs'],
      blueprintAreas: [
        { 
          id: 'REG-I', 
          name: 'Ethics, Professional Responsibilities, and Federal Tax Procedures', 
          weight: '10-20%', 
          topics: [
            'Treasury Circular 230',
            'AICPA Statements on Standards for Tax Services',
            'Tax preparer penalties',
            'Taxpayer penalties',
            'IRS audit and appeals process',
            'Statute of limitations',
          ]
        },
        { 
          id: 'REG-II', 
          name: 'Business Law', 
          weight: '10-20%', 
          topics: [
            'Agency law',
            'Contracts (formation, performance, remedies)',
            'Debtor-creditor relationships',
            'UCC Article 2 (sales)',
            'UCC Article 9 (secured transactions)',
            'Business structures (legal aspects)',
            'Federal securities regulation',
          ]
        },
        { 
          id: 'REG-III', 
          name: 'Federal Taxation of Individuals', 
          weight: '15-25%', 
          topics: [
            'Gross income inclusions and exclusions',
            'Adjustments to income',
            'Standard and itemized deductions',
            'Filing status and dependents',
            'Tax credits',
            'Alternative minimum tax',
            'Self-employment tax',
          ]
        },
        { 
          id: 'REG-IV', 
          name: 'Federal Taxation of Entities', 
          weight: '22-32%', 
          topics: [
            'C corporations',
            'S corporations',
            'Partnerships',
            'Trusts and estates',
            'Tax-exempt organizations',
          ]
        },
        { 
          id: 'REG-V', 
          name: 'Federal Taxation of Property Transactions', 
          weight: '12-22%', 
          topics: [
            'Basis determination',
            'Capital gains and losses',
            'Section 1231 assets',
            'Depreciation recapture (1245, 1250)',
            'Like-kind exchanges (Section 1031)',
            'Involuntary conversions',
            'Installment sales',
          ]
        },
      ]
    },
    {
      id: 'BAR',
      name: 'Business Analysis and Reporting',
      shortName: 'BAR',
      weight: '100%',
      questionCount: 66,
      timeAllowed: 240,
      questionTypes: ['mcq', 'tbs'],
      blueprintAreas: [
        { 
          id: 'BAR-I', 
          name: 'Business Analysis', 
          weight: '40-50%', 
          topics: [
            'Financial statement analysis',
            'Prospective financial information',
            'Corporate governance',
          ]
        },
        { 
          id: 'BAR-II', 
          name: 'Technical Accounting and Reporting', 
          weight: '35-45%', 
          topics: [
            'State and local governments',
            'Not-for-profit entities',
            'Employee benefits',
          ]
        },
        { 
          id: 'BAR-III', 
          name: 'State and Local Governments', 
          weight: '10-20%', 
          topics: [
            'Government-wide statements',
            'Fund accounting',
          ]
        },
        { 
          id: 'BAR-VII', 
          name: 'Managerial Accounting & Financial Analysis', 
          weight: '5-10%', 
          topics: [
            'Time Value of Money',
            'Financial Management',
            'Cost Accounting',
            'Decision Analysis',
          ]
        },
      ]
    },
    {
      id: 'ISC',
      name: 'Information Systems and Controls',
      shortName: 'ISC',
      weight: '100%',
      questionCount: 66,
      timeAllowed: 240,
      questionTypes: ['mcq', 'tbs'],
      blueprintAreas: [
        { 
          id: 'ISC-I', 
          name: 'Information Systems', 
          weight: '35-45%', 
          topics: [
            'IT governance',
            'System development',
            'Database management',
          ]
        },
        { 
          id: 'ISC-II', 
          name: 'Security, Confidentiality, and Privacy', 
          weight: '35-45%', 
          topics: [
            'Access controls',
            'Encryption',
            'Privacy regulations',
          ]
        },
        { 
          id: 'ISC-III', 
          name: 'Considerations for System and Organization Controls', 
          weight: '15-25%', 
          topics: [
            'SOC reports',
            'Trust services criteria',
          ]
        },
      ]
    },
    {
      id: 'TCP',
      name: 'Tax Compliance and Planning',
      shortName: 'TCP',
      weight: '100%',
      questionCount: 66,
      timeAllowed: 240,
      questionTypes: ['mcq', 'tbs'],
      blueprintAreas: [
        { 
          id: 'TCP-I', 
          name: 'Tax Compliance and Planning for Individuals and Personal Financial Planning', 
          weight: '30-40%', 
          topics: [
            'Comprehensive individual tax planning',
            'Income timing strategies',
            'Deduction planning and bunching',
            'Retirement planning (distributions, Roth conversions)',
            'Education planning (529s, Coverdell)',
            'Medicare and Social Security planning',
            'Estate and gift planning for individuals',
          ]
        },
        { 
          id: 'TCP-II', 
          name: 'Entity Tax Compliance', 
          weight: '25-35%', 
          topics: [
            'Partnership tax return preparation',
            'S corporation return preparation',
            'C corporation return preparation',
            'Multi-state compliance issues',
            'Credits and incentives',
          ]
        },
        { 
          id: 'TCP-III', 
          name: 'Entity Tax Planning', 
          weight: '20-30%', 
          topics: [
            'Entity selection and formation',
            'Compensation planning',
            'Retirement plan selection',
            'State tax planning',
            'International tax basics',
            'M&A tax considerations',
          ]
        },
        { 
          id: 'TCP-IV', 
          name: 'Property Transactions', 
          weight: '10-20%', 
          topics: [
            'Advanced property transaction planning',
            'Installment sale planning',
            'Like-kind exchange planning',
            'Stock vs asset acquisitions',
            'Section 338 elections',
            'Corporate liquidations',
          ]
        },
      ]
    },
  ],
  
  metadata: {
    examProvider: 'AICPA',
    websiteUrl: 'https://www.aicpa.org/cpa-exam',
    averageStudyHours: 400,
    difficultyRating: 5,
    careerPaths: ['Public Accounting', 'Corporate Finance', 'Tax', 'Audit', 'Consulting'],
  },
  
  features: {
    hasTBS: true,
    hasWrittenCommunication: false, // WC retired with BEC (Dec 2023)
    hasEssay: false,
    hasDataInsights: false,
  },
  
  examOverview: {
    title: 'Why Become a CPA?',
    description: 'The Certified Public Accountant (CPA) credential is the gold standard in accounting. CPAs are trusted financial advisors who handle everything from audits and taxes to financial planning and business consulting.',
    benefits: [
      'Highest earning potential in accounting',
      'Required for signing audit reports',
      'Recognized in all 50 U.S. states',
      'Gateway to partner-track positions',
      'Enhanced credibility with clients and employers',
    ],
    careerOpportunities: [
      'Public Accounting (Big 4, regional, local firms)',
      'Corporate Finance & Controllership',
      'Tax Planning & Compliance',
      'Forensic Accounting',
      'Government & Non-profit',
      'CFO/Executive Leadership',
    ],
    averageSalary: '$75,000 - $150,000+ (varies by experience and location)',
    examFormat: '4 sections (AUD, FAR, REG + 1 Discipline), 4 hours each, 50% MCQ / 50% TBS',
  },
  
  examStrategy: {
    title: 'CPA Exam Success Strategies',
    keyStrategies: [
      { title: 'Master the Testlets', description: 'The CPA exam uses adaptive MCQ testlets. Perform well on the first testlet to unlock harder (higher-scoring) questions.' },
      { title: 'Time Management', description: 'Allocate ~1.5 min per MCQ and ~15-20 min per TBS. Flag and move on if stuck.' },
      { title: "Don't Overthink MCQs", description: 'Your first instinct is often correct. Read carefully but avoid second-guessing.' },
      { title: 'TBS = Application', description: 'Task-Based Simulations test real-world application. Practice with authoritative literature.' },
    ],
    studyTips: [
      'Study in the order: FAR → AUD → REG → Discipline (or FAR → REG → AUD → Discipline)',
      'Use spaced repetition for retention',
      'Take at least 3 full practice exams per section',
      'Review incorrect answers thoroughly - understand WHY',
      'Study 15-25 hours per week for 4-6 weeks per section',
    ],
    commonMistakes: [
      'Underestimating FAR (it has the most content)',
      'Neglecting government/NFP accounting in FAR',
      'Not practicing TBS enough',
      'Cramming instead of consistent study',
      'Ignoring the Authoritative Literature in TBS',
    ],
    timeManagement: 'Most successful candidates study 300-400 hours total across all sections.',
  },
};

/**
 * CPA exam sections (convenience export)
 */
export const CPA_SECTIONS = CPA_COURSE.sections.map(s => s.id);

/**
 * Get CPA section config by ID
 */
export const getCPASection = (sectionId: string) => 
  CPA_COURSE.sections.find(s => s.id === sectionId);

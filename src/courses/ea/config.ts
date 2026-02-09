/**
 * EA (Enrolled Agent) Course Configuration
 * 
 * Special Enrollment Examination (SEE) prep course
 * Based on IRS SEE Content Outline 2025-2026 (Revised 1-3-2025)
 * 
 * Official IRS Domain Structure:
 * - SEE1: 6 domains (85 scored + 15 pretest questions)
 * - SEE2: 3 domains (85 scored + 15 pretest questions)
 * - SEE3: 4 domains (85 scored + 15 pretest questions)
 */

import { Course } from '../../types/course';

export const EA_COURSE: Course = {
  id: 'ea',
  name: 'Enrolled Agent Exam Review',
  shortName: 'EA',
  description: 'Comprehensive preparation for the IRS Special Enrollment Examination (SEE)',
  passingScore: 105, // Scaled score out of 130
  totalTime: 210, // 3.5 hours per part
  
  sections: [
    {
      id: 'SEE1',
      name: 'Part 1: Individuals',
      shortName: 'SEE1',
      weight: '100%',
      questionCount: 100,
      timeAllowed: 210,
      questionTypes: ['mcq'],
      blueprintAreas: [
        {
          id: 'SEE1-1',
          name: 'Preliminary Work and Taxpayer Data',
          weight: '16.5%',
          questionCount: 14,
          topics: [
            'Filing requirements and due dates',
            'Filing status determination',
            'Dependents and exemptions',
            'Taxpayer identification numbers (SSN, ITIN, ATIN)',
          ]
        },
        {
          id: 'SEE1-2',
          name: 'Income and Assets',
          weight: '20%',
          questionCount: 17,
          topics: [
            'Wages, salaries, and tips',
            'Interest and dividends',
            'Business income (Schedule C)',
            'Capital gains and losses',
            'Rental and royalty income',
            'Retirement distributions',
            'Social Security benefits',
          ]
        },
        {
          id: 'SEE1-3',
          name: 'Deductions and Credits',
          weight: '20%',
          questionCount: 17,
          topics: [
            'Adjustments to income (above-the-line)',
            'Standard vs itemized deductions',
            'Schedule A deductions',
            'Nonrefundable credits',
            'Refundable credits (EITC, CTC, etc.)',
          ]
        },
        {
          id: 'SEE1-4',
          name: 'Taxation',
          weight: '17.6%',
          questionCount: 15,
          topics: [
            'Tax computation and rates',
            'Alternative minimum tax (AMT)',
            'Self-employment tax',
            'Net investment income tax',
            'Estimated tax payments',
          ]
        },
        {
          id: 'SEE1-5',
          name: 'Advising the Individual Taxpayer',
          weight: '12.9%',
          questionCount: 11,
          topics: [
            'Tax planning strategies',
            'Retirement planning considerations',
            'Education tax benefits',
            'Health savings accounts',
            'Penalty avoidance strategies',
          ]
        },
        {
          id: 'SEE1-6',
          name: 'Specialized Returns for Individuals',
          weight: '12.9%',
          questionCount: 11,
          topics: [
            'Amended returns (Form 1040-X)',
            'Foreign income and exclusions',
            'Expatriation',
            'Non-resident alien returns',
            'Estate and gift considerations',
          ]
        },
      ]
    },
    {
      id: 'SEE2',
      name: 'Part 2: Businesses',
      shortName: 'SEE2',
      weight: '100%',
      questionCount: 100,
      timeAllowed: 210,
      questionTypes: ['mcq'],
      blueprintAreas: [
        {
          id: 'SEE2-1',
          name: 'Business Entities and Considerations',
          weight: '35.3%',
          questionCount: 30,
          topics: [
            'Sole proprietorships (Schedule C)',
            'Partnerships (Form 1065)',
            'C Corporations (Form 1120)',
            'S Corporations (Form 1120-S)',
            'Limited liability companies',
            'Entity selection and formation',
            'Basis calculations',
          ]
        },
        {
          id: 'SEE2-2',
          name: 'Business Tax Preparation',
          weight: '43.5%',
          questionCount: 37,
          topics: [
            'Accounting methods and periods',
            'Business income recognition',
            'Cost of goods sold',
            'Business expenses and deductions',
            'Depreciation and amortization',
            'Section 179 and bonus depreciation',
            'Business credits',
            'Employment taxes',
            'Estimated tax payments',
          ]
        },
        {
          id: 'SEE2-3',
          name: 'Specialized Returns and Taxpayers',
          weight: '21.2%',
          questionCount: 18,
          topics: [
            'Farm income and expenses',
            'Trusts and estates (Form 1041)',
            'Tax-exempt organizations (Form 990)',
            'Retirement plans (SEP, SIMPLE, 401(k))',
            'Passive activities',
          ]
        },
      ]
    },
    {
      id: 'SEE3',
      name: 'Part 3: Representation, Practices, and Procedures',
      shortName: 'SEE3',
      weight: '100%',
      questionCount: 100,
      timeAllowed: 210,
      questionTypes: ['mcq'],
      blueprintAreas: [
        {
          id: 'SEE3-1',
          name: 'Practices and Procedures',
          weight: '30.6%',
          questionCount: 26,
          topics: [
            'Power of attorney (Form 2848)',
            'Tax information authorization (Form 8821)',
            'Centralized Authorization File (CAF)',
            'Taxpayer advocate service',
            'IRS notices and letters',
            'Practitioner responsibilities',
          ]
        },
        {
          id: 'SEE3-2',
          name: 'Representation Before the IRS',
          weight: '29.4%',
          questionCount: 25,
          topics: [
            'Who may practice before IRS',
            'Circular 230 requirements',
            'Due diligence requirements',
            'Conflicts of interest',
            'Advertising and solicitation',
            'Fees and contingent fees',
            'Sanctions and disciplinary proceedings',
          ]
        },
        {
          id: 'SEE3-3',
          name: 'Specific Areas of Representation',
          weight: '23.5%',
          questionCount: 20,
          topics: [
            'Audits and examinations',
            'Appeals process',
            'Collection procedures',
            'Offers in compromise',
            'Installment agreements',
            'Innocent spouse relief',
            'Taxpayer rights',
          ]
        },
        {
          id: 'SEE3-4',
          name: 'Filing Process',
          weight: '16.5%',
          questionCount: 14,
          topics: [
            'Amended returns and claims for refund',
            'Statute of limitations',
            'Penalties and interest',
            'Document retention requirements',
            'Client records and electronic records',
            'Preparer penalties',
          ]
        },
      ]
    },
  ],
  
  metadata: {
    examProvider: 'Prometric (IRS)',
    websiteUrl: 'https://www.prometric.com/irs',
    averageStudyHours: 150,
    difficultyRating: 3,
    careerPaths: ['Tax Practice', 'IRS Representation', 'Tax Resolution', 'Enrolled Agent'],
  },
  
  features: {
    hasTBS: false,
    hasWrittenCommunication: false,
    hasEssay: false,
    hasDataInsights: false,
  },
  
  examOverview: {
    title: 'Why Become an Enrolled Agent?',
    description: 'Enrolled Agents (EAs) are federally-authorized tax practitioners who can represent taxpayers before the IRS. The EA credential is the highest credential the IRS awards and is recognized across all 50 states.',
    benefits: [
      'Unlimited representation rights before the IRS',
      'Federal credential recognized nationwide',
      'No degree requirement - pass the exam and background check',
      'Specialization in tax (unlike CPA generalist path)',
      'Growing demand due to tax complexity',
    ],
    careerOpportunities: [
      'Tax Preparation (seasonal or year-round)',
      'IRS Representation & Tax Resolution',
      'Tax Planning & Advisory',
      'Self-employed Tax Practice',
      'CPA/Law Firm Tax Department',
      'Corporate Tax Compliance',
    ],
    averageSalary: '$50,000 - $100,000+ (self-employed EAs can earn significantly more)',
    examFormat: '3 parts (Individuals, Businesses, Representation), 3.5 hours each, 100% MCQ',
  },
  
  examStrategy: {
    title: 'EA Exam Success Strategies',
    keyStrategies: [
      { title: 'Know the Forms', description: 'The EA exam is heavily form-based. Understand which lines on Form 1040, 1120, 1065, etc. are affected by different scenarios.' },
      { title: 'Part Order Matters', description: 'Most candidates start with Part 1 (Individuals) since it builds the foundation for Parts 2 and 3.' },
      { title: 'Focus on Current Tax Law', description: 'The exam tests tax law as of the December 31 prior to your testing window.' },
      { title: 'Practice Calculations', description: 'You\'ll need to calculate basis, depreciation, and various credits without a formula sheet.' },
    ],
    studyTips: [
      'Study Part 1 → Part 2 → Part 3 (builds logically)',
      'Use IRS publications as supplemental reference',
      'Master basis calculations - they appear everywhere',
      'Create a formula sheet for depreciation methods',
      'Practice under timed conditions (3.5 hours is long!)',
    ],
    commonMistakes: [
      'Underestimating Part 2 (Businesses) complexity',
      'Not knowing Circular 230 for Part 3',
      'Confusing similar-sounding concepts (e.g., child tax credit vs. additional child tax credit)',
      'Rushing through calculations',
      'Not reading questions carefully (many have "EXCEPT" or "NOT")',
    ],
    timeManagement: 'Plan 2-3 weeks of study per part. ~100-150 total study hours.',
  },
};

/**
 * EA Section IDs for quick reference
 */
export const EA_SECTIONS = EA_COURSE.sections.map(s => s.id);

/**
 * EA Section Configuration Map for UI
 */
export type EASectionId = 'SEE1' | 'SEE2' | 'SEE3';

export interface EASectionConfig {
  id: EASectionId;
  name: string;
  shortName: string;
  description: string;
  examLength: number; // hours
  questionCount: number;
  color: string;
  icon: string;
  topics: string[];
}

export const EA_SECTION_CONFIG: Record<EASectionId, EASectionConfig> = {
  SEE1: {
    id: 'SEE1',
    name: 'Part 1: Individuals',
    shortName: 'SEE1',
    description: 'Individual taxation including income, deductions, credits, and specialized returns',
    examLength: 3.5,
    questionCount: 100,
    color: '#3b82f6', // blue
    icon: 'User',
    topics: [
      'Filing requirements & status',
      'Income and assets',
      'Deductions and credits',
      'Taxation and advice',
      'Specialized returns',
    ],
  },
  SEE2: {
    id: 'SEE2',
    name: 'Part 2: Businesses',
    shortName: 'SEE2',
    description: 'Business taxation including entities, financial information, and tax computations',
    examLength: 3.5,
    questionCount: 100,
    color: '#22c55e', // green
    icon: 'Building2',
    topics: [
      'Business entities',
      'Business financial information',
      'Specialized entities',
      'Business tax computations',
    ],
  },
  SEE3: {
    id: 'SEE3',
    name: 'Part 3: Representation',
    shortName: 'SEE3',
    description: 'IRS representation, practices, procedures, and ethics (Circular 230)',
    examLength: 3.5,
    questionCount: 100,
    color: '#a855f7', // purple
    icon: 'Scale',
    topics: [
      'Practices and procedures',
      'Representation before IRS',
      'Specific representation types',
      'Filing process completion',
      'Recordkeeping',
    ],
  },
};

/**
 * Get EA section by ID
 */
export const getEASection = (sectionId: EASectionId): EASectionConfig | undefined => {
  return EA_SECTION_CONFIG[sectionId];
};

export default EA_COURSE;

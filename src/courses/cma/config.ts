/**
 * CMA (Certified Management Accountant) Course Configuration
 * 
 * IMA CMA Exam prep course
 * Based on 2025-2026 CMA Content Specification Outlines
 */

import { Course } from '../../types/course';

export const CMA_COURSE: Course = {
  id: 'cma',
  name: 'CMA Exam Review',
  shortName: 'CMA',
  description: 'Comprehensive preparation for the IMA Certified Management Accountant Examination',
  passingScore: 360, // Scaled score out of 500
  totalTime: 240, // 4 hours per part
  hasTBS: false, // CMA uses Case-Based Questions (CBQs), not TBS
  
  sections: [
    {
      id: 'CMA1',
      name: 'Part 1: Financial Planning, Performance, and Analytics',
      shortName: 'CMA1',
      weight: '100%',
      questionCount: 100, // 100 MCQ + 2 Case-Based Questions (CBQs)
      timeAllowed: 240,
      questionTypes: ['mcq', 'case'], // CBQs replacing essays in 2026
      blueprintAreas: [
        {
          id: 'CMA1-A',
          name: 'External Financial Reporting Decisions',
          weight: '15%',
          topics: [
            'Financial statements',
            'Recognition, measurement, valuation',
            'SEC filings and FASB updates',
          ]
        },
        {
          id: 'CMA1-B',
          name: 'Planning, Budgeting, and Forecasting',
          weight: '20%',
          topics: [
            'Strategic planning',
            'Budgeting concepts',
            'Forecasting techniques',
            'Budget methodologies',
          ]
        },
        {
          id: 'CMA1-C',
          name: 'Performance Management',
          weight: '20%',
          topics: [
            'Cost and variance measures',
            'Responsibility centers',
            'Performance measures',
            'Balanced scorecard',
          ]
        },
        {
          id: 'CMA1-D',
          name: 'Cost Management',
          weight: '15%',
          topics: [
            'Measurement concepts',
            'Costing systems',
            'Overhead costs',
            'Supply chain management',
          ]
        },
        {
          id: 'CMA1-E',
          name: 'Internal Controls',
          weight: '15%',
          topics: [
            'Governance, risk, and compliance',
            'Internal control framework (COSO)',
            'Internal audit function',
          ]
        },
        {
          id: 'CMA1-F',
          name: 'Technology and Analytics',
          weight: '15%',
          topics: [
            'Information systems',
            'Data governance',
            'Technology-enabled finance transformation',
            'Data analytics',
          ]
        },
      ]
    },
    {
      id: 'CMA2',
      name: 'Part 2: Strategic Financial Management',
      shortName: 'CMA2',
      weight: '100%',
      questionCount: 100, // 100 MCQ + 2 Case-Based Questions (CBQs)
      timeAllowed: 240,
      questionTypes: ['mcq', 'case'], // CBQs replacing essays in 2026
      blueprintAreas: [
        {
          id: 'CMA2-A',
          name: 'Financial Statement Analysis',
          weight: '20%',
          topics: [
            'Basic financial statement analysis',
            'Financial ratios',
            'Profitability analysis',
            'Special issues (inflation, foreign currency)',
          ]
        },
        {
          id: 'CMA2-B',
          name: 'Corporate Finance',
          weight: '20%',
          topics: [
            'Risk and return',
            'Long-term financial management',
            'Raising capital',
            'Working capital management',
          ]
        },
        {
          id: 'CMA2-C',
          name: 'Decision Analysis',
          weight: '25%',
          topics: [
            'Cost-volume-profit analysis',
            'Marginal analysis',
            'Pricing',
            'Risk analysis',
          ]
        },
        {
          id: 'CMA2-D',
          name: 'Risk Management',
          weight: '10%',
          topics: [
            'Enterprise risk management',
            'Risk identification and mitigation',
          ]
        },
        {
          id: 'CMA2-E',
          name: 'Investment Decisions',
          weight: '10%',
          topics: [
            'Capital budgeting process',
            'Discounted cash flow analysis',
            'Payback and discounted payback',
            'Risk analysis in capital investment',
          ]
        },
        {
          id: 'CMA2-F',
          name: 'Professional Ethics',
          weight: '15%',
          topics: [
            'Business ethics',
            'Ethical considerations for management accountants',
            'IMA Statement of Ethical Professional Practice',
          ]
        },
      ]
    },
  ],
  
  metadata: {
    examProvider: 'Prometric (IMA)',
    websiteUrl: 'https://www.imanet.org/cma-certification',
    averageStudyHours: 300,
    difficultyRating: 4,
    careerPaths: ['Management Accounting', 'Financial Planning', 'Corporate Finance', 'Controller'],
  },
  
  features: {
    hasTBS: false,
    hasWrittenCommunication: false,
    hasEssay: false, // Essays retired Sept 2026, replaced by CBQs
    hasCBQ: true, // Case-Based Questions mandatory from Sept 2026
    hasDataInsights: false,
  },
  
  /**
   * CBQ Transition Timeline (IMA's Case-Based Question implementation)
   * 
   * Jan-Feb 2026: Legacy format (100 MCQ + 2 essays per part)
   * May-June 2026: Transition window (candidates choose essays OR CBQs at registration)
   * Sept-Oct 2026+: CBQ mandatory, essays officially retired
   * 
   * CBQ Question Types:
   * - Numerical Entry: Calculate and type a value (NPV, variance, ratio)
   * - Drag-and-Drop: Arrange items or match concepts
   * - Multiple Select: Select all correct options
   * - List Selection (dropdown): Choose from dropdown options
   * 
   * CBQ Structure:
   * - Each CBQ has a business scenario with data/exhibits
   * - 3-5 related questions in various formats
   * - ~15-20 minutes per CBQ
   * - 2 CBQs per part (25% of total score)
   */
  cbqTransition: {
    effectiveDate: '2026-09-01',
    transitionWindow: {
      start: '2026-05-01',
      end: '2026-08-31',
      format: 'choice', // Candidate can choose essay or CBQ
    },
    legacyEndDate: '2026-08-31', // Last date for legacy essay format
    cbqMandatoryDate: '2026-09-01',
    questionTypes: ['numerical_entry', 'drag_and_drop', 'multiple_select', 'dropdown'] as const,
  },
  
  examOverview: {
    title: 'Why Become a CMA?',
    description: 'The Certified Management Accountant (CMA) credential from IMA demonstrates mastery in financial planning, analysis, control, decision support, and professional ethics. CMAs are strategic business partners who drive organizational success.',
    benefits: [
      'Higher earning potential (CMAs earn 58% more than non-certified peers)',
      'Strategic management focus vs. compliance/audit focus',
      'Global recognition in over 100 countries',
      'Demonstrates both technical and leadership skills',
      'Only 2 exam parts vs. CPA\'s 4 sections',
    ],
    careerOpportunities: [
      'Financial Analyst / Senior Financial Analyst',
      'Controller / Assistant Controller',
      'CFO / VP of Finance',
      'Cost Accountant',
      'Budget Analyst',
      'Corporate Finance Manager',
      'Management Consultant',
    ],
    averageSalary: '$85,000 - $160,000+ (median $130K for CMAs)',
    examFormat: '2 parts (Financial Planning & Analysis, Strategic Financial Management), 4 hours each, 100 MCQ + 2 CBQs per part',
  },
  
  examStrategy: {
    title: 'CMA Exam Success Strategies',
    keyStrategies: [
      { title: 'Master the CBQ Format', description: 'CBQs are 25% of each part. Practice reading scenarios quickly, extracting data, and answering numerical, multiple-select, and drag-and-drop questions efficiently.' },
      { title: 'Know Your Formulas', description: 'Variance analysis, CVP, NPV, WACC - memorize these cold. No formula sheet provided. CBQ numerical entry requires precise calculations.' },
      { title: 'Understand Decision Making', description: 'CMAs are decision-makers. Many questions test whether you can recommend the right course of action.' },
      { title: 'Part Order Flexibility', description: 'Unlike CPA, you can take Part 2 before Part 1 if preferred. Some find Part 1 easier to start with.' },
    ],
    studyTips: [
      'Create a comprehensive formula sheet and review daily',
      'Practice CBQ-style scenarios with numerical entry and multi-select questions',
      'Focus on ratio analysis - appears in both parts',
      'Understand internal controls from a management perspective',
      'Don\'t skip ethics - it\'s tested on both parts',
    ],
    commonMistakes: [
      'Not practicing CBQ question formats before the exam',
      'Rushing through CBQ scenarios without extracting all relevant data',
      'Memorizing formulas without understanding when to apply them',
      'Poor time management (MCQ + CBQ in 4 hours is tight)',
      'Ignoring IMA\'s Statement of Ethical Professional Practice',
    ],
    timeManagement: 'Plan 150-200 hours per part. Many pass both parts within 6-12 months.',
  },
};

/**
 * CMA Section IDs for quick reference
 */
export const CMA_SECTIONS = CMA_COURSE.sections.map(s => s.id);

/**
 * CMA Section Configuration Map for UI
 */
export type CMASectionId = 'CMA1' | 'CMA2';

export interface CMASectionConfig {
  id: CMASectionId;
  name: string;
  shortName: string;
  description: string;
  examLength: number; // hours
  questionCount: number;
  color: string;
  icon: string;
  topics: string[];
}

export const CMA_SECTION_CONFIG: Record<CMASectionId, CMASectionConfig> = {
  CMA1: {
    id: 'CMA1',
    name: 'Part 1: Financial Planning, Performance, and Analytics',
    shortName: 'CMA1',
    description: 'External reporting, budgeting, performance management, cost management, internal controls, and analytics',
    examLength: 4,
    questionCount: 100,
    color: '#10b981', // emerald
    icon: 'TrendingUp',
    topics: [
      'External Financial Reporting',
      'Planning, Budgeting & Forecasting',
      'Performance Management',
      'Cost Management',
      'Internal Controls',
      'Technology & Analytics',
    ],
  },
  CMA2: {
    id: 'CMA2',
    name: 'Part 2: Strategic Financial Management',
    shortName: 'CMA2',
    description: 'Financial analysis, corporate finance, decision analysis, risk management, investments, and ethics',
    examLength: 4,
    questionCount: 100,
    color: '#6366f1', // indigo
    icon: 'Calculator',
    topics: [
      'Financial Statement Analysis',
      'Corporate Finance',
      'Decision Analysis',
      'Risk Management',
      'Investment Decisions',
      'Professional Ethics',
    ],
  },
};

/**
 * Get CMA section by ID
 */
export const getCMASection = (sectionId: CMASectionId): CMASectionConfig | undefined => {
  return CMA_SECTION_CONFIG[sectionId];
};

export default CMA_COURSE;

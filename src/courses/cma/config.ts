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
  hasTBS: false, // CMA has Essays, not TBS
  
  sections: [
    {
      id: 'CMA1',
      name: 'Part 1: Financial Planning, Performance, and Analytics',
      shortName: 'CMA1',
      weight: '100%',
      questionCount: 100, // 100 MCQ + 2 essays
      timeAllowed: 240,
      questionTypes: ['mcq', 'essay'],
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
      questionCount: 100, // 100 MCQ + 2 essays
      timeAllowed: 240,
      questionTypes: ['mcq', 'essay'],
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
  
  pricing: {
    monthly: 39,
    annual: 349,
    lifetime: 599,
  },
  
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
    hasEssay: true,
    hasDataInsights: false,
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

/**
 * CMA Mock Exam Configuration
 * 
 * Mock exams for the IMA Certified Management Accountant (CMA) Exam
 * Each part has 100 MCQ questions, 4 hours time limit
 * Passing score: 360/500 (scaled)
 */

import { CMASection } from '../../../types';

// ============================================
// CMA Exam Configuration Types
// ============================================

export interface CMAMockExamConfig {
  id: string;
  name: string;
  description: string;
  section: CMASection;
  version: '2024' | '2025';
  questionCount: number;
  totalTime: number; // in seconds
  passingScore: number; // 360 out of 500
  blueprintWeights: CMABlueprintWeight[];
  questionSelection: CMAQuestionSelectionCriteria;
}

export interface CMABlueprintWeight {
  area: string;
  name: string;
  weight: number; // percentage (0-100)
  targetQuestions: number; // approximate questions from this area
  topics: string[];
}

export interface CMAQuestionSelectionCriteria {
  // Distribution by difficulty
  difficultyDistribution: {
    easy: number; // percentage
    medium: number;
    hard: number;
  };
  // Ensure coverage across all blueprint areas
  requireAllAreas: boolean;
  // Specific question IDs (for curated exams)
  questionIds?: string[];
  // Exclude previously seen questions
  excludeQuestionIds?: string[];
}

// ============================================
// CMA Blueprint Weights by Section
// ============================================

/**
 * CMA Part 1: Financial Planning, Performance, and Analytics
 * Based on IMA CMA Exam Content Specification
 */
export const CMA1_BLUEPRINT_WEIGHTS: CMABlueprintWeight[] = [
  {
    area: 'CMA1-A',
    name: 'External Financial Reporting Decisions',
    weight: 15,
    targetQuestions: 15,
    topics: ['Financial statements', 'Recognition', 'Valuation', 'Disclosure'],
  },
  {
    area: 'CMA1-B',
    name: 'Planning, Budgeting, and Forecasting',
    weight: 20,
    targetQuestions: 20,
    topics: ['Strategic planning', 'Budget process', 'Forecasting techniques', 'Pro forma financials'],
  },
  {
    area: 'CMA1-C',
    name: 'Performance Management',
    weight: 20,
    targetQuestions: 20,
    topics: ['Cost and variance measures', 'Responsibility centers', 'Performance measures', 'Balanced Scorecard'],
  },
  {
    area: 'CMA1-D',
    name: 'Cost Management',
    weight: 15,
    targetQuestions: 15,
    topics: ['Cost concepts', 'Cost systems', 'Overhead allocation', 'Supply chain management'],
  },
  {
    area: 'CMA1-E',
    name: 'Internal Controls',
    weight: 15,
    targetQuestions: 15,
    topics: ['Governance', 'Risk management', 'Internal control frameworks', 'Internal audit'],
  },
  {
    area: 'CMA1-F',
    name: 'Technology and Analytics',
    weight: 15,
    targetQuestions: 15,
    topics: ['Information systems', 'Data governance', 'Technology-enabled finance', 'Data analytics'],
  },
];

/**
 * CMA Part 2: Strategic Financial Management
 * Based on IMA CMA Exam Content Specification
 */
export const CMA2_BLUEPRINT_WEIGHTS: CMABlueprintWeight[] = [
  {
    area: 'CMA2-A',
    name: 'Financial Statement Analysis',
    weight: 20,
    targetQuestions: 20,
    topics: ['Ratio analysis', 'Profitability analysis', 'Market value metrics', 'Analytical issues'],
  },
  {
    area: 'CMA2-B',
    name: 'Corporate Finance',
    weight: 20,
    targetQuestions: 20,
    topics: ['Risk and return', 'Capital structure', 'Working capital', 'Mergers and acquisitions'],
  },
  {
    area: 'CMA2-C',
    name: 'Decision Analysis',
    weight: 25,
    targetQuestions: 25,
    topics: ['CVP analysis', 'Marginal analysis', 'Pricing decisions', 'Risk analysis'],
  },
  {
    area: 'CMA2-D',
    name: 'Risk Management',
    weight: 10,
    targetQuestions: 10,
    topics: ['Enterprise risk', 'Risk mitigation', 'Risk analysis', 'Derivatives'],
  },
  {
    area: 'CMA2-E',
    name: 'Investment Decisions',
    weight: 10,
    targetQuestions: 10,
    topics: ['Capital budgeting', 'NPV', 'IRR', 'Payback', 'Real options'],
  },
  {
    area: 'CMA2-F',
    name: 'Professional Ethics',
    weight: 15,
    targetQuestions: 15,
    topics: ['IMA ethics standards', 'Ethical considerations', 'Fraud', 'Corporate governance'],
  },
];

// ============================================
// All Blueprint Weights by Section
// ============================================

export const CMA_BLUEPRINT_WEIGHTS: Record<CMASection, CMABlueprintWeight[]> = {
  CMA1: CMA1_BLUEPRINT_WEIGHTS,
  CMA2: CMA2_BLUEPRINT_WEIGHTS,
};

// ============================================
// Mock Exam Configurations
// ============================================

/**
 * CMA Part 1 Mock Exams
 */
export const CMA1_MOCK_EXAMS: CMAMockExamConfig[] = [
  {
    id: 'cma1-mock-1',
    name: 'CMA Part 1 Mock Exam 1 - Foundation',
    description: 'Comprehensive Financial Planning, Performance, and Analytics exam covering all blueprint areas with balanced difficulty.',
    section: 'CMA1',
    version: '2024',
    questionCount: 100,
    totalTime: 4 * 60 * 60, // 4 hours = 14,400 seconds
    passingScore: 360, // IMA scaled score (out of 500)
    blueprintWeights: CMA1_BLUEPRINT_WEIGHTS,
    questionSelection: {
      difficultyDistribution: {
        easy: 25,
        medium: 50,
        hard: 25,
      },
      requireAllAreas: true,
    },
  },
  {
    id: 'cma1-mock-2',
    name: 'CMA Part 1 Mock Exam 2 - Intensive',
    description: 'Higher difficulty exam focusing on complex cost management, variance analysis, and budgeting scenarios.',
    section: 'CMA1',
    version: '2024',
    questionCount: 100,
    totalTime: 4 * 60 * 60,
    passingScore: 360,
    blueprintWeights: CMA1_BLUEPRINT_WEIGHTS,
    questionSelection: {
      difficultyDistribution: {
        easy: 15,
        medium: 45,
        hard: 40,
      },
      requireAllAreas: true,
    },
  },
  {
    id: 'cma1-mock-3',
    name: 'CMA Part 1 Mock Exam 3 - Final Review',
    description: 'Final preparation exam with comprehensive coverage emphasizing heavily-tested topics.',
    section: 'CMA1',
    version: '2024',
    questionCount: 100,
    totalTime: 4 * 60 * 60,
    passingScore: 360,
    blueprintWeights: CMA1_BLUEPRINT_WEIGHTS,
    questionSelection: {
      difficultyDistribution: {
        easy: 20,
        medium: 50,
        hard: 30,
      },
      requireAllAreas: true,
    },
  },
];

/**
 * CMA Part 2 Mock Exams
 */
export const CMA2_MOCK_EXAMS: CMAMockExamConfig[] = [
  {
    id: 'cma2-mock-1',
    name: 'CMA Part 2 Mock Exam 1 - Foundation',
    description: 'Comprehensive Strategic Financial Management exam covering financial analysis, corporate finance, and decision analysis.',
    section: 'CMA2',
    version: '2024',
    questionCount: 100,
    totalTime: 4 * 60 * 60,
    passingScore: 360,
    blueprintWeights: CMA2_BLUEPRINT_WEIGHTS,
    questionSelection: {
      difficultyDistribution: {
        easy: 25,
        medium: 50,
        hard: 25,
      },
      requireAllAreas: true,
    },
  },
  {
    id: 'cma2-mock-2',
    name: 'CMA Part 2 Mock Exam 2 - Intensive',
    description: 'Advanced exam focusing on capital budgeting, financial analysis calculations, and risk management.',
    section: 'CMA2',
    version: '2024',
    questionCount: 100,
    totalTime: 4 * 60 * 60,
    passingScore: 360,
    blueprintWeights: CMA2_BLUEPRINT_WEIGHTS,
    questionSelection: {
      difficultyDistribution: {
        easy: 15,
        medium: 45,
        hard: 40,
      },
      requireAllAreas: true,
    },
  },
  {
    id: 'cma2-mock-3',
    name: 'CMA Part 2 Mock Exam 3 - Final Review',
    description: 'Final preparation exam ensuring mastery of strategic finance concepts and professional ethics.',
    section: 'CMA2',
    version: '2024',
    questionCount: 100,
    totalTime: 4 * 60 * 60,
    passingScore: 360,
    blueprintWeights: CMA2_BLUEPRINT_WEIGHTS,
    questionSelection: {
      difficultyDistribution: {
        easy: 20,
        medium: 50,
        hard: 30,
      },
      requireAllAreas: true,
    },
  },
];

// ============================================
// All CMA Mock Exams
// ============================================

export const ALL_CMA_MOCK_EXAMS: CMAMockExamConfig[] = [
  ...CMA1_MOCK_EXAMS,
  ...CMA2_MOCK_EXAMS,
];

// ============================================
// Helper Functions
// ============================================

/**
 * Get mock exams by section
 */
export function getCMAMockExamsBySection(section: CMASection): CMAMockExamConfig[] {
  return ALL_CMA_MOCK_EXAMS.filter(exam => exam.section === section);
}

/**
 * Get mock exam by ID
 */
export function getCMAMockExamById(id: string): CMAMockExamConfig | undefined {
  return ALL_CMA_MOCK_EXAMS.find(exam => exam.id === id);
}

/**
 * Get blueprint weights for a section
 */
export function getCMABlueprintWeights(section: CMASection): CMABlueprintWeight[] {
  return CMA_BLUEPRINT_WEIGHTS[section];
}

/**
 * Calculate target question count per blueprint area
 * Based on the weight percentage and total question count
 */
export function calculateQuestionDistribution(
  section: CMASection,
  totalQuestions: number = 100
): Record<string, number> {
  const weights = CMA_BLUEPRINT_WEIGHTS[section];
  const distribution: Record<string, number> = {};
  
  let assigned = 0;
  weights.forEach((weight, index) => {
    if (index === weights.length - 1) {
      // Last area gets remaining to ensure total is exact
      distribution[weight.area] = totalQuestions - assigned;
    } else {
      const count = Math.round((weight.weight / 100) * totalQuestions);
      distribution[weight.area] = count;
      assigned += count;
    }
  });
  
  return distribution;
}

/**
 * Get exam statistics
 */
export function getCMAMockExamStats() {
  return {
    totalExams: ALL_CMA_MOCK_EXAMS.length,
    bySection: {
      CMA1: CMA1_MOCK_EXAMS.length,
      CMA2: CMA2_MOCK_EXAMS.length,
    },
    examDuration: '4 hours (240 minutes)',
    questionsPerExam: 100,
    passingScore: '360/500 scaled score',
  };
}

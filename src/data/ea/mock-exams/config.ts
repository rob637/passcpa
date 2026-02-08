/**
 * EA Mock Exam Configuration
 * 
 * Mock exams for the IRS Special Enrollment Examination (EA Exam)
 * Each section has 100 MCQ questions, 3.5 hours time limit
 */

import { EASection } from '../../../types';

// ============================================
// EA Exam Configuration Types
// ============================================

export interface EAMockExamConfig {
  id: string;
  name: string;
  description: string;
  section: EASection;
  version: '2024' | '2025';
  questionCount: number;
  totalTime: number; // in seconds
  passingScore: number;
  blueprintWeights: EABlueprintWeight[];
  questionSelection: EAQuestionSelectionCriteria;
}

export interface EABlueprintWeight {
  area: string;
  name: string;
  weight: number; // percentage (0-100)
  targetQuestions: number; // approximate questions from this area
  topics: string[];
}

export interface EAQuestionSelectionCriteria {
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
// EA Blueprint Weights by Section
// ============================================

/**
 * SEE Part 1: Individuals
 * Based on IRS EA Exam Content Outline
 */
export const SEE1_BLUEPRINT_WEIGHTS: EABlueprintWeight[] = [
  {
    area: 'SEE1-1',
    name: 'Preliminary Work with Taxpayer Data',
    weight: 15,
    targetQuestions: 15,
    topics: ['Filing requirements', 'Filing status', 'Exemptions', 'Taxpayer ID'],
  },
  {
    area: 'SEE1-2',
    name: 'Income and Assets',
    weight: 25,
    targetQuestions: 25,
    topics: ['Gross income', 'Wages', 'Interest', 'Dividends', 'Capital gains', 'Retirement distributions'],
  },
  {
    area: 'SEE1-3',
    name: 'Deductions and Credits',
    weight: 25,
    targetQuestions: 25,
    topics: ['Standard deduction', 'Itemized deductions', 'AGI adjustments', 'Tax credits'],
  },
  {
    area: 'SEE1-4',
    name: 'Taxation',
    weight: 20,
    targetQuestions: 20,
    topics: ['Tax computation', 'AMT', 'Self-employment tax', 'Estimated taxes'],
  },
  {
    area: 'SEE1-5',
    name: 'Advising the Individual Taxpayer',
    weight: 15,
    targetQuestions: 15,
    topics: ['Planning strategies', 'Education incentives', 'Retirement planning', 'Health savings'],
  },
];

/**
 * SEE Part 2: Businesses
 * Based on IRS EA Exam Content Outline
 */
export const SEE2_BLUEPRINT_WEIGHTS: EABlueprintWeight[] = [
  {
    area: 'SEE2-1',
    name: 'Business Entities',
    weight: 20,
    targetQuestions: 20,
    topics: ['Entity types', 'Entity selection', 'Formation', 'Accounting methods'],
  },
  {
    area: 'SEE2-2',
    name: 'Business Income',
    weight: 15,
    targetQuestions: 15,
    topics: ['Gross receipts', 'Cost of goods sold', 'Business income sources'],
  },
  {
    area: 'SEE2-3',
    name: 'Business Expenses and Deductions',
    weight: 25,
    targetQuestions: 25,
    topics: ['Depreciation', 'Section 179', 'Business expenses', 'Home office', 'Vehicle expenses'],
  },
  {
    area: 'SEE2-4',
    name: 'Business Assets',
    weight: 10,
    targetQuestions: 10,
    topics: ['Asset basis', 'Like-kind exchanges', 'Involuntary conversions', 'Section 1231'],
  },
  {
    area: 'SEE2-5',
    name: 'Partnership Taxation',
    weight: 10,
    targetQuestions: 10,
    topics: ['Partnership formation', 'Partner basis', 'Distributions', 'Terminations'],
  },
  {
    area: 'SEE2-6',
    name: 'Corporation Taxation',
    weight: 10,
    targetQuestions: 10,
    topics: ['C corporation', 'Corporate tax', 'Distributions', 'Liquidations'],
  },
  {
    area: 'SEE2-7',
    name: 'S Corporation Taxation',
    weight: 10,
    targetQuestions: 10,
    topics: ['S election', 'Shareholder basis', 'Distributions', 'Built-in gains'],
  },
];

/**
 * SEE Part 3: Representation, Practices, and Procedures
 * Based on IRS EA Exam Content Outline
 */
export const SEE3_BLUEPRINT_WEIGHTS: EABlueprintWeight[] = [
  {
    area: 'SEE3-1',
    name: 'Practice Before the IRS',
    weight: 20,
    targetQuestions: 20,
    topics: ['Circular 230', 'Who may practice', 'Practice rights', 'PTIN requirements'],
  },
  {
    area: 'SEE3-2',
    name: 'Representation Standards',
    weight: 20,
    targetQuestions: 20,
    topics: ['Due diligence', 'Best practices', 'Prohibited conduct', 'Sanctions'],
  },
  {
    area: 'SEE3-3',
    name: 'Taxpayer Representation',
    weight: 15,
    targetQuestions: 15,
    topics: ['Power of Attorney', 'Form 2848', 'Form 8821', 'CAF number'],
  },
  {
    area: 'SEE3-4',
    name: 'Examination Process',
    weight: 15,
    targetQuestions: 15,
    topics: ['Audit types', 'Statute of limitations', 'Assessment procedures', 'Appeals'],
  },
  {
    area: 'SEE3-5',
    name: 'Collection Process',
    weight: 15,
    targetQuestions: 15,
    topics: ['Notice sequence', 'CDP hearings', 'Installment agreements', 'OIC', 'Liens and levies'],
  },
  {
    area: 'SEE3-6',
    name: 'Penalties and Interest',
    weight: 10,
    targetQuestions: 10,
    topics: ['Accuracy penalties', 'Failure to file', 'Failure to pay', 'Fraud', 'Reasonable cause'],
  },
  {
    area: 'SEE3-7',
    name: 'Appeals and Litigation',
    weight: 5,
    targetQuestions: 5,
    topics: ['Appeals Office', 'Tax Court', 'Refund claims', 'Collection appeals'],
  },
];

// ============================================
// All Blueprint Weights by Section
// ============================================

export const EA_BLUEPRINT_WEIGHTS: Record<EASection, EABlueprintWeight[]> = {
  SEE1: SEE1_BLUEPRINT_WEIGHTS,
  SEE2: SEE2_BLUEPRINT_WEIGHTS,
  SEE3: SEE3_BLUEPRINT_WEIGHTS,
};

// ============================================
// Mock Exam Configurations
// ============================================

/**
 * SEE Part 1 Mock Exams
 */
export const SEE1_MOCK_EXAMS: EAMockExamConfig[] = [
  {
    id: 'see1-mock-1',
    name: 'SEE1 Mock Exam 1 - Foundation',
    description: 'Comprehensive Individual Taxation exam covering all blueprint areas with balanced difficulty.',
    section: 'SEE1',
    version: '2024',
    questionCount: 100,
    totalTime: 3.5 * 60 * 60, // 3.5 hours = 12,600 seconds
    passingScore: 105, // IRS scaled score (out of 130)
    blueprintWeights: SEE1_BLUEPRINT_WEIGHTS,
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
    id: 'see1-mock-2',
    name: 'SEE1 Mock Exam 2 - Intensive',
    description: 'Higher difficulty exam focusing on complex income scenarios, retirement distributions, and tax calculations.',
    section: 'SEE1',
    version: '2024',
    questionCount: 100,
    totalTime: 3.5 * 60 * 60,
    passingScore: 105,
    blueprintWeights: SEE1_BLUEPRINT_WEIGHTS,
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
    id: 'see1-mock-3',
    name: 'SEE1 Mock Exam 3 - Final Review',
    description: 'Final preparation exam with comprehensive coverage emphasizing heavily-tested topics.',
    section: 'SEE1',
    version: '2024',
    questionCount: 100,
    totalTime: 3.5 * 60 * 60,
    passingScore: 105,
    blueprintWeights: SEE1_BLUEPRINT_WEIGHTS,
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
 * SEE Part 2 Mock Exams
 */
export const SEE2_MOCK_EXAMS: EAMockExamConfig[] = [
  {
    id: 'see2-mock-1',
    name: 'SEE2 Mock Exam 1 - Foundation',
    description: 'Comprehensive Business Taxation exam covering entities, depreciation, and all business tax topics.',
    section: 'SEE2',
    version: '2024',
    questionCount: 100,
    totalTime: 3.5 * 60 * 60,
    passingScore: 105,
    blueprintWeights: SEE2_BLUEPRINT_WEIGHTS,
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
    id: 'see2-mock-2',
    name: 'SEE2 Mock Exam 2 - Intensive',
    description: 'Advanced exam focusing on partnership/S corp basis, depreciation calculations, and entity taxation.',
    section: 'SEE2',
    version: '2024',
    questionCount: 100,
    totalTime: 3.5 * 60 * 60,
    passingScore: 105,
    blueprintWeights: SEE2_BLUEPRINT_WEIGHTS,
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
    id: 'see2-mock-3',
    name: 'SEE2 Mock Exam 3 - Final Review',
    description: 'Final preparation exam with comprehensive business tax coverage and exam-weight accuracy.',
    section: 'SEE2',
    version: '2024',
    questionCount: 100,
    totalTime: 3.5 * 60 * 60,
    passingScore: 105,
    blueprintWeights: SEE2_BLUEPRINT_WEIGHTS,
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
 * SEE Part 3 Mock Exams
 */
export const SEE3_MOCK_EXAMS: EAMockExamConfig[] = [
  {
    id: 'see3-mock-1',
    name: 'SEE3 Mock Exam 1 - Foundation',
    description: 'Comprehensive Representation exam covering Circular 230, collection, penalties, and appeals.',
    section: 'SEE3',
    version: '2024',
    questionCount: 100,
    totalTime: 3.5 * 60 * 60,
    passingScore: 105,
    blueprintWeights: SEE3_BLUEPRINT_WEIGHTS,
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
    id: 'see3-mock-2',
    name: 'SEE3 Mock Exam 2 - Intensive',
    description: 'Advanced exam with emphasis on ethics scenarios, penalty calculations, and collection procedures.',
    section: 'SEE3',
    version: '2024',
    questionCount: 100,
    totalTime: 3.5 * 60 * 60,
    passingScore: 105,
    blueprintWeights: SEE3_BLUEPRINT_WEIGHTS,
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
    id: 'see3-mock-3',
    name: 'SEE3 Mock Exam 3 - Final Review',
    description: 'Final preparation exam ensuring mastery of representation standards and IRS procedures.',
    section: 'SEE3',
    version: '2024',
    questionCount: 100,
    totalTime: 3.5 * 60 * 60,
    passingScore: 105,
    blueprintWeights: SEE3_BLUEPRINT_WEIGHTS,
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
// All EA Mock Exams
// ============================================

export const ALL_EA_MOCK_EXAMS: EAMockExamConfig[] = [
  ...SEE1_MOCK_EXAMS,
  ...SEE2_MOCK_EXAMS,
  ...SEE3_MOCK_EXAMS,
];

// ============================================
// Helper Functions
// ============================================

/**
 * Get mock exams by section
 */
export function getEAMockExamsBySection(section: EASection): EAMockExamConfig[] {
  return ALL_EA_MOCK_EXAMS.filter(exam => exam.section === section);
}

/**
 * Get mock exam by ID
 */
export function getEAMockExamById(id: string): EAMockExamConfig | undefined {
  return ALL_EA_MOCK_EXAMS.find(exam => exam.id === id);
}

/**
 * Get blueprint weights for a section
 */
export function getEABlueprintWeights(section: EASection): EABlueprintWeight[] {
  return EA_BLUEPRINT_WEIGHTS[section];
}

/**
 * Calculate target question count per blueprint area
 * Based on the weight percentage and total question count
 */
export function calculateQuestionDistribution(
  section: EASection,
  totalQuestions: number = 100
): Record<string, number> {
  const weights = EA_BLUEPRINT_WEIGHTS[section];
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
export function getEAMockExamStats() {
  return {
    totalExams: ALL_EA_MOCK_EXAMS.length,
    bySection: {
      SEE1: SEE1_MOCK_EXAMS.length,
      SEE2: SEE2_MOCK_EXAMS.length,
      SEE3: SEE3_MOCK_EXAMS.length,
    },
    examDuration: '3.5 hours (210 minutes)',
    questionsPerExam: 100,
    passingScore: '105 scaled score',
  };
}

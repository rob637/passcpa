/**
 * CIA Mock Exam Configuration
 * 
 * Mock exams for the IIA Certified Internal Auditor (CIA) Exam
 * - Part 1: Essentials of Internal Auditing (125 questions, 2.5 hours)
 * - Part 2: Practice of Internal Auditing (100 questions, 2 hours)
 * - Part 3: Business Knowledge for Internal Auditing (100 questions, 2 hours)
 * 
 * Passing score: 600/750 (scaled)
 * Updated February 2026 to match official IIA CIA Content Specification Outlines
 */

import { CIASectionId } from '../../../courses/cia/config';

// ============================================
// CIA Exam Configuration Types
// ============================================

export interface CIAMockExamConfig {
  id: string;
  name: string;
  description: string;
  section: CIASectionId;
  version: '2024' | '2025' | '2026';
  questionCount: number;
  totalTime: number; // in seconds
  passingScore: number; // 600 out of 750
  blueprintWeights: CIABlueprintWeight[];
  questionSelection: CIAQuestionSelectionCriteria;
}

export interface CIABlueprintWeight {
  area: string;
  name: string;
  weight: number; // percentage (0-100)
  targetQuestions: number; // approximate questions from this area
  topics: string[];
}

export interface CIAQuestionSelectionCriteria {
  difficultyDistribution: {
    easy: number;
    medium: number;
    hard: number;
  };
  requireAllAreas: boolean;
  questionIds?: string[];
  excludeQuestionIds?: string[];
}

// ============================================
// CIA Blueprint Weights by Section
// ============================================

/**
 * CIA Part 1: Essentials of Internal Auditing
 * Based on IIA CIA Content Specification (2024-2026)
 */
export const CIA1_BLUEPRINT_WEIGHTS: CIABlueprintWeight[] = [
  {
    area: 'CIA1-I',
    name: 'Foundations of Internal Auditing',
    weight: 40,
    targetQuestions: 50,
    topics: ['Definition of Internal Auditing', 'Mission of Internal Audit', 'GIAS 2024', 'Core Principles', 'IPPF Framework'],
  },
  {
    area: 'CIA1-II',
    name: 'Independence and Objectivity',
    weight: 15,
    targetQuestions: 19,
    topics: ['Organizational Independence', 'Individual Objectivity', 'Impairments', 'Disclosure Requirements'],
  },
  {
    area: 'CIA1-III',
    name: 'Proficiency and Due Professional Care',
    weight: 15,
    targetQuestions: 19,
    topics: ['Competencies', 'Continuing Professional Development', 'Due Professional Care', 'Professional Skepticism'],
  },
  {
    area: 'CIA1-IV',
    name: 'Quality Assurance and Improvement Program',
    weight: 10,
    targetQuestions: 12,
    topics: ['QAIP Requirements', 'Internal Assessments', 'External Assessments', 'Conformance Reporting'],
  },
  {
    area: 'CIA1-V',
    name: 'Governance, Risk Management, and Control',
    weight: 20,
    targetQuestions: 25,
    topics: ['Governance Principles', 'Risk Management Frameworks', 'COSO ERM', 'Control Frameworks', 'Three Lines Model'],
  },
];

/**
 * CIA Part 2: Practice of Internal Auditing
 */
export const CIA2_BLUEPRINT_WEIGHTS: CIABlueprintWeight[] = [
  {
    area: 'CIA2-I',
    name: 'Managing the Internal Audit Activity',
    weight: 20,
    targetQuestions: 20,
    topics: ['Resource Planning', 'Coordination', 'CAE Responsibilities', 'Audit Plan Development'],
  },
  {
    area: 'CIA2-II',
    name: 'Planning the Engagement',
    weight: 20,
    targetQuestions: 20,
    topics: ['Engagement Objectives', 'Scope Determination', 'Risk Assessment', 'Work Program'],
  },
  {
    area: 'CIA2-III',
    name: 'Performing the Engagement',
    weight: 40,
    targetQuestions: 40,
    topics: ['Evidence Collection', 'Analytical Techniques', 'Sampling', 'Fraud Detection', 'Working Papers', 'Supervision'],
  },
  {
    area: 'CIA2-IV',
    name: 'Communicating Engagement Results',
    weight: 20,
    targetQuestions: 20,
    topics: ['Report Quality', 'Observations and Recommendations', 'Communication Process', 'Monitoring Actions'],
  },
];

/**
 * CIA Part 3: Business Knowledge for Internal Auditing
 */
export const CIA3_BLUEPRINT_WEIGHTS: CIABlueprintWeight[] = [
  {
    area: 'CIA3-I',
    name: 'Business Acumen',
    weight: 35,
    targetQuestions: 35,
    topics: ['Strategic Analysis', 'Organizational Behavior', 'Business Processes', 'ESG', 'Third-Party Risk'],
  },
  {
    area: 'CIA3-II',
    name: 'Information Security',
    weight: 25,
    targetQuestions: 25,
    topics: ['Cybersecurity Frameworks', 'Access Controls', 'Security Governance', 'Incident Response'],
  },
  {
    area: 'CIA3-III',
    name: 'Information Technology',
    weight: 20,
    targetQuestions: 20,
    topics: ['IT Governance', 'System Development', 'IT Operations', 'Emerging Technologies'],
  },
  {
    area: 'CIA3-IV',
    name: 'Financial Management',
    weight: 20,
    targetQuestions: 20,
    topics: ['Financial Statements', 'IFRS vs GAAP', 'Financial Analysis', 'Accounting Principles'],
  },
];

// Combined weights for convenience
export const CIA_BLUEPRINT_WEIGHTS: Record<CIASectionId, CIABlueprintWeight[]> = {
  CIA1: CIA1_BLUEPRINT_WEIGHTS,
  CIA2: CIA2_BLUEPRINT_WEIGHTS,
  CIA3: CIA3_BLUEPRINT_WEIGHTS,
};

// Legacy format for backwards compatibility
export const CIA_BLUEPRINT_WEIGHTS_LEGACY: Record<CIASectionId, Record<string, number>> = {
  CIA1: {
    'CIA1-I': 0.40,
    'CIA1-II': 0.15,
    'CIA1-III': 0.15,
    'CIA1-IV': 0.10,
    'CIA1-V': 0.20,
  },
  CIA2: {
    'CIA2-I': 0.20,
    'CIA2-II': 0.20,
    'CIA2-III': 0.40,
    'CIA2-IV': 0.20,
  },
  CIA3: {
    'CIA3-I': 0.35,
    'CIA3-II': 0.25,
    'CIA3-III': 0.20,
    'CIA3-IV': 0.20,
  },
};

// ============================================
// Mock Exam Configurations
// ============================================

const createDefaultQuestionSelection = (): CIAQuestionSelectionCriteria => ({
  difficultyDistribution: { easy: 30, medium: 50, hard: 20 },
  requireAllAreas: true,
});

/**
 * Part 1 Mock Exams
 */
export const CIA1_MOCK_EXAMS: CIAMockExamConfig[] = [
  {
    id: 'cia1-full-1',
    name: 'CIA Part 1 Full Exam #1',
    description: 'Complete 125-question exam simulation covering all Part 1 domains with emphasis on GIAS 2024',
    section: 'CIA1',
    version: '2026',
    questionCount: 125,
    totalTime: 150 * 60, // 2.5 hours
    passingScore: 600,
    blueprintWeights: CIA1_BLUEPRINT_WEIGHTS,
    questionSelection: createDefaultQuestionSelection(),
  },
  {
    id: 'cia1-half-1',
    name: 'CIA Part 1 Practice Exam',
    description: '60-question practice exam (2.5 questions per minute pace)',
    section: 'CIA1',
    version: '2026',
    questionCount: 60,
    totalTime: 75 * 60, // 75 minutes
    passingScore: 600,
    blueprintWeights: CIA1_BLUEPRINT_WEIGHTS,
    questionSelection: createDefaultQuestionSelection(),
  },
  {
    id: 'cia1-quick-1',
    name: 'CIA Part 1 Quick Quiz',
    description: '25-question rapid review',
    section: 'CIA1',
    version: '2026',
    questionCount: 25,
    totalTime: 30 * 60,
    passingScore: 600,
    blueprintWeights: CIA1_BLUEPRINT_WEIGHTS,
    questionSelection: { ...createDefaultQuestionSelection(), requireAllAreas: false },
  },
];

/**
 * Part 2 Mock Exams
 */
export const CIA2_MOCK_EXAMS: CIAMockExamConfig[] = [
  {
    id: 'cia2-full-1',
    name: 'CIA Part 2 Full Exam #1',
    description: 'Complete 100-question exam simulation with 40% focus on Performing the Engagement',
    section: 'CIA2',
    version: '2026',
    questionCount: 100,
    totalTime: 120 * 60, // 2 hours
    passingScore: 600,
    blueprintWeights: CIA2_BLUEPRINT_WEIGHTS,
    questionSelection: createDefaultQuestionSelection(),
  },
  {
    id: 'cia2-half-1',
    name: 'CIA Part 2 Practice Exam',
    description: '50-question practice exam',
    section: 'CIA2',
    version: '2026',
    questionCount: 50,
    totalTime: 60 * 60,
    passingScore: 600,
    blueprintWeights: CIA2_BLUEPRINT_WEIGHTS,
    questionSelection: createDefaultQuestionSelection(),
  },
  {
    id: 'cia2-quick-1',
    name: 'CIA Part 2 Quick Quiz',
    description: '25-question rapid review',
    section: 'CIA2',
    version: '2026',
    questionCount: 25,
    totalTime: 30 * 60,
    passingScore: 600,
    blueprintWeights: CIA2_BLUEPRINT_WEIGHTS,
    questionSelection: { ...createDefaultQuestionSelection(), requireAllAreas: false },
  },
];

/**
 * Part 3 Mock Exams
 */
export const CIA3_MOCK_EXAMS: CIAMockExamConfig[] = [
  {
    id: 'cia3-full-1',
    name: 'CIA Part 3 Full Exam #1',
    description: 'Complete 100-question exam with 35% focus on Business Acumen',
    section: 'CIA3',
    version: '2026',
    questionCount: 100,
    totalTime: 120 * 60, // 2 hours
    passingScore: 600,
    blueprintWeights: CIA3_BLUEPRINT_WEIGHTS,
    questionSelection: createDefaultQuestionSelection(),
  },
  {
    id: 'cia3-half-1',
    name: 'CIA Part 3 Practice Exam',
    description: '50-question practice exam',
    section: 'CIA3',
    version: '2026',
    questionCount: 50,
    totalTime: 60 * 60,
    passingScore: 600,
    blueprintWeights: CIA3_BLUEPRINT_WEIGHTS,
    questionSelection: createDefaultQuestionSelection(),
  },
  {
    id: 'cia3-quick-1',
    name: 'CIA Part 3 Quick Quiz',
    description: '25-question rapid review',
    section: 'CIA3',
    version: '2026',
    questionCount: 25,
    totalTime: 30 * 60,
    passingScore: 600,
    blueprintWeights: CIA3_BLUEPRINT_WEIGHTS,
    questionSelection: { ...createDefaultQuestionSelection(), requireAllAreas: false },
  },
];

// All mock exams combined
export const ALL_CIA_MOCK_EXAMS: CIAMockExamConfig[] = [
  ...CIA1_MOCK_EXAMS,
  ...CIA2_MOCK_EXAMS,
  ...CIA3_MOCK_EXAMS,
];

// ============================================
// Helper Functions
// ============================================

/**
 * Get mock exams by section
 */
export function getCIAMockExamsBySection(section: CIASectionId): CIAMockExamConfig[] {
  return ALL_CIA_MOCK_EXAMS.filter(exam => exam.section === section);
}

/**
 * Get a specific mock exam by ID
 */
export function getCIAMockExamById(id: string): CIAMockExamConfig | undefined {
  return ALL_CIA_MOCK_EXAMS.find(exam => exam.id === id);
}

/**
 * Get blueprint weights for a section
 */
export function getCIABlueprintWeights(section: CIASectionId): CIABlueprintWeight[] {
  return CIA_BLUEPRINT_WEIGHTS[section] || [];
}

/**
 * Calculate question distribution based on blueprint weights
 */
export function calculateQuestionDistribution(
  section: CIASectionId,
  totalQuestions: number
): Record<string, number> {
  const weights = getCIABlueprintWeights(section);
  const distribution: Record<string, number> = {};
  
  let allocated = 0;
  weights.forEach((weight, index) => {
    if (index === weights.length - 1) {
      // Last area gets remaining questions
      distribution[weight.area] = totalQuestions - allocated;
    } else {
      const count = Math.round((weight.weight / 100) * totalQuestions);
      distribution[weight.area] = count;
      allocated += count;
    }
  });
  
  return distribution;
}

/**
 * Get section exam statistics
 */
export function getCIAMockExamStats(section: CIASectionId): {
  standardTime: number;
  questionCount: number;
  passingScore: number;
} {
  const configs = {
    CIA1: { standardTime: 150, questionCount: 125, passingScore: 600 },
    CIA2: { standardTime: 120, questionCount: 100, passingScore: 600 },
    CIA3: { standardTime: 120, questionCount: 100, passingScore: 600 },
  };
  return configs[section];
}

/**
 * Legacy function for backwards compatibility
 */
export function getCIAMockExamConfig(mode: string, section: CIASectionId): CIAMockExamConfig {
  const exams = getCIAMockExamsBySection(section);
  
  if (mode === 'full') {
    return exams.find(e => e.id.includes('full')) || exams[0];
  }
  if (mode === 'quick') {
    return exams.find(e => e.id.includes('quick')) || exams[exams.length - 1];
  }
  
  return exams.find(e => e.id.includes('half')) || exams[0];
}

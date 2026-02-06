/**
 * EA Mock Exams - Central Export
 * 
 * Provides access to EA mock exam configurations and utilities.
 */

// Configuration and types
export {
  SEE1_BLUEPRINT_WEIGHTS,
  SEE2_BLUEPRINT_WEIGHTS,
  SEE3_BLUEPRINT_WEIGHTS,
  EA_BLUEPRINT_WEIGHTS,
  SEE1_MOCK_EXAMS,
  SEE2_MOCK_EXAMS,
  SEE3_MOCK_EXAMS,
  ALL_EA_MOCK_EXAMS,
  getEAMockExamsBySection,
  getEAMockExamById,
  getEABlueprintWeights,
  calculateQuestionDistribution,
  getEAMockExamStats,
} from './config';

export type {
  EAMockExamConfig,
  EABlueprintWeight,
  EAQuestionSelectionCriteria,
} from './config';

// Generator and scoring
export {
  selectQuestionsForExam,
  generateEAMockExam,
  calculateEAExamResult,
  identifyWeakAreas,
  generateStudyRecommendations,
} from './generator';

export type {
  GeneratedEAMockExam,
  EAMockExamResult,
  BlueprintPerformance,
  DifficultyPerformance,
  ReviewQuestion,
} from './generator';

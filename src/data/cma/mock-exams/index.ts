/**
 * CMA Mock Exams Index
 * 
 * Exports all CMA mock exam configuration and generation functions
 */

// Configuration exports
export type {
  CMAMockExamConfig,
  CMABlueprintWeight,
  CMAQuestionSelectionCriteria,
} from './config';

export {
  CMA1_BLUEPRINT_WEIGHTS,
  CMA2_BLUEPRINT_WEIGHTS,
  CMA_BLUEPRINT_WEIGHTS,
  CMA1_MOCK_EXAMS,
  CMA2_MOCK_EXAMS,
  ALL_CMA_MOCK_EXAMS,
  getCMAMockExamsBySection,
  getCMAMockExamById,
  getCMABlueprintWeights,
  calculateQuestionDistribution,
  getCMAMockExamStats,
} from './config';

// Generator exports
export type {
  GeneratedCMAMockExam,
  CMAMockExamResult,
  BlueprintPerformance,
  DifficultyPerformance,
  ReviewQuestion,
} from './generator';

export {
  selectQuestionsForExam,
  generateCMAMockExam,
  calculateCMAExamResult,
  identifyWeakAreas,
  generateStudyRecommendations,
} from './generator';

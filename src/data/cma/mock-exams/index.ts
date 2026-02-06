/**
 * CMA Mock Exams Index
 * 
 * Exports all CMA mock exam configuration and generation functions
 */

// Configuration exports
export {
  CMAMockExamConfig,
  CMABlueprintWeight,
  CMAQuestionSelectionCriteria,
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
export {
  GeneratedCMAMockExam,
  CMAMockExamResult,
  BlueprintPerformance,
  DifficultyPerformance,
  ReviewQuestion,
  selectQuestionsForExam,
  generateCMAMockExam,
  calculateCMAExamResult,
  identifyWeakAreas,
  generateStudyRecommendations,
} from './generator';

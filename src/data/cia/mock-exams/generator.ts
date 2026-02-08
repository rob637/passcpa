/**
 * CIA Mock Exam Generator
 * 
 * Generates mock exams by selecting questions according to
 * blueprint weights and difficulty distribution.
 */

import { Question } from '../../../types';
import { CIASectionId } from '../../../courses/cia/config';
import {
  CIAMockExamConfig,
  getCIAMockExamById,
  calculateQuestionDistribution,
} from './config';

// Type alias for CIA questions
type CIAQuestion = Question & { section: string };

// ============================================
// Generated Exam Types
// ============================================

export interface GeneratedCIAMockExam {
  config: CIAMockExamConfig;
  questions: CIAQuestion[];
  questionOrder: string[]; // Randomized question IDs
  startedAt?: Date;
  completedAt?: Date;
  answers: Record<string, string>; // questionId -> selected answer index
  flagged: Set<string>; // Flagged for review
  timeRemaining: number; // in seconds
}

export interface CIAMockExamResult {
  examId: string;
  section: CIASectionId;
  score: number; // Raw percentage
  scaledScore: number; // Out of 750
  passed: boolean;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unanswered: number;
  timeUsed: number; // in seconds
  completedAt: Date;
  byBlueprint: BlueprintPerformance[];
  byDifficulty: DifficultyPerformance;
  reviewQuestions: ReviewQuestion[];
}

export interface BlueprintPerformance {
  area: string;
  name: string;
  correct: number;
  total: number;
  percentage: number;
}

export interface DifficultyPerformance {
  easy: { correct: number; total: number; percentage: number };
  medium: { correct: number; total: number; percentage: number };
  hard: { correct: number; total: number; percentage: number };
}

export interface ReviewQuestion {
  questionId: string;
  question: string;
  userAnswer: string | null;
  correctAnswer: string;
  correctAnswerIndex: number;
  isCorrect: boolean;
  blueprintArea: string;
  topic: string;
  explanation: string;
}

// ============================================
// Utility Functions
// ============================================

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Select questions based on difficulty distribution
 */
function selectByDifficulty(
  questions: CIAQuestion[],
  targetCount: number,
  distribution: { easy: number; medium: number; hard: number },
  excludeIds: Set<string>
): CIAQuestion[] {
  const available = questions.filter(q => !excludeIds.has(q.id));
  
  const easyQuestions = available.filter(q => q.difficulty === 'easy');
  const mediumQuestions = available.filter(q => q.difficulty === 'medium');
  const hardQuestions = available.filter(q => q.difficulty === 'hard');
  
  const easyCount = Math.round((distribution.easy / 100) * targetCount);
  const hardCount = Math.round((distribution.hard / 100) * targetCount);
  const mediumCount = targetCount - easyCount - hardCount;
  
  const selected: CIAQuestion[] = [];
  
  // Select from each difficulty
  shuffleArray(easyQuestions).slice(0, easyCount).forEach(q => selected.push(q));
  shuffleArray(mediumQuestions).slice(0, mediumCount).forEach(q => selected.push(q));
  shuffleArray(hardQuestions).slice(0, hardCount).forEach(q => selected.push(q));
  
  // Fill remaining from any difficulty
  if (selected.length < targetCount) {
    const remaining = available.filter(q => !selected.includes(q));
    shuffleArray(remaining).slice(0, targetCount - selected.length).forEach(q => selected.push(q));
  }
  
  return selected;
}

// ============================================
// Question Selection
// ============================================

/**
 * Select questions for a mock exam based on configuration
 */
export function selectQuestionsForExam(
  config: CIAMockExamConfig,
  questionPool: CIAQuestion[],
  excludeIds: string[] = []
): CIAQuestion[] {
  const { section, questionCount, blueprintWeights, questionSelection } = config;
  const { difficultyDistribution, requireAllAreas } = questionSelection;

  // Filter to section questions not in exclude list
  const availableQuestions = questionPool.filter(
    q => q.section === section && !excludeIds.includes(q.id)
  );

  if (availableQuestions.length < questionCount) {
    console.warn(
      `Not enough questions available. Need ${questionCount}, have ${availableQuestions.length}`
    );
  }

  // Calculate target questions per blueprint area
  const areaDistribution = calculateQuestionDistribution(section, questionCount);

  // Group questions by blueprint area
  const questionsByArea: Record<string, CIAQuestion[]> = {};
  blueprintWeights.forEach(weight => {
    questionsByArea[weight.area] = availableQuestions.filter(
      q => q.blueprintArea === weight.area
    );
  });

  // Select questions ensuring blueprint coverage
  const selectedQuestions: CIAQuestion[] = [];
  const selectedIds = new Set<string>();

  // First pass: ensure minimum from each area (if required)
  if (requireAllAreas) {
    blueprintWeights.forEach(weight => {
      const targetCount = areaDistribution[weight.area];
      const areaQuestions = questionsByArea[weight.area] || [];
      
      // Shuffle available questions for this area
      const shuffled = shuffleArray([...areaQuestions]);
      
      // Select based on difficulty distribution
      const toSelect = selectByDifficulty(
        shuffled,
        targetCount,
        difficultyDistribution,
        selectedIds
      );
      
      toSelect.forEach(q => {
        selectedQuestions.push(q);
        selectedIds.add(q.id);
      });
    });
  }

  // Fill remaining slots if needed
  const remaining = questionCount - selectedQuestions.length;
  if (remaining > 0) {
    const unselectedQuestions = availableQuestions.filter(
      q => !selectedIds.has(q.id)
    );
    const shuffled = shuffleArray(unselectedQuestions);
    const additional = shuffled.slice(0, remaining);
    selectedQuestions.push(...additional);
  }

  // Final shuffle for random order
  return shuffleArray(selectedQuestions).slice(0, questionCount);
}

// ============================================
// Exam Generation
// ============================================

/**
 * Generate a mock exam from a config ID
 */
export function generateCIAMockExam(
  configId: string,
  questionPool: CIAQuestion[]
): GeneratedCIAMockExam | null {
  const config = getCIAMockExamById(configId);
  
  if (!config) {
    console.error(`Mock exam config not found: ${configId}`);
    return null;
  }

  const questions = selectQuestionsForExam(config, questionPool);

  return {
    config,
    questions,
    questionOrder: questions.map(q => q.id),
    answers: {},
    flagged: new Set(),
    timeRemaining: config.totalTime,
  };
}

/**
 * Generate a mock exam from a config object directly
 */
export function generateCIAMockExamFromConfig(
  config: CIAMockExamConfig,
  questionPool: CIAQuestion[]
): GeneratedCIAMockExam {
  const questions = selectQuestionsForExam(config, questionPool);

  return {
    config,
    questions,
    questionOrder: questions.map(q => q.id),
    answers: {},
    flagged: new Set(),
    timeRemaining: config.totalTime,
  };
}

// ============================================
// Results Calculation
// ============================================

/**
 * Calculate exam results
 */
export function calculateCIAExamResult(
  exam: GeneratedCIAMockExam,
  timeUsed: number
): CIAMockExamResult {
  const { config, questions, answers } = exam;

  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let unanswered = 0;

  // Performance by blueprint area
  const blueprintPerf: Record<string, { correct: number; total: number; name: string }> = {};
  config.blueprintWeights.forEach(weight => {
    blueprintPerf[weight.area] = { correct: 0, total: 0, name: weight.name };
  });

  // Performance by difficulty
  const diffPerf = {
    easy: { correct: 0, total: 0 },
    medium: { correct: 0, total: 0 },
    hard: { correct: 0, total: 0 },
  };

  // Review questions
  const reviewQuestions: ReviewQuestion[] = [];

  questions.forEach(question => {
    const userAnswer = answers[question.id];
    const correctAnswerIndex = question.correctAnswer;
    const isCorrect = userAnswer !== undefined && parseInt(userAnswer) === correctAnswerIndex;

    // Count overall performance
    if (userAnswer === undefined) {
      unanswered++;
    } else if (isCorrect) {
      correctAnswers++;
    } else {
      incorrectAnswers++;
    }

    // Count by blueprint area
    const area = question.blueprintArea || config.blueprintWeights[0]?.area || 'unknown';
    if (blueprintPerf[area]) {
      blueprintPerf[area].total++;
      if (isCorrect) blueprintPerf[area].correct++;
    }

    // Count by difficulty
    const diff = question.difficulty || 'medium';
    if (diffPerf[diff as keyof typeof diffPerf]) {
      diffPerf[diff as keyof typeof diffPerf].total++;
      if (isCorrect) diffPerf[diff as keyof typeof diffPerf].correct++;
    }

    // Add to review
    reviewQuestions.push({
      questionId: question.id,
      question: question.question,
      userAnswer: userAnswer !== undefined ? question.options[parseInt(userAnswer)] : null,
      correctAnswer: question.options[correctAnswerIndex],
      correctAnswerIndex,
      isCorrect,
      blueprintArea: area,
      topic: question.topic || 'General',
      explanation: question.explanation || '',
    });
  });

  // Calculate scores
  const rawScore = (correctAnswers / questions.length) * 100;
  // CIA uses a scaled score out of 750, passing is 600
  // Approximate scaling: 75% correct ≈ 600, linear interpolation
  const scaledScore = Math.round(200 + (rawScore / 100) * 550);
  const passed = scaledScore >= 600;

  // Format blueprint performance
  const byBlueprint: BlueprintPerformance[] = Object.entries(blueprintPerf)
    .filter(([, data]) => data.total > 0)
    .map(([area, data]) => ({
      area,
      name: data.name,
      correct: data.correct,
      total: data.total,
      percentage: Math.round((data.correct / data.total) * 100),
    }));

  // Format difficulty performance
  const byDifficulty: DifficultyPerformance = {
    easy: {
      ...diffPerf.easy,
      percentage: diffPerf.easy.total > 0
        ? Math.round((diffPerf.easy.correct / diffPerf.easy.total) * 100)
        : 0,
    },
    medium: {
      ...diffPerf.medium,
      percentage: diffPerf.medium.total > 0
        ? Math.round((diffPerf.medium.correct / diffPerf.medium.total) * 100)
        : 0,
    },
    hard: {
      ...diffPerf.hard,
      percentage: diffPerf.hard.total > 0
        ? Math.round((diffPerf.hard.correct / diffPerf.hard.total) * 100)
        : 0,
    },
  };

  return {
    examId: config.id,
    section: config.section,
    score: Math.round(rawScore),
    scaledScore,
    passed,
    totalQuestions: questions.length,
    correctAnswers,
    incorrectAnswers,
    unanswered,
    timeUsed,
    completedAt: new Date(),
    byBlueprint,
    byDifficulty,
    reviewQuestions,
  };
}

// ============================================
// Study Recommendations
// ============================================

/**
 * Identify weak areas from exam results
 */
export function identifyWeakAreas(result: CIAMockExamResult): BlueprintPerformance[] {
  return result.byBlueprint
    .filter(area => area.percentage < 70)
    .sort((a, b) => a.percentage - b.percentage);
}

/**
 * Generate study recommendations based on results
 */
export function generateStudyRecommendations(result: CIAMockExamResult): string[] {
  const recommendations: string[] = [];
  const weakAreas = identifyWeakAreas(result);

  if (weakAreas.length === 0) {
    recommendations.push('Strong performance across all areas! Continue with practice exams.');
  } else {
    weakAreas.forEach(area => {
      recommendations.push(`Focus on ${area.name} (${area.percentage}% - needs improvement)`);
    });
  }

  // Difficulty-based recommendations
  if (result.byDifficulty.hard.percentage < 50) {
    recommendations.push('Review advanced concepts - hard questions need work');
  }

  if (result.unanswered > 0) {
    recommendations.push(`Pace yourself better - ${result.unanswered} questions left unanswered`);
  }

  return recommendations;
}

/**
 * EA Mock Exam Generator
 * 
 * Generates mock exams by selecting questions according to
 * blueprint weights and difficulty distribution.
 */

import { EASection, Question } from '../../../types';
import {
  EAMockExamConfig,
  getEAMockExamById,
  getEABlueprintWeights,
  calculateQuestionDistribution,
} from './config';

// Type alias for EA questions (subset of Question with EASection)
type EAQuestion = Question & { section: EASection };

// ============================================
// Generated Exam Types
// ============================================

export interface GeneratedEAMockExam {
  config: EAMockExamConfig;
  questions: EAQuestion[];
  questionOrder: string[]; // Randomized question IDs
  startedAt?: Date;
  completedAt?: Date;
  answers: Record<string, string>; // questionId -> selected answer
  flagged: Set<string>; // Flagged for review
  timeRemaining: number; // in seconds
}

export interface EAMockExamResult {
  examId: string;
  section: EASection;
  score: number;
  scaledScore: number;
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
  userAnswer: string | null;
  correctAnswer: string;
  isCorrect: boolean;
  blueprintArea: string;
  topic: string;
  explanation: string;
}

// ============================================
// Question Selection
// ============================================

/**
 * Select questions for a mock exam based on configuration
 */
export function selectQuestionsForExam(
  config: EAMockExamConfig,
  questionPool: EAQuestion[],
  excludeIds: string[] = []
): EAQuestion[] {
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
  const questionsByArea: Record<string, EAQuestion[]> = {};
  blueprintWeights.forEach(weight => {
    questionsByArea[weight.area] = availableQuestions.filter(
      q => q.blueprintArea === weight.area
    );
  });

  // Select questions ensuring blueprint coverage
  const selectedQuestions: EAQuestion[] = [];
  const selectedIds = new Set<string>();

  // First pass: ensure minimum from each area
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

  // Randomize final order
  return shuffleArray(selectedQuestions).slice(0, questionCount);
}

/**
 * Select questions respecting difficulty distribution
 */
function selectByDifficulty(
  questions: EAQuestion[],
  targetCount: number,
  distribution: { easy: number; medium: number; hard: number },
  excludeIds: Set<string>
): EAQuestion[] {
  const available = questions.filter(q => !excludeIds.has(q.id));
  
  const easyTarget = Math.round((distribution.easy / 100) * targetCount);
  const mediumTarget = Math.round((distribution.medium / 100) * targetCount);
  const hardTarget = targetCount - easyTarget - mediumTarget;

  const byDifficulty = {
    easy: available.filter(q => q.difficulty === 'easy'),
    medium: available.filter(q => q.difficulty === 'medium'),
    hard: available.filter(q => q.difficulty === 'hard'),
  };

  const selected: EAQuestion[] = [];

  // Select from each difficulty level
  selected.push(...byDifficulty.easy.slice(0, easyTarget));
  selected.push(...byDifficulty.medium.slice(0, mediumTarget));
  selected.push(...byDifficulty.hard.slice(0, hardTarget));

  // Fill any remaining from available
  const usedIds = new Set(selected.map(q => q.id));
  const remaining = targetCount - selected.length;
  if (remaining > 0) {
    const unused = available.filter(q => !usedIds.has(q.id));
    selected.push(...unused.slice(0, remaining));
  }

  return selected;
}

/**
 * Fisher-Yates shuffle
 */
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// ============================================
// Exam Generation
// ============================================

/**
 * Generate a new mock exam instance
 */
export function generateEAMockExam(
  examId: string,
  questionPool: EAQuestion[],
  excludeQuestionIds: string[] = []
): GeneratedEAMockExam | null {
  const config = getEAMockExamById(examId);
  if (!config) {
    console.error(`Mock exam config not found: ${examId}`);
    return null;
  }

  const questions = selectQuestionsForExam(config, questionPool, excludeQuestionIds);

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
// Scoring
// ============================================

/**
 * Calculate exam result from answers
 */
export function calculateEAExamResult(
  exam: GeneratedEAMockExam,
  startTime: Date,
  endTime: Date
): EAMockExamResult {
  const { config, questions, answers } = exam;
  
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;
  
  const byBlueprint: Record<string, { correct: number; total: number; name: string }> = {};
  const byDifficulty = {
    easy: { correct: 0, total: 0 },
    medium: { correct: 0, total: 0 },
    hard: { correct: 0, total: 0 },
  };
  
  const reviewQuestions: ReviewQuestion[] = [];

  // Initialize blueprint tracking
  const blueprintWeights = getEABlueprintWeights(config.section);
  blueprintWeights.forEach(weight => {
    byBlueprint[weight.area] = { correct: 0, total: 0, name: weight.name };
  });

  // Score each question
  questions.forEach(question => {
    const userAnswer = answers[question.id];
    // correctAnswer is index (number), userAnswer is the answer text or index as string
    const correctAnswerIndex = question.correctAnswer;
    const isCorrect = userAnswer !== undefined && 
      (Number(userAnswer) === correctAnswerIndex || 
       userAnswer === question.options[correctAnswerIndex]);
    
    // Update totals
    if (!userAnswer) {
      unanswered++;
    } else if (isCorrect) {
      correct++;
    } else {
      incorrect++;
    }

    // Update blueprint stats
    const blueprintArea = question.blueprintArea;
    if (blueprintArea && byBlueprint[blueprintArea]) {
      byBlueprint[blueprintArea].total++;
      if (isCorrect) {
        byBlueprint[blueprintArea].correct++;
      }
    }

    // Update difficulty stats
    const diff = question.difficulty as keyof typeof byDifficulty;
    if (byDifficulty[diff]) {
      byDifficulty[diff].total++;
      if (isCorrect) {
        byDifficulty[diff].correct++;
      }
    }

    // Add to review if incorrect or unanswered
    if (!isCorrect) {
      reviewQuestions.push({
        questionId: question.id,
        userAnswer: userAnswer || null,
        correctAnswer: question.options[question.correctAnswer],
        isCorrect: false,
        blueprintArea: question.blueprintArea || '',
        topic: question.topic,
        explanation: question.explanation,
      });
    }
  });

  // Calculate scores
  const rawPercentage = (correct / questions.length) * 100;
  
  // EA uses scaled scoring: 40-130, passing is 105
  // Rough approximation: 70% correct ≈ 105 scaled
  const scaledScore = Math.round(40 + (rawPercentage / 100) * 90);
  const passed = scaledScore >= config.passingScore;

  // Calculate time used
  const timeUsed = Math.round((endTime.getTime() - startTime.getTime()) / 1000);

  return {
    examId: config.id,
    section: config.section,
    score: rawPercentage,
    scaledScore,
    passed,
    totalQuestions: questions.length,
    correctAnswers: correct,
    incorrectAnswers: incorrect,
    unanswered,
    timeUsed,
    completedAt: endTime,
    byBlueprint: Object.entries(byBlueprint).map(([area, stats]) => ({
      area,
      name: stats.name,
      correct: stats.correct,
      total: stats.total,
      percentage: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
    })),
    byDifficulty: {
      easy: {
        ...byDifficulty.easy,
        percentage: byDifficulty.easy.total > 0
          ? Math.round((byDifficulty.easy.correct / byDifficulty.easy.total) * 100)
          : 0,
      },
      medium: {
        ...byDifficulty.medium,
        percentage: byDifficulty.medium.total > 0
          ? Math.round((byDifficulty.medium.correct / byDifficulty.medium.total) * 100)
          : 0,
      },
      hard: {
        ...byDifficulty.hard,
        percentage: byDifficulty.hard.total > 0
          ? Math.round((byDifficulty.hard.correct / byDifficulty.hard.total) * 100)
          : 0,
      },
    },
    reviewQuestions,
  };
}

// ============================================
// Performance Analysis
// ============================================

/**
 * Identify weak areas based on exam result
 */
export function identifyWeakAreas(result: EAMockExamResult): BlueprintPerformance[] {
  // Areas below 70% are considered weak
  return result.byBlueprint
    .filter(area => area.percentage < 70)
    .sort((a, b) => a.percentage - b.percentage);
}

/**
 * Generate study recommendations based on performance
 */
export function generateStudyRecommendations(
  result: EAMockExamResult
): string[] {
  const recommendations: string[] = [];
  const weakAreas = identifyWeakAreas(result);

  if (weakAreas.length > 0) {
    recommendations.push(
      `Focus on: ${weakAreas.map(a => a.name).join(', ')}`
    );
  }

  if (result.byDifficulty.hard.percentage < 50) {
    recommendations.push('Practice more challenging questions to build exam readiness');
  }

  if (result.unanswered > 0) {
    recommendations.push(`Answer all questions - ${result.unanswered} were left blank`);
  }

  if (result.timeUsed > result.totalQuestions * 120) {
    recommendations.push('Work on time management - aim for ~2 minutes per question');
  }

  if (!result.passed) {
    const pointsNeeded = 105 - result.scaledScore;
    recommendations.push(
      `Need approximately ${pointsNeeded} more scaled points to pass`
    );
  }

  return recommendations;
}

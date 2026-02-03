/**
 * Exam Readiness Calculator
 * 
 * Calculates a student's readiness score for the CPA exam based on:
 * - MCQ Accuracy (25%): Multiple choice question accuracy
 * - TBS Practice (15%): Task-based simulation completion
 * - Coverage (20%): Number of topics practiced
 * - Volume (20%): Total questions + TBS attempted
 * - Lessons (20%): Lesson completion progress
 */

export interface ReadinessData {
  overall: number;
  breakdown: {
    accuracy: number;
    coverage: number;
    volume: number;
    lessons: number;
    tbs: number;
  };
  status: 'ready' | 'almost' | 'more-study';
}

export interface TopicStat {
  id: string;
  topic: string;
  accuracy: number;
  questions: number;
}

export interface StudyStats {
  totalQuestions: number;
  correctAnswers?: number;
  accuracy: number;
  lessonsCompleted?: number;
  totalLessons?: number;
  tbsCompleted?: number;
  totalTbs?: number;
}

/**
 * Calculate exam readiness score
 * 
 * @param stats - Overall study statistics
 * @param topicPerformance - Array of topic performance data
 * @param lessonsCompleted - Number of lessons completed
 * @param totalLessons - Total number of lessons available
 * @param tbsCompleted - Number of TBS completed (optional)
 * @param totalTbs - Total number of TBS available (optional, defaults to 20)
 * @returns ReadinessData with overall score, breakdown, and status
 */
export const calculateExamReadiness = (
  stats: StudyStats,
  topicPerformance: TopicStat[],
  lessonsCompleted: number,
  totalLessons: number,
  tbsCompleted: number = 0,
  totalTbs: number = 20
): ReadinessData => {
  // Weights for different factors (total = 100%)
  const weights = {
    accuracy: 0.25, // MCQ accuracy
    tbs: 0.15,      // TBS practice
    coverage: 0.20, // Topics covered
    volume: 0.20,   // Questions + TBS attempted
    lessons: 0.20,  // Lesson progress
  };

  // Calculate scores (0-100)
  // Accuracy: 80% accuracy = 100 score (scaled by 1.25)
  const accuracyScore = Math.min(100, (stats.accuracy || 0) * 1.25);
  
  // TBS: Based on TBS completed vs expected (20 TBS = 100%)
  const tbsScore = totalTbs > 0 
    ? Math.min(100, (tbsCompleted / totalTbs) * 100) 
    : (tbsCompleted >= 10 ? 100 : (tbsCompleted / 10) * 100);
  
  // Coverage: Based on topics practiced vs expected (15 is baseline)
  const coverageScore = Math.min(100, (topicPerformance.length / 15) * 100);
  
  // Volume: 500 questions + 20 TBS = 100% (combined benchmark)
  const volumeTarget = 500;
  const volumeScore = Math.min(100, ((stats.totalQuestions + tbsCompleted * 10) / volumeTarget) * 100);
  
  // Lessons: Lesson completion percentage
  const lessonsScore = totalLessons > 0 ? (lessonsCompleted / totalLessons) * 100 : 0;

  // Calculate weighted overall score
  const overallReadiness = Math.round(
    accuracyScore * weights.accuracy +
    tbsScore * weights.tbs +
    coverageScore * weights.coverage +
    volumeScore * weights.volume +
    lessonsScore * weights.lessons
  );

  // Determine status based on overall score
  let status: 'ready' | 'almost' | 'more-study';
  if (overallReadiness >= 80) {
    status = 'ready';
  } else if (overallReadiness >= 60) {
    status = 'almost';
  } else {
    status = 'more-study';
  }

  return {
    overall: overallReadiness,
    breakdown: {
      accuracy: Math.round(accuracyScore),
      coverage: Math.round(coverageScore),
      volume: Math.round(volumeScore),
      lessons: Math.round(lessonsScore),
      tbs: Math.round(tbsScore),
    },
    status,
  };
};

/**
 * Get status display text
 */
export const getStatusText = (status: ReadinessData['status']): string => {
  switch (status) {
    case 'ready':
      return 'Exam Ready!';
    case 'almost':
      return 'Almost There';
    default:
      return 'Keep Studying';
  }
};

/**
 * Get status color class
 */
export const getStatusColor = (status: ReadinessData['status']): string => {
  switch (status) {
    case 'ready':
      return 'text-success-600';
    case 'almost':
      return 'text-warning-600';
    default:
      return 'text-primary-600';
  }
};

/**
 * Get status background color class
 */
export const getStatusBgColor = (status: ReadinessData['status']): string => {
  switch (status) {
    case 'ready':
      return 'bg-success-50 border-success-200';
    case 'almost':
      return 'bg-warning-50 border-warning-200';
    default:
      return 'bg-primary-50 border-primary-200';
  }
};

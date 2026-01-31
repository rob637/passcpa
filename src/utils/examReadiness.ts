/**
 * Exam Readiness Calculator
 * 
 * Calculates a student's readiness score for the CPA exam based on:
 * - Accuracy (35%): Overall question accuracy
 * - Coverage (25%): Number of topics practiced
 * - Volume (20%): Total questions attempted
 * - Consistency (20%): Lesson completion progress
 */

export interface ReadinessData {
  overall: number;
  breakdown: {
    accuracy: number;
    coverage: number;
    volume: number;
    consistency: number;
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
}

/**
 * Calculate exam readiness score
 * 
 * @param stats - Overall study statistics
 * @param topicPerformance - Array of topic performance data
 * @param lessonsCompleted - Number of lessons completed
 * @param totalLessons - Total number of lessons available
 * @returns ReadinessData with overall score, breakdown, and status
 */
export const calculateExamReadiness = (
  stats: StudyStats,
  topicPerformance: TopicStat[],
  lessonsCompleted: number,
  totalLessons: number
): ReadinessData => {
  // Weights for different factors
  const weights = {
    accuracy: 0.35, // Overall accuracy - most important
    coverage: 0.25, // Topics covered
    volume: 0.2,    // Questions attempted
    consistency: 0.2, // Lesson progress
  };

  // Calculate scores (0-100)
  // Accuracy: 80% accuracy = 100 score (scaled by 1.25)
  const accuracyScore = Math.min(100, (stats.accuracy || 0) * 1.25);
  
  // Coverage: Based on topics practiced vs expected (15 is baseline)
  const coverageScore = Math.min(100, (topicPerformance.length / 15) * 100);
  
  // Volume: 500 questions = 100% (good benchmark for exam readiness)
  const volumeScore = Math.min(100, (stats.totalQuestions / 500) * 100);
  
  // Consistency: Lesson completion percentage
  const consistencyScore = totalLessons > 0 ? (lessonsCompleted / totalLessons) * 100 : 0;

  // Calculate weighted overall score
  const overallReadiness = Math.round(
    accuracyScore * weights.accuracy +
    coverageScore * weights.coverage +
    volumeScore * weights.volume +
    consistencyScore * weights.consistency
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
      consistency: Math.round(consistencyScore),
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

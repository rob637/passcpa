/**
 * Exam Readiness Calculator
 * 
 * Calculates a student's readiness score for certification exams based on:
 * - MCQ Accuracy: Multiple choice question accuracy (weight varies by exam)
 * - TBS Practice: Task-based simulation completion (0% for exams without TBS)
 * - Coverage: Number of topics practiced
 * - Volume: Total questions + TBS attempted
 * - Lessons: Lesson completion progress
 * 
 * Weights are dynamically calculated based on whether the exam has TBS:
 * - With TBS (CPA): MCQ 25%, TBS 15%, Coverage 20%, Volume 20%, Lessons 20%
 * - Without TBS (EA): MCQ 40%, Coverage 20%, Volume 20%, Lessons 20%
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

export interface ReadinessOptions {
  /** Whether this exam has TBS (task-based simulations). Defaults to true for backwards compatibility. */
  hasTBS?: boolean;
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
 * @param options - Course-specific options like hasTBS
 * @returns ReadinessData with overall score, breakdown, and status
 */
export const calculateExamReadiness = (
  stats: StudyStats,
  topicPerformance: TopicStat[],
  lessonsCompleted: number,
  totalLessons: number,
  tbsCompleted: number = 0,
  totalTbs: number = 20,
  options: ReadinessOptions = {}
): ReadinessData => {
  // Default to having TBS for backwards compatibility (CPA)
  const hasTBS = options.hasTBS ?? true;
  
  // Weights for different factors (total = 100%)
  // If no TBS, redistribute TBS weight to MCQ accuracy
  const weights = hasTBS 
    ? {
        accuracy: 0.25, // MCQ accuracy
        tbs: 0.15,      // TBS practice
        coverage: 0.20, // Topics covered
        volume: 0.20,   // Questions + TBS attempted
        lessons: 0.20,  // Lesson progress
      }
    : {
        accuracy: 0.40, // MCQ accuracy (absorbs TBS weight)
        tbs: 0.00,      // No TBS for this exam
        coverage: 0.20, // Topics covered
        volume: 0.20,   // Questions attempted
        lessons: 0.20,  // Lesson progress
      };

  // Calculate scores (0-100)
  // Accuracy: 80% accuracy = 100 score (scaled by 1.25)
  const accuracyScore = Math.min(100, (stats.accuracy || 0) * 1.25);
  
  // TBS: Based on TBS completed vs expected (20 TBS = 100%)
  // For non-TBS exams, this will be 0 but weight is also 0 so it doesn't matter
  const tbsScore = hasTBS
    ? (totalTbs > 0 
        ? Math.min(100, (tbsCompleted / totalTbs) * 100) 
        : (tbsCompleted >= 10 ? 100 : (tbsCompleted / 10) * 100))
    : 0;
  
  // Coverage: Based on topics practiced vs expected (15 is baseline)
  const coverageScore = Math.min(100, (topicPerformance.length / 15) * 100);
  
  // Volume: For TBS exams: 500 questions + 20 TBS = 100%
  // For non-TBS exams: 500 questions = 100% (no TBS component)
  const volumeTarget = 500;
  const volumeScore = hasTBS
    ? Math.min(100, ((stats.totalQuestions + tbsCompleted * 10) / volumeTarget) * 100)
    : Math.min(100, (stats.totalQuestions / volumeTarget) * 100);
  
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

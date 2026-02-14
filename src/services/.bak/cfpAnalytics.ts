/**
 * CFP Performance Analytics Service
 * 
 * Tracks and analyzes user performance across all CFP study activities:
 * - Domain mastery tracking
 * - Weak area identification
 * - Time-per-question statistics
 * - Progress trends
 * - Study streak tracking
 * - Predicted exam readiness
 */

// Types
export interface QuestionAttempt {
  questionId: string;
  domain: string;
  isCorrect: boolean;
  timeSpent: number; // seconds
  attemptedAt: Date;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface StudySession {
  id: string;
  date: Date;
  duration: number; // minutes
  questionsAttempted: number;
  questionsCorrect: number;
  domainsStudied: string[];
  activities: ('lessons' | 'practice' | 'flashcards' | 'mock-exam' | 'case-study')[];
}

export interface DomainMastery {
  domain: string;
  domainName: string;
  examWeight: number;
  questionsAttempted: number;
  questionsCorrect: number;
  accuracy: number;
  masteryLevel: 'novice' | 'developing' | 'proficient' | 'expert';
  trend: 'improving' | 'stable' | 'declining';
  averageTimePerQuestion: number;
  lastPracticed: Date | null;
  weakTopics: string[];
  strongTopics: string[];
}

export interface PerformanceTrend {
  date: string;
  accuracy: number;
  questionsAttempted: number;
  averageTime: number;
}

export interface CFPAnalytics {
  userId: string;
  lastUpdated: Date;
  
  // Overall stats
  totalQuestionsAttempted: number;
  totalQuestionsCorrect: number;
  overallAccuracy: number;
  averageTimePerQuestion: number;
  
  // Study engagement
  totalStudyMinutes: number;
  currentStreak: number;
  longestStreak: number;
  studyDays: number;
  lastStudyDate: Date | null;
  
  // Domain breakdown
  domainMastery: Record<string, DomainMastery>;
  
  // Mock exam performance
  mockExamsTaken: number;
  mockExamScores: number[];
  averageMockScore: number;
  bestMockScore: number;
  
  // Predictions
  estimatedPassProbability: number;
  examReadiness: 'not-ready' | 'getting-close' | 'ready' | 'well-prepared';
  recommendedFocusAreas: string[];
  
  // Trends
  weeklyTrends: PerformanceTrend[];
  dailyTrends: PerformanceTrend[];
}

// Domain configuration
const DOMAIN_CONFIG: Record<string, { name: string; weight: number }> = {
  'GEN': { name: 'General Principles', weight: 18 },
  'RISK': { name: 'Risk Management & Insurance', weight: 12 },
  'INV': { name: 'Investment Planning', weight: 11 },
  'TAX': { name: 'Tax Planning', weight: 14 },
  'RET': { name: 'Retirement Planning', weight: 19 },
  'EST': { name: 'Estate Planning', weight: 12 },
  'PRO': { name: 'Professional Conduct', weight: 15 },
};

/**
 * Initialize empty analytics for a user
 */
export function initializeAnalytics(userId: string): CFPAnalytics {
  const domainMastery: Record<string, DomainMastery> = {};
  
  Object.entries(DOMAIN_CONFIG).forEach(([domain, config]) => {
    domainMastery[domain] = {
      domain,
      domainName: config.name,
      examWeight: config.weight,
      questionsAttempted: 0,
      questionsCorrect: 0,
      accuracy: 0,
      masteryLevel: 'novice',
      trend: 'stable',
      averageTimePerQuestion: 0,
      lastPracticed: null,
      weakTopics: [],
      strongTopics: [],
    };
  });
  
  return {
    userId,
    lastUpdated: new Date(),
    totalQuestionsAttempted: 0,
    totalQuestionsCorrect: 0,
    overallAccuracy: 0,
    averageTimePerQuestion: 0,
    totalStudyMinutes: 0,
    currentStreak: 0,
    longestStreak: 0,
    studyDays: 0,
    lastStudyDate: null,
    domainMastery,
    mockExamsTaken: 0,
    mockExamScores: [],
    averageMockScore: 0,
    bestMockScore: 0,
    estimatedPassProbability: 0,
    examReadiness: 'not-ready',
    recommendedFocusAreas: Object.keys(DOMAIN_CONFIG),
    weeklyTrends: [],
    dailyTrends: [],
  };
}

/**
 * Record a question attempt
 */
export function recordQuestionAttempt(
  analytics: CFPAnalytics,
  attempt: QuestionAttempt
): CFPAnalytics {
  const newAnalytics = { ...analytics };
  const domain = attempt.domain;
  
  // Update overall stats
  newAnalytics.totalQuestionsAttempted++;
  if (attempt.isCorrect) {
    newAnalytics.totalQuestionsCorrect++;
  }
  newAnalytics.overallAccuracy = Math.round(
    (newAnalytics.totalQuestionsCorrect / newAnalytics.totalQuestionsAttempted) * 100
  );
  
  // Update average time (running average)
  const oldTotal = (analytics.totalQuestionsAttempted - 1) * analytics.averageTimePerQuestion;
  newAnalytics.averageTimePerQuestion = Math.round(
    (oldTotal + attempt.timeSpent) / newAnalytics.totalQuestionsAttempted
  );
  
  // Update domain mastery
  if (newAnalytics.domainMastery[domain]) {
    const domainStats = { ...newAnalytics.domainMastery[domain] };
    domainStats.questionsAttempted++;
    if (attempt.isCorrect) {
      domainStats.questionsCorrect++;
    }
    domainStats.accuracy = Math.round(
      (domainStats.questionsCorrect / domainStats.questionsAttempted) * 100
    );
    domainStats.lastPracticed = attempt.attemptedAt;
    
    // Update average time
    const oldDomainTotal = (domainStats.questionsAttempted - 1) * domainStats.averageTimePerQuestion;
    domainStats.averageTimePerQuestion = Math.round(
      (oldDomainTotal + attempt.timeSpent) / domainStats.questionsAttempted
    );
    
    // Update mastery level
    domainStats.masteryLevel = calculateMasteryLevel(domainStats.accuracy, domainStats.questionsAttempted);
    
    newAnalytics.domainMastery[domain] = domainStats;
  }
  
  newAnalytics.lastUpdated = new Date();
  
  // Recalculate predictions
  return updatePredictions(newAnalytics);
}

/**
 * Record a study session
 */
export function recordStudySession(
  analytics: CFPAnalytics,
  session: StudySession
): CFPAnalytics {
  const newAnalytics = { ...analytics };
  
  // Update study time
  newAnalytics.totalStudyMinutes += session.duration;
  
  // Update streak
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const lastStudy = newAnalytics.lastStudyDate 
    ? new Date(newAnalytics.lastStudyDate) 
    : null;
  
  if (lastStudy) {
    lastStudy.setHours(0, 0, 0, 0);
    const daysDiff = Math.floor((today.getTime() - lastStudy.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 1) {
      // Consecutive day
      newAnalytics.currentStreak++;
    } else if (daysDiff > 1) {
      // Streak broken
      newAnalytics.currentStreak = 1;
    }
    // Same day - don't change streak
  } else {
    newAnalytics.currentStreak = 1;
  }
  
  newAnalytics.longestStreak = Math.max(newAnalytics.longestStreak, newAnalytics.currentStreak);
  newAnalytics.studyDays++;
  newAnalytics.lastStudyDate = session.date;
  newAnalytics.lastUpdated = new Date();
  
  return newAnalytics;
}

/**
 * Record a mock exam result
 */
export function recordMockExam(
  analytics: CFPAnalytics,
  score: number,
  domainScores: Record<string, { correct: number; total: number }>
): CFPAnalytics {
  const newAnalytics = { ...analytics };
  
  // Update mock exam stats
  newAnalytics.mockExamsTaken++;
  newAnalytics.mockExamScores.push(score);
  newAnalytics.averageMockScore = Math.round(
    newAnalytics.mockExamScores.reduce((a, b) => a + b, 0) / newAnalytics.mockExamScores.length
  );
  newAnalytics.bestMockScore = Math.max(...newAnalytics.mockExamScores);
  
  // Update domain mastery from mock exam
  Object.entries(domainScores).forEach(([domain, stats]) => {
    if (newAnalytics.domainMastery[domain]) {
      const domainMastery = { ...newAnalytics.domainMastery[domain] };
      domainMastery.questionsAttempted += stats.total;
      domainMastery.questionsCorrect += stats.correct;
      domainMastery.accuracy = Math.round(
        (domainMastery.questionsCorrect / domainMastery.questionsAttempted) * 100
      );
      domainMastery.masteryLevel = calculateMasteryLevel(
        domainMastery.accuracy, 
        domainMastery.questionsAttempted
      );
      domainMastery.lastPracticed = new Date();
      
      newAnalytics.domainMastery[domain] = domainMastery;
    }
  });
  
  newAnalytics.lastUpdated = new Date();
  
  return updatePredictions(newAnalytics);
}

/**
 * Calculate mastery level based on accuracy and attempts
 */
function calculateMasteryLevel(
  accuracy: number,
  attempts: number
): 'novice' | 'developing' | 'proficient' | 'expert' {
  // Need minimum attempts for meaningful level
  if (attempts < 10) return 'novice';
  if (attempts < 20) {
    return accuracy >= 70 ? 'developing' : 'novice';
  }
  
  if (accuracy >= 85) return 'expert';
  if (accuracy >= 75) return 'proficient';
  if (accuracy >= 60) return 'developing';
  return 'novice';
}

/**
 * Update trend for a domain
 */
export function updateDomainTrend(
  analytics: CFPAnalytics,
  domain: string,
  recentAccuracy: number
): CFPAnalytics {
  const newAnalytics = { ...analytics };
  const domainStats = newAnalytics.domainMastery[domain];
  
  if (!domainStats) return analytics;
  
  const historicalAccuracy = domainStats.accuracy;
  
  let trend: 'improving' | 'stable' | 'declining';
  if (recentAccuracy > historicalAccuracy + 5) {
    trend = 'improving';
  } else if (recentAccuracy < historicalAccuracy - 5) {
    trend = 'declining';
  } else {
    trend = 'stable';
  }
  
  newAnalytics.domainMastery[domain] = {
    ...domainStats,
    trend,
  };
  
  return newAnalytics;
}

/**
 * Update predictions based on current performance
 */
function updatePredictions(analytics: CFPAnalytics): CFPAnalytics {
  const newAnalytics = { ...analytics };
  
  // Calculate weighted score based on domain weights
  let weightedScore = 0;
  let totalWeight = 0;
  
  Object.values(analytics.domainMastery).forEach(domain => {
    if (domain.questionsAttempted > 0) {
      weightedScore += domain.accuracy * domain.examWeight;
      totalWeight += domain.examWeight;
    }
  });
  
  const effectiveScore = totalWeight > 0 ? weightedScore / totalWeight : 0;
  
  // Calculate pass probability
  // Using a simple model: probability based on weighted score and question attempts
  const questionsFactor = Math.min(1, analytics.totalQuestionsAttempted / 500); // Max at 500 questions
  const mockExamFactor = Math.min(1, analytics.mockExamsTaken / 3); // Max at 3 mock exams
  const accuracyFactor = effectiveScore / 100;
  
  // Combined probability (weighted formula)
  let rawProbability = (
    accuracyFactor * 0.5 +
    (analytics.bestMockScore / 100) * 0.3 +
    questionsFactor * 0.1 +
    mockExamFactor * 0.1
  );
  
  // Apply confidence adjustment based on attempts
  if (analytics.totalQuestionsAttempted < 100) {
    rawProbability *= 0.5; // Low confidence
  } else if (analytics.totalQuestionsAttempted < 300) {
    rawProbability *= 0.75;
  }
  
  newAnalytics.estimatedPassProbability = Math.min(95, Math.round(rawProbability * 100));
  
  // Determine exam readiness
  if (newAnalytics.estimatedPassProbability >= 80) {
    newAnalytics.examReadiness = 'well-prepared';
  } else if (newAnalytics.estimatedPassProbability >= 65) {
    newAnalytics.examReadiness = 'ready';
  } else if (newAnalytics.estimatedPassProbability >= 45) {
    newAnalytics.examReadiness = 'getting-close';
  } else {
    newAnalytics.examReadiness = 'not-ready';
  }
  
  // Identify focus areas (weak domains with high exam weight)
  const focusAreas = Object.values(analytics.domainMastery)
    .filter(d => d.accuracy < 70 || d.questionsAttempted < 30)
    .sort((a, b) => {
      // Prioritize by: low accuracy + high weight
      const aPriority = (100 - a.accuracy) * a.examWeight;
      const bPriority = (100 - b.accuracy) * b.examWeight;
      return bPriority - aPriority;
    })
    .slice(0, 3)
    .map(d => d.domain);
  
  newAnalytics.recommendedFocusAreas = focusAreas;
  
  return newAnalytics;
}

/**
 * Add daily trend data point
 */
export function addDailyTrend(
  analytics: CFPAnalytics,
  trend: PerformanceTrend
): CFPAnalytics {
  const newAnalytics = { ...analytics };
  
  // Keep last 30 days
  newAnalytics.dailyTrends = [...analytics.dailyTrends, trend].slice(-30);
  
  return newAnalytics;
}

/**
 * Add weekly trend data point
 */
export function addWeeklyTrend(
  analytics: CFPAnalytics,
  trend: PerformanceTrend
): CFPAnalytics {
  const newAnalytics = { ...analytics };
  
  // Keep last 12 weeks
  newAnalytics.weeklyTrends = [...analytics.weeklyTrends, trend].slice(-12);
  
  return newAnalytics;
}

/**
 * Get analytics summary for dashboard
 */
export function getAnalyticsSummary(analytics: CFPAnalytics): {
  overview: {
    accuracy: number;
    questionsCompleted: number;
    studyHours: number;
    streak: number;
    passChance: string;
    readiness: string;
  };
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  domainBreakdown: Array<{
    domain: string;
    name: string;
    accuracy: number;
    level: string;
    trend: string;
    weight: number;
  }>;
} {
  // Identify strengths (>80% accuracy with sufficient attempts)
  const strengths = Object.values(analytics.domainMastery)
    .filter(d => d.accuracy >= 80 && d.questionsAttempted >= 20)
    .map(d => d.domainName);
  
  // Identify weaknesses (<65% accuracy or insufficient attempts)
  const weaknesses = Object.values(analytics.domainMastery)
    .filter(d => d.accuracy < 65 || d.questionsAttempted < 20)
    .map(d => d.domainName);
  
  // Generate recommendations
  const recommendations: string[] = [];
  
  if (analytics.totalQuestionsAttempted < 200) {
    recommendations.push('Complete more practice questions to build a stronger foundation.');
  }
  
  if (analytics.mockExamsTaken < 2) {
    recommendations.push('Take at least 2 full mock exams before your exam date.');
  }
  
  if (analytics.currentStreak < 7) {
    recommendations.push('Build a consistent daily study habit for best retention.');
  }
  
  analytics.recommendedFocusAreas.forEach(domain => {
    const d = analytics.domainMastery[domain];
    if (d) {
      recommendations.push(`Focus on ${d.domainName} (${d.examWeight}% of exam, currently ${d.accuracy}% accuracy).`);
    }
  });
  
  // Domain breakdown
  const domainBreakdown = Object.values(analytics.domainMastery)
    .sort((a, b) => b.examWeight - a.examWeight)
    .map(d => ({
      domain: d.domain,
      name: d.domainName,
      accuracy: d.accuracy,
      level: d.masteryLevel,
      trend: d.trend,
      weight: d.examWeight,
    }));
  
  return {
    overview: {
      accuracy: analytics.overallAccuracy,
      questionsCompleted: analytics.totalQuestionsAttempted,
      studyHours: Math.round(analytics.totalStudyMinutes / 60),
      streak: analytics.currentStreak,
      passChance: `${analytics.estimatedPassProbability}%`,
      readiness: analytics.examReadiness.replace('-', ' '),
    },
    strengths,
    weaknesses,
    recommendations,
    domainBreakdown,
  };
}

/**
 * Get time-based performance insights
 */
export function getTimeInsights(analytics: CFPAnalytics): {
  averageTimePerQuestion: number;
  timeStatus: 'too-fast' | 'good' | 'too-slow';
  recommendation: string;
  domainTimes: Array<{ domain: string; avgTime: number; status: string }>;
} {
  const avgTime = analytics.averageTimePerQuestion;
  
  let timeStatus: 'too-fast' | 'good' | 'too-slow';
  let recommendation: string;
  
  if (avgTime < 30) {
    timeStatus = 'too-fast';
    recommendation = 'You may be rushing. Take time to read questions and all options carefully.';
  } else if (avgTime > 90) {
    timeStatus = 'too-slow';
    recommendation = 'Work on time management. Target 60-70 seconds per question to complete the exam.';
  } else {
    timeStatus = 'good';
    recommendation = 'Your pace is good. Maintain this timing on exam day.';
  }
  
  const domainTimes = Object.values(analytics.domainMastery)
    .filter(d => d.questionsAttempted > 0)
    .map(d => {
      let status: string;
      if (d.averageTimePerQuestion < 30) status = 'Fast';
      else if (d.averageTimePerQuestion > 90) status = 'Slow';
      else status = 'Good';
      
      return {
        domain: d.domainName,
        avgTime: d.averageTimePerQuestion,
        status,
      };
    });
  
  return {
    averageTimePerQuestion: avgTime,
    timeStatus,
    recommendation,
    domainTimes,
  };
}

/**
 * Calculate study consistency score
 */
export function getConsistencyScore(analytics: CFPAnalytics): {
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  message: string;
} {
  let score = 0;
  
  // Streak factor (40 points max)
  score += Math.min(40, analytics.currentStreak * 4);
  
  // Study days factor (30 points max)
  score += Math.min(30, analytics.studyDays * 2);
  
  // Questions factor (30 points max)
  score += Math.min(30, analytics.totalQuestionsAttempted / 20);
  
  let grade: 'A' | 'B' | 'C' | 'D' | 'F';
  let message: string;
  
  if (score >= 90) {
    grade = 'A';
    message = 'Excellent consistency! Keep up the great work.';
  } else if (score >= 80) {
    grade = 'B';
    message = 'Good consistency. Try to study a little more each day.';
  } else if (score >= 70) {
    grade = 'C';
    message = 'Moderate consistency. Build longer study streaks.';
  } else if (score >= 60) {
    grade = 'D';
    message = 'Room for improvement. Set daily study reminders.';
  } else {
    grade = 'F';
    message = 'Just getting started. Commit to daily practice.';
  }
  
  return { score: Math.round(score), grade, message };
}

export default {
  initializeAnalytics,
  recordQuestionAttempt,
  recordStudySession,
  recordMockExam,
  updateDomainTrend,
  addDailyTrend,
  addWeeklyTrend,
  getAnalyticsSummary,
  getTimeInsights,
  getConsistencyScore,
};

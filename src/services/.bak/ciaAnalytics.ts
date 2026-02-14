/**
 * CIA Analytics Service
 * 
 * Comprehensive analytics tracking for CIA exam preparation.
 * Tracks question attempts, study sessions, part mastery, and exam readiness.
 * 
 * CIA Exam Structure (3 Parts):
 * - Part 1: Essentials of Internal Auditing (40% weight, 125 questions, 2.5 hours)
 * - Part 2: Practice of Internal Auditing (30% weight, 100 questions, 2 hours)
 * - Part 3: Business Knowledge for Internal Auditing (30% weight, 100 questions, 2 hours)
 * 
 * Scoring: IIA uses 250-750 scale, 600 = passing
 * Each part is taken and scored independently
 */

// ============================================================================
// Types and Interfaces
// ============================================================================

export interface QuestionAttempt {
  questionId: string;
  part: CIAPart;
  topic?: string;
  isCorrect: boolean;
  timeSpent: number; // seconds
  attemptedAt: Date;
  cognitiveLevel?: 'knowledge' | 'comprehension' | 'application' | 'analysis';
  ippfReference?: string;
}

export interface StudySession {
  sessionId: string;
  date: Date;
  duration: number; // minutes
  type: 'practice' | 'flashcards' | 'lessons' | 'review' | 'mock-exam';
  part?: CIAPart;
  questionsAttempted?: number;
}

export type CIAPart = 'CIA1' | 'CIA2' | 'CIA3';

export interface PartMastery {
  part: CIAPart;
  partName: string;
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
  ippfStandardsMastery?: Record<string, number>;
  scaledScore: number; // IIA 250-750 scale
  passed: boolean;
}

export interface PerformanceTrend {
  date: Date;
  accuracy: number;
  questionsCompleted: number;
  studyMinutes: number;
}

export interface CIAAnalytics {
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
  
  // Part breakdown (CIA has 3 parts, each taken separately)
  partMastery: Record<CIAPart, PartMastery>;
  
  // Mock exam performance (per part)
  mockExamsTaken: Record<CIAPart, number>;
  mockExamScores: Record<CIAPart, number[]>; // Raw percentages
  scaledScores: Record<CIAPart, number[]>; // IIA 250-750 scale
  
  // Aggregated exam stats
  totalMockExamsTaken: number;
  averageScaledScore: number;
  partsPassed: number; // 0-3
  
  // Predictions
  estimatedPassProbability: Record<CIAPart, number>;
  overallPassProbability: number;
  examReadiness: 'not-ready' | 'getting-close' | 'ready' | 'well-prepared';
  
  // Recommendations
  recommendedFocusAreas: CIAPart[];
  
  // Trend tracking
  weeklyTrends: PerformanceTrend[];
  dailyTrends: PerformanceTrend[];
  
  // CIA-specific metrics
  ippfKnowledge: number; // 0-100 (International Professional Practices Framework)
  iiaStandardsMastery: number; // 0-100
  ethicsCodeFamiliarity: number; // 0-100
  riskAssessmentProficiency: number; // 0-100
}

// ============================================================================
// Part Configuration
// ============================================================================

export const CIA_PART_CONFIG: Record<CIAPart, { 
  name: string; 
  weight: number; 
  questions: number;
  timeMinutes: number;
  topics: string[] 
}> = {
  CIA1: {
    name: 'Essentials of Internal Auditing',
    weight: 40,
    questions: 125,
    timeMinutes: 150,
    topics: [
      'Foundations of Internal Auditing',
      'Independence and Objectivity',
      'Proficiency and Due Professional Care',
      'Quality Assurance and Improvement Program',
      'Governance, Risk Management, and Control',
      'Fraud Risks',
    ],
  },
  CIA2: {
    name: 'Practice of Internal Auditing',
    weight: 30,
    questions: 100,
    timeMinutes: 120,
    topics: [
      'Managing the Internal Audit Activity',
      'Planning the Engagement',
      'Performing the Engagement',
      'Communicating Engagement Results',
      'Monitoring Progress',
    ],
  },
  CIA3: {
    name: 'Business Knowledge for Internal Auditing',
    weight: 30,
    questions: 100,
    timeMinutes: 120,
    topics: [
      'Business Acumen',
      'Information Security',
      'Information Technology',
      'Financial Management',
    ],
  },
};

// ============================================================================
// IIA Score Scaling
// ============================================================================

/**
 * Convert raw percentage score to IIA scaled score (250-750)
 * IIA uses a scaled score where 600 = passing
 * This is an approximation based on public IIA information
 */
export function rawToScaledScore(rawPercentage: number): number {
  // IIA scaling approximation:
  // - 0% → 250
  // - ~75% → 600 (passing)
  // - 100% → 750
  
  if (rawPercentage <= 0) return 250;
  if (rawPercentage >= 100) return 750;
  
  // Passing threshold: ~75% raw = 600 scaled
  // Linear interpolation with passing at 75%
  if (rawPercentage <= 75) {
    // 0-75% maps to 250-600
    return Math.round(250 + (rawPercentage / 75) * 350);
  } else {
    // 75-100% maps to 600-750
    return Math.round(600 + ((rawPercentage - 75) / 25) * 150);
  }
}

/**
 * Convert scaled score to pass status and probability
 */
export function scaledScoreToPassInfo(scaledScore: number): { passed: boolean; probability: number } {
  const passed = scaledScore >= 600;
  
  let probability: number;
  if (scaledScore < 500) {
    probability = Math.max(0, (scaledScore - 250) / 2.5);
  } else if (scaledScore < 550) {
    probability = 10 + (scaledScore - 500) * 0.4;
  } else if (scaledScore < 600) {
    probability = 30 + (scaledScore - 550) * 0.8;
  } else if (scaledScore < 650) {
    probability = 70 + (scaledScore - 600) * 0.5;
  } else {
    probability = 95 + (scaledScore - 650) * 0.04;
  }
  
  return { passed, probability: Math.min(99, Math.max(0, probability)) };
}

// ============================================================================
// Core Functions
// ============================================================================

/**
 * Initialize empty analytics for a user
 */
export function initializeAnalytics(userId: string): CIAAnalytics {
  const partMastery: Record<CIAPart, PartMastery> = {} as Record<CIAPart, PartMastery>;
  const mockExamsTaken: Record<CIAPart, number> = {} as Record<CIAPart, number>;
  const mockExamScores: Record<CIAPart, number[]> = {} as Record<CIAPart, number[]>;
  const scaledScores: Record<CIAPart, number[]> = {} as Record<CIAPart, number[]>;
  const estimatedPassProbability: Record<CIAPart, number> = {} as Record<CIAPart, number>;
  
  (Object.keys(CIA_PART_CONFIG) as CIAPart[]).forEach((part) => {
    const config = CIA_PART_CONFIG[part];
    partMastery[part] = {
      part,
      partName: config.name,
      examWeight: config.weight,
      questionsAttempted: 0,
      questionsCorrect: 0,
      accuracy: 0,
      masteryLevel: 'novice',
      trend: 'stable',
      averageTimePerQuestion: 0,
      lastPracticed: null,
      weakTopics: config.topics,
      strongTopics: [],
      ippfStandardsMastery: {},
      scaledScore: 250,
      passed: false,
    };
    mockExamsTaken[part] = 0;
    mockExamScores[part] = [];
    scaledScores[part] = [];
    estimatedPassProbability[part] = 0;
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
    partMastery,
    mockExamsTaken,
    mockExamScores,
    scaledScores,
    totalMockExamsTaken: 0,
    averageScaledScore: 250,
    partsPassed: 0,
    estimatedPassProbability,
    overallPassProbability: 0,
    examReadiness: 'not-ready',
    recommendedFocusAreas: ['CIA1', 'CIA2', 'CIA3'],
    weeklyTrends: [],
    dailyTrends: [],
    ippfKnowledge: 0,
    iiaStandardsMastery: 0,
    ethicsCodeFamiliarity: 0,
    riskAssessmentProficiency: 0,
  };
}

/**
 * Record a question attempt
 */
export function recordQuestionAttempt(
  analytics: CIAAnalytics,
  attempt: QuestionAttempt
): CIAAnalytics {
  const newAnalytics = { ...analytics };
  const part = attempt.part;
  
  // Update overall stats
  newAnalytics.totalQuestionsAttempted++;
  if (attempt.isCorrect) {
    newAnalytics.totalQuestionsCorrect++;
  }
  newAnalytics.overallAccuracy = Math.round(
    (newAnalytics.totalQuestionsCorrect / newAnalytics.totalQuestionsAttempted) * 100
  );
  
  // Update average time (running average)
  const oldTotal = analytics.totalQuestionsAttempted * analytics.averageTimePerQuestion;
  newAnalytics.averageTimePerQuestion = Math.round(
    (oldTotal + attempt.timeSpent) / newAnalytics.totalQuestionsAttempted
  );
  
  // Update part mastery
  if (newAnalytics.partMastery[part]) {
    const partStats = { ...newAnalytics.partMastery[part] };
    partStats.questionsAttempted++;
    if (attempt.isCorrect) {
      partStats.questionsCorrect++;
    }
    partStats.accuracy = Math.round(
      (partStats.questionsCorrect / partStats.questionsAttempted) * 100
    );
    partStats.lastPracticed = attempt.attemptedAt;
    
    // Update average time
    const oldPartTotal = (partStats.questionsAttempted - 1) * partStats.averageTimePerQuestion;
    partStats.averageTimePerQuestion = Math.round(
      (oldPartTotal + attempt.timeSpent) / partStats.questionsAttempted
    );
    
    // Update mastery level and scaled score
    partStats.masteryLevel = calculateMasteryLevel(partStats.accuracy, partStats.questionsAttempted);
    partStats.scaledScore = rawToScaledScore(partStats.accuracy);
    partStats.passed = partStats.scaledScore >= 600;
    
    // Track IPPF references if provided
    if (attempt.ippfReference && partStats.ippfStandardsMastery) {
      const currentMastery = partStats.ippfStandardsMastery[attempt.ippfReference] || 0;
      partStats.ippfStandardsMastery[attempt.ippfReference] = 
        Math.round((currentMastery + (attempt.isCorrect ? 100 : 0)) / 2);
    }
    
    newAnalytics.partMastery[part] = partStats;
  }
  
  // Update CIA-specific metrics based on cognitive level
  if (attempt.cognitiveLevel === 'analysis') {
    const delta = attempt.isCorrect ? 1 : -0.5;
    newAnalytics.riskAssessmentProficiency = Math.min(100, Math.max(0, 
      newAnalytics.riskAssessmentProficiency + delta
    ));
  }
  
  newAnalytics.lastUpdated = new Date();
  
  // Recalculate predictions
  return updatePredictions(newAnalytics);
}

/**
 * Record a study session
 */
export function recordStudySession(
  analytics: CIAAnalytics,
  session: StudySession
): CIAAnalytics {
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
      newAnalytics.currentStreak++;
    } else if (daysDiff > 1) {
      newAnalytics.currentStreak = 1;
    }
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
 * Record a mock exam result for a specific part
 */
export function recordMockExam(
  analytics: CIAAnalytics,
  part: CIAPart,
  score: number,
  questionsCorrect: number,
  questionsTotal: number
): CIAAnalytics {
  const newAnalytics = { ...analytics };
  
  // Calculate scaled score
  const scaledScore = rawToScaledScore(score);
  
  // Update mock exam stats for this part
  newAnalytics.mockExamsTaken[part]++;
  newAnalytics.mockExamScores[part].push(score);
  newAnalytics.scaledScores[part].push(scaledScore);
  newAnalytics.totalMockExamsTaken++;
  
  // Update part mastery
  const partMastery = { ...newAnalytics.partMastery[part] };
  partMastery.questionsAttempted += questionsTotal;
  partMastery.questionsCorrect += questionsCorrect;
  partMastery.accuracy = Math.round(
    (partMastery.questionsCorrect / partMastery.questionsAttempted) * 100
  );
  partMastery.masteryLevel = calculateMasteryLevel(partMastery.accuracy, partMastery.questionsAttempted);
  partMastery.scaledScore = rawToScaledScore(partMastery.accuracy);
  partMastery.passed = partMastery.scaledScore >= 600;
  partMastery.lastPracticed = new Date();
  
  newAnalytics.partMastery[part] = partMastery;
  
  // Calculate overall average scaled score
  let totalScaled = 0;
  let totalExams = 0;
  (Object.keys(newAnalytics.scaledScores) as CIAPart[]).forEach(p => {
    newAnalytics.scaledScores[p].forEach(s => {
      totalScaled += s;
      totalExams++;
    });
  });
  newAnalytics.averageScaledScore = totalExams > 0 ? Math.round(totalScaled / totalExams) : 250;
  
  // Count parts passed
  newAnalytics.partsPassed = (Object.values(newAnalytics.partMastery) as PartMastery[])
    .filter(p => p.passed).length;
  
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
  if (attempts < 10) return 'novice';
  if (attempts < 25) {
    return accuracy >= 70 ? 'developing' : 'novice';
  }
  
  // CIA passing is ~75%, adjust thresholds
  if (accuracy >= 90) return 'expert';
  if (accuracy >= 80) return 'proficient';
  if (accuracy >= 65) return 'developing';
  return 'novice';
}

/**
 * Update part trend
 */
export function updatePartTrend(
  analytics: CIAAnalytics,
  part: CIAPart,
  recentAccuracy: number
): CIAAnalytics {
  const newAnalytics = { ...analytics };
  const partStats = newAnalytics.partMastery[part];
  
  if (!partStats) return analytics;
  
  const historicalAccuracy = partStats.accuracy;
  
  let trend: 'improving' | 'stable' | 'declining';
  if (recentAccuracy > historicalAccuracy + 5) {
    trend = 'improving';
  } else if (recentAccuracy < historicalAccuracy - 5) {
    trend = 'declining';
  } else {
    trend = 'stable';
  }
  
  newAnalytics.partMastery[part] = { ...partStats, trend };
  
  return newAnalytics;
}

/**
 * Update IPPF knowledge score
 */
export function updateIppfKnowledge(
  analytics: CIAAnalytics,
  score: number
): CIAAnalytics {
  return {
    ...analytics,
    ippfKnowledge: Math.min(100, Math.max(0, score)),
    lastUpdated: new Date(),
  };
}

/**
 * Update IIA standards mastery
 */
export function updateIiaStandardsMastery(
  analytics: CIAAnalytics,
  score: number
): CIAAnalytics {
  return {
    ...analytics,
    iiaStandardsMastery: Math.min(100, Math.max(0, score)),
    lastUpdated: new Date(),
  };
}

/**
 * Update ethics code familiarity
 */
export function updateEthicsCodeFamiliarity(
  analytics: CIAAnalytics,
  score: number
): CIAAnalytics {
  return {
    ...analytics,
    ethicsCodeFamiliarity: Math.min(100, Math.max(0, score)),
    lastUpdated: new Date(),
  };
}

/**
 * Update predictions based on current performance
 */
function updatePredictions(analytics: CIAAnalytics): CIAAnalytics {
  const newAnalytics = { ...analytics };
  
  // Calculate per-part pass probability
  (Object.keys(analytics.partMastery) as CIAPart[]).forEach(part => {
    const partData = analytics.partMastery[part];
    const { probability } = scaledScoreToPassInfo(partData.scaledScore);
    
    // Factor in attempts
    let adjustedProb = probability;
    if (partData.questionsAttempted < 50) {
      adjustedProb *= 0.5;
    } else if (partData.questionsAttempted < 100) {
      adjustedProb *= 0.75;
    }
    
    // Factor in mock exams
    const mockCount = analytics.mockExamsTaken[part];
    if (mockCount > 0) {
      const bestMock = Math.max(...analytics.scaledScores[part]);
      const mockProb = scaledScoreToPassInfo(bestMock).probability;
      adjustedProb = (adjustedProb * 0.6) + (mockProb * 0.4);
    }
    
    newAnalytics.estimatedPassProbability[part] = Math.min(95, Math.round(adjustedProb));
  });
  
  // Calculate overall pass probability (need to pass all 3 parts)
  const partProbs = Object.values(newAnalytics.estimatedPassProbability);
  // Probability of passing all = product of individual probabilities
  newAnalytics.overallPassProbability = Math.round(
    partProbs.reduce((acc, p) => acc * (p / 100), 1) * 100
  );
  
  // Determine exam readiness based on parts passed and probabilities
  const avgProb = partProbs.reduce((a, b) => a + b, 0) / partProbs.length;
  if (avgProb >= 80 && newAnalytics.partsPassed >= 2) {
    newAnalytics.examReadiness = 'well-prepared';
  } else if (avgProb >= 65 || newAnalytics.partsPassed >= 1) {
    newAnalytics.examReadiness = 'ready';
  } else if (avgProb >= 45) {
    newAnalytics.examReadiness = 'getting-close';
  } else {
    newAnalytics.examReadiness = 'not-ready';
  }
  
  // Identify focus areas (weakest parts)
  const focusAreas = (Object.entries(newAnalytics.partMastery) as [CIAPart, PartMastery][])
    .filter(([, p]) => p.accuracy < 75 || p.questionsAttempted < 50)
    .sort((a, b) => {
      // Prioritize by: low accuracy + high weight
      const aPriority = (100 - a[1].accuracy) * a[1].examWeight;
      const bPriority = (100 - b[1].accuracy) * b[1].examWeight;
      return bPriority - aPriority;
    })
    .slice(0, 2)
    .map(([part]) => part);
  
  newAnalytics.recommendedFocusAreas = focusAreas.length > 0 ? focusAreas : ['CIA1'];
  
  return newAnalytics;
}

/**
 * Add daily trend data point
 */
export function addDailyTrend(
  analytics: CIAAnalytics,
  trend: PerformanceTrend
): CIAAnalytics {
  const newAnalytics = { ...analytics };
  newAnalytics.dailyTrends = [...analytics.dailyTrends, trend].slice(-30);
  return newAnalytics;
}

/**
 * Add weekly trend data point
 */
export function addWeeklyTrend(
  analytics: CIAAnalytics,
  trend: PerformanceTrend
): CIAAnalytics {
  const newAnalytics = { ...analytics };
  newAnalytics.weeklyTrends = [...analytics.weeklyTrends, trend].slice(-12);
  return newAnalytics;
}

/**
 * Get analytics summary for dashboard
 */
export function getAnalyticsSummary(analytics: CIAAnalytics): {
  overview: {
    accuracy: number;
    questionsCompleted: number;
    studyHours: number;
    streak: number;
    partsPassed: number;
    passChance: string;
    readiness: string;
  };
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  partBreakdown: Array<{
    part: CIAPart;
    name: string;
    accuracy: number;
    level: string;
    trend: string;
    weight: number;
    scaledScore: number;
    passed: boolean;
  }>;
  ciaSpecific: {
    ippfScore: number;
    iiaStandards: number;
    ethicsCode: number;
    riskAssessment: number;
  };
} {
  // Identify strengths (>80% accuracy with sufficient attempts)
  const strengths = (Object.values(analytics.partMastery) as PartMastery[])
    .filter(p => p.accuracy >= 80 && p.questionsAttempted >= 30)
    .map(p => p.partName);
  
  // Identify weaknesses
  const weaknesses = (Object.values(analytics.partMastery) as PartMastery[])
    .filter(p => p.accuracy < 70 || p.questionsAttempted < 30)
    .map(p => p.partName);
  
  // Generate recommendations
  const recommendations: string[] = [];
  
  if (analytics.totalQuestionsAttempted < 200) {
    recommendations.push('Complete more practice questions to build a stronger foundation.');
  }
  
  if (analytics.totalMockExamsTaken < 3) {
    recommendations.push('Take at least one full mock exam for each part before your exam date.');
  }
  
  if (analytics.ippfKnowledge < 70) {
    recommendations.push('Review the IPPF framework - it\'s fundamental to all three parts.');
  }
  
  if (analytics.iiaStandardsMastery < 60) {
    recommendations.push('Study IIA Standards more thoroughly - heavily tested on Part 1.');
  }
  
  if (analytics.ethicsCodeFamiliarity < 60) {
    recommendations.push('Review the IIA Code of Ethics - required for Part 1.');
  }
  
  if (analytics.currentStreak < 7) {
    recommendations.push('Build a consistent daily study habit for best retention.');
  }
  
  analytics.recommendedFocusAreas.forEach(part => {
    const p = analytics.partMastery[part];
    if (p) {
      recommendations.push(`Focus on ${p.partName} (${p.examWeight}% weight, currently ${p.accuracy}% accuracy).`);
    }
  });
  
  // Part breakdown
  const partBreakdown = (Object.values(analytics.partMastery) as PartMastery[])
    .sort((a, b) => b.examWeight - a.examWeight)
    .map(p => ({
      part: p.part,
      name: p.partName,
      accuracy: p.accuracy,
      level: p.masteryLevel,
      trend: p.trend,
      weight: p.examWeight,
      scaledScore: p.scaledScore,
      passed: p.passed,
    }));
  
  return {
    overview: {
      accuracy: analytics.overallAccuracy,
      questionsCompleted: analytics.totalQuestionsAttempted,
      studyHours: Math.round(analytics.totalStudyMinutes / 60),
      streak: analytics.currentStreak,
      partsPassed: analytics.partsPassed,
      passChance: `${analytics.overallPassProbability}%`,
      readiness: formatReadiness(analytics.examReadiness),
    },
    strengths,
    weaknesses,
    recommendations: recommendations.slice(0, 5),
    partBreakdown,
    ciaSpecific: {
      ippfScore: analytics.ippfKnowledge,
      iiaStandards: analytics.iiaStandardsMastery,
      ethicsCode: analytics.ethicsCodeFamiliarity,
      riskAssessment: analytics.riskAssessmentProficiency,
    },
  };
}

function formatReadiness(readiness: CIAAnalytics['examReadiness']): string {
  switch (readiness) {
    case 'well-prepared': return 'Well Prepared';
    case 'ready': return 'Ready';
    case 'getting-close': return 'Getting Close';
    case 'not-ready': return 'Not Ready';
    default: return 'Unknown';
  }
}

/**
 * Get part-specific insights
 */
export function getPartInsights(
  analytics: CIAAnalytics,
  part: CIAPart
): {
  part: CIAPart;
  name: string;
  accuracy: number;
  questionsAttempted: number;
  avgTimePerQuestion: number;
  mastery: string;
  trend: string;
  examWeight: number;
  scaledScore: number;
  passed: boolean;
  isOnTrack: boolean;
  gapToPass: number;
  weakTopics: string[];
  strongTopics: string[];
  recommendations: string[];
} | null {
  const partMastery = analytics.partMastery[part];
  if (!partMastery) return null;
  
  const targetAccuracy = 75; // CIA passing threshold
  const gapToPass = Math.max(0, targetAccuracy - partMastery.accuracy);
  const isOnTrack = partMastery.accuracy >= targetAccuracy && partMastery.questionsAttempted >= 40;
  
  const recommendations: string[] = [];
  
  if (partMastery.questionsAttempted < 40) {
    recommendations.push(`Complete at least ${40 - partMastery.questionsAttempted} more questions.`);
  }
  
  if (partMastery.accuracy < 65) {
    recommendations.push('Review fundamental concepts before attempting more questions.');
  } else if (partMastery.accuracy < 75) {
    recommendations.push('Focus on weak topics to push accuracy above passing threshold.');
  }
  
  const targetTime = CIA_PART_CONFIG[part].timeMinutes * 60 / CIA_PART_CONFIG[part].questions;
  if (partMastery.averageTimePerQuestion > targetTime * 1.2) {
    recommendations.push(`Work on time management - target ${Math.round(targetTime)} seconds per question.`);
  }
  
  if (partMastery.trend === 'declining') {
    recommendations.push('Recent performance is declining. Consider reviewing basics.');
  }
  
  return {
    part: partMastery.part,
    name: partMastery.partName,
    accuracy: partMastery.accuracy,
    questionsAttempted: partMastery.questionsAttempted,
    avgTimePerQuestion: partMastery.averageTimePerQuestion,
    mastery: partMastery.masteryLevel,
    trend: partMastery.trend,
    examWeight: partMastery.examWeight,
    scaledScore: partMastery.scaledScore,
    passed: partMastery.passed,
    isOnTrack,
    gapToPass,
    weakTopics: partMastery.weakTopics,
    strongTopics: partMastery.strongTopics,
    recommendations,
  };
}

/**
 * Get study plan progress
 */
export function getStudyPlanProgress(analytics: CIAAnalytics): {
  overallProgress: number;
  partProgress: Record<CIAPart, number>;
  milestonesCompleted: string[];
  nextMilestone: string;
} {
  const partProgress: Record<CIAPart, number> = {} as Record<CIAPart, number>;
  let totalProgress = 0;
  
  (Object.entries(analytics.partMastery) as [CIAPart, PartMastery][]).forEach(([part, mastery]) => {
    const questionsProgress = Math.min(1, mastery.questionsAttempted / 75) * 50;
    const accuracyProgress = Math.min(1, mastery.accuracy / 80) * 50;
    const progress = Math.round(questionsProgress + accuracyProgress);
    
    partProgress[part] = progress;
    totalProgress += progress;
  });
  
  const overallProgress = Math.round(totalProgress / 3);
  
  // Milestones
  const milestonesCompleted: string[] = [];
  
  if (analytics.totalQuestionsAttempted >= 100) {
    milestonesCompleted.push('100 Questions Completed');
  }
  if (analytics.totalQuestionsAttempted >= 500) {
    milestonesCompleted.push('500 Questions Completed');
  }
  if (analytics.totalMockExamsTaken >= 1) {
    milestonesCompleted.push('First Mock Exam Taken');
  }
  if (analytics.partsPassed >= 1) {
    milestonesCompleted.push('First Part Passed (Mock)');
  }
  if (analytics.partsPassed >= 3) {
    milestonesCompleted.push('All Parts Passed (Mock)');
  }
  if (analytics.currentStreak >= 7) {
    milestonesCompleted.push('7-Day Study Streak');
  }
  if (analytics.ippfKnowledge >= 80) {
    milestonesCompleted.push('IPPF Master');
  }
  
  // Next milestone
  let nextMilestone = '';
  if (analytics.totalQuestionsAttempted < 100) {
    nextMilestone = `Complete ${100 - analytics.totalQuestionsAttempted} more questions`;
  } else if (analytics.totalMockExamsTaken < 1) {
    nextMilestone = 'Take your first mock exam';
  } else if (analytics.partsPassed < 1) {
    nextMilestone = 'Score 600+ on a part mock exam';
  } else if (analytics.partsPassed < 3) {
    const failedParts = (Object.entries(analytics.partMastery) as [CIAPart, PartMastery][])
      .filter(([, p]) => !p.passed)
      .map(([part]) => part);
    nextMilestone = `Pass ${failedParts[0]} mock exam`;
  } else {
    nextMilestone = 'Ready for exam day!';
  }
  
  return {
    overallProgress,
    partProgress,
    milestonesCompleted,
    nextMilestone,
  };
}

/**
 * Export analytics for persistence
 */
export function serializeAnalytics(analytics: CIAAnalytics): string {
  return JSON.stringify(analytics, (_, value) => {
    if (value instanceof Date) {
      return value.toISOString();
    }
    return value;
  });
}

/**
 * Import analytics from persistence
 */
export function deserializeAnalytics(json: string): CIAAnalytics {
  return JSON.parse(json, (_, value) => {
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return date;
      }
    }
    return value;
  });
}

/**
 * EA Analytics Service
 * 
 * Comprehensive analytics tracking for EA (Enrolled Agent) exam preparation.
 * Tracks question attempts, study sessions, domain mastery, and exam readiness.
 * 
 * IRS SEE Exam Structure:
 * - Part 1: Individuals (100 questions, 3.5 hours)
 * - Part 2: Businesses (100 questions, 3.5 hours)
 * - Part 3: Representation (100 questions, 3.5 hours)
 * 
 * Scoring: 40-130 scale, 105 passing
 */

import { EASectionId } from '../courses/ea/config';

// ============================================================================
// Types and Interfaces
// ============================================================================

export interface QuestionAttempt {
  questionId: string;
  part: EASectionId;
  domain?: string; // e.g., 'SEE1-1', 'SEE2-2'
  topic?: string;
  isCorrect: boolean;
  timeSpent: number; // seconds
  attemptedAt: Date;
  irsFormRef?: string; // IRS form reference (e.g., "Form 1040")
}

export interface StudySession {
  sessionId: string;
  date: Date;
  duration: number; // minutes
  type: 'practice' | 'flashcards' | 'lessons' | 'simulation' | 'review';
  part?: EASectionId;
  questionsAttempted?: number;
}

export interface PartMastery {
  part: EASectionId;
  partName: string;
  questionsAttempted: number;
  questionsCorrect: number;
  accuracy: number;
  masteryLevel: 'novice' | 'developing' | 'proficient' | 'expert';
  trend: 'improving' | 'stable' | 'declining';
  averageTimePerQuestion: number;
  lastPracticed: Date | null;
  weakDomains: string[];
  strongDomains: string[];
  domainAccuracy: Record<string, number>;
}

export interface PerformanceTrend {
  date: Date;
  accuracy: number;
  questionsCompleted: number;
  studyMinutes: number;
}

export interface EAAnalytics {
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
  
  // Part breakdown
  partMastery: Record<EASectionId, PartMastery>;
  
  // Mock exam performance
  mockExamsTaken: number;
  mockExamScores: { part: EASectionId; score: number; date: Date }[];
  scaledScores: { part: EASectionId; score: number; date: Date }[];
  partPerformance: Record<EASectionId, { average: number; best: number; attempts: number }>;
  
  // Predictions
  estimatedPassProbability: Record<EASectionId, number>;
  estimatedScaledScore: Record<EASectionId, number>;
  examReadiness: Record<EASectionId, 'not-ready' | 'getting-close' | 'ready' | 'well-prepared'>;
  
  // Recommendations
  recommendedFocusAreas: string[];
  
  // Trend tracking
  weeklyTrends: PerformanceTrend[];
  dailyTrends: PerformanceTrend[];
  
  // EA-specific metrics
  circular230Knowledge: number; // 0-100 (critical for SEE3)
  irsFormProficiency: number; // 0-100
  taxLawCurrentness: number; // 0-100
}

// ============================================================================
// Part Configuration (IRS SEE Content Outline 2025-2026)
// ============================================================================

export const EA_PART_CONFIG: Record<EASectionId, { name: string; domains: { id: string; name: string; weight: number }[] }> = {
  SEE1: {
    name: 'Individuals',
    domains: [
      { id: 'SEE1-1', name: 'Preliminary Work and Taxpayer Data', weight: 16.5 },
      { id: 'SEE1-2', name: 'Income and Assets', weight: 20.0 },
      { id: 'SEE1-3', name: 'Deductions and Credits', weight: 20.0 },
      { id: 'SEE1-4', name: 'Taxation', weight: 17.6 },
      { id: 'SEE1-5', name: 'Advising the Individual Taxpayer', weight: 12.9 },
      { id: 'SEE1-6', name: 'Specialized Returns', weight: 12.9 },
    ],
  },
  SEE2: {
    name: 'Businesses',
    domains: [
      { id: 'SEE2-1', name: 'Business Entities', weight: 28.2 },
      { id: 'SEE2-2', name: 'Business Financial Information', weight: 38.8 },
      { id: 'SEE2-3', name: 'Specialized Returns for Businesses', weight: 32.9 },
    ],
  },
  SEE3: {
    name: 'Representation',
    domains: [
      { id: 'SEE3-1', name: 'Practices and Procedures', weight: 25.9 },
      { id: 'SEE3-2', name: 'Representation Before IRS (Circular 230)', weight: 17.6 },
      { id: 'SEE3-3', name: 'Specific Areas of Representation', weight: 23.5 },
      { id: 'SEE3-4', name: 'Filing Process', weight: 16.5 },
    ],
  },
};

// ============================================================================
// IRS Score Scaling
// ============================================================================

/**
 * Convert raw percentage score to IRS scaled score (40-130)
 * IRS SEE passing score is 105
 */
export function rawToScaledScore(rawPercentage: number): number {
  // IRS scoring:
  // - 40 minimum
  // - 105 passing (~77% raw)
  // - 130 maximum
  
  if (rawPercentage <= 0) return 40;
  if (rawPercentage >= 100) return 130;
  
  // Linear interpolation: 0% → 40, 100% → 130
  return Math.round(40 + (rawPercentage / 100) * 90);
}

/**
 * Convert scaled score to pass prediction percentage
 */
export function scaledScoreToPassProbability(scaledScore: number): number {
  // 105 = passing threshold (roughly 72% of 130)
  if (scaledScore < 80) return Math.max(0, (scaledScore - 40) / 4);
  if (scaledScore < 95) return 10 + (scaledScore - 80) * 2;
  if (scaledScore < 105) return 40 + (scaledScore - 95) * 5;
  if (scaledScore < 115) return 90 + (scaledScore - 105);
  return 99;
}

// ============================================================================
// Core Functions
// ============================================================================

const STORAGE_KEY = 'ea-analytics';

/**
 * Initialize empty analytics for a user
 */
export function initializeAnalytics(userId: string): EAAnalytics {
  const partMastery: Record<EASectionId, PartMastery> = {} as Record<EASectionId, PartMastery>;
  const estimatedPassProbability: Record<EASectionId, number> = {} as Record<EASectionId, number>;
  const estimatedScaledScore: Record<EASectionId, number> = {} as Record<EASectionId, number>;
  const examReadiness: Record<EASectionId, 'not-ready' | 'getting-close' | 'ready' | 'well-prepared'> = {} as Record<EASectionId, 'not-ready' | 'getting-close' | 'ready' | 'well-prepared'>;
  const partPerformance: Record<EASectionId, { average: number; best: number; attempts: number }> = {} as Record<EASectionId, { average: number; best: number; attempts: number }>;
  
  const parts: EASectionId[] = ['SEE1', 'SEE2', 'SEE3'];
  parts.forEach(part => {
    const config = EA_PART_CONFIG[part];
    partMastery[part] = {
      part,
      partName: config.name,
      questionsAttempted: 0,
      questionsCorrect: 0,
      accuracy: 0,
      masteryLevel: 'novice',
      trend: 'stable',
      averageTimePerQuestion: 0,
      lastPracticed: null,
      weakDomains: config.domains.map(d => d.id),
      strongDomains: [],
      domainAccuracy: {},
    };
    estimatedPassProbability[part] = 0;
    estimatedScaledScore[part] = 40;
    examReadiness[part] = 'not-ready';
    partPerformance[part] = { average: 0, best: 0, attempts: 0 };
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
    mockExamsTaken: 0,
    mockExamScores: [],
    scaledScores: [],
    partPerformance,
    estimatedPassProbability,
    estimatedScaledScore,
    examReadiness,
    recommendedFocusAreas: ['SEE1-2', 'SEE2-2', 'SEE3-2'], // High-weight domains
    weeklyTrends: [],
    dailyTrends: [],
    circular230Knowledge: 0,
    irsFormProficiency: 0,
    taxLawCurrentness: 0,
  };
}

/**
 * Load analytics from localStorage
 */
export function loadAnalytics(): EAAnalytics | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Restore dates
      if (parsed.lastUpdated) parsed.lastUpdated = new Date(parsed.lastUpdated);
      if (parsed.lastStudyDate) parsed.lastStudyDate = new Date(parsed.lastStudyDate);
      Object.values(parsed.partMastery).forEach((pm: unknown) => {
        const partM = pm as PartMastery;
        if (partM.lastPracticed) partM.lastPracticed = new Date(partM.lastPracticed);
      });
      return parsed;
    }
  } catch (e) {
    console.error('Failed to load EA analytics:', e);
  }
  return null;
}

/**
 * Save analytics to localStorage
 */
export function saveAnalytics(analytics: EAAnalytics): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(analytics));
  } catch (e) {
    console.error('Failed to save EA analytics:', e);
  }
}

// Module-level analytics state
let analyticsState: EAAnalytics | null = loadAnalytics();

/**
 * Get or initialize analytics
 */
export function getAnalytics(userId: string): EAAnalytics {
  if (!analyticsState || analyticsState.userId !== userId) {
    analyticsState = loadAnalytics() || initializeAnalytics(userId);
  }
  return analyticsState;
}

/**
 * Calculate mastery level based on accuracy and question count
 */
function calculateMasteryLevel(accuracy: number, questionCount: number): 'novice' | 'developing' | 'proficient' | 'expert' {
  if (questionCount < 10) return 'novice';
  if (accuracy < 60) return 'novice';
  if (accuracy < 75) return 'developing';
  if (accuracy < 85 || questionCount < 50) return 'proficient';
  return 'expert';
}

/**
 * Record a question attempt
 */
export function recordQuestionAttempt(attempt: QuestionAttempt): EAAnalytics {
  if (!analyticsState) {
    analyticsState = initializeAnalytics('default');
  }
  
  const analytics = { ...analyticsState };
  const part = attempt.part;
  
  // Update overall stats
  analytics.totalQuestionsAttempted++;
  if (attempt.isCorrect) {
    analytics.totalQuestionsCorrect++;
  }
  analytics.overallAccuracy = Math.round(
    (analytics.totalQuestionsCorrect / analytics.totalQuestionsAttempted) * 100
  );
  
  // Update average time (running average)
  const oldTotal = (analyticsState.totalQuestionsAttempted) * analyticsState.averageTimePerQuestion;
  analytics.averageTimePerQuestion = Math.round(
    (oldTotal + attempt.timeSpent) / analytics.totalQuestionsAttempted
  );
  
  // Update part mastery
  if (analytics.partMastery[part]) {
    const partStats = { ...analytics.partMastery[part] };
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
    
    // Update mastery level
    partStats.masteryLevel = calculateMasteryLevel(partStats.accuracy, partStats.questionsAttempted);
    
    // Update domain accuracy if domain provided
    if (attempt.domain) {
      const currentDomainAccuracy = partStats.domainAccuracy[attempt.domain] || 0;
      const domainAttempts = Object.values(partStats.domainAccuracy).length || 1;
      // Simple running average
      partStats.domainAccuracy[attempt.domain] = Math.round(
        (currentDomainAccuracy * (domainAttempts - 1) + (attempt.isCorrect ? 100 : 0)) / domainAttempts
      );
      
      // Update weak/strong domains
      partStats.weakDomains = Object.entries(partStats.domainAccuracy)
        .filter(([, acc]) => acc < 70)
        .map(([domain]) => domain);
      partStats.strongDomains = Object.entries(partStats.domainAccuracy)
        .filter(([, acc]) => acc >= 80)
        .map(([domain]) => domain);
    }
    
    analytics.partMastery[part] = partStats;
  }
  
  // Update EA-specific metrics
  if (part === 'SEE3' && attempt.domain === 'SEE3-2') {
    // Circular 230 questions
    const delta = attempt.isCorrect ? 2 : -1;
    analytics.circular230Knowledge = Math.min(100, Math.max(0, 
      analytics.circular230Knowledge + delta
    ));
  }
  
  if (attempt.irsFormRef) {
    const delta = attempt.isCorrect ? 1 : -0.5;
    analytics.irsFormProficiency = Math.min(100, Math.max(0, 
      analytics.irsFormProficiency + delta
    ));
  }
  
  analytics.lastUpdated = new Date();
  
  // Recalculate predictions
  const updatedAnalytics = updatePredictions(analytics);
  analyticsState = updatedAnalytics;
  saveAnalytics(updatedAnalytics);
  
  return updatedAnalytics;
}

/**
 * Record a study session
 */
export function recordStudySession(session: StudySession): EAAnalytics {
  if (!analyticsState) {
    analyticsState = initializeAnalytics('default');
  }
  
  const analytics = { ...analyticsState };
  
  // Update study time
  analytics.totalStudyMinutes += session.duration;
  
  // Update streak
  const today = new Date().toDateString();
  const lastStudy = analytics.lastStudyDate?.toDateString();
  
  if (lastStudy !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastStudy === yesterday.toDateString()) {
      analytics.currentStreak++;
    } else if (lastStudy !== today) {
      analytics.currentStreak = 1;
    }
    
    if (analytics.currentStreak > analytics.longestStreak) {
      analytics.longestStreak = analytics.currentStreak;
    }
    
    analytics.studyDays++;
  }
  
  analytics.lastStudyDate = session.date;
  analytics.lastUpdated = new Date();
  
  analyticsState = analytics;
  saveAnalytics(analytics);
  
  return analytics;
}

/**
 * Record a mock exam result
 */
export function recordMockExam(part: EASectionId, rawScore: number): EAAnalytics {
  if (!analyticsState) {
    analyticsState = initializeAnalytics('default');
  }
  
  const analytics = { ...analyticsState };
  const scaledScore = rawToScaledScore(rawScore);
  const now = new Date();
  
  analytics.mockExamsTaken++;
  analytics.mockExamScores.push({ part, score: rawScore, date: now });
  analytics.scaledScores.push({ part, score: scaledScore, date: now });
  
  // Update part performance
  const partPerf = analytics.partPerformance[part];
  partPerf.attempts++;
  partPerf.average = Math.round(
    (partPerf.average * (partPerf.attempts - 1) + rawScore) / partPerf.attempts
  );
  if (rawScore > partPerf.best) {
    partPerf.best = rawScore;
  }
  
  analytics.lastUpdated = now;
  
  const updatedAnalytics = updatePredictions(analytics);
  analyticsState = updatedAnalytics;
  saveAnalytics(updatedAnalytics);
  
  return updatedAnalytics;
}

/**
 * Update predictions based on current performance
 */
function updatePredictions(analytics: EAAnalytics): EAAnalytics {
  const parts: EASectionId[] = ['SEE1', 'SEE2', 'SEE3'];
  
  parts.forEach(part => {
    const partMastery = analytics.partMastery[part];
    
    // Estimate scaled score based on accuracy
    const estimatedRaw = partMastery.accuracy;
    analytics.estimatedScaledScore[part] = rawToScaledScore(estimatedRaw);
    
    // Calculate pass probability
    analytics.estimatedPassProbability[part] = scaledScoreToPassProbability(
      analytics.estimatedScaledScore[part]
    );
    
    // Determine readiness level
    const prob = analytics.estimatedPassProbability[part];
    const questions = partMastery.questionsAttempted;
    
    if (prob < 40 || questions < 100) {
      analytics.examReadiness[part] = 'not-ready';
    } else if (prob < 70 || questions < 300) {
      analytics.examReadiness[part] = 'getting-close';
    } else if (prob < 85) {
      analytics.examReadiness[part] = 'ready';
    } else {
      analytics.examReadiness[part] = 'well-prepared';
    }
  });
  
  // Update recommended focus areas
  const allWeakDomains: string[] = [];
  parts.forEach(part => {
    allWeakDomains.push(...analytics.partMastery[part].weakDomains);
  });
  
  // Prioritize by exam weight
  analytics.recommendedFocusAreas = allWeakDomains
    .sort((a, b) => {
      const weightA = getDomainWeight(a);
      const weightB = getDomainWeight(b);
      return weightB - weightA;
    })
    .slice(0, 5);
  
  return analytics;
}

/**
 * Get domain weight from configuration
 */
function getDomainWeight(domainId: string): number {
  for (const part of Object.values(EA_PART_CONFIG)) {
    const domain = part.domains.find(d => d.id === domainId);
    if (domain) return domain.weight;
  }
  return 0;
}

/**
 * Get analytics insights for dashboard
 */
export function getInsights(): {
  overview: { accuracy: number; questionsCompleted: number; studyHours: number; streak: number };
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  partBreakdown: { part: EASectionId; accuracy: number; readiness: string; passProbability: number }[];
} {
  if (!analyticsState) {
    return {
      overview: { accuracy: 0, questionsCompleted: 0, studyHours: 0, streak: 0 },
      strengths: [],
      weaknesses: [],
      recommendations: ['Start practicing to see insights'],
      partBreakdown: [],
    };
  }
  
  const parts: EASectionId[] = ['SEE1', 'SEE2', 'SEE3'];
  
  const partBreakdown = parts.map(part => ({
    part,
    accuracy: analyticsState!.partMastery[part].accuracy,
    readiness: analyticsState!.examReadiness[part],
    passProbability: analyticsState!.estimatedPassProbability[part],
  }));
  
  const allStrong = parts.flatMap(p => analyticsState!.partMastery[p].strongDomains);
  const allWeak = parts.flatMap(p => analyticsState!.partMastery[p].weakDomains);
  
  const recommendations: string[] = [];
  
  // Generate recommendations
  if (analyticsState.circular230Knowledge < 70) {
    recommendations.push('Focus on Circular 230 - essential for SEE3');
  }
  
  parts.forEach(part => {
    if (analyticsState!.examReadiness[part] === 'not-ready') {
      recommendations.push(`Increase practice volume for ${part} (${EA_PART_CONFIG[part].name})`);
    }
  });
  
  if (analyticsState.currentStreak < 7) {
    recommendations.push('Build a daily study habit - consistency is key');
  }
  
  return {
    overview: {
      accuracy: analyticsState.overallAccuracy,
      questionsCompleted: analyticsState.totalQuestionsAttempted,
      studyHours: Math.round(analyticsState.totalStudyMinutes / 60),
      streak: analyticsState.currentStreak,
    },
    strengths: allStrong.slice(0, 5),
    weaknesses: allWeak.slice(0, 5),
    recommendations: recommendations.slice(0, 5),
    partBreakdown,
  };
}

/**
 * Reset analytics (for testing)
 */
export function resetAnalytics(userId: string): EAAnalytics {
  analyticsState = initializeAnalytics(userId);
  saveAnalytics(analyticsState);
  return analyticsState;
}

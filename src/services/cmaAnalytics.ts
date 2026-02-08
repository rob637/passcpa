/**
 * CMA Analytics Service
 * 
 * Comprehensive analytics tracking for CMA (Certified Management Accountant) exam preparation.
 * Tracks question attempts, study sessions, domain mastery, and exam readiness.
 * 
 * IMA CMA Exam Structure:
 * - Part 1: Financial Planning, Performance, and Analytics (100 MCQ, 4 hours)
 * - Part 2: Strategic Financial Management (100 MCQ, 4 hours)
 * 
 * Scoring: 0-500 scale, 360 passing
 */

import { CMASectionId } from './cmaAdaptiveEngine';

// ============================================================================
// Types and Interfaces
// ============================================================================

export interface QuestionAttempt {
  questionId: string;
  part: CMASectionId;
  domain?: string; // e.g., 'CMA1-A', 'CMA2-C'
  topic?: string;
  isCorrect: boolean;
  timeSpent: number; // seconds
  attemptedAt: Date;
}

export interface StudySession {
  sessionId: string;
  date: Date;
  duration: number; // minutes
  type: 'practice' | 'flashcards' | 'lessons' | 'simulation' | 'review';
  part?: CMASectionId;
  questionsAttempted?: number;
}

export interface PartMastery {
  part: CMASectionId;
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

export interface CMAAnalytics {
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
  partMastery: Record<CMASectionId, PartMastery>;
  
  // Mock exam performance
  mockExamsTaken: number;
  mockExamScores: { part: CMASectionId; score: number; date: Date }[];
  scaledScores: { part: CMASectionId; score: number; date: Date }[];
  partPerformance: Record<CMASectionId, { average: number; best: number; attempts: number }>;
  
  // Predictions
  estimatedPassProbability: Record<CMASectionId, number>;
  estimatedScaledScore: Record<CMASectionId, number>;
  examReadiness: Record<CMASectionId, 'not-ready' | 'getting-close' | 'ready' | 'well-prepared'>;
  
  // Recommendations
  recommendedFocusAreas: string[];
  
  // Trend tracking
  weeklyTrends: PerformanceTrend[];
  dailyTrends: PerformanceTrend[];
  
  // CMA-specific metrics
  financialAnalysisSkill: number; // 0-100
  strategicThinkingScore: number; // 0-100
  ethicsKnowledge: number; // 0-100
}

// ============================================================================
// Part Configuration (IMA CMA Content Specification Outline)
// ============================================================================

export const CMA_PART_CONFIG: Record<CMASectionId, { name: string; domains: { id: string; name: string; weight: number }[] }> = {
  CMA1: {
    name: 'Financial Planning, Performance, and Analytics',
    domains: [
      { id: 'CMA1-A', name: 'External Financial Reporting Decisions', weight: 15 },
      { id: 'CMA1-B', name: 'Planning, Budgeting, and Forecasting', weight: 20 },
      { id: 'CMA1-C', name: 'Performance Management', weight: 20 },
      { id: 'CMA1-D', name: 'Cost Management', weight: 15 },
      { id: 'CMA1-E', name: 'Internal Controls', weight: 15 },
      { id: 'CMA1-F', name: 'Technology and Analytics', weight: 15 },
    ],
  },
  CMA2: {
    name: 'Strategic Financial Management',
    domains: [
      { id: 'CMA2-A', name: 'Financial Statement Analysis', weight: 20 },
      { id: 'CMA2-B', name: 'Corporate Finance', weight: 20 },
      { id: 'CMA2-C', name: 'Decision Analysis', weight: 25 },
      { id: 'CMA2-D', name: 'Risk Management', weight: 10 },
      { id: 'CMA2-E', name: 'Investment Decisions', weight: 10 },
      { id: 'CMA2-F', name: 'Professional Ethics', weight: 15 },
    ],
  },
};

// ============================================================================
// IMA Score Scaling
// ============================================================================

/**
 * Convert raw percentage score to IMA scaled score (0-500)
 * IMA CMA passing score is 360
 */
export function rawToScaledScore(rawPercentage: number): number {
  // IMA scoring: 0-500 scale, 360 passing (~72% raw)
  if (rawPercentage <= 0) return 0;
  if (rawPercentage >= 100) return 500;
  
  // Linear interpolation
  return Math.round((rawPercentage / 100) * 500);
}

/**
 * Convert scaled score to pass prediction percentage
 */
export function scaledScoreToPassProbability(scaledScore: number): number {
  // 360 = passing threshold (72%)
  if (scaledScore < 280) return Math.max(0, (scaledScore / 280) * 20);
  if (scaledScore < 320) return 20 + ((scaledScore - 280) / 40) * 20;
  if (scaledScore < 360) return 40 + ((scaledScore - 320) / 40) * 30;
  if (scaledScore < 400) return 70 + ((scaledScore - 360) / 40) * 20;
  return Math.min(99, 90 + ((scaledScore - 400) / 100) * 9);
}

// ============================================================================
// Core Functions
// ============================================================================

const STORAGE_KEY = 'cma-analytics';

/**
 * Initialize empty analytics for a user
 */
export function initializeAnalytics(userId: string): CMAAnalytics {
  const partMastery: Record<CMASectionId, PartMastery> = {} as Record<CMASectionId, PartMastery>;
  const estimatedPassProbability: Record<CMASectionId, number> = {} as Record<CMASectionId, number>;
  const estimatedScaledScore: Record<CMASectionId, number> = {} as Record<CMASectionId, number>;
  const examReadiness: Record<CMASectionId, 'not-ready' | 'getting-close' | 'ready' | 'well-prepared'> = {} as Record<CMASectionId, 'not-ready' | 'getting-close' | 'ready' | 'well-prepared'>;
  const partPerformance: Record<CMASectionId, { average: number; best: number; attempts: number }> = {} as Record<CMASectionId, { average: number; best: number; attempts: number }>;
  
  const parts: CMASectionId[] = ['CMA1', 'CMA2'];
  parts.forEach(part => {
    const config = CMA_PART_CONFIG[part];
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
    estimatedScaledScore[part] = 0;
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
    recommendedFocusAreas: ['CMA1-B', 'CMA1-C', 'CMA2-C'], // High-weight domains
    weeklyTrends: [],
    dailyTrends: [],
    financialAnalysisSkill: 0,
    strategicThinkingScore: 0,
    ethicsKnowledge: 0,
  };
}

/**
 * Load analytics from localStorage
 */
export function loadAnalytics(): CMAAnalytics | null {
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
    console.error('Failed to load CMA analytics:', e);
  }
  return null;
}

/**
 * Save analytics to localStorage
 */
export function saveAnalytics(analytics: CMAAnalytics): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(analytics));
  } catch (e) {
    console.error('Failed to save CMA analytics:', e);
  }
}

// Module-level analytics state
let analyticsState: CMAAnalytics | null = loadAnalytics();

/**
 * Get or initialize analytics
 */
export function getAnalytics(userId: string): CMAAnalytics {
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
  if (accuracy < 72) return 'developing';
  if (accuracy < 85 || questionCount < 50) return 'proficient';
  return 'expert';
}

/**
 * Record a question attempt
 */
export function recordQuestionAttempt(attempt: QuestionAttempt): CMAAnalytics {
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
  
  // Update CMA-specific metrics
  if (part === 'CMA2' && attempt.domain === 'CMA2-A') {
    const delta = attempt.isCorrect ? 2 : -1;
    analytics.financialAnalysisSkill = Math.min(100, Math.max(0, 
      analytics.financialAnalysisSkill + delta
    ));
  }
  
  if (attempt.domain === 'CMA2-C' || attempt.domain === 'CMA2-E') {
    const delta = attempt.isCorrect ? 1 : -0.5;
    analytics.strategicThinkingScore = Math.min(100, Math.max(0, 
      analytics.strategicThinkingScore + delta
    ));
  }
  
  if (attempt.domain === 'CMA2-F') {
    const delta = attempt.isCorrect ? 2 : -1;
    analytics.ethicsKnowledge = Math.min(100, Math.max(0, 
      analytics.ethicsKnowledge + delta
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
export function recordStudySession(session: StudySession): CMAAnalytics {
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
export function recordMockExam(part: CMASectionId, rawScore: number): CMAAnalytics {
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
function updatePredictions(analytics: CMAAnalytics): CMAAnalytics {
  const parts: CMASectionId[] = ['CMA1', 'CMA2'];
  
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
  for (const part of Object.values(CMA_PART_CONFIG)) {
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
  partBreakdown: { part: CMASectionId; accuracy: number; readiness: string; passProbability: number }[];
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
  
  const parts: CMASectionId[] = ['CMA1', 'CMA2'];
  
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
  if (analyticsState.ethicsKnowledge < 70) {
    recommendations.push('Focus on Professional Ethics (CMA2-F) - 15% of Part 2');
  }
  
  parts.forEach(part => {
    if (analyticsState!.examReadiness[part] === 'not-ready') {
      recommendations.push(`Increase practice volume for ${part} (${CMA_PART_CONFIG[part].name})`);
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
export function resetAnalytics(userId: string): CMAAnalytics {
  analyticsState = initializeAnalytics(userId);
  saveAnalytics(analyticsState);
  return analyticsState;
}

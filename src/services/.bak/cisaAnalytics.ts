/**
 * CISA Analytics Service
 * 
 * Comprehensive analytics tracking for CISA exam preparation.
 * Tracks question attempts, study sessions, domain mastery, and exam readiness.
 * 
 * CISA Exam Structure:
 * - Domain 1: Information Systems Auditing Process (18%)
 * - Domain 2: Governance and Management of IT (18%)
 * - Domain 3: Information Systems Acquisition, Development, and Implementation (12%)
 * - Domain 4: Information Systems Operations and Business Resilience (26%)
 * - Domain 5: Protection of Information Assets (26%)
 * 
 * Scoring: 200-800 scale, 450 passing
 * Duration: 4 hours, 150 questions
 */

// ============================================================================
// Types and Interfaces
// ============================================================================

export interface QuestionAttempt {
  questionId: string;
  domain: string;
  topic?: string;
  isCorrect: boolean;
  timeSpent: number; // seconds
  attemptedAt: Date;
  cognitiveLevel?: 'recall' | 'application' | 'analysis';
  isacaStandard?: string;
}

export interface StudySession {
  sessionId: string;
  date: Date;
  duration: number; // minutes
  type: 'practice' | 'flashcards' | 'lessons' | 'simulation' | 'review';
  domain?: string;
  questionsAttempted?: number;
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
  isacaStandardsMastery?: Record<string, number>;
}

export interface PerformanceTrend {
  date: Date;
  accuracy: number;
  questionsCompleted: number;
  studyMinutes: number;
}

export interface CISAAnalytics {
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
  
  // Domain breakdown with CISA domains
  domainMastery: Record<string, DomainMastery>;
  
  // Mock exam performance
  mockExamsTaken: number;
  mockExamScores: number[]; // Raw scores 0-100
  scaledScores: number[]; // ISACA 200-800 scale
  averageMockScore: number;
  bestMockScore: number;
  averageScaledScore: number;
  bestScaledScore: number;
  
  // Predictions
  estimatedPassProbability: number;
  estimatedScaledScore: number;
  examReadiness: 'not-ready' | 'getting-close' | 'ready' | 'well-prepared';
  
  // Recommendations
  recommendedFocusAreas: string[];
  
  // Trend tracking
  weeklyTrends: PerformanceTrend[];
  dailyTrends: PerformanceTrend[];
  
  // CISA-specific metrics
  isacaStandardsKnowledge: number; // 0-100
  controlFrameworksFamiliarity: number; // 0-100 (COBIT, ITIL, etc.)
  auditMethodologyProficiency: number; // 0-100
  practiceSimulationsCompleted: number;
}

// ============================================================================
// Domain Configuration
// ============================================================================

export const CISA_DOMAIN_CONFIG: Record<string, { name: string; weight: number; topics: string[] }> = {
  CISA1: {
    name: 'Information Systems Auditing Process',
    weight: 21,
    topics: [
      'IS Audit Standards and Guidelines',
      'Risk-Based Audit Planning',
      'Audit Execution',
      'Audit Reporting and Follow-up',
      'Quality Assurance',
    ],
  },
  CISA2: {
    name: 'Governance and Management of IT',
    weight: 16,
    topics: [
      'IT Governance Structure',
      'IT Strategy and Policies',
      'IT Resource Management',
      'IT Risk Management',
      'Business Continuity',
    ],
  },
  CISA3: {
    name: 'Information Systems Acquisition, Development, and Implementation',
    weight: 18,
    topics: [
      'Project Governance',
      'SDLC and Methodologies',
      'System Design and Implementation',
      'Testing and QA',
      'Post-Implementation Review',
    ],
  },
  CISA4: {
    name: 'Information Systems Operations and Business Resilience',
    weight: 20,
    topics: [
      'IS Operations',
      'Hardware and System Architecture',
      'IT Asset Management',
      'Disaster Recovery',
      'Business Continuity Planning',
    ],
  },
  CISA5: {
    name: 'Protection of Information Assets',
    weight: 25,
    topics: [
      'Information Security Frameworks',
      'Access Controls',
      'Network Security',
      'Data Classification',
      'Security Incident Management',
    ],
  },
};

// ============================================================================
// ISACA Score Scaling
// ============================================================================

/**
 * Convert raw percentage score to ISACA scaled score (200-800)
 * ISACA uses a scaled score where 450 = passing
 * This is an approximation based on public ISACA information
 */
export function rawToScaledScore(rawPercentage: number): number {
  // ISACA scaling is proprietary, but we approximate:
  // - 0% → ~200
  // - 60% → ~450 (passing)
  // - 100% → ~800
  // Using a linear interpolation with slight curve
  
  if (rawPercentage <= 0) return 200;
  if (rawPercentage >= 100) return 800;
  
  // Passing threshold: ~60% raw = 450 scaled
  // Lower portion: 0-60% raw maps to 200-450
  // Upper portion: 60-100% raw maps to 450-800
  
  if (rawPercentage <= 60) {
    // Linear from 200 to 450
    return Math.round(200 + (rawPercentage / 60) * 250);
  } else {
    // Linear from 450 to 800
    return Math.round(450 + ((rawPercentage - 60) / 40) * 350);
  }
}

/**
 * Convert scaled score to pass prediction percentage
 */
export function scaledScoreToPassProbability(scaledScore: number): number {
  // 450 = passing threshold
  if (scaledScore < 350) return Math.max(0, (scaledScore - 200) / 1.5);
  if (scaledScore < 400) return 10 + (scaledScore - 350) * 0.4;
  if (scaledScore < 450) return 30 + (scaledScore - 400) * 0.8;
  if (scaledScore < 500) return 70 + (scaledScore - 450) * 0.5;
  if (scaledScore < 600) return 95 + (scaledScore - 500) * 0.04;
  return 99;
}

// ============================================================================
// Core Functions
// ============================================================================

/**
 * Initialize empty analytics for a user
 */
export function initializeAnalytics(userId: string): CISAAnalytics {
  const domainMastery: Record<string, DomainMastery> = {};
  
  Object.entries(CISA_DOMAIN_CONFIG).forEach(([domain, config]) => {
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
      weakTopics: config.topics,
      strongTopics: [],
      isacaStandardsMastery: {},
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
    scaledScores: [],
    averageMockScore: 0,
    bestMockScore: 0,
    averageScaledScore: 200,
    bestScaledScore: 200,
    estimatedPassProbability: 0,
    estimatedScaledScore: 200,
    examReadiness: 'not-ready',
    recommendedFocusAreas: Object.keys(CISA_DOMAIN_CONFIG),
    weeklyTrends: [],
    dailyTrends: [],
    isacaStandardsKnowledge: 0,
    controlFrameworksFamiliarity: 0,
    auditMethodologyProficiency: 0,
    practiceSimulationsCompleted: 0,
  };
}

/**
 * Record a question attempt
 */
export function recordQuestionAttempt(
  analytics: CISAAnalytics,
  attempt: QuestionAttempt
): CISAAnalytics {
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
  const oldTotal = (analytics.totalQuestionsAttempted) * analytics.averageTimePerQuestion;
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
    
    // Track ISACA standards if provided
    if (attempt.isacaStandard && domainStats.isacaStandardsMastery) {
      const currentMastery = domainStats.isacaStandardsMastery[attempt.isacaStandard] || 0;
      // Running average for standard mastery
      domainStats.isacaStandardsMastery[attempt.isacaStandard] = 
        Math.round((currentMastery + (attempt.isCorrect ? 100 : 0)) / 2);
    }
    
    newAnalytics.domainMastery[domain] = domainStats;
  }
  
  // Update CISA-specific metrics based on cognitive level
  if (attempt.cognitiveLevel === 'analysis') {
    // Analysis questions test audit methodology
    const delta = attempt.isCorrect ? 1 : -0.5;
    newAnalytics.auditMethodologyProficiency = Math.min(100, Math.max(0, 
      newAnalytics.auditMethodologyProficiency + delta
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
  analytics: CISAAnalytics,
  session: StudySession
): CISAAnalytics {
  const newAnalytics = { ...analytics };
  
  // Update study time
  newAnalytics.totalStudyMinutes += session.duration;
  
  // Track simulation completions
  if (session.type === 'simulation') {
    newAnalytics.practiceSimulationsCompleted++;
  }
  
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
  analytics: CISAAnalytics,
  score: number,
  domainScores: Record<string, { correct: number; total: number }>
): CISAAnalytics {
  const newAnalytics = { ...analytics };
  
  // Calculate scaled score
  const scaledScore = rawToScaledScore(score);
  
  // Update mock exam stats
  newAnalytics.mockExamsTaken++;
  newAnalytics.mockExamScores.push(score);
  newAnalytics.scaledScores.push(scaledScore);
  
  newAnalytics.averageMockScore = Math.round(
    newAnalytics.mockExamScores.reduce((a, b) => a + b, 0) / newAnalytics.mockExamScores.length
  );
  newAnalytics.bestMockScore = Math.max(...newAnalytics.mockExamScores);
  
  newAnalytics.averageScaledScore = Math.round(
    newAnalytics.scaledScores.reduce((a, b) => a + b, 0) / newAnalytics.scaledScores.length
  );
  newAnalytics.bestScaledScore = Math.max(...newAnalytics.scaledScores);
  
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
 * CISA-specific thresholds (slightly higher due to professional nature)
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
  
  // CISA passing is ~60%, so adjust thresholds accordingly
  if (accuracy >= 90) return 'expert';
  if (accuracy >= 78) return 'proficient';
  if (accuracy >= 65) return 'developing';
  return 'novice';
}

/**
 * Update trend for a domain
 */
export function updateDomainTrend(
  analytics: CISAAnalytics,
  domain: string,
  recentAccuracy: number
): CISAAnalytics {
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
 * Update ISACA standards knowledge score
 */
export function updateIsacaStandardsKnowledge(
  analytics: CISAAnalytics,
  standardsScore: number
): CISAAnalytics {
  return {
    ...analytics,
    isacaStandardsKnowledge: Math.min(100, Math.max(0, standardsScore)),
    lastUpdated: new Date(),
  };
}

/**
 * Update control frameworks familiarity score
 */
export function updateControlFrameworksFamiliarity(
  analytics: CISAAnalytics,
  frameworksScore: number
): CISAAnalytics {
  return {
    ...analytics,
    controlFrameworksFamiliarity: Math.min(100, Math.max(0, frameworksScore)),
    lastUpdated: new Date(),
  };
}

/**
 * Update predictions based on current performance
 */
function updatePredictions(analytics: CISAAnalytics): CISAAnalytics {
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
  
  // Estimate scaled score
  newAnalytics.estimatedScaledScore = rawToScaledScore(effectiveScore);
  
  // Calculate pass probability
  // Using a multi-factor model for CISA
  const questionsFactor = Math.min(1, analytics.totalQuestionsAttempted / 600); // CISA has more questions
  const mockExamFactor = Math.min(1, analytics.mockExamsTaken / 3);
  const accuracyFactor = effectiveScore / 100;
  const simulationsFactor = Math.min(1, analytics.practiceSimulationsCompleted / 5);
  
  // Standards and frameworks knowledge factor (CISA-specific)
  const cisaSpecificFactor = (
    (analytics.isacaStandardsKnowledge / 100) * 0.3 +
    (analytics.controlFrameworksFamiliarity / 100) * 0.3 +
    (analytics.auditMethodologyProficiency / 100) * 0.4
  );
  
  // Combined probability (weighted formula)
  let rawProbability = (
    accuracyFactor * 0.40 +
    (analytics.bestMockScore / 100) * 0.25 +
    questionsFactor * 0.10 +
    mockExamFactor * 0.10 +
    simulationsFactor * 0.05 +
    cisaSpecificFactor * 0.10
  );
  
  // Apply confidence adjustment based on attempts
  if (analytics.totalQuestionsAttempted < 150) {
    rawProbability *= 0.5; // Low confidence
  } else if (analytics.totalQuestionsAttempted < 400) {
    rawProbability *= 0.75;
  }
  
  newAnalytics.estimatedPassProbability = Math.min(95, Math.round(rawProbability * 100));
  
  // Determine exam readiness based on scaled score
  if (newAnalytics.estimatedScaledScore >= 500) {
    newAnalytics.examReadiness = 'well-prepared';
  } else if (newAnalytics.estimatedScaledScore >= 450) {
    newAnalytics.examReadiness = 'ready';
  } else if (newAnalytics.estimatedScaledScore >= 400) {
    newAnalytics.examReadiness = 'getting-close';
  } else {
    newAnalytics.examReadiness = 'not-ready';
  }
  
  // Identify focus areas (weak domains with high exam weight)
  const focusAreas = Object.values(analytics.domainMastery)
    .filter(d => d.accuracy < 65 || d.questionsAttempted < 30)
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
  analytics: CISAAnalytics,
  trend: PerformanceTrend
): CISAAnalytics {
  const newAnalytics = { ...analytics };
  
  // Keep last 30 days
  newAnalytics.dailyTrends = [...analytics.dailyTrends, trend].slice(-30);
  
  return newAnalytics;
}

/**
 * Add weekly trend data point
 */
export function addWeeklyTrend(
  analytics: CISAAnalytics,
  trend: PerformanceTrend
): CISAAnalytics {
  const newAnalytics = { ...analytics };
  
  // Keep last 12 weeks
  newAnalytics.weeklyTrends = [...analytics.weeklyTrends, trend].slice(-12);
  
  return newAnalytics;
}

/**
 * Get analytics summary for dashboard
 */
export function getAnalyticsSummary(analytics: CISAAnalytics): {
  overview: {
    accuracy: number;
    questionsCompleted: number;
    studyHours: number;
    streak: number;
    scaledScore: number;
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
  cisaSpecific: {
    isacaStandardsScore: number;
    frameworksFamiliarity: number;
    auditProficiency: number;
    simulationsCompleted: number;
  };
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
  
  if (analytics.totalQuestionsAttempted < 300) {
    recommendations.push('Complete more practice questions to build a stronger foundation.');
  }
  
  if (analytics.mockExamsTaken < 2) {
    recommendations.push('Take at least 2 full 150-question mock exams before your exam date.');
  }
  
  if (analytics.practiceSimulationsCompleted < 3) {
    recommendations.push('Complete more practice simulations to prepare for real-world scenarios.');
  }
  
  if (analytics.isacaStandardsKnowledge < 70) {
    recommendations.push('Review ISACA standards and guidelines - these are heavily tested.');
  }
  
  if (analytics.controlFrameworksFamiliarity < 60) {
    recommendations.push('Study control frameworks (COBIT, ITIL, ISO 27001) - key for IT governance.');
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
      scaledScore: analytics.estimatedScaledScore,
      passChance: `${analytics.estimatedPassProbability}%`,
      readiness: formatReadiness(analytics.examReadiness),
    },
    strengths,
    weaknesses,
    recommendations: recommendations.slice(0, 5), // Top 5 recommendations
    domainBreakdown,
    cisaSpecific: {
      isacaStandardsScore: analytics.isacaStandardsKnowledge,
      frameworksFamiliarity: analytics.controlFrameworksFamiliarity,
      auditProficiency: analytics.auditMethodologyProficiency,
      simulationsCompleted: analytics.practiceSimulationsCompleted,
    },
  };
}

/**
 * Format readiness for display
 */
function formatReadiness(readiness: CISAAnalytics['examReadiness']): string {
  switch (readiness) {
    case 'well-prepared': return 'Well Prepared';
    case 'ready': return 'Ready';
    case 'getting-close': return 'Getting Close';
    case 'not-ready': return 'Not Ready';
    default: return 'Unknown';
  }
}

/**
 * Get domain-specific insights
 */
export function getDomainInsights(
  analytics: CISAAnalytics,
  domain: string
): {
  domain: string;
  name: string;
  accuracy: number;
  questionsAttempted: number;
  avgTimePerQuestion: number;
  mastery: string;
  trend: string;
  examWeight: number;
  isOnTrack: boolean;
  gapToTarget: number;
  weakTopics: string[];
  strongTopics: string[];
  recommendations: string[];
} | null {
  const domainMastery = analytics.domainMastery[domain];
  if (!domainMastery) return null;
  
  const targetAccuracy = 70; // Minimum target for CISA passing
  const gapToTarget = Math.max(0, targetAccuracy - domainMastery.accuracy);
  const isOnTrack = domainMastery.accuracy >= targetAccuracy && domainMastery.questionsAttempted >= 25;
  
  const recommendations: string[] = [];
  
  if (domainMastery.questionsAttempted < 25) {
    recommendations.push(`Complete at least ${25 - domainMastery.questionsAttempted} more questions in this domain.`);
  }
  
  if (domainMastery.accuracy < 60) {
    recommendations.push('Review the fundamental concepts before attempting more questions.');
  } else if (domainMastery.accuracy < 70) {
    recommendations.push('Focus on your weak topics to push your accuracy above passing threshold.');
  }
  
  if (domainMastery.averageTimePerQuestion > 120) {
    recommendations.push('Work on time management - aim for under 90 seconds per question.');
  }
  
  if (domainMastery.trend === 'declining') {
    recommendations.push('Your recent performance is declining. Consider reviewing basics before continuing.');
  }
  
  return {
    domain: domainMastery.domain,
    name: domainMastery.domainName,
    accuracy: domainMastery.accuracy,
    questionsAttempted: domainMastery.questionsAttempted,
    avgTimePerQuestion: domainMastery.averageTimePerQuestion,
    mastery: domainMastery.masteryLevel,
    trend: domainMastery.trend,
    examWeight: domainMastery.examWeight,
    isOnTrack,
    gapToTarget,
    weakTopics: domainMastery.weakTopics,
    strongTopics: domainMastery.strongTopics,
    recommendations,
  };
}

/**
 * Calculate study plan progress
 */
export function getStudyPlanProgress(analytics: CISAAnalytics): {
  overallProgress: number;
  domainProgress: Record<string, number>;
  milestonesCompleted: string[];
  nextMilestone: string;
} {
  // Calculate per-domain progress
  const domainProgress: Record<string, number> = {};
  let totalProgress = 0;
  let domainCount = 0;
  
  Object.entries(analytics.domainMastery).forEach(([domain, mastery]) => {
    // Progress is based on questions attempted (max 50) and accuracy (max 80)
    const questionsProgress = Math.min(1, mastery.questionsAttempted / 50) * 50;
    const accuracyProgress = Math.min(1, mastery.accuracy / 80) * 50;
    const progress = Math.round(questionsProgress + accuracyProgress);
    
    domainProgress[domain] = progress;
    totalProgress += progress;
    domainCount++;
  });
  
  const overallProgress = Math.round(totalProgress / domainCount);
  
  // Determine completed milestones
  const milestonesCompleted: string[] = [];
  
  if (analytics.totalQuestionsAttempted >= 100) {
    milestonesCompleted.push('100 Questions Completed');
  }
  if (analytics.totalQuestionsAttempted >= 500) {
    milestonesCompleted.push('500 Questions Completed');
  }
  if (analytics.mockExamsTaken >= 1) {
    milestonesCompleted.push('First Mock Exam Taken');
  }
  if (analytics.bestScaledScore >= 450) {
    milestonesCompleted.push('Passed a Mock Exam');
  }
  if (analytics.currentStreak >= 7) {
    milestonesCompleted.push('7-Day Study Streak');
  }
  if (analytics.practiceSimulationsCompleted >= 3) {
    milestonesCompleted.push('Completed 3 Practice Simulations');
  }
  if (Object.values(analytics.domainMastery).every(d => d.accuracy >= 70)) {
    milestonesCompleted.push('All Domains Above 70%');
  }
  
  // Determine next milestone
  let nextMilestone = '';
  if (analytics.totalQuestionsAttempted < 100) {
    nextMilestone = `Complete ${100 - analytics.totalQuestionsAttempted} more questions`;
  } else if (analytics.mockExamsTaken < 1) {
    nextMilestone = 'Take your first mock exam';
  } else if (analytics.bestScaledScore < 450) {
    nextMilestone = 'Score 450+ on a mock exam';
  } else if (analytics.practiceSimulationsCompleted < 3) {
    nextMilestone = 'Complete 3 practice simulations';
  } else if (!Object.values(analytics.domainMastery).every(d => d.accuracy >= 70)) {
    const weakDomain = Object.values(analytics.domainMastery)
      .filter(d => d.accuracy < 70)
      .sort((a, b) => b.examWeight - a.examWeight)[0];
    nextMilestone = `Get ${weakDomain.domainName} to 70%+ accuracy`;
  } else {
    nextMilestone = 'Ready for exam day!';
  }
  
  return {
    overallProgress,
    domainProgress,
    milestonesCompleted,
    nextMilestone,
  };
}

/**
 * Export analytics for persistence
 */
export function serializeAnalytics(analytics: CISAAnalytics): string {
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
export function deserializeAnalytics(json: string): CISAAnalytics {
  return JSON.parse(json, (_, value) => {
    // Convert date strings back to Date objects
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return date;
      }
    }
    return value;
  });
}

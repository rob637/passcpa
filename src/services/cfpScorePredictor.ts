/**
 * CFP Exam Score Predictor
 * 
 * Uses multiple data points to estimate probability of passing the CFP exam.
 * Provides confidence intervals and identifies areas needing improvement.
 */

/**
 * Domain weights on the actual CFP exam
 */
export const CFP_DOMAIN_WEIGHTS: Record<string, number> = {
  RET: 0.19, // Retirement Planning
  GEN: 0.18, // General Principles
  PRO: 0.15, // Professional Conduct
  TAX: 0.14, // Tax Planning
  EST: 0.12, // Estate Planning
  RISK: 0.12, // Risk Management
  INV: 0.11  // Investment Planning
};

/**
 * Passing threshold (estimated based on historical data)
 */
export const PASSING_SCORE = 70;

/**
 * Performance data for a single domain
 */
export interface DomainPerformance {
  domain: string;
  questionsAttempted: number;
  correctAnswers: number;
  accuracy: number;
  consistency: number; // How consistent are the scores
  recentTrend: 'improving' | 'stable' | 'declining';
  avgTimePerQuestion: number; // seconds
}

/**
 * Mock exam result
 */
export interface MockExamResult {
  examId: string;
  date: Date;
  overallScore: number;
  domainScores: Record<string, number>;
  questionsAttempted: number;
  timeUsed: number; // minutes
  completed: boolean;
}

/**
 * Prediction result with detailed breakdown
 */
export interface ScorePrediction {
  predictedScore: number;
  confidenceInterval: {
    low: number;
    high: number;
    confidence: number; // percentage (e.g., 90)
  };
  passProbability: number;
  readinessLevel: 'not-ready' | 'needs-work' | 'getting-close' | 'ready' | 'well-prepared';
  domainPredictions: Record<string, {
    predictedScore: number;
    contribution: number;
    status: 'weak' | 'developing' | 'proficient' | 'strong';
  }>;
  factors: PredictionFactor[];
  recommendations: string[];
  daysOfStudyRecommended: number;
  lastUpdated: Date;
}

/**
 * Individual factor contributing to prediction
 */
export interface PredictionFactor {
  name: string;
  weight: number;
  score: number;
  impact: 'positive' | 'neutral' | 'negative';
  description: string;
}

/**
 * Input data for prediction algorithm
 */
export interface PredictionInput {
  domainPerformance: DomainPerformance[];
  mockExamResults: MockExamResult[];
  totalQuestionsAttempted: number;
  studyDays: number;
  studyHoursTotal: number;
  lastStudyDate: Date;
  examDate?: Date;
}

/**
 * Calculate predicted exam score and pass probability
 */
export function predictExamScore(input: PredictionInput): ScorePrediction {
  const factors: PredictionFactor[] = [];
  
  // Factor 1: Weighted Domain Performance (40% of prediction)
  const weightedDomainScore = calculateWeightedDomainScore(input.domainPerformance);
  factors.push({
    name: 'Domain Mastery',
    weight: 0.40,
    score: weightedDomainScore,
    impact: weightedDomainScore >= 75 ? 'positive' : weightedDomainScore >= 65 ? 'neutral' : 'negative',
    description: `Your weighted score across all domains is ${weightedDomainScore.toFixed(1)}%`
  });
  
  // Factor 2: Mock Exam Performance (35% of prediction)
  const mockExamScore = calculateMockExamFactor(input.mockExamResults);
  factors.push({
    name: 'Mock Exam Performance',
    weight: 0.35,
    score: mockExamScore.score,
    impact: mockExamScore.score >= 75 ? 'positive' : mockExamScore.score >= 65 ? 'neutral' : 'negative',
    description: mockExamScore.description
  });
  
  // Factor 3: Question Volume (10% of prediction)
  const volumeFactor = calculateVolumeFactor(input.totalQuestionsAttempted);
  factors.push({
    name: 'Practice Volume',
    weight: 0.10,
    score: volumeFactor.score,
    impact: volumeFactor.impact,
    description: volumeFactor.description
  });
  
  // Factor 4: Consistency & Trend (10% of prediction)
  const consistencyFactor = calculateConsistencyFactor(input.domainPerformance, input.mockExamResults);
  factors.push({
    name: 'Consistency & Trend',
    weight: 0.10,
    score: consistencyFactor.score,
    impact: consistencyFactor.impact,
    description: consistencyFactor.description
  });
  
  // Factor 5: Time Management (5% of prediction)
  const timeFactor = calculateTimeFactor(input.domainPerformance, input.mockExamResults);
  factors.push({
    name: 'Time Management',
    weight: 0.05,
    score: timeFactor.score,
    impact: timeFactor.impact,
    description: timeFactor.description
  });
  
  // Calculate weighted prediction
  let predictedScore = 0;
  for (const factor of factors) {
    predictedScore += factor.score * factor.weight;
  }
  
  // Apply regression to mean (predictions tend to be extreme)
  const regressionFactor = 0.85;
  const meanScore = 65;
  predictedScore = (predictedScore * regressionFactor) + (meanScore * (1 - regressionFactor));
  
  // Calculate confidence interval
  const confidenceInterval = calculateConfidenceInterval(
    predictedScore,
    input.mockExamResults.length,
    input.totalQuestionsAttempted
  );
  
  // Calculate pass probability
  const passProbability = calculatePassProbability(predictedScore, confidenceInterval);
  
  // Domain predictions
  const domainPredictions = calculateDomainPredictions(input.domainPerformance);
  
  // Determine readiness level
  const readinessLevel = determineReadinessLevel(passProbability, predictedScore);
  
  // Generate recommendations
  const recommendations = generateRecommendations(
    input.domainPerformance,
    input.mockExamResults,
    predictedScore,
    passProbability
  );
  
  // Estimate days of study needed
  const daysOfStudyRecommended = estimateDaysNeeded(
    predictedScore,
    passProbability,
    input.examDate
  );
  
  return {
    predictedScore: Math.round(predictedScore * 10) / 10,
    confidenceInterval,
    passProbability: Math.round(passProbability * 100) / 100,
    readinessLevel,
    domainPredictions,
    factors,
    recommendations,
    daysOfStudyRecommended,
    lastUpdated: new Date()
  };
}

/**
 * Calculate weighted domain score based on exam weights
 */
function calculateWeightedDomainScore(domainPerformance: DomainPerformance[]): number {
  let weightedSum = 0;
  let totalWeight = 0;
  
  for (const dp of domainPerformance) {
    const weight = CFP_DOMAIN_WEIGHTS[dp.domain] || 0.1;
    weightedSum += dp.accuracy * weight;
    totalWeight += weight;
  }
  
  return totalWeight > 0 ? weightedSum / totalWeight * 100 : 0;
}

/**
 * Calculate mock exam factor
 */
function calculateMockExamFactor(mockExams: MockExamResult[]): { score: number; description: string } {
  if (mockExams.length === 0) {
    return {
      score: 50, // Neutral score when no data
      description: 'No mock exams completed. Take at least 2 full mock exams for accurate prediction.'
    };
  }
  
  // Weight recent exams more heavily
  const sortedExams = [...mockExams].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  let weightedScore = 0;
  let totalWeight = 0;
  
  sortedExams.forEach((exam, index) => {
    // Exponential decay: recent exams count more
    const weight = Math.pow(0.7, index);
    weightedScore += exam.overallScore * weight;
    totalWeight += weight;
  });
  
  const avgScore = weightedScore / totalWeight;
  
  // Calculate trend
  let trend = 'stable';
  if (sortedExams.length >= 2) {
    const recentAvg = sortedExams.slice(0, 2).reduce((sum, e) => sum + e.overallScore, 0) / 2;
    const olderAvg = sortedExams.slice(-2).reduce((sum, e) => sum + e.overallScore, 0) / 2;
    
    if (recentAvg - olderAvg > 5) trend = 'improving';
    else if (olderAvg - recentAvg > 5) trend = 'declining';
  }
  
  const description = `Average mock exam score: ${avgScore.toFixed(1)}% (${mockExams.length} exams, ${trend} trend)`;
  
  return { score: avgScore, description };
}

/**
 * Calculate volume factor
 */
function calculateVolumeFactor(totalQuestions: number): { score: number; impact: 'positive' | 'neutral' | 'negative'; description: string } {
  // Ideal is 1000+ questions before exam
  if (totalQuestions >= 1000) {
    return {
      score: 90,
      impact: 'positive',
      description: `Excellent practice volume: ${totalQuestions} questions completed`
    };
  } else if (totalQuestions >= 500) {
    return {
      score: 75,
      impact: 'neutral',
      description: `Good practice volume: ${totalQuestions} questions. Aim for 1000+ total.`
    };
  } else if (totalQuestions >= 250) {
    return {
      score: 60,
      impact: 'neutral',
      description: `Moderate practice: ${totalQuestions} questions. Need more practice.`
    };
  } else {
    return {
      score: 40,
      impact: 'negative',
      description: `Low practice volume: ${totalQuestions} questions. Significantly more practice needed.`
    };
  }
}

/**
 * Calculate consistency factor
 */
function calculateConsistencyFactor(
  domainPerformance: DomainPerformance[],
  mockExams: MockExamResult[]
): { score: number; impact: 'positive' | 'neutral' | 'negative'; description: string } {
  // Check for improving trends
  const improvingDomains = domainPerformance.filter(d => d.recentTrend === 'improving').length;
  const decliningDomains = domainPerformance.filter(d => d.recentTrend === 'declining').length;
  
  // Check mock exam progression
  let mockTrend = 'stable';
  if (mockExams.length >= 3) {
    const sorted = [...mockExams].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const firstHalf = sorted.slice(0, Math.floor(sorted.length / 2));
    const secondHalf = sorted.slice(Math.floor(sorted.length / 2));
    
    const firstAvg = firstHalf.reduce((sum, e) => sum + e.overallScore, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, e) => sum + e.overallScore, 0) / secondHalf.length;
    
    if (secondAvg - firstAvg > 5) mockTrend = 'improving';
    else if (firstAvg - secondAvg > 5) mockTrend = 'declining';
  }
  
  let score: number;
  let impact: 'positive' | 'neutral' | 'negative';
  let description: string;
  
  if (mockTrend === 'improving' && decliningDomains === 0) {
    score = 85;
    impact = 'positive';
    description = 'Strong upward trend in performance. Keep up the momentum!';
  } else if (mockTrend === 'declining' || decliningDomains >= 3) {
    score = 45;
    impact = 'negative';
    description = 'Performance declining in some areas. Review study approach.';
  } else {
    score = 65;
    impact = 'neutral';
    description = `Performance is stable. ${improvingDomains} domains improving.`;
  }
  
  return { score, impact, description };
}

/**
 * Calculate time management factor
 */
function calculateTimeFactor(
  domainPerformance: DomainPerformance[],
  mockExams: MockExamResult[]
): { score: number; impact: 'positive' | 'neutral' | 'negative'; description: string } {
  // Target: ~1 minute per question (64 seconds ideal for 170 in 3 hours)
  const targetSeconds = 64;
  
  // Average time across domains
  const avgTime = domainPerformance.length > 0
    ? domainPerformance.reduce((sum, d) => sum + d.avgTimePerQuestion, 0) / domainPerformance.length
    : 0;
  
  // Check if mock exams were completed on time
  const completedOnTime = mockExams.filter(e => e.completed && e.timeUsed <= 180).length;
  const completedMocks = mockExams.filter(e => e.completed).length;
  
  if (avgTime === 0 && mockExams.length === 0) {
    return {
      score: 50,
      impact: 'neutral',
      description: 'Not enough data to assess time management'
    };
  }
  
  if (avgTime <= targetSeconds && completedOnTime === completedMocks) {
    return {
      score: 90,
      impact: 'positive',
      description: `Excellent pacing: ${avgTime.toFixed(0)}s per question average`
    };
  } else if (avgTime <= 90) {
    return {
      score: 70,
      impact: 'neutral',
      description: `Acceptable pacing: ${avgTime.toFixed(0)}s per question. Target 64s.`
    };
  } else {
    return {
      score: 50,
      impact: 'negative',
      description: `Slow pacing: ${avgTime.toFixed(0)}s per question. Risk of not finishing.`
    };
  }
}

/**
 * Calculate confidence interval
 */
function calculateConfidenceInterval(
  predictedScore: number,
  mockExamCount: number,
  questionCount: number
): { low: number; high: number; confidence: number } {
  // Standard error decreases with more data
  const dataTerm = Math.min(1, (mockExamCount * 100 + questionCount) / 2000);
  const baseMargin = 15; // Wide margin with little data
  const margin = baseMargin * (1 - dataTerm * 0.6); // Shrinks to 6 with lots of data
  
  return {
    low: Math.max(0, Math.round((predictedScore - margin) * 10) / 10),
    high: Math.min(100, Math.round((predictedScore + margin) * 10) / 10),
    confidence: 90
  };
}

/**
 * Calculate probability of passing
 */
function calculatePassProbability(
  predictedScore: number,
  confidenceInterval: { low: number; high: number }
): number {
  // Use normal distribution approximation
  const margin = (confidenceInterval.high - confidenceInterval.low) / 2;
  const stdDev = margin / 1.645; // 90% confidence = 1.645 standard deviations
  
  // Z-score for passing threshold
  const zScore = (predictedScore - PASSING_SCORE) / stdDev;
  
  // Approximate CDF using logistic function
  const probability = 1 / (1 + Math.exp(-1.7 * zScore));
  
  return Math.min(0.99, Math.max(0.01, probability));
}

/**
 * Calculate domain-level predictions
 */
function calculateDomainPredictions(
  domainPerformance: DomainPerformance[]
): Record<string, { predictedScore: number; contribution: number; status: 'weak' | 'developing' | 'proficient' | 'strong' }> {
  const predictions: Record<string, { predictedScore: number; contribution: number; status: 'weak' | 'developing' | 'proficient' | 'strong' }> = {};
  
  for (const dp of domainPerformance) {
    const weight = CFP_DOMAIN_WEIGHTS[dp.domain] || 0.1;
    const predictedScore = dp.accuracy * 100;
    const contribution = predictedScore * weight;
    
    let status: 'weak' | 'developing' | 'proficient' | 'strong';
    if (predictedScore >= 80) status = 'strong';
    else if (predictedScore >= 70) status = 'proficient';
    else if (predictedScore >= 60) status = 'developing';
    else status = 'weak';
    
    predictions[dp.domain] = {
      predictedScore: Math.round(predictedScore * 10) / 10,
      contribution: Math.round(contribution * 100) / 100,
      status
    };
  }
  
  return predictions;
}

/**
 * Determine overall readiness level
 */
function determineReadinessLevel(
  passProbability: number,
  predictedScore: number
): 'not-ready' | 'needs-work' | 'getting-close' | 'ready' | 'well-prepared' {
  if (passProbability >= 0.85 && predictedScore >= 78) return 'well-prepared';
  if (passProbability >= 0.70 && predictedScore >= 72) return 'ready';
  if (passProbability >= 0.50 && predictedScore >= 65) return 'getting-close';
  if (passProbability >= 0.30 || predictedScore >= 55) return 'needs-work';
  return 'not-ready';
}

/**
 * Generate personalized recommendations
 */
function generateRecommendations(
  domainPerformance: DomainPerformance[],
  mockExams: MockExamResult[],
  predictedScore: number,
  passProbability: number
): string[] {
  const recommendations: string[] = [];
  
  // Find weak domains
  const weakDomains = domainPerformance
    .filter(d => d.accuracy < 0.65)
    .sort((a, b) => (CFP_DOMAIN_WEIGHTS[b.domain] || 0) - (CFP_DOMAIN_WEIGHTS[a.domain] || 0));
  
  if (weakDomains.length > 0) {
    const topWeak = weakDomains[0];
    const domainNames: Record<string, string> = {
      RET: 'Retirement Planning',
      GEN: 'General Principles',
      PRO: 'Professional Conduct',
      TAX: 'Tax Planning',
      EST: 'Estate Planning',
      RISK: 'Risk Management',
      INV: 'Investment Planning'
    };
    recommendations.push(
      `Focus on ${domainNames[topWeak.domain]} (${(topWeak.accuracy * 100).toFixed(0)}% accuracy). This domain is ${(CFP_DOMAIN_WEIGHTS[topWeak.domain] * 100).toFixed(0)}% of the exam.`
    );
  }
  
  // Mock exam recommendations
  if (mockExams.length < 2) {
    recommendations.push(
      'Complete at least 2 full mock exams to improve prediction accuracy.'
    );
  }
  
  // Volume recommendations
  const totalQuestions = domainPerformance.reduce((sum, d) => sum + d.questionsAttempted, 0);
  if (totalQuestions < 500) {
    recommendations.push(
      `Increase practice volume. Aim for 1000+ questions total (currently ${totalQuestions}).`
    );
  }
  
  // Time management
  const slowDomains = domainPerformance.filter(d => d.avgTimePerQuestion > 90);
  if (slowDomains.length > 0) {
    recommendations.push(
      'Work on time management. Practice answering questions within 60-90 seconds.'
    );
  }
  
  // Score-based recommendations
  if (passProbability < 0.50) {
    recommendations.push(
      'Consider delaying your exam date to allow more preparation time.'
    );
  } else if (passProbability >= 0.70 && predictedScore >= 72) {
    recommendations.push(
      'You\'re on track! Focus on maintaining consistency and reviewing weak areas.'
    );
  }
  
  // Trend recommendations
  const decliningDomains = domainPerformance.filter(d => d.recentTrend === 'declining');
  if (decliningDomains.length >= 2) {
    recommendations.push(
      'Performance declining in some areas. Take a short break, then return with fresh focus.'
    );
  }
  
  return recommendations.slice(0, 5); // Max 5 recommendations
}

/**
 * Estimate additional study days needed
 */
function estimateDaysNeeded(
  predictedScore: number,
  passProbability: number,
  _examDate?: Date
): number {
  // Base estimate on gap to passing
  const gap = Math.max(0, PASSING_SCORE + 5 - predictedScore);
  
  // Assume 2-3 points improvement per week of focused study
  const weeksNeeded = gap / 2.5;
  const daysNeeded = Math.ceil(weeksNeeded * 7);
  
  // If already likely to pass, minimal additional time
  if (passProbability >= 0.80) return Math.min(daysNeeded, 7);
  if (passProbability >= 0.70) return Math.min(daysNeeded, 14);
  
  return Math.min(daysNeeded, 60); // Cap at 60 days
}

/**
 * Generate a simple score prediction without full analysis
 */
export function quickPrediction(recentAccuracy: number, mockExamAvg: number | null): {
  predictedScore: number;
  passProbability: number;
  readiness: string;
} {
  let predictedScore: number;
  
  if (mockExamAvg !== null) {
    // Weight mock exam more heavily (60/40)
    predictedScore = (mockExamAvg * 0.6) + (recentAccuracy * 100 * 0.4);
  } else {
    predictedScore = recentAccuracy * 100;
  }
  
  // Regression to mean
  predictedScore = (predictedScore * 0.85) + (65 * 0.15);
  
  // Simple pass probability
  const passProbability = Math.min(0.99, Math.max(0.01, 
    0.5 + ((predictedScore - PASSING_SCORE) * 0.04)
  ));
  
  let readiness: string;
  if (passProbability >= 0.80) readiness = 'Ready';
  else if (passProbability >= 0.60) readiness = 'Almost ready';
  else if (passProbability >= 0.40) readiness = 'Need more practice';
  else readiness = 'Not ready - more study needed';
  
  return {
    predictedScore: Math.round(predictedScore * 10) / 10,
    passProbability: Math.round(passProbability * 100) / 100,
    readiness
  };
}

/**
 * Compare multiple prediction snapshots over time
 */
export function trackPredictionProgress(
  predictions: { date: Date; prediction: ScorePrediction }[]
): {
  trend: 'improving' | 'stable' | 'declining';
  rateOfChange: number;
  daysUntilReady: number | null;
} {
  if (predictions.length < 2) {
    return { trend: 'stable', rateOfChange: 0, daysUntilReady: null };
  }
  
  // Sort by date
  const sorted = [...predictions].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  // Calculate linear regression
  const n = sorted.length;
  let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
  
  sorted.forEach((p, i) => {
    sumX += i;
    sumY += p.prediction.predictedScore;
    sumXY += i * p.prediction.predictedScore;
    sumXX += i * i;
  });
  
  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  
  // Determine trend
  let trend: 'improving' | 'stable' | 'declining';
  if (slope > 0.5) trend = 'improving';
  else if (slope < -0.5) trend = 'declining';
  else trend = 'stable';
  
  // Estimate days until ready
  const latestScore = sorted[sorted.length - 1].prediction.predictedScore;
  const targetScore = PASSING_SCORE + 5;
  
  let daysUntilReady: number | null = null;
  if (slope > 0 && latestScore < targetScore) {
    const daysPerUnit = 7 / slope; // Assume weekly predictions
    daysUntilReady = Math.ceil((targetScore - latestScore) * daysPerUnit);
  }
  
  return {
    trend,
    rateOfChange: Math.round(slope * 100) / 100, // Points per prediction
    daysUntilReady
  };
}

export default {
  CFP_DOMAIN_WEIGHTS,
  PASSING_SCORE,
  predictExamScore,
  quickPrediction,
  trackPredictionProgress
};

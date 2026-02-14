/**
 * CISA Score Predictor Service
 * 
 * Predicts exam performance based on:
 * - Practice question accuracy by domain
 * - Time management patterns
 * - Difficulty progression
 * - Mock exam results
 * - Learning velocity
 */

import { CISASectionId, CISA_SECTION_CONFIG } from '../courses/cisa/config';
import { getPerformanceSummary } from './cisaAdaptiveEngine';
import { loadPreviousResults, getDomainAnalytics } from './cisaExamSimulator';

// CISA passing score on 200-800 scale
const PASSING_SCORE = 450;
const MAX_SCORE = 800;
const MIN_SCORE = 200;

// Domain weights from ISACA
const DOMAIN_WEIGHTS: Record<CISASectionId, number> = {
  CISA1: 21,
  CISA2: 16,
  CISA3: 18,
  CISA4: 20,
  CISA5: 25,
};

export interface PredictionInput {
  domainAccuracy: Record<CISASectionId, number>;
  totalQuestionsAnswered: number;
  averageTimePerQuestion: number; // seconds
  recentTrend: 'improving' | 'stable' | 'declining';
  mockExamScores: number[];
  daysUntilExam?: number;
  studyHoursPerWeek?: number;
}

export interface ScorePrediction {
  predictedScore: number; // 200-800 scale
  confidenceInterval: { low: number; high: number };
  passProbability: number; // 0-100%
  readinessLevel: 'not-ready' | 'at-risk' | 'borderline' | 'likely' | 'confident';
  domainPredictions: Record<CISASectionId, {
    predictedScore: number;
    contribution: number; // Weighted contribution
    status: 'weak' | 'developing' | 'proficient' | 'strong';
  }>;
  recommendations: string[];
  estimatedStudyHoursNeeded: number;
}

export interface TrendAnalysis {
  overallTrend: 'improving' | 'stable' | 'declining';
  weeklyGrowthRate: number; // percentage points per week
  projectedScoreInWeeks: (weeks: number) => number;
  domainTrends: Record<CISASectionId, {
    trend: 'improving' | 'stable' | 'declining';
    weeklyChange: number;
  }>;
}

/**
 * Calculate weighted score from domain accuracies
 */
function calculateWeightedScore(domainAccuracy: Record<CISASectionId, number>): number {
  let weightedSum = 0;
  let totalWeight = 0;
  
  Object.entries(DOMAIN_WEIGHTS).forEach(([domain, weight]) => {
    const accuracy = domainAccuracy[domain as CISASectionId] || 0;
    weightedSum += accuracy * weight;
    totalWeight += weight;
  });
  
  return totalWeight > 0 ? weightedSum / totalWeight : 0;
}

/**
 * Convert raw percentage to ISACA scaled score
 */
function rawToScaledScore(rawPercentage: number): number {
  // Non-linear scaling - ISACA doesn't publish their exact formula
  // This approximation is based on candidate reports
  const passingRaw = 0.65;
  
  if (rawPercentage <= passingRaw) {
    // Below passing: 200-450
    return Math.round(MIN_SCORE + (rawPercentage / passingRaw) * (PASSING_SCORE - MIN_SCORE));
  } else {
    // Above passing: 450-800
    return Math.round(PASSING_SCORE + ((rawPercentage - passingRaw) / (1 - passingRaw)) * (MAX_SCORE - PASSING_SCORE));
  }
}

/**
 * Calculate confidence interval based on sample size and variance
 */
function calculateConfidenceInterval(
  predictedScore: number, 
  sampleSize: number,
  variance: number
): { low: number; high: number } {
  // More questions = narrower confidence interval
  const basePrecision = Math.min(sampleSize / 500, 1);
  const varianceAdjustment = Math.max(0.5, 1 - variance / 20);
  
  // Margin shrinks as you have more data
  const margin = Math.round(50 * (1 - basePrecision * 0.7) * varianceAdjustment);
  
  return {
    low: Math.max(MIN_SCORE, predictedScore - margin),
    high: Math.min(MAX_SCORE, predictedScore + margin),
  };
}

/**
 * Determine readiness level
 */
function getReadinessLevel(
  passProbability: number, 
  totalQuestions: number
): ScorePrediction['readinessLevel'] {
  // Need minimum questions for reliable prediction
  if (totalQuestions < 100) return 'not-ready';
  
  if (passProbability >= 85) return 'confident';
  if (passProbability >= 70) return 'likely';
  if (passProbability >= 50) return 'borderline';
  if (passProbability >= 30) return 'at-risk';
  return 'not-ready';
}

/**
 * Get domain status
 */
function getDomainStatus(accuracy: number): 'weak' | 'developing' | 'proficient' | 'strong' {
  if (accuracy >= 80) return 'strong';
  if (accuracy >= 70) return 'proficient';
  if (accuracy >= 55) return 'developing';
  return 'weak';
}

/**
 * Generate recommendations based on prediction
 */
function generateRecommendations(
  domainPredictions: ScorePrediction['domainPredictions'],
  passProbability: number,
  input: PredictionInput
): string[] {
  const recommendations: string[] = [];
  
  // Identify weak domains
  const weakDomains = Object.entries(domainPredictions)
    .filter(([, pred]) => pred.status === 'weak')
    .map(([domain]) => domain as CISASectionId);
  
  // High-impact weak domains (high weight + low score)
  const highImpactWeak = weakDomains
    .sort((a, b) => DOMAIN_WEIGHTS[b] - DOMAIN_WEIGHTS[a])
    .slice(0, 2);
  
  if (highImpactWeak.length > 0) {
    const domainNames = highImpactWeak.map(d => CISA_SECTION_CONFIG[d].shortTitle).join(' and ');
    recommendations.push(`Focus on ${domainNames} - these high-weight domains need improvement.`);
  }
  
  // Domain 4 & 5 warning (52% of exam)
  const domain4Score = domainPredictions.CISA4.predictedScore;
  const domain5Score = domainPredictions.CISA5.predictedScore;
  if (domain4Score < 65 || domain5Score < 65) {
    recommendations.push('Prioritize Domains 4 & 5 (Operations and InfoSec) - they account for 52% of your exam score.');
  }
  
  // Time management
  if (input.averageTimePerQuestion > 100) {
    recommendations.push('Practice faster question response - aim for under 90 seconds per question.');
  }
  
  // Mock exams
  if (input.mockExamScores.length < 2) {
    recommendations.push('Take at least 2 full-length mock exams to build stamina and identify weak areas.');
  }
  
  // Question volume
  if (input.totalQuestionsAnswered < 500) {
    recommendations.push(`Answer ${500 - input.totalQuestionsAnswered} more questions to improve prediction accuracy.`);
  }
  
  // Pass probability specific advice
  if (passProbability < 50) {
    recommendations.push('Consider postponing your exam date until you reach 70%+ accuracy consistently.');
  } else if (passProbability < 70) {
    recommendations.push('You\'re close! Focus intensively on weak domains for the next 2 weeks.');
  }
  
  // Framework knowledge
  if (domain4Score < 70 || domain5Score < 70) {
    recommendations.push('Review COBIT, ITIL, and ISO 27001 frameworks - heavily tested on the exam.');
  }
  
  return recommendations.slice(0, 5); // Max 5 recommendations
}

/**
 * Estimate study hours needed to reach passing
 */
function estimateStudyHoursNeeded(
  currentScore: number,
  passProbability: number,
  weeklyHours: number = 15
): number {
  if (passProbability >= 85) return 0;
  
  const gapToPass = Math.max(0, PASSING_SCORE - currentScore);
  
  // Estimate: ~10 study hours per 10-point improvement
  const baseHours = gapToPass * 1;
  
  // Adjust for current study pace
  const paceMultiplier = weeklyHours >= 20 ? 0.8 : weeklyHours >= 10 ? 1 : 1.2;
  
  return Math.round(baseHours * paceMultiplier);
}

/**
 * Main prediction function
 */
export function predictScore(input: PredictionInput): ScorePrediction {
  // Calculate base score from domain accuracies
  const baseAccuracy = calculateWeightedScore(input.domainAccuracy);
  
  // Adjust based on mock exam performance (more reliable)
  let adjustedAccuracy = baseAccuracy;
  if (input.mockExamScores.length > 0) {
    const mockAvg = input.mockExamScores.reduce((a, b) => a + b, 0) / input.mockExamScores.length;
    // Weight mock exams more heavily as they're more realistic
    adjustedAccuracy = baseAccuracy * 0.4 + mockAvg * 0.6;
  }
  
  // Trend adjustment
  const trendAdjustment = 
    input.recentTrend === 'improving' ? 3 :
    input.recentTrend === 'declining' ? -3 : 0;
  
  // Final adjusted accuracy
  const finalAccuracy = Math.min(100, Math.max(0, adjustedAccuracy + trendAdjustment));
  const predictedScore = rawToScaledScore(finalAccuracy / 100);
  
  // Calculate score variance from domain spread
  const domainScores = Object.values(input.domainAccuracy);
  const avgDomain = domainScores.reduce((a, b) => a + b, 0) / domainScores.length;
  const variance = Math.sqrt(
    domainScores.reduce((sum, s) => sum + Math.pow(s - avgDomain, 2), 0) / domainScores.length
  );
  
  // Confidence interval
  const confidenceInterval = calculateConfidenceInterval(
    predictedScore,
    input.totalQuestionsAnswered,
    variance
  );
  
  // Pass probability calculation
  // Uses normal distribution assumption around predicted score
  const standardError = (confidenceInterval.high - confidenceInterval.low) / 4;
  const zScore = (predictedScore - PASSING_SCORE) / standardError;
  let passProbability = Math.round(
    50 * (1 + Math.tanh(zScore * 0.5)) // Smoother than CDF
  );
  
  // Adjust for question volume (penalize low sample size)
  if (input.totalQuestionsAnswered < 200) {
    passProbability = Math.round(passProbability * 0.8);
  }
  
  passProbability = Math.min(99, Math.max(1, passProbability));
  
  // Domain predictions
  const domainPredictions: ScorePrediction['domainPredictions'] = {} as ScorePrediction['domainPredictions'];
  
  Object.entries(input.domainAccuracy).forEach(([domain, accuracy]) => {
    const domainId = domain as CISASectionId;
    const weight = DOMAIN_WEIGHTS[domainId];
    const contribution = (accuracy * weight) / 100;
    
    domainPredictions[domainId] = {
      predictedScore: Math.round(accuracy),
      contribution: Math.round(contribution),
      status: getDomainStatus(accuracy),
    };
  });
  
  // Readiness level
  const readinessLevel = getReadinessLevel(passProbability, input.totalQuestionsAnswered);
  
  // Recommendations
  const recommendations = generateRecommendations(domainPredictions, passProbability, input);
  
  // Estimated study hours
  const estimatedStudyHoursNeeded = estimateStudyHoursNeeded(
    predictedScore,
    passProbability,
    input.studyHoursPerWeek
  );
  
  return {
    predictedScore,
    confidenceInterval,
    passProbability,
    readinessLevel,
    domainPredictions,
    recommendations,
    estimatedStudyHoursNeeded,
  };
}

/**
 * Analyze performance trends
 */
export function analyzeTrends(): TrendAnalysis {
  const results = loadPreviousResults();
  const domainAnalytics = getDomainAnalytics();
  
  // Calculate overall trend
  let overallTrend: 'improving' | 'stable' | 'declining' = 'stable';
  let weeklyGrowthRate = 0;
  
  if (results.length >= 3) {
    const scores = results.map(r => r.scaledScore);
    const firstHalf = scores.slice(0, Math.ceil(scores.length / 2));
    const secondHalf = scores.slice(Math.ceil(scores.length / 2));
    
    const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
    
    if (secondAvg > firstAvg + 15) overallTrend = 'improving';
    else if (secondAvg < firstAvg - 15) overallTrend = 'declining';
    
    // Estimate weekly growth (assuming ~1 exam per week)
    weeklyGrowthRate = (secondAvg - firstAvg) / Math.max(1, scores.length / 2);
  }
  
  // Domain trends from analytics
  const domainTrends: TrendAnalysis['domainTrends'] = {} as TrendAnalysis['domainTrends'];
  
  Object.entries(domainAnalytics).forEach(([domain, analytics]) => {
    const domainId = domain as CISASectionId;
    domainTrends[domainId] = {
      trend: analytics.trend,
      weeklyChange: analytics.trend === 'improving' ? 2 : analytics.trend === 'declining' ? -2 : 0,
    };
  });
  
  // Projection function
  const projectedScoreInWeeks = (weeks: number): number => {
    const performanceSummary = getPerformanceSummary();
    const currentScore = rawToScaledScore(performanceSummary.overallAccuracy / 100);
    const projected = currentScore + weeklyGrowthRate * weeks;
    return Math.min(MAX_SCORE, Math.max(MIN_SCORE, Math.round(projected)));
  };
  
  return {
    overallTrend,
    weeklyGrowthRate: Math.round(weeklyGrowthRate * 10) / 10,
    projectedScoreInWeeks,
    domainTrends,
  };
}

/**
 * Get quick prediction from current state
 */
export function getQuickPrediction(): ScorePrediction {
  const summary = getPerformanceSummary();
  const mockResults = loadPreviousResults();
  const trends = analyzeTrends();
  
  // Build domain accuracy from current state
  const domainAccuracy: Record<CISASectionId, number> = {
    CISA1: 50,
    CISA2: 50,
    CISA3: 50,
    CISA4: 50,
    CISA5: 50,
  };
  
  // Use overall accuracy as baseline if no domain-specific data
  Object.keys(domainAccuracy).forEach(domain => {
    domainAccuracy[domain as CISASectionId] = summary.overallAccuracy || 50;
  });
  
  return predictScore({
    domainAccuracy,
    totalQuestionsAnswered: summary.totalQuestions,
    averageTimePerQuestion: 75, // Default assumption
    recentTrend: trends.overallTrend,
    mockExamScores: mockResults.map(r => r.rawScore),
    studyHoursPerWeek: 15, // Default assumption
  });
}

/**
 * Calculate days until ready
 */
export function estimateDaysUntilReady(targetProbability: number = 75): number {
  const prediction = getQuickPrediction();
  
  if (prediction.passProbability >= targetProbability) {
    return 0; // Already ready
  }
  
  const trends = analyzeTrends();
  const weeklyGrowth = Math.max(1, trends.weeklyGrowthRate);
  
  // Estimate weeks needed
  const probabilityGap = targetProbability - prediction.passProbability;
  // Rough estimate: 1 point growth = ~1.5% probability increase
  const weeksNeeded = Math.ceil(probabilityGap / (weeklyGrowth * 1.5));
  
  return weeksNeeded * 7;
}

/**
 * Get study plan recommendation based on days until exam
 */
export function getStudyPlan(daysUntilExam: number): {
  phase: 'learning' | 'practice' | 'review' | 'cram';
  hoursPerDay: number;
  focusAreas: CISASectionId[];
  activities: string[];
} {
  const prediction = getQuickPrediction();
  const weakDomains = Object.entries(prediction.domainPredictions)
    .filter(([, p]) => p.status === 'weak' || p.status === 'developing')
    .sort((a, b) => DOMAIN_WEIGHTS[b[0] as CISASectionId] - DOMAIN_WEIGHTS[a[0] as CISASectionId])
    .map(([d]) => d as CISASectionId);
  
  if (daysUntilExam <= 3) {
    return {
      phase: 'cram',
      hoursPerDay: 6,
      focusAreas: weakDomains.slice(0, 2),
      activities: [
        'Review flashcards for high-yield topics',
        'Focus on Domain 4 & 5 (52% of exam)',
        'Light practice - don\'t burn out',
        'Review ISACA terminology and frameworks',
      ],
    };
  } else if (daysUntilExam <= 14) {
    return {
      phase: 'review',
      hoursPerDay: 4,
      focusAreas: weakDomains.slice(0, 3),
      activities: [
        'Take 1-2 mock exams',
        'Review missed questions in detail',
        'Drill weak domain topics',
        'Practice time management',
      ],
    };
  } else if (daysUntilExam <= 45) {
    return {
      phase: 'practice',
      hoursPerDay: 3,
      focusAreas: weakDomains,
      activities: [
        'Complete 50+ questions daily',
        'Focus on weak domains',
        'Take weekly mock exams',
        'Review study guides for struggling concepts',
      ],
    };
  } else {
    return {
      phase: 'learning',
      hoursPerDay: 2,
      focusAreas: ['CISA4', 'CISA5', 'CISA1'], // High-weight domains first
      activities: [
        'Complete study materials for each domain',
        'Build strong foundation before drilling',
        'Take notes on key frameworks',
        'Practice questions after each topic',
      ],
    };
  }
}

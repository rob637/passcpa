/**
 * CIA Score Predictor
 * 
 * Predicts CIA exam scores based on practice performance.
 * Uses IIA's 250-750 scaled scoring system (600 = passing).
 * 
 * Each CIA part is scored independently:
 * - Part 1: 125 questions, 2.5 hours
 * - Part 2: 100 questions, 2 hours
 * - Part 3: 100 questions, 2 hours
 */

import { CIAPart, CIA_PART_CONFIG } from './ciaAnalytics';

// ============================================================================
// Types
// ============================================================================

export interface PerformanceData {
  part: CIAPart;
  questionsAttempted: number;
  questionsCorrect: number;
  accuracy: number;
  averageTimePerQuestion: number;
  mockExamScores: number[]; // Raw percentages
  recentTrend: 'improving' | 'stable' | 'declining';
  topicMastery: Record<string, number>; // topic -> accuracy
}

export interface ScorePrediction {
  part: CIAPart;
  predictedRawScore: number; // Percentage
  predictedScaledScore: number; // IIA 250-750 scale
  confidenceInterval: {
    low: number;
    high: number;
  };
  passProbability: number;
  strengthAreas: string[];
  weaknessAreas: string[];
  recommendations: string[];
}

export interface OverallPrediction {
  partPredictions: Record<CIAPart, ScorePrediction>;
  overallPassProbability: number;
  readinessLevel: 'not-ready' | 'getting-close' | 'ready' | 'well-prepared';
  estimatedStudyHoursNeeded: number;
  targetExamDate: Date | null;
}

// ============================================================================
// Constants
// ============================================================================

const PASSING_SCALED_SCORE = 600;
const MIN_SCALED_SCORE = 250;
const MAX_SCALED_SCORE = 750;
const PASSING_RAW_PERCENT = 75; // Approximate raw passing %

// ============================================================================
// Score Conversion
// ============================================================================

/**
 * Convert raw percentage to IIA scaled score
 */
export function rawToScaled(rawPercent: number): number {
  if (rawPercent <= 0) return MIN_SCALED_SCORE;
  if (rawPercent >= 100) return MAX_SCALED_SCORE;
  
  // Linear interpolation with passing at 75%
  if (rawPercent <= PASSING_RAW_PERCENT) {
    return Math.round(MIN_SCALED_SCORE + (rawPercent / PASSING_RAW_PERCENT) * (PASSING_SCALED_SCORE - MIN_SCALED_SCORE));
  } else {
    return Math.round(PASSING_SCALED_SCORE + ((rawPercent - PASSING_RAW_PERCENT) / (100 - PASSING_RAW_PERCENT)) * (MAX_SCALED_SCORE - PASSING_SCALED_SCORE));
  }
}

/**
 * Convert scaled score to raw percentage
 */
export function scaledToRaw(scaledScore: number): number {
  if (scaledScore <= MIN_SCALED_SCORE) return 0;
  if (scaledScore >= MAX_SCALED_SCORE) return 100;
  
  if (scaledScore <= PASSING_SCALED_SCORE) {
    return ((scaledScore - MIN_SCALED_SCORE) / (PASSING_SCALED_SCORE - MIN_SCALED_SCORE)) * PASSING_RAW_PERCENT;
  } else {
    return PASSING_RAW_PERCENT + ((scaledScore - PASSING_SCALED_SCORE) / (MAX_SCALED_SCORE - PASSING_SCALED_SCORE)) * (100 - PASSING_RAW_PERCENT);
  }
}

// ============================================================================
// Prediction Engine
// ============================================================================

/**
 * Predict score for a single part
 */
export function predictPartScore(data: PerformanceData): ScorePrediction {
  const part = data.part;
  const config = CIA_PART_CONFIG[part];
  
  // Base prediction from practice accuracy
  let basePrediction = data.accuracy;
  
  // Adjust for sample size (more questions = higher confidence)
  const sampleSizeMultiplier = Math.min(1, data.questionsAttempted / 100);
  
  // Adjust for trend
  let trendAdjustment = 0;
  if (data.recentTrend === 'improving') {
    trendAdjustment = 3;
  } else if (data.recentTrend === 'declining') {
    trendAdjustment = -5;
  }
  
  // Factor in mock exam performance if available
  let mockExamFactor = 0;
  if (data.mockExamScores.length > 0) {
    const avgMock = data.mockExamScores.reduce((a, b) => a + b, 0) / data.mockExamScores.length;
    const bestMock = Math.max(...data.mockExamScores);
    
    // Weight recent/best mock scores more heavily
    mockExamFactor = (avgMock * 0.4 + bestMock * 0.6) - basePrediction;
    mockExamFactor *= 0.3; // Apply 30% of the difference
  }
  
  // Time pressure adjustment
  const targetTime = config.timeMinutes * 60 / config.questions;
  const timePressureAdjustment = data.averageTimePerQuestion > targetTime * 1.2 ? -3 : 0;
  
  // Calculate predicted raw score
  let predictedRaw = basePrediction + trendAdjustment + mockExamFactor + timePressureAdjustment;
  
  // Apply sample size confidence
  if (sampleSizeMultiplier < 1) {
    // Regress toward mean (60%) with low sample size
    predictedRaw = predictedRaw * sampleSizeMultiplier + 60 * (1 - sampleSizeMultiplier);
  }
  
  predictedRaw = Math.max(0, Math.min(100, predictedRaw));
  
  // Calculate confidence interval
  let confidenceRange = 15; // Base range
  if (data.questionsAttempted < 50) {
    confidenceRange = 25;
  } else if (data.questionsAttempted < 100) {
    confidenceRange = 18;
  } else if (data.questionsAttempted > 200) {
    confidenceRange = 10;
  }
  
  // Mock exams reduce uncertainty
  if (data.mockExamScores.length >= 2) {
    confidenceRange *= 0.8;
  }
  
  const confidenceInterval = {
    low: Math.max(0, predictedRaw - confidenceRange),
    high: Math.min(100, predictedRaw + confidenceRange),
  };
  
  // Convert to scaled score
  const predictedScaledScore = rawToScaled(predictedRaw);
  
  // Calculate pass probability
  const passProbability = calculatePassProbability(
    predictedRaw, 
    confidenceInterval.low, 
    confidenceInterval.high
  );
  
  // Identify strengths and weaknesses from topics
  const strengthAreas: string[] = [];
  const weaknessAreas: string[] = [];
  
  Object.entries(data.topicMastery).forEach(([topic, accuracy]) => {
    if (accuracy >= 80) {
      strengthAreas.push(topic);
    } else if (accuracy < 65) {
      weaknessAreas.push(topic);
    }
  });
  
  // Generate recommendations
  const recommendations = generateRecommendations(data, predictedRaw, weaknessAreas);
  
  return {
    part,
    predictedRawScore: Math.round(predictedRaw),
    predictedScaledScore,
    confidenceInterval: {
      low: rawToScaled(confidenceInterval.low),
      high: rawToScaled(confidenceInterval.high),
    },
    passProbability,
    strengthAreas,
    weaknessAreas,
    recommendations,
  };
}

/**
 * Calculate pass probability using normal distribution approximation
 */
function calculatePassProbability(
  predicted: number,
  lowBound: number,
  highBound: number
): number {
  const stdDev = (highBound - lowBound) / 4; // Approximate std dev
  const zScore = (predicted - PASSING_RAW_PERCENT) / stdDev;
  
  // Simple approximation of cumulative normal distribution
  // Using error function approximation
  const t = 1 / (1 + 0.2316419 * Math.abs(zScore));
  const d = 0.3989423 * Math.exp(-zScore * zScore / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  
  let probability = zScore > 0 ? 1 - p : p;
  
  // Convert to percentage and bound
  return Math.round(Math.max(1, Math.min(99, probability * 100)));
}

/**
 * Generate recommendations based on performance
 */
function generateRecommendations(
  data: PerformanceData,
  predictedRaw: number,
  weaknesses: string[]
): string[] {
  const recommendations: string[] = [];
  const config = CIA_PART_CONFIG[data.part];
  
  // Sample size recommendations
  if (data.questionsAttempted < 50) {
    recommendations.push(`Complete at least ${50 - data.questionsAttempted} more practice questions for ${config.name}.`);
  }
  
  // Mock exam recommendations
  if (data.mockExamScores.length === 0) {
    recommendations.push(`Take a full mock exam for ${data.part} to calibrate your readiness.`);
  } else if (data.mockExamScores.length === 1) {
    recommendations.push(`Take at least one more mock exam before the real test.`);
  }
  
  // Score-based recommendations
  if (predictedRaw < 65) {
    recommendations.push('Focus on building foundational knowledge before timed practice.');
  } else if (predictedRaw < 75) {
    recommendations.push('You\'re close - focus on weak topics to push above the passing threshold.');
  }
  
  // Time management
  const targetTime = config.timeMinutes * 60 / config.questions;
  if (data.averageTimePerQuestion > targetTime * 1.3) {
    recommendations.push(`Improve time management - aim for ${Math.round(targetTime)} seconds per question.`);
  }
  
  // Weakness targeting
  if (weaknesses.length > 0) {
    const topWeakness = weaknesses[0];
    recommendations.push(`Prioritize studying "${topWeakness}" - it's dragging down your score.`);
  }
  
  // Trend-based
  if (data.recentTrend === 'declining') {
    recommendations.push('Your recent scores are declining - consider reviewing fundamentals.');
  }
  
  return recommendations.slice(0, 4);
}

// ============================================================================
// Overall Prediction
// ============================================================================

/**
 * Generate overall prediction across all parts
 */
export function predictOverall(
  partData: Record<CIAPart, PerformanceData>
): OverallPrediction {
  const parts: CIAPart[] = ['CIA1', 'CIA2', 'CIA3'];
  const partPredictions: Record<CIAPart, ScorePrediction> = {} as Record<CIAPart, ScorePrediction>;
  
  // Generate predictions for each part
  for (const part of parts) {
    partPredictions[part] = predictPartScore(partData[part]);
  }
  
  // Calculate overall pass probability (must pass all 3)
  // Probability = P1 * P2 * P3
  const overallPassProbability = Math.round(
    parts.reduce((acc, part) => {
      return acc * (partPredictions[part].passProbability / 100);
    }, 1) * 100
  );
  
  // Determine readiness level
  const avgPassProb = parts.reduce((sum, part) => sum + partPredictions[part].passProbability, 0) / 3;
  let readinessLevel: 'not-ready' | 'getting-close' | 'ready' | 'well-prepared';
  
  if (avgPassProb >= 85) {
    readinessLevel = 'well-prepared';
  } else if (avgPassProb >= 70) {
    readinessLevel = 'ready';
  } else if (avgPassProb >= 50) {
    readinessLevel = 'getting-close';
  } else {
    readinessLevel = 'not-ready';
  }
  
  // Estimate study hours needed
  const estimatedStudyHoursNeeded = estimateStudyHoursNeeded(partPredictions);
  
  return {
    partPredictions,
    overallPassProbability,
    readinessLevel,
    estimatedStudyHoursNeeded,
    targetExamDate: null, // Can be set by caller
  };
}

/**
 * Estimate study hours needed to reach passing
 */
function estimateStudyHoursNeeded(
  predictions: Record<CIAPart, ScorePrediction>
): number {
  let totalHours = 0;
  
  (Object.entries(predictions) as [CIAPart, ScorePrediction][]).forEach(([part, pred]) => {
    const gap = PASSING_RAW_PERCENT - pred.predictedRawScore;
    
    if (gap > 0) {
      // Rough estimate: 2 hours per percentage point needed
      // Adjusted by part weight
      const weight = CIA_PART_CONFIG[part].weight / 100;
      totalHours += gap * 2 * (1 + weight); // Weight parts proportionally
    }
  });
  
  return Math.round(totalHours);
}

// ============================================================================
// Progress Tracking
// ============================================================================

/**
 * Calculate improvement rate from historical scores
 */
export function calculateImprovementRate(
  historicalScores: { date: Date; score: number }[]
): number {
  if (historicalScores.length < 2) return 0;
  
  // Sort by date
  const sorted = [...historicalScores].sort((a, b) => a.date.getTime() - b.date.getTime());
  
  // Calculate trend using linear regression
  const n = sorted.length;
  let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
  
  sorted.forEach((point, i) => {
    sumX += i;
    sumY += point.score;
    sumXY += i * point.score;
    sumXX += i * i;
  });
  
  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  
  // Return improvement per study session
  return Math.round(slope * 100) / 100;
}

/**
 * Project score at future date given current improvement rate
 */
export function projectFutureScore(
  currentScore: number,
  improvementRatePerSession: number,
  sessionsRemaining: number
): number {
  // Apply diminishing returns - harder to improve as you get higher
  let score = currentScore;
  
  for (let i = 0; i < sessionsRemaining; i++) {
    // Reduce improvement rate as score increases (ceiling effect)
    const ceilingFactor = Math.max(0.2, 1 - (score - 60) / 80);
    score += improvementRatePerSession * ceilingFactor;
  }
  
  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Estimate sessions needed to reach target score
 */
export function estimateSessionsToTarget(
  currentScore: number,
  targetScore: number,
  improvementRatePerSession: number
): number {
  if (improvementRatePerSession <= 0) return Infinity;
  if (currentScore >= targetScore) return 0;
  
  let sessions = 0;
  let score = currentScore;
  
  while (score < targetScore && sessions < 500) {
    const ceilingFactor = Math.max(0.2, 1 - (score - 60) / 80);
    score += improvementRatePerSession * ceilingFactor;
    sessions++;
  }
  
  return sessions;
}

// ============================================================================
// Report Generation
// ============================================================================

/**
 * Generate a detailed score report
 */
export function generateScoreReport(
  overallPrediction: OverallPrediction
): {
  summary: string;
  partDetails: Array<{
    part: CIAPart;
    name: string;
    status: 'passing' | 'borderline' | 'failing';
    score: number;
    passProbability: number;
    keyActions: string[];
  }>;
  overallStatus: string;
  priorityOrder: CIAPart[];
} {
  const parts: CIAPart[] = ['CIA1', 'CIA2', 'CIA3'];
  
  // Determine status and priority for each part
  const partDetails = parts.map(part => {
    const pred = overallPrediction.partPredictions[part];
    const config = CIA_PART_CONFIG[part];
    
    let status: 'passing' | 'borderline' | 'failing';
    if (pred.passProbability >= 70) {
      status = 'passing';
    } else if (pred.passProbability >= 40) {
      status = 'borderline';
    } else {
      status = 'failing';
    }
    
    return {
      part,
      name: config.name,
      status,
      score: pred.predictedScaledScore,
      passProbability: pred.passProbability,
      keyActions: pred.recommendations.slice(0, 2),
    };
  });
  
  // Sort by priority (lowest pass probability first)
  const priorityOrder = [...parts].sort((a, b) => {
    const probA = overallPrediction.partPredictions[a].passProbability;
    const probB = overallPrediction.partPredictions[b].passProbability;
    return probA - probB;
  });
  
  // Generate summary
  const passingParts = partDetails.filter(p => p.status === 'passing').length;
  const borderlineParts = partDetails.filter(p => p.status === 'borderline').length;
  
  let summary: string;
  if (passingParts === 3) {
    summary = `You're on track to pass all three parts. Keep up the good work!`;
  } else if (passingParts >= 1 || borderlineParts >= 2) {
    summary = `You're making progress. Focus on ${priorityOrder[0]} to improve your overall chances.`;
  } else {
    summary = `More preparation needed. Start with ${priorityOrder[0]} and build your foundation.`;
  }
  
  // Overall status
  let overallStatus: string;
  if (overallPrediction.overallPassProbability >= 70) {
    overallStatus = 'On track to pass';
  } else if (overallPrediction.overallPassProbability >= 40) {
    overallStatus = 'More study needed';
  } else {
    overallStatus = 'Significant preparation required';
  }
  
  return {
    summary,
    partDetails,
    overallStatus,
    priorityOrder,
  };
}

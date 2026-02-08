/**
 * CIA Adaptive Learning Engine
 * 
 * Implements SM-2 spaced repetition algorithm with CIA-specific adaptations.
 * Prioritizes questions based on:
 * - Part weights (CIA1: 40%, CIA2: 30%, CIA3: 30%)
 * - Weakness targeting
 * - Time-based spacing
 * - IPPF coverage
 */

import { CIAPart, CIA_PART_CONFIG } from './ciaAnalytics';

// ============================================================================
// Types
// ============================================================================

export interface QuestionCard {
  id: string;
  part: CIAPart;
  topic: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  ippfReference?: string;
  cognitiveLevel: 'knowledge' | 'comprehension' | 'application' | 'analysis';
}

export interface CardProgress {
  cardId: string;
  easeFactor: number; // SM-2 ease factor (1.3 - 2.5)
  interval: number; // days until next review
  repetitions: number;
  nextReviewDate: Date;
  lastReviewDate: Date | null;
  lastQuality: number; // 0-5 quality rating
  consecutiveCorrect: number;
  totalAttempts: number;
  totalCorrect: number;
}

export interface AdaptiveSession {
  id: string;
  userId: string;
  startedAt: Date;
  part: CIAPart | 'all';
  targetQuestions: number;
  questionsAnswered: number;
  correctAnswers: number;
  currentStreak: number;
  maxStreak: number;
  selectedCards: string[];
  completedCards: string[];
  sessionAccuracy: number;
}

export interface AdaptiveEngineConfig {
  targetAccuracy: number; // Default 75% for CIA
  newCardsPerSession: number;
  reviewCardsPerSession: number;
  partWeighting: boolean;
  prioritizeWeakTopics: boolean;
  minInterval: number; // minimum days between reviews
  maxInterval: number; // maximum days between reviews
}

// ============================================================================
// Constants
// ============================================================================

const DEFAULT_CONFIG: AdaptiveEngineConfig = {
  targetAccuracy: 75,
  newCardsPerSession: 10,
  reviewCardsPerSession: 20,
  partWeighting: true,
  prioritizeWeakTopics: true,
  minInterval: 1,
  maxInterval: 365,
};

const DEFAULT_EASE_FACTOR = 2.5;
const MIN_EASE_FACTOR = 1.3;

// ============================================================================
// SM-2 Algorithm Implementation
// ============================================================================

/**
 * Calculate new SM-2 parameters after a review
 * Quality: 0-5 (0=complete blackout, 5=perfect response)
 */
export function calculateSM2(
  progress: CardProgress,
  quality: number
): CardProgress {
  const q = Math.max(0, Math.min(5, quality));
  
  let { easeFactor, interval, repetitions, consecutiveCorrect } = progress;
  
  if (q >= 3) {
    // Correct response
    consecutiveCorrect++;
    
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    
    repetitions++;
    
    // Update ease factor
    easeFactor = easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
    easeFactor = Math.max(MIN_EASE_FACTOR, easeFactor);
  } else {
    // Incorrect response - reset
    repetitions = 0;
    interval = 1;
    consecutiveCorrect = 0;
    
    // Decrease ease factor
    easeFactor = Math.max(MIN_EASE_FACTOR, easeFactor - 0.2);
  }
  
  // Apply bounds
  interval = Math.max(DEFAULT_CONFIG.minInterval, Math.min(DEFAULT_CONFIG.maxInterval, interval));
  
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + interval);
  
  return {
    ...progress,
    easeFactor,
    interval,
    repetitions,
    nextReviewDate,
    lastReviewDate: new Date(),
    lastQuality: q,
    consecutiveCorrect,
    totalAttempts: progress.totalAttempts + 1,
    totalCorrect: progress.totalCorrect + (q >= 3 ? 1 : 0),
  };
}

/**
 * Convert boolean correct/incorrect to SM-2 quality rating
 */
export function responseToQuality(
  isCorrect: boolean,
  timeSpent: number,
  targetTime: number
): number {
  if (!isCorrect) {
    return timeSpent > targetTime * 2 ? 0 : 1; // Complete fail or near miss
  }
  
  if (timeSpent < targetTime * 0.5) {
    return 5; // Perfect - fast and correct
  } else if (timeSpent < targetTime) {
    return 4; // Good
  } else if (timeSpent < targetTime * 1.5) {
    return 3; // Acceptable
  } else {
    return 3; // Correct but slow
  }
}

// ============================================================================
// Card Selection
// ============================================================================

/**
 * Initialize progress for a new card
 */
export function initializeCardProgress(cardId: string): CardProgress {
  return {
    cardId,
    easeFactor: DEFAULT_EASE_FACTOR,
    interval: 0,
    repetitions: 0,
    nextReviewDate: new Date(),
    lastReviewDate: null,
    lastQuality: 0,
    consecutiveCorrect: 0,
    totalAttempts: 0,
    totalCorrect: 0,
  };
}

/**
 * Get cards due for review
 */
export function getDueCards(
  allProgress: CardProgress[],
  now: Date = new Date()
): CardProgress[] {
  return allProgress.filter(p => {
    if (!p.lastReviewDate) return true; // New cards are due
    return p.nextReviewDate <= now;
  });
}

/**
 * Calculate priority score for a card
 * Higher score = higher priority for review
 */
export function calculateCardPriority(
  card: QuestionCard,
  progress: CardProgress | null,
  partAccuracy: Record<CIAPart, number>,
  config: AdaptiveEngineConfig = DEFAULT_CONFIG
): number {
  let priority = 0;
  
  // Base priority from part weight
  if (config.partWeighting) {
    priority += CIA_PART_CONFIG[card.part].weight * 2;
  }
  
  // Priority boost for weak parts
  if (config.prioritizeWeakTopics) {
    const accuracy = partAccuracy[card.part] || 0;
    if (accuracy < config.targetAccuracy) {
      priority += (config.targetAccuracy - accuracy) * 1.5;
    }
  }
  
  // Difficulty adjustments
  priority += card.difficulty * 5;
  
  // Higher priority for cards never seen
  if (!progress || progress.totalAttempts === 0) {
    priority += 30;
  } else {
    // Overdue cards get priority
    const now = new Date();
    const daysOverdue = Math.max(0, 
      (now.getTime() - progress.nextReviewDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    priority += Math.min(50, daysOverdue * 5);
    
    // Low ease factor = struggling = higher priority
    if (progress.easeFactor < 2.0) {
      priority += (2.5 - progress.easeFactor) * 20;
    }
    
    // Recent failures get priority
    if (progress.lastQuality < 3 && progress.lastReviewDate) {
      priority += 25;
    }
  }
  
  // IPPF references get slight boost (core to CIA)
  if (card.ippfReference) {
    priority += 5;
  }
  
  return priority;
}

/**
 * Select cards for a study session
 */
export function selectSessionCards(
  availableCards: QuestionCard[],
  progressMap: Map<string, CardProgress>,
  partAccuracy: Record<CIAPart, number>,
  targetPart: CIAPart | 'all',
  sessionSize: number,
  config: AdaptiveEngineConfig = DEFAULT_CONFIG
): QuestionCard[] {
  // Filter by part if specified
  let candidates = targetPart === 'all' 
    ? availableCards 
    : availableCards.filter(c => c.part === targetPart);
  
  // Score and sort cards
  const scoredCards = candidates.map(card => ({
    card,
    priority: calculateCardPriority(
      card,
      progressMap.get(card.id) || null,
      partAccuracy,
      config
    ),
  }));
  
  scoredCards.sort((a, b) => b.priority - a.priority);
  
  // Select top cards, ensuring mix of review and new
  const dueForReview: QuestionCard[] = [];
  const newCards: QuestionCard[] = [];
  
  for (const { card } of scoredCards) {
    const progress = progressMap.get(card.id);
    
    if (!progress || progress.totalAttempts === 0) {
      if (newCards.length < config.newCardsPerSession) {
        newCards.push(card);
      }
    } else {
      if (dueForReview.length < config.reviewCardsPerSession) {
        dueForReview.push(card);
      }
    }
    
    if (dueForReview.length + newCards.length >= sessionSize) {
      break;
    }
  }
  
  // Interleave review and new cards
  const selected: QuestionCard[] = [];
  let reviewIdx = 0;
  let newIdx = 0;
  
  while (selected.length < sessionSize && (reviewIdx < dueForReview.length || newIdx < newCards.length)) {
    // Add 2 review cards, then 1 new card
    if (reviewIdx < dueForReview.length) {
      selected.push(dueForReview[reviewIdx++]);
    }
    if (selected.length < sessionSize && reviewIdx < dueForReview.length) {
      selected.push(dueForReview[reviewIdx++]);
    }
    if (selected.length < sessionSize && newIdx < newCards.length) {
      selected.push(newCards[newIdx++]);
    }
  }
  
  return selected;
}

// ============================================================================
// Session Management
// ============================================================================

/**
 * Create a new adaptive session
 */
export function createSession(
  userId: string,
  part: CIAPart | 'all',
  targetQuestions: number
): AdaptiveSession {
  return {
    id: `session_${Date.now()}`,
    userId,
    startedAt: new Date(),
    part,
    targetQuestions,
    questionsAnswered: 0,
    correctAnswers: 0,
    currentStreak: 0,
    maxStreak: 0,
    selectedCards: [],
    completedCards: [],
    sessionAccuracy: 0,
  };
}

/**
 * Record an answer in the session
 */
export function recordAnswer(
  session: AdaptiveSession,
  cardId: string,
  isCorrect: boolean
): AdaptiveSession {
  const updatedSession = { ...session };
  
  updatedSession.questionsAnswered++;
  updatedSession.completedCards.push(cardId);
  
  if (isCorrect) {
    updatedSession.correctAnswers++;
    updatedSession.currentStreak++;
    updatedSession.maxStreak = Math.max(updatedSession.maxStreak, updatedSession.currentStreak);
  } else {
    updatedSession.currentStreak = 0;
  }
  
  updatedSession.sessionAccuracy = Math.round(
    (updatedSession.correctAnswers / updatedSession.questionsAnswered) * 100
  );
  
  return updatedSession;
}

/**
 * Check if session is complete
 */
export function isSessionComplete(session: AdaptiveSession): boolean {
  return session.questionsAnswered >= session.targetQuestions;
}

/**
 * Get session summary
 */
export function getSessionSummary(session: AdaptiveSession): {
  duration: number;
  questionsAnswered: number;
  accuracy: number;
  maxStreak: number;
  cardsReviewed: number;
  performance: 'excellent' | 'good' | 'fair' | 'needs-work';
} {
  const duration = Math.round((Date.now() - session.startedAt.getTime()) / 1000 / 60);
  
  let performance: 'excellent' | 'good' | 'fair' | 'needs-work';
  if (session.sessionAccuracy >= 85) {
    performance = 'excellent';
  } else if (session.sessionAccuracy >= 75) {
    performance = 'good';
  } else if (session.sessionAccuracy >= 60) {
    performance = 'fair';
  } else {
    performance = 'needs-work';
  }
  
  return {
    duration,
    questionsAnswered: session.questionsAnswered,
    accuracy: session.sessionAccuracy,
    maxStreak: session.maxStreak,
    cardsReviewed: session.completedCards.length,
    performance,
  };
}

// ============================================================================
// Part-Based Recommendations
// ============================================================================

/**
 * Get recommended part to study based on performance
 */
export function getRecommendedPart(
  partAccuracy: Record<CIAPart, number>,
  partAttempts: Record<CIAPart, number>
): CIAPart {
  const parts: CIAPart[] = ['CIA1', 'CIA2', 'CIA3'];
  
  // Priority: low attempts > low accuracy > high weight
  let recommended = parts[0];
  let bestScore = -Infinity;
  
  for (const part of parts) {
    const accuracy = partAccuracy[part] || 0;
    const attempts = partAttempts[part] || 0;
    const weight = CIA_PART_CONFIG[part].weight;
    
    // Score formula: penalize high accuracy, reward low attempts, factor in weight
    let score = 0;
    
    // Low attempts = high priority
    if (attempts < 25) {
      score += (25 - attempts) * 3;
    }
    
    // Low accuracy = high priority
    if (accuracy < 75) {
      score += (75 - accuracy) * 2;
    }
    
    // Factor in part weight
    score += weight;
    
    if (score > bestScore) {
      bestScore = score;
      recommended = part;
    }
  }
  
  return recommended;
}

/**
 * Get study time recommendation per part
 */
export function getStudyTimeRecommendation(
  partAccuracy: Record<CIAPart, number>,
  totalMinutesAvailable: number
): Record<CIAPart, number> {
  const parts: CIAPart[] = ['CIA1', 'CIA2', 'CIA3'];
  
  // Calculate need score for each part
  const needScores: Record<CIAPart, number> = {} as Record<CIAPart, number>;
  let totalNeed = 0;
  
  for (const part of parts) {
    const accuracy = partAccuracy[part] || 0;
    const weight = CIA_PART_CONFIG[part].weight;
    
    // Need = weight * (100 - accuracy) / 100
    const need = weight * ((100 - accuracy) / 100 + 0.3); // +0.3 baseline
    needScores[part] = need;
    totalNeed += need;
  }
  
  // Allocate time proportionally
  const timeAllocation: Record<CIAPart, number> = {} as Record<CIAPart, number>;
  for (const part of parts) {
    timeAllocation[part] = Math.round((needScores[part] / totalNeed) * totalMinutesAvailable);
  }
  
  return timeAllocation;
}

// ============================================================================
// Serialization
// ============================================================================

export function serializeProgress(progressMap: Map<string, CardProgress>): string {
  const obj: Record<string, CardProgress> = {};
  progressMap.forEach((v, k) => {
    obj[k] = v;
  });
  return JSON.stringify(obj, (_, value) => {
    if (value instanceof Date) return value.toISOString();
    return value;
  });
}

export function deserializeProgress(json: string): Map<string, CardProgress> {
  const obj = JSON.parse(json, (_, value) => {
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) return date;
    }
    return value;
  });
  
  const map = new Map<string, CardProgress>();
  Object.entries(obj).forEach(([k, v]) => {
    map.set(k, v as CardProgress);
  });
  return map;
}

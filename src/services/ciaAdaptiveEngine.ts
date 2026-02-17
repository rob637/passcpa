/**
 * CIA Adaptive Learning Engine
 *
 * Implements SM-2 spaced repetition algorithm with CIA-specific adaptations.
 * Prioritizes questions based on:
 * - Part weights (CIA1: 40%, CIA2: 30%, CIA3: 30%)
 * - Weakness targeting
 * - Time-based spacing
 * - IPPF coverage
 *
 * This engine uses a session-based, functional architecture (different from the
 * singleton pattern used by CPA/EA/CISA/CMA engines). It uses the shared
 * SM-2 algorithms from adaptiveEngineCore.
 *
 * It also maintains a shared CoreAdaptiveState in the background so that
 * performance queries (weak sections, readiness, etc.) can be served from
 * a unified interface.
 */

import { CIAPart, CIA_PART_CONFIG } from './ciaAnalytics';
import {
  type QuestionHistoryEntry,
  type CoreAdaptiveState,
  calculateSM2WithQuality as coreCalculateSM2WithQuality,
  responseToQuality as coreResponseToQuality,
  createEngineConfig,
  loadState,
  saveState,
  initializeState,
  recordAnswerCore,
  getQuestionsDueForReview as coreGetQuestionsDueForReview,
  getWeakSections as coreGetWeakSections,
  getPerformanceSummaryCore,
  startSessionCore,
  endSessionCore,
  syncToFirestore,
  loadStateWithFirestoreFallback,
} from './adaptiveEngineCore';

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
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReviewDate: Date;
  lastReviewDate: Date | null;
  lastQuality: number;
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
  targetAccuracy: number;
  newCardsPerSession: number;
  reviewCardsPerSession: number;
  partWeighting: boolean;
  prioritizeWeakTopics: boolean;
  minInterval: number;
  maxInterval: number;
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

// ============================================================================
// SM-2 Algorithm Implementation (delegates to shared core)
// ============================================================================

/**
 * Calculate new SM-2 parameters after a review.
 * Quality: 0-5 (0=complete blackout, 5=perfect response)
 *
 * This wraps the shared core SM-2 algorithm, adapting between
 * the CIA CardProgress type and the core's QuestionHistoryEntry.
 */
export function calculateSM2(
  progress: CardProgress,
  quality: number
): CardProgress {
  const q = Math.max(0, Math.min(5, quality));

  // Convert CardProgress to core QuestionHistoryEntry for SM-2 calculation
  const coreEntry: QuestionHistoryEntry = {
    questionId: progress.cardId,
    attempts: progress.repetitions,
    correctCount: progress.totalCorrect,
    lastAttempted: progress.lastReviewDate || new Date(),
    lastResult: progress.lastQuality >= 3,
    easeFactor: progress.easeFactor,
    interval: progress.interval,
    nextReviewDate: progress.nextReviewDate,
    lastResponseTimeMs: 0,
    averageResponseTimeMs: 0,
    stability: progress.easeFactor >= 2.0 ? 2.0 : 0.8,
    lapses: 0,
  };

  const updated = coreCalculateSM2WithQuality(coreEntry, q);

  // Apply CIA-specific bounds
  const boundedInterval = Math.max(
    DEFAULT_CONFIG.minInterval,
    Math.min(DEFAULT_CONFIG.maxInterval, updated.interval)
  );

  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + boundedInterval);

  return {
    ...progress,
    easeFactor: updated.easeFactor,
    interval: boundedInterval,
    repetitions: q >= 3 ? progress.repetitions + 1 : 0,
    nextReviewDate,
    lastReviewDate: new Date(),
    lastQuality: q,
    consecutiveCorrect: q >= 3 ? progress.consecutiveCorrect + 1 : 0,
    totalAttempts: progress.totalAttempts + 1,
    totalCorrect: progress.totalCorrect + (q >= 3 ? 1 : 0),
  };
}

/**
 * Convert boolean correct/incorrect to SM-2 quality rating.
 * Delegates to shared core.
 */
export function responseToQuality(
  isCorrect: boolean,
  timeSpent: number,
  targetTime: number
): number {
  return coreResponseToQuality(isCorrect, timeSpent, targetTime);
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
    if (!p.lastReviewDate) return true;
    return p.nextReviewDate <= now;
  });
}

/**
 * Calculate priority score for a card.
 * Higher score = higher priority for review.
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
 * Select cards for a study session.
 * Uses a 2:1 review-to-new card interleaving strategy.
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

  // Interleave: 2 review cards, then 1 new card
  const selected: QuestionCard[] = [];
  let reviewIdx = 0;
  let newIdx = 0;

  while (selected.length < sessionSize && (reviewIdx < dueForReview.length || newIdx < newCards.length)) {
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
 * Record an answer in the session.
 * Also updates the shared core state automatically (fixes dual-call fragility).
 */
export function recordAnswer(
  session: AdaptiveSession,
  cardId: string,
  isCorrect: boolean,
  part?: CIAPart
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

  // Auto-sync to shared core state (eliminates need for separate recordAnswerToCore call)
  const effectivePart = part || (session.part !== 'all' ? session.part : undefined);
  if (effectivePart) {
    recordAnswerToCore(cardId, effectivePart as CIAPart, isCorrect);
  }

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

  let recommended = parts[0];
  let bestScore = -Infinity;

  for (const part of parts) {
    const accuracy = partAccuracy[part] || 0;
    const attempts = partAttempts[part] || 0;
    const weight = CIA_PART_CONFIG[part].weight;

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

  const needScores: Record<CIAPart, number> = {} as Record<CIAPart, number>;
  let totalNeed = 0;

  for (const part of parts) {
    const accuracy = partAccuracy[part] || 0;
    const weight = CIA_PART_CONFIG[part].weight;

    const need = weight * ((100 - accuracy) / 100 + 0.3);
    needScores[part] = need;
    totalNeed += need;
  }

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

// ============================================================================
// Shared Core Integration (bridging CIA-specific API to unified core state)
// ============================================================================

const CIA_PART_WEIGHTS: Record<string, number> = {
  CIA1: CIA_PART_CONFIG.CIA1.weight,
  CIA2: CIA_PART_CONFIG.CIA2.weight,
  CIA3: CIA_PART_CONFIG.CIA3.weight,
};

const CIA_ENGINE_CONFIG = createEngineConfig({
  storageKey: 'cia-adaptive-state',
  sections: ['CIA1', 'CIA2', 'CIA3'],
  sectionWeights: CIA_PART_WEIGHTS,
  readinessTargetQuestions: 1000,
});

/** Module-level shared core state */
let coreState: CoreAdaptiveState = loadState(CIA_ENGINE_CONFIG);

/** Fire-and-forget sync of adaptive state to Firestore for cross-device persistence */
async function syncStateToCloud(): Promise<void> {
  try {
    const { auth } = await import('../config/firebase');
    const user = auth.currentUser;
    if (user) {
      await syncToFirestore(coreState, user.uid, 'cia');
    }
  } catch { /* fire-and-forget */ }
}

/** Load state with Firestore fallback (for logged-in users on new devices) */
export async function loadWithFirestoreFallback(): Promise<CoreAdaptiveState> {
  try {
    const { auth } = await import('../config/firebase');
    const user = auth.currentUser;
    if (user) {
      coreState = await loadStateWithFirestoreFallback(CIA_ENGINE_CONFIG, user.uid, 'cia');
      return coreState;
    }
  } catch { /* fall through to local load */ }
  return coreState;
}

/**
 * Record an answer in the shared core state (call alongside the CIA-specific recordAnswer).
 * This keeps the unified core state in sync with the card-level CIA engine.
 */
export function recordAnswerToCore(
  questionId: string,
  part: CIAPart,
  isCorrect: boolean,
  responseTimeMs?: number
): void {
  coreState = recordAnswerCore(
    coreState,
    CIA_ENGINE_CONFIG,
    questionId,
    part,
    isCorrect,
    { responseTimeMs },
  );
  saveState(coreState, CIA_ENGINE_CONFIG.storageKey);
}

/**
 * Get performance summary in the unified format used by all engines.
 */
export function getPerformanceSummary(): {
  totalQuestions: number;
  overallAccuracy: number;
  currentDifficulty: string;
  readinessScore: number;
  partBreakdown: { part: CIAPart; accuracy: number; questionsAttempted: number }[];
  weakParts: CIAPart[];
  strongParts: CIAPart[];
} {
  const summary = getPerformanceSummaryCore(coreState, CIA_ENGINE_CONFIG);

  return {
    totalQuestions: summary.totalQuestions,
    overallAccuracy: summary.overallAccuracy,
    currentDifficulty: summary.currentDifficulty,
    readinessScore: summary.readinessScore,
    partBreakdown: summary.sectionBreakdown.map(s => ({
      part: s.section as CIAPart,
      accuracy: s.accuracy,
      questionsAttempted: s.questionsAttempted,
    })),
    weakParts: summary.weakSections as CIAPart[],
    strongParts: summary.strongSections as CIAPart[],
  };
}

/**
 * Get recommended next study action (unified with CISA/CFP pattern).
 */
export function getRecommendedAction(): {
  action: 'practice' | 'review' | 'mock-exam' | 'break';
  part?: CIAPart;
  reason: string;
} {
  const dueCount = coreGetQuestionsDueForReview(coreState.questionHistory).length;
  const weakParts = coreGetWeakSections(coreState, CIA_ENGINE_CONFIG) as CIAPart[];
  const recentAccuracy = coreState.recentResults.slice(-20);
  const overallAccuracy = recentAccuracy.length > 0
    ? recentAccuracy.filter(r => r).length / recentAccuracy.length
    : 0;

  if (dueCount >= 20) {
    return {
      action: 'review',
      reason: `You have ${dueCount} questions due for review using spaced repetition.`,
    };
  }

  if (coreState.totalQuestionsAnswered >= 300 && overallAccuracy >= 0.75) {
    return {
      action: 'mock-exam',
      reason: 'Your accuracy is strong! Test your skills with a practice exam.',
    };
  }

  if (weakParts.length > 0) {
    const priorityPart = weakParts[0];
    const partName = CIA_PART_CONFIG[priorityPart].name;
    return {
      action: 'practice',
      part: priorityPart,
      reason: `Focus on ${partName} — it accounts for ${CIA_PART_WEIGHTS[priorityPart]}% of the exam.`,
    };
  }

  return {
    action: 'practice',
    reason: 'Continue your balanced study across all three parts.',
  };
}

/**
 * Get weak parts via the shared core (consistent with other engines).
 */
export function getWeakParts(): CIAPart[] {
  return coreGetWeakSections(coreState, CIA_ENGINE_CONFIG) as CIAPart[];
}

/**
 * Get questions due for spaced repetition review (shared core).
 */
export function getCoreQuestionsDueForReview(): string[] {
  return coreGetQuestionsDueForReview(coreState.questionHistory);
}

/**
 * Start a session in the shared core state.
 */
export function startCoreSession(): void {
  coreState = startSessionCore(coreState);
  saveState(coreState, CIA_ENGINE_CONFIG.storageKey);
}

/**
 * End a session in the shared core state.
 */
export function endCoreSession(): {
  duration: number;
  questionsAnswered: number;
  accuracy: number;
} {
  const result = endSessionCore(coreState);
  coreState = result.state;
  saveState(coreState, CIA_ENGINE_CONFIG.storageKey);
  syncStateToCloud();
  return result.summary;
}

/**
 * Reset both CIA card-level and shared core state.
 */
export function resetCoreState(): void {
  coreState = initializeState(CIA_ENGINE_CONFIG);
  saveState(coreState, CIA_ENGINE_CONFIG.storageKey);
}

/**
 * Expose core state for the unified adapter (question selection).
 */
export function getCoreState(): CoreAdaptiveState {
  return coreState;
}

/**
 * Expose engine config for the unified adapter (question selection).
 */
export function getCIAEngineConfig() {
  return CIA_ENGINE_CONFIG;
}
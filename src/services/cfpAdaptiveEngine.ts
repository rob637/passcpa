/**
 * CFP Adaptive Question Engine
 *
 * Intelligently selects questions based on user performance:
 * - Adjusts difficulty based on recent accuracy
 * - Prioritizes weak domains based on exam weight
 * - Uses spaced repetition for missed questions
 * - Balances coverage across all domains
 * - Avoids recently seen questions
 *
 * This engine uses a functional (immutable state) pattern — state is passed in
 * and a new state is returned. No module-level singleton.
 *
 * Uses shared adaptiveEngineCore for SM-2, difficulty adjustment, state management,
 * and question selection algorithms.
 */

import {
  type QuestionHistoryEntry,
  type CoreAdaptiveState,
  type BaseSelectionCriteria,
  type SelectionReason,
  createEngineConfig,
  initializeState,
  loadState,
  saveState,
  recordAnswerCore,
  selectQuestionsCore,
  getPerformanceSummaryCore,
  getQuestionsDueForReview,
  getWeakSections,
  startSessionCore,
  endSessionCore,
  syncToFirestore,
  loadStateWithFirestoreFallback,
} from './adaptiveEngineCore';

// ============================================================================
// CFP-Specific Types
// ============================================================================

export interface AdaptiveQuestion {
  id: string;
  courseId?: string;
  domain?: string;
  section?: string;
  difficulty?: string;
  question: string;
  options: string[] | { id: string; text: string }[];
  correctAnswer?: number;
  correctOptionId?: string;
  explanation: string;
}

export type QuestionHistory = QuestionHistoryEntry;

export interface DomainPerformance {
  domain: string;
  questionsAttempted: number;
  accuracy: number;
  recentAccuracy: number;
  needsWork: boolean;
  lastPracticed: Date | null;
}

export type AdaptiveState = CoreAdaptiveState;

export interface SelectionCriteria extends BaseSelectionCriteria {
  domains?: string[];
}

export interface SelectedQuestion extends AdaptiveQuestion {
  selectionReason: SelectionReason;
  priority: number;
}

// ============================================================================
// CFP Exam Domain Weights
// ============================================================================

const DOMAIN_WEIGHTS: Record<string, number> = {
  'RET': 19,
  'GEN': 18,
  'PRO': 15,
  'TAX': 14,
  'EST': 12,
  'RISK': 12,
  'INV': 11,
};

// ============================================================================
// Engine Configuration
// ============================================================================

const ENGINE_CONFIG = createEngineConfig({
  storageKey: 'cfp-adaptive-state',
  sections: Object.keys(DOMAIN_WEIGHTS),
  sectionWeights: DOMAIN_WEIGHTS,
  readinessTargetQuestions: 1500,
});

// ============================================================================
// Public API — State Management (Functional Pattern)
// ============================================================================

/**
 * Initialize adaptive state. Returns a fresh state object.
 */
export function initializeAdaptiveState(): AdaptiveState {
  return initializeState(ENGINE_CONFIG);
}

/**
 * Load adaptive state from localStorage. Returns saved state or fresh state if none.
 */
export function loadAdaptiveState(): AdaptiveState {
  return loadState(ENGINE_CONFIG);
}

/**
 * Save adaptive state to localStorage.
 */
export function saveAdaptiveState(state: AdaptiveState): void {
  saveState(state, ENGINE_CONFIG.storageKey);
}

/** Fire-and-forget sync of adaptive state to Firestore for cross-device persistence */
async function syncStateToCloud(state: AdaptiveState): Promise<void> {
  try {
    const { auth } = await import('../config/firebase');
    const user = auth.currentUser;
    if (user) {
      await syncToFirestore(state, user.uid, 'cfp');
    }
  } catch { /* fire-and-forget */ }
}

/** Load state with Firestore fallback (for logged-in users on new devices) */
export async function loadWithFirestoreFallback(): Promise<AdaptiveState> {
  try {
    const { auth } = await import('../config/firebase');
    const user = auth.currentUser;
    if (user) {
      return await loadStateWithFirestoreFallback(ENGINE_CONFIG, user.uid, 'cfp');
    }
  } catch { /* fall through to local load */ }
  return loadState(ENGINE_CONFIG);
}

// ============================================================================
// Public API — Sessions
// ============================================================================

/**
 * Start a new practice session. Returns updated state.
 */
export function startSession(state: AdaptiveState): AdaptiveState {
  const updated = startSessionCore(state);
  saveAdaptiveState(updated);
  return updated;
}

/**
 * End the current session. Returns updated state with session summary.
 */
export function endSession(state: AdaptiveState): { state: AdaptiveState; summary: ReturnType<typeof endSessionCore>['summary'] } {
  const result = endSessionCore(state);
  saveAdaptiveState(result.state);
  syncStateToCloud(result.state);
  return result;
}

// ============================================================================
// Public API — Recording Results (Functional — returns new state)
// ============================================================================

/**
 * Record a question result and update adaptive state.
 * Returns a new state object (does not mutate input).
 * Auto-saves to localStorage.
 */
export function recordResult(
  state: AdaptiveState,
  questionId: string,
  domain: string,
  isCorrect: boolean,
  responseTimeMs?: number
): AdaptiveState {
  const updated = recordAnswerCore(state, ENGINE_CONFIG, questionId, domain, isCorrect, { responseTimeMs });
  saveAdaptiveState(updated);
  return updated;
}

// ============================================================================
// Public API — Question Selection
// ============================================================================

/**
 * Helper to extract domain from a CFP question (which may use domain or section field)
 */
function getDomain(q: AdaptiveQuestion): string {
  return q.domain || q.section || q.id.split('-')[1] || 'GEN';
}

/**
 * Select questions adaptively based on state and criteria.
 *
 * Uses shared core selection algorithm with CFP-specific domain extraction.
 */
export function selectQuestions(
  allQuestions: AdaptiveQuestion[],
  state: AdaptiveState,
  criteria: SelectionCriteria
): SelectedQuestion[] {
  // Normalize CFP questions to have the `difficulty` field the core expects
  const normalizedQuestions = allQuestions.map(q => ({
    ...q,
    difficulty: (q.difficulty || 'medium') as 'easy' | 'medium' | 'hard',
    correctAnswer: q.correctAnswer ?? 0,
  }));

  const coreCriteria: BaseSelectionCriteria = {
    sections: criteria.domains,
    difficulty: criteria.difficulty,
    count: criteria.count,
    excludeRecent: criteria.excludeRecent,
    prioritizeWeakAreas: criteria.prioritizeWeakAreas,
    includeReviewDue: criteria.includeReviewDue,
    examWeighted: criteria.examWeighted,
  };

  const results = selectQuestionsCore(
    normalizedQuestions,
    state,
    ENGINE_CONFIG,
    coreCriteria,
    getDomain,
  );

  return results as unknown as SelectedQuestion[];
}

/**
 * Get questions for a targeted practice session
 */
export function getTargetedPractice(
  allQuestions: AdaptiveQuestion[],
  state: AdaptiveState,
  domain: string,
  count: number = 10
): SelectedQuestion[] {
  return selectQuestions(allQuestions, state, {
    domains: [domain],
    difficulty: 'adaptive',
    count,
    excludeRecent: true,
    prioritizeWeakAreas: false,
    includeReviewDue: true,
    examWeighted: false,
  });
}

/**
 * Get questions for an adaptive study session
 */
export function getAdaptiveSession(
  allQuestions: AdaptiveQuestion[],
  state: AdaptiveState,
  count: number = 20
): SelectedQuestion[] {
  return selectQuestions(allQuestions, state, {
    difficulty: 'adaptive',
    count,
    excludeRecent: true,
    prioritizeWeakAreas: true,
    includeReviewDue: true,
    examWeighted: true,
  });
}

/**
 * Get questions for weak area focus
 */
export function getWeakAreaFocus(
  allQuestions: AdaptiveQuestion[],
  state: AdaptiveState,
  count: number = 15
): SelectedQuestion[] {
  const weakDomains = Object.values(state.sectionPerformance)
    .filter(d => d.needsWork || d.accuracy < 0.70)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 3)
    .map(d => d.sectionId);

  if (weakDomains.length === 0) {
    const lowestDomains = Object.values(state.sectionPerformance)
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 2)
      .map(d => d.sectionId);

    return selectQuestions(allQuestions, state, {
      domains: lowestDomains,
      difficulty: 'adaptive',
      count,
      excludeRecent: true,
      prioritizeWeakAreas: true,
      includeReviewDue: true,
      examWeighted: false,
    });
  }

  return selectQuestions(allQuestions, state, {
    domains: weakDomains,
    difficulty: 'adaptive',
    count,
    excludeRecent: true,
    prioritizeWeakAreas: true,
    includeReviewDue: true,
    examWeighted: false,
  });
}

// ============================================================================
// Public API — Recommendations
// ============================================================================

/**
 * Get recommended next study action
 */
export function getStudyRecommendation(state: AdaptiveState): {
  action: 'review' | 'weak-areas' | 'new-content' | 'mock-exam' | 'maintain';
  domain?: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
} {
  // Check for review due
  const reviewDue = Array.from(state.questionHistory.values())
    .filter(h => h.nextReviewDate <= new Date() && !h.lastResult)
    .length;

  if (reviewDue > 10) {
    return {
      action: 'review',
      reason: `You have ${reviewDue} questions due for review. Catch up to maintain retention.`,
      priority: 'high',
    };
  }

  // Check for weak domains
  const weakDomains = Object.values(state.sectionPerformance)
    .filter(d => d.needsWork && d.questionsAttempted >= 10)
    .sort((a, b) => {
      const aWeight = DOMAIN_WEIGHTS[a.sectionId] || 10;
      const bWeight = DOMAIN_WEIGHTS[b.sectionId] || 10;
      return (a.accuracy - b.accuracy) + (aWeight - bWeight) * 2;
    });

  if (weakDomains.length > 0) {
    const weakest = weakDomains[0];
    return {
      action: 'weak-areas',
      domain: weakest.sectionId,
      reason: `Focus on ${weakest.sectionId} (${Math.round(weakest.accuracy * 100)}% accuracy, ${DOMAIN_WEIGHTS[weakest.sectionId] || 10}% of exam).`,
      priority: 'high',
    };
  }

  // Check for domains with low practice count
  const lowPractice = Object.values(state.sectionPerformance)
    .filter(d => d.questionsAttempted < 20)
    .sort((a, b) => a.questionsAttempted - b.questionsAttempted);

  if (lowPractice.length > 0) {
    return {
      action: 'new-content',
      domain: lowPractice[0].sectionId,
      reason: `Practice more in ${lowPractice[0].sectionId} to build comprehensive coverage.`,
      priority: 'medium',
    };
  }

  // Check overall performance
  const totalAttempts = Object.values(state.sectionPerformance)
    .reduce((sum, d) => sum + d.questionsAttempted, 0);

  if (totalAttempts > 300 && state.recentResults.length >= 10) {
    const recentAccuracy = state.recentResults.filter(r => r).length / state.recentResults.length;
    if (recentAccuracy >= 0.75) {
      return {
        action: 'mock-exam',
        reason: 'Strong recent performance. Take a mock exam to test readiness.',
        priority: 'medium',
      };
    }
  }

  return {
    action: 'maintain',
    reason: 'Continue balanced practice across all domains.',
    priority: 'low',
  };
}

/**
 * Normalized recommendation action (consistent API with CPA/EA/CMA/CIA/CISA).
 * Maps CFP-specific actions to the standard action set.
 */
export function getRecommendedAction(state: AdaptiveState): {
  action: 'practice' | 'review' | 'mock-exam' | 'break';
  domain?: string;
  reason: string;
} {
  const rec = getStudyRecommendation(state);
  // Map CFP-specific actions to the standard action set
  const actionMap: Record<string, 'practice' | 'review' | 'mock-exam' | 'break'> = {
    'review': 'review',
    'weak-areas': 'practice',
    'new-content': 'practice',
    'mock-exam': 'mock-exam',
    'maintain': 'practice',
  };
  return {
    action: actionMap[rec.action] || 'practice',
    domain: rec.domain,
    reason: rec.reason,
  };
}

// ============================================================================
// Public API — Performance & Review
// ============================================================================

/**
 * Get performance summary across all domains.
 */
export function getPerformanceSummary(state: AdaptiveState) {
  return getPerformanceSummaryCore(state, ENGINE_CONFIG);
}

/**
 * Get question IDs due for spaced repetition review.
 */
export function getDueForReview(state: AdaptiveState): string[] {
  return getQuestionsDueForReview(state.questionHistory);
}

/**
 * Get weak domains (accuracy below threshold).
 */
export function getWeakDomains(state: AdaptiveState) {
  return getWeakSections(state, ENGINE_CONFIG);
}

export default {
  initializeAdaptiveState,
  loadAdaptiveState,
  saveAdaptiveState,
  startSession,
  endSession,
  recordResult,
  selectQuestions,
  getTargetedPractice,
  getAdaptiveSession,
  getWeakAreaFocus,
  getStudyRecommendation,
  getPerformanceSummary,
  getDueForReview,
  getWeakDomains,
};

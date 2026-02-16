/**
 * CMA Adaptive Question Engine
 *
 * Intelligently selects questions based on user performance for the IMA CMA exam:
 * - Adjusts difficulty based on recent accuracy
 * - Prioritizes weak domains based on IMA exam weights
 * - Uses spaced repetition for missed questions
 * - Balances coverage across both parts (CMA1, CMA2)
 * - Avoids recently seen questions
 *
 * Based on IMA CMA Content Specification Outline 2025-2026
 *
 * Uses shared adaptiveEngineCore for SM-2, difficulty adjustment, state management,
 * and question selection algorithms.
 */

import {
  type QuestionHistoryEntry,
  type CoreAdaptiveState,
  type BaseSelectionCriteria,
  createEngineConfig,
  loadState,
  saveState,
  initializeState,
  recordAnswerCore,
  getQuestionsDueForReview as coreGetQuestionsDueForReview,
  getWeakSections as coreGetWeakSections,
  getWeakSubSections,
  selectQuestionsCore,
  getPerformanceSummaryCore,
  startSessionCore,
  endSessionCore,
  shuffleArray,
  syncToFirestore,
  loadStateWithFirestoreFallback,
} from './adaptiveEngineCore';

// ============================================================================
// CMA-Specific Types
// ============================================================================

export type CMASectionId = 'CMA1' | 'CMA2';

export interface CMAAdaptiveQuestion {
  id: string;
  part: CMASectionId;
  domain?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  concepts: string[];
  imaRef?: string;
}

export type QuestionHistory = QuestionHistoryEntry;

export interface PartPerformance {
  part: CMASectionId;
  questionsAttempted: number;
  accuracy: number;
  recentAccuracy: number;
  needsWork: boolean;
  lastPracticed: Date | null;
  masteredConcepts: string[];
  struggleConcepts: string[];
}

export interface AdaptiveState extends CoreAdaptiveState {
  userId: string;
  sessionQuestionsAnswered: number;
}

// ============================================================================
// IMA CMA Domain Weights
// ============================================================================

export const CMA_DOMAIN_WEIGHTS: Record<string, number> = {
  'CMA1-A': 15,
  'CMA1-B': 20,
  'CMA1-C': 20,
  'CMA1-D': 15,
  'CMA1-E': 15,
  'CMA1-F': 15,
  'CMA2-A': 20,
  'CMA2-B': 20,
  'CMA2-C': 25,
  'CMA2-D': 10,
  'CMA2-E': 10,
  'CMA2-F': 15,
};

// ============================================================================
// Engine Configuration
// Note: CMA previously used hardThreshold=0.50, but we standardize to 0.60
// for consistency across all exams. This provides a smoother learning curve.
// ============================================================================

const CMA_SECTIONS: string[] = ['CMA1', 'CMA2'];

const ENGINE_CONFIG = createEngineConfig({
  storageKey: 'cma-adaptive-state',
  sections: CMA_SECTIONS,
  sectionWeights: CMA_DOMAIN_WEIGHTS,
  readinessTargetQuestions: 1000,
});

// ============================================================================
// Module-Level State
// ============================================================================

function loadCMAState(): AdaptiveState {
  const coreState = loadState(ENGINE_CONFIG);
  // Restore CMA-specific fields
  const stored = localStorage.getItem(ENGINE_CONFIG.storageKey);
  let userId = 'default';
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      userId = parsed.userId || 'default';
    } catch { /* ignore */ }
  }
  return { ...coreState, userId, sessionQuestionsAnswered: 0 };
}

function saveCMAState(state: AdaptiveState): void {
  saveState(state, ENGINE_CONFIG.storageKey);
  // Also persist CMA-specific fields
  try {
    const stored = localStorage.getItem(ENGINE_CONFIG.storageKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      parsed.userId = state.userId;
      parsed.sessionQuestionsAnswered = state.sessionQuestionsAnswered;
      localStorage.setItem(ENGINE_CONFIG.storageKey, JSON.stringify(parsed));
    }
  } catch { /* ignore */ }
}

let adaptiveState: AdaptiveState = loadCMAState();

/** Fire-and-forget sync of adaptive state to Firestore for cross-device persistence */
async function syncStateToCloud(): Promise<void> {
  try {
    const userId = adaptiveState.userId;
    if (userId) {
      await syncToFirestore(adaptiveState, userId, 'cma');
    }
  } catch { /* fire-and-forget */ }
}

/** Load state with Firestore fallback (for logged-in users on new devices) */
export async function loadWithFirestoreFallback(userId: string): Promise<AdaptiveState> {
  try {
    const coreState = await loadStateWithFirestoreFallback(ENGINE_CONFIG, userId, 'cma');
    adaptiveState = {
      ...coreState,
      userId,
      sessionQuestionsAnswered: adaptiveState.sessionQuestionsAnswered || 0,
    };
    return adaptiveState;
  } catch { /* fall through to local load */ }
  return loadCMAState();
}

// ============================================================================
// Public API — State Management
// ============================================================================

export function initializeAdaptiveEngine(userId: string): AdaptiveState {
  const loaded = loadCMAState();
  if (loaded.userId === userId) {
    adaptiveState = loaded;
  } else {
    adaptiveState = {
      ...initializeState(ENGINE_CONFIG),
      userId,
      sessionQuestionsAnswered: 0,
    };
    saveCMAState(adaptiveState);
  }
  return adaptiveState;
}

export function resetAdaptiveState(userId: string): void {
  adaptiveState = {
    ...initializeState(ENGINE_CONFIG),
    userId,
    sessionQuestionsAnswered: 0,
  };
  saveCMAState(adaptiveState);
}

// ============================================================================
// Public API — Recording Answers
// ============================================================================

export function recordAnswer(
  questionId: string,
  isCorrect: boolean,
  part: CMASectionId,
  _domain?: string,
  _timeSpent?: number
): void {
  const updatedCore = recordAnswerCore(
    adaptiveState,
    ENGINE_CONFIG,
    questionId,
    part,
    isCorrect,
    { subSectionId: _domain }
  );

  adaptiveState = {
    ...updatedCore,
    userId: adaptiveState.userId,
    sessionQuestionsAnswered: adaptiveState.sessionQuestionsAnswered + 1,
  };
  saveCMAState(adaptiveState);
}

// ============================================================================
// Public API — Queries
// ============================================================================

export function getDueForReview(): string[] {
  return coreGetQuestionsDueForReview(adaptiveState.questionHistory);
}

export function getWeakParts(): CMASectionId[] {
  return coreGetWeakSections(adaptiveState, ENGINE_CONFIG) as CMASectionId[];
}

export function getWeakDomains(): string[] {
  return getWeakSubSections(adaptiveState, ENGINE_CONFIG);
}

// ============================================================================
// Public API — Recommendations
// ============================================================================

/**
 * Get recommended next study action based on current adaptive state.
 */
export function getRecommendedAction(): {
  action: 'practice' | 'review' | 'mock-exam' | 'break';
  part?: CMASectionId;
  reason: string;
} {
  const dueCount = getDueForReview().length;
  const weakParts = getWeakParts();
  const recentAccuracy = adaptiveState.recentResults.slice(-20);
  const overallAccuracy = recentAccuracy.length > 0
    ? recentAccuracy.filter(r => r).length / recentAccuracy.length
    : 0;

  if (dueCount >= 20) {
    return {
      action: 'review',
      reason: `You have ${dueCount} questions due for spaced repetition review.`,
    };
  }

  if (adaptiveState.totalQuestionsAnswered >= 400 && overallAccuracy >= 0.75) {
    return {
      action: 'mock-exam',
      reason: 'Your accuracy is strong! Take a CMA practice exam.',
    };
  }

  if (weakParts.length > 0) {
    const priorityPart = weakParts[0];
    return {
      action: 'practice',
      part: priorityPart,
      reason: `Focus on ${priorityPart} — it needs more work.`,
    };
  }

  return {
    action: 'practice',
    reason: 'Continue your balanced study across both CMA parts.',
  };
}

// ============================================================================
// Public API — Question Selection
// ============================================================================

export function selectQuestions(
  availableQuestions: CMAAdaptiveQuestion[],
  count: number = 10,
  focusPart?: CMASectionId
): CMAAdaptiveQuestion[] {
  const coreCriteria: BaseSelectionCriteria = {
    sections: focusPart ? [focusPart] : undefined,
    difficulty: 'adaptive',
    count,
    excludeRecent: true,
    prioritizeWeakAreas: !focusPart,
    includeReviewDue: true,
    examWeighted: false,
  };

  const results = selectQuestionsCore(
    availableQuestions,
    adaptiveState,
    ENGINE_CONFIG,
    coreCriteria,
    (q) => q.part,
    (q) => q.domain,
  );

  return shuffleArray(results);
}

// ============================================================================
// Public API — Performance Summary
// ============================================================================

export function getPerformanceSummary(): {
  totalQuestions: number;
  overallAccuracy: number;
  currentDifficulty: string;
  readinessScore: number;
  partBreakdown: { part: CMASectionId; accuracy: number; questionsAttempted: number }[];
  weakParts: CMASectionId[];
  strongParts: CMASectionId[];
} {
  const summary = getPerformanceSummaryCore(adaptiveState, ENGINE_CONFIG);

  return {
    totalQuestions: summary.totalQuestions,
    overallAccuracy: summary.overallAccuracy,
    currentDifficulty: summary.currentDifficulty,
    readinessScore: summary.readinessScore,
    partBreakdown: summary.sectionBreakdown.map(s => ({
      part: s.section as CMASectionId,
      accuracy: s.accuracy,
      questionsAttempted: s.questionsAttempted,
    })),
    weakParts: summary.weakSections as CMASectionId[],
    strongParts: summary.strongSections as CMASectionId[],
  };
}

// ============================================================================
// Public API — Session Management
// ============================================================================

export function startSession(): void {
  adaptiveState = {
    ...startSessionCore(adaptiveState),
    userId: adaptiveState.userId,
    sessionQuestionsAnswered: 0,
  };
  saveCMAState(adaptiveState);
}

export function endSession(): {
  duration: number;
  questionsAnswered: number;
  accuracy: number;
} {
  const result = endSessionCore(adaptiveState);
  const summary = {
    ...result.summary,
    questionsAnswered: adaptiveState.sessionQuestionsAnswered,
  };
  adaptiveState = {
    ...result.state,
    userId: adaptiveState.userId,
    sessionQuestionsAnswered: 0,
  };
  saveCMAState(adaptiveState);
  syncStateToCloud();
  return summary;
}

// ============================================================================
// Public API — Domain Performance
// ============================================================================

export function getDomainPerformance(part: CMASectionId): Record<string, { attempted: number; accuracy: number }> {
  const partDomains = Object.keys(CMA_DOMAIN_WEIGHTS).filter(d => d.startsWith(part));
  const sectionPerf = adaptiveState.sectionPerformance[part];

  return Object.fromEntries(
    partDomains.map(domain => {
      const subPerf = sectionPerf?.subSectionPerformance?.[domain];
      return [
        domain,
        {
          attempted: subPerf?.questionsAttempted ?? 0,
          accuracy: subPerf ? Math.round(subPerf.accuracy * 100) : 0,
        },
      ];
    })
  );
}

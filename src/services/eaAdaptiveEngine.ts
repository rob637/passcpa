/**
 * EA Adaptive Question Engine
 *
 * Intelligently selects questions based on user performance for the IRS SEE exam:
 * - Adjusts difficulty based on recent accuracy
 * - Prioritizes weak domains based on IRS SEE exam weights
 * - Uses spaced repetition for missed questions
 * - Balances coverage across all 3 parts (SEE1, SEE2, SEE3)
 * - Avoids recently seen questions
 *
 * Based on IRS SEE Content Outline 2025-2026
 *
 * Uses shared adaptiveEngineCore for SM-2, difficulty adjustment, state management,
 * and question selection algorithms.
 */

import { EASectionId } from '../courses/ea/config';
import {
  type QuestionHistoryEntry,
  type CoreAdaptiveState,
  type BaseSelectionCriteria,
  type SelectionReason,
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
  syncToFirestore,
  loadStateWithFirestoreFallback,
} from './adaptiveEngineCore';

// ============================================================================
// EA-Specific Types
// ============================================================================

export interface EAAdaptiveQuestion {
  id: string;
  part: EASectionId;
  domain?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  concepts: string[];
  irsRef?: string;
}

export type QuestionHistory = QuestionHistoryEntry;

export interface PartPerformance {
  part: EASectionId;
  questionsAttempted: number;
  accuracy: number;
  recentAccuracy: number;
  needsWork: boolean;
  lastPracticed: Date | null;
  masteredConcepts: string[];
  struggleConcepts: string[];
  domainPerformance: Record<string, {
    questionsAttempted: number;
    accuracy: number;
  }>;
}

export type EAAdaptiveState = CoreAdaptiveState;

export interface SelectionCriteria extends BaseSelectionCriteria {
  parts?: EASectionId[];
  domains?: string[];
}

export interface SelectedQuestion extends EAAdaptiveQuestion {
  selectionReason: SelectionReason;
  priority: number;
}

// ============================================================================
// IRS SEE Domain Weights (2025-2026)
// ============================================================================

const SEE1_DOMAIN_WEIGHTS: Record<string, number> = {
  'SEE1-1': 16.5,
  'SEE1-2': 20.0,
  'SEE1-3': 20.0,
  'SEE1-4': 17.6,
  'SEE1-5': 12.9,
  'SEE1-6': 12.9,
};

const SEE2_DOMAIN_WEIGHTS: Record<string, number> = {
  'SEE2-1': 28.2,
  'SEE2-2': 38.8,
  'SEE2-3': 32.9,
};

const SEE3_DOMAIN_WEIGHTS: Record<string, number> = {
  'SEE3-1': 25.9,
  'SEE3-2': 17.6,
  'SEE3-3': 23.5,
  'SEE3-4': 16.5,
};

const ALL_DOMAIN_WEIGHTS: Record<string, number> = {
  ...SEE1_DOMAIN_WEIGHTS,
  ...SEE2_DOMAIN_WEIGHTS,
  ...SEE3_DOMAIN_WEIGHTS,
};

// ============================================================================
// Engine Configuration
// ============================================================================

const EA_SECTIONS: string[] = ['SEE1', 'SEE2', 'SEE3'];

const ENGINE_CONFIG = createEngineConfig({
  storageKey: 'ea-adaptive-state',
  sections: EA_SECTIONS,
  sectionWeights: ALL_DOMAIN_WEIGHTS,
  readinessTargetQuestions: 1500,
});

// ============================================================================
// Module-Level State
// ============================================================================

let adaptiveState: EAAdaptiveState = loadState(ENGINE_CONFIG);

/** Fire-and-forget sync of adaptive state to Firestore for cross-device persistence */
async function syncStateToCloud(): Promise<void> {
  try {
    const { auth } = await import('../config/firebase');
    const user = auth.currentUser;
    if (user) {
      await syncToFirestore(adaptiveState, user.uid, 'ea');
    }
  } catch { /* fire-and-forget */ }
}

/** Load state with Firestore fallback (for logged-in users on new devices) */
export async function loadWithFirestoreFallback(): Promise<EAAdaptiveState> {
  try {
    const { auth } = await import('../config/firebase');
    const user = auth.currentUser;
    if (user) {
      const coreState = await loadStateWithFirestoreFallback(ENGINE_CONFIG, user.uid, 'ea');
      adaptiveState = coreState;
      return adaptiveState;
    }
  } catch { /* fall through to local load */ }
  return loadState(ENGINE_CONFIG);
}

// ============================================================================
// Public API — State Management
// ============================================================================

export function initializeAdaptiveState(): EAAdaptiveState {
  return initializeState(ENGINE_CONFIG);
}

export function loadAdaptiveState(): EAAdaptiveState {
  return loadState(ENGINE_CONFIG);
}

export function saveAdaptiveState(state: EAAdaptiveState): void {
  saveState(state, ENGINE_CONFIG.storageKey);
}

export function getAdaptiveState(): EAAdaptiveState {
  return adaptiveState;
}

export function resetAdaptiveState(): void {
  adaptiveState = initializeAdaptiveState();
  saveState(adaptiveState, ENGINE_CONFIG.storageKey);
}

// ============================================================================
// Public API — Recording Answers
// ============================================================================

export function recordAnswer(
  questionId: string,
  part: EASectionId,
  domain: string | undefined,
  isCorrect: boolean,
  concepts: string[] = []
): void {
  adaptiveState = recordAnswerCore(
    adaptiveState,
    ENGINE_CONFIG,
    questionId,
    part,
    isCorrect,
    {
      subSectionId: domain,
      concepts,
    }
  );
  saveState(adaptiveState, ENGINE_CONFIG.storageKey);
}

// ============================================================================
// Public API — Queries
// ============================================================================

export function getQuestionsDueForReview(): string[] {
  return coreGetQuestionsDueForReview(adaptiveState.questionHistory);
}

export function getWeakParts(): EASectionId[] {
  return coreGetWeakSections(adaptiveState, ENGINE_CONFIG) as EASectionId[];
}

export function getWeakDomains(): string[] {
  return getWeakSubSections(adaptiveState, ENGINE_CONFIG);
}

// ============================================================================
// Public API — Question Selection
// ============================================================================

export function selectQuestions(
  allQuestions: EAAdaptiveQuestion[],
  criteria: SelectionCriteria
): SelectedQuestion[] {
  const coreCriteria: BaseSelectionCriteria = {
    sections: criteria.parts as unknown as string[],
    subSections: criteria.domains,
    difficulty: criteria.difficulty,
    count: criteria.count,
    excludeRecent: criteria.excludeRecent,
    prioritizeWeakAreas: criteria.prioritizeWeakAreas,
    includeReviewDue: criteria.includeReviewDue,
    examWeighted: criteria.examWeighted,
  };

  const results = selectQuestionsCore(
    allQuestions,
    adaptiveState,
    ENGINE_CONFIG,
    coreCriteria,
    (q) => q.part,
    (q) => q.domain,
  );

  return results as SelectedQuestion[];
}

// ============================================================================
// Public API — Recommendations
// ============================================================================

/**
 * Get recommended next study action based on current adaptive state.
 */
export function getRecommendedAction(): {
  action: 'practice' | 'review' | 'mock-exam' | 'break';
  part?: EASectionId;
  reason: string;
} {
  const dueCount = getQuestionsDueForReview().length;
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
      reason: 'Your accuracy is strong! Take a full SEE practice exam.',
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
    reason: 'Continue your balanced study across all three SEE parts.',
  };
}

// ============================================================================
// Public API — Performance Summary
// ============================================================================

export function getPerformanceSummary(): {
  totalQuestions: number;
  overallAccuracy: number;
  currentDifficulty: string;
  readinessScore: number;
  partBreakdown: { part: EASectionId; accuracy: number; questionsAttempted: number }[];
  weakParts: EASectionId[];
  strongParts: EASectionId[];
} {
  const summary = getPerformanceSummaryCore(adaptiveState, ENGINE_CONFIG);

  return {
    totalQuestions: summary.totalQuestions,
    overallAccuracy: summary.overallAccuracy,
    currentDifficulty: summary.currentDifficulty,
    readinessScore: summary.readinessScore,
    partBreakdown: summary.sectionBreakdown.map(s => ({
      part: s.section as EASectionId,
      accuracy: s.accuracy,
      questionsAttempted: s.questionsAttempted,
    })),
    weakParts: summary.weakSections as EASectionId[],
    strongParts: summary.strongSections as EASectionId[],
  };
}

// ============================================================================
// Public API — Session Management
// ============================================================================

export function startSession(): void {
  adaptiveState = startSessionCore(adaptiveState);
  saveState(adaptiveState, ENGINE_CONFIG.storageKey);
}

export function endSession(): {
  duration: number;
  questionsAnswered: number;
  accuracy: number;
} {
  const result = endSessionCore(adaptiveState);
  adaptiveState = result.state;
  saveState(adaptiveState, ENGINE_CONFIG.storageKey);
  syncStateToCloud();
  return result.summary;
}

/**
 * CISA Adaptive Question Engine
 *
 * Intelligently selects questions based on user performance:
 * - Adjusts difficulty based on recent accuracy
 * - Prioritizes weak domains based on ISACA exam weights
 * - Uses spaced repetition for missed questions
 * - Balances coverage across all 5 domains
 * - Avoids recently seen questions
 *
 * Uses shared adaptiveEngineCore for SM-2, difficulty adjustment, state management,
 * and question selection algorithms.
 */

import { CISASectionId, CISA_SECTION_CONFIG } from '../courses/cisa/config';
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
  shuffleArray,
  syncToFirestore,
  loadStateWithFirestoreFallback,
} from './adaptiveEngineCore';

// ============================================================================
// CISA-Specific Types
// ============================================================================

export interface CISAAdaptiveQuestion {
  id: string;
  domain: CISASectionId;
  subdomain?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  concepts: string[];
  isacaRef?: string;
}

export type QuestionHistory = QuestionHistoryEntry;

export interface DomainPerformance {
  domain: CISASectionId;
  questionsAttempted: number;
  accuracy: number;
  recentAccuracy: number;
  needsWork: boolean;
  lastPracticed: Date | null;
  masteredConcepts: string[];
  struggleConcepts: string[];
}

export type AdaptiveState = CoreAdaptiveState;

export interface SelectionCriteria extends BaseSelectionCriteria {
  domains?: CISASectionId[];
}

export interface SelectedQuestion extends CISAAdaptiveQuestion {
  selectionReason: SelectionReason;
  priority: number;
}

// ============================================================================
// ISACA CISA Domain Weights (2024-2026)
// ============================================================================

const DOMAIN_WEIGHTS: Record<CISASectionId, number> = {
  CISA1: 21,
  CISA2: 16,
  CISA3: 18,
  CISA4: 20,
  CISA5: 25,
};

// ============================================================================
// Engine Configuration
// ============================================================================

const CISA_SECTIONS: string[] = ['CISA1', 'CISA2', 'CISA3', 'CISA4', 'CISA5'];

const ENGINE_CONFIG = createEngineConfig({
  storageKey: 'cisa-adaptive-state',
  sections: CISA_SECTIONS,
  sectionWeights: DOMAIN_WEIGHTS as unknown as Record<string, number>,
});

// ============================================================================
// Module-Level State
// ============================================================================

let adaptiveState: AdaptiveState = loadState(ENGINE_CONFIG);

/** Fire-and-forget sync of adaptive state to Firestore for cross-device persistence */
async function syncStateToCloud(): Promise<void> {
  try {
    const { auth } = await import('../config/firebase');
    const user = auth.currentUser;
    if (user) {
      await syncToFirestore(adaptiveState, user.uid, 'cisa');
    }
  } catch { /* fire-and-forget */ }
}

/** Load state with Firestore fallback (for logged-in users on new devices) */
export async function loadWithFirestoreFallback(): Promise<AdaptiveState> {
  try {
    const { auth } = await import('../config/firebase');
    const user = auth.currentUser;
    if (user) {
      adaptiveState = await loadStateWithFirestoreFallback(ENGINE_CONFIG, user.uid, 'cisa');
      return adaptiveState;
    }
  } catch { /* fall through to local load */ }
  return loadState(ENGINE_CONFIG);
}

// ============================================================================
// Public API — State Management
// ============================================================================

export function initializeAdaptiveState(): AdaptiveState {
  return initializeState(ENGINE_CONFIG);
}

export function loadAdaptiveState(): AdaptiveState {
  return loadState(ENGINE_CONFIG);
}

export function saveAdaptiveState(state: AdaptiveState): void {
  saveState(state, ENGINE_CONFIG.storageKey);
}

export function getAdaptiveState(): AdaptiveState {
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
  domain: CISASectionId,
  isCorrect: boolean,
  _difficulty: 'easy' | 'medium' | 'hard',
  concepts: string[] = [],
  subdomain?: string,
  responseTimeMs?: number
): void {
  adaptiveState = recordAnswerCore(
    adaptiveState,
    ENGINE_CONFIG,
    questionId,
    domain,
    isCorrect,
    { subSectionId: subdomain, concepts, responseTimeMs }
  );
  saveState(adaptiveState, ENGINE_CONFIG.storageKey);
}

// ============================================================================
// Public API — Queries
// ============================================================================

export function getQuestionsDueForReview(): string[] {
  return coreGetQuestionsDueForReview(adaptiveState.questionHistory);
}

export function getWeakDomains(): CISASectionId[] {
  return coreGetWeakSections(adaptiveState, ENGINE_CONFIG) as CISASectionId[];
}

/**
 * Get weak subdomains across all CISA domains.
 */
export function getWeakSubdomains(): string[] {
  return getWeakSubSections(adaptiveState, ENGINE_CONFIG);
}

// ============================================================================
// Public API — Question Selection
// ============================================================================

export function selectQuestions(
  allQuestions: CISAAdaptiveQuestion[],
  criteria: SelectionCriteria
): SelectedQuestion[] {
  const coreCriteria: BaseSelectionCriteria = {
    sections: criteria.domains as unknown as string[],
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
    (q) => q.domain,
    (q) => q.subdomain,
  );

  // Shuffle to avoid predictable order
  return shuffleArray(results) as SelectedQuestion[];
}

// ============================================================================
// Public API — Recommendations
// ============================================================================

export function getRecommendedAction(): {
  action: 'practice' | 'review' | 'mock-exam' | 'break';
  domain?: CISASectionId;
  reason: string;
} {
  const dueCount = getQuestionsDueForReview().length;
  const weakDomains = getWeakDomains();
  const recentAccuracy = adaptiveState.recentResults.slice(-20);
  const overallAccuracy = recentAccuracy.length > 0
    ? recentAccuracy.filter(r => r).length / recentAccuracy.length
    : 0;

  if (dueCount >= 20) {
    return {
      action: 'review',
      reason: `You have ${dueCount} questions due for review using spaced repetition.`,
    };
  }

  if (adaptiveState.totalQuestionsAnswered >= 500 && overallAccuracy >= 0.75) {
    return {
      action: 'mock-exam',
      reason: 'Your accuracy is strong! Test your skills with a full mock exam.',
    };
  }

  if (weakDomains.length > 0) {
    const priorityDomain = weakDomains[0];
    const domainName = CISA_SECTION_CONFIG[priorityDomain].shortTitle;
    return {
      action: 'practice',
      domain: priorityDomain,
      reason: `Focus on ${domainName} - it accounts for ${DOMAIN_WEIGHTS[priorityDomain]}% of the exam.`,
    };
  }

  return {
    action: 'practice',
    reason: 'Continue your balanced study across all domains.',
  };
}

// ============================================================================
// Public API — Performance Summary
// ============================================================================

export function getPerformanceSummary(): {
  overallAccuracy: number;
  totalQuestions: number;
  strongDomains: CISASectionId[];
  weakDomains: CISASectionId[];
  readinessScore: number;
  passProbability: number;
} {
  const summary = getPerformanceSummaryCore(adaptiveState, ENGINE_CONFIG);

  // Calculate weighted accuracy for pass probability
  const domainScores = Object.entries(adaptiveState.sectionPerformance).map(([domain, perf]) => ({
    domain: domain as CISASectionId,
    accuracy: perf.accuracy,
    weight: DOMAIN_WEIGHTS[domain as CISASectionId] || 0,
    questions: perf.questionsAttempted,
  }));

  const weightedSum = domainScores.reduce((sum, d) => sum + d.accuracy * d.weight, 0);
  const totalWeight = domainScores.reduce((sum, d) => sum + d.weight, 0);
  const weightedAccuracy = totalWeight > 0 ? weightedSum / totalWeight : 0;

  const coverageScore = Math.min(adaptiveState.totalQuestionsAnswered / 500, 1);
  const passProbability = Math.round(
    Math.min(100, Math.max(0, (weightedAccuracy - 0.45) * 200 + coverageScore * 20))
  );

  return {
    overallAccuracy: summary.overallAccuracy,
    totalQuestions: summary.totalQuestions,
    strongDomains: summary.strongSections as CISASectionId[],
    weakDomains: summary.weakSections as CISASectionId[],
    readinessScore: summary.readinessScore,
    passProbability,
  };
}

// ============================================================================
// Public API — Session Management
// ============================================================================

export function startSession(): void {
  adaptiveState = startSessionCore(adaptiveState);
  adaptiveState = { ...adaptiveState, lastSessionQuestions: [] };
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

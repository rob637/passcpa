/**
 * CPA Adaptive Question Engine
 *
 * Intelligently selects questions based on user performance for the AICPA CPA Exam:
 * - Adjusts difficulty based on recent accuracy
 * - Prioritizes weak blueprint areas based on AICPA exam weights
 * - Uses spaced repetition for missed questions
 * - Balances coverage across all sections (Core + Discipline)
 * - Avoids recently seen questions
 *
 * CPA Evolution Model:
 * - Core Sections: FAR, AUD, REG (mandatory)
 * - Discipline Sections: BAR, ISC, TCP (choose 1)
 *
 * Based on AICPA CPA Exam Blueprints 2025-2026
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
  loadState,
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
// CPA-Specific Types
// ============================================================================

export type CPASectionId = 'FAR' | 'AUD' | 'REG' | 'BAR' | 'ISC' | 'TCP';
export const CPA_CORE_SECTIONS: CPASectionId[] = ['FAR', 'AUD', 'REG'];
export const CPA_DISCIPLINE_SECTIONS: CPASectionId[] = ['BAR', 'ISC', 'TCP'];
export const ALL_CPA_SECTIONS: CPASectionId[] = [...CPA_CORE_SECTIONS, ...CPA_DISCIPLINE_SECTIONS];

export interface CPAAdaptiveQuestion {
  id: string;
  section: CPASectionId;
  blueprintArea?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  concepts: string[];
  reference?: string;
}

// Re-export core types under CPA-compatible names
export type QuestionHistory = QuestionHistoryEntry;

export interface SectionPerformance {
  section: CPASectionId;
  questionsAttempted: number;
  accuracy: number;
  recentAccuracy: number;
  needsWork: boolean;
  lastPracticed: Date | null;
  masteredConcepts: string[];
  struggleConcepts: string[];
  blueprintAreaPerformance: Record<string, {
    questionsAttempted: number;
    accuracy: number;
  }>;
}

export interface CPAAdaptiveState extends CoreAdaptiveState {
  chosenDiscipline: CPASectionId | null;
}

export interface SelectionCriteria extends BaseSelectionCriteria {
  sections?: CPASectionId[];
  blueprintAreas?: string[];
}

export interface SelectedQuestion extends CPAAdaptiveQuestion {
  selectionReason: SelectionReason;
  priority: number;
}

// ============================================================================
// AICPA Blueprint Weights (2025-2026)
// ============================================================================

const FAR_BLUEPRINT_WEIGHTS: Record<string, number> = {
  'FAR-I': 10,    // 5-15%
  'FAR-II': 35,   // 30-40%
  'FAR-III': 30,  // 25-35%
  'FAR-IV': 15,   // 10-20%
  'FAR-V': 10,    // 5-15%  → sum = 100
};

const AUD_BLUEPRINT_WEIGHTS: Record<string, number> = {
  'AUD-I': 15,    // 15-25%
  'AUD-II': 30,   // 25-35%
  'AUD-III': 35,  // 30-40%
  'AUD-IV': 20,   // 15-25%  → sum = 100
};

const REG_BLUEPRINT_WEIGHTS: Record<string, number> = {
  'REG-I': 15,    // 10-20%
  'REG-II': 15,   // 10-20%
  'REG-III': 20,  // 15-25%
  'REG-IV': 30,   // 22-32%
  'REG-V': 20,    // 12-22%  → sum = 100
};

const BAR_BLUEPRINT_WEIGHTS: Record<string, number> = {
  'BAR-I': 45,
  'BAR-II': 40,
  'BAR-III': 15,
};

const ISC_BLUEPRINT_WEIGHTS: Record<string, number> = {
  'ISC-I': 40,
  'ISC-II': 40,
  'ISC-III': 20,
};

const TCP_BLUEPRINT_WEIGHTS: Record<string, number> = {
  'TCP-I': 35,    // 30-40%
  'TCP-II': 25,   // 25-35%
  'TCP-III': 25,  // 20-30%
  'TCP-IV': 15,   // 10-20%  → sum = 100
};

export const SECTION_BLUEPRINT_WEIGHTS: Record<CPASectionId, Record<string, number>> = {
  FAR: FAR_BLUEPRINT_WEIGHTS,
  AUD: AUD_BLUEPRINT_WEIGHTS,
  REG: REG_BLUEPRINT_WEIGHTS,
  BAR: BAR_BLUEPRINT_WEIGHTS,
  ISC: ISC_BLUEPRINT_WEIGHTS,
  TCP: TCP_BLUEPRINT_WEIGHTS,
};

export const ALL_BLUEPRINT_WEIGHTS: Record<string, number> = {
  ...FAR_BLUEPRINT_WEIGHTS,
  ...AUD_BLUEPRINT_WEIGHTS,
  ...REG_BLUEPRINT_WEIGHTS,
  ...BAR_BLUEPRINT_WEIGHTS,
  ...ISC_BLUEPRINT_WEIGHTS,
  ...TCP_BLUEPRINT_WEIGHTS,
};

// ============================================================================
// Engine Configuration
// ============================================================================

const ENGINE_CONFIG = createEngineConfig({
  storageKey: 'cpa-adaptive-state',
  sections: ALL_CPA_SECTIONS as unknown as string[],
  sectionWeights: ALL_BLUEPRINT_WEIGHTS,
  readinessTargetQuestions: 2000,
});

// ============================================================================
// Module-Level State
// ============================================================================

function loadCPAState(): CPAAdaptiveState {
  const coreState = loadState(ENGINE_CONFIG);
  // Restore CPA-specific field
  const stored = localStorage.getItem(ENGINE_CONFIG.storageKey);
  let chosenDiscipline: CPASectionId | null = null;
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      chosenDiscipline = parsed.chosenDiscipline || null;
    } catch { /* ignore */ }
  }
  return { ...coreState, chosenDiscipline };
}

let adaptiveState: CPAAdaptiveState = loadCPAState();

function saveCPAState(state: CPAAdaptiveState): void {
  // Save the complete state to localStorage
  try {
    const toSave = {
      currentDifficulty: state.currentDifficulty,
      difficultyScore: state.difficultyScore,
      targetAccuracy: state.targetAccuracy,
      recentResults: state.recentResults,
      sectionPerformance: state.sectionPerformance,
      lastSessionQuestions: state.lastSessionQuestions,
      totalQuestionsAnswered: state.totalQuestionsAnswered,
      // CPA-specific field
      chosenDiscipline: state.chosenDiscipline,
    };
    localStorage.setItem(ENGINE_CONFIG.storageKey, JSON.stringify(toSave));
  } catch { /* ignore localStorage errors */ }
}

/** Fire-and-forget sync of adaptive state to Firestore for cross-device persistence */
async function syncStateToCloud(): Promise<void> {
  try {
    const { auth } = await import('../config/firebase');
    const user = auth.currentUser;
    if (user) {
      await syncToFirestore(adaptiveState, user.uid, 'cpa');
      // Also persist chosenDiscipline to the Firestore doc
      if (adaptiveState.chosenDiscipline) {
        const { db } = await import('../config/firebase');
        const { doc, setDoc } = await import('firebase/firestore');
        await setDoc(doc(db, 'users', user.uid, 'adaptive_state', 'cpa'), {
          chosenDiscipline: adaptiveState.chosenDiscipline,
        }, { merge: true });
      }
    }
  } catch { /* fire-and-forget — don't block UI on sync failures */ }
}

/** Load state with Firestore fallback (for logged-in users on new devices) */
export async function loadWithFirestoreFallback(): Promise<CPAAdaptiveState> {
  try {
    const { auth } = await import('../config/firebase');
    const user = auth.currentUser;
    if (user) {
      const coreState = await loadStateWithFirestoreFallback(ENGINE_CONFIG, user.uid, 'cpa');
      // Restore chosenDiscipline: prefer localStorage, then Firestore, then null
      let discipline = adaptiveState.chosenDiscipline;
      if (!discipline) {
        // Try loading from Firestore adaptive state doc
        try {
          const { db } = await import('../config/firebase');
          const { doc, getDoc } = await import('firebase/firestore');
          const snap = await getDoc(doc(db, 'users', user.uid, 'adaptive_state', 'cpa'));
          if (snap.exists()) {
            discipline = snap.data()?.chosenDiscipline || null;
          }
        } catch { /* ignore */ }
      }
      adaptiveState = { ...coreState, chosenDiscipline: discipline };
      return adaptiveState;
    }
  } catch { /* fall through to local load */ }
  return loadCPAState();
}

// ============================================================================
// Public API — State Management
// ============================================================================

export function initializeAdaptiveState(): CPAAdaptiveState {
  return { ...initializeState(ENGINE_CONFIG), chosenDiscipline: null };
}

export function loadAdaptiveState(): CPAAdaptiveState {
  return loadCPAState();
}

export function saveAdaptiveState(state: CPAAdaptiveState): void {
  saveCPAState(state);
}

export function getAdaptiveState(): CPAAdaptiveState {
  return adaptiveState;
}

export function resetAdaptiveState(): void {
  adaptiveState = initializeAdaptiveState();
  saveCPAState(adaptiveState);
}

// ============================================================================
// Public API — CPA-Specific: Discipline Selection
// ============================================================================

export function setChosenDiscipline(discipline: CPASectionId): void {
  if (CPA_DISCIPLINE_SECTIONS.includes(discipline)) {
    adaptiveState.chosenDiscipline = discipline;
    saveCPAState(adaptiveState);
  }
}

export function getChosenDiscipline(): CPASectionId | null {
  return adaptiveState.chosenDiscipline;
}

export function getActiveSections(): CPASectionId[] {
  const active: CPASectionId[] = [...CPA_CORE_SECTIONS];
  if (adaptiveState.chosenDiscipline) {
    active.push(adaptiveState.chosenDiscipline);
  }
  return active;
}

// ============================================================================
// Public API — Recording Answers
// ============================================================================

export function recordAnswer(
  questionId: string,
  section: CPASectionId,
  blueprintArea: string | undefined,
  isCorrect: boolean,
  concepts: string[] = [],
  responseTimeMs?: number
): void {
  const updatedCore = recordAnswerCore(
    adaptiveState,
    ENGINE_CONFIG,
    questionId,
    section,
    isCorrect,
    {
      subSectionId: blueprintArea,
      concepts,
      responseTimeMs,
    }
  );

  adaptiveState = { ...updatedCore, chosenDiscipline: adaptiveState.chosenDiscipline };
  saveCPAState(adaptiveState);
}

// ============================================================================
// Public API — Queries
// ============================================================================

export function getQuestionsDueForReview(): string[] {
  return coreGetQuestionsDueForReview(adaptiveState.questionHistory);
}

export function getWeakSections(): CPASectionId[] {
  const activeSections = getActiveSections() as unknown as string[];
  return coreGetWeakSections(adaptiveState, ENGINE_CONFIG, activeSections) as CPASectionId[];
}

export function getWeakBlueprintAreas(): string[] {
  const activeSections = getActiveSections() as unknown as string[];
  return getWeakSubSections(adaptiveState, ENGINE_CONFIG, activeSections);
}

// ============================================================================
// Public API — Question Selection
// ============================================================================

export function selectQuestions(
  allQuestions: CPAAdaptiveQuestion[],
  criteria: SelectionCriteria
): SelectedQuestion[] {
  const activeSections = getActiveSections() as unknown as string[];

  const coreCriteria: BaseSelectionCriteria = {
    sections: criteria.sections as unknown as string[],
    subSections: criteria.blueprintAreas,
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
    (q) => q.section,
    (q) => q.blueprintArea,
    activeSections
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
  section?: CPASectionId;
  reason: string;
} {
  const dueCount = getQuestionsDueForReview().length;
  const weakSections = getWeakSections();
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

  if (adaptiveState.totalQuestionsAnswered >= 500 && overallAccuracy >= 0.75) {
    return {
      action: 'mock-exam',
      reason: 'Your accuracy is strong! Test yourself with a full mock exam.',
    };
  }

  if (weakSections.length > 0) {
    const prioritySection = weakSections[0];
    return {
      action: 'practice',
      section: prioritySection,
      reason: `Focus on ${prioritySection} — it needs more work.`,
    };
  }

  return {
    action: 'practice',
    reason: 'Continue your balanced study across all sections.',
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
  sectionBreakdown: { section: CPASectionId; accuracy: number; questionsAttempted: number }[];
  weakSections: CPASectionId[];
  strongSections: CPASectionId[];
  chosenDiscipline: CPASectionId | null;
} {
  const activeSections = getActiveSections() as unknown as string[];
  const summary = getPerformanceSummaryCore(adaptiveState, ENGINE_CONFIG, activeSections);

  return {
    totalQuestions: summary.totalQuestions,
    overallAccuracy: summary.overallAccuracy,
    currentDifficulty: summary.currentDifficulty,
    readinessScore: summary.readinessScore,
    sectionBreakdown: summary.sectionBreakdown.map(s => ({
      section: s.section as CPASectionId,
      accuracy: s.accuracy,
      questionsAttempted: s.questionsAttempted,
    })),
    weakSections: summary.weakSections as CPASectionId[],
    strongSections: summary.strongSections as CPASectionId[],
    chosenDiscipline: adaptiveState.chosenDiscipline,
  };
}

/**
 * Get blueprint area performance for a specific section
 */
export function getSectionBlueprintPerformance(section: CPASectionId): Record<string, {
  accuracy: number;
  questionsAttempted: number;
  weight: number;
  status: 'weak' | 'developing' | 'proficient' | 'strong';
}> {
  const sectionPerf = adaptiveState.sectionPerformance[section];
  const weights = SECTION_BLUEPRINT_WEIGHTS[section];
  const result: Record<string, { accuracy: number; questionsAttempted: number; weight: number; status: 'weak' | 'developing' | 'proficient' | 'strong' }> = {};

  Object.keys(weights).forEach(area => {
    const perf = sectionPerf?.subSectionPerformance?.[area] || { accuracy: 0, questionsAttempted: 0 };
    const accuracy = Math.round(perf.accuracy * 100);

    let status: 'weak' | 'developing' | 'proficient' | 'strong';
    if (accuracy >= 80) status = 'strong';
    else if (accuracy >= 70) status = 'proficient';
    else if (accuracy >= 55) status = 'developing';
    else status = 'weak';

    result[area] = {
      accuracy,
      questionsAttempted: perf.questionsAttempted,
      weight: weights[area],
      status,
    };
  });

  return result;
}

// ============================================================================
// Public API — Session Management
// ============================================================================

export function startSession(): void {
  adaptiveState = { ...startSessionCore(adaptiveState), chosenDiscipline: adaptiveState.chosenDiscipline };
  saveCPAState(adaptiveState);
}

export function endSession(): {
  duration: number;
  questionsAnswered: number;
  accuracy: number;
} {
  const result = endSessionCore(adaptiveState);
  adaptiveState = { ...result.state, chosenDiscipline: adaptiveState.chosenDiscipline };
  saveCPAState(adaptiveState);
  syncStateToCloud();
  return result.summary;
}

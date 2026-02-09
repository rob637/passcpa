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
 */

// CPA Section types
export type CPASectionId = 'FAR' | 'AUD' | 'REG' | 'BAR' | 'ISC' | 'TCP';
export const CPA_CORE_SECTIONS: CPASectionId[] = ['FAR', 'AUD', 'REG'];
export const CPA_DISCIPLINE_SECTIONS: CPASectionId[] = ['BAR', 'ISC', 'TCP'];
export const ALL_CPA_SECTIONS: CPASectionId[] = [...CPA_CORE_SECTIONS, ...CPA_DISCIPLINE_SECTIONS];

// Question type for adaptive engine
export interface CPAAdaptiveQuestion {
  id: string;
  section: CPASectionId;
  blueprintArea?: string; // e.g., 'FAR-I', 'FAR-II', etc.
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  concepts: string[];
  reference?: string; // ASC, AU-C, etc.
}

// Types for tracking performance
export interface QuestionHistory {
  questionId: string;
  attempts: number;
  correctCount: number;
  lastAttempted: Date;
  lastResult: boolean;
  easeFactor: number; // SM-2 algorithm
  interval: number; // days until next review
  nextReviewDate: Date;
}

export interface SectionPerformance {
  section: CPASectionId;
  questionsAttempted: number;
  accuracy: number;
  recentAccuracy: number; // Last 10 questions
  needsWork: boolean;
  lastPracticed: Date | null;
  masteredConcepts: string[];
  struggleConcepts: string[];
  blueprintAreaPerformance: Record<string, {
    questionsAttempted: number;
    accuracy: number;
  }>;
}

export interface CPAAdaptiveState {
  currentDifficulty: 'easy' | 'medium' | 'hard';
  targetAccuracy: number; // 70-85% is optimal for learning
  recentResults: boolean[]; // Last 10 answers
  sectionPerformance: Record<CPASectionId, SectionPerformance>;
  questionHistory: Map<string, QuestionHistory>;
  lastSessionQuestions: string[];
  totalQuestionsAnswered: number;
  sessionStartTime: Date | null;
  chosenDiscipline: CPASectionId | null; // User's chosen discipline section
}

export interface SelectionCriteria {
  sections?: CPASectionId[];
  blueprintAreas?: string[]; // e.g., ['FAR-I', 'FAR-II']
  difficulty?: 'easy' | 'medium' | 'hard' | 'adaptive';
  count: number;
  excludeRecent?: boolean;
  prioritizeWeakAreas?: boolean;
  includeReviewDue?: boolean;
  examWeighted?: boolean;
}

export interface SelectedQuestion extends CPAAdaptiveQuestion {
  selectionReason: 'weak-area' | 'review-due' | 'new' | 'balanced' | 'difficulty-match';
  priority: number;
}

// AICPA Blueprint Weights (2025-2026)
// FAR: Financial Accounting and Reporting
const FAR_BLUEPRINT_WEIGHTS: Record<string, number> = {
  'FAR-I': 12.5,   // Conceptual Framework, Standard-Setting (5-15% avg = 10, but we use midpoint ~12.5)
  'FAR-II': 35,    // Select Financial Statement Accounts (30-40%)
  'FAR-III': 30,   // Select Transactions (25-35%)
  'FAR-IV': 15,    // State and Local Governments (10-20%)
  'FAR-V': 10,     // Not-for-Profit Entities (5-15%)
};

// AUD: Auditing and Attestation
const AUD_BLUEPRINT_WEIGHTS: Record<string, number> = {
  'AUD-I': 20,     // Ethics, Professional Responsibilities (15-25%)
  'AUD-II': 30,    // Assessing Risk and Planning (25-35%)
  'AUD-III': 35,   // Performing Procedures and Evidence (30-40%)
  'AUD-IV': 20,    // Forming Conclusions and Reporting (15-25%)
};

// REG: Regulation
const REG_BLUEPRINT_WEIGHTS: Record<string, number> = {
  'REG-I': 15,     // Ethics and Federal Tax Procedures (10-20%)
  'REG-II': 15,    // Business Law (10-20%)
  'REG-III': 20,   // Federal Taxation of Individuals (15-25%)
  'REG-IV': 27,    // Federal Taxation of Entities (22-32%)
  'REG-V': 17,     // Federal Taxation of Property Transactions (12-22%)
};

// BAR: Business Analysis and Reporting
const BAR_BLUEPRINT_WEIGHTS: Record<string, number> = {
  'BAR-I': 45,     // Business Analysis (40-50%)
  'BAR-II': 40,    // Technical Accounting and Reporting (35-45%)
  'BAR-III': 15,   // State and Local Governments (10-20%)
};

// ISC: Information Systems and Controls
const ISC_BLUEPRINT_WEIGHTS: Record<string, number> = {
  'ISC-I': 40,     // Information Systems (35-45%)
  'ISC-II': 40,    // Security, Confidentiality, Privacy (35-45%)
  'ISC-III': 20,   // SOC Considerations (15-25%)
};

// TCP: Tax Compliance and Planning
const TCP_BLUEPRINT_WEIGHTS: Record<string, number> = {
  'TCP-I': 35,     // Tax Compliance for Individuals (30-40%)
  'TCP-II': 30,    // Entity Tax Compliance (25-35%)
  'TCP-III': 25,   // Entity Tax Planning (20-30%)
  'TCP-IV': 15,    // Property Transactions (10-20%)
};

const SECTION_BLUEPRINT_WEIGHTS: Record<CPASectionId, Record<string, number>> = {
  FAR: FAR_BLUEPRINT_WEIGHTS,
  AUD: AUD_BLUEPRINT_WEIGHTS,
  REG: REG_BLUEPRINT_WEIGHTS,
  BAR: BAR_BLUEPRINT_WEIGHTS,
  ISC: ISC_BLUEPRINT_WEIGHTS,
  TCP: TCP_BLUEPRINT_WEIGHTS,
};

const ALL_BLUEPRINT_WEIGHTS: Record<string, number> = {
  ...FAR_BLUEPRINT_WEIGHTS,
  ...AUD_BLUEPRINT_WEIGHTS,
  ...REG_BLUEPRINT_WEIGHTS,
  ...BAR_BLUEPRINT_WEIGHTS,
  ...ISC_BLUEPRINT_WEIGHTS,
  ...TCP_BLUEPRINT_WEIGHTS,
};

// Difficulty adjustment thresholds
const TARGET_ACCURACY = 0.75;
const EASY_THRESHOLD = 0.85;
const HARD_THRESHOLD = 0.60;
const RECENT_QUESTION_WINDOW = 50; // Avoid last 50 questions

// Storage key
const STORAGE_KEY = 'cpa-adaptive-state';

/**
 * Initialize adaptive state
 */
export function initializeAdaptiveState(): CPAAdaptiveState {
  const sectionPerformance: Record<CPASectionId, SectionPerformance> = {} as Record<CPASectionId, SectionPerformance>;
  
  ALL_CPA_SECTIONS.forEach(section => {
    sectionPerformance[section] = {
      section,
      questionsAttempted: 0,
      accuracy: 0,
      recentAccuracy: 0,
      needsWork: true,
      lastPracticed: null,
      masteredConcepts: [],
      struggleConcepts: [],
      blueprintAreaPerformance: {},
    };
  });
  
  return {
    currentDifficulty: 'medium',
    targetAccuracy: TARGET_ACCURACY,
    recentResults: [],
    sectionPerformance,
    questionHistory: new Map(),
    lastSessionQuestions: [],
    totalQuestionsAnswered: 0,
    sessionStartTime: null,
    chosenDiscipline: null,
  };
}

/**
 * Load state from localStorage
 */
export function loadAdaptiveState(): CPAAdaptiveState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Restore Map from array
      parsed.questionHistory = new Map(parsed.questionHistory || []);
      // Restore dates
      Object.values(parsed.sectionPerformance).forEach((sp: unknown) => {
        const sectionPerf = sp as SectionPerformance;
        if (sectionPerf.lastPracticed) {
          sectionPerf.lastPracticed = new Date(sectionPerf.lastPracticed);
        }
      });
      parsed.questionHistory.forEach((qh: QuestionHistory) => {
        qh.lastAttempted = new Date(qh.lastAttempted);
        qh.nextReviewDate = new Date(qh.nextReviewDate);
      });
      if (parsed.sessionStartTime) {
        parsed.sessionStartTime = new Date(parsed.sessionStartTime);
      }
      return parsed;
    }
  } catch (e) {
    console.error('Failed to load CPA adaptive state:', e);
  }
  return initializeAdaptiveState();
}

/**
 * Save state to localStorage
 */
export function saveAdaptiveState(state: CPAAdaptiveState): void {
  try {
    const toStore = {
      ...state,
      questionHistory: Array.from(state.questionHistory.entries()),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  } catch (e) {
    console.error('Failed to save CPA adaptive state:', e);
  }
}

// Module-level state
let adaptiveState: CPAAdaptiveState = loadAdaptiveState();

/**
 * Get current adaptive state
 */
export function getAdaptiveState(): CPAAdaptiveState {
  return adaptiveState;
}

/**
 * Reset adaptive state (for testing or user request)
 */
export function resetAdaptiveState(): void {
  adaptiveState = initializeAdaptiveState();
  saveAdaptiveState(adaptiveState);
}

/**
 * Set user's chosen discipline section
 */
export function setChosenDiscipline(discipline: CPASectionId): void {
  if (CPA_DISCIPLINE_SECTIONS.includes(discipline)) {
    adaptiveState.chosenDiscipline = discipline;
    saveAdaptiveState(adaptiveState);
  }
}

/**
 * Get user's chosen discipline section
 */
export function getChosenDiscipline(): CPASectionId | null {
  return adaptiveState.chosenDiscipline;
}

/**
 * Record an answer and update adaptive state
 */
export function recordAnswer(
  questionId: string,
  section: CPASectionId,
  blueprintArea: string | undefined,
  isCorrect: boolean,
  concepts: string[] = []
): void {
  const now = new Date();
  
  // Update recent results
  adaptiveState.recentResults.push(isCorrect);
  if (adaptiveState.recentResults.length > 10) {
    adaptiveState.recentResults.shift();
  }
  
  // Update question history
  let history = adaptiveState.questionHistory.get(questionId);
  if (!history) {
    history = {
      questionId,
      attempts: 0,
      correctCount: 0,
      lastAttempted: now,
      lastResult: isCorrect,
      easeFactor: 2.5, // SM-2 default
      interval: 1,
      nextReviewDate: now,
    };
  }
  
  history.attempts++;
  if (isCorrect) history.correctCount++;
  history.lastAttempted = now;
  history.lastResult = isCorrect;
  
  // SM-2 algorithm for spaced repetition
  if (isCorrect) {
    if (history.attempts === 1) {
      history.interval = 1;
    } else if (history.attempts === 2) {
      history.interval = 6;
    } else {
      history.interval = Math.round(history.interval * history.easeFactor);
    }
    history.easeFactor = Math.max(1.3, history.easeFactor + 0.1);
  } else {
    history.interval = 1;
    history.easeFactor = Math.max(1.3, history.easeFactor - 0.2);
  }
  
  history.nextReviewDate = new Date(now.getTime() + history.interval * 24 * 60 * 60 * 1000);
  adaptiveState.questionHistory.set(questionId, history);
  
  // Update section performance
  const sectionPerf = adaptiveState.sectionPerformance[section];
  sectionPerf.questionsAttempted++;
  sectionPerf.accuracy = calculateSectionAccuracy(section);
  sectionPerf.recentAccuracy = calculateRecentAccuracy();
  sectionPerf.lastPracticed = now;
  sectionPerf.needsWork = sectionPerf.accuracy < 0.70;
  
  // Update blueprint area performance if provided
  if (blueprintArea) {
    if (!sectionPerf.blueprintAreaPerformance[blueprintArea]) {
      sectionPerf.blueprintAreaPerformance[blueprintArea] = { questionsAttempted: 0, accuracy: 0 };
    }
    sectionPerf.blueprintAreaPerformance[blueprintArea].questionsAttempted++;
    // Calculate accuracy for this blueprint area
    const areaHistory = Array.from(adaptiveState.questionHistory.values())
      .filter(h => h.questionId.toLowerCase().includes(blueprintArea.toLowerCase().replace('-', '')));
    const areaCorrect = areaHistory.reduce((sum, h) => sum + h.correctCount, 0);
    const areaTotal = areaHistory.reduce((sum, h) => sum + h.attempts, 0);
    sectionPerf.blueprintAreaPerformance[blueprintArea].accuracy = areaTotal > 0 ? areaCorrect / areaTotal : 0;
  }
  
  // Update concept tracking
  if (isCorrect) {
    concepts.forEach(concept => {
      if (!sectionPerf.masteredConcepts.includes(concept)) {
        sectionPerf.masteredConcepts.push(concept);
      }
      const idx = sectionPerf.struggleConcepts.indexOf(concept);
      if (idx > -1) sectionPerf.struggleConcepts.splice(idx, 1);
    });
  } else {
    concepts.forEach(concept => {
      if (!sectionPerf.struggleConcepts.includes(concept)) {
        sectionPerf.struggleConcepts.push(concept);
      }
    });
  }
  
  // Update difficulty based on recent performance
  adjustDifficulty();
  
  // Track session questions
  adaptiveState.lastSessionQuestions.push(questionId);
  if (adaptiveState.lastSessionQuestions.length > RECENT_QUESTION_WINDOW) {
    adaptiveState.lastSessionQuestions.shift();
  }
  
  adaptiveState.totalQuestionsAnswered++;
  
  // Save state
  saveAdaptiveState(adaptiveState);
}

/**
 * Calculate overall accuracy for a section
 */
function calculateSectionAccuracy(section: CPASectionId): number {
  let correct = 0;
  let total = 0;
  
  adaptiveState.questionHistory.forEach((history) => {
    // Check if question belongs to this section (by ID prefix)
    if (history.questionId.toLowerCase().startsWith(section.toLowerCase())) {
      if (history.attempts > 0) {
        correct += history.correctCount;
        total += history.attempts;
      }
    }
  });
  
  return total > 0 ? correct / total : 0;
}

/**
 * Calculate recent accuracy (last 10 questions)
 */
function calculateRecentAccuracy(): number {
  const recent = adaptiveState.recentResults.slice(-10);
  if (recent.length === 0) return 0;
  return recent.filter(r => r).length / recent.length;
}

/**
 * Adjust difficulty based on recent performance
 */
function adjustDifficulty(): void {
  const recentAccuracy = adaptiveState.recentResults.slice(-10);
  if (recentAccuracy.length < 5) return; // Need at least 5 answers
  
  const accuracy = recentAccuracy.filter(r => r).length / recentAccuracy.length;
  
  if (accuracy >= EASY_THRESHOLD && adaptiveState.currentDifficulty !== 'hard') {
    adaptiveState.currentDifficulty = 
      adaptiveState.currentDifficulty === 'easy' ? 'medium' : 'hard';
  } else if (accuracy <= HARD_THRESHOLD && adaptiveState.currentDifficulty !== 'easy') {
    adaptiveState.currentDifficulty = 
      adaptiveState.currentDifficulty === 'hard' ? 'medium' : 'easy';
  }
}

/**
 * Get questions due for review (spaced repetition)
 */
export function getQuestionsDueForReview(): string[] {
  const now = new Date();
  const dueQuestions: string[] = [];
  
  adaptiveState.questionHistory.forEach((history, questionId) => {
    if (history.nextReviewDate <= now && !history.lastResult) {
      dueQuestions.push(questionId);
    }
  });
  
  return dueQuestions;
}

/**
 * Get weak sections ordered by priority
 */
export function getWeakSections(): CPASectionId[] {
  // Get user's active sections (core + chosen discipline)
  const activeSections = getActiveSections();
  
  const sections = Object.values(adaptiveState.sectionPerformance)
    .filter(s => activeSections.includes(s.section))
    .filter(s => s.needsWork || s.accuracy < 0.70)
    .sort((a, b) => a.accuracy - b.accuracy) // Lowest accuracy first
    .map(s => s.section);
  
  return sections;
}

/**
 * Get user's active sections (Core + chosen discipline)
 */
export function getActiveSections(): CPASectionId[] {
  const active = [...CPA_CORE_SECTIONS];
  if (adaptiveState.chosenDiscipline) {
    active.push(adaptiveState.chosenDiscipline);
  }
  return active;
}

/**
 * Get weak blueprint areas across active sections
 */
export function getWeakBlueprintAreas(): string[] {
  const weakAreas: { area: string; score: number }[] = [];
  const activeSections = getActiveSections();
  
  activeSections.forEach(section => {
    const sectionPerf = adaptiveState.sectionPerformance[section];
    Object.entries(sectionPerf.blueprintAreaPerformance).forEach(([area, perf]) => {
      if (perf.accuracy < 0.70 && perf.questionsAttempted > 5) {
        const weight = ALL_BLUEPRINT_WEIGHTS[area] || 10;
        weakAreas.push({
          area,
          score: weight * (1 - perf.accuracy), // Higher score = higher priority
        });
      }
    });
  });
  
  return weakAreas
    .sort((a, b) => b.score - a.score)
    .map(d => d.area);
}

/**
 * Select questions based on criteria
 */
export function selectQuestions(
  allQuestions: CPAAdaptiveQuestion[],
  criteria: SelectionCriteria
): SelectedQuestion[] {
  const selected: SelectedQuestion[] = [];
  const usedIds = new Set<string>();
  
  // Filter by sections if specified
  let availableQuestions = criteria.sections 
    ? allQuestions.filter(q => criteria.sections!.includes(q.section))
    : allQuestions;
  
  // Filter by blueprint areas if specified
  if (criteria.blueprintAreas && criteria.blueprintAreas.length > 0) {
    availableQuestions = availableQuestions.filter(
      q => q.blueprintArea && criteria.blueprintAreas!.includes(q.blueprintArea)
    );
  }
  
  // Exclude recent questions
  if (criteria.excludeRecent) {
    availableQuestions = availableQuestions.filter(
      q => !adaptiveState.lastSessionQuestions.includes(q.id)
    );
  }
  
  // 1. First, add questions due for review (spaced repetition)
  if (criteria.includeReviewDue) {
    const dueIds = new Set(getQuestionsDueForReview());
    const dueQuestions = availableQuestions
      .filter(q => dueIds.has(q.id))
      .slice(0, Math.ceil(criteria.count * 0.2)); // Max 20% review questions
    
    dueQuestions.forEach(q => {
      if (!usedIds.has(q.id)) {
        selected.push({
          ...q,
          selectionReason: 'review-due',
          priority: 100,
        });
        usedIds.add(q.id);
      }
    });
  }
  
  // 2. Add weak blueprint area questions
  if (criteria.prioritizeWeakAreas) {
    const weakAreas = getWeakBlueprintAreas();
    weakAreas.forEach(area => {
      if (selected.length >= criteria.count) return;
      
      const areaQuestions = availableQuestions
        .filter(q => q.blueprintArea === area && !usedIds.has(q.id))
        .slice(0, 2); // Max 2 per weak area
      
      areaQuestions.forEach(q => {
        if (selected.length < criteria.count && !usedIds.has(q.id)) {
          selected.push({
            ...q,
            selectionReason: 'weak-area',
            priority: 90,
          });
          usedIds.add(q.id);
        }
      });
    });
  }
  
  // 3. Fill remaining with difficulty-matched or balanced questions
  const remaining = criteria.count - selected.length;
  if (remaining > 0) {
    const targetDifficulty = criteria.difficulty === 'adaptive' 
      ? adaptiveState.currentDifficulty 
      : (criteria.difficulty || 'medium');
    
    // Filter by difficulty
    let difficultyFiltered = availableQuestions.filter(
      q => !usedIds.has(q.id) && q.difficulty === targetDifficulty
    );
    
    // If not enough, include adjacent difficulties
    if (difficultyFiltered.length < remaining) {
      difficultyFiltered = availableQuestions.filter(q => !usedIds.has(q.id));
    }
    
    // If exam weighted, distribute by section weights
    if (criteria.examWeighted) {
      const activeSections = getActiveSections();
      const targetPerSection = Math.ceil(remaining / activeSections.length);
      
      activeSections.forEach(section => {
        const sectionQuestions = difficultyFiltered
          .filter(q => q.section === section && !usedIds.has(q.id))
          .slice(0, targetPerSection);
        
        sectionQuestions.forEach(q => {
          if (selected.length < criteria.count) {
            selected.push({
              ...q,
              selectionReason: 'balanced',
              priority: 50,
            });
            usedIds.add(q.id);
          }
        });
      });
    }
    
    // Fill any remaining slots
    const stillRemaining = criteria.count - selected.length;
    if (stillRemaining > 0) {
      const fillQuestions = difficultyFiltered
        .filter(q => !usedIds.has(q.id))
        .slice(0, stillRemaining);
      
      fillQuestions.forEach(q => {
        selected.push({
          ...q,
          selectionReason: 'difficulty-match',
          priority: 30,
        });
        usedIds.add(q.id);
      });
    }
  }
  
  // Sort by priority (highest first)
  selected.sort((a, b) => b.priority - a.priority);
  
  return selected;
}

/**
 * Get performance summary for dashboard
 */
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
  const activeSections = getActiveSections();
  
  const sectionBreakdown = Object.values(adaptiveState.sectionPerformance)
    .filter(s => activeSections.includes(s.section))
    .map(s => ({
      section: s.section,
      accuracy: Math.round(s.accuracy * 100),
      questionsAttempted: s.questionsAttempted,
    }));
  
  const totalQuestions = adaptiveState.totalQuestionsAnswered;
  const overallAccuracy = calculateRecentAccuracy() * 100;
  
  // Readiness score for CPA: must consider all 4 sections (3 core + 1 discipline)
  // Target is ~500 questions per section = 2000 total
  const coverageScore = Math.min(100, (totalQuestions / 2000) * 100);
  const accuracyScore = overallAccuracy;
  const readinessScore = Math.round((accuracyScore * 0.6) + (coverageScore * 0.4));
  
  const weakSections = getWeakSections();
  const strongSections = Object.values(adaptiveState.sectionPerformance)
    .filter(s => activeSections.includes(s.section))
    .filter(s => s.accuracy >= 0.80 && s.questionsAttempted >= 50)
    .map(s => s.section);
  
  return {
    totalQuestions,
    overallAccuracy: Math.round(overallAccuracy),
    currentDifficulty: adaptiveState.currentDifficulty,
    readinessScore,
    sectionBreakdown,
    weakSections,
    strongSections,
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
    const perf = sectionPerf.blueprintAreaPerformance[area] || { accuracy: 0, questionsAttempted: 0 };
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

/**
 * Start a new practice session
 */
export function startSession(): void {
  adaptiveState.sessionStartTime = new Date();
  saveAdaptiveState(adaptiveState);
}

/**
 * End practice session and get summary
 */
export function endSession(): { 
  duration: number; 
  questionsAnswered: number; 
  accuracy: number 
} {
  const now = new Date();
  const duration = adaptiveState.sessionStartTime 
    ? Math.round((now.getTime() - adaptiveState.sessionStartTime.getTime()) / 60000)
    : 0;
  
  const questionsAnswered = adaptiveState.lastSessionQuestions.length;
  const accuracy = calculateRecentAccuracy() * 100;
  
  adaptiveState.sessionStartTime = null;
  saveAdaptiveState(adaptiveState);
  
  return { duration, questionsAnswered, accuracy: Math.round(accuracy) };
}

/**
 * Export blueprint weights for external use
 */
export { SECTION_BLUEPRINT_WEIGHTS, ALL_BLUEPRINT_WEIGHTS };

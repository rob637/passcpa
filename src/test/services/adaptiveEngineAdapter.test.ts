/**
 * Adaptive Engine Adapter - Tests
 *
 * Verifies the unified adapter correctly routes to per-course engines
 * for both recordAnswer and selectQuestions operations.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock all 6 adaptive engines
vi.mock('../../services/cpaAdaptiveEngine', () => ({
  recordAnswer: vi.fn(),
  selectQuestions: vi.fn().mockReturnValue([
    { id: 'q1', section: 'FAR', question: 'Test?', options: ['A', 'B', 'C', 'D'], correctAnswer: 0, selectionReason: 'weak-area', priority: 80 },
  ]),
}));

vi.mock('../../services/eaAdaptiveEngine', () => ({
  recordAnswer: vi.fn(),
  selectQuestions: vi.fn().mockReturnValue([
    { id: 'q2', part: 'SEE1', question: 'Test?', options: ['A', 'B', 'C', 'D'], correctAnswer: 0, selectionReason: 'review-due', priority: 100 },
  ]),
}));

vi.mock('../../services/cmaAdaptiveEngine', () => ({
  recordAnswer: vi.fn(),
  selectQuestions: vi.fn().mockReturnValue([
    { id: 'q3', part: 'CMA1', question: 'Test?', options: ['A', 'B', 'C', 'D'], correctAnswer: 0, selectionReason: 'balanced', priority: 50 },
  ]),
}));

vi.mock('../../services/ciaAdaptiveEngine', () => ({
  recordAnswerToCore: vi.fn(),
  getCoreState: vi.fn().mockReturnValue({
    totalQuestionsAnswered: 0,
    currentDifficulty: 'medium',
    questionHistory: {},
    sectionPerformance: {},
    recentResults: [],
    lastSessionQuestions: [],
  }),
  getCIAEngineConfig: vi.fn().mockReturnValue({
    storageKey: 'cia-adaptive-state',
    sections: ['CIA1', 'CIA2', 'CIA3'],
    sectionWeights: { CIA1: 35, CIA2: 30, CIA3: 35 },
    readinessTargetQuestions: 1000,
    weaknessThreshold: 0.7,
    recentWindowSize: 20,
  }),
}));

vi.mock('../../services/cisaAdaptiveEngine', () => ({
  recordAnswer: vi.fn(),
  selectQuestions: vi.fn().mockReturnValue([
    { id: 'q5', domain: 'CISA1', question: 'Test?', options: ['A', 'B', 'C', 'D'], correctAnswer: 0, selectionReason: 'weak-area', priority: 80 },
  ]),
}));

vi.mock('../../services/cfpAdaptiveEngine', () => ({
  recordResult: vi.fn().mockReturnValue({}),
  loadAdaptiveState: vi.fn().mockReturnValue({
    totalQuestionsAnswered: 0,
    currentDifficulty: 'medium',
    questionHistory: {},
    sectionPerformance: {},
    recentResults: [],
    lastSessionQuestions: [],
  }),
  selectQuestions: vi.fn().mockReturnValue([
    { id: 'q6', domain: 'CFP-1', question: 'Test?', options: ['A', 'B', 'C', 'D'], correctAnswer: 0, selectionReason: 'balanced', priority: 50 },
  ]),
}));

vi.mock('../../services/adaptiveEngineCore', () => ({
  selectQuestionsCore: vi.fn().mockReturnValue([
    { id: 'q4', section: 'CIA1', question: 'Test?', options: ['A', 'B', 'C', 'D'], correctAnswer: 0, selectionReason: 'balanced', priority: 50 },
  ]),
}));

import { recordAnswerToEngine, selectQuestionsFromEngine } from '../../services/adaptiveEngineAdapter';
import type { Question } from '../../types';

const makeQuestion = (id: string, section: string): Question => ({
  id,
  section: section as Question['section'],
  topic: 'Test Topic',
  difficulty: 'medium' as const,
  question: 'What is the answer?',
  options: ['A', 'B', 'C', 'D'],
  correctAnswer: 0,
  explanation: 'Because A.',
});

describe('Adaptive Engine Adapter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('recordAnswerToEngine', () => {
    // Helper: trim trailing `undefined` values that Istanbul coverage can inject
    const trimArgs = (args: unknown[]) => {
      let end = args.length;
      while (end > 0 && args[end - 1] === undefined) end--;
      return args.slice(0, end);
    };

    it('routes to CPA engine', async () => {
      const { recordAnswer } = await import('../../services/cpaAdaptiveEngine');
      await recordAnswerToEngine('cpa', 'far-001', 'FAR', true, { blueprintArea: 'FAR-I' });
      expect(recordAnswer).toHaveBeenCalledOnce();
      expect(trimArgs((recordAnswer as ReturnType<typeof vi.fn>).mock.calls[0])).toEqual(['far-001', 'FAR', 'FAR-I', true, []]);
    });

    it('routes to EA engine', async () => {
      const { recordAnswer } = await import('../../services/eaAdaptiveEngine');
      await recordAnswerToEngine('ea', 'see1-001', 'SEE1', false, { blueprintArea: 'SEE1-A' });
      expect(recordAnswer).toHaveBeenCalledOnce();
      expect(trimArgs((recordAnswer as ReturnType<typeof vi.fn>).mock.calls[0])).toEqual(['see1-001', 'SEE1', 'SEE1-A', false, []]);
    });

    it('routes to CMA engine', async () => {
      const { recordAnswer } = await import('../../services/cmaAdaptiveEngine');
      await recordAnswerToEngine('cma', 'cma1-001', 'CMA1', true, { timeSpentSeconds: 30 });
      expect(recordAnswer).toHaveBeenCalledOnce();
      expect(trimArgs((recordAnswer as ReturnType<typeof vi.fn>).mock.calls[0])).toEqual(['cma1-001', true, 'CMA1', undefined, 30]);
    });

    it('routes to CIA engine via recordAnswerToCore', async () => {
      const { recordAnswerToCore } = await import('../../services/ciaAdaptiveEngine');
      await recordAnswerToEngine('cia', 'cia1-001', 'CIA1', true);
      expect(recordAnswerToCore).toHaveBeenCalledOnce();
      expect(trimArgs((recordAnswerToCore as ReturnType<typeof vi.fn>).mock.calls[0])).toEqual(['cia1-001', 'CIA1', true]);
    });

    it('routes to CISA engine', async () => {
      const { recordAnswer } = await import('../../services/cisaAdaptiveEngine');
      await recordAnswerToEngine('cisa', 'cisa1-001', 'CISA1', false, { difficulty: 'hard', blueprintArea: 'CISA1-A' });
      expect(recordAnswer).toHaveBeenCalledOnce();
      expect(trimArgs((recordAnswer as ReturnType<typeof vi.fn>).mock.calls[0])).toEqual(['cisa1-001', 'CISA1', false, 'hard', [], 'CISA1-A']);
    });

    it('routes to CFP engine', async () => {
      const { recordResult, loadAdaptiveState } = await import('../../services/cfpAdaptiveEngine');
      await recordAnswerToEngine('cfp', 'cfp-001', 'CFP-1', true);
      expect(loadAdaptiveState).toHaveBeenCalled();
      expect(recordResult).toHaveBeenCalled();
    });

    it('does not throw on error', async () => {
      const { recordAnswer } = await import('../../services/cpaAdaptiveEngine');
      (recordAnswer as ReturnType<typeof vi.fn>).mockImplementation(() => { throw new Error('boom'); });
      // Should not throw
      await expect(recordAnswerToEngine('cpa', 'x', 'FAR', true)).resolves.toBeUndefined();
    });

    it('handles unknown courseId gracefully', async () => {
      await expect(recordAnswerToEngine('xxx' as any, 'x', 'X', true)).resolves.toBeUndefined();
    });
  });

  describe('selectQuestionsFromEngine', () => {
    const testQuestions = [
      makeQuestion('q1', 'FAR'),
      makeQuestion('q2', 'FAR'),
      makeQuestion('q3', 'FAR'),
    ];

    it('selects questions via CPA engine', async () => {
      const result = await selectQuestionsFromEngine('cpa', testQuestions, { section: 'FAR', count: 2 });
      expect(result.length).toBeGreaterThan(0);
    });

    it('selects questions via EA engine', async () => {
      const result = await selectQuestionsFromEngine('ea', testQuestions, { section: 'SEE1', count: 2 });
      expect(result.length).toBeGreaterThan(0);
    });

    it('selects questions via CMA engine', async () => {
      const result = await selectQuestionsFromEngine('cma', testQuestions, { section: 'CMA1', count: 2 });
      expect(result.length).toBeGreaterThan(0);
    });

    it('selects questions via CIA engine (uses core)', async () => {
      const result = await selectQuestionsFromEngine('cia', testQuestions, { section: 'CIA1', count: 2 });
      expect(result.length).toBeGreaterThan(0);
    });

    it('selects questions via CISA engine', async () => {
      const result = await selectQuestionsFromEngine('cisa', testQuestions, { section: 'CISA1', count: 2 });
      expect(result.length).toBeGreaterThan(0);
    });

    it('selects questions via CFP engine', async () => {
      const result = await selectQuestionsFromEngine('cfp', testQuestions, { section: 'CFP-1', count: 2 });
      expect(result.length).toBeGreaterThan(0);
    });

    it('returns empty array for unknown courseId', async () => {
      const result = await selectQuestionsFromEngine('xxx' as any, testQuestions, { count: 2 });
      expect(result).toEqual([]);
    });

    it('returns empty array on error', async () => {
      const engine = await import('../../services/cpaAdaptiveEngine');
      vi.mocked(engine.selectQuestions).mockImplementationOnce(() => { throw new Error('boom'); });
      const result = await selectQuestionsFromEngine('cpa', testQuestions, { count: 2 });
      expect(result).toEqual([]);
    });

    it('uses default options when none provided', async () => {
      const result = await selectQuestionsFromEngine('cpa', testQuestions);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});

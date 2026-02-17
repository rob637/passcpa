/**
 * Phase 2 Feature Tests — Response-Time Weighting, 5-Level Difficulty, Knowledge Decay
 *
 * Tests the three Phase 2 enhancements to the adaptive engine core:
 *   #5 — Response-time weighting: quality-based SM-2 when time data is available
 *   #6 — 5-level difficulty: numeric difficultyScore (0–1) with smooth adjustment
 *   #7 — Knowledge decay: retrievability-based review, stability tracking
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

import {
  createQuestionHistory,
  updateQuestionHistory,
  calculateSM2WithQuality,
  recordAnswerCore,
  initializeState,
  adjustDifficultyScore,
  difficultyScoreToLevel,
  difficultyLevelToScore,
  calculateRetrievability,
  getQuestionsDueForReview,
  selectQuestionsCore,
  createEngineConfig,
  serializeState,
  deserializeState,
  type EngineConfig,
  type QuestionHistoryEntry,
} from '../../services/adaptiveEngineCore';

function testConfig(overrides: Partial<EngineConfig> = {}): EngineConfig {
  return createEngineConfig({
    storageKey: 'phase2-test-state',
    sections: ['SEC1', 'SEC2', 'SEC3'],
    sectionWeights: { SEC1: 40, SEC2: 35, SEC3: 25 },
    ...overrides,
  });
}

describe('Phase 2 Features', () => {
  let config: EngineConfig;

  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
    config = testConfig();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ========================================================================
  // #5 — Response-Time Weighting
  // ========================================================================
  describe('#5: Response-Time Weighting', () => {
    describe('createQuestionHistory — new fields', () => {
      it('initializes response time fields to 0', () => {
        const h = createQuestionHistory('q1', true);
        expect(h.lastResponseTimeMs).toBe(0);
        expect(h.averageResponseTimeMs).toBe(0);
      });

      it('initializes stability for correct answer', () => {
        const h = createQuestionHistory('q1', true);
        expect(h.stability).toBe(1.0);
        expect(h.lapses).toBe(0);
      });

      it('initializes lower stability for incorrect answer', () => {
        const h = createQuestionHistory('q1', false);
        expect(h.stability).toBe(0.4);
        expect(h.lapses).toBe(1);
      });
    });

    describe('recordAnswerCore with responseTimeMs', () => {
      it('uses quality-based SM-2 when response time is provided', () => {
        const state = initializeState(config);
        // First answer with time
        let s = recordAnswerCore(state, config, 'q1', 'SEC1', true, {
          responseTimeMs: 30000,
        });
        // Second answer with time — should use calculateSM2WithQuality
        s = recordAnswerCore(s, config, 'q1', 'SEC1', true, {
          responseTimeMs: 60000,
        });
        const entry = s.questionHistory.get('q1')!;
        expect(entry.attempts).toBe(2);
        expect(entry.lastResponseTimeMs).toBe(60000);
        expect(entry.averageResponseTimeMs).toBe(45000); // (30k + 60k) / 2
      });

      it('tracks average response time across attempts', () => {
        const state = initializeState(config);
        let s = recordAnswerCore(state, config, 'q1', 'SEC1', true, { responseTimeMs: 60000 });
        s = recordAnswerCore(s, config, 'q1', 'SEC1', true, { responseTimeMs: 120000 });
        const entry = s.questionHistory.get('q1')!;
        expect(entry.lastResponseTimeMs).toBe(120000);
        expect(entry.averageResponseTimeMs).toBe(90000); // (60k + 120k) / 2
      });

      it('gives faster response higher ease factor than slow response', () => {
        const state = initializeState(config);
        // Fast correct (quality 5)
        let fastState = recordAnswerCore(state, config, 'q-fast', 'SEC1', true, { responseTimeMs: 10000 });
        fastState = recordAnswerCore(fastState, config, 'q-fast', 'SEC1', true, { responseTimeMs: 10000 });
        // Slow correct (quality 3)
        let slowState = recordAnswerCore(state, config, 'q-slow', 'SEC1', true, { responseTimeMs: 200000 });
        slowState = recordAnswerCore(slowState, config, 'q-slow', 'SEC1', true, { responseTimeMs: 200000 });

        const fastEntry = fastState.questionHistory.get('q-fast')!;
        const slowEntry = slowState.questionHistory.get('q-slow')!;
        // Fast responses earn higher ease factors via quality 5 vs quality 3
        expect(fastEntry.easeFactor).toBeGreaterThan(slowEntry.easeFactor);
      });

      it('skips quality SM-2 when no response time provided', () => {
        const state = initializeState(config);
        let s = recordAnswerCore(state, config, 'q1', 'SEC1', true);
        s = recordAnswerCore(s, config, 'q1', 'SEC1', true);
        const entry = s.questionHistory.get('q1')!;
        // Binary SM-2: correct always gets +0.1 to ease factor
        expect(entry.lastResponseTimeMs).toBe(0);
        expect(entry.easeFactor).toBeCloseTo(2.6, 1); // 2.5 (creation) + 0.1 (one update)
      });
    });

    describe('config: targetTimePerQuestionMs', () => {
      it('defaults to 120000 (2 minutes)', () => {
        expect(config.targetTimePerQuestionMs).toBe(120_000);
      });

      it('can be overridden', () => {
        const fastConfig = testConfig({ targetTimePerQuestionMs: 60_000 });
        expect(fastConfig.targetTimePerQuestionMs).toBe(60_000);
      });
    });
  });

  // ========================================================================
  // #6 — 5-Level Difficulty
  // ========================================================================
  describe('#6: 5-Level Difficulty', () => {
    describe('adjustDifficultyScore', () => {
      it('returns current score when not enough data', () => {
        expect(adjustDifficultyScore([true, true], 0.5, config)).toBe(0.5);
      });

      it('increases score when accuracy is high', () => {
        const results = Array(10).fill(true); // 100% accuracy
        const newScore = adjustDifficultyScore(results, 0.5, config);
        expect(newScore).toBeGreaterThan(0.5);
      });

      it('decreases score when accuracy is low', () => {
        const results = Array(10).fill(false); // 0% accuracy
        const newScore = adjustDifficultyScore(results, 0.5, config);
        expect(newScore).toBeLessThan(0.5);
      });

      it('stays stable for mid-range accuracy', () => {
        // 70% accuracy — between thresholds (easyThreshold=0.85, hardThreshold=0.60)
        const results = [...Array(7).fill(true), ...Array(3).fill(false)];
        const newScore = adjustDifficultyScore(results, 0.5, config);
        // Should move toward 0.7 proportionally
        expect(newScore).toBeGreaterThan(0.5);
        expect(newScore).toBeLessThan(0.7);
      });

      it('moves smoothly (not abrupt jumps)', () => {
        const results = Array(10).fill(true); // high accuracy
        const score1 = adjustDifficultyScore(results, 0.5, config);
        const score2 = adjustDifficultyScore(results, score1, config);
        // Each step moves 20% closer to target, so step sizes decrease
        const step1 = score1 - 0.5;
        const step2 = score2 - score1;
        expect(step2).toBeLessThan(step1); // convergence
      });

      it('is clamped between 0 and 1', () => {
        const allCorrect = Array(10).fill(true);
        const allWrong = Array(10).fill(false);
        expect(adjustDifficultyScore(allCorrect, 1.0, config)).toBeLessThanOrEqual(1);
        expect(adjustDifficultyScore(allWrong, 0.0, config)).toBeGreaterThanOrEqual(0);
      });
    });

    describe('difficultyScoreToLevel', () => {
      it('maps low scores to easy', () => {
        expect(difficultyScoreToLevel(0.1)).toBe('easy');
        expect(difficultyScoreToLevel(0.32)).toBe('easy');
      });

      it('maps mid scores to medium', () => {
        expect(difficultyScoreToLevel(0.5)).toBe('medium');
        expect(difficultyScoreToLevel(0.33)).toBe('medium');
      });

      it('maps high scores to hard', () => {
        expect(difficultyScoreToLevel(0.8)).toBe('hard');
        expect(difficultyScoreToLevel(0.67)).toBe('hard');
      });
    });

    describe('difficultyLevelToScore', () => {
      it('maps easy/beginner/foundational to low score', () => {
        expect(difficultyLevelToScore('easy')).toBe(0.17);
        expect(difficultyLevelToScore('beginner')).toBe(0.17);
        expect(difficultyLevelToScore('foundational')).toBe(0.17);
      });

      it('maps medium/intermediate/moderate to mid score', () => {
        expect(difficultyLevelToScore('medium')).toBe(0.5);
        expect(difficultyLevelToScore('intermediate')).toBe(0.5);
        expect(difficultyLevelToScore('moderate')).toBe(0.5);
      });

      it('maps hard/advanced/tough to high score', () => {
        expect(difficultyLevelToScore('hard')).toBe(0.83);
        expect(difficultyLevelToScore('advanced')).toBe(0.83);
        expect(difficultyLevelToScore('tough')).toBe(0.83);
      });

      it('defaults to 0.5 for unknown values', () => {
        expect(difficultyLevelToScore('unknown')).toBe(0.5);
      });
    });

    describe('initializeState includes difficultyScore', () => {
      it('starts at 0.5 (medium)', () => {
        const state = initializeState(config);
        expect(state.difficultyScore).toBe(0.5);
      });
    });

    describe('recordAnswerCore updates difficultyScore', () => {
      it('increases difficultyScore after consecutive correct', () => {
        const state = initializeState(config);
        let s = state;
        for (let i = 0; i < 10; i++) {
          s = recordAnswerCore(s, config, `q${i}`, 'SEC1', true);
        }
        expect(s.difficultyScore).toBeGreaterThan(0.5);
        expect(s.currentDifficulty).not.toBe('easy');
      });

      it('decreases difficultyScore after consecutive incorrect', () => {
        const state = initializeState(config);
        let s = state;
        for (let i = 0; i < 10; i++) {
          s = recordAnswerCore(s, config, `q${i}`, 'SEC1', false);
        }
        expect(s.difficultyScore).toBeLessThan(0.5);
      });

      it('currentDifficulty stays in sync with difficultyScore', () => {
        const state = initializeState(config);
        let s = state;
        for (let i = 0; i < 15; i++) {
          s = recordAnswerCore(s, config, `q${i}`, 'SEC1', true);
        }
        const expectedLevel = difficultyScoreToLevel(s.difficultyScore);
        expect(s.currentDifficulty).toBe(expectedLevel);
      });
    });

    describe('selectQuestionsCore uses fuzzy difficulty', () => {
      const questions = [
        { id: 'q1', section: 'SEC1', difficulty: 'easy' as const, question: 'Q?', options: ['a','b','c','d'], correctAnswer: 0, explanation: 'x' },
        { id: 'q2', section: 'SEC1', difficulty: 'medium' as const, question: 'Q?', options: ['a','b','c','d'], correctAnswer: 0, explanation: 'x' },
        { id: 'q3', section: 'SEC1', difficulty: 'hard' as const, question: 'Q?', options: ['a','b','c','d'], correctAnswer: 0, explanation: 'x' },
      ];

      it('prefers easy questions when difficultyScore is low', () => {
        const state = { ...initializeState(config), difficultyScore: 0.15 };
        const selected = selectQuestionsCore(
          questions, state, config,
          { count: 1, difficulty: 'adaptive' },
          q => q.section,
        );
        expect(selected.length).toBe(1);
        expect(selected[0].difficulty).toBe('easy'); // closest to 0.15
      });

      it('prefers hard questions when difficultyScore is high', () => {
        const state = { ...initializeState(config), difficultyScore: 0.9 };
        const selected = selectQuestionsCore(
          questions, state, config,
          { count: 1, difficulty: 'adaptive' },
          q => q.section,
        );
        expect(selected.length).toBe(1);
        expect(selected[0].difficulty).toBe('hard'); // closest to 0.9
      });
    });
  });

  // ========================================================================
  // #7 — Knowledge Decay
  // ========================================================================
  describe('#7: Knowledge Decay', () => {
    describe('stability tracking', () => {
      it('increases stability on correct answer (updateQuestionHistory)', () => {
        const h = createQuestionHistory('q1', true);
        const updated = updateQuestionHistory(h, true);
        expect(updated.stability).toBeGreaterThan(h.stability);
      });

      it('decreases stability on incorrect answer', () => {
        const h = createQuestionHistory('q1', true);
        const updated = updateQuestionHistory(h, false);
        expect(updated.stability).toBeLessThan(h.stability);
      });

      it('tracks lapses on incorrect answer', () => {
        const h = createQuestionHistory('q1', true);
        expect(h.lapses).toBe(0);
        const once = updateQuestionHistory(h, false);
        expect(once.lapses).toBe(1);
        const twice = updateQuestionHistory(once, false);
        expect(twice.lapses).toBe(2);
      });

      it('stability never drops below 0.4', () => {
        let h = createQuestionHistory('q1', false);
        for (let i = 0; i < 50; i++) {
          h = updateQuestionHistory(h, false);
        }
        expect(h.stability).toBeGreaterThanOrEqual(0.4);
      });

      it('stability caps at 365 days', () => {
        let h = createQuestionHistory('q1', true);
        for (let i = 0; i < 100; i++) {
          h = updateQuestionHistory(h, true);
        }
        expect(h.stability).toBeLessThanOrEqual(365);
      });

      it('stability grows with calculateSM2WithQuality too', () => {
        const h = createQuestionHistory('q1', true);
        const updated = calculateSM2WithQuality(h, 5);
        expect(updated.stability).toBeGreaterThan(h.stability);
      });
    });

    describe('calculateRetrievability', () => {
      it('returns ~1.0 for just-reviewed items', () => {
        const h = createQuestionHistory('q1', true);
        h.lastAttempted = new Date(); // just now
        const r = calculateRetrievability(h);
        expect(r).toBeCloseTo(1.0, 1);
      });

      it('decays over time', () => {
        const h = createQuestionHistory('q1', true);
        h.stability = 2; // 2-day half-life
        h.lastAttempted = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // 2 days ago
        const r = calculateRetrievability(h);
        // e^(-2/2) = e^(-1) ≈ 0.368
        expect(r).toBeCloseTo(0.368, 2);
      });

      it('higher stability means slower decay', () => {
        const lowStab = createQuestionHistory('q1', true);
        lowStab.stability = 1;
        lowStab.lastAttempted = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000); // 3 days ago

        const highStab = createQuestionHistory('q2', true);
        highStab.stability = 10;
        highStab.lastAttempted = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000); // 3 days ago

        expect(calculateRetrievability(highStab)).toBeGreaterThan(calculateRetrievability(lowStab));
      });
    });

    describe('getQuestionsDueForReview — fixed', () => {
      it('returns items where retrievability dropped below threshold', () => {
        const h = createQuestionHistory('q1', true);
        h.stability = 1; // fast decay
        h.lastAttempted = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000); // 5 days ago
        const history = new Map<string, QuestionHistoryEntry>();
        history.set('q1', h);

        const due = getQuestionsDueForReview(history, 0.85);
        expect(due).toContain('q1');
      });

      it('does NOT exclude correctly-answered questions (bug fix)', () => {
        // This was the critical bug: !history.lastResult excluded correct answers forever
        const h = createQuestionHistory('q1', true); // correct answer
        h.stability = 0.5; // very low stability
        h.lastAttempted = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000); // 3 days ago
        const history = new Map<string, QuestionHistoryEntry>();
        history.set('q1', h);

        const due = getQuestionsDueForReview(history, 0.85);
        expect(due).toContain('q1'); // correctly-answered but decayed → should appear
      });

      it('does not return fresh items with high retrievability', () => {
        const h = createQuestionHistory('q1', true);
        h.stability = 100; // very stable
        h.lastAttempted = new Date(); // just reviewed
        const history = new Map<string, QuestionHistoryEntry>();
        history.set('q1', h);

        const due = getQuestionsDueForReview(history, 0.85);
        expect(due).not.toContain('q1');
      });

      it('sorts by urgency (lowest retrievability first)', () => {
        const history = new Map<string, QuestionHistoryEntry>();

        const recentish = createQuestionHistory('q-recent', true);
        recentish.stability = 1;
        recentish.lastAttempted = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000); // 1 day ago

        const old = createQuestionHistory('q-old', true);
        old.stability = 1;
        old.lastAttempted = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000); // 10 days ago

        history.set('q-recent', recentish);
        history.set('q-old', old);

        const due = getQuestionsDueForReview(history, 0.95);
        // q-old has lower retrievability → should come first
        if (due.length >= 2) {
          expect(due[0]).toBe('q-old');
        }
      });
    });

    describe('selectQuestionsCore — urgency-weighted review', () => {
      it('gives higher priority to more-forgotten review-due questions', () => {
        const questions = [
          { id: 'q1', section: 'SEC1', difficulty: 'medium' as const, question: 'Q?', options: ['a','b','c','d'], correctAnswer: 0, explanation: 'x' },
          { id: 'q2', section: 'SEC1', difficulty: 'medium' as const, question: 'Q?', options: ['a','b','c','d'], correctAnswer: 0, explanation: 'x' },
        ];

        const state = initializeState(config);
        // Manually set up question history with different retrievabilities
        const recentEntry = createQuestionHistory('q1', false);
        recentEntry.stability = 1;
        recentEntry.lastAttempted = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);

        const oldEntry = createQuestionHistory('q2', false);
        oldEntry.stability = 1;
        oldEntry.lastAttempted = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);

        state.questionHistory.set('q1', recentEntry);
        state.questionHistory.set('q2', oldEntry);

        const selected = selectQuestionsCore(
          questions, state, config,
          { count: 2, includeReviewDue: true, difficulty: 'adaptive' },
          q => q.section,
        );

        // q2 should have higher priority (more forgotten)
        const q1Priority = selected.find(s => s.id === 'q1')?.priority ?? 0;
        const q2Priority = selected.find(s => s.id === 'q2')?.priority ?? 0;
        expect(q2Priority).toBeGreaterThan(q1Priority);
      });
    });

    describe('serialization migration', () => {
      it('backfills new fields on deserialize', () => {
        // Simulate an old-format state without Phase 2 fields
        const oldState = initializeState(config);
        const h = createQuestionHistory('q1', true);
        // Strip new fields to simulate legacy data
        const legacyEntry = {
          questionId: h.questionId,
          attempts: h.attempts,
          correctCount: h.correctCount,
          lastAttempted: h.lastAttempted,
          lastResult: h.lastResult,
          easeFactor: h.easeFactor,
          interval: h.interval,
          nextReviewDate: h.nextReviewDate,
        };
        oldState.questionHistory.set('q1', legacyEntry as QuestionHistoryEntry);

        const json = serializeState(oldState);
        // Remove difficultyScore from serialized to simulate legacy
        const parsed = JSON.parse(json);
        delete parsed.difficultyScore;
        // Strip new fields from question history entries
        const historyArr = parsed.questionHistory as [string, any][];
        historyArr.forEach(([, entry]) => {
          delete entry.stability;
          delete entry.lapses;
          delete entry.lastResponseTimeMs;
          delete entry.averageResponseTimeMs;
        });

        const restored = deserializeState(JSON.stringify(parsed), config);

        // Verify backfill
        expect(restored.difficultyScore).toBe(0.5); // medium → 0.5
        const entry = restored.questionHistory.get('q1')!;
        expect(entry.stability).toBe(1.0); // lastResult was true
        expect(entry.lapses).toBe(0);
        expect(entry.lastResponseTimeMs).toBe(0);
        expect(entry.averageResponseTimeMs).toBe(0);
      });
    });

    describe('config: retrievabilityThreshold', () => {
      it('defaults to 0.85', () => {
        expect(config.retrievabilityThreshold).toBe(0.85);
      });

      it('can be overridden', () => {
        const strictConfig = testConfig({ retrievabilityThreshold: 0.90 });
        expect(strictConfig.retrievabilityThreshold).toBe(0.90);
      });
    });
  });
});

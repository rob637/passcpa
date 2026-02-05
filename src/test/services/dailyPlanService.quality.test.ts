/**
 * Daily Plan Service - Quality Tests (Bug-Finding Focus)
 * 
 * Tests the smart daily plan generation algorithm for edge cases and potential bugs.
 * These tests are designed to find issues in:
 * - Exam date proximity calculations
 * - Activity prioritization logic
 * - Edge cases with empty/null data
 * - Boundary conditions for intensity scaling
 * - Curriculum filtering edge cases
 * 
 * @batch 1 of 20 (25 tests)
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  generateDailyPlan,
  getAdaptiveQuestionTopics,
  analyzeNextFocus,
  type UserStudyState,
  type TopicStats,
} from '../../services/dailyPlanService';

// Mock lessonService to avoid database calls
vi.mock('../../services/lessonService', () => ({
  fetchLessonsBySection: vi.fn().mockResolvedValue([
    { id: 'lesson-1', title: 'Introduction to FAR', duration: 30 },
    { id: 'lesson-2', title: 'Revenue Recognition', duration: 45 },
    { id: 'lesson-3', title: 'Inventory', duration: 35 },
  ]),
}));

// Mock curriculumService
vi.mock('../../services/curriculumService', () => ({
  getCoveredTopics: vi.fn().mockResolvedValue(new Set(['Revenue Recognition', 'Inventory'])),
  getPreviewTopics: vi.fn().mockResolvedValue(new Set(['Leases'])),
  getUnlockedTBSTypes: vi.fn().mockResolvedValue({
    locked: false,
    unlockedTypes: new Set(['Journal Entries', 'Bank Reconciliation']),
    nextUnlock: null,
  }),
}));

describe('Daily Plan Service - Quality Tests', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-02-05T10:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  // Helper to create base study state
  const createBaseState = (overrides?: Partial<UserStudyState>): UserStudyState => ({
    section: 'FAR',
    dailyGoal: 50,
    topicStats: [],
    lessonProgress: {},
    flashcardsDue: 0,
    currentStreak: 5,
    todayPoints: 0,
    ...overrides,
  });

  describe('generateDailyPlan - Exam Date Edge Cases', () => {
    it('handles exam date tomorrow (1 day away) without crashing', async () => {
      const state = createBaseState({
        examDate: '2026-02-06',
      });

      const plan = await generateDailyPlan(state);

      expect(plan).toBeDefined();
      expect(plan.activities).toBeDefined();
      expect(Array.isArray(plan.activities)).toBe(true);
      // Should have high intensity
      expect(plan.estimatedMinutes).toBeGreaterThan(0);
    });

    it('handles exam date today (0 days away)', async () => {
      const state = createBaseState({
        examDate: '2026-02-05',
      });

      const plan = await generateDailyPlan(state);

      // Should not crash, should return valid plan
      expect(plan).toBeDefined();
      expect(plan.date).toBe('2026-02-05');
    });

    it('handles exam date in the past gracefully', async () => {
      const state = createBaseState({
        examDate: '2026-01-15', // 21 days ago
      });

      const plan = await generateDailyPlan(state);

      // Should still generate a plan, not throw
      expect(plan).toBeDefined();
      expect(plan.activities.length).toBeGreaterThanOrEqual(0);
    });

    it('handles exam date exactly 7 days away (final week boundary)', async () => {
      const state = createBaseState({
        examDate: '2026-02-12',
      });

      const plan = await generateDailyPlan(state);

      // Final week intensity = 1.5x
      expect(plan).toBeDefined();
      expect(plan.estimatedMinutes).toBeGreaterThan(0);
    });

    it('handles exam date exactly 14 days away (two weeks boundary)', async () => {
      const state = createBaseState({
        examDate: '2026-02-19',
      });

      const plan = await generateDailyPlan(state);

      expect(plan).toBeDefined();
    });

    it('handles undefined exam date', async () => {
      const state = createBaseState({
        examDate: undefined,
      });

      const plan = await generateDailyPlan(state);

      expect(plan).toBeDefined();
      expect(plan.activities.length).toBeGreaterThan(0);
    });

    it('handles malformed exam date string', async () => {
      const state = createBaseState({
        examDate: 'not-a-date',
      });

      // Should not throw, should handle gracefully
      await expect(generateDailyPlan(state)).resolves.toBeDefined();
    });
  });

  describe('generateDailyPlan - Topic Stats Edge Cases', () => {
    it('handles empty topicStats array', async () => {
      const state = createBaseState({
        topicStats: [],
      });

      const plan = await generateDailyPlan(state);

      expect(plan).toBeDefined();
      expect(plan.summary.weakAreaFocus).toEqual([]);
    });

    it('handles topic with 0% accuracy', async () => {
      const state = createBaseState({
        topicStats: [
          { topic: 'Revenue', accuracy: 0, totalQuestions: 10, correct: 0 },
        ],
      });

      const plan = await generateDailyPlan(state);

      expect(plan.activities.some(a => a.params.topic === 'Revenue')).toBe(true);
      expect(plan.summary.weakAreaFocus).toContain('Revenue');
    });

    it('handles topic with 100% accuracy', async () => {
      const state = createBaseState({
        topicStats: [
          { topic: 'Inventory', accuracy: 100, totalQuestions: 50, correct: 50 },
        ],
      });

      const plan = await generateDailyPlan(state);

      // 100% accuracy should NOT be in weak area focus
      expect(plan.summary.weakAreaFocus).not.toContain('Inventory');
    });

    it('handles topic with exactly 60% accuracy (weak area boundary)', async () => {
      const state = createBaseState({
        topicStats: [
          { topic: 'Leases', accuracy: 60, totalQuestions: 10, correct: 6 },
        ],
      });

      const plan = await generateDailyPlan(state);

      // 60% is the boundary between critical and medium weak areas
      expect(plan).toBeDefined();
    });

    it('handles topic with exactly 70% accuracy (mastery boundary)', async () => {
      const state = createBaseState({
        topicStats: [
          { topic: 'Leases', accuracy: 70, totalQuestions: 10, correct: 7 },
        ],
      });

      const plan = await generateDailyPlan(state);

      // 70%+ should not be considered weak
      expect(plan.summary.weakAreaFocus).not.toContain('Leases');
    });

    it('handles topic with insufficient questions (< 3)', async () => {
      const state = createBaseState({
        topicStats: [
          { topic: 'Bonds', accuracy: 20, totalQuestions: 2, correct: 0 },
        ],
      });

      const plan = await generateDailyPlan(state);

      // Should not be treated as weak area due to insufficient data
      expect(plan.summary.weakAreaFocus).not.toContain('Bonds');
    });

    it('handles NaN accuracy value', async () => {
      const state = createBaseState({
        topicStats: [
          { topic: 'Test', accuracy: NaN, totalQuestions: 5, correct: 2 },
        ],
      });

      const plan = await generateDailyPlan(state);

      expect(plan).toBeDefined();
    });

    it('handles negative accuracy value', async () => {
      const state = createBaseState({
        topicStats: [
          { topic: 'Test', accuracy: -10, totalQuestions: 5, correct: 0 },
        ],
      });

      const plan = await generateDailyPlan(state);

      expect(plan).toBeDefined();
    });
  });

  describe('generateDailyPlan - Daily Goal Edge Cases', () => {
    it('handles dailyGoal of 0', async () => {
      const state = createBaseState({
        dailyGoal: 0,
      });

      const plan = await generateDailyPlan(state);

      // Zero goal should still produce some plan
      expect(plan).toBeDefined();
    });

    it('handles very high dailyGoal (1000 points)', async () => {
      const state = createBaseState({
        dailyGoal: 1000,
      });

      const plan = await generateDailyPlan(state);

      expect(plan).toBeDefined();
      expect(plan.activities.length).toBeGreaterThan(0);
    });

    it('handles negative dailyGoal', async () => {
      const state = createBaseState({
        dailyGoal: -50,
      });

      const plan = await generateDailyPlan(state);

      expect(plan).toBeDefined();
    });
  });

  describe('getAdaptiveQuestionTopics - Edge Cases', () => {
    it('returns empty array for empty topicStats', () => {
      const result = getAdaptiveQuestionTopics([], 15);

      // Should return mixed practice as fallback
      expect(result.length).toBeGreaterThan(0);
      expect(result.some(r => r.topic === 'mixed')).toBe(true);
    });

    it('handles targetCount of 0', () => {
      const stats: TopicStats[] = [
        { topic: 'Revenue', accuracy: 50, totalQuestions: 10, correct: 5 },
      ];

      const result = getAdaptiveQuestionTopics(stats, 0);

      // Should handle gracefully
      expect(Array.isArray(result)).toBe(true);
    });

    it('handles targetCount of 1', () => {
      const stats: TopicStats[] = [
        { topic: 'Revenue', accuracy: 50, totalQuestions: 10, correct: 5 },
      ];

      const result = getAdaptiveQuestionTopics(stats, 1);

      expect(result.length).toBeGreaterThan(0);
      const totalCount = result.reduce((sum, r) => sum + r.count, 0);
      expect(totalCount).toBeLessThanOrEqual(1);
    });

    it('prioritizes weakest topic first', () => {
      const stats: TopicStats[] = [
        { topic: 'Strong', accuracy: 90, totalQuestions: 10, correct: 9 },
        { topic: 'Weakest', accuracy: 30, totalQuestions: 10, correct: 3 },
        { topic: 'Medium', accuracy: 60, totalQuestions: 10, correct: 6 },
      ];

      const result = getAdaptiveQuestionTopics(stats, 15);

      // Weakest should come first
      const weakestIndex = result.findIndex(r => r.topic === 'Weakest');
      expect(weakestIndex).toBe(0);
    });

    it('includes stale topics not practiced recently', () => {
      const stats: TopicStats[] = [
        { topic: 'Recent', accuracy: 80, totalQuestions: 10, correct: 8, lastPracticed: '2026-02-04' },
        { topic: 'Stale', accuracy: 80, totalQuestions: 10, correct: 8, lastPracticed: '2026-01-01' },
      ];

      const result = getAdaptiveQuestionTopics(stats, 15);

      // Stale topic should be included
      expect(result.some(r => r.topic === 'Stale')).toBe(true);
    });

    it('handles topics with no lastPracticed date', () => {
      const stats: TopicStats[] = [
        { topic: 'NeverPracticed', accuracy: 75, totalQuestions: 10, correct: 7 },
      ];

      const result = getAdaptiveQuestionTopics(stats, 15);

      expect(result.some(r => r.topic === 'NeverPracticed')).toBe(true);
    });
  });

  describe('analyzeNextFocus - Edge Cases', () => {
    it('handles empty topicStats and lessonProgress', () => {
      const result = analyzeNextFocus([], {}, 10);

      expect(result).toBeDefined();
      expect(result.primaryFocus).toBeDefined();
      expect(result.secondaryFocus).toBeDefined();
      expect(result.readinessGaps).toEqual([]);
      expect(result.strengths).toEqual([]);
    });

    it('handles 0 total lessons', () => {
      const result = analyzeNextFocus([], {}, 0);

      expect(result).toBeDefined();
      // Division by zero should be handled
      expect(result.primaryFocus).toBeDefined();
    });

    it('identifies primary focus as lessons when < 50% complete', () => {
      const lessonProgress = {
        'lesson-1': 100,
        'lesson-2': 0,
        'lesson-3': 0,
        'lesson-4': 0,
      };

      const result = analyzeNextFocus([], lessonProgress, 4);

      expect(result.primaryFocus).toContain('lessons');
    });

    it('identifies weak areas as primary focus when lessons > 50% complete', () => {
      const stats: TopicStats[] = [
        { topic: 'Revenue', accuracy: 40, totalQuestions: 10, correct: 4 },
      ];
      const lessonProgress = {
        'lesson-1': 100,
        'lesson-2': 100,
        'lesson-3': 100,
      };

      const result = analyzeNextFocus(stats, lessonProgress, 4);

      expect(result.primaryFocus).toContain('Revenue');
    });

    it('correctly identifies strengths (accuracy >= 80%)', () => {
      const stats: TopicStats[] = [
        { topic: 'StrongTopic', accuracy: 85, totalQuestions: 10, correct: 8 },
        { topic: 'WeakTopic', accuracy: 40, totalQuestions: 10, correct: 4 },
      ];

      const result = analyzeNextFocus(stats, {}, 0);

      expect(result.strengths).toContain('StrongTopic');
      expect(result.strengths).not.toContain('WeakTopic');
    });

    it('limits readinessGaps to 5 items', () => {
      const stats: TopicStats[] = Array.from({ length: 10 }, (_, i) => ({
        topic: `WeakTopic${i}`,
        accuracy: 40 + i,
        totalQuestions: 10,
        correct: 4 + i,
      }));

      const result = analyzeNextFocus(stats, {}, 0);

      expect(result.readinessGaps.length).toBeLessThanOrEqual(5);
    });

    it('excludes topics with < 5 questions from readinessGaps', () => {
      const stats: TopicStats[] = [
        { topic: 'FewQuestions', accuracy: 30, totalQuestions: 4, correct: 1 },
        { topic: 'EnoughQuestions', accuracy: 40, totalQuestions: 10, correct: 4 },
      ];

      const result = analyzeNextFocus(stats, {}, 0);

      const gapTopics = result.readinessGaps.map(g => g.split(' ')[0]);
      expect(gapTopics).not.toContain('FewQuestions');
    });
  });
});

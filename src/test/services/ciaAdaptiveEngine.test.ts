/**
 * Tests for CIA Adaptive Engine Service
 * SM-2 spaced repetition with CIA-specific part weighting
 */
import { describe, it, expect, beforeEach } from 'vitest';
import {
  calculateSM2,
  responseToQuality,
  initializeCardProgress,
  getDueCards,
  calculateCardPriority,
  selectSessionCards,
  createSession,
  recordAnswer,
  isSessionComplete,
  getSessionSummary,
  getRecommendedPart,
  getStudyTimeRecommendation,
  serializeProgress,
  deserializeProgress,
  CardProgress,
  QuestionCard,
} from '../../services/ciaAdaptiveEngine';

describe('ciaAdaptiveEngine', () => {
  let cardProgress: CardProgress;

  beforeEach(() => {
    cardProgress = initializeCardProgress('test-card');
  });

  describe('initializeCardProgress', () => {
    it('creates progress with correct card ID', () => {
      expect(cardProgress.cardId).toBe('test-card');
    });

    it('sets default ease factor of 2.5', () => {
      expect(cardProgress.easeFactor).toBe(2.5);
    });

    it('initializes with zero repetitions', () => {
      expect(cardProgress.repetitions).toBe(0);
    });

    it('initializes with zero interval', () => {
      expect(cardProgress.interval).toBe(0);
    });

    it('initializes with zero attempts', () => {
      expect(cardProgress.totalAttempts).toBe(0);
      expect(cardProgress.totalCorrect).toBe(0);
    });

    it('sets consecutive correct to zero', () => {
      expect(cardProgress.consecutiveCorrect).toBe(0);
    });
  });

  describe('calculateSM2', () => {
    it('increases easeFactor for quality 5 (perfect)', () => {
      const result = calculateSM2(cardProgress, 5);
      expect(result.easeFactor).toBeGreaterThan(cardProgress.easeFactor);
    });

    it('decreases easeFactor for quality 2 (incorrect)', () => {
      const result = calculateSM2(cardProgress, 2);
      expect(result.easeFactor).toBeLessThan(cardProgress.easeFactor);
    });

    it('resets repetitions for quality < 3', () => {
      const withReps = { ...cardProgress, repetitions: 5 };
      const result = calculateSM2(withReps, 1);
      expect(result.repetitions).toBe(0);
    });

    it('increments repetitions for quality >= 3', () => {
      const result = calculateSM2(cardProgress, 4);
      expect(result.repetitions).toBe(1);
    });

    it('returns interval of 1 for first correct', () => {
      const result = calculateSM2(cardProgress, 4);
      expect(result.interval).toBe(1);
    });

    it('returns interval of 6 for second correct', () => {
      const afterFirst = calculateSM2(cardProgress, 4);
      const afterSecond = calculateSM2(afterFirst, 4);
      expect(afterSecond.interval).toBe(6);
    });

    it('never lets easeFactor fall below 1.3', () => {
      let progress = cardProgress;
      for (let i = 0; i < 20; i++) {
        progress = calculateSM2(progress, 0);
      }
      expect(progress.easeFactor).toBeGreaterThanOrEqual(1.3);
    });

    it('updates lastReviewDate', () => {
      const before = new Date();
      const result = calculateSM2(cardProgress, 4);
      expect(result.lastReviewDate).toBeDefined();
      expect(result.lastReviewDate!.getTime()).toBeGreaterThanOrEqual(before.getTime());
    });

    it('increments totalAttempts', () => {
      const result = calculateSM2(cardProgress, 4);
      expect(result.totalAttempts).toBe(1);
    });

    it('increments totalCorrect for correct answers', () => {
      const result = calculateSM2(cardProgress, 4);
      expect(result.totalCorrect).toBe(1);
    });

    it('does not increment totalCorrect for incorrect answers', () => {
      const result = calculateSM2(cardProgress, 2);
      expect(result.totalCorrect).toBe(0);
    });

    it('increments consecutiveCorrect for correct', () => {
      const result = calculateSM2(cardProgress, 4);
      expect(result.consecutiveCorrect).toBe(1);
    });

    it('resets consecutiveCorrect for incorrect', () => {
      const withStreak = { ...cardProgress, consecutiveCorrect: 5 };
      const result = calculateSM2(withStreak, 2);
      expect(result.consecutiveCorrect).toBe(0);
    });
  });

  describe('responseToQuality', () => {
    const targetTime = 60; // 60 seconds target

    it('returns 5 for fast correct answer', () => {
      const quality = responseToQuality(true, 25, targetTime);
      expect(quality).toBe(5);
    });

    it('returns 4 for correct under target time', () => {
      const quality = responseToQuality(true, 50, targetTime);
      expect(quality).toBe(4);
    });

    it('returns 3 for correct over target time', () => {
      const quality = responseToQuality(true, 80, targetTime);
      expect(quality).toBe(3);
    });

    it('returns 0 or 1 for incorrect answers', () => {
      const slow = responseToQuality(false, 150, targetTime);
      const fast = responseToQuality(false, 30, targetTime);
      expect(slow).toBeLessThan(2);
      expect(fast).toBeLessThan(2);
    });
  });

  describe('getDueCards', () => {
    it('returns empty array for empty progress array', () => {
      const due = getDueCards([]);
      expect(due).toEqual([]);
    });

    it('returns cards past their review date', () => {
      const overdueCard: CardProgress = {
        ...cardProgress,
        nextReviewDate: new Date(Date.now() - 86400000), // Yesterday
      };
      const due = getDueCards([overdueCard]);
      expect(due).toHaveLength(1);
    });

    it('does not return cards not yet due', () => {
      const futureCard: CardProgress = {
        ...cardProgress,
        nextReviewDate: new Date(Date.now() + 86400000 * 7), // Week from now
        lastReviewDate: new Date(), // Has been reviewed
      };
      const due = getDueCards([futureCard]);
      expect(due).toHaveLength(0);
    });

    it('includes new cards (never reviewed)', () => {
      const newCard: CardProgress = {
        ...cardProgress,
        lastReviewDate: null,
      };
      const due = getDueCards([newCard]);
      expect(due).toHaveLength(1);
    });
  });

  describe('calculateCardPriority', () => {
    const card: QuestionCard = {
      id: 'q1',
      part: 'CIA1',
      topic: 'IPPF',
      difficulty: 3,
      cognitiveLevel: 'application',
    };
    const partAccuracy: Record<string, number> = { CIA1: 70, CIA2: 60, CIA3: 65 };

    it('returns positive priority', () => {
      const priority = calculateCardPriority(card, null, partAccuracy as Record<'CIA1' | 'CIA2' | 'CIA3', number>);
      expect(priority).toBeGreaterThan(0);
    });

    it('gives higher priority to new cards', () => {
      const newPriority = calculateCardPriority(card, null, partAccuracy as Record<'CIA1' | 'CIA2' | 'CIA3', number>);
      const reviewedProgress: CardProgress = {
        ...cardProgress,
        totalAttempts: 5,
        nextReviewDate: new Date(),
      };
      const reviewPriority = calculateCardPriority(card, reviewedProgress, partAccuracy as Record<'CIA1' | 'CIA2' | 'CIA3', number>);
      expect(newPriority).toBeGreaterThan(reviewPriority);
    });

    it('weights by part importance', () => {
      const cia1Card = { ...card, part: 'CIA1' as const };
      const cia2Card = { ...card, id: 'q2', part: 'CIA2' as const };
      const cia1Priority = calculateCardPriority(cia1Card, null, partAccuracy as Record<'CIA1' | 'CIA2' | 'CIA3', number>);
      const cia2Priority = calculateCardPriority(cia2Card, null, partAccuracy as Record<'CIA1' | 'CIA2' | 'CIA3', number>);
      // CIA1 has 40% weight vs CIA2 30%
      expect(cia1Priority).toBeGreaterThan(cia2Priority);
    });
  });

  describe('selectSessionCards', () => {
    const cards: QuestionCard[] = [
      { id: 'q1', part: 'CIA1', topic: 'Test', difficulty: 3, cognitiveLevel: 'knowledge' },
      { id: 'q2', part: 'CIA1', topic: 'Test', difficulty: 3, cognitiveLevel: 'knowledge' },
      { id: 'q3', part: 'CIA2', topic: 'Test', difficulty: 3, cognitiveLevel: 'knowledge' },
    ];
    const progressMap = new Map<string, CardProgress>();
    const partAccuracy = { CIA1: 70, CIA2: 70, CIA3: 70 };

    it('returns empty array with no available cards', () => {
      const selected = selectSessionCards([], progressMap, partAccuracy, 'all', 10);
      expect(selected).toEqual([]);
    });

    it('limits to requested count', () => {
      const manyCards: QuestionCard[] = [];
      for (let i = 0; i < 50; i++) {
        manyCards.push({
          id: `q${i}`,
          part: 'CIA1',
          topic: 'Test',
          difficulty: 3,
          cognitiveLevel: 'knowledge',
        });
      }
      const selected = selectSessionCards(manyCards, progressMap, partAccuracy, 'all', 20);
      expect(selected.length).toBeLessThanOrEqual(20);
    });

    it('filters by part when specified', () => {
      const selected = selectSessionCards(cards, progressMap, partAccuracy, 'CIA1', 10);
      expect(selected.every(c => c.part === 'CIA1')).toBe(true);
    });
  });

  describe('createSession', () => {
    it('creates session with correct user ID', () => {
      const session = createSession('user-123', 'CIA1', 20);
      expect(session.userId).toBe('user-123');
    });

    it('creates session for specified part', () => {
      const session = createSession('user-123', 'CIA2', 20);
      expect(session.part).toBe('CIA2');
    });

    it('sets target questions', () => {
      const session = createSession('user-123', 'CIA1', 25);
      expect(session.targetQuestions).toBe(25);
    });

    it('initializes with zero answered', () => {
      const session = createSession('user-123', 'CIA1', 20);
      expect(session.questionsAnswered).toBe(0);
      expect(session.correctAnswers).toBe(0);
    });

    it('sets startedAt timestamp', () => {
      const before = new Date();
      const session = createSession('user-123', 'CIA1', 20);
      expect(session.startedAt.getTime()).toBeGreaterThanOrEqual(before.getTime());
    });
  });

  describe('recordAnswer', () => {
    it('increments questionsAnswered', () => {
      const session = createSession('user-123', 'CIA1', 20);
      const result = recordAnswer(session, 'q1', true);
      expect(result.questionsAnswered).toBe(1);
    });

    it('increments correctAnswers for correct', () => {
      const session = createSession('user-123', 'CIA1', 20);
      const result = recordAnswer(session, 'q1', true);
      expect(result.correctAnswers).toBe(1);
    });

    it('does not increment correctAnswers for incorrect', () => {
      const session = createSession('user-123', 'CIA1', 20);
      const result = recordAnswer(session, 'q1', false);
      expect(result.correctAnswers).toBe(0);
    });

    it('updates streak for correct answers', () => {
      const session = createSession('user-123', 'CIA1', 20);
      const result = recordAnswer(session, 'q1', true);
      expect(result.currentStreak).toBe(1);
    });

    it('resets streak for incorrect answers', () => {
      let session = createSession('user-123', 'CIA1', 20);
      session = recordAnswer(session, 'q1', true);
      session = recordAnswer(session, 'q2', true);
      const result = recordAnswer(session, 'q3', false);
      expect(result.currentStreak).toBe(0);
    });

    it('tracks max streak', () => {
      let session = createSession('user-123', 'CIA1', 20);
      session = recordAnswer(session, 'q1', true);
      session = recordAnswer(session, 'q2', true);
      session = recordAnswer(session, 'q3', true);
      session = recordAnswer(session, 'q4', false);
      expect(session.maxStreak).toBe(3);
    });

    it('adds card to completedCards', () => {
      const session = createSession('user-123', 'CIA1', 20);
      const result = recordAnswer(session, 'q1', true);
      expect(result.completedCards).toContain('q1');
    });

    it('updates sessionAccuracy', () => {
      let session = createSession('user-123', 'CIA1', 20);
      session = recordAnswer(session, 'q1', true);
      session = recordAnswer(session, 'q2', false);
      expect(session.sessionAccuracy).toBe(50);
    });
  });

  describe('isSessionComplete', () => {
    it('returns false for new session', () => {
      const session = createSession('user-123', 'CIA1', 20);
      expect(isSessionComplete(session)).toBe(false);
    });

    it('returns true when target reached', () => {
      let session = createSession('user-123', 'CIA1', 3);
      session = recordAnswer(session, 'q1', true);
      session = recordAnswer(session, 'q2', true);
      session = recordAnswer(session, 'q3', true);
      expect(isSessionComplete(session)).toBe(true);
    });
  });

  describe('getSessionSummary', () => {
    it('calculates accuracy correctly', () => {
      let session = createSession('user-123', 'CIA1', 10);
      for (let i = 0; i < 5; i++) {
        session = recordAnswer(session, `q${i}`, true);
      }
      for (let i = 5; i < 10; i++) {
        session = recordAnswer(session, `q${i}`, false);
      }
      const summary = getSessionSummary(session);
      expect(summary.accuracy).toBe(50);
    });

    it('returns questionsAnswered count', () => {
      let session = createSession('user-123', 'CIA1', 10);
      session = recordAnswer(session, 'q1', true);
      session = recordAnswer(session, 'q2', false);
      const summary = getSessionSummary(session);
      expect(summary.questionsAnswered).toBe(2);
    });

    it('includes streak info', () => {
      let session = createSession('user-123', 'CIA1', 5);
      session = recordAnswer(session, 'q1', true);
      session = recordAnswer(session, 'q2', true);
      session = recordAnswer(session, 'q3', true);
      const summary = getSessionSummary(session);
      expect(summary.maxStreak).toBe(3);
    });

    it('determines performance rating', () => {
      let session = createSession('user-123', 'CIA1', 4);
      session = recordAnswer(session, 'q1', true);
      session = recordAnswer(session, 'q2', true);
      session = recordAnswer(session, 'q3', true);
      session = recordAnswer(session, 'q4', true);
      const summary = getSessionSummary(session);
      expect(['excellent', 'good', 'fair', 'needs-work']).toContain(summary.performance);
    });
  });

  describe('getRecommendedPart', () => {
    it('returns a valid CIA part', () => {
      const partAccuracy = { CIA1: 70, CIA2: 70, CIA3: 70 };
      const partAttempts = { CIA1: 50, CIA2: 50, CIA3: 50 };
      const recommended = getRecommendedPart(partAccuracy, partAttempts);
      expect(['CIA1', 'CIA2', 'CIA3']).toContain(recommended);
    });

    it('recommends weakest part', () => {
      const partAccuracy = {
        CIA1: 90,
        CIA2: 50,
        CIA3: 70,
      };
      const partAttempts = { CIA1: 50, CIA2: 50, CIA3: 50 };
      const recommended = getRecommendedPart(partAccuracy, partAttempts);
      // Should recommend CIA2 (lowest mastery)
      expect(recommended).toBe('CIA2');
    });
  });

  describe('getStudyTimeRecommendation', () => {
    it('returns study time allocation per part', () => {
      const partAccuracy = { CIA1: 70, CIA2: 70, CIA3: 70 };
      const rec = getStudyTimeRecommendation(partAccuracy, 180);
      expect(rec).toHaveProperty('CIA1');
      expect(rec).toHaveProperty('CIA2');
      expect(rec).toHaveProperty('CIA3');
    });

    it('includes all 3 parts in breakdown', () => {
      const partAccuracy = { CIA1: 70, CIA2: 70, CIA3: 70 };
      const rec = getStudyTimeRecommendation(partAccuracy, 180);
      expect(rec.CIA1).toBeDefined();
      expect(rec.CIA2).toBeDefined();
      expect(rec.CIA3).toBeDefined();
    });

    it('allocates reasonable study time', () => {
      const partAccuracy = { CIA1: 70, CIA2: 70, CIA3: 70 };
      const totalMinutes = 180;
      const rec = getStudyTimeRecommendation(partAccuracy, totalMinutes);
      const sum = rec.CIA1 + rec.CIA2 + rec.CIA3;
      expect(sum).toBeGreaterThan(0);
      expect(sum).toBeLessThanOrEqual(totalMinutes + 1); // Allow for rounding
    });
  });

  describe('serialization', () => {
    it('serializes progress map to JSON', () => {
      const progressMap = new Map<string, CardProgress>();
      progressMap.set('card1', cardProgress);
      const json = serializeProgress(progressMap);
      expect(typeof json).toBe('string');
      expect(() => JSON.parse(json)).not.toThrow();
    });

    it('deserializes JSON back to progress map', () => {
      const progressMap = new Map<string, CardProgress>();
      progressMap.set('card1', cardProgress);
      const json = serializeProgress(progressMap);
      const restored = deserializeProgress(json);
      expect(restored.has('card1')).toBe(true);
    });

    it('maintains data through serialization', () => {
      const progressMap = new Map<string, CardProgress>();
      const withData = calculateSM2(cardProgress, 4);
      progressMap.set('card1', withData);
      const json = serializeProgress(progressMap);
      const restored = deserializeProgress(json);
      const restoredCard = restored.get('card1')!;
      expect(restoredCard.repetitions).toBe(withData.repetitions);
      expect(restoredCard.easeFactor).toBe(withData.easeFactor);
    });
  });
});

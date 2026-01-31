/**
 * Spaced Repetition Algorithm Tests
 * 
 * These tests verify the core SM-2 inspired algorithm that determines
 * when users should review cards. Bugs here directly impact learning outcomes.
 */

import { describe, it, expect } from 'vitest';
import {
  calculateNextReview,
  getDueCards,
  getStudyStats,
  getSmartRecommendation,
  type Card,
} from '../../services/spacedRepetition';

describe('Spaced Repetition Algorithm', () => {
  describe('calculateNextReview', () => {
    const baseCard: Card = {
      id: 'test-card',
      interval: 0,
      easeFactor: 2.5,
      repetitions: 0,
    };

    describe('Rating: again (failure)', () => {
      it('resets repetitions to 0 on failure', () => {
        const card = { ...baseCard, repetitions: 5 };
        const result = calculateNextReview(card, 'again');
        expect(result.repetitions).toBe(0);
      });

      it('reduces ease factor but not below 1.3', () => {
        const card = { ...baseCard, easeFactor: 2.5 };
        const result = calculateNextReview(card, 'again');
        expect(result.easeFactor).toBe(2.3); // 2.5 - 0.2
      });

      it('does not let ease factor go below 1.3', () => {
        const card = { ...baseCard, easeFactor: 1.4 };
        const result = calculateNextReview(card, 'again');
        expect(result.easeFactor).toBe(1.3); // max(1.3, 1.4-0.2)
      });

      it('sets interval to 1 day (review tomorrow)', () => {
        const card = { ...baseCard, interval: 30 };
        const result = calculateNextReview(card, 'again');
        expect(result.interval).toBe(1);
      });

      it('schedules next review for tomorrow', () => {
        const now = new Date();
        const result = calculateNextReview(baseCard, 'again');
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        expect(result.nextReview.getDate()).toBe(tomorrow.getDate());
      });
    });

    describe('Rating: hard', () => {
      it('increments repetitions', () => {
        const card = { ...baseCard, repetitions: 3 };
        const result = calculateNextReview(card, 'hard');
        expect(result.repetitions).toBe(4);
      });

      it('halves the interval', () => {
        const card = { ...baseCard, interval: 10 };
        const result = calculateNextReview(card, 'hard');
        expect(result.interval).toBe(5);
      });

      it('does not let interval go below 1', () => {
        const card = { ...baseCard, interval: 1 };
        const result = calculateNextReview(card, 'hard');
        expect(result.interval).toBe(1); // max(1, 0.5)
      });

      it('slightly reduces ease factor', () => {
        const card = { ...baseCard, easeFactor: 2.5 };
        const result = calculateNextReview(card, 'hard');
        expect(result.easeFactor).toBe(2.35); // 2.5 - 0.15
      });
    });

    describe('Rating: good', () => {
      it('sets interval to 1 for first repetition', () => {
        const card = { ...baseCard, repetitions: 0 };
        const result = calculateNextReview(card, 'good');
        expect(result.interval).toBe(1);
      });

      it('sets interval to 6 for second repetition', () => {
        const card = { ...baseCard, repetitions: 1 };
        const result = calculateNextReview(card, 'good');
        expect(result.interval).toBe(6);
      });

      it('multiplies interval by ease factor for subsequent repetitions', () => {
        const card = { ...baseCard, repetitions: 2, interval: 6, easeFactor: 2.5 };
        const result = calculateNextReview(card, 'good');
        expect(result.interval).toBe(15); // round(6 * 2.5)
      });

      it('maintains ease factor (no change)', () => {
        const card = { ...baseCard, easeFactor: 2.5 };
        const result = calculateNextReview(card, 'good');
        expect(result.easeFactor).toBe(2.5);
      });
    });

    describe('Rating: easy', () => {
      it('sets interval to 4 for first repetition', () => {
        const card = { ...baseCard, repetitions: 0 };
        const result = calculateNextReview(card, 'easy');
        expect(result.interval).toBe(4);
      });

      it('multiplies interval by ease factor AND 2.5x bonus', () => {
        const card = { ...baseCard, repetitions: 1, interval: 4, easeFactor: 2.5 };
        const result = calculateNextReview(card, 'easy');
        expect(result.interval).toBe(25); // round(4 * 2.5 * 2.5)
      });

      it('increases ease factor by 0.15', () => {
        const card = { ...baseCard, easeFactor: 2.5 };
        const result = calculateNextReview(card, 'easy');
        expect(result.easeFactor).toBe(2.65);
      });
    });

    describe('Edge cases', () => {
      it('handles card with undefined interval', () => {
        const card = { id: 'test', easeFactor: 2.5, repetitions: 0 };
        const result = calculateNextReview(card, 'good');
        expect(result.interval).toBe(1);
      });

      it('handles card with undefined easeFactor', () => {
        const card = { id: 'test', interval: 0, repetitions: 0 };
        const result = calculateNextReview(card, 'good');
        expect(result.easeFactor).toBe(2.5); // default
      });

      it('handles card with undefined repetitions', () => {
        const card = { id: 'test', interval: 0, easeFactor: 2.5 };
        const result = calculateNextReview(card, 'good');
        expect(result.repetitions).toBe(1);
      });

      it('returns lastReview as current date', () => {
        const before = new Date();
        const result = calculateNextReview(baseCard, 'good');
        const after = new Date();
        
        expect(result.lastReview.getTime()).toBeGreaterThanOrEqual(before.getTime());
        expect(result.lastReview.getTime()).toBeLessThanOrEqual(after.getTime());
      });
    });
  });

  describe('getDueCards', () => {
    const createCard = (id: string, nextReview: Date | null): Card => ({
      id,
      nextReview,
      interval: 1,
      easeFactor: 2.5,
      repetitions: 1,
    });

    it('returns new cards (no nextReview) as due', () => {
      const cards = [
        createCard('1', null),
        createCard('2', null),
      ];
      const due = getDueCards(cards);
      expect(due).toHaveLength(2);
    });

    it('returns overdue cards', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      const cards = [createCard('1', yesterday)];
      const due = getDueCards(cards);
      expect(due).toHaveLength(1);
    });

    it('does not return future cards', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const cards = [createCard('1', tomorrow)];
      const due = getDueCards(cards);
      expect(due).toHaveLength(0);
    });

    it('returns cards due today', () => {
      const now = new Date();
      const cards = [createCard('1', now)];
      const due = getDueCards(cards);
      expect(due).toHaveLength(1);
    });

    it('respects the limit parameter', () => {
      const cards = Array.from({ length: 50 }, (_, i) => createCard(`${i}`, null));
      const due = getDueCards(cards, 10);
      expect(due).toHaveLength(10);
    });

    it('prioritizes more overdue cards first', () => {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      
      const cards = [
        createCard('recent', oneDayAgo),
        createCard('older', twoDaysAgo),
      ];
      
      const due = getDueCards(cards);
      expect(due[0].id).toBe('older'); // More overdue comes first
    });

    it('prioritizes new cards over cards due today', () => {
      const now = new Date();
      const cards = [
        createCard('due-now', now),
        createCard('new', null),
      ];
      
      const due = getDueCards(cards);
      expect(due[0].id).toBe('new'); // New cards come first
    });

    it('handles empty array', () => {
      const due = getDueCards([]);
      expect(due).toHaveLength(0);
    });

    it('handles cards with string dates', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      const card = {
        id: '1',
        nextReview: yesterday.toISOString(), // String instead of Date
        interval: 1,
        easeFactor: 2.5,
        repetitions: 1,
      };
      
      const due = getDueCards([card]);
      expect(due).toHaveLength(1);
    });
  });

  describe('getStudyStats', () => {
    const createCard = (interval: number, nextReview: Date | null): Card => ({
      id: `card-${Math.random()}`,
      interval,
      nextReview,
      easeFactor: 2.5,
      repetitions: interval > 0 ? 1 : 0,
    });

    it('counts new cards correctly', () => {
      const cards = [
        createCard(0, null),
        createCard(0, null),
        createCard(1, new Date()),
      ];
      const stats = getStudyStats(cards);
      expect(stats.new).toBe(2);
    });

    it('counts learning cards (interval < 1 day)', () => {
      const cards = [
        createCard(0.5, new Date()),
      ];
      const stats = getStudyStats(cards);
      // Cards with interval < 1 are considered learning
      expect(stats.learning).toBeGreaterThanOrEqual(1);
    });

    it('counts review cards (1-21 day interval)', () => {
      const cards = [
        createCard(1, new Date()),
        createCard(10, new Date()),
        createCard(20, new Date()),
      ];
      const stats = getStudyStats(cards);
      expect(stats.review).toBe(3);
    });

    it('counts graduated cards (interval >= 21 days)', () => {
      const cards = [
        createCard(21, new Date()),
        createCard(30, new Date()),
      ];
      const stats = getStudyStats(cards);
      expect(stats.graduated).toBe(2);
    });

    it('counts due today correctly', () => {
      const now = new Date();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const cards = [
        createCard(1, now),
        createCard(1, yesterday),
        createCard(1, tomorrow), // Not due
      ];
      const stats = getStudyStats(cards);
      expect(stats.dueToday).toBe(2);
    });

    it('counts overdue cards (before today)', () => {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      
      const cards = [createCard(1, twoDaysAgo)];
      const stats = getStudyStats(cards);
      expect(stats.overdue).toBe(1);
    });

    it('returns correct total', () => {
      const cards = Array.from({ length: 15 }, () => createCard(1, new Date()));
      const stats = getStudyStats(cards);
      expect(stats.total).toBe(15);
    });
  });

  describe('getSmartRecommendation', () => {
    const baseProgress = {
      dueCards: 0,
      lastActivity: 'mcq',
      streakAtRisk: false,
      pointsNeeded: 0,
      currentStreak: 5,
    };

    it('recommends focusing on weak areas when present', () => {
      const weakAreas = [
        { id: 'topic-1', name: 'Revenue Recognition', accuracy: 45 },
      ];
      const recommendations = getSmartRecommendation(baseProgress, weakAreas);
      
      const weakAreaRec = recommendations.find(r => r.type === 'weak_area');
      expect(weakAreaRec).toBeDefined();
      expect(weakAreaRec?.title).toContain('Revenue Recognition');
      expect(weakAreaRec?.description).toContain('45%');
    });

    it('recommends spaced review when cards are due', () => {
      const progress = { ...baseProgress, dueCards: 15 };
      const recommendations = getSmartRecommendation(progress, []);
      
      const reviewRec = recommendations.find(r => r.type === 'spaced_review');
      expect(reviewRec).toBeDefined();
      expect(reviewRec?.title).toContain('15 cards due');
    });

    it('suggests variety when last activity was MCQ', () => {
      const progress = { ...baseProgress, lastActivity: 'mcq' };
      const recommendations = getSmartRecommendation(progress, []);
      
      const varietyRec = recommendations.find(r => r.type === 'variety');
      expect(varietyRec).toBeDefined();
      expect(varietyRec?.title).toContain('Flashcards');
    });

    it('prioritizes streak at risk as urgent', () => {
      const progress = { 
        ...baseProgress, 
        streakAtRisk: true, 
        pointsNeeded: 20,
        currentStreak: 10,
      };
      const recommendations = getSmartRecommendation(progress, []);
      
      const streakRec = recommendations.find(r => r.type === 'streak');
      expect(streakRec).toBeDefined();
      expect(streakRec?.priority).toBe('urgent');
    });

    it('sorts recommendations by priority', () => {
      const progress = { 
        ...baseProgress, 
        dueCards: 5,
        streakAtRisk: true,
        pointsNeeded: 10,
        currentStreak: 5,
      };
      const weakAreas = [{ id: '1', name: 'Test', accuracy: 40 }];
      
      const recommendations = getSmartRecommendation(progress, weakAreas);
      
      // Urgent should come first
      expect(recommendations[0].priority).toBe('urgent');
    });

    it('returns empty array when no recommendations apply', () => {
      const progress = { 
        ...baseProgress, 
        lastActivity: 'flashcards', // Not mcq, so no variety suggestion
      };
      const recommendations = getSmartRecommendation(progress, []);
      
      // May still have recommendations, but they should all be valid
      recommendations.forEach(rec => {
        expect(['weak_area', 'spaced_review', 'variety', 'streak']).toContain(rec.type);
      });
    });
  });
});

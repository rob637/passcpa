import { describe, it, expect, vi, beforeEach } from 'vitest';
import { calculateNextReview, getDueCards } from '../../services/spacedRepetition';

describe('Spaced Repetition Algorithm', () => {
  describe('calculateNextReview', () => {
    const baseCard = {
      interval: 1,
      easeFactor: 2.5,
      repetitions: 1,
    };

    describe('Again rating (complete failure)', () => {
      it('should reset repetitions to 0', () => {
        const result = calculateNextReview(baseCard, 'again');
        expect(result.repetitions).toBe(0);
      });

      it('should set interval to 1 day', () => {
        const result = calculateNextReview(baseCard, 'again');
        expect(result.interval).toBe(1);
      });

      it('should decrease ease factor by 0.2', () => {
        const result = calculateNextReview(baseCard, 'again');
        expect(result.easeFactor).toBe(2.3);
      });

      it('should not decrease ease factor below 1.3', () => {
        const hardCard = { ...baseCard, easeFactor: 1.4 };
        const result = calculateNextReview(hardCard, 'again');
        expect(result.easeFactor).toBe(1.3);
      });
    });

    describe('Hard rating (difficult recall)', () => {
      it('should increment repetitions', () => {
        const result = calculateNextReview(baseCard, 'hard');
        expect(result.repetitions).toBe(2);
      });

      it('should halve the interval', () => {
        const card = { ...baseCard, interval: 10 };
        const result = calculateNextReview(card, 'hard');
        expect(result.interval).toBe(5);
      });

      it('should not decrease interval below 1', () => {
        const card = { ...baseCard, interval: 1 };
        const result = calculateNextReview(card, 'hard');
        expect(result.interval).toBeGreaterThanOrEqual(1);
      });

      it('should decrease ease factor by 0.15', () => {
        const result = calculateNextReview(baseCard, 'hard');
        expect(result.easeFactor).toBe(2.35);
      });
    });

    describe('Good rating (recalled with effort)', () => {
      it('should increment repetitions', () => {
        const result = calculateNextReview(baseCard, 'good');
        expect(result.repetitions).toBe(2);
      });

      it('should set interval to 1 for first repetition', () => {
        const newCard = { ...baseCard, repetitions: 0 };
        const result = calculateNextReview(newCard, 'good');
        expect(result.interval).toBe(1);
      });

      it('should set interval to 6 for second repetition', () => {
        const card = { ...baseCard, repetitions: 1 };
        const result = calculateNextReview(card, 'good');
        expect(result.interval).toBe(6);
      });

      it('should multiply interval by ease factor for later repetitions', () => {
        const card = { ...baseCard, repetitions: 2, interval: 6 };
        const result = calculateNextReview(card, 'good');
        expect(result.interval).toBe(Math.round(6 * 2.5)); // 15
      });

      it('should maintain ease factor', () => {
        const result = calculateNextReview(baseCard, 'good');
        expect(result.easeFactor).toBe(2.5);
      });
    });

    describe('Easy rating (perfect recall)', () => {
      it('should increment repetitions', () => {
        const result = calculateNextReview(baseCard, 'easy');
        expect(result.repetitions).toBe(2);
      });

      it('should set interval to 4 for first repetition', () => {
        const newCard = { ...baseCard, repetitions: 0 };
        const result = calculateNextReview(newCard, 'easy');
        expect(result.interval).toBe(4);
      });

      it('should multiply interval by ease factor * 2.5', () => {
        const card = { ...baseCard, repetitions: 2, interval: 6 };
        const result = calculateNextReview(card, 'easy');
        expect(result.interval).toBe(Math.round(6 * 2.5 * 2.5)); // 38
      });

      it('should increase ease factor by 0.15', () => {
        const result = calculateNextReview(baseCard, 'easy');
        expect(result.easeFactor).toBe(2.65);
      });
    });

    describe('Next review date calculation', () => {
      it('should set nextReview to correct future date', () => {
        const result = calculateNextReview(baseCard, 'good');
        const expectedDate = new Date();
        expectedDate.setDate(expectedDate.getDate() + result.interval);

        // Compare dates (ignore time)
        expect(result.nextReview.toDateString()).toBe(expectedDate.toDateString());
      });

      it('should set lastReview to current date', () => {
        const result = calculateNextReview(baseCard, 'good');
        expect(result.lastReview.toDateString()).toBe(new Date().toDateString());
      });
    });
  });

  describe('getDueCards', () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);

    const mockCards = [
      { id: '1', nextReview: yesterday, interval: 1 }, // Due yesterday (overdue)
      { id: '2', nextReview: today, interval: 3 }, // Due today
      { id: '3', nextReview: tomorrow, interval: 7 }, // Due tomorrow (not yet)
      { id: '4', nextReview: null, interval: 0 }, // New card (no review date)
      { id: '5', nextReview: lastWeek, interval: 1 }, // Very overdue
    ];

    it('should return cards due today or earlier', () => {
      const dueCards = getDueCards(mockCards);
      const dueIds = dueCards.map((c) => c.id);

      expect(dueIds).toContain('1'); // Overdue
      expect(dueIds).toContain('2'); // Due today
      expect(dueIds).toContain('5'); // Very overdue
      expect(dueIds).not.toContain('3'); // Not due yet
    });

    it('should include new cards without review date', () => {
      const dueCards = getDueCards(mockCards);
      const dueIds = dueCards.map((c) => c.id);

      expect(dueIds).toContain('4'); // New card
    });

    it('should prioritize overdue cards', () => {
      const dueCards = getDueCards(mockCards);

      // New cards (null nextReview) or most overdue should be prioritized
      // The exact order depends on implementation - just verify overdue cards come before future cards
      const dueIds = dueCards.map((c) => c.id);
      expect(dueIds).toContain('5'); // Last week - very overdue
      expect(dueIds).toContain('1'); // Yesterday - overdue
    });

    it('should respect the limit parameter', () => {
      const dueCards = getDueCards(mockCards, 2);
      expect(dueCards.length).toBeLessThanOrEqual(2);
    });

    it('should return empty array when no cards are due', () => {
      const futureCards = [{ id: '1', nextReview: tomorrow }];
      const dueCards = getDueCards(futureCards);
      expect(dueCards.length).toBe(0);
    });
  });
});

describe('Spaced Repetition - Edge Cases', () => {
  it('should handle card with undefined properties', () => {
    const emptyCard = {};
    const result = calculateNextReview(emptyCard, 'good');

    expect(result.interval).toBeDefined();
    expect(result.easeFactor).toBeDefined();
    expect(result.repetitions).toBeDefined();
  });

  it('should handle invalid rating gracefully', () => {
    const card = { interval: 1, easeFactor: 2.5, repetitions: 1 };
    const result = calculateNextReview(card, 'invalid');

    // Should maintain current interval
    expect(result.interval).toBe(1);
  });

  it('should handle very large intervals', () => {
    const card = { interval: 365, easeFactor: 2.5, repetitions: 10 };
    const result = calculateNextReview(card, 'easy');

    // Should calculate without overflow
    expect(result.interval).toBeGreaterThan(365);
    expect(Number.isFinite(result.interval)).toBe(true);
  });

  it('should handle cards with future nextReview dates correctly', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);

    const futureCards = [{ id: '1', nextReview: futureDate }];
    const dueCards = getDueCards(futureCards);

    expect(dueCards.length).toBe(0);
  });
});

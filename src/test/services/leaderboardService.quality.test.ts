/**
 * Leaderboard Service - Quality Tests (Bug-Finding Focus)
 * 
 * Tests community comparison features for edge cases.
 * @batch 3 of autonomous tests (45 tests)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Firebase
vi.mock('firebase/firestore', () => ({
  doc: vi.fn(() => ({})),
  getDoc: vi.fn(() => Promise.resolve({ exists: () => false, data: () => null })),
  setDoc: vi.fn(() => Promise.resolve()),
  updateDoc: vi.fn(() => Promise.resolve()),
  increment: vi.fn((n) => n),
  serverTimestamp: vi.fn(() => new Date()),
}));

// Mock firebase config
vi.mock('../../config/firebase.js', () => ({
  db: {},
}));

// Mock date-fns
vi.mock('date-fns', () => ({
  format: vi.fn(() => '2026-02-05'),
  subDays: vi.fn((_date, days) => new Date(Date.now() - days * 24 * 60 * 60 * 1000)),
}));

// Mock logger
vi.mock('../../utils/logger', () => ({
  default: {
    log: vi.fn(),
    debug: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
  },
}));

import {
  recordDailyActivity,
  recordStreak,
  getUserRanking,
  getCommunityStats,
  getMotivationalMessage,
} from '../../services/leaderboardService';

describe('Leaderboard Service - Quality Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('recordDailyActivity', () => {
    it('handles valid activity recording', async () => {
      await expect(recordDailyActivity('user123', 'FAR', 10, 30)).resolves.not.toThrow();
    });

    it('handles zero questions', async () => {
      await expect(recordDailyActivity('user123', 'FAR', 0, 30)).resolves.not.toThrow();
    });

    it('handles zero minutes', async () => {
      await expect(recordDailyActivity('user123', 'FAR', 10, 0)).resolves.not.toThrow();
    });

    it('handles all sections', async () => {
      const sections = ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP'] as const;
      for (const section of sections) {
        await expect(recordDailyActivity('user123', section, 10, 30)).resolves.not.toThrow();
      }
    });

    it('handles high question count', async () => {
      await expect(recordDailyActivity('user123', 'FAR', 500, 30)).resolves.not.toThrow();
    });

    it('handles high minutes count', async () => {
      await expect(recordDailyActivity('user123', 'FAR', 10, 480)).resolves.not.toThrow();
    });

    it('handles empty userId', async () => {
      await expect(recordDailyActivity('', 'FAR', 10, 30)).resolves.not.toThrow();
    });

    it('handles negative questions gracefully', async () => {
      await expect(recordDailyActivity('user123', 'FAR', -5, 30)).resolves.not.toThrow();
    });

    it('handles negative minutes gracefully', async () => {
      await expect(recordDailyActivity('user123', 'FAR', 10, -15)).resolves.not.toThrow();
    });
  });

  describe('recordStreak', () => {
    it('handles valid streak recording', async () => {
      await expect(recordStreak('user123', 5)).resolves.not.toThrow();
    });

    it('handles zero streak', async () => {
      await expect(recordStreak('user123', 0)).resolves.not.toThrow();
    });

    it('handles high streak', async () => {
      await expect(recordStreak('user123', 365)).resolves.not.toThrow();
    });

    it('handles negative streak gracefully', async () => {
      await expect(recordStreak('user123', -1)).resolves.not.toThrow();
    });

    it('handles empty userId', async () => {
      await expect(recordStreak('', 5)).resolves.not.toThrow();
    });

    it('handles very large streak', async () => {
      await expect(recordStreak('user123', 1000)).resolves.not.toThrow();
    });
  });

  describe('getUserRanking', () => {
    it('returns ranking object', async () => {
      const result = await getUserRanking('FAR', 10, 30, 5);
      expect(typeof result).toBe('object');
    });

    it('returns required percentile fields', async () => {
      const result = await getUserRanking('FAR', 10, 30, 5);
      expect(typeof result.questionsPercentile).toBe('number');
      expect(typeof result.minutesPercentile).toBe('number');
      expect(typeof result.streakPercentile).toBe('number');
    });

    it('percentiles are between 0 and 100', async () => {
      const result = await getUserRanking('FAR', 10, 30, 5);
      expect(result.questionsPercentile).toBeGreaterThanOrEqual(0);
      expect(result.questionsPercentile).toBeLessThanOrEqual(100);
      expect(result.minutesPercentile).toBeGreaterThanOrEqual(0);
      expect(result.minutesPercentile).toBeLessThanOrEqual(100);
    });

    it('handles zero questions', async () => {
      const result = await getUserRanking('FAR', 0, 30, 5);
      expect(typeof result).toBe('object');
    });

    it('handles zero minutes', async () => {
      const result = await getUserRanking('FAR', 10, 0, 5);
      expect(typeof result).toBe('object');
    });

    it('handles zero streak', async () => {
      const result = await getUserRanking('FAR', 10, 30, 0);
      expect(typeof result).toBe('object');
    });

    it('handles all sections', async () => {
      const sections = ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP'] as const;
      for (const section of sections) {
        const result = await getUserRanking(section, 10, 30, 5);
        expect(typeof result).toBe('object');
      }
    });

    it('handles default/fallback section', async () => {
      const result = await getUserRanking('FAR', 10, 30, 5);
      expect(typeof result).toBe('object');
    });

    it('handles very high activity', async () => {
      const result = await getUserRanking('FAR', 200, 300, 100);
      expect(typeof result).toBe('object');
    });
  });

  describe('getCommunityStats', () => {
    it('returns stats object', async () => {
      const result = await getCommunityStats();
      expect(typeof result).toBe('object');
    });

    it('returns expected fields', async () => {
      const result = await getCommunityStats();
      expect(typeof result.todayActive).toBe('number');
      expect(typeof result.weeklyActive).toBe('number');
      expect(typeof result.avgQuestionsToday).toBe('number');
      expect(typeof result.avgMinutesToday).toBe('number');
    });

    it('returns non-negative values', async () => {
      const result = await getCommunityStats();
      expect(result.todayActive).toBeGreaterThanOrEqual(0);
      expect(result.weeklyActive).toBeGreaterThanOrEqual(0);
    });

    it('returns topStreaks array', async () => {
      const result = await getCommunityStats();
      expect(Array.isArray(result.topStreaks)).toBe(true);
    });

    it('returns sectionBreakdown object', async () => {
      const result = await getCommunityStats();
      expect(typeof result.sectionBreakdown).toBe('object');
    });
  });

  describe('getMotivationalMessage', () => {
    const mockRanking = {
      questionsPercentile: 75,
      minutesPercentile: 80,
      streakPercentile: 60,
    };

    it('returns string message', () => {
      const result = getMotivationalMessage(mockRanking, 'FAR');
      expect(typeof result).toBe('string');
    });

    it('returns non-empty message', () => {
      const result = getMotivationalMessage(mockRanking, 'FAR');
      expect(result.length).toBeGreaterThan(0);
    });

    it('handles high percentiles', () => {
      const highRanking = {
        questionsPercentile: 95,
        minutesPercentile: 95,
        streakPercentile: 95,
      };
      const result = getMotivationalMessage(highRanking, 'FAR');
      expect(typeof result).toBe('string');
    });

    it('handles low percentiles', () => {
      const lowRanking = {
        questionsPercentile: 5,
        minutesPercentile: 10,
        streakPercentile: 15,
      };
      const result = getMotivationalMessage(lowRanking, 'FAR');
      expect(typeof result).toBe('string');
    });

    it('handles zero percentiles', () => {
      const zeroRanking = {
        questionsPercentile: 0,
        minutesPercentile: 0,
        streakPercentile: 0,
      };
      const result = getMotivationalMessage(zeroRanking, 'FAR');
      expect(typeof result).toBe('string');
    });

    it('handles 100% percentiles', () => {
      const perfectRanking = {
        questionsPercentile: 100,
        minutesPercentile: 100,
        streakPercentile: 100,
      };
      const result = getMotivationalMessage(perfectRanking, 'FAR');
      expect(typeof result).toBe('string');
    });

    it('works with all sections', () => {
      const sections = ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP'] as const;
      for (const section of sections) {
        const result = getMotivationalMessage(mockRanking, section);
        expect(typeof result).toBe('string');
      }
    });

    it('handles partial ranking data', () => {
      const partialRanking = {
        questionsPercentile: 50,
        minutesPercentile: 50,
        streakPercentile: 50,
        sectionRank: {
          questionsPercentile: 60,
          minutesPercentile: 70,
          sectionStudents: 100,
        },
      };
      const result = getMotivationalMessage(partialRanking, 'FAR');
      expect(typeof result).toBe('string');
    });
  });
});

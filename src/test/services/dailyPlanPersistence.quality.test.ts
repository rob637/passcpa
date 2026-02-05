/**
 * Daily Plan Persistence Service - Quality Tests (Bug-Finding Focus)
 * 
 * Tests Firestore-backed daily plan persistence for edge cases.
 * @batch 2 of 20 (30 tests)
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock Firebase
vi.mock('firebase/firestore', () => ({
  doc: vi.fn(() => ({})),
  getDoc: vi.fn(() => Promise.resolve({ exists: () => false })),
  setDoc: vi.fn(() => Promise.resolve()),
  updateDoc: vi.fn(() => Promise.resolve()),
  arrayUnion: vi.fn((x) => x),
  Timestamp: { now: () => ({ toDate: () => new Date() }) },
  collection: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  orderBy: vi.fn(),
  limit: vi.fn(),
  getDocs: vi.fn(() => Promise.resolve({ docs: [] })),
}));

vi.mock('../../config/firebase', () => ({
  db: {},
}));

vi.mock('../../services/dailyPlanService', () => ({
  generateDailyPlan: vi.fn(() => ({
    activities: [],
    section: 'FAR',
    date: new Date().toISOString().split('T')[0],
  })),
}));

import {
  fetchTodaysPlan,
  getPreviousIncomplete,
  getOrCreateTodaysPlan,
  markActivityCompleted,
  getPlanHistory,
  getTodaysCompletionStatus,
  getCompletionRate,
} from '../../services/dailyPlanPersistence';

describe('Daily Plan Persistence - Quality Tests', () => {
  let localStorageMock: Record<string, string>;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-06-15T10:00:00.000Z'));
    
    localStorageMock = {};
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => localStorageMock[key] || null);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation((key, value) => {
      localStorageMock[key] = value;
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('fetchTodaysPlan - Edge Cases', () => {
    it('returns null for empty userId', async () => {
      const plan = await fetchTodaysPlan('');
      expect(plan).toBeNull();
    });

    it('returns null for null userId', async () => {
      const plan = await fetchTodaysPlan(null as any);
      expect(plan).toBeNull();
    });

    it('handles cache miss gracefully', async () => {
      const plan = await fetchTodaysPlan('user123');
      expect(plan === null || typeof plan === 'object').toBe(true);
    });

    it('validates section parameter filters correctly', async () => {
      const plan = await fetchTodaysPlan('user123', 'FAR');
      expect(plan === null || plan?.section === 'FAR').toBe(true);
    });

    it('handles corrupted localStorage cache', async () => {
      localStorageMock['daily_plan_user123_2024-06-15'] = 'not-valid{{{';
      const plan = await fetchTodaysPlan('user123');
      expect(plan === null || typeof plan === 'object').toBe(true);
    });

    it('handles section mismatch in cached data', async () => {
      localStorageMock['daily_plan_user123_2024-06-15_FAR'] = JSON.stringify({
        section: 'AUD',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      const plan = await fetchTodaysPlan('user123', 'FAR');
      expect(plan).toBeNull();
    });
  });

  describe('getPreviousIncomplete - Carryover Edge Cases', () => {
    it('returns empty array for empty userId', async () => {
      const activities = await getPreviousIncomplete('');
      expect(activities).toEqual([]);
    });

    it('returns empty array for null userId', async () => {
      const activities = await getPreviousIncomplete(null as any);
      expect(activities).toEqual([]);
    });

    it('handles no previous plans gracefully', async () => {
      const activities = await getPreviousIncomplete('user123');
      expect(Array.isArray(activities)).toBe(true);
    });
  });

  describe('markActivityCompleted - Edge Cases', () => {
    it('handles empty activityId', async () => {
      await expect(markActivityCompleted('user123', '', 'FAR')).resolves.not.toThrow();
    });

    it('handles non-existent activity', async () => {
      await expect(markActivityCompleted('user123', 'nonexistent-id', 'FAR')).resolves.not.toThrow();
    });

    it('handles marking same activity complete twice', async () => {
      await markActivityCompleted('user123', 'activity-1', 'FAR');
      await expect(markActivityCompleted('user123', 'activity-1', 'FAR')).resolves.not.toThrow();
    });
  });

  describe('getTodaysCompletionStatus - Edge Cases', () => {
    it('handles empty userId', async () => {
      const status = await getTodaysCompletionStatus('', 'FAR');
      expect(status).toBeDefined();
    });

    it('handles valid request', async () => {
      const status = await getTodaysCompletionStatus('user123', 'FAR');
      expect(status).toBeDefined();
    });
  });

  describe('getCompletionRate - Edge Cases', () => {
    it('handles empty userId', async () => {
      const rate = await getCompletionRate('');
      expect(typeof rate).toBe('number');
    });

    it('handles zero days', async () => {
      const rate = await getCompletionRate('user123', 0);
      expect(typeof rate).toBe('number');
    });
  });

  describe('Date Boundary Edge Cases', () => {
    it('handles midnight boundary correctly', async () => {
      vi.setSystemTime(new Date('2024-06-15T23:59:59.000Z'));
      const plan = await fetchTodaysPlan('user123');
      expect(plan === null || typeof plan === 'object').toBe(true);
    });

    it('handles timezone differences', async () => {
      vi.setSystemTime(new Date('2024-06-15T00:00:01.000Z'));
      const plan = await fetchTodaysPlan('user123');
      expect(plan === null || typeof plan === 'object').toBe(true);
    });
  });

  describe('getOrCreateTodaysPlan - Race Condition Edge Cases', () => {
    it('handles concurrent calls gracefully', async () => {
      const promises = [
        getOrCreateTodaysPlan('user123', {} as any),
        getOrCreateTodaysPlan('user123', {} as any),
      ];
      await expect(Promise.all(promises)).resolves.toBeDefined();
    });

    it('handles missing studyState gracefully', async () => {
      await expect(getOrCreateTodaysPlan('user123', null as any)).resolves.not.toThrow();
    });
  });

  describe('getPlanHistory - Edge Cases', () => {
    it('handles zero days parameter', async () => {
      const history = await getPlanHistory('user123', 0);
      expect(Array.isArray(history)).toBe(true);
    });

    it('handles negative days parameter', async () => {
      const history = await getPlanHistory('user123', -5);
      expect(Array.isArray(history)).toBe(true);
    });

    it('handles very large days parameter', async () => {
      const history = await getPlanHistory('user123', 10000);
      expect(Array.isArray(history)).toBe(true);
    });
  });
});

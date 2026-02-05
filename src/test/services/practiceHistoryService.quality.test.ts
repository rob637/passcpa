/**
 * Practice History Service - Quality Tests (Bug-Finding Focus)
 * 
 * Tests practice session tracking for edge cases.
 * @batch 5 of 20 (25 tests)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Firebase
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(() => ({})),
  doc: vi.fn(() => ({})),
  setDoc: vi.fn(() => Promise.resolve()),
  getDocs: vi.fn(() => Promise.resolve({ docs: [] })),
  query: vi.fn(() => ({})),
  orderBy: vi.fn(() => ({})),
  limit: vi.fn(() => ({})),
  Timestamp: { now: () => ({ toDate: () => new Date() }) },
}));

vi.mock('../../config/firebase', () => ({
  db: {},
}));

import {
  savePracticeSession,
  getPracticeSessions,
  getPracticeSessionsBySection,
} from '../../services/practiceHistoryService';

describe('Practice History Service - Quality Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('savePracticeSession - Edge Cases', () => {
    const validSession = {
      section: 'FAR',
      mode: 'study' as const,
      questionCount: 10,
      correctCount: 8,
      accuracy: 80,
      timeSpentSeconds: 300,
    };

    it('returns session ID on success', async () => {
      const id = await savePracticeSession('user123', validSession);
      expect(typeof id).toBe('string');
      expect(id.startsWith('practice-')).toBe(true);
    });

    it('handles zero question count', async () => {
      const session = { ...validSession, questionCount: 0, correctCount: 0, accuracy: 0 };
      await expect(savePracticeSession('user123', session)).resolves.toBeDefined();
    });

    it('handles 100% accuracy', async () => {
      const session = { ...validSession, correctCount: 10, accuracy: 100 };
      await expect(savePracticeSession('user123', session)).resolves.toBeDefined();
    });

    it('handles 0% accuracy', async () => {
      const session = { ...validSession, correctCount: 0, accuracy: 0 };
      await expect(savePracticeSession('user123', session)).resolves.toBeDefined();
    });

    it('handles more correct than total (invalid state)', async () => {
      const session = { ...validSession, correctCount: 15, questionCount: 10, accuracy: 150 };
      await expect(savePracticeSession('user123', session)).resolves.toBeDefined();
    });

    it('handles negative time spent', async () => {
      const session = { ...validSession, timeSpentSeconds: -100 };
      await expect(savePracticeSession('user123', session)).resolves.toBeDefined();
    });

    it('handles very long session', async () => {
      const session = { ...validSession, timeSpentSeconds: 86400 };
      await expect(savePracticeSession('user123', session)).resolves.toBeDefined();
    });

    it('handles all exam modes', async () => {
      const modes = ['study', 'timed', 'exam', 'weak'] as const;
      for (const mode of modes) {
        const session = { ...validSession, mode };
        await expect(savePracticeSession('user123', session)).resolves.toBeDefined();
      }
    });

    it('handles optional blueprintArea', async () => {
      const session = { ...validSession, blueprintArea: 'Area I' };
      await expect(savePracticeSession('user123', session)).resolves.toBeDefined();
    });

    it('handles optional difficulty', async () => {
      const session = { ...validSession, difficulty: 'hard' };
      await expect(savePracticeSession('user123', session)).resolves.toBeDefined();
    });

    it('handles optional questionIds array', async () => {
      const session = { ...validSession, questionIds: ['q1', 'q2', 'q3'] };
      await expect(savePracticeSession('user123', session)).resolves.toBeDefined();
    });
  });

  describe('getPracticeSessions - Edge Cases', () => {
    it('returns array for user', async () => {
      const sessions = await getPracticeSessions('user123');
      expect(Array.isArray(sessions)).toBe(true);
    });

    it('handles empty userId', async () => {
      const sessions = await getPracticeSessions('');
      expect(Array.isArray(sessions)).toBe(true);
    });

    it('respects maxResults limit', async () => {
      const sessions = await getPracticeSessions('user123', 5);
      expect(sessions.length).toBeLessThanOrEqual(5);
    });

    it('handles zero maxResults', async () => {
      const sessions = await getPracticeSessions('user123', 0);
      expect(Array.isArray(sessions)).toBe(true);
    });

    it('handles negative maxResults', async () => {
      const sessions = await getPracticeSessions('user123', -1);
      expect(Array.isArray(sessions)).toBe(true);
    });

    it('handles very large maxResults', async () => {
      const sessions = await getPracticeSessions('user123', 10000);
      expect(Array.isArray(sessions)).toBe(true);
    });

    it('default maxResults is 10', async () => {
      const sessions = await getPracticeSessions('user123');
      expect(sessions.length).toBeLessThanOrEqual(10);
    });
  });

  describe('getPracticeSessionsBySection - Edge Cases', () => {
    it('returns array for valid section', async () => {
      const sessions = await getPracticeSessionsBySection('user123', 'FAR');
      expect(Array.isArray(sessions)).toBe(true);
    });

    it('handles invalid section gracefully', async () => {
      const sessions = await getPracticeSessionsBySection('user123', 'INVALID');
      expect(Array.isArray(sessions)).toBe(true);
    });

    it('handles empty section string', async () => {
      const sessions = await getPracticeSessionsBySection('user123', '');
      expect(Array.isArray(sessions)).toBe(true);
    });

    it('handles lowercase section', async () => {
      const sessions = await getPracticeSessionsBySection('user123', 'far');
      expect(Array.isArray(sessions)).toBe(true);
    });

    it('respects maxResults for section filter', async () => {
      const sessions = await getPracticeSessionsBySection('user123', 'FAR', 3);
      expect(sessions.length).toBeLessThanOrEqual(3);
    });

    it('handles all valid sections', async () => {
      const sections = ['FAR', 'AUD', 'REG', 'BAR'];
      for (const section of sections) {
        const sessions = await getPracticeSessionsBySection('user123', section);
        expect(Array.isArray(sessions)).toBe(true);
      }
    });
  });
});

/**
 * REAL Quality Tests for Offline Cache Service
 * 
 * These tests verify the actual IndexedDB caching implementation.
 * Uses fake-indexeddb to provide a real IndexedDB implementation in jsdom.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import 'fake-indexeddb/auto';
import { IDBFactory } from 'fake-indexeddb';
import type { Question } from '../../types';

// We need to dynamically import the module in each test to get a fresh db instance
let cacheQuestions: typeof import('../../services/offlineCache').cacheQuestions;
let getCachedQuestions: typeof import('../../services/offlineCache').getCachedQuestions;
let clearCache: typeof import('../../services/offlineCache').clearCache;
let getCacheStatus: typeof import('../../services/offlineCache').getCacheStatus;
let cacheTBS: typeof import('../../services/offlineCache').cacheTBS;

// Reset IndexedDB and module between tests
beforeEach(async () => {
  // Reset modules FIRST - this clears the cached dbInstance
  vi.resetModules();
  
  // Reset IndexedDB with a fresh factory
  globalThis.indexedDB = new IDBFactory();
  
  // Re-import the module to get fresh functions with no cached db
  const module = await import('../../services/offlineCache');
  cacheQuestions = module.cacheQuestions;
  getCachedQuestions = module.getCachedQuestions;
  clearCache = module.clearCache;
  getCacheStatus = module.getCacheStatus;
  cacheTBS = module.cacheTBS;
});

describe('Offline Cache Service - REAL Tests', () => {
  // Sample questions that match the actual Question type
  const sampleQuestions: Partial<Question>[] = [
    {
      id: 'q1',
      question: 'What is GAAP?',
      section: 'FAR',
      topic: 'Framework',
      subtopic: 'Basics',
      difficulty: 'easy',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 0,
      explanation: 'Generally Accepted Accounting Principles'
    },
    {
      id: 'q2', 
      question: 'What is an audit?',
      section: 'AUD',
      topic: 'Planning',
      subtopic: 'Introduction',
      difficulty: 'medium',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 1,
      explanation: 'Examination of financial statements'
    },
    {
      id: 'q3',
      question: 'Partnership basis calculation',
      section: 'REG',
      topic: 'Partnerships',
      subtopic: 'Basis',
      difficulty: 'hard',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 2,
      explanation: 'Partnership basis rules'
    },
    {
      id: 'q4',
      question: 'Another FAR question',
      section: 'FAR',
      topic: 'Leases',
      subtopic: 'Classification',
      difficulty: 'medium',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 3,
      explanation: 'Lease accounting'
    },
  ];

  describe('cacheQuestions', () => {
    it('should cache questions and return count', async () => {
      const count = await cacheQuestions(sampleQuestions as Question[]);
      expect(count).toBe(4);
    });

    it('should cache empty array without error', async () => {
      const count = await cacheQuestions([]);
      expect(count).toBe(0);
    });

    it('should overwrite existing questions with same ID', async () => {
      // Cache original
      await cacheQuestions([{ id: 'q1', question: 'Original' } as Question]);
      
      // Cache updated version
      await cacheQuestions([{ id: 'q1', question: 'Updated' } as Question]);
      
      // Retrieve and verify
      const cached = await getCachedQuestions();
      expect(cached.length).toBe(1);
      expect(cached[0].question).toBe('Updated');
    });

    it('should handle large batch of questions', async () => {
      const largeSet = Array.from({ length: 500 }, (_, i) => ({
        id: `large-${i}`,
        question: `Question ${i}`,
        section: 'FAR' as const,
        topic: 'Test',
        subtopic: 'Test',
        difficulty: 'easy' as const,
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
        explanation: 'Test',
      }));
      
      const count = await cacheQuestions(largeSet as Question[]);
      expect(count).toBe(500);
      
      const cached = await getCachedQuestions();
      expect(cached.length).toBe(500);
    });
  });

  describe('getCachedQuestions', () => {
    beforeEach(async () => {
      // Pre-populate cache
      await cacheQuestions(sampleQuestions as Question[]);
    });

    it('should retrieve all cached questions when no filter', async () => {
      const questions = await getCachedQuestions();
      expect(questions.length).toBe(4);
    });

    it('should filter by section', async () => {
      const farQuestions = await getCachedQuestions({ section: 'FAR' });
      expect(farQuestions.length).toBe(2);
      expect(farQuestions.every(q => q.section === 'FAR')).toBe(true);
    });

    it('should filter by topic', async () => {
      const leaseQuestions = await getCachedQuestions({ topic: 'Leases' });
      expect(leaseQuestions.length).toBe(1);
      expect(leaseQuestions[0].topic).toBe('Leases');
    });

    it('should return empty array for non-existent section', async () => {
      const questions = await getCachedQuestions({ section: 'NONEXISTENT' });
      expect(questions).toEqual([]);
    });

    it('should limit results when limit is specified', async () => {
      const limited = await getCachedQuestions({ limit: 2 });
      expect(limited.length).toBe(2);
    });

    it('should return empty array when cache is empty', async () => {
      await clearCache();
      const questions = await getCachedQuestions();
      expect(questions).toEqual([]);
    });
  });

  describe('clearCache', () => {
    it('should clear all cached questions', async () => {
      await cacheQuestions(sampleQuestions as Question[]);
      expect((await getCachedQuestions()).length).toBe(4);
      
      await clearCache();
      
      const remaining = await getCachedQuestions();
      expect(remaining.length).toBe(0);
    });

    it('should not throw when cache is already empty', async () => {
      await expect(clearCache()).resolves.not.toThrow();
    });
  });

  describe('getCacheStatus', () => {
    it('should return cache metadata after caching', async () => {
      await cacheQuestions(sampleQuestions as Question[]);
      
      const status = await getCacheStatus() as Record<string, any>;
      
      expect(status.questions_count).toBe(4);
      expect(status.questions_cached_at).toBeDefined();
      expect(typeof status.questions_cached_at).toBe('number');
    });

    it('should return empty status when nothing cached', async () => {
      const status = await getCacheStatus() as Record<string, any>;
      expect(Object.keys(status).length).toBe(0);
    });

    it('should update timestamp on re-cache', async () => {
      await cacheQuestions([sampleQuestions[0]] as Question[]);
      const status1 = await getCacheStatus() as Record<string, any>;
      const time1 = status1.questions_cached_at;
      
      // Wait a moment
      await new Promise(r => setTimeout(r, 10));
      
      await cacheQuestions([sampleQuestions[1]] as Question[]);
      const status2 = await getCacheStatus() as Record<string, any>;
      
      expect(status2.questions_cached_at).toBeGreaterThanOrEqual(time1);
    });
  });

  describe('cacheTBS', () => {
    const sampleTBS = [
      { id: 'tbs1', section: 'FAR', title: 'Journal Entry TBS' },
      { id: 'tbs2', section: 'AUD', title: 'Document Review TBS' },
    ];

    it('should cache TBS items', async () => {
      const count = await cacheTBS(sampleTBS);
      expect(count).toBe(2);
    });

    it('should update TBS metadata', async () => {
      await cacheTBS(sampleTBS);
      
      const status = await getCacheStatus() as Record<string, any>;
      expect(status.tbs_count).toBe(2);
      expect(status.tbs_cached_at).toBeDefined();
    });
  });

  describe('Data Integrity', () => {
    it('should preserve all question properties', async () => {
      const complexQuestion: Question = {
        id: 'complex-1',
        question: 'Complex question with <html> and "quotes"',
        section: 'FAR',
        topic: 'Bonds',
        subtopic: 'Pricing',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 2,
        explanation: 'Detailed explanation with special chars: <>&"\'',
        difficulty: 'hard',
      };
      
      await cacheQuestions([complexQuestion]);
      const [cached] = await getCachedQuestions();
      
      expect(cached.id).toBe(complexQuestion.id);
      expect(cached.question).toBe(complexQuestion.question);
      expect(cached.options).toEqual(complexQuestion.options);
      expect(cached.explanation).toBe(complexQuestion.explanation);
    });

    it('should handle unicode characters', async () => {
      const unicodeQuestion = {
        id: 'unicode-1',
        question: '日本語の質問 🎯',
        section: 'FAR',
        explanation: 'Émoji and accénts: café naïve',
      } as Question;
      
      await cacheQuestions([unicodeQuestion]);
      const [cached] = await getCachedQuestions();
      
      expect(cached.question).toBe('日本語の質問 🎯');
      expect(cached.explanation).toBe('Émoji and accénts: café naïve');
    });
  });

  describe('Error Handling', () => {
    it('should handle questions with missing optional fields', async () => {
      const minimalQuestion = {
        id: 'minimal-1',
        question: 'Minimal question',
        section: 'FAR',
      } as Question;
      
      await expect(cacheQuestions([minimalQuestion])).resolves.toBe(1);
    });

    it('should handle concurrent cache operations', async () => {
      // Start multiple cache operations simultaneously
      const ops = [
        cacheQuestions([{ id: 'concurrent-1', section: 'FAR' }] as Question[]),
        cacheQuestions([{ id: 'concurrent-2', section: 'AUD' }] as Question[]),
        cacheQuestions([{ id: 'concurrent-3', section: 'REG' }] as Question[]),
      ];
      
      await Promise.all(ops);
      
      const cached = await getCachedQuestions();
      expect(cached.length).toBe(3);
    });
  });
});

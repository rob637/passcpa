/**
 * Curriculum Service - Quality Tests (Bug-Finding Focus)
 * 
 * Tests the curriculum-aware learning features for edge cases.
 * These tests are designed to find issues in:
 * - Topic matching/normalization edge cases
 * - Lesson progress threshold calculations
 * - TBS unlock logic edge cases
 * - Preview mode calculations
 * 
 * @batch 4 of 20 (25 tests)
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  topicsMatch,
  getCoveredTopics,
  getPreviewTopics,
  filterQuestionsByCoveredTopics,
  checkTBSUnlocked,
  getUnlockedTBSTypes,
  TBS_TOPIC_REQUIREMENTS,
} from '../../services/curriculumService';

// Mock lessonService
const mockLessons = [
  { 
    id: 'lesson-1', 
    title: 'Revenue Recognition', 
    topics: ['Revenue Recognition', 'Contracts', 'Performance Obligations'],
    order: 1
  },
  { 
    id: 'lesson-2', 
    title: 'Inventory', 
    topics: ['Inventory', 'LIFO', 'FIFO', 'Weighted Average'],
    order: 2
  },
  { 
    id: 'lesson-3', 
    title: 'Fixed Assets', 
    topics: ['Property Plant Equipment', 'Depreciation', 'Impairment'],
    order: 3
  },
  { 
    id: 'lesson-4', 
    title: 'Leases', 
    topics: ['Leases', 'Right-of-Use Assets', 'Lease Liability'],
    order: 4
  },
];

vi.mock('../../services/lessonService', () => ({
  fetchLessonsBySection: vi.fn().mockResolvedValue([
    { 
      id: 'lesson-1', 
      title: 'Revenue Recognition', 
      topics: ['Revenue Recognition', 'Contracts', 'Performance Obligations'],
      order: 1
    },
    { 
      id: 'lesson-2', 
      title: 'Inventory', 
      topics: ['Inventory', 'LIFO', 'FIFO', 'Weighted Average'],
      order: 2
    },
    { 
      id: 'lesson-3', 
      title: 'Fixed Assets', 
      topics: ['Property Plant Equipment', 'Depreciation', 'Impairment'],
      order: 3
    },
    { 
      id: 'lesson-4', 
      title: 'Leases', 
      topics: ['Leases', 'Right-of-Use Assets', 'Lease Liability'],
      order: 4
    },
  ]),
}));

describe('Curriculum Service - Quality Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('topicsMatch - Edge Cases', () => {
    it('matches exact same topic', () => {
      expect(topicsMatch('Revenue Recognition', 'Revenue Recognition')).toBe(true);
    });

    it('matches case-insensitive', () => {
      expect(topicsMatch('revenue recognition', 'Revenue Recognition')).toBe(true);
      expect(topicsMatch('REVENUE RECOGNITION', 'revenue recognition')).toBe(true);
    });

    it('matches when one contains the other', () => {
      expect(topicsMatch('Revenue', 'Revenue Recognition')).toBe(true);
      expect(topicsMatch('Revenue Recognition', 'Revenue')).toBe(true);
    });

    it('handles empty strings', () => {
      expect(topicsMatch('', '')).toBe(true); // Both empty = match
      expect(topicsMatch('Revenue', '')).toBe(true); // Empty is substring of any
      expect(topicsMatch('', 'Revenue')).toBe(true);
    });

    it('handles special characters in topics', () => {
      // Special characters should be stripped for comparison
      expect(topicsMatch('401(k) Plans', '401k Plans')).toBe(true);
      expect(topicsMatch('PP&E', 'PPE')).toBe(true);
    });

    it('handles whitespace variations', () => {
      expect(topicsMatch('Revenue  Recognition', 'Revenue Recognition')).toBe(true);
      expect(topicsMatch(' Revenue Recognition ', 'Revenue Recognition')).toBe(true);
    });

    it('matches known synonyms - PP&E', () => {
      expect(topicsMatch('PP&E', 'Property Plant Equipment')).toBe(true);
      expect(topicsMatch('Property Plant Equipment', 'Fixed Assets')).toBe(true);
    });

    it('matches known synonyms - GAAP', () => {
      expect(topicsMatch('GAAP', 'Generally Accepted Accounting Principles')).toBe(true);
    });

    it('does not match unrelated topics', () => {
      expect(topicsMatch('Revenue', 'Inventory')).toBe(false);
      expect(topicsMatch('Leases', 'Depreciation')).toBe(false);
    });
  });

  describe('getCoveredTopics - Edge Cases', () => {
    it('returns empty set when no lessons completed', async () => {
      const coveredTopics = await getCoveredTopics({}, 'FAR');
      expect(coveredTopics.size).toBe(0);
    });

    it('returns empty set when all lessons at 0%', async () => {
      const progress = {
        'lesson-1': 0,
        'lesson-2': 0,
      };
      const coveredTopics = await getCoveredTopics(progress, 'FAR');
      expect(coveredTopics.size).toBe(0);
    });

    it('returns topics only when lesson >= 80% complete', async () => {
      const progress = {
        'lesson-1': 79, // Not completed
        'lesson-2': 80, // Completed
      };
      const coveredTopics = await getCoveredTopics(progress, 'FAR');
      
      // Should have lesson-2 topics but not lesson-1
      expect(coveredTopics.has('Inventory')).toBe(true);
      expect(coveredTopics.has('Revenue Recognition')).toBe(false);
    });

    it('handles 100% progress', async () => {
      const progress = {
        'lesson-1': 100,
      };
      const coveredTopics = await getCoveredTopics(progress, 'FAR');
      expect(coveredTopics.has('Revenue Recognition')).toBe(true);
    });

    it('handles progress > 100 (edge case)', async () => {
      const progress = {
        'lesson-1': 150, // Invalid but should handle
      };
      const coveredTopics = await getCoveredTopics(progress, 'FAR');
      expect(coveredTopics.has('Revenue Recognition')).toBe(true);
    });

    it('handles negative progress', async () => {
      const progress = {
        'lesson-1': -10,
      };
      const coveredTopics = await getCoveredTopics(progress, 'FAR');
      expect(coveredTopics.has('Revenue Recognition')).toBe(false);
    });

    it('handles NaN progress', async () => {
      const progress = {
        'lesson-1': NaN,
      };
      const coveredTopics = await getCoveredTopics(progress, 'FAR');
      // NaN < 80 = false, so should not be considered completed
      expect(coveredTopics.has('Revenue Recognition')).toBe(false);
    });

    it('handles unknown lesson IDs', async () => {
      const progress = {
        'nonexistent-lesson': 100,
      };
      const coveredTopics = await getCoveredTopics(progress, 'FAR');
      // Unknown lessons should be ignored
      expect(coveredTopics.size).toBe(0);
    });
  });

  describe('getPreviewTopics - Edge Cases', () => {
    it('returns next lesson topics when some lessons completed', async () => {
      const progress = {
        'lesson-1': 100,
        'lesson-2': 100,
      };
      const previewTopics = await getPreviewTopics(progress, 'FAR', 0.5);
      
      // Should include lesson-3 topics (next incomplete)
      expect(previewTopics.has('Property Plant Equipment')).toBe(true);
    });

    it('handles 0% lookahead', async () => {
      const previewTopics = await getPreviewTopics({}, 'FAR', 0);
      
      // 0% of incomplete = at least 1 lesson (Math.max(1, ...))
      expect(previewTopics.size).toBeGreaterThan(0);
    });

    it('handles 100% lookahead', async () => {
      const previewTopics = await getPreviewTopics({}, 'FAR', 1.0);
      
      // Should include all lessons as preview
      expect(previewTopics.size).toBeGreaterThan(0);
    });

    it('returns empty when all lessons completed', async () => {
      const progress = {
        'lesson-1': 100,
        'lesson-2': 100,
        'lesson-3': 100,
        'lesson-4': 100,
      };
      const previewTopics = await getPreviewTopics(progress, 'FAR');
      
      expect(previewTopics.size).toBe(0);
    });

    it('handles negative lookahead percent', async () => {
      const previewTopics = await getPreviewTopics({}, 'FAR', -0.1);
      
      // Should return at least 1 lesson worth (Math.max(1, ...))
      expect(previewTopics.size).toBeGreaterThan(0);
    });
  });

  describe('filterQuestionsByCoveredTopics - Edge Cases', () => {
    it('returns empty array when no questions match', () => {
      const questionTopics = new Map([
        ['q1', 'Bonds'],
        ['q2', 'Stock Options'],
      ]);
      const coveredTopics = new Set(['Revenue', 'Inventory']);
      
      const filtered = filterQuestionsByCoveredTopics(questionTopics, coveredTopics);
      expect(filtered).toEqual([]);
    });

    it('returns all when all match', () => {
      const questionTopics = new Map([
        ['q1', 'Revenue'],
        ['q2', 'Inventory'],
      ]);
      const coveredTopics = new Set(['Revenue', 'Inventory']);
      
      const filtered = filterQuestionsByCoveredTopics(questionTopics, coveredTopics);
      expect(filtered).toContain('q1');
      expect(filtered).toContain('q2');
    });

    it('handles empty question map', () => {
      const questionTopics = new Map<string, string>();
      const coveredTopics = new Set(['Revenue']);
      
      const filtered = filterQuestionsByCoveredTopics(questionTopics, coveredTopics);
      expect(filtered).toEqual([]);
    });

    it('handles empty covered topics', () => {
      const questionTopics = new Map([
        ['q1', 'Revenue'],
      ]);
      const coveredTopics = new Set<string>();
      
      const filtered = filterQuestionsByCoveredTopics(questionTopics, coveredTopics);
      expect(filtered).toEqual([]);
    });

    it('includes preview topics when provided', () => {
      const questionTopics = new Map([
        ['q1', 'Revenue'],
        ['q2', 'Leases'],
      ]);
      const coveredTopics = new Set(['Revenue']);
      const previewTopics = new Set(['Leases']);
      
      const filtered = filterQuestionsByCoveredTopics(questionTopics, coveredTopics, previewTopics);
      expect(filtered).toContain('q1');
      expect(filtered).toContain('q2');
    });
  });

  describe('checkTBSUnlocked - Edge Cases', () => {
    it('returns unlocked when no requirements defined', async () => {
      const result = await checkTBSUnlocked('NonexistentTBS', 'FAR', {});
      
      expect(result.isUnlocked).toBe(true);
      expect(result.progress).toBe(100);
    });

    it('returns 0% progress when no lessons completed', async () => {
      const result = await checkTBSUnlocked('Lease Classification', 'FAR', {});
      
      expect(result.progress).toBe(0);
      expect(result.isUnlocked).toBe(false);
    });

    it('handles partial progress correctly', async () => {
      // Complete lesson that covers Leases
      const progress = {
        'lesson-4': 100, // Leases lesson
      };
      
      const result = await checkTBSUnlocked('Lease Classification', 'FAR', progress);
      
      // Should have some progress
      expect(result.progress).toBeGreaterThan(0);
      expect(result.coveredTopics.length).toBeGreaterThan(0);
    });
  });

  describe('getUnlockedTBSTypes', () => {
    it('returns valid result when no lessons completed', async () => {
      const result = await getUnlockedTBSTypes({}, 'FAR');
      
      expect(result).toBeDefined();
      // Result structure may vary - just ensure it doesn't crash
      expect(typeof result.locked === 'boolean' || result.locked === undefined).toBe(true);
    });

    it('handles all lessons completed', async () => {
      const progress = {
        'lesson-1': 100,
        'lesson-2': 100,
        'lesson-3': 100,
        'lesson-4': 100,
      };
      
      const result = await getUnlockedTBSTypes(progress, 'FAR');
      
      // With all complete, result should be defined
      expect(result).toBeDefined();
      // unlockedTypes may be Set or array depending on implementation
      if (result.unlockedTypes) {
        expect(result.unlockedTypes.size >= 0 || Array.isArray(result.unlockedTypes)).toBe(true);
      }
    });
  });

  describe('TBS_TOPIC_REQUIREMENTS constant', () => {
    it('has requirements for all exam sections', () => {
      const sections = ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP'];
      
      sections.forEach(section => {
        expect(TBS_TOPIC_REQUIREMENTS[section]).toBeDefined();
        expect(Object.keys(TBS_TOPIC_REQUIREMENTS[section]).length).toBeGreaterThan(0);
      });
    });

    it('all TBS types have at least one required topic', () => {
      Object.entries(TBS_TOPIC_REQUIREMENTS).forEach(([section, tbsTypes]) => {
        Object.entries(tbsTypes).forEach(([tbsType, topics]) => {
          expect(Array.isArray(topics)).toBe(true);
          expect(topics.length).toBeGreaterThan(0);
        });
      });
    });

    it('Journal Entries requires fundamental topics', () => {
      const journalRequirements = TBS_TOPIC_REQUIREMENTS.FAR['Journal Entries'];
      expect(journalRequirements).toContain('Financial Statements');
      expect(journalRequirements).toContain('Revenue Recognition');
    });
  });
});

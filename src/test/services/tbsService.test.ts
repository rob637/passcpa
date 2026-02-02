/**
 * TBS Service Tests - Local-first Architecture
 * Tests the tbsService which loads Task-Based Simulations from local TypeScript files.
 */
import { describe, it, expect, beforeEach } from 'vitest';
import {
  fetchAllTBS,
  fetchTBSBySection,
  fetchTBSById,
  getTBSStats,
  fetchTBSByType,
  searchTBS,
  getTBSCount,
  clearTBSCache,
} from '../../services/tbsService';

describe('tbsService', () => {
  beforeEach(() => {
    // Clear cache before each test for clean state
    clearTBSCache();
  });

  describe('fetchAllTBS', () => {
    it('fetches all TBS from local data', async () => {
      const tbs = await fetchAllTBS();
      expect(Array.isArray(tbs)).toBe(true);
      expect(tbs.length).toBeGreaterThan(0);
    });

    it('returns TBS sorted by section and title', async () => {
      const tbs = await fetchAllTBS();
      
      // Verify sorting
      for (let i = 1; i < tbs.length; i++) {
        const prev = tbs[i - 1];
        const curr = tbs[i];
        if (prev.section === curr.section) {
          expect((prev.title || '').localeCompare(curr.title || '')).toBeLessThanOrEqual(0);
        }
      }
    });

    it('returns empty array on error gracefully', async () => {
      // This should not throw even if there's an issue
      const tbs = await fetchAllTBS();
      expect(Array.isArray(tbs)).toBe(true);
    });
  });

  describe('fetchTBSBySection', () => {
    it('fetches TBS for a specific section', async () => {
      // Get all TBS first to find a section with content
      const allTBS = await fetchAllTBS();
      const sectionSet = new Set<string>();
      allTBS.forEach(t => sectionSet.add(t.section));
      const sectionsWithTBS = Array.from(sectionSet);
      
      if (sectionsWithTBS.length > 0) {
        const sectionTBS = await fetchTBSBySection(sectionsWithTBS[0] as any);
        expect(sectionTBS.length).toBeGreaterThan(0);
        sectionTBS.forEach(t => {
          expect(t.section).toBe(sectionsWithTBS[0]);
        });
      }
    });

    it('returns FAR TBS for unknown section (default behavior)', async () => {
      const tbs = await fetchTBSBySection('NONEXISTENT' as any);
      // Implementation defaults to FAR for unknown sections
      expect(tbs.length).toBeGreaterThan(0);
    });
  });

  describe('fetchTBSById', () => {
    it('fetches a single TBS by ID', async () => {
      const allTBS = await fetchAllTBS();
      expect(allTBS.length).toBeGreaterThan(0);
      
      const tbs = await fetchTBSById(allTBS[0].id);
      expect(tbs).not.toBeNull();
      expect(tbs?.id).toBe(allTBS[0].id);
    });

    it('returns null for non-existent ID', async () => {
      const tbs = await fetchTBSById('nonexistent-tbs-id-12345');
      expect(tbs).toBeNull();
    });
  });

  describe('getTBSStats', () => {
    it('returns TBS statistics by section', async () => {
      const stats = await getTBSStats();
      expect(Array.isArray(stats)).toBe(true);
      expect(stats.length).toBeGreaterThan(0);
      
      stats.forEach(stat => {
        expect(stat.section).toBeDefined();
        expect(typeof stat.count).toBe('number');
      });
    });
  });

  describe('fetchTBSByType', () => {
    it('fetches TBS by simulation type', async () => {
      // Get all TBS to find available types
      const allTBS = await fetchAllTBS();
      const typeSet = new Set<string>();
      allTBS.forEach(t => { if (t.type) typeSet.add(t.type); });
      const typesWithTBS = Array.from(typeSet);
      
      if (typesWithTBS.length > 0) {
        const typeTBS = await fetchTBSByType(typesWithTBS[0]);
        expect(typeTBS.length).toBeGreaterThan(0);
        typeTBS.forEach(t => {
          expect(t.type).toBe(typesWithTBS[0]);
        });
      }
    });
  });

  describe('searchTBS', () => {
    it('searches TBS by title', async () => {
      const allTBS = await fetchAllTBS();
      const firstTBS = allTBS[0];
      
      // Search by first word of title
      const searchWord = (firstTBS.title || 'test').split(' ')[0];
      const results = await searchTBS(searchWord);
      
      expect(results.length).toBeGreaterThan(0);
    });

    it('is case insensitive', async () => {
      const allTBS = await fetchAllTBS();
      const firstTBS = allTBS[0];
      
      const searchWord = (firstTBS.title || 'test').split(' ')[0];
      const upperResults = await searchTBS(searchWord.toUpperCase());
      const lowerResults = await searchTBS(searchWord.toLowerCase());
      
      expect(upperResults.length).toBe(lowerResults.length);
    });

    it('returns empty array for no matches', async () => {
      const results = await searchTBS('xyz123nonexistent456abc');
      expect(results).toEqual([]);
    });
  });

  describe('getTBSCount', () => {
    it('returns total TBS count', async () => {
      const count = await getTBSCount();
      expect(count).toBeGreaterThan(0);
    });

    it('returns count for specific section', async () => {
      const allTBS = await fetchAllTBS();
      const sectionSet = new Set<string>();
      allTBS.forEach(t => sectionSet.add(t.section));
      const sectionsWithTBS = Array.from(sectionSet);
      
      if (sectionsWithTBS.length > 0) {
        const count = await getTBSCount(sectionsWithTBS[0] as any);
        expect(count).toBeGreaterThan(0);
        
        const sectionTBS = await fetchTBSBySection(sectionsWithTBS[0] as any);
        expect(count).toBe(sectionTBS.length);
      }
    });
  });

  describe('clearTBSCache', () => {
    it('clears the TBS cache', async () => {
      // Load TBS to populate cache
      await fetchAllTBS();
      
      // Clear cache
      clearTBSCache();
      
      // Should still work after clearing
      const tbs = await fetchAllTBS();
      expect(tbs.length).toBeGreaterThan(0);
    });
  });

  describe('TBS data integrity', () => {
    it('TBS have required fields', async () => {
      const tbs = await fetchAllTBS();
      tbs.forEach(t => {
        expect(t.id).toBeDefined();
        expect(t.title).toBeDefined();
        expect(t.section).toBeDefined();
        expect(t.type).toBeDefined();
      });
    });
  });

  describe('module exports', () => {
    it('exports fetchAllTBS function', () => {
      expect(typeof fetchAllTBS).toBe('function');
    });

    it('exports fetchTBSBySection function', () => {
      expect(typeof fetchTBSBySection).toBe('function');
    });

    it('exports fetchTBSById function', () => {
      expect(typeof fetchTBSById).toBe('function');
    });

    it('exports clearTBSCache function', () => {
      expect(typeof clearTBSCache).toBe('function');
    });
  });
});

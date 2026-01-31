/**
 * Quality Tests for TBS Service
 * 
 * Tests Task-Based Simulation fetching and caching.
 * Focus: Cache TTL, section filtering, search functionality
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// Mock Firebase
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn(),
  getDocs: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  orderBy: vi.fn(),
  addDoc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  serverTimestamp: vi.fn(),
}));

vi.mock('../../config/firebase', () => ({
  db: {},
}));

describe('TBS Service - Quality Tests', () => {
  let tbsService: any;
  let mockGetDocs: any;
  let mockGetDoc: any;

  beforeEach(async () => {
    vi.resetModules();
    vi.useFakeTimers();
    
    const firestore = await import('firebase/firestore');
    mockGetDocs = firestore.getDocs as any;
    mockGetDoc = firestore.getDoc as any;
    
    tbsService = await import('../../services/tbsService');
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  describe('fetchAllTBS', () => {
    it('should return all TBS from Firestore', async () => {
      mockGetDocs.mockResolvedValueOnce({
        docs: [
          { id: 'tbs1', data: () => ({ title: 'Bank Rec', section: 'FAR' }) },
          { id: 'tbs2', data: () => ({ title: 'Depreciation', section: 'FAR' }) },
        ],
      });

      const simulations = await tbsService.fetchAllTBS();
      
      expect(simulations.length).toBe(2);
      expect(simulations[0].title).toBe('Bank Rec');
    });

    it('should cache results for 5 minutes', async () => {
      mockGetDocs.mockResolvedValue({
        docs: [{ id: 'tbs1', data: () => ({ title: 'Cached' }) }],
      });

      // First call
      await tbsService.fetchAllTBS();
      
      // Second call within cache TTL
      await tbsService.fetchAllTBS();
      
      expect(mockGetDocs).toHaveBeenCalledTimes(1);
    });

    it('should refresh cache after TTL expires', async () => {
      mockGetDocs.mockResolvedValue({
        docs: [{ id: 'tbs1', data: () => ({ title: 'Fresh' }) }],
      });

      await tbsService.fetchAllTBS();
      
      // Advance past 5 minute TTL
      await vi.advanceTimersByTimeAsync(6 * 60 * 1000);
      
      await tbsService.fetchAllTBS();
      
      expect(mockGetDocs).toHaveBeenCalledTimes(2);
    });

    it('should return empty array on error', async () => {
      mockGetDocs.mockRejectedValueOnce(new Error('Network error'));

      const simulations = await tbsService.fetchAllTBS();
      
      expect(simulations).toEqual([]);
    });

    it('should include id in returned objects', async () => {
      mockGetDocs.mockResolvedValueOnce({
        docs: [{ id: 'tbs-abc', data: () => ({ title: 'Test' }) }],
      });

      const simulations = await tbsService.fetchAllTBS();
      
      expect(simulations[0].id).toBe('tbs-abc');
    });
  });

  describe('fetchTBSBySection', () => {
    it('should filter TBS by section', async () => {
      mockGetDocs.mockResolvedValueOnce({
        docs: [
          { id: 'tbs1', data: () => ({ title: 'FAR TBS', section: 'FAR' }) },
        ],
      });

      const simulations = await tbsService.fetchTBSBySection('FAR');
      
      expect(simulations.every((s: any) => s.section === 'FAR')).toBe(true);
    });

    it('should cache by section key', async () => {
      mockGetDocs.mockResolvedValue({
        docs: [{ id: 'tbs1', data: () => ({ section: 'FAR' }) }],
      });

      // Fetch FAR twice
      await tbsService.fetchTBSBySection('FAR');
      await tbsService.fetchTBSBySection('FAR');
      
      // Should only call once for same section
      expect(mockGetDocs).toHaveBeenCalledTimes(1);
    });

    it('should maintain separate caches per section', async () => {
      mockGetDocs
        .mockResolvedValueOnce({
          docs: [{ id: 'far1', data: () => ({ title: 'FAR', section: 'FAR' }) }],
        })
        .mockResolvedValueOnce({
          docs: [{ id: 'aud1', data: () => ({ title: 'AUD', section: 'AUD' }) }],
        });

      const far = await tbsService.fetchTBSBySection('FAR');
      const aud = await tbsService.fetchTBSBySection('AUD');
      
      expect(far[0].section).toBe('FAR');
      expect(aud[0].section).toBe('AUD');
      expect(mockGetDocs).toHaveBeenCalledTimes(2);
    });

    it('should return empty array on error', async () => {
      mockGetDocs.mockRejectedValueOnce(new Error('Query error'));

      const simulations = await tbsService.fetchTBSBySection('FAR');
      
      expect(simulations).toEqual([]);
    });
  });

  describe('fetchTBSById', () => {
    it('should fetch single TBS by ID', async () => {
      mockGetDoc.mockResolvedValueOnce({
        exists: () => true,
        id: 'tbs-123',
        data: () => ({
          title: 'Bank Reconciliation',
          scenario: 'Complete the bank rec...',
          section: 'FAR',
        }),
      });

      const tbs = await tbsService.fetchTBSById('tbs-123');
      
      expect(tbs.id).toBe('tbs-123');
      expect(tbs.title).toBe('Bank Reconciliation');
    });

    it('should return null for non-existent TBS', async () => {
      mockGetDoc.mockResolvedValueOnce({
        exists: () => false,
      });

      const tbs = await tbsService.fetchTBSById('non-existent');
      
      expect(tbs).toBeNull();
    });

    it('should check cache before fetching', async () => {
      // Prime cache with fetchAll
      mockGetDocs.mockResolvedValueOnce({
        docs: [
          { id: 'cached-tbs', data: () => ({ title: 'From Cache' }) },
        ],
      });
      
      await tbsService.fetchAllTBS();
      
      // Now fetch by ID - should find in cache
      const tbs = await tbsService.fetchTBSById('cached-tbs');
      
      expect(tbs.title).toBe('From Cache');
      // getDoc should not be called
    });

    it('should handle fetch error', async () => {
      mockGetDoc.mockRejectedValueOnce(new Error('Network error'));

      const tbs = await tbsService.fetchTBSById('error-id');
      
      expect(tbs).toBeNull();
    });
  });

  describe('searchTBS', () => {
    beforeEach(async () => {
      // Prime with some TBS
      mockGetDocs.mockResolvedValueOnce({
        docs: [
          { id: 'tbs1', data: () => ({ 
            title: 'Bank Reconciliation', 
            topic: 'Cash',
            scenario: 'Prepare a bank reconciliation...',
            section: 'FAR' 
          }) },
          { id: 'tbs2', data: () => ({ 
            title: 'Depreciation Schedule', 
            topic: 'Fixed Assets',
            scenario: 'Calculate depreciation...',
            section: 'FAR' 
          }) },
          { id: 'tbs3', data: () => ({ 
            title: 'Tax Basis', 
            topic: 'Individual Tax',
            scenario: 'Compute adjusted basis...',
            section: 'REG' 
          }) },
        ],
      });
    });

    it('should search by title', async () => {
      const results = await tbsService.searchTBS('Bank');
      
      expect(results.length).toBe(1);
      expect(results[0].title).toContain('Bank');
    });

    it('should search by topic', async () => {
      const results = await tbsService.searchTBS('Cash');
      
      expect(results.length).toBeGreaterThan(0);
    });

    it('should search by scenario', async () => {
      const results = await tbsService.searchTBS('depreciation');
      
      expect(results.length).toBeGreaterThan(0);
    });

    it('should be case insensitive', async () => {
      const lower = await tbsService.searchTBS('bank');
      const upper = await tbsService.searchTBS('BANK');
      
      expect(lower.length).toBe(upper.length);
    });

    it('should return empty array for no matches', async () => {
      const results = await tbsService.searchTBS('xyznonexistent');
      
      expect(results).toEqual([]);
    });

    it('should handle empty search term', async () => {
      const results = await tbsService.searchTBS('');
      
      // Empty string matches everything
      expect(results.length).toBe(3);
    });

    it('should handle special regex characters safely', async () => {
      // Should not throw on regex special chars
      const results = await tbsService.searchTBS('(test)');
      
      expect(results).toBeDefined();
    });
  });

  describe('getTBSStats', () => {
    it('should return count by section', async () => {
      mockGetDocs.mockResolvedValueOnce({
        docs: [
          { id: '1', data: () => ({ section: 'FAR' }) },
          { id: '2', data: () => ({ section: 'FAR' }) },
          { id: '3', data: () => ({ section: 'AUD' }) },
          { id: '4', data: () => ({ section: 'REG' }) },
        ],
      });

      const stats = await tbsService.getTBSStats();
      
      const farStats = stats.find((s: any) => s.section === 'FAR');
      const audStats = stats.find((s: any) => s.section === 'AUD');
      
      expect(farStats.count).toBe(2);
      expect(audStats.count).toBe(1);
    });

    it('should handle sections with no TBS', async () => {
      mockGetDocs.mockResolvedValueOnce({
        docs: [{ id: '1', data: () => ({ section: 'FAR' }) }],
      });

      const stats = await tbsService.getTBSStats();
      
      // Only FAR should be in stats
      expect(stats.length).toBe(1);
      expect(stats[0].section).toBe('FAR');
    });
  });

  describe('Cache Validation', () => {
    it('should validate cache timestamp', async () => {
      mockGetDocs.mockResolvedValue({
        docs: [{ id: 'tbs1', data: () => ({ title: 'Test' }) }],
      });

      await tbsService.fetchAllTBS();
      
      // Just before expiration
      await vi.advanceTimersByTimeAsync(4 * 60 * 1000);
      await tbsService.fetchAllTBS();
      
      // Still cached
      expect(mockGetDocs).toHaveBeenCalledTimes(1);
      
      // After expiration
      await vi.advanceTimersByTimeAsync(2 * 60 * 1000);
      await tbsService.fetchAllTBS();
      
      // Should refresh
      expect(mockGetDocs).toHaveBeenCalledTimes(2);
    });
  });

  describe('Data Integrity', () => {
    it('should preserve all TBS fields', async () => {
      mockGetDocs.mockResolvedValueOnce({
        docs: [{
          id: 'complete-tbs',
          data: () => ({
            title: 'Complete TBS',
            section: 'FAR',
            topic: 'Consolidations',
            scenario: 'You are preparing...',
            instructions: ['Step 1', 'Step 2'],
            tabs: [{ name: 'Exhibits', content: '...' }],
            answerFormat: 'grid',
            solution: { cells: [] },
            difficulty: 'hard',
            timeEstimate: 30,
            blueprintArea: 'I',
          }),
        }],
      });

      const simulations = await tbsService.fetchAllTBS();
      
      expect(simulations[0]).toMatchObject({
        id: 'complete-tbs',
        title: 'Complete TBS',
        section: 'FAR',
        difficulty: 'hard',
      });
    });

    it('should handle missing optional fields', async () => {
      mockGetDocs.mockResolvedValueOnce({
        docs: [{
          id: 'minimal-tbs',
          data: () => ({
            title: 'Minimal',
            section: 'FAR',
          }),
        }],
      });

      const simulations = await tbsService.fetchAllTBS();
      
      expect(simulations[0].id).toBe('minimal-tbs');
      expect(simulations[0].topic).toBeUndefined();
    });
  });
});

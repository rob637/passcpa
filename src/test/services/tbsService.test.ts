import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock Firebase config before importing the service
vi.mock('../../config/firebase', () => ({
  db: {},
  auth: {}
}));

// Create mock functions
const mockGetDocs = vi.fn();
const mockGetDoc = vi.fn();
const mockCollection = vi.fn();
const mockDoc = vi.fn();
const mockQuery = vi.fn();
const mockWhere = vi.fn();
const mockOrderBy = vi.fn();

// Mock Firestore functions
vi.mock('firebase/firestore', () => ({
  collection: (...args: unknown[]) => mockCollection(...args),
  doc: (...args: unknown[]) => mockDoc(...args),
  query: (...args: unknown[]) => mockQuery(...args),
  where: (...args: unknown[]) => mockWhere(...args),
  orderBy: (...args: unknown[]) => mockOrderBy(...args),
  getDocs: (...args: unknown[]) => mockGetDocs(...args),
  getDoc: (...args: unknown[]) => mockGetDoc(...args)
}));

import {
  fetchAllTBS,
  fetchTBSBySection,
  fetchTBSById,
  searchTBS,
  getTBSStats,
  clearTBSCache,
  preloadTBS
} from '../../services/tbsService';
import type { ExamSection } from '../../types';

// Helper to create proper mock doc objects
function createMockDoc(id: string, data: Record<string, unknown>) {
  return {
    id,
    data: () => data
  };
}

// Mock TBS data (without id in the data portion, like Firestore)
const mockTBSRawData = [
  {
    id: 'tbs-1',
    title: 'Bank Reconciliation',
    section: 'FAR' as ExamSection,
    topic: 'Cash and Receivables',
    scenario: 'Prepare a bank reconciliation for ABC Company'
  },
  {
    id: 'tbs-2',
    title: 'Depreciation Calculation',
    section: 'FAR' as ExamSection,
    topic: 'Fixed Assets',
    scenario: 'Calculate depreciation using various methods'
  },
  {
    id: 'tbs-3',
    title: 'Tax Liability Analysis',
    section: 'REG' as ExamSection,
    topic: 'Federal Tax',
    scenario: 'Calculate tax liability for a corporation'
  },
  {
    id: 'tbs-4',
    title: 'Audit Sampling',
    section: 'AUD' as ExamSection,
    topic: 'Sampling Methods',
    scenario: 'Determine appropriate sample size'
  }
];

// Create proper mock docs
function getMockDocs(data = mockTBSRawData) {
  return {
    docs: data.map(item => {
      const { id, ...rest } = item;
      return createMockDoc(id, rest);
    })
  };
}

describe('tbsService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    clearTBSCache(); // Clear cache before each test
    
    mockCollection.mockReturnValue({ path: 'tbs' });
    mockQuery.mockImplementation((...args) => args);
    mockWhere.mockImplementation((...args) => ({ type: 'where', args }));
    mockOrderBy.mockImplementation((...args) => ({ type: 'orderBy', args }));
    mockDoc.mockReturnValue({ path: 'tbs/tbs-1' });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchAllTBS', () => {
    it('should fetch all TBS from Firestore', async () => {
      mockGetDocs.mockResolvedValue(getMockDocs());

      const result = await fetchAllTBS();
      
      expect(result).toHaveLength(4);
      expect(result[0].id).toBe('tbs-1');
      expect(result[0].title).toBe('Bank Reconciliation');
      expect(mockGetDocs).toHaveBeenCalledTimes(1);
    });

    it('should cache results', async () => {
      mockGetDocs.mockResolvedValue(getMockDocs());

      // First call
      await fetchAllTBS();
      // Second call should use cache
      await fetchAllTBS();
      
      expect(mockGetDocs).toHaveBeenCalledTimes(1);
    });

    it('should return empty array on error', async () => {
      mockGetDocs.mockRejectedValue(new Error('Firestore error'));

      const result = await fetchAllTBS();
      
      expect(result).toEqual([]);
    });
  });

  describe('fetchTBSBySection', () => {
    it('should fetch TBS for a specific section', async () => {
      const farTBS = mockTBSRawData.filter(t => t.section === 'FAR');
      mockGetDocs.mockResolvedValue(getMockDocs(farTBS));

      const result = await fetchTBSBySection('FAR');
      
      expect(result).toHaveLength(2);
      expect(result.every(t => t.section === 'FAR')).toBe(true);
      expect(mockWhere).toHaveBeenCalledWith('section', '==', 'FAR');
    });

    it('should cache section results separately', async () => {
      const farTBS = mockTBSRawData.filter(t => t.section === 'FAR');
      const regTBS = mockTBSRawData.filter(t => t.section === 'REG');
      
      mockGetDocs
        .mockResolvedValueOnce(getMockDocs(farTBS))
        .mockResolvedValueOnce(getMockDocs(regTBS));

      await fetchTBSBySection('FAR');
      await fetchTBSBySection('REG');
      await fetchTBSBySection('FAR'); // Should use cache
      
      expect(mockGetDocs).toHaveBeenCalledTimes(2);
    });

    it('should return empty array on error', async () => {
      mockGetDocs.mockRejectedValue(new Error('Firestore error'));

      const result = await fetchTBSBySection('FAR');
      
      expect(result).toEqual([]);
    });
  });

  describe('fetchTBSById', () => {
    it('should fetch a single TBS by ID', async () => {
      mockGetDoc.mockResolvedValue({
        exists: () => true,
        id: 'tbs-1',
        data: () => ({
          title: 'Bank Reconciliation',
          section: 'FAR',
          topic: 'Cash and Receivables',
          scenario: 'Prepare a bank reconciliation for ABC Company'
        })
      });

      const result = await fetchTBSById('tbs-1');
      
      expect(result).not.toBeNull();
      expect(result?.id).toBe('tbs-1');
      expect(result?.title).toBe('Bank Reconciliation');
    });

    it('should return from cache if available', async () => {
      // First populate cache via fetchAllTBS
      mockGetDocs.mockResolvedValue(getMockDocs());
      await fetchAllTBS();

      // Now fetch by ID should use cache
      const result = await fetchTBSById('tbs-2');
      
      expect(result?.title).toBe('Depreciation Calculation');
      expect(mockGetDoc).not.toHaveBeenCalled(); // Should use cache
    });

    it('should return null when TBS not found', async () => {
      mockGetDoc.mockResolvedValue({
        exists: () => false
      });

      const result = await fetchTBSById('non-existent');
      
      expect(result).toBeNull();
    });

    it('should return null on error', async () => {
      mockGetDoc.mockRejectedValue(new Error('Firestore error'));

      const result = await fetchTBSById('tbs-1');
      
      expect(result).toBeNull();
    });
  });

  describe('searchTBS', () => {
    beforeEach(async () => {
      mockGetDocs.mockResolvedValue(getMockDocs());
    });

    it('should search by title', async () => {
      const result = await searchTBS('Bank');
      
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Bank Reconciliation');
    });

    it('should search by topic (case insensitive)', async () => {
      const result = await searchTBS('fixed assets');
      
      expect(result).toHaveLength(1);
      expect(result[0].topic).toBe('Fixed Assets');
    });

    it('should search by scenario', async () => {
      const result = await searchTBS('depreciation');
      
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Depreciation Calculation');
    });

    it('should return empty array when no matches', async () => {
      const result = await searchTBS('nonexistent-topic');
      
      expect(result).toEqual([]);
    });
  });

  describe('getTBSStats', () => {
    it('should return stats by section', async () => {
      mockGetDocs.mockResolvedValue(getMockDocs());

      const stats = await getTBSStats();
      
      expect(stats).toHaveLength(3); // FAR, REG, AUD
      
      const farStat = stats.find(s => s.section === 'FAR');
      expect(farStat?.count).toBe(2);
      
      const regStat = stats.find(s => s.section === 'REG');
      expect(regStat?.count).toBe(1);
      
      const audStat = stats.find(s => s.section === 'AUD');
      expect(audStat?.count).toBe(1);
    });
  });

  describe('clearTBSCache', () => {
    it('should clear the cache', async () => {
      mockGetDocs.mockResolvedValue(getMockDocs());

      // Populate cache
      await fetchAllTBS();
      expect(mockGetDocs).toHaveBeenCalledTimes(1);

      // Clear cache
      clearTBSCache();

      // Should fetch again
      await fetchAllTBS();
      expect(mockGetDocs).toHaveBeenCalledTimes(2);
    });
  });

  describe('preloadTBS', () => {
    it('should preload all TBS into cache', async () => {
      mockGetDocs.mockResolvedValue(getMockDocs());

      await preloadTBS();
      
      expect(mockGetDocs).toHaveBeenCalledTimes(1);
      
      // Second call should use cache
      await fetchAllTBS();
      expect(mockGetDocs).toHaveBeenCalledTimes(1);
    });
  });
});

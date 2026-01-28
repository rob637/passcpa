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
  fetchAllWCTasks,
  fetchWCTasksBySection,
  fetchWCTaskById,
  getRandomWCTask,
  searchWCTasks,
  clearWCCache,
  WC_RUBRIC
} from '../../services/wcService';
import type { ExamSection } from '../../types';

// Helper to create proper mock doc objects
function createMockDoc(id: string, data: Record<string, unknown>) {
  return {
    id,
    data: () => data
  };
}

// Mock WC task data
const mockWCRawData = [
  {
    id: 'wc-1',
    topic: 'Internal Controls Assessment',
    section: 'AUD' as ExamSection,
    scenario: 'Write a memo about internal control deficiencies',
    instructions: 'Evaluate the internal controls and provide recommendations',
    wordLimit: 500
  },
  {
    id: 'wc-2',
    topic: 'Revenue Recognition',
    section: 'FAR' as ExamSection,
    scenario: 'Write a memo explaining revenue recognition criteria',
    instructions: 'Apply ASC 606 to the given scenario',
    wordLimit: 400
  },
  {
    id: 'wc-3',
    topic: 'Tax Planning Strategies',
    section: 'REG' as ExamSection,
    scenario: 'Write a letter advising a client on tax planning',
    instructions: 'Provide tax-efficient strategies for the client',
    wordLimit: 450
  },
  {
    id: 'wc-4',
    topic: 'Audit Procedures',
    section: 'AUD' as ExamSection,
    scenario: 'Describe substantive procedures for accounts receivable',
    instructions: 'Design audit procedures to test A/R balance',
    wordLimit: 350
  }
];

// Create proper mock docs
function getMockDocs(data = mockWCRawData) {
  return {
    docs: data.map(item => {
      const { id, ...rest } = item;
      return createMockDoc(id, rest);
    })
  };
}

describe('wcService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    clearWCCache(); // Clear cache before each test
    
    mockCollection.mockReturnValue({ path: 'written-communication' });
    mockQuery.mockImplementation((...args) => args);
    mockWhere.mockImplementation((...args) => ({ type: 'where', args }));
    mockOrderBy.mockImplementation((...args) => ({ type: 'orderBy', args }));
    mockDoc.mockReturnValue({ path: 'written-communication/wc-1' });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('WC_RUBRIC', () => {
    it('should have organization, development, and expression categories', () => {
      expect(WC_RUBRIC).toHaveProperty('organization');
      expect(WC_RUBRIC).toHaveProperty('development');
      expect(WC_RUBRIC).toHaveProperty('expression');
    });

    it('should have correct weights that sum to 1', () => {
      const totalWeight = WC_RUBRIC.organization.weight +
        WC_RUBRIC.development.weight +
        WC_RUBRIC.expression.weight;
      expect(totalWeight).toBe(1);
    });

    it('should have criteria arrays for each category', () => {
      expect(Array.isArray(WC_RUBRIC.organization.criteria)).toBe(true);
      expect(Array.isArray(WC_RUBRIC.development.criteria)).toBe(true);
      expect(Array.isArray(WC_RUBRIC.expression.criteria)).toBe(true);
      expect(WC_RUBRIC.organization.criteria.length).toBeGreaterThan(0);
      expect(WC_RUBRIC.development.criteria.length).toBeGreaterThan(0);
      expect(WC_RUBRIC.expression.criteria.length).toBeGreaterThan(0);
    });
  });

  describe('fetchAllWCTasks', () => {
    it('should fetch all WC tasks from Firestore', async () => {
      mockGetDocs.mockResolvedValue(getMockDocs());

      const result = await fetchAllWCTasks();
      
      expect(result).toHaveLength(4);
      expect(result[0].id).toBe('wc-1');
      expect(result[0].topic).toBe('Internal Controls Assessment');
      expect(mockGetDocs).toHaveBeenCalledTimes(1);
    });

    it('should cache results', async () => {
      mockGetDocs.mockResolvedValue(getMockDocs());

      // First call
      await fetchAllWCTasks();
      // Second call should use cache
      await fetchAllWCTasks();
      
      expect(mockGetDocs).toHaveBeenCalledTimes(1);
    });

    it('should return empty array on error', async () => {
      mockGetDocs.mockRejectedValue(new Error('Firestore error'));

      const result = await fetchAllWCTasks();
      
      expect(result).toEqual([]);
    });
  });

  describe('fetchWCTasksBySection', () => {
    it('should fetch WC tasks for a specific section', async () => {
      const audTasks = mockWCRawData.filter(t => t.section === 'AUD');
      mockGetDocs.mockResolvedValue(getMockDocs(audTasks));

      const result = await fetchWCTasksBySection('AUD');
      
      expect(result).toHaveLength(2);
      expect(result.every(t => t.section === 'AUD')).toBe(true);
      expect(mockWhere).toHaveBeenCalledWith('section', '==', 'AUD');
    });

    it('should cache section results separately', async () => {
      const audTasks = mockWCRawData.filter(t => t.section === 'AUD');
      const farTasks = mockWCRawData.filter(t => t.section === 'FAR');
      
      mockGetDocs
        .mockResolvedValueOnce(getMockDocs(audTasks))
        .mockResolvedValueOnce(getMockDocs(farTasks));

      await fetchWCTasksBySection('AUD');
      await fetchWCTasksBySection('FAR');
      await fetchWCTasksBySection('AUD'); // Should use cache
      
      expect(mockGetDocs).toHaveBeenCalledTimes(2);
    });

    it('should return empty array on error', async () => {
      mockGetDocs.mockRejectedValue(new Error('Firestore error'));

      const result = await fetchWCTasksBySection('AUD');
      
      expect(result).toEqual([]);
    });
  });

  describe('fetchWCTaskById', () => {
    it('should fetch a single WC task by ID', async () => {
      mockGetDoc.mockResolvedValue({
        exists: () => true,
        id: 'wc-1',
        data: () => ({
          topic: 'Internal Controls Assessment',
          section: 'AUD',
          scenario: 'Write a memo about internal control deficiencies',
          instructions: 'Evaluate the internal controls and provide recommendations',
          wordLimit: 500
        })
      });

      const result = await fetchWCTaskById('wc-1');
      
      expect(result).not.toBeNull();
      expect(result?.id).toBe('wc-1');
      expect(result?.topic).toBe('Internal Controls Assessment');
    });

    it('should return from cache if available', async () => {
      // First populate cache via fetchAllWCTasks
      mockGetDocs.mockResolvedValue(getMockDocs());
      await fetchAllWCTasks();

      // Now fetch by ID should use cache
      const result = await fetchWCTaskById('wc-2');
      
      expect(result?.topic).toBe('Revenue Recognition');
      expect(mockGetDoc).not.toHaveBeenCalled(); // Should use cache
    });

    it('should return null when task not found', async () => {
      mockGetDoc.mockResolvedValue({
        exists: () => false
      });

      const result = await fetchWCTaskById('non-existent');
      
      expect(result).toBeNull();
    });

    it('should return null on error', async () => {
      mockGetDoc.mockRejectedValue(new Error('Firestore error'));

      const result = await fetchWCTaskById('wc-1');
      
      expect(result).toBeNull();
    });
  });

  describe('getRandomWCTask', () => {
    it('should return a random task from all tasks', async () => {
      mockGetDocs.mockResolvedValue(getMockDocs());

      const result = await getRandomWCTask();
      
      expect(result).not.toBeNull();
      expect(mockWCRawData.map(t => t.id)).toContain(result?.id);
    });

    it('should return a random task from specific section', async () => {
      const audTasks = mockWCRawData.filter(t => t.section === 'AUD');
      mockGetDocs.mockResolvedValue(getMockDocs(audTasks));

      const result = await getRandomWCTask('AUD');
      
      expect(result).not.toBeNull();
      expect(result?.section).toBe('AUD');
    });

    it('should return null when no tasks exist', async () => {
      mockGetDocs.mockResolvedValue(getMockDocs([]));

      const result = await getRandomWCTask();
      
      expect(result).toBeNull();
    });
  });

  describe('searchWCTasks', () => {
    beforeEach(async () => {
      mockGetDocs.mockResolvedValue(getMockDocs());
    });

    it('should search by topic', async () => {
      const result = await searchWCTasks('Internal Controls');
      
      expect(result).toHaveLength(1);
      expect(result[0].topic).toBe('Internal Controls Assessment');
    });

    it('should search by scenario (case insensitive)', async () => {
      const result = await searchWCTasks('memo');
      
      expect(result.length).toBeGreaterThan(0);
      expect(result.every(t => 
        t.topic.toLowerCase().includes('memo') || 
        t.scenario?.toLowerCase().includes('memo')
      )).toBe(true);
    });

    it('should return empty array when no matches', async () => {
      const result = await searchWCTasks('nonexistent-topic');
      
      expect(result).toEqual([]);
    });
  });

  describe('clearWCCache', () => {
    it('should clear the cache', async () => {
      mockGetDocs.mockResolvedValue(getMockDocs());

      // Populate cache
      await fetchAllWCTasks();
      expect(mockGetDocs).toHaveBeenCalledTimes(1);

      // Clear cache
      clearWCCache();

      // Should fetch again
      await fetchAllWCTasks();
      expect(mockGetDocs).toHaveBeenCalledTimes(2);
    });
  });
});

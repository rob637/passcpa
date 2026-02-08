import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Import after mock setup
import {
  CISA_CRAM_TOPICS,
  CISA_CRAM_FRAMEWORKS,
  startCramMode,
  getTodaysStudyPlan,
  getHighYieldTopics,
  getCramProgress,
  completeTopic,
  resetCramMode,
} from '../../services/cisaCramMode';

describe('cisaCramMode.ts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
    resetCramMode();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('CISA_CRAM_TOPICS', () => {
    it('should contain high-yield exam topics', () => {
      expect(CISA_CRAM_TOPICS).toBeDefined();
      expect(CISA_CRAM_TOPICS.length).toBeGreaterThan(0);
    });

    it('should have topics for all 5 domains', () => {
      const domains = new Set(CISA_CRAM_TOPICS.map(t => t.domain));
      expect(domains.has('CISA1')).toBe(true);
      expect(domains.has('CISA2')).toBe(true);
      expect(domains.has('CISA3')).toBe(true);
      expect(domains.has('CISA4')).toBe(true);
      expect(domains.has('CISA5')).toBe(true);
    });

    it('should have priority levels assigned', () => {
      CISA_CRAM_TOPICS.forEach(topic => {
        expect(['critical', 'high', 'medium']).toContain(topic.priority);
      });
    });

    it('should have estimated study times', () => {
      CISA_CRAM_TOPICS.forEach(topic => {
        expect(typeof topic.estimatedMinutes).toBe('number');
        expect(topic.estimatedMinutes).toBeGreaterThan(0);
      });
    });
  });

  describe('CISA_CRAM_FRAMEWORKS', () => {
    it('should contain major IT governance frameworks', () => {
      expect(CISA_CRAM_FRAMEWORKS).toBeDefined();
      expect(CISA_CRAM_FRAMEWORKS.length).toBeGreaterThanOrEqual(3);
    });

    it('should include COBIT framework', () => {
      const cobit = CISA_CRAM_FRAMEWORKS.find(f => 
        f.name.toLowerCase().includes('cobit')
      );
      expect(cobit).toBeDefined();
    });

    it('should include ITIL framework', () => {
      const itil = CISA_CRAM_FRAMEWORKS.find(f => 
        f.name.toLowerCase().includes('itil')
      );
      expect(itil).toBeDefined();
    });

    it('should include ISO 27001 standard', () => {
      const iso = CISA_CRAM_FRAMEWORKS.find(f => 
        f.name.includes('ISO') || f.name.includes('27001')
      );
      expect(iso).toBeDefined();
    });
  });

  describe('startCramMode', () => {
    it('should initialize cram mode', () => {
      const session = startCramMode();

      expect(session).toBeDefined();
      expect(session.currentDay).toBe(1);
      expect(session.isActive).toBe(true);
    });

    it('should save cram session to localStorage', () => {
      startCramMode();

      expect(localStorageMock.setItem).toHaveBeenCalled();
    });

    it('should initialize with empty completed topics', () => {
      const session = startCramMode();
      
      expect(session.completedTopics).toEqual([]);
      expect(session.frameworksReviewed).toEqual([]);
    });
  });

  describe('getTodaysStudyPlan', () => {
    it('should return daily study plan', () => {
      startCramMode();
      const plan = getTodaysStudyPlan();

      expect(plan).toBeDefined();
      expect(plan).toHaveProperty('topics');
      expect(plan).toHaveProperty('frameworks');
      expect(plan).toHaveProperty('day');
    });

    it('should include topics for today', () => {
      startCramMode();
      const plan = getTodaysStudyPlan();

      expect(Array.isArray(plan.topics)).toBe(true);
      expect(plan.topics.length).toBeGreaterThan(0);
    });

    it('should include framework review', () => {
      startCramMode();
      const plan = getTodaysStudyPlan();

      expect(Array.isArray(plan.frameworks)).toBe(true);
    });
  });

  describe('getHighYieldTopics', () => {
    it('should return high-yield topics sorted by priority', () => {
      const topics = getHighYieldTopics();

      expect(topics.length).toBeGreaterThan(0);
      
      // Critical topics should appear before medium
      const criticalIndex = topics.findIndex(t => t.priority === 'critical');
      const mediumIndex = topics.findIndex(t => t.priority === 'medium');
      
      if (criticalIndex !== -1 && mediumIndex !== -1) {
        expect(criticalIndex).toBeLessThan(mediumIndex);
      }
    });

    it('should filter by domain when specified', () => {
      const domain1Topics = getHighYieldTopics('CISA1');

      domain1Topics.forEach(topic => {
        expect(topic.domain).toBe('CISA1');
      });
    });

    it('should return topics with key points', () => {
      const topics = getHighYieldTopics();

      topics.forEach(topic => {
        expect(topic.keyPoints).toBeDefined();
        expect(Array.isArray(topic.keyPoints)).toBe(true);
      });
    });
  });

  describe('getCramProgress', () => {
    it('should return progress metrics', () => {
      startCramMode();
      const progress = getCramProgress();

      expect(progress).toHaveProperty('topicsCompleted');
      expect(progress).toHaveProperty('totalTopics');
      expect(progress).toHaveProperty('overallProgress');
      expect(progress).toHaveProperty('daysCompleted');
    });

    it('should start at 0 progress', () => {
      startCramMode();
      const progress = getCramProgress();

      expect(progress.topicsCompleted).toBe(0);
      expect(progress.daysCompleted).toBe(0);
    });

    it('should update after completing topics', () => {
      startCramMode();
      const topicId = CISA_CRAM_TOPICS[0].id;
      
      completeTopic(topicId);
      
      const progress = getCramProgress();
      expect(progress.topicsCompleted).toBe(1);
    });
  });

  describe('completeTopic', () => {
    it('should mark a topic as completed', () => {
      startCramMode();
      const topicId = CISA_CRAM_TOPICS[0].id;

      completeTopic(topicId);

      const progress = getCramProgress();
      expect(progress.topicsCompleted).toBe(1);
    });

    it('should save completion to localStorage', () => {
      startCramMode();
      localStorageMock.setItem.mockClear();
      
      const topicId = CISA_CRAM_TOPICS[0].id;
      completeTopic(topicId);

      expect(localStorageMock.setItem).toHaveBeenCalled();
    });

    it('should not double count completed topics', () => {
      startCramMode();
      const topicId = CISA_CRAM_TOPICS[0].id;

      completeTopic(topicId);
      completeTopic(topicId); // Mark same topic again

      const progress = getCramProgress();
      expect(progress.topicsCompleted).toBe(1);
    });
  });

  describe('resetCramMode', () => {
    it('should clear cram mode state', () => {
      startCramMode();
      completeTopic(CISA_CRAM_TOPICS[0].id);

      resetCramMode();

      // resetCramMode saves empty state
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });

    it('should allow starting fresh cram session', () => {
      startCramMode();
      completeTopic(CISA_CRAM_TOPICS[0].id);
      
      resetCramMode();
      startCramMode();

      const progress = getCramProgress();
      expect(progress.topicsCompleted).toBe(0);
    });
  });
});

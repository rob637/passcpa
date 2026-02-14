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
  CISA_EXAM_CONFIG,
  startExam,
  submitExam,
  pauseExam,
  resumeExam,
  getExamStatistics,
  getDomainAnalytics,
  abandonExam,
  updateAnswer,
  getCurrentSession,
  ExamQuestion,
} from '../../services/cisaExamSimulator';

// Helper to create mock questions
function createMockQuestions(count: number = 200): ExamQuestion[] {
  const domains = ['CISA1', 'CISA2', 'CISA3', 'CISA4', 'CISA5'] as const;
  return Array.from({ length: count }, (_, i) => ({
    id: `q${i}`,
    domain: domains[i % 5],
    question: `Question ${i}`,
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctAnswer: 0,
    explanation: `Explanation for question ${i}`,
    difficulty: 'medium' as const,
  }));
}

describe('cisaExamSimulator.ts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
    abandonExam();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('CISA_EXAM_CONFIG', () => {
    it('should match ISACA CISA exam specifications', () => {
      expect(CISA_EXAM_CONFIG.totalQuestions).toBe(150);
      expect(CISA_EXAM_CONFIG.timeLimit).toBe(240); // 4 hours in minutes
      expect(CISA_EXAM_CONFIG.passingScore).toBe(450);
    });

    it('should have correct domain distribution (question counts)', () => {
      const distribution = CISA_EXAM_CONFIG.domainDistribution;
      expect(distribution.CISA1).toBe(32); // 21% of 150
      expect(distribution.CISA2).toBe(24); // 16% of 150
      expect(distribution.CISA3).toBe(27); // 18% of 150
      expect(distribution.CISA4).toBe(30); // 20% of 150
      expect(distribution.CISA5).toBe(37); // 25% of 150
    });

    it('should have domain question counts summing to 150', () => {
      const total = Object.values(CISA_EXAM_CONFIG.domainDistribution).reduce(
        (sum, w) => sum + w,
        0
      );
      expect(total).toBe(150);
    });
  });

  describe('startExam', () => {
    it('should create a new exam session', () => {
      const mockQuestions = createMockQuestions(200);
      
      const session = startExam(mockQuestions);
      
      expect(session).toBeDefined();
      expect(session.status).toBe('in-progress');
      expect(session.startTime).toBeDefined();
    });

    it('should save session to localStorage', () => {
      const mockQuestions = createMockQuestions(200);
      
      startExam(mockQuestions);
      
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });

    it('should initialize answers as empty', () => {
      const mockQuestions = createMockQuestions(200);
      
      const session = startExam(mockQuestions);
      
      expect(session.answers).toBeDefined();
      // All answers should have selectedAnswer as null initially
      session.answers.forEach((answer) => {
        expect(answer.selectedAnswer).toBeNull();
      });
    });
  });

  describe('submitExam', () => {
    it('should calculate results after submission', () => {
      const mockQuestions = createMockQuestions(200);
      
      startExam(mockQuestions);
      
      // Answer some questions
      updateAnswer('q0', 0, 30); // correct
      updateAnswer('q1', 1, 25); // incorrect
      
      const results = submitExam();
      
      expect(results).toBeDefined();
      expect(results!.totalQuestions).toBe(150);
    });

    it('should mark exam as complete', () => {
      const mockQuestions = createMockQuestions(200);
      
      startExam(mockQuestions);
      const results = submitExam();
      
      expect(results).toBeDefined();
    });
  });

  describe('pauseExam / resumeExam', () => {
    it('should pause an active exam', () => {
      const mockQuestions = createMockQuestions(200);
      
      startExam(mockQuestions);
      pauseExam();
      
      const session = getCurrentSession();
      expect(session?.status).toBe('paused');
    });

    it('should resume a paused exam', () => {
      const mockQuestions = createMockQuestions(200);
      
      startExam(mockQuestions);
      pauseExam();
      
      const resumed = resumeExam();
      expect(resumed).toBeDefined();
    });
  });

  describe('getExamStatistics', () => {
    it('should return exam history statistics', () => {
      const stats = getExamStatistics();
      
      expect(stats).toHaveProperty('totalExams');
      expect(stats).toHaveProperty('averageScore');
      expect(stats).toHaveProperty('passedExams');
      expect(stats).toHaveProperty('bestScore');
      expect(typeof stats.totalExams).toBe('number');
    });
  });

  describe('getDomainAnalytics', () => {
    it('should return domain-level performance data', () => {
      const analytics = getDomainAnalytics();
      
      expect(analytics).toHaveProperty('CISA1');
      expect(analytics).toHaveProperty('CISA2');
      expect(analytics).toHaveProperty('CISA3');
      expect(analytics).toHaveProperty('CISA4');
      expect(analytics).toHaveProperty('CISA5');
    });
  });

  describe('abandonExam', () => {
    it('should clear current exam session', () => {
      const mockQuestions = createMockQuestions(200);
      
      startExam(mockQuestions);
      abandonExam();
      
      const session = getCurrentSession();
      expect(session).toBeNull();
    });
  });
});

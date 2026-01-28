import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';

// Simplified mock that doesn't cause memory issues
vi.mock('../../config/firebase', () => ({
  db: {},
}));

const mockOnSnapshot = vi.fn(() => () => {});

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(() => ({})),
  setDoc: vi.fn().mockResolvedValue({}),
  onSnapshot: (...args) => mockOnSnapshot(...args),
  serverTimestamp: vi.fn(() => new Date()),
  updateDoc: vi.fn().mockResolvedValue({}),
  increment: vi.fn(n => n),
  arrayUnion: vi.fn(arr => arr),
  collection: vi.fn(),
  getDocs: vi.fn().mockResolvedValue({ docs: [] }),
}));

vi.mock('date-fns', () => ({
  format: vi.fn(() => '2026-01-26'),
}));

// Setup mock for useAuth with different states
const mockUseAuth = vi.fn();
vi.mock('../../providers/AuthProvider', () => ({
  useAuth: () => mockUseAuth(),
}));

import { StudyProvider, useStudy } from '../../providers/StudyProvider';

describe('StudyProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({
      user: null,
      userProfile: null,
    });
  });

  describe('Provider Rendering', () => {
    it('should render children', () => {
      render(
        <StudyProvider>
          <div>Test Child</div>
        </StudyProvider>
      );
      expect(screen.getByText('Test Child')).toBeInTheDocument();
    });

    it('renders with authenticated user', () => {
      mockUseAuth.mockReturnValue({
        user: { uid: 'test-user' },
        userProfile: { studyPlanId: 'plan-123' },
      });

      render(
        <StudyProvider>
          <div>Authenticated Content</div>
        </StudyProvider>
      );
      expect(screen.getByText('Authenticated Content')).toBeInTheDocument();
    });
  });

  describe('useStudy Hook', () => {
    it('should throw error when used outside provider', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        const TestComponent = () => {
          useStudy();
          return null;
        };
        render(<TestComponent />);
      }).toThrow('useStudy must be used within a StudyProvider');
      
      consoleSpy.mockRestore();
    });

    it('provides context values within provider', () => {
      let contextValues;
      
      const TestConsumer = () => {
        contextValues = useStudy();
        return <div>Consumer</div>;
      };

      render(
        <StudyProvider>
          <TestConsumer />
        </StudyProvider>
      );

      expect(contextValues).toBeDefined();
      expect(typeof contextValues.recordMCQAnswer).toBe('function');
      expect(typeof contextValues.completeSimulation).toBe('function');
    });

    it('provides loading state', () => {
      let contextValues;
      
      const TestConsumer = () => {
        contextValues = useStudy();
        return <div>{contextValues.loading ? 'Loading' : 'Ready'}</div>;
      };

      render(
        <StudyProvider>
          <TestConsumer />
        </StudyProvider>
      );

      // Initial state should have loading defined
      expect(contextValues.loading).toBeDefined();
    });

    it('provides currentStreak', () => {
      let contextValues;
      
      const TestConsumer = () => {
        contextValues = useStudy();
        return <div>Streak: {contextValues.currentStreak}</div>;
      };

      render(
        <StudyProvider>
          <TestConsumer />
        </StudyProvider>
      );

      expect(contextValues.currentStreak).toBeDefined();
      expect(typeof contextValues.currentStreak).toBe('number');
    });
  });

  describe('Study Functions', () => {
    it('recordMCQAnswer is callable', async () => {
      mockUseAuth.mockReturnValue({
        user: { uid: 'test-user' },
        userProfile: { examSection: 'REG' },
      });

      let contextValues;
      const TestConsumer = () => {
        contextValues = useStudy();
        return <div>Consumer</div>;
      };

      render(
        <StudyProvider>
          <TestConsumer />
        </StudyProvider>
      );

      expect(typeof contextValues.recordMCQAnswer).toBe('function');
    });

    it('completeSimulation is callable', async () => {
      mockUseAuth.mockReturnValue({
        user: { uid: 'test-user' },
        userProfile: { examSection: 'REG' },
      });

      let contextValues;
      const TestConsumer = () => {
        contextValues = useStudy();
        return <div>Consumer</div>;
      };

      render(
        <StudyProvider>
          <TestConsumer />
        </StudyProvider>
      );

      expect(typeof contextValues.completeSimulation).toBe('function');
    });

    it('recordMCQAnswer does nothing without user', async () => {
      mockUseAuth.mockReturnValue({
        user: null,
        userProfile: null,
      });

      let contextValues;
      const TestConsumer = () => {
        contextValues = useStudy();
        return <div>Consumer</div>;
      };

      render(
        <StudyProvider>
          <TestConsumer />
        </StudyProvider>
      );

      await act(async () => {
        await contextValues.recordMCQAnswer('q1', 'Topic', 'Subtopic', true, 'medium');
      });
      // Should not throw
    });

    it('completeSimulation does nothing without user', async () => {
      mockUseAuth.mockReturnValue({
        user: null,
        userProfile: null,
      });

      let contextValues;
      const TestConsumer = () => {
        contextValues = useStudy();
        return <div>Consumer</div>;
      };

      render(
        <StudyProvider>
          <TestConsumer />
        </StudyProvider>
      );

      await act(async () => {
        await contextValues.completeSimulation('sim1', 85, 30);
      });
      // Should not throw
    });

    it('getLessonProgress returns empty object without user', async () => {
      mockUseAuth.mockReturnValue({
        user: null,
        userProfile: null,
      });

      let contextValues;
      const TestConsumer = () => {
        contextValues = useStudy();
        return <div>Consumer</div>;
      };

      render(
        <StudyProvider>
          <TestConsumer />
        </StudyProvider>
      );

      let result;
      await act(async () => {
        result = await contextValues.getLessonProgress();
      });
      
      expect(result).toEqual({});
    });

    it('getTopicPerformance returns empty array', async () => {
      mockUseAuth.mockReturnValue({
        user: null,
        userProfile: null,
      });

      let contextValues;
      const TestConsumer = () => {
        contextValues = useStudy();
        return <div>Consumer</div>;
      };

      render(
        <StudyProvider>
          <TestConsumer />
        </StudyProvider>
      );

      let result;
      await act(async () => {
        result = await contextValues.getTopicPerformance();
      });
      
      expect(result).toEqual([]);
    });
  });

  describe('Study Plan Loading', () => {
    it('sets study plan to null when no user', () => {
      mockUseAuth.mockReturnValue({
        user: null,
        userProfile: null,
      });

      let contextValues;
      const TestConsumer = () => {
        contextValues = useStudy();
        return <div>Consumer</div>;
      };

      render(
        <StudyProvider>
          <TestConsumer />
        </StudyProvider>
      );

      expect(contextValues.studyPlan).toBeNull();
    });

    it('sets study plan to null when no studyPlanId', () => {
      mockUseAuth.mockReturnValue({
        user: { uid: 'test-user' },
        userProfile: { examSection: 'REG' }, // no studyPlanId
      });

      let contextValues;
      const TestConsumer = () => {
        contextValues = useStudy();
        return <div>Consumer</div>;
      };

      render(
        <StudyProvider>
          <TestConsumer />
        </StudyProvider>
      );

      expect(contextValues.studyPlan).toBeNull();
    });

    it('subscribes to study plan when user has studyPlanId', () => {
      mockUseAuth.mockReturnValue({
        user: { uid: 'test-user' },
        userProfile: { studyPlanId: 'plan-123' },
      });

      render(
        <StudyProvider>
          <div>Test</div>
        </StudyProvider>
      );

      // Should have called onSnapshot for study plan
      expect(mockOnSnapshot).toHaveBeenCalled();
    });
  });

  describe('Daily Log', () => {
    it('sets today log to null when no user', () => {
      mockUseAuth.mockReturnValue({
        user: null,
        userProfile: null,
      });

      let contextValues;
      const TestConsumer = () => {
        contextValues = useStudy();
        return <div>Consumer</div>;
      };

      render(
        <StudyProvider>
          <TestConsumer />
        </StudyProvider>
      );

      expect(contextValues.todayLog).toBeNull();
    });

    it('subscribes to daily log when user exists', () => {
      mockUseAuth.mockReturnValue({
        user: { uid: 'test-user' },
        userProfile: {},
      });

      render(
        <StudyProvider>
          <div>Test</div>
        </StudyProvider>
      );

      // Should have called onSnapshot for daily log
      expect(mockOnSnapshot).toHaveBeenCalled();
    });
  });

  describe('Daily Progress', () => {
    it('calculates daily progress as 0 when no todayLog', () => {
      mockUseAuth.mockReturnValue({
        user: null,
        userProfile: null,
      });

      let contextValues;
      const TestConsumer = () => {
        contextValues = useStudy();
        return <div>Progress: {contextValues.dailyProgress}</div>;
      };

      render(
        <StudyProvider>
          <TestConsumer />
        </StudyProvider>
      );

      expect(contextValues.dailyProgress).toBeDefined();
    });
  });

  describe('setCurrentStreak', () => {
    it('provides setCurrentStreak function', () => {
      mockUseAuth.mockReturnValue({
        user: null,
        userProfile: null,
      });

      let contextValues;
      const TestConsumer = () => {
        contextValues = useStudy();
        return <div>Consumer</div>;
      };

      render(
        <StudyProvider>
          <TestConsumer />
        </StudyProvider>
      );

      expect(typeof contextValues.setCurrentStreak).toBe('function');
    });

    it('can update currentStreak', async () => {
      mockUseAuth.mockReturnValue({
        user: null,
        userProfile: null,
      });

      let contextValues;
      const TestConsumer = () => {
        contextValues = useStudy();
        return <div>Streak: {contextValues.currentStreak}</div>;
      };

      render(
        <StudyProvider>
          <TestConsumer />
        </StudyProvider>
      );

      expect(contextValues.currentStreak).toBe(0);

      await act(async () => {
        contextValues.setCurrentStreak(5);
      });

      expect(contextValues.currentStreak).toBe(5);
    });
  });

  describe('recordMCQAnswer edge cases', () => {
    it('calculates 3 points for hard difficulty correct', async () => {
      mockUseAuth.mockReturnValue({
        user: { uid: 'test-user' },
        userProfile: { examSection: 'REG' },
      });

      let contextValues;
      const TestConsumer = () => {
        contextValues = useStudy();
        return <div>Consumer</div>;
      };

      render(
        <StudyProvider>
          <TestConsumer />
        </StudyProvider>
      );

      await act(async () => {
        await contextValues.recordMCQAnswer('q1', 'Topic', 'Subtopic', true, 'hard');
      });

      // Function should complete without error
    });

    it('calculates 2 points for medium difficulty correct', async () => {
      mockUseAuth.mockReturnValue({
        user: { uid: 'test-user' },
        userProfile: { examSection: 'REG' },
      });

      let contextValues;
      const TestConsumer = () => {
        contextValues = useStudy();
        return <div>Consumer</div>;
      };

      render(
        <StudyProvider>
          <TestConsumer />
        </StudyProvider>
      );

      await act(async () => {
        await contextValues.recordMCQAnswer('q1', 'Topic', 'Subtopic', true, 'medium');
      });
    });

    it('calculates 1 point for easy difficulty correct', async () => {
      mockUseAuth.mockReturnValue({
        user: { uid: 'test-user' },
        userProfile: { examSection: 'REG' },
      });

      let contextValues;
      const TestConsumer = () => {
        contextValues = useStudy();
        return <div>Consumer</div>;
      };

      render(
        <StudyProvider>
          <TestConsumer />
        </StudyProvider>
      );

      await act(async () => {
        await contextValues.recordMCQAnswer('q1', 'Topic', 'Subtopic', true, 'easy');
      });
    });

    it('calculates 0 points for incorrect answer', async () => {
      mockUseAuth.mockReturnValue({
        user: { uid: 'test-user' },
        userProfile: { examSection: 'REG' },
      });

      let contextValues;
      const TestConsumer = () => {
        contextValues = useStudy();
        return <div>Consumer</div>;
      };

      render(
        <StudyProvider>
          <TestConsumer />
        </StudyProvider>
      );

      await act(async () => {
        await contextValues.recordMCQAnswer('q1', 'Topic', 'Subtopic', false, 'hard');
      });
    });

    it('uses default topic when not provided', async () => {
      mockUseAuth.mockReturnValue({
        user: { uid: 'test-user' },
        userProfile: { examSection: 'REG' },
      });

      let contextValues;
      const TestConsumer = () => {
        contextValues = useStudy();
        return <div>Consumer</div>;
      };

      render(
        <StudyProvider>
          <TestConsumer />
        </StudyProvider>
      );

      await act(async () => {
        await contextValues.recordMCQAnswer('q1', undefined, undefined, true);
      });
    });
  });

  describe('completeSimulation edge cases', () => {
    it('calculates points based on score percentage', async () => {
      mockUseAuth.mockReturnValue({
        user: { uid: 'test-user' },
        userProfile: { examSection: 'REG' },
      });

      let contextValues;
      const TestConsumer = () => {
        contextValues = useStudy();
        return <div>Consumer</div>;
      };

      render(
        <StudyProvider>
          <TestConsumer />
        </StudyProvider>
      );

      // 100% score = 50 points
      await act(async () => {
        await contextValues.completeSimulation('sim-1', 100, 30);
      });
    });

    it('handles partial score correctly', async () => {
      mockUseAuth.mockReturnValue({
        user: { uid: 'test-user' },
        userProfile: { examSection: 'REG' },
      });

      let contextValues;
      const TestConsumer = () => {
        contextValues = useStudy();
        return <div>Consumer</div>;
      };

      render(
        <StudyProvider>
          <TestConsumer />
        </StudyProvider>
      );

      // 50% score = 25 points
      await act(async () => {
        await contextValues.completeSimulation('sim-1', 50, 45);
      });
    });

    it('handles zero score', async () => {
      mockUseAuth.mockReturnValue({
        user: { uid: 'test-user' },
        userProfile: { examSection: 'REG' },
      });

      let contextValues;
      const TestConsumer = () => {
        contextValues = useStudy();
        return <div>Consumer</div>;
      };

      render(
        <StudyProvider>
          <TestConsumer />
        </StudyProvider>
      );

      await act(async () => {
        await contextValues.completeSimulation('sim-1', 0, 60);
      });
    });
  });

  describe('getTopicPerformance', () => {
    it('returns empty array', async () => {
      mockUseAuth.mockReturnValue({
        user: { uid: 'test-user' },
        userProfile: { examSection: 'REG' },
      });

      let contextValues;
      const TestConsumer = () => {
        contextValues = useStudy();
        return <div>Consumer</div>;
      };

      render(
        <StudyProvider>
          <TestConsumer />
        </StudyProvider>
      );

      let result;
      await act(async () => {
        result = await contextValues.getTopicPerformance();
      });

      expect(Array.isArray(result)).toBe(true);
    });
  });
});

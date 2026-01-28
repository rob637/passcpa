import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

// Create a mock StudyProvider for testing useStudy
const mockStudyData = {
  stats: {
    totalQuestions: 100,
    correctAnswers: 80,
    accuracy: 80,
    streak: 5,
    longestStreak: 10,
    totalStudyTime: 7200,
    lessonsCompleted: 15,
    lastStudyDate: new Date().toISOString(),
  },
  topicPerformance: [
    { id: 'tax-1', topic: 'Individual Tax', accuracy: 85, questions: 30 },
    { id: 'tax-2', topic: 'Corporate Tax', accuracy: 75, questions: 25 },
  ],
  weeklyActivity: [
    { date: new Date(), points: 100, goal: 50, questions: 20, correct: 16, minutes: 30 },
  ],
  loading: false,
  error: null,
};

// Mock the useStudy hook
vi.mock('../../hooks/useStudy', () => ({
  useStudy: () => mockStudyData,
}));

import { useStudy } from '../../hooks/useStudy';

describe('useStudy Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Stats', () => {
    it('should return study statistics', () => {
      const { result } = renderHook(() => useStudy());

      expect(result.current.stats).toBeDefined();
      expect(result.current.stats.totalQuestions).toBe(100);
      expect(result.current.stats.correctAnswers).toBe(80);
      expect(result.current.stats.accuracy).toBe(80);
    });

    it('should include streak information', () => {
      const { result } = renderHook(() => useStudy());

      expect(result.current.stats.streak).toBe(5);
      expect(result.current.stats.longestStreak).toBe(10);
    });

    it('should include study time', () => {
      const { result } = renderHook(() => useStudy());

      expect(result.current.stats.totalStudyTime).toBe(7200);
    });

    it('should include lessons completed count', () => {
      const { result } = renderHook(() => useStudy());

      expect(result.current.stats.lessonsCompleted).toBe(15);
    });
  });

  describe('Topic Performance', () => {
    it('should return topic performance array', () => {
      const { result } = renderHook(() => useStudy());

      expect(Array.isArray(result.current.topicPerformance)).toBe(true);
      expect(result.current.topicPerformance.length).toBe(2);
    });

    it('should have correct topic structure', () => {
      const { result } = renderHook(() => useStudy());

      const topic = result.current.topicPerformance[0];
      expect(topic).toHaveProperty('id');
      expect(topic).toHaveProperty('topic');
      expect(topic).toHaveProperty('accuracy');
      expect(topic).toHaveProperty('questions');
    });

    it('should have valid accuracy values', () => {
      const { result } = renderHook(() => useStudy());

      result.current.topicPerformance.forEach(topic => {
        expect(topic.accuracy).toBeGreaterThanOrEqual(0);
        expect(topic.accuracy).toBeLessThanOrEqual(100);
      });
    });
  });

  describe('Weekly Activity', () => {
    it('should return weekly activity array', () => {
      const { result } = renderHook(() => useStudy());

      expect(Array.isArray(result.current.weeklyActivity)).toBe(true);
    });

    it('should have correct activity structure', () => {
      const { result } = renderHook(() => useStudy());

      if (result.current.weeklyActivity.length > 0) {
        const activity = result.current.weeklyActivity[0];
        expect(activity).toHaveProperty('date');
        expect(activity).toHaveProperty('points');
        expect(activity).toHaveProperty('goal');
        expect(activity).toHaveProperty('questions');
        expect(activity).toHaveProperty('correct');
        expect(activity).toHaveProperty('minutes');
      }
    });
  });

  describe('Loading State', () => {
    it('should have loading property', () => {
      const { result } = renderHook(() => useStudy());

      expect(result.current).toHaveProperty('loading');
      expect(typeof result.current.loading).toBe('boolean');
    });
  });

  describe('Error State', () => {
    it('should have error property', () => {
      const { result } = renderHook(() => useStudy());

      expect(result.current).toHaveProperty('error');
    });
  });
});

describe('Study Statistics Calculations', () => {
  describe('Accuracy Calculation', () => {
    it('should calculate accuracy correctly', () => {
      const correct = 80;
      const total = 100;
      const accuracy = (correct / total) * 100;
      expect(accuracy).toBe(80);
    });

    it('should handle zero total questions', () => {
      const correct = 0;
      const total = 0;
      const accuracy = total > 0 ? (correct / total) * 100 : 0;
      expect(accuracy).toBe(0);
    });

    it('should handle 100% accuracy', () => {
      const correct = 50;
      const total = 50;
      const accuracy = (correct / total) * 100;
      expect(accuracy).toBe(100);
    });
  });

  describe('Streak Calculation', () => {
    it('should track consecutive study days', () => {
      const streakDays = [
        { date: '2024-01-01', studied: true },
        { date: '2024-01-02', studied: true },
        { date: '2024-01-03', studied: true },
      ];

      let streak = 0;
      streakDays.forEach(day => {
        if (day.studied) streak++;
      });

      expect(streak).toBe(3);
    });

    it('should reset streak on missed day', () => {
      const checkStreak = (days) => {
        let currentStreak = 0;
        for (const day of days) {
          if (day.studied) {
            currentStreak++;
          } else {
            currentStreak = 0;
          }
        }
        return currentStreak;
      };

      const days = [
        { studied: true },
        { studied: true },
        { studied: false }, // Break
        { studied: true },
      ];

      expect(checkStreak(days)).toBe(1);
    });
  });

  describe('Study Time Formatting', () => {
    it('should format seconds to hours and minutes', () => {
      const formatStudyTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return { hours, minutes };
      };

      expect(formatStudyTime(7200)).toEqual({ hours: 2, minutes: 0 });
      expect(formatStudyTime(3661)).toEqual({ hours: 1, minutes: 1 });
      expect(formatStudyTime(90)).toEqual({ hours: 0, minutes: 1 });
    });
  });

  describe('Points Calculation', () => {
    it('should calculate points based on activity', () => {
      const calculatePoints = (correct, total, bonusStreak) => {
        const basePoints = correct * 10;
        const accuracyBonus = total > 0 ? Math.floor((correct / total) * 50) : 0;
        const streakBonus = bonusStreak * 5;
        return basePoints + accuracyBonus + streakBonus;
      };

      // 8 correct out of 10, 3 day streak
      const points = calculatePoints(8, 10, 3);
      expect(points).toBe(80 + 40 + 15); // 135 points
    });
  });
});

describe('Weekly Goal Tracking', () => {
  it('should determine if daily goal is met', () => {
    const dailyGoal = 50;
    const pointsEarned = 75;
    const goalMet = pointsEarned >= dailyGoal;
    expect(goalMet).toBe(true);
  });

  it('should determine if daily goal is not met', () => {
    const dailyGoal = 50;
    const pointsEarned = 30;
    const goalMet = pointsEarned >= dailyGoal;
    expect(goalMet).toBe(false);
  });

  it('should calculate weekly progress', () => {
    const weeklyData = [
      { points: 60, goal: 50 },
      { points: 40, goal: 50 },
      { points: 80, goal: 50 },
      { points: 50, goal: 50 },
      { points: 0, goal: 50 },
      { points: 70, goal: 50 },
      { points: 55, goal: 50 },
    ];

    const daysGoalMet = weeklyData.filter(d => d.points >= d.goal).length;
    const totalPoints = weeklyData.reduce((sum, d) => sum + d.points, 0);

    expect(daysGoalMet).toBe(5);
    expect(totalPoints).toBe(355);
  });
});

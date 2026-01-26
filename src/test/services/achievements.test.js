import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  ACHIEVEMENTS,
  checkAchievements,
  calculateLevel,
  getUnlockedAchievements,
  getAchievementsByCategory,
  getAchievementProgress,
} from '../../services/achievements';

describe('Achievements Service', () => {
  describe('ACHIEVEMENTS constant', () => {
    it('should have streak achievements', () => {
      expect(ACHIEVEMENTS.streak_3).toBeDefined();
      expect(ACHIEVEMENTS.streak_7).toBeDefined();
      expect(ACHIEVEMENTS.streak_30).toBeDefined();
      expect(ACHIEVEMENTS.streak_100).toBeDefined();
    });

    it('should have questions achievements', () => {
      expect(ACHIEVEMENTS.questions_100).toBeDefined();
      expect(ACHIEVEMENTS.questions_500).toBeDefined();
      expect(ACHIEVEMENTS.questions_1000).toBeDefined();
      expect(ACHIEVEMENTS.questions_5000).toBeDefined();
    });

    it('should have accuracy achievements', () => {
      expect(ACHIEVEMENTS.accuracy_80).toBeDefined();
      expect(ACHIEVEMENTS.accuracy_90).toBeDefined();
      expect(ACHIEVEMENTS.perfect_session).toBeDefined();
    });

    it('should have required fields for each achievement', () => {
      Object.values(ACHIEVEMENTS).forEach((achievement) => {
        expect(achievement.id).toBeDefined();
        expect(achievement.name).toBeDefined();
        expect(achievement.description).toBeDefined();
        expect(achievement.icon).toBeDefined();
        expect(achievement.category).toBeDefined();
        expect(achievement.requirement).toBeDefined();
        expect(achievement.points).toBeDefined();
      });
    });
  });

  describe('checkAchievements', () => {
    it('should return empty array when no achievements earned', () => {
      const stats = { streak: 0, totalQuestions: 0, accuracy: 0 };
      const result = checkAchievements(stats, []);
      expect(result).toEqual([]);
    });

    it('should detect streak achievement', () => {
      const stats = { streak: 3, totalQuestions: 0, accuracy: 0 };
      const result = checkAchievements(stats, []);
      expect(result.some((a) => a.id === 'streak_3')).toBe(true);
    });

    it('should detect questions achievement', () => {
      const stats = { streak: 0, totalQuestions: 100, accuracy: 50 };
      const result = checkAchievements(stats, []);
      expect(result.some((a) => a.id === 'questions_100')).toBe(true);
    });

    it('should detect accuracy achievement with min questions', () => {
      const stats = { streak: 0, totalQuestions: 50, accuracy: 80 };
      const result = checkAchievements(stats, []);
      expect(result.some((a) => a.id === 'accuracy_80')).toBe(true);
    });

    it('should not detect accuracy achievement without min questions', () => {
      const stats = { streak: 0, totalQuestions: 10, accuracy: 80 };
      const result = checkAchievements(stats, []);
      expect(result.some((a) => a.id === 'accuracy_80')).toBe(false);
    });

    it('should not return already earned achievements', () => {
      const stats = { streak: 7, totalQuestions: 0, accuracy: 0 };
      const alreadyEarned = ['streak_3', 'streak_7'];
      const result = checkAchievements(stats, alreadyEarned);
      expect(result.some((a) => a.id === 'streak_3')).toBe(false);
      expect(result.some((a) => a.id === 'streak_7')).toBe(false);
    });

    it('should detect perfect session achievement', () => {
      const stats = { perfectSessions: 1, totalQuestions: 10 };
      const result = checkAchievements(stats, []);
      expect(result.some((a) => a.id === 'perfect_session')).toBe(true);
    });

    it('should detect multiple achievements at once', () => {
      const stats = { streak: 7, totalQuestions: 100, accuracy: 80 };
      const result = checkAchievements(stats, []);
      // Should have streak_3, streak_7, questions_100
      expect(result.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('calculateLevel', () => {
    it('should return level 1 for 0 XP', () => {
      const result = calculateLevel(0);
      expect(result.level).toBe(1);
    });

    it('should return level 1 for XP < 400', () => {
      const result = calculateLevel(399);
      expect(result.level).toBe(1);
    });

    it('should return level 2 for XP >= 400', () => {
      const result = calculateLevel(400);
      expect(result.level).toBe(2);
    });

    it('should return level 3 for XP >= 900', () => {
      const result = calculateLevel(900);
      expect(result.level).toBe(3);
    });

    it('should calculate next level XP correctly', () => {
      const result = calculateLevel(400);
      expect(result.nextLevelXp).toBe(900); // (2+1)^2 * 100 = 900
    });

    it('should calculate progress percentage', () => {
      const result = calculateLevel(650);
      // At 650 XP, level 2 (400-899), so progress = (650-400)/(900-400) = 250/500 = 50%
      expect(result.progress).toBe(50);
    });

    it('should handle high XP values', () => {
      const result = calculateLevel(10000);
      expect(result.level).toBe(10);
    });
  });

  describe('getUnlockedAchievements', () => {
    it('should return empty array for no achievements', () => {
      const result = getUnlockedAchievements([]);
      expect(result).toEqual([]);
    });

    it('should return matching achievements', () => {
      const result = getUnlockedAchievements(['streak_3', 'questions_100']);
      expect(result.length).toBe(2);
      expect(result.some((a) => a.id === 'streak_3')).toBe(true);
      expect(result.some((a) => a.id === 'questions_100')).toBe(true);
    });

    it('should ignore invalid achievement IDs', () => {
      const result = getUnlockedAchievements(['invalid_id', 'streak_3']);
      expect(result.length).toBe(1);
    });
  });

  describe('getAchievementsByCategory', () => {
    it('should return all achievements for "all" category', () => {
      const result = getAchievementsByCategory('all');
      expect(result.length).toBe(Object.keys(ACHIEVEMENTS).length);
    });

    it('should filter by streak category', () => {
      const result = getAchievementsByCategory('streak');
      result.forEach((a) => {
        expect(a.category).toBe('streak');
      });
      expect(result.length).toBeGreaterThan(0);
    });

    it('should filter by questions category', () => {
      const result = getAchievementsByCategory('questions');
      result.forEach((a) => {
        expect(a.category).toBe('questions');
      });
      expect(result.length).toBeGreaterThan(0);
    });

    it('should filter by accuracy category', () => {
      const result = getAchievementsByCategory('accuracy');
      result.forEach((a) => {
        expect(a.category).toBe('accuracy');
      });
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return empty array for invalid category', () => {
      const result = getAchievementsByCategory('invalid');
      expect(result).toEqual([]);
    });
  });

  describe('getAchievementProgress', () => {
    it('should return 0 for invalid achievement ID', () => {
      const result = getAchievementProgress('invalid_id', {});
      expect(result).toBe(0);
    });

    it('should calculate streak progress correctly', () => {
      const stats = { streak: 5 };
      const result = getAchievementProgress('streak_7', stats);
      expect(result.current).toBe(5);
      expect(result.target).toBe(7);
      expect(result.percent).toBe(71); // 5/7 = 71%
    });

    it('should calculate questions progress correctly', () => {
      const stats = { totalQuestions: 250 };
      const result = getAchievementProgress('questions_500', stats);
      expect(result.current).toBe(250);
      expect(result.target).toBe(500);
      expect(result.percent).toBe(50);
    });

    it('should cap progress at 100%', () => {
      const stats = { streak: 10 };
      const result = getAchievementProgress('streak_7', stats);
      expect(result.percent).toBe(100);
    });

    it('should handle missing stats gracefully', () => {
      const result = getAchievementProgress('streak_3', {});
      expect(result.current).toBe(0);
      expect(result.percent).toBe(0);
    });
  });
});

describe('Achievement Points', () => {
  it('should have increasing points for harder achievements', () => {
    expect(ACHIEVEMENTS.streak_3.points).toBeLessThan(ACHIEVEMENTS.streak_7.points);
    expect(ACHIEVEMENTS.streak_7.points).toBeLessThan(ACHIEVEMENTS.streak_30.points);
    expect(ACHIEVEMENTS.streak_30.points).toBeLessThan(ACHIEVEMENTS.streak_100.points);
  });

  it('should have reasonable point values', () => {
    Object.values(ACHIEVEMENTS).forEach((achievement) => {
      expect(achievement.points).toBeGreaterThan(0);
      expect(achievement.points).toBeLessThanOrEqual(2000);
    });
  });
});

describe('Achievement Categories', () => {
  it('should have all required categories', () => {
    const categories = new Set(Object.values(ACHIEVEMENTS).map((a) => a.category));
    expect(categories.has('streak')).toBe(true);
    expect(categories.has('questions')).toBe(true);
    expect(categories.has('accuracy')).toBe(true);
  });
});

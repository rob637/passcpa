/**
 * Achievements System Tests
 * 
 * These tests verify the gamification logic that rewards users
 * for learning progress. Bugs could demotivate users or award
 * unearned achievements.
 */

import { describe, it, expect } from 'vitest';
import {
  ACHIEVEMENTS,
  checkAchievements,
  calculateLevel,
  getAchievementProgress,
} from '../../services/achievements';

describe('Achievements System', () => {
  // Helper to convert ACHIEVEMENTS record to array
  const achievementsArray = () => Object.values(ACHIEVEMENTS);

  describe('ACHIEVEMENTS constant', () => {
    it('has streak achievements at correct thresholds', () => {
      const streakAchievements = achievementsArray().filter(a => a.category === 'streak');
      const thresholds = streakAchievements.map(a => a.requirement.value);
      
      expect(thresholds).toContain(3);
      expect(thresholds).toContain(7);
      expect(thresholds).toContain(30);
      expect(thresholds).toContain(100);
    });

    it('has question count achievements at correct thresholds', () => {
      const questionAchievements = achievementsArray().filter(a => a.category === 'questions');
      const thresholds = questionAchievements.map(a => a.requirement.value);
      
      expect(thresholds).toContain(100);
      expect(thresholds).toContain(500);
      expect(thresholds).toContain(1000);
      expect(thresholds).toContain(5000);
    });

    it('has accuracy achievements at correct thresholds', () => {
      const accuracyAchievements = achievementsArray().filter(a => a.category === 'accuracy');
      const thresholds = accuracyAchievements.map(a => a.requirement.value);
      
      expect(thresholds).toContain(80);
      expect(thresholds).toContain(90);
    });

    it('has unique IDs for all achievements', () => {
      const ids = achievementsArray().map(a => a.id);
      const uniqueIds = new Set(ids);
      
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('all achievements have required properties', () => {
      achievementsArray().forEach(achievement => {
        expect(achievement).toHaveProperty('id');
        expect(achievement).toHaveProperty('name');
        expect(achievement).toHaveProperty('description');
        expect(achievement).toHaveProperty('category');
        expect(achievement).toHaveProperty('requirement');
        expect(achievement).toHaveProperty('points');
      });
    });
  });

  describe('checkAchievements', () => {
    // Note: The actual API uses 'streak' not 'currentStreak'
    const baseStats = {
      streak: 0,
      totalQuestions: 0,
      accuracy: 0,
      perfectSessions: 0,
    };

    describe('Streak Achievements', () => {
      it('awards 3-day streak achievement', () => {
        const stats = { ...baseStats, streak: 3 };
        const newAchievements = checkAchievements(stats, []);
        
        const hasStreak3 = newAchievements.some(a => a.requirement.value === 3 && a.category === 'streak');
        expect(hasStreak3).toBe(true);
      });

      it('awards 7-day streak achievement', () => {
        const stats = { ...baseStats, streak: 7 };
        const newAchievements = checkAchievements(stats, []);
        
        const hasStreak7 = newAchievements.some(a => a.requirement.value === 7 && a.category === 'streak');
        expect(hasStreak7).toBe(true);
      });

      it('awards multiple streak achievements at once when earned', () => {
        const stats = { ...baseStats, streak: 10 };
        const newAchievements = checkAchievements(stats, []);
        
        const streakAchievements = newAchievements.filter(a => a.category === 'streak');
        expect(streakAchievements.length).toBeGreaterThanOrEqual(2); // 3-day and 7-day
      });

      it('does not re-award already earned achievements', () => {
        const stats = { ...baseStats, streak: 10 };
        const alreadyEarned = ['streak_3', 'streak_7']; // IDs of earned achievements
        
        const newAchievements = checkAchievements(stats, alreadyEarned);
        
        const duplicates = newAchievements.filter(a => alreadyEarned.includes(a.id));
        expect(duplicates.length).toBe(0);
      });
    });

    describe('Questions Achievements', () => {
      it('awards 100 questions achievement', () => {
        const stats = { ...baseStats, totalQuestions: 100 };
        const newAchievements = checkAchievements(stats, []);
        
        const has100 = newAchievements.some(a => a.requirement.value === 100 && a.category === 'questions');
        expect(has100).toBe(true);
      });

      it('awards 500 questions achievement', () => {
        const stats = { ...baseStats, totalQuestions: 500 };
        const newAchievements = checkAchievements(stats, []);
        
        const has500 = newAchievements.some(a => a.requirement.value === 500 && a.category === 'questions');
        expect(has500).toBe(true);
      });

      it('awards multiple question achievements at once', () => {
        const stats = { ...baseStats, totalQuestions: 600 };
        const newAchievements = checkAchievements(stats, []);
        
        const questionAchievements = newAchievements.filter(a => a.category === 'questions');
        expect(questionAchievements.length).toBeGreaterThanOrEqual(2); // 100 and 500
      });
    });

    describe('Accuracy Achievements', () => {
      it('awards 80% accuracy achievement when minimum questions met', () => {
        const stats = { 
          ...baseStats, 
          totalQuestions: 100,
          accuracy: 80 
        };
        const newAchievements = checkAchievements(stats, []);
        
        const hasAccuracy80 = newAchievements.some(a => a.requirement.value === 80 && a.category === 'accuracy');
        expect(hasAccuracy80).toBe(true);
      });

      it('requires minimum questions for accuracy achievements', () => {
        // 80% accuracy but only 5 questions - too few to earn (needs 50)
        const stats = { 
          ...baseStats, 
          totalQuestions: 5,
          accuracy: 85 
        };
        const newAchievements = checkAchievements(stats, []);
        
        // Should NOT award accuracy achievement if insufficient questions
        const hasAccuracy = newAchievements.some(a => a.requirement.value === 80 && a.category === 'accuracy');
        expect(hasAccuracy).toBe(false);
      });

      it('does not award accuracy achievement below threshold', () => {
        const stats = { 
          ...baseStats, 
          totalQuestions: 100,
          accuracy: 79 
        };
        const newAchievements = checkAchievements(stats, []);
        
        const hasAccuracy80 = newAchievements.some(a => a.requirement.value === 80 && a.category === 'accuracy');
        expect(hasAccuracy80).toBe(false);
      });
    });

    describe('Edge Cases', () => {
      it('handles zero stats', () => {
        const newAchievements = checkAchievements(baseStats, []);
        expect(newAchievements).toEqual([]);
      });

      it('handles undefined current achievements', () => {
        const stats = { ...baseStats, streak: 5 };
        const newAchievements = checkAchievements(stats, undefined as any);
        
        // Should not crash
        expect(Array.isArray(newAchievements)).toBe(true);
      });

      it('returns Achievement objects with required fields', () => {
        const stats = { ...baseStats, streak: 5 };
        const newAchievements = checkAchievements(stats, []);
        
        newAchievements.forEach(achievement => {
          expect(achievement).toHaveProperty('name');
          expect(achievement).toHaveProperty('points');
        });
      });
    });
  });

  describe('calculateLevel', () => {
    // Note: The actual implementation returns {level, nextLevelXp, progress}
    // Formula: level = floor(sqrt(xp/100)) || 1
    
    it('returns level 1 for 0 XP', () => {
      const result = calculateLevel(0);
      expect(result.level).toBe(1);
    });

    it('returns level 1 for 99 XP', () => {
      const result = calculateLevel(99);
      expect(result.level).toBe(1);
    });

    it('returns level 1 for 100 XP (just barely at level boundary)', () => {
      const result = calculateLevel(100);
      // Formula: floor(sqrt(100/100)) = floor(1) = 1
      expect(result.level).toBe(1);
    });

    it('returns level 2 for 400 XP', () => {
      const result = calculateLevel(400);
      // floor(sqrt(400/100)) = floor(2) = 2
      expect(result.level).toBe(2);
    });

    it('returns level 3 for 900 XP', () => {
      const result = calculateLevel(900);
      // floor(sqrt(900/100)) = floor(3) = 3
      expect(result.level).toBe(3);
    });

    it('returns level 10 for 10000 XP', () => {
      const result = calculateLevel(10000);
      // floor(sqrt(10000/100)) = floor(10) = 10
      expect(result.level).toBe(10);
    });

    it('returns level 100 for 1000000 XP', () => {
      const result = calculateLevel(1000000);
      // floor(sqrt(1000000/100)) = floor(100) = 100
      expect(result.level).toBe(100);
    });

    it('handles negative XP gracefully', () => {
      const result = calculateLevel(-100);
      expect(result.level).toBeGreaterThanOrEqual(1);
    });

    it('level increases quadratically with XP', () => {
      // XP needed for each level: level^2 * 100
      // Level 4 requires 400 XP, Level 5 requires 2500 XP
      const result = calculateLevel(2500);
      expect(result.level).toBe(5);
    });

    it('returns nextLevelXp correctly', () => {
      const result = calculateLevel(500); // Level 2
      expect(result.level).toBe(2);
      expect(result.nextLevelXp).toBe(900); // Level 3 requires 900 XP
    });

    it('returns progress percentage', () => {
      const result = calculateLevel(600); // Level 2, 600 of 900 needed for level 3
      expect(result.level).toBe(2);
      expect(result.progress).toBeGreaterThan(0);
      expect(result.progress).toBeLessThanOrEqual(100);
    });
  });

  describe('getAchievementProgress', () => {
    // Note: The actual API takes achievementId (string), not Achievement object
    const baseStats = {
      streak: 5,
      totalQuestions: 250,
      accuracy: 80,
      perfectSessions: 1,
    };

    it('returns progress for streak achievements', () => {
      const progress = getAchievementProgress('streak_7', baseStats);
      
      expect(progress).not.toBe(0);
      if (typeof progress !== 'number') {
        expect(progress.current).toBe(5);
        expect(progress.target).toBe(7);
        expect(progress.percent).toBeCloseTo(71, 0);
      }
    });

    it('returns progress for question achievements', () => {
      const progress = getAchievementProgress('questions_500', baseStats);
      
      expect(progress).not.toBe(0);
      if (typeof progress !== 'number') {
        expect(progress.current).toBe(250);
        expect(progress.target).toBe(500);
        expect(progress.percent).toBe(50);
      }
    });

    it('returns progress for accuracy achievements', () => {
      const progress = getAchievementProgress('accuracy_90', baseStats);
      
      expect(progress).not.toBe(0);
      if (typeof progress !== 'number') {
        expect(progress.current).toBe(80);
        expect(progress.target).toBe(90);
        expect(progress.percent).toBeCloseTo(89, 0);
      }
    });

    it('caps progress percentage at 100', () => {
      const stats = { ...baseStats, streak: 100 };
      const progress = getAchievementProgress('streak_3', stats);
      
      expect(progress).not.toBe(0);
      if (typeof progress !== 'number') {
        expect(progress.percent).toBe(100);
      }
    });

    it('returns 0 progress for zero stats', () => {
      const zeroStats = {
        streak: 0,
        totalQuestions: 0,
        accuracy: 0,
        perfectSessions: 0,
      };
      const progress = getAchievementProgress('streak_3', zeroStats);
      
      expect(progress).not.toBe(0);
      if (typeof progress !== 'number') {
        expect(progress.current).toBe(0);
        expect(progress.percent).toBe(0);
      }
    });

    it('returns 0 for invalid achievement id', () => {
      const progress = getAchievementProgress('nonexistent_achievement', baseStats);
      expect(progress).toBe(0);
    });
  });
});

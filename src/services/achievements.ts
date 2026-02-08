// Achievements & Badges System
// Gamification to keep users engaged

export interface AchievementRequirement {
  type: 'streak' | 'questions' | 'accuracy' | 'perfect';
  value: number;
  minQuestions?: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'streak' | 'questions' | 'accuracy' | 'mastery';
  requirement: AchievementRequirement;
  points: number;
}

/** Stats structure used for achievement checking */
export interface AchievementStats {
  streak?: number;
  totalQuestions?: number;
  accuracy?: number;
  perfectSessions?: number;
}

export const ACHIEVEMENTS: Record<string, Achievement> = {
  // Streak achievements
  streak_3: {
    id: 'streak_3',
    name: 'Getting Started',
    description: '3 day study streak',
    icon: '🔥',
    category: 'streak',
    requirement: { type: 'streak', value: 3 },
    points: 50,
  },
  streak_7: {
    id: 'streak_7',
    name: 'Week Warrior',
    description: '7 day study streak',
    icon: '🔥',
    category: 'streak',
    requirement: { type: 'streak', value: 7 },
    points: 100,
  },
  streak_30: {
    id: 'streak_30',
    name: 'Monthly Master',
    description: '30 day study streak',
    icon: '🏆',
    category: 'streak',
    requirement: { type: 'streak', value: 30 },
    points: 500,
  },
  streak_100: {
    id: 'streak_100',
    name: 'Century Club',
    description: '100 day study streak',
    icon: '💎',
    category: 'streak',
    requirement: { type: 'streak', value: 100 },
    points: 2000,
  },

  // Question achievements
  questions_100: {
    id: 'questions_100',
    name: 'Question Crusher',
    description: 'Answer 100 questions',
    icon: '📝',
    category: 'questions',
    requirement: { type: 'questions', value: 100 },
    points: 100,
  },
  questions_500: {
    id: 'questions_500',
    name: 'Practice Pro',
    description: 'Answer 500 questions',
    icon: '📚',
    category: 'questions',
    requirement: { type: 'questions', value: 500 },
    points: 300,
  },
  questions_1000: {
    id: 'questions_1000',
    name: 'Question Machine',
    description: 'Answer 1,000 questions',
    icon: '🤖',
    category: 'questions',
    requirement: { type: 'questions', value: 1000 },
    points: 750,
  },
  questions_5000: {
    id: 'questions_5000',
    name: 'CPA Candidate',
    description: 'Answer 5,000 questions',
    icon: '🎓',
    category: 'questions',
    requirement: { type: 'questions', value: 5000 },
    points: 2000,
  },

  // Accuracy achievements
  accuracy_80: {
    id: 'accuracy_80',
    name: 'Sharp Mind',
    description: 'Maintain 80% accuracy (min 50 questions)',
    icon: '🎯',
    category: 'accuracy',
    requirement: { type: 'accuracy', value: 80, minQuestions: 50 },
    points: 200,
  },
  accuracy_90: {
    id: 'accuracy_90',
    name: 'Precision Expert',
    description: 'Maintain 90% accuracy (min 100 questions)',
    icon: '💯',
    category: 'accuracy',
    requirement: { type: 'accuracy', value: 90, minQuestions: 100 },
    points: 500,
  },
  perfect_session: {
    id: 'perfect_session',
    name: 'Perfect Game',
    description: 'Score 100% on a session of 10+ questions',
    icon: '⭐',
    category: 'accuracy',
    requirement: { type: 'perfect', value: 1, minQuestions: 10 },
    points: 150,
  },
};

/**
 * Check for new achievements based on stats
 */
export const checkAchievements = (stats: AchievementStats, currentAchievements: string[] = []): Achievement[] => {
  const newAchievements: Achievement[] = [];
  const earnedIds = new Set(currentAchievements);

  Object.values(ACHIEVEMENTS).forEach((achievement) => {
    if (earnedIds.has(achievement.id)) return;

    let earned = false;
    const { type, value, minQuestions } = achievement.requirement;

    switch (type) {
      case 'streak':
        if ((stats.streak || 0) >= value) earned = true;
        break;
      case 'questions':
        if ((stats.totalQuestions || 0) >= value) earned = true;
        break;
      case 'accuracy':
        if (
          (stats.accuracy || 0) >= value &&
          (stats.totalQuestions || 0) >= (minQuestions || 0)
        ) {
          earned = true;
        }
        break;
      case 'perfect':
        if ((stats.perfectSessions || 0) >= value) earned = true;
        break;
    }

    if (earned) {
      newAchievements.push(achievement);
    }
  });

  return newAchievements;
};

/**
 * Calculate level based on total XP
 */
export const calculateLevel = (xp: number) => {
  // Level formula: Level = sqrt(XP / 100)
  const level = Math.floor(Math.sqrt(xp / 100)) || 1;
  const nextLevelXp = Math.pow(level + 1, 2) * 100;
  const currentLevelXp = Math.pow(level, 2) * 100;
  
  const progress = Math.min(
    100,
    Math.max(0, ((xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100)
  );

  return {
    level,
    nextLevelXp,
    progress: Math.round(progress),
  };
};

export const getUnlockedAchievements = (userAchievements: string[]) => {
  return Object.values(ACHIEVEMENTS).filter(a => userAchievements.includes(a.id));
};

export const getAchievementsByCategory = (category: string) => {
  if (category === 'all') return Object.values(ACHIEVEMENTS);
  return Object.values(ACHIEVEMENTS).filter(a => a.category === category);
};

export const getAchievementProgress = (achievementId: string, stats: AchievementStats) => {
    const achievement = ACHIEVEMENTS[achievementId];
    if (!achievement) return 0;
    
    const { type, value } = achievement.requirement;
    let current = 0;

    switch (type) {
      case 'streak': current = stats.streak || 0; break;
      case 'questions': current = stats.totalQuestions || 0; break;
      case 'accuracy': current = stats.accuracy || 0; break; // simplistic
      case 'perfect': current = stats.perfectSessions || 0; break;
    }
    
    return {
      current,
      target: value,
      percent: Math.min(100, Math.round((current / value) * 100))
    };
};


export default {
  ACHIEVEMENTS,
  checkAchievements,
  calculateLevel,
  getUnlockedAchievements,
  getAchievementsByCategory,
  getAchievementProgress
};

// Achievements & Badges System
// Gamification to keep users engaged

export const ACHIEVEMENTS = {
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
    name: 'Perfect Session',
    description: 'Get 10 questions in a row correct',
    icon: '⭐',
    category: 'accuracy',
    requirement: { type: 'perfect_streak', value: 10 },
    points: 150,
  },

  // Topic mastery
  topic_master: {
    id: 'topic_master',
    name: 'Topic Master',
    description: 'Master any topic (90%+ accuracy, 20+ questions)',
    icon: '🏅',
    category: 'mastery',
    requirement: { type: 'topic_mastery', accuracy: 90, minQuestions: 20 },
    points: 250,
  },
  section_master: {
    id: 'section_master',
    name: 'Section Scholar',
    description: 'Master all topics in a section',
    icon: '🎖️',
    category: 'mastery',
    requirement: { type: 'section_mastery' },
    points: 1000,
  },

  // Time-based
  early_bird: {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Study before 7 AM',
    icon: '🌅',
    category: 'time',
    requirement: { type: 'time_study', beforeHour: 7 },
    points: 50,
  },
  night_owl: {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Study after 11 PM',
    icon: '🦉',
    category: 'time',
    requirement: { type: 'time_study', afterHour: 23 },
    points: 50,
  },
  weekend_warrior: {
    id: 'weekend_warrior',
    name: 'Weekend Warrior',
    description: 'Complete daily goal on a weekend',
    icon: '💪',
    category: 'time',
    requirement: { type: 'weekend_goal' },
    points: 75,
  },

  // Special
  first_question: {
    id: 'first_question',
    name: 'First Steps',
    description: 'Answer your first question',
    icon: '👶',
    category: 'milestone',
    requirement: { type: 'questions', value: 1 },
    points: 10,
  },
  ai_conversation: {
    id: 'ai_conversation',
    name: 'AI Explorer',
    description: 'Have a conversation with AI Tutor',
    icon: '🤖',
    category: 'feature',
    requirement: { type: 'ai_messages', value: 5 },
    points: 50,
  },
  flashcard_review: {
    id: 'flashcard_review',
    name: 'Card Shark',
    description: 'Review 50 flashcards',
    icon: '🃏',
    category: 'feature',
    requirement: { type: 'flashcards', value: 50 },
    points: 100,
  },
  exam_simulator: {
    id: 'exam_simulator',
    name: 'Simulation Ready',
    description: 'Complete a full practice exam',
    icon: '📋',
    category: 'feature',
    requirement: { type: 'simulations', value: 1 },
    points: 200,
  },
};

// Check if achievement is unlocked
export const checkAchievement = (achievement, userStats) => {
  const { requirement } = achievement;

  switch (requirement.type) {
    case 'streak':
      return userStats.currentStreak >= requirement.value;

    case 'questions':
      return userStats.totalQuestions >= requirement.value;

    case 'accuracy':
      return (
        userStats.totalQuestions >= requirement.minQuestions &&
        userStats.accuracy >= requirement.value
      );

    case 'perfect_streak':
      return userStats.currentPerfectStreak >= requirement.value;

    case 'topic_mastery':
      return Object.values(userStats.topics || {}).some(
        (t) => t.accuracy >= requirement.accuracy && t.attempted >= requirement.minQuestions
      );

    case 'time_study':
      const hour = new Date().getHours();
      if (requirement.beforeHour) return hour < requirement.beforeHour;
      if (requirement.afterHour) return hour >= requirement.afterHour;
      return false;

    case 'weekend_goal':
      const day = new Date().getDay();
      return (day === 0 || day === 6) && userStats.dailyGoalMet;

    case 'ai_messages':
      return userStats.aiMessages >= requirement.value;

    case 'flashcards':
      return userStats.flashcardsReviewed >= requirement.value;

    case 'simulations':
      return userStats.simulationsCompleted >= requirement.value;

    default:
      return false;
  }
};

// Get all unlocked achievements
export const getUnlockedAchievements = (userStats, earnedAchievements = []) => {
  const newlyUnlocked = [];

  Object.values(ACHIEVEMENTS).forEach((achievement) => {
    if (!earnedAchievements.includes(achievement.id)) {
      if (checkAchievement(achievement, userStats)) {
        newlyUnlocked.push(achievement);
      }
    }
  });

  return newlyUnlocked;
};

// Get achievement progress
export const getAchievementProgress = (achievement, userStats) => {
  const { requirement } = achievement;

  switch (requirement.type) {
    case 'streak':
      return { current: userStats.currentStreak, target: requirement.value };
    case 'questions':
      return { current: userStats.totalQuestions, target: requirement.value };
    case 'flashcards':
      return { current: userStats.flashcardsReviewed || 0, target: requirement.value };
    default:
      return { current: 0, target: 1 };
  }
};

// Group achievements by category
export const getAchievementsByCategory = () => {
  const categories = {};

  Object.values(ACHIEVEMENTS).forEach((achievement) => {
    if (!categories[achievement.category]) {
      categories[achievement.category] = [];
    }
    categories[achievement.category].push(achievement);
  });

  return categories;
};

export default {
  ACHIEVEMENTS,
  checkAchievement,
  getUnlockedAchievements,
  getAchievementProgress,
  getAchievementsByCategory,
};

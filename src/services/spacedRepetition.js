// Spaced Repetition Algorithm (SM-2 inspired)
// Optimizes review intervals based on performance

// Interval multipliers based on performance
const INTERVALS = {
  again: 1, // Review again in 1 minute (failed)
  hard: 0.5, // Half the current interval
  good: 1, // Keep current interval
  easy: 2.5, // 2.5x the current interval
};

// Initial intervals in days
const INITIAL_INTERVALS = {
  new: 0, // Immediate review
  learning: 1, // 1 day
  review: 3, // 3 days
  graduated: 7, // 7 days
};

// Calculate next review date based on performance
export const calculateNextReview = (card, rating) => {
  const now = new Date();
  const { interval = 0, easeFactor = 2.5, repetitions = 0 } = card;

  let newInterval;
  let newEaseFactor = easeFactor;
  let newRepetitions = repetitions;

  switch (rating) {
    case 'again': // 0 - Complete failure
      newInterval = INTERVALS.again;
      newEaseFactor = Math.max(1.3, easeFactor - 0.2);
      newRepetitions = 0;
      break;

    case 'hard': // 1 - Difficult but recalled
      newInterval = Math.max(1, interval * INTERVALS.hard);
      newEaseFactor = Math.max(1.3, easeFactor - 0.15);
      newRepetitions = repetitions + 1;
      break;

    case 'good': // 2 - Recalled with effort
      if (repetitions === 0) {
        newInterval = 1;
      } else if (repetitions === 1) {
        newInterval = 6;
      } else {
        newInterval = Math.round(interval * easeFactor);
      }
      newRepetitions = repetitions + 1;
      break;

    case 'easy': // 3 - Perfect recall
      if (repetitions === 0) {
        newInterval = 4;
      } else {
        newInterval = Math.round(interval * easeFactor * INTERVALS.easy);
      }
      newEaseFactor = easeFactor + 0.15;
      newRepetitions = repetitions + 1;
      break;

    default:
      newInterval = interval;
  }

  // Calculate next review date
  const nextReview = new Date(now);
  nextReview.setDate(nextReview.getDate() + newInterval);

  return {
    interval: newInterval,
    easeFactor: newEaseFactor,
    repetitions: newRepetitions,
    nextReview,
    lastReview: now,
  };
};

// Get cards due for review
export const getDueCards = (cards, limit = 20) => {
  const now = new Date();

  return cards
    .filter((card) => {
      if (!card.nextReview) return true; // New cards
      return new Date(card.nextReview) <= now;
    })
    .sort((a, b) => {
      // Prioritize: overdue > new > by interval
      const aOverdue = a.nextReview ? now - new Date(a.nextReview) : 0;
      const bOverdue = b.nextReview ? now - new Date(b.nextReview) : 0;

      if (!a.nextReview && b.nextReview) return -1;
      if (a.nextReview && !b.nextReview) return 1;

      return bOverdue - aOverdue;
    })
    .slice(0, limit);
};

// Calculate study statistics
export const getStudyStats = (cards) => {
  const now = new Date();

  const stats = {
    total: cards.length,
    new: 0,
    learning: 0,
    review: 0,
    graduated: 0,
    dueToday: 0,
    overdue: 0,
  };

  cards.forEach((card) => {
    if (!card.nextReview) {
      stats.new++;
    } else if (card.interval < 1) {
      stats.learning++;
    } else if (card.interval < 21) {
      stats.review++;
    } else {
      stats.graduated++;
    }

    if (card.nextReview) {
      const reviewDate = new Date(card.nextReview);
      if (reviewDate <= now) {
        stats.dueToday++;
        if (reviewDate < new Date(now.setHours(0, 0, 0, 0))) {
          stats.overdue++;
        }
      }
    }
  });

  return stats;
};

// Smart recommendation based on performance patterns
export const getSmartRecommendation = (userProgress, weakAreas) => {
  const recommendations = [];

  // Check for struggling topics
  if (weakAreas.length > 0) {
    const worstArea = weakAreas[0];
    recommendations.push({
      type: 'weak_area',
      priority: 'high',
      title: `Focus on ${worstArea.name}`,
      description: `Your accuracy is ${worstArea.accuracy}%. Let's strengthen this area.`,
      action: 'practice',
      params: { topic: worstArea.id },
    });
  }

  // Check for due reviews
  if (userProgress.dueCards > 0) {
    recommendations.push({
      type: 'spaced_review',
      priority: 'high',
      title: `${userProgress.dueCards} cards due for review`,
      description: 'Review these before they become overdue.',
      action: 'flashcards',
      params: { mode: 'review' },
    });
  }

  // Suggest variety
  if (userProgress.lastActivity === 'mcq') {
    recommendations.push({
      type: 'variety',
      priority: 'medium',
      title: 'Try Flashcards',
      description: 'Mix up your study methods for better retention.',
      action: 'flashcards',
      params: { mode: 'new' },
    });
  }

  // Streak maintenance
  if (userProgress.streakAtRisk) {
    recommendations.push({
      type: 'streak',
      priority: 'urgent',
      title: 'Keep your streak alive!',
      description: `Do just ${userProgress.pointsNeeded} more points to maintain your ${userProgress.currentStreak} day streak.`,
      action: 'quick_practice',
      params: { count: 5 },
    });
  }

  return recommendations.sort((a, b) => {
    const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};

export default {
  calculateNextReview,
  getDueCards,
  getStudyStats,
  getSmartRecommendation,
};

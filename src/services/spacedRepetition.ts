// Spaced Repetition Algorithm (SM-2 inspired)
// Optimizes review intervals based on performance

export type ReviewRating = 'again' | 'hard' | 'good' | 'easy';

export interface Card {
  id: string;
  interval?: number;
  easeFactor?: number;
  repetitions?: number;
  nextReview?: Date | string | null;
  lastReview?: Date | string | null;
  // properties that might exist on a card object but aren't strictly required for the algo
  [key: string]: any; 
}

export interface ReviewResult {
  interval: number;
  easeFactor: number;
  repetitions: number;
  nextReview: Date;
  lastReview: Date;
}

export interface StudyStats {
  total: number;
  new: number;
  learning: number;
  review: number;
  graduated: number;
  dueToday: number;
  overdue: number;
}

export interface WeakArea {
  id: string;
  name: string;
  accuracy: number;
}

export interface UserProgress {
  dueCards: number;
  lastActivity: string;
  streakAtRisk: boolean;
  pointsNeeded: number;
  currentStreak: number;
}

export interface Recommendation {
  type: 'weak_area' | 'spaced_review' | 'variety' | 'streak';
  priority: 'urgent' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  action: string;
  params: Record<string, any>;
}

// Interval multipliers based on performance
const INTERVALS = {
  again: 1, // Review again in 1 minute (failed)
  hard: 0.5, // Half the current interval
  good: 1, // Keep current interval
  easy: 2.5, // 2.5x the current interval
};

/**
 * Calculate next review date based on performance
 */
export const calculateNextReview = (card: Card, rating: ReviewRating): ReviewResult => {
  const now = new Date();
  const { interval = 0, easeFactor = 2.5, repetitions = 0 } = card;

  let newInterval: number;
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

/**
 * Get cards due for review
 */
export const getDueCards = <T extends Card>(cards: T[], limit: number = 20): T[] => {
  const now = new Date();

  return cards
    .filter((card) => {
      if (!card.nextReview) return true; // New cards
      return new Date(card.nextReview) <= now;
    })
    .sort((a, b) => {
      // Prioritize: overdue > new > by interval
      const aDate = a.nextReview ? new Date(a.nextReview) : null;
      const bDate = b.nextReview ? new Date(b.nextReview) : null;
      
      const aOverdue = aDate ? now.getTime() - aDate.getTime() : 0;
      const bOverdue = bDate ? now.getTime() - bDate.getTime() : 0;

      if (!aDate && bDate) return -1;
      if (aDate && !bDate) return 1;

      return bOverdue - aOverdue;
    })
    .slice(0, limit);
};

/**
 * Calculate study statistics
 */
export const getStudyStats = (cards: Card[]): StudyStats => {
  const now = new Date();
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);

  const stats: StudyStats = {
    total: cards.length,
    new: 0,
    learning: 0,
    review: 0,
    graduated: 0,
    dueToday: 0,
    overdue: 0,
  };

  cards.forEach((card) => {
    const interval = card.interval || 0;
    
    if (!card.nextReview) {
      stats.new++;
    } else if (interval < 1) {
      stats.learning++;
    } else if (interval < 21) {
      stats.review++;
    } else {
      stats.graduated++;
    }

    if (card.nextReview) {
      const reviewDate = new Date(card.nextReview);
      if (reviewDate <= now) {
        stats.dueToday++;
        if (reviewDate < todayStart) {
          stats.overdue++;
        }
      }
    }
  });

  return stats;
};

/**
 * Smart recommendation based on performance patterns
 */
export const getSmartRecommendation = (userProgress: UserProgress, weakAreas: WeakArea[]): Recommendation[] => {
  const recommendations: Recommendation[] = [];

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
    const priorityOrder: Record<string, number> = { urgent: 0, high: 1, medium: 2, low: 3 };
    return customPrioritySort(a.priority, b.priority, priorityOrder);
  });
};

function customPrioritySort(p1: string, p2: string, order: Record<string, number>) {
    return (order[p1] ?? 4) - (order[p2] ?? 4);
}


export default {
  calculateNextReview,
  getDueCards,
  getStudyStats,
  getSmartRecommendation,
};

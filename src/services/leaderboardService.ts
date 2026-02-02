/**
 * Leaderboard Service
 * 
 * Provides community comparison stats to combat study loneliness.
 * Aggregates anonymous stats to show percentile rankings like:
 * "You studied more than 85% of FAR candidates today"
 * 
 * Data Structure in Firestore:
 * leaderboard/daily_stats/{date} -> {
 *   totalStudents: number,
 *   sectionStats: {
 *     FAR: { students: number, totalQuestions: number, totalMinutes: number, questionsDistribution: number[] },
 *     AUD: { ... },
 *     ...
 *   }
 * }
 * 
 * leaderboard/streaks -> {
 *   distribution: { 1: count, 2: count, 3: count, ... 30: count },
 *   maxStreak: number,
 *   avgStreak: number
 * }
 */

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase.js';
import { format, subDays } from 'date-fns';
import logger from '../utils/logger';
import { ExamSection } from '../types';

// Types
export interface SectionStats {
  students: number;
  totalQuestions: number;
  totalMinutes: number;
  avgQuestions: number;
  avgMinutes: number;
  // Distribution buckets for percentile calculation
  // Index 0 = 0-9 questions, 1 = 10-19, ... up to 10 = 100+
  questionsDistribution: number[];
  // Minutes distribution: 0 = 0-14min, 1 = 15-29, ... up to 8 = 120+
  minutesDistribution: number[];
}

export interface DailyLeaderboard {
  date: string;
  totalStudents: number;
  sectionStats: Partial<Record<ExamSection, SectionStats>>;
  updatedAt?: Date;
}

export interface StreakLeaderboard {
  // Distribution: key is streak length, value is count of users
  distribution: Record<number, number>;
  maxStreak: number;
  avgStreak: number;
  totalUsers: number;
  updatedAt?: Date;
}

export interface UserRanking {
  questionsPercentile: number; // "You answered more questions than X% of students"
  minutesPercentile: number;   // "You studied longer than X% of students"
  streakPercentile: number;    // "Your streak is longer than X% of students"
  sectionRank?: {
    questionsPercentile: number;
    minutesPercentile: number;
    sectionStudents: number;
  };
}

export interface CommunityStats {
  todayActive: number;
  weeklyActive: number;
  avgQuestionsToday: number;
  avgMinutesToday: number;
  topStreaks: number[];
  sectionBreakdown: Partial<Record<ExamSection, { students: number; avgQuestions: number }>>;
}

// Helper to get distribution bucket index
const getQuestionsBucket = (questions: number): number => Math.min(Math.floor(questions / 10), 10);
const getMinutesBucket = (minutes: number): number => Math.min(Math.floor(minutes / 15), 8);

/**
 * Record a user's daily activity to aggregate leaderboard stats
 * Called when user completes study activities
 */
export const recordDailyActivity = async (
  userId: string,
  section: ExamSection,
  questionsToday: number,
  minutesToday: number
): Promise<void> => {
  const today = format(new Date(), 'yyyy-MM-dd');
  const dailyRef = doc(db, 'leaderboard', 'daily_stats', 'dates', today);

  try {
    // Use a user-specific flag to prevent double counting
    const userFlagRef = doc(db, 'leaderboard', 'daily_stats', 'user_flags', `${today}_${userId}`);
    const userFlag = await getDoc(userFlagRef);

    const prevQuestions = userFlag.exists() ? userFlag.data()?.questions || 0 : 0;
    const prevMinutes = userFlag.exists() ? userFlag.data()?.minutes || 0 : 0;
    const prevSection = userFlag.exists() ? userFlag.data()?.section : null;
    const isNewUser = !userFlag.exists();

    // Calculate deltas
    const questionsDelta = questionsToday - prevQuestions;
    const minutesDelta = minutesToday - prevMinutes;

    if (questionsDelta <= 0 && minutesDelta <= 0 && !isNewUser) {
      return; // No meaningful update
    }

    // Get current stats
    const dailySnap = await getDoc(dailyRef);
    
    if (!dailySnap.exists()) {
      // Initialize daily stats
      const initialStats: DailyLeaderboard = {
        date: today,
        totalStudents: 1,
        sectionStats: {
          [section]: {
            students: 1,
            totalQuestions: questionsToday,
            totalMinutes: minutesToday,
            avgQuestions: questionsToday,
            avgMinutes: minutesToday,
            questionsDistribution: Array(11).fill(0),
            minutesDistribution: Array(9).fill(0),
          },
        },
      };
      
      // Set distribution buckets
      initialStats.sectionStats[section]!.questionsDistribution[getQuestionsBucket(questionsToday)] = 1;
      initialStats.sectionStats[section]!.minutesDistribution[getMinutesBucket(minutesToday)] = 1;
      
      await setDoc(dailyRef, {
        ...initialStats,
        updatedAt: serverTimestamp(),
      });
    } else {
      const data = dailySnap.data() as DailyLeaderboard;
      const sectionStats = data.sectionStats[section] || {
        students: 0,
        totalQuestions: 0,
        totalMinutes: 0,
        avgQuestions: 0,
        avgMinutes: 0,
        questionsDistribution: Array(11).fill(0),
        minutesDistribution: Array(9).fill(0),
      };

      // Update distribution (remove from old bucket, add to new)
      if (!isNewUser && prevSection === section) {
        const oldQBucket = getQuestionsBucket(prevQuestions);
        const oldMBucket = getMinutesBucket(prevMinutes);
        sectionStats.questionsDistribution[oldQBucket] = Math.max(0, (sectionStats.questionsDistribution[oldQBucket] || 0) - 1);
        sectionStats.minutesDistribution[oldMBucket] = Math.max(0, (sectionStats.minutesDistribution[oldMBucket] || 0) - 1);
      }

      const newQBucket = getQuestionsBucket(questionsToday);
      const newMBucket = getMinutesBucket(minutesToday);
      sectionStats.questionsDistribution[newQBucket] = (sectionStats.questionsDistribution[newQBucket] || 0) + 1;
      sectionStats.minutesDistribution[newMBucket] = (sectionStats.minutesDistribution[newMBucket] || 0) + 1;

      // Update totals
      if (isNewUser) {
        sectionStats.students += 1;
        sectionStats.totalQuestions += questionsToday;
        sectionStats.totalMinutes += minutesToday;
      } else if (prevSection === section) {
        sectionStats.totalQuestions += questionsDelta;
        sectionStats.totalMinutes += minutesDelta;
      } else {
        // User switched sections - add to new section
        sectionStats.students += 1;
        sectionStats.totalQuestions += questionsToday;
        sectionStats.totalMinutes += minutesToday;
      }

      sectionStats.avgQuestions = sectionStats.students > 0 
        ? Math.round(sectionStats.totalQuestions / sectionStats.students) 
        : 0;
      sectionStats.avgMinutes = sectionStats.students > 0 
        ? Math.round(sectionStats.totalMinutes / sectionStats.students) 
        : 0;

      await updateDoc(dailyRef, {
        totalStudents: isNewUser ? increment(1) : data.totalStudents,
        [`sectionStats.${section}`]: sectionStats,
        updatedAt: serverTimestamp(),
      });
    }

    // Update user flag
    await setDoc(userFlagRef, {
      questions: questionsToday,
      minutes: minutesToday,
      section,
      updatedAt: serverTimestamp(),
    });

  } catch (error) {
    logger.error('Error recording daily activity for leaderboard:', error);
  }
};

/**
 * Record user's streak for leaderboard comparison
 */
export const recordStreak = async (userId: string, streak: number): Promise<void> => {
  const streakRef = doc(db, 'leaderboard', 'streaks');
  const userStreakRef = doc(db, 'leaderboard', 'user_streaks', userId, 'current');

  try {
    const userStreakSnap = await getDoc(userStreakRef);
    const prevStreak = userStreakSnap.exists() ? userStreakSnap.data()?.streak || 0 : 0;

    if (streak === prevStreak) return;

    const streakSnap = await getDoc(streakRef);

    if (!streakSnap.exists()) {
      // Initialize streaks
      const distribution: Record<number, number> = {};
      distribution[streak] = 1;
      
      await setDoc(streakRef, {
        distribution,
        maxStreak: streak,
        avgStreak: streak,
        totalUsers: 1,
        updatedAt: serverTimestamp(),
      });
    } else {
      const data = streakSnap.data() as StreakLeaderboard;
      const distribution = { ...data.distribution };

      // Remove from old bucket if existed
      if (prevStreak > 0 && distribution[prevStreak]) {
        distribution[prevStreak] = Math.max(0, distribution[prevStreak] - 1);
        if (distribution[prevStreak] === 0) delete distribution[prevStreak];
      }

      // Add to new bucket
      distribution[streak] = (distribution[streak] || 0) + 1;

      // Recalculate stats
      let total = 0;
      let sum = 0;
      let max = 0;
      Object.entries(distribution).forEach(([s, count]) => {
        const streakNum = parseInt(s);
        total += count;
        sum += streakNum * count;
        if (streakNum > max && count > 0) max = streakNum;
      });

      await updateDoc(streakRef, {
        distribution,
        maxStreak: max,
        avgStreak: total > 0 ? Math.round(sum / total) : 0,
        totalUsers: prevStreak === 0 ? increment(1) : data.totalUsers,
        updatedAt: serverTimestamp(),
      });
    }

    // Update user's streak record
    await setDoc(userStreakRef, {
      streak,
      updatedAt: serverTimestamp(),
    });

  } catch (error) {
    logger.error('Error recording streak for leaderboard:', error);
  }
};

/**
 * Calculate user's percentile rankings
 */
export const getUserRanking = async (
  section: ExamSection,
  questionsToday: number,
  minutesToday: number,
  currentStreak: number
): Promise<UserRanking> => {
  const today = format(new Date(), 'yyyy-MM-dd');
  
  try {
    // Get daily stats
    const dailyRef = doc(db, 'leaderboard', 'daily_stats', 'dates', today);
    const dailySnap = await getDoc(dailyRef);
    
    // Get streak stats
    const streakRef = doc(db, 'leaderboard', 'streaks');
    const streakSnap = await getDoc(streakRef);

    let questionsPercentile = 50;
    let minutesPercentile = 50;
    let streakPercentile = 50;
    let sectionRank;

    if (dailySnap.exists()) {
      const data = dailySnap.data() as DailyLeaderboard;
      const sectionStats = data.sectionStats[section];

      if (sectionStats && sectionStats.students > 0) {
        // Calculate percentile from distribution
        const qBucket = getQuestionsBucket(questionsToday);
        let belowCount = 0;
        for (let i = 0; i < qBucket; i++) {
          belowCount += sectionStats.questionsDistribution[i] || 0;
        }
        questionsPercentile = Math.round((belowCount / sectionStats.students) * 100);

        const mBucket = getMinutesBucket(minutesToday);
        belowCount = 0;
        for (let i = 0; i < mBucket; i++) {
          belowCount += sectionStats.minutesDistribution[i] || 0;
        }
        minutesPercentile = Math.round((belowCount / sectionStats.students) * 100);

        sectionRank = {
          questionsPercentile,
          minutesPercentile,
          sectionStudents: sectionStats.students,
        };
      }
    }

    if (streakSnap.exists()) {
      const data = streakSnap.data() as StreakLeaderboard;
      let belowCount = 0;
      Object.entries(data.distribution).forEach(([s, count]) => {
        if (parseInt(s) < currentStreak) {
          belowCount += count;
        }
      });
      if (data.totalUsers > 0) {
        streakPercentile = Math.round((belowCount / data.totalUsers) * 100);
      }
    }

    return {
      questionsPercentile: Math.min(99, Math.max(1, questionsPercentile)),
      minutesPercentile: Math.min(99, Math.max(1, minutesPercentile)),
      streakPercentile: Math.min(99, Math.max(1, streakPercentile)),
      sectionRank,
    };

  } catch (error) {
    logger.error('Error getting user ranking:', error);
    return {
      questionsPercentile: 50,
      minutesPercentile: 50,
      streakPercentile: 50,
    };
  }
};

/**
 * Get community-wide stats for display
 */
export const getCommunityStats = async (): Promise<CommunityStats> => {
  const today = format(new Date(), 'yyyy-MM-dd');

  try {
    // Get today's stats
    const dailyRef = doc(db, 'leaderboard', 'daily_stats', 'dates', today);
    const dailySnap = await getDoc(dailyRef);

    // Get weekly count (last 7 days)
    let weeklyActive = 0;
    for (let i = 0; i < 7; i++) {
      const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
      const dayRef = doc(db, 'leaderboard', 'daily_stats', 'dates', date);
      const daySnap = await getDoc(dayRef);
      if (daySnap.exists()) {
        weeklyActive += daySnap.data()?.totalStudents || 0;
      }
    }

    // Get top streaks
    const streakRef = doc(db, 'leaderboard', 'streaks');
    const streakSnap = await getDoc(streakRef);
    
    let topStreaks: number[] = [];
    if (streakSnap.exists()) {
      const distribution = streakSnap.data()?.distribution || {};
      topStreaks = Object.keys(distribution)
        .map(Number)
        .filter(s => distribution[s] > 0)
        .sort((a, b) => b - a)
        .slice(0, 3);
    }

    if (!dailySnap.exists()) {
      return {
        todayActive: 0,
        weeklyActive,
        avgQuestionsToday: 0,
        avgMinutesToday: 0,
        topStreaks,
        sectionBreakdown: {},
      };
    }

    const data = dailySnap.data() as DailyLeaderboard;
    
    // Calculate overall averages
    let totalQuestions = 0;
    let totalMinutes = 0;
    const sectionBreakdown: CommunityStats['sectionBreakdown'] = {};

    Object.entries(data.sectionStats).forEach(([section, stats]) => {
      totalQuestions += stats.totalQuestions;
      totalMinutes += stats.totalMinutes;
      sectionBreakdown[section as ExamSection] = {
        students: stats.students,
        avgQuestions: stats.avgQuestions,
      };
    });

    return {
      todayActive: data.totalStudents,
      weeklyActive: Math.round(weeklyActive / 7), // Daily average
      avgQuestionsToday: data.totalStudents > 0 ? Math.round(totalQuestions / data.totalStudents) : 0,
      avgMinutesToday: data.totalStudents > 0 ? Math.round(totalMinutes / data.totalStudents) : 0,
      topStreaks,
      sectionBreakdown,
    };

  } catch (error) {
    logger.error('Error getting community stats:', error);
    return {
      todayActive: 0,
      weeklyActive: 0,
      avgQuestionsToday: 0,
      avgMinutesToday: 0,
      topStreaks: [],
      sectionBreakdown: {},
    };
  }
};

/**
 * Generate motivational message based on ranking
 */
export const getMotivationalMessage = (ranking: UserRanking, section: ExamSection): string => {
  const messages: string[] = [];

  if (ranking.questionsPercentile >= 75) {
    messages.push(`🔥 You practiced more than ${ranking.questionsPercentile}% of ${section} candidates today!`);
  } else if (ranking.questionsPercentile >= 50) {
    messages.push(`📈 You're in the top half of ${section} candidates for questions today!`);
  } else {
    messages.push(`💪 Every question counts! Keep pushing to climb the ranks.`);
  }

  if (ranking.streakPercentile >= 80) {
    messages.push(`🏆 Your streak is longer than ${ranking.streakPercentile}% of all candidates!`);
  } else if (ranking.streakPercentile >= 50) {
    messages.push(`⚡ Your consistency is paying off - keep that streak going!`);
  }

  return messages[0] || "You're making progress! Keep it up!";
};

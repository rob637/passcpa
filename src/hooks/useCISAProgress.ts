/**
 * CISA Progress Hook
 * 
 * Provides CISA exam preparation progress data to components.
 * Integrates with adaptive engine, score predictor, and exam simulator.
 */

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { CISASectionId } from '../courses/cisa/config';
import { getPerformanceSummary, getWeakDomains, getAdaptiveState } from '../services/cisaAdaptiveEngine';
import { getQuickPrediction } from '../services/cisaScorePredictor';
import { getExamStatistics } from '../services/cisaExamSimulator';

export interface CISAProgress {
  // Overall metrics
  readinessScore: number;
  passProbability: number;
  overallAccuracy: number;
  totalQuestionsAttempted: number;
  
  // Engagement
  streakDays: number;
  studyHoursThisWeek: number;
  lastStudyDate: Date | null;
  
  // Domain-specific
  domainProgress: Record<CISASectionId, number>;
  domainAccuracy: Record<CISASectionId, number>;
  weakDomains: CISASectionId[];
  strongDomains: CISASectionId[];
  
  // Exam countdown
  daysUntilExam?: number;
  examDate?: Date;
  
  // Mock exams
  mockExamsTaken: number;
  mockExamsPassed: number;
  bestMockScore: number;
  
  // Pass guarantee tracking
  passGuaranteeProgress: {
    questionsRequired: number;
    questionsCompleted: number;
    mockExamsRequired: number;
    mockExamsPassed: number;
    flashcardsRequired: number;
    flashcardsReviewed: number;
  };
}

// Storage keys
const STUDY_STREAK_KEY = 'cisa-study-streak';
const EXAM_DATE_KEY = 'cisa-exam-date';
const STUDY_LOG_KEY = 'cisa-study-log';

interface StudyStreak {
  currentStreak: number;
  lastStudyDate: string | null;
  longestStreak: number;
}

interface StudyLog {
  date: string;
  minutes: number;
}

/**
 * Load study streak from storage
 */
function loadStudyStreak(): StudyStreak {
  try {
    const stored = localStorage.getItem(STUDY_STREAK_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error('Failed to load study streak:', e);
  }
  return { currentStreak: 0, lastStudyDate: null, longestStreak: 0 };
}

/**
 * Load study log from storage
 */
function loadStudyLog(): StudyLog[] {
  try {
    const stored = localStorage.getItem(STUDY_LOG_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error('Failed to load study log:', e);
  }
  return [];
}

/**
 * Load exam date from storage
 */
function loadExamDate(): Date | null {
  try {
    const stored = localStorage.getItem(EXAM_DATE_KEY);
    if (stored) return new Date(stored);
  } catch (e) {
    console.error('Failed to load exam date:', e);
  }
  return null;
}

/**
 * Calculate study hours this week
 */
function calculateWeeklyHours(studyLog: StudyLog[]): number {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const weeklyMinutes = studyLog
    .filter(log => new Date(log.date) >= oneWeekAgo)
    .reduce((sum, log) => sum + log.minutes, 0);
  return Math.round(weeklyMinutes / 60 * 10) / 10; // Round to 1 decimal
}

/**
 * Build progress object from various sources
 */
function buildProgress(): CISAProgress {
  // Get data from services
  const performanceSummary = getPerformanceSummary();
  const prediction = getQuickPrediction();
  const examStats = getExamStatistics();
  const weakDomains = getWeakDomains();
  const adaptiveState = getAdaptiveState();
  
  // Get streak and log
  const streak = loadStudyStreak();
  const studyLog = loadStudyLog();
  const examDate = loadExamDate();
  
  // Calculate days until exam
  let daysUntilExam: number | undefined;
  if (examDate) {
    const diffMs = examDate.getTime() - Date.now();
    daysUntilExam = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  }
  
  // Build domain progress/accuracy from adaptive state
  const domainProgress: Record<CISASectionId, number> = {
    CISA1: 0, CISA2: 0, CISA3: 0, CISA4: 0, CISA5: 0,
  };
  const domainAccuracy: Record<CISASectionId, number> = {
    CISA1: 0, CISA2: 0, CISA3: 0, CISA4: 0, CISA5: 0,
  };
  
  Object.entries(adaptiveState.domainPerformance).forEach(([domain, perf]) => {
    const domainId = domain as CISASectionId;
    // Progress is based on questions attempted vs target (assuming ~200 per domain)
    domainProgress[domainId] = Math.min(100, Math.round((perf.questionsAttempted / 200) * 100));
    domainAccuracy[domainId] = Math.round(perf.accuracy * 100);
  });
  
  return {
    readinessScore: performanceSummary.readinessScore,
    passProbability: prediction.passProbability,
    overallAccuracy: performanceSummary.overallAccuracy,
    totalQuestionsAttempted: performanceSummary.totalQuestions,
    
    streakDays: streak.currentStreak,
    studyHoursThisWeek: calculateWeeklyHours(studyLog),
    lastStudyDate: streak.lastStudyDate ? new Date(streak.lastStudyDate) : null,
    
    domainProgress,
    domainAccuracy,
    weakDomains,
    strongDomains: performanceSummary.strongDomains,
    
    daysUntilExam,
    examDate: examDate || undefined,
    
    mockExamsTaken: examStats.totalExams,
    mockExamsPassed: examStats.passedExams,
    bestMockScore: examStats.bestScore,
    
    passGuaranteeProgress: {
      questionsRequired: 1000,
      questionsCompleted: Math.min(performanceSummary.totalQuestions, 1000),
      mockExamsRequired: 2,
      mockExamsPassed: examStats.passedExams,
      flashcardsRequired: 500,
      flashcardsReviewed: 0, // TODO: Integrate with flashcard service
    },
  };
}

/**
 * CISA Progress Hook
 */
export function useCISAProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<CISAProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadProgress = useCallback(async () => {
    try {
      setLoading(true);
      // Build progress from local state (no server call needed)
      const data = buildProgress();
      setProgress(data);
      setError(null);
    } catch (err) {
      console.error('Failed to load CISA progress:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProgress();
  }, [loadProgress, user]);

  // Function to refresh progress
  const refresh = useCallback(() => {
    loadProgress();
  }, [loadProgress]);

  return { progress, loading, error, refresh };
}

/**
 * Set exam date
 */
export function setExamDate(date: Date): void {
  localStorage.setItem(EXAM_DATE_KEY, date.toISOString());
}

/**
 * Record study session
 */
export function recordStudySession(minutes: number): void {
  const today = new Date().toISOString().split('T')[0];
  
  // Update study log
  const log = loadStudyLog();
  const todayEntry = log.find(l => l.date === today);
  if (todayEntry) {
    todayEntry.minutes += minutes;
  } else {
    log.push({ date: today, minutes });
  }
  // Keep last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const filtered = log.filter(l => new Date(l.date) >= thirtyDaysAgo);
  localStorage.setItem(STUDY_LOG_KEY, JSON.stringify(filtered));
  
  // Update streak
  const streak = loadStudyStreak();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  
  if (streak.lastStudyDate === today) {
    // Already studied today, no streak change
  } else if (streak.lastStudyDate === yesterdayStr) {
    // Consecutive day, increment streak
    streak.currentStreak++;
    streak.lastStudyDate = today;
    if (streak.currentStreak > streak.longestStreak) {
      streak.longestStreak = streak.currentStreak;
    }
  } else {
    // Streak broken, reset to 1
    streak.currentStreak = 1;
    streak.lastStudyDate = today;
  }
  
  localStorage.setItem(STUDY_STREAK_KEY, JSON.stringify(streak));
}

export default useCISAProgress;

/**
 * CPA Progress Hook
 * 
 * Provides CPA exam preparation progress data to components.
 * Tracks progress across all 6 sections (3 core + 3 discipline).
 */

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { 
  getCPAProgress, 
  CPAOverallProgress, 
  CPASectionId,
  CPA_SECTION_IDS,
  CPA_CORE_SECTIONS,
  CPA_DISCIPLINE_SECTIONS,
} from '../services/cpaProgressService';

export interface CPAProgressState {
  // Overall metrics
  readinessScore: number;
  passProbability: number;
  overallAccuracy: number;
  totalQuestionsAttempted: number;
  tbsAccuracy: number;
  totalTBSAttempted: number;
  
  // Engagement
  streakDays: number;
  studyHoursThisWeek: number;
  lastStudyDate: Date | null;
  
  // Section-specific
  sectionProgress: Record<CPASectionId, number>;
  sectionAccuracy: Record<CPASectionId, number>;
  sectionReadiness: Record<CPASectionId, number>;
  weakSections: CPASectionId[];
  strongSections: CPASectionId[];
  
  // Exam planning
  chosenDiscipline: CPASectionId | null;
  daysUntilExam?: number;
  examDate?: Date;
  
  // Mock exams
  mockExamsTaken: number;
  mockExamsPassed: number;
  sectionsPassed: number;
  
  // Recommendations
  recommendations: string[];
}

// Storage keys
const STUDY_STREAK_KEY = 'cpa-study-streak';
const EXAM_DATE_KEY = 'cpa-exam-date';
const STUDY_LOG_KEY = 'cpa-study-log';

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
 * Calculate pass probability based on readiness
 */
function calculatePassProbability(progress: CPAOverallProgress): number {
  const accuracy = progress.overall.overallAccuracy;
  const tbsAccuracy = progress.overall.tbsAccuracy;
  
  // Weighted calculation: 50% MCQ performance, 30% TBS performance, 20% coverage
  const mcqFactor = Math.min(100, accuracy * 1.2); // Slight boost if above 75%
  const tbsFactor = Math.min(100, tbsAccuracy * 1.1);
  const coverageFactor = progress.overall.progressPercent;
  
  const rawProbability = (mcqFactor * 0.5) + (tbsFactor * 0.3) + (coverageFactor * 0.2);
  
  // Apply sigmoid-like scaling for more realistic probability
  if (rawProbability >= 85) return Math.min(95, rawProbability);
  if (rawProbability >= 75) return rawProbability - 5;
  if (rawProbability >= 60) return rawProbability - 10;
  return Math.max(5, rawProbability - 15);
}

/**
 * Build progress state from server data
 */
function buildProgressState(progress: CPAOverallProgress): CPAProgressState {
  const streak = loadStudyStreak();
  const studyLog = loadStudyLog();
  const examDate = loadExamDate();
  
  // Calculate days until exam
  let daysUntilExam: number | undefined;
  if (examDate) {
    const diffMs = examDate.getTime() - Date.now();
    daysUntilExam = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  }
  
  // Build section progress/accuracy/readiness
  const sectionProgress: Record<CPASectionId, number> = {} as Record<CPASectionId, number>;
  const sectionAccuracy: Record<CPASectionId, number> = {} as Record<CPASectionId, number>;
  const sectionReadiness: Record<CPASectionId, number> = {} as Record<CPASectionId, number>;
  
  for (const sectionId of CPA_SECTION_IDS) {
    sectionProgress[sectionId] = progress.sections[sectionId].progressPercent;
    sectionAccuracy[sectionId] = progress.sections[sectionId].accuracy;
    sectionReadiness[sectionId] = progress.sections[sectionId].readinessScore;
  }
  
  // Identify weak and strong sections (focus on core + chosen discipline)
  const sectionsToAnalyze: CPASectionId[] = progress.overall.chosenDiscipline
    ? [...CPA_CORE_SECTIONS, progress.overall.chosenDiscipline]
    : [...CPA_CORE_SECTIONS, ...CPA_DISCIPLINE_SECTIONS]; // Include all if none chosen
    
  const sectionsByReadiness = sectionsToAnalyze
    .map(id => ({ id, readiness: progress.sections[id].readinessScore }))
    .sort((a, b) => a.readiness - b.readiness);
  
  const weakSections = sectionsByReadiness
    .filter(s => s.readiness < 70)
    .slice(0, 2)
    .map(s => s.id);
    
  const strongSections = sectionsByReadiness
    .filter(s => s.readiness >= 75)
    .slice(-2)
    .map(s => s.id);
  
  // Count mock exams and passes
  const mockExamsTaken = progress.examHistory.filter(e => e.mode === 'full').length;
  const mockExamsPassed = progress.examHistory.filter(e => e.mode === 'full' && e.passed).length;
  
  // Count sections "passed" (readiness >= 75%)
  const sectionsPassed = sectionsToAnalyze.filter(
    id => progress.sections[id].readinessScore >= 75
  ).length;
  
  // Find most recent study date
  let lastStudyDate: Date | null = null;
  for (const sectionId of CPA_SECTION_IDS) {
    const sectionLastStudied = progress.sections[sectionId].lastStudied;
    if (sectionLastStudied && (!lastStudyDate || sectionLastStudied > lastStudyDate)) {
      lastStudyDate = sectionLastStudied;
    }
  }
  
  return {
    readinessScore: progress.overall.readinessScore,
    passProbability: calculatePassProbability(progress),
    overallAccuracy: progress.overall.overallAccuracy,
    totalQuestionsAttempted: progress.overall.totalQuestionsAttempted,
    tbsAccuracy: progress.overall.tbsAccuracy,
    totalTBSAttempted: progress.overall.totalTBSAttempted,
    
    streakDays: streak.currentStreak || progress.overall.streakDays,
    studyHoursThisWeek: calculateWeeklyHours(studyLog),
    lastStudyDate,
    
    sectionProgress,
    sectionAccuracy,
    sectionReadiness,
    weakSections,
    strongSections,
    
    chosenDiscipline: progress.overall.chosenDiscipline,
    daysUntilExam,
    examDate: examDate || undefined,
    
    mockExamsTaken,
    mockExamsPassed,
    sectionsPassed,
    
    recommendations: progress.recommendations,
  };
}

/**
 * CPA Progress Hook
 */
export function useCPAProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<CPAProgressState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadProgress = useCallback(async () => {
    if (!user) {
      setProgress(null);
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const data = await getCPAProgress(user.uid);
      const state = buildProgressState(data);
      setProgress(state);
      setError(null);
    } catch (err) {
      console.error('Failed to load CPA progress:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
      // Provide default progress on error
      setProgress({
        readinessScore: 0,
        passProbability: 0,
        overallAccuracy: 0,
        totalQuestionsAttempted: 0,
        tbsAccuracy: 0,
        totalTBSAttempted: 0,
        streakDays: 0,
        studyHoursThisWeek: 0,
        lastStudyDate: null,
        sectionProgress: { FAR: 0, AUD: 0, REG: 0, BAR: 0, ISC: 0, TCP: 0 },
        sectionAccuracy: { FAR: 0, AUD: 0, REG: 0, BAR: 0, ISC: 0, TCP: 0 },
        sectionReadiness: { FAR: 0, AUD: 0, REG: 0, BAR: 0, ISC: 0, TCP: 0 },
        weakSections: [],
        strongSections: [],
        chosenDiscipline: null,
        mockExamsTaken: 0,
        mockExamsPassed: 0,
        sectionsPassed: 0,
        recommendations: [],
      });
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

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

// Re-export types and constants
export { 
  CPA_SECTION_IDS, 
  CPA_CORE_SECTIONS, 
  CPA_DISCIPLINE_SECTIONS,
  type CPASectionId,
} from '../services/cpaProgressService';

export default useCPAProgress;

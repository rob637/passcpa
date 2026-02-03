/**
 * Smart Daily Plan Service
 * 
 * Generates personalized daily study plans based on:
 * - User's weak areas (topic accuracy < 70%)
 * - Spaced repetition (due reviews)
 * - Progress gaps (unstarted lessons, untested topics)
 * - Exam date proximity (intensity scaling)
 * - Learning variety (mix MCQs, lessons, TBS)
 * - NEW: Curriculum awareness (only quiz on topics from completed lessons)
 * 
 * Philosophy: 70% reinforcement (weak areas), 30% new material
 */

import { fetchLessonsBySection } from './lessonService';
import { POINT_VALUES } from '../config/examConfig';
import type { CourseId, ExamSection } from '../types';
import { TBSHistoryEntry } from './questionHistoryService';
import { 
  getCoveredTopics, 
  getPreviewTopics, 
  getUnlockedTBSTypes 
} from './curriculumService';

export interface DailyActivity {
  id: string;
  type: 'lesson' | 'mcq' | 'tbs' | 'flashcards' | 'review';
  title: string;
  description: string;
  estimatedMinutes: number;
  points: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
  reason: string; // Why this activity was recommended
  params: {
    lessonId?: string;
    tbsId?: string;
    section?: string;
    topic?: string;
    topics?: string[];
    questionCount?: number;
    difficulty?: string;
    mode?: string;
  };
  completed?: boolean;
  completedAt?: string;
}

export interface DailyPlan {
  date: string;
  section: string;
  targetPoints: number;
  estimatedMinutes: number;
  activities: DailyActivity[];
  summary: {
    totalActivities: number;
    lessonCount: number;
    mcqCount: number;
    tbsCount: number;
    flashcardCount: number;
    weakAreaFocus: string[];
  };
  generatedAt: string;
}

export interface TopicStats {
  topic: string;
  topicId?: string;
  accuracy: number;
  totalQuestions: number;
  correct: number;
  lastPracticed?: string;
}

export interface UserStudyState {
  section: string;
  examDate?: string;
  dailyGoal: number;
  topicStats: TopicStats[];
  tbsStats?: TBSHistoryEntry[]; // Added TBS stats
  questionsDue?: string[]; // Added Due Questions (Spaced Repetition)
  lessonProgress: Record<string, number>; // lessonId -> progress %
  flashcardsDue: number;
  currentStreak: number;
  todayPoints: number;
  // NEW: Curriculum-aware options
  enableCurriculumFilter?: boolean; // Filter MCQs to covered topics only
  enablePreviewMode?: boolean; // Allow 10% lookahead for next topics
}

// Average points per MCQ (used for estimates)
const MCQ_AVG_POINTS = 2; // Average of easy(1) + medium(2) + hard(3)

// Minutes per activity type
const ACTIVITY_DURATION = {
  lesson_short: 15,
  lesson_medium: 25,
  lesson_long: 40,
  mcq_10: 12,
  mcq_15: 18,
  mcq_20: 25,
  tbs: 20,
  flashcards: 10,
};

/**
 * Generate a smart daily study plan
 */
export const generateDailyPlan = async (
  state: UserStudyState,
  courseId: CourseId = 'cpa'
): Promise<DailyPlan> => {
  const activities: DailyActivity[] = [];
  const today = new Date().toISOString().split('T')[0];
  
  // Calculate intensity based on exam proximity
  const intensity = calculateIntensity(state.examDate);
  const targetMinutes = getTargetMinutes(state.dailyGoal, intensity);
  let remainingMinutes = targetMinutes;
  void (state.dailyGoal - state.todayPoints); // Track remaining for future use
  
  // Track what we're adding for summary
  const weakAreaFocus: string[] = [];
  
  // NEW: Get covered topics for curriculum filtering
  let coveredTopics: Set<string> = new Set();
  let previewTopics: Set<string> = new Set();
  
  if (state.enableCurriculumFilter) {
    coveredTopics = await getCoveredTopics(
      state.lessonProgress, 
      state.section as ExamSection, 
      courseId
    );
    
    // Add preview topics if enabled (10% lookahead)
    if (state.enablePreviewMode) {
      previewTopics = await getPreviewTopics(
        state.lessonProgress,
        state.section as ExamSection,
        0.1, // 10% lookahead
        courseId
      );
    }
  }
  
  // Filter topic stats to only covered topics (if curriculum filter enabled)
  const filteredTopicStats = state.enableCurriculumFilter && coveredTopics.size > 0
    ? state.topicStats.filter(t => {
        const normalizedTopic = t.topic.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
        // Check if topic is covered or in preview
        for (const covered of coveredTopics) {
          const normalizedCovered = covered.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
          if (normalizedTopic === normalizedCovered ||
              normalizedTopic.includes(normalizedCovered) ||
              normalizedCovered.includes(normalizedTopic)) {
            return true;
          }
        }
        // Check preview topics too
        for (const preview of previewTopics) {
          const normalizedPreview = preview.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
          if (normalizedTopic === normalizedPreview ||
              normalizedTopic.includes(normalizedPreview) ||
              normalizedPreview.includes(normalizedTopic)) {
            return true;
          }
        }
        return false;
      })
    : state.topicStats;
  
  // 1. CRITICAL: Weak areas first (accuracy < 60%)
  const criticalWeakAreas = filteredTopicStats
    .filter(t => t.accuracy < 60 && t.totalQuestions >= 3)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 3);
  
  for (const weak of criticalWeakAreas) {
    if (remainingMinutes < 10) break;
    
    weakAreaFocus.push(weak.topic);
    activities.push({
      id: `weak-${weak.topic}-${today}`,
      type: 'mcq',
      title: `Strengthen: ${weak.topic}`,
      description: `Your accuracy is ${weak.accuracy}%. Let's improve it.`,
      estimatedMinutes: ACTIVITY_DURATION.mcq_15,
      points: 15 * MCQ_AVG_POINTS, // Estimate
      priority: 'critical',
      reason: `Only ${weak.accuracy}% accuracy - this topic needs work`,
      params: {
        section: state.section,
        topic: weak.topic,
        questionCount: 15,
        mode: 'study',
      },
    });
    remainingMinutes -= ACTIVITY_DURATION.mcq_15;
  }
  
  // 2. HIGH: Medium weak areas (60-70% accuracy)
  const mediumWeakAreas = filteredTopicStats
    .filter(t => t.accuracy >= 60 && t.accuracy < 70 && t.totalQuestions >= 3)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 2);
  
  for (const weak of mediumWeakAreas) {
    if (remainingMinutes < 10) break;
    
    weakAreaFocus.push(weak.topic);
    activities.push({
      id: `review-${weak.topic}-${today}`,
      type: 'mcq',
      title: `Review: ${weak.topic}`,
      description: `At ${weak.accuracy}% - close to mastery!`,
      estimatedMinutes: ACTIVITY_DURATION.mcq_10,
      points: 10 * MCQ_AVG_POINTS,
      priority: 'high',
      reason: `${weak.accuracy}% accuracy - almost there, let's solidify`,
      params: {
        section: state.section,
        topic: weak.topic,
        questionCount: 10,
        mode: 'study',
      },
    });
    remainingMinutes -= ACTIVITY_DURATION.mcq_10;
  }
  
  // 3a. HIGH: Spaced Repetition (Questions Due)
  // This is critical for retention - catches items you are about to forget
  if (state.questionsDue && state.questionsDue.length >= 5 && remainingMinutes >= 15) {
      const dueCount = Math.min(state.questionsDue.length, 15);
      activities.push({
          id: `review-due-${today}`,
          type: 'mcq',
          title: 'Retention Review',
          description: `${state.questionsDue.length} questions due for spaced repetition`,
          estimatedMinutes: ACTIVITY_DURATION.mcq_15,
          points: dueCount * MCQ_AVG_POINTS,
          priority: 'high',
          reason: 'Spaced repetition: Review these now to lock them in long-term memory',
          params: {
              section: state.section,
              questionCount: dueCount,
              mode: 'study', // Will trigger smart selection which prioritizes these due questions
          }
      });
      remainingMinutes -= ACTIVITY_DURATION.mcq_15;
  }

  // 3. MEDIUM: Flashcard review if cards are due
  if (state.flashcardsDue > 0 && remainingMinutes >= 10) {
    activities.push({
      id: `flashcards-${today}`,
      type: 'flashcards',
      title: 'Spaced Review',
      description: `${state.flashcardsDue} cards due for review`,
      estimatedMinutes: ACTIVITY_DURATION.flashcards,
      points: Math.min(state.flashcardsDue, 20) * POINT_VALUES.flashcard_review,
      priority: 'medium',
      reason: 'Spaced repetition - review before you forget',
      params: {
        section: state.section,
        mode: 'review',
      },
    });
    remainingMinutes -= ACTIVITY_DURATION.flashcards;
  }
  
  // 4. MEDIUM: New lesson if they have incomplete or unstarted ones
  const lessons = await fetchLessonsBySection(state.section, courseId);
  const incompleteLesson = lessons.find(l => {
    const progress = state.lessonProgress[l.id] || 0;
    return progress > 0 && progress < 100;
  });
  
  const unstartedLesson = lessons.find(l => {
    const progress = state.lessonProgress[l.id] || 0;
    return progress === 0;
  });
  
  if (incompleteLesson && remainingMinutes >= 15) {
    const progress = state.lessonProgress[incompleteLesson.id] || 0;
    activities.push({
      id: `lesson-${incompleteLesson.id}`,
      type: 'lesson',
      title: `Continue: ${incompleteLesson.title}`,
      description: `${progress}% complete - pick up where you left off`,
      estimatedMinutes: Math.round((incompleteLesson.duration || 30) * (1 - progress / 100)),
      points: POINT_VALUES.lesson_medium,
      priority: 'medium',
      reason: 'Finish what you started for better retention',
      params: {
        lessonId: incompleteLesson.id,
        section: state.section,
      },
    });
    remainingMinutes -= ACTIVITY_DURATION.lesson_medium;
  } else if (unstartedLesson && remainingMinutes >= 15) {
    activities.push({
      id: `lesson-${unstartedLesson.id}`,
      type: 'lesson',
      title: `Learn: ${unstartedLesson.title}`,
      description: 'New material to expand your knowledge',
      estimatedMinutes: unstartedLesson.duration || ACTIVITY_DURATION.lesson_medium,
      points: POINT_VALUES.lesson_medium,
      priority: 'medium',
      reason: 'New content - keep progressing through the material',
      params: {
        lessonId: unstartedLesson.id,
        section: state.section,
      },
    });
    remainingMinutes -= ACTIVITY_DURATION.lesson_medium;
  }
  
  // 5. MEDIUM: TBS practice (critical - 50% of exam!)
  // Check if they've done any TBS today based on activities
  // NEW: Also check if TBS is unlocked based on lesson progress
  const tbsNeeded = activities.filter(a => a.type === 'tbs').length === 0;
  if (tbsNeeded && remainingMinutes >= 15) {
    const tbsTopics = getTBSTopicsForSection(state.section);
    let targetTBSTopic = tbsTopics[0];
    let reason = 'TBS = 50% of your exam score. Practice daily!';
    let tbsPriority: 'critical' | 'high' | 'medium' | 'low' = 'medium';
    let tbsLocked = false;
    let lockedReason = '';
    
    // NEW: Check curriculum unlock status for TBS
    if (state.enableCurriculumFilter) {
      const unlockedTBS = await getUnlockedTBSTypes(
        state.section as ExamSection,
        state.lessonProgress,
        courseId
      );
      
      // Filter to only unlocked TBS types
      const unlockedTypes = unlockedTBS.filter(t => t.isUnlocked).map(t => t.type);
      const lockedTypes = unlockedTBS.filter(t => !t.isUnlocked);
      
      if (unlockedTypes.length === 0) {
        // No TBS unlocked yet - recommend completing lessons first
        tbsLocked = true;
        if (lockedTypes.length > 0) {
          const nextToUnlock = lockedTypes.sort((a, b) => b.progress - a.progress)[0];
          lockedReason = `Complete more lessons to unlock TBS practice. ${nextToUnlock.type} is ${nextToUnlock.progress}% unlocked.`;
        }
      } else {
        // Filter tbsTopics to only unlocked ones
        const filteredTbsTopics = tbsTopics.filter(t => 
          unlockedTypes.some(u => u.toLowerCase() === t.toLowerCase())
        );
        if (filteredTbsTopics.length > 0) {
          // Only consider unlocked TBS topics for selection
          targetTBSTopic = filteredTbsTopics[0];
          reason = `Unlocked TBS: ${targetTBSTopic} - you've learned the prerequisites!`;
        }
      }
    }
    
    if (!tbsLocked) {
      // Intelligent selection using TBS history
      if (state.tbsStats && state.tbsStats.length > 0) {
         const sectionStats = state.tbsStats.filter(s => s.section === state.section);
         
         // Build a set of mastered TBS topics (approximate from IDs)
         const masteredTopicPatterns = sectionStats
             .filter(s => s.mastered)
             .map(s => s.tbsId.toLowerCase());
         
         // Find topics NOT yet practiced or not mastered
         const unpracticedTopics = tbsTopics.filter(topic => {
             const topicLower = topic.toLowerCase().replace(/\\s+/g, '-');
             return !masteredTopicPatterns.some(pattern => 
                 pattern.includes(topicLower) || topicLower.includes(pattern.split('-')[0])
             );
         });
         
         if (unpracticedTopics.length > 0) {
             // Prioritize topics never attempted
             targetTBSTopic = unpracticedTopics[0];
             reason = `New TBS topic: You haven't practiced ${targetTBSTopic} yet`;
             tbsPriority = 'high'; // Elevate priority for coverage gaps
         } else {
             // All topics practiced - focus on lowest scoring
             const weakestStats = sectionStats
                 .filter(s => !s.mastered)
                 .sort((a, b) => (a.avgScore || 0) - (b.avgScore || 0));
             
             if (weakestStats.length > 0) {
                 // Try to match ID pattern back to topic name
                 const weakestId = weakestStats[0].tbsId.toLowerCase();
                 const matchedTopic = tbsTopics.find(t => 
                     weakestId.includes(t.toLowerCase().replace(/\\s+/g, '-')) ||
                     t.toLowerCase().includes(weakestId.split('-')[0])
                 );
                 targetTBSTopic = matchedTopic || tbsTopics[0];
                 reason = `Weak TBS: ${Math.round(weakestStats[0].avgScore)}% avg score - improve this`;
                 tbsPriority = 'high';
             }
         }
      } else {
          // No history - rotate through topics by day
          const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
          targetTBSTopic = tbsTopics[dayOfYear % tbsTopics.length];
          reason = `Introduction: ${targetTBSTopic} simulation practice`;
      }

      activities.push({
        id: `tbs-${today}`,
        type: 'tbs',
        title: 'Task-Based Simulation',
        description: `Practice: ${targetTBSTopic}`,
        estimatedMinutes: ACTIVITY_DURATION.tbs,
        points: POINT_VALUES.tbs_basic,
        priority: tbsPriority,
        reason,
        params: {
          section: state.section,
          topic: targetTBSTopic,
        },
      });
      remainingMinutes -= ACTIVITY_DURATION.tbs;
    }
    // NOTE: When TBS is locked, we simply don't add it to the plan.
    // The lesson recommendations (section 4) already handle suggesting
    // the next lesson to complete, which will naturally unlock TBS.
    // This prevents showing "Start" buttons on activities users can't access.
  }
  
  // 6. LOW: General practice if time remains
  if (remainingMinutes >= 10) {
    activities.push({
      id: `practice-mixed-${today}`,
      type: 'mcq',
      title: 'Mixed Practice',
      description: 'Random questions across all topics',
      estimatedMinutes: ACTIVITY_DURATION.mcq_10,
      points: 10 * MCQ_AVG_POINTS,
      priority: 'low',
      reason: 'Variety helps build connections between topics',
      params: {
        section: state.section,
        questionCount: 10,
        mode: 'study',
      },
    });
  }
  
  // Sort by priority
  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  activities.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  
  // Calculate summary
  const summary = {
    totalActivities: activities.length,
    lessonCount: activities.filter(a => a.type === 'lesson').length,
    mcqCount: activities.filter(a => a.type === 'mcq').reduce((sum, a) => sum + (a.params.questionCount || 0), 0),
    tbsCount: activities.filter(a => a.type === 'tbs').length,
    flashcardCount: activities.filter(a => a.type === 'flashcards').length,
    weakAreaFocus: [...new Set(weakAreaFocus)],
  };
  
  return {
    date: today,
    section: state.section,
    targetPoints: state.dailyGoal,
    estimatedMinutes: activities.reduce((sum, a) => sum + a.estimatedMinutes, 0),
    activities,
    summary,
    generatedAt: new Date().toISOString(),
  };
};

/**
 * Calculate study intensity based on exam date proximity
 */
const calculateIntensity = (examDate?: string): number => {
  if (!examDate) return 1.0; // Default intensity
  
  const daysUntilExam = Math.ceil(
    (new Date(examDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  
  if (daysUntilExam <= 7) return 1.5;   // Final week - intense
  if (daysUntilExam <= 14) return 1.3;  // Two weeks out
  if (daysUntilExam <= 30) return 1.2;  // One month out
  return 1.0;
};

/**
 * Get target study minutes based on daily goal and intensity
 */
const getTargetMinutes = (dailyGoal: number, intensity: number): number => {
  // Roughly 1 point = 1 minute of study
  const baseMinutes = dailyGoal * 1.5;
  return Math.round(baseMinutes * intensity);
};

/**
 * Get TBS topics for a section
 */
const getTBSTopicsForSection = (section: string): string[] => {
  const tbsTopics: Record<string, string[]> = {
    FAR: ['Journal Entries', 'Bank Reconciliation', 'Depreciation', 'Lease Classification', 'Financial Statements'],
    AUD: ['Audit Sampling', 'Risk Assessment', 'Internal Control', 'Substantive Procedures', 'Audit Report'],
    REG: ['Tax Return', 'Basis Calculation', 'Entity Selection', 'Tax Credits', 'Depreciation'],
    BAR: ['Cost Accounting', 'Variance Analysis', 'Data Analytics', 'Budgeting', 'Performance Metrics'],
    ISC: ['IT Controls', 'System Security', 'Data Management', 'SOC Reports', 'Cybersecurity'],
    TCP: ['Tax Planning', 'Entity Restructuring', 'Compensation Planning', 'Retirement Planning', 'Estate Planning'],
  };
  
  return tbsTopics[section] || tbsTopics.FAR;
};

/**
 * Get adaptive questions - prioritizes weak areas and spaced repetition
 */
export const getAdaptiveQuestionTopics = (
  topicStats: TopicStats[],
  targetCount: number = 15
): { topic: string; count: number; reason: string }[] => {
  const result: { topic: string; count: number; reason: string }[] = [];
  let remaining = targetCount;
  
  // 50% from weak areas (< 70% accuracy)
  const weakTopics = topicStats
    .filter(t => t.accuracy < 70 && t.totalQuestions >= 3)
    .sort((a, b) => a.accuracy - b.accuracy);
  
  const weakCount = Math.ceil(targetCount * 0.5);
  for (const topic of weakTopics) {
    if (remaining <= 0) break;
    const count = Math.min(5, remaining, weakCount);
    result.push({
      topic: topic.topic,
      count,
      reason: `Weak area: ${topic.accuracy}% accuracy`,
    });
    remaining -= count;
  }
  
  // 30% from topics not practiced recently
  const staleTopics = topicStats
    .filter(t => {
      if (!t.lastPracticed) return true;
      const daysSince = Math.ceil(
        (Date.now() - new Date(t.lastPracticed).getTime()) / (1000 * 60 * 60 * 24)
      );
      return daysSince > 7;
    })
    .sort((a, b) => {
      const aDate = a.lastPracticed ? new Date(a.lastPracticed).getTime() : 0;
      const bDate = b.lastPracticed ? new Date(b.lastPracticed).getTime() : 0;
      return aDate - bDate;
    });
  
  const staleCount = Math.ceil(targetCount * 0.3);
  for (const topic of staleTopics) {
    if (remaining <= 0) break;
    if (result.find(r => r.topic === topic.topic)) continue;
    const count = Math.min(3, remaining, staleCount);
    result.push({
      topic: topic.topic,
      count,
      reason: 'Not practiced recently - prevent forgetting',
    });
    remaining -= count;
  }
  
  // 20% random for variety
  if (remaining > 0) {
    result.push({
      topic: 'mixed',
      count: remaining,
      reason: 'Variety - build connections between topics',
    });
  }
  
  return result;
};

/**
 * Analyze what the user should focus on next
 */
export const analyzeNextFocus = (
  topicStats: TopicStats[],
  lessonProgress: Record<string, number>,
  totalLessons: number
): {
  primaryFocus: string;
  secondaryFocus: string;
  readinessGaps: string[];
  strengths: string[];
} => {
  // Find weakest areas
  const weakAreas = topicStats
    .filter(t => t.accuracy < 70 && t.totalQuestions >= 5)
    .sort((a, b) => a.accuracy - b.accuracy);
  
  // Find strengths
  const strengths = topicStats
    .filter(t => t.accuracy >= 80 && t.totalQuestions >= 5)
    .sort((a, b) => b.accuracy - a.accuracy)
    .slice(0, 3)
    .map(t => t.topic);
  
  // Calculate lesson completion
  const completedLessons = Object.values(lessonProgress).filter(p => p >= 100).length;
  const lessonCompletion = totalLessons > 0 ? completedLessons / totalLessons : 0;
  
  let primaryFocus = 'Practice MCQs';
  let secondaryFocus = 'Continue lessons';
  
  if (lessonCompletion < 0.5) {
    primaryFocus = 'Complete more lessons';
    secondaryFocus = weakAreas[0]?.topic ? `Practice ${weakAreas[0].topic}` : 'Practice MCQs';
  } else if (weakAreas.length > 0) {
    primaryFocus = `Focus on ${weakAreas[0].topic}`;
    secondaryFocus = weakAreas[1]?.topic ? `Then ${weakAreas[1].topic}` : 'TBS Practice';
  }
  
  return {
    primaryFocus,
    secondaryFocus,
    readinessGaps: weakAreas.slice(0, 5).map(w => `${w.topic} (${w.accuracy}%)`),
    strengths,
  };
};

export default {
  generateDailyPlan,
  getAdaptiveQuestionTopics,
  analyzeNextFocus,
};

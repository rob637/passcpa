/**
 * DailyPlan Component
 * 
 * Displays a personalized daily study plan with:
 * - Activity cards (lessons, MCQs, TBS, flashcards)
 * - Progress tracking (synced to Firestore)
 * - Priority indicators
 * - Carryover of incomplete activities from yesterday
 * - One-click navigation to each activity
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import logger from '../utils/logger';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Target,
  FileSpreadsheet,
  Brain,
  CheckCircle,
  Clock,
  ChevronRight,
  Sparkles,
  Zap,
  AlertCircle,
  Loader2,
  RefreshCw,
  Calendar,
  RotateCcw,
  PenTool,
  Briefcase,
} from 'lucide-react';
import { Button } from './common/Button';
import { Card } from './common/Card';
import { useAuth } from '../hooks/useAuth';
import { useStudy } from '../hooks/useStudy';
import { useCourse } from '../providers/CourseProvider';
import { useNavigation } from './navigation';
import { DailyActivity, UserStudyState } from '../services/dailyPlanService';
import { 
  getOrCreateTodaysPlan, 
  markActivityCompleted,
  markActivityStarted,
  PersistedDailyPlan,
} from '../services/dailyPlanPersistence';
import { fetchLessonsBySection } from '../services/lessonService';
import { getTBSHistory, getDueQuestions } from '../services/questionHistoryService';
import { getCurrentSection, getExamDate } from '../utils/profileHelpers';
import { getDefaultSection } from '../utils/sectionUtils';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { 
  getCourseLearnPath,
  getCourseLessonPath,
  getCoursePracticePath, 
  getCourseTBSPath, 
  getCourseHomePath,
} from '../utils/courseNavigation';
import clsx from 'clsx';

// Storage key for today's completed activities (fallback for offline)
const getStorageKey = () => `dailyplan_completed_${new Date().toISOString().split('T')[0]}`;

// Helper to load completed activities from localStorage
const loadCompletedFromStorage = (): Set<string> => {
  try {
    const stored = localStorage.getItem(getStorageKey());
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
};

// Helper to save completed activities to localStorage (fallback)
const saveCompletedToStorage = (completed: Set<string>): void => {
  try {
    localStorage.setItem(getStorageKey(), JSON.stringify(Array.from(completed)));
  } catch {
    // Storage full or unavailable
  }
};

interface DailyPlanCardProps {
  compact?: boolean;
  onActivityStart?: (activity: DailyActivity) => void;
}

const DailyPlanCard: React.FC<DailyPlanCardProps> = ({ compact = false, onActivityStart }) => {
  const navigate = useNavigate();
  const { userProfile, user } = useAuth();
  const { stats, dailyProgress, getTopicPerformance, getLessonProgress } = useStudy();
  const { courseId, course } = useCourse();
  const { startDailyPlanSession } = useNavigation();
  
  const [plan, setPlan] = useState<PersistedDailyPlan | null>(null);
  // Start with loading=false; we set to true only when actually loading
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState(false);
  const [hasCarryover, setHasCarryover] = useState(false);
  const [hasAttemptedLoad, setHasAttemptedLoad] = useState(false);
  const [missingExamDate, setMissingExamDate] = useState(false);
  const [pastExamDate, setPastExamDate] = useState(false);
  
  // Use refs for volatile values that shouldn't trigger plan regeneration
  // Stats and dailyProgress change frequently (after every activity), but the
  // daily plan should only be generated once per day or when explicitly refreshed.
  const statsRef = useRef(stats);
  const dailyProgressRef = useRef(dailyProgress);
  useEffect(() => { statsRef.current = stats; }, [stats]);
  useEffect(() => { dailyProgressRef.current = dailyProgress; }, [dailyProgress]);
  
  // Track section to detect changes - course-aware
  const currentSection = getCurrentSection(userProfile, courseId, getDefaultSection);

  // Load daily plan from Firestore (with caching and carryover)
  const loadPlan = useCallback(async (forceRegenerate: boolean = false) => {
    // Early return if profile not loaded yet
    if (!userProfile || !user?.uid) {
      return;
    }
    
    // Check if exam date is set - required for personalized planning
    const examDate = getExamDate(userProfile, currentSection, courseId);
    if (!examDate) {
      setMissingExamDate(true);
      setPastExamDate(false);
      setHasAttemptedLoad(true);
      return;
    }
    
    // Check if exam date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const examDateNormalized = new Date(examDate);
    examDateNormalized.setHours(0, 0, 0, 0);
    
    if (examDateNormalized < today) {
      setPastExamDate(true);
      setMissingExamDate(false);
      setHasAttemptedLoad(true);
      return;
    }
    
    // Exam date exists and is in the future - clear flags and proceed
    setMissingExamDate(false);
    setPastExamDate(false);
    setLoading(true);
    setHasAttemptedLoad(true);
    setError(null);
    
    try {
      // Get topic performance data for current section - use course-aware section
      const section = currentSection; // Already course-aware from getCurrentSection
      // For single-exam courses (CISA, CFP), pass undefined to get all domains/sections
      const SINGLE_EXAM_COURSES = ['cisa', 'cfp'];
      const isSingleExam = SINGLE_EXAM_COURSES.includes(courseId);
      const topicStats = getTopicPerformance
        ? await getTopicPerformance(isSingleExam ? undefined : section)
        : [];
      
      // CRITICAL: Fetch actual lesson progress from Firestore subcollection
      const lessonProgressData = getLessonProgress ? await getLessonProgress() : {};
      
      // Transform lesson progress to { lessonId: progressPercent }
      const lessonProgress: Record<string, number> = {};
      Object.entries(lessonProgressData).forEach(([lessonId, data]: [string, any]) => {
        if (data.status === 'completed' || data.completedAt) {
          lessonProgress[lessonId] = 100;
        } else if (typeof data.progress === 'number') {
          lessonProgress[lessonId] = data.progress;
        } else {
          lessonProgress[lessonId] = 50;
        }
      });
      
      // ── Auto-advance for single-exam courses (CISA, CFP) ───────────
      // If all lessons in the current section are complete, move to the next 
      // section that still has incomplete lessons. This way the daily plan
      // automatically progresses through domains without the user manually switching.
      let effectiveSection = section;
      if (isSingleExam && course?.sections) {
        const currentSectionLessons = await fetchLessonsBySection(section, courseId);
        const completedLessonsInSection = currentSectionLessons.filter(
          l => lessonProgress[l.id] >= 100
        ).length;
        
        if (currentSectionLessons.length > 0 && completedLessonsInSection >= currentSectionLessons.length) {
          // Current section is complete — find next incomplete section in order
          for (const s of course.sections) {
            if (s.id === section) continue; // Skip current
            const sLessons = await fetchLessonsBySection(s.id, courseId);
            const sCompleted = sLessons.filter(l => lessonProgress[l.id] >= 100).length;
            if (sLessons.length > 0 && sCompleted < sLessons.length) {
              effectiveSection = s.id;
              logger.info(`Auto-advancing from completed ${section} to ${effectiveSection}`);
              break;
            }
          }
        }
      }
      
      // Handle examDate — use course-aware getExamDate helper
      let examDateStr: string | undefined;
      const examDateObj = getExamDate(userProfile, section, courseId);
      if (examDateObj) {
        examDateStr = examDateObj.toISOString().split('T')[0];
      } else {
        // Legacy fallback: try userProfile.examDate directly
        const rawExamDate = userProfile.examDate;
        if (rawExamDate) {
          if (typeof rawExamDate === 'string') {
            examDateStr = rawExamDate;
          } else if (rawExamDate instanceof Date) {
            examDateStr = rawExamDate.toISOString().split('T')[0];
          } else if (typeof (rawExamDate as any).toDate === 'function') {
            examDateStr = (rawExamDate as any).toDate().toISOString().split('T')[0];
          }
        }
      }
      
      // Build user study state - use effective section (may be auto-advanced)
      const [tbsStats, questionsDue] = await Promise.all([
          getTBSHistory(user.uid, effectiveSection),
          getDueQuestions(user.uid, effectiveSection)
      ]);

      // Map practice-based topic performance
      const mappedTopicStats = topicStats.map((t: any) => ({
        topic: t.topic || t.id,
        topicId: t.topicId || t.id,
        accuracy: t.accuracy || 0,
        totalQuestions: t.questions || t.totalQuestions || 0,
        correct: t.correct || Math.round((t.accuracy || 0) * (t.questions || t.totalQuestions || 0) / 100),
        lastPracticed: t.lastPracticed,
      }));

      // NOTE: Diagnostic quiz results are intentionally NOT seeded into topicStats.
      // Diagnostic scores are rough assessments — they should not generate
      // "Strengthen" activities for topics the user hasn't actually studied.
      // The daily plan focuses on lessons first; "Strengthen" activities only
      // appear for topics with real practice history.

      const studyState: UserStudyState = {
        section: effectiveSection,
        examDate: examDateStr,
        dailyGoal: userProfile.dailyGoal || 50,
        topicStats: mappedTopicStats,
        tbsStats, 
        questionsDue,
        lessonProgress,
        flashcardsDue: (statsRef.current as any)?.flashcardsDue || 0,
        currentStreak: (statsRef.current as any)?.currentStreak || 0,
        todayPoints: Math.round((dailyProgressRef.current / 100) * (userProfile.dailyGoal || 50)),
        // NEW: Enable curriculum-aware learning - only quiz on covered topics
        enableCurriculumFilter: userProfile.enableCurriculumFilter ?? true, // Default to enabled
        enablePreviewMode: userProfile.enablePreviewMode ?? false, // Optional 10% lookahead
        // Phase 4: Study day preferences (e.g., [1,2,3,4,5] = weekdays only)
        studyDayPreferences: userProfile.studyDayPreferences,
      };
      
      // Use the persistence layer to get/create today's plan
      // This handles caching and carryover automatically!
      const persistedPlan = await getOrCreateTodaysPlan(
        user.uid,
        studyState,
        courseId,
        forceRegenerate
      );
      
      setPlan(persistedPlan);
      setCompletedActivities(new Set(persistedPlan.completedActivities || []));
      setHasCarryover(!!persistedPlan.carryoverFrom);
      
      // Also save to localStorage as fallback
      saveCompletedToStorage(new Set(persistedPlan.completedActivities || []));
    } catch (err) {
      logger.error('Error loading daily plan:', err);
      setError('Unable to load your daily plan');
      // Try localStorage fallback
      setCompletedActivities(loadCompletedFromStorage());
    } finally {
      setLoading(false);
    }
  }, [userProfile, user?.uid, getTopicPerformance, getLessonProgress, courseId, currentSection, course]);

  // Track previous section to detect changes
  const prevSectionRef = useRef<string | null>(null);
  
  // Load plan on mount and when section changes
  useEffect(() => {
    // Skip if auth not ready yet
    if (!userProfile || !user?.uid) {
      return;
    }
    
    // Determine if this is a section change (not initial load)
    const prevSection = prevSectionRef.current;
    const sectionChanged = prevSection !== null && prevSection !== currentSection;
    
    if (sectionChanged) {
      // Section changed - load the plan for the new section (NOT force regenerate)
      // Each section has its own cached plan, so we just need to load it
      logger.log(`Section changed from ${prevSection} to ${currentSection}, loading plan for new section`);
    }
    
    // Update the ref for next comparison
    prevSectionRef.current = currentSection;
    
    // Never force regenerate on section change - each section has its own plan
    // Only force regenerate when user explicitly requests it (e.g., refresh button)
    loadPlan(false);
  }, [loadPlan, currentSection, userProfile, user?.uid]);

  // Timeout: if loading takes more than 15 seconds, show error with retry
  useEffect(() => {
    if (!loading) return;
    
    const timeout = setTimeout(() => {
      if (loading) {
        setLoading(false);
        setError('Plan generation timed out. Please try again.');
        logger.warn('DailyPlanCard: Plan generation timed out after 15s');
      }
    }, 15000);
    
    return () => clearTimeout(timeout);
  }, [loading]);

  // Track whether auto-completion from URL params has been handled
  const autoCompleteHandledRef = useRef(false);
  
  // Check URL params for returning from an activity (auto-completion)
  // Depends on `plan` and `loading` so that we wait for the plan to load before
  // processing — otherwise plan is null and we lose activity metadata/section info.
  useEffect(() => {
    // Skip if already handled or plan hasn't loaded yet
    if (autoCompleteHandledRef.current || loading) return;
    
    const params = new URLSearchParams(window.location.search);
    const from = params.get('from');
    const activityId = params.get('activityId');
    const completed = params.get('completed');
    
    // If returning from dailyplan activity AND it was marked completed
    if (from === 'dailyplan' && activityId && completed === 'true' && user?.uid) {
      autoCompleteHandledRef.current = true;
      
      // Find the activity in the plan to get metadata for duration tracking
      const matchedActivity = plan?.activities.find(a => a.id === activityId);
      // Mark the activity as complete - pass section and courseId for correct cache key
      const section = plan?.section || currentSection;
      markActivityCompleted(
        user.uid,
        activityId,
        section,
        matchedActivity?.estimatedMinutes,
        matchedActivity?.type,
        courseId
      ).then(() => {
        setCompletedActivities(prev => {
          const updated = new Set(prev);
          updated.add(activityId);
          saveCompletedToStorage(updated);
          return updated;
        });
        logger.log('Activity auto-marked complete from return:', activityId);
        
        // Clean up URL params
        const url = new URL(window.location.href);
        url.searchParams.delete('from');
        url.searchParams.delete('activityId');
        url.searchParams.delete('completed');
        window.history.replaceState({}, '', url.pathname);
      }).catch(err => logger.error('Failed to auto-mark activity:', err));
    }
  }, [user?.uid, plan, loading, currentSection, courseId]);

  // Refresh when page becomes visible (sync across devices)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadPlan(); // Refresh from Firestore
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [loadPlan]);

  // Handle activity click
  const handleActivityClick = (activity: DailyActivity) => {
    if (onActivityStart) {
      onActivityStart(activity);
    }
    
    // Start a daily plan session so back buttons return here
    startDailyPlanSession(activity.id, activity.title);
    
    // Record start time for duration tracking
    markActivityStarted(activity.id);
    
    // Store the current activity ID for completion tracking
    const fromParam = `from=dailyplan&activityId=${encodeURIComponent(activity.id)}`;
    
    // Navigate based on activity type - using course-aware paths
    switch (activity.type) {
      case 'lesson':
        navigate(`${getCourseLessonPath(courseId, activity.params.lessonId || '')}?${fromParam}`);
        break;
      case 'mcq':
        if (activity.params.topic) {
          const sectionParam = activity.params.section ? `&section=${encodeURIComponent(activity.params.section)}` : '';
          navigate(`${getCoursePracticePath(courseId)}?topic=${encodeURIComponent(activity.params.topic)}&count=${activity.params.questionCount || 10}${sectionParam}&${fromParam}`);
        } else {
          const sectionParam = activity.params.section ? `?section=${encodeURIComponent(activity.params.section)}&${fromParam}` : `?${fromParam}`;
          navigate(`${getCoursePracticePath(courseId)}${sectionParam}`);
        }
        break;
      case 'tbs':
        navigate(`${getCourseTBSPath(courseId)}?${fromParam}`);
        break;
      case 'flashcards':
        // Navigate directly to flashcard session (skip setup page) with daily plan params
        const flashcardParams = new URLSearchParams();
        flashcardParams.set('from', 'dailyplan');
        flashcardParams.set('activityId', activity.id);
        if (activity.params?.mode) flashcardParams.set('mode', activity.params.mode);
        if (activity.params?.cardCount) flashcardParams.set('count', String(activity.params.cardCount));
        if (activity.params?.section) flashcardParams.set('section', activity.params.section);
        navigate(`/flashcards/session?${flashcardParams.toString()}`);
        break;
      case 'essay':
        // CMA Essay Simulator
        navigate(`/cma/essay?${fromParam}`);
        break;
      case 'cbq':
        // CMA CBQ (Case-Based Questions) Simulator - Sept 2026+
        navigate(`/cma/cbq?${fromParam}`);
        break;
      case 'case_study':
        // CFP Case Study - navigate to practice with case study mode
        navigate(`/practice?mode=case_study&section=${activity.params.section || ''}&${fromParam}`);
        break;
      default:
        navigate(getCourseHomePath(courseId));
    }
  };

  // NOTE: handleMarkComplete was removed to satisfy noUnusedLocals.
  // Activity completion is handled directly in handleComplete() above.

  // Get icon for activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lesson': return BookOpen;
      case 'mcq': return Target;
      case 'tbs': return FileSpreadsheet;
      case 'flashcards': return Brain;
      case 'essay': return PenTool;
      case 'cbq': return FileSpreadsheet;
      case 'case_study': return Briefcase;
      default: return Sparkles;
    }
  };

  // Get color for activity type
  const getActivityColor = (type: string) => {
    switch (type) {
      case 'lesson': return 'text-primary-500 bg-primary-100 dark:bg-primary-900/30';
      case 'mcq': return 'text-success-500 bg-success-100 dark:bg-success-900/30';
      case 'tbs': return 'text-teal-500 bg-teal-100 dark:bg-teal-900/30';
      case 'flashcards': return 'text-amber-500 bg-amber-100 dark:bg-amber-900/30';
      case 'essay': return 'text-purple-500 bg-purple-100 dark:bg-purple-900/30';
      case 'cbq': return 'text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30';
      case 'case_study': return 'text-indigo-500 bg-indigo-100 dark:bg-indigo-900/30';
      default: return 'text-slate-600 bg-slate-100 dark:bg-slate-800';
    }
  };

  // Get priority badge — only show when it adds information
  // (skip if all activities share the same priority)
  const getPriorityBadge = (priority: string, allActivities?: DailyActivity[]) => {
    const items = allActivities || plan?.activities;
    if (!items || items.length === 0) return null;
    // Don't render badges when every activity has the same priority
    const uniquePriorities = new Set(items.map(a => a.priority));
    if (uniquePriorities.size <= 1) return null;

    switch (priority) {
      case 'critical':
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-400">Weak area</span>;
      case 'high':
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400">Priority</span>;
      default:
        return null;
    }
  };

  // Fallback "Get Started" card when we can't load a personalized plan
  const renderFallbackCard = () => (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-primary-500" />
        <h3 className="font-semibold text-slate-900 dark:text-slate-100">Today's Plan</h3>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
        Start learning to build your personalized study plan.
      </p>
      <div className="space-y-2">
        <Button
          variant="primary"
          size="sm"
          className="w-full"
          onClick={() => navigate(getCourseLearnPath(courseId))}
          leftIcon={BookOpen}
        >
          Start a Lesson
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="w-full"
          onClick={() => navigate(getCoursePracticePath(courseId))}
          leftIcon={Target}
        >
          Practice Questions
        </Button>
      </div>
    </Card>
  );

  // Waiting for auth/profile to load - show fallback immediately
  // This avoids indefinite spinners for users without profile
  if (!userProfile || !user?.uid) {
    return renderFallbackCard();
  }

  // No exam date set - show friendly nudge to set one with direct link
  if (missingExamDate) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-primary-500" />
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">Today's Plan</h3>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          <button 
            onClick={() => navigate('/settings?tab=study')}
            className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
          >
            Set your exam date
          </button>
          {' '}to unlock your personalized daily study plan.
        </p>
        <div className="space-y-2">
          <Button
            variant="primary"
            size="sm"
            className="w-full"
            onClick={() => navigate(getCourseLearnPath(courseId))}
            leftIcon={BookOpen}
          >
            Start a Lesson
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="w-full"
            onClick={() => navigate(getCoursePracticePath(courseId))}
            leftIcon={Target}
          >
            Practice Questions
          </Button>
        </div>
      </Card>
    );
  }

  // Exam date is in the past - prompt to update it
  if (pastExamDate) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-amber-500" />
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">Update Your Exam Date</h3>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          Your exam date has passed.{' '}
          <button 
            onClick={() => navigate('/settings?tab=study')}
            className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
          >
            Update your exam date
          </button>
          {' '}to continue with a new personalized study plan.
        </p>
        <div className="space-y-2">
          <Button
            variant="primary"
            size="sm"
            className="w-full"
            onClick={() => navigate('/settings?tab=study')}
            leftIcon={Calendar}
          >
            Update Exam Date
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="w-full"
            onClick={() => navigate(getCoursePracticePath(courseId))}
            leftIcon={Target}
          >
            Practice Questions
          </Button>
        </div>
      </Card>
    );
  }

  // Actively generating plan
  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-primary-500" />
          <span className="ml-2 text-slate-600">Creating your personalized plan...</span>
        </div>
      </Card>
    );
  }

  // Plan generation failed or hasn't loaded yet
  if (error || (hasAttemptedLoad && !plan)) {
    return (
      <Card className="p-6">
        <div className="flex flex-col items-center justify-center py-8 text-slate-600">
          <div className="flex items-center mb-3">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error || 'Unable to load daily plan'}
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => loadPlan(true)}
              leftIcon={RefreshCw}
            >
              Try Again
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate(getCourseLearnPath(courseId))}
              leftIcon={BookOpen}
            >
              Start Learning
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  // Plan not loaded yet but no error - waiting for first load
  if (!plan) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-primary-500" />
          <span className="ml-2 text-slate-600">Creating your personalized plan...</span>
        </div>
      </Card>
    );
  }

  const completedCount = completedActivities.size;
  const totalActivities = plan.activities.length;
  const progress = totalActivities > 0 ? Math.round((completedCount / totalActivities) * 100) : 0;

  // Compact view for dashboard — shows full plan inline
  if (compact && !expanded) {
    // Show all activities (completed stay visible but marked as done)
    // Sort: incomplete first, then completed
    const allActivities = [...plan.activities].sort((a, b) => {
      const aComplete = completedActivities.has(a.id);
      const bComplete = completedActivities.has(b.id);
      if (aComplete === bComplete) return 0;
      return aComplete ? 1 : -1;
    });
    
    return (
      <Card noPadding className="overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary-500" />
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">Today's Plan</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {completedCount}/{totalActivities} done
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => loadPlan(true)}
                aria-label="Regenerate plan"
                className="w-7 h-7"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-2 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* What's Next insight strip */}
        {plan.whatsNext && (
          <div className="px-4 py-2 bg-primary-50 dark:bg-primary-900/20 border-b border-primary-100 dark:border-primary-800/40 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="text-sm font-medium text-primary-900 dark:text-primary-100">
                {plan.whatsNext.headline}
              </span>
              <p className="text-xs text-primary-700 dark:text-primary-300 line-clamp-1">
                {plan.whatsNext.detail}
              </p>
            </div>
          </div>
        )}
        
        {/* All activities - consistent styling */}
        {allActivities.length > 0 ? (
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {allActivities.map((activity: DailyActivity, index: number) => {
              const Icon = getActivityIcon(activity.type);
              const isComplete = completedActivities.has(activity.id);
              // "Start" button only on first incomplete activity
              const firstIncompleteIndex = allActivities.findIndex(a => !completedActivities.has(a.id));
              const isNext = index === firstIncompleteIndex && !isComplete;
              return (
                <div
                  key={activity.id}
                  className={clsx(
                    "p-3 transition-colors flex items-center gap-3",
                    isComplete 
                      ? "bg-slate-50 dark:bg-slate-800/50 opacity-70" 
                      : "hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer"
                  )}
                  onClick={() => !isComplete && handleActivityClick(activity)}
                >
                  <div className={clsx(
                    'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                    isComplete ? 'bg-success-100 dark:bg-success-900/30' : getActivityColor(activity.type)
                  )}>
                    {isComplete ? (
                      <CheckCircle className="w-4 h-4 text-success-500" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={clsx(
                        "font-medium text-sm truncate",
                        isComplete 
                          ? "text-slate-500 dark:text-slate-400 line-through" 
                          : "text-slate-900 dark:text-slate-100"
                      )}>
                        {activity.title}
                      </span>
                      {!isComplete && getPriorityBadge(activity.priority)}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      {isComplete ? 'Completed' : activity.reason}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {isComplete ? (
                      <span className="text-xs text-success-500 font-medium">Done</span>
                    ) : (
                      <>
                        <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                          <Clock className="w-3 h-3" />
                          {activity.estimatedMinutes}m
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div 
            className="p-4 text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            onClick={() => navigate(getCoursePracticePath(courseId))}
          >
            <Target className="w-8 h-8 text-primary-500 mx-auto mb-2" />
            <p className="text-slate-900 dark:text-white font-medium">No activities planned</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Tap to start practicing</p>
          </div>
        )}
        
        {/* All complete celebration */}
        {completedCount === totalActivities && totalActivities > 0 && (
          <div 
            className="p-3 bg-success-50 dark:bg-success-900/20 border-t border-success-200 dark:border-success-800 cursor-pointer hover:bg-success-100 dark:hover:bg-success-900/30 transition-colors"
            onClick={() => navigate(getCoursePracticePath(courseId))}
          >
            <div className="flex items-center justify-center gap-2 text-sm text-success-700 dark:text-success-300">
              <CheckCircle className="w-4 h-4" />
              <span className="font-medium">All done for today! 🎉</span>
              <span className="text-success-600 dark:text-success-400">Keep going →</span>
            </div>
          </div>
        )}
      </Card>
    );
  }

  // Full/expanded view
  return (
    <Card noPadding className="overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary-500" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Your Daily Plan</h2>
              {hasCarryover && (
                <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs rounded-full flex items-center gap-1">
                  <RotateCcw className="w-3 h-3" />
                  Includes yesterday's tasks
                </span>
              )}
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              {plan.whatsNext
                ? plan.whatsNext.headline
                : plan.summary?.weakAreaFocus?.length > 0 
                  ? `Focusing on: ${plan.summary.weakAreaFocus.slice(0, 2).join(', ')}`
                  : 'Personalized for your progress'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {compact && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpanded(false)}
              >
                Collapse ↑
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => loadPlan(true)}
              aria-label="Regenerate plan"
            >
              <RefreshCw className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-slate-600 dark:text-slate-400">{completedCount}/{totalActivities} activities</span>
            <span className="font-medium text-primary-600">~{plan.estimatedMinutes} min total</span>
          </div>
          <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary-500 to-primary-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
      
      {/* Activities list - keyboard accessible */}
      <div 
        className="divide-y divide-slate-200 dark:divide-slate-700"
        role="list"
        aria-label="Today's study activities"
      >
        {plan.activities.map((activity: DailyActivity, index: number) => {
          const isComplete = completedActivities.has(activity.id);
          const Icon = getActivityIcon(activity.type);
          
          return (
            <div
              key={activity.id}
              role="listitem"
              tabIndex={isComplete ? -1 : 0}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && !isComplete) {
                  e.preventDefault();
                  handleActivityClick(activity);
                }
              }}
              className={clsx(
                'p-4 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500',
                isComplete ? 'bg-slate-50 dark:bg-slate-800/50 opacity-60' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer'
              )}
            >
              <div className="flex items-start gap-3">
                {/* Step number / completion */}
                <div className="flex flex-col items-center">
                  {isComplete ? (
                    <div className="w-8 h-8 rounded-full bg-success-500 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-sm font-medium text-slate-600 dark:text-slate-300">
                      {index + 1}
                    </div>
                  )}
                </div>
                
                {/* Activity content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={clsx(
                      'w-6 h-6 rounded flex items-center justify-center',
                      getActivityColor(activity.type)
                    )}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={clsx(
                      'font-medium',
                      isComplete ? 'text-slate-600 line-through' : 'text-slate-900 dark:text-slate-100'
                    )}>
                      {activity.title}
                    </span>
                    {getPriorityBadge(activity.priority)}
                  </div>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1">{activity.reason}</p>
                  
                  <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      ~{activity.estimatedMinutes}m
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      +{activity.points}pts
                    </span>
                  </div>
                </div>
                
                {/* Action button */}
                {!isComplete ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleActivityClick(activity)}
                  >
                    Start
                  </Button>
                ) : (
                  <span className="px-3 py-1.5 bg-success-100 text-success-700 text-xs font-medium rounded-lg">
                    Done
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Footer */}
      <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-primary-500" />
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {completedCount === 0 
              ? "Complete activities in order for the best learning flow"
              : completedCount < totalActivities 
                ? `${totalActivities - completedCount} more to go - you're doing great!`
                : "Amazing! Keep the momentum with extra practice below"}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default DailyPlanCard;

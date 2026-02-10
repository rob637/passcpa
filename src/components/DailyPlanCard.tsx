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

import React, { useState, useEffect, useCallback } from 'react';
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
  PersistedDailyPlan,
} from '../services/dailyPlanPersistence';
import { getTBSHistory, getDueQuestions } from '../services/questionHistoryService';
import { getCurrentSection } from '../utils/profileHelpers';
import { getDefaultSection } from '../utils/sectionUtils';
import { 
  getCourseLessonPath, 
  getCoursePracticePath, 
  getCourseTBSPath, 
  getCourseFlashcardPath,
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
  const { courseId } = useCourse();
  const { startDailyPlanSession } = useNavigation();
  
  const [plan, setPlan] = useState<PersistedDailyPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState(false);
  const [hasCarryover, setHasCarryover] = useState(false);
  
  // Track section to detect changes - course-aware
  const currentSection = getCurrentSection(userProfile, courseId, getDefaultSection);
  const [lastLoadedSection, setLastLoadedSection] = useState<string | null>(null);

  // Load daily plan from Firestore (with caching and carryover)
  const loadPlan = useCallback(async (forceRegenerate: boolean = false) => {
    if (!userProfile || !user?.uid) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Get topic performance data for current section - use course-aware section
      const section = currentSection; // Already course-aware from getCurrentSection
      const topicStats = getTopicPerformance ? await getTopicPerformance(section) : [];
      
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
      
      // Handle examDate which could be Date, Timestamp, or string
      let examDateStr: string | undefined;
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
      
      // Build user study state - use course-aware section
      const [tbsStats, questionsDue] = await Promise.all([
          getTBSHistory(user.uid, section),
          getDueQuestions(user.uid, section)
      ]);

      const studyState: UserStudyState = {
        section,
        examDate: examDateStr,
        dailyGoal: userProfile.dailyGoal || 50,
        topicStats: topicStats.map((t: any) => ({
          topic: t.topic || t.id,
          topicId: t.topicId || t.id,
          accuracy: t.accuracy || 0,
          totalQuestions: t.questions || t.totalQuestions || 0,
          correct: t.correct || Math.round((t.accuracy || 0) * (t.questions || t.totalQuestions || 0) / 100),
          lastPracticed: t.lastPracticed,
        })),
        tbsStats, 
        questionsDue,
        lessonProgress,
        flashcardsDue: (stats as any)?.flashcardsDue || 0,
        currentStreak: (stats as any)?.currentStreak || 0,
        todayPoints: Math.round((dailyProgress / 100) * (userProfile.dailyGoal || 50)),
        // NEW: Enable curriculum-aware learning - only quiz on covered topics
        enableCurriculumFilter: userProfile.enableCurriculumFilter ?? true, // Default to enabled
        enablePreviewMode: userProfile.enablePreviewMode ?? false, // Optional 10% lookahead
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
      setLastLoadedSection(studyState.section); // Track which section we loaded
      
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
  }, [userProfile, user?.uid, stats, dailyProgress, getTopicPerformance, getLessonProgress, courseId]);

  // Load plan on mount
  useEffect(() => {
    loadPlan();
  }, [loadPlan]);
  
  // Force regenerate plan when section changes
  useEffect(() => {
    // Only trigger if we've loaded a plan before and section has changed
    if (lastLoadedSection && lastLoadedSection !== currentSection) {
      logger.log(`Section changed from ${lastLoadedSection} to ${currentSection}, regenerating daily plan`);
      loadPlan(true); // Force regenerate for new section
    }
  }, [currentSection, lastLoadedSection, loadPlan]);

  // Check URL params for returning from an activity (auto-completion)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const from = params.get('from');
    const activityId = params.get('activityId');
    const completed = params.get('completed');
    
    // If returning from dailyplan activity AND it was marked completed
    if (from === 'dailyplan' && activityId && completed === 'true' && user?.uid) {
      // Mark the activity as complete - pass section for correct cache key
      const section = plan?.section || currentSection;
      markActivityCompleted(user.uid, activityId, section).then(() => {
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
  }, [user?.uid]);

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
    
    // Store the current activity ID for completion tracking
    const fromParam = `from=dailyplan&activityId=${encodeURIComponent(activity.id)}`;
    
    // Navigate based on activity type - using course-aware paths
    switch (activity.type) {
      case 'lesson':
        navigate(`${getCourseLessonPath(courseId, activity.params.lessonId || '')}?${fromParam}`);
        break;
      case 'mcq':
        if (activity.params.topic) {
          navigate(`${getCoursePracticePath(courseId)}?topic=${encodeURIComponent(activity.params.topic)}&count=${activity.params.questionCount || 10}&${fromParam}`);
        } else {
          navigate(`${getCoursePracticePath(courseId)}?${fromParam}`);
        }
        break;
      case 'tbs':
        navigate(`${getCourseTBSPath(courseId)}?${fromParam}`);
        break;
      case 'flashcards':
        navigate(`${getCourseFlashcardPath(courseId)}?${fromParam}`);
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

  // Get priority badge
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-400">Critical</span>;
      case 'high':
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400">High</span>;
      default:
        return null;
    }
  };

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

  if (error || !plan) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center py-8 text-slate-600">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error || 'Unable to load daily plan'}
        </div>
      </Card>
    );
  }

  const completedCount = completedActivities.size;
  const totalActivities = plan.activities.length;
  const progress = totalActivities > 0 ? Math.round((completedCount / totalActivities) * 100) : 0;

  // Compact view for dashboard (can expand inline)
  if (compact && !expanded) {
    const nextActivity = plan.activities.find((a: DailyActivity) => !completedActivities.has(a.id));
    
    return (
      <Card noPadding className="overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary-500" />
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">Today's Plan</h3>
            </div>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {completedCount}/{totalActivities} done
            </span>
          </div>
          {/* Progress bar */}
          <div className="mt-2 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        {/* Next Activity - highlighted as primary CTA */}
        {nextActivity ? (
          <div 
            className="p-3 sm:p-4 bg-gradient-to-r from-primary-500 to-primary-600 cursor-pointer hover:from-primary-600 hover:to-primary-700 transition-all"
            onClick={() => handleActivityClick(nextActivity)}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex shrink-0 items-center justify-center">
                {React.createElement(getActivityIcon(nextActivity.type), { className: 'w-6 h-6 text-white' })}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-white text-lg leading-tight">
                    {nextActivity.title}
                  </span>
                  {nextActivity.priority === 'critical' && (
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-white/20 text-white shrink-0">Critical</span>
                  )}
                </div>
                <p className="text-sm text-white/80 mt-0.5 line-clamp-1">{nextActivity.reason}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1 bg-white/20 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-white font-semibold text-sm sm:text-base">
                Start <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ) : dailyProgress < 100 ? (
          <div 
            className="p-4 text-center bg-gradient-to-r from-primary-500 to-primary-600 cursor-pointer hover:from-primary-600 hover:to-primary-700 transition-all"
            onClick={() => navigate(getCourseHomePath(courseId))}
          >
            <Target className="w-8 h-8 text-white mx-auto mb-2" />
            <p className="text-white font-medium">Daily plan complete! 🎯</p>
            <p className="text-white/80 text-sm">Continue studying to hit your daily goal</p>
          </div>
        ) : (
          <div 
            className="p-4 text-center bg-gradient-to-r from-success-500 to-success-600 cursor-pointer hover:from-success-600 hover:to-success-700 transition-all"
            onClick={() => navigate(getCoursePracticePath(courseId))}
          >
            <CheckCircle className="w-8 h-8 text-white mx-auto mb-2" />
            <p className="text-white font-medium">All done for today! 🎉</p>
            <p className="text-white/80 text-sm">Want to keep going? Tap for extra practice →</p>
          </div>
        )}
        
        {/* Remaining activities preview */}
        {totalActivities > 1 && (
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <span>Up next:</span>
                <div className="flex gap-1">
                  {plan.activities.slice(1, 4).map((activity: DailyActivity, idx: number) => (
                    <div 
                      key={idx}
                      className={clsx(
                        'w-6 h-6 rounded flex items-center justify-center',
                        getActivityColor(activity.type)
                      )}
                      title={activity.title}
                    >
                      {React.createElement(getActivityIcon(activity.type), { className: 'w-3 h-3' })}
                    </div>
                  ))}
                  {plan.activities.length > 4 && (
                    <span className="text-xs text-slate-600 dark:text-slate-400">+{plan.activities.length - 4}</span>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpanded(true)}
              >
                View All →
              </Button>
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
              {plan.summary?.weakAreaFocus?.length > 0 
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

/**
 * StudyPlan - Main roadmap view showing the complete study plan
 * 
 * Displays:
 * - Overview header with exam date, health status
 * - Week-by-week breakdown with phases
 * - Milestones timeline
 * - Progress tracking
 * - Alerts and recommendations
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar,
  Clock,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Settings,
  BookOpen,
  FileText,
  Zap,
  Map,
  Play,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  Loader2,
} from 'lucide-react';
import { Button } from '../common/Button';
import { StudyPlanCTA } from '../StudyPlanCTA';
import { useStudyPlan } from '../../hooks/useStudyPlan';
import { useCourse } from '../../providers/CourseProvider';
import { useAuth } from '../../hooks/useAuth';
import { fetchAllLessons } from '../../services/lessonService';
import { rebalanceStudyPlan, RebalanceResult } from '../../services/studyPlanService';
import type { Lesson } from '../../types';
import { format, isWithinInterval } from 'date-fns';
import type { StudyPhase, PlanHealth } from '../../types/studyPlan';
import clsx from 'clsx';

// Phase colors and icons
const PHASE_CONFIG: Record<StudyPhase, { color: string; bgColor: string; icon: React.ElementType; label: string }> = {
  'foundation': { 
    color: 'text-blue-600', 
    bgColor: 'bg-blue-100 dark:bg-blue-900/30', 
    icon: BookOpen, 
    label: 'Foundation' 
  },
  'building': { 
    color: 'text-purple-600', 
    bgColor: 'bg-purple-100 dark:bg-purple-900/30', 
    icon: Zap, 
    label: 'Building' 
  },
  'reinforcement': { 
    color: 'text-orange-600', 
    bgColor: 'bg-orange-100 dark:bg-orange-900/30', 
    icon: Target, 
    label: 'Reinforcement' 
  },
  'final-review': { 
    color: 'text-red-600', 
    bgColor: 'bg-red-100 dark:bg-red-900/30', 
    icon: FileText, 
    label: 'Final Review' 
  },
  'exam-week': { 
    color: 'text-green-600', 
    bgColor: 'bg-green-100 dark:bg-green-900/30', 
    icon: CheckCircle, 
    label: 'Exam Week' 
  },
};

// Health status colors
const HEALTH_CONFIG: Record<PlanHealth, { color: string; bgColor: string; label: string }> = {
  'on-track': { color: 'text-green-600', bgColor: 'bg-green-100', label: 'On Track' },
  'slightly-behind': { color: 'text-amber-600', bgColor: 'bg-amber-100', label: 'Slightly Behind' },
  'behind': { color: 'text-orange-600', bgColor: 'bg-orange-100', label: 'Behind Schedule' },
  'at-risk': { color: 'text-red-600', bgColor: 'bg-red-100', label: 'At Risk' },
  'critical': { color: 'text-red-700', bgColor: 'bg-red-200', label: 'Critical' },
};

const StudyPlan: React.FC = () => {
  const navigate = useNavigate();
  const { course, courseId } = useCourse();
  const { user } = useAuth();
  const { plan, todaysPlan, hasPlan, loading, daysUntilExam, isOnTrack, refreshPlan } = useStudyPlan();
  
  // State for expandable weeks
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loadingLessons, setLoadingLessons] = useState(false);
  
  // Rebalance state
  const [isRebalancing, setIsRebalancing] = useState(false);
  const [rebalanceResult, setRebalanceResult] = useState<RebalanceResult | null>(null);
  const [showRebalanceOptions, setShowRebalanceOptions] = useState(false);
  
  // Check if user is behind and should see rebalance option
  const shouldShowRebalance = plan && ['behind', 'at-risk', 'critical'].includes(plan.health);
  
  // Handle rebalance
  const handleRebalance = async (mode: 'increase-pace' | 'extend-date') => {
    if (!user?.uid || !plan) return;
    
    setIsRebalancing(true);
    try {
      const result = await rebalanceStudyPlan(
        user.uid,
        plan.courseId,
        plan.section,
        { mode }
      );
      setRebalanceResult(result);
      
      if (result.success) {
        // Refetch the plan to show updated data
        refreshPlan();
        setShowRebalanceOptions(false);
      }
    } finally {
      setIsRebalancing(false);
    }
  };
  
  // Fetch lessons when plan loads
  useEffect(() => {
    if (!plan || !courseId) return;
    
    const loadLessons = async () => {
      setLoadingLessons(true);
      try {
        const allLessons = await fetchAllLessons(courseId);
        // Filter to section for multi-section courses
        const singleExamCourses = ['cisa', 'cfp', 'cia'];
        const isSingleExamCourse = singleExamCourses.includes(courseId);
        const sectionLessons = isSingleExamCourse 
          ? allLessons 
          : allLessons.filter(l => l.section === plan.section);
        // Sort by order if available
        sectionLessons.sort((a, b) => (a.order || 0) - (b.order || 0));
        setLessons(sectionLessons);
      } catch (err) {
        console.error('Error loading lessons:', err);
      } finally {
        setLoadingLessons(false);
      }
    };
    
    loadLessons();
  }, [plan, courseId]);
  
  // Calculate which lessons to show per week
  const getLessonsForWeek = (weekNumber: number): Lesson[] => {
    if (!plan || lessons.length === 0) return [];
    
    const totalLessons = lessons.length;
    
    // Count learning weeks (foundation, building, reinforcement)
    const learningWeeks = plan.weeks.filter(w => 
      ['foundation', 'building', 'reinforcement'].includes(w.phase)
    ).length;
    
    if (learningWeeks === 0) return [];
    
    // Get week's goal count
    const week = plan.weeks.find(w => w.weekNumber === weekNumber);
    if (!week || week.goals.lessons === 0) return [];
    
    // Calculate cumulative lessons up to this week
    let lessonsBeforeThisWeek = 0;
    for (const w of plan.weeks) {
      if (w.weekNumber >= weekNumber) break;
      lessonsBeforeThisWeek += w.goals.lessons;
    }
    
    const startIndex = Math.min(lessonsBeforeThisWeek, totalLessons);
    const endIndex = Math.min(startIndex + week.goals.lessons, totalLessons);
    
    return lessons.slice(startIndex, endIndex);
  };
  
  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    );
  }
  
  // Show CTA if no plan exists
  if (!hasPlan || !plan) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Map className="w-10 h-10 text-slate-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            No Study Plan Yet
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Create a personalized roadmap to pass your {course?.shortName || 'exam'}
          </p>
        </div>
        
        <StudyPlanCTA />
      </div>
    );
  }
  
  const healthConfig = HEALTH_CONFIG[plan.health];
  const currentPhaseConfig = PHASE_CONFIG[plan.currentPhase];
  const today = new Date();
  
  // Find current week
  const currentWeek = plan.weeks.find(w => {
    const start = new Date(w.startDate);
    const end = new Date(w.endDate);
    return isWithinInterval(today, { start, end });
  });
  
  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {plan.section} Study Plan
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Your roadmap to passing the exam
          </p>
        </div>
        
        <Button
          onClick={() => navigate('/study-plan/setup')}
          variant="secondary"
          className="flex items-center gap-2"
        >
          <Settings className="w-4 h-4" />
          Edit Plan
        </Button>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Days Until Exam */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-1">
            <Calendar className="w-4 h-4" />
            Exam Date
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {daysUntilExam}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">days left</p>
        </div>
        
        {/* Plan Health */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-1">
            <TrendingUp className="w-4 h-4" />
            Status
          </div>
          <div className={clsx(
            'inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-sm font-medium',
            healthConfig.bgColor,
            healthConfig.color
          )}>
            {isOnTrack ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            {healthConfig.label}
          </div>
        </div>
        
        {/* Current Phase */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-1">
            <currentPhaseConfig.icon className="w-4 h-4" />
            Current Phase
          </div>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">
            {currentPhaseConfig.label}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Week {plan.currentWeek} of {plan.totalWeeks}
          </p>
        </div>
        
        {/* Daily Commitment */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-1">
            <Clock className="w-4 h-4" />
            Daily Goal
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {plan.hoursPerDay}h
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {plan.studyDaysPerWeek} days/week
          </p>
        </div>
      </div>
      
      {/* Alerts */}
      {plan.alerts && plan.alerts.filter(a => !a.dismissed).length > 0 && (
        <div className="space-y-2">
          {plan.alerts.filter(a => !a.dismissed).map((alert) => (
            <div 
              key={alert.id}
              className={clsx(
                'p-4 rounded-xl flex items-start gap-3',
                alert.type === 'warning' && 'bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200',
                alert.type === 'critical' && 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200',
                alert.type === 'info' && 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200',
                alert.type === 'achievement' && 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200',
              )}
            >
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium">{alert.title}</p>
                <p className="text-sm opacity-80">{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Rebalance Plan Option - shown when user is behind */}
      {shouldShowRebalance && (
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/10 rounded-xl p-5 border border-orange-200 dark:border-orange-800">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Rebalance Your Plan?</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                You're behind schedule. We can adjust your plan to help you catch up.
              </p>
              
              {rebalanceResult?.success && (
                <div className="mt-3 p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-800 dark:text-emerald-200 text-sm">
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                  {rebalanceResult.message}
                </div>
              )}
              
              {rebalanceResult && !rebalanceResult.success && (
                <div className="mt-3 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-800 dark:text-red-200 text-sm">
                  {rebalanceResult.message}
                </div>
              )}
              
              {!showRebalanceOptions && !rebalanceResult?.success && (
                <Button
                  onClick={() => setShowRebalanceOptions(true)}
                  variant="primary"
                  className="mt-4"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Rebalance Plan
                </Button>
              )}
              
              {showRebalanceOptions && (
                <div className="mt-4 space-y-3">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Choose how to catch up:
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => handleRebalance('increase-pace')}
                      disabled={isRebalancing}
                      className="p-4 bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-400 text-left transition-colors disabled:opacity-50"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {isRebalancing ? (
                          <Loader2 className="w-4 h-4 animate-spin text-primary-600" />
                        ) : (
                          <Zap className="w-4 h-4 text-primary-600" />
                        )}
                        <span className="font-medium text-slate-900 dark:text-white">Study Harder</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Increase daily pace to catch up by exam date
                      </p>
                    </button>
                    
                    <button
                      onClick={() => navigate('/study-plan/setup')}
                      className="p-4 bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-400 text-left transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-primary-600" />
                        <span className="font-medium text-slate-900 dark:text-white">Extend Date</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Move exam date to give yourself more time
                      </p>
                    </button>
                  </div>
                  
                  <button
                    onClick={() => setShowRebalanceOptions(false)}
                    className="text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Today's Focus (if available) */}
      {todaysPlan && !todaysPlan.isRestDay && (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Today's Focus</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">{todaysPlan.message}</p>
            </div>
            <Button
              onClick={() => navigate('/home')}
              variant="primary"
            >
              <Play className="w-4 h-4 mr-2" />
              Start
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {todaysPlan.activities.slice(0, 3).map((activity) => (
              <div 
                key={activity.id}
                className="bg-slate-100 dark:bg-slate-700 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300"
              >
                {activity.title} • {activity.estimatedMinutes}min
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Week-by-Week Roadmap */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="font-semibold text-slate-900 dark:text-white">
            Study Roadmap
          </h2>
        </div>
        
        <div className="divide-y divide-slate-100 dark:divide-slate-700">
          {plan.weeks.map((week) => {
            const phaseConfig = PHASE_CONFIG[week.phase];
            const PhaseIcon = phaseConfig.icon;
            const isCurrentWeek = week.weekNumber === currentWeek?.weekNumber;
            const isPast = new Date(week.endDate) < today;
            const isExpanded = expandedWeek === week.weekNumber;
            const weekLessons = getLessonsForWeek(week.weekNumber);
            const hasLessons = week.goals.lessons > 0;
            
            return (
              <div key={week.weekNumber}>
                {/* Week header - clickable */}
                <button
                  onClick={() => hasLessons ? setExpandedWeek(isExpanded ? null : week.weekNumber) : null}
                  className={clsx(
                    'w-full p-4 flex items-center gap-4 text-left transition-colors',
                    isCurrentWeek && 'bg-primary-50 dark:bg-primary-900/10',
                    isPast && 'opacity-60',
                    hasLessons && 'hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer',
                    !hasLessons && 'cursor-default'
                  )}
                >
                  {/* Week number */}
                  <div className={clsx(
                    'w-12 h-12 rounded-xl flex items-center justify-center font-bold shrink-0',
                    isCurrentWeek 
                      ? 'bg-primary-600 text-white' 
                      : isPast 
                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-500' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  )}>
                    W{week.weekNumber}
                  </div>
                  
                  {/* Week details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={clsx(
                        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
                        phaseConfig.bgColor,
                        phaseConfig.color
                      )}>
                        <PhaseIcon className="w-3 h-3" />
                        {phaseConfig.label}
                      </span>
                      {isCurrentWeek && (
                        <span className="text-xs bg-primary-600 text-white px-2 py-0.5 rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {format(new Date(week.startDate), 'MMM d')} - {format(new Date(week.endDate), 'MMM d')}
                    </p>
                  </div>
                  
                  {/* Week goals */}
                  <div className="hidden sm:flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    {week.goals.lessons > 0 && (
                      <span>{week.goals.lessons} lessons</span>
                    )}
                    {week.goals.questions > 0 && (
                      <span>{week.goals.questions} Qs</span>
                    )}
                    {week.goals.mockExams > 0 && (
                      <span>{week.goals.mockExams} mock</span>
                    )}
                  </div>
                  
                  {/* Expand/Status indicator */}
                  <div className="shrink-0 flex items-center gap-2">
                    {isPast ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : isCurrentWeek ? (
                      <div className="w-5 h-5 rounded-full bg-primary-600 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600" />
                    )}
                    {hasLessons && (
                      isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                      )
                    )}
                  </div>
                </button>
                
                {/* Expanded lessons */}
                {isExpanded && hasLessons && (
                  <div className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700">
                    {loadingLessons ? (
                      <div className="p-4 text-center text-slate-500">
                        Loading lessons...
                      </div>
                    ) : weekLessons.length > 0 ? (
                      <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {weekLessons.map((lesson, idx) => (
                          <div 
                            key={lesson.id}
                            className="px-4 py-3 pl-20 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-800/50 cursor-pointer"
                            onClick={() => navigate(`/learn/${lesson.id}`)}
                          >
                            <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-medium text-slate-600 dark:text-slate-400">
                              {idx + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                                {lesson.title}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                {lesson.duration || 30} min
                              </p>
                            </div>
                            <BookOpen className="w-4 h-4 text-slate-400" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-slate-500 text-sm">
                        No lessons assigned for this week
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Milestones */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4">
        <h2 className="font-semibold text-slate-900 dark:text-white mb-4">
          Key Milestones
        </h2>
        
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />
          
          <div className="space-y-4">
            {plan.milestones.map((milestone, index) => {
              const isPast = new Date(milestone.date) < today;
              const isNext = !isPast && (index === 0 || new Date(plan.milestones[index - 1].date) < today);
              
              return (
                <div 
                  key={milestone.id}
                  className={clsx(
                    'relative pl-10',
                    isPast && 'opacity-60'
                  )}
                >
                  {/* Circle marker */}
                  <div className={clsx(
                    'absolute left-2 w-5 h-5 rounded-full flex items-center justify-center',
                    isPast 
                      ? 'bg-green-500' 
                      : isNext
                      ? 'bg-primary-600 ring-4 ring-primary-100 dark:ring-primary-900/50'
                      : 'bg-slate-300 dark:bg-slate-600'
                  )}>
                    {isPast && <CheckCircle className="w-3 h-3 text-white" />}
                  </div>
                  
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {milestone.label}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {format(new Date(milestone.date), 'MMMM d, yyyy')}
                      {milestone.description && ` • ${milestone.description}`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Progress Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {plan.progress.lessonsCompleted}/{plan.progress.lessonsTotal}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Lessons</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {plan.progress.questionsAnswered}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Questions</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {plan.progress.accuracy}%
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Accuracy</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {plan.progress.daysStudied}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Days Studied</p>
        </div>
      </div>
    </div>
  );
};

export default StudyPlan;

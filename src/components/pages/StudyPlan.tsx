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
  BookOpen,
  FileText,
  Zap,
  Map,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  ClipboardList,
  Layers,
  GraduationCap,
} from 'lucide-react';
import { Button } from '../common/Button';
import { StudyPlanCTA } from '../StudyPlanCTA';
import { useStudyPlan } from '../../hooks/useStudyPlan';
import { useCourse } from '../../providers/CourseProvider';
import { useAuth } from '../../hooks/useAuth';
import { fetchAllLessons } from '../../services/lessonService';
// Rebalance imports removed - now uses setup page
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import type { Lesson } from '../../types';
import { format, isWithinInterval, startOfDay } from 'date-fns';
import type { StudyPhase, PlanHealth, StudyPlanMilestone } from '../../types/studyPlan';
import clsx from 'clsx';

import { toLocalDate } from '../../utils/dateHelpers';

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

/**
 * Simple button for rebalancing the plan
 */
const RebalancePlanButton: React.FC<{
  onRebalance: () => void;
}> = ({ onRebalance }) => {
  return (
    <Button
      onClick={onRebalance}
      variant="secondary"
      className="flex items-center gap-2"
    >
      <RefreshCw className="w-4 h-4" />
      Rebalance Plan
    </Button>
  );
};

const StudyPlan: React.FC = () => {
  const navigate = useNavigate();
  const { course, courseId } = useCourse();
  const { user } = useAuth();
  const { plan, hasPlan, loading, daysUntilExam, isOnTrack, refreshPlan: _refreshPlan } = useStudyPlan();
  
  // State for expandable weeks
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loadingLessons, setLoadingLessons] = useState(false);
  const [completedLessonIds, setCompletedLessonIds] = useState<Set<string>>(new Set());
  const [velocity, setVelocity] = useState<{ lessonsPerDay: number; questionsPerDay: number; minutesPerDay: number } | null>(null);
  const [weeklyActivityProgress, setWeeklyActivityProgress] = useState<Record<number, { mcqs: number; tbs: number; flashcards: number; essays: number; caseStudies: number }>>({});
  const [liveAccuracy, setLiveAccuracy] = useState<{ questionsAnswered: number; accuracy: number } | null>(null);
  const [liveDaysStudied, setLiveDaysStudied] = useState<number | null>(null);
  
  // Check if user is behind and should see rebalance option
  // BUT: Don't nag users in the first 7 days of a new plan - give them a full week to start
  const shouldShowRebalance = (() => {
    if (!plan) return false;
    if (!['behind', 'at-risk', 'critical'].includes(plan.health)) return false;
    
    // Grace period: Don't show rebalance in the first 7 days after plan creation
    const planCreatedAt = plan.createdAt instanceof Date 
      ? plan.createdAt 
      : new Date(plan.createdAt);
    const daysSinceCreation = Math.floor(
      (Date.now() - planCreatedAt.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceCreation < 7) return false;
    
    // Also don't show if less than 7 days into the plan
    const planStartDate = plan.startDate instanceof Date
      ? plan.startDate
      : new Date(plan.startDate);
    const daysSinceStart = Math.floor(
      (Date.now() - planStartDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceStart < 7) return false;
    
    return true;
  })();
  
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

        // Fetch completed lesson IDs for per-week progress
        if (user) {
          const lessonsRef = collection(db, 'users', user.uid, 'lessons');
          const snap = await getDocs(lessonsRef);
          const completed = new Set<string>();
          snap.docs.forEach(d => {
            const data = d.data();
            if (data.status === 'completed' || data.completedAt) {
              completed.add(d.id);
            }
          });
          setCompletedLessonIds(completed);

          // Fetch daily_log for velocity + per-week progress
          // Note: We fetch ALL logs (not just since plan start) so question counts
          // match the Progress page - users expect "Questions" to mean all questions done
          const logsRef = collection(db, 'users', user.uid, 'daily_log');
          const logSnap = await getDocs(logsRef);

          // 7-day velocity (only for current course)
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
          const sevenDaysAgoStr = sevenDaysAgo.toISOString().split('T')[0];
          let totalLessons7d = 0, totalQuestions7d = 0, totalMinutes7d = 0;
          let recentCount = 0;
          let allTimeDaysStudied = 0;
          const coursePrefix = `${courseId}_`;
          logSnap.docs.forEach(d => {
            // Skip logs from other courses (format: {course}_{date})
            if (d.id.includes('_') && !d.id.startsWith(coursePrefix)) return;
            const data = d.data();
            
            // Count all-time days with any activity (questions, lessons, or earned points)
            const hasActivity = (data.questionsAttempted || 0) > 0 || 
                               (data.questionsAnswered || 0) > 0 || 
                               (data.lessonsCompleted || 0) > 0 || 
                               (data.earnedPoints || 0) > 0;
            if (hasActivity) {
              allTimeDaysStudied++;
            }
            
            if ((data.date || d.id) >= sevenDaysAgoStr) {
              totalLessons7d += data.lessonsCompleted || 0;
              totalQuestions7d += data.questionsAttempted || data.questionsAnswered || 0;
              totalMinutes7d += data.studyTimeMinutes || data.studyMinutes || 0;
              recentCount++;
            }
          });
          const activeDays = Math.max(1, recentCount);
          setVelocity({
            lessonsPerDay: Math.round((totalLessons7d / activeDays) * 10) / 10,
            questionsPerDay: Math.round((totalQuestions7d / activeDays) * 10) / 10,
            minutesPerDay: Math.round(totalMinutes7d / activeDays),
          });
          setLiveDaysStudied(allTimeDaysStudied);

          // Per-week activity progress from daily_log (only for current course)
          const weekProgress: Record<number, { mcqs: number; tbs: number; flashcards: number; essays: number; caseStudies: number }> = {};
          for (const w of plan.weeks) {
            const wStart = format(toLocalDate(w.startDate), 'yyyy-MM-dd');
            const wEnd = format(toLocalDate(w.endDate), 'yyyy-MM-dd');
            let mcqs = 0, tbs = 0, flashcards = 0, essays = 0, caseStudies = 0;
            logSnap.docs.forEach(d => {
              // Skip logs from other courses
              if (d.id.includes('_') && !d.id.startsWith(coursePrefix)) return;
              const dateKey = d.data().date || d.id;
              if (dateKey >= wStart && dateKey <= wEnd) {
                const data = d.data();
                mcqs += data.questionsAttempted || data.questionsAnswered || 0;
                flashcards += data.flashcardsReviewed || 0;
                if (Array.isArray(data.activities)) {
                  for (const act of data.activities) {
                    if (act.type === 'tbs') {
                      tbs += act.tbsAttempted || 1;
                    }
                    if (act.type === 'essay') {
                      essays += 1;
                    }
                    if (act.type === 'case_study') {
                      caseStudies += 1;
                    }
                  }
                }
              }
            });
            weekProgress[w.weekNumber] = { mcqs, tbs, flashcards, essays, caseStudies };
          }
          setWeeklyActivityProgress(weekProgress);

          // Compute live accuracy from daily_log activities (source of truth)
          let totalMcqs = 0, totalCorrect = 0;
          const sectionUpper = plan.section?.toUpperCase();
          const singleExamCourses = ['cisa', 'cfp', 'cia'];
          const isSingle = singleExamCourses.includes(courseId);
          logSnap.docs.forEach(d => {
            // Skip logs from other courses (format: {course}_{date})
            if (d.id.includes('_') && !d.id.startsWith(coursePrefix)) return;
            const data = d.data();
            if (Array.isArray(data.activities)) {
              for (const act of data.activities) {
                if (act.type === 'mcq') {
                  const matchesSection = isSingle || !sectionUpper || act.section?.toUpperCase() === sectionUpper;
                  if (matchesSection) {
                    totalMcqs++;
                    if (act.isCorrect) totalCorrect++;
                  }
                }
              }
            }
          });
          if (totalMcqs > 0) {
            setLiveAccuracy({
              questionsAnswered: totalMcqs,
              accuracy: Math.round((totalCorrect / totalMcqs) * 100),
            });
          }
        }
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

  // Calculate per-week completion including lessons, MCQs, TBS, flashcards, essays, and case studies
  const getWeekCompletion = (weekNumber: number): { done: number; total: number; pct: number } => {
    const week = plan?.weeks.find(w => w.weekNumber === weekNumber);
    if (!week) return { done: 0, total: 0, pct: 0 };
    
    // Get lesson completion
    const weekLessons = getLessonsForWeek(weekNumber);
    const lessonsDone = weekLessons.filter(l => completedLessonIds.has(l.id)).length;
    const lessonsGoal = week.goals?.lessons || weekLessons.length;
    
    // Get MCQ, TBS, flashcard, essay, case study progress from weeklyActivityProgress
    const activityProgress = weeklyActivityProgress[weekNumber] || { mcqs: 0, tbs: 0, flashcards: 0, essays: 0, caseStudies: 0 };
    const mcqsDone = activityProgress.mcqs;
    const tbsDone = activityProgress.tbs;
    const flashcardsDone = activityProgress.flashcards;
    const essaysDone = activityProgress.essays || 0;
    const caseStudiesDone = activityProgress.caseStudies || 0;
    
    // Get goals from the week
    const mcqsGoal = week.goals?.questions || 0;
    const tbsGoal = week.goals?.simulations || 0;
    const flashcardsGoal = week.goals?.flashcards || 0;
    const essaysGoal = (week.goals as any)?.essays || 0;
    const caseStudiesGoal = (week.goals as any)?.caseStudies || 0;
    
    // Calculate total goals and done (cap done at goal to avoid >100%)
    const totalGoals = lessonsGoal + mcqsGoal + tbsGoal + flashcardsGoal + essaysGoal + caseStudiesGoal;
    if (totalGoals === 0) return { done: 0, total: 0, pct: 0 };
    
    const totalDone = 
      Math.min(lessonsDone, lessonsGoal) + 
      Math.min(mcqsDone, mcqsGoal) + 
      Math.min(tbsDone, tbsGoal) + 
      Math.min(flashcardsDone, flashcardsGoal) +
      Math.min(essaysDone, essaysGoal) +
      Math.min(caseStudiesDone, caseStudiesGoal);
    
    return { 
      done: totalDone, 
      total: totalGoals, 
      pct: Math.round((totalDone / totalGoals) * 100) 
    };
  };

  // Calculate actual milestone completion based on PROGRESS, not just dates
  const getMilestoneCompletion = (milestone: StudyPlanMilestone): { isComplete: boolean; progressPct: number } => {
    if (!plan) return { isComplete: false, progressPct: 0 };

    if (milestone.type === 'phase-start') {
      // Extract phase from milestone id (e.g., 'phase-foundation-1' → 'foundation')
      const phaseMatch = milestone.id.match(/^phase-([^-]+)-/);
      if (!phaseMatch) return { isComplete: false, progressPct: 0 };
      const phase = phaseMatch[1];
      
      // Find all weeks in this phase
      const phaseWeeks = plan.weeks.filter(w => w.phase === phase);
      if (phaseWeeks.length === 0) return { isComplete: false, progressPct: 0 };
      
      // Sum completion across all weeks in phase
      let totalDone = 0, totalGoals = 0;
      for (const week of phaseWeeks) {
        const completion = getWeekCompletion(week.weekNumber);
        totalDone += completion.done;
        totalGoals += completion.total;
      }
      
      const pct = totalGoals > 0 ? Math.round((totalDone / totalGoals) * 100) : 0;
      return { isComplete: pct >= 100, progressPct: pct };
    }

    if (milestone.type === 'checkpoint') {
      // Extract target percentage from label (e.g., '25% Checkpoint' → 25)
      const pctMatch = milestone.label.match(/^(\d+)%/);
      const targetPct = pctMatch ? parseInt(pctMatch[1], 10) : 0;
      
      // Calculate overall plan completion
      let totalDone = 0, totalGoals = 0;
      for (const week of plan.weeks) {
        const completion = getWeekCompletion(week.weekNumber);
        totalDone += completion.done;
        totalGoals += completion.total;
      }
      
      const actualPct = totalGoals > 0 ? Math.round((totalDone / totalGoals) * 100) : 0;
      return { isComplete: actualPct >= targetPct, progressPct: actualPct };
    }

    // For mock-exam and exam-day, keep date-based (they're future events, not progress markers)
    // Use startOfDay to avoid same-day time comparison issues
    const isPast = startOfDay(toLocalDate(milestone.date)) < startOfDay(today);
    return { isComplete: isPast, progressPct: isPast ? 100 : 0 };
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

  // Grace period: Show "on-track" status during first 7 days of a new plan
  const isInGracePeriod = (() => {
    const planCreatedAt = plan.createdAt instanceof Date 
      ? plan.createdAt 
      : new Date(plan.createdAt);
    const daysSinceCreation = Math.floor(
      (Date.now() - planCreatedAt.getTime()) / (1000 * 60 * 60 * 24)
    );
    const planStartDate = plan.startDate instanceof Date
      ? plan.startDate
      : new Date(plan.startDate);
    const daysSinceStart = Math.floor(
      (Date.now() - planStartDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysSinceCreation < 7 || daysSinceStart < 7;
  })();
  
  // Display health: Use "on-track" during grace period to avoid alarming new users
  const displayHealth = isInGracePeriod ? 'on-track' : plan.health;
  const displayHealthConfig = HEALTH_CONFIG[displayHealth];
  const isDisplayOnTrack = displayHealth === 'on-track' || displayHealth === 'slightly-behind';
  
  // Find current week
  const currentWeek = plan.weeks.find(w => {
    const start = toLocalDate(w.startDate);
    const end = toLocalDate(w.endDate);
    return isWithinInterval(today, { start, end });
  });

  // ── Progress Insight: specific lag/lead + predicted completion ──
  const progressInsight = (() => {
    if (!plan.progress || !plan.weeks || plan.weeks.length === 0) return null;

    // Calculate expected lessons & questions up to now
    let lessonsExpected = 0;
    let questionsExpected = 0;
    for (const w of plan.weeks) {
      if (w.weekNumber < (currentWeek?.weekNumber || 1)) {
        lessonsExpected += w.goals?.lessons || 0;
        questionsExpected += w.goals?.questions || 0;
      }
    }
    // Add partial-week expectation
    if (currentWeek) {
      const weekStart = toLocalDate(currentWeek.startDate);
      const dayOfWeek = Math.max(1, Math.floor((today.getTime() - weekStart.getTime()) / (1000 * 60 * 60 * 24)) + 1);
      const weekFraction = Math.min(1, dayOfWeek / 7);
      lessonsExpected += Math.floor((currentWeek.goals?.lessons || 0) * weekFraction);
      questionsExpected += Math.floor((currentWeek.goals?.questions || 0) * weekFraction);
    }

    const lessonsActual = plan.progress.lessonsCompleted || 0;
    const questionsActual = plan.progress.questionsAnswered || 0;
    const lessonDelta = lessonsActual - lessonsExpected;
    const questionDelta = questionsActual - questionsExpected;

    // Predicted completion date based on velocity
    const planStart = toLocalDate(plan.startDate);
    const daysElapsed = Math.max(1, Math.floor((today.getTime() - planStart.getTime()) / (1000 * 60 * 60 * 24)));
    const totalLessons = plan.progress.lessonsTotal || plan.weeks.reduce((s, w) => s + (w.goals?.lessons || 0), 0);
    const lessonsRemaining = Math.max(0, totalLessons - lessonsActual);
    const allTimeLessonsPerDay = lessonsActual > 0 ? lessonsActual / daysElapsed : 0;
    // Prefer 7-day rolling velocity when available, fall back to all-time avg
    const effectiveLessonsPerDay = velocity?.lessonsPerDay ?? allTimeLessonsPerDay;

    // Don't project a completion date until we have enough data for a meaningful prediction.
    // Require at least 7 days elapsed AND 5 lessons completed to avoid misleading early projections.
    const hasEnoughData = daysElapsed >= 7 && lessonsActual >= 5;
    const daysToFinish = hasEnoughData && effectiveLessonsPerDay > 0 ? Math.ceil(lessonsRemaining / effectiveLessonsPerDay) : null;
    const predictedFinish = daysToFinish !== null ? new Date(today.getTime() + daysToFinish * 86400000) : null;
    const examDate = toLocalDate(plan.examDate);
    const daysBeforeExam = predictedFinish
      ? Math.round((examDate.getTime() - predictedFinish.getTime()) / 86400000)
      : null;

    return {
      lessonsExpected, lessonsActual, lessonDelta,
      questionsExpected, questionsActual, questionDelta,
      lessonsPerDay: Math.round(effectiveLessonsPerDay * 10) / 10,
      questionsPerDay: velocity?.questionsPerDay ?? null,
      minutesPerDay: velocity?.minutesPerDay ?? null,
      predictedFinish, daysBeforeExam,
      hasRecentVelocity: velocity !== null,
      hasEnoughData,
    };
  })();
  
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
        
        <RebalancePlanButton onRebalance={() => navigate('/study-plan/setup')} />
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
            displayHealthConfig.bgColor,
            displayHealthConfig.color
          )}>
            {isDisplayOnTrack ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            {displayHealthConfig.label}
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
            {Math.round(plan.hoursPerDay * 10) / 10}h
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {plan.studyDaysPerWeek} days/week
          </p>
        </div>
      </div>
      
      {/* Alerts */}
      {/* Filter out stale health alerts if user is now on-track or only slightly behind, or in grace period */}
      {plan.alerts && plan.alerts.filter(a => {
        if (a.dismissed) return false;
        // Don't show "behind schedule" alerts if health is fine OR we're in grace period
        const isHealthAlert = a.id?.startsWith('health-');
        if (isHealthAlert && (isInGracePeriod || ['on-track', 'slightly-behind'].includes(plan.health))) {
          return false;
        }
        return true;
      }).length > 0 && (
        <div className="space-y-2">
          {plan.alerts.filter(a => {
            if (a.dismissed) return false;
            const isHealthAlert = a.id?.startsWith('health-');
            if (isHealthAlert && (isInGracePeriod || ['on-track', 'slightly-behind'].includes(plan.health))) {
              return false;
            }
            return true;
          }).map((alert) => (
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
                {progressInsight && progressInsight.lessonDelta < 0
                  ? `You're ${Math.abs(progressInsight.lessonDelta)} lesson${Math.abs(progressInsight.lessonDelta) !== 1 ? 's' : ''} behind schedule. Adjust your hours or extend your exam date.`
                  : 'You\'re behind schedule. Adjust your plan to get back on track.'
                }
              </p>
              
              <Button
                onClick={() => navigate('/study-plan/setup')}
                variant="primary"
                className="mt-4"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Adjust Plan
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Last Week Recap */}
      {(() => {
        const prevWeekNum = (currentWeek?.weekNumber || 1) - 1;
        const prevWeek = prevWeekNum >= 1 ? plan.weeks.find(w => w.weekNumber === prevWeekNum) : null;
        if (!prevWeek) return null;
        const comp = getWeekCompletion(prevWeekNum);
        const qGoal = prevWeek.goals?.questions || 0;
        return (
          <div className="rounded-xl p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Week {prevWeekNum} Recap</p>
                <p className="text-slate-900 dark:text-white font-semibold">
                  {comp.done}/{comp.total} lessons completed
                  {qGoal > 0 && <span className="text-slate-500 dark:text-slate-400 font-normal"> · {qGoal} questions targeted</span>}
                </p>
              </div>
              <div className={clsx(
                'text-2xl font-bold',
                comp.pct === 100 ? 'text-emerald-600 dark:text-emerald-400' :
                comp.pct >= 70 ? 'text-primary-600 dark:text-primary-400' :
                'text-amber-600 dark:text-amber-400'
              )}>
                {comp.pct}%
              </div>
            </div>
            {comp.pct < 100 && comp.total - comp.done > 0 && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {comp.total - comp.done} lesson{comp.total - comp.done !== 1 ? 's' : ''} carry forward to this week
              </p>
            )}
          </div>
        );
      })()}

      {/* Progress Insight Banner */}
      {progressInsight && (progressInsight.lessonsActual > 0 || progressInsight.questionsActual > 0) && (() => {
        // Velocity projection is the best overall indicator.
        // Don't show "behind schedule" warnings when projected to finish early.
        const projectsEarly = progressInsight.daysBeforeExam !== null && progressInsight.daysBeforeExam >= 0;

        // Before we have enough data, show a simple progress summary instead of a prediction
        if (!progressInsight.hasEnoughData) {
          return (
            <div className="rounded-xl p-4 border bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-slate-900 dark:text-white">
                    Getting started — keep it up!
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {progressInsight.lessonsActual}/{progressInsight.lessonsExpected} lessons
                    {' · '}
                    {progressInsight.questionsActual}/{progressInsight.questionsExpected} questions expected by now
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Pacing predictions will appear after your first week of studying
                  </p>
                </div>
              </div>
            </div>
          );
        }

        const isPositive = projectsEarly || progressInsight.lessonDelta >= 0;

        return (
        <div className={clsx(
          'rounded-xl p-4 border',
          isPositive
            ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800'
            : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
        )}>
          <div className="flex items-start gap-3">
            {isPositive
              ? <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
              : <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
            }
            <div className="flex-1 space-y-1">
              <p className="font-medium text-slate-900 dark:text-white">
                {projectsEarly
                  ? `On track to finish ${progressInsight.daysBeforeExam} day${progressInsight.daysBeforeExam !== 1 ? 's' : ''} before your exam`
                  : progressInsight.lessonDelta > 0
                    ? `${progressInsight.lessonDelta} lesson${progressInsight.lessonDelta !== 1 ? 's' : ''} ahead of schedule`
                    : progressInsight.lessonDelta < 0
                      ? `${Math.abs(progressInsight.lessonDelta)} lesson${Math.abs(progressInsight.lessonDelta) !== 1 ? 's' : ''} behind schedule`
                      : 'Right on track with lessons'}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {progressInsight.lessonsActual}/{progressInsight.lessonsExpected} lessons
                {' · '}
                {progressInsight.questionsActual}/{progressInsight.questionsExpected} questions expected by now
              </p>
              {(progressInsight.lessonsPerDay > 0 || progressInsight.questionsPerDay || progressInsight.minutesPerDay) && (
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-sm text-slate-500 dark:text-slate-400">
                  {progressInsight.lessonsPerDay > 0 && (
                    <span>{progressInsight.lessonsPerDay} lessons/day</span>
                  )}
                  {progressInsight.questionsPerDay != null && progressInsight.questionsPerDay > 0 && (
                    <span>{progressInsight.questionsPerDay} Qs/day</span>
                  )}
                  {progressInsight.minutesPerDay != null && progressInsight.minutesPerDay > 0 && (
                    <span>{progressInsight.minutesPerDay} min/day</span>
                  )}
                  {progressInsight.hasRecentVelocity && (
                    <span className="text-slate-400 dark:text-slate-500">(7-day avg)</span>
                  )}
                </div>
              )}
              {!projectsEarly && progressInsight.predictedFinish && progressInsight.daysBeforeExam !== null && (
                <p className="text-sm font-medium text-red-600 dark:text-red-400">
                  {`At your pace, you'll finish ${Math.abs(progressInsight.daysBeforeExam)} day${Math.abs(progressInsight.daysBeforeExam) !== 1 ? 's' : ''} after your exam — consider adjusting`}
                </p>
              )}
            </div>
          </div>
        </div>
        );
      })()}
      
      
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
            const isPast = startOfDay(toLocalDate(week.endDate)) < startOfDay(today);
            const isExpanded = expandedWeek === week.weekNumber;
            const weekLessons = getLessonsForWeek(week.weekNumber);
            const hasLessons = week.goals.lessons > 0;
            const weekComp = getWeekCompletion(week.weekNumber);
            
            return (
              <div key={week.weekNumber}>
                {/* Week header - clickable */}
                <button
                  onClick={() => setExpandedWeek(isExpanded ? null : week.weekNumber)}
                  className={clsx(
                    'w-full p-4 flex items-center gap-4 text-left transition-colors',
                    isCurrentWeek && 'bg-primary-50 dark:bg-primary-900/10',
                    isPast && 'opacity-60',
                    'hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer'
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
                      {format(toLocalDate(week.startDate), 'MMM d')} - {format(toLocalDate(week.endDate), 'MMM d')}
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
                    {week.goals.flashcards > 0 && (
                      <span>{week.goals.flashcards} FCs</span>
                    )}
                    {week.goals.simulations > 0 && (
                      <span>{week.goals.simulations} TBS</span>
                    )}
                    {(week.goals as any).essays > 0 && (
                      <span>{(week.goals as any).essays} essay{(week.goals as any).essays > 1 ? 's' : ''}</span>
                    )}
                    {(week.goals as any).caseStudies > 0 && (
                      <span>{(week.goals as any).caseStudies} case{(week.goals as any).caseStudies > 1 ? 's' : ''}</span>
                    )}
                    {week.goals.mockExams > 0 && (
                      <span>{week.goals.mockExams} mock</span>
                    )}
                  </div>
                  
                  {/* Expand/Status indicator */}
                  <div className="shrink-0 flex items-center gap-2">
                    {weekComp.total > 0 ? (
                      <div className="relative w-8 h-8">
                        <svg className="w-8 h-8 -rotate-90" viewBox="0 0 32 32">
                          <circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" className="text-slate-200 dark:text-slate-700" strokeWidth="3" />
                          <circle cx="16" cy="16" r="13" fill="none" stroke="currentColor"
                            className={clsx(
                              weekComp.pct >= 100 ? 'text-green-500' : isCurrentWeek ? 'text-primary-500' : 'text-slate-400'
                            )}
                            strokeWidth="3" strokeLinecap="round"
                            strokeDasharray={`${weekComp.pct * 0.8168} 81.68`}
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-slate-600 dark:text-slate-300">
                          {weekComp.pct}%
                        </span>
                      </div>
                    ) : isPast ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : isCurrentWeek ? (
                      <div className="w-5 h-5 rounded-full bg-primary-600 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600" />
                    )}
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </button>
                
                {/* Expanded content */}
                {isExpanded && (
                  <div className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700">
                    {/* Lessons section */}
                    {hasLessons && (
                      loadingLessons ? (
                        <div className="p-4 text-center text-slate-500">
                          Loading lessons...
                        </div>
                      ) : weekLessons.length > 0 ? (
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                          {weekLessons.map((lesson, idx) => {
                            const isCompleted = completedLessonIds.has(lesson.id);
                            return (
                              <div 
                                key={lesson.id}
                                className={clsx(
                                  'px-4 py-3 pl-20 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-800/50 cursor-pointer',
                                  isCompleted && 'opacity-70'
                                )}
                                onClick={() => navigate(`/lessons/${lesson.id}`)}
                              >
                                {isCompleted ? (
                                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                                    <CheckCircle className="w-4 h-4 text-white" />
                                  </div>
                                ) : (
                                  <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-medium text-slate-600 dark:text-slate-400 shrink-0">
                                    {idx + 1}
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <p className={clsx(
                                    'text-sm font-medium truncate',
                                    isCompleted ? 'text-slate-500 dark:text-slate-400 line-through' : 'text-slate-900 dark:text-white'
                                  )}>
                                    {lesson.title}
                                  </p>
                                  <p className="text-xs text-slate-500 dark:text-slate-400">
                                    {lesson.duration || 30} min
                                  </p>
                                </div>
                                <BookOpen className={clsx('w-4 h-4', isCompleted ? 'text-green-500' : 'text-slate-400')} />
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="p-4 text-center text-slate-500 text-sm">
                          No lessons assigned for this week
                        </div>
                      )
                    )}

                    {/* Practice activities section */}
                    {(week.goals.questions > 0 || week.goals.simulations > 0 || week.goals.flashcards > 0 || week.goals.mockExams > 0 || (week.goals as any).essays > 0 || (week.goals as any).caseStudies > 0) && (
                      <div className={clsx(
                        'divide-y divide-slate-100 dark:divide-slate-800',
                        hasLessons && weekLessons.length > 0 && 'border-t border-slate-200 dark:border-slate-700'
                      )}>
                        {(() => {
                          const wp = weeklyActivityProgress[week.weekNumber];
                          const sectionLabel = hasLessons ? 'Practice Activities' : (week.phase === 'exam-week' ? '🎯 Exam Week Focus' : '📚 Review Focus');
                          return (
                            <>
                              <div className="px-4 py-2 pl-20 flex items-center justify-between">
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                  {sectionLabel}
                                </p>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 italic">
                                  Scheduled in your daily plan
                                </p>
                              </div>
                              {week.goals.questions > 0 && (
                                <div
                                  className="px-4 py-3 pl-20 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-800/50 cursor-pointer"
                                  onClick={() => navigate('/practice')}
                                >
                                  <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
                                    <Target className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                                        Practice {week.goals.questions} MCQs
                                      </p>
                                      {wp && wp.mcqs > 0 && (
                                        <span className={clsx(
                                          'text-xs font-medium px-1.5 py-0.5 rounded-full',
                                          wp.mcqs >= week.goals.questions
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                            : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                                        )}>
                                          {wp.mcqs}/{week.goals.questions}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                      Multiple choice questions
                                    </p>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-slate-400" />
                                </div>
                              )}
                              {week.goals.simulations > 0 && (
                                <div
                                  className="px-4 py-3 pl-20 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-800/50 cursor-pointer"
                                  onClick={() => navigate('/tbs')}
                                >
                                  <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                                    <ClipboardList className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                                        Complete {week.goals.simulations} TBS
                                      </p>
                                      {wp && wp.tbs > 0 && (
                                        <span className={clsx(
                                          'text-xs font-medium px-1.5 py-0.5 rounded-full',
                                          wp.tbs >= week.goals.simulations
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                            : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                                        )}>
                                          {wp.tbs}/{week.goals.simulations}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                      Task-based simulations
                                    </p>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-slate-400" />
                                </div>
                              )}
                              {week.goals.flashcards > 0 && (
                                <div
                                  className="px-4 py-3 pl-20 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-800/50 cursor-pointer"
                                  onClick={() => navigate('/flashcards')}
                                >
                                  <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
                                    <Layers className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                                        Review {week.goals.flashcards} flashcards
                                      </p>
                                      {wp && wp.flashcards > 0 && (
                                        <span className={clsx(
                                          'text-xs font-medium px-1.5 py-0.5 rounded-full',
                                          wp.flashcards >= week.goals.flashcards
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                            : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                                        )}>
                                          {wp.flashcards}/{week.goals.flashcards}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                      Spaced repetition review
                                    </p>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-slate-400" />
                                </div>
                              )}
                              {(week.goals as any).essays > 0 && (
                                <div
                                  className="px-4 py-3 pl-20 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-800/50 cursor-pointer"
                                  onClick={() => navigate('/practice?type=essay')}
                                >
                                  <div className="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center shrink-0">
                                    <FileText className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                                        Complete {(week.goals as any).essays} essay{(week.goals as any).essays > 1 ? 's' : ''}
                                      </p>
                                      {wp && wp.essays > 0 && (
                                        <span className={clsx(
                                          'text-xs font-medium px-1.5 py-0.5 rounded-full',
                                          wp.essays >= (week.goals as any).essays
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                            : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                                        )}>
                                          {wp.essays}/{(week.goals as any).essays}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                      CMA essay questions
                                    </p>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-slate-400" />
                                </div>
                              )}
                              {(week.goals as any).caseStudies > 0 && (
                                <div
                                  className="px-4 py-3 pl-20 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-800/50 cursor-pointer"
                                  onClick={() => navigate('/practice?type=case')}
                                >
                                  <div className="w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center shrink-0">
                                    <FileText className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                                        Complete {(week.goals as any).caseStudies} case stud{(week.goals as any).caseStudies > 1 ? 'ies' : 'y'}
                                      </p>
                                      {wp && wp.caseStudies > 0 && (
                                        <span className={clsx(
                                          'text-xs font-medium px-1.5 py-0.5 rounded-full',
                                          wp.caseStudies >= (week.goals as any).caseStudies
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                            : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                                        )}>
                                          {wp.caseStudies}/{(week.goals as any).caseStudies}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                      CFP case-based scenarios
                                    </p>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-slate-400" />
                                </div>
                              )}
                              {week.goals.mockExams > 0 && (
                                <div
                                  className="px-4 py-3 pl-20 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-800/50 cursor-pointer"
                                  onClick={() => navigate('/practice')}
                                >
                                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                                    <GraduationCap className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                                      Take {week.goals.mockExams} mock exam{week.goals.mockExams > 1 ? 's' : ''}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                      Full-length practice exam
                                    </p>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-slate-400" />
                                </div>
                              )}
                              {week.phase === 'exam-week' && (
                                <div className="px-4 py-3 pl-20 flex items-center gap-3">
                                  <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
                                    <CheckCircle className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                                  </div>
                                  <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Light review only — trust your preparation!
                                  </p>
                                </div>
                              )}
                            </>
                          );
                        })()}
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
              // Compare at day level, not time level - prevents "behind schedule" on same day
              const datePassed = startOfDay(toLocalDate(milestone.date)) < startOfDay(today);
              const { isComplete, progressPct } = getMilestoneCompletion(milestone);
              const isNext = !isComplete && (index === 0 || getMilestoneCompletion(plan.milestones[index - 1]).isComplete);
              
              return (
                <div 
                  key={milestone.id}
                  className={clsx(
                    'relative pl-10',
                    isComplete && 'opacity-60'
                  )}
                >
                  {/* Circle marker */}
                  <div className={clsx(
                    'absolute left-2 w-5 h-5 rounded-full flex items-center justify-center',
                    isComplete 
                      ? 'bg-green-500' 
                      : isNext
                      ? 'bg-primary-600 ring-4 ring-primary-100 dark:ring-primary-900/50'
                      : 'bg-slate-300 dark:bg-slate-600'
                  )}>
                    {isComplete && <CheckCircle className="w-3 h-3 text-white" />}
                  </div>
                  
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {milestone.label}
                      {/* Show progress for phase/checkpoint milestones if in progress */}
                      {!isComplete && (milestone.type === 'phase-start' || milestone.type === 'checkpoint') && progressPct > 0 && (
                        <span className="ml-2 text-sm font-normal text-slate-500 dark:text-slate-400">
                          ({progressPct}%)
                        </span>
                      )}
                    </p>
                    <p className={clsx(
                      'text-sm',
                      datePassed && !isComplete ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400'
                    )}>
                      {format(toLocalDate(milestone.date), 'MMMM d, yyyy')}
                      {datePassed && !isComplete && ' • Behind schedule'}
                      {milestone.description && !datePassed && ` • ${milestone.description}`}
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
            {lessons.length > 0 ? lessons.filter(l => completedLessonIds.has(l.id)).length : plan.progress.lessonsCompleted}/{plan.progress.lessonsTotal}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Lessons</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {liveAccuracy?.questionsAnswered ?? plan.progress.questionsAnswered}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Questions</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center">
          <p className={clsx(
            'text-2xl font-bold',
            (liveAccuracy?.accuracy ?? plan.progress.accuracy) >= 75 ? 'text-green-600' :
            (liveAccuracy?.accuracy ?? plan.progress.accuracy) >= 50 ? 'text-amber-600' :
            (liveAccuracy?.accuracy ?? plan.progress.accuracy) > 0 ? 'text-red-500' :
            'text-slate-900 dark:text-white'
          )}>
            {liveAccuracy?.accuracy ?? plan.progress.accuracy}%
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Accuracy</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {liveDaysStudied ?? plan.progress.daysStudied}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Days Studied</p>
        </div>
      </div>
    </div>
  );
};

export default StudyPlan;

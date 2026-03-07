/**
 * Progress Page - Simplified Google-style Design
 * 
 * Focuses on: One glanceable hero, 4 key stats, weekly activity
 * Detailed analytics hidden behind "View Details" expansion
 */

import React, { useState, useEffect, useMemo } from 'react';
import logger from '../../utils/logger';
import { Link } from 'react-router-dom';
import { toLocalDate } from '../../utils/dateHelpers';
import {
  TrendingUp,
  BookOpen,
  Calendar,
  Sparkles,
  Play,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { PageHeader } from '../navigation';
import { useAuth } from '../../hooks/useAuth';
import { useStudy } from '../../hooks/useStudy';
import { useCourse } from '../../providers/CourseProvider';
import { useStudyPlan } from '../../hooks/useStudyPlan';
import { getCurrentSectionForCourse } from '../../utils/sectionUtils';
import { getExamDate } from '../../utils/profileHelpers';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { format, subDays, eachDayOfInterval, differenceInDays, isWithinInterval } from 'date-fns';
import clsx from 'clsx';
import { ExamSection } from '../../types';
import { fetchAllLessons } from '../../services/lessonService';
import { getTBSHistory } from '../../services/questionHistoryService';
import { getTopicToBlueprintAreaMap } from '../../services/questionService';
import { calculateExamReadiness, ReadinessData, TopicStat, getStatusColor, getStatusText } from '../../utils/examReadiness';
import { calculateBlueprintAnalytics, BlueprintAnalytics, QuestionAttempt } from '../../utils/blueprintAnalytics';
import { BlueprintHeatMap, SmartRecommendations } from '../analytics/BlueprintAnalyticsComponents';

interface WeeklyActivity {
  date: Date;
  questions: number;
  correct: number;
  minutes: number;
}

interface UnitStats {
  id: string;
  name: string;
  lessonsComplete: number;
  lessonsTotal: number;
  mcqAnswered: number;
  mcqCorrect: number;
  accuracy: number;
  progress: number;
}

const Progress: React.FC = () => {
  const { user, userProfile } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentStreak, getTopicPerformance, getLessonProgress } = useStudy() as any;
  const { courseId, course } = useCourse();
  const { plan: savedStudyPlan, hasPlan: hasSavedPlan } = useStudyPlan();
  
  // State
  const [weeklyActivity, setWeeklyActivity] = useState<WeeklyActivity[]>([]);
  const [topicPerformance, setTopicPerformance] = useState<TopicStat[]>([]);
  const [unitStats, setUnitStats] = useState<UnitStats[]>([]);
  const [overallStats, setOverallStats] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    lessonsCompleted: 0,
    totalLessons: 0,
    studyMinutes: 0,
    accuracy: 0,
    tbsCompleted: 0,
    totalTbs: 20,
  });
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  
  // Derived state
  const SINGLE_EXAM_COURSES = ['cisa', 'cfp'];
  const isSingleExamCourse = SINGLE_EXAM_COURSES.includes(courseId);
  const currentSection = getCurrentSectionForCourse(userProfile?.examSection, courseId) as ExamSection;
  
  // Exam date from study plan or profile
  const examDate = savedStudyPlan?.examDate 
    ? toLocalDate(savedStudyPlan.examDate)
    : getExamDate(userProfile, currentSection, courseId);
  
  // Note: We only use savedStudyPlan for display; fallback plans are generated on-demand by generateStudyPlan if needed
  
  const daysUntilExam = examDate ? differenceInDays(toLocalDate(examDate), new Date()) : null;
  
  // Current week from plan
  const currentWeekFromPlan = useMemo(() => {
    if (!savedStudyPlan?.weeks) return null;
    const today = new Date();
    return savedStudyPlan.weeks.find((w: { startDate: Date | string; endDate: Date | string }) => {
      const start = new Date(w.startDate);
      const end = new Date(w.endDate);
      return isWithinInterval(today, { start, end });
    });
  }, [savedStudyPlan]);

  // Load data
  useEffect(() => {
    if (!user?.uid) return;

    const loadProgressData = async () => {
      setLoading(true);
      try {
        // Get weekly activity (past 7 days)
        const days = eachDayOfInterval({
          start: subDays(new Date(), 6),
          end: new Date(),
        });

        let sectionQuestions = 0;
        let sectionCorrect = 0;
        let sectionMinutes = 0;

        const dailyData = await Promise.all(
          days.map(async (date) => {
            const dateKey = format(date, 'yyyy-MM-dd');
            const dailyLogId = `${courseId}_${dateKey}`;
            const logRef = doc(db, 'users', user.uid, 'daily_log', dailyLogId);
            const logSnap = await getDoc(logRef);

            if (logSnap.exists()) {
              const log = logSnap.data();
              const sectionData = log.sections?.[currentSection] || {};
              sectionQuestions += sectionData.questionsAnswered || 0;
              sectionCorrect += sectionData.questionsCorrect || 0;
              sectionMinutes += sectionData.studyMinutes || log.studyMinutes || 0;
              
              return {
                date,
                questions: sectionData.questionsAnswered || log.questionsAnswered || 0,
                correct: sectionData.questionsCorrect || log.questionsCorrect || 0,
                minutes: sectionData.studyMinutes || log.studyMinutes || 0,
              };
            }

            return { date, questions: 0, correct: 0, minutes: 0 };
          })
        );

        setWeeklyActivity(dailyData);

        // Get lesson progress for this section
        const lessonProgress = await getLessonProgress(currentSection);
        const allLessons = await fetchAllLessons(courseId);
        // Filter lessons for current section
        const lessons = allLessons.filter((l: any) => 
          !l.section || l.section === currentSection || isSingleExamCourse
        );
        const completedLessons = Object.values(lessonProgress || {})
          .filter((l: any) => l.status === 'completed').length;

        // Get TBS history for this course (EA doesn't have TBS)
        let tbsCompleted = 0;
        const courseHasTBS = !['ea'].includes(courseId);
        if (courseHasTBS) {
          try {
            const tbsHistory = await getTBSHistory(user.uid, currentSection);
            tbsCompleted = tbsHistory.length;
          } catch (err) {
            logger.warn('Could not load TBS history:', err);
          }
        }

        // Get topic performance
        const topics = await getTopicPerformance(currentSection);
        setTopicPerformance(topics || []);

        // Calculate overall stats
        const totalQuestions = sectionQuestions || topics?.reduce((sum: number, t: TopicStat) => sum + t.questions, 0) || 0;
        const correctAnswers = sectionCorrect || topics?.reduce((sum: number, t: TopicStat) => sum + Math.round(t.questions * t.accuracy / 100), 0) || 0;

        setOverallStats({
          totalQuestions,
          correctAnswers,
          lessonsCompleted: completedLessons,
          totalLessons: lessons.length,
          studyMinutes: sectionMinutes,
          accuracy: totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0,
          tbsCompleted,
          totalTbs: 20,
        });

        // Build unit stats for details view
        const topicToBlueprintMap = await getTopicToBlueprintAreaMap(courseId, currentSection);
        const unitMap = new Map<string, UnitStats>();
        
        lessons.forEach((lesson: any) => {
          const blueprintArea = lesson.blueprintArea || topicToBlueprintMap.get(lesson.topic) || lesson.topic?.split(' - ')[0] || 'Other';
          if (!unitMap.has(blueprintArea)) {
            unitMap.set(blueprintArea, {
              id: blueprintArea,
              name: blueprintArea,
              lessonsComplete: 0,
              lessonsTotal: 0,
              mcqAnswered: 0,
              mcqCorrect: 0,
              accuracy: 0,
              progress: 0,
            });
          }
          const unit = unitMap.get(blueprintArea)!;
          unit.lessonsTotal++;
          if (lessonProgress?.[lesson.id]?.status === 'completed') {
            unit.lessonsComplete++;
          }
        });

        topics?.forEach((topic: TopicStat) => {
          const blueprintArea = topic.id?.split('-').slice(0, 2).join('-') || topic.topic?.split(' - ')[0] || 'Other';
          const unit = unitMap.get(blueprintArea);
          if (unit) {
            unit.mcqAnswered += topic.questions;
            unit.mcqCorrect += Math.round(topic.questions * topic.accuracy / 100);
          }
        });

        unitMap.forEach(unit => {
          unit.accuracy = unit.mcqAnswered > 0 ? Math.round((unit.mcqCorrect / unit.mcqAnswered) * 100) : 0;
          const lessonWeight = 0.4;
          const mcqWeight = 0.6;
          const lessonProgress = unit.lessonsTotal > 0 ? (unit.lessonsComplete / unit.lessonsTotal) * 100 : 0;
          const mcqProgress = Math.min(100, (unit.mcqAnswered / 20) * 100);
          unit.progress = Math.round(lessonProgress * lessonWeight + mcqProgress * mcqWeight);
        });

        setUnitStats(Array.from(unitMap.values()));

      } catch (err) {
        logger.error('Error loading progress data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProgressData();
  }, [user, courseId, currentSection, getTopicPerformance, getLessonProgress]);

  // Calculate readiness
  const readiness = useMemo<ReadinessData>(() => {
    const blendedStats = {
      ...overallStats,
      lessonsCompleted: hasSavedPlan && savedStudyPlan?.progress?.lessonsCompleted
        ? Math.max(overallStats.lessonsCompleted, savedStudyPlan.progress.lessonsCompleted)
        : overallStats.lessonsCompleted,
    };
    
    // EA doesn't have TBS
    const courseHasTBS = !['ea'].includes(courseId);

    return calculateExamReadiness(
      blendedStats,
      topicPerformance,
      blendedStats.lessonsCompleted,
      blendedStats.totalLessons,
      blendedStats.tbsCompleted,
      blendedStats.totalTbs,
      { hasTBS: courseHasTBS }
    );
  }, [overallStats, topicPerformance, hasSavedPlan, savedStudyPlan, courseId]);

  // Blueprint analytics for details view
  const blueprintAnalytics = useMemo<BlueprintAnalytics>(() => {
    const questionHistory: QuestionAttempt[] = topicPerformance.flatMap(topic => {
      const attempts: QuestionAttempt[] = [];
      if (topic.questions > 0) {
        const correctCount = Math.round(topic.accuracy * topic.questions / 100);
        for (let i = 0; i < topic.questions; i++) {
          attempts.push({
            questionId: `${topic.id}-${i}`,
            blueprintArea: topic.id?.split('-').slice(0, 2).join('-') || topic.topic,
            topicId: topic.id,
            correct: i < correctCount,
          });
        }
      }
      return attempts;
    });
    
    return calculateBlueprintAnalytics(currentSection, questionHistory);
  }, [currentSection, topicPerformance]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
        <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-xl w-48 mb-2 animate-pulse" />
            <div className="h-5 bg-slate-100 dark:bg-slate-600 rounded-lg w-64 animate-pulse" />
          </div>
        </div>
        <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 animate-pulse">
            <div className="h-24 bg-slate-200 dark:bg-slate-700 rounded-xl" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-4 animate-pulse">
                <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-lg mb-2" />
                <div className="h-4 bg-slate-100 dark:bg-slate-600 rounded w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  const hasAnyProgress = overallStats.totalQuestions > 0 || overallStats.lessonsCompleted > 0;
  
  if (!hasAnyProgress) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
        <PageHeader title="My Progress" subtitle={`Track your ${course.shortName} journey`} />
        
        <div className="max-w-md mx-auto px-4 py-16 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Start Your Journey
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-8">
            Complete your first practice session or lesson to see your progress here.
          </p>
          <Link 
            to="/practice" 
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            <Play className="w-5 h-5" />
            Start Practice
          </Link>
        </div>
      </div>
    );
  }

  // Health status styling
  const healthStatus = hasSavedPlan && savedStudyPlan?.health 
    ? savedStudyPlan.health 
    : readiness.status === 'ready' ? 'on-track' 
    : readiness.status === 'almost' ? 'slightly-behind' 
    : 'at-risk';
  
  const healthStyles: Record<string, { bg: string; text: string; label: string }> = {
    'on-track': { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-400', label: 'On Track' },
    'slightly-behind': { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-400', label: 'Keep Going' },
    'behind': { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-400', label: 'Behind' },
    'at-risk': { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', label: 'Needs Focus' },
    'ahead': { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-400', label: 'Ahead!' },
  };
  const style = healthStyles[healthStatus] || healthStyles['on-track'];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
      <PageHeader 
        title="My Progress"
        subtitle={`Track your ${course.shortName} journey`}
      />

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        
        {/* Hero Card - One glanceable answer to "Am I on track?" */}
        <div className={clsx(
          'rounded-2xl p-6 border-2',
          style.bg,
          'border-transparent'
        )}>
          <div className="flex items-center gap-6">
            {/* Readiness Score */}
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48" cy="48" r="40"
                  fill="none" stroke="currentColor" strokeWidth="6"
                  className="text-slate-200 dark:text-slate-700"
                />
                <circle
                  cx="48" cy="48" r="40"
                  fill="none" stroke="currentColor" strokeWidth="6"
                  strokeLinecap="round"
                  className={clsx(getStatusColor(readiness.status))}
                  strokeDasharray={`${readiness.overall * 2.51} 251`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={clsx('text-2xl font-bold', style.text)}>
                  {readiness.overall}%
                </span>
              </div>
            </div>

            {/* Status & Exam Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={clsx('text-lg font-bold', style.text)}>
                  {getStatusText(readiness.status)}
                </span>
                <span className={clsx('px-2 py-0.5 rounded-full text-xs font-medium', style.bg, style.text)}>
                  {style.label}
                </span>
              </div>
              
              {daysUntilExam !== null && daysUntilExam > 0 && (
                <p className="text-slate-600 dark:text-slate-400 text-sm flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {daysUntilExam} days until {isSingleExamCourse ? course.shortName : currentSection} exam
                </p>
              )}
              
              {currentWeekFromPlan && (
                <p className="text-slate-500 dark:text-slate-500 text-sm mt-0.5">
                  Week {currentWeekFromPlan.weekNumber} • {currentWeekFromPlan.phase}
                </p>
              )}
            </div>
          </div>

          {/* Single Primary CTA */}
          <Link 
            to="/study-plan"
            className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-semibold transition-colors"
          >
            <Play className="w-5 h-5" />
            Continue Studying
          </Link>
        </div>

        {/* 4 Key Stats */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {overallStats.totalQuestions}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Questions</div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {overallStats.accuracy}%
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Accuracy</div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {overallStats.lessonsCompleted}/{overallStats.totalLessons}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Lessons</div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {currentStreak || 0}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Streak</div>
          </div>
        </div>

        {/* Weekly Activity Chart */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            This Week
          </h3>
          
          <div className="h-32 flex items-end justify-between gap-2">
            {weeklyActivity.map((day, i) => {
              const maxQ = Math.max(...weeklyActivity.map(d => d.questions), 1);
              const height = Math.max(8, (day.questions / maxQ) * 100);
              const isToday = format(day.date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
              const accuracy = day.questions > 0 ? Math.round((day.correct / day.questions) * 100) : 0;

              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  {day.questions > 0 && (
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                      {day.questions}
                    </span>
                  )}
                  <div className="w-full flex-1 flex items-end">
                    <div
                      className={clsx(
                        'w-full rounded-t-md transition-all',
                        day.questions === 0 ? 'bg-slate-200 dark:bg-slate-700' :
                        accuracy >= 75 ? 'bg-emerald-500' :
                        accuracy >= 50 ? 'bg-amber-500' :
                        'bg-blue-400'
                      )}
                      style={{ height: `${height}%`, minHeight: day.questions > 0 ? '16px' : '4px' }}
                    />
                  </div>
                  <span className={clsx(
                    "text-xs",
                    isToday ? "font-bold text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-slate-500"
                  )}>
                    {format(day.date, 'EEE')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Expandable Details Section */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          {showDetails ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Hide Detailed Analytics
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              View Detailed Analytics
            </>
          )}
        </button>

        {showDetails && (
          <div className="space-y-4 animate-in slide-in-from-top-2">
            {/* Blueprint Heat Map */}
            {blueprintAnalytics.totalAreas > 0 && (
              <BlueprintHeatMap analytics={blueprintAnalytics} />
            )}
            
            {/* Smart Recommendations */}
            {blueprintAnalytics.recommendations.length > 0 && (
              <SmartRecommendations 
                recommendations={blueprintAnalytics.recommendations}
                onStartStudy={(areaId) => {
                  window.location.href = `/practice?section=${currentSection}&area=${areaId}`;
                }}
              />
            )}

            {/* Units Summary */}
            {unitStats.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-4">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  Progress by Topic
                </h3>
                <div className="space-y-3">
                  {unitStats.slice(0, 5).map((unit) => (
                    <div key={unit.id} className="flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
                            {unit.name}
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            {unit.progress}%
                          </span>
                        </div>
                        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${unit.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Progress;

import React, { useState, useEffect, useMemo } from 'react';
import logger from '../../utils/logger';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Target,
  Flame,
  Clock,
  CheckCircle,
  BookOpen,
  HelpCircle,
  Calendar,
  Sparkles,
  Play,
  ChevronDown,
  ChevronUp,
  FileText,
} from 'lucide-react';
import { PageHeader } from '../navigation';
import { useAuth } from '../../hooks/useAuth';
import { useStudy } from '../../hooks/useStudy';
import { useCourse } from '../../providers/CourseProvider';
import { getSectionDisplayInfo, getDefaultSection } from '../../utils/sectionUtils';
import { getExamDate } from '../../utils/profileHelpers';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { format, subDays, eachDayOfInterval, differenceInDays } from 'date-fns';
import clsx from 'clsx';
import { ExamSection } from '../../types';
import { generateStudyPlan, calculatePaceStatus, type PaceStatus } from '../../utils/studyPlanner';
import { fetchAllLessons } from '../../services/lessonService';
import { getTBSHistory } from '../../services/questionHistoryService';
import { calculateExamReadiness, ReadinessData, TopicStat, getStatusColor, getStatusText } from '../../utils/examReadiness';
import { calculateBlueprintAnalytics, BlueprintAnalytics, QuestionAttempt } from '../../utils/blueprintAnalytics';
import { BlueprintHeatMap, WeightComparisonChart, SmartRecommendations, AnalyticsSummary } from '../analytics/BlueprintAnalyticsComponents';
import Leaderboard from '../Leaderboard';
import type { CourseId } from '../../types';

// Get the exam governing body name for each course
const getExamBody = (courseId: CourseId): string => {
  const examBodies: Record<CourseId, string> = {
    cpa: 'AICPA',
    ea: 'IRS',
    cma: 'IMA',
    cia: 'IIA',
    cisa: 'ISACA',
    cfp: 'CFP Board',
  };
  return examBodies[courseId] || 'Exam';
};

interface WeeklyActivity {
  date: Date;
  points: number;
  goal: number;
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

// Units Report Component (Becker-style table)
const UnitsReport: React.FC<{ unitStats: UnitStats[], section: string }> = ({ unitStats, section }) => {
  const [expanded, setExpanded] = useState(true);
  const [sortBy, setSortBy] = useState<'name' | 'progress' | 'accuracy'>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const { courseId } = useCourse();
  
  const sectionInfo = getSectionDisplayInfo(section, courseId);
  
  const sortedUnits = [...unitStats].sort((a, b) => {
    const multiplier = sortDir === 'asc' ? 1 : -1;
    if (sortBy === 'name') return a.name.localeCompare(b.name) * multiplier;
    if (sortBy === 'progress') return (a.progress - b.progress) * multiplier;
    return (a.accuracy - b.accuracy) * multiplier;
  });
  
  const handleSort = (column: 'name' | 'progress' | 'accuracy') => {
    if (sortBy === column) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDir('asc');
    }
  };
  
  if (unitStats.length === 0) return null;
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 mb-6 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: sectionInfo?.color || '#2563EB' }}
          >
            {sectionInfo?.shortName || section}
          </div>
          <div className="text-left">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary-600" />
              Units Report
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">Detailed progress by blueprint area</p>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        )}
      </button>
      
      {expanded && (
        <div className="px-6 pb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th 
                    className="text-left py-3 px-2 font-semibold text-slate-600 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                    onClick={() => handleSort('name')}
                  >
                    <span className="flex items-center gap-1">
                      Unit
                      {sortBy === 'name' && (sortDir === 'asc' ? '↑' : '↓')}
                    </span>
                  </th>
                  <th className="text-center py-3 px-2 font-semibold text-slate-600 dark:text-slate-300">
                    Lessons
                  </th>
                  <th className="text-center py-3 px-2 font-semibold text-slate-600 dark:text-slate-300">
                    MCQs
                  </th>
                  <th 
                    className="text-center py-3 px-2 font-semibold text-slate-600 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                    onClick={() => handleSort('accuracy')}
                  >
                    <span className="flex items-center justify-center gap-1">
                      Accuracy
                      {sortBy === 'accuracy' && (sortDir === 'asc' ? '↑' : '↓')}
                    </span>
                  </th>
                  <th 
                    className="text-center py-3 px-2 font-semibold text-slate-600 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                    onClick={() => handleSort('progress')}
                  >
                    <span className="flex items-center justify-center gap-1">
                      Progress
                      {sortBy === 'progress' && (sortDir === 'asc' ? '↑' : '↓')}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedUnits.map((unit, index) => (
                  <tr 
                    key={unit.id}
                    className={clsx(
                      'border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors',
                      index % 2 === 0 && 'bg-slate-50/50 dark:bg-slate-800/50'
                    )}
                  >
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                          {unit.id}
                        </span>
                        <span className="font-medium text-slate-900 dark:text-white truncate max-w-[200px]">
                          {unit.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span className={clsx(
                        'font-medium',
                        unit.lessonsComplete === unit.lessonsTotal && unit.lessonsTotal > 0
                          ? 'text-success-600'
                          : 'text-slate-700 dark:text-slate-300'
                      )}>
                        {unit.lessonsComplete}/{unit.lessonsTotal}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span className="text-slate-700 dark:text-slate-300">
                        {unit.mcqCorrect}/{unit.mcqAnswered}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span className={clsx(
                        'font-semibold',
                        unit.accuracy >= 75 ? 'text-success-600' :
                        unit.accuracy >= 50 ? 'text-warning-600' :
                        unit.mcqAnswered === 0 ? 'text-slate-600' : 'text-error-600'
                      )}>
                        {unit.mcqAnswered > 0 ? `${unit.accuracy}%` : '—'}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className={clsx(
                              'h-full rounded-full transition-all',
                              unit.progress === 100 ? 'bg-success-500' : 'bg-primary-500'
                            )}
                            style={{ width: `${unit.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-slate-600 w-9 text-right">
                          {unit.progress}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Summary row */}
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-sm">
            <div className="flex gap-4">
              <div className="text-slate-600 dark:text-slate-300">
                <span className="font-semibold text-slate-900 dark:text-white">
                  {unitStats.reduce((a, u) => a + u.lessonsComplete, 0)}
                </span>
                /{unitStats.reduce((a, u) => a + u.lessonsTotal, 0)} Lessons
              </div>
              <div className="text-slate-600 dark:text-slate-300">
                <span className="font-semibold text-slate-900 dark:text-white">
                  {unitStats.reduce((a, u) => a + u.mcqAnswered, 0)}
                </span> MCQs Attempted
              </div>
            </div>
            <div className="text-primary-600 font-semibold">
              {Math.round(unitStats.reduce((a, u) => a + u.progress, 0) / Math.max(1, unitStats.length))}% Overall
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Blueprint areas are sourced from course config via BlueprintHeatMap component
// This enables the Progress page to work for all 6 exams automatically

// Exam Readiness Gauge
const ReadinessGauge: React.FC<{ readiness: ReadinessData, examDate: string | Date | undefined }> = ({ readiness, examDate }) => {
  const daysUntilExam = examDate ? differenceInDays(new Date(examDate), new Date()) : null;

  return (
    <div className="text-center">
      {/* Circular gauge */}
      <div className="relative w-32 h-32 mx-auto mb-4">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-slate-100 dark:text-slate-700"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            className={getStatusColor(readiness.status)}
            strokeDasharray={`${readiness.overall * 2.51} 251`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={clsx('text-3xl font-bold', getStatusColor(readiness.status))}>
            {readiness.overall}%
          </span>
        </div>
      </div>

      <div className={clsx('text-lg font-semibold', getStatusColor(readiness.status))}>
        {getStatusText(readiness.status)}
      </div>

      {daysUntilExam !== null && daysUntilExam > 0 && (
        <div className="flex items-center justify-center gap-1 mt-2 text-sm text-slate-600 dark:text-slate-400">
          <Calendar className="w-4 h-4" />
          <span>{daysUntilExam} days until exam</span>
        </div>
      )}

      {/* Breakdown - 2x2 grid with 5 items */}
      <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-2">
          <div className="font-medium text-slate-900 dark:text-slate-100">{readiness.breakdown.accuracy}%</div>
          <div className="text-slate-600 dark:text-slate-400">Accuracy</div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-2">
          <div className="font-medium text-slate-900 dark:text-slate-100">{readiness.breakdown.coverage}%</div>
          <div className="text-slate-600 dark:text-slate-400">Coverage</div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-2">
          <div className="font-medium text-slate-900 dark:text-slate-100">{readiness.breakdown.volume}%</div>
          <div className="text-slate-600 dark:text-slate-400">Volume</div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-2">
          <div className="font-medium text-slate-900 dark:text-slate-100">{readiness.breakdown.lessons}%</div>
          <div className="text-slate-600 dark:text-slate-400">Lessons</div>
        </div>
      </div>
    </div>
  );
};

const Progress: React.FC = () => {
  const { user, userProfile } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentStreak, getTopicPerformance, getLessonProgress } = useStudy() as any;
  const { courseId, course } = useCourse();
  const [timeRange, setTimeRange] = useState('week');
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

  // Study Plan - use getExamDate helper for multi-course support
  const examDate = getExamDate(userProfile, userProfile?.examSection as string, courseId) || new Date();
  const studyPlan = userProfile?.examSection ? generateStudyPlan(userProfile.examSection, examDate) : null;

  const currentSection = (userProfile?.examSection || getDefaultSection(courseId)) as ExamSection;
  const sectionInfo = getSectionDisplayInfo(currentSection, courseId);

  // Load real data from Firestore
  useEffect(() => {
    if (!user?.uid) return;

    const loadProgressData = async () => {
      setLoading(true);
      try {
        // Get weekly activity from daily logs
        const days = eachDayOfInterval({
          start: subDays(new Date(), 6),
          end: new Date(),
        });

        // Track section-specific stats
        let sectionQuestions = 0;
        let sectionCorrect = 0;
        let sectionMinutes = 0;

        const dailyData = await Promise.all(
          days.map(async (date) => {
            const dateKey = format(date, 'yyyy-MM-dd');
            // Use course-specific daily log ID
            const dailyLogId = `${courseId}_${dateKey}`;
            const logRef = doc(db, 'users', user.uid, 'daily_log', dailyLogId);
            const logSnap = await getDoc(logRef);

            if (logSnap.exists()) {
              const data = logSnap.data();
              
              // Filter activities by current section for section-specific stats
              const activities = data.activities || [];
              const sectionActivities = activities.filter(
                (a: { section?: string; type?: string }) => 
                  a.section === currentSection || 
                  // Include legacy activities without section
                  (!a.section && a.type === 'mcq')
              );
              
              // Count section-specific MCQs
              const mcqActivities = sectionActivities.filter((a: { type?: string }) => a.type === 'mcq');
              const correctMcqs = mcqActivities.filter((a: { isCorrect?: boolean }) => a.isCorrect).length;
              
              sectionQuestions += mcqActivities.length;
              sectionCorrect += correctMcqs;
              
              // Estimate time per activity
              const sectionTime = sectionActivities.reduce(
                (sum: number, a: { timeSpentSeconds?: number; timeSpent?: number }) => {
                  if (a.timeSpentSeconds) {
                    return sum + (a.timeSpentSeconds / 60);
                  } else if (a.timeSpent) {
                    return sum + a.timeSpent;
                  }
                  return sum;
                }, 
                0
              );
              sectionMinutes += sectionTime;

              return {
                date,
                points: data.earnedPoints || 0,
                goal: data.goalPoints || userProfile?.dailyGoal || 50,
                questions: mcqActivities.length, // Section-specific
                correct: correctMcqs, // Section-specific
                minutes: Math.round(sectionTime), // Section-specific
              };
            }
            return {
              date,
              points: 0,
              goal: userProfile?.dailyGoal || 50,
              questions: 0,
              correct: 0,
              minutes: 0,
            };
          })
        );
        setWeeklyActivity(dailyData);

        // Get topic performance filtered by current section
        let topicsData: TopicStat[] = [];
        if (getTopicPerformance) {
            topicsData = await getTopicPerformance(currentSection);
        }
        setTopicPerformance(topicsData);

        // Get lesson progress
        let lessonsCompletedCount = 0;
        if (getLessonProgress) {
          const lessonProgress = await getLessonProgress();
          // Only count lessons for the current section
          lessonsCompletedCount = Object.values(lessonProgress).filter(
            (lesson: any) => lesson.section === currentSection
          ).length;
        }

        // Get total lessons for user's section
        const allLessons = await fetchAllLessons(courseId);
        const sectionLessons = allLessons.filter(l => l.section === currentSection);
        // If no lessons uploaded for section, default to 0 to avoid misleading progress
        const totalLessonsCount = sectionLessons.length;

        // Get TBS history for section
        const tbsHistory = await getTBSHistory(user.uid, currentSection);
        const tbsCompletedCount = tbsHistory.length;

        // Calculate unit stats for Units Report (Becker-style)
        const sectionConfig = course.sections.find(s => s.id === currentSection);
        const blueprintAreas = sectionConfig?.blueprintAreas || [];
        
        // Get lesson progress for mapping
        let lessonProgressData: Record<string, any> = {};
        if (getLessonProgress) {
          lessonProgressData = await getLessonProgress();
        }
        
        const calculatedUnitStats: UnitStats[] = blueprintAreas.map(bp => {
          // Find lessons for this blueprint area
          const areaLessons = sectionLessons.filter(l => 
            l.blueprintArea === bp.id || 
            l.topics?.some(t => t.startsWith(bp.id)) ||
            l.id?.startsWith(bp.id.toLowerCase())
          );
          
          // Find topic performance for this area
          const areaTopics = topicsData.filter(t => 
            t.topic?.startsWith(bp.id) || 
            t.id?.startsWith(bp.id)
          );
          
          const lessonsComplete = areaLessons.filter(l => 
            lessonProgressData[l.id]?.status === 'completed' || 
            lessonProgressData[l.id]?.completedAt
          ).length;
          
          const mcqAnswered = areaTopics.reduce((sum, t) => sum + (t.questions || 0), 0);
          const mcqCorrect = areaTopics.reduce((sum, t) => sum + Math.round((t.accuracy || 0) * (t.questions || 0) / 100), 0);
          
          // Calculate progress as weighted average of lessons and questions
          const lessonWeight = 0.6;
          const mcqWeight = 0.4;
          const lessonProgress = areaLessons.length > 0 ? (lessonsComplete / areaLessons.length) * 100 : 0;
          const mcqProgress = mcqAnswered > 0 ? Math.min(100, mcqAnswered / 10 * 100) : 0; // 10 MCQs = 100%
          const progress = Math.round(lessonProgress * lessonWeight + mcqProgress * mcqWeight);
          
          return {
            id: bp.id,
            name: bp.name,
            lessonsComplete,
            lessonsTotal: areaLessons.length,
            mcqAnswered,
            mcqCorrect,
            accuracy: mcqAnswered > 0 ? Math.round((mcqCorrect / mcqAnswered) * 100) : 0,
            progress,
          };
        });
        
        setUnitStats(calculatedUnitStats);

        setOverallStats({
          totalQuestions: sectionQuestions,
          correctAnswers: sectionCorrect,
          studyMinutes: Math.round(sectionMinutes),
          accuracy: sectionQuestions > 0 ? Math.round((sectionCorrect / sectionQuestions) * 100) : 0,
          lessonsCompleted: lessonsCompletedCount,
          totalLessons: totalLessonsCount,
          tbsCompleted: tbsCompletedCount,
          totalTbs: 20, // Baseline TBS count per section
        });

      } catch (error) {
        logger.error('Error loading progress:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProgressData();
  }, [user?.uid, userProfile?.dailyGoal, getTopicPerformance, getLessonProgress, currentSection, courseId]);

  const readiness = calculateExamReadiness(
    overallStats,
    topicPerformance,
    overallStats.lessonsCompleted,
    overallStats.totalLessons,
    overallStats.tbsCompleted,
    overallStats.totalTbs
  );

  // Calculate blueprint analytics for advanced heat map and recommendations
  const blueprintAnalytics = useMemo<BlueprintAnalytics>(() => {
    // Convert topic performance to question attempts format
    const questionHistory: QuestionAttempt[] = topicPerformance.flatMap(topic => {
      const attempts: QuestionAttempt[] = [];
      // Create synthetic question attempts based on topic stats
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

  // Find weakest topic for recommendations
  const weakestTopic = topicPerformance.length > 0
    ? topicPerformance.reduce((weakest, topic) => 
        topic.accuracy < weakest.accuracy ? topic : weakest
      , topicPerformance[0])
    : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
        {/* Header skeleton */}
        <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-xl w-48 mb-2 animate-pulse" />
            <div className="h-5 bg-slate-100 dark:bg-slate-600 rounded-lg w-64 animate-pulse" />
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {/* Cards skeleton */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-6 animate-pulse">
                <div className="h-10 w-10 bg-slate-200 dark:bg-slate-700 rounded-xl mb-4" />
                <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-lg w-20 mb-2" />
                <div className="h-4 bg-slate-100 dark:bg-slate-600 rounded w-24" />
              </div>
            ))}
          </div>
          {/* Chart skeleton */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 animate-pulse">
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-lg w-40 mb-4" />
            <div className="h-48 bg-slate-100 dark:bg-slate-600 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  // Empty state for new users with no progress data
  const hasAnyProgress = overallStats.totalQuestions > 0 || overallStats.lessonsCompleted > 0;
  
  if (!hasAnyProgress) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
        <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">My Progress</h1>
            <p className="text-slate-600 dark:text-slate-300">Track your journey to {course.shortName} success</p>
          </div>
        </div>
        
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Start Your {course.shortName} Journey
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            Complete your first practice session or lesson to see your progress here. 
            We'll track your accuracy, study time, and help you identify areas to focus on.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              to="/practice" 
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              <Play className="w-5 h-5" />
              Start Practice
            </Link>
            <Link 
              to="/lessons" 
              className="inline-flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              View Lessons
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
      <PageHeader 
        title="My Progress"
        subtitle={`Track your journey to ${course.shortName} success`}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
      {/* Study Plan Overview (New Feature) */}
      {studyPlan && (() => {
        const paceInfo = calculatePaceStatus(
          studyPlan, 
          overallStats.lessonsCompleted, 
          overallStats.totalLessons
        );
        
        const paceStyles: Record<PaceStatus, { bg: string; text: string; icon: string }> = {
          'ahead': { bg: 'bg-emerald-500/20', text: 'text-emerald-400', icon: '🎯' },
          'on-track': { bg: 'bg-primary-500/20', text: 'text-primary-400', icon: '✓' },
          'slightly-behind': { bg: 'bg-amber-500/20', text: 'text-amber-400', icon: '📚' },
          'behind': { bg: 'bg-amber-500/20', text: 'text-amber-400', icon: '⚡' }
        };
        
        const style = paceStyles[paceInfo.status];
        
        return (
        <div className="card p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Target className="w-6 h-6 text-primary-400" />
                Study Plan: {sectionInfo?.name ?? currentSection}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Target Date: {format(studyPlan.examDate, 'MMMM d, yyyy')} • {studyPlan.totalDays} days remaining
              </p>
            </div>
            <div className="text-right hidden sm:block">
              <div className="text-3xl font-bold text-primary-400">{studyPlan.modulesPerDay}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Modules / Day</div>
            </div>
          </div>
          
          {/* Pace Status Indicator */}
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${style.bg} mb-4`}>
            <span>{style.icon}</span>
            <span className={`text-sm font-medium ${style.text}`}>{paceInfo.message}</span>
            {paceInfo.status !== 'on-track' && paceInfo.status !== 'ahead' && (
              <span className="text-xs text-slate-600 dark:text-slate-400 ml-1">
                ({paceInfo.adjustedPace}/day needed)
              </span>
            )}
          </div>
          
          {/* Milestones Progress Bar - positioned proportionally based on actual dates */}
          <div className="relative pt-6 pb-2">
            {/* Progress bar background */}
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-500 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(100, Math.max(2, (overallStats.lessonsCompleted / Math.max(1, overallStats.totalLessons)) * 100))}%` }} 
              />
            </div>
            
            {/* Milestone markers - positioned proportionally */}
            <div className="relative mt-4 h-16">
              {studyPlan.milestones.map((m, i) => (
                <div 
                  key={i} 
                  className="absolute flex flex-col items-center text-xs text-slate-600 dark:text-slate-400"
                  style={{ 
                    left: `${m.position}%`,
                    transform: i === 0 ? 'translateX(0)' : i === studyPlan.milestones.length - 1 ? 'translateX(-100%)' : 'translateX(-50%)'
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-slate-600 mb-2 ring-4 ring-slate-900" />
                  <span className="font-medium text-slate-300 whitespace-nowrap">{m.label}</span>
                  <span>{m.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        );
      })()}
      
        {/* Units Report - Becker-style detailed breakdown */}
        <UnitsReport unitStats={unitStats} section={currentSection} />
      
        {/* Blueprint Analytics - Advanced Mastery Analysis */}
        {blueprintAnalytics.totalAreas > 0 && (
          <div className="space-y-6 mb-6">
            {/* Summary Banner */}
            <AnalyticsSummary analytics={blueprintAnalytics} />
            
            {/* Heat Map */}
            <BlueprintHeatMap analytics={blueprintAnalytics} />
            
            {/* Two-column layout for recommendations and weight comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Smart Recommendations */}
              <SmartRecommendations 
                recommendations={blueprintAnalytics.recommendations}
                onStartStudy={(areaId) => {
                  // Navigate to practice with area filter
                  window.location.href = `/practice?section=${currentSection}&area=${areaId}`;
                }}
              />
              
              {/* Weight Comparison */}
              <WeightComparisonChart 
                comparisons={blueprintAnalytics.weightComparison} 
                examBody={getExamBody(courseId)}
              />
            </div>
          </div>
        )}
      
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Stats Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-2">
                  <Target className="w-4 h-4" />
                  <span className="text-sm font-medium">Accuracy</span>
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{overallStats.accuracy}%</div>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-2">
                  <HelpCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Questions</span>
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{overallStats.totalQuestions}</div>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">Study Time</span>
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {overallStats.studyMinutes >= 60 
                    ? `${Math.round(overallStats.studyMinutes / 60)}h` 
                    : `${Math.round(overallStats.studyMinutes)}m`}
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-2">
                  <Flame className="w-4 h-4" />
                  <span className="text-sm font-medium">Streak</span>
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{currentStreak || 0}</div>
              </div>
            </div>

            {/* Activity Chart */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary-600" />
                  Weekly Activity
                </h2>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-700 border-none rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 focus:ring-0 cursor-pointer"
                >
                  <option value="week">Past 7 Days</option>
                  <option value="month">Past 30 Days</option>
                </select>
              </div>

              {/* Summary stats row */}
              <div className="grid grid-cols-3 gap-4 mb-6 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                <div className="text-center">
                  <div className="text-xl font-bold text-primary-600">
                    {weeklyActivity.reduce((sum, d) => sum + d.questions, 0)}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">MCQs</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-emerald-600">
                    {weeklyActivity.reduce((sum, d) => sum + d.correct, 0)}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">Correct</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-amber-600">
                    {weeklyActivity.reduce((sum, d) => sum + d.minutes, 0) >= 60
                      ? `${Math.round(weeklyActivity.reduce((sum, d) => sum + d.minutes, 0) / 60)}h`
                      : `${weeklyActivity.reduce((sum, d) => sum + d.minutes, 0)}m`}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">Time</div>
                </div>
              </div>

              <div className="h-48 flex items-end justify-between gap-2">
                {weeklyActivity.map((day, i) => {
                  const maxQuestions = Math.max(...weeklyActivity.map(d => d.questions), 1);
                  const height = Math.max(8, (day.questions / maxQuestions) * 100);
                  const isToday = format(day.date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
                  const accuracy = day.questions > 0 ? Math.round((day.correct / day.questions) * 100) : 0;

                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                      {/* Question count label */}
                      <div className="text-xs font-medium text-slate-600 dark:text-slate-300 h-5">
                        {day.questions > 0 ? day.questions : ''}
                      </div>
                      <div className="w-full relative flex-1 flex items-end">
                        <div
                          className={clsx(
                            'w-full rounded-t-lg transition-all duration-500',
                            day.questions === 0
                              ? 'bg-slate-200 dark:bg-slate-600'
                              : accuracy >= 75
                                ? 'bg-success-500'
                                : accuracy >= 50
                                  ? 'bg-warning-500'
                                  : isToday
                                    ? 'bg-primary-500'
                                    : 'bg-primary-300'
                          )}
                          style={{ height: `${height}%`, minHeight: day.questions > 0 ? '20px' : '4px' }}
                        />
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                          <div className="font-bold">{day.questions} questions</div>
                          <div>{day.correct} correct ({accuracy}%)</div>
                          <div>{day.minutes}m study time</div>
                        </div>
                      </div>
                      <div className={clsx(
                        "text-xs font-medium",
                        isToday ? "text-primary-600 dark:text-primary-400" : "text-slate-600 dark:text-slate-400"
                      )}>
                        {format(day.date, 'EEE')}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Legend */}
              <div className="flex items-center justify-center gap-4 text-xs text-slate-600 dark:text-slate-300 mt-4 pt-3 border-t border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-success-500" />
                  <span>≥75%</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-warning-500" />
                  <span>50-74%</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-primary-300" />
                  <span>&lt;50%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Exam Readiness */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary-600" />
                Readiness Score
              </h2>
              <ReadinessGauge 
                readiness={readiness} 
                examDate={(() => {
                  const ed = userProfile?.examDate;
                  if (!ed) return undefined;
                  // Handle Firestore Timestamp
                  if (typeof (ed as any).toDate === 'function') {
                    return (ed as any).toDate();
                  }
                  // Handle Serialized Timestamp (from local storage)
                  if ((ed as any).seconds) {
                    return new Date((ed as any).seconds * 1000);
                  }
                  // Handle Date string or Object
                  return new Date(ed as any);
                })()} 
              />
            </div>

            {/* AI Recommendations */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-6 rounded-2xl text-white shadow-lg">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Focus Area</h3>
                  <p className="text-primary-100 text-sm">Based on your activity</p>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm mb-4">
                <div className="text-xs font-bold uppercase tracking-wider text-primary-200 mb-1">RECOMMENDATION</div>
                {weakestTopic ? (
                  <>
                    <div className="font-medium">Review "{weakestTopic.topic}"</div>
                    <div className="text-sm text-primary-200 mt-2">
                      Accuracy is {Math.round(weakestTopic.accuracy)}% - needs improvement
                    </div>
                  </>
                ) : (
                  <>
                    <div className="font-medium">Start practicing!</div>
                    <div className="text-sm text-primary-200 mt-2">
                      Answer some questions to see personalized recommendations
                    </div>
                  </>
                )}
              </div>

              <Link 
                to="/practice?mode=weak" 
                className="w-full py-3 bg-white text-primary-700 font-bold rounded-xl hover:bg-primary-50 transition-colors shadow-sm block text-center"
              >
                Start Focused Session
              </Link>
            </div>

            {/* Community Leaderboard Widget */}
            <Leaderboard compact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;

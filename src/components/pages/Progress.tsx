import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Target,
  Flame,
  Clock,
  CheckCircle,
  BookOpen,
  HelpCircle,
  BarChart3,
  Calendar,
  Sparkles,
  Play,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useStudy } from '../../hooks/useStudy';
import { CPA_SECTIONS, EXAM_BLUEPRINTS } from '../../config/examConfig';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { format, subDays, eachDayOfInterval, differenceInDays } from 'date-fns';
import clsx from 'clsx';
import { ExamSection } from '../../types';
import { generateStudyPlan } from '../../utils/studyPlanner';
import { fetchAllLessons } from '../../services/lessonService';

interface TopicStat {
  id: string;
  topic: string;
  accuracy: number;
  questions: number;
}

interface ReadinessData {
  overall: number;
  breakdown: {
    accuracy: number;
    coverage: number;
    volume: number;
    consistency: number;
  };
  status: 'ready' | 'almost' | 'more-study';
}

interface WeeklyActivity {
  date: Date;
  points: number;
  goal: number;
  questions: number;
  correct: number;
  minutes: number;
}

// Exam Readiness Calculator
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const calculateExamReadiness = (stats: any, topicPerformance: TopicStat[], lessonsCompleted: number, totalLessons: number): ReadinessData => {
  // Weights for different factors
  const weights = {
    accuracy: 0.35, // Overall accuracy
    coverage: 0.25, // Topics covered
    volume: 0.2, // Questions attempted
    consistency: 0.2, // Lesson progress
  };

  // Calculate scores (0-100)
  const accuracyScore = Math.min(100, (stats.accuracy || 0) * 1.25); // 80% = 100 score
  const coverageScore = Math.min(100, (topicPerformance.length / 15) * 100);
  const volumeScore = Math.min(100, (stats.totalQuestions / 500) * 100);
  const consistencyScore = totalLessons > 0 ? (lessonsCompleted / totalLessons) * 100 : 0;

  const overallReadiness = Math.round(
    accuracyScore * weights.accuracy +
      coverageScore * weights.coverage +
      volumeScore * weights.volume +
      consistencyScore * weights.consistency
  );

  return {
    overall: overallReadiness,
    breakdown: {
      accuracy: Math.round(accuracyScore),
      coverage: Math.round(coverageScore),
      volume: Math.round(volumeScore),
      consistency: Math.round(consistencyScore),
    },
    status: overallReadiness >= 80 ? 'ready' : overallReadiness >= 60 ? 'almost' : 'more-study',
  };
};

// Topic Heat Map Component
const TopicHeatMap: React.FC<{ topics: TopicStat[], section: string }> = ({ topics, section }) => {
  void section; // Use to suppress unused warning
  const getHeatColor = (accuracy: number | undefined) => {
    if (accuracy === undefined) return 'bg-slate-200'; // Not attempted
    if (accuracy >= 85) return 'bg-success-500';
    if (accuracy >= 75) return 'bg-success-300';
    if (accuracy >= 65) return 'bg-warning-400';
    if (accuracy >= 50) return 'bg-warning-500';
    return 'bg-error-500';
  };

  return (
    <div className="space-y-4">
      {/* Simple grid heat map */}
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-1">
        {topics.slice(0, 20).map((topic, i) => (
          <div
            key={i}
            className={clsx(
              'aspect-square rounded-sm transition-all hover:scale-110 cursor-pointer',
              getHeatColor(topic.accuracy)
            )}
            title={`${topic.topic || topic.id}: ${topic.accuracy ?? 0}% (${topic.questions} Q)`}
          />
        ))}
        {/* Fill empty slots */}
        {Array.from({ length: Math.max(0, 20 - topics.length) }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className="aspect-square rounded-sm bg-slate-100"
            title="Not yet attempted"
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-slate-200" />
          <span>Not tried</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-error-500" />
          <span>&lt;50%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-warning-500" />
          <span>50-75%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-success-500" />
          <span>&gt;75%</span>
        </div>
      </div>
    </div>
  );
};

// Exam Readiness Gauge
const ReadinessGauge: React.FC<{ readiness: ReadinessData, examDate: string | Date | undefined }> = ({ readiness, examDate }) => {
  const daysUntilExam = examDate ? differenceInDays(new Date(examDate), new Date()) : null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
        return 'text-success-600';
      case 'almost':
        return 'text-warning-600';
      default:
        return 'text-error-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ready':
        return 'Exam Ready!';
      case 'almost':
        return 'Almost There';
      default:
        return 'Keep Studying';
    }
  };

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
            className="text-slate-100"
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
        <div className="flex items-center justify-center gap-1 mt-2 text-sm text-slate-500">
          <Calendar className="w-4 h-4" />
          <span>{daysUntilExam} days until exam</span>
        </div>
      )}

      {/* Breakdown */}
      <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
        <div className="bg-slate-50 rounded-lg p-2">
          <div className="font-medium text-slate-900">{readiness.breakdown.accuracy}%</div>
          <div className="text-slate-500">Accuracy</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-2">
          <div className="font-medium text-slate-900">{readiness.breakdown.coverage}%</div>
          <div className="text-slate-500">Coverage</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-2">
          <div className="font-medium text-slate-900">{readiness.breakdown.volume}%</div>
          <div className="text-slate-500">Volume</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-2">
          <div className="font-medium text-slate-900">{readiness.breakdown.consistency}%</div>
          <div className="text-slate-500">Lessons</div>
        </div>
      </div>
    </div>
  );
};

const Progress: React.FC = () => {
  const { user, userProfile } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentStreak, getTopicPerformance, getLessonProgress } = useStudy() as any;
  const [timeRange, setTimeRange] = useState('week');
  const [weeklyActivity, setWeeklyActivity] = useState<WeeklyActivity[]>([]);
  const [topicPerformance, setTopicPerformance] = useState<TopicStat[]>([]);
  const [overallStats, setOverallStats] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    lessonsCompleted: 0,
    totalLessons: 0,
    studyMinutes: 0,
    accuracy: 0,
  });
  const [loading, setLoading] = useState(true);

  // Study Plan
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const examDate = (userProfile?.examDate as any)?.toDate?.() || new Date(userProfile?.examDate || Date.now());
  const studyPlan = userProfile?.examSection ? generateStudyPlan(userProfile.examSection, examDate) : null;

  const currentSection = (userProfile?.examSection || 'REG') as ExamSection;
  const sectionInfo = CPA_SECTIONS[currentSection];

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

        const dailyData = await Promise.all(
          days.map(async (date) => {
            const dateKey = format(date, 'yyyy-MM-dd');
            const logRef = doc(db, 'users', user.uid, 'daily_log', dateKey);
            const logSnap = await getDoc(logRef);

            if (logSnap.exists()) {
              const data = logSnap.data();
              return {
                date,
                points: data.earnedPoints || 0,
                goal: data.goalPoints || userProfile?.dailyGoal || 50,
                questions: data.questionsAttempted || 0,
                correct: data.questionsCorrect || 0,
                minutes: data.studyTimeMinutes || 0,
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

        // Calculate totals
        const totals = dailyData.reduce(
          (acc, day) => ({
            totalQuestions: acc.totalQuestions + day.questions,
            correctAnswers: acc.correctAnswers + day.correct,
            studyMinutes: acc.studyMinutes + day.minutes,
          }),
          { totalQuestions: 0, correctAnswers: 0, studyMinutes: 0 }
        );

        // Get topic performance
        let topicsData: TopicStat[] = [];
        if (getTopicPerformance) {
            topicsData = await getTopicPerformance();
        }
        setTopicPerformance(topicsData);

        // Get lesson progress
        let lessonsCompletedCount = 0;
        if (getLessonProgress) {
          const lessonProgress = await getLessonProgress();
          lessonsCompletedCount = Object.keys(lessonProgress).length;
        }

        // Get total lessons for user's section
        const allLessons = await fetchAllLessons();
        const sectionLessons = allLessons.filter(l => l.section === currentSection);
        const totalLessonsCount = sectionLessons.length || allLessons.length;

        setOverallStats({
          ...totals,
          accuracy: totals.totalQuestions > 0 ? Math.round((totals.correctAnswers / totals.totalQuestions) * 100) : 0,
          lessonsCompleted: lessonsCompletedCount,
          totalLessons: totalLessonsCount,
        });

      } catch (error) {
        console.error('Error loading progress:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProgressData();
  }, [user?.uid, userProfile?.dailyGoal, getTopicPerformance, getLessonProgress, currentSection]);

  const readiness = calculateExamReadiness(
    overallStats,
    topicPerformance,
    overallStats.lessonsCompleted,
    overallStats.totalLessons
  );

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
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-xl w-48 mb-2 animate-pulse" />
            <div className="h-5 bg-slate-100 dark:bg-slate-600 rounded-lg w-64 animate-pulse" />
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
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
  const hasAnyProgress = stats.totalQuestions > 0 || lessonsCompleted > 0;
  
  if (!hasAnyProgress) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
        <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">My Progress</h1>
            <p className="text-slate-600 dark:text-slate-400">Track your journey to CPA success</p>
          </div>
        </div>
        
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Start Your CPA Journey
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
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
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">My Progress</h1>
          <p className="text-slate-600 dark:text-slate-400">Track your journey to CPA success</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
      {/* Study Plan Overview (New Feature) */}
      {studyPlan && (
        <div className="card p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Target className="w-6 h-6 text-primary-400" />
                Study Plan: {sectionInfo.name}
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Target Date: {format(studyPlan.examDate, 'MMMM d, yyyy')} • {studyPlan.totalDays} days remaining
              </p>
            </div>
            <div className="text-right hidden sm:block">
              <div className="text-3xl font-bold text-primary-400">{studyPlan.modulesPerDay}</div>
              <div className="text-xs text-slate-400">Modules / Day</div>
            </div>
          </div>
          
          {/* Milestones Progress Bar */}
          <div className="relative pt-6 pb-2">
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-500 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(100, Math.max(5, (1 - studyPlan.totalDays/90)*100))}%` }} 
              />
            </div>
            <div className="mt-4 flex justify-between text-xs text-slate-400">
              {studyPlan.milestones.map((m, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-slate-600 mb-2 ring-4 ring-slate-900" />
                  <span className="font-medium text-slate-300">{m.label}</span>
                  <span>{m.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Stats Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 mb-2">
                  <Target className="w-4 h-4" />
                  <span className="text-sm font-medium">Accuracy</span>
                </div>
                <div className="text-2xl font-bold text-slate-900">{overallStats.accuracy}%</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 mb-2">
                  <HelpCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Questions</span>
                </div>
                <div className="text-2xl font-bold text-slate-900">{overallStats.totalQuestions}</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">Study Time</span>
                </div>
                <div className="text-2xl font-bold text-slate-900">{Math.round(overallStats.studyMinutes / 60)}h</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 mb-2">
                  <Flame className="w-4 h-4" />
                  <span className="text-sm font-medium">Streak</span>
                </div>
                <div className="text-2xl font-bold text-slate-900">{currentStreak || 0}</div>
              </div>
            </div>

            {/* Activity Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary-600" />
                  Weekly Activity
                </h2>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="bg-slate-50 border-none rounded-lg text-sm font-medium text-slate-600 focus:ring-0 cursor-pointer"
                >
                  <option value="week">Past 7 Days</option>
                  <option value="month">Past 30 Days</option>
                </select>
              </div>

              <div className="h-64 flex items-end justify-between gap-2">
                {weeklyActivity.map((day, i) => {
                  const height = Math.min(100, (day.points / day.goal) * 100);
                  const isToday = format(day.date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="w-full relative h-full flex items-end">
                        <div
                          className={clsx(
                            'w-full rounded-t-lg transition-all duration-500 min-h-[4px]',
                            day.points >= day.goal
                              ? 'bg-success-500'
                              : isToday
                                ? 'bg-primary-500'
                                : 'bg-primary-200 group-hover:bg-primary-300'
                          )}
                          style={{ height: `${height}%` }}
                        />
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                          <div className="font-bold">{day.points} pts</div>
                          <div>{day.questions} Qs</div>
                        </div>
                      </div>
                      <div className="text-xs text-slate-400 font-medium">
                        {format(day.date, 'EEE')}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Topic Performance */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary-600" />
                  {sectionInfo?.name || 'Exam'} Proficiency
                </h2>
                <div className="text-sm font-medium text-slate-500">
                  {topicPerformance.length}/{((EXAM_BLUEPRINTS as Record<string, any>)[currentSection]?.areas || []).reduce((acc: number, area: any) => acc + (area.groups?.reduce((g: number, grp: any) => g + (grp.topics?.length || 0), 0) || 0), 0) || 15} Topics
                </div>
              </div>
              
              <TopicHeatMap topics={topicPerformance} section={currentSection} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Exam Readiness */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
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
            <div className="bg-gradient-to-br from-primary-600 to-indigo-700 p-6 rounded-2xl text-white shadow-lg">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;

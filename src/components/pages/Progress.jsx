import { useState, useEffect } from 'react';
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
  Trophy,
  ChevronRight,
  Zap,
  AlertCircle,
  Award,
  Calendar,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useStudy } from '../../hooks/useStudy';
import { CPA_SECTIONS, EXAM_BLUEPRINTS, EXAM_RULES } from '../../config/examConfig';
import { doc, getDoc, collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { format, subDays, eachDayOfInterval, differenceInDays } from 'date-fns';
import clsx from 'clsx';

// Exam Readiness Calculator
const calculateExamReadiness = (stats, topicPerformance, lessonsCompleted, totalLessons) => {
  // Weights for different factors
  const weights = {
    accuracy: 0.35, // Overall accuracy
    coverage: 0.25, // Topics covered
    volume: 0.2, // Questions attempted
    consistency: 0.2, // Lesson progress
  };

  // Calculate scores (0-100)
  const accuracyScore = Math.min(100, stats.accuracy * 1.25); // 80% = 100 score
  const coverageScore = Math.min(100, (Object.keys(topicPerformance).length / 15) * 100);
  const volumeScore = Math.min(100, (stats.totalQuestions / 500) * 100);
  const consistencyScore = (lessonsCompleted / totalLessons) * 100;

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
const TopicHeatMap = ({ topics, section }) => {
  const blueprint = EXAM_BLUEPRINTS?.[section] || [];

  // Group topics by content area
  const groupedTopics = blueprint.map((area) => ({
    name: area.name,
    weight: area.weight,
    topics: topics.filter(
      (t) =>
        t.id?.toLowerCase().includes(area.name.toLowerCase().split(' ')[0]) ||
        t.topic?.toLowerCase().includes(area.name.toLowerCase().split(' ')[0])
    ),
  }));

  const getHeatColor = (accuracy) => {
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
const ReadinessGauge = ({ readiness, examDate }) => {
  const daysUntilExam = examDate ? differenceInDays(new Date(examDate), new Date()) : null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'ready':
        return 'text-success-600';
      case 'almost':
        return 'text-warning-600';
      default:
        return 'text-error-600';
    }
  };

  const getStatusText = (status) => {
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

const Progress = () => {
  const { user, userProfile } = useAuth();
  const { currentStreak, todayLog, getTopicPerformance } = useStudy();
  const [timeRange, setTimeRange] = useState('week');
  const [weeklyActivity, setWeeklyActivity] = useState([]);
  const [topicPerformance, setTopicPerformance] = useState([]);
  const [overallStats, setOverallStats] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    lessonsCompleted: 0,
    totalLessons: 42,
    studyMinutes: 0,
    accuracy: 0,
  });
  const [loading, setLoading] = useState(true);

  const currentSection = userProfile?.examSection || 'REG';
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
        const topicsData = await getTopicPerformance();
        const topicsList = Object.entries(topicsData || {})
          .map(([id, data]) => ({
            id,
            topic: data.name || id,
            accuracy: data.attempted > 0 ? Math.round((data.correct / data.attempted) * 100) : 0,
            questions: data.attempted || 0,
          }))
          .filter((t) => t.questions > 0)
          .sort((a, b) => b.questions - a.questions)
          .slice(0, 6);
        setTopicPerformance(topicsList);

        // Get overall stats
        const statsRef = doc(db, 'users', user.uid, 'progress', 'stats');
        const statsSnap = await getDoc(statsRef);
        const savedStats = statsSnap.exists() ? statsSnap.data() : {};

        // Get lessons completed
        const lessonsRef = doc(db, 'users', user.uid, 'progress', 'lessons');
        const lessonsSnap = await getDoc(lessonsRef);
        const lessonsData = lessonsSnap.exists() ? lessonsSnap.data() : {};
        const lessonsCompleted = Object.values(lessonsData).filter(
          (l) => l.status === 'completed'
        ).length;

        setOverallStats({
          totalQuestions: savedStats.totalQuestions || totals.totalQuestions,
          correctAnswers: savedStats.totalCorrect || totals.correctAnswers,
          lessonsCompleted,
          totalLessons: 42,
          studyMinutes: totals.studyMinutes,
          accuracy:
            totals.totalQuestions > 0
              ? Math.round((totals.correctAnswers / totals.totalQuestions) * 100)
              : 0,
        });
      } catch (error) {
        console.error('Error loading progress:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProgressData();
  }, [user?.uid, userProfile?.dailyGoal, getTopicPerformance]);

  // Calculate exam readiness
  const examReadiness = calculateExamReadiness(
    overallStats,
    topicPerformance,
    overallStats.lessonsCompleted,
    overallStats.totalLessons
  );

  // Identify weak areas
  const weakAreas = topicPerformance.filter((t) => t.accuracy < 75 && t.questions >= 5).slice(0, 3);

  const studyHours = Math.round(overallStats.studyMinutes / 60);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6 pb-24 page-enter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Your Progress</h1>
          <p className="text-slate-600 mt-1">
            Track your journey to passing {sectionInfo?.shortName}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
          {['week', 'month', 'all'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={clsx(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                timeRange === range
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              )}
            >
              {range === 'week' ? 'Week' : range === 'month' ? 'Month' : 'All Time'}
            </button>
          ))}
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-warning-100 rounded-xl flex items-center justify-center">
              <Flame className="w-5 h-5 text-warning-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{currentStreak}</div>
              <div className="text-sm text-slate-500">Day Streak</div>
            </div>
          </div>
          <div className="mt-2 text-xs text-slate-400">Best: {currentStreak} days</div>
        </div>

        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{overallStats.totalQuestions}</div>
              <div className="text-sm text-slate-500">Questions</div>
            </div>
          </div>
          <div className="mt-2 text-xs text-slate-400">{overallStats.correctAnswers} correct</div>
        </div>

        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-success-100 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-success-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{overallStats.accuracy}%</div>
              <div className="text-sm text-slate-500">Accuracy</div>
            </div>
          </div>
          <div className="mt-2 text-xs text-slate-400">Target: 80%+</div>
        </div>

        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{studyHours}h</div>
              <div className="text-sm text-slate-500">Study Time</div>
            </div>
          </div>
          <div className="mt-2 text-xs text-slate-400">This week</div>
        </div>
      </div>

      {/* CPA Exam Info Banner - 30-Month Rule */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-4 border border-primary-200">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold text-primary-900">CPA Exam Passing Window</div>
              <div className="text-lg font-bold text-primary-700">{EXAM_RULES.passingWindowMonths} Months</div>
            </div>
          </div>
          <div className="flex-1 text-sm text-primary-700">
            <p>
              You have <span className="font-semibold">{EXAM_RULES.passingWindowMonths} months</span> from the date you pass your first section to pass all {EXAM_RULES.sectionsRequired} sections 
              (3 Core + 1 Discipline). This rolling window was extended from 18 months in 2024.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-primary-600 bg-primary-200/50 px-3 py-1.5 rounded-full whitespace-nowrap">
            <CheckCircle className="w-4 h-4" />
            Passing Score: {EXAM_RULES.passingScore}
          </div>
        </div>
      </div>

      {/* Exam Readiness & Heat Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Exam Readiness Gauge */}
        <div className="card">
          <div className="card-header flex items-center gap-2">
            <Award className="w-5 h-5 text-primary-600" />
            <h2 className="font-semibold text-slate-900">Exam Readiness</h2>
          </div>
          <div className="card-body">
            <ReadinessGauge
              readiness={examReadiness}
              examDate={userProfile?.examDate?.toDate?.() || userProfile?.examDate}
            />
          </div>
        </div>

        {/* Topic Heat Map */}
        <div className="card">
          <div className="card-header flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary-600" />
            <h2 className="font-semibold text-slate-900">Topic Mastery Map</h2>
          </div>
          <div className="card-body">
            {topicPerformance.length > 0 ? (
              <TopicHeatMap topics={topicPerformance} section={currentSection} />
            ) : (
              <div className="text-center py-8 text-slate-500">
                <Target className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p>Practice questions to see your topic mastery</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="card">
        <div className="card-header">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary-600" />
            <h2 className="font-semibold text-slate-900">Weekly Activity</h2>
          </div>
        </div>
        <div className="card-body">
          <div className="flex items-end justify-between gap-2 h-40">
            {weeklyActivity.map((day, index) => {
              const maxPoints = Math.max(...weeklyActivity.map((d) => d.points), day.goal);
              const heightPercent = maxPoints > 0 ? (day.points / maxPoints) * 100 : 0;
              const isToday = index === weeklyActivity.length - 1;
              const metGoal = day.points >= day.goal;

              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center justify-end h-32">
                    <div
                      className={clsx(
                        'w-full max-w-8 rounded-t-lg transition-all',
                        day.points === 0
                          ? 'bg-slate-200'
                          : metGoal
                            ? 'bg-success-500'
                            : 'bg-primary-400',
                        isToday && day.points > 0 && 'ring-2 ring-primary-300 ring-offset-2'
                      )}
                      style={{ height: `${Math.max(heightPercent, 4)}%` }}
                    />
                  </div>
                  <div className="text-xs text-slate-500">{format(day.date, 'EEE')}</div>
                  <div
                    className={clsx(
                      'text-xs font-medium',
                      metGoal
                        ? 'text-success-600'
                        : day.points > 0
                          ? 'text-slate-600'
                          : 'text-slate-400'
                    )}
                  >
                    {day.questions}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success-500 rounded" />
              <span className="text-sm text-slate-600">Goal met</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary-400 rounded" />
              <span className="text-sm text-slate-600">Below goal</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Topic Performance */}
        <div className="card">
          <div className="card-header">
            <h2 className="font-semibold text-slate-900">Topic Performance</h2>
          </div>
          <div className="card-body">
            {topicPerformance.length > 0 ? (
              <div className="space-y-4">
                {topicPerformance.map((topic, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700 truncate">
                        {topic.topic}
                      </span>
                      <span
                        className={clsx(
                          'text-sm font-semibold',
                          topic.accuracy >= 80
                            ? 'text-success-600'
                            : topic.accuracy >= 70
                              ? 'text-warning-600'
                              : 'text-error-600'
                        )}
                      >
                        {topic.accuracy}%
                      </span>
                    </div>
                    <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={clsx(
                          'h-full rounded-full transition-all',
                          topic.accuracy >= 80
                            ? 'bg-success-500'
                            : topic.accuracy >= 70
                              ? 'bg-warning-500'
                              : 'bg-error-500'
                        )}
                        style={{ width: `${topic.accuracy}%` }}
                      />
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      {topic.questions} questions attempted
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <HelpCircle className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p>Start practicing to see topic performance</p>
              </div>
            )}
          </div>
        </div>

        {/* Section Progress */}
        <div className="card">
          <div className="card-header">
            <h2 className="font-semibold text-slate-900">Section Progress</h2>
          </div>
          <div className="card-body">
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl"
                style={{ backgroundColor: sectionInfo?.color }}
              >
                {sectionInfo?.shortName}
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">
                  {Math.round((overallStats.lessonsCompleted / overallStats.totalLessons) * 100)}%
                </div>
                <div className="text-sm text-slate-500">Overall Progress</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-slate-600">Lessons</span>
                  <span className="font-medium text-slate-900">
                    {overallStats.lessonsCompleted} / {overallStats.totalLessons}
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-500 rounded-full"
                    style={{
                      width: `${(overallStats.lessonsCompleted / overallStats.totalLessons) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-slate-600">Questions Practiced</span>
                  <span className="font-medium text-slate-900">{overallStats.totalQuestions}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-success-500 rounded-full"
                    style={{
                      width: `${Math.min(100, (overallStats.totalQuestions / 500) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Areas to Improve */}
      {weakAreas.length > 0 && (
        <div className="card border-warning-200">
          <div className="card-header flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-warning-600" />
              <h2 className="font-semibold text-slate-900">Areas to Improve</h2>
            </div>
            <Link
              to="/practice?mode=weak"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
            >
              Practice These <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              {weakAreas.map((area, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-warning-50 rounded-xl"
                >
                  <div>
                    <div className="font-medium text-slate-900">{area.topic}</div>
                    <div className="text-sm text-slate-500">{area.questions} questions</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-warning-600">{area.accuracy}%</div>
                    <div className="text-xs text-slate-500">accuracy</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Achievements Link */}
      <Link to="/achievements" className="card block hover:shadow-md transition-shadow">
        <div className="card-body flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-warning-100 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-warning-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Achievements</h3>
              <p className="text-sm text-slate-500">Track your milestones and badges</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </div>
      </Link>
    </div>
  );
};

export default Progress;

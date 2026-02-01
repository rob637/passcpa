import { useState, useEffect } from 'react';
import logger from '../../utils/logger';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  ChevronRight,
  Calendar,
  Zap,
  Trophy,
  Clock,
  Play,
  Sparkles,
  CheckCircle2,
  FileSpreadsheet,
  Brain,
  Flame,
  TrendingUp,
  LucideIcon,
  Target,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useStudy } from '../../hooks/useStudy';
import { useCourse } from '../../providers/CourseProvider';
import { CPA_SECTIONS } from '../../config/examConfig';
import { differenceInDays, format } from 'date-fns';
import clsx from 'clsx';
import { isFeatureEnabled } from '../../config/featureFlags';
import { calculateExamReadiness, getStatusText, getStatusColor, getStatusBgColor, ReadinessData, TopicStat } from '../../utils/examReadiness';
import { fetchAllLessons } from '../../services/lessonService';

// Circular Progress Ring
interface ProgressRingProps {
  progress?: number;
  size?: number;
  strokeWidth?: number;
}

const ProgressRing = ({ progress = 0, size = 120, strokeWidth = 8 }: ProgressRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  const isComplete = progress >= 100;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90" aria-hidden="true">
        {/* Background circle */}
        <circle
          className="text-slate-100 dark:text-slate-700"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          className={clsx(
            'transition-all duration-1000 ease-out',
            isComplete ? 'text-success-500' : 'text-primary-500'
          )}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />
      </svg>
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {isComplete ? (
          <CheckCircle2 className="w-10 h-10 text-success-500 animate-bounce-soft" />
        ) : (
          <>
            <span className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              {Math.round(progress)}%
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">complete</span>
          </>
        )}
      </div>
    </div>
  );
};

// Quick Action Button
interface QuickActionProps {
  to: string;
  icon: LucideIcon;
  label: string;
  sublabel: string;
  color?: 'primary' | 'success' | 'warning';
  dataTour?: string;
}

const QuickAction = ({ to, icon: Icon, label, sublabel, color = 'primary', dataTour }: QuickActionProps) => {
  const colors = {
    primary: 'bg-primary-50 text-primary-600 group-hover:bg-primary-100',
    success: 'bg-success-50 text-success-600 group-hover:bg-success-100',
    warning: 'bg-warning-50 text-warning-600 group-hover:bg-warning-100',
  };

  return (
    <Link
      to={to}
      className="group card-interactive p-4 flex items-center gap-4"
      data-tour={dataTour}
    >
      <div
        className={clsx(
          'w-12 h-12 rounded-xl flex items-center justify-center transition-colors',
          colors[color]
        )}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-900 dark:text-slate-100">{label}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{sublabel}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
    </Link>
  );
};

// Stat Card
interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  trend?: number;
  color?: 'slate' | 'primary' | 'success' | 'warning';
}

// Exam Readiness Widget Component
interface ReadinessWidgetProps {
  readiness: ReadinessData | null;
  daysUntilExam: number | null;
  loading: boolean;
}

const ReadinessWidget = ({ readiness, daysUntilExam, loading }: ReadinessWidgetProps) => {
  if (loading) {
    return (
      <div className="card p-5 mb-6 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full" />
          <div className="flex-1">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-24 mb-2" />
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-32" />
          </div>
        </div>
      </div>
    );
  }

  if (!readiness) {
    return (
      <Link to="/practice" className={clsx(
        'card p-5 mb-6 border-2 flex items-center gap-4 hover:shadow-soft-lg transition-all',
        'bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700'
      )}>
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
          <Target className="w-8 h-8 text-slate-400" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Exam Readiness</p>
          <p className="text-lg font-bold text-slate-900 dark:text-slate-100">Start practicing to see your score</p>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-400" />
      </Link>
    );
  }

  const circumference = 2 * Math.PI * 28; // radius = 28
  const offset = circumference - (readiness.overall / 100) * circumference;

  return (
    <Link 
      to="/study" 
      className={clsx(
        'card p-5 mb-6 border-2 flex items-center gap-4 hover:shadow-soft-lg transition-all',
        getStatusBgColor(readiness.status)
      )}
    >
      {/* Circular Progress */}
      <div className="relative w-16 h-16 flex-shrink-0">
        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-slate-200 dark:text-slate-600"
          />
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            className={getStatusColor(readiness.status)}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={clsx('text-lg font-bold', getStatusColor(readiness.status))}>
            {readiness.overall}%
          </span>
        </div>
      </div>

      {/* Status Text */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Exam Readiness</p>
        <p className={clsx('text-lg font-bold', getStatusColor(readiness.status))}>
          {getStatusText(readiness.status)}
        </p>
        {daysUntilExam !== null && daysUntilExam > 0 && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {daysUntilExam} days until exam
          </p>
        )}
      </div>

      {/* View Details Arrow */}
      <div className="flex flex-col items-center">
        <ChevronRight className="w-5 h-5 text-slate-400" />
        <span className="text-xs text-slate-400 hidden sm:block">Details</span>
      </div>
    </Link>
  );
};

const StatCard = ({ icon: Icon, value, label, trend, color = 'slate' }: StatCardProps) => {
  const colors = {
    slate: 'bg-slate-100 text-slate-600',
    primary: 'bg-primary-100 text-primary-600',
    success: 'bg-success-100 text-success-600',
    warning: 'bg-warning-100 text-warning-600',
  };

  return (
    <div className="card p-4">
      <div
        className={clsx(
          'w-10 h-10 rounded-xl flex items-center justify-center mb-3',
          colors[color]
        )}
      >
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      {trend !== undefined && (
        <p
          className={clsx(
            'text-xs font-medium mt-2',
            trend > 0 ? 'text-success-600' : 'text-error-600'
          )}
        >
          {trend > 0 ? '+' : ''}
          {trend}% from last week
        </p>
      )}
    </div>
  );
};

const Dashboard = () => {
  const { user, userProfile } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { todayLog, currentStreak, dailyProgress, dailyGoalMet, weeklyStats, getTopicPerformance, getLessonProgress } = useStudy() as any;
  const { courseId } = useCourse();

  // Exam Readiness State
  const [readiness, setReadiness] = useState<ReadinessData | null>(null);
  const [readinessLoading, setReadinessLoading] = useState(true);

  const examSection = userProfile?.examSection ? CPA_SECTIONS[userProfile.examSection as keyof typeof CPA_SECTIONS] : null;
  const rawExamDate = userProfile?.examDate;
  const examDate = rawExamDate && typeof (rawExamDate as { toDate?: () => Date }).toDate === 'function' 
    ? (rawExamDate as { toDate: () => Date }).toDate() 
    : rawExamDate;
  const daysUntilExam = examDate ? differenceInDays(new Date(examDate as Date), new Date()) : null;
  const currentSection = userProfile?.examSection || 'REG';

  // Fetch Exam Readiness Data
  useEffect(() => {
    if (!user?.uid || !userProfile?.onboardingComplete) {
      setReadinessLoading(false);
      return;
    }

    const loadReadinessData = async () => {
      try {
        // Get topic performance
        let topicsData: TopicStat[] = [];
        if (getTopicPerformance) {
          topicsData = await getTopicPerformance();
        }

        // Get lesson progress
        let lessonsCompletedCount = 0;
        if (getLessonProgress) {
          const lessonProgress = await getLessonProgress();
          lessonsCompletedCount = Object.keys(lessonProgress).length;
        }

        // Get total lessons for user's section
        const allLessons = await fetchAllLessons(courseId);
        const sectionLessons = allLessons.filter((l: { section: string }) => l.section === currentSection);
        const totalLessonsCount = sectionLessons.length || allLessons.length;

        // Calculate readiness from weekly stats
        const stats = {
          totalQuestions: weeklyStats?.totalQuestions || 0,
          accuracy: weeklyStats?.accuracy || 0,
        };

        // Only show readiness if user has some activity
        if (stats.totalQuestions > 0 || lessonsCompletedCount > 0) {
          const readinessData = calculateExamReadiness(
            stats,
            topicsData,
            lessonsCompletedCount,
            totalLessonsCount
          );
          setReadiness(readinessData);
        } else {
          setReadiness(null);
        }
      } catch (error) {
        logger.error('Error loading readiness:', error);
      } finally {
        setReadinessLoading(false);
      }
    };

    loadReadinessData();
  }, [user?.uid, userProfile?.onboardingComplete, getTopicPerformance, getLessonProgress, weeklyStats, courseId, currentSection]);

  // Calculate motivational metrics
  const pointsToGoal = todayLog ? Math.max(0, (todayLog.goalPoints || 50) - (todayLog.earnedPoints || 0)) : 50;
  const questionsToGoal = Math.ceil(pointsToGoal / 2); // Avg 2 points per question
  const isAlmostThere = !dailyGoalMet && dailyProgress >= 70;
  
  // Streak milestones
  const streakMilestones = [7, 14, 30, 60, 90];
  const nextStreakMilestone = streakMilestones.find(m => m > currentStreak) || 100;
  const isStreakMilestone = streakMilestones.includes(currentStreak);

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const firstName = userProfile?.displayName?.split(' ')[0] || 'there';

  // Onboarding check
  if (!userProfile?.onboardingComplete) {
    return (
      <div className="p-4 sm:p-6 max-w-lg mx-auto page-enter">
        <div className="card-elevated p-8 text-center">
          <div className="w-20 h-20 bg-primary-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            Welcome to VoraPrep
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            Let's personalize your study experience. This takes less than a minute.
          </p>
          <Link to="/onboarding" className="btn-primary w-full">
            Get Started
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto page-enter">
      {/* Greeting Section */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {getGreeting()}, {firstName}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          {format(new Date(), 'EEEE, MMMM d')}
        </p>
      </div>

      {/* Focus Area - Section Badge (moved to top) */}
      {examSection && (
        <Link to="/study" className="card p-4 flex items-center gap-4 mb-6 hover:shadow-soft-lg transition-shadow">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shadow-soft"
            style={{ backgroundColor: examSection.color }}
          >
            {examSection.shortName}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-slate-900 dark:text-slate-100">{examSection.name}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Tap to view study modules</p>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </Link>
      )}

      {/* Exam Countdown - Only if set */}
      {examDate && daysUntilExam !== null && daysUntilExam > 0 && (
        <div
          className={clsx(
            'card mb-6 p-4 flex items-center gap-4',
            daysUntilExam <= 7
              ? 'bg-error-50 border-error-100'
              : daysUntilExam <= 30
                ? 'bg-warning-50 border-warning-100'
                : 'bg-primary-50 border-primary-100'
          )}
        >
          <div
            className={clsx(
              'w-12 h-12 rounded-xl flex items-center justify-center',
              daysUntilExam <= 7
                ? 'bg-error-100'
                : daysUntilExam <= 30
                  ? 'bg-warning-100'
                  : 'bg-primary-100'
            )}
          >
            <Calendar
              className={clsx(
                'w-6 h-6',
                daysUntilExam <= 7
                  ? 'text-error-600'
                  : daysUntilExam <= 30
                    ? 'text-warning-600'
                    : 'text-primary-600'
              )}
            />
          </div>
          <div className="flex-1">
            <p className="text-sm text-slate-600">{examSection?.shortName || 'CPA Exam'} in</p>
            <p
              className={clsx(
                'text-xl font-bold',
                daysUntilExam <= 7
                  ? 'text-error-700'
                  : daysUntilExam <= 30
                    ? 'text-warning-700'
                    : 'text-primary-700'
              )}
            >
              {daysUntilExam} days
            </p>
          </div>
          <Link to="/progress" className="btn-sm btn-ghost">
            View Plan
          </Link>
        </div>
      )}

      {/* Exam Readiness Widget */}
      <ReadinessWidget 
        readiness={readiness} 
        daysUntilExam={daysUntilExam} 
        loading={readinessLoading} 
      />

      {/* Daily Progress Card */}
      <div className="card-elevated mb-6 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-semibold text-slate-900 dark:text-slate-100">Today's Progress</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {dailyGoalMet 
                ? 'Goal achieved! 🎉' 
                : isAlmostThere 
                  ? `Almost there! Just ${questionsToGoal} more question${questionsToGoal === 1 ? '' : 's'}! 💪`
                  : "Keep going, you're doing great!"}
            </p>
          </div>
          {currentStreak > 0 && (
            <div className="streak-badge relative">
              <Flame className="w-4 h-4 streak-flame" />
              <span>{currentStreak}</span>
              {isStreakMilestone && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping" />
              )}
            </div>
          )}
        </div>

        {/* Streak Milestone Celebration */}
        {isStreakMilestone && currentStreak > 0 && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-3 mb-4 text-center">
            <p className="text-sm font-medium text-yellow-800">
              🏆 Amazing! {currentStreak}-day streak milestone reached!
            </p>
          </div>
        )}

        {/* Next milestone hint */}
        {currentStreak > 0 && !isStreakMilestone && currentStreak >= nextStreakMilestone - 3 && (
          <div className="bg-slate-50 rounded-xl p-3 mb-4 text-center">
            <p className="text-xs text-slate-600">
              🔥 {nextStreakMilestone - currentStreak} day{nextStreakMilestone - currentStreak === 1 ? '' : 's'} until your {nextStreakMilestone}-day streak badge!
            </p>
          </div>
        )}

        <div className="flex items-center justify-center mb-6">
          <ProgressRing progress={dailyProgress} size={140} strokeWidth={10} />
        </div>

        {/* Today's stats - show what contributed to progress */}
        <div className="grid grid-cols-4 gap-3 text-center">
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {todayLog?.questionsAttempted || 0}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">MCQs</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {todayLog?.lessonsCompleted || 0}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Lessons</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {todayLog?.simulationsCompleted || 0}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">TBS</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {Math.round(todayLog?.studyTimeMinutes || 0)}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Minutes</p>
          </div>
        </div>
        
        {/* Points breakdown - subtle hint explaining the percentage */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Today's Points</span>
            <span className="font-medium">{todayLog?.earnedPoints || 0} / {todayLog?.goalPoints || 50} pts</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Quick Start</h2>
        <div className="space-y-3">
          <QuickAction
            to="/practice"
            icon={Play}
            label="Practice Questions"
            sublabel="10 MCQs • ~15 min"
            color="primary"
          />
          {isFeatureEnabled('tbs') && (
            <QuickAction
              to="/tbs"
              icon={FileSpreadsheet}
              label="Task-Based Simulations"
              sublabel="Real exam TBS practice"
              color="success"
            />
          )}
          <QuickAction
            to="/study"
            icon={BookOpen}
            label="Study Session"
            sublabel="Review weak areas"
            color="warning"
          />
          {isFeatureEnabled('aiTutor') && (
            <QuickAction
              to="/ai-tutor"
              icon={Brain}
              label="Ask Vory"
              sublabel="Your AI study companion"
              color="primary"
              dataTour="ai-tutor"
            />
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-6">
        <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">This Week</h2>
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={Zap}
            value={weeklyStats?.totalQuestions || 0}
            label="Questions"
            color="primary"
            trend={weeklyStats?.questionsTrend}
          />
          <StatCard
            icon={Trophy}
            value={`${weeklyStats?.accuracy || 0}%`}
            label="Accuracy"
            color="success"
            trend={weeklyStats?.accuracyTrend}
          />
          <StatCard
            icon={Clock}
            value={`${Math.round((weeklyStats?.totalMinutes || 0) / 60)}h`}
            label="Study Time"
            color="slate"
          />
          <StatCard icon={TrendingUp} value={currentStreak} label="Day Streak" color="warning" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

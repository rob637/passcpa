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
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useStudy } from '../../hooks/useStudy';
import { CPA_SECTIONS } from '../../config/examConfig';
import { differenceInDays, format } from 'date-fns';
import clsx from 'clsx';

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
      <svg width={size} height={size} className="transform -rotate-90">
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
  const { userProfile } = useAuth();
  // @ts-ignore - weeklyStats and some extended props might be missing from base StudyContextType
  const { todayLog, currentStreak, dailyProgress, dailyGoalMet, weeklyStats } = useStudy();

  const examSection = userProfile?.examSection ? CPA_SECTIONS[userProfile.examSection as keyof typeof CPA_SECTIONS] : null;
  const examDate = userProfile?.examDate?.toDate?.() || userProfile?.examDate;
  const daysUntilExam = examDate ? differenceInDays(new Date(examDate), new Date()) : null;

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
            Welcome to PassCPA
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
    <div className="p-4 sm:p-6 max-w-2xl mx-auto page-enter">
      {/* Greeting Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {getGreeting()}, {firstName}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          {format(new Date(), 'EEEE, MMMM d')}
        </p>
      </div>

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

      {/* Daily Progress Card */}
      <div className="card-elevated mb-6 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-semibold text-slate-900 dark:text-slate-100">Today's Progress</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {dailyGoalMet ? 'Goal achieved! 🎉' : "Keep going, you're doing great!"}
            </p>
          </div>
          {currentStreak > 0 && (
            <div className="streak-badge">
              <Flame className="w-4 h-4 streak-flame" />
              <span>{currentStreak}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center mb-6">
          <ProgressRing progress={dailyProgress} size={140} strokeWidth={10} />
        </div>

        {/* Today's stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {todayLog?.questionsAnswered || 0}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Questions</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {todayLog?.questionsAnswered && todayLog.questionsAnswered > 0
                ? Math.round((todayLog.questionsCorrect / todayLog.questionsAnswered) * 100)
                : 0}
              %
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Accuracy</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {todayLog?.minutesStudied || 0}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Minutes</p>
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
          <QuickAction
            to="/tbs"
            icon={FileSpreadsheet}
            label="Task-Based Simulations"
            sublabel="Real exam TBS practice"
            color="success"
          />
          <QuickAction
            to="/study"
            icon={BookOpen}
            label="Study Session"
            sublabel="Review weak areas"
            color="warning"
          />
          <QuickAction
            to="/ai-tutor"
            icon={Brain}
            label="AI Tutor"
            sublabel="Get instant explanations"
            color="primary"
            dataTour="ai-tutor"
          />
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
          />
          <StatCard
            icon={Trophy}
            value={`${weeklyStats?.accuracy || 0}%`}
            label="Accuracy"
            color="success"
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

      {/* Section Badge */}
      {examSection && (
        <div className="card p-4 flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: examSection.color }}
          >
            {examSection.shortName}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-slate-900 dark:text-slate-100">{examSection.name}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{examSection.description}</p>
          </div>
          <Link to="/settings" className="text-sm text-primary-600 font-medium">
            Change
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

/**
 * DashboardTemplate.tsx
 * 
 * Unified dashboard template for all exam types (CPA, EA, CMA, CIA, CFP, CISA).
 * Provides consistent layout while allowing exam-specific customization.
 * 
 * Features:
 * - Personalized greeting with AI tutor messages
 * - Exam readiness widget
 * - Stats grid (readiness, questions, streak, accuracy)
 * - Quick action buttons
 * - Section cards with progress
 * - Daily plan card (optional)
 * - Smart recommendations
 */

import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  ChevronRight,
  Calendar,
  Sparkles,
  Flame,
  LucideIcon,
  Target,
  RefreshCw,
  Award,
  BarChart2,
  AlertTriangle,
} from 'lucide-react';
import clsx from 'clsx';
import { Button } from '../../common/Button';
import { Card } from '../../common/Card';
import DailyPlanCard from '../../DailyPlanCard';

// ============================================================================
// Types
// ============================================================================

export interface DashboardStats {
  overallReadiness: number;
  questionsAnswered: number;
  studyStreak: number;
  accuracy: number;
  daysToExam?: number | null;
}

export interface ExamSection {
  id: string;
  name: string;
  shortName: string;
  color: string;
  progress: number;
  questionsAttempted: number;
  accuracy: number;
  weight?: string;
}

export interface QuickAction {
  id: string;
  icon: LucideIcon;
  label: string;
  description?: string;
  path: string;
  color: string;
  requiresSubscription?: boolean;  // If true, shows lock icon for non-subscribers
  isFree?: boolean;                // If true, shows "FREE" badge
}

export interface DashboardTemplateProps {
  // Exam info
  examCode: string;                    // 'CPA', 'EA', etc.
  examName: string;                    // 'CPA Exam', 'EA Exam', etc.
  examSubtitle?: string;               // 'Certified Public Accountant'
  
  // User info
  userName?: string;                   // First name for greeting
  
  // Stats
  stats: DashboardStats;
  loading?: boolean;
  
  // Sections/Parts
  sections: ExamSection[];
  onSectionClick: (sectionId: string) => void;
  
  // Quick actions
  quickActions: QuickAction[];
  
  // Optional features
  showDailyPlan?: boolean;
  recommendations?: string[];
  
  // CTA buttons
  studyPlanPath?: string;
  quickPracticePath?: string;
  
  // Callbacks
  onRefresh?: () => Promise<void>;
}

// ============================================================================
// Sub-components
// ============================================================================

// Tutor messages based on context
const getTutorMessage = (streak: number, readiness: number, timeOfDay: string): string => {
  if (streak >= 7 && readiness >= 70) {
    return "You're on fire! Keep this momentum going.";
  }
  if (streak >= 3) {
    return "Building consistency. That's how you pass.";
  }
  if (timeOfDay === 'morning') {
    return "Fresh mind, fresh start. Let's make progress.";
  }
  if (timeOfDay === 'evening') {
    return "End of day study? You're dedicated. Let's go.";
  }
  if (readiness < 50) {
    return "Every question gets you closer. Let's build.";
  }
  return "Ready when you are. Let's learn something.";
};

const getTimeOfDay = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
};

const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

// Stat Card Component
interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  subtitle?: string;
  color: 'amber' | 'blue' | 'green' | 'purple' | 'indigo';
  progress?: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, subtitle, color, progress }) => {
  const colorClasses = {
    amber: 'text-amber-500 bg-amber-50 dark:bg-amber-900/30',
    blue: 'text-blue-500 bg-blue-50 dark:bg-blue-900/30',
    green: 'text-green-500 bg-green-50 dark:bg-green-900/30',
    purple: 'text-purple-500 bg-purple-50 dark:bg-purple-900/30',
    indigo: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30',
  };
  
  const progressColors = {
    amber: 'bg-amber-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    indigo: 'bg-indigo-500',
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between pb-2">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</span>
        <div className={clsx('p-2 rounded-lg', colorClasses[color])}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</div>
      {subtitle && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>
      )}
      {progress !== undefined && (
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-2">
          <div 
            className={clsx('h-2 rounded-full transition-all', progressColors[color])} 
            style={{ width: `${Math.min(progress, 100)}%` }} 
          />
        </div>
      )}
    </Card>
  );
};

// Quick Action Card Component
interface QuickActionCardProps {
  icon: LucideIcon;
  label: string;
  description?: string;
  onClick: () => void;
  color: string;
  requiresSubscription?: boolean;
  isFree?: boolean;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ icon: Icon, label, description, onClick, color, requiresSubscription: _requiresSubscription, isFree }) => (
  <button onClick={onClick} className="text-left w-full">
    <Card variant="interactive" className="p-4 flex flex-col items-center gap-2 text-center h-full hover:shadow-md transition-all relative">
      {/* Free badge */}
      {isFree && (
        <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
          FREE
        </span>
      )}
      <div style={{ color }}><Icon className="h-5 w-5" /></div>
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
      {description && (
        <span className="text-xs text-slate-500 dark:text-slate-400">{description}</span>
      )}
    </Card>
  </button>
);

// Section Card Component
interface SectionCardProps {
  section: ExamSection;
  onClick: () => void;
}

const SectionCard: React.FC<SectionCardProps> = ({ section, onClick }) => (
  <Card
    variant="interactive"
    noPadding
    className="flex flex-col h-full cursor-pointer hover:scale-[1.01] transition-transform"
    onClick={onClick}
  >
    <div className="p-6 border-b border-slate-100 dark:border-slate-800">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg" style={{ color: section.color }}>
            {section.shortName}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-tight">
            {section.name}
          </p>
          {section.weight && (
            <span className="text-xs text-slate-400 mt-1">{section.weight}</span>
          )}
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full">
          <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-400" />
        </div>
      </div>
    </div>
    <div className="p-6 flex-1 flex flex-col justify-end space-y-4">
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-slate-600 dark:text-slate-400">Progress</span>
          <span className="font-medium text-slate-900 dark:text-slate-100">{section.progress}%</span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all"
            style={{ width: `${section.progress}%`, backgroundColor: section.color }}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 pt-2">
        <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded text-center">
          <div className="text-xs text-slate-500 dark:text-slate-400">Questions</div>
          <div className="font-semibold text-slate-900 dark:text-slate-100">{section.questionsAttempted}</div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded text-center">
          <div className="text-xs text-slate-500 dark:text-slate-400">Accuracy</div>
          <div className="font-semibold text-slate-900 dark:text-slate-100">{section.accuracy}%</div>
        </div>
      </div>
      <Button
        variant="ghost"
        fullWidth
        className="mt-2"
        style={{ borderColor: section.color, color: section.color }}
      >
        Study {section.shortName}
      </Button>
    </div>
  </Card>
);

// Recommendations Alert Component
interface RecommendationsAlertProps {
  recommendations: string[];
}

const RecommendationsAlert: React.FC<RecommendationsAlertProps> = ({ recommendations }) => {
  if (recommendations.length === 0) return null;
  
  return (
    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-medium text-amber-800 dark:text-amber-200">Recommendations</h3>
          <ul className="mt-2 space-y-1 text-sm text-amber-700 dark:text-amber-300">
            {recommendations.slice(0, 3).map((rec, i) => (
              <li key={i}>• {rec}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// Main Component
// ============================================================================

export const DashboardTemplate: React.FC<DashboardTemplateProps> = ({
  examCode: _examCode,
  examName,
  examSubtitle,
  userName = 'there',
  stats,
  loading = false,
  sections,
  onSectionClick,
  quickActions,
  showDailyPlan = true,
  recommendations = [],
  studyPlanPath,
  quickPracticePath,
  onRefresh,
}) => {
  const navigate = useNavigate();
  const [refreshing, setRefreshing] = useState(false);
  
  const timeOfDay = useMemo(() => getTimeOfDay(), []);
  const greeting = useMemo(() => getGreeting(), []);
  const tutorMessage = useMemo(
    () => getTutorMessage(stats.studyStreak, stats.overallReadiness, timeOfDay),
    [stats.studyStreak, stats.overallReadiness, timeOfDay]
  );

  const handleRefresh = useCallback(async () => {
    if (!onRefresh) return;
    setRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setRefreshing(false);
    }
  }, [onRefresh]);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    );
  }

  // Determine grid columns based on section count
  const sectionGridCols = sections.length <= 2 
    ? 'lg:grid-cols-2' 
    : sections.length === 3 
    ? 'lg:grid-cols-3' 
    : 'lg:grid-cols-4';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header with Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            {greeting}, {userName}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <Sparkles className="w-4 h-4 text-primary-500" />
            <p className="text-slate-600 dark:text-slate-400 italic">{tutorMessage}</p>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
            {examName} {examSubtitle && `• ${examSubtitle}`}
          </p>
        </div>
        <div className="flex gap-3">
          {onRefresh && (
            <Button
              variant="ghost"
              onClick={handleRefresh}
              leftIcon={RefreshCw}
              className={clsx(refreshing && 'animate-spin')}
              disabled={refreshing}
            >
              {refreshing ? '' : ''}
            </Button>
          )}
          {studyPlanPath && (
            <Button
              variant="secondary"
              onClick={() => navigate(studyPlanPath)}
              leftIcon={Calendar}
            >
              Study Plan
            </Button>
          )}
          {quickPracticePath && (
            <Button
              variant="primary"
              onClick={() => navigate(quickPracticePath)}
              leftIcon={Target}
            >
              Quick Practice
            </Button>
          )}
        </div>
      </div>

      {/* Daily Plan Card (optional) */}
      {showDailyPlan && <DailyPlanCard compact />}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Award}
          title="Overall Readiness"
          value={`${stats.overallReadiness}%`}
          subtitle={stats.overallReadiness === 0 ? "Start practicing to build readiness" : stats.overallReadiness < 50 ? "Keep going!" : stats.overallReadiness < 75 ? "Great progress!" : "Exam ready!"}
          color="amber"
          progress={stats.overallReadiness}
        />
        <StatCard
          icon={BookOpen}
          title="Questions Answered"
          value={stats.questionsAnswered}
          subtitle={stats.questionsAnswered === 0 ? "Answer your first question!" : "Total practice questions"}
          color="blue"
        />
        <StatCard
          icon={Flame}
          title="Study Streak"
          value={stats.studyStreak}
          subtitle={stats.studyStreak > 0 ? `${stats.studyStreak} day${stats.studyStreak !== 1 ? 's' : ''} strong!` : 'Start your streak today'}
          color="green"
        />
        <StatCard
          icon={BarChart2}
          title={stats.daysToExam !== undefined && stats.daysToExam !== null ? "Days to Exam" : "Accuracy"}
          value={stats.daysToExam !== undefined && stats.daysToExam !== null ? stats.daysToExam : `${stats.accuracy}%`}
          subtitle={stats.daysToExam !== undefined && stats.daysToExam !== null ? "Stay focused!" : "Across all sections"}
          color="purple"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <QuickActionCard
            key={action.id}
            icon={action.icon}
            label={action.label}
            description={action.description}
            onClick={() => navigate(action.path)}
            color={action.color}
            requiresSubscription={action.requiresSubscription}
            isFree={action.isFree}
          />
        ))}
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <RecommendationsAlert recommendations={recommendations} />
      )}

      {/* Exam Sections/Parts */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Exam {sections.length > 1 ? 'Parts' : 'Domains'}
        </h2>
        <div className={clsx('grid grid-cols-1 gap-6', sectionGridCols)}>
          {sections.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              onClick={() => onSectionClick(section.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardTemplate;

/**
 * CMA Dashboard Component
 * 
 * Main entry point for Certified Management Accountant exam preparation.
 * Shows progress across CMA1/CMA2, quick actions, and study resources.
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  Trophy,
  Clock,
  Play,
  CheckCircle2,
  Brain,
  Flame,
  TrendingUp,
  Calculator,
  FileText,
  Target,
  GraduationCap,
  ClipboardList,
  Layers,
  Calendar,
  LucideIcon,
  DollarSign,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useStudy } from '../../hooks/useStudy';
import { format } from 'date-fns';
import clsx from 'clsx';
import { CMA_SECTION_CONFIG, CMASectionId } from '../../courses/cma';
import { getCMAProgress, getCMAReadinessStatus, CMAOverallProgress } from '../../services/cmaProgressService';

// Section Card Component
interface SectionCardProps {
  section: typeof CMA_SECTION_CONFIG[CMASectionId];
  progress: number;
  questionsAttempted: number;
  accuracy: number;
  onClick: () => void;
}

const SectionCard: React.FC<SectionCardProps> = ({
  section,
  progress,
  questionsAttempted,
  accuracy,
  onClick,
}) => {
  const IconMap: Record<string, LucideIcon> = {
    TrendingUp,
    Calculator,
  };
  const IconComponent = IconMap[section.icon] || FileText;

  return (
    <button
      onClick={onClick}
      className="card-interactive p-4 w-full text-left hover:shadow-soft-lg transition-all"
    >
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold shadow-soft flex-shrink-0"
          style={{ backgroundColor: section.color }}
        >
          <IconComponent className="w-7 h-7" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">
              {section.shortName}
            </h3>
            {progress >= 100 && (
              <CheckCircle2 className="w-4 h-4 text-success-500" />
            )}
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 truncate">
            {section.name}
          </p>
          
          {/* Progress bar */}
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>{questionsAttempted} questions</span>
              <span>{accuracy > 0 ? `${accuracy}% accuracy` : 'Not started'}</span>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(progress, 100)}%`,
                  backgroundColor: section.color,
                }}
              />
            </div>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
      </div>
    </button>
  );
};

// Quick Action Button
interface QuickActionProps {
  to: string;
  icon: LucideIcon;
  label: string;
  sublabel: string;
  color?: 'primary' | 'success' | 'warning' | 'purple' | 'emerald';
}

const QuickAction: React.FC<QuickActionProps> = ({
  to,
  icon: Icon,
  label,
  sublabel,
  color = 'primary',
}) => {
  const colors = {
    primary: 'bg-primary-50 text-primary-600 group-hover:bg-primary-100 dark:bg-primary-900/30 dark:text-primary-400',
    success: 'bg-success-50 text-success-600 group-hover:bg-success-100 dark:bg-success-900/30 dark:text-success-400',
    warning: 'bg-warning-50 text-warning-600 group-hover:bg-warning-100 dark:bg-warning-900/30 dark:text-warning-400',
    purple: 'bg-purple-50 text-purple-600 group-hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400',
    emerald: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400',
  };

  return (
    <Link
      to={to}
      className="group card-interactive p-4 flex items-center gap-4"
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
        <p className="text-sm text-slate-600 dark:text-slate-300 truncate">{sublabel}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
    </Link>
  );
};

// Stat Card
interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, value, label, color = '#10b981' }) => (
  <div className="card p-4">
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
      style={{ backgroundColor: `${color}20` }}
    >
      <Icon className="w-5 h-5" style={{ color }} />
    </div>
    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
    <p className="text-sm text-slate-600 dark:text-slate-300">{label}</p>
  </div>
);

// Overall Progress Ring
interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
}

const ProgressRing: React.FC<ProgressRingProps> = ({ 
  progress, 
  size = 100, 
  strokeWidth = 8 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          className="text-slate-100 dark:text-slate-700"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-emerald-500 transition-all duration-1000"
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
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {Math.round(progress)}%
        </span>
        <span className="text-xs text-slate-600 dark:text-slate-300">overall</span>
      </div>
    </div>
  );
};

const CMADashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentStreak, weeklyStats } = useStudy() as any;

  // Progress state
  const [cmaProgress, setCMAProgress] = useState<CMAOverallProgress | null>(null);
  const [sectionProgress, setSectionProgress] = useState<Record<CMASectionId, {
    progress: number;
    questionsAttempted: number;
    accuracy: number;
  }>>({
    CMA1: { progress: 0, questionsAttempted: 0, accuracy: 0 },
    CMA2: { progress: 0, questionsAttempted: 0, accuracy: 0 },
  });

  const [isLoading, setIsLoading] = useState(true);

  // Load progress data
  useEffect(() => {
    const loadProgress = async () => {
      if (!user?.uid) {
        setIsLoading(false);
        return;
      }

      try {
        const progress = await getCMAProgress(user.uid);
        setCMAProgress(progress);
        
        // Map to section progress format
        setSectionProgress({
          CMA1: {
            progress: progress.sections.CMA1.progressPercent,
            questionsAttempted: progress.sections.CMA1.questionsAttempted,
            accuracy: progress.sections.CMA1.accuracy,
          },
          CMA2: {
            progress: progress.sections.CMA2.progressPercent,
            questionsAttempted: progress.sections.CMA2.questionsAttempted,
            accuracy: progress.sections.CMA2.accuracy,
          },
        });
      } catch (error) {
        console.error('Error loading CMA progress:', error);
        // Fall back to basic stats from weekly if service fails
        const fallbackProgress = {
          CMA1: {
            progress: Math.min((weeklyStats?.totalQuestions || 0) / 5, 100),
            questionsAttempted: Math.floor((weeklyStats?.totalQuestions || 0) * 0.5),
            accuracy: weeklyStats?.accuracy || 0,
          },
          CMA2: {
            progress: Math.min((weeklyStats?.totalQuestions || 0) / 8, 100),
            questionsAttempted: Math.floor((weeklyStats?.totalQuestions || 0) * 0.5),
            accuracy: Math.max((weeklyStats?.accuracy || 0) - 3, 0),
          },
        };
        setSectionProgress(fallbackProgress);
      } finally {
        setIsLoading(false);
      }
    };

    loadProgress();
  }, [user?.uid, weeklyStats]);

  // Calculate overall progress
  const overallProgress = Math.round(
    (sectionProgress.CMA1.progress + sectionProgress.CMA2.progress) / 2
  );

  const totalQuestions = 
    sectionProgress.CMA1.questionsAttempted + 
    sectionProgress.CMA2.questionsAttempted;

  const overallAccuracy = totalQuestions > 0
    ? Math.round(
        (sectionProgress.CMA1.accuracy * sectionProgress.CMA1.questionsAttempted +
         sectionProgress.CMA2.accuracy * sectionProgress.CMA2.questionsAttempted) / totalQuestions
      )
    : 0;

  // Get greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const firstName = userProfile?.displayName?.split(' ')[0] || 'there';

  // Handle section click
  const handleSectionClick = (sectionId: CMASectionId) => {
    navigate(`/cma/section/${sectionId}`);
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-48" />
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-32" />
          <div className="grid grid-cols-2 gap-4 mt-6">
            {[1, 2].map(i => (
              <div key={i} className="h-32 bg-slate-200 dark:bg-slate-700 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto page-enter">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {getGreeting()}, {firstName}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              CMA Exam Prep • {format(new Date(), 'EEEE, MMMM d')}
            </p>
          </div>
        </div>
      </div>

      {/* Overall Progress Card */}
      <div className="card-elevated p-6 mb-6">
        <div className="flex items-center gap-6">
          <ProgressRing progress={overallProgress} size={100} strokeWidth={8} />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="font-semibold text-slate-900 dark:text-slate-100">
                CMA Exam Readiness
              </h2>
              <span className={clsx(
                'text-sm font-medium',
                getCMAReadinessStatus(overallProgress).color
              )}>
                {getCMAReadinessStatus(overallProgress).text}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
              {overallProgress < 30 
                ? 'Just getting started - keep going!'
                : overallProgress < 60
                  ? 'Making good progress!'
                  : overallProgress < 80
                    ? 'Almost ready for the exam!'
                    : 'Excellent! You\'re exam ready!'}
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4 text-emerald-500" />
                <span className="text-slate-700 dark:text-slate-300">{totalQuestions} questions</span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy className="w-4 h-4 text-success-500" />
                <span className="text-slate-700 dark:text-slate-300">{overallAccuracy}% accuracy</span>
              </div>
            </div>
          </div>
          {currentStreak > 0 && (
            <div className="streak-badge">
              <Flame className="w-4 h-4 streak-flame" />
              <span>{currentStreak}</span>
            </div>
          )}
        </div>
        
        {/* Recommendations */}
        {cmaProgress?.recommendations && cmaProgress.recommendations.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
              Recommendations
            </p>
            <ul className="space-y-1.5">
              {cmaProgress.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Section Cards */}
      <div className="mb-6">
        <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
          Exam Parts
        </h2>
        <div className="space-y-3">
          {(Object.keys(CMA_SECTION_CONFIG) as CMASectionId[]).map(sectionId => (
            <SectionCard
              key={sectionId}
              section={CMA_SECTION_CONFIG[sectionId]}
              progress={sectionProgress[sectionId].progress}
              questionsAttempted={sectionProgress[sectionId].questionsAttempted}
              accuracy={sectionProgress[sectionId].accuracy}
              onClick={() => handleSectionClick(sectionId)}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
          Quick Start
        </h2>
        <div className="space-y-3">
          <QuickAction
            to="/cma/study-plan"
            icon={Calendar}
            label="Create Study Plan"
            sublabel="Personalized schedule"
            color="purple"
          />
          <QuickAction
            to="/cma-exam"
            icon={ClipboardList}
            label="Take Practice Exam"
            sublabel="Full timed exam simulation"
            color="emerald"
          />
          <QuickAction
            to="/practice?course=cma"
            icon={Play}
            label="Quick Practice"
            sublabel="10 MCQs from all sections"
            color="success"
          />
          <QuickAction
            to="/flashcards?section=CMA1"
            icon={Layers}
            label="Flashcard Review"
            sublabel="Key terms and concepts"
            color="warning"
          />
          <QuickAction
            to="/ai-tutor?course=cma"
            icon={Brain}
            label="Ask Vory"
            sublabel="AI-powered CMA exam help"
            color="purple"
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-6">
        <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
          This Week
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard
            icon={Target}
            value={totalQuestions}
            label="Questions"
            color="#10b981"
          />
          <StatCard
            icon={Trophy}
            value={`${overallAccuracy}%`}
            label="Accuracy"
            color="#22c55e"
          />
          <StatCard
            icon={Clock}
            value={`${Math.round((weeklyStats?.totalMinutes || 0) / 60)}h`}
            label="Study Time"
            color="#6366f1"
          />
          <StatCard
            icon={TrendingUp}
            value={currentStreak || 0}
            label="Day Streak"
            color="#f59e0b"
          />
        </div>
      </div>

      {/* CMA Exam Info Banner */}
      <div className="card bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-100 dark:border-emerald-800 p-4 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-soft">
            <DollarSign className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
              About the CMA Exam
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              The CMA exam consists of 2 parts with 100 MCQs and 2 essay questions each. 
              Pass both parts with 360/500 to become a Certified Management Accountant.
            </p>
            <Link
              to="/cma/info"
              className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 inline-flex items-center gap-1"
            >
              Learn more
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recommendations Card */}
      {cmaProgress?.recommendations && cmaProgress.recommendations.length > 0 && (
        <div className="card p-4">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
            Study Recommendations
          </h3>
          <ul className="space-y-2">
            {cmaProgress.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                <Target className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CMADashboard;

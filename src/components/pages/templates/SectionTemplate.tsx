/**
 * SectionTemplate.tsx
 * 
 * Unified section/learn page template for all exam types (CPA, EA, CMA, CIA, CFP, CISA).
 * Displays blueprint areas with expandable topics and practice actions.
 * 
 * Features:
 * - Section header with icon, description, and stats
 * - Blueprint areas with expandable topic lists
 * - Progress tracking per area
 * - Quick action buttons (Practice All, Mini Exam, Lessons, Flashcards)
 * - Study tips
 */

import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Play,
  CheckCircle2,
  Clock,
  Trophy,
  Layers,
  Brain,
  ClipboardList,
  LucideIcon,
  Target,
} from 'lucide-react';
import clsx from 'clsx';

// ============================================================================
// Types
// ============================================================================

export interface BlueprintArea {
  id: string;
  name: string;
  weight: string;
  topics: string[];
  progress?: number;
  accuracy?: number;
}

export interface SectionStats {
  examLength?: number;          // Hours
  questionCount?: number;
  totalProgress: number;
  avgAccuracy: number;
}

export interface QuickAction {
  id: string;
  icon: LucideIcon;
  label: string;
  description: string;
  path: string;
  color: string;
}

export interface SectionTemplateProps {
  // Exam info
  examCode: string;             // 'cpa', 'ea', etc.
  examDisplayCode: string;      // 'CPA', 'EA', etc.
  
  // Section info
  sectionId: string;            // 'FAR', 'SEE1', etc.
  sectionName: string;          // 'Financial Accounting and Reporting'
  shortName: string;            // 'FAR', 'SEE1
  description: string;
  color: string;
  icon?: LucideIcon;
  
  // Stats
  stats: SectionStats;
  
  // Blueprint areas
  blueprintAreas: BlueprintArea[];
  
  // Actions
  quickActions?: QuickAction[];
  
  // Paths
  backPath: string;             // Path to go back to (e.g., '/cpa', '/ea')
  backLabel: string;            // 'Back to CPA Dashboard'
  onAreaPractice: (areaId: string) => void;
  
  // Optional
  studyTip?: string;
  loading?: boolean;
}

// ============================================================================
// Sub-components
// ============================================================================

// Blueprint Area Card Component
interface BlueprintAreaCardProps {
  area: BlueprintArea;
  onPractice: () => void;
}

const BlueprintAreaCard: React.FC<BlueprintAreaCardProps> = ({ area, onPractice }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const progress = area.progress ?? 0;
  const accuracy = area.accuracy ?? 0;

  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                {area.name}
              </h3>
              {progress >= 100 && (
                <CheckCircle2 className="w-4 h-4 text-success-500 flex-shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-4 mt-1 text-sm text-slate-600 dark:text-slate-300">
              <span>Weight: {area.weight}</span>
              {accuracy > 0 && <span>{accuracy}% accuracy</span>}
            </div>
          </div>
          <ChevronRight
            className={clsx(
              'w-5 h-5 text-slate-400 transition-transform',
              isExpanded && 'rotate-90'
            )}
          />
        </div>

        {/* Progress bar */}
        <div className="mt-3">
          <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      </button>

      {/* Expanded topics */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-0 border-t border-slate-100 dark:border-slate-700">
          <div className="pt-3">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
              Topics Covered
            </p>
            <ul className="space-y-1.5 mb-4">
              {area.topics.map((topic, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                  {topic}
                </li>
              ))}
            </ul>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPractice();
              }}
              className="btn-sm btn-primary w-full"
            >
              <Play className="w-4 h-4 mr-1" />
              Practice This Area
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Quick Action Card Component
interface QuickActionCardProps {
  icon: LucideIcon;
  label: string;
  description: string;
  onClick: () => void;
  color: string;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  icon: Icon,
  label,
  description,
  onClick,
  color,
}) => (
  <button
    onClick={onClick}
    className="card-interactive p-4 text-left hover:shadow-soft-lg transition-all"
  >
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
      style={{ backgroundColor: `${color}20` }}
    >
      <Icon className="w-5 h-5" style={{ color }} />
    </div>
    <h4 className="font-semibold text-slate-900 dark:text-slate-100">{label}</h4>
    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{description}</p>
  </button>
);

// Stat Badge Component
interface StatBadgeProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
}

const StatBadge: React.FC<StatBadgeProps> = ({ icon: Icon, value, label }) => (
  <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 rounded-lg px-3 py-2">
    <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
    <span className="font-semibold text-slate-900 dark:text-slate-100">{value}</span>
    <span className="text-sm text-slate-600 dark:text-slate-300">{label}</span>
  </div>
);

// ============================================================================
// Default Quick Actions Generator
// ============================================================================

export const getDefaultQuickActions = (
  examCode: string,
  sectionId: string,
  sectionColor: string,
  shortName: string
): QuickAction[] => [
  {
    id: 'practice',
    icon: Play,
    label: 'Practice All',
    description: `All ${shortName} questions`,
    path: `/practice?course=${examCode}&section=${sectionId}`,
    color: sectionColor,
  },
  {
    id: 'mini-exam',
    icon: ClipboardList,
    label: 'Mini Exam',
    description: '25 questions, timed',
    path: `/${examCode}-exam?section=${sectionId}&mode=mini`,
    color: '#22c55e',
  },
  {
    id: 'lessons',
    icon: BookOpen,
    label: 'Lessons',
    description: `${shortName} study materials`,
    path: `/lessons?course=${examCode}&section=${sectionId}`,
    color: '#6366f1',
  },
  {
    id: 'flashcards',
    icon: Layers,
    label: 'Flashcards',
    description: 'Key terms review',
    path: `/${examCode}/flashcards?section=${sectionId}`,
    color: '#f59e0b',
  },
];

// ============================================================================
// Main Component
// ============================================================================

export const SectionTemplate: React.FC<SectionTemplateProps> = ({
  examCode,
  examDisplayCode: _examDisplayCode,
  sectionId,
  sectionName,
  shortName,
  description,
  color,
  icon: SectionIcon = Target,
  stats,
  blueprintAreas,
  quickActions,
  backPath,
  backLabel,
  onAreaPractice,
  studyTip,
  loading = false,
}) => {
  const navigate = useNavigate();

  // Generate default quick actions if not provided
  const actions = useMemo(() => {
    if (quickActions && quickActions.length > 0) return quickActions;
    return getDefaultQuickActions(examCode, sectionId, color, shortName);
  }, [quickActions, examCode, sectionId, color, shortName]);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto page-enter">
      {/* Back navigation */}
      <Link
        to={backPath}
        className="inline-flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300 hover:text-primary-600 mb-4"
      >
        <ChevronLeft className="w-4 h-4" />
        {backLabel}
      </Link>

      {/* Section Header */}
      <div className="card-elevated p-6 mb-6">
        <div className="flex items-start gap-4">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center text-white shadow-soft flex-shrink-0"
            style={{ backgroundColor: color }}
          >
            <SectionIcon className="w-8 h-8" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">
              {sectionName}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">
              {description}
            </p>
            <div className="flex flex-wrap gap-2">
              {stats.examLength && (
                <StatBadge icon={Clock} value={`${stats.examLength}h`} label="exam" />
              )}
              {stats.questionCount && (
                <StatBadge icon={ClipboardList} value={stats.questionCount} label="MCQs" />
              )}
              <StatBadge icon={Trophy} value={`${stats.avgAccuracy}%`} label="accuracy" />
            </div>
          </div>
        </div>

        {/* Overall progress */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-slate-600 dark:text-slate-300">Section Progress</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">{stats.totalProgress}%</span>
          </div>
          <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${stats.totalProgress}%`, backgroundColor: color }}
            />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {actions.map((action) => (
          <QuickActionCard
            key={action.id}
            icon={action.icon}
            label={action.label}
            description={action.description}
            onClick={() => navigate(action.path)}
            color={action.color}
          />
        ))}
      </div>

      {/* Blueprint Areas */}
      <div className="mb-6">
        <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
          Blueprint Areas
        </h2>
        <div className="space-y-3">
          {blueprintAreas.map((area) => (
            <BlueprintAreaCard
              key={area.id}
              area={area}
              onPractice={() => onAreaPractice(area.id)}
            />
          ))}
        </div>
      </div>

      {/* Study Tips */}
      {studyTip && (
        <div className="card bg-slate-50 dark:bg-slate-800/50 p-4">
          <div className="flex items-start gap-3">
            <Brain className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-1">
                Study Tip
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {studyTip}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionTemplate;

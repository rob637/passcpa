/**
 * EA Section Page Component
 * 
 * Section-specific view for SEE1, SEE2, or SEE3.
 * Shows lessons, practice questions, and progress for the selected section.
 */

import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Play,
  CheckCircle2,
  Clock,
  Trophy,
  FileText,
  Layers,
  Brain,
  ClipboardList,
  LucideIcon,
  User,
  Building2,
  Scale,
} from 'lucide-react';
import clsx from 'clsx';
import { EA_SECTION_CONFIG, EASectionId } from '../../courses/ea';

// Blueprint Area Card
interface BlueprintAreaCardProps {
  id: string;
  name: string;
  weight: string;
  topics: string[];
  progress: number;
  accuracy: number;
  onPractice: () => void;
}

const BlueprintAreaCard: React.FC<BlueprintAreaCardProps> = ({
  name,
  weight,
  topics,
  progress,
  accuracy,
  onPractice,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
                {name}
              </h3>
              {progress >= 100 && (
                <CheckCircle2 className="w-4 h-4 text-success-500 flex-shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-4 mt-1 text-sm text-slate-600 dark:text-slate-300">
              <span>Weight: {weight}</span>
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
              {topics.map((topic, idx) => (
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

// Quick Action Card
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

// Stat Badge
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

const EASection: React.FC = () => {
  const { sectionId } = useParams<{ sectionId: string }>();
  const navigate = useNavigate();

  // Validate section ID
  const section = useMemo(() => {
    if (!sectionId || !['SEE1', 'SEE2', 'SEE3'].includes(sectionId)) {
      return null;
    }
    return EA_SECTION_CONFIG[sectionId as EASectionId];
  }, [sectionId]);

  // Mock blueprint areas data (would come from actual EA course data)
  const blueprintAreas = useMemo(() => {
    if (!sectionId) return [];
    
    // This would be fetched from EA_COURSE config
    const areas: Record<string, { id: string; name: string; weight: string; topics: string[] }[]> = {
      SEE1: [
        { id: 'SEE1-1', name: 'Preliminary Work and Taxpayer Data', weight: '15-25%', topics: ['Filing requirements', 'Filing status', 'Exemptions and dependents', 'Taxpayer identification numbers'] },
        { id: 'SEE1-2', name: 'Income and Assets', weight: '25-35%', topics: ['Wages and salaries', 'Interest and dividends', 'Business income (Schedule C)', 'Capital gains and losses', 'Rental income', 'Retirement income'] },
        { id: 'SEE1-3', name: 'Deductions and Credits', weight: '25-35%', topics: ['Adjustments to income', 'Standard vs itemized deductions', 'Nonrefundable credits', 'Refundable credits'] },
        { id: 'SEE1-4', name: 'Taxation and Advice', weight: '15-20%', topics: ['Tax computations', 'Alternative minimum tax', 'Self-employment tax', 'Tax planning strategies'] },
        { id: 'SEE1-5', name: 'Specialized Returns', weight: '5-10%', topics: ['Amended returns', 'Foreign income', 'Expatriation'] },
      ],
      SEE2: [
        { id: 'SEE2-1', name: 'Business Entities', weight: '20-30%', topics: ['Sole proprietorships', 'Partnerships', 'C Corporations', 'S Corporations', 'LLCs'] },
        { id: 'SEE2-2', name: 'Business Financial Information', weight: '25-35%', topics: ['Accounting methods', 'Business income', 'Cost of goods sold', 'Business expenses'] },
        { id: 'SEE2-3', name: 'Specialized Business Entities', weight: '20-30%', topics: ['Farming', 'Trusts and estates', 'Tax-exempt organizations'] },
        { id: 'SEE2-4', name: 'Business Tax Computations', weight: '15-25%', topics: ['Depreciation and amortization', 'Credits', 'Alternative minimum tax', 'Estimated taxes'] },
      ],
      SEE3: [
        { id: 'SEE3-1', name: 'Practices and Procedures', weight: '25-35%', topics: ['Power of attorney', 'Tax information authorization', 'Centralized Authorization File', 'Practitioner responsibilities'] },
        { id: 'SEE3-2', name: 'Representation Before the IRS', weight: '20-30%', topics: ['Who may practice', 'Circular 230 requirements', 'Conflicts of interest', 'Due diligence'] },
        { id: 'SEE3-3', name: 'Specific Types of Representation', weight: '15-25%', topics: ['Audits and examinations', 'Appeals', 'Collections', 'Offers in compromise'] },
        { id: 'SEE3-4', name: 'Completion of Filing Process', weight: '15-25%', topics: ['Amended returns', 'Claims for refund', 'Statute of limitations', 'Penalties and interest'] },
        { id: 'SEE3-5', name: 'Recordkeeping', weight: '5-10%', topics: ['Document retention', 'Client records', 'Electronic records'] },
      ],
    };
    
    return areas[sectionId] || [];
  }, [sectionId]);

  // Mock progress for blueprint areas
  const [areaProgress] = useState<Record<string, { progress: number; accuracy: number }>>(() => {
    const progress: Record<string, { progress: number; accuracy: number }> = {};
    blueprintAreas.forEach(area => {
      progress[area.id] = {
        progress: Math.floor(Math.random() * 60),
        accuracy: Math.floor(Math.random() * 30) + 60,
      };
    });
    return progress;
  });

  if (!section) {
    return (
      <div className="p-4 sm:p-6 max-w-4xl mx-auto text-center">
        <div className="card p-8">
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Section Not Found
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            The requested section doesn't exist.
          </p>
          <Link to="/ea" className="btn-primary">
            Back to EA Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const IconMap: Record<string, LucideIcon> = {
    User,
    Building2,
    Scale,
  };
  const SectionIcon = IconMap[section.icon] || FileText;

  // Calculate section stats
  const totalProgress = Math.round(
    Object.values(areaProgress).reduce((sum, p) => sum + p.progress, 0) / blueprintAreas.length
  );
  const avgAccuracy = Math.round(
    Object.values(areaProgress).reduce((sum, p) => sum + p.accuracy, 0) / blueprintAreas.length
  );

  const handlePracticeArea = (areaId: string) => {
    navigate(`/practice?course=ea&section=${sectionId}&area=${areaId}`);
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto page-enter">
      {/* Back navigation */}
      <Link
        to="/ea"
        className="inline-flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300 hover:text-primary-600 mb-4"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to EA Dashboard
      </Link>

      {/* Section Header */}
      <div className="card-elevated p-6 mb-6">
        <div className="flex items-start gap-4">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center text-white shadow-soft flex-shrink-0"
            style={{ backgroundColor: section.color }}
          >
            <SectionIcon className="w-8 h-8" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">
              {section.name}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">
              {section.description}
            </p>
            <div className="flex flex-wrap gap-2">
              <StatBadge icon={Clock} value={`${section.examLength}h`} label="exam" />
              <StatBadge icon={ClipboardList} value={section.questionCount} label="MCQs" />
              <StatBadge icon={Trophy} value={`${avgAccuracy}%`} label="accuracy" />
            </div>
          </div>
        </div>

        {/* Overall progress */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-slate-600 dark:text-slate-300">Section Progress</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">{totalProgress}%</span>
          </div>
          <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${totalProgress}%`, backgroundColor: section.color }}
            />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <QuickActionCard
          icon={Play}
          label="Practice All"
          description={`All ${section.shortName} questions`}
          onClick={() => navigate(`/practice?course=ea&section=${sectionId}`)}
          color={section.color}
        />
        <QuickActionCard
          icon={ClipboardList}
          label="Mini Exam"
          description="25 questions, timed"
          onClick={() => navigate(`/ea-exam?section=${sectionId}&mode=mini`)}
          color="#22c55e"
        />
        <QuickActionCard
          icon={BookOpen}
          label="Lessons"
          description={`${section.shortName} study materials`}
          onClick={() => navigate(`/lessons?course=ea&section=${sectionId}`)}
          color="#6366f1"
        />
        <QuickActionCard
          icon={Layers}
          label="Flashcards"
          description="Key terms review"
          onClick={() => navigate(`/flashcards?section=${sectionId}`)}
          color="#f59e0b"
        />
      </div>

      {/* Blueprint Areas */}
      <div className="mb-6">
        <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
          Blueprint Areas
        </h2>
        <div className="space-y-3">
          {blueprintAreas.map(area => (
            <BlueprintAreaCard
              key={area.id}
              id={area.id}
              name={area.name}
              weight={area.weight}
              topics={area.topics}
              progress={areaProgress[area.id]?.progress || 0}
              accuracy={areaProgress[area.id]?.accuracy || 0}
              onPractice={() => handlePracticeArea(area.id)}
            />
          ))}
        </div>
      </div>

      {/* Study Tips */}
      <div className="card bg-slate-50 dark:bg-slate-800/50 p-4">
        <div className="flex items-start gap-3">
          <Brain className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-1">
              Study Tip
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Focus on areas with higher weights (25-35%) first. These represent more questions on the actual exam 
              and will have the biggest impact on your score.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EASection;

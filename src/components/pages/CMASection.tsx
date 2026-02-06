/**
 * CMA Section Page Component
 * 
 * Section-specific view for CMA1 or CMA2.
 * Shows lessons, practice questions, and progress for the selected part.
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
  TrendingUp,
  Calculator,
} from 'lucide-react';
import clsx from 'clsx';
import { CMA_SECTION_CONFIG, CMASectionId } from '../../courses/cma';

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
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
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
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
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

const CMASection: React.FC = () => {
  const { sectionId } = useParams<{ sectionId: string }>();
  const navigate = useNavigate();

  // Validate section ID
  const section = useMemo(() => {
    if (!sectionId || !['CMA1', 'CMA2'].includes(sectionId)) {
      return null;
    }
    return CMA_SECTION_CONFIG[sectionId as CMASectionId];
  }, [sectionId]);

  // Blueprint areas based on CMA Course configuration
  const blueprintAreas = useMemo(() => {
    if (!sectionId) return [];
    
    const areas: Record<string, { id: string; name: string; weight: string; topics: string[] }[]> = {
      CMA1: [
        { 
          id: 'CMA1-A', 
          name: 'External Financial Reporting Decisions', 
          weight: '15%', 
          topics: [
            'Financial statements and footnotes',
            'Recognition, measurement, and valuation',
            'SEC filings and FASB updates',
            'Lease accounting and revenue recognition',
          ] 
        },
        { 
          id: 'CMA1-B', 
          name: 'Planning, Budgeting, and Forecasting', 
          weight: '20%', 
          topics: [
            'Strategic planning process',
            'Annual business plans',
            'Budgeting concepts and methodologies',
            'Forecasting techniques',
            'Pro forma financial statements',
          ] 
        },
        { 
          id: 'CMA1-C', 
          name: 'Performance Management', 
          weight: '20%', 
          topics: [
            'Cost and variance measures',
            'Responsibility centers (cost, revenue, profit, investment)',
            'Performance measures and KPIs',
            'Balanced Scorecard',
          ] 
        },
        { 
          id: 'CMA1-D', 
          name: 'Cost Management', 
          weight: '15%', 
          topics: [
            'Cost concepts and measurement',
            'Job order and process costing',
            'Activity-based costing (ABC)',
            'Overhead allocation',
            'Supply chain management',
          ] 
        },
        { 
          id: 'CMA1-E', 
          name: 'Internal Controls', 
          weight: '15%', 
          topics: [
            'Governance, risk, and compliance (GRC)',
            'Internal control frameworks (COSO)',
            'Internal audit function',
            'Systems controls and security',
          ] 
        },
        { 
          id: 'CMA1-F', 
          name: 'Technology and Analytics', 
          weight: '15%', 
          topics: [
            'Information systems architecture',
            'Data governance and quality',
            'Technology-enabled finance transformation',
            'Data analytics and visualization',
          ] 
        },
      ],
      CMA2: [
        { 
          id: 'CMA2-A', 
          name: 'Financial Statement Analysis', 
          weight: '20%', 
          topics: [
            'Basic financial statement analysis',
            'Financial ratios (liquidity, activity, solvency, profitability)',
            'Market value metrics',
            'Special issues in analysis',
          ] 
        },
        { 
          id: 'CMA2-B', 
          name: 'Corporate Finance', 
          weight: '20%', 
          topics: [
            'Risk and return concepts',
            'Capital structure decisions',
            'Cost of capital (WACC)',
            'Working capital management',
            'Raising capital and dividend policy',
            'Mergers and acquisitions',
          ] 
        },
        { 
          id: 'CMA2-C', 
          name: 'Decision Analysis', 
          weight: '25%', 
          topics: [
            'Cost-volume-profit (CVP) analysis',
            'Marginal and relevant cost analysis',
            'Make vs buy decisions',
            'Pricing strategies',
            'Risk analysis and decision trees',
          ] 
        },
        { 
          id: 'CMA2-D', 
          name: 'Risk Management', 
          weight: '10%', 
          topics: [
            'Enterprise risk management (ERM)',
            'Risk identification and assessment',
            'Risk mitigation strategies',
            'Derivatives and hedging',
          ] 
        },
        { 
          id: 'CMA2-E', 
          name: 'Investment Decisions', 
          weight: '10%', 
          topics: [
            'Capital budgeting process',
            'NPV, IRR, payback methods',
            'Risk analysis in capital investment',
            'Real options and post-audit',
          ] 
        },
        { 
          id: 'CMA2-F', 
          name: 'Professional Ethics', 
          weight: '15%', 
          topics: [
            'IMA Statement of Ethical Professional Practice',
            'Ethical considerations for management accountants',
            'Fraud and whistleblowing',
            'Corporate governance and ESG',
          ] 
        },
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
            The requested CMA part doesn't exist.
          </p>
          <Link to="/cma" className="btn-primary">
            Back to CMA Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const IconMap: Record<string, LucideIcon> = {
    TrendingUp,
    Calculator,
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
    navigate(`/practice?course=cma&section=${sectionId}&area=${areaId}`);
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto page-enter">
      {/* Back navigation */}
      <Link
        to="/cma"
        className="inline-flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300 hover:text-emerald-600 mb-4"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to CMA Dashboard
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
            <span className="text-slate-600 dark:text-slate-300">Part Progress</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">{totalProgress}%</span>
          </div>
          <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${totalProgress}%`, backgroundColor: section.color }}
            />
          </div>
        </div>

        {/* CMA-specific: Essay reminder */}
        <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Note:</strong> Each CMA part includes 2 essay questions in addition to MCQs. 
            Practice written responses for high-weight topics.
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <QuickActionCard
          icon={Play}
          label="Practice All"
          description={`All ${section.shortName} questions`}
          onClick={() => navigate(`/practice?course=cma&section=${sectionId}`)}
          color={section.color}
        />
        <QuickActionCard
          icon={ClipboardList}
          label="Mini Exam"
          description="25 questions, timed"
          onClick={() => navigate(`/cma-exam?section=${sectionId}&mode=mini`)}
          color="#22c55e"
        />
        <QuickActionCard
          icon={BookOpen}
          label="Lessons"
          description={`${section.shortName} study materials`}
          onClick={() => navigate(`/lessons?course=cma&section=${sectionId}`)}
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
          <Brain className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-1">
              CMA Study Tip
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {sectionId === 'CMA1' 
                ? 'Part 1 emphasizes operational topics. Focus on budgeting, variance analysis, and internal controls - these are heavily tested and require practice with calculations.'
                : 'Part 2 emphasizes strategic topics. Master NPV/IRR calculations, CVP analysis, and ratio analysis. Ethics questions require understanding IMA standards deeply.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMASection;

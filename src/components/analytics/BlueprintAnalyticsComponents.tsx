/**
 * Blueprint Analytics Components
 * 
 * Visual components for displaying blueprint mastery:
 * - BlueprintHeatMap: Color-coded grid of all blueprint areas
 * - WeightComparisonChart: Bar chart comparing study vs exam weights
 * - SmartRecommendations: Prioritized study suggestions
 */

import React, { useState } from 'react';
import {
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  BarChart3,
  Zap,
  BookOpen,
} from 'lucide-react';
import clsx from 'clsx';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import {
  BlueprintAnalytics,
  StudyRecommendation,
  WeightComparison,
  getMasteryColorClasses,
  getPriorityColorClasses,
  formatMasteryScore,
} from '../../utils/blueprintAnalytics';

// ============================================================================
// Blueprint Heat Map
// ============================================================================

interface BlueprintHeatMapProps {
  analytics: BlueprintAnalytics;
  onAreaClick?: (areaId: string) => void;
}

export const BlueprintHeatMap: React.FC<BlueprintHeatMapProps> = ({
  analytics,
  onAreaClick,
}) => {
  const [expanded, setExpanded] = useState(true);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const handleAreaClick = (areaId: string) => {
    setSelectedArea(selectedArea === areaId ? null : areaId);
    onAreaClick?.(areaId);
  };

  const selectedAreaData = analytics.areas.find(a => a.areaId === selectedArea);

  return (
    <Card variant="elevated" noPadding className="overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Blueprint Mastery Heat Map
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {analytics.summary.areasMastered}/{analytics.totalAreas} areas mastered • {analytics.overallMastery}% overall
            </p>
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
          {/* Legend */}
          <div className="flex flex-wrap gap-3 mb-4 pb-4 border-b border-slate-100 dark:border-slate-700">
            {(['mastered', 'proficient', 'developing', 'weak', 'untouched'] as const).map(status => {
              const colors = getMasteryColorClasses(status);
              return (
                <div key={status} className="flex items-center gap-2">
                  <div className={clsx('w-4 h-4 rounded', colors.bg)} />
                  <span className="text-xs text-slate-600 dark:text-slate-400 capitalize">
                    {status === 'untouched' ? 'Not Started' : status}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Heat Map Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {analytics.areas.map(area => {
              const colors = getMasteryColorClasses(area.status);
              const isSelected = selectedArea === area.areaId;
              
              return (
                <button
                  key={area.areaId}
                  onClick={() => handleAreaClick(area.areaId)}
                  className={clsx(
                    'relative p-4 rounded-xl transition-all duration-200',
                    colors.bg,
                    colors.border,
                    'border-2',
                    isSelected && 'ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-slate-800',
                    'hover:scale-105 hover:shadow-lg',
                    'text-left'
                  )}
                >
                  {/* Area ID Badge */}
                  <span className={clsx(
                    'absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded',
                    'bg-black/10 dark:bg-white/10',
                    colors.text
                  )}>
                    {area.areaId}
                  </span>

                  {/* Mastery Score */}
                  <div className={clsx('text-2xl font-bold mb-1', colors.text)}>
                    {area.questionsAttempted > 0 ? `${area.mastery}%` : '—'}
                  </div>

                  {/* Area Name */}
                  <div className={clsx('text-xs font-medium line-clamp-2', colors.text, 'opacity-90')}>
                    {area.areaName.length > 40 
                      ? area.areaName.slice(0, 40) + '...'
                      : area.areaName}
                  </div>

                  {/* Exam Weight Indicator */}
                  <div className={clsx(
                    'flex items-center gap-1 mt-2 text-[10px]',
                    colors.text,
                    'opacity-75'
                  )}>
                    <BarChart3 className="w-3 h-3" />
                    <span>{area.examWeight[0]}-{area.examWeight[1]}% of exam</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Area Details */}
          {selectedAreaData && (
            <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
              <h4 className="font-bold text-slate-900 dark:text-white mb-3">
                {selectedAreaData.areaId}: {selectedAreaData.areaName}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Accuracy</span>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {selectedAreaData.questionsAttempted > 0 
                      ? `${selectedAreaData.accuracy}%` 
                      : 'No data'}
                  </p>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Questions</span>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {selectedAreaData.questionsCorrect}/{selectedAreaData.questionsAttempted}
                  </p>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Coverage</span>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {selectedAreaData.coverage}%
                  </p>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Status</span>
                  <p className="font-semibold text-slate-900 dark:text-white capitalize">
                    {formatMasteryScore(selectedAreaData.mastery)}
                  </p>
                </div>
              </div>

              {/* Topic Breakdown */}
              {selectedAreaData.topics.length > 0 && (
                <div className="mt-4">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Topics in this area
                  </span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedAreaData.topics.slice(0, 8).map(topic => {
                      const topicColors = getMasteryColorClasses(topic.status);
                      return (
                        <span
                          key={topic.topicId}
                          className={clsx(
                            'text-xs px-2 py-1 rounded-full',
                            topicColors.bg,
                            topicColors.text
                          )}
                          title={`${topic.topicName}: ${topic.questionsAttempted > 0 ? topic.accuracy + '%' : 'Not practiced'}`}
                        >
                          {topic.topicName.length > 25 
                            ? topic.topicName.slice(0, 25) + '...' 
                            : topic.topicName}
                        </span>
                      );
                    })}
                    {selectedAreaData.topics.length > 8 && (
                      <span className="text-xs px-2 py-1 text-slate-500 dark:text-slate-400">
                        +{selectedAreaData.topics.length - 8} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

// ============================================================================
// Weight Comparison Chart
// ============================================================================

interface WeightComparisonChartProps {
  comparisons: WeightComparison[];
  examBody?: string; // e.g., "AICPA", "IRS", "IMA", "IIA", "ISACA", "CFP Board"
}

export const WeightComparisonChart: React.FC<WeightComparisonChartProps> = ({
  comparisons,
  examBody = 'Exam',
}) => {
  const [expanded, setExpanded] = useState(true);

  // Sort by largest gap first
  const sortedComparisons = [...comparisons].sort((a, b) => Math.abs(b.gap) - Math.abs(a.gap));

  return (
    <Card variant="elevated" noPadding className="overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Study vs. Exam Weight
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Compare your time allocation to {examBody} blueprint weights
            </p>
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
          {/* Legend */}
          <div className="flex gap-4 mb-4 pb-4 border-b border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-500" />
              <span className="text-xs text-slate-600 dark:text-slate-400">Your Study %</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-slate-300 dark:bg-slate-600 border-2 border-dashed border-slate-400" />
              <span className="text-xs text-slate-600 dark:text-slate-400">{examBody} Weight</span>
            </div>
          </div>

          {/* Comparison Bars */}
          <div className="space-y-4">
            {sortedComparisons.map(comparison => {
              const maxValue = Math.max(comparison.examWeight, comparison.studentCoverage, 40);
              const examWidth = (comparison.examWeight / maxValue) * 100;
              const studentWidth = (comparison.studentCoverage / maxValue) * 100;

              return (
                <div key={comparison.areaId} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate flex-1">
                      {comparison.areaId}
                    </span>
                    <span className={clsx(
                      'text-xs px-2 py-0.5 rounded-full font-medium ml-2',
                      comparison.status === 'balanced' && 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
                      comparison.status === 'under-studied' && 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
                      comparison.status === 'over-studied' && 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    )}>
                      {comparison.status === 'balanced' ? '✓ Balanced' :
                       comparison.status === 'under-studied' ? `↑ +${comparison.gap}% more needed` :
                       `↓ ${Math.abs(comparison.gap)}% extra`}
                    </span>
                  </div>
                  
                  <div className="relative h-6">
                    {/* Exam Target (dashed outline) */}
                    <div 
                      className="absolute top-0 h-full border-2 border-dashed border-slate-300 dark:border-slate-500 rounded bg-transparent"
                      style={{ width: `${examWidth}%` }}
                    />
                    
                    {/* Student Coverage (solid fill) */}
                    <div 
                      className={clsx(
                        'absolute top-0 h-full rounded transition-all duration-500',
                        comparison.status === 'under-studied' ? 'bg-amber-400' :
                        comparison.status === 'over-studied' ? 'bg-blue-400' :
                        'bg-emerald-500'
                      )}
                      style={{ width: `${studentWidth}%` }}
                    />
                    
                    {/* Value Labels */}
                    <div className="absolute inset-0 flex items-center justify-between px-2">
                      <span className="text-xs font-bold text-white drop-shadow-sm">
                        {comparison.studentCoverage}%
                      </span>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        /{comparison.examWeight}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );
};

// ============================================================================
// Smart Recommendations
// ============================================================================

interface SmartRecommendationsProps {
  recommendations: StudyRecommendation[];
  onStartStudy?: (areaId: string) => void;
}

export const SmartRecommendations: React.FC<SmartRecommendationsProps> = ({
  recommendations,
  onStartStudy,
}) => {
  const [expanded, setExpanded] = useState(true);

  if (recommendations.length === 0) {
    return (
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-800">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          <div>
            <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-100">
              All Areas Mastered!
            </h3>
            <p className="text-sm text-emerald-700 dark:text-emerald-300">
              You've achieved mastery across all blueprint areas. Focus on maintenance review.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card variant="elevated" noPadding className="overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Smart Recommendations
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Prioritized study suggestions based on exam weights
            </p>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        )}
      </button>

      {expanded && (
        <div className="px-6 pb-6 space-y-3">
          {recommendations.map((rec, index) => {
            const colors = getPriorityColorClasses(rec.priority);
            
            return (
              <div
                key={rec.areaId}
                className={clsx(
                  'p-4 rounded-xl border transition-all',
                  colors.bg,
                  'border-transparent',
                  'hover:shadow-md'
                )}
              >
                <div className="flex items-start gap-3">
                  {/* Priority Index */}
                  <div className={clsx(
                    'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                    colors.badge,
                    'text-white font-bold text-sm'
                  )}>
                    {index + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Area Name & Priority Badge */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className={clsx('font-bold', colors.text)}>
                        {rec.areaId}
                      </h4>
                      <span className={clsx(
                        'text-xs px-2 py-0.5 rounded-full uppercase font-bold',
                        colors.badge,
                        'text-white'
                      )}>
                        {rec.priority}
                      </span>
                    </div>
                    
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                      {rec.areaName}
                    </p>

                    {/* Reason */}
                    <div className="flex items-center gap-2 mt-2 text-sm">
                      <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <span className={colors.text}>{rec.reason}</span>
                    </div>

                    {/* Action */}
                    <div className="flex items-center gap-2 mt-1 text-sm">
                      <BookOpen className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <span className="text-slate-600 dark:text-slate-400">
                        {rec.suggestedAction}
                      </span>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center gap-4 mt-3 text-xs text-slate-500 dark:text-slate-400">
                      <span>Current: {rec.currentMastery}%</span>
                      <span>Exam Weight: {rec.examWeightMid}%</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                        +{rec.potentialGain} pts potential
                      </span>
                    </div>
                  </div>

                  {/* Start Button */}
                  {onStartStudy && (
                    <Button
                      variant="secondary"
                      size="sm"
                      leftIcon={Zap}
                      onClick={() => onStartStudy(rec.areaId)}
                    >
                      Study
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

// ============================================================================
// Summary Banner
// ============================================================================

interface AnalyticsSummaryProps {
  analytics: BlueprintAnalytics;
}

export const AnalyticsSummary: React.FC<AnalyticsSummaryProps> = ({
  analytics,
}) => {
  const { summary, overallMastery } = analytics;

  const getOverallStatus = () => {
    if (overallMastery >= 80) return { label: 'Exam Ready', color: 'emerald', icon: CheckCircle2 };
    if (overallMastery >= 60) return { label: 'Almost There', color: 'blue', icon: TrendingUp };
    if (overallMastery >= 40) return { label: 'Building Skills', color: 'amber', icon: TrendingUp };
    return { label: 'Getting Started', color: 'slate', icon: BookOpen };
  };

  const status = getOverallStatus();

  return (
    <div className={clsx(
      'rounded-2xl p-6 mb-6',
      status.color === 'emerald' && 'bg-gradient-to-r from-emerald-500 to-teal-600',
      status.color === 'blue' && 'bg-gradient-to-r from-blue-500 to-indigo-600',
      status.color === 'amber' && 'bg-gradient-to-r from-amber-500 to-orange-600',
      status.color === 'slate' && 'bg-gradient-to-r from-slate-500 to-slate-600'
    )}>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
            <span className="text-3xl font-bold text-white">{overallMastery}%</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <status.icon className="w-5 h-5 text-white" />
              <h2 className="text-xl font-bold text-white">{status.label}</h2>
            </div>
            <p className="text-white/80 text-sm">
              {summary.areasMastered}/{analytics.totalAreas} areas mastered • {summary.coverageScore}% coverage
            </p>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{summary.areasAtRisk}</div>
            <div className="text-xs text-white/70">Areas at Risk</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{summary.totalQuestionsAnswered}</div>
            <div className="text-xs text-white/70">Questions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{summary.overallAccuracy}%</div>
            <div className="text-xs text-white/70">Accuracy</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default {
  BlueprintHeatMap,
  WeightComparisonChart,
  SmartRecommendations,
  AnalyticsSummary,
};

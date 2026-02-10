import React, { useState, useMemo } from 'react';
import { X } from 'lucide-react';
import { Button } from '../common/Button';
import {
  getBlueprintForExamDate,
  getDaysUntilBlueprintChange,
  getCurrentBlueprintVersion,
  BLUEPRINT_CHANGES,
  STUDY_RECOMMENDATIONS,
  BLUEPRINT_ALERTS,
  LESSON_BLUEPRINT_MARKERS,
  type BlueprintVersion,
  type TopicChange,
  type BlueprintAlert,
  type StudyRecommendation,
  type LessonBlueprintMarker,
} from '../../config/blueprintConfig';

// ============================================================================
// EXAM DATE SELECTOR COMPONENT
// ============================================================================

interface ExamDateSelectorProps {
  onDateSelected: (date: Date, blueprint: BlueprintVersion) => void;
  initialDate?: Date;
}

export const ExamDateSelector: React.FC<ExamDateSelectorProps> = ({ onDateSelected, initialDate }) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    initialDate?.toISOString().split('T')[0] || ''
  );
  const [blueprint, setBlueprint] = useState<BlueprintVersion>(getCurrentBlueprintVersion());

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateStr = e.target.value;
    setSelectedDate(dateStr);
    
    if (dateStr) {
      const date = new Date(dateStr);
      const bp = getBlueprintForExamDate(date);
      setBlueprint(bp);
      onDateSelected(date, bp);
    }
  };

  const minDate = '2026-01-01';
  const maxDate = '2026-12-31';
  // Transition date for reference: '2026-07-01'

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-2 border-blue-200 dark:border-blue-700">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        📅 When Are You Testing?
      </h2>
      
      <p className="text-sm text-gray-600 dark:text-gray-600 mb-4">
        Your exam date determines which Blueprint applies. This affects the tax law you need to study.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex-1">
          <label htmlFor="examDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Target Exam Date
          </label>
          <input
            type="date"
            id="examDate"
            value={selectedDate}
            onChange={handleDateChange}
            min={minDate}
            max={maxDate}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:[color-scheme:dark]"
          />
        </div>

        <div className="flex-1">
          {selectedDate && (
            <div className={`p-4 rounded-lg ${
              blueprint === '2025' 
                ? 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700' 
                : 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700'
            }`}>
              <div className="font-bold text-lg">
                {blueprint === '2025' ? '📘 2025 Blueprint' : '📗 2026 Blueprint'}
              </div>
              <div className="text-sm mt-1">
                {blueprint === '2025' 
                  ? 'Pre-OBBBA tax law applies' 
                  : 'H.R. 1 (OBBBA) provisions apply'}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Timeline visual */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">2026 Testing Timeline</h3>
        <div className="relative">
          <div className="flex h-8 rounded-full overflow-hidden text-xs font-medium">
            <div className="w-1/2 bg-amber-400 dark:bg-amber-600 flex items-center justify-center text-amber-900 dark:text-amber-100">
              Jan 1 - Jun 30: 2025 Blueprint
            </div>
            <div className="w-1/2 bg-green-400 dark:bg-green-600 flex items-center justify-center text-green-900 dark:text-green-100">
              Jul 1 - Dec 31: 2026 Blueprint
            </div>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 text-xs text-gray-600">
            ↑ July 1 Transition
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// BLUEPRINT COMPARISON TABLE
// ============================================================================

interface BlueprintComparisonProps {
  userBlueprint?: BlueprintVersion;
  filterSection?: string;
}

export const BlueprintComparison: React.FC<BlueprintComparisonProps> = ({ 
  userBlueprint, 
  filterSection 
}) => {
  const changes = useMemo(() => {
    let filtered: TopicChange[] = BLUEPRINT_CHANGES;
    if (filterSection) {
      filtered = filtered.filter((c: TopicChange) => c.section === filterSection);
    }
    return filtered.sort((a: TopicChange, b: TopicChange) => {
      // Sort by changeType priority, then by section
      const typePriority: Record<string, number> = { 'modified': 0, 'added': 1, 'removed': 2, 'weight-changed': 3 };
      const aPriority = typePriority[a.changeType];
      const bPriority = typePriority[b.changeType];
      if (aPriority !== bPriority) return aPriority - bPriority;
      return a.section.localeCompare(b.section);
    });
  }, [filterSection]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <h2 className="text-xl font-bold">📋 2025 vs 2026 Blueprint Comparison</h2>
        <p className="text-sm opacity-90 mt-1">
          Key differences you need to know based on your exam date
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-600 uppercase tracking-wider">
                Topic
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-600 uppercase tracking-wider">
                Section
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-600 uppercase tracking-wider">
                Change
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-600 uppercase tracking-wider">
                What Changed
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-600 uppercase tracking-wider">
                Your Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {changes.map((change: TopicChange, index: number) => (
              <tr 
                key={change.topicId}
                className={`${
                  index % 2 === 0 
                    ? 'bg-white dark:bg-gray-800' 
                    : 'bg-gray-50 dark:bg-gray-900'
                } ${
                  userBlueprint && change.changeType === 'modified'
                    ? 'border-l-4 border-l-amber-500'
                    : ''
                }`}
              >
                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                  {change.topicName}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    change.section === 'REG' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                    change.section === 'TCP' ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200' :
                    change.section === 'FAR' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                    change.section === 'AUD' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    change.section === 'BAR' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  }`}>
                    {change.section}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    change.changeType === 'modified' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' :
                    change.changeType === 'added' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    change.changeType === 'removed' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  }`}>
                    {change.changeType === 'weight-changed' ? 'Weight Δ' : change.changeType}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  {change.description}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-medium">
                  {change.userAction}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ============================================================================
// BLUEPRINT ALERT BANNER
// ============================================================================

interface BlueprintAlertBannerProps {
  section?: string;
  dismissible?: boolean;
}

export const BlueprintAlertBanner: React.FC<BlueprintAlertBannerProps> = ({ 
  section, 
  dismissible = true 
}) => {
  const [dismissed, setDismissed] = useState<Set<number>>(new Set());
  const daysUntilChange = getDaysUntilBlueprintChange();
  const currentBlueprint = getCurrentBlueprintVersion();

  const alerts = useMemo(() => {
    return BLUEPRINT_ALERTS.filter((alert: BlueprintAlert) => {
      const showUntil = new Date(alert.showUntil);
      if (new Date() > showUntil) return false;
      if (section && !alert.sections.includes(section)) return false;
      return true;
    });
  }, [section]);

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-3">
      {alerts.map((alert: BlueprintAlert, index: number) => {
        if (dismissed.has(index)) return null;
        
        return (
          <div
            key={index}
            className={`relative rounded-lg p-4 ${
              alert.type === 'critical' 
                ? 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 text-red-800 dark:text-red-200'
                : alert.type === 'warning'
                ? 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 text-amber-800 dark:text-amber-200'
                : 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-200'
            }`}
          >
            <div className="pr-8">
              <p className="text-sm">{alert.message}</p>
              {daysUntilChange > 0 && currentBlueprint === '2025' && alert.type === 'critical' && (
                <p className="text-xs mt-2 opacity-75">
                  {daysUntilChange} days until Blueprint transition (July 1, 2026)
                </p>
              )}
            </div>
            
            {dismissible && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDismissed(prev => new Set(prev).add(index))}
                className="absolute top-3 right-3 opacity-60 hover:opacity-100"
                aria-label="Dismiss alert"
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
};

// ============================================================================
// STUDY RECOMMENDATIONS PANEL
// ============================================================================

interface StudyRecommendationsPanelProps {
  examDate?: Date;
}

export const StudyRecommendationsPanel: React.FC<StudyRecommendationsPanelProps> = ({ examDate }) => {
  const blueprint = examDate ? getBlueprintForExamDate(examDate) : getCurrentBlueprintVersion();
  
  const recommendation = useMemo((): StudyRecommendation => {
    if (!examDate) return STUDY_RECOMMENDATIONS[0]; // Default to Q1 2026
    
    const month = examDate.getMonth() + 1; // 1-12
    if (month <= 3) return STUDY_RECOMMENDATIONS[0];
    if (month <= 6) return STUDY_RECOMMENDATIONS[1];
    if (month <= 9) return STUDY_RECOMMENDATIONS[2];
    return STUDY_RECOMMENDATIONS[3];
  }, [examDate]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">📚</span>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Study Recommendations
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-600">
            {recommendation.examDateRange}
          </p>
        </div>
      </div>

      <div className={`p-4 rounded-lg mb-4 ${
        blueprint === '2025' 
          ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700'
          : 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700'
      }`}>
        <div className="font-semibold text-sm mb-1">
          Blueprint Version: {recommendation.blueprintVersion}
        </div>
        <div className="text-sm opacity-80">
          {recommendation.taxLawFocus}
        </div>
      </div>

      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Key Recommendations:</h3>
      <ul className="space-y-2">
        {recommendation.recommendations.map((rec: string, index: number) => (
          <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>{rec}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ============================================================================
// LESSON BLUEPRINT BADGE
// ============================================================================

interface LessonBlueprintBadgeProps {
  lessonId: string;
  userBlueprint?: BlueprintVersion;
}

export const LessonBlueprintBadge: React.FC<LessonBlueprintBadgeProps> = ({ lessonId, userBlueprint }) => {
  const marker = useMemo((): LessonBlueprintMarker | undefined => {
    return LESSON_BLUEPRINT_MARKERS.find((m: LessonBlueprintMarker) => m.lessonId === lessonId);
  }, [lessonId]);

  if (!marker) {
    // No special marker = same in both blueprints
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
        ✓ 2025 & 2026
      </span>
    );
  }

  const { status, note } = marker;

  // Determine if this lesson applies to user's blueprint
  const applies = !userBlueprint || 
    status === 'both' ||
    (userBlueprint === '2025' && status === '2025-version') ||
    (userBlueprint === '2026' && status === '2026-version');

  return (
    <div className="inline-flex flex-col gap-1">
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
        status === 'both' ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300' :
        status === '2025-only' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' :
        status === '2026-only' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
        status === '2025-version' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' :
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      }`}>
        {status === 'both' && '✓ 2025 & 2026'}
        {status === '2025-only' && '📘 2025 Only'}
        {status === '2026-only' && '📗 2026 Only'}
        {status === '2025-version' && '📘 2025 Version'}
        {status === '2026-version' && '📗 2026 Version'}
      </span>
      
      {note && !applies && (
        <span className="text-xs text-amber-600 dark:text-amber-400 italic">
          ⚠️ May not apply to your exam date
        </span>
      )}
      
      {note && (
        <span className="text-xs text-gray-600 dark:text-gray-600">
          {note}
        </span>
      )}
    </div>
  );
};

// ============================================================================
// MAIN BLUEPRINT SELECTOR PAGE COMPONENT
// ============================================================================

export const BlueprintSelectorPage: React.FC = () => {
  const [examDate, setExamDate] = useState<Date | undefined>();
  const [blueprint, setBlueprint] = useState<BlueprintVersion>(getCurrentBlueprintVersion());
  const [selectedSection, setSelectedSection] = useState<string>('');

  const handleDateSelected = (date: Date, bp: BlueprintVersion) => {
    setExamDate(date);
    setBlueprint(bp);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            🎯 CPA Exam Blueprint Selector
          </h1>
          <p className="text-gray-600 dark:text-gray-600">
            Choose your exam date to see the right content for your testing window
          </p>
        </div>

        {/* Alerts */}
        <BlueprintAlertBanner />

        {/* Date Selector */}
        <ExamDateSelector onDateSelected={handleDateSelected} />

        {/* Study Recommendations */}
        {examDate && <StudyRecommendationsPanel examDate={examDate} />}

        {/* Section Filter */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Filter by Section:
          </label>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Sections</option>
            <option value="REG">REG - Taxation and Regulation</option>
            <option value="TCP">TCP - Tax Compliance and Planning</option>
            <option value="FAR">FAR - Financial Accounting</option>
            <option value="AUD">AUD - Auditing</option>
            <option value="BAR">BAR - Business Analysis</option>
            <option value="ISC">ISC - Information Systems</option>
          </select>
        </div>

        {/* Comparison Table */}
        <BlueprintComparison 
          userBlueprint={blueprint}
          filterSection={selectedSection || undefined}
        />
      </div>
    </div>
  );
};

export default BlueprintSelectorPage;

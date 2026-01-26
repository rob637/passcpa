import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Layout, 
  Clock, 
  AlertTriangle,
  Calendar,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { getAllLessons } from '../../data/lessons';
import { 
  LESSON_MATRIX, 
  LessonMatrixEntry, 
  BlueprintVersionStatus,
  getObbbaAffectedLessons,
  getDifferingLessons,
  getLessonBlueprintVersion
} from '../../data/lessonMatrix';
import { Lesson, Difficulty, ExamSection } from '../../types';

// Get current blueprint based on date
const getCurrentBlueprint = (): '2025' | '2026' => {
  const now = new Date();
  const july1_2026 = new Date('2026-07-01');
  return now < july1_2026 ? '2025' : '2026';
};

const currentBlueprint = getCurrentBlueprint();

// Create a map for quick lesson matrix lookup
const lessonMatrixMap = new Map<string, LessonMatrixEntry>(
  LESSON_MATRIX.map(entry => [entry.lessonId, entry])
);

const getDeliveryMethod = (lesson: Lesson): string => {
  const types = new Set(lesson.content.sections.map(s => s.type));
  // Priority based detailed classification
  if (types.has('interactive')) return 'Interactive Module';
  if (types.has('example')) return 'Case Study / Example';
  if (types.has('table') && types.has('list')) return 'Structured Data Review';
  return 'Core Concept Reading';
};

const DifficultyBadge = ({ difficulty }: { difficulty: Difficulty }) => {
  const colors = {
    beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    intermediate: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    medium: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    moderate: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    advanced: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    hard: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    tough: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[difficulty] || colors.medium}`}>
      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
    </span>
  );
};

const SectionBadge = ({ section }: { section: ExamSection }) => {
  const colors: Record<string, string> = {
    FAR: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    AUD: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    REG: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    BAR: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
    ISC: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    TCP: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
    BEC: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    PREP: 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300',
  };

  return (
    <span className={`px-2 py-1 rounded-md text-xs font-bold ${colors[section] || 'bg-gray-100 text-gray-800'}`}>
      {section}
    </span>
  );
};

// Blueprint version status badge
const VersionBadge = ({ status }: { status: BlueprintVersionStatus }) => {
  const config = {
    'both': { 
      label: 'All Versions', 
      className: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
      icon: null
    },
    '2025': { 
      label: '2025 Only', 
      className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
      icon: null
    },
    '2026': { 
      label: '2026 Only', 
      className: 'bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300',
      icon: <Sparkles className="w-3 h-3" />
    },
    'differs': { 
      label: 'Changes', 
      className: 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300',
      icon: <AlertCircle className="w-3 h-3" />
    },
  };

  const { label, className, icon } = config[status];

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium ${className}`}>
      {icon}
      {label}
    </span>
  );
};

// OBBBA (H.R.1 Tax Law) indicator
const ObbbaIndicator = ({ note }: { note?: string }) => {
  return (
    <div className="group relative inline-flex">
      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 cursor-help">
        <AlertTriangle className="w-3 h-3" />
        H.R.1
      </span>
      {note && (
        <div className="invisible group-hover:visible absolute bottom-full left-0 mb-2 p-2 w-48 text-xs bg-slate-900 text-white rounded-lg shadow-lg z-10">
          {note}
          <div className="absolute top-full left-4 border-4 border-transparent border-t-slate-900" />
        </div>
      )}
    </div>
  );
};

const LessonMatrix: React.FC = () => {
  const [search, setSearch] = useState('');
  const [sectionFilter, setSectionFilter] = useState<string>('ALL');
  const [methodFilter, setMethodFilter] = useState<string>('ALL');
  const [versionFilter, setVersionFilter] = useState<string>('ALL');
  const [showObbbaOnly, setShowObbbaOnly] = useState(false);
  const [showBlueprintInfo, setShowBlueprintInfo] = useState(true);

  const allLessons = useMemo(() => getAllLessons(), []);
  
  // Stats for info banner
  const obbbaCount = useMemo(() => getObbbaAffectedLessons().length, []);
  const differingCount = useMemo(() => getDifferingLessons().length, []);
  
  // Extract unique methods for filter
  const deliveryMethods = useMemo(() => {
    const methods = new Set(allLessons.map(getDeliveryMethod));
    return Array.from(methods).sort();
  }, [allLessons]);

  const filteredLessons = useMemo(() => {
    return allLessons.filter(lesson => {
      const matchesSearch = lesson.title.toLowerCase().includes(search.toLowerCase()) || 
                            lesson.topics.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchesSection = sectionFilter === 'ALL' || lesson.section === sectionFilter;
      const matchesMethod = methodFilter === 'ALL' || getDeliveryMethod(lesson) === methodFilter;
      
      // Blueprint version filter
      const versionStatus = getLessonBlueprintVersion(lesson.id);
      const matchesVersion = versionFilter === 'ALL' || versionStatus === versionFilter;
      
      // OBBBA filter
      const matrixEntry = lessonMatrixMap.get(lesson.id);
      const isObbba = matrixEntry?.obbbaAffected || false;
      const matchesObbba = !showObbbaOnly || isObbba;
      
      return matchesSearch && matchesSection && matchesMethod && matchesVersion && matchesObbba;
    });
  }, [allLessons, search, sectionFilter, methodFilter, versionFilter, showObbbaOnly]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Layout className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Course Matrix</h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          Comprehensive index of all {allLessons.length} lessons across all CPA exam sections.
        </p>
      </div>

      {/* Blueprint Info Banner */}
      {showBlueprintInfo && (
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  CPA Blueprint Transition: {currentBlueprint} Blueprint Active
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-300 mb-2">
                  {currentBlueprint === '2025' ? (
                    <>Testing through <strong>June 30, 2026</strong> uses the 2025 Blueprint. Starting <strong>July 1, 2026</strong>, the updated 2026 Blueprint applies.</>
                  ) : (
                    <>The 2026 Blueprint is now in effect for all CPA exam testing.</>
                  )}
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-blue-700 dark:text-blue-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    {differingCount} lessons have content changes between versions
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    {obbbaCount} lessons affected by H.R.1 (OBBBA) tax law changes
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setShowBlueprintInfo(false)}
              className="text-blue-500 hover:text-blue-700 dark:text-blue-400 text-sm"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title or topic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm bg-transparent dark:text-white"
            />
          </div>
          
          <div>
            <select
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm bg-transparent dark:text-white"
            >
              <option value="ALL">All Sections</option>
              {['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP', 'PREP'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm bg-transparent dark:text-white"
            >
              <option value="ALL">All Methods</option>
              {deliveryMethods.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={versionFilter}
              onChange={(e) => setVersionFilter(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm bg-transparent dark:text-white"
            >
              <option value="ALL">All Versions</option>
              <option value="both">Both 2025 & 2026</option>
              <option value="2025">2025 Only</option>
              <option value="2026">2026 Only</option>
              <option value="differs">Content Differs</option>
            </select>
          </div>

          <div className="flex items-center">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showObbbaOnly}
                onChange={(e) => setShowObbbaOnly(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
              />
              <span className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                H.R.1 Only
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Matrix Table */}
      <div className="overflow-hidden bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-20">Section</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Lesson / Topic</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Blueprint Area</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell w-28">Version</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-24 hidden sm:table-cell">Duration</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-28">Difficulty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredLessons.length === 0 ? (
                 <tr>
                   <td colSpan={6} className="p-8 text-center text-slate-500">
                     No lessons match your filters.
                   </td>
                 </tr>
              ) : (
                filteredLessons.map((lesson) => {
                  const matrixEntry = lessonMatrixMap.get(lesson.id);
                  const versionStatus = getLessonBlueprintVersion(lesson.id);
                  const isObbba = matrixEntry?.obbbaAffected || false;
                  const transitionNote = matrixEntry?.transitionNote;
                  const skillLevel = matrixEntry?.skillLevel;

                  return (
                    <tr key={lesson.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="p-4 whitespace-nowrap">
                        <SectionBadge section={lesson.section} />
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-slate-900 dark:text-slate-100">{lesson.title}</div>
                        <div className="text-xs text-slate-500 mt-1 flex flex-wrap gap-1 items-center">
                          {lesson.topics.slice(0, 3).map((t, i) => (
                            <span key={i} className="inline-block bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-[10px]">
                              {t}
                            </span>
                          ))}
                          {lesson.topics.length > 3 && (
                            <span className="text-slate-400 px-1 text-[10px]">+ {lesson.topics.length - 3} more</span>
                          )}
                          {isObbba && <ObbbaIndicator note={transitionNote} />}
                        </div>
                      </td>
                      <td className="p-4 hidden lg:table-cell">
                        {matrixEntry?.blueprintArea ? (
                          <div>
                            <div className="text-sm text-slate-700 dark:text-slate-300">{matrixEntry.blueprintArea.areaName}</div>
                            <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                              <span>{matrixEntry.blueprintArea.weight}</span>
                              {skillLevel && (
                                <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">
                                  {skillLevel}
                                </span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-sm">—</span>
                        )}
                      </td>
                      <td className="p-4 hidden md:table-cell whitespace-nowrap">
                        <VersionBadge status={versionStatus} />
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400 hidden sm:table-cell">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {lesson.duration}m
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <DifficultyBadge difficulty={lesson.difficulty} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-xs text-slate-500 text-center">
          Showing {filteredLessons.length} of {allLessons.length} lessons
        </div>
      </div>
    </div>
  );
};

export default LessonMatrix;

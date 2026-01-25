import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Layout, 
  Clock, 
  FileText
} from 'lucide-react';
import { getAllLessons } from '../../data/lessons';
import { Lesson, Difficulty, ExamSection } from '../../types';

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

const LessonMatrix: React.FC = () => {
  const [search, setSearch] = useState('');
  const [sectionFilter, setSectionFilter] = useState<string>('ALL');
  const [methodFilter, setMethodFilter] = useState<string>('ALL');

  const allLessons = useMemo(() => getAllLessons(), []);
  
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
      
      return matchesSearch && matchesSection && matchesMethod;
    });
  }, [allLessons, search, sectionFilter, methodFilter]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Layout className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Course Matrix</h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          Comprehensive index of all {allLessons.length} lessons across all CPA exam sections.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
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
              <option value="ALL">All Delivery Methods</option>
              {deliveryMethods.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
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
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Delivery Method</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-24">Duration</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-28">Difficulty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredLessons.length === 0 ? (
                 <tr>
                   <td colSpan={5} className="p-8 text-center text-slate-500">
                     No lessons match your filters.
                   </td>
                 </tr>
              ) : (
                filteredLessons.map((lesson) => (
                  <tr key={lesson.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 whitespace-nowrap">
                      <SectionBadge section={lesson.section} />
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-slate-900 dark:text-slate-100">{lesson.title}</div>
                      <div className="text-xs text-slate-500 mt-1 flex flex-wrap gap-1">
                        {lesson.topics.slice(0, 3).map((t, i) => (
                          <span key={i} className="inline-block bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-[10px]">
                            {t}
                          </span>
                        ))}
                        {lesson.topics.length > 3 && (
                          <span className="text-slate-400 px-1 text-[10px]">+ {lesson.topics.length - 3} more</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <FileText className="w-4 h-4 text-slate-400" />
                        {getDeliveryMethod(lesson)}
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {lesson.duration}m
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <DifficultyBadge difficulty={lesson.difficulty} />
                    </td>
                  </tr>
                ))
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

/**
 * Lesson Editor - View-only admin interface for lessons
 * Lessons are stored in TypeScript files - edit src/data/cpa/lessons/ and redeploy
 */

import { useState, useEffect, useCallback } from 'react';
import logger from '../../../utils/logger';
import { useAuth } from '../../../hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';
import { fetchAllLessons, getLessonStats } from '../../../services/lessonService';
import type { Lesson, ExamSection, LessonContentSection } from '../../../types';
import {
  Search,
  Loader,
  BookOpen,
  Clock,
  ArrowLeft,
  Eye,
  Database,
  Info,
  X,
} from 'lucide-react';
import { Button } from '../../common/Button';
import { Card } from '../../common/Card';

// Admin email whitelist
const ADMIN_EMAILS = ['admin@voraprep.com', 'rob@sagecg.com', 'rob@voraprep.com'];

const EXAM_SECTIONS: ExamSection[] = ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP'];

const LessonEditor = () => {
  const { user, userProfile } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [viewingLesson, setViewingLesson] = useState<Lesson | null>(null);
  
  // Data State
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [stats, setStats] = useState<{ total: number; bySection: Record<string, number> } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Check admin access
  const isAdmin = user && (userProfile?.isAdmin || ADMIN_EMAILS.includes(user?.email || ''));

  const loadLessons = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await fetchAllLessons();
      setLessons(data);
      const statsData = await getLessonStats();
      setStats(statsData);
    } catch (err) {
      logger.error('Error loading lessons:', err);
      setError('Failed to load lessons. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      loadLessons();
    }
  }, [isAdmin, loadLessons]);

  // Filter lessons
  const filteredLessons = lessons.filter((l) => {
    const matchesSearch =
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.topics?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSection = selectedSection === 'all' || l.section === selectedSection;
    return matchesSearch && matchesSection;
  });

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Access Denied</h1>
          <p className="text-slate-600 dark:text-slate-300">
            You don&apos;t have permission to access the admin area.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin/cms" className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg">
                <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-green-600" />
                  Lesson Library
                </h1>
                <p className="text-sm text-gray-600 dark:text-slate-300">View lessons (local data)</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Info Banner */}
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
          <div className="flex items-start gap-3">
            <Database className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-900 dark:text-green-100">Local Lesson Library</h3>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                Lessons are stored in TypeScript files at <code className="bg-green-100 dark:bg-green-900 px-1 rounded">src/data/cpa/lessons/</code>.
                To add or edit lessons, modify the files and redeploy.
              </p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 flex items-center gap-2">
            <Info className="w-5 h-5" />
            {error}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-7 gap-4 mb-6">
          {stats && Object.entries(stats.bySection).map(([section, count]) => (
            <div key={section} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{count}</div>
              <div className="text-sm text-gray-600 dark:text-slate-300">{section}</div>
            </div>
          ))}
          {stats && (
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg shadow-sm border border-green-200 dark:border-green-800">
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">{stats.total}</div>
              <div className="text-sm text-green-600 dark:text-green-400">Total</div>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <Card className="p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <input
                  type="text"
                  placeholder="Search lessons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            >
              <option value="all">All Sections</option>
              {EXAM_SECTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </Card>

        {/* Lessons List */}
        <Card noPadding className="overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <h2 className="font-semibold text-slate-900 dark:text-slate-100">
              Lessons ({filteredLessons.length})
            </h2>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {isLoading ? (
              <div className="p-12 text-center text-slate-600 dark:text-slate-300">
                <Loader className="w-8 h-8 animate-spin mx-auto mb-2" />
                <p>Loading lessons...</p>
              </div>
            ) : filteredLessons.length === 0 ? (
              <div className="p-8 text-center text-slate-600 dark:text-slate-300">
                No lessons found matching your filters.
              </div>
            ) : (
              filteredLessons.slice(0, 50).map((lesson) => (
                <div key={lesson.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded">
                          {lesson.section}
                        </span>
                        <span className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {lesson.duration || 15} min
                        </span>
                      </div>
                      <h3 className="font-medium text-slate-900 dark:text-slate-100">{lesson.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{lesson.topics?.join(', ') || 'No topics'}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setViewingLesson(lesson)}
                      aria-label="View lesson details"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
          {filteredLessons.length > 50 && (
            <div className="p-4 text-center text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-slate-700">
              Showing first 50 of {filteredLessons.length} lessons
            </div>
          )}
        </Card>
      </main>

      {/* View Lesson Modal */}
      {viewingLesson && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Lesson Details</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewingLesson(null)}
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium rounded">
                  {viewingLesson.section}
                </span>
                <span className="text-sm text-slate-600 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {viewingLesson.duration || 15} min
                </span>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Title</h3>
                <p className="text-xl font-semibold text-slate-900 dark:text-white">{viewingLesson.title}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Topics</h3>
                <p className="text-slate-900 dark:text-white">{viewingLesson.topics?.join(', ') || 'No topics'}</p>
              </div>

              {viewingLesson.description && (
                <div>
                  <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Description</h3>
                  <p className="text-slate-700 dark:text-slate-300">{viewingLesson.description}</p>
                </div>
              )}

              {viewingLesson.content && viewingLesson.content.sections && viewingLesson.content.sections.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                    Content Sections ({viewingLesson.content.sections.length})
                  </h3>
                  <div className="space-y-2">
                    {viewingLesson.content.sections.slice(0, 5).map((section: LessonContentSection, idx: number) => (
                      <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-slate-600 uppercase">{section.type}</span>
                          {section.title && (
                            <span className="text-sm font-medium text-slate-900 dark:text-white">{section.title}</span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                          {typeof section.content === 'string' 
                            ? section.content.substring(0, 200) + (section.content.length > 200 ? '...' : '')
                            : '[Complex content]'}
                        </p>
                      </div>
                    ))}
                    {viewingLesson.content.sections.length > 5 && (
                      <p className="text-sm text-slate-600 text-center">
                        + {viewingLesson.content.sections.length - 5} more sections
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-600">ID: {viewingLesson.id}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonEditor;

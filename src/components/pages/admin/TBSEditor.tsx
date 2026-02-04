/**
 * TBS Editor - View-only admin interface for Task-Based Simulations
 * TBS are stored in TypeScript files - edit src/data/tbs/ and redeploy
 */

import { useState, useEffect, useCallback } from 'react';
import logger from '../../../utils/logger';
import { useAuth } from '../../../hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';
import { fetchAllTBS, getTBSStats } from '../../../services/tbsService';
import type { TBS, ExamSection } from '../../../types';
import {
  Search,
  Loader,
  Grid3X3,
  Clock,
  ArrowLeft,
  Eye,
  Database,
  Info,
} from 'lucide-react';
import clsx from 'clsx';

// Admin email whitelist
const ADMIN_EMAILS = ['admin@voraprep.com', 'rob@sagecg.com', 'rob@voraprep.com'];

const EXAM_SECTIONS: ExamSection[] = ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP'];

const TBSEditor = () => {
  const { user, userProfile } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [viewingTBS, setViewingTBS] = useState<TBS | null>(null);

  // Data State
  const [tbsList, setTBSList] = useState<TBS[]>([]);
  const [stats, setStats] = useState<{ section: ExamSection; count: number }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Check admin access
  const isAdmin = user && (userProfile?.isAdmin || ADMIN_EMAILS.includes(user?.email || ''));

  const loadTBS = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await fetchAllTBS();
      setTBSList(data);
      const statsData = await getTBSStats();
      setStats(statsData);
    } catch (err) {
      logger.error('Error loading TBS:', err);
      setError('Failed to load TBS. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      loadTBS();
    }
  }, [isAdmin, loadTBS]);

  // Filter TBS
  const filteredTBS = tbsList.filter((tbs) => {
    const matchesSearch =
      (tbs.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      tbs.scenario?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSection = selectedSection === 'all' || tbs.section === selectedSection;
    return matchesSearch && matchesSection;
  });

  const totalCount = stats.reduce((sum, s) => sum + s.count, 0);

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
                  <Grid3X3 className="w-6 h-6 text-orange-600" />
                  TBS Library
                </h1>
                <p className="text-sm text-gray-600 dark:text-slate-300">View Task-Based Simulations (local data)</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Info Banner */}
        <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl">
          <div className="flex items-start gap-3">
            <Database className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-orange-900 dark:text-orange-100">Local TBS Library</h3>
              <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                TBS are stored in TypeScript files at <code className="bg-orange-100 dark:bg-orange-900 px-1 rounded">src/data/tbs/</code>.
                To add or edit TBS, modify the files and redeploy.
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
          {stats.map(({ section, count }) => (
            <div key={section} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{count}</div>
              <div className="text-sm text-gray-600 dark:text-slate-300">{section}</div>
            </div>
          ))}
          <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg shadow-sm border border-orange-200 dark:border-orange-800">
            <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">{totalCount}</div>
            <div className="text-sm text-orange-600 dark:text-orange-400">Total</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 mb-6 shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <input
                  type="text"
                  placeholder="Search TBS..."
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
        </div>

        {/* TBS List */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-slate-700">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <h2 className="font-semibold text-slate-900 dark:text-slate-100">
              Task-Based Simulations ({filteredTBS.length})
            </h2>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {isLoading ? (
              <div className="p-12 text-center text-slate-600 dark:text-slate-300">
                <Loader className="w-8 h-8 animate-spin mx-auto mb-2" />
                <p>Loading TBS...</p>
              </div>
            ) : filteredTBS.length === 0 ? (
              <div className="p-8 text-center text-slate-600 dark:text-slate-300">
                No TBS found matching your filters.
              </div>
            ) : (
              filteredTBS.map((tbs) => (
                <div key={tbs.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs font-medium rounded">
                          {tbs.section}
                        </span>
                        <span className={clsx(
                          'px-2 py-0.5 text-xs font-medium rounded',
                          tbs.difficulty === 'easy' && 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
                          tbs.difficulty === 'medium' && 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
                          tbs.difficulty === 'hard' && 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        )}>
                          {tbs.difficulty}
                        </span>
                        <span className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {tbs.estimatedTime || tbs.timeEstimate || 15} min
                        </span>
                      </div>
                      <h3 className="font-medium text-slate-900 dark:text-slate-100">{tbs.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                        {tbs.scenario?.substring(0, 150)}...
                      </p>
                    </div>
                    <button
                      onClick={() => setViewingTBS(tbs)}
                      className="p-2 text-slate-600 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/30 rounded-lg"
                      title="View TBS details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* View TBS Modal */}
      {viewingTBS && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">TBS Details</h2>
              <button
                onClick={() => setViewingTBS(null)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-sm font-medium rounded">
                  {viewingTBS.section}
                </span>
                <span className={clsx(
                  'px-2 py-1 text-sm font-medium rounded',
                  viewingTBS.difficulty === 'easy' && 'bg-green-100 text-green-700',
                  viewingTBS.difficulty === 'medium' && 'bg-amber-100 text-amber-700',
                  viewingTBS.difficulty === 'hard' && 'bg-red-100 text-red-700'
                )}>
                  {viewingTBS.difficulty}
                </span>
                <span className="text-sm text-slate-600 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {viewingTBS.estimatedTime || viewingTBS.timeEstimate || 15} min
                </span>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Title</h3>
                <p className="text-xl font-semibold text-slate-900 dark:text-white">{viewingTBS.title}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Scenario</h3>
                <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{viewingTBS.scenario}</p>
              </div>

              {viewingTBS.requirements && viewingTBS.requirements.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                    Requirements ({viewingTBS.requirements.length})
                  </h3>
                  <ul className="space-y-2">
                    {viewingTBS.requirements.map((req, idx) => (
                      <li key={idx} className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg text-sm">
                        {req.text || req.question || JSON.stringify(req)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {viewingTBS.exhibits && viewingTBS.exhibits.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                    Exhibits ({viewingTBS.exhibits.length})
                  </h3>
                  <div className="space-y-2">
                    {viewingTBS.exhibits.map((exhibit, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <p className="font-medium text-sm">{exhibit.title}</p>
                        <p className="text-xs text-slate-600">Type: {exhibit.type}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-600">ID: {viewingTBS.id}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TBSEditor;

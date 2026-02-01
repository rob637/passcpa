/**
 * Written Communication Viewer - Read-only interface for viewing WC tasks
 * WC content is stored in local TypeScript files, not Firestore
 */

import { useState, useEffect, useCallback } from 'react';
import logger from '../../../utils/logger';
import { useAuth } from '../../../hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';
import {
  fetchAllWCTasks,
  getWCStats,
} from '../../../services/wcService';
import type { WCTask, ExamSection } from '../../../types';
import {
  Search,
  AlertCircle,
  Loader,
  FileText,
  Clock,
  ArrowLeft,
  Eye,
  X,
} from 'lucide-react';
import clsx from 'clsx';

// Admin email whitelist
const ADMIN_EMAILS = ['admin@voraprep.com'];

const EXAM_SECTIONS: ExamSection[] = ['AUD', 'FAR', 'REG', 'BAR', 'ISC', 'TCP', 'BEC'];

const WCEditor = () => {
  const { user, userProfile } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [viewingTask, setViewingTask] = useState<WCTask | null>(null);
  
  // Data State
  const [tasks, setTasks] = useState<WCTask[]>([]);
  const [stats, setStats] = useState<{ section: string; count: number }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Check admin access
  const isAdmin = user && (userProfile?.isAdmin || ADMIN_EMAILS.includes(user?.email || ''));

  const loadTasks = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await fetchAllWCTasks();
      setTasks(data);
      const statsData = await getWCStats();
      setStats(statsData);
    } catch (err) {
      logger.error('Error loading WC tasks:', err);
      setError('Failed to load WC tasks. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      loadTasks();
    }
  }, [isAdmin, loadTasks]);

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.scenario?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSection = selectedSection === 'all' || task.section === selectedSection;
    return matchesSearch && matchesSection;
  });

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don&apos;t have permission to access this area.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin/cms" className="p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-purple-600" />
                  Written Communication Tasks
                </h1>
                <p className="text-sm text-gray-500">View WC prompts and scenarios (local data)</p>
              </div>
            </div>
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              📦 Local TypeScript Files
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Messages */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
          {stats.map(({ section, count }) => (
            <div key={section} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-gray-900">{count}</div>
              <div className="text-sm text-gray-500">{section}</div>
            </div>
          ))}
          <div className="bg-purple-50 p-4 rounded-lg shadow-sm border border-purple-200">
            <div className="text-2xl font-bold text-purple-700">{tasks.length}</div>
            <div className="text-sm text-purple-600">Total</div>
          </div>
        </div>

        {/* View Detail Modal */}
        {viewingTask && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">{viewingTask.topic}</h2>
                <button
                  onClick={() => setViewingTask(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm font-medium">
                    {viewingTask.section}
                  </span>
                  <span className={clsx(
                    'px-2 py-1 rounded text-sm font-medium',
                    viewingTask.difficulty === 'easy' && 'bg-green-100 text-green-700',
                    viewingTask.difficulty === 'medium' && 'bg-yellow-100 text-yellow-700',
                    viewingTask.difficulty === 'hard' && 'bg-red-100 text-red-700',
                  )}>
                    {viewingTask.difficulty}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {viewingTask.estimatedTime}m
                  </span>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Scenario</h3>
                  <div className="bg-gray-50 p-4 rounded-lg text-sm whitespace-pre-wrap">
                    {viewingTask.scenario}
                  </div>
                </div>
                
                {viewingTask.prompt && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Writing Prompt</h3>
                    <div className="bg-blue-50 p-4 rounded-lg text-sm whitespace-pre-wrap">
                      {viewingTask.prompt}
                    </div>
                  </div>
                )}
                
                {viewingTask.sampleResponse && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Sample Response</h3>
                    <div className="bg-green-50 p-4 rounded-lg text-sm whitespace-pre-wrap font-mono">
                      {viewingTask.sampleResponse}
                    </div>
                  </div>
                )}
                
                {viewingTask.hints && viewingTask.hints.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Hints</h3>
                    <ul className="list-disc list-inside bg-amber-50 p-4 rounded-lg text-sm">
                      {viewingTask.hints.map((hint, i) => (
                        <li key={i}>{hint}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {viewingTask.references && viewingTask.references.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">References</h3>
                    <ul className="list-disc list-inside bg-gray-50 p-4 rounded-lg text-sm">
                      {viewingTask.references.map((ref, i) => (
                        <li key={i}>{ref}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search WC tasks..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Sections</option>
            {EXAM_SECTIONS.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Tasks List */}
        {isLoading && !tasks.length ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-8 h-8 animate-spin text-purple-600" />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Topic</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Section</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Time</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Difficulty</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTasks.map(task => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{task.topic}</div>
                      <div className="text-sm text-gray-500 truncate max-w-md">
                        {task.scenario?.substring(0, 100)}...
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm font-medium">
                        {task.section}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {task.estimatedTime}m
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={clsx(
                        'px-2 py-1 rounded text-sm font-medium',
                        task.difficulty === 'easy' && 'bg-green-100 text-green-700',
                        task.difficulty === 'medium' && 'bg-yellow-100 text-yellow-700',
                        task.difficulty === 'hard' && 'bg-red-100 text-red-700',
                      )}>
                        {task.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setViewingTask(task)}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredTasks.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                      No WC tasks found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default WCEditor;

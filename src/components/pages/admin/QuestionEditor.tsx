import { useState, useEffect, useCallback } from 'react';
import logger from '../../../utils/logger';
import { useAuth } from '../../../hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';
import { fetchQuestions, getQuestionStats } from '../../../services/questionService';
import type { Question } from '../../../types';
import {
  Search,
  Filter,
  ChevronDown,
  Loader,
  HelpCircle,
  ArrowLeft,
  Database,
  Eye,
  Info,
} from 'lucide-react';
import clsx from 'clsx';

// Admin email whitelist
const ADMIN_EMAILS = ['admin@voraprep.com'];

const EXAM_SECTIONS = ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP'];
const DIFFICULTY_LEVELS = ['easy', 'medium', 'hard'];

const QuestionEditor = () => {
  const { user, userProfile } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [viewingQuestion, setViewingQuestion] = useState<Question | null>(null);
  
  // Data State
  const [questions, setQuestions] = useState<Question[]>([]);
  const [stats, setStats] = useState<{ total: number; bySection: Record<string, number> } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Check admin access
  const isAdmin = user && (userProfile?.isAdmin || ADMIN_EMAILS.includes(user?.email || ''));

  const loadQuestions = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const options: Record<string, unknown> = { count: 50 };
      if (selectedSection !== 'all') options.section = selectedSection;
      if (selectedDifficulty !== 'all') options.difficulty = selectedDifficulty;
      
      const data = await fetchQuestions(options);
      setQuestions(data);
      const statsData = await getQuestionStats();
      setStats(statsData);
    } catch (err) {
      logger.error('Error loading questions:', err);
      setError('Failed to load questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedSection, selectedDifficulty]);

  useEffect(() => {
    if (isAdmin) {
      loadQuestions();
    }
  }, [isAdmin, loadQuestions]);

  // Filter questions
  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSection = selectedSection === 'all' || q.section === selectedSection;
    const matchesDifficulty = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    return matchesSearch && matchesSection && matchesDifficulty;
  });

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Access Denied
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
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
                  <HelpCircle className="w-6 h-6 text-blue-600" />
                  Question Bank
                </h1>
                <p className="text-sm text-gray-500 dark:text-slate-400">View MCQ questions (local data)</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Info Banner */}
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
          <div className="flex items-start gap-3">
            <Database className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">Local Question Bank</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                Questions are stored in TypeScript files for fast loading and offline support. 
                To add or edit questions, modify the files in <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">src/data/questions/</code> and redeploy.
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
              <div className="text-sm text-gray-500 dark:text-slate-400">{section}</div>
            </div>
          ))}
          {stats && (
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg shadow-sm border border-blue-200 dark:border-blue-800">
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{stats.total}</div>
              <div className="text-sm text-blue-600 dark:text-blue-400">Total</div>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 mb-6 shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className={clsx('w-4 h-4 transition-transform', showFilters && 'rotate-180')} />
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                  Section
                </label>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                  Difficulty
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="all">All Levels</option>
                  {DIFFICULTY_LEVELS.map((d) => (
                    <option key={d} value={d} className="capitalize">{d}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Questions List */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-slate-700">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <h2 className="font-semibold text-slate-900 dark:text-slate-100">
              Sample Questions ({filteredQuestions.length} shown)
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Showing random sample from local question bank</p>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {isLoading ? (
              <div className="p-12 text-center text-slate-500 dark:text-slate-400">
                <Loader className="w-8 h-8 animate-spin mx-auto mb-2" />
                <p>Loading questions...</p>
              </div>
            ) : filteredQuestions.length === 0 ? (
              <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                No questions found matching your filters.
              </div>
            ) : (
              filteredQuestions.map((q) => (
                <div key={q.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-xs font-medium rounded">
                          {q.section}
                        </span>
                        <span
                          className={clsx(
                            'px-2 py-0.5 text-xs font-medium rounded',
                            q.difficulty === 'easy' &&
                              'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
                            q.difficulty === 'medium' &&
                              'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
                            q.difficulty === 'hard' &&
                              'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          )}
                        >
                          {q.difficulty}
                        </span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">{q.topic}</span>
                      </div>
                      <p className="text-slate-900 dark:text-slate-100 line-clamp-2">
                        {q.question}
                      </p>
                    </div>
                    <button
                      onClick={() => setViewingQuestion(q)}
                      className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded-lg"
                      title="View question details"
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

      {/* View Question Modal */}
      {viewingQuestion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Question Details
              </h2>
              <button
                onClick={() => setViewingQuestion(null)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-500"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-sm font-medium rounded">
                  {viewingQuestion.section}
                </span>
                <span className={clsx(
                  'px-2 py-1 text-sm font-medium rounded',
                  viewingQuestion.difficulty === 'easy' && 'bg-green-100 text-green-700',
                  viewingQuestion.difficulty === 'medium' && 'bg-amber-100 text-amber-700',
                  viewingQuestion.difficulty === 'hard' && 'bg-red-100 text-red-700'
                )}>
                  {viewingQuestion.difficulty}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Topic</h3>
                <p className="text-slate-900 dark:text-white">{viewingQuestion.topic}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Question</h3>
                <p className="text-slate-900 dark:text-white">{viewingQuestion.question}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Options</h3>
                <div className="space-y-2">
                  {viewingQuestion.options.map((option, index) => (
                    <div
                      key={index}
                      className={clsx(
                        'p-3 rounded-lg border',
                        index === viewingQuestion.correctAnswer
                          ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700'
                          : 'bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600'
                      )}
                    >
                      <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                      {option}
                      {index === viewingQuestion.correctAnswer && (
                        <span className="ml-2 text-green-600 dark:text-green-400 text-sm">✓ Correct</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Explanation</h3>
                <p className="text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  {viewingQuestion.explanation}
                </p>
              </div>

              {viewingQuestion.reference && (
                <div>
                  <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Reference</h3>
                  <p className="text-slate-600 dark:text-slate-300">{viewingQuestion.reference}</p>
                </div>
              )}

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-400">
                  ID: {viewingQuestion.id}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionEditor;

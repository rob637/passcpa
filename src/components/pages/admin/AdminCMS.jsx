import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';
import {
  uploadAllQuestions,
  uploadSectionQuestions,
  deleteAllQuestions,
  deleteSectionQuestions,
  getFirestoreQuestionCount,
} from '../../../data/services/bulkUpload';
import {
  getQuestionStats,
  REG_QUESTIONS,
  FAR_QUESTIONS,
  AUD_QUESTIONS,
  BEC_QUESTIONS,
} from '../../../data/questions';

// Admin email whitelist - add your email here
const ADMIN_EMAILS = [
  'admin@passcpa.com',
  // Add your email here
];

const AdminCMS = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('questions');
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [localStats, setLocalStats] = useState(null);
  const [firestoreStats, setFirestoreStats] = useState(null);
  const [logs, setLogs] = useState([]);

  // Check admin access - for now, allow any authenticated user
  // In production, uncomment the email check
  const isAdmin = user; // || ADMIN_EMAILS.includes(user?.email);

  useEffect(() => {
    // Load stats on mount
    setLocalStats(getQuestionStats());
    loadFirestoreStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadFirestoreStats = async () => {
    try {
      const stats = await getFirestoreQuestionCount();
      setFirestoreStats(stats);
    } catch (error) {
      addLog('Error loading Firestore stats: ' + error.message, 'error');
    }
  };

  const addLog = (msg, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, { msg, type, timestamp }]);
  };

  const handleUploadAll = async () => {
    if (!window.confirm('This will upload all questions to Firestore. Continue?')) return;

    setIsUploading(true);
    setProgress(0);
    setMessage('');
    addLog('Starting bulk upload of all questions...', 'info');

    try {
      const result = await uploadAllQuestions((percent, msg) => {
        setProgress(percent);
        setMessage(msg);
      });

      addLog(`Upload complete: ${result.success} succeeded, ${result.failed} failed`, 'success');
      if (result.errors.length > 0) {
        result.errors.forEach((err) => addLog(err, 'error'));
      }

      await loadFirestoreStats();
    } catch (error) {
      addLog('Upload failed: ' + error.message, 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadSection = async (section, questions) => {
    if (!window.confirm(`Upload ${questions.length} ${section} questions?`)) return;

    setIsUploading(true);
    setProgress(0);
    addLog(`Starting upload of ${section} questions...`, 'info');

    try {
      const result = await uploadSectionQuestions(section, questions, (percent, msg) => {
        setProgress(percent);
        setMessage(msg);
      });

      addLog(`${section} upload complete: ${result.success} succeeded`, 'success');
      await loadFirestoreStats();
    } catch (error) {
      addLog(`${section} upload failed: ` + error.message, 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm('⚠️ This will DELETE ALL questions from Firestore. Are you sure?')) return;
    if (!window.confirm('This action cannot be undone. Type DELETE to confirm.')) return;

    setIsDeleting(true);
    setProgress(0);
    addLog('Starting deletion of all questions...', 'warning');

    try {
      const result = await deleteAllQuestions((percent, msg) => {
        setProgress(percent);
        setMessage(msg);
      });

      addLog(`Deleted ${result.deleted} questions`, 'success');
      await loadFirestoreStats();
    } catch (error) {
      addLog('Delete failed: ' + error.message, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteSection = async (section) => {
    if (!window.confirm(`Delete all ${section} questions from Firestore?`)) return;

    setIsDeleting(true);
    setProgress(0);
    addLog(`Deleting ${section} questions...`, 'warning');

    try {
      const result = await deleteSectionQuestions(section, (percent, msg) => {
        setProgress(percent);
        setMessage(msg);
      });

      addLog(`Deleted ${result.deleted} ${section} questions`, 'success');
      await loadFirestoreStats();
    } catch (error) {
      addLog(`Delete ${section} failed: ` + error.message, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don&apos;t have permission to access the admin area.</p>
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin CMS</h1>
              <p className="text-sm text-gray-500">Content Management System</p>
            </div>
            <div className="text-sm text-gray-500">Logged in as: {user.email}</div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-2 border-b border-gray-200">
          {['questions', 'lessons', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'questions' && (
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 shadow-lg text-white">
              <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/admin/questions"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  <span>✏️</span> Edit Individual Questions
                </Link>
                <Link
                  to="/admin/seed"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30 transition-colors"
                >
                  <span>🌱</span> Seed Database
                </Link>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Local Stats */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-xl">📦</span> Local Question Bank
                </h3>
                {localStats ? (
                  <div className="space-y-3">
                    <div className="text-3xl font-bold text-blue-600">
                      {localStats.total} questions
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(localStats.bySection).map(([section, count]) => (
                        <div key={section} className="flex justify-between p-2 bg-gray-50 rounded">
                          <span className="font-medium">{section}</span>
                          <span className="text-gray-600">{count}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      {localStats.topics} topics • {localStats.byDifficulty.easy} easy /{' '}
                      {localStats.byDifficulty.medium} medium / {localStats.byDifficulty.hard} hard
                    </div>
                  </div>
                ) : (
                  <div className="animate-pulse">Loading...</div>
                )}
              </div>

              {/* Firestore Stats */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-xl">🔥</span> Firestore Database
                </h3>
                {firestoreStats ? (
                  <div className="space-y-3">
                    <div className="text-3xl font-bold text-orange-500">
                      {firestoreStats.total} questions
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(firestoreStats.bySection).map(([section, count]) => (
                        <div key={section} className="flex justify-between p-2 bg-gray-50 rounded">
                          <span className="font-medium">{section}</span>
                          <span className="text-gray-600">{count}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={loadFirestoreStats}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Refresh stats
                    </button>
                  </div>
                ) : (
                  <div className="animate-pulse">Loading...</div>
                )}
              </div>
            </div>

            {/* Upload Controls */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Questions</h3>

              {/* Progress Bar */}
              {(isUploading || isDeleting) && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{message}</span>
                    <span className="font-medium">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${isDeleting ? 'bg-red-500' : 'bg-blue-600'}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {/* Upload All */}
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Upload All Questions</h4>
                    <p className="text-sm text-gray-600">
                      Upload entire question bank to Firestore
                    </p>
                  </div>
                  <button
                    onClick={handleUploadAll}
                    disabled={isUploading || isDeleting}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isUploading ? (
                      <>
                        <span className="animate-spin">⏳</span> Uploading...
                      </>
                    ) : (
                      <>
                        <span>📤</span> Upload All
                      </>
                    )}
                  </button>
                </div>

                {/* Section Uploads */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { section: 'REG', questions: REG_QUESTIONS, color: 'green' },
                    { section: 'FAR', questions: FAR_QUESTIONS, color: 'purple' },
                    { section: 'AUD', questions: AUD_QUESTIONS, color: 'yellow' },
                    { section: 'BEC', questions: BEC_QUESTIONS, color: 'cyan' },
                  ].map(({ section, questions, color }) => (
                    <div key={section} className={`p-4 bg-${color}-50 rounded-lg`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{section}</h4>
                          <p className="text-sm text-gray-600">{questions.length} questions</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUploadSection(section, questions)}
                            disabled={isUploading || isDeleting}
                            className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 text-sm"
                          >
                            Upload
                          </button>
                          <button
                            onClick={() => handleDeleteSection(section)}
                            disabled={isUploading || isDeleting}
                            className="px-3 py-1.5 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 disabled:opacity-50 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <h3 className="text-lg font-semibold text-red-900 mb-4">⚠️ Danger Zone</h3>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-red-800">Delete All Questions</h4>
                  <p className="text-sm text-red-600">
                    Remove all questions from Firestore database
                  </p>
                </div>
                <button
                  onClick={handleDeleteAll}
                  disabled={isUploading || isDeleting}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting ? 'Deleting...' : 'Delete All'}
                </button>
              </div>
            </div>

            {/* Activity Log */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Log</h3>
              <div className="bg-gray-900 rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm">
                {logs.length === 0 ? (
                  <p className="text-gray-500">No activity yet...</p>
                ) : (
                  logs.map((log, i) => (
                    <div
                      key={i}
                      className={`${
                        log.type === 'error'
                          ? 'text-red-400'
                          : log.type === 'success'
                            ? 'text-green-400'
                            : log.type === 'warning'
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                      }`}
                    >
                      <span className="text-gray-500">[{log.timestamp}]</span> {log.msg}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'lessons' && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Lesson Content Overview</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP'].map((section) => (
                <div key={section} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">{section}</h4>
                  <p className="text-sm text-gray-600">
                    Lessons are defined in <code className="text-xs bg-gray-200 px-1 rounded">src/data/lessons/{section.toLowerCase()}.ts</code>
                  </p>
                </div>
              ))}
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">📚 Adding/Editing Lessons</h4>
              <p className="text-sm text-blue-800 mb-3">
                Lessons are stored as TypeScript files in the codebase. To add or edit lessons:
              </p>
              <ol className="text-sm text-blue-800 list-decimal list-inside space-y-1">
                <li>Edit the relevant file in <code className="bg-blue-100 px-1 rounded">src/data/lessons/</code></li>
                <li>Follow the <code className="bg-blue-100 px-1 rounded">Lesson</code> type structure</li>
                <li>Run <code className="bg-blue-100 px-1 rounded">npm run build</code> to verify</li>
                <li>Deploy with <code className="bg-blue-100 px-1 rounded">firebase deploy</code></li>
              </ol>
            </div>
            
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-medium text-amber-900 mb-2">⚡ Current Stats</h4>
              <p className="text-sm text-amber-800">
                Total lessons across all sections: <strong>303</strong>
              </p>
              <p className="text-xs text-amber-700 mt-1">
                Blueprint transition system active (2025 → 2026)
              </p>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Settings</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Admin Access</h4>
                <p className="text-sm text-gray-600 mb-2">Authorized admin emails:</p>
                <ul className="text-sm text-gray-500 list-disc list-inside">
                  {ADMIN_EMAILS.map((email) => (
                    <li key={email}>{email}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Firebase Project</h4>
                <p className="text-sm text-gray-600">Project: passcpa-dev</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminCMS;

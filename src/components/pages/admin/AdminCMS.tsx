import { useState, useEffect, useCallback } from 'react';
import logger from '../../../utils/logger';
import { useAuth } from '../../../hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';
import { collection, query, orderBy, limit, getDocs, doc, writeBatch, updateDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import {
  uploadAllQuestions,
  uploadSectionQuestions,
  deleteAllQuestions,
  deleteSectionQuestions,
  getFirestoreQuestionCount,
} from '../../../data/services/bulkUpload';
import type { Question, ExamSection } from '../../../types';

// Dynamic imports for large question data to reduce bundle size
const loadQuestionData = () => import('../../../data/questions');

// ============================================================================
// Types
// ============================================================================

type TabType = 'content' | 'users' | 'logs' | 'settings';
type LogType = 'info' | 'success' | 'error' | 'warning';

interface LogEntry {
  msg: string;
  type: LogType;
  timestamp: string;
}

interface UserDocument {
  id: string; // Document ID (uid)
  email?: string;
  displayName?: string;
  isAdmin?: boolean;
  createdAt?: { seconds: number; nanoseconds: number };
  examSection?: string;
  lastLogin?: string; // If you track this
}

interface SystemError {
  id: string;
  message: string;
  stack?: string;
  timestamp: { seconds: number; nanoseconds: number } | string;
  userId?: string;
  context?: string;
  userAgent?: string;
}

interface LocalStats {
  total: number;
  bySection: Record<string, number>;
  byDifficulty: {
    easy: number;
    medium: number;
    hard: number;
  };
  topics: number;
}

interface FirestoreStats {
  total: number;
  bySection: Record<string, number>;
}

interface SectionConfig {
  section: string;
  questions: Question[];
  color: string;
}

// ============================================================================
// Constants
// ============================================================================

// Admin email whitelist - add your email here
const ADMIN_EMAILS: string[] = [
  'admin@voraprep.com',
  // Add your email here
];

const EXAM_SECTIONS: string[] = ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP', 'BEC'];

// ============================================================================
// Component
// ============================================================================

const AdminCMS: React.FC = () => {
  const { user, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('content');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [localStats, setLocalStats] = useState<LocalStats | null>(null);
  const [firestoreStats, setFirestoreStats] = useState<FirestoreStats | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [sectionConfigs, setSectionConfigs] = useState<SectionConfig[] | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // New State for Users and Errors
  const [usersList, setUsersList] = useState<UserDocument[]>([]);
  const [systemErrors, setSystemErrors] = useState<SystemError[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingErrors, setIsLoadingErrors] = useState(false);

  // Check admin access
  const isAdmin = user && (userProfile?.isAdmin || ADMIN_EMAILS.includes(user?.email || ''));

  // Load Users
  const loadUsers = useCallback(async () => {
    if (!isAdmin) return;
    setIsLoadingUsers(true);
    try {
      const q = query(collection(db, 'users'), limit(50)); // Limit to 50 for now
      const querySnapshot = await getDocs(q);
      const users: UserDocument[] = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() } as UserDocument);
      });
      setUsersList(users);
    } catch (error) {
      logger.error('Error loading users', error);
      addLog('Error loading users: ' + (error instanceof Error ? error.message : String(error)), 'error');
    } finally {
      setIsLoadingUsers(false);
    }
  }, [isAdmin]);

  // Load System Errors
  const loadSystemErrors = useCallback(async () => {
    if (!isAdmin) return;
    setIsLoadingErrors(true);
    try {
      const q = query(
        collection(db, 'error_logs'),
        orderBy('timestamp', 'desc'),
        limit(50)
      );
      const querySnapshot = await getDocs(q);
      const errors: SystemError[] = [];
      querySnapshot.forEach((doc) => {
        errors.push({ id: doc.id, ...doc.data() } as SystemError);
      });
      setSystemErrors(errors);
    } catch (error) {
       // If the index is missing, it will fail.
      logger.error('Error loading system errors', error);
       // Fallback without sort if index error happens (common in dev)
       if (String(error).includes('index')) {
          addLog('Index missing for error_logs. Fetching without sort.', 'warning');
           const qFallback = query(collection(db, 'error_logs'), limit(50));
           const qsFallback = await getDocs(qFallback);
           const errorsFallback: SystemError[] = [];
           qsFallback.forEach((doc) => {
             errorsFallback.push({ id: doc.id, ...doc.data() } as SystemError);
           });
           setSystemErrors(errorsFallback);
       } else {
          addLog('Error loading system errors: ' + (error instanceof Error ? error.message : String(error)), 'error');
       }
    } finally {
      setIsLoadingErrors(false);
    }
  }, [isAdmin]);

  // Effect to load tab data
  useEffect(() => {
    if (activeTab === 'users') {
      loadUsers();
    } else if (activeTab === 'logs') {
      loadSystemErrors();
    }
  }, [activeTab, loadUsers, loadSystemErrors]);

  // Load question data dynamically
  useEffect(() => {
    const loadData = async () => {
      try {
        const questionModule = await loadQuestionData();
        const { getQuestionStats, REG_ALL, FAR_ALL, AUD_ALL, BAR_ALL, ISC_ALL, TCP_ALL, BEC_ALL } = questionModule;
        
        setLocalStats(getQuestionStats());
        setSectionConfigs([
          { section: 'REG', questions: REG_ALL, color: 'green' },
          { section: 'FAR', questions: FAR_ALL, color: 'purple' },
          { section: 'AUD', questions: AUD_ALL, color: 'yellow' },
          { section: 'BAR', questions: BAR_ALL, color: 'blue' },
          { section: 'ISC', questions: ISC_ALL, color: 'indigo' },
          { section: 'TCP', questions: TCP_ALL, color: 'pink' },
          { section: 'BEC', questions: BEC_ALL, color: 'cyan' },
        ]);
      } catch (error) {
        logger.error('Error loading question data:', error);
      } finally {
        setIsLoadingData(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    // Load Firestore stats on mount
    loadFirestoreStats();
  }, []);

  const loadFirestoreStats = async (): Promise<void> => {
    try {
      const stats = await getFirestoreQuestionCount();
      setFirestoreStats(stats);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      addLog('Error loading Firestore stats: ' + errorMessage, 'error');
    }
  };

  const addLog = (msg: string, type: LogType = 'info'): void => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, { msg, type, timestamp }]);
  };

  const handleUploadAll = async (): Promise<void> => {
    if (!window.confirm('⚠️ WARNING: This will OVERWRITE all questions in Firestore with the data from the code files. Any manual edits made in the CMS will be lost. Continue?')) return;

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
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      addLog('Upload failed: ' + errorMessage, 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadSection = async (section: string, questions: Question[]): Promise<void> => {
    if (!window.confirm(`Upload ${questions.length} ${section} questions?`)) return;

    setIsUploading(true);
    setProgress(0);
    addLog(`Starting upload of ${section} questions...`, 'info');

    try {
      const result = await uploadSectionQuestions(section as ExamSection, questions, (percent, msg) => {
        setProgress(percent);
        setMessage(msg);
      });

      addLog(`${section} upload complete: ${result.success} succeeded`, 'success');
      await loadFirestoreStats();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      addLog(`${section} upload failed: ` + errorMessage, 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteAll = async (): Promise<void> => {
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
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      addLog('Delete failed: ' + errorMessage, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteSection = async (section: string): Promise<void> => {
    if (!window.confirm(`Delete all ${section} questions from Firestore?`)) return;

    setIsDeleting(true);
    setProgress(0);
    addLog(`Deleting ${section} questions...`, 'warning');

    try {
      const result = await deleteSectionQuestions(section as ExamSection, (percent, msg) => {
        setProgress(percent);
        setMessage(msg);
      });

      addLog(`Deleted ${result.deleted} ${section} questions`, 'success');
      await loadFirestoreStats();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      addLog(`Delete ${section} failed: ` + errorMessage, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  // ============================================================================
  // Render Guards
  // ============================================================================

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

  // ============================================================================
  // Render
  // ============================================================================

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
        <div className="flex gap-2 border-b border-gray-200 overflow-x-auto">
          {(['content', 'users', 'logs', 'settings'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium capitalize transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'content' ? '📦 Content' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'content' && (
          <div className="space-y-6">
            {/* Quick Links to Editors */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 shadow-lg text-white">
              <h3 className="text-lg font-semibold mb-3">Content Editors</h3>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/admin/questions"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  <span>❓</span> View Questions
                </Link>
                <Link
                  to="/admin/lessons"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-green-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  <span>📚</span> View Lessons
                </Link>
                <Link
                  to="/admin/wc"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  <span>✍️</span> Edit WC
                </Link>
                <Link
                  to="/admin/tbs"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-orange-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  <span>📊</span> View TBS
                </Link>
              </div>
            </div>

            {/* Stats Cards - Questions */}
            <h3 className="text-lg font-semibold text-gray-800">📋 Questions</h3>
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
                {/* Upload All Questions */}
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
                        <span>📤</span> Upload Questions
                      </>
                    )}
                  </button>
                </div>

                {/* Upload TBS */}
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Upload All TBS Simulations</h4>
                    <p className="text-sm text-gray-600">
                      Upload Task-Based Simulations for all sections (FAR, AUD, REG, BEC, BAR, ISC, TCP)
                    </p>
                  </div>
                  <button
                    onClick={async () => {
                      if (!window.confirm('Upload all TBS simulations to Firestore?')) return;
                      setIsUploading(true);
                      addLog('Starting TBS upload...', 'info');
                      try {
                        const { uploadTBS } = await import('../../../services/contentUpload');
                        const result = await uploadTBS((msg) => addLog(msg, 'info'));
                        addLog(`TBS upload complete: ${result.uploaded} uploaded, ${result.skipped} skipped`, 'success');
                      } catch (error) {
                        addLog('TBS upload failed: ' + (error instanceof Error ? error.message : String(error)), 'error');
                      } finally {
                        setIsUploading(false);
                      }
                    }}
                    disabled={isUploading || isDeleting}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <span>📋</span> Upload TBS
                  </button>
                </div>

                {/* Upload Written Communications */}
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Upload Written Communications</h4>
                    <p className="text-sm text-gray-600">
                      Upload WC tasks for all sections
                    </p>
                  </div>
                  <button
                    onClick={async () => {
                      if (!window.confirm('Upload all Written Communication tasks to Firestore?')) return;
                      setIsUploading(true);
                      addLog('Starting WC upload...', 'info');
                      try {
                        const { uploadWC } = await import('../../../services/contentUpload');
                        const result = await uploadWC((msg) => addLog(msg, 'info'));
                        addLog(`WC upload complete: ${result.uploaded} uploaded, ${result.skipped} skipped`, 'success');
                      } catch (error) {
                        addLog('WC upload failed: ' + (error instanceof Error ? error.message : String(error)), 'error');
                      } finally {
                        setIsUploading(false);
                      }
                    }}
                    disabled={isUploading || isDeleting}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <span>✍️</span> Upload WC
                  </button>
                </div>

                {/* Upload Lessons */}
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Upload All Lessons</h4>
                    <p className="text-sm text-gray-600">
                      Upload lesson content for all sections
                    </p>
                  </div>
                  <button
                    onClick={async () => {
                      if (!window.confirm('Upload all lessons to Firestore?')) return;
                      setIsUploading(true);
                      addLog('Starting Lessons upload...', 'info');
                      try {
                        const { uploadLessons } = await import('../../../services/contentUpload');
                        const result = await uploadLessons((msg) => addLog(msg, 'info'));
                        addLog(`Lessons upload complete: ${result.uploaded} uploaded, ${result.skipped} skipped`, 'success');
                      } catch (error) {
                        addLog('Lessons upload failed: ' + (error instanceof Error ? error.message : String(error)), 'error');
                      } finally {
                        setIsUploading(false);
                      }
                    }}
                    disabled={isUploading || isDeleting}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <span>📚</span> Upload Lessons
                  </button>
                </div>

                {/* Section Uploads */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {isLoadingData ? (
                    <div className="col-span-2 text-center py-8">
                      <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2" />
                      <p className="text-gray-500">Loading question data...</p>
                    </div>
                  ) : sectionConfigs ? (
                    sectionConfigs.map(({ section, questions, color }) => (
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
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-4 text-red-500">
                      Failed to load question data
                    </div>
                  )}
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

        {activeTab === 'users' && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex justify-between items-center">
              <span>User Management</span>
              <button
                onClick={loadUsers}
                className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
              >
                Refresh
              </button>
            </h3>
            
            {isLoadingUsers ? (
               <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2" />
                <p className="text-gray-500">Loading users...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="p-3 font-medium text-gray-600">Email</th>
                      <th className="p-3 font-medium text-gray-600">Name</th>
                      <th className="p-3 font-medium text-gray-600">Role</th>
                      <th className="p-3 font-medium text-gray-600">Last Login</th>
                      <th className="p-3 font-medium text-gray-600">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {usersList.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-4 text-center text-gray-500">
                          No users found (or permission denied).
                        </td>
                      </tr>
                    ) : (
                      usersList.map((u) => (
                        <tr key={u.id} className="hover:bg-gray-50">
                          <td className="p-3 font-mono text-sm">
                            {u.email || '—'}
                            {!u.email && (
                              <button
                                onClick={async () => {
                                  const email = window.prompt('Enter email for this user:', '');
                                  if (!email) return;
                                  try {
                                    const userRef = doc(db, 'users', u.id);
                                    await updateDoc(userRef, { email });
                                    addLog(`Updated email for ${u.id} to ${email}`, 'success');
                                    loadUsers();
                                  } catch (err) {
                                    addLog('Failed to update: ' + String(err), 'error');
                                  }
                                }}
                                className="ml-2 text-xs text-blue-600 hover:underline"
                              >
                                [fix]
                              </button>
                            )}
                          </td>
                          <td className="p-3">{u.displayName || '—'}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-1 rounded text-xs font-semibold ${
                                u.isAdmin
                                  ? 'bg-purple-100 text-purple-700'
                                  : 'bg-green-100 text-green-700'
                              }`}
                            >
                              {u.isAdmin ? 'Admin' : 'Student'}
                            </span>
                          </td>
                          <td className="p-3 text-sm text-gray-600">
                            {/* Handle string or Timestamp */}
                            {u.lastLogin ? String(u.lastLogin) : '—'}
                          </td>
                           <td className="p-3 text-sm text-gray-600">
                            {u.createdAt && typeof u.createdAt === 'object' && 'seconds' in u.createdAt
                              ? new Date((u.createdAt as any).seconds * 1000).toLocaleDateString()
                              : '—'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex justify-between items-center">
              <span>System Error Logs</span>
               <button
                onClick={loadSystemErrors}
                className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
              >
                Refresh
              </button>
            </h3>

            {isLoadingErrors ? (
               <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2" />
                <p className="text-gray-500">Loading logs...</p>
              </div>
            ) : (
              <div className="space-y-4">
                 {systemErrors.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No errors logged in the system.</p>
                 ) : (
                   systemErrors.map((err) => (
                     <div key={err.id} className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-bold text-red-700 text-sm">
                            {/* Handle Timestamp or string */}
                            {err.timestamp && typeof err.timestamp === 'object' && 'seconds' in err.timestamp
                              ? new Date((err.timestamp as any).seconds * 1000).toLocaleString()
                              : String(err.timestamp || 'Unknown Date')}
                          </span>
                          <span className="text-xs text-red-400 font-mono">{err.id}</span>
                        </div>
                        <p className="font-medium text-gray-900 mb-2">{err.message}</p>
                        {err.context && (
                          <div className="text-sm text-gray-600 mb-2">
                            <strong>Context:</strong> {typeof err.context === 'object' ? JSON.stringify(err.context) : err.context} | <strong>User:</strong> {err.userId || 'Anonymous'}
                          </div>
                        )}
                        {err.stack && (
                          <details className="mt-2">
                            <summary className="text-xs text-red-600 cursor-pointer hover:underline">View Stack Trace</summary>
                            <pre className="mt-2 p-2 bg-gray-900 text-red-200 text-xs rounded overflow-x-auto whitespace-pre-wrap">
                              {err.stack}
                            </pre>
                          </details>
                        )}
                     </div>
                   ))
                 )}
              </div>
            )}
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
              
              {/* Reset Account Section */}
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-medium text-red-900 mb-2">🔄 Reset My Account (Testing)</h4>
                <p className="text-sm text-red-700 mb-4">
                  Reset your account to test the app from the beginning. This will delete:
                </p>
                <ul className="text-sm text-red-600 list-disc list-inside mb-4">
                  <li>All progress data</li>
                  <li>Question history & performance</li>
                  <li>Completed lessons</li>
                  <li>Achievements & badges</li>
                  <li>Study streaks</li>
                  <li>Bookmarks & flagged questions</li>
                  <li>Onboarding status (will show onboarding again)</li>
                </ul>
                <div className="flex gap-3">
                  <button
                    onClick={async () => {
                      if (!user) return;
                      const confirmed = window.confirm(
                        '⚠️ ARE YOU SURE?\n\nThis will permanently delete ALL your progress and study data. You will need to go through onboarding again.\n\nThis cannot be undone!'
                      );
                      if (!confirmed) return;
                      
                      const doubleConfirm = window.confirm(
                        '🚨 FINAL CONFIRMATION\n\nType "RESET" mentally and click OK to proceed with the full account reset.'
                      );
                      if (!doubleConfirm) return;

                      try {
                        addLog('Starting account reset...', 'info');
                        const batch = writeBatch(db);
                        const userId = user.uid;
                        
                        // Collections to delete
                        const collectionsToDelete = [
                          'daily_log',           // Topic performance & study time
                          'lessons',             // Completed lessons tracking
                          'progress',
                          'questionHistory', 
                          'lessonProgress',
                          'achievements',
                          'bookmarks',
                          'flaggedQuestions',
                          'studySessions',
                          'examResults',
                          'flashcardProgress',
                          'questionAttempts',    // Individual question attempts
                        ];
                        
                        // Delete subcollections under user
                        for (const collName of collectionsToDelete) {
                          try {
                            const subColRef = collection(db, 'users', userId, collName);
                            const subDocs = await getDocs(subColRef);
                            subDocs.forEach((docSnap) => {
                              batch.delete(docSnap.ref);
                            });
                            addLog(`Queued ${subDocs.size} ${collName} docs for deletion`, 'info');
                          } catch (e) {
                            // Collection might not exist, that's ok
                          }
                        }
                        
                        // Reset user profile to initial state
                        const userRef = doc(db, 'users', userId);
                        batch.update(userRef, {
                          onboardingComplete: false,
                          examSection: null,
                          currentStreak: 0,
                          longestStreak: 0,
                          totalStudyTime: 0,
                          questionsAnswered: 0,
                          questionsCorrect: 0,
                          lessonsCompleted: 0,
                          lastStudyDate: null,
                          blueprintYear: null,
                          studyGoal: null,
                          examDate: null,
                          achievements: [],
                          resetAt: new Date().toISOString(),
                        });
                        
                        await batch.commit();
                        addLog('✅ Account reset complete! Redirecting to onboarding...', 'success');
                        
                        // Clear local storage
                        localStorage.removeItem('voraprep_study_state');
                        localStorage.removeItem('voraprep_progress');
                        
                        // Redirect to onboarding after short delay
                        setTimeout(() => {
                          window.location.href = '/onboarding';
                        }, 1500);
                      } catch (error) {
                        logger.error('Reset error:', error);
                        addLog('❌ Reset failed: ' + (error instanceof Error ? error.message : String(error)), 'error');
                      }
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    🔄 Reset My Account
                  </button>
                  <button
                    onClick={async () => {
                      if (!user) return;
                      const confirmed = window.confirm('Reset onboarding only? You\'ll see the onboarding flow again without losing progress.');
                      if (!confirmed) return;
                      
                      try {
                        const userRef = doc(db, 'users', user.uid);
                        await updateDoc(userRef, { onboardingComplete: false });
                        addLog('✅ Onboarding reset! Redirecting...', 'success');
                        setTimeout(() => {
                          window.location.href = '/onboarding';
                        }, 1000);
                      } catch (error) {
                        addLog('❌ Failed: ' + (error instanceof Error ? error.message : String(error)), 'error');
                      }
                    }}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                  >
                    🎯 Reset Onboarding Only
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminCMS;

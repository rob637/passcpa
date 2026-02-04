import { useState, useEffect, useCallback } from 'react';
import logger from '../../../utils/logger';
import { useAuth } from '../../../hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';
import { collection, query, orderBy, limit, getDocs, doc, writeBatch, updateDoc, where, getCountFromServer } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { FEATURES } from '../../../config/featureFlags';

// Dynamic imports for large question data to reduce bundle size
const loadQuestionData = () => import('../../../data/questions');

// ============================================================================
// Types
// ============================================================================

type TabType = 'content' | 'users' | 'analytics' | 'tools' | 'logs' | 'settings';
type LogType = 'info' | 'success' | 'error' | 'warning';

interface UserDocument {
  id: string; // Document ID (uid)
  email?: string;
  displayName?: string;
  isAdmin?: boolean;
  createdAt?: { seconds: number; nanoseconds: number };
  examSection?: string;
  lastLogin?: string; // If you track this
  subscription?: {
    tier?: string;
    status?: string;
    currentPeriodEnd?: { seconds: number };
    trialEnd?: { seconds: number };
  };
}

interface UserActivityData {
  questionHistory: Array<{
    questionId: string;
    // Old fields (may exist in old data)
    correct?: boolean;
    answeredAt?: { seconds: number };
    // New fields (current structure)
    lastAnswered?: { seconds: number };
    lastCorrect?: boolean;
    timesAnswered?: number;
    timesCorrect?: number;
    masteryLevel?: string;
    section?: string;
    topic?: string;
  }>;
  dailyLogs: Array<{
    date: string;
    questionsAnswered: number;
    correctAnswers: number;
    lessonsCompleted: number;
    studyMinutes: number;
  }>;
  practiceSessions: Array<{
    id: string;
    startedAt: { seconds: number };
    completedAt?: { seconds: number };
    section?: string;
    questionsAnswered: number;
    accuracy: number;
  }>;
  recentConversations: Array<{
    id: string;
    title?: string;
    updatedAt: { seconds: number };
    messageCount: number;
  }>;
  stats: {
    totalQuestions: number;
    totalCorrect: number;
    overallAccuracy: number;
    studyStreak: number;
    totalStudyMinutes: number;
    lastActiveDate: string | null;
  };
}

interface AnalyticsData {
  totalUsers: number;
  activeToday: number;
  activeThisWeek: number;
  activeThisMonth: number;
  newUsersThisWeek: number;
  bySection: Record<string, number>;
  bySubscription: Record<string, number>;
}

interface FeatureFlagState {
  [key: string]: boolean;
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

// ============================================================================
// Constants
// ============================================================================

// Admin email whitelist - add your email here
const ADMIN_EMAILS: string[] = [
  'admin@voraprep.com',
  'rob@sagecg.com',
  'rob@voraprep.com',
];

// ============================================================================
// Component
// ============================================================================

const AdminCMS: React.FC = () => {
  const { user, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('content');
  const [localStats, setLocalStats] = useState<LocalStats | null>(null);
  const [lessonStats, setLessonStats] = useState<{ total: number; bySection: Record<string, number> } | null>(null);
  const [tbsStats, setTbsStats] = useState<{ total: number; bySection: Record<string, number>; byType?: Record<string, number> } | null>(null);
  const [wcStats, setWcStats] = useState<{ total: number; bySection: Record<string, number> } | null>(null);

  // New State for Users and Errors
  const [usersList, setUsersList] = useState<UserDocument[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserDocument[]>([]);
  const [userSearch, setUserSearch] = useState('');
  const [userFilter, setUserFilter] = useState<'all' | 'admin' | 'premium' | 'free' | 'trial'>('all');
  const [systemErrors, setSystemErrors] = useState<SystemError[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingErrors, setIsLoadingErrors] = useState(false);

  // Analytics state
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(false);

  // Feature flags state (local copy for UI)
  const [featureFlags] = useState<FeatureFlagState>({
    aiTutor: FEATURES.aiTutor,
    examSimulator: FEATURES.examSimulator,
    flashcards: FEATURES.flashcards,
    tbs: FEATURES.tbs,
    writtenCommunication: FEATURES.writtenCommunication,
    offlineMode: FEATURES.offlineMode,
  });
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // User lookup state
  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupResult, setLookupResult] = useState<UserDocument | null>(null);
  const [isLookingUp, setIsLookingUp] = useState(false);
  
  // Detailed user view state
  const [selectedUser, setSelectedUser] = useState<UserDocument | null>(null);
  const [userActivity, setUserActivity] = useState<UserActivityData | null>(null);
  const [isLoadingActivity, setIsLoadingActivity] = useState(false);

  // Check admin access
  const isAdmin = user && (userProfile?.isAdmin || ADMIN_EMAILS.includes(user?.email || ''));

  // Helper to log messages (used in reset functionality)
  const addLog = (msg: string, type: LogType = 'info'): void => {
    const prefix = type === 'success' ? '✓' : type === 'error' ? '✗' : type === 'warning' ? '⚠' : 'ℹ';
    logger.info(`[AdminCMS] ${prefix} ${msg}`);
  };

  // Load Users
  const loadUsers = useCallback(async () => {
    if (!isAdmin) return;
    setIsLoadingUsers(true);
    try {
      const q = query(collection(db, 'users'), limit(200)); // Increased limit
      const querySnapshot = await getDocs(q);
      const users: UserDocument[] = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() } as UserDocument);
      });
      setUsersList(users);
      setFilteredUsers(users);
    } catch (error) {
      logger.error('Error loading users', error);
      addLog('Error loading users: ' + (error instanceof Error ? error.message : String(error)), 'error');
    } finally {
      setIsLoadingUsers(false);
    }
  }, [isAdmin]);

  // Filter users when search or filter changes
  useEffect(() => {
    let result = [...usersList];
    
    // Apply search
    if (userSearch.trim()) {
      const searchLower = userSearch.toLowerCase();
      result = result.filter(u => 
        u.email?.toLowerCase().includes(searchLower) ||
        u.displayName?.toLowerCase().includes(searchLower) ||
        u.id.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply filter
    if (userFilter === 'admin') {
      result = result.filter(u => u.isAdmin);
    } else if (userFilter === 'premium') {
      result = result.filter(u => 
        u.subscription?.tier && ['monthly', 'quarterly', 'annual', 'lifetime'].includes(u.subscription.tier)
      );
    } else if (userFilter === 'free') {
      result = result.filter(u => !u.subscription?.tier || u.subscription.tier === 'free');
    } else if (userFilter === 'trial') {
      result = result.filter(u => u.subscription?.status === 'trialing');
    }
    
    setFilteredUsers(result);
  }, [usersList, userSearch, userFilter]);

  // Load Analytics
  const loadAnalytics = useCallback(async () => {
    if (!isAdmin) return;
    setIsLoadingAnalytics(true);
    try {
      // Get total user count
      const usersRef = collection(db, 'users');
      const totalSnapshot = await getCountFromServer(usersRef);
      const totalUsers = totalSnapshot.data().count;

      // Get all users for detailed stats (limited for performance)
      const q = query(collection(db, 'users'), limit(500));
      const querySnapshot = await getDocs(q);
      const users: UserDocument[] = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() } as UserDocument);
      });

      // Calculate date ranges
      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(todayStart.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(todayStart.getTime() - 30 * 24 * 60 * 60 * 1000);

      // Active users (simplified - based on createdAt for now, real impl would use lastActive)
      let activeToday = 0;
      let activeThisWeek = 0;
      let activeThisMonth = 0;
      let newUsersThisWeek = 0;
      const bySection: Record<string, number> = { AUD: 0, BEC: 0, FAR: 0, REG: 0, TCP: 0, ISC: 0, BAR: 0 };
      const bySubscription: Record<string, number> = { free: 0, monthly: 0, quarterly: 0, annual: 0, lifetime: 0 };

      users.forEach(u => {
        const createdAt = u.createdAt ? new Date(u.createdAt.seconds * 1000) : null;
        
        // Count by section
        if (u.examSection && bySection.hasOwnProperty(u.examSection)) {
          bySection[u.examSection]++;
        }
        
        // Count by subscription
        const tier = u.subscription?.tier || 'free';
        if (bySubscription.hasOwnProperty(tier)) {
          bySubscription[tier]++;
        } else {
          bySubscription.free++;
        }
        
        // New users
        if (createdAt && createdAt >= weekAgo) {
          newUsersThisWeek++;
          if (createdAt >= todayStart) {
            activeToday++;
          }
        }
        
        // Rough activity estimate (would need proper tracking)
        if (createdAt && createdAt >= monthAgo) {
          activeThisMonth++;
          if (createdAt >= weekAgo) {
            activeThisWeek++;
          }
        }
      });

      setAnalytics({
        totalUsers,
        activeToday,
        activeThisWeek,
        activeThisMonth,
        newUsersThisWeek,
        bySection,
        bySubscription,
      });
    } catch (error) {
      logger.error('Error loading analytics', error);
      addLog('Error loading analytics: ' + (error instanceof Error ? error.message : String(error)), 'error');
    } finally {
      setIsLoadingAnalytics(false);
    }
  }, [isAdmin]);

  // User lookup by email or ID
  const lookupUser = useCallback(async () => {
    if (!isAdmin || !lookupQuery.trim()) return;
    setIsLookingUp(true);
    setLookupResult(null);
    try {
      // Try by UID first
      const userDoc = await getDocs(query(collection(db, 'users'), where('__name__', '==', lookupQuery.trim()), limit(1)));
      if (!userDoc.empty) {
        const doc = userDoc.docs[0];
        setLookupResult({ id: doc.id, ...doc.data() } as UserDocument);
        return;
      }
      
      // Try by email
      const emailQuery = await getDocs(query(collection(db, 'users'), where('email', '==', lookupQuery.trim()), limit(1)));
      if (!emailQuery.empty) {
        const doc = emailQuery.docs[0];
        setLookupResult({ id: doc.id, ...doc.data() } as UserDocument);
        return;
      }
      
      addLog('User not found: ' + lookupQuery, 'warning');
    } catch (error) {
      logger.error('Error looking up user', error);
      addLog('Lookup error: ' + (error instanceof Error ? error.message : String(error)), 'error');
    } finally {
      setIsLookingUp(false);
    }
  }, [isAdmin, lookupQuery]);

  // Load detailed user activity data
  const loadUserActivity = useCallback(async (userDoc: UserDocument) => {
    if (!isAdmin) return;
    setSelectedUser(userDoc);
    setIsLoadingActivity(true);
    setUserActivity(null);
    
    try {
      const userId = userDoc.id;
      
      // Load question history (all - no orderBy to avoid index requirements)
      const questionHistoryRef = collection(db, 'users', userId, 'question_history');
      const questionHistorySnap = await getDocs(questionHistoryRef);
      const questionHistory = questionHistorySnap.docs.map(doc => ({
        questionId: doc.id,
        ...doc.data()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      })) as any[];
      // Sort in memory by lastAnswered or lastCorrect
      questionHistory.sort((a, b) => {
        const aTime = a.lastAnswered?.seconds || a.lastCorrect?.seconds || 0;
        const bTime = b.lastAnswered?.seconds || b.lastCorrect?.seconds || 0;
        return bTime - aTime;
      });
      
      // Load daily logs (all - sort in memory)
      const dailyLogRef = collection(db, 'users', userId, 'daily_log');
      const dailyLogSnap = await getDocs(dailyLogRef);
      const dailyLogs = dailyLogSnap.docs.map(doc => ({
        date: doc.id,
        ...doc.data()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      })) as any[];
      dailyLogs.sort((a, b) => b.date.localeCompare(a.date));
      
      // Load practice sessions (all - sort in memory)
      const sessionsRef = collection(db, 'users', userId, 'practice_sessions');
      const sessionsSnap = await getDocs(sessionsRef);
      const practiceSessions = sessionsSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      })) as any[];
      practiceSessions.sort((a, b) => (b.startedAt?.seconds || 0) - (a.startedAt?.seconds || 0));
      
      // Load recent AI conversations (all - sort in memory)
      const conversationsRef = collection(db, 'users', userId, 'conversations');
      const conversationsSnap = await getDocs(conversationsRef);
      const recentConversations = conversationsSnap.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || 'Untitled',
          updatedAt: data.updatedAt,
          messageCount: data.messages?.length || 0
        };
      });
      recentConversations.sort((a, b) => (b.updatedAt?.seconds || 0) - (a.updatedAt?.seconds || 0));
      
      // Calculate stats - use lastCorrect or timesCorrect field
      const totalQuestions = questionHistory.length;
      const totalCorrect = questionHistory.filter(q => q.lastCorrect === true || q.timesCorrect > 0).length;
      const overallAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
      const totalStudyMinutes = dailyLogs.reduce((sum, log) => sum + (log.studyMinutes || 0), 0);
      const lastActiveDate = dailyLogs.length > 0 ? dailyLogs[0].date : null;
      
      // Calculate study streak
      let studyStreak = 0;
      const today = new Date().toISOString().split('T')[0];
      const sortedDates = dailyLogs.map(l => l.date).sort().reverse();
      for (const date of sortedDates) {
        const expectedDate = new Date();
        expectedDate.setDate(expectedDate.getDate() - studyStreak);
        const expected = expectedDate.toISOString().split('T')[0];
        if (date === expected || date === today) {
          studyStreak++;
        } else {
          break;
        }
      }
      
      const activityData = {
        questionHistory,
        dailyLogs,
        practiceSessions,
        recentConversations,
        stats: {
          totalQuestions,
          totalCorrect,
          overallAccuracy,
          studyStreak,
          totalStudyMinutes,
          lastActiveDate
        }
      };
      
      console.log('Setting user activity:', {
        questionHistory: questionHistory.length,
        dailyLogs: dailyLogs.length,
        practiceSessions: practiceSessions.length,
        recentConversations: recentConversations.length,
        stats: activityData.stats
      });
      
      setUserActivity(activityData);
      
      addLog(`Loaded activity for ${userDoc.email || userId}`, 'success');
    } catch (error) {
      logger.error('Error loading user activity', error);
      addLog('Error loading activity: ' + (error instanceof Error ? error.message : String(error)), 'error');
    } finally {
      setIsLoadingActivity(false);
    }
  }, [isAdmin]);

  // Toggle admin status for a user
  const toggleAdminStatus = async (userId: string, currentIsAdmin: boolean) => {
    if (!isAdmin) return;
    const confirmMsg = currentIsAdmin 
      ? 'Remove admin privileges from this user?' 
      : 'Grant admin privileges to this user?';
    if (!window.confirm(confirmMsg)) return;
    
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { isAdmin: !currentIsAdmin });
      addLog(`Admin status ${currentIsAdmin ? 'removed from' : 'granted to'} user ${userId}`, 'success');
      loadUsers();
    } catch (error) {
      logger.error('Error toggling admin status', error);
      addLog('Failed to toggle admin: ' + (error instanceof Error ? error.message : String(error)), 'error');
    }
  };

  // Grant/revoke premium access
  const setSubscriptionTier = async (userId: string, tier: 'free' | 'lifetime') => {
    if (!isAdmin) return;
    const confirmMsg = tier === 'lifetime'
      ? 'Grant LIFETIME premium access to this user?'
      : 'Remove premium access from this user?';
    if (!window.confirm(confirmMsg)) return;
    
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { 
        'subscription.tier': tier,
        'subscription.status': tier === 'lifetime' ? 'active' : 'inactive',
        'subscription.grantedBy': user?.email,
        'subscription.grantedAt': new Date().toISOString(),
      });
      addLog(`${tier === 'lifetime' ? 'Granted' : 'Revoked'} premium for user ${userId}`, 'success');
      loadUsers();
    } catch (error) {
      logger.error('Error updating subscription', error);
      addLog('Failed to update subscription: ' + (error instanceof Error ? error.message : String(error)), 'error');
    }
  };

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

  // Clear all system errors
  const clearSystemErrors = useCallback(async () => {
    if (!isAdmin) return;
    
    const confirmClear = window.confirm(
      `Are you sure you want to delete all ${systemErrors.length} error logs? This cannot be undone.`
    );
    if (!confirmClear) return;
    
    setIsLoadingErrors(true);
    try {
      // Delete in batches (Firestore limit is 500 per batch)
      const batch = writeBatch(db);
      let count = 0;
      
      for (const err of systemErrors) {
        batch.delete(doc(db, 'error_logs', err.id));
        count++;
        
        // Commit batch if we hit 500
        if (count >= 500) {
          await batch.commit();
          count = 0;
        }
      }
      
      // Commit any remaining
      if (count > 0) {
        await batch.commit();
      }
      
      setSystemErrors([]);
      addLog(`Cleared ${systemErrors.length} error logs`, 'success');
    } catch (error) {
      logger.error('Error clearing system errors', error);
      addLog('Failed to clear error logs: ' + (error instanceof Error ? error.message : String(error)), 'error');
    } finally {
      setIsLoadingErrors(false);
    }
  }, [isAdmin, systemErrors]);

  // Effect to load tab data
  useEffect(() => {
    if (activeTab === 'users') {
      loadUsers();
    } else if (activeTab === 'logs') {
      loadSystemErrors();
    } else if (activeTab === 'analytics') {
      loadAnalytics();
    }
  }, [activeTab, loadUsers, loadSystemErrors, loadAnalytics]);

  // Load question stats dynamically
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load Questions
        const questionModule = await loadQuestionData();
        const { getQuestionStats } = questionModule;
        setLocalStats(getQuestionStats());
        
        // Load Lessons
        const lessonModule = await import('../../../data/lessons');
        const lessonData = lessonModule.getLessonStats();
        setLessonStats({ total: lessonData.total, bySection: lessonData.bySection });
        
        // Load TBS
        const tbsModule = await import('../../../data/tbs');
        const tbsData = tbsModule.getTBSStats();
        setTbsStats({ total: tbsData.total, bySection: tbsData.bySection, byType: tbsData.byType });
        
        // Load WC
        const wcModule = await import('../../../data/written-communication');
        const wcData = wcModule.getWCStats();
        setWcStats({ total: wcData.total, bySection: wcData.bySection });
      } catch (error) {
        logger.error('Error loading content stats:', error);
      }
    };
    loadData();
  }, []);

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
        <div className="flex gap-1 sm:gap-2 border-b border-gray-200 overflow-x-auto scrollbar-hide pb-px -mb-px">
          {(['content', 'users', 'analytics', 'tools', 'logs', 'settings'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium capitalize transition-colors whitespace-nowrap flex-shrink-0 ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="hidden sm:inline">
                {tab === 'content' && '📦 Content'}
                {tab === 'users' && '👥 Users'}
                {tab === 'analytics' && '📊 Analytics'}
                {tab === 'tools' && '🛠️ Tools'}
                {tab === 'logs' && '📋 Logs'}
                {tab === 'settings' && '⚙️ Settings'}
              </span>
              <span className="sm:hidden">
                {tab === 'content' && '📦'}
                {tab === 'users' && '👥'}
                {tab === 'analytics' && '📊'}
                {tab === 'tools' && '🛠️'}
                {tab === 'logs' && '📋'}
                {tab === 'settings' && '⚙️'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'content' && (
          <div className="space-y-6">
            {/* Quick Links to Editors */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 shadow-lg text-white">
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
                  to="/admin/tbs"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-orange-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  <span>📊</span> View TBS
                </Link>
                <Link
                  to="/admin/wc"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  <span>✍️</span> View WC
                  <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">BEC</span>
                </Link>
              </div>
            </div>

            {/* Content Stats Grid - All 4 types */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Questions */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-xl">❓</span> Questions (MCQ)
                </h3>
                {localStats ? (
                  <div className="space-y-3">
                    <div className="text-3xl font-bold text-blue-600">
                      {localStats.total.toLocaleString()}
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      {Object.entries(localStats.bySection).map(([section, count]) => (
                        <div key={section} className="flex justify-between p-2 bg-gray-50 rounded">
                          <span className="font-medium">{section}</span>
                          <span className="text-gray-600">{count}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500">
                      {localStats.byDifficulty.easy} easy / {localStats.byDifficulty.medium} medium / {localStats.byDifficulty.hard} hard
                    </div>
                  </div>
                ) : (
                  <div className="animate-pulse h-20 bg-gray-100 rounded"></div>
                )}
              </div>

              {/* Lessons */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-xl">📚</span> Lessons
                </h3>
                {lessonStats ? (
                  <div className="space-y-3">
                    <div className="text-3xl font-bold text-green-600">
                      {lessonStats.total.toLocaleString()}
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      {Object.entries(lessonStats.bySection).map(([section, count]) => (
                        <div key={section} className="flex justify-between p-2 bg-gray-50 rounded">
                          <span className="font-medium">{section}</span>
                          <span className="text-gray-600">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="animate-pulse h-20 bg-gray-100 rounded"></div>
                )}
              </div>

              {/* TBS */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-xl">📊</span> Task-Based Simulations
                </h3>
                {tbsStats ? (
                  <div className="space-y-3">
                    <div className="text-3xl font-bold text-orange-600">
                      {tbsStats.total.toLocaleString()}
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      {Object.entries(tbsStats.bySection).map(([section, count]) => (
                        <div key={section} className="flex justify-between p-2 bg-gray-50 rounded">
                          <span className="font-medium">{section}</span>
                          <span className="text-gray-600">{count}</span>
                        </div>
                      ))}
                    </div>
                    {tbsStats.byType && (
                      <div className="text-xs text-gray-500">
                        {Object.entries(tbsStats.byType).slice(0, 4).map(([type, count]) => 
                          `${type.replace('_', ' ')}: ${count}`
                        ).join(' • ')}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="animate-pulse h-20 bg-gray-100 rounded"></div>
                )}
              </div>

              {/* Written Communication */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-xl">✍️</span> Written Communication
                  <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">BEC only</span>
                </h3>
                {wcStats ? (
                  <div className="space-y-3">
                    <div className="text-3xl font-bold text-primary-600">
                      {wcStats.total.toLocaleString()}
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      {Object.entries(wcStats.bySection).map(([section, count]) => (
                        <div key={section} className="flex justify-between p-2 bg-gray-50 rounded">
                          <span className="font-medium">{section}</span>
                          <span className="text-gray-600">{count}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-amber-600">
                      ⚠️ BEC ends June 30, 2026 - WC not tested in other sections
                    </div>
                  </div>
                ) : (
                  <div className="animate-pulse h-20 bg-gray-100 rounded"></div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* User Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
                <div className="text-2xl font-bold text-blue-600">{usersList.length}</div>
                <div className="text-sm text-gray-500">Total Users</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
                <div className="text-2xl font-bold text-primary-600">{usersList.filter(u => u.isAdmin).length}</div>
                <div className="text-sm text-gray-500">Admins</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {usersList.filter(u => u.subscription?.tier && ['monthly', 'quarterly', 'annual', 'lifetime'].includes(u.subscription.tier)).length}
                </div>
                <div className="text-sm text-gray-500">Premium</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
                <div className="text-2xl font-bold text-amber-600">
                  {usersList.filter(u => u.subscription?.status === 'trialing').length}
                </div>
                <div className="text-sm text-gray-500">Trial</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {usersList.filter(u => !u.subscription?.tier || u.subscription.tier === 'free').length}
                </div>
                <div className="text-sm text-gray-500">Free</div>
              </div>
            </div>

            {/* User Lookup Tool */}
            <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6 shadow-sm border border-primary-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                🔍 User Lookup
              </h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={lookupQuery}
                  onChange={(e) => setLookupQuery(e.target.value)}
                  placeholder="Enter email or user ID..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  onKeyDown={(e) => e.key === 'Enter' && lookupUser()}
                />
                <button
                  onClick={lookupUser}
                  disabled={isLookingUp || !lookupQuery.trim()}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
                >
                  {isLookingUp ? 'Searching...' : 'Lookup'}
                </button>
              </div>
              {lookupResult && (
                <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900">{lookupResult.email || 'No email'}</p>
                      <p className="text-sm text-gray-500 font-mono">{lookupResult.id}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Section: {lookupResult.examSection || 'Not set'} • 
                        Tier: {lookupResult.subscription?.tier || 'free'} • 
                        Status: {lookupResult.subscription?.status || 'N/A'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => loadUserActivity(lookupResult)}
                        className="px-3 py-1 text-xs rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
                      >
                        View Activity
                      </button>
                      <button
                        onClick={() => toggleAdminStatus(lookupResult.id, !!lookupResult.isAdmin)}
                        className={`px-3 py-1 text-xs rounded ${lookupResult.isAdmin ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-700'} hover:opacity-80`}
                      >
                        {lookupResult.isAdmin ? 'Remove Admin' : 'Make Admin'}
                      </button>
                      <button
                        onClick={() => setSubscriptionTier(lookupResult.id, lookupResult.subscription?.tier === 'lifetime' ? 'free' : 'lifetime')}
                        className={`px-3 py-1 text-xs rounded ${lookupResult.subscription?.tier === 'lifetime' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'} hover:opacity-80`}
                      >
                        {lookupResult.subscription?.tier === 'lifetime' ? 'Revoke Premium' : 'Grant Lifetime'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Management Table */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
                <div className="flex flex-wrap gap-3 items-center">
                  {/* Search */}
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Search users..."
                    className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {/* Filter */}
                  <select
                    value={userFilter}
                    onChange={(e) => setUserFilter(e.target.value as typeof userFilter)}
                    className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Users</option>
                    <option value="admin">Admins Only</option>
                    <option value="premium">Premium Only</option>
                    <option value="free">Free Only</option>
                    <option value="trial">Trial Only</option>
                  </select>
                  <span className="text-sm text-gray-500">
                    Showing {filteredUsers.length} of {usersList.length}
                  </span>
                  <button
                    onClick={loadUsers}
                    className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                  >
                    Refresh
                  </button>
                </div>
              </div>
            
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
                        <th className="p-3 font-medium text-gray-600">Section</th>
                        <th className="p-3 font-medium text-gray-600">Subscription</th>
                        <th className="p-3 font-medium text-gray-600">Role</th>
                        <th className="p-3 font-medium text-gray-600">Joined</th>
                        <th className="p-3 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-4 text-center text-gray-500">
                            {userSearch || userFilter !== 'all' ? 'No users match your criteria.' : 'No users found.'}
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.slice(0, 100).map((u) => (
                          <tr key={u.id} className="hover:bg-gray-50">
                            <td className="p-3">
                              <div className="font-medium text-sm">{u.email || '—'}</div>
                              <div className="text-xs text-gray-400 font-mono">{u.id.slice(0, 12)}...</div>
                            </td>
                            <td className="p-3">
                              <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                                {u.examSection || 'N/A'}
                              </span>
                            </td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-1 rounded text-xs font-semibold ${
                                  u.subscription?.tier === 'lifetime' ? 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800' :
                                  u.subscription?.tier === 'annual' ? 'bg-green-100 text-green-700' :
                                  u.subscription?.tier === 'quarterly' ? 'bg-blue-100 text-blue-700' :
                                  u.subscription?.tier === 'monthly' ? 'bg-primary-100 text-primary-700' :
                                  u.subscription?.status === 'trialing' ? 'bg-amber-100 text-amber-700' :
                                  'bg-gray-100 text-gray-600'
                                }`}
                              >
                                {u.subscription?.tier || 'free'}
                                {u.subscription?.status === 'trialing' && ' (trial)'}
                              </span>
                            </td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-1 rounded text-xs font-semibold ${
                                  u.isAdmin
                                    ? 'bg-primary-100 text-primary-700'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                {u.isAdmin ? 'Admin' : 'User'}
                              </span>
                            </td>
                             <td className="p-3 text-sm text-gray-600">
                              {u.createdAt && typeof u.createdAt === 'object' && 'seconds' in u.createdAt
                                ? new Date((u.createdAt as { seconds: number }).seconds * 1000).toLocaleDateString()
                                : '—'}
                            </td>
                            <td className="p-3">
                              <div className="flex gap-1">
                                <button
                                  onClick={() => loadUserActivity(u)}
                                  className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                                  title="View activity"
                                >
                                  👁️
                                </button>
                                <button
                                  onClick={() => toggleAdminStatus(u.id, !!u.isAdmin)}
                                  className="px-2 py-1 text-xs bg-primary-50 text-primary-600 rounded hover:bg-primary-100"
                                  title={u.isAdmin ? 'Remove admin' : 'Make admin'}
                                >
                                  {u.isAdmin ? '👤' : '👑'}
                                </button>
                                <button
                                  onClick={() => setSubscriptionTier(u.id, u.subscription?.tier === 'lifetime' ? 'free' : 'lifetime')}
                                  className="px-2 py-1 text-xs bg-amber-50 text-amber-600 rounded hover:bg-amber-100"
                                  title={u.subscription?.tier === 'lifetime' ? 'Revoke premium' : 'Grant lifetime'}
                                >
                                  {u.subscription?.tier === 'lifetime' ? '⬇️' : '⬆️'}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                  {filteredUsers.length > 100 && (
                    <p className="text-center text-sm text-gray-500 mt-4">
                      Showing first 100 of {filteredUsers.length} users. Use search to find specific users.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Analytics Header */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">📊 Analytics Dashboard</h3>
              <button
                onClick={loadAnalytics}
                disabled={isLoadingAnalytics}
                className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors disabled:opacity-50"
              >
                {isLoadingAnalytics ? 'Loading...' : 'Refresh'}
              </button>
            </div>

            {isLoadingAnalytics ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2" />
                <p className="text-gray-500">Calculating analytics...</p>
              </div>
            ) : analytics ? (
              <>
                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                    <div className="text-4xl font-bold">{analytics.totalUsers.toLocaleString()}</div>
                    <div className="text-blue-100 text-sm mt-1">Total Users</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                    <div className="text-4xl font-bold">{analytics.newUsersThisWeek}</div>
                    <div className="text-green-100 text-sm mt-1">New This Week</div>
                  </div>
                  <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-6 text-white">
                    <div className="text-4xl font-bold">{analytics.activeThisWeek}</div>
                    <div className="text-primary-100 text-sm mt-1">Active This Week</div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white">
                    <div className="text-4xl font-bold">{analytics.activeThisMonth}</div>
                    <div className="text-amber-100 text-sm mt-1">Active This Month</div>
                  </div>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Users by Section */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h4 className="font-semibold text-gray-900 mb-4">Users by Exam Section</h4>
                    <div className="space-y-3">
                      {Object.entries(analytics.bySection)
                        .filter(([, count]) => count > 0)
                        .sort((a, b) => b[1] - a[1])
                        .map(([section, count]) => {
                          const percentage = analytics.totalUsers > 0 ? (count / analytics.totalUsers * 100) : 0;
                          return (
                            <div key={section}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium">{section}</span>
                                <span className="text-gray-600">{count} ({percentage.toFixed(1)}%)</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                                  style={{ width: `${Math.min(percentage * 2, 100)}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      {Object.entries(analytics.bySection).filter(([, count]) => count > 0).length === 0 && (
                        <p className="text-gray-500 text-sm">No section data available</p>
                      )}
                    </div>
                  </div>

                  {/* Users by Subscription */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h4 className="font-semibold text-gray-900 mb-4">Users by Subscription</h4>
                    <div className="space-y-3">
                      {[
                        { key: 'lifetime', label: 'Lifetime', color: 'bg-gradient-to-r from-amber-400 to-yellow-500' },
                        { key: 'annual', label: 'Annual', color: 'bg-green-500' },
                        { key: 'quarterly', label: 'Quarterly', color: 'bg-blue-500' },
                        { key: 'monthly', label: 'Monthly', color: 'bg-primary-500' },
                        { key: 'free', label: 'Free', color: 'bg-gray-400' },
                      ].map(({ key, label, color }) => {
                        const count = analytics.bySubscription[key] || 0;
                        const percentage = analytics.totalUsers > 0 ? (count / analytics.totalUsers * 100) : 0;
                        return (
                          <div key={key}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="font-medium">{label}</span>
                              <span className="text-gray-600">{count} ({percentage.toFixed(1)}%)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`${color} h-2 rounded-full transition-all duration-500`} 
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-700">Premium Users</span>
                        <span className="font-bold text-green-600">
                          {(analytics.bySubscription.lifetime || 0) + 
                           (analytics.bySubscription.annual || 0) + 
                           (analytics.bySubscription.quarterly || 0) + 
                           (analytics.bySubscription.monthly || 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4">Quick Stats</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{analytics.activeToday}</div>
                      <div className="text-xs text-gray-500">Active Today</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {analytics.totalUsers > 0 ? ((analytics.activeThisWeek / analytics.totalUsers) * 100).toFixed(1) : 0}%
                      </div>
                      <div className="text-xs text-gray-500">WAU Rate</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-primary-600">
                        {analytics.totalUsers > 0 ? ((analytics.activeThisMonth / analytics.totalUsers) * 100).toFixed(1) : 0}%
                      </div>
                      <div className="text-xs text-gray-500">MAU Rate</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-amber-600">
                        {((analytics.bySubscription.lifetime || 0) + 
                          (analytics.bySubscription.annual || 0) + 
                          (analytics.bySubscription.quarterly || 0) + 
                          (analytics.bySubscription.monthly || 0)) > 0 
                          ? (((analytics.bySubscription.lifetime || 0) + 
                              (analytics.bySubscription.annual || 0) + 
                              (analytics.bySubscription.quarterly || 0) + 
                              (analytics.bySubscription.monthly || 0)) / analytics.totalUsers * 100).toFixed(1)
                          : 0}%
                      </div>
                      <div className="text-xs text-gray-500">Conversion Rate</div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-gray-500">
                Click Refresh to load analytics data
              </div>
            )}
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="space-y-6">
            {/* Feature Flags */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                🎛️ Feature Flags
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">Read-only Preview</span>
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                These feature flags control app functionality. To change them, update <code className="bg-gray-100 px-1 rounded">featureFlags.ts</code> and redeploy.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(featureFlags).map(([flag, enabled]) => (
                  <div 
                    key={flag} 
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      enabled ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div>
                      <span className="font-medium text-gray-900">{flag}</span>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {flag === 'aiTutor' && 'Vory AI assistant'}
                        {flag === 'examSimulator' && 'Full exam simulation'}
                        {flag === 'flashcards' && 'Flashcard study mode'}
                        {flag === 'tbs' && 'Task-Based Simulations'}
                        {flag === 'writtenCommunication' && 'Written Communication (BEC only)'}
                        {flag === 'studyPlan' && 'AI-generated study plans'}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      enabled ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {enabled ? 'ON' : 'OFF'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* System Tools */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🛠️ System Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Maintenance Mode Toggle */}
                <div className={`p-4 rounded-lg border ${maintenanceMode ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Maintenance Mode</h4>
                    <button
                      onClick={() => {
                        const newState = !maintenanceMode;
                        setMaintenanceMode(newState);
                        localStorage.setItem('admin_maintenance_mode', String(newState));
                        addLog(`Maintenance mode ${newState ? 'enabled' : 'disabled'}`, newState ? 'warning' : 'success');
                      }}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                        maintenanceMode 
                          ? 'bg-red-600 text-white hover:bg-red-700' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {maintenanceMode ? 'Disable' : 'Enable'}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">
                    When enabled, shows maintenance message to non-admin users.
                  </p>
                </div>

                {/* Cache Refresh */}
                <div className="p-4 rounded-lg border bg-gray-50 border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Clear Local Cache</h4>
                    <button
                      onClick={() => {
                        const keysCleared: string[] = [];
                        ['voraprep_study_state', 'voraprep_progress', 'ai_api_failures'].forEach(key => {
                          if (localStorage.getItem(key)) {
                            localStorage.removeItem(key);
                            keysCleared.push(key);
                          }
                        });
                        // Clear dailyplan keys
                        for (let i = localStorage.length - 1; i >= 0; i--) {
                          const key = localStorage.key(i);
                          if (key && key.startsWith('dailyplan_')) {
                            localStorage.removeItem(key);
                            keysCleared.push(key);
                          }
                        }
                        addLog(`Cleared ${keysCleared.length} cache entries`, 'success');
                        alert(`Cleared ${keysCleared.length} cache entries. Page will reload.`);
                        window.location.reload();
                      }}
                      className="px-3 py-1 rounded text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                      Clear Cache
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Clears local storage cache for study state and progress.
                  </p>
                </div>

                {/* Force Reload */}
                <div className="p-4 rounded-lg border bg-gray-50 border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Force Hard Reload</h4>
                    <button
                      onClick={() => {
                        if (window.confirm('This will fully reload the app. Continue?')) {
                          window.location.href = window.location.href + '?cache=' + Date.now();
                        }
                      }}
                      className="px-3 py-1 rounded text-sm font-medium bg-amber-600 text-white hover:bg-amber-700 transition-colors"
                    >
                      Hard Reload
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Forces a complete page reload bypassing cache.
                  </p>
                </div>

                {/* Export Users */}
                <div className="p-4 rounded-lg border bg-gray-50 border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Export User List</h4>
                    <button
                      onClick={() => {
                        if (usersList.length === 0) {
                          alert('Load users first (go to Users tab)');
                          return;
                        }
                        const csv = [
                          'Email,UID,Section,Subscription,IsAdmin,CreatedAt',
                          ...usersList.map(u => 
                            `"${u.email || ''}","${u.id}","${u.examSection || ''}","${u.subscription?.tier || 'free'}","${u.isAdmin || false}","${u.createdAt ? new Date(u.createdAt.seconds * 1000).toISOString() : ''}"`
                          )
                        ].join('\n');
                        const blob = new Blob([csv], { type: 'text/csv' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `voraprep_users_${new Date().toISOString().split('T')[0]}.csv`;
                        a.click();
                        URL.revokeObjectURL(url);
                        addLog('Exported user list to CSV', 'success');
                      }}
                      className="px-3 py-1 rounded text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
                    >
                      Export CSV
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Download user list as CSV file.
                  </p>
                </div>
              </div>
            </div>

            {/* Beta Mode Status */}
            <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6 shadow-sm border border-primary-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                🚀 Beta Mode Status
              </h3>
              <div className="flex items-center gap-4">
                <div className={`px-4 py-2 rounded-lg font-medium ${
                  true /* IS_BETA from subscription.ts */
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-gray-100 text-gray-700 border border-gray-200'
                }`}>
                  Beta Mode: <strong>ACTIVE</strong>
                </div>
                <p className="text-sm text-gray-600">
                  All premium features are currently free during beta. Change <code className="bg-white px-1 rounded">IS_BETA</code> in subscription.ts to disable.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex justify-between items-center">
              <span>System Error Logs</span>
              <div className="flex items-center gap-2">
                {systemErrors.length > 0 && (
                  <button
                    onClick={clearSystemErrors}
                    disabled={isLoadingErrors}
                    className="text-sm px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors disabled:opacity-50"
                  >
                    Clear All ({systemErrors.length})
                  </button>
                )}
                <button
                  onClick={loadSystemErrors}
                  disabled={isLoadingErrors}
                  className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors disabled:opacity-50"
                >
                  Refresh
                </button>
              </div>
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
              {/* AI Service Status */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">🤖 AI Service Status (Vory)</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-blue-700">Gemini API Key:</span>
                    <span className={`text-sm font-medium ${import.meta.env.VITE_GEMINI_API_KEY ? 'text-green-600' : 'text-red-600'}`}>
                      {import.meta.env.VITE_GEMINI_API_KEY ? '✓ Configured' : '✗ Not Set'}
                    </span>
                  </div>
                  {(() => {
                    try {
                      const failures = JSON.parse(localStorage.getItem('ai_api_failures') || '[]');
                      if (failures.length > 0) {
                        const lastFailure = failures[failures.length - 1];
                        return (
                          <div className="mt-2 p-2 bg-red-100 border border-red-300 rounded">
                            <p className="text-sm font-medium text-red-800">⚠️ Recent API Failures ({failures.length})</p>
                            <p className="text-xs text-red-600 mt-1">
                              Last: {new Date(lastFailure.timestamp).toLocaleString()} - {lastFailure.message}
                            </p>
                            <button
                              onClick={() => {
                                localStorage.removeItem('ai_api_failures');
                                window.location.reload();
                              }}
                              className="mt-2 text-xs text-red-700 underline hover:no-underline"
                            >
                              Clear failures
                            </button>
                          </div>
                        );
                      }
                      return <p className="text-sm text-green-600">✓ No recent failures</p>;
                    } catch {
                      return null;
                    }
                  })()}
                  <p className="text-xs text-blue-600 mt-2">
                    To update the API key, add VITE_GEMINI_API_KEY to GitHub Secrets and redeploy.
                  </p>
                </div>
              </div>

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
                <p className="text-sm text-gray-600">Project: {import.meta.env.VITE_FIREBASE_PROJECT_ID || 'Unknown'}</p>
                <p className="text-sm text-gray-500">Environment: {import.meta.env.VITE_ENVIRONMENT || 'development'}</p>
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
                        
                        // Clear local storage - including all dailyplan keys
                        localStorage.removeItem('voraprep_study_state');
                        localStorage.removeItem('voraprep_progress');
                        
                        // Clear all dailyplan_completed entries
                        const keysToRemove: string[] = [];
                        for (let i = 0; i < localStorage.length; i++) {
                          const key = localStorage.key(i);
                          if (key && key.startsWith('dailyplan_completed_')) {
                            keysToRemove.push(key);
                          }
                        }
                        keysToRemove.forEach(key => localStorage.removeItem(key));
                        
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

      {/* User Activity Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-primary-600 text-white p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">{selectedUser.email || 'Unknown User'}</h2>
                  <p className="text-blue-100 text-sm font-mono">{selectedUser.id}</p>
                  <div className="flex gap-3 mt-2 text-sm">
                    <span className="bg-white/20 px-2 py-1 rounded">{selectedUser.examSection || 'No section'}</span>
                    <span className="bg-white/20 px-2 py-1 rounded">{selectedUser.subscription?.tier || 'free'}</span>
                    {selectedUser.isAdmin && <span className="bg-amber-500 px-2 py-1 rounded">Admin</span>}
                  </div>
                </div>
                <button
                  onClick={() => { setSelectedUser(null); setUserActivity(null); }}
                  className="text-white/80 hover:text-white text-2xl leading-none"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {isLoadingActivity ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full" />
                  <span className="ml-3 text-gray-600">Loading activity data...</span>
                </div>
              ) : userActivity ? (
                <div className="space-y-6">
                  {/* Stats Summary */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-blue-700">{userActivity.stats.totalQuestions}</div>
                      <div className="text-sm text-blue-600">Questions Answered</div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-green-700">{userActivity.stats.overallAccuracy}%</div>
                      <div className="text-sm text-green-600">Accuracy</div>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-amber-700">{userActivity.stats.studyStreak}</div>
                      <div className="text-sm text-amber-600">Day Streak</div>
                    </div>
                    <div className="bg-primary-50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-primary-700">{Math.round(userActivity.stats.totalStudyMinutes / 60)}h</div>
                      <div className="text-sm text-primary-600">Study Time</div>
                    </div>
                  </div>

                  {/* Last Active */}
                  {userActivity.stats.lastActiveDate && (
                    <div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                      <strong>Last Active:</strong> {userActivity.stats.lastActiveDate}
                    </div>
                  )}

                  {/* Recent Daily Activity */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">📅 Recent Daily Activity</h4>
                    {userActivity.dailyLogs.length > 0 ? (
                      <div className="bg-gray-50 rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="p-2 text-left">Date</th>
                              <th className="p-2 text-center">Questions</th>
                              <th className="p-2 text-center">Correct</th>
                              <th className="p-2 text-center">Lessons</th>
                              <th className="p-2 text-center">Minutes</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userActivity.dailyLogs.slice(0, 10).map((log, i) => (
                              <tr key={i} className="border-t border-gray-200">
                                <td className="p-2">{log.date}</td>
                                <td className="p-2 text-center">{log.questionsAnswered || 0}</td>
                                <td className="p-2 text-center text-green-600">{log.correctAnswers || 0}</td>
                                <td className="p-2 text-center">{log.lessonsCompleted || 0}</td>
                                <td className="p-2 text-center">{log.studyMinutes || 0}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No daily activity recorded.</p>
                    )}
                  </div>

                  {/* Practice Sessions */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">📝 Recent Practice Sessions</h4>
                    {userActivity.practiceSessions.length > 0 ? (
                      <div className="space-y-2">
                        {userActivity.practiceSessions.slice(0, 5).map((session) => (
                          <div key={session.id} className="bg-gray-50 rounded-lg p-3 flex justify-between items-center">
                            <div>
                              <span className="font-medium">{session.section || 'Practice'}</span>
                              <span className="text-gray-500 text-sm ml-2">
                                {session.startedAt?.seconds 
                                  ? new Date(session.startedAt.seconds * 1000).toLocaleDateString()
                                  : 'Unknown date'}
                              </span>
                            </div>
                            <div className="flex gap-4 text-sm">
                              <span>{session.questionsAnswered || 0} Q</span>
                              <span className={session.accuracy >= 75 ? 'text-green-600' : session.accuracy >= 50 ? 'text-amber-600' : 'text-red-600'}>
                                {session.accuracy || 0}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No practice sessions recorded.</p>
                    )}
                  </div>

                  {/* AI Conversations */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">🤖 Vory Conversations</h4>
                    {userActivity.recentConversations.length > 0 ? (
                      <div className="space-y-2">
                        {userActivity.recentConversations.map((conv) => (
                          <div key={conv.id} className="bg-gray-50 rounded-lg p-3 flex justify-between items-center">
                            <span className="font-medium">{conv.title}</span>
                            <div className="text-sm text-gray-500">
                              {conv.messageCount} messages • 
                              {conv.updatedAt?.seconds 
                                ? new Date(conv.updatedAt.seconds * 1000).toLocaleDateString()
                                : ''}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No AI conversations.</p>
                    )}
                  </div>

                  {/* Recent Question History */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">❓ Recent Questions ({userActivity.questionHistory.length})</h4>
                    {userActivity.questionHistory.length > 0 ? (
                      <div className="bg-gray-50 rounded-lg p-3 max-h-48 overflow-y-auto">
                        <div className="flex flex-wrap gap-1">
                          {userActivity.questionHistory.slice(0, 50).map((q, i) => {
                            const isCorrect = q.lastCorrect === true || (q.timesCorrect ?? 0) > 0;
                            return (
                              <span 
                                key={i} 
                                className={`w-6 h-6 rounded text-xs flex items-center justify-center ${isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}
                                title={`${q.questionId} - ${isCorrect ? 'Correct' : 'Incorrect'} (${q.timesCorrect ?? 0}/${q.timesAnswered ?? 0})`}
                              >
                                {isCorrect ? '✓' : '✗'}
                              </span>
                            );
                          })}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Showing last {Math.min(50, userActivity.questionHistory.length)} of {userActivity.questionHistory.length} questions
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No question history.</p>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No activity data available. (userActivity: {userActivity ? 'exists' : 'null'}, isLoading: {isLoadingActivity ? 'true' : 'false'})</p>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t p-4 flex justify-end gap-3">
              <button
                onClick={() => { setSelectedUser(null); setUserActivity(null); }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCMS;

import { useState, useEffect, useCallback } from 'react';
import logger from '../../../utils/logger';
import { useAuth } from '../../../hooks/useAuth';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import { Navigate } from 'react-router-dom';
import { collection, query, orderBy, limit, getDocs, doc, writeBatch, updateDoc, where, getCountFromServer } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { FEATURES } from '../../../config/featureFlags';
import { CourseId } from '../../../types/course';
import { COURSES, getActiveCourses } from '../../../courses';

// Dynamic imports for course-specific question data
const loadCourseQuestionData = async (courseId: CourseId) => {
  switch (courseId) {
    case 'cpa': return import('../../../data/cpa/questions');
    case 'ea': return import('../../../data/ea/questions');
    case 'cma': return import('../../../data/cma/questions');
    case 'cia': return import('../../../data/cia/questions');
    case 'cisa': return import('../../../data/cisa/questions');
    case 'cfp': return import('../../../data/cfp/questions');
    default: return null;
  }
};

// Dynamic imports for flashcard data per course
const loadCourseFlashcardData = async (courseId: CourseId): Promise<number> => {
  try {
    switch (courseId) {
      case 'cpa': {
        const m = await import('../../../data/cpa/flashcards');
        return (m.CPA_FLASHCARDS?.length || 0) + (m.ALL_DEDICATED_FLASHCARDS?.length || 0);
      }
      case 'ea': {
        const m = await import('../../../data/ea/flashcards');
        return m.ALL_EA_FLASHCARDS?.length || 0;
      }
      case 'cma': {
        const m = await import('../../../data/cma/flashcards');
        return m.ALL_CMA_FLASHCARDS?.length || 0;
      }
      case 'cia': {
        const m = await import('../../../data/cia/flashcards');
        return m.ALL_CIA_FLASHCARDS?.length || 0;
      }
      case 'cisa': {
        const m = await import('../../../data/cisa/flashcards');
        return m.allCisaFlashcards?.length || 0;
      }
      case 'cfp': {
        const m = await import('../../../data/cfp/flashcards');
        return m.CFP_FLASHCARDS?.length || 0;
      }
      default: return 0;
    }
  } catch {
    return 0;
  }
};

// Dynamic imports for lesson data per course
const loadCourseLessonData = async (courseId: CourseId): Promise<number> => {
  try {
    switch (courseId) {
      case 'cpa': {
        const m = await import('../../../data/cpa/lessons');
        return m.getLessonStats?.()?.total || m.getAllLessons?.()?.length || 0;
      }
      case 'cma': {
        const m = await import('../../../data/cma/lessons');
        return m.getCMALessonCount?.()?.total || m.cmaLessons?.length || 0;
      }
      default: return 0; // Other courses may not have lesson indexes yet
    }
  } catch {
    return 0;
  }
};

// Course icon mapping
const getCourseIcon = (courseId: CourseId): string => {
  const icons: Record<CourseId, string> = {
    cpa: '📊',
    ea: '📋',
    cma: '💼',
    cia: '🔍',
    cisa: '🔒',
    cfp: '💰',
  };
  return icons[courseId] || '📚';
};

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
    // Legacy field names for backwards compatibility
    questionsAttempted?: number;
    questionsCorrect?: number;
    studyTimeMinutes?: number;
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
  byCourse: Record<string, number>;
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

interface QuestionReport {
  id: string;
  questionId: string;
  questionText?: string;
  courseId?: string;
  section?: string;
  blueprintArea?: string;
  type: string;
  details?: string;
  reportedBy: string;
  reportedByEmail?: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  createdAt?: { seconds: number; nanoseconds: number };
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

interface CourseContentStats {
  courseId: CourseId;
  courseName: string;
  questions: number;
  lessons: number;
  simulations: number;
  flashcards: number;
  essays?: number;
  bySection?: Record<string, number>;
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
  
  // Course selection state (TODO: add course filter dropdown later)
  // const [selectedCourse, setSelectedCourse] = useState<CourseId | 'all'>('all');
  const [allCourseStats, setAllCourseStats] = useState<CourseContentStats[]>([]);
  const [isLoadingCourseStats, setIsLoadingCourseStats] = useState(false);
  
  // Legacy single-course stats (kept for backwards compat, will remove later)
  const [localStats, setLocalStats] = useState<LocalStats | null>(null);
  const [lessonStats, setLessonStats] = useState<{ total: number; bySection: Record<string, number> } | null>(null);
  const [tbsStats, setTbsStats] = useState<{ total: number; bySection: Record<string, number>; byType?: Record<string, number> } | null>(null);
  const [wcStats, setWcStats] = useState<{ total: number; bySection: Record<string, number> } | null>(null);

  // New State for Users and Errors
  const [usersList, setUsersList] = useState<UserDocument[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserDocument[]>([]);
  const [userSearch, setUserSearch] = useState('');
  const [userFilter, setUserFilter] = useState<'all' | 'admin' | 'premium' | 'free' | 'trial'>('all');
  const [userCourseFilter, setUserCourseFilter] = useState<CourseId | 'all'>('all');
  const [systemErrors, setSystemErrors] = useState<SystemError[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingErrors, setIsLoadingErrors] = useState(false);
  
  // Question Reports state
  const [questionReports, setQuestionReports] = useState<QuestionReport[]>([]);
  const [isLoadingReports, setIsLoadingReports] = useState(false);

  // User Engagement state
  const [engagementStats, setEngagementStats] = useState<{
    mostActive: Array<{ email: string; questionsAnswered: number; lastActive: string }>;
    inactive: Array<{ email: string; daysSinceActive: number; joinedAt: string }>;
    averageQuestionsPerUser: number;
    usersWithActivity: number;
  } | null>(null);
  const [isLoadingEngagement, setIsLoadingEngagement] = useState(false);

  // Question Quality state
  const [qualityMetrics, setQualityMetrics] = useState<{
    mostReported: Array<{ questionId: string; reportCount: number; types: string[] }>;
    reportsByType: Record<string, number>;
    pendingCount: number;
  } | null>(null);

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

  // Stale accounts cleanup state
  const [staleAccounts, setStaleAccounts] = useState<UserDocument[]>([]);
  const [isLoadingStale, setIsLoadingStale] = useState(false);
  const [isDeletingStale, setIsDeletingStale] = useState(false);

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

  // Find stale accounts (incomplete onboarding, no activity in 7+ days)
  const findStaleAccounts = useCallback(async () => {
    if (!isAdmin) return;
    setIsLoadingStale(true);
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      // Query users with incomplete onboarding
      const q = query(
        collection(db, 'users'),
        where('onboardingComplete', '==', false),
        where('createdAt', '<=', sevenDaysAgo),
        limit(100)
      );
      const querySnapshot = await getDocs(q);
      const stale: UserDocument[] = [];
      querySnapshot.forEach((doc) => {
        stale.push({ id: doc.id, ...doc.data() } as UserDocument);
      });
      setStaleAccounts(stale);
      addLog(`Found ${stale.length} stale accounts (incomplete onboarding, 7+ days old)`, stale.length > 0 ? 'warning' : 'info');
    } catch (error) {
      logger.error('Error finding stale accounts', error);
      addLog('Error finding stale accounts: ' + (error instanceof Error ? error.message : String(error)), 'error');
    } finally {
      setIsLoadingStale(false);
    }
  }, [isAdmin]);

  // Delete stale accounts (Firestore only - doesn't delete from Auth)
  const deleteStaleAccounts = useCallback(async () => {
    if (!isAdmin || staleAccounts.length === 0) return;
    
    const confirmed = window.confirm(
      `Are you sure you want to delete ${staleAccounts.length} stale accounts?\n\n` +
      `This will remove their Firestore data. They can re-register if needed.\n\n` +
      `This action cannot be undone.`
    );
    
    if (!confirmed) return;
    
    setIsDeletingStale(true);
    try {
      const batch = writeBatch(db);
      let count = 0;
      
      for (const account of staleAccounts) {
        batch.delete(doc(db, 'users', account.id));
        count++;
        // Firebase batch limit is 500
        if (count >= 500) break;
      }
      
      await batch.commit();
      addLog(`Deleted ${count} stale accounts from Firestore`, 'success');
      setStaleAccounts([]);
      
      // Refresh users list
      await loadUsers();
    } catch (error) {
      logger.error('Error deleting stale accounts', error);
      addLog('Error deleting stale accounts: ' + (error instanceof Error ? error.message : String(error)), 'error');
    } finally {
      setIsDeletingStale(false);
    }
  }, [isAdmin, staleAccounts, loadUsers]);

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
    
    // Apply subscription filter
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
    
    // Apply course filter
    if (userCourseFilter !== 'all') {
      result = result.filter(u => {
        const userCourse = (u as typeof u & { courseId?: string }).courseId || 'cpa';
        return userCourse === userCourseFilter;
      });
    }
    
    setFilteredUsers(result);
  }, [usersList, userSearch, userFilter, userCourseFilter]);

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
      
      // Track by course and section dynamically
      const byCourse: Record<string, number> = {};
      const bySection: Record<string, number> = {};
      const bySubscription: Record<string, number> = { free: 0, monthly: 0, quarterly: 0, annual: 0, lifetime: 0 };

      // Initialize course counts
      getActiveCourses().forEach(course => {
        byCourse[course.id] = 0;
      });

      users.forEach(u => {
        const createdAt = u.createdAt ? new Date(u.createdAt.seconds * 1000) : null;
        
        // Count by course (new courseId field or default to 'cpa')
        const courseId = (u as typeof u & { courseId?: string }).courseId || 'cpa';
        if (byCourse[courseId] !== undefined) {
          byCourse[courseId]++;
        } else {
          byCourse[courseId] = 1;
        }
        
        // Count by section dynamically
        if (u.examSection) {
          bySection[u.examSection] = (bySection[u.examSection] || 0) + 1;
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
        byCourse,
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
    logger.log('loadUserActivity called', { isAdmin, userId: userDoc.id });
    if (!isAdmin) {
      logger.log('Not admin, returning early');
      return;
    }
    setSelectedUser(userDoc);
    setIsLoadingActivity(true);
    setUserActivity(null);
    
    try {
      const userId = userDoc.id;
      logger.log('Starting to fetch activity for userId:', userId);
      
      // Load question history (all - no orderBy to avoid index requirements)
      const questionHistoryRef = collection(db, 'users', userId, 'question_history');
      logger.log('Fetching question_history...');
      const questionHistorySnap = await getDocs(questionHistoryRef);
      logger.log('Got question_history:', questionHistorySnap.docs.length, 'docs');
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
      logger.log('Got daily_log:', dailyLogSnap.docs.length, 'docs');
      const dailyLogs = dailyLogSnap.docs.map(doc => ({
        date: doc.id,
        ...doc.data()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      })) as any[];
      dailyLogs.sort((a, b) => b.date.localeCompare(a.date));
      
      // Load practice sessions (all - sort in memory)
      const sessionsRef = collection(db, 'users', userId, 'practice_sessions');
      const sessionsSnap = await getDocs(sessionsRef);
      logger.log('Got practice_sessions:', sessionsSnap.docs.length, 'docs');
      const practiceSessions = sessionsSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      })) as any[];
      practiceSessions.sort((a, b) => (b.startedAt?.seconds || 0) - (a.startedAt?.seconds || 0));
      
      // Load recent AI conversations (all - sort in memory)
      const conversationsRef = collection(db, 'users', userId, 'conversations');
      const conversationsSnap = await getDocs(conversationsRef);
      logger.log('Got conversations:', conversationsSnap.docs.length, 'docs');
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
      
      logger.log('Setting user activity:', {
        questionHistory: questionHistory.length,
        dailyLogs: dailyLogs.length,
        practiceSessions: practiceSessions.length,
        recentConversations: recentConversations.length,
        stats: activityData.stats
      });
      
      setUserActivity(activityData);
      
      addLog(`Loaded activity for ${userDoc.email || userId}`, 'success');
    } catch (error) {
      logger.error('Error loading user activity:', error);
      logger.error('Error loading user activity', error);
      addLog('Error loading activity: ' + (error instanceof Error ? error.message : String(error)), 'error');
      // Still set loading to false so modal shows error state
    } finally {
      logger.log('loadUserActivity finished, isLoadingActivity set to false');
      setIsLoadingActivity(false);
    }
  }, [isAdmin]);

  // Toggle admin status for a user
  const toggleAdminStatus = async (userId: string, currentIsAdmin: boolean) => {
    logger.log('toggleAdminStatus called:', { userId, currentIsAdmin, isAdmin });
    if (!isAdmin) {
      logger.log('Not admin, aborting');
      return;
    }
    const confirmMsg = currentIsAdmin 
      ? 'Remove admin privileges from this user?' 
      : 'Grant admin privileges to this user?';
    if (!window.confirm(confirmMsg)) return;
    
    try {
      const userRef = doc(db, 'users', userId);
      logger.log('Updating user doc with isAdmin:', !currentIsAdmin);
      await updateDoc(userRef, { isAdmin: !currentIsAdmin });
      logger.log('Update successful');
      addLog(`Admin status ${currentIsAdmin ? 'removed from' : 'granted to'} user ${userId}`, 'success');
      loadUsers();
    } catch (error) {
      logger.error('toggleAdminStatus error:', error);
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

  // Load Question Reports
  const loadQuestionReports = useCallback(async () => {
    if (!isAdmin) return;
    setIsLoadingReports(true);
    try {
      const q = query(
        collection(db, 'questionReports'),
        orderBy('createdAt', 'desc'),
        limit(50)
      );
      const querySnapshot = await getDocs(q);
      const reports: QuestionReport[] = [];
      querySnapshot.forEach((docSnap) => {
        reports.push({ id: docSnap.id, ...docSnap.data() } as QuestionReport);
      });
      setQuestionReports(reports);
      addLog(`Loaded ${reports.length} question reports`, 'info');
    } catch (error) {
      logger.error('Error loading question reports', error);
      // Try without orderBy if index doesn't exist
      if (String(error).includes('index')) {
        addLog('Index missing for questionReports. Fetching without sort.', 'warning');
        const qFallback = query(collection(db, 'questionReports'), limit(50));
        const qsFallback = await getDocs(qFallback);
        const reportsFallback: QuestionReport[] = [];
        qsFallback.forEach((docSnap) => {
          reportsFallback.push({ id: docSnap.id, ...docSnap.data() } as QuestionReport);
        });
        setQuestionReports(reportsFallback);
      } else {
        addLog('Error loading reports: ' + (error instanceof Error ? error.message : String(error)), 'error');
      }
    } finally {
      setIsLoadingReports(false);
    }
  }, [isAdmin]);

  // Update report status
  const updateReportStatus = useCallback(async (reportId: string, newStatus: 'reviewed' | 'resolved' | 'dismissed') => {
    if (!isAdmin) return;
    try {
      await updateDoc(doc(db, 'questionReports', reportId), { 
        status: newStatus,
        reviewedAt: new Date(),
        reviewedBy: user?.email || 'admin'
      });
      setQuestionReports(prev => prev.map(r => 
        r.id === reportId ? { ...r, status: newStatus } : r
      ));
      addLog(`Report ${reportId} marked as ${newStatus}`, 'success');
    } catch (error) {
      logger.error('Error updating report status', error);
      addLog('Failed to update report status', 'error');
    }
  }, [isAdmin, user?.email]);

  // Load user engagement stats
  const loadEngagementStats = useCallback(async () => {
    if (!isAdmin || usersList.length === 0) return;
    setIsLoadingEngagement(true);
    try {
      const now = new Date();
      const usersWithQuestionHistory: Array<{ email: string; questionsAnswered: number; lastActive: string }> = [];
      const inactiveUsers: Array<{ email: string; daysSinceActive: number; joinedAt: string }> = [];
      
      // For each user, check activity from their questionHistory subcollection
      for (const user of usersList.slice(0, 50)) { // Limit to first 50 for performance
        try {
          const historyRef = collection(db, 'users', user.id, 'questionHistory');
          const historySnap = await getDocs(query(historyRef, limit(100)));
          const questionsAnswered = historySnap.size;
          
          if (questionsAnswered > 0) {
            // Find most recent activity
            let lastActive = user.createdAt ? new Date(user.createdAt.seconds * 1000) : new Date(0);
            historySnap.forEach(docSnap => {
              const data = docSnap.data();
              if (data.answeredAt?.seconds) {
                const answered = new Date(data.answeredAt.seconds * 1000);
                if (answered > lastActive) lastActive = answered;
              }
            });
            usersWithQuestionHistory.push({
              email: user.email || user.id.slice(0, 8),
              questionsAnswered,
              lastActive: lastActive.toLocaleDateString()
            });
          } else {
            // User has no activity
            const joinedDate = user.createdAt ? new Date(user.createdAt.seconds * 1000) : now;
            const daysSinceActive = Math.floor((now.getTime() - joinedDate.getTime()) / (1000 * 60 * 60 * 24));
            if (daysSinceActive > 7) { // Inactive if no activity and joined > 7 days ago
              inactiveUsers.push({
                email: user.email || user.id.slice(0, 8),
                daysSinceActive,
                joinedAt: joinedDate.toLocaleDateString()
              });
            }
          }
        } catch {
          // Skip users with access issues
        }
      }
      
      // Sort and limit
      usersWithQuestionHistory.sort((a, b) => b.questionsAnswered - a.questionsAnswered);
      inactiveUsers.sort((a, b) => b.daysSinceActive - a.daysSinceActive);
      
      const totalQuestions = usersWithQuestionHistory.reduce((sum, u) => sum + u.questionsAnswered, 0);
      
      setEngagementStats({
        mostActive: usersWithQuestionHistory.slice(0, 10),
        inactive: inactiveUsers.slice(0, 10),
        averageQuestionsPerUser: usersWithQuestionHistory.length > 0 
          ? Math.round(totalQuestions / usersWithQuestionHistory.length) 
          : 0,
        usersWithActivity: usersWithQuestionHistory.length
      });
      addLog('Loaded engagement stats', 'success');
    } catch (error) {
      logger.error('Error loading engagement stats', error);
      addLog('Error loading engagement stats', 'error');
    } finally {
      setIsLoadingEngagement(false);
    }
  }, [isAdmin, usersList]);

  // Load question quality metrics from reports
  const loadQualityMetrics = useCallback(() => {
    if (questionReports.length === 0) {
      setQualityMetrics(null);
      return;
    }
    
    // Aggregate reports by questionId
    const byQuestion: Record<string, { count: number; types: Set<string> }> = {};
    const byType: Record<string, number> = {};
    let pendingCount = 0;
    
    questionReports.forEach(report => {
      // By question
      if (!byQuestion[report.questionId]) {
        byQuestion[report.questionId] = { count: 0, types: new Set() };
      }
      byQuestion[report.questionId].count++;
      byQuestion[report.questionId].types.add(report.type);
      
      // By type
      byType[report.type] = (byType[report.type] || 0) + 1;
      
      // Pending count
      if (report.status === 'pending') pendingCount++;
    });
    
    // Convert to sorted array
    const mostReported = Object.entries(byQuestion)
      .map(([questionId, data]) => ({
        questionId,
        reportCount: data.count,
        types: Array.from(data.types)
      }))
      .sort((a, b) => b.reportCount - a.reportCount)
      .slice(0, 10);
    
    setQualityMetrics({
      mostReported,
      reportsByType: byType,
      pendingCount
    });
  }, [questionReports]);

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

  // Auto-compute quality metrics when reports change
  useEffect(() => {
    loadQualityMetrics();
  }, [questionReports, loadQualityMetrics]);

  // Load question stats for all courses
  useEffect(() => {
    const loadAllCourseStats = async () => {
      setIsLoadingCourseStats(true);
      const enabledCourses = getActiveCourses();
      const stats: CourseContentStats[] = [];
      
      for (const course of enabledCourses) {
        try {
          const questionModule = await loadCourseQuestionData(course.id);
          const flashcardCount = await loadCourseFlashcardData(course.id);
          const lessonCount = await loadCourseLessonData(course.id);
          
          // Type-safe check for getQuestionStats function
          const getStatsFn = (questionModule as { getQuestionStats?: () => LocalStats })?.getQuestionStats;
          if (getStatsFn) {
            const qStats = getStatsFn();
            stats.push({
              courseId: course.id,
              courseName: course.name,
              questions: qStats.total || 0,
              lessons: lessonCount,
              simulations: 0,
              flashcards: flashcardCount,
              bySection: qStats.bySection || {},
            });
          } else {
            // Fallback for courses without getQuestionStats - count ALL_QUESTIONS
            const allQuestions = (questionModule as { ALL_QUESTIONS?: unknown[] })?.ALL_QUESTIONS;
            stats.push({
              courseId: course.id,
              courseName: course.name,
              questions: allQuestions?.length || 0,
              lessons: lessonCount,
              simulations: 0,
              flashcards: flashcardCount,
            });
          }
        } catch (error) {
          logger.error(`Error loading stats for ${course.id}:`, error);
          stats.push({
            courseId: course.id,
            courseName: course.name,
            questions: 0,
            lessons: 0,
            simulations: 0,
            flashcards: 0,
          });
        }
      }
      
      setAllCourseStats(stats);
      setIsLoadingCourseStats(false);
      
      // Also load CPA-specific stats for backward compatibility
      try {
        const questionModule = await loadCourseQuestionData('cpa');
        const getStatsFn = (questionModule as { getQuestionStats?: () => LocalStats })?.getQuestionStats;
        if (getStatsFn) {
          setLocalStats(getStatsFn());
        }
        
        const lessonModule = await import('../../../data/cpa/lessons');
        const lessonData = lessonModule.getLessonStats();
        setLessonStats({ total: lessonData.total, bySection: lessonData.bySection });
        
        const tbsModule = await import('../../../data/cpa/tbs');
        const tbsData = tbsModule.getTBSStats();
        setTbsStats({ total: tbsData.total, bySection: tbsData.bySection, byType: tbsData.byType });
        
        // WC was retired with BEC on December 15, 2023
        setWcStats({ total: 0, bySection: {} });
      } catch (error) {
        logger.error('Error loading CPA content stats:', error);
      }
    };
    loadAllCourseStats();
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
              <p className="text-sm text-gray-600">Content Management System</p>
            </div>
            <div className="text-sm text-gray-600">Logged in as: {user.email}</div>
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
                  : 'text-gray-600 hover:text-gray-700'
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
            {/* Aggregate Totals Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 shadow-lg text-white">
              <h3 className="text-lg font-semibold mb-3">Content Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    {allCourseStats.reduce((sum, c) => sum + c.questions, 0).toLocaleString()}
                  </div>
                  <div className="text-primary-200 text-sm">Total Questions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    {allCourseStats.reduce((sum, c) => sum + c.lessons, 0).toLocaleString()}
                  </div>
                  <div className="text-primary-200 text-sm">Total Lessons</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    {allCourseStats.reduce((sum, c) => sum + c.flashcards, 0).toLocaleString()}
                  </div>
                  <div className="text-primary-200 text-sm">Total Flashcards</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    {getActiveCourses().length}
                  </div>
                  <div className="text-primary-200 text-sm">Active Courses</div>
                </div>
              </div>
            </div>

            {/* All Courses Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoadingCourseStats ? (
                <>
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <Card key={i} className="p-6 animate-pulse">
                      <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                      <div className="h-10 bg-gray-200 rounded w-1/3 mb-3"></div>
                      <div className="h-4 bg-gray-100 rounded w-full"></div>
                    </Card>
                  ))}
                </>
              ) : (
                allCourseStats.map(course => {
                  const colorClass = course.courseId === 'cpa' ? 'text-blue-600' :
                                     course.courseId === 'ea' ? 'text-green-600' :
                                     course.courseId === 'cma' ? 'text-purple-600' :
                                     course.courseId === 'cia' ? 'text-orange-600' :
                                     course.courseId === 'cisa' ? 'text-teal-600' :
                                     'text-amber-600';
                  return (
                    <Card key={course.courseId} className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">{getCourseIcon(course.courseId)}</span>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {course.courseName}
                        </h3>
                      </div>
                      <div className={`text-3xl font-bold ${colorClass} mb-3`}>
                        {course.questions.toLocaleString()}
                        <span className="text-sm font-normal text-gray-500 ml-2">questions</span>
                      </div>
                      {/* Content metrics row */}
                      <div className="flex gap-4 text-sm text-gray-600 mb-3">
                        {course.lessons > 0 && (
                          <span>📚 {course.lessons} lessons</span>
                        )}
                        {course.flashcards > 0 && (
                          <span>🎴 {course.flashcards} flashcards</span>
                        )}
                      </div>
                      {course.bySection && Object.keys(course.bySection).length > 0 && (
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {Object.entries(course.bySection).slice(0, 6).map(([section, count]) => (
                            <div key={section} className="flex justify-between p-2 bg-gray-50 rounded">
                              <span className="font-medium truncate">{section}</span>
                              <span className="text-gray-600">{count}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {course.questions === 0 && (
                        <div className="text-sm text-amber-600 mt-2">
                          ⚠️ No questions loaded
                        </div>
                      )}
                    </Card>
                  );
                })
              )}
            </div>

            {/* CPA Detailed Stats (backward compatibility) */}
            {localStats && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">CPA Detailed Stats</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Questions */}
                  <Card className="p-6">
                    <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span>❓</span> Questions (MCQ)
                    </h4>
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {localStats.total.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600">
                      {localStats.byDifficulty.easy} easy / {localStats.byDifficulty.medium} medium / {localStats.byDifficulty.hard} hard
                    </div>
                  </Card>

                  {/* Lessons */}
                  {lessonStats && (
                    <Card className="p-6">
                      <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span>📚</span> Lessons
                      </h4>
                      <div className="text-3xl font-bold text-green-600">
                        {lessonStats.total.toLocaleString()}
                      </div>
                    </Card>
                  )}

                  {/* TBS */}
                  {tbsStats && (
                    <Card className="p-6">
                      <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span>📊</span> Task-Based Simulations
                      </h4>
                      <div className="text-3xl font-bold text-orange-600">
                        {tbsStats.total.toLocaleString()}
                      </div>
                    </Card>
                  )}

                  {/* Written Communication */}
                  {wcStats && (
                    <Card className="p-6">
                      <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span>✍️</span> Written Communication
                      </h4>
                      <div className="text-3xl font-bold text-primary-600">
                        {wcStats.total.toLocaleString()}
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* User Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{usersList.length}</div>
                <div className="text-sm text-gray-600">Total Users</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary-600">{usersList.filter(u => u.isAdmin).length}</div>
                <div className="text-sm text-gray-600">Admins</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {usersList.filter(u => u.subscription?.tier && ['monthly', 'quarterly', 'annual', 'lifetime'].includes(u.subscription.tier)).length}
                </div>
                <div className="text-sm text-gray-600">Premium</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-amber-600">
                  {usersList.filter(u => u.subscription?.status === 'trialing').length}
                </div>
                <div className="text-sm text-gray-600">Trial</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {usersList.filter(u => !u.subscription?.tier || u.subscription.tier === 'free').length}
                </div>
                <div className="text-sm text-gray-600">Free</div>
              </Card>
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
                      <p className="text-sm text-gray-600 font-mono">{lookupResult.id}</p>
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
            <Card className="p-6">
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
                  {/* Course Filter */}
                  <select
                    value={userCourseFilter}
                    onChange={(e) => setUserCourseFilter(e.target.value as CourseId | 'all')}
                    className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Courses</option>
                    {getActiveCourses().map(course => (
                      <option key={course.id} value={course.id}>
                        {course.shortName || course.name}
                      </option>
                    ))}
                  </select>
                  <span className="text-sm text-gray-600">
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
                  <p className="text-gray-600">Loading users...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="p-3 font-medium text-gray-600">Email</th>
                        <th className="p-3 font-medium text-gray-600">Course</th>
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
                          <td colSpan={7} className="p-4 text-center text-gray-600">
                            {userSearch || userFilter !== 'all' ? 'No users match your criteria.' : 'No users found.'}
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.slice(0, 100).map((u) => (
                          <tr key={u.id} className="hover:bg-gray-50">
                            <td className="p-3">
                              <div className="font-medium text-sm">{u.email || '—'}</div>
                              <div className="text-xs text-gray-600 font-mono">{u.id.slice(0, 12)}...</div>
                            </td>
                            <td className="p-3">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                ((u as typeof u & { courseId?: string }).courseId || 'cpa') === 'cpa' ? 'bg-blue-50 text-blue-700' :
                                ((u as typeof u & { courseId?: string }).courseId) === 'ea' ? 'bg-green-50 text-green-700' :
                                ((u as typeof u & { courseId?: string }).courseId) === 'cma' ? 'bg-purple-50 text-purple-700' :
                                ((u as typeof u & { courseId?: string }).courseId) === 'cia' ? 'bg-orange-50 text-orange-700' :
                                ((u as typeof u & { courseId?: string }).courseId) === 'cisa' ? 'bg-teal-50 text-teal-700' :
                                'bg-amber-50 text-amber-700'
                              }`}>
                                {((u as typeof u & { courseId?: string }).courseId || 'cpa').toUpperCase()}
                              </span>
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
                    <p className="text-center text-sm text-gray-600 mt-4">
                      Showing first 100 of {filteredUsers.length} users. Use search to find specific users.
                    </p>
                  )}
                </div>
              )}
            </Card>
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
                <p className="text-gray-600">Calculating analytics...</p>
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
                  {/* Users by Course */}
                  <Card className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Users by Course</h4>
                    <div className="space-y-3">
                      {Object.entries(analytics.byCourse || {})
                        .filter(([, count]) => count > 0)
                        .sort((a, b) => b[1] - a[1])
                        .map(([courseId, count]) => {
                          const percentage = analytics.totalUsers > 0 ? (count / analytics.totalUsers * 100) : 0;
                          const courseConfig = COURSES[courseId as CourseId];
                          const colorClass = courseId === 'cpa' ? 'bg-blue-600' :
                                             courseId === 'ea' ? 'bg-green-600' :
                                             courseId === 'cma' ? 'bg-purple-600' :
                                             courseId === 'cia' ? 'bg-orange-600' :
                                             courseId === 'cisa' ? 'bg-teal-600' :
                                             'bg-amber-600';
                          return (
                            <div key={courseId}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium flex items-center gap-1.5">
                                  <span>{getCourseIcon(courseId as CourseId)}</span>
                                  {courseConfig?.name || courseId.toUpperCase()}
                                </span>
                                <span className="text-gray-600">{count} ({percentage.toFixed(1)}%)</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`${colorClass} h-2 rounded-full transition-all duration-500`} 
                                  style={{ width: `${Math.min(percentage * 2, 100)}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      {Object.entries(analytics.byCourse || {}).filter(([, count]) => count > 0).length === 0 && (
                        <p className="text-gray-600 text-sm">No course data yet - users will have courseId tracked</p>
                      )}
                    </div>
                  </Card>

                  {/* Users by Subscription */}
                  <Card className="p-6">
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
                  </Card>
                </div>

                {/* Quick Stats */}
                <Card className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Quick Stats</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{analytics.activeToday}</div>
                      <div className="text-xs text-gray-600">Active Today</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {analytics.totalUsers > 0 ? ((analytics.activeThisWeek / analytics.totalUsers) * 100).toFixed(1) : 0}%
                      </div>
                      <div className="text-xs text-gray-600">WAU Rate</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-primary-600">
                        {analytics.totalUsers > 0 ? ((analytics.activeThisMonth / analytics.totalUsers) * 100).toFixed(1) : 0}%
                      </div>
                      <div className="text-xs text-gray-600">MAU Rate</div>
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
                      <div className="text-xs text-gray-600">Conversion Rate</div>
                    </div>
                  </div>
                </Card>

                {/* User Engagement Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Most Active Users */}
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">🏆 Most Active Users</h4>
                      <button
                        onClick={loadEngagementStats}
                        disabled={isLoadingEngagement || usersList.length === 0}
                        className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 disabled:opacity-50"
                      >
                        {isLoadingEngagement ? 'Loading...' : 'Load'}
                      </button>
                    </div>
                    {engagementStats ? (
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600 mb-3">
                          {engagementStats.usersWithActivity} users with activity • Avg {engagementStats.averageQuestionsPerUser} questions/user
                        </div>
                        {engagementStats.mostActive.length > 0 ? (
                          engagementStats.mostActive.map((user, i) => (
                            <div key={i} className="flex justify-between items-center p-2 bg-gray-50 rounded text-sm">
                              <span className="font-medium truncate flex-1">{user.email}</span>
                              <span className="text-green-600 font-semibold ml-2">{user.questionsAnswered} Q</span>
                              <span className="text-gray-500 text-xs ml-2">{user.lastActive}</span>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm">No activity data found</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">
                        {usersList.length === 0 ? 'Load users first (Users tab)' : 'Click Load to fetch engagement data'}
                      </p>
                    )}
                  </Card>

                  {/* Inactive Users */}
                  <Card className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">😴 Inactive Users</h4>
                    {engagementStats ? (
                      <div className="space-y-2">
                        {engagementStats.inactive.length > 0 ? (
                          engagementStats.inactive.map((user, i) => (
                            <div key={i} className="flex justify-between items-center p-2 bg-gray-50 rounded text-sm">
                              <span className="font-medium truncate flex-1">{user.email}</span>
                              <span className="text-amber-600 font-semibold ml-2">{user.daysSinceActive}d</span>
                              <span className="text-gray-500 text-xs ml-2">joined {user.joinedAt}</span>
                            </div>
                          ))
                        ) : (
                          <p className="text-green-600 text-sm">🎉 No inactive users! Everyone is engaged.</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">Load engagement data to see inactive users</p>
                    )}
                  </Card>
                </div>

                {/* Question Quality Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Most Reported Questions */}
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">⚠️ Most Reported Questions</h4>
                      <button
                        onClick={loadQuestionReports}
                        disabled={isLoadingReports}
                        className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 disabled:opacity-50"
                      >
                        {isLoadingReports ? 'Loading...' : 'Refresh'}
                      </button>
                    </div>
                    {qualityMetrics ? (
                      <div className="space-y-2">
                        <div className="text-sm text-amber-600 mb-3">
                          {qualityMetrics.pendingCount} pending reports to review
                        </div>
                        {qualityMetrics.mostReported.length > 0 ? (
                          qualityMetrics.mostReported.slice(0, 5).map((q, i) => (
                            <div key={i} className="p-2 bg-gray-50 rounded text-sm">
                              <div className="flex justify-between items-center">
                                <span className="font-mono text-xs truncate flex-1">{q.questionId.slice(0, 20)}...</span>
                                <span className="text-red-600 font-semibold ml-2">{q.reportCount}x</span>
                              </div>
                              <div className="flex gap-1 mt-1">
                                {q.types.map(type => (
                                  <span key={type} className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">
                                    {type.replace(/_/g, ' ')}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-green-600 text-sm">🎉 No reported questions!</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">Load reports to see quality metrics</p>
                    )}
                  </Card>

                  {/* Reports by Type */}
                  <Card className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">📊 Reports by Type</h4>
                    {qualityMetrics && Object.keys(qualityMetrics.reportsByType).length > 0 ? (
                      <div className="space-y-3">
                        {Object.entries(qualityMetrics.reportsByType)
                          .sort((a, b) => b[1] - a[1])
                          .map(([type, count]) => {
                            const total = Object.values(qualityMetrics.reportsByType).reduce((a, b) => a + b, 0);
                            const percentage = (count / total) * 100;
                            const colorClass = type === 'incorrect_answer' ? 'bg-red-500' :
                                               type === 'unclear_question' ? 'bg-amber-500' :
                                               type === 'typo' ? 'bg-blue-500' :
                                               'bg-gray-500';
                            return (
                              <div key={type}>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="font-medium">{type.replace(/_/g, ' ')}</span>
                                  <span className="text-gray-600">{count}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`${colorClass} h-2 rounded-full transition-all duration-500`} 
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No report data available</p>
                    )}
                  </Card>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-gray-600">
                Click Refresh to load analytics data
              </div>
            )}
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="space-y-6">
            {/* Feature Flags */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                🎛️ Feature Flags
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">Read-only Preview</span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
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
                      <p className="text-xs text-gray-600 mt-0.5">
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
            </Card>

            {/* Question Reports */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">📋 Question Reports</h3>
                <div className="flex gap-2">
                  <span className="text-sm text-gray-600">
                    {questionReports.filter(r => r.status === 'pending').length} pending
                  </span>
                  <Button
                    onClick={loadQuestionReports}
                    disabled={isLoadingReports}
                    variant="primary"
                    size="sm"
                    loading={isLoadingReports}
                  >
                    Refresh
                  </Button>
                </div>
              </div>
              
              {questionReports.length === 0 ? (
                <p className="text-sm text-gray-600 text-center py-8">
                  No question reports yet. Click Refresh to load.
                </p>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {questionReports.map((report) => (
                    <div 
                      key={report.id} 
                      className={`p-4 rounded-lg border ${
                        report.status === 'pending' ? 'bg-amber-50 border-amber-200' :
                        report.status === 'resolved' ? 'bg-green-50 border-green-200' :
                        report.status === 'dismissed' ? 'bg-gray-50 border-gray-200' :
                        'bg-blue-50 border-blue-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              report.type === 'incorrect_answer' ? 'bg-red-100 text-red-700' :
                              report.type === 'unclear_question' ? 'bg-amber-100 text-amber-700' :
                              report.type === 'typo' ? 'bg-blue-100 text-blue-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {report.type.replace(/_/g, ' ')}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-xs ${
                              report.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                              report.status === 'resolved' ? 'bg-green-100 text-green-700' :
                              report.status === 'reviewed' ? 'bg-blue-100 text-blue-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {report.status}
                            </span>
                            <span className="text-xs text-gray-600">
                              {report.courseId && <span className="font-medium">{report.courseId.toUpperCase()} • </span>}
                              {report.section} • {report.blueprintArea}
                            </span>
                          </div>
                          <p className="text-sm text-gray-900 line-clamp-2">
                            Q: {report.questionText || report.questionId}
                          </p>
                          {report.details && (
                            <p className="text-xs text-gray-600 mt-1">
                              Details: {report.details}
                            </p>
                          )}
                          <p className="text-xs text-gray-600 mt-1">
                            By: {report.reportedByEmail || report.reportedBy}
                            {report.createdAt && ` • ${new Date(report.createdAt.seconds * 1000).toLocaleDateString()}`}
                          </p>
                        </div>
                        {report.status === 'pending' && (
                          <div className="flex gap-1 flex-shrink-0">
                            <button
                              onClick={() => updateReportStatus(report.id, 'resolved')}
                              className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                              title="Mark as resolved"
                            >
                              ✓
                            </button>
                            <button
                              onClick={() => updateReportStatus(report.id, 'dismissed')}
                              className="px-2 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700"
                              title="Dismiss"
                            >
                              ✕
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* System Tools */}
            <Card className="p-6">
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
                  <p className="text-xs text-gray-600">
                    When enabled, shows maintenance message to non-admin users.
                  </p>
                </div>

                {/* Cache Refresh */}
                <div className="p-4 rounded-lg border bg-gray-50 border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Clear Local Cache</h4>
                    <Button
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
                      variant="primary"
                      size="sm"
                    >
                      Clear Cache
                    </Button>
                  </div>
                  <p className="text-xs text-gray-600">
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
                  <p className="text-xs text-gray-600">
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
                  <p className="text-xs text-gray-600">
                    Download user list as CSV file.
                  </p>
                </div>

                {/* Stale Account Cleanup */}
                <div className="p-4 rounded-lg border bg-red-50 border-red-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">🧹 Stale Account Cleanup</h4>
                    <div className="flex gap-2">
                      <Button
                        onClick={findStaleAccounts}
                        disabled={isLoadingStale}
                        variant="primary"
                        size="sm"
                        loading={isLoadingStale}
                      >
                        Find Stale
                      </Button>
                      {staleAccounts.length > 0 && (
                        <Button
                          onClick={deleteStaleAccounts}
                          disabled={isDeletingStale}
                          variant="danger"
                          size="sm"
                          loading={isDeletingStale}
                        >
                          Delete {staleAccounts.length}
                        </Button>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">
                    Find accounts with incomplete onboarding (7+ days old) and remove them.
                  </p>
                  {staleAccounts.length > 0 && (
                    <div className="mt-3 max-h-40 overflow-y-auto">
                      <div className="text-xs text-gray-500 mb-1">Preview ({staleAccounts.length} accounts):</div>
                      <div className="space-y-1">
                        {staleAccounts.slice(0, 10).map(acc => (
                          <div key={acc.id} className="text-xs bg-white rounded px-2 py-1 flex justify-between">
                            <span className="text-gray-700">{acc.email || acc.displayName || 'No email'}</span>
                            <span className="text-gray-400">
                              {acc.createdAt ? new Date(acc.createdAt.seconds * 1000).toLocaleDateString() : 'Unknown date'}
                            </span>
                          </div>
                        ))}
                        {staleAccounts.length > 10 && (
                          <div className="text-xs text-gray-500 italic">
                            ...and {staleAccounts.length - 10} more
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>

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
          <Card className="p-6">
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
                <p className="text-gray-600">Loading logs...</p>
              </div>
            ) : (
              <div className="space-y-4">
                 {systemErrors.length === 0 ? (
                    <p className="text-gray-600 text-center py-8">No errors logged in the system.</p>
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
          </Card>
        )}

        {activeTab === 'settings' && (
          <Card className="p-6">
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
                <ul className="text-sm text-gray-600 list-disc list-inside">
                  {ADMIN_EMAILS.map((email) => (
                    <li key={email}>{email}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Firebase Project</h4>
                <p className="text-sm text-gray-600">Project: {import.meta.env.VITE_FIREBASE_PROJECT_ID || 'Unknown'}</p>
                <p className="text-sm text-gray-600">Environment: {import.meta.env.VITE_ENVIRONMENT || 'development'}</p>
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
                  <Button
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
                    variant="danger"
                  >
                    🔄 Reset My Account
                  </Button>
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
          </Card>
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
                                <td className="p-2 text-center">{log.questionsAttempted || log.questionsAnswered || 0}</td>
                                <td className="p-2 text-center text-green-600">{log.questionsCorrect || log.correctAnswers || 0}</td>
                                <td className="p-2 text-center">{log.lessonsCompleted || 0}</td>
                                <td className="p-2 text-center">{log.studyTimeMinutes || log.studyMinutes || 0}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-gray-600 text-sm">No daily activity recorded.</p>
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
                              <span className="text-gray-600 text-sm ml-2">
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
                      <p className="text-gray-600 text-sm">No practice sessions recorded.</p>
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
                            <div className="text-sm text-gray-600">
                              {conv.messageCount} messages • 
                              {conv.updatedAt?.seconds 
                                ? new Date(conv.updatedAt.seconds * 1000).toLocaleDateString()
                                : ''}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600 text-sm">No AI conversations.</p>
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
                        <p className="text-xs text-gray-600 mt-2">
                          Showing last {Math.min(50, userActivity.questionHistory.length)} of {userActivity.questionHistory.length} questions
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-600 text-sm">No question history.</p>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-gray-600 text-center py-8">No activity data available. (userActivity: {userActivity ? 'exists' : 'null'}, isLoading: {isLoadingActivity ? 'true' : 'false'})</p>
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
